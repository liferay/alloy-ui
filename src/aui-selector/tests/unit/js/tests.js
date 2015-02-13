YUI.add('aui-selector-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-selector');

    suite.add(new Y.Test.Case({
        name: 'Selector',

        'Hidden selector accounts for position: absolute and clip styles': function() {
            var node = Y.one('#nodeToHide');

            node.hideAccessible();

            Y.Assert.isTrue(node.test(':hidden'));

            node.showAccessible();

            Y.Assert.isFalse(node.test(':hidden'));

            node.setStyles({
                clip: 'rect(0 0 0 0)',
                position: 'absolute'
            });

            Y.Assert.isTrue(node.test(':hidden'));

            node.setStyles({
                clip: 'auto',
                position: 'static'
            });

            Y.Assert.isFalse(node.test(':hidden'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-selector', 'aui-node-accessible']
});
