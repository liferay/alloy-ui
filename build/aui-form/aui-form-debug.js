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

}, '@VERSION@' ,{skinnable:true, requires:['aui-form-textarea','aui-toolbar']});
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
AUI.add('aui-form-manager', function(A) {
/**********************************************************************
 * <p>FormManager provides support for initializing a form, pre-validating
 * user input, and displaying messages returned by the server.</p>
 *
 * <p><strong>Required Markup Structure</strong></p>
 *
 * <p>Each element (or tighly coupled set of elements) must be contained by
 * an element that has the CSS class <code>formmgr-row</code>.  Within each
 * row, validation messages are displayed inside the container with CSS
 * class <code>formmgr-message-text</code>.
 *
 * <p>When a message is displayed inside a row, the CSS class
 * <code>formmgr-has{type}</code> is placed on the row container and the
 * containing fieldset (if any), where <code>{type}</code> is the message
 * type passed to <code>displayMessage()</code>.</p>
 *
 * <p><strong>Initializing the Form</strong></p>
 *
 * <p>Default values can be either encoded in the markup or passed to the
 * FormManager constructor via <code>config.default_value_map</code>.  (The
 * former method is obviously better for progressive enhancement.)  The
 * values passed to the constructor override the values encoded in the
 * markup.</p>
 *
 * <p><code>prepareForm()</code> must be called before the form is
 * displayed.  To initialize focus to the first element in a form, call
 * <code>initFocus()</code>.  If the form is in an overlay, you can delay
 * these calls until just before showing the overlay.</p>
 *
 * <p>The default values passed to the constructor are inserted by
 * <code>populateForm()</code>.  (This is automatically called by
 * <code>prepareForm()</code>.)</p>
 *
 * <p><strong>Displaying Messages</strong></p>
 *
 * <p>To display a message for a single form row, call
 * <code>displayMessage()</code>.  To display a message for the form in
 * general, call <code>displayFormMessage()</code>.  These functions can be
 * used for initializing the error display when the page loads, for
 * displaying the results of pre-validation, and for displaying the results
 * of submitting a form via XHR.</p>
 *
 * <p><strong>Specifying Validations</strong></p>
 *
 * <p>The following classes can be applied to a form element for
 * pre-validation:</p>
 *
 *	<dl>
 *	<dt><code>aui-required</code></dt>
 *		<dd>Value must not be empty.</dd>
 *
 *	<dt><code>aui-length:[x,y]</code></dt>
 *		<dd>String must be at least x characters and at most y characters.
 *		At least one of x and y must be specified.</dd>
 *
 *	<dt><code>aui-integer:[x,y]</code></dt>
 *		<dd>The integer value must be at least x and at most y.
 *		x and y are both optional.</dd>
 *
 *	<dt><code>aui-decimal:[x,y]</code></dt>
 *		<dd>The decimal value must be at least x and at most y.  Exponents are
 *		not allowed.  x and y are both optional.</dd>
 *	</dl>
 *
 * <p>If we ever need to allow exponents, we can use aui-float.</p>
 *
 * <p>The following functions allow additional pre-validation to be
 * attached to individual form elements:</p>
 *
 * <dl>
 * <dt><code>setRegex()</code></dt>
 *		<dd>Sets the regular expression that must match in order for the value
 *		to be acceptable.</dd>
 *
 * <dt><code>setFunction()</code></dt>
 *		<dd>Sets the function that must return true in order for the value to
 *		be acceptable.  The function is called in the scope of the Form
 *		object with the arguments:  the form and the element.</dd>
 * </dl>
 *
 * <p><code>setErrorMessages()</code> specifies the error message to be
 * displayed when a pre-validation check fails.</p>
 *
 * <p>Functions are expected to call <code>displayMessage()</code>
 * directly.</p>
 *
 * <p>More complex pre-validations can be added by overriding
 * <code>postValidateForm()</code>, described below.</p>
 *
 * <p>Derived classes may also override the following functions:</p>
 *
 * <dl>
 * <dt><code>prePrepareForm</code>(arguments passed to prepareForm)</dt>
 *		<dd>Called before filling in default values for the form elements.
 *		Return false to cancel dialog.</dd>
 *
 * <dt><code>postPrepareForm</code>(arguments passed to prepareForm)</dt>
 *		<dd>Called after filling in default values for the form elements.</dd>
 *
 * <dt><code>postValidateForm</code>(form)</dt>
 *		<dd>Called after performing the basic pre-validations.  Returns
 *		true if the form contents are acceptable.  Reports error if there
 *		is a problem.</dd>
 * </dl>
 *
 * @module gallery-formmgr
 * @class FormManager
 * @constructor
 * @param form_name {String} The name attribute of the HTML form.
 * @param config {Object} Configuration.
 *		<code>status_node</code> is an optional element in which to display
 *		overall status.  <code>default_value_map</code> is an optional
 *		mapping of form element names to default values.  Default values
 *		encoded in the markup will be merged into this map, but values
 *		passed to the constructor will take precedence.
 */

function FormManager(
	/* string */	form_name,
	/* object */	config)		// {status_node, default_value_map}
{
	if (arguments.length === 0)	// derived class prototype
	{
		return;
	}

	if (!config)
	{
		config = {};
	}

	this.form_name   = form_name;
	this.status_node = A.one(config.status_node);
	this.enabled     = true;

	// default values for form elements

	this.default_value_map = config.default_value_map;

	// pre-validation methods

	this.validation =
	{
		fn:    {},	// function for validating each element id
		regex: {}	// regex for validating each element id
	};

	// error messages

	this.validation_msgs = {};		// message list, keyed on type, for each element id

	this.has_messages = false;
	this.has_errors   = false;

	// buttons -- disabled during submission

	this.button_list      = [];
	this.user_button_list = [];

	// file uploading is nasty

	this.has_file_inputs = false;
}

// CSS class pattern bookends

var class_re_prefix = '(?:^|\\s)(?:';
var class_re_suffix = ')(?:\\s|$)';

// pre-validation classes

var required_class    = 'aui-required';
var length_class_re   = /(?:^|\s+)aui-length:\[([0-9]+)?,([1-9][0-9]*)?\](?:\s+|$)/;
var integer_class_re  = /(?:^|\s+)aui-integer(?::\[([-+]?[0-9]+)?,([-+]?[0-9]+)?\])?(?:\s+|$)/;
var decimal_class_re  = /(?:^|\s+)aui-decimal(?::\[([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?,([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?\])?(?:\s+|$)/;

/**
 * Regular expression used to determine if a value is an integer.
 * This can be localized, e.g., allow for thousands separator.
 *
 * @config A.FormManager.integer_value_re
 * @type {RegExp}
 * @static
 */
FormManager.integer_value_re = /^[-+]?[0-9]+$/;

/**
 * Regular expression used to determine if a value is a decimal number.
 * This can be localized, e.g., use the correct decimal separator.
 *
 * @config A.FormManager.decimal_value_re
 * @type {RegExp}
 * @static
 */
FormManager.decimal_value_re = /^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)$/;

/**
 * The CSS class which marks each row of the form.  Typically, each element
 * (or a very tightly coupled set of elements) is placed in a separate row.
 *
 * @property A.FormManager.row_marker_class
 * @type {String}
 */
FormManager.row_marker_class = 'aui-field';

/**
 * The CSS class which marks the container for the status message within a
 * row of the form.
 *
 * @property A.FormManager.status_marker_class
 * @type {String}
 */
FormManager.status_marker_class = 'aui-message-holder';

/**
 * The CSS class placed on <code>status_node</code> when it is empty.
 *
 * @property A.FormManager.status_none_class
 * @type {String}
 */
FormManager.status_none_class = 'aui-helper-hidden';

/**
 * The CSS class placed on <code>status_node</code> when
 * <code>displayFormMessage()</code> is called with
 * <code>error=false</code>.
 *
 * @property A.FormManager.status_success_class
 * @type {String}
 */
FormManager.status_success_class = 'aui-status-success';

/**
 * The CSS class placed on <code>status_node</code> when
 * <code>displayFormMessage()</code> is called with
 * <code>error=true</code>.
 *
 * @property A.FormManager.status_failure_class
 * @type {String}
 */
FormManager.status_failure_class = 'aui-status-failure';

/**
 * The prefix for all CSS classes placed on a form row when pre-validation
 * fails.  The full CSS class is formed by appending the value from
 * <code>A.FormManager.status_order</code>.
 *
 * @property A.FormManager.row_status_prefix
 * @type {String}
 */
FormManager.row_status_prefix = 'aui-has-';

var status_pattern     = FormManager.status_success_class+'|'+FormManager.status_failure_class;
var row_status_pattern = FormManager.row_status_prefix + '([^\\s]+)';
var row_status_regex   = new RegExp(class_re_prefix + row_status_pattern + class_re_suffix);

/**
 * <p>Map of localizable strings used by pre-validation.</p>
 *
 * <dl>
 * <dt><code>validation_error</code></dt>
 * <dd>Displayed in <code>status_node</code> by <code>notifyErrors()</code> when pre-validation fails.</dd>
 * <dt><code>required_string</code></dt>
 * <dd>Displayed when <code>aui-required</code> fails on an input field.</dd>
 * <dt><code>required_menu</code></dt>
 * <dd>Displayed when <code>aui-required</code> fails on a select element.</dd>
 * <dt><code>length_too_short</code>, <code>length_too_long</code>, <code>length_out_of_range</code></dt>
 * <dd>Displayed when <code>aui-length</code> fails on an input field.</dd>
 * <dt><code>integer</code>, <code>integer_too_small</code>, <code>integer_too_large</code>, <code>integer_out_of_range</code></dt>
 * <dd>Displayed when <code>aui-integer</code> fails on an input field.</dd>
 * <dt><code>decimal</code>, <code>decimal_too_small</code>, <code>decimal_too_large</code>, <code>decimal_out_of_range</code></dt>
 * <dd>Displayed when <code>aui-decimal</code> fails on an input field.</dd>
 * </dl>
 *
 * @config A.FormManager.Strings
 * @type {Object}
 * @static
 */
FormManager.Strings =
{
	validation_error:     'Correct errors in the highlighted fields before continuing.',

	required_string:      'This field requires a value.',
	required_menu:        'This field is required. Choose a value from the pull-down list.',

	length_too_short:     'Enter text that is at least {min} characters or longer.',
	length_too_long:      'Enter text that is up to {max} characters long.',
	length_out_of_range:  'Enter text that is {min} to {max} characters long.',

	integer:              'Enter a whole number (no decimal point).',
	integer_too_small:    'Enter a number that is {min} or higher (no decimal point).',
	integer_too_large:    'Enter a number that is {max} or lower (no decimal point).',
	integer_out_of_range: 'Enter a number between or including {min} and {max} (no decimal point).',

	decimal:              'Enter a number.',
	decimal_too_small:    'Enter a number that is {min} or higher.',
	decimal_too_large:    'Enter a number that is {max} or lower.',
	decimal_out_of_range: 'Enter a number between or including {min} and {max}.'
};

/**
 * <p>Names of supported status values, highest precedence first.  Default:
 * <code>[ 'error', 'warn', 'success', 'info' ]</code></p>
 *
 * <p>This is static because it links to CSS rules that define the
 * appearance of each status type:  .formmgr-has{status}</p>
 *
 * @config A.FormManager.status_order
 * @type {Array}
 * @static
 */
FormManager.status_order =
[
	'error',
	'warn',
	'success',
	'info'
];

/**
 * Get the precedence of the given status name.
 *
 * @method A.FormManager.getStatusPrecedence
 * @static
 * @param status {String} The name of the status value.
 * @return {int} The position in the <code>status_order</code> array.
 */
FormManager.getStatusPrecedence = function(
	/* string */	status)
{
	for (var i=0; i<FormManager.status_order.length; i++)
	{
		if (status == FormManager.status_order[i])
		{
			return i;
		}
	}

	return FormManager.status_order.length;
};

/**
 * Compare two status values.
 *
 * @method A.FormManager.statusTakesPrecendence
 * @static
 * @param orig_status {String} The name of the original status value.
 * @param new_status {String} The name of the new status value.
 * @return {boolean} <code>true</code> if <code>new_status</code> takes precedence over <code>orig_status</code>
 */
FormManager.statusTakesPrecendence = function(
	/* string */	orig_status,
	/* string */	new_status)
{
	return (!orig_status || FormManager.getStatusPrecedence(new_status) < FormManager.getStatusPrecedence(orig_status));
};

/**
 * Get the status of the given fieldset or form row.
 *
 * @method A.FormManager.getElementStatus
 * @static
 * @param e {String|Object} The descriptor or DOM element.
 * @return {mixed} The status (String) or <code>false</code>.
 */
FormManager.getElementStatus = function(
	/* string/object */	e)
{
	var m = A.one(e).get('className').match(row_status_regex);
	if (m && m.length)
	{
		return m[1];
	}
	else
	{
		return false;
	}
};

function getId(
	/* string/Node/object */	e)
{
	if (A.Lang.isString(e))
	{
		return e.replace(/^#/, '');
	}
	else if (e instanceof A.Node)
	{
		return e.get('id');
	}
	else
	{
		return e.id;
	}
}

function hasLimit(
	/* string */	s)
{
	return (!A.Lang.isUndefined(s) && s.length > 0);
}

function populateForm1()
{
	var collect_buttons = (this.button_list.length === 0);

	for (var i=0; i<this.form.elements.length; i++)
	{
		var e = this.form.elements[i];

		var type = (e.type ? e.type.toLowerCase() : null);
		if (collect_buttons &&
			(type == 'submit' || type == 'reset' || type == 'button'))
		{
			this.button_list.push(e);
		}

		if (!e.name)
		{
			continue;
		}

		var name = e.tagName.toLowerCase();

		var v = this.default_value_map[ e.name ];
		if (name == 'input' && type == 'file')
		{
			e.value = '';
		}
		else if (A.Lang.isUndefined(v))
		{
			// save value for next time

			if (name == 'input' &&
				(type == 'password' || type == 'text'))
			{
				this.default_value_map[ e.name ] = e.value;
			}
			else if (name == 'input' && type == 'checkbox')
			{
				this.default_value_map[ e.name ] = (e.checked ? e.value : '');
			}
			else if (name == 'input' && type == 'radio')
			{
				var rb = this.form[ e.name ];	// null if dynamically generated in IE
				if (rb && !rb.length)
				{
					this.default_value_map[ e.name ] = rb.value;
				}
				else if (rb)
				{
					this.default_value_map[ e.name ] = rb[0].value;

					for (var j=0; j<rb.length; j++)
					{
						if (rb[j].checked)
						{
							this.default_value_map[ e.name ] = rb[j].value;
							break;
						}
					}
				}
			}
			else if ((name == 'select' && type == 'select-one') ||
					 name == 'textarea')
			{
				this.default_value_map[ e.name ] = e.value;
			}
		}
		else if (name == 'input' &&
				 (type == 'password' || type == 'text'))
		{
			e.value = v;
		}
		else if (name == 'input' &&
				 (type == 'checkbox' || type == 'radio'))
		{
			e.checked = (e.value == v);
		}
		else if (name == 'select' && type == 'select-one')
		{
			e.value = v;
			if (e.selectedIndex >= 0 &&
				e.options[ e.selectedIndex ].value !== v.toString())
			{
				e.selectedIndex = -1;
			}
		}
		else if (name == 'textarea')
		{
			e.value = v;
		}
	}
}

FormManager.prototype =
{
	/* *********************************************************************
	 * Access functions.
	 */

	/**
	 * @return {DOM} The form DOM element.
	 */
	getForm: function()
	{
		if (!this.form)
		{
			this.form = document.forms[ this.form_name ];
		}
		return this.form;
	},

	/**
	 * @return {boolean} <code>true</code> if the form contains file inputs.  These require special treatment when submitting via XHR.
	 */
	hasFileInputs: function()
	{
		return this.has_file_inputs;
	},

	/**
	 * Set the default values for all form elements.
	 *
	 * @param default_value_map {Object} Mapping of form element names to values.
	 */
	setDefaultValues: function(
		/* object */	default_value_map)
	{
		this.default_value_map = default_value_map;
	},

	/**
	 * Set the default values for a single form element.
	 *
	 * @param field_name {String} The form element name.
	 * @param default_value {String|Int|Float} The default value.
	 */
	setDefaultValue: function(
		/* string*/		field_name,
		/* string */	default_value)
	{
		this.default_value_map[ field_name ] = default_value;
	},

	/**
	 * Store the current form values in <code>default_value_map</code>.
	 */
	saveCurrentValuesAsDefault: function()
	{
		this.default_value_map = {};
		this.button_list       = [];
		populateForm1.call(this);
	},

	/* *********************************************************************
	 * Validation control
	 */

	/**
	 * Set the validation function for a form element.
	 *
	 * @param id {String|Object} The selector for the element or the element itself
	 * @param f {Function|String|Object}
	 *		The function to call after basic validations succeed.  If this
	 *		is a String, it is resolved in the scope of the FormManager
	 *		object.  If this is an object, it must be <code>{fn:,
	 *		scope:}</code>.  The function will then be invoked in the
	 *		specified scope.
	 */
	setFunction: function(
		/* string */				id,
		/* function/string/obj */	f)
	{
		this.validation.fn[ getId(id) ] = f;
	},

	/**
	 * <p>Set the regular expression used to validate the field value.</p>
	 *
	 * <p><strong>Since there is no default message for failed regular
	 * expression validation, this function will complain if you have not
	 * already called <code>setErrorMessages()</code> or
	 * <code>addErrorMessage</code> to specify an error message.</strong></p>
	 *
	 * @param id {String|Object} The selector for the element or the element itself
	 * @param regex {String|RegExp} The regular expression to use
	 * @param flags {String} If regex is a String, these are the flags used to construct a RegExp.
	 */
	setRegex: function(
		/* string */		id,
		/* string/RegExp */	regex,
		/* string */		flags)		// ignored if regex is RegExp object
	{
		id = getId(id);

		if (A.Lang.isString(regex))
		{
			this.validation.regex[id] = new RegExp(regex, flags);
		}
		else
		{
			this.validation.regex[id] = regex;
		}

		if (!this.validation_msgs[id] || !this.validation_msgs[id].regex)
		{
		}
	},

	/**
	 * <p>Set the error messages for a form element.  This can be used to
	 * override the default messages for individual elements</p>
	 *
	 * <p>The valid error types are:</p>
	 *	<dl>
	 *	<dt><code>required</code></dt>
	 *	<dt><code>min_length</code></dt>
	 *		<dd><code>{min}</code> and <code>{max}</code> are replaced</dd>
	 *	<dt><code>max_length</code></dt>
	 *		<dd><code>{min}</code> and <code>{max}</code> are replaced</dd>
	 *	<dt><code>integer</code></dt>
	 *		<dd><code>{min}</code> and <code>{max}</code> are replaced</dd>
	 *	<dt><code>decimal</code></dt>
	 *		<dd><code>{min}</code> and <code>{max}</code> are replaced</dd>
	 *	<dt><code>regex</code></dt>
	 *		<dd>This <string>must</strong> be set for elements which validate with regular expressions.</dd>
	 *	</dl>
	 *
	 * @param id {String|Object} The selector for the element or the element itself
	 * @param map {Object} Map of error types to error messages.
	 */
	setErrorMessages: function(
		/* string */	id,
		/* object */	map)
	{
		this.validation_msgs[ getId(id) ] = map;
	},

	/**
	 * Set one particular error message for a form element.
	 *
	 * @param id {String|Object} The selector for the element or the element itself
	 * @param error_type {String} The error message type.  Refer to setErrorMessages() for details.
	 * @param msg {String} The error message
	 */
	addErrorMessage: function(
		/* string */	id,
		/* string */	error_type,
		/* string */	msg)
	{
		id = getId(id);
		if (!this.validation_msgs[id])
		{
			this.validation_msgs[id] = {};
		}
		this.validation_msgs[id][error_type] = msg;
	},

	/**
	 * Reset all values in the form to the defaults specified in the markup.
	 */
	clearForm: function()
	{
		this.clearMessages();
		this.form.reset();
		this.postPopulateForm();
	},

	/**
	 * Reset all values in the form to the defaults passed to the constructor.
	 */
	populateForm: function()
	{
		if (!this.default_value_map)
		{
			this.default_value_map = {};
		}

		this.clearMessages();

		populateForm1.call(this);

		// let derived class adjust

		this.postPopulateForm();
	},

	/**
	 * Hook for performing additional actions after
	 * <code>populateForm()</code> completes.
	 */
	postPopulateForm: function()
	{
	},

	/**
	 * Check if form values have been modified.
	 *
	 * @return {boolean} <code>false</code> if all form elements have the default values passed to the constructor
	 */
	isChanged: function()
	{
		for (var i=0; i<this.form.elements.length; i++)
		{
			var e = this.form.elements[i];
			if (!e.name)
			{
				continue;
			}

			var type = (e.type ? e.type.toLowerCase() : null);
			var name = e.tagName.toLowerCase();
			var v    = this.default_value_map[ e.name ];
			if (v === null || typeof v === 'undefined')
			{
				v = "";
			}

			if (name == 'input' && type == 'file')
			{
				if (e.value)
				{
					return true;
				}
			}
			else if (name == 'input' &&
					 (type == 'password' || type == 'text' || type == 'file'))
			{
				if (e.value != v)
				{
					return true;
				}
			}
			else if (name == 'input' &&
					 (type == 'checkbox' || type == 'radio'))
			{
				var checked = (e.value == v);
				if ((checked && !e.checked) || (!checked && e.checked))
				{
					return true;
				}
			}
			else if ((name == 'select' && type == 'select-one') ||
					 name == 'textarea')
			{
				if (e.value != v)
				{
					return true;
				}
			}
		}

		return false;
	},

	/**
	 * Prepare the form for display.
	 *
	 * @return {boolean} <code>true</code> if both pre & post hooks are happy
	 */
	prepareForm: function()
	{
		this.getForm();

		if (!this.prePrepareForm.apply(this, arguments))
		{
			return false;
		}

		// clear all errors

		this.clearMessages();

		// fill in starting values

		this.populateForm();

		return this.postPrepareForm.apply(this, arguments);
	},

	/**
	 * Hook called before <code>prepareForm()</code> executes.
	 *
	 * @return {boolean} <code>false</code> cancels <code>prepareForm()</code>.
	 */
	prePrepareForm: function()
	{
		return true;
	},

	/**
	 * Hook called after <code>prepareForm()</code> executes.
	 *
	 * @return {boolean} Return value from this function is returned by <code>prepareForm()</code>.
	 */
	postPrepareForm: function()
	{
		return true;
	},

	/**
	 * Set focus to first input field.  If a page contains multiple forms,
	 * only call this for one of them.
	 */
	initFocus: function()
	{
		for (var i=0; i<this.form.elements.length; i++)
		{
			var e = this.form.elements[i];
			if (e.disabled || e.offsetHeight === 0)
			{
				continue;
			}

			var name = e.tagName.toLowerCase();
			var type = (e.type ? e.type.toLowerCase() : null);

			if ((name == 'input' &&
				 (type == 'file' || type == 'password' || type == 'text')) ||
				name == 'textarea')
			{
				try
				{
					e.focus();
				}
				catch (ex)
				{
					// no way to determine in IE if this will fail
				}
				e.select();
				break;
			}
		}
	},

	/**
	 * Validate the form.
	 */
	validateForm: function()
	{
		this.clearMessages();
		var status = true;

		this.has_file_inputs = false;

		var e = this.form.elements;
		for (var i=0; i<e.length; i++)
		{
			if (e[i].type && e[i].type.toLowerCase() == 'file')
			{
				this.has_file_inputs = true;
			}
			else if (e[i].type && e[i].type.toLowerCase() == 'select-multiple')
			{
				// don't change the value
			}
			else if (e[i].value)
			{
				e[i].value = A.Lang.trim(e[i].value);
			}
		}

		for (i=0; i<e.length; i++)
		{
			var e_id     = e[i].id;
			var msg_list = this.validation_msgs[e_id];

			var required = A.one(e[i]).hasClass(required_class);
			if (required && e[i].value === '')
			{
				var msg = null;
				if (msg_list && msg_list.required)
				{
					msg = msg_list.required;
				}
				else if (e[i].tagName.toLowerCase() == 'select')
				{
					msg = FormManager.Strings.required_menu;
				}
				else
				{
					msg = FormManager.Strings.required_string;
				}
				this.displayMessage(e[i], msg, 'error');
				status = false;
				continue;
			}
			else if (!required && e[i].value === '')
			{
				continue;
			}

			if (e[i].className)
			{
				var m = e[i].className.match(length_class_re);
				if (m && m.length)
				{
					var msg     = null;
					var has_min = (hasLimit(m[1]) && m[1] !== '0');
					if (has_min && hasLimit(m[2]))
					{
						msg = FormManager.Strings.length_out_of_range;
					}
					else if (has_min)
					{
						msg = FormManager.Strings.length_too_short;
					}
					else if (hasLimit(m[2]))
					{
						msg = FormManager.Strings.length_too_long;
					}

					if (hasLimit(m[1]) &&
						hasLimit(m[2]) &&
						parseInt(m[1], 10) > parseInt(m[2], 10))
					{
					}

					if (e[i].value && hasLimit(m[1]) &&
						e[i].value.length < parseInt(m[1], 10))
					{
						if (msg_list && msg_list.min_length)
						{
							msg = msg_list.min_length;
						}
						msg = A.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});

						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
					if (e[i].value && hasLimit(m[2]) &&
						e[i].value.length > parseInt(m[2], 10))
					{
						if (msg_list && msg_list.max_length)
						{
							msg = msg_list.max_length;
						}
						msg = A.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});

						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
				}

				var m = e[i].className.match(integer_class_re);
				if (m && m.length)
				{
					var msg = null;
					if (msg_list && msg_list.integer)
					{
						msg = msg_list.integer;
					}
					else if (hasLimit(m[1]) &&
							 hasLimit(m[2]))
					{
						if (parseInt(m[1], 10) > parseInt(m[2], 10))
						{
						}

						msg = FormManager.Strings.integer_out_of_range;
					}
					else if (hasLimit(m[1]))
					{
						msg = FormManager.Strings.integer_too_small;
					}
					else if (hasLimit(m[2]))
					{
						msg = FormManager.Strings.integer_too_large;
					}
					else
					{
						msg = FormManager.Strings.integer;
					}
					msg = A.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});

					var value = parseInt(e[i].value, 10);
					if (e[i].value &&
						(!FormManager.integer_value_re.test(e[i].value) ||
						 (hasLimit(m[1]) && value < parseInt(m[1], 10)) ||
						 (hasLimit(m[2]) && value > parseInt(m[2], 10))))
					{
						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
				}

				var m = e[i].className.match(decimal_class_re);
				if (m && m.length)
				{
					var msg = null;
					if (msg_list && msg_list.decimal)
					{
						msg = msg_list.decimal;
					}
					else if (hasLimit(m[1]) &&
							 hasLimit(m[2]))
					{
						if (parseFloat(m[1]) > parseFloat(m[2]))
						{
						}

						msg = FormManager.Strings.decimal_out_of_range;
					}
					else if (hasLimit(m[1]))
					{
						msg = FormManager.Strings.decimal_too_small;
					}
					else if (hasLimit(m[2]))
					{
						msg = FormManager.Strings.decimal_too_large;
					}
					else
					{
						msg = FormManager.Strings.decimal;
					}
					msg = A.substitute(msg, {min: parseFloat(m[1], 10), max: parseFloat(m[2], 10)});

					var value = parseFloat(e[i].value);
					if (e[i].value &&
						(!FormManager.decimal_value_re.test(e[i].value) ||
						 (hasLimit(m[1]) && value < parseFloat(m[1])) ||
						 (hasLimit(m[2]) && value > parseFloat(m[2]))))
					{
						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
				}
			}

			if (this.validation.regex[e_id] &&
				!this.validation.regex[e_id].test(e[i].value))
			{
				this.displayMessage(e[i], msg_list ? msg_list.regex : null, 'error');
				status = false;
				continue;
			}

			var f     = this.validation.fn[e_id];
			var scope = this;
			if (A.Lang.isFunction(f))
			{
				// use it
			}
			else if (A.Lang.isString(f))
			{
				f = scope[f];
			}
			else if (f && f.scope)
			{
				scope = f.scope;
				f     = (A.Lang.isString(f.fn) ? scope[f.fn] : f.fn);
			}
			else
			{
				f = null;
			}

			if (f && !f.call(scope, this.form, A.one(e[i])))
			{
				status = false;
				continue;
			}
		}

		if (!this.postValidateForm(this.form))
		{
			status = false;
		}

		if (!status)
		{
			this.notifyErrors();
		}

		return status;
	},

	/**
	 * Hook called at the end of <code>validateForm()</code>.  This is the
	 * best place to put holistic validations that touch multiple form
	 * elements.
	 *
	 * @return {boolean} <code>false</code> if validation fails
	 */
	postValidateForm: function(
		/* DOM element */	form)
	{
		return true;
	},

	/* *********************************************************************
	 * Buttons can be disabled during submission.
	 */

	/**
	 * Register a button that can be disabled.  Buttons contained within
	 * the form DOM element are automatically registered.
	 *
	 * @param el {String|Object} The selector for the element or the element itself
	 */
	registerButton: function(
		/* string/object */ el)
	{
		var info =
		{
			e: A.one(el)
		};

		this.user_button_list.push(info);
	},

	/**
	 * Enable all the registered buttons.
	 */
	enableForm: function()
	{
		this.setFormEnabled(true);
	},

	/**
	 * Disable all the registered buttons.
	 */
	disableForm: function()
	{
		this.setFormEnabled(false);
	},

	/**
	 * Set the enabled state all the registered buttons.
	 *
	 * @param enabled {boolean} <code>true</code> to enable the form, <code>false</code> to disable the form
	 */
	setFormEnabled: function(
		/* boolean */	enabled)
	{
		this.enabled = enabled;

		var disabled = ! enabled;
		for (var i=0; i<this.button_list.length; i++)
		{
			this.button_list[i].disabled = disabled;
		}

		for (i=0; i<this.user_button_list.length; i++)
		{
			var info = this.user_button_list[i];
			info.e.set('disabled', disabled);
		}
	},

	/* *********************************************************************
	 * Message display
	 */

	/**
	 * @return {boolean} <code>true</code> if there are any messages displayed, of any type
	 */
	hasMessages: function()
	{
		return this.has_messages;
	},

	/**
	 * @return {boolean} <code>true</code> if there are any error messages displayed
	 */
	hasErrors: function()
	{
		return this.has_errors;
	},

	/**
	 * Get the message type displayed for the row containing the specified element.
	 *
	 * @param e {String|Object} The selector for the element or the element itself
	 * @return {mixed} The status (String) or <code>false</code>.
	 */
	getRowStatus: function(
		/* id/object */	e)
	{
		var p = A.one(e).ancestor('.'+FormManager.row_marker_class);
		return FormManager.getElementStatus(p);
	},

	/**
	 * Clear all messages in <code>status_node</code> and the form rows.
	 */
	clearMessages: function()
	{
		this.has_messages = false;
		this.has_errors   = false;

		if (this.status_node)
		{
			this.status_node.set('innerHTML', '');
			this.status_node.replaceClass(status_pattern, FormManager.status_none_class);
		}

		for (var i=0; i<this.form.elements.length; i++)
		{
			var e = this.form.elements[i];
			var p = A.one(e).ancestor('.'+FormManager.row_marker_class);
			if (p && p.hasClass(row_status_pattern))
			{
				p.all('.'+FormManager.status_marker_class).set('innerHTML', '');
				p.removeClass(row_status_pattern);
			}
		}

		A.one(this.form).all('fieldset').removeClass(row_status_pattern);
	},

	/**
	 * Display a message for the form row containing the specified element.
	 * The message will only be displayed if no message with a higher
	 * precedence is already visible. (see A.FormManager.status_order)
	 *
	 * @param e {String|Object} The selector for the element or the element itself
	 * @param msg {String} The message
	 * @param type {String} The message type (see A.FormManager.status_order)
	 * @param scroll {boolean} <code>true</code> if the form row should be scrolled into view
	 */
	displayMessage: function(
		/* id/object */	e,
		/* string */	msg,
		/* string */	type,
		/* boolean */	scroll)
	{
		if (A.Lang.isUndefined(scroll))
		{
			scroll = true;
		}

		e     = A.one(e);
		var p = e.ancestor('.'+FormManager.row_marker_class);
		if (p && FormManager.statusTakesPrecendence(FormManager.getElementStatus(p), type))
		{
			if (msg)
			{
				p.all('.'+FormManager.status_marker_class).set('innerHTML', msg);
			}

			p.removeClass(row_status_pattern);
			p.addClass(FormManager.row_status_prefix + type);

			var fieldset = e.ancestor('fieldset');
			if (fieldset && FormManager.statusTakesPrecendence(FormManager.getElementStatus(fieldset), type))
			{
				fieldset.removeClass(row_status_pattern);
				fieldset.addClass(FormManager.row_status_prefix + type);
			}

			if (!this.has_messages && scroll && e.get('offsetHeight') > 0)
			{
				p.scrollIntoView();
				try
				{
					e.focus();
				}
				catch (ex)
				{
					// no way to determine in IE if this will fail
				}
			}

			this.has_messages = true;
			if (type == 'error')
			{
				this.has_errors = true;
			}
		}
	},

	/**
	 * Displays a generic message in <code>status_node</code> stating that
	 * the form data failed to validate.  Override this if you want to get
	 * fancy.
	 */
	notifyErrors: function()
	{
		this.displayFormMessage(FormManager.Strings.validation_error, true, false);
	},

	/**
	 * Display a message in <code>status_node</code>.
	 *
	 * @param msg {String} The message
	 * @param error {boolean} <code>true</code> if the message is an error
	 * @param scroll {boolean} <code>true</code> if <code>status_node</code> should be scrolled into view
	 */
	displayFormMessage: function(
		/* string */	msg,
		/* boolean */	error,
		/* boolean */	scroll)
	{
		if (A.Lang.isUndefined(scroll))
		{
			scroll = true;
		}

		if (this.status_node)
		{
			if (!this.status_node.innerHTML)
			{
				this.status_node.replaceClass(
					FormManager.status_none_class,
					(error ? FormManager.status_failure_class :
							 FormManager.status_success_class));
				this.status_node.set('innerHTML', msg);
			}

			if (scroll)
			{
				this.status_node.scrollIntoView();
			}
		}
		else
		{
		}
	}
};

A.FormManager = FormManager;

}, '@VERSION@' ,{requires:['aui-base','substitute']});
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

}, '@VERSION@' ,{skinnable:true, requires:['aui-form-textfield']});
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
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isDate = L.isDate,
	isEmpty = O.isEmpty,
	isFunction = L.isFunction,
	isNumber = L.isNumber,
	isObject = L.isObject,
	isString = L.isString,
	trim = L.trim,

	EMPTY_STRING = '',
	FORM_VALIDATOR = 'form-validator',
	INVALID_DATE = 'Invalid Date',
	PIPE = '|',

	BLUR_HANDLERS = 'blurHandlers',
	CHECKBOX = 'checkbox',
	CONTAINER = 'container',
	ERROR = 'error',
	ERROR_CLASS = 'errorClass',
	ERROR_CONTAINER = 'errorContainer',
	FORM = 'form',
	INPUT_HANDLERS = 'inputHandlers',
	MESSAGE = 'message',
	MESSAGES = 'messages',
	MESSAGE_CONTAINER = 'messageContainer',
	NAME = 'name',
	RADIO = 'radio',
	RULES = 'rules',
	SHOW_ALL_MESSAGES = 'showAllMessages',
	SHOW_MESSAGES = 'showMessages',
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
	CSS_VALID = getCN(FORM_VALIDATOR, VALID),

	CSS_ERROR_CONTAINER = getCN(FORM_VALIDATOR, ERROR, CONTAINER),
	CSS_MESSAGE_CONTAINER = getCN(FORM_VALIDATOR, MESSAGE, CONTAINER),

	TPL_ERROR_CONTAINER = '<label class="'+CSS_ERROR_CONTAINER+'"></label>',
	TPL_MESSAGE_CONTAINER = '<div class="'+CSS_MESSAGE_CONTAINER+'"></div>';

