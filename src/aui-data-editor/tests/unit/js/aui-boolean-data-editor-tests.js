YUI.add('aui-boolean-data-editor-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-boolean-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI Boolean Data Editor Unit Tests',

        'should set original value on the ui': function() {
            var editor = new Y.BooleanDataEditor({
                originalValue: true
            });

            Y.Assert.isTrue(editor.get('node').one('input').get('checked'));
            Y.Assert.isTrue(editor.get('editedValue'));

            editor.set('originalValue', false);
            Y.Assert.isFalse(editor.get('node').one('input').get('checked'));
            Y.Assert.isFalse(editor.get('editedValue'));
        },

        'should get edited value from the ui': function() {
            var editor,
                input;

            editor = new Y.BooleanDataEditor({
                originalValue: 'original'
            });
            input = editor.get('node').one('input');

            input.set('checked', true);
            input.simulate('change');
            Y.Assert.isTrue(editor.get('editedValue'));

            input.set('checked', false);
            input.simulate('change');
            Y.Assert.isFalse(editor.get('editedValue'));
        }
    }));

    Y.Test.Runner.add(suite);

},'', { requires: [ 'aui-boolean-data-editor', 'node-event-simulate' ] });
