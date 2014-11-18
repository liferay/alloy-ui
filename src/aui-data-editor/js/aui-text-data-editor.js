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
    TPL_EDITOR_CONTENT: '<div class="' + CSS_TEXT_DATA_EDITOR + '">' +
        '<input type="text" class="form-control"></input></div>',

    /**
     * Returns `true` if this edited value has no elements.
     *
     * @method isEmpty
     * @return {Boolean}
     */
    isEmpty: function() {
        return !A.Lang.trim(this.get('editedValue'));
    },

    /**
     * If the Text Data Editor has a String on text field this will return true.
     *
     * @method isValid
     * @return {Boolean}
     */
    isValid: function() {
        if (A.TextDataEditor.superclass.isValid.call(this)) {
            return A.Lang.isString(this.get('editedValue'));
        }

        return false;
    },

    /**
     * Updates the editor's UI to display the given value.
     *
     * @method updateUiWithValue
     * @param originalValue
     */
    updateUiWithValue: function(originalValue) {
        this.get('node').one('.form-control').set('value', originalValue);
    },

    /**
     * Gets the edited value of the data from the editor.
     *
     * @method _getEditedValue
     * @protected
     */
    _getEditedValue: function() {
        return this.get('node').one('.form-control').get('value');
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
