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
    IN = 'in',
    MOUSEENTER = 'mouseenter',
    MOUSELEAVE = 'mouseleave',
    OPACITY = 'opacity',
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
 * @class Tooltip
 * @extends Widget
 * @uses WidgetCssClass, WidgetPosition, WidgetStdMod, WidgetToggle, WidgetAutohide,
 * WidgetToolbars, WidgetPositionAlign, WidgetPositionAlignSuggestion,
 * WidgetPositionConstrain, WidgetStack
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
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
            instance._loadBodyContentFromTitle();
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
     * Fire after <code>trigger</code> changes.
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
     * @property A.Tooltip.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Determine the tooltip constrainment node.
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
     * @property Tooltip.TEMPLATES
     * @type Object
     * @static
     */
    TEMPLATES: {
        arrow:  '<div class="' + CSS_TOOLTIP_ARROW + '"></div>'
    }
});