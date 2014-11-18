YUI.add('aui-text-data-editor-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-text-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI Text Data Editor Unit Tests',

        'should set original value on the ui': function() {
            var editor = new Y.TextDataEditor({
                originalValue: 'original'
            });

            Y.Assert.areEqual('original', editor.get('node').one('input').get('value'));
            Y.Assert.areEqual('original', editor.get('editedValue'));
        },

        'should get edited value from the ui': function() {
            var editor = new Y.TextDataEditor({
                originalValue: 'original'
            });

            editor.get('node').one('input').set('value', 'new');
            Y.Assert.areEqual('new', editor.get('editedValue'));
        },

        'should check if the form is valid': function() {
            var editor = new Y.TextDataEditor();

            Y.Assert.isTrue(editor.isValid());

            editor.set('required', true);
            Y.Assert.isFalse(editor.isValid());

            editor.get('node').one('input').set('value', '   ');
            Y.Assert.isFalse(editor.isValid());

            editor.get('node').one('input').set('value', 'Atari Force');
            Y.Assert.isTrue(editor.isValid());
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'aui-text-data-editor' ] });
