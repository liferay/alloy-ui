YUI.add('aui-form-builder-field-choice-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-choice');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Choice Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        /**
         * Creates a field instance.
         *
         * @method _createField
         * @protected
         */
        _createField: function() {
            this._field = new Y.FormBuilderFieldChoice();
            Y.one('#container').append(this._field.get('content'));
        },

        'should be able to edit settings': function() {
            var settings = Y.one('#settings');

            this._createField();
            this._field.renderSettingsPanel(settings);

            settings.all('.button-switch').item(0).simulate('click');
            settings.all('.button-switch').item(1).simulate('click');
            settings.all('.button-switch').item(2).simulate('click');

            settings.all('.tab').item(1).simulate('click');

            settings.one('.options-data-editor-add').simulate('click');
            settings.one('.options-data-editor-add').simulate('click');
            settings.all('.options-data-editor-option').item(0).one('input').set('value', 'Option 1');
            settings.all('.options-data-editor-option').item(1).one('input').set('value', 'Option 2');

            this._field.saveSettings();

            Y.Assert.isTrue(this._field.get('required'));
            Y.Assert.isTrue(this._field.get('multiple'));
            Y.Assert.isTrue(this._field.get('otherOption'));

            Y.Assert.areEqual(Y.FormFieldChoice.TYPES.CHECKBOX, this._field.get('type'));

            Y.Assert.areEqual(2, this._field.get('options').length);
            Y.Assert.areEqual('Option 1', this._field.get('options')[0]);
            Y.Assert.areEqual('Option 2', this._field.get('options')[1]);
        },

        'should render correctly': function() {
            this._createField();

            this._field.set('options', ['Option1', 'Option2']);
            Y.Assert.areEqual(
                2,
                this._field.get('content').all('.form-field-choice-option').size()
            );
        },

        'should render other option correctly': function() {
            this._createField();

            this._field.set('options', ['Option1', 'Option2']);
            this._field.set('otherOption', true);
            Y.Assert.areEqual(
                3,
                this._field.get('content').all('.form-field-choice-option').size()
            );

            this._field.set('otherOption', false);
            Y.Assert.areEqual(
                2,
                this._field.get('content').all('.form-field-choice-option').size()
            );
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-choice', 'node-event-simulate', 'test']
});
