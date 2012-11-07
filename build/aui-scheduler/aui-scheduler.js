AUI.add('aui-scheduler-base', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isDate = Lang.isDate,
	isFunction = Lang.isFunction,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isValue = Lang.isValue,

	ColorUtil = A.ColorUtil,
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
			format.push('p');
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
	BORDER_COLOR = 'borderColor',
	BORDER_COLOR_RGB = 'borderColorRGB',
	BORDER_STYLE = 'borderStyle',
	BORDER_WIDTH = 'borderWidth',
	BUTTON = 'button',
	CLEARFIX = 'clearfix',
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
	HELPER = 'helper',
	HIDDEN = 'hidden',
	HSB_COLOR = 'hsbColor',
	ICON = 'icon',
	ICON_NEXT_NODE = 'iconNextNode',
	ICON_PREV_NODE = 'iconPrevNode',
	ICONS = 'icons',
	INHERIT = 'inherit',
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
	PALLETE = 'pallete',
	PREV = 'prev',
	PREV_DATE = 'prevDate',
	RADIO = 'radio',
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
	TODAY_NODE = 'todayNode',
	TRIGGER_NODE = 'triggerNode',
	VIEW = 'view',
	VIEW_DATE_NODE = 'viewDateNode',
	VIEW_STACK = 'viewStack',
	VIEWS = 'views',
	VIEWS_NODE = 'viewsNode',
	VISIBLE = 'visible',

	getCN = A.getClassName,

	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
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
	CSS_SCHEDULER_VIEW_SELECTED = 'yui3-button-selected',
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
	CSS_SCHEDULER_EVENT_REMINDER = getCN(SCHEDULER_EVENT, REMINDER),
	CSS_SCHEDULER_EVENT_REPEATED = getCN(SCHEDULER_EVENT, REPEATED),
	CSS_SCHEDULER_EVENT_SHORT = getCN(SCHEDULER_EVENT, SHORT),
	CSS_SCHEDULER_EVENT_TITLE = getCN(SCHEDULER_EVENT, TITLE),

	TPL_SCHEDULER_CONTROLS = '<div class="'+CSS_SCHEDULER_CONTROLS+'"></div>',
	TPL_SCHEDULER_HD = '<div class="'+CSS_SCHEDULER_HD+'"></div>',
	TPL_SCHEDULER_ICON_NEXT = '<button type="button" class="'+[ CSS_ICON, CSS_SCHEDULER_ICON_NEXT ].join(_SPACE)+' yui3-button">Next</button>',
	TPL_SCHEDULER_ICON_PREV = '<button type="button" class="'+[ CSS_ICON, CSS_SCHEDULER_ICON_PREV ].join(_SPACE)+' yui3-button">Prev</button>',
	TPL_SCHEDULER_NAV = '<div class="'+CSS_SCHEDULER_NAV+'"></div>',
	TPL_SCHEDULER_TODAY = '<button type="button" class="'+CSS_SCHEDULER_TODAY+' yui3-button">{today}</button>',
	TPL_SCHEDULER_VIEW = '<button type="button" class="'+[ CSS_SCHEDULER_VIEW, CSS_SCHEDULER_VIEW_ ].join(_SPACE)+'{name}" data-view-name="{name}">{label}</button>',
	TPL_SCHEDULER_VIEW_DATE = '<div class="'+CSS_SCHEDULER_VIEW_DATE+'"></div>',
	TPL_SCHEDULER_VIEWS = '<div class="'+CSS_SCHEDULER_VIEWS+'"></div>';

var SchedulerEvent = A.Component.create({
	NAME: SCHEDULER_EVENT,

	ATTRS: {
		allDay: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		borderStyle: {
			value: 'solid',
			validator: isString
		},

		borderWidth: {
			value: '1px',
			validator: isString
		},

		colorBrightnessFactor: {
			value: 0.75,
			validator: isNumber
		},

		colorSaturationFactor: {
			value: 1.5,
			validator: isNumber
		},

		content: {
			setter: String,
			validator: isValue
		},

		color: {
			lazyAdd: false,
			setter: '_setColor',
			value: '#D96666',
			validator: isString
		},

		titleDateFormat: {
			getter: '_getTitleDateFormat',
			value: function() {
				var instance = this,
					scheduler = instance.get(SCHEDULER),
					isoTime = scheduler && scheduler.get(ACTIVE_VIEW).get(ISO_TIME),

					format = {
						endDate: _N_DASH+_SPACE+TITLE_DT_FORMAT_ISO,
						startDate: TITLE_DT_FORMAT_ISO
					};

				if (!isoTime) {
					format.endDate = _N_DASH+_SPACE+getUSDateFormat(instance.get(END_DATE));
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

		endDate: {
			setter: '_setDate',
			valueFn: function() {
				var date = DateMath.clone(this.get(START_DATE));

				date.setHours(date.getHours() + 1);

				return date;
			}
		},

		disabled: {
			value: false,
			validator: isBoolean
		},

		meeting: {
			value: false,
			validator: isBoolean
		},

		node: {
			valueFn: function() {
				return A.NodeList.create(A.Node.create(this.EVENT_NODE_TEMPLATE).setData(SCHEDULER_EVENT, this));
			}
		},

		reminder: {
			value: false,
			validator: isBoolean
		},

		repeated: {
			value: false,
			validator: isBoolean
		},

		scheduler: {
		},

		startDate: {
			setter: '_setDate',
			valueFn: function() {
				return new Date();
			}
		},

		visible: {
			value: true,
			validator: isBoolean
		}
	},

	EXTENDS: A.Model,

	PROPAGATE_ATTRS: [ALL_DAY, START_DATE, END_DATE, CONTENT, COLOR, COLOR_BRIGHTNESS_FACTOR, COLOR_SATURATION_FACTOR, BORDER_STYLE, BORDER_WIDTH, TITLE_DATE_FORMAT, VISIBLE, DISABLED],

	prototype: {
		EVENT_NODE_TEMPLATE: '<div class="' + CSS_SCHEDULER_EVENT + '">' +
									'<div class="' + CSS_SCHEDULER_EVENT_TITLE + '"></div>' +
									'<div class="' + CSS_SCHEDULER_EVENT_CONTENT + '"></div>' +
									'<div class="' + CSS_SCHEDULER_EVENT_ICONS + '">' +
										'<span class="' + [CSS_ICON, CSS_SCHEDULER_EVENT_ICON_DISABLED].join(_SPACE) + '"></span>' +
										'<span class="' + [CSS_ICON, CSS_SCHEDULER_EVENT_ICON_MEETING].join(_SPACE) + '"></span>' +
										'<span class="' + [CSS_ICON, CSS_SCHEDULER_EVENT_ICON_REMINDER].join(_SPACE) + '"></span>' +
										'<span class="' + [CSS_ICON, CSS_SCHEDULER_EVENT_ICON_REPEATED].join(_SPACE) + '"></span>' +
									'</div>' +
								'</div>',

		initializer: function() {
			var instance = this;

			instance.bindUI();
			instance.syncUI();
		},

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

		syncUI: function() {
			var instance = this;

			instance._uiSetAllDay(
				instance.get(ALL_DAY)
			);
			instance._uiSetColor(
				instance.get(COLOR)
			);
			instance._uiSetDisabled(
				instance.get(DISABLED)
			);
			instance._uiSetEndDate(
				instance.get(END_DATE)
			);
			instance._uiSetMeeting(
				instance.get(MEETING)
			);
			instance._uiSetReminder(
				instance.get(REMINDER)
			);
			instance._uiSetRepeated(
				instance.get(REPEATED)
			);
			instance._uiSetVisible(
				instance.get(VISIBLE)
			);

			instance.syncNodeTitleUI();
			instance.syncNodeContentUI();
		},

		destroy: function() {
			var instance = this;

			instance.get(NODE).remove(true);
		},

		addPaddingNode: function() {
			var instance = this;

			instance.get(NODE).push(A.Node.create(instance.EVENT_NODE_TEMPLATE).setData(SCHEDULER_EVENT, instance));

			instance.syncUI();
		},

		clone: function() {
			var instance = this,
				cloned = null,
				scheduler = instance.get(SCHEDULER);

			if (scheduler) {
				cloned = new scheduler.eventModel();
				cloned.copyPropagateAttrValues(instance, null, { silent: true });
			}

			return cloned;
		},

		copyDates: function(evt, options) {
			var instance = this;

			instance.setAttrs({
				endDate: DateMath.clone(evt.get(END_DATE)),
				startDate: DateMath.clone(evt.get(START_DATE))
			},
			options);
		},

		copyPropagateAttrValues: function(evt, dontCopyMap, options) {
			var instance = this,
				attrMap = {};

			instance.copyDates(evt, options);

			A.Array.each(instance.constructor.PROPAGATE_ATTRS, function(attrName) {
				if ( !((dontCopyMap || {}).hasOwnProperty(attrName)) ) {
					var value = evt.get(attrName);

					if (!isObject(value)) {
						attrMap[attrName] = value;
					}
				}
			});

			instance.setAttrs(attrMap, options);
		},

		getBorderColor: function() {
			var instance = this;

			return instance[BORDER_COLOR_RGB].hex;
		},

		getDaysDuration: function() {
			var instance = this;

			return DateMath.getDayOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		getHoursDuration: function() {
			var instance = this;

			return DateMath.getHoursOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		getMinutesDuration: function() {
			var instance = this;

			return DateMath.getMinutesOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		getSecondsDuration: function() {
			var instance = this;

			return DateMath.getSecondsOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		sameEndDate: function(evt) {
			var instance = this;

			return DateMath.compare(instance.get(END_DATE), evt.get(END_DATE));
		},

		sameStartDate: function(evt) {
			var instance = this;

			return DateMath.compare(
				instance.get(START_DATE), evt.get(START_DATE));
		},

		isAfter: function(evt) {
			var instance = this;
			var startDate = instance.get(START_DATE);
			var evtStartDate = evt.get(START_DATE);

			return DateMath.after(startDate, evtStartDate);
		},

		isBefore: function(evt) {
			var instance = this;
			var startDate = instance.get(START_DATE);
			var evtStartDate = evt.get(START_DATE);

			return DateMath.before(startDate, evtStartDate);
		},

		intersects: function(evt) {
			var instance = this;
			var endDate = instance.get(END_DATE);
			var startDate = instance.get(START_DATE);
			var evtStartDate = evt.get(START_DATE);

			return (instance.sameStartDate(evt) ||
					DateMath.between(evtStartDate, startDate, endDate));
		},

		intersectHours: function(evt) {
			var instance = this;
			var endDate = instance.get(END_DATE);
			var startDate = instance.get(START_DATE);
			var evtModifiedStartDate = DateMath.clone(startDate);

			DateMath.copyHours(evtModifiedStartDate, evt.get(START_DATE));

			return (DateMath.compare(startDate, evtModifiedStartDate) ||
					DateMath.between(evtModifiedStartDate, startDate, endDate));
		},

		isDayBoundaryEvent: function() {
			var instance = this;

			return DateMath.isDayBoundary(
				instance.get(START_DATE), instance.get(END_DATE));
		},

		isDayOverlapEvent: function() {
			var instance = this;

			return DateMath.isDayOverlap(
				instance.get(START_DATE), instance.get(END_DATE));
		},

		getClearEndDate: function() {
			var instance = this;

			return DateMath.safeClearTime(instance.get(END_DATE));
		},

		getClearStartDate: function() {
			var instance = this;

			return DateMath.safeClearTime(instance.get(START_DATE));
		},

		move: function(date, options) {
			var instance = this;
			var duration = instance.getMinutesDuration();

			instance.setAttrs({
				endDate: DateMath.add(DateMath.clone(date), DateMath.MINUTES, duration),
				startDate: date
			},
			options);
		},

		setContent: function(content) {
			var instance = this;

			instance.get(NODE).each(function(node) {
				var contentNode = node.one(_DOT+CSS_SCHEDULER_EVENT_CONTENT);

				contentNode.setContent(content);
			});
		},

		setTitle: function(content) {
			var instance = this;

			instance.get(NODE).each(function(node) {
				var titleNode = node.one(_DOT+CSS_SCHEDULER_EVENT_TITLE);

				titleNode.setContent(content);
			});
		},

		syncNodeContentUI: function() {
			var instance = this;

			instance.setContent(instance.get(CONTENT));
		},

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

			instance.setTitle(title.join(_SPACE));
		},

		split: function() {
			var instance = this,
				s1 = DateMath.clone(instance.get(START_DATE)),
				e1 = DateMath.clone(instance.get(END_DATE));

			if (instance.isDayOverlapEvent() && !instance.isDayBoundaryEvent()) {
				var s2 = DateMath.clone(s1);
				s2.setHours(24,0,0,0);

				return [ [ s1, DateMath.toMidnight(DateMath.clone(s1)) ], [ s2, DateMath.clone(e1) ] ];
			}

			return [ [ s1, e1 ] ];
		},

		_afterAllDayChange: function(event) {
			var instance = this;

			instance._uiSetAllDay(event.newVal);
		},

		_afterColorChange: function(event) {
			var instance = this;

			instance._uiSetColor(event.newVal);
		},

		_afterDisabledChange: function(event) {
			var instance = this;

			instance._uiSetDisabled(event.newVal);
		},

		_afterEndDateChange: function(event) {
			var instance = this;

			instance._uiSetEndDate(event.newVal);
		},

		_afterMeetingChange: function(event) {
			var instance = this;

			instance._uiSetMeeting(event.newVal);
		},

		_afterReminderChange: function(event) {
			var instance = this;

			instance._uiSetReminder(event.newVal);
		},

		_afterRepeatedChange: function(event) {
			var instance = this;

			instance._uiSetRepeated(event.newVal);
		},

		_afterVisibleChange: function(event) {
			var instance = this;

			instance._uiSetVisible(event.newVal);
		},

		_setColor: function(val) {
			var instance = this;

			instance[HSB_COLOR] = ColorUtil.rgb2hsb(ColorUtil.getRGB(val));
			instance[BORDER_COLOR] = A.clone(instance[HSB_COLOR]);
			instance[BORDER_COLOR].b *= instance.get(COLOR_BRIGHTNESS_FACTOR);
			instance[BORDER_COLOR].s *= instance.get(COLOR_SATURATION_FACTOR);
			instance[BORDER_COLOR_RGB] = ColorUtil.hsb2rgb(instance[BORDER_COLOR]);

			return val;
		},

		_setDate: function(val) {
			var instance = this;

			if (isNumber(val)) {
				val = new Date(val);
			}

			return val;
		},

		_formatDate: function(date, format) {
			var instance = this;
			var locale = instance.get(LOCALE);

			return A.DataType.Date.format(date, {
				format: format,
				locale: locale
			});
		},

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

		_uiSetAllDay: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_ALL_DAY, !!val);
		},

		_uiSetColor: function(val) {
			var instance = this;
			var node = instance.get(NODE);
			var borderColor = instance.getBorderColor();

			if (node) {
				var styles = {
					borderWidth: instance.get(BORDER_WIDTH),
					borderColor: borderColor,
					backgroundColor: val,
					borderStyle: instance.get(BORDER_STYLE),
					color: INHERIT
				};

				node.setStyles(styles);
			}
		},

		_uiSetDisabled: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_DISABLED, !!val);
		},

		_uiSetEndDate: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_SHORT, instance.getMinutesDuration() <= 30);
		},

		_uiSetMeeting: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_MEETING, !!val);
		},

		_uiSetReminder: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_REMINDER, !!val);
		},

		_uiSetRepeated: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_REPEATED, !!val);
		},

		_uiSetVisible: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_HIDDEN, !val);
		}
	}
});

