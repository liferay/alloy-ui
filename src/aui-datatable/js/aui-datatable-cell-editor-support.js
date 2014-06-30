var isBaseEditor,
    CellEditorSupport;

isBaseEditor = function(val) {
    return (val instanceof A.BaseCellEditor);
};

/**
 * An extension for A.DataTable to support Cell Editing.
 *
 * @class A.DataTable.CellEditorSupport
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
CellEditorSupport = function() {};

/**
 * Static property provides a string to identify the class.
 *
 * @property NAME
 * @type String
 * @static
 */
CellEditorSupport.NAME = 'dataTableCellEditorSupport';

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property EDITOR_ZINDEX
 * @default 9999
 * @type Number
 * @static
 */
CellEditorSupport.EDITOR_ZINDEX = 9999;

/**
 * Static property used to define the default attribute
 * configuration for the CellEditorSupport.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
CellEditorSupport.ATTRS = {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute editEvent
     * @default 'click'
     * @type String
     */
    editEvent: {
        setter: '_setEditEvent',
        validator: A.Lang.isString,
        value: 'click'
    }
};

A.mix(CellEditorSupport.prototype, {

    /**
     * Construction logic executed during CellEditorSupport instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this,
            editEvent = instance.get('editEvent');

        instance.CLASS_NAMES_CELL_EDITOR_SUPPORT = {
            cell: instance.getClassName('cell'),
            readOnly: instance.getClassName('read', 'only')
        };

        instance.after('render', instance._afterCellEditorSupportRender);

        instance.delegate(editEvent, instance._onEditCell, '.' + instance.CLASS_NAMES_CELL_EDITOR_SUPPORT.cell,
            instance);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getEditor
     * @param record
     * @param column
     */
    getEditor: function(record, column) {
        var columnEditor = column.editor,
            recordEditor = record.get('editor');

        if (columnEditor === false || recordEditor === false) {
            return null;
        }

        return recordEditor || columnEditor;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterCellEditorSupportRender
     * @protected
     */
    _afterCellEditorSupportRender: function() {
        var instance = this;

        instance._syncModelsReadOnlyUI();

        instance.body.after(A.bind(instance._syncModelsReadOnlyUI, instance), instance.body, 'render');
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onEditCell
     * @param event
     * @protected
     */
    _onEditCell: function(event) {
        var instance = this,
            activeCell = instance.get('activeCell'),
            alignNode = event.alignNode || activeCell,
            column = instance.getColumn(alignNode),
            record = instance.getRecord(alignNode),
            editor = instance.getEditor(record, column);

        if (isBaseEditor(editor) && !record.get('readOnly')) {
            if (!editor.get('rendered')) {
                editor.on({
                    visibleChange: A.bind(instance._onEditorVisibleChange, instance),
                    save: A.bind(instance._onEditorSave, instance)
                });

                editor.set('zIndex', CellEditorSupport.EDITOR_ZINDEX);
                editor.render();
            }

            editor.set('value', record.get(column.key));

            editor.show().move(alignNode.getXY());
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onEditorSave
     * @param event
     * @protected
     */
    _onEditorSave: function(event) {
        var instance = this,
            editor = event.currentTarget,
            column = instance.getActiveColumn(),
            record = instance.getActiveRecord();

        editor.set('value', event.newVal);

        // TODO: Memorize the activeCell coordinates to set the focus on it
        // instead
        instance.set('activeCell', instance.get('activeCell'));

        record.set(column.key, event.newVal);

        // TODO: Sync highlight frames UI instead?
        if (instance.highlight) {
            instance.highlight.clear();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onEditorVisibleChange
     * @param event
     * @protected
     */
    _onEditorVisibleChange: function(event) {
        var editor = event.currentTarget;

        if (event.newVal) {
            editor._syncFocus();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _syncModelReadOnlyUI
     * @param model
     * @protected
     */
    _syncModelReadOnlyUI: function(model) {
        var instance = this,
            row = instance.getRow(model);

        row.toggleClass(instance.CLASS_NAMES_CELL_EDITOR_SUPPORT.readOnly, model.get('readOnly') === true);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _syncModelsReadOnlyUI
     * @protected
     */
    _syncModelsReadOnlyUI: function() {
        var instance = this;

        instance.get('data').each(function(model) {
            instance._syncModelReadOnlyUI(model);
        });
    },

    // Deprecated methods
    // Use getEditor

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getCellEditor
     */
    getCellEditor: function() {
        return this.getEditor.apply(this, arguments);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getRecordColumnValue
     * @param record
     * @param column
     */
    getRecordColumnValue: function(record, column) {
        return record.get(column.key);
    }
});

A.DataTable.CellEditorSupport = CellEditorSupport;

A.Base.mix(A.DataTable, [CellEditorSupport]);
