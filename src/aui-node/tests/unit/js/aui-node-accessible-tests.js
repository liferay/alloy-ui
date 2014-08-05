YUI.add('aui-node-accessible-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-node');

    //--------------------------------------------------------------------------
    // Test Case Node Accessible
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({
        name: 'Node Accessible',

        'toggle accessible': function() {
            var node = Y.Node.create('<div></div>');

            Y.one('body').append(node);

            node.toggleAccessible();

            Y.Assert.isTrue(node.hasClass('sr-only'));

            node.toggleAccessible();

            Y.Assert.isFalse(node.hasClass('sr-only'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-node-accessible']
});
