AUI.add('aui-form-builder-base', function(A) {
var L = A.Lang,
	isArray = L.isArray,
	isString = L.isString,
	isObject = L.isObject,
	isValue = L.isValue,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	isFormBuilder = function(v) {
		return (v instanceof A.FormBuilder);
	},

	isFormBuilderField = function(v) {
		return (v instanceof A.FormBuilderField);
	},

	DDM = A.DD.DDM,

	ACTIVE = 'active',
	ACCEPT_CHILDREN = 'acceptChildren',
	AVAILABLE_FIELDS = 'availableFields',
	APPEND = 'append',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	BUTTON = 'button',
	BUTTONS = 'buttons',
	BUTTONS_NODE = 'buttonsNode',
	CHILDREN = 'children',
	CLONABLE_PORTAL_LAYOUT = 'clonable-portal-layout',
	CLONE_NODE = 'cloneNode',
	COMMA_AND_SPACE = ', ';
	COMPONENT = 'component',
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DELETE = 'delete',
	DD = 'dd',
	DEFAULT = 'default',
	DEFAULT_MESSAGE_NODE = 'defaultMessageNode',
	DOT = '.',
	DUPLICATE = 'duplicate',
	DRAG = 'drag',
	DRAGGING = 'dragging',
	DRAG_CONTAINER = 'dragContainer',
	DRAG_CONTAINER_NODE = 'dragContainerNode',
	DRAG_NODES_LIST = 'dragNodesList',
	DRAG_PORTAL_LAYOUT = 'dragPortalLayout',
	DROP = 'drop',
	DROP_CONTAINER = 'dropContainer',
	DROP_CONTAINER_NODE = 'dropContainerNode',
	DROP_PORTAL_LAYOUT = 'dropPortalLayout',
	DROP_NODE = 'dropNode',
	DROP_ZONE_NODE = 'dropZoneNode',
	EDIT = 'edit',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FIRST = 'first',
	FIRST_CHILD = 'firstChild',
	FOCUSED = 'focused',
	FORM = 'form',
	FORM_BUILDER = 'formBuilder',
	FORM_LAYOUT = 'form-layout',
	ID = 'id',
	ICON = 'icon',
	INPUT = 'input',
	ITEMS = 'items',
	LABEL = 'label',
	LABEL_NODE = 'labelNode',
	LAST = 'last',
	LAST_CHILD = 'lastChild',
	LIST = 'list',
	MESSAGE = 'message',
	NAME = 'name',
	NESTED_LIST = 'nestedList',
	NODE = 'node',
	OVER = 'over',
	PARENT = 'parent',
	PARENT_NODE = 'parentNode',
	PLACEHOLDER = 'placeholder',
	PLACE_AFTER = 'placeAfter',
	PLACE_BEFORE = 'placeBefore',
	PREPEND = 'prepend',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	RENDER = 'render',
	SAVE = 'save',
	SELECTED = 'selected',
	SETTINGS = 'settings',
	SETTINGS_FORM_NODE = 'settingsFormNode',
	SETTINGS_BUTTONS_NODE = 'settingsButtonsNode',
	SRC_NODE = 'srcNode',
	SPACE = ' ',
	STATE = 'state',
	STRINGS = 'strings',
	TABS = 'tabs',
	TABS_NODE = 'tabsNode',
	TABS_CONTENT_NODE = 'tabsContentNode',
	TABS_LIST_NODE = 'tabsListNode',
	TABVIEW = 'tabview',
	TARGET = 'target',
	TEMPLATE_NODE = 'templateNode',
	TYPE = 'type',
	VALUE = 'value',
	VALUES = 'values',
	ZONE = 'zone',
	REGION = 'region',
	WIDGET = 'widget',

	STRING_EMPTY_SELECTION = 'stringEmptySelection',

	getCN = A.ClassNameManager.getClassName,

	CSS_BUTTON_INPUT = getCN(BUTTON, INPUT),
	CSS_COMPONENT = getCN(COMPONENT),
	CSS_DD_DRAGGING = getCN(DD, DRAGGING),
	CSS_HELPER_HIDDEN = getCN(HELPER, HIDDEN),
	CSS_FORM_BUILDER_BUTTON_DELETE = getCN(FORM, BUILDER, BUTTON, DELETE),
	CSS_FORM_BUILDER_BUTTON_DUPLICATE = getCN(FORM, BUILDER, BUTTON, DUPLICATE),
	CSS_FORM_BUILDER_BUTTON_EDIT = getCN(FORM, BUILDER, BUTTON, EDIT),
	CSS_FORM_BUILDER_BUTTON_SAVE = getCN(FORM, BUILDER, BUTTON, SAVE),
	CSS_FORM_BUILDER_DEFAULT_MESSAGE = getCN(FORM, BUILDER, DEFAULT, MESSAGE),
	CSS_FORM_BUILDER_DRAG_CONTAINER = getCN(FORM, BUILDER, DRAG, CONTAINER),
	CSS_FORM_BUILDER_DRAG_NODE = getCN(FORM, BUILDER, DRAG, NODE),
	CSS_FORM_BUILDER_DROP_ACTIVE = getCN(FORM, BUILDER, DROP, ACTIVE),
	CSS_FORM_BUILDER_DROP_CONTAINER = getCN(FORM, BUILDER, DROP, CONTAINER),
	CSS_FORM_BUILDER_DROP_NODE = getCN(FORM, BUILDER, DROP, NODE),
	CSS_FORM_BUILDER_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM, BUILDER, FIELD),
	CSS_FORM_BUILDER_FIELD_BUTTONS = getCN(FORM, BUILDER, FIELD, BUTTONS),
	CSS_FORM_BUILDER_FIELD_CONTENT = getCN(FORM, BUILDER, FIELD, CONTENT),
	CSS_FORM_BUILDER_FIELD_HIDDEN = getCN(FORM, BUILDER, FIELD, HIDDEN),
	CSS_FORM_BUILDER_FIELD_OVER = getCN(FORM, BUILDER, FIELD, OVER),
	CSS_FORM_BUILDER_FIELD_SELECTED = getCN(FORM, BUILDER, FIELD, SELECTED),
	CSS_FORM_BUILDER_HELPER = getCN(FORM, BUILDER, HELPER),
	CSS_FORM_BUILDER_ICON = getCN(FORM, BUILDER, ICON),
	CSS_FORM_BUILDER_LABEL = getCN(FORM, BUILDER, LABEL),
	CSS_FORM_BUILDER_PLACEHOLDER = getCN(FORM, BUILDER, PLACEHOLDER),
	CSS_FORM_BUILDER_SETTINGS = getCN(FORM, BUILDER, SETTINGS),
	CSS_FORM_BUILDER_SETTINGS_BUTTONS = getCN(FORM, BUILDER, SETTINGS, BUTTONS),
	CSS_FORM_BUILDER_TABS_CONTAINER = getCN(FORM, BUILDER, TABS, CONTAINER),
	CSS_TABVIEW_CONTENT = getCN(TABVIEW, CONTENT),
	CSS_TABVIEW_LIST = getCN(TABVIEW, LIST),
	CSS_ICON = getCN(ICON),
	CSS_WIDGET = getCN(WIDGET),

	TPL_DEFAULT_MESSAGE = '<li class="' + CSS_FORM_BUILDER_DEFAULT_MESSAGE + '"></li>',

	TPL_DRAG_CONTAINER = '<ul class="' + CSS_FORM_BUILDER_DRAG_CONTAINER + '"></ul>',

	TPL_DRAG_NODE = '<li class="' + [CSS_FORM_BUILDER_DRAG_NODE, CSS_FORM_BUILDER_FIELD].join(SPACE) + '" data-type="{type}">' +
						'<span class="' + [CSS_FORM_BUILDER_ICON, CSS_ICON].join(SPACE) + ' {icon}"></span>' +
						'<span class="' + CSS_FORM_BUILDER_LABEL + '">{label}</span>' +
					'</li>',

	TPL_DROP_CONTAINER = '<ul class="' + [CSS_FORM_BUILDER_DROP_CONTAINER].join(SPACE) + '"></ul>',

	TPL_FIELD_BOUNDING_BOX = '<li class="' + [CSS_WIDGET, CSS_COMPONENT, CSS_FORM_BUILDER_FIELD, CSS_HELPER_HIDDEN].join(SPACE) + '"></li>',

	TPL_HELPER = '<div class="' + CSS_FORM_BUILDER_HELPER + '"></div>',

	TPL_PLACEHOLDER = '<li class="' + CSS_FORM_BUILDER_PLACEHOLDER + '"></li>',

	TPL_TABS = '<div class="' + CSS_FORM_BUILDER_TABS_CONTAINER + '"></div>',

	TPL_TABS_CONTENT = '<div class="' + CSS_TABVIEW_CONTENT + '"></div>',

	TPL_TABS_LIST = '<ul class="' + CSS_TABVIEW_LIST + '"></ul>',

	TPL_SETTINGS = '<form class="' + CSS_FORM_BUILDER_SETTINGS + '"></form>',

	TPL_SETTINGS_BUTTONS = '<div class="aui-button-row">' +
								'<span class="aui-button aui-button-submit aui-state-positive aui-priority-primary">' +
									'<span class="aui-button-content">' +
										'<input type="button" value="Save" class="aui-button-input aui-form-builder-button-save">' +
									'</span>' +
								'</span>' +
								'<span class="aui-button aui-button-submit aui-state-positive aui-priority-secondary">' +
									'<span class="aui-button-content">' +
										'<input type="button" value="Close" class="aui-button-input aui-form-builder-button-close">' +
									'</span>' +
								'</span>' +
							'</div>',

	TAB_INDEX_DRAG = 0,
	TAB_INDEX_SETTINGS = 1,

	INVALID_CLONE_ATTRS = A.Array([BOUNDING_BOX, CONTENT_BOX, SRC_NODE, FIELDS, ID, SELECTED, TEMPLATE_NODE, LABEL_NODE, NAME])

var FormBuilderFieldSupport = function() {};

FormBuilderFieldSupport.ATTRS = {
	fields: {
		value: [],
		setter: '_setFields',
		getter: function(val) {
			return val || [];
		},
		validator: isArray
	}
};

A.mix(FormBuilderFieldSupport.prototype, {
	addField: function(field) {
		var instance = this;
		var fields = instance.get(FIELDS);

		fields = instance._removeFromParent(field);

		fields.push(field);
		instance.set(FIELDS, fields);
	},

	addFields: function(fields) {
		var instance = this;

		A.Array.each(
			instance._normalizeFields(fields),
			A.bind(instance.addField, instance)
		);
	},

	contains: function(field, deep) {
		var instance = this;
		var fields = instance.get(FIELDS);

		if (deep) {
			for (var i = 0; i < fields.length; i++) {
				var item = fields[i];

				if ((item == field) || item.contains(field, deep)) {
					return true;
				}
			}
		}

		return (instance.indexOf(field) > -1);
	},

	getField: function(index) {
		var instance = this;
		var fields = instance.get(FIELDS);

		return fields[index];
	},

	indexOf: function(field) {
		var instance = this;
		var fields = instance.get(FIELDS);

		return A.Array.indexOf(fields, field);
	},

	insertField: function(index, field) {
		var instance = this;
		var fields = instance.get(FIELDS);

		fields = instance._removeFromParent(field);

		fields.splice(index, 0, field);

		instance.set(FIELDS, fields);
	},

	removeField: function(field) {
		var instance = this;
		var fields = instance.get(FIELDS);

		fields = instance._removeFromParent(field);

		field.removeTarget(instance);

		instance.set(FIELDS, fields);
	},

	removeFields: function(fields) {
		var instance = this;

		A.Array.each(
			instance._normalizeFields(fields),
			A.bind(instance.removeField, instance)
		);
	},

	_normalizeFields: function(fields) {
		var instance = this;
		var output = [];

		fields = A.Array(fields);

		A.Array.each(fields, function(field, i) {
			var formBuilder = instance.get(FORM_BUILDER) || instance;

			if (!isFormBuilderField(field)) {
				field = formBuilder._renderField(instance, i, field);
			}

			if (field) {
				output.push(field);

				field.addTarget(formBuilder);

				field.set(PARENT, instance);
			}
		});

		return output;
	},

	_removeFromParent: function(field) {
		var instance = this;
		var fields = instance.get(FIELDS);

		if (isFormBuilderField(field)) {
			var parent = field.get(PARENT);

			if (parent && parent != instance) {
				parent.removeField(field);
			}
			else if (instance.contains(field)) {
				A.Array.removeItem(fields, field);
			}
		}

		return fields;
	},

	_setFields: function(val) {
		var instance = this;

		return instance._normalizeFields(val);
	}
});

A.FormBuilderFieldSupport = FormBuilderFieldSupport;

var FormBuilder = A.Component.create({

	NAME: FORM_BUILDER,

	ATTRS: {

		/**
		 * The list of fields that can be used
		 *
		 * @attribute availableFields
		 */
		availableFields: {
			value: {},
			validator: isObject
		},

		/**
		 * The A.NestedList configuration object
		 *
		 * @attribute nestedList
		*/
		nestedList: {
			setter: function(val) {
				var instance = this;

				var config = A.merge({
					dd: {
						plugins: [
							{
								cfg: {
									horizontal: false,
									scrollDelay: 30
								},
								fn: A.Plugin.DDWinScroll
							}
						]
					},
					dropCondition: function(event) {
						var dropCondition = false;
						var dropNode = event.drop.get(NODE);

						var field = dropNode.getData(FIELD);

						if (field && field.get(ACCEPT_CHILDREN)) {
							dropCondition = true;
						}

						return dropCondition;
					},
					dropOn: DOT + CSS_FORM_BUILDER_DROP_ZONE,
					placeholder: A.Node.create(TPL_PLACEHOLDER),
					sortCondition: function(event) {
						var dropContainerNode = instance.get(DROP_CONTAINER_NODE);

						return dropContainerNode.contains(event.drop.get(NODE));
					}
				}, val);

				return config;
			},
			value: {}
		},

		/**
		 * Strings messages
		 *
		 * @attribute strings
		 */
		strings: {
			value:
			{
				stringDefaultMessage: 'Drop a field here',
				stringEmptySelection: 'No field selected'
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		defaultMessageNode: {
			valueFn: function() {
				return A.Node.create(TPL_DEFAULT_MESSAGE);
			}
		},

		dragContainerNode: {
			valueFn: function() {
				return A.Node.create(TPL_DRAG_CONTAINER);
			}
		},

		dragNodesList: {
			valueFn: '_valueDragNodesList'
		},

		dropContainerNode: {
			valueFn: function() {
				return A.Node.create(TPL_DROP_CONTAINER);
			}
		},

		settingsButtonsNode: {
			valueFn: function() {
				return A.Node.create(TPL_SETTINGS_BUTTONS);
			}
		},

		settingsFormNode: {
			valueFn: function() {
				return A.Node.create(TPL_SETTINGS);
			}
		},

		tabsNode: {
			valueFn: function() {
				return A.Node.create(TPL_TABS);
			}
		},

		tabsContentNode: {
			valueFn: function() {
				return A.Node.create(TPL_TABS_CONTENT);
			}
		},

		tabsListNode: {
			valueFn: function() {
				return A.Node.create(TPL_TABS_LIST);
			}
		}

	},

	AUGMENTS: [A.FormBuilderFieldSupport],

	HTML_PARSER: {
		defaultMessageNode: DOT + CSS_FORM_BUILDER_DEFAULT_MESSAGE,
		dragContainerNode: DOT + CSS_FORM_BUILDER_DRAG_CONTAINER,
		dragNodesList: function(srcNode) {
			var nodes = srcNode.all(DOT + CSS_FORM_BUILDER_DRAG_NODE);

			return (nodes.size() <= 0) ? null : nodes;
		},
		dropContainerNode: DOT + CSS_FORM_BUILDER_DROP_CONTAINER,
		settingsFormNode: FORM + DOT + CSS_FORM_BUILDER_SETTINGS,
		settingsButtonsNode: DOT + CSS_FORM_BUILDER_SETTINGS_BUTTONS,
		tabsNode: DOT + CSS_FORM_BUILDER_TABS_CONTAINER,
		tabsContentNode: DOT + CSS_TABVIEW_CONTENT,
		tabsListNode: DOT + CSS_TABVIEW_LIST
	},

	EXTENDS: A.Widget,

	prototype: {

		/**
		 * Initializer
		 *
		 * @method initializer
		 */
		initializer: function() {
			var instance = this;

			instance.boundingBox = instance.get(BOUNDING_BOX);
			instance.dragContainerNode = instance.get(DRAG_CONTAINER_NODE);
			instance.dragNodesList = instance.get(DRAG_NODES_LIST);
			instance.dropContainerNode = instance.get(DROP_CONTAINER_NODE);

			instance.settingsButtonsNode = instance.get(SETTINGS_BUTTONS_NODE);
			instance.settingsFormNode = instance.get(SETTINGS_FORM_NODE);

			instance.tabsNode = instance.get(TABS_NODE);
			instance.tabsContentNode = instance.get(TABS_CONTENT_NODE);
			instance.tabsListNode = instance.get(TABS_LIST_NODE);

			instance._dragNestedList = new A.NestedList(instance.get(NESTED_LIST));
			instance._dropNestedList = new A.NestedList(instance.get(NESTED_LIST));

			instance._tabs = new A.TabView(
				{
					boundingBox: instance.tabsNode,
					contentNode: instance.tabsContentNode,
					listNode: instance.tabsListNode
				}
			);

			if (!instance.tabsContentNode.inDoc()) {
				instance._tabs.set(
					ITEMS,
					[
						{label: 'Add a field', contentNode: instance.dragContainerNode},
						{label: 'Field settings', content: instance.settingsFormNode}
					]
				);
			}
		},

		/**
		 * Render phase
		 *
		 * @method renderUI
		 */
		renderUI: function() {
			var instance = this;

			instance.dragContainerNode.setContent(instance.dragNodesList);

			instance._tabs.render()
		},

		/**
		 * Bind phase
		 *
		 * @method bindUI
		 */
		bindUI: function() {
			var instance = this;
			var boundingBox = instance.boundingBox;
			var dropContainerNode = instance.dropContainerNode;
			var settingsButtonsNode = instance.settingsButtonsNode;

			instance._dragNestedList.on('drag:end', A.bind(instance._onDragEndDragNestedList, instance));
			instance._dragNestedList.on('drag:start', A.bind(instance._onDragStartDragNestedList, instance));
			instance._dropNestedList.on('drag:end', A.bind(instance._onDragEndDropNestedList, instance));

			instance._tabs.after('activeTabChange', A.bind(instance._afterActiveTabChange, instance));

			dropContainerNode.delegate('click', A.bind(instance._onClickFieldDelete, instance), DOT + CSS_FORM_BUILDER_BUTTON_DELETE);
			dropContainerNode.delegate('click', A.bind(instance._onClickFieldDuplicate, instance), DOT + CSS_FORM_BUILDER_BUTTON_DUPLICATE);
			dropContainerNode.delegate('click', A.bind(instance._onClickFieldEdit, instance), DOT + CSS_FORM_BUILDER_BUTTON_EDIT);

			dropContainerNode.delegate('dblclick', A.bind(instance._onDbClickField, instance), DOT + CSS_FORM_BUILDER_FIELD);
			dropContainerNode.delegate('mouseenter', A.bind(instance._onMouseEnterField, instance), DOT + CSS_FORM_BUILDER_FIELD);
			dropContainerNode.delegate('mouseleave', A.bind(instance._onMouseLeaveField, instance), DOT + CSS_FORM_BUILDER_FIELD);

			settingsButtonsNode.delegate('click', A.bind(instance._onClickSettingsButton, instance), DOT + CSS_BUTTON_INPUT);

			instance.after('*:fieldsChange', A.bind(instance._afterFieldsChange, instance));
			instance.after('*:selectedChange', A.bind(instance._afterSelectedChange, instance));
		},

		/**
		 * Sync phase
		 *
		 * @method syncUI
		 */
		syncUI: function() {
			var instance = this;

			instance.syncFieldsUI();

			instance._syncDefaultMessage();
			instance._syncNestedList();
		},

		/**
		 * Append fields to the given container
		 *
		 * @method appendFields
		 */
		appendFields: function(fields, container) {
			var instance = this;

			container.setContent(EMPTY_STR);

			A.each(fields, function(field) {
				var children = field.get(FIELDS);

				container.append(field.get(BOUNDING_BOX));

			    instance.appendFields(children, field.get(DROP_ZONE_NODE));
			});
		},

		/**
		 * Duplicates the given field
		 *
		 * @method duplicateField
		 */
		duplicateField: function(field) {
			var instance = this;
			var newFieldConfig = instance._cloneField(field);
			var parent = field.get(PARENT);
			var index = parent.indexOf(field);

			parent.insertField(++index, newFieldConfig);

			instance.selectField(parent.get(index));
		},

		/**
		 * Selects the given field
		 *
		 * @method selectField
		 */
		selectField: function(field) {
			var instance = this;

			field.set(SELECTED, true);

			var firstSettingInput = instance.settingsFormNode.one(INPUT);

			if (firstSettingInput) {
				firstSettingInput.focus();
				firstSettingInput.select();
			}

			instance._tabs.selectTab(TAB_INDEX_SETTINGS);
		},

		/**
		 * Pupulates the dropContainerNode with the boundingBox nodes of each
		 * of the fields components
		 *
		 * @method syncFieldsUI
		 */
		syncFieldsUI: function(event) {
			var instance = this;
			var fields = instance.get(FIELDS);
			var container = instance.get(DROP_CONTAINER_NODE);

			if (event && isFormBuilderField(event.target)) {
				var field = event.target;

				fields = field.get(FIELDS);
				container = field.get(DROP_ZONE_NODE);
			}

			instance.appendFields(fields, container);
		},

		/**
		 * Handles the activeTabChange event
		 *
		 * @method _afterActiveTabChange
		 */
		_afterActiveTabChange: function(event) {
			var instance = this;
			var selectedField = instance.selectedField;
			var settingsFormNode = instance.get(SETTINGS_FORM_NODE);
			var settingsButtonsNode = instance.get(SETTINGS_BUTTONS_NODE);
			var strings = instance.get(STRINGS);

			var containsField = instance.contains(selectedField, true);

			if (!containsField) {
				settingsFormNode.setContent(strings[STRING_EMPTY_SELECTION]);
			}

			settingsButtonsNode.toggleClass(CSS_HELPER_HIDDEN, !containsField);
		},

		/**
		 * Handles the afterFieldsChange event
		 *
		 * @method _afterFieldsChange
		 */
		_afterFieldsChange: function() {
			var instance = this;

			instance.syncUI();
		},

		/**
		 * Adds/removes the selected class according to the 'selected' attribute
		 * value
		 *
		 * @method _afterSelectedChange
		 */
		_afterSelectedChange: function(event) {
			var instance = this;
			var field = event.target;
			var prevSelected = instance.selectedField;

			instance._syncSelectedFieldUI(field);

			if (field.get(SELECTED)) {
				instance.selectedField = field;

				if (prevSelected && prevSelected != field) {
					prevSelected.set(SELECTED, false);
				}

				field.renderSettings();
			}
		},

		/**
		 * Clones a field
		 *
		 * @method _cloneField
		 */
		_cloneField: function(field) {
			var instance = this;
			var type = field.get(TYPE);

			var config = {};

			A.each(field.getAttrs(), function(value, key) {
				if (INVALID_CLONE_ATTRS.indexOf(key) === -1 && !isNode(value)) {
					config[key] = value;
				}
			});

			var children = [];

			A.each(field.get(FIELDS), function(child) {
				children.push(instance._cloneField(child));
			});

			config[FIELDS] = children;
			config[TYPE] = type;

			return config;
		},

		/**
		 * Add a field to the dropContainer
		 *
		 * @method _dropField
		 */
		_dropField: function(node, type) {
			var instance = this;
			var parentNode = node.get(PARENT_NODE);
			var nodes = parentNode.all('> ' + DOT + CSS_FORM_BUILDER_FIELD);
			var field = node.getData(FIELD);
			var defaultMessageNode = instance.get(DEFAULT_MESSAGE_NODE);

			if (defaultMessageNode.inDoc()) {
				defaultMessageNode.remove();
			}

			var parent = instance._getFieldParentByNode(node);
			var index = nodes.indexOf(node);

			if (!field) {
				// Remove remanescent node
				node.remove();

				field = instance._getFieldDefaultConfig(type);
			}

			parent.insertField(index, field);

			return parent.getField(index);
		},

		/**
		 * Returns the default config object for a field type
		 *
		 * @method _getFieldConfig
		 */
		_getFieldDefaultConfig: function(type) {
			var instance = this;
			var availableFields = instance.get(AVAILABLE_FIELDS);

			return A.merge(
				availableFields[type],
				{
					type: type
				}
			);
		},

		/**
		 * Return the instance of a A.FormBuilderField for the given type
		 *
		 * @method _getFieldInstance
		 */
		_getFieldInstance: function(config, type) {
			var instance = this;
			var type = type || config.type;
			var typesMap = A.FormBuilder.types;
			var fieldClass = isString(type) ? typesMap[type] : type;

			if (fieldClass !== undefined) {
				return new fieldClass(config);
			}
			else {
				A.log('The field type: [' + type + '] couldn\'t be found.');
			}

			return null;
		},

		/**
		 * Returns the parent of the field
		 *
		 * @method _getFieldParentByNode
		 */
		_getFieldParentByNode: function(node) {
			var instance = this;
			var parentNode = node.ancestor(DOT + CSS_FORM_BUILDER_FIELD);

			if (parentNode) {
				return parentNode.getData(FIELD);
			}

			return instance;
		},

		/**
		 * Return the parent node for a given field or the dropContainerNode
		 *
		 * @method _getFieldParentNode
		 */
		_getFieldParentNode: function(field) {
			var instance = this;
			var parent = field.get(PARENT);

			if (isFormBuilderField(parent)) {
				return parent.get(BOUNDING_BOX);
			}

			return instance.get(DROP_CONTAINER_NODE);
		},

		/**
		 * Handles the click event for the delete button of each field
		 *
		 * @method _onClickFieldDelete
		 */
		_onClickFieldDelete: function(event) {
			var instance = this;
			var target = event.currentTarget;

			var fieldBB = target.ancestor(DOT + CSS_FORM_BUILDER_FIELD);
			var field = fieldBB.getData(FIELD);

			if (field) {
				var selectedField = instance.selectedField;

				if (field == selectedField ||
					field.contains(selectedField, true)) {

					instance._tabs.selectTab(TAB_INDEX_DRAG);
				}

				field.set(SELECTED, false);

				field.get(PARENT).removeField(field);
			}
		},

		/**
		 * Handles the click event for the delete button of each field
		 *
		 * @method _onClickFieldDelete
		 */
		_onClickFieldDuplicate: function(event) {
			var instance = this;
			var target = event.currentTarget;

			var fieldBB = target.ancestor(DOT + CSS_FORM_BUILDER_FIELD);
			var field = fieldBB.getData(FIELD);

			if (field) {
				instance.duplicateField(field);
			}
		},

		/**
		 * Handles the click event for the delete button of each field
		 *
		 * @method _onClickFieldDelete
		 */
		_onClickFieldEdit: function(event) {
			var instance = this;
			var target = event.currentTarget;

			var fieldBB = target.ancestor(DOT + CSS_FORM_BUILDER_FIELD);
			var field = fieldBB.getData(FIELD);

			if (field) {
				instance.selectField(field);
			}
		},

		/**
		 * Handles the click event for the settings buttons
		 *
		 * @method _onClickSettingsButton
		 */
		_onClickSettingsButton: function(event) {
			var instance = this;
			var target = event.currentTarget;

			if (target.hasClass(CSS_FORM_BUILDER_BUTTON_SAVE)) {
				var selectedField = instance.selectedField;

				if (selectedField) {
					selectedField.saveSettings();
				}
			}

			instance._tabs.selectTab(TAB_INDEX_DRAG);
		},

		/**
		 * Handles the dblclick event for each field
		 *
		 * @method _onDbClickField
		 */
		_onDbClickField: function(event) {
			var instance = this;
			var target = event.target;

			if (!target.getData(FIELD)) {
				target = target.ancestor(DOT + CSS_FORM_BUILDER_FIELD);
			}

			if (target) {
				var field = target.getData(FIELD);

				if (field) {
					instance.selectField(field);
				}
			}

			return false;
		},

		/**
		 * Handle the drag:end event for the _dragNestedList instance
		 *
		 * @method _onDragEndDragNestedList
		 */
		_onDragEndDragNestedList: function(event) {
			var instance = this;
			var drag = event.target;
			var dragNode = drag.get(NODE);
			var dropContainerNode = instance.dropContainerNode;

			var newFieldNode = dropContainerNode.one(DOT + CSS_FORM_BUILDER_DRAG_NODE);

			if (newFieldNode) {
				var type = newFieldNode.getAttribute('data-type');
				var field = instance._dropField(newFieldNode, type);

				instance.selectField(field);
			}
			else {
				drag.set(NODE, instance.originalNode);
			}
		},

		/**
		 * Handle the drag:end event for the _dropNestedList instance
		 *
		 * @method _onDragEndDropNestedList
		 */
		_onDragEndDropNestedList: function(event) {
			var instance = this;
			var drag = event.target;
			var dragNode = drag.get(NODE);

			if (dragNode.hasClass(CSS_FORM_BUILDER_FIELD)) {
				instance._dropField(dragNode);
			}
		},

		/**
		 * Handle the drag:start event
		 *
		 * @method _onDragStartDragNestedList
		 */
		_onDragStartDragNestedList: function(event) {
			var instance = this;
			var drag = event.target;
			var dragNode = drag.get(NODE);

			var clonedDragNode = dragNode.clone();

			clonedDragNode.placeBefore(dragNode);

			drag.set(NODE, clonedDragNode);

			clonedDragNode.attr(ID, EMPTY_STR);
			clonedDragNode.show();

			dragNode.removeClass(CSS_DD_DRAGGING);
			dragNode.show();

			instance.originalNode = dragNode;

			var config = A.merge(
				instance.get(NESTED_LIST),
				{
					nodes: clonedDragNode
				}
			);

			(new A.NestedList(config));
		},

		/**
		 * Handle the mouseenter event for each field
		 *
		 * @method _onMouseEnterField
		 */
		_onMouseEnterField: function(event) {
			var instance = this;
			var fieldBB = event.currentTarget;
			var field = fieldBB.getData(FIELD);

			if (field) {
				instance._toggleFieldButtonsNode(field, true);
			}
		},

		/**
		 * Handle the mouseleave event for each field
		 *
		 * @method _onMouseLeaveField
		 */
		_onMouseLeaveField: function(event) {
			var instance = this;
			var fieldBB = event.currentTarget;
			var field = fieldBB.getData(FIELD);
			var val = false;

			if (field) {
				if (field.get(SELECTED)) {
					val = true;
				}

				instance._toggleFieldButtonsNode(field, val);
			}
		},

		/**
		 * Renders a field using the given configuration object
		 *
		 * @method _renderField
		 */
		_renderField: function(parent, index, config) {
			var instance = this;

			var container = parent.get(DROP_CONTAINER_NODE);

			if (isFormBuilderField(parent)) {
				container = parent.get(DROP_ZONE_NODE);
			}

			var boundingBox = A.Node.create(TPL_FIELD_BOUNDING_BOX);
			var fields = parent.get(FIELDS);

			if (fields.length > 0) {
				container.insert(boundingBox, index);
			}
			else {
				container.append(boundingBox);
			}

			A.mix(
				config,
				{
					boundingBox: boundingBox,
					formBuilder: instance,
					after: {
						render: function() {
							boundingBox.removeClass(CSS_HELPER_HIDDEN);
						}
					}
				}
			);

			return instance._getFieldInstance(config).render();
		},

		/**
		 * Updates the default message UI
		 *
		 * @method _syncDefaultMessage
		 */
		_syncDefaultMessage: function() {
			var instance = this;

			if (!instance.dropContainerNode.hasChildNodes()) {
				var strings = instance.get(STRINGS);
				var defaultMessageNode = instance.get(DEFAULT_MESSAGE_NODE);

				defaultMessageNode.setContent(strings['stringDefaultMessage']);

				instance.dropContainerNode.append(defaultMessageNode);
			}
		},

		/**
		 * Updates the nestedList nodes
		 *
		 * @method _syncNestedList
		 */
		_syncNestedList: function() {
			var instance = this;

			instance._syncNodes();

			instance._dragNestedList.addAll(instance.dragNodes);
			instance._dropNestedList.addAll(instance.dropNodes);
		},

		/**
		 * Updates the dragNodes and dropNodes variables
		 *
		 * @method _syncNodes
		 */
		_syncNodes: function() {
			var instance = this;
			var dragContainerNode = instance.dragContainerNode;
			var dropContainerNode = instance.dropContainerNode;

			instance.dragNodes = dragContainerNode.all(DOT + CSS_FORM_BUILDER_FIELD);

			instance.dropNodes = dropContainerNode.all(
				[
					DOT + CSS_FORM_BUILDER_FIELD,
					DOT + CSS_FORM_BUILDER_DEFAULT_MESSAGE
				].join(COMMA_AND_SPACE)
			);
		},

		/**
		 * description
		 *
		 * @method _syncSelectedFieldUI
		 */
		_syncSelectedFieldUI: function(field) {
			var instance = this;
			var value = field.get(SELECTED);
			var fieldBB = field.get(BOUNDING_BOX);
			var selected = instance.selectedField;

			fieldBB.toggleClass(
				CSS_FORM_BUILDER_FIELD_SELECTED,
				value
			);

			if (!value && field.contains(selected)) {
				value = true;
			}

			instance._toggleFieldButtonsNode(field, value);
		},

		/**
		 * Toggle the visibility of the field buttons node
		 *
		 * @method _toggleButtonsNode
		 */
		_toggleFieldButtonsNode: function(field, val) {
			var instance = this;
			var buttonsNode = field.get(BUTTONS_NODE);

			if (buttonsNode) {
				buttonsNode.toggleClass(CSS_HELPER_HIDDEN, !val);
			}
		},

		/**
		 * Populates the dragNodesList attribute with values provided by the
		 * availableFields attribute
		 *
		 * @method _valueDragNodesList
		 */
		_valueDragNodesList: function() {
			var instance = this;
			var availableFields = instance.get(AVAILABLE_FIELDS);
			var buffer = [];

			A.each(availableFields, function(field, type) {
				buffer.push(
					A.substitute(
						TPL_DRAG_NODE,
						{
							icon: field.icon,
							label: field.fieldLabel,
							type: type
						}
					)
				);
			});

			return A.NodeList.create(buffer.join(EMPTY_STR));
		}

	}

});

A.FormBuilder = FormBuilder;

A.FormBuilder.types = {};

}, '@VERSION@' ,{requires:['aui-base','aui-button-item','aui-nested-list','aui-tabs','substitute'], skinnable:true});
AUI.add('aui-form-builder-field', function(A) {
var L = A.Lang,
	isArray = L.isArray,
	isString = L.isString,

	ACCEPT_CHILDREN = 'acceptChildren',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	BUTTON = 'button',
	BUTTONS = 'buttons',
	BUTTONS_NODE = 'buttonsNode',
	CHECKBOX = 'checkbox',
	CHECKED = 'checked',
	CHILDREN = 'children',
	CLEARFIX = 'clearfix',
	CLOSE = 'close',
	COMPONENT = 'component',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DEFAULT = 'default',
	DELETE = 'delete',
	DOT = '.',
	DRAG = 'drag',
	DRAG_CONTAINER = 'dragContainer',
	DRAG_CONTAINER_NODE = 'dragContainerNode',
	DRAG_NODES_LIST = 'dragNodesList',
	DROP = 'drop',
	DROP_CONTAINER = 'dropContainer',
	DROP_CONTAINER_NODE = 'dropContainerNode',
	DROP_NODE = 'dropNode',
	DROP_ZONE = 'dropZone',
	DROP_ZONE_NODE = 'dropZoneNode',
	DUPLICATE = 'duplicate',
	EDIT = 'edit',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FOR = 'for',
	FORM = 'form',
	FORM_BUILDER = 'formBuilder',
	FORM_BUILDER_FIELD = 'form-builder-field',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	ICON = 'icon',
	ID = 'id',
	LABEL = 'label',
	LABEL_NODE = 'labelNode',
	METADATA = 'metadata',
	NAME = 'name',
	NODE = 'node',
	PANEL = 'panel',
	PORTAL_LAYOUT = 'portalLayout',
	PREDEFINED_VALUE = 'predefinedValue',
	PROXY = 'proxy',
	REQUIRED = 'required',
	STATE = 'state',
	SETTINGS = 'settings',
	SETTINGS_FORM_NODE = 'settingsFormNode',
	SHOW_LABEL = 'showLabel',
	SIZE = 'size',
	SPACE = ' ',
	TEMPLATE_NODE = 'templateNode',
	ZONE = 'zone',
	WIDGET = 'widget',

	getCN = A.ClassNameManager.getClassName,

	CSS_COMPONENT = getCN(COMPONENT),
	CSS_FIELD_LABEL = getCN(FIELD, LABEL),
	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_HELPER_HIDDEN = getCN(HELPER, HIDDEN),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),
	CSS_FORM_BUILDER_BUTTON = getCN(FORM, BUILDER, BUTTON),
	CSS_FORM_BUILDER_BUTTON_DELETE = getCN(FORM, BUILDER, BUTTON, DELETE),
	CSS_FORM_BUILDER_BUTTON_DUPLICATE = getCN(FORM, BUILDER, BUTTON, DUPLICATE),
	CSS_FORM_BUILDER_BUTTON_EDIT = getCN(FORM, BUILDER, BUTTON, EDIT),
	CSS_FORM_BUILDER_ICON = getCN(FORM, BUILDER, ICON),
	CSS_FORM_BUILDER_ICON_DELETE = getCN(FORM, BUILDER, ICON, DELETE),
	CSS_FORM_BUILDER_ICON_DUPLICATE = getCN(FORM, BUILDER, ICON, DUPLICATE),
	CSS_FORM_BUILDER_ICON_EDIT = getCN(FORM, BUILDER, ICON, EDIT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM, BUILDER, FIELD),
	CSS_FORM_BUILDER_FIELD_BUTTONS = getCN(FORM, BUILDER, FIELD, BUTTONS),
	CSS_FORM_BUILDER_DROP_NODE = getCN(FORM, BUILDER, DROP, NODE),
	CSS_FORM_BUILDER_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
	CSS_WIDGET = getCN(WIDGET),

	TPL_BOUNDING_BOX = '<li class="' + [CSS_WIDGET, CSS_COMPONENT, CSS_FORM_BUILDER_FIELD].join(SPACE) + '"></li>',

	TPL_BUTTONS = '<div class="' + [CSS_FORM_BUILDER_FIELD_BUTTONS, CSS_HELPER_HIDDEN].join(SPACE) + '">' +
					'<a class="' + [CSS_FORM_BUILDER_BUTTON, CSS_FORM_BUILDER_BUTTON_EDIT].join(SPACE) + '" href="javascript:;" title="Edit">' +
						'<div class="' + [CSS_FORM_BUILDER_ICON, CSS_FORM_BUILDER_ICON_EDIT].join(SPACE) + '"></div>' +
					'</a>' +
					'<a class="' + [CSS_FORM_BUILDER_BUTTON, CSS_FORM_BUILDER_BUTTON_DUPLICATE].join(SPACE) + '" href="javascript:;" title="Duplicate">' +
						'<div class="' + [CSS_FORM_BUILDER_ICON, CSS_FORM_BUILDER_ICON_DUPLICATE].join(SPACE) + '"></div>' +
					'</a>' +
					'<a class="' + [CSS_FORM_BUILDER_BUTTON, CSS_FORM_BUILDER_BUTTON_DELETE].join(SPACE) + '" href="javascript:;" title="Delete">' +
						'<div class="' + [CSS_FORM_BUILDER_ICON, CSS_FORM_BUILDER_ICON_DELETE].join(SPACE) + '"></div>' +
					'</a>' +
				  '</div>',

	TPL_DIV = '<div class="' + CSS_HELPER_CLEARFIX + '"></div>',

	TPL_LABEL = '<label class="' + CSS_FIELD_LABEL + '"></label>',

	TPL_DROP_ZONE = '<ul class="' + CSS_FORM_BUILDER_DROP_ZONE + '"></ul>'

var FormBuilderField = A.Component.create({

	NAME: FORM_BUILDER_FIELD,

	ATTRS: {

		/**
		 * Wether the field accepts children or nothing
		 *
		 * @attribute acceptChildren
		 */
		acceptChildren: {
			value: true
		},

		/**
		 * FormBuilder instance of the field
		 *
		 * @attribute formBuilder
		 */
		formBuilder: {
			value: undefined
		},

		/**
		 * The id of the field
		 *
		 * @attribute id
		 */
		id: {
			value: EMPTY_STR
		},

		/**
		 * The aui icon css class of the field
		 *
		 * @attribute icon
		 */
		icon: {
			value: EMPTY_STR
		},

		/**
		 * The label of the field
		 *
		 * @attribute label
		 */
		label: {
			value: EMPTY_STR
		},

		/**
		 * The name of the field
		 *
		 * @attribute name
		 */
		name: {
			valueFn: function() {
				var instance = this;

				return instance.get(TYPE) + (++A.Env._uidx);
			}
		},

		/**
		 * The parent of the field
		 *
		 * @attribute parent
		 */
		parent: {
			value: null
		},

		/**
		 * The default value of the field
		 *
		 * @attribute predefinedValue
		 */
		predefinedValue: {
			value: EMPTY_STR
		},

		/**
		 * Whether the field is required or not
		 *
		 * @attribute required
		 */
		required: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		/**
		 * Define the selected state of the field
		 *
		 * @attribute selected
		 */
		selected: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		/**
		 * Whether to show the label or not
		 *
		 * @attribute showLabel
		 */
		showLabel: {
			setter: A.DataType.Boolean.parse,
			value: true
		},

		/**
		 * The HTML template of the field
		 *
		 * @attribute template
		 */
		template: {
			value: EMPTY_STR
		},

		/**
		 * The type of the field. It's a unique identifier per field
		 *
		 * @attribute type
		 */
		type: {
			value: EMPTY_STR
		},

		/*
		* HTML_PARSER attributes
		*/
		buttonsNode: {
			valueFn: function() {
				return A.Node.create(TPL_BUTTONS);
			}
		},

		dropZoneNode: {
			valueFn: function() {
				return A.Node.create(TPL_DROP_ZONE);
			}
		},

		labelNode: {
			valueFn: function() {
				return A.Node.create(TPL_LABEL);
			}
		},

		templateNode: {
			valueFn: 'getNode'
		}

	},

	AUGMENTS: [A.FormBuilderFieldSupport],

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, SHOW_LABEL],

	HTML_PARSER: {
		buttonsNode: DOT + CSS_FORM_BUILDER_FIELD_BUTTONS,
		dropZoneNode: DOT + CSS_FORM_BUILDER_DROP_ZONE,
		labelNode: LABEL + DOT + CSS_FIELD_LABEL
	},

	prototype: {
		BOUNDING_TEMPLATE: TPL_BOUNDING_BOX,

		/**
		 * Initializer
		 *
		 * @method initializer
		 */
		initializer: function() {
			var instance = this;

			instance.get(BOUNDING_BOX).setData(FIELD, instance);
		},

		/**
		 * Bind phase
		 *
		 * @method bindUI
		 */
		bindUI: function() {
			var instance = this;

		},

		/**
		 * Render phase
		 *
		 * @method renderUI
		 */
		renderUI: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var buttonsNode = instance.get(BUTTONS_NODE);
			var contentBox = instance.get(CONTENT_BOX);
			var labelNode = instance.get(LABEL_NODE);
			var templateNode = instance.get(TEMPLATE_NODE);

			if (!boundingBox.contains(buttonsNode)) {
				boundingBox.prepend(buttonsNode);
			}

			if (!contentBox.contains(labelNode)) {
				contentBox.append(labelNode);

				labelNode.setAttribute(
					FOR,
					templateNode.get(ID)
				);
			}

			if (!contentBox.contains(templateNode)) {
				contentBox.append(templateNode);
			}
		},

		/**
		 * Saves the settings info from the settings form to the settings
		 * attribute
		 *
		 * @method saveSettings
		 */
		saveSettings: function() {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);

			A.Array.each(
				A.io._serialize(formNode._node).split('&'),
				function(item) {
					var keyVal = item.split('=');

					instance.set(keyVal[0], decodeURIComponent(keyVal[1]));
				}
			);
		},

		/**
		 * Renders the settings UI
		 *
		 * @method renderSettings
		 */
		renderSettings: function() {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);

			if (!instance.fieldSettingsNode) {
				instance.fieldSettingsNode = A.Node.create(TPL_DIV);

				var propertiesNode = A.Node.create(TPL_DIV);

				instance.labelField = new A.Field(
					{
						type: 'text',
						name: LABEL,
						labelText: 'Label',
						value: instance.get(LABEL)
					}
				).render(propertiesNode);

				instance.labelField.get(NODE).on(
					{
						keyup: A.bind(instance._onLabelKeyUp, instance)
					}
				);

				instance.showLabelField = new A.Field(
					{
						type: 'checkbox',
						name: SHOW_LABEL,
						labelText: 'Show label',
						labelAlign: 'left',
						value: instance.get(SHOW_LABEL)
					}
				).render(propertiesNode);

				var showLabelFieldNode = instance.showLabelField.get(NODE);

				showLabelFieldNode.set(CHECKED, instance.get(SHOW_LABEL));

				showLabelFieldNode.on(
					{
						change: A.bind(instance._onSettingsFieldChange, instance)
					}
				);

				instance._renderSettingsFields(
					[
						{
							type: 'text',
							name: NAME,
							labelText: 'Name',
							value: instance.get(NAME)
						},
						{
							type: 'text',
							name: PREDEFINED_VALUE,
							labelText: 'Default value',
							value: instance.get(PREDEFINED_VALUE)
						}
					],
					propertiesNode
				);

				instance.requiredField = new A.Field(
					{
						type: 'checkbox',
						name: REQUIRED,
						labelText: 'Required',
						labelAlign: 'left',
						value: REQUIRED
					}
				).render(propertiesNode);

				var requiredFieldNode = instance.requiredField.get(NODE);

				requiredFieldNode.set(CHECKED, instance.get(REQUIRED));

				requiredFieldNode.on(
					{
						change: A.bind(instance._onSettingsFieldChange, instance)
					}
				);

				instance.propertiesPanel = new A.Panel(
					{
						bodyContent: propertiesNode,
						collapsible: true,
						title: 'Properties'
					}
				).render();

				instance.fieldSettingsNode.append(instance.propertiesPanel.get(BOUNDING_BOX));
			}

			formNode.setContent(instance.fieldSettingsNode);
		},

		/**
		 * Returns the HTML content of the field
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			//
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getNode
		 */
		getNode: function() {
			//
		},

		_onLabelKeyUp: function(event) {
			var instance = this;
			var target = event.target;
			var value = target.val();

			instance.set(LABEL, value);
		},

		_onSettingsFieldChange: function(event)  {
			var instance = this;
			var target = event.target;
			var value = target.val();

			if (target.get(TYPE) == CHECKBOX) {
				value = target.get(CHECKED);
			}

			instance.set(target.get(NAME), value);
		},

		/**
		 * Renders settings fields according to the given array of A.Field
		 * configuration objects
		 *
		 * @method _renderSettingsFields
		 */
		_renderSettingsFields: function(fields, container) {
			var instance = this;

			A.each(fields, function(config) {
				var field = new A.Field(config).render(container);
				var fieldNode = field.get(NODE);

				if (config.type == CHECKBOX) {
					fieldNode.set(CHECKED, config.value);
				}

				instance[config.name + 'Field'] = field;
			});
		},

		_uiSetAcceptChildren: function(val) {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var dropZone = instance.get(DROP_ZONE_NODE);
			var markupDropZone = boundingBox.one(DOT + CSS_FORM_BUILDER_DROP_ZONE);

			if (val && !markupDropZone) {
				boundingBox.append(dropZone);
			}
			else if (!val && markupDropZone) {
				markupDropZone.remove();
			}
			else if (val && markupDropZone) {
				instance.set(DROP_ZONE_NODE, markupDropZone);
			}
		},

		_uiSetLabel: function(val) {
			var instance = this;
			var labelNode = instance.get(LABEL_NODE);

			labelNode.setContent(val);
		},

		_uiSetName: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.set(NAME, val);
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.val(val);
		},

		_uiSetShowLabel: function(val)  {
			var instance = this;
			var labelNode = instance.get(LABEL_NODE);

			labelNode.toggleClass(CSS_HELPER_HIDDEN, !val);
		}

	}

});

