/**
 * The Datatable Component
 *
 * @module aui-datatable
 * @submodule aui-datatable-property-list
 */

var Lang = A.Lang,
    isFunction = Lang.isFunction,

    ACTIVE_CELL_CHANGE = 'activeCellChange',
    ACTIVE_ROW = 'activeRow',
    AUTO = 'auto',
    BOUNDING_BOX = 'boundingBox',
    CELL = 'cell',
    COLUMNS = 'columns',
    DBLCLICK = 'dblclick',
    ID = 'id',
    INIT_VALUE = 'initValue',
    NAME = 'name',
    PROPERTY_LIST = 'property-list',
    PROPERTY_NAME = 'propertyName',
    ROWS = 'rows',
    VALUE = 'value',

    _DOT = '.';

/**
 * A base class for PropertyList.
 *
 * @class A.PropertyList
 * @extends A.DataTable
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.PropertyList = A.Base.create(A.DataTable.NAME, A.DataTable, [A.WidgetCssClass, A.WidgetToggle], {

    /**
     * Construction logic executed during PropertyList instantiation. Lifecycle.
     *
     * @method initializer
     * @param config
     * @protected
     */
    initializer: function(config) {
        var instance = this;

        instance.CLASS_NAMES_PROPERTY_LIST = {
            cell: instance.getClassName(CELL)
        };

        instance._initHighlight();

        instance.after(instance._afterRenderUI, instance, 'renderUI');
        instance.after(instance._afterUITriggerSort, instance, '_onUITriggerSort');
        instance.on(ACTIVE_CELL_CHANGE, instance._onActiveCellChange);

        // DataTable doesn't allow redefine the columns attribute in extended classes
        // See http://yuilibrary.com/projects/yui3/ticket/2532599

        if (!config.columns) {
            this.set(COLUMNS, instance._state.get(COLUMNS, INIT_VALUE));
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getDefaultEditor
     */
    getDefaultEditor: function() {
        return new A.TextCellEditor();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterRenderUI
     * @protected
     */
    _afterRenderUI: function() {
        var instance = this;

        instance.get(BOUNDING_BOX).addClass(
            instance.getClassName(PROPERTY_LIST)
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterUITriggerSort
     * @param event
     * @protected
     */
    _afterUITriggerSort: function(event) {
        var instance = this;

        instance.highlight.clear();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _initHighlight
     * @protected
     */
    _initHighlight: function() {
        var instance = this;

        instance.plug(A.Plugin.DataTableHighlight, {
            highlightRange: false,
            type: ROWS
        });
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onActiveCellChange
     * @param event
     * @protected
     */
    _onActiveCellChange: function(event) {
        var instance = this,
            activeCell = event.newVal,
            column;

        if (activeCell) {
            column = instance.getColumn(activeCell);

            if (column && (column.key === NAME)) {
                event.newVal = activeCell.next(_DOT+instance.CLASS_NAMES_PROPERTY_LIST.cell);
            }
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onSelectionKey
     * @param event
     * @protected
     */
    _onSelectionKey: function(event) {
        var instance = this,
            keyCode = event.keyCode;

        if (keyCode === 13) {
            instance._onEditCell(event);
        }

        A.PropertyList.superclass._onSelectionKey.apply(this, arguments);

        instance._syncPropertyListScrollUI();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _syncPropertyListScrollUI
     * @protected
     */
    _syncPropertyListScrollUI: function() {
        var instance = this,
            activeRow = instance.get(ACTIVE_ROW);

        if (activeRow && instance.scrollTo) {
            instance.scrollTo(activeRow.get(ID));
        }
    }
},{

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property PropertyList.CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: A.DataTable.CSS_PREFIX,

    /**
     * Static property used to define the default attribute
     * configuration for the PropertyList.
     *
     * @property PropertyList.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute columns
         * @type Function
         */
        columns: {
            valueFn: function() {
                var instance = this;

                return [
                    {
                        editor: false,
                        key: NAME,
                        label: instance.getString(PROPERTY_NAME),
                        sortable: true
                    },
                    {
                        editor: instance.getDefaultEditor(),
                        formatter: function(o) {
                            var instance = this;
                            var data = o.data;

                            if (!data) {
                                return;
                            }

                            var formatter = data.formatter;

                            if (isFunction(formatter)) {
                                return formatter.apply(instance, arguments);
                            }

                            return data.value;
                        },
                        key: VALUE,
                        label: instance.getString(VALUE),
                        sortable: true,
                        width: AUTO
                    }
                ];
            }
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute scrollable
         * @default true
         * @type Boolean
         */
        scrollable: {
            value: true
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute editEvent
         * @default 'dblclick'
         * @type String
         */
        editEvent: {
            value: DBLCLICK
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * DataTable scroll breaks when width value is a number
         * See http://yuilibrary.com/projects/yui3/ticket/2532600
         *
         * @attribute width
         */
        width: {
            setter: String
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute strings
         */
        strings: {
            value: {
                propertyName: 'Property Name',
                value: 'Value'
            }
        }
    }
});