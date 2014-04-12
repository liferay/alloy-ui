YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder');

    var diagramBuilder = new Y.DiagramBuilder({
        availableFields: [],
        boundingBox: '#diagramBuilder',
        fields: [
            {
                name: 'Start0',
                type: 'start',
                xy: [10, 10]
            },
            {
                name: 'EndNode0',
                type: 'end',
                xy: [600, 250]
            }
        ]
    }).render();

    diagramBuilder.connectAll([
        {
            connector: {
                name: 'Link0'
            },
            source: 'Start0',
            target: 'EndNode0'
        }
    ]);

    suite.add(new Y.Test.Case({
        name: 'DiagramBuilder',
        'test connectors offset after introducing changes on the page': function() {
            var fields = diagramBuilder.get('fields'),
                startNode = fields.item(0),
                transition = startNode.get('transitions').values()[0],
                connector = startNode.getConnector(transition);

            var startP1 = connector.get('p1'),
                startP2 = connector.get('p2');

            var largeContent = Y.Node.create(
                '<div style="height: 200px; width: 100px; border: 1px solid">Large Content</div>');

            largeContent.prependTo(document.body);

            diagramBuilder.syncUI();

            var endP1 = connector.get('p1'),
                endP2 = connector.get('p2');

            Y.Assert.areNotEqual(startP1, endP1);
            Y.Assert.areNotEqual(startP2, endP2);

            largeContent.remove();
        },

        'test delete connector when pressing delete key': function() {
            var fields = diagramBuilder.get('fields'),
                startNode = fields.item(0),
                transition = startNode.get('transitions').values()[0],
                connector = startNode.getConnector(transition);

            var tmpConfirmFn = window.confirm;

            window.confirm = function() {
                return true;
            };

            connector.set('selected', true);

            Y.getDoc().simulate("keydown", {
                keyCode: 8
            });
            Y.getDoc().simulate("keydown", {
                keyCode: 46
            });

            Y.Assert.isFalse(startNode.isTransitionConnected(transition));

            window.confirm = tmpConfirmFn;

            // Reconnect in case other test cases need it
            diagramBuilder.connectAll([
                {
                    connector: connector,
                    source: startNode,
                    target: fields.item(1)
                }
            ]);
        },

        /**
         * @tests AUI-1158
         */
        'assert connector does not jump after scroll and mouseover': function() {
            var end,
                start;

            var lines = Y.all('path').get('nodes');

            Y.Array.each(
                lines,
                function(item, index, collection) {
                    width = item.attr('width');

                    if (width) {
                        start = item.attr('d');

                        item.simulate('mouseout');

                        end = item.attr('d');

                        Y.Assert.areEqual(start, end);
                    }
                }
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-diagram-builder', 'node-event-simulate']
});
