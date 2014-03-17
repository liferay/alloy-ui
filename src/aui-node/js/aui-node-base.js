/**
 * A set of utility methods to the Node.
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
    ANode = A.Node,
    ANodeList = A.NodeList,

    getClassName = A.getClassName,
    getRegExp = A.DOM._getRegExp,

    CONFIG = A.config,
    DOC = CONFIG.doc,
    WIN = CONFIG.win,

    NODE_PROTO = ANode.prototype,
    NODE_PROTO_HIDE = NODE_PROTO._hide,
    NODE_PROTO_SHOW = NODE_PROTO._show,
    NODELIST_PROTO = ANodeList.prototype,

    ARRAY_EMPTY_STRINGS = ['', ''],

    CSS_FORCE_OFFSET = getClassName('force', 'offset'),
    CSS_HIDE = getClassName('hide'),
    CSS_UNSELECTABLE = getClassName('unselectable'),

    SUPPORT_CLONED_EVENTS = false,

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
    };

/* Parts of this file are used from jQuery (http://jquery.com)
 * Dual-licensed under MIT/GPL
 */
var div = DOC.createElement('div');

div.style.display = 'none';
div.innerHTML = '   <table></table>&nbsp;';

if (div.attachEvent && div.fireEvent) {
    div.attachEvent(
        'onclick',
        function detach() {
            SUPPORT_CLONED_EVENTS = true;

            div.detachEvent('onclick', detach);
        }
    );

    div.cloneNode(true).fireEvent('onclick');
}

var SUPPORT_OPTIONAL_TBODY = !div.getElementsByTagName('tbody').length;

var REGEX_LEADING_WHITE_SPACE = /^\s+/,
    REGEX_IE8_ACTION = /\=([^=\x27\x22>\s]+\/)>/g,
    REGEX_TAGNAME = /<([\w:]+)/;

div = null;

var _setUnselectable = function(element, unselectable, noRecurse) {
    var descendants,
        value = unselectable ? 'on' : '',
        i,
        descendant;

    element.setAttribute('unselectable', value);

    if (!noRecurse) {
        descendants = element.getElementsByTagName('*');

        for (i = 0;
            (descendant = descendants[i]); i++) {
            descendant.setAttribute('unselectable', value);
        }
    }
};

/**
 * Augments the [YUI3 Node](Node.html) with more util methods.
 *
 * Check the [live demo](http://alloyui.com/examples/node/).
 *
 * @class A.Node
 * @uses Node
 * @constructor
 * @include http://alloyui.com/examples/node/basic-markup.html
 * @include http://alloyui.com/examples/node/basic.js
 */
