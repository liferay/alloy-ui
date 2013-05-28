/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-base
 */

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
	FORM = 'form',
	FORM_BUILDER = 'form-builder',
	HIDDEN_ATTRIBUTES = 'hiddenAttributes',
	ID = 'id',
	LABEL = 'label',
	LOCALIZATION_MAP = 'localizationMap',
	NAME = 'name',
	NODE = 'node',
	OPACITY = 'opacity',
	OPTIONS = 'options',
	PARENT = 'parent',
	PARENT_NODE = 'parentNode',
	PLACEHOLDER = 'placeholder',
	PREDEFINED_VALUE = 'predefinedValue',
	READ_ONLY_ATTRIBUTES = 'readOnlyAttributes',
	RENDERED = 'rendered',
	REQUIRED = 'required',
	SELECTED = 'selected',
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

/**
 * A base class for FormBuilderAvailableField.
 *
 * @class A.FormBuilderAvailableField
 * @extends A.AvailableField
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */

var FormBuilderAvailableField = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property FormBuilderAvailableField.NAME
	 * @type String
	 * @static
	 */
	NAME: AVAILABLE_FIELD,

	/**
	 * Static property used to define the default attribute
	 * configuration for the ModuleName.
	 *
	 * @property FormBuilderAvailableField.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute hiddenAttributes
		 * @type Array
		 */
		hiddenAttributes: {
			validator: isArray
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute name
		 */
		name: {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute options
		 * @type Object
		 */
		options: {
			validator: isObject
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute predefinedValue
		 */
		predefinedValue: {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute readOnlyAttributes
		 * @type Array
		 */
		readOnlyAttributes: {
			validator: isArray
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute required
		 * @type Boolean
		 */
		required: {
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute showLabel
		 * @default true
		 * @type Boolean
		 */
		showLabel: {
			validator: isBoolean,
			value: true
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute tip
		 * @type String
		 */
		tip: {
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute unique
		 * @type Boolean
		 */
		unique: {
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute width
		 */
		width: {
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property FormBuilderAvailableField.EXTENDS
	 * @type String
	 * @static
	 */
	EXTENDS: A.AvailableField
});

A.FormBuilderAvailableField = FormBuilderAvailableField;

/**
 * A base class for FormBuilder.
 *
 * @class A.FormBuilder
 * @extends A.DiagramBuilderBase
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var FormBuilder = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property FormBuilder.NAME
	 * @type String
	 * @static
	 */
	NAME: FORM_BUILDER,

	/**
	 * Static property used to define the default attribute
	 * configuration for the FormBuilder.
	 *
	 * @property FormBuilder.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute allowRemoveRequiredFields
		 * @default false
		 * @type Boolean
		 */
		allowRemoveRequiredFields: {
			validator: isBoolean,
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute enableEditing
		 * @default true
		 * @type Boolean
		 */
		enableEditing: {
			value: true
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute fieldsSortableListConfig
		 * @default null
		 * @type Object
		 */
		fieldsSortableListConfig: {
			setter: '_setFieldsSortableListConfig',
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
				addNode: 'Add field',
				close: 'Close',
				propertyName: 'Property Name',
				save: 'Save',
				settings: 'Settings',
				value: 'Value'
			}
		}

	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property FormBuilder.UI_ATTRS
	 * @type Array
	 * @static
	 */
	UI_ATTRS: [ALLOW_REMOVE_REQUIRED_FIELDS],

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property FormBuilder.EXTENDS
	 * @type String
	 * @static
	 */
	EXTENDS: A.DiagramBuilderBase,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property FormBuilder.FIELDS_TAB
	 * @default 0
	 * @type Number
	 * @static
	 */
	FIELDS_TAB: 0,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property FormBuilder.SETTINGS_TAB
	 * @default 1
	 * @type Number
	 * @static
	 */
	SETTINGS_TAB: 1,

	prototype: {

		selectedFieldsLinkedSet: null,
		uniqueFieldsMap: null,

		/**
		 * Construction logic executed during FormBuilder instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function() {
			var instance = this;

			instance.selectedFieldsLinkedSet = new A.LinkedSet({
				after: {
					add: A.bind(instance._afterSelectedFieldsSetAdd, instance),
					remove: A.bind(instance._afterSelectedFieldsSetRemove, instance)
				}
			});

			instance.uniqueFieldsMap = new A.Map({
				after: {
					add: A.bind(instance._afterUniqueFieldsMapAdd, instance),
					remove: A.bind(instance._afterUniqueFieldsMapRemove, instance)
				}
			});

			instance.on({
				cancel: instance._onCancel,
				'drag:end': instance._onDragEnd,
				'drag:start': instance._onDragStart,
				'drag:mouseDown': instance._onDragMouseDown,
				save: instance._onSave
			});

			instance.after('*:focusedChange', instance._afterFieldFocusedChange);

			instance.dropContainer.delegate('click', A.bind(instance._onClickField, instance), _DOT+CSS_FORM_BUILDER_FIELD);
			instance.dropContainer.delegate('mouseover', A.bind(instance._onMouseOverField, instance), _DOT+CSS_FORM_BUILDER_FIELD);
			instance.dropContainer.delegate('mouseout', A.bind(instance._onMouseOutField, instance), _DOT+CSS_FORM_BUILDER_FIELD);
		},

		/**
		 * Sync the FormBuilder UI. Lifecycle.
		 *
		 * @method syncUI
		 * @protected
		 */
		syncUI: function() {
			var instance = this;

			instance._setupAvailableFieldsSortableList();
			instance._setupFieldsSortableList();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method closeEditProperties
		 */
		closeEditProperties: function() {
			var instance = this;

			instance.tabView.selectChild(A.FormBuilder.FIELDS_TAB);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method createField
		 * @param val
		 */
		createField: function(val) {
			var instance = this,
				attrs = {
					builder: instance,
					parent: instance
				};

			if (isFormBuilderField(val)) {
				val.setAttrs(attrs);
			}
			else {
				val = new (instance.getFieldClass(val.type || FIELD))(A.mix(attrs, val));
			}

			val.addTarget(instance);

			return val;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method duplicateField
		 * @param field
		 */
		duplicateField: function(field) {
			var instance = this,
				index = instance._getFieldNodeIndex(field.get(BOUNDING_BOX)),
				newField = instance._cloneField(field, true),
				boundingBox = newField.get(BOUNDING_BOX);

			boundingBox.setStyle(OPACITY, 0);
			instance.insertField(newField, ++index, field.get(PARENT));
			boundingBox.show(true);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method editField
		 * @param field
		 */
		editField: function(field) {
			var instance = this;

			if (isFormBuilderField(field)) {
				instance.editingField = field;

				instance.tabView.selectChild(A.FormBuilder.SETTINGS_TAB);
				instance.propertyList.set(DATA, instance.getFieldProperties(field));

				instance.unselectFields();
				instance.selectFields(field);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getFieldClass
		 * @param type
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getFieldProperties
		 * @param field
		 */
		getFieldProperties: function(field) {
			var instance = this;

			return field.getProperties();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method insertField
		 * @param field
		 * @param index
		 * @param parent
		 */
		insertField: function(field, index, parent) {
			var instance = this;

			parent = parent || instance;

			// remove from previous parent
			field.get(PARENT).removeField(field);

			parent.addField(field, index);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method plotField
		 * @param field
		 * @param container
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method plotFields
		 * @param fields
		 * @param container
		 */
		plotFields: function(fields, container) {
			var instance = this;

			container = container || instance.dropContainer;
			fields = fields || instance.get(FIELDS);

			container.setContent(EMPTY_STR);

			A.each(fields, function(field) {
				instance.plotField(field, container);
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method selectFields
		 * @param fields
		 */
		selectFields: function(fields) {
			var instance = this,
				selectedFieldsLinkedSet = instance.selectedFieldsLinkedSet;

			AArray.each(AArray(fields), function(field) {
				selectedFieldsLinkedSet.add(field);
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method simulateFocusField
		 * @param field
		 */
		simulateFocusField: function(field) {
			var instance = this,
				lastFocusedField = instance.lastFocusedField;

			if (lastFocusedField) {
				lastFocusedField.blur();
			}

			instance.lastFocusedField = field.focus();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method unselectFields
		 * @param fields
		 */
		unselectFields: function(fields) {
			var instance = this,
				selectedFieldsLinkedSet = instance.selectedFieldsLinkedSet;

			if (!fields) {
				fields = selectedFieldsLinkedSet.values();
			}

			AArray.each(AArray(fields), function(field) {
				selectedFieldsLinkedSet.remove(field);
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterFieldFocusedChange
		 * @param event
		 * @protected
		 */
		_afterFieldFocusedChange: function(event) {
			var instance = this,
				field = event.target;

			if (event.newVal && isFormBuilderField(field)) {
				instance.editField(field);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterUniqueFieldsMapAdd
		 * @param event
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterUniqueFieldsMapRemove
		 * @param event
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterSelectedFieldsSetAdd
		 * @param event
		 * @protected
		 */
		_afterSelectedFieldsSetAdd: function(event) {
			event.value.set(SELECTED, true);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterSelectedFieldsSetRemove
		 * @param event
		 * @protected
		 */
		_afterSelectedFieldsSetRemove: function(event) {
			event.value.set(SELECTED, false);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _cloneField
		 * @param field
		 * @param deep
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _dropField
		 * @param dragNode
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _getFieldId
		 * @param field
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _getFieldNodeIndex
		 * @param fieldNode
		 * @protected
		 */
		_getFieldNodeIndex: function(fieldNode) {
			var instance = this;

			return fieldNode.get(PARENT_NODE).all(
				// prevent the placeholder interference on the index
				// calculation
				'> *:not(' + _DOT+CSS_FORM_BUILDER_PLACEHOLDER + ')'
			).indexOf(fieldNode);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onCancel
		 * @param event
		 * @protected
		 */
		_onCancel: function(event) {
			var instance = this;

			instance.unselectFields();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onDragEnd
		 * @param event
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onClickField
		 * @param event
		 * @protected
		 */
		_onClickField: function(event) {
			var instance = this,
				field = A.Widget.getByNode(event.target);

			instance.simulateFocusField(field);

			event.stopPropagation();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onDragMouseDown
		 * @param event
		 * @protected
		 */
		_onDragMouseDown: function(event) {
			var instance = this,
				dragNode = event.target.get(NODE),
				availableField = A.AvailableField.getAvailableFieldByNode(dragNode);

			if (isAvailableField(availableField) && !availableField.get(DRAGGABLE)) {
				event.halt();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onDragStart
		 * @param event
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onMouseOutField
		 * @param event
		 * @protected
		 */
		_onMouseOutField: function(event) {
			var instance = this,
				field = A.Widget.getByNode(event.currentTarget);

			field.controlsToolbar.hide();
			field.get(BOUNDING_BOX).removeClass(CSS_FIELD_HOVER);

			event.stopPropagation();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onMouseOverField
		 * @param event
		 * @protected
		 */
		_onMouseOverField: function(event) {
			var instance = this,
				field = A.Widget.getByNode(event.currentTarget);

			field.controlsToolbar.show();
			field.get(BOUNDING_BOX).addClass(CSS_FIELD_HOVER);

			event.stopPropagation();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onSave
		 * @param event
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setAvailableFields
		 * @param val
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setFieldsSortableListConfig
		 * @param val
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setupAvailableFieldsSortableList
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setupFieldsSortableList
		 * @protected
		 */
		_setupFieldsSortableList: function() {
			var instance = this;

			if (!instance.fieldsSortableList) {
				instance.fieldsSortableList = new A.SortableList(
					instance.get(FIELDS_SORTABLE_LIST_CONFIG)
				);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _syncUniqueField
		 * @param field
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetAllowRemoveRequiredFields
		 * @param val
		 * @protected
		 */
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