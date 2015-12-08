AUI.add('aui-diagram-builder-base', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,

	isArrayList = function(val) {
		return A.instanceOf(val, A.ArrayList);
	},

	isNode = function(val) {
		return A.instanceOf(val, A.Node);
	},

	isAvailableField = function(val) {
		return A.instanceOf(val, A.AvailableField);
	},

	AArray = A.Array,

	ADD = 'add',
	ADD_NODE = 'addNode',
	AUTO = 'auto',
	AVAILABLE_FIELD = 'availableField',
	AVAILABLE_FIELDS = 'availableFields',
	AVAILABLE_FIELDS_DRAG_CONFIG = 'availableFieldsDragConfig',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CANCEL = 'cancel',
	CANVAS = 'canvas',
	CLEARFIX = 'clearfix',
	COLUMN = 'column',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	CONTENT_CONTAINER = 'contentContainer',
	CONTENT_NODE = 'contentNode',
	CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
	DIAGRAM = 'diagram',
	DIAGRAM_BUILDER = 'diagram-builder',
	DISK = 'disk',
	DRAGGABLE = 'draggable',
	DROP = 'drop',
	DROP_CONFIG = 'dropConfig',
	DROP_CONTAINER = 'dropContainer',
	FIELD = 'field',
	FIELDS = 'fields',
	FIELDS_CONTAINER = 'fieldsContainer',
	HEIGHT = 'height',
	HELPER = 'helper',
	ICON = 'icon',
	ICON_CLASS = 'iconClass',
	ID = 'id',
	LABEL = 'label',
	LAYOUT = 'layout',
	LIST = 'list',
	MAX_FIELDS = 'maxFields',
	NODE = 'node',
	PARENT_NODE = 'parentNode',
	PROPERTY_LIST = 'propertyList',
	RENDERED = 'rendered',
	SAVE = 'save',
	SETTINGS = 'settings',
	TAB = 'tab',
	TAB_VIEW = 'tabView',
	TABS = 'tabs',
	TABVIEW = 'tabview',
	TITLE = 'title',
	TOOLBAR = 'toolbar',
	TOOLBAR_CONTAINER = 'toolbarContainer',

	AgetClassName = A.getClassName,

	_SPACE = ' ',
	_DOT = '.',
	_HASH = '#',
	_SPACE = ' ',
	_UNDERLINE = '_',

	CSS_COLUMN = AgetClassName(COLUMN),
	CSS_DIAGRAM_BUILDER_CANVAS = AgetClassName(DIAGRAM, BUILDER, CANVAS),
	CSS_DIAGRAM_BUILDER_CONTENT_CONTAINER = AgetClassName(DIAGRAM, BUILDER, CONTENT, CONTAINER),
	CSS_DIAGRAM_BUILDER_DROP_CONTAINER = AgetClassName(DIAGRAM, BUILDER, DROP, CONTAINER),
	CSS_DIAGRAM_BUILDER_FIELD = AgetClassName(DIAGRAM, BUILDER, FIELD),
	CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE = AgetClassName(DIAGRAM, BUILDER, FIELD, DRAGGABLE),
	CSS_DIAGRAM_BUILDER_FIELD_ICON = AgetClassName(DIAGRAM, BUILDER, FIELD, ICON),
	CSS_DIAGRAM_BUILDER_FIELD_LABEL = AgetClassName(DIAGRAM, BUILDER, FIELD, LABEL),
	CSS_DIAGRAM_BUILDER_FIELDS_CONTAINER = AgetClassName(DIAGRAM, BUILDER, FIELDS, CONTAINER),
	CSS_DIAGRAM_BUILDER_TAB_ADD = AgetClassName(DIAGRAM, BUILDER, TAB, ADD),
	CSS_DIAGRAM_BUILDER_TAB_SETTINGS = AgetClassName(DIAGRAM, BUILDER, TAB, SETTINGS),
	CSS_DIAGRAM_BUILDER_TABS = AgetClassName(DIAGRAM, BUILDER, TABS),
	CSS_DIAGRAM_BUILDER_TABS_CONTENT = AgetClassName(DIAGRAM, BUILDER, TABS, CONTENT),
	CSS_DIAGRAM_BUILDER_TOOLBAR_CONTAINER = AgetClassName(DIAGRAM, BUILDER, TOOLBAR, CONTAINER),
	CSS_HELPER_CLEARFIX = AgetClassName(HELPER, CLEARFIX),
	CSS_ICON = AgetClassName(ICON),
	CSS_LAYOUT = AgetClassName(LAYOUT),
	CSS_TABVIEW_CONTENT = AgetClassName(TABVIEW, CONTENT),
	CSS_TABVIEW_LIST = AgetClassName(TABVIEW, LIST);

var AvailableField = A.Component.create({
	NAME: AVAILABLE_FIELD,

	ATTRS: {
		draggable: {
			value: true,
			validator: isBoolean
		},

		label: {
			validator: isString
		},

		iconClass: {
			validator: isString
		},

		id: {
			value: A.guid(),
			setter: '_setId',
			validator: isString
		},

		node: {
			valueFn: function(val) {
				var instance = this;

				if (!isNode(val)) {
					val = A.Node.create(
						A.Lang.sub(
							instance.FIELD_ITEM_TEMPLATE,
							{
								iconClass: instance.get(ICON_CLASS)
							}
						)
					);

					val.setData(AVAILABLE_FIELD, instance);
				}

				return val;
			},
			validator: isNode,
			writeOnce: true
		},

		type: {
			value: NODE,
			validator: isString
		}
	},

	EXTENDS: A.Base,

	buildNodeId: function(id) {
		return AVAILABLE_FIELDS + _UNDERLINE + FIELD + _UNDERLINE + id;
	},

	getAvailableFieldById: function(id) {
		return A.AvailableField.getAvailableFieldByNode(_HASH+A.AvailableField.buildNodeId(id));
	},

	getAvailableFieldByNode: function(node) {
		var node = A.one(node);

		if (isNode(node)) {
			return node.getData(AVAILABLE_FIELD)
		}

		return null;
	},

	prototype: {
		FIELD_ITEM_TEMPLATE: '<li class="' + CSS_DIAGRAM_BUILDER_FIELD + '">' +
									'<span class="' + [ CSS_ICON, CSS_DIAGRAM_BUILDER_FIELD_ICON ].join(_SPACE) + ' {iconClass}"></span>' +
									'<div class="' + CSS_DIAGRAM_BUILDER_FIELD_LABEL + '"></div>' +
								'</li>',

		initializer: function() {
			var instance = this;
			var node = instance.get(NODE);

			instance.after(
				{
					draggableChange: instance._afterDraggableChange,
					idChange: instance._afterIdChange,
					labelChange: instance._afterLabelChange
				}
			);

			instance.labelNode = node.one(_DOT + CSS_DIAGRAM_BUILDER_FIELD_LABEL);

			instance._uiSetDraggable(
				instance.get(DRAGGABLE)
			);

			instance._uiSetId(
				instance.get(ID)
			);

			instance._uiSetLabel(
				instance.get(LABEL)
			);
		},

		_afterDraggableChange: function(event) {
			var instance = this;

			instance._uiSetDraggable(
				event.newVal
			);
		},

		_afterIdChange: function(event) {
			var instance = this;

			instance._uiSetId(
				event.newVal
			);
		},

		_afterLabelChange: function(event) {
			var instance = this;

			instance._uiSetLabel(
				event.newVal
			);
		},

		_setId: function(val) {
			return A.AvailableField.buildNodeId(val);
		},

		_uiSetDraggable: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE, val);
		},

		_uiSetId: function(val) {
			var instance = this;

			instance.get(NODE).set(ID, val);
		},

		_uiSetLabel: function(val) {
			var instance = this;

			instance.get(NODE).attr(TITLE, val);

			instance.labelNode.setContent(A.Escape.html(val));
		}
	}
});

