/**
 * The Toggler Component
 *
 * @module aui-toggler
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isObject = Lang.isObject,
    isString = Lang.isString,
    isUndefined = Lang.isUndefined,

    toInt = Lang.toInt,
    CUBIC_BEZIER = 'cubic-bezier(0, 0.1, 0, 1.0)',

    getCN = A.getClassName,

    CSS_TOGGLER_CONTENT = getCN('toggler', 'content'),
    CSS_TOGGLER_CONTENT_COLLAPSED = getCN('toggler', 'content', 'collapsed'),
    CSS_TOGGLER_CONTENT_EXPANDED = getCN('toggler', 'content', 'expanded'),
    CSS_TOGGLER_CONTENT_WRAPPER = getCN('toggler', 'content', 'wrapper'),
    CSS_TOGGLER_HEADER = getCN('toggler', 'header'),
    CSS_TOGGLER_HEADER_COLLAPSED = getCN('toggler', 'header', 'collapsed'),
    CSS_TOGGLER_HEADER_EXPANDED = getCN('toggler', 'header', 'expanded'),

    CSS_TOGGLER_CONTENT_STATE = {
        'false': CSS_TOGGLER_CONTENT_COLLAPSED,
        'true': CSS_TOGGLER_CONTENT_EXPANDED
    },

    CSS_TOGGLER_HEADER_STATE = {
        'false': CSS_TOGGLER_HEADER_COLLAPSED,
        'true': CSS_TOGGLER_HEADER_EXPANDED
    },

    TPL_CONTENT_WRAPPER = '<div class="' + CSS_TOGGLER_CONTENT_WRAPPER + '"></div>';

/**
 * A base class for Toggler.
 *
 * Check the [live demo](http://alloyui.com/examples/toggler/).
 *
 * @class A.Toggler
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var Toggler = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'toggler',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.Toggler`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Determine if the `A.Toggler` transitions will animate.
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
         * Determine if the `A.Toggler` transitions are being animated in that
         * moment.
         *
         * @attribute animating
         * @default false
         * @type Boolean
         */
        animating: {
            validator: isBoolean,
            value: false
        },

        /**
         * Determine if the `A.Toggler` should bind DOM events or not.
         *
         * @attribute bindDOMEvents
         * @default true
         * @type Boolean
         * @writeOnce
         */
        bindDOMEvents: {
            validator: isBoolean,
            value: true,
            writeOnce: true
        },

        /**
         * The content of a Toogler instance.
         *
         * @attribute content
         */
        content: {
            setter: A.one
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
         * The header of a Toogler instance.
         *
         * @attribute header
         */
        header: {
            setter: A.one
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

    /**
     * Handle header events.
     *
     * @method headerEventHandler
     * @param event
     * @param instance
     */
    headerEventHandler: function(event, instance) {
        if (event.type === instance.get('toggleEvent') || event.isKey('enter') || event.isKey('space')) {
            return instance.toggle();
        }
        else if (event.isKey('down') || event.isKey('right') || event.isKey('num_plus')) {
            return instance.expand();
        }
        else if (event.isKey('up') || event.isKey('left') || event.isKey('esc') || event.isKey('num_minus')) {
            return instance.collapse();
        }
    },

    prototype: {

        /**
         * Construction logic executed during `A.Toggler` instantiation. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.bindUI();
            instance.syncUI();

            instance._uiSetExpanded(instance.get('expanded'));
        },

        /**
         * Bind the events on the `A.Toggler` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;
            var header = instance.get('header');

            header.setData('toggler', instance);

            var eventHandles = [
                instance.on('expandedChange', A.bind(instance._onExpandedChange, instance))
            ];

            if (instance.get('bindDOMEvents')) {
                eventHandles.push(
                    header.on([instance.get('toggleEvent'), 'keydown'], A.rbind(Toggler.headerEventHandler, null, instance))
                );
            }

            instance._eventHandles = eventHandles;
        },

        /**
         * Sync the events on the `A.Toggler` UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;

            instance.get('content').addClass(CSS_TOGGLER_CONTENT);
            instance.get('header').addClass(CSS_TOGGLER_HEADER);
        },

        /**
         * Destructor lifecycle implementation for the `A.Toggler` class.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var instance = this,
                content,
                wrapper;

            instance.get('header').setData('toggler', null);

            if (instance.wrapped) {
                content = instance.get('content');
                wrapper = content.get('parentNode');

                wrapper.insert(content, 'before');
                wrapper.remove();
            }

            (new A.EventHandle(instance._eventHandles)).detach();
        },

        /**
         * Expand `A.Toggler` with an animation.
         *
         * @method animate
         * @param config
         * @param fn
         */
        animate: function(config, fn) {
            var instance = this;

            instance._uiSetExpanded(true);

            var transition = A.merge(config, instance.get('transition'));

            instance.get('content').transition(transition, A.bind(fn, instance));
        },

        /**
         * Hide `A.Toggler` content.
         *
         * @method collapse
         */
        collapse: function(payload) {
            var instance = this;

            return instance.toggle(false, payload);
        },

        /**
         * Show `A.Toggler` content.
         *
         * @method expand
         */
        expand: function(payload) {
            var instance = this;

            return instance.toggle(true, payload);
        },

        /**
         * Return the height of content.
         *
         * @method getContentHeight
         * @return {Number} height
         */
        getContentHeight: function() {
            var instance = this;
            var content = instance.get('content');
            var expanded = instance.get('expanded'),
                height;

            if (!expanded) {
                instance._uiSetExpanded(true);
            }

            if (content.hasMethod('getBoundingClientRect')) {
                var preciseRegion = content.invoke('getBoundingClientRect');

                if (preciseRegion) {
                    height = preciseRegion.bottom - preciseRegion.top;
                }
            }
            else {
                height = content.get('offsetHeight');
            }

            if (!expanded) {
                instance._uiSetExpanded(false);
            }

            return height;
        },

        /**
         * Show or hide content.
         *
         * @method toggle
         * @param expand
         */
        toggle: function(expand, payload) {
            var instance = this,
                header = instance.get('header'),
                expanded;

            if (!header.test(':visible')) {
                return;
            }

            expanded = instance.get('expanded');

            if (isUndefined(expand)) {
                expand = !expanded;
            }

            if (instance.get('animated') && (expand !== expanded)) {
                if (instance.get('animating')) {
                    return expand;
                }

                instance._animation(expand, payload);
            }
            else {
                instance.set('expanded', expand, payload);
            }

            return expand;
        },

        /**
         * Apply animation on `toggle`.
         *
         * @method _animation
         * @param {Boolean} expand
         * @param {Object} payload
         * @protected
         */
        _animation: function(expand, payload) {
            var instance = this,
                content = instance.get('content'),
                gutter = instance.contentGutter,
                height = instance.getContentHeight();

            if (isUndefined(gutter)) {
                gutter = instance.contentGutter = toInt(content.getStyle('marginTop'));
            }

            if (!instance.wrapped) {
                instance._uiSetExpandedContent();

                if (expand) {
                    content.setStyle('marginTop', -(height + gutter));
                }
            }

            instance.set('animating', true);

            instance.animate({
                    marginTop: (expand ? gutter : -(height + gutter)) + 'px'
                },
                function() {
                    instance.set('animating', false);

                    instance.set('expanded', expand, payload);
                }
            );
        },

        /**
         * Trigger when the `expanded` attribute change its value.
         *
         * @method _onExpandedChange
         * @param event
         * @protected
         */
        _onExpandedChange: function(event) {
            var instance = this;

            instance._uiSetExpanded(event.newVal);
        },

        /**
         * Set the `expanded` attribute on the UI.
         *
         * @method _uiSetExpanded
         * @param val
         * @protected
         */
        _uiSetExpanded: function(val) {
            var instance = this,
                expanded = instance.get('expanded');

            if (expanded && !instance.wrapped) {
                instance._uiSetExpandedContent();
            }

            instance.get('content').replaceClass(CSS_TOGGLER_CONTENT_STATE[!val], CSS_TOGGLER_CONTENT_STATE[val]);
            instance.get('header').replaceClass(CSS_TOGGLER_HEADER_STATE[!val], CSS_TOGGLER_HEADER_STATE[val]);
        },

        /**
         * Wrap the content HTML if `expanded` attribute is true.
         *
         * @method _uiSetExpandedContent
         * @protected
         */
        _uiSetExpandedContent: function() {
            var instance = this;

            instance.get('content').wrap(TPL_CONTENT_WRAPPER);

            instance.wrapped = true;
        }

    }
});

A.Toggler = Toggler;
