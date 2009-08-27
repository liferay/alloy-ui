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

	var getBasePath = function () {
		var nodes = document.getElementsByTagName('script');
		var yuiRE = /^(.*)yui[\.-].*js(\?.*)?$/;
		var length = nodes.length;
		var node, match, base;

		while(length--) {
			node = nodes[length];
			match = node.src && node.src.match(yuiRE);
			base = match && match[1];

			if (base) {
				base = base.substring(0, base.length - 4);

				break;
			}
		}

		return base;
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

	var defaults = {};
	var defaultModules = [ 'event', 'oop', 'widget' ];

	if ('defaults' in AUI) {
		defaults = AUI.defaults;
	}

	// get the base path in case the user has not specified
	if (!('base' in defaults)) {
		defaults.base = getBasePath();
	}

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

			if (!modules.length) {
				modules.push('event');
			}

			// adding AUI().use() callback
			modules.push(
				function(instance) {
					var args = arguments;
					instance.on('domready', function() {
					   fn.apply(this, args);
					});
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
})();