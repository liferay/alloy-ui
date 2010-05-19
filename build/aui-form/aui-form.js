AUI.add('aui-form-base', function(A) {
var Lang = A.Lang,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'form',

	CSS_FORM = getClassName(NAME),
	CSS_LABELS = getClassName('field', 'labels'),
	CSS_LABELS_INLINE = getClassName('field', 'labels', 'inline')

	CSS_LABEL_ALIGN = {
		left: [CSS_LABELS, 'left'].join('-'),
		right: [CSS_LABELS, 'right'].join('-'),
		top: [CSS_LABELS, 'top'].join('-')
	};

var Form = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			action: {
				value: location.href,
				getter: '_attributeGetter',
				setter: '_attributeSetter'
			},
			id: {},
			method: {
				value: 'POST',
				getter: '_attributeGetter',
				setter: '_attributeSetter'
			},
			monitorChanges: {
				value: false
			},
			nativeSubmit: {
				value: false
			},

			values: {
				getter: function(value) {
					var instance = this;

					var values = A.io._serialize(instance.get('contentBox').getDOM());

					return A.QueryString.parse(values);
				},

				setter: function(value) {
					var instance = this;

					var setFields = instance._setFieldsObject;

					var monitorChanges = instance.get('monitorChanges');

					if (Lang.isArray(value)) {
						setFields = instance._setFieldsArray;
					}

					A.each(value, A.rbind(setFields, instance, monitorChanges));

					return A.Attribute.INVALID_VALUE;
				}
			},

			fieldValues: {
				getter: function(value) {
					var instance = this;

					var obj = {};

					instance.fields.each(
						function(item, index, collection) {
							obj[item.get('name')] = item.get('value');
						}
					);

					return obj;
				}
			},

			labelAlign: {
				value: ''
			}
		},

		prototype: {
			CONTENT_TEMPLATE: '<form></form>',

			initializer: function() {
				var instance = this;

				instance.fields = new A.DataSet(
					{
						getKey: instance._getNodeId
					}
				);
			},

			renderUI: function() {
				var instance = this;

				instance._renderForm();
			},

			bindUI: function() {
				var instance = this;

				var nativeSubmit = instance.get('nativeSubmit');

				if (!nativeSubmit) {
					instance.get('contentBox').on('submit', instance._onSubmit);
				}

				instance.after('disabledChange', instance._afterDisabledChange);
				instance.after('labelAlignChange', instance._afterLabelAlignChange);
				instance.after('nativeSubmitChange', instance._afterNativeSubmitChange);
			},

			syncUI: function() {
				var instance = this;

				var node = instance.get('contentBox');

				instance.set('id', node.guid());

				instance._uiSetLabelAlign(instance.get('labelAlign'));
			},

			add: function(fields, render) {
				var instance = this;

				var args = A.Array(fields);
				var length = args.length;
				var field;

				var fields = instance.fields;

				var contentBox = instance.get('contentBox');

				for (var i = 0; i < args.length; i++) {
					field = args[i];

					field = A.Field.getField(field);

					if (field && fields.indexOf(field) == -1) {
						fields.add(field);

						if (render && !field.get('rendered')) {
							var node = field.get('node');

							var location = null;

							if (!node.inDoc()) {
								location = contentBox;
							}

							field.render(location);
						}
					}
				}
			},

			clearInvalid: function() {
				var instance = this;

				instance.fields.each(
					function(item, index, collection) {
						item.clearInvalid();
					}
				);
			},

			getField: function(id) {
				var instance = this;

				var field;

				if (id) {
					var fields = instance.fields;

					field = fields.item(id);

					if (!Lang.isObject(field)) {
						fields.each(
							function(item, index, collection) {
								if (item.get('id') == id || item.get('name') == id) {
									field = item;

									return false;
								}
							}
						);
					}
				}

				return field;
			},

			invoke: function(method, args) {
				var instance = this;

				return instance.fields.invoke(method, args);
			},

			isDirty: function() {
				var instance = this;

				var dirty = false;

				instance.fields.each(
					function(item, index, collection) {
						if (item.isDirty()) {
							dirty = true;

							return false;
						}
					}
				);

				return dirty;
			},

			isValid: function() {
				var instance = this;

				var valid = true;

				instance.fields.each(
					function(item, index, collection) {
						if (!item.isValid()) {
							valid = false;

							return false;
						}
					}
				);

				return valid;
			},

			markInvalid: function(value) {
				var instance = this;

				var markFields = instance._markInvalidObject;

				if (Lang.isArray(value)) {
					markFields = instance._markInvalidArray;
				}

				A.each(value, markFields, instance);

				return instance;
			},

			remove: function(field, fromMarkup) {
				var instance = this;

				instance.fields.remove(field);

				if (fromMarkup) {
					field = instance.getField(field);

					if (field) {
						field.destroy();
					}
				}

				return instance;
			},

			resetValues: function() {
				var instance = this;

				instance.fields.each(
					function(item, index, collection) {
						item.resetValue();
					}
				);
			},

			submit: function(config) {
				var instance = this;

				var valid = instance.isValid();

				if (valid) {
					if (instance.get('nativeSubmit')) {
						instance.get('contentBox').submit();
					}
					else {
						config = config || {};

						A.mix(
							config,
							{
								id: instance.get('id')
							}
						);

						A.io(
							instance.get('action'),
							{
								form: config,
								method: instance.get('method'),
								on: {
									complete: A.bind(instance._onSubmitComplete, instance),
									end: A.bind(instance._onSubmitEnd, instance),
									failure: A.bind(instance._onSubmitFailure, instance),
									start: A.bind(instance._onSubmitStart, instance),
									success: A.bind(instance._onSubmitSuccess, instance)
								}
							}
						);
					}
				}

				return valid;
			},

			_afterDisabledChange: function(event) {
				var instance = this;

				var action = 'disable';

				if (event.newVal) {
					action = 'enable';
				}

				instance.fields.each(
					function(item, index, collection) {
						item[action];
					}
				);
			},

			_afterLabelAlignChange: function(event) {
				var instance = this;

				instance._uiSetLabelAlign(event.newVal, event.prevVal)
			},

			_afterNativeSubmitChange: function(event) {
				var instance = this;

				var contentBox = instance.get('contentBox');

				var action = 'on';

				if (event.newVal) {
					action = 'detach';
				}

				contentBox[action]('submit', instance._onSubmit);
			},

			_attributeGetter: function(value, key) {
				var instance = this;

				return instance.get('contentBox').attr(key);
			},

			_attributeSetter: function(value, key) {
				var instance = this;

				instance.get('contentBox').attr(key, value);

				return value;
			},

			_getNodeId: function(obj) {
				var node;

				if (obj instanceof A.Field) {
					node = obj.get('node');
				}
				else {
					node = A.one(obj);
				}
				var guid = node && node.guid();

				return guid;
			},

			_onSubmit: function(event) {
				event.halt();
			},

			_onSubmitComplete: function(event) {
				var instance = this;

				instance.fire(
					'complete',
					 {
					 	ioEvent: event
					 }
				);
			},

			_onSubmitEnd: function(event) {
				var instance = this;

				instance.fire(
					'end',
					 {
					 	ioEvent: event
					 }
				);
			},

			_onSubmitFailure: function(event) {
				var instance = this;

				instance.fire(
					'failure',
					 {
					 	ioEvent: event
					 }
				);
			},

			_onSubmitStart: function(event) {
				var instance = this;

				instance.fire(
					'start',
					 {
					 	ioEvent: event
					 }
				);
			},

			_onSubmitSuccess: function(event) {
				var instance = this;

				instance.fire(
					'success',
					 {
					 	ioEvent: event
					 }
				);
			},

			_renderForm: function() {
				var instance = this;

				instance.get('contentBox').removeClass(CSS_FORM);
			},

			_markInvalidArray: function(item, index, collection) {
				var instance = this;

				var field = instance.getField(item.id);

				if (field) {
					field.markInvalid(item.message);
				}
			},

			_markInvalidObject: function(item, index, collection) {
				var instance = this;

				var field = (!Lang.isFunction(item)) && instance.getField(index);

				if (field) {
					field.markInvalid(item);
				}
			},

			_setFieldsArray: function(item, index, collection, monitorChanges) {
				var instance = this;

				var field = instance.getField(item.id);

				if (field) {
					field.set('value', item.value);

					if (monitorChanges) {
						field.set('prevVal', field.get('value'));
					}
				}
			},

			_setFieldsObject: function(item, index, collection, monitorChanges) {
				var instance = this;

				var field = (!Lang.isFunction(item)) && instance.getField(index);

				if (field) {
					field.set('value', item);

					if (monitorChanges) {
						field.set('prevVal', field.get('value'));
					}
				}
			},

			_uiSetLabelAlign: function(newVal, prevVal) {
				var instance = this;

				var contentBox = instance.get('contentBox');

				contentBox.replaceClass(CSS_LABEL_ALIGN[prevVal], CSS_LABEL_ALIGN[newVal]);

				var action = 'removeClass';

				if (/right|left/.test(newVal)) {
					action = 'addClass';
				}

				contentBox[action](CSS_LABELS_INLINE);
			}
		}
	}
);

