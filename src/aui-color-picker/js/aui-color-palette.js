/* global A*/

var AArray = A.Array,
    AColor = A.Color,
    Lang = A.Lang,

    getClassName = A.getClassName,

    _NAME = 'color-palette',
    _EMPTY = '',

    CSS_COLOR_PALETTE_ITEM = getClassName('color-palette-item'),
    CSS_PALETTE_ITEM = getClassName('palette-item'),
    CSS_PALETTE_ITEM_INNER = getClassName('palette-item-inner'),
    CSS_PALETTE_ITEM_SELECTED = getClassName('palette-item-selected'),

ColorPalette = A.Base.create(_NAME, A.Widget, [
    A.Palette
], {
    ITEM_TEMPLATE:  '<td class="' + CSS_PALETTE_ITEM + ' {selectedClassName}" data-column={column} data-index={index} data-row={row} data-value="{value}">' +
                        '<a href="" class="' + CSS_PALETTE_ITEM_INNER + '" style="background-color:{value}" onclick="return false;" title="{title}"></a>' +
                    '</td>',

    _valueFormatterFn: function() {
        return function(items, index, row, column, selected) {
            var instance = this,
                item = items[index];

            return Lang.sub(
                instance.ITEM_TEMPLATE,
                {
                    column: column,
                    index: index,
                    row: row,
                    selectedClassName: selected ? CSS_PALETTE_ITEM_SELECTED : _EMPTY,
                    title: item.name,
                    value: item.value
                }
            );
        };
    },

    _setItems: function(value) {
        var instance = this,
            result;

        result = AArray.map(value, function(item, index) {
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
    CSS_PREFIX: getClassName(_NAME),

    NAME: _NAME,

    ATTRS: {
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