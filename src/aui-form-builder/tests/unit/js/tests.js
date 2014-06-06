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

    var textAreaField = new Y.FormBuilderTextAreaField({
        label: 'Custom Textarea Label',
        type: 'textarea',
        hiddenAttributes: ['label', 'type']
    });

    var formBuilder = new Y.FormBuilder({
        boundingBox: '#formBuilder',
        availableFields: [
            {
                iconClass: 'form-builder-field-icon form-builder-field-icon-radio',
                label: 'Radio Buttons',
                type: 'radio'
            }
        ],
        fields: [radioField, textAreaField]
    }).render();

    suite.add(new Y.Test.Case({
        name: 'FormBuilderRadioField',
        'predefined value should default to first option value': function() {
            var options = radioField.get('options'),
                predefinedValue = radioField.get('predefinedValue');

            Y.Assert.areEqual(options[0].value, predefinedValue);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'Form Builder clone field tests',

        'cloned field should inherit hiddenAttributes': function() {
            formBuilder.duplicateField(textAreaField);

            var textAreaFields = [];

            formBuilder.get('fields').each(
                function(item) {
                    if (item.name === 'form-builder-textarea-field') {
                        textAreaFields.push(item);
                    }
                }
            );

            var firstTextArea = textAreaFields[0];
            var clonedTextArea = textAreaFields[1];

            // Fields should have the same attributes hidden in the settings panel
            Y.Assert.areSame(firstTextArea.get('hiddenAttributes'), clonedTextArea.get('hiddenAttributes'));

            // Values from those hidden fields should be cloned anyways
            Y.Assert.areSame(firstTextArea.get('label'), clonedTextArea.get('label'));
            Y.Assert.areSame(firstTextArea.get('type'), clonedTextArea.get('type'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-form-builder']
});
