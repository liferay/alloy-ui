YUI.add('aui-layout-builder-tests', function(Y) {

    var Assert = Y.Assert,
        container,
        Content,
        DRAG_HANDLE_CLASS = '.' + Y.getClassName('drag', 'handle'),
        LAYOUT_GRID_CLASS = '.' + Y.getClassName('layout', 'grid'),
        suite = new Y.Test.Suite('aui-layout-builder');

    Content = Y.Base.create('content', Y.Base, [], {}, {
        ATTRS: {
            content: {
                value: 'foo'
            }
        }
    });

    function moveDragHandle(node, moveTo) {
        var dragHandle;

        node.simulate('mouseover');
        dragHandle = node.one(DRAG_HANDLE_CLASS);
        dragHandle.simulate('mousedown', { clientX: dragHandle.get('offsetLeft') });
        container.simulate('mouseup', { clientX: moveTo });
    }

    suite.add(new Y.Test.Case({
        name: 'Layout Builder Tests',

        setUp: function() {
            this.layoutBuilder = new Y.LayoutBuilder({
                container: '.container',
                layout: new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                }),
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                }),
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                }),
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                }),
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                }),
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                }),
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                }),
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                }),
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                }),
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                }),
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                }),
                                new Y.LayoutCol({
                                    size: 1,
                                    value: new Content({ content: '1' })
                                })
                            ]
                        }),
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 6,
                                    value: new Content({ content: '6' })
                                }),
                                new Y.LayoutCol({
                                    size: 6,
                                    value: new Content({ content: '6' })
                                })
                            ]
                        }),
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 8,
                                    value: new Content({ content: '8' })
                                })
                            ]
                        }),
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    value: new Content({ content: '4' }),
                                    size: 4
                                }),
                                new Y.LayoutCol({
                                    value: new Content({ content: '4' }),
                                    size: 4
                                }),
                                new Y.LayoutCol({
                                    value: new Content({ content: '4' }),
                                    size: 4
                                })
                            ]
                        })
                    ]
                })
            });

            container = this.layoutBuilder.get('container');
        },

        tearDown: function() {
            this.layoutBuilder.destroy();
        },

        'should append drag handle on mouseenter': function() {
            var node = container.one('.col-md-1'),
                node2 = container.one('.col-md-4');

            Assert.isNull(node.one(DRAG_HANDLE_CLASS));
            // YUI doesn't simulate mouseenter event,
            // but we still can test using mouseover without problem.
            // We need to use this hack throughout the suite.
            node.simulate('mouseover');
            Assert.isNotNull(node.one(DRAG_HANDLE_CLASS));

            node2.simulate('mouseover');
            Assert.isNull(node.one(DRAG_HANDLE_CLASS));
        },

        'should insert layout grid on dragHandle\'s click': function() {
            var dragHandle,
                node = container.one('.col-md-4');

            node.simulate('mouseover');
            dragHandle = node.one(DRAG_HANDLE_CLASS);
            dragHandle.simulate('mousedown');

            Assert.isNotNull(node.one(LAYOUT_GRID_CLASS));
        },

        'should not decrease the element\'s width if it has 1 column width': function() {
            var firstNode,
                nodes = container.all('.col-md-1');

            firstNode = nodes.first();

            Assert.areEqual(12, nodes.size());

            moveDragHandle(firstNode, 0);
            nodes = container.all('.col-md-1');

            Assert.areEqual(12, nodes.size());
        },

        'should decrease element\'s width if it\'s width is higher than 1 column': function() {
            var lastNode,
                nodes = container.all('.col-md-4');

            lastNode = nodes.last();

            Assert.areEqual(3, nodes.size());
            moveDragHandle(lastNode, 0);

            nodes = container.all('.col-md-4');
            Assert.areEqual(2, nodes.size());
        },

        'should increase element\'s width if it has space to move': function() {
            var node = container.one('.col-md-8');

            Assert.isNotNull(node);
            moveDragHandle(node, container.get('offsetWidth'));

            Assert.isNotNull(container.one('.col-md-12'));
        },

        'should not increase the element\'s width if it hasn\'t space to move': function() {
            var firstNode,
                nodes = container.all('.col-md-6');

            firstNode = nodes.first();
            Assert.areEqual(2, nodes.size());

            moveDragHandle(firstNode, container.get('offsetWidth'));

            nodes = container.all('.col-md-6');
            Assert.areEqual(2, nodes.size());
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout-builder', 'aui-classnamemanager', 'node-event-simulate']
});
