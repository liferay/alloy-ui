YUI.add('aui-layout-builder-tests', function(Y) {

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
        name: 'Layout Builder Tests',

        setUp: function() {
            layout = new Y.Layout({
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
            });

            this.layoutBuilder = new Y.LayoutBuilder({
                container: '.container',
                layout: layout
            });

            container = this.layoutBuilder.get('container');
        },

        tearDown: function() {
            this.layoutBuilder.destroy();
        },

        'should append drag handle on mouseenter': function() {
            var node = container.one('.col-sm-1');

            Assert.isNull(node.one(DRAG_HANDLE_CLASS));
            // YUI doesn't simulate mouseenter event,
            // but we still can test using mouseover without problem.
            // We need to use this hack throughout the suite.
            node.simulate('mouseover');
            Assert.isNotNull(node.one(DRAG_HANDLE_CLASS));

            node.simulate('mouseout');
            Assert.isNull(node.one(DRAG_HANDLE_CLASS));
        },

        'should lock drag handle when click on it': function() {
            var node = container.one('.col-sm-4'),
                node2 = container.one('.col-sm-8');

            node.simulate('mouseover');
            node.one(DRAG_HANDLE_CLASS).simulate('mousedown');

            Assert.isTrue(this.layoutBuilder.isDragHandleLocked);

            node2.simulate('mouseover');
            Assert.isNull(node2.one(DRAG_HANDLE_CLASS));
        },

        'should insert layout grid on dragHandle\'s click': function() {
            var dragHandle,
                node = container.one('.col-sm-4');

            node.simulate('mouseover');
            dragHandle = node.one(DRAG_HANDLE_CLASS);

            dragHandle.simulate('mousedown');

            Assert.isNotNull(node.one(LAYOUT_GRID_CLASS));
        },

        'should not decrease the element\'s width if it has 1 column width': function() {
            var firstNode,
                nodes = container.all('.col-sm-1');

            firstNode = nodes.first();

            Assert.areEqual(12, nodes.size());

            moveDragHandle(firstNode, 0);
            nodes = container.all('.col-sm-1');

            Assert.areEqual(12, nodes.size());
        },

        'should decrease element\'s width if it\'s width is higher than 1 column': function() {
            var lastNode,
                nodes = container.all('.col-sm-4');

            lastNode = nodes.last();

            Assert.areEqual(3, nodes.size());
            moveDragHandle(lastNode, 0);

            nodes = container.all('.col-sm-4');
            Assert.areEqual(2, nodes.size());
        },

        'should increase element\'s width if it has space to move': function() {
            var node = container.one('.col-sm-8');

            Assert.isNotNull(node);
            moveDragHandle(node, container.get('offsetWidth'));

            Assert.isNotNull(container.one('.col-sm-12'));
        },

        'should not increase the element\'s width if it hasn\'t space to move': function() {
            var firstNode,
                nodes = container.all('.col-sm-6');

            firstNode = nodes.first();
            Assert.areEqual(2, nodes.size());

            moveDragHandle(firstNode, container.get('offsetWidth'));

            nodes = container.all('.col-sm-6');
            Assert.areEqual(2, nodes.size());
        },

        'should redraw when set a new layout': function() {
            var newLayout = new Y.Layout({
                rows: [
                    new Y.LayoutRow()
                ]
            });

            Assert.areEqual(this.layoutBuilder.get('layout').get('rows').length, 4);

            this.layoutBuilder.set('layout', newLayout);

            Assert.areEqual(this.layoutBuilder.get('layout').get('rows').length, 1);
        },

        'should redraw when add a new col to a row': function() {
            var col,
                row = layout.get('rows')[1];

            col = new Y.LayoutCol({
                size: 1,
                value: { content: 'content' }
            });

            Assert.areEqual(row.get('cols').length, 2);

            row.addCol(1, col);

            Assert.areEqual(row.get('cols').length, 3);
        },

        'should redraw when remove a col from a row': function() {
            var row = layout.get('rows')[1];

            Assert.areEqual(row.get('cols').length, 2);

            row.removeCol(1);

            Assert.areEqual(row.get('cols').length, 1);
        },

        'should redraw when add a new row to layout': function() {
            Assert.areEqual(container.get('children').size(), 4);
            layout.addRow(4);
            Assert.areEqual(container.get('children').size(), 5);
        },

        'should redraw when remove a row from layout': function() {
            Assert.areEqual(container.get('children').size(), 4);
            layout.removeRow(1);
            Assert.areEqual(container.get('children').size(), 3);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout-builder', 'aui-classnamemanager', 'node-event-simulate']
});
