/**
 * The Form Builder Field Text Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-text
 */

var CSS_FIELD_TEXT = A.getClassName('form', 'builder', 'field', 'text'),
    CSS_FIELD_TEXT_INPUT = A.getClassName('form', 'builder', 'field', 'text', 'input'),
    TPL_SINGLE_LINE = '<input type="text" class="form-control"></input>',
    TPL_MULTILINE = '<textarea class="form-control" rows="3"></textarea>';

/**
 * A base class for Form Builder Field Text.
 *
 * @class A.FormBuilderFieldText
 * @extends A.FormBuilderFieldSentence
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldText = A.Base.create('form-builder-field-text', A.FormBuilderFieldSentence, [], {
    TPL_FIELD_CONTENT: '<div><div class="' + CSS_FIELD_TEXT_INPUT + '"></div></div>',

    /**
     * Constructor for the `A.FormBuilderFieldText`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        content.addClass(CSS_FIELD_TEXT);

        this._uiSetMultiline(this.get('multiline'));

        this.after({
            multilineChange: this._afterMultilineChange
        });
    },

    /**
     * Fired after the `multiline` attribute is set.
     *
     * @method _afterMultilineChange
     * @protected
     */
    _afterMultilineChange: function() {
        this._uiSetMultiline(this.get('multiline'));
    },

    /**
     * Fills the settings array with the information for this field.
     *
     * @method _fillSettings
     * @override
     * @protected
     */
    _fillSettings: function() {
        var instance = this;

        A.FormBuilderFieldText.superclass._fillSettings.apply(instance, arguments);

        instance._settings.push({
            attrName: 'multiline',
            editor: new A.BooleanDataEditor({
                label: 'Multiline'
            })
        });

        instance._settings.push({
            attrName: 'required',
            editor: new A.BooleanDataEditor({
                label: 'Required'
            })
        });
    },

    /**
     * Updates the ui according to the value of the `multiline` attribute.
     *
     * @method _uiSetMultiline
     * @param {String} multiline
     * @protected
     */
    _uiSetMultiline: function(multiline) {
        var inputNode = this.get('content').one('.' + CSS_FIELD_TEXT_INPUT);

        inputNode.empty();

        if (multiline) {
            inputNode.append(TPL_MULTILINE);
        }
        else {
            inputNode.append(TPL_SINGLE_LINE);
        }
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormBuilderFieldText`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Flag indicating if the text input will allow multiple lines.
         *
         * @attribute multiline
         * @default false
         * @type {Boolean}
         */
        multiline: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * Flag indicating if this field is required.
         *
         * @attribute required
         * @default false
         * @type {Boolean}
         */
        required: {
            validator: A.Lang.isBoolean,
            value: false
        }
    }
});
