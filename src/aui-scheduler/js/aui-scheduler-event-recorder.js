/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-event-recorder
 */

var Lang = A.Lang,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isUndefined = Lang.isUndefined,

	_serialize = A.IO.prototype._serialize,

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
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
    BODY_TEMPLATE = 'bodyTemplate',
    BOUNDING_BOX = 'boundingBox',
    CANCEL = 'cancel',
    CLICK = 'click',
    CLICKOUTSIDE = 'clickoutside',
    CONTENT = 'content',
    CONTENT_BOX = 'contentBox',
    DATE_FORMAT = 'dateFormat',
    DELETE = 'delete',
    END_DATE = 'endDate',
    EVENT = 'event',
    EVENT_CHANGE = 'eventChange',
    HEADER_TEMPLATE = 'headerTemplate',
    ISO_TIME = 'isoTime',
    NODE = 'node',
    POP_OVER = 'popover',
    RECORDER = 'recorder',
    RENDERED = 'rendered',
	SAVE = 'save',
	SCHEDULER = 'scheduler',
	SCHEDULER_CHANGE = 'schedulerChange',
	START_DATE = 'startDate',
	STRINGS = 'strings',
	SUBMIT = 'submit',
	TOP = 'top',
	VISIBLE_CHANGE = 'visibleChange',

	getCN = A.getClassName,

	CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),

	CSS_SCHEDULER_EVENT_RECORDER = getCN(SCHEDULER_EVENT, RECORDER),
	CSS_SCHEDULER_EVENT_RECORDER_CONTENT = getCN(SCHEDULER_EVENT, RECORDER, CONTENT),
	CSS_SCHEDULER_EVENT_RECORDER_POP_OVER = getCN(SCHEDULER_EVENT, RECORDER, POP_OVER),

	TPL_FORM = '<form class="' + 'scheduler-event-recorder-form' + '" id="schedulerEventRecorderForm"></form>',

	TPL_BODY_CONTENT = '<input type="hidden" name="startDate" value="{startDate}" />' +
						'<input type="hidden" name="endDate" value="{endDate}" />' +
						'<label class="' + 'scheduler-event-recorder-date' + '">{date}</label>',

	TPL_HEADER_CONTENT = '<input class="' + CSS_SCHEDULER_EVENT_RECORDER_CONTENT + '" name="content" value="{content}" />';

