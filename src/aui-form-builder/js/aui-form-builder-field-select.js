/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-select
 */

var L = A.Lang,

	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_SELECT_FIELD = 'form-builder-select-field',
	ID = 'id',
	LABEL = 'label',
	MULTIPLE = 'multiple',
	NAME = 'name',
	NO = 'no',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	YES = 'yes',

	getCN = A.getClassName,

	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

	TPL_SELECT = '<select id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE].join(SPACE) + '" name="{name}" value="{value}"></select>';

/**
 * A base class for FormBuilderSelectField.
 *
 * @class A.FormBuilderSelectField
 * @extends A.FormBuilderMultipleChoiceField
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var FormBuilderSelectField = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property FormBuilderSelectField.NAME
	 * @type String
	 * @static
	 */
	NAME: FORM_BUILDER_SELECT_FIELD,

	/**
	 * Static property used to define the default attribute
	 * configuration for the FormBuilderSelectField.
	 *
	 * @property FormBuilderSelectField.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute multiple
		 * @default false
		 * @type Boolean
		 */
		multiple: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_SELECT;
			}
		}

	},

	/**
     * Static property used to define the UI attributes.
     *
     * @property FormBuilderSelectField.UI_ATTRS
     * @type Array
     * @static
     */
	UI_ATTRS: A.FormBuilderField.UI_ATTRS.concat([MULTIPLE, PREDEFINED_VALUE]),

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property FormBuilderSelectField.CSS_PREFIX
	 * @static
	 */
	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property FormBuilderSelectField.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.FormBuilderMultipleChoiceField,

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

			var model = A.FormBuilderSelectField.superclass.getPropertyModel.apply(instance, arguments);

			model.push(
				{
					attributeName: MULTIPLE,
					editor: new A.RadioCellEditor({
						options: {
							'true': strings[YES],
							'false': strings[NO]
						}
					}),
					formatter: A.bind(instance._booleanFormatter, instance),
					name: strings[MULTIPLE]
				}
			);

			return model;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetMultiple
		 * @param val
		 * @protected
		 */
		_uiSetMultiple: function(val) {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE);

			if (val) {
				templateNode.setAttribute(MULTIPLE, MULTIPLE);
			}
			else {
				templateNode.removeAttribute(MULTIPLE);
			}

			instance.predefinedValueEditor.set(MULTIPLE, val);
		}

	}

});

A.FormBuilderSelectField = FormBuilderSelectField;

A.FormBuilder.types.select = A.FormBuilderSelectField;