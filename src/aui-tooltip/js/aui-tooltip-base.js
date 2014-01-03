/**
 * The Tooltip Component
 *
 * @module aui-tooltip
 */

var BODY_CONTENT = 'bodyContent',
    BOUNDING_BOX = 'boundingBox',
    CONTENT_BOX = 'contentBox',
    DURATION = 'duration',
    FORMATTER = 'formatter',
    HOVER = 'hover',
    IN = 'in',
    MOUSEENTER = 'mouseenter',
    MOUSELEAVE = 'mouseleave',
    OPACITY = 'opacity',
    STICK_DURATION = 'stickDuration',
    TITLE = 'title',
    TOOLTIP = 'tooltip',
    TRIGGER = 'trigger',
    VISIBLE = 'visible',

    _DATA_TITLE = 'data-title',

    getClassName = A.getClassName,

    CSS_TOOLTIP_ARROW = getClassName('tooltip-arrow'),
    CSS_TOOLTIP_INNER = getClassName('tooltip-inner');

/**
 * A base class for Tooltip.
 *
 * Check the [live demo](http://alloyui.com/examples/tooltip/).
 *
 * @class A.Tooltip
 * @extends Widget
 * @uses A.WidgetCssClass, A.WidgetPosition, A.WidgetStdMod, A.WidgetToggle,
 *     A.WidgetAutohide, A.WidgetToolbars, A.WidgetPositionAlign,
 *     A.WidgetPositionAlignSuggestion, A.WidgetPositionConstrain, A.WidgetStack
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/tooltip/basic-markup.html
 * @include http://alloyui.com/examples/tooltip/basic.js
 */
