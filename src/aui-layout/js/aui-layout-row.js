/**
 * The Layout Row Component
 *
 * @module aui-layout-row
 */

var ALLOWED_SIZE = 12,
    SELECTOR_ROW = '.layout-row',
    TPL_ROW = '<div class="layout-row-container-row"><div class="layout-row row"></div></div>';

/**
 * A base class for Layout Row.
 *
 * @class A.LayoutRow
 * @extends Base
 * @param {Object} config Object literal specifying layout configuration
 *     properties.
 * @constructor
 */
A.LayoutRow = A.Base.create('layout-row', A.Base, [], {
    /**
     * Construction logic executed during `A.LayoutRow` instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var cols = this.get('cols');

        A.Array.invoke(cols, 'addTarget', this);

        this.after({
            colsChange: this._afterColsChange
        });

        this._uiSetCols(cols);
    },

    /**
     * Adds a col to this row.
     *
     * @method addCol
     * @param {Number} index Index to add the the col.
     * @param {A.LayoutCol} col Col to be added.
     */
    addCol: function(index, col) {
        var cols = this.get('cols').concat(),
            insertIndex = index;

        if (A.Lang.isUndefined(index)) {
            insertIndex = cols.length;
        }
        else if (A.instanceOf(index, A.LayoutCol)) {
            insertIndex = cols.length;
            col = index;
        }

        if (!col) {
            col = new A.LayoutCol();
        }

        if (insertIndex > cols.length) {
            insertIndex = cols.length;
        }

        cols.splice(insertIndex, 0, col);

        cols = this._resizeColsAfterAdding(cols, insertIndex);

        this.set('cols', cols);
    },

    /**
     * Moves the content of the given column to a different position.
     *
     * @method moveRow
     * @param {A.LayoutCol} col Column to move the content to the new position.
     * @param {Number} position The new position of the column's content.
     **/
    moveColContent: function(position, col) {
        var cols = this.get('cols').concat(),
            targetCol = cols[position];

        targetCol.set('value', col.get('value'));
        col.set('value', null);
    },

    /**
     * Removes a col from this row.
     *
     * @method removeCol
     * @param {Number | A.LayoutCol} col Column index or column to be removed from this row
     */
    removeCol: function(col) {
        if (A.Lang.isNumber(col)) {
            this._removeColByIndex(col);
        }
        else if (A.instanceOf(col, A.LayoutCol)) {
            this._removeColByReference(col);
        }
    },

    /**
     * Fired after the `cols` attribute is set.
     *
     * @method _afterColsChange
     * @param {EventFacade} event
     * @protected
     */
    _afterColsChange: function(event) {
        A.Array.invoke(event.prevVal, 'removeTarget', this);
        A.Array.invoke(event.newVal, 'addTarget', this);

        this._uiSetCols(this.get('cols'));
    },

    /**
     * Resize cols width passing a size.
     *
     * @method _expandNeighborColsWidth
     * @param {Array} cols Columns to be resized
     * @param {Number} size Size to shared between the columns
     * will be increase or decrease
     * @protected
     */
    _expandNeighborColsWidth: function(cols, size) {
        var col1 = cols[0],
            col2 = cols[1];

        col1.set('size', col1.get('size') + Math.ceil(size / cols.length));

        if (col2) {
            col2.set('size', col2.get('size') + Math.floor(size / cols.length));
        }
    },

    /**
     * Find a next and previous column.
     *
     * @method _findNeighbors
     * @param {Array} cols Columns to search into.
     * @param {Number} index Column index reference.
     * @return {Array} Columns neighbors.
     * @protected
     */
    _findNeighbors: function(cols, index) {
        var nextCol = cols[index + 1],
            previousCol = cols[index - 1],
            neighbor = [];

        if (previousCol) {
            neighbor.push(previousCol);
        }

        if (nextCol) {
            neighbor.push(nextCol);
        }

        return neighbor;
    },

    /**
     * Returns the sum of all this row's column sizes.
     *
     * @method getSize
     * @return {Number}
     */
    _getSize: function(cols) {
        var size;

        return A.Array.reduce(cols, 0, function(prev, current) {
            if (!A.instanceOf(current, A.LayoutCol)) {
                size = current.size || 0;
            }
            else {
                size = current.get('size');
            }
            prev += size;
            return prev;
        });
    },

    /**
     * Resize cols width passing a size.
     *
     * @method _reduceNeighborColsWidth
     * @param {Array} cols Columns to be resized
     * @param {Number} size Size to shared between the columns
     * @protected
     */
    _reduceNeighborColsWidth: function(cols, size) {
        var majorCol = cols[0],
            minorCol,
            remove = 0;

        if (cols[1] && cols[1].get('size') > cols[0].get('size')) {
            minorCol = cols[0];
            majorCol = cols[1];
        }

        if (minorCol) {
            remove = Math.min(Math.floor(size / cols.length), minorCol.get('size') - 1);
            minorCol.set('size', minorCol.get('size') - remove);
        }

        majorCol.set('size', majorCol.get('size') - (size - remove));
    },

    /**
     * Removes a col from this row by it's index.
     *
     * @method _removeColByIndex
     * @param {Number} index Column index to be removed from this row
     * @protected
     */
    _removeColByIndex: function(index) {
        var cols = this.get('cols').concat();

        cols.splice(index, 1);
        cols = this._resizeColsAfterRemoving(cols, index);
        this.set('cols', cols);
    },

    /**
     * Removes a col from this row by it's reference.
     *
     * @method _removeColByReference
     * @param {A.LayoutCol} col Column to be removed from this row
     * @protected
     */
    _removeColByReference: function(col) {
        var cols = this.get('cols').concat(),
            index = A.Array.indexOf(cols, col);

        if (index >= 0) {
            this._removeColByIndex(index);
        }
    },

    /**
     * Resizes cols.
     *
     * @method _resizeColsAfterAdding
     * @param {Array} cols Columns to be resized.
     * @param {Number} index Column index reference.
     * @return {Array} Columns resized.
     * @protected
     */
    _resizeColsAfterAdding: function(cols, index) {
        var colSize = cols[index].get('size'),
            previousColSize = 0,
            nextColSize = 0,
            maxWidth = 0,
            neighbor = this._findNeighbors(cols, index);

        previousColSize = neighbor[0].get('size');

        if (neighbor[1]) {
            nextColSize = neighbor[1].get('size');
        }

        maxWidth = (previousColSize + nextColSize) - neighbor.length;

        if (colSize > maxWidth) {
            colSize = maxWidth;
        }

        this._reduceNeighborColsWidth(neighbor, colSize);

        cols[index].set('size', colSize);

        return cols;
    },

    /**
     * Expand nearby cols after deletting another one.
     *
     * @method _resizeColsAfterRemoving
     * @param {Array} cols Columns to be resized.
     * @param {Number} index Column index reference.
     * @return {Array} Columns resized.
     * @protected
     */
    _resizeColsAfterRemoving: function(cols, index) {
        var removedColSize = ALLOWED_SIZE - this._getSize(cols),
            neighbor;

        neighbor = [];

        if (cols[index]) {
            neighbor.push(cols[index]);
        }

        if (cols[index - 1]) {
            neighbor.push(cols[index - 1]);
        }

        this._expandNeighborColsWidth(neighbor, removedColSize);

        return cols;
    },

    /**
     * Sets the `cols` attribute.
     *
     * @method _setCols
     * @param {Array} cols
     * @return {Array}
     * @protected
     */
    _setCols: function(cols) {
        var col,
            i,
            newCols = [],
            size;

        for (i = 0; i < cols.length; i++) {
            col = cols[i];
            if (!A.instanceOf(col, A.LayoutCol)) {
                col = new A.LayoutCol(col);
            }

            newCols.push(col);
        }

        cols = newCols;

        size = this._getSize(cols);

        if (size < ALLOWED_SIZE) {
            cols.push(new A.LayoutCol({ size: ALLOWED_SIZE - size }));
        }

        return cols;
    },

    /**
     * Update the UI according to the value of the `cols` attribute.
     *
     * @method _uiSetCols
     * @param {Array} cols
     * @protected
     */
    _uiSetCols: function(cols) {
        var nodeContainer = this.get('node'),
            node = nodeContainer.one(SELECTOR_ROW);

        nodeContainer.setStyle('height', nodeContainer.get('offsetHeight'));

        node.empty();
        A.each(cols, function(col) {
            node.append(col.get('node'));
        });

        nodeContainer.setStyle('height', '');
    },

    /**
     * Validates the `cols` attribute.
     *
     * @method _validateCols
     * @param  {Array} cols
     * @return {Boolean}
     * @protected
     */
    _validateCols: function(cols) {
        var maximumCols = this.get('maximumCols'),
            size = this._getSize(cols);

        if (size > ALLOWED_SIZE || size < 0 || !A.Lang.isArray(cols) || cols.length > maximumCols) {
            return false;
        }

        return true;
    }
}, {

    /**
     * Static property used to define the default attribute
     * configuration for the Layout Row.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Array containing `A.LayoutCol` objects
         *
         * @attribute cols
         * @default []
         * @type {Array}
         */
        cols: {
            setter: '_setCols',
            validator: '_validateCols',
            value: []
        },

        /**
         * Determines if cols should have the same height.
         *
         * @attribute equalHeight
         * @default true
         * @type {Boolean}
         */
        equalHeight: {
            validator: A.Lang.isBoolean,
            value: true
        },

        /**
         * Number to determine maximum cols on a row.
         *
         * @attribute maximumCols
         * @default 12
         * @type {Number}
         */
        maximumCols: {
            validator: function(val) {
                return val > 0 && val <= 12;
            },
            value: 12
        },

        /**
         * Determine if the row can move.
         *
         * @attribute movable
         * @default true
         * @type {Boolean}
         */
        movable: {
            validator: A.Lang.isBoolean,
            value: true
        },

        /**
         * The node where this column will be rendered.
         *
         * @attribute node
         * @type Node
         */
        node: {
            setter: function(val) {
                val.one(SELECTOR_ROW).setData('layout-row', this);
                return val;
            },
            validator: A.Lang.isNode,
            valueFn: function() {
                return A.Node.create(TPL_ROW);
            },
            writeOnce: 'initOnly'
        },

        /**
         * Determine if the row can be removed.
         *
         * @attribute removable
         * @default true
         * @type {Boolean}
         */
        removable: {
            validator: A.Lang.isBoolean,
            value: true
        }
    }
});
