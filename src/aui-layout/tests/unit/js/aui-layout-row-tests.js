YUI.add('aui-layout-row-tests', function(Y) {

    var Assert = Y.Assert,
        suite = new Y.Test.Suite('aui-layout-row');

    suite.add(new Y.Test.Case({
        name: 'Layout Row Tests',

        setUp: function() {
            this.layoutRow = new Y.LayoutRow({
                cols: [
                    new Y.LayoutCol({
                        value: { value: 'foo' },
                        size: 4
                    }),
                    new Y.LayoutCol({
                        value: { value: 'foo' },
                        size: 2
                    }),
                    new Y.LayoutCol({
                        value: { value: 'foo' },
                        size: 2
                    }),
                    new Y.LayoutCol({
                        value: { value: 'foo' },
                        size: 4
                    })
                ]
            });
        },

        tearDown: function() {
            this.layoutRow.destroy();
        },

        'should have class row after renders': function() {
            var row = this.layoutRow.getContent();

            Assert.isTrue(row.hasClass('row'));
        },

        'should have 4 children after renders': function() {
            var row = this.layoutRow.getContent(),
                childNumber = row.get('children').size();

            Assert.areEqual(4, childNumber);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout-row', 'aui-layout-col']
});
