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

            Assert.areEqual(4, container.get('children').size());
        },

        'should add a row': function() {
            var container = Y.one(CONTAINER_CLASS);

            this.layout.draw(container);

            Assert.areEqual(4, container.get('children').size());

            this.layout.addRow(1);
            this.layout.draw(container);

            Assert.areEqual(5, container.get('children').size());
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

            Assert.areEqual(4, container.get('children').size());

            this.layout.addRow(1, row);
            this.layout.draw(container);

            Assert.areEqual(5, container.get('children').size());
        },

        'should remove a row by index': function() {
            var container = Y.one(CONTAINER_CLASS);

            this.layout.draw(container);

            Assert.areEqual(4, container.get('children').size());

            this.layout.removeRow(1);
            this.layout.draw(container);

            Assert.areEqual(3, container.get('children').size());
        },

        'should remove a row by reference': function() {
            var container = Y.one(CONTAINER_CLASS);

            this.layout.draw(container);

            Assert.areEqual(4, container.get('children').size());

            this.layout.removeRow(row);
            this.layout.draw(container);

            Assert.areEqual(3, container.get('children').size());
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

            Assert.areEqual(4, container.get('children').size());

            this.layout.removeRow(row);
            this.layout.draw(container);

            Assert.areEqual(4, container.get('children').size());
        },

        'should not remove a row if nor an index nor a valid row is passed': function() {
            var container = Y.one(CONTAINER_CLASS);

            this.layout.draw(container);

            Assert.areEqual(4, container.get('children').size());

            this.layout.removeRow();
            this.layout.draw(container);

            Assert.areEqual(4, container.get('children').size());
        },

        'should remove rows\' target when remove it from layout': function() {
            var row = this.layout.get('rows')[0];

            Assert.areEqual(row.getTargets().length, 1);

            this.layout.removeRow(0);

            Assert.areEqual(row.getTargets().length, 0);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout', 'aui-layout-col', 'aui-layout-row']
});
