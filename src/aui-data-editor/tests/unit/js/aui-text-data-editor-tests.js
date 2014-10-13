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

        'should set label': function() {
            var editor = new Y.TextDataEditor({
                label: 'My Label'
            });

            Y.Assert.areEqual('My Label', editor.get('node').one('label').get('text'));

            editor.set('label', 'New Label');
            Y.Assert.areEqual('New Label', editor.get('node').one('label').get('text'));
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'aui-text-data-editor' ] });
