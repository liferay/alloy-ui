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
	BASE = 'base',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CANCEL = 'cancel',
	CLEARFIX = 'clearfix',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	CONTENT_CONTAINER = 'contentContainer',
	CONTENT_NODE = 'contentNode',
	CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
	DIAGRAM = 'diagram',
	DIAGRAM_BUILDER_BASE = 'diagram-builder-base',
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
	LIST = 'list',
	NODE = 'node',
	NODE_SETTINGS = 'nodeSettings',
	PROPERTY_LIST = 'propertyList',
	RENDERED = 'rendered',
	SAVE = 'save',
	SETTINGS = 'settings',
	TAB = 'tab',
	TABS = 'tabs',
	TABVIEW = 'tabview',
	TAB_VIEW = 'tabView',
	TOOLBAR = 'toolbar',
	TOOLBAR_CONTAINER = 'toolbarContainer',

	AgetClassName = A.getClassName,

	_SPACE = ' ',
	_DOT = '.',
	_DOLLAR = '$',

	CSS_DIAGRAM_BUILDER_BASE_DROP_CONTAINER = AgetClassName(DIAGRAM, BUILDER, BASE, DROP, CONTAINER),
	CSS_DIAGRAM_BUILDER_BASE_CONTENT_CONTAINER = AgetClassName(DIAGRAM, BUILDER, BASE, CONTENT, CONTAINER),
	CSS_DIAGRAM_BUILDER_BASE_FIELD = AgetClassName(DIAGRAM, BUILDER, BASE, FIELD),
	CSS_DIAGRAM_BUILDER_BASE_FIELDS_CONTAINER = AgetClassName(DIAGRAM, BUILDER, BASE, FIELDS, CONTAINER),
	CSS_DIAGRAM_BUILDER_BASE_FIELD_DRAGGABLE = AgetClassName(DIAGRAM, BUILDER, BASE, FIELD, DRAGGABLE),
	CSS_DIAGRAM_BUILDER_BASE_FIELD_ICON = AgetClassName(DIAGRAM, BUILDER, BASE, FIELD, ICON),
	CSS_DIAGRAM_BUILDER_BASE_FIELD_LABEL = AgetClassName(DIAGRAM, BUILDER, BASE, FIELD, LABEL),
	CSS_DIAGRAM_BUILDER_BASE_TABS_CONTAINER = AgetClassName(DIAGRAM, BUILDER, BASE, TABS, CONTAINER),
	CSS_DIAGRAM_BUILDER_BASE_TABS_CONTAINER_CONTENT = AgetClassName(DIAGRAM, BUILDER, BASE, TABS, CONTAINER, CONTENT),
	CSS_DIAGRAM_BUILDER_BASE_TAB_ADD = AgetClassName(DIAGRAM, BUILDER, BASE, TAB, ADD),
	CSS_DIAGRAM_BUILDER_BASE_TAB_SETTINGS = AgetClassName(DIAGRAM, BUILDER, BASE, TAB, SETTINGS),
	CSS_DIAGRAM_BUILDER_BASE_TOOLBAR_CONTAINER = AgetClassName(DIAGRAM, BUILDER, BASE, TOOLBAR, CONTAINER),
	CSS_HELPER_CLEARFIX = AgetClassName(HELPER, CLEARFIX),
	CSS_ICON = AgetClassName(ICON),
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

	prototype: {
		FIELD_ITEM_TEMPLATE: '<li class="' + CSS_DIAGRAM_BUILDER_BASE_FIELD + '">' +
									'<span class="' + [ CSS_ICON, CSS_DIAGRAM_BUILDER_BASE_FIELD_ICON ].join(_SPACE) + ' {iconClass}"></span>' +
									'<span class="' + CSS_DIAGRAM_BUILDER_BASE_FIELD_LABEL + '"></span>' +
								'</li>',

		initializer: function() {
			var instance = this;
			var node = instance.get(NODE);

			instance.after({
				draggableChange: instance._afterDraggableChange,
				idChange: instance._afterIdChange,
				labelChange: instance._afterLabelChange
			});

			instance.labelNode = node.one(_DOT+CSS_DIAGRAM_BUILDER_BASE_FIELD_LABEL);

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

			instance.get(NODE).toggleClass(CSS_DIAGRAM_BUILDER_BASE_FIELD_DRAGGABLE, val);
		},

		_uiSetLabel: function(val) {
			var instance = this;

			instance.labelNode.setContent(val);
		},

		_uiSetId: function(val) {
			var instance = this;

			instance.get(NODE).set(ID, val);
		}
	}
});

AvailableField.buildNodeId = function(id) {
	return AVAILABLE_FIELDS + _DOLLAR + FIELD + _DOLLAR + id;
};

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
	}
};

