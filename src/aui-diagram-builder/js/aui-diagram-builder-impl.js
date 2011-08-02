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