AUI.add('aui-diagram-builder-impl', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isBoolean = Lang.isBoolean,

	emptyFn = Lang.emptyFn,

	WidgetStdMod = A.WidgetStdMod,
	AArray = A.Array,

	isDiagramBuilder = function(val) {
		return (val instanceof A.DiagramBuilderBase);
	},

	isDiagramNode = function(val) {
		return (val instanceof A.DiagramNode);
	},

	isConnector = function(val) {
		return (val instanceof A.Connector);
	},

	isArrayList = function(val) {
		return (val instanceof A.ArrayList);
	},

	isDataSet = function(val) {
		return (val instanceof A.DataSet);
	},

	// isAnchor = function(val) {
	// 	return (val instanceof A.Anchor);
	// },

	getLeftTop = function(container, node) {
		var nodeXY = isArray(node) ? node : node.getXY();
		var containerXY = isArray(container) ? container : container.getXY();

		return AArray.map(containerXY, function(val, i) {
			return Math.max(0, val - nodeXY[i]);
		});
	},

	ACTIVE_ELEMENT = 'activeElement',
	ADD_ANCHOR = 'addAnchor',
	ADD_ANCHOR_MESSAGE = 'addAnchorMessage',
	ADD_NODE = 'addNode',
	ANCHOR = 'anchor',
	ANCHORS = 'anchors',
	SOURCE_UID = 'sourceUID',
	TARGET_UID = 'targetUID',
	RADIUS = 'radius',
	ANCHORS_DRAG_CONFIG = 'anchorsDragConfig',
	SHAPE_DRAG_CONFIG = 'shapeDragConfig',
	AVAILABLE_FIELD = 'availableField',
	BACKSPACE = 'backspace',
	LOCK = 'lock',
	BOOLEAN = 'boolean',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CANCEL = 'cancel',
	SOURCES = 'sources',
	TARGETS = 'targets',
	VISIBLE = 'visible',
	CANVAS = 'canvas',
	CLICK = 'click',
	CLOSE_EVENT = 'closeEvent',
	CLOSE_MESSAGE = 'closeMessage',
	CONDITION = 'condition',
	CONTENT = 'content',
	CONTROLS = 'controls',
	CONTROLS_TOOLBAR = 'controlsToolbar',
	DATA = 'data',
	DBLCLICK = 'dblclick',
	DELETE = 'delete',
	DELETE_CONNECTORS_MESSAGE = 'deleteConnectorsMessage',
	DELETE_NODES_MESSAGE = 'deleteNodesMessage',
	DESCRIPTION = 'description',
	DIAGRAM = 'diagram',
	DIAGRAM_BUILDER_NAME = 'diagram-builder',
	DIAGRAM_NODE = 'diagramNode',
	DIAGRAM_NODE_NAME = 'diagram-node',
	DIAGRAM_NODE_MANAGER_NAME = 'diagram-node-manager',
	DRAG_NODE = 'dragNode',
	EDIT_EVENT = 'editEvent',
	EDIT_MESSAGE = 'editMessage',
	EDITING = 'editing',
	END = 'end',
	ESC = 'esc',
	FIELD = 'field',
	FIELDS = 'fields',
	FIELDS_DRAG_CONFIG = 'fieldsDragConfig',
	FORK = 'fork',
	GRAPHIC = 'graphic',
	HEIGHT = 'height',
	HOVER = 'hover',
	ID = 'id',
	JOIN = 'join',
	KEYDOWN = 'keydown',
	LINK = 'link',
	MAX = 'max',
	MAX_FIELDS = 'maxFields',
	MAX_SOURCES = 'maxSources',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	NAME = 'name',
	NODE = 'node',
	P1 = 'p1',
	P2 = 'p2',
	PARENT_NODE = 'parentNode',
	PENCIL = 'pencil',
	RECORDS = 'records',
	RECORDSET = 'recordset',
	REGION = 'region',
	RENDERED = 'rendered',
	REQUIRED = 'required',
	SELECTED = 'selected',
	SHUFFLE = 'shuffle',
	SOURCE = 'source',
	SOURCES = 'sources',
	START = 'start',
	STATE = 'state',
	TARGET = 'target',
	TARGETS = 'targets',
	TASK = 'task',
	TMP_CONNECTOR = 'connector',
	TYPE = 'type',
	WIDTH = 'width',
	WRAPPER = 'wrapper',
	XY = 'xy',
	Z_INDEX = 'zIndex',
	SHAPE = 'shape',
	SHAPE_BOUNDARY = 'shapeBoundary',
	SHAPE_INVITE = 'shapeInvite',
	BOUNDARY = 'boundary',

	_DASH = '-',
	_DOT = '.',
	_EMPTY_STR = '',
	_HASH = '#',
	_UNDERLINE = '_',

	AgetClassName = A.getClassName,

	CSS_DB_ANCHOR_NODE_MAX_TARGETS = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE, MAX, TARGETS),
	// CSS_DB_ANCHOR_NODE_MAX_SOURCES = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE, MAX, SOURCES),
	CSS_DB_ANCHOR_HOVER = AgetClassName(DIAGRAM, BUILDER, ANCHOR, HOVER),
	CSS_DB_ANCHOR_NODE = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE),
	CSS_DB_ANCHOR_NODE_WRAPPER = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE, WRAPPER),
	CSS_DB_CONTROLS = AgetClassName(DIAGRAM, BUILDER, CONTROLS),
	CSS_DIAGRAM_NODE = AgetClassName(DIAGRAM, NODE),
	CSS_DIAGRAM_NODE_SHAPE_BOUNDARY = AgetClassName(DIAGRAM, NODE, SHAPE, BOUNDARY),
	CSS_DIAGRAM_NODE_CONTENT = AgetClassName(DIAGRAM, NODE, CONTENT),
	CSS_DIAGRAM_NODE_EDITING = AgetClassName(DIAGRAM, NODE, EDITING),
	CSS_DIAGRAM_NODE_SELECTED = AgetClassName(DIAGRAM, NODE, SELECTED);

