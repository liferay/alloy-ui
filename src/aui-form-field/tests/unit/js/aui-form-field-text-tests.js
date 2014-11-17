YUI.add('aui-form-field-text-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-field-text');

    suite.add(new Y.Test.Case({
        name: 'Form Field Text Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should render input according to multiline attribute': function() {
            var fieldNode;

            this._field = new Y.FormFieldText();
            fieldNode = this._field.get('content');

            Y.Assert.isNotNull(fieldNode.one('input[type="text"]'));
            Y.Assert.isNull(fieldNode.one('textarea'));

            this._field.set('multiline', true);
            Y.Assert.isNull(fieldNode.one('input[type="text"]'));
            Y.Assert.isNotNull(fieldNode.one('textarea'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {requires: ['aui-form-field-text', 'test']});
