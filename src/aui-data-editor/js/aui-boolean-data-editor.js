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
        this._setUncheckedContent();

        this.get('node').one('input').after('change', A.bind(this._afterClickCheckbox, this));
        this.after('editedValueChange', this._afterEditedValueChange);
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
    _afterEditedValueChange: function(event) {
        if (event.newVal) {
            this._setCheckedContent();
        }
        else {
            this._setUncheckedContent();
        }
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
     * Updates the ui according to the value of the `originalValue` attribute.
     *
     * @method _uiSetOriginalValue
     * @param originalValue
     * @protected
     */
    _uiSetOriginalValue: function(originalValue) {
        this.get('node').one('input').set('checked', originalValue);
        this.set('editedValue', originalValue);
    },

    /**
     * Updates the ui according to the value of the `visible` attribute.
     *
     * @method _uiSetVisible
     * @param visible
     * @protected
     */
    _setVisible: function(visible) {
        if (visible) {
            this.get('node').show();
        }
        else {
            this.get('node').hide();
        }
        return visible;
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
        },

        /**
         * 
         *
         * @attribute visible
         * @default false
         * @type Boolean
         */
        visible: {
            lazyAdd: false,
            setter: '_setVisible',
            value: true
        }
    }
});
