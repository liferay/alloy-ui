/**
 * The Form Builder Field Scale Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-scale
 */

/**
 * A base class for Form Builder Field Scale.
 *
 * @class A.FormBuilderFieldScale
 * @extends A.FormFieldScale
 * @uses A.FormBuilderFieldBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldScale = A.Base.create('form-builder-field-scale', A.FormFieldScale, [A.FormBuilderFieldBase], {
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
                attrName: 'range',
                editor: new A.ScaleDataEditor({
                    label: 'Scale',
                    required: true
                })
            }
        );
    }
});