A.Form = Form;

}, '@VERSION@' ,{requires:['aui-base','aui-data-set','aui-form-field','querystring-parse']});
AUI.add('aui-form-combobox', function(A) {
var Lang = A.Lang,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'combobox',

	CSS_COMBOBOX = getClassName(NAME);

var Combobox = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			field: {
			},

			fieldWidget: {
				value: A.Textfield
			},

			node: {
				getter: function() {
					var instance = this;

					if (instance._field) {
						return instance._field.get('node');
					}
				}
			},

			icons: {
				value: ['circle-triangle-b'],
				validator: Lang.isArray
			}
		},

		prototype: {
			renderUI: function() {
				var instance = this;

				Combobox.superclass.renderUI.call(instance);

				instance._renderField();
				instance._renderIcons();
			},

			_renderField: function() {
				var instance = this;

				var contentBox = instance.get('contentBox');

				var field = instance.get('field');
				var fieldWidget = instance.get('fieldWidget');

				instance._field = new fieldWidget(field).render();

				contentBox.appendChild(instance._field.get('boundingBox'));
			},

			_renderIcons: function() {
				var instance = this;

				var icons = instance.get('icons');

				if (icons.length) {
					var toolbar = new A.Toolbar(
						{
							children: icons
						}
					).render(instance.get('contentBox'));

					instance.icons = toolbar;
				}
			}
		}
	}
);

