/**
 * The Layout Builder Add Col Component
 *
 * @module aui-layout-builder-add-col
 */

var CSS_ADD_COL = A.getClassName('layout', 'builder', 'add', 'col'),
    CSS_ADD_COL_LEFT = A.getClassName('layout', 'builder', 'add', 'col', 'left'),
    CSS_ADD_COL_RIGHT = A.getClassName('layout', 'builder', 'add', 'col', 'right'),
    SELECTOR_ROW = '.row',
    TPL_ADD_COL = '<span class="glyphicon glyphicon-plus ' + CSS_ADD_COL + '"></span>';

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
     * Button to add a col.
     *
     * @property _addColButton
     * @type {Node}
     * @protected
     */
    _addColButton: null,

    /**
     * Construction logic executed during `A.LayoutBuilderAddCol` instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._addColButton = A.Node.create(TPL_ADD_COL);

        this._eventHandles.push(
            this.after('enableAddColsChange', this._afterEnableAddColsChange)
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
     * Fired after the `cols` attribute changes.
     *
     * @method _afterAddColLayoutColsChange
     * @param {EventFacace} event
     * @protected
     */
    _afterAddColLayoutColsChange: function(event) {
        var row = event.target.get('node').one(SELECTOR_ROW);
        this._appendAddColButtonForARow(row);
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
            instance._appendAddColButtonForARow(row);
        });
    },

    /**
     * Appends add col button for a single row.
     *
     * @method _appendAddColButtonForARow
     * @param {Node} row Row to append the add col buttons.
     * @protected
     */
    _appendAddColButtonForARow: function(row) {
        var addColLeft,
            addColRight,
            colsLength,
            layoutRow = row.getData('layout-row');

        colsLength = layoutRow.get('cols').length;

        if (colsLength < layoutRow.get('maximumCols')) {
            addColLeft = A.Node.create(TPL_ADD_COL).addClass(CSS_ADD_COL_LEFT);
            addColRight = A.Node.create(TPL_ADD_COL).addClass(CSS_ADD_COL_RIGHT);

            row.append(addColLeft);
            row.append(addColRight);
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
        var container = this.get('container');

        this._addColsEventHandles = [
            container.delegate('click', A.bind(this._onMouseClickAddColEvent, this), '.' + CSS_ADD_COL),
            this.after('layout-row:colsChange', this._afterAddColLayoutColsChange),
            this.after('layout:rowsChange', this._afterAddColRowsChange)
        ];
    },

    /**
     * Fired on `click` event for the add column button.
     *
     * @method _onMouseClickAddColEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickAddColEvent: function(event) {
        var addButton = A.one(event.currentTarget),
            row = event.currentTarget.ancestor(SELECTOR_ROW).getData('layout-row');

        if (addButton.hasClass(CSS_ADD_COL_LEFT)) {
            row.addCol(0);
        }
        else {
            row.addCol(row.get('cols').length);
        }
    },

    /**
     * Updates the UI according to the value of the `enableAddCols` attribute.
     *
     * @method _uiSetEnableAddCols
     * @param {Boolean} enableAddCols
     * @protected
     */
    _uiSetEnableAddCols: function(enableAddCols) {
        if (enableAddCols) {
            this._appendAddColButtonToRows();
            this._bindAddColEvents();
        }
        else {
            this._removeAddColButton();
            this._unbindAddColEvents();
        }
    },

    /**
     * Removes all remove col button.
     *
     * @method _removeColButton
     * @protected
     */
    _removeAddColButton: function() {
        this._layoutContainer.all('.' + CSS_ADD_COL).remove();
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
