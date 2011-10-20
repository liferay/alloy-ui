var L = A.Lang,
	isArray = L.isArray,
	isObject = L.isObject,
	isString = L.isString,

	AArray = A.Array,

	ACCEPT_CHILDREN = 'acceptChildren',
	AVAILABLE_FIELD_ID = 'availableFieldId',
	BODY_CONTENT = 'bodyContent',
	BOOLEAN = 'boolean',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	BUTTON = 'button',
	BUTTONS = 'buttons',
	BUTTONS_NODE = 'buttonsNode',
	CANCEL = 'cancel',
	CHECKBOX = 'checkbox',
	CHECKED = 'checked',
	CHILDREN = 'children',
	CLEARFIX = 'clearfix',
	CLOSE = 'close',
	COMPONENT = 'component',
	CONTAINER = 'container',
	CONTENT_BOX = 'contentBox',
	CONTROLS = 'controls',
	CONTROLS_TOOLBAR = 'controlsToolbar',
	DATA_TYPE = 'dataType',
	DEFAULT = 'default',
	DELETE = 'delete',
	DELETE_EVENT = 'deleteEvent',
	DELETE_FIELDS_MESSAGE = 'deleteFieldsMessage',
	DELETE_MESSAGE = 'deleteMessage',
	DESCRIPTION = 'description',
	DISABLED = 'disabled',
	DOT = '.',
	DRAG = 'drag',
	DRAG_CONTAINER = 'dragContainer',
	DRAG_CONTAINER_NODE = 'dragContainerNode',
	DRAG_NODES_LIST = 'dragNodesList',
	DROP = 'drop',
	DROP_NODE = 'dropNode',
	DROP_ZONE = 'dropZone',
	DROP_ZONE_NODE = 'dropZoneNode',
	DUPLICATE = 'duplicate',
	DUPLICATE_EVENT = 'duplicateEvent',
	DUPLICATE_MESSAGE = 'duplicateMessage',
	EDIT = 'edit',
	EDIT_EVENT = 'editEvent',
	EDIT_MESSAGE = 'editMessage',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FOR = 'for',
	FORM = 'form',
	FORM_BUILDER = 'formBuilder',
	FORM_BUILDER_FIELD = 'form-builder-field',
	GEAR = 'gear',
	HELP = 'help',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	ICON = 'icon',
	ID = 'id',
	LABEL = 'label',
	LABEL_NODE = 'labelNode',
	LIGHTBULB = 'lightbulb',
	METADATA = 'metadata',
	NAME = 'name',
	NEWWIN = 'newwin',
	NO = 'no',
	NODE = 'node',
	PANEL = 'panel',
	PARENT = 'parent',
	PENCIL = 'pencil',
	PORTAL_LAYOUT = 'portalLayout',
	PREDEFINED_VALUE = 'predefinedValue',
	PROXY = 'proxy',
	READ_ONLY = 'readOnly',
	READ_ONLY_ATTRIBUTES = 'readOnlyAttributes',
	RENDERED = 'rendered',
	REQUIRED = 'required',
	REQUIRED_FLAG_NODE = 'requiredFlagNode',
	SELECT = 'select',
	SELECTED = 'selected',
	SETTINGS = 'settings',
	SETTINGS_FORM_NODE = 'settingsFormNode',
	SHOW_LABEL = 'showLabel',
	SIZE = 'size',
	SPACE = ' ',
	STATE = 'state',
	STRING = 'string',
	STRINGS = 'strings',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TEXTAREA = 'textarea',
	TIP = 'tip',
	TIP_ICON_NODE = 'tipIconNode',
	TYPE = 'type',
	UNIQUE = 'unique',
	WIDGET = 'widget',
	YES = 'yes',
	ZONE = 'zone',

	_COMMA = ',',
	_DASH = '-',
	_DOT = '.',
	_EMPTY_STR = '',
	_HASH = '#',
	_UNDERLINE = '_',

	getCN = A.getClassName,

	CSS_COMPONENT = getCN(COMPONENT),
	CSS_FB_BUTTON = getCN(FORM, BUILDER, BUTTON),
	CSS_FB_BUTTON_DELETE = getCN(FORM, BUILDER, BUTTON, DELETE),
	CSS_FB_BUTTON_DUPLICATE = getCN(FORM, BUILDER, BUTTON, DUPLICATE),
	CSS_FB_BUTTON_EDIT = getCN(FORM, BUILDER, BUTTON, EDIT),
	CSS_FB_CONTROLS = getCN(FORM, BUILDER, BUTTON, CONTROLS),
	CSS_FB_DROP_NODE = getCN(FORM, BUILDER, DROP, NODE),
	CSS_FB_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
	CSS_FB_FIELD = getCN(FORM, BUILDER, FIELD),
	CSS_FB_FIELD_BUTTONS = getCN(FORM, BUILDER, FIELD, BUTTONS),
	CSS_FB_FIELD_SELECTED = getCN(FORM, BUILDER, FIELD, SELECTED),
	CSS_FB_ICON = getCN(FORM, BUILDER, ICON),
	CSS_FB_ICON_DELETE = getCN(FORM, BUILDER, ICON, DELETE),
	CSS_FB_ICON_DUPLICATE = getCN(FORM, BUILDER, ICON, DUPLICATE),
	CSS_FB_ICON_EDIT = getCN(FORM, BUILDER, ICON, EDIT),
	CSS_FB_ICON_TIP = getCN(FORM, BUILDER, ICON, TIP),
	CSS_FB_REQUIRED = getCN(FORM, BUILDER, REQUIRED),
	CSS_FB_UNIQUE = getCN(FORM, BUILDER, UNIQUE),
	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_LABEL = getCN(FIELD, LABEL),
	CSS_FIELD_TEXT = getCN(FIELD, TEXT),
	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_HELPER_HIDDEN = getCN(HELPER, HIDDEN),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),
	CSS_WIDGET = getCN(WIDGET),

	TPL_BOUNDING_BOX = '<div class="' + [CSS_WIDGET, CSS_COMPONENT, CSS_FB_FIELD].join(SPACE) + '"></div>',
	TPL_DROP_ZONE = '<div class="' + CSS_FB_DROP_ZONE + '"></div>',
	TPL_LABEL = '<label class="' + CSS_FIELD_LABEL + '" for="{id}">{label}</label>',
	TPL_REQUIRED_FLAG = '<span class="' + CSS_FB_REQUIRED + '">*</span>',
	TPL_TIP_ICON = '<a href="javascript:;" class="' + CSS_FB_ICON_TIP + '"></a>';

