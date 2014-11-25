/**
 * The Form Field Date Component
 *
 * @module aui-form-field-date
 */

var CSS_FIELD_DATE = A.getClassName('form', 'field', 'date'),
    CSS_FIELD_DATE_FROM = A.getClassName('form', 'field', 'date', 'from'),
    CSS_FIELD_DATE_FROM_DATE = A.getClassName('form', 'field', 'date', 'from', 'date'),
    CSS_FIELD_DATE_FROM_LABEL = A.getClassName('form', 'field', 'date', 'from', 'label'),
    CSS_FIELD_DATE_FROM_TIME = A.getClassName('form', 'field', 'date', 'from', 'time'),
    CSS_FIELD_DATE_INPUT = A.getClassName('form', 'field', 'date', 'input'),
    CSS_FIELD_DATE_INPUT_TIME = A.getClassName('form', 'field', 'date', 'input', 'time'),
    CSS_FIELD_DATE_TO = A.getClassName('form', 'field', 'date', 'to'),
    CSS_FIELD_DATE_TO_DATE = A.getClassName('form', 'field', 'date', 'to', 'date'),
    CSS_FIELD_DATE_TO_ENABLED = A.getClassName('form', 'field', 'date', 'to', 'enabled'),
    CSS_FIELD_DATE_TO_LABEL = A.getClassName('form', 'field', 'date', 'to', 'label'),
    CSS_FIELD_DATE_TO_TIME = A.getClassName('form', 'field', 'date', 'to', 'time');

