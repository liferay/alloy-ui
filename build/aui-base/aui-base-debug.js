;(function() {
	YUI.AUI_config = {
		classNamePrefix: 'aui',

		filter: 'raw',

		io: {
			method: 'GET'
		},

        combine: false,

		groups: {
            alloy: {
	            combine: false,
                modules: {
						'aui-autocomplete': {skinnable:true, requires:['aui-base','aui-overlay-base','datasource','dataschema','aui-form-combobox']},
						'aui-base': {skinnable:false, requires:['aui-node','aui-component','aui-delayed-task','aui-selector','event','oop']},
						'aui-button-item': {skinnable:true, requires:['aui-base','aui-state-interaction','widget-child']},
						'aui-calendar': {skinnable:true, requires:['aui-base','aui-datatype','widget-stdmod','datatype-date','widget-locale']},
						'aui-carousel': {skinnable:true, requires:['aui-base','anim']},
						'aui-char-counter': {skinnable:false, requires:['aui-base','aui-event-input']},
						'aui-chart': {skinnable:false, requires:['datasource','aui-swf','json']},
						'aui-color-picker': {submodules: {'aui-color-picker-grid-plugin': {requires:['aui-color-picker','plugin'], skinnable:true}, 'aui-color-picker-base': {requires:['aui-overlay-context','dd-drag','slider','substitute','aui-button-item','aui-color','aui-form-base','aui-panel'], skinnable:true} }, skinnable:true, use:['aui-color-picker-base','aui-color-picker-grid-plugin']},
						'aui-color': {skinnable:false},
						'aui-component': {requires:['widget'], skinnable:false},
						'aui-data-set': {requires:['oop','collection','base'], skinnable:false},
						'aui-datatype': {requires:['aui-base'], skinnable:false},
						'aui-datepicker': {submodules: {'aui-datepicker-select': {requires:['aui-datepicker-base','aui-button-item'], skinnable:true}, 'aui-datepicker-base': {requires:['aui-calendar','aui-overlay-context'], skinnable:true} }, use:['aui-datepicker-base','aui-datepicker-select'], skinnable:true},
						'aui-delayed-task': {skinnable:false},
						'aui-dialog': {requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize'], skinnable:true},
						'aui-drawing': {submodules: {'aui-drawing-fonts': {requires:['aui-drawing-base']}, 'aui-drawing-drag': {requires:['aui-drawing-base','event-gestures']}, 'aui-drawing-animate': {requires:['aui-drawing-base']}, 'aui-drawing-base': {requires:['aui-base','aui-color','substitute']} }, plugins:{'aui-drawing-vml': {condition: {trigger: 'aui-drawing-base',test: function(A){return A.UA.vml;}}},'aui-drawing-svg': {condition: {trigger: 'aui-drawing-base',test: function(A){return A.UA.svg;}}}, 'aui-drawing-safari': {condition: {trigger: 'aui-drawing-base',test: function(A){var UA = A.UA; return UA.safari && (UA.version.major < 4 || (UA.iphone || UA.ipad));}}}}, use:['aui-drawing-base', 'aui-drawing-animate', 'aui-drawing-drag', 'aui-drawing-fonts'], skinnable:false},
						'aui-editable': {requires:['aui-base','aui-form-combobox'], skinnable:true},
						'aui-event': {submodules: {'aui-event-input': {requires:['aui-base']} }, use:['aui-event-input'], skinnable:false},
						'aui-form': {submodules: {'aui-form-validator': {requires:['aui-base','aui-event-input','selector-css3','substitute']}, 'aui-form-textfield': {requires:['aui-form-field']}, 'aui-form-textarea': {requires:['aui-form-textfield'], skinnable:true}, 'aui-form-field': {requires:['aui-base','aui-component','substitute']}, 'aui-form-combobox': {requires:['aui-form-textarea','aui-toolbar'], skinnable:true}, 'aui-form-base': {requires:['aui-base','aui-data-set','aui-form-field','querystring-parse']} }, use:['aui-form-base','aui-form-combobox','aui-form-field','aui-form-textarea','aui-form-textfield','aui-form-validator'], skinnable:false},
						'aui-image-viewer': {submodules: {'aui-image-viewer-gallery': {requires:['aui-image-viewer-base','aui-paginator','aui-toolbar'], skinnable:true}, 'aui-image-viewer-base': {requires:['anim','aui-overlay-mask','substitute'], skinnable:true} }, use:['aui-image-viewer-base','aui-image-viewer-gallery'], skinnable:true},
						'aui-io': {submodules: {'aui-io-plugin': {requires:['aui-overlay-base','aui-parse-content','aui-io-request','aui-loading-mask']}, 'aui-io-request': {requires:['aui-base','io-base','json','plugin','querystring-stringify']} }, use:['aui-io-request','aui-io-plugin'], skinnable:false},
						'aui-live-search': {requires:['aui-base'], skinnable:false},
						'aui-loading-mask': {requires:['aui-overlay-mask','plugin','substitute'], skinnable:true},
						'aui-nested-list': {requires:['aui-base','dd-drag','dd-drop','dd-proxy'], skinnable:false},
						'aui-node': {submodules: {'aui-node-fx': {requires:['aui-base','anim','anim-node-plugin']}, 'aui-node-html5-print': {requires:['aui-node-html5']}, 'aui-node-html5': {requires:['collection','aui-base']}, 'aui-node-base': {requires:['aui-base']} }, use:['aui-node-base','aui-node-html5','aui-node-html5-print','aui-node-fx'], skinnable:false},
						'aui-overlay': {submodules: {'aui-overlay-mask': {requires:['aui-base','aui-overlay-base','event-resize'], skinnable:true}, 'aui-overlay-manager': {requires:['aui-base','aui-overlay-base','overlay','plugin']}, 'aui-overlay-context-panel': {requires:['aui-overlay-context','anim'], skinnable:true}, 'aui-overlay-context': {requires:['aui-overlay-manager','aui-delayed-task']}, 'aui-overlay-base': {requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']} }, use:['aui-overlay-base','aui-overlay-context','aui-overlay-context-panel','aui-overlay-manager','aui-overlay-mask'], skinnable:true},
						'aui-paginator': {requires:['aui-base','substitute'], skinnable:true},
						'aui-panel': {requires:['aui-component','widget-stdmod','aui-toolbar'], skinnable:true},
						'aui-parse-content': {requires:['async-queue','aui-base','plugin'], skinnable:false},
						'aui-portal-layout': {requires:['aui-base','dd-drag','dd-delegate','dd-drop','dd-proxy'], skinnable:true},
						'aui-progressbar': {requires:['aui-base'], skinnable:true},
						'aui-rating': {requires:['aui-base'], skinnable:true},
						'aui-resize': {submodules: {'aui-resize-constrain': {requires:['aui-resize-base','dd-constrain','plugin'], skinnable:false}, 'aui-resize-base': {requires:['aui-base','dd-drag','dd-delegate','dd-drop','substitute'], skinnable:true} }, use:['aui-resize-base','aui-resize-constrain'], skinnable:true},
						'aui-scheduler': {submodules: {'aui-scheduler-event': {requires:['aui-base','aui-color','aui-datatype','aui-overlay-context-panel','substitute'], skinnable:true}, 'aui-scheduler-view': {requires:['aui-scheduler-event','aui-calendar','aui-button-item','substitute','dd-drag','dd-delegate','dd-drop'], skinnable:true}, 'aui-scheduler-base': {requires:['aui-scheduler-view','datasource'], skinnable:true} }, use:['aui-scheduler-base','aui-scheduler-view','aui-scheduler-event'], skinnable:true},
						'aui-selector': {requires:['selector'], skinnable:false},
						'aui-skin-base': {type: 'css', path: 'aui-skin-base/css/aui-skin-base.css'},
						'aui-skin-classic-all': {type: 'css', path: 'aui-skin-classic/css/aui-skin-classic-all.css'},
						'aui-skin-classic': {type: 'css', requires:['aui-skin-base'], path: 'aui-skin-classic/css/aui-skin-classic.css'},
						'aui-sortable': {requires:['aui-base','dd-constrain','dd-drag','dd-drop','dd-proxy'], skinnable:true},
						'aui-state-interaction': {requires:['aui-base','plugin'], skinnable:false},
						'aui-swf': {requires:['aui-base','querystring-stringify-simple'], skinnable:false},
						'aui-tabs': {submodules: {'aui-tabs-menu-plugin': {requires:['aui-component','aui-state-interaction','aui-tabs-base','aui-overlay-context','plugin']}, 'aui-tabs-base': {requires:['aui-component','aui-state-interaction']} }, use:['aui-tabs-base','aui-tabs-menu-plugin'], skinnable:true},
						'aui-textboxlist': {requires:['anim-node-plugin','aui-autocomplete','node-focusmanager'], skinnable:true},
						'aui-toolbar': {requires:['aui-base','aui-button-item','aui-data-set','widget-parent'], skinnable:true},
						'aui-tooltip': {requires:['aui-overlay-context-panel'], skinnable:true},
						'aui-tree': {submodules: {'aui-tree-view': {requires:['aui-tree-node','dd-drag','dd-drop','dd-proxy'], skinnable:true}, 'aui-tree-node': {requires:['aui-tree-data','io-base','json','querystring-stringify'], skinnable:false}, 'aui-tree-data': {requires:['aui-base'], skinnable:false} }, use:['aui-tree-data', 'aui-tree-node', 'aui-tree-view'], skinnable:true},
						'aui-video': {requires:['aui-base','querystring-stringify-simple'], skinnable:true}
				}
		    }
		}
	}
})();
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
		A.Env._guidp = ['aui', A.version, A.Env._yidx].join('-').replace(/\./g, '-');
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

	DOCUMENT = 'document',
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
				if ((DOCUMENT in A.getWin().getDOM()) && !LString.contains(str, '<')) {
					return LString._unescapeEntitiesUsingDom(str);
				}
				else {
					// Fall back on pure XML entities
					return LString._unescapeXmlEntities(str);
				}
			}
			return str;
		},

		_unescapeEntitiesUsingDom: function(str) {
			var node = LString._unescapeNode, el = node.getDOM();

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

		_unescapeNode: A.Node.create('<a></a>')
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

}, '@VERSION@' ,{requires:['aui-node','aui-component','aui-delayed-task','aui-selector','event','oop'], skinnable:false});
