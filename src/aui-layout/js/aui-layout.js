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
     * Transforms config object in a DOM template and appends it into the container.
     *
     * @method draw
     **/
    draw: function(container) {
        var rows = this.get('rows');

        container = A.one(container);

        container.empty();

        A.each(
            rows,
            function(row) {
                container.append(row.getContent());
            }
        );
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
            validator: A.isArray
        }
    }
});
