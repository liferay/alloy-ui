/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-base
 */

var CSS_SCHEDULER_VIEW_ = A.getClassName('scheduler-base', 'view', ''),
    CSS_SCHEDULER_VIEW_SELECTED = A.getClassName('active'),

    DateMath = A.DataType.DateMath,
    Lang = A.Lang,
    isArray = Lang.isArray,
    isBoolean = Lang.isBoolean,
    isDate = Lang.isDate,
    isFunction = Lang.isFunction,
    isNumber = Lang.isNumber,
    WidgetStdMod = A.WidgetStdMod,

    isModelList = function(val) {
        return val instanceof A.ModelList;
    },

    isSchedulerView = function(val) {
        return val instanceof A.SchedulerView;
    },

    getCN = A.getClassName,

    CSS_SCHEDULER_NAV = getCN('scheduler-base', 'nav'),
    CSS_SCHEDULER_NAV_DATE = getCN('scheduler-base', 'nav', 'date'),
    CSS_SCHEDULER_CONTROLS = getCN('scheduler-base', 'controls'),
    CSS_SCHEDULER_HD = getCN('scheduler-base', 'hd'),
    CSS_SCHEDULER_ICON_NEXT = getCN('scheduler-base', 'icon', 'next'),
    CSS_SCHEDULER_ICON_PREV = getCN('scheduler-base', 'icon', 'prev'),
    CSS_SCHEDULER_TODAY = getCN('scheduler-base', 'today'),
    CSS_SCHEDULER_VIEW = getCN('scheduler-base', 'view'),
    CSS_SCHEDULER_VIEW_ = getCN('scheduler-base', 'view', ''),
    CSS_SCHEDULER_VIEW_DATE = getCN('scheduler-base', 'view', 'date'),
    CSS_BTN = getCN('btn'),
    CSS_BTN_DEFAULT = getCN('btn', 'default'),
    CSS_ICON = getCN('glyphicon'),
    CSS_ICON_CHEVRON_RIGHT = getCN('glyphicon', 'chevron', 'right'),
    CSS_ICON_CHEVRON_LEFT = getCN('glyphicon', 'chevron', 'left'),
    CSS_SCHEDULER_VIEWS = getCN('scheduler-base', 'views'),

    TPL_SCHEDULER_CURRENT_DATE = '<span class="sr-only" role="text">"{currentDate}"</span>',
    TPL_SCHEDULER_CONTROLS = '<div class="col-xs-7 ' + CSS_SCHEDULER_CONTROLS + '"></div>',
    TPL_SCHEDULER_HD = '<div class="row ' + CSS_SCHEDULER_HD + '"></div>',
    TPL_SCHEDULER_ICON_NEXT = '<button aria-label="{ariaLabel}"" role="button" type="button" class="' + [CSS_SCHEDULER_ICON_NEXT, CSS_BTN,
        CSS_BTN_DEFAULT].join(' ') + '"><span class="' + [CSS_ICON, CSS_ICON_CHEVRON_RIGHT].join(' ') + '"></span></button>',
    TPL_SCHEDULER_ICON_PREV = '<button aria-label="{ariaLabel}"" role="button" type="button" class="' + [CSS_SCHEDULER_ICON_PREV, CSS_BTN,
        CSS_BTN_DEFAULT].join(' ') + '"><span class="' + [CSS_ICON, CSS_ICON_CHEVRON_LEFT].join(' ') + '"></span></button>',
    TPL_SCHEDULER_NAV = '<div class="btn-group"></div>',
    TPL_SCHEDULER_NAV_DATE = '<div class="' + CSS_SCHEDULER_NAV_DATE + ' hidden-xs" tabindex="0"></div>',
    TPL_SCHEDULER_TODAY = '<button aria-label="{ariaLabel}" role="button" type="button" class="' +
        [CSS_SCHEDULER_TODAY, CSS_BTN, CSS_BTN_DEFAULT].join(' ') + '">{today}</button>',
    TPL_SCHEDULER_VIEW_BUTTON = '<button aria-label="{ariaLabel}" aria-pressed="false" type="button" class="hidden-xs ' +
        [CSS_SCHEDULER_VIEW, CSS_SCHEDULER_VIEW_].join(' ') + '{name}" data-view-name="{name}">{label}</button>',
    TPL_SCHEDULER_VIEW_LIST = '<option aria-label="{ariaLabel}" aria-pressed="false" class="' +
        [CSS_SCHEDULER_VIEW, CSS_SCHEDULER_VIEW_].join(' ') + '{name}" data-view-name="{name}">{label}</option>',
    TPL_SCHEDULER_VIEW_DATE = '<div class="' + CSS_SCHEDULER_VIEW_DATE + ' visible-xs"></div>',
    TPL_SCHEDULER_VIEWS = '<div class="col-xs-5 form-inline ' + CSS_SCHEDULER_VIEWS + '"></div>',
    TPL_SCHEDULER_VIEWS_SELECT = '<select class="form-control visible-xs"></select>';

