/**
 * The DatePicker Component
 *
 * @module aui-datepicker
 */

var Lang = A.Lang,

    clamp = function(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    ACTIVE_INPUT = 'activeInput',
    AUTO_HIDE = 'autoHide',
    CALENDAR = 'calendar',
    DATE = 'date',
    DATE_CLICK = 'dateClick',
    MULTIPLE = 'multiple',
    PANES = 'panes',
    SELECTION_CHANGE = 'selectionChange',
    SELECTION_MODE = 'selectionMode',
    TRIGGER = 'trigger';

/**
 * A base class for DatePickerBase.
 *
 * @class A.DatePickerBase
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */

function DatePickerBase() {}

/**
 * Static property used to define the default attribute
 * configuration for the DatePickerBase.
 *
 * @property DatePickerBase.PANES
 * @type Array
 * @static
 */
DatePickerBase.PANES = [
    A.CalendarBase.ONE_PANE_TEMPLATE,
    A.CalendarBase.TWO_PANE_TEMPLATE,
    A.CalendarBase.THREE_PANE_TEMPLATE
];

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property DatePickerBase.ATTRS
 * @type Object
 * @static
 */
DatePickerBase.ATTRS = {

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute autoHide
     * @default true
     * @type Boolean
     */
    autoHide: {
        validator: Lang.isBoolean,
        value: true
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute panes
     * @default 1
     * @type Number
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
     * Construction logic executed during DatePickerBase instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.after(SELECTION_CHANGE, instance._afterDatePickerSelectionChange);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method clearSelection
     * @param silent
     */
    clearSelection: function(silent) {
        var instance = this;

        instance.getCalendar()._clearSelection(silent);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method deselectDates
     * @param dates
     */
    deselectDates: function(dates) {
        var instance = this;

        instance.getCalendar().deselectDates(dates);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getCalendar
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
                DatePickerBase.PANES[instance.get(PANES) - 1];

            // Initialize the popover instance before calendar renders since it
            // will use popober.bodyNode as render node.
            instance.getPopover();

            calendar = new A.Calendar(instance.get(CALENDAR));
            calendar.render(instance.popover.bodyNode);
            instance.calendar = calendar;

            calendar.after(
                SELECTION_CHANGE, instance._afterCalendarSelectionChange,
                instance);
            calendar.after(
                DATE_CLICK, instance._afterCalendarDateClick,
                instance);

            // Restore the original CalendarBase template.
            A.CalendarBase.CONTENT_TEMPLATE = originalCalendarTemplate;
        }

        return calendar;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method selectDates
     * @param dates
     */
    selectDates: function(dates) {
        var instance = this;

        instance.getCalendar().selectDates(instance._normalizeDatesForCalendar(dates));
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method useInputNode
     * @param node
     */
    useInputNode: function(node) {
        var instance = this,
            popover = instance.getPopover();

        popover.set(TRIGGER, node);
        instance.set(ACTIVE_INPUT, node);

        instance.alignTo(node);
        instance.clearSelection(true);
        instance.selectDates(instance.getParsedDatesFromInputValue());
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterCalendarDateClick
     * @protected
     */
    _afterCalendarDateClick: function() {
        var instance = this,
            calendar = instance.getCalendar(),
            selectionMode = calendar.get(SELECTION_MODE);

        if (instance.get(AUTO_HIDE) && (selectionMode !== MULTIPLE)) {
            instance.hide();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterCalendarSelectionChange
     * @param event
     * @protected
     */
    _afterCalendarSelectionChange: function(event) {
        var instance = this;

        instance.fire(SELECTION_CHANGE, {
            newSelection: event.newSelection
        });
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterDatePickerSelectionChange
     * @protected
     */
    _afterDatePickerSelectionChange: function() {
        var instance = this;

        instance._setCalendarToFirstSelectedDate();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _setCalendarToFirstSelectedDate
     * @protected
     */
    _setCalendarToFirstSelectedDate: function() {
        var instance = this,
            dates = instance.getSelectedDates(),
            firstSelectedDate = dates[0];

        if (firstSelectedDate) {
            instance.getCalendar().set(DATE, firstSelectedDate);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _setPanes
     * @param val
     * @protected
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
 * A base class for DatePicker.
 *
 * @class A.DatePicker
 * @extends A.Base
 * @uses A.DatePickerDelegate, A.DatePickerPopover, A.DatePickerBase
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.DatePicker = A.Base.create('datepicker', A.Base, [A.DatePickerDelegate, A.DatePickerPopover, A.DatePickerBase]);
