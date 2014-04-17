/**
 * The DatePicker Component
 *
 * @module aui-datepicker
 */

var Lang = A.Lang,

    clamp = function(value, min, max) {
        return Math.min(Math.max(value, min), max);
    };

/**
 * A base class for `DatePickerBase`.
 *
 * @class A.DatePickerBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */

function DatePickerBase() {}

/**
 * Lists `CalendarBase` pane templates.
 *
 * @property PANES
 * @type {Array}
 * @static
 */
DatePickerBase.PANES = [
    A.CalendarBase.ONE_PANE_TEMPLATE,
    A.CalendarBase.TWO_PANE_TEMPLATE,
    A.CalendarBase.THREE_PANE_TEMPLATE
];

/**
 * Static property used to define the default attribute configuration for the
 * `DatePickerBase`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
DatePickerBase.ATTRS = {

    /**
     * Stores the configuration of the `Calendar` instance.
     *
     * @attribute calendar
     * @default {}
     * @writeOnce
     */
    calendar: {
        setter: '_setCalendar',
        value: {},
        writeOnce: true
    },

    /**
     * Sets the initial visibility.
     *
     * @attribute autoHide
     * @default true
     * @type {Boolean}
     */
    autoHide: {
        validator: Lang.isBoolean,
        value: true
    },

    /**
     * Defines how many panes should be rendered.
     *
     * @attribute panes
     * @default 1
     * @type {Number}
     * @writeOnce
     */
    panes: {
        setter: '_setPanes',
        value: 1,
        validator: Lang.isNumber,
        writeOnce: true
    }
};

