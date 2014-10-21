/**
 * The Scale Data Editor Component
 *
 * @module aui-scale-data-editor
 */

var CSS_SCALE_DATA_EDITOR = A.getClassName('scale', 'data', 'editor'),
    CSS_SCALE_DATA_EDITOR_LOWER_VALUE = A.getClassName('scale', 'data', 'editor', 'lower', 'value'),
    CSS_SCALE_DATA_EDITOR_HIGHER_VALUE = A.getClassName('scale', 'data', 'editor', 'higher', 'value');

/**
 * A base class for Scale Data Editor.
 *
 * @class A.ScaleDataScale
 * @extends A.DataEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.ScaleDataEditor = A.Base.create('scale-data-editor', A.DataEditor, [], {
    TPL_EDITOR: '<div class="' + CSS_SCALE_DATA_EDITOR + '"><label></label>' +
        '<input type="text" class="' + CSS_SCALE_DATA_EDITOR_LOWER_VALUE + '"></input> - ' +
        '<input type="text" class="' + CSS_SCALE_DATA_EDITOR_HIGHER_VALUE + '"></input></div>',

    /**
     * Constructor for the `A.ScaleDataEditor`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after('labelChange', this._afterLabelChange);

        this._uiSetLabel(this.get('label'));
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
     * Gets the edited value of the data from the editor.
     *
     * @method _getEditedValue
     * @protected
     */
    _getEditedValue: function() {
        var node = this.get('node'),
            lower = node.one('.' + CSS_SCALE_DATA_EDITOR_LOWER_VALUE).get('value'),
            higher = node.one('.' + CSS_SCALE_DATA_EDITOR_HIGHER_VALUE).get('value');

        return [lower, higher];
    },

    /**
     * Updates the ui according to the value of the `originalValue` attribute.
     *
     * @method _uiSetOriginalValue
     * @param originalValue
     * @protected
     */
    _uiSetOriginalValue: function(originalValue) {
        var node = this.get('node');

        if (originalValue && originalValue.length > 0) {
            node.one('.' + CSS_SCALE_DATA_EDITOR_LOWER_VALUE).set('value', originalValue[0]);
            node.one('.' + CSS_SCALE_DATA_EDITOR_HIGHER_VALUE).set('value', originalValue[originalValue.length - 1]);
        }
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
     * for the `A.ScaleDataEditor`.
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
         * @type String
         */
        editedValue: {
            getter: '_getEditedValue'
        },

        /**
         * The label to be used by this text editor.
         *
         * @attribute label
         * @default ''
         * @type String
         */
        label: {
            value: ''
        },

        /**
         * The value to be edited.
         *
         * @attribute originalValue
         * @type String
         */
        originalValue: {
        }
    }
});
