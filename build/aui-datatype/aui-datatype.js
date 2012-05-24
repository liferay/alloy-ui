AUI.add('aui-datatype', function(A) {
/**
 * The Datatype Utility
 *
 * @module aui-datatype
 */

var L = A.Lang,
	FALSE = 'false',
	TRUE = 'true',

	NUM_SIXTY = 60,
	NUM_THOUSAND = 1000,
	NUM_TWENTY_FOUR = 24,

	/**
	 * DataType.Boolean provides a set of utility to parse <code>falsey</code>
     * value to <code>false</code> and <code>non-falsey</code> to
     * <code>true</code>.
	 *
	 * @class DataType.Boolean
	 * @static
	 */
	DB = A.namespace('DataType.Boolean'),

	/**
	 * DataType.String provides a set of utility to provides a simple function
     * that evaluates a string to a primitive value (if possible). Supports
     * <code>true</code> and <code>false</code> also.
	 *
	 * @class DataType.String
	 * @static
	 */
	DS = A.namespace('DataType.String');

/**
 * Parses any <code>falsey</code> value to <code>false</code> and
 * <code>non-falsey</code> to <code>true</code>.
 *
 * @for DataType.Boolean
 * @method parse
 * @param {*} data falsey or non-falsey values (i.e., falsey values: null, false, undefined, NaN; non-falsey values: 1, true, 'abc').
 * @return {boolean} Parsed value
 */
DB.parse = function(data) {
	data = A.Lang.trim(data);

	return (data == FALSE) ? false : !!data;
};

/**
 * Evaluates a string to a primitive value (if possible). Supports
 * <code>true</code> and <code>false</code> also. Unrecognized strings are
 * returned without any modification.
 *
 * @for DataType.String
 * @method evaluate
 * @param {*} data Input data to be evaluated.
 * @return {boolean | null | number | String | undefined} Parsed value
 */
DS.evaluate = function(data) {
	var trimmedData = A.Lang.trim(data);

	// booleans
	if (trimmedData == TRUE || trimmedData == FALSE) {
		return DB.parse(data);
	}

	// Handle positive & negative numbers (integer or float)
	// Handle hexadecimal numbers: 0xFF -> 255
	// Handle exponential notation: 1e5 -> 100000
	if (trimmedData && L.isString(trimmedData)) {
		var number = +trimmedData;

		if (!isNaN(number)) {
			return number;
		}
	}

	return data;
};

/**
* A.DataType.DateMath is used for simple date manipulation. The class is a static utility
* used for adding, subtracting, and comparing dates. Based on YAHOO.widget.DateMath.
*
* @class A.DataType.DateMath
*/
var L = A.Lang,
	S = A.Lang.String,

	isDate = L.isDate,
	isValue = L.isValue,

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
	DAY : 'D',

	/**
	* Constant field representing Week
	* @property WEEK
	* @static
	* @final
	* @type String
	*/
	WEEK : 'W',

	/**
	* Constant field representing Year
	* @property YEAR
	* @static
	* @final
	* @type String
	*/
	YEAR : 'Y',

	/**
	* Constant field representing Month
	* @property MONTH
	* @static
	* @final
	* @type String
	*/
	MONTH : 'M',

	/**
	* Constant field representing Minutes
	* @property MINUTES
	* @static
	* @final
	* @type String
	*/
	MINUTES : 'MINUTES',

	/**
	* Constant field representing Hour
	* @property HOUR
	* @static
	* @final
	* @type String
	*/
	HOUR : 'HOUR',

	/**
	* Constant field representing Seconds
	* @property SECONDS
	* @static
	* @final
	* @type String
	*/
	SECONDS : 'SECONDS',

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
	ONE_DAY_MS : NUM_THOUSAND * NUM_SIXTY * NUM_SIXTY * NUM_TWENTY_FOUR,

	/**
	* Constant field representing one hour, in milliseconds
	* @property ONE_HOUR_MS
	* @static
	* @final
	* @type Number
	*/
	ONE_HOUR_MS : NUM_THOUSAND * NUM_SIXTY * NUM_SIXTY,

	/**
	* Constant field representing one minute, in milliseconds
	* @property ONE_MINUTE_MS
	* @static
	* @final
	* @type Number
	*/
	ONE_MINUTE_MS : NUM_THOUSAND * NUM_SIXTY,

	/**
	* Constant field representing one second, in milliseconds
	* @property ONE_SECOND_MS
	* @static
	* @final
	* @type Number
	*/
	ONE_SECOND_MS : NUM_THOUSAND,

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
			case this.HOUR:
				var hours = d.getHours();

				d.setHours(hours + amount);
				break;
			case this.MINUTES:
				var minutes = d.getMinutes();

				d.setMinutes(minutes + amount);
				break;
			case this.SECONDS:
				var seconds = d.getSeconds();

				d.setSeconds(seconds + amount);
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
	* Compare dates.
	* @method compare
	* @param {Date} d1	The JavaScript Date object to compare
	* @param {Date} d2	The JavaScript Date object to compare
	* @return {boolean}
	*/
	compare: function(d1, d2) {
		return ( d1 && d2 && (d1.getTime() == d2.getTime()) );
	},

	copyHours: function(d1, d2) {
		var instance = this;

		d1.setHours(d2.getHours());
		d1.setMinutes(d2.getMinutes());
		d1.setSeconds(d2.getSeconds());
		d1.setMilliseconds(d2.getMilliseconds());
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

	/**
	* Calculates the number of days between the specified dates.
	* @method getDayOffset
	* @param {Date}	d1 Date 1
	* @param {Date}	d2 Date 2
	* @return {Number}	The number of days
	*/
	getDayOffset : function(d1, d2) {
		return this._absFloor(this.getOffset(d1, d2, this.ONE_DAY_MS));
	},

	/**
	* Calculates the number of hours between the specified dates.
	* @method getHoursOffset
	* @param {Date}	d1 Date 1
	* @param {Date}	d2 Date 2
	* @return {Number}	The number of hours
	*/
	getHoursOffset : function(d1, d2) {
		return this._absFloor(this.getOffset(d1, d2, this.ONE_HOUR_MS));
	},

	/**
	* Calculates the number of minutes between the specified dates.
	* @method getMinutesOffset
	* @param {Date}	d1 Date 1
	* @param {Date}	d2 Date 2
	* @return {Number}	The number of minutes
	*/
	getMinutesOffset : function(d1, d2) {
		return this._absFloor(this.getOffset(d1, d2, this.ONE_MINUTE_MS));
	},

	/**
	* Calculates the number of seconds between the specified dates.
	* @method getSecondsOffset
	* @param {Date}	d1 Date 1
	* @param {Date}	d2 Date 2
	* @return {Number}	The number of seconds
	*/
	getSecondsOffset : function(d1, d2) {
		return this._absFloor(this.getOffset(d1, d2, this.ONE_SECOND_MS));
	},

	getOffset: function(d1, d2, constantAmount) {
		var offset = (d1.getTime()-d2.getTime()) / (constantAmount || 0);

		return offset;
	},

    _absFloor : function(n) {
		var abs = Math.floor(Math.abs(n));

		if (n < 0) {
			abs *= -1;
		}

        return abs;
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
	 * Chechs if the passed date is a week day.
	 *
	 * @method isWeekDay
	 * @param {Date} date Date
	 * @return boolean
	 */
	isWeekDay: function(date) {
		var day = date.getDay();

		return (day > 0) && (day < 6);
	},

	/**
	 * Chechs if the passed date is a Tuesday or Thursday.
	 *
	 * @method isTueOrThu
	 * @param {Date} date Date
	 * @return boolean
	 */
	isTueOrThu: function(date) {
		return this.isWeekDay(date) && (date.getDay() % 2 === 0);
	},

	/**
	 * Chechs if the passed date is a Monday, Wednesday or Friday.
	 *
	 * @method isMonWedOrFri
	 * @param {Date} date Date
	 * @return boolean
	 */
	isMonWedOrFri: function(date) {
		return this.isWeekDay(date) && !this.isTueOrThu(date);
	},

	/**
	 * Chechs if the {date2} is the next day.
	 *
	 * @method isNextDay
	 * @param {Date} date1 Date
	 * @param {Date} date2 Date
	 * @return boolean
	 */
	isNextDay: function(date1, date2) {
		return this.getDayOffset(this.safeClearTime(date2), this.safeClearTime(date1)) === 1;
	},

	/**
	 * Chechs if the {date2} is the next day at 00:00:00.
	 *
	 * @method isNextDayBoundary
	 * @param {Date} date1 Date
	 * @param {Date} date2 Date
	 * @return boolean
	 */
	isDayBoundary: function(date1, date2) {
		return this.isNextDay(date1, date2) && (date2.getHours() === 0) && (date2.getMinutes() === 0) && (date2.getSeconds() === 0);
	},

	/**
	 * Chechs if the passed date is between two days.
	 *
	 * @method isDayOverlap
	 * @param {Date} date1 Date
	 * @param {Date} date2 Date
	 * @return boolean
	 */
	isDayOverlap : function(date1, date2) {
		return ((date1.getFullYear() !== date2.getFullYear()) || (date1.getMonth() !== date2.getMonth()) || (date1.getDate() !== date2.getDate()));;
	},

	/**
	 * Chechs if the passed date is today.
	 *
	 * @method isToday
	 * @param {Date} date Date
	 * @return boolean
	 */
	isToday: function(date) {
		return !this.isDayOverlap(date, new Date());
	},

	/**
	 * Chechs if the passed dates are in the same month.
	 *
	 * @method isSameMonth
	 * @param {Date} d1 Date
	 * @param {Date} d2 Date
	 * @return boolean
	 */
	isSameMonth : function(d1, d2) {
		return ((d1.getFullYear() === d2.getFullYear()) && (d1.getMonth() === d2.getMonth()));
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
		end.setHours(23,59,59,999);
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
	* Clears the time fields from a given date, effectively setting the time to
	* 12 noon. This is "safe" because clones the date before clear, not affecting
	* the passed reference.
	* @method safeClearTime
	* @param {Date}	date	The JavaScript Date for which the time fields will be cleared
	* @return {Date}		The JavaScript Date cleared of all time fields
	*/
	safeClearTime : function(date) {
		return this.clearTime(this.clone(date));
	},

	/**
	* Set the time fields from a given date to midnight.
	* @method toMidnight
	* @param {Date}	date	The JavaScript Date for which the time fields will be set to midnight
	* @return {Date}		The JavaScript Date set to midnight
	*/
	toMidnight: function(date) {
		date.setHours(0,0,0,0);
		return date;
	},

	/**
	* Clone the passed date object.
	* @method clone
	* @param {Date}	date	The JavaScript Date to clone
	* @return {Date}		The JavaScript Date cloned
	*/
	clone : function(date) {
		return new Date(date.getTime());
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

		if (hours >= 12) {
			isPM = true;

			if (hours > 12) {
				hours -= 12;
			}
		}
		else if (hours === 0) {
			hours = 12;
		}

		var time = padHours ? S.padNumber(hours, 2) : String(hours);

		if (!omitMinutes) {
			time += COLON;
			time += S.padNumber(minutes, 2);
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
		var time = S.padNumber(hours, 2) + COLON + S.padNumber(minutes, 2);

		if (showSeconds) {
			var seconds = date.getSeconds();

			time += COLON;
			time += S.padNumber(seconds, 2);
		}

		return time;
	}
});

}, '@VERSION@' ,{skinnable:false, requires:['aui-base']});