function FormValidator() {
	FormValidator.superclass.constructor.apply(this, arguments);
}

A.mix(FormValidator, {
	NAME: FORM_VALIDATOR,

	ATTRS: {
		errorContainer: {
			getter: function(val) {
				return A.Node.create(val).cloneNode(true);
			},
			value: TPL_ERROR_CONTAINER
		},

		errorClass: {
			value: CSS_ERROR,
			validator: isString
		},

		form: {
			setter: A.one
		},

		messages: {
			value: {},
			validator: isObject
		},

		messageContainer: {
			getter: function(val) {
				return A.Node.create(val).cloneNode(true);
			},
			value: TPL_MESSAGE_CONTAINER
		},

		rules: {
			validator: isObject,
			value: {}
		},

		showMessages: {
			value: true,
			validator: isBoolean
		},

		showAllMessages: {
			value: false,
			validator: isBoolean
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

	MESSAGES: {
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
	},

	isCheckable: function(node) {
		var nodeType = node.get(TYPE).toLowerCase();

		return (nodeType == CHECKBOX || nodeType == RADIO);
	},

	toNumber: function(val) {
		return parseFloat(val) || 0;
	}
});

A.each(
	FormValidator.REGEX,
	function(regex, key) {
		FormValidator.RULES[key] = function(val, node, ruleValue) {
			return FormValidator.REGEX[key].test(val);
		};
	}
);

A.extend(FormValidator, A.Base, {
	blurHandlers: [],
	inputHandlers: [],

	errorContainers: {},
	errors: {},

	initializer: function() {
		var instance = this;

		instance.bindUI();
	},

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

	hasErrors: function() {
		var instance = this;

		return !isEmpty(instance.errors);
	},

	getElementsByName: function(name) {
		var instance = this;

		return instance.get(FORM).all('[name="' + name + '"]');
	},

	getFieldErrorContainer: function(field) {
		var instance = this;
		var name = field.get(NAME);
		var containers = instance.errorContainers;

		if (!containers[name]) {
			containers[name] = instance.get(ERROR_CONTAINER);
		}

		return containers[name];
	},

	getFieldErrorMessage: function(field, rule) {
		var instance = this;
		var fieldName = field.get(NAME);
		var fieldMessages = instance.get(MESSAGES)[fieldName] || {};
		var fieldRules = instance.get(RULES)[fieldName];

		var messages = FormValidator.MESSAGES;
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

		var message = (fieldMessages[rule] || messages[rule] || messages.DEFAULT);

		return A.substitute(message, substituteRulesMap);
	},

	highlight: function(field) {
		var instance = this;
		var errorClass = instance.get(ERROR_CLASS);
		var validClass = instance.get(VALID_CLASS);

		field.removeClass(validClass).addClass(errorClass);
	},

	unhighlight: function(field) {
		var instance = this;
		var errorClass = instance.get(ERROR_CLASS);
		var validClass = instance.get(VALID_CLASS);

		field.removeClass(errorClass).addClass(validClass);
	},

	printErrorStack: function(field, container, errors) {
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
		var errorClass = instance.get(ERROR_CLASS);
		var validClass = instance.get(VALID_CLASS);
		var container = instance.getFieldErrorContainer(field);

		container.remove();

		instance.clearFieldError(field);

		field.removeClass(validClass).removeClass(errorClass);
	},

	validatable: function(field) {
		var instance = this;
		var fieldRules = instance.get(RULES)[field.get(NAME)];

		var required = fieldRules.required;
		var hasValue = FormValidator.RULES.required.apply(instance, [field.val(), field]);

		return (required || (!required && hasValue));
	},

	validate: function() {
		var instance = this;

		instance.eachRule(
			function(rule, fieldName) {
				instance.validateField(fieldName);
			}
		);
	},

	validateField: function(field) {
		var instance = this;
		var fieldNode = instance.getField(field);
		var validatable = instance.validatable(fieldNode);

		instance.resetField(fieldNode);

		if (validatable) {
			instance.fire(EV_VALIDATE_FIELD, {
				validator: {
					field: fieldNode
				}
			});
		}
	},

	_afterValidateOnBlurChange: function(event) {
		var instance = this;

		instance._uiSetValidateOnBlur(event.newVal);
	},

	_afterValidateOnInputChange: function(event) {
		var instance = this;

		instance._uiSetValidateOnInput(event.newVal);
	},

	_bindValidation: function() {
		var instance = this;
		var form = instance.get(FORM);

		instance._uiSetValidateOnBlur(
			instance.get(VALIDATE_ON_BLUR)
		);

		instance._uiSetValidateOnInput(
			instance.get(VALIDATE_ON_INPUT)
		);

		instance.after('validateOnBlurChange', instance._afterValidateOnBlurChange);
		instance.after('validateOnInputChange', instance._afterValidateOnInputChange);

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
			var container = instance.getFieldErrorContainer(field);

			field.placeBefore(container);

			instance.printErrorStack(
				field,
				container,
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
				var rule = FormValidator.RULES[ruleName];
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

	_bindValidateHelper: function(val, evType, fn, handler) {
		var instance = this;
		var form = instance.get(FORM);

		instance._unbindHandlers(handler);

		if (val) {
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

	_uiSetValidateOnInput: function(val) {
		var instance = this;

		instance._bindValidateHelper(val, EV_INPUT, instance._onFieldInputChange, INPUT_HANDLERS);
	},

	_uiSetValidateOnBlur: function(val) {
		var instance = this;

		instance._bindValidateHelper(val, EV_BLUR, instance._onBlurField, BLUR_HANDLERS);
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
});

A.FormValidator = FormValidator;

}, '@VERSION@' ,{requires:['aui-base','aui-event-input','substitute']});


AUI.add('aui-form', function(A){}, '@VERSION@' ,{use:['aui-form-base','aui-form-combobox','aui-form-field','aui-form-manager','aui-form-textarea','aui-form-textfield','aui-form-validator'], skinnable:false});

