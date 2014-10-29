/**
 * The Form Builder Field Date Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-date
 */

var CSS_FIELD_DATE = A.getClassName('form', 'builder', 'field', 'date'),
    CSS_FIELD_DATE_FROM_DATE = A.getClassName('form', 'builder', 'field', 'date', 'from', 'date'),
    CSS_FIELD_DATE_FROM_TIME = A.getClassName('form', 'builder', 'field', 'date', 'from', 'time'),
    CSS_FIELD_DATE_TO_DATE = A.getClassName('form', 'builder', 'field', 'date', 'to', 'date'),
    CSS_FIELD_DATE_TO_TIME = A.getClassName('form', 'builder', 'field', 'date', 'to', 'time'),
    CSS_CHECKED_CONTENT_DATE = A.getClassName('checked', 'content', 'date'),
    CSS_UNCHECKED_CONTENT_DATE = A.getClassName('unchecked', 'content', 'date'),
    CSS_CHECKED_CONTENT_TIME = A.getClassName('checked', 'content', 'time'),
    CSS_UNCHECKED_CONTENT_TIME = A.getClassName('unchecked', 'content', 'time'),

    TPL_CHECKED_CONTENT_DATE = '<div class="' + CSS_CHECKED_CONTENT_DATE + '"> Month | Day | Year </div>',
    TPL_UNCHECKED_CONTENT_DATE = '<div class="' + CSS_UNCHECKED_CONTENT_DATE + '"> Month | Day </div>',
    TPL_CHECKED_CONTENT_TIME = '<div class="' + CSS_CHECKED_CONTENT_TIME + '"> Hour | Min | AM/PM </div>',
    TPL_UNCHECKED_CONTENT_TIME = '<div class="' + CSS_UNCHECKED_CONTENT_TIME + '">Include Time?</div>';

