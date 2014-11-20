/**
 * The Form Builder Field List Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-list
 */

/**
 * A base class for Form Builder Field List.
 *
 * @class A.FormBuilderFieldList
 * @extends A.FormField
 * @uses A.FormBuilderFieldBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldList = A.Base.create('form-builder-field-list', A.FormFieldList, [A.FormBuilderFieldBase], {
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
});
