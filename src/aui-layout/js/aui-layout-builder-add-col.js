/**
 * The Layout Builder Add Col Component
 *
 * @module aui-layout-builder-add-col
 */

var CSS_ADD_COL = A.getClassName('layout', 'builder', 'add', 'col'),
    CSS_ADD_COL_LEFT = A.getClassName('layout', 'builder', 'add', 'col', 'left'),
    CSS_ADD_COL_RIGHT = A.getClassName('layout', 'builder', 'add', 'col', 'right'),
    CSS_ADD_COL_TEXT = A.getClassName('layout', 'builder', 'add', 'col', 'text'),
    SELECTOR_ROW = '.layout-row',
    TPL_ADD_COL = '<div class="' + CSS_ADD_COL + '" tabindex="5">' +
        '<span class="glyphicon glyphicon-th-large"></span>' +
        '<span class="' + CSS_ADD_COL_TEXT + '">{addColumn}</span>' +
        '</div>';

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
     * Add a col to row.
     *
     * @method _addCol
     * @param {Node} currentTarget
     * @protected
     */
    _addCol: function(currentTarget) {
        var addButton = A.one(currentTarget),
            row = currentTarget.ancestor(SELECTOR_ROW).getData('layout-row');

        if (addButton.hasClass(CSS_ADD_COL_LEFT)) {
            row.addCol(0);
        }
        else {
            row.addCol(row.get('cols').length);
        }
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
        var addColLeft,
            addColRight,
            addColTemplate,
            colsLength,
            layoutRow = row.getData('layout-row');

        colsLength = layoutRow.get('cols').length;
        addColTemplate = A.Lang.sub(TPL_ADD_COL, {
            addColumn: this.get('strings').addColumn
        });

        if (colsLength < layoutRow.get('maximumCols')) {
            addColLeft = A.Node.create(addColTemplate).addClass(CSS_ADD_COL_LEFT);
            addColRight = A.Node.create(addColTemplate).addClass(CSS_ADD_COL_RIGHT);

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
            container.delegate('key', A.bind(this._onKeyPressAddColEvent, this), 'press:13', '.' + CSS_ADD_COL),
            this.after('layout-row:colsChange', this._afterAddColLayoutColsChange),
            this.after('layout:rowsChange', this._afterAddColRowsChange)
        ];
    },

    /**
     * Fired on `key:press` event for the add column button.
     *
     * @method _onKeyPressAddColEvent
     * @param {EventFacade} event
     * @protected
     */
    _onKeyPressAddColEvent: function(event) {
        this._addCol(event.currentTarget);
    },

    /**
     * Fired on `click` event for the add column button.
     *
     * @method _onMouseClickAddColEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickAddColEvent: function(event) {
        this._addCol(event.currentTarget);
    },

    /**
     * Updates the UI according to the value of the `enableAddCols` attribute.
     *
     * @method _uiSetEnableAddCols
     * @param {Boolean} enableAddCols
     * @protected
     */
    _uiSetEnableAddCols: function(enableAddCols) {
        if (enableAddCols && this.get('layout').get('isColumnMode')) {
            this._appendAddColButtonToRows();
            this._bindAddColEvents();
        }
        else {
            this._removeAddColButton();
            this._unbindAddColEvents();
        }
    },

    /**
     * Removes all add col buttons.
     *
     * @method _removeAddColButton
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
