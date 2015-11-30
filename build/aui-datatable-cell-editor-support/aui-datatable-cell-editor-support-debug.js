YUI.add('aui-datatable-cell-editor-support', function (A, NAME) {

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
 * properties.
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
 * Number which provides a `z-index` style value for the `A.BaseCellEditor`.
 *
 * @property EDITOR_ZINDEX
 * @default 9999
 * @type Number
 * @static
 */
CellEditorSupport.EDITOR_ZINDEX = 9999;

/**
 * Static property used to define the default attribute configuration for the
 * `A.CellEditorSupport`.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
CellEditorSupport.ATTRS = {

    /**
     * Defines the event which displays the `A.BaseCellEditor`.
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
     * Construction logic executed during `A.CellEditorSupport` instantiation.
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

        A.after(instance._afterSelectionKey, instance, '_onSelectionKey');
    },

    /**
     * Return the `A.BaseCellEditor` instance for the given `record` and `column`
     * arguments.
     *
     * @param {Model} record
     * @param {Object} column Column configuration.
     * @static
     * @return {BaseCellEditor} The `BaseCellEditor` instance.
     *
     * Will return `null` if both `column` and `record` editors are not found.
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
     * Fires after the `A.CellEditorSupport` has rendered, and calls
     * `_syncModelsReadOnlyUI`.
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
     * Fires after '_onSelectionKey'. Opens editor of 'activeCell' on key press.
     *
     * @method _afterSelectionKey
     * @param {EventFacade} event
     * @protected
     */
    _afterSelectionKey: function(event) {
        var instance = this,
            activeCell = instance.get('activeCell');

        if (activeCell && (event.keyCode === 13)) {
            instance._onEditCell(activeCell);
        }
    },

    /**
     * `render()` and `show()` the `A.BaseCellEditor`, of the active table cell.
     *
     * Called when active table cell is clicked (default).
     *
     * @method _onEditCell
     * @param {EventFacade} event The event defined in attribute `editEvent`.
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
                    save: A.bind(instance._onEditorSave, instance),
                    cancel: A.bind(instance._onEditorCancel, instance)
                });

                editor.set('zIndex', CellEditorSupport.EDITOR_ZINDEX);
                editor.render();
            }

            editor.set('value', record.get(column.key));

            editor.show().move(alignNode.getXY());
        }
    },

    /**
     * Invoked when the editor fires the 'cancel' event.
     *
     * @method _onEditorCancel
     * @protected
     */
    _onEditorCancel: function() {
        var instance = this;

        instance._refocusActiveCell();
    },

    /**
     * Invoked when the editor fires the 'save' event.
     *
     * @method _onEditorSave
     * @param {EventFacade} event
     * @protected
     */
    _onEditorSave: function(event) {
        var instance = this,
            editor = event.currentTarget,
            column = instance.getActiveColumn(),
            record = instance.getActiveRecord();

        editor.set('value', event.newVal);

        record.set(column.key, event.newVal);

        instance._refocusActiveCell();
    },

    /**
     * Calls `_syncFocus` if the `A.BaseCellEditor` input has a new value.
     *
     * Called on the `visibleChange` event.
     *
     * @method _onEditorVisibleChange
     * @param {EventFacade} event
     * @protected
     */
    _onEditorVisibleChange: function(event) {
        var editor = event.currentTarget;

        if (event.newVal) {
            editor._syncFocus();
        }
    },

    /**
     * Places keyboard focus onto the last active cell.
     *
     * @method _refocusActiveCell
     * @protected
     */
    _refocusActiveCell: function() {
        var instance = this,
            activeCell = instance.get('activeCell'),
            coords = instance.getCoord(activeCell);

        instance.set('activeCoord', coords);
        instance.set('selection', coords);
    },

    /**
     * Toggles the row's `read-only` class. Toggle determined by the `readOnly`
     * attribute of the `Model`.
     *
     * @method _syncModelReadOnlyUI
     * @param {Model} model
     * @protected
     */
    _syncModelReadOnlyUI: function(model) {
        var instance = this,
            row = instance.getRow(model);

        row.toggleClass(instance.CLASS_NAMES_CELL_EDITOR_SUPPORT.readOnly, model.get('readOnly') === true);
    },

    /**
     * Calls `_syncModelReadOnlyUI` for each `Model` in the `data` attribute.
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
     * Forwards method call to `getEditor`.
     *
     * @deprecated  Use `getEditor` instead.
     * @method getCellEditor
     * @return {BaseCellEditor} See `getEditor`
     * @static
     */
    getCellEditor: function() {
        return this.getEditor.apply(this, arguments);
    },

    /**
     * Syntactic sugar for `record.get(column.key)`.
     *
     * @deprecated
     * @method getRecordColumnValue
     * @param {Model} record
     * @param {Object} column Column configuration.
     * @return {String} Record column key.
     */
    getRecordColumnValue: function(record, column) {
        return record.get(column.key);
    }
});

A.DataTable.CellEditorSupport = CellEditorSupport;

A.Base.mix(A.DataTable, [CellEditorSupport]);


}, '3.0.1', {"requires": ["datatable-base"]});
