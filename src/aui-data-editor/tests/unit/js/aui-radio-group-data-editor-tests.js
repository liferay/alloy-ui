YUI.add('aui-radio-group-data-editor-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-radio-group-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI RadioGroup Data Editor Unit Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createBooleanDataEditor({
                radioLabels: ['X', 'Y', 'Z']
            });
        },

        tearDown: function() {
            this._radioGroupDataEditor && this._radioGroupDataEditor.destroy();
            this._container.empty();
        },

        createBooleanDataEditor: function(config) {
            var content = Y.Node.create('<div id="content"></div>');
            this._radioGroupDataEditor = new Y.RadioGroupDataEditor(config);

            content.append(this._radioGroupDataEditor.get('node'));
            this._container.append(content);
        },

        'should set the inner labels': function () {
            var editor = this._radioGroupDataEditor,
                radioElement = editor.get('node').all('.radio-group-data-editor-element');

            Y.Assert.areEqual(radioElement.item(0).get('text'), 'X');
            Y.Assert.areEqual(radioElement.item(1).get('text'), 'Y');
            Y.Assert.areEqual(radioElement.item(2).get('text'), 'Z');

            editor.set('radioLabels', [0, 1, 2]);
            radioElement = editor.get('node').all('.radio-group-data-editor-element');

            Y.Assert.areEqual(radioElement.item(0).get('text'), 0);
            Y.Assert.areEqual(radioElement.item(1).get('text'), 1);
            Y.Assert.areEqual(radioElement.item(2).get('text'), 2);
        },

        'should set original value on the ui': function() {
            var editor = this._radioGroupDataEditor,
                buttonList = editor.get('node').all('.radio-group-data-editor-button');

            Y.Assert.isTrue(buttonList.item(0).get('checked'));
            Y.Assert.isFalse(buttonList.item(1).get('checked'));
            Y.Assert.isFalse(buttonList.item(2).get('checked'));
            Y.Assert.areEqual(editor.get('editedValue'), 0);

            editor.set('editedValue', 2);
            Y.Assert.isFalse(buttonList.item(0).get('checked'));
            Y.Assert.isFalse(buttonList.item(1).get('checked'));
            Y.Assert.isTrue(buttonList.item(2).get('checked'));
            Y.Assert.areEqual(editor.get('editedValue'), 2);
        },

        'should set edited value on clicked on radio button': function() {
            var editor = this._radioGroupDataEditor,
                buttonList = editor.get('node').all('.radio-group-data-editor-button');

            Y.Assert.isTrue(buttonList.item(0).get('checked'));
            Y.Assert.isFalse(buttonList.item(1).get('checked'));
            Y.Assert.isFalse(buttonList.item(2).get('checked'));
            Y.Assert.areEqual(editor.get('editedValue'), 0);

            buttonList.item(2).simulate('click');
            Y.Assert.isFalse(buttonList.item(0).get('checked'));
            Y.Assert.isFalse(buttonList.item(1).get('checked'));
            Y.Assert.isTrue(buttonList.item(2).get('checked'));
            Y.Assert.areEqual(editor.get('editedValue'), 2);
        },

        'should set valid content to editedValue': function() {
            var editor = this._radioGroupDataEditor,
                buttonList = editor.get('node').all('.radio-group-data-editor-button');

            editor.set('editedValue', 10);
            Y.Assert.isTrue(buttonList.item(0).get('checked'));
            Y.Assert.isFalse(buttonList.item(1).get('checked'));
            Y.Assert.isFalse(buttonList.item(2).get('checked'));

            editor.set('editedValue', 1);
            Y.Assert.isFalse(buttonList.item(0).get('checked'));
            Y.Assert.isTrue(buttonList.item(1).get('checked'));
            Y.Assert.isFalse(buttonList.item(2).get('checked'));

            editor.set('editedValue', 10);
            Y.Assert.isFalse(buttonList.item(0).get('checked'));
            Y.Assert.isTrue(buttonList.item(1).get('checked'));
            Y.Assert.isFalse(buttonList.item(2).get('checked'));
        },

        'should only update originalValue with valid values': function() {
            this._radioGroupDataEditor.set('originalValue', -1);
            Y.Assert.areEqual(0, this._radioGroupDataEditor.get('originalValue'));

            this._radioGroupDataEditor.set('originalValue', 11);
            Y.Assert.areEqual(0, this._radioGroupDataEditor.get('originalValue'));

            this._radioGroupDataEditor.set('originalValue', 2);
            Y.Assert.areEqual(2, this._radioGroupDataEditor.get('originalValue'));
        },

        'should set the inline attribute': function () {
            var editor = this._radioGroupDataEditor,
                radioElement = editor.get('node').all('.radio-group-data-editor-element'),
                radioContent = editor.get('node').one('.radio-group-data-editor-content');

            Y.Assert.isFalse(radioContent.hasClass('radio-group-data-editor-elements-inline'));
            Y.Assert.isFalse(radioElement.item(0).hasClass('radio-group-data-editor-inline'));
            Y.Assert.isFalse(radioElement.item(1).hasClass('radio-group-data-editor-inline'));
            Y.Assert.isFalse(radioElement.item(2).hasClass('radio-group-data-editor-inline'));

            editor.set('inline', true);

            Y.Assert.isTrue(radioContent.hasClass('radio-group-data-editor-elements-inline'));
            Y.Assert.isTrue(radioElement.item(0).hasClass('radio-group-data-editor-inline'));
            Y.Assert.isTrue(radioElement.item(1).hasClass('radio-group-data-editor-inline'));
            Y.Assert.isTrue(radioElement.item(2).hasClass('radio-group-data-editor-inline'));
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'aui-radio-group-data-editor', 'node-event-simulate' ] });
