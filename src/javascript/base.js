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

	// Courtesy of: http://simonwillison.net/2006/Jan/20/escape/
	A.Lang.escapeRegEx = function(str) {
		return str.replace(/([.*+?^$(){}|[\]\/\\])/g, '\\$1');
	};

}, '@VERSION', { requires: [ 'yui-base', 'base' ] });

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
		isArray = Lang.isArray,
		isString = Lang.isString,
		isUndefined = Lang.isUndefined,

		INNER_HTML = 'innerHTML',
		NEXT_SIBLING = 'nextSibling',
		NONE = 'none',
		PARENT_NODE = 'parentNode',
		SCRIPT = 'script',
		VALUE = 'value';

	A.mix(A.Node.prototype, {
		appendTo: function(selector) {
			var instance = this;

			A.get(selector).append(instance);

			return instance;
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

		guid: function(prefix) {
			var instance = this;
			var currentId = instance.get('id');

			if (!currentId) {
				currentId = A.stamp(instance);

				instance.set('id', currentId);
			}

			return currentId;
		},

		hide: function(cssClass) {
			var instance = this;

			instance.addClass(cssClass || instance._hideClass || 'aui-helper-hidden');

			return instance;
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

		outerHTML: function() {
			var instance = this;
			var domEl = instance.getDOM();

			// IE, Opera and WebKit all have outerHTML.
			if ('outerHTML' in domEl) {
				return domEl.outerHTML;
			}

			var temp = A.Node.create('<div></div>').append(
				this.cloneNode(true)
			);

			try {
				return temp.html();
			}
			catch(e) {}
			finally {
				temp = null;
			}
		},

		placeAfter: function(content) {
			var instance = this;

			var parent = instance.get(PARENT_NODE);

			if (parent) {
				parent.insertBefore(content, instance.get(NEXT_SIBLING));
			}
		},

		placeBefore: function(content) {
			var instance = this;

			var parent = instance.get(PARENT_NODE);

			if (parent) {
				parent.insertBefore(content, instance);
			}
		},

		prependTo: function(selector) {
			var instance = this;

			A.get(selector).prepend(instance);
		},

		radioClass: function(cssClass) {
			var instance = this;

			instance.siblings().removeClass(cssClass);

			instance.addClass(cssClass);
		},

		resetId: function(prefix) {
			var instance = this;

			instance.attr('id', A.guid(prefix));

			return instance;
		},

		selectable: function() {
			var instance = this;

			instance.getDOM().unselectable = 'off';
			instance.detach('selectstart');

			instance.setStyles(
				{
					'MozUserSelect': '',
					'KhtmlUserSelect': ''
				}
			);

			instance.removeClass('aui-helper-unselectable');

			return instance;
		},

		show: function(cssClass) {
			var instance = this;

			instance.removeClass(cssClass || instance._hideClass || 'aui-helper-hidden')

			return instance;
		},

		siblings: function() {
			var instance = this;

			var all = instance.get('parentNode.children');
			var currentNode = instance._node;

			var siblings = A.Array.filter(
				all._nodes,
				function(item, index, collection) {
					return item != currentNode;
				}
			);

			return A.all(siblings);
		},

		swallowEvent: function(eventName, preventDefault) {
			var instance = this;

			var fn = function(event) {
				event.stopPropagation();

				if (preventDefault) {
					event.preventDefault();

					event.halt();
				}

				return false;
			};

			if(isArray(eventName)) {
				A.Array.each(
					eventName,
					function(name) {
						instance.on(name, fn);
					}
				);

				return this;
			}
			else {
				instance.on(eventName, fn);
			}

			return instance;
		},

		text: function(text) {
			var instance = this;
			var el = instance.getDOM();

			if (!isUndefined(text)) {
				text = A.DOM._getDoc(el).createTextNode(text);

				return instance.empty().append(text);
			}

			return instance._getText(el.childNodes);
		},

		toggle: function(cssClass) {
			var instance = this;

			var action = 'hide';
			var hideClass = cssClass || instance._hideClass || 'aui-helper-hidden';

			if (instance.hasClass(hideClass)) {
				action = 'show';
			}

			instance[action](hideClass);
		},

		unselectable: function() {
			var instance = this;

			instance.getDOM().unselectable = 'on';

			instance.swallowEvent('selectstart', true);

			instance.setStyles(
				{
					'MozUserSelect': NONE,
					'KhtmlUserSelect': NONE
				}
			);

			instance.addClass('aui-helper-unselectable');

			return instance;
		},

		val: function(value) {
			var instance = this;

			return instance.attr(VALUE, value);
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
				var head = document.getElementsByTagName('head')[0] || document.documentElement;
				var script = document.createElement('script');

				script.type = 'text/javascript';

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
				A.Node.globalEval(elem.text || elem.textContent || elem.innerHTML || '');
			}
		},

		clean: function(html) {
			var TPL_NODE = '<div></div>',
				IE_FIX_PADDING_NODE = '<div>_</div>';

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

			'hide',

			'html',

			'outerHTML',

			'prepend',

			'prependTo',

			'selectable',

			'show',

			'text',

			'toggle',

			'unselectable'
		]
	);

	A.mix(
		A.NodeList.prototype,
		{
			all: function(selector) {
				var instance = this;

				var newNodeList = [];
				var nodes = instance._nodes;
				var length = nodes.length;

				var subList;

				for (var i = 0; i < length; i++) {
					subList = A.Selector.query(selector, nodes[i]);

					if (subList && subList.length) {
						newNodeList.push.apply(newNodeList, subList);
					}
				}

				newNodeList = A.Array.unique(newNodeList);

				return A.all(newNodeList);
			},

			getDOM: function() {
				var instance = this;

				return A.NodeList.getDOMNodes(this);
			},

			one: function(selector) {
				var instance = this;

				var newNode = null;

				var nodes = instance._nodes;
				var length = nodes.length;

				for (var i = 0; i < length; i++) {
					newNode = A.Selector.query(selector, nodes[i], true);

					if (newNode) {
						newNode = A.one(newNode);

						break;
					}
				}

				return newNode;
			}
		}
	);

	A.mix(
		A,
		{
			getBody: function() {
				var instance = this;

				if (!instance._bodyNode) {
					instance._bodyNode = A.get(document.body);
				}

				return instance._bodyNode;
			},

			getDoc: function() {
				var instance = this;

				if (!instance._documentNode) {
					instance._documentNode = A.get(document);
				}

				return instance._documentNode;
			},

			getWin: function() {
				var instance = this;

				if (!instance._windowNode) {
					instance._windowNode = A.get(window);
				}

				return instance._windowNode;
			}
		}
	);

}, '@VERSION', { requires: [ 'collection', 'node' ] });