YUI.add('aui-color-palette', function (A, NAME) {

/**
 * The Color Picker Component
 *
 * @module aui-color-picker
 * @submodule aui-color-palette
 */

var AArray = A.Array,
    AColor = A.Color,
    Lang = A.Lang,

    getClassName = A.getClassName,

    CSS_PALETTE_ITEM = getClassName('palette-item'),
    CSS_PALETTE_ITEM_INNER = getClassName('palette-item-inner'),
    CSS_PALETTE_ITEM_SELECTED = getClassName('palette-item-selected'),

    /**
     * A base class for `ColorPalette`.
     *
     * @class A.ColorPalette
     * @extends Widget
     * @uses A.Palette, A.WidgetCssClass, A.WidgetToggle
     * @param {Object} config Object literal specifying widget configuration
     *     properties.
     * @constructor
     * @include http://alloyui.com/examples/color-picker/basic-markup.html
     * @include http://alloyui.com/examples/color-picker/basic.js
     */
    ColorPalette = A.Base.create('color-palette', A.Widget, [
    A.Palette,
    A.WidgetCssClass,
    A.WidgetToggle
], {
        ITEM_TEMPLATE: '<li class="' + CSS_PALETTE_ITEM +
            ' {selectedClassName}" data-column={column} data-index={index} data-row={row} data-value="{value}">' +
            '<a href="" class="' + CSS_PALETTE_ITEM_INNER +
            '" style="background-color:{value}" onclick="return false;" title="{title}"></a>' + '</li>',

        /**
         * Provides a default value (Function) to the `formatter` property.
         *
         * @method _valueFormatterFn
         * @return {Function} The formatter function
         * @protected
         */
        _valueFormatterFn: function() {
            return function(items, index, row, column, selected) {
                var instance = this,
                    item = items[index];

                return Lang.sub(
                    instance.ITEM_TEMPLATE, {
                        column: column,
                        index: index,
                        row: row,
                        selectedClassName: selected ? CSS_PALETTE_ITEM_SELECTED : '',
                        title: item.name,
                        value: item.value
                    }
                );
            };
        },

        /**
         * Sets `items` attribute of the `ColorPalette` instance.
         *
         * @method _setItems
         * @param {Array} value
         * @return {Object}
         * @protected
         */
        _setItems: function(value) {
            var instance = this,
                result;

            result = AArray.map(value, function(item) {
                var tmp = item,
                    color;

                if (Lang.isString(item)) {
                    color = AColor.toHex(item);

                    tmp = {
                        name: color,
                        value: color
                    };
                }

                return tmp;
            });

            instance._items = null;

            return result;
        }
    }, {

        /**
         * Static property provides a string to identify the CSS prefix.
         *
         * @property CSS_PREFIX
         * @type {String}
         * @static
         */
        CSS_PREFIX: getClassName('color-palette'),

        /**
         * Static property provides a string to identify the class.
         *
         * @property NAME
         * @type {String}
         * @static
         */
        NAME: 'color-palette',

        /**
         * Static property used to define the default attribute
         * configuration for the `ColorPalette`.
         *
         * @property ATTRS
         * @type {Object}
         * @static
         */
        ATTRS: {

            /**
             * Colors available to the `ColorPalette`.
             *
             * @attribute items
             * @type {Array}
             */
            items: {
                setter: '_setItems',
                value: [
                '#9FC6E7',
                '#5484ED',
                '#A4BDFC',
                '#51B749',
                '#FBD75B',
                '#FFB878',
                '#FF887C',
                '#DC2127',
                '#DBADFF',
                '#E1E1E1'
            ]

            }
        }
    });

A.ColorPalette = ColorPalette;


}, '3.0.1', {
    "requires": [
        "array-extras",
        "aui-palette",
        "color-base",
        "node-core",
        "aui-widget-cssclass",
        "aui-widget-toggle"
    ],
    "skinnable": true
});
