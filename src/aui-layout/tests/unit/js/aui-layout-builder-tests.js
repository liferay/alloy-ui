YUI.add('aui-layout-builder-tests', function(Y) {

    var Assert = Y.Assert,
        container,
        layout,
        suite = new Y.Test.Suite('aui-layout-builder');

    suite.add(new Y.Test.Case({
        name: 'Layout Builder Tests',

        setUp: function() {
            layout = new Y.Layout({
                rows: [
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
                    }),
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
                    })
                ]
            });

            this.layoutBuilder = new Y.LayoutBuilder({
                container: Y.one('.container'),
                layout: layout
            });

            container = this.layoutBuilder.get('container').one('.layout-builder-layout-container');
        },

        tearDown: function() {
            this.layoutBuilder.destroy();
        },

        'should redraw when set a new layout': function() {
            var newLayout = new Y.Layout({
                rows: [
                    new Y.LayoutRow()
                ]
            });

            Assert.areEqual(this.layoutBuilder.get('layout').get('rows').length, 2);

            this.layoutBuilder.set('layout', newLayout);

            Assert.areEqual(this.layoutBuilder.get('layout').get('rows').length, 1);
        },

        'should add a col to a row': function() {
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

        'should remove a col from a row': function() {
            var row = layout.get('rows')[1];

            Assert.areEqual(row.get('cols').length, 2);

            row.removeCol(1);

            Assert.areEqual(row.get('cols').length, 1);
        },

        'should add a row to layout': function() {
            Assert.areEqual(container.all('.row').size(), 2);
            layout.addRow(4);
            Assert.areEqual(container.all('.row').size(), 3);
        },

        'should remove a row from layout': function() {
            Assert.areEqual(container.all('.row').size(), 2);
            layout.removeRow(1);
            Assert.areEqual(container.all('.row').size(), 1);
        },

        'should detach old layout events when set a new one': function() {
            var newLayout = new Y.Layout({
                    rows: [
                        new Y.LayoutRow()
                    ]
                }),
                rowsSize;

            this.layoutBuilder.set('layout', newLayout);

            layout.addRow(1);
            layout.addRow(1);

            rowsSize = this.layoutBuilder.get('layout').get('rows').length;

            Assert.areEqual(rowsSize, 1);

            newLayout.addRow(1);

            rowsSize = this.layoutBuilder.get('layout').get('rows').length;

            Assert.areEqual(rowsSize, 2);
        },

        'should change column mode when resize the window': function() {
            var instance = this;

            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                this.layoutBuilder._handleResponsive(Y.one(Y.config.win).get('innerWidth'));
            }
            else {
                // 500 is lower than responsive breakpoint
                Y.one(Y.config.win).set('innerWidth', 500);
                Y.one(Y.config.win).simulate('resize');
            }

            this.layoutBuilder.on('columnModeChange', function() {
                instance.resume(function() {
                    Assert.isFalse(instance.layoutBuilder._isColumnModeEnabled);

                    instance.layoutBuilder.detachAll();

                    // 1000 is greater than responsive breakpoint
                    Y.one(Y.config.win).set('innerWidth', 1000);
                    Y.one(Y.config.win).simulate('resize');

                    instance.layoutBuilder.on('columnModeChange', function() {
                        instance.resume(function() {
                            Assert.isTrue(instance.layoutBuilder._isColumnModeEnabled);
                        });
                    });

                    instance.wait();
                });
            });

            this.wait();
        },

        'should not change column mode if the resize difference is not enough': function() {
            var instance = this;

            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                this.layoutBuilder._handleResponsive(1000);
            }
            else {
                // 1000 is below the responsive breakpoint
                Y.one(Y.config.win).set('innerWidth', 1000);
                Y.one(Y.config.win).simulate('resize');
            }

            this.wait(function() {
                Assert.isTrue(instance.layoutBuilder._isColumnModeEnabled);

                Y.one(Y.config.win).set('innerWidth', 1001);
                Y.one(Y.config.win).simulate('resize');

                this.wait(function() {
                    Assert.isTrue(instance.layoutBuilder._isColumnModeEnabled);
                }, Y.config.windowResizeDelay || 100);
            }, Y.config.windowResizeDelay || 100);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout-builder', 'aui-classnamemanager', 'node-event-simulate']
});
