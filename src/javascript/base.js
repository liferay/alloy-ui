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

			if (!A.Lang.isArray(instance._args)) {
				instance._args = [instance._args];
			}

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

	var Lang = A.Lang,
		isString = Lang.isString,
		isUndefined = Lang.isUndefined,

		INNER_HTML = 'innerHTML';

	A.mix(A.Node.prototype, {
		after: function(content) {
			var instance = this;

			return instance.insertAfter(content);
		},

		appendTo: function(selector) {
			var instance = this;

			A.get(selector).append(instance);
		},

		attr: function(name, value) {
			var instance = this;

			if (!isUndefined(value)) {
				return instance.set(name, value);
			}
			else {
				return instance.get(name) || instance.getAttribute(name);
			}
		},

		before: function(content) {
			var instance = this;

			var parent = instance.get('parentNode');

			if (parent) {
				parent.insertBefore(content, instance);
			}

			return instance;
		},

		empty: function() {
			var instance = this;

			instance.queryAll('>*').remove();

			var el = A.Node.getDOMNode(instance);

			while (el.firstChild) {
				el.removeChild(el.firstChild);
			}

			return instance;
		},

		getDOM: function() {
			var instance = this;

			return A.Node.getDOMNode(instance);
		},

		html: function() {
			var args = arguments, length = args.length;

			if (length) {
				this.set(INNER_HTML, args[0]);
			}
			else {
				return this.get(INNER_HTML);
			}

			return this;
		},

		insertAfter: function(content) {
			var instance = this;

			var parent = instance.get('parentNode');

			if (parent) {
				parent.insertBefore(content, instance.get('nextSibling'));
			}

			return instance;
		},

		prependTo: function(selector) {
			var instance = this;

			A.get(selector).prepend(instance);
		},

		text: function(text) {
			var instance = this;

			if (!isUndefined(text)) {
				text = A.DOM._getDoc(A.Node.getDOMNode(instance)).createTextNode(text);

				return instance.empty().append(text);
			}

			var el = A.Node.getDOMNode(instance);

			return instance._getText(el.childNodes);
		},

		val: function(value) {
			var instance = this;

			return instance.attr('value', value);
		},

		_getText: function(childNodes) {
			var instance = this;

			var length = childNodes.length;
			var childNode;

			var str = [];

			for (var i = 0; i < length; i++) {
				childNode = childNodes[i];

				if (childNode && childNode.nodeType != 8) {
					if (childNode.nodeType != 1) {
						str.push(childNode.nodeValue);
					}

					if (childNode.childNodes) {
						str.push(instance._getText(childNode.childNodes));
					}
				}
			}

			return str.join('');
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

		clean: function(html) {
			var TPL_NODE = '<div></div>',
				IE_FIX_PADDING_NODE = '<div>_</div>',
				SCRIPT = 'script';

			// instead of fix all tags to "XHTML"-style, make the firstChild be a valid non-empty tag
			html = IE_FIX_PADDING_NODE + A.Lang.trim(html);

			delete A.DOM._cloneCache[html];

			// wrap in a nodeType == 1, nodeType 11 (document fragment) does not support getElementsByTagName
			var temp = A.Node.create(TPL_NODE).append(
				A.Node.create(html)
			);

			var scripts = temp.getElementsByTagName(SCRIPT);

			scripts.each(function(elem) {
				elem.remove();
			});

			temp.removeChild(A.Node.getDOMNode(temp).firstChild);

			var html = temp.html();

			// avoid IE6 memory leak
			temp = null;

			return [ html, scripts ];
		},

		domManip: function(html, callback) {
			var clean = A.Node.clean(html);
			var content = clean[0];
			var scripts = clean[1];

			if (callback) {
				callback.apply(this, [ content ]);
			}

			scripts.each(function(elem) {
				A.Node.evalScript( A.Node.getDOMNode(elem) );
			});
		}
	});

	A.Node.ATTRS.innerHTML = {
		setter: function(v) {
			var instance = this;

			var defaultSetter = function(value) {
				A.Node.DEFAULT_SETTER.apply(instance, [ INNER_HTML, value ]);
			};

			if (isString(v)) {
				// eval scripts
				v = A.Node.domManip(v, defaultSetter);
			}
			else {
				defaultSetter(v);
			}
		}
	};

	A.NodeList.importMethod(
		A.Node.prototype,
		[
			'after',

			'appendTo',

			'attr',

			'before',

			'empty',

			'html',

			'insertAfter',

			'prepend',

			'prependTo',

			'text'
		]
	);

	A.NodeList.prototype.getDOM = function() {
		return A.NodeList.getDOMNodes(this);
	};

}, '@VERSION', { requires: [ 'node' ] });