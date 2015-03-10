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
        var cols = this.get('cols').concat();

        if (A.Lang.isUndefined(index)) {
            index = cols.length;
        }

        if (!col) {
            col = new A.LayoutCol();
        }

        cols.splice(index, 0, col);

        cols = this._resizeCols(cols);

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
     * Removes a col from this row by it's index.
     *
     * @method _removeColByIndex
     * @param {Number} index Column index to be removed from this row
     * @protected
     */
    _removeColByIndex: function(index) {
        var cols = this.get('cols').concat();
        cols.splice(index, 1);
        cols = this._resizeCols(cols);
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
     * @method _resizeCols
     * @param {Array} cols Columns to be resized.
     * @return {Array} Columns resized.
     * @protected
     */
    _resizeCols: function(cols) {
        var colsLength = cols.length,
            colSize = ALLOWED_SIZE / colsLength,
            difference = 0,
            i = 0,
            lastSize,
            totalSize = colsLength * colSize;

        if (!A.Lang.isInteger(colSize)) {
            colSize = Math.round(colSize);
            totalSize = colsLength * colSize;

            if (totalSize > ALLOWED_SIZE) {
                difference = totalSize - ALLOWED_SIZE;
            }
        }

        A.each(cols, function(col) {
            col.set('size', colSize);
        });

        for (i = 0; i < difference; i++) {
            cols[i].set('size', cols[i].get('size') - 1);
        }

        lastSize = ALLOWED_SIZE - (totalSize - colSize - difference);
        cols[cols.length - 1].set('size', lastSize);

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
