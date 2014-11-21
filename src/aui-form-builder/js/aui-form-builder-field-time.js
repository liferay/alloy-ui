/**
 * The Form Builder Field Time Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-time
 */

/**
 * A base class for Form Builder Field Time.
 *
 * @class A.FormBuilderFieldTime
 * @extends A.FormFieldTime
 * @uses A.FormBuilderFieldBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldTime = A.Base.create('form-builder-field-time', A.FormFieldTime, [A.FormBuilderFieldBase], {

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
                attrName: 'toggleInterval',
                editor: new A.BooleanDataEditor({
                    label: 'Enable "From/To" Format'
                })
            }
        );
    }
});
