AUI.add('aui-scheduler-view-agenda', function(A) {
var Lang = A.Lang,
	isFunction = Lang.isFunction,

	AArray = A.Array,
	DateMath = A.DataType.DateMath,

	_DOT = '.',
	_EMPTY_STR = '',
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
	DAY = 'day',
	DISABLED = 'disabled',
	EVENT = 'event',
	EVENT_RECORDER = 'eventRecorder',
	EVENTS = 'events',
	EXTRA = 'extra',
	FIRST = 'first',
	HEADER = 'header',
	HEADER_CONTENT = 'headerContent',
	HEADER_DAY_DATE_FORMATTER = 'headerDayDateFormatter',
	HEADER_EXTRA_DATE_FORMATTER = 'headerExtraDateFormatter',
	HELPER = 'helper',
	INFO = 'info',
	INFO_DAY_DATE_FORMATTER = 'infoDayDateFormatter',
	INFO_LABEL_BIG_DATE_FORMATTER = 'infoLabelBigDateFormatter',
	INFO_LABEL_SMALL_DATE_FORMATTER = 'infoLabelSmallDateFormatter',
	LABEL = 'label',
	LAST = 'last',
	LOCALE = 'locale',
	METAL = 'metal',
	NO = 'no',
	NO_FUTURE_EVENTS = 'noFutureEvents',
	PAST = 'past',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'schedulerEvent',
	SMALL = 'small',
	START_DATE = 'startDate',
	STRINGS = 'strings',
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
	CSS_HELPER_CLEAR_FIX = getCN(HELPER, CLEARFIX),
	CSS_METAL = getCN(SCHEDULER_VIEW_AGENDA, METAL),

	TPL_CONTAINER = '<div class="' + CSS_CONTAINER + '">{content}</div>',

	TPL_EVENTS_HEADER = '<div class="' + [ CSS_HEADER, CSS_METAL, CSS_HELPER_CLEAR_FIX ].join(_SPACE) + ' {firstClassName} {lastClassName}">' +
								'<div class="' + CSS_HEADER_DAY + '">{day}</div>' +
								'<a href="javascript:;" class="' + CSS_HEADER_EXTRA + '" data-timestamp="{timestamp}">{extra}</a>' +
							'</div>',

	TPL_EVENTS_CONTAINER = '<div class="' + CSS_EVENTS + '">{content}</div>',

	TPL_EVENT = '<div class="' + CSS_EVENT + ' {firstClassName} {lastClassName} {eventClassName}" data-clientId="{clientId}">' +
					'<div class="' + CSS_EVENT_COLOR + '" style="background-color: {color};"></div>' +
					'<div class="' + CSS_EVENT_CONTENT + '">{content}</div>' +
				'</div>',

	TPL_NO_EVENTS = '<div class="' + CSS_EVENT_NO_EVENTS + '">{content}</div>',

	TPL_INFO = '<div class="' + CSS_EVENT_INFO_CONTAINER + '">' +
					'<div class="' + [ CSS_EVENT_INFO, CSS_HELPER_CLEAR_FIX ].join(_SPACE) + '">' +
						'<div class="' + [ CSS_EVENT_INFO_BIGGIE, CSS_METAL ].join(_SPACE) + '">{day}</div>' +
						'<div class="' + CSS_EVENT_INFO_LABEL + '">' +
							'<div class="' + CSS_EVENT_INFO_LABEL_BIGGIE + '">{labelBig}</div>' +
							'<div class="' + CSS_EVENT_INFO_LABEL_SMALL + '">{labelSmall}</div>' +
						'</div>' +
					'</div>' +
				'</div>';

var SchedulerAgendaView = A.Component.create({
	NAME: SCHEDULER_VIEW_AGENDA,

	ATTRS: {
		bodyContent: {
			value: _EMPTY_STR
		},

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

		headerExtraDateFormatter: {
			validator: isFunction,
			value: _formatter('%e %B')
		},

		infoDayDateFormatter: {
			validator: isFunction,
			value: _formatter('%e')
		},

		infoLabelBigDateFormatter: {
			validator: isFunction,
			value: _formatter('%A')
		},

		infoLabelSmallDateFormatter: {
			validator: isFunction,
			value: _formatter('%B %d, %Y')
		},

		name: {
			value: AGENDA
		},

		strings: {
			value: {
				noFutureEvents: 'No future events.'
			}
		}
	},

	EXTENDS: A.SchedulerView,

	prototype: {
		bindUI: function() {
			var instance = this,

				boundingBox = instance.get(BOUNDING_BOX);

			boundingBox.delegate(CLICK, instance._onSchedulerEventClick, _DOT+CSS_EVENT, instance);
			boundingBox.delegate(CLICK, instance._onEventsHeaderClick, _DOT+CSS_HEADER_EXTRA, instance);
		},

		getNextDate: function() {
			var instance = this,

				date = instance.get(SCHEDULER).get(DATE);

			return DateMath.add(date, DateMath.DAY, 1);
		},

		getPrevDate: function() {
			var instance = this,

				date = instance.get(SCHEDULER).get(DATE);

			return DateMath.subtract(date, DateMath.DAY, 1);
		},

		plotEvents: function() {
			var instance = this,

				strings = instance.get(STRINGS),

				scheduler = instance.get(SCHEDULER),

				viewDate = scheduler.get(VIEW_DATE),

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
									startDate = schedulerEvent.get(START_DATE);

								events.push(
									A.Lang.sub(TPL_EVENT, {
										clientId: schedulerEvent.get(CLIENT_ID),
										color: schedulerEvent.get(COLOR),
										content: schedulerEvent.get(CONTENT),
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
						content: strings[NO_FUTURE_EVENTS]
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

		_onEventsHeaderClick: function(event) {
			var instance = this,

				scheduler = instance.get(SCHEDULER),

				currentTarget = event.currentTarget,

				timestamp = A.Lang.toInt(currentTarget.getData('timestamp')) || Date.now(),

				date = new Date(timestamp),

				dayView = scheduler.getViewByName(DAY);

			if (dayView) {
				scheduler.set(DATE, date);
				scheduler.set(ACTIVE_VIEW, dayView);
			}
		},

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
				recorder.showOverlay([ event.pageX, event.pageY ]);
			}
		}
	}
});

A.SchedulerAgendaView = SchedulerAgendaView;

}, '@VERSION@' ,{skinnable:true, requires:['aui-scheduler-base']});
