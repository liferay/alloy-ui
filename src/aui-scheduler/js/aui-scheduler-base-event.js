/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-base-event
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isFunction = Lang.isFunction,
    isNumber = Lang.isNumber,
    isObject = Lang.isObject,
    isString = Lang.isString,
    isValue = Lang.isValue,

    Color = A.Color,
    DateMath = A.DataType.DateMath,

    getUSDateFormat = function(date) {
        var format = ['%l'];

        if (date.getMinutes() > 0) {
            format.push(':');
            format.push('%M');
        }

        if (date.getHours() >= 12) {
            format.push('pm');
        }

        return format.join('');
    },

    getCN = A.getClassName,

    CSS_ICON = getCN('icon'),
    CSS_SCHEDULER_EVENT = getCN('scheduler-event'),
    CSS_SCHEDULER_EVENT_ALL_DAY = getCN('scheduler-event', 'all', 'day'),
    CSS_SCHEDULER_EVENT_CONTENT = getCN('scheduler-event', 'content'),
    CSS_SCHEDULER_EVENT_DISABLED = getCN('scheduler-event', 'disabled'),
    CSS_SCHEDULER_EVENT_HIDDEN = getCN('scheduler-event', 'hidden'),
    CSS_SCHEDULER_EVENT_ICON_DISABLED = getCN('scheduler-event', 'icon', 'disabled'),
    CSS_SCHEDULER_EVENT_ICON_MEETING = getCN('scheduler-event', 'icon', 'meeting'),
    CSS_SCHEDULER_EVENT_ICON_REMINDER = getCN('scheduler-event', 'icon', 'reminder'),
    CSS_SCHEDULER_EVENT_ICON_REPEATED = getCN('scheduler-event', 'icon', 'repeated'),
    CSS_SCHEDULER_EVENT_ICONS = getCN('scheduler-event', 'icons'),
    CSS_SCHEDULER_EVENT_MEETING = getCN('scheduler-event', 'meeting'),
    CSS_SCHEDULER_EVENT_PAST = getCN('scheduler-event', 'past'),
    CSS_SCHEDULER_EVENT_REMINDER = getCN('scheduler-event', 'reminder'),
    CSS_SCHEDULER_EVENT_REPEATED = getCN('scheduler-event', 'repeated'),
    CSS_SCHEDULER_EVENT_SHORT = getCN('scheduler-event', 'short'),
    CSS_SCHEDULER_EVENT_TITLE = getCN('scheduler-event', 'title'),

    TPL_HTML_OPEN_SPAN = '<span>',
    TPL_HTML_CLOSE_SPAN = '</span>';