A.FormBuilderField = FormBuilderField;

A.FormBuilder.types['field'] = A.FormBuilderField;
var L = A.Lang,
	isArray = L.isArray,
	isNumber = L.isNumber,
	isString = L.isString,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	toInitialCap = A.cached(
		function(str) {
			return str.substring(0, 1).toUpperCase() + str.substring(1);
		}
	),

	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	BUTTON_TYPE = 'buttonType',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DOT = '.',
	DRAG = 'drag',
	DRAG_CONTAINER = 'dragContainer',
	DRAG_CONTAINER_NODE = 'dragContainerNode',
	DRAG_NODES_LIST = 'dragNodesList',
	DROP = 'drop',
	DROP_CONTAINER = 'dropContainer',
	DROP_CONTAINER_NODE = 'dropContainerNode',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_BUTTON_FIELD = 'form-builder-button-field',
	ID = 'id',
	ICON = 'icon',
	INPUT = 'input',
	LABEL = 'label',
	NAME = 'name',
	NODE = 'node',
	OPTION = 'option',
	OPTIONS = 'options',
	PORTAL_LAYOUT = 'portalLayout',
	PREDEFINED_VALUE = 'predefinedValue',
	PROXY = 'proxy',
	RESET = 'reset',
	SELECTED = 'selected',
	SELECTED_INDEX = 'selectedIndex',
	SUBMIT = 'submit',
	SPACE = ' ',
	STRINGS = 'strings',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TYPE = 'type',
	VALUE = 'value',

	getCN = A.ClassNameManager.getClassName,

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_INPUT_FIELD_NODE = getCN(FORM_BUILDER_INPUT_FIELD, NODE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_INPUT = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD_INPUT].join(SPACE) + '" name="{name}" type="{type}" value="{value}" />',

	BUTTON_TYPES = [SUBMIT, RESET, BUTTON]

