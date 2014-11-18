/**
 * The Boolean Data Editor Component
 *
 * @module aui-boolean-data-editor
 */

var CSS_BOOLEAN_DATA_EDITOR = A.getClassName('boolean', 'data', 'editor'),
    CSS_BOOLEAN_DATA_EDITOR_CONTENT = A.getClassName('boolean', 'data', 'editor', 'content');

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
    TPL_EDITOR_CONTENT: '<div class="' + CSS_BOOLEAN_DATA_EDITOR + '">' +
        '<div class="form-group"><div class="' + CSS_BOOLEAN_DATA_EDITOR_CONTENT + '"></div>' +
        '<input type="checkbox"></input></div></div>',

    /**
     * Constructor for the `A.BooleanDataEditor`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._uiSetEditedValue(this.get('editedValue'));

        this.get('node').one('input').after('change', A.bind(this._afterClickCheckbox, this));

        this.after('editedValueChange', this._afterEditedValueChange);
    },

    /**
     * Always return false.
     *
     * @method isEmpty
     * @return {Boolean}
     * @protected
     */
    isEmpty: function() {
        return false;
    },

    /**
     * Updates the editor's UI to display the given value.
     *
     * @method updateUiWithValue
     * @param {Boolean} value
     */
    updateUiWithValue: function(value) {
        this.get('node').one('input').set('checked', value);
        this.set('editedValue', value);
    },

    /**
     * Fired after the checkbox is clicked.
     *
     * @method _afterClickCheckbox
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _afterClickCheckbox: function(event) {
        this.set('editedValue', event.currentTarget.get('checked'));
    },

    /**
     * Fired after the `editedValue` attribute is set.
     *
     * @method _afterEditedValueChange
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _afterEditedValueChange: function() {
        this._uiSetEditedValue(this.get('editedValue'));
    },

    /**
     * Sets content attributes like `checkedContent` and `uncheckedContent`.
     *
     * @method _setContent
     * @param {String | Node} val
     * @return {Node}
     * @protected
     */
    _setContent: function(val) {
        if (A.Lang.isString(val)) {
            val = A.Node.create(val);
        }

        return val;
    },

    /**
     * Updates the ui according to the value of the `checkedContent` attribute.
     *
     * @method _setCheckedContent
     * @protected
     */
    _setCheckedContent: function() {
        this.get('node').one('.' + CSS_BOOLEAN_DATA_EDITOR_CONTENT).setHTML(this.get('checkedContent'));
    },

    /**
     * Updates the ui according to the value of the `uncheckedContent` attribute.
     *
     * @method _setUncheckedContent
     * @protected
     */
    _setUncheckedContent: function() {
        this.get('node').one('.' + CSS_BOOLEAN_DATA_EDITOR_CONTENT).setHTML(this.get('uncheckedContent'));
    },

    /**
     * Updates the ui according to the value of the `editedValue` attribute.
     *
     * @method _uiSetEditedValue
     * @param editedValue
     * @protected
     */
    _uiSetEditedValue: function(editedValue) {
        if (editedValue) {
            this._setCheckedContent();
        }
        else {
            this._setUncheckedContent();
        }
    },

    /**
     * Validates content attributes like `checkedContent` and `uncheckedContent`.
     *
     * @method _validateContent
     * @param {*} val
     * @return {Boolean}
     * @protected
     */
    _validateContent: function(val) {
        return A.Lang.isString(val) || A.instanceOf(val, A.Node);
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
         * Optional content that should show up when the data editor is in the
         * checked state.
         *
         * @attribute checkedContent
         * @default null
         * @type String | Node
         */
        checkedContent: {
            setter: '_setContent',
            validator: '_validateContent',
            value: ''
        },

        /**
         * The value after edition.
         *
         * @attribute editedValue
         * @default false
         * @type Boolean
         */
        editedValue: {
            value: false
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
        },

        /**
         * Optional content that should show up when the data editor is in the
         * unchecked state.
         *
         * @attribute uncheckedContent
         * @default null
         * @type String | Node
         */
        uncheckedContent: {
            setter: '_setContent',
            validator: '_validateContent',
            value: ''
        }
    }
});
