AUI.add('aui-field', function(A) {
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

var Field = function() {
	Field.superclass.constructor.apply(this, arguments);
};

var fieldPrototype = Field.prototype;

Field.NAME = NAME;

Field.ATTRS = {
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

			return A.get(value) || instance._createFieldNode();
		}
	},

	fieldHint: {
		value: ''
	},

	fieldHintNode: {
		value: null,
		setter: function(value) {
			var instance = this;

			return A.get(value) || instance._createFieldHint();
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
		validator: Field.prototype.fieldValidator
	}
};

Field.HTML_PARSER = {
	labelNode: 'label',
	node: 'input, textarea, select'
};

Field.getTypeClassName = getTypeClassName;

A.extend(
	Field,
	A.Component,
	{
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

			instance._updateNodeAttrs();
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

		_afterNodeAttrChange: function(event) {
			var instance = this;

			instance._attrNodeSetter(
				event.attrName,
				event.newVal,
				event.prevVal
			);
		},

		_attrNodeGetter: function(key, storedValue) {
			var instance = this;

			var node = instance.get('node');
			var value;

			if (key != 'value') {
				value = node.attr(key);
			}
			else {
				value = node.val();
			}

			if (String(storedValue) != String(value)) {
				instance._setStateVal(key, value);
			}

			return value;
		},

		_attrNodeSetter: function(key, newVal, prevVal) {
			var instance = this;

			var node = instance.get('node');

			if (key != 'value') {
				node.attr(key, newVal);
			}
			else {
				node.val(newVal);
			}

			return newVal;
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

		_rawAttrGetter: function(value, key) {
			var instance = this;

			return instance._attrNodeGetter(key, value);
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

				var labelText = instance.get('labelText');
				var labelNode = instance.get('labelNode');

				labelNode.addClass(getClassName(instance.name, 'label'));
				labelNode.setAttribute('for', id);
				labelNode.set('innerHTML', labelText);

				instance._uiSetLabelAlign(instance.get('labelAlign'));

				var contentBox = instance.get('contentBox');

				contentBox.prepend(labelNode);
			}
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

		_uiSetFieldHint: function(newVal, prevVal) {
			var instance = this;

			instance.get('fieldHintNode').set('innerHTML', newVal);
		},

		_updateNodeAttrs: function() {
			var instance = this;

			var syncedProperties = instance._syncedProperties;
			var length = syncedProperties.length;

			var modifiedAttr = {};
			var action = 'addAttr';
			var attrConfig = {
				getter: instance._rawAttrGetter
			};

			for (var i = length - 1; i >= 0; i--) {
				var property = syncedProperties[i];

				instance.after(property + 'Change', instance._afterNodeAttrChange);

				if (instance.attrAdded(property)) {
					action = 'modifyAttr';
				}

				var value = instance.get(property);

				instance._attrNodeSetter(property, value);

				instance[action](property, attrConfig);
			}
		},

		_requireAddAttr: false,

		_syncedProperties: [
			'disabled',
			'id',
			'readOnly',
			'name',
			'size',
			'type',
			'value'
		]
	}
);

Field.getField = function(field) {
	var fieldWidget = null;

	if (field instanceof A.Field) {
		fieldWidget = field;
	}
	else if (field && (Lang.isString(field) || field instanceof A.Node || field.nodeName)) {
		var fieldId = A.get(field).get('id');

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
};

A.Field = Field;

}, '@VERSION@' ,{skinnable:false, requires:['aui-base','aui-component','substitute']});
