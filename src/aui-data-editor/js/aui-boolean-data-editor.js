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
    TPL_EDITOR_CONTENT: '<div class="' + CSS_BOOLEAN_DATA_EDITOR + '">' +
        '<div class="form-group"><div class="content"></div>' +
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
     * Updates the ui according to the value of the parameter.
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
     * Updates the ui according to the value of the `checkedContent` attribute.
     *
     * @method _setCheckedContent
     * @protected
     */
    _setCheckedContent: function() {
        this.get('node').one('.content').setHTML(this.get('checkedContent'));
    },

    /**
     * Updates the ui according to the value of the `uncheckedContent` attribute.
     *
     * @method _setUncheckedContent
     * @protected
     */
    _setUncheckedContent: function() {
        this.get('node').one('.content').setHTML(this.get('uncheckedContent'));
    },

    /**
     * Updates the ui according to the value of the `label` attribute.
     *
     * @method _uiSetLabel
     * @param {String} label
     * @protected
     */
    _uiSetLabel: function(label) {
        if (!this.get('checkedContent')) {
            A.BooleanDataEditor.superclass._uiSetLabel.call(this, label);
        }
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
         * @attribute checkedContent
         * @default null
         * @type Node
         */
        checkedContent: {
            value: null
        },

        /**
         * The value after edition.
         *
         * @attribute uncheckedContent
         * @default null
         * @type Node
         */
        uncheckedContent: {
            value: null
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
        }
    }
});
