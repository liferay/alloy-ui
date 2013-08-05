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
	BORDER_COLOR_RGB = 'borderColorRGB',
	BORDER_STYLE = 'borderStyle',
	BORDER_WIDTH = 'borderWidth',
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
	TODAY_NODE = 'todayNode',
	TRIGGER_NODE = 'triggerNode',
	VIEW = 'view',
	VIEW_DATE_NODE = 'viewDateNode',
	VIEW_STACK = 'viewStack',
	VIEWS = 'views',
	VIEWS_NODE = 'viewsNode',
	VISIBLE = 'visible',
	RIGHT = 'right',
	ARROW = 'arrow',
	ACTIVE = 'active',
	CIRCLE = 'circle',
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
	CSS_ICON_CIRCLE_RIGHT = getCN(ICON, CIRCLE, ARROW, RIGHT),
	CSS_ICON_CIRCLE_LEFT = getCN(ICON, CIRCLE, ARROW, LEFT),
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

	TPL_SCHEDULER_CONTROLS = '<div class="'+CSS_SCHEDULER_CONTROLS+'"></div>',
	TPL_SCHEDULER_HD = '<div class="'+CSS_SCHEDULER_HD+'"></div>',
	TPL_SCHEDULER_ICON_NEXT = '<button type="button" class="'+[ CSS_SCHEDULER_ICON_NEXT, CSS_BTN ].join(_SPACE)+'">Next <i class="' + CSS_ICON_CIRCLE_RIGHT + '"></i></button>',
	TPL_SCHEDULER_ICON_PREV = '<button type="button" class="'+[ CSS_SCHEDULER_ICON_PREV, CSS_BTN ].join(_SPACE)+'"><i class="' + CSS_ICON_CIRCLE_LEFT + '"></i> Prev</button>',
	TPL_SCHEDULER_NAV = '<div class="btn-group"></div>',
	TPL_SCHEDULER_TODAY = '<button type="button" class="'+[ CSS_SCHEDULER_TODAY, CSS_BTN ].join(_SPACE)+'">{today}</button>',
	TPL_SCHEDULER_VIEW = '<button type="button" class="'+[ CSS_SCHEDULER_VIEW, CSS_SCHEDULER_VIEW_ ].join(_SPACE)+'{name}" data-view-name="{name}">{label}</button>',
	TPL_SCHEDULER_VIEW_DATE = '<span class="'+CSS_SCHEDULER_VIEW_DATE+'"></span>',
	TPL_SCHEDULER_VIEWS = '<div class="'+CSS_SCHEDULER_VIEWS+'"></div>';

