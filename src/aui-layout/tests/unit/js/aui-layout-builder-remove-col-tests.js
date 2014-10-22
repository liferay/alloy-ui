YUI.add('aui-layout-builder-remove-col-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-layout-builder-remove-col');

    suite.add(new Y.Test.Case({
        name: 'Layout Builder Remove Col Tests',

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
                    })
                ]
            });
            this._layoutBuilder = new Y.LayoutBuilder(Y.merge({
                container: Y.one('.container'),
                layout: layout
            }, config));
        },

        'should remove a col when click on remove col button': function() {
            var col,
                deleteColButton,
                layout;

            this._createLayoutBuilder();

            col = Y.one('.col-sm-6');
            deleteColButton = col.one('.layout-builder-remove-col-button');
            deleteColButton.simulate('click');

            layout = this._layoutBuilder.get('layout');
            Y.Assert.areEqual(layout.get('rows')[0].get('cols').length, 1);
        },

        'should add remove col buttons when rows change': function() {
            var rowNode;

            this._createLayoutBuilder();

            this._layoutBuilder.get('layout').addRow(0, new Y.LayoutRow({
                cols: [
                    new Y.LayoutCol({
                        size: 4
                    }),
                    new Y.LayoutCol({
                        size: 4
                    }),
                    new Y.LayoutCol({
                        size: 4
                    })
                ]
            }));
            rowNode = this._layoutBuilder.get('layout').get('rows')[0].get('node');

            Y.Assert.areEqual(3, rowNode.all('.layout-builder-remove-col-button').size());
        },

        'should not add remove col button if enableRemoveCol is false': function() {
            var col,
                deleteColButton;

            this._createLayoutBuilder({
                enableRemoveCols: false
            });

            col = Y.one('.col-sm-6');

            deleteColButton = col.one('.layout-builder-remove-col-button');
            Y.Assert.isNull(deleteColButton);
        },

        'should enable/disable removing columns dynamically': function() {
            var col,
                deleteColButton,
                layout;

            this._createLayoutBuilder();

            col = Y.one('.col-sm-6');

            this._layoutBuilder.set('enableRemoveCols', false);

            deleteColButton = col.one('.layout-builder-remove-col-button');
            Y.Assert.isNull(deleteColButton);

            this._layoutBuilder.set('enableRemoveCols', true);

            deleteColButton = col.one('.layout-builder-remove-col-button');
            Y.Assert.isNotNull(deleteColButton);

            deleteColButton.simulate('click');
            layout = this._layoutBuilder.get('layout');
            Y.Assert.areEqual(layout.get('rows')[0].get('cols').length, 1);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-layout-builder', 'node-event-simulate', 'test']
});
