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
	BORDER_STYLE = 'borderStyle',
	BORDER_WIDTH = 'borderWidth',
	CHANGE = 'Change',
	COLOR = 'color',
	COLOR_BRIGHTNESS_FACTOR = 'colorBrightnessFactor',
	COLOR_SATURATION_FACTOR = 'colorSaturationFactor',
	CONTENT = 'content',
	CONTENT_NODE = 'contentNode',
	DISABLED = 'disabled',
	DURATION = 'duration',
	END_DATE = 'endDate',
	EVENTS = 'events',
	HIDDEN = 'hidden',
	ICON = 'icon',
	ICONS = 'icons',
	ID = 'id',
	ISO_TIME = 'isoTime',
	LOCALE = 'locale',
	NODE = 'node',
	OVERLAY = 'overlay',
	PARENT_EVENT = 'parentEvent',
	RECORDER = 'recorder',
	REPEAT = 'repeat',
	REPEATED = 'repeated',
	REPEATER = 'repeater',
	REPEATED_EVENTS = 'repeatedEvents',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'scheduler-event',
	SCHEDULER_EVENT_RECORDER = 'scheduler-event-recorder',
	START_DATE = 'startDate',
	TEMPLATE = 'template',
	TITLE = 'title',
	TITLE_DATE_FORMAT = 'titleDateFormat',
	TITLE_NODE = 'titleNode',
	VISIBLE = 'visible',

	TITLE_DT_FORMAT_ISO = '%H:%M',
	TITLE_DT_FORMAT_US = '%I:%M',

	getCN = A.ClassNameManager.getClassName,

	CSS_ICON = getCN(ICON),
	CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
	CSS_SCHEDULER_EVENT_CONTENT = getCN(SCHEDULER_EVENT, CONTENT),
	CSS_SCHEDULER_EVENT_HIDDEN = getCN(SCHEDULER_EVENT, HIDDEN),
	CSS_SCHEDULER_EVENT_DISABLED = getCN(SCHEDULER_EVENT, DISABLED),
	CSS_SCHEDULER_EVENT_RECORDER = getCN(SCHEDULER_EVENT, RECORDER),
	CSS_SCHEDULER_EVENT_REPEATED = getCN(SCHEDULER_EVENT, REPEATED),
	CSS_SCHEDULER_EVENT_REPEATER = getCN(SCHEDULER_EVENT, REPEATER),
	CSS_SCHEDULER_EVENT_TITLE = getCN(SCHEDULER_EVENT, TITLE),
	CSS_SCHEDULER_EVENT_ICONS = getCN(SCHEDULER_EVENT, ICONS);
	CSS_SCHEDULER_EVENT_ICON_DISABLED = getCN(SCHEDULER_EVENT, ICON, DISABLED),
	CSS_SCHEDULER_EVENT_ICON_REPEATED = getCN(SCHEDULER_EVENT, ICON, REPEATED),
	CSS_SCHEDULER_EVENT_ICON_REPEATER = getCN(SCHEDULER_EVENT, ICON, REPEATER);

