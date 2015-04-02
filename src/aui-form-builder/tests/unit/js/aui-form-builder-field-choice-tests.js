YUI.add('aui-form-builder-field-choice-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-choice');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Choice Tests',

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
            this._field = new Y.FormBuilderFieldChoice();
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
                optionNodes,
                settings = Y.one('#settings');

            this._createField();
            this._field.renderSettingsPanel(settings);

            settings.all('.button-switch').item(0).simulate('click');
            settings.all('.button-switch').item(1).simulate('click');

            settings.all('.tab').item(1).simulate('click');

            settings.one('.options-data-editor-add').simulate('click');
            settings.one('.options-data-editor-add').simulate('click');

            optionNodes = settings.all('.options-data-editor-option');
            this._simulateInputChange(optionNodes.item(0).one('input'), 'Option 1', function() {
                instance._simulateInputChange(optionNodes.item(1).one('input'), 'Option 2', function() {
                    instance._field.saveSettings();

                    Y.Assert.isTrue(instance._field.get('required'));
                    Y.Assert.isTrue(instance._field.get('otherOption'));

                    Y.Assert.areEqual(Y.FormFieldChoice.TYPES.CHECKBOX, instance._field.get('type'));

                    Y.Assert.areEqual(2, instance._field.get('options').length);
                    Y.Assert.areEqual('Option 1', instance._field.get('options')[0]);
                    Y.Assert.areEqual('Option 2', instance._field.get('options')[1]);
                });
            });
        },

        'should render correctly': function() {
            this._createField();

            this._field.set('options', ['Option1', 'Option2']);
            Y.Assert.areEqual(
                2,
                this._field.get('content').all('.form-field-choice-option').size()
            );
        },

        'should render other option correctly': function() {
            this._createField();

            this._field.set('options', ['Option1', 'Option2']);
            this._field.set('otherOption', true);
            Y.Assert.areEqual(
                3,
                this._field.get('content').all('.form-field-choice-option').size()
            );

            this._field.set('otherOption', false);
            Y.Assert.areEqual(
                2,
                this._field.get('content').all('.form-field-choice-option').size()
            );
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-choice', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
