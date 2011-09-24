AUI.add('aui-diagram-builder-base', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,

	isArrayList = function(val) {
		return (val instanceof A.ArrayList);
	},

	isNode = function(val) {
		return (val instanceof A.Node);
	},

	isAvailableField = function(val) {
		return (val instanceof A.AvailableField);
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

		if (isNode(A.one(node))) {
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

			instance.after({
				draggableChange: instance._afterDraggableChange,
				idChange: instance._afterIdChange,
				labelChange: instance._afterLabelChange
			});

			instance.labelNode = node.one(_DOT+CSS_DIAGRAM_BUILDER_FIELD_LABEL);

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

			instance.labelNode.setContent(val);
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
AUI.add('aui-diagram-builder-connector', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,

	AArray = A.Array,

	isAnchor = function(val) {
		return (val instanceof A.Anchor);
	},

	isArrayList = function(val) {
		return (val instanceof A.ArrayList);
	},

	isDiagramNode = function(val) {
		return (val instanceof A.DiagramNode);
	},

	isGraphic = function(val) {
		return (val instanceof A.Graphic);
	},

	ANCHOR = 'anchor',
	ARROW_POINTS = 'arrowPoints',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CLICK = 'click',
	COLOR = 'color',
	CONNECTOR = 'connector',
	DATA_ANCHOR = 'dataAnchor',
	DIAGRAM = 'diagram',
	DIAGRAM_NODE = 'diagramNode',
	FILL = 'fill',
	GRAPHIC = 'graphic',
	ID = 'id',
	LAZY_DRAW = 'lazyDraw',
	MAX = 'max',
	MAX_SOURCES = 'maxSources',
	MAX_TARGETS = 'maxTargets',
	MOUSEENTER = 'mouseenter',
	MOUSELEAVE = 'mouseleave',
	NAME = 'name',
	NODE = 'node',
	P1 = 'p1',
	VISIBLE = 'visible',
	P2 = 'p2',
	PATH = 'path',
	SELECTED = 'selected',
	SHAPE = 'shape',
	SHAPE_HOVER = 'shapeHover',
	SHAPE_SELECTED = 'shapeSelected',
	SOURCES = 'sources',
	STROKE = 'stroke',
	TARGETS = 'targets',
	WRAPPER = 'wrapper',

	_DOT = '.',
	_EMPTY_STR = '',
	_HASH = '#',

	AgetClassName = A.getClassName,

	CSS_DB_ANCHOR_NODE_MAX_TARGETS = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE, MAX, TARGETS),
	CSS_DB_ANCHOR_NODE_MAX_SOURCES = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE, MAX, SOURCES),
	CSS_DB_ANCHOR_NODE_WRAPPER = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE, WRAPPER),
	CSS_DB_ANCHOR_NODE = AgetClassName(DIAGRAM, BUILDER, ANCHOR, NODE);

A.PolygonUtil = {
	ARROW_POINTS: [
		[ -12, -6 ],
		[ -8, 0 ],
		[ -12, 6 ],
		[ 6, 0 ]
	],

	drawLineArrow: function(shape, x1, y1, x2, y2, arrowPoints) {
		var instance = this;

		shape.moveTo(x1, y1);
		shape.lineTo(x2, y2);

		var angle = Math.atan2(y2-y1, x2-x1);

		// Slide the arrow position along the line in 15px in polar coordinates
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

	initializer: function(config) {
		var instance = this;
		var lazyDraw = instance.get(LAZY_DRAW);

		instance.after({
			p1Change: instance.draw,
			p2Change: instance.draw,
			selectedChange: instance._afterSelectedChange
		});

		instance._initShapes();

		if (!lazyDraw) {
			instance.draw();
		}

		instance._uiSetSelected(instance.get(SELECTED), !lazyDraw);
	},

	destroy: function() {
		var instance = this;

		instance.get(GRAPHIC).removeShape(instance.shape);
	},

	draw: function() {
		var instance = this;
		var shape = instance.shape;

		var c1 = instance.getCoordinate(instance.get(P1));
		var c2 = instance.getCoordinate(instance.get(P2));

		shape.clear();

		A.PolygonUtil.drawLineArrow(shape, c1[0], c1[1], c2[0], c2[1], instance.get(ARROW_POINTS));

		shape.end();

		return instance;
	},

	getCoordinate: function(p) {
		var instance = this;
		var xy = instance.get(GRAPHIC).getXY();

		return [ p[0] - xy[0], p[1] - xy[1] ];
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
		var anchor = instance.get(ANCHOR);
		var strings = anchor ? anchor.get(DIAGRAM_NODE).getStrings() : {};

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

	hide: function() {
	    var instance = this;

		instance.shape.set(VISIBLE, false);

		return instance;
	},

	show: function() {
	    var instance = this;

		instance.shape.set(VISIBLE, true);

		return instance;
	},

	toJSON: function() {
		var instance = this;
		var output = {};

		AArray.each(instance.SERIALIZABLE_ATTRS, function(attributeName) {
			output[attributeName] = instance.get(attributeName);
		});

		return output;
	},

	_afterSelectedChange: function(event) {
		var instance = this;

		instance._uiSetSelected(event.newVal);
	},

	_initShapes: function() {
		var instance = this;

		var shape = instance.shape = instance.get(GRAPHIC).addShape(
			instance.get(SHAPE)
		);

		shape.on(CLICK, A.bind(instance._onShapeClick, instance));
		shape.on(MOUSEENTER, A.bind(instance._onShapeMouseEnter, instance));
		shape.on(MOUSELEAVE, A.bind(instance._onShapeMouseLeave, instance));
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
	},

	_onShapeMouseEnter: function(event) {
		var instance = this;

		if (!instance.get(SELECTED)) {
			var shapeHover = instance.get(SHAPE_HOVER);

			if (shapeHover) {
				instance._updateShape(shapeHover);
			}
		}
	},

	_onShapeMouseLeave: function(event) {
		var instance = this;

		if (!instance.get(SELECTED)) {
			instance._updateShape(instance.get(SHAPE));
		}
	},

	_setShape: function(val) {
		var instance = this;

		return A.merge(
			{
				type: PATH,
				stroke: {
					color: instance.get(COLOR),
					weight: 3
				},
				fill: {
					color: instance.get(COLOR)
				}
			},
			val
		);
	},

	_updateShape: function(cShape, draw) {
		var instance = this;
		var shape = instance.shape;

		if (cShape.hasOwnProperty(FILL)) {
			shape.set(FILL, cShape[FILL]);
		}

		if (cShape.hasOwnProperty(STROKE)) {
			shape.set(STROKE, cShape[STROKE]);
		}

		if (draw !== false) {
			instance.draw();
		}
	},

	_uiSetSelected: function(val, draw) {
		var instance = this;

		instance._updateShape(val ? instance.get(SHAPE_SELECTED) : instance.get(SHAPE), draw);
	}
},{
	ATTRS: {
		builder: {
		},

		color: {
			value: '#27aae1',
			validator: isString
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

		graphic: {
			validator: isGraphic
		},

		shapeHover: {
			value: {
				fill: {
					color: '#666'
				},
				stroke: {
					color: '#666',
					weight: 5
				}
			}
		},

		selected: {
			value: false,
			validator: isBoolean
		},

		shape: {
			value: null,
			setter: '_setShape'
		},

		shapeSelected: {
			value: {
				fill: {
					color: '#000'
				},
				stroke: {
					color: '#000',
					weight: 5
				}
			}
		},

		sourceUID: {
			value: _EMPTY_STR,
			validator: isString
		},

		targetUID: {
			value: _EMPTY_STR,
			validator: isString
		},

		arrowPoints: {
			value: A.PolygonUtil.ARROW_POINTS
		},

		p1: {
			value: [0, 0],
			validator: isArray
		},

		p2: {
			value: [0, 0],
			validator: isArray
		}
	}
});

// A.Anchor = A.Base.create('anchor', A.Base, [], {
// 	ANCHOR_WRAPPER_TEMPLATE: '<div class="' + CSS_DB_ANCHOR_NODE_WRAPPER + '"></div>',
// 	NODE_TEMPLATE: '<div class="' + CSS_DB_ANCHOR_NODE + '"></div>',

// 	connectors: null,

// 	initializer: function() {
// 		var instance = this;

// 		instance.connectors = {};

// 		instance._renderNode();

// 		instance.connectTargets();

// 		instance.after({
// 			sourcesChange: instance._afterSourcesChange,
// 			targetsChange: instance._afterTargetsChange
// 		});

// 		instance._uiSetMaxTargets(
// 			instance.get(MAX_TARGETS)
// 		);
// 	},

// 	addSource: function(source) {
// 		var instance = this;

// 		if (instance.get(SOURCES).size() < instance.get(MAX_SOURCES)) {
// 			instance.set(
// 				SOURCES,
// 				instance.get(SOURCES).remove(source).add(source)
// 			);
// 		}

// 		return instance;
// 	},

// 	addTarget: function(target) {
// 		var instance = this;

// 		if (instance.get(TARGETS).size() < instance.get(MAX_TARGETS)) {
// 			instance.set(
// 				TARGETS,
// 				instance.get(TARGETS).remove(target).add(target)
// 			);
// 		}

// 		return instance;
// 	},

// 	alignConnectors: function() {
// 		var instance = this;

// 		instance.get(TARGETS).each(function(target) {
// 			var tConnector = instance.getConnector(target);

// 			if (tConnector) {
// 				tConnector.set(P1, instance.getCenterXY());
// 				tConnector.set(P2, target.getCenterXY());
// 			}
// 		});

// 		instance.get(SOURCES).each(function(source) {
// 			var sConnector = source.getConnector(instance);

// 			if (sConnector) {
// 				sConnector.set(P1, source.getCenterXY());
// 				sConnector.set(P2, instance.getCenterXY());
// 			}
// 		});

// 		return instance;
// 	},

// 	destroy: function() {
// 		var instance = this;

// 		instance.disconnectTargets();
// 		instance.disconnectSources();

// 		instance.get(NODE).remove();
// 	},

// 	connect: function(target, connector) {
// 		var instance = this;

// 		if (isDiagramNode(target)) {
// 			target = target.findAvailableAnchor();
// 		}

// 		instance.addTarget(target);
// 		target.addSource(instance);

// 		if (!instance.isConnected(target)) {
// 			var c = A.merge(target.get(CONNECTOR), connector);

// 			c.anchor = instance;
// 			c.p1 = instance.getCenterXY();
// 			c.p2 = target.getCenterXY();

// 			instance.connectors[target.get(ID)] = new A.Connector(c);
// 		}

// 		setTimeout(function() {
// 			target.get(DIAGRAM_NODE).syncDropTargets();
// 		}, 50);

// 		return instance;
// 	},

// 	connectTargets: function() {
// 		var instance = this;

// 		instance.get(TARGETS).each(A.bind(instance.connect, instance));

// 		return instance;
// 	},

// 	disconnect: function(target) {
// 		var instance = this;

// 		instance.getConnector(target).destroy();
// 		instance.removeTarget(target);
// 		target.removeSource(instance);

// 		setTimeout(function() {
// 			target.get(DIAGRAM_NODE).syncDropTargets();
// 		}, 50);
// 	},

// 	disconnectTargets: function() {
// 		var instance = this;

// 		instance.get(TARGETS).each(function(target) {
// 			instance.disconnect(target);
// 		});

// 		return instance;
// 	},

// 	disconnectSources: function() {
// 		var instance = this;

// 		instance.get(SOURCES).each(function(source) {
// 			source.disconnect(instance);
// 		});

// 		return instance;
// 	},

// 	findConnectorTarget: function(connector) {
// 		var instance = this;
// 		var target = null;

// 		A.some(instance.connectors, function(c, targetId) {
// 			if (c === connector) {
// 				target = A.Anchor.getAnchorByNode(_HASH+targetId);
// 				return true;
// 			}
// 		});

// 		return target;
// 	},

// 	getBuilder: function() {
// 		var instance = this;

// 		return instance.get(DIAGRAM_NODE).get(BUILDER);
// 	},

// 	getCenterXY: function() {
// 		var instance = this;

// 		return instance.get(NODE).getCenterXY();
// 	},

// 	getConnector: function(target) {
// 		var instance = this;

// 		return instance.connectors[target.get(ID)];
// 	},

// 	hasConnection: function() {
// 		var instance = this;

// 		return ((instance.get(TARGETS).size() > 0) || (instance.get(SOURCES).size() > 0));
// 	},

// 	isConnected: function(target) {
// 		var instance = this;

// 		return instance.connectors.hasOwnProperty(target.get(ID));
// 	},

// 	removeSource: function(source) {
// 		var instance = this;

// 		instance.set(
// 			SOURCES,
// 			instance.get(SOURCES).remove(source)
// 		);

// 		return instance;
// 	},

// 	removeTarget: function(target) {
// 		var instance = this;

// 		instance.set(
// 			TARGETS,
// 			instance.get(TARGETS).remove(target)
// 		);

// 		delete instance.connectors[target.get(ID)];
// 		return instance;
// 	},

// 	_afterSourcesChange: function(event) {
// 		var instance = this;

// 		instance._uiSetSources(event.newVal);
// 	},

// 	_afterTargetsChange: function(event) {
// 		var instance = this;

// 		// TODO - event.prevVal is always equal to event.newVal, review this
//         // logic below, references between anchors needs to be cleaned up otherwise
//         // will store the wrong relationship between nodes.

// 		event.prevVal.each(function(anchor) {
// 			anchor.removeSource(instance);
// 		});

// 		event.newVal.each(function(anchor) {
// 			anchor.addSource(instance);
// 		});

// 		instance._uiSetTargets(event.newVal);
// 	},

// 	_renderNode: function() {
// 		var instance = this;
// 		var diagramNode = instance.get(DIAGRAM_NODE);
// 		var container = diagramNode.get(BOUNDING_BOX);

// 		instance.wrapper = container.one(_DOT+CSS_DB_ANCHOR_NODE_WRAPPER) ||
// 							A.Node.create(instance.ANCHOR_WRAPPER_TEMPLATE);

// 		instance.wrapper.appendTo(container).appendChild(instance.get(NODE));
// 	},

// 	_setConnector: function(val) {
// 		var instance = this;

// 		return A.merge(
// 			{
// 				graphic: instance.getBuilder().get(GRAPHIC)
// 			},
// 			val
// 		);
// 	},

// 	_setSources: function(val) {
// 		var instance = this;

// 		return instance._setAnchors(val);
// 	},

// 	_setTargets: function(val) {
// 		var instance = this;

// 		val = instance._setAnchors(val, true);

// 		val.each(function(anchor) {
// 			anchor.addSource(instance);
// 		});

// 		return val;
// 	},

// 	_setAnchors: function(val, target) {
// 		var instance = this;

// 		if (!isArrayList(val)) {
// 			var targets = [];

// 			A.Array.some(val, function(target, index) {
// 				if (index >= instance.get(target ? MAX_TARGETS : MAX_SOURCES)) {
// 					return true;
// 				}

// 				targets.push( isAnchor(target) ? target : new A.Anchor(target) );
// 			});

// 			val = new A.ArrayList(targets);
// 		}

// 		return val;
// 	},

// 	_setMaxSources: function(val) {
// 		var instance = this;

// 		instance._uiSetMaxSources(
// 			instance.get(MAX_SOURCES)
// 		);

// 		return val;
// 	},

// 	_setMaxTargets: function(val) {
// 		var instance = this;

// 		instance._uiSetMaxTargets(
// 			instance.get(MAX_TARGETS)
// 		);

// 		return val;
// 	},

// 	_setNode: function(val) {
// 		var instance = this;
// 		var id = instance.get(ID);

// 		return A.one(val).set(ID, id).setData(DATA_ANCHOR, instance);
// 	},

// 	_uiSetSources: function(val) {
// 		var instance = this;

// 		instance._uiSetMaxSources(
// 			instance.get(MAX_SOURCES)
// 		);
// 	},

// 	_uiSetMaxSources: function(val) {
// 		var instance = this;
// 		var node = instance.get(NODE);

// 		node.toggleClass(CSS_DB_ANCHOR_NODE_MAX_SOURCES, (instance.get(SOURCES).size() === val));
// 	},

// 	_uiSetMaxTargets: function(val) {
// 		var instance = this;
// 		var node = instance.get(NODE);

// 		node.toggleClass(CSS_DB_ANCHOR_NODE_MAX_TARGETS, (instance.get(TARGETS).size() === val));
// 	},

// 	_uiSetTargets: function(val) {
// 		var instance = this;

// 		instance._uiSetMaxTargets(
// 			instance.get(MAX_TARGETS)
// 		);
// 	}
// },{
// 	ATTRS: {
// 		diagramNode: {
// 		},

// 		connector: {
// 			setter: '_setConnector',
// 			value: {},
// 			validator: isObject
// 		},

// 		id: {
// 			readOnly: true,
// 			valueFn: function() {
// 				return A.guid();
// 			}
// 		},

// 		maxSources: {
// 			setter: '_setMaxSources',
// 			value: 1,
// 			validator: isNumber
// 		},

// 		maxTargets: {
// 			setter: '_setMaxTargets',
// 			value: 1,
// 			validator: isNumber
// 		},

// 		node: {
// 			setter: '_setNode',
// 			valueFn: function() {
// 				var instance = this;

// 				return A.Node.create(instance.NODE_TEMPLATE);
// 			}
// 		},

// 		sources: {
// 			value: [],
// 			setter: '_setSources',
// 			validator: function(val) {
// 				return isArray(val) || isArrayList(val);
// 			}
// 		},

// 		targets: {
// 			value: [],
// 			setter: '_setTargets',
// 			validator: function(val) {
// 				return isArray(val) || isArrayList(val);
// 			}
// 		}
// 	},

// 	getAnchorByNode: function(node) {
// 		return isAnchor(node) ? node : A.one(node).getData(DATA_ANCHOR);
// 	}
// });

}, '@VERSION@' ,{requires:['aui-base','arraylist-add','arraylist-filter','json','graphics','dd'], skinnable:true});


AUI.add('aui-diagram-builder', function(A){}, '@VERSION@' ,{use:['aui-diagram-builder-base','aui-diagram-builder-impl'], skinnable:true});