/**
 * A base class for `SchedulerEvent`.
 *
 * @class A.SchedulerEvent
 * @extends Model
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
    NAME: 'scheduler-event',

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
         * Determines the CSS border color of a calendar event.
         *
         * @attribute borderColor
         * @default '#FFFFFF'
         * @type String
         */
        borderColor: {
            value: '#FFFFFF',
            validator: isString
        },

        /**
         * Determines the CSS border style of a calendar event.
         *
         * @attribute borderStyle
         * @default 'solid'
         * @type String
         */
        borderStyle: {
            value: 'solid',
            validator: isString
        },

        /**
         * Determines the CSS border width of a calendar event.
         *
         * @attribute borderWidth
         * @default '2px'
         * @type String
         */
        borderWidth: {
            value: '2px',
            validator: isString
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
                    scheduler = instance.get('scheduler'),
                    isoTime = scheduler && scheduler.get('activeView').get('isoTime'),

                    format = {
                        endDate: TPL_HTML_OPEN_SPAN + '&ndash;' + ' ' + '%H:%M' + TPL_HTML_CLOSE_SPAN,
                        startDate: '%H:%M'
                    };

                if (!isoTime) {
                    format.endDate = TPL_HTML_OPEN_SPAN + '&ndash;' + ' ' + getUSDateFormat(instance.get('endDate')) +
                        TPL_HTML_CLOSE_SPAN;
                    format.startDate = getUSDateFormat(instance.get('startDate'));
                }

                if (instance.getMinutesDuration() <= 30) {
                    delete format.endDate;
                }
                else if (instance.get('allDay')) {
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
                var date = DateMath.clone(this.get('startDate'));

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
                return A.NodeList.create(A.Node.create(this.EVENT_NODE_TEMPLATE).setData('scheduler-event', this));
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
    PROPAGATE_ATTRS: ['allDay', 'startDate', 'endDate', 'content', 'color', 'colorBrightnessFactor',
        'colorSaturationFactor', 'titleDateFormat', 'visible', 'disabled'],

    prototype: {
        EVENT_NODE_TEMPLATE: '<div class="' + CSS_SCHEDULER_EVENT + '" tabindex="0">' + '<div class="' +
            CSS_SCHEDULER_EVENT_TITLE +
            '"></div>' + '<div class="' + CSS_SCHEDULER_EVENT_CONTENT + '"></div>' +
            '<div class="' + CSS_SCHEDULER_EVENT_ICONS + '">' + '<span class="' + [
            CSS_ICON, CSS_SCHEDULER_EVENT_ICON_DISABLED].join(' ') + '"></span>' + '<span class="' + [CSS_ICON,
            CSS_SCHEDULER_EVENT_ICON_MEETING].join(' ') + '"></span>' + '<span class="' + [CSS_ICON,
            CSS_SCHEDULER_EVENT_ICON_REMINDER].join(' ') + '"></span>' + '<span class="' + [CSS_ICON,
            CSS_SCHEDULER_EVENT_ICON_REPEATED].join(' ') + '"></span>' + '</div>' + '</div>',

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
                instance.get('allDay'));

            instance._uiSetColor(
                instance.get('color'));

            instance._uiSetDisabled(
                instance.get('disabled'));

            instance._uiSetEndDate(
                instance.get('endDate'));

            instance._uiSetMeeting(
                instance.get('meeting'));

            instance._uiSetPast(
                instance._isPastEvent());

            instance._uiSetReminder(
                instance.get('reminder'));

            instance._uiSetRepeated(
                instance.get('repeated'));

            instance._uiSetVisible(
                instance.get('visible'));

            instance.syncNodeTitleUI();
            instance.syncNodeContentUI();
        },

        /**
         * Destructor lifecycle implementation for the `SchedulerEvent` class.
         * Removes the `node` from DOM.
         *
         * @method destroy
         * @protected
         */
        destroy: function() {
            var instance = this;

            instance.get('node').remove(true);
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

            instance.get('node').push(
                A.Node.create(instance.EVENT_NODE_TEMPLATE).setData('scheduler-event', instance));

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
                scheduler = instance.get('scheduler');

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
                    endDate: DateMath.clone(evt.get('endDate')),
                    startDate: DateMath.clone(evt.get('startDate'))
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
                instance.get('endDate'), instance.get('startDate'));
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
                instance.get('endDate'), instance.get('startDate'));
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
                instance.get('endDate'), instance.get('startDate'));
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
                instance.get('endDate'), instance.get('startDate'));
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

            return DateMath.compare(instance.get('endDate'), evt.get('endDate'));
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
                instance.get('startDate'), evt.get('startDate'));
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
            var startDate = instance.get('startDate');
            var evtStartDate = evt.get('startDate');

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
            var startDate = instance.get('startDate');
            var evtStartDate = evt.get('startDate');

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
            var endDate = instance.get('endDate');
            var startDate = instance.get('startDate');
            var evtStartDate = evt.get('startDate');

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
            var endDate = instance.get('endDate');
            var startDate = instance.get('startDate');
            var evtModifiedStartDate = DateMath.clone(startDate);

            DateMath.copyHours(evtModifiedStartDate, evt.get('startDate'));

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
                instance.get('startDate'), instance.get('endDate'));
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
                instance.get('startDate'), instance.get('endDate'));
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

            return DateMath.safeClearTime(instance.get('endDate'));
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

            return DateMath.safeClearTime(instance.get('startDate'));
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

            instance.get('node').each(function(node) {
                var contentNode = node.one('.' + CSS_SCHEDULER_EVENT_CONTENT);

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

            instance.get('node').each(function(node) {
                var titleNode = node.one('.' + CSS_SCHEDULER_EVENT_TITLE);

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

            instance.setContent(instance.get('content'));
        },

        /**
         * Sets the title of the Scheduler event to the a formated date.
         * @method syncNodeTitleUI
         */
        syncNodeTitleUI: function() {
            var instance = this,
                format = instance.get('titleDateFormat'),
                startDate = instance.get('startDate'),
                endDate = instance.get('endDate'),
                title = [];

            if (format.startDate) {
                title.push(instance._formatDate(startDate, format.startDate));
            }

            if (format.endDate) {
                title.push(instance._formatDate(endDate, format.endDate));
            }

            instance.setTitle(title.join(''));
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
                s1 = DateMath.clone(instance.get('startDate')),
                e1 = DateMath.clone(instance.get('endDate'));

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
                endDate = instance.get('endDate');

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
            var locale = instance.get('locale');

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

            instance.get('node').toggleClass(CSS_SCHEDULER_EVENT_ALL_DAY, !! val);
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
            var node = instance.get('node');

            var color = Color.toHSL(val);
            var backgroundColor = Color.toArray(color);

            backgroundColor[1] *= instance.get('colorSaturationFactor');
            backgroundColor[2] *= instance.get('colorBrightnessFactor');
            backgroundColor = Color.fromArray(backgroundColor, Color.TYPES.HSL);

            // Some browsers doesn't support HSL colors, convert to RGB for
            // compatibility.
            color = Color.toRGB(color);
            backgroundColor = Color.toRGB(backgroundColor);

            if (node) {
                node.setStyles({
                    backgroundColor: backgroundColor,
                    borderColor: instance.get('borderColor'),
                    borderStyle: instance.get('borderStyle'),
                    borderWidth: instance.get('borderWidth'),
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

            instance.get('node').toggleClass(CSS_SCHEDULER_EVENT_DISABLED, !! val);
        },

        /**
         * Sets `endDate` on the UI.
         *
         * @method _uiSetEndDate
         * @protected
         */
        _uiSetEndDate: function() {
            var instance = this;

            instance.get('node').toggleClass(CSS_SCHEDULER_EVENT_SHORT, instance.getMinutesDuration() <= 30);
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

            instance.get('node').toggleClass(CSS_SCHEDULER_EVENT_MEETING, !! val);
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

            instance.get('node').toggleClass(CSS_SCHEDULER_EVENT_PAST, !! val);
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

            instance.get('node').toggleClass(CSS_SCHEDULER_EVENT_REMINDER, !! val);
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

            instance.get('node').toggleClass(CSS_SCHEDULER_EVENT_REPEATED, !! val);
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

            instance.get('node').toggleClass(CSS_SCHEDULER_EVENT_HIDDEN, !val);
        }
    }
});

A.SchedulerEvent = SchedulerEvent;
