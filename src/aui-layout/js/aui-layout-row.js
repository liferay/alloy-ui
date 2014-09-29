/**
 * The Layout Row Component
 *
 * @module aui-layout-row
 */

var ROW_TEMPLATE = '<div class="layout-row row">';

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
     * Adds a col to this row.
     *
     * @method addCol
     * @param {Number} index Index to add the the col.
     * @param {A.LayoutCol} col Col to be added.
     */
    addCol: function(index, col) {
        var cols = this.get('cols');

        if (!col) {
            col = new A.LayoutCol();
        }

        cols.splice(index, 0, col);

        this.set('cols', cols);
    },

    /**
     * Renders row template
     *
     * @method getContent
     * @return {Node} Row template rendered with columns inside
     */
    getContent: function() {
        var cols = this.get('cols'),
            row = A.Node.create(ROW_TEMPLATE);

        row.setData('layout-row', this);

        A.each(cols, function(col) {
            row.append(col.getContent());
        });

        return row;
    },

    /**
     * Returns the sum of all this row's column sizes.
     *
     * @method getSize
     * @return {Number}
     */
    getSize: function() {
        var cols = this.get('cols'),
            size;

        size = A.Array.reduce(cols, 0, function(prev, current) {
            prev = prev + current.get('size');
            return prev;
        });

        return size;
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
     * Removes a col from this row by it's index.
     *
     * @method _removeColByIndex
     * @param {Number} index Column index to be removed from this row
     * @protected
     */
    _removeColByIndex: function(index) {
        var cols = this.get('cols');
        cols.splice(index, 1);
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
        var cols = this.get('cols'),
            index = cols.indexOf(col);

        if (index >= 0) {
            this._removeColByIndex(index);
        }
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
            validator: A.Lang.isArray,
            value: []
        }
    }
});
