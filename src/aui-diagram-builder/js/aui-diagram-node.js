var DiagramNode,

    adjustDiagramNodeOffset = function(diagramNode, offsetXY) {
        var dnXY = A.Lang.isArray(diagramNode) ? diagramNode : diagramNode.get('boundingBox').getXY();

        return [dnXY[0] + offsetXY[0], dnXY[1] + offsetXY[1]];
    },

    pythagoreanDistance = function(p1, p2) {
        var dx = p2[0] - p1[0],
            dy = p2[1] - p1[1];

        return Math.sqrt(dx * dx + dy * dy);
    },

    findHotPointBestMatch = function(diagramNode1, diagramNode2) {
        var hp1 = diagramNode1.hotPoints,
            hp2 = diagramNode2.hotPoints,
            xy1 = diagramNode1.get('boundingBox').getXY(),
            xy2 = diagramNode2.get('boundingBox').getXY(),
            len1, len2, i, j, minDistance = Infinity,
            match = [[0, 0], [0, 0]];

        for (i = 0, len1 = hp1.length; i < len1; i++) {
            var value1 = hp1[i],
                adjustedValue1 = adjustDiagramNodeOffset(xy1, value1);

            for (j = 0, len2 = hp2.length; j < len2; j++) {
                var value2 = hp2[j],
                    adjustedValue2 = adjustDiagramNodeOffset(xy2, value2),
                    distance = pythagoreanDistance(adjustedValue2, adjustedValue1);

                if (distance < minDistance) {
                    match[0] = value1;
                    match[1] = value2;
                    minDistance = distance;
                }
            }
        }

        return match;
    },

    isDiagramBuilder = function(val) {
        return A.instanceOf(val, A.PropertyBuilder);
    },

    isMap = function(val) {
        return A.instanceOf(val, A.Map);
    },

    CSS_DB_CONTROLS = A.getClassName('diagram', 'builder', 'controls'),
    CSS_DIAGRAM_NODE = A.getClassName('diagram', 'node'),
    CSS_DIAGRAM_NODE_LABEL = A.getClassName('diagram', 'node', 'label'),
    CSS_DIAGRAM_NODE_SELECTED = A.getClassName('diagram', 'node', 'selected'),
    CSS_DIAGRAM_NODE_SHAPE_BOUNDARY = A.getClassName('diagram', 'node', 'shape', 'boundary');

