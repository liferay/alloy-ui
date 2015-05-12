/**
 * The Text Data Editor Component
 *
 * @module aui-text-data-editor
 */

var CSS_TEXT_DATA_EDITOR = A.getClassName('text', 'data', 'editor'),
    CSS_TEXT_DATA_EDITOR_INPUT = A.getClassName('text', 'data', 'editor', 'input');

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
        '<input type="text" class="' + CSS_TEXT_DATA_EDITOR_INPUT + ' form-control"></input></div>',

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

        this.after({
            editedValueChange: this._afterEditedValueChange,
            placeholderChange: this._afterPlaceholderChange
        });
        this._uiSetEditedValue(this.get('editedValue'));
        this._uiSetPlaceholder(this.get('placeholder'));
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
     * Fired after the `placeholder` attribute is set.
     *
     * @method _afterPlaceholderChange
     * @protected
     */
    _afterPlaceholderChange: function() {
        this._uiSetPlaceholder(this.get('placeholder'));
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
    },

    /**
     * Updates the ui according to the value of the `placeholder` attribute.
     *
     * @method _uiSetPlaceholder
     * @param {String} placeholder
     * @protected
     */
    _uiSetPlaceholder: function(placeholder) {
        var inputNode = this.get('node').one('.' + CSS_TEXT_DATA_EDITOR_INPUT);

        inputNode.setAttribute('placeholder', placeholder);
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
        },

        /**
         * The placeholder text to be used on the Text Data Editor input.
         *
         * @attribute placeholder
         * @default ''
         * @type String
         */
        placeholder: {
            validator: A.Lang.isString,
            value: ''
        }
    }
});