/**
 * A base class for Form Field Date.
 *
 * @class A.FormFieldDate
 * @extends A.FormField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormFieldDate = A.Base.create('form-field-date', A.FormField, [], {
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_DATE + '">' +
        '<div class="' + CSS_FIELD_DATE_FROM + '">' +
        '<div class="' + CSS_FIELD_DATE_FROM_LABEL + '">From</div>' +
        '<div class="' + CSS_FIELD_DATE_FROM_DATE + ' ' + CSS_FIELD_DATE_INPUT + '"></div>' +
        '<div class="' + CSS_FIELD_DATE_FROM_TIME + ' ' + CSS_FIELD_DATE_INPUT_TIME + '"></div></div>' +
        '<div class="' + CSS_FIELD_DATE_TO + '">' +
        '<div class="' + CSS_FIELD_DATE_TO_LABEL + '">To</div>' +
        '<div class="' + CSS_FIELD_DATE_TO_DATE + ' ' + CSS_FIELD_DATE_INPUT + '"></div>' +
        '<div class="' + CSS_FIELD_DATE_TO_TIME + ' ' + CSS_FIELD_DATE_INPUT_TIME + '"></div></div>' +
        '</div>',

    /**
     * Constructor for the `A.FormFieldDate`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after({
            yearToggleFromChange: this._afterYearToggleFromChange,
            toggleIntervalChange: this._afterToggleIntervalChange,
            timeToggleFromChange: this._afterTimeToggleFromChange,
            yearToggleToChange: this._afterYearToggleToChange,
            timeToggleToChange: this._afterTimeToggleToChange
        });
    },

    /**
     * Create the DOM structure for the `A.FormFieldDate`. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var content = this.get('content');

        A.FormFieldDate.superclass.renderUI.call(this);

        content.addClass(CSS_FIELD_DATE);

        this._uiSetYearToggleFrom(this.get('yearToggleFrom'));
        this._uiSetTimeToggleFrom(this.get('timeToggleFrom'));
        this._uiSetToggleInterval(this.get('toggleInterval'));
        this._uiSetYearToggleTo(this.get('yearToggleTo'));
        this._uiSetTimeToggleTo(this.get('timeToggleTo'));
    },

    /**
     * Fired after the `timeToggleFrom` attribute is set.
     *
     * @method _afterTimeToggleFromChange
     * @protected
     */
    _afterTimeToggleFromChange: function() {
        this._uiSetTimeToggleFrom(this.get('timeToggleFrom'));
    },

    /**
     * Fired after the `timeToggleTo` attribute is set.
     *
     * @method _afterTimeToggleToChange
     * @protected
     */
    _afterTimeToggleToChange: function() {
        this._uiSetTimeToggleTo(this.get('timeToggleTo'));
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
     * Fired after the `yearToggleFrom` attribute is set.
     *
     * @method _afterYearToggleFromChange
     * @protected
     */
    _afterYearToggleFromChange: function() {
        this._uiSetYearToggleFrom(this.get('yearToggleFrom'));
    },

    /**
     * Fired after the `yearToggleTo` attribute is set.
     *
     * @method _afterYearToggleToChange
     * @protected
     */
    _afterYearToggleToChange: function() {
        this._uiSetYearToggleTo(this.get('yearToggleTo'));
    },

    /**
     * Updates the ui according to the value of the `timeToggleFrom` attribute.
     *
     * @method _uiSetTimeToggleFrom
     * @param {Boolean} timeToggleFrom
     * @protected
     */
    _uiSetTimeToggleFrom: function(timeToggleFrom) {
        var timeContainer = this.get('content').one('.' + CSS_FIELD_DATE_FROM_TIME);

        timeContainer.toggleView(timeToggleFrom);
    },

    /**
     * Updates the ui according to the value of the `timeToggleTo` attribute.
     *
     * @method _uiSetTimeToggleTo
     * @param {Boolean} timeToggleTo
     * @protected
     */
    _uiSetTimeToggleTo: function(timeToggleTo) {
        var timeContainer = this.get('content').one('.' + CSS_FIELD_DATE_TO_TIME);

        timeContainer.toggleView(timeToggleTo);
    },

    /**
     * Updates the ui according to the value of the `toggleInterval` attribute.
     *
     * @method _uiSetToggleInterval
     * @param {Boolean} toggleInterval
     * @protected
     */
    _uiSetToggleInterval: function(toggleInterval) {
        this.get('content').toggleClass(CSS_FIELD_DATE_TO_ENABLED, toggleInterval);
    },

    /**
     * Updates the ui according to the value of the `yearToggleFrom` attribute.
     *
     * @method _uiSetYearToggleFrom
     * @param {Boolean} yearToggleFrom
     * @protected
     */
    _uiSetYearToggleFrom: function(yearToggleFrom) {
        var dateContainer = this.get('content').one('.' + CSS_FIELD_DATE_FROM_DATE);

        dateContainer.toggleClass('year', yearToggleFrom);
    },

    /**
     * Updates the ui according to the value of the `yearToggleTo` attribute.
     *
     * @method _uiSetYearToggleTo
     * @param {Boolean} yearToggleTo
     * @protected
     */
    _uiSetYearToggleTo: function(yearToggleTo) {
        var dateContainer = this.get('content').one('.' + CSS_FIELD_DATE_TO_DATE);

        dateContainer.toggleClass('year', yearToggleTo);
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormFieldDate`.
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
         * Flag indicating if the start date will use time.
         *
         * @attribute timeToggleFrom
         * @default false
         * @type {Boolean}
         */
        timeToggleFrom: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * Flag indicating if the end date will use time.
         *
         * @attribute timeToggleTo
         * @default false
         * @type {Boolean}
         */
        timeToggleTo: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * Flag indicating if there will be a end date.
         *
         * @attribute toggleInterval
         * @default false
         * @type {Boolean}
         */
        toggleInterval: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * Flag indicating if the start date will use year.
         *
         * @attribute yearToggleFrom
         * @default false
         * @type {Boolean}
         */
        yearToggleFrom: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * Flag indicating if the end date will use year.
         *
         * @attribute yearToggleTo
         * @default false
         * @type {Boolean}
         */
        yearToggleTo: {
            validator: A.Lang.isBoolean,
            value: false
        }
    }
});
