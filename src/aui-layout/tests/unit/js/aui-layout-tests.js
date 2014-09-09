YUI.add('aui-layout-tests', function(Y) {

    var Assert = Y.Assert,
        CONTAINER_CLASS = '.container',
        suite = new Y.Test.Suite('aui-layout');

    suite.add(new Y.Test.Case({
        name: 'Layout Tests',

        setUp: function() {
            this.layout = new Y.Layout({
                container: CONTAINER_CLASS,
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 1
                            })
                        ]
                    }),
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 6
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 6
                            })
                        ]
                    }),
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 8
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 4
                            })
                        ]
                    }),
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 4
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 4
                            }),
                            new Y.LayoutCol({
                                value: { value: 'foo' },
                                size: 4
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

            this.layout.draw();

            Assert.areEqual(4, container.get('children').size());
        }
    }));

    Y.Test.Runner.add(suite);

},'', {
    requires: [ 'test', 'aui-layout', 'aui-layout-col', 'aui-layout-row' ]
});
