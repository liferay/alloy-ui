YUI.add('aui-form-builder-layout-col-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-layout-col');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Layout Col Tests',

        'should have default content node': function() {
            var col = new Y.FormBuilderLayoutCol();

            Y.Assert.isTrue(col.get('content').hasClass('form-builder-layout-col'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-layout-col', 'test']
});