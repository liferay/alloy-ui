var Lang = A.Lang,
	isArray = Lang.isArray,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isBoolean = Lang.isBoolean,

	AArray = A.Array,

	isDiagramBuilder = function(val) {
		return (val instanceof A.DiagramBuilderBase);
	},

	isDiagramNode = function(val) {
		return (val instanceof A.DiagramNode);
	},

	isAnchor = function(val) {
		return (val instanceof A.Anchor);
	},

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
	ANCHORS_DRAG_CONFIG = 'anchorsDragConfig',
	AVAILABLE_FIELD = 'availableField',
	BACKSPACE = 'backspace',
	BOOLEAN = 'boolean',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CANCEL = 'cancel',
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
	TMP_CONNECTOR = 'tmpConnector',
	TYPE = 'type',
	WIDTH = 'width',
	WRAPPER = 'wrapper',
	XY = 'xy',
	Z_INDEX = 'zIndex',

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

		tmpConnector: {
			setter: '_setTmpConnector',
			value: {},
			validator: isObject
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

			instance.on({
				cancel: instance._onCancel,
				'drag:drag': instance._onDrag,
				'drag:end': instance._onDragEnd,
				'drop:hit': instance._onDropHit,
				save: instance._onSave
			});

			instance.handlerKeyDown = A.getDoc().on(KEYDOWN, A.bind(instance._afterKeyEvent, instance));

			instance.dropContainer.delegate(CLICK, A.bind(instance._onNodeClick, instance), _DOT+CSS_DIAGRAM_NODE);
			instance.dropContainer.delegate(DBLCLICK, A.bind(instance._onNodeEdit, instance), _DOT+CSS_DIAGRAM_NODE);
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

			instance.tmpConnector = new A.Connector(instance.get(TMP_CONNECTOR));
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

			instance.tabView.selectTab(A.DiagramBuilder.FIELDS_TAB);

			if (editingNode) {
				editingNode.get(BOUNDING_BOX).removeClass(CSS_DIAGRAM_NODE_EDITING);
			}

			instance.editingConnector = null;
			instance.editingNode = null;
		},

		connect: function(diagramNode1, diagramNode2, optConnector) {
			var instance = this;

			if (isString(diagramNode1)) {
				diagramNode1 = A.Widget.getByNode(_HASH+A.DiagramNode.buildNodeId(diagramNode1));
			}

			if (isString(diagramNode2)) {
				diagramNode2 = A.Widget.getByNode(_HASH+A.DiagramNode.buildNodeId(diagramNode2));
			}

			if (diagramNode1 && diagramNode2) {
				var a1 = diagramNode1.findAvailableAnchor();
				var a2 = diagramNode2.findAvailableAnchor();

				if (a1 && a2) {
					a1.connect(a2, optConnector);
				}
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
				val = new (instance.getFieldClass(val.type || NODE))(val);
			}

			val.set(BUILDER, instance);

			return val;
		},

		deleteConnectors: function(connectors) {
			var instance = this;

			AArray.each(connectors, function(connector) {
				var anchor = connector.get(ANCHOR);

				if (anchor) {
					var target = anchor.findConnectorTarget(connector);

					if (target) {
						anchor.disconnect(target);
					}
				}
			});
		},

		eachConnetor: function(fn) {
			var instance = this;
			var stop = false;

			instance.get(FIELDS).some(function(diagramNode) {
				diagramNode.get(FIELDS).some(function(anchor) {
					A.some(anchor.connectors, function(connector) {
						stop = fn.call(instance, connector, anchor, diagramNode);
						return stop;
					});
					return stop;
				});
				return stop;
			});
		},

		editConnector: function(connector) {
			var instance = this;

			if (connector) {
				instance.closeEditProperties();

				instance.tabView.selectTab(A.DiagramBuilder.SETTINGS_TAB);

				instance.propertyList.set(RECORDSET, connector.getProperties());

				instance.editingConnector = instance.selectedConnector = connector;
			}
		},

		editNode: function(diagramNode) {
			var instance = this;

			if (diagramNode) {
				instance.closeEditProperties();

				instance.tabView.selectTab(A.DiagramBuilder.SETTINGS_TAB);

				instance.propertyList.set(RECORDSET, diagramNode.getProperties());

				diagramNode.get(BOUNDING_BOX).addClass(CSS_DIAGRAM_NODE_EDITING);

				instance.editingNode = instance.selectedNode = diagramNode;
			}
		},

		getSelectedConnectors: function() {
			var instance = this;
			var selected = [];

			instance.eachConnetor(function(connector) {
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

				diagramNode.get(FIELDS).each(function(anchor) {
					anchor.alignConnectors();
				});
			}
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
			var strings = instance.getStrings();

			var selectedConnectors = instance.getSelectedConnectors();

			if (selectedConnectors.length && confirm(strings[DELETE_CONNECTORS_MESSAGE])) {
				instance.deleteConnectors(selectedConnectors);
			}

			var selectedNode = instance.selectedNode;

			if (selectedNode) {
				if (!selectedNode.get(REQUIRED)) {
					selectedNode.close();
				}
			}

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

			instance.closeEditProperties();
		},

		_renderGraphic: function() {
			var instance = this;

			instance.get(GRAPHIC).render(instance.get(CANVAS));
		},

		_setTmpConnector: function(val) {
			var instance = this;
			var xy = instance.get(CANVAS).getXY();

			return A.merge(
				{
					p1: xy,
					p2: xy,
					lazyDraw: true,
					graphic: instance.get(GRAPHIC)
				},
				val
			);
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

var DiagramNodeOverlay = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	EXTENDS: A.Overlay,

	// A.FieldSupport augment the class with "fields" attribute and util methods
	// such as: addField, removeField. Although the attribute is called "fields" due to
	// the augmentation, those fields are the anchors. TODO: Allow A.FieldSupport to
	// customize the name of the attribute and method sufixes.
	AUGMENTS: [A.FieldSupport]
});

