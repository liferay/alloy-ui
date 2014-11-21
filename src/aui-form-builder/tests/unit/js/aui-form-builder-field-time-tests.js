YUI.add('aui-form-builder-field-time-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-time');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Time Tests',

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
            this._field = new Y.FormBuilderFieldTime();
            Y.one('#container').append(this._field.get('content'));
        },

        'should be able to edit settings': function() {
            var settings = Y.one('#settings'),
                toTime;

            this._createField();
            this._field.renderSettingsPanel(settings);
            this._field.saveSettings();

            toTime = Y.one('.form-field-time-to');

            Y.Assert.isTrue(toTime.hasClass('hide'));

            this._field.renderSettingsPanel(settings);
            settings.all('.button-switch').item(1).simulate('click');
            this._field.saveSettings();
            Y.Assert.isFalse(toTime.hasClass('hide'));

            this._field.renderSettingsPanel(settings);
            settings.all('.button-switch').item(0).simulate('click');
            this._field.saveSettings();
            Y.Assert.isTrue(this._field.get('required'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder', 'aui-form-builder-field-time', 'node-event-simulate', 'test']
});
