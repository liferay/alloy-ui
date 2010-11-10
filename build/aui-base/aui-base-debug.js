;(function() {
	/*
	 * Alloy JavaScript Library v@VERSION@
	 * http://alloy.liferay.com/
	 *
	 * Copyright (c) 2010 Liferay Inc.
	 * http://alloy.liferay.com/LICENSE.txt
	 *
	 * Nate Cavanaugh (nathan.cavanaugh@liferay.com)
	 * Eduardo Lundgren (eduardo.lundgren@liferay.com)
	 *
	 * Attribution/Third-party licenses
	 * http://alloy.liferay.com/ATTRIBUTION.txt
	 *
	 * Date: @DATE@
	 * Revision: @REVISION@
	 */

	YUI.AUI_config = YUI.AUI_config || {};

	var defaults = YUI.AUI_config;

	YUI.prototype.ready = function() {
		var instance = this;

		var slice = Array.prototype.slice;
		var args = slice.call(arguments, 0), index = args.length - 1;

		var fn = args[index];

		var modules = slice.call(arguments, 0, index);

		modules.push('event');

		modules.push(
			function(instance) {
				var args = arguments;

				instance.on(
					'domready',
					function() {
						fn.apply(this, args);
					}
				);
			}
		);

		instance.use.apply(instance, modules);
	};

	var ALLOY;

	if (typeof A != 'undefined') {
		ALLOY = A;
	}
	else {
		ALLOY = YUI(defaults);
	}

	var guidExtensions = function(A) {
		A.Env._guidp = ['aui', A.version, A.Env._yidx].join('_').replace(/\./g, '_');
	};

	guidExtensions(ALLOY);

	var originalConfig = ALLOY.config;

	ALLOY.config = ALLOY.merge(originalConfig, YUI.AUI_config);

	YUI.AUI = function(o) {
		var instance = this;

		if (o || instance instanceof AUI) {
			var args = ALLOY.Array(arguments);

			args.unshift(ALLOY.config);

			var newInstance = YUI.apply(ALLOY.config.win, args);

			AUI._uaExtensions(newInstance);
			AUI._guidExtensions(newInstance);

			return newInstance;
		}

		return ALLOY;
	};

	var AUI = YUI.AUI;

	AUI._guidExtensions = guidExtensions;

	window.AUI = AUI;

	var UA = ALLOY.UA;

	ALLOY.mix(AUI, YUI, true, null, 2);

	ALLOY.mix(
		AUI,
		{
			__version: '@VERSION',

			defaults: defaults,

			html5shiv: function(frag) {
				var instance = this;
				var doc = frag || document;

				if (UA.ie && doc && doc.createElement) {
					var elements = AUI.HTML5_ELEMENTS, length = elements.length;

					while (length--) {
						doc.createElement(elements[length]);
					}
				}

				return frag;
			},

			setDefaults: function(defaults) {
				var instance = this;

				ALLOY.mix(AUI.defaults, defaults, true, null, 0, true);
				ALLOY.mix(ALLOY.config, defaults, true, null, 0, true);
			},

			HTML5_ELEMENTS: 'abbr,article,aside,audio,canvas,command,datalist,details,figure,figcaption,footer,header,hgroup,keygen,mark,meter,nav,output,progress,section,source,summary,time,video'.split(',')
		},
		true
	);

	/*
	* HTML5 Compatability for IE
	*/

	AUI.html5shiv();

	/*
		UA extensions
	*/

	AUI._uaExtensions = function(A) {
		var p = navigator.platform;
		var u = navigator.userAgent;
		var b = /(Firefox|Opera|Chrome|Safari|KDE|iCab|Flock|IE)/.exec(u);
		var os = /(Win|Mac|Linux|iPhone|iPad|Sun|Solaris)/.exec(p);
		var versionDefaults = [0,0];

		b = (!b || !b.length) ? (/(Mozilla)/.exec(u) || ['']) : b;
		os = (!os || !os.length) ? [''] : os;

		UA = A.merge(
			UA,
			{
				gecko: /Gecko/.test(u) && !/like Gecko/.test(u),
				webkit: /WebKit/.test(u),

				aol: /America Online Browser/.test(u),
				camino: /Camino/.test(u),
				firefox: /Firefox/.test(u),
				flock: /Flock/.test(u),
				icab: /iCab/.test(u),
				konqueror: /KDE/.test(u),
				mozilla: /mozilla/.test(u),
				ie: /MSIE/.test(u),
				netscape: /Netscape/.test(u),
				opera: /Opera/.test(u),
				chrome: /Chrome/.test(u),
				safari: /Safari/.test(u) && !(/Chrome/.test(u)),
				browser: b[0].toLowerCase(),

				win: /Win/.test(p),
				mac: /Mac/.test(p),
				linux: /Linux/.test(p),
				iphone: (p == 'iPhone'),
				ipad: (p == 'iPad'),
				sun: /Solaris|SunOS/.test(p),
				os: os[0].toLowerCase(),

				platform: p,
				agent: u
			}
		);

		UA.version = {
			string: ''
		};

		if (UA.ie) {
			UA.version.string = (/MSIE ([^;]+)/.exec(u) || versionDefaults)[1];
		}
		else if (UA.firefox) {
			UA.version.string = (/Firefox\/(.+)/.exec(u) || versionDefaults)[1];
		}
		else if (UA.safari) {
			UA.version.string = (/Version\/([^\s]+)/.exec(u) || versionDefaults)[1];
		}
		else if (UA.opera) {
			UA.version.string = (/Opera\/([^\s]+)/.exec(u) || versionDefaults)[1];
		}

		UA.version.number = parseFloat(UA.version.string) || versionDefaults[0];
		UA.version.major = (/([^\.]+)/.exec(UA.version.string) || versionDefaults)[1];

		UA[UA.browser + UA.version.major] = true;

		UA.renderer = '';

		var documentElement = document.documentElement;

		UA.dir = documentElement.getAttribute('dir') || 'ltr';

		if (UA.ie) {
			UA.renderer = 'trident';
		}
		else if (UA.gecko) {
			UA.renderer = 'gecko';
		}
		else if (UA.webkit) {
			UA.renderer = 'webkit';
		}
		else if (UA.opera) {
			UA.renderer = 'presto';
		}

		A.UA = UA;

		/*
		* Browser selectors
		*/

		var selectors = [
			UA.renderer,
			UA.browser,
			UA.browser + UA.version.major,
			UA.os,
			UA.dir,
			'js'
		];

		if (UA.os == 'macintosh') {
			selectors.push('mac');
		}
		else if (UA.os == 'windows') {
			selectors.push('win');
		}

		if (UA.mobile) {
			selectors.push('mobile');
		}

		if (UA.secure) {
			selectors.push('secure');
		}

		UA.selectors = selectors.join(' ');

		// The methods in this if block only run once across all instances
		if (!documentElement._yuid) {
			documentElement.className += ' ' + UA.selectors;

			var CONFIG = A.config,
				DOC = CONFIG.doc,
				vml,
				svg;

			vml = !(svg = !!(CONFIG.win.SVGAngle || DOC.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1')));

			if (vml) {
				var div = DOC.createElement('div');
				var behaviorObj;

				div.innerHTML = '<v:shape adj="1"/>';

				behaviorObj = div.firstChild;

				behaviorObj.style.behavior = 'url(#default#VML)';

				if (!(behaviorObj && typeof behaviorObj.adj == 'object')) {
					vml = false;
				}

				div = null;
			}

			AUI._VML = vml;
			AUI._SVG = svg;

			A.stamp(documentElement);
		}

		UA.vml = AUI._VML;
		UA.svg = AUI._SVG;
	};

	AUI._uaExtensions(ALLOY);

	/*
	* Disable background image flickering in IE6
	*/

	if (UA.ie && UA.version.major <= 6) {
		try {
			document.execCommand('BackgroundImageCache', false, true);
		}
		catch (e) {
		}
	}
})();
AUI.add('aui-base', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isFunction = Lang.isFunction,
	isString = Lang.isString,

	AArray = A.Array,
	LString = A.namespace('Lang.String'),
	arrayIndexOf = AArray.indexOf,

	EMPTY_STR = '',

	DOC = A.config.doc,
	FIRST_CHILD = 'firstChild',
	INNER_HTML = 'innerHTML',
	NODE_VALUE = 'nodeValue',
	NORMALIZE = 'normalize';

A.mix(
	LString,
	{
		contains: function(s, ss) {
		  return s.indexOf(ss) != -1;
		},

		endsWith: function(str, suffix) {
			var length = (str.length - suffix.length);

			return ((length >= 0) && (str.indexOf(suffix, length) == length));
		},

		// Courtesy of: http://simonwillison.net/2006/Jan/20/escape/
		escapeRegEx: function(str) {
			return str.replace(/([.*+?^$(){}|[\]\/\\])/g, '\\$1');
		},

		repeat: function(string, length) {
			return new Array(length + 1).join(string);
		},

		padNumber: function(num, length, precision) {
			var str = precision ? Number(num).toFixed(precision) : String(num);
			var index = str.indexOf('.');

			if (index == -1) {
				index = str.length;
			}

			return LString.repeat('0', Math.max(0, length - index)) + str;
		},

		remove: function(s, substitute, all) {
			var re = new RegExp(LString.escapeRegEx(substitute), all ? 'g' : '');

			return s.replace(re, '');
		},

		removeAll: function(s, substitute) {
			return LString.remove(s, substitute, true);
		},

		startsWith: function(str, prefix) {
			return (str.lastIndexOf(prefix, 0) == 0);
		},

		trim: Lang.trim,

		// inspired from Google unescape entities
		unescapeEntities: function(str) {
			if (LString.contains(str, '&')) {
				if (DOC && !LString.contains(str, '<')) {
					str = LString._unescapeEntitiesUsingDom(str);
				}
				else {
					// Fall back on pure XML entities
					str = LString._unescapeXmlEntities(str);
				}
			}

			return str;
		},

		_unescapeEntitiesUsingDom: function(str) {
			var el = LString._unescapeNode;

			el[INNER_HTML] = str;

			if (el[NORMALIZE]) {
				el[NORMALIZE]();
			}

			str = el.firstChild.nodeValue;

			el[INNER_HTML] = EMPTY_STR;

			return str;
		},

		_unescapeXmlEntities: function(str) {
			return str.replace(/&([^;]+);/g, function(s, entity) {
				switch (entity) {
					case 'amp':
						return '&';
					case 'lt':
						return '<';
					case 'gt':
						return '>';
					case 'quot':
						return '"';
					default:
						if (entity.charAt(0) == '#') {
							var n = Number('0' + entity.substr(1));

							if (!isNaN(n)) {
								return String.fromCharCode(n);
							}
						}

					return s;
				}
			});
		},

		_unescapeNode: DOC.createElement('a')
	}
);

A.mix(
	AArray,
	{
		remove: function(a, from, to) {
		  var rest = a.slice((to || from) + 1 || a.length);
		  a.length = (from < 0) ? (a.length + from) : from;

		  return a.push.apply(a, rest);
		},

		removeItem: function(a, item) {
			var index = arrayIndexOf(a, item);

			return AArray.remove(a, index);
		}
	}
);

A.mix(
	Lang,
	{
		emptyFn: function() {},

		emptyFnFalse: function() {
			return false;
		},

		emptyFnTrue: function() {
			return true;
		},

		isGuid: function(id) {
			var instance = this;

			return String(id).indexOf(A.Env._guidp) === 0;
		},

		toQueryString: function(data) {
			var instance = this;

			var querystring = data;

			if (!isString(data)) {
				var buffer = [];

				var item;
				var value;

				var addToQueryString = instance._addToQueryString;

				for (var i in data) {
					item = data[i];

					if (isArray(item)) {
						for (var j = 0; j < item.length; j++) {
							addToQueryString(i, item[j], buffer);
						}
					}
					else {
						value = item;

						if (isFunction(item)) {
							value = item();
						}

						addToQueryString(i, value, buffer);
					}
				}

				querystring = buffer.join('&').replace(/%20/g, '+');
			}

			return querystring;
		},

		_addToQueryString: function(key, value, buffer) {
			var instance = this;

			buffer.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
		}
	}
);

}, '@VERSION@' ,{skinnable:false, requires:['aui-node','aui-component','aui-delayed-task','aui-selector','event','oop']});
