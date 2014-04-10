YUI.add('aui-alert-tests', function(Y) {

    var Assert = Y.Assert,
        suite = new Y.Test.Suite('aui-alert'),
        alert = new Y.Alert({
            boundingBox: '.alert-error',
            srcNode: '.alert > div'
        }).render();

    suite.add(new Y.Test.Case({

        'should set attributes': function() {
            Assert.areEqual(alert.get('closeableNode'), Y.one('.close'));
        },

        'should hide when clicked on close button': function() {
            var closeNode = Y.one('.close');

            closeNode.simulate('click');

            closeNode.on('click', function() {
                Assert.isFalse(alert.get('visible'));
            });
        },

        'should destroy when clicked on close button and destroyOnHide as true': function() {
            var closeNode = Y.one('.close');

            alert.set('destroyOnHide', true);
            closeNode.simulate('click');

            closeNode.on('click', function() {
                Assert.isNull(Y.one('.alert-error'));
            });
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: [ 'test', 'aui-alert', 'node-screen', 'node-event-simulate' ]
});
