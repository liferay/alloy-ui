/**
 * The Form Builder Field Text Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-text
 */

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
     * Holds the name of this field.
     *
     * @property FIELD_NAME
     * @type {String}
     */
    FIELD_NAME: 'Text',

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
