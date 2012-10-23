var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isDate = Lang.isDate,
	isFunction = Lang.isFunction,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,

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
			validator: isString
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