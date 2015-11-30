YUI.add('aui-base-lang', function (A, NAME) {

(function() {
    var Lang = A.Lang,
        aArray = A.Array,
        AObject = A.Object,

        isArray = Lang.isArray,
        isNumber = Lang.isNumber,
        isString = Lang.isString,
        isUndefined = Lang.isUndefined,

        owns = AObject.owns;

    A.fn = function(fn, context, args) {
        var wrappedFn,
            dynamicLookup;

        // Explicitly set function arguments
        if (!isNumber(fn)) {
            var xargs = arguments;

            if (xargs.length > 2) {
                xargs = aArray(xargs, 2, true);
            }

            dynamicLookup = (isString(fn) && context);

            wrappedFn = function() {
                var method = (!dynamicLookup) ? fn : context[fn];

                return method.apply(context || fn, xargs);
            };
        }
        else {
            // Set function arity
            var argLength = fn;

            fn = context;
            context = args;
            dynamicLookup = (isString(fn) && context);

            wrappedFn = function() {
                var method = (!dynamicLookup) ? fn : context[fn],
                    returnValue;

                context = context || method;

                if (argLength > 0) {
                    returnValue = method.apply(context, aArray(arguments, 0, true).slice(0, argLength));
                }
                else {
                    returnValue = method.call(context);
                }

                return returnValue;
            };
        }

        return wrappedFn;
    };

    A.mix(Lang, {
        constrain: function(num, min, max) {
            return Math.min(Math.max(num, min), max);
        },

        emptyFn: function() {},

        emptyFnFalse: function() {
            return false;
        },

        emptyFnTrue: function() {
            return true;
        },

        isGuid: function(id) {
            return String(id).indexOf(A.Env._guidp) === 0;
        },

        isInteger: function(val) {
            return typeof val === 'number' &&
                isFinite(val) &&
                val > -9007199254740992 &&
                val < 9007199254740992 &&
                Math.floor(val) === val;
        },

        isNode: function(val) {
            return A.instanceOf(val, A.Node);
        },

        isNodeList: function(val) {
            return A.instanceOf(val, A.NodeList);
        },

        toFloat: function(value, defaultValue) {
            return parseFloat(value) || defaultValue || 0;
        },

        toInt: function(value, radix, defaultValue) {
            return parseInt(value, radix || 10) || defaultValue || 0;
        }
    });

    A.mix(aArray, {
        remove: function(a, from, to) {
            var rest = a.slice((to || from) + 1 || a.length);
            a.length = (from < 0) ? (a.length + from) : from;

            return a.push.apply(a, rest);
        },

        removeItem: function(a, item) {
            var index = aArray.indexOf(a, item);

            if (index > -1) {
                return aArray.remove(a, index);
            }

            return a;
        }
    });

    var LString = A.namespace('Lang.String'),

        DOC = A.config.doc,
        REGEX_DASH = /-([a-z])/gi,
        REGEX_ESCAPE_REGEX = /([.*+?^$(){}|[\]\/\\])/g,
        REGEX_NL2BR = /\r?\n/g,
        REGEX_STRIP_SCRIPTS = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/gi,
        REGEX_STRIP_TAGS = /<\/?[^>]+>/gi,
        REGEX_UNCAMELIZE = /([a-zA-Z][a-zA-Z])([A-Z])([a-z])/g,
        REGEX_UNCAMELIZE_REPLACE_SEPARATOR = /([a-z])([A-Z])/g,
        STR_ELLIPSIS = '...',

        htmlUnescapedValues = [],

        MAP_HTML_CHARS_ESCAPED = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&#034;',
            '\'': '&#039;',
            '/': '&#047;',
            '`': '&#096;'
        },
        htmlChar,
        MAP_HTML_CHARS_UNESCAPED = {};

    for (htmlChar in MAP_HTML_CHARS_ESCAPED) {
        if (MAP_HTML_CHARS_ESCAPED.hasOwnProperty(htmlChar)) {
            var escapedValue = MAP_HTML_CHARS_ESCAPED[htmlChar];

            MAP_HTML_CHARS_UNESCAPED[escapedValue] = htmlChar;

            htmlUnescapedValues.push(htmlChar);
        }
    }

    var REGEX_HTML_ESCAPE = new RegExp('[' + htmlUnescapedValues.join('') + ']', 'g'),
        REGEX_HTML_UNESCAPE = /&([^;]+);/g;

    A.mix(LString, {
        camelize: A.cached(
            function(str, separator) {
                var regex = REGEX_DASH;

                str = String(str);

                if (separator) {
                    regex = new RegExp(separator + '([a-z])', 'gi');
                }

                return str.replace(regex, LString._camelize);
            }
        ),

        capitalize: A.cached(
            function(str) {
                if (str) {
                    str = String(str);

                    str = str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
                }

                return str;
            }
        ),

        contains: function(str, searchString) {
            return str.indexOf(searchString) !== -1;
        },

        defaultValue: function(str, defaultValue) {
            if (isUndefined(str) || str === '') {
                if (isUndefined(defaultValue)) {
                    defaultValue = '';
                }

                str = defaultValue;
            }

            return str;
        },

        endsWith: function(str, suffix) {
            var length = (str.length - suffix.length);

            return ((length >= 0) && (str.indexOf(suffix, length) === length));
        },

        escapeHTML: function(str) {
            return str.replace(REGEX_HTML_ESCAPE, LString._escapeHTML);
        },

        // Courtesy of: http://simonwillison.net/2006/Jan/20/escape/
        escapeRegEx: function(str) {
            return str.replace(REGEX_ESCAPE_REGEX, '\\$1');
        },

        nl2br: function(str) {
            return String(str).replace(REGEX_NL2BR, '<br />');
        },

        padNumber: function(num, length, precision) {
            var str = precision ? Number(num).toFixed(precision) : String(num);
            var index = str.indexOf('.');

            if (index === -1) {
                index = str.length;
            }

            return LString.repeat('0', Math.max(0, length - index)) + str;
        },

        pluralize: function(count, singularVersion, pluralVersion) {
            var suffix;

            if (count === 1) {
                suffix = singularVersion;
            }
            else {
                suffix = pluralVersion || singularVersion + 's';
            }

            return count + ' ' + suffix;
        },

        prefix: function(prefix, str) {
            str = String(str);

            if (str.indexOf(prefix) !== 0) {
                str = prefix + str;
            }

            return str;
        },

        remove: function(str, substitute, all) {
            var re = new RegExp(LString.escapeRegEx(substitute), all ? 'g' : '');

            return str.replace(re, '');
        },

        removeAll: function(str, substitute) {
            return LString.remove(str, substitute, true);
        },

        repeat: function(str, length) {
            return new Array(length + 1).join(str);
        },

        round: function(value, precision) {
            value = Number(value);

            if (isNumber(precision)) {
                precision = Math.pow(10, precision);
                value = Math.round(value * precision) / precision;
            }

            return value;
        },

        startsWith: function(str, prefix) {
            return (str.lastIndexOf(prefix, 0) === 0);
        },

        stripScripts: function(str) {
            if (str) {
                str = String(str).replace(REGEX_STRIP_SCRIPTS, '');
            }

            return str;
        },

        stripTags: function(str) {
            if (str) {
                str = String(str).replace(REGEX_STRIP_TAGS, '');
            }

            return str;
        },

        substr: function(str, start, length) {
            return String(str).substr(start, length);
        },

        uncamelize: A.cached(
            function(str, separator) {
                separator = separator || ' ';

                str = String(str);

                str = str.replace(REGEX_UNCAMELIZE, '$1' + separator + '$2$3');
                str = str.replace(REGEX_UNCAMELIZE_REPLACE_SEPARATOR, '$1' + separator + '$2');

                return str;
            }
        ),

        toLowerCase: function(str) {
            return String(str).toLowerCase();
        },

        toUpperCase: function(str) {
            return String(str).toUpperCase();
        },

        trim: Lang.trim,

        truncate: function(str, length, where) {
            str = String(str);

            var ellipsisLength = STR_ELLIPSIS.length,
                strLength = str.length;

            if (length > 3) {
                if (str && (strLength > length)) {
                    where = where || 'end';

                    if (where === 'end') {
                        str = str.substr(0, (length - ellipsisLength)) + STR_ELLIPSIS;
                    }
                    else if (where === 'middle') {
                        var middlePointA = Math.floor((length - ellipsisLength) / 2),
                            middlePointB = middlePointA;

                        if (length % 2 === 0) {
                            middlePointA = Math.ceil((length - ellipsisLength) / 2);
                            middlePointB = Math.floor((length - ellipsisLength) / 2);
                        }

                        str = str.substr(0, middlePointA) + STR_ELLIPSIS + str.substr(strLength - middlePointB);
                    }
                    else if (where === 'start') {
                        str = STR_ELLIPSIS + str.substr(strLength - length + ellipsisLength);
                    }
                }
            }
            else {
                str = STR_ELLIPSIS;
            }

            return str;
        },

        undef: function(str) {
            if (isUndefined(str)) {
                str = '';
            }

            return str;
        },

        // inspired from Google unescape entities
        unescapeEntities: function(str) {
            if (LString.contains(str, '&')) {
                if (DOC && !LString.contains(str, '<')) {
                    str = LString._unescapeEntitiesUsingDom(str);
                }
                else {
                    str = LString.unescapeHTML(str);
                }
            }

            return str;
        },

        unescapeHTML: function(str) {
            return str.replace(REGEX_HTML_UNESCAPE, LString._unescapeHTML);
        },

        _camelize: function(match0, match1) {
            return match1.toUpperCase();
        },

        _escapeHTML: function(match) {
            return MAP_HTML_CHARS_ESCAPED[match];
        },

        _unescapeHTML: function(match, entity) {
            var value = MAP_HTML_CHARS_UNESCAPED[match] || match;

            if (!value && entity.charAt(0) === '#') {
                var charCode = Number('0' + value.substr(1));

                if (!isNaN(charCode)) {
                    value = String.fromCharCode(charCode);
                }
            }

            return value;
        },

        _unescapeEntitiesUsingDom: function(str) {
            var el = DOC.createElement('a');

            el.innerHTML = str;

            if (el.normalize) {
                el.normalize();
            }

            str = el.firstChild.nodeValue;

            el.innerHTML = '';

            return str;
        }
    });

    /*
     * Maps an object to an array, using the return value of fn as the values
     * for the new array.
     */
    AObject.map = function(obj, fn, context) {
        var map = [],
            i;

        for (i in obj) {
            if (owns(obj, i)) {
                map[map.length] = fn.call(context, obj[i], i, obj);
            }
        }

        return map;
    };

    /*
     * Maps an array or object to a resulting array, using the return value of
     * fn as the values for the new array. Like A.each, this function can accept
     * an object or an array.
     */
    A.map = function(obj) {
        var module = AObject;

        if (isArray(obj)) {
            module = aArray;
        }

        return module.map.apply(this, arguments);
    };
}());


}, '3.0.1');