A.Combobox = Combobox;

}, '@VERSION@' ,{requires:['aui-form-textarea','aui-toolbar'], skinnable:true});
AUI.add('aui-form-field', function(A) {
var Lang = A.Lang,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'field',

	getTypeClassName = A.cached(
		function(type, prefix) {
			var base = ['field'];

			if (prefix) {
				base.push(prefix);
			}

			base = base.join('-');

			var className = [getClassName(base, type)];

			if (type == 'password') {
				className.push(getClassName(base, 'text'));
			}

			return className.join(' ');
		}
	),

	CSS_FIELD = getClassName(NAME),
	CSS_FIELD_CONTENT = getClassName(NAME, 'content'),
	CSS_FIELD_INPUT = getClassName(NAME, 'input'),
	CSS_FIELD_HINT = getClassName(NAME, 'hint'),
	CSS_FIELD_INVALID = getClassName(NAME, 'invalid'),
	CSS_FIELD_LABEL = getClassName(NAME, 'label'),

	CSS_LABELS = getClassName(NAME, 'labels'),
	CSS_LABELS_INLINE = getClassName(NAME, 'labels', 'inline'),

	CSS_LABEL_ALIGN = {
		left: [CSS_LABELS, 'left'].join('-'),
		right: [CSS_LABELS, 'right'].join('-'),
		top: [CSS_LABELS, 'top'].join('-')
	},

	REGEX_INLINE_LABEL = /left|right/,

	TPL_BOUNDING_BOX = '<span class="' + CSS_FIELD + '"></span>',
	TPL_CONTENT_BOX = '<span class="' + CSS_FIELD_CONTENT + '"></span>',
	TPL_FIELD_HINT = '<span class="' + CSS_FIELD_HINT + '"></span>',
	TPL_INPUT = '<input autocomplete="off" class="{cssClass}" id="{id}" name="{name}" type="{type}" />',
	TPL_LABEL = '<label class="' + CSS_FIELD_LABEL + '"></label>',

	_FIELD_INSTANCES = {};

var Field = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			readOnly: {
				value: false
			},

			name: {
				value: '',
				getter: function(value) {
					var instance = this;

					return value || instance.get('id');
				}
			},

			id: {
				getter: function(value) {
					var instance = this;

					var node = this.get('node');

					if (node) {
						value = node.get('id');
					}

					if (!value) {
						value = A.guid();
					}

					return value;
				}
			},

			type: {
				value: 'text',
				writeOnce: true
			},

			labelAlign: {
				value: ''
			},

			labelNode: {
				valueFn: function() {
					var instance = this;

					return A.Node.create(TPL_LABEL);
				}
			},

			labelText: {
				valueFn: function() {
					var instance = this;

					return instance.get('labelNode').get('innerHTML');
				},

				setter: function(value) {
					var instance = this;

					instance.get('labelNode').set('innerHTML', value);

					return value;
				}
			},

			node: {
				value: null,
				setter: function(value) {
					var instance = this;

					return A.one(value) || instance._createFieldNode();
				}
			},

			fieldHint: {
				value: ''
			},

			fieldHintNode: {
				value: null,
				setter: function(value) {
					var instance = this;

					return A.one(value) || instance._createFieldHint();
				}
			},

			prevVal: {
				value: ''
			},

			valid: {
				value: true,
				getter: function(value) {
					var instance = this;

					var validator = instance.get('validator');

					var valid = instance.get('disabled') || validator(instance.get('value'));

					return valid;
				}
			},

			dirty: {
				value: false,
				getter: function(value) {
					var instance = this;

					if (instance.get('disabled')) {
						value = false;
					}
					else {
						var currentVal = String(instance.get('value'));
						var prevVal = String(instance.get('prevVal'));

						value = (currentVal !== prevVal);
					}

					return value;
				}
			},

			size: {},

			validator: {
				valueFn: function() {
					var instance = this;

					return instance.fieldValidator;
				},
				validator: Lang.isFunction
			},

			value: {
				getter: '_getNodeValue',
				setter: '_setNodeValue',
				validator: 'fieldValidator'
			}
		},

		HTML_PARSER: {
			labelNode: 'label',
			node: 'input, textarea, select'
		},

		BIND_UI_ATTRS: [
			'id',
			'readOnly',
			'name',
			'size',
			'tabIndex',
			'type',
			'value'
		],

		getTypeClassName: getTypeClassName,

		getField: function(field) {
			var fieldWidget = null;

			if (field instanceof A.Field) {
				fieldWidget = field;
			}
			else if (field && (Lang.isString(field) || field instanceof A.Node || field.nodeName)) {
				var fieldId = A.one(field).get('id');

				fieldWidget = _FIELD_INSTANCES[fieldId];

				if (!fieldWidget) {
					var boundingBox = field.ancestor('.aui-field');
					var contentBox = field.ancestor('.aui-field-content');

					fieldWidget = new Field(
						{
							boundingBox: boundingBox,
							contentBox: contentBox,
							node: field
						}
					);
				}
			}
			else if (Lang.isObject(field)) {
				fieldWidget = new Field(field);
			}

			return fieldWidget;
		},

		prototype: {
			BOUNDING_TEMPLATE: TPL_BOUNDING_BOX,
			CONTENT_TEMPLATE: TPL_CONTENT_BOX,
			FIELD_TEMPLATE: TPL_INPUT,
			FIELD_TYPE: 'text',

			initializer: function() {
				var instance = this;

				var id = instance.get('node').guid();

				_FIELD_INSTANCES[id] = instance;
			},

			renderUI: function() {
				var instance = this;

				instance._renderField();
				instance._renderLabel();
				instance._renderFieldHint();
			},

			bindUI: function() {
				var instance = this;

				instance.after('labelAlignChange', instance._afterLabelAlignChange);
				instance.after('fieldHintChange', instance._afterFieldHintChange);
			},

			syncUI: function() {
				var instance = this;

				instance.set('prevVal', instance.get('value'));
			},

			fieldValidator: function(value) {
				var instance = this;

				return true;
			},

			isValid: function() {
				var instance = this;

				return instance.get('valid');
			},

			isDirty: function() {
				var instance = this;

				return instance.get('dirty');
			},

			resetValue: function() {
				var instance = this;

				instance.set('value', instance.get('prevVal'));

				instance.clearInvalid();
			},

			markInvalid: function(message) {
				var instance = this;

				instance.set('fieldHint', message);
				instance.get('fieldHintNode').show();

				instance.get('boundingBox').addClass(CSS_FIELD_INVALID);
			},

			clearInvalid: function() {
				var instance = this;

				instance.reset('fieldHint');

				if (!instance.get('fieldHint')) {
					instance.get('fieldHintNode').hide();
				}

				instance.get('boundingBox').removeClass(CSS_FIELD_INVALID);
			},

			validate: function() {
				var instance = this;

				var valid = instance.get('valid');

				if (valid) {
					instance.clearInvalid();
				}

				return valid;
			},

			_afterFieldHintChange: function(event) {
				var instance = this;

				instance._uiSetFieldHint(event.newVal, event.prevVal);
			},

			_afterLabelAlignChange: function(event) {
				var instance = this;

				instance._uiSetLabelAlign(event.newVal, event.prevVal);
			},

			_createFieldHint: function() {
				var instance = this;

				var fieldHint = A.Node.create(TPL_FIELD_HINT);

				instance.get('contentBox').append(fieldHint);

				return fieldHint;
			},

			_createFieldNode: function() {
				var instance = this;

				var fieldTemplate = instance.FIELD_TEMPLATE;

				instance.FIELD_TEMPLATE = A.substitute(
					fieldTemplate,
					{
						cssClass: CSS_FIELD_INPUT,
						id: instance.get('id'),
						name: instance.get('name'),
						type: instance.get('type')
					}
				);

				return A.Node.create(instance.FIELD_TEMPLATE);
			},

			_getNodeValue: function() {
				var instance = this;

				return instance.get('node').val();
			},

			_renderField: function() {
				var instance = this;

				var node = instance.get('node');

				node.val(instance.get('value'));

				var boundingBox = instance.get('boundingBox');
				var contentBox = instance.get('contentBox');

				var type = instance.get('type');

				boundingBox.addClass(getTypeClassName(type));
				node.addClass(getTypeClassName(type, 'input'));

				if (!contentBox.contains(node)) {
					if (node.inDoc()) {
						node.placeBefore(boundingBox);

						contentBox.appendChild(node);
					}
					else {
						contentBox.appendChild(node);
					}
				}

				boundingBox.removeAttribute('tabIndex');
			},

			_renderFieldHint: function() {
				var instance = this;

				var fieldHint = instance.get('fieldHint');

				if (fieldHint) {
					instance._uiSetFieldHint(fieldHint);
				}
			},

			_renderLabel: function() {
				var instance = this;

				var labelText = instance.get('labelText');

				if (labelText !== false) {
					var node = instance.get('node');
					var id = node.guid();

					labelText = instance.get('labelText');

					var labelNode = instance.get('labelNode');

					labelNode.addClass(getClassName(instance.name, 'label'));
					labelNode.setAttribute('for', id);
					labelNode.set('innerHTML', labelText);

					instance._uiSetLabelAlign(instance.get('labelAlign'));

					var contentBox = instance.get('contentBox');

					contentBox.prepend(labelNode);
				}
			},

			_setNodeValue: function(value) {
				var instance = this;

				instance._uiSetValue(value);

				return value;
			},

			_uiSetFieldHint: function(newVal, prevVal) {
				var instance = this;

				instance.get('fieldHintNode').set('innerHTML', newVal);
			},

			_uiSetId: function(newVal, src) {
				var instance = this;

				instance.get('node').set('id', newVal);
			},

			_uiSetLabelAlign: function(newVal, prevVal) {
				var instance = this;

				var boundingBox = instance.get('boundingBox');

				boundingBox.replaceClass(CSS_LABEL_ALIGN[prevVal], CSS_LABEL_ALIGN[newVal]);

				var action = 'removeClass';

				if (REGEX_INLINE_LABEL.test(newVal)) {
					action = 'addClass';
				}

				boundingBox[action](CSS_LABELS_INLINE);
			},

			_uiSetName: function(newVal, src) {
				var instance = this;

				instance.get('node').setAttribute('name', newVal);
			},

			_uiSetReadOnly: function(newVal, src) {
				var instance = this;

				instance.get('node').setAttribute('readOnly', newVal);
			},

			_uiSetSize: function(newVal, src) {
				var instance = this;

				instance.get('node').setAttribute('size', newVal);
			},

			_uiSetTabIndex: function(newVal, src) {
				var instance = this;

				instance.get('node').setAttribute('tabIndex', newVal);
			},

			_uiSetValue: function(newVal, src) {
				var instance = this;

				instance.get('node').val(newVal);
			},

			_requireAddAttr: false
		}
	}
);

