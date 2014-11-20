/**
 * The Form Field Choice Component
 *
 * @module aui-form-field-choice
 */

var CSS_FIELD_CHOICE = A.getClassName('form', 'field', 'choice'),
    CSS_FIELD_CHOICE_MULTIPLE = A.getClassName('form', 'field', 'choice', 'multiple'),
    CSS_FIELD_CHOICE_OPTION = A.getClassName('form', 'field', 'choice', 'option'),
    CSS_FIELD_CHOICE_OPTION_BUTTON = A.getClassName('form', 'field', 'choice', 'option', 'button'),
    CSS_FIELD_CHOICE_OPTION_OTHER = A.getClassName('form', 'field', 'choice', 'option', 'other'),
    CSS_FIELD_CHOICE_OPTIONS = A.getClassName('form', 'field', 'choice', 'options'),

    TPL_FIELD_CHOICE_OPTION = '<div class="' + CSS_FIELD_CHOICE_OPTION + ' cleafix">' +
        '<div class="' + CSS_FIELD_CHOICE_OPTION_BUTTON + '"></div>' +
        '<label>{label}</label></div>';

/**
 * A base class for Form Field Choice.
 *
 * @class A.FormFieldChoice
 * @extends A.FormField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormFieldChoice = A.Base.create('form-field-choice', A.FormField, [], {
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_CHOICE_OPTIONS + ' form-group"></div>',

    /**
     * Constructor for the `A.FormFieldChoice`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        content.addClass(CSS_FIELD_CHOICE);

        this._uiSetMultiple(this.get('multiple'));
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
     * Updates the ui according to the value of the `multiple` attribute.
     *
     * @method _uiSetMultiple
     * @param {Boolean} multiple
     * @protected
     */
    _uiSetMultiple: function(multiple) {
        this.get('content').toggleClass(CSS_FIELD_CHOICE_MULTIPLE, multiple);
    },

    /**
     * Updates the ui according to the value of the `options` attribute.
     *
     * @method _uiSetOptions
     * @param {Array} options
     * @protected
     */
    _uiSetOptions: function(options) {
        var optionsContainer = this.get('content').one('.' + CSS_FIELD_CHOICE_OPTIONS),
            otherOptionNode = this.get('content').one('.' + CSS_FIELD_CHOICE_OPTION_OTHER),
            optionNode;

        optionsContainer.empty();
        A.Array.each(options, function(option) {
            optionNode = A.Node.create(A.Lang.sub(TPL_FIELD_CHOICE_OPTION, {
                label: option
            }));
            optionsContainer.append(optionNode);
        });

        optionsContainer.append(otherOptionNode);
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
                label: 'Other'
            }));
            optionNode.addClass(CSS_FIELD_CHOICE_OPTION_OTHER);
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
     * for the `A.FormFieldChoice`.
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
