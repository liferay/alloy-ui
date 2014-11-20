/**
 * The Form Field List Component
 *
 * @module aui-form-field-list
 */

var CSS_FIELD_LIST = A.getClassName('form', 'field', 'list'),
    CSS_FIELD_LIST_CONTENT = A.getClassName('form', 'field', 'list', 'content'),
    CSS_FIELD_LIST_PLACEHOLDER = A.getClassName('form', 'field', 'list', 'placeholder'),
    CSS_FIELD_LIST_TOGGLE = A.getClassName('form', 'field', 'list', 'toggle');

/**
 * A base class for `A.FormFieldList`.
 *
 * @class A.FormFieldList
 * @extends A.FormField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormFieldList = A.Base.create('form-field-list', A.FormField, [], {
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_LIST_CONTENT + '">' +
        '<div class="' + CSS_FIELD_LIST_TOGGLE + '">' +
        '<span class="glyphicon glyphicon-chevron-down"></span></div>' +
        '<div class="' + CSS_FIELD_LIST_PLACEHOLDER + '">Select an option</div></div>',

    /**
     * Constructor for the `A.FormFieldList`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        content.addClass(CSS_FIELD_LIST);
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormFieldList`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The options that can be chosen.
         *
         * @attribute options
         * @default []
         * @type String
         */
        options: {
            validator: A.Lang.isArray,
            value: []
        },

        /**
         * If there should be a special "Other" option.
         *
         * @attribute otherOption
         * @default false
         * @type Boolean
         */
        otherOption: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * Flag indicating if this field is required.
         *
         * @attribute required
         * @default false
         * @type Boolean
         */
        required: {
            validator: A.Lang.isBoolean,
            value: false
        }
    }
});
