/**
 * The Form Builder Field Text Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-text
 */

var CSS_FIELD_TEXT = A.getClassName('form', 'builder', 'field', 'text'),
    CSS_FIELD_TEXT_HELP = A.getClassName('form', 'builder', 'field', 'text', 'help'),
    CSS_FIELD_TEXT_INPUT = A.getClassName('form', 'builder', 'field', 'text', 'input'),
    CSS_FIELD_TEXT_TITLE = A.getClassName('form', 'builder', 'field', 'text', 'title'),

    TPL_FIELD_TEXT_CONTENT = '<div class="form-group">' +
        '<label class="' + CSS_FIELD_TEXT_TITLE + '"></label>' +
        '<div class="' + CSS_FIELD_TEXT_HELP + '"></div>' +
        '<div class="' + CSS_FIELD_TEXT_INPUT + '"></div></div>',
    TPL_SINGLE_LINE = '<input type="text" class="form-control"></input>',
    TPL_MULTILINE = '<textarea class="form-control" rows="3"></textarea>';

/**
 * A base class for Form Builder Field Text.
 *
 * @class A.FormBuilderFieldText
 * @extends A.FormBuilderFieldBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldText = A.Base.create('form-builder-field-text', A.FormBuilderFieldBase, [], {
    /**
     * Constructor for the `A.FormBuilderFieldText`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        content.addClass(CSS_FIELD_TEXT);
        content.setHTML(TPL_FIELD_TEXT_CONTENT);

        this._uiSetHelp(this.get('help'));
        this._uiSetMultiline(this.get('multiline'));
        this._uiSetTitle(this.get('title'));

        this.after({
            helpChange: this._afterHelpChange,
            multilineChange: this._afterMultilineChange,
            titleChange: this._afterTitleChange
        });
    },

    /**
     * Fired after the `help` attribute is set.
     *
     * @method _afterHelpChange
     * @protected
     */
    _afterHelpChange: function() {
        this._uiSetHelp(this.get('help'));
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
     * Fired after the `title` attribute is set.
     *
     * @method _afterTitleChange
     * @protected
     */
    _afterTitleChange: function() {
        this._uiSetTitle(this.get('title'));
    },

    /**
     * Fills the settings array with the information for this field.
     *
     * @method _fillSettings
     * @override
     * @protected
     */
    _fillSettings: function() {
        this._settings = [
            {
                attrName: 'title',
                editor: new A.TextDataEditor({
                    label: 'Type your question here'
                })
            },
            {
                attrName: 'help',
                editor: new A.TextDataEditor({
                    label: 'Help text...'
                })
            },
            {
                attrName: 'multiline',
                editor: new A.BooleanDataEditor({
                    label: 'Multiline'
                })
            },
            {
                attrName: 'required',
                editor: new A.BooleanDataEditor({
                    label: 'Required'
                })
            }
        ];
    },

    /**
     * Updates the ui according to the value of the `help` attribute.
     *
     * @method _uiSetHelp
     * @param {String} help
     * @protected
     */
    _uiSetHelp: function(help) {
        this.get('content').one('.' + CSS_FIELD_TEXT_HELP).set('text', help);
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
    },

    /**
     * Updates the ui according to the value of the `title` attribute.
     *
     * @method _uiSetTitle
     * @param {String} title
     * @protected
     */
    _uiSetTitle: function(title) {
        this.get('content').one('.' + CSS_FIELD_TEXT_TITLE).set('text', title);
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
         * Help text.
         *
         * @attribute help
         * @default ''
         * @type {String}
         */
        help: {
            validator: A.Lang.isString,
            value: ''
        },

        /**
         * Flag indicating if the text input will allow multiple lines.
         *
         * @attribute multiline
         * @default  false
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
         * @default  false
         * @type {Boolean}
         */
        required: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * The title of this field.
         *
         * @attribute title
         * @default ''
         * @type {String}
         */
        title: {
            validator: A.Lang.isString,
            value: ''
        }
    }
});
