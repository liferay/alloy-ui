/* global A*/

var Lang = A.Lang,

    UI_SRC = A.Widget.UI_SRC,

    _NAME = 'palette',
    _DOT = '.',
    _EMPTY = '',
    _SPACE = ' ',

    BOUNDING_BOX = 'boundingBox',
    CLICK = 'click',
    COLUMNS = 'columns',
    CONTENT_BOX = 'contentBox',
    ENTER = 'enter',
    FORMATTER = 'formatter',
    HOVER = 'hover',
    ITEMS = 'items',
    ITEMS_CHANGE = 'itemsChange',
    LEAVE = 'leave',
    RENDER_UI = 'renderUI',
    SELECT = 'select',
    SELECTED = 'selected',
    SELECTED_CHANGE = 'selectedChange',
    TOGGLE_SELECTION = 'toggleSelection',
    UNSELECT = 'unselect',
    WIDTH = 'width',

    getClassName = A.getClassName,


    CSS_PALETTE_CONTAINER = getClassName('palette-container'),
    CSS_PALETTE_ITEM = getClassName('palette-item'),
    CSS_PALETTE_ITEM_HOVER = getClassName('palette-item-hover'),
    CSS_PALETTE_ITEM_INNER = getClassName('palette-item-inner'),
    CSS_PALETTE_ITEM_SELECTED = getClassName('palette-item-selected'),
    CSS_PALETTE_ITEMS_CONTAINER = getClassName('palette-items-container'),
    CSS_PALETTE_ITEMS_CONTAINER_INDEX = getClassName('palette-items-container-{index}'),

