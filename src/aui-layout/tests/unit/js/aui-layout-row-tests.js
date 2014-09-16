YUI.add('aui-layout-row-tests', function(Y) {

    var Assert = Y.Assert,
        col,
        suite = new Y.Test.Suite('aui-layout-row');

    suite.add(new Y.Test.Case({
        name: 'Layout Row Tests',

        setUp: function() {
            col = new Y.LayoutCol({
                size: 4,
                value: {content: 'foo'}
            });

            this.layoutRow = new Y.LayoutRow({
                cols: [
                    col,
                    new Y.LayoutCol({
                        size: 2,
                        value: {content: 'foo'}
                    }),
                    new Y.LayoutCol({
                        size: 2,
                        value: {content: 'foo'}
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

        'should have 3 children after renders': function() {
            var row = this.layoutRow.getContent(),
                childNumber = row.get('children').size();

            Assert.areEqual(3, childNumber);
        },

        'should calculate it\'s size based on col\'s size': function() {
            var rowSize = this.layoutRow.getSize();

            Assert.areEqual(8, rowSize);
        },

        'should add a col': function() {
            var childNumber,
                row = this.layoutRow;

            childNumber = row.get('cols').length;
            Assert.areEqual(3, childNumber);

            row.addCol(0);
            childNumber = row.get('cols').length;

            Assert.areEqual(4, childNumber);
        },

        'should add a col passing a reference': function() {
            var childNumber,
                row = this.layoutRow;

            childNumber = row.get('cols').length;
            Assert.areEqual(3, childNumber);

            row.addCol(0, col);
            childNumber = row.get('cols').length;

            Assert.areEqual(4, childNumber);
        },

        'should remove a col by index': function() {
            var childNumber,
                row = this.layoutRow;

            childNumber = row.get('cols').length;
            Assert.areEqual(3, childNumber);

            row.removeCol(0);
            childNumber = row.get('cols').length;

            Assert.areEqual(2, childNumber);
        },

        'should remove a col by reference': function() {
            var childNumber,
                row = this.layoutRow;

            childNumber = row.get('cols').length;
            Assert.areEqual(3, childNumber);

            row.removeCol(col);
            childNumber = row.get('cols').length;

            Assert.areEqual(2, childNumber);
        },

        'should not remove a col that is not in a row': function() {
            var childNumber,
                col = new Y.LayoutCol({
                        size: 2,
                        value: {content: 'foo'}
                    }),
                row = this.layoutRow;

            childNumber = row.get('cols').length;
            Assert.areEqual(3, childNumber);

            row.removeCol(col);
            childNumber = row.get('cols').length;

            Assert.areEqual(3, childNumber);
        },

        'should not remove a col if nor an index nor a valid col is passed': function() {
            var childNumber,
                row = this.layoutRow;

            childNumber = row.get('cols').length;
            Assert.areEqual(3, childNumber);

            row.removeCol();
            childNumber = row.get('cols').length;

            Assert.areEqual(3, childNumber);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'array-invoke', 'aui-layout-row', 'aui-layout-col']
});
