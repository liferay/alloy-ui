/**
 * The Data Editor Component
 *
 * @module aui-data-editor
 */

var CSS_EDITOR = A.getClassName('data', 'editor'),
    CSS_EDITOR_CONTENT_INNER = A.getClassName('data', 'editor', 'content', 'inner'),

    TPL_EDITOR = '<div class="' + CSS_EDITOR + '"><label></label>' +
        '<div class="' + CSS_EDITOR_CONTENT_INNER + '"></div>' +
        '</div>';

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
    TPL_EDITOR_CONTENT: '<div></div>',

    /**
     * Constructor for the `A.DataEditor`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var node = this.get('node');

        node.one('.' + CSS_EDITOR_CONTENT_INNER).setHTML(this.TPL_EDITOR_CONTENT);

        this._uiSetOriginalValue(this.get('originalValue'));
        this._uiSetLabel(this.get('label'));

        this.after({
            originalValueChange: this._afterOriginalValueChange,
            labelChange: this._afterLabelChange
        });
    },

    /**
     * Fired after the `label` attribute is set.
     *
     * @method _afterLabelChange
     * @protected
     */
    _afterLabelChange: function() {
        this._uiSetLabel(this.get('label'));
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
    },

    /**
     * Updates the ui according to the value of the `label` attribute.
     *
     * @method _uiSetLabel
     * @param {String} label
     * @protected
     */
    _uiSetLabel: function(label) {
        return this.get('node').one('label').set('text', label);
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
         * The label to be used by this boolean editor.
         *
         * @attribute label
         * @default ''
         * @type String
         */
        label: {
            value: ''
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
                return A.Node.create(TPL_EDITOR);
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
