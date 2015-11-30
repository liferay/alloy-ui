YUI.add('aui-color-picker-popover', function (A, NAME) {

/**
 * The Color Picker Component
 *
 * @module aui-color-picker
 * @submodule aui-color-picker-popover
 */

var Lang = A.Lang;

/**
 * A base class for `ColorPickerPopover`.
 *
 * @class A.ColorPickerPopover
 * @extends A.Popover
 * @uses A.ColorPickerBase, A.WidgetAutohide, A.WidgetCssClass, A.WidgetToggle
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/color-picker/popover-markup.html
 * @include http://alloyui.com/examples/color-picker/popover.js
 */
var ColorPickerPopover = A.Base.create('color-picker-popover', A.Popover, [
    A.ColorPickerBase,
    A.WidgetAutohide,
    A.WidgetCssClass,
    A.WidgetToggle
], {}, {
    /**
     * Static property used to define the default attribute
     * configuration for the `ColorPickerPopover`.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * The alignment configuration for `ColorPickerPopover`.
         *
         * @attribute align
         * @type {Object}
         */
        align: {
            validator: Lang.isObject,
            value: {
                points: [A.WidgetPositionAlign.TC, A.WidgetPositionAlign.BC]
            }
        },

        /**
         * Determines if `ColorPickerPopover` is visible or not.
         *
         * @attribute visible
         * @default false
         * @type {Boolean}
         */
        visible: {
            validator: Lang.isBoolean,
            value: false
        }
    },

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type {String}
     * @static
     */
    NAME: 'color-picker-popover',

    /**
     * Static property provides a string to identify the namespace.
     *
     * @property NS
     * @type {String}
     * @static
     */
    NS: 'color-picker-popover'
});

A.ColorPickerPopover = ColorPickerPopover;


}, '3.0.1', {
    "requires": [
        "aui-color-picker-base",
        "aui-popover",
        "aui-widget-cssclass",
        "aui-widget-toggle"
    ],
    "skinnable": true
});
