AUI.add('aui-calendar-base', function(A) {
/**
 * The Calendar component is a UI control that enables users to choose one or
 * more dates from a graphical calendar presented in a single month or multi
 * month interface. Calendars are generated entirely via script and can be
 * navigated without any page refreshes.
 *
 * @module aui-calendar
 * @submodule aui-calendar-base
 */

var L = A.Lang,
	isString = L.isString,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isUndefined = L.isUndefined,
	isNumber = L.isNumber,

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
	DISABLED = 'disabled',
	DOT = '.',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	HEADER = 'hd',
	HEADER_CONTENT = 'headerContent',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	HOVER = 'hover',
	ICON = 'icon',
	LOCALE = 'locale',
	MAX_DATE = 'maxDate',
	MIN_DATE = 'minDate',
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
	CSS_CALENDAR_DISABLED = getCN(CALENDAR, DISABLED),
	CSS_DAY = getCN(CALENDAR, DAY),
	CSS_DAY_BLANK = getCN(CALENDAR, DAY, BLANK),
	CSS_DAY_HIDDEN = getCN(CALENDAR, DAY, HIDDEN),
	CSS_HEADER = getCN(CALENDAR, HEADER),
	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_ICON = getCN(ICON),
	CSS_ICON_CIRCLE_TRIANGLE_L = getCN(ICON, CIRCLE, TRIANGLE, 'l'),
	CSS_ICON_CIRCLE_TRIANGLE_R = getCN(ICON, CIRCLE, TRIANGLE, 'r'),
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

/**
 * <p><img src="assets/images/aui-calendar/main.png"/></p>
 *
 * A base class for Calendar, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Setting Configuration Options</li>
 *    <li>Obtaining Selected Dates</li>
 *    <li>Creating International Calendars</li>
 *    <li>Customizing the Calendar</li>
 * </ul>
 * 
 * Quick Example:
 * 
 * <pre><code>var instance = new A.Calendar({
 *  trigger: '#input1',
 *  dates: ['09/14/2009', '09/15/2009'],
 *  dateFormat: '%d/%m/%y %A',
 *  setValue: true,
 *  selectMultipleDates: true
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="Calendar.html#configattributes">Configuration Attributes</a> available for
 * Calendar.
 * 
 * @class Calendar
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 * @extends ContextOverlay
 */
function Calendar(config) {
	Calendar.superclass.constructor.apply(this, arguments);
}

A.mix(Calendar, {
	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property Calendar.NAME
	 * @type String
	 * @static
	 */
	NAME: CALENDAR,

	/**
	 * Static property used to define the default attribute
	 * configuration for the Calendar.
	 *
	 * @property Calendar.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {
		/**
		 * Current day number.
		 *
		 * @attribute currentDay
		 * @default Current day
		 * @type Number
		 */
		currentDay: {
			value: (new Date()).getDate()
		},

		/**
		 * Current month number.
		 *
		 * @attribute currentMonth
		 * @default Current month
		 * @type Number
		 */
		currentMonth: {
			value: (new Date()).getMonth()
		},

		/**
		 * Current year number.
		 *
		 * @attribute currentYear
		 * @default Current year
		 * @type Number
		 */
		currentYear: {
			value: (new Date()).getFullYear()
		},

		/**
		 * Dates which the calendar will show as selected by default.
		 *
		 * @attribute dates
		 * @default Current date
		 * @type Array
		 */
		dates: {
			value: [ new Date() ],
			validator: isArray,
			setter: function(v) {
				return this._setDates(v);
			}
		},

		/**
		 * The default date format string which can be overriden for
         * localization support. The format must be valid according to
         * <a href="DataType.Date.html">A.DataType.Date.format</a>.
		 *
		 * @attribute dateFormat
		 * @default %m/%d/%Y
		 * @type String
		 */
		dateFormat: {
			value: '%m/%d/%Y',
			validator: isString
		},

		/**
		 * First day of the week: Sunday is 0, Monday is 1.
		 *
		 * @attribute firstDayOfWeek
		 * @default 0
		 * @type Number
		 */
		firstDayOfWeek: {
			value: 0,
			validator: isNumber
		},

		/**
		 * Minimum allowable date. Accepts String in the same format of
         * <a href="Calendar.html#config_dateFormat">dateFormat</a> or a Date
         * object.
		 *
		 * @attribute minDate
		 * @default null
		 * @type Date | String
		 */
		minDate: {
			value: null,
			setter: function(v) {
				return this._setMinMaxDate(v);
			}
		},

		/**
		 * Maximum allowable date. Accepts String in the same format of
         * <a href="Calendar.html#config_dateFormat">dateFormat</a> or a Date
         * object.
		 *
		 * @attribute maxDate
		 * @default null
		 * @type String | Date
		 */
		maxDate: {
			value: null,
			setter: function(v) {
				return this._setMinMaxDate(v);
			}
		},

		showOn: {
			value: 'mousedown'
		},

		hideOn: {
			value: 'mousedown'
		},

		/**
		 * Wether accepts to select multiple dates.
		 *
		 * @attribute selectMultipleDates
		 * @default false
		 * @type boolean
		 */
		selectMultipleDates: {
			value: false
		},

		/**
		 * If true set the selected date with the correct
		 * <a href="Calendar.html#config_dateFormat">dateFormat</a> to the
		 * value of the input field which is hosting the Calendar.
		 *
		 * @attribute setValue
		 * @default true
		 * @type boolean
		 */
		setValue: {
			value: true,
			validator: isBoolean
		},

		/**
		 * If true is able to do stacking with another overlays.
		 *
		 * @attribute stack
		 * @default true
		 * @type boolean
		 */
		stack: {
			lazyAdd: false,
			value: true,
			setter: function(v) {
				return this._setStack(v);
			},
			validator: isBoolean
		}
	}
});

A.extend(Calendar, A.ContextOverlay, {
	/**
	 * Construction logic executed during Calendar instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function() {
		var instance = this;

		instance.selectedDates = [];
	},

	/**
	 * Create the DOM structure for the Calendar. Lifecycle.
	 *
	 * @method renderUI
	 * @protected
	 */
	renderUI: function() {
		var instance = this;

		Calendar.superclass.renderUI.apply(this, arguments);

		instance._renderCalendar();
		instance._renderWeekDays();
		instance._renderBlankDays();
		instance._renderMonthDays();
	},

	/**
	 * Bind the events on the Calendar UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
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

	/**
	 * Sync the Calendar UI. Lifecycle.
	 *
	 * @method syncUI
	 * @protected
	 */
	syncUI: function() {
		var instance = this;

		Calendar.superclass.syncUI.apply(this, arguments);

		instance._syncView();
	},

	/**
	 * Sync Calendar header, days and selected days UI.
	 *
	 * @method _syncView
	 * @protected
	 */
	_syncView: function() {
		var instance = this;
		var currentDay = instance.get(CURRENT_DAY);
		var currentMonth = instance.get(CURRENT_MONTH);
		var currentYear = instance.get(CURRENT_YEAR);

		instance._syncDays()
		instance._syncHeader();
		instance._syncSelectedDays();
	},

	/**
	 * Sync Calendar header UI.
	 *
	 * @method _syncHeader
	 * @protected
	 */
	_syncHeader: function() {
		var instance = this;
		var currentMonth = instance.get(CURRENT_MONTH);
		var currentYear = instance.get(CURRENT_YEAR);

		var title = [ instance._getMonthName(currentMonth), currentYear ].join(' ');

		instance.headerTitleNode.html(title);
	},

	/**
	 * Sync Calendar days UI.
	 *
	 * @method _syncDays
	 * @protected
	 */
	_syncDays: function() {
		var instance = this;
		var daysInMonth = instance.getDaysInMonth();
		var firstWeekDay = instance.getFirstDayOfWeek();
		var currentDate = instance.getCurrentDate();

		instance.monthDays.each(function(monthDayNode, day) {
			if (day >= daysInMonth) {
				// displaying the correct number of days in the current month
				monthDayNode.addClass(CSS_DAY_HIDDEN);
			}
			else {
				monthDayNode.removeClass(CSS_DAY_HIDDEN);
			}

			// restricting date
			currentDate.setDate(day + 1);

			instance._restrictDate(currentDate, monthDayNode);
		});

		instance.blankDays.each(function(blankDayNode, day) {
			var blankDays = (firstWeekDay - instance.get(FIRST_DAY_OF_WEEK) + 7) % 7;

			if (day < blankDays) {
				// show padding days to position the firstWeekDay correctly
				blankDayNode.removeClass(CSS_DAY_HIDDEN);
			}
			else {
				blankDayNode.addClass(CSS_DAY_HIDDEN);
			}
		});
	},

	/**
	 * Sync Calendar selected days UI.
	 *
	 * @method _syncSelectedDays
	 * @protected
	 */
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

				try {
					// focus the last selected date
					// IE doesn't support focus on hidden elements
					dayNode.focus();
				}
				catch (err) {}
			}
		}, dates);
	},

	/**
	 * Render Calendar DOM elements.
	 *
	 * @method _renderCalendar
	 * @protected
	 */
	_renderCalendar: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		/**
		 * Container for house the week days elements.
		 *
		 * @property weekDaysNode
		 * @type Node
		 * @protected
		 */
		instance.weekDaysNode = A.Node.create(TPL_CALENDAR_WEEKDAYS);

		/**
		 * Container for house the month days elements.
		 *
		 * @property monthDaysNode
		 * @type Node
		 * @protected
		 */
		instance.monthDaysNode = A.Node.create(TPL_CALENDAR_MONTHDAYS);

		/**
		 * Header title Node.
		 *
		 * @property headerTitleNode
		 * @type Node
		 * @protected
		 */
		instance.headerTitleNode = A.Node.create(TPL_CALENDAR_HEADER_TITLE);

		/**
		 * This node is the WidgetStdMod.HEADER of the Calendar Overlay.
         * Container to the
         * <a href="Calendar.html#property_headertitleNode">headertitleNode</a>.
		 *
		 * @property headerContentNode
		 * @type Node
		 * @protected
		 */
		instance.headerContentNode = A.Node.create(TPL_CALENDAR_HEADER).append(instance.headerTitleNode);

		var bodyContent = A.Node.create('<div></div>');
		bodyContent.append(this.weekDaysNode);
		bodyContent.append(this.monthDaysNode);

		instance.setStdModContent(WidgetStdMod.HEADER, instance.headerContentNode);
		instance.setStdModContent(WidgetStdMod.BODY, bodyContent);

		boundingBox.addClass(CSS_CALENDAR);
	},

	/**
	 * Render Calendar DOM week days elements.
	 *
	 * @method _renderWeekDays
	 * @protected
	 */
	_renderWeekDays: function() {
		var day = 0;
		var instance = this;
		var weekDay = A.Node.create(TPL_CALENDAR_WEEK);
		var firstWeekDay = instance.get(FIRST_DAY_OF_WEEK);

		while(day < 7) {
			var fixedDay = (day + firstWeekDay) % 7;
			var dayName = instance._getDayNameMin(fixedDay);

			instance.weekDaysNode.append(
				weekDay.cloneNode().html(dayName)
			);

			day++;
		}
	},

	/**
	 * Render Calendar DOM blank days elements. Blank days are used to align
     * with the week day column.
	 *
	 * @method _renderBlankDays
	 * @protected
	 */
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

	/**
	 * Render Calendar DOM month days elements.
	 *
	 * @method _renderMonthDays
	 * @protected
	 */
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

	/**
	 * Bind DOM events to the UI.
	 *
	 * @method _bindDOMEvents
	 * @private
	 */
	_bindDOMEvents: function() {
		var instance = this;
		var headerContentNode = instance.headerContentNode;
		var boundingBox = instance.get(BOUNDING_BOX);

		var nextIcon = headerContentNode.query(DOT+CSS_ICON_CIRCLE_TRIANGLE_R)
		var prevIcon = headerContentNode.query(DOT+CSS_ICON_CIRCLE_TRIANGLE_L)

		var eventHalt = function(event) {
			event.halt();
		};

		boundingBox.on('click', eventHalt);
		boundingBox.on('mousedown', eventHalt);

		nextIcon.on('mousedown', A.bind(instance._selectNextMonth, instance));
		prevIcon.on('mousedown', A.bind(instance._selectPrevMonth, instance));
	},

	/**
	 * Delegate DOM events to the UI.
	 *
	 * @method _bindDelegateMonthDays
	 * @private
	 */
	_bindDelegateMonthDays: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		boundingBox.delegate('click', A.bind(instance._onClickDays, instance), DOT+CSS_DAY);
		boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterDays, instance), DOT+CSS_DAY);
		boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveDays, instance), DOT+CSS_DAY);
	},

	/**
	 * Check if a date is already selected.
	 *
	 * @method alreadySelected
	 * @param {Date} date Date to be checked.
	 * @return {boolean}
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

	/**
	 * Get the selected dates.
	 *
	 * @method getSelectedDates
	 * @return {Array}
	 */
	getSelectedDates: function() {
		var instance = this;

		return instance.get(DATES);
	},

	/**
	 * Get the selected dates formatted by the
     * <a href="Calendar.html#config_dateFormat">dateFormat</a>.
	 *
	 * @method getFormattedSelectedDates
	 * @return {Array}
	 */
	getFormattedSelectedDates: function() {
		var instance = this;
		var dates = [];

		instance._eachSelectedDate(function(date) {
			dates.push( instance.formatDate( date, instance.get(DATE_FORMAT) ) );
		});

		return dates;
	},

	/**
	 * Get an Array with selected dates with detailed information (day, month, year).
	 *<pre><code>[{
	 *    year: date.getFullYear(),
	 *    month: date.getMonth(),
	 *    day: date.getDate()
	 * }]</code></pre>
	 *
	 * @method getDetailedSelectedDates
	 * @return {Array}
	 */
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

	 /**
	  * Get the locale map containing the respective values for the
      * <a href="Widget.html#config_locale">locale</a> used.
	  *
	  * <pre><code>A.DataType.Date.Locale['pt-br'] = A.merge(
	  *	A.DataType.Date.Locale['en'], {
	  *		a: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Fri', 'Sat'],
	  *		A: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
	  *		b: ['Jan','Fev','Mar','Abr','Mai','Jun', 'Jul','Ago','Set','Out','Nov','Dez'],
	  *		B: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
	  *		c: '%a %d %b %Y %T %Z',
	  *		p: ['AM', 'PM'],
	  *		P: ['am', 'pm'],
	  *		r: '%I:%M:%S %p',
	  *		x: '%d/%m/%y',
	  *		X: '%T'
	  *	}
	  *);</code></pre>
	  *
	  * @method _getLocaleMap
	  * @protected
	  * @return {Object}
	  */
	_getLocaleMap: function() {
		var instance = this;

		return A.DataType.Date.Locale[ instance.get(LOCALE) ];
	},

	/**
	 * Util method to disable day nodes between
     * <a href="Calendar.html#config_minDate">minDate</a> and
     * <a href="Calendar.html#config_maxDate">maxDate</a>.
	 *
	 * @method _restrictDate
	 * @param {Date} currentDate Current date showed on the Calendar.
	 * @param {Node} monthDayNode Day node to be disabled.
	 * @protected
	 */
	_restrictDate: function(currentDate, monthDayNode) {
		var instance = this;
		var maxDate = instance.get(MAX_DATE);
		var minDate = instance.get(MIN_DATE);

		var disablePrev = minDate && (currentDate < minDate);
		var disableNext = maxDate && (currentDate > maxDate);

		if (disablePrev || disableNext) {
			monthDayNode.addClass(CSS_CALENDAR_DISABLED);
		}
		else {
			monthDayNode.removeClass(CSS_CALENDAR_DISABLED);
		}
	},

	/**
	 * Select the current date returned by
     * <a href="Calendar.html#method_getCurrentDate">getCurrentDate</a>.
	 *
	 * @method _selectDate
	 * @protected
	 */
	_selectDate: function() {
		var instance = this;
		var dates = instance.get(DATES);
		var currentDate = instance.getCurrentDate();

		// if is single selection reset the selected dates
		if (!instance.get(SELECT_MULTIPLE_DATES)) {
			dates = [];
		}

		if (!instance.alreadySelected(currentDate)) {
			dates.push(currentDate);
			instance.set(DATES, dates);
		}
	},

	/**
	 * Remove the passed date from
     * <a href="Calendar.html#config_dates">dates</a>.
	 *
	 * @method _removeDate
	 * @param {Date} date Date to remove
	 * @protected
	 */
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

 	/**
 	 * Loop each date from <a href="Calendar.html#config_dates">dates</a> and
     * executes a callback.
 	 *
 	 * @method _eachSelectedDate
 	 * @param {function} fn Callback to be executed for each date.
 	 * @param {Dates} dates Optional dates Array to loop through. If not passed it will use
     * the <a href="Calendar.html#config_dates">dates</a>.
 	 * @protected
 	 */
	_eachSelectedDate: function(fn, dates) {
		var instance = this;

		if (!dates) {
			dates = instance.get(DATES);
		}

		A.Array.each(dates, function() {
			fn.apply(this, arguments);
		});
	},

	/**
	 * Compare two dates.
	 *
	 * @method _compareDates
	 * @param {Date} d1
	 * @param {Date} d2
	 * @protected
	 * @return {boolean}
	 */
	_compareDates: function(d1, d2) {
		return ( d1.getTime() == d2.getTime() );
	},

	/**
	 * Navigate to the next month. Fired from the next icon on the Calendar
     * header.
	 *
	 * @method _selectNextMonth
	 * @param {EventFacade} event
	 * @protected
	 */
	_selectNextMonth: function(event) {
		var instance = this;

		instance._navigateMonth(+1);

		event.preventDefault();
	},

	/**
	 * Navigate to the previous month. Fired from the previous icon on the
	 * Calendar header.
	 *
	 * @method _selectPrevMonth
	 * @param {EventFacade} event
	 * @protected
	 */
	_selectPrevMonth: function(event) {
		var instance = this;

		instance._navigateMonth(-1);

		event.preventDefault();
	},

	/**
	 * Navigate through months and re-sync the UI.
	 *
	 * @method _navigateMonth
	 * @param {Number} offset Offset of the number of months to navigate.
     * Could be a positive or a negative offset.
	 * @protected
	 */
	_navigateMonth: function(offset) {
		var instance = this;
		var currentMonth = instance.get(CURRENT_MONTH);
		var currentYear = instance.get(CURRENT_YEAR);

		var date = new Date(currentYear, currentMonth + offset);

		// when navigate by month update the year also
		instance.set(CURRENT_MONTH, date.getMonth());
		instance.set(CURRENT_YEAR, date.getFullYear());
	},

    /**
     * Fires after select event.
     *
     * @method _afterSetDates
     * @param {EventFacade} event select custom event
     * @protected
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

    /**
     * Fires on click days elements.
     *
     * @method _onClickDays
     * @param {EventFacade} event
     * @protected
     */
	_onClickDays: function(event) {
		var instance = this;
		var target  = event.currentTarget || event.target;
		var day = instance.monthDays.indexOf(target)+1;
		var disabled = target.test(DOT+CSS_CALENDAR_DISABLED);

		if (!disabled) {
			instance.set(CURRENT_DAY, day);

			var currentDate = instance.getCurrentDate();
			var alreadySelected = instance.alreadySelected(currentDate);

			if (alreadySelected) {
				instance._removeDate(currentDate);
			}
			else {
				instance._selectDate();
			}
		}

		event.preventDefault();
	},

    /**
     * Fires on mouseenter days elements.
     *
     * @method _onMouseEnterDays
     * @param {EventFacade} event
     * @protected
     */
	_onMouseEnterDays: function(event) {
		var instance = this;
		var target  = event.currentTarget || event.target;

		target.replaceClass(CSS_STATE_DEFAULT, CSS_STATE_HOVER);
	},

    /**
     * Fires on mouseleave days elements.
     *
     * @method _onMouseLeaveDays
     * @param {EventFacade} event
     * @protected
     */
	_onMouseLeaveDays: function(event) {
		var instance = this;
		var target  = event.currentTarget || event.target;

		target.replaceClass(CSS_STATE_HOVER, CSS_STATE_DEFAULT);
	},

	/**
	 * Setter for the <a href="Calendar.html#config_dates">dates</a> attribute.
	 *
	 * @method _setDates
	 * @param {Array} value
	 * @protected
	 * @return {Array}
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

	/**
	 * Setter for the <a href="Calendar.html#config_maxDates">maxDates</a> or
     * <a href="Calendar.html#config_mainDates">minDates</a> attributes.
	 *
	 * @method _setMinMaxDate
	 * @param {Date} value
	 * @protected
	 * @return {Date}
	 */
	_setMinMaxDate: function(value) {
		var instance = this;

		if (isString(value)) {
			value = instance.parseDate( value );
		}

		return value;
	},

	/**
	 * Setter for the <a href="Calendar.html#config_stack">stack</a> attribute.
	 *
	 * @method _setStack
	 * @param {boolean} value
	 * @protected
	 * @return {boolean}
	 */
	_setStack: function(value) {
		var instance = this;

		if (value) {
			A.CalendarManager.register(instance);
		}
		else {
			A.CalendarManager.remove(instance);
		}

		return value;
	},

	/**
	 * Get current date.
	 *
	 * @method getCurrentDate
	 * @return {Date}
	 */
	getCurrentDate: function() {
		var instance = this;
		var date = instance._normalizeYearMonth();

		return ( new Date(date.year, date.month, date.day) );
	},

	/**
	 * Get the number of days in the passed year and month.
	 *
	 * @method getDaysInMonth
	 * @param {Number} year Year in the format YYYY.
	 * @param {Number} month 0 for January 11 for December.
	 * @return {Number}
	 */
	getDaysInMonth: function(year, month) {
		var instance = this;
		var date = instance._normalizeYearMonth(year, month);

        return ( 32 - new Date(date.year, date.month, 32).getDate() );
    },

	/**
	 * Get the Date for the first day of the passed year and month.
	 *
	 * @method getFirstDate
	 * @param {Number} year Year in the format YYYY.
	 * @param {Number} month 0 for January 11 for December.
	 * @return {Date}
	 */
	getFirstDate: function(year, month) {
		var instance = this;
		var date = instance._normalizeYearMonth(year, month);

		return ( new Date(date.year, date.month, 1) );
	},

	/**
	 * Get the Date for the last day of the passed year and month.
	 *
	 * @method getLastDate
	 * @param {Number} year Year in the format YYYY.
	 * @param {Number} month 0 for January 11 for December.
	 * @return {Date}
	 */
	getLastDate: function(year, month) {
		var instance = this;
		var date = instance._normalizeYearMonth(year, month);
		var daysInMonth = instance.getDaysInMonth(date.month);

		return ( new Date(date.year, date.month, daysInMonth) );
	},

	/**
	 * Get the first day of week of the passed year and month.
	 *
	 * @method getFirstDayOfWeek
	 * @param {Number} year Year in the format YYYY.
	 * @param {Number} month 0 for January 11 for December.
	 * @return {Number}
	 */
	getFirstDayOfWeek: function(year, month) {
		var instance = this;

		return instance.getFirstDate(year, month).getDay();
	},

	/**
	 * Returns an Object with the current day, month and year.
	 *
	 * @method _normalizeYearMonth
	 * @param {Number} year Year in the format YYYY.
	 * @param {Number} month 0 for January 11 for December.
	 * @param {Number} day
	 * @protected
	 * @return {Object}
	 */
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

	/**
	 * Get the day name of the passed weekDay from the locale map.
	 *
	 * @method _getDayName
	 * @param {Number} weekDay
	 * @protected
	 * @return {String}
	 */
	_getDayName: function(weekDay) {
		var instance = this;
		var localeMap = instance._getLocaleMap();

		return localeMap.A[weekDay];
	},

	/**
	 * Get a short day name of the passed weekDay from the locale map.
	 *
	 * @method _getDayNameShort
	 * @param {Number} weekDay
	 * @protected
	 * @return {String}
	 */
	_getDayNameShort: function(weekDay) {
		var instance = this;
		var localeMap = instance._getLocaleMap();

		return localeMap.a[weekDay];
	},

	/**
	 * Get a very short day name of the passed weekDay from the locale map.
	 *
	 * @method _getDayNameMin
	 * @param {Number} weekDay
	 * @protected
	 * @return {String}
	 */
	_getDayNameMin: function(weekDay) {
		var instance = this;
		var name = instance._getDayNameShort(weekDay);

		return name.slice(0, name.length-1);
	},

	/**
	 * Get a month name of the passed month from the locale map.
	 *
	 * @method _getMonthName
	 * @param {Number} month
	 * @protected
	 * @return {String}
	 */
	_getMonthName: function(month) {
		var instance = this;
		var localeMap = instance._getLocaleMap();

		return localeMap.B[month];
	},

	/**
	 * Get a short month name of the passed month from the locale map.
	 *
	 * @method _getMonthNameShort
	 * @param {Number} month
	 * @protected
	 * @return {String}
	 */
	_getMonthNameShort: function(month) {
		var instance = this;
		var localeMap = instance._getLocaleMap();

		return localeMap.b[month];
	},

	/**
	 * Parse a string to a Date object.
	 *
	 * @method parseDate
	 * @param {String} dateString
	 * @return {Date}
	 */
	parseDate: function(dateString) {
		var instance = this;

		return ( dateString ? new Date(dateString) : new Date );
	},

	/**
	 * Format a date with the passed mask. Used on
     * <a href="Calendar.html#config_dateFormat">dateFormat</a>.
	 *
	 * @method formatDate
	 * @param {Date} date
	 * @param {String} mask See <a href="Calendar.html#config_dateFormat">dateFormat</a>.
	 * @return {String}
	 */
	formatDate: function (date, mask) {
		var instance = this;
		var locale = instance.get(LOCALE);

		return A.DataType.Date.format(date, { format: mask, locale: locale });
	}
});

