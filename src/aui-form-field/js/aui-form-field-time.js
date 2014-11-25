/**
 * The Form Field Time Component
 *
 * @module aui-form-field-time
 */

var CSS_FIELD_TIME = A.getClassName('form', 'field', 'time'),
    CSS_FIELD_TIME_FROM = A.getClassName('form', 'field', 'time', 'from'),
    CSS_FIELD_TIME_FROM_TIME = A.getClassName('form', 'field', 'time', 'from', 'time'),
    CSS_FIELD_TIME_FROM_LABEL = A.getClassName('form', 'field', 'time', 'from', 'label'),
    CSS_FIELD_TIME_INPUT = A.getClassName('form', 'field', 'time', 'input'),
    CSS_FIELD_TIME_TO = A.getClassName('form', 'field', 'time', 'to'),
    CSS_FIELD_TIME_TO_TIME = A.getClassName('form', 'field', 'time', 'to', 'time'),
    CSS_FIELD_TIME_TO_LABEL = A.getClassName('form', 'field', 'time', 'to', 'label');

/**
 * A base class for Form Field Time.
 *
 * @class A.FormFieldTime
 * @extends A.FormField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormFieldTime = A.Base.create('form-field-time', A.FormField, [], {
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_TIME + '">' +
        '<div class="' + CSS_FIELD_TIME_FROM + '">' +
        '<div class="' + CSS_FIELD_TIME_FROM_LABEL + '">From</div>' +
        '<div class="' + CSS_FIELD_TIME_FROM_TIME + ' ' + CSS_FIELD_TIME_INPUT + '"></div></div>' +
        '<div class="' + CSS_FIELD_TIME_TO + '">' +
        '<div class="' + CSS_FIELD_TIME_TO_LABEL + '">To</div>' +
        '<div class="' + CSS_FIELD_TIME_TO_TIME + ' ' + CSS_FIELD_TIME_INPUT + '"></div></div>' +
        '</div>',

    /**
     * Constructor for the `A.FormFieldTime`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after({
            toggleIntervalChange: this._afterToggleIntervalChange
        });
    },

    /**
     * Create the DOM structure for the `A.FormFieldTime`. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var content = this.get('content');

        A.FormFieldTime.superclass.renderUI.call(this);

        content.addClass(CSS_FIELD_TIME);

        this._uiSetToggleInterval(this.get('toggleInterval'));
    },

    /**
     * Fired after the `toggleInterval` attribute is set.
     *
     * @method _afterToggleIntervalChange
     * @protected
     */
    _afterToggleIntervalChange: function() {
        this._uiSetToggleInterval(this.get('toggleInterval'));
    },

    /**
     * Updates the ui according to the value of the `toggleInterval` attribute.
     *
     * @method _uiSetToggleInterval
     * @param {Boolean} toggleInterval
     * @protected
     */
    _uiSetToggleInterval: function(toggleInterval) {
        this.get('content').one('.' + CSS_FIELD_TIME_TO).toggleClass('hide', !toggleInterval);
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormFieldTime`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
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
        },

        /**
         * Flag indicating if there will be a time interval.
         *
         * @attribute toggleInterval
         * @default false
         * @type {Boolean}
         */
        toggleInterval: {
            validator: A.Lang.isBoolean,
            value: false
        }
    }
});
