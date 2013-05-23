/**
 * The Diagram Builder Base
 *
 * @module aui-diagram-builder
 * @submodule aui-diagram-builder-base
 */

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
	CLOSE = 'close',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	CONTENT_CONTAINER = 'contentContainer',
	CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
	DIAGRAM = 'diagram',
	DIAGRAM_BUILDER = 'diagram-builder',
	DRAGGABLE = 'draggable',
	DROP = 'drop',
	DROP_CONFIG = 'dropConfig',
	DROP_CONTAINER = 'dropContainer',
	FIELD = 'field',
	FIELDS = 'fields',
	FIELDS_CONTAINER = 'fieldsContainer',
	HEIGHT = 'height',
	ICON = 'icon',
	ICON_CLASS = 'iconClass',
	ID = 'id',
	LABEL = 'label',
	LAYOUT = 'layout',
	MAX_FIELDS = 'maxFields',
	NODE = 'node',
	PARENT_NODE = 'parentNode',
	PROPERTY_LIST = 'propertyList',
	RENDERED = 'rendered',
	SAVE = 'save',
	STRIPED = 'striped',
	SETTINGS = 'settings',
	TAB_VIEW = 'tabView',
	TABBABLE = 'tabbable',
	TABLE = 'table',
	TABS = 'tabs',
	TITLE = 'title',
	TOOLBAR = 'toolbar',
	TOOLBAR_CONTAINER = 'toolbarContainer',

	AgetClassName = A.getClassName,

	_DOT = '.',
	_HASH = '#',
	_SPACE = ' ',
	_UNDERLINE = '_',

	CSS_CLEARFIX = AgetClassName(CLEARFIX),
	CSS_DIAGRAM_BUILDER_CANVAS = AgetClassName(DIAGRAM, BUILDER, CANVAS),
	CSS_DIAGRAM_BUILDER_CONTENT_CONTAINER = AgetClassName(DIAGRAM, BUILDER, CONTENT, CONTAINER),
	CSS_DIAGRAM_BUILDER_DROP_CONTAINER = AgetClassName(DIAGRAM, BUILDER, DROP, CONTAINER),
	CSS_DIAGRAM_BUILDER_FIELD = AgetClassName(DIAGRAM, BUILDER, FIELD),
	CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE = AgetClassName(DIAGRAM, BUILDER, FIELD, DRAGGABLE),
	CSS_DIAGRAM_BUILDER_FIELD_ICON = AgetClassName(DIAGRAM, BUILDER, FIELD, ICON),
	CSS_DIAGRAM_BUILDER_FIELD_LABEL = AgetClassName(DIAGRAM, BUILDER, FIELD, LABEL),
	CSS_DIAGRAM_BUILDER_FIELDS_CONTAINER = AgetClassName(DIAGRAM, BUILDER, FIELDS, CONTAINER),
	CSS_DIAGRAM_BUILDER_TABS = AgetClassName(DIAGRAM, BUILDER, TABS),
	CSS_DIAGRAM_BUILDER_TOOLBAR_CONTAINER = AgetClassName(DIAGRAM, BUILDER, TOOLBAR, CONTAINER),
	CSS_ICON = AgetClassName(ICON),
	CSS_LAYOUT = AgetClassName(LAYOUT),
	CSS_TABBABLE = AgetClassName(TABBABLE),
	CSS_TABBABLE_CONTENT = AgetClassName(TABBABLE, CONTENT),
	CSS_TABLE_STRIPED = AgetClassName(TABLE, STRIPED);