A.AvailableField = AvailableField;

var FieldSupport = function() {
};

FieldSupport.ATTRS = {
	fields: {
		value: [],
		setter: '_setFields',
		validator: function(val) {
			return isArray(val) || isArrayList(val);
		}
	},

	maxFields: {
		value: Infinity,
		validator: isNumber
	}
};

A.mix(FieldSupport.prototype, {
	_setFields: function(val) {
		var instance = this;

		if (isArrayList(val)) {
			return val;
		}
		else {
			return instance.createFields(val);
		}
	},

	_updateFields: function(fields) {
		var instance = this;

		instance.set(FIELDS, fields);
	},

	addField: function(field, index) {
		var instance = this;

		if (instance.get(FIELDS).size() < instance.get(MAX_FIELDS)) {
			var newField = instance.createField(field);

			if (newField) {
				instance._updateFields(
					instance.get(FIELDS).add(newField, index)
				);
			}

			return newField;
		}

		return null;
	},

	createFields: function(val) {
		var instance = this;
		var fields = [];

		AArray.each(val, function(field, index) {
			if (index < instance.get(MAX_FIELDS)) {
				fields.push(instance.createField(field));
			}
		});

		return new A.ArrayList(fields);
	},

	removeField: function(field) {
		var instance = this;

		instance._updateFields(
			instance.get(FIELDS).remove(field)
		);
	},

	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Yoy *may* want to replace the methods from this section on your implementation.
	 */

	createField: function(val) {
		return val;
	}

	/*
	 * End of replaceable methods.
	 */
});

A.FieldSupport = FieldSupport;
// A.FieldSupport = A.Base.create('field-support', A.Base, [FieldSupport]);