var FormBuilderButtonField = A.Component.create({

	NAME: FORM_BUILDER_BUTTON_FIELD,

	ATTRS: {

		/**
		 * Wether the field accepts children or nothing
		 *
		 * @attribute acceptChildren
		 */
		acceptChildren: {
			value: false,
			readOnly: true
		},

		/**
		 * Specifies the type of the button field
		 *
		 * @attribute buttonType
		 */
		buttonType: {
			value: SUBMIT,
			validator: function(val) {
				return A.Array(BUTTON_TYPES).indexOf(val.toLowerCase()) > -1;
			}
		},

		/**
		 * The default value of the field
		 *
		 * @attribute value
		 */
		predefinedValue: {
			value: toInitialCap(SUBMIT)
		},

		/**
		 * Whether to show the label or not
		 *
		 * @attribute showLabel
		 */
		showLabel: {
			value: false
		},

		/**
		 * Strings messages
		 *
		 * @attribute strings
		 */
		strings: {
			value:
			{
				button: 'Button',
				reset: 'Reset',
				submit: 'Submit'
			}
		},

		/**
		 * The HTML template of the field
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_INPUT;
			}
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, BUTTON_TYPE, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderField,

	prototype: {

		/**
		 * Returns the HTML content of the field
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			var instance = this;
			var template = instance.get(TEMPLATE);
			var id = instance.get(ID);
			var label = instance.get(LABEL);
			var name = instance.get(NAME);
			var buttonType = instance.get(BUTTON_TYPE);
			var value = instance.get(PREDEFINED_VALUE);

			return A.substitute(
				template,
				{
					id: id,
					label: label,
					name: name,
					type: buttonType,
					value: value
				}
			)
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getFieldNode
		 */
		getNode: function() {
			var instance = this;

			return A.Node.create(instance.getHTML());
		},

		renderSettings: function() {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);
			var buttonType = instance.get(BUTTON_TYPE);
			var strings = instance.get(STRINGS);

			A.FormBuilderButtonField.superclass.renderSettings.apply(instance, arguments);

			if (!instance._renderedButtonSettings) {
				instance._renderedButtonSettings = true;

				var panelBody = instance.propertiesPanel.get(BODY_CONTENT);

				var selectFieldOptions = [];

				A.each(BUTTON_TYPES, function(item){
					selectFieldOptions.push(
						{
							labelText: strings[item],
							value: item
						}
					);
				});

				var selectField = new A.Select(
					{
						labelText: 'Button type',
						name: BUTTON_TYPE,
						options: selectFieldOptions
					}
				).render(panelBody.item(0));

				var selectFieldNode = selectField.get(NODE);

				selectFieldNode.on({
					change: A.bind(instance._onButtonTypeChange, instance)
				});

				var selectedIndex = A.Array(BUTTON_TYPES).indexOf(buttonType);

				selectFieldNode.all(OPTION).item(selectedIndex).set(SELECTED, true);
			}
		},

		_onButtonTypeChange: function(event) {
			var instance = this;
			var target = event.target;

			instance.set(BUTTON_TYPE, target.get(VALUE));
		},

		_uiSetButtonType: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.set(TYPE, val);
		}

	}

});

