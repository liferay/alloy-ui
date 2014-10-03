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

        'should add a col to a row when click on add col button': function() {
            var addColButton,
                col,
                layout;

            this._createLayoutBuilder();

            col = Y.one('.col-sm-6');
            col.simulate('mouseover');
            addColButton = col.one('.layout-add-col');
            addColButton.simulate('click');

            layout = this._layoutBuilder.get('layout');
            Y.Assert.areEqual(layout.get('rows')[0].get('cols').length, 3);
        },

        'should not append addCol button if row alreay has the maximum number of cols': function() {
            var col;

            this._createLayoutBuilder();

            col = Y.one('.col-sm-3');
            col.simulate('mouseover');

            Y.Assert.isNull(col.one('.layout-add-col'));
        },

        'should not add col if enableAddCol is false': function() {
            var addColButton,
                col;

            this._createLayoutBuilder({
                enableAddCols: false
            });

            col = Y.one('.col-sm-6');
            col.simulate('mouseover');

            addColButton = col.one('.layout-add-col');
            Y.Assert.isNull(addColButton);
        },

        'should enable/disable adding columns dynamically': function() {
            var addColButton,
                col,
                layout;

            this._createLayoutBuilder();

            col = Y.one('.col-sm-6');

            this._layoutBuilder.set('enableAddCols', false);

            col.simulate('mouseover');
            addColButton = col.one('.layout-add-col');
            Y.Assert.isNull(addColButton);

            this._layoutBuilder.set('enableAddCols', true);

            col.simulate('mouseover');
            addColButton = col.one('.layout-add-col');
            Y.Assert.isNotNull(addColButton);

            addColButton.simulate('click');
            layout = this._layoutBuilder.get('layout');
            Y.Assert.areEqual(layout.get('rows')[0].get('cols').length, 3);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-layout-builder', 'node-event-simulate', 'test']
});
