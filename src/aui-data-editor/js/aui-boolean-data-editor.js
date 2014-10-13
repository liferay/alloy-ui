/**
 * The Boolean Data Editor Component
 *
 * @module aui-boolean-data-editor
 */

var CSS_BOOLEAN_DATA_EDITOR = A.getClassName('boolean', 'data', 'editor');

/**
 * A base class for Boolean Data Editor.
 *
 * @class A.BooleanDataEditor
 * @extends A.DataEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.BooleanDataEditor = A.Base.create('boolean-data-editor', A.DataEditor, [], {
    TPL_EDITOR: '<div class="' + CSS_BOOLEAN_DATA_EDITOR + '">' +
        '<div class="form-group"><label></label>' +
        '<input type="checkbox"></input></div></div>',

    /**
     * Constructor for the `A.BooleanDataEditor`. Lifecycle.
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
        return this.get('node').one('input').get('checked');
    },

    /**
     * Updates the ui according to the value of the `originalValue` attribute.
     *
     * @method _uiSetOriginalValue
     * @param originalValue
     * @protected
     */
    _uiSetOriginalValue: function(originalValue) {
        this.get('node').one('input').set('checked', originalValue);
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
     * for the `A.BooleanDataEditor`.
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
         * @default false
         * @type Boolean
         */
        editedValue: {
            getter: '_getEditedValue',
            value: false
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
         * The value to be edited.
         *
         * @attribute originalValue
         * @default false
         * @type Boolean
         */
        originalValue: {
            value: false
        }
    }
});
