(function() {
	var Lang = A.Lang,
		AArray = A.Array,
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
				xargs = AArray(xargs, 2, true);
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
					returnValue = method.apply(context, AArray(arguments, 0, true).slice(0, argLength));
				}
				else {
					returnValue = method.call(context);
				}

				return returnValue;
			};
		}

		return wrappedFn;
	};

	/**
	 * A.Lang
	 */
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

		toFloat: function(value, defaultValue) {
			return parseFloat(value) || defaultValue || 0;
		},

		toInt: function(value, radix, defaultValue) {
			return parseInt(value, radix || 10) || defaultValue || 0;
		}
	});

	/**
	 * A.Array
	 */
	A.mix(AArray, {
		remove: function(a, from, to) {
			var rest = a.slice((to || from) + 1 || a.length);
			a.length = (from < 0) ? (a.length + from) : from;

			return a.push.apply(a, rest);
		},

		removeItem: function(a, item) {
			var index = AArray.indexOf(a, item);

			if (index > -1) {
				return AArray.remove(a, index);
			}

			return a;
		}
	});

	/**
	 * A.Labg.String
	 */
	var LString = A.namespace('Lang.String'),

		DOC = A.config.doc,
		INNER_HTML = 'innerHTML',
		NORMALIZE = 'normalize',
		REGEX_DASH = /-([a-z])/gi,
		REGEX_ESCAPE_REGEX = /([.*+?^$(){}|[\]\/\\])/g,
		REGEX_NL2BR = /\r?\n/g,
		REGEX_STRIP_SCRIPTS = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/gi,
		REGEX_STRIP_TAGS = /<\/?[^>]+>/gi,
		REGEX_UNCAMELIZE = /([a-zA-Z][a-zA-Z])([A-Z])([a-z])/g,
		REGEX_UNCAMELIZE_REPLACE_SEPARATOR = /([a-zA-Z][a-zA-Z])([A-Z])([a-z])/g,

		STR_BLANK = '',
		STR_AMP = '&',
		STR_CHEVRON_LEFT = '<',
		STR_ELLIPSIS = '...',
		STR_END = 'end',
		STR_HASH = '#',
		STR_MIDDLE = 'middle',
		STR_START = 'start',
		STR_ZERO = '0',

		STR_G = 'g',
		STR_S = 's',

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

	var REGEX_HTML_ESCAPE = new RegExp('[' + htmlUnescapedValues.join(STR_BLANK) + ']', 'g'),
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
			if (isUndefined(str) || str === STR_BLANK) {
				if (isUndefined(defaultValue)) {
					defaultValue = STR_BLANK;
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
			var instance = this;

			return String(str).replace(REGEX_NL2BR, '<br />');
		},

		padNumber: function(num, length, precision) {
			var str = precision ? Number(num).toFixed(precision) : String(num);
			var index = str.indexOf('.');

			if (index === -1) {
				index = str.length;
			}

			return LString.repeat(STR_ZERO, Math.max(0, length - index)) + str;
		},

		pluralize: function(count, singularVersion, pluralVersion) {
			var suffix;

			if (count === 1) {
				suffix = singularVersion;
			}
			else {
				suffix = pluralVersion || singularVersion + STR_S;
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
			var re = new RegExp(LString.escapeRegEx(substitute), all ? STR_G : STR_BLANK);

			return str.replace(re, STR_BLANK);
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
				str = String(str).replace(REGEX_STRIP_SCRIPTS, STR_BLANK);
			}

			return str;
		},

		stripTags: function(str) {
			var instance = this;

			if (str) {
				str = String(str).replace(REGEX_STRIP_TAGS, STR_BLANK);
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

			var strLength = str.length;

			if (str && strLength > length) {
				where = where || STR_END;

				if (where === STR_END) {
					str = str.substr(0, length - STR_ELLIPSIS.length) + STR_ELLIPSIS;
				}
				else if (where === STR_MIDDLE) {
					var middlePoint = Math.floor(length / 2);

					str = str.substr(0, middlePoint) + STR_ELLIPSIS + str.substr(strLength - middlePoint);
				}
				else if (where === STR_START) {
					str = STR_ELLIPSIS + str.substr(strLength - length);
				}
			}

			return str;
		},

		undef: function(str) {
			if (isUndefined(str)) {
				str = STR_BLANK;
			}

			return str;
		},

		// inspired from Google unescape entities
		unescapeEntities: function(str) {
			if (LString.contains(str, STR_AMP)) {
				if (DOC && !LString.contains(str, STR_CHEVRON_LEFT)) {
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

		_unescapeHTML: function(match) {
			var value = MAP_HTML_CHARS_UNESCAPED[match];

			if (!value && value.charAt(0) === STR_HASH) {
				var charCode = Number(STR_ZERO + value.substr(1));

				if (!isNaN(charCode)) {
					value = String.fromCharCode(charCode);
				}
			}

			return value;
		},

		_unescapeEntitiesUsingDom: function(str) {
			var el = DOC.createElement('a');

			el[INNER_HTML] = str;

			if (el[NORMALIZE]) {
				el[NORMALIZE]();
			}

			str = el.firstChild.nodeValue;

			el[INNER_HTML] = STR_BLANK;

			return str;
		}
	});

	/**
	 * A.Object
	 */

	/**
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

	/**
	 * Maps an array or object to a resulting array, using the return value of
	 * fn as the values for the new array. Like A.each, this function can accept
	 * an object or an array.
	 */
	A.map = function(obj, fn, context) {
		var module = AObject;

		if (isArray(obj)) {
			module = AArray;
		}

		return module.map.apply(this, arguments);
	};
}());