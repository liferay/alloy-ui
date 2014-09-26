/**
 * The Layout Col Component
 *
 * @module aui-layout-col
 */

var BOOTSTRAP_CLASS_PREFIX = 'col-sm-',
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
        col.append(value.content || value.get('content'));

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
         * Columns's minimum size.
         *
         * @attribute size
         * @type {Number}
         */
        minSize: {
            value: 3
        },

        /**
         * Columns's size, ranging from 1 to 12.
         *
         * @attribute size
         * @type {Number}
         */
        size: {
            setter: function(val) {
                if (val < this.get('minSize')) {
                    return this.get('minSize');
                }
                else if (val > 12) {
                    return 12;
                }
                else {
                    return val;
                }
            },
            valueFn: function() {
                return this.get('minSize');
            }
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
