/**
 * The Tooltip Component
 *
 * @module aui-tooltip
 */

var Lang = A.Lang,

    BODY_CONTENT = 'bodyContent',
    BOUNDING_BOX = 'boundingBox',
    CONTENT_BOX = 'contentBox',
    DURATION = 'duration',
    FORMATTER = 'formatter',
    HOVER = 'hover',
    IN = 'in',
    MOUSEENTER = 'mouseenter',
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
     * Destructor lifecycle implementation for the Tooltip class.
     * Lifecycle.
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
        var instance = this,
            stickDuration = instance.get(STICK_DURATION);

        if (val) {
            instance._loadTooltipContentFromTitle();
            instance._maybeShow();
        }
        else {
            if (!A.Lang.isNumber(stickDuration)) {
                instance._maybeHide();
            }
        }
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

            if (!this.get('html')) {
                val = A.Escape.html(val);
            }
        }

         return val;
     },

    /**
     * Load tooltip content from trigger title attribute.
     *
     * @method _loadTooltipContentFromTitle
     * @protected
     */
    _loadTooltipContentFromTitle: function() {
        var trigger = this.get('trigger'),
            title;

        if (!trigger) {
            return;
        }

        this._borrowTitleAttribute();

        title = trigger.getAttribute('data-title');

        if (title) {
            this.setStdModContent(A.WidgetStdMod.BODY, title);
        }
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
            instance.hide();
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

                if (!fadeIn) {
                    instance.hide();
                }
            }
        );
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
         * Determine the bodyContent
         *
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
         * Determine the duration of the tooltip animation.
         *
         * @attribute duration
         * @default 0.15
         * @type {Number}
         */
        duration: {
            validator: Lang.isNumber,
            value: 0.15
        },

        /**
         * Determine the footerContent
         *
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
         * Determine the headerContent
         *
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
         * Determine the opacity of the tooltip.
         *
         * @attribute opacity
         * @default 0.8
         * @type {Number}
         */
        opacity: {
            validator: Lang.isNumber,
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
     * @property Tooltip.TEMPLATES
     * @type Object
     * @static
     */
    TEMPLATES: {
        arrow: '<div class="' + CSS_TOOLTIP_ARROW + '"></div>'
    }
});
