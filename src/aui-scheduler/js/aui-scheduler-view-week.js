/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-view-week
 */

var Lang = A.Lang,
	isFunction = Lang.isFunction,

	_EMPTY_STR = '',
	M_DASH = '&mdash;',
	_SPACE = ' ',

	DateMath = A.DataType.DateMath,

	WEEK_LENGTH = DateMath.WEEK_LENGTH,

	SCHEDULER_VIEW_WEEK = 'scheduler-view-week',

	DATE = 'date',
	DAYS = 'days',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	LOCALE = 'locale',
	SCHEDULER = 'scheduler',
	VIEW_DATE = 'viewDate',
	WEEK = 'week';

/**
 * A base class for SchedulerWeekView.
 *
 * @class A.SchedulerWeekView
 * @extends A.SchedulerDayView
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var SchedulerWeekView = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property SchedulerWeekView.NAME
	 * @type String
	 * @static
	 */
	NAME: SCHEDULER_VIEW_WEEK,

	/**
	 * Static property used to define the default attribute
	 * configuration for the SchedulerWeekView.
	 *
	 * @property SchedulerWeekView.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute bodyContent
		 * @default ''
		 * @type String
		 */
		bodyContent: {
			value: _EMPTY_STR
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute days
		 * @default 7
		 * @type Number
		 */
		days: {
			value: 7
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute headerViewConfig
		 */
		headerViewConfig: {
			value: {
				displayDaysInterval: WEEK_LENGTH
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute name
		 * @default 'week'
		 * @type String
		 */
		name: {
			value: WEEK
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute navigationDateFormatter
		 * @type Function
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
	 * @property SchedulerWeekView.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.SchedulerDayView,

	prototype: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getAdjustedViewDate
		 * @param val
		 */
		getAdjustedViewDate: function(val) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.toMidnight(DateMath.getFirstDayOfWeek(val, firstDayOfWeek));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getNextDate
		 */
		getNextDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);

			return DateMath.toLastHour(DateMath.add(viewDate, DateMath.WEEK, 1));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getPrevDate
		 */
		getPrevDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);

			return DateMath.toMidnight(DateMath.subtract(viewDate, DateMath.WEEK, 1));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getToday
		 */
		getToday: function() {
			var instance = this;
			var todayDate = SchedulerWeekView.superclass.getToday.apply(this, arguments);

			return instance._firstDayOfWeek(todayDate);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _firstDayOfWeek
		 * @param date
		 * @protected
		 */
		_firstDayOfWeek: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _valueNavigationDateFormatter
		 * @param date
		 * @protected
		 */
		_valueNavigationDateFormatter: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var locale = scheduler.get(LOCALE);

			var startDate = instance._firstDayOfWeek(date);

			var startDateLabel = A.DataType.Date.format(
				startDate,
				{
					format: '%B %d',
					locale: locale
				}
			);

			var endDate = DateMath.add(startDate, DateMath.DAY, instance.get(DAYS) - 1);

			var endDateLabel = A.DataType.Date.format(
				endDate,
				{
					format: (DateMath.isMonthOverlapWeek(date) ? '%B %d' : '%d') + ', %Y',
					locale: locale
				}
			);

			return [startDateLabel, M_DASH, endDateLabel].join(_SPACE);
		}
	}
});

A.SchedulerWeekView = SchedulerWeekView;