YUI.add('aui-form-builder-field-text-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-text');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Text Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
                Y.one('#settings').empty();
            }
        },

        'should be able to edit settings': function() {
            var settings = Y.one('#settings');

            this._field = new Y.FormBuilderFieldText();
            Y.one('#container').append(this._field.get('content'));

            this._field.renderSettingsPanel(settings);

            settings.one('.button-switch').simulate('click');
            settings.all('.radio-group-data-editor-button').item(1).simulate('click');

            this._field.saveSettings();

            Y.Assert.areEqual(this._field.get('type'), 1);
            Y.Assert.isTrue(this._field.get('required'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-text', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
