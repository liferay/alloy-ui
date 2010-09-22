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
						'aui-calendar': {skinnable:true, requires:['aui-base','widget-stdmod','datatype-date','widget-locale']},
						'aui-carousel': {skinnable:true, requires:['aui-base','anim']},
						'aui-char-counter': {skinnable:false, requires:['aui-base','aui-event-input']},
						'aui-chart': {skinnable:false, requires:['datasource','aui-swf','json']},
						'aui-color-picker': {skinnable:true, requires:['aui-overlay-context','dd-drag','slider','substitute','aui-button-item','aui-color','aui-form-base','aui-panel']},
						'aui-color': {skinnable:false},
						'aui-component': {skinnable:false, requires:['widget']},
						'aui-data-set': {skinnable:false, requires:['oop','collection','base']},
						'aui-datatype': {skinnable:false, requires:['aui-base']},
						'aui-datepicker': {submodules: {'aui-datepicker-select': {skinnable:true, requires:['aui-datepicker-base','aui-button-item']}, 'aui-datepicker-base': {skinnable:true, requires:['aui-calendar','aui-overlay-context']} }, skinnable:true, use:['aui-datepicker-base','aui-datepicker-select']},
						'aui-delayed-task': {skinnable:false},
						'aui-dialog': {skinnable:true, requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize']},
						'aui-drawing': {submodules: {'aui-drawing-fonts': {requires:['aui-drawing-base']}, 'aui-drawing-drag': {requires:['aui-drawing-base','event-gestures']}, 'aui-drawing-animate': {requires:['aui-drawing-base']}, 'aui-drawing-base': {requires:['aui-base','aui-color','substitute']} }, use:['aui-drawing-base', 'aui-drawing-animate', 'aui-drawing-drag', 'aui-drawing-fonts'], plugins:{'aui-drawing-vml': {condition: {trigger: 'aui-drawing-base',test: function(A){return A.UA.vml;}}},'aui-drawing-svg': {condition: {trigger: 'aui-drawing-base',test: function(A){return A.UA.svg;}}}, 'aui-drawing-safari': {condition: {trigger: 'aui-drawing-base',test: function(A){var UA = A.UA; return UA.safari && (UA.version.major < 4 || (UA.iphone || UA.ipad));}}}}, skinnable:false},
						'aui-editable': {skinnable:true, requires:['aui-base','aui-form-combobox']},
						'aui-event': {submodules: {'aui-event-input': {requires:['aui-base']} }, use:['aui-event-input'], skinnable:false},
						'aui-form': {submodules: {'aui-form-validator': {requires:['aui-base','aui-event-input','selector-css3','substitute']}, 'aui-form-textfield': {requires:['aui-form-field']}, 'aui-form-textarea': {skinnable:true, requires:['aui-form-textfield']}, 'aui-form-field': {requires:['aui-base','aui-component','substitute']}, 'aui-form-combobox': {skinnable:true, requires:['aui-form-textarea','aui-toolbar']}, 'aui-form-base': {requires:['aui-base','aui-data-set','aui-form-field','querystring-parse']} }, use:['aui-form-base','aui-form-combobox','aui-form-field','aui-form-textarea','aui-form-textfield','aui-form-validator'], skinnable:false},
						'aui-image-viewer': {submodules: {'aui-image-viewer-gallery': {skinnable:true, requires:['aui-image-viewer-base','aui-paginator','aui-toolbar']}, 'aui-image-viewer-base': {skinnable:true, requires:['anim','aui-overlay-mask','substitute']} }, use:['aui-image-viewer-base','aui-image-viewer-gallery'], skinnable:true},
						'aui-io': {submodules: {'aui-io-plugin': {requires:['aui-overlay-base','aui-parse-content','aui-io-request','aui-loading-mask']}, 'aui-io-request': {requires:['aui-base','io-base','json','plugin','querystring-stringify']} }, use:['aui-io-request','aui-io-plugin'], skinnable:false},
						'aui-live-search': {skinnable:false, requires:['aui-base']},
						'aui-loading-mask': {skinnable:true, requires:['aui-overlay-mask','plugin','substitute']},
						'aui-nested-list': {skinnable:false, requires:['aui-base','dd-drag','dd-drop','dd-proxy']},
						'aui-node': {submodules: {'aui-node-fx': {requires:['aui-base','anim','anim-node-plugin']}, 'aui-node-html5-print': {requires:['aui-node-html5']}, 'aui-node-html5': {requires:['collection','aui-base']}, 'aui-node-base': {requires:['aui-base']} }, use:['aui-node-base','aui-node-html5','aui-node-html5-print','aui-node-fx'], skinnable:false},
						'aui-overlay': {submodules: {'aui-overlay-mask': {skinnable:true, requires:['aui-base','aui-overlay-base','event-resize']}, 'aui-overlay-manager': {requires:['aui-base','aui-overlay-base','overlay','plugin']}, 'aui-overlay-context-panel': {skinnable:true, requires:['aui-overlay-context','anim']}, 'aui-overlay-context': {requires:['aui-overlay-manager','aui-delayed-task']}, 'aui-overlay-base': {requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']} }, use:['aui-overlay-base','aui-overlay-context','aui-overlay-context-panel','aui-overlay-manager','aui-overlay-mask'], skinnable:true},
						'aui-paginator': {skinnable:true, requires:['aui-base','substitute']},
						'aui-panel': {skinnable:true, requires:['aui-component','widget-stdmod','aui-toolbar']},
						'aui-parse-content': {skinnable:false, requires:['async-queue','aui-base','plugin']},
						'aui-portal-layout': {skinnable:true, requires:['aui-base','dd-drag','dd-delegate','dd-drop','dd-proxy']},
						'aui-progressbar': {skinnable:true, requires:['aui-base']},
						'aui-rating': {skinnable:true, requires:['aui-base']},
						'aui-resize': {submodules: {'aui-resize-constrain': {skinnable:false, requires:['aui-resize-base','dd-constrain','plugin']}, 'aui-resize-base': {skinnable:true, requires:['aui-base','dd-drag','dd-delegate','dd-drop','substitute']} }, use:['aui-resize-base','aui-resize-constrain'], skinnable:true},
						'aui-selector': {skinnable:false, requires:['selector']},
						'aui-skin-base': {type: 'css', path: 'aui-skin-base/css/aui-skin-base.css'},
						'aui-skin-classic-all': {type: 'css', path: 'aui-skin-classic/css/aui-skin-classic-all.css'},
						'aui-skin-classic': {type: 'css', path: 'aui-skin-classic/css/aui-skin-classic.css', requires:['aui-skin-base']},
						'aui-sortable': {skinnable:true, requires:['aui-base','dd-constrain','dd-drag','dd-drop','dd-proxy']},
						'aui-state-interaction': {skinnable:false, requires:['aui-base','plugin']},
						'aui-swf': {skinnable:false, requires:['aui-base','querystring-stringify-simple']},
						'aui-tabs': {submodules: {'aui-tabs-menu-plugin': {requires:['aui-component','aui-state-interaction','aui-tabs-base','aui-overlay-context','plugin']}, 'aui-tabs-base': {requires:['aui-component','aui-state-interaction']} }, use:['aui-tabs-base','aui-tabs-menu-plugin'], skinnable:true},
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

	try {
		ALLOY = A;
	}
	catch (e) {
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
A.mix(A.Array, {
	remove: function(a, from, to) {
	  var rest = a.slice((to || from) + 1 || a.length);
	  a.length = (from < 0) ? (a.length + from) : from;

	  return a.push.apply(a, rest);
	},

	removeItem: function(a, item) {
		var index = A.Array.indexOf(a, item);

		return A.Array.remove(a, index);
	}
});

var Lang = A.Lang;
var isArray = Lang.isArray;
var isFunction = Lang.isFunction;
var isString = Lang.isString;

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

		// Courtesy of: http://simonwillison.net/2006/Jan/20/escape/
		escapeRegEx: function(str) {
			return str.replace(/([.*+?^$(){}|[\]\/\\])/g, '\\$1');
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
