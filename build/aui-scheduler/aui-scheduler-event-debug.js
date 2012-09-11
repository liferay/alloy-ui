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

	DASH = '-',
	NDASH = '&ndash;',
	DOT = '.',
	EMPTY_STR = '',
	SPACE = ' ',
	UNDERLINE = '_',

	_PROPAGATE_SET = '_propagateSet',

	ACTIVE_VIEW = 'activeView',
	BORDER_COLOR = 'borderColor',
	BORDER_COLOR_RGB = 'borderColorRGB',
	BORDER_STYLE = 'borderStyle',
	BORDER_WIDTH = 'borderWidth',
	CHANGE = 'Change',
	COLOR = 'color',
	COLOR_BRIGHTNESS_FACTOR = 'colorBrightnessFactor',
	COLOR_SATURATION_FACTOR = 'colorSaturationFactor',
	CONTENT = 'content',
	DISABLED = 'disabled',
	DURATION = 'duration',
	END_DATE = 'endDate',
	EVENT_CLASS = 'eventClass',
	EVENT_STACK = 'eventStack',
	EVENTS = 'events',
	HIDDEN = 'hidden',
	HSB_COLOR = 'hsbColor',
	ICON = 'icon',
	ICONS = 'icons',
	ID = 'id',
	INHERIT = 'inherit',
	ISO_TIME = 'isoTime',
	LOCALE = 'locale',
	NEVER = 'never',
	NODE = 'node',
	OVERLAY = 'overlay',
	PARENT_EVENT = 'parentEvent',
	RECORDER = 'recorder',
	REPEAT = 'repeat',
	REPEATED = 'repeated',
	REPEATED_EVENTS = 'repeatedEvents',
	REPEATER = 'repeater',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'scheduler-event',
	SCHEDULER_EVENT_RECORDER = 'scheduler-event-recorder',
	START_DATE = 'startDate',
	TEMPLATE = 'template',
	TITLE = 'title',
	TITLE_DATE_FORMAT = 'titleDateFormat',
	VISIBLE = 'visible',

	TITLE_DT_FORMAT_ISO = '%H:%M',
	TITLE_DT_FORMAT_US = '%I:%M',

	getCN = A.getClassName,

	CSS_ICON = getCN(ICON),
	CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
	CSS_SCHEDULER_EVENT_CONTENT = getCN(SCHEDULER_EVENT, CONTENT),
	CSS_SCHEDULER_EVENT_HIDDEN = getCN(SCHEDULER_EVENT, HIDDEN),
	CSS_SCHEDULER_EVENT_DISABLED = getCN(SCHEDULER_EVENT, DISABLED),
	CSS_SCHEDULER_EVENT_RECORDER = getCN(SCHEDULER_EVENT, RECORDER),
	CSS_SCHEDULER_EVENT_REPEATED = getCN(SCHEDULER_EVENT, REPEATED),
	CSS_SCHEDULER_EVENT_REPEATER = getCN(SCHEDULER_EVENT, REPEATER),
	CSS_SCHEDULER_EVENT_TITLE = getCN(SCHEDULER_EVENT, TITLE),
	CSS_SCHEDULER_EVENT_ICONS = getCN(SCHEDULER_EVENT, ICONS),
	CSS_SCHEDULER_EVENT_ICON_DISABLED = getCN(SCHEDULER_EVENT, ICON, DISABLED),
	CSS_SCHEDULER_EVENT_ICON_REPEATED = getCN(SCHEDULER_EVENT, ICON, REPEATED),
	CSS_SCHEDULER_EVENT_ICON_REPEATER = getCN(SCHEDULER_EVENT, ICON, REPEATER);

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
			validator: isString
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

		node: {
			valueFn: function() {
				return A.NodeList.create(A.Node.create(this.EVENT_NODE_TEMPLATE).setData(SCHEDULER_EVENT, this));
			}
		},

		parentEvent: {
		},

		repeat: {
			value: EMPTY_STR,
			setter: '_setRepeat'
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
										'<span class="' + [CSS_ICON, CSS_SCHEDULER_EVENT_ICON_REPEATED].join(SPACE) + '"></span>' +
										'<span class="' + [CSS_ICON, CSS_SCHEDULER_EVENT_ICON_REPEATER].join(SPACE) + '"></span>' +
										'<span class="' + [CSS_ICON, CSS_SCHEDULER_EVENT_ICON_DISABLED].join(SPACE) + '"></span>' +
									'</div>' +
								'</div>',

		eventStack: null,

		initializer: function() {
			var instance = this;
			var node = instance.get(NODE);

			instance[EVENT_STACK] = {};

			A.Array.each(instance.get(EVENT_CLASS).PROPAGATE_ATTRS, function(attrName) {
				instance.after(attrName+CHANGE, instance._propagateAttrChange);
			});

			instance._bindUIAttrs();

			instance.syncNodeUI(true);
		},

		destroy: function() {
			var instance = this;

			instance.eachRepeatedEvent(function(evt, uid) {
				evt.destroy();
			});

			instance[EVENT_STACK] = {};
			instance.get(NODE).remove(true);
		},

		addPaddingNode: function() {
			var instance = this;

			instance.get(NODE).push(A.Node.create(instance.EVENT_NODE_TEMPLATE).setData(SCHEDULER_EVENT, instance));

			instance.syncNodeUI();
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

		repeatByDate: function(date) {
			var instance = this;
			var uid = instance.uidByDate(date);

			if (!instance[EVENT_STACK][uid]) {
				var startDate = DateMath.clone(date);
				var endDate = DateMath.clone(date);

				DateMath.copyHours(startDate, instance.get(START_DATE));
				DateMath.copyHours(endDate, instance.get(END_DATE));

				var newEvt = new instance.get(EVENT_CLASS)({
					endDate: endDate,
					parentEvent: instance,
					scheduler: instance.get(SCHEDULER),
					startDate: startDate
				});

				newEvt.copyPropagateAttrValues(instance);

				instance[EVENT_STACK][uid] = newEvt;
			}

			return instance[EVENT_STACK][uid];
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

		isRepeatableDate: function(date) {
			var instance = this;
			var repeat = instance.get(REPEAT);

			return (repeat && repeat.validate(instance, date));
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

		uidByDate: function(date) {
			var instance = this;

			date = isDate(date) ?
					DateMath.safeClearTime(date) : instance.getClearStartDate();

			return [SCHEDULER_EVENT, date.getTime()].join(UNDERLINE);
		},

		setContent: function(content, propagate) {
			var instance = this;

			instance.get(NODE).each(function(node) {
				var contentNode = node.one(_DOT+CSS_SCHEDULER_EVENT_CONTENT);

				contentNode.setContent(content);
			});

			if (propagate) {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.setContent(content);
				});
			}
		},

		setTitle: function(content, propagate) {
			var instance = this;

			instance.get(NODE).each(function(node) {
				var titleNode = node.one(_DOT+CSS_SCHEDULER_EVENT_TITLE);

				titleNode.setContent(content);
			});

			if (propagate) {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.setTitle(content);
				});
			}
		},

		syncNodeUI: function(propagate) {
			var instance = this;

			instance._syncUIAttrs();
			instance.syncNodeColorUI(propagate);
			instance.syncNodeTitleUI(propagate);
			instance.syncNodeContentUI(propagate);
		},

		syncNodeColorUI: function(propagate) {
			var instance = this;
			var node = instance.get(NODE);
			var borderColor = instance.getBorderColor();

			if (node) {
				var styles = {
					borderWidth: instance.get(BORDER_WIDTH),
					borderColor: borderColor,
					backgroundColor: instance.get(COLOR),
					borderStyle: instance.get(BORDER_STYLE),
					color: INHERIT
				};

				node.setStyles(styles);
			}

			if (propagate) {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.syncNodeColorUI();
				});
			}
		},

		syncNodeContentUI: function(propagate) {
			var instance = this;

			instance.setContent(instance.get(CONTENT), propagate);
		},

		syncNodeTitleUI: function(propagate) {
			var instance = this;
			var sDate = instance._formatDate(instance.get(START_DATE));
			var eDate = instance._formatDate(instance.get(END_DATE));

			instance.setTitle([sDate, eDate].join(SPACE+NDASH+SPACE), propagate);
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

		eachRepeatedEvent: function(fn) {
			var instance = this;

			A.each(instance[EVENT_STACK], fn, instance);
		},

		unlink: function() {
			var instance = this;

			if (instance.get(PARENT_EVENT)) {
				instance.set(PARENT_EVENT, null);
			}
			else {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.unlink();
				});
			}

			instance[EVENT_STACK] = {};

			instance.syncNodeUI();
		},

		_afterDisabledChange: function(event) {
			var instance = this;

			instance._uiSetDisabled(event.newVal);
		},

		_afterVisibleChange: function(event) {
			var instance = this;

			instance._uiSetVisible(event.newVal);
		},

		_afterRepeatChange: function(event) {
			var instance = this;

			instance._uiSetRepeat(event.newVal);
		},

		_afterParentEventChange: function(event) {
			var instance = this;

			instance._uiSetParentEvent(event.newVal);
		},

		_bindUIAttrs: function() {
			var instance = this;

			instance.after({
				disabledChange: instance._afterDisabledChange,
				visibleChange: instance._afterVisibleChange,
				parentEventChange: instance._afterParentEventChange,
				repeatChange: instance._afterRepeatChange
			});

			instance._syncUIAttrs();
		},

		_propagateAttrChange: function(event) {
			var instance = this;
			var attrName = event.attrName;
			var newVal = event.newVal;

			instance.eachRepeatedEvent(function(evt, uid) {
				var propFn = evt[_PROPAGATE_SET+_toInitialCap(attrName)];

				if (propFn) {
					propFn.apply(instance, [evt, attrName, newVal]);
				}
				else {
					evt.set(attrName, event.newVal);
				}

				evt.syncNodeUI();
			});

			instance.syncNodeUI();
		},

		_propagateSetEndDate: function(evt, attrName, val) {
			var endDate = DateMath.clone(evt.get(END_DATE));

			DateMath.copyHours(endDate, val);
			evt.set(END_DATE, endDate);
		},

		_propagateSetStartDate: function(evt, attrName, val) {
			var startDate = DateMath.clone(evt.get(START_DATE));

			DateMath.copyHours(startDate, val);
			evt.set(START_DATE, startDate);
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

		_setRepeat: function(val) {
			var instance = this;

			if (isString(val)) {
				val = A.SchedulerEventRepeat[val];
			}

			return isObject(val) ? val : null;
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

		_syncUIAttrs: function() {
			var instance = this;

			instance._uiSetDisabled(
				instance.get(DISABLED)
			);
			instance._uiSetVisible(
				instance.get(VISIBLE)
			);
			instance._uiSetParentEvent(
				instance.get(PARENT_EVENT)
			);
			instance._uiSetRepeat(
				instance.get(REPEAT)
			);
		},

		_formatDate: function(date, format) {
			var instance = this;
			var locale = instance.get(LOCALE);

			format = format || instance.get(TITLE_DATE_FORMAT);

			return A.DataType.Date.format(date, {
				format: format,
				locale: locale
			});
		},

		_getTitleDateFormat: function(val) {
			var instance = this;

			if (!isString(val)) {
				var scheduler = instance.get(SCHEDULER);

				val = (scheduler && scheduler.get(ACTIVE_VIEW).get(ISO_TIME)) ? TITLE_DT_FORMAT_ISO : TITLE_DT_FORMAT_US;
			}

			return val;
		},

		_uiSetDisabled: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_DISABLED, !!val);
		},

		_uiSetParentEvent: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_REPEATED, !!val);
		},

		_uiSetRepeat: function(val) {
			var instance = this;
			var value = !!val && val !== A.SchedulerEventRepeat[NEVER];

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_REPEATER, value);
		},

		_uiSetVisible: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_HIDDEN, !val);
		}
	}
});

