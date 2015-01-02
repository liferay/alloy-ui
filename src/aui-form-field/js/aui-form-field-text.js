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
            typeChange: this._afterTypeChange
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

        this._uiSetType(this.get('type'));
    },

    /**
     * Fired after the `type` attribute is set.
     *
     * @method _afterTypeChange
     * @protected
     */
    _afterTypeChange: function() {
        this._uiSetType(this.get('type'));
    },

    /**
     * Updates the ui according to the value of the `type` attribute.
     *
     * @method _uiSetType
     * @param {String} type
     * @protected
     */
    _uiSetType: function(type) {
        var inputNode = this.get('content').one('.' + CSS_FIELD_TEXT_INPUT);

        inputNode.empty();

        switch (type) {
            case 0:
                inputNode.append(TPL_SINGLE_LINE);
                break;
            case 1:
                inputNode.append(TPL_MULTILINE);
                break;
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
         * Determine the type of text input.
         *
         * @attribute type
         * @default 0
         * @type {Number}
         */
        type: {
            validator: A.Lang.isNumber,
            value: 0
        },

        /**
         * Id to reference form data after a form is submitted.
         *
         * @attribute name
         * @default ''
         * @type String
         */
        name: {
            validator: A.Lang.isString,
            value: ''
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
