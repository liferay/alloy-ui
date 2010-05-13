/**
 * aui-node-base A set of utility methods to the Node.
 *
 * @module aui-node
 * @submodule aui-node-base
 */

var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,
	isUndefined = Lang.isUndefined,

	getClassName = A.ClassNameManager.getClassName,

	CLONED_EVENTS = false,

	HELPER = 'helper',

	CSS_HELPER_HIDDEN = getClassName(HELPER, 'hidden'),
	CSS_HELPER_UNSELECTABLE = getClassName(HELPER, 'unselectable'),

	INNER_HTML = 'innerHTML',
	NEXT_SIBLING = 'nextSibling',
	NONE = 'none',
	PARENT_NODE = 'parentNode',
	SCRIPT = 'script',
	VALUE = 'value';

	// Event cloning detection support based on pieces from jQuery
	var div = document.createElement('div');
	div.innerHTML = '&nbsp;'; // IE throws an error on fireEvent if the element does not have child nodes

	if (div.attachEvent && div.fireEvent) {
		div.attachEvent(
			'onclick',
			function(){
				CLONED_EVENTS = true;

				div.detachEvent('onclick', arguments.callee);
			}
		);

		div.cloneNode(true).fireEvent('onclick');
	}

/**
 * Augment the <a href="Node.html">YUI3 Node</a> with more util methods.
 *
 * Check the list of <a href="Node.html#methods">Methods</a> available for
 * AUI Node.
 *
 * @class A.Node
 * @constructor
 * @uses Node
 */
