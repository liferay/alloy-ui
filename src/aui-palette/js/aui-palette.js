/**
 * The Palette Utility
 *
 * @module aui-palette
 */

var Lang = A.Lang,

    UI_SRC = A.Widget.UI_SRC,

    _NAME = 'palette',
    _DOT = '.',
    _EMPTY = '',
    _SPACE = ' ',

    BOUNDING_BOX = 'boundingBox',
    CLICK = 'click',
    COLUMNS = 'columns',
    CONTAINER_NODE = 'containerNode',
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

/**
 * A base class for Palette.
 *
 * @class A.Palette
 * @extends A.Widget
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
Palette = A.Base.create(_NAME, A.Widget, [A.WidgetCssClass, A.WidgetToggle], {
    CONTAINER_TEMPLATE: '<table class="' + CSS_PALETTE_CONTAINER + '">{content}</table>',

    ITEMS_CONTAINER_TEMPLATE: '<tr class="' + CSS_PALETTE_ITEMS_CONTAINER + _SPACE + CSS_PALETTE_ITEMS_CONTAINER_INDEX + '">{content}</tr>',

    ITEM_TEMPLATE:  '<td class="' + CSS_PALETTE_ITEM + ' {selectedClassName}" data-column={column} data-index={index} data-row={row} data-value="{value}">' +
                        '<a href="" class="' + CSS_PALETTE_ITEM_INNER + '" onclick="return false;"></a>' +
                    '</td>',

    _items: null,

    /**
     * Construction logic executed during Palette instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
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

    /**
     * Render the Palette component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var instance = this;

        instance._uiSetItems(instance.get(ITEMS));
    },

    /**
     * Returns an item in the Palette by row and column.
     *
     * @method getItem
     * @param {Number} row The row in which this item is rendered
     * @param {Number} col The column on which this item is rendered
     * @return {Object} The found palette item
     */
    getItem: function(row, col) {
        var instance = this;

        return instance.getItemByIndex(
                row*instance.get(COLUMNS) + col);
    },

    /**
     * Returns an item in the Palette by its index.
     *
     * @method getItemByIndex
     * @param {Number} index The index of the item
     * @return {Object} The palette item
     */
    getItemByIndex: function(index) {
        var instance = this;

        return instance._getIndexedItems().item(index);
    },

    /**
     * Returns an item in the Palette by its value.
     *
     * @method getItemByValue
     * @param {Object|Number|String} value If the value is an object, it should contain a property called "value" which will be used to retrieve the item.
     * @return {Object} The palette item
     */
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

    /**
     * Selects an item in the Palette.
     *
     * @method select
     * @param {Number|Object} valueOrIndex The value or index of the item which should be selected
     */
    select: function(valueOrIndex) {
        var instance = this;

        instance.toggleSelection(valueOrIndex, true);
    },

    /**
     * Toggles the section of an item. The item must be specified by its value or index. A second param indicates if the selection should be forced.
     *
     * @method toggleSelection
     * @param {Number|Object} valueOrIndex The value or index of the item
     * @param force If true, forces the selection.
     */
    toggleSelection: function(valueOrIndex, force) {
        var instance = this,
            item =  instance.getItemByIndex(valueOrIndex) ||
                    instance.getItemByValue(valueOrIndex);

        if (item) {
            item.toggleClass(CSS_PALETTE_ITEM_SELECTED, force);
        }
    },

    /**
     * Unselects an item. The item must be specified by its value or index.
     *
     * @method unselect
     * @param {Number|Object} valueOrIndex The value or index of the item
     */
    unselect: function(valueOrIndex) {
        var instance = this;

        instance.toggleSelection(valueOrIndex, false);
    },

    /**
     * Updates the UI of the Palette after changing an item.
     *
     * @method _afterItemsChange
     * @param {CustomEvent} event The event fired
     * @protected
     */
    _afterItemsChange: function (event) {
        var instance = this;

        instance._items = null;

        instance._uiSetItems(event.newVal);
    },

    /**
     * Unselects the previous item and selects a new one.
     *
     * @method _afterSelectedChange
     * @param {CustomEvent} event The event fired. Contains the previous selected element as <code>prevVal</code> property and the new selected item as <code>newVal</code>
     * @protected
     */
    _afterSelectedChange: function (event) {
        var instance = this;

        instance.unselect(event.prevVal);
        instance.select(event.newVal);
    },

    /**
     * Binds events on the Palette.
     *
     * @method _bindUIPalette
     * @protected
     */
    _bindUIPalette: function() {
        var instance = this,
            boundingBox = instance.get(BOUNDING_BOX);

        boundingBox.delegate(CLICK, instance._onItemClick, _DOT+CSS_PALETTE_ITEM, instance);
        boundingBox.delegate(HOVER, instance._onItemMouseEnter, instance._onItemMouseLeave, _DOT+CSS_PALETTE_ITEM, instance);
    },

    /**
     * The default function to be executed after <code>enter</code> event.
     * By default adds HOVER class to the item.
     *
     * @method _defEnterFn
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _defEnterFn: function(event) {
        event.item.addClass(CSS_PALETTE_ITEM_HOVER);
    },

    /**
     * The default function to be executed after <code>leave</code> event.
     * By default removes HOVER class from the item.
     *
     * @method _defLeaveFn
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _defLeaveFn: function(event) {
        event.item.removeClass(CSS_PALETTE_ITEM_HOVER);
    },

    /**
     * The default function which executes after <code>select</code> event.
     * By default updates the <code>selected</code> property with the index of the selected item.
     *
     * @method _defSelectFn
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _defSelectFn: function(event) {
        var instance = this;

        if (event.src === UI_SRC) {
            instance.set(SELECTED, event.index);
        }
    },

    /**
     * The default function which executes after <code>unselect</code> event.
     * By default updates the <code>selected</code> property with -1.
     *
     * @method _defUnselectFn
     * @param event
     * @protected
     */
    _defUnselectFn: function(event) {
        var instance = this;

        if (event.src === UI_SRC) {
            instance.set(SELECTED, -1);
        }
    },

    /**
     * Generates and retrieves the whole content of the Palette. The function uses the Formatter from <code>formatter</code> property to format the content.
     *
     * @method _getContent
     * @param {Array} items The items in the Palette
     * @param {Array} columns The columns of the Palette
     * @protected
     * @return {String} The generated content
     */
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

    /**
     * Returns an Object, which contains the following properties:
     * column - The current column
     * item - The current item node
     * index - The current item index
     * row - The current row
     * src - UI_SRC
     * value - The value of the item.
     *
     * @method _getEventsPayload
     * @param {CustomEvent} event The fired event
     * @protected
      * @return {Object} The event payload
     */
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

    /**
     * Returns the items in the Palette as an <code>NodeList</code>.
     *
     * @method _getIndexedItems
     * @protected
     * @return {NodeList} The indexed items
     */
    _getIndexedItems: function () {
        var instance = this;

        if (!instance._items) {
            instance._items = instance.get(CONTENT_BOX).all(_DOT + CSS_PALETTE_ITEM);
        }

        return instance._items;
    },

    /**
     * Replaces the Template of the Container with the content.
     *
     * @method _getPaletteContent
     * @param {Array} items Palette items
     * @param {String} content The generated content
     * @protected
     * return {String} The final content of the Palette according to the Container Template
     */
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

    /**
     * Retrieves the content of a row (the container of the items) in the Palette.
     *
     * @method _getRowContent
     * @param {Array} items The items of the Palette
     * @param {Number} index The index of the item
     * @param {Number} row The row number
     * @param {String} content The content of the row
     * @protected
     * @return {String} The generated content of the row
     */
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

    /**
     * Fires <code>select</code> or <code>unselect</code> events together with the payload.
     *
     * @method _onItemClick
     * @param {CustomEvent} event The fired event
     * @protected
     */
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

    /**
     * Fires <code>enter</code> event.
     *
     * @method _onItemMouseEnter
     * @param {CustomEvent} event
     * @protected
     */
    _onItemMouseEnter: function(event) {
        var instance = this;

        instance.fire(ENTER, instance._getEventsPayload(event));
    },

    /**
     * Fires <code>leave</code> event.
     *
     * @method _onItemMouseLeave
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _onItemMouseLeave: function(event) {
        var instance = this;

        instance.fire(LEAVE, instance._getEventsPayload(event));
    },

    /**
     * Calculates the needed <code>columns</code>, generates the content and adds the content of the <code>contentBox</code> of the Palette.
     *
     * @method _uiSetItems
     * @param {Array} val The items of the Palette
     * @protected
     */
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
            instance.get(CONTAINER_NODE) || instance._getContent(val, columns));
    },

    /**
     * Provides a default value (Function) to the <code>formatter</code> property.
     *
     * @method _valueFormatterFn
     * @protected
     * @return {Function} The formatter function
     */
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

    /**
     * Object hash, defining how attribute values have to be parsed from
     * markup contained in the Palette's content box.
     *
     * @property Palette.HTML_PARSER
     * @type Object
     * @static
     */
    HTML_PARSER: {
        containerNode: _DOT+CSS_PALETTE_CONTAINER
    },

    /**
     * Static property used to define the default attribute
     * configuration for the Palette.
     *
     * @property Palette.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Specifies how many columns should contain the Palette.
         * If the value is a positive number, the Palette will generate as many columns as specified in this property and it will fit
         * the provided <code>items</code> in these columns.
         *
         * @attribute columns
         * @default -1 Value of -1 means the items won't be fit in columns. Otherwise, the items will be rendered in the provided number of columns
         * @type Number
         */
        columns: {
            validator: Lang.isNumber,
            value: -1
        },

        /**
         * Container node of the palette. If found, palette widget will not
         * generate content.
         *
         * @attribute containerNode
         * @type Node
         */
        containerNode: {
        },

        /**
         * Provides a function, which will be used to format the content during Palette creation.
         *
         * @attribute formatter
         * @type Function
         */
        formatter: {
            validator: Lang.isFunction,
            valueFn: '_valueFormatterFn'
        },

        /**
         * An array of Palette items. These items will be rendered in the Palette according to the specified <code>columns</code>.
         *
         * @attribute items
         * @default []
         * @type Array
         */
        items: {
            validator: Lang.isArray,
            value: []
        },

        /**
         * Provides the index of currently selected item.
         *
         * @attribute selected
         * @type Number
         */
        selected: {
            validator: Lang.isNumber,
            value: -1
        },

        /**
         * If true, on user interaction if the user clicks on an already selected element, it will be unselected.
         *
         * @attribute toggleSelection
         * @default true
         * @type Boolean
         */
        toggleSelection: {
            validator: Lang.isBoolean,
            value: true
        }
    }
});

A.Palette = Palette;
