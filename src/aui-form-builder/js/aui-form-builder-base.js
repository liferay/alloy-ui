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
	CONTENT = 'content',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DELETE = 'delete',
	DD = 'dd',
	DEFAULT = 'default',
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

	STRING_EMPTY_SELECTION = 'stringEmptySelection',

	getCN = A.ClassNameManager.getClassName,

	CSS_BUTTON_INPUT = getCN(BUTTON, INPUT),
	CSS_DD_DRAGGING = getCN(DD, DRAGGING),
	CSS_HELPER_HIDDEN = getCN(HELPER, HIDDEN),
	CSS_FORM_BUILDER_BUTTON_DELETE = getCN(FORM, BUILDER, BUTTON, DELETE),
	CSS_FORM_BUILDER_BUTTON_DUPLICATE = getCN(FORM, BUILDER, BUTTON, DUPLICATE),
	CSS_FORM_BUILDER_BUTTON_EDIT = getCN(FORM, BUILDER, BUTTON, EDIT),
	CSS_FORM_BUILDER_BUTTON_SAVE = getCN(FORM, BUILDER, BUTTON, SAVE),
	CSS_FORM_BUILDER_DRAG_CONTAINER = getCN(FORM, BUILDER, DRAG, CONTAINER),
	CSS_FORM_BUILDER_DRAG_NODE = getCN(FORM, BUILDER, DRAG, NODE),
	CSS_FORM_BUILDER_DROP_ACTIVE = getCN(FORM, BUILDER, DROP, ACTIVE),
	CSS_FORM_BUILDER_DROP_CONTAINER = getCN(FORM, BUILDER, DROP, CONTAINER),
	CSS_FORM_BUILDER_DROP_NODE = getCN(FORM, BUILDER, DROP, NODE),
	CSS_FORM_BUILDER_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM, BUILDER, FIELD),
	CSS_FORM_BUILDER_FIELD_BUTTONS = getCN(FORM, BUILDER, FIELD, BUTTONS),
	CSS_FORM_BUILDER_FIELD_CONTENT = getCN(FORM, BUILDER, FIELD, CONTENT),
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

	TPL_DRAG_CONTAINER = '<ul class="' + CSS_FORM_BUILDER_DRAG_CONTAINER + '"></ul>',

	TPL_DRAG_NODE = '<li class="' + [CSS_FORM_BUILDER_DRAG_NODE, CSS_FORM_BUILDER_FIELD].join(SPACE) + '" data-type="{type}">' +
						'<span class="' + [CSS_FORM_BUILDER_ICON, CSS_ICON].join(SPACE) + ' {icon}"></span>' +
						'<span class="' + CSS_FORM_BUILDER_LABEL + '">{label}</span>' +
					'</li>',

	TPL_DROP_CONTAINER = '<ul class="' + [CSS_FORM_BUILDER_DROP_CONTAINER].join(SPACE) + '"></ul>',

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

	INVALID_CLONE_ATTRS = A.Array([BOUNDING_BOX, CONTENT_BOX, SRC_NODE, FIELDS, ID, SELECTED, TEMPLATE_NODE, LABEL_NODE])

var FormBuilderFieldSupport = function() {};

FormBuilderFieldSupport.ATTRS = {
	fields: {
		value: [],
		setter: '_setFields',
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
				field = formBuilder._renderField(field);
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
				stringEmptySelection: 'No field selected'
			}
		},

		/*
		* HTML_PARSER attributes
		*/
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

			instance.after('*:fieldsChange', A.bind(instance.syncFieldsUI, instance));
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
			var newField = instance._cloneField(field);
			var parent = field.get(PARENT);
			var index = parent.indexOf(field);

			parent.insertField(++index, newField);

			instance.selectField(newField);
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

			instance._syncNestedList();
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

			return instance._renderField(config, type);
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

			if (!field) {
				var config = instance._getFieldDefaultConfig(type)

				field = instance._renderField(config);
			}

			var parent = instance._getFieldParentByNode(node);

			parent.insertField(
				nodes.indexOf(node),
				field
			);

			return field;
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

				field.get(PARENT).removeField(field);

				field.set(SELECTED, false);
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
			var dragContainerNode = instance.dragContainerNode;
			var dropContainerNode = instance.dropContainerNode;

			var newFieldNode = dropContainerNode.one(DOT + CSS_FORM_BUILDER_DRAG_NODE);

			if (newFieldNode) {
				var type = newFieldNode.getAttribute('data-type');
				var field = instance._dropField(newFieldNode, type);

				instance.selectField(field);
			}
			else {
				if (dragNode) {
					dragNode.remove();
				}
			}

			if (dragContainerNode.contains(dragNode) &&
				dragContainerNode.contains(instance.originalNode)) {

				dragNode.remove();
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

			instance._dropField(dragNode);
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
		_renderField: function(config, type) {
			var instance = this;

			config[FORM_BUILDER] = instance;
			config[RENDER] = true;

			return instance._getFieldInstance(config, type);
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
			instance.dropNodes = dropContainerNode.all(DOT + CSS_FORM_BUILDER_FIELD);
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
			var buttonsNode = field.buttonsNode;

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