A.SchedulerEvent = SchedulerEvent;
var SchedulerCalendar = A.Base.create(SCHEDULER_CALENDAR, A.ModelList, [], {
	model: A.SchedulerEvent,

	initializer: function() {
		var instance = this;

		instance.after('colorChange', instance._afterColorChange);
		instance.after('disabledChange', instance._afterDisabledChange);
		instance.after('visibleChange', instance._afterVisibleChange);
		instance.after([ 'add', 'remove', 'reset' ], instance._afterEventsChange);
		instance.on([ 'remove', 'reset' ], instance._onRemoveEvents);

		instance._uiSetEvents(
			instance.toArray()
		);

		instance._setModelsAttrs({
			color: instance.get(COLOR),
			disabled: instance.get(DISABLED),
			visible: instance.get(VISIBLE)
		});
	},

	_afterColorChange: function(event) {
		var instance = this;

		instance._setModelsAttrs({
			color: instance.get(COLOR)
		},
		{ silent: event.silent });
	},

	_afterDisabledChange: function(event) {
		var instance = this;

		instance._setModelsAttrs({
			disabled: instance.get(DISABLED)
		},
		{ silent: event.silent });
	},

	_afterEventsChange: function(event) {
		var instance = this;

		instance._setModelsAttrs({
			color: instance.get(COLOR),
			disabled: instance.get(DISABLED),
			visible: instance.get(VISIBLE)
		}, { silent: true });

		instance._uiSetEvents(instance.toArray());
	},

	_afterVisibleChange: function(event) {
		var instance = this;

		instance._setModelsAttrs({
			visible: instance.get(VISIBLE)
		},
		{ silent: event.silent });
	},

	_onRemoveEvents: function(event) {
		var instance = this;
		var scheduler = instance.get(SCHEDULER);

		if (scheduler) {
			scheduler.removeEvents(instance);
		}
	},

	_setModelsAttrs: function(attrMap, options) {
		var instance = this;

		instance.each(function(schedulerEvent) {
			schedulerEvent.setAttrs(attrMap, options);
		});
	},

	_uiSetEvents: function(val) {
		var instance = this;
		var scheduler = instance.get(SCHEDULER);

		if (scheduler) {
			scheduler.addEvents(val);
			scheduler.syncEventsUI();
		}
	}
}, {
	ATTRS: {
		color: {
			valueFn: function() {
				var instance = this;
				var pallete = instance.get(PALLETE);
				var randomIndex = Math.ceil(Math.random() * pallete.length) - 1;

				return pallete[randomIndex];
			},
			validator: isString
		},

		disabled: {
			value: false,
			validator: isBoolean
		},

		name: {
			value: '(no name)',
			validator: isString
		},

		pallete: {
			value: ['#d96666', '#e67399', '#b373b3', '#8c66d9', '#668cb3', '#668cd9', '#59bfb3', '#65ad89', '#4cb052', '#8cbf40', '#bfbf4d', '#e0c240', '#f2a640', '#e6804d', '#be9494', '#a992a9', '#8997a5', '#94a2be', '#85aaa5', '#a7a77d', '#c4a883', '#c7561e', '#b5515d', '#c244ab', '#603f99', '#536ca6', '#3640ad', '#3c995b', '#5ca632', '#7ec225', '#a7b828', '#cf9911', '#d47f1e', '#b56414', '#914d14', '#ab2671', '#9643a5', '#4585a3', '#737373', '#41a587', '#d1bc36', '#ad2d2d'],
			validator: isArray
		},

		scheduler: {
		},

		visible: {
			value: true,
			validator: isBoolean
		}
	}
});

A.SchedulerCalendar = SchedulerCalendar;
A.SchedulerEvents = A.Base.create('scheduler-events', A.ModelList, [], {
	comparator: function(model) {
		var startDateTime = model.get(START_DATE),
			endDateTime = model.get(END_DATE);

		return startDateTime + 1/(endDateTime - startDateTime);
	},
	model: A.SchedulerEvent
}, {
	ATTRS: {
		scheduler: {}
	}
});

var SchedulerEventSupport = function() {};

SchedulerEventSupport.ATTRS = {};

A.mix(SchedulerEventSupport.prototype, {
	calendarModel: A.SchedulerCalendar,

	eventModel: A.SchedulerEvent,

	eventsModel: A.SchedulerEvents,

	initializer: function(config) {
		var instance = this;

		instance._events = new instance.eventsModel({
			after: {
				add: A.bind(instance._afterAddEvent, instance)
			},
			bubbleTargets: instance,
			scheduler: instance
		});

		instance.addEvents(config.items || config.events);
	},

	addEvents: function(models) {
		var instance = this,
			events = instance._toSchedulerEvents(models);

		return instance._events.add(events);
	},

	eachEvent: function(fn) {
		var instance = this;

		return instance._events.each(fn);
	},

	flushEvents: function() {
		var instance = this;

		instance._events.each(function(evt) {
			delete evt._filtered;
		});
	},

	getEventByClientId: function(clientId) {
		var instance = this;

		return instance._events.getByClientId(clientId);
	},

	getEvents: function(filterFn) {
		var instance = this,
			events = instance._events;

		// TODO: Check why the items are not being sorted on add
		events.sort({ silent: true });

		if (filterFn) {
			events = events.filter(filterFn);
		}
		else {
			events = events.toArray();
		}

		return events;
	},

	getEventsByDay: function(date, includeOverlap) {
		var instance = this;

		date = DateMath.safeClearTime(date);

		return instance.getEvents(function(evt) {
			return DateMath.compare(evt.getClearStartDate(), date) ||
					(includeOverlap && DateMath.compare(evt.getClearEndDate(), date));
		});
	},

	getIntersectEvents: function(date) {
		var instance = this;

		date = DateMath.safeClearTime(date);

		return instance.getEvents(function(evt) {
			var startDate = evt.getClearStartDate();
			var endDate = evt.getClearEndDate();

			return (evt.get(VISIBLE) &&
					(DateMath.compare(date, startDate) ||
					DateMath.compare(date, endDate) ||
					DateMath.between(date, startDate, endDate)));
		});
	},

	removeEvents: function(models) {
		var instance = this,
			events = instance._toSchedulerEvents(models);

		return instance._events.remove(events);
	},

	resetEvents: function(models) {
		var instance = this,
			events = instance._toSchedulerEvents(models);

		return instance._events.reset(events);
	},

	_afterAddEvent: function(event) {
		var instance = this;

		event.model.set(SCHEDULER, instance);
	},

	_toSchedulerEvents: function(values) {
		var instance = this,
			events = [];

		if (isModelList(values)) {
			events = values.toArray();
			values.set(SCHEDULER, instance);
		}
		else if (isArray(values)) {
			A.Array.each(values, function(value) {
				if (isModelList(value)) {
					events = events.concat(value.toArray());
					value.set(SCHEDULER, instance);
				}
				else {
					events.push(value);
				}
			});
		}
		else {
			events = values;
		}

		return events;
	}
});

A.SchedulerEventSupport = SchedulerEventSupport;

var SchedulerBase = A.Component.create({
	NAME: SCHEDULER_BASE,

	ATTRS: {
		activeView: {
			validator: isSchedulerView
		},

		date: {
			value: new Date(),
			validator: isDate
		},

		eventRecorder: {
			setter: '_setEventRecorder'
		},

		strings: {
			value: {
				agenda: 'Agenda',
				day: 'Day',
				month: 'Month',
				today: 'Today',
				week: 'Week',
				year: 'Year'
			}
		},

		/**
		 * The function to format the navigation header date.
		 *
		 * @attribute navigationDateFormatter
		 * @default %A - %d %b %Y
		 * @type Function
		 */
		navigationDateFormatter: {
			value: function(date) {
				var instance = this;

				return A.DataType.Date.format(
					date,
					{
						format: '%B %d, %Y',
						locale: instance.get(LOCALE)
					}
				);
			},
			validator: isFunction
		},

		views: {
			setter: '_setViews',
			value: []
		},

		viewDate: {
			getter: '_getViewDate',
			readOnly: true
		},

		/**
		 * First day of the week: Sunday is 0, Monday is 1.
		 *
		 * @attribute firstDayOfWeek
		 * @default 0
		 * @type Number
		 */
		firstDayOfWeek: {
			value: 0,
			validator: isNumber
		},

		/*
		* HTML_PARSER attributes
		*/
		controlsNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_CONTROLS);
			}
		},

		viewDateNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEW_DATE);
			}
		},

		headerNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_HD);
			}
		},

		iconNextNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_ICON_NEXT);
			}
		},

		iconPrevNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_ICON_PREV);
			}
		},

		navNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_NAV);
			}
		},

		todayNode: {
			valueFn: function() {
				return A.Node.create(
					this._processTemplate(TPL_SCHEDULER_TODAY)
				);
			}
		},

		viewsNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEWS);
			}
		}
	},

	HTML_PARSER: {
		controlsNode: _DOT+CSS_SCHEDULER_CONTROLS,
		viewDateNode: _DOT+CSS_SCHEDULER_VIEW_DATE,
		headerNode: _DOT+CSS_SCHEDULER_HD,
		iconNextNode: _DOT+CSS_SCHEDULER_ICON_NEXT,
		iconPrevNode: _DOT+CSS_SCHEDULER_ICON_PREV,
		navNode: _DOT+CSS_SCHEDULER_NAV,
		todayNode: _DOT+CSS_SCHEDULER_TODAY,
		viewsNode: _DOT+CSS_SCHEDULER_VIEWS
	},

	UI_ATTRS: [DATE, ACTIVE_VIEW],

	AUGMENTS: [A.SchedulerEventSupport, A.WidgetStdMod],

	prototype: {
		viewStack: null,

		initializer: function() {
			var instance = this;

			instance[VIEW_STACK] = {};

			instance[CONTROLS_NODE] = instance.get(CONTROLS_NODE);
			instance[VIEW_DATE_NODE] = instance.get(VIEW_DATE_NODE);
			instance[HEADER] = instance.get(HEADER_NODE);
			instance[ICON_NEXT_NODE] = instance.get(ICON_NEXT_NODE);
			instance[ICON_PREV_NODE] = instance.get(ICON_PREV_NODE);
			instance[NAV_NODE] = instance.get(NAV_NODE);
			instance[TODAY_NODE] = instance.get(TODAY_NODE);
			instance[VIEWS_NODE] = instance.get(VIEWS_NODE);

			instance.after({
				activeViewChange: instance._afterActiveViewChange,
				render: instance._afterRender
			});
		},

		bindUI: function() {
			var instance = this;

			instance._bindDelegate();
		},

		syncUI: function() {
			var instance = this;

			instance.syncStdContent();
		},

		getViewByName: function(name) {
			var instance = this;

			return instance[VIEW_STACK][name];
		},

		getStrings: function() {
			var instance = this;

			return instance.get(STRINGS);
		},

		getString: function(key) {
			var instance = this;

			return instance.getStrings()[key];
		},

		renderView: function(view) {
			var instance = this;

			if (view) {
				view.show();

				if (!view.get(RENDERED)) {
					if (!instance.bodyNode) {
						instance.setStdModContent(WidgetStdMod.BODY, _EMPTY_STR);
					}

					view.render(instance.bodyNode);
				}
			}
		},

		plotViewEvents: function(view) {
			var instance = this;

			view.plotEvents(
				instance.getEvents()
			);
		},

		syncEventsUI: function() {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				instance.plotViewEvents(activeView);
			}
		},

		renderButtonGroup: function() {
			var instance = this;

			instance.buttonGroup = new A.ButtonGroup({
				srcNode: instance[VIEWS_NODE],
				type: RADIO,
				on: {
					selectionChange: A.bind(instance._onButtonGroupSelectionChange, instance)
				}
			}).render();
		},

		/**
		 * Sync SchedulerBase StdContent.
		 *
		 * @method syncStdContent
		 * @protected
		 */
		syncStdContent: function() {
			var instance = this;
			var views = instance.get(VIEWS);

			instance[NAV_NODE].append(instance[ICON_PREV_NODE]);
			instance[NAV_NODE].append(instance[ICON_NEXT_NODE]);

			instance[CONTROLS_NODE].append(instance[TODAY_NODE]);
			instance[CONTROLS_NODE].append(instance[NAV_NODE]);
			instance[CONTROLS_NODE].append(instance[VIEW_DATE_NODE]);

			A.Array.each(views, function(view) {
				instance[VIEWS_NODE].append( instance._createViewTriggerNode(view) );
			});

			instance[HEADER].append(instance[CONTROLS_NODE]);
			instance[HEADER].append(instance[VIEWS_NODE]);
			instance[HEADER].addClass(CSS_HELPER_CLEARFIX);

			instance.setStdModContent(WidgetStdMod.HEADER, instance[HEADER].getDOM());
		},


		_afterActiveViewChange: function(event) {
			var instance = this;

			if (instance.get(RENDERED)) {
				var activeView = event.newVal;
				var lastActiveView = event.prevVal;

				if (lastActiveView) {
					lastActiveView.hide();
				}

				instance.renderView(activeView);

				var eventRecorder = instance.get(EVENT_RECORDER);

				if (eventRecorder) {
					eventRecorder.hideOverlay();
				}

				instance._uiSetDate(instance.get(DATE));
			}
		},

		_afterRender: function(event) {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			instance.renderView(activeView);
			instance.renderButtonGroup();

			instance._uiSetDate(instance.get(DATE));
			instance._uiSetActiveView(activeView);
		},

		_bindDelegate: function() {
			var instance = this;

			instance[CONTROLS_NODE].delegate('click', instance._onClickPrevIcon, _DOT+CSS_SCHEDULER_ICON_PREV, instance);
			instance[CONTROLS_NODE].delegate('click', instance._onClickNextIcon, _DOT+CSS_SCHEDULER_ICON_NEXT, instance);
			instance[CONTROLS_NODE].delegate('click', instance._onClickToday, _DOT+CSS_SCHEDULER_TODAY, instance);
		},

		_createViewTriggerNode: function(view) {
			var instance = this;

			if (!view.get(TRIGGER_NODE)) {
				var name = view.get(NAME);

				view.set(
					TRIGGER_NODE,
					A.Node.create(
						Lang.sub(TPL_SCHEDULER_VIEW, {
							name: name,
							label: (instance.getString(name) || name)
						})
					)
				);
			}

			return view.get(TRIGGER_NODE);
		},

		_getViewDate: function() {
			var instance = this,
				date = instance.get(DATE),
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				date = activeView.getAdjustedViewDate(date);
			}

			return date;
		},

		_onClickToday: function(event) {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				instance.set(DATE, activeView.getToday());
			}

			event.preventDefault();
		},

		_onClickNextIcon: function(event) {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				instance.set(DATE, activeView.get(NEXT_DATE));
			}

			event.preventDefault();
		},

		_onClickPrevIcon: function(event) {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				instance.set(DATE, activeView.get(PREV_DATE));
			}

			event.preventDefault();
		},

		_onButtonGroupSelectionChange: function(event) {
			var instance = this,
				viewName = event.originEvent.target.attr(DATA_VIEW_NAME);

			instance.set(ACTIVE_VIEW, instance.getViewByName(viewName));

			event.preventDefault();
		},

		_processTemplate: function(tpl) {
			var instance = this;

			return Lang.sub(tpl, instance.getStrings());
		},

		_setEventRecorder: function(val) {
			var instance = this;

			if (val) {
				val.setAttrs({
					scheduler: instance
				},
				{ silent: true });

				val.addTarget(instance);
			}
		},

		_setViews: function(val) {
			var instance = this;
			var views = [];

			A.Array.each(val, function(view) {
				if (isSchedulerView(view) && !view.get(RENDERED)) {
					view.setAttrs({
						scheduler: instance
					});

					views.push(view);

					instance[VIEW_STACK][view.get(NAME)] = view;
				}
			});

			if (!instance.get(ACTIVE_VIEW)) {
				instance.set(ACTIVE_VIEW, val[0]);
			}

			return views;
		},

		_uiSetActiveView: function(val) {
			var instance = this;

			if (val) {
				var activeView = val.get(NAME),
					activeNav = instance[VIEWS_NODE].one(_DOT+CSS_SCHEDULER_VIEW_+activeView);

				if (activeNav) {
					instance[VIEWS_NODE].all(BUTTON).removeClass(CSS_SCHEDULER_VIEW_SELECTED);
					activeNav.addClass(CSS_SCHEDULER_VIEW_SELECTED);
				}
			}
		},

		_uiSetDate: function(val) {
			var instance = this;

			var formatter = instance.get(NAVIGATION_DATE_FORMATTER);
			var navigationTitle = formatter.call(instance, val);

			if (instance.get(RENDERED)) {
				var activeView = instance.get(ACTIVE_VIEW);

				if (activeView) {
					activeView._uiSetDate(val);

					formatter = activeView.get(NAVIGATION_DATE_FORMATTER);
					navigationTitle = formatter.call(activeView, val);
				}

				instance[VIEW_DATE_NODE].html(navigationTitle);

				instance.syncEventsUI();
			}
		}
	}
});

