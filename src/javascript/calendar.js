AUI.add('calendar', function(A) {

var L = A.Lang,
	isString = L.isString,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isUndefined = L.isUndefined,

	WidgetStdMod = A.WidgetStdMod,

	ACTIVE = 'active',
	BLANK = 'blank',
	BODY_CONTENT = 'bodyContent',
	BOUNDING_BOX = 'boundingBox',
	CALENDAR = 'calendar',
	CIRCLE = 'circle',
	CLEARFIX = 'clearfix',
	CURRENT_DAY = 'currentDay',
	CURRENT_MONTH = 'currentMonth',
	CURRENT_NODE = 'currentNode',
	CURRENT_YEAR = 'currentYear',
	DATES = 'dates',
	DATE_FORMAT = 'dateFormat',
	DAY = 'day',
	DEFAULT = 'default',
	DOT = '.',
	HEADER = 'hd',
	HEADER_CONTENT = 'headerContent',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	HOVER = 'hover',
	ICON = 'icon',
	LOCALE = 'locale',
	MONTH = 'month',
	MONTHDAYS = 'monthdays',
	NEXT = 'next',
	PREV = 'prev',
	SELECT_MULTIPLE_DATES = 'selectMultipleDates',
	SET_VALUE = 'setValue',
	STATE = 'state',
	TITLE = 'title',
	TRIANGLE = 'triangle',
	WEEK = 'week',
	WEEKDAYS = 'weekdays',

	getCN = A.ClassNameManager.getClassName,

	CSS_CALENDAR = getCN(CALENDAR),
	CSS_DAY = getCN(CALENDAR, DAY),
	CSS_DAY_BLANK = getCN(CALENDAR, DAY, BLANK),
	CSS_DAY_HIDDEN = getCN(CALENDAR, DAY, HIDDEN),
	CSS_HEADER = getCN(CALENDAR, HEADER),
	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_ICON = getCN(ICON),
	CSS_ICON_CIRCLE_TRIANGLE_R = getCN(ICON, CIRCLE, TRIANGLE, 'r'),
	CSS_ICON_CIRCLE_TRIANGLE_L = getCN(ICON, CIRCLE, TRIANGLE, 'l'),
	CSS_MONTHDAYS = getCN(CALENDAR, MONTHDAYS),
	CSS_NEXT = getCN(CALENDAR, NEXT),
	CSS_PREV = getCN(CALENDAR, PREV),
	CSS_STATE_ACTIVE = getCN(STATE, ACTIVE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),
	CSS_STATE_HOVER = getCN(STATE, HOVER),
	CSS_TITLE = getCN(CALENDAR, TITLE),
	CSS_WEEK = getCN(CALENDAR, WEEK),
	CSS_WEEKDAYS = getCN(CALENDAR, WEEKDAYS),

	TPL_CALENDAR_HEADER = '<div class="'+[ CSS_HEADER, CSS_STATE_DEFAULT, CSS_HELPER_CLEARFIX ].join(' ')+'">' +
							'<a href="" class="'+[ CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_L, CSS_PREV ].join(' ')+'">Back</a>'+
							'<a href="" class="'+[ CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_R, CSS_NEXT ].join(' ')+'">Prev</a>'+
						'</div>',

	TPL_CALENDAR_DAY_BLANK = '<div class="'+[ CSS_DAY_BLANK, CSS_DAY_HIDDEN ].join(' ')+'"></div>',

	TPL_CALENDAR_DAY = '<a href="#" class="'+[ CSS_DAY, CSS_STATE_DEFAULT ].join(' ')+'"></a>',

	TPL_CALENDAR_HEADER_TITLE = '<div class="'+CSS_TITLE+'"></div>',

	TPL_CALENDAR_MONTHDAYS = '<div class="'+[ CSS_MONTHDAYS, CSS_HELPER_CLEARFIX ].join(' ')+'"></div>',

	TPL_CALENDAR_WEEK = '<div class="'+CSS_WEEK+'"></div>',

	TPL_CALENDAR_WEEKDAYS = '<div class="'+[ CSS_WEEKDAYS, CSS_HELPER_CLEARFIX ].join(' ')+'"></div>';

function Calendar(config) {
	Calendar.superclass.constructor.apply(this, arguments);
}

A.mix(Calendar, {
	NAME: CALENDAR,

	ATTRS: {
		currentDay: {
			value: (new Date()).getDate()
		},

		currentMonth: {
			value: (new Date()).getMonth()
		},

		currentYear: {
			value: (new Date()).getFullYear()
		},

		dates: {
			value: [],
			validator: isArray,
			setter: function(v) {
				return this._setDates(v);
			}
		},

		dateFormat: {
			value: '%d/%m/%y',
			validator: isString
		},

		showOn: {
			value: 'mousedown'
		},

		hideOn: {
			value: 'mousedown'
		},

		selectMultipleDates: {
			value: false
		},

		setValue: {
			value: true,
			validator: isBoolean
		}
	}
});

A.extend(Calendar, A.ContextOverlay, {
	/*
	* Lifecycle
	*/
	initializer: function() {
		var instance = this;

		instance.selectedDates = [];
	},

	renderUI: function() {
		var instance = this;

		Calendar.superclass.renderUI.apply(this, arguments);

		instance._renderCalendar();
		instance._renderWeekDays();
		instance._renderBlankDays();
		instance._renderMonthDays();
	},

	bindUI: function() {
		var instance = this;

		Calendar.superclass.bindUI.apply(this, arguments);

		instance._bindDOMEvents();
		instance._bindDelegateMonthDays();

		instance.after('datesChange', A.bind(instance._afterSetDates, instance));
		// instance.after('currentDayChange', A.bind(instance._syncView, instance));
		instance.after('currentMonthChange', A.bind(instance._syncView, instance));
		instance.after('currentYearChange', A.bind(instance._syncView, instance));
	},

	syncUI: function() {
		var instance = this;

		Calendar.superclass.syncUI.apply(this, arguments);

		instance._syncView();
	},

	_syncView: function() {
		var instance = this;
		var currentDay = instance.get(CURRENT_DAY);
		var currentMonth = instance.get(CURRENT_MONTH);
		var currentYear = instance.get(CURRENT_YEAR);

		instance._syncDays()
		instance._syncHeader();
		instance._syncSelectedDays();
	},

	_syncHeader: function() {
		var instance = this;
		var currentMonth = instance.get(CURRENT_MONTH);
		var currentYear = instance.get(CURRENT_YEAR);

		var title = [ instance._getMonthName(currentMonth), currentYear ].join(' ');

		instance.headerTitleNode.html(title);
	},

	_syncDays: function() {
		var instance = this;
		var daysInMonth = instance.getDaysInMonth();
		var firstWeekDay = instance.getFirstDayOfWeek();

		instance.monthDays.each(function(monthDayNode, day) {
			if (day >= daysInMonth) {
				// displaying the correct number of days in the current month
				monthDayNode.addClass(CSS_DAY_HIDDEN);
			}
			else {
				monthDayNode.removeClass(CSS_DAY_HIDDEN);
			}
		});

		instance.blankDays.each(function(blankDayNode, day) {
			if (day < firstWeekDay) {
				// show padding days to position the firstWeekDay correctly
				blankDayNode.removeClass(CSS_DAY_HIDDEN);
			}
			else {
				blankDayNode.addClass(CSS_DAY_HIDDEN);
			}
		});
	},

	_syncSelectedDays: function(dates) {
		var instance = this;
		var currentMonth = instance.get(CURRENT_MONTH);
		var currentYear = instance.get(CURRENT_YEAR);

		instance.monthDays.replaceClass(CSS_STATE_ACTIVE, CSS_STATE_DEFAULT);
		instance.monthDays.replaceClass(CSS_STATE_HOVER, CSS_STATE_DEFAULT);

		instance._eachSelectedDate(function(date, index) {
			var canSelectDays = (currentMonth == date.getMonth()) && (currentYear == date.getFullYear());

			if (canSelectDays) {
				var dayNode = instance.monthDays.item( date.getDate() - 1 );

				dayNode.addClass(CSS_STATE_ACTIVE);
			}
		}, dates);
	},

	_renderCalendar: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		instance.weekDaysNode = A.Node.create(TPL_CALENDAR_WEEKDAYS);
		instance.monthDaysNode = A.Node.create(TPL_CALENDAR_MONTHDAYS);
		instance.headerTitleNode = A.Node.create(TPL_CALENDAR_HEADER_TITLE);
		instance.headerContentNode = A.Node.create(TPL_CALENDAR_HEADER).append(instance.headerTitleNode);

		var bodyContent = A.Node.create('<div></div>');
		bodyContent.append(this.weekDaysNode);
		bodyContent.append(this.monthDaysNode);

		instance.setStdModContent(WidgetStdMod.HEADER, instance.headerContentNode);
		instance.setStdModContent(WidgetStdMod.BODY, bodyContent);

		boundingBox.addClass(CSS_CALENDAR);
	},

	_renderWeekDays: function() {
		var day = 0;
		var instance = this;
		var weekDay = A.Node.create(TPL_CALENDAR_WEEK);

		while(day < 7) {
			var dayName = instance._getDayNameMin(day);

			instance.weekDaysNode.append(
				weekDay.cloneNode().html(dayName)
			);

			day++;
		}
	},

	// blank days are used to align with the week day column
	_renderBlankDays: function() {
		var day = 0;
		var instance = this;
		var blankDay = A.Node.create(TPL_CALENDAR_DAY_BLANK);

		while (day++ < 7) {
			instance.monthDaysNode.append(
				blankDay.cloneNode()
			);
		}

		instance.blankDays = instance.monthDaysNode.all(DOT+CSS_DAY_BLANK);
	},

	_renderMonthDays: function() {
		var day = 0;
		var instance = this;
		var monthDay = A.Node.create(TPL_CALENDAR_DAY);

		while (day++ < 31) {
			instance.monthDaysNode.append(
				monthDay.cloneNode().html(day)
			);
		}

		instance.monthDays = instance.monthDaysNode.all(DOT+CSS_DAY);
	},

	_bindDOMEvents: function() {
		var instance = this;
		var headerContentNode = instance.headerContentNode;

		var nextIcon = headerContentNode.query(DOT+CSS_ICON_CIRCLE_TRIANGLE_R)
		var prevIcon = headerContentNode.query(DOT+CSS_ICON_CIRCLE_TRIANGLE_L)

		nextIcon.on('click', A.bind(instance._selectNextMonth, instance));
		prevIcon.on('click', A.bind(instance._selectPrevMonth, instance));
	},

	_bindDelegateMonthDays: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.delegate('click', A.bind(instance._onClickDays, instance), DOT+CSS_DAY);
		boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterDays, instance), DOT+CSS_DAY);
		boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveDays, instance), DOT+CSS_DAY);
	},

	/*
	* Methods
	*/
	alreadySelected: function(date) {
		var instance = this;
		var alreadySelected = false;

		instance._eachSelectedDate(function(d, index) {
			if (instance._compareDates(d, date)) {
				alreadySelected = true;
			}
		});

		return alreadySelected;
	},

	getSelectedDates: function() {
		var instance = this;

		return instance.get(DATES);
	},

	getFormattedSelectedDates: function() {
		var instance = this;
		var dates = [];

		instance._eachSelectedDate(function(date) {
			dates.push( instance.formatDate( date, instance.get(DATE_FORMAT) ) );
		});

		return dates;
	},

	getDetailedSelectedDates: function() {
		var instance = this;
		var dates = [];

		instance._eachSelectedDate(function(date) {
			dates.push({
				year: date.getFullYear(),
				month: date.getMonth(),
				day: date.getDate()
			});
		});

		return dates;
	},

	_getLocaleMap: function() {
		var instance = this;

		return A.DataType.Date.Locale[ instance.get(LOCALE) ];
	},

	_selectDate: function(date) {
		var instance = this;
		var dates = instance.get(DATES);
		var currentDate = instance.getCurrentDate();

		if (!instance.alreadySelected(currentDate)) {
			dates.push(currentDate);
			instance.set(DATES, dates);
		}
	},

	_removeDate: function(date) {
		var instance = this;
		var dates = instance.get(DATES);

		instance._eachSelectedDate(function(d, index) {
			if (instance._compareDates(d, date)) {
				A.Array.remove(dates, index);
			}
		});

		instance.set(DATES, dates);
	},

	_eachSelectedDate: function(fn, dates) {
		var instance = this;

		if (!dates) {
			dates = instance.get(DATES);
		}

		A.Array.each(dates, function() {
			fn.apply(this, arguments);
		});
	},

	_compareDates: function(d1, d2) {
		return ( d1.getTime() == d2.getTime() );
	},

	_selectNextMonth: function(event) {
		var instance = this;

		instance._navigateMonth(+1);

		event.preventDefault();
	},

	_selectPrevMonth: function(event) {
		var instance = this;

		instance._navigateMonth(-1);

		event.preventDefault();
	},

	_navigateMonth: function(offset) {
		var instance = this;
		var currentMonth = instance.get(CURRENT_MONTH);
		var currentYear = instance.get(CURRENT_YEAR);

		var date = new Date(currentYear, currentMonth + offset);

		// when navigate by month update the year also
		instance.set(CURRENT_MONTH, date.getMonth());
		instance.set(CURRENT_YEAR, date.getFullYear());
	},

	_cancelHideOnInteraction: function() {},
	_invokeHideTaskOnInteraction: function() {},

	/*
	* Listeners
	*/
	_afterSetDates: function(event) {
		var instance = this;
		var normal = instance.getSelectedDates();
		var formatted = instance.getFormattedSelectedDates();
		var detailed = instance.getDetailedSelectedDates();
		var hasSelected = event.newVal.length;

		instance._syncSelectedDays();

		if (hasSelected) {
			instance.fire('select', {
				date: {
					detailed: detailed,
					formatted: formatted,
					normal: normal
				}
			});

			if (!instance.get(SELECT_MULTIPLE_DATES)) {
				instance.hide();
			}
		}

		if (instance.get(SET_VALUE)) {
			instance.get(CURRENT_NODE).val( formatted.join(',') );
		}
	},

	_onClickDays: function(event) {
		var instance = this;
		var target  = event.currentTarget || event.target;
		var day = instance.monthDays.indexOf(target)+1;

		instance.set(CURRENT_DAY, day);

		var currentDate = instance.getCurrentDate();
		var alreadySelected = instance.alreadySelected(currentDate);

		if (alreadySelected) {
			instance._removeDate(currentDate);
		}
		else {

			// if is single selection reset the selected dates
			if (!instance.get(SELECT_MULTIPLE_DATES)) {
				instance.set(DATES, []);
			}

			instance._selectDate(currentDate);
		}

		event.preventDefault();
	},

	_onMouseEnterDays: function(event) {
		var instance = this;
		var target  = event.currentTarget || event.target;

		target.replaceClass(CSS_STATE_DEFAULT, CSS_STATE_HOVER);
	},

	_onMouseLeaveDays: function(event) {
		var instance = this;
		var target  = event.currentTarget || event.target;

		target.replaceClass(CSS_STATE_HOVER, CSS_STATE_DEFAULT);
	},

	/*
	* Setters
	*/
	_setDates: function(value) {
		var instance = this;

		A.Array.each(value, function(date, index) {
			if (isString(date)) {
				value[index] = instance.parseDate( date );
			}
		});

		var lastSelectedDate = value[value.length - 1];

		if (lastSelectedDate) {
			// update the current values to the last selected date
			instance.set(CURRENT_DAY, lastSelectedDate.getDate());
			instance.set(CURRENT_MONTH, lastSelectedDate.getMonth());
			instance.set(CURRENT_YEAR, lastSelectedDate.getFullYear());

			instance._syncSelectedDays(value);
		}

		return value;
	},

	/*
	* Date util methods
	*/
	getCurrentDate: function() {
		var instance = this;
		var date = instance._normalizeYearMonth();

		return ( new Date(date.year, date.month, date.day) );
	},

	getDaysInMonth: function(year, month) {
		var instance = this;
		var date = instance._normalizeYearMonth(year, month);

        return ( 32 - new Date(date.year, date.month, 32).getDate() );
    },

	getFirstDate: function(year, month) {
		var instance = this;
		var date = instance._normalizeYearMonth(year, month);

		return ( new Date(date.year, date.month, 1) );
	},

	getLastDate: function(year, month) {
		var instance = this;
		var date = instance._normalizeYearMonth(year, month);
		var daysInMonth = instance.getDaysInMonth(date.month);

		return ( new Date(date.year, date.month, daysInMonth) );
	},

	getFirstDayOfWeek: function(year, month) {
		var instance = this;

		return instance.getFirstDate(year, month).getDay();
	},

	_normalizeYearMonth: function(year, month, day) {
		var instance = this;
		var currentDay = instance.get(CURRENT_DAY);
		var currentMonth = instance.get(CURRENT_MONTH);
		var currentYear = instance.get(CURRENT_YEAR);

		if (isUndefined(day)) {
			day = currentDay;
		}

		if (isUndefined(month)) {
			month = currentMonth;
		}

		if (isUndefined(year)) {
			year = currentYear;
		}

		return { year: year, month: month, day: day };
	},

	_getDayName: function(weekDay) {
		var instance = this;
		var localeMap = instance._getLocaleMap();

		return localeMap.A[weekDay];
	},

	_getDayNameShort: function(weekDay) {
		var instance = this;
		var localeMap = instance._getLocaleMap();

		return localeMap.a[weekDay];
	},

	_getDayNameMin: function(weekDay) {
		var instance = this;
		var name = instance._getDayNameShort(weekDay);

		return name.slice(0, name.length-1);
	},

	_getMonthName: function(month) {
		var instance = this;
		var localeMap = instance._getLocaleMap();

		return localeMap.B[month];
	},

	_getMonthNameShort: function(month) {
		var instance = this;
		var localeMap = instance._getLocaleMap();

		return localeMap.b[month];
	},

	parseDate: function(dateString) {
		var instance = this;

		return ( dateString ? new Date(dateString) : new Date );
	},

	formatDate: function (date, mask) {
		var instance = this;
		var locale = instance.get(LOCALE);

		return A.DataType.Date.format(date, { format: mask, locale: locale });
	}
});

A.Calendar = Calendar;

}, '@VERSION', { requires: [ 'aui-base', 'context-overlay', 'datatype-date' ] });