AUI.add('aui-node-base', function(A) {
/**
 * aui-node-base A set of utility methods to the Node.
 *
 * @module aui-node
 * @submodule aui-node-base
 */

var Lang = A.Lang,
	isArray = Lang.isArray,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isUndefined = Lang.isUndefined,
	isValue = Lang.isValue,

	AArray = A.Array,
	Node = A.Node,
	NodeList = A.NodeList,

	getClassName = A.getClassName,
	getRegExp = A.DOM._getRegExp,

	prefix = Lang.String.prefix,

	CONFIG = A.config,
	DOC = CONFIG.doc,
	WIN = CONFIG.win,

	NODE_PROTO = Node.prototype,
	NODELIST_PROTO = NodeList.prototype,

	STR_EMPTY = '',

	ARRAY_EMPTY_STRINGS = [STR_EMPTY, STR_EMPTY],

	HELPER = 'helper',
	OFFSET = 'offset',

	CSS_HELPER_FORCE_OFFSET = getClassName(HELPER, 'force', OFFSET),
	CSS_HELPER_HIDDEN = getClassName(HELPER, 'hidden'),
	CSS_HELPER_UNSELECTABLE = getClassName(HELPER, 'unselectable'),

	CHILD_NODES = 'childNodes',
	CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
	INNER = 'inner',
	INNER_HTML = 'innerHTML',
	NEXT_SIBLING = 'nextSibling',
	NONE = 'none',
	OUTER = 'outer',
	PARENT_NODE = 'parentNode',
	REGION = 'region',
	SCRIPT = 'script',

	SUPPORT_CLONED_EVENTS = false,

	VALUE = 'value',

	MAP_BORDER = {
		b: 'borderBottomWidth',
		l: 'borderLeftWidth',
		r: 'borderRightWidth',
		t: 'borderTopWidth'
	},
	MAP_MARGIN = {
		b: 'marginBottom',
		l: 'marginLeft',
		r: 'marginRight',
		t: 'marginTop'
	},
	MAP_PADDING = {
		b: 'paddingBottom',
		l: 'paddingLeft',
		r: 'paddingRight',
		t: 'paddingTop'
	},

	prefixSelector = function(ns, id) {
		return '#' + prefix(ns, id);
	},

	formatSelectorNS = function(ns, selector) {
		return selector.replace(getRegExp('(#|\\[id=(\\\"|\\\'))(?!' + ns + ')', 'g'), '$1' + ns);
	};

	/*
		Parts of this file are used from jQuery (http://jquery.com)
		Dual-licensed under MIT/GPL
	*/
	var div = DOC.createElement('div');

	div.style.display = 'none';
	div.innerHTML = '   <table></table>&nbsp;';

	if (div.attachEvent && div.fireEvent) {
		div.attachEvent(
			'onclick',
			function(){
				SUPPORT_CLONED_EVENTS = true;

				div.detachEvent('onclick', arguments.callee);
			}
		);

		div.cloneNode(true).fireEvent('onclick');
	}

	var SUPPORT_OPTIONAL_TBODY = !div.getElementsByTagName('tbody').length;

	var REGEX_LEADING_WHITE_SPACE = /^\s+/,
		REGEX_IE8_ACTION = /=([^=\x27\x22>\s]+\/)>/g,
		REGEX_TAGNAME = /<([\w:]+)/;

	div = null;

	Node.cssId = prefixSelector;

	Node.formatSelectorNS = formatSelectorNS;

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
A.mix(NODE_PROTO, {
	allNS: function(ns, selector) {
		var instance = this;

		return instance.all(formatSelectorNS(ns, selector));
	},

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
			var el = instance.getDOM();

			if (name in el) {
				instance.set(name, value);
			}
			else {
				instance.setAttribute(name, value);
			}

			return instance;
		}
		else {
			if (isObject(name)) {
				for (var i in name) {
					instance.attr(i, name[i]);
				}

				return instance;
			}

			var currentValue = instance.get(name);

			if (!Lang.isValue(currentValue)) {
				currentValue = instance.getAttribute(name);
			}

			return currentValue;
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

		if (SUPPORT_CLONED_EVENTS) {
			clone = function() {
				var el = this.getDOM();
				var clone;

				if (el.nodeType != 3) {
					var outerHTML = this.outerHTML();

					outerHTML = outerHTML.replace(REGEX_IE8_ACTION, '="$1">').replace(REGEX_LEADING_WHITE_SPACE, STR_EMPTY);

					clone = Node.create(outerHTML);
				}
				else {
					clone = A.one(el.cloneNode());
				}

				return clone;
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
     * <code>val</code> Array, Node, String, or Region, if not specified, the body will be
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
	 * @param {Array | Node | Region | String} val Array, Node, String, or Region to center with
	 */
	center: function(val) {
		var instance = this,
			nodeRegion = instance.get(REGION),
			x,
			y;

		if (isArray(val)) {
			x = val[0];
			y = val[1];
		}
		else {
			var region;

			if (isObject(val) && !A.instanceOf(val, A.Node)) {
				region = val;
			}
			else {
				region = (A.one(val) || A.getBody()).get(REGION);
			}

			x = region.left + (region.width / 2);
			y = region.top + (region.height / 2);
		}

		instance.setXY([x - (nodeRegion.width / 2), y - (nodeRegion.height / 2)]);
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

		instance.all('>*').remove().purge();

		var el = Node.getDOMNode(instance);

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

		return Node.getDOMNode(instance);
	},

	/**
     * Return the combined width of the border for the specified sides.
     *
     * @method getBorderWidth
     * @param {string} sides Can be t, r, b, l or any combination of
     * those to represent the top, right, bottom, or left sides.
     * @return {number}
     */
	getBorderWidth: function(sides) {
		var instance = this;

		return instance._getBoxStyleAsNumber(sides, MAP_BORDER);
	},

	/**
	 * Gets the current center position of the node in page coordinates.
	 * @method getCenterXY
	 * @for Node
	 * @return {Array} The XY position of the node
	*/
	getCenterXY: function() {
		var instance = this;
		var region = instance.get(REGION);

		return [(region.left + region.width/2), (region.top + region.height/2)];
	},

	/**
     * Return the combined size of the margin for the specified sides.
     *
     * @method getMargin
     * @param {string} sides Can be t, r, b, l or any combination of
     * those to represent the top, right, bottom, or left sides.
     * @return {number}
     */
	getMargin: function(sides) {
		var instance = this;

		return instance._getBoxStyleAsNumber(sides, MAP_MARGIN);
	},

	/**
     * Return the combined width of the border for the specified sides.
     *
     * @method getPadding
     * @param {string} sides Can be t, r, b, l or any combination of
     * those to represent the top, right, bottom, or left sides.
     * @return {number}
     */
	getPadding: function(sides) {
		var instance = this;

		return instance._getBoxStyleAsNumber(sides, MAP_PADDING);
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
     * Create a hover interaction.
     *
     * @method hover
     * @param {string} overFn
     * @param {string} outFn
     * @return {Node} The current Node instance
     */
	hover: function(overFn, outFn) {
		var instance = this;

		var hoverOptions;
		var defaultHoverOptions = instance._defaultHoverOptions;

		if (isObject(overFn, true)) {
			hoverOptions = overFn;

			hoverOptions = A.mix(hoverOptions, defaultHoverOptions);

			overFn = hoverOptions.over;
			outFn = hoverOptions.out;
		}
		else {
			hoverOptions = A.mix(
				{
					over: overFn,
					out: outFn
				},
				defaultHoverOptions
			);
		}

		instance._hoverOptions = hoverOptions;

		hoverOptions.overTask = A.debounce(instance._hoverOverTaskFn, null, instance);
		hoverOptions.outTask = A.debounce(instance._hoverOutTaskFn, null, instance);

		return new A.EventHandle(
			[
				instance.on(hoverOptions.overEventType, instance._hoverOverHandler, instance),
				instance.on(hoverOptions.outEventType, instance._hoverOutHandler, instance)
			]
		);
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

	oneNS: function(ns, selector) {
		var instance = this;

		return instance.one(formatSelectorNS(ns, selector));
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

		var temp = Node.create('<div></div>').append(
			this.clone()
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

		var siblings = instance.siblings();

		if (isString(cssClass)) {
			siblings.removeClass(cssClass);

			instance.addClass(cssClass);
		}
		else if (isArray(cssClass)) {
			var siblingNodes = siblings.getDOM();

			var regex = getRegExp('(?:^|\\s+)(?:' + cssClass.join('|') + ')(?=\\s+|$)', 'g');
			var node;

			for (var i = siblingNodes.length - 1; i >= 0; i--) {
				node = siblingNodes[i];
				node.className = node.className.replace(regex, '');
			}

			instance.addClass(cssClass.join(' '));
		}

		return instance;
	},

	/**
	 * Generate an unique identifier and reset the id attribute of the node
     * instance using the new value. Invokes the
     * <a href="Node.html#method_guid">guid</a>.
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
	 * Selects a substring of text inside of the input element.
	 *
	 * @method selectText
	 * @param {Number} start The index to start the selection range from
	 * @param {Number} end The index to end the selection range at
	 */
	selectText: function(start, end) {
		var instance = this;

		var textField = instance.getDOM();
		var length = instance.val().length;

		end = isValue(end) ? end : length;
		start = isValue(start) ? start : 0;

		// Some form elements could throw a (NS_ERROR_FAILURE)
        // [nsIDOMNSHTMLInputElement.setSelectionRange] error when invoke the
        // setSelectionRange on firefox. Wrapping in a try/catch to prevent the error be thrown
		try {
			if (textField.setSelectionRange) {
				textField.setSelectionRange(start, end);
			}
			else if (textField.createTextRange) {
				var range = textField.createTextRange();

				range.moveStart('character', start);
				range.moveEnd('character', end - length);

				range.select();
			}
			else {
				textField.select();
			}

			if (textField != DOC.activeElement) {
				textField.focus();
			}
		}
		catch(e) {}

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
				'MozUserSelect': STR_EMPTY,
				'KhtmlUserSelect': STR_EMPTY
			}
		);

		instance.removeClass(CSS_HELPER_UNSELECTABLE);

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
			AArray.each(
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
     * @param {Boolean} on Whether to force the toggle. Optional.
     * @param {Function} callback A function to run after the visibility change. Optional.
     */
	toggle: function(on, callback) {
		var instance = this;

		instance._toggleView.apply(instance, arguments);

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
     * Return the combined size of the box style for the specified sides.
     *
     * @method _getBoxStyleAsNumber
     * @param {string} sides Can be t, r, b, l or any combination of
     * those to represent the top, right, bottom, or left sides.
     * @param {string} map An object mapping mapping the "sides" param to the a CSS value to retrieve
     * @return {number}
     */
	_getBoxStyleAsNumber: function(sides, map) {
		var instance = this;

		var sidesArray = sides.match(/\w/g);
		var value = 0;
		var side;
		var sideKey;

		for (var i = sidesArray.length - 1; i >= 0; i--) {
			sideKey = sidesArray[i];
			side = 0;

			if (sideKey) {
				side = parseFloat(instance.getComputedStyle(map[sideKey]));
				side = Math.abs(side);

				value += side || 0;
			}
		}

		return value;
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

		return str.join(STR_EMPTY);
	},

	/**
     * The event handler for the "out" function that is fired for events attached via the hover method.
	 *
     * @method _hoverOutHandler
     * @private
     * @param {EventFacade} event
     */
	_hoverOutHandler: function(event) {
		var instance = this;

		var hoverOptions = instance._hoverOptions;

		hoverOptions.outTask.delay(hoverOptions.outDelay, event);
	},

	/**
     * The event handler for the "over" function that is fired for events attached via the hover method.
	 *
     * @method _hoverOverHandler
     * @private
     * @param {EventFacade} event
     */
	_hoverOverHandler: function(event) {
		var instance = this;

		var hoverOptions = instance._hoverOptions;

		hoverOptions.overTask.delay(hoverOptions.overDelay, event);
	},

	/**
     * Cancels the over task, and fires the users custom "out" function for the hover method
	 *
     * @method _hoverOverHandler
     * @private
     * @param {EventFacade} event
     */
	_hoverOutTaskFn: function(event) {
		var instance = this;

		var hoverOptions = instance._hoverOptions;

		hoverOptions.overTask.cancel();

		hoverOptions.out.apply(hoverOptions.context || event.currentTarget, arguments);
	},

	/**
     * Cancels the out task, and fires the users custom "over" function for the hover method
	 *
     * @method _hoverOverHandler
     * @private
     * @param {EventFacade} event
     */
	_hoverOverTaskFn: function(event) {
		var instance = this;

		var hoverOptions = instance._hoverOptions;

		hoverOptions.outTask.cancel();

		hoverOptions.over.apply(hoverOptions.context || event.currentTarget, arguments);
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
			if (isString(newNode)) {
				newNode = Node.create(newNode);
			}

			parent.insertBefore(newNode, refNode);
		}

		return instance;
	},

	_defaultHoverOptions: {
		overEventType: 'mouseenter',
		outEventType: 'mouseleave',
		overDelay: 0,
		outDelay: 0,
		over: Lang.emptyFn,
		out: Lang.emptyFn
	}
}, true);

NODE_PROTO.__show = NODE_PROTO._show;
NODE_PROTO.__hide = NODE_PROTO._hide;
NODE_PROTO.__isHidden = NODE_PROTO._isHidden;

NODE_PROTO._isHidden = function() {
	var instance = this;

	return NODE_PROTO.__isHidden.call(instance) || instance.hasClass(instance._hideClass || CSS_HELPER_HIDDEN);
};
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
NODE_PROTO._hide = function() {
	var instance = this;

	instance.addClass(instance._hideClass || CSS_HELPER_HIDDEN);

	return instance;
};

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
NODE_PROTO._show = function() {
	var instance = this;

	instance.removeClass(instance._hideClass || CSS_HELPER_HIDDEN);

	return instance;
};

/**
 * Returns the width of the content, not including
 * the padding, border or margin. If a width is passed,
 * the node's overall width is set to that size.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.width(); //returns content width
 * node.width(100); // sets box width
 * </code></pre>
 *
 * @method width
 * @return {number}
 */

/**
 * Returns the height of the content, not including
 * the padding, border or margin. If a height is passed,
 * the node's overall height is set to that size.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.height(); //returns content height
 * node.height(100); // sets box height
 * </code></pre>
 *
 * @method height
 * @return {number}
 */

/**
 * Returns the size of the box from inside of the border,
 * which is the offsetWidth plus the padding on the left and right.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.innerWidth();
 * </code></pre>
 *
 * @method innerWidth
 * @return {number}
 */

/**
 * Returns the size of the box from inside of the border,
 * which is offsetHeight plus the padding on the top and bottom.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.innerHeight();
 * </code></pre>
 *
 * @method innerHeight
 * @return {number}
 */

/**
 * Returns the outer width of the box including the border,
 * if true is passed as the first argument, the margin is included.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.outerWidth();
 * node.outerWidth(true); // includes margin
 * </code></pre>
 *
 * @method outerWidth
 * @return {number}
 */

/**
 * Returns the outer height of the box including the border,
 * if true is passed as the first argument, the margin is included.
 *
 * Example:
 *
 * <pre><code>var node = A.one('#nodeId');
 * node.outerHeight();
 * node.outerHeight(true); // includes margin
 * </code></pre>
 *
 * @method outerHeight
 * @return {number}
 */

A.each(
	['Height', 'Width'],
	function(item, index, collection) {
		var sides = index ? 'lr' : 'tb';

		var dimensionType = item.toLowerCase();

		NODE_PROTO[dimensionType] = function(size) {
			var instance = this;

			var returnValue = instance;

			if (isUndefined(size)) {
				var node = instance._node;
				var dimension;

				if (node) {
					if ((!node.tagName && node.nodeType === 9) || node.alert) {
						dimension = instance.get(REGION)[dimensionType];
					}
					else {
						dimension = instance.get(OFFSET + item);

						var previous = {};
						var styleObj = node.style;

						if (!dimension) {
							instance.addClass(CSS_HELPER_FORCE_OFFSET);

							dimension = instance.get(OFFSET + item);

							instance.removeClass(CSS_HELPER_FORCE_OFFSET);
						}

						if (dimension) {
							dimension -= (instance.getPadding(sides) + instance.getBorderWidth(sides));
						}
					}
				}

				returnValue = dimension;
			}
			else {
				instance.setStyle(dimensionType, size);
			}

			return returnValue;
		};

		NODE_PROTO[INNER + item] = function() {
			var instance = this;

			return instance[dimensionType]() + instance.getPadding(sides);
		};

		NODE_PROTO[OUTER + item] = function(margin) {
			var instance = this;

			var innerSize = instance[INNER + item]();
			var borderSize = instance.getBorderWidth(sides);

			var size = innerSize + borderSize;

			if (margin) {
				size += instance.getMargin(sides);
			}

			return size;
		};
	}
);

if (!SUPPORT_OPTIONAL_TBODY) {
	A.DOM._ADD_HTML = A.DOM.addHTML;

	A.DOM.addHTML = function(node, content, where) {
		var nodeName = (node.nodeName && node.nodeName.toLowerCase()) || STR_EMPTY;

		var tagName = STR_EMPTY;

		if (!isUndefined(content)) {
			if (isString(content)) {
				tagName = (REGEX_TAGNAME.exec(content) || ARRAY_EMPTY_STRINGS)[1];
			}
			else if (content.nodeType && content.nodeType == 11 && content.childNodes.length) { // a doc frag
				tagName = content.childNodes[0].nodeName;
			}
			else if (content.nodeName) { // a node
				tagName = content.nodeName;
			}

			tagName = tagName && tagName.toLowerCase();
		}

		if (nodeName == 'table' && tagName == 'tr') {
			node = node.getElementsByTagName('tbody')[0] || node.appendChild(node.ownerDocument.createElement('tbody'));

			var whereNodeName = ((where && where.nodeName) || STR_EMPTY).toLowerCase();

			// Assuming if the "where" is a tbody node,
			// we're trying to prepend to a table. Attempt to
			// grab the first child of the tbody.
			if (whereNodeName == 'tbody' && where.childNodes.length > 0) {
				where = where.firstChild;
			}
		}

		return A.DOM._ADD_HTML(node, content, where);
	};
}

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
NodeList.importMethod(
	NODE_PROTO,
	[
		'after',

		'appendTo',

		'attr',

		'before',

		'empty',

		'hover',

		'html',

		'innerHeight',

		'innerWidth',

		'outerHeight',

		'outerHTML',

		'outerWidth',

		'prepend',

		'prependTo',

		'purge',

		'selectText',

		'selectable',

		'text',

		'toggle',

		'unselectable',

		'val'
	]
);

A.mix(
	NODELIST_PROTO,
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

			newNodeList = AArray.unique(newNodeList);

			return A.all(newNodeList);
		},

		allNS: function(ns, selector) {
			var instance = this;

			return instance.all(formatSelectorNS(ns, selector));
		},

		/**
		 * Returns the first element in the node list collection.
		 *
		 * @method first
		 * @return {Node}
		 */
		first: function() {
			var instance = this;

			return instance.item(0);
		},

		/**
	     * See <a href="Node.html#method_getDOM">Node getDOM</a>.
	     *
	     * @method getDOM
	     */
		getDOM: function() {
			var instance = this;

			return NodeList.getDOMNodes(this);
		},

		/**
		 * Returns the last element in the node list collection.
		 *
		 * @method last
		 * @return {Node}
		 */
		last: function() {
			var instance = this;

			return instance.item(instance._nodes.length - 1);
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
		},

		oneNS: function(ns, selector) {
			var instance = this;

			return instance.one(formatSelectorNS(ns, selector));
		}
	}
);

NODELIST_PROTO.__filter = NODELIST_PROTO.filter;

NODELIST_PROTO.filter = function(value, context) {
	var instance = this;

	var newNodeList;

	if (isFunction(value)) {
		var nodes = [];

		instance.each(
			function(item, index, collection) {
				if (value.call(context || item, item, index, collection)) {
					nodes.push(item._node);
				}
			}
		);

		newNodeList = A.all(nodes);
	}
	else {
		newNodeList = NODELIST_PROTO.__filter.call(instance, value);
	}

	return newNodeList;
};

A.mix(
	NodeList,
	{
		create: function(html) {
			var docFrag = A.getDoc().invoke(CREATE_DOCUMENT_FRAGMENT);

			return docFrag.append(html).get(CHILD_NODES);
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
				instance._bodyNode = A.one(DOC.body);
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
				instance._documentNode = A.one(DOC);
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
				instance._windowNode = A.one(WIN);
			}

			return instance._windowNode;
		}
	}
);

A.queryNS = function(ns, selector, methodName) {
	return A[methodName || 'one'](formatSelectorNS(ns, selector));
};

A.oneNS = A.queryNS;

A.allNS = function(ns, selector) {
	return A.queryNS(ns, selector, 'all');
}

A.byIdNS = function(ns, id) {
	return A.one(prefixSelector(ns, id));
};

// Patch for http://yuilibrary.com/projects/yui3/ticket/2531537

var addMethod = NodeList.addMethod;

AArray.each(
	['hide', 'show'],
	function(item, index, collection) {
		addMethod(
			item,
			function() {
				return this[item].apply(this, arguments);
			}
		);
	}
);

}, '@VERSION@' ,{requires:['array-extras','aui-base-lang','aui-classnamemanager','node']});
