YUI.add('aui-form-field-grid-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-field-grid');

    suite.add(new Y.Test.Case({
        name: 'Form Field Choice Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should render columns and rows according to columns and rows attributes': function() {
            var fieldNode;

            this._field = new Y.FormFieldGrid();
            this._field.set('columns', ['A', 'B', 'C']);
            this._field.set('rows', ['1', '2', '3']);
            fieldNode = this._field.get('content');

            Y.Assert.areEqual(fieldNode.all('.form-field-grid-columns').item(0).all('th').item(1).get('text'), 'A');
            Y.Assert.areEqual(fieldNode.all('.form-field-grid-columns').item(0).all('th').item(2).get('text'), 'B');

            Y.Assert.areEqual(fieldNode.all('.form-field-grid-row').item(0).all('th').item(0).get('text'), '1');
            Y.Assert.areEqual(fieldNode.all('.form-field-grid-row').item(1).all('th').item(0).get('text'), '2');
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {requires: ['aui-form-field-grid', 'test']});
