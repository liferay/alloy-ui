AUI.add('aui-form-base', function(A) {
var Lang = A.Lang,

	getClassName = A.getClassName,

	_serialize = A.IO.prototype._serialize,

	NAME = 'form',

	CSS_FORM = getClassName(NAME),
	CSS_LABELS = getClassName('field', 'labels'),
	CSS_LABELS_INLINE = getClassName('field', 'labels', 'inline'),

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

					var values = _serialize(instance.get('contentBox').getDOM());

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

		HTML_PARSER: {
			action: function(contentBox) {
				var instance = this;

				return instance._attributeGetter(null, 'action');
			},

			method: function(contentBox) {
				var instance = this;

				return instance._attributeGetter(null, 'method');
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

}, '@VERSION@' ,{requires:['aui-base','aui-data-set','aui-form-field','querystring-parse','io-form']});
AUI.add('aui-form-combobox', function(A) {
var Lang = A.Lang,

	getClassName = A.getClassName,

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

}, '@VERSION@' ,{skinnable:true, requires:['aui-form-textarea','aui-toolbar']});
AUI.add('aui-form-field', function(A) {
var Lang = A.Lang,

	getClassName = A.getClassName,

	NAME = 'field',

	SPACE = ' ',

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

	CSS_FIELD_CHECKBOX = getClassName(NAME, 'checkbox'),
	CSS_FIELD_CHOICE = getClassName(NAME, 'choice'),

	CSS_FIELD_CONTENT = getClassName(NAME, 'content'),
	CSS_FIELD_INPUT = getClassName(NAME, 'input'),
	CSS_FIELD_HINT = getClassName(NAME, 'hint'),
	CSS_FIELD_INVALID = getClassName(NAME, 'invalid'),
	CSS_FIELD_LABEL = getClassName(NAME, 'label'),

	CSS_FIELD_RADIO = getClassName(NAME, 'radio'),

	CSS_LABELS = getClassName(NAME, 'labels'),
	CSS_LABELS_INLINE = getClassName(NAME, 'labels', 'inline'),

	CSS_LABEL_ALIGN = {
		left: [CSS_LABELS, 'left'].join('-'),
		right: [CSS_LABELS, 'right'].join('-'),
		top: [CSS_LABELS, 'top'].join('-')
	},

	MAP_CSS_FIELD_TYPES = {
		radio: CSS_FIELD_RADIO,
		checkbox: CSS_FIELD_CHECKBOX
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

			disabled: {
				value: false,
				validator: Lang.isBoolean
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
				validator: Lang.isString,
				writeOnce: true
			},

			labelAlign: {
				valueFn: function() {
					var instance = this;

					return instance._getChoiceCss() ? 'left' : null;
				}
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
			'disabled',
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

				instance.FIELD_TEMPLATE = Lang.sub(
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

			_getChoiceCss: function() {
				var instance = this;

				var type = instance.get('type');

				return MAP_CSS_FIELD_TYPES[type];
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

				var cssClass = [getTypeClassName(type)];

				var choiceCss = instance._getChoiceCss();

				if (choiceCss) {
					cssClass.push(CSS_FIELD_CHOICE);
					cssClass.push(choiceCss);
				}

				boundingBox.addClass(cssClass.join(SPACE));
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
					var labelAlign = instance.get('labelAlign');
					var type = instance.get('type').toLowerCase();

					var isLabelInline = REGEX_INLINE_LABEL.test(labelAlign);

					var action = 'prepend';

					if (isLabelInline && instance._getChoiceCss()) {
						action = 'append';
					}

					contentBox[action](labelNode);
				}
			},

			_setNodeValue: function(value) {
				var instance = this;

				instance._uiSetValue(value);

				return value;
			},

			_uiSetDisabled: function(val) {
				var instance = this;
				var node = instance.get('node');

				if (val) {
					node.setAttribute('disabled', val);
				}
				else {
					node.removeAttribute('disabled');
				}
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

}, '@VERSION@' ,{requires:['aui-base','aui-component']});
AUI.add('aui-form-select', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isObject = Lang.isObject,

	getClassName = A.getClassName,

	NAME = 'select',

	CSS_SELECT = getClassName(NAME),
	TPL_SELECT = '<select {multiple} class="{cssClass}" id="{id}" name="{name}"></select>';

var Select = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {

			multiple: {
				value: false
			},

			options: {
				value: [],
				setter: '_setOptions'
			},

			selectedIndex: {
				value: -1
			}
		},

		UI_ATTRS: ['multiple', 'options', 'selectedIndex'],

		EXTENDS: A.Field,

		HTML_PARSER: {
			node: 'select'
		},

		prototype: {
			FIELD_TEMPLATE: TPL_SELECT,
			FIELD_TYPE: NAME,

			_setOptions: function(value) {
				var instance = this;

				if (!isArray(value)) {
					value = [value];
				}

				return value;
			},

			_uiSetMultiple: function(value) {
				var instance = this;

				instance.get('node').attr('multiple', value);
			},

			_uiSetOptions: function(value) {
				var instance = this;

				var buffer = [];

				var option;
				var optionLabel;
				var optionValue;
				var selectedIndex = 0;

				for (var i = 0; i < value.length; i++) {
					option = value[i];
					optionLabel = option.labelText || option;
					optionValue = option.value || option;

					if (option.selected) {
						selectedIndex = i;
					}

					buffer.push('<option value="' + optionValue + '">' + optionLabel + '</option>');
				}

				var node = instance.get('node');

				node.all('option').remove(true);

				node.append(buffer.join(''));

				instance.set('selectedIndex', selectedIndex);
			},

			_uiSetSelectedIndex: function(value) {
				var instance = this;

				if (value > -1) {
					instance.get('node').attr('selectedIndex', value);
				}
			}
		}
	}
);

A.Select = Select;

}, '@VERSION@' ,{requires:['aui-form-field']});
AUI.add('aui-form-textarea', function(A) {
var Lang = A.Lang,

	getClassName = A.getClassName,

	DOC = A.config.doc,

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
				var textNode = DOC.createTextNode(content);

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

}, '@VERSION@' ,{skinnable:true, requires:['aui-form-textfield']});
AUI.add('aui-form-textfield', function(A) {
var Lang = A.Lang,

	getClassName = A.getClassName,

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


AUI.add('aui-form', function(A){}, '@VERSION@' ,{use:['aui-form-base','aui-form-combobox','aui-form-field','aui-form-select','aui-form-textarea','aui-form-textfield'], skinnable:false});

