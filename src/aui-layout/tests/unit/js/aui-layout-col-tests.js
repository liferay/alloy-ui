YUI.add('aui-layout-col-tests', function(Y) {

    var Assert = Y.Assert,
        suite = new Y.Test.Suite('aui-layout-col');

    suite.add(new Y.Test.Case({
        name: 'Layout Col Tests',

        setUp: function() {
            this.layoutCol = new Y.LayoutCol({
                size: 4,
                value: { content: 'foo' }
            });
        },

        tearDown: function() {
            this.layoutCol.destroy();
        },

        'should add bootstrap class according to it\'s size': function() {
            var colTemplate = this.layoutCol.getContent(),
                colSize = this.layoutCol.get('size');

            Assert.isTrue(colTemplate.hasClass('col-sm-' + colSize));
        },

        'should set value using an instance of Base': function() {
            var colTemplate = this.layoutCol.getContent();

            Assert.areEqual('foo', colTemplate.text());
        },

        'should set maximum size if it\'s size is higher than the maximum': function() {
            var layoutCol = new Y.LayoutCol({
                    size: 20
                });

            Assert.areEqual(12, layoutCol.get('size'));
        },

        'should set minimum size if size is not passed through constructor': function() {
            var layoutCol = new Y.LayoutCol();

            Assert.areEqual(3, layoutCol.get('size'));
        },

        'should set value using a regular object': function() {
            var colTemplate,
                Content = Y.Base.create('content', Y.Base, [], {}, {
                    ATTRS: {
                        content: {
                            value: 'foo'
                        }
                    }
                }),
                layoutCol = new Y.LayoutCol({
                    size: 2,
                    value: new Content()
                });

            colTemplate = layoutCol.getContent();

            Assert.areEqual('foo', colTemplate.text());
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['test', 'aui-layout-col']
});