A.Field = Field;

}, '@VERSION@' ,{requires:['aui-base','aui-component','substitute']});
AUI.add('aui-form-textarea', function(A) {
var Lang = A.Lang,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'textarea',

	CSS_TEXTAREA = getClassName(NAME),
	CSS_HEIGHT_MONITOR = [
		getClassName(NAME, 'height', 'monitor'),
		getClassName('field', 'text', 'input'),
		getClassName('helper', 'hidden', 'accessible')
	].join(' '),

	DEFAULT_EMPTY_CONTENT = '&nbsp;&nbsp;',
	DEFAULT_APPEND_CONTENT = '&nbsp;\n&nbsp;',

	TPL_HEIGHT_MONITOR_OPEN = '<pre class="' + CSS_HEIGHT_MONITOR + '">',
	TPL_HEIGHT_MONITOR_CLOSE = '</pre>',
	TPL_INPUT = '<textarea autocomplete="off" class="{cssClass}" name="{name}"></textarea>';

var Textarea = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			autoSize: {
				value: true
			},

			height: {
				value: 'auto'
			},

			maxHeight: {
				value: 1000,
				setter: '_setAutoDimension'
			},

			minHeight: {
				value: 45,
				setter: '_setAutoDimension'
			},

			width: {
				value: 'auto',
				setter: '_setAutoDimension'
			}
		},

		HTML_PARSER: {
			node: 'textarea'
		},

		EXTENDS: A.Textfield,

		prototype: {
			FIELD_TEMPLATE: TPL_INPUT,
			renderUI: function() {
				var instance = this;

				Textarea.superclass.renderUI.call(instance);

				if (instance.get('autoSize')) {
					instance._renderHeightMonitor();
				}
			},

			bindUI: function() {
				var instance = this;

				Textarea.superclass.bindUI.call(instance);

				if (instance.get('autoSize')) {
					instance.get('node').on('keyup', instance._onKeyup, instance);
				}

				instance.after('adjustSize', instance._uiAutoSize);

				instance.after('heightChange', instance._afterHeightChange);
				instance.after('widthChange', instance._afterWidthChange);
			},

			syncUI: function() {
				var instance = this;

				Textarea.superclass.syncUI.call(instance);

				instance._setAutoDimension(instance.get('minHeight'), 'minHeight');
				instance._setAutoDimension(instance.get('maxHeight'), 'maxHeight');

				var width = instance.get('width');
				var height = instance.get('minHeight');

				instance._setAutoDimension(width, 'width');

				instance._uiSetDim('height', height);
				instance._uiSetDim('width', width);
			},

			_afterHeightChange: function(event) {
				var instance = this;

				instance._uiSetDim('height', event.newVal, event.prevVal);
			},

			_afterWidthChange: function(event) {
				var instance = this;

				instance._uiSetDim('width', event.newVal, event.prevVal);
			},

			_onKeyup: function(event) {
				var instance = this;

				instance.fire('adjustSize');
			},

			_renderHeightMonitor: function() {
				var instance = this;

				var heightMonitor = A.Node.create(TPL_HEIGHT_MONITOR_OPEN + TPL_HEIGHT_MONITOR_CLOSE);
				var node = instance.get('node');

				A.getBody().append(heightMonitor);

				instance._heightMonitor = heightMonitor;

				var fontFamily = node.getComputedStyle('fontFamily');
				var fontSize = node.getComputedStyle('fontSize');
				var fontWeight = node.getComputedStyle('fontWeight');
				var lineHeight = node.getComputedStyle('fontSize');

				node.setStyle('height', instance.get('minHeight') + 'px');

				heightMonitor.setStyles(
					{
						fontFamily: fontFamily,
						fontSize: fontSize,
						fontWeight: fontWeight
					}
				);

				if ('outerHTML' in heightMonitor.getDOM()) {
					instance._updateContent = instance._updateOuterContent;
				}
				else {
					instance._updateContent = instance._updateInnerContent;
				}
			},

			_setAutoDimension: function(value, key) {
				var instance = this;

				instance['_' + key] = value;
			},

			_uiAutoSize: function() {
				var instance = this;

				var node = instance.get('node');
				var heightMonitor = instance._heightMonitor;

				var minHeight = instance._minHeight;
				var maxHeight = instance._maxHeight;

				var content = node.val();
				var textNode = document.createTextNode(content);

				heightMonitor.set('innerHTML', '');

				heightMonitor.appendChild(textNode);

				heightMonitor.setStyle('width', node.getComputedStyle('width'));

				content = heightMonitor.get('innerHTML');

				if (!content.length) {
					content = DEFAULT_EMPTY_CONTENT;
				}
				else {
					content += DEFAULT_APPEND_CONTENT;
				}

				instance._updateContent(content);

				var height = Math.max(heightMonitor.get('offsetHeight'), minHeight);

				height = Math.min(height, maxHeight);

				if (height != instance._lastHeight) {
					instance._lastHeight = height;

					instance._uiSetDim('height', height);
				}
			},

			_uiSetDim: function(key, newVal) {
				var instance = this;

				var node = instance.get('node');

				if (Lang.isNumber(newVal)) {
					newVal += 'px';
				}

				node.setStyle(key, newVal);
			},

			_updateInnerContent: function(content) {
				var instance = this;

				return instance._heightMonitor.set('innerHTML', content);
			},

			_updateOuterContent: function(content) {
				var instance = this;

				content = content.replace(/\n/g, '<br />');

				return instance._updateInnerContent(content);
			}
		}
	}
);

