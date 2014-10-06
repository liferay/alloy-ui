YUI.add('aui-layout-builder-resize-col-tests', function(Y) {

    var Assert = Y.Assert,
        container,
        Content,
        DRAG_HANDLE_CLASS = '.' + Y.getClassName('layout', 'drag', 'handle'),
        LAYOUT_GRID_CLASS = '.' + Y.getClassName('layout', 'grid'),
        layout,
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
        name: 'Layout Builder Resize Col Tests',

        setUp: function() {
            layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                value: new Content({ content: '3' }),
                                size: 3
                            }),
                            new Y.LayoutCol({
                                value: new Content({ content: '3' }),
                                size: 3
                            }),
                            new Y.LayoutCol({
                                value: new Content({ content: '3' }),
                                size: 3
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: new Content({ content: '3' })
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
                                size: 9,
                                value: new Content({ content: '9' })
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: new Content({ content: '3' })
                            })
                        ]
                    }),
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 8,
                                value: new Content({ content: '8' })
                            }),
                            new Y.LayoutCol({
                                size: 4,
                                value: new Content({ content: '4' })
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
                    }),
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                value: new Content({ content: '3' }),
                                size: 3
                            }),
                            new Y.LayoutCol({
                                value: new Content({ content: '3' }),
                                size: 3
                            }),
                            new Y.LayoutCol({
                                value: new Content({ content: '6' }),
                                size: 6
                            })
                        ]
                    })
                ]
            });

            this.layoutBuilder = new Y.LayoutBuilder({
                container: Y.one('.container'),
                layout: layout
            });

            container = this.layoutBuilder.get('container');
        },

        tearDown: function() {
            this.layoutBuilder.destroy();
        },

        'should append drag handle on mouseenter if col has next sibling': function() {
            var node = container.one('.col-sm-8');

            Assert.isNull(node.one(DRAG_HANDLE_CLASS));
            // YUI doesn't simulate mouseenter event,
            // but we still can test using mouseover without problem.
            // We need to use this hack throughout the suite.
            node.simulate('mouseover');
            Assert.isNotNull(node.one(DRAG_HANDLE_CLASS));

            node.simulate('mouseout');
            Assert.isNull(node.one(DRAG_HANDLE_CLASS));
        },

        'should not append drag handle on mouseenter if col is the last in a row': function() {
            var node = container.one('.col-sm-4');

            Assert.isNull(node.one(DRAG_HANDLE_CLASS));
            node.simulate('mouseover');
            Assert.isNull(node.one(DRAG_HANDLE_CLASS));
        },

        'should lock drag handle when click on it': function() {
            var nodes = container.all('.col-sm-4')._nodes,
                node = Y.one(nodes[1]),
                node2 = Y.one(nodes[2]);

            node.simulate('mouseover');
            node.one(DRAG_HANDLE_CLASS).simulate('mousedown');

            Assert.isTrue(this.layoutBuilder.isDragHandleLocked);

            node2.simulate('mouseover');
            Assert.isNull(node2.one(DRAG_HANDLE_CLASS));
        },

        'should move drag handle through the row': function() {
            var body = Y.one('body'),
                colWidth,
                dragHandle,
                node = Y.one('.col-sm-8');

            node.simulate('mouseover');
            colWidth = node.get('offsetWidth');
            dragHandle = node.one(DRAG_HANDLE_CLASS);

            Assert.areEqual(dragHandle.getStyle('right'), '0px');

            dragHandle.simulate('mousedown');

            body.simulate('mousemove', { clientX: -200 });
            Assert.areEqual(dragHandle.getStyle('right'), 200 - dragHandle.get('offsetWidth') + 'px');

            body.simulate('mousemove', { clientX: -1000 });
            Assert.areEqual(dragHandle.getStyle('right'), colWidth - dragHandle.get('offsetWidth') + 'px');
        },

        'should insert layout grid on dragHandle\'s click': function() {
            var dragHandle,
                node = container.one('.col-sm-8');

            node.simulate('mouseover');
            dragHandle = node.one(DRAG_HANDLE_CLASS);

            dragHandle.simulate('mousedown');

            Assert.isNotNull(node.ancestor().one(LAYOUT_GRID_CLASS));
        },

        'should not decrease the element\'s width if it already has a minimum width': function() {
            var firstNode,
                nodes = container.all('.col-sm-3');

            firstNode = nodes.last();

            Assert.areEqual(7, nodes.size());

            moveDragHandle(firstNode, 0);
            nodes = container.all('.col-sm-3');

            Assert.areEqual(7, nodes.size());
        },

        'should decrease element\'s width if it\'s width is higher than the minimum size': function() {
            var node = container.one('.col-sm-8');

            Assert.isNotNull(node);
            moveDragHandle(node, 300);

            node = container.one('.col-sm-8');
            Assert.isNull(node);
        },

        'should not decrease element\'s width if it doesn\'s hit a breakpoint': function() {
            var node = container.one('.col-sm-8');

            Assert.isNotNull(node);
            moveDragHandle(node, 750);

            node = container.one('.col-sm-8');
            Assert.isNotNull(node);
        },

        'should increase element\'s width if it has space to move': function() {
            var node = container.one('.col-sm-8');

            Assert.isNotNull(node);
            moveDragHandle(node, container.get('offsetWidth'));

            Assert.isNotNull(container.one('.col-sm-9'));
        },

        'should not increase the element\'s width if it hasn\'t space to move': function() {
            var node = container.one('.col-sm-9');

            Assert.isNotNull(node);

            moveDragHandle(node, container.get('offsetWidth'));

            node = container.one('.col-sm-9');
            Assert.isNotNull(node);
        },

        'should not increase element\'s width if it doesn\'s hit a breakpoint': function() {
            var node = container.all('.col-sm-3').last();

            moveDragHandle(node, 300);

            Assert.isTrue(node.hasClass('col-sm-3'));
        },

        'should not append dragHandle if row alreay has the maximum number of cols': function() {
            var col = Y.one('.col-sm-3');

            col.simulate('mouseover');

            Assert.isNull(col.one(DRAG_HANDLE_CLASS));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-layout-builder', 'node-event-simulate', 'test']
});
