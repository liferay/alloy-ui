/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-view-agenda
 */

var Lang = A.Lang,
    isFunction = Lang.isFunction,

    AArray = A.Array,
    DateMath = A.DataType.DateMath,

    _formatter = function(mask) {
        return function(date) {
            var instance = this;
            var scheduler = instance.get('scheduler');

            return A.DataType.Date.format(
                date, {
                    format: mask,
                    locale: scheduler.get('locale')
                }
            );
        };
    },

    _numericSort = function(arr) {
        return AArray.map(arr, function(v) {
            return +v;
        }).sort(AArray.numericSort);
    },

    getCN = A.getClassName,

    CSS_CONTAINER = getCN('scheduler-view-agenda', 'container'),
    CSS_EVENT = getCN('scheduler-view-agenda', 'event'),
    CSS_EVENT_COLOR = getCN('scheduler-view-agenda', 'event', 'color'),
    CSS_EVENT_CONTENT = getCN('scheduler-view-agenda', 'event', 'content'),
    CSS_EVENT_DATES = getCN('scheduler-view-agenda', 'event', 'dates'),
    CSS_EVENT_FIRST = getCN('scheduler-view-agenda', 'event', 'first'),
    CSS_EVENT_INFO = getCN('scheduler-view-agenda', 'info'),
    CSS_EVENT_INFO_BIGGIE = getCN('scheduler-view-agenda', 'info', 'biggie'),
    CSS_EVENT_INFO_CONTAINER = getCN('scheduler-view-agenda', 'info', 'container'),
    CSS_EVENT_INFO_LABEL = getCN('scheduler-view-agenda', 'info', 'label'),
    CSS_EVENT_INFO_LABEL_BIGGIE = getCN('scheduler-view-agenda', 'info', 'label', 'biggie'),
    CSS_EVENT_INFO_LABEL_SMALL = getCN('scheduler-view-agenda', 'info', 'label', 'small'),
    CSS_EVENT_LAST = getCN('scheduler-view-agenda', 'event', 'last'),
    CSS_EVENT_NO_EVENTS = getCN('scheduler-view-agenda', 'no', 'events'),
    CSS_EVENT_PAST = getCN('scheduler-view-agenda', 'event', 'past'),
    CSS_EVENTS = getCN('scheduler-view-agenda', 'events'),
    CSS_HEADER = getCN('scheduler-view-agenda', 'header'),
    CSS_HEADER_DAY = getCN('scheduler-view-agenda', 'header', 'day'),
    CSS_HEADER_EXTRA = getCN('scheduler-view-agenda', 'header', 'extra'),
    CSS_HEADER_FIRST = getCN('scheduler-view-agenda', 'header', 'first'),
    CSS_HEADER_LAST = getCN('scheduler-view-agenda', 'header', 'last'),
    CSS_CLEARFIX = getCN('clearfix'),

    TPL_CONTAINER = '<div class="' + CSS_CONTAINER + '">{content}</div>',

    TPL_EVENTS_HEADER = '<div class="' + [CSS_HEADER, CSS_CLEARFIX].join(' ') +
        ' {firstClassName} {lastClassName}">' +
        '<div class="' + CSS_HEADER_DAY + '">{day}</div>' +
        '<a href="javascript:;" class="' + CSS_HEADER_EXTRA + '" data-timestamp="{timestamp}">{extra}</a>' +
        '</div>',

    TPL_EVENTS_CONTAINER = '<div class="' + CSS_EVENTS + '">{content}</div>',

    TPL_EVENT = '<div class="' + [CSS_EVENT, CSS_CLEARFIX].join(' ') +
        ' {firstClassName} {lastClassName} {eventClassName}" data-clientId="{clientId}">' +
        '<div class="' + CSS_EVENT_COLOR + '" style="background-color: {color};"></div>' +
        '<div class="' + CSS_EVENT_CONTENT + '">{content}</div>' +
        '<div class="' + CSS_EVENT_DATES + '">{dates}</div>' +
        '</div>',

    TPL_NO_EVENTS = '<div class="' + CSS_EVENT_NO_EVENTS + '">{content}</div>',

    TPL_INFO = '<div class="' + CSS_EVENT_INFO_CONTAINER + '">' +
        '<div class="' + [CSS_EVENT_INFO, CSS_CLEARFIX].join(' ') + '">' +
        '<div class="' + CSS_EVENT_INFO_BIGGIE + '">{day}</div>' +
        '<div class="' + CSS_EVENT_INFO_LABEL + '">' +
        '<div class="' + CSS_EVENT_INFO_LABEL_BIGGIE + '">{labelBig}</div>' +
        '<div class="' + CSS_EVENT_INFO_LABEL_SMALL + '">{labelSmall}</div>' +
        '</div>' +
        '</div>' +
        '</div>';