A.Scheduler = SchedulerBase;
var SchedulerView = A.Component.create({
	NAME: SCHEDULER_VIEW,

	AUGMENTS: [A.WidgetStdMod],

	ATTRS: {
		bodyContent: {
			value: _EMPTY_STR
		},

		filterFn: {
			validator: isFunction,
			value: function(evt) { return true; }
		},

		height: {
			value: 600
		},

		isoTime: {
			value: false,
			validator: isBoolean
		},

		name: {
			value: _EMPTY_STR,
			validator: isString
		},

		/**
		 * The function to format the navigation header date.
		 *
		 * @attribute navigationDateFormatter
		 * @default %A - %d %b %Y
		 * @type Function
		 */
		navigationDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(date, {
					format: '%A, %d %B, %Y',
					locale: scheduler.get(LOCALE)
				});
			},
			validator: isFunction
		},

		nextDate: {
			getter: 'getNextDate',
			readOnly: true
		},

		prevDate: {
			getter: 'getPrevDate',
			readOnly: true
		},

		scheduler: {
			lazyAdd: false,
			setter: '_setScheduler'
		},

		scrollable: {
			value: true,
			validator: isBoolean
		},

		triggerNode: {
			setter: A.one
		},

		visible: {
			value: false
		}
	},

	BIND_UI_ATTRS: [SCROLLABLE],

	prototype: {
		initializer: function() {
			var instance = this;

			instance.after('render', instance._afterRender);
		},

		syncUI: function() {
			var instance = this;

			instance.syncStdContent();
		},

		getAdjustedViewDate: function(val) {
			var instance = this;

			return val;
		},

		flushViewCache: function() {
		},

		getNextDate: function() {
		},

		getPrevDate: function() {
		},

		getToday: function() {
			return DateMath.clearTime(new Date());
		},

		limitDate: function(date, maxDate) {
			var instance = this;

			if (DateMath.after(date, maxDate)) {
				date = DateMath.clone(maxDate);
			}

			return date;
		},

		plotEvents: function() {
		},

		syncStdContent: function() {
		},

		syncEventUI: function(evt) {
		},

		_uiSetDate: function(val) {
		},

		_afterRender: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			instance._uiSetScrollable(
				instance.get(SCROLLABLE)
			);
		},

		_setScheduler: function(val) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			if (scheduler) {
				instance.removeTarget(scheduler);
			}

			if (val) {
				instance.addTarget(val);

				val.after(['*:add', '*:remove', '*:reset'], A.bind(instance.flushViewCache, instance));
			}

			return val;
		},

		_uiSetScrollable: function(val) {
			var instance = this;
			var bodyNode = instance.bodyNode;

			if (bodyNode) {
				bodyNode.toggleClass(CSS_SCHEDULER_VIEW_SCROLLABLE, val);
				bodyNode.toggleClass(CSS_SCHEDULER_VIEW_NOSCROLL, !val);
			}
		}
	}
});

