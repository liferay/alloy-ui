/**
 * The Diagram Builder Component
 *
 * @module aui-diagram-builder
 * @submodule aui-diagram-builder-impl
 */

var Lang = A.Lang,
    isArray = Lang.isArray,
    isBoolean = Lang.isBoolean,
    isObject = Lang.isObject,
    isString = Lang.isString,

    WidgetStdMod = A.WidgetStdMod,
    AArray = A.Array,

    aGetClassName = A.getClassName,

    CSS_DB_CONTROLS = aGetClassName('diagram', 'builder', 'controls'),
    CSS_DIAGRAM_BUILDER_FIELD = aGetClassName('diagram', 'builder', 'field'),
    CSS_DIAGRAM_NODE = aGetClassName('diagram', 'node'),
    CSS_DIAGRAM_NODE_CONTENT = aGetClassName('diagram', 'node', 'content'),
    CSS_DIAGRAM_NODE_EDITING = aGetClassName('diagram', 'node', 'editing'),
    CSS_DIAGRAM_NODE_LABEL = aGetClassName('diagram', 'node', 'label'),
    CSS_DIAGRAM_NODE_SELECTED = aGetClassName('diagram', 'node', 'selected'),
    CSS_DIAGRAM_NODE_SHAPE_BOUNDARY = aGetClassName('diagram', 'node', 'shape', 'boundary'),
    CSS_DIAGRAM_SUGGEST_CONNECTOR = aGetClassName('diagram', 'node', 'suggest', 'connector'),

    adjustDiagramNodeOffset = function(diagramNode, offsetXY) {
        var dnXY = isArray(diagramNode) ? diagramNode : diagramNode.get('boundingBox').getXY();

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

    getLeftTop = function(container, node) {
        var nodeXY = isArray(node) ? node : node.getXY();
        var containerXY = isArray(container) ? container : container.getXY();

        return AArray.map(containerXY, function(val, i) {
            return Math.max(0, val - nodeXY[i]);
        });
    },

    isConnector = function(val) {
        return A.instanceOf(val, A.Connector);
    },

    isMap = function(val) {
        return A.instanceOf(val, A.Map);
    },

    isDiagramBuilder = function(val) {
        return A.instanceOf(val, A.DiagramBuilderBase);
    },

    isDiagramNode = function(val) {
        return A.instanceOf(val, A.DiagramNode);
    };

/**
 * A base class for Diagram Builder.
 *
 * Check the [live demo](http://alloyui.com/examples/diagram-builder/).
 *
 * @class A.DiagramBuilder
 * @extends A.DiagramBuilderBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/diagram-builder/basic-markup.html
 * @include http://alloyui.com/examples/diagram-builder/basic.js
 */
var DiagramBuilder = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-builder',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DiagramBuilder`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Stores an instance of `A.Connector`.
         *
         * @attribute connector
         * @default null
         */
        connector: {
            setter: '_setConnector',
            value: null
        },

        /**
         * Configuration object for draggable fields.
         *
         * @attribute fieldsDragConfig
         * @default null
         * @type Object
         */
        fieldsDragConfig: {
            value: null,
            setter: '_setFieldsDragConfig',
            validator: isObject
        },

        /**
         * Stores an instance of `A.Graphic`.
         *
         * @attribute graphic
         * @type Object
         */
        graphic: {
            valueFn: function() {
                return new A.Graphic();
            },
            validator: isObject
        },

        /**
         * Checks if the drop zones should be highlighted or not.
         *
         * @attribute highlightDropZones
         * @default true
         * @type Boolean
         */
        highlightDropZones: {
            validator: isBoolean,
            value: true
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            value: {
                addNode: 'Add node',
                cancel: 'Cancel',
                close: 'Close',
                deleteConnectorsMessage: 'Are you sure you want to delete the selected connector(s)?',
                deleteNodesMessage: 'Are you sure you want to delete the selected node(s)?',
                propertyName: 'Property Name',
                save: 'Save',
                settings: 'Settings',
                value: 'Value'
            }
        },

        /**
         * Checks if a connector suggestion is visible or not.
         *
         * @attribute showSuggestConnector
         * @default true
         * @type Boolean
         */
        showSuggestConnector: {
            validator: isBoolean,
            value: true
        },

        /**
         * Stores an instance of `A.Overlay` used in the connector suggestion.
         *
         * @attribute suggestConnectorOverlay
         * @default null
         */
        suggestConnectorOverlay: {
            value: null,
            setter: '_setSuggestConnectorOverlay'
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramBuilderBase,

    /**
     * The index of the fields tab.
     *
     * @property FIELDS_TAB
     * @default 0
     * @type Number
     * @static
     */
    FIELDS_TAB: 0,

    /**
     * The index of the settings tab.
     *
     * @property SETTINGS_TAB
     * @default 1
     * @type Number
     * @static
     */
    SETTINGS_TAB: 1,

    prototype: {
        editingConnector: null,

        editingNode: null,

        publishedSource: null,

        publishedTarget: null,

        selectedConnector: null,

        selectedNode: null,

        /**
         * Construction logic executed during `A.DiagramBuilder` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this,
                canvas = instance.get('canvas');

            instance.on({
                cancel: instance._onCancel,
                'drag:drag': instance._onDrag,
                'drag:end': instance._onDragEnd,
                'drop:hit': instance._onDropHit,
                save: instance._onSave
            });

            A.DiagramNodeManager.on({
                publishedSource: function(event) {
                    instance.publishedTarget = null;
                    instance.publishedSource = event.publishedSource;
                }
            });

            canvas.on('mousedown', A.bind(instance._onCanvasMouseDown, instance));
            canvas.on('mouseenter', A.bind(instance._onCanvasMouseEnter, instance));

            instance.handlerKeyDown = A.getDoc().on('keydown', A.bind(instance._afterKeyEvent, instance));

            instance.dropContainer.delegate(
                'click', A.bind(instance._onNodeClick, instance), '.' + CSS_DIAGRAM_NODE);

            instance.dropContainer.delegate(
                'mousedown', A.bind(instance._onCloseButtonMouseDown, instance), '.diagram-builder-controls button'
            );

            instance.dropContainer.delegate(
                'mouseenter', A.bind(instance._onNodeMouseEnter, instance), '.' + CSS_DIAGRAM_NODE);

            instance.dropContainer.delegate(
                'mouseleave', A.bind(instance._onNodeMouseLeave, instance), '.' + CSS_DIAGRAM_NODE);
        },

        /**
         * Render the `A.DiagramBuilder` component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            A.DiagramBuilder.superclass.renderUI.apply(this, arguments);

            instance._renderGraphic();
        },

        /**
         * Sync the `A.DiagramBuilder` UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;

            A.DiagramBuilder.superclass.syncUI.apply(this, arguments);

            instance._setupFieldsDrag();

            instance.syncConnectionsUI();

            instance.connector = instance.get('connector');
        },

        /**
         * Syncs the connections in the UI.
         *
         * @method syncConnectionsUI
         */
        syncConnectionsUI: function() {
            var instance = this;

            instance.get('fields').each(function(diagramNode) {
                diagramNode.syncConnectionsUI();
            });
        },

        /**
         * Fetches all fields and destroys each instance of it.
         *
         * @method clearFields
         */
        clearFields: function() {
            var instance = this;

            var fields = [];

            instance.get('fields').each(function(diagramNode) {
                fields.push(diagramNode);
            });

            AArray.each(fields, function(diagramNode) {
                diagramNode.destroy();
            });

            fields = instance.editingConnector = instance.editingNode = instance.selectedNode = null;
        },

        /**
         * Disables the settings tab and selects the field tab.
         *
         * @method closeEditProperties
         */
        closeEditProperties: function() {
            var instance = this;
            var editingNode = instance.editingNode;
            var tabView = instance.tabView;

            tabView.selectChild(A.DiagramBuilder.FIELDS_TAB);
            tabView.disableTab(A.DiagramBuilder.SETTINGS_TAB);

            if (editingNode) {
                editingNode.get('boundingBox').removeClass(CSS_DIAGRAM_NODE_EDITING);
            }

            instance.editingConnector = instance.editingNode = null;
        },

        /**
         * Gets two `A.DiagramNode` instances and connect them.
         *
         * @method connect
         * @param diagramNode1
         * @param diagramNode2
         * @param optConnector
         */
        connect: function(diagramNode1, diagramNode2, optConnector) {
            var instance = this;

            if (isString(diagramNode1)) {
                diagramNode1 = A.DiagramNode.getNodeByName(diagramNode1);
            }

            if (isString(diagramNode2)) {
                diagramNode2 = A.DiagramNode.getNodeByName(diagramNode2);
            }

            if (diagramNode1 && diagramNode2) {
                diagramNode1.connect(diagramNode2.get('name'), optConnector);
            }

            return instance;
        },

        /**
         * Creates a connector for each node that has source and target
         * properties.
         *
         * @method connectAll
         * @param nodes
         */
        connectAll: function(nodes) {
            var instance = this;

            AArray.each(nodes, function(node) {
                if (node.hasOwnProperty('source') && node.hasOwnProperty('target')) {
                    instance.connect(node.source, node.target, node.connector);
                }
            });

            return instance;
        },

        /**
         * Creates a new field based on the field class type.
         *
         * @method createField
         * @param val
         */
        createField: function(val) {
            var instance = this;

            if (!isDiagramNode(val)) {
                val.builder = instance;
                val.bubbleTargets = instance;
                val = new(instance.getFieldClass(val.type || 'node'))(val);
            }

            return val;
        },

        /**
         * Fetches all selected connectors and disconnect them.
         *
         * @method deleteSelectedConnectors
         */
        deleteSelectedConnectors: function() {
            var instance = this;
            var strings = instance.getStrings();
            var selectedConnectors = instance.getSelectedConnectors();

            if (selectedConnectors.length && window.confirm(strings.deleteConnectorsMessage)) {
                AArray.each(selectedConnectors, function(connector) {
                    var transition = connector.get('transition');

                    A.DiagramNode.getNodeByName(transition.source).disconnect(transition);
                });

                instance.stopEditing();
            }
        },

        /**
         * Fetches the selected node and delete it.
         *
         * @method deleteSelectedNode
         */
        deleteSelectedNode: function() {
            var instance = this;
            var strings = instance.getStrings();
            var selectedNode = instance.selectedNode;

            if (selectedNode && !selectedNode.get('required') && window.confirm(strings.deleteNodesMessage)) {
                selectedNode.close();
                instance.editingNode = instance.selectedNode = null;
                instance.stopEditing();
            }
        },

        /**
         * Destructor lifecycle implementation for the `A.DiagramBuilder` class.
         *
         * @method destructor
         * @param attribute
         * @protected
         */
        destructor: function() {
            var instance = this;

            instance.get('suggestConnectorOverlay').destroy();
        },

        /**
         * An utility function to loop through all connectors.
         *
         * @method eachConnector
         * @param fn
         */
        eachConnector: function(fn) {
            var instance = this;

            instance.get('fields').each(function(diagramNode) {
                var transitions = diagramNode.get('transitions');

                AArray.each(transitions.values(), function(transition) {
                    fn.call(instance, diagramNode.getConnector(transition), transition, diagramNode);
                });
            });
        },

        /**
         * Enables the settings tab, sets the connector properties in the
         * property list, and stores the connector in the `editingConnector` and
         * `selectedConnector` attributes.
         *
         * @method editConnector
         * @param connector
         */
        editConnector: function(connector) {
            var instance = this;

            if (connector) {
                var tabView = instance.tabView;

                instance.closeEditProperties();
                tabView.enableTab(A.DiagramBuilder.SETTINGS_TAB);
                tabView.selectChild(A.DiagramBuilder.SETTINGS_TAB);

                instance.propertyList.set('data', connector.getProperties());

                instance.editingConnector = instance.selectedConnector = connector;
            }
        },

        /**
         * Enables the settings tab, sets the node properties in the property
         * list, and stores the node in the `editingNode` and `selectedNode`
         * attributes.
         *
         * @method editNode
         * @param diagramNode
         */
        editNode: function(diagramNode) {
            var instance = this;

            if (diagramNode) {
                var tabView = instance.tabView;

                instance.closeEditProperties();
                tabView.enableTab(A.DiagramBuilder.SETTINGS_TAB);
                tabView.selectChild(A.DiagramBuilder.SETTINGS_TAB);

                instance.propertyList.set('data', diagramNode.getProperties());

                diagramNode.get('boundingBox').addClass(CSS_DIAGRAM_NODE_EDITING);

                instance.editingNode = instance.selectedNode = diagramNode;
            }
        },

        /**
         * Gets the field class based on the `A.DiagramBuilder` type. If the type
         * doesn't exist, logs an error message.
         *
         * @method getFieldClass
         * @param type
         */
        getFieldClass: function(type) {
            var clazz = A.DiagramBuilder.types[type];

            if (clazz) {
                return clazz;
            }
            else {
                A.log('The field type: [' + type + '] couldn\'t be found.');

                return null;
            }
        },

        /**
         * Returns a collection of nodes by its transition property.
         *
         * @method getNodesByTransitionProperty
         * @param property
         * @param value
         */
        getNodesByTransitionProperty: function(property, value) {
            var instance = this,
                nodes = [],
                transitions;

            instance.get('fields').each(function(diagramNode) {
                transitions = diagramNode.get('transitions');

                AArray.each(transitions.values(), function(transition) {
                    if (transition[property] === value) {
                        nodes.push(diagramNode);
                        return false;
                    }
                });
            });

            return nodes;
        },

        /**
         * Returns a collection of selected connectors.
         *
         * @method getSelectedConnectors
         */
        getSelectedConnectors: function() {
            var instance = this;
            var selected = [];

            instance.eachConnector(function(connector) {
                if (connector.get('selected')) {
                    selected.push(connector);
                }
            });

            return selected;
        },

        /**
         * Returns a collection of source nodes.
         *
         * @method getSourceNodes
         * @param diagramNode
         */
        getSourceNodes: function(diagramNode) {
            var instance = this;

            return instance.getNodesByTransitionProperty('target', diagramNode.get('name'));
        },

        /**
         * Hides the suggest connector overlay.
         *
         * @method hideSuggestConnectorOverlay
         * @param diagramNode
         * @param drag
         */
        hideSuggestConnectorOverlay: function() {
            var instance = this;

            instance.connector.hide();
            instance.get('suggestConnectorOverlay').hide();

            try {
                instance.fieldsDrag.dd.set('lock', false);
            }
            catch (e) {}
        },

        /**
         * Checks if a node is able to connect with another.
         *
         * @method isAbleToConnect
         */
        isAbleToConnect: function() {
            var instance = this;

            return !!(instance.publishedSource && instance.publishedTarget);
        },

        /**
         * Checks if the field is draggable.
         *
         * @method isFieldsDrag
         * @param drag
         */
        isFieldsDrag: function(drag) {
            var instance = this;

            return (drag === instance.fieldsDrag.dd);
        },

        /**
         * Renders a field in the `dropContainer`.
         *
         * @method plotField
         * @param field
         */
        plotField: function(field) {
            var instance = this;

            if (!field.get('rendered')) {
                field.render(instance.dropContainer);
            }
        },

        /**
         * Selects and focus a certain node.
         *
         * @method select
         * @param diagramNode
         */
        select: function(diagramNode) {
            var instance = this;

            instance.unselectNodes();

            instance.selectedNode = diagramNode.set('selected', true).focus();
        },

        /**
         * Shows the suggest connector overlay in a certain X and Y position.
         *
         * @method showSuggestConnectorOverlay
         * @param xy
         */
        showSuggestConnectorOverlay: function(xy) {
            var instance = this,
                showSuggestConnectorOverlay = instance.get('suggestConnectorOverlay');

            showSuggestConnectorOverlay.get('boundingBox').addClass(CSS_DIAGRAM_SUGGEST_CONNECTOR);

            showSuggestConnectorOverlay.set(
                'xy', xy || instance.connector.get('p2')).show();

            try {
                instance.fieldsDrag.dd.set('lock', true);
            }
            catch (e) {}
        },

        /**
         * Clears node/connectors selections and close edit properties.
         *
         * @method stopEditing
         */
        stopEditing: function() {
            var instance = this;

            instance.unselectConnectors();
            instance.unselectNodes();
            instance.closeEditProperties();
        },

        /**
         * Converts fields to JSON format.
         *
         * @method toJSON
         * @return {Object}
         */
        toJSON: function() {
            var instance = this;

            var output = {
                nodes: []
            };

            instance.get('fields').each(function(diagramNode) {
                var node = {
                    transitions: []
                },
                    transitions = diagramNode.get('transitions');

                // serialize node attributes
                AArray.each(diagramNode.SERIALIZABLE_ATTRS, function(attributeName) {
                    node[attributeName] = diagramNode.get(attributeName);
                });

                // serialize node transitions
                AArray.each(transitions.values(), function(transition) {
                    var connector = diagramNode.getConnector(transition);
                    transition.connector = connector.toJSON();
                    node.transitions.push(transition);
                });

                output.nodes.push(node);
            });

            return output;
        },

        /**
         * Clears connectors selection.
         *
         * @method unselectConnectors
         */
        unselectConnectors: function() {
            var instance = this;

            AArray.each(instance.getSelectedConnectors(), function(connector) {
                connector.set('selected', false);
            });
        },

        /**
         * Clears nodes selection.
         *
         * @method unselectNodes
         */
        unselectNodes: function() {
            var instance = this;
            var selectedNode = instance.selectedNode;

            if (selectedNode) {
                selectedNode.set('selected', false);
            }

            instance.selectedNode = null;
        },

        /**
         * Fires after a key event is dispatched.
         *
         * @method _afterKeyEvent
         * @param event
         * @protected
         */
        _afterKeyEvent: function(event) {
            var instance = this;

            if (event.hasModifier() || A.getDoc().get('activeElement').test(':input,td')) {
                return;
            }

            if (event.isKey('esc')) {
                instance._onEscKey(event);
            }
            else if (event.isKey('backspace') || event.isKey('delete')) {
                instance._onDeleteKey(event);
            }
        },

        /**
         * Deletes the Selected `diagramNode` and any connectors attached to it.
         *
         * @method _deleteSelectedNode
         * @param event {Event.Facade} Event Facade object
         * @protected
         */
        _deleteSelectedNode: function(event) {
            var instance = this;

            instance.deleteSelectedConnectors();
            instance.deleteSelectedNode();

            event.halt();
        },

        /**
         * Fires on cancel event.
         *
         * @method _onCancel
         * @param event
         * @protected
         */
        _onCancel: function() {
            var instance = this;

            instance.closeEditProperties();
        },

        /**
         * Sync UI after entering mouse in the canvas node.
         *
         * @method _onCanvasMouseEnter
         * @param event
         * @protected
         */
        _onCanvasMouseEnter: function() {
            var instance = this;

            instance.syncUI();
        },

        /**
         * Handles `mousedown` events on the diagram close button.
         *
         * @method _onCloseButtonMouseDown
         * @param event
         * @protected
         */
        _onCloseButtonMouseDown: function(event) {
            var instance = this;

            var diagramNode = event.currentTarget.ancestor('.' + 'diagram-node');

            if (isDiagramNode(A.Widget.getByNode(diagramNode))) {
                instance._deleteSelectedNode(event);
            }
        },

        /**
         * Fires when delete key is pressed.
         *
         * @method _onDeleteKey
         * @param event
         * @protected
         */
        _onDeleteKey: function(event) {
            var instance = this,
                selectedConnectors = instance.getSelectedConnectors();

            if (isDiagramNode(A.Widget.getByNode(event.target))) {
                instance._deleteSelectedNode(event);
            }
            else if (selectedConnectors.length > 0) {
                instance.deleteSelectedConnectors();

                event.halt();
            }
        },

        /**
         * Triggers when the drag occurs.
         *
         * @method _onDrag
         * @param event
         * @protected
         */
        _onDrag: function(event) {
            var instance = this;
            var drag = event.target;

            if (instance.isFieldsDrag(drag)) {
                var diagramNode = A.Widget.getByNode(drag.get('dragNode'));

                diagramNode.alignTransitions();

                AArray.each(instance.getSourceNodes(diagramNode), function(sourceNode) {
                    sourceNode.alignTransitions();
                });
            }
        },

        /**
         * Triggers when the drag ends.
         *
         * @method _onDragEnd
         * @param event
         * @protected
         */
        _onDragEnd: function(event) {
            var instance = this;
            var drag = event.target;
            var diagramNode = A.Widget.getByNode(drag.get('dragNode'));

            if (diagramNode && instance.isFieldsDrag(drag)) {
                diagramNode.set('xy', diagramNode.getLeftTop());
            }
        },

        /**
         * Triggers when drop is hit.
         *
         * @method _onDropHit
         * @param event
         * @protected
         */
        _onDropHit: function(event) {
            var instance = this;
            var drag = event.drag;

            if (instance.isAvailableFieldsDrag(drag)) {
                var availableField = drag.get('node').getData('availableField');

                var newField = instance.addField({
                    xy: getLeftTop(drag.lastXY, instance.dropContainer),
                    type: availableField.get('type')
                });

                instance.select(newField);
            }
        },

        /**
         * Fires when the esc key is pressed.
         *
         * @method _onEscKey
         * @param event
         * @protected
         */
        _onEscKey: function(event) {
            var instance = this;

            instance.hideSuggestConnectorOverlay();
            instance.stopEditing();
            event.halt();
        },

        /**
         * Stops editing after mouse down in the canvas node.
         *
         * @method _onCanvasMouseDown
         * @param event
         * @protected
         */
        _onCanvasMouseDown: function() {
            var instance = this;

            instance.stopEditing();
            instance.hideSuggestConnectorOverlay();
        },

        /**
         * Fires when the node gets clicked.
         *
         * @method _onNodeClick
         * @param event
         * @protected
         */
        _onNodeClick: function(event) {
            var instance = this;
            var diagramNode = A.Widget.getByNode(event.currentTarget);

            instance.select(diagramNode);

            instance._onNodeEdit(event);

            event.stopPropagation();
        },

        /**
         * Fires when the node is edited.
         *
         * @method _onNodeEdit
         * @param event
         * @protected
         */
        _onNodeEdit: function(event) {
            var instance = this;

            // Only enable editing if the double clicked node is inside the node
            // contentBox.
            if (!event.target.ancestor('.' + CSS_DIAGRAM_NODE_CONTENT, true)) {
                return;
            }

            var diagramNode = A.Widget.getByNode(event.currentTarget);

            if (diagramNode) {
                instance.editNode(diagramNode);
            }
        },

        /**
         * Fires when mouse enters the node.
         *
         * @method _onNodeMouseEnter
         * @param event
         * @protected
         */
        _onNodeMouseEnter: function(event) {
            var diagramNode = A.Widget.getByNode(event.currentTarget);

            diagramNode.set('highlighted', true);
        },

        /**
         * Fires when mouse leaves the node.
         *
         * @method _onNodeMouseLeave
         * @param event
         * @protected
         */
        _onNodeMouseLeave: function(event) {
            var instance = this;
            var publishedSource = instance.publishedSource;
            var diagramNode = A.Widget.getByNode(event.currentTarget);

            if (!publishedSource || !publishedSource.boundaryDragDelegate.dd.get('dragging')) {
                diagramNode.set('highlighted', false);
            }
        },

        /**
         * Handles save event for editing node and connector.
         *
         * @method _onSave
         * @param event
         * @protected
         */
        _onSave: function() {
            var instance = this;
            var editingNode = instance.editingNode;
            var editingConnector = instance.editingConnector;
            var modelList = instance.propertyList.get('data');

            if (editingNode) {
                modelList.each(function(model) {
                    editingNode.set(model.get('attributeName'), model.get('value'));
                });
            }
            else if (editingConnector) {
                modelList.each(function(model) {
                    editingConnector.set(model.get('attributeName'), model.get('value'));
                });
            }
        },

        /**
         * Fires when suggest connector node is clicked.
         *
         * @method _onSuggestConnectorNodeClick
         * @param event
         * @protected
         */
        _onSuggestConnectorNodeClick: function(event) {
            var instance = this;
            var availableField = event.currentTarget.getData('availableField');
            var connector = instance.connector;

            var node = instance.addField({
                type: availableField.get('type'),
                xy: connector.toCoordinate(connector.get('p2'))
            });

            instance.hideSuggestConnectorOverlay();
            instance.publishedSource.connectNode(node);
        },

        /**
         * Renders the `graphic` attribute.
         *
         * @method _renderGraphic
         * @protected
         */
        _renderGraphic: function() {
            var instance = this;

            instance.get('graphic').render(instance.dropContainer);
        },

        /**
         * Set the `connector` attribute.
         *
         * @method _setConnector
         * @param val
         * @protected
         */
        _setConnector: function(val) {
            var instance = this;

            if (!isConnector(val)) {
                var xy = instance.get('canvas').getXY();

                val = new A.Connector(
                    A.merge({
                            builder: instance,
                            graphic: instance.get('graphic'),
                            lazyDraw: true,
                            p1: xy,
                            p2: xy,
                            shapeHover: null,
                            showName: false
                        },
                        val
                    )
                );
            }

            return val;
        },

        /**
         * Set the `fieldsDragConfig` attribute.
         *
         * @method _setFieldsDragConfig
         * @param val
         * @protected
         */
        _setFieldsDragConfig: function(val) {
            var instance = this;
            var dropContainer = instance.dropContainer;

            return A.merge({
                    bubbleTargets: instance,
                    container: dropContainer,
                    dragConfig: {
                        plugins: [
                            {
                                cfg: {
                                    constrain: dropContainer
                                },
                                fn: A.Plugin.DDConstrained
                            },
                            {
                                cfg: {
                                    scrollDelay: 150,
                                    node: dropContainer
                                },
                                fn: A.Plugin.DDNodeScroll
                            }
                        ]
                    },
                    nodes: '.' + CSS_DIAGRAM_NODE
                },
                val || {}
            );
        },

        /**
         * Set the `suggestConnectorOverlay` attribute.
         *
         * @method _setSuggestConnectorOverlay
         * @param val
         * @protected
         */
        _setSuggestConnectorOverlay: function(val) {
            var instance = this;

            if (!val) {
                var docFrag = A.getDoc().invoke('createDocumentFragment'),
                    boundingBox,
                    contentBox;

                AArray.each(instance.get('availableFields'), function(field) {
                    var node = field.get('node');

                    docFrag.appendChild(
                        node.clone().setData('availableField', node.getData('availableField'))
                    );
                });

                val = new A.Overlay({
                    bodyContent: docFrag,
                    render: true,
                    visible: false,
                    width: 280,
                    zIndex: 10000
                });

                boundingBox = val.get('boundingBox');
                contentBox = val.get('contentBox');

                contentBox.addClass('popover-content');
                boundingBox.addClass('popover');

                boundingBox.delegate('click', A.bind(instance._onSuggestConnectorNodeClick, instance), '.' +
                    CSS_DIAGRAM_BUILDER_FIELD);
            }

            return val;
        },

        /**
         * Creates a new instance of `A.DD.Delegate` in `fieldsDrag` attribute.
         *
         * @method _setupFieldsDrag
         * @protected
         */
        _setupFieldsDrag: function() {
            var instance = this;

            instance.fieldsDrag = new A.DD.Delegate(
                instance.get('fieldsDragConfig')
            );
        }
    }
});

