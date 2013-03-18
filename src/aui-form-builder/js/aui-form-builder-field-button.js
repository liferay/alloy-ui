var L = A.Lang,

	toInitialCap = A.cached(
		function(str) {
			return str.substring(0, 1).toUpperCase() + str.substring(1);
		}
	),

	BUTTON = 'button',
	BUTTON_TYPE = 'buttonType',
	FIELD = 'field',
	FORM_BUILDER_BUTTON_FIELD = 'form-builder-button-field',
	FORM_BUILDER_FIELD = 'form-builder-field',
	ID = 'id',
	INPUT = 'input',
	LABEL = 'label',
	NAME = 'name',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	RESET = 'reset',
	SPACE = ' ',
	SUBMIT = 'submit',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TYPE = 'type',

	getCN = A.getClassName,

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

	TPL_BUTTON = '<button id="{id}" class="' + CSS_FORM_BUILDER_FIELD_NODE + '" type="{type}">{value}</button>',

	BUTTON_TYPES = [SUBMIT, RESET, BUTTON];

var FormBuilderButtonField = A.Component.create({

	NAME: FORM_BUILDER_BUTTON_FIELD,

	ATTRS: {

		acceptChildren: {
			readOnly: true,
			value: false
		},

		buttonType: {
			validator: function(val) {
				return A.Array(BUTTON_TYPES).indexOf(val.toLowerCase()) > -1;
			},
			value: SUBMIT
		},

		predefinedValue: {
			value: toInitialCap(SUBMIT)
		},

		showLabel: {
			value: false
		},

		template: {
			valueFn: function() {
				return TPL_BUTTON;
			}
		}

	},

	UI_ATTRS: A.FormBuilderField.UI_ATTRS.concat([BUTTON_TYPE]),

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderField,

	prototype: {

		getHTML: function() {
			var instance = this;

			return L.sub(
				instance.get(TEMPLATE),
				{
					id: instance.get(ID),
					label: instance.get(LABEL),
					name: instance.get(NAME),
					type: instance.get(BUTTON_TYPE),
					value: instance.get(PREDEFINED_VALUE)
				}
			);
		},

		getPropertyModel: function() {
			var instance = this,
				strings = instance.getStrings();

			var model = A.FormBuilderButtonField.superclass.getPropertyModel.apply(instance, arguments);

			model.push(
				{
					attributeName: BUTTON_TYPE,
					editor: new A.RadioCellEditor({
						options: {
							'button': strings[BUTTON],
							'reset': strings[RESET],
							'submit': strings[SUBMIT]
						}
					}),
					name: strings[BUTTON_TYPE]
				}
			);

			return model;
		},

		_uiSetButtonType: function(val) {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE);

			templateNode.setAttribute(TYPE, val);
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE);

			console.log(templateNode, 'the value is', val);

			templateNode.setContent(val);
		}

	}

});

A.FormBuilderButtonField = FormBuilderButtonField;

A.FormBuilder.types.button = A.FormBuilderButtonField;
