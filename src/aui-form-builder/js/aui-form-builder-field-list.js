/**
 * The Form Builder Field List Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-list
 */

var CSS_FIELD_LIST = A.getClassName('form', 'builder', 'field', 'list'),
    CSS_FIELD_LIST_CONTENT = A.getClassName('form', 'builder', 'field', 'list', 'content'),
    CSS_FIELD_LIST_PLACEHOLDER = A.getClassName('form', 'builder', 'field', 'list', 'placeholder'),
    CSS_FIELD_LIST_TOGGLE = A.getClassName('form', 'builder', 'field', 'list', 'toggle');

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
    TPL_FIELD_CONTENT: '<div class="' + CSS_FIELD_LIST_CONTENT + '">' +
        '<div class="' + CSS_FIELD_LIST_TOGGLE + '">' +
        '<span class="glyphicon glyphicon-chevron-down"></span></div>' +
        '<div class="' + CSS_FIELD_LIST_PLACEHOLDER + '">Select an option</div></div>',

    /**
     * Constructor for the `A.FormBuilderFieldList`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        content.addClass(CSS_FIELD_LIST);
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
                editor: new A.OptionsDataEditor({
                    required: true
                })
            },
            {
                attrName: 'otherOption',
                editor: new A.BooleanDataEditor({
                    label: 'Add "Other" option'
                })
            }
        );
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
