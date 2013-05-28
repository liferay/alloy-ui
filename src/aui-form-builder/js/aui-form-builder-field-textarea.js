/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-textarea
 */

var L = A.Lang,

	AArray = A.Array,

	FIELD = 'field',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_TEXTAREA_FIELD = 'form-builder-textarea-field',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	SPACE = ' ',
	TEXT = 'text',
	TEXTAREA = 'textarea',

	getCN = A.getClassName,

	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_TEXT = getCN(FIELD, TEXT),
	CSS_FIELD_TEXTAREA = getCN(FIELD, TEXTAREA),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

	TPL_TEXTAREA = '<textarea id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_TEXT, CSS_FIELD_TEXTAREA].join(SPACE) + '" name="{name}">{value}</textarea>';

/**
 * A base class for FormBuilderTextAreaField.
 *
 * @class A.FormBuilderTextAreaField
 * @extends A.FormBuilderTextField
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var FormBuilderTextAreaField = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property FormBuilderTextAreaField.NAME
	 * @type String
	 * @static
	 */
	NAME: FORM_BUILDER_TEXTAREA_FIELD,

	/**
	 * Static property used to define the default attribute
	 * configuration for the FormBuilderTextAreaField.
	 *
	 * @property FormBuilderTextAreaField.ATTRS
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
				return TPL_TEXTAREA;
			}
		}

	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property FormBuilderTextAreaField.CSS_PREFIX
	 * @static
	 */
	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property FormBuilderTextAreaField.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.FormBuilderTextField,

	prototype: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getPropertyModel
		 */
		getPropertyModel: function() {
			var instance = this;

			var model = A.FormBuilderTextAreaField.superclass.getPropertyModel.apply(instance, arguments);

			AArray.each(
				model,
				function(item, index, collection) {
					if (item.attributeName === PREDEFINED_VALUE) {
						collection[index].editor = new A.TextAreaCellEditor();
					}
				}
			);

			return model;
		}

	}

});

A.FormBuilderTextAreaField = FormBuilderTextAreaField;

A.FormBuilder.types.textarea = A.FormBuilderTextAreaField;
