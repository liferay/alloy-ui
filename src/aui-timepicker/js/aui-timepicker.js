/**
 * The TimePicker Component
 *
 * @module aui-timepicker
 */

var Lang = A.Lang;

/**
 * A base class for `TimePickerBase`.
 *
 * @class A.TimePickerBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */

function TimePickerBase() {}

/**
 * Static property used to define the default attribute configuration for the
 * `TimePickerBase`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
TimePickerBase.ATTRS = {

    /**
     * Default `AutoComplete` configuration options.
     *
     * @attribute autocomplete
     * @default {}
     * @type {Object}
     * @writeOnce
     */
    autocomplete: {
        setter: '_setAutocomplete',
        value: {},
        writeOnce: true
    },

    /**
     * Value seperator for `queryDelimiter` attribute of `AutoComplete` class.
     *
     * @attribute dateSeparator
     * @default ', '
     * @type {String}
     */
    dateSeparator: {
        value: ', '
    },

    /**
     * Focus time picker to the time option nearest the timepicker's input time
     * or the time option nearest the current local time when no input time
     * is passed.
     *
     * @attribute focusSelectedTime
     * @default true
     * @type {boolean}
     */
    focusSelectedTime: {
        validator: Lang.isBoolean,
        value: true
    },

    /**
     * Format for displayed time.
     *
     * @attribute mask
     * @default '%I:%M %p'
     * @type {String}
     */
    mask: {
        value: '%I:%M %p'
    },

    /**
     * CSS class for popover.
     *
     * @attribute popoverCssClass
     * @default A.getClassName('timepicker-popover')
     * @type {String}
     */
    popoverCssClass: {
        value: A.getClassName('timepicker-popover')
    },

    /**
     * Time values available to `AutoComplete` instance.
     *
     * @attribute values
     * @default ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00',
     *     '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30',
     *     '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00',
     *     '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
     *     '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
     *     '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
     *     '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']
     * @type {Array}
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
     * Clears selection.
     *
     * @method clearSelection
     */
    clearSelection: function() {
        var instance = this;

        instance._handleSelection();
    },

    /**
     * Triggers `_focusSelectedValue` method.
     *
     * @method focusCurrentValue
     */
    focusSelectedValue: function() {
        var instance = this;

        if (instance.get('focusSelectedTime')) {
            instance._focusSelectedValue();
        }
    },

    /**
     * Creates and returns a new instance of `AutoComplete`.
     *
     * @method getAutoComplete
     * @param {Node} node
     * @return {Object} `AutoComplete` instance
     */
    getAutoComplete: function(node) {
        var instance = this,
            autocomplete = instance.autocomplete,
            autocompleteConfig = instance.get('autocomplete');

        if (autocomplete) {
            autocomplete.destroy();
        }

        autocompleteConfig.inputNode = node;
        autocomplete = new A.AutoComplete(autocompleteConfig);
        autocomplete.render(instance.getPopover().bodyNode).sendRequest();
        instance.autocomplete = autocomplete;

        autocomplete.after('select', instance._afterAutocompleteSelect, instance);

        return autocomplete;
    },

    /**
     * Get the input time value if it exists or return the current local time
     * in milliseconds
     *
     * @method getInputTime
     * @return {Int} date
     */
    getInputTime: function() {
        var instance = this,
            curTime,
            date,
            inputVal;

            date = new Date();

            curTime = Date.parse(date.toUTCString(date.getTime()));

            inputVal = instance.getParsedDatesFromInputValue();

        if (inputVal) {
            inputVal = inputVal.pop();

            curTime = Date.parse(inputVal);
        }

        return curTime;
    },

    /**
     * Sets selected date.
     *
     * @method selectDates
     * @param {Object} dates
     */
    selectDates: function(dates) {
        var instance = this;

        instance._handleSelection(dates);
    },

    /**
     * Syncs `TimePicker` values to input node value.
     *
     * @method useInputNode
     * @param {Node} node
     */
    useInputNode: function(node) {
        var instance = this,
            activeInput = instance.get('activeInput'),
            popover = instance.getPopover();

        if (activeInput !== node) {
            instance.set('activeInput', node);
            popover.set('trigger', node);
            instance.getAutoComplete(node);
        }

        instance.alignTo(node);
        instance.selectDates(instance.getParsedDatesFromInputValue());
    },

    /**
     * Selects date from `AutoComplete` selection.
     *
     * @method _afterAutocompleteSelect
     * @param {EventFacade} event
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

        if (instance.get('autoHide')) {
            instance.hide();
        }
    },

    /**
     * Select time nearest the current input time or local time.
     *
     * @method focusSelectedValue
     * @protected
     */
    _focusSelectedValue: function() {
        var instance = this,
            deltaTime,
            curTime,
            mask,
            nodeTime,
            nodeList,
            popoverBody,
            previousTime,
            targetNode,
            timeVals,
            topOffset;

            popoverBody = instance.getPopover().bodyNode;

            nodeList = popoverBody.all('.yui3-aclist-item');

        if (!nodeList.isEmpty()) {
            curTime = instance.getInputTime();

            mask = instance.get('mask');
            timeVals = instance.get('values');

            targetNode = nodeList.item(0);

            previousTime = (curTime * 2);

            for (var i = 0; i < timeVals.length; i++) {
                nodeTime = Date.parse(A.Date.parse(mask, timeVals[i]));

                deltaTime = Math.abs(curTime - nodeTime);

                if (deltaTime < previousTime) {
                    targetNode = nodeList.item(i);

                    previousTime = deltaTime;
                }
            }

            topOffset = targetNode.get('offsetTop');

            popoverBody.set('scrollTop', topOffset);
        }
    },

    /**
     * Sets new selection.
     *
     * @method _handleSelection
     * @param {Object} date selection
     * @protected
     */
    _handleSelection: function(selection) {
        var instance = this;

        if (selection) {
            instance.fire('selectionChange', {
                newSelection: selection
            });
        }
    },

    /**
     * Setter for `autoComplete` attribute, provides default configuration for
     * `AutoComplete` instance.
     *
     * @method _setAutocomplete
     * @param {Object} val
     * @return {Object} autocomplete config options
     * @protected
     */
    _setAutocomplete: function(val) {
        var instance = this,
            dateSeparator = instance.get('dateSeparator'),
            values = instance.get('values');

        return A.merge({
            align: false,
            allowTrailingDelimiter: true,
            alwaysShowList: true,
            minQueryLength: 0,
            queryDelimiter: dateSeparator,
            source: values,
            tabSelect: false,
            width: 'auto'
        }, val);
    },

    /**
     * Sets time values for `AutoComplete` instance.
     *
     * @method _setValues
     * @param {Array} val
     * @return {Array} time values
     * @protected
     */
    _setValues: function(val) {
        var instance = this,
            formatted = [];

        A.Array.each(val, function(timeISOFormat) {
            formatted.push(
                A.Date.format(
                    A.Date.parse('%H:%M', timeISOFormat), {
                        format: instance.get('mask')
                    }));
        });

        return formatted;
    }
}, true);

A.TimePickerBase = TimePickerBase;

/**
 * A base class for `TimePicker`.
 *
 * @class A.TimePicker
 * @extends Base
 * @uses A.DatePickerDelegate, A.DatePickerPopover, A.TimePickerBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/timepicker/basic-markup.html
 * @include http://alloyui.com/examples/timepicker/basic.js
 */
A.TimePicker = A.Base.create('timepicker', A.Base, [A.DatePickerDelegate, A.DatePickerPopover, A.TimePickerBase]);