A.DiagramBuilder = DiagramBuilder;

A.DiagramBuilder.types = {};

/**
 * A base class for DiagramNodeManagerBase.
 *
 * @class A.DiagramNodeManagerBase
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DiagramNodeManagerBase = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-node-manager',

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.Base
});

A.DiagramNodeManager = new DiagramNodeManagerBase();

/**
 * A base class for DiagramNode.
 *
 * @class A.DiagramNode
 * @extends Overlay
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var DiagramNode = A.Component.create({

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
         * Stores an instance of `A.DiagramBuilderBase`.
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
            validator: isObject,
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
            validator: isString
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
            validator: isObject
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
            validator: isBoolean,
            value: false
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
            validator: isString
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
            validator: isBoolean
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
            validator: isBoolean
        },

        /**
         * A graphic shape to represent a boundary.
         *
         * @attribute shapeBoundary
         * @type Object
         */
        shapeBoundary: {
            validator: isObject,
            valueFn: '_valueShapeBoundary'
        },

        /**
         * Represents a stroke to highlight a boundary.
         *
         * @attribute highlightBoundaryStroke
         * @type Object
         */
        highlightBoundaryStroke: {
            validator: isObject,
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
            validator: isObject,
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
            validator: isString
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

            instance.get('boundingBox').addClass(CSS_DIAGRAM_NODE + '-' + instance.get('type'));
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

            AArray.each(transitions.values(), A.bind(instance.alignTransition, instance));
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
                    sourceXY: getLeftTop(dd.startXY, instance.get('boundingBox')),
                    target: diagramNode.get('name'),
                    targetXY: getLeftTop(dd.mouseXY, diagramNode.get('boundingBox'))
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

            AArray.each(instance.get('builder').getSourceNodes(instance), function(sourceNode) {
                var sourceConnectors = sourceNode.get('connectors');

                AArray.each(sourceConnectors.values(), function(connector) {
                    if (instance.get('name') === connector.get('transition').target) {
                        sourceNodes.push(sourceNode);
                        connectors.push(connector);
                    }
                });
            });

            AArray.each(connectors, function(connector, index) {
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
         * @method getLeftTop
         */
        getLeftTop: function() {
            var instance = this;

            return getLeftTop(instance.get('boundingBox'), instance.getContainer());
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

            AArray.each(propertyModel, function(property) {
                var value = instance.get(property.attributeName),
                    type = Lang.type(value);

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
            var instance = this;

            var transition = {
                source: instance.get('name'),
                target: null,
                uid: A.guid()
            };

            if (isString(val)) {
                transition.target = val;
            }
            else if (isObject(val)) {
                transition = A.merge(transition, val);
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

            AArray.each(transitions.values(), function(transition) {
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

            instance.setStdModContent(WidgetStdMod.BODY, '', WidgetStdMod.AFTER);
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
                Lang.sub(instance.LABEL_TEMPLATE, {
                    label: instance.get('name')
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

                    transition = isObject(transition) ? A.mix(transition, {
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

            boundingBox.setAttribute('data-nodeId', A.DiagramNode.buildNodeId(val));

            if (instance.get('rendered')) {
                instance.labelNode.setContent(val);
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
        }
    }
});

A.DiagramNode = DiagramNode;

A.DiagramBuilder.types.node = A.DiagramNode;

/**
 * A base class for DiagramNodeState.
 *
 * @class A.DiagramNodeState
 * @extends A.DiagramNode
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.DiagramNodeState = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-node',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DiagramNodeState`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The height of the node.
         *
         * @attribute height
         * @default 40
         * @type Number
         */
        height: {
            value: 40
        },

        /**
         * The type of the node.
         *
         * @attribute type
         * @default 'state'
         * @type String
         */
        type: {
            value: 'state'
        },

        /**
         * The width of the node.
         *
         * @attribute width
         * @default 40
         * @type Number
         */
        width: {
            value: 40
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramNode,

    prototype: {
        hotPoints: A.DiagramNode.CIRCLE_POINTS,

        /**
         * Renders the shape boundary.
         *
         * @method renderShapeBoundary
         */
        renderShapeBoundary: function() {
            var instance = this;

            var boundary = instance.boundary = instance.get('graphic').addShape(
                instance.get('shapeBoundary')
            );

            boundary.translate(5, 5);

            return boundary;
        },

        /**
         * Gets the shape boundary definitions.
         *
         * @method _valueShapeBoundary
         * @protected
         */
        _valueShapeBoundary: function() {
            return {
                radius: 15,
                type: 'circle',
                stroke: {
                    weight: 7,
                    color: 'transparent',
                    opacity: 0
                }
            };
        }
    }
});

A.DiagramBuilder.types.state = A.DiagramNodeState;

/**
 * A base class for DiagramNodeCondition.
 *
 * @class A.DiagramNodeCondition
 * @extends A.DiagramNodeState
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.DiagramNodeCondition = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-node',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DiagramNodeCondition`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

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
         * The type of the node.
         *
         * @attribute type
         * @default 'condition'
         * @type String
         */
        type: {
            value: 'condition'
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
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramNodeState,

    prototype: {
        hotPoints: A.DiagramNode.DIAMOND_POINTS,

        /**
         * Renders the shape boundary.
         *
         * @method renderShapeBoundary
         */
        renderShapeBoundary: function() {
            var instance = this;

            var boundary = instance.boundary = instance.get('graphic').addShape(
                instance.get('shapeBoundary')
            );

            boundary.translate(10, 10);
            boundary.rotate(45);

            return boundary;
        },

        _valueShapeBoundary: A.DiagramNode.prototype._valueShapeBoundary
    }
});

A.DiagramBuilder.types.condition = A.DiagramNodeCondition;

/**
 * A base class for DiagramNodeStart.
 *
 * @class A.DiagramNodeStart
 * @extends A.DiagramNodeState
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.DiagramNodeStart = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-node',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DiagramNodeStart`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The type of the node.
         *
         * @attribute type
         * @default 'start'
         * @type String
         */
        type: {
            value: 'start'
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramNodeState
});

A.DiagramBuilder.types.start = A.DiagramNodeStart;

/**
 * A base class for DiagramNodeEnd.
 *
 * @class A.DiagramNodeEnd
 * @extends A.DiagramNodeState
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.DiagramNodeEnd = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-node',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DiagramNodeEnd`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The type of the node.
         *
         * @attribute type
         * @default 'end'
         * @type String
         */
        type: {
            value: 'end'
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramNodeState
});

A.DiagramBuilder.types.end = A.DiagramNodeEnd;

/**
 * A base class for DiagramNodeJoin.
 *
 * @class A.DiagramNodeJoin
 * @extends A.DiagramNodeState
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.DiagramNodeJoin = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-node',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DiagramNodeJoin`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

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
         * The type of the node.
         *
         * @attribute type
         * @default 'join'
         * @type String
         */
        type: {
            value: 'join'
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
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramNodeState,

    prototype: {
        hotPoints: A.DiagramNode.DIAMOND_POINTS,

        renderShapeBoundary: A.DiagramNodeCondition.prototype.renderShapeBoundary,

        _valueShapeBoundary: A.DiagramNode.prototype._valueShapeBoundary
    }
});

A.DiagramBuilder.types.join = A.DiagramNodeJoin;

/**
 * A base class for DiagramNodeFork.
 *
 * @class A.DiagramNodeFork
 * @extends A.DiagramNodeState
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.DiagramNodeFork = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-node',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DiagramNodeFork`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

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
         * The type of the node.
         *
         * @attribute type
         * @default 'fork'
         * @type String
         */
        type: {
            value: 'fork'
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
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramNodeState,

    prototype: {
        hotPoints: A.DiagramNode.DIAMOND_POINTS,

        renderShapeBoundary: A.DiagramNodeCondition.prototype.renderShapeBoundary,

        _valueShapeBoundary: A.DiagramNode.prototype._valueShapeBoundary
    }
});

A.DiagramBuilder.types.fork = A.DiagramNodeFork;

/**
 * A base class for `A.DiagramNodeTask`.
 *
 * @class A.DiagramNodeTask
 * @extends A.DiagramNodeState
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.DiagramNodeTask = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'diagram-node',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DiagramNodeTask`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The height of the node.
         *
         * @attribute height
         * @default 70
         * @type Number
         */
        height: {
            value: 70
        },

        /**
         * The type of the node.
         *
         * @attribute type
         * @default 'task'
         * @type String
         */
        type: {
            value: 'task'
        },

        /**
         * The width of the node.
         *
         * @attribute width
         * @default 70
         * @type Number
         */
        width: {
            value: 70
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.DiagramNodeState,

    prototype: {
        hotPoints: A.DiagramNode.SQUARE_POINTS,

        /**
         * Renders the shape boundary.
         *
         * @method renderShapeBoundary
         */
        renderShapeBoundary: function() {
            var instance = this;

            var boundary = instance.boundary = instance.get('graphic').addShape(
                instance.get('shapeBoundary')
            );

            boundary.translate(8, 8);

            return boundary;
        },

        /**
         * Gets the shape boundary definitions.
         *
         * @method _valueShapeBoundary
         * @protected
         * @return {Object}
         */
        _valueShapeBoundary: function() {
            return {
                height: 55,
                type: 'rect',
                stroke: {
                    weight: 7,
                    color: 'transparent',
                    opacity: 0
                },
                width: 55
            };
        }
    }
});

A.DiagramBuilder.types.task = A.DiagramNodeTask;