/**
 * A base class for `SchedulerAgendaView`.
 *
 * @class A.SchedulerAgendaView
 * @extends A.SchedulerView
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var SchedulerAgendaView = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type {String}
     * @static
     */
    NAME: 'scheduler-view-agenda',

    /**
     * Static property used to define the default attribute
     * configuration for the `SchedulerAgendaView`.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * Determines the content of Scheduler view agenda's body section.
         *
         * @attribute bodyContent
         * @default ''
         * @type {String}
         */
        bodyContent: {
            value: ''
        },

        /**
         * Contains the function that formats the events date.
         *
         * @attribute eventsDateFormatter
         * @type {Function}
         */
        eventsDateFormatter: {
            value: function(startDate, endDate) {
                var instance = this,
                    scheduler = instance.get('scheduler'),
                    isoTime = scheduler.get('activeView').get('isoTime'),
                    startDateMask = '%H:%M',
                    endDateMask = '%H:%M',
                    startDateFormatter,
                    endDateFormatter;

                if (!isoTime) {
                    startDateMask = '%l:%M';
                    endDateMask = '%l:%M';

                    if (startDate.getHours() >= 12) {
                        startDateMask += 'pm';
                    }

                    if (endDate.getHours() >= 12) {
                        endDateMask += 'pm';
                    }
                }

                if (DateMath.isDayOverlap(startDate, endDate)) {
                    startDateMask += ', %b %e';
                    endDateMask += ', %b %e';
                }

                startDateFormatter = _formatter.call(instance, startDateMask);
                endDateFormatter = _formatter.call(instance, endDateMask);

                return [
                    startDateFormatter.call(instance, startDate),
                    '&mdash;',
                    endDateFormatter.call(instance, endDate)
                    ].join(' ');
            },
            validator: isFunction
        },

        /**
         * Contains the function that formats the header day date.
         *
         * @attribute headerDayDateFormatter
         * @type {Function}
         */
        headerDayDateFormatter: {
            value: function(date) {
                var instance = this,
                    todayDate = instance.get('scheduler').get('todayDate'),
                    mask,
                    formatter;

                if (!DateMath.isDayOverlap(date, todayDate)) {
                    mask = 'today';
                }
                else {
                    mask = '%A';
                }

                formatter = _formatter.call(instance, mask);

                return formatter.call(instance, date);
            },
            validator: isFunction
        },

        /**
         * Contains the function that formats the header extra date.
         *
         * @attribute headerExtraDateFormatter
         * @type {Function}
         */
        headerExtraDateFormatter: {
            validator: isFunction,
            value: _formatter('%B %e')
        },

        /**
         * Contains the function that formats the info day date.
         *
         * @attribute infoDayDateFormatter
         * @type {Function}
         */
        infoDayDateFormatter: {
            validator: isFunction,
            value: _formatter('%e')
        },

        /**
         * Contains the function that formats the info label date.
         *
         * @attribute infoLabelBigDateFormatter
         * @type {Function}
         */
        infoLabelBigDateFormatter: {
            validator: isFunction,
            value: _formatter('%A')
        },

        /**
         * Contains the function that formats the info label small date.
         *
         * @attribute infoLabelSmallDateFormatter
         * @type {Function}
         */
        infoLabelSmallDateFormatter: {
            validator: isFunction,
            value: _formatter('%B %d, %Y')
        },

        /**
         * Determines the name for this agenda.
         *
         * @attribute name
         * @default 'agenda'
         * @type {String}
         */
        name: {
            value: 'agenda'
        },

        /**
         * Contains the function that formats the navigation date.
         *
         * @attribute navigationDateFormatter
         * @type {Function}
         */
        navigationDateFormatter: {
            value: function() {
                return '';
            },
            validator: isFunction
        },

        /**
         * Contains the collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type {Object}
         */
        strings: {
            value: {
                noEvents: 'No future events.'
            }
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type {Object}
     * @static
     */
    EXTENDS: A.SchedulerView,

    prototype: {

        /**
         * Binds the events on the `SchedulerAgendaView` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this,

                boundingBox = instance.get('boundingBox');

            boundingBox.delegate('click', instance._onSchedulerEventClick, '.' + CSS_EVENT, instance);
            boundingBox.delegate('click', instance._onEventsHeaderClick, '.' + CSS_HEADER_EXTRA, instance);
        },

        /**
         * Returns the date interval in which this view shows events for.
         *
         * @method getDateInterval
         * @return {Object} Object with 2 keys: startDate and endDate. Undefined
         *   keys are interpreted as unlimited sides of the interval.
         */
        getDateInterval: function() {
            var interval = SchedulerAgendaView.superclass.getDateInterval.apply(this);
            delete interval.endDate;
            return interval;
        },

        /**
         * Returns the value of the date that follows the agenda view's current
         * date.
         *
         * @method getNextDate
         * @return {Date}
         */
        getNextDate: function() {
            var instance = this,

                viewDate = instance.get('scheduler').get('viewDate');

            return DateMath.toMidnight(DateMath.add(viewDate, DateMath.DAY, 1));
        },

        /**
         * Returns the value of the date that preceeds the agenda view's current
         * date.
         *
         * @method getPrevDate
         * @return {Date}
         */
        getPrevDate: function() {
            var instance = this,

                viewDate = instance.get('scheduler').get('viewDate');

            return DateMath.toLastHour(DateMath.subtract(viewDate, DateMath.DAY, 1));
        },

        /**
         * Plots all events in the current view.
         *
         * @method plotEvents
         */
        plotEvents: function() {
            var instance = this,

                strings = instance.get('strings'),

                scheduler = instance.get('scheduler'),

                viewDate = scheduler.get('viewDate'),

                eventsDateFormatter = instance.get('eventsDateFormatter'),

                headerDayDateFormatter = instance.get('headerDayDateFormatter'),

                headerExtraDateFormatter = instance.get('headerExtraDateFormatter'),

                infoDayDateFormatter = instance.get('infoDayDateFormatter'),

                infoLabelBigDateFormatter = instance.get('infoLabelBigDateFormatter'),

                infoLabelSmallDateFormatter = instance.get('infoLabelSmallDateFormatter'),

                events = [],

                eventsMap = instance._getDayEventsMap(),

                days = A.Object.keys(eventsMap),

                daysLength = days.length;

            instance.set(
                'headerContent',
                A.Lang.sub(
                    TPL_INFO, {
                        day: infoDayDateFormatter.call(instance, viewDate),
                        labelBig: infoLabelBigDateFormatter.call(instance, viewDate),
                        labelSmall: infoLabelSmallDateFormatter.call(instance, viewDate)
                    }
                )
            );

            if (!A.Object.isEmpty(eventsMap)) {
                AArray.each(
                    _numericSort(days),
                    function(ts, index) {
                        var date = new Date(A.Lang.toInt(ts)),
                            schedulerEvents = eventsMap[ts],
                            schedulerEventsLength = schedulerEvents.length;

                        events.push(
                            A.Lang.sub(TPL_EVENTS_HEADER, {
                                day: headerDayDateFormatter.call(instance, date),
                                extra: headerExtraDateFormatter.call(instance, date),
                                firstClassName: (index === 0) ? CSS_HEADER_FIRST : '',
                                lastClassName: (index === daysLength - 1) ? CSS_HEADER_LAST : '',
                                timestamp: ts
                            })
                        );

                        AArray.each(
                            schedulerEvents,
                            function(schedulerEvent, seIndex) {
                                var today = DateMath.toMidnight(new Date()),
                                    endDate = schedulerEvent.get('endDate'),
                                    startDate = schedulerEvent.get('startDate');

                                events.push(
                                    A.Lang.sub(TPL_EVENT, {
                                        clientId: schedulerEvent.get('clientId'),
                                        color: schedulerEvent.get('color'),
                                        content: schedulerEvent.get('content'),
                                        dates: eventsDateFormatter.call(instance, startDate, endDate),
                                        eventClassName: ((date.getTime() < today.getTime()) || (endDate.getTime() < today.getTime())) ?
                                            CSS_EVENT_PAST : '',
                                        firstClassName: (seIndex === 0) ? CSS_EVENT_FIRST : '',
                                        lastClassName: (seIndex === schedulerEventsLength - 1) ? CSS_EVENT_LAST : ''
                                    })
                                );
                            }
                        );
                    }
                );
            }
            else {
                events.push(
                    A.Lang.sub(TPL_NO_EVENTS, {
                        content: strings.noEvents
                    })
                );
            }

            var content = A.Lang.sub(TPL_CONTAINER, {
                content: A.Lang.sub(TPL_EVENTS_CONTAINER, {
                    content: events.join('')
                })
            });

            instance.set('bodyContent', content);
        },

        /**
         * Returns the current day's `eventMap`.
         *
         * @method _getDayEventsMap
         * @protected
         * @return {Object} The current day's `eventMap`.
         */
        _getDayEventsMap: function() {
            var instance = this,

                scheduler = instance.get('scheduler'),

                viewDate = DateMath.toMidnight(scheduler.get('viewDate')),

                eventsMap = {};

            scheduler.eachEvent(
                function(schedulerEvent) {
                    var endDate = schedulerEvent.get('endDate'),
                        startDate = schedulerEvent.get('startDate'),
                        visible = schedulerEvent.get('visible'),
                        dayTS;

                    if (!visible) {
                        return;
                    }

                    var displayDate = startDate;

                    while (displayDate.getTime() <= endDate.getTime()) {
                        if (displayDate.getTime() >= viewDate.getTime()) {
                            dayTS = DateMath.safeClearTime(displayDate).getTime();

                            if (!eventsMap[dayTS]) {
                                eventsMap[dayTS] = [];
                            }

                            eventsMap[dayTS].push(schedulerEvent);
                        }

                        displayDate = DateMath.add(displayDate, DateMath.DAY, 1);
                    }
                }
            );

            return eventsMap;
        },

        /**
         * Handles `eventsHeader` click events.
         *
         * @method _onEventsHeaderClick
         * @param {EventFacade} event
         * @protected
         */
        _onEventsHeaderClick: function(event) {
            var instance = this,

                scheduler = instance.get('scheduler'),

                currentTarget = event.currentTarget,

                timestamp = A.Lang.toInt(currentTarget.getData('timestamp')) || Date.now(),

                date = new Date(timestamp),

                dayView = scheduler.getViewByName('day');

            if (dayView) {
                scheduler.set('date', date);
                scheduler.set('activeView', dayView);
            }
        },

        /**
         * Handles `scheduler` click events.
         *
         * @method _onEventsHeaderClick
         * @param {EventFacade} event
         * @protected
         */
        _onSchedulerEventClick: function(event) {
            var instance = this,

                currentTarget = event.currentTarget,

                scheduler = instance.get('scheduler'),

                recorder = scheduler.get('eventRecorder'),

                schedulerEvent = currentTarget.getData('schedulerEvent');

            if (!schedulerEvent) {
                schedulerEvent = scheduler.getEventByClientId(
                    currentTarget.getData('clientId'));

                currentTarget.setData('schedulerEvent', schedulerEvent);
            }

            if (schedulerEvent && recorder) {
                recorder.set('event', schedulerEvent, {
                    silent: true
                });
                recorder.showPopover(currentTarget);
            }
        }
    }
});

A.SchedulerAgendaView = SchedulerAgendaView;
