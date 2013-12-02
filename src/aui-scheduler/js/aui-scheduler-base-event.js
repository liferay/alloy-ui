/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-base-event
 */

var Lang = A.Lang,
    isArray = Lang.isArray,
    isBoolean = Lang.isBoolean,
    isDate = Lang.isDate,
    isFunction = Lang.isFunction,
    isNumber = Lang.isNumber,
    isObject = Lang.isObject,
    isString = Lang.isString,
    isValue = Lang.isValue,

    Color = A.Color,
    DateMath = A.DataType.DateMath,
    WidgetStdMod = A.WidgetStdMod,

    _COLON = ':',
    _DOT = '.',
    _EMPTY_STR = '',
    _N_DASH = '&ndash;',
    _SPACE = ' ',

    isModelList = function(val) {
        return val instanceof A.ModelList;
    },

    isSchedulerView = function(val) {
        return val instanceof A.SchedulerView;
    },

    TITLE_DT_FORMAT_ISO = '%H:%M',
    TITLE_DT_FORMAT_US_HOURS = '%l',
    TITLE_DT_FORMAT_US_MINUTES = '%M',

    getUSDateFormat = function(date) {
        var format = [TITLE_DT_FORMAT_US_HOURS];

        if (date.getMinutes() > 0) {
            format.push(_COLON);
            format.push(TITLE_DT_FORMAT_US_MINUTES);
        }

        if (date.getHours() >= 12) {
            format.push('pm');
        }

        return format.join(_EMPTY_STR);
    },

    DATA_VIEW_NAME = 'data-view-name',
    SCHEDULER_BASE = 'scheduler-base',
    SCHEDULER_CALENDAR = 'scheduler-calendar',
    SCHEDULER_VIEW = 'scheduler-view',

    ACTIVE_VIEW = 'activeView',
    ALL = 'all',
    ALL_DAY = 'allDay',
    BUTTON = 'button',
    COLOR = 'color',
    COLOR_BRIGHTNESS_FACTOR = 'colorBrightnessFactor',
    COLOR_SATURATION_FACTOR = 'colorSaturationFactor',
    CONTENT = 'content',
    CONTROLS = 'controls',
    CONTROLS_NODE = 'controlsNode',
    DATE = 'date',
    DAY = 'day',
    DISABLED = 'disabled',
    END_DATE = 'endDate',
    EVENT_RECORDER = 'eventRecorder',
    HD = 'hd',
    HEADER = 'header',
    HEADER_NODE = 'headerNode',
    HIDDEN = 'hidden',
    ICON = 'icon',
    ICON_NEXT_NODE = 'iconNextNode',
    ICON_PREV_NODE = 'iconPrevNode',
    ICONS = 'icons',
    ISO_TIME = 'isoTime',
    LOCALE = 'locale',
    MEETING = 'meeting',
    NAME = 'name',
    NAV = 'nav',
    NAV_NODE = 'navNode',
    NAVIGATION_DATE_FORMATTER = 'navigationDateFormatter',
    NEXT = 'next',
    NEXT_DATE = 'nextDate',
    NODE = 'node',
    NOSCROLL = 'noscroll',
    PALETTE = 'palette',
    PAST = 'past',
    PREV = 'prev',
    PREV_DATE = 'prevDate',
    REMINDER = 'reminder',
    RENDERED = 'rendered',
    REPEATED = 'repeated',
    SCHEDULER = 'scheduler',
    SCHEDULER_EVENT = 'scheduler-event',
    SCROLLABLE = 'scrollable',
    SHORT = 'short',
    START_DATE = 'startDate',
    STRINGS = 'strings',
    TITLE = 'title',
    TITLE_DATE_FORMAT = 'titleDateFormat',
    TODAY = 'today',
    TODAY_DATE = 'todayDate',
    TODAY_NODE = 'todayNode',
    TRIGGER_NODE = 'triggerNode',
    VIEW = 'view',
    VIEW_DATE_NODE = 'viewDateNode',
    VIEW_STACK = 'viewStack',
    VIEWS = 'views',
    VIEWS_NODE = 'viewsNode',
    VISIBLE = 'visible',
    RIGHT = 'right',
    ACTIVE = 'active',
    CHEVRON = 'chevron',
    BTN = 'btn',
    LEFT = 'left',

    getCN = A.getClassName,

    CSS_ICON = getCN(ICON),
    CSS_SCHEDULER_CONTROLS = getCN(SCHEDULER_BASE, CONTROLS),

    CSS_SCHEDULER_HD = getCN(SCHEDULER_BASE, HD),
    CSS_SCHEDULER_ICON_NEXT = getCN(SCHEDULER_BASE, ICON, NEXT),
    CSS_SCHEDULER_ICON_PREV = getCN(SCHEDULER_BASE, ICON, PREV),
    CSS_SCHEDULER_NAV = getCN(SCHEDULER_BASE, NAV),
    CSS_SCHEDULER_TODAY = getCN(SCHEDULER_BASE, TODAY),
    CSS_SCHEDULER_VIEW = getCN(SCHEDULER_BASE, VIEW),
    CSS_SCHEDULER_VIEW_ = getCN(SCHEDULER_BASE, VIEW, _EMPTY_STR),
    CSS_SCHEDULER_VIEW_DATE = getCN(SCHEDULER_BASE, VIEW, DATE),
    CSS_SCHEDULER_VIEW_NOSCROLL = getCN(SCHEDULER_VIEW, NOSCROLL),
    CSS_SCHEDULER_VIEW_SCROLLABLE = getCN(SCHEDULER_VIEW, SCROLLABLE),
    CSS_SCHEDULER_VIEW_SELECTED = getCN(ACTIVE),
    CSS_BTN = getCN(BTN),
    CSS_ICON_CHEVRON_RIGHT = getCN(ICON, CHEVRON, RIGHT),
    CSS_ICON_CHEVRON_LEFT = getCN(ICON, CHEVRON, LEFT),
    CSS_SCHEDULER_VIEWS = getCN(SCHEDULER_BASE, VIEWS),

    CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
    CSS_SCHEDULER_EVENT_ALL_DAY = getCN(SCHEDULER_EVENT, ALL, DAY),
    CSS_SCHEDULER_EVENT_CONTENT = getCN(SCHEDULER_EVENT, CONTENT),
    CSS_SCHEDULER_EVENT_DISABLED = getCN(SCHEDULER_EVENT, DISABLED),
    CSS_SCHEDULER_EVENT_HIDDEN = getCN(SCHEDULER_EVENT, HIDDEN),
    CSS_SCHEDULER_EVENT_ICON_DISABLED = getCN(SCHEDULER_EVENT, ICON, DISABLED),
    CSS_SCHEDULER_EVENT_ICON_MEETING = getCN(SCHEDULER_EVENT, ICON, MEETING),
    CSS_SCHEDULER_EVENT_ICON_REMINDER = getCN(SCHEDULER_EVENT, ICON, REMINDER),
    CSS_SCHEDULER_EVENT_ICON_REPEATED = getCN(SCHEDULER_EVENT, ICON, REPEATED),
    CSS_SCHEDULER_EVENT_ICONS = getCN(SCHEDULER_EVENT, ICONS),
    CSS_SCHEDULER_EVENT_MEETING = getCN(SCHEDULER_EVENT, MEETING),
    CSS_SCHEDULER_EVENT_PAST = getCN(SCHEDULER_EVENT, PAST),
    CSS_SCHEDULER_EVENT_REMINDER = getCN(SCHEDULER_EVENT, REMINDER),
    CSS_SCHEDULER_EVENT_REPEATED = getCN(SCHEDULER_EVENT, REPEATED),
    CSS_SCHEDULER_EVENT_SHORT = getCN(SCHEDULER_EVENT, SHORT),
    CSS_SCHEDULER_EVENT_TITLE = getCN(SCHEDULER_EVENT, TITLE),

    TPL_HTML_OPEN_SPAN = '<span>',
    TPL_HTML_CLOSE_SPAN = '</span>',
    TPL_SCHEDULER_CONTROLS = '<div class="span7 ' + CSS_SCHEDULER_CONTROLS + '"></div>',
    TPL_SCHEDULER_HD = '<div class="row-fluid ' + CSS_SCHEDULER_HD + '"></div>',
    TPL_SCHEDULER_ICON_NEXT = '<button type="button" class="' + [CSS_SCHEDULER_ICON_NEXT, CSS_BTN].join(_SPACE) +
        '"><i class="' + CSS_ICON_CHEVRON_RIGHT + '"></i></button>',
    TPL_SCHEDULER_ICON_PREV = '<button type="button" class="' + [CSS_SCHEDULER_ICON_PREV, CSS_BTN].join(_SPACE) +
        '"><i class="' + CSS_ICON_CHEVRON_LEFT + '"></i></button>',
    TPL_SCHEDULER_NAV = '<div class="btn-group"></div>',
    TPL_SCHEDULER_TODAY = '<button type="button" class="' + [CSS_SCHEDULER_TODAY, CSS_BTN].join(_SPACE) +
        '">{today}</button>',
    TPL_SCHEDULER_VIEW = '<button type="button" class="' + [CSS_SCHEDULER_VIEW, CSS_SCHEDULER_VIEW_].join(_SPACE) +
        '{name}" data-view-name="{name}">{label}</button>',
    TPL_SCHEDULER_VIEW_DATE = '<span class="' + CSS_SCHEDULER_VIEW_DATE + '"></span>',
    TPL_SCHEDULER_VIEWS = '<div class="span5 ' + CSS_SCHEDULER_VIEWS + '"></div>';