// REMOVE THIS!
var __dump = function() {
	var PAD = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', BR = '<br/>';

	A.all('.aui-diagram-node').each(function(n) {
		var b = _EMPTY_STR,
			dn = A.Widget.getByNode(n),
			dnName = dn.get('name'),
			dnBB = dn.get('boundingBox'),
			log = dnBB.one('.log') || A.Node.create('<div class=log />').appendTo(dnBB);

		b += dnName + BR;

		dn.get(FIELDS).each(function(a) {
			b += PAD + 'a: ' + a.get('id') + BR;

			a.get('targets').each(function(t) {
				var tdn = t.get(DIAGRAM_NODE);

				t.get('node').setContent(t.get('id'));

				b += PAD + PAD + 't: ' + tdn.get('name') + ' (s: ' + t.get('id') + ')' + BR;
			});

			a.get('sources').each(function(s) {
				var sdn = s.get(DIAGRAM_NODE);

				s.get('node').setContent(s.get('id'));

				b += PAD + PAD + 's: ' + sdn.get('name') + ' (t: ' + s.get('id') + ')' + BR;
			});
		});

		log.setContent(b);
	});
};
// END.

var DiagramBuilder = A.Component.create({
	NAME: DIAGRAM_BUILDER_NAME,

	ATTRS: {
		fieldsDragConfig: {
			value: null,
			setter: '_setFieldsDragConfig',
			validator: isObject
		},

		graphic: {
			valueFn: function() {
				return new A.Graphic();
			},
			validator: isObject
		},

		strings: {
			value: {
				addNode: 'Add node',
				cancel: 'Cancel',
				deleteConnectorsMessage: 'Are you sure you want to delete the selected connector(s)?',
				propertyName: 'Property Name',
				save: 'Save',
				settings: 'Settings',
				value: 'Value'
			}
		},

		connector: {
			setter: '_setConnector',
			value: null
		}
	},

	EXTENDS: A.DiagramBuilderBase,

	FIELDS_TAB: 0,
	SETTINGS_TAB: 1,

	prototype: {
		selectedConnector: null,
		selectedNode: null,

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

			instance.handlerKeyDown = A.getDoc().on(KEYDOWN, A.bind(instance._afterKeyEvent, instance));

			instance.dropContainer.delegate(CLICK, A.bind(instance._onNodeClick, instance), _DOT+CSS_DIAGRAM_NODE);
			instance.dropContainer.delegate(MOUSEENTER, A.bind(instance._onMouseenterAnchors, instance), _DOT+CSS_DB_ANCHOR_NODE);
			instance.dropContainer.delegate(MOUSELEAVE, A.bind(instance._onMouseleaveAnchors, instance), _DOT+CSS_DB_ANCHOR_NODE);
		},

		renderUI: function() {
			var instance = this;

			A.DiagramBuilder.superclass.renderUI.apply(this, arguments);

			instance._renderGraphic();
		},

		syncUI: function() {
			var instance = this;

			A.DiagramBuilder.superclass.syncUI.apply(this, arguments);

			instance._setupFieldsDrag();

			instance.connector = instance.get(TMP_CONNECTOR);
		},

		syncConnectionsUI: function() {
			var instance = this;

			instance.get(FIELDS).each(function(diagramNode) {
				diagramNode.syncConnectionsUI();
			});
		},

		clearFields: function() {
			var instance = this;

			var fields = [];

			instance.get(FIELDS).each(function(field) {
				fields.push(field);
			});

			AArray.each(fields, function(field) {
				field.destroy();
			});

			fields = instance.editingConnector = instance.editingNode = instance.selectedNode = null;
		},

		closeEditProperties: function() {
			var instance = this;
			var editingNode = instance.editingNode;
			var tabView = instance.tabView;

			tabView.selectTab(A.DiagramBuilder.FIELDS_TAB);
			tabView.disableTab(A.DiagramBuilder.SETTINGS_TAB);

			if (editingNode) {
				editingNode.get(BOUNDING_BOX).removeClass(CSS_DIAGRAM_NODE_EDITING);
			}

			instance.editingConnector = null;
			instance.editingNode = null;
		},

		connect: function(diagramNode1, diagramNode2) {
			var instance = this;

			if (isString(diagramNode1)) {
				diagramNode1 = A.Widget.getByNode(_HASH+A.DiagramNode.buildNodeId(diagramNode1));
			}

			if (isString(diagramNode2)) {
				diagramNode2 = A.Widget.getByNode(_HASH+A.DiagramNode.buildNodeId(diagramNode2));
			}

			if (diagramNode1 && diagramNode2) {
				diagramNode1.connect(diagramNode2.toTarget());
			}

			return instance;
		},

		connectAll: function(nodes) {
			var instance = this;

			AArray.each(nodes, function(node) {
				if (node.hasOwnProperty(SOURCE) && node.hasOwnProperty(TARGET)) {
					instance.connect(node.source, node.target, node.connector);
				}
			});

			return instance;
		},

		createField: function(val) {
			var instance = this;

			if (!isDiagramNode(val)) {
				val.builder = instance;
				val.bubbleTargets = instance;
				val = new (instance.getFieldClass(val.type || NODE))(val);
			}

			// val.set(BUILDER, instance);

			return val;
		},

		deleteSelectedConnectors: function(connectors) {
			var instance = this;

			var strings = instance.getStrings();

			var selectedConnectors = instance.getSelectedConnectors();

			if (selectedConnectors.length && confirm(strings[DELETE_CONNECTORS_MESSAGE])) {
				AArray.each(selectedConnectors, function(connector) {
					// var dia = A.DiagramNode.getNodeByName(connector);
				});
			}
		},

		deleteSelectedNode: function() {
			var instance = this;

			var selectedNode = instance.selectedNode;

			if (selectedNode) {
				if (!selectedNode.get(REQUIRED)) {
					selectedNode.close();
				}
			}
		},

		eachConnector: function(fn) {
			var instance = this;
			var stop = false;

			instance.get(FIELDS).each(function(diagramNode) {
				diagramNode.get(TARGETS).each(function(target) {
					fn.call(instance, diagramNode.getConnector(target), target, diagramNode);
				});
			});
		},

		editConnector: function(connector) {
			var instance = this;

			if (connector) {
				var tabView = instance.tabView;

				instance.closeEditProperties();
				tabView.enableTab(A.DiagramBuilder.SETTINGS_TAB);
				tabView.selectTab(A.DiagramBuilder.SETTINGS_TAB);

				instance.propertyList.set(RECORDSET, connector.getProperties());

				instance.editingConnector = instance.selectedConnector = connector;
			}
		},

		editNode: function(diagramNode) {
			var instance = this;

			if (diagramNode) {
				var tabView = instance.tabView;

				instance.closeEditProperties();
				tabView.enableTab(A.DiagramBuilder.SETTINGS_TAB);
				tabView.selectTab(A.DiagramBuilder.SETTINGS_TAB);

				instance.propertyList.set(RECORDSET, diagramNode.getProperties());

				diagramNode.get(BOUNDING_BOX).addClass(CSS_DIAGRAM_NODE_EDITING);

				instance.editingNode = instance.selectedNode = diagramNode;
			}
		},

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

		isFieldsDrag: function(drag) {
			var instance = this;
			var fieldsDrag = instance.fieldsDrag;

			return (drag === fieldsDrag.dd);
		},

		plotField: function(field) {
			var instance = this;

			if (!field.get(RENDERED)) {
				field.render(instance.dropContainer);
			}
		},

		unselectConnectors: function() {
			var instance = this;

			AArray.each(instance.getSelectedConnectors(), function(connector) {
				connector.set(SELECTED, false);
			});
		},

		unselectNodes: function() {
			var instance = this;
			var selectedNode = instance.selectedNode;

			if (selectedNode) {
				selectedNode.set(SELECTED, false);
			}

			instance.selectedNode = null;
		},

		select: function(diagramNode) {
			var instance = this;

			instance.unselectNodes();

			instance.selectedNode = diagramNode.set(SELECTED, true).focus();
		},

		stopEditing: function() {
			var instance = this;

			instance.unselectConnectors();
			instance.unselectNodes();
			instance.closeEditProperties();
		},

		toJSON: function() {
			var instance = this;

			var output = {
				nodes: []
			};

			instance.get(FIELDS).each(function(field) {
				var nodeName = field.get(NAME);

				var node = {
					transitions: []
				};

				// serialize node attributes
				AArray.each(field.SERIALIZABLE_ATTRS, function(attributeName) {
					node[attributeName] = field.get(attributeName);
				});

				// serialize node transitions
				field.get(FIELDS).each(function(anchor) {
					anchor.get(TARGETS).each(function(t) {
						node.transitions.push({
							connector: anchor.getConnector(t).toJSON(),
							source: nodeName,
							target: t.get(DIAGRAM_NODE).get(NAME)
						});
					});
				});

				output.nodes.push(node);
			});

			return output;
		},

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

		_onCancel: function(event) {
			var instance = this;

			instance.closeEditProperties();
		},

		_onDrag: function(event) {
			var instance = this;
			var drag = event.target;

			if (instance.isFieldsDrag(drag)) {
				var diagramNode = A.Widget.getByNode(drag.get(DRAG_NODE));

				diagramNode.alignSources();
				diagramNode.alignTargets();
			}

			// if (instance.isFieldsDrag(drag)) {
			// 	var diagramNode = A.Widget.getByNode(drag.get(DRAG_NODE));

			// 	diagramNode.get(FIELDS).each(function(anchor) {
			// 		anchor.alignConnectors();
			// 	});
			// }
		},

		_onDragEnd: function(event) {
			var instance = this;
			var drag = event.target;

			if (instance.isFieldsDrag(drag)) {
				var diagramNode = A.Widget.getByNode(drag.get(DRAG_NODE));

				diagramNode.set(XY, diagramNode.getLeftTop());
			}
		},

		_onDropHit: function(event) {
			var instance = this;
			var drag = event.drag;

			if (instance.isAvailableFieldsDrag(drag)) {
				var availableField = drag.get(NODE).getData(AVAILABLE_FIELD);

				var newField = instance.addField({
					xy: getLeftTop(drag.lastXY, instance.dropContainer),
					type: availableField.get(TYPE),
					fields: [{}]
				});

				instance.select(newField);
			}
		},

		_onDeleteKey: function(event) {
			var instance = this;

			instance.deleteSelectedConnectors();

			instance.deleteSelectedNode();

			event.halt();
		},

		_onEscKey: function(event) {
			var instance = this;

			instance.stopEditing();

			event.halt();
		},

		_onMouseenterAnchors: function(event) {
			var instance = this;

			event.currentTarget.addClass(CSS_DB_ANCHOR_HOVER);
		},

		_onMouseleaveAnchors: function(event) {
			var instance = this;

			event.currentTarget.removeClass(CSS_DB_ANCHOR_HOVER);
		},

		_onNodeClick: function(event) {
			var instance = this;
			var diagramNode = A.Widget.getByNode(event.currentTarget);

			instance.select(diagramNode);

			instance._onNodeEdit(event);
		},

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

		_onSave: function(event) {
			var instance = this;
			var editingNode = instance.editingNode;
			var editingConnector = instance.editingConnector;
			var recordset = instance.propertyList.get(RECORDSET);

			if (editingNode) {
				AArray.each(recordset.get(RECORDS), function(record) {
					var data = record.get(DATA);

					editingNode.set(data.attributeName, data.value);
				});
			}
			else if (editingConnector) {
				AArray.each(recordset.get(RECORDS), function(record) {
					var data = record.get(DATA);

					editingConnector.set(data.attributeName, data.value);
				});
			}
		},

		_renderGraphic: function() {
			var instance = this;

			instance.get(GRAPHIC).render(instance.get(CANVAS));
		},

		_setConnector: function(val) {
			var instance = this;

			if (!isConnector(val)) {
				var xy = instance.get(CANVAS).getXY();

				val = new A.Connector(
					A.merge(
						{
							graphic: instance.get(GRAPHIC),
							lazyDraw: true,
							p1: xy,
							p2: xy,
							shapeHover: null
						},
						val
					)
				);
			}

			return val;
		},

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












































var DiagramNodeManagerBase = A.Component.create({
	NAME: DIAGRAM_NODE_MANAGER_NAME,

	EXTENDS: A.Base
});

A.DiagramNodeManager = new DiagramNodeManagerBase();


var DiagramNodeOverlay = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	EXTENDS: A.Overlay,

	// A.FieldSupport augment the class with "fields" attribute and util methods
	// such as: addField, removeField. Although the attribute is called "fields" due to
	// the augmentation, those fields are the anchors. TODO: Allow A.FieldSupport to
	// customize the name of the attribute and method sufixes.
	// AUGMENTS: [A.FieldSupport]
});

