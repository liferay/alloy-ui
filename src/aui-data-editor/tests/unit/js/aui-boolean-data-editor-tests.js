YUI.add('aui-boolean-data-editor-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-boolean-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI Boolean Data Editor Unit Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createBooleanDataEditor({
                editedValue: true,
                originalValue: true,
                checkedContent: 'Editor Checked',
                uncheckedContent: 'Editor Unchecked'
            });
        },

        tearDown: function() {
            this._booleanDataEditor && this._booleanDataEditor.destroy();
        },

        createBooleanDataEditor: function(config) {
            var content = Y.Node.create('<div id="content"></div>');
            this._booleanDataEditor = new Y.BooleanDataEditor(config);

            content.append(this._booleanDataEditor.get('node'));
            this._container.append(content);
        },

        'should set the inner labels': function () {
            var editor = this._booleanDataEditor;

            Y.Assert.areEqual(editor.get('node').one('.button-switch-inner-label-left').getHTML(), '');
            Y.Assert.areEqual(editor.get('node').one('.button-switch-inner-label-right').getHTML(), '');

            editor.set('innerLabelLeft', 'left');
            editor.set('innerLabelRight', 'right');

            Y.Assert.areEqual(editor.get('node').one('.button-switch-inner-label-left').getHTML(), 'left');
            Y.Assert.areEqual(editor.get('node').one('.button-switch-inner-label-right').getHTML(), 'right');
        },

        'should update the ui according to the edited value': function() {
            var contentNode = this._booleanDataEditor.get('node').one('.boolean-data-editor-content');

            Y.Assert.areEqual('Editor Checked', contentNode.get('text'));
            this._booleanDataEditor.set('editedValue', false);
            Y.Assert.areEqual('Editor Unchecked', contentNode.get('text'));
            this._booleanDataEditor.set('editedValue', true);
            Y.Assert.areEqual('Editor Checked', contentNode.get('text'));
        },

        'should update the ui with checkedContent': function () {
            var checkedNode,
                contentNode = this._booleanDataEditor.get('node').one('.boolean-data-editor-content');

            this._booleanDataEditor.set('checkedContent', 'Editor Checked 2');
            Y.Assert.areEqual('Editor Checked 2', contentNode.get('text'));

            checkedNode = Y.Node.create('<label class="myClass">Node Content</label>');
            this._booleanDataEditor.set('checkedContent', checkedNode);
            Y.Assert.isNotNull(contentNode.one('.myClass'));
            Y.Assert.areEqual('Node Content', contentNode.get('text'));
        },

        'should not update the ui with checkedContent if editor is unchecked': function () {
            var contentNode = this._booleanDataEditor.get('node').one('.boolean-data-editor-content');

            this._booleanDataEditor.set('editedValue', false);
            this._booleanDataEditor.set('checkedContent', 'Editor Checked 2');

            Y.Assert.areEqual('Editor Unchecked', contentNode.get('text'));
        },

        'should not update the ui with invalid checkedContent': function () {
            var contentNode = this._booleanDataEditor.get('node').one('.boolean-data-editor-content');

            this._booleanDataEditor.set('checkedContent', 42);
            Y.Assert.areEqual('Editor Checked', contentNode.get('text'));
        },

        'should update the ui with uncheckedContent': function () {
            var contentNode = this._booleanDataEditor.get('node').one('.boolean-data-editor-content'),
                uncheckedNode;

            this._booleanDataEditor.set('editedValue', false);

            this._booleanDataEditor.set('uncheckedContent', Y.Node.create('Editor Unchecked 2'));
            Y.Assert.areEqual('Editor Unchecked 2', contentNode.get('text'));

            uncheckedNode = Y.Node.create('<label class="myClass">Node Content</label>');
            this._booleanDataEditor.set('uncheckedContent', uncheckedNode);
            Y.Assert.isNotNull(contentNode.one('.myClass'));
            Y.Assert.areEqual('Node Content', contentNode.get('text'));
        },

        'should not update the ui with uncheckedContent if editor is checked': function () {
            var contentNode = this._booleanDataEditor.get('node').one('.boolean-data-editor-content');

            this._booleanDataEditor.set('uncheckedContent', 'Editor Unchecked 2');

            Y.Assert.areEqual('Editor Checked', contentNode.get('text'));
        },

        'should not update the ui with invalid uncheckedContent': function () {
            var contentNode = this._booleanDataEditor.get('node').one('.boolean-data-editor-content');

            this._booleanDataEditor.set('editedValue', false);

            this._booleanDataEditor.set('uncheckedContent', 42);
            Y.Assert.areEqual('Editor Unchecked', contentNode.get('text'));
        },

        'should update the ui when the edited value is udpated': function() {
            var editor = this._booleanDataEditor;

            editor.set('editedValue', false);
            Y.Assert.isTrue(editor.get('node').one('.button-switch-inner-label-left').hasClass('hide'));
            Y.Assert.isFalse(editor.get('node').one('.button-switch-inner-label-right').hasClass('hide'));
            Y.Assert.isFalse(editor.get('editedValue'));

            editor.set('editedValue', true);
            Y.Assert.isFalse(editor.get('node').one('.button-switch-inner-label-left').hasClass('hide'));
            Y.Assert.isTrue(editor.get('node').one('.button-switch-inner-label-right').hasClass('hide'));
            Y.Assert.isTrue(editor.get('editedValue'));
        },

        'should get edited value from the ui': function() {
            var editor = this._booleanDataEditor,
                button;

            button = Y.one('.button-switch');

            button.simulate('click');
            Y.Assert.isFalse(editor.get('editedValue'));

            button.simulate('click');
            Y.Assert.isTrue(editor.get('editedValue'));
        },

        'should show content related to the checked state of the editor': function() {
            var editor = this._booleanDataEditor,
                button;

            editor.set('checkedContent', 'Editor Checked');
            editor.set('uncheckedContent', 'Editor Unchecked');

            button = Y.one('.button-switch');
            Y.Assert.areEqual('Editor Checked', editor.get('node').one('.boolean-data-editor-content').getHTML());

            button.simulate('click');
            Y.Assert.areEqual('Editor Unchecked', editor.get('node').one('.boolean-data-editor-content').getHTML());

            button.simulate('click');
            Y.Assert.areEqual('Editor Checked', editor.get('node').one('.boolean-data-editor-content').getHTML());
        },

        'should check if the form is valid': function() {
            var editor;

            editor = new Y.BooleanDataEditor();

            Y.Assert.isTrue(editor.isValid());

            editor.set('required', true);
            Y.Assert.isTrue(editor.isValid());
        }
    }));

    Y.Test.Runner.add(suite);

},'', { requires: [ 'aui-boolean-data-editor', 'node-event-simulate' ] });
