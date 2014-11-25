/**
 * The Form Field Text Component
 *
 * @module aui-form-field-text
 */

var CSS_FIELD_TEXT = A.getClassName('form', 'builder', 'field', 'text'),
    CSS_FIELD_TEXT_INPUT = A.getClassName('form', 'builder', 'field', 'text', 'input'),
    TPL_SINGLE_LINE = '<input type="text" class="form-control"></input>',
    TPL_MULTILINE = '<textarea class="form-control" rows="3"></textarea>';

/**
 * A base class for `A.FormFieldText`.
 *
 * @class A.FormFieldText
 * @extends A.FormField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormFieldText = A.Base.create('form-field-text', A.FormField, [], {
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_TEXT_INPUT + '"></div>',

    /**
     * Constructor for the `A.FormFieldText`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after({
            multilineChange: this._afterMultilineChange
        });
    },

    /**
     * Create the DOM structure for the `A.FormFieldText`. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var content = this.get('content');

        A.FormFieldText.superclass.renderUI.call(this);

        content.addClass(CSS_FIELD_TEXT);

        this._uiSetMultiline(this.get('multiline'));
    },

    /**
     * Fired after the `multiline` attribute is set.
     *
     * @method _afterMultilineChange
     * @protected
     */
    _afterMultilineChange: function() {
        this._uiSetMultiline(this.get('multiline'));
    },

    /**
     * Updates the ui according to the value of the `multiline` attribute.
     *
     * @method _uiSetMultiline
     * @param {String} multiline
     * @protected
     */
    _uiSetMultiline: function(multiline) {
        var inputNode = this.get('content').one('.' + CSS_FIELD_TEXT_INPUT);

        inputNode.empty();

        if (multiline) {
            inputNode.append(TPL_MULTILINE);
        }
        else {
            inputNode.append(TPL_SINGLE_LINE);
        }
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormFieldText`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Flag indicating if the text input will allow multiple lines.
         *
         * @attribute multiline
         * @default false
         * @type {Boolean}
         */
        multiline: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * Flag indicating if this field is required.
         *
         * @attribute required
         * @default false
         * @type {Boolean}
         */
        required: {
            validator: A.Lang.isBoolean,
            value: false
        }
    }
});
