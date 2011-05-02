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
	AUTO_SELECT_FIELDS = 'autoSelectFields',
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
	DEFAULT_MESSAGE = 'defaultMessage',
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
	EMPTY_SELECTION = 'emptySelection',
	EMPTY_STR = '',
	ENABLE_EDITING = 'enableEditing',
	FIELD = 'field',
	FIELDS = 'fields',
	KEY = 'key',
	FIRST = 'first',
	FIRST_CHILD = 'firstChild',
	FOCUSED = 'focused',
	FORM = 'form',
	FORM_BUILDER = 'formBuilder',
	FORM_LAYOUT = 'form-layout',
	ID = 'id',
	ICON = 'icon',
	INACTIVE = 'inactive',
	INDEX = 'index',
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
	TEXT = 'text',
	TYPE = 'type',
	UNIQUE = 'unique',
	VALUE = 'value',
	VALUES = 'values',
	ZONE = 'zone',
	REGION = 'region',
	WIDGET = 'widget',

	getCN = A.getClassName,

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
	CSS_FORM_BUILDER_FIELD_ICON = getCN(FORM, BUILDER, FIELD, ICON),
	CSS_FORM_BUILDER_FIELD_ICON_TEXT = getCN(FORM, BUILDER, FIELD, ICON, TEXT),
	CSS_FORM_BUILDER_FIELD_OVER = getCN(FORM, BUILDER, FIELD, OVER),
	CSS_FORM_BUILDER_FIELD_SELECTED = getCN(FORM, BUILDER, FIELD, SELECTED),
	CSS_FORM_BUILDER_HELPER = getCN(FORM, BUILDER, HELPER),
	CSS_FORM_BUILDER_ICON = getCN(FORM, BUILDER, ICON),
	CSS_FORM_BUILDER_INACTIVE = getCN(FORM, BUILDER, INACTIVE),
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

	TPL_DRAG_NODE = '<li class="' + [CSS_FORM_BUILDER_DRAG_NODE, CSS_FORM_BUILDER_FIELD].join(SPACE) + '" data-key="{key}">' +
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

	TPL_SETTINGS_BUTTONS = '<div class="yui3-aui-button-row">' +
								'<span class="yui3-aui-button yui3-aui-button-submit yui3-aui-state-positive yui3-aui-priority-primary">' +
									'<span class="yui3-aui-button-content">' +
										'<input type="button" value="Save" class="yui3-aui-button-input yui3-aui-form-builder-button-save">' +
									'</span>' +
								'</span>' +
								'<span class="yui3-aui-button yui3-aui-button-submit yui3-aui-state-positive yui3-aui-priority-secondary">' +
									'<span class="yui3-aui-button-content">' +
										'<input type="button" value="Close" class="yui3-aui-button-input yui3-aui-form-builder-button-close">' +
									'</span>' +
								'</span>' +
							'</div>',

	TAB_INDEX_DRAG = 0,
	TAB_INDEX_SETTINGS = 1,

	DEFAULT_ICON_CLASS = [CSS_FORM_BUILDER_FIELD_ICON, CSS_FORM_BUILDER_FIELD_ICON_TEXT].join(SPACE),

	INVALID_CLONE_ATTRS = [BOUNDING_BOX, CONTENT_BOX, SRC_NODE, FIELDS, ID, SELECTED, TEMPLATE_NODE, LABEL_NODE, NAME],

	INVALID_DBCLICK_TARGETS = 'button,input,label,select,textarea';

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

	_getFormBuilder: function() {
		return (this.get(FORM_BUILDER) || this);
	},

	_getRenderedField: function(index, field) {
		var instance = this;
		var fm = instance._getFormBuilder();

		if (!isFormBuilderField(field)) {
			field = fm._renderField(instance, index, field);
		}

		field.addTarget(fm);
		field.set(PARENT, instance);

		return field;
	},

	_normalizeFields: function(fields) {
		var instance = this;
		var output = [];
		var fm = instance._getFormBuilder();
		var availableFields = fm.get(AVAILABLE_FIELDS);
		var uniqueFields = fm.uniqueFields;

		fields = A.Array(fields);

		A.Array.each(fields, function(field, i) {
			field = instance._getRenderedField(i, field);

			var key = field.get(KEY);
			var unique = field.get(UNIQUE);

			if (unique && !uniqueFields.containsKey(key)) {
				uniqueFields.add(key, field);
			}

			if (unique && uniqueFields.contains(field)) {
				output.push(field);
			}
			else if (unique && !uniqueFields.contains(field)) {
				field.destroy();
			}
			else {
				output.push(field);
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
		 * Whether to automatically select fields after dropping them
		 *
		 * @attribute autoSelectFields
		 */
		autoSelectFields: {
			value: false
		},

		/**
		 * The list of fields that can be used
		 *
		 * @attribute availableFields
		 */
		availableFields: {
			lazyAdd: false,
			value: [],
			validator: isArray,
			setter: function(val) {
				A.each(val, function(availableField, index) {
					availableField.key = availableField.key || index
				});

				return val;
			}
		},

		/**
		 * Wether the user can edit the fields value
		 *
		 * @attribute enableEditing
		 */
		enableEditing: {
			value: true
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
				defaultMessage: 'Drop a field here',
				emptySelection: 'No field selected',
				type: 'Type'
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
			setter: function(val) {
				A.each(val, function(node, index) {
					node.setData(INDEX, index);
				});
			},
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

			instance.dragNodesList.appendTo(instance.dragContainerNode);

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

			instance.uniqueFields.after('add', A.bind(instance._afterUniqueFieldsAdd, instance));
			instance.uniqueFields.after('remove', A.bind(instance._afterUniqueFieldsRemove, instance));

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
			instance._syncUniqueFields();
			instance._syncNestedList();
		},

		/**
		 * Stores the unique fields instanciated
		 *
		 * @attribute uniqueFields
		 */
		uniqueFields: new A.DataSet(),

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
			var parent = field.get(PARENT);
			var index = parent.indexOf(field);
			var newFieldConfig = instance._cloneField(field);

			parent.insertField(++index, newFieldConfig);
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
		 * Populates the dropContainerNode with the boundingBox nodes of each
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
				settingsFormNode.setContent(strings[EMPTY_SELECTION]);
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
		 * Handles the add event for the unique fields
		 *
		 * @method _afterUniqueFieldsAdd
		 */
		_afterUniqueFieldsAdd: function(event) {
			var instance = this;
			var key = event.attrName;
			var dragNode = instance._getDragNodeByKey(key);

			dragNode.addClass(CSS_FORM_BUILDER_INACTIVE);
			dragNode.unselectable();
		},

		/**
		 * Handles the remove event for the unique fields
		 *
		 * @method _afterUniqueFieldsRemove
		 */
		_afterUniqueFieldsRemove: function(event) {
			var instance = this;
			var key = event.attrName;
			var dragNode = instance._getDragNodeByKey(key);

			dragNode.removeClass(CSS_FORM_BUILDER_INACTIVE);
			dragNode.selectable();
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
				if (A.Array.indexOf(INVALID_CLONE_ATTRS) === -1 && !isNode(value)) {
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
		_dropField: function(node) {
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
				var availableFields = instance.get(AVAILABLE_FIELDS);

				field = availableFields[node.getData(INDEX)];

				// Remove remanescent node
				node.remove();
			}

			parent.insertField(index, field);

			return parent.getField(index);
		},

		/**
		 * Return the dragNode to the given key
		 *
		 * @method _getDragNodeByKey
		 */
		_getDragNodeByKey: function(key) {
			var instance = this;
			var dragNodesList = instance.get(DRAG_NODES_LIST);
			var availableFields = instance.get(AVAILABLE_FIELDS);

			for (var i = 0; i < availableFields.length; i++) {
				if (key == availableFields[i].key) {
					return dragNodesList.item(i);
				}
			}

			return null;
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

			if (isFormBuilderField(field)) {
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
		 * Handles the click event for the duplicate button of each field
		 *
		 * @method _onClickFieldDuplicate
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
		 * Handles the click event for the edit button of each field
		 *
		 * @method _onClickFieldEdit
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

			if (target.test(INVALID_DBCLICK_TARGETS)) {
				event.stopPropagation();

				return false;
			}

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
				var field = instance._dropField(newFieldNode);

				if (instance.get(AUTO_SELECT_FIELDS)) {
					instance.selectField(field);
				}
			}
			else {
				drag.set(NODE, instance.originalNode);
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
			var index = dragNode.getData(INDEX);

			var clonedDragNode = dragNode.clone();

			dragNode.placeBefore(clonedDragNode);
			clonedDragNode.setData(INDEX, index);

			drag.set(NODE, clonedDragNode);

			clonedDragNode.attr(ID, EMPTY_STR);
			clonedDragNode.hide();

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

			config = A.merge(
				config,
				{
					boundingBox: boundingBox,
					key: config.key,
					formBuilder: instance,
					render: true,
					after: {
						render: function() {
							boundingBox.removeClass(CSS_HELPER_HIDDEN);
						}
					}
				}
			);

			if (config.disabled === undefined) {
				config.disabled = !instance.get(ENABLE_EDITING);
			}

			return instance._getFieldInstance(config);
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

				defaultMessageNode.setContent(strings[DEFAULT_MESSAGE]);

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
			var availableFields = instance.get(AVAILABLE_FIELDS);
			var uniqueFields = instance.uniqueFields;

			instance._syncNodes();

			instance.dragNodes.each(function(node, i) {
				var field = availableFields[i];

				if (!uniqueFields.containsKey(field.key)) {
					instance._dragNestedList.add(node);
				}
			});

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
		 * Sync the unique fields
		 *
		 * @method _syncUniqueFields
		 */
		_syncUniqueFields: function() {
			var instance = this;
			var availableFields = instance.get(AVAILABLE_FIELDS);
			var fields = instance.get(FIELDS);
			var uniqueFields = instance.uniqueFields;

			uniqueFields.each(function(uniqueField, index){
				if (!instance.contains(uniqueField, true)) {
					uniqueFields.remove(uniqueField);
				}
			});

			A.each(availableFields, function(availableField, index) {
				if (availableField.unique) {
					var key = availableField.key;

					A.each(fields, function(field){
						if (field.get(KEY) == key) {
							field.set(UNIQUE, true);

							uniqueFields.add(key, field);
						}
					});
				}
			});
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

			A.each(availableFields, function(item, index, collection) {
				buffer.push(
					A.substitute(
						TPL_DRAG_NODE,
						{
							icon: item.iconClass || DEFAULT_ICON_CLASS,
							label: item.label,
							key: item.key || index,
							type: item.type,
							unique: item.unique
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
