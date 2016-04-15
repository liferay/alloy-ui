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

        'should create an empty layout if one is not passed through constructor': function() {
            var layoutBuilder = new Y.LayoutBuilder({
                container: '.container'
            });

            Assert.isNotNull(layoutBuilder.get('layout'));
            Assert.isNotNull(Y.one('.container').one('.layout-builder-layout-container'));
        },

        'should not be able to add a new row if user is moving a row': function() {
            Y.one('.layout-builder-move-cut-row-button').simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableAddRows'));
            Y.Assert.isNull(Y.one('.layout-builder-add-row'));
        },

        'should be able to add a new row if user stops moving a row': function() {
            var moveRowButton = Y.one('.layout-builder-move-cut-row-button');

            moveRowButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableAddRows'));

            moveRowButton.simulate('click');
            Y.Assert.isTrue(this.layoutBuilder.get('enableAddRows'));

            Y.Assert.isNotNull(Y.one('.layout-builder-add-row'));
        },

        'should not be able to add a new row if user is moving a column': function() {
            Y.one('.layout-builder-move-cut-col-button').simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableAddRows'));
            Y.Assert.isNull(Y.one('.layout-builder-add-row'));
        },

        'should be able to add a new row if user stops moving a column': function() {
            var moveColButton = Y.one('.layout-builder-move-cut-col-button');

            moveColButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableAddRows'));

            moveColButton.simulate('click');
            Y.Assert.isTrue(this.layoutBuilder.get('enableAddRows'));

            Y.Assert.isNotNull(Y.one('.layout-builder-add-row'));
        },

        'should not enable add rows feature, after user stops moving a rows, if that was disabled previously': function() {
            var moveRowButton = Y.one('.layout-builder-move-cut-row-button');

            this.layoutBuilder.set('enableAddRows', false);
            Y.Assert.isFalse(this.layoutBuilder.get('enableAddRows'));

            moveRowButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableAddRows'));

            moveRowButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableAddRows'));

            Y.Assert.isNull(Y.one('.layout-builder-add-row'));
        },

        'should not enable add rows feature, after user stops moving a column, if that was disabled previously': function() {
            var moveColButton = Y.one('.layout-builder-move-cut-col-button');

            this.layoutBuilder.set('enableAddRows', false);
            Y.Assert.isFalse(this.layoutBuilder.get('enableAddRows'));

            moveColButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableAddRows'));

            moveColButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableAddRows'));

            Y.Assert.isNull(Y.one('.layout-builder-add-row'));
        },

        'should disable remove rows feature if user is moving a row': function() {
            Y.one('.layout-builder-move-cut-row-button').simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableRemoveRows'));

            Y.Assert.isNull(Y.one('.layout-builder-remove-row-button'));
        },

        'should disable remove rows feature if user is moving a column': function() {
            Y.one('.layout-builder-move-cut-col-button').simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableRemoveRows'));

            Y.Assert.isNull(Y.one('.layout-builder-remove-row-button'));
        },

        'should enable remove rows feature if user stops moving a column': function() {
            var moveColButton = Y.one('.layout-builder-move-cut-col-button');

            moveColButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableRemoveRows'));

            moveColButton.simulate('click');
            Y.Assert.isTrue(this.layoutBuilder.get('enableRemoveRows'));

            Y.Assert.isNotNull(Y.one('.layout-builder-remove-row-button'));
        },

        'should enable remove rows feature if user stops moving a row': function() {
            var moveRowButton = Y.one('.layout-builder-move-cut-row-button');

            moveRowButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableRemoveRows'));

            moveRowButton.simulate('click');
            Y.Assert.isTrue(this.layoutBuilder.get('enableRemoveRows'));

            Y.Assert.isNotNull(Y.one('.layout-builder-remove-row-button'));
        },

        'should not enable remove rows feature, after user stops moving a rows, if that was disabled previously': function() {
            var moveRowButton = Y.one('.layout-builder-move-cut-row-button');

            this.layoutBuilder.set('enableRemoveRows', false);
            Y.Assert.isFalse(this.layoutBuilder.get('enableRemoveRows'));

            moveRowButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableRemoveRows'));

            moveRowButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableRemoveRows'));

            Y.Assert.isNull(Y.one('.layout-builder-remove-row-button'));
        },

        'should disable resize columns feature if user is moving a row': function() {
            Y.one('.layout-builder-move-cut-row-button').simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableResizeCols'));

            Y.Assert.isNull(Y.one('.layout-builder-resize-col-draggable-handle'));
        },

        'should disable resize columns feature if user is moving a column': function() {
            Y.one('.layout-builder-move-cut-col-button').simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableResizeCols'));

            Y.Assert.isNull(Y.one('.layout-builder-resize-col-draggable-handle'));
        },

        'should enable resize columns feature if user stops moving a column': function() {
            var moveColButton = Y.one('.layout-builder-move-cut-col-button');

            moveColButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableResizeCols'));

            moveColButton.simulate('click');
            Y.Assert.isTrue(this.layoutBuilder.get('enableResizeCols'));

            Y.Assert.isNotNull(Y.one('.layout-builder-resize-col-draggable-handle'));
        },

        'should enable resize columns feature if user stops moving a row': function() {
            var moveRowButton = Y.one('.layout-builder-move-cut-row-button');

            moveRowButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableResizeCols'));

            moveRowButton.simulate('click');
            Y.Assert.isTrue(this.layoutBuilder.get('enableResizeCols'));

            Y.Assert.isNotNull(Y.one('.layout-builder-resize-col-draggable-handle'));
        },

        'should not enable resize columns feature if user stops moving a column if that was disabled previously': function() {
            var moveRowButton = Y.one('.layout-builder-move-cut-col-button');

            this.layoutBuilder.set('enableResizeCols', false);
            Y.Assert.isFalse(this.layoutBuilder.get('enableResizeCols'));

            moveRowButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableResizeCols'));

            moveRowButton.simulate('click');
            Y.Assert.isFalse(this.layoutBuilder.get('enableResizeCols'));

            Y.Assert.isNull(Y.one('.layout-builder-resize-col-draggable-handle'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout-builder', 'aui-classnamemanager', 'node-event-simulate'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
