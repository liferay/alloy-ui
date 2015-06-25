YUI.add('aui-layout-builder-remove-row-tests', function(Y) {

    var Assert = Y.Assert,
        container,
        layout,
        suite = new Y.Test.Suite('aui-layout-builder-remove-row');

    suite.add(new Y.Test.Case({
        name: 'Layout Builder Remove Row Tests',

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
                    new Y.LayoutRow()
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

        'should add remove button for each row': function() {
            var removeButtons = container.all('.layout-builder-remove-row-button');

            Assert.areEqual(2, removeButtons.size());
        },

        'should update buttons after layout changes': function() {
            var removeButtons;

            this.layoutBuilder.set('layout', new Y.Layout({
                rows: [
                    new Y.LayoutRow(),
                    new Y.LayoutRow(),
                    new Y.LayoutRow()
                ]
            }));

            removeButtons = container.all('.layout-builder-remove-row-button');
            Assert.areEqual(3, removeButtons.size());
        },

        'should update buttons after layout rows change': function() {
            var removeButtons;

            this.layoutBuilder.get('layout').addRow(new Y.LayoutRow());

            removeButtons = container.all('.layout-builder-remove-row-button');
            Assert.areEqual(3, removeButtons.size());
        },

        'should remove a new row when click on remove row button': function() {
            var button = container.one('.layout-builder-remove-row-button'),
                rows = container.all('.row');

            Assert.areEqual(2, rows.size());

            button.simulate('click');

            rows = container.all('.row');

            Assert.areEqual(1, rows.size());
        },

        'should hide remove row button if disable enableRemoveRows attribute': function() {
            var button = container.one('.layout-builder-remove-row-button');

            Assert.isNotNull(button);

            this.layoutBuilder.set('enableRemoveRows', false);

            button = container.one('.layout-builder-remove-row-button');

            Assert.isNull(button);
        },

        'should disable enableRemoveRows attribute when creating the layout builder': function() {
            var button;

            this.layoutBuilder.destroy();

            this.layoutBuilder = new Y.LayoutBuilder({
                container: Y.one('.container'),
                enableRemoveRows: false,
                layout: layout
            });

            button = container.one('.layout-builder-remove-row-button');

            Assert.isNull(button);
        },

        'should remove a row on remove button clicked only if `clickRemoveRow` attribute returns true': function() {
            var layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow(),
                    new Y.LayoutRow()
                ]
            });

            this.layoutBuilder.set('layout', layout);

            Assert.areEqual(2, Y.all('.layout-row-container-row').size());

            Y.one('.layout-builder-remove-row-button').simulate('click');
            Assert.areEqual(1, Y.all('.layout-row-container-row').size());

            this.layoutBuilder.set('clickRemoveRow', function() { return false; });

            Y.one('.layout-builder-remove-row-button').simulate('click');
            Assert.areEqual(1, Y.all('.layout-row-container-row').size());

            this.layoutBuilder.set('clickRemoveRow', function() { return true; });

            Y.one('.layout-builder-remove-row-button').simulate('click');
            Assert.areEqual(0, Y.all('.layout-row-container-row').size());
        },

        'should not add remove row button if a row is not removable': function() {
            var layout = new Y.Layout({
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
                        removable: false
                    })
                ]
            });

            this.layoutBuilder.set('layout', layout);

            Assert.isNull(Y.one('.layout-builder-remove-row-button'));
        },

        'should add or remove remove row button when change row\'s removable attribute': function() {
            var deleteRowButton,
                row = Y.one('.row');

            row.getData('layout-row').set('removable', false);

            deleteRowButton = row.previous('.layout-builder-remove-row-button');
            Y.Assert.isNull(deleteRowButton);

            row.getData('layout-row').set('removable', true);

            deleteRowButton = row.previous('.layout-builder-remove-row-button');
            Y.Assert.isNotNull(deleteRowButton);

            this.layoutBuilder.set('enableRemoveRows', false);

            row.getData('layout-row').set('removable', false);

            deleteRowButton = row.previous('.layout-builder-remove-row-button');
            Y.Assert.isNull(deleteRowButton);
        },

        'should remove remove row feature on smartphones': function() {
            var removeRowButton = Y.one('.layout-builder-remove-row-button');

            Y.Assert.isNotNull(removeRowButton);

            layout._set('isColumnMode', false);

            removeRowButton = Y.one('.layout-builder-remove-row-button');

            Y.Assert.isNull(removeRowButton);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout-builder', 'aui-classnamemanager', 'node-event-simulate'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
