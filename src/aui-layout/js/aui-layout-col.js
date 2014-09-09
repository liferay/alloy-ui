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
            bootstrapClass = BOOTSTRAP_CLASS_PREFIX + size,
            value = this.get('value');

        col.addClass(bootstrapClass);
        col.append(value.content);

        return col;
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
         * Column field
         *
         * @attribute field
         * @type {Object}
         */
        value: {
            validator: A.isObject,
            value: {
                content: 'foo'
            }
        },

        /**
         * Columns's size
         *
         * @attribute size
         * @type {Number}
         */
        size: {
            setter: A.isNumber,
        }
    }
});
