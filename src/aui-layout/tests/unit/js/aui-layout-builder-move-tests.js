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

        'should show cut button when click on move button': function() {
            var cutColButton,
                cutRowButton,
                moveButton = container.one('.layout-builder-move-button'),
                row = layout.get('rows')[0];

            moveButton.simulate('click');

            cutRowButton = container.all('.layout-builder-move-cut-row-button');
            cutColButton = container.all('.layout-builder-move-cut-col-button');

            Assert.areEqual(1, cutRowButton.size());
            Assert.areEqual(row.get('cols').length, cutColButton.size());
        },

        'should not show cut row button if row is not movable': function() {
            var firstRow = Y.one('.row'),
                firstLayoutRow = firstRow.getData('layout-row'),
                moveButton;

            firstLayoutRow.set('movable', false);

            moveButton = Y.one('.layout-builder-move-button');
            moveButton.simulate('click');

            Assert.isNull(firstRow.previous('.layout-builder-move-cut-row-button'));
        },

        'should fire preventable event for adding col move buttons': function() {
            var cutColButton,
                moveButton = container.one('.layout-builder-move-button');

            this.layoutBuilder.on('addColMoveButton', function(event) {
                event.preventDefault();
            });
            moveButton.simulate('click');

            cutColButton = container.all('.layout-builder-move-cut-col-button');
            Assert.areEqual(0, cutColButton.size());
        },

        'should change row\'s position': function() {
            var cutButton,
                moveButton = container.all('.layout-builder-move-button').last(),
                rows = this.layoutBuilder.get('layout').get('rows'),
                target;

            Assert.areEqual(3, rows[1].get('cols').length);

            moveButton.simulate('click');

            cutButton = container.one('.layout-builder-move-cut-button');
            cutButton.simulate('click');

            target = container.one('.layout-builder-move-target');
            target.simulate('click');

            rows = this.layoutBuilder.get('layout').get('rows');

            Assert.areEqual(4, rows[1].get('cols').length);
        },

        'should be able to cancel the move action': function() {
            var cutButton,
                cancelButton,
                moveButton = container.one('.layout-builder-move-button');

            moveButton.simulate('click');

            cutButton = container.one('.layout-builder-move-cut-button');

            Assert.isNotNull(cutButton);

            cancelButton = container.one('.layout-builder-move-cancel-targets');
            cancelButton.simulate('click');

            cutButton = container.one('.layout-builder-move-cut-button');

            Assert.isNull(cutButton);
        },

        'should fire preventable event for removing col move buttons': function() {
            var cutColButton,
                moveButton = container.one('.layout-builder-move-button');

            this.layoutBuilder.on('removeColMoveButtons', function(event) {
                event.preventDefault();
            });
            moveButton.simulate('click');
            moveButton.simulate('click');

            cutColButton = container.all('.layout-builder-move-cut-col-button');
            Assert.areEqual(4, cutColButton.size());
        },

        'should hide move row button if disable enableMove attribute': function() {
            var button = container.one('.layout-builder-move-button');

            Assert.isNotNull(button);

            this.layoutBuilder.set('enableMove', false);

            button = container.one('.layout-builder-move-button');

            Assert.isNull(button);
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

        'should disable enableMove attribute when creating the layout builder': function() {
            var button;

            this.layoutBuilder.destroy();

            this.layoutBuilder = new Y.LayoutBuilder({
                container: Y.one('.container'),
                enableMove: false,
                layout: layout
            });

            button = container.one('.layout-builder-move-button');

            Assert.isNull(button);
        },

        'should not add cut row button if layout has only one row': function() {
            var button,
                cutRow;

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

            button = this.layoutBuilder._layoutContainer.one('.layout-builder-move-button');
            button.simulate('click');

            cutRow = this.layoutBuilder._layoutContainer.one('.layout-builder-cut-row-button');

            Assert.isNull(cutRow);
        },

        'should not add cut col button if layout has 1 row and 1 col only': function() {
            var button,
                container = this.layoutBuilder._layoutContainer,
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

            button = container.one('.layout-builder-move-button');
            button.simulate('click');

            cutCol = container.one('.layout-builder-move-cut-col-button');
            Assert.isNull(cutCol);
        },

        'should not add targets around clicked row': function() {
            var buttons,
                button,
                cutButton,
                rows,
                row0,
                row1;

            buttons = this.layoutBuilder._layoutContainer.all('.layout-builder-move-button');
            button = Y.one(buttons._nodes[1]);
            rows = container.all('.row');
            row0 = Y.one(rows._nodes[0]);
            row1 = Y.one(rows._nodes[1]);

            button.simulate('click');

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
                moveButton,
                targetArea;

            this.layoutBuilder.set('layout', layout);

            moveButton = container.all('.layout-builder-move-button').last();
            moveButton.simulate('click');

            cutButton = container.one('.layout-builder-move-cut-button');
            cutButton.simulate('click');

            targetArea = container.one('.layout-builder-move-target');

            Assert.areEqual(1, targetArea.getData('row-index'));
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
                moveButton,
                targetArea;

            this.layoutBuilder.set('layout', layout);

            moveButton = Y.one(container.all('.layout-builder-move-button')._nodes[1]);
            moveButton.simulate('click');

            cutButton = container.one('.layout-builder-move-cut-button');
            cutButton.simulate('click');

            targetArea = container.one('.layout-builder-move-target');

            Assert.areNotEqual(4, targetArea.getData('row-index'));
        },

        'should add targets on cols': function() {
            var button,
                buttons,
                buttonCutCol,
                row = container.one('.row');

            buttons = this.layoutBuilder._layoutContainer.all('.layout-builder-move-button');
            button = Y.one(buttons._nodes[0]);

            button.simulate('click');

            buttonCutCol = row.one('.layout-builder-move-cut-col-button');
            buttonCutCol.simulate('click');

            Assert.areEqual(row.all('.col').size() - 1, row.all('.layout-builder-move-target').size());
        },

        'should move col': function() {
            var buttons,
                button,
                col,
                colTarget,
                cutColButton;

            buttons = container.all('.layout-builder-move-button');
            button = buttons.first();

            button.simulate('click');

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
                lastTarget,
                moveButton = Y.one('.layout-builder-move-button');

            Assert.areEqual(4, firstRow.all('.col').size());

            lastRow = Y.all('.row').last();
            Assert.areEqual(1, lastRow.all('.col').size());

            moveButton.simulate('click');

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
                lastTarget,
                moveButton = Y.one('.layout-builder-move-button');

            firstLayoutCol = firstRow.one('.col').getData('layout-col');

            Assert.areEqual('foo', firstLayoutCol.get('value').content);

            lastLayoutCol = firstRow.all('.col').last().getData('layout-col');
            Assert.areEqual('foo', lastLayoutCol.get('value').content);

            secondCall = firstRow.all('.col').item(1);
            secondCall.getData('layout-col').set('movableContent', false);

            moveButton.simulate('click');

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
            var moveButton = Y.one('.layout-builder-move-button');

            layout._set('isColumnMode', false);

            moveButton.simulate('click');

            Assert.isNull(Y.one('.layout-builder-move-cut-col-button'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout-builder', 'aui-classnamemanager', 'node-event-simulate']
});
