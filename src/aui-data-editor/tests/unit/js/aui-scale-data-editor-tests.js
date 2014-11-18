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
        },

        'should check if the form is valid': function() {
            var editor = new Y.ScaleDataEditor({
                originalValue: [0, 1]
            });

            Y.Assert.isTrue(editor.isValid());

            editor.set('required', true);
            editor.get('node').one('.scale-data-editor-lower-value').set('value', '');
            editor.get('node').one('.scale-data-editor-higher-value').set('value', '');
            Y.Assert.isFalse(editor.isValid());

            editor.get('node').one('.scale-data-editor-lower-value').set('value', 'II');
            editor.get('node').one('.scale-data-editor-higher-value').set('value', 'IX');
            Y.Assert.isFalse(editor.isValid());

            editor.get('node').one('.scale-data-editor-lower-value').set('value', 1985);
            editor.get('node').one('.scale-data-editor-higher-value').set('value', 1955);
            Y.Assert.isFalse(editor.isValid());

            editor.get('node').one('.scale-data-editor-lower-value').set('value', 'Mark1');
            editor.get('node').one('.scale-data-editor-higher-value').set('value', 'Mark8');
            Y.Assert.isFalse(editor.isValid());

            editor.get('node').one('.scale-data-editor-lower-value').set('value', '60°53');
            editor.get('node').one('.scale-data-editor-higher-value').set('value', '101°53');
            Y.Assert.isFalse(editor.isValid());

            editor.get('node').one('.scale-data-editor-lower-value').set('value', '1982');
            Y.Assert.isFalse(editor.isValid());

            editor.get('node').one('.scale-data-editor-higher-value').set('value', '1986');
            Y.Assert.isTrue(editor.isValid());

            editor.get('node').one('.scale-data-editor-lower-value').set('value', '-Infinity');
            editor.get('node').one('.scale-data-editor-higher-value').set('value', '+Infinity');
            Y.Assert.isTrue(editor.isValid());
        },

        'should the originalValue has at least 2 positions': function() {
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


},'', { requires: [ 'aui-scale-data-editor' ] });
