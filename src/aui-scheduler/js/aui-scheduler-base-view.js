/**
 * Contains the Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-base-view
 */

 var Lang = A.Lang,
     isBoolean = Lang.isBoolean,
     isFunction = Lang.isFunction,
     isString = Lang.isString,

     DateMath = A.DataType.DateMath,

     CSS_SCHEDULER_VIEW_NOSCROLL = A.getClassName('scheduler-view', 'noscroll'),
     CSS_SCHEDULER_VIEW_SCROLLABLE = A.getClassName('scheduler-view', 'scrollable');

/**
 * A base class for `SchedulerView`.
 *
 * @class A.SchedulerView
 * @extends A.Component
 * @uses WidgetStdMod
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var SchedulerView = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type {String}
     * @static
     */
    NAME: 'scheduler-view',

    /**
     * Static property used to define the augmented classes.
     *
     * @property AUGMENTS
     * @type {Array}
     * @static
     */
    AUGMENTS: [A.WidgetStdMod],

    /**
     * Static property used to define the default attribute
     * configuration for the `SchedulerView`.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * Determines the content of Scheduler view's body section.
         *
         * @attribute bodyContent
         * @default ''
         * @type {String}
         */
        bodyContent: {
            value: ''
        },

        /**
         * Applies a filter to `SchedulerEvent`s.
         *
         * @attribute filterFn
         * @type {Function} The function to filter a `SchedulerEvent`.
         */
        filterFn: {
            validator: isFunction,
            value: function() {
                return true;
            }
        },

        /**
         * Contains the height of a `SchedulerView` in pixels.
         *
         * @attribute height
         * @default 600
         * @type {Number}
         */
        height: {
            value: 600
        },

        /**
         * Indicates whether this `SchedulerView` should use international
         * standard time.
         *
         * @attribute isoTime
         * @default false
         * @type {Boolean}
         */
        isoTime: {
            value: false,
            validator: isBoolean
        },

        /**
         * Determines the name for this view.
         *
         * @attribute name
         * @default ''
         * @type {String}
         */
        name: {
            value: '',
            validator: isString
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
                var scheduler = instance.get('scheduler');

                return A.DataType.Date.format(date, {
                    format: '%A, %d %B, %Y',
                    locale: scheduler.get('locale')
                });
            },
            validator: isFunction
        },

        /**
         * Contains the next `Date` in the `SchedulerView`.
         *
         * @attribute nextDate
         * @type {Date}
         * @readOnly
         */
        nextDate: {
            getter: 'getNextDate',
            readOnly: true
        },

        /**
         * Contains the previous `Date` in the `SchedulerView`.
         *
         * @attribute prevDate
         * @type {Date}
         * @readOnly
         */
        prevDate: {
            getter: 'getPrevDate',
            readOnly: true
        },

        /**
         * Contains this `SchedulerView`'s `SchedulerBase' object.
         *
         * @attribute scheduler
         * @type {A.SchedulerBase}
         */
        scheduler: {
            lazyAdd: false,
            setter: '_setScheduler'
        },

        /**
         * Indicates whether this `SchedulerView` is scrollable.
         *
         * @attribute scrollable
         * @default true
         * @type {Boolean}
         */
        scrollable: {
            value: true,
            validator: isBoolean
        },

        /**
         * Contains the `Node` that triggers.
         *
         * @attribute triggerNode
         */
        triggerNode: {
            setter: A.one
        },

        /**
         * Indicates whether the calendar is visible.
         *
         * @attribute visible
         * @default false
         * @type {Boolean}
         */
        visible: {
            value: false
        }
    },

    /**
     * Static property used to define the attributes
     * for the bindUI lifecycle phase.
     *
     * @property BIND_UI_ATTRS
     * @type {Array}
     * @static
     */
    BIND_UI_ATTRS: ['scrollable'],

    prototype: {

        /**
         * Construction logic executed during `SchedulerView` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.after('render', instance._afterRender);
        },

        /**
         * Syncs the `SchedulerView` UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;

            instance.syncStdContent();
        },

        /**
         * Returns a date value of the date with its time adjusted
         * to midnight.
         *
         * @method getAdjustedViewDate
         * @param {Date} date The value of the property.
         * @return {Date}
         */
        getAdjustedViewDate: function(date) {
            return DateMath.toMidnight(date);
        },

        /**
         * Removes all data from `evtDateStack`, `evtRenderedStack` and
         * `rowDateTableStack`.
         *
         * @method flushViewCache
         */
        flushViewCache: function() {},

        /**
         * Returns the value of the date that follows the view's current
         * date.
         *
         * @method getNextDate
         * @return {Date}
         */
        getNextDate: function() {},

        /**
         * Returns the value of the date that preceeds the view's current
         * date.
         *
         * @method getPrevDate
         * @return {Date}
         */
        getPrevDate: function() {},

        /**
         * Returns the value of the current date.
         *
         * @method getToday
         * @return {Date}
         */
        getToday: function() {
            return DateMath.clearTime(new Date());
        },

        /**
         * Returns a clone of a given `date` that will adjust to the `maxDate`
         * if it occurs after `maxDate`.
         *
         * @method limitDate
         * @param {Date} date
         * @param {Date} maxDate
         * @return {Date}
         */
        limitDate: function(date, maxDate) {
            if (DateMath.after(date, maxDate)) {
                date = DateMath.clone(maxDate);
            }

            return date;
        },

        /**
         * Plots all events in the current view.
         *
         * @method plotEvents
         */
        plotEvents: function() {},

        /**
         * Sync `SchedulerView` StdContent.
         *
         * @method syncStdContent
         */
        syncStdContent: function() {},

        /**
         * Sync `event` on the UI.
         *
         * @method syncEventUI
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         */
        syncEventUI: function() {},

        /**
         * Sets `date` on the UI.
         *
         * @method _uiSetDate
         * @protected
         */
        _uiSetDate: function() {},

        /**
         * Handles `render` events.
         *
         * @method _afterRender
         * @param {EventFacade} event
         * @protected
         */
        _afterRender: function() {
            var instance = this;

            instance._uiSetScrollable(
                instance.get('scrollable')
            );
        },

        /**
         * Sets this `SchedulerView`'s `scheduler` object to the given value.
         *
         * @method _setScheduler
         * @param {Scheduler} val A `Scheduler` instance.
         * @protected
         * @return {Object}
         */
        _setScheduler: function(val) {
            var instance = this;
            var scheduler = instance.get('scheduler');

            if (scheduler) {
                instance.removeTarget(scheduler);
            }

            if (val) {
                instance.addTarget(val);

                val.after(['*:add', '*:remove', '*:reset'], A.bind(instance.flushViewCache, instance));
            }

            return val;
        },

        /**
         * Sets `scrollable` on the UI.
         *
         * @method _uiSetScrollable
         * @param {Boolean} val The value of the property.
         * @protected
         */
        _uiSetScrollable: function(val) {
            var instance = this;
            var bodyNode = instance.bodyNode;

            if (bodyNode) {
                bodyNode.toggleClass(CSS_SCHEDULER_VIEW_SCROLLABLE, val);
                bodyNode.toggleClass(CSS_SCHEDULER_VIEW_NOSCROLL, !val);
            }
        }
    }
});

A.SchedulerView = SchedulerView;
