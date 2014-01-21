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

    TPL_TEXTAREA = '<textarea id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_TEXT,
        CSS_FIELD_TEXTAREA].join(SPACE) + '" name="{name}">{value}</textarea>';

/**
 * A base class for `A.FormBuilderTextAreaField`.
 *
 * @class A.FormBuilderTextAreaField
 * @extends A.FormBuilderTextField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var FormBuilderTextAreaField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: FORM_BUILDER_TEXTAREA_FIELD,

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderTextAreaField`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Reusable block of markup used to generate the field.
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
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.FormBuilderTextField,

    prototype: {

        /**
         * Returns a list of property models including the
         * `A.TextAreaCellEditor` model.
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
