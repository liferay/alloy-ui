/**
 * The Toggler Component
 *
 * @module aui-toggler
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isObject = Lang.isObject,
    isString = Lang.isString,

    AArray = A.Array,

    DOC = A.config.doc,

    Toggler = A.Toggler,

    DOT = '.',

    ANIMATED = 'animated',
    CLICK = 'click',
    CLOSE_ALL_ON_EXPAND = 'closeAllOnExpand',
    COLLAPSED = 'collapsed',
    CONTAINER = 'container',
    CONTENT = 'content',
    CUBIC_BEZIER = 'cubic-bezier',
    EXPANDED = 'expanded',
    FIRST_CHILD = 'firstChild',
    HEADER = 'header',
    KEYDOWN = 'keydown',
    TOGGLER = 'toggler',
    TOGGLER_ANIMATING_CHANGE = 'toggler:animatingChange',
    TOGGLER_DELEGATE = 'toggler-delegate',
    TRANSITION = 'transition',
    WRAPPER = 'wrapper',

    getCN = A.getClassName,

    CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER),
    CSS_TOGGLER_HEADER_COLLAPSED = getCN(TOGGLER, HEADER, COLLAPSED),
    CSS_TOGGLER_HEADER_EXPANDED = getCN(TOGGLER, HEADER, EXPANDED);

/**
 * A base class for Toggler Delegate.
 *
 * Check the [live demo](http://alloyui.com/examples/toggler/).
 *
 * @class A.TogglerDelegate
 * @extends A.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var TogglerDelegate = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property TogglerDelegate.NAME
     * @type String
     * @static
     */
    NAME: TOGGLER_DELEGATE,

    /**
     * Static property used to define the default attribute
     * configuration for the Toggler Delegate.
     *
     * @property TogglerDelegate.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Determine if the Toggler Delegate transitions will animate.
         *
         * @attribute animated
         * @default false
         * @type Boolean
         * @writeOnce
         */
        animated: {
            validator: isBoolean,
            value: false,
            writeOnce: true
        },

        /**
         * Determine if the Toggler Delegate switches
         * will be set to off when one switch is toggled on.
         *
         * @attribute closeAllOnExpand
         * @default false
         * @type Boolean
         */
        closeAllOnExpand: {
            validator: isBoolean,
            value: false
        },

        /**
         * The container of Toggler Delegate instance.
         *
         * @attribute container
         */
        container: {
            setter: A.one,
            value: DOC
        },

        /**
         * The content of a Toogler Delegate instance.
         *
         * @attribute content
         * @type String
         */
        content: {
            validator: isString
        },

        /**
         * Determine if the content starts as toggled on/off on page load.
         *
         * @attribute expanded
         * @default true
         * @type Boolean
         */
        expanded: {
            validator: isBoolean,
            value: true
        },

        /**
         * The header of a Toogler Delegate instance.
         *
         * @attribute header
         * @type String
         */
        header: {
            validator: isString
        },

        /**
         * Transition definitions such as duration and type of easing effect.
         *
         * @attribute transition
         * @type Object
         */
        transition: {
            validator: isObject,
            value: {
                duration: 0.4,
                easing: CUBIC_BEZIER
            }
        }

    },

    /**
     * Static property used to define which component it extends.
     *
     * @property TogglerDelegate.EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Base,

    prototype: {

        items: null,

        /**
         * Construction logic executed during TogglerDelegate instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.items = [];

            instance.bindUI();
            instance.renderUI();
        },

        /**
         * Render the TogglerDelegate component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            if (instance.get(CLOSE_ALL_ON_EXPAND)) {
                instance.createAll();
            }
        },

        /**
         * Bind the events on the TogglerDelegate UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;
            var container = instance.get(CONTAINER);
            var header = instance.get(HEADER);

            instance._eventHandles = [
                container.delegate([CLICK, KEYDOWN], A.bind('headerEventHandler', instance), header),
                instance.on(TOGGLER_ANIMATING_CHANGE, A.bind('_onAnimatingChange', instance))
            ];
        },

        /**
         * Destructor lifecycle implementation for the TogglerDelegate class. Lifecycle.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var instance = this;

            AArray.each(instance.items, function(item) {
                item.destroy();
            });

            instance.items = null;

            (new A.EventHandle(instance._eventHandles)).detach();
        },

        /**
         * Collapse all items.
         *
         * @method collapseAll
         */
        collapseAll: function(payload) {
            var instance = this;

            instance.createAll();

            A.Array.invoke(instance.items, 'collapse', payload);
        },

        /**
         * Forces toggler creation on delegated header elements.
         *
         * @method createAll
         */
        createAll: function() {
            var instance = this;

            instance.get(CONTAINER).all(instance.get(HEADER)).each(function(header) {
                if (!header.getData(TOGGLER)) {
                    instance._create(header);
                }
            });
        },

        /**
         * Expand all items.
         *
         * @method collapseAll
         */
        expandAll: function(payload) {
            var instance = this;

            instance.createAll();

            A.Array.invoke(instance.items, 'expand', payload);
        },

        /**
         * Return the content node.
         *
         * @method headerEventHandler
         * @param header
         */
        findContentNode: function(header) {
            var instance = this;
            var content = instance.get(CONTENT);

            var contentNode = header.next(content) || header.one(content);

            if (!contentNode) {
                var wrapper = header.next(DOT + CSS_TOGGLER_CONTENT_WRAPPER);

                if (wrapper) {
                    contentNode = wrapper.get(FIRST_CHILD);
                }
            }

            return contentNode;
        },

        /**
         * Handle header events.
         *
         * @method headerEventHandler
         * @param event
         */
        headerEventHandler: function(event) {
            var instance = this;

            if (instance.animating) {
                return false;
            }

            var target = event.currentTarget;
            var toggler = target.getData(TOGGLER) || instance._create(target);

            if (Toggler.headerEventHandler(event, toggler) && instance.get(CLOSE_ALL_ON_EXPAND)) {
                var wrappingContent = toggler.get(CONTENT).ancestor(instance.get(CONTENT));

                AArray.each(instance.items, function(item) {
                    if ((item !== toggler) && item.get(EXPANDED)) {

                        if (wrappingContent) {
                            var itemContent = item.get(CONTENT);

                            if ((itemContent !== wrappingContent) && wrappingContent.contains(itemContent)) {
                                item.collapse();
                            }
                        }
                        else {
                            item.collapse();
                        }

                    }
                });
            }
        },

        /**
         * Create a Toggler instance.
         *
         * @method headerEventHandler
         * @param header
         * @protected
         */
        _create: function(header) {
            var instance = this,
                expanded = instance.get(EXPANDED);

            // Prioritize markup information to decide whether it's expanded or not
            if (header.hasClass(CSS_TOGGLER_HEADER_EXPANDED)) {
                expanded = true;
            }
            else if (header.hasClass(CSS_TOGGLER_HEADER_COLLAPSED)) {
                expanded = false;
            }

            var toggler = new Toggler({
                animated: instance.get(ANIMATED),
                bindDOMEvents: false,
                bubbleTargets: [ instance ],
                content: instance.findContentNode(header),
                expanded: expanded,
                header: header,
                transition: instance.get(TRANSITION)
            });

            instance.items.push(toggler);

            return toggler;
        },

        /**
         * Trigger when the <code>animating</code> attribute change its value.
         *
         * @method _onAnimatingChange
         * @param event
         * @protected
         */
        _onAnimatingChange: function(event) {
            var instance = this;

            instance.animating = event.newVal;
        }

    }
});

A.TogglerDelegate = TogglerDelegate;