YUI.add('aui-scale-data-editor-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-scale-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI Scale Data Editor Unit Tests',

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

        'should set original value on the ui': function() {
            var editor = new Y.ScaleDataEditor({
                editedValue: [0, 1],
                originalValue: [0, 1]
            });

            Y.Assert.areEqual(0, editor.get('node').all('input').item(0).get('value'));
            Y.Assert.areEqual(1, editor.get('node').all('input').item(1).get('value'));

            Y.Assert.areEqual(0, editor.get('editedValue')[0]);
            Y.Assert.areEqual(1, editor.get('editedValue')[1]);
        },

        'should get edited value from the ui': function() {
            var instance = this,
                editor;

            editor = new Y.ScaleDataEditor({
                editedValue: [0, 1],
                originalValue: [0, 1]
            });

            this._simulateInputChange(editor.get('node').all('input').item(0), 2, function() {
                Y.Assert.areEqual(2, editor.get('editedValue')[0]);
                instance._simulateInputChange(editor.get('node').all('input').item(1), 3, function() {
                    Y.Assert.areEqual(3, editor.get('editedValue')[1]);
                });
            });
        },

        'should set label': function() {
            var editor = new Y.ScaleDataEditor({
                label: 'My Label'
            });

            Y.Assert.areEqual('My Label', editor.get('node').one('label').get('text'));

            editor.set('label', 'New Label');
            Y.Assert.areEqual('New Label', editor.get('node').one('label').get('text'));
        },

        'should check if the form is valid': function() {
            var editor = new Y.ScaleDataEditor({
                editedValue: [0, 1],
                originalValue: [0, 1]
            });

            Y.Assert.isTrue(editor.isValid());

            editor.set('required', true);
            editor.set('editedValue', ['', '']);
            Y.Assert.isFalse(editor.isValid());

            editor.set('editedValue', ['II', 'IX']);
            Y.Assert.isFalse(editor.isValid());

            editor.set('editedValue', [1985, 1955]);
            Y.Assert.isFalse(editor.isValid());

            editor.set('editedValue', ['Mark1', 'Mark8']);
            Y.Assert.isFalse(editor.isValid());

            editor.set('editedValue', ['60°53', '101°53']);
            Y.Assert.isFalse(editor.isValid());

            editor.set('editedValue', ['1982', '101°53']);
            Y.Assert.isFalse(editor.isValid());

            editor.set('editedValue', ['1982', '1986']);
            Y.Assert.isTrue(editor.isValid());

            editor.set('editedValue', ['-Infinity', '+Infinity']);
            Y.Assert.isTrue(editor.isValid());
        },

        'should make sure originalValue has at least 2 positions': function() {
            var editor = new Y.ScaleDataEditor();

            Y.Assert.areEqual(editor.get('node').one('.scale-data-editor-lower-value').get(''));
            Y.Assert.areEqual(editor.get('node').one('.scale-data-editor-higher-value').get(''));

            editor.set('originalValue', [0]);

            Y.Assert.areEqual(editor.get('node').one('.scale-data-editor-lower-value').get('0'));
            Y.Assert.areEqual(editor.get('node').one('.scale-data-editor-higher-value').get(''));

            editor.set('originalValue', [0, 1]);

            Y.Assert.areEqual(editor.get('node').one('.scale-data-editor-lower-value').get('0'));
            Y.Assert.areEqual(editor.get('node').one('.scale-data-editor-higher-value').get('1'));
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'aui-scale-data-editor', 'node-event-simulate' ] });
