YUI.add('aui-form-builder-tests', function(Y) {

    var isNode = function(v) {
        return (v instanceof Y.Node);
    };

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
        'predefined value should default to empty value': function() {
            var predefinedValue = radioField.get('predefinedValue');

            Y.Assert.areEqual('', predefinedValue);
        },

        'changes in predefined value should reflect on UI': function() {
            var templateNode = radioField.get('templateNode'),
                options = radioField.get('options');

            var value = options[0].value;

            radioField.set('predefinedValue', value);

            var checkedNode = templateNode.one('input[type=radio]:checked');

            Y.Assert.areEqual(true, isNode(checkedNode), 'There should be a checked input.');

            Y.Assert.areEqual(value, checkedNode.attr('value'), 'The value should be equal to "' + value + '".');
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
