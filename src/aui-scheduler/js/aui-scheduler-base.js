/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-base
 */

/**
 * A base class for SchedulerEvents.
 *
 * @class A.SchedulerEvents
 * @extends A.ModelList
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.SchedulerEvents = A.Base.create('scheduler-events', A.ModelList, [], {
    /**
     * Constructor for the `A.SchedulerEvents`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._remainingItems = this.get('originalItems');

        this.after('originalItemsChange', this._afterOriginalItemsChange);
        this.get('scheduler').on('plotViewEvents', A.bind(this._onPlotViewEvents, this));
    },

    /**
     * Compares the inputs of a start and end date to see if adding `1` to the
     * start date time is larger than the difference between start and end date
     * times.
     *
     * @method comparator
     * @param {Object} model
     * @return {Number}
     */
    comparator: function(model) {
        var startDateTime = model.get(START_DATE),
            endDateTime = model.get(END_DATE);

        return startDateTime + 1 / (endDateTime - startDateTime);
    },

    /**
     * Fired after the `originalItems` attribute changes.
     *
     * @method _afterOriginalItemsChange
     * @protected
     */
    _afterOriginalItemsChange: function() {
        this._remainingItems = this.get('originalItems');
        this.remove(this.toArray());
        this._updateEventsForView();
    },

    /**
     * Fired when the `plotViewEvents` event is triggered.
     *
     * @method _onPlotViewEvents
     * @protected
     */
    _onPlotViewEvents: function() {
        this._updateEventsForView();
    },

    /**
     * Sets the `originalItems` attribute.
     *
     * @method _setOriginalItems
     * @param {Array} originalItems
     * @protected
     */
    _setOriginalItems: function(val) {
        var originalItems = [];

        for (var i = 0; i < val.length; i++) {
            if (A.instanceOf(val[i], this.model)) {
                this.add(val[i]);
            }
            else {
                val[i].startDate = val[i].startDate || new Date();
                if (!val[i].endDate) {
                    val[i].endDate = DateMath.clone(val[i].startDate);
                    val[i].endDate.setHours(val[i].endDate.getHours() + 1);
                }

                originalItems.push(val[i]);
            }
        }

        return originalItems;
    },

    /**
     * Adds the necessary events for the view to the model list.
     *
     * @method _updateEventsForView
     * @protected
     */
    _updateEventsForView: function() {
        var dateInterval,
            eventEndDate,
            eventStartDate,
            i,
            remainingItems = [],
            view = this.get('scheduler').get('activeView');

        if (!view) {
            return;
        }

        dateInterval = view.getDateInterval();

        for (i = 0; i < this._remainingItems.length; i++) {
            eventStartDate = this._remainingItems[i].startDate;
            eventEndDate = this._remainingItems[i].endDate;

            if ((!dateInterval.startDate || eventEndDate >= dateInterval.startDate) &&
                (!dateInterval.endDate || eventStartDate <= dateInterval.endDate)) {
                this.add(this._remainingItems[i]);
            }
            else {
                remainingItems.push(this._remainingItems[i]);
            }
        }

        this._remainingItems = remainingItems;
    },

    model: A.SchedulerEvent
}, {

    /**
     * Static property used to define the default attribute
     * configuration for the `SchedulerEvents`.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {
        /**
         * The original list of items.
         *
         * @attribute originalItems
         * @default []
         * @type {Array}
         */
        originalItems: {
            setter: '_setOriginalItems',
            validator: A.Lang.isArray,
            value: []
        },

        scheduler: {}
    }
});

