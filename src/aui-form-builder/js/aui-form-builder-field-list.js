/**
 * The Form Builder Field List Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-list
 */

var CSS_FIELD_LIST = A.getClassName('form', 'builder', 'field', 'list'),
    CSS_FIELD_LIST_OPTION = A.getClassName('form', 'builder', 'field', 'list', 'option'),
    CSS_FIELD_LIST_OPTION_OTHER = A.getClassName('form', 'builder', 'field', 'list', 'option', 'other'),
    CSS_FIELD_LIST_OPTIONS = A.getClassName('form', 'builder', 'field', 'list', 'options'),

    TPL_FIELD_LIST_OPTION = '<option class="' + CSS_FIELD_LIST_OPTION + '" value="{value}">{value}</option>';

/**
 * A base class for Form Builder Field List.
 *
 * @class A.FormBuilderFieldList
 * @extends A.FormBuilderFieldSentence
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldList = A.Base.create('form-builder-field-list', A.FormBuilderFieldSentence, [], {
    TPL_FIELD_CONTENT: '<div><select class="' + CSS_FIELD_LIST_OPTIONS + ' form-group"></select></div>',

    /**
     * Constructor for the `A.FormBuilderFieldList`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        content.addClass(CSS_FIELD_LIST);

        this._uiSetOptions(this.get('options'));
        this._uiSetOtherOption(this.get('otherOption'));

        this.after({
            optionsChange: this._afterOptionsChange,
            otherOptionChange: this._afterOtherOptionChange
        });
    },

    /**
     * Fired after the `options` attribute is set.
     *
     * @method _afterOptionsChange
     * @protected
     */
    _afterOptionsChange: function() {
        this._uiSetOptions(this.get('options'));
    },

    /**
     * Fired after the `otherOption` attribute is set.
     *
     * @method _afterOtherOptionChange
     * @protected
     */
    _afterOtherOptionChange: function() {
        this._uiSetOtherOption(this.get('otherOption'));
    },

    /**
     * Fills the settings array with the information for this field.
     *
     * @method _fillSettings
     * @override
     * @protected
     */
    _fillSettings: function() {
        A.FormBuilderFieldList.superclass._fillSettings.apply(this, arguments);

        this._settings.push(
            {
                attrName: 'required',
                editor: new A.BooleanDataEditor({
                    label: 'Required'
                })
            },
            {
                attrName: 'options',
                editor: new A.OptionsDataEditor()
            },
            {
                attrName: 'otherOption',
                editor: new A.BooleanDataEditor({
                    label: 'Add "Other" option'
                })
            }
        );
    },

    /**
     * Updates the ui according to the value of the `options` attribute.
     *
     * @method _uiSetOptions
     * @param {Array} options
     * @protected
     */
    _uiSetOptions: function(options) {
        var optionsContainer = this.get('content').one('.' + CSS_FIELD_LIST_OPTIONS),
            optionNode;

        optionsContainer.empty();
        A.Array.each(options, function(option) {
            optionNode = A.Node.create(A.Lang.sub(TPL_FIELD_LIST_OPTION, {
                value: option
            }));
            optionsContainer.appendChild(optionNode);
        });
    },

    /**
     * Updates the ui according to the value of the `otherOption` attribute.
     *
     * @method _uiSetOtherOption
     * @param {Boolean} otherOption
     * @protected
     */
    _uiSetOtherOption: function(otherOption) {
        var optionsContainer = this.get('content').one('.' + CSS_FIELD_LIST_OPTIONS),
            optionNode;

        if (otherOption) {
            optionNode = A.Node.create(A.Lang.sub(TPL_FIELD_LIST_OPTION, {
                value: 'Other'
            }));

            optionNode.addClass(CSS_FIELD_LIST_OPTION_OTHER);
            optionsContainer.append(optionNode);
        }
        else {
            optionNode = this.get('content').one('.' + CSS_FIELD_LIST_OPTION_OTHER);
            if (optionNode) {
                optionNode.remove(true);
            }
        }
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormBuilderFieldList`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The options that can be chosen.
         *
         * @attribute options
         * @default []
         * @type String
         */
        options: {
            validator: A.Lang.isArray,
            value: []
        },

        /**
         * If there should be a special "Other" option.
         *
         * @attribute otherOption
         * @default false
         * @type Boolean
         */
        otherOption: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * Flag indicating if this field is required.
         *
         * @attribute required
         * @default false
         * @type Boolean
         */
        required: {
            validator: A.Lang.isBoolean,
            value: false
        }
    }
});
