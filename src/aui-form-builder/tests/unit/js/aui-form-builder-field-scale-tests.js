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

        /**
         * Simulates a `valuechange` event for the given input.
         *
         * @method _simulateInputChange
         * @param {Node} input The input node to simulate the event for.
         * @param {String} text The text that should be set as the input's final value.
         * @param {Function} callback The function to be called when the simulation is
         *   done.
         * @protected
         */
        _simulateInputChange: function(input, text, callback) {
            input.simulate('keydown');
            input.set('value', text);
            input.simulate('keydown');

            this.wait(callback, Y.ValueChange.POLL_INTERVAL);
        },

        'should be able to edit settings': function() {
            var instance = this,
                higherInput,
                lowerInput,
                settings = Y.one('#settings');

            this._createField();
            this._field.renderSettingsPanel(settings);

            settings.all('.button-switch').item(0).simulate('click');

            lowerInput = settings.one('.scale-data-editor-lower-value');
            this._simulateInputChange(lowerInput, 0, function() {
                higherInput = settings.one('.scale-data-editor-higher-value');
                instance._simulateInputChange(higherInput, 1, function() {
                    instance._field.saveSettings();

                    Y.Assert.areEqual(0, instance._field.get('range')[0]);
                    Y.Assert.areEqual(1, instance._field.get('range')[1]);
                    Y.Assert.isTrue(instance._field.get('required'));
                });
            });
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-scale', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
