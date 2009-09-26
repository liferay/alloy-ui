;(function() {

	// Based on jQuery.extend
	var extend = function() {
		// copy reference to target object
		var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, toString = Object.prototype.toString;

		var isFunction = function( obj ) {
			return toString.call(obj) === "[object Function]";
		};

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !isFunction(target) ) {
			target = {};
		}

		// extend Object itself if only one argument is passed
		if ( length == i ) {
			target = this;
			--i;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( var name in options ) {
					var src = target[ name ], copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging object values
					if ( deep && copy && typeof copy === "object" && !copy.nodeType ) {
						target[ name ] = extend( deep,
							// Never move original objects, clone them
							src || ( copy.length != null ? [ ] : { } )
						, copy );
					}
					// Don't bring in undefined values
					else if ( copy !== undefined ) {
						target[ name ] = copy;
					}

				}
			}
		}

		// Return the modified object
		return target;
	};

	/*
	 * Alloy JavaScript Library v@VERSION
	 * http://alloyui.com/
	 *
	 * Copyright (c) 2009 Liferay Inc.
	 * Licensed under the MIT license.
	 * http://alloyui.com/License
	 *
	 * Nate Cavanaugh (nate.cavanaugh@liferay.com)
	 * Eduardo Lundgren (eduardo.lundgren@liferay.com)
	 *
	 * Date: @DATE
	 * Revision: @REVISION
	 */

	window.AUI = window.AUI || {};

	var defaults = AUI.defaults || {};
	var defaultModules = defaults.defaultModules || [];

	// extending YUI prototype
	extend(YUI.prototype, {
		ready: function() {
			var instance = this;

			var slice = Array.prototype.slice;
			var args = slice.call(arguments, 0), index = args.length - 1;

			// user callback
			var fn = args[index];

			// array with YUI modules to be loaded
			var modules = slice.call(arguments, 0, index);

			modules.push('event');

			// adding AUI().use() callback
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
		},

		toQueryString: function(obj) {
			var instance = this;

			var Lang = instance.Lang;
			var isArray = Lang.isArray;
			var isFunction = Lang.isFunction;

			var buffer = [];
			var isNodeList = false;

			if (isArray(obj) || (isNodeList = (instance.NodeList && (obj instanceof instance.NodeList)))) {
				if (isNodeList) {
					obj = instance.NodeList.getDOMNodes(obj);
				}

				var length = obj.length;

				for (var i=0; i < length; i++) {
					var el = obj[i];

					buffer.push(encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value));
				}
			}
			else {
				for (var i in obj){
					var value = obj[i];

					if (isArray(value)) {
						var vlength = value.length;

						for (var j = 0; j < vlength; j++) {
							buffer.push(encodeURIComponent(i) + '=' + encodeURIComponent(value[j]));
						}
					}
					else {
						if (isFunction(value)) {
							value = value();
						}

						buffer.push(encodeURIComponent(i) + '=' + encodeURIComponent(value));
					}
				}
			}

			return buffer.join('&').replace(/%20/g, '+');
		}
	});

	var ALLOY = YUI( extend({}, defaults) );

	var originalConfig = ALLOY.config;

	// adding callback for .use()
	defaultModules.push(
		function(A, result) {
			if (!result.success) {
				throw result.msg;
			}
		}
	);

	// loading default modules
	ALLOY.use.apply(ALLOY, defaultModules);

	AUI = function(o) {
		var instance = this;

		ALLOY.config = ALLOY.merge(originalConfig, AUI.defaults);

		if (o || instance instanceof AUI) {
			// new AUI() creates a new YUI sandbox
			return YUI( ALLOY.merge(ALLOY.config, o) );
		}

		// returns the cached YUI sandbox
		return ALLOY;
	};

	extend(
		AUI,
		YUI,
		{
			__version: '@VERSION',

			extend: extend,

			defaults: defaults
		}
	);

	/*
	* AUI support constants
	*/
	AUI.support = {
		scriptEval: false
	};

	var checkScriptEvalSupport = function() {
		var root = document.documentElement;
		var script = document.createElement("script");

		var TYPE = 'text/javascript',
			TPL_EVAL_SCRIPT_TRUE = 'AUI.support.scriptEval = true;';

		script.type = TYPE;

		try {
			script.appendChild(document.createTextNode(TPL_EVAL_SCRIPT_TRUE));
			root.insertBefore(script, root.firstChild);
			root.removeChild(script);
		}
		catch(e) {
		}
	};

	checkScriptEvalSupport();

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

	extend(
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