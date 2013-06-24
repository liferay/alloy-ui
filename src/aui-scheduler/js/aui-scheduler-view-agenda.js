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

	FORMAT_HOUR_ISO = '%H:%M',
	FORMAT_HOUR_US = '%l:%M',

	_DOT = '.',
	_EMPTY_STR = '',
	_MDASH = '&mdash;',
	_SPACE = ' ',

	ACTIVE_VIEW = 'activeView',
	AGENDA = 'agenda',
	BIGGIE = 'biggie',
	BODY_CONTENT = 'bodyContent',
	BOUNDING_BOX = 'boundingBox',
	CLEARFIX = 'clearfix',
	CLICK = 'click',
	CLIENT_ID = 'clientId',
	COLOR = 'color',
	CONTAINER = 'container',
	CONTENT = 'content',
	DATE = 'date',
	DATES = 'dates',
	DAY = 'day',
	DISABLED = 'disabled',
	END_DATE = 'endDate',
	EVENT = 'event',
	EVENT_RECORDER = 'eventRecorder',
	EVENTS = 'events',
	EVENTS_DATE_FORMATTER = 'eventsDateFormatter',
	EXTRA = 'extra',
	FIRST = 'first',
	HEADER = 'header',
	HEADER_CONTENT = 'headerContent',
	HEADER_DAY_DATE_FORMATTER = 'headerDayDateFormatter',
	HEADER_EXTRA_DATE_FORMATTER = 'headerExtraDateFormatter',
	INFO = 'info',
	INFO_DAY_DATE_FORMATTER = 'infoDayDateFormatter',
	INFO_LABEL_BIG_DATE_FORMATTER = 'infoLabelBigDateFormatter',
	INFO_LABEL_SMALL_DATE_FORMATTER = 'infoLabelSmallDateFormatter',
	ISO_TIME = 'isoTime',
	LABEL = 'label',
	LAST = 'last',
	LOCALE = 'locale',
	METAL = 'metal',
	NO = 'no',
	NO_EVENTS = 'noEvents',
	PAST = 'past',
	PM = 'pm',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'schedulerEvent',
	SMALL = 'small',
	START_DATE = 'startDate',
	STRINGS = 'strings',
	TIMESTAMP = 'timestamp',
	TODAY = 'today',
	VIEW_DATE = 'viewDate',
	VISIBLE = 'visible',

	SCHEDULER_VIEW_AGENDA = 'scheduler-view-agenda',

	_formatter = function(mask) {
		return function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			return A.DataType.Date.format(
				date,
				{
					format: mask,
					locale: scheduler.get(LOCALE)
				}
			);
		};
	},

	_numericSort = function(arr) {
		return AArray.map(
			arr,
			function(v) {
				return +v;
			}
		)
		.sort(AArray.numericSort);
	},

	getCN = A.getClassName,

	CSS_CONTAINER = getCN(SCHEDULER_VIEW_AGENDA, CONTAINER),
	CSS_EVENT = getCN(SCHEDULER_VIEW_AGENDA, EVENT),
	CSS_EVENT_COLOR = getCN(SCHEDULER_VIEW_AGENDA, EVENT, COLOR),
	CSS_EVENT_CONTENT = getCN(SCHEDULER_VIEW_AGENDA, EVENT, CONTENT),
	CSS_EVENT_DATES = getCN(SCHEDULER_VIEW_AGENDA, EVENT, DATES),
	CSS_EVENT_FIRST = getCN(SCHEDULER_VIEW_AGENDA, EVENT, FIRST),
	CSS_EVENT_INFO = getCN(SCHEDULER_VIEW_AGENDA, INFO),
	CSS_EVENT_INFO_BIGGIE = getCN(SCHEDULER_VIEW_AGENDA, INFO, BIGGIE),
	CSS_EVENT_INFO_CONTAINER = getCN(SCHEDULER_VIEW_AGENDA, INFO, CONTAINER),
	CSS_EVENT_INFO_LABEL = getCN(SCHEDULER_VIEW_AGENDA, INFO, LABEL),
	CSS_EVENT_INFO_LABEL_BIGGIE = getCN(SCHEDULER_VIEW_AGENDA, INFO, LABEL, BIGGIE),
	CSS_EVENT_INFO_LABEL_SMALL = getCN(SCHEDULER_VIEW_AGENDA, INFO, LABEL, SMALL),
	CSS_EVENT_LAST = getCN(SCHEDULER_VIEW_AGENDA, EVENT, LAST),
	CSS_EVENT_NO_EVENTS = getCN(SCHEDULER_VIEW_AGENDA, NO, EVENTS),
	CSS_EVENT_PAST = getCN(SCHEDULER_VIEW_AGENDA, EVENT, PAST),
	CSS_EVENTS = getCN(SCHEDULER_VIEW_AGENDA, EVENTS),
	CSS_HEADER = getCN(SCHEDULER_VIEW_AGENDA, HEADER),
	CSS_HEADER_DAY = getCN(SCHEDULER_VIEW_AGENDA, HEADER, DAY),
	CSS_HEADER_EXTRA = getCN(SCHEDULER_VIEW_AGENDA, HEADER, EXTRA),
	CSS_HEADER_FIRST = getCN(SCHEDULER_VIEW_AGENDA, HEADER, FIRST),
	CSS_HEADER_LAST = getCN(SCHEDULER_VIEW_AGENDA, HEADER, LAST),
	CSS_CLEARFIX = getCN(CLEARFIX),
	CSS_METAL = getCN(SCHEDULER_VIEW_AGENDA, METAL),

	TPL_CONTAINER = '<div class="' + CSS_CONTAINER + '">{content}</div>',

	TPL_EVENTS_HEADER = '<div class="' + [ CSS_HEADER, CSS_METAL, CSS_CLEARFIX ].join(_SPACE) + ' {firstClassName} {lastClassName}">' +
								'<div class="' + CSS_HEADER_DAY + '">{day}</div>' +
								'<a href="javascript:;" class="' + CSS_HEADER_EXTRA + '" data-timestamp="{timestamp}">{extra}</a>' +
							'</div>',

	TPL_EVENTS_CONTAINER = '<div class="' + CSS_EVENTS + '">{content}</div>',

	TPL_EVENT = '<div class="' + [ CSS_EVENT, CSS_CLEARFIX ].join(_SPACE) + ' {firstClassName} {lastClassName} {eventClassName}" data-clientId="{clientId}">' +
					'<div class="' + CSS_EVENT_COLOR + '" style="background-color: {color};"></div>' +
					'<div class="' + CSS_EVENT_CONTENT + '">{content}</div>' +
					'<div class="' + CSS_EVENT_DATES + '">{dates}</div>' +
				'</div>',

	TPL_NO_EVENTS = '<div class="' + CSS_EVENT_NO_EVENTS + '">{content}</div>',

	TPL_INFO = '<div class="' + CSS_EVENT_INFO_CONTAINER + '">' +
					'<div class="' + [ CSS_EVENT_INFO, CSS_CLEARFIX ].join(_SPACE) + '">' +
						'<div class="' + [ CSS_EVENT_INFO_BIGGIE, CSS_METAL ].join(_SPACE) + '">{day}</div>' +
						'<div class="' + CSS_EVENT_INFO_LABEL + '">' +
							'<div class="' + CSS_EVENT_INFO_LABEL_BIGGIE + '">{labelBig}</div>' +
							'<div class="' + CSS_EVENT_INFO_LABEL_SMALL + '">{labelSmall}</div>' +
						'</div>' +
					'</div>' +
				'</div>';

