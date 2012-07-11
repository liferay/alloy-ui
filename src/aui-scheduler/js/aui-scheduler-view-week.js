var SchedulerWeekView = A.Component.create({
	NAME: SCHEDULER_VIEW_WEEK,

	ATTRS: {
		bodyContent: {
			value: EMPTY_STR
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
		adjustCurrentDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			scheduler.set(
				CURRENT_DATE,
				DateMath.getFirstDayOfWeek(currentDate, firstDayOfWeek)
			);
		},

		getNextDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var firstDayOfWeekDate = instance._firstDayOfWeek(currentDate);

			return DateMath.add(firstDayOfWeekDate, DateMath.WEEK, 1);
		},

		getPrevDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var firstDayOfWeekDate = instance._firstDayOfWeek(currentDate);

			return DateMath.subtract(firstDayOfWeekDate, DateMath.WEEK, 1);
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
					format: '%b %d',
					locale: locale
				}
			);

			var endDate = DateMath.add(startDate, DateMath.DAY, instance.get(DAYS) - 1);

			var endDateLabel = A.DataType.Date.format(
				endDate,
				{
					format: (DateMath.isMonthOverlapWeek(date) ? '%b %d' : '%d') + ', %Y',
					locale: locale
				}
			);

			return [startDateLabel, MDASH, endDateLabel].join(SPACE);
		}
	}
});

A.SchedulerWeekView = SchedulerWeekView;