var DiagramBuilderBase = A.Component.create(
	{
		NAME: DIAGRAM_BUILDER,

		ATTRS: {
			availableFields: {
				setter: '_setAvailableFields',
				validator: isArray
			},

			availableFieldsDragConfig: {
				value: null,
				setter: '_setAvailableFieldsDragConfig',
				validator: isObject
			},

			canvas: {
				valueFn: function() {
					return A.Node.create(this.CANVAS_TEMPLATE);
				}
			},

			dropConfig: {
				value: null,
				setter: '_setDropConfig',
				validator: isObject
			},

			contentContainer: {
				valueFn: function() {
					return A.Node.create(this.CONTENT_CONTAINER_TEMPLATE);
				}
			},

			dropContainer: {
				valueFn: function() {
					return A.Node.create(this.DROP_CONTAINER_TEMPLATE);
				}
			},

			fieldsContainer: {
				valueFn: function() {
					return A.Node.create(this.FIELDS_CONTAINER_TEMPLATE);
				}
			},

			propertyList: {
				setter: '_setPropertyList',
				validator: isObject,
				value: null
			},

			strings: {
				value: {
					addNode: 'Add node',
					cancel: 'Cancel',
					propertyName: 'Property Name',
					save: 'Save',
					settings: 'Settings',
					value: 'Value'
				}
			},

			tabView: {
				setter: '_setTabView',
				validator: isObject,
				value: null,
				writeOnce: true
			},

			toolbar: {
				setter: '_setToolbar',
				validator: isObject,
				value: null
			},

			toolbarContainer: {
				valueFn: function() {
					return A.Node.create(this.TOOLBAR_CONTAINER_TEMPLATE);
				}
			}
		},

		HTML_PARSER: {
			contentContainer: _DOT+CSS_DIAGRAM_BUILDER_CONTENT_CONTAINER,
			dropContainer: _DOT+CSS_DIAGRAM_BUILDER_DROP_CONTAINER,
			fieldsContainer: _DOT+CSS_DIAGRAM_BUILDER_FIELDS_CONTAINER,
			toolbarContainer: _DOT+CSS_DIAGRAM_BUILDER_TOOLBAR_CONTAINER,
			canvas: _DOT+CSS_DIAGRAM_BUILDER_CANVAS
		},

		UI_ATTRS: [AVAILABLE_FIELDS, FIELDS],

		AUGMENTS: [A.FieldSupport],

		prototype: {
			CONTENT_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_CONTENT_CONTAINER + '"></div>',
			DROP_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_DROP_CONTAINER + '"></div>',
			TOOLBAR_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_TOOLBAR_CONTAINER + '"></div>',
			FIELDS_CONTAINER_TEMPLATE: '<ul class="' + [CSS_DIAGRAM_BUILDER_FIELDS_CONTAINER, CSS_HELPER_CLEARFIX ].join(_SPACE) + '"></ul>',
			CANVAS_TEMPLATE: '<div tabindex="1" class="' + CSS_DIAGRAM_BUILDER_CANVAS + '"></div>',

			fieldsNode: null,
			propertyList: null,
			settingsNode: null,
			tabView: null,
			toolbar: null,

			initializer: function() {
				var instance = this;

				instance.publish({
					cancel: {
						defaultFn: instance._defCancelFn
					}
				});

				instance.after({
					render: instance._afterRender,
					'recordset:update': instance._afterRecordsetUpdate
				});

				instance.after(instance._afterUiSetHeight, instance, '_uiSetHeight');

				instance.canvas = instance.get(CANVAS);
				instance.contentContainer = instance.get(CONTENT_CONTAINER);
				instance.dropContainer = instance.get(DROP_CONTAINER);
				instance.fieldsContainer = instance.get(FIELDS_CONTAINER);
				instance.toolbarContainer = instance.get(TOOLBAR_CONTAINER);
			},

			isAvailableFieldsDrag: function(drag) {
				var instance = this;
				var availableFieldsDrag = instance.availableFieldsDrag;

				return (drag === availableFieldsDrag.dd);
			},

			plotFields: function() {
				var instance = this;
				var fields = instance.get(FIELDS);

				fields.each(function(field) {
					instance.plotField(field);
				});
			},

			renderUI: function() {
				var instance = this;

				instance._renderTabs();
				instance._renderCanvas();

				instance._uiSetAvailableFields(
					instance.get(AVAILABLE_FIELDS)
				);
			},

			syncUI: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);

				instance._setupDrop();
				instance._setupAvailableFieldsDrag();

				contentBox.addClass(CSS_LAYOUT);
			},

			_afterActiveTabChange: function(event) {
				var instance = this;
				var tabContentNode = event.newVal.get(CONTENT_NODE);

				if (instance.get(RENDERED) && (tabContentNode === instance.settingsNode)) {
					instance._renderSettings();
				}
			},

			_afterRecordsetUpdate: function(event) {
				var instance = this;

				instance._handleSaveEvent();
			},

			_afterRender: function(event) {
				var instance = this;

				instance.plotFields();
			},

			_afterUiSetHeight: function(val) {
				var instance = this;

				instance.contentContainer.setStyle(HEIGHT, isNumber(val) ? val + instance.DEF_UNIT : val);
				instance.dropContainer.setStyle(HEIGHT, isNumber(val) ? val + instance.DEF_UNIT : val);
			},

			_defCancelFn: function(event) {
				var instance = this;

				instance.tabView.selectTab(0);
			},

			_handleCancelEvent: function() {
				var instance = this;

				instance.fire(CANCEL);
			},

			_handleSaveEvent: function() {
				var instance = this;

				instance.fire(SAVE);
			},

			_renderCanvas: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);
				var canvas = instance.canvas;
				var contentContainer = instance.contentContainer;
				var dropContainer = instance.dropContainer;

				if (!canvas.inDoc()) {
					contentContainer.appendChild(canvas);
				}

				if (!dropContainer.inDoc()) {
					canvas.appendChild(dropContainer);
				}

				if (contentContainer.inDoc()) {
					contentContainer.get(PARENT_NODE).append(contentContainer);
				}
				else {
					contentBox.appendChild(contentContainer);
				}
			},

			_renderPropertyList: function() {
				var instance = this;

				if (!instance.propertyList) {
					instance.propertyList = new A.PropertyList(
						instance.get(PROPERTY_LIST)
					)
					.render(instance.settingsNode);

					instance.propertyList.get(BOUNDING_BOX).unselectable();
				}
			},

			_renderSettings: function() {
				var instance = this;

				instance._renderPropertyList();

				instance._renderToolbar();
			},

			_renderTabs: function() {
				var instance = this;

				if (!instance.tabView) {
					var tabView = new A.TabView(
						instance.get(TAB_VIEW)
					);

					tabView.get(BOUNDING_BOX);

					instance.tabView = tabView;
					instance.fieldsNode = tabView.getTab(0).get(CONTENT_NODE);
					instance.settingsNode = tabView.getTab(1).get(CONTENT_NODE);
				}
			},

			_renderToolbar: function() {
				var instance = this;

				if (!instance.toolbar) {
					instance.toolbar = new A.Toolbar(
						instance.get(TOOLBAR)
					)
					.render(instance.settingsNode);
				}
			},

			_setupDrop: function() {
				var instance = this;

				instance.drop = new A.DD.Drop(
					instance.get(DROP_CONFIG)
				);
			},

			_setupAvailableFieldsDrag: function() {
				var instance = this;

				instance.availableFieldsDrag = new A.DD.Delegate(
					instance.get(AVAILABLE_FIELDS_DRAG_CONFIG)
				);
			},

			_setAvailableFields: function(val) {
				var instance = this;
				var fields = [];

				AArray.each(val, function(field, index) {
					fields.push(
						isAvailableField(field) ? field : new A.AvailableField(field)
					);
				});

				return fields;
			},

			_setDropConfig: function(val) {
				var instance = this;

				return A.merge(
					{
						bubbleTargets: instance,
						groups: [AVAILABLE_FIELDS],
						node: instance.dropContainer
					},
					val || {}
				);
			},

			_setAvailableFieldsDragConfig: function(val) {
				var instance = this;

				return A.merge(
					{
						bubbleTargets: instance,
						container: instance.get(BOUNDING_BOX),
						dragConfig: {
							groups: [AVAILABLE_FIELDS],
							plugins: [
								{
									cfg: {
										moveOnEnd: false
									},
									fn: A.Plugin.DDProxy
								}
							]
						},
						nodes: _DOT+CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE
					},
					val || {}
				);
			},

			_setPropertyList: function(val) {
				var instance = this;

				return A.merge(
					{
						bubbleTargets: instance,
						width: 250,
						scroll: {
							height: 400,
							width: AUTO
						}
					},
					val
				);
			},

			_setTabView: function(val) {
				var instance = this;
				var boundingBox = instance.get(BOUNDING_BOX);
				var tabListNode = boundingBox.one(_DOT+CSS_TABVIEW_LIST);

				var defaultValue = {
					after: {
						activeTabChange: A.bind(instance._afterActiveTabChange, instance)
					},
					boundingBox: boundingBox.one(_DOT+CSS_DIAGRAM_BUILDER_TABS),
					contentBox: boundingBox.one(_DOT+CSS_DIAGRAM_BUILDER_TABS_CONTENT),
					bubbleTargets: instance,
					contentNode: boundingBox.one(_DOT+CSS_TABVIEW_CONTENT),
					cssClass: CSS_DIAGRAM_BUILDER_TABS,
					listNode: tabListNode,
					render: instance.get(CONTENT_BOX)
				};

				if (!tabListNode) {
					var strings = instance.getStrings();

					defaultValue.items = [
						{ cssClass: CSS_DIAGRAM_BUILDER_TAB_ADD, label: strings[ADD_NODE] },
						{ cssClass: CSS_DIAGRAM_BUILDER_TAB_SETTINGS, label: strings[SETTINGS] }
					];
				}

				return A.merge(defaultValue, val);
			},

			_setToolbar: function(val) {
				var instance = this;
				var strings = instance.getStrings();

				return A.merge(
					{
						activeState: false,
						bubbleTargets: instance,
						children: [
							{
								handler: A.bind(instance._handleCancelEvent, instance),
								label: strings[CANCEL]
							}
						]
					},
					val
				);
			},

			_uiSetAvailableFields: function(val) {
				var instance = this;
				var fieldsNode = instance.fieldsNode;

				if (fieldsNode) {
					var docFrag = A.getDoc().invoke(CREATE_DOCUMENT_FRAGMENT);

					AArray.each(val, function(field) {
						docFrag.appendChild(field.get(NODE));
					});

					fieldsNode.setContent(
						instance.fieldsContainer.setContent(docFrag)
					);
				}
			},

			_uiSetFields: function(event) {
				var instance = this;

				if (instance.get(RENDERED)) {
					instance.plotFields();
				}
			}
		}
	}
);

