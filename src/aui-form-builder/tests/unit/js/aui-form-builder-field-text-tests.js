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

            settings.all('.button-switch').item(0).simulate('click');
            settings.all('.button-switch').item(1).simulate('click');

            this._field.saveSettings();

            Y.Assert.isTrue(this._field.get('multiline'));
            Y.Assert.isTrue(this._field.get('required'));
        },

        'should be able to edit advanced settings': function() {
            var settings = Y.one('#settings');

            this._field = new Y.FormBuilderFieldText();
            Y.one('#container').append(this._field.get('content'));

            this._field.renderSettingsPanel(settings);

            settings.all('.form-builder-field-settings-panel-advanced').item(0).one('input').set('value', 'advanced 1');

            this._field.saveSettings();

            Y.Assert.areEqual('advanced 1', this._field.get('name'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-text', 'node-event-simulate', 'test']
});