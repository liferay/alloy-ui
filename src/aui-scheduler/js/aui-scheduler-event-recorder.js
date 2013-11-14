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

    TPL_HEADER_CONTENT = '<input class="' + CSS_SCHEDULER_EVENT_RECORDER_CONTENT +
        '" name="content" value="{content}" />';

/**
 * A base class for SchedulerEventRecorder.
 *
 * @class A.SchedulerEventRecorder
 * @extends A.SchedulerEvent
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var SchedulerEventRecorder = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type {String}
     * @static
     */
    NAME: SCHEDULER_EVENT_RECORDER,

    /**
     * Static property used to define the default attribute
     * configuration for the SchedulerEventRecorder.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * Determines whether a new event will take place all day. When enabled,
         * the event will not contain 24-hour clock date inputs.
         *
         * @attribute allDay
         * @default false
         * @type {Boolean}
         */
        allDay: {
            value: false
        },

        /**
         * Determines the content of this Scheduler event recorder's body
         * section.
         *
         * @attribute content
         */
        content: {},

        /**
         * Contains the duration of an `event` in minutes.
         *
         * @attribute duration
         * @default 60
         * @type {Number}
         */
        duration: {
            value: 60
        },

        /**
         * Contains the default date format for an `event`.
         *
         * @attribute dateFormat
         * @default '%a, %B %d,'
         * @type {String}
         */
        dateFormat: {
            validator: isString,
            value: '%a, %B %d'
        },

        /**
         * A scheduler `event` is the wrapper object that contains an `event`
         * title, start and end times and a description.
         *
         * @attribute event
         */
        event: {},

        /**
         * Contains the scheduler event recorder's `popover` instance.
         *
         * @attribute popover
         * @type {Object}
         */
        popover: {
            setter: '_setPopover',
            validator: isObject,
            value: {}
        },

        /**
         * Collection of strings used to label elements of the UI.
         * This attribute defaults to `{}` unless the attribute is set.
         * When this attribute is set, the passed value merges with a
         * pseudo-default collection of strings.
         *
         * @attribute strings
         * @default {}
         * @type {Object}
         */
        strings: {
            value: {},
            setter: function(val) {
                return A.merge({
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
         * Contains the `SchedulerEventRecorder`'s body template.
         *
         * @attribute bodyTemplate
         * @default ''
         * @type {String}
         */
        bodyTemplate: {
            value: TPL_BODY_CONTENT
        },

        /**
         * Contains the `SchedulerEventRecorder`'s header template.
         *
         * @attribute headerTemplate
         * @type {String}
         */
        headerTemplate: {
            value: TPL_HEADER_CONTENT
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type {Object}
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

        /**
         * Gets the content node belonging to the `popover`.
         *
         * @method getContentNode
         */
        getContentNode: function() {
            var instance = this;
            var popoverBB = instance.popover.get(BOUNDING_BOX);

            return popoverBB.one(_DOT + CSS_SCHEDULER_EVENT_RECORDER_CONTENT);
        },

        /**
         * Returns the formatted date including start and end hours if the event
         * is not `allDay`.
         *
         * @method getFormattedDate
         * @return {String} Formated date including start and end hours if the
         * event is not `allDay`..
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

            return [formattedDate, fmtHourFn(startDate), _DASH, fmtHourFn(endDate)].join(_SPACE);
        },

        /**
         * Returns this Scheduler event recorder's `content`, and dates.
         *
         * @method getTemplateData
         * @return {Object} Copy of this events `content`, `date`, `endDate` and
         * `startDate`.
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
         * Returns an updated event and also merges in any additional attributes
         * passed in as `optAttrMap`.
         *
         * @method getUpdatedSchedulerEvent
         * @param {Object} optAttrMap (optional) Attributes map.
         * @return {Object} schedulerEvent (optional) Attributes map.
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

            schedulerEvent.set(SCHEDULER, instance.get(SCHEDULER), {
                silent: true
            });
            schedulerEvent.setAttrs(A.merge(formValues, optAttrMap), options);

            return schedulerEvent;
        },

        /**
         * Hides this Scheduler event recorder's `popover` component.
         *
         * @method hidePopover
         */
        hidePopover: function() {
            var instance = this;

            instance.popover.hide();
        },

        /**
         * Loads template data into the Scheduler event recorder's form.
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
         * Converts this event recorder's form node object to a string.
         *
         * @method serializeForm
         * @return {String} A stringified copy of this event recorder's form.
         */
        serializeForm: function() {
            var instance = this;

            return A.QueryString.parse(_serialize(instance.formNode.getDOM()));
        },

        /**
         * Hides this Scheduler event recorder's `popover` component.
         *
         * @method showPopover
         */
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
        },

        /**
         * Handles `event` events.
         *
         * @method _afterEventChange
         * @param {Event.Facade} event Event Facade object
         * @protected
         */
        _afterEventChange: function(event) {
            var instance = this;

            instance.populateForm();
        },

        /**
         * Handles `popoverVisible` events.
         *
         * @method _afterPopoverVisibleChange
         * @param {Event.Facade} event Event Facade object
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
                instance.set(EVENT, null, {
                    silent: true
                });

                instance.get(NODE).remove();
            }
        },

        /**
         * Handles `scheduler` events.
         *
         * @method _afterSchedulerChange
         * @param {Event.Facade} event Event Facade object
         * @protected
         */
        _afterSchedulerChange: function(event) {
            var instance = this;
            var scheduler = event.newVal;
            var schedulerBB = scheduler.get(BOUNDING_BOX);

            schedulerBB.delegate(CLICK, A.bind(instance._onClickSchedulerEvent, instance), _DOT +
                CSS_SCHEDULER_EVENT);
        },

        /**
         * Handles `cancel` events.
         *
         * @method _defCancelEventFn
         * @param {Event.Facade} event Event Facade object
         * @protected
         */
        _defCancelEventFn: function() {
            var instance = this;

            instance.get(NODE).remove();

            instance.hidePopover();
        },

        /**
         * Handles `delete` events.
         *
         * @method _defDeleteEventFn
         * @param {Event.Facade} event Event Facade object
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
         * Handles `edit` events.
         *
         * @method _defEditEventFn
         * @param {Event.Facade} event Event Facade object
         * @protected
         */
        _defEditEventFn: function() {
            var instance = this;
            var scheduler = instance.get(SCHEDULER);

            instance.hidePopover();

            scheduler.syncEventsUI();
        },

        /**
         * Handles `save` events.
         *
         * @method _defSaveEventFn
         * @param {Event.Facade} event Event Facade object
         * @protected
         */
        _defSaveEventFn: function(event) {
            var instance = this;
            var scheduler = instance.get(SCHEDULER);

            scheduler.addEvents(event.newSchedulerEvent);

            instance.hidePopover();

            scheduler.syncEventsUI();
        },

        /**
         * Returns the `toolbar` belonging to the event recorder `footer`.
         *
         * @method _getFooterToolbar
         * @protected
         * @return {Array} Footer toolbar
         */
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
                children.push({
                    label: strings[DELETE],
                    on: {
                        click: A.bind(instance._handleDeleteEvent, instance)
                    }
                });
            }

            return [children];
        },

        /**
         * Handles `cancel` events.
         *
         * @method _handleCancelEvent
         * @param {Event.Facade} event Event Facade object
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
         * Handles `clickOutSide` events.
         *
         * @method _handleClickOutSide
         * @param {Event.Facade} event Event Facade object
         * @protected
         */
        _handleClickOutSide: function(event) {
            var instance = this;

            instance.fire('cancel');
        },

        /**
         * Handles `delete` events.
         *
         * @method _handleDeleteEvent
         * @param {Event.Facade} event Event Facade object
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
         * Handles `escape` events.
         *
         * @method _handleEscapeEvent
         * @param {Event.Facade} event Event Facade object
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
         * Handles `save` events.
         *
         * @method _handleSaveEvent
         * @param {Event.Facade} event Event Facade object
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
         * Handles `click` event on the scheduler.
         *
         * @method _onClickSchedulerEvent
         * @param {Event.Facade} event Event Facade object
         * @protected
         */
        _onClickSchedulerEvent: function(event) {
            var instance = this;
            var evt = event.currentTarget.getData(SCHEDULER_EVENT);

            if (evt) {
                instance.set(EVENT, evt, {
                    silent: true
                });

                instance.showPopover(event.currentTarget);

                instance.get(NODE).remove();
            }
        },

        /**
         * Handles `submitForm` events.
         *
         * @method _onSubmitForm
         * @param {Event.Facade} event Event Facade object
         * @protected
         */
        _onSubmitForm: function(event) {
            var instance = this;

            instance._handleSaveEvent(event);
        },

        /**
         * Renders this `EventRecorder`'s `popover` component.
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

        /**
         * Replaces this `SchedulerEventRecorder`'s `popover` component with the
         *  given 'popover' value.
         *
         * @method _renderPopover
         * @protected
         * @param {Object} val The new `popover`.
         * @return {Object} The new `popover` value merged some default popover
         * configuration properties.
         */
        _setPopover: function(val) {
            var instance = this;

            return A.merge({
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
        }
    }
});

A.SchedulerEventRecorder = SchedulerEventRecorder;
