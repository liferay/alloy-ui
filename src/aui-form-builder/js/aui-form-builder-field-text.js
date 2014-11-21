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
 * @extends A.FormFieldText
 * @uses A.FormBuilderFieldBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldText = A.Base.create('form-builder-field-text', A.FormFieldText, [A.FormBuilderFieldBase], {
    /**
     * Fills the settings array with the information for this field.
     *
     * @method _fillSettings
     * @override
     * @protected
     */
    _fillSettings: function() {
        this._settings.push(
            {
                attrName: 'required',
                editor: new A.BooleanDataEditor({
                    label: 'Required'
                })
            },
            {
                attrName: 'multiline',
                editor: new A.BooleanDataEditor({
                    label: 'Multiline'
                })
            }
        );
    }
});