/**
 * A base class for `SchedulerEventSupport`.
 *
 * @class A.SchedulerEventSupport
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var SchedulerEventSupport = function() {};

/**
 * Static property used to define the default attribute
 * configuration for the `SchedulerEventSupport`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
SchedulerEventSupport.ATTRS = {};

A.mix(SchedulerEventSupport.prototype, {
    calendarModel: A.SchedulerCalendar,

    eventModel: A.SchedulerEvent,

    eventsModel: A.SchedulerEvents,

    /**
     * Construction logic executed during `SchedulerEventSupport` instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @param config
     * @protected
     */
    initializer: function(config) {
        var instance = this,
            events = instance._toSchedulerEvents(config.items || config.events);

        instance._events = new instance.eventsModel({
            after: {
                add: A.bind(instance._afterAddEvent, instance)
            },
            bubbleTargets: instance,
            originalItems: this.get('pagination') ? events : [],
            scheduler: instance
        });

        if (!this.get('pagination')) {
            this._events.add(events);
        }
    },

    /**
     * Adds and returns the collection of events for this `Scheduler`.
     *
     * @method addEvents
     * @param {Array | ModelList | Model | A.SchedulerEvent} models
     * @return {A.SchedulerEvents}
     */
    addEvents: function(models) {
        var instance = this,
            events = instance._toSchedulerEvents(models);

        return instance._events.add(events);
    },

    /**
     * Applies a `function` to the collection of `Scheduler` events.
     *
     * @method eachEvent
     * @param {Function} fn
     * @return {A.SchedulerEvents}
     */
    eachEvent: function(fn) {
        var instance = this;

        return instance._events.each(fn);
    },

    /**
     * Deletes each event in the collection of `Scheduler` events.
     *
     * @method flushEvents
     */
    flushEvents: function() {
        var instance = this;

        instance._events.each(function(evt) {
            delete evt._filtered;
        });
    },

    /**
     * Returns the event by matching it's `clientId`.
     *
     * @method getEventByClientId
     * @param {String} clientId
     * @return {Object}
     */
    getEventByClientId: function(clientId) {
        var instance = this;

        return instance._events.getByClientId(clientId);
    },

    /**
     * Gets a collection of events.
     *
     * @method getEvents
     * @param {Function} filterFn (optional) Filters `events` and returns a list
     *     of events.
     * @param {Boolean} skipSort
     * @return {Array}
     */
    getEvents: function(filterFn, skipSort) {
        var instance = this,
            events = instance._events;

        // TODO: Check why the items are not being sorted on add
        if (!skipSort) {
            events.sort({
                silent: true
            });
        }

        if (filterFn) {
            events = events.filter(filterFn);
        }
        else {
            events = events.toArray();
        }

        return events;
    },

    /**
     * Gets a collection of events within a given day. It will filter
     * overlapping events by default unless `includeOverlap` is true.
     *
     * @method getEventsByDay
     * @param {Date} date
     * @param {Boolean} includeOverlap
     * @return {Array}
     */
    getEventsByDay: function(date, includeOverlap) {
        var instance = this;

        date = DateMath.safeClearTime(date);

        return instance.getEvents(function(evt) {
            return DateMath.compare(evt.getClearStartDate(), date) ||
                (includeOverlap && DateMath.compare(evt.getClearEndDate(), date));
        });
    },

    /**
     * Returns the list of all events that intersect with a given date. Events
     * that are not visible are not included in this list.
     *
     * @method getIntersectEvents
     * @param {Date} date
     * @return {Array}
     */
    getIntersectEvents: function(date) {
        var instance = this;

        date = DateMath.safeClearTime(date);

        return instance.getEvents(function(evt) {
            var startDate = evt.getClearStartDate();
            var endDate = evt.getClearEndDate();

            return (evt.get(VISIBLE) &&
                (DateMath.compare(date, startDate) ||
                    DateMath.compare(date, endDate) ||
                    DateMath.between(date, startDate, endDate)));
        });
    },

    /**
     * Removes given `SchedulerEvents` from the scheduler.
     *
     * @method removeEvents
     * @param {Array | ModelList | Model | A.SchedulerEvent} models
     * @return {A.SchedulerEvents} Removed SchedulerEvents.
     */
    removeEvents: function(models) {
        var instance = this,
            events = instance._toSchedulerEvents(models);

        return instance._events.remove(events);
    },

    /**
     * Completely replaces all `SchedulerEvents` in the list with the given
     * `SchedulerEvents`.
     *
     * @method resetEvents
     * @param {Array | ModelList | Model | A.SchedulerEvent} models
     * @return {A.SchedulerEvents} Reset SchedulerEvents.
     */
    resetEvents: function(models) {
        var instance = this,
            events = instance._toSchedulerEvents(models);

        return instance._events.reset(events);
    },

    /**
     * Handles `add` events.
     *
     * @method _afterAddEvent
     * @param {EventFacade} event
     * @protected
     */
    _afterAddEvent: function(event) {
        var instance = this;

        event.model.set(SCHEDULER, instance);
    },

    /**
     * Converts given values to `SchedulerEvents`.
     *
     * @method _toSchedulerEvents
     * @param {Array | ModelList | Model | A.SchedulerEvent} values Values to be
     *     used or converted to `SchedulerEvent` instances.
     * @return {A.SchedulerEvents} The values converted to `SchedulerEvents`.
     * @protected
     */
    _toSchedulerEvents: function(values) {
        var instance = this,
            events = [];

        if (isModelList(values)) {
            events = values.toArray();
            values.set(SCHEDULER, instance);
        }
        else if (isArray(values)) {
            A.Array.each(values, function(value) {
                if (isModelList(value)) {
                    events = events.concat(value.toArray());
                    value.set(SCHEDULER, instance);
                }
                else {
                    events.push(value);
                }
            });
        }
        else {
            events = values;
        }

        return events;
    }
});

