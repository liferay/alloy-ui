/**
 * The Tooltip Component
 *
 * @module aui-tooltip
 */

var Lang = A.Lang,

    getClassName = A.getClassName,

    BODY_CONTENT = 'bodyContent',
    BIND_DOM_EVENTS = 'bindDOMEvents',
    BOTTOM = 'bottom',
    BOUNDING_BOX = 'boundingBox',
    CONTENT_BOX = 'contentBox',
    DURATION = 'duration',
    IN = 'in',
    LEFT = 'left',
    MOUSEENTER = 'mouseenter',
    MOUSELEAVE = 'mouseleave',
    OPACITY = 'opacity',
    POSITION = 'position',
    POSITION_CHANGE = 'positionChange',
    RIGHT = 'right',
    TITLE = 'title',
    TOOLTIP = 'tooltip',
    TOP = 'top',
    TRIGGER = 'trigger',
    TRIGGER_CHANGE = 'triggerChange',
    TRIGGER_HIDE_EVENT = 'triggerHideEvent',
    TRIGGER_SHOW_EVENT = 'triggerShowEvent',

    CSS_TOOLTIP_ARROW = getClassName('tooltip-arrow'),
    CSS_TOOLTIP_INNER = getClassName('tooltip-inner');

/**
 * A base class for Tooltip.
 *
 * Check the [live demo](http://alloyui.com/examples/tooltip/).
 *
 * @class Tooltip
 * @extends Widget
 * @uses WidgetCssClass, WidgetPosition, WidgetStdMod, WidgetToggle, WidgetAutohide,
 * WidgetToolbars, WidgetModality, WidgetPositionAlign, WidgetPositionConstrain,
 * WidgetStack
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.Tooltip = A.Base.create(TOOLTIP, A.Widget, [
    A.WidgetCssClass,
    A.WidgetPosition,
    A.WidgetStdMod,
    A.WidgetToggle,
    A.WidgetAutohide,
    A.WidgetModality,
    A.WidgetPositionAlign,
    A.WidgetPositionConstrain,
    A.WidgetStack
], {
    _eventHandles: null,

    /**
     * Construction logic executed during Tooltip instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        A.after(instance._afterUiSetVisible, instance, '_uiSetVisible');
        instance.after(POSITION_CHANGE, instance._afterPositionChange);
        instance.after(TRIGGER_CHANGE, instance._afterTriggerChange);
    },

    /**
     * Destructor logic for tooltip.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        var instance = this;

        (new A.EventHandle(instance._eventHandles)).detach();
    },

    /**
     * Render the Tooltip component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX),
            contentBox = instance.get(CONTENT_BOX);

        contentBox.addClass(CSS_TOOLTIP_INNER);
        boundingBox.append(A.Tooltip.TEMPLATES.arrow);

        instance._uiSetPosition(instance.get(POSITION));
        instance._uiSetTrigger(instance.get(TRIGGER));
    },

    /**
     * Fire after <code>boundingBox</code> position changes.
     *
     * @method _afterPositionChange
     * @param event
     * @protected
     */
    _afterPositionChange: function(event) {
        var instance = this;

        instance._uiSetPosition(event.newVal, event.prevVal);
    },

    /**
     * Fire after <code>trigger</code> changes.
     *
     * @method _afterTriggerChange
     * @param event
     * @protected
     */
    _afterTriggerChange: function(event) {
        var instance = this;

        instance._uiSetTrigger(event.newVal);
    },

    /**
     * Fire after <code>boundingBox</code> style changes.
     *
     * @method _afterUiSetVisible
     * @param val
     * @protected
     */
    _afterUiSetVisible: function(val) {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        if (val) {
            instance._loadFromTitle();
        }

        boundingBox.transition(
            {
                duration: instance.get(DURATION),
                opacity: val ? instance.get(OPACITY) : 0
            },
            function() {
                boundingBox.toggleClass(IN, val);
            }
        );
    },

    /**
     * Load tooltip content from trigger title attribute.
     *
     * @method _loadFromTitle
     * @protected
     */
    _loadFromTitle: function() {
        var instance = this,
            trigger = instance.get(TRIGGER);

        instance.setStdModContent(
            A.WidgetStdMod.BODY,
            trigger && trigger.getAttribute(TITLE) ||
                instance.get(BODY_CONTENT));
    },

    /**
     * Set the <code>boundingBox</code> position on the UI.
     *
     * @method _uiSetPosition
     * @param val
     * @param prevVal
     * @protected
     */
    _uiSetPosition: function(val, prevVal) {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        if (prevVal) {
            boundingBox.removeClass(getClassName(prevVal));
        }
        boundingBox.addClass(getClassName(val));
    },

    /**
     * Set the <code>trigger</code> UI.
     *
     * @method _uiSetTrigger
     * @param val
     * @protected
     */
    _uiSetTrigger: function(val) {
        var instance = this;

        (new A.EventHandle(instance._eventHandles)).detach();

        if (val && instance.get(BIND_DOM_EVENTS)) {
            instance._eventHandles = [];
            instance._eventHandles.push(
                val.on(instance.get(TRIGGER_SHOW_EVENT), instance.show, instance),
                val.on(instance.get(TRIGGER_HIDE_EVENT), instance.hide, instance));
        }

        instance.set('align.node', val);
    }
}, {

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property Tooltip.CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: getClassName(TOOLTIP),

    /**
     * Static property used to define the default attribute
     * configuration for the Tooltip.
     *
     * @property Tooltip.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The alignment configuration for this widget.
         *
         * @attribute align
         * @default {points:[A.WidgetPositionAlign.BC, A.WidgetPositionAlign.TC]}
         * @type Object
         */
        align: {
            value: {
                points:[A.WidgetPositionAlign.BC, A.WidgetPositionAlign.TC]
            }
        },

        /**
         * Determine if the Toggler should bind DOM events or not.
         *
         * @attribute bindDOMEvents
         * @default true
         * @type Boolean
         * @writeOnce
         */
        bindDOMEvents: {
            validator: Lang.isBoolean,
            value: true,
            writeOnce: true
        },

        /**
         * Determine the duration of the tooltip animation.
         *
         * @attribute duration
         * @default 0.15
         * @type {Number}
         */
        duration: {
            value: 0.15
        },

        /**
         * Determine the opacity of the tooltip.
         *
         * @attribute opacity
         * @default 0.8
         * @type {Number}
         */
        opacity: {
            value: 0.8
        },

        /**
         * Determine the position of the tooltip.
         *
         * @attribute position
         * @default bottom
         * @type {String}
         */
        position: {
            validator: function(val) {
                return val === BOTTOM || val === TOP || val === LEFT || val === RIGHT;
            },
            value: TOP
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute trigger
         */
        trigger: {
            setter: A.one
        },

        /**
         * DOM event to hide the tooltip.
         *
         * @attribute triggerHideEvent
         * @default MOUSEENTER
         * @type String
         */
        triggerHideEvent: {
            validator: Lang.isString,
            value: MOUSELEAVE
        },

        /**
         * DOM event to show the tooltip.
         *
         * @attribute triggerShowEvent
         * @default MOUSEENTER
         * @type String
         */
        triggerShowEvent: {
            validator: Lang.isString,
            value: MOUSEENTER
        }
    },

    /**
     * Static property provides a set of reusable templates.
     *
     * @property Tooltip.TEMPLATES
     * @type Object
     * @static
     */
    TEMPLATES: {
        arrow:  '<div class="' + CSS_TOOLTIP_ARROW + '"></div>'
    }
});