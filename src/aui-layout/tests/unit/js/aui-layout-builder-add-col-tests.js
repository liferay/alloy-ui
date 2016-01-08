YUI.add('aui-layout-builder-add-col-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-layout-builder-add-col');

    suite.add(new Y.Test.Case({
        name: 'Layout Builder Add Col Tests',

        tearDown: function() {
            if (this._layoutBuilder) {
                this._layoutBuilder.destroy();
            }
        },

        _createLayoutBuilder: function(config) {
            var layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 6,
                                value: { content: '6' }
                            }),
                            new Y.LayoutCol({
                                size: 6,
                                value: { content: '6' }
                            })
                        ]
                    }),
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: '3' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: '3' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: '3' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: '3' }
                            })
                        ]
                    })
                ]
            });
            this._layoutBuilder = new Y.LayoutBuilder(Y.merge({
                container: Y.one('.container'),
                layout: layout
            }, config));
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
            done = done || function(){};
            this._simulateDrag(test, dragHandle, function() {
                return [
                    breakpoint.get('region').left,
                    breakpoint.get('region').top
                ];
            }, done);
        },

        'should add addColButton to new rows': function() {
            var addColButtons,
                addRowArea,
                container;

            this._createLayoutBuilder();

            container = this._layoutBuilder.get('container');
            addColButtons = container.all('.layout-builder-add-col-handle');

            Y.Assert.areEqual(4, addColButtons.size());

            addRowArea = container.one('.layout-builder-add-row-choose-row');
            addRowArea.simulate('click');

            addColButtons = container.all('.layout-builder-add-col-handle');

            Y.Assert.areEqual(6, addColButtons.size());
        },

        'should not append addCol button if row alreay has the maximum number of cols': function() {
            var cols,
                firstRow,
                i = 0;

            this._createLayoutBuilder();

            firstRow = this._layoutBuilder.get('layout').get('rows')[0];
            cols = firstRow.get('cols');

            while (i < firstRow.get('maximumCols') + 2) {
                firstRow.addCol(i);
                i ++;
            }

            Y.Assert.areEqual(firstRow.get('cols').length, firstRow.get('maximumCols'));

            Y.Assert.isNull(firstRow.get('node').one('.layout-builder-add-col'));
        },

        'should not add col if enableAddCol is false': function() {
            var addColButton,
                col;

            this._createLayoutBuilder({
                enableAddCols: false
            });

            col = Y.one('.col-md-6');

            addColButton = col.one('.layout-builder-add-col');
            Y.Assert.isNull(addColButton);
        },

        'should enable/disable adding columns dynamically': function() {
            var dragHandle,
                breakpoint,
                col,
                layout,
                instance = this;

            instance._createLayoutBuilder();

            col = Y.one('.col-md-6');

            instance._layoutBuilder.set('enableAddCols', false);

            dragHandle = Y.one('.layout-builder-add-col-handle');
            Y.Assert.isNull(dragHandle);

            instance._layoutBuilder.set('enableAddCols', true);

            dragHandle = Y.one('.layout-builder-add-col-handle');
            Y.Assert.isNotNull(dragHandle);

            breakpoint = col.ancestor().all('.layout-builder-resize-col-breakpoint').item(1);

            instance._simulateDragToBreakpoint(instance, dragHandle, breakpoint, function() {
                layout = instance._layoutBuilder.get('layout');
                Y.Assert.areEqual(layout.get('rows')[0].get('cols').length, 3);
            });
        },

        'should remove add col feature on smartphones': function() {
            var addColButton,
                layout;

            this._createLayoutBuilder();

            layout = this._layoutBuilder.get('layout');

            layout._set('isColumnMode', false);

            addColButton = Y.one('.layout-builder-add-col-handle');

            Y.Assert.isNull(addColButton);
        },

        'should normalize cols height after add a new col': function() {
            var breakpoint,
                dragHandle,
                layout,
                row;

            this._createLayoutBuilder();

            layout = this._layoutBuilder.get('layout');
            row = layout.get('rows')[0];
            dragHandle = row.get('node').all('.layout-builder-add-col-handle').item(1);
            breakpoint = row.get('node').all('.layout-builder-resize-col-breakpoint').item(11);

            Y.Mock.expect(layout, {
                args: [Y.Mock.Value.Object],
                method: 'normalizeColsHeight'
            });

            this._simulateDragToBreakpoint(this, dragHandle, breakpoint, function() {
                Y.Mock.verify(layout); 
            });
        },

        'should not scroll when add a new col': function() {
            var breakpoint,
                dragHandle,
                instance = this,
                layout,
                row,
                scrollPositionAfter,
                scrollPositionBefore,
                win = Y.config.win;

            instance._createLayoutBuilder();

            layout = instance._layoutBuilder.get('layout');
            row = layout.get('rows')[0];
            dragHandle = row.get('node').all('.layout-builder-add-col-handle').item(1);
            breakpoint = row.get('node').all('.layout-builder-resize-col-breakpoint').item(11);

            for (var i = 0; i < 20; i++) {
                layout.addRow();
            }

            win.scrollTo(0, Y.one('body').get('region').height);

            instance.wait(function() {
                scrollPositionBefore = win.scrollY;

                instance._simulateDragToBreakpoint(instance, dragHandle, breakpoint, function() {
                    scrollPositionAfter = win.scrollY;

                    Y.Assert.areEqual(scrollPositionBefore, scrollPositionAfter);
                });
            }, 100);
        },

        'should insert a new column on the left after drop the left draggable handle': function() {
            var dragHandle,
                breakpoint,
                layout,
                row;

            this._createLayoutBuilder();

            layout = this._layoutBuilder.get('layout');
            row = layout.get('rows')[0];
            dragHandle = row.get('node').one('.layout-builder-add-col-handle');
            breakpoint = row.get('node').all('.layout-builder-resize-col-breakpoint').item(1);

            Y.Assert.areEqual(row.get('cols').length, 2);

            this._simulateDragToBreakpoint(this, dragHandle, breakpoint, function() {
                Y.Assert.areEqual(layout.get('rows')[0].get('cols').length, 3);
            });
        },

        'should insert a new column on the right after drop the right draggable handle': function() {
            var layout,
                row,
                dragHandle,
                breakpoint;

            this._createLayoutBuilder();

            layout = this._layoutBuilder.get('layout');
            row = layout.get('rows')[0];
            dragHandle = row.get('node').all('.layout-builder-add-col-handle').item(1);
            breakpoint = row.get('node').all('.layout-builder-resize-col-breakpoint').item(11);

            Y.Assert.areEqual(row.get('cols').length, 2);

            this._simulateDragToBreakpoint(this, dragHandle, breakpoint, function() {
                Y.Assert.areEqual(layout.get('rows')[0].get('cols').length, 3);
            });
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-layout-builder', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