Palette = A.Base.create(_NAME, A.Widget, [], {
    CONTAINER_TEMPLATE: '<table class="' + CSS_PALETTE_CONTAINER + '">{content}</table>',

    ITEMS_CONTAINER_TEMPLATE: '<tr class="' + CSS_PALETTE_ITEMS_CONTAINER + _SPACE + CSS_PALETTE_ITEMS_CONTAINER_INDEX + '">{content}</tr>',

    ITEM_TEMPLATE:  '<td class="' + CSS_PALETTE_ITEM + ' {selectedClassName}" data-column={column} data-index={index} data-row={row} data-value="{value}">' +
                        '<a href="" class="' + CSS_PALETTE_ITEM_INNER + '" onclick="return false;"></a>' +
                    '</td>',

    _items: null,

    initializer: function() {
        var instance = this;

        instance.after(ITEMS_CHANGE, instance._afterItemsChange, instance);
        instance.after(SELECTED_CHANGE, instance._afterSelectedChange, instance);

        A.after(instance._bindUIPalette, instance, RENDER_UI);

        instance.publish({
            enter: { defaultFn: instance._defEnterFn },
            leave: { defaultFn: instance._defLeaveFn },
            select: { defaultFn: instance._defSelectFn },
            unselect: { defaultFn: instance._defUnselectFn }
        });
    },

    renderUI: function() {
        var instance = this;

        instance._uiSetItems(instance.get(ITEMS));
    },

    getItem: function(row, col) {
        var instance = this;

        return instance.getItemByIndex(
                row*instance.get(COLUMNS) + col);
    },

    getItemByIndex: function(index) {
        var instance = this;

        return instance._getIndexedItems().item(index);
    },

    getItemByValue: function (value) {
        var instance = this,
            itemIndex = -1,
            items;

        if (Lang.isObject(value)) {
            value = value.value;
        }

        items = instance.get(ITEMS);

        items.some(function (item, index) {
            if (item.value === value) {
                itemIndex = index;
                return true;
            }
        });

        return instance.getItemByIndex(itemIndex);
    },

    select: function(valueOrIndex) {
        var instance = this;

        instance.toggleSelection(valueOrIndex, true);
    },

    toggleSelection: function(valueOrIndex, force) {
        var instance = this,
            item =  instance.getItemByIndex(valueOrIndex) ||
                    instance.getItemByValue(valueOrIndex);

        if (item) {
            item.toggleClass(CSS_PALETTE_ITEM_SELECTED, force);
        }
    },

    unselect: function(valueOrIndex) {
        var instance = this;

        instance.toggleSelection(valueOrIndex, false);
    },

    _afterItemsChange: function (event) {
        var instance = this;

        instance._items = null;

        instance._uiSetItems(event.newVal);
    },

    _afterSelectedChange: function (event) {
        var instance = this;

        instance.unselect(event.prevVal);
        instance.select(event.newVal);
    },

    _bindUIPalette: function() {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        boundingBox.delegate(CLICK, instance._onItemClick, _DOT+CSS_PALETTE_ITEM, instance);
        boundingBox.delegate(HOVER, instance._onItemMouseEnter, instance._onItemMouseLeave, _DOT+CSS_PALETTE_ITEM, instance);
    },

    _defEnterFn: function(event) {
        event.item.addClass(CSS_PALETTE_ITEM_HOVER);
    },

    _defLeaveFn: function(event) {
        event.item.removeClass(CSS_PALETTE_ITEM_HOVER);
    },

    _defSelectFn: function(event) {
        var instance = this;

        if (event.src === UI_SRC) {
            instance.set(SELECTED, event.index);
        }
    },

    _defUnselectFn: function(event) {
        var instance = this;

        if (event.src === UI_SRC) {
            instance.set(SELECTED, -1);
        }
    },

    _getContent: function(items, columns) {
        var instance = this,
            formatter = instance.get(FORMATTER),
            selected = instance.get(SELECTED),
            column,
            content,
            index = 0,
            result = _EMPTY,
            total = items.length,
            row,
            rows = Math.ceil(total/columns);

        for (row = 0; row < rows; row++) {
            content = _EMPTY;

            for (column = 0; column < columns; column++) {
                index = (row*columns + column);

                if (index >= total) {
                    break;
                }

                content += formatter.call(instance, items, index, row, column, (selected === index));
            }

            result += instance._getRowContent(items, index, row, content);
        }

        return instance._getPaletteContent(items, result);
    },

    _getEventsPayload: function(event) {
        var instance = this,
            items = instance.get(ITEMS),
            index,
            itemNode = event.currentTarget;

        index = Lang.toInt(itemNode.getAttribute('data-index'));

        return {
            column: Lang.toInt(itemNode.getAttribute('data-column')),
            item: itemNode,
            index: index,
            row: Lang.toInt(itemNode.getAttribute('data-row')),
            src: UI_SRC,
            value: items[index]
        };
    },

    _getIndexedItems: function () {
        var instance = this;

        if (!instance._items) {
            instance._items = instance.get(CONTENT_BOX).all(_DOT + CSS_PALETTE_ITEM);
        }

        return instance._items;
    },

    _getPaletteContent: function(items, content) {
        var instance = this;

        return Lang.sub(
            instance.CONTAINER_TEMPLATE,
            {
                className: CSS_PALETTE_CONTAINER,
                content: content
            }
        );
    },

    _getRowContent: function(items, index, row, content) {
        var instance = this;

        return Lang.sub(
            instance.ITEMS_CONTAINER_TEMPLATE,
            {
                className: CSS_PALETTE_ITEMS_CONTAINER_INDEX,
                content: content,
                index: row
            }
        );
    },

    _onItemClick: function(event) {
        var instance = this,
            selected = instance.get(SELECTED),
            toggleSelection = instance.get(TOGGLE_SELECTION),
            eventName,
            itemNode = event.currentTarget,
            index = Lang.toInt(itemNode.getAttribute('data-index'));

        if (index !== selected) {
            eventName = SELECT;
        }
        else if (toggleSelection) {
            eventName = UNSELECT;
        }

        if (eventName) {
            instance.fire(eventName, instance._getEventsPayload(event));
        }
    },

    _onItemMouseEnter: function(event) {
        var instance = this;

        instance.fire(ENTER, instance._getEventsPayload(event));
    },

    _onItemMouseLeave: function(event) {
        var instance = this;

        instance.fire(LEAVE, instance._getEventsPayload(event));
    },

    _uiSetItems: function(val) {
        var instance = this,
            columns,
            width = instance.get(WIDTH);

        if (width) {
            columns = val.length;
        }
        else {
            columns = instance.get(COLUMNS);

            if (columns === -1) {
                columns = val.length;
            }
        }

        instance.get(CONTENT_BOX).setHTML(
            instance._getContent(val, columns));
    },

    _valueFormatterFn: function() {
        return function (items, index, row, column, selected) {
            var instance = this;

            return Lang.sub(
                instance.ITEM_TEMPLATE,
                {
                    column: column,
                    index: index,
                    row: row,
                    selectedClassName: selected ? CSS_PALETTE_ITEM_SELECTED : _EMPTY,
                    value: items[index]
                }
            );
        };
    }
}, {
    ATTRS: {
        columns: {
            validator: Lang.isNumber,
            value: -1
        },

        formatter: {
            validator: Lang.isFunction,
            valueFn: '_valueFormatterFn'
        },

        items: {
            validator: Lang.isArray,
            value: []
        },

        selected: {
            validator: Lang.isNumber
        },

        toggleSelection: {
            validator: Lang.isBoolean,
            value: true
        }
    }
});

A.Palette = Palette;