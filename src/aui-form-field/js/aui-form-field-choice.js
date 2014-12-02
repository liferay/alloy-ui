/**
 * The Form Field Choice Component
 *
 * @module aui-form-field-choice
 */

var CSS_FIELD_CHOICE = A.getClassName('form', 'field', 'choice'),
    CSS_FIELD_CHOICE_CHECKBOX = A.getClassName('form', 'field', 'choice', 'checkbox'),
    CSS_FIELD_CHOICE_DROPDOWN = A.getClassName('form', 'field', 'choice', 'dropdown'),
    CSS_FIELD_CHOICE_DROPDOWN_CONTENT = A.getClassName('form', 'field', 'choice', 'dropdown', 'content'),
    CSS_FIELD_CHOICE_DROPDOWN_PLACEHOLDER = A.getClassName('form', 'field', 'choice', 'dropdown', 'placeholder'),
    CSS_FIELD_CHOICE_DROPDOWN_TOGGLE = A.getClassName('form', 'field', 'choice', 'dropdown', 'toggle'),
    CSS_FIELD_CHOICE_OPTION = A.getClassName('form', 'field', 'choice', 'option'),
    CSS_FIELD_CHOICE_OPTION_BUTTON = A.getClassName('form', 'field', 'choice', 'option', 'button'),
    CSS_FIELD_CHOICE_OPTION_OTHER = A.getClassName('form', 'field', 'choice', 'option', 'other'),
    CSS_FIELD_CHOICE_OPTIONS = A.getClassName('form', 'field', 'choice', 'options'),
    CSS_FIELD_CHOICE_RADIO = A.getClassName('form', 'field', 'choice', 'radio'),

    TPL_FIELD_CHOICE_OPTION = '<div class="' + CSS_FIELD_CHOICE_OPTION + ' cleafix">' +
        '<div class="' + CSS_FIELD_CHOICE_OPTION_BUTTON + '"></div>' +
        '<label>{label}</label></div>',

    TYPES = {
        RADIO: 'radio',
        CHECKBOX: 'checkbox',
        DROPDOWN: 'dropdown'
    };

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
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_CHOICE_OPTIONS + ' form-group"></div>' +
        '<div class="' + CSS_FIELD_CHOICE_DROPDOWN_CONTENT + '">' +
        '<div class="' + CSS_FIELD_CHOICE_DROPDOWN_TOGGLE + '">' +
        '<span class="glyphicon glyphicon-chevron-down"></span></div>' +
        '<div class="' + CSS_FIELD_CHOICE_DROPDOWN_PLACEHOLDER + '">Select an option</div></div>',

    /**
     * Constructor for the `A.FormFieldChoice`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after({
            optionsChange: this._afterOptionsChange,
            otherOptionChange: this._afterOtherOptionChange,
            typeChange: this._afterTypeChange
        });
    },

    /**
     * Create the DOM structure for the `A.FormFieldChoice`. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        var content = this.get('content');

        A.FormFieldChoice.superclass.renderUI.call(this);

        content.addClass(CSS_FIELD_CHOICE);

        this._uiSetOptions(this.get('options'));
        this._uiSetOtherOption(this.get('otherOption'));
        this._uiSetType(this.get('type'));
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
     * Fired after the `type` attribute is set.
     *
     * @method _afterTypeChange
     * @param {EventFacade} event
     * @protected
     */
    _afterTypeChange: function(event) {
        this.get('content').removeClass(this._getClassForType(event.prevVal));
        this._uiSetType(this.get('type'));
    },

    /**
     * Gets the appropriate css class for the given type.
     *
     * @method _getClassForType
     * @param {String} type
     * @return {String}
     * @protected
     */
    _getClassForType: function(type) {
        switch (type) {
            case TYPES.CHECKBOX:
                return CSS_FIELD_CHOICE_CHECKBOX;
            case TYPES.RADIO:
                return CSS_FIELD_CHOICE_RADIO;
            case TYPES.DROPDOWN:
                return CSS_FIELD_CHOICE_DROPDOWN;
        }
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
    },

    /**
     * Updates the ui according to the value of the `type` attribute.
     *
     * @method _uiSetType
     * @param {String} type
     * @protected
     */
    _uiSetType: function(type) {
        this.get('content').addClass(this._getClassForType(type));
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
        },

        /**
         * The type of the choice field. Can be any of the values listed in
         * the `A.FormFieldChoice.TYPES` constant (radio, checkbox or dropdown);
         * @type {Object}
         */
        type: {
            validator: A.Lang.isString,
            value: TYPES.RADIO
        }
    },

    /**
     * Static property which contains all the valid `A.FormFieldChoice` types.
     *
     * @property TYPES
     * @type Object
     * @static
     */
    TYPES: TYPES
});
