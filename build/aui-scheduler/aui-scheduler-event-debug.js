AUI.add('aui-scheduler-event', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,
	isDate = Lang.isDate,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,

	ColorUtil = A.ColorUtil,
	DateMath = A.DataType.DateMath,

	_toInitialCap = A.cached(function(str) {
		return str.substring(0, 1).toUpperCase() + str.substring(1);
	}),

	_COLON = ':',
	_DASH = '-',
	_DOT = '.',
	_EMPTY_STR = '',
	_NDASH = '&ndash;',
	_SPACE = ' ',
	_UNDERLINE = '_',

	ACTIVE_VIEW = 'activeView',
	ALL = 'all',
	ALL_DAY = 'allDay',
	BORDER_COLOR = 'borderColor',
	BORDER_COLOR_RGB = 'borderColorRGB',
	BORDER_STYLE = 'borderStyle',
	BORDER_WIDTH = 'borderWidth',
	CHANGE = 'Change',
	COLOR = 'color',
	COLOR_BRIGHTNESS_FACTOR = 'colorBrightnessFactor',
	COLOR_SATURATION_FACTOR = 'colorSaturationFactor',
	CONTENT = 'content',
	DAY = 'day',
	DISABLED = 'disabled',
	END_DATE = 'endDate',
	EVENT_CLASS = 'eventClass',
	HIDDEN = 'hidden',
	HSB_COLOR = 'hsbColor',
	ICON = 'icon',
	ICONS = 'icons',
	INHERIT = 'inherit',
	ISO_TIME = 'isoTime',
	LOCALE = 'locale',
	MEETING = 'meeting',
	NEVER = 'never',
	NODE = 'node',
	OVERLAY = 'overlay',
	RECORDER = 'recorder',
	REMINDER = 'reminder',
	REPEATED = 'repeated',
	REPEATER = 'repeater',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'scheduler-event',
	SCHEDULER_EVENT_RECORDER = 'scheduler-event-recorder',
	SHORT = 'short',
	START_DATE = 'startDate',
	TEMPLATE = 'template',
	TITLE = 'title',
	TITLE_DATE_FORMAT = 'titleDateFormat',
	VISIBLE = 'visible',

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

	getCN = A.getClassName,

	CSS_ICON = getCN(ICON),
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
	CSS_SCHEDULER_EVENT_RECORDER = getCN(SCHEDULER_EVENT, RECORDER),
	CSS_SCHEDULER_EVENT_REMINDER = getCN(SCHEDULER_EVENT, REMINDER),
	CSS_SCHEDULER_EVENT_REPEATED = getCN(SCHEDULER_EVENT, REPEATED),
	CSS_SCHEDULER_EVENT_SHORT = getCN(SCHEDULER_EVENT, SHORT),
	CSS_SCHEDULER_EVENT_TITLE = getCN(SCHEDULER_EVENT, TITLE);

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
			value: '(no title)',
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
						endDate: _NDASH+_SPACE+TITLE_DT_FORMAT_ISO,
						startDate: TITLE_DT_FORMAT_ISO
					};

				if (!isoTime) {
					format.endDate = _NDASH+_SPACE+getUSDateFormat(instance.get(END_DATE));
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

		eventClass: {
			valueFn: function() {
				return A.SchedulerEvent;
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
			lazyAdd: false,
			setter: '_setScheduler'
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

	EXTENDS: A.Base,

	PROPAGATE_ATTRS: [START_DATE, END_DATE, CONTENT, COLOR, COLOR_BRIGHTNESS_FACTOR, COLOR_SATURATION_FACTOR, BORDER_STYLE, BORDER_WIDTH, TITLE_DATE_FORMAT, VISIBLE, DISABLED],

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
			var node = instance.get(NODE);

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

		copyDates: function(evt) {
			var instance = this;

			instance.set(END_DATE, DateMath.clone(evt.get(END_DATE)));
			instance.set(START_DATE, DateMath.clone(evt.get(START_DATE)));
		},

		copyPropagateAttrValues: function(evt, dontCopyMap) {
			var instance = this;

			instance.copyDates(evt);

			A.Array.each(instance.get(EVENT_CLASS).PROPAGATE_ATTRS, function(attrName) {
				if ( !((dontCopyMap || {}).hasOwnProperty(attrName)) ) {
					var value = evt.get(attrName);

					if (!isObject(value)) {
						instance.set(attrName, value);
					}
				}
			});
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

		move: function(date) {
			var instance = this;
			var duration = instance.getMinutesDuration();

			instance.set(START_DATE, date);
			instance.set(END_DATE, DateMath.add(DateMath.clone(date), DateMath.MINUTES, duration));
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

		_setScheduler: function(val) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			if (scheduler) {
				instance.removeTarget(scheduler);
			}

			instance.addTarget(val);

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
var L = A.Lang,
	isArray = L.isArray,

	ARROW = 'arrow',
	BODY = 'body',
	BODY_CONTENT = 'bodyContent',
	BOUNDING_BOX = 'boundingBox',
	CANCEL = 'cancel',
	CLICK = 'click',
	DATE = 'date',
	DATE_FORMAT = 'dateFormat',
	DELETE = 'delete',
	DESCRIPTION = 'description',
	EVENT = 'event',
	FOOTER_CONTENT = 'footerContent',
	FORM = 'form',
	HEADER = 'header',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OVERLAY_OFFSET = 'overlayOffset',
	REPEATED = 'repeated',
	RENDERED = 'rendered',
	SAVE = 'save',
	SCHEDULER_CHANGE = 'schedulerChange',
	SHADOW = 'shadow',
	STRINGS = 'strings',
	TL = 'tl',
	TOOLBAR = 'toolbar',
	SUBMIT = 'submit',
	VALUE = 'value',
	VISIBLE_CHANGE = 'visibleChange',

	EV_SCHEDULER_EVENT_RECORDER_CANCEL = 'cancel',
	EV_SCHEDULER_EVENT_RECORDER_DELETE = 'delete',
	EV_SCHEDULER_EVENT_RECORDER_EDIT = 'edit',
	EV_SCHEDULER_EVENT_RECORDER_SAVE = 'save',

	_serialize = A.IO.prototype._serialize,

	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW),
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
			value: _EMPTY_STR
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
				align: {
					points: [ TL, TL ]
				},
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

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_CANCEL, {
				defaultFn: instance._defCancelEventFn
			});

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_DELETE, {
				defaultFn: instance._defDeleteEventFn
			});

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_EDIT, {
				defaultFn: instance._defEditEventFn
			});

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_SAVE, {
				defaultFn: instance._defSaveEventFn
			});

			instance.after(SCHEDULER_CHANGE, instance._afterSchedulerChange);

			instance[OVERLAY] = new A.Overlay(instance.get(OVERLAY));
			instance[TOOLBAR] = new A.Toolbar(instance.get(TOOLBAR));
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

			scheduler.removeEvent(instance.get(EVENT));

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

			scheduler.addEvent(event.newSchedulerEvent);

			instance.hideOverlay();

			scheduler.syncEventsUI();
		},

		_handleCancelEvent: function(event) {
			var instance = this;

			instance.fire(EV_SCHEDULER_EVENT_RECORDER_CANCEL);

			event.preventDefault();
		},

		_handleDeleteEvent: function(event) {
			var instance = this;

			instance.fire(EV_SCHEDULER_EVENT_RECORDER_DELETE, {
				schedulerEvent: instance.get(EVENT)
			});

			event.preventDefault();
		},

		_handleSaveEvent: function(event) {
			var instance = this;

			instance.fire(
				instance.get(EVENT) ? EV_SCHEDULER_EVENT_RECORDER_EDIT : EV_SCHEDULER_EVENT_RECORDER_SAVE,
				{
					newSchedulerEvent: instance.getEventCopy()
				}
			);

			event.preventDefault();
		},

		_onClickSchedulerEvent: function(event) {
			var instance = this;
			var evt = event.currentTarget.getData(SCHEDULER_EVENT);

			if (evt) {
				instance.set(EVENT, evt);
				instance.showOverlay([event.pageX, event.pageY]);

				instance.get(NODE).remove();
			}
		},

		_onOverlayVisibleChange: function(event) {
			var instance = this;

			if (event.newVal) {
				instance.populateForm();

				if (!instance.get(EVENT)) {
					var overlayBB = instance[OVERLAY].get(BOUNDING_BOX);
					var contentNode = overlayBB.one(_DOT + CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_CONTENT);

					setTimeout(function() {
						contentNode.selectText();
					}, 0);
				}
			}
			else {
				instance.set(EVENT, null);

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
			instance[OVERLAY].on(VISIBLE_CHANGE, A.bind(instance._onOverlayVisibleChange, instance));

			instance.formNode = A.Node.create(TPL_OVERLAY_FORM);

			instance[OVERLAY].set(BODY_CONTENT, instance.formNode);

			instance.formNode.on(SUBMIT, A.bind(instance._onSubmitForm, instance));
		},

		getEventCopy: function() {
			var instance = this;
			var newEvt = instance.get(EVENT);

			if (!newEvt) {
				newEvt = new (instance.get(EVENT_CLASS))({
					allDay: instance.get(ALL_DAY),
					endDate: instance.get(END_DATE),
					scheduler: instance.get(SCHEDULER),
					startDate: instance.get(START_DATE)
				});

				// copying propagatable attrs
				newEvt.copyPropagateAttrValues(instance, { content: true });
			}

			var values = instance.serializeForm();

			newEvt.set(CONTENT, values[CONTENT]);
			newEvt.set(REPEATED, values[REPEATED]);

			return newEvt;
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
			var instance = this;

			var strings = instance.get(STRINGS);
			var evt = (instance.get(EVENT) || instance);

			return {
				content: evt.get(CONTENT) || strings['description-hint'],
				date: instance.getFormattedDate(),
				endDate: evt.get(END_DATE).getTime(),
				repeated: evt.get(REPEATED),
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

		showOverlay: function(xy, offset) {
			var instance = this;
			var defaultOffset = instance.get(OVERLAY_OFFSET);

			if (!instance[OVERLAY].get(RENDERED)) {
				instance._renderOverlay();
			}

			instance[OVERLAY].show();

			if (!xy) {
				var eventNode = (instance.get(EVENT) || instance).get(NODE);
				var titleNode = eventNode.one(_DOT + CSS_SCHEDULER_EVENT_TITLE);

				offset = [defaultOffset[0] + titleNode.get(OFFSET_WIDTH), defaultOffset[1] + titleNode.get(OFFSET_HEIGHT) / 2];

				xy = titleNode.getXY();
			}

			// Since #2530972 is not yet done, manually putting an offset to the alignment
			offset = offset || defaultOffset;

			xy[0] += offset[0];
			xy[1] += offset[1];

			instance[OVERLAY].set('xy', xy);
		}

	}
});

A.SchedulerEventRecorder = SchedulerEventRecorder;

}, '@VERSION@' ,{skinnable:true, requires:['aui-base','aui-color-util','aui-datatype','aui-template','aui-toolbar','io-form','querystring','overlay']});
