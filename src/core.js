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

	// temporary crappy method to get the base path
	var getBasePath = function () {
		var nodes = document.getElementsByTagName('script'), i, base;

		for (i = 0; i < nodes.length; i = i + 1) {
			var src = nodes[i].src;
			var match = src.match(/^(.*)yui[\.-].*js(\?.*)?$/);

			if (match && (base = match[1])) {
				base = base.substring(0, base.length - 4);
				break;
			}
		}

		return base;
	};

	/*!
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

	window.Alloy = window.Alloy || {};

	var defaults = {};
	var defaultModules = [ 'event', 'oop', 'widget' ];

	var errorCallback = function(instance, result) {
		if (!result.success) {
			throw result.msg;
		}
	};

	if ('defaults' in Alloy) {
		defaults = Alloy.defaults;
	}

	// get the base path in case the user has not specified
	if (!('base' in defaults)) {
		defaults.base = getBasePath();
	}

	var ALLOY = YUI( extend({}, defaults) );

	var originalConfig = ALLOY.config;

	// adding callback for .use()
	defaultModules.push(errorCallback);

	// loading default modules
	ALLOY.use.apply(ALLOY, defaultModules);

	Alloy = function(o) {
		var instance = this;

		ALLOY.config = ALLOY.merge(originalConfig, Alloy.defaults);

		if (o || instance instanceof Alloy) {
			// new Alloy() creates a new YUI sandbox
			return YUI( ALLOY.merge(ALLOY.config, o) );
		}

		// returns the cached YUI sandbox
		return ALLOY;
	};

	extend(Alloy, YUI, {
		__version: '@VERSION',

		extend: extend,

		defaults: defaults
	});

	Alloy.extend(Alloy.prototype, {
		ready: function() {
			var instance = this;
			var slice = Array.prototype.slice;
			var args = slice.call(arguments, 0), index = args.length - 1;

			// user callback
			var fn = args[index];

			// array with YUI modules to be loaded
			var modules = slice.call(arguments, 0, index);

			if (!modules.length) {
				modules.push('event');
			}

			// adding Alloy().use() callback
			modules.push(
				function(instance) {
					var args = arguments;
					instance.on('domready', function() {
					   fn.apply(this, args);
					});
				}
			);

			instance.use.apply(instance, modules);
		}
	});

})();