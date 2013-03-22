var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isObject = L.isObject,
	isString = L.isString,

	AArray = A.Array,

	getAvailableFieldById = A.AvailableField.getAvailableFieldById,

	isAvailableField = function(v) {
		return (v instanceof A.AvailableField);
	},

	isFormBuilderField = function(v) {
		return (v instanceof A.FormBuilderField);
	},

	ADD = 'add',
	ALLOW_REMOVE_REQUIRED_FIELDS = 'allowRemoveRequiredFields',
	ATTRIBUTE_NAME = 'attributeName',
	AVAILABLE_FIELD = 'availableField',
	AVAILABLE_FIELDS = 'availableFields',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	DATA = 'data',
	DD = 'dd',
	DIAGRAM = 'diagram',
	DRAGGABLE = 'draggable',
	DRAGGING = 'dragging',
	DROP = 'drop',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FIELDS_SORTABLE_LIST_CONFIG = 'fieldsSortableListConfig',
	FOCUSED = 'focused',
	FORM = 'form',
	FORM_BUILDER = 'form-builder',
	HIDDEN_ATTRIBUTES = 'hiddenAttributes',
	ID = 'id',
	LABEL = 'label',
	LOCALIZATION_MAP = 'localizationMap',
	NAME = 'name',
	NODE = 'node',
	OPTIONS = 'options',
	PARENT = 'parent',
	PARENT_NODE = 'parentNode',
	PLACEHOLDER = 'placeholder',
	PREDEFINED_VALUE = 'predefinedValue',
	READ_ONLY_ATTRIBUTES = 'readOnlyAttributes',
	REMOVE = 'remove',
	RENDERED = 'rendered',
	REQUIRED = 'required',
	SHOW_LABEL = 'showLabel',
	TIP = 'tip',
	TYPE = 'type',
	UNIQUE = 'unique',
	VALUE = 'value',
	WIDTH = 'width',
	HOVER = 'hover',
	ZONE = 'zone',

	_DOT = '.',
	_EMPTY_STR = '',
	_UNDERLINE = '_',

	getCN = A.getClassName,

	AVAILABLE_FIELDS_ID_PREFIX = AVAILABLE_FIELDS + _UNDERLINE + FIELD + _UNDERLINE,
	FIELDS_ID_PREFIX = FIELDS + _UNDERLINE + FIELD + _UNDERLINE,

	CSS_DD_DRAGGING = getCN(DD, DRAGGING),
	CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE = getCN(DIAGRAM, BUILDER, FIELD, DRAGGABLE),
	CSS_FIELD_HOVER = getCN(FORM, BUILDER, FIELD, HOVER),
	CSS_FORM_BUILDER_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM, BUILDER, FIELD),
	CSS_FORM_BUILDER_PLACEHOLDER = getCN(FORM, BUILDER, PLACEHOLDER),

	INVALID_CLONE_ATTRS = [ID, NAME],

	TPL_PLACEHOLDER = '<div class="' + CSS_FORM_BUILDER_PLACEHOLDER + '"></div>';

var FormBuilderAvailableField = A.Component.create({
	NAME: AVAILABLE_FIELD,

	ATTRS: {
		hiddenAttributes: {
			validator: isArray
		},

		name: {
		},

		options: {
			validator: isObject
		},

		predefinedValue: {
		},

		readOnlyAttributes: {
			validator: isArray
		},

		required: {
			validator: isBoolean
		},

		showLabel: {
			validator: isBoolean,
			value: true
		},

		tip: {
			validator: isString
		},

		unique: {
			validator: isBoolean
		},

		width: {
		}
	},

	EXTENDS: A.AvailableField
});

A.FormBuilderAvailableField = FormBuilderAvailableField;