var DiagramNode = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	UI_ATTRS: [FIELDS, NAME, REQUIRED, SELECTED],

	ATTRS: {
		anchorsDragConfig: {
			value: null,
			setter: '_setAnchorsDragConfig',
			validator: isObject
		},

		builder: {
			validator: isDiagramBuilder
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

	buildNodeId: function(id) {
		return DIAGRAM_NODE + _UNDERLINE + FIELD + _UNDERLINE + id;
	},

	prototype: {
		ANCHOR_WRAPPER_TEMPLATE: '<div class="' + CSS_DB_ANCHOR_NODE_WRAPPER + '"></div>',

		CONTROLS_TEMPLATE: '<div class="' + CSS_DB_CONTROLS + '"></div>',

		SERIALIZABLE_ATTRS: [DESCRIPTION, NAME, REQUIRED, TYPE, WIDTH, HEIGHT, Z_INDEX, XY, MAX_FIELDS],

		initializer: function() {
			var instance = this;

			instance._renderNodes();
			instance._setupAnchorsDrag();

			instance.after({
				render: instance._afterRender
			});

			instance.on({
				'drag:drag': instance._onAnchorDrag,
				'drag:end': instance._onAnchorDragEnd,
				'drag:start': instance._onAnchorDragStart,
				'drop:hit': instance._onAnchorDropHit
			});

			instance.get(BOUNDING_BOX).addClass(CSS_DIAGRAM_NODE+_DASH+instance.get(TYPE));

			// REMOVE THIS!
			// instance.set('bodyContent', instance.get(NAME));
		},

		destructor: function() {
			var instance = this;

			instance.get(FIELDS).each(function(anchor) {
				anchor.destroy();
			});

			instance.get(BUILDER).removeField(instance);
		},

		alignAnchors: function() {
			var instance = this;
			var anchors = instance.get(FIELDS);

			var cRegion = instance.get(BOUNDING_BOX).get(REGION),
				dAngle = Math.floor(360/anchors.size()),
				a = cRegion.width/2,
				b = cRegion.height/2,
				centerX = cRegion.left + cRegion.width/2,
				centerY = cRegion.top + cRegion.height/2;

			anchors.each(function(anchor, index) {
				var anchorNode = anchor.get(NODE);
				var aRegion = anchorNode.get(REGION);
				var exy = instance._getEllipseXY(a, b, centerX, centerY, index*dAngle);

				anchorNode.setXY([ exy[0] - aRegion.width/2, exy[1] - aRegion.height/2 ]);

				anchor.alignConnectors();
			});

			return instance;
		},

		close: function() {
			var instance = this;
			var strings = instance.getStrings();

			if (confirm(strings[DELETE_NODES_MESSAGE])) {
				instance.destroy();
			}

			// __dump();

			return instance;
		},

		createField: function(val) {
			var instance = this;

			if (!isAnchor(val)) {
				var builder = instance.get(BUILDER);

				val.diagramNode = instance;

				val = new A.Anchor(val);
			}

			return val;
		},

		findAvailableAnchor: function() {
			var instance = this;
			var available = null;

			instance.get(FIELDS).some(function(anchor) {
				if (!anchor.hasConnection()) {
					available = anchor;

					return true;
				}
			});

			if (!available) {
				available = instance.addField({});
			}

			return available;
		},

		getConnectionNode: function() {
			var instance = this;

			return new A.DiagramNode({
				xy: [100, 100] // TODO - find best position?
			});
		},

		getLeftTop: function() {
			var instance = this;

			return getLeftTop(instance.get(BOUNDING_BOX), instance._getContainer());
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

		syncDragTargets: function() {
			var instance = this;

			instance.anchorsDrag.syncTargets();
		},

		syncDropTargets: function(anchor) {
			var instance = this;

			instance.get(FIELDS).each(function(anchor) {
				var drop = A.DD.DDM.getDrop(anchor.get(NODE));

				if (drop) {
					if (anchor.get(SOURCES).size() === anchor.get(MAX_SOURCES)) {
						drop.removeFromGroup(ANCHORS);
					}
					else {
						drop.addToGroup(ANCHORS);
					}
				}
			});
		},

		_afterRender: function(event) {
			var instance = this;

			instance.alignAnchors();

			instance._renderControls();
		},

		_getContainer: function() {
			var instance = this;

			return (instance.get(BUILDER).dropContainer || instance.get(BOUNDING_BOX).get(PARENT_NODE));
		},

		_getEllipseXY: function(a, b, centerX, centerY, angle) {
			var t = angle*Math.PI/180;

			return [ centerX + a*Math.cos(t), centerY - b*Math.sin(t) ];
		},

		_handleAddAnchorEvent: function(event) {
			var instance = this;

			instance.addField({});
		},

		_handleAddNodeEvent: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);
			var source = instance.findAvailableAnchor();

			if (source) {
				var diagramNode = instance.getConnectionNode();

				builder.addField(diagramNode);
				source.connect(diagramNode.addField({}));
			}
		},

		_handleEditEvent: function(event) {
			var instance = this;

			instance.get(BUILDER).editNode(instance);
		},

		_handleCloseEvent: function(event) {
			var instance = this;

			if (!instance.get(REQUIRED)) {
				instance.close();
			}
		},

		_onAnchorDrag: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);

			builder.tmpConnector.set(P2, event.target.get(DRAG_NODE).getCenterXY());
		},

		_onAnchorDragEnd: function(event) {
			var instance = this;
			var shape = instance.get(BUILDER).tmpConnector.shape;

			shape.clear();
			shape.end();
		},

		_onAnchorDragStart: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);

			builder.tmpConnector.set(P1, event.target.get(NODE).getCenterXY());
		},

		_onAnchorDropHit: function(event) {
			var instance = this;
			var source = A.Anchor.getAnchorByNode(event.drag.get(NODE));
			var target = A.Anchor.getAnchorByNode(event.drop.get(NODE));

			source.connect(target);

			// __dump();
		},

		_renderControls: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			instance.controlsNode = A.Node.create(instance.CONTROLS_TEMPLATE).appendTo(boundingBox);
		},

		_renderNodes: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			instance.anchorWrapper = A.Node.create(instance.ANCHOR_WRAPPER_TEMPLATE).appendTo(boundingBox);
		},

		_renderControlsToolbar: function(event) {
			var instance = this;

			instance.controlsToolbar = new A.Toolbar(
				instance.get(CONTROLS_TOOLBAR)
			)
			.render(instance.controlsNode);

			instance._uiSetRequired(
				instance.get(REQUIRED)
			);
		},

		_setAnchorsDragConfig: function(val) {
			var instance = this;
			var builder = instance.get(BUILDER);

			return A.merge(
				{
					bubbleTargets: instance,
					container: instance.anchorWrapper,
					dragConfig: {
						groups: [ANCHORS],
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
									moveOnEnd: false
								},
								fn: A.Plugin.DDProxy
							}
						]
					},
					nodes: _DOT+CSS_DB_ANCHOR_NODE,
					target: true
				},
				val || {}
			);
		},

		_setupAnchorsDrag: function() {
			var instance = this;

			instance.anchorsDrag = new A.DD.Delegate(
				instance.get(ANCHORS_DRAG_CONFIG)
			);

			instance.anchorsDrag.dd
				.addInvalid(_DOT+CSS_DB_ANCHOR_NODE_MAX_TARGETS);
				// .addInvalid(_DOT+CSS_DB_ANCHOR_NODE_MAX_SOURCES);
		},

		_uiSetFields: function(val) {
			var instance = this;

			if (instance.get(RENDERED)) {
				instance.alignAnchors();

				// setTimeout(function() {
					instance.syncDragTargets();
					instance.syncDropTargets();
				// }, 50);
			}
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

			// if (instance.get(RENDERED)) {
				// instance.alignAnchors();
			// }
		},

		_uiSetXY : function(val) {
			var instance = this;
			var containerXY = instance._getContainer().getXY();

            this._posNode.setXY([ val[0] + containerXY[0], val[1] + containerXY[1] ]);
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
						handler: A.bind(instance._handleAddAnchorEvent, instance),
						icon: LINK,
						id: ADD_ANCHOR,
						title: strings[ADD_ANCHOR_MESSAGE]
					},
					{
						handler: A.bind(instance._handleAddNodeEvent, instance),
						icon: SHUFFLE,
						id: ADD_NODE
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

	EXTENDS: A.DiagramNode,
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
});

A.DiagramBuilder.types[CONDITION] = A.DiagramNodeCondition;

A.DiagramNodeStart = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	ATTRS: {
		type: {
			value: START
		}
	},

	EXTENDS: A.DiagramNodeState,
});

A.DiagramBuilder.types[START] = A.DiagramNodeStart;

A.DiagramNodeEnd = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	ATTRS: {
		type: {
			value: END
		}
	},

	EXTENDS: A.DiagramNodeState,
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

	EXTENDS: A.DiagramNodeState,
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

	EXTENDS: A.DiagramNodeState,
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

	EXTENDS: A.DiagramNodeState,
});

A.DiagramBuilder.types[TASK] = A.DiagramNodeTask;