/**
 * A base class for DiagramNode.
 *
 * @class A.DiagramNode
 * @extends Overlay
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
DiagramNode = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-node',

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['highlighted', 'name', 'required', 'selected'],

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DiagramNode`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Stores an instance of `A.PropertyBuilder`.
         *
         * @attribute builder
         * @type DiagramBuilder
         */
        builder: {
            validator: isDiagramBuilder
        },

        /**
         * A map of connectors.
         *
         * @attribute connectors
         * @writeOnce
         */
        connectors: {
            valueFn: '_connectorsValueFn',
            writeOnce: true
        },

        /**
         * A toolbar to represent controls.
         *
         * @attribute controlsToolbar
         * @type Object
         */
        controlsToolbar: {
            validator: A.Lang.isObject,
            valueFn: '_controlsToolbarValueFn'
        },

        /**
         * The description of the node.
         *
         * @attribute description
         * @default ''
         * @type String
         */
        description: {
            value: '',
            validator: A.Lang.isString
        },

        /**
         * Stores an instance of `A.Graphic`.
         *
         * @attribute graphic
         * @type Object
         * @writeOnce
         */
        graphic: {
            writeOnce: true,
            validator: A.Lang.isObject
        },

        /**
         * The height of the node.
         *
         * @attribute height
         * @default 60
         * @type Number
         */
        height: {
            value: 60
        },

        /**
         * Checks if a node is highlighted or not.
         *
         * @attribute highlighted
         * @default false
         * @type Boolean
         */
        highlighted: {
            validator: A.Lang.isBoolean,
            value: false
        },

        allowsLinking: {
            validator: A.Lang.isBoolean,
            value: true
        },

        /**
         * The name of the node.
         *
         * @attribute name
         * @type String
         */
        name: {
            valueFn: function() {
                var instance = this;

                return instance.get('type') + (++A.Env._uidx);
            },
            validator: A.Lang.isString
        },

        /**
         * Checks if a node is required or not.
         *
         * @attribute required
         * @default false
         * @type Boolean
         */
        required: {
            value: false,
            validator: A.Lang.isBoolean
        },

        /**
         * Checks if a node is selected or not.
         *
         * @attribute selected
         * @default false
         * @type Boolean
         */
        selected: {
            value: false,
            validator: A.Lang.isBoolean
        },

        /**
         * A graphic shape to represent a boundary.
         *
         * @attribute shapeBoundary
         * @type Object
         */
        shapeBoundary: {
            validator: A.Lang.isObject,
            valueFn: '_valueShapeBoundary'
        },

        /**
         * Represents a stroke to highlight a boundary.
         *
         * @attribute highlightBoundaryStroke
         * @type Object
         */
        highlightBoundaryStroke: {
            validator: A.Lang.isObject,
            value: {
                weight: 7,
                color: '#484B4C',
                opacity: 0.25
            }
        },

        /**
         * Configuration object to generate the shape invite graphic.
         *
         * @attribute shapeInvite
         * @type Object
         */
        shapeInvite: {
            validator: A.Lang.isObject,
            value: {
                radius: 12,
                type: 'circle',
                stroke: {
                    weight: 6,
                    color: '#ff6600',
                    opacity: 0.8
                },
                fill: {
                    color: '#ffd700',
                    opacity: 0.8
                }
            }
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            value: {
                closeMessage: 'Close',
                connectMessage: 'Connect',
                description: 'Description',
                editMessage: 'Edit',
                name: 'Name',
                type: 'Type'
            }
        },

        /**
         * Specify the tab order of elements.
         *
         * @attribute tabIndex
         * @default 1
         * @type Number
         */
        tabIndex: {
            value: 1
        },

        /**
         * Map of transitions that stores the uid, source and target data from
         * connectors.
         *
         * @attribute transitions
         * @default null
         * @writeOnce
         */
        transitions: {
            value: null,
            writeOnce: true,
            setter: '_setTransitions'
        },

        /**
         * The type of the node.
         *
         * @attribute type
         * @default 'node'
         * @type String
         */
        type: {
            value: 'node',
            validator: A.Lang.isString
        },

        /**
         * The width of the node.
         *
         * @attribute width
         * @default 60
         * @type Number
         */
        width: {
            value: 60
        },

        /**
         * Specify the stack order of elements.
         *
         * @attribute zIndex
         * @default 100
         * @type Number
         */
        zIndex: {
            value: 100
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.Overlay,

    /**
     * Coordinates to generate a circle graphic.
     *
     * @property CIRCLE_POINTS
     * @type Array
     * @static
     */
    CIRCLE_POINTS: [[35, 20], [28, 33], [14, 34], [5, 22], [10, 9], [24, 6], [34, 16], [31, 30], [18, 35], [6, 26], [
        7, 12], [20, 5], [33, 12], [34, 26], [22, 35], [9, 30], [6, 16], [16, 6], [30, 9], [35, 22], [26, 34], [
        12, 33], [5, 20], [12, 7], [26, 6], [35, 18], [30, 31], [16, 34], [6, 24], [9, 10], [22, 5], [34, 14], [
        33, 28], [20, 35], [7, 28], [6, 14], [18, 5], [31, 10], [34, 24], [24, 34], [10, 31], [5, 18], [14, 6], [
        28, 8], [35, 20], [28, 33], [14, 34], [5, 22], [10, 8], [25, 6], [34, 16], [31, 30], [18, 35], [6, 26], [
        8, 12], [20, 5], [33, 12], [33, 27], [22, 35], [8, 30], [6, 15], [16, 6], [30, 9], [35, 23], [26, 34], [
        12, 32], [5, 20], [12, 7], [27, 7], [35, 18], [29, 32], [15, 34]],

    /**
     * Coordinates to generate a diamond graphic.
     *
     * @property DIAMOND_POINTS
     * @type Array
     * @static
     */
    DIAMOND_POINTS: [[30, 5], [35, 10], [40, 15], [45, 20], [50, 25], [55, 30], [50, 35], [45, 40], [40, 45], [35,
        50], [30, 55], [25, 50], [20, 45], [15, 40], [10, 35], [5, 30], [10, 25], [15, 20], [20, 15], [25, 10]],

    /**
     * Coordinates to generate a square graphic.
     *
     * @property SQUARE_POINTS
     * @type Array
     * @static
     */
    SQUARE_POINTS: [[5, 5], [10, 5], [15, 5], [20, 5], [25, 5], [30, 5], [35, 5], [40, 5], [50, 5], [55, 5], [60, 5], [
        65, 5], [65, 10], [65, 15], [65, 20], [65, 25], [65, 30], [65, 35], [65, 40], [65, 45], [65, 50], [65,
        55], [65, 60], [65, 65], [60, 65], [55, 65], [50, 65], [45, 65], [40, 65], [35, 65], [30, 65], [25, 65], [
        20, 65], [15, 65], [10, 65], [5, 65], [5, 60], [5, 55], [5, 50], [5, 45], [5, 40], [5, 35], [5, 30], [5,
        25], [5, 20], [5, 15], [5, 10]],

    /**
     * Gets a node by its name.
     *
     * @method getNodeByName
     * @param name
     * @private
     */
    getNodeByName: function(name) {
        return A.Widget.getByNode('[data-nodeId=' + A.DiagramNode.buildNodeId(name) + ']');
    },

    /**
     * Gets the node top and left coordinates based on the container.
     *
     * @method getNodeCoordinates
     * @param container
     * @param node
     * @private
     */
    getNodeCoordinates: function(container, node) {
        var nodeXY = A.Lang.isArray(node) ? node : node.getXY();
        var containerXY = A.Lang.isArray(container) ? container : container.getXY();

        return A.Array.map(containerXY, function(val, i) {
            return Math.max(0, val - nodeXY[i]);
        });
    },

    /**
     * Constructs the node id string.
     *
     * @method buildNodeId
     * @param id
     * @private
     */
    buildNodeId: function(id) {
        return 'diagramNode' + '_' + 'field' + '_' + id.replace(/[^a-z0-9.:_\-]/ig, '_');
    },

    prototype: {
        LABEL_TEMPLATE: '<div class="' + CSS_DIAGRAM_NODE_LABEL + '">{label}</div>',

        boundary: null,

        hotPoints: [[0, 0]],

        CONTROLS_TEMPLATE: '<div class="' + CSS_DB_CONTROLS + '"></div>',

        SERIALIZABLE_ATTRS: ['description', 'name', 'required', 'type', 'width', 'height', 'zIndex', 'xy'],

        /**
         * Construction logic executed during DiagramNode instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.after({
                'map:remove': A.bind(instance._afterMapRemove, instance),
                render: instance._afterRender
            });

            instance.on({
                nameChange: instance._onNameChange
            });

            instance.publish({
                connectDrop: {
                    defaultFn: instance.connectDrop
                },
                connectEnd: {
                    defaultFn: instance.connectEnd
                },
                connectMove: {
                    defaultFn: instance.connectMove
                },
                connectOutTarget: {
                    defaultFn: instance.connectOutTarget
                },
                connectOverTarget: {
                    defaultFn: instance.connectOverTarget
                },
                connectStart: {
                    defaultFn: instance.connectStart
                },
                boundaryMouseEnter: {},
                boundaryMouseLeave: {}
            });

            instance.boundingBox = instance.get('boundingBox');
            instance.toolbarContainer = instance.get('toolbarContainer');

            instance.boundingBox.addClass(CSS_DIAGRAM_NODE + '-' + instance.get('type'));
            instance.boundingBox.setAttribute('draggable', true);
        },

        /**
         * Destructor lifecycle implementation for the `DiagramNode` class.
         * Lifecycle.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var instance = this;

            instance.eachConnector(function(connector, index, sourceNode) {
                sourceNode.removeTransition(connector.get('transition'));
            });

            instance.invite.destroy();
            instance.get('graphic').destroy();
            instance.get('builder').removeField(instance);
        },

        /**
         * Adds a transition into the node.
         *
         * @method addTransition
         * @param transition
         */
        addTransition: function(transition) {
            var instance = this,
                transitions = instance.get('transitions');

            transition = instance.prepareTransition(transition);

            if (!transitions.has(transition.uid)) {
                transition.uid = A.guid();
                transitions.put(transition.uid, transition);
            }

            return transition;
        },

        /**
         * Aligns a single transition.
         *
         * @method alignTransition
         * @param transition
         */
        alignTransition: function(transition) {
            var instance = this;
            var diagramNode = A.DiagramNode.getNodeByName(transition.target);

            if (diagramNode) {
                var bestMatch = findHotPointBestMatch(instance, diagramNode);

                transition = A.merge(transition, {
                    sourceXY: bestMatch[0],
                    targetXY: bestMatch[1]
                });

                instance.getConnector(transition).setAttrs({
                    p1: adjustDiagramNodeOffset(instance, transition.sourceXY),
                    p2: adjustDiagramNodeOffset(diagramNode, transition.targetXY)
                });
            }
        },

        /**
         * Aligns a collection of transitions.
         *
         * @method alignTransitions
         */
        alignTransitions: function() {
            var instance = this,
                transitions = instance.get('transitions');

            A.Array.each(transitions.values(), A.bind(instance.alignTransition, instance));
        },

        /**
         * Destroys this instance.
         *
         * @method close
         */
        close: function() {
            var instance = this;

            return instance.destroy();
        },

        /**
         * Checks if a transition is connected, if not creates a new
         * `A.Connector` instance.
         *
         * @method connect
         * @param transition
         * @param optConnector
         */
        connect: function(transition, optConnector) {
            var instance = this;

            transition = instance.addTransition(transition);

            var connector = null;
            var diagramNode = A.DiagramNode.getNodeByName(transition.target);

            if (diagramNode) {
                if (!instance.isTransitionConnected(transition)) {
                    var builder = instance.get('builder');
                    var bestMatch = findHotPointBestMatch(instance, diagramNode);

                    A.mix(transition, {
                        sourceXY: bestMatch[0],
                        targetXY: bestMatch[1]
                    });

                    connector = new A.Connector(
                        A.merge({
                            after: {
                                selectedChange: function() {
                                    instance.alignTransition(transition);
                                }
                            },
                            builder: builder,
                            graphic: builder.get('graphic'),
                            transition: transition
                        }, optConnector)
                    );

                    instance.get('connectors').put(transition.uid, connector);
                }
            }

            instance.alignTransition(transition);

            return connector;
        },

        /**
         * Calls the `connectNode` method with `publishedTarget` parameter.
         *
         * @method connectDrop
         * @param event
         */
        connectDrop: function(event) {
            var instance = this;

            instance.connectNode(event.publishedTarget);
        },

        /**
         * Handles the `connectEnd` event.
         *
         * @method connectEnd
         * @param event
         */
        connectEnd: function() {
            var instance = this;
            var builder = instance.get('builder');
            var publishedSource = builder.publishedSource;

            if (!builder.isAbleToConnect() &&
                builder.get('showSuggestConnector') &&
                builder.connector.get('visible')) {

                builder.showSuggestConnectorOverlay();
            }
            else {
                builder.connector.hide();
                publishedSource.invite.set('visible', false);
            }

            if (builder.get('highlightDropZones')) {
                builder.get('fields').each(function(diagramNode) {
                    diagramNode.set('highlighted', false);
                });
            }
        },

        /**
         * Sets the connector position based on the mouse X and Y positions.
         *
         * @method connectMove
         * @param event
         */
        connectMove: function(event) {
            var instance = this;
            var builder = instance.get('builder');
            var mouseXY = event.mouseXY;

            builder.connector.set('p2', mouseXY);

            if (builder.publishedTarget) {
                var invite = instance.invite;
                var offset = invite.get('radius') || 0;

                if (!invite.get('visible')) {
                    invite.set('visible', true);
                }

                invite.setXY([mouseXY[0] - offset, mouseXY[1] - offset]);
            }
        },

        /**
         * Prepares the transition and connects a node.
         *
         * @method connectNode
         * @param diagramNode
         */
        connectNode: function(diagramNode) {
            var instance = this;
            var dd = instance.boundaryDragDelegate.dd;

            instance.connect(
                instance.prepareTransition({
                    sourceXY: A.DiagramNode.getNodeCoordinates(dd.startXY, instance.get('boundingBox')),
                    target: diagramNode.get('name'),
                    targetXY: A.DiagramNode.getNodeCoordinates(dd.mouseXY, diagramNode.get('boundingBox'))
                })
            );
        },

        /**
         * Sets the `publishedTarget` attribute to null and hiddes the
         * `publishedSource`'s invite.
         *
         * @method connectOutTarget
         * @param event
         */
        connectOutTarget: function() {
            var instance = this;
            var builder = instance.get('builder');

            builder.publishedTarget = null;
            builder.publishedSource.invite.set('visible', false);
        },

        /**
         * If `publishedSource` is different from the current instance, sets the
         * `publishedTarget` to the current instance.
         *
         * @method connectOverTarget
         * @param event
         */
        connectOverTarget: function() {
            var instance = this;
            var builder = instance.get('builder');

            if (builder.publishedSource !== instance) {
                builder.publishedTarget = instance;
            }
        },

        /**
         * Highlights each diagram node and fires a `publishedSource` event.
         *
         * @method connectStart
         * @param event
         */
        connectStart: function(event) {
            var instance = this;
            var builder = instance.get('builder');

            builder.connector.show().set('p1', event.startXY);

            if (builder.get('highlightDropZones')) {
                builder.get('fields').each(function(diagramNode) {
                    diagramNode.set('highlighted', true);
                });
            }

            A.DiagramNodeManager.fire('publishedSource', {
                publishedSource: instance
            });
        },

        /**
         * Checks if a transition is connected, if yes removes the transition.
         *
         * @method disconnect
         * @param transition
         */
        disconnect: function(transition) {
            var instance = this;

            if (instance.isTransitionConnected(transition)) {
                instance.removeTransition(transition);
            }
        },

        /**
         * An utility function to loop through all connectors.
         *
         * @method eachConnector
         * @param fn
         */
        eachConnector: function(fn) {
            var instance = this,
                sourceNodes = [],
                connectors = [].concat(instance.get('connectors').values()),
                tIndex = connectors.length;

            A.Array.each(instance.get('builder').getSourceNodes(instance), function(sourceNode) {
                var sourceConnectors = sourceNode.get('connectors');

                A.Array.each(sourceConnectors.values(), function(connector) {
                    if (instance.get('name') === connector.get('transition').target) {
                        sourceNodes.push(sourceNode);
                        connectors.push(connector);
                    }
                });
            });

            A.Array.each(connectors, function(connector, index) {
                fn.call(instance, connector, index, (index < tIndex) ? instance : sourceNodes[index - tIndex]);
            });

            connectors = sourceNodes = null;

            return connectors;
        },

        /**
         * Returns a connector based on the transition uid.
         *
         * @method getConnector
         * @param transition
         */
        getConnector: function(transition) {
            var instance = this;

            return instance.get('connectors').getValue(transition.uid);
        },

        /**
         * Returns the `dropContainer` or bounding box's parent node.
         *
         * @method getContainer
         */
        getContainer: function() {
            var instance = this;

            return (instance.get('builder').dropContainer || instance.get('boundingBox').get('parentNode'));
        },

        /**
         * Returns the left and top positions of a node based in its container.
         *
         * @method getNodeCoordinates
         */
        getNodeCoordinates: function() {
            var instance = this;

            return A.DiagramNode.getNodeCoordinates(instance.get('boundingBox'), instance.getContainer());
        },

        /**
         * Gets the list of properties from the property model.
         *
         * @method getProperties
         * @return {Array}
         */
        getProperties: function() {
            var instance = this;
            var propertyModel = instance.getPropertyModel();

            A.Array.each(propertyModel, function(property) {
                var value = instance.get(property.attributeName),
                    type = A.Lang.type(value);

                if (type === 'boolean') {
                    value = String(value);
                }

                property.value = value;
            });

            return propertyModel;
        },

        /**
         * Gets the model defition of a property.
         *
         * @method getPropertyModel
         * @return {Array}
         */
        getPropertyModel: function() {
            var instance = this;
            var strings = instance.getStrings();

            return [{
                attributeName: 'description',
                editor: new A.TextAreaCellEditor(),
                name: strings.description
            }, {
                attributeName: 'name',
                editor: new A.TextCellEditor({
                    validator: {
                        rules: {
                            value: {
                                required: true
                            }
                        }
                    }
                }),
                name: strings.name
            }, {
                attributeName: 'type',
                editor: false,
                name: strings.type
            }];
        },

        /**
         * Checks if boundary is draggable.
         *
         * @method isBoundaryDrag
         * @param drag
         * @return {Boolean}
         */
        isBoundaryDrag: function(drag) {
            var instance = this;

            return (drag === instance.boundaryDragDelegate.dd);
        },

        /**
         * Checks if a connector has an transition uid property.
         *
         * @method isTransitionConnected
         * @param transition
         */
        isTransitionConnected: function(transition) {
            var instance = this;

            return instance.get('connectors').has(transition.uid);
        },

        /**
         * Builds the transition configuration object.
         *
         * @method prepareTransition
         * @param val
         */
        prepareTransition: function(val) {
            var instance = this,
                target = val,
                transition;

            if (A.Lang.isObject(val)) {
                target = val.target;
            }

            A.Array.some(
                instance.get('transitions').values(),
                function(t) {
                    transition = (target === t.target) ? t : null;

                    return transition;
                }
            );

            if (!transition) {
                transition = {
                    source: instance.get('name'),
                    target: null,
                    uid: A.guid()
                };

                if (A.Lang.isString(val)) {
                    transition.target = val;
                }
                else if (A.Lang.isObject(val)) {
                    transition = A.merge(transition, val);
                }
            }

            return transition;
        },

        /**
         * Removes the transition uid from a transition.
         *
         * @method removeTransition
         * @param transition
         */
        removeTransition: function(transition) {
            var instance = this;

            return instance.get('transitions').remove(transition.uid);
        },

        /**
         * Renders the `shapeBoundary` attribute.
         *
         * @method renderShapeBoundary
         */
        renderShapeBoundary: function() {
            var instance = this;

            var boundary = instance.boundary =
                instance.get('graphic').addShape(instance.get('shapeBoundary'));

            return boundary;
        },

        /**
         * Renders the `shapeInvite` attribute.
         *
         * @method renderShapeInvite
         */
        renderShapeInvite: function() {
            var instance = this;

            var invite = instance.invite =
                instance.get('builder').get('graphic').addShape(instance.get('shapeInvite'));

            invite.set('visible', false);

            return invite;
        },

        /**
         * Syncs the connections in the UI.
         *
         * @method syncConnectionsUI
         */
        syncConnectionsUI: function() {
            var instance = this,
                transitions = instance.get('transitions');

            A.Array.each(transitions.values(), function(transition) {
                instance.connect(transition, transition.connector);
            });
        },

        /**
         * Fires after a connector has been removed.
         *
         * @method _afterConnectorRemove
         * @param event
         * @protected
         */
        _afterConnectorRemove: function(event) {
            event.value.destroy();
        },

        /**
         * Fires after render is executed.
         *
         * @method _afterRender
         * @param event
         * @protected
         */
        _afterRender: function() {
            var instance = this;

            instance.setStdModContent(A.WidgetStdMod.BODY, '', A.WidgetStdMod.AFTER);
            instance._renderGraphic();
            instance._renderControls();
            instance._renderLabel();
            instance._uiSetHighlighted(instance.get('highlighted'));
        },

        /**
         * Fires after a transition has been removed.
         *
         * @method _afterTransitionsRemove
         * @param event
         * @protected
         */
        _afterTransitionsRemove: function(event) {
            var instance = this;

            instance.get('connectors').remove(event.value.uid);
        },

        /**
         * Binds mouse enter and mouse leave events in boundary.
         *
         * @method _bindBoundaryEvents
         * @protected
         */
        _bindBoundaryEvents: function() {
            var instance = this;

            instance.boundary.detachAll().on({
                mouseenter: A.bind(instance._onBoundaryMouseEnter, instance),
                mouseleave: A.bind(instance._onBoundaryMouseLeave, instance)
            });
        },

        /**
         * Returns a new instance of `A.Map` and bind the after connector remove
         * event.
         *
         * @method _connectorsValueFn
         * @param val
         * @protected
         */
        _connectorsValueFn: function() {
            var instance = this;

            return new A.Map({
                after: {
                    remove: A.bind(instance._afterConnectorRemove, instance)
                }
            });
        },

        /**
         * Returns a configuration object for the toolbar.
         *
         * @method _controlsToolbarValueFn
         * @param val
         * @protected
         */
        _controlsToolbarValueFn: function() {
            var instance = this;

            if (instance.get('builder')._getAttr('showDeleteNodeIcon') === false) {
                return { children: []}
            }

            return {
                children: [
                    {
                        icon: 'glyphicon glyphicon-remove',
                        on: {
                            click: A.bind(instance._handleCloseEvent, instance)
                        }
                    }
                ]
            };
        },

        /**
         * Fires when a close event is dispatched.
         *
         * @method _handleCloseEvent
         * @param event
         * @protected
         */
        _handleCloseEvent: function() {
            var instance = this;

            instance.get('builder').deleteSelectedNode();
        },

        /**
         * Fires a `connectStart` event with `startXY` parameter.
         *
         * @method _handleConnectStart
         * @param startXY
         * @protected
         */
        _handleConnectStart: function(startXY) {
            var instance = this;

            instance.fire('connectStart', {
                startXY: startXY
            });
        },

        /**
         * Fires a `connectMove` event with `startXY` and `publishedSource`
         * parameters.
         *
         * @method _handleConnectMove
         * @param mouseXY
         * @protected
         */
        _handleConnectMove: function(mouseXY) {
            var instance = this;
            var builder = instance.get('builder');

            instance.fire('connectMove', {
                mouseXY: mouseXY,
                publishedSource: builder.publishedSource
            });
        },

        /**
         * Checks if source and target are published, if yes a `connectDrop`
         * event is fired with `publishedSource` and `publishedTarget`
         * parameters. Also fires a `connectEnd` event.
         *
         * @method _handleConnectEnd
         * @protected
         */
        _handleConnectEnd: function() {
            var instance = this;
            var builder = instance.get('builder');
            var publishedSource = builder.publishedSource;
            var publishedTarget = builder.publishedTarget;

            if (publishedSource && publishedTarget) {
                instance.fire('connectDrop', {
                    publishedSource: publishedSource,
                    publishedTarget: publishedTarget
                });
            }

            instance.fire('connectEnd', {
                publishedSource: publishedSource
            });
        },

        /**
         * Checks if source is published, if yes a `connectOutTarget` event is
         * fired with `publishedSource` parameter.
         *
         * @method _handleConnectOutTarget
         * @protected
         */
        _handleConnectOutTarget: function() {
            var instance = this;
            var builder = instance.get('builder');
            var publishedSource = builder.publishedSource;

            if (publishedSource) {
                instance.fire('connectOutTarget', {
                    publishedSource: publishedSource
                });
            }
        },

        /**
         * Checks if source is published, if yes a `connectOverTarget` event is
         * fired with `publishedSource` parameter.
         *
         * @method _handleConnectOverTarget
         * @protected
         */
        _handleConnectOverTarget: function() {
            var instance = this;
            var builder = instance.get('builder');
            var publishedSource = builder.publishedSource;

            if (publishedSource) {
                instance.fire('connectOverTarget', {
                    publishedSource: publishedSource
                });
            }
        },

        /**
         * Fires when there's drag event happening in the boundary.
         *
         * @method _onBoundaryDrag
         * @param event
         * @protected
         */
        _onBoundaryDrag: function() {
            var instance = this;
            var dd = instance.boundaryDragDelegate.dd;

            instance._handleConnectMove(dd.con._checkRegion(dd.mouseXY));
        },

        /**
         * Fires when a drag event ends in the boundary.
         *
         * @method _onBoundaryDragEnd
         * @param event
         * @protected
         */
        _onBoundaryDragEnd: function(event) {
            var instance = this;

            instance._handleConnectEnd();
            event.target.get('dragNode').show();
        },

        /**
         * Fires when a drag event starts in the boundary.
         *
         * @method _onBoundaryDragStart
         * @param event
         * @protected
         */
        _onBoundaryDragStart: function(event) {
            var instance = this;

            instance._handleConnectStart(instance.boundaryDragDelegate.dd.startXY);
            event.target.get('dragNode').hide();
        },

        /**
         * Fires when mouse enters boundary.
         *
         * @method _onBoundaryMouseEnter
         * @param event
         * @protected
         */
        _onBoundaryMouseEnter: function(event) {
            var instance = this;

            instance.fire('boundaryMouseEnter', {
                domEvent: event
            });

            instance._handleConnectOverTarget();
        },

        /**
         * Fires when mouse leaves boundary.
         *
         * @method _onBoundaryMouseLeave
         * @param event
         * @protected
         */
        _onBoundaryMouseLeave: function(event) {
            var instance = this;

            instance.fire('boundaryMouseLeave', {
                domEvent: event
            });

            instance._handleConnectOutTarget();
        },

        /**
         * Fires when the name is changed.
         *
         * @method _onNameChange
         * @param event
         * @protected
         */
        _onNameChange: function(event) {
            var instance = this;

            instance.eachConnector(function(connector, index, sourceNode) {
                var transition = connector.get('transition');

                transition[(instance === sourceNode) ? 'source' : 'target'] = event.newVal;
                connector.set('transition', transition);
            });
        },

        /**
         * Creates a node for the controls and append it to the bounding box.
         *
         * @method _renderControls
         * @protected
         */
        _renderControls: function() {
            var instance = this;
            var boundingBox = instance.get('boundingBox');

            instance.controlsNode = A.Node.create(instance.CONTROLS_TEMPLATE).appendTo(boundingBox);
        },

        /**
         * Creates an instance of `A.Toolbar` in `controlsToolbar` attribute and
         * renders it.
         *
         * @method _renderControlsToolbar
         * @param event
         * @protected
         */
        _renderControlsToolbar: function() {
            var instance = this;

            instance.controlsToolbar = new A.Toolbar(
                instance.get('controlsToolbar')
            ).render(instance.controlsNode);

            instance._uiSetRequired(instance.get('required'));
        },

        /**
         * Renders the `graphic` attribute.
         *
         * @method _renderGraphic
         * @protected
         */
        _renderGraphic: function() {
            var instance = this;

            instance.set(
                'graphic',
                new A.Graphic({
                    height: instance.get('height'),
                    render: instance.bodyNode,
                    width: instance.get('width')
                })
            );

            instance.renderShapeInvite();
            instance.renderShapeBoundary().addClass(CSS_DIAGRAM_NODE_SHAPE_BOUNDARY);

            instance._bindBoundaryEvents();
            instance._setupBoundaryDrag();
        },

        /**
         * Creates a node for the label and place it after the content box.
         *
         * @method _renderLabel
         * @protected
         */
        _renderLabel: function() {
            var instance = this;

            instance.labelNode = A.Node.create(
                A.Lang.sub(instance.LABEL_TEMPLATE, {
                    label: A.Escape.html(instance.get('name'))
                })
            );

            instance.get('contentBox').placeAfter(instance.labelNode);
        },

        /**
         * Set the `transition` attribute.
         *
         * @method _setTransitions
         * @param val
         * @protected
         * @return {Array}
         */
        _setTransitions: function(val) {
            var instance = this;

            if (!isMap(val)) {
                var map = new A.Map({
                    after: {
                        remove: A.bind(instance._afterTransitionsRemove, instance)
                    }
                });

                A.Array.each(val, function(transition) {
                    var uid = A.guid();

                    transition = A.Lang.isObject(transition) ? A.mix(transition, {
                        uid: uid
                    }) : {
                        uid: uid,
                        target: transition
                    };

                    map.put(uid, instance.prepareTransition(transition));
                });

                val = map;
            }

            return val;
        },

        /**
         * Creates a new instance of `A.DD.Delegate` in `boundaryDragDelegate`
         * attribute.
         *
         * @method _setupBoundaryDrag
         * @protected
         */
        _setupBoundaryDrag: function() {
            var instance = this;

            var builder = instance.get('builder');

            instance.boundaryDragDelegate = new A.DD.Delegate({
                bubbleTargets: instance,
                container: instance.bodyNode,
                nodes: '.' + CSS_DIAGRAM_NODE_SHAPE_BOUNDARY,
                dragConfig: {
                    useShim: false,
                    plugins: [
                        {
                            cfg: {
                                constrain: (builder ? builder.get('canvas') : null)
                            },
                            fn: A.Plugin.DDConstrained
                        },
                        {
                            cfg: {
                                scrollDelay: 150
                            },
                            fn: A.Plugin.DDWinScroll
                        },
                        {
                            cfg: {
                                borderStyle: '0px',
                                moveOnEnd: false,
                                resizeFrame: false
                            },
                            fn: A.Plugin.DDProxy
                        }
                    ]
                },
                on: {
                    'drag:drag': A.bind(instance._onBoundaryDrag, instance),
                    'drag:end': A.bind(instance._onBoundaryDragEnd, instance),
                    'drag:start': A.bind(instance._onBoundaryDragStart, instance)
                }
            });

            // Drag _unprep method invoke .detachAll() on the node, so we need
            // to rebind the events.
            A.Do.after(instance._bindBoundaryEvents, instance.boundaryDragDelegate.dd, '_unprep', instance);
        },

        /**
         * Set the `highlighted` attribute in the UI.
         *
         * @method _uiSetHighlighted
         * @param val
         * @protected
         */
        _uiSetHighlighted: function(val) {
            var instance = this;

            if (instance.get('rendered')) {
                var stroke = val ? instance.get('highlightBoundaryStroke') : instance.get('shapeBoundary' + '.' +
                    'stroke');

                if (stroke) {
                    instance.boundary.set('stroke', stroke);
                }
            }
        },

        /**
         * Set the `name` attribute in the UI.
         *
         * @method _uiSetName
         * @param val
         * @protected
         */
        _uiSetName: function(val) {
            var instance = this;
            var boundingBox = instance.get('boundingBox');

            boundingBox.setAttribute('data-nodeId', A.Escape.html(A.DiagramNode.buildNodeId(val)));

            if (instance.get('rendered')) {
                instance.labelNode.setContent(A.Escape.html(val));
            }
        },

        /**
         * Set the `required` attribute in the UI.
         *
         * @method _uiSetRequired
         * @param val
         * @protected
         */
        _uiSetRequired: function() {},

        /**
         * Set the `selected` attribute in the UI.
         *
         * @method _uiSetSelected
         * @param val
         * @protected
         */
        _uiSetSelected: function(val) {
            var instance = this;

            instance.get('boundingBox').toggleClass(CSS_DIAGRAM_NODE_SELECTED, val);

            if (val && !instance.controlsToolbar) {
                instance._renderControlsToolbar();
            }
        },

        /**
         * Sets the X and Y position in the UI.
         *
         * @method _uiSetXY
         * @param val
         * @protected
         */
        _uiSetXY: function(val) {
            var instance = this;
            var containerXY = instance.getContainer().getXY();

            this._posNode.setXY([val[0] + containerXY[0], val[1] + containerXY[1]]);
        },

        /**
         * Gets the shape boundary definitions.
         *
         * @method _valueShapeBoundary
         * @protected
         */
        _valueShapeBoundary: function() {
            return {
                height: 41,
                type: 'rect',
                stroke: {
                    weight: 7,
                    color: 'transparent',
                    opacity: 0
                },
                width: 41
            };
        },

        /**
         * Calculate the hot points, points where the link connector will point at
         * @param width
         * @param height
         * @returns {*[]}
         * @private
         */
        _calculateRectangleHotPoints: function(width, height) {
            var cornerDistance = 1;
            var margin = 1;
            var hotPoints = [
                [cornerDistance, cornerDistance], [width - cornerDistance, cornerDistance],
                [cornerDistance, height - cornerDistance], [width - cornerDistance, cornerDistance - cornerDistance]
            ];

            for (var i = 2; i <= 50; i++) {
                hotPoints.push([width / i, -margin]);
                hotPoints.push([-margin, height / i]);
                hotPoints.push([width / i, height + margin]);
                hotPoints.push([width + margin, height / i]);
            }

            return hotPoints
        }
    }
});

A.DiagramNode = DiagramNode;