var FormBuilderFieldBase = A.Component.create({
	NAME: FORM_BUILDER_FIELD,

	AUGMENTS: [A.FieldSupport]
});

var FormBuilderField = A.Component.create({

	NAME: FORM_BUILDER_FIELD,

	ATTRS: {

		acceptChildren: {
			value: true
		},

		controlsToolbar: {
			validator: isObject,
			valueFn: '_valueControlsToolbar'
		},

		dataType: {
			value: STRING
		},

		disabled: {
			value: false
		},

		id: {
			setter: '_setId'
		},

		label: {
			value: EMPTY_STR
		},

		localizationMap: {
			value: {}
		},

		name: {
			valueFn: function() {
				var instance = this;
				var type = instance.get(TYPE);

				return A.FormBuilderField.buildFieldName(type);
			}
		},

		parent: {
			value: null
		},

		predefinedValue: {
			value: EMPTY_STR
		},

		readOnly: {
			validator: isBoolean,
			value: false
		},

		readOnlyAttributes: {
			validator: isArray,
			value: []
		},

		required: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		selected: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		showLabel: {
			setter: A.DataType.Boolean.parse,
			value: true
		},

		strings: {
			value: {
				button: 'Button',
				buttonType: 'Button Type',
				deleteFieldsMessage: 'Are you sure you want to delete the selected field(s)?',
				duplicateMessage: 'Duplicate',
				editMessage: 'Edit',
				label: 'Label',
				large: 'Large',
				medium: 'Medium',
				multiple: 'Multiple',
				name: 'Name',
				no: 'No',
				options: 'Options',
				predefinedValue: 'Predefined Value',
				readOnly: 'Read Only',
				required: 'Required',
				reset: 'Reset',
				showLabel: 'Show Label',
				small: 'Small',
				submit: 'Submit',
				tip: 'Tip',
				type: 'Type',
				width: 'Width',
				yes: 'Yes'
			}
		},

		tabIndex: {
			value: 1
		},

		template: {
			value: EMPTY_STR
		},

		tip: {
			value: EMPTY_STR
		},

		type: {
			value: EMPTY_STR
		},

		unique: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		zIndex: {
			value: 100
		},

		dropZoneNode: {
			valueFn: function() {
				return A.Node.create(TPL_DROP_ZONE);
			}
		},

		labelNode: {
			valueFn: function() {
				var instance = this;

				return A.Node.create(
					L.sub(
						TPL_LABEL,
						{
							id: instance.get(ID),
							label: instance.get(LABEL)
						}
					)
				);
			}
		},

		requiredFlagNode: {
			valueFn: function() {
				return A.Node.create(TPL_REQUIRED_FLAG);
			}
		},

		templateNode: {
			valueFn: 'getNode'
		},

		tipIconNode: {
			valueFn: function() {
				return A.Node.create(TPL_TIP_ICON);
			}
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, DISABLED, FIELDS, LABEL, NAME, PREDEFINED_VALUE, REQUIRED, SELECTED, SHOW_LABEL, TIP, UNIQUE],

	EXTENDS: FormBuilderFieldBase,

	buildFieldId: function(id) {
		return FIELDS + _UNDERLINE + FIELD + _UNDERLINE + id;
	},

	buildFieldName: function(type) {
		return type + (++A.Env._uidx);	
	},

	HTML_PARSER: {
		dropZoneNode: DOT + CSS_FB_DROP_ZONE,
		labelNode: LABEL + DOT + CSS_FIELD_LABEL,
		requiredFlagNode: DOT + CSS_FB_REQUIRED,
		tipIconNode: DOT + CSS_FB_ICON_TIP
	},

	prototype: {
		BOUNDING_TEMPLATE: TPL_BOUNDING_BOX,

		CONTROLS_TEMPLATE: '<div class="' + CSS_FB_CONTROLS + '"></div>',

		initializer: function() {
			var instance = this;

			instance.toolTip = new A.Tooltip({
				trigger: instance.get(TIP_ICON_NODE),
				hideDelay: 100
			});
		},

		renderUI: function() {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);
			var labelNode = instance.get(LABEL_NODE);
			var requiredFlagNode = instance.get(REQUIRED_FLAG_NODE);
			var templateNode = instance.get(TEMPLATE_NODE);
			var tipIconNode = instance.get(TIP_ICON_NODE);

			contentBox.addClass(CSS_HELPER_CLEARFIX);

			contentBox.append(labelNode);
			contentBox.append(requiredFlagNode);
			contentBox.append(tipIconNode);
			contentBox.append(templateNode);

			instance.toolTip.render();
		},

		destructor: function() {
			var instance = this;

			instance.get(FIELDS).each(function(field) {
				field.destroy();
			});

			var builder = instance.get(BUILDER);

			if (builder.editingField === instance) {
				delete builder.editingField;

				builder.closeEditProperties();
			}

			if (builder.selectedField === instance) {
				delete builder.selectedField;
			}

			if (instance.controlsToolbar) {
				instance.controlsToolbar.destroy();
			}

			// destroy manually because NestedList doesn`t
			// use delegate
			instance.get(BOUNDING_BOX).dd.destroy();

			instance.toolTip.destroy();

			instance.get(PARENT).removeField(instance);

			builder.uniqueFields.remove(instance);
		},

		createField: function(val) {
			var instance = this;
			var builder = instance.get(BUILDER);

			val = builder.createField(val);

			val.set(PARENT, instance);

			return val;
		},

		// To developer: Implement this
		getHTML: function() {
			return EMPTY_STR;
		},

		getNode: function() {
			var instance = this;

			return A.Node.create(instance.getHTML());
		},

		getProperties: function() {
			var instance = this;
			var propertyModel = instance.getPropertyModel();
			var readOnlyAttributes = instance.get(READ_ONLY_ATTRIBUTES);

			AArray.each(propertyModel, function(property) {
				var attribute = property.attributeName;
				var value = instance.get(attribute), type = L.type(value);

				if (type === BOOLEAN) {
					value = String(value);
				}

				property.value = value;

				if (AArray.indexOf(readOnlyAttributes, attribute) > -1) {
					property.editor = false;
				}
			});

			return propertyModel;
		},

		getPropertyModel: function() {
			var instance = this;
			var strings = instance.getStrings();

			return [
				{
					attributeName: TYPE,
					editor: false,
					name: strings[TYPE]
				},
				{
					attributeName: LABEL,
					editor: new A.TextCellEditor(),
					name: strings[LABEL]
				},
				{
					attributeName: SHOW_LABEL,
					editor: new A.RadioCellEditor({
						options: {
							'true': strings[YES],
							'false': strings[NO]
						}
					}),
					formatter: A.bind(instance._booleanFormatter, instance),
					name: strings[SHOW_LABEL]
				},
				{
					attributeName: READ_ONLY,
					editor: new A.RadioCellEditor({
						options: {
							'true': strings[YES],
							'false': strings[NO]
						}
					}),
					formatter: A.bind(instance._booleanFormatter, instance),
					name: strings[READ_ONLY]
				},
				{
					attributeName: REQUIRED,
					editor: new A.RadioCellEditor({
						options: {
							'true': strings[YES],
							'false': strings[NO]
						}
					}),
					formatter: A.bind(instance._booleanFormatter, instance),
					name: strings[REQUIRED]
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
					attributeName: PREDEFINED_VALUE,
					editor: new A.TextCellEditor(),
					name: strings[PREDEFINED_VALUE]
				},
				{
					attributeName: TIP,
					editor: new A.TextAreaCellEditor(),
					name: strings[TIP]
				}
			];
		},

		_booleanFormatter: function(o) {
			var instance = this;
			var strings = instance.getStrings();

			var value = A.DataType.Boolean.parse(
				o.record.get(DATA).value
			);

			return value ? strings[YES] : strings[NO];
		},

		_renderControlsToolbar: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			if (!instance.controlsNode) {
				instance.controlsNode = A.Node.create(instance.CONTROLS_TEMPLATE);
				instance.controlsNode.appendTo(boundingBox);
			}

			var controlsToolbar = instance.controlsToolbar = new A.Toolbar(
				instance.get(CONTROLS_TOOLBAR)
			)
			.render(instance.controlsNode);

			controlsToolbar.get(BOUNDING_BOX).hide();

			instance._uiSetRequired(
				instance.get(REQUIRED)
			);
		},

		_setId: function(val) {
			return A.FormBuilderField.buildFieldId(val);
		},

		_uiSetAcceptChildren: function(val) {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var dropZone = instance.get(DROP_ZONE_NODE);
			var markupDropZone = boundingBox.one(DOT + CSS_FB_DROP_ZONE);

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

		_uiSetDisabled: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			if (val) {
				templateNode.setAttribute(DISABLED, val);
			}
			else {
				templateNode.removeAttribute(DISABLED);
			}
		},

		_handleDuplicateEvent: function(event) {
			var instance = this;

			if (!instance.get(UNIQUE)) {
				instance.get(BUILDER).duplicateField(instance);
			}
		},

		_handleEditEvent: function(event) {
			var instance = this;

			instance.get(BUILDER).editField(instance);
		},

		_handleDeleteEvent: function(event) {
			var instance = this;

			if (!instance.get(REQUIRED)) {
				var strings = instance.getStrings();

				if (confirm(strings[DELETE_FIELDS_MESSAGE])) {
					instance.destroy();
				}
			}
		},

		_uiSetFields: function(val) {
			var instance = this;
			var builder = instance.get(BUILDER);

			builder.plotFields(val, instance.get(DROP_ZONE_NODE));
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

		_uiSetRequired: function(val) {
			var instance = this;
			var requiredFlagNode = instance.get(REQUIRED_FLAG_NODE);
			var controlsToolbar = instance.controlsToolbar;
			var strings = instance.getStrings();

			if (controlsToolbar) {
				if (val) {
					controlsToolbar.remove(DELETE_EVENT);
				}
				else {
					controlsToolbar.add({
						handler: A.bind(instance._handleDeleteEvent, instance),
						icon: CLOSE,
						id: DELETE_EVENT,
						title: strings[DELETE_MESSAGE]
					});
				}
			}

			requiredFlagNode.toggleClass(CSS_HELPER_HIDDEN, !val);
		},

		_uiSetSelected: function(val) {
			var instance = this;

			instance.get(BOUNDING_BOX).toggleClass(CSS_FB_FIELD_SELECTED, val);

			if (!instance.controlsToolbar) {
				instance._renderControlsToolbar();
			}

			var toolbarBoundingBox = instance.controlsToolbar.get(BOUNDING_BOX);

			if (val) {
				toolbarBoundingBox.show();
			}
			else {
				toolbarBoundingBox.hide();
			}
		},

		_uiSetShowLabel: function(val)  {
			var instance = this;
			var labelNode = instance.get(LABEL_NODE);

			labelNode.toggleClass(CSS_HELPER_HIDDEN, !val);
		},

		_uiSetTip: function(val) {
			var instance = this;
			var tipIconNode = instance.get(TIP_ICON_NODE);

			tipIconNode.toggleClass(CSS_HELPER_HIDDEN, !val);

			instance.toolTip.set(BODY_CONTENT, val);
		},

		_uiSetUnique: function(val) {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var controlsToolbar = instance.controlsToolbar;
			var strings = instance.getStrings();

			boundingBox.toggleClass(CSS_FB_UNIQUE, val);

			if (controlsToolbar) {
				if (val) {
					controlsToolbar.remove(DUPLICATE_EVENT);
				}
				else {
					controlsToolbar.add({
						handler: A.bind(instance._handleDuplicateEvent, instance),
						icon: NEWWIN,
						id: DUPLICATE_EVENT,
						title: strings[DUPLICATE_MESSAGE]
					});
				}
			}
		},

		_valueControlsToolbar: function() {
			var instance = this;
			var strings = instance.getStrings();

			return {
				activeState: false,
				children: [
					{
						handler: A.bind(instance._handleEditEvent, instance),
						icon: GEAR,
						id: EDIT_EVENT,
						title: strings[EDIT_MESSAGE]
					},
					{
						handler: A.bind(instance._handleDuplicateEvent, instance),
						icon: NEWWIN,
						id: DUPLICATE_EVENT,
						title: strings[DUPLICATE_MESSAGE]
					},
					{
						handler: A.bind(instance._handleDeleteEvent, instance),
						icon: CLOSE,
						id: DELETE_EVENT,
						title: strings[DELETE_MESSAGE]
					}
				]
			};
		}

	}

});

A.FormBuilderField = FormBuilderField;

A.FormBuilder.types['field'] = A.FormBuilderField;