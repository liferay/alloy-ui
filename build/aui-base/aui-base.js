;(function() {
	YUI.AUI_config = {
		filter: 'raw',

		io: {
			method: 'GET'
		},

        combine: false,

		groups: {
            alloy: {
				combine: false,
                modules: {
						'aui-aria': {requires:['aui-base','plugin'], skinnable:false},
						'aui-autocomplete': {skinnable:true, requires:['aui-base','aui-overlay-base','datasource','dataschema','aui-form-combobox']},
						'aui-base': {skinnable:false, requires:['aui-node','aui-component','aui-debounce','aui-delayed-task','aui-selector','aui-event-base','oop']},
						'aui-button-item': {skinnable:true, requires:['aui-base','aui-state-interaction','widget-child']},
						'aui-calendar': {skinnable:true, requires:['aui-base','aui-datatype','widget-stdmod','datatype-date','widget-locale']},
						'aui-carousel': {skinnable:true, requires:['aui-base','anim']},
						'aui-char-counter': {skinnable:false, requires:['aui-base','aui-event-input']},
						'aui-chart': {skinnable:false, requires:['datasource','aui-swf','json']},
						'aui-classnamemanager': {skinnable:false, requires:['classnamemanager'], condition: {trigger: 'classnamemanager', test: function(){return true;}}},
						'aui-color-picker': {submodules: {'aui-color-picker-grid-plugin': {skinnable:true, requires:['aui-color-picker','plugin']}, 'aui-color-picker-base': {skinnable:true, requires:['aui-overlay-context','dd-drag','slider','substitute','aui-button-item','aui-color-util','aui-form-base','aui-panel']} }, use:['aui-color-picker-base','aui-color-picker-grid-plugin'], skinnable:true},
						'aui-color-util': {skinnable:false},
						'aui-component': {skinnable:false, requires:['widget','aui-classnamemanager']},
						'aui-data-browser': {skinnable:true, requires:['aui-base','aui-datasource-control-base','aui-input-text-control','aui-tree','aui-panel']},
						'aui-data-set': {skinnable:false, requires:['oop','collection','base']},
						'aui-datasource-control': {submodules: {'aui-input-text-control': {requires:['aui-base','aui-datasource-control-base','aui-form-combobox']}, 'aui-datasource-control-base': {requires:['aui-base','datasource','dataschema']} }, use:['aui-datasource-control-base','aui-input-text-control'], skinnable:true},
						'aui-datatable': {submodules: {'aui-datatable-edit': {skinnable:true, requires:['aui-calendar','aui-datatable-events','aui-toolbar','aui-form-validator','overlay']}, 'aui-datatable-events': {requires:['aui-datatable-base']}, 'aui-datatable-base': {requires:['aui-base','datatable','plugin']} }, use:['aui-datatable-base','aui-datatable-events','aui-datatable-edit'], skinnable:false},
						'aui-datatype': {skinnable:false, requires:['aui-base']},
						'aui-datepicker': {submodules: {'aui-datepicker-select': {skinnable:true, requires:['aui-datepicker-base','aui-button-item']}, 'aui-datepicker-base': {skinnable:true, requires:['aui-calendar','aui-overlay-context']} }, use:['aui-datepicker-base','aui-datepicker-select'], skinnable:true},
						'aui-debounce': {skinnable:false},
						'aui-delayed-task': {skinnable:false},
						'aui-dialog-iframe': {skinnable:true, requires:['aui-base','aui-loading-mask','aui-resize-iframe','plugin']},
						'aui-dialog': {skinnable:true, requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize']},
						'aui-drawing': {submodules: {'aui-drawing-fonts': {requires:['aui-drawing-base']}, 'aui-drawing-drag': {requires:['aui-drawing-base','event-gestures']}, 'aui-drawing-animate': {requires:['aui-drawing-base']}, 'aui-drawing-base': {requires:['aui-base','aui-color-util','substitute']} }, use:['aui-drawing-base', 'aui-drawing-animate', 'aui-drawing-drag', 'aui-drawing-fonts'], skinnable:false, plugins:{'aui-drawing-vml': {condition: {trigger: 'aui-drawing-base',test: function(A){return A.UA.vml;}}},'aui-drawing-svg': {condition: {trigger: 'aui-drawing-base',test: function(A){return A.UA.svg;}}}, 'aui-drawing-safari': {condition: {trigger: 'aui-drawing-base',test: function(A){var UA = A.UA; return UA.safari && (UA.version.major < 4 || (UA.iphone || UA.ipad));}}}}},
						'aui-editable': {skinnable:true, requires:['aui-base','aui-form-combobox']},
						'aui-editor': {submodules: {'aui-editor-creole-plugin': {requires:['aui-base','editor-base','aui-editor-html-creole','aui-editor-creole-parser']}, 'aui-editor-creole-parser': {requires:['aui-base']}, 'aui-editor-bbcode-plugin': {requires:['aui-base','editor-base']}, 'aui-editor-toolbar-plugin': {requires:['aui-base','aui-button-item','aui-color-picker','aui-editor-menu-plugin','aui-editor-tools-plugin','aui-form-select','aui-overlay-context-panel','aui-panel','aui-toolbar','createlink-base','editor-lists','editor-base','plugin']}, 'aui-editor-menu-plugin': {requires:['aui-base','editor-base','aui-overlay-context','aui-panel','aui-editor-tools-plugin']}, 'aui-editor-tools-plugin': {requires:['aui-base','editor-base']}, 'aui-editor-base': {requires:['aui-base','editor-base','aui-editor-toolbar-plugin']} }, use:['aui-editor-base','aui-editor-tools-plugin','aui-editor-menu-plugin','aui-editor-toolbar-plugin','aui-editor-bbcode-plugin','aui-editor-creole-parser','aui-editor-creole-plugin'], skinnable:true},
						'aui-event': {submodules: {'aui-event-input': {requires:['aui-base']}, 'aui-event-base': {requires:['event']} }, use:['aui-event-base','aui-event-input'], skinnable:false},
						'aui-form-builder': {submodules: {'aui-form-builder-field': {skinnable:true, requires:['aui-datatype','aui-form','aui-panel','io','substitute']}, 'aui-form-builder-base': {skinnable:true, requires:['aui-base','aui-button-item','aui-nested-list','aui-tabs','substitute']} }, use:['aui-form-builder-base','aui-form-builder-field'], skinnable:true},
						'aui-form': {submodules: {'aui-form-validator': {requires:['aui-base','aui-event-input','selector-css3','substitute']}, 'aui-form-textfield': {requires:['aui-form-field']}, 'aui-form-textarea': {skinnable:true, requires:['aui-form-textfield']}, 'aui-form-select': {requires:['aui-form-field']}, 'aui-form-field': {requires:['aui-base','aui-component','substitute']}, 'aui-form-combobox': {skinnable:true, requires:['aui-form-textarea','aui-toolbar']}, 'aui-form-base': {requires:['aui-base','aui-data-set','aui-form-field','querystring-parse']} }, use:['aui-form-base','aui-form-combobox','aui-form-field','aui-form-select','aui-form-textarea','aui-form-textfield','aui-form-validator'], skinnable:false},
						'aui-image-viewer': {submodules: {'aui-image-viewer-gallery': {skinnable:true, requires:['aui-image-viewer-base','aui-paginator','aui-toolbar']}, 'aui-image-viewer-base': {skinnable:true, requires:['anim','aui-overlay-mask','substitute']} }, use:['aui-image-viewer-base','aui-image-viewer-gallery'], skinnable:true},
						'aui-io': {submodules: {'aui-io-plugin': {requires:['aui-overlay-base','aui-parse-content','aui-io-request','aui-loading-mask']}, 'aui-io-request': {requires:['aui-base','io-base','json','plugin','querystring-stringify']} }, use:['aui-io-request','aui-io-plugin'], skinnable:false},
						'aui-live-search': {skinnable:false, requires:['aui-base']},
						'aui-loading-mask': {skinnable:true, requires:['aui-overlay-mask','plugin','substitute']},
						'aui-nested-list': {skinnable:false, requires:['aui-base','dd-drag','dd-drop','dd-proxy']},
						'aui-node': {submodules: {'aui-node-html5-print': {requires:['aui-node-html5']}, 'aui-node-html5': {requires:['collection','aui-base']}, 'aui-node-base': {requires:['node','aui-classnamemanager']} }, use:['aui-node-base','aui-node-html5','aui-node-html5-print'], skinnable:false},
						'aui-overlay': {submodules: {'aui-overlay-mask': {skinnable:true, requires:['aui-base','aui-overlay-base','event-resize']}, 'aui-overlay-manager': {requires:['aui-base','aui-overlay-base','overlay','plugin']}, 'aui-overlay-context-panel': {skinnable:true, requires:['aui-overlay-context','anim']}, 'aui-overlay-context': {requires:['aui-overlay-manager','aui-delayed-task','aui-aria']}, 'aui-overlay-base': {requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']} }, use:['aui-overlay-base','aui-overlay-context','aui-overlay-context-panel','aui-overlay-manager','aui-overlay-mask'], skinnable:true},
						'aui-paginator': {skinnable:true, requires:['aui-base','substitute']},
						'aui-panel': {skinnable:true, requires:['aui-component','widget-stdmod','aui-toolbar','aui-aria']},
						'aui-parse-content': {skinnable:false, requires:['async-queue','aui-base','plugin']},
						'aui-portal-layout': {skinnable:true, requires:['aui-base','dd-drag','dd-delegate','dd-drop','dd-proxy']},
						'aui-progressbar': {skinnable:true, requires:['aui-base','aui-aria']},
						'aui-rating': {skinnable:true, requires:['aui-base']},
						'aui-resize-iframe': {skinnable:true, requires:['aui-base','aui-task-manager','plugin']},
						'aui-resize': {submodules: {'aui-resize-constrain': {skinnable:false, requires:['aui-resize-base','dd-constrain','plugin']}, 'aui-resize-base': {skinnable:true, requires:['aui-base','dd-drag','dd-delegate','dd-drop','substitute']} }, use:['aui-resize-base','aui-resize-constrain'], skinnable:true},
						'aui-scheduler': {submodules: {'aui-scheduler-calendar': {skinnable:true, requires:['aui-scheduler-event']}, 'aui-scheduler-event': {skinnable:true, requires:['aui-base','aui-color-util','aui-datatype','aui-overlay-context-panel','substitute']}, 'aui-scheduler-view': {skinnable:true, requires:['aui-scheduler-event','aui-calendar','aui-button-item','substitute','dd-drag','dd-delegate','dd-drop','dd-constrain']}, 'aui-scheduler-base': {skinnable:true, requires:['aui-scheduler-view','datasource']} }, use:['aui-scheduler-base','aui-scheduler-view','aui-scheduler-event','aui-scheduler-calendar'], skinnable:true},
						'aui-scroller': {skinnable:true, requires:['aui-base','aui-simple-anim']},
						'aui-selector': {skinnable:false, requires:['selector']},
						'aui-simple-anim': {skinnable:false, requires:['aui-base']},
						'aui-skin-base': {type: 'css', path: 'aui-skin-base/css/aui-skin-base.css'},
						'aui-skin-classic-all': {type: 'css', path: 'aui-skin-classic/css/aui-skin-classic-all.css'},
						'aui-skin-classic': {requires:['aui-skin-base'], path: 'aui-skin-classic/css/aui-skin-classic.css', type: 'css'},
						'aui-sortable': {skinnable:true, requires:['aui-base','dd-constrain','dd-drag','dd-drop','dd-proxy']},
						'aui-state-interaction': {skinnable:false, requires:['aui-base','plugin']},
						'aui-swf': {skinnable:false, requires:['aui-base','querystring-stringify-simple']},
						'aui-tabs': {submodules: {'aui-tabs-menu-plugin': {requires:['aui-component','aui-state-interaction','aui-tabs-base','aui-overlay-context','plugin']}, 'aui-tabs-base': {requires:['aui-component','aui-state-interaction']} }, use:['aui-tabs-base','aui-tabs-menu-plugin'], skinnable:true},
						'aui-task-manager': {skinnable:false, requires:['aui-base']},
						'aui-textboxlist': {skinnable:true, requires:['anim-node-plugin','aui-autocomplete','node-focusmanager']},
						'aui-toolbar': {skinnable:true, requires:['aui-base','aui-button-item','aui-data-set','widget-parent']},
						'aui-tooltip': {skinnable:true, requires:['aui-overlay-context-panel']},
						'aui-tree': {submodules: {'aui-tree-view': {skinnable:true, requires:['aui-tree-node','dd-drag','dd-drop','dd-proxy']}, 'aui-tree-node': {skinnable:false, requires:['aui-tree-data','io-base','json','querystring-stringify']}, 'aui-tree-data': {skinnable:false, requires:['aui-base']} }, use:['aui-tree-data', 'aui-tree-node', 'aui-tree-view'], skinnable:true},
						'aui-video': {skinnable:true, requires:['aui-base','querystring-stringify-simple']}
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

	(function() {
		var REGEX_VERSION_DOT = /\./g;

		var parseVersionNumber = function(str) {
			var count = 0;

			return parseFloat(
				str.replace(
					REGEX_VERSION_DOT,
					function() {
						return (count++ == 1) ? '' : '.';
					}
				)
			);
		};

		var DEFAULTS_VERSION = ['0','0'];

		var getVersion = function(regex, userAgent) {
			var version = (userAgent.match(regex) || DEFAULTS_VERSION)[1];

			return parseVersionNumber(version);
		};

		var MAP_OS_SELECTORS = {
			windows: 'win',
			macintosh: 'mac'
		};

		var BROWSERS = [
			'ie',
			'opera',
			'chrome',
			'aol',
			'camino',
			'firefox',
			'flock',
			'mozilla',
			'netscape',
			'icab',
			'konqueror',
			'safari'
		];

		AUI._uaExtensions = function(A) {
			var nav = navigator;

			var userAgent = nav.userAgent;

			var UA = A.UA;
			var OS = UA.os;

			var UAX = {
				aol: 0,

				camino: 0,
				firefox: 0,
				flock: 0,
				mozilla: 0,
				netscape: 0,

				icab: 0,
				konqueror: 0,

				safari: 0,

				browser: 0,

				win: OS == 'windows',
				mac: OS == 'macintosh',
				rhino: OS == 'rhino',

				agent: userAgent
			};

			if (UA.ie) {
				UAX.aol = getVersion(/America Online Browser ([^\s]*);/, userAgent);
			}
			else if (UA.gecko) {
				UAX.netscape = getVersion(/(Netscape|Navigator)\/([^\s]*)/, userAgent);
				UAX.flock = getVersion(/Flock\/([^\s]*)/, userAgent);
				UAX.camino = getVersion(/Camino\/([^\s]*)/, userAgent);
				UAX.firefox = getVersion(/Firefox\/([^\s]*)/, userAgent);
			}
			else if (UA.webkit) {
				UAX.safari = getVersion(/Version\/([^\s]*) Safari/, userAgent);
			}
			else {
				UAX.icab = getVersion(/iCab(?:\/|\s)?([^\s]*)/, userAgent);
				UAX.konqueror = getVersion(/Konqueror\/([^\s]*)/, userAgent);
			}

			if (!UAX.win && !UAX.mac) {
				var linux = /Linux/.test(userAgent);
				var sun = /Solaris|SunOS/.test(userAgent);

				if (linux) {
					UA.os = 'linux';
					UAX.linux = linux;
				}
				else if (sun) {
					UA.os = 'sun';
					UAX.sun = sun;
				}
			}

			var CONFIG = A.config,
				DOC = CONFIG.doc;

			UAX.touch = ('ontouchstart' in DOC);

			A.mix(UA, UAX);

			var browserList = [];
			var versionMajor = 0;

			var browser;
			var version;
			var uaVersionMajor;
			var uaVersionMinor;

			var versionObj = {
				string: '',
				major: versionMajor
			};

			var i = BROWSERS.length;

			while (i--) {
				browser = BROWSERS[i];
				version = UA[browser];

				if (version > 0) {
					versionMajor = parseInt(version, 10);
					uaVersionMajor = browser + versionMajor;

					uaVersionMinor = (browser + version);

					if (String(version).indexOf('.') > -1) {
						uaVersionMinor = uaVersionMinor.replace(/\.(\d).*/, '-$1');
					}
					else {
						uaVersionMinor += '-0';
					}

					browserList.push(browser, uaVersionMajor, uaVersionMinor);

					versionObj.string = browser + '';
					versionObj.major = versionMajor;
				}
			}

			UA.version = versionObj;

			UA.renderer = '';

			var documentElement = DOC.documentElement;

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
				UA.dir,
				'js'
			].concat(browserList);

			var osSelector = MAP_OS_SELECTORS[UA.os] || UA.os;

			selectors.push(osSelector);

			if (UA.mobile) {
				selectors.push('mobile');
			}

			if (UA.secure) {
				selectors.push('secure');
			}

			if (UA.touch) {
				selectors.push('touch');
			}

			UA.selectors = selectors.join(' ');

			// The methods in this if block only run once across all instances
			if (!documentElement._yuid) {
				documentElement.className += ' ' + UA.selectors;

				var vml,
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
	})();

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
		}
	}
);

}, '@VERSION@' ,{requires:['aui-node','aui-component','aui-debounce','aui-delayed-task','aui-selector','aui-event-base','oop'], skinnable:false});