A.FormBuilderButtonField = FormBuilderButtonField;

A.FormBuilder.types['button'] = A.FormBuilderButtonField;
var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isString = L.isString,

	BOUNDING_BOX = 'boundingBox',
	BODY_CONTENT = 'bodyContent',
	CHECKBOX = 'checkbox',
	CHECKED = 'checked',
	CHOICE = 'choice',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DOT = '.',
	DRAG = 'drag',
	DRAG_CONTAINER = 'dragContainer',
	DRAG_CONTAINER_NODE = 'dragContainerNode',
	DRAG_NODES_LIST = 'dragNodesList',
	DROP = 'drop',
	DROP_CONTAINER = 'dropContainer',
	DROP_CONTAINER_NODE = 'dropContainerNode',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_CHECKBOX_FIELD = 'form-builder-checkbox-field',
	ID = 'id',
	ICON = 'icon',
	INLINE = 'inline',
	LABEL = 'label',
	LABELS = 'labels',
	NAME = 'name',
	NODE = 'node',
	PORTAL_LAYOUT = 'portalLayout',
	PREDEFINED_VALUE = 'predefinedValue',
	PROXY = 'proxy',
	SIZE = 'size',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	VALUE = 'value',

	getCN = A.ClassNameManager.getClassName,

	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_CHECKBOX = getCN(FIELD, CHECKBOX),
	CSS_FIELD_CHOICE = getCN(FIELD, CHOICE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_CHECKBOX = getCN(FORM_BUILDER_FIELD, CHECKBOX),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),
	CSS_FIELD_LABELS_INLINE = getCN(FIELD, LABELS, INLINE),

	TPL_BOUNDING_BOX = '<li class="' + [CSS_WIDGET, CSS_COMPONENT, CSS_FORM_BUILDER_FIELD, CSS_FORM_BUILDER_FIELD_CHECKBOX].join(SPACE) + '"></li>',

	TPL_CHECKBOX = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_CHECKBOX, CSS_FIELD_CHOICE].join(SPACE) + '" name="{name}" type="checkbox" value="{value}" {checked} />'