A.mix(FieldSupport.prototype, {
	createFields: function(val) {
		var instance = this;
		var fields = [];

		AArray.each(val, function(field) {
			fields.push(instance.createField(field));
		});

		return new A.ArrayList(fields);
	},

	addField: function(field) {
		var instance = this;

		instance._updateFields(
			instance.get(FIELDS).add(
				instance.createField(field)
			)
		);
	},

	removeField: function(field) {
		var instance = this;

		instance._updateFields(
			instance.get(FIELDS).remove(field)
		);
	},

	_updateFields: function(fields) {
		var instance = this;

		instance.set(FIELDS, fields);
	},

	_setFields: function(val) {
		var instance = this;

		if (isArrayList(val)) {
			return val;
		}
		else {
			return instance.createFields(val);
		}
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
		NAME: DIAGRAM_BUILDER_BASE,

		ATTRS: {
			availableFields: {
				setter: '_setAvailableFields',
				validator: isArray
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

			dropConfig: {
				value: null,
				setter: '_setDropConfig',
				validator: isObject
			},

			availableFieldsDragConfig: {
				value: null,
				setter: '_setAvailableFieldsDragConfig',
				validator: isObject
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
					nodeSettings: 'Node settings',
					propertyName: 'Property Name',
					save: 'Save',
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
			contentContainer: _DOT+CSS_DIAGRAM_BUILDER_BASE_CONTENT_CONTAINER,
			dropContainer: _DOT+CSS_DIAGRAM_BUILDER_BASE_DROP_CONTAINER,
			fieldsContainer: _DOT+CSS_DIAGRAM_BUILDER_BASE_FIELDS_CONTAINER,
			toolbarContainer: _DOT+CSS_DIAGRAM_BUILDER_BASE_TOOLBAR_CONTAINER
		},

		UI_ATTRS: [AVAILABLE_FIELDS, FIELDS],

		AUGMENTS: [A.FieldSupport],

		prototype: {
			CONTENT_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_BASE_CONTENT_CONTAINER + '"></div>',
			DROP_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_BASE_DROP_CONTAINER + '"></div>',
			TOOLBAR_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_BASE_TOOLBAR_CONTAINER + '"></div>',
			FIELDS_CONTAINER_TEMPLATE: '<ul class="' + CSS_DIAGRAM_BUILDER_BASE_FIELDS_CONTAINER + '"></ul>',

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
					render: instance._afterRender
				});

				instance.after(instance._afterUiSetHeight, instance, '_uiSetHeight');

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

			plotFields: function(fields) {
			},

			renderUI: function() {
				var instance = this;

				instance._renderTabs();
				instance._renderContentContainer();

				instance._uiSetAvailableFields(
					instance.get(AVAILABLE_FIELDS)
				);
			},

			syncUI: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);

				instance._setupDrop();
				instance._setupAvailableFieldsDrag();

				contentBox.addClass(CSS_HELPER_CLEARFIX);
			},

			_afterActiveTabChange: function(event) {
				var instance = this;
				var tabContentNode = event.newVal.get(CONTENT_NODE);

				if (instance.get(RENDERED) && (tabContentNode === instance.settingsNode)) {
					instance._renderSettings();
				}
			},

			_afterRender: function(event) {
				var instance = this;

				instance.plotFields();
			},

			_afterUiSetHeight: function(val) {
				var instance = this;

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

			_renderContentContainer: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);
				var contentContainer = instance.contentContainer;

				contentContainer.appendChild(instance.dropContainer);
				contentBox.appendChild(contentContainer);
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
							plugins: [
								{
									cfg: {
										moveOnEnd: false
									},
									fn: A.Plugin.DDProxy
								}
							]
						},
						nodes: _DOT+CSS_DIAGRAM_BUILDER_BASE_FIELD_DRAGGABLE
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
					boundingBox: boundingBox.one(_DOT+CSS_DIAGRAM_BUILDER_BASE_TABS_CONTAINER),
					contentBox: boundingBox.one(_DOT+CSS_DIAGRAM_BUILDER_BASE_TABS_CONTAINER_CONTENT),
					bubbleTargets: instance,
					contentNode: boundingBox.one(_DOT+CSS_TABVIEW_CONTENT),
					cssClass: CSS_DIAGRAM_BUILDER_BASE_TABS_CONTAINER,
					listNode: tabListNode,
					render: instance.get(CONTENT_BOX)
				};

				if (!tabListNode) {
					var strings = instance.getStrings();

					defaultValue.items = [
						{ cssClass: CSS_DIAGRAM_BUILDER_BASE_TAB_ADD, label: strings[ADD_NODE] },
						{ cssClass: CSS_DIAGRAM_BUILDER_BASE_TAB_SETTINGS, label: strings[NODE_SETTINGS] }
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
								handler: A.bind(instance._handleSaveEvent, instance),
								label: strings[SAVE],
								icon: DISK
							},
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

	AArray = A.Array,

	isDiagramBuilder = function(val) {
		return (val instanceof A.DiagramBuilderBase);
	},

	isDiagramNode = function(val) {
		return (val instanceof A.DiagramNode);
	},

	getLeftTop = function(container, node) {
		var nodeXY = isArray(node) ? node : node.getXY();
		var containerXY = isArray(container) ? container : container.getXY();

		return AArray.map(containerXY, function(val, i) {
			return Math.max(0, val - nodeXY[i]);
		});
	},

	AVAILABLE_FIELD = 'availableField',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	DATA = 'data',
	DBLCLICK = 'dblclick',
	DESCRIPTION = 'description',
	DIAGRAM = 'diagram',
	DIAGRAM_BUILDER = 'diagram-builder',
	DIAGRAM_NODE = 'diagram-node',
	DRAG_NODE = 'dragNode',
	EDITING = 'editing',
	FIELDS = 'fields',
	FIELDS_DRAG_CONFIG = 'fieldsDragConfig',
	NAME = 'name',
	NODE = 'node',
	PARENT_NODE = 'parentNode',
	RECORDS = 'records',
	RECORDSET = 'recordset',
	RENDERED = 'rendered',
	TYPE = 'type',
	XY = 'xy',

	_DOT = '.',
	_EMPTY_STR = '',

	AgetClassName = A.getClassName,

	CSS_DIAGRAM_NODE_EDITING = AgetClassName(DIAGRAM, NODE, EDITING),
	CSS_DIAGRAM_NODE = AgetClassName(DIAGRAM, NODE);

var DiagramBuilder = A.Component.create({
	NAME: DIAGRAM_BUILDER,

	ATTRS: {
		fieldsDragConfig: {
			value: null,
			setter: '_setFieldsDragConfig',
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
				'drag:end': instance._onDragEnd,
				'drop:hit': instance._onDropHit,
				save: instance._onSave
			});

			instance.dropContainer.delegate(DBLCLICK, A.bind(instance._onNodeEdit, instance), _DOT+CSS_DIAGRAM_NODE);
		},

		syncUI: function() {
			var instance = this;

			A.DiagramBuilder.superclass.syncUI.apply(this, arguments);

			instance._setupFieldsDrag();
		},

		createField: function(val) {
			var instance = this;

			if (!isDiagramNode(val)) {
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

		plotFields: function() {
			var instance = this;
			var fields = instance.get(FIELDS);

			fields.each(function(field) {
				instance.plotField(field);
			});
		},

		plotField: function(field) {
			var instance = this;

			if (!field.get(RENDERED)) {
				field.render(instance.dropContainer);
			}
		},

		startEditingNode: function(diagramNode) {
			var instance = this;

			if (diagramNode) {
				instance.stopEditingNode();

				instance.tabView.selectTab(A.DiagramBuilder.SETTINGS_TAB);

				// instance._renderPropertyList();

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

		_onCancel: function(event) {
			var instance = this;

			instance.stopEditingNode();
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

				instance.addField({
					xy: getLeftTop(drag.lastXY, instance.dropContainer),
					type: availableField.get(TYPE)
				});
			}
		},

		_onNodeEdit: function(event) {
			var instance = this;
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

var DiagramNode = A.Component.create({
	NAME: DIAGRAM_NODE,

	ATTRS: {
		builder: {
			validator: isDiagramBuilder
		},

		description: {
			value: _EMPTY_STR,
			validator: isString
		},

		height: {
			value: 100
		},

		name: {
			valueFn: function() {
				var instance = this;

				return instance.get(TYPE) + (++A.Env._uidx);
			},
			validator: isString
		},

		strings: {
			value: {
				description: 'Description',
				name: 'Name',
				type: 'Type'
			}
		},

		type: {
			value: NODE,
			validator: isString
		},

		width: {
			value: 200
		}
	},

	EXTENDS: A.Overlay,

	prototype: {
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

		_getContainer: function() {
			var instance = this;

			return (instance.get(BUILDER).dropContainer || instance.get(BOUNDING_BOX).get(PARENT_NODE));
		},

		_uiSetXY : function(val) {
			var instance = this;
			var containerXY = instance._getContainer().getXY();

            this._posNode.setXY([ val[0] + containerXY[0], val[1] + containerXY[1] ]);
        }
	}
});

DiagramNode.buildNodeId = function(id) {
	return DIAGRAM_NODE + _DOLLAR + FIELD + _DOLLAR + id;
};

A.DiagramNode = DiagramNode;

A.DiagramBuilder.types['node'] = A.DiagramNode;

}, '@VERSION@' ,{requires:['aui-diagram-builder-base','overlay'], skinnable:true});


AUI.add('aui-diagram-builder', function(A){}, '@VERSION@' ,{use:['aui-diagram-builder-base','aui-diagram-builder-impl'], skinnable:true});

