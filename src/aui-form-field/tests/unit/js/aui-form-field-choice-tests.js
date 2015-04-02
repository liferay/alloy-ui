YUI.add('aui-form-field-choice-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-field-choice');

    suite.add(new Y.Test.Case({
        name: 'Form Field Choice Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should render a list of option according to options attribute': function() {
            var fieldNode;

            this._field = new Y.FormFieldChoice();
            this._field.set('options', ['Earth', 'Fire', 'Wind', 'Water', 'Heart']);
            fieldNode = this._field.get('content');

            Y.Assert.areEqual(fieldNode.all('.form-field-choice-option').item(0).get('text'), 'Earth');
            Y.Assert.areEqual(fieldNode.all('.form-field-choice-option').item(1).get('text'), 'Fire');
            Y.Assert.areEqual(fieldNode.all('.form-field-choice-option').item(2).get('text'), 'Wind');
            Y.Assert.areEqual(fieldNode.all('.form-field-choice-option').item(3).get('text'), 'Water');
            Y.Assert.areEqual(fieldNode.all('.form-field-choice-option').item(4).get('text'), 'Heart');
        },

        'should render a other option according to otherOption attribute': function() {
            var fieldNode;

            this._field = new Y.FormFieldChoice();
            fieldNode = this._field.get('content');

            Y.Assert.isNull(fieldNode.one('.form-field-choice-option-other'));
            this._field.set('otherOption', true);
            Y.Assert.isNotNull(fieldNode.one('.form-field-choice-option-other'));
            this._field.set('otherOption', false);
            Y.Assert.isNull(fieldNode.one('.form-field-choice-option-other'));
        },

        'should render input according to type attribute': function() {
            var content,
                optionsContainer;

            this._field = new Y.FormFieldChoice();
            this._field.set('options', ['Earth', 'Fire', 'Wind', 'Water', 'Heart']);

            content = this._field.get('content');
            optionsContainer = content.one('.form-field-choice-options-container');

            Y.Assert.isTrue(optionsContainer.hasClass('form-field-choice-radio'));
            Y.Assert.isFalse(optionsContainer.hasClass('form-field-choice-checkbox'));
            Y.Assert.isFalse(optionsContainer.hasClass('form-field-choice-list'));

            this._field.set('type', Y.FormFieldChoice.TYPES.CHECKBOX);
            Y.Assert.isFalse(optionsContainer.hasClass('form-field-choice-radio'));
            Y.Assert.isTrue(optionsContainer.hasClass('form-field-choice-checkbox'));
            Y.Assert.isFalse(optionsContainer.hasClass('form-field-choice-list'));

            this._field.set('type', Y.FormFieldChoice.TYPES.LIST);
            optionsContainer = content.one('.form-field-choice-options-container');

            Y.Assert.isFalse(optionsContainer.hasClass('form-field-choice-radio'));
            Y.Assert.isFalse(optionsContainer.hasClass('form-field-choice-checkbox'));
            Y.Assert.isTrue(optionsContainer.hasClass('form-field-choice-list'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {requires: ['aui-form-field-choice', 'test']});
