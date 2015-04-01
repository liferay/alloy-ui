/**
 * The Form Field Choice Component
 *
 * @module aui-form-field-choice
 */

var CSS_FIELD_CHOICE = A.getClassName('form', 'field', 'choice'),
    CSS_FIELD_CHOICE_CONTENT = A.getClassName('form', 'field', 'choice', 'content'),
    CSS_FIELD_CHOICE_CHECKBOX = A.getClassName('form', 'field', 'choice', 'checkbox'),
    CSS_FIELD_CHOICE_FORM = A.getClassName('form', 'field', 'choice', 'form'),
    CSS_FIELD_CHOICE_LIST = A.getClassName('form', 'field', 'choice', 'list'),
    CSS_FIELD_CHOICE_OPTION = A.getClassName('form', 'field', 'choice', 'option'),
    CSS_FIELD_CHOICE_OPTIONS_CONTAINER =
        A.getClassName('form', 'field', 'choice', 'options', 'container'),
    CSS_FIELD_CHOICE_OPTION_OTHER =
        A.getClassName('form', 'field', 'choice', 'option', 'other'),
    CSS_FIELD_CHOICE_RADIO = A.getClassName('form', 'field', 'choice', 'radio'),

    TPL_FIELD_CHOICE_FORM =
        '<form class="' + CSS_FIELD_CHOICE_FORM + ' ' +
        CSS_FIELD_CHOICE_OPTIONS_CONTAINER + '"></form>',
    TPL_FIELD_CHOICE_FORM_OPTION =
        '<div class="' + CSS_FIELD_CHOICE_OPTION + '">' +
        '<input type="{type}" name="option"></input><label>{label}</label></div>',
    TPL_FIELD_CHOICE_LIST =
        '<select class="' + CSS_FIELD_CHOICE_LIST + ' ' +
        CSS_FIELD_CHOICE_OPTIONS_CONTAINER + '"></select>',
    TPL_FIELD_CHOICE_LIST_OPTION =
        '<option action="" class="' + CSS_FIELD_CHOICE_OPTION +
        '"><label>{label}</label></option>',

    TYPES = {
        CHECKBOX: 'checkbox',
        LIST: 'list',
        RADIO: 'radio'
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
A.FormFieldChoice = A.Base.create('form-field-choice', A.FormField, [A.FormFieldRequired], {
    TPL_FIELD_CONTENT: '<div class ="' + CSS_FIELD_CHOICE_CONTENT + '"></div>',

    /**
     * Constructor for the `A.FormFieldChoice`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._oldTypeValue = this.get('type');

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

        this._updateOptionsContainer();
        this._uiSetOptions(this.get('options'));
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
     * @protected
     */
    _afterTypeChange: function() {
        this._uiSetType(this.get('type'));
    },

    /**
     * Remove all option element from ui.
     *
     * @method _cleanOptionsContainer
     * @protected
     */
    _cleanOptionsContainer: function() {
        this.get('content').one('.' + CSS_FIELD_CHOICE_OPTIONS_CONTAINER).empty();
    },

    /**
     * Create a option node.
     *
     * @method _createOptionNode
     * @param {String} optionLabel
     * @return {Node} A new Option Node
     * @protected
     */
    _createOptionNode: function(optionLabel) {
        var currentType = this.get('type');

        if (currentType === TYPES.LIST) {
            return A.Node.create(A.Lang.sub(TPL_FIELD_CHOICE_LIST_OPTION, {
                label: optionLabel
            }));
        }
        else {
            return A.Node.create(A.Lang.sub(TPL_FIELD_CHOICE_FORM_OPTION, {
                label: optionLabel,
                type: currentType
            }));
        }
    },
    /**
     * Gets the appropriate css class to form for the given type.
     *
     * @method _getFormClass
     * @param {String} type
     * @return {String}
     */
    _getFormClass: function(type) {
        switch (type) {
            case TYPES.CHECKBOX:
                return CSS_FIELD_CHOICE_CHECKBOX;
            case TYPES.RADIO:
                return CSS_FIELD_CHOICE_RADIO;
        }
    },

    /**
     * Switch option type between radio and checkbox.
     *
     * @method _setFormType
     * @param {String} type
     * @protected
     */
    _setFormType: function(type) {
        var content = this.get('content'),
            optionsContainer = content.one('.' +CSS_FIELD_CHOICE_OPTIONS_CONTAINER),
            elements = content.all('.' + CSS_FIELD_CHOICE_OPTION);

        optionsContainer.replaceClass(this._getFormClass(this._oldTypeValue),
            this._getFormClass(type));

        elements.each(function(element) {
            element.set('type', type);
        });
    },

    /**
     * Updates the ui according to the value of the `options` attribute.
     *
     * @method _uiSetOptions
     * @param {Array} options
     * @protected
     */
    _uiSetOptions: function(options) {
        var instance = this,
            optionsContainer,
            optionTemplate;

        this._cleanOptionsContainer();
        optionsContainer = this.get('content').one('.' + CSS_FIELD_CHOICE_OPTIONS_CONTAINER);

        A.Array.each(options, function(option) {
            optionTemplate = instance._createOptionNode(option);
            optionsContainer.append(optionTemplate);
        });

        this._uiSetOtherOption(this.get('otherOption'));
    },

    /**
     * Updates the ui according to the value of the `otherOption` attribute.
     *
     * @method _uiSetOtherOption
     * @param {Boolean} otherOption
     * @protected
     */
    _uiSetOtherOption: function(otherOption) {
        var optionsContainer = this.get('content').one('.' + CSS_FIELD_CHOICE_OPTIONS_CONTAINER),
            otherOptionNode = this.get('content').one('.' + CSS_FIELD_CHOICE_OPTION_OTHER),
            optionTemplate;

        if (otherOptionNode) {
            otherOptionNode.remove();
        }

        if (otherOption) {
            optionTemplate = this._createOptionNode('Other');
            optionTemplate.addClass(CSS_FIELD_CHOICE_OPTION_OTHER);
            optionsContainer.append(optionTemplate);
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
        if (type === TYPES.LIST || this._oldTypeValue === TYPES.LIST) {
            this._updateOptionsContainer();
            this._uiSetOptions(this.get('options'));
            this._uiSetOtherOption(this.get('otherOption'));
        }
        else {
            this._setFormType(this.get('type'));
        }

        this._oldTypeValue = type;
    },

    /**
     * Set a new options container based on `type` attribute.
     *
     * @method _updateOptionsContainer
     * @protected
     */
    _updateOptionsContainer: function() {
        var content = this.get('content').one('.' + CSS_FIELD_CHOICE_CONTENT),
            optionsContainer;

        content.empty();

        if (this.get('type') === TYPES.LIST) {
            optionsContainer = A.Node.create(TPL_FIELD_CHOICE_LIST);
        }
        else {
            optionsContainer = A.Node.create(TPL_FIELD_CHOICE_FORM);
            optionsContainer.addClass(this._getFormClass(this.get('type')));
        }

        content.append(optionsContainer);
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
         * Id to reference form data after a form is submitted.
         *
         * @attribute name
         * @default ''
         * @type String
         */
        name: {
            validator: A.Lang.isString,
            value: ''
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
         * The type of the choice field. Can be any of the values listed in
         * the `A.FormFieldChoice.TYPES` constant (radio, checkbox or list).
         * @default radio
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