var FormBuilderCheckBoxField = A.Component.create({

	NAME: FORM_BUILDER_CHECKBOX_FIELD,

	ATTRS: {

		/**
		 * The checked state of the checkbox field
		 *
		 * @attribute predefinedValue
		 */
		predefinedValue: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		/**
		 * The HTML template of the field
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_CHECKBOX;
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		templateNode: {
			valueFn: 'getNode'
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderField,

	prototype: {
		BOUNDING_TEMPLATE: TPL_BOUNDING_BOX,

		/**
		 * Bind phase
		 *
		 * @method bindUI
		 */
		bindUI: function() {
			var instance = this;

			A.FormBuilderCheckBoxField.superclass.bindUI.apply(instance, arguments);

			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.on(
				{
					'change': A.bind(instance._onValueChange, instance)
				}
			);
		},

		/**
		 * Render phase
		 *
		 * @method renderUI
		 */
		renderUI: function() {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);
			var templateNode = instance.get(TEMPLATE_NODE);
			var labelNode = instance.get(LABEL_NODE);

			A.FormBuilderCheckBoxField.superclass.renderUI.apply(instance, arguments);

			labelNode.insert(templateNode, labelNode, 'before');
		},

		/**
		 * Returns the HTML content of the field
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			var instance = this;
			var template = instance.get(TEMPLATE);
			var checked = instance.get(CHECKED);
			var id = instance.get(ID);
			var label = instance.get(LABEL);
			var name = instance.get(NAME);
			var value = instance.get(PREDEFINED_VALUE);

			return A.substitute(
				template,
				{
					checked: checked ? 'checked="checked"' : EMPTY_STR,
					id: id,
					label: label,
					name: name,
					value: value
				}
			)
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getFieldNode
		 */
		getNode: function() {
			var instance = this;

			return A.Node.create(instance.getHTML());
		},

		renderSettings: function() {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);

			A.FormBuilderCheckBoxField.superclass.renderSettings.apply(instance, arguments);

			if (!instance._renderedCheckboxSettings) {
				instance._renderedCheckboxSettings = true;

				instance.predefinedValueField.destroy();

				var panelBody = instance.propertiesPanel.get(BODY_CONTENT);

				var checkedField = new A.Field(
					{
						type: 'checkbox',
						name: PREDEFINED_VALUE,
						labelText: 'Checked',
						labelAlign: 'left'
					}
				).render(panelBody.item(0));

				instance.checkedFieldNode = checkedField.get(NODE);

				instance.checkedFieldNode.on(
					{
						change: A.bind(instance._onValueChange, instance)
					}
				);

				instance.checkedFieldNode.set(CHECKED, instance.get(PREDEFINED_VALUE));
			}
		},

		_onValueChange: function(event) {
			var instance = this;
			var target = event.target;

			instance.set(PREDEFINED_VALUE, target.get(CHECKED));
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);
			var checkedFieldNode = instance.checkedFieldNode;

			if (checkedFieldNode) {
				checkedFieldNode.set(CHECKED, val);
			}

			templateNode.set(CHECKED, val);
		}

	}

});