A.SchedulerEventSupport = SchedulerEventSupport;

/**
 * Fired when the current image will be animated in.
 *
 * @event plotViewEvents
 * @preventable _defPlotViewEventsFn
 */

/**
 * A base class for `SchedulerBase`.
 *
 * @class A.SchedulerBase
 * @extends A.Component
 * @uses A.SchedulerEventSupport, WidgetStdMod
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/scheduler/basic-markup.html
 * @include http://alloyui.com/examples/scheduler/basic.js
 */
var SchedulerBase = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type {String}
     * @static
     */
    NAME: SCHEDULER_BASE,

    /**
     * Static property used to define the default attribute
     * configuration for the `SchedulerBase`.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * Contains the active view.
         *
         * @attribute activeView
         * @type {A.SchedulerView}
         */
        activeView: {
            validator: isSchedulerView
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute date
         * @type Date
         */
        date: {
            value: new Date(),
            validator: isDate
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute eventRecorder
         * @type {A.SchedulerEventRecorder}
         */
        eventRecorder: {
            setter: '_setEventRecorder'
        },

        /**
         * Contains the collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type {Object}
         */
        strings: {
            value: {
                agenda: 'Agenda',
                day: 'Day',
                month: 'Month',
                today: 'Today',
                week: 'Week',
                year: 'Year'
            }
        },

        /**
         * Contains the function that formats the navigation date.
         *
         * @attribute navigationDateFormatter
         * @default %A - %d %b %Y
         * @type {Function}
         */
        navigationDateFormatter: {
            value: function(date) {
                var instance = this;

                return A.DataType.Date.format(
                    date, {
                        format: '%B %d, %Y',
                        locale: instance.get(LOCALE)
                    }
                );
            },
            validator: isFunction
        },

        /**
         * If the model items should be lazily loaded through pagination or not.
         *
         * @attribute pagination
         * @default true
         * @type {Boolean}
         */
        pagination: {
            validator: A.Lang.isBoolean,
            value: true,
            writeOnce: 'initOnly'
        },

        /**
         * Contains the list of views belonging to this `Scheduler`.
         *
         * @attribute views
         * @default []
         * @type {Array}
         */
        views: {
            setter: '_setViews',
            value: []
        },

        /**
         * Contains the `Scheduler`'s current date. If there is an `activeView`,
         * this attribute will contain the `activeView`'s current date.
         *
         * @attribute viewDate
         * @type {Date}
         * @readOnly
         */
        viewDate: {
            getter: '_getViewDate',
            readOnly: true
        },

        /**
         * First day of the week: Sunday is 0, Monday is 1.
         *
         * @attribute firstDayOfWeek
         * @default 0
         * @type {Number}
         */
        firstDayOfWeek: {
            value: 0,
            validator: isNumber
        },

        /*
         * HTML_PARSER attributes
         */
        controlsNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_CONTROLS);
            }
        },

        /**
         * Contains the node that displays `Scheduler`'s current date in the `SchedulerView`.
         * This node is only visible on mobile.
         *
         * @attribute viewDateNode
         * @type {Node}
         */
        viewDateNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_VIEW_DATE);
            }
        },

        /**
         * Contains `Scheduler`'s header node.
         *
         * @attribute headerNode
         * @type {Node}
         */
        headerNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_HD);
            }
        },

        /**
         * Contains the node that goes to the next date in the `activeView`.
         *
         * @attribute iconNextNode
         * @type {Node}
         */
        iconNextNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_ICON_NEXT);
            }
        },

        /**
         * Contains the node that goes to the previous date in the `activeView`.
         *
         * @attribute iconPrevNode
         * @type {Node}
         */
        iconPrevNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_ICON_PREV);
            }
        },

        /**
         * Contains `Scheduler`'s header navigation node.
         *
         * @attribute navNode
         * @type {Node}
         */
        navNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_NAV);
            }
        },

        /**
         * Contains the node that displays `Scheduler`'s current date in `Scheduler`'s header.
         * This node is hidden on mobile.
         *
         * @attribute navDateNode
         * @type {Node}
         */
        navDateNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_NAV_DATE);
            }
        },

        /**
         * Contains the node for the select dropdown for `Scheduler`'s views.
         * This node is only visible on mobile.
         *
         * @attribute viewsSelectNode
         * @type {Node}
         */
        viewsSelectNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_VIEWS_SELECT);
            }
        },

        /**
         * Today date representation. This option allows the developer to
         * specify the date he wants to be used as the today date.
         *
         * @attribute todayDate
         * @default new Date()
         * @type {Date}
         */
        todayDate: {
            value: new Date(),
            validator: isDate
        },

        /**
         * Contains the node that goes to today date in the `activeView`.
         *
         * @attribute todayNode
         * @type {Node}
         */
        todayNode: {
            valueFn: function() {
                return A.Node.create(
                    this._processTemplate(TPL_SCHEDULER_TODAY)
                );
            }
        },

        /**
         * Contains the node container that holds the nodes to change `Scheduler`'s
         * `activeView`.
         *
         * @attribute viewsNode
         * @type {Node}
         */
        viewsNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_VIEWS);
            }
        }
    },

    /**
     * Contains an object hash, defining how attribute values are to be parsed
     * from markup contained in the widget's bounding box.
     *
     * @property HTML_PARSER
     * @type {Object}
     * @static
     */
    HTML_PARSER: {
        controlsNode: _DOT + CSS_SCHEDULER_CONTROLS,
        viewDateNode: _DOT + CSS_SCHEDULER_VIEW_DATE,
        headerNode: _DOT + CSS_SCHEDULER_HD,
        iconNextNode: _DOT + CSS_SCHEDULER_ICON_NEXT,
        iconPrevNode: _DOT + CSS_SCHEDULER_ICON_PREV,
        navNode: _DOT + CSS_SCHEDULER_NAV,
        navDateNode: _DOT + CSS_SCHEDULER_NAV_DATE,
        todayNode: _DOT + CSS_SCHEDULER_TODAY,
        viewsNode: _DOT + CSS_SCHEDULER_VIEWS
    },

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type {Array}
     * @static
     */
    UI_ATTRS: [DATE, ACTIVE_VIEW],

    /**
     * Static property used to define the augmented classes.
     *
     * @property AUGMENTS
     * @type {Array}
     * @static
     */
    AUGMENTS: [A.SchedulerEventSupport, A.WidgetStdMod],

    prototype: {
        viewStack: null,

        /**
         * Construction logic executed during `SchedulerBase` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance[VIEW_STACK] = {};

            instance[CONTROLS_NODE] = instance.get(CONTROLS_NODE);
            instance[VIEW_DATE_NODE] = instance.get(VIEW_DATE_NODE);
            instance[HEADER] = instance.get(HEADER_NODE);
            instance[ICON_NEXT_NODE] = instance.get(ICON_NEXT_NODE);
            instance[ICON_PREV_NODE] = instance.get(ICON_PREV_NODE);
            instance[NAV_NODE] = instance.get(NAV_NODE);
            instance.navDateNode = instance.get('navDateNode');
            instance.viewsSelectNode = instance.get('viewsSelectNode');
            instance[TODAY_NODE] = instance.get(TODAY_NODE);
            instance[VIEWS_NODE] = instance.get(VIEWS_NODE);

            instance.after({
                activeViewChange: instance._afterActiveViewChange,
                render: instance._afterRender
            });

            this.publish({
                plotViewEvents: {
                    defaultFn: this._defPlotViewEventsFn
                }
            });
        },

        /**
         * Binds the events on the `SchedulerBase` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance._bindDelegate();
        },

        /**
         * Syncs the `SchedulerBase` UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;

            instance.syncStdContent();
        },

        /**
         * Returns the `SchedulerView` that belongs to a given name.
         *
         * @method getViewByName
         * @param {String} name
         * @return {A.SchedulerView}
         */
        getViewByName: function(name) {
            var instance = this;

            return instance[VIEW_STACK][name];
        },

        /**
         * Returns the trigger node for the given `SchedulerView`.
         *
         * @method getViewTriggerNode
         * @param {A.SchedulerView} view
         * @return {Node} The `SchedulerView`'s trigger `Node`.
         */
        getViewTriggerNode: function(view) {
            var instance = this;
            var name = view.get('name');

            if (A.DOM.winWidth() >= 768) {
                return instance.viewsNode.one('.' + CSS_SCHEDULER_VIEW_ + name);
            }

            return instance.viewsSelectNode.one('.' + CSS_SCHEDULER_VIEW_ + name);
        },

        /**
         * Returns this `Scheduler`'s `strings` attribute value.
         *
         * @method getStrings
         * @return {String}
         */
        getStrings: function() {
            var instance = this;

            return instance.get(STRINGS);
        },

        /**
         * Returns the string that matches the `key` type.
         *
         * @method getString
         * @param {String} key
         * @return {String}
         */
        getString: function(key) {
            var instance = this;

            return instance.getStrings()[key];
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method renderView
         * @param view
         */
        renderView: function(view) {
            var instance = this;

            if (view) {
                view.show();

                if (!view.get(RENDERED)) {
                    if (!instance.bodyNode) {
                        instance.setStdModContent(WidgetStdMod.BODY, _EMPTY_STR);
                    }

                    instance.bodyNode.prepend(instance.viewDateNode);
                    view.render(instance.bodyNode);
                }
            }
        },

        /**
         * Plots all events for the current view.
         *
         * @method plotViewEvents
         * @param view
         */
        plotViewEvents: function(view) {
            var instance = this;

            view.plotEvents(
                instance.getEvents()
            );
        },

        /**
         * Plots the `activeView` events value.
         *
         * @method syncEventsUI
         */
        syncEventsUI: function() {
            var instance = this,
                activeView = instance.get(ACTIVE_VIEW);

            if (activeView) {
                this.fire('plotViewEvents');
            }
        },

        /**
         * Renders a new `ButtonGroup` and attaches it to the `Scheduler`
         * instances as a property `instance.buttonGroup`. It is rendered under
         * the `Scheduler` instance's `viewsNode`.
         *
         * @method renderButtonGroup
         */
        renderButtonGroup: function() {
            var instance = this;

            instance.buttonGroup = new A.ButtonGroup({
                boundingBox: instance.viewsNode,
                on: {
                    selectionChange: A.bind(instance._onButtonGroupSelectionChange, instance)
                }
            }).render();
        },

        /**
         * Renders a dropdown list under the `Scheduler` instance's `viewsNode`.
         *
         * @method renderDropdownList
         */
        renderDropdownList: function() {
            var instance = this;

            instance.viewsSelectNode.on('change', A.bind(instance._onSelectionChange, instance));
        },

        /**
         * Sync `SchedulerBase` StdContent.
         *
         * @method syncStdContent
         */
        syncStdContent: function() {
            var instance = this;
            var views = instance.get(VIEWS);

            instance[NAV_NODE].append(instance[ICON_PREV_NODE]);
            instance[CONTROLS_NODE].append(instance[TODAY_NODE]);
            instance[NAV_NODE].append(instance[ICON_NEXT_NODE]);

            instance[CONTROLS_NODE].append(instance[NAV_NODE]);
            instance.controlsNode.append(instance.navDateNode);

            A.Array.each(views, function(view) {
                instance.viewsSelectNode.append(instance._createViewTriggerNode(view, TPL_SCHEDULER_VIEW_LIST));
                instance[VIEWS_NODE].append(instance._createViewTriggerNode(view, TPL_SCHEDULER_VIEW_BUTTON));
            });

            instance.viewsNode.append(instance.viewsSelectNode);

            instance.header.append(instance[CONTROLS_NODE]);
            instance.header.append(instance[VIEWS_NODE]);

            instance.setStdModContent(WidgetStdMod.HEADER, instance[HEADER].getDOM());
        },

        /**
         * Handles `activeView` events.
         *
         * @method _afterActiveViewChange
         * @param {EventFacade} event
         * @protected
         */
        _afterActiveViewChange: function(event) {
            var instance = this;

            if (instance.get(RENDERED)) {
                var activeView = event.newVal;
                var lastActiveView = event.prevVal;

                if (lastActiveView) {
                    lastActiveView.hide();
                }

                instance.renderView(activeView);

                var eventRecorder = instance.get(EVENT_RECORDER);

                if (eventRecorder) {
                    eventRecorder.hidePopover();
                }

                instance._uiSetDate(instance.get(DATE));
            }
        },

        /**
         * Handles `render` events.
         *
         * @method _afterRender
         * @param {EventFacade} event
         * @protected
         */
        _afterRender: function(event) {
            var instance = this,
                activeView = instance.get(ACTIVE_VIEW);

            instance.renderView(activeView);
            instance.renderButtonGroup();
            instance.renderDropdownList();

            instance._uiSetDate(instance.get(DATE));
            instance._uiSetActiveView(activeView);
        },

        /**
         * Binds click events to an event delegate.
         *
         * @method _bindDelegate
         * @protected
         */
        _bindDelegate: function() {
            var instance = this;

            instance[CONTROLS_NODE].delegate('click', instance._onClickPrevIcon, _DOT + CSS_SCHEDULER_ICON_PREV,
                instance);
            instance[CONTROLS_NODE].delegate('click', instance._onClickNextIcon, _DOT + CSS_SCHEDULER_ICON_NEXT,
                instance);
            instance[CONTROLS_NODE].delegate('click', instance._onClickToday, _DOT + CSS_SCHEDULER_TODAY, instance);
        },

        /**
         * Creates the given `SchedulerView`'s trigger `Node`.
         *
         * @method _createViewTriggerNode
         * @param {A.SchedulerView} view
         * @param {String} tpl
         * @protected
         * @return {Node} The `SchedulerView`'s trigger `Node`.
         */
        _createViewTriggerNode: function(view, tpl) {
            var instance = this;
            var name = view.get(NAME);

            return A.Node.create(
                A.Lang.sub(tpl, {
                    name: name,
                    label: (instance.getString(name) || name)
                })
            );
        },

        /**
         * Default behavior for the `plotViewEvents` event.
         *
         * @method _defPlotViewEventsFn
         * @protected
         */
        _defPlotViewEventsFn: function() {
            this.plotViewEvents(this.get('activeView'));
        },

        /**
         * Returns the `SchedulerView`'s `date`.
         *
         * @method _getViewDate
         * @protected
         * @return {Date} The `SchedulerView`'s `date`.
         */
        _getViewDate: function() {
            var instance = this,
                date = instance.get(DATE),
                activeView = instance.get(ACTIVE_VIEW);

            if (activeView) {
                date = activeView.getAdjustedViewDate(date);
            }

            return date;
        },

        /**
         * Handles `buttonGroupSelectionChange` events.
         *
         * @method _onButtonGroupSelectionChange
         * @param {EventFacade} event
         * @protected
         */
        _onButtonGroupSelectionChange: function(event) {
            var instance = this,
                viewName = event.originEvent.target.attr('data-view-name');

            instance.set(ACTIVE_VIEW, instance.getViewByName(viewName));

            instance.viewsSelectNode.one('[data-view-name=' + viewName + ']').set('selected', true);

            event.preventDefault();
        },

        /**
         * Handles `clickToday` events.
         *
         * @method _onClickToday
         * @param {EventFacade} event
         * @protected
         */
        _onClickToday: function(event) {
            var instance = this,
                activeView = instance.get(ACTIVE_VIEW);

            if (activeView) {
                instance.set(DATE, instance.get(TODAY_DATE));
            }

            event.preventDefault();
        },

        /**
         * Handles `clickNextIcon` events.
         *
         * @method _onClickNextIcon
         * @param {EventFacade} event
         * @protected
         */
        _onClickNextIcon: function(event) {
            var instance = this,
                activeView = instance.get(ACTIVE_VIEW);

            if (activeView) {
                instance.set(DATE, activeView.get(NEXT_DATE));
            }

            event.preventDefault();
        },

        /**
         * Handles `clickPrevIcon` events.
         *
         * @method _onClickPrevIcon
         * @param {EventFacade} event
         * @protected
         */
        _onClickPrevIcon: function(event) {
            var instance = this,
                activeView = instance.get(ACTIVE_VIEW);

            if (activeView) {
                instance.set(DATE, activeView.get(PREV_DATE));
            }

            event.preventDefault();
        },

        /**
         * Handles select tag's change events.
         *
         * @method _onSelectionChange
         * @param {EventFacade} event
         * @protected
         */
        _onSelectionChange: function(event) {
            var instance = this,
                target = event.target,
                index = target.get('selectedIndex'),
                viewName = target.get('options').item(index).attr('data-view-name');

            instance.set(ACTIVE_VIEW, instance.getViewByName(viewName));
        },

        /**
         * Applies substitution to a given template.
         *
         * @method _processTemplate
         * @param {String} tpl
         * @protected
         */
        _processTemplate: function(tpl) {
            var instance = this;

            return Lang.sub(tpl, instance.getStrings());
        },

        /**
         * Replaces this `SchedulerBase`'s `eventRecorder` with the given
         * `eventRecorder` value.
         *
         * @method _setEventRecorder
         * @param {A.SchedulerEventRecorder} val A `SchedulerEventRecorder`
         *     instance.
         * @protected
         */
        _setEventRecorder: function(val) {
            var instance = this;

            if (val) {
                val.setAttrs({
                    scheduler: instance
                }, {
                    silent: true
                });

                val.addTarget(instance);
            }
        },

        /**
         * Replaces this `SchedulerBase`'s `views` with the given `views` value.
         *
         * @method _setViews
         * @param {Array} val Array of `SchedulerView` instances.
         * @protected
         * @return {Array} The replaced `SchedulerBase`'s `views`.
         */
        _setViews: function(val) {
            var instance = this;
            var views = [];

            A.Array.each(val, function(view) {
                if (isSchedulerView(view) && !view.get(RENDERED)) {
                    view.setAttrs({
                        scheduler: instance
                    });

                    views.push(view);

                    instance[VIEW_STACK][view.get(NAME)] = view;
                }
            });

            if (!instance.get(ACTIVE_VIEW)) {
                instance.set(ACTIVE_VIEW, val[0]);
            }

            return views;
        },

        /**
         * Sets `activeView` on the UI.
         *
         * @method _uiSetActiveView
         * @param {SchedulerView} val A `SchedulerView` instance.
         * @protected
         */
        _uiSetActiveView: function(val) {
            var instance = this;

            if (val) {
                var activeView = val.get(NAME),
                    activeNav = instance[VIEWS_NODE].one(_DOT + CSS_SCHEDULER_VIEW_ + activeView);

                if (activeNav) {
                    instance[VIEWS_NODE].all(BUTTON).removeClass(CSS_SCHEDULER_VIEW_SELECTED);
                    activeNav.addClass(CSS_SCHEDULER_VIEW_SELECTED);
                }
            }
        },

        /**
         * Sets `date` on the UI.
         *
         * @method _uiSetDate
         * @param {Date} date
         * @protected
         */
        _uiSetDate: function(val) {
            var instance = this;

            var formatter = instance.get(NAVIGATION_DATE_FORMATTER);
            var navigationTitle = formatter.call(instance, val);

            if (instance.get(RENDERED)) {
                var activeView = instance.get(ACTIVE_VIEW);

                if (activeView) {
                    activeView._uiSetDate(val);

                    formatter = activeView.get(NAVIGATION_DATE_FORMATTER);
                    navigationTitle = formatter.call(activeView, val);
                }

                instance[VIEW_DATE_NODE].html(navigationTitle);
                instance.viewDateNode.html(navigationTitle);

                instance.syncEventsUI();
            }
        }
    }
});

A.Scheduler = SchedulerBase;
