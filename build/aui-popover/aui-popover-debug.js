YUI.add('aui-popover', function (A, NAME) {

/**
 * The Popover Component
 *
 * @module aui-popover
 */

var StdMod = A.WidgetStdMod,

    getClassName = A.getClassName,

    CSS_ARROW = getClassName('arrow'),
    CSS_POPOVER_BD = getClassName('popover-content'),
    CSS_POPOVER_FT = getClassName('popover-footer'),
    CSS_POPOVER_HD = getClassName('popover-title');

/**
 * A base class for Popover.
 *
 * Check the [live demo](http://alloyui.com/examples/popover/).
 *
 * @class A.Popover
 * @extends Widget
 * @uses A.WidgetCssClass, A.WidgetPosition, A.WidgetStdMod, A.WidgetToggle,
 *     A.WidgetAutohide, A.WidgetToolbars, A.WidgetModality,
 *     A.WidgetPositionAlign, A.WidgetPositionAlignSuggestion,
 *     A.WidgetPositionConstrain, A.WidgetStack
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/popover/basic-markup.html
 * @include http://alloyui.com/examples/popover/basic.js
 */
A.Popover = A.Base.create('popover', A.Widget, [
    A.WidgetCssClass,
    A.WidgetPosition,
    A.WidgetStdMod,
    A.WidgetToggle,
    A.WidgetAutohide,
    A.WidgetToolbars,
    A.WidgetModality,
    A.WidgetPositionAlign,
    A.WidgetPositionAlignSuggestion,
    A.WidgetPositionConstrain,
    A.WidgetStack,
    A.WidgetTransition,
    A.WidgetTrigger
], {

    /**
     * Construction logic executed during Popover instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        A.after(instance._afterRenderBoxClassNames, instance, '_renderBoxClassNames');

        this._resizeHandle = A.on('windowresize', A.bind(this._onResize, this));
    },

    /**
     * Destructor lifecycle implementation for the `Popover` class.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this._resizeHandle.detach();
    },

    /**
     * Render the Popover component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var instance = this,
            boundingBox = instance.get('boundingBox');

        boundingBox.append(A.Popover.TEMPLATES.arrow);

        instance.suggestAlignment();
    },

    /**
     * Fire after `contentBox` class names changes.
     *
     * @method _afterRenderBoxClassNames
     * @param event
     * @protected
     */
    _afterRenderBoxClassNames: function() {
        var instance = this,
            contentBox = instance.get('contentBox');

        contentBox.removeClass(instance.getClassName('content'));
    },

    /**
     * Fired after the window is resized.
     *
     * @method _onResize
     * @protected
     */
    _onResize: function() {
        this.suggestAlignment();
    },

    /**
     * Fire after `boundingBox` style changes.
     *
     * @method _uiSetVisible
     * @param val
     * @protected
     */
    _uiSetVisible: function(val) {
        var instance = this,
            boundingBox = instance.get('boundingBox');

        instance._widgetUiSetVisible(val);

        boundingBox.setStyle('display', val ? 'block' : 'none');

        if (val) {
            instance.suggestAlignment();
        }
    },

    /**
     * Get templates from a widget extension.
     *
     * @method _getStdModTemplate
     * @param section
     * @protected
     */
    _getStdModTemplate: function(section) {
        return A.Node.create(A.Popover.TEMPLATES[section], this._stdModNode.get('ownerDocument'));
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
    CSS_PREFIX: getClassName('popover'),

    /**
     * Static property used to define the default attribute
     * configuration for the Popover.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * DOM event to hide the tooltip.
         *
         * @attribute triggerToggleEvent
         * @default click
         * @type String
         */
        triggerToggleEvent: {
            value: 'click'
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
        header: '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.HEADER] + ' ' + CSS_POPOVER_HD + '"></div>',
        body: '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.BODY] + ' ' + CSS_POPOVER_BD + '"></div>',
        footer: '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.FOOTER] + ' ' + CSS_POPOVER_FT + '"></div>',
        arrow: '<div class="' + CSS_ARROW + '"></div>'
    }
});


}, '3.0.1', {
    "requires": [
        "event-resize",
        "widget",
        "widget-autohide",
        "widget-buttons",
        "widget-modality",
        "widget-position",
        "widget-position-align",
        "widget-position-constrain",
        "widget-stack",
        "widget-stdmod",
        "aui-classnamemanager",
        "aui-widget-cssclass",
        "aui-widget-toggle",
        "aui-widget-toolbars",
        "aui-widget-transition",
        "aui-widget-trigger",
        "aui-widget-position-align-suggestion",
        "aui-component",
        "aui-node-base"
    ],
    "skinnable": true
});