A.SchedulerView = SchedulerView;

}, '@VERSION@' ,{skinnable:true, requires:['aui-base','aui-color-util','aui-datatype','button-group','model','model-list','widget-stdmod']});
AUI.add('aui-scheduler-view-day', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isFunction = Lang.isFunction,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,

	DateMath = A.DataType.DateMath,
	WidgetStdMod = A.WidgetStdMod,

	_ANCHOR = 'a',
	_COMMA = ',',
	_DOT = '.',
	_EMPTY_STR = '',
	_PERCENT = '%',
	_SPACE = ' ',

	DATA_COLNUMBER = 'data-colnumber',
	SCHEDULER_VIEW = 'scheduler-view',
	SCHEDULER_VIEW_DAY = 'scheduler-view-day',

	getScrollbarWidth = A.cached(function () {
		var doc      = A.config.doc,
			testNode = doc.createElement('div'),
			body     = doc.getElementsByTagName('body')[0],
			// 0.1 because cached doesn't support falsy refetch values
			width    = 0.1;

		if (body) {
			testNode.style.cssText = "position:absolute;visibility:hidden;overflow:scroll;width:20px;";
			testNode.appendChild(doc.createElement('p')).style.height = '1px';
			body.insertBefore(testNode, body.firstChild);
			width = testNode.offsetWidth - testNode.clientWidth;

			body.removeChild(testNode);
		}

		return width;
	}, null, 0.1),

	getNodeListHTMLParser = function(selector, sizeCondition) {
		return function(srcNode) {
			var nodes = srcNode.all(selector);
			return (nodes.size() >= sizeCondition) ? nodes : null;
		};
	},

	roundToNearestMultiple = function(n, multiple) {
		return Math.round(n/multiple)*multiple;
	},

	toNumber = function(v) {
		return parseFloat(v) || 0;
	},

	ACTIVE_COLUMN = 'activeColumn',
	ACTIVE_VIEW = 'activeView',
	ALL_DAY = 'allDay',
	BOUNDING_BOX = 'boundingBox',
	COL = 'col',
	COL_DAYS_NODE = 'colDaysNode',
	COL_HEADER_DAYS_NODE = 'colHeaderDaysNode',
	COLBLANK = 'colblank',
	COLDATA = 'coldata',
	COLDAY = 'colday',
	COLGRID = 'colgrid',
	COLSPAN = 'colspan',
	COLTIME = 'coltime',
	COLUMN_DATA = 'columnData',
	COLUMN_DAY_HEADER = 'columnDayHeader',
	COLUMN_SHIMS = 'columnShims',
	COLUMN_TIME = 'columnTime',
	CONTAINER = 'container',
	CREATION_START_DATE = 'creationStartDate',
	DATE = 'date',
	VIEW_DATE = 'viewDate',
	DAY = 'day',
	DAYS = 'days',
	DELEGATE_CONFIG = 'delegateConfig',
	DISABLED = 'disabled',
	DIVISION = 'division',
	_DOTTED = 'dotted',
	DRAGGING_EVENT = 'draggingEvent',
	DURATION = 'duration',
	END_DATE = 'endDate',
	EVENT_CLASS = 'eventClass',
	EVENT_PLACEHOLDER = 'eventPlaceholder',
	EVENT_RECORDER = 'eventRecorder',
	EVENT_WIDTH = 'eventWidth',
	FILTER_FN = 'filterFn',
	FIRST = 'first',
	GRID = 'grid',
	GRID_CONTAINER = 'gridContainer',
	GRIP = 'grip',
	HD = 'hd',
	HEADER = 'header',
	HEADER_DATE_FORMATTER = 'headerDateFormatter',
	HEADER_TABLE_NODE = 'headerTableNode',
	HEADER_VIEW = 'headerView',
	HEADER_VIEW_CONFIG = 'headerViewConfig',
	HEADER_VIEW_LABEL_NODE = 'headerViewLabelNode',
	HEIGHT = 'height',
	HORIZONTAL = 'horizontal',
	HOST = 'host',
	HOUR_HEIGHT = 'hourHeight',
	ICON = 'icon',
	ISO_TIME = 'isoTime',
	LABEL = 'label',
	LEFT = 'left',
	LOCALE = 'locale',
	MARGIN_RIGHT = 'marginRight',
	MARKER = 'marker',
	MARKERCELL = 'markercell',
	MARKERCELLS_NODE = 'markercellsNode',
	MARKERS = 'markers',
	MARKERS_NODE = 'markersNode',
	NODE = 'node',
	OFFSET_HEIGHT = 'offsetHeight',
	PAD = 'pad',
	PARENT_NODE = 'parentNode',
	PROXY = 'proxy',
	PX = 'px',
	REGION = 'region',
	RESIZER = 'resizer',
	RESIZER_NODE = 'resizerNode',
	RESIZING = 'resizing',
	RIGHT = 'right',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'scheduler-event',
	SHIM = 'shim',
	START_DATE = 'startDate',
	START_XY = 'startXY',
	STRINGS = 'strings',
	TABLE = 'table',
	TABLE_NODE = 'tableNode',
	TIME = 'time',
	TIMES_NODE = 'timesNode',
	TODAY = 'today',
	TOP = 'top',
	VIEW = 'view',
	VISIBLE = 'visible',
	WIDTH = 'width',
	DATA = 'data',

	getCN = A.getClassName,

	CSS_ICON = getCN(ICON),
	CSS_ICON_GRIP__DOTTED_HORIZONTAL = getCN(ICON, GRIP, _DOTTED, HORIZONTAL),

	CSS_SVT_TABLE_DATA = getCN(SCHEDULER_VIEW, TABLE, DATA),

	CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
	CSS_SCHEDULER_EVENT_DISABLED = getCN(SCHEDULER_EVENT, DISABLED),
	CSS_SCHEDULER_EVENT_PROXY = getCN(SCHEDULER_EVENT, PROXY),

	CSS_SCHEDULER_TODAY = getCN(SCHEDULER, TODAY),
	CSS_SCHEDULER_TODAY_HD = getCN(SCHEDULER, TODAY, HD),

	CSS_SCHEDULER_VIEW_DAY_COLDATA = getCN(SCHEDULER_VIEW, COLDATA),
	CSS_SCHEDULER_VIEW_DAY_COLGRID = getCN(SCHEDULER_VIEW, COLGRID),
	CSS_SCHEDULER_VIEW_DAY_GRID = getCN(SCHEDULER_VIEW, GRID),
	CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER = getCN(SCHEDULER_VIEW, GRID, CONTAINER),
	CSS_SCHEDULER_VIEW_DAY_HEADER_COL = getCN(SCHEDULER_VIEW, DAY, HEADER, COL),
	CSS_SCHEDULER_VIEW_DAY_HEADER_DAY = getCN(SCHEDULER_VIEW, DAY, HEADER, DAY),
	CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST = getCN(SCHEDULER_VIEW, DAY, HEADER, DAY, FIRST),
	CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_PAD_RIGHT = getCN(SCHEDULER_VIEW, DAY, HEADER, DAY, PAD, RIGHT),
	CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE = getCN(SCHEDULER_VIEW, DAY, HEADER, TABLE),
	CSS_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL = getCN(SCHEDULER_VIEW, DAY, HEADER, VIEW, LABEL),
	CSS_SCHEDULER_VIEW_DAY_MARKER_DIVISION = getCN(SCHEDULER_VIEW, MARKER, DIVISION),
	CSS_SCHEDULER_VIEW_DAY_MARKERCELL = getCN(SCHEDULER_VIEW, MARKERCELL),
	CSS_SCHEDULER_VIEW_DAY_MARKERS = getCN(SCHEDULER_VIEW, MARKERS),
	CSS_SCHEDULER_VIEW_DAY_RESIZER = getCN(SCHEDULER_VIEW, DAY, RESIZER),
	CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON = getCN(SCHEDULER_VIEW, DAY, RESIZER, ICON),
	CSS_SCHEDULER_VIEW_DAY_TABLE = getCN(SCHEDULER_VIEW, DAY, TABLE),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COL = getCN(SCHEDULER_VIEW, DAY, TABLE, COL),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM = getCN(SCHEDULER_VIEW, DAY, TABLE, COL, SHIM),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COLBLANK = getCN(SCHEDULER_VIEW, DAY, TABLE, COLBLANK),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY = getCN(SCHEDULER_VIEW, DAY, TABLE, COLDAY),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME = getCN(SCHEDULER_VIEW, DAY, TABLE, COLTIME),
	CSS_SCHEDULER_VIEW_DAY_TABLE_TIME = getCN(SCHEDULER_VIEW, DAY, TABLE, TIME),

	TPL_SCHEDULER_VIEW_DAY_RESIZER = '<div class="' + CSS_SCHEDULER_VIEW_DAY_RESIZER + '">' +
										'<div class="' + [CSS_ICON, CSS_ICON_GRIP__DOTTED_HORIZONTAL, CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON].join(_SPACE) + '"></div>' +
									'</div>',

	TPL_SCHEDULER_VIEW_DAY_MARKERCELL = '<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKERCELL + '">' +
											'<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKER_DIVISION + '"></div>' +
										'</div>',

	TPL_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL = '<span class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL + '">{label}</span>',

	TPL_SCHEDULER_VIEW_DAY_TABLE = '<table cellspacing="0" cellpadding="0" class="' + CSS_SCHEDULER_VIEW_DAY_TABLE + '">' +
										'<tbody>' +
											'<tr class="' + CSS_SCHEDULER_VIEW_DAY_COLGRID + '" height="1">' +
												'<td height="0" class="' + [ CSS_SCHEDULER_VIEW_DAY_TABLE_COL, CSS_SCHEDULER_VIEW_DAY_TABLE_COLBLANK ].join(_SPACE) + '"></td>' +
												'<td class="' + CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER + '" colspan="1">' +
													'<div class="' + CSS_SCHEDULER_VIEW_DAY_GRID + '">' +
														'<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKERS + '"></div>' +
													'</div>' +
												'</td>' +
											'</tr>' +
											'<tr class="' + CSS_SCHEDULER_VIEW_DAY_COLDATA + '">' +
												'<td class="' + [ CSS_SCHEDULER_VIEW_DAY_TABLE_COL, CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME ].join(_SPACE) + '"></td>' +
											'</tr>' +
										'</tbody>' +
									'</table>',

	TPL_SCHEDULER_VIEW_DAY_TABLE_COLDAY = '<td class="' + [ CSS_SCHEDULER_VIEW_DAY_TABLE_COL, CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY ].join(_SPACE) + '" data-colnumber="{colNumber}">' +
												'<div class="' + CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM + '"></div>' +
											'</td>',

	TPL_SCHEDULER_VIEW_DAY_TABLE_TIME = '<div class="' + CSS_SCHEDULER_VIEW_DAY_TABLE_TIME + '">{hour}</div>',

	TPL_SCHEDULER_VIEW_DAY_HEADER_TABLE = '<table cellspacing="0" cellpadding="0" class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE + '">' +
											'<tbody>' +
												'<tr class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_COL + '"></tr>' +
											'</tbody>' +
										'</table>',

	TPL_SCHEDULER_VIEW_DAY_HEADER_DAY = '<th class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_DAY + '" data-colnumber="{colNumber}"><a href="#">&nbsp;</a></th>',
	TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST = '<td class="' + [ CSS_SCHEDULER_VIEW_DAY_HEADER_DAY, CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST ].join(_SPACE) + '"></td>',
	TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_PAD_RIGHT = '<th class="' + [ CSS_SCHEDULER_VIEW_DAY_HEADER_DAY, CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_PAD_RIGHT ].join(_SPACE) + '">&nbsp;</th>';

var SchedulerDayView = A.Component.create({
	NAME: SCHEDULER_VIEW_DAY,

	ATTRS: {
		bodyContent: {
			value: _EMPTY_STR
		},

		days: {
			value: 1,
			validator: isNumber
		},

		delegateConfig: {
			value: {},
			setter: function(val) {
				var instance = this;

				return A.merge(
					{
						dragConfig: {
							useShim: false
						},
						bubbleTargets: instance,
						container: instance.get(BOUNDING_BOX),
						nodes: _DOT+CSS_SCHEDULER_EVENT,
						invalid: 'input, select, button, a, textarea, ' + _DOT+CSS_SCHEDULER_EVENT_DISABLED
					},
					val || {}
				);
			},
			validator: isObject
		},

		eventWidth: {
			value: 95,
			validator: isNumber
		},

		filterFn: {
			value: function(evt) {
				return (evt.getHoursDuration() <= 24 && !evt.get(ALL_DAY));
			}
		},

		headerDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(
					date,
					{
						format: '%d %A',
						locale: scheduler.get(LOCALE)
					}
				);
			},
			validator: isString
		},

		headerView: {
			value: true,
			validator: isBoolean
		},

		headerViewConfig: {
			setter: function(val) {
				var instance = this;

				return A.merge(
					{
						displayDaysInterval: 1,
						displayRows: 6,
						filterFn: function(evt) {
							return ((evt.getHoursDuration() > 24) || evt.get(ALL_DAY));
						},
						height: 'auto',
						visible: true
					},
					val || {}
				);
			},
			value: {}
		},

		hourHeight: {
			value: 52,
			validator: isNumber
		},

		name: {
			value: DAY
		},

		navigationDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(
					date,
					{
						format: '%A, %B %d, %Y',
						locale: scheduler.get(LOCALE)
					}
				);
			},
			validator: isFunction
		},

		strings: {
			value: {
				allDay: 'All day'
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		headerTableNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEW_DAY_HEADER_TABLE);
			}
		},

		headerViewLabelNode: {
			valueFn: function() {
				var instance = this;

				var strings = instance.get(STRINGS);

				return A.Node.create(
					Lang.sub(TPL_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL, {
						label: strings[ALL_DAY]
					})
				);
			}
		},

		resizerNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEW_DAY_RESIZER);
			}
		},

		tableNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEW_DAY_TABLE);
			}
		},

		colDaysNode: {
			valueFn: '_valueColDaysNode'
		},

		colHeaderDaysNode: {
			valueFn: '_valueColHeaderDaysNode'
		},

		markercellsNode: {
			valueFn: '_valueMarkercellsNode'
		},

		timesNode: {
			valueFn: '_valueTimesNode'
		}
	},

	HTML_PARSER: {
		colDaysNode: getNodeListHTMLParser(_DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY, 1),
		colHeaderDaysNode: getNodeListHTMLParser(_DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_DAY, 2),
		headerTableNode: _DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE,
		headerViewLabelNode: _DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL,
		markercellsNode: getNodeListHTMLParser(_DOT+CSS_SCHEDULER_VIEW_DAY_MARKERCELL, 24),
		resizerNode: _DOT+CSS_SCHEDULER_VIEW_DAY_RESIZER,
		tableNode: _DOT+CSS_SCHEDULER_VIEW_DAY_TABLE,
		timesNode: getNodeListHTMLParser(_DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_TIME, 24)
	},

	EXTENDS: A.SchedulerView,

	prototype: {
		initializer: function() {
			var instance = this;

			instance[COL_DAYS_NODE] = instance.get(COL_DAYS_NODE);
			instance[COL_HEADER_DAYS_NODE] = instance.get(COL_HEADER_DAYS_NODE);
			instance[HEADER_TABLE_NODE] = instance.get(HEADER_TABLE_NODE);
			instance[MARKERCELLS_NODE] = instance.get(MARKERCELLS_NODE);
			instance[RESIZER_NODE] = instance.get(RESIZER_NODE);
			instance[TABLE_NODE] = instance.get(TABLE_NODE);
			instance[TIMES_NODE] = instance.get(TIMES_NODE);

			instance[ACTIVE_COLUMN] = null;
			instance[COLUMN_DATA] = instance[TABLE_NODE].one(_DOT+CSS_SCHEDULER_VIEW_DAY_COLDATA);
			instance[COLUMN_DAY_HEADER] = instance.headerTableNode.one(_DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_COL);
			instance[COLUMN_SHIMS] = instance[COL_DAYS_NODE].all(_DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM);
			instance[COLUMN_TIME] = instance[TABLE_NODE].one(_DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME);
			instance[GRID_CONTAINER] = instance[TABLE_NODE].one(_DOT+CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER);
			instance[MARKERS_NODE] = instance[TABLE_NODE].one(_DOT+CSS_SCHEDULER_VIEW_DAY_MARKERS);

			if (instance.get(HEADER_VIEW)) {
				instance[HEADER_VIEW] = new A.SchedulerTableView(
					instance.get(HEADER_VIEW_CONFIG)
				);
			}
		},

		renderUI: function() {
			var instance = this;

			instance[COLUMN_TIME].setContent(instance[TIMES_NODE]);
			instance[MARKERS_NODE].setContent(instance[MARKERCELLS_NODE]);
			instance[COL_DAYS_NODE].appendTo(instance[COLUMN_DATA]);
			instance[COL_HEADER_DAYS_NODE].appendTo(instance[COLUMN_DAY_HEADER]);

			if (instance[HEADER_VIEW]) {
				instance[HEADER_VIEW].set(SCHEDULER, instance.get(SCHEDULER));

				instance[HEADER_VIEW].render();
			}
		},

		bindUI: function() {
			var instance = this;

			instance[HEADER_TABLE_NODE].delegate('click', A.bind(instance._onClickDaysHeader, instance), _DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_DAY);
			instance[COLUMN_DATA].delegate('mousedown', A.bind(instance._onMouseDownTableCol, instance), _DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL);
			instance[COLUMN_DATA].delegate('mouseenter', A.bind(instance._onMouseEnterEvent, instance), _DOT+CSS_SCHEDULER_EVENT);
			instance[COLUMN_DATA].delegate('mouseleave', A.bind(instance._onMouseLeaveEvent, instance), _DOT+CSS_SCHEDULER_EVENT);
			instance[COLUMN_DATA].delegate('mousemove', A.bind(instance._onMouseMoveTableCol, instance), _DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY);
			instance[COLUMN_DATA].delegate('mouseup', A.bind(instance._onMouseUpTableCol, instance), _DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL);

			instance.on('drag:end', instance._onEventDragEnd);
			instance.on('drag:start', instance._onEventDragStart);
			instance.on('drag:tickAlignY', instance._dragTickAlignY);
			instance.on('schedulerChange', instance._onSchedulerChange);
			instance.after('drag:align', instance._afterDragAlign);
		},

		syncUI: function() {
			var instance = this;

			SchedulerDayView.superclass.syncUI.apply(this, arguments);

			instance[GRID_CONTAINER].attr(COLSPAN, instance.get(DAYS));

			instance._setupDragDrop();
		},

		syncStdContent: function() {
			var instance = this;

			instance.setStdModContent(
				WidgetStdMod.BODY, instance[TABLE_NODE].getDOM());

			var headerNodes = A.NodeList.create(instance[HEADER_TABLE_NODE]);

			if (instance[HEADER_VIEW]) {
				headerNodes.push(instance[HEADER_VIEW].get(BOUNDING_BOX));
				headerNodes.push(instance.get(HEADER_VIEW_LABEL_NODE));
			}

			instance.setStdModContent(WidgetStdMod.HEADER, headerNodes);
		},

		calculateEventHeight: function(duration) {
			var instance = this;
			var hourHeight = instance.get(HOUR_HEIGHT);

			return Math.max(duration*(hourHeight/60), hourHeight/2);
		},

		calculateTop: function(date) {
			var instance = this;

			return ((date.getHours()*60) + date.getMinutes() +
					(date.getSeconds()/60)) * (instance.get(HOUR_HEIGHT)/60);
		},

		getNextDate: function() {
			var instance = this;
			var date = instance.get(SCHEDULER).get(DATE);

			return DateMath.add(date, DateMath.DAY, 1);
		},

		getPrevDate: function() {
			var instance = this;
			var date = instance.get(SCHEDULER).get(DATE);

			return DateMath.subtract(date, DateMath.DAY, 1);
		},

		getColumnByDate: function(date) {
			var instance = this;

			return instance[COL_DAYS_NODE].item(instance.getDateDaysOffset(date));
		},

		getColumnShimByDate: function(date) {
			var instance = this;

			return instance[COLUMN_SHIMS].item(instance.getDateDaysOffset(date));
		},

		getDateByColumn: function(colNumber) {
			var instance = this;
			var viewDate = DateMath.safeClearTime(
				instance.get(SCHEDULER).get(VIEW_DATE));

			return DateMath.add(viewDate, DateMath.DAY, colNumber);
		},

		getDateDaysOffset: function(date) {
			var instance = this;

			var viewDate = DateMath.safeClearTime(
				instance.get(SCHEDULER).get(VIEW_DATE));

			return DateMath.getDayOffset(
				DateMath.safeClearTime(date), viewDate);
		},

		getYCoordTime: function(top) {
			var instance = this;
			var hourHeight = instance.get(HOUR_HEIGHT);
			var prop = toNumber((top/hourHeight).toFixed(2));

			// Isolate the decimals and convert to minutes: (prop*100)%100*0.6.
			var minutes = Math.floor((prop*100)%100*0.6);
			var hours = Math.floor(prop);

			return [ hours, minutes, 0 ];
		},

		plotEvent: function(evt) {
			var instance = this;

			var nodeList = evt.get(NODE);

			if (nodeList.size() < 2) {
				evt.addPaddingNode();
			}

			var node = evt.get(NODE).item(0);
			var paddingNode = evt.get(NODE).item(1);
			var endShim = instance.getColumnShimByDate(evt.get(END_DATE));
			var startShim = instance.getColumnShimByDate(evt.get(START_DATE));

			if (startShim) {
				startShim.append(node);

				if (evt.get(VISIBLE)) {
					node.show();
				}
			}
			else {
				node.hide();
			}

			if (endShim) {
				if (endShim.compareTo(startShim) || evt.isDayBoundaryEvent()) {
					paddingNode.hide();
				}
				else {
					endShim.append(paddingNode);

					if (evt.get(VISIBLE)) {
						paddingNode.show();
					}
				}
			}
			else {
				paddingNode.hide();
			}

			evt.syncUI();

			instance.syncEventTopUI(evt);
			instance.syncEventHeightUI(evt);
		},

		plotEvents: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var filterFn = instance.get(FILTER_FN);

			instance[COLUMN_SHIMS].each(function(colShimNode, i) {
				var columnEvents = scheduler.getEventsByDay(instance.getDateByColumn(i), true);
				var plottedEvents = [];

				colShimNode.empty();

				A.Array.each(columnEvents, function(evt) {
					if (filterFn.apply(instance, [evt])) {
						instance.plotEvent(evt);

						plottedEvents.push(evt);
					}
				});

				instance.syncEventsIntersectionUI(plottedEvents);
			});

			if (instance.get(HEADER_VIEW)) {
				instance.syncHeaderViewUI();
			}
		},

		syncColumnsUI: function() {
			var instance = this;

			instance[COL_DAYS_NODE].each(function(columnNode, i) {
				var columnDate = instance.getDateByColumn(i);

				columnNode.toggleClass(
					CSS_SCHEDULER_TODAY, DateMath.isToday(columnDate));
			});
		},

		syncDaysHeaderUI: function() {
			var instance = this;
			var viewDate = instance.get(SCHEDULER).get(VIEW_DATE);
			var formatter = instance.get(HEADER_DATE_FORMATTER);
			var locale = instance.get(LOCALE);

			instance[COL_HEADER_DAYS_NODE].all(_ANCHOR).each(
				function(columnNode, i) {
					var columnDate = DateMath.add(viewDate, DateMath.DAY, i);

					columnNode.toggleClass(
						CSS_SCHEDULER_TODAY_HD, DateMath.isToday(columnDate));

					columnNode.html(formatter.call(instance, columnDate));
				}
			);
		},

		// TODO
		syncEventsIntersectionUI: function(columnEvents) {
			var instance = this;
			var eventWidth = instance.get(EVENT_WIDTH);

			instance.get(SCHEDULER).flushEvents();

			A.Array.each(columnEvents, function(colEvt) {
				var intercessors = instance.findEventIntersections(
					colEvt, columnEvents);

				var total = intercessors.length;
				var distributionRate = (eventWidth/total);

				A.Array.each(intercessors, function(evt, j) {
					var evtNode = evt.get(NODE).item(0);
					var left = distributionRate*j;
					var width = distributionRate*1.7;

					if (j === (total - 1)) {
						width = eventWidth - left;
					}

					evtNode.setStyle(WIDTH, width+_PERCENT);
					evtNode.setStyle(LEFT, left+_PERCENT);

					var evtParentNode = evtNode.get(PARENT_NODE);

					if (evtParentNode) {
						evtParentNode.insert(evtNode, j);
					}

					evt._filtered = true;
				});
			});
		},

		syncEventHeightUI: function(evt) {
			var instance = this;
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			var maxVisibleDate = DateMath.clone(startDate);
			maxVisibleDate.setHours(24, 0, 0);

			var minutesOffset = DateMath.getMinutesOffset(
				instance.limitDate(endDate, maxVisibleDate), startDate);

			evt.get(NODE).item(0).set(OFFSET_HEIGHT, instance.calculateEventHeight(minutesOffset));

			var paddingNode = evt.get(NODE).item(1);

			if (paddingNode.inDoc()) {
				var paddingMinutesOffset = DateMath.getMinutesOffset(
					endDate, DateMath.toMidnight(evt.getClearEndDate()));

				paddingNode.set(OFFSET_HEIGHT, instance.calculateEventHeight(paddingMinutesOffset));
			}
		},

		syncEventTopUI: function(evt) {
			var instance = this;

			evt.get(NODE).item(0).setStyle(TOP,
				instance.calculateTop(evt.get(START_DATE)) + PX);
			evt.get(NODE).item(1).setStyle(TOP, 0);
		},

		syncHeaderViewUI: function() {
			var instance = this;

			if (instance.get(HEADER_VIEW)) {
				var headerView = instance[HEADER_VIEW];

				headerView.plotEvents();

				var headerViewBB = headerView.get(BOUNDING_BOX);

				headerViewBB.setStyle(MARGIN_RIGHT, getScrollbarWidth());

				var headerViewData = headerViewBB.one(_DOT+CSS_SVT_TABLE_DATA);
				var height = Math.max(headerViewData.get(OFFSET_HEIGHT), 40);

				headerView.set(HEIGHT, height);

				instance._fillHeight();
			}
		},

		calculateYDelta: function(startXY, xy) {
			var instance = this;

			return (xy[1] - startXY[1])/(instance.get(HOUR_HEIGHT)/2)*30;
		},

		findEventIntersections: function(evt, events) {
			var instance = this;
			var group = [];

			A.Array.each(events, function(evtCmp) {
				if (!evt._filtered && evtCmp.get(VISIBLE) && evt.intersectHours(evtCmp)) {
					group.push(evtCmp);
				}
			});

			return group;
		},

		getXYDelta: function(event) {
			var instance = this;
			var xy = event.currentTarget.getXY(),
				pageXY = [event.pageX, event.pageY];

			return A.Array.map(xy, function(val, i) {
				return (pageXY[i] - val);
			});
		},

		getTickY: function() {
			var instance = this;

			return roundToNearestMultiple(
				Math.ceil(instance.get(HOUR_HEIGHT) / 2), 10);
		},

		roundToNearestHour: function(date, time) {
			var instance = this;

			date.setHours(
				time[0],
				roundToNearestMultiple(time[1], instance.getTickY()),
				time[2]);
		},

		_afterDragAlign: function(event) {
			var instance = this;
			var dd = event.target;

			if (!instance[START_XY]) {
				instance[START_XY] = dd.actXY;
			}

			dd.actXY[0] = null;
		},

		_dragTickAlignX: function(activeColumn) {
			var instance = this;
			var draggingEvent = instance[DRAGGING_EVENT];

			if (draggingEvent && !instance[RESIZING]) {
				var placeholder = instance[EVENT_PLACEHOLDER];
				var delta = toNumber(activeColumn.attr(DATA_COLNUMBER)) - instance.startColNumber;

				instance.draggingEventStartDate = DateMath.add(draggingEvent.get(START_DATE), DateMath.DAY, delta);

				var startDate = DateMath.clone(instance.draggingEventStartDate);

				DateMath.copyHours(startDate, placeholder.get(START_DATE));

				placeholder.move(startDate, { silent: true });

				instance.plotEvent(placeholder);
			}
		},

		_dragTickAlignY: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var recorder = scheduler.get(EVENT_RECORDER);

			var draggingEvent = instance[DRAGGING_EVENT];

			if (draggingEvent) {
				var dd = event.target.get(HOST);
				var placeholder = instance[EVENT_PLACEHOLDER];
				var delta = instance.calculateYDelta(instance[START_XY], dd.actXY);

				if (instance[RESIZING]) {
					var endDate = DateMath.add(instance.draggingEventEndDate, DateMath.MINUTES, delta);

					if (DateMath.getMinutesOffset(endDate, instance.draggingEventStartDate) < 30) {
						return;
					}

					placeholder.set(END_DATE, endDate, { silent: true });
				}
				else {
					placeholder.move(DateMath.add(instance.draggingEventStartDate, DateMath.MINUTES, delta), { silent: true });
				}

				instance.plotEvent(placeholder);
			}
		},

		_setupDragDrop: function() {
			var instance = this,
				placeholder = instance[EVENT_PLACEHOLDER];

			if (!placeholder) {
				var scheduler = instance.get(SCHEDULER);

				placeholder = new scheduler.eventModel({
					scheduler: scheduler
				});

				placeholder.removeTarget(scheduler);
				placeholder.get(NODE).addClass(CSS_SCHEDULER_EVENT_PROXY);
				placeholder.set(VISIBLE, false, { silent: true });
				instance[EVENT_PLACEHOLDER] = placeholder;
			}

			if (!instance.delegate) {
				instance.delegate = new A.DD.Delegate(
					instance.get(DELEGATE_CONFIG));
			}

			var dd = instance.delegate.dd;

			dd.unplug(A.Plugin.DDConstrained);
			dd.unplug(A.Plugin.DDNodeScroll);

			var region = instance.bodyNode.get(REGION);

			region.bottom = Infinity;
			region.top = -Infinity;

			dd.plug(A.Plugin.DDConstrained, {
				bubbleTargets: instance,
				constrain: region,
				stickY: true,
				tickY: instance.get(HOUR_HEIGHT) / 2
			});

			dd.plug(A.Plugin.DDNodeScroll, {
				node: instance.bodyNode,
				scrollDelay: 150
			});
		},

		_uiSetDate: function(val) {
			var instance = this;

			instance.syncColumnsUI();
			instance.syncDaysHeaderUI();
		},

		_onClickDaysHeader: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			if (event.target.test(_ANCHOR)) {
				var dayView = scheduler.getViewByName(DAY);

				if (dayView) {
					var colNumber = toNumber(event.currentTarget.attr(DATA_COLNUMBER));

					scheduler.set(DATE, instance.getDateByColumn(colNumber));
					scheduler.set(ACTIVE_VIEW, dayView);
				}
			}

			event.preventDefault();
		},

		_onEventDragEnd: function(event) {
			var instance = this;
			var draggingEvent = instance[DRAGGING_EVENT];

			if (draggingEvent) {
				var placeholder = instance[EVENT_PLACEHOLDER];

				placeholder.set(VISIBLE, false, { silent: true });
				draggingEvent.set(VISIBLE, true, { silent: true });
				draggingEvent.copyDates(placeholder);

				instance.get(SCHEDULER).syncEventsUI();
			}

			instance[START_XY] = null;
			instance[DRAGGING_EVENT] = null;
		},

		_onEventDragStart: function(event) {
			var instance = this;
			var draggingEvent = instance[DRAGGING_EVENT] = instance.delegate.dd.get(NODE).getData(SCHEDULER_EVENT);

			if (draggingEvent) {
				var placeholder = instance[EVENT_PLACEHOLDER];

				placeholder.copyPropagateAttrValues(draggingEvent, null, { silent: true });

				instance.plotEvent(placeholder);

				draggingEvent.set(VISIBLE, false, { silent: true });

				instance.draggingEventStartDate = DateMath.clone(draggingEvent.get(START_DATE));
				instance.draggingEventEndDate = DateMath.clone(draggingEvent.get(END_DATE));

				var startColumn = instance.getColumnByDate(draggingEvent.get(START_DATE));

				instance.startColNumber = startColumn ? toNumber(startColumn.attr(DATA_COLNUMBER)) : 0;
			}
		},

		_onMouseDownTableCol: function(event) {
			var instance = this;
			var target = event.target;
			var scheduler = instance.get(SCHEDULER);
			var recorder = scheduler.get(EVENT_RECORDER);

			if (recorder && !scheduler.get(DISABLED)) {
				recorder.hideOverlay();

				if (target.test(_DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM)) {
					instance[START_XY] = [ event.pageX, event.pageY ];

					var colNumber = toNumber(event.currentTarget.attr(DATA_COLNUMBER));
					var startDate = instance.getDateByColumn(colNumber);
					var clickLeftTop = instance.getXYDelta(event);

					instance.roundToNearestHour(
						startDate, instance.getYCoordTime(clickLeftTop[1]));

					var endDate = DateMath.add(startDate, DateMath.MINUTES, recorder.get(DURATION));

					recorder.move(startDate, { silent: true });

					recorder.setAttrs({
						allDay: false,
						endDate: endDate
					},
					{ silent: true });

					instance[CREATION_START_DATE] = startDate;

					event.halt();
				}
				else if (target.test(
							[ _DOT+CSS_SCHEDULER_VIEW_DAY_RESIZER,
								_DOT+CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON ].join(_COMMA))) {

					instance[RESIZING] = true;
				}
			}

			instance.get(BOUNDING_BOX).unselectable();
		},

		_onMouseEnterEvent: function(event) {
			var instance = this;
			var target = event.currentTarget;
			var evt = target.getData(SCHEDULER_EVENT);

			if (evt && !evt.get(DISABLED)) {
				instance[RESIZER_NODE].appendTo(target);
			}
		},

		_onMouseLeaveEvent: function(event) {
			var instance = this;

			if (!instance[RESIZING]) {
				instance._removeResizer();
			}
		},

		_onMouseMoveTableCol: function(event) {
			var instance = this;
			var activeColumn = event.currentTarget;
			var recorder = instance.get(SCHEDULER).get(EVENT_RECORDER);

			if (instance[ACTIVE_COLUMN] !== activeColumn) {
				instance[ACTIVE_COLUMN] = activeColumn;
				instance._dragTickAlignX(instance[ACTIVE_COLUMN]);
			}

			var creationStartDate = instance[CREATION_START_DATE];

			if (creationStartDate) {
				var delta = roundToNearestMultiple(
					instance.calculateYDelta(instance[START_XY], [ event.pageX, event.pageY ]),
					instance.getTickY()
				);

				var down = (delta >= instance._delta);

				if (instance._delta !== delta) {
					if (delta > 0) {
						var newDelta = down ? Math.max(delta, recorder.get(DURATION)) : delta;

						recorder.set(END_DATE, DateMath.add(creationStartDate, DateMath.MINUTES, newDelta), { silent: true });
					}
					else {
						recorder.set(START_DATE, DateMath.add(creationStartDate, DateMath.MINUTES, delta), { silent: true });
					}

					instance.plotEvent(recorder);

					instance._delta = delta;
				}
			}
		},

		_onMouseUpTableCol: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var recorder = scheduler.get(EVENT_RECORDER);

			if (recorder && !scheduler.get(DISABLED)) {
				if (instance[CREATION_START_DATE]) {
					instance.plotEvent(recorder);

					recorder.showOverlay([ event.pageX, event.pageY ]);
				}
			}

			instance[CREATION_START_DATE] = null;
			instance[RESIZING] = false;
			instance[START_XY] = null;

			instance._removeResizer();
			instance.get(BOUNDING_BOX).selectable();
		},

		_onSchedulerChange: function(event) {
			var instance = this;

			if (instance[HEADER_VIEW]) {
				instance[HEADER_VIEW].set(SCHEDULER, event.newVal);
			}
		},

		_removeResizer: function() {
			var instance = this;

			instance[RESIZER_NODE].remove();
		},

		_valueColDaysNode: function() {
			var instance = this;
			var days = instance.get(DAYS);
			var buffer = [], colNumber = 0;

			while (days--) {
				buffer.push(
					A.Lang.sub(TPL_SCHEDULER_VIEW_DAY_TABLE_COLDAY, {
						colNumber: colNumber++
					})
				);
			}

			return A.NodeList.create(buffer.join(_EMPTY_STR));
		},

		_valueColHeaderDaysNode: function() {
			var instance = this;
			var days = instance.get(DAYS);
			var buffer = [], colNumber = 0;

			buffer.push(TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST);

			while (days--) {
				buffer.push(
					A.Lang.sub(TPL_SCHEDULER_VIEW_DAY_HEADER_DAY, {
						colNumber: colNumber++
					})
				);
			}

			buffer.push(TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_PAD_RIGHT);

			return A.NodeList.create(buffer.join(_EMPTY_STR));
		},

		_valueMarkercellsNode: function() {
			var instance = this;
			var buffer = [], i;

			for (i = 0; i <= 23; i++) {
				buffer.push(TPL_SCHEDULER_VIEW_DAY_MARKERCELL);
			}

			return A.NodeList.create(buffer.join(_EMPTY_STR));
		},

		_valueTimesNode: function() {
			var instance = this;
			var isoTime = instance.get(ISO_TIME);
			var buffer = [], hour;

			for (hour = 0; hour <= 23; hour++) {
				buffer.push(
					Lang.sub(
						TPL_SCHEDULER_VIEW_DAY_TABLE_TIME,
						{
							hour: isoTime ? DateMath.toIsoTimeString(hour) : DateMath.toUsTimeString(hour, false, true)
						}
					)
				);
			}

			return A.NodeList.create(buffer.join(_EMPTY_STR));
		}
	}
});