/**
 * A base class for SchedulerAgendaView.
 *
 * @class A.SchedulerAgendaView
 * @extends A.SchedulerView
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var SchedulerAgendaView = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property SchedulerAgendaView.NAME
	 * @type String
	 * @static
	 */
	NAME: SCHEDULER_VIEW_AGENDA,

	/**
	 * Static property used to define the default attribute
	 * configuration for the SchedulerAgendaView.
	 *
	 * @property SchedulerAgendaView.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute bodyContent
		 * @default ''
		 * @type String
		 */
		bodyContent: {
			value: _EMPTY_STR
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute eventsDateFormatter
		 * @type Function
		 */
		eventsDateFormatter: {
			value: function(startDate, endDate) {
				var instance = this,
					scheduler = instance.get(SCHEDULER),
					isoTime = scheduler.get(ACTIVE_VIEW).get(ISO_TIME),
					startDateMask = FORMAT_HOUR_ISO,
					endDateMask = FORMAT_HOUR_ISO,
					startDateFormatter,
					endDateFormatter;

				if (!isoTime) {
					startDateMask = FORMAT_HOUR_US;
					endDateMask = FORMAT_HOUR_US;

					if (startDate.getHours() >= 12) {
						startDateMask += PM;
					}

					if (endDate.getHours() >= 12) {
						endDateMask += PM;
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
					_MDASH,
					endDateFormatter.call(instance, endDate)
				]
				.join(_SPACE);
			},
			validator: isFunction
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute headerDayDateFormatter
		 * @type Function
		 */
		headerDayDateFormatter: {
			value: function(date) {
				var instance = this,
					mask,
					formatter;

				if (DateMath.isToday(date)) {
					mask = TODAY;
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute headerExtraDateFormatter
		 * @type Function
		 */
		headerExtraDateFormatter: {
			validator: isFunction,
			value: _formatter('%B %e')
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute infoDayDateFormatter
		 * @type Function
		 */
		infoDayDateFormatter: {
			validator: isFunction,
			value: _formatter('%e')
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute infoLabelBigDateFormatter
		 * @type Function
		 */
		infoLabelBigDateFormatter: {
			validator: isFunction,
			value: _formatter('%A')
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute infoLabelSmallDateFormatter
		 * @type Function
		 */
		infoLabelSmallDateFormatter: {
			validator: isFunction,
			value: _formatter('%B %d, %Y')
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute name
		 * @default 'agenda'
		 * @type String
		 */
		name: {
			value: AGENDA
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute strings
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
	 * @property SchedulerAgendaView.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.SchedulerView,

	prototype: {

		/**
		 * Bind the events on the SchedulerAgendaView UI. Lifecycle.
		 *
		 * @method bindUI
		 * @protected
		 */
		bindUI: function() {
			var instance = this,

				boundingBox = instance.get(BOUNDING_BOX);

			boundingBox.delegate(CLICK, instance._onSchedulerEventClick, _DOT+CSS_EVENT, instance);
			boundingBox.delegate(CLICK, instance._onEventsHeaderClick, _DOT+CSS_HEADER_EXTRA, instance);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getNextDate
		 */
		getNextDate: function() {
			var instance = this,

				viewDate = instance.get(SCHEDULER).get(VIEW_DATE);

			return DateMath.toMidnight(DateMath.add(viewDate, DateMath.DAY, 1));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getPrevDate
		 */
		getPrevDate: function() {
			var instance = this,

				viewDate = instance.get(SCHEDULER).get(VIEW_DATE);

			return DateMath.toLastHour(DateMath.subtract(viewDate, DateMath.DAY, 1));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method plotEvents
		 */
		plotEvents: function() {
			var instance = this,

				strings = instance.get(STRINGS),

				scheduler = instance.get(SCHEDULER),

				viewDate = scheduler.get(VIEW_DATE),

				eventsDateFormatter = instance.get(EVENTS_DATE_FORMATTER),

				headerDayDateFormatter = instance.get(HEADER_DAY_DATE_FORMATTER),

				headerExtraDateFormatter = instance.get(HEADER_EXTRA_DATE_FORMATTER),

				infoDayDateFormatter = instance.get(INFO_DAY_DATE_FORMATTER),

				infoLabelBigDateFormatter = instance.get(INFO_LABEL_BIG_DATE_FORMATTER),

				infoLabelSmallDateFormatter = instance.get(INFO_LABEL_SMALL_DATE_FORMATTER),

				events = [],

				eventsMap = instance._getDayEventsMap(),

				days = A.Object.keys(eventsMap),

				daysLength = days.length;

			instance.set(
				HEADER_CONTENT,
				A.Lang.sub(
					TPL_INFO,
					{
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
								firstClassName: (index === 0) ? CSS_HEADER_FIRST : _EMPTY_STR,
								lastClassName: (index === daysLength-1) ? CSS_HEADER_LAST : _EMPTY_STR,
								timestamp: ts
							})
						);

						AArray.each(
							schedulerEvents,
							function(schedulerEvent, seIndex) {
								var today = DateMath.toMidnight(new Date()),
									endDate = schedulerEvent.get(END_DATE),
									startDate = schedulerEvent.get(START_DATE);

								events.push(
									A.Lang.sub(TPL_EVENT, {
										clientId: schedulerEvent.get(CLIENT_ID),
										color: schedulerEvent.get(COLOR),
										content: schedulerEvent.get(CONTENT),
										dates: eventsDateFormatter.call(instance, startDate, endDate),
										eventClassName: (startDate.getTime() < today.getTime()) ? CSS_EVENT_PAST : _EMPTY_STR,
										firstClassName: (seIndex === 0) ? CSS_EVENT_FIRST : _EMPTY_STR,
										lastClassName: (seIndex === schedulerEventsLength-1) ? CSS_EVENT_LAST : _EMPTY_STR
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
						content: strings[NO_EVENTS]
					})
				);
			}

			var content = A.Lang.sub(TPL_CONTAINER, {
				content: A.Lang.sub(TPL_EVENTS_CONTAINER, {
					content: events.join(_EMPTY_STR)
				})
			});

			instance.set(BODY_CONTENT, content);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _getDayEventsMap
		 * @protected
		 */
		_getDayEventsMap: function() {
			var instance = this,

				scheduler = instance.get(SCHEDULER),

				viewDate = DateMath.toMidnight(scheduler.get(VIEW_DATE)),

				eventsMap = {};

			scheduler.eachEvent(
				function(schedulerEvent) {
					var startDate = schedulerEvent.get(START_DATE),
						visible = schedulerEvent.get(VISIBLE),
						dayTS;

					if (!visible ||
						(startDate.getTime() < viewDate.getTime())) {

						return;
					}

					dayTS = DateMath.safeClearTime(startDate).getTime();

					if (!eventsMap[dayTS]) {
						eventsMap[dayTS] = [];
					}

					eventsMap[dayTS].push(schedulerEvent);
				}
			);

			return eventsMap;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onEventsHeaderClick
		 * @param event
		 * @protected
		 */
		_onEventsHeaderClick: function(event) {
			var instance = this,

				scheduler = instance.get(SCHEDULER),

				currentTarget = event.currentTarget,

				timestamp = A.Lang.toInt(currentTarget.getData(TIMESTAMP)) || Date.now(),

				date = new Date(timestamp),

				dayView = scheduler.getViewByName(DAY);

			if (dayView) {
				scheduler.set(DATE, date);
				scheduler.set(ACTIVE_VIEW, dayView);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onEventsHeaderClick
		 * @param event
		 * @protected
		 */
		_onSchedulerEventClick: function(event) {
			var instance = this,

				currentTarget = event.currentTarget,

				scheduler = instance.get(SCHEDULER),

				recorder = scheduler.get(EVENT_RECORDER),

				schedulerEvent = currentTarget.getData(SCHEDULER_EVENT);

			if (!schedulerEvent) {
				schedulerEvent = scheduler.getEventByClientId(
					currentTarget.getData(CLIENT_ID));

				currentTarget.setData(SCHEDULER_EVENT, schedulerEvent);
			}

			if (schedulerEvent && recorder && !scheduler.get(DISABLED)) {
				recorder.set(EVENT, schedulerEvent, { silent: true });
				recorder.showPopover(currentTarget);
			}
		}
	}
});

A.SchedulerAgendaView = SchedulerAgendaView;