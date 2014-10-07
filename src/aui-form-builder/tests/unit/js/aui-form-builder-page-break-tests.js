YUI.add('aui-form-builder-page-break-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-page-break');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Page Break Tests',

        'should render index': function() {
            var col = new Y.FormBuilderPageBreak({
                index: 10
            });

            Y.Assert.areEqual('10', col.get('content').one('.form-builder-page-break-index').get('text'));
        },

        'should update index': function() {
            var col = new Y.FormBuilderPageBreak({
                index: 10
            });
            col.set('index', 20);

            Y.Assert.areEqual('20', col.get('content').one('.form-builder-page-break-index').get('text'));
        },

        'should render quantity': function() {
            var col = new Y.FormBuilderPageBreak({
                quantity: 10
            });

            Y.Assert.areEqual('10', col.get('content').one('.form-builder-page-break-quantity').get('text'));
        },

        'should update quantity': function() {
            var col = new Y.FormBuilderPageBreak({
                quantity: 10
            });
            col.set('quantity', 20);

            Y.Assert.areEqual('20', col.get('content').one('.form-builder-page-break-quantity').get('text'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-page-break', 'test']
});
