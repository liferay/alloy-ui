YUI.add('aui-layout-builder-add-row-tests', function(Y) {

    var Assert = Y.Assert,
        container,
        layout,
        suite = new Y.Test.Suite('aui-layout-builder-add-row');

    suite.add(new Y.Test.Case({
        name: 'Layout Builder Add Row Tests',

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

        'should add a new row when click on add new row button': function() {
            var button = container.one('.layout-builder-add-row-button'),
                rows = container.all('.row');

            Assert.areEqual(1, rows.size());

            button.simulate('click');

            rows = container.all('.row');

            Assert.areEqual(2, rows.size());
        },

        'should hide add row button if disable enableAddRows attribute': function() {
            var button = container.one('.layout-builder-add-row-button');

            Assert.isNotNull(button);

            this.layoutBuilder.set('enableAddRows', false);

            button = container.one('.layout-builder-add-row-button');

            Assert.isNull(button);
        },

        'should disable enableAddRows attribute when creating the layout builder': function() {
            var button;

            this.layoutBuilder.destroy();

            this.layoutBuilder = new Y.LayoutBuilder({
                container: Y.one('.container'),
                enableAddRows: false,
                layout: layout
            });

            button = container.one('.layout-builder-add-row-button');

            Assert.isNull(button);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout-builder', 'aui-classnamemanager', 'node-event-simulate']
});
