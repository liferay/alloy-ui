YUI.add('aui-boolean-data-editor-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-boolean-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI Boolean Data Editor Unit Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createBooleanDataEditor({
                originalValue: 'original',
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

        'should set valid content to checkedContent': function () {
            var editor = this._booleanDataEditor;

            editor.set('checkedContent', 'Editor Checked');
            Y.Assert.areEqual('Editor Checked', editor.get('node').get('text'));

            editor.set('checkedContent', Y.Node.create('<label>Editor Checked</label>'));
            Y.Assert.areEqual('Editor Checked', editor.get('node').get('text'));

            editor.set('checkedContent', 42);
            Y.Assert.areEqual('Editor Checked', editor.get('node').get('text'));

        },

        'should set valid content to uncheckedContent': function () {
            var editor = this._booleanDataEditor;

            Y.one('.button-switch').simulate('click');

            editor.set('uncheckedContent', Y.Node.create('Editor Unchecked'));
            Y.Assert.areEqual('Editor Unchecked', editor.get('node').get('text'));

            editor.set('uncheckedContent', '<label>Editor Unchecked</label>');
            Y.Assert.areEqual('Editor Unchecked', editor.get('node').get('text'));

            editor.set('uncheckedContent', 42);
            Y.Assert.areEqual('Editor Unchecked', editor.get('node').get('text'));
        },

        'should set original value on the ui': function() {
            var editor = this._booleanDataEditor;

            editor.set('originalValue', false);
            Y.Assert.isTrue(editor.get('node').one('.button-switch-inner-label-left').hasClass('hide'));
            Y.Assert.isFalse(editor.get('node').one('.button-switch-inner-label-right').hasClass('hide'));
            Y.Assert.isFalse(editor.get('editedValue'));

            editor.set('originalValue', true);
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
            Y.Assert.areEqual('Editor Checked', editor.get('node').get('text'));

            button.simulate('click');
            Y.Assert.areEqual('Editor Unchecked', editor.get('node').get('text'));

            button.simulate('click');
            Y.Assert.areEqual('Editor Checked', editor.get('node').get('text'));
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
