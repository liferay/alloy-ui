YUI.add('aui-boolean-data-editor', function (A, NAME) {

/**
 * The Boolean Data Editor Component
 *
 * @module aui-boolean-data-editor
 */

var CSS_BOOLEAN_DATA_EDITOR = A.getClassName('boolean', 'data', 'editor'),
    CSS_BOOLEAN_DATA_EDITOR_CONTENT = A.getClassName('boolean', 'data', 'editor', 'content'),
    CSS_BOOLEAN_DATA_EDITOR_SWITCH_BUTTON = A.getClassName('boolean', 'data', 'editor', 'switch', 'button');

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
        '<div><div class="' + CSS_BOOLEAN_DATA_EDITOR_CONTENT + '"></div>' +
        '<div class="' + CSS_BOOLEAN_DATA_EDITOR_SWITCH_BUTTON + '"></div></div></div>',

    /**
     * Constructor for the `A.BooleanDataEditor`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._createSwitchButton();

        this._uiSetEditedValue(this.get('editedValue'));

        this._buttonSwitch.on('activatedChange', A.bind(this._afterButtonSwitchActivatedChange, this));

        this.after({
            checkedContentChange: this._afterCheckedContentChange,
            editedValueChange: this._afterEditedValueChange,
            innerLabelLeftChange: this._afterInnerLabelLeftChange,
            innerLabelRightChange: this._afterInnerLabelRightChange,
            uncheckedContentChange: this._afterUncheckedContentChange
        });
    },

    /**
     * Fired after the checkbox is clicked.
     *
     * @method _afterButtonSwitchActivatedChange
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _afterButtonSwitchActivatedChange: function(event) {
        this.set('editedValue', event.newVal);
    },

    /**
     * Fired after the `checkedContent` attribute is set.
     *
     * @method _afterCheckedContentChange
     * @protected
     */
    _afterCheckedContentChange: function() {
        if (this.get('editedValue')) {
            this._updateContent(this.get('checkedContent'));
        }
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
     * Fired after the `innerLabelLeft` attribute is set.
     *
     * @method _afterInnerLabelLeftChange
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _afterInnerLabelLeftChange: function(event) {
        this._buttonSwitch.set('innerLabelLeft', event.newVal);
    },

    /**
     * Fired after the `innerLabelRight` attribute is set.
     *
     * @method _afterInnerLabelRightChange
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _afterInnerLabelRightChange: function(event) {
        this._buttonSwitch.set('innerLabelRight', event.newVal);
    },

    /**
     * Fired after the `uncheckedContent` attribute is set.
     *
     * @method _afterUncheckedContentChange
     * @protected
     */
    _afterUncheckedContentChange: function() {
        if (!this.get('editedValue')) {
            this._updateContent(this.get('uncheckedContent'));
        }
    },

    /**
     * Returns the switch button instance.
     *
     * @method _createSwitchButton
     * @return {Object}
     * @protected
     */
    _createSwitchButton: function () {
        this._buttonSwitch = new A.ButtonSwitch({
            innerLabelLeft: this.get('innerLabelLeft'),
            innerLabelRight: this.get('innerLabelRight')
        }).render(this.get('node').one('.' + CSS_BOOLEAN_DATA_EDITOR_SWITCH_BUTTON));
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
     * Updates the ui according to the value of the `editedValue` attribute.
     *
     * @method _uiSetEditedValue
     * @param editedValue
     * @protected
     */
    _uiSetEditedValue: function(editedValue) {
        this._buttonSwitch.set('activated', editedValue);

        if (editedValue) {
            this._updateContent(this.get('checkedContent'));
        }
        else {
            this._updateContent(this.get('uncheckedContent'));
        }
    },

    /**
     * Updates the boolean data editor with the given content.
     *
     * @method _updateContent
     * @protected
     */
    _updateContent: function(content) {
        this.get('node').one('.' + CSS_BOOLEAN_DATA_EDITOR_CONTENT).setHTML(content);
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
         * The label to be used on button left side.
         *
         * @attribute innerLabelLeft
         * @type String
         */
        innerLabelLeft: {
            validator: A.Lang.isString,
            value: ''
        },

        /**
         * The label to be used on button right side.
         *
         * @attribute innerLabelRight
         * @type String
         */
        innerLabelRight: {
            validator: A.Lang.isString,
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


}, '3.0.1', {"requires": ["aui-button-switch", "aui-data-editor"]});
