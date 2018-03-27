/**
 * The Diagram Builder Component
 *
 * @module aui-diagram-builder
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isObject = Lang.isObject,
    isString = Lang.isString,

    AArray = A.Array,

    aGetClassName = A.getClassName,

    CSS_PROPERTY_BUILDER_FIELD = aGetClassName('property', 'builder', 'field'),
    CSS_DIAGRAM_NODE = aGetClassName('diagram', 'node'),
    CSS_DIAGRAM_NODE_CONTENT = aGetClassName('diagram', 'node', 'content'),
    CSS_DIAGRAM_NODE_EDITING = aGetClassName('diagram', 'node', 'editing'),
    CSS_DIAGRAM_SUGGEST_CONNECTOR = aGetClassName('diagram', 'node', 'suggest', 'connector'),

    isConnector = function(val) {
        return A.instanceOf(val, A.Connector);
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
 * @extends A.PropertyBuilder
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
        },

        /**
        * Boolean indicating if use of the WAI-ARIA Roles and States should be enabled..
        *
        * @attribute useARIA
        * @default true
        * @type {Boolean}
        */
        useARIA: {
            validator: isBoolean,
            value: true,
            writeOnce: 'initOnly'
        },

        showDeleteNodeIcon: {
            validator: isBoolean,
            value: true,
            writeOnce: 'initOnly'
        },

        enableDeleteByKeyStroke: {
            validator: isBoolean,
            value: true,
            writeOnce: 'initOnly'
        }
    },

    /**
     * Static property used to define the augmented classes.
     *
     * @property AUGMENTS
     * @type Array
     * @static
     */
    AUGMENTS: [A.PropertyBuilderSettings],

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type String
     * @static
     */
    EXTENDS: A.PropertyBuilder,

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
                'mousedown', A.bind(instance._onCloseButtonMouseDown, instance),
                '.diagram-builder-controls button'
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

            instance._setupFieldsDrag();

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

            instance.syncConnectionsUI();

            instance.connector = instance.get('connector');

            if (instance.get('useARIA')) {
                instance.plug(A.Plugin.Aria);
            }
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

            var isDeleteByKeyStrokeEnable = (instance._getAttr('enableDeleteByKeyStroke') === true);

            if (event.isKey('esc')) {
                instance._onEscKey(event);
            } else if (isDeleteByKeyStrokeEnable && (event.isKey('backspace') || event.isKey('delete'))) {
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

        _moveChildrenNodes: function (diagramNode, instance) {
            if (diagramNode._getAttr('children')) {
                var children = diagramNode._getAttr('children').map(
                    function (mapItem) {
                        return instance._getAttr('fields').filter(function (it) {
                            return it._getAttr('name') === mapItem
                        }).item(0)
                    }
                );

                AArray.each(children, function (child) {
                    child._setAttr("x", child._getAttr("x") + (diagramNode.getNodeCoordinates()[0] - diagramNode.get('x')));
                    child._setAttr("y", child._getAttr("y") + (diagramNode.getNodeCoordinates()[1] - diagramNode.get('y')));

                    child.alignTransitions();

                    AArray.each(instance.getSourceNodes(child), function (sourceNode) {
                        sourceNode.alignTransitions();
                    });
                });
            }
        }, /**
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

                if (diagramNode) {
                    this._moveChildrenNodes(diagramNode, instance);

                    diagramNode.alignTransitions();

                    AArray.each(instance.getSourceNodes(diagramNode), function(sourceNode) {
                        sourceNode.alignTransitions();
                    });

                    if (instance.get('useARIA')) {
                        instance.aria.setAttributes(
                            [
                                {
                                    name: 'grabbed',
                                    node: diagramNode.get('boundingBox'),
                                    value: 'true'
                                },
                                {
                                    name: 'dropeffect',
                                    node: instance.get('canvas'),
                                    value: 'move'
                                }
                            ]
                        );
                    }
                    diagramNode.set('xy', diagramNode.getNodeCoordinates());
                }
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
                diagramNode.set('xy', diagramNode.getNodeCoordinates());

                if (instance.get('useARIA')) {
                    instance.aria.setAttributes(
                    [
                        {
                            name: 'grabbed',
                            node: diagramNode.get('boundingBox'),
                            value: 'false'
                        },
                        {
                            name: 'dropeffect',
                            node: instance.get('canvas'),
                            value: 'none'
                        }
                    ]
                );
                }
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
                    xy: A.DiagramNode.getNodeCoordinates(drag.lastXY, instance.dropContainer),
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
                    CSS_PROPERTY_BUILDER_FIELD);
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

            var fields = instance.get('fields');
            var fieldsDragConfig = instance.get('fieldsDragConfig');
            var useARIA = instance.get('useARIA');

            instance.fieldsDrag = new A.DD.Delegate(
                fieldsDragConfig
            );

            if (useARIA) {
                fields.each(
                    function(diagramNode) {
                        var boundingBox = diagramNode.get('boundingBox');

                        boundingBox.attr('draggable', true);
                    }
                );
            }
        }
    }
});

A.DiagramBuilder = DiagramBuilder;

A.namespace('DiagramBuilder.types').node = A.DiagramNode;

A.namespace('DiagramBuilder.types').state = A.DiagramNodeState;

A.namespace('DiagramBuilder.types').condition = A.DiagramNodeCondition;

A.namespace('DiagramBuilder.types').start = A.DiagramNodeStart;

A.namespace('DiagramBuilder.types').end = A.DiagramNodeEnd;

A.namespace('DiagramBuilder.types').join = A.DiagramNodeJoin;

A.namespace('DiagramBuilder.types').fork = A.DiagramNodeFork;

A.namespace('DiagramBuilder.types').task = A.DiagramNodeTask;

A.namespace('DiagramBuilder.types').group = A.DiagramNodeGroup;
