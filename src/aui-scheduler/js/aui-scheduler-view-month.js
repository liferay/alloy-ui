/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-view-month
 */

var Lang = A.Lang,
	isFunction = Lang.isFunction,

	DateMath = A.DataType.DateMath,

	_DOT = '.',

	COL = 'col',
	DATA = 'data',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	LOCALE = 'locale',
	MONTH = 'month',
	NOMONTH = 'nomonth',
	SCHEDULER = 'scheduler',
	TABLE = 'table',
	TABLE_ROW_CONTAINER = 'tableRowContainer',
	TITLE = 'title',
	VIEW_DATE = 'viewDate',

	SCHEDULER_VIEW = 'scheduler-view',
	SCHEDULER_VIEW_MONTH = 'scheduler-view-month',

	getCN = A.getClassName,

	CSS_SVM_TABLE_DATA_COL_NOMONTH = getCN(SCHEDULER_VIEW_MONTH, TABLE, DATA, COL, NOMONTH),
	CSS_SVT_TABLE_DATA_COL_TITLE = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE);

/**
 * A base class for SchedulerMonthView.
 *
 * @class A.SchedulerMonthView
 * @extends A.SchedulerTableView
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var SchedulerMonthView = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property SchedulerMonthView.NAME
	 * @type String
	 * @static
	 */
	NAME: SCHEDULER_VIEW_MONTH,

	/**
	 * Static property used to define the default attribute
	 * configuration for the SchedulerMonthView.
	 *
	 * @property SchedulerMonthView.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute displayDaysInterval
		 * @default 42
		 * @type Number
		 * @readyOnly
		 */
		displayDaysInterval: {
			readOnly: true,
			value: 42
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute name
		 * @default 'month'
		 * @type String
		 */
		name: {
			value: MONTH
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute navigationDateFormatter
		 * @type Function
		 */
		navigationDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(
					date,
					{
						format: '%B %Y',
						locale: scheduler.get(LOCALE)
					}
				);
			},
			validator: isFunction
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property SchedulerMonthView.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.SchedulerTableView,

	prototype: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getAdjustedViewDate
		 * @param val
		 */
		getAdjustedViewDate: function(val) {
			var instance = this;

			return DateMath.toMidnight(DateMath.findMonthStart(val));
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

			return DateMath.toLastHour(DateMath.add(viewDate, DateMath.MONTH, 1));
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

			return DateMath.toMidnight(DateMath.subtract(viewDate, DateMath.MONTH, 1));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method plotEvents
		 */
		plotEvents: function() {
			var instance = this;

			A.SchedulerMonthView.superclass.plotEvents.apply(instance, arguments);

			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);

			var monthEnd = DateMath.findMonthEnd(viewDate);
			var monthStart = DateMath.findMonthStart(viewDate);

			var currentIntervalStart = instance._findCurrentIntervalStart();

			var colTitleNodes = instance[TABLE_ROW_CONTAINER].all(_DOT+CSS_SVT_TABLE_DATA_COL_TITLE);

			colTitleNodes.each(function(colTitleNode, index) {
				var celDate = DateMath.add(currentIntervalStart, DateMath.DAY, index);

				if (DateMath.before(celDate, monthStart) || DateMath.after(celDate, monthEnd)) {
					colTitleNode.addClass(CSS_SVM_TABLE_DATA_COL_NOMONTH);
				}
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _findCurrentIntervalStart
		 * @protected
		 */
		_findCurrentIntervalStart: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);

			return instance._findFirstDayOfWeek(viewDate);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _findFirstDayOfWeek
		 * @param date
		 * @protected
		 */
		_findFirstDayOfWeek: function(date) {
			var instance = this;

			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
		}

	}
});

A.SchedulerMonthView = SchedulerMonthView;