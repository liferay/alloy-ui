YUI.add('aui-layout-tests', function(Y) {

    var Assert = Y.Assert,
        CONTAINER_CLASS = '.container',
        Content,
        row,
        suite = new Y.Test.Suite('aui-layout');

    Content = Y.Base.create('content', Y.Base, [], {}, {
        ATTRS: {
            content: {
                value: 'foo'
            }
        }
    });

    suite.add(new Y.Test.Case({
        name: 'Layout Tests',

        setUp: function() {
            row = new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 6,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 6,
                                value: new Content()
                            })
                        ]
                    });

            this.layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 3,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: new Content()
                            })
                        ]
                    }),
                    row,
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 8,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 4,
                                value: new Content()
                            })
                        ]
                    }),
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 4,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 4,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 4,
                                value: new Content()
                            })
                        ]
                    })
                ]
            });
        },

        tearDown: function() {
            this.layout.destroy();
        },

        'should render rows and col inside container node': function() {
            var container = Y.one(CONTAINER_CLASS);

            Assert.areEqual(0, container.get('children').size());

            this.layout.draw(container);

            Assert.areEqual(4, container.all('.row').size());
        },

        'should add a row': function() {
            var container = Y.one(CONTAINER_CLASS);

            this.layout.draw(container);

            Assert.areEqual(4, container.all('.row').size());

            this.layout.addRow(1);
            this.layout.addRow();
            this.layout.draw(container);

            Assert.areEqual(6, container.all('.row').size());
        },

        'should add a row passing a row object as parameter': function() {
            var container = Y.one(CONTAINER_CLASS),
                row = new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 4,
                                value: { content: 'foo' }
                            })
                        ]
                    });

            this.layout.draw(container);

            Assert.areEqual(4, container.all('.row').size());

            this.layout.addRow(1, row);
            this.layout.draw(container);

            Assert.areEqual(5, container.all('.row').size());
        },

        'should add a row with the specified number of cols': function() {
            var container = Y.one(CONTAINER_CLASS);

            this.layout.draw(container);

            this.layout.addRowWithSpecifiedColNumber(4);
            Assert.areEqual(5, container.all('.row').size());
            Assert.areEqual(4, this.layout.get('rows')[4].get('cols').length);

            this.layout.addRowWithSpecifiedColNumber();
            Assert.areEqual(6, container.all('.row').size());
            Assert.areEqual(1, this.layout.get('rows')[5].get('cols').length);
        },

        'should remove a row by index': function() {
            var container = Y.one(CONTAINER_CLASS);

            this.layout.draw(container);

            Assert.areEqual(4, container.all('.row').size());

            this.layout.removeRow(1);
            this.layout.draw(container);

            Assert.areEqual(3, container.all('.row').size());
        },

        'should remove a row by reference': function() {
            var container = Y.one(CONTAINER_CLASS);

            this.layout.draw(container);

            Assert.areEqual(4, container.all('.row').size());

            this.layout.removeRow(row);
            this.layout.draw(container);

            Assert.areEqual(3, container.all('.row').size());
        },

        'should not remove a row that is not in layout': function() {
            var container = Y.one(CONTAINER_CLASS),
                row = new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            })
                        ]
                    });

            this.layout.draw(container);

            Assert.areEqual(4, container.all('.row').size());

            this.layout.removeRow(row);
            this.layout.draw(container);

            Assert.areEqual(4, container.all('.row').size());
        },

        'should not remove a row if nor an index nor a valid row is passed': function() {
            var container = Y.one(CONTAINER_CLASS);

            this.layout.draw(container);

            Assert.areEqual(4, container.all('.row').size());

            this.layout.removeRow();
            this.layout.draw(container);

            Assert.areEqual(4, container.all('.row').size());
        },

        'should be able to move a row': function() {
            var row,
                rows = this.layout.get('rows');

            row = rows[0];

            Assert.areEqual(0, rows.indexOf(row));

            this.layout.moveRow(1, row);

            rows = this.layout.get('rows');

            Assert.areEqual(1, rows.indexOf(row));

            this.layout.moveRow(0, row);

            rows = this.layout.get('rows');

            Assert.areEqual(0, rows.indexOf(row));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout', 'aui-layout-col', 'aui-layout-row']
});
