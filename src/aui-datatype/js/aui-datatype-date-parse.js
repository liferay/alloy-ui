var Lang = A.Lang,
    LString = Lang.String,

    _parseInt = function(val) {
        val = parseInt(val, 10);

        if (!isNaN(val)) {
            return val;
        }
    },

    LOCALE = 'locale';

function DateParser(opt_pattern) {
    var instance = this;

    if (opt_pattern) {
        instance.compilePattern(opt_pattern);
    }
}

DateParser.TOKEN_PREFIX = '%';
DateParser.TWO_DIGIT_YEAR_BASE = 2000;

A.mix(DateParser.prototype, {
    compiled: null,

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
                        token: chNext,
                    };

                    last = compiled[compiled.length-1];

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

    parse: function(text, opt_date) {
        var instance = this,
            calendar = {},
            compiled = instance.compiled,
            i,
            length = compiled.length,
            nextPart,
            part,
            textLength = text.length,
            textPos = [0],
            value;

        text = Lang.trim(text);

        for (i = 0; i < length; i++) {
            part = compiled[i];
            nextPart = compiled[i + 1];

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
                value = instance._getNextValue(text, textPos, nextPart);
            }

            if (part.hints.setter) {
                part.hints.setter.call(
                    instance, calendar, Lang.trim(value), part);
            }
        }

        return instance._getCalendarDate(calendar, opt_date);
    },

    _expandPattern: function(pattern, pos, token) {
        var instance = this,
            aggregate = A.Date.aggregates[token];

        if (aggregate === LOCALE) {
            aggregate = instance._getLangResource(token);
        }

        if (aggregate) {
            return  pattern.substring(0, pos) +
                    aggregate +
                    pattern.substring(pos + 2, pattern.length);
        }

        return pattern;
    },

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
            if (!calendar.isoTime && calendar.ampm) {
                calendar.hours += 12;
            }

            opt_date.setHours(calendar.hours);
        }

        if (Lang.isValue(calendar.minutes)) {
            opt_date.setMinutes(calendar.minutes);
        }

        if (Lang.isValue(calendar.seconds)) {
            opt_date.setSeconds(calendar.seconds);
        }

        if (Lang.isValue(calendar.tz)) {
            // TODO
        }

        return opt_date;
    },

    _getNextValue: function(text, textPos, opt_separator, opt_numeric) {
        var textLength = text.length,
            ch,
            value = '';

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

    _getNextNumericValue: function(text, textPos) {
        var instance = this;

        return instance._getNextValue(text, textPos, null, true);
    },

    _getPatternHints: function(token) {
        switch(token) {
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

    _getLangResource: function(key) {
        return A.Intl.get('datatype-date-format', key);
    },

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

        digitsPerToken = Math.round(sequenceDigitsLength/sequenceLength);

        textPos[0] -= blobLength;
        blob = LString.padNumber(blob, sequenceDigitsLength);
        textPos[0] -= sequenceDigitsLength - blobLength;
        textPos[0] += digitsPerToken;

        return blob.substring(0, digitsPerToken);
    },

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

    _subparseTimeZone: function(text, textPos) {
        var match,
            tz;

        text = text.substring(textPos[0]);

        match = /\b[A-Z]{3}([+-\s])?(\d{1,2})?:?(\d{1,2})?/.exec(text);

        if (match) {
            tz = match[0];
            textPos[0] += text.indexOf(tz) + tz.length;
        }

        return tz;
    }
});

DateParser.HINTS = {
    AGGREGATES: {
        aggregates: true
    },

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

    YEAR: {
        numericTokens: 'yY',
        setter: function(calendar, val, compiled) {
            var year = _parseInt(val);

            if ((compiled.token === 'y') && Lang.isValue(year)) {
                year += year < 0 ?
                    -DateParser.TWO_DIGIT_YEAR_BASE :
                    +DateParser.TWO_DIGIT_YEAR_BASE;
            }

            calendar.year = year;
        },
        size: 4
    },

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

    DAY: {
        numericTokens: 'de',
        setter: function(calendar, val) {
            calendar.day = _parseInt(val);
        },
        size: 2
    },

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

    MINUTES: {
        numericTokens: 'M',
        setter: function(calendar, val) {
            calendar.minutes = _parseInt(val);
        },
        size: 2
    },

    SECONDS: {
        numericTokens: 'S',
        setter: function(calendar, val) {
            calendar.seconds = _parseInt(val);
        },
        size: 2
    },

    TZ: {
        setter: function(calendar, val) {
            calendar.tz = val;
        }
    }
};

A.DateParser = DateParser;

A.Date.dateparser = new A.DateParser();

A.Date.parse = function(pattern, text, opt_date) {
    A.Date.dateparser.compilePattern(pattern);

    return A.Date.dateparser.parse(text, opt_date);
};

A.Parsers.date = A.Date.parse;