var FormBuilder = A.Component.create({

	NAME: FORM_BUILDER,

	ATTRS: {
		allowRemoveRequiredFields: {
			validator: isBoolean,
			value: false
		},

		enableEditing: {
			value: true
		},

		fieldsSortableListConfig: {
			setter: '_setFieldsSortableListConfig',
			validator: isObject,
			value: null
		},

		strings: {
			value: {
				addNode: 'Add field',
				cancel: 'Cancel',
				propertyName: 'Property Name',
				save: 'Save',
				settings: 'Settings',
				value: 'Value'
			}
		}

	},

	UI_ATTRS: [ALLOW_REMOVE_REQUIRED_FIELDS],

	EXTENDS: A.DiagramBuilderBase,

	FIELDS_TAB: 0,
	SETTINGS_TAB: 1,

	prototype: {

		uniqueFieldsMap: new A.Map(),

		initializer: function() {
			var instance = this;

			instance.on({
				cancel: instance._onCancel,
				'drag:end': instance._onDragEnd,
				'drag:start': instance._onDragStart,
				'drag:mouseDown': instance._onDragMouseDown,
				save: instance._onSave
			});

			instance.uniqueFieldsMap.after(ADD, A.bind(instance._afterUniqueFieldsMapAdd, instance));
			instance.uniqueFieldsMap.after(REMOVE, A.bind(instance._afterUniqueFieldsMapRemove, instance));

			instance.dropContainer.delegate('click', A.bind(instance._onClickField, instance), _DOT+CSS_FORM_BUILDER_FIELD);
			instance.dropContainer.delegate('focus', A.bind(instance._onFocusField, instance), _DOT+CSS_FORM_BUILDER_FIELD);
			instance.dropContainer.delegate('mouseover', A.bind(instance._onMouseOverField, instance), _DOT+CSS_FORM_BUILDER_FIELD);
			instance.dropContainer.delegate('mouseout', A.bind(instance._onMouseOutField, instance), _DOT+CSS_FORM_BUILDER_FIELD);
		},

		syncUI: function() {
			var instance = this;

			instance._setupAvailableFieldsSortableList();
			instance._setupFieldsSortableList();
		},

		closeEditProperties: function() {
			var instance = this,
				field = instance.editingField;

			instance.tabView.selectChild(A.FormBuilder.FIELDS_TAB);

			instance.editingField = null;
		},

		createField: function(val) {
			var instance = this;

			if (isFormBuilderField(val)) {
				val.set(BUILDER, instance);
				val.set(PARENT, instance);
			}
			else {
				val.builder = instance;
				val.parent = instance;

				val = new (instance.getFieldClass(val.type || FIELD))(val);
			}

			return val;
		},

		duplicateField: function(field) {
			var instance = this,
				index = instance._getFieldNodeIndex(field.get(BOUNDING_BOX)),
				newField = instance._cloneField(field, true);

			instance.insertField(newField, ++index, field.get(PARENT));
		},

		editField: function(field) {
			var instance = this;

			if (isFormBuilderField(field)) {
				instance.closeEditProperties();

				instance.simulateDocFocusField(field);

				instance.tabView.selectChild(A.FormBuilder.SETTINGS_TAB);

				instance.propertyList.set(DATA, instance.getFieldProperties(field));

				instance.editingField = field;
			}
		},

		getFieldClass: function(type) {
			var instance = this,
				clazz = A.FormBuilder.types[type];

			if (clazz) {
				return clazz;
			}
			else {
				A.log('The field type: [' + type + '] couldn\'t be found.');

				return null;
			}
		},

		getFieldProperties: function(field) {
			var instance = this;

			return field.getProperties();
		},

		insertField: function(field, index, parent) {
			var instance = this;

			parent = parent || instance;

			// remove from previous parent
			field.get(PARENT).removeField(field);

			parent.addField(field, index);
		},

		plotField: function(field, container) {
			var instance = this,
				boundingBox = field.get(BOUNDING_BOX);

			if (!field.get(RENDERED)) {
				field.render(container);
			}
			else {
				container.append(boundingBox);
			}

			instance._syncUniqueField(field);

			instance.fieldsSortableList.add(boundingBox);
		},

		plotFields: function(fields, container) {
			var instance = this;

			container = container || instance.dropContainer;
			fields = fields || instance.get(FIELDS);

			container.setContent(EMPTY_STR);

			A.each(fields, function(field) {
				instance.plotField(field, container);
			});
		},

		simulateDocFocusField: function(field) {
			var instance = this;

			if (!field.get(FOCUSED)) {
				field._onDocFocus({
					target: field.get(BOUNDING_BOX)
				});
			}
		},

		_afterUniqueFieldsMapAdd: function(event) {
			var instance = this,
				availableField = getAvailableFieldById(event.attrName),
				node;

			if (isAvailableField(availableField)) {
				node = availableField.get(NODE);

				availableField.set(DRAGGABLE, false);
				node.unselectable();
			}
		},

		_afterUniqueFieldsMapRemove: function(event) {
			var instance = this,
				availableField = getAvailableFieldById(event.attrName),
				node;

			if (isAvailableField(availableField)) {
				node = availableField.get(NODE);

				availableField.set(DRAGGABLE, true);
				node.selectable();
			}
		},

		_cloneField: function(field, deep) {
			var instance = this,
				config  = {};

			AArray.each(instance.getFieldProperties(field), function(property) {
				var name = property.attributeName;

				if (AArray.indexOf(INVALID_CLONE_ATTRS, name) === -1) {
					config[name] = property.value;
				}
			});

			if (deep) {
				config[FIELDS] = [];

				A.each(field.get(FIELDS), function(child, index) {
					if (!child.get(UNIQUE)) {
						config[FIELDS][index] = instance._cloneField(child, deep);
					}
				});
			}

			return instance.createField(config);
		},

		_dropField: function(dragNode) {
			var instance = this,
				availableField = dragNode.getData(AVAILABLE_FIELD),
				field = A.Widget.getByNode(dragNode);

			if (isAvailableField(availableField)) {
				var config = {
					hiddenAttributes: availableField.get(HIDDEN_ATTRIBUTES),
					label: availableField.get(LABEL),
					localizationMap: availableField.get(LOCALIZATION_MAP),
					options: availableField.get(OPTIONS),
					predefinedValue: availableField.get(PREDEFINED_VALUE),
					readOnlyAttributes: availableField.get(READ_ONLY_ATTRIBUTES),
					required: availableField.get(REQUIRED),
					showLabel: availableField.get(SHOW_LABEL),
					tip: availableField.get(TIP),
					type: availableField.get(TYPE),
					unique: availableField.get(UNIQUE),
					width: availableField.get(WIDTH)
				};

				if (config.unique) {
					config.id = instance._getFieldId(availableField);
					config.name = availableField.get(NAME);
				}

				field = instance.createField(config);
			}

			if (isFormBuilderField(field)){
				var parentNode = dragNode.get(PARENT_NODE),
					dropField = A.Widget.getByNode(parentNode),
					index = instance._getFieldNodeIndex(dragNode);

				if (!isFormBuilderField(dropField)) {
					dropField = instance;
				}

				instance.insertField(field, index, dropField);
			}
		},

		_getFieldId: function(field) {
			var instance = this,
				id = field.get(ID),
				prefix;

			if (isAvailableField(field)) {
				prefix = AVAILABLE_FIELDS_ID_PREFIX;
			}
			else {
				prefix = FIELDS_ID_PREFIX;
			}

			return id.replace(prefix, _EMPTY_STR);
		},

		_getFieldNodeIndex: function(fieldNode) {
			var instance = this;

			return fieldNode.get(PARENT_NODE).all(
				// prevent the placeholder interference on the index
				// calculation
				'> *:not(' + _DOT+CSS_FORM_BUILDER_PLACEHOLDER + ')'
			).indexOf(fieldNode);
		},

		_onDragEnd: function(event) {
			var instance = this,
				drag = event.target,
				dragNode = drag.get(NODE);

			instance._dropField(dragNode);

			// skip already instanciated fields
			if (!isFormBuilderField(A.Widget.getByNode(dragNode))) {
				dragNode.remove();

				drag.set(NODE, instance._originalDragNode);
			}
		},

		_onClickField: function(event) {
			var instance = this;

			instance._handleEditField(event);

			event.stopPropagation();
		},

		_onFocusField: function(event) {
			var instance = this;

			instance._handleEditField(event);

			event.stopPropagation();
		},

		_handleEditField: function(event) {
			var instance = this,
				target = event.target,
				field = A.Widget.getByNode(target),
				boundingBox = field.get('boundingBox'),
				contentBox = field.get('contentBox');

			// Clicks outside contentBox should not focus the field, e.g. clicking
			// a toolbar icon rendered on the boundingBox should not focus anything.
			if (boundingBox.compareTo(target) || contentBox.contains(target, true)) {
				console.log('EDIT');
				instance.editField(field);
			}
		},

		_onDragMouseDown: function(event) {
			var instance = this,
				dragNode = event.target.get(NODE),
				availableField = A.AvailableField.getAvailableFieldByNode(dragNode);

			if (isAvailableField(availableField) && !availableField.get(DRAGGABLE)) {
				event.halt();
			}
		},

		_onDragStart: function(event) {
			var instance = this,
				drag = event.target,
				dragNode = drag.get(NODE);

			// skip already instanciated fields
			if (isFormBuilderField(A.Widget.getByNode(dragNode))) {
				return;
			}

			// in the dragEnd we`re going to restore the drag node
			// to the original node
			instance._originalDragNode = dragNode;

			var clonedDragNode = dragNode.clone();
			dragNode.placeBefore(clonedDragNode);

			drag.set(NODE, clonedDragNode);

			var availableFieldData = dragNode.getData(AVAILABLE_FIELD);
			clonedDragNode.setData(AVAILABLE_FIELD, availableFieldData);

			clonedDragNode.attr(ID, EMPTY_STR);
			clonedDragNode.hide();

			dragNode.removeClass(CSS_DD_DRAGGING);
			dragNode.show();

			instance.fieldsSortableList.add(clonedDragNode);
		},

		_onMouseOutField: function(event) {
			var instance = this,
				field = A.Widget.getByNode(event.currentTarget);

			field.controlsToolbar.hide();
			field.get(BOUNDING_BOX).removeClass(CSS_FIELD_HOVER);

			event.stopPropagation();
		},

		_onMouseOverField: function(event) {
			var instance = this,
				field = A.Widget.getByNode(event.currentTarget);

			field.controlsToolbar.show();
			field.get(BOUNDING_BOX).addClass(CSS_FIELD_HOVER);

			event.stopPropagation();
		},

		_onSave: function(event) {
			var instance = this,
				editingField = instance.editingField;

			if (editingField) {
				var modelList = instance.propertyList.get(DATA);

				modelList.each(function(model) {
					editingField.set(model.get(ATTRIBUTE_NAME), model.get(VALUE));
				});

				instance._syncUniqueField(editingField);
			}
		},

		_setAvailableFields: function(val) {
			var instance = this,
				fields = [];

			AArray.each(val, function(field, index) {
				fields.push(
					isAvailableField(field) ? field : new A.FormBuilderAvailableField(field)
				);
			});

			return fields;
		},

		_setFieldsSortableListConfig: function(val) {
			var instance = this,
				dropContainer = instance.dropContainer;

			return A.merge(
				{
					bubbleTargets: instance,
					dd: {
						groups: [AVAILABLE_FIELDS],
						plugins: [
							{
								cfg: {
									horizontal: false,
									scrollDelay: 150
								},
								fn: A.Plugin.DDWinScroll
							}
						]
					},
					dropCondition: function(event) {
						var dropNode = event.drop.get(NODE),
							field = A.Widget.getByNode(dropNode);

						if (isFormBuilderField(field)) {
							return true;
						}

						return false;
					},
					placeholder: A.Node.create(TPL_PLACEHOLDER),
					dropOn: _DOT + CSS_FORM_BUILDER_DROP_ZONE,
					sortCondition: function(event) {
						var dropNode = event.drop.get(NODE);

						return (dropNode !== instance.dropContainer &&
								dropContainer.contains(dropNode));
					}
				},
				val || {}
			);
		},

		_setupAvailableFieldsSortableList: function() {
			var instance = this;

			if (!instance.availableFieldsSortableList) {
				var availableFieldsNodes = instance.fieldsContainer.all(
					_DOT+CSS_DIAGRAM_BUILDER_FIELD_DRAGGABLE
				);

				instance.availableFieldsSortableList = new A.SortableList(
					A.merge(
						instance.get(FIELDS_SORTABLE_LIST_CONFIG),
						{
							nodes: availableFieldsNodes
						}
					)
				);
			}
		},

		_setupFieldsSortableList: function() {
			var instance = this;

			if (!instance.fieldsSortableList) {
				instance.fieldsSortableList = new A.SortableList(
					instance.get(FIELDS_SORTABLE_LIST_CONFIG)
				);
			}
		},

		_syncUniqueField: function(field) {
			var instance = this,
				fieldId = instance._getFieldId(field),
				availableField = getAvailableFieldById(fieldId);

			if (isAvailableField(availableField)) {
				if (availableField.get(UNIQUE) || field.get(UNIQUE)) {
					instance.uniqueFieldsMap.put(fieldId, field);
				}
			}
		},

		_uiSetAllowRemoveRequiredFields: function(val) {
			var instance = this;

			instance.get(FIELDS).each(function(field) {
				field._uiSetRequired(field.get(REQUIRED));
			});
		}
	}

});

A.FormBuilder = FormBuilder;

A.FormBuilder.types = {};