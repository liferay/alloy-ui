YUI.add('aui-scheduler-event-recorder', function (A, NAME) {

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

    DateMath = A.DataType.DateMath,

    getCN = A.getClassName,

    CSS_FORM_CONTROL = getCN('form', 'control'),
    CSS_SCHEDULER_EVENT = getCN('scheduler-event'),

    CSS_SCHEDULER_EVENT_RECORDER = getCN('scheduler-event', 'recorder'),
    CSS_SCHEDULER_EVENT_RECORDER_CONTENT = getCN('scheduler-event', 'recorder', 'content'),
    CSS_SCHEDULER_EVENT_RECORDER_POP_OVER = getCN('scheduler-event', 'recorder', 'popover'),

    TPL_FORM = '<form class="' + 'scheduler-event-recorder-form' + '" id="schedulerEventRecorderForm"></form>',

    TPL_BODY_CONTENT = '<input type="hidden" name="startDate" value="{startDate}" />' +
        '<input type="hidden" name="endDate" value="{endDate}" />' +
        '<label class="' + 'scheduler-event-recorder-date' + '">{date}</label>',

    TPL_HEADER_CONTENT = '<input class="' + [CSS_SCHEDULER_EVENT_RECORDER_CONTENT, CSS_FORM_CONTROL]
        .join(' ') + '" name="content" value="{content}" />';

/**
 * A base class for `SchedulerEventRecorder`.
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
    NAME: 'scheduler-event-recorder',

    /**
     * Static property used to define the default attribute
     * configuration for the `SchedulerEventRecorder`.
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
         * Construction logic executed during `SchedulerEventRecorder`
         * instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.get('node').addClass(CSS_SCHEDULER_EVENT_RECORDER);

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

            instance.after('eventChange', instance._afterEventChange);
            instance.after('schedulerChange', instance._afterSchedulerChange);

            instance.popover = new A.Popover(instance.get('popover'));

            instance.popover.after('visibleChange', A.bind(instance._afterPopoverVisibleChange, instance));
        },

        /**
         * Gets the content node belonging to the `popover`.
         *
         * @method getContentNode
         * @return {Node} The content `Node` reference.
         */
        getContentNode: function() {
            var instance = this;
            var popoverBB = instance.popover.get('boundingBox');

            return popoverBB.one('.' + CSS_SCHEDULER_EVENT_RECORDER_CONTENT);
        },

        /**
         * Returns the formatted date including start and end hours if the event
         * is not `allDay`.
         *
         * @method getFormattedDate
         * @return {String} Formated date including start and end hours if the
         *     event is not `allDay`.
         */
        getFormattedDate: function() {
            var instance = this,
                evt = (instance.get('event') || instance),
                endDate = evt.get('endDate'),
                startDate = evt.get('startDate'),
                formattedDate = evt._formatDate(startDate, instance.get('dateFormat'));

            if (evt.get('allDay')) {
                return formattedDate;
            }

            formattedDate = formattedDate.concat(',');

            var scheduler = evt.get('scheduler'),
                fmtHourFn = (scheduler.get('activeView').get('isoTime') ? DateMath.toIsoTimeString : DateMath.toUsTimeString);

            return [formattedDate, fmtHourFn(startDate), '-', fmtHourFn(endDate)].join(' ');
        },

        /**
         * Returns this Scheduler event recorder's `content`, and dates.
         *
         * @method getTemplateData
         * @return {Object} Copy of this events `content`, `date`, `endDate` and
         *     `startDate`.
         */
        getTemplateData: function() {
            var instance = this,
                strings = instance.get('strings'),
                evt = instance.get('event') || instance,
                content = evt.get('content');

            if (isUndefined(content)) {
                content = strings['description-hint'];
            }

            return {
                content: content,
                date: instance.getFormattedDate(),
                endDate: evt.get('endDate').getTime(),
                startDate: evt.get('startDate').getTime()
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
                schedulerEvent = instance.get('event'),
                options = {
                    silent: !schedulerEvent
                },
                formValues = instance.serializeForm();

            if (!schedulerEvent) {
                schedulerEvent = instance.clone();
            }

            schedulerEvent.set('scheduler', instance.get('scheduler'), {
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
                bodyTemplate = instance.get('bodyTemplate'),
                headerTemplate = instance.get('headerTemplate'),
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
                event = instance.get('event');

            if (!instance.popover.get('rendered')) {
                instance._renderPopover();
            }

            if (!node) {
                if (event) {
                    node = event.get('node');
                }
                else {
                    node = instance.get('node');
                }
            }

            if (A.Lang.isNodeList(node)) {
                node = node.item(0);
            }

            var align = instance.popover.get('align');
            instance.popover.set('align', {
                node: node,
                points: align.points
            });

            instance.popover.show();
        },

        /**
         * Handles `event` events.
         *
         * @method _afterEventChange
         * @param {EventFacade} event
         * @protected
         */
        _afterEventChange: function() {
            var instance = this;

            instance.populateForm();
        },

        /**
         * Handles `popoverVisible` events.
         *
         * @method _afterPopoverVisibleChange
         * @param {EventFacade} event
         * @protected
         */
        _afterPopoverVisibleChange: function(event) {
            var instance = this;

            if (event.newVal) {
                instance.populateForm();

                if (!instance.get('event')) {
                    var contentNode = instance.getContentNode();

                    if (contentNode) {
                        setTimeout(function() {
                            contentNode.selectText();
                        }, 0);
                    }
                }
            }
            else {
                instance.set('event', null, {
                    silent: true
                });

                instance.get('node').remove();
            }
        },

        /**
         * Handles `scheduler` events.
         *
         * @method _afterSchedulerChange
         * @param {EventFacade} event
         * @protected
         */
        _afterSchedulerChange: function(event) {
            var instance = this;
            var scheduler = event.newVal;
            var schedulerBB = scheduler.get('boundingBox');

            schedulerBB.delegate('click', A.bind(instance._onClickSchedulerEvent, instance), '.' +
                CSS_SCHEDULER_EVENT);
        },

        /**
         * Handles `cancel` events.
         *
         * @method _defCancelEventFn
         * @param {EventFacade} event
         * @protected
         */
        _defCancelEventFn: function() {
            var instance = this;

            instance.get('node').remove();

            instance.hidePopover();
        },

        /**
         * Handles `delete` events.
         *
         * @method _defDeleteEventFn
         * @param {EventFacade} event
         * @protected
         */
        _defDeleteEventFn: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');

            scheduler.removeEvents(instance.get('event'));

            instance.hidePopover();

            scheduler.syncEventsUI();
        },

        /**
         * Handles `edit` events.
         *
         * @method _defEditEventFn
         * @param {EventFacade} event
         * @protected
         */
        _defEditEventFn: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');

            instance.hidePopover();

            scheduler.syncEventsUI();
        },

        /**
         * Handles `save` events.
         *
         * @method _defSaveEventFn
         * @param {EventFacade} event
         * @protected
         */
        _defSaveEventFn: function(event) {
            var instance = this;
            var scheduler = instance.get('scheduler');

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
                event = instance.get('event'),
                strings = instance.get('strings'),
                children = [
                    {
                        label: strings.save,
                        on: {
                            click: A.bind(instance._handleSaveEvent, instance)
                        }
                    },
                    {
                        label: strings.cancel,
                        on: {
                            click: A.bind(instance._handleCancelEvent, instance)
                        }
                    }
                ];

            if (event) {
                children.push({
                    label: strings['delete'],
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
         * @param {EventFacade} event
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
         * @param {EventFacade} event
         * @protected
         */
        _handleClickOutSide: function() {
            var instance = this;

            instance.fire('cancel');
        },

        /**
         * Handles `delete` events.
         *
         * @method _handleDeleteEvent
         * @param {EventFacade} event
         * @protected
         */
        _handleDeleteEvent: function(event) {
            var instance = this;

            instance.fire('delete', {
                schedulerEvent: instance.get('event')
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
         * @param {EventFacade} event
         * @protected
         */
        _handleEscapeEvent: function(event) {
            var instance = this;

            if (instance.popover.get('rendered') && (event.keyCode === A.Event.KeyMap.ESC)) {
                instance.fire('cancel');

                event.preventDefault();
            }
        },

        /**
         * Handles `save` events.
         *
         * @method _handleSaveEvent
         * @param {EventFacade} event
         * @protected
         */
        _handleSaveEvent: function(event) {
            var instance = this,
                eventName = instance.get('event') ? 'edit' : 'save';

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
         * @param {EventFacade} event
         * @protected
         */
        _onClickSchedulerEvent: function(event) {
            var instance = this;
            var evt = event.currentTarget.getData('scheduler-event');

            if (evt) {
                instance.set('event', evt, {
                    silent: true
                });

                instance.showPopover(event.currentTarget);

                instance.get('node').remove();
            }
        },

        /**
         * Handles `submitForm` events.
         *
         * @method _onSubmitForm
         * @param {EventFacade} event
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
                scheduler = instance.get('scheduler'),
                schedulerBB = scheduler.get('boundingBox');

            instance.popover.render(schedulerBB);

            instance.formNode = A.Node.create(TPL_FORM);

            instance.formNode.on('submit', A.bind(instance._onSubmitForm, instance));

            instance.popover.get('boundingBox').addClass(CSS_SCHEDULER_EVENT_RECORDER_POP_OVER);
            instance.popover.get('contentBox').wrap(instance.formNode);

            schedulerBB.on('clickoutside', A.bind(instance._handleClickOutSide, instance));
        },

        /**
         * Replaces this `SchedulerEventRecorder`'s `popover` component with the
         * given 'popover' value.
         *
         * @method _renderPopover
         * @protected
         * @param {Object} val The new `popover`.
         * @return {Object} The new `popover` value merged some default popover
         *     configuration properties.
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
                    position: 'top',
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


}, '3.0.1', {"requires": ["querystring", "io-form", "overlay", "aui-scheduler-base", "aui-popover"], "skinnable": true});