A.Textarea = Textarea;

}, '@VERSION@' ,{requires:['aui-form-textfield'], skinnable:true});
AUI.add('aui-form-textfield', function(A) {
var Lang = A.Lang,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'textfield',

	CSS_TEXTFIELD = getClassName(NAME);

var Textfield = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			selectOnFocus: {
				value: false
			},

			allowOnly: {
				value: null,
				validator: function(value) {
					var instance = this;

					return value instanceof RegExp;
				}
			},

			defaultValue: {
				value: ''
			},

			validator: {
				value: null
			}
		},

		EXTENDS: A.Field,

		prototype: {
			bindUI: function() {
				var instance = this;

				Textfield.superclass.bindUI.call(instance);

				var node = instance.get('node');

				if (instance.get('allowOnly')) {
					node.on('keypress', instance._filterInputText, instance);
				}

				if (instance.get('selectOnFocus')) {
					node.on('focus', instance._selectInputText, instance);
				}

				var defaultValue = instance.get('defaultValue');

				if (defaultValue) {
					node.on('blur', instance._checkDefaultValue, instance);
					node.on('focus', instance._checkDefaultValue, instance);
				}
			},

			syncUI: function() {
				var instance = this;

				var currentValue = instance.get('value');

				if (!currentValue) {
					var defaultValue = instance.get('defaultValue');

					instance.set('value', instance.get('defaultValue'));
				}

				Textfield.superclass.syncUI.apply(instance, arguments);
			},

			_filterInputText: function(event) {
				var instance = this;

				var allowOnly = instance.get('allowOnly');

				var inputChar = String.fromCharCode(event.charCode);

				if (!allowOnly.test(inputChar)) {
					event.halt();
				}
			},

			_checkDefaultValue: function(event) {
				var instance = this;

				var defaultValue = instance.get('defaultValue');
				var node = instance.get('node');
				var currentValue = Lang.trim(instance.get('value'));
				var eventType = event.type;

				var focus = (eventType == 'focus' || eventType == 'focusin');

				if (defaultValue) {
					var value = currentValue;

					if (focus && (currentValue == defaultValue)) {
						value = '';
					}
					else if (!focus && !currentValue) {
						value = defaultValue;
					}

					instance.set('value', value);
				}
			},

			_selectInputText: function(event) {
				var instance = this;

				event.currentTarget.select();
			}
		}
	}
);

