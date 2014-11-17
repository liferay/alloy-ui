YUI.add('aui-form-builder-field-scale-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-scale');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Scale Tests',

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
            this._field = new Y.FormBuilderFieldScale();
            Y.one('#container').append(this._field.get('content'));
        },

        'should be able to edit settings': function() {
            var settings = Y.one('#settings');

            this._createField();
            this._field.renderSettingsPanel(settings);

            settings.all('.button-switch').item(0).simulate('click');

            settings.one('.scale-data-editor').one('.scale-data-editor-lower-value').set('value', 0);
            settings.one('.scale-data-editor').one('.scale-data-editor-higher-value').set('value', 1);

            this._field.saveSettings();

            Y.Assert.areEqual(0, this._field.get('range')[0]);
            Y.Assert.areEqual(1, this._field.get('range')[1]);
            Y.Assert.isTrue(this._field.get('required'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-scale', 'node-event-simulate', 'test']
});
