YUI.add('aui-form-field-scale-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-field-scale');

    suite.add(new Y.Test.Case({
        name: 'Form Field Scale Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should render input according to range attribute': function() {
            var fieldNode;

            this._field = new Y.FormFieldScale();
            this._field.set('range', [2, 11]);

            fieldNode = this._field.get('content');

            Y.Assert.areEqual(fieldNode.one('.form-field-scale-input-lower-value').get('text'), 2);
            Y.Assert.areEqual(fieldNode.one('.form-field-scale-input-higher-value').get('text'), 11);
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {requires: ['aui-form-field-scale', 'test']});