A.DiagramBuilderBase = DiagramBuilderBase;

}, '@VERSION@' ,{requires:['aui-tabs','aui-property-list','collection','dd'], skinnable:true});
AUI.add('aui-diagram-builder-impl', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isString = Lang.isString,

	WidgetStdMod = A.WidgetStdMod,
	AArray = A.Array,

	ACTIVE_ELEMENT = 'activeElement',
	AVAILABLE_FIELD = 'availableField',
	AVAILABLE_FIELDS = 'availableFields',
	BACKSPACE = 'backspace',
	BOOLEAN = 'boolean',
	BOUNDARY = 'boundary',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CANCEL = 'cancel',
	CANVAS = 'canvas',
	CLICK = 'click',
	CLOSE_EVENT = 'closeEvent',
	CLOSE_MESSAGE = 'closeMessage',
	CONDITION = 'condition',
	CONNECTOR = 'connector',
	CONNECTORS = 'connectors',
	CONTENT = 'content',
	CONTROLS = 'controls',
	CONTROLS_TOOLBAR = 'controlsToolbar',
	CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
	DATA = 'data',
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
	HIGHLIGHT_BOUNDARY_STROKE = 'highlightBoundaryStroke',
	HIGHLIGHT_DROP_ZONES = 'highlightDropZones',
	HIGHLIGHTED = 'highlighted',
	ID = 'id',
	JOIN = 'join',
	KEYDOWN = 'keydown',
	LABEL = 'label',
	LOCK = 'lock',
	MOUSEDOWN = 'mousedown',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	NAME = 'name',
	NODE = 'node',
	P1 = 'p1',
	P2 = 'p2',
	PARENT_NODE = 'parentNode',
	PENCIL = 'pencil',
	RADIUS = 'radius',
	RECORDS = 'records',
	RECORDSET = 'recordset',
	REGION = 'region',
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
	VISIBLE = 'visible',
	WIDTH = 'width',
	XY = 'xy',
	Z_INDEX = 'zIndex',

	_DASH = '-',
	_DOT = '.',
	_EMPTY_STR = '',
	_HASH = '#',
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

	isDataSet = function(val) {
		return A.instanceOf(val, A.DataSet);
	},

	isDiagramBuilder = function(val) {
		return A.instanceOf(val, A.DiagramBuilderBase);
	},

	isDiagramNode = function(val) {
		return A.instanceOf(val, A.DiagramNode);
	};

var DiagramBuilder = A.Component.create({
	NAME: DIAGRAM_BUILDER_NAME,

	ATTRS: {
		connector: {
			setter: '_setConnector',
			value: null
		},

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

		highlightDropZones: {
			validator: isBoolean,
			value: true
		},

		strings: {
			value: {
				addNode: 'Add node',
				cancel: 'Cancel',
				deleteConnectorsMessage: 'Are you sure you want to delete the selected connector(s)?',
				deleteNodesMessage: 'Are you sure you want to delete the selected node(s)?',
				propertyName: 'Property Name',
				save: 'Save',
				settings: 'Settings',
				value: 'Value'
			}
		},

		showSuggestConnector: {
			validator: isBoolean,
			value: true
		},

		suggestConnectorOverlay: {
			value: null,
			setter: '_setSuggestConnectorOverlay'
		}
	},

	EXTENDS: A.DiagramBuilderBase,

	FIELDS_TAB: 0,
	SETTINGS_TAB: 1,

	prototype: {
		editingConnector: null,

		editingNode: null,

		publishedSource: null,

		publishedTarget: null,

		selectedConnector: null,

		selectedNode: null,

		initializer: function() {
			var instance = this;

			var canvas = instance.get(CANVAS);

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

			canvas.on(MOUSEENTER, A.bind(instance._onCanvasMouseEnter, instance));

			instance.handlerKeyDown = A.getDoc().on(KEYDOWN, A.bind(instance._afterKeyEvent, instance));

			instance.dropContainer.delegate(CLICK, A.bind(instance._onNodeClick, instance), _DOT+CSS_DIAGRAM_NODE);
			instance.dropContainer.delegate(MOUSEENTER, A.bind(instance._onNodeMouseEnter, instance), _DOT+CSS_DIAGRAM_NODE);
			instance.dropContainer.delegate(MOUSELEAVE, A.bind(instance._onNodeMouseLeave, instance), _DOT+CSS_DIAGRAM_NODE);
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

			instance.syncConnectionsUI();

			instance.connector = instance.get(CONNECTOR);
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

			instance.get(FIELDS).each(function(diagramNode) {
				fields.push(diagramNode);
			});

			AArray.each(fields, function(diagramNode) {
				diagramNode.destroy();
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

			instance.editingConnector = instance.editingNode = null;
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
				diagramNode1.connect(diagramNode2.get(NAME), optConnector);
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

			return val;
		},

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

		destructor: function(attribute){
			var instance = this;

			instance.get(SUGGEST_CONNECTOR_OVERLAY).destroy();
		},

		eachConnector: function(fn) {
			var instance = this;

			instance.get(FIELDS).each(function(diagramNode) {
				diagramNode.get(TRANSITIONS).each(function(transition) {
					fn.call(instance, diagramNode.getConnector(transition), transition, diagramNode);
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

		getNodesByTransitionProperty: function(property, value) {
			var instance = this;
			var nodes = [];

			instance.get(FIELDS).each(function(diagramNode) {
				diagramNode.get(TRANSITIONS).each(function(transition) {
					if (transition[property] === value) {
						nodes.push(diagramNode);
						return false;
					}
				});
			});

			return nodes;
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

		getSourceNodes: function(diagramNode) {
			var instance = this;

			return instance.getNodesByTransitionProperty(TARGET, diagramNode.get(NAME));
		},

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

		isAbleToConnect: function() {
			var instance = this;

			return !!(instance.publishedSource && instance.publishedTarget);
		},

		isFieldsDrag: function(drag) {
			var instance = this;

			return (drag === instance.fieldsDrag.dd);
		},

		plotField: function(field) {
			var instance = this;

			if (!field.get(RENDERED)) {
				field.render(instance.dropContainer);
			}
		},

		select: function(diagramNode) {
			var instance = this;

			instance.unselectNodes();

			instance.selectedNode = diagramNode.set(SELECTED, true).focus();
		},

		showSuggestConnetorOverlay: function(xy) {
			var instance = this;

			instance.get(SUGGEST_CONNECTOR_OVERLAY).set(XY, xy || instance.connector.get(P2))
				.show().get(BOUNDING_BOX).addClass(CSS_DIAGRAM_SUGGEST_CONNECTOR);

			try {
				instance.fieldsDrag.dd.set(LOCK, true);
			}
			catch(e) {
			}
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

			instance.get(FIELDS).each(function(diagramNode) {
				var node = {
					transitions: []
				};

				// serialize node attributes
				AArray.each(diagramNode.SERIALIZABLE_ATTRS, function(attributeName) {
					node[attributeName] = diagramNode.get(attributeName);
				});

				// serialize node transitions
				diagramNode.get(TRANSITIONS).each(function(transition) {
					var connector = diagramNode.getConnector(transition);
					transition.connector = connector.toJSON();
					node.transitions.push(transition);
				});

				output.nodes.push(node);
			});

			return output;
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

		_onCanvasMouseEnter: function() {
			var instance = this;

			instance.syncUI();
		},

		_onDeleteKey: function(event) {
			var instance = this;

			instance.deleteSelectedConnectors();
			instance.deleteSelectedNode();
			event.halt();
		},

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

		_onDragEnd: function(event) {
			var instance = this;
			var drag = event.target;
			var diagramNode = A.Widget.getByNode(drag.get(DRAG_NODE));

			if (diagramNode && instance.isFieldsDrag(drag)) {
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
					type: availableField.get(TYPE)
				});

				instance.select(newField);
			}
		},

		_onEscKey: function(event) {
			var instance = this;

			instance.hideSuggestConnetorOverlay();
			instance.stopEditing();
			event.halt();
		},

		_onCanvasMouseDown: function(event) {
			var instance = this;

			instance.stopEditing();
			instance.hideSuggestConnetorOverlay();
		},

		_onNodeClick: function(event) {
			var instance = this;
			var diagramNode = A.Widget.getByNode(event.currentTarget);

			instance.select(diagramNode);

			instance._onNodeEdit(event);

			event.stopPropagation();
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

		_onNodeMouseEnter: function(event) {
			var instance = this;
			var diagramNode = A.Widget.getByNode(event.currentTarget);

			diagramNode.set(HIGHLIGHTED, true);
		},

		_onNodeMouseLeave: function(event) {
			var instance = this;
			var publishedSource = instance.publishedSource;
			var diagramNode = A.Widget.getByNode(event.currentTarget);

			if (!publishedSource || !publishedSource.boundaryDragDelegate.dd.get(DRAGGING)) {
				diagramNode.set(HIGHLIGHTED, false);
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

		_renderGraphic: function() {
			var instance = this;
			var canvas = instance.get(CANVAS);
			var graphic = instance.get(GRAPHIC);

			graphic.render(canvas);
			A.one(canvas).on(MOUSEDOWN, A.bind(instance._onCanvasMouseDown, instance));
		},

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

		_setSuggestConnectorOverlay: function(val) {
			var instance = this;

			if (!val) {
				var docFrag = A.getDoc().invoke(CREATE_DOCUMENT_FRAGMENT);

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
					zIndex: 10000
				});

				val.get(BOUNDING_BOX).delegate(CLICK, A.bind(instance._onSuggestConnectorNodeClick, instance), _DOT+CSS_DIAGRAM_BUILDER_FIELD);
			}

			return val;
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

var DiagramNode = A.Component.create({
	NAME: DIAGRAM_NODE_NAME,

	UI_ATTRS: [HIGHLIGHTED, NAME, REQUIRED, SELECTED],

	ATTRS: {
		builder: {
			validator: isDiagramBuilder
		},

		connectors: {
			valueFn: '_createDataSet',
			writeOnce: true
		},

		controlsToolbar: {
			validator: isObject,
			valueFn: '_valueControlsToolbar'
		},

		description: {
			value: _EMPTY_STR,
			validator: isString
		},

		graphic: {
			writeOnce: true,
			validator: isObject
		},

		height: {
			value: 60
		},

		highlighted: {
			validator: isBoolean,
			value: false
		},

		name: {
			valueFn: function() {
				var instance = this;

				return instance.get(TYPE) + (++A.Env._uidx);
			},
			validator: isString
		},

		required: {
			value: false,
			validator: isBoolean
		},

		selected: {
			value: false,
			validator: isBoolean
		},

		shapeBoundary: {
			validator: isObject,
			valueFn: '_valueShapeBoundary'
		},

		highlightBoundaryStroke: {
			validator: isObject,
			value: {
				weight: 7,
				color: '#484B4C',
				opacity: 0.25
			}
		},

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

		tabIndex: {
			value: 1
		},

		transitions: {
			value: null,
			writeOnce: true,
			setter: '_setTransitions'
		},

		type: {
			value: NODE,
			validator: isString
		},

		width: {
			value: 60
		},

		zIndex: {
			value: 100
		}
	},

	EXTENDS: A.Overlay,

	CIRCLE_POINTS: [[35, 20], [28, 33], [14, 34], [5, 22], [10, 9], [24, 6], [34, 16], [31, 30], [18, 35], [6, 26], [7, 12], [20, 5], [33, 12], [34, 26], [22, 35], [9, 30], [6, 16], [16, 6], [30, 9], [35, 22], [26, 34], [12, 33], [5, 20], [12, 7], [26, 6], [35, 18], [30, 31], [16, 34], [6, 24], [9, 10], [22, 5], [34, 14], [33, 28], [20, 35], [7, 28], [6, 14], [18, 5], [31, 10], [34, 24], [24, 34], [10, 31], [5, 18], [14, 6], [28, 8], [35, 20], [28, 33], [14, 34], [5, 22], [10, 8], [25, 6], [34, 16], [31, 30], [18, 35], [6, 26], [8, 12], [20, 5], [33, 12], [33, 27], [22, 35], [8, 30], [6, 15], [16, 6], [30, 9], [35, 23], [26, 34], [12, 32], [5, 20], [12, 7], [27, 7], [35, 18], [29, 32], [15, 34]],
	DIAMOND_POINTS: [ [30,5], [35,10], [40,15], [45,20], [50,25], [55,30], [50,35], [45,40], [40,45], [35,50], [30,55], [25,50], [20,45], [15,40], [10,35], [5,30], [10,25], [15,20], [20,15], [25,10] ],
	SQUARE_POINTS: [ [5,5], [10,5], [15,5], [20,5] ,[25,5], [30,5], [35,5], [40,5], [50,5], [55,5], [60,5], [65, 5], [65,10], [65,15], [65,20], [65,25], [65,30], [65,35], [65,40], [65,45], [65,50], [65,55], [65, 60], [65, 65], [60,65], [55,65], [50,65], [45,65], [40,65], [35,65], [30,65], [25,65], [20,65], [15,65], [10,65], [5, 65], [5,60], [5,55], [5,50], [5,45], [5,40], [5,35], [5,30], [5,25], [5,20], [5,15], [5,10] ],

	getNodeByName: function(name) {
		return A.Widget.getByNode(_HASH+A.DiagramNode.buildNodeId(name));
	},

	buildNodeId: function(id) {
		return DIAGRAM_NODE + _UNDERLINE + FIELD + _UNDERLINE + id.replace(/[^a-z0-9.:_\-]/ig, '_');
	},

	prototype: {
		LABEL_TEMPLATE: '<div class="' + CSS_DIAGRAM_NODE_LABEL + '">{label}</div>',

		boundary: null,

		hotPoints: [ [0,0] ],

		CONTROLS_TEMPLATE: '<div class="' + CSS_DB_CONTROLS + '"></div>',

		SERIALIZABLE_ATTRS: [DESCRIPTION, NAME, REQUIRED, TYPE, WIDTH, HEIGHT, Z_INDEX, XY],

		initializer: function() {
			var instance = this;

			instance.after({
				'dataset:remove': A.bind(instance._afterDataSetRemove, instance),
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

		destructor: function() {
			var instance = this;

			instance.eachConnector(function(connector, index, sourceNode) {
				sourceNode.removeTransition(connector.get(TRANSITION));
			});

			instance.invite.destroy();
			instance.get(GRAPHIC).destroy();
			instance.get(BUILDER).removeField(instance);
		},

		addTransition: function(transition) {
			var instance = this;
			var transitions = instance.get(TRANSITIONS);

			transition = instance.prepareTransition(transition);

			if (!transitions.containsKey(transition.uid)) {
				transition.uid = A.guid();
				transitions.add(transition.uid, transition);
			}

			return transition;
		},

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

		alignTransitions: function() {
			var instance = this;

			instance.get(TRANSITIONS).each(A.bind(instance.alignTransition, instance));
		},

		close: function() {
			var instance = this;

			return instance.destroy();
		},

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

					instance.get(CONNECTORS).add(transition.uid, connector);
				}
			}

			instance.alignTransition(transition);

			return connector;
		},

		connectDrop: function(event) {
			var instance = this;

			instance.connectNode(event.publishedTarget);
		},

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

		connectOutTarget: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);

			builder.publishedTarget = null;
			builder.publishedSource.invite.set(VISIBLE, false);
		},

		connectOverTarget: function(event) {
			var instance = this;
			var builder = instance.get(BUILDER);

			if (builder.publishedSource !== instance) {
				builder.publishedTarget = instance;
			}
		},

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

		disconnect: function(transition) {
			var instance = this;

			if (instance.isTransitionConnected(transition)) {
				instance.removeTransition(transition);
			}
		},

		eachConnector: function(fn) {
			var instance = this;
			var sourceNodes = [], connectors = [].concat(instance.get(CONNECTORS).values), tIndex = connectors.length;

			AArray.each(instance.get(BUILDER).getSourceNodes(instance), function(sourceNode) {
				sourceNode.get(CONNECTORS).each(function(connector) {
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

		getConnector: function(transition) {
			var instance = this;

			return instance.get(CONNECTORS).item(transition.uid);
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

		isBoundaryDrag: function(drag) {
			var instance = this;

			return (drag === instance.boundaryDragDelegate.dd);
		},

		isTransitionConnected: function(transition) {
			var instance = this;

			return instance.get(CONNECTORS).containsKey(transition.uid);
		},

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

		removeTransition: function(transition) {
			var instance = this;

			return instance.get(TRANSITIONS).removeKey(transition.uid);
		},

		renderShapeBoundary: function() {
			var instance = this;

			var boundary = instance.boundary = instance.get(GRAPHIC).addShape(instance.get(SHAPE_BOUNDARY));

			return boundary;
		},

		renderShapeInvite: function() {
			var instance = this;

			var invite = instance.invite = instance.get(BUILDER).get(GRAPHIC).addShape(instance.get(SHAPE_INVITE));

			invite.set(VISIBLE, false);

			return invite;
		},

		syncConnectionsUI: function() {
			var instance = this;

			instance.get(TRANSITIONS).each(function(transition) {
				instance.connect(transition, transition.connector);
			});
		},

		_afterDataSetRemove: function(event) {
			var instance = this;
			var dataSet = event.target;

			if (dataSet === instance.get(TRANSITIONS)) {
				instance.get(CONNECTORS).removeKey(event.prevVal.uid);
			}
			else if (dataSet === instance.get(CONNECTORS)) {
				event.prevVal.destroy();
			}
		},

		_afterRender: function(event) {
			var instance = this;

			instance.setStdModContent(WidgetStdMod.BODY, _EMPTY_STR, WidgetStdMod.AFTER);
			instance._renderGraphic();
			instance._renderControls();
			instance._renderLabel();
			instance._uiSetHighlighted(instance.get(HIGHLIGHTED));
		},

		_bindBoundaryEvents: function() {
			var instance = this;

			instance.boundary.detachAll().on({
				mouseenter: A.bind(instance._onBoundaryMouseEnter, instance),
				mouseleave: A.bind(instance._onBoundaryMouseLeave, instance)
			});
		},

		_createDataSet: function() {
			var instance = this;

			return new A.DataSet({
				bubbleTargets: instance
			});
		},

		_handleCloseEvent: function(event) {
			var instance = this;

			instance.get(BUILDER).deleteSelectedNode();
		},

		_handleConnectStart: function(startXY) {
			var instance = this;

			instance.fire('connectStart', { startXY: startXY });
		},

		_handleConnectMove: function(mouseXY) {
			var instance = this;
			var builder = instance.get(BUILDER);

			instance.fire('connectMove', {
				mouseXY: mouseXY,
				publishedSource: builder.publishedSource
			});
		},

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

		_handleConnectOutTarget: function(mouseXY) {
			var instance = this;
			var builder = instance.get(BUILDER);
			var publishedSource = builder.publishedSource;

			if (publishedSource) {
				instance.fire('connectOutTarget', {
					publishedSource: publishedSource
				});
			}
		},

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

		_handleEditEvent: function(event) {
			var instance = this;

			instance.get(BUILDER).editNode(instance);
		},

		_onBoundaryDrag: function(event) {
			var instance = this;
			var dd = instance.boundaryDragDelegate.dd;

			instance._handleConnectMove(dd.con._checkRegion(dd.mouseXY));
		},

		_onBoundaryDragEnd: function(event) {
			var instance = this;

			instance._handleConnectEnd();
			event.target.get(DRAG_NODE).show();
		},

		_onBoundaryDragStart: function(event) {
			var instance = this;

			instance._handleConnectStart(instance.boundaryDragDelegate.dd.startXY);
			event.target.get(DRAG_NODE).hide();
		},

		_onBoundaryMouseEnter: function(event) {
			var instance = this;

			instance.fire('boundaryMouseEnter', {
				domEvent: event
			});

			instance._handleConnectOverTarget();
		},

		_onBoundaryMouseLeave: function(event) {
			var instance = this;

			instance.fire('boundaryMouseLeave', {
				domEvent: event
			});

			instance._handleConnectOutTarget();
		},

		_onNameChange: function(event) {
			var instance = this;

			instance.eachConnector(function(connector, index, sourceNode) {
				var transition = connector.get(TRANSITION);

				transition[(instance === sourceNode) ? SOURCE : TARGET] = event.newVal;
				connector.set(TRANSITION, transition);
			});
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

		_renderLabel: function() {
			var instance = this;

			instance.labelNode = A.Node.create(
				Lang.sub(instance.LABEL_TEMPLATE, {
					label: instance.get('name')
				})
			);

			instance.get('contentBox').placeAfter(instance.labelNode);
		},

		_setTransitions: function(val) {
			var instance = this;

			if (!isDataSet(val)) {
				var dataSet = instance._createDataSet();

				A.Array.each(val, function(transition) {
					var uid = A.guid();

					transition = isObject(transition) ? A.mix(transition, { uid: uid }) : { uid: uid, target: transition };

					dataSet.add(uid, instance.prepareTransition(transition));
				});

				val = dataSet;
			}

			return val;
		},

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

		_uiSetHighlighted: function(val) {
			var instance = this;

			if (instance.get(RENDERED)) {
				var stroke = val ? instance.get(HIGHLIGHT_BOUNDARY_STROKE) : instance.get(SHAPE_BOUNDARY+_DOT+STROKE);

				if (stroke) {
					instance.boundary.set(STROKE, stroke);
				}
			}
		},

		_uiSetName: function(val) {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			boundingBox.set(ID, A.DiagramNode.buildNodeId(val));

			if (instance.get('rendered')) {
				instance.labelNode.setContent(val);
			}
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
		},

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

	prototype: {
		hotPoints: A.DiagramNode.CIRCLE_POINTS,

		renderShapeBoundary: function() {
			var instance = this;

			var boundary = instance.boundary = instance.get(GRAPHIC).addShape(
				instance.get(SHAPE_BOUNDARY)
			);

			boundary.translate(5, 5);

			return boundary;
		},

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
		hotPoints: A.DiagramNode.DIAMOND_POINTS,

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

	EXTENDS: A.DiagramNodeState,

	prototype: {
		hotPoints: A.DiagramNode.DIAMOND_POINTS,

		renderShapeBoundary: A.DiagramNodeCondition.prototype.renderShapeBoundary,

		_valueShapeBoundary: A.DiagramNode.prototype._valueShapeBoundary
	}
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

	prototype: {
		hotPoints: A.DiagramNode.DIAMOND_POINTS,

		renderShapeBoundary: A.DiagramNodeCondition.prototype.renderShapeBoundary,

		_valueShapeBoundary: A.DiagramNode.prototype._valueShapeBoundary
	}
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

	prototype: {
		hotPoints: A.DiagramNode.SQUARE_POINTS,

		renderShapeBoundary: function() {
			var instance = this;

			var boundary = instance.boundary = instance.get(GRAPHIC).addShape(
				instance.get(SHAPE_BOUNDARY)
			);

			boundary.translate(8, 8);

			return boundary;
		},

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

}, '@VERSION@' ,{requires:['aui-data-set','aui-diagram-builder-base','aui-diagram-builder-connector','overlay'], skinnable:true});
AUI.add('aui-diagram-builder-connector', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isString = Lang.isString,

	AArray = A.Array,

	// The first Bernstein basis polynomials (n=3), http://en.wikipedia.org/wiki/B%C3%A9zier_curve
	// The t in the function for a linear Bézier curve can be thought of as describing how far B(t) is from P0 to P1.
	// For example when t=0.25, B(t) is one quarter of the way from point P0 to P1. As t varies from 0 to 1, B(t) describes a straight line from P0 to P1.
	B1 = function(t) { return (t*t*t); },
	B2 = function(t) { return (3*t*t*(1-t)); },
	B3 = function(t) { return (3*t*(1-t)*(1-t)); },
	B4 = function(t) { return ((1-t)*(1-t)*(1-t)); },

	// Find a Cubic Bezier point based on the control points. Consider the first two control points as the start and end point respectively.
	getCubicBezier = function(t, startPos, endPos, cp1, cp2) {
		var x = startPos[0] * B1(t) + cp1[0] * B2(t) + cp2[0] * B3(t) + endPos[0] * B4(t);
		var y = startPos[1] * B1(t) + cp1[1] * B2(t) + cp2[1] * B3(t) + endPos[1] * B4(t);
		return [x, y];
	},

	isGraphic = function(val) {
		return A.instanceOf(val, A.Graphic);
	},

	toDegrees = function(angleRadians) {
	  return angleRadians * 180 / Math.PI;
	},

	sign = function(x) {
		return x === 0 ? 0 : (x < 0 ? -1 : 1);
	},

	ARROW_POINTS = 'arrowPoints',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CLICK = 'click',
	COLOR = 'color',
	CONNECTOR = 'connector',
	DIAGRAM_NODE = 'diagramNode',
	FILL = 'fill',
	GRAPHIC = 'graphic',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	LAZY_DRAW = 'lazyDraw',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	NAME = 'name',
	NODE_NAME = 'nodeName',
	P1 = 'p1',
	P2 = 'p2',
	PATH = 'path',
	REGION = 'region',
	SELECTED = 'selected',
	SHAPE = 'shape',
	SHAPE_ARROW = 'shapeArrow',
	SHAPE_ARROW_HOVER = 'shapeArrowHover',
	SHAPE_ARROW_SELECTED = 'shapeArrowSelected',
	SHAPE_HOVER = 'shapeHover',
	SHAPE_SELECTED = 'shapeSelected',
	SHOW_NAME = 'showName',
	STROKE = 'stroke',
	VISIBLE = 'visible',

	CSS_HELPER_HIDDEN = A.getClassName(HELPER, HIDDEN);

A.PolygonUtil = {
	ARROW_POINTS: [
		[ -12, -6 ],
		[ -8, 0 ],
		[ -12, 6 ],
		[ 6, 0 ]
	],

	drawArrow: function(shape, x1, y1, x2, y2, arrowPoints) {
		var instance = this;

		var angle = Math.atan2(y2-y1, x2-x1);

		shape.moveTo(x2, y2);

		// Slide the arrow position along the line in 5px in polar coordinates
		x2 = x2 - 5*Math.cos(angle);
		y2 = y2 - 5*Math.sin(angle);

		instance.drawPolygon(
			shape,
			instance.translatePoints(instance.rotatePoints(arrowPoints || instance.ARROW_POINTS, angle), x2, y2)
		);
	},

	drawPolygon: function(shape, points) {
		var instance = this;

		shape.moveTo(points[0][0], points[0][1]);

		AArray.each(points, function(p, i) {
			if (i > 0) {
				shape.lineTo(points[i][0], points[i][1]);
			}
		});

		shape.lineTo(points[0][0], points[0][1]);
	},

	translatePoints: function(points, x, y) {
		var instance = this;
		var xy = [];

		AArray.each(points, function(p, i) {
			xy.push([ points[i][0] + x, points[i][1] + y ]);
		});

		return xy;
	},

	rotatePoints: function(points, angle) {
		var instance = this;
		var xy = [];

		AArray.each(points, function(p, i) {
			xy.push(instance.rotatePoint(angle, points[i][0], points[i][1]));
		});

		return xy;
	},

	rotatePoint: function(angle, x, y) {
		return [
			(x * Math.cos(angle)) - (y * Math.sin(angle)),
			(x * Math.sin(angle)) + (y * Math.cos(angle))
		];
	}
};

A.Connector = A.Base.create('line', A.Base, [], {
	SERIALIZABLE_ATTRS: [COLOR, LAZY_DRAW, NAME, SHAPE_SELECTED, SHAPE_HOVER, /*SHAPE,*/ P1, P2],

	shape: null,
	shapeArrow: null,

	initializer: function(config) {
		var instance = this;
		var lazyDraw = instance.get(LAZY_DRAW);

		instance.after({
			nameChange: instance._afterNameChange,
			p1Change: instance.draw,
			p2Change: instance.draw,
			selectedChange: instance._afterSelectedChange,
			showNameChange: instance._afterShowNameChange,
			visibleChange: instance._afterVisibleChange
		});

		instance._initShapes();

		if (!lazyDraw) {
			instance.draw();
		}

		instance._uiSetVisible(instance.get(VISIBLE));
		instance._uiSetName(instance.get(NAME));
		instance._uiSetSelected(instance.get(SELECTED), !lazyDraw);
		instance._uiSetShowName(instance.get(SHOW_NAME));
	},

	destructor: function() {
		var instance = this;

		instance.shape.destroy();
		instance.shapeArrow.destroy();
		instance.get(NODE_NAME).remove();
	},

	draw: function() {
		var instance = this;
		var shape = instance.shape;
		var shapeArrow = instance.shapeArrow;

		var p1 = instance.get(P1),
			p2 = instance.get(P2),
			c1 = instance.toCoordinate(p1),
			c2 = instance.toCoordinate(p2),
			x1 = c1[0],
			y1 = c1[1],
			x2 = c2[0],
			y2 = c2[1],
			dx = Math.max(Math.abs(x1 - x2) / 2, 10),
			dy = Math.max(Math.abs(y1 - y2) / 2, 10),

			curveArgs = null,
			nQuadrantSections = 8,
			angle = toDegrees(Math.atan2(y2-y1, x2-x1)),
			pseudoQuadrant = Math.round(Math.abs(angle)/(360/nQuadrantSections));

		if (sign(angle) < 0) {
			curveArgs = [
				[x1+dx, y1, x2-dx, y2, x2, y2], //3,6
				[x1+dx, y1, x2, y1-dy, x2, y2], //3,5
				[x1, y1-dy, x2, y1-dy, x2, y2], //0,5
				[x1-dx, y1, x2, y1-dy, x2, y2], //2,5
				[x1-dx, y1, x2+dx, y2, x2, y2] //2,7
			];
		}
		else {
			curveArgs = [
				[x1+dx, y1, x2-dx, y2, x2, y2], //3,6
				[x1+dx, y1, x2, y1+dy, x2, y2], //3,4
				[x1, y1+dy, x2, y1+dy, x2, y2], //1,4
				[x1-dx, y1, x2, y1+dy, x2, y2], //2,4
				[x1-dx, y1, x2+dx, y2, x2, y2] //2,7
			];
		}

		var cp = curveArgs[pseudoQuadrant];

		shape.clear();
		shape.moveTo(x1, y1);
		shape.curveTo.apply(shape, cp);
		shape.end();

		// Extract the angle from a segment of the current Cubic Bezier curve to rotate the arrow.
		// The segment should be an extremities for better angle extraction, on this particular case t = [0 to 0.025].
		var xy1 = getCubicBezier(0, [x1, y1], [x2, y2], [cp[0], cp[1]], [cp[2], cp[3]]),
			xy2 = getCubicBezier(0.075, [x1, y1], [x2, y2], [cp[0], cp[1]], [cp[2], cp[3]]),
			centerXY = getCubicBezier(0.5, [x1, y1], [x2, y2], [cp[0], cp[1]], [cp[2], cp[3]]);

		shapeArrow.clear();
		A.PolygonUtil.drawArrow(shapeArrow, xy2[0], xy2[1], xy1[0], xy1[1], instance.get(ARROW_POINTS));
		shapeArrow.end();

		if (instance.get(SHOW_NAME)) {
			instance.get(NODE_NAME).center(instance.toXY(centerXY));
		}

		return instance;
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
			}
		];
	},

	getStrings: function() {
		return A.Connector.STRINGS;
	},

	hide: function() {
		var instance = this;

		instance.set(VISIBLE, false);

		return instance;
	},

	show: function() {
		var instance = this;

		instance.set(VISIBLE, true);

		return instance;
	},

	toCoordinate: function(coord) {
		var instance = this;

		return instance._offsetXY(coord, -1);
	},

	toJSON: function() {
		var instance = this;
		var output = {};

		AArray.each(instance.SERIALIZABLE_ATTRS, function(attributeName) {
			output[attributeName] = instance.get(attributeName);
		});

		return output;
	},

	toXY: function(coord) {
		var instance = this;

		return instance._offsetXY(coord, 1);
	},

	_afterNameChange: function(event) {
	    var instance = this;

		instance._uiSetName(event.newVal);

		instance.draw();
	},

	_afterSelectedChange: function(event) {
		var instance = this;

		instance._uiSetSelected(event.newVal);
	},

	_afterShowNameChange: function(event) {
		var instance = this;

		instance._uiSetShowName(event.newVal);
	},

	_afterVisibleChange: function(event) {
	    var instance = this;

		instance._uiSetVisible(event.newVal);
	},

	_initShapes: function() {
		var instance = this;

		var shape = instance.shape = instance.get(GRAPHIC).addShape(
			instance.get(SHAPE)
		);

		var shapeArrow = instance.shapeArrow = instance.get(GRAPHIC).addShape(
			instance.get(SHAPE_ARROW)
		);

		shape.on(CLICK, A.bind(instance._onShapeClick, instance));
		shape.on(MOUSEENTER, A.bind(instance._onShapeMouseEnter, instance));
		shape.on(MOUSELEAVE, A.bind(instance._onShapeMouseLeave, instance));
		shapeArrow.on(CLICK, A.bind(instance._onShapeClick, instance));
		instance.get(NODE_NAME).on(CLICK, A.bind(instance._onShapeClick, instance));
	},

	_offsetXY: function(xy, sign) {
		var instance = this;
		var offsetXY = instance.get(GRAPHIC).getXY();

		return [ xy[0] + offsetXY[0]*sign, xy[1] + offsetXY[1]*sign ];
	},

	_onShapeClick: function(event) {
		var instance = this;
		var builder = instance.get(BUILDER);
		var selected = instance.get(SELECTED);

		if (builder) {
			if (event.hasModifier()) {
				builder.closeEditProperties();
			}
			else {
				builder.unselectConnectors();

				if (selected) {
					builder.closeEditProperties();
				}
				else {
					builder.editConnector(instance);
				}
			}
		}

		instance.set(SELECTED, !selected);

		event.halt();
	},

	_onShapeMouseEnter: function(event) {
		var instance = this;

		if (!instance.get(SELECTED)) {
			var shapeHover = instance.get(SHAPE_HOVER);
			var shapeArrowHover = instance.get(SHAPE_ARROW_HOVER);

			if (shapeHover) {
				instance._updateShape(instance.shape, shapeHover);
			}

			if (shapeArrowHover) {
				instance._updateShape(instance.shapeArrow, shapeArrowHover);
			}
		}
	},

	_onShapeMouseLeave: function(event) {
		var instance = this;

		if (!instance.get(SELECTED)) {
			instance._updateShape(instance.shape, instance.get(SHAPE));
			instance._updateShape(instance.shapeArrow, instance.get(SHAPE_ARROW));
		}
	},

	_setNodeName: function(val) {
		var instance = this;

		if (!A.instanceOf(val, A.Node)) {
			val = new A.Template(val).render();
			instance.get(BUILDER).canvas.append(val.unselectable());
		}

		return val;
	},

	_setShape: function(val) {
		var instance = this;

		return A.merge(
			{
				type: PATH,
				stroke: {
					color: instance.get(COLOR),
					weight: 2,
					opacity: 1
				}
			},
			val
		);
	},

	_setShapeArrow: function(val) {
		var instance = this;

		return A.merge(
			{
				type: PATH,
				fill: {
					color: instance.get(COLOR),
					opacity: 1
				},
				stroke: {
					color: instance.get(COLOR),
					weight: 2,
					opacity: 1
				}
			},
			val
		);
	},

	_uiSetName: function(val) {
		var instance = this;

		instance.get(NODE_NAME).html(val);
	},

	_uiSetSelected: function(val, draw) {
		var instance = this;

		instance._updateShape(instance.shape, val ? instance.get(SHAPE_SELECTED) : instance.get(SHAPE), draw);
		instance._updateShape(instance.shapeArrow, val ? instance.get(SHAPE_ARROW_SELECTED) : instance.get(SHAPE_ARROW), draw);
	},

	_uiSetShowName: function(val) {
		var instance = this;

		instance.get(NODE_NAME).toggleClass(CSS_HELPER_HIDDEN, !val);
	},

	_uiSetVisible: function(val) {
		var instance = this;

		instance.shape.set(VISIBLE, val);
		instance.shapeArrow.set(VISIBLE, val);
		instance._uiSetShowName(val && instance.get(SHOW_NAME));
	},

	_updateShape: function(shape, cShape, draw) {
		var instance = this;

		if (cShape.hasOwnProperty(FILL)) {
			shape.set(FILL, cShape[FILL]);
		}

		if (cShape.hasOwnProperty(STROKE)) {
			shape.set(STROKE, cShape[STROKE]);
		}

		if (draw !== false) {
			instance.draw();
		}
	}
},{
	ATTRS: {
		arrowPoints: {
			value: A.PolygonUtil.ARROW_POINTS
		},

		builder: {
		},

		color: {
			value: '#27aae1',
			validator: isString
		},

		graphic: {
			validator: isGraphic
		},

		lazyDraw: {
			value: false,
			validator: isBoolean
		},

		name: {
			valueFn: function() {
				var instance = this;

				return CONNECTOR + (++A.Env._uidx);
			},
			validator: isString
		},

		nodeName: {
			setter: '_setNodeName',
			value: [ '<span class="{$ans}diagram-builder-connector-name"></span>' ],
			writeOnce: true
		},

		p1: {
			value: [0, 0],
			validator: isArray
		},

		p2: {
			value: [0, 0],
			validator: isArray
		},

		selected: {
			value: false,
			validator: isBoolean
		},

		shape: {
			value: null,
			setter: '_setShape'
		},

		shapeArrow: {
			value: null,
			setter: '_setShapeArrow'
		},

		shapeArrowHover: {
			value: {
				fill: {
					color: '#ffd700'
				},
				stroke: {
					color: '#ffd700',
					weight: 5,
					opacity: 0.8
				}
			}
		},

		shapeArrowSelected: {
			value: {
				fill: {
					color: '#ff6600'
				},
				stroke: {
					color: '#ff6600',
					weight: 5,
					opacity: 0.8
				}
			}
		},

		shapeHover: {
			value: {
				stroke: {
					color: '#ffd700',
					weight: 5,
					opacity: 0.8
				}
			}
		},

		shapeSelected: {
			value: {
				stroke: {
					color: '#ff6600',
					weight: 5,
					opacity: 0.8
				}
			}
		},

		showName: {
			validator: isBoolean,
			value: true
		},

		transition: {
			value: {},
			validator: isObject
		},

		visible: {
			validator: isBoolean,
			value: true
		}
	},

	STRINGS: {
		name: 'Name'
	}
});

}, '@VERSION@' ,{requires:['aui-base','aui-template','arraylist-add','arraylist-filter','json','graphics','dd'], skinnable:true});


AUI.add('aui-diagram-builder', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-diagram-builder-base','aui-diagram-builder-impl']});

