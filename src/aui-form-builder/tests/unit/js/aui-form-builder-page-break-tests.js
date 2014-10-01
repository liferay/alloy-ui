YUI.add('aui-form-builder-page-break-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-page-break');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Page Break Tests',

        'should render label': function() {
            var col = new Y.FormBuilderPageBreak({
                label: 'My Label'
            });

            Y.Assert.areEqual('My Label', col.get('content').get('text'));
        },

        'should update label': function() {
            var col = new Y.FormBuilderPageBreak({
                label: 'My Label'
            });
            col.set('label', 'My Other Label');

            Y.Assert.areEqual('My Other Label', col.get('content').get('text'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-page-break', 'test']
});
