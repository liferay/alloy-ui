/**
 * The Form Builder Field Choice Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-choice
 */

/**
 * A base class for Form Builder Field Choice.
 *
 * @class A.FormBuilderFieldChoice
 * @extends A.FormFieldChoice
 * @uses A.FormBuilderFieldBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldChoice = A.Base.create('form-builder-field-choice', A.FormFieldChoice, [A.FormBuilderFieldBase], {
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
                attrName: 'type',
                editor: new A.TabsDataEditor({
                    tabs: [
                        {
                            label: 'Radio button',
                            value: A.FormFieldChoice.TYPES.RADIO
                        },
                        {
                            label: 'Checkbox',
                            value: A.FormFieldChoice.TYPES.CHECKBOX
                        },
                        {
                            label: 'List Select',
                            value: A.FormFieldChoice.TYPES.LIST
                        }
                    ]
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
                    label: 'Add an option called "Other"'
                })
            }
        );
    },

    /**
     * Fills the advanced settings array with the information for this field.
     *
     * @method _fillAdvancedSettings
     * @override
     * @protected
     */
    _fillAdvancedSettings: function() {
        this._advancedSettings = [
            {
                attrName: 'name',
                footerLabel: 'Name',
                editor: new A.TextDataEditor({
                    label: 'Name'
                })
            }
        ];
    }
});
