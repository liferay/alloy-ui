/**
 * The Form Builder Field Date Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-date
 */

var CSS_CHECKED_CONTENT_DATE = A.getClassName('checked', 'content', 'date'),
    CSS_CHECKED_CONTENT_TIME = A.getClassName('checked', 'content', 'time'),
    CSS_UNCHECKED_CONTENT_DATE = A.getClassName('unchecked', 'content', 'date'),
    CSS_UNCHECKED_CONTENT_TIME = A.getClassName('unchecked', 'content', 'time'),

    TPL_CHECKED_CONTENT_DATE = '<div class="' + CSS_CHECKED_CONTENT_DATE + '"> Month | Day | Year </div>',
    TPL_CHECKED_CONTENT_TIME = '<div class="' + CSS_CHECKED_CONTENT_TIME + '"> Hour | Min | AM/PM </div>',
    TPL_UNCHECKED_CONTENT_DATE = '<div class="' + CSS_UNCHECKED_CONTENT_DATE + '"> Month | Day </div>',
    TPL_UNCHECKED_CONTENT_TIME = '<div class="' + CSS_UNCHECKED_CONTENT_TIME + '">Include Time?</div>';

/**
 * A base class for Form Builder Field Date.
 *
 * @class A.FormBuilderFieldDate
 * @extends A.FormFieldDate
 * @uses A.FormBuilderFieldBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldDate = A.Base.create('form-builder-field-date', A.FormFieldDate, [A.FormBuilderFieldBase], {
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
        booleanYearToggleTo.set('visible', event.newVal);
        booleanTimeToggleTo.set('visible', event.newVal);

        booleanYearToggleTo.updateUiWithValue(booleanYearToggleFrom.get('editedValue'));
        booleanTimeToggleTo.updateUiWithValue(booleanTimeToggleFrom.get('editedValue'));
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
            uncheckedContent: TPL_UNCHECKED_CONTENT_DATE,
            innerLabelLeft: 'Year',
            innerLabelRight: 'Year'
        });

        booleanTimeToggleFrom = new A.BooleanDataEditor({
            checkedContent: TPL_CHECKED_CONTENT_TIME,
            uncheckedContent: TPL_UNCHECKED_CONTENT_TIME,
            innerLabelRight: 'No'
        });

        booleanFromTo = new A.BooleanDataEditor({
            label: 'Enable "From/To" Format',
            innerLabelRight: 'No'
        });

        booleanYearToggleTo = new A.BooleanDataEditor({
            checkedContent: TPL_CHECKED_CONTENT_DATE,
            uncheckedContent: TPL_UNCHECKED_CONTENT_DATE,
            visible: false,
            innerLabelLeft: 'Year',
            innerLabelRight: 'Year'
        });

        booleanTimeToggleTo = new A.BooleanDataEditor({
            checkedContent: TPL_CHECKED_CONTENT_TIME,
            uncheckedContent: TPL_UNCHECKED_CONTENT_TIME,
            visible: false,
            innerLabelRight: 'No'
        });

        booleanFromTo.after('editedValueChange', A.bind(
            this._afterBooleanFromToChange,
            this,
            booleanYearToggleFrom,
            booleanYearToggleTo,
            booleanTimeToggleFrom,
            booleanTimeToggleTo
        ));

        this._settings.push(
            {
                attrName: 'required',
                editor: new A.BooleanDataEditor({
                    label: 'Required'
                })
            },
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
            }
        );
    }
});
