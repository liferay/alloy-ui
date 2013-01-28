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
		HTML5._fragHTML5Shived = YUI.AUI.html5shiv(
			A.config.doc.createDocumentFragment()
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
var CONFIG = A.config,
	DOC = CONFIG.doc,
	WIN = CONFIG.win,
	UA = A.UA,
	IE = UA.ie,

	isShivDisabled = function() {
		return WIN.AUI_HTML5_IE === false;
	};

if (!IE || IE >= 9 || isShivDisabled()) {
	return;
}

var BUFFER_CSS_TEXT = [],

	CSS_PRINTFIX = 'aui-printfix',
	CSS_PRINTFIX_PREFIX = 'aui-printfix-',

	LOCATION = WIN.location,

	DOMAIN = LOCATION.protocol + '//' + LOCATION.host,

	GLOBAL_AUI = YUI.AUI,

	HTML = DOC.documentElement,

	HTML5_ELEMENTS = GLOBAL_AUI.HTML5_ELEMENTS,
	HTML5_ELEMENTS_LENGTH = HTML5_ELEMENTS.length,
	HTML5_ELEMENTS_LIST = HTML5_ELEMENTS.join('|'),

	REGEX_CLONE_NODE_CLEANUP = new RegExp('<(/?):(' + HTML5_ELEMENTS_LIST + ')', 'gi'),
	REGEX_ELEMENTS = new RegExp('(' + HTML5_ELEMENTS_LIST + ')', 'gi'),
	REGEX_ELEMENTS_FAST = new RegExp('\\b(' + HTML5_ELEMENTS_LIST + ')\\b', 'i'),

	REGEX_PRINT_MEDIA = /print|all/,

	REGEX_RULE = new RegExp('(^|[^\\n{}]*?\\s)(' + HTML5_ELEMENTS_LIST + ').*?{([^}]*)}', 'gim'),
	REGEX_TAG = new RegExp('<(\/*)(' + HTML5_ELEMENTS_LIST + ')', 'gi'),

	SELECTOR_REPLACE_RULE = '.' + CSS_PRINTFIX_PREFIX + '$1',

	STR_ALL = 'all',
	STR_BLANK = ' ',
	STR_EMPTY = '',

	STR_BRACKET_OPEN = '{',
	STR_BRACKET_CLOSE = '}',

	STR_CHECKBOX = 'checkbox',
	STR_CHECKED = 'checked',
	STR_HTTPS = 'https',
	STR_IFRAME = 'IFRAME',
	STR_INPUT = 'INPUT',
	STR_OPTION = 'OPTION',
	STR_RADIO = 'radio',
	STR_SELECTED = 'selected',
	STR_STAR = '*',
	STR_URL = 'url(',
	STR_URL_DOMAIN = STR_URL + DOMAIN,

	TAG_REPLACE_ORIGINAL = '<$1$2',
	TAG_REPLACE_FONT = '<$1font';

var html5shiv = GLOBAL_AUI.html5shiv,
	// Yes, IE does this wackiness; converting an object
	// to a string should never result in undefined, but
	// IE's styleSheet object sometimes becomes inaccessible
	// after trying to print the second time
	isStylesheetDefined = function(obj) {
		return obj && (obj + STR_EMPTY !== undefined);
	},

	toggleNode = function(node, origNode, prop) {
		var state = origNode[prop];

		if (state) {
			node.setAttribute(prop, state);
		}
		else {
			node.removeAttribute(prop);
		}
	};

	html5shiv(DOC);

var PrintFix = function() {
	var afterPrint = function() {
		if (isShivDisabled()) {
			destroy();
		}
		else {
			PrintFix.onAfterPrint();
		}
	};

	var beforePrint = function() {
		if (isShivDisabled()) {
			destroy();
		}
		else {
			PrintFix.onBeforePrint();
		}
	};

	var destroy = function() {
		WIN.detachEvent('onafterprint', afterPrint);
		WIN.detachEvent('onbeforeprint', beforePrint);
	};

	var init = function() {
		WIN.attachEvent('onafterprint', afterPrint);
		WIN.attachEvent('onbeforeprint', beforePrint);
	};

	init();

	PrintFix.destroy = destroy;
	PrintFix.init = init;
};

A.mix(
	PrintFix,
	{
		onAfterPrint: function() {
			var instance = this;

			instance.restoreHTML();

			var styleSheet = instance._getStyleSheet();

			styleSheet.styleSheet.cssText = STR_EMPTY;
		},

		onBeforePrint: function() {
			var instance = this;

			var styleSheet = instance._getStyleSheet();
			var cssRules = instance._getAllCSSText();

			styleSheet.styleSheet.cssText = instance.parseCSS(cssRules);

			instance.writeHTML();
		},

		parseCSS: function(cssText) {
			var instance = this;

			var css = STR_EMPTY;
			var rules = cssText.match(REGEX_RULE);

			if (rules) {
				css = rules.join('\n').replace(REGEX_ELEMENTS, SELECTOR_REPLACE_RULE);
			}

			return css;
		},

		restoreHTML: function() {
			var instance = this;

			var bodyClone = instance._getBodyClone();
			var bodyEl = instance._getBodyEl();

			var newNodes = bodyClone.getElementsByTagName(STR_IFRAME);
			var originalNodes = bodyEl.getElementsByTagName(STR_IFRAME);

			var length = originalNodes.length;

			// Moving IFRAME nodes back to their original position
			if (length == newNodes.length) {
				while (length--) {
					var newNode = newNodes[length];
					var originalNode = originalNodes[length];

					originalNode.swapNode(newNode);
				}
			}

			bodyClone.innerHTML = STR_EMPTY;

			HTML.removeChild(bodyClone);
			HTML.appendChild(bodyEl);
		},

		writeHTML: function() {
			var instance = this;

			var i = -1;
			var j;

			var bodyEl = instance._getBodyEl();

			var html5Element;

			var cssClass;

			var nodeList;
			var nodeListLength;
			var node;
			var buffer = [];

			while (++i < HTML5_ELEMENTS_LENGTH) {
				html5Element = HTML5_ELEMENTS[i];

				nodeList = DOC.getElementsByTagName(html5Element);
				nodeListLength = nodeList.length;

				j = -1;

				while (++j < nodeListLength) {
					node = nodeList[j];

					cssClass = node.className;

					if (cssClass.indexOf(CSS_PRINTFIX_PREFIX) == -1) {
						buffer[0] = CSS_PRINTFIX_PREFIX + html5Element;
						buffer[1] = cssClass;

						node.className = buffer.join(STR_BLANK);
					}
				}
			}

			var docFrag = instance._getDocFrag();
			var bodyClone = instance._getBodyClone();

			docFrag.appendChild(bodyEl);
			HTML.appendChild(bodyClone);

			bodyClone.className = bodyEl.className;
			bodyClone.id = bodyEl.id;

			var originalNodes = bodyEl.getElementsByTagName(STR_STAR);
			var length = originalNodes.length;

			// IE will throw a mixed content warning when using https
			// and calling clone node if the body contains elements with
			// an inline background-image style that is relative to the domain.
			if (UA.secure) {
				var bodyElStyle = bodyEl.style;

				var elStyle;
				var backgroundImage;

				bodyElStyle.display = 'none';

				for (i = 0; i < length; i++) {
					elStyle = originalNodes[i].style;

					backgroundImage = elStyle.backgroundImage;

					if (backgroundImage &&
						backgroundImage.indexOf(STR_URL) > -1 &&
						backgroundImage.indexOf(STR_HTTPS) == -1) {

						elStyle.backgroundImage = backgroundImage.replace(STR_URL, STR_URL_DOMAIN);
					}
				}

				bodyElStyle.display = STR_EMPTY;
			}

			var bodyElClone = bodyEl.cloneNode(true);

			var newNodes = bodyElClone.getElementsByTagName(STR_STAR);

			if (length == newNodes.length) {
				while (length--) {
					var newNode = newNodes[length];
					var newNodeName = newNode.nodeName;

					if (newNodeName == STR_INPUT || newNodeName == STR_OPTION || newNodeName == STR_IFRAME) {
						var originalNode = originalNodes[length];
						var originalNodeName = originalNode.nodeName;

						if (originalNodeName == newNodeName) {
							var prop = null;

							if (newNodeName == STR_OPTION) {
								prop = STR_SELECTED;
							}
							else if (newNodeName == STR_INPUT && (newNode.type == STR_CHECKBOX || newNode.type == STR_RADIO)) {
								prop = STR_CHECKED;
							}
							else if (newNodeName == STR_IFRAME) {
								newNode.src = STR_EMPTY;
							}

							if (prop !== null) {
								toggleNode(newNode, originalNode, prop);
							}
						}
					}
				}
			}

			var bodyHTML = bodyElClone.innerHTML;

			bodyHTML = bodyHTML.replace(REGEX_CLONE_NODE_CLEANUP, TAG_REPLACE_ORIGINAL).replace(REGEX_TAG, TAG_REPLACE_FONT);

			bodyClone.innerHTML = bodyHTML;

			// Post processing the DOM in order to move IFRAME nodes

			newNodes = bodyClone.getElementsByTagName(STR_IFRAME);
			originalNodes = bodyEl.getElementsByTagName(STR_IFRAME);

			length = originalNodes.length;

			if (length == newNodes.length) {
				while (length--) {
					var newNode = newNodes[length];
					var originalNode = originalNodes[length];

					// According to quirksmode.org, swapNode is supported on all major IE versions
					originalNode.swapNode(newNode);
				}
			}
		},

		_getAllCSSText: function() {
			var instance = this;

			var buffer = [];
			var styleSheets = instance._getAllStyleSheets(DOC.styleSheets, STR_ALL);
			var rule;
			var cssText;

			for (var i = 0; styleSheet = styleSheets[i]; i++) {
				var rules = styleSheet.rules;

				if (rules && rules.length) {
					for (var j = 0, ruleLength = rules.length; j < ruleLength; j++) {
						rule = rules[j];

						if (!rule.href) {
							cssText = instance._getCSSTextFromRule(rule);

							buffer.push(cssText);
						}
					}
				}
			}

			return buffer.join(STR_BLANK);
		},

		_getCSSTextFromRule: function(rule) {
			var instance = this;

			var cssText = STR_EMPTY;

			var ruleStyle = rule.style;
			var ruleCSSText;
			var ruleSelectorText;

			if (ruleStyle && (ruleCSSText = ruleStyle.cssText) && (ruleSelectorText = rule.selectorText) && REGEX_ELEMENTS_FAST.test(ruleSelectorText)) {
				BUFFER_CSS_TEXT.length = 0;

				BUFFER_CSS_TEXT.push(ruleSelectorText, STR_BRACKET_OPEN, ruleCSSText, STR_BRACKET_CLOSE);

				cssText = BUFFER_CSS_TEXT.join(STR_BLANK);
			}

			return cssText;
		},

		_getAllStyleSheets: function(styleSheet, mediaType, level, buffer) {
			var instance = this;

			level = level || 1;

			buffer = buffer || [];

			var i;

			if (isStylesheetDefined(styleSheet)) {
				var imports = styleSheet.imports;

				mediaType = styleSheet.mediaType || mediaType;

				if (REGEX_PRINT_MEDIA.test(mediaType)) {
					var length;

					// IE can crash when trying to access imports more than 3 levels deep
					if (level <= 3 && isStylesheetDefined(imports) && imports.length) {
						for (i = 0, length = imports.length; i < length; i++) {
							instance._getAllStyleSheets(imports[i], mediaType, level + 1, buffer);
						}
					}
					else if (styleSheet.length) {
						for (i = 0, length = styleSheet.length; i < length; i++) {
							instance._getAllStyleSheets(styleSheet[i], mediaType, level, buffer);
						}
					}
					else {
						var rules = styleSheet.rules;
						var ruleStyleSheet;

						if (rules && rules.length) {
							for (i = 0, length = rules.length; i < length; i++) {
								ruleStyleSheet = rules[i].styleSheet;

								if (ruleStyleSheet) {
									instance._getAllStyleSheets(ruleStyleSheet, mediaType, level, buffer);
								}
							}
						}
					}

					if (!styleSheet.disabled && styleSheet.rules) {
						buffer.push(styleSheet);
					}
				}
			}

			mediaType = STR_ALL;

			return buffer;
		},

		_getBodyEl: function() {
			var instance = this;

			var bodyEl = instance._bodyEl;

			if (!bodyEl) {
				bodyEl = DOC.body;

				instance._bodyEl = bodyEl;
			}

			return bodyEl;
		},

		_getBodyClone: function() {
			var instance = this;

			var bodyClone = instance._bodyClone;

			if (!bodyClone) {
				bodyClone = DOC.createElement('body');

				instance._bodyClone = bodyClone;
			}

			return bodyClone;
		},

		_getDocFrag: function() {
			var instance = this;

			var docFrag = instance._docFrag;

			if (!docFrag) {
				docFrag = DOC.createDocumentFragment();

				html5shiv(docFrag);

				instance._docFrag = docFrag;
			}

			return docFrag;
		},

		_getStyleSheet: function() {
			var instance = this;

			var styleSheet = instance._styleSheet;

			if (!styleSheet) {
				styleSheet = DOC.createElement('style');

				var head = DOC.documentElement.firstChild;

				head.insertBefore(styleSheet, head.firstChild);

				styleSheet.media = 'print';
				styleSheet.className = CSS_PRINTFIX;

				instance._styleSheet = styleSheet;
			}

			return styleSheet;
		}
	}
);

A.namespace('HTML5').PrintFix = PrintFix;

PrintFix();

}, '@VERSION@' ,{requires:['aui-node-html5']});


AUI.add('aui-node', function(A){}, '@VERSION@' ,{skinnable:false, use:['aui-node-base','aui-node-html5','aui-node-html5-print']});

