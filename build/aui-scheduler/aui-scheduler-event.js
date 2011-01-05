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
A.SchedulerEventRepeat = {
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
var ACTIVE_VIEW = 'activeView',
	BC = 'bc',
	BD = 'bd',
	BODY_CONTENT = 'bodyContent',
	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	COLUMN = 'column',
	CONTENT = 'content',
	DATE_FORMAT = 'dateFormat',
	DBLCLICK = 'dblclick',
	DESC = 'desc',
	DISK = 'disk',
	EVENT = 'event',
	FIELD = 'field',
	FIELDSET = 'fieldset',
	FORM = 'form',
	HINT = 'hint',
	INPUT = 'input',
	ISO_TIME = 'isoTime',
	LABEL = 'label',
	LAYOUT = 'layout',
	MENU = 'menu',
	OVERLAY_CONTEXT_PANEL = 'overlayContextPanel',
	PENCIL = 'pencil',
	REPEAT = 'repeat',
	ROW = 'row',
	SCHEDULER = 'scheduler',
	SELECT = 'select',
	STRINGS = 'strings',
	TC = 'tc',
	TEXT = 'text',
	WHEN = 'when',
	TRIGGER = 'trigger',

	AUI_SCHEDULER_EVENT_RECORDER_WHEN = 'auiSchedulerEventRecorderWhen',
	AUI_SCHEDULER_EVENT_RECORDER_DESC = 'auiSchedulerEventRecorderDesc',
	AUI_SCHEDULER_EVENT_RECORDER_SELECT = 'auiSchedulerEventRecorderSelect',
	AUI_SCHEDULER_EVENT_RECORDER_BUTTON_ROW = 'auiSchedulerEventRecorderButtonRow',

	EV_SCHEDULER_EVENT_RECORDER_CANCEL = 'cancel',
	EV_SCHEDULER_EVENT_RECORDER_EDIT = 'edit',
	EV_SCHEDULER_EVENT_RECORDER_SAVE = 'save',

	DASH = '-',
	POUND = '#',

	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY = getCN(SCHEDULER_EVENT, RECORDER, OVERLAY),
	CSS_SCHEDULER_EVENT_RECORDER_FORM = getCN(SCHEDULER_EVENT, RECORDER, FORM),
	CSS_FORM = getCN(FORM),
	CSS_LAYOUT_CONTENT = getCN(LAYOUT, CONTENT),
	CSS_FIELDSET = getCN(LAYOUT, FIELDSET),
	CSS_FIELDSET_BD = getCN(LAYOUT, FIELDSET, BD),
	CSS_FIELDSET_CONTENT = getCN(LAYOUT, FIELDSET, CONTENT),
	CSS_W100 = getCN(LAYOUT, 'w100'),
	CSS_COLUMN = getCN(COLUMN),
	CSS_COLUMN_CONTENT = getCN(COLUMN, CONTENT),
	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_MENU = getCN(FIELD, MENU),
	CSS_FIELD_SELECT = getCN(FIELD, SELECT),
	CSS_FIELD_CONTENT = getCN(FIELD, CONTENT),
	CSS_FIELD_LABEL = getCN(FIELD, LABEL),
	CSS_FIELD_TEXT = getCN(FIELD, TEXT),
	CSS_BUTTON_ROW = getCN(BUTTON, ROW),
	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_SELECT = getCN(FIELD, INPUT, SELECT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_SCHEDULER_EVENT_RECORDER_LABEL_WHEN = getCN(SCHEDULER_EVENT, RECORDER, LABEL, WHEN),
	CSS_SCHEDULER_EVENT_RECORDER_DESC = getCN(SCHEDULER_EVENT, RECORDER, DESC),

	CSS_SCHEDULER_EVENT_RECORDER_FIELD_HINT = getCN(SCHEDULER_EVENT, RECORDER, FIELD, HINT),
	CSS_SCHEDULER_EVENT_RECORDER_REPEAT = getCN(SCHEDULER_EVENT, RECORDER, REPEAT),
	CSS_SCHEDULER_EVENT_RECORDER_BUTTON_ROW = getCN(SCHEDULER_EVENT, RECORDER, BUTTON, ROW),

	TPL_OPTION = '<option></option>',

	TPL_EVT_REC_OVERLAY = '<form id="auiSchedulerEventRecorderForm" class="' + [ CSS_SCHEDULER_EVENT_RECORDER_FORM, CSS_LAYOUT_CONTENT, CSS_FORM ].join(SPACE) + '">' +
							'<div class="' + [ CSS_FIELDSET, CSS_W100, CSS_COLUMN ].join(SPACE) + '">' +
								'<div class="' + [ CSS_FIELDSET_CONTENT, CSS_COLUMN_CONTENT ].join(SPACE) + 'aui-fieldset-content aui-column-content">' +

									'<div class="' + CSS_FIELDSET_BD + '">' +
										'<span class="' + [ CSS_FIELD, CSS_FIELD_TEXT ].join(SPACE) + '">' +
											'<span class="' + CSS_FIELD_CONTENT + '">' +
												'<label class="' + CSS_FIELD_LABEL + '">{when}:</label>' +
												'<span id="auiSchedulerEventRecorderWhen" class="' + CSS_SCHEDULER_EVENT_RECORDER_LABEL_WHEN + '"></span>' +
											'</span>' +
										'</span>' +

										'<span class="' + [ CSS_FIELD, CSS_FIELD_TEXT ].join(SPACE) + '">' +
											'<span class="' + CSS_FIELD_CONTENT + '">' +
												'<label class="' + CSS_FIELD_LABEL + '" for="auiSchedulerEventRecorderDesc">{description}</label>' +
												'<input id="auiSchedulerEventRecorderDesc" class="' + [ CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT, CSS_SCHEDULER_EVENT_RECORDER_DESC ].join(SPACE) + '" size="30" type="text" />' +
												'<div class="' + CSS_SCHEDULER_EVENT_RECORDER_FIELD_HINT + '">' +
													'<span>{description-hint}</span>' +
												'</div>' +
											'</span>' +
										'</span>' +

										'<span class="' + [ CSS_FIELD, CSS_FIELD_MENU, CSS_FIELD_SELECT ].join(SPACE) + '">' +
											'<label class="' + CSS_FIELD_LABEL + '" for="auiSchedulerEventRecorderSelect">{repeat}:</label>' +
											'<select id="auiSchedulerEventRecorderSelect" class="' + [ CSS_FIELD_INPUT, CSS_FIELD_INPUT_SELECT, CSS_SCHEDULER_EVENT_RECORDER_REPEAT ].join(SPACE) + '">' +
												'<option selected="selected" value="">{no-repeat}</option>' +
											'</select>' +
										'</span>' +
										'<div id="auiSchedulerEventRecorderButtonRow" class="' + [ CSS_FIELD, CSS_BUTTON_ROW, CSS_SCHEDULER_EVENT_RECORDER_BUTTON_ROW ].join(SPACE) + '"></div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</form>';

var SchedulerEventRecorder = A.Component.create({
	NAME: SCHEDULER_EVENT_RECORDER,

	ATTRS: {
		content: {
			value: EMPTY_STR
		},

		duration: {
			value: 60
		},

		dateFormat: {
			value: '%a, %B %d,',
			validator: isString
		},

		event: {
		},

		strings: {
			value: {},
			setter: function(val) {
				return A.merge(
					{
						save: 'Save',
						cancel: 'Cancel',
						description: 'Description',
						edit: 'Edit',
						repeat: 'Repeat',
						when: 'When',
						'description-hint': 'e.g., Dinner at Brian\'s',
						'no-repeat': 'No repeat'
					},
					val || {}
				);
			},
			validator: isObject
		},

		overlayContextPanel: {
			value: {},
			setter: function(val) {
				var instance = this;

				var bodyContent = A.Node.create(
					A.substitute(TPL_EVT_REC_OVERLAY, instance.get(STRINGS))
				);

				return A.merge(
					{
						align: { points: [ BC, TC ] },
						anim: false,
						bodyContent: bodyContent,
						hideOn: DBLCLICK,
						trigger: instance.get(NODE),
						visible: false,
						zIndex: 9999
					},
					val || {}
				);
			}
		}
	},

	EXTENDS: A.SchedulerEvent,

	prototype: {
		initializer: function() {
			var instance = this;

			instance._createEvents();

			instance.after('schedulerChange', instance._afterSchedulerChange);
			instance.on('startDateChange', instance._onStartDateChange);

			instance.get(NODE).addClass(CSS_SCHEDULER_EVENT_RECORDER);
		},

		showOverlay: function() {
			var instance = this;

			if (!instance.overlay) {
				instance._initOverlay();
			}

			instance.overlay.render().show();
		},

		getEventCopy: function(evt) {
			var instance = this;
			var content = instance.overlayDescNode.val();
			var newEvt = instance.get(EVENT);

			if (!newEvt) {
				newEvt = new A.SchedulerEvent({
					endDate: instance.get(END_DATE),
					scheduler: instance.get(SCHEDULER),
					startDate: instance.get(START_DATE)
				});

				// copying propagatable attrs
				newEvt.copyPropagateAttrValues(instance, { content: true });
			}

			newEvt.set(
				REPEAT,
				instance.overlaySelectNode.val()
			);

			if (content) {
				newEvt.set(CONTENT, content);
			}

			return newEvt;
		},

		hideOverlay: function() {
			var instance = this;

			if (instance.overlay) {
				instance.overlay.hide();
			}
		},

		loadFormValues: function() {
			var instance = this;
			var repeat = EMPTY_STR;
			var content = EMPTY_STR;
			var evt = instance.get(EVENT);

			if (evt) {
				var evtRepeat = evt.get(REPEAT);

				if (evtRepeat) {
					repeat = evtRepeat.value;
				}

				content = evt.get(CONTENT);
			}

			instance.overlaySelectNode.val(repeat);
			instance.overlayWhenNode.setContent(instance._getWhenFormattedDt());

			setTimeout(function() {
				instance.overlayDescNode.val(content).selectText();
			}, 0);
		},

		_afterSchedulerChange: function(event) {
			var instance = this;
			var scheduler = event.newVal;
			var schedulerBB = scheduler.get(BOUNDING_BOX);

			schedulerBB.delegate('click', A.bind(instance._onClickSchedulerEvent, instance), DOT+CSS_SCHEDULER_EVENT);
		},

	    /**
	     * Create the custom events used on the Resize.
	     *
	     * @method _createEvents
	     * @private
	     */
		_createEvents: function() {
			var instance = this;

			// create publish function for kweight optimization
			var publish = function(name, fn) {
				instance.publish(name, {
		            defaultFn: fn,
		            queuable: false,
		            emitFacade: true,
		            bubbles: true
		        });
			};

			publish(
				EV_SCHEDULER_EVENT_RECORDER_SAVE,
				this._defSaveEventFn
			);

			publish(
				EV_SCHEDULER_EVENT_RECORDER_EDIT,
				this._defEditEventFn
			);

			publish(
				EV_SCHEDULER_EVENT_RECORDER_CANCEL,
				this._defCancelEventFn
			);
		},

		_initOverlay: function() {
			var instance = this;
			var strings = instance.get(STRINGS);

			instance.overlay = new A.OverlayContextPanel(
				instance.get(OVERLAY_CONTEXT_PANEL)
			);

			var overlay = instance.overlay;
			var oBoundingBox = overlay.get(BOUNDING_BOX);
			var oBodyContent = overlay.get(BODY_CONTENT);

			instance.overlayButtonRowNode = oBodyContent.one(POUND+AUI_SCHEDULER_EVENT_RECORDER_BUTTON_ROW);
			instance.overlayDescNode = oBodyContent.one(POUND+AUI_SCHEDULER_EVENT_RECORDER_DESC);
			instance.overlaySelectNode = oBodyContent.one(POUND+AUI_SCHEDULER_EVENT_RECORDER_SELECT);
			instance.overlayWhenNode = oBodyContent.one(POUND+AUI_SCHEDULER_EVENT_RECORDER_WHEN);

			instance.overlaySaveBtn = new A.ButtonItem({
				label: strings.save,
				icon: DISK,
				render: instance.overlayButtonRowNode,
				handler: {
					fn: instance._handleSaveEvent,
					context: instance
				}
			});

			instance.overlayEditBtn = new A.ButtonItem({
				label: strings.edit,
				icon: PENCIL,
				render: instance.overlayButtonRowNode,
				handler: {
					fn: instance._handleEditEvent,
					context: instance
				}
			});

			instance.overlayCancelBtn = new A.ButtonItem({
				label: strings.cancel,
				render: instance.overlayButtonRowNode,
				handler: {
					fn: instance._handleCancelEvent,
					context: instance
				}
			});

			A.each(A.SchedulerEventRepeat, function(repeat, key) {
				instance.overlaySelectNode.append(
					A.Node.create(TPL_OPTION).val(repeat.value || key).setContent(repeat.description)
				);
			});

			overlay.on('hide', A.bind(instance._onOverlayHide, instance));
			overlay.on('show', A.bind(instance._onOverlayShow, instance));
			oBodyContent.on('submit', A.bind(instance._onSubmitForm, instance));
			oBoundingBox.addClass(CSS_SCHEDULER_EVENT_RECORDER_OVERLAY);
		},

		_defCancelEventFn: function(event) {
			var instance = this;

			instance.hideOverlay();
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

		_getWhenFormattedDt: function() {
			var instance = this;
			var dateFormat = instance.get(DATE_FORMAT);
			var evt = (instance.get(EVENT) || instance);

			var endDate = evt.get(END_DATE);
			var scheduler = evt.get(SCHEDULER);
			var startDate = evt.get(START_DATE);
			var fmtHourFn = (scheduler.get(ACTIVE_VIEW).get(ISO_TIME) ? DateMath.toIsoTimeString : DateMath.toUsTimeString);

			return [ evt._formatDate(startDate, dateFormat), fmtHourFn(startDate), DASH, fmtHourFn(endDate) ].join(SPACE);
		},

		_handleEditEvent: function(event) {
			var instance = this;

			instance.fire(EV_SCHEDULER_EVENT_RECORDER_EDIT, {
				newSchedulerEvent: instance.getEventCopy()
			});

			event.preventDefault();
		},

		_handleSaveEvent: function(event) {
			var instance = this;

			instance.fire(EV_SCHEDULER_EVENT_RECORDER_SAVE, {
				newSchedulerEvent: instance.getEventCopy()
			});

			event.preventDefault();
		},

		_handleCancelEvent: function(event) {
			var instance = this;

			instance.fire(EV_SCHEDULER_EVENT_RECORDER_CANCEL);

			event.preventDefault();
		},

		_onClickSchedulerEvent: function(event) {
			var instance = this;
			var evt = event.currentTarget.getData(SCHEDULER_EVENT);

			if (evt) {
				if (!instance.overlay) {
					instance._initOverlay();
				}

				instance.set(EVENT, evt);
				instance.overlay.set(TRIGGER, evt.get(NODE));
				instance.get(NODE).remove();
				instance.showOverlay();
			}
		},

		_onOverlayHide: function(event) {
			var instance = this;
			var node = instance.get(NODE);

			if (instance.overlay) {
				// restore values
				instance.set(EVENT, null);
				instance.overlay.set(TRIGGER, node);
			}

			node.remove();
		},

		_onOverlayShow: function(event) {
			var instance = this;
			var overlayEditBtn = instance.overlayEditBtn;
			var overlaySaveBtn = instance.overlaySaveBtn;

			if (instance.get(EVENT)) {
				overlayEditBtn.show();
				overlaySaveBtn.hide();
			}
			else {
				overlayEditBtn.hide();
				overlaySaveBtn.show();
			}

			instance.loadFormValues();
		},

		_onStartDateChange: function(event) {
			var instance = this;
			var duration = instance.get(DURATION);

			instance.set(
				END_DATE,
				DateMath.add(event.newVal, DateMath.MINUTES, duration)
			);
		},

		_onSubmitForm: function(event) {
			var instance = this;

			if (instance.get(EVENT)) {
				instance._handleEditEvent(event);
			}
			else {
				instance._handleSaveEvent(event);
			}
		}
	}
});

A.SchedulerEventRecorder = SchedulerEventRecorder;

}, '@VERSION@' ,{skinnable:true, requires:['aui-base','aui-color-util','aui-datatype','aui-overlay-context-panel','substitute']});
