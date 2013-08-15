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

function DatePickerBase() {}

DatePickerBase.PANES = [
    A.CalendarBase.ONE_PANE_TEMPLATE,
    A.CalendarBase.TWO_PANE_TEMPLATE,
    A.CalendarBase.THREE_PANE_TEMPLATE
];

DatePickerBase.ATTRS = {
    calendar: {
        setter: '_setCalendar',
        value: {},
        writeOnce: true
    },

    autoHide: {
        validator: Lang.isBoolean,
        value: true
    },

    panes: {
        setter: '_setPanes',
        value: 1,
        validator: Lang.isNumber,
        writeOnce: true
    }
};

A.mix(DatePickerBase.prototype, {
    calendar: null,

    initializer: function() {
        var instance = this;

        instance.after(SELECTION_CHANGE, instance._afterDatePickerSelectionChange);
    },

    clearSelection: function(silent) {
        var instance = this;

        instance.getCalendar()._clearSelection(silent);
    },

    deselectDates: function(dates) {
        var instance = this;

        instance.getCalendar().deselectDates(dates);
    },

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

    selectDates: function(dates) {
        var instance = this;

        instance.getCalendar().selectDates(dates);
    },

    useInputNode: function(node) {
        var instance = this,
            popover = instance.getPopover();

        popover.set(TRIGGER, node);
        instance.set(ACTIVE_INPUT, node);

        instance.alignTo(node);
        instance.clearSelection(true);
        instance.selectDates(instance.getParsedDatesFromInputValue());
    },

    _afterCalendarDateClick: function() {
        var instance = this,
            calendar = instance.getCalendar(),
            selectionMode = calendar.get(SELECTION_MODE);

        if (instance.get(AUTO_HIDE) && (selectionMode !== MULTIPLE)) {
            instance.hide();
        }
    },

    _afterCalendarSelectionChange: function(event) {
        var instance = this;

        instance.fire(SELECTION_CHANGE, { newSelection: event.newSelection });
    },

    _afterDatePickerSelectionChange: function() {
        var instance = this;

        instance._setCalendarToFirstSelectedDate();
    },

    _setCalendarToFirstSelectedDate: function() {
        var instance = this,
            dates = instance.getSelectedDates(),
            firstSelectedDate = dates[0];

        if (firstSelectedDate) {
            instance.getCalendar().set(DATE, firstSelectedDate);
        }
    },

    _onceUserInteractionRelease: function(event) {
        var instance = this;

        instance.useInputNodeOnce(event.currentTarget);

        instance.alignTo(event.currentTarget);

        instance._userInteractionInProgress = false;
    },

    _setCalendar: function(val) {
        return A.merge({
            showNextMonth: true,
            showPrevMonth: true
        }, val);
    },

    _setPanes: function(val) {
        return clamp(val, 1, 3);
    }
}, true);

A.DatePickerBase = DatePickerBase;

A.DatePicker = A.Base.create('datepicker', A.Base, [A.DatePickerDelegate, A.DatePickerPopover, A.DatePickerBase]);