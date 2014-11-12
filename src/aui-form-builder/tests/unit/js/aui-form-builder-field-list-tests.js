YUI.add('aui-form-builder-field-list-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-list');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field List Tests',

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
            this._field = new Y.FormBuilderFieldList();
            Y.one('#container').append(this._field.get('content'));
        },

        'should be able to edit settings': function() {
            var settings = Y.one('#settings');

            this._createField();
            this._field.renderSettingsPanel(settings);

            settings.all('input[type="checkbox"]').item(0).simulate('click');
            settings.all('input[type="checkbox"]').item(1).simulate('click');

            settings.one('.options-data-editor-add').simulate('click');
            settings.one('.options-data-editor-add').simulate('click');
            settings.all('.options-data-editor-option').item(0).one('input').set('value', 'Option 1');
            settings.all('.options-data-editor-option').item(1).one('input').set('value', 'Option 2');

            this._field.saveSettings();

            Y.Assert.areEqual(2, this._field.get('options').length);
            Y.Assert.areEqual('Option 1', this._field.get('options')[0]);
            Y.Assert.areEqual('Option 2', this._field.get('options')[1]);
            Y.Assert.isTrue(this._field.get('otherOption'));
            Y.Assert.isTrue(this._field.get('required'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-list', 'node-event-simulate', 'test']
});
