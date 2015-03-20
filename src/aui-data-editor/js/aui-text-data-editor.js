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
     * Constructor for the `A.TextDataEditor`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var node = this.get('node');

        this.input_ = node.one('.form-control');
        this.input_.after('valuechange', A.bind(this._onValueChange, this));

        this.after('editedValueChange', this._afterEditedValueChange);
        this._uiSetEditedValue(this.get('editedValue'));
    },

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
     * Fired after the `editedValue` attribute is set.
     *
     * @method _afterEditedValueChange
     * @protected
     */
    _afterEditedValueChange: function() {
        this._uiSetEditedValue(this.get('editedValue'));
    },

    /**
     * Fired when the input's value changes.
     *
     * @method _onValueChange
     * @protected
     */
    _onValueChange: function() {
        this.set('editedValue', this.input_.get('value'));
    },

    /**
     * Updates the ui according to the value of the `editedValue` attribute.
     *
     * @method _uiSetEditedValue
     * @param {String} editedValue
     * @protected
     */
    _uiSetEditedValue: function(editedValue) {
        this.input_.set('value', editedValue);
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