A.mix(A.Node.prototype, {
	/**
	 * <p>Returns the current ancestors of the node element. If a selector is
	 * specified, the ancestors are filtered to match the selector.</p>
     *
     * Example:
     *
	 * <pre><code>
	 * A.one('#nodeId').ancestors('div');
	 * </code></pre>
	 *
	 * @method ancestors
	 * @param {String} selector A selector to filter the ancestor elements against.
	 * @return {NodeList}
	 */
	ancestors: function(selector) {
		var instance = this;

		var ancestors = [];
		var currentEl = instance.getDOM();

		while (currentEl && currentEl.nodeType !== 9) {
			if (currentEl.nodeType === 1) {
				ancestors.push(currentEl);
			}

			currentEl = currentEl.parentNode;
		}

		var nodeList = new A.all(ancestors);

		if (selector) {
			nodeList = nodeList.filter(selector);
		}

		return nodeList;
	},

	/**
	 * <p>Returns the current ancestors of the node element filtered by a className.
	 * This is an optimized method for finding ancestors by a specific CSS class name.</p>
     *
     * Example:
     *
	 * <pre><code>
	 * A.one('#nodeId').ancestorsByClassName('aui-helper-hidden');
	 * </code></pre>
	 *
	 * @method ancestors
	 * @param {String} selector A selector to filter the ancestor elements against.
	 * @return {NodeList}
	 */
	ancestorsByClassName: function(className) {
		var instance = this;

		var ancestors = [];
		var cssRE = new RegExp('\\b' + className + '\\b');
		var currentEl = instance.getDOM();

		while (currentEl && currentEl.nodeType !== 9) {
			if (currentEl.nodeType === 1 && cssRE.test(currentEl.className)) {
				ancestors.push(currentEl);
			}

			currentEl = currentEl.parentNode;
		}

		return A.all(ancestors);
	},

	/**
	 * <p>Insert the node instance to the end of the <code>selector</code>
     * element.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * // using another Node instance
	 * var body = A.one('body');
	 * node.appendTo(body);
	 * // using a CSS selector
	 * node.appendTo('#container');
	 * </code></pre>
	 *
	 * @method appendTo
	 * @chainable
	 * @param {Node | String} selector A selector, element, HTML string, Node
	 * @return {String}
	 */
	appendTo: function(selector) {
		var instance = this;

		A.one(selector).append(instance);

		return instance;
	},

	/**
	 * <p>Get or Set the value of an attribute for the first element in the
     * set of matched elements. If only the <code>name</code> is passed it
     * works as a getter.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.attr('title', 'Setting a new title attribute');
	 * // Alert the value of the title attribute: 'Setting a new title attribute'
	 * alert( node.attr('title') );
	 * </code></pre>
	 *
	 * @method attr
	 * @param {String} name The name of the attribute
	 * @param {String} value The value of the attribute to be set. Optional.
	 * @return {String}
	 */
	attr: function(name, value) {
		var instance = this;

		if (!isUndefined(value)) {
			return instance.set(name, value);
		}
		else {
			return instance.get(name) || instance.getAttribute(name);
		}
	},

	/**
	 * Normalizes the behavior of cloning a node, which by default should not clone
	 * the events that are attached to it.
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.clone().appendTo('body');
	 * </code></pre>
	 *
	 * @method clone
	 * @return {Node}
	 */
	clone: (function() {
		var clone;

		if (CLONED_EVENTS) {
			clone = function() {
				return A.Node.create(this.outerHTML());
			};
		}
		else {
			clone = function() {
				return this.cloneNode(true);
			};
		}

		return clone;
	})(),

	/**
	 * <p>Centralize the current Node instance with the passed
     * <code>centerWith</code> Node, if not specified, the body will be
     * used.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * // Center the <code>node</code> with the <code>#container</code>.
	 * node.center('#container');
	 * </code></pre>
	 *
	 * @method center
	 * @chainable
	 * @param {Node | String} centerWith Node to center with
	 */
	center: function(centerWith) {
		var instance = this;

		centerWith = (centerWith && A.one(centerWith)) || A.getBody();

		var centerWithRegion = centerWith.get('region');
		var nodeRegion = instance.get('region');

		var xCenterWith = centerWithRegion.left + (centerWithRegion.width / 2);
		var yCenterWith = centerWithRegion.top + (centerWithRegion.height / 2);

		instance.setXY([xCenterWith - (nodeRegion.width / 2), yCenterWith - (nodeRegion.height / 2)]);
	},

	/**
	 * <p>This method removes not only child (and other descendant) elements,
     * but also any text within the set of matched elements. This is because,
     * according to the DOM specification, any string of text within an element
     * is considered a child node of that element.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.empty();
	 * </code></pre>
	 *
	 * @method empty
	 * @chainable
	 */
	empty: function() {
		var instance = this;

		instance.all('>*').remove();

		var el = A.Node.getDOMNode(instance);

		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}

		return instance;
	},

	/**
	 * Retrieves the DOM node bound to a Node instance. See
     * <a href="Node.html#method_getDOMNode">getDOMNode</a>.
	 *
	 * @method getDOM
	 * @return {HTMLNode} The DOM node bound to the Node instance.
	 */
	getDOM: function() {
		var instance = this;

		return A.Node.getDOMNode(instance);
	},

    /**
     * Set the id of the Node instance if the object does not have one. The
     * generated id is based on a guid created by the
     * <a href="YUI.html#method_stamp">stamp</a> method.
     *
     * @method guid
     * @param {string} prefix optional guid prefix
     * @return {String} The current id of the node
     */
	guid: function(prefix) {
		var instance = this;
		var currentId = instance.get('id');

		if (!currentId) {
			currentId = A.stamp(instance);

			instance.set('id', currentId);
		}

		return currentId;
	},

	/**
     * <p>Hide the node adding a css class on it. If <code>cssClass</code> is not
     * passed as argument, the className 'aui-helper-hidden' will be used by
     * default.</p>
     *
     * <p><string>NOTE:</string> This method assume that your node were visible
     * because the absence of 'aui-helper-hidden' css class. This won't
     * manipulate the inline <code>style.display</code> property.</p>
     *
     * @method hide
     * @chainable
     * @param {string} cssClass Class name to hide the element. Optional.
     */
	hide: function(cssClass) {
		var instance = this;

		instance.addClass(cssClass || instance._hideClass || CSS_HELPER_HIDDEN);

		return instance;
	},

	/**
     * <p>Get or Set the HTML contents of the node. If the <code>value</code>
     * is passed it's set the content of the element, otherwise it works as a
     * getter for the current content.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.html('Setting new HTML');
	 * // Alert the value of the current content
	 * alert( node.html() );
	 * </code></pre>
     *
     * @method html
     * @param {string} value A string of html to set as the content of the node instance.
     */
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

	/**
	 * Gets the outerHTML of a node, which islike innerHTML, except that it
	 * actually contains the HTML of the node itself.
	 *
	 * @return {string} The outerHTML of the given element.
	 */
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

	/**
	 * <p>Inserts a <code>newNode</code> after the node instance (i.e., as the next
	 * sibling). If the reference node has no parent, then does nothing.</p>
	 *
	 * Example:
     *
	 * <pre><code>var titleNode = A.one('#titleNode');
	 * var descriptionNode = A.one('#descriptionNode');
	 * // the description is usually shown after the title
	 * titleNode.placeAfter(descriptionNode);
	 * </code></pre>
	 *
	 * @method placeAfter
	 * @chainable
	 * @param {Node} newNode Node to insert.
	 */
	placeAfter: function(newNode) {
		var instance = this;

		return instance._place(newNode, instance.get(NEXT_SIBLING));
	},

	/**
	 * <p>Inserts a <code>newNode</code> before the node instance (i.e., as the previous
	 * sibling). If the reference node has no parent, then does nothing.</p>
	 *
	 * Example:
     *
	 * <pre><code>var descriptionNode = A.one('#descriptionNode');
	 * var titleNode = A.one('#titleNode');
	 * // the title is usually shown before the description
	 * descriptionNode.placeBefore(titleNode);
	 * </code></pre>
	 *
	 * @method placeBefore
	 * @chainable
	 * @param {Node} newNode Node to insert.
	 */
	placeBefore: function(newNode) {
		var instance = this;

		return instance._place(newNode, instance);
	},

	/**
	 * <p>Inserts the node instance to the begining of the <code>selector</code>
     * node (i.e., insert before the <code>firstChild</code> of the
     * <code>selector</code>).</p>
	 *
	 * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.prependTo('body');
	 * </code></pre>
	 *
	 * @method prependTo
	 * @chainable
	 * @param {Node | String} selector A selector, element, HTML string, Node
	 */
	prependTo: function(selector) {
		var instance = this;

		A.one(selector).prepend(instance);

		return instance;
	},

	/**
	 * Add one or more CSS classes to an element and remove the class(es)
     * from the siblings of the element.
	 *
	 * @method radioClass
	 * @chainable
	 * @param {String} cssClass
	 */
	radioClass: function(cssClass) {
		var instance = this;

		instance.siblings().removeClass(cssClass);

		instance.addClass(cssClass);

		return instance;
	},

	/**
	 * Generate an unique identifier and reset the id attribute of the node
     * instance using the new value. Invokes the
     * <a href="A.Node.html#method_guid">guid</a>.
	 *
	 * @method resetId
	 * @chainable
	 * @param {String} prefix Optional prefix for the guid.
	 */
	resetId: function(prefix) {
		var instance = this;

		instance.attr('id', A.guid(prefix));

		return instance;
	},

	/**
	 * Enables text selection for this element (normalized across browsers).
	 *
	 * @method selectable
	 * @chainable
	 */
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

		instance.removeClass(CSS_HELPER_UNSELECTABLE);

		return instance;
	},

	/**
     * <p>Show the node removing a css class used to hide it. Use the same
     * className added using the <a href="A.Node.html#method_hide">hide</a>
     * method. If <code>cssClass</code> is not passed as argument, the
     * className 'aui-helper-hidden' will be used by default.</p>
     *
     * <p><string>NOTE:</string> This method assume that your node were hidden
     * because of the 'aui-helper-hidden' css class were being used. This won't
     * manipulate the inline <code>style.display</code> property.</p>
     *
     * @method show
     * @chainable
     * @param {string} cssClass Class name to hide the element. Optional.
     */
	show: function(cssClass) {
		var instance = this;

		instance.removeClass(cssClass || instance._hideClass || CSS_HELPER_HIDDEN);

		return instance;
	},

    /**
     * <p>Stops the specified event(s) from bubbling and optionally prevents the
     * default action.</p>
     *
     * Example:
     *
     * <pre><code>var anchor = A.one('a#anchorId');
     * anchor.swallowEvent('click');
     * </code></pre>
     *
     * @method swallowEvent
     * @chainable
     * @param {String/Array} eventName an event or array of events to stop from bubbling
     * @param {Boolean} preventDefault (optional) true to prevent the default action too
     */
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

    /**
     * <p>Get or Set the combined text contents of the node instance,
     * including it's descendants. If the <code>text</code>
     * is passed it's set the content of the element, otherwise it works as a
     * getter for the current content.</p>
     *
     * Example:
     *
	 * <pre><code>var node = A.one('#nodeId');
	 * node.text('Setting new text content');
	 * // Alert the value of the current content
	 * alert( node.text() );
	 * </code></pre>
	 *
     * @method text
     * @param {String} text A string of text to set as the content of the node instance.
     */
	text: function(text) {
		var instance = this;
		var el = instance.getDOM();

		if (!isUndefined(text)) {
			text = A.DOM._getDoc(el).createTextNode(text);

			return instance.empty().append(text);
		}

		return instance._getText(el.childNodes);
	},

    /**
     * <p>Displays or hide the node instance.</p>
	 *
	 * <p><string>NOTE:</string> This method assume that your node were hidden
     * because of the 'aui-helper-hidden' css class were being used. This won't
     * manipulate the inline <code>style.display</code> property.</p>
	 *
     * @method toggle
     * @chainable
     * @param {String} cssClass Class name to hide or show the element. Optional.
     */
	toggle: function(cssClass) {
		var instance = this;

		var action = 'hide';
		var hideClass = cssClass || instance._hideClass || CSS_HELPER_HIDDEN;

		if (instance.hasClass(hideClass)) {
			action = 'show';
		}

		instance[action](hideClass);

		return instance;
	},

	/**
	 * Disables text selection for this element (normalized across browsers).
	 *
	 * @method unselectable
	 * @chainable
	 */
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

		instance.addClass(CSS_HELPER_UNSELECTABLE);

		return instance;
	},

    /**
     * <p>Get or Set the value attribute of the node instance. If the
     * <code>value</code> is passed it's set the value of the element,
     * otherwise it works as a getter for the current value.</p>
     *
     * Example:
     *
	 * <pre><code>var input = A.one('#inputId');
	 * input.val('Setting new input value');
	 * // Alert the value of the input
	 * alert( input.val() );
	 * </code></pre>
	 *
     * @method val
     * @param {string} value Value to be set. Optional.
     */
	val: function(value) {
		var instance = this;

		if (isUndefined(value)) {
			return instance.get(VALUE);
		}
		else {
			return instance.set(VALUE, value);
		}
	},

    /**
     * Extract text content from the passed nodes.
	 *
     * @method _getText
     * @private
     * @param {Native NodeList} childNodes
     */
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
	},

	/**
     * Place a node or html string at a specific location
	 *
     * @method _place
     * @private
     * @param {Node|String} newNode
     * @param {Node} refNode
     */
	_place: function(newNode, refNode) {
		var instance = this;

		var parent = instance.get(PARENT_NODE);

		if (parent) {
			if (Lang.isString(newNode)) {
				newNode = A.Node.create(newNode);
			}

			parent.insertBefore(newNode, refNode);
		}

		return instance;
	}
}, true);

