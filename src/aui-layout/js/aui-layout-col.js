/**
 * The Layout Col Component
 *
 * @module aui-layout-col
 */

var BOOTSTRAP_CLASS_PREFIX = 'col-md-',
    COL_TEMPLATE = '<div class="col">';

/**
 * A base class for Layout Col.
 *
 * @class A.LayoutCol
 * @extends Base
 * @param {Object} config Object literal specifying layout configuration
 *     properties.
 * @constructor
 */
A.LayoutCol = A.Base.create('layout-col', A.Base, [], {

    /**
     * Renders column template
     *
     * @method getContent
     * @return {Node} Column template rendered with a field inside
     */
    getContent: function() {
        var col = A.Node.create(COL_TEMPLATE),
            size = this.get('size'),
            value = this.get('value');

        col.setData('layout-col', this);
        col.addClass(BOOTSTRAP_CLASS_PREFIX + size);
        col.append(value.get('content'));

        return col;
    }
}, {

    /**
     * Static property used to define the default attribute
     * configuration for the Layout Col.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Columns's size, ranging from 1 to 12.
         *
         * @attribute size
         * @type {Number}
         */
        size: {
            validator: function(val) {
                return A.Lang.isNumber(val) && val >= 1 && val <= 12;
            },
            value: 12
        },

        /**
         * Object containing a `content` attribute, which will be used as the
         * column's content.
         *
         * @attribute value
         * @type {Object}
         */
        value: {
            validator: A.Lang.isObject
        }
    }
});