/**
 * A base class for `SchedulerEvents`.
 *
 * @class A.SchedulerEvents
 * @extends ModelList
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
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
        var startDateTime = model.get('startDate'),
            endDateTime = model.get('endDate');

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

            return (evt.get('visible') &&
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

        event.model.set('scheduler', instance);
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
            values.set('scheduler', instance);
        }
        else if (isArray(values)) {
            A.Array.each(values, function(value) {
                if (isModelList(value)) {
                    events = events.concat(value.toArray());
                    value.set('scheduler', instance);
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
    NAME: 'scheduler-base',

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
         * Contains the aria labels.
         *
         * @attribute ariaLabels
         * @default { agenda: 'View Agenda', day: 'View by Day', month: 'View by
         *     Month', next: 'Go to Next', previous: 'Go to Previous',
         *     today: 'Go to Today', week: 'View by Week' }
         * @type {Object}
         */
        ariaLabels: {
            value: {
                agenda: 'View Agenda',
                day: 'View by Day',
                month: 'View by Month',
                next: 'Go to Next',
                previous: 'Go to Previous',
                today: 'Go to Today',
                week: 'View by Week'
            }
        },

        /**
         * Contains a function to call a callback with a date object. The date
         * should represent the current time.
         *
         * @attribute currentTimeFn
         * @type {Function}
         */
        currentTimeFn: {
            value: function(callback) {
                callback(new Date());
            }
        },

        /**
         * Contains the date corresponding to the current date which is the
         * value of the date set on the user's computer.
         *
         * @attribute date
         * @type {Date}
         */
        date: {
            value: new Date(),
            validator: isDate
        },

        /**
         * Defines the keyboard configuration object for
         * `Plugin.NodeFocusManager`.
         *
         * @attribute focusmanager
         * @default { descendants: 'button', keys: { next: 'down:39', previous:
         *     'down:37' }, circular: false }
         * @type {Object}
         */
        focusmanager: {
            value: {
                descendants: 'button',
                keys: {
                    next: 'down:39',
                    previous: 'down:37'
                },
                circular: false
            },
            writeOnce: 'initOnly'
        },

        /**
         * Contains the `Scheduler`'s `SchedulerEventRecorder` instance.
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
                table: 'Table',
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
                        locale: instance.get('locale')
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
                var instance = this;

                return A.Node.create(
                    A.Lang.sub(TPL_SCHEDULER_ICON_NEXT, {
                        ariaLabel: instance.getAriaLabel('next')
                    })
                );
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
                var instance = this;

                return A.Node.create(
                    A.Lang.sub(TPL_SCHEDULER_ICON_PREV, {
                        ariaLabel: instance.getAriaLabel('previous')
                    })
                );
            }
        },

        /**
         * Contains the node that displays `Scheduler`'s current date in `Scheduler`'s header.
         * This node is only available for screen readers
         *
         * @attribute currentDateNode
         * @type {Node}
         */
        currentDateNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_CURRENT_DATE);
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
         * Define whether the scheduler header will be displayed.
         *
         * @attribute showHeader
         * @default true
         * @type {Boolean}
         */
        showHeader: {
            validator: isBoolean,
            value: true
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
                var instance = this;

                return A.Node.create(
                    A.Lang.sub(this._processTemplate(TPL_SCHEDULER_TODAY), {
                        ariaLabel: instance.getAriaLabel('today')
                    })
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
        controlsNode: '.' + CSS_SCHEDULER_CONTROLS,
        currentDateNode: '.' + CSS_SCHEDULER_NAV_DATE,
        viewDateNode: '.' + CSS_SCHEDULER_VIEW_DATE,
        headerNode: '.' + CSS_SCHEDULER_HD,
        iconNextNode: '.' + CSS_SCHEDULER_ICON_NEXT,
        iconPrevNode: '.' + CSS_SCHEDULER_ICON_PREV,
        navNode: '.' + CSS_SCHEDULER_NAV,
        navDateNode: '.' + CSS_SCHEDULER_NAV_DATE,
        todayNode: '.' + CSS_SCHEDULER_TODAY,
        viewsNode: '.' + CSS_SCHEDULER_VIEWS
    },

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type {Array}
     * @static
     */
    UI_ATTRS: ['date', 'activeView', 'showHeader'],

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

            instance.viewStack = {};

            instance.controlsNode = instance.get('controlsNode');
            instance.currentDateNode = instance.get('currentDateNode');
            instance.viewDateNode = instance.get('viewDateNode');
            instance.header = instance.get('headerNode');
            instance.iconNextNode = instance.get('iconNextNode');
            instance.iconPrevNode = instance.get('iconPrevNode');
            instance.navNode = instance.get('navNode');
            instance.navDateNode = instance.get('navDateNode');
            instance.viewsSelectNode = instance.get('viewsSelectNode');
            instance.todayNode = instance.get('todayNode');
            instance.viewsNode = instance.get('viewsNode');

            instance._populateViewNodes();

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

            return instance.viewStack[name];
        },

        /**
         * Returns the trigger node for the given `SchedulerView`.
         *
         * @method getViewTriggerNode
         * @param {A.SchedulerView} view
         * @return {Node} The `SchedulerView`'s trigger `Node`.
         */
        getViewTriggerNode: function(view) {
            var instance = this,
                name = view.get('name'),
                viewportWidth = A.DOM.winWidth();

            if (viewportWidth >= 768) {
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

            return instance.get('strings');
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
         * Returns the aria label that matches the `key` type.
         *
         * @method getAriaLabel
         * @param {String} key
         * @return {String}
         */
        getAriaLabel: function(key) {
            var instance = this,
                ariaLabels = instance.get('ariaLabels');

            return ariaLabels[key];
        },

        /**
         * Renders the `SchedulerView` based on the given `view` parameter
         * under `instance.bodyNode`.
         *
         * @method renderView
         * @param {A.SchedulerView} view
         */
        renderView: function(view) {
            var instance = this;

            if (view) {
                view.show();

                if (!view.get('rendered')) {
                    if (!instance.bodyNode) {
                        instance.setStdModContent(WidgetStdMod.BODY, '');
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
                activeView = instance.get('activeView');

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

            if (!instance.buttonGroup) {
                instance.buttonGroup = new A.ButtonGroup({
                    boundingBox: instance.viewsNode,
                    on: {
                        selectionChange: A.bind(instance._onButtonGroupSelectionChange, instance)
                    }
                }).render();
            }
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

            if (instance.get('showHeader')) {
                instance.renderButtonGroup();

                instance.navNode.append(instance.iconPrevNode);
                instance.navNode.append(instance.todayNode);
                instance.navNode.append(instance.iconNextNode);

                instance.controlsNode.append(instance.currentDateNode);
                instance.controlsNode.append(instance.navNode);
                instance.controlsNode.append(instance.navDateNode);

                instance.viewsNode.append(instance.viewsSelectNode);

                instance.header.append(instance.controlsNode);
                instance.header.append(instance.viewsNode);

                instance.setStdModContent(WidgetStdMod.HEADER, instance.header.getDOM());

                instance.header.show();
            }
            else {
                instance.header.hide();
            }
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

            if (instance.get('rendered')) {
                var activeView = event.newVal;
                var lastActiveView = event.prevVal;

                if (lastActiveView) {
                    lastActiveView.hide();
                }

                instance.renderView(activeView);

                var eventRecorder = instance.get('eventRecorder');

                if (eventRecorder) {
                    eventRecorder.hidePopover();
                }

                instance._uiSetDate(instance.get('date'));
            }
        },

        /**
         * Handles `render` events.
         *
         * @method _afterRender
         * @param {EventFacade} event
         * @protected
         */
        _afterRender: function() {
            var instance = this,
                activeView = instance.get('activeView');

            instance.renderView(activeView);
            instance.renderDropdownList();

            instance._uiSetDate(instance.get('date'));
            instance._uiSetActiveView(activeView);

            instance._plugFocusManager();
        },

        /**
         * Binds click events to an event delegate.
         *
         * @method _bindDelegate
         * @protected
         */
        _bindDelegate: function() {
            var instance = this;

            instance.controlsNode.delegate('click', instance._onClickPrevIcon, '.' + CSS_SCHEDULER_ICON_PREV,
                instance);
            instance.controlsNode.delegate('click', instance._onClickNextIcon, '.' + CSS_SCHEDULER_ICON_NEXT,
                instance);
            instance.controlsNode.delegate('click', instance._onClickToday, '.' + CSS_SCHEDULER_TODAY, instance);
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
            var name = view.get('name');

            return A.Node.create(
                    A.Lang.sub(tpl, {
                        name: name,
                        label: (instance.getString(name) || name),
                        ariaLabel: instance.getAriaLabel(name)
                    }));
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
                date = instance.get('date'),
                activeView = instance.get('activeView');

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

            instance.set('activeView', instance.getViewByName(viewName));

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
                activeView = instance.get('activeView');

            if (activeView) {
                instance.set('date', instance.get('todayDate'));
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
                activeView = instance.get('activeView');

            if (activeView) {
                instance.set('date', activeView.get('nextDate'));
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
                activeView = instance.get('activeView');

            if (activeView) {
                instance.set('date', activeView.get('prevDate'));
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

            instance.set('activeView', instance.getViewByName(viewName));
        },

        /**
         * Add the content to represent each view to the corresponding view
         * nodes.
         *
         * The scheduler can display its events in many views - day view, week
         * view etc. These views are selected through a set of buttons at the
         * top left of the scheduler (if it is being viewed in desktop mode)
         * or from a select (if it is being viewed from a mobile device). This
         * method checks which views the scheduler is expected to render, and
         * adds elements both options (i.e. adds buttons to the button group and
         * options to the select).
         *
         * @method _populateViewNodes
         * @protected
         */
        _populateViewNodes: function() {
            var instance = this;

            var views = instance.get('views');

            A.Array.each(views, function(view) {
                instance.viewsSelectNode.append(instance._createViewTriggerNode(view, TPL_SCHEDULER_VIEW_LIST));
                instance.viewsNode.append(instance._createViewTriggerNode(view, TPL_SCHEDULER_VIEW_BUTTON));
            });
        },

        /**
         * Plugs 'NodeFocusManager' into the viewsNode and navNode.
         *
         * @method _plugFocusManager
         * @protected
         */
        _plugFocusManager: function() {
            var instance = this;

            instance.viewsNode.plug(A.Plugin.NodeFocusManager, this.get('focusmanager'));
            instance.navNode.plug(A.Plugin.NodeFocusManager, this.get('focusmanager'));
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

            return A.Lang.sub(tpl, instance.getStrings());
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
                if (isSchedulerView(view) && !view.get('rendered')) {
                    view.setAttrs({
                        scheduler: instance
                    });

                    views.push(view);

                    instance.viewStack[view.get('name')] = view;
                }
            });

            if (!instance.get('activeView')) {
                instance.set('activeView', val[0]);
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
                var activeView = val.get('name'),
                    activeNav = instance.viewsNode.one('.' + CSS_SCHEDULER_VIEW_ + activeView);

                if (activeNav) {
                    instance.viewsNode.all('button').removeClass(CSS_SCHEDULER_VIEW_SELECTED).setAttribute('aria-pressed', false);
                    instance.viewsSelectNode.one('[data-view-name=' + activeView + ']').set('selected', true);
                    activeNav.addClass(CSS_SCHEDULER_VIEW_SELECTED).setAttribute('aria-pressed', true);
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
        _uiSetDate: function(date) {
            var instance = this;

            var formatter = instance.get('navigationDateFormatter');
            var navigationTitle = formatter.call(instance, date);

            instance.currentDateNode.html(instance.getString('currentDate') + ':' + navigationTitle);

            if (instance.get('rendered')) {
                var activeView = instance.get('activeView');

                if (activeView) {
                    activeView._uiSetDate(date);

                    formatter = activeView.get('navigationDateFormatter');
                    navigationTitle = formatter.call(activeView, date);
                }

                instance.navDateNode.html(navigationTitle);

                instance.navDateNode.append(instance.currentDateNode);

                instance.viewDateNode.html(navigationTitle);

                instance.syncEventsUI();
            }
        },

        /**
         * Set the `showHeader` property - i.e., defines if the scheduler
         * header will be displayed.
         *
         * @method _uiSetShowHeader
         * @protected
         */
        _uiSetShowHeader: function() {
            var instance = this;

            instance.syncStdContent();
        }
    }
});

A.Scheduler = SchedulerBase;
