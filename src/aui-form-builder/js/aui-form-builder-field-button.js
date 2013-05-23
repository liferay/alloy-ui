/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-button
 */

var L = A.Lang,

	toInitialCap = A.cached(
		function(str) {
			return str.substring(0, 1).toUpperCase() + str.substring(1);
		}
	),

	BTN = 'btn',
	BUTTON = 'button',
	BUTTON_TYPE = 'buttonType',
	FORM_BUILDER_BUTTON_FIELD = 'form-builder-button-field',
	FORM_BUILDER_FIELD = 'form-builder-field',
	ID = 'id',
	LABEL = 'label',
	NAME = 'name',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	RESET = 'reset',
	SPACE = ' ',
	SUBMIT = 'submit',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TYPE = 'type',

	getCN = A.getClassName,

	CSS_BTN = getCN(BTN),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

	TPL_BUTTON = '<button id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_BTN].join(SPACE) + '" type="{type}">{value}</button>',

	BUTTON_TYPES = [SUBMIT, RESET, BUTTON];

/**
 * A base class for FormBuilderButtonField.
 *
 * @class A.FormBuilderButtonField
 * @extends A.FormBuilderField
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var FormBuilderButtonField = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property FormBuilderButtonField.NAME
	 * @type String
	 * @static
	 */
	NAME: FORM_BUILDER_BUTTON_FIELD,

	/**
	 * Static property used to define the default attribute
	 * configuration for the FormBuilderButtonField.
	 *
	 * @property FormBuilderButtonField.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute acceptChildren
		 * @default false
		 * @type Boolean
		 * @readOnly
		 */
		acceptChildren: {
			readOnly: true,
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute buttonType
		 * @default 'submit'
		 */
		buttonType: {
			validator: function(val) {
				return A.Array(BUTTON_TYPES).indexOf(val.toLowerCase()) > -1;
			},
			value: SUBMIT
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute predefinedValue
		 */
		predefinedValue: {
			value: toInitialCap(SUBMIT)
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute showLabel
		 * @default false
		 * @type Boolean
		 */
		showLabel: {
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_BUTTON;
			}
		}

	},

	/**
	 * Static property used to define the UI attributes.
	 *
	 * @property FormBuilderButtonField.UI_ATTRS
	 * @type Array
	 * @static
	 */
	UI_ATTRS: A.FormBuilderField.UI_ATTRS.concat([BUTTON_TYPE]),

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property FormBuilderButtonField.CSS_PREFIX
	 * @type String
	 * @static
	 */
	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property FormBuilderButtonField.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.FormBuilderField,

	prototype: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getHTML
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getPropertyModel
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetButtonType
		 * @param val
		 * @protected
		 */
		_uiSetButtonType: function(val) {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE);

			templateNode.setAttribute(TYPE, val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetPredefinedValue
		 * @param val
		 * @protected
		 */
		_uiSetPredefinedValue: function(val) {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE);

			templateNode.setContent(val);
		}

	}

});

A.FormBuilderButtonField = FormBuilderButtonField;

A.FormBuilder.types.button = A.FormBuilderButtonField;