A.Calendar = Calendar;

/**
 * A base class for CalendarManager:
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class CalendarManager
 * @constructor
 * @extends OverlayManager
 * @static
 */
A.CalendarManager = new A.OverlayManager({
	/**
	 * ZIndex default value passed to the
     * <a href="OverlayManager.html#config_zIndexBase">zIndexBase</a> of
     * <a href="OverlayManager.html">OverlayManager</a>.
	 *
	 * @attribute zIndexBase
	 * @default 1000
	 * @type Number
	 */
	zIndexBase: 1000
});

}, '@VERSION@' ,{skinnable:true, requires:['aui-context-overlay','datatype-date','widget-locale']});
AUI.add('aui-calendar-datepicker-select', function(A) {
/**
 * The DatePickerSelect Utility
 *
 * @module aui-calendar
 * @submodule aui-calendar-datepicker-select
 */

var L = A.Lang,
	isArray = L.isArray,

	nodeSetter = function(v) {
		return A.get(v);
	},

	createSelect = function() {
		return A.Node.create(SELECT_TPL);
	},

	APPEND_ORDER = 'appendOrder',
	BASE_NAME = 'baseName',
	BLANK = '',
	BODY = 'body',
	BUTTON = 'button',
	CALENDAR = 'calendar',
	CLEARFIX = 'clearfix',
	CURRENT_DAY = 'currentDay',
	CURRENT_MONTH = 'currentMonth',
	CURRENT_YEAR = 'currentYear',
	DATEPICKER = 'datepicker',
	DATE_FORMAT = 'dateFormat',
	DAY = 'day',
	DAY_FIELD = 'dayField',
	DAY_FIELD_NAME = 'dayFieldName',
	DISPLAY = 'display',
	DISPLAY_BOUNDING_BOX = 'displayBoundingBox',
	DOT = '.',
	HELPER = 'helper',
	MAX_DATE = 'maxDate',
	MIN_DATE = 'minDate',
	MONTH = 'month',
	MONTH_FIELD = 'monthField',
	MONTH_FIELD_NAME = 'monthFieldName',
	NAME = 'name',
	OPTION = 'option',
	POPULATE_DAY = 'populateDay',
	POPULATE_MONTH = 'populateMonth',
	POPULATE_YEAR = 'populateYear',
	SELECT = 'select',
	SELECTED = 'selected',
	TRIGGER = 'trigger',
	WRAPPER = 'wrapper',
	YEAR = 'year',
	YEAR_FIELD = 'yearField',
	YEAR_FIELD_NAME = 'yearFieldName',
	YEAR_RANGE = 'yearRange',

	getCN = A.ClassNameManager.getClassName,

	CSS_DATEPICKER = getCN(DATEPICKER),
	CSS_DATEPICKER_BUTTON_WRAPPER = getCN(DATEPICKER, BUTTON, WRAPPER),
	CSS_DATEPICKER_DAY = getCN(DATEPICKER, DAY),
	CSS_DATEPICKER_DISPLAY = getCN(DATEPICKER, DISPLAY),
	CSS_DATEPICKER_MONTH = getCN(DATEPICKER, MONTH),
	CSS_DATEPICKER_SELECT_WRAPPER = getCN(DATEPICKER, SELECT, WRAPPER),
	CSS_DATEPICKER_YEAR = getCN(DATEPICKER, YEAR),
	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),

	SELECT_TPL = '<select></select>',
	SELECT_OPTION_TPL = '<option></option>',
	DISPLAY_BOUNDING_BOX_TPL = '<div></div>',
	WRAPPER_BUTTON_TPL = '<div class="'+ CSS_DATEPICKER_BUTTON_WRAPPER +'"></div>',
	WRAPPER_SELECT_TPL = '<div class='+ CSS_DATEPICKER_SELECT_WRAPPER +'></div>';

/**
 * <p><img src="assets/images/aui-calendar-datepicker-select/main.png"/></p>
 *
 * A base class for DatePickerSelect, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Select a date from Calendar to select elements</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.DatePickerSelect({
 *  displayBoundingBox: '#displayBoundingBoxId',
 *  // locale: 'pt-br',
 *  dateFormat: '%m/%d/%y',
 *  yearRange: [ 1970, 2009 ]
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="DatePickerSelect.html#configattributes">Configuration Attributes</a> available for
 * DatePickerSelect.
 *
 * @class DatePickerSelect
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 * @extends Calendar
 */
function DatePickerSelect(config) {
	DatePickerSelect.superclass.constructor.apply(this, arguments);
}

A.mix(DatePickerSelect, {
	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DatePickerSelect.NAME
	 * @type String
	 * @static
	 */
	NAME: DATEPICKER,

	/**
	 * Static property used to define the default attribute
	 * configuration for the DatePickerSelect.
	 *
	 * @property DatePickerSelect.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {
		/**
		 * The order the selects elements are appended to the
         * <a href="DatePickerSelect.html#config_displayBoundingBox">displayBoundingBox</a>.
		 *
		 * @attribute appendOrder
		 * @default [ 'm', 'd', 'y' ]
		 * @type Array
		 */
		appendOrder: {
			value: [ 'm', 'd', 'y' ],
			validator: isArray
		},

		/**
		 * A basename to identify the select elements from this
         * DatePickerSelect.
		 *
		 * @attribute baseName
		 * @default datepicker
		 * @type String
		 */
		baseName: {
			value: DATEPICKER
		},

		/**
		 * The container
         * <a href="Widget.html#config_boundingBox">boundingBox</a> to house the
         * selects and button. The
         * <a href="Widget.html#config_boundingBox">boundingBox</a> attribute is
         * used on the Calendar Overlay.
		 *
		 * @attribute displayBoundingBox
		 * @default null
		 * @type {Node | String}
		 */
		displayBoundingBox: {
			value: null,
			setter: nodeSetter
		},

		/**
		 * HTML element to receive the day value when a date is selected.
		 *
		 * @attribute dayField
		 * @default Generated HTML select element
		 * @type {Node | String}
		 */
		dayField: {
			setter: nodeSetter,
			valueFn: createSelect
		},

		/**
		 * HTML element to receive the month value when a date is selected.
		 *
		 * @attribute monthField
		 * @default Generated HTML select element
		 * @type {Node | String}
		 */
		monthField: {
			setter: nodeSetter,
			valueFn: createSelect
		},

		/**
		 * HTML element to receive the year value when a date is selected.
		 *
		 * @attribute yearField
		 * @default Generated HTML select element
		 * @type {Node | String}
		 */
		yearField: {
			setter: nodeSetter,
			valueFn: createSelect
		},

		/**
		 * Name attribute used on the
         * <a href="DatePickerSelect.html#config_dayField">dayField</a>.
		 *
		 * @attribute dayFieldName
		 * @default day
		 * @type String
		 */
		dayFieldName: {
			value: DAY
		},

		/**
		 * Name attribute used on the
         * <a href="DatePickerSelect.html#config_monthField">monthField</a>.
		 *
		 * @attribute monthFieldName
		 * @default month
		 * @type String
		 */
		monthFieldName: {
			value: MONTH
		},

		/**
		 * Name attribute used on the
         * <a href="DatePickerSelect.html#config_yearField">yearField</a>.
		 *
		 * @attribute yearFieldName
		 * @default year
		 * @type String
		 */
		yearFieldName: {
			value: YEAR
		},

		/**
		 * Trigger element to open the calendar. Inherited from
         * <a href="ContextOverlay.html#config_trigger">ContextOverlay</a>.
		 *
		 * @attribute trigger
		 * @default Generated HTLM div element
		 * @type {Node | String}
		 */
		trigger: {
			valueFn: function() {
				return A.Node.create(WRAPPER_BUTTON_TPL).cloneNode();
			}
		},

		/**
		 * If true the Calendar is visible by default after the render phase.
         * Inherited from
         * <a href="ContextOverlay.html#config_trigger">ContextOverlay</a>.
		 *
		 * @attribute visible
		 * @default false
		 * @type boolean
		 */
		visible: {
			value: false
		},

		/**
		 * Year range to be displayed on the year select element. By default
         * it displays from -10 to +10 years from the current year.
		 *
		 * @attribute yearRange
		 * @default [ year - 10, year + 10 ]
		 * @type Array
		 */
		yearRange: {
			valueFn: function() {
				var year = new Date().getFullYear();

				return [ year - 10, year + 10 ]
			},
			validator: isArray
		},

		/**
		 * Inherited from
         * <a href="Calendar.html#config_setValue">Calendar</a>.
		 *
		 * @attribute setValue
		 * @default false
		 * @type boolean
		 */
		setValue: {
			value: false
		},

		/**
		 * If true the select element for the days will be automatic
         * populated.
		 *
		 * @attribute populateDay
		 * @default true
		 * @type boolean
		 */
		populateDay: {
			value: true
		},

		/**
		 * If true the select element for the month will be automatic
         * populated.
		 *
		 * @attribute populateMonth
		 * @default true
		 * @type boolean
		 */
		populateMonth: {
			value: true
		},

		/**
		 * If true the select element for the year will be automatic
         * populated.
		 *
		 * @attribute populateYear
		 * @default true
		 * @type boolean
		 */
		populateYear: {
			value: true
		}
	}
});

