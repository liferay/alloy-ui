/**
 * The Color Picker Component
 *
 * @module aui-color-picker
 * @submodule aui-color-picker-popover
 */

var Lang = A.Lang,
    ANode = A.Node,

    getClassName = A.getClassName,

    _NAME = 'color-picker-popover';

/**
 * A base class for ColorPickerPopover.
 *
 * @class A.ColorPickerPopover
 * @extends A.Popover
 * @uses A.ColorPickerBase, A.WidgetAutohide, A.WidgetCssClass, A.WidgetToggle
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var ColorPickerPopover = A.Base.create(_NAME, A.Popover, [
    A.ColorPickerBase,
    A.WidgetAutohide,
    A.WidgetCssClass,
    A.WidgetToggle
], {
}, {
    /**
     * Static property used to define the default attribute
     * configuration for the ColorPickerPopover.
     *
     * @property ColorPickerPopover.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute align
         * @type Object
         */
        align: {
            validator: Lang.isObject,
            value: {
                points:[A.WidgetPositionAlign.TC, A.WidgetPositionAlign.BC]
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute visible
         * @default false
         * @type Boolean
         */
        visible: {
            validator: Lang.isBoolean,
            value: false
        }
    },

    /**
     * Static property provides a string to identify the class.
     *
     * @property ColorPickerPopover.NAME
     * @type String
     * @static
     */
    NAME: _NAME,

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property ColorPickerPopover.NS
     * @type String
     * @static
     */
    NS: _NAME
});

A.ColorPickerPopover = ColorPickerPopover;