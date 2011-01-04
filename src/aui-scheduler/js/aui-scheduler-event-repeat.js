A.SchedulerEventRepeat = {
	daily: {
		description: 'Every day',
		validate: function(evt, date) {
			return true;
		},
		value: 'daily'
	},

	monthly: {
		description: 'Every month',
		validate: function(evt, date) {
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return (startDate.getDate() === date.getDate());
		},
		value: 'monthly'
	},

	monWedFri: {
		description: 'Every Monday, Wednesday and Friday',
		validate: function(evt, date) {
			return DateMath.isMonWedOrFri(date);
		},
		value: 'monWedFri'
	},

	tuesThurs: {
		description: 'Every Tuesday and Thursday',
		validate: function(evt, date) {
			return DateMath.isTueOrThu(date);
		},
		value: 'tuesThurs'
	},

	weekDays: {
		description: 'Every week days',
		validate: function(evt, date) {
			return DateMath.isWeekDay(date);
		},
		value: 'weekDays'
	},

	weekly: {
		description: 'Every week',
		validate: function(evt, date) {
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return (startDate.getDay() === evt.getDay());
		},
		value: 'weekly'
	}

};