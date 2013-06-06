/**
 * The Toggler Component
 *
 * @module aui-tooltip
 */

var Lang = A.Lang,
    DOC = A.config.doc,

    _TOOLTIP_DELEGATE = 'tooltip-delegate',

    ALIGN = 'align',
    CONTAINER = 'container',
    DURATION = 'duration',
    FORMATTER = 'formatter',
    MOUSEENTER = 'mouseenter',
    MOUSELEAVE = 'mouseleave',
    OPACITY = 'opacity',
    POSITION = 'position',
    TRIGGER = 'trigger',
    TRIGGER_HIDE_EVENT = 'triggerHideEvent',
    TRIGGER_SHOW_EVENT = 'triggerShowEvent',
    Z_INDEX = 'zIndex';

/**
 * A base class for Toggler Delegate.
 *
 * Check the [live demo](http://alloyui.com/examples/tooltip/).
 *
 * @class A.TooltipDelegate
 * @extends A.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.TooltipDelegate = A.Base.create(_TOOLTIP_DELEGATE, A.Base, [], {
    items: null,

    tooltip: null,

    /**
     * Construction logic executed during TooltipDelegate instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance._eventHandles = [];
        instance.bindUI();
    },

    /**
     * Destructor logic for tooltip delegate.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        var instance = this;

        (new A.EventHandle(instance._eventHandles)).detach();
    },

    /**
     * Bind the events on the TooltipDelegate UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        var instance = this,
            container,
            trigger;
        container = instance.get(CONTAINER);
        trigger = instance.get(TRIGGER);

        instance._eventHandles.push(
            container.delegate(
                instance.get(TRIGGER_SHOW_EVENT),
                A.bind(instance._onUserShowInteraction, instance), trigger),
            container.delegate(
                instance.get(TRIGGER_HIDE_EVENT),
                A.bind(instance._onUserHideInteraction, instance), trigger)
        );
    },

    getTooltip: function() {
        var instance = this,
            tooltip = instance.tooltip;

        if (!tooltip) {
            tooltip = instance.tooltip = new A.Tooltip({
                align: instance.get(ALIGN),
                bindDOMEvents: false,
                duration: instance.get(DURATION),
                formatter: instance.get(FORMATTER),
                opacity: instance.get(OPACITY),
                position: instance.get(POSITION),
                visible: false,
                zIndex: instance.get(Z_INDEX)
            });
        }

        return tooltip;
    },

    /**
     * Show tooltip on user interaction.
     *
     * @method _onUserHideInteraction
     * @param event
     */
    _onUserHideInteraction: function() {
        var instance = this;

        instance.getTooltip().hide();
    },

    /**
     * Show tooltip on user interaction.
     *
     * @method _onUserShowInteraction
     * @param event
     */
    _onUserShowInteraction: function(event) {
        var instance = this,
            trigger;

        trigger = event.currentTarget;

        instance.getTooltip().render().set(TRIGGER, trigger).show();
    }
},
{
    /**
     * Static property used to define the default attribute
     * configuration for the Toggler Delegate.
     *
     * @property TooltipDelegate.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The alignment configuration for this widget.
         *
         * @attribute align
         * @default Guess position.
         * @type Object
         */
        align: {
            value: null
        },

        /**
         * The container of Toggler Delegate instance.
         *
         * @attribute container
         */
        container: {
            setter: A.one,
            value: DOC,
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
            value: 0.15,
            writeOnce: true
        },

        formatter: A.Tooltip.ATTRS.formatter,

        /**
         * Determine the opacity of the tooltip.
         *
         * @attribute opacity
         * @default 0.8
         * @type {Number}
         */
        opacity: {
            value: 0.8,
            writeOnce: true
        },

        position: A.WidgetPositionAlignSuggestion.ATTRS.position,

        trigger: A.WidgetPositionAlignSuggestion.ATTRS.trigger,

        /**
         * DOM event to hide the tooltip.
         *
         * @attribute triggerHideEvent
         * @default MOUSEENTER
         * @type String
         */
        triggerHideEvent: {
            validator: Lang.isString,
            value: MOUSELEAVE,
            writeOnce: true
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
            value: MOUSEENTER,
            writeOnce: true
        },

        /**
         * Specify the zIndex for the tooltips.
         *
         * @attribute zIndex
         * @type {Number}
         */
        zIndex: {
        }
    }
});