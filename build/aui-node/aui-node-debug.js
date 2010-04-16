AUI.add('aui-node-base', function(A) {
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

	CLONED_EVENTS = false,

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

		A.get(selector).append(instance);

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

		instance.queryAll('>*').remove();

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

		instance.addClass(cssClass || instance._hideClass || 'aui-helper-hidden');

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

		var parent = instance.get(PARENT_NODE);

		if (parent) {
			parent.insertBefore(newNode, instance.get(NEXT_SIBLING));
		}

		return instance;
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

		var parent = instance.get(PARENT_NODE);

		if (parent) {
			parent.insertBefore(newNode, instance);
		}

		return instance;
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

		A.get(selector).prepend(instance);

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

		instance.removeClass('aui-helper-unselectable');

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

		instance.removeClass(cssClass || instance._hideClass || 'aui-helper-hidden');

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
		var hideClass = cssClass || instance._hideClass || 'aui-helper-hidden';

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

		instance.addClass('aui-helper-unselectable');

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

}, '@VERSION@' ,{requires:['aui-base']});
AUI.add('aui-node-html5', function(A) {
/**
 * aui-node-html5 provides support for HTML shiv natively on the Alloy dom
 * methods. The HTML5 shiv just affects IE.
 *
 * @module aui-node
 * @submodule aui-node-html5
 */

if (A.UA.ie) {
	/**
	 * <p>An object that encapsulates util methods for HTML5 shiving.</p>
	 * <h2>What is a "shiv"?</h1>
	 * <p>To the world, a shiv is a slang term for a sharp object used as a
     * knife-like weapon. To Internet Explorer, a shiv is a script that, when
     * executed, forces the browser to recognize HTML5 elements.</p>
	 *
	 * @class A.HTML5
	 */
	var HTML5 = A.namespace('HTML5'),
		DOM_create = A.DOM._create;

	if (!HTML5._fragHTML5Shived) {
		/**
		 * A global DocumentFragment already HTML5 shived, for performance
         * reasons. (i.e., all nodes and its HTML5 children appended to this
         * fragment iherits the styles on IE).
		 *
		 * @property A.HTML._fragHTML5Shived
		 * @type DocumentFragment (shived)
		 * @protected
		 */
		HTML5._fragHTML5Shived = AUI.html5shiv(
			document.createDocumentFragment()
		);
	}

	A.mix(
		HTML5,
		{
			/**
			 * Receives a <code>frag</code> and a HTML content. This method
             * shivs the HTML5 nodes appended to a Node or fragment which is not
             * on the document yet.
			 *
			 * @method IECreateFix
			 * @param {Node | DocumentFragment} frag Fragment to be fixed.
			 * @param {String} content HTML to be set (using innerHTML) on the <code>frag</code>.
			 * @return {Node | DocumentFragment}
			 */
			IECreateFix: function(frag, content) {
				var shivedFrag = HTML5._fragHTML5Shived;

				shivedFrag.appendChild(frag);

				frag.innerHTML = content;

				shivedFrag.removeChild(frag);

				return frag;
			},

			/**
			 * AOP listener to the A.DOM._create method. This method
             * intercepts all the calls to the A.DOM._create and append the
             * generated fragment to <a
             * href="A.HTML5.html#property_A.HTML._fragHTML5Shived">A.HTML._fragHTML5Shived</a>,
             * this fixes the IE bug for painting the HTML5 nodes on the HTML
             * fragment.
			 *
			 * @method _doBeforeCreate
			 * @param {String} html HTML content
			 * @param {String} doc
			 * @param {String} tag
			 * @protected
			 * @return {DocumentFragment}
			 */
			_doBeforeCreate: function(html, doc, tag) {
				var createdFrag = DOM_create.apply(this, arguments);

				var shivedFrag = HTML5.IECreateFix(createdFrag, html);

				return new A.Do.Halt(null, shivedFrag);
			}
		}
	);

	A.Do.before(HTML5._doBeforeCreate, A.DOM, '_create', A.DOM);
}

}, '@VERSION@' ,{requires:['collection','aui-base']});
AUI.add('aui-node-html5-print', function(A) {
var WIN = A.config.win,
	DOC = A.config.doc,
	HEAD = DOC.documentElement.firstChild,
	ELEMENTS = AUI.HTML5_ELEMENTS.join('|'),
	PROTECT = [],

	getClassName = A.ClassNameManager.getClassName,

	getReplaceRE = A.cached(
		function(node_name) {
			return new RegExp('^\\s*<' + node_name + '(.*)\\/' + node_name + '>\\s*$', 'i');
		}
	),

	CSS_PREFIX = getClassName('print'),
	CSS_PREFIX_SELECTOR = '.' + CSS_PREFIX,

	SELECTOR_MATCH = new RegExp('\\b(' + ELEMENTS + ')\\b', 'gi'),

	SELECTOR_REPLACE = function (match) {
		return CSS_PREFIX_SELECTOR + match;
	};

if (A.UA.ie) {
	A.HTML5.print = {
	_parseSheets: function (stylesheets) {
		var instance = this;

		var a = -1,
			b,
			declarationBlock,
			imports,
			length = stylesheets.length,
			rlength,
			rules,
			selectors;

		while (++a < length) {
			imports = stylesheets[a].imports;
			rules = stylesheets[a].rules;
			b = -1;

			if (imports.length) {
				instance._parseSheets(imports);
			}

			rlength = rules.length;

			while (++b < rlength) {
				selectors = rules[b].selectorText;
				declarationBlock = rules[b].style.cssText;

				if (selectors.match(SELECTOR_MATCH)) {
					instance._stylesheet.styleSheet.addRule(selectors.replace(SELECTOR_MATCH, SELECTOR_REPLACE), declarationBlock);
				}
			}
		}
	},

	shim: function () {
		var instance = this;

		var	div = DOC.createElement('div');

		A.HTML5._fragHTML5Shived.appendChild(div);

		instance._fragment = div;

		WIN.attachEvent('onbeforeprint', A.bind(instance.addSafeHTML, instance));
		WIN.attachEvent('onafterprint', A.bind(instance.removeSafeHTML, instance));
	},

	addSafeCSS: function () {
		var instance = this;

		var safeStylesheet = DOC.createElement('style');
		var stylesheets = DOC.styleSheets;

		HEAD.insertBefore(safeStylesheet, HEAD.firstChild);

		instance._stylesheet = safeStylesheet;

		instance._parseSheets(stylesheets);
	},

	removeSafeCSS: function () {
		HEAD.removeChild(this._stylesheet);
	},

	addSafeHTML: function () {
		var instance = this;

		var els = DOC.getElementsByTagName('*');

		var node_match = new RegExp('^' + ELEMENTS + '$', 'i');

		var	i = -1,
			node_name,
			node_replace,
			node_safe,
			protect,
			safe_element;

		instance.addSafeCSS();

		while (++i < els.length) {
			node_name = els[i].nodeName.match(node_match);

			if (node_name) {
				node_replace = getReplaceRE(node_name);
				node_safe = (els[i].currentStyle.display == 'block') ? 'div' : 'span';

				instance._fragment.innerHTML = els[i].outerHTML.replace(/\r|\n/g, ' ').replace(node_replace, '<' + node_safe + '$1/' + node_safe + '>');

				safe_element = instance._fragment.childNodes[0];

				safe_element.className += ' ' + CSS_PREFIX + node_name;

				protect = PROTECT[PROTECT.length] = {
					before: els[i],
					after: instance._fragment.childNodes[0]
				};

				els[i].parentNode.replaceChild(protect.after, protect.before);
			}
		}
	},

	removeSafeHTML: function () {
		var instance = this;

		var	els = PROTECT;
		var	i = -1;

		instance.removeSafeCSS();

		var length = els.length;

		while (++i < length) {
			els[i].after.parentNode.replaceChild(els[i].before, els[i].after);
		}

		PROTECT = [];
	}
};

A.HTML5.print.shim();

}

}, '@VERSION@' ,{requires:['aui-node-html5']});
AUI.add('aui-node-fx', function(A) {
/*
	Experimental
*/

var Lang = A.Lang;

A.Node.ATTRS.fx = {
	getter: function() {
		var instance = this;

		if (!instance.fx) {
			instance.plug(A.Plugin.NodeFX);
		}

		return instance.fx;
	}
};

var SETTINGS_SPEEDS = {
	fast: 0.1,
	normal: 1,
	slow: 1.5
};

var getSpeedConfig = function(config) {
	var duration = 1;

	if (Lang.isNumber(config)) {
		duration = config;
		config = null;
	}

	if (Lang.isString(config)) {
		var speed = config.toLowerCase();

		if (speed in SETTINGS_SPEEDS) {
			duration = SETTINGS_SPEEDS[speed];
		}

		config = null;
	}

	config = config || {
		duration: duration
	};

	return config;
};

A.mix(
	A.Node.prototype,
	{
		fadeIn: function(config) {
			var instance = this;

			var fx = instance.get('fx');

			config = getSpeedConfig(config);

			var currentOpacity = fx.get('to.opacity') || 0;

			if (currentOpacity == 1) {
				currentOpacity = 0;
			}

			A.mix(config,
				{
					from: {
						opacity: currentOpacity
					},
					to: {
						opacity: 1
					},
					reverse: false
				}
			);

			fx.setAttrs(config);

			fx.run();
		},

		fadeOut: function(config) {
			var instance = this;

			var fx = instance.get('fx');

			config = getSpeedConfig(config);

			A.mix(config,
				{
					from: {
						opacity: fx.get('to.opacity') || 1
					},
					to: {
						opacity: 0
					},
					reverse: false
				}
			);

			fx.setAttrs(config);

			fx.run();
		},

		fadeTo: function(config, duration) {
			var instance = this;

			var opacity = 0;

			if (Lang.isNumber(config) || Lang.isString(config)) {
				opacity = parseFloat(config);
				config = null;
			}

			config = config || {};

			duration = duration || 1;

			if (Lang.isString(duration)) {
				var speed = duration.toLowerCase();

				if (speed in SETTINGS_SPEEDS) {
					duration = SETTINGS_SPEEDS[speed];
				}
			}

			A.mix(config,
				{
					duration: duration,
					to: {
						opacity: opacity
					},
					reverse: false
				}
			);

			var fx = instance.get('fx');

			fx.setAttrs(config);

			fx.run();
		},

		fadeToggle: function(duration) {
			var instance = this;

			duration = duration || 1;

			if (Lang.isString(duration)) {
				var speed = duration.toLowerCase();

				if (speed in SETTINGS_SPEEDS) {
					duration = SETTINGS_SPEEDS[speed];
				}
			}

			var fx = instance.get('fx');

			if (false && !fx._fadeToggleSet) {
				fx._fadeToggleSet = {
					from: {
						opacity: 0
					},
					to: {
						opacity: 1
					}
				};

				fx.setAttrs(fx._fadeToggleSet);
			}

			var fromOpacity = fx.get('from.opacity');
			var toOpacity = fx.get('to.opacity');

			if (Lang.isUndefined(fromOpacity)) {
				fromOpacity = 0;
			}

			if (Lang.isUndefined(toOpacity)) {
				toOpacity = 1;
			}

			fromOpacity = Math.round(fromOpacity);
			toOpacity = Math.round(toOpacity);

			if (fromOpacity == toOpacity) {
				toOpacity = (fromOpacity == 1) ? 0 : 1;
			}

			fx.setAttrs(
				{
					from: {
						opacity: fromOpacity
					},
					to: {
						opacity: toOpacity
					},
					duration: duration,
					reverse: !fx.get('reverse')
				}
			);

			fx.run();
		},

		slideDown: function(config) {
			var instance = this;

			var fx = instance.get('fx');

			config = getSpeedConfig(config);

			A.mix(config,
				{
					from: {
						height: 0
					},
					to: {
						height: function(node) {
							return node.get('scrollHeight');
						}
					},
					reverse: false
				}
			);

			fx.setAttrs(config);

			fx.on(
				'start',
				function(event) {
					fx.detach('nodefx:start', arguments.callee);

					instance.setStyle('overflow', 'hidden');
				}
			);

			fx.run();
		},

		slideToggle: function(config) {
			var instance = this;

			var fx = instance.get('fx');

			var duration = 1;

			if (Lang.isNumber(config)) {
				duration = config;
			}

			if (Lang.isString(config)) {
				var speed = config.toLowerCase();

				if (speed in SETTINGS_SPEEDS) {
					duration = SETTINGS_SPEEDS[speed];
				}
			}

			if (!fx._slideToggleSet) {
				fx.setAttrs(
					{
						from: {
							height: 0
						},
						to: {
							height: function(node) {
								return node.get('scrollHeight');
							}
						},
						reverse: false
					}
				);

				fx._slideToggleSet = true;
			}

			fx.on(
				'start',
				function(event) {
					fx.detach('nodefx:start', arguments.callee);

					instance.setStyle('overflow', 'hidden');
				}
			);

			fx.set('duration', duration);
			fx.set('reverse', !fx.get('reverse'));

			fx.run();
		},

		slideUp: function(config) {
			var instance = this;

			var fx = instance.get('fx');

			config = getSpeedConfig(config);

			A.mix(config,
				{
					from: {
						height: function(node) {
							return node.get('scrollHeight');
						}
					},
					to: {
						height: 0
					},
					reverse: false
				}
			);

			fx.setAttrs(config);

			fx.on(
				'start',
				function(event) {
					fx.detach('nodefx:start', arguments.callee);

					instance.setStyle('overflow', 'hidden');
				}
			);

			fx.run();
		}
	}
);

}, '@VERSION@' ,{requires:['aui-base','anim','anim-node-plugin']});


AUI.add('aui-node', function(A){}, '@VERSION@' ,{skinnable:false, use:['aui-node-base','aui-node-html5','aui-node-html5-print','aui-node-fx']});

