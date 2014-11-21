/**
 * The Form Builder Field Grid Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-grid
 */

/**
 * A base class for Form Builder Field Grid.
 *
 * @class A.FormBuilderFieldGrid
 * @extends A.FormFieldGrid
 * @uses A.FormBuilderFieldBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldGrid = A.Base.create('form-builder-field-grid', A.FormFieldGrid, [A.FormBuilderFieldBase], {
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
                attrName: 'columns',
                editor: new A.OptionsDataEditor({
                    label: 'Columns',
                    required: true
                })
            },
            {
                attrName: 'rows',
                editor: new A.OptionsDataEditor({
                    label: 'Rows',
                    required: true
                })
            }
        );
    }
});
