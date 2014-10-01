/**
 * The Form Builder Layout Col Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-layout-col
 */

var CSS_LAYOUT_COL = A.getClassName('form', 'builder', 'layout', 'col'),

    TPL_LAYOUT_COL = '<div class="' + CSS_LAYOUT_COL + '"></div>';

/**
 * A base class for Form Builder Layout Col. Layout columns used by the form
 * extend from this class.
 *
 * @class A.FormBuilderLayoutCol
 * @extends A.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderLayoutCol = A.Base.create('form-builder-layout-col', A.Base, [], {

}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormBuilderLayoutCol`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Node containing the contents of this layout column.
         *
         * @attribute content
         * @type Node
         */
        content: {
            validator: function(val) {
                return A.instanceOf(val, A.Node);
            },
            valueFn: function() {
                return A.Node.create(TPL_LAYOUT_COL);
            },
            writeOnce: 'initOnly'
        }
    }
});