A.SchedulerDayView = SchedulerDayView;

}, '@VERSION@' ,{skinnable:true, requires:['aui-scheduler-view-table','dd-drag','dd-delegate','dd-drop','dd-constrain']});
AUI.add('aui-scheduler-view-week', function(A) {
var Lang = A.Lang,
	isFunction = Lang.isFunction,

	_EMPTY_STR = '',
	M_DASH = '&mdash;',
	_SPACE = ' ',

	DateMath = A.DataType.DateMath,

	WEEK_LENGTH = DateMath.WEEK_LENGTH,

	SCHEDULER_VIEW_WEEK = 'scheduler-view-week',

	DATE = 'date',
	DAYS = 'days',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	LOCALE = 'locale',
	SCHEDULER = 'scheduler',
	WEEK = 'week';

var SchedulerWeekView = A.Component.create({
	NAME: SCHEDULER_VIEW_WEEK,

	ATTRS: {
		bodyContent: {
			value: _EMPTY_STR
		},

		days: {
			value: 7
		},

		headerViewConfig: {
			value: {
				displayDaysInterval: WEEK_LENGTH
			}
		},

		name: {
			value: WEEK
		},

		navigationDateFormatter: {
			valueFn: function() {
				return this._valueNavigationDateFormatter;
			},
			validator: isFunction
		}
	},

	EXTENDS: A.SchedulerDayView,

	prototype: {
		getAdjustedViewDate: function(val) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(val, firstDayOfWeek);
		},

		getNextDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var date = scheduler.get(DATE);
			var firstDayOfWeekDate = instance._firstDayOfWeek(date);

			return DateMath.add(firstDayOfWeekDate, DateMath.WEEK, 1);
		},

		getPrevDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var date = scheduler.get(DATE);
			var firstDayOfWeekDate = instance._firstDayOfWeek(date);

			return DateMath.subtract(firstDayOfWeekDate, DateMath.WEEK, 1);
		},

		getToday: function() {
			var instance = this;
			var todayDate = SchedulerWeekView.superclass.getToday.apply(this, arguments);

			return instance._firstDayOfWeek(todayDate);
		},

		_firstDayOfWeek: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
		},

		_valueNavigationDateFormatter: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var locale = scheduler.get(LOCALE);

			var startDate = instance._firstDayOfWeek(date);

			var startDateLabel = A.DataType.Date.format(
				startDate,
				{
					format: '%B %d',
					locale: locale
				}
			);

			var endDate = DateMath.add(startDate, DateMath.DAY, instance.get(DAYS) - 1);

			var endDateLabel = A.DataType.Date.format(
				endDate,
				{
					format: (DateMath.isMonthOverlapWeek(date) ? '%B %d' : '%d') + ', %Y',
					locale: locale
				}
			);

			return [startDateLabel, M_DASH, endDateLabel].join(_SPACE);
		}
	}
});

A.SchedulerWeekView = SchedulerWeekView;

}, '@VERSION@' ,{skinnable:true, requires:['aui-scheduler-view-day']});
AUI.add('aui-scheduler-view-table', function(A) {
var Lang = A.Lang,
	isFunction = Lang.isFunction,
	isString = Lang.isString,

	DateMath = A.DataType.DateMath,
	WidgetStdMod = A.WidgetStdMod,

	WEEK_LENGTH = DateMath.WEEK_LENGTH,

	_DASH = '-',
	_DOT = '.',
	_EMPTY_STR = '',
	_SPACE = ' ',

	SCHEDULER_VIEW = 'scheduler-view',
	SCHEDULER_VIEW_TABLE = 'scheduler-view-table',

	getNodeListHTMLParser = function(selector, sizeCondition) {
		return function(srcNode) {
			var nodes = srcNode.all(selector);
			return (nodes.size() >= sizeCondition) ? nodes : null;
		};
	},

	BODY = 'body',
	CLOSE = 'close',
	COL = 'col',
	COL_HEADER_DAYS_NODE = 'colHeaderDaysNode',
	COLGRID = 'colgrid',
	COLSPAN = 'colspan',
	COLUMN_DAY_HEADER = 'columnDayHeader',
	COLUMN_TABLE_GRID = 'columnTableGrid',
	CONTAINER = 'container',
	CONTENT = 'content',
	DATA = 'data',
	DAY = 'day',
	DISPLAY_DAYS_INTERVAL = 'displayDaysInterval',
	DISPLAY_ROWS = 'displayRows',
	DIV = 'div',
	DOWN = 'down',
	END_DATE = 'endDate',
	EVENT = 'event',
	EVENTS = 'events',
	EVENTS_OVERLAY = 'eventsOverlay',
	FILTER_FN = 'filterFn',
	FIRST = 'first',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	GRID = 'grid',
	HEADER = 'header',
	HEADER_DATE_FORMATTER = 'headerDateFormatter',
	HEADER_TABLE_NODE = 'headerTableNode',
	ICON = 'icon',
	LEFT = 'left',
	LOCALE = 'locale',
	MORE = 'more',
	NEXT = 'next',
	NODE = 'node',
	OVERLAY = 'overlay',
	RIGHT = 'right',
	ROW = 'row',
	ROWS_CONTAINER_NODE = 'rowsContainerNode',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'scheduler-event',
	SHOW_MORE = 'showMore',
	START_DATE = 'startDate',
	STRINGS = 'strings',
	TABLE = 'table',
	TABLE_GRID_NODE = 'tableGridNode',
	TABLE_ROW_CONTAINER = 'tableRowContainer',
	TABLE_ROWS = 'tableRows',
	TBODY = 'tbody',
	TITLE = 'title',
	TL = 'tl',
	TODAY = 'today',
	TR = 'tr',
	VIEW_DATE = 'viewDate',
	VISIBLE = 'visible',

	getCN = A.getClassName,

	CSS_ICON = getCN(ICON),
	CSS_ICON_ARROWSTOP_LEFT = getCN(ICON, 'arrowstop-1-l'),
	CSS_ICON_ARROWSTOP_RIGHT = getCN(ICON, 'arrowstop-1-r'),
	CSS_SVT_COLGRID = getCN(SCHEDULER_VIEW, TABLE, COLGRID),
	CSS_SVT_COLGRID_FIRST = getCN(SCHEDULER_VIEW, TABLE, COLGRID, FIRST),
	CSS_SVT_COLGRID_TODAY = getCN(SCHEDULER_VIEW, TABLE, COLGRID, TODAY),
	CSS_SVT_CONTAINER = getCN(SCHEDULER_VIEW, TABLE, CONTAINER),
	CSS_SVT_EVENTS_OVERLAY_NODE = getCN(SCHEDULER_VIEW, TABLE, EVENTS, OVERLAY, NODE),
	CSS_SVT_EVENTS_OVERLAY_NODE_BODY = getCN(SCHEDULER_VIEW, TABLE, EVENTS, OVERLAY, NODE, BODY),
	CSS_SVT_EVENTS_OVERLAY_NODE_CLOSE = getCN(SCHEDULER_VIEW, TABLE, EVENTS, OVERLAY, NODE, CLOSE),
	CSS_SVT_HEADER_COL = getCN(SCHEDULER_VIEW, TABLE, HEADER, COL),
	CSS_SVT_HEADER_DAY = getCN(SCHEDULER_VIEW, TABLE, HEADER, DAY),
	CSS_SVT_HEADER_TABLE = getCN(SCHEDULER_VIEW, TABLE, HEADER, TABLE),
	CSS_SVT_MORE = getCN(SCHEDULER_VIEW, TABLE, MORE),
	CSS_SVT_ROW = getCN(SCHEDULER_VIEW, TABLE, ROW),
	CSS_SVT_ROW_CONTAINER = getCN(SCHEDULER_VIEW, TABLE, ROW, CONTAINER),
	CSS_SVT_TABLE_DATA = getCN(SCHEDULER_VIEW, TABLE, DATA),
	CSS_SVT_TABLE_DATA_COL = getCN(SCHEDULER_VIEW, TABLE, DATA, COL),
	CSS_SVT_TABLE_DATA_COL_TITLE = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE),
	CSS_SVT_TABLE_DATA_COL_TITLE_DOWN = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE, DOWN),
	CSS_SVT_TABLE_DATA_COL_TITLE_FIRST = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE, FIRST),
	CSS_SVT_TABLE_DATA_COL_TITLE_NEXT = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE, NEXT),
	CSS_SVT_TABLE_DATA_COL_TITLE_TODAY = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE, TODAY),
	CSS_SVT_TABLE_DATA_EVENT = getCN(SCHEDULER_VIEW, TABLE, DATA, EVENT),
	CSS_SVT_TABLE_DATA_EVENT_LEFT = getCN(SCHEDULER_VIEW, TABLE, DATA, EVENT, LEFT),
	CSS_SVT_TABLE_DATA_EVENT_RIGHT = getCN(SCHEDULER_VIEW, TABLE, DATA, EVENT, RIGHT),
	CSS_SVT_TABLE_DATA_FIRST = getCN(SCHEDULER_VIEW, TABLE, DATA, FIRST),
	CSS_SVT_TABLE_GRID = getCN(SCHEDULER_VIEW, TABLE, GRID),
	CSS_SVT_TABLE_GRID_FIRST = getCN(SCHEDULER_VIEW, TABLE, GRID, FIRST),

	TPL_SVT_CONTAINER = '<div class="' + CSS_SVT_CONTAINER + '">' +
							'<div class="' + CSS_SVT_ROW_CONTAINER + '"></div>' +
						'</div>',

	TPL_SVT_EVENTS_OVERLAY_NODE =  '<div class="' + CSS_SVT_EVENTS_OVERLAY_NODE + '">' +
										'<div class="' + CSS_SVT_EVENTS_OVERLAY_NODE_BODY + '"></div>' +
										'<a href="javascript:;" class="' + CSS_SVT_EVENTS_OVERLAY_NODE_CLOSE + '">{label}</a>' +
									'</div>',

	TPL_SVT_GRID_COLUMN = '<td class="' + CSS_SVT_COLGRID + '">&nbsp;</td>',

	TPL_SVT_HEADER_DAY = '<th class="' + CSS_SVT_HEADER_DAY + '"><div>&nbsp;</div></th>',

	TPL_SVT_HEADER_TABLE = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVT_HEADER_TABLE + '">' +
								'<tbody>' +
									'<tr class="' + CSS_SVT_HEADER_COL + '"></tr>' +
								'</tbody>' +
							'</table>',

	TPL_SVT_MORE = '<a href="javascript:;" class="' + CSS_SVT_MORE + '">{label} {count}</a>',

	TPL_SVT_ROW = '<div class="' + CSS_SVT_ROW + '" style="top: {top}%; height: {height}%;"></div>',

	TPL_SVT_TABLE_DATA = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVT_TABLE_DATA + '">' +
								'<tbody></tbody>' +
						'</table>',

	TPL_SVT_TABLE_GRID = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVT_TABLE_GRID + '">' +
							'<tbody>' +
								'<tr></tr>' +
							'</tbody>' +
						'</table>',

	TPL_SVT_EV_ICON_LEFT = '<span class="' + [ CSS_ICON, CSS_ICON_ARROWSTOP_LEFT ].join(_SPACE) + '"></span>',
	TPL_SVT_EV_ICON_RIGHT = '<span class="' + [ CSS_ICON, CSS_ICON_ARROWSTOP_RIGHT ].join(_SPACE) + '"></span>',

	TPL_SVT_TABLE_DATA_COL = '<td class="' + CSS_SVT_TABLE_DATA_COL + '"><div></div></td>',
	TPL_SVT_TABLE_DATA_ROW = '<tr></tr>';

