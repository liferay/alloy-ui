AUI.add('aui-diagram-builder-impl', function(A) {
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

	ANCHOR = 'anchor',
	ANCHORS = 'anchors',
	ANCHORS_DRAG_CONFIG = 'anchorsDragConfig',
	AVAILABLE_FIELD = 'availableField',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CANCEL = 'cancel',
	CLICK = 'click',
	CONTENT = 'content',
	CONTROLS = 'controls',
	CONTROLS_TOOLBAR = 'controlsToolbar',
	DATA = 'data',
	DBLCLICK = 'dblclick',
	DELETE = 'delete',
	DELETE_MESSAGE = 'deleteMessage',
	DESCRIPTION = 'description',
	DIAGRAM = 'diagram',
	DIAGRAM_BUILDER_NAME = 'diagram-builder',
	DIAGRAM_NODE = 'diagramNode',
	DIAGRAM_NODE_NAME = 'diagram-node',
	DRAG_NODE = 'dragNode',
	EDITING = 'editing',
	ESC = 'esc',
	FIELD = 'field',
	FIELDS = 'fields',
	FIELDS_DRAG_CONFIG = 'fieldsDragConfig',
	HOVER = 'hover',
	KEYDOWN = 'keydown',
	LINK = 'link',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	NAME = 'name',
	NODE = 'node',
	P1 = 'p1',
	P2 = 'p2',
	PARENT_NODE = 'parentNode',
	RECORDS = 'records',
	RECORDSET = 'recordset',
	REGION = 'region',
	RENDERED = 'rendered',
	SELECTED = 'selected',
	SHUFFLE = 'shuffle',
	TASK = 'task',
	TMP_CONNECTOR = 'tmpConnector',
	TYPE = 'type',
	VIEWPORT = 'viewport',
	WRAPPER = 'wrapper',
	XY = 'xy',

	_DOT = '.',
	_DOLLAR = '$',
	_EMPTY_STR = '',
	_DASH = '-',

	AgetClassName = A.getClassName,

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
		editNode: null,

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

		syncUI: function() {
			var instance = this;

			A.DiagramBuilder.superclass.syncUI.apply(this, arguments);

			instance._setupFieldsDrag();

			instance.tmpConnector = new A.Connector(instance.get(TMP_CONNECTOR));
		},

		createField: function(val) {
			var instance = this;

			if (!isDiagramNode(val)) {
				// val.bubbleTargets = instance;
				val.builder = instance;
				val.viewport = instance.get(VIEWPORT);
				val = new (instance.getFieldClass(val.type || NODE))(val);
			}

			val.set(BUILDER, instance);

			return val;
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

		unselectAll: function() {
			var instance = this;
			var selectedNode = instance.selectedNode;

			if (selectedNode) {
				selectedNode.set(SELECTED, false);
			}

			instance.selectedNode = null;
		},

		select: function(diagramNode) {
			var instance = this;

			instance.unselectAll();
			instance.stopEditingNode();
			instance.selectedNode = diagramNode.set(SELECTED, true).focus();
		},

		startEditingNode: function(diagramNode) {
			var instance = this;

			if (diagramNode) {
				instance.stopEditingNode();

				instance.tabView.selectTab(A.DiagramBuilder.SETTINGS_TAB);

				instance.propertyList.set(RECORDSET, diagramNode.getProperties());

				diagramNode.get(BOUNDING_BOX).addClass(CSS_DIAGRAM_NODE_EDITING);

				instance.editNode = diagramNode;
			}
		},

		stopEditingNode: function(diagramNode) {
			var instance = this;
			var editNode = diagramNode || instance.editNode;

			if (editNode) {
				instance.tabView.selectTab(A.DiagramBuilder.FIELDS_TAB);

				editNode.get(BOUNDING_BOX).removeClass(CSS_DIAGRAM_NODE_EDITING);

				instance.editNode = null;
			}
		},

		_afterKeyEvent: function(event) {
			var instance = this;

			if (!instance.selectedNode || event.hasModifier() || !event.isKeyInSet(ESC, DELETE)) {
				return;
			}

			if (event.isKey(ESC)) {
				instance._onEscKey(event);
			}
			else if (event.isKey(DELETE)) {
				instance._onDeleteKey(event);
			}

			event.halt();
		},

		_onCancel: function(event) {
			var instance = this;

			instance.stopEditingNode();
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

			instance.selectedNode.close();
		},

		_onEscKey: function(event) {
			var instance = this;

			instance.unselectAll();
			instance.stopEditingNode();
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
				instance.startEditingNode(diagramNode);
			}
		},

		_onSave: function(event) {
			var instance = this;
			var editNode = instance.editNode;
			var recordset = instance.propertyList.get(RECORDSET);

			if (editNode) {
				AArray.each(recordset.get(RECORDS), function(record) {
					var data = record.get(DATA);

					editNode.set(data.attributeName, data.value);
				});

				instance.stopEditingNode(editNode);
			}
		},

		_setTmpConnector: function(val) {
			var instance = this;

			return A.merge(
				{
					lazyDraw: true,
					viewport: instance.viewport
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

	UI_ATTRS: [FIELDS, NAME, SELECTED],

	ATTRS: {
		anchorsDragConfig: {
			value: null,
			setter: '_setAnchorsDragConfig',
			validator: isObject
		},

		builder: {
			setter: '_setBuilder',
			validator: isDiagramBuilder
		},

		description: {
			value: _EMPTY_STR,
			validator: isString
		},

		height: {
			value: 90
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
				deleteMessage: 'Are you sure you want to delete?',
				description: 'Description',
				name: 'Name',
				type: 'Type'
			}
		},

		type: {
			value: NODE,
			validator: isString
		},

		controlsToolbar: {
			setter: '_setControlsToolbar',
			validator: isObject,
			value: null
		},

		width: {
			value: 90
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
		return DIAGRAM_NODE_NAME + _DOLLAR + FIELD + _DOLLAR + id;
	},

	prototype: {
		ANCHOR_WRAPPER_TEMPLATE: '<div class="' + CSS_DB_ANCHOR_NODE_WRAPPER + '"></div>',
		CONTROLS_TEMPLATE: '<div class="' + CSS_DB_CONTROLS + '"></div>',

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
			instance.set('bodyContent', instance.get(NAME));
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

			if (confirm(strings[DELETE_MESSAGE])) {
				instance.get(FIELDS).each(function(anchor) {
					anchor.destroy();
				});

				instance.destroy();
			}

			__dump();

			return instance;
		},

		createField: function(val) {
			var instance = this;

			if (!isAnchor(val)) {
				var builder = instance.get(BUILDER);

				val.diagramNode = instance;
				val.viewport = (builder ? builder.get(VIEWPORT) : null);

				val = new A.Anchor(val);
			}

			return val;
		},

		getLeftTop: function() {
			var instance = this;

			return getLeftTop(instance.get(BOUNDING_BOX), instance._getContainer());
		},

		getProperties: function() {
			var instance = this;
			var propertyModel = instance.getPropertyModel();

			AArray.each(propertyModel, function(property) {
				property.value = instance.get(property.attributeName);
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

			// event.halt();
		},

		_handleAddTaskEvent: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);

			var diagramNode = new A.DiagramNode({
				type: NODE,
				xy: [100, 100] // TODO - find best position?
			});

			builder.addField(diagramNode);

			var source = instance.addField({});
			var target = diagramNode.addField({});
			source.connect(target);
		},

		_handleCloseEvent: function(event) {
			var instance = this;

			instance.close();
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

			__dump();
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
		},

		_setBuilder: function(val) {
			var instance = this;

			instance.get(FIELDS).each(function(anchor) {
				anchor.set(VIEWPORT, val.get(VIEWPORT));
			});

			return val;
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
									constrain: (builder ? builder.get(VIEWPORT) : null)
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
		},

		_setControlsToolbar: function(val) {
			var instance = this;

			return A.merge(
				{
					activeState: false,
					children: [
						{
							handler: A.bind(instance._handleAddAnchorEvent, instance),
							icon: LINK
						},
						{
							handler: A.bind(instance._handleAddTaskEvent, instance),
							icon: SHUFFLE
						},
						{
							handler: A.bind(instance._handleCloseEvent, instance),
							icon: CANCEL
						}
					]
				},
				val
			);
		},

		_uiSetFields: function(val) {
			var instance = this;

			if (instance.get(RENDERED)) {
				instance.alignAnchors();

				setTimeout(function() {
					instance.anchorsDrag.syncTargets();
				}, 50);
			}
		},

		_uiSetName: function(val) {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			boundingBox.setAttribute(NAME, A.DiagramNode.buildNodeId(val));
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
        }
	}
});

A.DiagramNode = DiagramNode;

A.DiagramBuilder.types[NODE] = A.DiagramNode;

A.DiagramNodeTask = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	ATTRS: {
		type: {
			value: TASK
		}
	},

	EXTENDS: A.DiagramNode
});

A.DiagramBuilder.types[TASK] = A.DiagramNodeTask;

// TODO deletar anchors OK
// TODO deletar connections (delete) OK
// TODO Adicionar overlay de controles OK
// TODO syncTargets dd delegate


// TODO gerar XML
// TODO reposicionar setas?
// TODO Adicionar groups/validation for connection

}, '@VERSION@' ,{requires:['aui-diagram-builder-base','overlay'], skinnable:true});