A.mix(DatePickerBase.prototype, {
    calendar: null,

    /**
     * Construction logic executed during `DatePickerBase` instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.after('selectionChange', instance._afterDatePickerSelectionChange);
    },

    /**
     * Clears a selection in the `Calendar`.
     *
     * @method clearSelection
     * @param silent
     */
    clearSelection: function(silent) {
        var instance = this;

        instance.getCalendar()._clearSelection(silent);
    },

    /**
     * Deselects a date in the `Calendar`.
     *
     * @method deselectDates
     * @param dates
     */
    deselectDates: function(dates) {
        var instance = this;

        instance.getCalendar().deselectDates(dates);
    },

    /**
     * Returns an existent `Calendar` instance or creates a new one if it
     * doesn't exists.
     *
     * @method getCalendar
     * @return {Calendar}
     */
    getCalendar: function() {
        var instance = this,
            calendar = instance.calendar,
            originalCalendarTemplate;

        if (!calendar) {
            // CalendarBase leaks a functionality to dinamically switch the
            // template. Therefore, switch it to respect panels configuration
            // attribute, then switch it back after calendar renders.
            originalCalendarTemplate = A.CalendarBase.CONTENT_TEMPLATE;
            A.CalendarBase.CONTENT_TEMPLATE =
                DatePickerBase.PANES[instance.get('panes') - 1];

            // Initialize the popover instance before calendar renders since it
            // will use popover.bodyNode as render node.
            instance.getPopover();

            calendar = new A.Calendar(instance.get('calendar'));
            calendar.render(instance.popover.bodyNode);
            instance.calendar = calendar;

            calendar.after(
                'selectionChange', instance._afterCalendarSelectionChange,
                instance);
            calendar.after(
                'dateClick', instance._afterCalendarDateClick,
                instance);

            // Restore the original CalendarBase template.
            A.CalendarBase.CONTENT_TEMPLATE = originalCalendarTemplate;
        }

        return calendar;
    },

    /**
     * Selects a date in the `Calendar`.
     *
     * @method selectDates
     * @param dates
     */
    selectDates: function(dates) {
        var instance = this;

        instance.getCalendar().selectDates(instance._normalizeDatesForCalendar(dates));
    },

    /**
     * Renders the widget in an `<input>` node.
     *
     * @method useInputNode
     * @param node
     */
    useInputNode: function(node) {
        var instance = this,
            popover = instance.getPopover();

        popover.set('trigger', node);
        instance.set('activeInput', node);

        instance.alignTo(node);
        instance.clearSelection(true);
        instance.selectDates(instance.getParsedDatesFromInputValue());
    },

    /**
     * Fires after a click in the `Calendar` date.
     *
     * @method _afterCalendarDateClick
     * @protected
     */
    _afterCalendarDateClick: function() {
        var instance = this,
            calendar = instance.getCalendar(),
            selectionMode = calendar.get('selectionMode');

        if (instance.get('autoHide') && (selectionMode !== 'multiple')) {
            instance.hide();
        }
    },

    /**
     * Fires after a selection change in the `Calendar`.
     *
     * @method _afterCalendarSelectionChange
     * @param event
     * @protected
     */
    _afterCalendarSelectionChange: function(event) {
        var instance = this;

        instance.fire('selectionChange', {
            newSelection: event.newSelection
        });
    },

    /**
     * Fires when a selection change in the `DatePicker`.
     *
     * @method _afterDatePickerSelectionChange
     * @protected
     */
    _afterDatePickerSelectionChange: function() {
        var instance = this;

        instance._setCalendarToFirstSelectedDate();
    },

    /**
     * Sets the first selected date in the `Calendar`.
     *
     * @method _setCalendarToFirstSelectedDate
     * @protected
     */
    _setCalendarToFirstSelectedDate: function() {
        var instance = this,
            dates = instance.getSelectedDates(),
            firstSelectedDate = dates[0];

        if (firstSelectedDate) {
            instance.getCalendar().set('date', firstSelectedDate);
        }
    },

    /**
     * Fires when the user's first interaction happens.
     *
     * @method _onceUserInteractionRelease
     * @param event
     * @protected
     */
    _onceUserInteractionRelease: function(event) {
        var instance = this;

        instance.useInputNodeOnce(event.currentTarget);

        instance.alignTo(event.currentTarget);

        instance._userInteractionInProgress = false;
    },

    /**
     * Sets the `calendar` value by merging its object with another properties.
     *
     * @method _setCalendar
     * @param val
     * @protected
     */
    _setCalendar: function(val) {
        return A.merge({
            showNextMonth: true,
            showPrevMonth: true
        }, val);
    },

    /**
     * Sets the `pane` value between 1 and 3.
     *
     * @method _setPanes
     * @param val
     * @protected
     * @return {Number} Clamped number of panes.
     */
    _setPanes: function(val) {
        return clamp(val, 1, 3);
    },

    /**
     * Makes any necessary changes to dates before using them in the
     * calendar.
     *
     * @method _normalizeDatesForCalendar
     * @param dates
     * @protected
     */
    _normalizeDatesForCalendar: function(dates) {
        var instance = this,
            calendar = this.getCalendar(),
            minDate = calendar.get('minimumDate'),
            maxDate = calendar.get('maximumDate');

        if (!dates) {
            return dates;
        }

        // We allow users to send a single date as this param as well,
        // so converting to array here.
        if (!Lang.isArray(dates)) {
            dates = [dates];
        }

        return dates.map(function(date) {
            // In the date picker the time of the selected day is irrelevant.
            // The calendar module (that is used to provide the dates to be
            // selected) currently does take the time into account when comparing
            // a selected date to the minimum allowed date, if one was set, though.
            // So we need to make sure that if the date matches the day of the
            // minimumDate option, its timestamp will be greater.
            if (minDate && instance._isSameDay(date, minDate)) {
                return new Date(minDate.getTime() + 1);
            }

            // This is similar to the minimumDate logic. We need to make sure that
            // the timestamp is lower than the maximumDate option if it's on the same
            // day.
            if (maxDate && instance._isSameDay(date, maxDate)) {
                return new Date(maxDate.getTime() - 1);
            }

            return date;
        });
    },

    /**
     * Checks if the given dates are referencing the same
     * day, month and year.
     *
     * @method _isSameDay
     * @param date1
     * @param date2
     * @protected
     */
    _isSameDay: function(date1, date2) {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    }
}, true);

A.DatePickerBase = DatePickerBase;

/**
 * A base class for `DatePicker`.
 *
 * @class A.DatePicker
 * @extends Base
 * @uses A.DatePickerDelegate, A.DatePickerPopover, A.DatePickerBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/datepicker/basic-markup.html
 * @include http://alloyui.com/examples/datepicker/basic.js
 */
A.DatePicker = A.Base.create('datepicker', A.Base, [A.DatePickerDelegate, A.DatePickerPopover, A.DatePickerBase]);
