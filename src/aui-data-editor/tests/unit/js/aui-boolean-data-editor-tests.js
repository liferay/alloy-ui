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
        },

        'should show content related to the checked state of the editor': function() {
            var editor,
                input;

            editor = new Y.BooleanDataEditor({
                checkedContent: 'Editor Checked',
                originalValue: 'original',
                uncheckedContent: Y.Node.create('<div class="unchecked">Editor Unchecked</div>')
            });
            input = editor.get('node').one('input');

            Y.Assert.areEqual('Editor Checked', editor.get('node').get('text'));

            input.set('checked', false);
            input.simulate('change');
            Y.Assert.areEqual('Editor Unchecked', editor.get('node').get('text'));
            Y.Assert.isNotNull(editor.get('node').one('.unchecked'));

            input.set('checked', true);
            input.simulate('change');
            Y.Assert.areEqual('Editor Checked', editor.get('node').get('text'));
        }
    }));

    Y.Test.Runner.add(suite);

},'', { requires: [ 'aui-boolean-data-editor', 'node-event-simulate' ] });
