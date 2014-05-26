YUI.add('aui-datatable-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-datatable');

    suite.add(new Y.Test.Case({
        name: 'Datatable',
        'test is empty': function() {
            Y.Assert.pass('No Tests Provided For This Module');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test']
});