A.SchedulerEvent = SchedulerEvent;
A.SchedulerEventRepeat = {
	never: {
		description: 'Never repeat',
		validate: function(evt, date) {
			return false;
		},
		value: 'never'
	},

	daily: {
		description: 'Every day',
		validate: function(evt, date) {
			return true;
		},
		value: 'daily'
	},

	monthly: {
		description: 'Every month',
		validate: function(evt, date) {
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return (startDate.getDate() === date.getDate());
		},
		value: 'monthly'
	},

	monWedFri: {
		description: 'Every Monday, Wednesday and Friday',
		validate: function(evt, date) {
			return DateMath.isMonWedOrFri(date);
		},
		value: 'monWedFri'
	},

	tuesThurs: {
		description: 'Every Tuesday and Thursday',
		validate: function(evt, date) {
			return DateMath.isTueOrThu(date);
		},
		value: 'tuesThurs'
	},

	weekDays: {
		description: 'Every week days',
		validate: function(evt, date) {
			return DateMath.isWeekDay(date);
		},
		value: 'weekDays'
	},

	weekly: {
		description: 'Every week',
		validate: function(evt, date) {
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return (startDate.getDay() === date.getDay());
		},
		value: 'weekly'
	},

	yearly: {
		description: 'Every year',
		validate: function(evt, date) {
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return ((startDate.getMonth() === date.getMonth()) && (startDate.getDay() === date.getDay()));
		},
		value: 'yearly'
	}

};
var L = A.Lang,
	isArray = L.isArray,
	isObject = L.isObject,

	ACTIVE_VIEW = 'activeView',
	ALL_DAY = 'allDay',
	ARROW = 'arrow',
	BODY = 'body',
	BODY_CONTENT = 'bodyContent',
	BOUNDING_BOX = 'boundingBox',
	CANCEL = 'cancel',
	CLICK = 'click',
	CONTENT = 'content',
	DATE = 'date',
	DATE_FORMAT = 'dateFormat',
	DELETE = 'delete',
	DESCRIPTION = 'description',
	EDIT = 'edit',
	EVENT = 'event',
	EVENT_CLASS = 'eventClass',
	FOOTER_CONTENT = 'footerContent',
	FORM = 'form',
	HEADER = 'header',
	HIDE = 'hide',
	ISO_TIME = 'isoTime',
	LINK = 'link',
	NODE = 'node',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OVERLAY = 'overlay',
	OVERLAY_OFFSET = 'overlayOffset',
	RECORDER = 'recorder',
	RENDERED = 'rendered',
	REPEAT = 'repeat',
	SAVE = 'save',
	SCHEDULER = 'scheduler',
	SCHEDULER_CHANGE = 'schedulerChange',
	SCHEDULER_EVENT = 'scheduler-event',
	SCHEDULER_EVENT_RECORDER = 'scheduler-event-recorder',
	SHADOW = 'shadow',
	SHOW = 'show',
	START_DATE_CHANGE = 'startDateChange',
	STRINGS = 'strings',
	TEMPLATE = 'template',
	TITLE = 'title',
	TL = 'tl',
	TOOLBAR = 'toolbar',
	SUBMIT = 'submit',
	VALUE = 'value',
	VISIBLE_CHANGE = 'visibleChange',
	WHEN = 'when',
	X = 'x',
	Y = 'y',

	EV_SCHEDULER_EVENT_RECORDER_CANCEL = 'cancel',
	EV_SCHEDULER_EVENT_RECORDER_DELETE = 'delete',
	EV_SCHEDULER_EVENT_RECORDER_EDIT = 'edit',
	EV_SCHEDULER_EVENT_RECORDER_SAVE = 'save',

	_DASH = '-',
	_DOT = '.',
	_EMPTY_STR = '',
	_POUND = '#',

	_serialize = A.IO.prototype._serialize,

	getCN = A.getClassName,

	CSS_SCHEDULER_EVENT = getCN(SCHEDULER, EVENT),
	CSS_SCHEDULER_EVENT_RECORDER = getCN(SCHEDULER, EVENT, RECORDER),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_SHADOW = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW, SHADOW),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_BODY = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, BODY),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_CONTENT = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, CONTENT),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_DATE = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, DATE),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_FORM = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, FORM),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_HEADER = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, HEADER),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_REPEAT = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, REPEAT),
	CSS_SCHEDULER_EVENT_TITLE = getCN(SCHEDULER, EVENT, TITLE),

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
			'<select class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_REPEAT, '" name="repeat">',
				'<tpl for="eventRepeat">',
					'<option {[ (parent.repeat && parent.repeat.value) == parent.eventRepeat[$i].value ? \'selected="selected"\' : "" ]} value="{value}">{description}</option>',
				'</tpl>',
			'</select>',
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
						'no-repeat': 'No repeat',
						cancel: 'Cancel',
						description: 'Description',
						edit: 'Edit',
						repeat: 'Repeat',
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
			newEvt.set(REPEAT, values[REPEAT]);

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

			return [ evt._formatDate(startDate, dateFormat), fmtHourFn(startDate), DASH, fmtHourFn(endDate) ].join(SPACE);
		},

		getTemplateData: function() {
			var instance = this;

			var strings = instance.get(STRINGS);
			var evt = (instance.get(EVENT) || instance);

			return {
				content: evt.get(CONTENT) || strings['description-hint'],
				date: instance.getFormattedDate(),
				endDate: evt.get(END_DATE).getTime(),
				eventRepeat: instance.eventRepeatArray,
				repeat: evt.get(REPEAT),
				startDate: evt.get(START_DATE).getTime()
			};
		},

		hideOverlay: function() {
			var instance = this;

			instance[OVERLAY].hide();
		},

		populateForm: function() {
			var instance = this;

			if (!instance.eventRepeatArray) {
				instance.eventRepeatArray = [];

				A.each(A.SchedulerEventRepeat, function(item) {
					instance.eventRepeatArray.push({
						description: item[DESCRIPTION],
						value: item[VALUE]
					});
				});
			}

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
