YUI.add('aui-affix-tests', function(Y) {

    var Assert = Y.Assert,
        suite = new Y.Test.Suite('aui-affix'),
        affix,
        target = Y.one('#navbar');

    function targetShouldHaveClassName(className) {
        Assert.isTrue(target.hasClass(className));
    }

    suite.add(new Y.Test.Case({
        name: 'Affix',

        setUp: function() {
            affix = new Y.Affix({
                target: target,
                offsetTop: 300,
                offsetBottom: 500
            });
        },

        tearDown: function() {
            affix.destructor();
            affix = null;
            target.removeClass(Y.Affix.CSS_CLASSES_BOTTOM);
            target.removeClass(Y.Affix.CSS_CLASSES_DEFAULT);
            target.removeClass(Y.Affix.CSS_CLASSES_TOP);
        },

        'should set attributes': function() {
            Assert.areEqual(affix.get('offsetBottom'), 500);
            Assert.areEqual(affix.get('offsetTop'), 300);
            Assert.areEqual(affix.get('target'), target);
        },

        'should be at the top of the doc': function() {
            window.scrollTo(0, 0);
            this.wait(function() {
                targetShouldHaveClassName(Y.Affix.CSS_CLASSES.TOP);
            }, 500);
        },

        'should not fire the positioning events when unnecessary': function() {
            var called = false;

            window.scrollTo(0, 0);
            affix.on(Y.Affix.EVENTS.TOP, function() {
                called = true;
            });

            window.scrollTo(0, 1);
            this.wait(function() {
                Assert.isFalse(called);
            }, 500);
        },

        'should be at the top of the doc and have no offsetTop': function() {
            affix.set('offsetTop', Number.NEGATIVE_INFINITY);
            window.scrollTo(0, 0);
            this.wait(function() {
                targetShouldHaveClassName(Y.Affix.CSS_CLASSES.DEFAULT);
            }, 500);
        },

        'should be at the end of the doc and have no offsetBottom': function() {
            affix.set('offsetBottom', Number.NEGATIVE_INFINITY);
            window.scrollTo(0, Y.DOM.docHeight());
            this.wait(function() {
                targetShouldHaveClassName(Y.Affix.CSS_CLASSES.DEFAULT);
            }, 500);
        },

        'should be at the middle of the doc': function() {
            window.scrollTo(0, affix.get('offsetTop') + 1);
            this.wait(function() {
                targetShouldHaveClassName(Y.Affix.CSS_CLASSES.DEFAULT);
            }, 500);
        },

        'should be at the bottom of the doc': function() {
            window.scrollTo(0, Y.DOM.docHeight());
            this.wait(function() {
                targetShouldHaveClassName(Y.Affix.CSS_CLASSES.BOTTOM);
            }, 500);
        },

        'should validate offset with function': function() {
            affix.set('offsetBottom', function() {
                return 10;
            });
            Assert.areEqual(10, affix.get('offsetBottom'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-affix', 'node-screen']
});
