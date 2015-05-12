YUI.add('aui-text-data-editor-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-text-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI Text Data Editor Unit Tests',

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
            var editor = new Y.TextDataEditor({
                editedValue: 'original',
                originalValue: 'original'
            });

            Y.Assert.areEqual('original', editor.get('node').one('input').get('value'));
            Y.Assert.areEqual('original', editor.get('editedValue'));
        },

        'should get edited value from the ui': function() {
            var editor = new Y.TextDataEditor({
                editedValue: 'original',
                originalValue: 'original'
            });

            this._simulateInputChange(editor.get('node').one('input'), 'new', function() {
                Y.Assert.areEqual('new', editor.get('editedValue'));
            });
        },

        'should check if the form is valid': function() {
            var editor = new Y.TextDataEditor();

            Y.Assert.isTrue(editor.isValid());

            editor.set('required', true);
            Y.Assert.isFalse(editor.isValid());

            editor.set('editedValue', '   ');
            Y.Assert.isFalse(editor.isValid());

            editor.set('editedValue', 'Atari Force');
            Y.Assert.isTrue(editor.isValid());
        },

        'should render a placeholder on text input according to placeholder attribute': function() {
            var editor = new Y.TextDataEditor(),
                fieldNode = editor.get('node');

            Y.Assert.areEqual(fieldNode.one('input[type="text"]').getAttribute('placeholder'), '');

            editor.set('placeholder', 'Blob');
            Y.Assert.areEqual(fieldNode.one('input[type="text"]').getAttribute('placeholder'), 'Blob');
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'aui-text-data-editor', 'node-event-simulate' ] });
