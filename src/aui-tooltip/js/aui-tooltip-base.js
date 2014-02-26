/**
 * The Tooltip Component
 *
 * @module aui-tooltip
 */

var Lang = A.Lang,

    BODY_CONTENT = 'bodyContent',
    BOUNDING_BOX = 'boundingBox',
    CONTENT_BOX = 'contentBox',
    FORMATTER = 'formatter',
    HOVER = 'hover',
    MOUSEENTER = 'mouseenter',
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
    A.WidgetTransition,
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
    },

    /**
     * Binds the events on the `Tooltip` UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        var instance = this,
            trigger = instance.get(TRIGGER);

        // Do not bind the synthetic hover event to the widget dom events
        // wrapper api. Hover bind method has a different method signature which
        // is not handled by widget yet. Bind to the `boundingBox` instead.
        if (trigger) {
            trigger.on(
                HOVER,
                A.bind(instance._onBoundingBoxMouseenter, instance),
                A.bind(instance._onBoundingBoxMouseleave, instance));
        }

        instance.get(BOUNDING_BOX).on(
            HOVER,
            A.bind(instance._onBoundingBoxMouseenter, instance),
            A.bind(instance._onBoundingBoxMouseleave, instance));
    },

    /**
     * Fire after `boundingBox` style changes.
     *
     * @method _afterUiSetVisible
     * @param val
     * @protected
     */
    _uiSetVisible: function(val) {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        instance._widgetUiSetVisible(val);

        boundingBox.setStyle('opacity', val ? instance.get('opacity') : 0);

        if (val) {
            instance._loadBodyContentFromTitle();
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

        if (!trigger) {
            return;
        }

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
     * Handles `boundingBox` `mouseenter` events.
     *
     * @method _onBoundingBoxMouseenter
     * @param {EventFacade} event
     * @protected
     */
    _onBoundingBoxMouseenter: function() {
        var instance = this;

        instance.show();
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

        instance.hide();
    },

    _widgetUiSetVisible: A.Widget.prototype._uiSetVisible
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
         * Format the title attribute before set the content of the tooltip.
         *
         * @attribute formatter
         * @type function
         */
        formatter: {
            validator: A.Lang.isFunction
        },

        /**
         * Determine the opacity.
         *
         * @attribute opacity
         * @default 0.8
         * @type {Number}
         */
        opacity: {
            value: 0.8,
            validator: Lang.isNumber
        },

        /**
         * DOM event to show the tooltip.
         *
         * @attribute triggerShowEvent
         * @default mouseenter
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
     * @property TEMPLATES
     * @type Object
     * @static
     */
    TEMPLATES: {
        arrow: '<div class="' + CSS_TOOLTIP_ARROW + '"></div>'
    }
});
