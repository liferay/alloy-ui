YUI.add('aui-layout-tests', function(Y) {

    var Assert = Y.Assert,
        CONTAINER_CLASS = '.container',
        Content,
        originalWinGet,
        row,
        suite = new Y.Test.Suite('aui-layout'),
        win = Y.one(Y.config.win);

    originalWinGet = win.get;

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

        _mockWindowInnerWidth: function (size) {
            Y.Mock.expect(win, {
                args: ['innerWidth'],
                method: 'get',
                returns: size
            });
        },

        _resetWindowGet: function () {
            win.get = originalWinGet;
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
        },

        'should normalize column\'s height': function() {
            var colOne,
                cols,
                colTwo,
                container = Y.one(CONTAINER_CLASS),
                layoutColOne = this.layout.get('rows')[0].get('cols')[0];

            layoutColOne.get('node').appendChild(Y.Node.create('<div style="height:200px"></div>'));
            this.layout.draw(container);

            cols = Y.all('.col');
            colOne = cols.item(0);
            colTwo = cols.item(1);

            Y.Assert.areEqual(colOne.get('clientHeight'), colTwo.get('clientHeight'));

            colOne.setStyle('height', '200px');

            Y.Assert.areNotEqual(colOne.get('clientHeight'), colTwo.get('clientHeight'));

            this.layout.normalizeColsHeight(new Y.NodeList(colOne.ancestor('.row')));

            Y.Assert.areEqual(colOne.get('clientHeight'), colTwo.get('clientHeight'));
        },

        'should not normalize row cols\' height if equalHeight attribute is set to false': function() {
            var colOne,
                cols,
                colTwo,
                container = Y.one(CONTAINER_CLASS),
                row;

            this.layout.draw(container);

            cols = Y.all('.col');
            colOne = cols.item(0);
            colTwo = cols.item(1);
            row = Y.one('.row').getData('layout-row');
            row.set('equalHeight', false);

            Y.Assert.areEqual(colOne.get('clientHeight'), colTwo.get('clientHeight'));

            colOne.setStyle('height', '200px');

            Y.Assert.areNotEqual(colOne.get('clientHeight'), colTwo.get('clientHeight'));

            this.layout.normalizeColsHeight(new Y.NodeList(colOne.ancestor('.row')));

            Y.Assert.areNotEqual(colOne.get('clientHeight'), colTwo.get('clientHeight'));
        },

        'should normalize row cols\' height after change a value for a row': function() {
            var col,
                container = Y.one(CONTAINER_CLASS);

            Y.Mock.expect(this.layout, {
                args: [Y.Mock.Value.Object],
                callCount: 2,
                method: 'normalizeColsHeight'
            });

            this.layout.draw(container);

            col = Y.one('.col').getData('layout-col');
            col.set('value', null);

            Y.Mock.verify(this.layout);
        },

        'should normalize row cols\' height after cols change event': function() {
            var container = Y.one(CONTAINER_CLASS),
                row;

            Y.Mock.expect(this.layout, {
                args: [Y.Mock.Value.Object],
                callCount: 2,
                method: 'normalizeColsHeight'
            });

            this.layout.draw(container);

            row = Y.one('.row').getData('layout-row');
            row.set('cols', []);

            Y.Mock.verify(this.layout);
        },

        'should call handle responsive after resize window': function() {
            Y.Mock.expect(this.layout, {
                args: [Y.Mock.Value.Number],
                method: '_handleResponsive'
            });

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
                Y.Mock.verify(this.layout);
            }, Y.config.windowResizeDelay || 100);
        },

        'should not normalize col\'s height if column mode is disabled': function() {
            var instance = this,
                colOne,
                container = Y.one(CONTAINER_CLASS),
                row = this.layout.get('rows')[0];

            // 500 is below the responsive breakpoint
            instance._mockWindowInnerWidth(500);

            colOne = row.get('cols')[0];

            colOne.get('node').appendChild(Y.Node.create('<div style="height:200px"></div>'));

            this.layout.draw(container);

            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                this.layoutBuilder._handleResponsive(500);
            }
            else {
                win.simulate('resize');
            }

            this.wait(function() {
                Y.Assert.areNotEqual(
                    Y.all('.col').item(0).get('clientHeight'),
                    Y.all('.col').item(1).get('clientHeight')
                );
                instance._resetWindowGet();
            }, Y.config.windowResizeDelay || 100);
        },

        'should change column mode when resize the window': function() {
            var instance = this,
                container = Y.one(CONTAINER_CLASS);

            instance._mockWindowInnerWidth(500);

            this.layout.draw(container);

            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                this.layout._handleResponsive(win.get('innerWidth'));
            }
            else {
                win.simulate('resize');
            }

            this.wait(function() {
                Assert.isFalse(instance.layout.get('isColumnMode'));

                // 1000 is greater than responsive breakpoint
                instance._mockWindowInnerWidth(1000);
                win.simulate('resize');

                this.wait(function() {
                    Assert.isTrue(instance.layout.get('isColumnMode'));
                    instance._resetWindowGet();
                }, Y.config.windowResizeDelay || 100);
            }, Y.config.windowResizeDelay || 100);
        },

        'should not change column mode if the resize difference is not enough': function() {
            var instance = this;

            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                this.layout._handleResponsive(1000);
            }
            else {
                // 1000 is below the responsive breakpoint
                Y.one(Y.config.win).set('innerWidth', 1000);
                Y.one(Y.config.win).simulate('resize');
            }

            this.wait(function() {
                Assert.isTrue(instance.layout.get('isColumnMode'));

                Y.one(Y.config.win).set('innerWidth', 1001);
                Y.one(Y.config.win).simulate('resize');

                this.wait(function() {
                    Assert.isTrue(instance.layout.get('isColumnMode'));
                }, Y.config.windowResizeDelay || 100);
            }, Y.config.windowResizeDelay || 100);
        },

        'should use progressive enhancement when construct a layout without rows': function() {
            var container = Y.one('.container-progressive-enhancement'),
                layout = new Y.Layout(),
                layoutNode;

            Assert.isTrue(layout._useProgressiveEnhancement);

            layout.draw(container);

            layoutNode = container.one('.layout-node');

            Assert.areEqual(layoutNode, layout.get('node'));
            Assert.areEqual(container.all('.row').size(), layout.get('rows').length);
        },

        'should be able to create a layout with rows attribute being an array of plain objects instead of an array of LayoutRow': function() {
            var layout = new Y.Layout({
                    rows: [
                        {
                            index: 1,
                            quantity: 2
                        },
                        {
                            cols: [
                                new Y.LayoutCol({
                                    movableContent: false,
                                    size: 12
                                })
                            ]
                        }
                    ]
                });

            Assert.areEqual(2, layout.get('rows').length);
            Assert.isTrue(Y.instanceOf(layout.get('rows')[0], Y.LayoutRow));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout', 'aui-layout-col', 'aui-layout-row', 'node-event-simulate'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