A.mix(NODE_PROTO, {

    /**
     * Returns the current ancestors of the node element. If a selector is
     * specified, the ancestors are filtered to match the selector.
     *
     * Example:
     *
     * ```
     * A.one('#nodeId').ancestors('div');
     * ```
     *
     * @method ancestors
     * @param {String} selector A selector to filter the ancestor elements
     *     against.
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
     * Returns the current ancestors of the node element filtered by a
     * className. This is an optimized method for finding ancestors by a
     * specific CSS class name.
     *
     * Example:
     *
     * ```
     * A.one('#nodeId').ancestorsByClassName('aui-hide');
     * ```
     *
     * @method ancestorsByClassName
     * @param {String} className A selector to filter the ancestor elements
     *     against.
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
     * Gets or sets the value of an attribute for the first element in the set
     * of matched elements. If only the `name` is passed it works as a getter.
     *
     * Example:
     *
     * ```
     * var node = A.one('#nodeId');
     * node.attr('title', 'Setting a new title attribute');
     * // Alert the value of the title attribute: 'Setting a new title attribute'
     * alert( node.attr('title') );
     * ```
     *
     * @method attr
     * @param {String} name The name of the attribute
     * @param {String} value The value of the attribute to be set. Optional.
     * @return {String}
     */
    attr: function(name, value) {
        var instance = this,
            i;

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
                for (i in name) {
                    if (name.hasOwnProperty(i)) {
                        instance.attr(i, name[i]);
                    }
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
     * Normalizes the behavior of cloning a node, which by default should not
     * clone the events that are attached to it.
     *
     * Example:
     *
     * ```
     * var node = A.one('#nodeId');
     * node.clone().appendTo('body');
     * ```
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

                if (el.nodeType !== 3) {
                    var outerHTML = this.outerHTML();

                    outerHTML = outerHTML.replace(REGEX_IE8_ACTION, '="$1">').replace(REGEX_LEADING_WHITE_SPACE,
                        '');

                    clone = ANode.create(outerHTML);
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
    }()),

    /**
     * Centralizes the current Node instance with the passed `val` Array, Node,
     * String, or Region, if not specified, the body will be used.
     *
     * Example:
     *
     * ```
     * var node = A.one('#nodeId');
     * // Center the `node` with the `#container`.
     * node.center('#container');
     * ```
     *
     * @method center
     * @chainable
     * @param {Array|Node|Region|String} val Array, Node, String, or Region to
     *     center with.
     */
    center: function(val) {
        var instance = this,
            nodeRegion = instance.get('region'),
            x,
            y;

        if (isArray(val)) {
            x = val[0];
            y = val[1];
        }
        else {
            var region;

            if (isObject(val) && !A.instanceOf(val, ANode)) {
                region = val;
            }
            else {
                region = (A.one(val) || A.getBody()).get('region');
            }

            x = region.left + (region.width / 2);
            y = region.top + (region.height / 2);
        }

        instance.setXY([x - (nodeRegion.width / 2), y - (nodeRegion.height / 2)]);
    },

    /**
     * Removes not only child (and other descendant) elements, but also any text
     * within the set of matched elements. This is because, according to the DOM
     * specification, any string of text within an element is considered a child
     * node of that element.
     *
     * Example:
     *
     * ```
     * var node = A.one('#nodeId');
     * node.empty();
     * ```
     *
     * @method empty
     * @chainable
     */
    empty: function() {
        var instance = this;

        instance.all('>*').remove().purge();

        var el = ANode.getDOMNode(instance);

        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }

        return instance;
    },

    /**
     * Retrieves the DOM node bound to a Node instance. See
     * [getDOMNode](Node.html#method_getDOMNode).
     *
     * @method getDOM
     * @return {HTMLNode} The DOM node bound to the Node instance.
     */
    getDOM: function() {
        var instance = this;

        return ANode.getDOMNode(instance);
    },

    /**
     * Returns the combined width of the border for the specified sides.
     *
     * @method getBorderWidth
     * @param {String} sides Can be t, r, b, l or any combination of those to
     *     represent the top, right, bottom, or left sides.
     * @return {Number}
     */
    getBorderWidth: function(sides) {
        var instance = this;

        return instance._getBoxStyleAsNumber(sides, MAP_BORDER);
    },

    /**
     * Gets the current center position of the node in page coordinates.
     *
     * @method getCenterXY
     * @for Node
     * @return {Array} The XY position of the node
     */
    getCenterXY: function() {
        var instance = this;
        var region = instance.get('region');

        return [(region.left + region.width / 2), (region.top + region.height / 2)];
    },

    /**
     * Returns the combined size of the margin for the specified sides.
     *
     * @method getMargin
     * @param {String} sides Can be t, r, b, l or any combination of those to
     *     represent the top, right, bottom, or left sides.
     * @return {Number}
     */
    getMargin: function(sides) {
        var instance = this;

        return instance._getBoxStyleAsNumber(sides, MAP_MARGIN);
    },

    /**
     * Returns the combined width of the border for the specified sides.
     *
     * @method getPadding
     * @param {String} sides Can be t, r, b, l or any combination of those to
     *     represent the top, right, bottom, or left sides.
     * @return {Number}
     */
    getPadding: function(sides) {
        var instance = this;

        return instance._getBoxStyleAsNumber(sides, MAP_PADDING);
    },

    /**
     * Sets the id of the Node instance if the object does not have one. The
     * generated id is based on a guid created by the
     * [stamp](YUI.html#method_stamp) method.
     *
     * @method guid
     * @return {String} The current id of the node
     */
    guid: function() {
        var instance = this;
        var currentId = instance.get('id');

        if (!currentId) {
            currentId = A.stamp(instance);

            instance.set('id', currentId);
        }

        return currentId;
    },

    /**
     * Creates a hover interaction.
     *
     * @method hover
     * @param {String} overFn
     * @param {String} outFn
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
            hoverOptions = A.mix({
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
     * Gets or sets the HTML contents of the node. If the `value` is passed it's
     * set the content of the element, otherwise it works as a getter for the
     * current content.
     *
     * Example:
     *
     * ```
     * var node = A.one('#nodeId');
     * node.html('Setting new HTML');
     * // Alert the value of the current content
     * alert( node.html() );
     * ```
     *
     * @method html
     * @param {String} value A string of html to set as the content of the node
     *     instance.
     */
    html: function() {
        var args = arguments,
            length = args.length;

        if (length) {
            this.set('innerHTML', args[0]);
        }
        else {
            return this.get('innerHTML');
        }

        return this;
    },

    /**
     * Gets the outerHTML of a node, which islike innerHTML, except that it
     * actually contains the HTML of the node itself.
     *
     * @method outerHTML
     * @return {string} The outerHTML of the given element.
     */
    outerHTML: function() {
        var instance = this;
        var domEl = instance.getDOM();

        // IE, Opera and WebKit all have outerHTML.
        if ('outerHTML' in domEl) {
            return domEl.outerHTML;
        }

        var temp = ANode.create('<div></div>').append(
            this.clone()
        );

        try {
            return temp.html();
        }
        catch (e) {}
        finally {
            temp = null;
        }
    },

    /**
     * Inserts a `newNode` after the node instance (i.e., as the next sibling).
     * If the reference node has no parent, then does nothing.
     *
     * Example:
     *
     * ```
     * var titleNode = A.one('#titleNode');
     * var descriptionNode = A.one('#descriptionNode');
     * // the description is usually shown after the title
     * titleNode.placeAfter(descriptionNode);
     * ```
     *
     * @method placeAfter
     * @chainable
     * @param {Node} newNode Node to insert.
     */
    placeAfter: function(newNode) {
        var instance = this;

        return instance._place(newNode, instance.get('nextSibling'));
    },

    /**
     * Inserts a `newNode` before the node instance (i.e., as the previous
     * sibling). If the reference node has no parent, then does nothing.
     *
     * Example:
     *
     * ```
     * var descriptionNode = A.one('#descriptionNode');
     * var titleNode = A.one('#titleNode');
     * // the title is usually shown before the description
     * descriptionNode.placeBefore(titleNode);
     * ```
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
     * Inserts the node instance to the begining of the `selector` node (i.e.,
     * insert before the `firstChild` of the `selector`).
     *
     * Example:
     *
     * ```
     * var node = A.one('#nodeId');
     * node.prependTo('body');
     * ```
     *
     * @method prependTo
     * @chainable
     * @param {Node|String} selector A selector, element, HTML string, Node
     */
    prependTo: function(selector) {
        var instance = this;

        A.one(selector).prepend(instance);

        return instance;
    },

    /**
     * Adds one or more CSS classes to an element and remove the class(es) from
     * the siblings of the element.
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

            var regex = getRegExp('(?:^|\\s+)(?:' + cssClass.join('|') + ')(?=\\s+|$)', 'g'),
                node,
                i;

            for (i = siblingNodes.length - 1; i >= 0; i--) {
                node = siblingNodes[i];
                node.className = node.className.replace(regex, '');
            }

            instance.addClass(cssClass.join(' '));
        }

        return instance;
    },

    /**
     * Generates an unique identifier and reset the id attribute of the node
     * instance using the new value. Invokes the [guid](Node.html#method_guid).
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
        // setSelectionRange on firefox. Wrapping in a try/catch to prevent the
        // error be thrown
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

            if (textField !== DOC.activeElement) {
                textField.focus();
            }
        }
        catch (e) {}

        return instance;
    },

    /**
     * Enables text selection for this element (normalized across browsers).
     *
     * @method selectable
     * @param noRecurse
     * @chainable
     */
    selectable: function(noRecurse) {
        var instance = this;

        instance.removeClass(CSS_UNSELECTABLE);

        if (A.UA.ie || A.UA.opera) {
            _setUnselectable(instance._node, false, noRecurse);
        }

        return instance;
    },

    /**
     * Stops the specified event(s) from bubbling and optionally prevents the
     * default action.
     *
     * Example:
     *
     * ```
     * var anchor = A.one('a#anchorId');
     * anchor.swallowEvent('click');
     * ```
     *
     * @method swallowEvent
     * @chainable
     * @param {String|Array} eventName An event or array of events to stop from
     *     bubbling
     * @param {Boolean} preventDefault (optional) true to prevent the default
     *     action too
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

        if (isArray(eventName)) {
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
     * Gets or sets the combined text contents of the node instance, including
     * it's descendants. If the `text` is passed it's set the content of the
     * element, otherwise it works as a getter for the current content.
     *
     * Example:
     *
     * ```
     * var node = A.one('#nodeId');
     * node.text('Setting new text content');
     * // Alert the value of the current content
     * alert( node.text() );
     * ```
     *
     * @method text
     * @param {String} text A string of text to set as the content of the node
     *     instance.
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
     * Displays or hide the node instance.
     *
     * NOTE: This method assume that your node were hidden because of the
     * 'aui-hide' css class were being used. This won't manipulate the inline
     * `style.display` property.
     *
     * @method toggle
     * @chainable
     * @param {Boolean} on Whether to force the toggle. Optional.
     * @param {Function} callback A function to run after the visibility change.
     *     Optional.
     */
    toggle: function() {
        var instance = this;

        instance._toggleView.apply(instance, arguments);

        return instance;
    },

    /**
     * Disables text selection for this element (normalized across browsers).
     *
     * @method unselectable
     * @param noRecurse
     * @chainable
     */
    unselectable: function(noRecurse) {
        var instance = this;

        instance.addClass(CSS_UNSELECTABLE);

        if (A.UA.ie || A.UA.opera) {
            _setUnselectable(instance._node, true, noRecurse);
        }

        return instance;
    },

    /**
     * Gets or sets the value attribute of the node instance. If the `value` is
     * passed it's set the value of the element, otherwise it works as a getter
     * for the current value.
     *
     * Example:
     *
     * ```
     * var input = A.one('#inputId');
     * input.val('Setting new input value');
     * // Alert the value of the input
     * alert( input.val() );
     * ```
     *
     * @method val
     * @param {String} value Value to be set. Optional.
     */
    val: function(value) {
        var instance = this;

        if (isUndefined(value)) {
            return instance.get('value');
        }
        else {
            return instance.set('value', value);
        }
    },

    /**
     * Returns the combined size of the box style for the specified sides.
     *
     * @method _getBoxStyleAsNumber
     * @param {String} sides Can be t, r, b, l or any combination of
     * those to represent the top, right, bottom, or left sides.
     * @param {String} map An object mapping mapping the "sides" param to the a
     *     CSS value to retrieve
     * @return {Number}
     * @private
     */
    _getBoxStyleAsNumber: function(sides, map) {
        var instance = this;

        var sidesArray = sides.match(/\w/g),
            value = 0,
            side,
            sideKey,
            i;

        for (i = sidesArray.length - 1; i >= 0; i--) {
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
     * Extracts text content from the passed nodes.
     *
     * @method _getText
     * @private
     * @param {Native NodeList} childNodes
     */
    _getText: function(childNodes) {
        var instance = this;

        var length = childNodes.length,
            childNode,
            str = [],
            i;

        for (i = 0; i < length; i++) {
            childNode = childNodes[i];

            if (childNode && childNode.nodeType !== 8) {
                if (childNode.nodeType !== 1) {
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
     * Overrides Y.Node._hide. Adds aui-hide to the node's cssClass
     *
     * @method _hide
     * @private
     */
    _hide: function() {
        var instance = this;

        instance.addClass(CSS_HIDE);

        return NODE_PROTO_HIDE.apply(instance, arguments);
    },

    /**
     * The event handler for the "out" function that is fired for events
     * attached via the hover method.
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
     * The event handler for the "over" function that is fired for events
     * attached via the hover method.
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
     * Cancels the over task, and fires the users custom "out" function for the
     * hover method
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
     * Cancels the out task, and fires the users custom "over" function for the
     * hover method
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
     * Places a node or html string at a specific location
     *
     * @method _place
     * @private
     * @param {Node|String} newNode
     * @param {Node} refNode
     */
    _place: function(newNode, refNode) {
        var instance = this;

        var parent = instance.get('parentNode');

        if (parent) {
            if (isString(newNode)) {
                newNode = ANode.create(newNode);
            }

            parent.insertBefore(newNode, refNode);
        }

        return instance;
    },

    /**
     * Overrides Y.Node._show. Removes aui-hide from the node's cssClass
     *
     * @method _show
     * @private
     */
    _show: function() {
        var instance = this;

        instance.removeClass(CSS_HIDE);

        return NODE_PROTO_SHOW.apply(instance, arguments);
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

NODE_PROTO.__isHidden = NODE_PROTO._isHidden;

NODE_PROTO._isHidden = function() {
    var instance = this;

    return NODE_PROTO.__isHidden.call(instance) || instance.hasClass(instance._hideClass || CSS_HIDE);
};

/**
 * Returns the width of the content, not including the padding, border or
 * margin. If a width is passed, the node's overall width is set to that size.
 *
 * Example:
 *
 * ```
 * var node = A.one('#nodeId');
 * node.width(); //return content width
 * node.width(100); // sets box width
 * ```
 *
 * @method width
 * @return {number}
 */

/**
 * Returns the height of the content, not including the padding, border or
 * margin. If a height is passed, the node's overall height is set to that size.
 *
 * Example:
 *
 * ```
 * var node = A.one('#nodeId');
 * node.height(); //return content height
 * node.height(100); // sets box height
 * ```
 *
 * @method height
 * @return {number}
 */

/**
 * Returns the size of the box from inside of the border, which is the
 * `offsetWidth` plus the padding on the left and right.
 *
 * Example:
 *
 * ```
 * var node = A.one('#nodeId');
 * node.innerWidth();
 * ```
 *
 * @method innerWidth
 * @return {number}
 */

/**
 * Returns the size of the box from inside of the border, which is offsetHeight
 * plus the padding on the top and bottom.
 *
 * Example:
 *
 * ```
 * var node = A.one('#nodeId');
 * node.innerHeight();
 * ```
 *
 * @method innerHeight
 * @return {number}
 */

/**
 * Returns the outer width of the box including the border, if true is passed as
 * the first argument, the margin is included.
 *
 * Example:
 *
 * ```
 * var node = A.one('#nodeId');
 * node.outerWidth();
 * node.outerWidth(true); // includes margin
 * ```
 *
 * @method outerWidth
 * @return {number}
 */

/**
 * Returns the outer height of the box including the border, if true is passed
 * as the first argument, the margin is included.
 *
 * Example:
 *
 * ```
 * var node = A.one('#nodeId');
 * node.outerHeight();
 * node.outerHeight(true); // includes margin
 * ```
 *
 * @method outerHeight
 * @return {number}
 */

A.each(
 ['Height', 'Width'],
    function(item, index) {
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
                        dimension = instance.get('region')[dimensionType];
                    }
                    else {
                        dimension = instance.get('offset' + item);

                        if (!dimension) {
                            instance.addClass(CSS_FORCE_OFFSET);

                            dimension = instance.get('offset' + item);

                            instance.removeClass(CSS_FORCE_OFFSET);
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

        NODE_PROTO['inner' + item] = function() {
            var instance = this;

            return instance[dimensionType]() + instance.getPadding(sides);
        };

        NODE_PROTO['outer' + item] = function(margin) {
            var instance = this;

            var innerSize = instance['inner' + item]();
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
        var nodeName = (node.nodeName && node.nodeName.toLowerCase()) || '';

        var tagName = '';

        if (!isUndefined(content)) {
            if (isString(content)) {
                tagName = (REGEX_TAGNAME.exec(content) || ARRAY_EMPTY_STRINGS)[1];
            }
            else if (content.nodeType && content.nodeType === 11 && content.childNodes.length) { // a doc frag
                tagName = content.childNodes[0].nodeName;
            }
            else if (content.nodeName) { // a node
                tagName = content.nodeName;
            }

            tagName = tagName && tagName.toLowerCase();
        }

        if (nodeName === 'table' && tagName === 'tr') {
            node = node.getElementsByTagName('tbody')[0] || node.appendChild(node.ownerDocument.createElement('tbody'));

            var whereNodeName = ((where && where.nodeName) || '').toLowerCase();

            // Assuming if the "where" is a tbody node,
            // we're trying to prepend to a table. Attempt to
            // grab the first child of the tbody.
            if (whereNodeName === 'tbody' && where.childNodes.length > 0) {
                where = where.firstChild;
            }
        }

        return A.DOM._ADD_HTML(node, content, where);
    };
}

/**
 * Augments the [YUI3 NodeList](NodeList.html) with more util methods.
 *
 * Checks the list of [Methods](NodeList.html#methods) available for AUI
 * NodeList.
 *
 * @class A.NodeList
 * @constructor
 * @uses A.Node
 */
ANodeList.importMethod(
    NODE_PROTO, [
  'after',

  'appendTo',

  'attr',

  'before',

  'empty',

  'getX',

  'getXY',

  'getY',

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

  'setX',

  'setXY',

  'setY',

  'text',

  'toggle',

  'unselectable',

  'val'
 ]
);

A.mix(
    NODELIST_PROTO, {
        /**
         * See [Node all](Node.html#method_all).
         *
         * @method all
         */
        all: function(selector) {
            var instance = this,
                newNodeList = [],
                nodes = instance._nodes,
                length = nodes.length,
                subList,
                i;

            for (i = 0; i < length; i++) {
                subList = A.Selector.query(selector, nodes[i]);

                if (subList && subList.length) {
                    newNodeList.push.apply(newNodeList, subList);
                }
            }

            newNodeList = AArray.unique(newNodeList);

            return A.all(newNodeList);
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
         * See [Node getDOMNode](Node.html#method_getDOMNode).
         *
         * @method getDOM
         */
        getDOM: function() {
            return ANodeList.getDOMNodes(this);
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
         * See [Node one](Node.html#method_one).
         *
         * @method one
         */
        one: function(selector) {
            var instance = this,
                newNode = null,
                nodes = instance._nodes,
                length = nodes.length,
                i;

            for (i = 0; i < length; i++) {
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
    ANodeList, {
        create: function(html) {
            var docFrag = A.getDoc().invoke('createDocumentFragment');

            return docFrag.append(html).get('childNodes');
        }
    }
);

A.mix(
    A, {
        /**
         * Gets the body node. Shortcut to `A.one('body')`.
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
         * Gets the document node. Shortcut to `A.one(document)`.
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
         * Gets the window node. Shortcut to `A.one(window)`.
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
