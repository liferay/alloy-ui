YUI.add('aui-scrollspy-tests', function(Y) {

    var Assert = Y.Assert,
        suite = new Y.Test.Suite('aui-scrollspy'),
        spy;

    function checkActiveLink(id) {
        var target = spy.get('target'),
            activeLink = target.one('.active'),
            activeAnchor = activeLink.one('a');

        Assert.isNotNull(activeLink);
        Assert.areEqual(activeAnchor.getAttribute('href'), id);
    }

    suite.add(new Y.Test.Case({
        name: 'Scrollspy',

        setUp: function() {
            spy = new Y.Scrollspy({
                scrollNode: '#scrollNode',
                target: '#navbar'
            });
        },

        tearDown: function() {
            spy.destructor();
            spy = null;
        },

        'should set attributes': function() {
            Assert.areEqual(spy.get('scrollNode'), Y.one('#scrollNode'));
            Assert.areEqual(spy.get('target'), Y.one('#navbar'));
            Assert.areEqual(spy.get('offset'), 10);
            spy.set('offset', 15);
            Assert.areEqual(spy.get('offset'), 15);
            Assert.areEqual(spy.get('activeGroup'), 'li, .dropdown');
        },

        'should clear cached links': function() {
            Assert.isNotNull(spy.cachedLinks);
            spy.clearCachedLinks();
            Assert.isNull(spy.cachedLinks);
        },

        'first link should be active': function() {
            checkActiveLink('#fat');
        },

        'should change the active link on scrolling': function() {
            checkActiveLink('#fat');
            spy.get('scrollNode').set('scrollTop', 150);

            spy.on('activate', function() {
                checkActiveLink('#mdo');
            });
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-scrollspy']
});