A.FormBuilderCheckBoxField = FormBuilderCheckBoxField;

A.FormBuilder.types['checkbox'] = A.FormBuilderCheckBoxField;
var L = A.Lang,
	isArray = L.isArray,
	isNumber = L.isNumber,
	isString = L.isString,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DOT = '.',
	DROP = 'drop',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_FIELDSET_FIELD = 'form-builder-fieldset-field',
	ID = 'id',
	ICON = 'icon',
	LABEL = 'label',
	NAME = 'name',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	VALUE = 'value',
	ZONE = 'zone',

	getCN = A.ClassNameManager.getClassName,

	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),

	TPL_FIELDSET = '<fieldset id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE].join(SPACE) + '"></fieldset>',

	TPL_LEGEND = '<legend class="' + CSS_FIELD_LABEL + '"></legend>'

var FormBuilderFieldsetField = A.Component.create({

	NAME: FORM_BUILDER_FIELDSET_FIELD,

	ATTRS: {

		/**
		 * Wether the field accepts children or nothing
		 *
		 * @attribute acceptChildren
		 */
		acceptChildren: {
			value: true,
			readOnly: true
		},

		/**
		 * The HTML template of the field
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_FIELDSET;
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		labelNode: {
			valueFn: function() {
				return A.Node.create(TPL_LEGEND);
			}
		},

		templateNode: {
			valueFn: 'getNode'
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, LABEL, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderField,

	prototype: {
		CONTENT_TEMPLATE: TPL_FIELDSET,

		/**
		 * Render phase
		 *
		 * @method renderUI
		 */
		renderUI: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var buttonsNode = instance.get(BUTTONS_NODE);
			var contentBox = instance.get(CONTENT_BOX);
			var labelNode = instance.get(LABEL_NODE);
			var templateNode = instance.get(TEMPLATE_NODE);

			if (!boundingBox.contains(buttonsNode)) {
				boundingBox.prepend(buttonsNode);
			}

			if (!contentBox.contains(labelNode)) {
				contentBox.append(labelNode);
			}
		},

		/**
		 * Returns the HTML content of the field
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			var instance = this;
			var template = instance.get(TEMPLATE);
			var id = instance.get(ID);

			return A.substitute(
				template,
				{
					id: id
				}
			)
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getNode
		 */
		getNode: function() {
			var instance = this;

			return A.Node.create(instance.getHTML());
		},

		/**
		 * Renders the settings UI
		 *
		 * @method renderSettings
		 */
		renderSettings: function() {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);

			if (!instance._renderedFieldsetSettings) {
				instance._renderedFieldsetSettings = true;

				instance.fieldSettingsNode = A.Node.create(TPL_DIV);

				var propertiesNode = A.Node.create(TPL_DIV);

				instance.labelField = new A.Field(
					{
						type: 'text',
						name: LABEL,
						labelText: 'Label',
						value: instance.get(LABEL)
					}
				).render(propertiesNode);

				instance.labelField.get(NODE).on(
					{
						keyup: A.bind(instance._onLabelKeyUp, instance)
					}
				);

				instance.showLabelField = new A.Field(
					{
						type: 'checkbox',
						name: SHOW_LABEL,
						labelText: 'Show label',
						labelAlign: 'left',
						value: instance.get(SHOW_LABEL)
					}
				).render(propertiesNode);

				var showLabelFieldNode = instance.showLabelField.get(NODE);

				showLabelFieldNode.set(CHECKED, instance.get(SHOW_LABEL));

				showLabelFieldNode.on(
					{
						change: A.bind(instance._onSettingsFieldChange, instance)
					}
				);

				instance.propertiesPanel = new A.Panel(
					{
						bodyContent: propertiesNode,
						collapsible: true,
						title: 'Properties'
					}
				).render();

				instance.fieldSettingsNode.append(instance.propertiesPanel.get(BOUNDING_BOX));
			}

			formNode.setContent(instance.fieldSettingsNode);
		},

		_uiSetAcceptChildren: function(val) {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);
			var dropZone = instance.get(DROP_ZONE_NODE);
			var markupDropZone = contentBox.one(DOT + CSS_FORM_BUILDER_DROP_ZONE);

			if (val && !markupDropZone) {
				contentBox.append(dropZone);
			}
			else if (!val && markupDropZone) {
				markupDropZone.remove();
			}
			else if (val && markupDropZone) {
				instance.set(DROP_ZONE_NODE, markupDropZone);
			}
		},

	}

});

A.FormBuilderFieldsetField = FormBuilderFieldsetField;

A.FormBuilder.types['fieldset'] = A.FormBuilderFieldsetField;
var L = A.Lang,
	isArray = L.isArray,
	isNumber = L.isNumber,
	isString = L.isString,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DOT = '.',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_FILE_UPLOAD_FIELD = 'form-builder-file-upload-field',
	ID = 'id',
	ICON = 'icon',
	LABEL = 'label',
	NAME = 'name',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	VALUE = 'value',

	getCN = A.ClassNameManager.getClassName,

	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_FILE_UPLOAD = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE].join(SPACE) + '" name="{name}" type="file" value="{value}" />'

var FormBuilderFileUploadField = A.Component.create({

	NAME: FORM_BUILDER_FILE_UPLOAD_FIELD,

	ATTRS: {

		/**
		 * The HTML template of the field
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_FILE_UPLOAD;
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		templateNode: {
			valueFn: 'getNode'
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderField,

	prototype: {

		/**
		 * Returns the HTML content of the field
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			var instance = this;
			var template = instance.get(TEMPLATE);
			var id = instance.get(ID);
			var label = instance.get(LABEL);
			var name = instance.get(NAME);
			var size = instance.get(SIZE);
			var value = instance.get(PREDEFINED_VALUE);

			return A.substitute(
				template,
				{
					id: id,
					label: label,
					name: name,
					value: value
				}
			)
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getFieldNode
		 */
		getNode: function() {
			var instance = this;

			return A.Node.create(instance.getHTML());
		},

		/**
		 * Renders the settings UI
		 *
		 * @method renderSettings
		 */
		renderSettings: function() {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);

			if (!instance._renderedFileUploadSettings) {
				instance._renderedFileUploadSettings = true;

				instance.fieldSettingsNode = A.Node.create(TPL_DIV);

				var propertiesNode = A.Node.create(TPL_DIV);

				instance.labelField = new A.Field(
					{
						type: 'text',
						name: LABEL,
						labelText: 'Label',
						value: instance.get(LABEL)
					}
				).render(propertiesNode);

				instance.labelField.get(NODE).on(
					{
						keyup: A.bind(instance._onLabelKeyUp, instance)
					}
				);

				instance.showLabelField = new A.Field(
					{
						type: 'checkbox',
						name: SHOW_LABEL,
						labelText: 'Show label',
						labelAlign: 'left',
						value: instance.get(SHOW_LABEL)
					}
				).render(propertiesNode);

				var showLabelFieldNode = instance.showLabelField.get(NODE);

				showLabelFieldNode.set(CHECKED, instance.get(SHOW_LABEL));

				showLabelFieldNode.on(
					{
						change: A.bind(instance._onSettingsFieldChange, instance)
					}
				);

				instance._renderSettingsFields(
					[
						{
							type: 'text',
							name: NAME,
							labelText: 'Name',
							value: instance.get(NAME)
						},
						{
							type: 'checkbox',
							name: REQUIRED,
							labelText: 'Required',
							labelAlign: 'left',
							value: instance.get(REQUIRED)
						}
					],
					propertiesNode
				);

				instance.propertiesPanel = new A.Panel(
					{
						bodyContent: propertiesNode,
						collapsible: true,
						title: 'Properties'
					}
				).render();

				instance.fieldSettingsNode.append(instance.propertiesPanel.get(BOUNDING_BOX));
			}

			formNode.setContent(instance.fieldSettingsNode);
		}

	}

});

A.FormBuilderFileUploadField = FormBuilderFileUploadField;

A.FormBuilder.types['fileupload'] = A.FormBuilderFileUploadField;
var L = A.Lang,
	isArray = L.isArray,
	isNumber = L.isNumber,
	isString = L.isString,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DOT = '.',
	DRAG = 'drag',
	DRAG_CONTAINER = 'dragContainer',
	DRAG_CONTAINER_NODE = 'dragContainerNode',
	DRAG_NODES_LIST = 'dragNodesList',
	DROP = 'drop',
	DROP_CONTAINER = 'dropContainer',
	DROP_CONTAINER_NODE = 'dropContainerNode',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_INPUT_FIELD = 'form-builder-input-field',
	ID = 'id',
	ICON = 'icon',
	INPUT = 'input',
	LABEL = 'label',
	NAME = 'name',
	NODE = 'node',
	PORTAL_LAYOUT = 'portalLayout',
	PREDEFINED_VALUE = 'predefinedValue',
	PROXY = 'proxy',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	VALUE = 'value',

	getCN = A.ClassNameManager.getClassName,

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_INPUT_FIELD_NODE = getCN(FORM_BUILDER_INPUT_FIELD, NODE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_INPUT = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT].join(SPACE) + '" name="{name}" type="text" value="{value}" />'

var FormBuilderInputField = A.Component.create({

	NAME: FORM_BUILDER_INPUT_FIELD,

	ATTRS: {

		/**
		 * The HTML template of the field
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_INPUT;
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		templateNode: {
			valueFn: 'getNode'
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderField,

	prototype: {

		/**
		 * Bind phase
		 *
		 * @method bindUI
		 */
		bindUI: function() {
			var instance = this;

			A.FormBuilderInputField.superclass.bindUI.apply(instance, arguments);

			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.on(
				{
					'keyup': A.bind(instance._onValueKeyUp, instance)
				}
			);
		},

		/**
		 * Returns the HTML content of the field
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			var instance = this;
			var template = instance.get(TEMPLATE);
			var id = instance.get(ID);
			var label = instance.get(LABEL);
			var name = instance.get(NAME);
			var size = instance.get(SIZE);
			var value = instance.get(PREDEFINED_VALUE);

			return A.substitute(
				template,
				{
					id: id,
					label: label,
					name: name,
					value: value
				}
			)
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getFieldNode
		 */
		getNode: function() {
			var instance = this;

			return A.Node.create(instance.getHTML());
		},

		renderSettings: function() {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);

			A.FormBuilderCheckBoxField.superclass.renderSettings.apply(instance, arguments);

			if (!instance._renderedInputSettings) {
				instance._renderedInputSettings = true;

				var predefinedValueNode = formNode.one('input[name=predefinedValue]');

				predefinedValueNode.on(
					{
						'keyup': A.bind(instance._onValueKeyUp, instance)
					}
				);
			}
		},

		/**
		 * Handles the onKeyUp event for the value nodes
		 *
		 * @method _onValueKeyUp
		 */
		_onValueKeyUp: function(event) {
			var instance = this;
			var target = event.target;

			instance.set(PREDEFINED_VALUE, target.val());
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);
			var predefinedValueNode = formNode.one('input[name=predefinedValue]');
			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.val(val);

			if (predefinedValueNode && instance.get(SELECTED)) {
				predefinedValueNode.val(val);
			}
		}

	}

});

