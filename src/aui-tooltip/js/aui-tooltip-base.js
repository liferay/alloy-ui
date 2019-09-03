/**
 * The Tooltip Component
 *
 * @module aui-tooltip
 */

var Lang = A.Lang,

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
A.Tooltip = A.Base.create('tooltip', A.Widget, [
    A.WidgetCssClass,
    A.WidgetPosition,
    A.WidgetStdMod,
    A.WidgetToggle,
    A.WidgetAutohide,
    A.WidgetPositionAlign,
    A.WidgetPositionAlignSuggestion,
    A.WidgetPositionConstrain,
    A.WidgetStack,
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
        var instance = this,
            useARIA = instance.get('useARIA');

        instance._eventHandles = [
            A.after(instance._afterUiSetTrigger, instance, '_uiSetTrigger'),
            A.on('scroll', A.debounce(instance._onScroll, 100, instance)),
            A.on('windowresize', A.bind(instance._onResize, instance))
        ];

        if (useARIA) {
            instance.plug(A.Plugin.Aria);
        }
    },

    /**
     * Destructor lifecycle implementation for the `Tooltip` class.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        (new A.EventHandle(this._eventHandles)).detach();
    },

    /**
     * Render the Tooltip component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var instance = this,
            boundingBox = instance.get('boundingBox'),
            contentBox = instance.get('contentBox');

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
            trigger = instance.get('trigger');

        // Do not bind the synthetic hover event to the widget dom events
        // wrapper api. Hover bind method has a different method signature which
        // is not handled by widget yet. Bind to the `boundingBox` instead.
        if (trigger) {
            trigger.on(
                'hover',
                A.bind(instance._onBoundingBoxMouseenter, instance),
                A.bind(instance._onBoundingBoxMouseleave, instance)
            );
        }

        instance.get('boundingBox').on(
            'hover',
            A.bind(instance._onBoundingBoxMouseenter, instance),
            A.bind(instance._onBoundingBoxMouseleave, instance)
        );
    },

    /**
     * Fire after `trigger` changes.
     *
     * @method _afterUiSetTrigger
     * @param val
     * @protected
     */
    _afterUiSetTrigger: function(val) {
        this._loadTooltipContentFromTitle();
        this.suggestAlignment(val);
    },

    /**
     * If the HTML title attribute exists, copy its contents to data-title
     * and remove it to prevent the browser's native tooltip.
     *
     * @method _borrowTitleAttribute
     * @private
     */
    _borrowTitleAttribute: function() {
        var trigger = this.get('trigger'),
            title = trigger.getAttribute('title');

        if (title) {
            trigger.setAttribute('data-title', title).removeAttribute('title');
        }
    },

    /**
     * Load tooltip content from trigger title attribute.
     *
     * @method _loadTooltipContentFromTitle
     * @protected
     */
    _loadTooltipContentFromTitle: function() {
        var instance = this,
            describedBy = instance.get('describedby'),
            trigger = instance.get('trigger'),
            useARIA = instance.get('useARIA');

        if (trigger) {
            instance._borrowTitleAttribute();

            var title = trigger.getAttribute('data-title');

            if (title) {
                instance.setStdModContent(A.WidgetStdMod.BODY, title);

                if (useARIA) {
                    var toolTipBodyNode = instance.getStdModNode(A.WidgetStdMod.BODY);

                    if (toolTipBodyNode) {
                        var id = A.guid() + trigger.get('id');

                        toolTipBodyNode.set('id', id);

                        instance.aria.setAttribute('describedby', id, trigger);
                    }
                }
            }
        }
    },

    /**
     * Handles `boundingBox` `mouseenter` events.
     *
     * @method _onBoundingBoxMouseenter
     * @param {EventFacade} event
     * @protected
     */
    _onBoundingBoxMouseenter: function() {
        var instance = this,
            boundingBox = instance.get('boundingBox'),
            useARIA = instance.get('useARIA');

        instance.show();

        if (useARIA) {
            instance.aria.setAttribute('hidden', false, boundingBox);
        }
    },

    /**
     * Handles `boundingBox` `mouseleave` events.
     *
     * @method _onBoundingBoxMouseleave
     * @param {EventFacade} event
     * @protected
     */
    _onBoundingBoxMouseleave: function() {
        var instance = this,
            boundingBox = instance.get('boundingBox'),
            useARIA = instance.get('useARIA');

        instance.hide();

        if (useARIA) {
            instance.aria.setAttribute('hidden', true, boundingBox);
        }
    },

    /**
     * Fired after the window is resized.
     *
     * @method _onResize
     * @protected
     */
    _onResize: function() {
        this.suggestAlignment(this.get('trigger'));
    },

    /**
     * Scroll event listener function.
     *
     * @method _onScroll
     * @protected
     */
    _onScroll: function() {
        this.suggestAlignment(this.get('trigger'));
    },

    /**
    * Set tooltip section attribute.
    *
    * @method _setStdModSection
    * @param {String | Node} val
    * @protected
    */
    _setStdModSection: function(val) {
        var formatter = this.get('formatter');

        if (Lang.isString(val)) {
            if (formatter) {
                val = formatter.call(this, val);
            }

            if (val.includes("#39") && (val.includes("&amp"))) {
                var apos = "&amp;#39;";

                for (apos in val) {
                   val = val.replace("&amp;#39;", "'");
               }
            }

            if (!this.get('html')) {
                val = A.Escape.html(val);
            }
        }

        return val;
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
        boundingBox = instance.get('boundingBox');

        instance._widgetUiSetVisible(val);

        boundingBox.setStyle('opacity', val ? instance.get('opacity') : 0);

        if (val) {
            instance._loadTooltipContentFromTitle();
        }
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
    CSS_PREFIX: getClassName('tooltip'),

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
         * Determine if the transitions will animate or not.
         *
         * @attribute animated
         * @default true
         * @type Boolean
         * @writeOnce
         */
        animated: {
            value: true
        },

        /**
         * @attribute bodyContent
         * @type {String | Node}
         */
        bodyContent: {
            setter: '_setStdModSection'
        },

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
         * @attribute footerContent
         * @type {String | Node}
         */
        footerContent: {
            setter: '_setStdModSection'
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
         * @attribute headerContent
         * @type {String | Node}
         */
        headerContent: {
            setter: '_setStdModSection'
        },

        /**
         * Determines if the tooltip allows arbitary HTML or is plain text.
         *
         * @attribute html
         * @default false
         * @type Boolean
         */
        html: {
            value: false,
            validator: Lang.isBoolean
        },

        /**
         * Determine the opacity.
         *
         * @attribute opacity
         * @default 0.8
         * @type {Number}
         */
        opacity: {
            value: 0.8
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
            value: 'mouseenter'
        },

        /**
        * Boolean indicating if use of the WAI-ARIA Roles and States
        * should be enabled.
        *
        * @attribute useARIA
        * @default true
        * @type Boolean
        */
        useARIA: {
            validator: Lang.isBoolean,
            value: true,
            writeOnce: 'initOnly'
        },

        /**
         * The z-index to apply to the Widgets boundingBox. Non-numerical values for
         * zIndex will be converted to 0
         *
         * @attribute zIndex
         * @default 1030
         * @type Number
         */
        zIndex: {
            value: 1030
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
