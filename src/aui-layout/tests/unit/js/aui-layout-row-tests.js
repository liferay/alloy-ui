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
                        size: 3,
                        value: { content: 'bar' }
                    }),
                    new Y.LayoutCol({
                        size: 5,
                        value: { content: 'baz' }
                    })
                ]
            });
        },

        tearDown: function() {
            this.layoutRow.destroy();
        },

        'should have class row after renders': function() {
            var row = this.layoutRow.get('node').one('.row');

            Assert.isTrue(row.hasClass('row'));
        },

        'should have 3 children after renders': function() {
            var row = this.layoutRow.get('node').one('.row'),
                childNumber = row.get('children').size();

            Assert.areEqual(3, childNumber);
        },

        'should update cols when they change': function() {
            this.layoutRow.set('cols', [
                new Y.LayoutCol({
                    size: 6
                }),
                new Y.LayoutCol({
                    size: 6
                })
            ]);

            Assert.areEqual(2, this.layoutRow.get('node').one('.row').get('children').size());
        },

        'should calculate it\'s size based on col\'s size': function() {
            var rowSize = this.layoutRow._getSize(this.layoutRow.get('cols'));

            Assert.areEqual(12, rowSize);
        },

        'should add a col to the bottom by default': function() {
            var childNumber,
                firstCol,
                row = this.layoutRow;

            childNumber = row.get('cols').length;
            Assert.areEqual(3, childNumber);

            firstCol = row.get('cols')[0];
            row.addCol();
            childNumber = row.get('cols').length;

            Assert.areEqual(4, childNumber);
            Assert.areSame(firstCol, row.get('cols')[0]);
        },

        'should add a col at specific position': function() {
            var childNumber,
                firstCol,
                row = this.layoutRow;

            childNumber = row.get('cols').length;
            Assert.areEqual(3, childNumber);

            firstCol = row.get('cols')[0];
            row.addCol(0);
            childNumber = row.get('cols').length;

            Assert.areEqual(4, childNumber);
            Assert.areNotSame(firstCol, row.get('cols')[0]);
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

        'should not add col if max is reached': function() {
            var currentColsSize = this.layoutRow.get('cols').length,
                maximumCols = this.layoutRow.get('maximumCols');

            for (var i = currentColsSize; i <= maximumCols; i++) {
                this.layoutRow.addCol();
            }

            Assert.areEqual(maximumCols, this.layoutRow.get('cols').length);
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
        },

        'should move a col': function() {
            var cols = this.layoutRow.get('cols'),
                row = this.layoutRow;

            Assert.areEqual('bar', cols[1].get('value').content);

            row.moveColContent(1, cols[0]);

            cols = this.layoutRow.get('cols');

            Assert.areEqual('foo', cols[1].get('value').content);
            Assert.isNull(cols[0].get('value'));
        },

        'should be possible to create a row without passing a col': function() {
            var row = new Y.LayoutRow();

            Assert.isNotNull(row);
        },

        'should set cols even if them doesn\'t sum up 12 of size': function() {
            var row = new Y.LayoutRow();
            row.set('cols', [new Y.LayoutCol({ size: 4 })]);

            Assert.areEqual(12, row._getSize(row.get('cols')));
        },

        'should not allow set cols if cols sum up more than 12 of size': function() {
            var row = new Y.LayoutRow();
            row.set('cols', [new Y.LayoutCol({ size: 12 }), new Y.LayoutCol({ size: 12 })]);

            Assert.areEqual(12, row._getSize(row.get('cols')));
        },

        'should set maximum cols of a row': function() {
            var layoutRow = new Y.LayoutRow({
                cols: [
                    new Y.LayoutCol({
                        size: 3,
                        value: { content: 'foo' }
                    }),
                    new Y.LayoutCol({
                        size: 5,
                        value: { content: 'foo' }
                    })
                ],
                maximumCols: 1
            });

            Assert.areEqual(1, layoutRow.get('cols').length);
        },

        'should be able to create a row with cols attribute being an array of plain objects instead of an array of LayoutCol': function() {
            var layoutRow = new Y.LayoutRow({
                    cols: [
                        {
                            size: 3,
                            value: { content: 'foo' }
                        },
                        {
                            size: 5,
                            value: { content: 'bar' }
                        },
                        {
                            size: 4,
                            value: { content: 'baz' }
                        }
                    ]
                });

            Assert.areEqual(3, layoutRow.get('cols').length);
            Assert.isTrue(Y.instanceOf(layoutRow.get('cols')[0], Y.LayoutCol));
            Assert.areEqual('foo', layoutRow.get('cols')[0].get('value').content);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'array-invoke', 'aui-layout-row', 'aui-layout-col'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
