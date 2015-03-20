YUI.add('aui-data-editor-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI Data Editor Unit Tests',

        _createTestEditorClass: function() {
            var setValueFn = function() {
                setValueFn.callCount++;
            };
            setValueFn.callCount = 0;

            var TestEditor = Y.Base.create('test-editor', Y.DataEditor, [], {
                _uiSetOriginalValue: setValueFn
            });

            return TestEditor;
        },

        'should check if the form is valid': function() {
            var editor,
                TestEditor = this._createTestEditorClass();

            editor = new TestEditor();

            Y.Assert.isTrue(editor.isValid());

            editor.set('required', true);
            Y.Assert.isTrue(editor.isValid());
        },

        'should remove node after editor is destroyed': function() {
            var editor,
                TestEditor = this._createTestEditorClass();

            editor = new TestEditor();

            editor.get('node').set('id', 'testEditor');
            Y.one('body').append(editor.get('node'));
            Y.Assert.isNotNull(Y.one('#testEditor'));

            editor.destroy();
            Y.Assert.isNull(Y.one('#testEditor'));
        },

        'should set label': function() {
            var editor,
                labelNode,
                TestEditor = this._createTestEditorClass();

            editor = new TestEditor({
                label: 'My Label'
            });
            labelNode = editor.get('node').one('label');

            Y.Assert.areNotEqual('none', labelNode.getStyle('display'));
            Y.Assert.areEqual('My Label', labelNode.get('text'));

            editor.set('label', 'New Label');
            Y.Assert.areNotEqual('none', labelNode.getStyle('display'));
            Y.Assert.areEqual('New Label', labelNode.get('text'));

            editor.set('label', '   ');
            Y.Assert.areEqual('none', labelNode.getStyle('display'));
        },

        'should show/hide editor when requested': function() {
            var editor,
                TestEditor = this._createTestEditorClass();

            editor = new TestEditor({
                label: 'My Label'
            });

            Y.Assert.areNotEqual('none', editor.get('node').getStyle('display'));

            editor.set('visible', false);
            Y.Assert.areEqual('none', editor.get('node').getStyle('display'));

            editor.set('visible', true);
            Y.Assert.areNotEqual('none', editor.get('node').getStyle('display'));
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'aui-data-editor' ] });
