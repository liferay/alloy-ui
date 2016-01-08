/**
 * The Layout Builder Add Col Component
 *
 * @module aui-layout-builder-add-col
 */

var ADD_COLUMN_ACTION = 'addColumn',
    CSS_ADD_COL_DRAGGABLE = A.getClassName('layout', 'builder', 'add', 'col', 'draggable'),
    CSS_ADD_COL_DRAGGABLE_HANDLE = A.getClassName('layout', 'builder', 'add', 'col', 'handle'),
    CSS_RESIZE_COL_DRAGGABLE_HANDLE = A.getClassName('layout', 'builder', 'resize', 'col', 'draggable', 'handle'),
    SELECTOR_ROW = '.layout-row';

/**
 * LayoutBuilder extension, which can be used to add the funcionality of adding
 * columns to the builder's layout.
 *
 * @class A.LayoutBuilderAddCol
 * @param {Object} config Object literal specifying layout builder configuration
 *     properties.
 * @constructor
 */

A.LayoutBuilderAddCol = function() {};

A.LayoutBuilderAddCol.prototype = {
    /**
     * Construction logic executed during `A.LayoutBuilderAddCol` instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._eventHandles.push(
            this.after('enableAddColsChange', this._afterEnableAddColsChange),
            this.after('enableResizeColsChange', this._afterEnableAddColsChange),
            this.after('layout:isColumnModeChange', A.bind(this._afterAddColIsColumnModeChange, this))
        );

        this._uiSetEnableAddCols(this.get('enableAddCols'));
    },

    /**
     * Destructor implementation for the `A.LayoutBuilderAddCol` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this._unbindAddColEvents();
    },

    /**
     * Fired after `isColumnMode` changes.
     *
     * @method _afterAddColIsColumnModeChange
     * @protected
     */
    _afterAddColIsColumnModeChange: function() {
        this._uiSetEnableAddCols(this.get('enableAddCols'));
    },

    /**
     * Fired after the `cols` attribute changes.
     *
     * @method _afterAddColLayoutColsChange
     * @param {EventFacace} event
     * @protected
     */
    _afterAddColLayoutColsChange: function(event) {
        var row = event.target.get('node').one(SELECTOR_ROW);
        this._appendAddColButtonToSingleRow(row);
    },

    /**
     * Fired after the `rows` attribute changes.
     *
     * @method _afterAddColRowsChange
     * @protected
     */
    _afterAddColRowsChange: function() {
        this._removeAddColButton();
        this._appendAddColButtonToRows();
    },

    /**
     * Fired after the `enableAddCols` attribute changes.
     *
     * @method _afterEnableAddColsChange
     * @protected
     */
    _afterEnableAddColsChange: function() {
        this._uiSetEnableAddCols(this.get('enableAddCols'));
    },

    /**
     * Appends add col button on each row.
     *
     * @method _appendAddColButtonToRows
     * @protected
     */
    _appendAddColButtonToRows: function() {
        var instance = this,
            rows = this._layoutContainer.all(SELECTOR_ROW);

        rows.each(function(row) {
            instance._appendAddColButtonToSingleRow(row);
        });
    },

    /**
     * Appends add col button for a single row.
     *
     * @method _appendAddColButtonToSingleRow
     * @param {Node} row Row to append the add col buttons.
     * @protected
     */
    _appendAddColButtonToSingleRow: function(row) {
        var cols,
            layoutRow = row.getData('layout-row'),
            draggableLeft,
            draggableRight;

        cols = layoutRow.get('cols');

        if (cols.length < layoutRow.get('maximumCols')) {
            draggableLeft = A.Node.create(this.TPL_RESIZE_COL_DRAGGABLE);
            draggableRight = A.Node.create(this.TPL_RESIZE_COL_DRAGGABLE);

            draggableLeft.one('.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).addClass(CSS_ADD_COL_DRAGGABLE_HANDLE);
            draggableLeft.addClass(CSS_ADD_COL_DRAGGABLE);
            draggableLeft.setData('layout-action', ADD_COLUMN_ACTION);
            draggableLeft.setData('layout-position', 0);
            draggableLeft.setData('layout-col2', cols[0]);
            draggableLeft.setStyle('left', '0%');
            
            draggableRight.addClass(CSS_ADD_COL_DRAGGABLE);
            draggableRight.one('.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).addClass(CSS_ADD_COL_DRAGGABLE_HANDLE);
            draggableRight.setData('layout-action', ADD_COLUMN_ACTION);
            draggableRight.setData('layout-position', layoutRow.get('maximumCols'));
            draggableRight.setData('layout-col1', cols[cols.length - 1]);
            draggableRight.setStyle('left', '100%');

            row.append(draggableLeft);
            row.append(draggableRight);
        }
    },

    /**
     * Binds the necessary events for the functionality of adding columns to the
     * layout.
     *
     * @method _bindAddColEvents
     * @protected
     */
    _bindAddColEvents: function() {
        this._addColsEventHandles = [
            this.after('layout-row:colsChange', this._afterAddColLayoutColsChange),
            this.after('layout:rowsChange', this._afterAddColRowsChange)
        ];
    },

    /**
     * Removes all add col buttons.
     *
     * @method _removeAddColButton
     * @protected
     */
    _removeAddColButton: function() {
        this._layoutContainer.all('.' + CSS_ADD_COL_DRAGGABLE).remove();
    },

    /**
     * Updates the UI according to the value of the `enableAddCols` attribute.
     *
     * @method _uiSetEnableAddCols
     * @param {Boolean} enableAddCols
     * @protected
     */
    _uiSetEnableAddCols: function(enableAddCols) {
        if (enableAddCols && this.get('layout').get('isColumnMode') && this.get('enableResizeCols')) {
            this._appendAddColButtonToRows();
            this._bindAddColEvents();
        }
        else {
            this._removeAddColButton();
            this._unbindAddColEvents();
        }
    },

    /**
     * Unbinds the events related to the functionality of adding columns to the
     * layout.
     *
     * @method _unbindAddColEvents
     * @protected
     */
    _unbindAddColEvents: function() {
        if (this._addColsEventHandles) {
            (new A.EventHandle(this._addColsEventHandles)).detach();
        }
    }
};

/**
 * Static property used to define the default attribute configuration for the
 * `A.LayoutBuilderAddCol`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
A.LayoutBuilderAddCol.ATTRS = {

    /**
     * Flag indicating if the feature of adding columns to the layout is
     * enabled or not.
     *
     * @attribute enableAddCols
     * @default true
     * @type {Boolean}
     */
    enableAddCols: {
        validator: A.Lang.isBoolean,
        value: true
    }
};