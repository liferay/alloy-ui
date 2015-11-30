YUI.add('aui-form-field-text', function (A, NAME) {

/**
 * The Form Field Text Component
 *
 * @module aui-form-field-text
 */

var CSS_FIELD_TEXT = A.getClassName('form', 'builder', 'field', 'text'),
    CSS_FIELD_TEXT_CONTENT = A.getClassName('form', 'builder', 'field', 'text', 'content'),
    CSS_FIELD_TEXT_INPUT = A.getClassName('form', 'builder', 'field', 'text', 'input'),

    TPL_MULTILINE = '<textarea class="' + CSS_FIELD_TEXT_INPUT + ' form-control" rows="3">',
    TPL_SINGLE_LINE = '<input type="text" class="' + CSS_FIELD_TEXT_INPUT + ' form-control">';

/**
 * A base class for `A.FormFieldText`.
 *
 * @class A.FormFieldText
 * @extends A.FormField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormFieldText = A.Base.create('form-field-text', A.FormField, [A.FormFieldRequired], {
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_TEXT_CONTENT + '"></div>',

    /**
     * Constructor for the `A.FormFieldText`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._uiSetPlaceholder(this.get('placeholder'));

        this.after({
            placeholderChange: this._afterPlaceholderChange,
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
     * Fired after the `placeholder` attribute is set.
     *
     * @method _afterPlaceholderChange
     * @protected
     */
    _afterPlaceholderChange: function() {
        this._uiSetPlaceholder(this.get('placeholder'));
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
     * Updates the ui according to the value of the `placeholder` attribute.
     *
     * @method _uiSetPlaceholder
     * @param {String} placeholder
     * @protected
     */
    _uiSetPlaceholder: function(placeholder) {
        var inputNode = this.get('content').one('.' + CSS_FIELD_TEXT_INPUT);

        inputNode.setAttribute('placeholder', placeholder);
    },

    /**
     * Updates the ui according to the value of the `type` attribute.
     *
     * @method _uiSetType
     * @param {String} type
     * @protected
     */
    _uiSetType: function(type) {
        var contentNode = this.get('content').one('.' + CSS_FIELD_TEXT_CONTENT);

        contentNode.empty();

        switch (type) {
            case 0:
                contentNode.append(TPL_SINGLE_LINE);
                break;
            case 1:
                contentNode.append(TPL_MULTILINE);
                break;
        }

        this._uiSetPlaceholder(this.get('placeholder'));
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
         * Predefined value to text input.
         *
         * @attribute placeholder
         * @default ''
         * @type String
         */
        placeholder: {
            validator: A.Lang.isString,
            value: ''
        },

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
        }
    }
});


}, '3.0.1', {"requires": ["aui-form-field-required"], "skinnable": true});