var DiagramNode = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	UI_ATTRS: [NAME, REQUIRED, SELECTED],

	ATTRS: {
		builder: {
			validator: isDiagramBuilder
		},

		graphic: {
			writeOnce: true,
			validator: isObject
		},

		shapeBoundary: {
			validator: isObject,
			value: {
				height: 40,
				type: 'rect',
				stroke: {
					weight: 10,
					// color: '#f00'
					color: 'transparent'
				},
				width: 40
			}
		},

		shapeInvite: {
			validator: isObject,
			value: {
				radius: 10,
				type: 'circle',
				stroke: {
					weight: 5,
					color: '#ff6600',
					opacity: .8
				},
				fill: {
					color: '#ffd700',
					opacity: .8
				}
			}
		},

		sources: {
			// lazyAdd: false,
			value: null,
			writeOnce: true,
			setter: '_setSources'
		},

		targets: {
			// lazyAdd: false,
			value: null,
			writeOnce: true,
			setter: '_setTargets'
		},

		required: {
			value: false,
			validator: isBoolean
		},

		description: {
			value: _EMPTY_STR,
			validator: isString
		},

		height: {
			value: 60
		},

		name: {
			valueFn: function() {
				var instance = this;

				return instance.get(TYPE) + (++A.Env._uidx);
			},
			validator: isString
		},

		selected: {
			value: false,
			validator: isBoolean
		},

		strings: {
			value: {
				addAnchorMessage: 'Add Anchor',
				closeMessage: 'Close',
				deleteNodesMessage: 'Are you sure you want to delete the selected node(s)?',
				description: 'Description',
				editMessage: 'Edit',
				name: 'Name',
				type: 'Type'
			}
		},

		type: {
			value: NODE,
			validator: isString
		},

		controlsToolbar: {
			validator: isObject,
			valueFn: '_valueControlsToolbar'
		},

		width: {
			value: 60
		},

		zIndex: {
			value: 100
		},

		tabIndex: {
			value: 1
		}
	},

	EXTENDS: DiagramNodeOverlay,

	getNodeByName: function(name) {
		return A.Widget.getByNode(_HASH+A.DiagramNode.buildNodeId(name));
	},

	buildNodeId: function(id) {
		return DIAGRAM_NODE + _UNDERLINE + FIELD + _UNDERLINE + id.replace(/[^a-z0-9.:_-]/ig, '_');
	},

	prototype: {
		boundary: null,

		connectors: null,

		isOverBoundary: false,

		publishedSource: null,

		CONTROLS_TEMPLATE: '<div class="' + CSS_DB_CONTROLS + '"></div>',

		SERIALIZABLE_ATTRS: [DESCRIPTION, NAME, REQUIRED, TYPE, WIDTH, HEIGHT, Z_INDEX, XY],

		initializer: function() {
			var instance = this;

			instance.connectors = {};

			instance.after({
				render: instance._afterRender
			});

			instance.publish({
				boundaryDrag: { defaultFn: instance._defBoundaryDrag },
				boundaryDragEnd: { defaultFn: instance._defBoundaryDragEnd },
				boundaryDragOut: { defaultFn: instance._defBoundaryDragOut },
				boundaryDragOver: { defaultFn: instance._defBoundaryDragOver },
				boundaryDragStart: { defaultFn: instance._defBoundaryDragStart },
				boundaryDrop: { defaultFn: instance._defBoundaryDrop },
				boundaryMouseEnter: { defaultFn: instance._defBoundaryMouseEnter },
				boundaryMouseLeave: { defaultFn: instance._defBoundaryMouseLeave }
			});

			A.DiagramNodeManager.on({
				publishedSource: function(event) {
					instance.publishedSource = event.source;
				},
				sourceReleased: function(event) {
					instance.publishedSource.isOverBoundary = false;
					instance.publishedSource = null;
				}
			});

			// instance.after('dataset:add', A.debounce(instance._afterSourceOrTargetChange, 50, instance));
			// instance.after('dataset:add', A.bind(instance._afterSourceOrTargetAdd, instance));
			// instance.on('dataset:remove', A.debounce(instance._afterSourceOrTargetChange, 50, instance));

			// console.log(instance.get(TARGETS));
			// instance.get(SOURCES);

			instance.get(BOUNDING_BOX).addClass(CSS_DIAGRAM_NODE+_DASH+instance.get(TYPE));
		},

		destructor: function() {
			var instance = this;

			instance.invite.destroy();
			instance.get(GRAPHIC).destroy();
			instance.get(BUILDER).removeField(instance);
		},

		alignTargets: function() {
			var instance = this;

			instance.get(TARGETS).each(A.bind(instance.alignTarget, instance));
		},

		alignSources: function() {
			var instance = this;

			instance.get(SOURCES).each(A.bind(instance.alignSource, instance));
		},

		alignSource: function(source) {
			var instance = this;
			var diagramNode = A.DiagramNode.getNodeByName(source.name);

			if (diagramNode) {
				diagramNode.alignTargets();
			}
		},

		alignTarget: function(target) {
			var instance = this;
			var diagramNode = A.DiagramNode.getNodeByName(target.name);

			if (diagramNode) {
				var connector = instance.getConnector(target);

				if (connector) {
					connector.set(P1, instance._normalizeDiagramNodeXY(instance, target.xy));
					connector.set(P2, instance._normalizeDiagramNodeXY(diagramNode, target.destXY));
				}
			}
		},

		getConnector: function(target) {
			var instance = this;

			return instance.connectors[target.uid];
		},

		close: function() {
			var instance = this;
			var strings = instance.getStrings();

			if (confirm(strings[DELETE_NODES_MESSAGE])) {
				instance.destroy();
			}

			return instance;
		},

		getContainer: function() {
			var instance = this;

			return (instance.get(BUILDER).dropContainer || instance.get(BOUNDING_BOX).get(PARENT_NODE));
		},

		getLeftTop: function() {
			var instance = this;

			return getLeftTop(instance.get(BOUNDING_BOX), instance.getContainer());
		},

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

		renderShapeBoundary: function() {
			var instance = this;

			var boundary = instance.boundary = instance.get(GRAPHIC).addShape(instance.get(SHAPE_BOUNDARY));

			boundary.end();

			return boundary;
		},

		renderShapeInvite: function() {
			var instance = this;

			var invite = instance.invite = instance.get(BUILDER).get(GRAPHIC).addShape(instance.get(SHAPE_INVITE));

			invite.set(VISIBLE, false);
			invite.end();

			return invite;
		},

		syncConnectionsUI: function() {
			var instance = this;

			instance.get(TARGETS).each(A.bind(instance.connect, instance));
		},

		addNodeSource: function(source) {
			var instance = this;
			var sources = instance.get(SOURCES);

			source = instance.createSourceOrTargetObj(source);

			if (!sources.containsKey(source.uid)) {
				source.uid = A.guid();
				sources.add(source.uid, source);
			}
		},

		createSourceOrTargetObj: function(val) {
			var instance = this;
			var target = { xy: [0,0], destXY: [0,0], uid: A.guid() };

			if (isString(val)) {
				target.name = val;
			}
			else if (isObject(val)) {
				target = A.mix(val, target);
			}

			return target;
		},

		addNodeTarget: function(target) {
			var instance = this;
			var targets = instance.get(TARGETS);

			target = instance.createSourceOrTargetObj(target);

			if (!targets.containsKey(target.uid)) {
				target.uid = A.guid();
				targets.add(target.uid, target);
			}
		},

		removeNodeSource: function(source) {
			var instance = this;

			return instance.get(SOURCES).removeKey(source.uid);
		},

		removeNodeTarget: function(target) {
			var instance = this;

			return instance.get(TARGETS).removeKey(target.uid);
		},

		isTargetConnected: function(target) {
			var instance = this;

			return instance.connectors.hasOwnProperty(target.uid);
		},

		toTarget: function() {
			var instance = this;

			return instance.createSourceOrTargetObj({ name: instance.get(NAME) });
		},

		connect: function(target) {
			var instance = this;
			var connector = null;

			target = instance.createSourceOrTargetObj(target);

			var diagramNode = A.DiagramNode.getNodeByName(target.name);

			if (diagramNode) {
				if (!instance.isTargetConnected(target)) {
					var source = instance.createSourceOrTargetObj({ name: instance.get(NAME) });

					diagramNode.addNodeSource(source);
					instance.addNodeTarget(target);

					connector = new A.Connector({
						graphic: instance.get(BUILDER).get(GRAPHIC),
						sourceUID: source.uid,
						targetUID: target.uid
					});
console.log('CONNECT', target);
					instance.connectors[target.uid] = connector;
				}
			}

			instance.alignTarget(target);

			return connector;
		},

		disconnect: function(connector) {
			var instance = this;
			var targetUID = connector.get(TARGET_UID);
			var target = instance.get(TARGETS).item(targetUID);
			var diagramNode = A.DiagramNode.getNodeByName(target.name);

			if (diagramNode && instance.isTargetConnected(target)) {
				diagramNode.removeNodeSource(connector.get(SOURCE_UID));
				instance.removeNodeTarget(targetUID);
				connector.destroy();
			}
		},

		// _onAnchorDropHit: function(event) {
		// 	var instance = this;
		// 	var source = A.Anchor.getAnchorByNode(event.drag.get(NODE));
		// 	var target = A.Anchor.getAnchorByNode(event.drop.get(NODE));

		// 	source.connect(target);

		// 	__dump();
		// },

		_normalizeDiagramNodeXY: function(diagramNode, offsetXY) {
			var instance = this;
			var dnXY = diagramNode.get(BOUNDING_BOX).getXY();

			return [ dnXY[0] + offsetXY[0], dnXY[1] + offsetXY[1] ];
		},

		_afterRender: function(event) {
			var instance = this;

			instance.setStdModContent(WidgetStdMod.BODY, _EMPTY_STR, WidgetStdMod.AFTER);
			instance._renderGraphic();
			instance._renderControls();
		},

		_bindBoundaryEvents: function() {
			var instance = this;

			instance.boundary.detachAll().on({
				mouseenter: A.bind(instance._onBoundaryMouseEnter, instance),
				mouseleave: A.bind(instance._onBoundaryMouseLeave, instance)
			});
		},

		_defBoundaryDrag: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);
			var mouseXY = instance.boundaryDragDelegate.dd.mouseXY;

			builder.connector.set(P2, mouseXY);

			if (instance.isOverBoundary) {
				var invite = instance.invite;
				var offset = invite.get(RADIUS) || 0;
				var mouseXY = instance.boundaryDragDelegate.dd.mouseXY;

				if (!invite.get(VISIBLE)) {
					invite.set(VISIBLE, true);
				}

				invite.setXY([ mouseXY[0] - offset, mouseXY[1] - offset ]);
			}
		},

		_defBoundaryDragEnd: function(event) {
			var instance = this;

			instance.get(BUILDER).connector.hide();

			instance.publishedSource.invite.set(VISIBLE, false);

			A.DiagramNodeManager.fire('sourceReleased', { source: instance });

			console.log('_defBoundaryDragEnd', event);
		},

		_defBoundaryDragOut: function(event) {
			var instance = this;
			var publishedSource = instance.publishedSource;

			publishedSource.isOverBoundary = false;

			publishedSource.invite.set(VISIBLE, false);

			console.log('_defBoundaryDragOut', event, instance.invite);
		},

		_defBoundaryDragOver: function(event) {
			var instance = this;
			var publishedSource = instance.publishedSource;

			if (publishedSource !== instance) {
				publishedSource.isOverBoundary = true;
			}

			console.log('_defBoundaryDragOver', event);
		},

		_defBoundaryDragStart: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);
			var startXY = instance.boundaryDragDelegate.dd.startXY;

			builder.connector.show().set(P1, startXY);

			A.DiagramNodeManager.fire('publishedSource', { source: instance });

			console.log('_defBoundaryDragStart', event);
		},

		_defBoundaryDrop: function(event) {
			var instance = this;

			console.log('_defBoundaryDrop', event);
		},

		_defBoundaryMouseEnter: function(event) {
			var instance = this;

			console.log('_defBoundaryMouseEnter', event);
		},

		_defBoundaryMouseLeave: function(event) {
			var instance = this;

			console.log('_defBoundaryMouseLeave', event);
		},

		_handleCloseEvent: function(event) {
			var instance = this;

			if (!instance.get(REQUIRED)) {
				instance.close();
			}
		},

		_handleEditEvent: function(event) {
			var instance = this;

			instance.get(BUILDER).editNode(instance);
		},

		_onBoundaryDrag: function(event) {
			var instance = this;

			instance.fire('boundaryDrag', {
				dragEvent: event,
				source: instance.publishedSource
			});
		},

		_onBoundaryDragEnd: function(event) {
			var instance = this;
			var publishedSource = instance.publishedSource;

			if (publishedSource && instance.isOverBoundary) {
				instance.fire('boundaryDrop', {
					dragEvent: event,
					source: publishedSource
				});
			}

			instance.fire('boundaryDragEnd', {
				dragEvent: event,
				source: publishedSource
			});
		},

		_onBoundaryDragStart: function(event) {
			var instance = this;

			instance.fire('boundaryDragStart', {
				dragEvent: event
			});
		},

		_onBoundaryMouseEnter: function(event) {
			var instance = this;
			var publishedSource = instance.publishedSource;

			instance.fire('boundaryMouseEnter', {
				domEvent: event
			});

			if (publishedSource) {
				instance.fire('boundaryDragOver', {
					domEvent: event,
					source: publishedSource
				});
			}
		},

		_onBoundaryMouseLeave: function(event) {
			var instance = this;
			var publishedSource = instance.publishedSource;

			instance.fire('boundaryMouseLeave', {
				domEvent: event
			});

			if (publishedSource) {
				instance.fire('boundaryDragOut', {
					domEvent: event,
					source: publishedSource
				});
			}
		},

		_renderControls: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			instance.controlsNode = A.Node.create(instance.CONTROLS_TEMPLATE).appendTo(boundingBox);
		},

		_renderControlsToolbar: function(event) {
			var instance = this;

			instance.controlsToolbar = new A.Toolbar(
				instance.get(CONTROLS_TOOLBAR)
			)
			.render(instance.controlsNode);

			instance._uiSetRequired(instance.get(REQUIRED));
		},

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

		_setSources: function(val) {
			var instance = this;

			if (!isDataSet(val)) {
				val = instance._createDataSet();
			}

			return val;
		},

		_setTargets: function(val) {
			var instance = this;

			if (!isDataSet(val)) {
				var dataSet = instance._createDataSet();

				A.Array.each(val, function(target) {
					var uid = A.guid();

					target = isObject(target) ? A.mix(target, { uid: uid }) : { uid: uid, name: target };

					dataSet.add(uid, instance.createSourceOrTargetObj(target));
				});

				val = dataSet;
			}

			// val.eachKey(function(target, key) {
			// 	target.addNodeSource({ name: instance.get(NAME) });
			// });

			return val;
		},

		_setupBoundaryDrag: function() {
			var instance = this;

			var builder = instance.get(BUILDER);

			instance.boundaryDragDelegate = new A.DD.Delegate({
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

		_uiSetName: function(val) {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			boundingBox.set(ID, A.DiagramNode.buildNodeId(val));
		},

		_uiSetRequired: function(val) {
			var instance = this;
			var strings = instance.getStrings();
			var controlsToolbar = instance.controlsToolbar;

			if (controlsToolbar) {
				if (val) {
					controlsToolbar.remove(CLOSE_EVENT);
				}
				else {
					controlsToolbar.add({
						handler: A.bind(instance._handleCloseEvent, instance),
						icon: CANCEL,
						id: CLOSE_EVENT,
						title: strings[CLOSE_MESSAGE]
					});
				}
			}
		},

		_uiSetSelected: function(val) {
			var instance = this;

			instance.get(BOUNDING_BOX).toggleClass(CSS_DIAGRAM_NODE_SELECTED, val);

			if (val && !instance.controlsToolbar) {
				instance._renderControlsToolbar();
			}
		},

		_uiSetXY : function(val) {
			var instance = this;
			var containerXY = instance.getContainer().getXY();

			this._posNode.setXY([ val[0] + containerXY[0], val[1] + containerXY[1] ]);
		},

		_createDataSet: function() {
			var instance = this;

			return new A.DataSet({
				bubbleTargets: instance
			});
		},

		_valueControlsToolbar: function(val) {
			var instance = this;
			var strings = instance.getStrings();

			return {
				activeState: false,
				children: [
					{
						handler: A.bind(instance._handleEditEvent, instance),
						icon: PENCIL,
						id: EDIT_EVENT,
						title: strings[EDIT_MESSAGE]
					},
					{
						handler: A.bind(instance._handleCloseEvent, instance),
						icon: CANCEL,
						id: CLOSE_EVENT,
						title: strings[CLOSE_MESSAGE]
					}
				]
			};
		}
	}
});

