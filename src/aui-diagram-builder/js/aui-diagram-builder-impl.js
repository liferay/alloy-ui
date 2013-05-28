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

	ACTIVE_ELEMENT = 'activeElement',
	ATTRIBUTE_NAME = 'attributeName',
	AVAILABLE_FIELD = 'availableField',
	AVAILABLE_FIELDS = 'availableFields',
	BACKSPACE = 'backspace',
	BOOLEAN = 'boolean',
	BOUNDARY = 'boundary',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CANVAS = 'canvas',
	CLICK = 'click',
	CONDITION = 'condition',
	CONNECTOR = 'connector',
	CONNECTORS = 'connectors',
	CONTENT = 'content',
	CONTROLS = 'controls',
	CONTROLS_TOOLBAR = 'controlsToolbar',
	CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
	DATA = 'data',
	DATA_NODE_ID = 'data-nodeId',
	DELETE = 'delete',
	DELETE_CONNECTORS_MESSAGE = 'deleteConnectorsMessage',
	DELETE_NODES_MESSAGE = 'deleteNodesMessage',
	DESCRIPTION = 'description',
	DIAGRAM = 'diagram',
	DIAGRAM_BUILDER_NAME = 'diagram-builder',
	DIAGRAM_NODE = 'diagramNode',
	DIAGRAM_NODE_MANAGER_NAME = 'diagram-node-manager',
	DIAGRAM_NODE_NAME = 'diagram-node',
	DRAG_NODE = 'dragNode',
	DRAGGING = 'dragging',
	EDITING = 'editing',
	END = 'end',
	ESC = 'esc',
	FIELD = 'field',
	FIELDS = 'fields',
	FIELDS_DRAG_CONFIG = 'fieldsDragConfig',
	FORK = 'fork',
	GRAPHIC = 'graphic',
	HEIGHT = 'height',
	HIGHLIGHT_BOUNDARY_STROKE = 'highlightBoundaryStroke',
	HIGHLIGHT_DROP_ZONES = 'highlightDropZones',
	HIGHLIGHTED = 'highlighted',
	ID = 'id',
	JOIN = 'join',
	KEYDOWN = 'keydown',
	LABEL = 'label',
	LOCK = 'lock',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	NAME = 'name',
	NODE = 'node',
	P1 = 'p1',
	P2 = 'p2',
	PARENT_NODE = 'parentNode',
	RADIUS = 'radius',
	RENDERED = 'rendered',
	REQUIRED = 'required',
	SELECTED = 'selected',
	SHAPE = 'shape',
	SHAPE_BOUNDARY = 'shapeBoundary',
	SHAPE_INVITE = 'shapeInvite',
	SHOW_SUGGEST_CONNECTOR = 'showSuggestConnector',
	SOURCE = 'source',
	START = 'start',
	STATE = 'state',
	STROKE = 'stroke',
	SUGGEST = 'suggest',
	SUGGEST_CONNECTOR_OVERLAY = 'suggestConnectorOverlay',
	TARGET = 'target',
	TASK = 'task',
	TRANSITION = 'transition',
	TRANSITIONS = 'transitions',
	TYPE = 'type',
	VALUE = 'value',
	VISIBLE = 'visible',
	WIDTH = 'width',
	XY = 'xy',
	Z_INDEX = 'zIndex',

	_DASH = '-',
	_DOT = '.',
	_EMPTY_STR = '',
	_UNDERLINE = '_',

	AgetClassName = A.getClassName,

	CSS_DB_CONTROLS = AgetClassName(DIAGRAM, BUILDER, CONTROLS),
	CSS_DIAGRAM_BUILDER_FIELD = AgetClassName(DIAGRAM, BUILDER, FIELD),
	CSS_DIAGRAM_NODE = AgetClassName(DIAGRAM, NODE),
	CSS_DIAGRAM_NODE_CONTENT = AgetClassName(DIAGRAM, NODE, CONTENT),
	CSS_DIAGRAM_NODE_EDITING = AgetClassName(DIAGRAM, NODE, EDITING),
	CSS_DIAGRAM_NODE_LABEL = AgetClassName(DIAGRAM, NODE, LABEL),
	CSS_DIAGRAM_NODE_SELECTED = AgetClassName(DIAGRAM, NODE, SELECTED),
	CSS_DIAGRAM_NODE_SHAPE_BOUNDARY = AgetClassName(DIAGRAM, NODE, SHAPE, BOUNDARY),
	CSS_DIAGRAM_SUGGEST_CONNECTOR = AgetClassName(DIAGRAM, NODE, SUGGEST, CONNECTOR),

	adjustDiagramNodeOffset = function(diagramNode, offsetXY) {
		var dnXY = isArray(diagramNode) ? diagramNode : diagramNode.get(BOUNDING_BOX).getXY();

		return [ dnXY[0] + offsetXY[0], dnXY[1] + offsetXY[1] ];
	},

	pythagoreanDistance = function(p1, p2) {
		var dx = p2[0]-p1[0], dy = p2[1]-p1[1];

		return Math.sqrt(dx*dx + dy*dy);
	},

	findHotPointBestMatch = function(diagramNode1, diagramNode2) {
		var hp1 = diagramNode1.hotPoints,
			hp2 = diagramNode2.hotPoints,
			xy1 = diagramNode1.get(BOUNDING_BOX).getXY(),
			xy2 = diagramNode2.get(BOUNDING_BOX).getXY(), len1, len2, i, j, minDistance = Infinity, match = [[0,0], [0,0]];

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
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var DiagramBuilder = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DiagramBuilder.NAME
	 * @type String
	 * @static
	 */
	NAME: DIAGRAM_BUILDER_NAME,

	/**
	 * Static property used to define the default attribute
	 * configuration for the DiagramBuilder.
	 *
	 * @property DiagramBuilder.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute connector
		 * @default null
		 */
		connector: {
			setter: '_setConnector',
			value: null
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
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
	 * @property DiagramBuilder.EXTENDS
	 * @type String
	 * @static
	 */
	EXTENDS: A.DiagramBuilderBase,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property DiagramBuilder.FIELDS_TAB
	 * @default 0
	 * @type Number
	 * @static
	 */
	FIELDS_TAB: 0,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property DiagramBuilder.SETTINGS_TAB
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
		 * Construction logic executed during DiagramBuilder instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function() {
			var instance = this;

			instance.after({
				render: instance.syncConnectionsUI
			});

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

			instance.handlerKeyDown = A.getDoc().on(KEYDOWN, A.bind(instance._afterKeyEvent, instance));

			instance.dropContainer.delegate(CLICK, A.bind(instance._onNodeClick, instance), _DOT+CSS_DIAGRAM_NODE);
			instance.dropContainer.delegate(MOUSEENTER, A.bind(instance._onNodeMouseEnter, instance), _DOT+CSS_DIAGRAM_NODE);
			instance.dropContainer.delegate(MOUSELEAVE, A.bind(instance._onNodeMouseLeave, instance), _DOT+CSS_DIAGRAM_NODE);
		},

		/**
		 * Render the DiagramBuilder component instance. Lifecycle.
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
		 * Sync the DiagramBuilder UI. Lifecycle.
		 *
		 * @method syncUI
		 * @protected
		 */
		syncUI: function() {
			var instance = this;

			A.DiagramBuilder.superclass.syncUI.apply(this, arguments);

			instance._setupFieldsDrag();

			instance.connector = instance.get(CONNECTOR);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method syncConnectionsUI
		 */
		syncConnectionsUI: function() {
			var instance = this;

			instance.get(FIELDS).each(function(diagramNode) {
				diagramNode.syncConnectionsUI();
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method clearFields
		 */
		clearFields: function() {
			var instance = this;

			var fields = [];

			instance.get(FIELDS).each(function(diagramNode) {
				fields.push(diagramNode);
			});

			AArray.each(fields, function(diagramNode) {
				diagramNode.destroy();
			});

			fields = instance.editingConnector = instance.editingNode = instance.selectedNode = null;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
				editingNode.get(BOUNDING_BOX).removeClass(CSS_DIAGRAM_NODE_EDITING);
			}

			instance.editingConnector = instance.editingNode = null;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
				diagramNode1.connect(diagramNode2.get(NAME), optConnector);
			}

			return instance;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method connectAll
		 * @param nodes
		 */
		connectAll: function(nodes) {
			var instance = this;

			AArray.each(nodes, function(node) {
				if (node.hasOwnProperty(SOURCE) && node.hasOwnProperty(TARGET)) {
					instance.connect(node.source, node.target, node.connector);
				}
			});

			return instance;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method createField
		 * @param val
		 */
		createField: function(val) {
			var instance = this;

			if (!isDiagramNode(val)) {
				val.builder = instance;
				val.bubbleTargets = instance;
				val = new (instance.getFieldClass(val.type || NODE))(val);
			}

			return val;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method deleteSelectedConnectors
		 */
		deleteSelectedConnectors: function() {
			var instance = this;
			var strings = instance.getStrings();
			var selectedConnectors = instance.getSelectedConnectors();

			if (selectedConnectors.length && confirm(strings[DELETE_CONNECTORS_MESSAGE])) {
				AArray.each(selectedConnectors, function(connector) {
					var transition = connector.get(TRANSITION);

					A.DiagramNode.getNodeByName(transition.source).disconnect(transition);
				});

				instance.stopEditing();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method deleteSelectedNode
		 */
		deleteSelectedNode: function() {
			var instance = this;
			var strings = instance.getStrings();
			var selectedNode = instance.selectedNode;

			if (selectedNode && !selectedNode.get(REQUIRED) && confirm(strings[DELETE_NODES_MESSAGE])) {
				selectedNode.close();
				instance.editingNode = instance.selectedNode = null;
				instance.stopEditing();
			}
		},

		/**
		 * Destructor lifecycle implementation for the DiagramBuilder class. Lifecycle.
		 *
		 * @method destructor
		 * @param attribute
		 * @protected
		 */
		destructor: function(attribute){
			var instance = this;

			instance.get(SUGGEST_CONNECTOR_OVERLAY).destroy();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method eachConnector
		 * @param fn
		 */
		eachConnector: function(fn) {
			var instance = this;

			instance.get(FIELDS).each(function(diagramNode) {
				var transitions = diagramNode.get(TRANSITIONS);

				AArray.each(transitions.values(), function(transition) {
					fn.call(instance, diagramNode.getConnector(transition), transition, diagramNode);
				});
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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

				instance.propertyList.set(DATA, connector.getProperties());

				instance.editingConnector = instance.selectedConnector = connector;
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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

				instance.propertyList.set(DATA, diagramNode.getProperties());

				diagramNode.get(BOUNDING_BOX).addClass(CSS_DIAGRAM_NODE_EDITING);

				instance.editingNode = instance.selectedNode = diagramNode;
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getFieldClass
		 * @param type
		 */
		getFieldClass: function(type) {
			var instance = this;
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getNodesByTransitionProperty
		 * @param property
		 * @param value
		 */
		getNodesByTransitionProperty: function(property, value) {
			var instance = this,
				nodes = [],
				transitions;

			instance.get(FIELDS).each(function(diagramNode) {
				transitions = diagramNode.get(TRANSITIONS);

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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getSelectedConnectors
		 */
		getSelectedConnectors: function() {
			var instance = this;
			var selected = [];

			instance.eachConnector(function(connector) {
				if (connector.get(SELECTED)) {
					selected.push(connector);
				}
			});

			return selected;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getSourceNodes
		 * @param diagramNode
		 */
		getSourceNodes: function(diagramNode) {
			var instance = this;

			return instance.getNodesByTransitionProperty(TARGET, diagramNode.get(NAME));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method hideSuggestConnetorOverlay
		 * @param diagramNode
		 * @param drag
		 */
		hideSuggestConnetorOverlay: function(diagramNode, drag) {
			var instance = this;

			instance.connector.hide();
			instance.get(SUGGEST_CONNECTOR_OVERLAY).hide();

			try {
				instance.fieldsDrag.dd.set(LOCK, false);
			}
			catch(e) {
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method isAbleToConnect
		 */
		isAbleToConnect: function() {
			var instance = this;

			return !!(instance.publishedSource && instance.publishedTarget);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method isFieldsDrag
		 * @param drag
		 */
		isFieldsDrag: function(drag) {
			var instance = this;

			return (drag === instance.fieldsDrag.dd);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method plotField
		 * @param field
		 */
		plotField: function(field) {
			var instance = this;

			if (!field.get(RENDERED)) {
				field.render(instance.dropContainer);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method select
		 * @param diagramNode
		 */
		select: function(diagramNode) {
			var instance = this;

			instance.unselectNodes();

			instance.selectedNode = diagramNode.set(SELECTED, true).focus();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method showSuggestConnetorOverlay
		 * @param xy
		 */
		showSuggestConnetorOverlay: function(xy) {
			var instance = this,
				showSuggestConnetorOverlay = instance.get(SUGGEST_CONNECTOR_OVERLAY),
				boundingBox = showSuggestConnetorOverlay.get(BOUNDING_BOX);

			showSuggestConnetorOverlay.get(BOUNDING_BOX).addClass(CSS_DIAGRAM_SUGGEST_CONNECTOR);

			showSuggestConnetorOverlay.set(
				XY, xy || instance.connector.get(P2)).show();

			try {
				instance.fieldsDrag.dd.set(LOCK, true);
			}
			catch(e) {
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method toJSON
		 */
		toJSON: function() {
			var instance = this;

			var output = {
				nodes: []
			};

			instance.get(FIELDS).each(function(diagramNode) {
				var node = {
					transitions: []
				},
				transitions = diagramNode.get(TRANSITIONS);

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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method unselectConnectors
		 */
		unselectConnectors: function() {
			var instance = this;

			AArray.each(instance.getSelectedConnectors(), function(connector) {
				connector.set(SELECTED, false);
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method unselectNodes
		 */
		unselectNodes: function() {
			var instance = this;
			var selectedNode = instance.selectedNode;

			if (selectedNode) {
				selectedNode.set(SELECTED, false);
			}

			instance.selectedNode = null;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterKeyEvent
		 * @param event
		 * @protected
		 */
		_afterKeyEvent: function(event) {
			var instance = this;

			if (event.hasModifier() || A.getDoc().get(ACTIVE_ELEMENT).test(':input,td')) {
				return;
			}

			if (event.isKey(ESC)) {
				instance._onEscKey(event);
			}
			else if (event.isKey(BACKSPACE) || event.isKey(DELETE)) {
				instance._onDeleteKey(event);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onCancel
		 * @param event
		 * @protected
		 */
		_onCancel: function(event) {
			var instance = this;

			instance.closeEditProperties();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onDeleteKey
		 * @param event
		 * @protected
		 */
		_onDeleteKey: function(event) {
			var instance = this;

			if (isDiagramNode(A.Widget.getByNode(event.target))) {
				instance.deleteSelectedConnectors();
				instance.deleteSelectedNode();

				event.halt();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onDrag
		 * @param event
		 * @protected
		 */
		_onDrag: function(event) {
			var instance = this;
			var drag = event.target;

			if (instance.isFieldsDrag(drag)) {
				var diagramNode = A.Widget.getByNode(drag.get(DRAG_NODE));

				diagramNode.alignTransitions();

				AArray.each(instance.getSourceNodes(diagramNode), function(sourceNode) {
					sourceNode.alignTransitions();
				});
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onDragEnd
		 * @param event
		 * @protected
		 */
		_onDragEnd: function(event) {
			var instance = this;
			var drag = event.target;
			var diagramNode = A.Widget.getByNode(drag.get(DRAG_NODE));

			if (diagramNode && instance.isFieldsDrag(drag)) {
				diagramNode.set(XY, diagramNode.getLeftTop());
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onDropHit
		 * @param event
		 * @protected
		 */
		_onDropHit: function(event) {
			var instance = this;
			var drag = event.drag;

			if (instance.isAvailableFieldsDrag(drag)) {
				var availableField = drag.get(NODE).getData(AVAILABLE_FIELD);

				var newField = instance.addField({
					xy: getLeftTop(drag.lastXY, instance.dropContainer),
					type: availableField.get(TYPE)
				});

				instance.select(newField);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onEscKey
		 * @param event
		 * @protected
		 */
		_onEscKey: function(event) {
			var instance = this;

			instance.hideSuggestConnetorOverlay();
			instance.stopEditing();
			event.halt();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onCanvasClick
		 * @param event
		 * @protected
		 */
		_onCanvasClick: function(event) {
			var instance = this;

			instance.stopEditing();
			instance.hideSuggestConnetorOverlay();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onNodeEdit
		 * @param event
		 * @protected
		 */
		_onNodeEdit: function(event) {
			var instance = this;

			// Only enable editing if the double clicked node is inside the node contentBox.
			if (!event.target.ancestor(_DOT+CSS_DIAGRAM_NODE_CONTENT, true)) {
				return;
			}

			var diagramNode = A.Widget.getByNode(event.currentTarget);

			if (diagramNode) {
				instance.editNode(diagramNode);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onNodeMouseEnter
		 * @param event
		 * @protected
		 */
		_onNodeMouseEnter: function(event) {
			var instance = this;
			var diagramNode = A.Widget.getByNode(event.currentTarget);

			diagramNode.set(HIGHLIGHTED, true);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onNodeMouseLeave
		 * @param event
		 * @protected
		 */
		_onNodeMouseLeave: function(event) {
			var instance = this;
			var publishedSource = instance.publishedSource;
			var diagramNode = A.Widget.getByNode(event.currentTarget);

			if (!publishedSource || !publishedSource.boundaryDragDelegate.dd.get(DRAGGING)) {
				diagramNode.set(HIGHLIGHTED, false);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onSave
		 * @param event
		 * @protected
		 */
		_onSave: function(event) {
			var instance = this;
			var editingNode = instance.editingNode;
			var editingConnector = instance.editingConnector;
			var modelList = instance.propertyList.get(DATA);

			if (editingNode) {
				modelList.each(function(model) {
					editingNode.set(model.get(ATTRIBUTE_NAME), model.get(VALUE));
				});
			}
			else if (editingConnector) {
				modelList.each(function(model) {
					editingConnector.set(model.get(ATTRIBUTE_NAME), model.get(VALUE));
				});
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onSuggestConnectorNodeClick
		 * @param event
		 * @protected
		 */
		_onSuggestConnectorNodeClick: function(event) {
			var instance = this;
			var availableField = event.currentTarget.getData(AVAILABLE_FIELD);
			var connector = instance.connector;

			var node = instance.addField({
				type: availableField.get(TYPE),
				xy: connector.toCoordinate(connector.get(P2))
			});

			instance.hideSuggestConnetorOverlay();
			instance.publishedSource.connectNode(node);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _renderGraphic
		 * @protected
		 */
		_renderGraphic: function() {
			var instance = this;
			var graphic = instance.get(GRAPHIC);
			var canvas = instance.get(CANVAS);

			graphic.render(canvas);
			A.one(canvas).on(CLICK, A.bind(instance._onCanvasClick, instance));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setConnector
		 * @param val
		 * @protected
		 */
		_setConnector: function(val) {
			var instance = this;

			if (!isConnector(val)) {
				var xy = instance.get(CANVAS).getXY();

				val = new A.Connector(
					A.merge(
						{
							builder: instance,
							graphic: instance.get(GRAPHIC),
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setFieldsDragConfig
		 * @param val
		 * @protected
		 */
		_setFieldsDragConfig: function(val) {
			var instance = this;
			var dropContainer = instance.dropContainer;

			return A.merge(
				{
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
									scrollDelay: 150
								},
								fn: A.Plugin.DDWinScroll
							}
						]
					},
					nodes: _DOT+CSS_DIAGRAM_NODE
				},
				val || {}
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setSuggestConnectorOverlay
		 * @param val
		 * @protected
		 */
		_setSuggestConnectorOverlay: function(val) {
			var instance = this;

			if (!val) {
				var docFrag = A.getDoc().invoke(CREATE_DOCUMENT_FRAGMENT),
					boundingBox,
					contentBox;

				AArray.each(instance.get(AVAILABLE_FIELDS), function(field) {
					var node = field.get(NODE);

					docFrag.appendChild(
						node.clone().setData(AVAILABLE_FIELD, node.getData(AVAILABLE_FIELD))
					);
				});

				val = new A.Overlay({
					bodyContent: docFrag,
					render: true,
					visible: false,
					width: 280,
					zIndex: 10000
				});

				boundingBox = val.get(BOUNDING_BOX);
				contentBox = val.get('contentBox');

				contentBox.addClass('popover-content');
				boundingBox.addClass('popover');

				boundingBox.delegate(CLICK, A.bind(instance._onSuggestConnectorNodeClick, instance), _DOT+CSS_DIAGRAM_BUILDER_FIELD);
			}

			return val;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setupFieldsDrag
		 * @protected
		 */
		_setupFieldsDrag: function() {
			var instance = this;

			instance.fieldsDrag = new A.DD.Delegate(
				instance.get(FIELDS_DRAG_CONFIG)
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
 * @extends A.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var DiagramNodeManagerBase = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DiagramNodeManagerBase.NAME
	 * @type String
	 * @static
	 */
	NAME: DIAGRAM_NODE_MANAGER_NAME,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property DiagramNodeManagerBase.EXTENDS
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
 * @extends A.Overlay
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var DiagramNode = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DiagramNode.NAME
	 * @type String
	 * @static
	 */
	NAME: DIAGRAM_NODE_NAME,

	/**
	 * Static property used to define the UI attributes.
	 *
	 * @property DiagramNode.UI_ATTRS
	 * @type Array
	 * @static
	 */
	UI_ATTRS: [HIGHLIGHTED, NAME, REQUIRED, SELECTED],

	/**
	 * Static property used to define the default attribute
	 * configuration for the DiagramNode.
	 *
	 * @property DiagramNode.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute builder
		 * @type DiagramBuilder
		 */
		builder: {
			validator: isDiagramBuilder
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute connectors
		 * @writeOnce
		 */
		connectors: {
			valueFn: '_connectorsValueFn',
			writeOnce: true
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute controlsToolbar
		 * @type Object
		 */
		controlsToolbar: {
			validator: isObject,
			valueFn: '_controlsToolbarValueFn'
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute description
		 * @default ''
		 * @type String
		 */
		description: {
			value: _EMPTY_STR,
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute height
		 * @default 60
		 * @type Number
		 */
		height: {
			value: 60
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute name
		 * @type String
		 */
		name: {
			valueFn: function() {
				var instance = this;

				return instance.get(TYPE) + (++A.Env._uidx);
			},
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute shapeBoundary
		 * @type Object
		 */
		shapeBoundary: {
			validator: isObject,
			valueFn: '_valueShapeBoundary'
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute tabIndex
		 * @default 1
		 * @type Number
		 */
		tabIndex: {
			value: 1
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute type
		 * @default 'node'
		 * @type String
		 */
		type: {
			value: NODE,
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute width
		 * @default 60
		 * @type Number
		 */
		width: {
			value: 60
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
	 * @property DiagramNode.EXTENDS
	 * @type String
	 * @static
	 */
	EXTENDS: A.Overlay,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property DiagramNode.CIRCLE_POINTS
	 * @type Array
	 * @static
	 */
	CIRCLE_POINTS: [[35, 20], [28, 33], [14, 34], [5, 22], [10, 9], [24, 6], [34, 16], [31, 30], [18, 35], [6, 26], [7, 12], [20, 5], [33, 12], [34, 26], [22, 35], [9, 30], [6, 16], [16, 6], [30, 9], [35, 22], [26, 34], [12, 33], [5, 20], [12, 7], [26, 6], [35, 18], [30, 31], [16, 34], [6, 24], [9, 10], [22, 5], [34, 14], [33, 28], [20, 35], [7, 28], [6, 14], [18, 5], [31, 10], [34, 24], [24, 34], [10, 31], [5, 18], [14, 6], [28, 8], [35, 20], [28, 33], [14, 34], [5, 22], [10, 8], [25, 6], [34, 16], [31, 30], [18, 35], [6, 26], [8, 12], [20, 5], [33, 12], [33, 27], [22, 35], [8, 30], [6, 15], [16, 6], [30, 9], [35, 23], [26, 34], [12, 32], [5, 20], [12, 7], [27, 7], [35, 18], [29, 32], [15, 34]],

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property DiagramNode.DIAMOND_POINTS
	 * @type Array
	 * @static
	 */
	DIAMOND_POINTS: [ [30,5], [35,10], [40,15], [45,20], [50,25], [55,30], [50,35], [45,40], [40,45], [35,50], [30,55], [25,50], [20,45], [15,40], [10,35], [5,30], [10,25], [15,20], [20,15], [25,10] ],

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property DiagramNode.SQUARE_POINTS
	 * @type Array
	 * @static
	 */
	SQUARE_POINTS: [ [5,5], [10,5], [15,5], [20,5] ,[25,5], [30,5], [35,5], [40,5], [50,5], [55,5], [60,5], [65, 5], [65,10], [65,15], [65,20], [65,25], [65,30], [65,35], [65,40], [65,45], [65,50], [65,55], [65, 60], [65, 65], [60,65], [55,65], [50,65], [45,65], [40,65], [35,65], [30,65], [25,65], [20,65], [15,65], [10,65], [5, 65], [5,60], [5,55], [5,50], [5,45], [5,40], [5,35], [5,30], [5,25], [5,20], [5,15], [5,10] ],

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method getNodeByName
	 * @param name
	 * @private
	 */
	getNodeByName: function(name) {
		return A.Widget.getByNode('[data-nodeId=' + A.DiagramNode.buildNodeId(name) + ']');
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method buildNodeId
	 * @param id
	 * @private
	 */
	buildNodeId: function(id) {
		return DIAGRAM_NODE + _UNDERLINE + FIELD + _UNDERLINE + id.replace(/[^a-z0-9.:_\-]/ig, '_');
	},

	prototype: {
		LABEL_TEMPLATE: '<div class="' + CSS_DIAGRAM_NODE_LABEL + '">{label}</div>',

		boundary: null,

		hotPoints: [ [0,0] ],

		CONTROLS_TEMPLATE: '<div class="' + CSS_DB_CONTROLS + '"></div>',

		SERIALIZABLE_ATTRS: [DESCRIPTION, NAME, REQUIRED, TYPE, WIDTH, HEIGHT, Z_INDEX, XY],

		/**
		 * Construction logic executed during DiagramNode instantiation. Lifecycle.
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
				connectDrop: { defaultFn: instance.connectDrop },
				connectEnd: { defaultFn: instance.connectEnd },
				connectMove: { defaultFn: instance.connectMove },
				connectOutTarget: { defaultFn: instance.connectOutTarget },
				connectOverTarget: { defaultFn: instance.connectOverTarget },
				connectStart: { defaultFn: instance.connectStart },
				boundaryMouseEnter: {},
				boundaryMouseLeave: {}
			});

			instance.get(BOUNDING_BOX).addClass(CSS_DIAGRAM_NODE+_DASH+instance.get(TYPE));
		},

		/**
		 * Destructor lifecycle implementation for the DiagramNode class. Lifecycle.
		 *
		 * @method destructor
		 * @protected
		 */
		destructor: function() {
			var instance = this;

			instance.eachConnector(function(connector, index, sourceNode) {
				sourceNode.removeTransition(connector.get(TRANSITION));
			});

			instance.invite.destroy();
			instance.get(GRAPHIC).destroy();
			instance.get(BUILDER).removeField(instance);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method addTransition
		 * @param transition
		 */
		addTransition: function(transition) {
			var instance = this,
				transitions = instance.get(TRANSITIONS);

			transition = instance.prepareTransition(transition);

			if (!transitions.has(transition.uid)) {
				transition.uid = A.guid();
				transitions.put(transition.uid, transition);
			}

			return transition;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method alignTransitions
		 */
		alignTransitions: function() {
			var instance = this,
				transitions = instance.get(TRANSITIONS);

			AArray.each(transitions.values(), A.bind(instance.alignTransition, instance));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method close
		 */
		close: function() {
			var instance = this;

			return instance.destroy();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
					var builder = instance.get(BUILDER);
					var bestMatch = findHotPointBestMatch(instance, diagramNode);

					A.mix(transition, {
						sourceXY: bestMatch[0],
						targetXY: bestMatch[1]
					});

					connector = new A.Connector(
						A.merge({
							builder: builder,
							graphic: builder.get(GRAPHIC),
							transition: transition
						}, optConnector)
					);

					instance.get(CONNECTORS).put(transition.uid, connector);
				}
			}

			instance.alignTransition(transition);

			return connector;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method connectDrop
		 * @param event
		 */
		connectDrop: function(event) {
			var instance = this;

			instance.connectNode(event.publishedTarget);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method connectEnd
		 * @param event
		 */
		connectEnd: function(event) {
			var instance = this;
			var drag = event.target;
			var builder = instance.get(BUILDER);
			var publishedSource = builder.publishedSource;

			if (!builder.isAbleToConnect() && builder.get(SHOW_SUGGEST_CONNECTOR) && builder.connector.get(VISIBLE)) {
				builder.showSuggestConnetorOverlay();
			}
			else {
				builder.connector.hide();
				publishedSource.invite.set(VISIBLE, false);
			}

			if (builder.get(HIGHLIGHT_DROP_ZONES)) {
				builder.get(FIELDS).each(function(diagramNode) {
					diagramNode.set(HIGHLIGHTED, false);
				});
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method connectMove
		 * @param event
		 */
		connectMove: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);
			var mouseXY = event.mouseXY;

			builder.connector.set(P2, mouseXY);

			if (builder.publishedTarget) {
				var invite = instance.invite;
				var offset = invite.get(RADIUS) || 0;

				if (!invite.get(VISIBLE)) {
					invite.set(VISIBLE, true);
				}

				invite.setXY([ mouseXY[0] - offset, mouseXY[1] - offset ]);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method connectNode
		 * @param diagramNode
		 */
		connectNode: function(diagramNode) {
			var instance = this;
			var dd = instance.boundaryDragDelegate.dd;

			instance.connect(
				instance.prepareTransition({
					sourceXY: getLeftTop(dd.startXY, instance.get(BOUNDING_BOX)),
					target: diagramNode.get(NAME),
					targetXY: getLeftTop(dd.mouseXY, diagramNode.get(BOUNDING_BOX))
				})
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method connectOutTarget
		 * @param event
		 */
		connectOutTarget: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);

			builder.publishedTarget = null;
			builder.publishedSource.invite.set(VISIBLE, false);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method connectOverTarget
		 * @param event
		 */
		connectOverTarget: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);

			if (builder.publishedSource !== instance) {
				builder.publishedTarget = instance;
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method connectStart
		 * @param event
		 */
		connectStart: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);
			var canvas = builder.get(CANVAS);

			builder.connector.show().set(P1, event.startXY);

			if (builder.get(HIGHLIGHT_DROP_ZONES)) {
				builder.get(FIELDS).each(function(diagramNode) {
					diagramNode.set(HIGHLIGHTED, true);
				});
			}

			A.DiagramNodeManager.fire('publishedSource', { publishedSource: instance });
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method eachConnector
		 * @param fn
		 */
		eachConnector: function(fn) {
			var instance = this,
				sourceNodes = [],
				connectors = [].concat(instance.get(CONNECTORS).values()),
				tIndex = connectors.length;

			AArray.each(instance.get(BUILDER).getSourceNodes(instance), function(sourceNode) {
				var sourceConnectors = sourceNode.get(CONNECTORS);

				AArray.each(sourceConnectors.values(), function(connector) {
					if (instance.get(NAME) === connector.get(TRANSITION).target) {
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getConnector
		 * @param transition
		 */
		getConnector: function(transition) {
			var instance = this;

			return instance.get(CONNECTORS).getValue(transition.uid);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getContainer
		 */
		getContainer: function() {
			var instance = this;

			return (instance.get(BUILDER).dropContainer || instance.get(BOUNDING_BOX).get(PARENT_NODE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getLeftTop
		 */
		getLeftTop: function() {
			var instance = this;

			return getLeftTop(instance.get(BOUNDING_BOX), instance.getContainer());
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getProperties
		 */
		getProperties: function() {
			var instance = this;
			var propertyModel = instance.getPropertyModel();

			AArray.each(propertyModel, function(property) {
				var value = instance.get(property.attributeName), type = Lang.type(value);

				if (type === BOOLEAN) {
					value = String(value);
				}

				property.value = value;
			});

			return propertyModel;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getPropertyModel
		 */
		getPropertyModel: function() {
			var instance = this;
			var strings = instance.getStrings();

			return [
				{
					attributeName: DESCRIPTION,
					editor: new A.TextAreaCellEditor(),
					name: strings[DESCRIPTION]
				},
				{
					attributeName: NAME,
					editor: new A.TextCellEditor({
						validator: {
							rules: {
								value: {
									required: true
								}
							}
						}
					}),
					name: strings[NAME]
				},
				{
					attributeName: TYPE,
					editor: false,
					name: strings[TYPE]
				}
			];
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method isBoundaryDrag
		 * @param drag
		 */
		isBoundaryDrag: function(drag) {
			var instance = this;

			return (drag === instance.boundaryDragDelegate.dd);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method isTransitionConnected
		 * @param transition
		 */
		isTransitionConnected: function(transition) {
			var instance = this;

			return instance.get(CONNECTORS).has(transition.uid);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method prepareTransition
		 * @param val
		 */
		prepareTransition: function(val) {
			var instance = this;

			var transition = {
				source: instance.get(NAME),
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method removeTransition
		 * @param transition
		 */
		removeTransition: function(transition) {
			var instance = this;

			return instance.get(TRANSITIONS).remove(transition.uid);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method renderShapeBoundary
		 */
		renderShapeBoundary: function() {
			var instance = this;

			var boundary = instance.boundary = instance.get(GRAPHIC).addShape(instance.get(SHAPE_BOUNDARY));

			return boundary;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method renderShapeInvite
		 */
		renderShapeInvite: function() {
			var instance = this;

			var invite = instance.invite = instance.get(BUILDER).get(GRAPHIC).addShape(instance.get(SHAPE_INVITE));

			invite.set(VISIBLE, false);

			return invite;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method syncConnectionsUI
		 */
		syncConnectionsUI: function() {
			var instance = this,
				transitions = instance.get(TRANSITIONS);

			AArray.each(transitions.values(), function(transition) {
				instance.connect(transition, transition.connector);
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterConnectorRemove
		 * @param event
		 * @protected
		 */
		_afterConnectorRemove: function(event) {
			var instance = this;

			event.value.destroy();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterRender
		 * @param event
		 * @protected
		 */
		_afterRender: function(event) {
			var instance = this;

			instance.setStdModContent(WidgetStdMod.BODY, _EMPTY_STR, WidgetStdMod.AFTER);
			instance._renderGraphic();
			instance._renderControls();
			instance._renderLabel();
			instance._uiSetHighlighted(instance.get(HIGHLIGHTED));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterTransitionsRemove
		 * @param event
		 * @protected
		 */
		_afterTransitionsRemove: function(event) {
			var instance = this;

			instance.get(CONNECTORS).remove(event.value.uid);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _connectorsValueFn
		 * @param val
		 * @protected
		 */
		_connectorsValueFn: function(val) {
			var instance = this;

			return new A.Map({
				after: {
					remove: A.bind(instance._afterConnectorRemove, instance)
				}
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _controlsToolbarValueFn
		 * @param val
		 * @protected
		 */
		_controlsToolbarValueFn: function(val) {
			var instance = this,
				id = instance.get(ID);

			return {
				children: [
					{
						icon: 'icon-remove',
						on: {
							click: A.bind(instance._handleCloseEvent, instance)
						}
					}
				]
			};
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleCloseEvent
		 * @param event
		 * @protected
		 */
		_handleCloseEvent: function(event) {
			var instance = this;

			instance.get(BUILDER).deleteSelectedNode();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleConnectStart
		 * @param startXY
		 * @protected
		 */
		_handleConnectStart: function(startXY) {
			var instance = this;

			instance.fire('connectStart', { startXY: startXY });
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleConnectMove
		 * @param mouseXY
		 * @protected
		 */
		_handleConnectMove: function(mouseXY) {
			var instance = this;
			var builder = instance.get(BUILDER);

			instance.fire('connectMove', {
				mouseXY: mouseXY,
				publishedSource: builder.publishedSource
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleConnectEnd
		 * @protected
		 */
		_handleConnectEnd: function() {
			var instance = this;
			var builder = instance.get(BUILDER);
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleConnectOutTarget
		 * @protected
		 */
		_handleConnectOutTarget: function() {
			var instance = this;
			var builder = instance.get(BUILDER);
			var publishedSource = builder.publishedSource;

			if (publishedSource) {
				instance.fire('connectOutTarget', {
					publishedSource: publishedSource
				});
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleConnectOverTarget
		 * @protected
		 */
		_handleConnectOverTarget: function() {
			var instance = this;
			var builder = instance.get(BUILDER);
			var publishedSource = builder.publishedSource;

			if (publishedSource) {
				instance.fire('connectOverTarget', {
					publishedSource: publishedSource
				});
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onBoundaryDrag
		 * @param event
		 * @protected
		 */
		_onBoundaryDrag: function(event) {
			var instance = this;
			var dd = instance.boundaryDragDelegate.dd;

			instance._handleConnectMove(dd.con._checkRegion(dd.mouseXY));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onBoundaryDragEnd
		 * @param event
		 * @protected
		 */
		_onBoundaryDragEnd: function(event) {
			var instance = this;

			instance._handleConnectEnd();
			event.target.get(DRAG_NODE).show();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onBoundaryDragStart
		 * @param event
		 * @protected
		 */
		_onBoundaryDragStart: function(event) {
			var instance = this;

			instance._handleConnectStart(instance.boundaryDragDelegate.dd.startXY);
			event.target.get(DRAG_NODE).hide();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onNameChange
		 * @param event
		 * @protected
		 */
		_onNameChange: function(event) {
			var instance = this;

			instance.eachConnector(function(connector, index, sourceNode) {
				var transition = connector.get(TRANSITION);

				transition[(instance === sourceNode) ? SOURCE : TARGET] = event.newVal;
				connector.set(TRANSITION, transition);
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _renderControls
		 * @protected
		 */
		_renderControls: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			instance.controlsNode = A.Node.create(instance.CONTROLS_TEMPLATE).appendTo(boundingBox);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _renderControlsToolbar
		 * @param event
		 * @protected
		 */
		_renderControlsToolbar: function(event) {
			var instance = this;

			instance.controlsToolbar = new A.Toolbar(
				instance.get(CONTROLS_TOOLBAR)
			)
			.render(instance.controlsNode);

			instance._uiSetRequired(instance.get(REQUIRED));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _renderGraphic
		 * @protected
		 */
		_renderGraphic: function() {
			var instance = this;

			instance.set(
				GRAPHIC,
				new A.Graphic({
					height: instance.get(HEIGHT),
					render: instance.bodyNode,
					width: instance.get(WIDTH)
				})
			);

			instance.renderShapeInvite();
			instance.renderShapeBoundary().addClass(CSS_DIAGRAM_NODE_SHAPE_BOUNDARY);

			instance._bindBoundaryEvents();
			instance._setupBoundaryDrag();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setTransitions
		 * @param val
		 * @protected
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

					transition = isObject(transition) ? A.mix(transition, { uid: uid }) : { uid: uid, target: transition };

					map.put(uid, instance.prepareTransition(transition));
				});

				val = map;
			}

			return val;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setupBoundaryDrag
		 * @protected
		 */
		_setupBoundaryDrag: function() {
			var instance = this;

			var builder = instance.get(BUILDER);

			instance.boundaryDragDelegate = new A.DD.Delegate({
				bubbleTargets: instance,
				container: instance.bodyNode,
				nodes: _DOT+CSS_DIAGRAM_NODE_SHAPE_BOUNDARY,
				dragConfig: {
					useShim: false,
					plugins: [
						{
							cfg: {
								constrain: (builder ? builder.get(CANVAS) : null)
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

			// Drag _unprep method invoke .detachAll() on the node, so we need to rebind the events.
			A.Do.after(instance._bindBoundaryEvents, instance.boundaryDragDelegate.dd, '_unprep', instance);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetHighlighted
		 * @param val
		 * @protected
		 */
		_uiSetHighlighted: function(val) {
			var instance = this;

			if (instance.get(RENDERED)) {
				var stroke = val ? instance.get(HIGHLIGHT_BOUNDARY_STROKE) : instance.get(SHAPE_BOUNDARY+_DOT+STROKE);

				if (stroke) {
					instance.boundary.set(STROKE, stroke);
				}
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetName
		 * @param val
		 * @protected
		 */
		_uiSetName: function(val) {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			boundingBox.setAttribute(DATA_NODE_ID, A.DiagramNode.buildNodeId(val));

			if (instance.get('rendered')) {
				instance.labelNode.setContent(val);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetRequired
		 * @param val
		 * @protected
		 */
		_uiSetRequired: function(val) {
			var instance = this,
				controlsToolbar = instance.controlsToolbar;

			if (controlsToolbar) {
				// TODO
				// controlsToolbar.disable button
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetSelected
		 * @param val
		 * @protected
		 */
		_uiSetSelected: function(val) {
			var instance = this;

			instance.get(BOUNDING_BOX).toggleClass(CSS_DIAGRAM_NODE_SELECTED, val);

			if (val && !instance.controlsToolbar) {
				instance._renderControlsToolbar();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetXY
		 * @param val
		 * @protected
		 */
		_uiSetXY : function(val) {
			var instance = this;
			var containerXY = instance.getContainer().getXY();

			this._posNode.setXY([ val[0] + containerXY[0], val[1] + containerXY[1] ]);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _valueShapeBoundary
		 * @protected
		 */
		_valueShapeBoundary: function() {
			var instance = this;

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

A.DiagramBuilder.types[NODE] = A.DiagramNode;

/**
 * A base class for DiagramNodeState.
 *
 * @class A.DiagramNodeState
 * @extends A.DiagramNode
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.DiagramNodeState = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DiagramNodeState.NAME
	 * @type String
	 * @static
	 */
	NAME: DIAGRAM_NODE_NAME,

	/**
	 * Static property used to define the default attribute
	 * configuration for the DiagramNodeState.
	 *
	 * @property DiagramNodeState.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute height
		 * @default 40
		 * @type Number
		 */
		height: {
			value: 40
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute type
		 * @default 'state'
		 * @type String
		 */
		type: {
			value: STATE
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
	 * @property DiagramNodeState.EXTENDS
	 * @type String
	 * @static
	 */
	EXTENDS: A.DiagramNode,

	prototype: {
		hotPoints: A.DiagramNode.CIRCLE_POINTS,

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method renderShapeBoundary
		 */
		renderShapeBoundary: function() {
			var instance = this;

			var boundary = instance.boundary = instance.get(GRAPHIC).addShape(
				instance.get(SHAPE_BOUNDARY)
			);

			boundary.translate(5, 5);

			return boundary;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _valueShapeBoundary
		 * @protected
		 */
		_valueShapeBoundary: function() {
			var instance = this;

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

A.DiagramBuilder.types[STATE] = A.DiagramNodeState;

/**
 * A base class for DiagramNodeCondition.
 *
 * @class A.DiagramNodeCondition
 * @extends A.DiagramNodeState
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.DiagramNodeCondition = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DiagramNodeCondition.NAME
	 * @type String
	 * @static
	 */
	NAME: DIAGRAM_NODE_NAME,

	/**
	 * Static property used to define the default attribute
	 * configuration for the DiagramNodeCondition.
	 *
	 * @property DiagramNodeCondition.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute height
		 * @default 60
		 * @type Number
		 */
		height: {
			value: 60
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute type
		 * @default 'condition'
		 * @type String
		 */
		type: {
			value: CONDITION
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
	 * @property DiagramNodeCondition.EXTENDS
	 * @type String
	 * @static
	 */
	EXTENDS: A.DiagramNodeState,

	prototype: {
		hotPoints: A.DiagramNode.DIAMOND_POINTS,

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method renderShapeBoundary
		 */
		renderShapeBoundary: function() {
			var instance = this;

			var boundary = instance.boundary = instance.get(GRAPHIC).addShape(
				instance.get(SHAPE_BOUNDARY)
			);

			boundary.translate(10, 10);
			boundary.rotate(45);

			return boundary;
		},

		_valueShapeBoundary: A.DiagramNode.prototype._valueShapeBoundary
	}
});

A.DiagramBuilder.types[CONDITION] = A.DiagramNodeCondition;

/**
 * A base class for DiagramNodeStart.
 *
 * @class A.DiagramNodeStart
 * @extends A.DiagramNodeState
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.DiagramNodeStart = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DiagramNodeStart.NAME
	 * @type String
	 * @static
	 */
	NAME: DIAGRAM_NODE_NAME,

	/**
	 * Static property used to define the default attribute
	 * configuration for the DiagramNodeStart.
	 *
	 * @property DiagramNodeStart.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute type
		 * @default 'start'
		 * @type String
		 */
		type: {
			value: START
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property DiagramNodeStart.EXTENDS
	 * @type String
	 * @static
	 */
	EXTENDS: A.DiagramNodeState
});

A.DiagramBuilder.types[START] = A.DiagramNodeStart;

/**
 * A base class for DiagramNodeEnd.
 *
 * @class A.DiagramNodeEnd
 * @extends A.DiagramNodeState
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.DiagramNodeEnd = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DiagramNodeEnd.NAME
	 * @type String
	 * @static
	 */
	NAME: DIAGRAM_NODE_NAME,

	/**
	 * Static property used to define the default attribute
	 * configuration for the DiagramNodeEnd.
	 *
	 * @property DiagramNodeEnd.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute type
		 * @default 'end'
		 * @type String
		 */
		type: {
			value: END
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property DiagramNodeEnd.EXTENDS
	 * @type String
	 * @static
	 */
	EXTENDS: A.DiagramNodeState
});

A.DiagramBuilder.types[END] = A.DiagramNodeEnd;

/**
 * A base class for DiagramNodeJoin.
 *
 * @class A.DiagramNodeJoin
 * @extends A.DiagramNodeState
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.DiagramNodeJoin = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DiagramNodeJoin.NAME
	 * @type String
	 * @static
	 */
	NAME: DIAGRAM_NODE_NAME,

	/**
	 * Static property used to define the default attribute
	 * configuration for the DiagramNodeJoin.
	 *
	 * @property DiagramNodeJoin.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute height
		 * @default 60
		 * @type Number
		 */
		height: {
			value: 60
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute type
		 * @default 'join'
		 * @type String
		 */
		type: {
			value: JOIN
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
	 * @property DiagramNodeJoin.EXTENDS
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

A.DiagramBuilder.types[JOIN] = A.DiagramNodeJoin;

/**
 * A base class for DiagramNodeFork.
 *
 * @class A.DiagramNodeFork
 * @extends A.DiagramNodeState
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.DiagramNodeFork = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DiagramNodeFork.NAME
	 * @type String
	 * @static
	 */
	NAME: DIAGRAM_NODE_NAME,

	/**
	 * Static property used to define the default attribute
	 * configuration for the DiagramNodeFork.
	 *
	 * @property DiagramNodeFork.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute height
		 * @default 60
		 * @type Number
		 */
		height: {
			value: 60
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute type
		 * @default 'fork'
		 * @type String
		 */
		type: {
			value: FORK
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
	 * @property DiagramNodeFork.EXTENDS
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

A.DiagramBuilder.types[FORK] = A.DiagramNodeFork;

/**
 * A base class for DiagramNodeTask.
 *
 * @class A.DiagramNodeTask
 * @extends A.DiagramNodeState
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.DiagramNodeTask = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property DiagramNodeTask.NAME
	 * @type String
	 * @static
	 */
	NAME: DIAGRAM_NODE_NAME,

	/**
	 * Static property used to define the default attribute
	 * configuration for the DiagramNodeTask.
	 *
	 * @property DiagramNodeTask.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute height
		 * @default 70
		 * @type Number
		 */
		height: {
			value: 70
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute type
		 * @default 'task'
		 * @type String
		 */
		type: {
			value: TASK
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
	 * @property DiagramNodeTask.EXTENDS
	 * @type String
	 * @static
	 */
	EXTENDS: A.DiagramNodeState,

	prototype: {
		hotPoints: A.DiagramNode.SQUARE_POINTS,

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method renderShapeBoundary
		 */
		renderShapeBoundary: function() {
			var instance = this;

			var boundary = instance.boundary = instance.get(GRAPHIC).addShape(
				instance.get(SHAPE_BOUNDARY)
			);

			boundary.translate(8, 8);

			return boundary;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _valueShapeBoundary
		 * @protected
		 */
		_valueShapeBoundary: function() {
			var instance = this;

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

A.DiagramBuilder.types[TASK] = A.DiagramNodeTask;