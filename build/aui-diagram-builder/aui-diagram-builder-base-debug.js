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
