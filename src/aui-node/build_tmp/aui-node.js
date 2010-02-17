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

	center: function(centerWith) {
		var instance = this;

		centerWith = (centerWith && A.one(centerWith)) || A.getBody();

		var centerWithRegion = centerWith.get('region');
		var nodeRegion = instance.get('region');

		var xCenterWith = centerWithRegion.left + (centerWithRegion.width / 2);
		var yCenterWith = centerWithRegion.top + (centerWithRegion.height / 2);

		instance.setXY([xCenterWith - (nodeRegion.width / 2), yCenterWith - (nodeRegion.height / 2)]);
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

		instance.removeClass(cssClass || instance._hideClass || 'aui-helper-hidden');

		return instance;
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

		if (isUndefined(value)) {
			return instance.get(VALUE);
		}
		else {
			return instance.set(VALUE, value);
		}
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

		'unselectable',

		'val'
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

}, '@VERSION@' ,{skinnable:false, requires:['collection','node']});
