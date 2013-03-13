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

A.PropertyList = A.Base.create(A.DataTable.NAME, A.DataTable, [], {
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

    getDefaultEditor: function() {
        return new A.TextCellEditor();
    },

    _afterRenderUI: function() {
        var instance = this;

        instance.get(BOUNDING_BOX).addClass(
            instance.getClassName(PROPERTY_LIST)
        );
    },

    _afterUITriggerSort: function(event) {
        var instance = this;

        instance.highlight.clear();
    },

    _initHighlight: function() {
        var instance = this;

        instance.plug(A.Plugin.DataTableHighlight, {
            highlightRange: false,
            type: ROWS
        });
    },

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

    _onSelectionKey: function(event) {
        var instance = this,
            keyCode = event.keyCode;

        if (keyCode === 13) {
            instance._onEditCell(event);
        }

        A.PropertyList.superclass._onSelectionKey.apply(this, arguments);

        instance._syncPropertyListScrollUI();
    },

    _syncPropertyListScrollUI: function() {
        var instance = this,
            activeRow = instance.get(ACTIVE_ROW);

        if (activeRow && instance.scrollTo) {
            instance.scrollTo(activeRow.get(ID));
        }
    }
},{
    CSS_PREFIX: A.DataTable.CSS_PREFIX,

    ATTRS: {
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

        scrollable: {
            value: true
        },

        editEvent: {
            value: DBLCLICK
        },

        // DataTable scroll breaks when width value is a number
        // See http://yuilibrary.com/projects/yui3/ticket/2532600

        width: {
            setter: String
        },

        strings: {
            value: {
                propertyName: 'Property Name',
                value: 'Value'
            }
        }
    }
});