A.FormBuilderInputField = FormBuilderInputField;

A.FormBuilder.types['text'] = A.FormBuilderInputField;
var L = A.Lang,
	isArray = L.isArray,
	isNumber = L.isNumber,
	isString = L.isString,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	toInitialCap = A.cached(
		function(str) {
			return str.substring(0, 1).toUpperCase() + str.substring(1);
		}
	),

	ADD = 'add',
	ADD_NODE = 'addNode',
	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	BUTTON_TYPE = 'buttonType',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DEFAULT = 'default',
	DEFAULT_NAME = 'defaultName',
	DEFAULT_OPTIONS = 'defaultOptions',
	DEFAULT_VALUE = 'defaultValue',
	DOT = '.',
	DRAG = 'drag',
	DRAG_CONTAINER = 'dragContainer',
	DRAG_CONTAINER_NODE = 'dragContainerNode',
	DRAG_NODES_LIST = 'dragNodesList',
	DROP = 'drop',
	DROP_CONTAINER = 'dropContainer',
	DROP_CONTAINER_NODE = 'dropContainerNode',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_MULTIPLE_CHOICE_FIELD = 'form-builder-multiple-choice-field',
	ICON = 'icon',
	ID = 'id',
	INPUT = 'input',
	ITEM = 'item',
	LABEL = 'label',
	MULTIPLE = 'multiple',
	NAME = 'name',
	NODE = 'node',
	OPTION = 'option',
	OPTION_TEMPLATE = 'optionTemplate',
	OPTIONS = 'options',
	PREDEFINED_VALUE = 'predefinedValue',
	PROXY = 'proxy',
	REMOVE = 'remove',
	RESET = 'reset',
	SUBMIT = 'submit',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TYPE = 'type',
	VALUE = 'value',

	getCN = A.ClassNameManager.getClassName,

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FIELD_OPTIONS_ADD = getCN(FIELD, OPTIONS, ADD),
	CSS_FIELD_OPTIONS_ITEM = getCN(FIELD, OPTIONS, ITEM),
	CSS_FIELD_OPTIONS_ITEM_INPUT = getCN(FIELD, OPTIONS, ITEM, INPUT),
	CSS_FIELD_OPTIONS_ITEM_INPUT_NAME = getCN(FIELD, OPTIONS, ITEM, INPUT, NAME),
	CSS_FIELD_OPTIONS_ITEM_INPUT_VALUE = getCN(FIELD, OPTIONS, ITEM, INPUT, VALUE),
	CSS_FIELD_OPTIONS_ITEM_REMOVE = getCN(FIELD, OPTIONS, ITEM, REMOVE),

	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_INPUT_FIELD_NODE = getCN(FORM_BUILDER_INPUT_FIELD, NODE),

	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_OPTION = '<div class="' + [CSS_FIELD_OPTIONS_ITEM, CSS_FIELD_LABELS_INLINE, CSS_HELPER_CLEARFIX].join(SPACE) + '">' +
					'<input type="text" name="name" class="' + [CSS_FIELD_OPTIONS_ITEM_INPUT, CSS_FIELD_OPTIONS_ITEM_INPUT_NAME, CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT].join(SPACE) + '" value="{name}" />' +
					'<input type="text" name="value" class="' + [CSS_FIELD_OPTIONS_ITEM_INPUT, CSS_FIELD_OPTIONS_ITEM_INPUT_VALUE, CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT].join(SPACE) + '" value="{value}" />' +
					'<a href="javascript:;" class="' + CSS_FIELD_OPTIONS_ITEM_REMOVE + '">&nbsp;</a>' +
				 '</div>';

	TPL_ADD = '<a class="' + CSS_FIELD_OPTIONS_ADD + '" href="javascript:;">Add an option</a>',

	ENTER = 'ENTER';

var FieldOptions = A.Component.create({

	NAME: OPTIONS,

	ATTRS: {

		allowClear: {
			value: false
		},

		defaultName: {
			value: EMPTY_STR
		},

		defaultValue: {
			value: EMPTY_STR
		},

		options: {
			value: [],
			getter: '_getOptions',
			validator: isArray
		},

		addNode: {
			valueFn: function() {
				return A.Node.create(TPL_ADD);
			}
		}

	},

	HTML_PARSER: {
		addNode: DOT + CSS_FIELD_OPTIONS_ADD
	},

	UI_ATTRS: [OPTIONS],

	EXTENDS: A.Widget,

	prototype: {

		renderUI: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var addNode = instance.get(ADD_NODE);

			if (!addNode.inDoc()) {
				boundingBox.append(addNode);
			}
		},

		bindUI: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var addNode = instance.get(ADD_NODE);

			addNode.on('click', A.bind(instance._onClickAdd, instance));

			boundingBox.delegate('click', A.bind(instance._onClickOptionRemove, instance), DOT + CSS_FIELD_OPTIONS_ITEM_REMOVE);
			boundingBox.delegate('keypress', A.bind(instance._onKeyPressOption, instance), DOT + CSS_FIELD_OPTIONS_ITEM_INPUT);
		},

		add: function(option) {
			var instance = this;
			var options = instance.get(OPTIONS);

			options.push(option);

			instance.set(OPTIONS, options);
		},

		clear: function() {
			var instance = this;

			if (instance.get(ALLOW_CLEAR)) {
				instance.set(OPTIONS, []);
			}
		},

		remove: function(index) {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);
			var optionNode = instance._getOptionNode(index);

			if (optionNode) {
				optionNode.remove();
			}

			instance.items = contentBox.all(DOT + CSS_FIELD_OPTIONS_ITEM);
		},

		_addNewOption: function() {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);

			var newOptionNode = instance._createOption(
				{
					name: instance.get(DEFAULT_NAME),
					value: instance.get(DEFAULT_VALUE)
				}
			);

			newOptionNode = A.Node.create(newOptionNode);

			contentBox.append(newOptionNode);

			var newOptionNodeInput = newOptionNode.one(INPUT);

			newOptionNodeInput.focus();
			newOptionNodeInput.select();

			instance.items = contentBox.all(DOT + CSS_FIELD_OPTIONS_ITEM);

			return newOptionNode;
		},

		_createOption: function(option) {
			var  instance = this;

			return A.substitute(TPL_OPTION, option);
		},

		_getOptionNode: function(index) {
			var instance = this;

			return instance.items.item(index);
		},

		_getOptions: function(val) {
			var instance = this;
			var options = [];

			if (instance.items) {
				A.each(instance.items, function(option) {
					var nameInput = option.one(DOT + CSS_FIELD_OPTIONS_ITEM_INPUT_NAME);
					var valueInput = option.one(DOT + CSS_FIELD_OPTIONS_ITEM_INPUT_VALUE);

					options.push(
						{
							name: nameInput.val(),
							value: valueInput.val()
						}
					);
				});
			}
			else {
				options = val;
			}

			return options;
		},

		_indexOfTarget: function(target) {
			var instance = this;
			var currentItem = target.ancestor(DOT + CSS_FIELD_OPTIONS_ITEM);

			return instance.items.indexOf(currentItem);
		},

		_onClickAdd: function(event) {
			var instance = this;

			instance._addNewOption();
		},

		_onClickOptionRemove: function(event) {
			var instance = this;
			var options = instance.get(OPTIONS);
			var index = instance._indexOfTarget(event.target);

			instance.remove(index);
		},

		_onKeyPressOption: function(event) {
			var instance = this;
			var options = instance.get(OPTIONS);
			var target = event.currentTarget;
			var items = instance.items;

			if (event.isKey(ENTER)) {
				var index = instance._indexOfTarget(target);
				var isValue = target.hasClass(CSS_FIELD_OPTIONS_ITEM_INPUT_VALUE);

				if ((index == items.size() - 1) && isValue) {
					instance._addNewOption();
				}
			}
		},

		_uiSetOptions: function(val) {
			var instance = this;
			var buffer = [];
			var contentBox = instance.get(CONTENT_BOX);

			contentBox.empty();

			A.each(val, function(item) {
				contentBox.append(instance._createOption(item));
			});

			instance.items = contentBox.all(DOT + CSS_FIELD_OPTIONS_ITEM);
		}
	}
});

var FormBuilderMultipleChoiceField = A.Component.create({

	NAME: FORM_BUILDER_MULTIPLE_CHOICE_FIELD,

	ATTRS: {

		/**
		 * Wether the field accepts children or nothing
		 *
		 * @attribute acceptChildren
		 */
		acceptChildren: {
			value: false,
			readOnly: true
		},

		/**
		 * The options of the multiple choice field
		 *
		 * @attribute options
		 */
		options: {
			value:
			[
				{
					name: 'option 1',
					value: 'value 1'
				},
				{
					name: 'option 2',
					value: 'value 2'
				},
				{
					name: 'option 3',
					value: 'value 3'
				}
			]
		},

		/**
		 * The template for each option
		 *
		 * @attribute optionTemplate
		 */
		optionTemplate: {
			value: '<option value="{value}">{name}</option>'
		},

	},

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, OPTIONS, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderField,

	prototype: {

		/**
		 * Initializer
		 *
		 * @method initializer
		 */
		initializer: function() {
			var instance = this;

			A.FormBuilderMultipleChoiceField.superclass.initializer.apply(instance, arguments);
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getFieldNode
		 */
		getNode: function() {
			var instance = this;

			return A.FormBuilderMultipleChoiceField.superclass.getNode.apply(instance, arguments);
		},

		/**
		 * Renders the settings UI
		 *
		 * @method renderSettings
		 */
		renderSettings: function() {
			var instance = this;

			A.FormBuilderMultipleChoiceField.superclass.renderSettings.apply(instance, arguments);

			if (!instance._renderedMultipleChoiceSettings) {
				instance._renderedMultipleChoiceSettings = true;

				var optionsPanelBody = A.Node.create(TPL_DIV);

				instance.optionsPanel = new A.Panel(
					{
						bodyContent: optionsPanelBody,
						collapsible: true,
						title: 'Options'
					}
				).render();

				instance.options = new FieldOptions(
					{
						options: instance.get(OPTIONS)
					}
				).render(optionsPanelBody);

				instance.fieldSettingsNode.append(instance.optionsPanel.get(BOUNDING_BOX));
			}
		},

		/**
		 * Saves the settings info from the settings form to the settings
		 * attribute
		 *
		 * @method saveSettings
		 */
		saveSettings: function() {
			var instance = this;

			A.FormBuilderMultipleChoiceField.superclass.saveSettings.apply(instance, arguments);

			instance.set(OPTIONS, instance.options.get(OPTIONS));
		},

		_uiSetOptions: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.empty();

			A.each(val, function(item) {
				templateNode.append(
					A.substitute(instance.get(OPTION_TEMPLATE), item)
				);
			});
		}

	}

});

A.FormBuilderMultipleChoiceField = FormBuilderMultipleChoiceField;

A.FormBuilder.types['multiple-choice'] = A.FormBuilderMultipleChoiceField;
var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isString = L.isString,

	BOUNDING_BOX = 'boundingBox',
	BODY_CONTENT = 'bodyContent',
	CHECKED = 'checked',
	CHOICE = 'choice',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DOT = '.',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_RADIO_FIELD = 'form-builder-radio-field',
	ID = 'id',
	ICON = 'icon',
	INLINE = 'inline',
	LABEL = 'label',
	LABELS = 'labels',
	NAME = 'name',
	NODE = 'node',
	OPTIONS_CONTAINER_NODE = 'optionsContainerNode',
	PREDEFINED_VALUE = 'predefinedValue',
	RADIO = 'radio',
	SIZE = 'size',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	VALUE = 'value',

	getCN = A.ClassNameManager.getClassName,

	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_CHOICE = getCN(FIELD, CHOICE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_RADIO = getCN(FORM_BUILDER_FIELD, RADIO),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_FIELD_OPTIONS_CONTAINER = getCN(FORM_BUILDER_FIELD, OPTIONS, CONTAINER),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),
	CSS_FIELD_LABELS_INLINE = getCN(FIELD, LABELS, INLINE),

	TPL_BOUNDING_BOX = '<li class="' + [CSS_WIDGET, CSS_COMPONENT, CSS_FORM_BUILDER_FIELD, CSS_FORM_BUILDER_FIELD_RADIO].join(SPACE) + '"></li>',

	TPL_OPTIONS_CONTAINER = '<div class="' + CSS_FORM_BUILDER_FIELD_OPTIONS_CONTAINER + '"></div>',

	TPL_RADIO = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_CHOICE].join(SPACE) + '" name="{name}" type="radio" value="{value}" {checked} />'

