;(function() {
	var PATH_BASE = YUI.config.base;
	var PATH_JAVASCRIPT = PATH_BASE;
	var PATH_THEME_ROOT = PATH_BASE + 'themes/base/css/';
	var PATH_THEME_IMAGES = PATH_THEME_ROOT + '../images/';

	window.AUI = {
		defaults: {
			chart: {
				swfURL: 'assets/chart.swf'
			},

			classNamePrefix: 'aui',

			filter: 'raw',

			io: {
				method: 'GET'
			},

			modules: {
				'aui-autocomplete': {skinnable:true, requires:['aui-base','aui-component-overlay','datasource','dataschema','aui-combobox']},
				'aui-base': {requires:['aui-node','aui-component','aui-delayed-task','event','oop','widget-css'], skinnable:false},
				'aui-calendar': {requires:['aui-context-overlay','datatype-date','widget-i18n'], skinnable:true},
				'aui-char-counter': {requires:['aui-base','aui-input-handler'], skinnable:false},
				'aui-chart': {requires:['datasource','aui-swf','json'], skinnable:false},
				'aui-color-picker': {requires:['aui-context-overlay','dd','slider','substitute','aui-tool-item','aui-form','aui-panel'], skinnable:true},
				'aui-combobox': {requires:['aui-textarea','aui-tool-set'], skinnable:true},
				'aui-component-overlay': {requires:['aui-component','widget-position','widget-stack','widget-position-align','widget-stdmod'], skinnable:false},
				'aui-component': {requires:['widget'], skinnable:false},
				'aui-context-overlay': {requires:['aui-overlay-manager','aui-delayed-task'], skinnable:false},
				'aui-context-panel': {requires:['aui-context-overlay','anim'], skinnable:true},
				'aui-data-set': {requires:['oop','collection','base'], skinnable:false},
				'aui-datatype': {requires:['aui-base'], skinnable:false},
				'aui-date-picker-select': {requires:['aui-calendar','aui-tool-item'], skinnable:true},
				'aui-delayed-task': {skinnable:false},
				'aui-dialog': {requires:['aui-panel','dd-constrain','aui-tool-item','aui-overlay-manager','aui-overlay-mask','aui-io-plugin','aui-resize'], skinnable:true},
				'aui-editable': {requires:['aui-base','aui-combobox'], skinnable:true},
				'aui-field': {requires:['aui-base','aui-component','substitute'], skinnable:false},
				'aui-fieldset': {requires:['aui-panel'], skinnable:false},
				'aui-form-manager': {requires:['aui-base','substitute'], skinnable:false},
				'aui-form': {requires:['aui-base','aui-data-set','io-form','aui-field','querystring-parse'], skinnable:false},
				'aui-image-gallery': {requires:['aui-image-viewer','aui-paginator','aui-tool-set'], skinnable:true},
				'aui-image-viewer': {requires:['anim','aui-overlay-mask','substitute'], skinnable:true},
				'aui-input-handler': {skinnable:false},
				'aui-io-plugin': {requires:['aui-component-overlay','aui-parse-content','aui-io-request','aui-loading-mask'], skinnable:false},
				'aui-io-request': {requires:['aui-base','io','json','plugin'], skinnable:false},
				'aui-live-search': {requires:['aui-base'], skinnable:false},
				'aui-loading-mask': {requires:['aui-overlay-mask','plugin','substitute'], skinnable:true},
				'aui-nested-list': {requires:['aui-base','dd'], skinnable:false},
				'aui-node': {requires:['collection','node'], skinnable:false},
				'aui-overlay-manager': {requires:['aui-base','aui-component-overlay','overlay','plugin'], skinnable:false},
				'aui-overlay-mask': {requires:['aui-base','aui-component-overlay','event-resize'], skinnable:true},
				'aui-paginator': {requires:['aui-base','substitute'], skinnable:true},
				'aui-panel': {requires:['aui-component','widget-stdmod','aui-tool-set'], skinnable:true},
				'aui-parse-content': {requires:['async-queue','aui-base','io','plugin'], skinnable:false},
				'aui-portal-layout': {requires:['aui-base','dd'], skinnable:true},
				'aui-rating': {requires:['aui-base'], skinnable:true},
				'aui-resize': {requires:['aui-base','dd','substitute'], skinnable:true},
				'aui-sortable': {requires:['aui-base','dd'], skinnable:true},
				'aui-state-interaction': {requires:['aui-base','plugin'], skinnable:false},
				'aui-swf': {requires:['aui-base','querystring-stringify-simple'], skinnable:false},
				'aui-tabs': {requires:['aui-component','aui-state-interaction'], skinnable:true},
				'aui-textarea': {requires:['aui-textfield'], skinnable:true},
				'aui-textboxlist': {requires:['anim-node-plugin','aui-autocomplete','node-focusmanager'], skinnable:true},
				'aui-textfield': {requires:['aui-field'], skinnable:false},
				'aui-tool-item': {requires:['aui-base','aui-state-interaction'], skinnable:true},
				'aui-tool-set': {requires:['aui-data-set','aui-tool-item'], skinnable:true},
				'aui-tooltip': {requires:['aui-context-panel'], skinnable:true},
				'aui-tree': {submodules: {'aui-tree-view': {requires:['aui-tree-node','dd'], skinnable:true}, 'aui-tree-node': {requires:['aui-tree-data','io','json'], skinnable:false}, 'aui-tree-data': {requires:['aui-base'], skinnable:false} }, use:['aui-tree-data', 'aui-tree-node', 'aui-tree-view'], skinnable:true}
			},

			paths: {
				images: PATH_THEME_IMAGES
			}
		}
	}
})();
;(function() {

	var toString = Object.prototype.toString;

	var isFunction = function(obj) {
		return toString.call(obj) === "[object Function]";
	};

	// Based on jQuery.extend
	var apply = function() {
		var target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false,
			options;

		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}

		if (typeof target !== 'object' && !isFunction(target)) {
			target = {};
		}

		if (length == i) {
			target = this;
			--i;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (var name in options) {
					var src = target[name],
						copy = options[name];

					if (target === copy) {
						continue;
					}

					if (deep && copy && typeof copy === 'object' && !copy.nodeType) {
						target[name] = apply(
							deep,
							src || (copy.length != null ? [] : {}),
							copy
						);
					}

					else if (copy !== undefined) {
						target[name] = copy;
					}

				}
			}
		}

		return target;
	};

	/*
	 * Alloy JavaScript Library v@VERSION@
	 * http://alloyui.com/
	 *
	 * Copyright (c) 2009 Liferay Inc.
	 * Licensed under the MIT license.
	 * http://alloyui.com/License
	 *
	 * Eduardo Lundgren (eduardo.lundgren@liferay.com)
	 * Nate Cavanaugh (nate.cavanaugh@liferay.com)
	 *
	 * Date: @DATE@
	 * Revision: @REVISION@
	 */

	window.AUI = window.AUI || {};

	var defaults = AUI.defaults || {};

	apply(
		YUI.prototype,
		{
			apply: apply,
			ready: function() {
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
			}
		}
	);

	var ALLOY = YUI(apply({}, defaults));

	ALLOY.Env._guidp = ['aui', ALLOY.version, ALLOY.Env._yidx, new Date().getTime()].join('-').replace(/\./g, '-');

	var originalConfig = ALLOY.config;

	ALLOY.config = ALLOY.merge(originalConfig, AUI.defaults);

	AUI = function(o) {
		var instance = this;

		if (o || instance instanceof AUI) {
			return YUI(ALLOY.merge(ALLOY.config, o));
		}

		return ALLOY;
	};

	apply(
		AUI,
		YUI,
		{
			__version: '@VERSION',

			apply: apply,

			defaults: defaults,

			setDefaults: function(defaults) {
				var instance = this;

				ALLOY.config = ALLOY.merge(AUI.defaults, defaults);
			}
		}
	);

	/*
		UA extensions
	*/

	var UA = ALLOY.UA;

	var p = navigator.platform;
	var u = navigator.userAgent;
	var b = /(Firefox|Opera|Safari|KDE|iCab|Flock|IE)/.exec(u);
	var os = /(Win|Mac|Linux|iPhone|Sun|Solaris)/.exec(p);
	var versionDefaults = [0,0];

	b = (!b || !b.length) ? (/(Mozilla)/.exec(u) || ['']) : b;
	os = (!os || !os.length) ? [''] : os;

	apply(
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

	/*
		Browser selectors
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
	A.Lang,
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
		}
	}
);

}, '@VERSION@' ,{requires:['aui-node','aui-component','aui-delayed-task','event','oop','widget-css'], skinnable:false});
