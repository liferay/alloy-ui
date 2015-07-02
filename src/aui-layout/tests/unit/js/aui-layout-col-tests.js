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
            var colTemplate = this.layoutCol.get('node'),
                colSize = this.layoutCol.get('size');

            Assert.isTrue(colTemplate.hasClass('col-md-' + colSize));

            this.layoutCol.set('size', 7);
            Assert.isFalse(colTemplate.hasClass('col-md-' + colSize));
            Assert.isTrue(colTemplate.hasClass('col-md-7'));
        },

        'should set value using an instance of Base': function() {
            var colTemplate = this.layoutCol.get('node');

            Assert.areEqual('foo', colTemplate.text());

            this.layoutCol.set('value', {content: 'bar'});
            Assert.areEqual('bar', colTemplate.text());
        },

        'should set maximum size if it\'s size is higher than the maximum': function() {
            var layoutCol = new Y.LayoutCol({
                    size: 20
                });

            Assert.areEqual(12, layoutCol.get('size'));
        },

        'should set minimum size if its size is lower than the minimum': function() {
            var layoutCol = new Y.LayoutCol({
                size: -1
            });

            Assert.areEqual(1, layoutCol.get('size'));
        },

        'should set minimum size if size is not passed through constructor': function() {
            var layoutCol = new Y.LayoutCol();

            Assert.areEqual(1, layoutCol.get('size'));
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
                layoutCol,
                value = new Content();

            layoutCol = new Y.LayoutCol({
                size: 2,
                value: value
            });
            colTemplate = layoutCol.get('node');

            Assert.areEqual('foo', colTemplate.text());

            value.set('content', 'bar');
            Assert.areEqual('bar', colTemplate.text());

            layoutCol.set('value', {content: 'foo'});
            Assert.areEqual('foo', colTemplate.text());

            value.set('content', 'bar');
            Assert.areEqual(
                'foo',
                colTemplate.text(),
                'Should not update when the old value changes'
            );
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['test', 'aui-layout-col'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
