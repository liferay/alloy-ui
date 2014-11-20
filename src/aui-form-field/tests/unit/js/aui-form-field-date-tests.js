YUI.add('aui-form-field-date-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-field-date');

    suite.add(new Y.Test.Case({
        name: 'Form Field Date Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should render date according to selected option': function() {
            var fieldNode;

            this._field = new Y.FormFieldDate();

            fieldNode = this._field.get('content');

            Y.Assert.isFalse(fieldNode.one('.form-field-date-from-date').hasClass('year'));
            Y.Assert.isTrue(fieldNode.one('.form-field-date-from-time').hasClass('hide'));

            Y.Assert.isNull(fieldNode.one('.form-field-date-to-enabled'));

            Y.Assert.isFalse(fieldNode.one('.form-field-date-to-date').hasClass('year'));
            Y.Assert.isTrue(fieldNode.one('.form-field-date-to-time').hasClass('hide'));

            this._field.set('yearToggleFrom', true);
            Y.Assert.isTrue(fieldNode.one('.form-field-date-from-date').hasClass('year'));

            this._field.set('timeToggleFrom', true);
            Y.Assert.isFalse(fieldNode.one('.form-field-date-from-time').hasClass('hide'));

            this._field.set('toggleInterval', true);
            Y.Assert.isNull(fieldNode.one('.form-field-date-to-enabled'));

            this._field.set('yearToggleTo', true);
            Y.Assert.isTrue(fieldNode.one('.form-field-date-to-date').hasClass('year'));

            this._field.set('timeToggleTo', true);
            Y.Assert.isNotNull(fieldNode.one('.form-field-date-to-time'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {requires: ['aui-form-field-date', 'test']});
