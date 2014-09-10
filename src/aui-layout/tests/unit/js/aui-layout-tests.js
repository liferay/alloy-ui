YUI.add('aui-layout-tests', function(Y) {

    var Assert = Y.Assert,
        CONTAINER_CLASS = '.container',
        suite = new Y.Test.Suite('aui-layout');

    suite.add(new Y.Test.Case({
        name: 'Layout Tests',

        setUp: function() {
            var Content = Y.Base.create('content', Y.Base, [], {}, {
                ATTRS: {
                    content: {
                        value: 'foo'
                    }
                }
            });

            this.layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            }),
                            new Y.LayoutCol({
                                size: 1,
                                value: new Content()
                            })
                        ]
                    }),
                    new Y.LayoutRow({
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
                    }),
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
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout', 'aui-layout-col', 'aui-layout-row']
});