A.Tooltip = A.Base.create(TOOLTIP, A.Widget, [
    A.WidgetCssClass,
    A.WidgetPosition,
    A.WidgetStdMod,
    A.WidgetToggle,
    A.WidgetAutohide,
    A.WidgetPositionAlign,
    A.WidgetPositionAlignSuggestion,
    A.WidgetPositionConstrain,
    A.WidgetStack,
    A.WidgetTrigger
], {
    /**
     * Stores the `Y.later` context object.
     *
     * @property _hideTimer
     * @type {Object}
     * @protected
     */
    _hideTimer: null,

    /**
     * Construction logic executed during Tooltip instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        A.after(instance._afterUiSetTrigger, instance, '_uiSetTrigger');
        A.after(instance._afterUiSetVisible, instance, '_uiSetVisible');
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

        instance._afterUiSetVisible(instance.get(VISIBLE));
    },

    /**
     * Binds the events on the `Tooltip` UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        var instance = this;

        // Do not bind the synthetic hover event to the widget dom events
        // wrapper api. Hover bind method has a different method signature which
        // is not handled by widget yet. Bind to the `boundingBox` instead.
        instance.get(TRIGGER).on(
            HOVER,
            A.bind(instance._onBoundingBoxMouseenter, this)
        );

        instance.get(BOUNDING_BOX).on(
            HOVER,
            A.bind(instance._onBoundingBoxMouseenter, instance),
            A.bind(instance._onBoundingBoxMouseleave, instance));
    },

    /**
     * Destructor lifecycle implementation for the `Tooltip` class.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        var instance = this;

        instance._clearHideTimer();
    },

    /**
     * Fire after `boundingBox` style changes.
     *
     * @method _afterUiSetVisible
     * @param val
     * @protected
     */
    _afterUiSetVisible: function(val) {
        var instance = this;

        if (val) {
            instance._loadBodyContentFromTitle();
            instance._maybeShow();
        }
        else {
            instance._maybeHide();
        }
    },

    /**
     * Fire after `trigger` changes.
     *
     * @method _afterUiSetTrigger
     * @param val
     * @protected
     */
    _afterUiSetTrigger: function(val) {
        var instance = this;

        instance.suggestAlignment(val);
    },

    /**
     * Helper method called to clear the close timer.
     *
     * @method _clearHideTimer
     * @protected
     */
    _clearHideTimer: function() {
        var instance = this;

        if (instance._hideTimer) {
            instance._hideTimer.cancel();
            instance._hideTimer = null;
        }
    },

    /**
     * Load tooltip content from trigger title attribute.
     *
     * @method _loadBodyContentFromTitle
     * @protected
     */
    _loadBodyContentFromTitle: function() {
        var instance = this,
            trigger,
            dataTitle,
            formatter,
            title;

        formatter = instance.get(FORMATTER);
        trigger = instance.get(TRIGGER);

        dataTitle = trigger.getAttribute(_DATA_TITLE);
        title = trigger.getAttribute(TITLE) || dataTitle;

        if (formatter) {
            title = formatter.call(instance, title);
        }

        if (!dataTitle) {
            trigger.removeAttribute(TITLE).setAttribute(_DATA_TITLE, title);
        }

        instance.setStdModContent(
            A.WidgetStdMod.BODY, trigger && title || instance.get(BODY_CONTENT));
    },

    /**
     * Maybe hides the tooltip if `stickDuration` do not prevent.
     *
     * @method _maybeHide
     * @protected
     */
    _maybeHide: function() {
        var instance = this,
            stickDuration;

        stickDuration = instance.get(STICK_DURATION);

        if (A.Lang.isNumber(stickDuration)) {
            instance._hideTimer = A.later(
                stickDuration, instance, instance._transition);
        }
        else {
            instance._transition();
        }
    },

    /**
     * Maybe shows the tooltip if `stickDuration` do not prevents.
     *
     * @method _maybeShow
     * @protected
     */
    _maybeShow: function() {
        var instance = this;

        instance._transition(true);
    },

    /**
     * Handles `boundingBox` `mouseenter` events.
     *
     * @method _onBoundingBoxMouseenter
     * @param {EventFacade} event
     * @protected
     */
    _onBoundingBoxMouseenter: function() {
        var instance = this;

        instance._clearHideTimer();
    },

    /**
     * Handles `boundingBox` `mouseleave` events.
     *
     * @method _onBoundingBoxMouseleave
     * @param {EventFacade} event
     * @protected
     */
    _onBoundingBoxMouseleave: function() {
        var instance = this;

        instance._maybeHide();
    },

    /**
     * Shows or hides the tooltip depending on the passed parameter, when
     * no parameter is specified the default behavior is to hide the tooltip.
     *
     * @method _transition
     * @param  {Boolean} fadeIn When `true`, fades in the tooltip, otherwise
     *     fades out.
     * @protected
     */
    _transition: function(fadeIn) {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        boundingBox.transition({
                duration: instance.get(DURATION),
                opacity: fadeIn ? instance.get(OPACITY) : 0
            },
            function() {
                boundingBox.toggleClass(IN, fadeIn);
            }
        );
    }
}, {

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: getClassName(TOOLTIP),

    /**
     * Static property used to define the default attribute
     * configuration for the Tooltip.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Determine the tooltip constrain node.
         *
         * @attribute constrain
         * @default true
         * @type {Boolean|Node}
         */
        constrain: {
            value: true
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
         * Format the title attribute before set the content of the tooltip.
         *
         * @attribute formatter
         * @type function
         */
        formatter: {
            validator: A.Lang.isFunction
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
         * Determine the duration for the tooltip to stick visibility after
         * the mouse leaves the trigger element. By default the stick duration
         * is not specified, therefore the tooltip starts the hide transition
         * synchronously.
         *
         * @attribute stickDuration
         * @type {Number}
         */
        stickDuration: {
            validator: A.Lang.isNumber
        },

        /**
         * DOM event to hide the tooltip.
         *
         * @attribute triggerHideEvent
         * @default mouseleave
         * @type String
         */
        triggerHideEvent: {
            value: MOUSELEAVE
        },

        /**
         * DOM event to show the tooltip.
         *
         * @attribute triggerShowEvent
         * @default mouseenter
         * @type String
         */
        triggerShowEvent: {
            value: MOUSEENTER
        }
    },

    /**
     * Static property provides a set of reusable templates.
     *
     * @property TEMPLATES
     * @type Object
     * @static
     */
    TEMPLATES: {
        arrow: '<div class="' + CSS_TOOLTIP_ARROW + '"></div>'
    }
});
