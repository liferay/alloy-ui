/**
 * The Text Data Editor Component
 *
 * @module aui-text-data-editor
 */

var CSS_TEXT_DATA_EDITOR = A.getClassName('text', 'data', 'editor');

/**
 * A base class for Text Data Editor.
 *
 * @class A.TextDataEditor
 * @extends A.DataEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.TextDataEditor = A.Base.create('text-data-editor', A.DataEditor, [], {
    TPL_EDITOR: '<div class="' + CSS_TEXT_DATA_EDITOR + '">' +
        '<div class="form-group"><label></label>' +
        '<input type="text" class="form-control"></input></div></div>',

    /**
     * Constructor for the `A.TextDataEditor`. Lifecycle.
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
        return this.get('node').one('.form-control').get('value');
    },

    /**
     * Updates the ui according to the value of the `originalValue` attribute.
     *
     * @method _uiSetOriginalValue
     * @param originalValue
     * @protected
     */
    _uiSetOriginalValue: function(originalValue) {
        this.get('node').one('.form-control').set('value', originalValue);
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
     * for the `A.TextDataEditor`.
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
         * @default ''
         * @type String
         */
        editedValue: {
            getter: '_getEditedValue',
            value: ''
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
         * @default ''
         * @type String
         */
        originalValue: {
            value: ''
        }
    }
});