var SchedulerEvent = A.Component.create({
	NAME: SCHEDULER_EVENT,

	ATTRS: {
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
			valueFn: function() {
				var date = DateMath.clone(this.get(START_DATE));

				date.setHours(date.getHours() + 1);

				return date;
			},
			validator: isDate
		},

		columnNode: {
			setter: A.one
		},

		disabled: {
			value: false,
			validator: isBoolean
		},

		node: {
			valueFn: function() {
				return A.Node.create(this.EVENT_NODE_TEMPLATE).setData(SCHEDULER_EVENT, this);
			},
			setter: A.one
		},

		parentEvent: {
		},

		repeat: {
			setter: '_setRepeat'
		},

		scheduler: {
			lazyAdd: false,
			setter: '_setScheduler'
		},

		startDate: {
			valueFn: function() {
				return new Date();
			},
			validator: isDate
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

			instance.eventStack = {};
			instance.nodeStack = {};

			A.Array.each(A.SchedulerEvent.PROPAGATE_ATTRS, function(attrName) {
				instance.after(attrName+CHANGE, instance._propagateAttrChange);
			});

			instance._bindUIAttrs();

			instance.contentNode = node.one(DOT+CSS_SCHEDULER_EVENT_CONTENT);
			instance.titleNode = node.one(DOT+CSS_SCHEDULER_EVENT_TITLE);

			instance.syncNodeUI(true);
		},

		destroy: function() {
			var instance = this;

			instance.eachRepeatedEvent(function(evt, uid) {
				evt.destroy();
			});

			instance.eventStack = {};

			// remove and purge DOM node
			instance.get(NODE).remove(true);
		},

		copyDates: function(evt) {
			var instance = this;

			instance.set(END_DATE, DateMath.clone(evt.get(END_DATE)));
			instance.set(START_DATE, DateMath.clone(evt.get(START_DATE)));
		},

		copyPropagateAttrValues: function(evt, dontCopyMap) {
			var instance = this;

			instance.copyDates(evt);

			A.Array.each(A.SchedulerEvent.PROPAGATE_ATTRS, function(attrName) {
				if ( !(attrName in (dontCopyMap || {})) ) {
					var value = evt.get(attrName);

					if (!isObject(value)) {
						instance.set(attrName, value);
					}
				}
			});
		},

		getBorderColor: function() {
			var instance = this;

			return instance.borderColorRGB.hex;
		},

		getDaysDuration: function() {
			var instance = this;

			return DateMath.getDayOffset(instance.get(END_DATE), instance.get(START_DATE));
		},

		getHoursDuration: function() {
			var instance = this;

			return DateMath.getHoursOffset(instance.get(END_DATE), instance.get(START_DATE));
		},

		getMinutesDuration: function() {
			var instance = this;

			return DateMath.getMinutesOffset(instance.get(END_DATE), instance.get(START_DATE));
		},

		getSecondsDuration: function() {
			var instance = this;

			return DateMath.getSecondsOffset(instance.get(END_DATE), instance.get(START_DATE));
		},

		sameEndDate: function(evt) {
			var instance = this;

			return DateMath.compare(instance.get(END_DATE), evt.get(END_DATE));
		},

		sameStartDate: function(evt) {
			var instance = this;

			return DateMath.compare(instance.get(START_DATE), evt.get(START_DATE));
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

			if (!instance.eventStack[uid]) {
				var repeatedStartDate = DateMath.clone(date);
				var repeatedEndDate = DateMath.clone(date);

				DateMath.copyHours(repeatedStartDate, instance.get(START_DATE));
				DateMath.copyHours(repeatedEndDate, instance.get(END_DATE));

				// copying base attrs
				var newEvt = new A.SchedulerEvent({
					endDate: repeatedEndDate,
					parentEvent: instance,
					scheduler: instance.get(SCHEDULER),
					startDate: repeatedStartDate
				});

				// copying propagatable attrs
				newEvt.copyPropagateAttrValues(instance);

				instance.eventStack[uid] = newEvt;
			}

			return instance.eventStack[uid];
		},

		intersects: function(evt) {
			var instance = this;
			var endDate = instance.get(END_DATE);
			var startDate = instance.get(START_DATE);
			var evtStartDate = evt.get(START_DATE);

			return (instance.sameStartDate(evt) || DateMath.between(evtStartDate, startDate, endDate));
		},

		intersectHours: function(evt) {
			var instance = this;
			var endDate = instance.get(END_DATE);
			var startDate = instance.get(START_DATE);
			var evtModifiedStartDate = DateMath.clone(startDate);

			DateMath.copyHours(evtModifiedStartDate, evt.get(START_DATE));

			return (DateMath.compare(startDate, evtModifiedStartDate) || DateMath.between(evtModifiedStartDate, startDate, endDate));
		},

		isDayOverlapEvent: function() {
			var instance = this;

			return DateMath.isDayOverlap(instance.get(START_DATE), instance.get(END_DATE));
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

		uidByDate: function(date) {
			var instance = this;

			date = isDate(date) ?  DateMath.safeClearTime(date) : instance.getClearStartDate();

			return [SCHEDULER_EVENT, date.getTime()].join(UNDERLINE);
		},

		setContent: function(content, propagate) {
			var instance = this;

			instance._setContent(CONTENT_NODE, content, propagate);
		},

		setTitle: function(content, propagate) {
			var instance = this;

			instance._setContent(TITLE_NODE, content, propagate);
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

			// update original event node
			if (node) {
				node.setStyles({
					borderWidth: instance.get(BORDER_WIDTH),
					borderColor: borderColor,
					backgroundColor: instance.get(COLOR),
					borderStyle: instance.get(BORDER_STYLE)
				});
			}

			if (instance.titleNode) {
				instance.titleNode.setStyles({
					backgroundColor: borderColor
				});
			}

			// update repeated nodes
			if (propagate) {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.syncNodeColorUI()
				});
			}
		},

		syncNodeContentUI: function(propagate) {
			var instance = this;

			instance.setContent(instance.get(CONTENT), propagate);
		},

		syncNodeTitleUI: function(propagate) {
			var instance = this;
			var sDateFormatted = instance._formatDate(instance.get(START_DATE));
			var eDateFormatted = instance._formatDate(instance.get(END_DATE));

			instance.setTitle([sDateFormatted, eDateFormatted].join(SPACE+NDASH+SPACE), propagate);
		},

		eachRepeatedEvent: function(fn) {
			var instance = this;

			A.each(instance.eventStack, fn, instance);
		},

		unlink: function() {
			var instance = this;

			if (instance.get(PARENT_EVENT)) {
				instance.set(PARENT_EVENT, null);
			}
			// if node is a parent event
			else {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.unlink();
				});
			}

			// clean all child events
			instance.eventStack = {};

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

			instance.after('disabledChange', instance._afterDisabledChange);
			instance.after('visibleChange', instance._afterVisibleChange);
			instance.after('parentEventChange', instance._afterParentEventChange);
			instance.after('repeatChange', instance._afterRepeatChange);

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

			// finding the respective nice color to the border
			instance.hsbColor = ColorUtil.rgb2hsb(ColorUtil.getRGB(val));
			instance.borderColor = A.clone(instance.hsbColor);
			instance.borderColor.b *= instance.get(COLOR_BRIGHTNESS_FACTOR);
			instance.borderColor.s *= instance.get(COLOR_SATURATION_FACTOR);
			instance.borderColorRGB = ColorUtil.hsb2rgb(instance.borderColor);

			return val;
		},

		_setContent: function(nodeRefName, content, propagate) {
			var instance = this;
			var node = instance[nodeRefName];

			// update original event node
			if (node) {
				node.setContent(content);
			}

			// update repeated nodes
			if (propagate) {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt[nodeRefName].setContent(content);
				});
			}
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

			return A.DataType.Date.format(date, { format: format, locale: locale });
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

			instance.get(NODE).toggleClass(
				CSS_SCHEDULER_EVENT_DISABLED,
				!!val
			);
		},

		_uiSetParentEvent: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(
				CSS_SCHEDULER_EVENT_REPEATED,
				!!val
			);
		},

		_uiSetRepeat: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(
				CSS_SCHEDULER_EVENT_REPEATER,
				!!val
			);
		},

		_uiSetVisible: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_HIDDEN, !val);
		}
	}
});

A.SchedulerEvent = SchedulerEvent;