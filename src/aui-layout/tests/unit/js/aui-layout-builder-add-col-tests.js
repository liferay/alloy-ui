YUI.add('aui-layout-builder-add-col-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-layout-builder-add-col');

    suite.add(new Y.Test.Case({
        name: 'Layout Builder Add Col Tests',

        tearDown: function() {
            if (this._layoutBuilder) {
                this._layoutBuilder.destroy();
            }
        },

        _createLayoutBuilder: function() {
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
            this._layoutBuilder = new Y.LayoutBuilder({
                container: Y.one('.container'),
                layout: layout
            });
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
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-layout-builder', 'node-event-simulate', 'test']
});
