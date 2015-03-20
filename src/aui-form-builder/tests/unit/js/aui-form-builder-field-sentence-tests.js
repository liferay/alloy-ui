YUI.add('aui-form-builder-field-sentence-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-sentence');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Sentence Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
                Y.one('#container').empty();
            }
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
                container = Y.one('#container'),
                inputs;

            this._field = new Y.FormBuilderFieldSentence();
            this._field.renderSettingsPanel(container);

            inputs = container.all('input[type="text"]');
            this._simulateInputChange(inputs.item(0), 'My Title', function() {
                instance._simulateInputChange(inputs.item(1), 'My Help', function() {
                    instance._field.saveSettings();

                    Y.Assert.areEqual('My Title', instance._field.get('title'));
                    Y.Assert.areEqual('My Help', instance._field.get('help'));
                });
            });
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-sentence', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
