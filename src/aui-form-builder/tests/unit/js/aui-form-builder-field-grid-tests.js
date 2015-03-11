YUI.add('aui-form-builder-field-grid-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-grid');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Field Grid Tests',

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
            this._field = new Y.FormBuilderFieldGrid();
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

        'should be able to edit rows and columns': function() {
            var instance = this,
                optionNodes,
                settings = Y.one('#settings');

            this._createField();
            this._field.renderSettingsPanel(settings);

            settings.all('.button-switch').item(0).simulate('click');

            settings.all('.options-data-editor-add').item(0).simulate('click');
            settings.all('.options-data-editor-add').item(1).simulate('click');

            optionNodes = settings.all('.options-data-editor-option');
            this._simulateInputChange(optionNodes.item(0).one('input'), 'Column 1', function() {
                instance._simulateInputChange(optionNodes.item(1).one('input'), 'Row 1', function() {
                    instance._field.saveSettings();

                    Y.Assert.isTrue(instance._field.get('required'));
                    Y.Assert.areEqual('Row 1', instance._field.get('rows')[0]);
                    Y.Assert.areEqual('Column 1', instance._field.get('columns')[0]);
                });
            });
        },

        'should render correctly': function() {
            this._createField();

            this._field.set('columns', ['Column1', 'Column2', 'Column3']);
            Y.Assert.areEqual(
                4,
                this._field.get('content').one('.form-field-grid-columns').all('th').size()
            );

            this._field.set('columns', ['Column1', 'Column2']);
            Y.Assert.areEqual(
                3,
                this._field.get('content').one('.form-field-grid-columns').all('th').size()
            );

            this._field.set('rows', ['Row1', 'Row2']);
            Y.Assert.areEqual(
                3,
                this._field.get('content').one('.form-field-grid-table').all('tr').size()
            );

            this._field.set('rows', ['Row1', 'Row2', 'Row3']);
            Y.Assert.areEqual(
                4,
                this._field.get('content').one('.form-field-grid-table').all('tr').size()
            );
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-field-grid', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
