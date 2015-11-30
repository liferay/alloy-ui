YUI.add('aui-form-builder-field-textarea-deprecated', function (A, NAME) {

/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-textarea
 */

var AArray = A.Array,

    getCN = A.getClassName,

    CSS_FORM_CONTROL = getCN('form', 'control'),
    CSS_FIELD = getCN('field'),
    CSS_FIELD_TEXT = getCN('field', 'text'),
    CSS_FIELD_TEXTAREA = getCN('field', 'textarea'),
    CSS_FORM_BUILDER_FIELD = getCN('form-builder-field'),
    CSS_FORM_BUILDER_FIELD_NODE = getCN('form-builder-field', 'node'),

    TPL_TEXTAREA = '<div class="form-builder-field-wrapper"><textarea id="{id}" class="' + [
        CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_TEXT,
        CSS_FIELD_TEXTAREA, CSS_FORM_CONTROL].join(' ') + '" name="{name}">{value}</textarea></div>';

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
    NAME: 'form-builder-textarea-field',

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
                    if (item.attributeName === 'predefinedValue') {
                        collection[index].editor = new A.TextAreaCellEditor();
                    }
                }
            );

            return model;
        }

    }

});

A.FormBuilderTextAreaField = FormBuilderTextAreaField;

A.FormBuilderField.types.textarea = A.FormBuilderTextAreaField;


}, '3.0.1', {"requires": ["aui-form-builder-field-deprecated"]});
