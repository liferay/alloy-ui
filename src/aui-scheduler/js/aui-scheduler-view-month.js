var Lang = A.Lang,
	isFunction = Lang.isFunction,

	DateMath = A.DataType.DateMath,

	DOT = '.',

	COL = 'col',
	DATA = 'data',
	DATE = 'date',
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

var SchedulerMonthView = A.Component.create({
	NAME: SCHEDULER_VIEW_MONTH,

	ATTRS: {
		displayDaysInterval: {
			readOnly: true,
			value: 42
		},

		name: {
			value: MONTH
		},

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

	EXTENDS: A.SchedulerTableView,

	prototype: {
		getAdjustedViewDate: function(val) {
			var instance = this;

			return DateMath.findMonthStart(val);
		},

		getNextDate: function() {
			var instance = this;

			var scheduler = instance.get(SCHEDULER);
			var date = scheduler.get(DATE);

			return DateMath.add(date, DateMath.MONTH, 1);
		},

		getPrevDate: function() {
			var instance = this;

			var scheduler = instance.get(SCHEDULER);
			var date = scheduler.get(DATE);

			return DateMath.subtract(date, DateMath.MONTH, 1);
		},

		plotEvents: function() {
			var instance = this;

			A.SchedulerMonthView.superclass.plotEvents.apply(instance, arguments);

			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);

			var monthEnd = DateMath.findMonthEnd(viewDate);
			var monthStart = DateMath.findMonthStart(viewDate);

			var currentIntervalStart = instance._findCurrentIntervalStart();

			var colTitleNodes = instance[TABLE_ROW_CONTAINER].all(DOT+CSS_SVT_TABLE_DATA_COL_TITLE);

			colTitleNodes.each(function(colTitleNode, index) {
				var celDate = DateMath.add(currentIntervalStart, DateMath.DAY, index);

				if (DateMath.before(celDate, monthStart) || DateMath.after(celDate, monthEnd)) {
					colTitleNode.addClass(CSS_SVM_TABLE_DATA_COL_NOMONTH);
				}
			});
		},

		_findCurrentIntervalStart: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);

			return instance._findFirstDayOfWeek(viewDate);
		},

		_findFirstDayOfWeek: function(date) {
			var instance = this;

			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
		}

	}
});

A.SchedulerMonthView = SchedulerMonthView;