var SchedulerTableView = A.Component.create({
	NAME: SCHEDULER_VIEW_TABLE,

	ATTRS: {
		bodyContent: {
			value: _EMPTY_STR
		},

		displayDaysInterval: {
			value: 42
		},

		displayRows: {
			value: 4
		},

		fixedHeight: {
			value: true
		},

		name: {
			value: TABLE
		},

		headerDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(
					date,
					{
						format: '%A',
						locale: scheduler.get(LOCALE)
					}
				);
			},
			validator: isString
		},

		navigationDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(
					date,
					{
						format: '%b %Y',
						locale: scheduler.get(LOCALE)
					}
				);
			},
			validator: isFunction
		},

		scrollable: {
			value: false
		},

		strings: {
			value: {
				close: 'Close',
				showMore: 'Show more'
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		headerTableNode: {
			valueFn: function() {
				return A.Node.create(TPL_SVT_HEADER_TABLE);
			}
		},

		colHeaderDaysNode: {
			valueFn: '_valueColHeaderDaysNode'
		},

		rowsContainerNode: {
			valueFn: function() {
				return A.Node.create(TPL_SVT_CONTAINER);
			}
		},

		tableGridNode: {
			valueFn: '_valueTableGridNode'
		}
	},

	HTML_PARSER: {
		colHeaderDaysNode: getNodeListHTMLParser(_DOT+CSS_SVT_HEADER_DAY, 7),
		headerTableNode: _DOT+CSS_SVT_HEADER_TABLE,
		rowsContainerNode: _DOT+CSS_SVT_CONTAINER,
		tableGridNode: getNodeListHTMLParser(_DOT+CSS_SVT_TABLE_GRID, 7)
	},

	EXTENDS: A.SchedulerView,

	prototype: {
		evtDateStack: null,
		evtRenderedStack: null,
		rowDataTableStack: null,

		initializer: function() {
			var instance = this;

			instance.evtDateStack = {};
			instance.evtRenderedStack = {};
			instance.rowDataTableStack = {};

			instance[COL_HEADER_DAYS_NODE] = instance.get(COL_HEADER_DAYS_NODE);
			instance[HEADER_TABLE_NODE] = instance.get(HEADER_TABLE_NODE);
			instance[ROWS_CONTAINER_NODE] = instance.get(ROWS_CONTAINER_NODE);
			instance[TABLE_GRID_NODE] = instance.get(TABLE_GRID_NODE);
			instance[COLUMN_DAY_HEADER] = instance.headerTableNode.one(_DOT+CSS_SVT_HEADER_COL);
			instance[COLUMN_TABLE_GRID] = A.NodeList.create();
			instance[TABLE_ROW_CONTAINER] = instance[ROWS_CONTAINER_NODE].one(_DOT+CSS_SVT_ROW_CONTAINER);
			instance[TABLE_ROWS] = A.NodeList.create();
		},

		bindUI: function() {
			var instance = this;

			instance[ROWS_CONTAINER_NODE].delegate('click', A.bind(instance._onClickMore, instance), _DOT+CSS_SVT_MORE);
		},

		renderUI: function() {
			var instance = this,
				displayRowsCount = instance._getDisplayRowsCount(),
				rowIndex;

			for (rowIndex = 0; rowIndex < displayRowsCount; rowIndex++) {
				instance[TABLE_ROWS].push(
					instance.buildGridRowNode(rowIndex)
				);
			}

			instance._renderEventsOverlay();

			instance[COL_HEADER_DAYS_NODE].appendTo(instance[COLUMN_DAY_HEADER]);
			instance[TABLE_ROWS].appendTo(instance[TABLE_ROW_CONTAINER]);
		},

		buildEventsRow: function(rowStartDate, rowEndDate, rowDisplayIndex) {
			var instance = this;
			var displayRows = instance.get(DISPLAY_ROWS);

			var rowRenderedColumns = 0;
			var rowNode = A.Node.create(TPL_SVT_TABLE_DATA_ROW);

			instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
				if (rowRenderedColumns > index) {
					return;
				}

				var events = instance.getIntersectEvents(celDate);
				var evt = instance._getRenderableEvent(events, rowStartDate, rowEndDate, celDate);

				var evtColNode = A.Node.create(TPL_SVT_TABLE_DATA_COL);
				var evtNodeContainer = evtColNode.one(DIV);

				if ((displayRows < events.length) && (rowDisplayIndex === (displayRows - 1))) {
					var strings = instance.get(STRINGS);

					var showMoreEventsLink = A.Node.create(
						Lang.sub(
							TPL_SVT_MORE,
							{
								count: (events.length - (displayRows - 1)),
								label: strings[SHOW_MORE]
							}
						)
					);

					showMoreEventsLink.setData(EVENTS, events);

					evtNodeContainer.append(showMoreEventsLink);
				}
				else if (evt) {
					var evtSplitInfo = instance._getEvtSplitInfo(evt, celDate, rowStartDate, rowEndDate);

					evtColNode.attr(COLSPAN, evtSplitInfo.colspan);

					rowRenderedColumns += (evtSplitInfo.colspan - 1);

					instance._syncEventNodeContainerUI(evt, evtNodeContainer, evtSplitInfo);
					instance._syncEventNodeUI(evt, evtNodeContainer, celDate);

					var key = String(celDate.getTime());

					instance.evtRenderedStack[key].push(evt);
				}

				rowRenderedColumns++;

				rowNode.append(evtColNode);
			});

			return rowNode;
		},

		buildEventsTable: function(rowStartDate, rowEndDate) {
			var instance = this,
				displayRows = instance.get(DISPLAY_ROWS),
				intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart()),
				cacheKey = String(intervalStartDate.getTime()).concat(rowStartDate.getTime()).concat(rowEndDate.getTime()),
				rowDataTableNode = instance.rowDataTableStack[cacheKey],
				rowDisplayIndex;

			if (!rowDataTableNode) {
				rowDataTableNode = A.Node.create(TPL_SVT_TABLE_DATA);

				var tableBody = rowDataTableNode.one(TBODY);
				var titleRowNode = instance.buildEventsTitleRow(rowDataTableNode, rowStartDate, rowEndDate);

				tableBody.append(titleRowNode);

				for (rowDisplayIndex = 0; rowDisplayIndex < displayRows; rowDisplayIndex++) {
					var rowNode = instance.buildEventsRow(rowStartDate, rowEndDate, rowDisplayIndex);

					tableBody.append(rowNode);
				}

				instance.rowDataTableStack[cacheKey] = rowDataTableNode;
			}

			return rowDataTableNode;
		},

		buildEventsTitleRow: function(tableNode, rowStartDate, rowEndDate) {
			var instance = this;

			var titleRowNode = A.Node.create(TPL_SVT_TABLE_DATA_ROW);

			instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
				var colTitleNode = A.Node.create(TPL_SVT_TABLE_DATA_COL);

				colTitleNode
					.addClass(CSS_SVT_TABLE_DATA_COL_TITLE)
					.toggleClass(
						CSS_SVT_TABLE_DATA_COL_TITLE_FIRST,
						(index === 0)
					)
					.toggleClass(
						CSS_SVT_TABLE_DATA_COL_TITLE_TODAY,
						DateMath.isToday(celDate)
					)
					.toggleClass(
						CSS_SVT_TABLE_DATA_COL_TITLE_NEXT,
						DateMath.isToday(DateMath.subtract(celDate, DateMath.DAY, 1))
					)
					.toggleClass(
						CSS_SVT_TABLE_DATA_COL_TITLE_DOWN,
						DateMath.isToday(DateMath.subtract(celDate, DateMath.WEEK, 1))
					);

				titleRowNode.append(
					colTitleNode.setContent(celDate.getDate())
				);
			});

			return titleRowNode;
		},

		buildGridRowNode: function(rowIndex) {
			var instance = this;

			var displayRowsCount = instance._getDisplayRowsCount();
			var rowRelativeHeight = 100 / displayRowsCount;
			var tableGridNode = instance._getTableGridNode(rowIndex);

			var rowNode = A.Node.create(
				Lang.sub(
					TPL_SVT_ROW,
					{
						height: rowRelativeHeight,
						top: rowRelativeHeight * rowIndex
					}
				)
			);

			rowNode.append(
				tableGridNode.toggleClass(CSS_SVT_TABLE_GRID_FIRST, (rowIndex === 0))
			);

			return rowNode;
		},

		flushViewCache: function() {
			var instance = this;

			instance.evtDateStack = {};
			instance.evtRenderedStack = {};
			instance.rowDataTableStack = {};
		},

		getIntersectEvents: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			var key = String(date.getTime());

			if (!instance.evtDateStack[key]) {
				var events = scheduler.getIntersectEvents(date);

				instance.evtDateStack[key] = events.filter(
					instance.get(FILTER_FN)
				);
			}

			return instance.evtDateStack[key];
		},

		getNextDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);
			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return DateMath.add(viewDate, DateMath.DAY, displayDaysInterval);
		},

		getPrevDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);
			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return DateMath.subtract(viewDate, DateMath.DAY, displayDaysInterval);
		},

		hideEventsOverlay: function() {
			var instance = this;

			instance[EVENTS_OVERLAY].set(VISIBLE, false);
		},

		loopDates: function(startDate, endDate, fn, incrementBy, factor) {
			var instance = this;
			var curDate = DateMath.clone(startDate);
			var endDateMs = endDate.getTime();
			var index;

			for (index = 0; curDate.getTime() <= endDateMs; index++) {
				fn.apply(instance, [curDate, index]);

				curDate = DateMath.add(curDate, (incrementBy || DateMath.DAY), (factor || 1));
			}
		},

		plotEvents: function() {
			var instance = this;
			var intervalStartDate = instance._findCurrentIntervalStart();
			var startDateRef = DateMath.safeClearTime(intervalStartDate);

			instance.flushViewCache();

			instance.hideEventsOverlay();

			instance.bodyNode.all(_DOT+CSS_SVT_TABLE_DATA).remove();

			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
			var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

			instance[TABLE_ROWS].each(function(rowNode, index) {
				var rowStartDate = DateMath.add(startDateRef, DateMath.DAY, weekDaysCount * index);
				var rowEndDate = DateMath.add(rowStartDate, DateMath.DAY, weekDaysCount - 1);

				var tableNode = instance.buildEventsTable(rowStartDate, rowEndDate);

				if (index === 0) {
					tableNode.addClass(CSS_SVT_TABLE_DATA_FIRST);
				}

				rowNode.append(tableNode);
			});
		},

		syncDaysHeaderUI: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);
			var formatter = instance.get(HEADER_DATE_FORMATTER);
			var locale = instance.get(LOCALE);
			var firstDayOfWeekDt = instance._findFirstDayOfWeek(viewDate);

			instance.colHeaderDaysNode.all(DIV).each(
				function(columnNode, i) {
					var columnDate = DateMath.add(firstDayOfWeekDt, DateMath.DAY, i);

					columnNode.html(formatter.call(instance, columnDate));
				}
			);
		},

		syncGridUI: function() {
			var instance = this;
			var today = instance.getToday();
			var scheduler = instance.get(SCHEDULER);

			instance[COLUMN_TABLE_GRID].removeClass(CSS_SVT_COLGRID_TODAY);

			var intervalStartDate = instance._findCurrentIntervalStart();
			var intervalEndDate = instance._findCurrentIntervalEnd();

			if (DateMath.between(today, intervalStartDate, intervalEndDate)) {
				var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);
				var firstWeekDay = instance._findFirstDayOfWeek(today);

				var rowIndex = DateMath.getWeekNumber(today, firstDayOfWeek) - DateMath.getWeekNumber(intervalStartDate, firstDayOfWeek);
				var colIndex = (today.getDate() - firstWeekDay.getDate());
				var celIndex = instance._getCellIndex([colIndex, rowIndex]);

				var todayCel = instance[COLUMN_TABLE_GRID].item(celIndex);

				if (todayCel) {
					todayCel.addClass(CSS_SVT_COLGRID_TODAY);
				}
			}
		},

		syncStdContent: function() {
			var instance = this;

			instance.setStdModContent(
				WidgetStdMod.BODY, instance[ROWS_CONTAINER_NODE].getDOM());

			instance.setStdModContent(
				WidgetStdMod.HEADER, instance[HEADER_TABLE_NODE].getDOM());
		},

		_findCurrentIntervalEnd: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);
			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return DateMath.add(viewDate, DateMath.DAY, displayDaysInterval);
		},

		_findCurrentIntervalStart: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			return scheduler.get(VIEW_DATE);
		},

		_findFirstDayOfWeek: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
		},

		_getCellIndex: function(position) {
			var instance = this;

			return position[1] * WEEK_LENGTH + position[0];
		},

		_getDisplayRowsCount: function() {
			var instance = this;
			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return Math.ceil(displayDaysInterval / WEEK_LENGTH);
		},

		_getDisplayRowDaysCount: function() {
			var instance = this;
			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return Math.min(displayDaysInterval, WEEK_LENGTH);
		},

		_getEvtLabel: function(evt) {
			var instance = this;
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return [ startDate.getHours(), _DASH, endDate.getHours(), _SPACE, evt.get(CONTENT) ].join(_EMPTY_STR);
		},

		_getEvtSplitInfo: function(evt, celDate, rowStartDate, rowEndDate) {
			var instance = this;
			var startDate = evt.getClearStartDate();
			var endDate = evt.getClearEndDate();

			var maxColspan = DateMath.getDayOffset(rowEndDate, celDate);

			var info = {
				colspan: Math.min(DateMath.getDayOffset(endDate, celDate), maxColspan) + 1,
				left: DateMath.before(startDate, rowStartDate),
				right: DateMath.after(endDate, rowEndDate)
			};

			return info;
		},

		_getRenderableEvent: function(events, rowStartDate, rowEndDate, celDate) {
			var instance = this,
				key = String(celDate.getTime()),
				i;

			if (!instance.evtRenderedStack[key]) {
				instance.evtRenderedStack[key] = [];
			}

			for (i = 0; i < events.length; i++) {
				var evt = events[i];

				var startDate = evt.get(START_DATE);

				var isEventDateContinuation = DateMath.after(celDate, startDate) && !DateMath.isDayOverlap(celDate, rowStartDate);
				var isEventStartDateDay = !DateMath.isDayOverlap(startDate, celDate);

				var isRendered = A.Array.indexOf(instance.evtRenderedStack[key], evt) > -1;

				if (!isRendered && (isEventStartDateDay || isEventDateContinuation)) {
					return evt;
				}
			}

			return null;
		},

		_getTableGridNode: function(rowIndex) {
			var instance = this,
				displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL),
				tableGridNode = instance[TABLE_GRID_NODE].item(rowIndex),
				firstRowNode = tableGridNode.one(TR),
				i;

			for (i = 0; i < Math.min(displayDaysInterval, WEEK_LENGTH); i++) {
				var columnNode = A.Node.create(TPL_SVT_GRID_COLUMN);

				firstRowNode.append(columnNode);

				if (i === 0) {
					columnNode.addClass(CSS_SVT_COLGRID_FIRST);
				}

				instance[COLUMN_TABLE_GRID].push(columnNode);
			}

			return tableGridNode;
		},

		_onClickMore: function(event) {
			var instance = this;

			var target = event.target;
			var events = target.getData(EVENTS);
			var eventsNodeList = A.NodeList.create();

			A.Array.each(events, function(evt) {
				var evtNode = evt.get(NODE).item(0).clone();

				evtNode.setData(SCHEDULER_EVENT, evt);

				evtNode.setStyles({
					height: 'auto',
					left: 0,
					position: 'relative',
					top: 0,
					width: 'auto'
				});

				eventsNodeList.push(evtNode);
			});

			instance[EVENTS_OVERLAY].bodyNode.one(_DOT+CSS_SVT_EVENTS_OVERLAY_NODE_BODY).setContent(eventsNodeList);

			instance[EVENTS_OVERLAY].setAttrs({
				visible: true,
				xy: target.getXY()
			});
		},

		_renderEventsOverlay: function() {
			var instance = this;
			var strings = instance.get(STRINGS);

			instance[EVENTS_OVERLAY] = new A.Overlay({
				align: {
					points: [ TL, TL ]
				},
				bodyContent: Lang.sub(
					TPL_SVT_EVENTS_OVERLAY_NODE,
					{
						label: strings[CLOSE]
					}
				),
				render: instance[ROWS_CONTAINER_NODE],
				visible: false,
				width: 250,
				zIndex: 450
			});

			instance[EVENTS_OVERLAY].bodyNode.delegate('click', A.bind(instance.hideEventsOverlay, instance), _DOT+CSS_SVT_EVENTS_OVERLAY_NODE_CLOSE);
		},

		_syncEventNodeContainerUI: function(evt, node, evtSplitInfo) {
			var instance = this;

			node.addClass(CSS_SVT_TABLE_DATA_EVENT);

			if (evtSplitInfo.left) {
				node.addClass(CSS_SVT_TABLE_DATA_EVENT_LEFT).prepend(TPL_SVT_EV_ICON_LEFT);
			}

			if (evtSplitInfo.right) {
				node.addClass(CSS_SVT_TABLE_DATA_EVENT_RIGHT).append(TPL_SVT_EV_ICON_RIGHT);
			}
		},

		_syncEventNodeUI: function(evt, container, celDate) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			var evtNodeList = evt.get(NODE);
			var startDate = evt.get(START_DATE);

			var intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart());
			var startDateFirstDayOfWeek = DateMath.getFirstDayOfWeek(new Date(Math.max(startDate, intervalStartDate)), firstDayOfWeek);
			var paddingNodeIndex = Math.floor(DateMath.getDayOffset(celDate, startDateFirstDayOfWeek) / WEEK_LENGTH);

			if (evtNodeList.size() <= paddingNodeIndex) {
				evt.addPaddingNode();
			}

			var evtNode = evtNodeList.item(paddingNodeIndex);

			evtNode.setStyles({
				height: 'auto',
				left: 0,
				top: 0,
				width: 'auto'
			});

			evtNode.appendTo(container);

			evt.syncUI();
		},

		_uiSetDate: function(val) {
			var instance = this;

			instance.syncDaysHeaderUI();
			instance.syncGridUI();
		},

		_valueColHeaderDaysNode: function() {
			var instance = this;

			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
			var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

			return instance._valueNodeList(weekDaysCount, TPL_SVT_HEADER_DAY);
		},

		_valueTableGridNode: function() {
			var instance = this;

			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
			var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

			return instance._valueNodeList(weekDaysCount, TPL_SVT_TABLE_GRID);
		},

		_valueNodeList: function(size, tpl) {
			var instance = this;
			var buffer = [];

			while (size--) {
				buffer.push(tpl);
			}

			return A.NodeList.create(buffer.join(_EMPTY_STR));
		}
	}
});

