YUI.add('aui-form-builder-available-field-deprecated', function (A, NAME) {

/**
 * A base class for `A.FormBuilderAvailableField`.
 *
 * @class A.FormBuilderAvailableField
 * @extends A.PropertyBuilderAvailableField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */

var FormBuilderAvailableField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'availableField',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderAvailableField`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * List of hidden attributes.
         *
         * @attribute hiddenAttributes
         * @type Array
         */
        hiddenAttributes: {
            validator: A.Lang.isArray
        },

        /**
         * Collection of options.
         *
         * @attribute options
         * @type Object
         */
        options: {
            validator: A.Lang.isObject
        },

        /**
         * Specifies a predefined value for the input field.
         *
         * @attribute predefinedValue
         */
        predefinedValue: {},

        /**
         * List of read-only input fields.
         *
         * @attribute readOnlyAttributes
         * @type Array
         */
        readOnlyAttributes: {
            validator: A.Lang.isArray
        },

        /**
         * Checks if an input field is required. In other words, it needs
         * content to be valid.
         *
         * @attribute required
         * @type Boolean
         */
        required: {
            validator: A.Lang.isBoolean
        },

        /**
         * If `true` the label is showed.
         *
         * @attribute showLabel
         * @default true
         * @type Boolean
         */
        showLabel: {
            validator: A.Lang.isBoolean,
            value: true
        },

        /**
         * Hint to help the user to fill the input field.
         *
         * @attribute tip
         * @type String
         */
        tip: {
            validator: A.Lang.isString
        },

        /**
         * Checks if the input field is unique or not.
         *
         * @attribute unique
         * @type Boolean
         */
        unique: {
            validator: A.Lang.isBoolean
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.PropertyBuilderAvailableField
});

A.FormBuilderAvailableField = FormBuilderAvailableField;


}, '3.0.1', {"requires": ["aui-property-builder-available-field"]});