/**
 * Augment the <a href="NodeList.html">YUI3 NodeList</a> with more util methods.
 *
 * Check the list of <a href="NodeList.html#methods">Methods</a> available for
 * AUI NodeList.
 *
 * @class A.NodeList
 * @constructor
 * @uses A.Node
 */
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
		/**
	     * See <a href="Node.html#method_all">Node all</a>.
	     *
	     * @method all
	     */
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

		/**
	     * See <a href="Node.html#method_getDOM">Node getDOM</a>.
	     *
	     * @method getDOM
	     */
		getDOM: function() {
			var instance = this;

			return A.NodeList.getDOMNodes(this);
		},

		/**
	     * See <a href="Node.html#method_one">Node one</a>.
	     *
	     * @method one
	     */
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
		/**
	     * Get the body node. Shortcut to <code>A.one('body')</code>.
		 *
	     * @method getBody
	     */
		getBody: function() {
			var instance = this;

			if (!instance._bodyNode) {
				instance._bodyNode = A.one(document.body);
			}

			return instance._bodyNode;
		},

		/**
	     * Get the document node. Shortcut to <code>A.one(document)</code>.
		 *
	     * @method getDoc
	     */
		getDoc: function() {
			var instance = this;

			if (!instance._documentNode) {
				instance._documentNode = A.one(document);
			}

			return instance._documentNode;
		},

		/**
	     * Get the window node. Shortcut to <code>A.one(window)</code>.
		 *
	     * @method getWin
	     */
		getWin: function() {
			var instance = this;

			if (!instance._windowNode) {
				instance._windowNode = A.one(window);
			}

			return instance._windowNode;
		}
	}
);