A.SchedulerTableView = SchedulerTableView;

}, '@VERSION@' ,{skinnable:true, requires:['aui-scheduler-base','overlay']});
AUI.add('aui-scheduler-view-table-dd', function(A) {
var Lang = A.Lang,
	isObject = Lang.isObject,

	DateMath = A.DataType.DateMath,

	WEEK_LENGTH = DateMath.WEEK_LENGTH,

	_DOT = '.',

	SCHEDULER_EVENT = 'scheduler-event',
	SCHEDULER_VIEW = 'scheduler-view',

	BOUNDING_BOX = 'boundingBox',
	COL = 'col',
	COLGRID = 'colgrid',
	CONTENT = 'content',
	DATA = 'data',
	DD = 'dd',
	DELEGATE = 'delegate',
	DELEGATE_CONFIG = 'delegateConfig',
	DISABLED = 'disabled',
	DISPLAY_DAYS_INTERVAL = 'displayDaysInterval',
	DRAG_NODE = 'dragNode',
	DRAGGING = 'dragging',
	DRAGGING_EVENT = 'draggingEvent',
	EVENT_RECORDER = 'eventRecorder',
	LASSO = 'lasso',
	NODE = 'node',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	PROXY = 'proxy',
	PROXY_NODE = 'proxyNode',
	REGION = 'region',
	ROWS_CONTAINER_NODE = 'rowsContainerNode',
	SCHEDULER = 'scheduler',
	START_DATE = 'startDate',
	TABLE = 'table',
	VISIBLE = 'visible',

	getCN = A.getClassName,

	CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
	CSS_SCHEDULER_EVENT_DISABLED = getCN(SCHEDULER_EVENT, DISABLED),

	CSS_SVT_COLGRID = getCN(SCHEDULER_VIEW, TABLE, COLGRID),
	CSS_SVT_DRAGGING = getCN(SCHEDULER_VIEW, TABLE, DRAGGING),
	CSS_SVT_LASSO = getCN(SCHEDULER_VIEW, TABLE, LASSO),
	CSS_SVT_PROXY_NODE = getCN(SCHEDULER_VIEW, TABLE, PROXY, NODE),
	CSS_SVT_TABLE_DATA_COL = getCN(SCHEDULER_VIEW, TABLE, DATA, COL),

	TPL_SVT_LASSO = '<div class="' + CSS_SVT_LASSO + '"></div>',
	TPL_SVT_PROXY_NODE = '<div class="' + CSS_SVT_PROXY_NODE + '"></div>';

A.SchedulerTableViewDD = function() {};

A.SchedulerTableViewDD.ATTRS = {

	delegateConfig: {
		value: {},
		setter: function(val) {
			var instance = this;

			return A.merge(
				{
					dragConfig: {
						offsetNode: false,
						useShim: false
					},
					bubbleTargets: instance,
					container: instance.get(BOUNDING_BOX),
					nodes: _DOT+CSS_SCHEDULER_EVENT,
					invalid: 'input, select, button, a, textarea, ' + _DOT+CSS_SCHEDULER_EVENT_DISABLED
				},
				val || {}
			);
		},
		validator: isObject
	}

};

A.mix(A.SchedulerTableViewDD.prototype, {

	initializer: function() {
		var instance = this;

		instance[PROXY_NODE] = A.Node.create(TPL_SVT_PROXY_NODE);

		instance.after(instance.viewDDBindUI, instance, 'bindUI');
		instance.after(instance.viewDDRenderUI, instance, 'renderUI');
		instance.after(instance.viewDDSyncUI, instance, 'syncUI');
	},

	viewDDBindUI: function() {
		var instance = this;
		var recorder = instance.get(SCHEDULER).get(EVENT_RECORDER);

		if (recorder) {
			recorder.on({
				cancel: A.bind(instance.removeLasso, instance),
				save: A.bind(instance.removeLasso, instance)
			});
		}

		instance[ROWS_CONTAINER_NODE].on({
			mousedown: A.bind(instance._onMouseDownGrid, instance),
			mousemove: A.bind(instance._onMouseMoveGrid, instance),
			mouseup: A.bind(instance._onMouseUpGrid, instance)
		});

		instance.after('drag:align', instance._afterDragAlign);
		instance.on('drag:end', instance._onEventDragEnd);
		instance.on('drag:start', instance._onEventDragStart);
	},

	viewDDRenderUI: function() {
		var instance = this;

	},

	viewDDSyncUI: function() {
		var instance = this;

		instance._setupDragDrop();
	},

	removeLasso: function() {
		var instance = this;

		if (instance[LASSO]) {
			instance[LASSO].remove();
		}
	},

	removeProxy: function() {
		var instance = this;

		if (instance[PROXY_NODE]) {
			instance[PROXY_NODE].remove();
		}
	},

	renderLasso: function(startPos, endPos) {
		var instance = this;

		var minPos = startPos;
		var maxPos = endPos;

		if (startPos[1] > endPos[1]) {
			minPos = endPos;
			maxPos = startPos;
		}

		var imin = minPos[0], jmin = minPos[1],
			imax = maxPos[0], jmax = maxPos[1],
			j;

		instance.removeLasso();

		instance.lasso = A.NodeList.create();

		for (j = jmin; j <= jmax; j++) {
			var h = instance.gridCellHeight,
				w = instance.gridCellWidth,
				x = 0,
				y = (h * j);

			if (j === jmin) {
				if (jmin === jmax) {
					x += Math.min(imin, imax) * w;
					w *= Math.abs(imax - imin) + 1;
				}
				else {
					x += imin * w;
					w *= WEEK_LENGTH - imin;
				}
			}
			else if (j === jmax) {
				w *= imax + 1;
			}
			else {
				w *= WEEK_LENGTH;
			}

			var lassoNode = A.Node.create(TPL_SVT_LASSO);

			instance.lasso.push(lassoNode);

			instance[ROWS_CONTAINER_NODE].append(lassoNode);
			lassoNode.sizeTo(w, h);
			lassoNode.setXY(instance._offsetXY([x, y], 1));
		}
	},

	_afterDragAlign: function(event) {
		var instance = this;
		var dd = event.target;

		var bodyRegion = instance.bodyNode.get(REGION);

		var mouseRegion = {
			bottom: event.pageY,
			left: event.pageX,
			right: event.pageX,
			top: event.pageY
		};

		if (!A.DOM.inRegion(null, bodyRegion, true, mouseRegion)) {
			return;
		}

		var draggingEvent = instance[DRAGGING_EVENT];
		var eventXY = [event.pageX, event.pageY];
		var position = instance._findPosition(instance._offsetXY(eventXY, -1));

		if (draggingEvent && instance._hasLassoChanged(position)) {
			instance.lassoLastPosition = position;

			var endPositionDate = DateMath.add(
				instance._getPositionDate(position),
				DateMath.MINUTES,
				draggingEvent.getMinutesDuration()
			);

			instance.renderLasso(position, instance._getDatePosition(endPositionDate));
		}
	},

	_findPosition: function(xy) {
		var instance = this;

		var i = Math.floor(xy[0] / instance.gridCellWidth);
		var j = Math.floor(xy[1] / instance.gridCellHeight);

		return [i, j];
	},

	_getDatePosition: function(date) {
		var instance = this;

		var intervalStartDate = instance._findCurrentIntervalStart();
		var offset = DateMath.getDayOffset(date, intervalStartDate);

		var position = [];

		position[1] = Math.floor(offset / WEEK_LENGTH);
		position[0] = offset % WEEK_LENGTH;

		return position;
	},

	_getPositionDate: function(position) {
		var instance = this;
		var intervalStartDate = instance._findCurrentIntervalStart();
		var startDateRef = DateMath.safeClearTime(instance._findFirstDayOfWeek(intervalStartDate));

		var date = DateMath.add(startDateRef, DateMath.DAY, instance._getCellIndex(position));

		date.setHours(0, 0, 0, 0);

		return date;
	},

	_hasLassoChanged: function(position) {
		var instance = this;

		var lassoLastPosition = instance.lassoLastPosition || instance.lassoStartPosition;

		return lassoLastPosition && ((position[0] !== lassoLastPosition[0]) || (position[1] !== lassoLastPosition[1]));
	},

	_offsetXY: function(xy, sign) {
		var instance = this;
		var offsetXY = instance[ROWS_CONTAINER_NODE].getXY();

		return [ xy[0] + offsetXY[0]*sign, xy[1] + offsetXY[1]*sign ];
	},

	_onEventDragEnd: function(event) {
		var instance = this;
		var draggingEvent = instance[DRAGGING_EVENT];

		if (draggingEvent) {
			var positionDate = instance._getPositionDate(instance.lassoLastPosition);

			DateMath.copyHours(positionDate, draggingEvent.get(START_DATE));
			draggingEvent.move(positionDate);
			draggingEvent.set(VISIBLE, true, { silent: true });

			instance[ROWS_CONTAINER_NODE].removeClass(CSS_SVT_DRAGGING).unselectable();

			event.target.set(DRAG_NODE, instance.originalDragNode);

			instance.removeLasso();
			instance.removeProxy();

			instance.get(SCHEDULER).syncEventsUI();
		}

		instance[DRAGGING_EVENT] = null;
	},

	_onEventDragStart: function(event) {
		var instance = this;
		var draggingEvent = instance[DRAGGING_EVENT] = instance[DELEGATE][DD].get(NODE).getData(SCHEDULER_EVENT);

		if (draggingEvent) {
			instance._syncCellDimensions();

			var eventXY = [event.pageX, event.pageY];

			var startPosition = instance._findPosition(instance._offsetXY(eventXY, -1));

			var endPositionDate = DateMath.add(
				instance._getPositionDate(startPosition),
				DateMath.MINUTES,
				draggingEvent.getMinutesDuration()
			);

			instance.renderLasso(startPosition, instance._getDatePosition(endPositionDate));

			draggingEvent.set(VISIBLE, false, { silent: true });

			instance._syncProxyNodeUI(draggingEvent);

			instance.lassoStartPosition = instance.lassoLastPosition = startPosition;

			instance[ROWS_CONTAINER_NODE].addClass(CSS_SVT_DRAGGING).unselectable();

			instance.originalDragNode = event.target.get(DRAG_NODE);

			event.target.set(DRAG_NODE, instance[PROXY_NODE]);
		}
	},

	_onMouseDownGrid: function(event) {
		var instance = this;
		var scheduler = instance.get(SCHEDULER);
		var recorder = scheduler.get(EVENT_RECORDER);
		var target = event.target;

		if (recorder && target.test([_DOT+CSS_SVT_COLGRID, _DOT+CSS_SVT_TABLE_DATA_COL].join())) {
			instance._recording = true;

			instance._syncCellDimensions();

			var eventXY = instance._offsetXY([event.pageX, event.pageY], -1);

			instance.lassoStartPosition = instance.lassoLastPosition = instance._findPosition(eventXY);

			instance.renderLasso(instance.lassoStartPosition, instance.lassoLastPosition);

			instance[ROWS_CONTAINER_NODE].unselectable();
		}
	},

	_onMouseMoveGrid: function(event) {
		var instance = this;
		var target = event.currentTarget;

		var eventXY = [event.pageX, event.pageY];
		var position = instance._findPosition(instance._offsetXY(eventXY, -1));

		if (instance._recording && instance._hasLassoChanged(position)) {
			instance.lassoLastPosition = position;

			instance.renderLasso(instance.lassoStartPosition, position);
		}
	},

	_onMouseUpGrid: function(event) {
		var instance = this;
		var scheduler = instance.get(SCHEDULER);
		var recorder = scheduler.get(EVENT_RECORDER);

		if (recorder && instance._recording && !scheduler.get(DISABLED)) {
			var startPositionDate = instance._getPositionDate(instance.lassoStartPosition);
			var endPositionDate = instance._getPositionDate(instance.lassoLastPosition);

			var startDate = new Date(Math.min(startPositionDate, endPositionDate));
			startDate.setHours(0, 0, 0);

			var endDate = new Date(Math.max(startPositionDate, endPositionDate));
			endDate.setHours(23, 59, 59);

			recorder.setAttrs({
				allDay: true,
				endDate: endDate,
				startDate: startDate
			},
			{ silent: true });

			recorder.showOverlay([event.pageX, event.pageY]);

			instance._recording = false;
		}
	},

	_setupDragDrop: function() {
		var instance = this;

		if (!instance[DELEGATE]) {
			instance[DELEGATE] = new A.DD.Delegate(
				instance.get(DELEGATE_CONFIG));
		}

		var dd = instance[DELEGATE][DD];

		dd.unplug(A.Plugin.DDConstrained);
		dd.unplug(A.Plugin.DDNodeScroll);
		dd.unplug(A.Plugin.DDProxy);

		dd.plug(A.Plugin.DDConstrained, {
			bubbleTargets: instance,
			constrain: instance.bodyNode
		});

		dd.plug(A.Plugin.DDNodeScroll, {
			node: instance.bodyNode,
			scrollDelay: 150
		});

		dd.plug(A.Plugin.DDProxy, {
			moveOnEnd: false,
			positionProxy: false
		});
	},

	_syncCellDimensions: function() {
		var instance = this;

		var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
		var displayRowsCount = Math.ceil(displayDaysInterval / WEEK_LENGTH);
		var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

		instance.gridCellHeight = instance[ROWS_CONTAINER_NODE].get(OFFSET_HEIGHT) / displayRowsCount;
		instance.gridCellWidth = instance[ROWS_CONTAINER_NODE].get(OFFSET_WIDTH) / weekDaysCount;
	},

	_syncProxyNodeUI: function(evt) {
		var instance = this;

		var eventNode = evt.get(NODE).item(0);

		instance[PROXY_NODE].setStyles({
			backgroundColor: eventNode.getStyle('backgroundColor'),
			display: 'block',
			width: '200px'
		});

		instance[PROXY_NODE].appendTo(instance[ROWS_CONTAINER_NODE]);
		instance[PROXY_NODE].setContent(evt.get(CONTENT));
	}
});

A.Base.mix(A.SchedulerTableView, [ A.SchedulerTableViewDD ]);

}, '@VERSION@' ,{skinnable:false, requires:['aui-scheduler-view-table','dd-drag','dd-delegate','dd-drop','dd-constrain']});
AUI.add('aui-scheduler-view-month', function(A) {
var Lang = A.Lang,
	isFunction = Lang.isFunction,

	DateMath = A.DataType.DateMath,

	_DOT = '.',

	COL = 'col',
	DATA = 'data',
	DATE = 'date',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	LOCALE = 'locale',
	MONTH = 'month',
	NOMONTH = 'nomonth',
	SCHEDULER = 'scheduler',
	TABLE = 'table',
	TABLE_ROW_CONTAINER = 'tableRowContainer',
	TITLE = 'title',
	VIEW_DATE = 'viewDate',

	SCHEDULER_VIEW = 'scheduler-view',
	SCHEDULER_VIEW_MONTH = 'scheduler-view-month',

	getCN = A.getClassName,

	CSS_SVM_TABLE_DATA_COL_NOMONTH = getCN(SCHEDULER_VIEW_MONTH, TABLE, DATA, COL, NOMONTH),
	CSS_SVT_TABLE_DATA_COL_TITLE = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE);

var SchedulerMonthView = A.Component.create({
	NAME: SCHEDULER_VIEW_MONTH,

	ATTRS: {
		displayDaysInterval: {
			readOnly: true,
			value: 42
		},

		name: {
			value: MONTH
		},

		navigationDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(
					date,
					{
						format: '%B %Y',
						locale: scheduler.get(LOCALE)
					}
				);
			},
			validator: isFunction
		}
	},

	EXTENDS: A.SchedulerTableView,

	prototype: {
		getAdjustedViewDate: function(val) {
			var instance = this;

			return DateMath.findMonthStart(val);
		},

		getNextDate: function() {
			var instance = this;

			var scheduler = instance.get(SCHEDULER);
			var date = scheduler.get(DATE);

			return DateMath.add(date, DateMath.MONTH, 1);
		},

		getPrevDate: function() {
			var instance = this;

			var scheduler = instance.get(SCHEDULER);
			var date = scheduler.get(DATE);

			return DateMath.subtract(date, DateMath.MONTH, 1);
		},

		plotEvents: function() {
			var instance = this;

			A.SchedulerMonthView.superclass.plotEvents.apply(instance, arguments);

			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);

			var monthEnd = DateMath.findMonthEnd(viewDate);
			var monthStart = DateMath.findMonthStart(viewDate);

			var currentIntervalStart = instance._findCurrentIntervalStart();

			var colTitleNodes = instance[TABLE_ROW_CONTAINER].all(_DOT+CSS_SVT_TABLE_DATA_COL_TITLE);

			colTitleNodes.each(function(colTitleNode, index) {
				var celDate = DateMath.add(currentIntervalStart, DateMath.DAY, index);

				if (DateMath.before(celDate, monthStart) || DateMath.after(celDate, monthEnd)) {
					colTitleNode.addClass(CSS_SVM_TABLE_DATA_COL_NOMONTH);
				}
			});
		},

		_findCurrentIntervalStart: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);

			return instance._findFirstDayOfWeek(viewDate);
		},

		_findFirstDayOfWeek: function(date) {
			var instance = this;

			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
		}

	}
});

