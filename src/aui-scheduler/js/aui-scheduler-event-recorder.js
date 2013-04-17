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

	_COMMA = ',',
	_DASH = '-',
	_DOT = '.',
	_SPACE = ' ',

	SCHEDULER_EVENT = 'scheduler-event',
	SCHEDULER_EVENT_RECORDER = 'scheduler-event-recorder',

	ACTIVE_VIEW = 'activeView',
	ALL_DAY = 'allDay',
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
	KEY_DOWN = 'keydown',
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
			value: '%a, %B %d'
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

		_handleClickOutSide: function(event) {
			var instance = this;

			instance.fire('cancel');
		},

		_handleDeleteEvent: function(event) {
			var instance = this;

			instance.fire('delete', {
				schedulerEvent: instance.get(EVENT)
			});

			event.preventDefault();
		},

		_handleEscapeEvent: function(event) {
			var instance = this;

			if (instance[OVERLAY].get(RENDERED) && (event.keyCode == A.Event.KeyMap.ESC)) {
				instance.fire('cancel');

				event.preventDefault();
			}
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
			var scheduler = instance.get(SCHEDULER);
			var schedulerBB = scheduler.get(BOUNDING_BOX);
			var strings = instance.get(STRINGS);

			instance[OVERLAY].render(schedulerBB);
			instance[TOOLBAR].render(schedulerBB);

			var overlayBB = instance[OVERLAY].get(BOUNDING_BOX);
			overlayBB.addClass(CSS_SCHEDULER_EVENT_RECORDER_OVERLAY);

			instance[OVERLAY].set(FOOTER_CONTENT, instance[TOOLBAR].get(BOUNDING_BOX));

			instance.formNode = A.Node.create(TPL_OVERLAY_FORM);

			instance[OVERLAY].set(BODY_CONTENT, instance.formNode);

			instance.formNode.on(SUBMIT, A.bind(instance._onSubmitForm, instance));

			scheduler.get(BOUNDING_BOX).on('clickoutside', A.bind(instance._handleClickOutSide, instance));
		},

		getFormattedDate: function() {
			var instance = this;
				evt = (instance.get(EVENT) || instance);
				endDate = evt.get(END_DATE),
				startDate = evt.get(START_DATE),
				formattedDate = evt._formatDate(startDate, instance.get(DATE_FORMAT));

			if (evt.get(ALL_DAY)) {
				return formattedDate;
			}

			formattedDate = formattedDate.concat(_COMMA);

			var scheduler = evt.get(SCHEDULER),
				fmtHourFn = (scheduler.get(ACTIVE_VIEW).get(ISO_TIME) ? DateMath.toIsoTimeString : DateMath.toUsTimeString);

			return [ formattedDate, fmtHourFn(startDate), _DASH, fmtHourFn(endDate) ].join(_SPACE);
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

			instance.handleEscapeEvent = A.on(KEY_DOWN, A.bind(instance._handleEscapeEvent, instance));

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