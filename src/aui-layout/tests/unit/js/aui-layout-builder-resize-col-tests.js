YUI.add('aui-layout-builder-resize-col-tests', function(Y) {

    var Assert = Y.Assert,
        Content,
        CSS_RESIZE_COL_BREAKPOINT = Y.getClassName('layout', 'builder', 'resize', 'col', 'breakpoint'),
        CSS_RESIZE_COL_DRAGGABLE = Y.getClassName('layout', 'builder', 'resize', 'col', 'draggable'),
        CSS_RESIZE_COL_DRAGGABLE_HANDLE = Y.getClassName('layout', 'builder', 'resize', 'col', 'draggable', 'handle'),
        suite = new Y.Test.Suite('aui-layout-builder-resize-col');

    Content = Y.Base.create('content', Y.Base, [], {}, {
        ATTRS: {
            content: {
                value: 'foo'
            }
        }
    });

    suite.add(new Y.Test.Case({
        name: 'Layout Builder Resize Col Tests',

        setUp: function() {
            this._layoutBuilder = new Y.LayoutBuilder({
                container: Y.one('.container'),
                layout: this._createTestLayout()
            });
        },

        tearDown: function() {
            this._layoutBuilder.destroy();
        },

        _should: {
            ignore: {
                'should normalize cols\' height after column resize': true
            }
        },

        /**
         * Creates a layout for testing.
         *
         * @method _createTestLayout
         * @protected
         */
        _createTestLayout: function() {
            return new Y.Layout({
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
        },

        /**
         * Returns the visible nodes that match the given selector inside a row.
         *
         * @method _getRowNodes
         * @param {Y.LayoutRow} row
         * @param {String} selector
         * @protected
         */
        _getVisibleRowNodes: function(row, selector) {
            var nodes = row.get('node').all(selector),
                visible = [];

            nodes.each(function(node) {
                if (node.getStyle('display') !== 'none') {
                    visible.push(node);
                }
            });

            return visible;
        },

        /**
         * Simulates dragging the given dragHandle.
         *
         * @param {Y.Test.Case} test
         * @param {Node} dragHandle
         * @param {Array} position
         * @param {Function} done
         * @protected
         */
        _simulateDrag: function(test, dragHandle, position, done) {
            var shim;

            dragHandle.simulate('mousedown');
            test.wait(function() {
                shim = Y.one('.yui3-dd-shim');

                if (position) {
                    if (Y.Lang.isFunction(position)) {
                        position = position();
                    }
                    shim.simulate('mousemove', {
                        clientX: position[0],
                        clientY: position[1]
                    });
                }

                dragHandle.simulate('mouseup');

                if (done) {
                    done();
                }
            }, Y.DD.DDM.get('clickTimeThresh') + 100);
        },

        /**
         * Simulates dragging the given dragHandle to the given breakpoint.
         *
         * @method _simulateDragToBreakpoint
         * @param {Y.Test.Case} test
         * @param {Node} dragHandle
         * @param {Node} breakpoint
         * @param {Function} done
         * @protected
         */
        _simulateDragToBreakpoint: function(test, dragHandle, breakpoint, done) {
            this._simulateDrag(test, dragHandle, function() {
                return [
                    breakpoint.get('region').left,
                    breakpoint.get('region').top
                ];
            }, done);
        },

        'should append drag handlers for all borders that can be dragged': function() {
            var rows = this._layoutBuilder.get('layout').get('rows');

            Assert.areEqual(5, this._getVisibleRowNodes(rows[0], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(3, this._getVisibleRowNodes(rows[1], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(3, this._getVisibleRowNodes(rows[2], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(3, this._getVisibleRowNodes(rows[3], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(4, this._getVisibleRowNodes(rows[4], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(4, this._getVisibleRowNodes(rows[5], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
        },

        'should update drag handles when a new layout is set': function() {
            var rows;

            this._layoutBuilder.set('layout', new Y.Layout({rows: [
                new Y.LayoutRow({
                    cols: [
                        new Y.LayoutCol({
                            value: { content: '9' },
                            size: 9
                        }),
                        new Y.LayoutCol({
                            value: { content: '3' },
                            size: 3
                        })
                    ]
                }),
                new Y.LayoutRow({
                    cols: [
                        new Y.LayoutCol({
                            value: { content: '3' },
                            size: 3
                        }),
                        new Y.LayoutCol({
                            value: { content: '6' },
                            size: 6
                        }),
                        new Y.LayoutCol({
                            value: { content: '3' },
                            size: 3
                        })
                    ]
                })
            ]}));
            rows = this._layoutBuilder.get('layout').get('rows');

            Assert.areEqual(3, this._getVisibleRowNodes(rows[0], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(4, this._getVisibleRowNodes(rows[1], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
        },

        'should update drag handles when they layout rows change': function() {
            var rows;

            this._layoutBuilder.get('layout').addRow(0, new Y.LayoutRow({
                cols: [
                    new Y.LayoutCol({
                        value: { content: '9' },
                        size: 9
                    }),
                    new Y.LayoutCol({
                        value: { content: '3' },
                        size: 3
                    })
                ]
            })),
            rows = this._layoutBuilder.get('layout').get('rows');

            Assert.areEqual(3, this._getVisibleRowNodes(rows[0], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
        },

        'should update drag handles when they layout cols change': function() {
            var row = this._layoutBuilder.get('layout').get('rows')[1];

            row.addCol(0, new Y.LayoutCol({
                value: { content: '1' },
                size: 1
            }));

            Assert.areEqual(4, this._getVisibleRowNodes(row, '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
        },

        'should insert layout grid on drag handle\'s click': function() {
            var breakpoints,
                dragHandle,
                row;

            // The second row has 2 columns with size 6 each.
            row = this._layoutBuilder.get('layout').get('rows')[1];
            dragHandle = row.get('node').all('.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).item(2);
            dragHandle.simulate('mousedown');

            breakpoints = this._getVisibleRowNodes(row, '.' + CSS_RESIZE_COL_BREAKPOINT);
            Y.Assert.areEqual(13, breakpoints.length);

            Y.Array.each(breakpoints, function(breakpoint, position) {
                Y.Assert.areEqual(position, breakpoint.getData('layout-position'));
            });

            // The fifth row has 3 columns with size 4 each.
            row = this._layoutBuilder.get('layout').get('rows')[4];
            dragHandle = row.get('node').all('.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).item(2);
            dragHandle.simulate('mousedown');

            breakpoints = this._getVisibleRowNodes(row, '.' + CSS_RESIZE_COL_BREAKPOINT);
            Y.Assert.areEqual(9, breakpoints.length);

            Y.Array.each(breakpoints, function(breakpoint, position) {
                Y.Assert.areEqual(position, breakpoint.getData('layout-position'));
            });
        },

        'should not insert layout grid for borders without handles': function() {
            var breakpoints,
                dragHandle,
                row = this._layoutBuilder.get('layout').get('rows')[0];

            dragHandle = row.get('node').one('.' + CSS_RESIZE_COL_DRAGGABLE);
            dragHandle.simulate('mousedown');

            breakpoints = this._getVisibleRowNodes(row, '.' + CSS_RESIZE_COL_BREAKPOINT);
            Y.Assert.areEqual(0, breakpoints.length);
        },

        'should have a number of handles consistent with the number of rows': function() {
            var dragHandles,
                firstRow,
                index = 0;

            firstRow = this._layoutBuilder.get('layout').get('rows')[0];

            while (firstRow.get('cols').length < firstRow.get('maximumCols')) {
                    firstRow.addCol(index, new Y.LayoutCol({
                    value: { content: '' },
                    removable: false,
                    size: 1
                }));

                index++;
            }

            dragHandles = firstRow.get('node').all('.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE + ':not(.hide)');
            Assert.areEqual(11, dragHandles.size());
        },

        'should resize columns when dropping handle on breakpoint': function() {
            var breakpoint,
                dragHandle,
                dragNode,
                row = this._layoutBuilder.get('layout').get('rows')[1];

            dragHandle = row.get('node').all('.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).item(2);
            breakpoint = row.get('node').all('.' + CSS_RESIZE_COL_BREAKPOINT).item(3);

            this._simulateDragToBreakpoint(this, dragHandle, breakpoint, function() {
                dragNode = row.get('node').all('.' + CSS_RESIZE_COL_DRAGGABLE).item(2);
                breakpoint = row.get('node').one('.' + CSS_RESIZE_COL_BREAKPOINT);
                Y.Assert.areEqual(3, dragNode.getData('layout-position'));
                Y.Assert.areEqual(3, row.get('cols')[0].get('size'));
                Y.Assert.areEqual(9, row.get('cols')[1].get('size'));
            });
        },

        'should not resize column if handle doesn\'t hit a breakpoint': function() {
            var dragHandle,
                row = this._layoutBuilder.get('layout').get('rows')[1];

            dragHandle = row.get('node').all('.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).item(2);

            this._simulateDrag(this, dragHandle, [1000, 10], function() {
                Y.Assert.areEqual(6, row.get('cols')[0].get('size'));
                Y.Assert.areEqual(6, row.get('cols')[1].get('size'));
            });
        },

        'should not resize column if handle move': function() {
            var dragHandle,
                dragNode,
                row = this._layoutBuilder.get('layout').get('rows')[1];

            dragHandle = row.get('node').all('.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).item(2);

            this._simulateDrag(this, dragHandle, undefined, function() {
                dragNode = row.get('node').all('.' + CSS_RESIZE_COL_DRAGGABLE).item(2);
                Y.Assert.areEqual(6, dragNode.getData('layout-position'));
                Y.Assert.areEqual(6, row.get('cols')[0].get('size'));
                Y.Assert.areEqual(6, row.get('cols')[1].get('size'));
            });
        },

        'should not be able to resize col if enableResizeCols is false': function() {
            var rows;

            this._layoutBuilder = new Y.LayoutBuilder({
                container: Y.one('.container'),
                enableResizeCols: false,
                layout: this._createTestLayout()
            });
            rows = this._layoutBuilder.get('layout').get('rows');

            Assert.areEqual(0, this._getVisibleRowNodes(rows[0], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(0, this._getVisibleRowNodes(rows[1], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(0, this._getVisibleRowNodes(rows[2], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(0, this._getVisibleRowNodes(rows[3], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(0, this._getVisibleRowNodes(rows[4], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(0, this._getVisibleRowNodes(rows[5], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
        },

        'should update UI when enableResizeCols changes dynamically': function() {
            var rows = this._layoutBuilder.get('layout').get('rows');

            this._layoutBuilder.set('enableResizeCols', false);

            Assert.areEqual(0, this._getVisibleRowNodes(rows[0], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(0, this._getVisibleRowNodes(rows[1], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(0, this._getVisibleRowNodes(rows[2], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(0, this._getVisibleRowNodes(rows[3], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(0, this._getVisibleRowNodes(rows[4], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(0, this._getVisibleRowNodes(rows[5], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);

            this._layoutBuilder.set('enableResizeCols', true);

            Assert.areEqual(5, this._getVisibleRowNodes(rows[0], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(3, this._getVisibleRowNodes(rows[1], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(3, this._getVisibleRowNodes(rows[2], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(3, this._getVisibleRowNodes(rows[3], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(4, this._getVisibleRowNodes(rows[4], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
            Assert.areEqual(4, this._getVisibleRowNodes(rows[5], '.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).length);
        },

        'should resize columns': function() {
            var col,
                dragHandle,
                secondBreakpointLine,
                row = Y.all('.row').item(1);

            col = row.one('.col');
            dragHandle = row.all('.layout-builder-resize-col-draggable-handle').item(2);

            Assert.areEqual(6, col.getData('layout-col').get('size'));

            dragHandle.simulate('keypress', { keyCode: 13 });

            secondBreakpointLine = row.all('.layout-builder-resize-col-breakpoint-line').item(1);
            secondBreakpointLine.simulate('keypress', { keyCode: 13 });

            Assert.areEqual(1, col.getData('layout-col').get('size'));
        },

        'should resize unremovable columns': function() {
            var col,
                dragHandle,
                secondBreakpointLine,
                row = Y.all('.row').item(1);

            row.all('.col').each(function(col) {
                col.getData('layout-col').set('removable', false);
            });

            col = row.one('.col');
            dragHandle = row.all('.layout-builder-resize-col-draggable-handle').item(2);

            Assert.areEqual(6, col.getData('layout-col').get('size'));

            dragHandle.simulate('keypress', { keyCode: 13 });

            secondBreakpointLine = row.all('.layout-builder-resize-col-breakpoint-line').item(1);
            secondBreakpointLine.simulate('keypress', { keyCode: 13 });

            Assert.areEqual(1, col.getData('layout-col').get('size'));
        },

        'should destroy removable first column': function() {
            var breakpoint,
                breakpointToAdding,
                cols,
                dragHandle,
                handleAddColumn,
                layout = this._layoutBuilder.get('layout'),
                row = Y.one('.row'),
                instance = this;

            cols = row.all('.col');

            this._layoutBuilder.set('enableAddCols', true);

            handleAddColumn = row.one('.layout-builder-add-col-handle');
            breakpointToAdding = row.all('.' + CSS_RESIZE_COL_BREAKPOINT).item(1);

            Assert.areEqual(true, cols.item(0).getData('layout-col').get('removable'));

            this._simulateDragToBreakpoint(this, handleAddColumn, breakpointToAdding, function() {
                dragHandle = row.all('.layout-builder-resize-col-draggable-handle').item(2);
                breakpoint = row.all('.' + CSS_RESIZE_COL_BREAKPOINT).item(0);

                Assert.areEqual(layout.get('rows')[0].get('cols').length, 5);

                instance._simulateDragToBreakpoint(instance, dragHandle, breakpoint, function() {
                    Assert.areEqual(layout.get('rows')[0].get('cols').length, 4);
                });
            });
        },

        'should destroy removable second column': function() {
            var breakpoint,
                breakpointToAdding,
                cols,
                dragHandle,
                handleAddColumn,
                layout = this._layoutBuilder.get('layout'),
                row = Y.one('.row'),
                instance = this;

            cols = row.all('.col');

            this._layoutBuilder.set('enableAddCols', true);

            Assert.areEqual(true, cols.item(0).getData('layout-col').get('removable'));
            Assert.areEqual(4, cols._nodes.length);

            handleAddColumn = row.all('.layout-builder-add-col-handle').item(1);
            breakpointToAdding = row.all('.' + CSS_RESIZE_COL_BREAKPOINT).item(11);

            instance._simulateDragToBreakpoint(instance, handleAddColumn, breakpointToAdding, function() {
                dragHandle = row.all('.layout-builder-resize-col-draggable-handle').item(5);
                breakpoint = row.all('.' + CSS_RESIZE_COL_BREAKPOINT).item(12);

                Assert.areEqual(layout.get('rows')[0].get('cols').length, 5);

                instance._simulateDragToBreakpoint(instance, dragHandle, breakpoint, function() {
                    Assert.areEqual(layout.get('rows')[0].get('cols').length, 4);
                }); 
            });
        },

        'should not destroy unremovable third column from left': function() {
            var row = Y.one('.row'),
                col = row.all('.col').item(2),
                layoutCol = col.getData('layout-col'),
                dragHandle,
                breakpoint,
                canceled;

            layoutCol.set('removable', false);

            dragHandle = row.all('.layout-builder-resize-col-draggable-handle').item(3);
            breakpoint = row.all('.' + CSS_RESIZE_COL_BREAKPOINT).item(9);

            layoutCol.on('removalCanceled', function() {
                canceled = true;
            });

            this._simulateDragToBreakpoint(this, dragHandle, breakpoint, function() {
                Assert.areEqual(3, col.getData('layout-col').get('size'));
                Assert.areEqual(true, canceled);
            });
        },

        'should not destroy unremovable third column from right': function() {
            var row = Y.one('.row'),
                col = row.all('.col').item(2),
                layoutCol = col.getData('layout-col'),
                dragHandle,
                breakpoint,
                canceled;

            layoutCol.set('removable', false);

            dragHandle = row.all('.layout-builder-resize-col-draggable-handle').item(4);
            breakpoint = row.all('.' + CSS_RESIZE_COL_BREAKPOINT).item(6);

            layoutCol.on('removalCanceled', function() {
                canceled = true;
            });

            this._simulateDragToBreakpoint(this, dragHandle, breakpoint, function() {
                Assert.areEqual(3, col.getData('layout-col').get('size'));
                Assert.areEqual(true, canceled);
            });
        },

        'should toggle breakpoints visibility when keypress on draghandle': function() {
            var dragHandle,
                row = Y.all('.row').item(1);

            dragHandle = row.all('.layout-builder-resize-col-draggable-handle').item(2);

            Assert.areEqual('none', row.all('.layout-builder-resize-col-breakpoint').item(1).getStyle('display'));

            dragHandle.simulate('keypress', { keyCode: 13 });
            Assert.areEqual('block', row.all('.layout-builder-resize-col-breakpoint').item(1).getStyle('display'));

            dragHandle.simulate('keypress', { keyCode: 13 });
            Assert.areEqual('none', row.all('.layout-builder-resize-col-breakpoint').item(1).getStyle('display'));
        },

        'should not show grid breakpoints when clicking drag handle with a button other than left': function() {
            var dragHandle,
                row = Y.all('.row').item(1);

            dragHandle = row.one('.layout-builder-resize-col-draggable-handle');
            Assert.areEqual('none', row.all('.layout-builder-resize-col-breakpoint').item(1).getStyle('display'));

            dragHandle.simulate('mousedown', { button: 1 });
            Assert.areEqual('none', row.all('.layout-builder-resize-col-breakpoint').item(1).getStyle('display'));

            dragHandle.simulate('mousedown', { button: 2 });
            Assert.areEqual('none', row.all('.layout-builder-resize-col-breakpoint').item(1).getStyle('display'));

            dragHandle.simulate('mousedown', { button: 0 });
            Assert.areEqual('block', row.all('.layout-builder-resize-col-breakpoint').item(1).getStyle('display'));
        },

        'should remove resize col feature on smartphones': function() {
            var layout = this._layoutBuilder.get('layout'),
                resizeColDraggable = Y.one('.layout-builder-resize-col-draggable');

            Y.Assert.isNotNull(resizeColDraggable);

            layout._set('isColumnMode', false);

            resizeColDraggable = Y.one('.layout-builder-resize-col-draggable');

            Y.Assert.isNull(resizeColDraggable);
        },

        'should normalize cols\' height after column resize': function() {
            var breakpoint,
                dragHandle,
                layout = this._layoutBuilder.get('layout'),
                row = this._layoutBuilder.get('layout').get('rows')[1];

            Y.Mock.expect(layout, {
                args: [Y.Mock.Value.Object],
                method: 'normalizeColsHeight'
            });

            dragHandle = row.get('node').one('.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE);
            breakpoint = row.get('node').one('.' + CSS_RESIZE_COL_BREAKPOINT);
            this._simulateDragToBreakpoint(this, dragHandle, breakpoint, function() {
                Y.Mock.verify(layout);
            });
        },

        'should cancel add col after drag the left add handle to the first breakpoint': function() {
            var breakpoint,
                dragHandle,
                row = this._layoutBuilder.get('layout').get('rows')[1];

            dragHandle = row.get('node').one('.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE);
            breakpoint = row.get('node').one('.' + CSS_RESIZE_COL_BREAKPOINT);

            Assert.areEqual(2, row.get('cols').length);
            
            this._simulateDragToBreakpoint(this, dragHandle, breakpoint, function() {
                Assert.areEqual(2, row.get('cols').length);
            });
        },

        'should show draggable bars of the column\'s boundaries whenever the cursor is over the column': function() {
            var col,
                dragHandle,
                row = this._layoutBuilder.get('layout').get('rows')[1];

            col = row.get('cols')[0];
            dragHandle = row.get('node').all('.' + CSS_RESIZE_COL_DRAGGABLE);

            col.get('node').simulate('mouseover');

            Assert.areEqual(true, dragHandle.item(0).hasClass('layout-builder-resize-col-draggable-visible'));
            Assert.areEqual(true, dragHandle.item(2).hasClass('layout-builder-resize-col-draggable-visible'));
        },

        'should hide draggable bars of the column\'s boundaries whenever the cursor goes out of the column': function() {
            var col,
                dragHandle,
                row = this._layoutBuilder.get('layout').get('rows')[1];

            col = row.get('cols')[0];
            dragHandle = row.get('node').all('.' + CSS_RESIZE_COL_DRAGGABLE);

            col.get('node').simulate('mouseout');

            Assert.areEqual(false, dragHandle.item(0).hasClass('layout-builder-resize-col-draggable-visible'));
            Assert.areEqual(false, dragHandle.item(2).hasClass('layout-builder-resize-col-draggable-visible'));
        },

        'should show draggable bars of the column\'s boundaries beside a handlers when the mouse is over it': function() {
            var dragHandle,
                row = this._layoutBuilder.get('layout').get('rows')[1];

            dragHandle = row.get('node').all('.' + CSS_RESIZE_COL_DRAGGABLE);

            dragHandle.item(2).simulate('mouseover');

            Assert.areEqual(true, dragHandle.item(0).hasClass('layout-builder-resize-col-draggable-visible'));
            Assert.areEqual(true, dragHandle.item(1).hasClass('layout-builder-resize-col-draggable-visible'));
            Assert.areEqual(true, dragHandle.item(2).hasClass('layout-builder-resize-col-draggable-visible'));

            dragHandle.item(2).simulate('mouseout');

            dragHandle.item(0).simulate('mouseover');

            Assert.areEqual(true, dragHandle.item(0).hasClass('layout-builder-resize-col-draggable-visible'));
            Assert.areEqual(false, dragHandle.item(1).hasClass('layout-builder-resize-col-draggable-visible'));
            Assert.areEqual(true, dragHandle.item(2).hasClass('layout-builder-resize-col-draggable-visible'));

            dragHandle.item(0).simulate('mouseout');

            dragHandle.item(1).simulate('mouseover');

            Assert.areEqual(false, dragHandle.item(0).hasClass('layout-builder-resize-col-draggable-visible'));
            Assert.areEqual(true, dragHandle.item(1).hasClass('layout-builder-resize-col-draggable-visible'));
            Assert.areEqual(true, dragHandle.item(2).hasClass('layout-builder-resize-col-draggable-visible'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-layout-builder', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
