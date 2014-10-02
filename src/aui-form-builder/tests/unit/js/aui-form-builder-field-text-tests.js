YUI.add('aui-form-builder-field-text-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-text');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Text Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should be able to edit settings': function() {
            var container = Y.Node.create('<div></div>');

            this._field = new Y.FormBuilderFieldText();
            this._field.renderSettingsPanel(container);

            container.all('input[type="text"]').item(0).set('value', 'My Title');
            container.all('input[type="text"]').item(1).set('value', 'My Help');
            container.all('input[type="checkbox"]').item(0).set('checked', true);
            container.all('input[type="checkbox"]').item(1).set('checked', true);

            this._field.saveSettings();

            Y.Assert.areEqual('My Title', this._field.get('title'));
            Y.Assert.areEqual('My Help', this._field.get('help'));
            Y.Assert.isTrue(this._field.get('multiline'));
            Y.Assert.isTrue(this._field.get('required'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-text', 'test']
});