/**
 * A base class for SchedulerEvent.
 *
 * @class A.SchedulerEvent
 * @extends A.Model
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var SchedulerEvent = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property SchedulerEvent.NAME
	 * @type String
	 * @static
	 */
	NAME: SCHEDULER_EVENT,

	/**
	 * Static property used to define the default attribute
	 * configuration for the SchedulerEvent.
	 *
	 * @property SchedulerEvent.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute allDay
		 * @default false
		 * @type Boolean
		 */
		allDay: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute borderWidth
		 * @default '1px'
		 * @type String
		 */
		borderWidth: {
			value: '1px',
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute colorBrightnessFactor
		 * @default 0.75
		 * @type Number
		 */
		colorBrightnessFactor: {
			value: 0.75,
			validator: isNumber
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute colorSaturationFactor
		 * @default 1.5
		 * @type Number
		 */
		colorSaturationFactor: {
			value: 1.5,
			validator: isNumber
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute content
		 */
		content: {
			setter: String,
			validator: isValue
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute color
		 * @default '#D96666'
		 * @type String
		 */
		color: {
			lazyAdd: false,
			setter: '_setColor',
			value: '#D96666',
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute titleDateFormat
		 * @type Function
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute endDate
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute disabled
		 * @default false
		 * @type Boolean
		 */
		disabled: {
			value: false,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute meeting
		 * @default false
		 * @type Boolean
		 */
		meeting: {
			value: false,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute node
		 */
		node: {
			valueFn: function() {
				return A.NodeList.create(A.Node.create(this.EVENT_NODE_TEMPLATE).setData(SCHEDULER_EVENT, this));
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute reminder
		 * @default false
		 * @type Boolean
		 */
		reminder: {
			value: false,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute repeated
		 * @default false
		 * @type Boolean
		 */
		repeated: {
			value: false,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute scheduler
		 */
		scheduler: {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute startDate
		 */
		startDate: {
			setter: '_setDate',
			valueFn: function() {
				return new Date();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute visible
		 * @default true
		 * @type Boolean
		 */
		visible: {
			value: true,
			validator: isBoolean
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property SchedulerEvent.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.Model,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property SchedulerEvent.PROPAGATE_ATTRS
	 * @type Array
	 * @static
	 */
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

		/**
		 * Construction logic executed during SchedulerEvent instantiation. Lifecycle.
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
		 * Bind the events on the SchedulerEvent UI. Lifecycle.
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
		 * Sync the SchedulerEvent UI. Lifecycle.
		 *
		 * @method syncUI
		 * @protected
		 */
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
			instance._uiSetPast(
				instance._isPastEvent()
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

		/**
		 * TODO. Wanna help? Please send a Pull Request. Lifecycle.
		 *
		 * @method destroy
		 * @protected
		 */
		destroy: function() {
			var instance = this;

			instance.get(NODE).remove(true);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method addPaddingNode
		 */
		addPaddingNode: function() {
			var instance = this;

			instance.get(NODE).push(A.Node.create(instance.EVENT_NODE_TEMPLATE).setData(SCHEDULER_EVENT, instance));

			instance.syncUI();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method clone
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method copyDates
		 * @param evt
		 * @param options
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method copyPropagateAttrValues
		 * @param evt
		 * @param dontCopyMap
		 * @param options
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getBorderColor
		 */
		getBorderColor: function() {
			var instance = this;

			return instance[BORDER_COLOR_RGB].hex;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getDaysDuration
		 */
		getDaysDuration: function() {
			var instance = this;

			return DateMath.getDayOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getHoursDuration
		 */
		getHoursDuration: function() {
			var instance = this;

			return DateMath.getHoursOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getMinutesDuration
		 */
		getMinutesDuration: function() {
			var instance = this;

			return DateMath.getMinutesOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getSecondsDuration
		 */
		getSecondsDuration: function() {
			var instance = this;

			return DateMath.getSecondsOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method sameEndDate
		 * @param evt
		 */
		sameEndDate: function(evt) {
			var instance = this;

			return DateMath.compare(instance.get(END_DATE), evt.get(END_DATE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method sameStartDate
		 * @param evt
		 */
		sameStartDate: function(evt) {
			var instance = this;

			return DateMath.compare(
				instance.get(START_DATE), evt.get(START_DATE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method isAfter
		 * @param evt
		 */
		isAfter: function(evt) {
			var instance = this;
			var startDate = instance.get(START_DATE);
			var evtStartDate = evt.get(START_DATE);

			return DateMath.after(startDate, evtStartDate);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method isBefore
		 * @param evt
		 */
		isBefore: function(evt) {
			var instance = this;
			var startDate = instance.get(START_DATE);
			var evtStartDate = evt.get(START_DATE);

			return DateMath.before(startDate, evtStartDate);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method intersects
		 * @param evt
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method intersectHours
		 * @param evt
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method isDayBoundaryEvent
		 */
		isDayBoundaryEvent: function() {
			var instance = this;

			return DateMath.isDayBoundary(
				instance.get(START_DATE), instance.get(END_DATE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method isDayOverlapEvent
		 */
		isDayOverlapEvent: function() {
			var instance = this;

			return DateMath.isDayOverlap(
				instance.get(START_DATE), instance.get(END_DATE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getClearEndDate
		 */
		getClearEndDate: function() {
			var instance = this;

			return DateMath.safeClearTime(instance.get(END_DATE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getClearStartDate
		 */
		getClearStartDate: function() {
			var instance = this;

			return DateMath.safeClearTime(instance.get(START_DATE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method move
		 * @param date
		 * @param options
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method setContent
		 * @param content
		 */
		setContent: function(content) {
			var instance = this;

			instance.get(NODE).each(function(node) {
				var contentNode = node.one(_DOT+CSS_SCHEDULER_EVENT_CONTENT);

				contentNode.setContent(content);
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method setTitle
		 * @param content
		 */
		setTitle: function(content) {
			var instance = this;

			instance.get(NODE).each(function(node) {
				var titleNode = node.one(_DOT+CSS_SCHEDULER_EVENT_TITLE);

				titleNode.setContent(content);
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method syncNodeContentUI
		 */
		syncNodeContentUI: function() {
			var instance = this;

			instance.setContent(instance.get(CONTENT));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
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

			instance.setTitle(title.join(_SPACE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method split
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterAllDayChange
		 * @param event
		 * @protected
		 */
		_afterAllDayChange: function(event) {
			var instance = this;

			instance._uiSetAllDay(event.newVal);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterColorChange
		 * @param event
		 * @protected
		 */
		_afterColorChange: function(event) {
			var instance = this;

			instance._uiSetColor(event.newVal);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterDisabledChange
		 * @param event
		 * @protected
		 */
		_afterDisabledChange: function(event) {
			var instance = this;

			instance._uiSetDisabled(event.newVal);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterEndDateChange
		 * @param event
		 * @protected
		 */
		_afterEndDateChange: function(event) {
			var instance = this;

			instance._uiSetEndDate(event.newVal);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterMeetingChange
		 * @param event
		 * @protected
		 */
		_afterMeetingChange: function(event) {
			var instance = this;

			instance._uiSetMeeting(event.newVal);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterReminderChange
		 * @param event
		 * @protected
		 */
		_afterReminderChange: function(event) {
			var instance = this;

			instance._uiSetReminder(event.newVal);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterRepeatedChange
		 * @param event
		 * @protected
		 */
		_afterRepeatedChange: function(event) {
			var instance = this;

			instance._uiSetRepeated(event.newVal);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterVisibleChange
		 * @param event
		 * @protected
		 */
		_afterVisibleChange: function(event) {
			var instance = this;

			instance._uiSetVisible(event.newVal);
		},

		/**
		 * Returns true if the event ends before the current date.
		 *
		 * @method _isPastEvent
		 * @protected
		 */
		_isPastEvent: function() {
			var instance = this,
				endDate = instance.get(END_DATE);

			return (endDate.getTime() < (new Date()).getTime());
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setColor
		 * @param val
		 * @protected
		 */
		_setColor: function(val) {
			var instance = this;

			var hsl = Color.toArray(Color.toHSL(val)),
				hslString;

			hsl[1] *= instance.get(COLOR_SATURATION_FACTOR);
			hsl[2] *= instance.get(COLOR_BRIGHTNESS_FACTOR);

			hslString = 'hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)';

			instance[BORDER_COLOR_RGB] = Color.toRGB(hslString);

			return val;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setDate
		 * @param val
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _formatDate
		 * @param date
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _getTitleDateFormat
		 * @param val
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetAllDay
		 * @param val
		 * @protected
		 */
		_uiSetAllDay: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_ALL_DAY, !!val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetColor
		 * @param val
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetDisabled
		 * @param val
		 * @protected
		 */
		_uiSetDisabled: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_DISABLED, !!val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetEndDate
		 * @param val
		 * @protected
		 */
		_uiSetEndDate: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_SHORT, instance.getMinutesDuration() <= 30);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetMeeting
		 * @param val
		 * @protected
		 */
		_uiSetMeeting: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_MEETING, !!val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetPast
		 * @param val
		 * @protected
		 */
		_uiSetPast: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_PAST, !!val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetReminder
		 * @param val
		 * @protected
		 */
		_uiSetReminder: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_REMINDER, !!val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetRepeated
		 * @param val
		 * @protected
		 */
		_uiSetRepeated: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_REPEATED, !!val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetVisible
		 * @param val
		 * @protected
		 */
		_uiSetVisible: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_HIDDEN, !val);
		}
	}
});

A.SchedulerEvent = SchedulerEvent;