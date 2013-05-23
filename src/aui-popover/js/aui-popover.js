/**
 * The Popover Component
 *
 * @module aui-popover
 */

var Lang = A.Lang,

    StdMod = A.WidgetStdMod,

    OWNER_DOCUMENT = 'ownerDocument',

    getClassName = A.getClassName,

    _SPACE = ' ',

    ARROW = 'arrow',
    BLOCK = 'block',
    BOTTOM = 'bottom',
    BOUNDING_BOX = 'boundingBox',
    CONTENT = 'content',
    CONTENT_BOX = 'contentBox',
    DISPLAY = 'display',
    LEFT = 'left',
    NONE = 'none',
    POPOVER = 'popover',
    POSITION = 'position',
    POSITION_CHANGE = 'positionChange',
    RIGHT = 'right',
    TOP = 'top',

    CSS_ARROW = getClassName(ARROW),
    CSS_POPOVER_BD = getClassName('popover-content'),
    CSS_POPOVER_FT = getClassName('popover-footer'),
    CSS_POPOVER_HD = getClassName('popover-title');

/**
 * A base class for Popover.
 *
 * Check the [live demo](http://alloyui.com/examples/popover/).
 *
 * @class Popover
 * @extends Widget
 * @uses WidgetStdMod,WidgetPosition,WidgetStack,WidgetPositionAlign,WidgetPositionConstrain
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.Popover = A.Base.create(POPOVER, A.Widget, [
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

    /**
     * Construction logic executed during Popover instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.after(POSITION_CHANGE, instance._afterPositionChange);

        A.after(instance._afterUiSetVisible, instance, '_uiSetVisible');
        A.after(instance._afterRenderBoxClassNames, instance, '_renderBoxClassNames');
    },

    /**
     * Render the Popover component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        boundingBox.append(A.Popover.TEMPLATES.arrow);

        instance._uiSetPosition(instance.get(POSITION));
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
     * Fire after <code>contentBox</code> class names changes.
     *
     * @method _afterRenderBoxClassNames
     * @param event
     * @protected
     */
    _afterRenderBoxClassNames: function(event) {
        var instance = this,
            contentBox = instance.get(CONTENT_BOX);

        contentBox.removeClass(instance.getClassName(CONTENT));
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

        boundingBox.setStyle(DISPLAY, val ? BLOCK : NONE);
    },

    /**
     * Get templates from a widget extension.
     *
     * @method _getStdModTemplate
     * @param section
     * @protected
     */
    _getStdModTemplate : function(section) {
        return A.Node.create(A.Popover.TEMPLATES[section], this._stdModNode.get(OWNER_DOCUMENT));
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
    }
}, {

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property Popover.CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: getClassName(POPOVER),

    /**
     * Static property used to define the default attribute
     * configuration for the Popover.
     *
     * @property Popover.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Determine the position of the popover.
         *
         * @attribute position
         * @default bottom
         * @type {String}
         */
        position: {
            validator: function(val) {
                return val === BOTTOM || val === TOP || val === LEFT || val === RIGHT;
            },
            value: BOTTOM
        }
    },

    /**
     * Static property provides a set of reusable templates.
     *
     * @property Popover.TEMPLATES
     * @type Object
     * @static
     */
    TEMPLATES: {
        header: '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.HEADER] + _SPACE + CSS_POPOVER_HD + '"></div>',
        body:   '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.BODY] + _SPACE + CSS_POPOVER_BD + '"></div>',
        footer: '<div class="' + StdMod.SECTION_CLASS_NAMES[StdMod.FOOTER] + _SPACE + CSS_POPOVER_FT + '"></div>',
        arrow:  '<div class="' + CSS_ARROW + '"></div>'
    }
});