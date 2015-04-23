/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-view-week
 */

var Lang = A.Lang,
    isFunction = Lang.isFunction,

    DateMath = A.DataType.DateMath,

    WEEK_LENGTH = DateMath.WEEK_LENGTH;

/**
 * A base class for `SchedulerWeekView`.
 *
 * @class A.SchedulerWeekView
 * @extends A.SchedulerDayView
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var SchedulerWeekView = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type {String}
     * @static
     */
    NAME: 'scheduler-view-week',

    /**
     * Static property used to define the default attribute
     * configuration for the `SchedulerWeekView`.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * Determines the content of Scheduler week view's body section.
         *
         * @attribute bodyContent
         * @default ''
         * @type {String}
         */
        bodyContent: {
            value: ''
        },

        /**
         * Contains the number of days in a week.
         *
         * @attribute days
         * @default 7
         * @type {Number}
         */
        days: {
            value: 7
        },

        /**
         * Configures the header week view.
         *
         * @attribute headerViewConfig
         */
        headerViewConfig: {
            value: {
                displayDaysInterval: WEEK_LENGTH
            }
        },

        /**
         * Determines the name for this week view.
         *
         * @attribute name
         * @default 'week'
         * @type {String}
         */
        name: {
            value: 'week'
        },

        /**
         * Contains the formatted navigation date formatter for this week view.
         *
         * @attribute navigationDateFormatter
         * @type {Function}
         */
        navigationDateFormatter: {
            valueFn: function() {
                return this._valueNavigationDateFormatter;
            },
            validator: isFunction
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type {Object}
     * @static
     */
    EXTENDS: A.SchedulerDayView,

    prototype: {

        /**
         * Returns a date value of the first day of the week with its time
         * adjusted to midnight.
         *
         * @method getAdjustedViewDate
         * @param {Date} date
         * @return {Date}
         */
        getAdjustedViewDate: function(date) {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var firstDayOfWeek = scheduler.get('firstDayOfWeek');

            return DateMath.toMidnight(DateMath.getFirstDayOfWeek(date, firstDayOfWeek));
        },

        /**
         * Returns the value of the date that follows the week view's current
         * date.
         *
         * @method getNextDate
         * @return {Date}
         */
        getNextDate: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var viewDate = DateMath.safeClearTime(scheduler.get('viewDate'));

            return DateMath.toLastHour(DateMath.add(viewDate, DateMath.WEEK, 1));
        },

        /**
         * Returns the value of the date that preceeds the week view's current
         * date.
         *
         * @method getPrevDate
         * @return {Date}
         */
        getPrevDate: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var viewDate = scheduler.get('viewDate');

            return DateMath.toMidnight(DateMath.subtract(viewDate, DateMath.WEEK, 1));
        },

        /**
         * Returns the value of the week view's current date.
         *
         * @method getToday
         * @return {Date}
         */
        getToday: function() {
            var instance = this;
            var todayDate = SchedulerWeekView.superclass.getToday.apply(this, arguments);

            return instance._firstDayOfWeek(todayDate);
        },

        /**
         * Returns the value of the first day of week in this view.
         *
         * @method _firstDayOfWeek
         * @param {Date} date
         * @return {Date}
         * @protected
         */
        _firstDayOfWeek: function(date) {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var firstDayOfWeek = scheduler.get('firstDayOfWeek');

            return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
        },

        /**
         * Returns a formatted navigation date formatter for this week view.
         *
         * @method _valueNavigationDateFormatter
         * @param {Date} date
         * @return {Date}
         * @protected
         */
        _valueNavigationDateFormatter: function(date) {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var locale = scheduler.get('locale');

            var startDate = instance._firstDayOfWeek(date);

            var startDateLabel = A.DataType.Date.format(
                startDate, {
                    format: '%B %d',
                    locale: locale
                }
            );

            var endDate = DateMath.add(startDate, DateMath.DAY, instance.get('days') - 1);

            var endDateLabel = A.DataType.Date.format(
                endDate, {
                    format: (DateMath.isMonthOverlapWeek(startDate) ? '%B %d' : '%d') + ', %Y',
                    locale: locale
                }
            );

            return [startDateLabel, '&mdash;', endDateLabel].join(' ');
        }
    }
});

A.SchedulerWeekView = SchedulerWeekView;
