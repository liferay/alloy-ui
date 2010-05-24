;(function() {
	var PATH_BASE = YUI.config.base;
	var PATH_JAVASCRIPT = PATH_BASE;
	var PATH_THEME_ROOT = PATH_BASE + 'themes/base/css/';
	var PATH_THEME_IMAGES = PATH_THEME_ROOT + '../images/';

	YUI.AUI_config = {
		chart: {
			swfURL: 'assets/chart.swf'
		},

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
						'aui-autocomplete': {requires:['aui-base','aui-overlay-base','datasource','dataschema','aui-form-combobox'], skinnable:true},
						'aui-base': {requires:['aui-node','aui-component','aui-delayed-task','event','oop','widget-css'], skinnable:false},
						'aui-button-item': {requires:['aui-base','aui-state-interaction','widget-child'], skinnable:true},
						'aui-calendar': {submodules: {'aui-calendar-datepicker-select': {requires:['aui-calendar-base','aui-button-item'], skinnable:true}, 'aui-calendar-base': {requires:['aui-overlay-context','datatype-date','widget-locale'], skinnable:true} }, skinnable:true, use:['aui-calendar-base','aui-calendar-datepicker-select']},
						'aui-carousel': {requires:['aui-base','anim'], skinnable:true},
						'aui-char-counter': {requires:['aui-base','aui-event-input'], skinnable:false},
						'aui-chart': {requires:['datasource','aui-swf','json'], skinnable:false},
						'aui-color-picker': {requires:['aui-overlay-context','dd','slider','substitute','aui-button-item','aui-form','aui-panel'], skinnable:true},
						'aui-component': {requires:['widget'], skinnable:false},
						'aui-data-set': {requires:['oop','collection','base'], skinnable:false},
						'aui-datatype': {requires:['aui-base'], skinnable:false},
						'aui-delayed-task': {skinnable:false},
						'aui-dialog': {requires:['aui-panel','dd-constrain','aui-button-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize'], skinnable:true},
						'aui-editable': {requires:['aui-base','aui-form-combobox'], skinnable:true},
						'aui-event': {submodules: {'aui-event-input': {requires:['aui-base']} }, skinnable:false, use:['aui-event-input']},
						'aui-form': {submodules: {'aui-form-validator': {requires:['aui-base','aui-event-input','selector-css3','substitute']}, 'aui-form-textfield': {requires:['aui-form-field']}, 'aui-form-textarea': {requires:['aui-form-textfield'], skinnable:true}, 'aui-form-field': {requires:['aui-base','aui-component','substitute']}, 'aui-form-combobox': {requires:['aui-form-textarea','aui-toolbar'], skinnable:true}, 'aui-form-base': {requires:['aui-base','aui-data-set','aui-form-field','querystring-parse']} }, skinnable:false, use:['aui-form-base','aui-form-combobox','aui-form-field','aui-form-textarea','aui-form-textfield','aui-form-validator']},
						'aui-image-viewer': {submodules: {'aui-image-viewer-gallery': {requires:['aui-image-viewer-base','aui-paginator','aui-toolbar'], skinnable:true}, 'aui-image-viewer-base': {requires:['anim','aui-overlay-mask','substitute'], skinnable:true} }, skinnable:true, use:['aui-image-viewer-base','aui-image-viewer-gallery']},
						'aui-io': {submodules: {'aui-io-plugin': {requires:['aui-overlay-base','aui-parse-content','aui-io-request','aui-loading-mask']}, 'aui-io-request': {requires:['aui-base','io','json','plugin','querystring-stringify']} }, skinnable:false, use:['aui-io-request','aui-io-plugin']},
						'aui-live-search': {requires:['aui-base'], skinnable:false},
						'aui-loading-mask': {requires:['aui-overlay-mask','plugin','substitute'], skinnable:true},
						'aui-nested-list': {requires:['aui-base','dd'], skinnable:false},
						'aui-node': {submodules: {'aui-node-fx': {requires:['aui-base','anim','anim-node-plugin']}, 'aui-node-html5-print': {requires:['aui-node-html5']}, 'aui-node-html5': {requires:['collection','aui-base']}, 'aui-node-base': {requires:['aui-base']} }, skinnable:false, use:['aui-node-base','aui-node-html5','aui-node-html5-print','aui-node-fx']},
						'aui-overlay': {submodules: {'aui-overlay-mask': {requires:['aui-base','aui-overlay-base','event-resize'], skinnable:true}, 'aui-overlay-manager': {requires:['aui-base','aui-overlay-base','overlay','plugin']}, 'aui-overlay-context-panel': {requires:['aui-overlay-context','anim'], skinnable:true}, 'aui-overlay-context': {requires:['aui-overlay-manager','aui-delayed-task']}, 'aui-overlay-base': {requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-position-constrain','widget-stdmod']} }, skinnable:true, use:['aui-overlay-base','aui-overlay-context','aui-overlay-context-panel','aui-overlay-manager','aui-overlay-mask']},
						'aui-paginator': {requires:['aui-base','substitute'], skinnable:true},
						'aui-panel': {requires:['aui-component','widget-stdmod','aui-toolbar'], skinnable:true},
						'aui-parse-content': {requires:['async-queue','aui-base','io','plugin'], skinnable:false},
						'aui-portal-layout': {requires:['aui-base','dd'], skinnable:true},
						'aui-progressbar': {requires:['aui-base'], skinnable:true},
						'aui-rating': {requires:['aui-base'], skinnable:true},
						'aui-resize': {requires:['aui-base','dd','substitute'], skinnable:true},
						'aui-skin-base': {type: 'css', path: 'aui-skin-base/css/aui-skin-base.css'},
						'aui-skin-classic-all': {type: 'css', path: 'aui-skin-classic/css/aui-skin-classic-all.css'},
						'aui-skin-classic': {after: ['aui-skin-base'], type: 'css', path: 'aui-skin-classic/css/aui-skin-classic.css'},
						'aui-sortable': {skinnable:true, requires:['aui-base','dd']},
						'aui-state-interaction': {skinnable:false, requires:['aui-base','plugin']},
						'aui-swf': {skinnable:false, requires:['aui-base','querystring-stringify-simple']},
						'aui-tabs': {skinnable:true, requires:['aui-component','aui-state-interaction']},
						'aui-textboxlist': {skinnable:true, requires:['anim-node-plugin','aui-autocomplete','node-focusmanager']},
						'aui-toolbar': {skinnable:true, requires:['aui-base','aui-button-item','aui-data-set','widget-parent']},
						'aui-tooltip': {skinnable:true, requires:['aui-overlay-context-panel']},
						'aui-tree': {submodules: {'aui-tree-view': {skinnable:true, requires:['aui-tree-node','dd']}, 'aui-tree-node': {skinnable:false, requires:['aui-tree-data','io','json','querystring-stringify']}, 'aui-tree-data': {skinnable:false, requires:['aui-base']} }, skinnable:true, use:['aui-tree-data', 'aui-tree-node', 'aui-tree-view']}
				}
		    }
		},

		paths: {
			images: PATH_THEME_IMAGES
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

	var ALLOY = YUI(defaults);

	ALLOY.Env._guidp = ['aui', ALLOY.version, ALLOY.Env._yidx].join('-').replace(/\./g, '-');

	var originalConfig = ALLOY.config;

	ALLOY.config = ALLOY.merge(originalConfig, YUI.AUI_config);

	YUI.AUI = function(o) {
		var instance = this;

		if (o || instance instanceof AUI) {
			return YUI(ALLOY.merge(ALLOY.config, o));
		}

		return ALLOY;
	};

	var AUI = YUI.AUI;

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

	var p = navigator.platform;
	var u = navigator.userAgent;
	var b = /(Firefox|Opera|Safari|KDE|iCab|Flock|IE)/.exec(u);
	var os = /(Win|Mac|Linux|iPhone|Sun|Solaris)/.exec(p);
	var versionDefaults = [0,0];

	b = (!b || !b.length) ? (/(Mozilla)/.exec(u) || ['']) : b;
	os = (!os || !os.length) ? [''] : os;

	UA = ALLOY.merge(
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
			safari: /Safari/.test(u),
			browser: b[0].toLowerCase(),

			win: /Win/.test(p),
			mac: /Mac/.test(p),
			linux: /Linux/.test(p),
			iphone: /iPhone/.test(p),
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

	ALLOY.UA = UA;

	/*
	* Browser selectors
	*/

	var selectors = [
		UA.renderer,
		UA.browser,
		UA.browser + UA.version.major,
		UA.os,
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

	document.getElementsByTagName('html')[0].className += ' ' + UA.selectors;
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

A.mix(
	A.Object,
	{
		isEmpty: function(o) {
			for (var name in o) {
				return false;
			}

			return true;
		}
	}
);

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

}, '@VERSION@' ,{requires:['aui-node','aui-component','aui-delayed-task','event','oop','widget-css'], skinnable:false});
