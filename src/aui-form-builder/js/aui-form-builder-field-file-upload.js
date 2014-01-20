/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-upload
 */

var L = A.Lang,

    FORM_BUILDER_FIELD = 'form-builder-field',
    FORM_BUILDER_FILE_UPLOAD_FIELD = 'form-builder-file-upload-field',
    ID = 'id',
    LABEL = 'label',
    NAME = 'name',
    NODE = 'node',
    PREDEFINED_VALUE = 'predefinedValue',
    SPACE = ' ',
    TEMPLATE = 'template',

    getCN = A.getClassName,

    CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
    CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

    TPL_FILE_UPLOAD = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE].join(SPACE) +
        '" name="{name}" type="file" value="{value}" />';

/**
 * A base class for `A.FormBuilderFileUploadField`.
 *
 * @class A.FormBuilderFileUploadField
 * @extends A.FormBuilderField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var FormBuilderFileUploadField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: FORM_BUILDER_FILE_UPLOAD_FIELD,

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderFileUploadField`.
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
                return TPL_FILE_UPLOAD;
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
    EXTENDS: A.FormBuilderField,

    prototype: {

        /**
         * Injects data into the template and returns the HTML result.
         *
         * @method getHTML
         * @return {String}
         */
        getHTML: function() {
            var instance = this;

            return L.sub(
                instance.get(TEMPLATE), {
                    id: instance.get(ID),
                    label: instance.get(LABEL),
                    name: instance.get(NAME),
                    value: instance.get(PREDEFINED_VALUE)
                }
            );
        }

    }

});

A.FormBuilderFileUploadField = FormBuilderFileUploadField;

A.FormBuilder.types.fileupload = A.FormBuilderFileUploadField;