A.DiagramNode = DiagramNode;

A.DiagramBuilder.types[NODE] = A.DiagramNode;

A.DiagramNodeState = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	ATTRS: {
		height: {
			value: 40
		},

		type: {
			value: STATE
		},

		width: {
			value: 40
		}
	},

	EXTENDS: A.DiagramNode
});

A.DiagramBuilder.types[STATE] = A.DiagramNodeState;

A.DiagramNodeCondition = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	ATTRS: {
		height: {
			value: 60
		},

		type: {
			value: CONDITION
		},

		width: {
			value: 60
		}
	},

	EXTENDS: A.DiagramNodeState,

	prototype: {
		renderShapeBoundary: function() {
			var instance = this;

			var boundary = instance.boundary = instance.get(GRAPHIC).addShape(
				instance.get(SHAPE_BOUNDARY)
			);

			boundary.translate(10, 10);
			boundary.rotate(45);
			boundary.end();

			return boundary;
		}
	}
});

A.DiagramBuilder.types[CONDITION] = A.DiagramNodeCondition;

A.DiagramNodeStart = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	ATTRS: {
		type: {
			value: START
		}
	},

	EXTENDS: A.DiagramNodeState
});

A.DiagramBuilder.types[START] = A.DiagramNodeStart;

A.DiagramNodeEnd = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	ATTRS: {
		type: {
			value: END
		}
	},

	EXTENDS: A.DiagramNodeState
});

A.DiagramBuilder.types[END] = A.DiagramNodeEnd;

A.DiagramNodeJoin = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	ATTRS: {
		height: {
			value: 60
		},

		type: {
			value: JOIN
		},

		width: {
			value: 60
		}
	},

	EXTENDS: A.DiagramNodeState
});

A.DiagramBuilder.types[JOIN] = A.DiagramNodeJoin;

A.DiagramNodeFork = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	ATTRS: {
		height: {
			value: 60
		},

		type: {
			value: FORK
		},

		width: {
			value: 60
		}
	},

	EXTENDS: A.DiagramNodeState
});

A.DiagramBuilder.types[FORK] = A.DiagramNodeFork;

A.DiagramNodeTask = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	ATTRS: {
		height: {
			value: 70
		},

		type: {
			value: TASK
		},

		width: {
			value: 70
		}
	},

	EXTENDS: A.DiagramNodeState
});

A.DiagramBuilder.types[TASK] = A.DiagramNodeTask;

}, '@VERSION@' ,{requires:['aui-data-set','aui-diagram-builder-base','aui-diagram-builder-connector','overlay'], skinnable:true});