/**
 * A base class for AvailableField.
 *
 * @class A.AvailableField
 * @extends A.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var AvailableField = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property AvailableField.NAME
	 * @type String
	 * @static
	 */
	NAME: AVAILABLE_FIELD,

	/**
	 * Static property used to define the default attribute
	 * configuration for the AvailableField.
	 *
	 * @property AvailableField.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute draggable
		 * @default true
		 * @type Boolean
		 */
		draggable: {
			value: true,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute label
		 * @type String
		 */
		label: {
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute iconClass
		 * @type String
		 */
		iconClass: {
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute id
		 * @type String
		 */
		id: {
			value: A.guid(),
			setter: '_setId',
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute node
		 * @type Node
		 * @writeOnce
		 */
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
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property AvailableField.EXTENDS
	 * @type String
	 * @static
	 */
	EXTENDS: A.Base,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method buildNodeId
	 * @param id
     * @private
	 */
	buildNodeId: function(id) {
		return AVAILABLE_FIELDS + _UNDERLINE + FIELD + _UNDERLINE + id;
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method getAvailableFieldById
	 * @param id
     * @private
	 */
	getAvailableFieldById: function(id) {
		return A.AvailableField.getAvailableFieldByNode(_HASH+A.AvailableField.buildNodeId(id));
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method getAvailableFieldById
	 * @param node
     * @private
	 */
	getAvailableFieldByNode: function(node) {
		node = A.one(node);

		if (isNode(node)) {
			return node.getData(AVAILABLE_FIELD);
		}

		return null;
	},

	prototype: {
		FIELD_ITEM_TEMPLATE: '<li class="' + CSS_DIAGRAM_BUILDER_FIELD + '">' +
									'<span class="' + [ CSS_ICON, CSS_DIAGRAM_BUILDER_FIELD_ICON ].join(_SPACE) + ' {iconClass}"></span>' +
									'<div class="' + CSS_DIAGRAM_BUILDER_FIELD_LABEL + '"></div>' +
								'</li>',

		/**
		 * Construction logic executed during AvailableField instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterDraggableChange
		 * @param event
		 * @protected
		 */
		_afterDraggableChange: function(event) {
			var instance = this;

			instance._uiSetDraggable(
				event.newVal
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterIdChange
		 * @param event
		 * @protected
		 */
		_afterIdChange: function(event) {
			var instance = this;

			instance._uiSetId(
				event.newVal
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterLabelChange
		 * @param event
		 * @protected
		 */
		_afterLabelChange: function(event) {
			var instance = this;

			instance._uiSetLabel(
				event.newVal
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setId
		 * @param val
		 * @protected
		 */
		_setId: function(val) {
			return A.AvailableField.buildNodeId(val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetDraggable
		 * @param val
		 * @protected
		 */
		_uiSetDraggable: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE, val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetId
		 * @param val
		 * @protected
		 */
		_uiSetId: function(val) {
			var instance = this;

			instance.get(NODE).set(ID, val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetLabel
		 * @param val
		 * @protected
		 */
		_uiSetLabel: function(val) {
			var instance = this;

			instance.get(NODE).attr(TITLE, val);
			instance.labelNode.setContent(val);
		}
	}
});

A.AvailableField = AvailableField;

/**
 * A base class for FieldSupport.
 *
 * @class A.FieldSupport
 * @constructor
 */
var FieldSupport = function() {
};

/**
 * Static property used to define the default attribute
 * configuration for the FieldSupport.
 *
 * @property FieldSupport.ATTRS
 * @type Object
 * @static
 */
FieldSupport.ATTRS = {

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @attribute fields
	 * @default []
	 * @type Array
	 */
	fields: {
		value: [],
		setter: '_setFields',
		validator: function(val) {
			return isArray(val) || isArrayList(val);
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @attribute maxFields
	 * @default Infinity
	 * @type Number
	 */
	maxFields: {
		value: Infinity,
		validator: isNumber
	}
};

A.mix(FieldSupport.prototype, {

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _setFields
	 * @param val
	 * @protected
	 */
	_setFields: function(val) {
		var instance = this;

		if (isArrayList(val)) {
			return val;
		}
		else {
			return instance.createFields(val);
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _updateFields
	 * @param fields
	 * @protected
	 */
	_updateFields: function(fields) {
		var instance = this;

		instance.set(FIELDS, fields);
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method addField
	 * @param field
	 * @param index
	 */
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

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method createFields
	 * @param val
	 */
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

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method removeField
	 * @param field
	 */
	removeField: function(field) {
		var instance = this;

		instance._updateFields(
			instance.get(FIELDS).remove(field)
		);
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * NOTE FOR DEVELOPERS: Yoy *may* want to replace the
	 * methods from this section on your implementation.
	 *
	 * @method createField
	 * @param val
	 */
	createField: function(val) {
		return val;
	}
});

A.FieldSupport = FieldSupport;
// A.FieldSupport = A.Base.create('field-support', A.Base, [FieldSupport]);

/**
 * A base class for DiagramBuilderBase.
 *
 * @class A.DiagramBuilderBase
 * @extends A.Component
 * @uses A.FieldSupport
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var DiagramBuilderBase = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property DiagramBuilderBase.NAME
		 * @type String
		 * @static
		 */
		NAME: DIAGRAM_BUILDER,

		/**
		 * Static property used to define the default attribute
		 * configuration for the DiagramBuilderBase.
		 *
		 * @property DiagramBuilderBase.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute availableFields
			 * @type Array
			 */
			availableFields: {
				setter: '_setAvailableFields',
				validator: isArray
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute availableFieldsDragConfig
			 * @type null
			 * @type Object
			 */
			availableFieldsDragConfig: {
				value: null,
				setter: '_setAvailableFieldsDragConfig',
				validator: isObject
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute canvas
			 */
			canvas: {
				valueFn: function() {
					return A.Node.create(this.CANVAS_TEMPLATE);
				}
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute dropConfig
			 * @default null
			 * @type Object
			 */
			dropConfig: {
				value: null,
				setter: '_setDropConfig',
				validator: isObject
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute contentContainer
			 */
			contentContainer: {
				valueFn: function() {
					return A.Node.create(this.CONTENT_CONTAINER_TEMPLATE);
				}
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute dropContainer
			 */
			dropContainer: {
				valueFn: function() {
					return A.Node.create(this.DROP_CONTAINER_TEMPLATE);
				}
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute fieldsContainer
			 */
			fieldsContainer: {
				valueFn: function() {
					return A.Node.create(this.FIELDS_CONTAINER_TEMPLATE);
				}
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute propertyList
			 * @default null
			 * @type Object
			 */
			propertyList: {
				setter: '_setPropertyList',
				validator: isObject,
				value: null
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
					propertyName: 'Property Name',
					save: 'Save',
					settings: 'Settings',
					value: 'Value'
				}
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute tabView
			 * @default null
			 * @type Object
			 * @writeOnce
			 */
			tabView: {
				setter: '_setTabView',
				validator: isObject,
				value: null,
				writeOnce: true
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute toolbar
			 * @default null
			 * @type Object
			 */
			toolbar: {
				setter: '_setToolbar',
				validator: isObject,
				value: null
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @attribute toolbarContainer
			 */
			toolbarContainer: {
				valueFn: function() {
					return A.Node.create(this.TOOLBAR_CONTAINER_TEMPLATE);
				}
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @property DiagramBuilderBase.HTML_PARSER
		 * @type Object
		 * @static
		 */
		HTML_PARSER: {
			contentContainer: _DOT+CSS_DIAGRAM_BUILDER_CONTENT_CONTAINER,
			dropContainer: _DOT+CSS_DIAGRAM_BUILDER_DROP_CONTAINER,
			fieldsContainer: _DOT+CSS_DIAGRAM_BUILDER_FIELDS_CONTAINER,
			toolbarContainer: _DOT+CSS_DIAGRAM_BUILDER_TOOLBAR_CONTAINER,
			canvas: _DOT+CSS_DIAGRAM_BUILDER_CANVAS
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @property DiagramBuilderBase.UI_ATTRS
		 * @type Array
		 * @static
		 */
		UI_ATTRS: [AVAILABLE_FIELDS, FIELDS],

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @property DiagramBuilderBase.AUGMENTS
		 * @type Array
		 * @static
		 */
		AUGMENTS: [A.FieldSupport],

		prototype: {
			CANVAS_TEMPLATE: '<div tabindex="1" class="' + CSS_DIAGRAM_BUILDER_CANVAS + '"></div>',
			CONTENT_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_CONTENT_CONTAINER + '"></div>',
			DROP_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_DROP_CONTAINER + '"></div>',
			FIELDS_CONTAINER_TEMPLATE: '<ul class="' + [CSS_DIAGRAM_BUILDER_FIELDS_CONTAINER, CSS_CLEARFIX].join(_SPACE) + '"></ul>',
			TOOLBAR_CONTAINER_TEMPLATE: '<div class="' + CSS_DIAGRAM_BUILDER_TOOLBAR_CONTAINER + '"></div>',

			fieldsNode: null,
			propertyList: null,
			settingsNode: null,
			tabView: null,
			toolbar: null,

			/**
			 * Construction logic executed during DiagramBuilderBase instantiation. Lifecycle.
			 *
			 * @method initializer
			 * @protected
			 */
			initializer: function() {
				var instance = this;

				instance.publish({
					cancel: {
						defaultFn: instance._defCancelFn
					}
				});

				instance.after({
					render: instance._afterRender,
					'model:change': instance._afterModelChange
				});

				instance.after(instance._afterUiSetHeight, instance, '_uiSetHeight');

				instance.canvas = instance.get(CANVAS);
				instance.contentContainer = instance.get(CONTENT_CONTAINER);
				instance.dropContainer = instance.get(DROP_CONTAINER);
				instance.fieldsContainer = instance.get(FIELDS_CONTAINER);
				instance.toolbarContainer = instance.get(TOOLBAR_CONTAINER);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method isAvailableFieldsDrag
			 * @param drag
			 */
			isAvailableFieldsDrag: function(drag) {
				var instance = this;
				var availableFieldsDrag = instance.availableFieldsDrag;

				return (drag === availableFieldsDrag.dd);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method plotFields
			 */
			plotFields: function() {
				var instance = this;
				var fields = instance.get(FIELDS);

				fields.each(function(field) {
					instance.plotField(field);
				});
			},

			/**
			 * Render the DiagramBuilderBase component instance. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				var instance = this;

				instance._renderTabs();
				instance._renderCanvas();

				instance._uiSetAvailableFields(
					instance.get(AVAILABLE_FIELDS)
				);
			},

			/**
			 * Sync the DiagramBuilderBase UI. Lifecycle.
			 *
			 * @method syncUI
			 * @protected
			 */
			syncUI: function() {
				var instance = this;
				var contentBox = instance.get(CONTENT_BOX);

				instance._setupDrop();
				instance._setupAvailableFieldsDrag();

				contentBox.addClass(CSS_LAYOUT);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _afterModelChange
			 * @param event
			 * @protected
			 */
			_afterModelChange: function(event) {
				var instance = this;

				instance._handleSaveEvent();
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

				instance.plotFields();
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _afterSelectionChange
			 * @param event
			 * @protected
			 */
			_afterSelectionChange: function(event) {
				var instance = this,
					tabview = event.newVal,
					tabNode;

				if (tabview) {
					tabNode = tabview.get('panelNode');

					if (instance.get(RENDERED) && (tabNode === instance.settingsNode)) {
						instance._renderSettings();
					}
				}
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _afterUiSetHeight
			 * @param val
			 * @protected
			 */
			_afterUiSetHeight: function(val) {
				var instance = this;

				instance.contentContainer.setStyle(HEIGHT, isNumber(val) ? val + instance.DEF_UNIT : val);
				instance.dropContainer.setStyle(HEIGHT, isNumber(val) ? val + instance.DEF_UNIT : val);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _defCancelFn
			 * @param event
			 * @protected
			 */
			_defCancelFn: function(event) {
				var instance = this;

				instance.tabView.selectChild(0);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _handleCancelEvent
			 * @protected
			 */
			_handleCancelEvent: function() {
				var instance = this;

				instance.fire(CANCEL);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _handleSaveEvent
			 * @protected
			 */
			_handleSaveEvent: function() {
				var instance = this;

				instance.fire(SAVE);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _renderCanvas
			 * @protected
			 */
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

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _renderPropertyList
			 * @protected
			 */
			_renderPropertyList: function() {
				var instance = this;

				if (!instance.propertyList) {
					var propertyList = instance.propertyList = new A.PropertyList(instance.get(PROPERTY_LIST));

					propertyList.render(instance.settingsNode);

					propertyList.get(BOUNDING_BOX).unselectable().addClass(CSS_TABLE_STRIPED);
				}
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _renderSettings
			 * @protected
			 */
			_renderSettings: function() {
				var instance = this;

				instance._renderPropertyList();

				instance._renderToolbar();
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _renderTabs
			 * @protected
			 */
			_renderTabs: function() {
				var instance = this;

				if (!instance.tabView) {
					var tabView = new A.TabView(instance.get(TAB_VIEW));

					instance.tabView = tabView;
					instance.fieldsNode = tabView.item(0).get('panelNode');
					instance.settingsNode = tabView.item(1).get('panelNode');
				}
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _renderToolbar
			 * @protected
			 */
			_renderToolbar: function() {
				var instance = this;

				if (!instance.toolbar) {
					instance.toolbar = new A.Toolbar(
						instance.get(TOOLBAR)
					)
					.render(instance.settingsNode);
				}
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _setupDrop
			 * @protected
			 */
			_setupDrop: function() {
				var instance = this;

				instance.drop = new A.DD.Drop(
					instance.get(DROP_CONFIG)
				);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _setupAvailableFieldsDrag
			 * @protected
			 */
			_setupAvailableFieldsDrag: function() {
				var instance = this;

				instance.availableFieldsDrag = new A.DD.Delegate(
					instance.get(AVAILABLE_FIELDS_DRAG_CONFIG)
				);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _setAvailableFields
			 * @param val
			 * @protected
			 */
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

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _setDropConfig
			 * @param val
			 * @protected
			 */
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

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _setAvailableFieldsDragConfig
			 * @param val
			 * @protected
			 */
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

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _setPropertyList
			 * @param val
			 * @protected
			 */
			_setPropertyList: function(val) {
				var instance = this;

				return A.merge(
					{
						bubbleTargets: instance,
						width: 260,
						scroll: {
							height: 400,
							width: AUTO
						}
					},
					val
				);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _setTabView
			 * @param val
			 * @protected
			 */
			_setTabView: function(val) {
				var instance = this,
					boundingBox = instance.get(BOUNDING_BOX),
					tabViewContentNode = boundingBox.one(_DOT+CSS_TABBABLE_CONTENT);

					defaultValue = {
						after: {
							selectionChange: A.bind(instance._afterSelectionChange, instance)
						},
						boundingBox: boundingBox.one(_DOT+CSS_TABBABLE),
						bubbleTargets: instance,
						cssClass: CSS_DIAGRAM_BUILDER_TABS,
						render: instance.get(CONTENT_BOX),
						srcNode: tabViewContentNode
					};

				if (!tabViewContentNode) {
					var strings = instance.getStrings();

					defaultValue.children = [
						{ label: strings[ADD_NODE] },
						{ label: strings[SETTINGS] }
					];
				}

				return A.merge(defaultValue, val);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _setToolbar
			 * @param val
			 * @protected
			 */
			_setToolbar: function(val) {
				var instance = this;
				var strings = instance.getStrings();

				return A.merge(
					{
						bubbleTargets: instance,
						children: [
							{
								on: {
									click: A.bind(instance._handleCancelEvent, instance)
								},
								label: strings[CLOSE]
							}
						]
					},
					val
				);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _uiSetAvailableFields
			 * @param val
			 * @protected
			 */
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

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method _uiSetFields
			 * @param event
			 * @protected
			 */
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