/**
 * A base class for `SchedulerEvent`.
 *
 * @class A.SchedulerEvent
 * @extends A.Model
 * @param {Object} config Object literal specifying widget configuration properties.
 * @constructor
 */
var SchedulerEvent = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type {String}
     * @static
     */
    NAME: SCHEDULER_EVENT,

    /**
     * Static property used to define the default attribute
     * configuration for the `SchedulerEvent`.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * Determines whether a new event will take place all day. When enabled,
         * the event will not contain 24-hour clock date inputs.
         *
         * @attribute allDay
         * @default false
         * @type {Boolean}
         */
        allDay: {
            setter: A.DataType.Boolean.parse,
            value: false
        },

        /**
         * Contains the content of Scheduler event's body section.
         *
         * @attribute content
         */
        content: {
            setter: String,
            validator: isValue
        },

        /**
         * Contains the `color` of a calendar event.
         *
         * @attribute color
         * @default '#D96666'
         * @type {String}
         */
        color: {
            lazyAdd: false,
            value: '#376cd9',
            validator: isString
        },

        /**
         * Contains the color brightness factor is applied to the `color`
         * attribute.
         *
         * @attribute colorBrightnessFactor
         * @default 1.4
         * @type {Number}
         */
        colorBrightnessFactor: {
            value: 1.4,
            validator: isNumber
        },

        /**
         * Contains the color saturation factor is applied to the `color`
         * attribute.
         *
         * @attribute colorSaturationFactor
         * @default 0.88
         * @type {Number}
         */
        colorSaturationFactor: {
            value: 0.88,
            validator: isNumber
        },

        /**
         * Contains the formatted title date for this scheduler event, taking
         * into account ISO time. The value will not contain an `endDate` if
         * this event is `allDay`.
         *
         * @attribute titleDateFormat
         * @type {Object}
         */
        titleDateFormat: {
            getter: '_getTitleDateFormat',
            value: function() {
                var instance = this,
                    scheduler = instance.get(SCHEDULER),
                    isoTime = scheduler && scheduler.get(ACTIVE_VIEW).get(ISO_TIME),

                    format = {
                        endDate: TPL_HTML_OPEN_SPAN + _N_DASH + _SPACE + TITLE_DT_FORMAT_ISO + TPL_HTML_CLOSE_SPAN,
                        startDate: TITLE_DT_FORMAT_ISO
                    };

                if (!isoTime) {
                    format.endDate = TPL_HTML_OPEN_SPAN + _N_DASH + _SPACE + getUSDateFormat(instance.get(END_DATE)) +
                        TPL_HTML_CLOSE_SPAN;
                    format.startDate = getUSDateFormat(instance.get(START_DATE));
                }

                if (instance.getMinutesDuration() <= 30) {
                    delete format.endDate;
                }
                else if (instance.get(ALL_DAY)) {
                    format = {};
                }

                return format;
            }
        },

        /**
         * Contains the date corresponding to the current ending date of a
         * scheduled event. By default, the value is one hour after the
         * `startDate`.
         *
         * @attribute endDate
         * @type {Date}
         * @default Today's date as set on the user's computer.
         */
        endDate: {
            setter: '_setDate',
            valueFn: function() {
                var date = DateMath.clone(this.get(START_DATE));

                date.setHours(date.getHours() + 1);

                return date;
            }
        },

        /**
         * Determines if the event is disabled.
         *
         * @attribute disabled
         * @default false
         * @type {Boolean}
         */
        disabled: {
            value: false,
            validator: isBoolean
        },

        /**
         * Determines if the event is a meeting.
         *
         * @attribute meeting
         * @default false
         * @type {Boolean}
         */
        meeting: {
            value: false,
            validator: isBoolean
        },

        /**
         * Contains the event `NodeList`.
         *
         * @attribute node
         */
        node: {
            valueFn: function() {
                return A.NodeList.create(A.Node.create(this.EVENT_NODE_TEMPLATE).setData(SCHEDULER_EVENT, this));
            }
        },

        /**
         * Determines if the event is requires reminder.
         *
         * @attribute reminder
         * @default false
         * @type {Boolean}
         */
        reminder: {
            value: false,
            validator: isBoolean
        },

        /**
         * Determines if the event is to be repeated.
         *
         * @attribute repeated
         * @default false
         * @type {Boolean}
         */
        repeated: {
            value: false,
            validator: isBoolean
        },

        /**
         * Contains this `SchedulerEvent`'s `SchedulerBase' object.
         *
         * @attribute scheduler
         * @type {A.SchedulerBase}
         */
        scheduler: {},

        /**
         * Contains the date corresponding to the current starting date of a
         * scheduled event. By default, the value is the date set on the user's
         * computer.
         *
         * @attribute startDate
         * @type {Date}
         */
        startDate: {
            setter: '_setDate',
            valueFn: function() {
                return new Date();
            }
        },

        /**
         * Indicates whether the event is visible.
         *
         * @attribute visible
         * @default true
         * @type {Boolean}
         */
        visible: {
            value: true,
            validator: isBoolean
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type {Object}
     * @static
     */
    EXTENDS: A.Model,

    /**
     * Defines the propegate attribute keys for `Scheduler` events.
     *
     * @property PROPAGATE_ATTRS
     * @type {Array}
     * @static
     */
    PROPAGATE_ATTRS: [ALL_DAY, START_DATE, END_DATE, CONTENT, COLOR, COLOR_BRIGHTNESS_FACTOR,
        COLOR_SATURATION_FACTOR, TITLE_DATE_FORMAT, VISIBLE, DISABLED],

    prototype: {
        EVENT_NODE_TEMPLATE: '<div class="' + CSS_SCHEDULER_EVENT + '">' + '<div class="' + CSS_SCHEDULER_EVENT_TITLE + '"></div>' + '<div class="' + CSS_SCHEDULER_EVENT_CONTENT + '"></div>' + '<div class="' + CSS_SCHEDULER_EVENT_ICONS + '">' + '<span class="' + [
            CSS_ICON, CSS_SCHEDULER_EVENT_ICON_DISABLED].join(_SPACE) + '"></span>' + '<span class="' + [CSS_ICON,
            CSS_SCHEDULER_EVENT_ICON_MEETING].join(_SPACE) + '"></span>' + '<span class="' + [CSS_ICON,
            CSS_SCHEDULER_EVENT_ICON_REMINDER].join(_SPACE) + '"></span>' + '<span class="' + [CSS_ICON,
            CSS_SCHEDULER_EVENT_ICON_REPEATED].join(_SPACE) + '"></span>' + '</div>' + '</div>',

        /**
         * Construction logic executed during `SchedulerEvent` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.bindUI();
            instance.syncUI();
        },

        /**
         * Binds the events on the `SchedulerEvent` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance.after({
                allDayChange: instance._afterAllDayChange,
                colorChange: instance._afterColorChange,
                disabledChange: instance._afterDisabledChange,
                endDateChange: instance._afterEndDateChange,
                meetingChange: instance._afterMeetingChange,
                reminderChange: instance._afterReminderChange,
                repeatedChange: instance._afterRepeatedChange,
                visibleChange: instance._afterVisibleChange
            });
        },

        /**
         * Syncs the `SchedulerEvent` UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;

            instance._uiSetAllDay(
                instance.get(ALL_DAY));

            instance._uiSetColor(
                instance.get(COLOR));

            instance._uiSetDisabled(
                instance.get(DISABLED));

            instance._uiSetEndDate(
                instance.get(END_DATE));

            instance._uiSetMeeting(
                instance.get(MEETING));

            instance._uiSetPast(
                instance._isPastEvent());

            instance._uiSetReminder(
                instance.get(REMINDER));

            instance._uiSetRepeated(
                instance.get(REPEATED));

            instance._uiSetVisible(
                instance.get(VISIBLE));

            instance.syncNodeTitleUI();
            instance.syncNodeContentUI();
        },

        /**
         * Removes the `node` from DOM.
         *
         * @method destroy
         * @protected
         */
        destroy: function() {
            var instance = this;

            instance.get(NODE).remove(true);
        },

        /**
         * Sometimes an event will require a padding node that mimics the
         * behavior of the scheduler `event`'s `node`. This can occur in the
         * week view when an event spans multiple days.

         * For example, an event beginning at 10pm on January 1 and ending on
         * 3am January 2nd would require a padding node. The `event`'s `node`
         * appears from January 1 from 10:00pm to 11:59pm and the `paddingNode`
         * is rendered on the table from January 2 from 12:00am to 3:00am.
         *
         * @method addPaddingNode
         */
        addPaddingNode: function() {
            var instance = this;

            instance.get(NODE).push(A.Node.create(instance.EVENT_NODE_TEMPLATE).setData(SCHEDULER_EVENT, instance));

            instance.syncUI();
        },

        /**
         * Clones the scheduler `event`.
         *
         * @method clone
         * @return {Object} Scheduler's event model
         */
        clone: function() {
            var instance = this,
                cloned = null,
                scheduler = instance.get(SCHEDULER);

            if (scheduler) {
                cloned = new scheduler.eventModel();
                cloned.copyPropagateAttrValues(instance, null, {
                    silent: true
                });
            }

            return cloned;
        },

        /**
         * Copies the dates from the `event` parameter to the instance `event`.
         *
         * @method copyDates
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @param {Object} options Zero or more options.
         */
        copyDates: function(evt, options) {
            var instance = this;

            instance.setAttrs({
                    endDate: DateMath.clone(evt.get(END_DATE)),
                    startDate: DateMath.clone(evt.get(START_DATE))
                },
                options);
        },

        /**
         * Copies the propagate attribute vales from an `event` to this `event`.
         *
         * @method copyPropagateAttrValues
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @param {Boolean} dontCopyMap
         * @param {Object} options Zero or more options.
         */
        copyPropagateAttrValues: function(evt, dontCopyMap, options) {
            var instance = this,
                attrMap = {};

            instance.copyDates(evt, options);

            A.Array.each(instance.constructor.PROPAGATE_ATTRS, function(attrName) {
                if (!((dontCopyMap || {}).hasOwnProperty(attrName))) {
                    var value = evt.get(attrName);

                    if (!isObject(value)) {
                        attrMap[attrName] = value;
                    }
                }
            });

            instance.setAttrs(attrMap, options);
        },

        /**
         * Gets the number of days an `event` is scheduled to take place.
         *
         * @method getDaysDuration
         * @return {Number}
         */
        getDaysDuration: function() {
            var instance = this;

            return DateMath.getDayOffset(
                instance.get(END_DATE), instance.get(START_DATE));
        },

        /**
         * Gets the number of hours an `event` is scheduled to take place.
         *
         * @method getHoursDuration
         * @return {Number}
         */
        getHoursDuration: function() {
            var instance = this;

            return DateMath.getHoursOffset(
                instance.get(END_DATE), instance.get(START_DATE));
        },

        /**
         * Gets the number of minutes an `event` is scheduled to take place.
         *
         * @method getMinutesDuration
         * @return {Number}
         */
        getMinutesDuration: function() {
            var instance = this;

            return DateMath.getMinutesOffset(
                instance.get(END_DATE), instance.get(START_DATE));
        },

        /**
         * Gets the number of seconds an `event` is scheduled to take place.
         *
         * @method getSecondsDuration
         * @return {Number}
         */
        getSecondsDuration: function() {
            var instance = this;

            return DateMath.getSecondsOffset(
                instance.get(END_DATE), instance.get(START_DATE));
        },

        /**
         * Determines if an `event`'s end date is this same as this `event`.
         *
         * @method sameEndDate
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @return {Boolean}
         */
        sameEndDate: function(evt) {
            var instance = this;

            return DateMath.compare(instance.get(END_DATE), evt.get(END_DATE));
        },

        /**
         * Determines if an `event`'s start date is this same as this `event`.
         *
         * @method sameStartDate
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @return {Boolean}
         */
        sameStartDate: function(evt) {
            var instance = this;

            return DateMath.compare(
                instance.get(START_DATE), evt.get(START_DATE));
        },

        /**
         * Determines if an `event` is after this `event`.
         *
         * @method isAfter
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @return {Boolean}
         */
        isAfter: function(evt) {
            var instance = this;
            var startDate = instance.get(START_DATE);
            var evtStartDate = evt.get(START_DATE);

            return DateMath.after(startDate, evtStartDate);
        },

        /**
         * Determines if an `event` is before this `event`.
         *
         * @method isBefore
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @return {Boolean}
         */
        isBefore: function(evt) {
            var instance = this;
            var startDate = instance.get(START_DATE);
            var evtStartDate = evt.get(START_DATE);

            return DateMath.before(startDate, evtStartDate);
        },

        /**
         * Determines if an `event` interescts with this `event`.
         *
         * @method intersects
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @return {Boolean}
         */
        intersects: function(evt) {
            var instance = this;
            var endDate = instance.get(END_DATE);
            var startDate = instance.get(START_DATE);
            var evtStartDate = evt.get(START_DATE);

            return (instance.sameStartDate(evt) ||
                DateMath.between(evtStartDate, startDate, endDate));
        },

        /**
         * Determines if an `event`'s hours' interescts with this `event`'s
         * hours.
         *
         * @method intersectHours
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @return {Boolean}
         */
        intersectHours: function(evt) {
            var instance = this;
            var endDate = instance.get(END_DATE);
            var startDate = instance.get(START_DATE);
            var evtModifiedStartDate = DateMath.clone(startDate);

            DateMath.copyHours(evtModifiedStartDate, evt.get(START_DATE));

            return (DateMath.compare(startDate, evtModifiedStartDate) ||
                DateMath.between(evtModifiedStartDate, startDate, endDate));
        },

        /**
         * Determines if a this `event` starts or ends at the beginning or end
         * of a day.
         *
         * @method isDayBoundaryEvent
         * @return {Boolean}
         */
        isDayBoundaryEvent: function() {
            var instance = this;

            return DateMath.isDayBoundary(
                instance.get(START_DATE), instance.get(END_DATE));
        },

        /**
         * Checks if the passed date is between `startDate` and `endDate`.
         *
         * @method isDayOverlapEvent
         * @return {Boolean}
         */
        isDayOverlapEvent: function() {
            var instance = this;

            return DateMath.isDayOverlap(
                instance.get(START_DATE), instance.get(END_DATE));
        },

        /**
         * Clears the time fields from the `endDate`, effectively setting the
         * time to 12 noon.
         *
         * @method getClearEndDate
         * @return {Date}
         */
        getClearEndDate: function() {
            var instance = this;

            return DateMath.safeClearTime(instance.get(END_DATE));
        },

        /**
         * Clears the time fields from the `startDate`, effectively setting the
         * time to 12 noon.
         *
         * @method getClearStartDate
         * @return {Date}
         */
        getClearStartDate: function() {
            var instance = this;

            return DateMath.safeClearTime(instance.get(START_DATE));
        },

        /**
         * Moves this Scheduler event to a new date specified by the date
         * parameter.
         *
         * @method move
         * @param {Date} date
         * @param {Object} options Zero or more options.
         */
        move: function(date, options) {
            var instance = this;
            var duration = instance.getMinutesDuration();

            instance.setAttrs({
                    endDate: DateMath.add(DateMath.clone(date), DateMath.MINUTES, duration),
                    startDate: date
                },
                options);
        },

        /**
         * Replaces each node's current content with the `content`.
         *
         * @method setContent
         * @param content
         */
        setContent: function(content) {
            var instance = this;

            instance.get(NODE).each(function(node) {
                var contentNode = node.one(_DOT + CSS_SCHEDULER_EVENT_CONTENT);

                contentNode.setContent(content);
            });
        },

        /**
         * Replaces each node's current title with the `content`.
         *
         * @method setTitle
         * @param content
         */
        setTitle: function(content) {
            var instance = this;

            instance.get(NODE).each(function(node) {
                var titleNode = node.one(_DOT + CSS_SCHEDULER_EVENT_TITLE);

                titleNode.setContent(content);
            });
        },

        /**
         * Sets the content of the Scheduler event to the content attribute
         * value.
         *
         * @method syncNodeContentUI
         */
        syncNodeContentUI: function() {
            var instance = this;

            instance.setContent(instance.get(CONTENT));
        },

        /**
         * Sets the title of the Scheduler event to the a formated date.
         * @method syncNodeTitleUI
         */
        syncNodeTitleUI: function() {
            var instance = this,
                format = instance.get(TITLE_DATE_FORMAT),
                startDate = instance.get(START_DATE),
                endDate = instance.get(END_DATE),
                title = [];

            if (format.startDate) {
                title.push(instance._formatDate(startDate, format.startDate));
            }

            if (format.endDate) {
                title.push(instance._formatDate(endDate, format.endDate));
            }

            instance.setTitle(title.join(_EMPTY_STR));
        },

        /**
         * Splits an event into multiple days. Since an event can span across
         * multiple days in the week view, this event will be split into chunks
         * for each day column.
         *
         * @method split
         * @return {Array}
         */
        split: function() {
            var instance = this,
                s1 = DateMath.clone(instance.get(START_DATE)),
                e1 = DateMath.clone(instance.get(END_DATE));

            if (instance.isDayOverlapEvent() && !instance.isDayBoundaryEvent()) {
                var s2 = DateMath.clone(s1);
                s2.setHours(24, 0, 0, 0);

                return [[s1, DateMath.toMidnight(DateMath.clone(s1))], [s2, DateMath.clone(e1)]];
            }

            return [[s1, e1]];
        },

        /**
         * Handles `allDay` events.
         *
         * @method _afterAllDayChange
         * @param {EventFacade} event
         * @protected
         */
        _afterAllDayChange: function(event) {
            var instance = this;

            instance._uiSetAllDay(event.newVal);
        },

        /**
         * Handles `color` events.
         *
         * @method _afterColorChange
         * @param {EventFacade} event
         * @protected
         */
        _afterColorChange: function(event) {
            var instance = this;

            instance._uiSetColor(event.newVal);
        },

        /**
         * Handles `disabled` events.
         *
         * @method _afterDisabledChange
         * @param {EventFacade} event
         * @protected
         */
        _afterDisabledChange: function(event) {
            var instance = this;

            instance._uiSetDisabled(event.newVal);
        },

        /**
         * Handles `endDate` events.
         *
         * @method _afterEndDateChange
         * @param {EventFacade} event
         * @protected
         */
        _afterEndDateChange: function(event) {
            var instance = this;

            instance._uiSetEndDate(event.newVal);
        },

        /**
         * Handles `meeting` events.
         *
         * @method _afterMeetingChange
         * @param {EventFacade} event
         * @protected
         */
        _afterMeetingChange: function(event) {
            var instance = this;

            instance._uiSetMeeting(event.newVal);
        },

        /**
         * Handles `reminder` events.
         *
         * @method _afterReminderChange
         * @param {EventFacade} event
         * @protected
         */
        _afterReminderChange: function(event) {
            var instance = this;

            instance._uiSetReminder(event.newVal);
        },

        /**
         * Handles `repeated` events.
         *
         * @method _afterRepeatedChange
         * @param {EventFacade} event
         * @protected
         */
        _afterRepeatedChange: function(event) {
            var instance = this;

            instance._uiSetRepeated(event.newVal);
        },

        /**
         * Handles `visible` events.
         *
         * @method _afterVisibleChange
         * @param {EventFacade} event
         * @protected
         */
        _afterVisibleChange: function(event) {
            var instance = this;

            instance._uiSetVisible(event.newVal);
        },

        /**
         * Returns `true` if the event ends before the current date.
         *
         * @method _isPastEvent
         * @protected
         * @return {Boolean}
         */
        _isPastEvent: function() {
            var instance = this,
                endDate = instance.get(END_DATE);

            return (endDate.getTime() < (new Date()).getTime());
        },

        /**
         * Sets the date to the given value.
         *
         * @method _setDate
         * @param {Date | Number} val The value of the property.
         * @protected
         */
        _setDate: function(val) {
            var instance = this;

            if (isNumber(val)) {
                val = new Date(val);
            }

            return val;
        },

        /**
         * Formats the given date with the given format.
         *
         * @method _formatDate
         * @param {Date} date
         * @param format
         * @protected
         */
        _formatDate: function(date, format) {
            var instance = this;
            var locale = instance.get(LOCALE);

            return A.DataType.Date.format(date, {
                format: format,
                locale: locale
            });
        },

        /**
         * Returns the format for the title date.
         *
         * @method _getTitleDateFormat
         * @param {String|Function} val
         * @return {Object|Function}
         * @protected
         */
        _getTitleDateFormat: function(val) {
            var instance = this;

            if (isString(val)) {
                val = {
                    endDate: val,
                    startDate: val
                };
            }
            else if (isFunction(val)) {
                val = val.call(instance);
            }

            return val;
        },

        /**
         * Sets `allDay` on the UI.
         *
         * @method _uiSetAllDay
         * @param {Boolean} val The value of the property.
         * @protected
         */
        _uiSetAllDay: function(val) {
            var instance = this;

            instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_ALL_DAY, !! val);
        },

        /**
         * Sets `color` on the UI.
         *
         * @method _uiSetColor
         * @param {String} val The value of the property.
         * @protected
         */
        _uiSetColor: function(val) {
            var instance = this;
            var node = instance.get(NODE);

            var color = Color.toHSL(val);
            var backgroundColor = Color.toArray(color);

            backgroundColor[1] *= instance.get(COLOR_SATURATION_FACTOR);
            backgroundColor[2] *= instance.get(COLOR_BRIGHTNESS_FACTOR);
            backgroundColor = Color.fromArray(backgroundColor, Color.TYPES.HSL);

            // Some browsers doesn't support HSL colors, convert to RGB for
            // compatibility.
            color = Color.toRGB(color);
            backgroundColor = Color.toRGB(backgroundColor);

            if (node) {
                node.setStyles({
                    backgroundColor: backgroundColor,
                    color: color
                });
            }
        },

        /**
         * Sets `disabled` on the UI.
         *
         * @method _uiSetDisabled
         * @param {Boolean} val The value of the property.
         * @protected
         */
        _uiSetDisabled: function(val) {
            var instance = this;

            instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_DISABLED, !! val);
        },

        /**
         * Sets `endDate` on the UI.
         *
         * @method _uiSetEndDate
         * @protected
         */
        _uiSetEndDate: function() {
            var instance = this;

            instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_SHORT, instance.getMinutesDuration() <= 30);
        },

        /**
         * Sets `meeting` on the UI.
         *
         * @method _uiSetMeeting
         * @param {Boolean} val The value of the property.
         * @protected
         */
        _uiSetMeeting: function(val) {
            var instance = this;

            instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_MEETING, !! val);
        },

        /**
         * Sets `past` on the UI.
         *
         * @method _uiSetPast
         * @param {Boolean} val The value of the property.
         * @protected
         */
        _uiSetPast: function(val) {
            var instance = this;

            instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_PAST, !! val);
        },

        /**
         * Sets `reminder` on the UI.
         *
         * @method _uiSetReminder
         * @param {Boolean} val The value of the property.
         * @protected
         */
        _uiSetReminder: function(val) {
            var instance = this;

            instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_REMINDER, !! val);
        },

        /**
         * Sets `repeated` on the UI.
         *
         * @method _uiSetRepeated
         * @param {Boolean} val The value of the property.
         * @protected
         */
        _uiSetRepeated: function(val) {
            var instance = this;

            instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_REPEATED, !! val);
        },

        /**
         * Sets `visible` on the UI.
         *
         * @method _uiSetVisible
         * @param {Boolean} val The value of the property.
         * @protected
         */
        _uiSetVisible: function(val) {
            var instance = this;

            instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_HIDDEN, !val);
        }
    }
});

A.SchedulerEvent = SchedulerEvent;
