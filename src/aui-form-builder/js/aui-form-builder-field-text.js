/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-text
 */

var L = A.Lang,

	FIELD = 'field',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_TEXT_FIELD = 'form-builder-text-field',
	ID = 'id',
	INPUT = 'input',
	LABEL = 'label',
	LARGE = 'large',
	MEDIUM = 'medium',
	NAME = 'name',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	SMALL = 'small',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	WIDTH = 'width',

	getCN = A.getClassName,

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

	TPL_INPUT = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT].join(SPACE) + '" name="{name}" type="text" value="{value}" />',

	WIDTH_VALUES_MAP = { small: 'large', medium: 'xlarge', large: 'xxlarge' };

/**
 * A base class for FormBuilderTextField.
 *
 * @class A.FormBuilderTextField
 * @extends A.FormBuilderField
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var FormBuilderTextField = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property FormBuilderTextField.NAME
	 * @type String
	 * @static
	 */
	NAME: FORM_BUILDER_TEXT_FIELD,

	/**
	 * Static property used to define the default attribute
	 * configuration for the FormBuilderTextField.
	 *
	 * @property FormBuilderTextField.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_INPUT;
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute width
		 * @default 'small'
		 */
		width: {
			value: SMALL
		}

	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property FormBuilderTextField.CSS_PREFIX
	 * @type String
	 * @static
	 */
	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property FormBuilderTextField.EXTENDS
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
					value: instance.get(PREDEFINED_VALUE),
					width: instance.get(WIDTH)
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

			var model = A.FormBuilderTextField.superclass.getPropertyModel.apply(instance, arguments);

			model.push(
				{
					attributeName: WIDTH,
					editor: new A.RadioCellEditor({
						options: {
							small: strings[SMALL],
							medium: strings[MEDIUM],
							large: strings[LARGE]
						}
					}),
					formatter: function(o) {
						return strings[o.data.value];
					},
					name: strings[WIDTH]
				}
			);

			return model;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetWidth
		 * @param val
		 * @protected
		 */
		_uiSetWidth: function(val) {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE);

			templateNode.addClass(getCN(INPUT, WIDTH_VALUES_MAP[val]));
			templateNode.removeClass(getCN(INPUT, WIDTH_VALUES_MAP[instance.prevWidth]));

			instance.prevWidth = val;
		}

	}

});

A.FormBuilderTextField = FormBuilderTextField;

A.FormBuilder.types.text = A.FormBuilderTextField;