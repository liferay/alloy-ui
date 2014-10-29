YUI.add('aui-form-builder-field-date-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-date');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Date Tests',

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
            this._field = new Y.FormBuilderFieldDate();
            Y.one('#container').append(this._field.get('content'));
        },

        'should be able to edit settings': function() {
            var settings = Y.one('#settings');

            this._createField();

            this._field.renderSettingsPanel(settings);
            this._field.saveSettings();
            Y.Assert.areEqual('From: Month | Day', Y.one('.form-builder-field-date-from-date').getHTML());
            Y.Assert.areEqual('', Y.one('.form-builder-field-date-from-time').getHTML());
            Y.Assert.isFalse(Y.one('.form-builder-field-date-to-date').hasClass());
            Y.Assert.areEqual('', Y.one('.form-builder-field-date-to-time').getHTML());

            this._field.renderSettingsPanel(settings);
            settings.all('input[type="checkbox"]').item(0).simulate('click');
            this._field.saveSettings();
            Y.Assert.areEqual('From: Month | Day | Year', Y.one('.form-builder-field-date-from-date').getHTML());
            Y.Assert.areEqual('', Y.one('.form-builder-field-date-from-time').getHTML());
            Y.Assert.isFalse(Y.one('.form-builder-field-date-to-date').hasClass());
            Y.Assert.areEqual('', Y.one('.form-builder-field-date-to-time').getHTML());

            this._field.renderSettingsPanel(settings);
            settings.all('input[type="checkbox"]').item(1).simulate('click');
            this._field.saveSettings();
            Y.Assert.areEqual('From: Hour | Min | AM/PM', Y.one('.form-builder-field-date-from-time').getHTML());
            Y.Assert.isFalse(Y.one('.form-builder-field-date-to-date').hasClass());
            Y.Assert.areEqual('', Y.one('.form-builder-field-date-to-time').getHTML());

            this._field.renderSettingsPanel(settings);
            settings.all('input[type="checkbox"]').item(2).simulate('click');
            this._field.saveSettings();
            Y.Assert.areEqual('To: Month | Day | Year', Y.one('.form-builder-field-date-to-date').getHTML());
            Y.Assert.areEqual('To: Hour | Min | AM/PM', Y.one('.form-builder-field-date-to-time').getHTML());

            this._field.renderSettingsPanel(settings);
            settings.all('input[type="checkbox"]').item(2).simulate('click');
            this._field.saveSettings();
            Y.Assert.isFalse(Y.one('.form-builder-field-date-to-date').hasClass());
            Y.Assert.isFalse(Y.one('.form-builder-field-date-to-time').hasClass());

            this._field.renderSettingsPanel(settings);
            settings.all('input[type="checkbox"]').item(0).simulate('click');
            settings.all('input[type="checkbox"]').item(1).simulate('click');
            settings.all('input[type="checkbox"]').item(2).simulate('click');
            settings.all('input[type="checkbox"]').item(3).simulate('click');
            settings.all('input[type="checkbox"]').item(4).simulate('click');
            this._field.saveSettings();
            Y.Assert.areEqual('To: Month | Day | Year', Y.one('.form-builder-field-date-to-date').getHTML());
            Y.Assert.areEqual('To: Hour | Min | AM/PM', Y.one('.form-builder-field-date-to-time').getHTML());

            this._field.renderSettingsPanel(settings);
            settings.all('input[type="checkbox"]').item(5).simulate('click');
            this._field.saveSettings();
            Y.Assert.isTrue(this._field.get('required'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-date', 'node-event-simulate', 'test']
});