A.extend(DatePickerSelect, A.Calendar, {
	/**
	 * Create the DOM structure for the DatePickerSelect. Lifecycle.
	 *
	 * @method renderUI
	 * @protected
	 */
	renderUI: function() {
		var instance = this;

		DatePickerSelect.superclass.renderUI.apply(this, arguments);

		instance._renderElements();
		instance._renderTriggerButton();
	},

	/**
	 * Bind the events on the DatePickerSelect UI. Lifecycle.
	 *
	 * @method bindUI
	 * @protected
	 */
	bindUI: function() {
		var instance = this;

		DatePickerSelect.superclass.bindUI.apply(this, arguments);

		instance.after('datesChange', A.bind(instance._selectCurrentValues, instance));
		instance.after('currentMonthChange', A.bind(instance._afterSetCurrentMonth, instance));

		instance._bindSelectEvents();
	},

	/**
	 * Sync the DatePickerSelect UI. Lifecycle.
	 *
	 * @method syncUI
	 * @protected
	 */
	syncUI: function() {
		var instance = this;

		DatePickerSelect.superclass.syncUI.apply(this, arguments);

		instance._pupulateSelects();
		instance._selectCurrentValues();
	},

	/**
	 * Gets an Array with the field elements in the correct order defined
     * on <a href="DatePickerSelect.html#config_appendOrder">appendOrder</a>.
	 *
	 * @method _getAppendOrder
	 * @protected
	 * @return {Array}
	 */
	_getAppendOrder: function() {
		var instance = this;
		var appendOrder = instance.get(APPEND_ORDER);

		var mapping = {
			d: instance.get(DAY_FIELD),
			m: instance.get(MONTH_FIELD),
			y: instance.get(YEAR_FIELD)
		};

		var firstField = mapping[ appendOrder[0] ];
		var secondField = mapping[ appendOrder[1] ];
		var thirdField = mapping[ appendOrder[2] ];

		return [ firstField, secondField, thirdField ]
	},

	/**
	 * Render DOM elements for the DatePickerSelect.
	 *
	 * @method _renderElements
	 * @protected
	 */
	_renderElements: function() {
		var instance = this;
		var displayBoundingBox = instance.get(DISPLAY_BOUNDING_BOX);

		if (!displayBoundingBox) {
			displayBoundingBox = A.Node.create(DISPLAY_BOUNDING_BOX_TPL);

			instance.set(DISPLAY_BOUNDING_BOX, displayBoundingBox);

			A.get(BODY).append(displayBoundingBox);
		}

		var dayField = instance.get(DAY_FIELD);
		var monthField = instance.get(MONTH_FIELD);
		var yearField = instance.get(YEAR_FIELD);

		dayField.addClass(CSS_DATEPICKER_DAY);
		monthField.addClass(CSS_DATEPICKER_MONTH);
		yearField.addClass(CSS_DATEPICKER_YEAR);

		displayBoundingBox.addClass(CSS_DATEPICKER);
		displayBoundingBox.addClass(CSS_DATEPICKER_DISPLAY);
		displayBoundingBox.addClass(CSS_HELPER_CLEARFIX);

		instance._selectWrapper = A.Node.create(WRAPPER_SELECT_TPL);

		// setting name of the fields
		monthField.set(NAME, instance.get(MONTH_FIELD_NAME));
		yearField.set(NAME, instance.get(YEAR_FIELD_NAME));
		dayField.set(NAME, instance.get(DAY_FIELD_NAME));

		// append elements
		var orderedFields = instance._getAppendOrder();

		instance._selectWrapper.append(orderedFields[0]);
		instance._selectWrapper.append(orderedFields[1]);
		instance._selectWrapper.append(orderedFields[2]);

		displayBoundingBox.append( instance._selectWrapper );
	},

	/**
	 * Render DOM element for the trigger button of the DatePickerSelect.
	 *
	 * @method _renderTriggerButton
	 * @protected
	 */
	_renderTriggerButton: function() {
		var instance = this;
		var trigger = instance.get(TRIGGER).item(0);
		var displayBoundingBox = instance.get(DISPLAY_BOUNDING_BOX);

		instance._buttonItem = new A.ToolItem(CALENDAR);

		displayBoundingBox.append(trigger);

		if ( trigger.test(DOT+CSS_DATEPICKER_BUTTON_WRAPPER) ) {
			// use ToolItem if the user doesn't specify a trigger
			instance._buttonItem.render(trigger);
		}
	},

	/**
	 * Bind events on each select element (change, keypress, etc).
	 *
	 * @method _bindSelectEvents
	 * @protected
	 */
	_bindSelectEvents: function() {
		var instance = this;
		var selects = instance._selectWrapper.all(SELECT);

		selects.on('change', A.bind(instance._onSelectChange, instance));
		selects.on('keypress', A.bind(instance._onSelectChange, instance));
	},

	/**
	 * Select the current values for the day, month and year to the respective
     * input field.
	 *
	 * @method _selectCurrentValues
	 * @protected
	 */
	_selectCurrentValues: function() {
		var instance = this;

		instance._selectCurrentDay();
		instance._selectCurrentMonth();
		instance._selectCurrentYear();
	},

	/**
	 * Select the current day on the respective input field.
	 *
	 * @method _selectCurrentDay
	 * @protected
	 */
	_selectCurrentDay: function() {
		var instance = this;
		var currentDate = instance.getCurrentDate();

		instance.get(DAY_FIELD).val( currentDate.getDate() );
	},

	/**
	 * Select the current month on the respective input field.
	 *
	 * @method _selectCurrentMonth
	 * @protected
	 */
	_selectCurrentMonth: function() {
		var instance = this;
		var currentDate = instance.getCurrentDate();

		instance.get(MONTH_FIELD).val( currentDate.getMonth() );
	},

	/**
	 * Select the current year on the respective input field.
	 *
	 * @method _selectCurrentYear
	 * @protected
	 */
	_selectCurrentYear: function() {
		var instance = this;
		var currentDate = instance.getCurrentDate();

		instance.get(YEAR_FIELD).val( currentDate.getFullYear() );
	},

	/**
	 * Populate each select element with the correct data for the day, month
     * and year.
	 *
	 * @method _pupulateSelects
	 * @protected
	 */
	_pupulateSelects: function() {
		var instance = this;

		instance._populateDays();
		instance._populateMonths();
		instance._populateYears();

		// restricting dates based on the selects values
		var monthOptions = instance.get(MONTH_FIELD).all(OPTION);
		var yearOptions = instance.get(YEAR_FIELD).all(OPTION);

		var mLength = monthOptions.size() - 1;
		var yLength = yearOptions.size() - 1;

		var firstMonth = monthOptions.item(0).val();
		var firstYear = yearOptions.item(0).val();
		var lastMonth = monthOptions.item(mLength).val();
		var lastYear = yearOptions.item(yLength).val();

		var maxMonthDays = instance.getDaysInMonth(lastYear, lastMonth);

		var minDate = new Date(firstYear, firstMonth, 1);
		var maxDate = new Date(lastYear, lastMonth, maxMonthDays);

		instance.set(MAX_DATE, maxDate);
		instance.set(MIN_DATE, minDate);
	},

	/**
	 * Populate the year select element with the correct data.
	 *
	 * @method _populateYears
	 * @protected
	 */
	_populateYears: function() {
		var instance = this;
		var yearRange = instance.get(YEAR_RANGE);
		var yearField = instance.get(YEAR_FIELD);

		if (instance.get(POPULATE_YEAR)) {
			instance._populateSelect(yearField, yearRange[0], yearRange[1]);
		}
	},

	/**
	 * Populate the month select element with the correct data.
	 *
	 * @method _populateMonths
	 * @protected
	 */
	_populateMonths: function() {
		var instance = this;
		var monthField = instance.get(MONTH_FIELD);
		var localeMap = instance._getLocaleMap();
		var monthLabels = localeMap.B;

		if (instance.get(POPULATE_MONTH)) {
			instance._populateSelect(monthField, 0, (monthLabels.length - 1), monthLabels);
		}
	},

	/**
	 * Populate the day select element with the correct data.
	 *
	 * @method _populateDays
	 * @protected
	 */
	_populateDays: function() {
		var instance = this;
		var dayField = instance.get(DAY_FIELD);
		var daysInMonth = instance.getDaysInMonth();

		if (instance.get(POPULATE_DAY)) {
			instance._populateSelect(dayField, 1, daysInMonth);
		}
	},

	/**
	 * Populate a select element with the data passed on the params.
	 *
	 * @method _populateSelect
	 * @param {HTMLSelectElement} select Select to be populated
	 * @param {Number} fromIndex Index to start
	 * @param {Number} toIndex Index to end
	 * @param {Object} values Object with labels to be used as content of each
     * option. Optional.
	 * @protected
	 * @return {String}
	 */
	_populateSelect: function(select, fromIndex, toIndex, labels, values) {
		var i = 0;
		var index = fromIndex;
		var instance = this;

		select.empty();
		labels = labels || [];
		values = values || [];

		while (index <= toIndex) {
			var value = values[index] || index;
			var label = labels[index] || index;

			A.Node.getDOMNode(select).options[i] = new Option(label, index);

			i++;
			index++;
		}
	},

	/**
	 * Fired on any select change.
	 *
	 * @method _onSelectChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_onSelectChange: function(event) {
		var instance = this;
		var target = event.currentTarget || event.target;
		var monthChanged = target.test(DOT+CSS_DATEPICKER_MONTH);

		var currentDay = instance.get(DAY_FIELD).val();
		var currentMonth = instance.get(MONTH_FIELD).val();
		var currentYear = instance.get(YEAR_FIELD).val();

		instance.set(CURRENT_DAY, currentDay);
		instance.set(CURRENT_MONTH, currentMonth);
		instance.set(CURRENT_YEAR, currentYear);

		if (monthChanged) {
			instance._afterSetCurrentMonth();
		}

		instance._selectDate();
	},

	/**
	 * Fired after
     * <a href="DatePickerSelect.html#config_currentMonth">currentMonth</a> is set.
	 *
	 * @method _onSelectChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterSetCurrentMonth: function(event) {
		var instance = this;

		instance._populateDays();
		instance._selectCurrentDay();
	}
});

A.DatePickerSelect = DatePickerSelect;

}, '@VERSION@' ,{skinnable:true, requires:['aui-calendar-base','aui-tool-item']});


AUI.add('aui-calendar', function(A){}, '@VERSION@' ,{use:['aui-calendar-base','aui-calendar-datepicker-select'], skinnable:true});

