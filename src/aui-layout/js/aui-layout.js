/**
 * The Layout Component
 *
 * @module aui-layout
 */

/**
 * A base class for Layout.
 *
 * @class A.Layout
 * @extends Base
 * @param {Object} config Object literal specifying layout configuration
 *     properties.
 * @constructor
 */
A.Layout = A.Base.create('layout', A.Base, [], {

    /**
     * Construction logic executed during Layout instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._eventHandles = [
            this.after('rowsChange', A.bind(this._afterRowsChange, this))
        ];
    },

    /**
     * Destructor implementation for the `A.Layout` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        (new A.EventHandle(this._eventHandles)).detach();
    },

    /**
     * Adds a new row to the current layout.
     *
     * @method addRow
     * @param {Number} index Position to insert the new row.
     * @param {Node} row A brand new row.
     **/
    addRow: function(index, row) {
        var rows = A.clone(this.get('rows'));

        if (!row) {
            row = new A.LayoutRow();
        }

        rows.splice(index, 0, row);

        this.set('rows', rows);
    },

    /**
     * Renders the layout rows and columns into the given container.
     *
     * @method draw
     * @param {Node} container The container to draw the layout on.
     **/
    draw: function(container) {
        var rows = this.get('rows');

        container.empty();

        A.each(rows, function(row) {
            container.append(row.getContent());
        });
    },

    /**
     * Removes a row from this layout.
     *
     * @method removeRow
     * @param {Number | A.LayoutRow} row Row index or row to be removed from this layout
     */
    removeRow: function(row) {
        if (A.Lang.isNumber(row)) {
            this._removeRowByIndex(row);
        }
        else if (A.instanceOf(row, A.LayoutRow)) {
            this._removeRowByReference(row);
        }
    },

    /**
     * Fires after rows changes.
     *
     * @method _afterRowsChange
     * @param {EventFacade} event
     * @protected
     */
    _afterRowsChange: function(event) {
        var newRow = event.newVal,
            prevRows = event.prevVal;

        A.Array.invoke(prevRows, 'removeTarget', this);
        A.Array.invoke(newRow, 'addTarget', this);
    },

    /**
     * Removes a row from this layout by it's index.
     *
     * @method _removeRowByIndex
     * @param {Number} index Row index to be removed from this layout
     * @protected
     */
    _removeRowByIndex: function(index) {
        var rows = A.clone(this.get('rows'));

        rows.splice(index, 1);
        this.set('rows', rows);
    },

    /**
     * Removes a row from this layout by it's reference.
     *
     * @method _removeRowByReference
     * @param {A.LayoutRow} row Column to be removed from this layout
     * @protected
     */
    _removeRowByReference: function(row) {
        var rows = A.clone(this.get('rows')),
            index;

        index = rows.indexOf(row);

        if (index >= 0) {
            rows.splice(index, 1);
            this.set('rows', rows);
        }
    }
}, {

    /**
     * Static property used to define the default attribute
     * configuration for the Layout.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Rows to be appended into container node
         *
         * @attribute rows
         * @type {Array}
         */
        rows: {
            setter: function(rows) {
                A.Array.invoke(rows, 'addTarget', this);
            },
            validator: A.Lang.isArray
        }
    }
});
