/*
* AUI Base
*/
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

}, '@VERSION', { requires: [ 'yui-base' ] });

/*
* AUI Delayed Task
*/

AUI.add('delayed-task', function(A) {

	var DelayedTask = function(fn, scope, args) {
		var instance = this;

		instance._args = args;
		instance._delay = 0;
		instance._fn = fn;
		instance._id = null;
		instance._scope = scope || instance;
		instance._time = 0;

		instance._base = function() {
			var now = instance._getTime();

			if (now - instance._time >= instance._delay) {
				clearInterval(instance._id);

				instance._id = null;

				instance._fn.apply(instance._scope, instance._args || []);
			}
		};
	};

	DelayedTask.prototype = {
		delay: function(delay, newFn, newScope, newArgs) {
			var instance = this;

			if (instance._id && instance._delay != delay) {
				instance.cancel();
			}

			instance._delay = delay || instance._delay;
			instance._time = instance._getTime();

			instance._fn = newFn || instance._fn;
			instance._scope = newScope || instance._scope;
			instance._args = newArgs || instance._args;

			if (!instance._id) {
				if (instance._delay > 0) {
					instance._id = setInterval(instance._base, instance._delay);
				}
				else {
					instance._base();
				}
			}
		},

		cancel: function() {
			var instance = this;

			if (instance._id) {
				clearInterval(instance._id);

				instance._id = null;
			}
		},

		_getTime: function() {
			var instance = this;

			return (+new Date());
		}
	};

	A.DelayedTask = DelayedTask;

}, '@VERSION', { requires: [ 'yui-base' ] });

/*
* AUI Node
*/
AUI.add('aui-node', function(A) {

	var L = A.Lang,
		isString = L.isString,

		INNER_HTML = 'innerHTML';

	A.mix(A.Node.prototype, {
		html: function() {
			var args = arguments, length = args.length;

			if (length) {
				this.set(INNER_HTML, args[0]);
			}
			else {
				return this.get(INNER_HTML);
			}

			return this;
		}
	}, true);

	A.mix(A.Node, {
		globalEval: function(data) {
			if ( data && /\S/.test(data) ) {
				var head = document.getElementsByTagName("head")[0] || document.documentElement;
				var script = document.createElement("script");

				script.type = "text/javascript";

				if (AUI.support.scriptEval) {
					script.appendChild(document.createTextNode(data));
				}
				else {
					script.text = data;
				}

				head.insertBefore(script, head.firstChild);
				head.removeChild(script);
			}
		},

		evalScript: function(elem) {
			if (elem.src) {
				A.io(elem.src, {
					async: false,
					on: {
						complete: function(i, o) {
							A.Node.globalEval(o.responseText);
						}
					}
				});
			}
			else {
				A.Node.globalEval(elem.text || elem.textContent || elem.innerHTML || "");
			}
		},

		domManip: function(html) {
			var TPL_NODE = '<div></div>',
				SCRIPT = 'script';

			delete A.DOM._cloneCache[html];

			// wrap in a nodeType == 1, nodeType 11 (document fragment) does not support getElementsByTagName
			var temp = A.Node.create(TPL_NODE).append(
				A.Node.create(html)
			);

			var scripts = temp.getElementsByTagName(SCRIPT);

			scripts.each(function(elem) {
				A.Node.evalScript( A.Node.getDOMNode(elem) );
				elem.remove();
			});

			var html = temp.html();

			// avoid IE6 memory leak
			temp = null;

			return html;
		}
	});

	A.Node.ATTRS.innerHTML = {
		setter: function(v) {
			if (isString(v)) {
				// eval scripts
				v = A.Node.domManip(v);
			}

			A.Node.DEFAULT_SETTER.apply(this, [ INNER_HTML, v ]);
		}
	};

}, '@VERSION', { requires: [ 'node' ] });