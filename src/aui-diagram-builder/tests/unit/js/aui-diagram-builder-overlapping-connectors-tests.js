YUI.add('aui-diagram-builder-overlapping-connectors-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-diagram-builder');

    var rectOverlap = function(rec1, rec2) {
        var rectangle1 = {
            x: rec1.offsetLeft,
            xMax: rec1.offsetLeft + rec1.clientWidth,
            y: rec1.offsetTop,
            yMax: rec1.offsetTop + rec1.clientHeight
        };
        var rectangle2 = {
            x: rec2.offsetLeft,
            xMax: rec2.offsetLeft + rec2.clientWidth,
            y: rec2.offsetTop,
            yMax: rec2.offsetTop + rec2.clientHeight
        };

        var xOverlap = Math.max(0, Math.min(rectangle1.xMax, rectangle2.xMax) - Math.max(rectangle1.x, rectangle2.x));
        var yOverlap = Math.max(0, Math.min(rectangle1.yMax, rectangle2.yMax) - Math.max(rectangle1.y, rectangle2.y));

        if (xOverlap > 0 && yOverlap > 0) {
            return true;
        } else {
            return false;
        }
    }

    suite.add(new Y.Test.Case({
        name: 'DiagramBuilderConnector',

        'check for any interconnected connectors': function() {

            var diagramBuilder = new Y.DiagramBuilder({
                availableFields: [],
                boundingBox: '#diagramBuilder',
                fields: [
                    {
                        name: 'Start',
                        type: 'condition',
                        xy: [100, 100]
                    },
                    {
                        name: 'End',
                        type: 'condition',
                        xy: [250, 100]
                    }
                ]
            }).render();

            diagramBuilder.connectAll([
                {
                    connector: {
                        name: 'link test 1'
                    },
                    source: 'Start',
                    target: 'End'
                },
                {
                    connector: {
                        name: 'link test 2'
                    },
                    source: 'End',
                    target: 'Start'
                }
            ]);

            var hasOverlapping = false;

            diagramBuilder.eachConnector(function(connector) {
                if (connector.hasConnectorsInterconnected()) {
                    hasOverlapping = true;
                }
            });

            Y.Assert.areEqual(hasOverlapping, true);
        },

        'check if the connectors are not visually overlapping the quadrant 0 and 4': function() {

            var diagramBuilder2 = new Y.DiagramBuilder({
                availableFields: [],
                boundingBox: '#diagramBuilder',
                fields: [
                    {
                        name: 'Start2',
                        type: 'condition',
                        xy: [100, 100]
                    },
                    {
                        name: 'End2',
                        type: 'condition',
                        xy: [300, 300]
                    }
                ]
            }).render();

            diagramBuilder2.connectAll([
                {
                    connector: {
                        name: 'Link test 1'
                    },
                    source: 'Start2',
                    target: 'End2'
                },
                {
                    connector: {
                        name: 'Link1 test 2'
                    },
                    source: 'End2',
                    target: 'Start2'
                }
            ]);

            var hasOverlapping = false;
            var connectors = [];

            diagramBuilder3.eachConnector(function(connector) {
                var _connector = connector.get('nodeName')._node;

                connectors.push(_connector);
            });

            hasOverlapping = rectOverlap(connectors[0], connectors[1]);

            Y.Assert.areEqual(hasOverlapping, false);
        },

        'check if the connectors are not visually overlapping the quadrant 1 and 3': function() {

            var diagramBuilder3 = new Y.DiagramBuilder({
                availableFields: [],
                boundingBox: '#diagramBuilder',
                fields: [
                    {
                        name: 'Start3',
                        type: 'condition',
                        xy: [100, 100]
                    },
                    {
                        name: 'End3',
                        type: 'condition',
                        xy: [300, 350]
                    }
                ]
            }).render();

            diagramBuilder3.connectAll([
                {
                    connector: {
                        name: 'Link test 1'
                    },
                    source: 'Start3',
                    target: 'End3'
                },
                {
                    connector: {
                        name: 'Link1 test 2'
                    },
                    source: 'End3',
                    target: 'Start3'
                }
            ]);

            var hasOverlapping = false;
            var connectors = [];

            diagramBuilder4.eachConnector(function(connector) {
                var _connector = connector.get('nodeName')._node;

                connectors.push(_connector);
            });

            hasOverlapping = rectOverlap(connectors[0], connectors[1]);

            Y.Assert.areEqual(hasOverlapping, false);
        },

        'check if the connectors are not visually overlapping the quadrant 2 and 2': function() {

            var diagramBuilder4 = new Y.DiagramBuilder({
                availableFields: [],
                boundingBox: '#diagramBuilder',
                fields: [
                    {
                        name: 'Start4',
                        type: 'condition',
                        xy: [100, 100]
                    },
                    {
                        name: 'End4',
                        type: 'condition',
                        xy: [100, 400]
                    }
                ]
            }).render();

            diagramBuilder4.connectAll([
                {
                    connector: {
                        name: 'Link test 1'
                    },
                    source: 'Start4',
                    target: 'End4'
                },
                {
                    connector: {
                        name: 'Link1 test 2'
                    },
                    source: 'End4',
                    target: 'Start4'
                }
            ]);

            var hasOverlapping = false;
            var connectors = [];

            diagramBuilder5.eachConnector(function(connector) {
                var _connector = connector.get('nodeName')._node;

                connectors.push(_connector);
            });

            hasOverlapping = rectOverlap(connectors[0], connectors[1]);

            Y.Assert.areEqual(hasOverlapping, false);
        },
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: [
        'aui-diagram-builder',
        'aui-diagram-builder-connector',
        'node-event-simulate',
        'test'
    ]
});