A.Textfield = Textfield;

}, '@VERSION@' ,{requires:['aui-form-field']});
AUI.add('aui-form-validator', function(A) {
// API inspired on the amazing jQuery Form Validation - http://jquery.bassistance.de/validate/

var L = A.Lang,
	O = A.Object,
	isBoolean = L.isBoolean,
	isDate = L.isDate,
	isEmpty = O.isEmpty,
	isFunction = L.isFunction,
	isObject = L.isObject,
	isString = L.isString,
	trim = L.trim,

	DASH = '-',
	DOT = '.',
	EMPTY_STRING = '',
	FORM_VALIDATOR = 'form-validator',
	INVALID_DATE = 'Invalid Date',
	PIPE = '|',

	BLUR_HANDLERS = 'blurHandlers',
	BOUNDING_BOX = 'boundingBox',
	CHECKBOX = 'checkbox',
	CONTAINER = 'container',
	CONTAINER_ERROR_CLASS = 'containerErrorClass',
	CONTAINER_VALID_CLASS = 'containerValidClass',
	ERROR = 'error',
	ERROR_CLASS = 'errorClass',
	EXTRACT_CSS_PREFIX = 'extractCssPrefix',
	EXTRACT_RULES = 'extractRules',
	FIELD = 'field',
	FIELD_CONTAINER = 'fieldContainer',
	FIELD_STRINGS = 'fieldStrings',
	INPUT_HANDLERS = 'inputHandlers',
	MESSAGE = 'message',
	MESSAGE_CONTAINER = 'messageContainer',
	NAME = 'name',
	RADIO = 'radio',
	RULES = 'rules',
	SELECT_TEXT = 'selectText',
	SHOW_ALL_MESSAGES = 'showAllMessages',
	SHOW_MESSAGES = 'showMessages',
	STACK = 'stack',
	STACK_ERROR_CONTAINER = 'stackErrorContainer',
	TYPE = 'type',
	VALID = 'valid',
	VALIDATE_ON_BLUR = 'validateOnBlur',
	VALIDATE_ON_INPUT = 'validateOnInput',
	VALID_CLASS = 'validClass',

	EV_BLUR = 'blur',
	EV_ERROR_FIELD = 'errorField',
	EV_INPUT = 'input',
	EV_RESET = 'reset',
	EV_SUBMIT = 'submit',
	EV_SUBMIT_ERROR = 'submitError',
	EV_VALIDATE_FIELD = 'validateField',
	EV_VALID_FIELD = 'validField',

	getCN = A.ClassNameManager.getClassName,

	CSS_ERROR = getCN(FORM_VALIDATOR, ERROR),
	CSS_ERROR_CONTAINER = getCN(FORM_VALIDATOR, ERROR, CONTAINER),
	CSS_VALID = getCN(FORM_VALIDATOR, VALID),
	CSS_VALID_CONTAINER = getCN(FORM_VALIDATOR, VALID, CONTAINER),

	CSS_FIELD = getCN(FIELD),
	CSS_MESSAGE = getCN(FORM_VALIDATOR, MESSAGE),
	CSS_STACK_ERROR = getCN(FORM_VALIDATOR, STACK, ERROR),

	TPL_MESSAGE = '<div class="'+CSS_MESSAGE+'"></div>',
	TPL_STACK_ERROR = '<label class="'+CSS_STACK_ERROR+'"></label>',

	UI_ATTRS = [ EXTRACT_RULES, VALIDATE_ON_BLUR, VALIDATE_ON_INPUT ];

YUI.AUI.defaults.FormValidator = {
	STRINGS: {
		DEFAULT: 'Please fix this field.',
		acceptFiles: 'Please enter a value with a valid extension ({0}).',
		alpha: 'Please enter only apha characters.',
		alphanum: 'Please enter only aphanumeric characters.',
		date: 'Please enter a valid date.',
		digits: 'Please enter only digits.',
		email: 'Please enter a valid email address.',
		equalTo: 'Please enter the same value again.',
		max: 'Please enter a value less than or equal to {0}.',
		maxLength: 'Please enter no more than {0} characters.',
		min: 'Please enter a value greater than or equal to {0}.',
		minLength: 'Please enter at least {0} characters.',
		number: 'Please enter a valid number.',
		range: 'Please enter a value between {0} and {1}.',
		rangeLength: 'Please enter a value between {0} and {1} characters long.',
		required: 'This field is required.',
		url: 'Please enter a valid URL.'
	},

	REGEX: {
		alpha: /^[a-z_]+$/i,

		alphanum: /^\w+$/,

		digits: /^\d+$/,

		number: /^[+\-]?(\d+([.,]\d+)?)+$/,

		// Regex from Scott Gonzalez Email Address Validation: http://projects.scottsplayground.com/email_address_validation/
		email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,

		// Regex from Scott Gonzalez IRI: http://projects.scottsplayground.com/iri/
		url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
	},

	RULES: {
		acceptFiles: function(val, node, ruleValue) {
			var regex = null;

			if (isString(ruleValue)) {
				// convert syntax (jpg, png) or (jpg png) to regex syntax (jpg|png)
				var extensions = ruleValue.split(/,\s*|\b\s*/).join(PIPE);

				regex = new RegExp('[.](' + extensions + ')$', 'i');
			}

			return regex && regex.test(val);
		},

		date: function(val, node, ruleValue) {
			var date = new Date(val);

			return (isDate(date) && (date != INVALID_DATE) && !isNaN(date));
		},

		equalTo: function(val, node, ruleValue) {
			var comparator = A.one(ruleValue);

			return comparator && (trim(comparator.val()) == val);
		},

		max: function(val, node, ruleValue) {
			return (FormValidator.toNumber(val) <= ruleValue);
		},

		maxLength: function(val, node, ruleValue) {
			return (val.length <= ruleValue);
		},

		min: function(val, node, ruleValue) {
			return (FormValidator.toNumber(val) >= ruleValue);
		},

		minLength: function(val, node, ruleValue) {
			return (val.length >= ruleValue);
		},

		range: function(val, node, ruleValue) {
			var num = FormValidator.toNumber(val);

			return (num >= ruleValue[0]) && (num <= ruleValue[1]);
		},

		rangeLength: function(val, node, ruleValue) {
			var length = val.length;

			return (length >= ruleValue[0]) && (length <= ruleValue[1]);
		},

		required: function(val, node, ruleValue) {
			var instance = this;

			if (A.FormValidator.isCheckable(node)) {
				var name = node.get(NAME);
				var elements = instance.getElementsByName(name);

				return (elements.filter(':checked').size() > 0);
			}
			else {
				return !!val;
			}
		}
	}
};

var FormValidator = A.Component.create({
	NAME: FORM_VALIDATOR,

	ATTRS: {
		containerErrorClass: {
			value: CSS_ERROR_CONTAINER,
			validator: isString
		},

		containerValidClass: {
			value: CSS_VALID_CONTAINER,
			validator: isString
		},

		errorClass: {
			value: CSS_ERROR,
			validator: isString
		},

		extractCssPrefix: {
			value: CSS_FIELD+DASH,
			validator: isString
		},

		extractRules: {
			value: true,
			validator: isBoolean
		},

		fieldContainer: {
			value: DOT+CSS_FIELD
		},

		fieldStrings: {
			value: {},
			validator: isObject
		},

		messageContainer: {
			getter: function(val) {
				return A.Node.create(val).cloneNode(true);
			},
			value: TPL_MESSAGE
		},

		render: {
			value: true
		},

		strings: {
			valueFn: function() {
				return YUI.AUI.defaults.FormValidator.STRINGS;
			}
		},

		rules: {
			validator: isObject,
			value: {}
		},

		selectText: {
			value: true,
			validator: isBoolean
		},

		showMessages: {
			value: true,
			validator: isBoolean
		},

		showAllMessages: {
			value: false,
			validator: isBoolean
		},

		stackErrorContainer: {
			getter: function(val) {
				return A.Node.create(val).cloneNode(true);
			},
			value: TPL_STACK_ERROR
		},

		validateOnBlur: {
			value: true,
			validator: isBoolean
		},

		validateOnInput: {
			value: false,
			validator: isBoolean
		},

		validClass: {
			value: CSS_VALID,
			validator: isString
		}
	},

	isCheckable: function(node) {
		var nodeType = node.get(TYPE).toLowerCase();

		return (nodeType == CHECKBOX || nodeType == RADIO);
	},

	toNumber: function(val) {
		return parseFloat(val) || 0;
	},

	EXTENDS: A.Widget,

	UI_ATTRS: UI_ATTRS,

	prototype: {
		CONTENT_TEMPLATE: null,
		UI_EVENTS: {},

		blurHandlers: [],
		errors: {},
		inputHandlers: [],
		stackErrorContainers: {},

		bindUI: function() {
			var instance = this;

			instance._createEvents();
			instance._bindValidation();
		},

		addFieldError: function(field, ruleName) {
			var instance = this;
			var errors = instance.errors;
			var name = field.get(NAME);

			if (!errors[name]) {
				errors[name] = [];
			}

			errors[name].push(ruleName);
		},

		clearFieldError: function(field) {
			var instance = this;

			delete instance.errors[field.get(NAME)];
		},

		eachRule: function(fn) {
			var instance = this;

			A.each(
				instance.get(RULES),
				function(rule, fieldName) {
					if (isFunction(fn)) {
						fn.apply(instance, [rule, fieldName]);
					}
				}
			);
		},

		findFieldContainer: function(field) {
			var instance = this;
			var fieldContainer = instance.get(FIELD_CONTAINER);

			if (fieldContainer) {
				return field.ancestor(fieldContainer);
			}
		},

		focusInvalidField: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var field = boundingBox.one(DOT+CSS_ERROR);

			if (field) {
				if (instance.get(SELECT_TEXT)) {
					field.selectText();
				}

				field.focus();
			}
		},

		getElementsByName: function(name) {
			var instance = this;

			return instance.get(BOUNDING_BOX).all('[name="' + name + '"]');
		},

		getField: function(field) {
			var instance = this;

			if (isString(field)) {
				field = instance.getElementsByName(field).item(0);
			}

			return field;
		},

		getFieldError: function(field) {
			var instance = this;

			return instance.errors[field.get(NAME)];
		},

		getFieldStackErrorContainer: function(field) {
			var instance = this;
			var name = field.get(NAME);
			var stackContainers = instance.stackErrorContainers;

			if (!stackContainers[name]) {
				stackContainers[name] = instance.get(STACK_ERROR_CONTAINER);
			}

			return stackContainers[name];
		},

		getFieldErrorMessage: function(field, rule) {
			var instance = this;
			var fieldName = field.get(NAME);
			var fieldStrings = instance.get(FIELD_STRINGS)[fieldName] || {};
			var fieldRules = instance.get(RULES)[fieldName];

			var strings = instance.getStrings();
			var substituteRulesMap = {};

			if (rule in fieldRules) {
				var ruleValue = A.Array(fieldRules[rule]);

				A.each(
					ruleValue,
					function(value, index) {
						substituteRulesMap[index] = [value].join(EMPTY_STRING);
					}
				);
			}

			var message = (fieldStrings[rule] || strings[rule] || strings.DEFAULT);

			return A.substitute(message, substituteRulesMap);
		},

		hasErrors: function() {
			var instance = this;

			return !isEmpty(instance.errors);
		},

		highlight: function(field, valid) {
			var instance = this;
			var fieldContainer = instance.findFieldContainer(field);

			instance._highlightHelper(
				field,
				instance.get(ERROR_CLASS),
				instance.get(VALID_CLASS),
				valid
			);

			instance._highlightHelper(
				fieldContainer,
				instance.get(CONTAINER_ERROR_CLASS),
				instance.get(CONTAINER_VALID_CLASS),
				valid
			);
		},

		unhighlight: function(field) {
			var instance = this;

			instance.highlight(field, true);
		},

		printStackError: function(field, container, errors) {
			var instance = this;

			if (!instance.get(SHOW_ALL_MESSAGES)) {
				errors = errors.slice(0, 1);
			}

			container.empty();

			A.each(
				errors,
				function(error, index) {
					var message = instance.getFieldErrorMessage(field, error);
					var messageEl = instance.get(MESSAGE_CONTAINER).addClass(error);

					container.append(
						messageEl.html(message)
					);
				}
			);
		},

		resetAllFields: function() {
			var instance = this;

			instance.eachRule(
				function(rule, fieldName) {
					var field = instance.getField(fieldName);

					instance.resetField(field);
				}
			);
		},

		resetField: function(field) {
			var instance = this;
			var stackContainer = instance.getFieldStackErrorContainer(field);

			stackContainer.remove();

			instance.resetFieldCss(field);

			instance.clearFieldError(field);
		},

		resetFieldCss: function(field) {
			var instance = this;
			var fieldContainer = instance.findFieldContainer(field);

			var removeClasses = function(elem, classAttrs) {
				if (elem) {
					A.each(classAttrs, function(attrName) {
						elem.removeClass(
							instance.get(attrName)
						);
					});
				}
			};

			removeClasses(field, [VALID_CLASS, ERROR_CLASS]);
			removeClasses(fieldContainer, [CONTAINER_VALID_CLASS, CONTAINER_ERROR_CLASS]);
		},

		validatable: function(field) {
			var instance = this;
			var fieldRules = instance.get(RULES)[field.get(NAME)];

			var required = fieldRules.required;
			var hasValue = YUI.AUI.defaults.FormValidator.RULES.required.apply(instance, [field.val(), field]);

			return (required || (!required && hasValue));
		},

		validate: function() {
			var instance = this;

			instance.eachRule(
				function(rule, fieldName) {
					instance.validateField(fieldName);
				}
			);

			instance.focusInvalidField();
		},

		validateField: function(field) {
			var instance = this;
			var fieldNode = instance.getField(field);

			if (fieldNode) {
				var validatable = instance.validatable(fieldNode);

				instance.resetField(fieldNode);

				if (validatable) {
					instance.fire(EV_VALIDATE_FIELD, {
						validator: {
							field: fieldNode
						}
					});
				}
			}
		},

		_bindValidation: function() {
			var instance = this;
			var form = instance.get(BOUNDING_BOX);

			form.on(EV_RESET, A.bind(instance._onFormReset, instance));
			form.on(EV_SUBMIT, A.bind(instance._onFormSubmit, instance));
		},

		_createEvents: function() {
			var instance = this;

			// create publish function for kweight optimization
			var publish = function(name, fn) {
				instance.publish(name, {
		            defaultFn: fn
		        });
			};

			publish(
				EV_ERROR_FIELD,
				instance._defErrorFieldFn
			);

			publish(
				EV_VALID_FIELD,
				instance._defValidFieldFn
			);

			publish(
				EV_VALIDATE_FIELD,
				instance._defValidateFieldFn
			);
		},

		_defErrorFieldFn: function(event) {
			var instance = this;
			var validator = event.validator;
			var field = validator.field;

			instance.highlight(field);

			if (instance.get(SHOW_MESSAGES)) {
				var stackContainer = instance.getFieldStackErrorContainer(field);

				field.placeBefore(stackContainer);

				instance.printStackError(
					field,
					stackContainer,
					validator.errors
				);
			}
		},

		_defValidFieldFn: function(event) {
			var instance = this;
			var field = event.validator.field;

			instance.unhighlight(field);
		},

		_defValidateFieldFn: function(event) {
			var instance = this;
			var field = event.validator.field;
			var fieldRules = instance.get(RULES)[field.get(NAME)];

			A.each(
				fieldRules,
				function(ruleValue, ruleName) {
					var rule = YUI.AUI.defaults.FormValidator.RULES[ruleName];
					var fieldValue = trim(field.val());

					if (isFunction(rule) &&
						!rule.apply(instance, [fieldValue, field, ruleValue])) {

						instance.addFieldError(field, ruleName);
					}
				}
			);

			var fieldErrors = instance.getFieldError(field);

			if (fieldErrors) {
				instance.fire(EV_ERROR_FIELD, {
					validator: {
						field: field,
						errors: fieldErrors
					}
				});
			}
			else {
				instance.fire(EV_VALID_FIELD, {
					validator: {
						field: field
					}
				});
			}
		},

		_highlightHelper: function(field, errorClass, validClass, valid) {
			if (field) {
				if (valid) {
					field.removeClass(errorClass).addClass(validClass);
				}
				else {
					field.removeClass(validClass).addClass(errorClass);
				}
			}
		},

		_onBlurField: function(event) {
			var instance = this;
			var fieldName = event.currentTarget.get(NAME);

			instance.validateField(fieldName);
		},

		_onFieldInputChange: function(event) {
			var instance = this;

			instance.validateField(event.currentTarget);
		},

		_onFormSubmit: function(event) {
			var instance = this;

			var data = {
				validator: {
					formEvent: event
				}
			};

			instance.validate();

			if (instance.hasErrors()) {
				data.validator.errors = instance.errors;

				instance.fire(EV_SUBMIT_ERROR, data);

				event.halt();
			}
			else {
				instance.fire(EV_SUBMIT, data);
			}
		},

		_onFormReset: function(event) {
			var instance = this;

			instance.resetAllFields();
		},

		// helper method for k-weight optimizations
		_bindValidateHelper: function(bind, evType, fn, handler) {
			var instance = this;

			instance._unbindHandlers(handler);

			if (bind) {
				instance.eachRule(
					function(rule, fieldName) {
						var field = instance.getElementsByName(fieldName);

						instance[handler].push(
							field.on(evType, A.bind(fn, instance))
						);
					}
				);
			}
		},

		_uiSetExtractRules: function(val) {
			var instance = this;

			if (val) {
				var form = instance.get(BOUNDING_BOX);
				var rules = instance.get(RULES);
				var extractCssPrefix = instance.get(EXTRACT_CSS_PREFIX);

				A.each(
					YUI.AUI.defaults.FormValidator.RULES,
					function(ruleValue, ruleName) {
						var query = [DOT, extractCssPrefix, ruleName].join(EMPTY_STRING);

						form.all(query).each(
							function(node) {
								if (node.get(TYPE)) {
									var fieldName = node.get(NAME);

									if (!rules[fieldName]) {
										rules[fieldName] = {};
									}

									if (!(ruleName in rules[fieldName])) {
										rules[fieldName][ruleName] = true;
									}
								}
							}
						);
					}
				);
			}
		},

		_uiSetValidateOnInput: function(bind) {
			var instance = this;

			instance._bindValidateHelper(bind, EV_INPUT, instance._onFieldInputChange, INPUT_HANDLERS);
		},

		_uiSetValidateOnBlur: function(bind) {
			var instance = this;

			instance._bindValidateHelper(bind, EV_BLUR, instance._onBlurField, BLUR_HANDLERS);
		},

		_unbindHandlers: function(handler) {
			var instance = this;

			A.each(
				instance[handler],
				function(handler) {
					handler.detach();
				}
			);

			instance[handler] = [];
		}
	}
});

A.each(
	YUI.AUI.defaults.FormValidator.REGEX,
	function(regex, key) {
		YUI.AUI.defaults.FormValidator.RULES[key] = function(val, node, ruleValue) {
			return YUI.AUI.defaults.FormValidator.REGEX[key].test(val);
		};
	}
);

A.FormValidator = FormValidator;

}, '@VERSION@' ,{requires:['aui-base','aui-event-input','selector-css3','substitute']});


AUI.add('aui-form', function(A){}, '@VERSION@' ,{skinnable:false, use:['aui-form-base','aui-form-combobox','aui-form-field','aui-form-textarea','aui-form-textfield','aui-form-validator']});