A.SchedulerMonthView = SchedulerMonthView;

}, '@VERSION@' ,{skinnable:true, requires:['aui-scheduler-view-table']});
AUI.add('aui-scheduler-view-agenda', function(A) {
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
	HELPER = 'helper',
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
	CSS_HELPER_CLEAR_FIX = getCN(HELPER, CLEARFIX),
	CSS_METAL = getCN(SCHEDULER_VIEW_AGENDA, METAL),

	TPL_CONTAINER = '<div class="' + CSS_CONTAINER + '">{content}</div>',

	TPL_EVENTS_HEADER = '<div class="' + [ CSS_HEADER, CSS_METAL, CSS_HELPER_CLEAR_FIX ].join(_SPACE) + ' {firstClassName} {lastClassName}">' +
								'<div class="' + CSS_HEADER_DAY + '">{day}</div>' +
								'<a href="javascript:;" class="' + CSS_HEADER_EXTRA + '" data-timestamp="{timestamp}">{extra}</a>' +
							'</div>',

	TPL_EVENTS_CONTAINER = '<div class="' + CSS_EVENTS + '">{content}</div>',

	TPL_EVENT = '<div class="' + [ CSS_EVENT, CSS_HELPER_CLEAR_FIX ].join(_SPACE) + ' {firstClassName} {lastClassName} {eventClassName}" data-clientId="{clientId}">' +
					'<div class="' + CSS_EVENT_COLOR + '" style="background-color: {color};"></div>' +
					'<div class="' + CSS_EVENT_CONTENT + '">{content}</div>' +
					'<div class="' + CSS_EVENT_DATES + '">{dates}</div>' +
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
			value: _formatter('%B %e')
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
				noEvents: 'No future events.'
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

				timestamp = A.Lang.toInt(currentTarget.getData(TIMESTAMP)) || Date.now(),

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
AUI.add('aui-scheduler-event-recorder', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isUndefined = Lang.isUndefined,

	_serialize = A.IO.prototype._serialize,

	toInt = Lang.toInt,

	clamp = function(value, min, max) {
		return Math.min(Math.max(value, min), max);
	},

	DateMath = A.DataType.DateMath,

	_DASH = '-',
	_DOT = '.',
	_SPACE = ' ',

	SCHEDULER_EVENT = 'scheduler-event',
	SCHEDULER_EVENT_RECORDER = 'scheduler-event-recorder',

	ACTIVE_VIEW = 'activeView',
	ARROW = 'arrow',
	BODY = 'body',
	BODY_CONTENT = 'bodyContent',
	BORDER_RADIUS = 'borderRadius',
	BOUNDING_BOX = 'boundingBox',
	CANCEL = 'cancel',
	CLICK = 'click',
	CONSTRAIN = 'constrain',
	CONTENT = 'content',
	DATE = 'date',
	DATE_FORMAT = 'dateFormat',
	DELETE = 'delete',
	END_DATE = 'endDate',
	EVENT = 'event',
	FOOTER_CONTENT = 'footerContent',
	FORM = 'form',
	HEADER = 'header',
	ISO_TIME = 'isoTime',
	NODE = 'node',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OVERLAY = 'overlay',
	OVERLAY_OFFSET = 'overlayOffset',
	PX = 'px',
	RECORDER = 'recorder',
	RENDERED = 'rendered',
	REGION = 'region',
	RIGHT = 'right',
	SAVE = 'save',
	SCHEDULER = 'scheduler',
	SCHEDULER_CHANGE = 'schedulerChange',
	SHADOW = 'shadow',
	START_DATE = 'startDate',
	STRINGS = 'strings',
	SUBMIT = 'submit',
	TEMPLATE = 'template',
	TITLE = 'title',
	TOOLBAR = 'toolbar',
	TOP = 'top',
	VISIBLE_CHANGE = 'visibleChange',

	getCN = A.getClassName,

	CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
	CSS_SCHEDULER_EVENT_TITLE = getCN(SCHEDULER_EVENT, TITLE),

	CSS_SCHEDULER_EVENT_RECORDER = getCN(SCHEDULER_EVENT, RECORDER),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_TOP = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW, TOP),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_SHADOW = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW, SHADOW),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_BODY = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, BODY),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_CONTENT = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, CONTENT),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_DATE = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, DATE),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_FORM = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, FORM),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_HEADER = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, HEADER),

	TPL_OVERLAY_BODY_CONTENT = new A.Template(
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_SHADOW, ' ', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW, '"></div>',
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW, '"></div>',
		'<input type="hidden" name="startDate" value="{startDate}" />',
		'<input type="hidden" name="endDate" value="{endDate}" />',
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_HEADER, '">',
			'<input class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_CONTENT, '" name="content" value="{content}" />',
		'</div>',
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_BODY, '">',
			'<label class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_DATE, '">{date}</label>',
		'</div>'
	),

	TPL_OVERLAY_FORM = '<form class="' + CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_FORM + '" id="schedulerEventRecorderForm"></form>';

var SchedulerEventRecorder = A.Component.create({
	NAME: SCHEDULER_EVENT_RECORDER,

	ATTRS: {
		allDay: {
			value: false
		},

		content: {
		},

		duration: {
			value: 60
		},

		dateFormat: {
			validator: isString,
			value: '%a, %B %d,'
		},

		event: {
		},

		eventClass: {
			valueFn: function() {
				return A.SchedulerEvent;
			}
		},

		strings: {
			value: {},
			setter: function(val) {
				return A.merge(
					{
						'delete': 'Delete',
						'description-hint': 'e.g., Dinner at Brian\'s',
						cancel: 'Cancel',
						description: 'Description',
						edit: 'Edit',
						save: 'Save',
						when: 'When'
					},
					val || {}
				);
			},
			validator: isObject
		},

		overlay: {
			validator: isObject,
			value: {
				constrain: true,
				visible: false,
				width: 300,
				zIndex: 500
			}
		},

		// See #2530972
		overlayOffset: {
			value: [15, -38],
			validator: isArray
		},

		template: {
			value: TPL_OVERLAY_BODY_CONTENT
		},

		toolbar: {
			setter: function(val) {
				var instance = this;
				var strings = instance.get(STRINGS);

				return A.merge({
					children: [
						{
							handler: A.bind(instance._handleSaveEvent, instance),
							label: strings[SAVE]
						},
						{
							handler: A.bind(instance._handleCancelEvent, instance),
							label: strings[CANCEL]
						},
						{
							handler: A.bind(instance._handleDeleteEvent, instance),
							label: strings[DELETE]
						}
					]
				}, val || {});
			},
			validator: isObject,
			value: {}
		}
	},

	EXTENDS: A.SchedulerEvent,

	prototype: {

		initializer: function() {
			var instance = this;

			instance.get(NODE).addClass(CSS_SCHEDULER_EVENT_RECORDER);

			instance.publish('cancel', {
				defaultFn: instance._defCancelEventFn
			});

			instance.publish('delete', {
				defaultFn: instance._defDeleteEventFn
			});

			instance.publish('edit', {
				defaultFn: instance._defEditEventFn
			});

			instance.publish('save', {
				defaultFn: instance._defSaveEventFn
			});

			instance.after(SCHEDULER_CHANGE, instance._afterSchedulerChange);

			instance[OVERLAY] = new A.Overlay(instance.get(OVERLAY));
			instance[TOOLBAR] = new A.Toolbar(instance.get(TOOLBAR));

			instance[OVERLAY].on(VISIBLE_CHANGE, A.bind(instance._onOverlayVisibleChange, instance));
		},

		getOverlayContentNode: function() {
			var instance = this;
			var overlayBB = instance[OVERLAY].get(BOUNDING_BOX);

			return overlayBB.one(_DOT + CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_CONTENT);
		},

		getUpdatedSchedulerEvent: function(optAttrMap) {
			var instance = this,
				schedulerEvent = instance.get(EVENT),
				options = {
					silent: !schedulerEvent
				},
				formValues = instance.serializeForm();

			if (!schedulerEvent) {
				schedulerEvent = instance.clone();
			}

			schedulerEvent.set(SCHEDULER, instance.get(SCHEDULER), { silent: true });
			schedulerEvent.setAttrs(A.merge(formValues, optAttrMap), options);

			return schedulerEvent;
		},

		_afterSchedulerChange: function(event) {
			var instance = this;
			var scheduler = event.newVal;
			var schedulerBB = scheduler.get(BOUNDING_BOX);

			schedulerBB.delegate(CLICK, A.bind(instance._onClickSchedulerEvent, instance), _DOT + CSS_SCHEDULER_EVENT);
		},

		_defCancelEventFn: function(event) {
			var instance = this;

			instance.get(NODE).remove();

			instance.hideOverlay();
		},

		_defDeleteEventFn: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			scheduler.removeEvents(instance.get(EVENT));

			instance.hideOverlay();

			scheduler.syncEventsUI();
		},

		_defEditEventFn: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			instance.hideOverlay();

			scheduler.syncEventsUI();
		},

		_defSaveEventFn: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			scheduler.addEvents(event.newSchedulerEvent);

			instance.hideOverlay();

			scheduler.syncEventsUI();
		},

		_handleCancelEvent: function(event) {
			var instance = this;

			instance.fire('cancel');

			event.preventDefault();
		},

		_handleDeleteEvent: function(event) {
			var instance = this;

			instance.fire('delete', {
				schedulerEvent: instance.get(EVENT)
			});

			event.preventDefault();
		},

		_handleSaveEvent: function(event) {
			var instance = this,
				eventName = instance.get(EVENT) ? 'edit' : 'save';

			instance.fire(eventName, {
				newSchedulerEvent: instance.getUpdatedSchedulerEvent()
			});

			event.preventDefault();
		},

		_onClickSchedulerEvent: function(event) {
			var instance = this;
			var evt = event.currentTarget.getData(SCHEDULER_EVENT);

			if (evt) {
				instance.set(EVENT, evt, { silent: true });
				instance.showOverlay([event.pageX, event.pageY]);

				instance.get(NODE).remove();
			}
		},

		_onOverlayVisibleChange: function(event) {
			var instance = this;

			if (event.newVal) {
				instance.populateForm();

				if (!instance.get(EVENT)) {
					var overlayContentNode = instance.getOverlayContentNode();

					if (overlayContentNode) {
						setTimeout(function() {
							overlayContentNode.selectText();
						}, 0);
					}
				}
			}
			else {
				instance.set(EVENT, null, { silent: true });

				instance.get(NODE).remove();
			}
		},

		_onSubmitForm: function(event) {
			var instance = this;

			instance._handleSaveEvent(event);
		},

		_renderOverlay: function() {
			var instance = this;
			var strings = instance.get(STRINGS);

			instance[OVERLAY].render();
			instance[TOOLBAR].render();

			var overlayBB = instance[OVERLAY].get(BOUNDING_BOX);
			overlayBB.addClass(CSS_SCHEDULER_EVENT_RECORDER_OVERLAY);

			instance[OVERLAY].set(FOOTER_CONTENT, instance[TOOLBAR].get(BOUNDING_BOX));

			instance.formNode = A.Node.create(TPL_OVERLAY_FORM);

			instance[OVERLAY].set(BODY_CONTENT, instance.formNode);

			instance.formNode.on(SUBMIT, A.bind(instance._onSubmitForm, instance));
		},

		getFormattedDate: function() {
			var instance = this;
			var dateFormat = instance.get(DATE_FORMAT);
			var evt = (instance.get(EVENT) || instance);

			var endDate = evt.get(END_DATE);
			var scheduler = evt.get(SCHEDULER);
			var startDate = evt.get(START_DATE);
			var fmtHourFn = (scheduler.get(ACTIVE_VIEW).get(ISO_TIME) ? DateMath.toIsoTimeString : DateMath.toUsTimeString);

			return [ evt._formatDate(startDate, dateFormat), fmtHourFn(startDate), _DASH, fmtHourFn(endDate) ].join(_SPACE);
		},

		getTemplateData: function() {
			var instance = this,
				strings = instance.get(STRINGS),
				evt = instance.get(EVENT) || instance,
				content = evt.get(CONTENT);

			if (isUndefined(content)) {
				content = strings['description-hint'];
			}

			return {
				content: content,
				date: instance.getFormattedDate(),
				endDate: evt.get(END_DATE).getTime(),
				startDate: evt.get(START_DATE).getTime()
			};
		},

		hideOverlay: function() {
			var instance = this;

			instance[OVERLAY].hide();
		},

		populateForm: function() {
			var instance = this;

			instance.formNode.setContent(
				instance.get(TEMPLATE).parse(instance.getTemplateData())
			);
		},

		serializeForm: function() {
			var instance = this;

			return A.QueryString.parse(_serialize(instance.formNode.getDOM()));
		},

		showOverlay: function(xy) {
			var instance = this,
				originalXY = xy.concat([]),
				overlay = instance[OVERLAY],
				overlayBB = overlay.get(BOUNDING_BOX);

			if (!instance[OVERLAY].get(RENDERED)) {
				instance._renderOverlay();
			}

			overlay.show();

			var arrows = overlayBB.all(_DOT + CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW),
				firstArrow = arrows.item(0),
				firstArrowHeight = firstArrow.get(OFFSET_HEIGHT),
				firstArrowWidth = firstArrow.get(OFFSET_WIDTH);

			arrows.removeClass(CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_TOP).show();

			xy[0] -= overlayBB.get(OFFSET_WIDTH)*0.5;
			xy[1] -= overlayBB.get(OFFSET_HEIGHT) + firstArrowHeight*0.5;

			var constrainedXY = overlay.getConstrainedXY(xy);

			if (constrainedXY[1] !== xy[1]) {
				xy[1] = originalXY[1] + firstArrowHeight*0.5;

				arrows.addClass(CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_TOP);
			}

			xy = overlay.getConstrainedXY(xy);

			overlay.set('xy', xy);

			var arrowX = clamp(originalXY[0] - firstArrowWidth*0.5, xy[0], xy[0] + overlayBB.get(OFFSET_WIDTH));

			arrows.setX(arrowX);
		}
	}
});

A.SchedulerEventRecorder = SchedulerEventRecorder;

}, '@VERSION@' ,{skinnable:true, requires:['aui-scheduler-base','aui-template','aui-toolbar','io-form','querystring','overlay']});


AUI.add('aui-scheduler', function(A){}, '@VERSION@' ,{use:['aui-scheduler-base','aui-scheduler-view-day','aui-scheduler-view-week','aui-scheduler-view-table','aui-scheduler-view-table-dd','aui-scheduler-view-month','aui-scheduler-view-agenda','aui-scheduler-event-recorder'], skinnable:false});

