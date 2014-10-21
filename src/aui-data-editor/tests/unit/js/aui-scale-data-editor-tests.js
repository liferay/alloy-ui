YUI.add('aui-scale-data-editor-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-scale-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI Scale Data Editor Unit Tests',

        'should set original value on the ui': function() {
            var editor = new Y.ScaleDataEditor({
                originalValue: [0, 1]
            });

            Y.Assert.areEqual(0, editor.get('node').all('input').item(0).get('value'));
            Y.Assert.areEqual(1, editor.get('node').all('input').item(1).get('value'));

            Y.Assert.areEqual(0, editor.get('editedValue')[0]);
            Y.Assert.areEqual(1, editor.get('editedValue')[1]);
        },

        'should get edited value from the ui': function() {
            var editor = new Y.ScaleDataEditor({
                originalValue: [0, 1]
            });

            editor.get('node').all('input').item(0).set('value', 2);
            editor.get('node').all('input').item(1).set('value', 3);
            Y.Assert.areEqual(2, editor.get('editedValue')[0]);
            Y.Assert.areEqual(3, editor.get('editedValue')[1]);
        },

        'should set label': function() {
            var editor = new Y.ScaleDataEditor({
                label: 'My Label'
            });

            Y.Assert.areEqual('My Label', editor.get('node').one('label').get('text'));

            editor.set('label', 'New Label');
            Y.Assert.areEqual('New Label', editor.get('node').one('label').get('text'));
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'aui-scale-data-editor' ] });
