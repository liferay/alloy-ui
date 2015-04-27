/**
 * The Radio Group Data Editor Component
 *
 * @module aui-radio-group-data-editor
 */

var CSS_EDITOR = A.getClassName('radio', 'group', 'data', 'editor'),
    CSS_EDITOR_RADIO_BUTTON = A.getClassName('radio', 'group', 'data', 'editor', 'button'),
    CSS_EDITOR_RADIO_CONTENT = A.getClassName('radio', 'group', 'data', 'editor', 'content'),
    CSS_EDITOR_RADIO_ELEMENT = A.getClassName('radio', 'group', 'data', 'editor', 'element'),
    CSS_EDITOR_RADIO_ELEMENTS_INLINE = A.getClassName('radio', 'group', 'data', 'editor', 'elements', 'inline'),
    CSS_EDITOR_RADIO_INLINE = A.getClassName('radio', 'group', 'data', 'editor', 'inline');

/**
 * A base class for Radio Group Data Editor.
 *
 * @class A.RadioGroupDataEditor
 * @extends A.DataEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.RadioGroupDataEditor = A.Base.create('radio-group-data-editor', A.DataEditor, [], {
    TPL_EDITOR_CONTENT: '<div class="' + CSS_EDITOR + '">' +
        '<div class="' + CSS_EDITOR_RADIO_CONTENT + '"></div>' +
        '</div>',
    TPL_EDITOR_RADIO: '<div class="' + CSS_EDITOR_RADIO_ELEMENT + ' radio">' +
        '<label><input class="' + CSS_EDITOR_RADIO_BUTTON + '" type="radio">{label}</label>' +
        '</div>',

    /**
     * Constructor for the `A.RadioGroupDataEditor`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._uiSetRadioLabels(this.get('radioLabels'));
        this._uiSetEditedValue(this.get('editedValue'));
        this._uiSetInline(this.get('inline'));

        this.after('editedValueChange', this._afterEditedValueChange);
        this.after('inlineChange', this._afterInlineChange);
        this.after('radioLabelsChange', this._afterRadioLabelsChange);
        this.get('node').delegate('click', A.bind(this._onClickRadioButton, this), '.' + CSS_EDITOR_RADIO_BUTTON);
    },

    /**
     * Fired after the `editedValue` attribute is set.
     *
     * @method _afterEditedValueChange
     * @protected
     */
    _afterEditedValueChange: function() {
        this._uiSetEditedValue(this.get('editedValue'));
    },

    /**
     * Fired after the `inline` attribute is set.
     *
     * @method _afterInlineChange
     * @protected
     */
    _afterInlineChange: function() {
        this._uiSetInline(this.get('inline'));
    },

    /**
     * Fired after the `radioLabels` attribute is set.
     *
     * @method _afterRadioLabelsChange
     * @protected
     */
    _afterRadioLabelsChange: function() {
        this._uiSetRadioLabels(this.get('radioLabels'));
    },

    /**
     * Creates a radio element node.
     *
     * @method _createRadioGroup
     * @param {String} label
     * @return {Node}
     * @protected
     */
    _createRadioGroup: function(label) {
        var radioElementNode = A.Node.create(A.Lang.sub(this.TPL_EDITOR_RADIO, {
            label: label
        }));

        return radioElementNode;
    },

    /**
     * Fired when a radio button is clicked.
     *
     * @method _onClickRadioButton
     * @param {EventFacade} event
     * @protected
     */
    _onClickRadioButton: function(event) {
        this.set('editedValue', this.get('node').one('.' +
            CSS_EDITOR_RADIO_CONTENT).all('input').indexOf(event.target));
    },

    /**
     * Updates the ui according to the value of the `editedValue` attribute.
     *
     * @method _uiSetEditedValue
     * @param {Number} editedValue
     * @protected
     */
    _uiSetEditedValue: function(editedValue) {
        var radioGroupContent = this.get('node').one('.' + CSS_EDITOR_RADIO_CONTENT).all('input');

        radioGroupContent.each(function(radio) {
            radio.set('checked', false);
        });

        radioGroupContent.item(editedValue).set('checked', true);
    },

    /**
     * Updates the ui according to the value of the `editedValue` attribute.
     *
     * @method _uiSetInline
     * @param {Boolean} inline
     * @protected
     */
    _uiSetInline: function(inline) {
        var node = this.get('node');

        if (inline) {
            node.one('.' + CSS_EDITOR_RADIO_CONTENT).addClass(CSS_EDITOR_RADIO_ELEMENTS_INLINE);

            node.all('.' + CSS_EDITOR_RADIO_ELEMENT).addClass(CSS_EDITOR_RADIO_INLINE);
        }
        else {
            node.one('.' + CSS_EDITOR_RADIO_CONTENT).removeClass(CSS_EDITOR_RADIO_ELEMENTS_INLINE);

            node.all('.' + CSS_EDITOR_RADIO_ELEMENT).removeClass(CSS_EDITOR_RADIO_INLINE);
        }
    },

    /**
     * Updates the ui according to the value of the `radioLabels` attribute.
     *
     * @method _uiSetRadioLabels
     * @param {Array} value
     * @protected
     */
    _uiSetRadioLabels: function(value) {
        var instance = this,
            radioGroupContainer = this.get('node').one('.' + CSS_EDITOR_RADIO_CONTENT);

        radioGroupContainer.empty();

        A.Array.each(value, function(label) {
            radioGroupContainer.append(instance._createRadioGroup(label));
        });

        this._uiSetEditedValue(this.get('editedValue'));
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.RadioGroupDataEditor`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The value after edition.
         *
         * @attribute editedValue
         * @default 0
         * @type Number
         */
        editedValue: {
            validator: function (val) {
                return val >= 0 && val < this.get('radioLabels').length;
            },
            value: 0
        },

        /**
         * Determines if the radio elements are inline or not.
         *
         * @attribute inline
         * @default false
         * @type Boolena
         */
        inline: {
            value: false
        },

        /**
         * The value to be edited.
         *
         * @attribute originalValue
         * @default 0
         * @type Number
         */
        originalValue: {
            validator: function (val) {
                return val >= 0 && val < this.get('radioLabels').length;
            },
            value: 0
        },

        /**
         * The list of labels to each radio button created.
         *
         * @attribute radioLabels
         * @default []
         * @type Array
         */
        radioLabels: {
            validator: A.Lang.isArray,
            value: []
        }
    }
});