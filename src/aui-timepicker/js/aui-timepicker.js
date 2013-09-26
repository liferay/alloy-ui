/**
 * The TimePicker Component
 *
 * @module aui-timepicker
 */

var Lang = A.Lang,

    ACTIVE_INPUT = 'activeInput',
    AUTO = 'auto',
    AUTO_HIDE = 'autoHide',
    AUTOCOMPLETE = 'autocomplete',
    DATE_SEPARATOR = 'dateSeparator',
    MASK = 'mask',
    SELECT = 'select',
    SELECTION_CHANGE = 'selectionChange',
    TRIGGER = 'trigger',
    VALUES = 'values';

/**
 * A base class for TimePickerBase.
 *
 * @class A.TimePickerBase
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */

function TimePickerBase() {}

/**
 * Static property used to define the default attribute
 * configuration for the TimePickerBase.
 *
 * @property TimePickerBase.ATTRS
 * @type Object
 * @static
 */
TimePickerBase.ATTRS = {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute autocomplete
     * @default {}
     * @writeOnce
     */
    autocomplete: {
        setter: '_setAutocomplete',
        value: {},
        writeOnce: true
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute dateSeparator
     * @default ', '
     */
    dateSeparator: {
        value: ', '
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute mask
     * @default '%I:%M %p'
     */
    mask: {
        value: '%I:%M %p'
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute popoverCssClass
     * @default A.getClassName('timepicker-popover')
     */
    popoverCssClass: {
        value: A.getClassName('timepicker-popover')
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute values
     * @default ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']
     * @type Array
     */
    values: {
        setter: '_setValues',
        value: [
            '00:00',
            '00:30',
            '01:00',
            '01:30',
            '02:00',
            '02:30',
            '03:00',
            '03:30',
            '04:00',
            '04:30',
            '05:00',
            '05:30',
            '06:00',
            '06:30',
            '07:00',
            '07:30',
            '08:00',
            '08:30',
            '09:00',
            '09:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30',
            '20:00',
            '20:30',
            '21:00',
            '21:30',
            '22:00',
            '22:30',
            '23:00',
            '23:30'
        ],
        validator: Lang.isArray
    }
};

A.mix(TimePickerBase.prototype, {
    autocomplete: null,

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method clearSelection
     */
    clearSelection: function() {
        var instance = this;

        instance._handleSelection();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getAutoComplete
     * @param node
     */
    getAutoComplete: function(node) {
        var instance = this,
            autocomplete = instance.autocomplete,
            autocompleteConfig = instance.get(AUTOCOMPLETE);

        if (autocomplete) {
            autocomplete.destroy();
        }

        autocompleteConfig.inputNode = node;
        autocomplete = new A.AutoComplete(autocompleteConfig);
        autocomplete.render(instance.getPopover().bodyNode).sendRequest();
        instance.autocomplete = autocomplete;

        autocomplete.after(SELECT, instance._afterAutocompleteSelect, instance);

        return autocomplete;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method selectDates
     * @param dates
     */
    selectDates: function(dates) {
        var instance = this;

        instance._handleSelection(dates);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method useInputNode
     * @param node
     */
    useInputNode: function(node) {
        var instance = this,
            activeInput = instance.get(ACTIVE_INPUT),
            popover = instance.getPopover();

        if (activeInput !== node) {
            instance.set(ACTIVE_INPUT, node);
            popover.set(TRIGGER, node);
            instance.getAutoComplete(node);
        }

        instance.alignTo(node);
        instance.selectDates(instance.getParsedDatesFromInputValue());
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterAutocompleteSelect
     * @param event
     * @protected
     */
    _afterAutocompleteSelect: function(event) {
        var instance = this,
            parsed = instance.getParsedDatesFromInputValue(),
            selected = instance.getParsedDatesFromInputValue(event.result.raw);

        if (parsed.length && selected.length) {
            parsed.pop();
            parsed.push(selected.pop());
        }

        instance.selectDates(parsed);

        if (instance.get(AUTO_HIDE)) {
            instance.hide();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _handleSelection
     * @param selection
     * @protected
     */
    _handleSelection: function(selection) {
        var instance = this;

        if (selection) {
            instance.fire(SELECTION_CHANGE, {
                newSelection: selection
            });
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _setAutocomplete
     * @param val
     * @protected
     */
    _setAutocomplete: function(val) {
        var instance = this,
            dateSeparator = instance.get(DATE_SEPARATOR),
            values = instance.get(VALUES);

        return A.merge({
            align: false,
            allowTrailingDelimiter: true,
            alwaysShowList: true,
            minQueryLength: 0,
            queryDelimiter: dateSeparator,
            source: values,
            tabSelect: false,
            width: AUTO
        }, val);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _setValues
     * @param val
     * @protected
     */
    _setValues: function(val) {
        var instance = this,
            formatted = [];

        A.Array.each(val, function(timeISOFormat) {
            formatted.push(
                A.Date.format(
                    A.Date.parse('%H:%M', timeISOFormat), {
                        format: instance.get(MASK)
                    }));
        });

        return formatted;
    }
}, true);

A.TimePickerBase = TimePickerBase;

/**
 * A base class for TimePicker.
 *
 * @class A.TimePicker
 * @extends A.Base
 * @uses A.DatePickerDelegate, A.DatePickerPopover, A.TimePickerBase
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.TimePicker = A.Base.create('timepicker', A.Base, [A.DatePickerDelegate, A.DatePickerPopover, A.TimePickerBase]);
