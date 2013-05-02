/* global A */

var Lang = A.Lang,
    ANode = A.Node,

    getClassName = A.getClassName,

    _NAME = 'color-picker-popover',

ColorPickerPopover = A.Base.create(_NAME, A.Popover, [
    A.ColorPickerBase,
    A.WidgetAutohide
], {
}, {
    ATTRS: {
        align: {
            validator: Lang.isObject,
            value: {
                points:[A.WidgetPositionAlign.TC, A.WidgetPositionAlign.BC]
            }
        },

        visible: {
            validator: Lang.isBoolean,
            value: false
        }
    },

    NAME: _NAME,

    NS: _NAME
});

A.ColorPickerPopover = ColorPickerPopover;