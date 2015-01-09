YUI.add('aui-form-field-text-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-field-text');

    suite.add(new Y.Test.Case({
        name: 'Form Field Text Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should render input according to type attribute': function() {
            var fieldNode;

            this._field = new Y.FormFieldText();
            fieldNode = this._field.get('content');

            Y.Assert.isNotNull(fieldNode.one('input[type="text"]'));
            Y.Assert.isNull(fieldNode.one('textarea'));

            this._field.set('type', 1);
            Y.Assert.isNull(fieldNode.one('input[type="text"]'));
            Y.Assert.isNotNull(fieldNode.one('textarea'));
        },

        'should render a placeholder on text input according to placeholder attribute': function() {
            var fieldNode;

            this._field = new Y.FormFieldText();
            fieldNode = this._field.get('content');

            Y.Assert.areEqual(fieldNode.one('input[type="text"]').getAttribute('placeholder'), '');

            this._field.set('placeholder', 'Blob');
            Y.Assert.areEqual(fieldNode.one('input[type="text"]').getAttribute('placeholder'), 'Blob');

            this._field.set('type', 1);
            Y.Assert.areEqual(fieldNode.one('textarea').getAttribute('placeholder'), 'Blob');
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {requires: ['aui-form-field-text', 'test']});
