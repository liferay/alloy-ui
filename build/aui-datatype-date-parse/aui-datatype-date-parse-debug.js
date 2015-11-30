YUI.add('aui-datatype-date-parse', function (A, NAME) {

/**
 * DateParser is for parsing date in a locale-sensitive manner.
 *
 * @module aui-datatype-date-parse
 */

var Lang = A.Lang,
    LString = Lang.String,

    _parseInt = function(val) {
        val = parseInt(val, 10);

        if (!isNaN(val)) {
            return val;
        }
    };

/**
 * A base class for `A.DateParser`.
 *
 * @class A.DateParser
 * @param {String} opt_pattern Mask as strftime string.
 * @constructor
 */

function DateParser(opt_pattern) {
    var instance = this;

    if (opt_pattern) {
        instance.compilePattern(opt_pattern);
    }
}

/**
 * Static property provides a string to identify the token prefix, e.g. %A.
 *
 * @property TOKEN_PREFIX
 * @type String
 * @static
 */
DateParser.TOKEN_PREFIX = '%';

/**
 * Static property provides a base year to sum two digit years, e.g. For the
 * mask %Y, "13" will be parsed to 2013.
 *
 * @property TWO_DIGIT_YEAR_BASE
 * @type Number
 * @static
 */
DateParser.TWO_DIGIT_YEAR_BASE = 2000;

A.mix(DateParser.prototype, {
    compiled: null,

    /**
     * "Compiles" the strftime pattern. The same DateParser instance can be
     * reused to other "compiled" masks.
     *
     * @method compilePattern
     * @param {String} pattern Mask as strftime string.
     */
    compilePattern: function(pattern) {
        var instance = this,
            ch,
            chNext,
            compiled = [],
            current,
            i,
            last,
            length = pattern.length,
            hints;

        for (i = 0; i < length; i++) {
            ch = pattern.charAt(i);
            chNext = pattern.charAt(i + 1);

            if (ch === DateParser.TOKEN_PREFIX) {
                hints = instance._getPatternHints(chNext);

                if (!hints) {
                    compiled.push(ch);
                    continue;
                }

                if (hints.aggregates) {
                    pattern = instance._expandPattern(pattern, i, chNext);
                    length = pattern.length;
                    i--;
                    continue;
                }
                else {
                    current = {
                        hints: hints,
                        numeric: (hints.numericTokens &&
                            hints.numericTokens.indexOf(chNext) > -1),
                        token: chNext
                    };

                    last = compiled[compiled.length - 1];

                    if (last && !Lang.isString(last)) {
                        current.sequence = true;
                        last.sequence = true;
                    }

                    compiled.push(current);
                    i++;
                }
            }
            else {
                compiled.push(ch);
            }
        }

        instance.compiled = compiled;
    },

    /**
     * Takes a string mask and a text as input and parses it as a native
     * JavaScript Date.
     *
     * @method parse
     * @param {String} mask Mask as strftime string.
     * @param {String} text Text input to be parsed.
     * @param {Date} opt_date Optional Date object to be used a base date for
     *     filling the parsed values.
     *
     *  **parse {HTML} (Optional)**
     *
     *  Any strftime string is supported, such as `%I:%M:%S %p`. This format has
     *  several specifiers defined by the Open group at:
     *  http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html
     *
     *  PHP added a few of its own, defined at: http://www.php.net/strftime
     *
     *  This JavaScript implementation supports all the PHP specifiers and a few
     *  more. The full list is below:
     *
     *  If not specified, it defaults to the ISO 8601 standard date format:
     *  `%Y-%m-%d`.
     *
     *    * **%a** abbreviated weekday name according to the current locale
     *    * **%A** full weekday name according to the current locale
     *    * **%b** abbreviated month name according to the current locale
     *    * **%B** full month name according to the current locale
     *    * **%c** preferred date and time representation for the current locale
     *    * **%C** century number (the year divided by 100 and truncated to an
     *      integer, range `00` to `99`)
     *    * **%d** day of the month as a decimal number (range `01` to `31`)
     *    * **%D** same as `%m/%d/%y`
     *    * **%e** day of the month as a decimal number, a single digit is preceded
     *      by a space (range `1` to `31`)
     *    * **%F** same as `%Y-%m-%d` (ISO 8601 date format)
     *    * **%g** like `%G`, but without the century
     *    * **%G** The 4-digit year corresponding to the ISO week number
     *    * **%h** same as `%b`
     *    * **%H** hour as a decimal number using a 24-hour clock (range `00` to `23`)
     *    * **%I** hour as a decimal number using a 12-hour clock (range `01` to `12`)
     *    * **%j** day of the year as a decimal number (range 001 to 366)
     *    * **%k** hour as a decimal number using a 24-hour clock (range `0` to `23`);
     *      single digits are preceded by a blank. (See also `%H`.)
     *    * **%l** hour as a decimal number using a 12-hour clock (range `1` to `12`);
     *      single digits are preceded by a blank. (See also `%I`.)
     *    * **%m** month as a decimal number (range `01` to `12`)
     *    * **%M** minute as a decimal number
     *    * **%n** newline character
     *    * **%p** either `AM` or `PM` according to the given time value, or the
     *      corresponding strings for the current locale
     *    * **%P** like `%p`, but lower case
     *    * **%r** time in a.m. and p.m. notation equal to `%I:%M:%S %p`
     *    * **%R** time in 24 hour notation equal to `%H:%M`
     *    * **%s** number of seconds since the Epoch, ie, since `1970-01-01
     *      00:00:00` UTC
     *    * **%S** second as a decimal number
     *    * **%t** tab character
     *    * **%T** current time, equal to `%H:%M:%S`
     *    * **%u** weekday as a decimal number [1,7], with 1 representing Monday
     *    * **%U** week number of the current year as a decimal number, starting
     *      with the first Sunday as the first day of the first week
     *    * **%V** The ISO 8601:1988 week number of the current year as a decimal
     *      number, range `01` to `53`, where week 1 is the first week that has at least
     *      4 days in the current year, and with Monday as the first day of the
     *      week.
     *    * **%w** day of the week as a decimal, Sunday being 0
     *    * **%W** week number of the current year as a decimal number, starting
     *      with the first Monday as the first day of the first week
     *    * **%x** preferred date representation for the current locale without the
     *      time
     *    * **%X** preferred time representation for the current locale without the
     *      date
     *    * **%y** year as a decimal number without a century (range `00` to `99`)
     *    * **%Y** year as a decimal number including the century
     *    * **%z** numerical time zone representation
     *    * **%Z** time zone name or abbreviation
     *    * **%%** a literal `%` character
     *
     * @return {Date} Native JavaScript Date. Returns `false` if cannot parse.
     */
    parse: function(text, opt_date) {
        var instance = this,
            calendar = {},
            compiled = instance.compiled,
            i,
            length = compiled.length,
            part,
            separatorPos,
            textLength,
            textPos = [0],
            value;

        text = Lang.trim(text);
        textLength = text.length;

        if (!textLength) {
            return false;
        }

        for (i = 0; i < length; i++) {
            part = compiled[i];

            if (textPos[0] > textLength) {
                break;
            }

            if (Lang.isString(part)) {
                textPos[0]++;
                continue;
            }

            if (part.sequence) {
                if (DateParser.HINTS.TZ === part.hints) {
                    value = instance._subparseTimeZone(text, textPos);
                }
                else if (part.numeric) {
                    value = instance._getNextNumericValue(text, textPos);
                    value = instance._subparseNumericBlob(value, textPos, i);
                }
                else {
                    value = instance._getNextValue(text, textPos, null);
                    value = instance._subparseStringBlob(value, textPos, i);
                }
            }
            else {
                separatorPos = instance._findNextSeparatorPos(compiled, i, text, textPos);

                // We may have skipped tokens and separators that were not present in the,
                // text, so update the compiled index to be the one right before the
                // separator that will be used.
                i = separatorPos - 1;

                value = instance._getNextValue(text, textPos, compiled[separatorPos]);
            }

            if (part.hints.setter) {
                part.hints.setter.call(
                    instance, calendar, Lang.trim(value), part);
            }
        }

        return instance._getCalendarDate(calendar, opt_date);
    },

    /**
     * Expands the so called "aggregates" from the strftime pattern, e.g. %X
     * represents expanded %Hh%Mmin%Ss pattern.
     *
     * @method _expandPattern
     * @protected
     * @param {String} pattern Mask as strftime string.
     * @param {Array} pos One position array that holds the text position
     *     number. An array instance is used to keep reference to the position
     *     counter, therefore can be passed to different subparse methods.
     * @return {String} Expanded pattern.
     */
    _expandPattern: function(pattern, pos, token) {
        var instance = this,
            aggregate = A.Date.aggregates[token];

        if (aggregate === 'locale') {
            aggregate = instance._getLangResource(token);
        }

        if (aggregate) {
            return pattern.substring(0, pos) +
                aggregate +
                pattern.substring(pos + 2, pattern.length);
        }

        return pattern;
    },

    /**
     * Attempts to match the text at a given position against an array of
     * strings. The longer match is classified as best match, e.g if the data
     * array contains ["f", "fo", "foo", ...] all positions will match "foobar".
     * The longest match is "foobar".
     *
     * @method _findBestStringMatch
     * @protected
     * @param {String} val Keyword The string to match to.
     * @param {Array} data The string array of matching patterns.
     * @param {Boolean} opt_inverse Inverts the matching test. Instead of test
     *     array values against `val`, tests `val` against the array values.
     * @return {Number} Best match index. Returns -1 if doesn't find any match.
     */
    _findBestStringMatch: function(val, data, opt_inverse) {
        var bestMatchIndex = -1,
            bestMatchLength = 0,
            dataLength = data.length,
            dataValue,
            dataValueLength,
            i,
            valLength = val.length;

        val = val.toLowerCase();

        for (i = 0; i < dataLength; i++) {
            dataValue = data[i].toLowerCase();
            dataValueLength = dataValue.length;

            if (valLength &&
                (bestMatchLength <= dataValueLength) &&
                ((opt_inverse ? val.indexOf(dataValue) : dataValue.indexOf(val)) === 0)) {

                bestMatchIndex = i;
                bestMatchLength = dataValueLength;
            }
        }

        return bestMatchIndex;
    },

    /**
     * Looks for the position of the next separator that is included in the text.
     *
     * @method _findNextSeparatorPos
     * @param {Array} compiled Information about the compiled mask
     * @param {Number} compiledPos Current position in the compiled array
     * @param {String} text The text that is being parsed
     * @param {Number} Current position in the text being parsed
     * @returns {Number} Position of the next separator in the compiled array
     * @protected
     */
    _findNextSeparatorPos: function(compiled, compiledPos, text, textPos) {
        var length = compiled.length,
            separatorPos = compiledPos + 1,
            j;

        for (j = compiledPos + 1; j < length; j++) {
            if (Lang.isString(compiled[j]) && text.indexOf(compiled[j], textPos[0] + 1) > textPos[0]) {
                separatorPos = j;
                break;
            }
        }

        return separatorPos;
    },

    /**
     * Based on the fields set, fill a Date object. For those fields that not
     * set, use the passed in date object's value.
     *
     * @method _getCalendarDate
     * @protected
     * @param {Array} data The string array of matching patterns.
     * @param {Date} opt_date Date object to be filled.
     * @return {Date} Filled date object. Returns `false` if have nothing to
     *     fill.
     */
    _getCalendarDate: function(calendar, opt_date) {
        var originalDate;

        if (A.Object.isEmpty(calendar)) {
            return false;
        }

        opt_date = opt_date || new Date();

        originalDate = opt_date.getDate();

        if (Lang.isValue(calendar.year)) {
            opt_date.setFullYear(calendar.year);
        }

        opt_date.setDate(1);

        if (Lang.isValue(calendar.month)) {
            opt_date.setMonth(calendar.month);
        }

        if (Lang.isValue(calendar.day)) {
            opt_date.setDate(calendar.day);
        }
        else {
            opt_date.setDate(originalDate);
        }

        if (Lang.isValue(calendar.hours)) {
            if (!calendar.isoTime) {
                if (calendar.ampm) {
                    // Adjust for PM, e.g. 1:00 PM
                    if (calendar.hours < 12) {
                        calendar.hours += 12;
                    }
                }
                else {
                    // Adjust for AM, e.g. 12:00 AM
                    if (calendar.hours === 12) {
                        calendar.hours = 0;
                    }
                }
            }

            opt_date.setHours(calendar.hours);
        }

        if (Lang.isValue(calendar.minutes)) {
            opt_date.setMinutes(calendar.minutes);
        }
        else {
            opt_date.setMinutes(0);
        }

        if (Lang.isValue(calendar.seconds)) {
            opt_date.setSeconds(calendar.seconds);
        }
        else {
            opt_date.setSeconds(0);
        }

        return opt_date;
    },

    /**
     * Infer the next value based on `textPos` position.
     *
     * @method _getNextValue
     * @protected
     * @param {String} text Input text.
     * @param {Array} textPos One position array that holds the text position
     *     number. An array instance is used to keep reference to the position
     *     counter, therefore can be passed to different subparse methods.
     * @param {String} opt_separator If specified is used as boundary of the
     *     next value.
     * @param {Boolean} opt_numeric If specified, find only next numeric values.
     * @return {String} Inferred next value.
     */
    _getNextValue: function(text, textPos, opt_separator, opt_numeric) {
        var textLength = text.length,
            ch,
            value = '';

        while (textPos[0] < textLength && text.charAt(textPos) === opt_separator) {
            textPos[0]++;
        }

        while (textPos[0] < textLength) {
            ch = text.charAt(textPos);

            if (opt_numeric && !/\d/.test(ch)) {
                break;
            }

            if ((textPos[0] < textLength) && (opt_separator === ch)) {
                break;
            }

            value += ch;

            textPos[0]++;
        }

        return value;
    },

    /**
     * Infer the next numeric value based on `textPos` position.
     *
     * @method _getNextNumericValue
     * @protected
     * @param {String} text Input text.
     * @param {Array} textPos One position array that holds the text position
     *     number. An array instance is used to keep reference to the position
     *     counter, therefore can be passed to different subparse methods.
     * @return {String} Inferred next value.
     */
    _getNextNumericValue: function(text, textPos) {
        var instance = this;

        return instance._getNextValue(text, textPos, null, true);
    },

    /**
     * Based on the strftime token, finds the hints object. Hints objects
     * contains information such as size, numeric tokens and setters.
     *
     * @method _getPatternHints
     * @protected
     * @param {String} token Strftime token.
     * @return {Object} Hints object. If token is not supported returns false.
     */
    _getPatternHints: function(token) {
        switch (token) {
            case 'a':
            case 'A':
            case 'd':
            case 'e':
                return DateParser.HINTS.DAY;
            case 'b':
            case 'B':
            case 'm':
                return DateParser.HINTS.MONTH;
            case 'H':
            case 'I':
            case 'k':
            case 'l':
                return DateParser.HINTS.HOURS;
            case 'M':
                return DateParser.HINTS.MINUTES;
            case 'p':
            case 'P':
                return DateParser.HINTS.AMPM;
            case 'S':
                return DateParser.HINTS.SECONDS;
            case 'c':
            case 'C':
            case 'D':
            case 'F':
            case 'h':
            case 'n':
            case 'r':
            case 'R':
            case 'T':
            case 'x':
            case 'X':
                return DateParser.HINTS.AGGREGATES;
            case 'y':
            case 'Y':
                return DateParser.HINTS.YEAR;
            case 'z':
            case 'Z':
                return DateParser.HINTS.TZ;
            default:
                return false;
        }
    },

    /**
     * Gets resource object with tokens information for the loaded language.
     *
     * @method _getLangResource
     * @protected
     * @param {String} token Strftime token.
     * @return {Object} Resource object.
     */
    _getLangResource: function(token) {
        return A.Intl.get('datatype-date-format', token);
    },

    /**
     * Sub-parses a numeric value. Some tokens are used in sequence, e.g. %d%m,
     * resulting in ambigous values such as "20122013", for 12/20/2013.
     * The found ambigous values are tested against the available token
     * information in order to be separated.
     *
     * @method _subparseNumericBlob
     * @protected
     * @param {String} blob Ambigous numeric value.
     * @param {Array} textPos One position array that holds the text position
     *     number. An array instance is used to keep reference to the position
     *     counter, therefore can be passed to different subparse methods.
     * @param {Number} i Token position on the compiled array.
     * @return {String} Non-ambiguous numeric value.
     */
    _subparseNumericBlob: function(blob, textPos, i) {
        var instance = this,
            blobLength = blob.length,
            compiled = instance.compiled,
            digitsPerToken = 0,
            part,
            sequenceDigitsLength = 0,
            sequenceLength = 0;

        while ((part = compiled[i++]) && part.sequence && part.numeric) {
            sequenceLength++;
            sequenceDigitsLength += part.hints.size;
        }

        digitsPerToken = Math.round(sequenceDigitsLength / sequenceLength);

        textPos[0] -= blobLength;
        blob = LString.padNumber(blob, sequenceDigitsLength);
        textPos[0] -= sequenceDigitsLength - blobLength;
        textPos[0] += digitsPerToken;

        return blob.substring(0, digitsPerToken);
    },

    /**
     * Sub-parses a string value. Some tokens are used in sequence, e.g. %a%b,
     * resulting in ambigous values such as "MonJun". The found ambigous values
     * are tested against the available token values in order to be separated.
     *
     * @method _subparseStringBlob
     * @protected
     * @param {String} blob Ambigous string value.
     * @param {Array} textPos One position array that holds the text position
     *     number. An array instance is used to keep reference to the position
     *     counter, therefore can be passed to different subparse methods.
     * @param {Number} i Token position on the compiled array.
     * @return {String} Non-ambiguous string value.
     */
    _subparseStringBlob: function(blob, textPos, i) {
        var instance = this,
            compiled = instance.compiled,
            bestMatchIndex = -1,
            data,
            part;

        textPos[0] -= blob.length;

        while ((part = compiled[i++]) && part.sequence && !part.numeric) {
            data = instance._getLangResource(part.token);

            if (!data) {
                continue;
            }

            bestMatchIndex = instance._findBestStringMatch(blob, data, true);

            if (bestMatchIndex > -1) {
                break;
            }
        }

        if (bestMatchIndex > -1) {
            blob = data[bestMatchIndex];
            textPos[0] += blob.length;
        }

        return blob;
    },

    /**
     * Sub-parses timezones.
     *
     * @method _subparseTimeZone
     * @protected
     * @param {String} text Input text.
     * @param {Array} textPos One position array that holds the text position
     *     number. An array instance is used to keep reference to the position
     *     counter, therefore can be passed to different subparse methods.
     * @param {Number} i Token position on the compiled array.
     * @return {Object} Found timezone.
     */
    _subparseTimeZone: function(text, textPos) {
        var match,
            tz;

        text = text.substring(textPos[0]);

        match = /\b[A-Z]{3}([+\-\s])?(\d{1,2})?:?(\d{1,2})?/.exec(text);

        if (match) {
            tz = match[0];
            textPos[0] += text.indexOf(tz) + tz.length;
        }

        return tz;
    }
});

/**
 * Static property provides an object that contains hints information for
 * possible token values, e.g. year, month, day etc.
 *
 * @property HINTS
 * @type Object
 * @static
 */
DateParser.HINTS = {
    /**
     * Static property provides an object that contains hints information for
     * aggregates tokens.
     *
     * @property HINTS.AGGREGATES
     * @type Object
     * @static
     */
    AGGREGATES: {
        aggregates: true
    },

    /**
     * Static property provides an object that contains hints information for
     * ampm tokens.
     *
     * @property HINTS.AMPM
     * @type Object
     * @static
     */
    AMPM: {
        setter: function(calendar, val) {
            var instance = this,
                parsed = instance._findBestStringMatch(
                    val.toLowerCase(), instance._getLangResource('P'));

            if (parsed > -1) {
                calendar.ampm = parsed;
            }
        }
    },

    /**
     * Static property provides an object that contains hints information for
     * year tokens.
     *
     * @property HINTS.YEAR
     * @type Object
     * @static
     */
    YEAR: {
        numericTokens: 'yY',
        setter: function(calendar, val, compiled) {
            var year = _parseInt(val);

            if ((compiled.token === 'y') && Lang.isValue(year)) {
                year += year < 0 ? -DateParser.TWO_DIGIT_YEAR_BASE : +DateParser.TWO_DIGIT_YEAR_BASE;
            }

            if (Lang.isNumber(year)) {
                calendar.year = year;
            }
        },
        size: 4
    },

    /**
     * Static property provides an object that contains hints information for
     * month tokens.
     *
     * @property HINTS.MONTH
     * @type Object
     * @static
     */
    MONTH: {
        numericTokens: 'm',
        setter: function(calendar, val) {
            var instance = this,
                parsed = parseInt(val, 10);

            if (Lang.isNumber(parsed)) {
                parsed -= 1;
            }
            else {
                parsed = instance._findBestStringMatch(
                    val, instance._getLangResource('B'));
            }

            if (Lang.isNumber(parsed) && (parsed > -1)) {
                calendar.month = parsed;
            }
        },
        size: 2
    },

    /**
     * Static property provides an object that contains hints information for
     * day tokens.
     *
     * @property HINTS.DAY
     * @type Object
     * @static
     */
    DAY: {
        numericTokens: 'de',
        setter: function(calendar, val) {
            val = _parseInt(val);

            if (Lang.isNumber(val)) {
                calendar.day = val;
            }
        },
        size: 2
    },

    /**
     * Static property provides an object that contains hints information for
     * hours tokens.
     *
     * @property HINTS.HOURS
     * @type Object
     * @static
     */
    HOURS: {
        numericTokens: 'HIkl',
        setter: function(calendar, val, compiled) {
            calendar.hours = _parseInt(val);
            calendar.isoTime = false;

            if ((compiled.token === 'H') || (compiled.token === 'k')) {
                calendar.isoTime = true;
            }
        },
        size: 2
    },

    /**
     * Static property provides an object that contains hints information for
     * minutes tokens.
     *
     * @property HINTS.MINUTES
     * @type Object
     * @static
     */
    MINUTES: {
        numericTokens: 'M',
        setter: function(calendar, val) {
            val = _parseInt(val);

            if (Lang.isNumber(val)) {
                calendar.minutes = val;
            }
        },
        size: 2
    },

    /**
     * Static property provides an object that contains hints information for
     * seconds tokens.
     *
     * @property HINTS.SECONDS
     * @type Object
     * @static
     */
    SECONDS: {
        numericTokens: 'S',
        setter: function(calendar, val) {
            val = _parseInt(val);

            if (Lang.isNumber(val)) {
                calendar.seconds = val;
            }
        },
        size: 2
    },

    /**
     * Static property provides an object that contains hints information for
     * timezone tokens.
     *
     * @property HINTS.TZ
     * @type Object
     * @static
     */
    TZ: {
        setter: function(calendar, val) {
            calendar.tz = val;
        }
    }
};

A.DateParser = DateParser;

A.Date.dateparser = new A.DateParser();

/**
 * Takes a string mask and a text as input and parses it as a native JavaScript
 * Date. **If only one argument is passed**, the YUI parser will be called for
 * backwards compatibility.
 *
 * @for Date
 * @method parse
 * @static
 * @param {String} mask Mask as strftime string.
 * @param {String} text Text input to be parsed.
 * @param {Date} opt_date Optional Date object to be used a base date for
 *     filling the parsed values.
 *
 *  **parse {HTML} (Optional)**
 *
 *  Any strftime string is supported, such as `%I:%M:%S %p`. This format has
 *  several specifiers defined by the Open group at:
 *  http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html
 *
 *  PHP added a few of its own, defined at: http://www.php.net/strftime
 *
 *  This JavaScript implementation supports all the PHP specifiers and a few
 *  more. The full list is below:
 *
 *  If not specified, it defaults to the ISO 8601 standard date format:
 *  `%Y-%m-%d`.
 *
 *    * **%a** abbreviated weekday name according to the current locale
 *    * **%A** full weekday name according to the current locale
 *    * **%b** abbreviated month name according to the current locale
 *    * **%B** full month name according to the current locale
 *    * **%c** preferred date and time representation for the current locale
 *    * **%C** century number (the year divided by 100 and truncated to an
 *      integer, range `00` to `99`)
 *    * **%d** day of the month as a decimal number (range `01` to `31`)
 *    * **%D** same as `%m/%d/%y`
 *    * **%e** day of the month as a decimal number, a single digit is preceded
 *      by a space (range `1` to `31`)
 *    * **%F** same as `%Y-%m-%d` (ISO 8601 date format)
 *    * **%g** like `%G`, but without the century
 *    * **%G** The 4-digit year corresponding to the ISO week number
 *    * **%h** same as `%b`
 *    * **%H** hour as a decimal number using a 24-hour clock (range `00` to `23`)
 *    * **%I** hour as a decimal number using a 12-hour clock (range `01` to `12`)
 *    * **%j** day of the year as a decimal number (range 001 to 366)
 *    * **%k** hour as a decimal number using a 24-hour clock (range `0` to `23`);
 *      single digits are preceded by a blank. (See also `%H`.)
 *    * **%l** hour as a decimal number using a 12-hour clock (range `1` to `12`);
 *      single digits are preceded by a blank. (See also `%I`.)
 *    * **%m** month as a decimal number (range `01` to `12`)
 *    * **%M** minute as a decimal number
 *    * **%n** newline character
 *    * **%p** either `AM` or `PM` according to the given time value, or the
 *      corresponding strings for the current locale
 *    * **%P** like `%p`, but lower case
 *    * **%r** time in a.m. and p.m. notation equal to `%I:%M:%S %p`
 *    * **%R** time in 24 hour notation equal to `%H:%M`
 *    * **%s** number of seconds since the Epoch, ie, since `1970-01-01
 *      00:00:00` UTC
 *    * **%S** second as a decimal number
 *    * **%t** tab character
 *    * **%T** current time, equal to `%H:%M:%S`
 *    * **%u** weekday as a decimal number [1,7], with 1 representing Monday
 *    * **%U** week number of the current year as a decimal number, starting
 *      with the first Sunday as the first day of the first week
 *    * **%V** The ISO 8601:1988 week number of the current year as a decimal
 *      number, range `01` to `53`, where week 1 is the first week that has at least
 *      4 days in the current year, and with Monday as the first day of the
 *      week.
 *    * **%w** day of the week as a decimal, Sunday being 0
 *    * **%W** week number of the current year as a decimal number, starting
 *      with the first Monday as the first day of the first week
 *    * **%x** preferred date representation for the current locale without the
 *      time
 *    * **%X** preferred time representation for the current locale without the
 *      date
 *    * **%y** year as a decimal number without a century (range `00` to `99`)
 *    * **%Y** year as a decimal number including the century
 *    * **%z** numerical time zone representation
 *    * **%Z** time zone name or abbreviation
 *    * **%%** a literal `%` character
 * @return {Date} native JavaScript Date. Returns `false` if cannot parse.
 */

var yDateParser = A.Date.parse;

A.Date.parse = function(pattern, text, opt_date) {
    if (arguments.length === 1) {
        return yDateParser(arguments[0]);
    }

    A.Date.dateparser.compilePattern(pattern);

    return A.Date.dateparser.parse(text, opt_date);
};

A.Parsers.date = A.Date.parse;


}, '3.0.1', {"requires": ["aui-base-lang", "datatype-date-format", "datatype-date-parse", "intl"]});
