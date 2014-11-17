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
            var fromDate,
                fromTime,
                settings = Y.one('#settings'),
                toContainer,
                toDate,
                toTime;

            this._createField();
            this._field.renderSettingsPanel(settings);
            this._field.saveSettings();

            fromDate = Y.one('.form-field-date-from-date');
            fromTime = Y.one('.form-field-date-from-time');
            toContainer = Y.one('.form-field-date-to');
            toDate = Y.one('.form-field-date-to-date');
            toTime = Y.one('.form-field-date-to-time');

            Y.Assert.isFalse(fromDate.hasClass('year'));
            Y.Assert.areEqual('none', fromTime.getStyle('display'));
            Y.Assert.areEqual('none', toContainer.getStyle('display'));

            this._field.renderSettingsPanel(settings);
            settings.all('.button-switch').item(1).simulate('click');
            this._field.saveSettings();
            Y.Assert.isTrue(fromDate.hasClass('year'));
            Y.Assert.areEqual('none', fromTime.getStyle('display'));
            Y.Assert.areEqual('none', toContainer.getStyle('display'));

            this._field.renderSettingsPanel(settings);
            settings.all('.button-switch').item(2).simulate('click');
            this._field.saveSettings();
            Y.Assert.isTrue(fromDate.hasClass('year'));
            Y.Assert.areNotEqual('none', fromTime.getStyle('display'));
            Y.Assert.areEqual('none', toContainer.getStyle('display'));

            this._field.renderSettingsPanel(settings);
            settings.all('.button-switch').item(3).simulate('click');
            this._field.saveSettings();
            Y.Assert.isTrue(fromDate.hasClass('year'));
            Y.Assert.areNotEqual('none', fromTime.getStyle('display'));
            Y.Assert.areNotEqual('none', toContainer.getStyle('display'));
            Y.Assert.isTrue(toDate.hasClass('year'));
            Y.Assert.areNotEqual('none', toTime.getStyle('display'));

            this._field.renderSettingsPanel(settings);
            settings.all('.button-switch').item(3).simulate('click');
            this._field.saveSettings();
            Y.Assert.isTrue(fromDate.hasClass('year'));
            Y.Assert.areNotEqual('none', fromTime.getStyle('display'));
            Y.Assert.areEqual('none', toContainer.getStyle('display'));

            this._field.renderSettingsPanel(settings);
            settings.all('.button-switch').item(1).simulate('click');
            settings.all('.button-switch').item(2).simulate('click');
            settings.all('.button-switch').item(3).simulate('click');
            settings.all('.button-switch').item(4).simulate('click');
            settings.all('.button-switch').item(5).simulate('click');
            this._field.saveSettings();
            Y.Assert.isFalse(fromDate.hasClass('year'));
            Y.Assert.areEqual('none', fromTime.getStyle('display'));
            Y.Assert.areNotEqual('none', toContainer.getStyle('display'));
            Y.Assert.isTrue(toDate.hasClass('year'));
            Y.Assert.areNotEqual('none', toTime.getStyle('display'));

            this._field.renderSettingsPanel(settings);
            settings.all('.button-switch').item(0).simulate('click');
            this._field.saveSettings();
            Y.Assert.isTrue(this._field.get('required'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder', 'aui-form-builder-field-date', 'node-event-simulate', 'test']
});
