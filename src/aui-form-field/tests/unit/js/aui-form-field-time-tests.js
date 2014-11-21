YUI.add('aui-form-field-time-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-field-time');

    suite.add(new Y.Test.Case({
        name: 'Form Field Time Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should render time according to toggleInterval attribute': function() {
            var fieldNode;

            this._field = new Y.FormFieldTime();

            fieldNode = this._field.get('content');

            Y.Assert.isTrue(fieldNode.one('.form-field-time-to').hasClass('hide'));

            this._field.set('toggleInterval', true);
            Y.Assert.isFalse(fieldNode.one('.form-field-time-to').hasClass('hide'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {requires: ['aui-form-field-time', 'test']});
