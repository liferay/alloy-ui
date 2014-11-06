YUI.add('aui-layout-builder-add-row-tests', function(Y) {

    var Assert = Y.Assert,
        container,
        layout,
        layoutBuilder,
        suite = new Y.Test.Suite('aui-layout-builder-add-row');

    function createALotOfRows() {
        var i,
            rows = [];

        layoutBuilder.destroy();

        for (i = 0; i < 15; i++) {
            rows.push(new Y.LayoutRow({
                    cols: [
                        new Y.LayoutCol({
                            value: { content: 'foo' },
                            size: 3
                        }),
                        new Y.LayoutCol({
                            value: { content: 'foo' },
                            size: 3
                        }),
                        new Y.LayoutCol({
                            value: { content: 'foo' },
                            size: 6
                        })
                    ]
                })
            );
        }

        layoutBuilder = new Y.LayoutBuilder({
            container: Y.one('.container'),
            layout: new Y.Layout({
                rows: rows
            })
        });
    }

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

            layoutBuilder = new Y.LayoutBuilder({
                container: Y.one('.container'),
                layout: layout
            });

            container = layoutBuilder.get('container');
        },

        tearDown: function() {
            layoutBuilder.destroy();
        },

        'should add a new row when click on add new row area': function() {
            var addNewRowArea = container.one('.layout-builder-add-row-choose-row'),
                rows = container.all('.row');

            Assert.areEqual(1, rows.size());

            addNewRowArea.simulate('click');

            rows = container.all('.row');

            Assert.areEqual(2, rows.size());
        },

        'should hide add row button if disable enableAddRows attribute': function() {
            var addNewRowOption = container.one('.layout-builder-add-row-choose-row');

            Assert.isNotNull(addNewRowOption);

            layoutBuilder.set('enableAddRows', false);

            addNewRowOption = container.one('.layout-builder-add-row-button');

            Assert.isNull(addNewRowOption);
        },

        'should disable enableAddRows attribute when creating the layout builder': function() {
            var button;

            layoutBuilder.destroy();

            layoutBuilder = new Y.LayoutBuilder({
                container: Y.one('.container'),
                enableAddRows: false,
                layout: layout
            });

            button = container.one('.layout-builder-add-row-button');

            Assert.isNull(button);
        },

        'should create an area to select the new row': function() {
            var addRowArea = container.one('.layout-builder-add-row-area');

            Assert.isNotNull(addRowArea);
        },

        'should create add row options depending on maximumColsForNewRows attribute': function() {
            var addRowArea = container.all('.layout-builder-add-row-choose-row'),
                maximumColsForNewRows = layoutBuilder.get('maximumColsForNewRows');

            Assert.areEqual(maximumColsForNewRows, addRowArea.size());
        },

        'should be able to have diffent cols\' size options for new rows': function() {
            var addNewRowOption = container.one('.layout-builder-add-row-choose-row');

            Assert.areEqual(4, layoutBuilder.get('layout').get('rows')[0].get('cols').length);

            addNewRowOption.simulate('click');

            Assert.areEqual(1, layoutBuilder.get('layout').get('rows')[1].get('cols').length);

            addNewRowOption = container.all('.layout-builder-add-row-choose-row').last();
            addNewRowOption.simulate('click');

            Assert.areEqual(1, layoutBuilder.get('layout').get('rows')[1].get('cols').length);
        },

        'should change add row area position depending upon the scroll position': function() {
            createALotOfRows();

            Assert.areEqual('fixed', Y.one('.layout-builder-add-row-area').getStyle('position'));

            Y.config.win.scroll(0, 10);

            this.wait(function() {
                Assert.areEqual('fixed', Y.one('.layout-builder-add-row-area').getStyle('position'));
            }, 100);
        },

        'should change add row area position to relative if scroll beyond the height of layoutContainer': function() {
            createALotOfRows();

            Y.config.win.scroll(0, Y.one('body').get('region').height);

            this.wait(function() {
                Assert.areEqual('relative', Y.one('.layout-builder-add-row-area').getStyle('position'));
            }, 100);
        },

        'should ': function() {
            var body = Y.config.doc.body,
                instance = this,
                topDistance;

            createALotOfRows();

            Y.config.win.scrollTo(0, body.getBoundingClientRect().height);

            this.wait(function() {
                topDistance = body.getBoundingClientRect().top;

                instance.wait(function() {
                    Y.config.win.scrollBy(0, - 10);
                    Assert.areEqual(topDistance + 10, body.getBoundingClientRect().top);
                }, 100);

            }, 100);
        },

        'should add a new row when key press on any option': function() {
            var createNewRowButton = Y.one('.layout-builder-add-row-choose-row');

            Assert.areEqual(1, layout.get('rows').length);

            createNewRowButton.simulate('keypress', { keyCode: 13 });

            Assert.areEqual(2, layout.get('rows').length);
        },

        'should change add row area on smartphones': function() {
            var addRowArea = Y.one('.layout-builder-add-row-area'),
                addRowSmartphoneArea = Y.one('.layout-builder-add-row-smartphone-area');

            Y.Assert.isNotNull(addRowArea);
            Y.Assert.isNull(addRowSmartphoneArea);

            layoutBuilder._isColumnModeEnabled = false;
            layoutBuilder.fire('columnModeChange');

            addRowArea = Y.one('.layout-builder-add-row-area');
            addRowSmartphoneArea = Y.one('.layout-builder-add-row-smartphone-area');

            Y.Assert.isNull(addRowArea);
            Y.Assert.isNotNull(addRowSmartphoneArea);
        },

        'should not append add row area when change column mode if enableAddRows attribute is false': function() {
            var addRowArea,
                addRowSmartphoneArea;

            layoutBuilder.set('enableAddRows', false);

            addRowArea = Y.one('.layout-builder-add-row-area'),
            addRowSmartphoneArea = Y.one('.layout-builder-add-row-smartphone-area');

            Y.Assert.isNull(addRowArea);
            Y.Assert.isNull(addRowSmartphoneArea);

            layoutBuilder._isColumnModeEnabled = false;
            layoutBuilder.fire('columnModeChange');

            addRowArea = Y.one('.layout-builder-add-row-area');
            addRowSmartphoneArea = Y.one('.layout-builder-add-row-smartphone-area');

            Y.Assert.isNull(addRowArea);
            Y.Assert.isNull(addRowSmartphoneArea);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-layout-builder', 'aui-classnamemanager', 'node-event-simulate']
});
