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

        A.Array.invoke(this.get('rows'), 'addTarget', this);

        this._uiSetRows(this.get('rows'));
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
        var rows = this.get('rows').concat();

        if (A.Lang.isUndefined(index)) {
            index = rows.length;
        }

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
        container.setHTML(this.get('node'));
    },

    /**
     * Moves a row to a different position.
     *
     * @method moveRow
     * @param {Node} row Row to change the position.
     * @param {Number} position The new position of the row.
     **/
    moveRow: function(row, position) {
        var index,
            rows = this.get('rows').concat();

        index = rows.indexOf(row);

        rows.splice(position, 0, row);

        if (index >= position) {
            rows.splice(index + 1, 1);
        }
        else {
            rows.splice(index, 1);
        }

        this.set('rows', rows);
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
        A.Array.invoke(event.prevVal, 'removeTarget', this);
        A.Array.invoke(event.newVal, 'addTarget', this);

        this._uiSetRows(this.get('rows'));
    },

    /**
     * Removes a row from this layout by it's index.
     *
     * @method _removeRowByIndex
     * @param {Number} index Row index to be removed from this layout
     * @protected
     */
    _removeRowByIndex: function(index) {
        var rows = this.get('rows').concat();

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
        var index,
            rows = this.get('rows').concat();

        index = A.Array.indexOf(rows, row);

        if (index >= 0) {
            this._removeRowByIndex(index);
        }
    },

    /**
     * Updates the UI according to the value of the `rows` attribute.
     *
     * @method _uiSetRows
     * @param {Array} rows
     * @protected
     */
    _uiSetRows: function(rows) {
        var node = this.get('node');

        node.empty();
        A.each(rows, function(row) {
            node.append(row.get('node'));
        });
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
         * The node where this column will be rendered.
         *
         * @attribute node
         * @type Node
         */
        node: {
            validator: A.Lang.isNode,
            valueFn: function() {
                return A.Node.create('<div></div>');
            },
            writeOnce: 'initOnly'
        },

        /**
         * Rows to be appended into container node
         *
         * @attribute rows
         * @type {Array}
         */
        rows: {
            validator: A.Lang.isArray,
            value: []
        }
    }
});