var FormBuilderRadioField = A.Component.create({

	NAME: FORM_BUILDER_RADIO_FIELD,

	ATTRS: {

		/**
		 * The name of the field
		 *
		 * @attribute name
		 */
		name: {
			value: RADIO
		},

		/**
		 * The template for each option
		 *
		 * @attribute optionTemplate
		 */
		optionTemplate: {
			value: TPL_RADIO
		},

		/**
		 * The HTML template of the field
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_RADIO;
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		optionsContainerNode: {
			valueFn: function() {
				return A.Node.create(TPL_OPTIONS_CONTAINER);
			}
		},

		templateNode: {
			valueFn: 'getNode'
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, SHOW_LABEL, OPTIONS],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		optionsContainerNode: DOT + CSS_FORM_BUILDER_FIELD_OPTIONS_CONTAINER,
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderMultipleChoiceField,

	prototype: {
		BOUNDING_TEMPLATE: TPL_BOUNDING_BOX,

		/**
		 * Render phase
		 *
		 * @method renderUI
		 */
		renderUI: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var buttonsNode = instance.get(BUTTONS_NODE);
			var contentBox = instance.get(CONTENT_BOX);
			var labelNode = instance.get(LABEL_NODE);

			if (!boundingBox.contains(buttonsNode)) {
				boundingBox.prepend(buttonsNode);
			}

			if (!contentBox.contains(labelNode)) {
				contentBox.append(labelNode);
			}

			var optionsContainerNode = instance.get(OPTIONS_CONTAINER_NODE);

			if (!contentBox.contains(optionsContainerNode)) {
				contentBox.append(optionsContainerNode);
			}
		},

		/**
		 * Returns the HTML content of the field
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			var instance = this;
			var template = instance.get(TEMPLATE);
			var checked = instance.get(CHECKED);
			var id = instance.get(ID);
			var label = instance.get(LABEL);
			var name = instance.get(NAME);
			var value = instance.get(PREDEFINED_VALUE);

			return A.substitute(
				template,
				{
					checked: checked ? 'checked="checked"' : EMPTY_STR,
					id: id,
					label: label,
					name: name,
					value: value
				}
			)
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getFieldNode
		 */
		getNode: function() {
			var instance = this;

			return A.Node.create(instance.getHTML());
		},

		_onFieldChange: function(event) {
			var instance = this;
			var target = event.target;

			instance.set(PREDEFINED_VALUE, target.val());
		},

		_uiSetOptions: function(val) {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);
			var optionsContainerNode = instance.get(OPTIONS_CONTAINER_NODE);
			var templateNode = instance.get(TEMPLATE_NODE);

			optionsContainerNode.empty();

			A.each(val, function(item) {
				var radioField = new A.Field(
					{
						type: RADIO,
						name: instance.get(NAME),
						labelText: item.name,
						labelAlign: 'left',
						value: item.value
					}
				).render(optionsContainerNode);

				var radioFieldNode = radioField.get(NODE);

				if (item.value == instance.get(PREDEFINED_VALUE)) {
					radioFieldNode.set(CHECKED, true);
				}

				radioFieldNode.on(
					{
						change: A.bind(instance._onFieldChange, instance)
					}
				);
			});
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);
			var predefinedValueNode = formNode.one('input[name=predefinedValue]');

			if (predefinedValueNode) {
				predefinedValueNode.val(val);
			}
		}

	}

});

A.FormBuilderRadioField = FormBuilderRadioField;

A.FormBuilder.types['radio'] = A.FormBuilderRadioField;
var L = A.Lang,
	isArray = L.isArray,
	isNumber = L.isNumber,
	isString = L.isString,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	toInitialCap = A.cached(
		function(str) {
			return str.substring(0, 1).toUpperCase() + str.substring(1);
		}
	),

	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	BUTTON_TYPE = 'buttonType',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DEFAULT_OPTIONS = 'defaultOptions',
	DOT = '.',
	DRAG = 'drag',
	DRAG_CONTAINER = 'dragContainer',
	DRAG_CONTAINER_NODE = 'dragContainerNode',
	DRAG_NODES_LIST = 'dragNodesList',
	DROP = 'drop',
	DROP_CONTAINER = 'dropContainer',
	DROP_CONTAINER_NODE = 'dropContainerNode',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_SELECT_FIELD = 'form-builder-select-field',
	ID = 'id',
	ICON = 'icon',
	INPUT = 'input',
	LABEL = 'label',
	MULTIPLE = 'multiple',
	NAME = 'name',
	NODE = 'node',
	OPTION = 'option',
	OPTIONS = 'options',
	PORTAL_LAYOUT = 'portalLayout',
	PREDEFINED_VALUE = 'predefinedValue',
	PROXY = 'proxy',
	RESET = 'reset',
	SELECTED_INDEX = 'selectedIndex',
	SUBMIT = 'submit',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TYPE = 'type',
	VALUE = 'value',

	getCN = A.ClassNameManager.getClassName,

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_INPUT_FIELD_NODE = getCN(FORM_BUILDER_INPUT_FIELD, NODE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_SELECT = '<select id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE].join(SPACE) + '" name="{name}" value="{value}"></select>'

var FormBuilderSelectField = A.Component.create({

	NAME: FORM_BUILDER_SELECT_FIELD,

	ATTRS: {

		/**
		 * Whether the select is multiple or not
		 *
		 * @attribute multiple
		 */
		multiple: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		/**
		 * The HTML template of the field
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_SELECT;
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		templateNode: {
			valueFn: 'getNode'
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, OPTIONS, SHOW_LABEL, MULTIPLE],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderMultipleChoiceField,

	prototype: {

		/**
		 * Returns the HTML content of the field
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			var instance = this;
			var template = instance.get(TEMPLATE);
			var id = instance.get(ID);
			var label = instance.get(LABEL);
			var name = instance.get(NAME);
			var value = instance.get(PREDEFINED_VALUE);

			return A.substitute(
				template,
				{
					id: id,
					label: label,
					name: name,
					value: value
				}
			)
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getFieldNode
		 */
		getNode: function() {
			var instance = this;

			return A.Node.create(instance.getHTML());
		},

		renderSettings: function() {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);

			A.FormBuilderSelectField.superclass.renderSettings.apply(instance, arguments);

			if (!instance._renderedSelectSettings) {
				instance._renderedSelectSettings = true;

				var panelBody = instance.propertiesPanel.get(BODY_CONTENT);

				var multipleField = new A.Field(
					{
						type: 'checkbox',
						name: MULTIPLE,
						labelText: 'Multiple',
						labelAlign: 'left'
					}
				).render(panelBody.item(0));

				var multipleFieldNode = multipleField.get(NODE);

				multipleFieldNode.on(
					{
						change: A.bind(instance._onSettingsFieldChange, instance)
					}
				);

				multipleFieldNode.set(CHECKED, instance.get(MULTIPLE));
			}
		},

		_uiSetMultiple: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			if (val) {
				templateNode.setAttribute(MULTIPLE, MULTIPLE);
			}
			else {
				templateNode.removeAttribute(MULTIPLE);
			}
		}

	}

});

A.FormBuilderSelectField = FormBuilderSelectField;

A.FormBuilder.types['select'] = A.FormBuilderSelectField;
var L = A.Lang,
	isArray = L.isArray,
	isNumber = L.isNumber,
	isString = L.isString,

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DOT = '.',
	DRAG = 'drag',
	DRAG_CONTAINER = 'dragContainer',
	DRAG_CONTAINER_NODE = 'dragContainerNode',
	DRAG_NODES_LIST = 'dragNodesList',
	DROP = 'drop',
	DROP_CONTAINER = 'dropContainer',
	DROP_CONTAINER_NODE = 'dropContainerNode',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_TEXTAREA_FIELD = 'form-builder-textarea-field',
	ID = 'id',
	ICON = 'icon',
	LABEL = 'label',
	NAME = 'name',
	NODE = 'node',
	PORTAL_LAYOUT = 'portalLayout',
	PREDEFINED_VALUE = 'predefinedValue',
	PROXY = 'proxy',
	SIZE = 'size',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TEXTAREA = 'textarea',
	VALUE = 'value',

	getCN = A.ClassNameManager.getClassName,

	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_TEXT = getCN(FIELD, TEXT),
	CSS_FIELD_TEXTAREA = getCN(FIELD, TEXTAREA),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_INPUT_FIELD_NODE = getCN(FORM_BUILDER_INPUT_FIELD, NODE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_TEXTAREA = '<textarea id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_TEXT, CSS_FIELD_TEXTAREA].join(SPACE) + '" name="{name}">{value}</textarea>'

var FormBuilderTextAreaField = A.Component.create({

	NAME: FORM_BUILDER_TEXTAREA_FIELD,

	ATTRS: {

		/**
		 * The HTML template of the field
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_TEXTAREA;
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		templateNode: {
			valueFn: 'getNode'
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderField,

	prototype: {

		/**
		 * Bind phase
		 *
		 * @method bindUI
		 */
		bindUI: function() {
			var instance = this;

			A.FormBuilderInputField.superclass.bindUI.apply(instance, arguments);

			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.on(
				{
					'keyup': A.bind(instance._onValueKeyUp, instance)
				}
			);
		},

		/**
		 * Returns the HTML content of the field
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			var instance = this;
			var template = instance.get(TEMPLATE);
			var id = instance.get(ID);
			var label = instance.get(LABEL);
			var name = instance.get(NAME);
			var size = instance.get(SIZE);
			var value = instance.get(PREDEFINED_VALUE);

			return A.substitute(
				template,
				{
					id: id,
					label: label,
					name: name,
					value: value
				}
			)
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getFieldNode
		 */
		getNode: function() {
			var instance = this;

			return A.Node.create(instance.getHTML());
		},

		renderSettings: function() {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);

			A.FormBuilderCheckBoxField.superclass.renderSettings.apply(instance, arguments);

			if (!instance._renderedTextareaSettings) {
				instance._renderedTextareaSettings = true;

				var predefinedValueNode = formNode.one('input[name=predefinedValue]');

				predefinedValueNode.on(
					{
						'keyup': A.bind(instance._onValueKeyUp, instance)
					}
				);
			}
		},

		/**
		 * Handles the onKeyUp event for the value nodes
		 *
		 * @method _onValueKeyUp
		 */
		_onValueKeyUp: function(event) {
			var instance = this;
			var target = event.target;

			instance.set(PREDEFINED_VALUE, target.val());
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);
			var predefinedValueNode = formNode.one('input[name=predefinedValue]');
			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.val(val);

			if (predefinedValueNode && instance.get(SELECTED)) {
				predefinedValueNode.val(val);
			}
		}

	}

});

A.FormBuilderTextAreaField = FormBuilderTextAreaField;

A.FormBuilder.types['textarea'] = A.FormBuilderTextAreaField;

}, '@VERSION@' ,{requires:['aui-datatype','aui-form','aui-panel','io','substitute'], skinnable:true});


AUI.add('aui-form-builder', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-form-builder-base','aui-form-builder-field']});

