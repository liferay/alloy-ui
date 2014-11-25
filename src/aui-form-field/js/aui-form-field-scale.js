/**
 * The Form Field Scale Component
 *
 * @module  aui-form-field-scale
 */

var CSS_FIELD_SCALE = A.getClassName('form', 'field', 'scale'),
    CSS_FIELD_SCALE_INPUT = A.getClassName('form', 'field', 'scale', 'input'),
    CSS_FIELD_SCALE_INPUT_HIGHER_VALUE =
        A.getClassName('form', 'field', 'scale', 'input', 'higher', 'value'),
    CSS_FIELD_SCALE_INPUT_LOWER_VALUE =
        A.getClassName('form', 'field', 'scale', 'input', 'lower', 'value'),
    CSS_FIELD_SCALE_RANGE = A.getClassName('form', 'field', 'scale', 'range');

/**
 * A base class for `A.FormFieldScale`.
 *
 * @class A.FormFieldScale
 * @extends A.FormField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormFieldScale = A.Base.create('form-field-scale', A.FormField, [], {
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_SCALE_RANGE + ' clearfix">' +
        '<div class="' + CSS_FIELD_SCALE_INPUT_LOWER_VALUE + '"><label></label></div>' +
        '<div class="' + CSS_FIELD_SCALE_INPUT + '"></div>' +
        '<div class="' + CSS_FIELD_SCALE_INPUT_HIGHER_VALUE + '"><label></label></div>' +
        '</div>',

    /**
     * Constructor for the `A.FormFieldScale`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after({
            rangeChange: this._afterRangeChange
        });
    },

    /**
     * Create the DOM structure for the `A.FormFieldScale`. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var content = this.get('content');

        A.FormFieldScale.superclass.renderUI.call(this);
        
        content.addClass(CSS_FIELD_SCALE);

        this._uiSetRange(this.get('range'));
    },

    /**
     * Fired after the `range` attribute is set.
     *
     * @method _afterRangeChange
     * @protected
     */
    _afterRangeChange: function() {
        this._uiSetRange(this.get('range'));
    },

    /**
     * Updates the ui according to the value of the `range` attribute.
     *
     * @method _uiSetRange
     * @param {String} range
     * @protected
     */
    _uiSetRange: function(range) {
        var content = this.get('content'),
            lowerValue = content.one('.' + CSS_FIELD_SCALE_INPUT_LOWER_VALUE).one('label'),
            higherValue = content.one('.' + CSS_FIELD_SCALE_INPUT_HIGHER_VALUE).one('label');

        lowerValue.set('text', range[0]);
        higherValue.set('text', range[1]);
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormFieldScale`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Array with the lower and the higher value to the scale.
         *
         * @attribute range
         * @default []
         * @type {Array}
         */
        range: {
            validator: A.Lang.isArray,
            value: [1, 10]
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
