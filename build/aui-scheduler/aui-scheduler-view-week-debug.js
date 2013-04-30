AUI.add('aui-scheduler-view-week', function(A) {
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

var SchedulerWeekView = A.Component.create({
	NAME: SCHEDULER_VIEW_WEEK,

	ATTRS: {
		bodyContent: {
			value: _EMPTY_STR
		},

		days: {
			value: 7
		},

		headerViewConfig: {
			value: {
				displayDaysInterval: WEEK_LENGTH
			}
		},

		name: {
			value: WEEK
		},

		navigationDateFormatter: {
			valueFn: function() {
				return this._valueNavigationDateFormatter;
			},
			validator: isFunction
		}
	},

	EXTENDS: A.SchedulerDayView,

	prototype: {
		getAdjustedViewDate: function(val) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.toMidnight(DateMath.getFirstDayOfWeek(val, firstDayOfWeek));
		},

		getNextDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);

			return DateMath.toLastHour(DateMath.add(viewDate, DateMath.WEEK, 1));
		},

		getPrevDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var viewDate = scheduler.get(VIEW_DATE);

			return DateMath.toMidnight(DateMath.subtract(viewDate, DateMath.WEEK, 1));
		},

		getToday: function() {
			var instance = this;
			var todayDate = SchedulerWeekView.superclass.getToday.apply(this, arguments);

			return instance._firstDayOfWeek(todayDate);
		},

		_firstDayOfWeek: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
		},

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

}, '@VERSION@' ,{requires:['aui-scheduler-view-day'], skinnable:true});
