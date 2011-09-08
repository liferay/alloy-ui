var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isString = L.isString,

	BOOLEAN = 'boolean',
	CHECKBOX = 'checkbox',
	CHECKED = 'checked',
	DOT = '.',
	EMPTY_STR = '',
	FIELD = 'field',
	FORM_BUILDER_CHECKBOX_FIELD = 'form-builder-checkbox-field',
	FORM_BUILDER_FIELD = 'form-builder-field',
	LABEL = 'label',
	LABELS = 'labels',
	NAME = 'name',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	VALUE = 'value',

	getCN = A.getClassName,

	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_CHECKBOX = getCN(FIELD, CHECKBOX),
	CSS_FIELD_CHOICE = getCN(FIELD, CHOICE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_CHECKBOX = getCN(FORM_BUILDER_FIELD, CHECKBOX),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

	TPL_CHECKBOX = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_CHECKBOX, CSS_FIELD_CHOICE].join(SPACE) + '" name="{name}" type="checkbox" value="{value}" {checked} />';

var FormBuilderCheckBoxField = A.Component.create({

	NAME: FORM_BUILDER_CHECKBOX_FIELD,

	ATTRS: {

		dataType: {
			value: BOOLEAN
		},

		predefinedValue: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		template: {
			valueFn: function() {
				return TPL_CHECKBOX;
			}
		}

	},

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderField,

	prototype: {

		renderUI: function() {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);
			var labelNode = instance.get(LABEL_NODE);

			A.FormBuilderCheckBoxField.superclass.renderUI.apply(instance, arguments);

			labelNode.insert(templateNode, labelNode, 'before');
		},

		getPropertyModel: function() {
			var instance = this;
			var strings = instance.getStrings();

			var model = A.FormBuilderCheckBoxField.superclass.getPropertyModel.apply(instance, arguments);

			AArray.each(model, function(item, index, collection) {
				if (item.attributeName === PREDEFINED_VALUE) {
					collection[index] = {
						attributeName: PREDEFINED_VALUE,
						editor: new A.RadioCellEditor({
							options: {
								'true': strings[YES],
								'false': strings[NO]
							}
						}),
						formatter: A.bind(instance._booleanFormatter, instance),
						name: strings[PREDEFINED_VALUE]
					};
				}
			});

			return model;
		},

		getHTML: function() {
			var instance = this;
			var checked = instance.get(CHECKED);

			return A.substitute(
				instance.get(TEMPLATE),
				{
					checked: checked ? 'checked="checked"' : EMPTY_STR,
					id: instance.get(ID),
					label: instance.get(LABEL),
					name: instance.get(NAME),
					value: instance.get(PREDEFINED_VALUE)
				}
			);
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			if (val) {
				templateNode.setAttribute(CHECKED, val);
			}
			else {
				templateNode.removeAttribute(CHECKED);
			}
		}

	}

});

A.FormBuilderCheckBoxField = FormBuilderCheckBoxField;

A.FormBuilder.types.checkbox = A.FormBuilderCheckBoxField;
