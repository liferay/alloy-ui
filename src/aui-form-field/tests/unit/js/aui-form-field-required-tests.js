YUI.add('aui-form-field-required-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-field-required'),
        FormFieldTest;

    FormFieldTest = Y.Base.create('test-field', Y.FormField, [Y.FormFieldRequired]);

    suite.add(new Y.Test.Case({
        name: 'Form Field Required Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should add and remove an * on field title when required changes': function() {
            this._field = new FormFieldTest({
                title: 'Title'
            });

            Y.Assert.isNull(this._field.get('content').one('.form-field-required'));
            this._field.set('required', true);
            Y.Assert.isNotNull(this._field.get('content').one('.form-field-required'));
            this._field.set('required', false);
            Y.Assert.isNull(this._field.get('content').one('.form-field-required'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-field-required', 'test']
});