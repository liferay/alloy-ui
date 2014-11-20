YUI.add('aui-form-field-list-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-field-list');

    suite.add(new Y.Test.Case({
        name: 'Form Field List Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should render the list content': function() {
            var fieldNode;

            this._field = new Y.FormFieldList();
            fieldNode = this._field.get('content');

            Y.Assert.isNotNull(fieldNode.one('.form-field-list-content'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {requires: ['aui-form-field-list', 'test']});