/**
 * A base class for Form Builder Field Date.
 *
 * @class A.FormBuilderFieldDate
 * @extends A.FormBuilderFieldSentence
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldDate = A.Base.create('form-builder-field-date', A.FormBuilderFieldSentence, [], {
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_DATE + '">' +
        '<div class="' + CSS_FIELD_DATE_FROM_DATE + '"> Month | Day </div>' +
        '<div class="' + CSS_FIELD_DATE_FROM_TIME + '"></div>' +
        '<div class="' + CSS_FIELD_DATE_TO_DATE + '"></div>' +
        '<div class="' + CSS_FIELD_DATE_TO_TIME + '"></div>' +
        '</div>',

    /**
     * Constructor for the `A.FormBuilderFieldDate`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        content.addClass(CSS_FIELD_DATE);

        this._uiSetYearToggleFrom(this.get('yearToggleFrom'));
        this._uiSetTimeToggleFrom(this.get('timeToggleFrom'));
        this._uiSetToggleInterval(this.get('toggleInterval'));
        this._uiSetYearToggleTo(this.get('yearToggleTo'));
        this._uiSetTimeToggleTo(this.get('timeToggleTo'));
        
        this.after({
            yearToggleFromChange: this._afterYearToggleFromChange,
            toggleIntervalChange: this._afterToggleIntervalChange,
            timeToggleFromChange: this._afterTimeToggleFromChange,
            yearToggleToChange: this._afterYearToggleToChange,
            timeToggleToChange: this._afterTimeToggleToChange
        });
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
     * Fired after the `BooleanFromTo` checkbox is set.
     *
     * @method _afterBooleanFromToChange
     * @param {Object} booleanYearToggleFrom
     * @param {Object} booleanYearToggleTo
     * @param {Object} booleanTimeToggleFrom
     * @param {Object} booleanTimeToggleTo
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _afterBooleanFromToChange: function (booleanYearToggleFrom, booleanYearToggleTo, booleanTimeToggleFrom, booleanTimeToggleTo, event) {

        booleanYearToggleTo.updateUiWithValue(booleanYearToggleFrom.get('editedValue'));
        booleanTimeToggleTo.updateUiWithValue(booleanTimeToggleFrom.get('editedValue'));

        booleanYearToggleTo.set('visible', event.newVal);
        booleanTimeToggleTo.set('visible', event.newVal);

    },

    /**
     * Fills the settings array with the information for this field.
     *
     * @method _fillSettings
     * @override
     * @protected
     */
    _fillSettings: function() {
        var booleanYearToggleFrom,
            booleanTimeToggleFrom,
            booleanFromTo,
            booleanYearToggleTo,
            booleanTimeToggleTo;

        booleanYearToggleFrom = new A.BooleanDataEditor({
            checkedContent: TPL_CHECKED_CONTENT_DATE,
            uncheckedContent: TPL_UNCHECKED_CONTENT_DATE
        });

        booleanTimeToggleFrom = new A.BooleanDataEditor({
            checkedContent: TPL_CHECKED_CONTENT_TIME,
            uncheckedContent: TPL_UNCHECKED_CONTENT_TIME
        });

        booleanFromTo = new A.BooleanDataEditor({
            label: 'Enable "From/To" Format'
        });

        booleanYearToggleTo = new A.BooleanDataEditor({
            checkedContent: TPL_CHECKED_CONTENT_DATE,
            uncheckedContent: TPL_UNCHECKED_CONTENT_DATE,
            visible: false
        });

        booleanTimeToggleTo = new A.BooleanDataEditor({
            checkedContent: TPL_CHECKED_CONTENT_TIME,
            uncheckedContent: TPL_UNCHECKED_CONTENT_TIME,
            visible: false
        });

        booleanFromTo.after('editedValueChange',
            A.bind(this._afterBooleanFromToChange, this,
            booleanYearToggleFrom, booleanYearToggleTo, booleanTimeToggleFrom, booleanTimeToggleTo));

        A.FormBuilderFieldDate.superclass._fillSettings.apply(this, arguments);

        this._settings.push(
            {
                attrName: 'yearToggleFrom',
                editor: booleanYearToggleFrom
            },
            {
                attrName: 'timeToggleFrom',
                editor: booleanTimeToggleFrom
            },
            {
                attrName: 'toggleInterval',
                editor: booleanFromTo
            },
            {
                attrName: 'yearToggleTo',
                editor: booleanYearToggleTo
            },
            {
                attrName: 'timeToggleTo',
                editor: booleanTimeToggleTo
            },
            {
                attrName: 'required',
                editor: new A.BooleanDataEditor({
                    label: 'Required'
                })
            }
        );
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

        if (timeToggleFrom) {
            timeContainer.setHTML('From: Hour | Min | AM/PM ');
        }
        else {
            timeContainer.setHTML('');
        }
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

        if (timeToggleTo) {
            timeContainer.setHTML('To: Hour | Min | AM/PM ');
        }
        else {
            timeContainer.setHTML('');
        }
    },

    /**
     * Updates the ui according to the value of the `toggleInterval` attribute.
     *
     * @method _uiSetToggleInterval
     * @param {Boolean} toggleInterval
     * @protected
     */
    _uiSetToggleInterval: function(toggleInterval) {
        if (toggleInterval) {
            this.get('content').one('.' + CSS_FIELD_DATE_TO_DATE).show();
            this.get('content').one('.' + CSS_FIELD_DATE_TO_TIME).show();
        }
        else {
            this.get('content').one('.' + CSS_FIELD_DATE_TO_DATE).hide();
            this.get('content').one('.' + CSS_FIELD_DATE_TO_TIME).hide();
        }
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

        if (yearToggleFrom) {
            dateContainer.setHTML('From: Month | Day | Year ');
        }
        else {
            dateContainer.setHTML('From: Month | Day ');
        }
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

        if (yearToggleTo) {
            dateContainer.setHTML('To: Month | Day | Year');
        }
        else {
            dateContainer.setHTML('To: Month | Day');
        }
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormBuilderFieldDate`.
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
