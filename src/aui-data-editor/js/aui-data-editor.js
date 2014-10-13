/**
 * The Data Editor Component
 *
 * @module aui-data-editor
 */

/**
 * A base class for Data Editor. All data editors should extend from this.
 *
 * @class A.DataEditor
 * @extends A.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.DataEditor = A.Base.create('data-editor', A.Base, [], {
    TPL_EDITOR: '<div></div>',

    /**
     * Constructor for the `A.DataEditor`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after('originalValueChange', this._afterOriginalValueChange);

        this._uiSetOriginalValue(this.get('originalValue'));
    },

    /**
     * Destructor lifecycle implementation for the `A.DataEditor` class.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this.get('node').remove(true);
    },

    /**
     * Fired after the `originalValue` attribute is set.
     *
     * @method _afterOriginalValueChange
     * @protected
     */
    _afterOriginalValueChange: function() {
        this._uiSetOriginalValue(this.get('originalValue'));
    },

    /**
     * Updates the ui according to the value of the `originalValue` attribute.
     * This should be overridden by subclasses.
     *
     * @method _uiSetOriginalValue
     * @protected
     */
    _uiSetOriginalValue: function() {
        throw new Error('Subclasses should override _uiSetOriginalValue');
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.DataEditor`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The value after edition.
         *
         * @attribute editedValue
         * @default null
         * @type *
         */
        editedValue: {
            value: null
        },

        /**
         * The node where the editor UI is rendered.
         *
         * @attribute node
         * @type Node
         */
        node: {
            readOnly: true,
            valueFn: function() {
                return A.Node.create(this.TPL_EDITOR);
            }
        },

        /**
         * The value to be edited.
         *
         * @attribute originalValue
         * @default null
         * @type *
         */
        originalValue: {
            value: null
        }
    }
});
