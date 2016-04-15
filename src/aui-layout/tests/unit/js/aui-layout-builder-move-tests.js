YUI.add('aui-layout-builder-move-tests', function(Y) {

    var Assert = Y.Assert,
        container,
        layout,
        suite = new Y.Test.Suite('aui-layout-builder-move');

    suite.add(new Y.Test.Case({
        name: 'Layout Builder Move Tests',

        setUp: function() {

            layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: 'foo' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: 'foo' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: 'foo' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: 'foo' }
                            })
                        ]
                    }),
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 4,
                                value: { content: 'foo' }
                            }),
                            new Y.LayoutCol({
                                size: 4,
                                value: { content: 'foo' }
                            }),
                            new Y.LayoutCol({
                                size: 4,
                                value: { content: 'foo' }
                            })
                        ]
                    }),
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 6,
                                value: { content: 'foo' }
                            }),
                            new Y.LayoutCol({
                                size: 6,
                                value: { content: 'foo' }
                            })
                        ]
                    }),
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 12,
                                value: { content: 'foo' }
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

        'should show cut row button if row is movable': function() {
            var firstRow = Y.one('.row');

            Assert.isNotNull(firstRow.previous('.layout-builder-move-cut-row-button'));
        },

        'should not show cut row button if row is not movable': function() {
            var firstRow = Y.one('.row'),
                firstLayoutRow = firstRow.getData('layout-row');

            firstLayoutRow.set('movable', false);
            Assert.isNull(firstRow.previous('.layout-builder-move-cut-row-button'));

            firstLayoutRow.set('movable', true);
            Assert.isNotNull(firstRow.previous('.layout-builder-move-cut-row-button'));
        },

        'should change row\'s position': function() {
            var cutButton,
                rows = this.layoutBuilder.get('layout').get('rows'),
                target;

            Assert.areEqual(3, rows[1].get('cols').length);

            cutButton = container.one('.layout-builder-move-cut-button');
            cutButton.simulate('click');

            target = container.one('.layout-builder-move-target');
            target.simulate('click');

            rows = this.layoutBuilder.get('layout').get('rows');

            Assert.areEqual(4, rows[1].get('cols').length);
        },

        'should be able to cancel the move action on clicked in the cut button again': function() {
            var cutButton,
                target;

            cutButton = container.one('.layout-builder-move-cut-row-button');
            cutButton.simulate('click');

            Assert.isNotNull(cutButton);

            target = container.one('.layout-builder-move-row-target');
            Assert.isNotNull(target);

            Y.one('body').simulate('keydown', {
                keyCode: 27
            });

            target = container.one('.layout-builder-move-row-target');
            Assert.isNull(target);
        },

        'should be able to cancel the move action on escape key press': function() {
            var cutButton,
                target;

            cutButton = container.one('.layout-builder-move-cut-row-button');
            cutButton.simulate('click');

            Assert.isNotNull(cutButton);

            target = container.one('.layout-builder-move-row-target');
            Assert.isNotNull(target);

            cutButton.simulate('click');

            target = container.one('.layout-builder-move-row-target');
            Assert.isNull(target);
        },

        'should hide move row button if disable enableMoveRows attribute': function() {
            var cutButton = container.one('.layout-builder-move-cut-row-button');

            Assert.isNotNull(cutButton);

            this.layoutBuilder.set('enableMoveRows', false);

            cutButton = container.one('.layout-builder-move-cut-row-button');

            Assert.isNull(cutButton);
        },

        'should hide move column button if disable enableMoveCols attribute': function() {
            var cutButton = container.one('.layout-builder-move-cut-col-button');

            Assert.isNotNull(cutButton);

            this.layoutBuilder.set('enableMoveCols', false);

            cutButton = container.one('.layout-builder-move-cut-col-button');

            Assert.isNull(cutButton);
        },

        'should not add move row button on rows that hasn\'t anything to move': function() {
            var moveButton,
                layout = new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    movableContent: false,
                                    size: 3,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    movableContent: false,
                                    size: 9,
                                    value: { content: 'foo' }
                                })
                            ],
                            movable: false
                        })
                    ]
                });

            this.layoutBuilder.set('layout', layout);

            moveButton = Y.one('.layout-builder-move-button');
            Assert.isNull(moveButton);
        },

        'should not add cut row button if layout has only one row': function() {
            var cutRow;

            layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: 'foo' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: 'foo' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: 'foo' }
                            }),
                            new Y.LayoutCol({
                                size: 3,
                                value: { content: 'foo' }
                            })
                        ]
                    })
                ]
            });

            this.layoutBuilder.set('layout', layout);

            cutRow = this.layoutBuilder._layoutContainer.one('.layout-builder-cut-row-button');

            Assert.isNull(cutRow);
        },

        'should not add cut col button if layout has 1 row and 1 col only': function() {
            var container = this.layoutBuilder._layoutContainer,
                cutCol;

            layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 12,
                                value: { content: 'foo' }
                            })
                        ]
                    })
                ]
            });

            this.layoutBuilder.set('layout', layout);

            cutCol = container.one('.layout-builder-move-cut-col-button');
            Assert.isNull(cutCol);
        },

        'should not add targets around clicked row': function() {
            var cutButton,
                rows,
                row0,
                row1;

            rows = container.all('.row');
            row0 = Y.one(rows._nodes[0]);
            row1 = Y.one(rows._nodes[1]);

            cutButton = container.one('.layout-builder-move-cut-button');
            cutButton.simulate('click');

            Assert.isFalse(row0.ancestor().next().hasClass('.layout-builder-move-row-target'));
            Assert.isFalse(row1.ancestor().next().hasClass('.layout-builder-move-row-target'));
        },

        'should not add target before an unmovable row and the row to be moved': function() {
            var cutButton,
                layout = new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 3,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 3,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 3,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 3,
                                    value: { content: 'foo' }
                                })
                            ],
                            movable: false
                        }),
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                })
                            ]
                        }),
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                })
                            ]
                        })
                    ]
                }),
                targetArea;

            this.layoutBuilder.set('layout', layout);

            cutButton = container.one('.layout-builder-move-cut-row-button');
            cutButton.simulate('click');

            targetArea = container.one('.layout-builder-move-target');

            Assert.areEqual(2, targetArea.getData('row-index'));
        },

        'should not add target after the row to be moved and the unmovable row': function() {
            var cutButton,
                layout = new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 3,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 3,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 3,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 3,
                                    value: { content: 'foo' }
                                })
                            ]
                        }),
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                })
                            ]
                        }),
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: { content: 'foo' }
                                })
                            ],
                            movable: false
                        })
                    ]
                }),
                targetArea;

            this.layoutBuilder.set('layout', layout);

            cutButton = container.one('.layout-builder-move-cut-button');
            cutButton.simulate('click');

            targetArea = container.one('.layout-builder-move-target');

            Assert.areNotEqual(4, targetArea.getData('row-index'));
        },

        'should add targets on cols': function() {
            var buttonCutCol,
                row = container.one('.row');

            buttonCutCol = row.one('.layout-builder-move-cut-col-button');
            buttonCutCol.simulate('click');

            Assert.areEqual(row.all('.col').size() - 1, row.all('.layout-builder-move-target').size());
        },

        'should move col': function() {
            var col,
                colTarget,
                cutColButton;

            col = container.one('.col');
            Assert.areEqual('foo', col.getData('layout-col').get('value').content);

            cutColButton = container.one('.layout-builder-move-cut-col-button');
            cutColButton.simulate('click');

            colTarget = container.one('.layout-builder-move-col-target');
            colTarget.simulate('click');

            col = container.one('.col');
            Assert.isNull(col.getData('layout-col').get('value'));
        },

        'should move a row using keyboard': function() {
            var cutRowButton,
                firstRow = Y.one('.row'),
                lastRow,
                lastTarget;

            Assert.areEqual(4, firstRow.all('.col').size());

            lastRow = Y.all('.row').last();
            Assert.areEqual(1, lastRow.all('.col').size());

            cutRowButton = Y.one('.layout-builder-move-cut-row-button');
            cutRowButton.simulate('keypress', { keyCode: 13 });

            lastTarget = Y.all('.layout-builder-move-row-target').last();
            lastTarget.simulate('keypress', { keyCode: 13 });

            firstRow = Y.one('.row');
            Assert.areEqual(3, firstRow.all('.col').size());

            lastRow = Y.all('.row').last();
            Assert.areEqual(4, lastRow.all('.col').size());
        },

        'should move a col using keyboard': function() {
            var cutColButton,
                secondCall,
                firstLayoutCol,
                firstRow = Y.one('.row'),
                lastLayoutCol,
                lastTarget;

            firstLayoutCol = firstRow.one('.col').getData('layout-col');

            Assert.areEqual('foo', firstLayoutCol.get('value').content);

            lastLayoutCol = firstRow.all('.col').last().getData('layout-col');
            Assert.areEqual('foo', lastLayoutCol.get('value').content);

            secondCall = firstRow.all('.col').item(1);
            secondCall.getData('layout-col').set('movableContent', false);

            Assert.isNull(secondCall.one('.layout-builder-move-col-target'));

            cutColButton = firstRow.one('.layout-builder-move-cut-col-button');
            cutColButton.simulate('keypress', { keyCode: 13 });

            lastTarget = firstRow.all('.layout-builder-move-col-target').last();
            lastTarget.simulate('keypress', { keyCode: 13 });

            firstLayoutCol = firstRow.one('.col').getData('layout-col');
            Assert.isNull(firstLayoutCol.get('value'));

            lastLayoutCol = firstRow.all('.col').last().getData('layout-col');
            Assert.areEqual('foo', lastLayoutCol.get('value').content);
        },

        'should call _resetMoveUI method when change cols attribute': function() {
            Y.Mock.expect(this.layoutBuilder, {
                method: '_resetMoveUI'
            });

            Y.one('.row').getData('layout-row').set('cols', []);

            Y.Mock.verify(this.layoutBuilder);
        },

        'should not insert cut buttons on cols if columnMode is not enabled through responsiveness': function() {
            layout._set('isColumnMode', false);
            Assert.isNull(Y.one('.layout-builder-move-cut-col-button'));

            layout._set('isColumnMode', true);
            Assert.isNotNull(Y.one('.layout-builder-move-cut-col-button'));
        },

        'should add a CSS class that is indicating some item is moving': function() {
            var cutButton;

            cutButton = container.one('.layout-builder-move-cut-row-button');
            cutButton.simulate('click');

            Assert.isTrue(Y.one('.layout-builder-layout-container').hasClass('layout-builder-moving'));
        },

        'should remove a CSS class that is indicating some item is moving': function() {
            var cutButton;

            cutButton = container.one('.layout-builder-move-cut-row-button');
            cutButton.simulate('click');
            cutButton.simulate('click');

            Assert.isFalse(Y.one('.layout-builder-layout-container').hasClass('layout-builder-moving'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout-builder', 'aui-classnamemanager', 'node-event-simulate'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
