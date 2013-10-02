YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder');

    var radioField = new Y.FormBuilderRadioField({
        label: 'Colours',
        type: 'radio',
        options: [
            {
                label: 'Red',
                value: 'red'
                },
            {
                label: 'Green',
                value: 'green'
                },
            {
                label: 'Blue',
                value: 'blue'
                }
            ]
    });

    new Y.FormBuilder({
        boundingBox: '#formBuilder',
        availableFields: [
            {
                iconClass: 'form-builder-field-icon form-builder-field-icon-radio',
                label: 'Radio Buttons',
                type: 'radio'
            }
        ],
        fields: [radioField]
    }).render();

    suite.add(new Y.Test.Case({
        name: 'FormBuilderRadioField',
        'predefined value should default to first option value': function() {
            var options = radioField.get('options'),
                predefinedValue = radioField.get('predefinedValue');

            Y.Assert.areEqual(options[0].value, predefinedValue);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-form-builder']
});
