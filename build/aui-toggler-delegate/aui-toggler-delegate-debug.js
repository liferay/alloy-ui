YUI.add('aui-toggler-delegate', function (A, NAME) {

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
    CUBIC_BEZIER = 'cubic-bezier(0, 0.1, 0, 1.0)',

    getCN = A.getClassName,

    CSS_TOGGLER_CONTENT_WRAPPER = getCN('toggler', 'content', 'wrapper'),
    CSS_TOGGLER_HEADER_COLLAPSED = getCN('toggler', 'header', 'collapsed'),
    CSS_TOGGLER_HEADER_EXPANDED = getCN('toggler', 'header', 'expanded');

/**
 * A base class for Toggler Delegate.
 *
 * Check the [live demo](http://alloyui.com/examples/toggler/).
 *
 * @class A.TogglerDelegate
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var TogglerDelegate = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'toggler-delegate',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.TogglerDelegate`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Determine if the `A.TogglerDelegate` transitions will animate.
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
         * Determine if the `A.TogglerDelegate` switches
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
         * The container of `A.TogglerDelegate` instance.
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
         * User interaction that triggers the Toggler instance.
         *
         * @attribute toggleEvent
         * @type String
         * @writeOnce
         */
        toggleEvent: {
            validator: isString,
            value: 'tap',
            writeOnce: true
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
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Base,

    prototype: {

        items: null,

        /**
         * Construction logic executed during TogglerDelegate instantiation.
         * Lifecycle.
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

            if (instance.get('closeAllOnExpand')) {
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
            var container = instance.get('container');
            var header = instance.get('header');

            instance._eventHandles = [
                container.delegate([instance.get('toggleEvent'), 'keydown'], A.bind('headerEventHandler', instance), header),
                instance.on('toggler:animatingChange', A.bind('_onAnimatingChange', instance))
            ];
        },

        /**
         * Destructor lifecycle implementation for the `TogglerDelegate` class.
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

            instance.get('container').all(instance.get('header')).each(function(header) {
                if (!header.getData('toggler')) {
                    instance._create(header);
                }
            });
        },

        /**
         * Expand all items.
         *
         * @method expandAll
         */
        expandAll: function(payload) {
            var instance = this;

            instance.createAll();

            A.Array.invoke(instance.items, 'expand', payload);
        },

        /**
         * Return the content node.
         *
         * @method findContentNode
         * @param header
         */
        findContentNode: function(header) {
            var instance = this;
            var content = instance.get('content');

            var contentNode = header.next(content) || header.one(content);

            if (!contentNode) {
                var wrapper = header.next('.' + CSS_TOGGLER_CONTENT_WRAPPER);

                if (wrapper) {
                    contentNode = wrapper.get('firstChild');
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
            var toggler = target.getData('toggler') || instance._create(target);

            if (Toggler.headerEventHandler(event, toggler) && instance.get('closeAllOnExpand')) {
                var wrappingContent = toggler.get('content').ancestor(instance.get('content'));

                AArray.each(instance.items, function(item) {
                    if ((item !== toggler) && item.get('expanded')) {

                        if (wrappingContent) {
                            var itemContent = item.get('content');

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
         * @method _create
         * @param header
         * @protected
         */
        _create: function(header) {
            var instance = this,
                expanded = instance.get('expanded');

            // Prioritize markup information to decide whether it's expanded or
            // not
            if (header.hasClass(CSS_TOGGLER_HEADER_EXPANDED)) {
                expanded = true;
            }
            else if (header.hasClass(CSS_TOGGLER_HEADER_COLLAPSED)) {
                expanded = false;
            }

            var toggler = new Toggler({
                animated: instance.get('animated'),
                bindDOMEvents: false,
                bubbleTargets: [instance],
                content: instance.findContentNode(header),
                expanded: expanded,
                header: header,
                toggleEvent: instance.get('toggleEvent'),
                transition: instance.get('transition')
            });

            instance.items.push(toggler);

            return toggler;
        },

        /**
         * Trigger when the `animating` attribute change its value.
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


}, '3.0.1', {"requires": ["array-invoke", "node-event-delegate", "aui-toggler-base"]});
