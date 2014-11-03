/**
 * The Form Builder Field Choice Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-choice
 */

var CSS_FIELD_CHOICE = A.getClassName('form', 'builder', 'field', 'choice'),
    CSS_FIELD_CHOICE_OPTION = A.getClassName('form', 'builder', 'field', 'choice', 'option'),
    CSS_FIELD_CHOICE_OPTION_OTHER = A.getClassName('form', 'builder', 'field', 'choice', 'option', 'other'),
    CSS_FIELD_CHOICE_OPTIONS = A.getClassName('form', 'builder', 'field', 'choice', 'options'),

    TPL_FIELD_CHOICE_OPTION = '<div><input class="' + CSS_FIELD_CHOICE_OPTION +
        '" type="{type}"></input><label>{label}</label></div>';

/**
 * A base class for Form Builder Field Choice.
 *
 * @class A.FormBuilderFieldChoice
 * @extends A.FormBuilderFieldSentence
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldChoice = A.Base.create('form-builder-field-choice', A.FormBuilderFieldSentence, [], {
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_CHOICE_OPTIONS + ' form-group"></div>',

    /**
     * Constructor for the `A.FormBuilderFieldChoice`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        content.addClass(CSS_FIELD_CHOICE);

        this._uiSetOptions(this.get('options'));
        this._uiSetOtherOption(this.get('otherOption'));

        this.after({
            multipleChange: this._afterMultipleChange,
            optionsChange: this._afterOptionsChange,
            otherOptionChange: this._afterOtherOptionChange
        });
    },

    /**
     * Fired after the `multiple` attribute is set.
     *
     * @method _afterMultipleChange
     * @protected
     */
    _afterMultipleChange: function() {
        this._uiSetMultiple(this.get('multiple'));
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
        A.FormBuilderFieldChoice.superclass._fillSettings.apply(this, arguments);

        this._settings.push(
            {
                attrName: 'required',
                editor: new A.BooleanDataEditor({
                    label: 'Required'
                })
            },
            {
                attrName: 'options',
                editor: new A.OptionsDataEditor({
                    required: true
                })
            },
            {
                attrName: 'otherOption',
                editor: new A.BooleanDataEditor({
                    label: 'Add "Other" option'
                })
            },
            {
                attrName: 'multiple',
                editor: new A.BooleanDataEditor({
                    label: 'Activate multiple choice'
                })
            }
        );
    },

    /**
     * Gets the input type to be used by this field, according to if it should
     * allow multiple choice or not.
     *
     * @method _getInputType
     * @param {Boolean} multiple
     * @protected
     */
    _getInputType: function(multiple) {
        return multiple ? 'checkbox' : 'radio';
    },

    /**
     * Updates the ui according to the value of the `multiple` attribute.
     *
     * @method _uiSetMultiple
     * @param {Boolean} multiple
     * @protected
     */
    _uiSetMultiple: function(multiple) {
        var optionNodes = this.get('content').all('.' + CSS_FIELD_CHOICE_OPTION);

        optionNodes.set('type', this._getInputType(multiple));
    },

    /**
     * Updates the ui according to the value of the `options` attribute.
     *
     * @method _uiSetOptions
     * @param {Array} options
     * @protected
     */
    _uiSetOptions: function(options) {
        var optionsContainer = this.get('content').all('.' + CSS_FIELD_CHOICE_OPTIONS),
            optionNode,
            type = this._getInputType(this.get('multiple'));

        optionsContainer.empty();
        A.Array.each(options, function(option) {
            optionNode = A.Node.create(A.Lang.sub(TPL_FIELD_CHOICE_OPTION, {
                label: option,
                type: type
            }));
            optionsContainer.append(optionNode);
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
        var optionsContainer = this.get('content').all('.' + CSS_FIELD_CHOICE_OPTIONS),
            optionNode;

        if (otherOption) {
            optionNode = A.Node.create(A.Lang.sub(TPL_FIELD_CHOICE_OPTION, {
                label: 'Other',
                type: this._getInputType(this.get('multiple'))
            }));
            optionNode.addClass(CSS_FIELD_CHOICE_OPTION_OTHER);
            optionNode.append('<input type="text"></input>');
            optionsContainer.append(optionNode);
        }
        else {
            optionNode = this.get('content').one('.' + CSS_FIELD_CHOICE_OPTION_OTHER);
            if (optionNode) {
                optionNode.remove(true);
            }
        }
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.FormBuilderFieldChoice`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * If the user can choose multiple options, or just one.
         *
         * @attribute multiple
         * @default false
         * @type Boolean
         */
        multiple: {
            validator: A.Lang.isBoolean,
            value: false
        },

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
