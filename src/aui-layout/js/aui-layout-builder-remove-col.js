/**
 * The Layout Builder Remove Col Component
 *
 * @module aui-layout-builder-remove-col
 */

var CSS_REMOVE_COL = A.getClassName('layout', 'builder', 'remove', 'col', 'button'),
    SELECTOR_COL = '.col',
    SELECTOR_ROW = '.layout-row',
    TPL_REMOVE_COL = '<span class="glyphicon glyphicon-remove ' + CSS_REMOVE_COL + '" tabindex="7"></span>';

/**
 * LayoutBuilder extension, which can be used to add the funcionality of removing
 * columns from the builder's layout.
 *
 * @class A.LayoutBuilderRemoveCol
 * @param {Object} config Object literal specifying layout builder configuration
 *     properties.
 * @constructor
 */
A.LayoutBuilderRemoveCol = function() {};

A.LayoutBuilderRemoveCol.prototype = {

    /**
     * Construction logic executed during LayoutBuilderRemoveCol instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._eventHandles.push(
            this.after('enableRemoveColsChange', this._afterEnableRemoveColsChange),
            this.after('layout-col:removableChange', this._afterRemoveColRemovableChange)
        );

        this._uiSetEnableRemoveCols(this.get('enableRemoveCols'));
    },

    /**
     * Destructor implementation for the `A.LayoutBuilderRemoveCol` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this._unbindRemoveColEvents();
    },

    /**
     * Fired after the `enableRemoveCols` attribute changes.
     *
     * @method _afterEnableRemoveColsChange
     * @protected
     */
    _afterEnableRemoveColsChange: function() {
        this._uiSetEnableRemoveCols(this.get('enableRemoveCols'));
    },

    /**
     * Fired after the `cols` attribute changes.
     *
     * @method _afterRemoveColLayoutColsChange
     * @param {EventFacade} event
     * @protected
     */
    _afterRemoveColLayoutColsChange: function(event) {
        var cols,
            containerRow = event.target.get('node');

        containerRow.all('.' + CSS_REMOVE_COL).remove();

        cols = containerRow.all(SELECTOR_COL);

        this._appendRemoveButtonToCols(cols);
    },

    /**
     * Fired after the `removable` attribute changes.
     *
     * @method _afterRemoveColRemovableChange
     * @protected
     */
    _afterRemoveColRemovableChange: function(event) {
        var col = event.target.get('node');

        if (!event.newVal) {
            if (col.one('.' + CSS_REMOVE_COL)) {
                col.one('.' + CSS_REMOVE_COL).remove();
            }
        }
        else {
            col.append(A.Node.create(TPL_REMOVE_COL));
        }
    },

    /**
     * Fired after the `rows` attribute changes.
     *
     * @method _afterRemoveColRowsChange
     * @protected
     */
    _afterRemoveColRowsChange: function() {
        this._removeColButton();
        this._appendRemoveButtonToCols();
    },

    /**
     * Appends remove col button on each col.
     *
     * @method _appendRemoveButtonToCols
     * @param {NodeList} cols Cols to add the remove col button
     * @protected
     */
    _appendRemoveButtonToCols: function(cols) {
        var layoutCol,
            removeColButton;

        cols = cols || this._layoutContainer.all(SELECTOR_COL);

        cols.each(function(col) {
            layoutCol = col.getData('layout-col');

            if (layoutCol.get('removable')) {
                removeColButton = A.Node.create(TPL_REMOVE_COL);
                col.append(removeColButton);
            }
        });
    },

    /**
     * Binds the necessary events for the functionality of removing columns from
     * the layout.
     *
     * @method _bindRemoveColEvents
     * @protected
     */
    _bindRemoveColEvents: function() {
        var container = this.get('container');

        this._removeColsEventHandles = [
            container.delegate('click', A.bind(this._onMouseClickRemoveColEvent, this), '.' + CSS_REMOVE_COL),
            container.delegate('key', A.bind(this._onKeyPressRemoveColEvent, this), 'press:13', '.' + CSS_REMOVE_COL),
            this.after('layout-row:colsChange', this._afterRemoveColLayoutColsChange),
            this.after('layout:rowsChange', A.bind(this._afterRemoveColRowsChange, this))
        ];
    },

    /**
     * Fired on `key:press` event for the remove column button.
     *
     * @method _onKeyPressRemoveColEvent
     * @param {EventFacade} event
     * @protected
     */
    _onKeyPressRemoveColEvent: function(event) {
        this._removeCol(event.target.ancestor(SELECTOR_COL));
    },

    /**
     * Fired on `click` event for the remove column button.
     *
     * @method _onMouseClickRemoveColEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickRemoveColEvent: function(event) {
        var colsSize,
            row = event.target.ancestor(SELECTOR_ROW);

        colsSize = row.all(SELECTOR_COL).size();

        if (colsSize > 1) {
            this._removeCol(event.target.ancestor(SELECTOR_COL));
        }
        else {
            this.get('layout').removeRow(row.getData('layout-row'));
        }
    },

    /**
     * Removes col from row.
     *
     * @method _removeCol
     * @param {Node} col
     * @protected
     */
    _removeCol: function(col) {
        var row = col.ancestor().getData('layout-row');

        row.removeCol(col.getData('layout-col'));
    },

    /**
     * Removes all remove col buttons.
     *
     * @method _removeColButton
     * @protected
     */
    _removeColButton: function() {
        this._layoutContainer.all('.' + CSS_REMOVE_COL).remove();
    },

    /**
     * Updates the UI according to the value of the `enableRemoveCols` attribute.
     *
     * @method _uiSetEnableRemoveCols
     * @param {Boolean} enableRemoveCols
     * @protected
     */
    _uiSetEnableRemoveCols: function(enableRemoveCols) {
        if (enableRemoveCols) {
            this._appendRemoveButtonToCols();
            this._bindRemoveColEvents();
        }
        else {
            this._removeColButton();
            this._unbindRemoveColEvents();
        }
    },

    /**
     * Unbinds the events related to the functionality of removing columns from
     * the layout.
     *
     * @method _unbindRemoveColEvents
     * @protected
     */
    _unbindRemoveColEvents: function() {
        if (this._removeColsEventHandles) {
            (new A.EventHandle(this._removeColsEventHandles)).detach();
        }
    }
};

/**
 * Static property used to define the default attribute configuration for the
 * `A.LayoutBuilderRemoveCol`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
A.LayoutBuilderRemoveCol.ATTRS = {
    /**
     * Flag indicating if the feature of removing columns from the layout is
     * enabled or not.
     *
     * @attribute enableRemoveCols
     * @default true
     * @type {Boolean}
     */
    enableRemoveCols: {
        validator: A.Lang.isBoolean,
        value: true
    }
};
