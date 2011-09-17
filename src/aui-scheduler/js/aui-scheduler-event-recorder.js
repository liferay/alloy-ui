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
					A.Lang.sub(TPL_EVT_REC_OVERLAY, instance.get(STRINGS))
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