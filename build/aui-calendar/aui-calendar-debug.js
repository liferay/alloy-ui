AUI.add('aui-calendar', function(A) {
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
	isDate = L.isDate,
	isString = L.isString,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isValue = L.isValue,
	isNumber = L.isNumber,

	toNumber = function(val) {
		return parseInt(val, 10) || 0;
	};

/**
* A.DataType.DateMath is used for simple date manipulation. The class is a static utility
* used for adding, subtracting, and comparing dates. Based on YAHOO.widget.DateMath.
*
* @class A.DataType.DateMath
*/
var S = A.String,

	COLON = ':',
	AM = 'am',
	PM = 'pm';

A.namespace('DataType.DateMath');

A.mix(A.DataType.DateMath, {
	/**
	* Constant field representing Day
	* @property DAY
	* @static
	* @final
	* @type String
	*/
	DAY : "D",

	/**
	* Constant field representing Week
	* @property WEEK
	* @static
	* @final
	* @type String
	*/
	WEEK : "W",

	/**
	* Constant field representing Year
	* @property YEAR
	* @static
	* @final
	* @type String
	*/
	YEAR : "Y",

	/**
	* Constant field representing Month
	* @property MONTH
	* @static
	* @final
	* @type String
	*/
	MONTH : "M",

	/**
	* Constant field representing the number of maximum days in a month
	* @property MAX_MONTH_LENGTH
	* @static
	* @final
	* @type Number
	*/
	MAX_MONTH_LENGTH: 31,

	/**
	* Constant field representing the number of maximum days in a week
	* @property WEEK_LENGTH
	* @static
	* @final
	* @type Number
	*/
	WEEK_LENGTH: 7,

	/**
	* Constant field representing one day, in milliseconds
	* @property ONE_DAY_MS
	* @static
	* @final
	* @type Number
	*/
	ONE_DAY_MS : 1000*60*60*24,

	/**
	 * Constant field representing the date in first week of January
	 * which identifies the first week of the year.
	 * <p>
	 * In the U.S, Jan 1st is normally used based on a Sunday start of week.
	 * ISO 8601, used widely throughout Europe, uses Jan 4th, based on a Monday start of week.
	 * </p>
	 * @property WEEK_ONE_JAN_DATE
	 * @static
	 * @type Number
	 */
	WEEK_ONE_JAN_DATE : 1,

	/**
	* Adds the specified amount of time to the this instance.
	* @method add
	* @param {Date} date	The JavaScript Date object to perform addition on
	* @param {String} field	The field constant to be used for performing addition.
	* @param {Number} amount	The number of units (measured in the field constant) to add to the date.
	* @return {Date} The resulting Date object
	*/
	add : function(date, field, amount) {
		var d = new Date(date.getTime());
		switch (field) {
			case this.MONTH:
				var newMonth = date.getMonth() + amount;
				var years = 0;

				if (newMonth < 0) {
					while (newMonth < 0) {
						newMonth += 12;
						years -= 1;
					}
				} else if (newMonth > 11) {
					while (newMonth > 11) {
						newMonth -= 12;
						years += 1;
					}
				}

				d.setMonth(newMonth);
				d.setFullYear(date.getFullYear() + years);
				break;
			case this.DAY:
				this._addDays(d, amount);
				// d.setDate(date.getDate() + amount);
				break;
			case this.YEAR:
				d.setFullYear(date.getFullYear() + amount);
				break;
			case this.WEEK:
				this._addDays(d, (amount * 7));
				// d.setDate(date.getDate() + (amount * 7));
				break;
		}
		return d;
	},

	/**
	 * Private helper method to account for bug in Safari 2 (webkit < 420)
	 * when Date.setDate(n) is called with n less than -128 or greater than 127.
	 * <p>
	 * Fix approach and original findings are available here:
	 * http://brianary.blogspot.com/2006/03/safari-date-bug.html
	 * </p>
	 * @method _addDays
	 * @param {Date} d JavaScript date object
	 * @param {Number} nDays The number of days to add to the date object (can be negative)
	 * @private
	 */
	_addDays : function(d, nDays) {
		if (A.UA.webkit && A.UA.webkit < 420) {
			if (nDays < 0) {
				// Ensure we don't go below -128 (getDate() is always 1 to 31, so we won't go above 127)
				for(var min = -128; nDays < min; nDays -= min) {
					d.setDate(d.getDate() + min);
				}
			} else {
				// Ensure we don't go above 96 + 31 = 127
				for(var max = 96; nDays > max; nDays -= max) {
					d.setDate(d.getDate() + max);
				}
			}
			// nDays should be remainder between -128 and 96
		}
		d.setDate(d.getDate() + nDays);
	},

	/**
	* Subtracts the specified amount of time from the this instance.
	* @method subtract
	* @param {Date} date	The JavaScript Date object to perform subtraction on
	* @param {Number} field	The this field constant to be used for performing subtraction.
	* @param {Number} amount	The number of units (measured in the field constant) to subtract from the date.
	* @return {Date} The resulting Date object
	*/
	subtract : function(date, field, amount) {
		return this.add(date, field, (amount*-1));
	},

	/**
	* Determines whether a given date is before another date on the calendar.
	* @method before
	* @param {Date} date		The Date object to compare with the compare argument
	* @param {Date} compareTo	The Date object to use for the comparison
	* @return {Boolean} true if the date occurs before the compared date; false if not.
	*/
	before : function(date, compareTo) {
		var ms = compareTo.getTime();
		if (date.getTime() < ms) {
			return true;
		} else {
			return false;
		}
	},

	/**
	* Determines whether a given date is after another date on the calendar.
	* @method after
	* @param {Date} date		The Date object to compare with the compare argument
	* @param {Date} compareTo	The Date object to use for the comparison
	* @return {Boolean} true if the date occurs after the compared date; false if not.
	*/
	after : function(date, compareTo) {
		var ms = compareTo.getTime();
		if (date.getTime() > ms) {
			return true;
		} else {
			return false;
		}
	},

	/**
	* Determines whether a given date is between two other dates on the calendar.
	* @method between
	* @param {Date} date		The date to check for
	* @param {Date} dateBegin	The start of the range
	* @param {Date} dateEnd		The end of the range
	* @return {Boolean} true if the date occurs between the compared dates; false if not.
	*/
	between : function(date, dateBegin, dateEnd) {
		if (this.after(date, dateBegin) && this.before(date, dateEnd)) {
			return true;
		} else {
			return false;
		}
	},

	/**
	* Retrieves a JavaScript Date object representing January 1 of any given year.
	* @method getJan1
	* @param {Number} calendarYear		The calendar year for which to retrieve January 1
	* @return {Date}	January 1 of the calendar year specified.
	*/
	getJan1 : function(calendarYear) {
		return this.getDate(calendarYear,0,1);
	},

	/**
	* Calculates the number of days the specified date is from January 1 of the specified calendar year.
	* Passing January 1 to this function would return an offset value of zero.
	* @method getDayOffset
	* @param {Date}	date	The JavaScript date for which to find the offset
	* @param {Number} calendarYear	The calendar year to use for determining the offset
	* @return {Number}	The number of days since January 1 of the given year
	*/
	getDayOffsetYear : function(date, calendarYear) {
		var beginYear = this.getJan1(calendarYear); // Find the start of the year. This will be in week 1.

		// Find the number of days the passed in date is away from the calendar year start
		return this.getDayOffset(date, beginYear, calendarYear);
	},

	getDayOffset : function(d1, d2, calendarYear) {
		var dayOffset = Math.ceil((d1.getTime()-d2.getTime()) / this.ONE_DAY_MS);

		return dayOffset;
	},

	/**
	* Calculates the week number for the given date. Can currently support standard
	* U.S. week numbers, based on Jan 1st defining the 1st week of the year, and
	* ISO8601 week numbers, based on Jan 4th defining the 1st week of the year.
	*
	* @method getWeekNumber
	* @param {Date}	date The JavaScript date for which to find the week number
	* @param {Number} firstDayOfWeek The index of the first day of the week (0 = Sun, 1 = Mon ... 6 = Sat).
	* Defaults to 0
	* @param {Number} janDate The date in the first week of January which defines week one for the year
	* Defaults to the value of YAHOO.widget.DateMath.WEEK_ONE_JAN_DATE, which is 1 (Jan 1st).
	* For the U.S, this is normally Jan 1st. ISO8601 uses Jan 4th to define the first week of the year.
	*
	* @return {Number} The number of the week containing the given date.
	*/
	getWeekNumber : function(date, firstDayOfWeek, janDate) {

		// Setup Defaults
		firstDayOfWeek = firstDayOfWeek || 0;
		janDate = janDate || this.WEEK_ONE_JAN_DATE;

		var targetDate = this.clearTime(date),
			startOfWeek,
			endOfWeek;

		if (targetDate.getDay() === firstDayOfWeek) {
			startOfWeek = targetDate;
		} else {
			startOfWeek = this.getFirstDayOfWeek(targetDate, firstDayOfWeek);
		}

		var startYear = startOfWeek.getFullYear(),
			startTime = startOfWeek.getTime();

		// DST shouldn't be a problem here, math is quicker than setDate();
		endOfWeek = new Date(startOfWeek.getTime() + 6*this.ONE_DAY_MS);

		var weekNum;
		if (startYear !== endOfWeek.getFullYear() && endOfWeek.getDate() >= janDate) {
			// If years don't match, endOfWeek is in Jan. and if the
			// week has WEEK_ONE_JAN_DATE in it, it's week one by definition.
			weekNum = 1;
		} else {
			// Get the 1st day of the 1st week, and
			// find how many days away we are from it.
			var weekOne = this.clearTime(this.getDate(startYear, 0, janDate)),
				weekOneDayOne = this.getFirstDayOfWeek(weekOne, firstDayOfWeek);

			// Round days to smoothen out 1 hr DST diff
			var daysDiff  = Math.round((targetDate.getTime() - weekOneDayOne.getTime())/this.ONE_DAY_MS);

			// Calc. Full Weeks
			var rem = daysDiff % 7;
			var weeksDiff = (daysDiff - rem)/7;
			weekNum = weeksDiff + 1;
		}
		return weekNum;
	},

	/**
	 * Get the first day of the week, for the give date.
	 * @param {Date} dt The date in the week for which the first day is required.
	 * @param {Number} startOfWeek The index for the first day of the week, 0 = Sun, 1 = Mon ... 6 = Sat (defaults to 0)
	 * @return {Date} The first day of the week
	 */
	getFirstDayOfWeek : function (dt, startOfWeek) {
		startOfWeek = startOfWeek || 0;
		var dayOfWeekIndex = dt.getDay(),
			dayOfWeek = (dayOfWeekIndex - startOfWeek + 7) % 7;

		return this.subtract(dt, this.DAY, dayOfWeek);
	},

	/**
	* Determines if a given week overlaps two different years.
	* @method isYearOverlapWeek
	* @param {Date}	weekBeginDate	The JavaScript Date representing the first day of the week.
	* @return {Boolean}	true if the date overlaps two different years.
	*/
	isYearOverlapWeek : function(weekBeginDate) {
		var overlaps = false;
		var nextWeek = this.add(weekBeginDate, this.DAY, 6);
		if (nextWeek.getFullYear() != weekBeginDate.getFullYear()) {
			overlaps = true;
		}
		return overlaps;
	},

	/**
	* Determines if a given week overlaps two different months.
	* @method isMonthOverlapWeek
	* @param {Date}	weekBeginDate	The JavaScript Date representing the first day of the week.
	* @return {Boolean}	true if the date overlaps two different months.
	*/
	isMonthOverlapWeek : function(weekBeginDate) {
		var overlaps = false;
		var nextWeek = this.add(weekBeginDate, this.DAY, 6);
		if (nextWeek.getMonth() != weekBeginDate.getMonth()) {
			overlaps = true;
		}
		return overlaps;
	},

	/**
	* Gets the first day of a month containing a given date.
	* @method findMonthStart
	* @param {Date}	date	The JavaScript Date used to calculate the month start
	* @return {Date}		The JavaScript Date representing the first day of the month
	*/
	findMonthStart : function(date) {
		var start = this.getDate(date.getFullYear(), date.getMonth(), 1);
		return start;
	},

	/**
	* Gets the last day of a month containing a given date.
	* @method findMonthEnd
	* @param {Date}	date	The JavaScript Date used to calculate the month end
	* @return {Date}		The JavaScript Date representing the last day of the month
	*/
	findMonthEnd : function(date) {
		var start = this.findMonthStart(date);
		var nextMonth = this.add(start, this.MONTH, 1);
		var end = this.subtract(nextMonth, this.DAY, 1);
		return end;
	},

	/**
	* Clears the time fields from a given date, effectively setting the time to 12 noon.
	* @method clearTime
	* @param {Date}	date	The JavaScript Date for which the time fields will be cleared
	* @return {Date}		The JavaScript Date cleared of all time fields
	*/
	clearTime : function(date) {
		date.setHours(12,0,0,0);
		return date;
	},

	/**
	 * Returns a new JavaScript Date object, representing the given year, month and date. Time fields (hr, min, sec, ms) on the new Date object
	 * are set to 0. The method allows Date instances to be created with the a year less than 100. "new Date(year, month, date)" implementations
	 * set the year to 19xx if a year (xx) which is less than 100 is provided.
	 * <p>
	 * <em>NOTE:</em>Validation on argument values is not performed. It is the caller's responsibility to ensure
	 * arguments are valid as per the ECMAScript-262 Date object specification for the new Date(year, month[, date]) constructor.
	 * </p>
	 * @method getDate
	 * @param {Number} y Year.
	 * @param {Number} m Month index from 0 (Jan) to 11 (Dec).
	 * @param {Number} d (optional) Date from 1 to 31. If not provided, defaults to 1.
	 * @return {Date} The JavaScript date object with year, month, date set as provided.
	 */
	getDate : function(y, m, d) {
		var dt = null;
		if (!isValue(d)) {
			d = 1;
		}
		if (y >= 100) {
			dt = new Date(y, m, d);
		} else {
			dt = new Date();
			dt.setFullYear(y);
			dt.setMonth(m);
			dt.setDate(d);
			dt.setHours(0,0,0,0);
		}
		return dt;
	},

	getDaysInMonth: function(year, month) {
		return this.findMonthEnd(this.getDate(year, month)).getDate();
    },

	toUsTimeString: function(date, padHours, omitMinutes, hideAmPm) {
		date = isDate(date) ? date : new Date(0, 0, 0, date);

		var hours = date.getHours();
		var minutes = date.getMinutes();
		var isPM = false;

		if (hours > 12) {
			isPM = true;
			hours -= 12;
		}

		if (hours === 0) {
			hours = 12;
		}

		var time = padHours ? A.String.padNumber(hours, 2) : String(hours);

		if (!omitMinutes) {
			time += COLON;
			time += A.String.padNumber(minutes, 2);
		}

		if (!hideAmPm) {
			time += (isPM ? PM : AM);
		}

		return time;
	},

	toIsoTimeString: function(date, showSeconds) {
		date = isDate(date) ? date : new Date(0, 0, 0, date);

		var hours = date.getHours();
		var minutes = date.getMinutes();
		var time = A.String.padNumber(hours, 2) + COLON + A.String.padNumber(minutes, 2);

		if (showSeconds) {
			var seconds = date.getSeconds();

			time += COLON;
			time += A.String.padNumber(seconds, 2);
		}

		return time;
	}
});

var DateMath = A.DataType.DateMath,
	WidgetStdMod = A.WidgetStdMod,

	EMPTY_STR = '',
	SPACE = ' ',

	ACTIVE = 'active',
	ALLOW_NONE = 'allowNone',
	ANCHOR = 'a',
	BLANK = 'blank',
	BLANK_DAYS = 'blankDays',
	BOUNDING_BOX = 'boundingBox',
	CALENDAR = 'calendar',
	CHILDREN = 'children',
	CIRCLE = 'circle',
	CLEARFIX = 'clearfix',
	CURRENT_DAY = 'currentDay',
	CURRENT_MONTH = 'currentMonth',
	CURRENT_YEAR = 'currentYear',
	DATA_DAY = 'data-day',
	DATA_MONTH = 'data-month',
	DATA_YEAR = 'data-year',
	DATES = 'dates',
	DATE_FORMAT = 'dateFormat',
	DAY = 'day',
	DEFAULT = 'default',
	DISABLED = 'disabled',
	DOT = '.',
	END = 'end',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	HEADER = 'hd',
	HEADER_CONTENT_NODE = 'headerContentNode',
	HEADER_TITLE_NODE = 'headerTitleNode',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	HOVER = 'hover',
	ICON = 'icon',
	ICON_NEXT_NODE = 'iconNextNode',
	ICON_PREV_NODE = 'iconPrevNode',
	LINK = 'link',
	LOCALE = 'locale',
	MAX_DATE = 'maxDate',
	MIN_DATE = 'minDate',
	MONTH = 'month',
	MONTHDAYS = 'monthdays',
	MONTH_DAYS = 'monthDays',
	MONTH_DAYS_NODE = 'monthDaysNode',
	NEXT = 'next',
	NONE = 'none',
	NONE_LINK_NODE = 'noneLinkNode',
	PADDING = 'padding',
	PADDING_DAYS_END = 'paddingDaysEnd',
	PADDING_DAYS_START = 'paddingDaysStart',
	PREV = 'prev',
	SELECT_MULTIPLE_DATES = 'selectMultipleDates',
	SHOW_OTHER_MONTH = 'showOtherMonth',
	SHOW_TODAY = 'showToday',
	START = 'start',
	STATE = 'state',
	TITLE = 'title',
	TODAY = 'today',
	TODAY_LINK_NODE = 'todayLinkNode',
	TRIANGLE = 'triangle',
	WEEK = 'week',
	WEEKDAYS = 'weekdays',
	WEEK_DAYS = 'weekDays',
	WEEK_DAYS_NODE = 'weekDaysNode',

	EV_CALENDAR_SELECT = 'calendar:select',

	getCN = A.ClassNameManager.getClassName,

	CSS_CALENDAR_DISABLED = getCN(CALENDAR, DISABLED),
	CSS_CALENDAR_LINK = getCN(CALENDAR, LINK),
	CSS_CALENDAR_LINK_NONE = getCN(CALENDAR, LINK, NONE),
	CSS_CALENDAR_LINK_TODAY = getCN(CALENDAR, LINK, TODAY),
	CSS_DAY = getCN(CALENDAR, DAY),
	CSS_DAY_MONTH = getCN(CALENDAR, DAY, MONTH),
	CSS_DAY_BLANK = getCN(CALENDAR, DAY, BLANK),
	CSS_DAY_PADDING_END = getCN(CALENDAR, DAY, PADDING, END),
	CSS_DAY_PADDING_START = getCN(CALENDAR, DAY, PADDING, START),
	CSS_HEADER = getCN(CALENDAR, HEADER),
	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_HELPER_HIDDEN = getCN(HELPER, HIDDEN),
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

	INT_MATRIX_DAYS_LENGTH = 42,
	INT_MAX_PADDING_END = 14,

	TPL_CALENDAR_NONE_LINK = '<a href="#" class="'+[ CSS_CALENDAR_LINK, CSS_CALENDAR_LINK_NONE ].join(SPACE)+'">None</a>',

	TPL_CALENDAR_TODAY_LINK = '<a href="#" class="'+[ CSS_CALENDAR_LINK, CSS_CALENDAR_LINK_TODAY ].join(SPACE)+'">Today</a>',

	TPL_CALENDAR_HEADER = '<div class="'+[ CSS_HEADER, CSS_STATE_DEFAULT, CSS_HELPER_CLEARFIX ].join(SPACE)+'"></div>',

	TPL_CALENDAR_PREV = '<a href="" class="'+[ CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_L, CSS_PREV ].join(SPACE)+'">Back</a>',

	TPL_CALENDAR_NEXT = '<a href="" class="'+[ CSS_ICON, CSS_ICON_CIRCLE_TRIANGLE_R, CSS_NEXT ].join(SPACE)+'">Prev</a>',

	TPL_CALENDAR_DAY_BLANK = '<div class="'+[ CSS_DAY_BLANK, CSS_HELPER_HIDDEN ].join(SPACE)+'"></div>',

	TPL_CALENDAR_DAY_PADDING_START = '<div class="'+[ CSS_DAY, CSS_STATE_DEFAULT, CSS_DAY_PADDING_START, CSS_HELPER_HIDDEN ].join(SPACE)+'"></div>',

	TPL_CALENDAR_DAY_PADDING_END = ['<div class="'+[ CSS_DAY, CSS_STATE_DEFAULT, CSS_DAY_PADDING_END, CSS_HELPER_HIDDEN ].join(SPACE)+'">', 0, '</div>'],

	TPL_CALENDAR_HEADER_TITLE = '<div class="'+CSS_TITLE+'"></div>',

	TPL_CALENDAR_MONTHDAYS = '<div class="'+[ CSS_MONTHDAYS, CSS_HELPER_CLEARFIX ].join(SPACE)+'"></div>',

	TPL_CALENDAR_WEEKDAYS = '<div class="'+[ CSS_WEEKDAYS, CSS_HELPER_CLEARFIX ].join(SPACE)+'"></div>',

	TPL_BUFFER_WEEKDAYS = ['<div class="'+CSS_WEEK+'">', 0, '</div>'],

	TPL_BUFFER_MONTH_DAYS = ['<a href="#" class="'+[ CSS_DAY, CSS_DAY_MONTH, CSS_STATE_DEFAULT ].join(SPACE)+'">', 0, '</a>'];

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
 * @extends OverlayContext
 */
var Calendar = A.Component.create(
	{
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
			 * Wheather displays the "none" link on the Calendar footer.
			 *
			 * @attribute allowNone
			 * @default true
			 * @type boolean
			 */
			allowNone: {
				value: true,
				validator: isBoolean
			},

			/**
			 * NodeList containing all the DOM elements for
			 * each blank day. If not specified try to query using HTML_PARSER
			 * an element inside contentBox which matches
			 * <code>aui-calendar-day-blank</code>.
			 *
			 * @attribute paddingDaysEnd
			 * @default Generated div element.
			 * @type NodeList
			 */
			paddingDaysEnd: {
				valueFn: '_valuePaddingDaysEnd'
			},

			/**
			 * NodeList containing all the DOM elements for
			 * each blank day. If not specified try to query using HTML_PARSER
			 * an element inside contentBox which matches
			 * <code>aui-calendar-day-blank</code>.
			 *
			 * @attribute paddingDaysStart
			 * @default Generated div element.
			 * @type NodeList
			 */
			paddingDaysStart: {
				valueFn: '_valuePaddingDaysStart'
			},

			/**
			 * NodeList containing all the DOM elements for
			 * each blank day. If not specified try to query using HTML_PARSER
			 * an element inside contentBox which matches
			 * <code>aui-calendar-day-blank</code>.
			 *
			 * @attribute blankDays
			 * @default Generated div element.
			 * @type NodeList
			 */
			blankDays: {
				valueFn: '_valueBlankDays'
			},

			/**
			 * Current day number.
			 *
			 * @attribute currentDay
			 * @default Current day
			 * @type Number
			 */
			currentDay: {
				setter: toNumber,
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
				setter: toNumber,
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
				setter: toNumber,
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
				lazyAdd: false,
				value: [ new Date() ],
				validator: isArray,
				setter: '_setDates'
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
			 * DOM node reference to be the header of the Calendar. If not
             * specified try to query using HTML_PARSER an element inside
             * contentBox which matches <code>aui-calendar-hd</code>.
			 *
			 * @attribute headerContentNode
			 * @default Generated div element.
			 * @type Node
			 */
			headerContentNode: {
				valueFn: function() {
					return A.Node.create(TPL_CALENDAR_HEADER);
				}
			},

			/**
			 * DOM node reference to be the title of the Calendar. If not
             * specified try to query using HTML_PARSER an element inside
             * contentBox which matches <code>aui-calendar-title</code>.
			 *
			 * @attribute headerTitleNode
			 * @default Generated div element.
			 * @type Node
			 */
			headerTitleNode: {
				valueFn: function() {
					return A.Node.create(TPL_CALENDAR_HEADER_TITLE);
				}
			},

			/**
			 * DOM node reference to be the icon next of the Calendar. If not
             * specified try to query using HTML_PARSER an element inside
             * contentBox which matches <code>aui-calendar-prev</code>.
			 *
			 * @attribute iconNextNode
			 * @default Generated div element.
			 * @type Node
			 */
			iconNextNode: {
				valueFn: function() {
					return A.Node.create(TPL_CALENDAR_NEXT);
				}
			},

			/**
			 * DOM node reference to be the icon prev of the Calendar. If not
             * specified try to query using HTML_PARSER an element inside
             * contentBox which matches <code>aui-calendar-prev</code>.
			 *
			 * @attribute iconPrevNode
			 * @default Generated div element.
			 * @type Node
			 */
			iconPrevNode: {
				valueFn: function() {
					return A.Node.create(TPL_CALENDAR_PREV);
				}
			},

			/**
			 * Maximum allowable date. Values supported by the Date
             * constructor are supported.
			 *
			 * @attribute maxDate
			 * @default null
			 * @type String | Date
			 */
			maxDate: {
				value: null,
				setter: '_setMinMaxDate'
			},

			/**
			 * Minimum allowable date. Values supported by the Date
             * constructor are supported.
			 *
			 * @attribute minDate
			 * @default null
			 * @type Date | String
			 */
			minDate: {
				value: null,
				setter: '_setMinMaxDate'
			},

			/**
			 * NodeList reference containing the days of the month of the Calendar. If not
             * specified try to query using HTML_PARSER an element inside
             * contentBox which matches <code>aui-calendar-day</code>.
			 *
			 * @attribute monthDays
			 * @default Generated div element.
			 * @type NodeList
			 */
			monthDays: {
				valueFn: '_valueMonthDays'
			},

			/**
			 * DOM node reference which contains all month days nodes of the Calendar. If not
             * specified try to query using HTML_PARSER an element inside
             * contentBox which matches <code>aui-calendar-monthdays</code>.
			 *
			 * @attribute monthDaysNode
			 * @default Generated div element.
			 * @type Node
			 */
			monthDaysNode: {
				valueFn: function() {
					return A.Node.create(TPL_CALENDAR_MONTHDAYS);
				}
			},

			/**
			 * DOM node reference to be the "none" link of the Calendar. If not
             * specified try to query using HTML_PARSER an element inside
             * contentBox which matches <code>aui-calendar-title</code>.
			 *
			 * @attribute noneLinkNode
			 * @default Generated div element.
			 * @type Node
			 */
			noneLinkNode: {
				valueFn: function() {
					return A.Node.create(TPL_CALENDAR_NONE_LINK);
				}
			},

			/**
			 * DOM node reference to be the "today" link of the Calendar. If not
             * specified try to query using HTML_PARSER an element inside
             * contentBox which matches <code>aui-calendar-title</code>.
			 *
			 * @attribute todayLinkNode
			 * @default Generated div element.
			 * @type Node
			 */
			todayLinkNode: {
				valueFn: function() {
					return A.Node.create(TPL_CALENDAR_TODAY_LINK);
				}
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
			 * Wheather displays the days for the other months.
			 *
			 * @attribute showOtherMonth
			 * @default true
			 * @type boolean
			 */
			showOtherMonth: {
				value: true,
				validator: isBoolean
			},

			/**
			 * Wheather displays the "today" link on the Calendar footer.
			 *
			 * @attribute showToday
			 * @default true
			 * @type boolean
			 */
			showToday: {
				value: true,
				validator: isBoolean
			},

			/**
			 * NodeList reference containing the days of the week of the Calendar. If not
             * specified try to query using HTML_PARSER an element inside
             * contentBox which matches <code>aui-calendar-week</code>.
			 *
			 * @attribute weekDays
			 * @default Generated div element.
			 * @type NodeList
			 */
			weekDays: {
				valueFn: '_valueWeekDays'
			},

			/**
			 * DOM node reference which contains all week days nodes of the Calendar. If not
             * specified try to query using HTML_PARSER an element inside
             * contentBox which matches <code>aui-calendar-weekdays</code>.
			 *
			 * @attribute weekDaysNode
			 * @default Generated div element.
			 * @type Node
			 */
			weekDaysNode: {
				valueFn: function() {
					return A.Node.create(TPL_CALENDAR_WEEKDAYS);
				}
			}
		},

		/**
		 * Object hash, defining how attribute values are to be parsed from
		 * markup contained in the widget's content box.
		 *
		 * @property ProgressBar.HTML_PARSER
		 * @type Object
		 * @static
		 */
		HTML_PARSER: {
			blankDays: function(srcNode) {
				var nodes = srcNode.all(DOT+CSS_DAY_BLANK);

				return nodes.size() ? nodes : null;
			},

			monthDays: function(srcNode) {
				var nodes = srcNode.all(DOT+CSS_DAY_MONTH);

				return nodes.size() ? nodes : null;
			},

			paddingDaysEnd: function(srcNode) {
				var nodes = srcNode.all(DOT+CSS_DAY_PADDING_END);

				return nodes.size() ? nodes : null;
			},

			paddingDaysStart: function(srcNode) {
				var nodes = srcNode.all(DOT+CSS_DAY_PADDING_START);

				return nodes.size() ? nodes : null;
			},

			weekDays: function(srcNode) {
				var nodes = srcNode.all(DOT+CSS_WEEK);

				return nodes.size() ? nodes : null;
			},

			headerTitleNode: DOT+CSS_TITLE,

			monthDaysNode: DOT+CSS_MONTHDAYS,

			weekDaysNode: DOT+CSS_WEEKDAYS,

			headerContentNode: DOT+CSS_HEADER,

			iconNextNode: DOT+CSS_NEXT,

			iconPrevNode: DOT+CSS_PREV,

			todayLinkNode: DOT+CSS_CALENDAR_LINK_TODAY,

			noneLinkNode: DOT+CSS_CALENDAR_LINK_NONE
		},

		UI_ATTRS: [DATES, SHOW_TODAY, ALLOW_NONE],

		BIND_UI_ATTRS: [SHOW_OTHER_MONTH],

		prototype: {
			/**
			 * Construction logic executed during Calendar instantiation. Lifecycle.
			 *
			 * @method initializer
			 * @protected
			 */
			initializer: function() {
				var instance = this;

				instance._createEvents();
			},

			/**
			 * Create the DOM structure for the Calendar. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				var instance = this;

				// creating properties references for performance
				instance.blankDays = instance.get(BLANK_DAYS);
				instance.headerContentNode = instance.get(HEADER_CONTENT_NODE);
				instance.headerTitleNode = instance.get(HEADER_TITLE_NODE);
				instance.iconNextNode = instance.get(ICON_NEXT_NODE);
				instance.iconPrevNode = instance.get(ICON_PREV_NODE);
				instance.monthDays = instance.get(MONTH_DAYS);
				instance.monthDaysNode = instance.get(MONTH_DAYS_NODE);
				instance.noneLinkNode = instance.get(NONE_LINK_NODE);
				instance.paddingDaysEnd = instance.get(PADDING_DAYS_END);
				instance.paddingDaysStart = instance.get(PADDING_DAYS_START);
				instance.todayLinkNode = instance.get(TODAY_LINK_NODE);
				instance.weekDays = instance.get(WEEK_DAYS);
				instance.weekDaysNode = instance.get(WEEK_DAYS_NODE);

				instance._renderWeekDays();
				instance._renderBlankDays();
				instance._renderPaddingDaysStart();
				instance._renderMonthDays();
				instance._renderPaddingDaysEnd();
				instance._renderIconControls();
				instance._renderTitleNode();
			},

			/**
			 * Bind the events on the Calendar UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;
				var boundingBox = instance.get(BOUNDING_BOX);

				boundingBox.once('mousemove', A.bind(instance._bindDelegate, instance));
			},

			/**
			 * Sync the Calendar UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				var instance = this;

				instance._syncStdContent();
			},

			/**
			 * Clear all selected dates on the Calendar.
			 *
			 * @method clear
			 */
			clear: function() {
				var instance = this;

				instance.set(DATES, []);
			},

			/**
			 * Loop each date from <a href="Calendar.html#config_dates">dates</a> and
		     * executes a callback.
			 *
			 * @method eachSelectedDate
			 * @param {function} fn Callback to be executed for each date.
			 * @param {Dates} dates Optional dates Array to loop through. If not passed it will use
			 * the <a href="Calendar.html#config_dates">dates</a>.
			 */
			eachSelectedDate: function(fn, dates) {
				var instance = this;

				A.Array.each(dates || instance.get(DATES), fn, instance);
			},

			/**
			 * Get the first day of the month of the passed year.
			 *
			 * @method findMonthStart
			 * @param {Number} year Year in the format YYYY.
			 * @param {Number} month 0 for January 11 for December.
			 * @return {Number}
			 */
			findMonthStart: function(year, month) {
				var instance = this;
				var date = instance._normalizeYearMonth(year, month);

				return DateMath.findMonthStart(DateMath.getDate(date.year, date.month));
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
			},

			/**
			 * Get current date.
			 *
			 * @method getCurrentDate
			 * @return {Date}
			 */
			getCurrentDate: function(offsetYear, offsetMonth, offsetDay) {
				var instance = this;
				var date = instance._normalizeYearMonth();

				return DateMath.getDate(date.year + toNumber(offsetYear), date.month + toNumber(offsetMonth), date.day + toNumber(offsetDay));
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

		        return DateMath.getDaysInMonth(date.year, date.month);
		    },

			/**
			 * Get the first day of week of the passed year and month.
			 *
			 * @method getFirstDayOfWeek
			 * @param {Number} year Year in the format YYYY.
			 * @param {Number} month 0 for January 11 for December.
			 * @return {Number}
			 */
			getFirstDayOfWeek: function() {
				var instance = this;
				var firstDayOfWeek = instance.get(FIRST_DAY_OF_WEEK);

				return DateMath.getFirstDayOfWeek(instance.findMonthStart(), firstDayOfWeek);
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

				instance.eachSelectedDate(function(date) {
					dates.push({
						year: date.getFullYear(),
						month: date.getMonth(),
						day: date.getDate()
					});
				});

				return dates;
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

				instance.eachSelectedDate(function(date) {
					dates.push( instance.formatDate( date, instance.get(DATE_FORMAT) ) );
				});

				return dates;
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
			 * Check if a date is already selected.
			 *
			 * @method isAlreadySelected
			 * @param {Date} date Date to be checked.
			 * @return {boolean}
			 */
			isAlreadySelected: function(date) {
				var instance = this;
				var isAlreadySelected = false;

				instance.eachSelectedDate(function(d, index) {
					if (instance._compareDates(d, date)) {
						isAlreadySelected = true;
					}
				});

				return isAlreadySelected;
			},

			/**
			 * Check if the passed date is out of range. Compared with the
		     * <a href="Calendar.html#config_minDate">minDate</a> and
		     * <a href="Calendar.html#config_maxDate">maxDate</a>.
			 *
			 * @method isOutOfRangeDate
			 * @param {Date} date Date to be checked.
			 */
			isOutOfRangeDate: function(date) {
				var instance = this;
				var maxDate = instance.get(MAX_DATE);
				var minDate = instance.get(MIN_DATE);

				if ((!minDate && !maxDate) ||
					instance._compareDates(date, minDate) ||
					instance._compareDates(date, maxDate)) {

					return false;
				}

				return !DateMath.between(date, minDate, maxDate);
			},

			/**
			 * Navigate through months and re-sync the UI.
			 *
			 * @method navigateMonth
			 * @param {Number} offset Offset of the number of months to navigate.
		     * Could be a positive or a negative offset.
			 */
			navigateMonth: function(offset) {
				var instance = this;
				var date = instance.getCurrentDate(0, offset);

				// when navigate by month update the year also
				instance.set(CURRENT_MONTH, date.getMonth());
				instance.set(CURRENT_YEAR, date.getFullYear());

				instance._syncView();
			},

			/**
			 * Remove the passed date from
		     * <a href="Calendar.html#config_dates">dates</a>.
			 *
			 * @method removeDate
			 * @param {Date} date Date to remove
			 */
			removeDate: function(date) {
				var instance = this;
				var dates = [];

				instance.eachSelectedDate(
					function(d, index) {
						if (!instance._compareDates(d, date)) {
							dates.push(d);
						}
					}
				);

				instance.set(DATES, dates);
			},

			/**
			 * Select the current date returned by
		     * <a href="Calendar.html#method_getCurrentDate">getCurrentDate</a>.
			 *
			 * @method selectCurrentDate
			 * @protected
			 */
			selectCurrentDate: function() {
				var instance = this;
				var currentDate = instance.getCurrentDate();

				if (!instance.isAlreadySelected(currentDate)) {
					var dates = instance.get(DATES);

					// if is single selection reset the selected dates
					if (!instance.get(SELECT_MULTIPLE_DATES)) {
						dates = [];
					}

					dates.push(currentDate);
					instance.set(DATES, dates);
				}
			},

			/**
			 * Navigate to the next month. Fired from the next icon on the Calendar
		     * header.
			 *
			 * @method selectNextMonth
			 */
			selectNextMonth: function() {
				var instance = this;

				instance.navigateMonth(+1);
			},

			/**
			 * Navigate to the previous month. Fired from the previous icon on the
			 * Calendar header.
			 *
			 * @method selectPrevMonth
			 */
			selectPrevMonth: function() {
				var instance = this;

				instance.navigateMonth(-1);
			},

			/**
			 * Select today date on the Calendar.
			 *
			 * @method selectToday
			 */
			selectToday: function() {
				var instance = this;

				instance.set(DATES, [ new Date() ]);
			},

		    /**
		     * Update the currentDay, currentMonth and currentYear values.
		     *
		     * @method setCurrentDate
		     * @param {Date} date
		     */
			setCurrentDate: function(date) {
				var instance = this;

				if (isDate(date)) {
					// update the current values to the last selected date
					instance.set(CURRENT_DAY, date.getDate());
					instance.set(CURRENT_MONTH, date.getMonth());
					instance.set(CURRENT_YEAR, date.getFullYear());
				}
			},

			/**
			 * Bind DOM events to the UI.
			 *
			 * @method _bindDelegate
			 * @private
			 */
			_bindDelegate: function() {
				var instance = this;
				var boundingBox = instance.get(BOUNDING_BOX);
				var headerContentNode = instance.headerContentNode;

				headerContentNode.delegate('click', instance.selectNextMonth, DOT+CSS_ICON_CIRCLE_TRIANGLE_R, instance);
				headerContentNode.delegate('click', instance.selectPrevMonth, DOT+CSS_ICON_CIRCLE_TRIANGLE_L, instance);

				boundingBox.delegate('click', instance._preventDefaultFn, ANCHOR);
				boundingBox.delegate('click', A.bind(instance.selectToday, instance), DOT+CSS_CALENDAR_LINK_TODAY);
				boundingBox.delegate('click', A.bind(instance.clear, instance), DOT+CSS_CALENDAR_LINK_NONE);
				boundingBox.delegate('click', A.bind(instance._onClickDays, instance), DOT+CSS_DAY);
				boundingBox.delegate('mouseenter', A.bind(instance._onMouseEnterDays, instance), DOT+CSS_DAY);
				boundingBox.delegate('mouseleave', A.bind(instance._onMouseLeaveDays, instance), DOT+CSS_DAY);
			},

			_bindDataAttrs: function(node, date) {
				node.attr(DATA_YEAR, date.getFullYear());
				node.attr(DATA_MONTH, date.getMonth());
			},

			_checkNodeRange: function(node, date) {
				var instance = this;

				node.toggleClass(
					CSS_CALENDAR_DISABLED,
					instance.isOutOfRangeDate(date)
				);
			},

		    /**
		     * Create the custom events used on the Calendar.
		     *
		     * @method _createEvents
		     * @private
		     */
			_createEvents: function() {
				var instance = this;

				// create publish function for kweight optimization
				var publish = function(name, fn) {
					instance.publish(name, {
			            defaultFn: fn,
			            queuable: false,
			            emitFacade: true,
			            bubbles: true,
			            prefix: CALENDAR
			        });
				};

				publish(
					EV_CALENDAR_SELECT,
					instance._defSelectFn
				);
			},

			_createNodeList: function(buffer) {
				var instance = this;

				var blankDays = A.one(
					A.DOM.create(buffer.join(EMPTY_STR))
				);

				return blankDays.get(CHILDREN);
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
				return ( d1 && d2 && (d1.getTime() == d2.getTime()) );
			},

			_conditionalToggle: function(node, show) {
				var instance = this;

				if (show) {
					node.show();
				}
				else {
					node.hide();
				}
			},

		    /**
		     * Default calendar:select handler
		     *
		     * @method _defSelectFn
		     * @param {EventFacade} event The Event object
		     * @protected
		     */
			_defSelectFn: function(event) {
				var instance = this;

				instance._syncView();
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
			 * Get the number of days with overlaps the first day of the month and the first day of the first week of the month.
			 *
			 * @method _getMonthOverlapDaysOffset
			 * @protected
			 * @return number
			 */
			_getMonthOverlapDaysOffset: function() {
				var instance = this;

				return Math.abs(DateMath.getDayOffset(instance.getFirstDayOfWeek(), instance.findMonthStart()));
			},

			/**
			 * Object data containing all the information needed to the select event.
			 *
			 * @method _getSelectEventData
			 * @protected
			 * @return {}
			 */
			_getSelectEventData: function() {
				var instance = this;

				return {
					date: {
						detailed: instance.getDetailedSelectedDates(),
						formatted: instance.getFormattedSelectedDates(),
						normal: instance.getSelectedDates()
					}
				};
			},

		    /**
		     * Fires the calendar:select event.
		     *
		     * @method _handleSelectEvent
		     * @param {EventFacade} event calendar:select event facade
		     * @protected
		     */
			_handleSelectEvent: function() {
				var instance = this;

				instance.fire(EV_CALENDAR_SELECT, instance._getSelectEventData());
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

				if (!isValue(day)) {
					day = instance.get(CURRENT_DAY);
				}

				if (!isValue(month)) {
					month = instance.get(CURRENT_MONTH);
				}

				if (!isValue(year)) {
					year = instance.get(CURRENT_YEAR);
				}

				return { year: year, month: month, day: day };
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
				var disabled = target.test(DOT+CSS_CALENDAR_DISABLED);

				if (!disabled) {
					var day = target.attr(DATA_DAY) || target.text();
					var month = target.attr(DATA_MONTH);
					var year = target.attr(DATA_YEAR);

					if (year) {
						instance.set(CURRENT_YEAR, year);
					}
					if (month) {
						instance.set(CURRENT_MONTH, month);
					}
					if (day) {
						instance.set(CURRENT_DAY, day);
					}

					var currentDate = instance.getCurrentDate();

					if (instance.isAlreadySelected(currentDate)) {
						instance.removeDate(currentDate);
					}
					else {
						instance.selectCurrentDate();
					}
				}
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

			_preventDefaultFn: function(event) {
				event.preventDefault();
			},

			/**
			 * Render Calendar DOM blank days elements. Blank days are used to align
		     * with the week day column.
			 *
			 * @method _renderBlankDays
			 * @protected
			 */
			_renderBlankDays: function() {
				var instance = this;

				instance.blankDays.appendTo(
					instance.monthDaysNode
				);
			},

			/**
			 * Render Calendar DOM padding days elements. Padding days are used to show other month day values.
			 *
			 * @method _renderPaddingDaysEnd
			 * @protected
			 */
			_renderPaddingDaysEnd: function() {
				var instance = this;

				instance.paddingDaysEnd.appendTo(
					instance.monthDaysNode
				);
			},

			/**
			 * Render Calendar DOM padding days elements. Padding days are used to show other month day values.
			 *
			 * @method _renderPaddingDaysStart
			 * @protected
			 */
			_renderPaddingDaysStart: function() {
				var instance = this;

				instance.paddingDaysStart.appendTo(
					instance.monthDaysNode
				);
			},

			/**
			 * Render Calendar title node element.
			 *
			 * @method _renderTitleNode
			 * @protected
			 */
			_renderTitleNode: function() {
				var instance = this;

				instance.headerContentNode.append(
					instance.headerTitleNode
				);
			},

			/**
			 * Render Calendar icon controls elements.
			 *
			 * @method _renderIconControls
			 * @protected
			 */
			_renderIconControls: function() {
				var instance = this;

				instance.headerContentNode.append(
					instance.iconNextNode
				);

				instance.headerContentNode.append(
					instance.iconPrevNode
				);
			},

			/**
			 * Render Calendar DOM month days elements.
			 *
			 * @method _renderMonthDays
			 * @protected
			 */
			_renderMonthDays: function() {
				var instance = this;

				instance.monthDays.appendTo(
					instance.monthDaysNode
				);
			},

			/**
			 * Render Calendar DOM week days elements.
			 *
			 * @method _renderWeekDays
			 * @protected
			 */
			_renderWeekDays: function() {
				var instance = this;

				instance.weekDays.appendTo(
					instance.weekDaysNode
				);
			},

			_repeateTemplate: function(template, times) {
				var instance = this;
				var buffer = [];

				while (times--) {
					buffer.push(template);
				}

				return instance._createNodeList(buffer);
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
						value[index] = A.DataType.Date.parse( date );
					}
				});

				// Set current date to be the last passed date
				instance.setCurrentDate(
					value[value.length - 1]
				);

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
					value = A.DataType.Date.parse( value );
				}

				return value;
			},

			/**
			 * Sync Calendar StdContent.
			 *
			 * @method _syncStdContent
			 * @protected
			 */
			_syncStdContent: function() {
				var instance = this;
				var bodyContent = A.Node.create('<div></div>');
				var footContent = A.Node.create('<div class="' + CSS_HELPER_CLEARFIX + '"></div>');

				bodyContent.append(instance.weekDaysNode);
				bodyContent.append(instance.monthDaysNode);

				footContent.append(instance.todayLinkNode);
				footContent.append(instance.noneLinkNode);

				instance.setStdModContent(WidgetStdMod.HEADER, instance.headerContentNode.getDOM());
				instance.setStdModContent(WidgetStdMod.BODY, bodyContent);
				instance.setStdModContent(WidgetStdMod.FOOTER, footContent);
			},

			/**
			 * Sync Calendar month days UI.
			 *
			 * @method _syncMonthDays
			 * @protected
			 */
			_syncMonthDays: function() {
				var instance = this;
				var daysInMonth = instance.getDaysInMonth();
				var rangeDate = instance.getCurrentDate();

				// Sync month days
				instance.monthDays.each(
					function(node, index) {
						node.toggleClass(CSS_HELPER_HIDDEN, (index >= daysInMonth));

						rangeDate.setDate(index + 1);
						instance._checkNodeRange(node, rangeDate);
					}
				);
			},

			/**
			 * Sync Calendar padding end days UI.
			 *
			 * @method _syncPaddingEnd
			 * @protected
			 */
			_syncPaddingEnd: function() {
				var instance = this;

				// Sync padding end nodes
				if (instance.get(SHOW_OTHER_MONTH)) {
					var nextMonthDate = instance.getCurrentDate(0, +1);
					var totalVisiblePaddingEnd = (INT_MATRIX_DAYS_LENGTH - (instance._getMonthOverlapDaysOffset() + instance.getDaysInMonth()));


					// Sync blank or padding start nodes
					instance.paddingDaysEnd.each(
						function(node, index) {
							node.toggleClass(CSS_HELPER_HIDDEN, (index >= totalVisiblePaddingEnd));

							nextMonthDate.setDate(index + 1);
							instance._bindDataAttrs(node, nextMonthDate);
							instance._checkNodeRange(node, nextMonthDate);
						}
					);
				}
			},

			/**
			 * Sync Calendar padding start days UI.
			 *
			 * @method _syncPaddingStart
			 * @protected
			 */
			_syncPaddingStart: function() {
				var instance = this;
				var showOtherMonth = instance.get(SHOW_OTHER_MONTH);
				var prevMonthDate = instance.getCurrentDate(0, -1);
				var totalPrevMonthDays = instance.getDaysInMonth(null, prevMonthDate.getMonth());
				var paddingNodes = (showOtherMonth ? instance.paddingDaysStart : instance.blankDays);
				var totalPadding = paddingNodes.size();
				var totalVisible = instance._getMonthOverlapDaysOffset();

				// Sync blank or padding start nodes
				paddingNodes.each(
					function(node, index) {
						var totalHidden = (totalPadding - totalVisible);

						node.toggleClass(CSS_HELPER_HIDDEN, (index < totalHidden));

						if (showOtherMonth) {
							var dayNumber = (totalPrevMonthDays - totalPadding) + (index + 1);

							node.html(dayNumber);
							prevMonthDate.setDate(dayNumber);
							instance._bindDataAttrs(node, prevMonthDate);
							instance._checkNodeRange(node, prevMonthDate);
						}
					}
				);
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

				var title = [ instance._getMonthName(currentMonth), currentYear ].join(SPACE);

				instance.headerTitleNode.html(title);
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

				instance.eachSelectedDate(
					function(date, index) {
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
					},
					dates
				);
			},

			/**
			 * Sync Calendar header, days and selected days UI.
			 *
			 * @method _syncView
			 * @protected
			 */
			_syncView: function() {
				var instance = this;

				instance._syncMonthDays();
				instance._syncHeader();
				instance._syncSelectedDays();

				instance._uiSetShowOtherMonth(
					instance.get(SHOW_OTHER_MONTH)
				);
			},

			/**
			 * Sync the UI of the Calendar when showToday attribute change.
			 *
			 * @method _uiSetShowToday
			 * @protected
			 */
			_uiSetAllowNone: function(val) {
				var instance = this;

				instance._conditionalToggle(instance.noneLinkNode, val);
			},

			/**
			 * Sync the UI of the Calendar when dates attribute change.
			 *
			 * @method _uiSetDates
			 * @protected
			 */
			_uiSetDates: function(val) {
				var instance = this;

				instance._handleSelectEvent();
			},

			/**
			 * Sync the UI of the Calendar when showToday attribute change.
			 *
			 * @method _uiSetShowToday
			 * @protected
			 */
			_uiSetShowToday: function(val) {
				var instance = this;

				instance._conditionalToggle(instance.todayLinkNode, val);
			},

			/**
			 * Sync the UI of the Calendar when showOtherMonth attribute change.
			 *
			 * @method _uiSetShowOtherMonth
			 * @protected
			 */
			_uiSetShowOtherMonth: function(val) {
				var instance = this;

				if (val) {
					instance.blankDays.hide();
				}
				else {
					instance.paddingDaysEnd.hide();
					instance.paddingDaysStart.hide();
				}

				instance._syncPaddingEnd();
				instance._syncPaddingStart();
			},

			/**
			 * Default value for paddingDaysEnd attribute, passed as valueFn.
			 *
			 * @method _valuePaddingDaysEnd
			 * @protected
			 */
			_valuePaddingDaysEnd: function() {
				var instance = this;
				var buffer = [];
				var day = 0;

				while (day++ <= INT_MAX_PADDING_END) {
					TPL_CALENDAR_DAY_PADDING_END[1] = day;

					buffer.push(TPL_CALENDAR_DAY_PADDING_END.join(EMPTY_STR));
				}

				return instance._createNodeList(buffer);
			},

			/**
			 * Default value for paddingDaysStart attribute, passed as valueFn.
			 *
			 * @method _valuePaddingDaysStart
			 * @protected
			 */
			_valuePaddingDaysStart: function() {
				return this._repeateTemplate(TPL_CALENDAR_DAY_PADDING_START, DateMath.WEEK_LENGTH);
			},


			/**
			 * Default value for blankDays attribute, passed as valueFn.
			 *
			 * @method _valueBlankDays
			 * @protected
			 */
			_valueBlankDays: function() {
				return this._repeateTemplate(TPL_CALENDAR_DAY_BLANK, DateMath.WEEK_LENGTH);
			},

			/**
			 * Default value for monthDays attribute, passed as valueFn.
			 *
			 * @method _valueMonthDays
			 * @protected
			 */
			_valueMonthDays: function() {
				var instance = this;

				var day = 0;
				var buffer = [];

				while (day++ < DateMath.MAX_MONTH_LENGTH) {
					TPL_BUFFER_MONTH_DAYS[1] = day;

					buffer.push(TPL_BUFFER_MONTH_DAYS.join(EMPTY_STR));
				}

				return instance._createNodeList(buffer);
			},

			/**
			 * Default value for weekDays attribute, passed as valueFn.
			 *
			 * @method _valueWeekDays
			 * @protected
			 */
			_valueWeekDays: function() {
				var instance = this;
				var day = 0;
				var buffer = [];
				var firstWeekDay = instance.get(FIRST_DAY_OF_WEEK);

				while(day < DateMath.WEEK_LENGTH) {
					var fixedDay = (day++ + firstWeekDay) % DateMath.WEEK_LENGTH;

					TPL_BUFFER_WEEKDAYS[1] = instance._getDayNameMin(fixedDay);

					buffer.push(TPL_BUFFER_WEEKDAYS.join(EMPTY_STR));
				}

				return instance._createNodeList(buffer);
			}
		}
	}
);

A.Calendar = A.Base.create(CALENDAR, Calendar, [A.WidgetStdMod]);

}, '@VERSION@' ,{requires:['aui-base','widget-stdmod','datatype-date','widget-locale'], skinnable:true});