/**
 * A base class for SchedulerEventRecorder.
 *
 * @class A.SchedulerEventRecorder
 * @extends A.SchedulerEvent
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var SchedulerEventRecorder = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property SchedulerEventRecorder.NAME
	 * @type String
	 * @static
	 */
	NAME: SCHEDULER_EVENT_RECORDER,

	/**
	 * Static property used to define the default attribute
	 * configuration for the SchedulerEventRecorder.
	 *
	 * @property SchedulerEventRecorder.ATTRS
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
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute content
		 */
		content: {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute duration
		 * @default 60
		 * @type Number
		 */
		duration: {
			value: 60
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute dateFormat
		 * @default '%a, %B %d,'
		 * @type String
		 */
		dateFormat: {
			validator: isString,
			value: '%a, %B %d'
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute event
		 */
		event: {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute eventClass
		 */
		eventClass: {
			valueFn: function() {
				return A.SchedulerEvent;
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute popover
		 * @type Object
		 */
		popover: {
			setter: '_setPopover',
			validator: isObject,
			value: {}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute strings
		 * @type Object
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute template
		 */
		bodyTemplate: {
			value: TPL_BODY_CONTENT
		},

		headerTemplate: {
			value: TPL_HEADER_CONTENT
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property SchedulerEventRecorder.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.SchedulerEvent,

	prototype: {

		/**
		 * Construction logic executed during SchedulerEventRecorder
		 * instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
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

			instance.after(EVENT_CHANGE, instance._afterEventChange);
			instance.after(SCHEDULER_CHANGE, instance._afterSchedulerChange);

			instance.popover = new A.Popover(instance.get(POP_OVER));

			instance.popover.after(VISIBLE_CHANGE, A.bind(instance._afterPopoverVisibleChange, instance));
		},

		_afterEventChange: function() {
			var instance = this;

			instance.populateForm();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterPopoverVisibleChange
		 * @param event
		 * @protected
		 */
		_afterPopoverVisibleChange: function(event) {
			var instance = this;

			if (event.newVal) {
				instance.populateForm();

				if (!instance.get(EVENT)) {
					var contentNode = instance.getContentNode();

					if (contentNode) {
						setTimeout(function() {
							contentNode.selectText();
						}, 0);
					}
				}
			}
			else {
				instance.set(EVENT, null, { silent: true });

				instance.get(NODE).remove();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterSchedulerChange
		 * @param event
		 * @protected
		 */
		_afterSchedulerChange: function(event) {
			var instance = this;
			var scheduler = event.newVal;
			var schedulerBB = scheduler.get(BOUNDING_BOX);

			schedulerBB.delegate(CLICK, A.bind(instance._onClickSchedulerEvent, instance), _DOT + CSS_SCHEDULER_EVENT);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _defCancelEventFn
		 * @param event
		 * @protected
		 */
		_defCancelEventFn: function() {
			var instance = this;

			instance.get(NODE).remove();

			instance.hidePopover();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _defDeleteEventFn
		 * @param event
		 * @protected
		 */
		_defDeleteEventFn: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			scheduler.removeEvents(instance.get(EVENT));

			instance.hidePopover();

			scheduler.syncEventsUI();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _defEditEventFn
		 * @param event
		 * @protected
		 */
		_defEditEventFn: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			instance.hidePopover();

			scheduler.syncEventsUI();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _defSaveEventFn
		 * @param event
		 * @protected
		 */
		_defSaveEventFn: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			scheduler.addEvents(event.newSchedulerEvent);

			instance.hidePopover();

			scheduler.syncEventsUI();
		},

		_getFooterToolbar: function() {
			var instance = this,
				event = instance.get(EVENT),
				strings = instance.get(STRINGS),
				children = [
					{
						label: strings[SAVE],
						on: {
							click: A.bind(instance._handleSaveEvent, instance)
						}
					},
					{
						label: strings[CANCEL],
						on: {
							click: A.bind(instance._handleCancelEvent, instance)
						}
					}
				];

			if (event) {
				children.push(
					{
						label: strings[DELETE],
						on: {
							click: A.bind(instance._handleDeleteEvent, instance)
						}
					}
				);
			}

			return [children];
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleCancelEvent
		 * @param event
		 * @protected
		 */
		_handleCancelEvent: function(event) {
			var instance = this;

			instance.fire('cancel');

			if (event.domEvent) {
				event.domEvent.preventDefault();
			}

			event.preventDefault();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleClickOutSide
		 * @param event
		 * @protected
		 */
		_handleClickOutSide: function() {
			var instance = this;

			instance.fire('cancel');
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleDeleteEvent
		 * @param event
		 * @protected
		 */
		_handleDeleteEvent: function(event) {
			var instance = this;

			instance.fire('delete', {
				schedulerEvent: instance.get(EVENT)
			});

			if (event.domEvent) {
				event.domEvent.preventDefault();
			}

			event.preventDefault();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleEscapeEvent
		 * @param event
		 * @protected
		 */
		_handleEscapeEvent: function(event) {
			var instance = this;

			if (instance.popover.get(RENDERED) && (event.keyCode === A.Event.KeyMap.ESC)) {
				instance.fire('cancel');

				event.preventDefault();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleSaveEvent
		 * @param event
		 * @protected
		 */
		_handleSaveEvent: function(event) {
			var instance = this,
				eventName = instance.get(EVENT) ? 'edit' : 'save';

			instance.fire(eventName, {
				newSchedulerEvent: instance.getUpdatedSchedulerEvent()
			});

			if (event.domEvent) {
				event.domEvent.preventDefault();
			}

			event.preventDefault();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onClickSchedulerEvent
		 * @param event
		 * @protected
		 */
		_onClickSchedulerEvent: function(event) {
			var instance = this;
			var evt = event.currentTarget.getData(SCHEDULER_EVENT);

			if (evt) {
				instance.set(EVENT, evt, { silent: true });

				instance.showPopover(event.currentTarget);

				instance.get(NODE).remove();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onSubmitForm
		 * @param event
		 * @protected
		 */
		_onSubmitForm: function(event) {
			var instance = this;

			instance._handleSaveEvent(event);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _renderPopover
		 * @protected
		 */
		_renderPopover: function() {
			var instance = this,
				scheduler = instance.get(SCHEDULER),
				schedulerBB = scheduler.get(BOUNDING_BOX);

			instance.popover.render(schedulerBB);

			instance.formNode = A.Node.create(TPL_FORM);

			instance.formNode.on(SUBMIT, A.bind(instance._onSubmitForm, instance));

			instance.popover.get(BOUNDING_BOX).addClass(CSS_SCHEDULER_EVENT_RECORDER_POP_OVER);
			instance.popover.get(CONTENT_BOX).wrap(instance.formNode);

			schedulerBB.on(CLICKOUTSIDE, A.bind(instance._handleClickOutSide, instance));
		},

		_setPopover: function(val) {
			var instance = this;

			return A.merge(
				{
					align: {
						points: [A.WidgetPositionAlign.BC, A.WidgetPositionAlign.TC]
					},
					bodyContent: TPL_BODY_CONTENT,
					constrain: true,
					headerContent: TPL_HEADER_CONTENT,
					preventOverlap: true,
					position: TOP,
					toolbars: {
						footer: instance._getFooterToolbar()
					},
					visible: false,
					zIndex: 500
				},
				val
			);
		},

		getContentNode: function() {
			var instance = this;
			var popoverBB = instance.popover.get(BOUNDING_BOX);

			return popoverBB.one(_DOT + CSS_SCHEDULER_EVENT_RECORDER_CONTENT);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getFormattedDate
		 */
		getFormattedDate: function() {
			var instance = this,
				evt = (instance.get(EVENT) || instance),
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getTemplateData
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getUpdatedSchedulerEvent
		 * @param optAttrMap
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method hidePopover
		 */
		hidePopover: function() {
			var instance = this;

			instance.popover.hide();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method populateForm
		 */
		populateForm: function() {
			var instance = this,
				bodyTemplate = instance.get(BODY_TEMPLATE),
				headerTemplate = instance.get(HEADER_TEMPLATE),
				templateData = instance.getTemplateData();

			instance.popover.setStdModContent('body', A.Lang.sub(bodyTemplate, templateData));
			instance.popover.setStdModContent('header', A.Lang.sub(headerTemplate, templateData));

			instance.popover.addToolbar(instance._getFooterToolbar(), 'footer');
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method serializeForm
		 */
		serializeForm: function() {
			var instance = this;

			return A.QueryString.parse(_serialize(instance.formNode.getDOM()));
		},

		showPopover: function(node) {
			var instance = this,
				event = instance.get(EVENT);

			if (!instance.popover.get(RENDERED)) {
				instance._renderPopover();
			}

			if (!node) {
				if (event) {
					node = event.get(NODE);
				}
				else {
					node = instance.get(NODE);
				}
			}

			if (isNodeList(node)) {
				node = node.item(0);
			}

			instance.popover.set('align.node', node);

			instance.popover.show();
		}
	}
});

A.SchedulerEventRecorder = SchedulerEventRecorder;