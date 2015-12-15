AUI.add('aui-form-builder-field', function(A) {
var L = A.Lang,
	isArray = L.isArray,
	isObject = L.isObject,
	isString = L.isString,

	AArray = A.Array,
	AEscape = A.Escape,

	ACCEPT_CHILDREN = 'acceptChildren',
	ALLOW_REMOVE_REQUIRED_FIELDS = 'allowRemoveRequiredFields',
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
	HIDDEN_ATTRIBUTES = 'hiddenAttributes',
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

		hiddenAttributes: {
			validator: isArray,
			value: []
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
							id: AEscape.html(instance.get(ID)),
							label: AEscape.html(instance.get(LABEL))
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
			var hiddenAttributes = instance.get(HIDDEN_ATTRIBUTES);
			var readOnlyAttributes = instance.get(READ_ONLY_ATTRIBUTES);
			var properties = [];

			AArray.each(propertyModel, function(property) {
				var attribute = property.attributeName;

				// TODO - Change checking to use hashes O(1) instead of indexOf arrays O(N)
				if (AArray.indexOf(hiddenAttributes, attribute) > -1) {
					return;
				}

				var value = instance.get(attribute), type = L.type(value);

				if (type === BOOLEAN) {
					value = String(value);
				}

				property.value = value;

				// TODO - Change checking to use hashes O(1) instead of indexOf arrays O(N)
				if (AArray.indexOf(readOnlyAttributes, attribute) > -1) {
					property.editor = false;
				}

				properties.push(property);
			});

			return properties;
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

			var strings = instance.getStrings();

			if (confirm(strings[DELETE_FIELDS_MESSAGE])) {
				instance.destroy();
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
			var builder = instance.get(BUILDER);
			var controlsToolbar = instance.controlsToolbar;
			var strings = instance.getStrings();

			if (controlsToolbar) {
				if (val && !builder.get(ALLOW_REMOVE_REQUIRED_FIELDS)) {
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

			instance.get(REQUIRED_FLAG_NODE).toggleClass(CSS_HELPER_HIDDEN, !val);
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
var L = A.Lang,
	isArray = L.isArray,
	isNumber = L.isNumber,
	isString = L.isString,

	toInitialCap = A.cached(
		function(str) {
			return str.substring(0, 1).toUpperCase() + str.substring(1);
		}
	),

	AEscape = A.Escape,

	BUTTON = 'button',
	BUTTON_TYPE = 'buttonType',
	DOT = '.',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_BUTTON_FIELD = 'form-builder-button-field',
	INPUT = 'input',
	LABEL = 'label',
	NAME = 'name',
	NODE = 'node',
	OPTION = 'option',
	OPTIONS = 'options',
	PREDEFINED_VALUE = 'predefinedValue',
	PROXY = 'proxy',
	RESET = 'reset',
	SELECTED = 'selected',
	SUBMIT = 'submit',
	SPACE = ' ',
	STRINGS = 'strings',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TYPE = 'type',
	VALUE = 'value',

	getCN = A.getClassName,

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_INPUT = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD_INPUT].join(SPACE) + '" name="{name}" type="{type}" value="{value}" />',

	BUTTON_TYPES = [SUBMIT, RESET, BUTTON]

var FormBuilderButtonField = A.Component.create({

	NAME: FORM_BUILDER_BUTTON_FIELD,

	ATTRS: {

		acceptChildren: {
			value: false,
			readOnly: true
		},

		buttonType: {
			value: SUBMIT,
			validator: function(val) {
				return A.Array(BUTTON_TYPES).indexOf(val.toLowerCase()) > -1;
			}
		},

		predefinedValue: {
			value: toInitialCap(SUBMIT)
		},

		showLabel: {
			value: false
		},

		template: {
			valueFn: function() {
				return TPL_INPUT;
			}
		}

	},

	UI_ATTRS: A.FormBuilderField.UI_ATTRS.concat([BUTTON_TYPE]),

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderField,

	prototype: {

		getHTML: function() {
			var instance = this;

			return L.sub(
				instance.get(TEMPLATE),
				{
					id: AEscape.html(instance.get(ID)),
					label: AEscape.html(instance.get(LABEL)),
					name: AEscape.html(instance.get(NAME)),
					type: AEscape.html(instance.get(BUTTON_TYPE)),
					value: AEscape.html(instance.get(PREDEFINED_VALUE))
				}
			)
		},

		getPropertyModel: function() {
			var instance = this;
			var strings = instance.getStrings();

			var model = A.FormBuilderButtonField.superclass.getPropertyModel.apply(instance, arguments);

			model.push(
				{
					attributeName: BUTTON_TYPE,
					editor: new A.RadioCellEditor({
						options: {
							'button': strings[BUTTON],
							'reset': strings[RESET],
							'submit': strings[SUBMIT]
						}
					}),
					name: strings[BUTTON_TYPE]
				}
			);

			return model;
		},
		
		_uiSetButtonType: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.setAttribute(TYPE, val);
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

	AEscape = A.Escape,

	BOOLEAN = 'boolean',
	CHECKBOX = 'checkbox',
	CHECKED = 'checked',
	DOT = '.',
	EMPTY_STR = '',
	FIELD = 'field',
	FORM_BUILDER_CHECKBOX_FIELD = 'form-builder-checkbox-field',
	FORM_BUILDER_FIELD = 'form-builder-field',
	LABEL = 'label',
	LABELS = 'labels',
	NAME = 'name',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	VALUE = 'value',

	getCN = A.getClassName,

	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_CHECKBOX = getCN(FIELD, CHECKBOX),
	CSS_FIELD_CHOICE = getCN(FIELD, CHOICE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_CHECKBOX = getCN(FORM_BUILDER_FIELD, CHECKBOX),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

	TPL_CHECKBOX = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_CHECKBOX, CSS_FIELD_CHOICE].join(SPACE) + '" name="{name}" type="checkbox" value="{value}" {checked} />';

var FormBuilderCheckBoxField = A.Component.create({

	NAME: FORM_BUILDER_CHECKBOX_FIELD,

	ATTRS: {

		dataType: {
			value: BOOLEAN
		},

		predefinedValue: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		template: {
			valueFn: function() {
				return TPL_CHECKBOX;
			}
		}

	},

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderField,

	prototype: {

		renderUI: function() {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);
			var labelNode = instance.get(LABEL_NODE);

			A.FormBuilderCheckBoxField.superclass.renderUI.apply(instance, arguments);

			labelNode.insert(templateNode, labelNode, 'before');
		},

		getPropertyModel: function() {
			var instance = this;
			var strings = instance.getStrings();

			var model = A.FormBuilderCheckBoxField.superclass.getPropertyModel.apply(instance, arguments);

			AArray.each(model, function(item, index, collection) {
				if (item.attributeName === PREDEFINED_VALUE) {
					collection[index] = {
						attributeName: PREDEFINED_VALUE,
						editor: new A.RadioCellEditor({
							options: {
								'true': strings[YES],
								'false': strings[NO]
							}
						}),
						formatter: A.bind(instance._booleanFormatter, instance),
						name: strings[PREDEFINED_VALUE]
					};
				}
			});

			return model;
		},

		getHTML: function() {
			var instance = this;
			var checked = instance.get(CHECKED);

			return L.sub(
				instance.get(TEMPLATE),
				{
					checked: checked ? 'checked="checked"' : EMPTY_STR,
					id: AEscape.html(instance.get(ID)),
					label: AEscape.html(instance.get(LABEL)),
					name: AEscape.html(instance.get(NAME)),
					value: AEscape.html(instance.get(PREDEFINED_VALUE))
				}
			);
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			if (val) {
				templateNode.setAttribute(CHECKED, val);
			}
			else {
				templateNode.removeAttribute(CHECKED);
			}
		}

	}

});

A.FormBuilderCheckBoxField = FormBuilderCheckBoxField;

A.FormBuilder.types.checkbox = A.FormBuilderCheckBoxField;
var L = A.Lang,

	AEscape = A.Escape,

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DATA_TYPE = 'dataType',
	DOT = '.',
	DROP = 'drop',
	EMPTY_STR = '',
	SHOW_LABEL = 'showLabel',
	FIELD = 'field',
	FIELDS = 'fields',
	DROP_ZONE_NODE = 'dropZoneNode',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_FIELDSET_FIELD = 'form-builder-fieldset-field',
	ID = 'id',
	ICON = 'icon',
	LABEL = 'label',
	NAME = 'name',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	SPACE = ' ',
	STRINGS = 'strings',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TYPE = 'type',
	VALUE = 'value',
	ZONE = 'zone',

	getCN = A.getClassName,

	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),

	TPL_FIELDSET = '<fieldset id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE].join(SPACE) + '"></fieldset>',
	TPL_LEGEND = '<legend class="' + CSS_FIELD_LABEL + '"></legend>';

var FormBuilderFieldsetField = A.Component.create({

	NAME: FORM_BUILDER_FIELDSET_FIELD,

	ATTRS: {

		acceptChildren: {
			value: true,
			readOnly: true
		},

		dataType: {
			value: undefined
		},

		labelNode: {
			valueFn: function() {
				return A.Node.create(TPL_LEGEND);
			}
		},

		template: {
			valueFn: function() {
				return TPL_FIELDSET;
			}
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, LABEL, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderField,

	prototype: {
		CONTENT_TEMPLATE: TPL_FIELDSET,

		getHTML: function() {
			var instance = this;

			return L.sub(
				instance.get(TEMPLATE),
				{
					id: AEscape.html(instance.get(ID))
				}
			);
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
				}
			];
		},

		_uiSetAcceptChildren: function(val) {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);
			var dropZone = instance.get(DROP_ZONE_NODE);
			var markupDropZone = contentBox.one(DOT+CSS_FORM_BUILDER_DROP_ZONE);

			if (val && !markupDropZone) {
				contentBox.append(dropZone);
			}
			else if (!val && markupDropZone) {
				markupDropZone.remove();
			}
			else if (val && markupDropZone) {
				instance.set(DROP_ZONE_NODE, markupDropZone);
			}

			instance.get(TEMPLATE_NODE).hide();
		}

	}

});

A.FormBuilderFieldsetField = FormBuilderFieldsetField;

A.FormBuilder.types['fieldset'] = A.FormBuilderFieldsetField;
var L = A.Lang,

	AEscape = A.Escape,

	DOT = '.',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_FILE_UPLOAD_FIELD = 'form-builder-file-upload-field',
	ICON = 'icon',
	ID = 'id',
	LABEL = 'label',
	NAME = 'name',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	SPACE = ' ',
	STRINGS = 'strings',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TYPE = 'type',
	VALUE = 'value',

	getCN = A.getClassName,

	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_FILE_UPLOAD = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE].join(SPACE) + '" name="{name}" type="file" value="{value}" />';

var FormBuilderFileUploadField = A.Component.create({

	NAME: FORM_BUILDER_FILE_UPLOAD_FIELD,

	ATTRS: {

		template: {
			valueFn: function() {
				return TPL_FILE_UPLOAD;
			}
		}

	},

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderField,

	prototype: {

		getHTML: function() {
			var instance = this;

			return L.sub(
				instance.get(TEMPLATE),
				{
					id: AEscape.html(instance.get(ID)),
					label: AEscape.html(instance.get(LABEL)),
					name: AEscape.html(instance.get(NAME)),
					value: AEscape.html(instance.get(PREDEFINED_VALUE))
				}
			);
		}

	}

});

A.FormBuilderFileUploadField = FormBuilderFileUploadField;

A.FormBuilder.types['fileupload'] = A.FormBuilderFileUploadField;
var Lang = A.Lang,
	AArray = A.Array,
	isString = Lang.isString,

	AEscape = A.Escape,

	ADD_OPTION = 'addOption',
	DATA = 'data',
	DRAG = 'drag',
	DROP = 'drop',
	EDIT_OPTIONS = 'editOptions',
	EDITABLE = 'editable',
	EDITOR = 'editor',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER = 'form-builder',
	FORM_BUILDER_MULTIPLE_CHOICE_FIELD = 'form-builder-multiple-choice-field',
	FORM_BUILDER_OPTIONS_EDITOR = 'form-builder-options-editor',
	HIDDEN = 'hidden',
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
	RENDER = 'render',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TYPE = 'type',
	VALUE = 'value',

	_COMMA = ',',
	_EMPTY_STR = '',
	_SPACE = ' ',

	getCN = A.getClassName,

	getEditorOptions = function(val) {
		var options = {};

		AArray.each(
			val,
			function(item, index, collection) {
				options[item.value] = item.label;
			}
		);

		return options;
	},

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER, FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_OPTIONS_EDITOR_HIDDEN = getCN(FORM_BUILDER, OPTIONS, EDITOR, HIDDEN);

var OptionsEditor = A.Component.create({
	NAME: FORM_BUILDER_OPTIONS_EDITOR,

	ATTRS: {
		editable: {
			setter: function() {
				return false;
			}
		}
	},

	EXTENDS: A.RadioCellEditor,

	prototype: {
		ELEMENT_TEMPLATE: '<div class="' + CSS_FORM_BUILDER_OPTIONS_EDITOR_HIDDEN + '"></div>',

		initializer: function() {
			var instance = this;

			instance.after(RENDER, function() {
				instance._onEditEvent();
			});
		},

		_onSubmit: function(event) {
			var instance = this;

			instance.saveOptions();

			OptionsEditor.superclass._onSubmit.apply(this, arguments);
		}
	}
});

var FormBuilderMultipleChoiceField = A.Component.create({
	NAME: FORM_BUILDER_MULTIPLE_CHOICE_FIELD,

	ATTRS: {
		acceptChildren: {
			value: false,
			readOnly: true
		},

		options: {
			value: [
				{
					label: 'option 1',
					value: 'value 1'
				},
				{
					label: 'option 2',
					value: 'value 2'
				},
				{
					label: 'option 3',
					value: 'value 3'
				}
			]
		},

		optionTemplate: {
			value: '<option value="{value}">{label}</option>'
		},

		predefinedValue: {
			setter: AArray
		}
	},

	UI_ATTRS: [ACCEPT_CHILDREN, LABEL, NAME, OPTIONS, PREDEFINED_VALUE, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderField,

	prototype: {

		initializer: function() {
			var instance = this;
			var options = instance.get(OPTIONS);

			instance.predefinedValueEditor = new A.DropDownCellEditor({
				options: getEditorOptions(options)
			});
		},

		getPropertyModel: function() {
			var instance = this;
			var options = instance.get(OPTIONS);
			var strings = instance.getStrings();

			var model = A.FormBuilderMultipleChoiceField.superclass.getPropertyModel.apply(instance, arguments);

			AArray.each(
				model,
				function(item, index, collection) {
					if (item.attributeName === PREDEFINED_VALUE) {
						collection[index] = A.merge(
							item,
							{
								editor: instance.predefinedValueEditor,
								formatter: function(o) {
									var editorOptions = instance.predefinedValueEditor.get(OPTIONS);

									var values = AArray(o.record.get(DATA).value);

									var labels = A.Array.map(values, function (val) {
										return editorOptions[val];
									});

									return labels.join(_COMMA+_SPACE);
								}
							}
						);
					}
				}
			);

			model.push(
				{
					attributeName: OPTIONS,
					editor: new OptionsEditor({
						editable: true,
						on: {
							optionsChange : function (event) {
								instance.predefinedValueEditor.set(OPTIONS, event.newVal);
							}
						},
						options: getEditorOptions(options),
						inputFormatter: function() {
							var input = [];

							A.each(
								this.get(OPTIONS),
								function(item, index, collection) {
									var option = {
										label: item,
										value: index
									};

									AArray.each(
										options,
										function(oItem) {
											if (oItem.value === index) {
												option = A.merge(oItem, option);
											}
										}
									);

									input.push(option);
								}
							);

							return input;
						}
					}),
					formatter: function(o) {
						var buffer = [];

						A.each(
							o.record.get(DATA).value,
							function(item, index, collection) {
								buffer.push(item.label);
							}
						);

						return buffer.join(_COMMA+_SPACE);
					},
					name: strings[OPTIONS]
				}
			);

			return model;
		},

		_uiSetOptions: function(val) {
			var instance = this;

			var buffer = [];

			A.each(
				val,
				function(item, index, collection) {
					buffer.push(
						Lang.sub(
							instance.get(OPTION_TEMPLATE),
							{
								label: AEscape.html(item.label),
								value: AEscape.html(item.value)
							}
						)
					);
				}
			);

			instance.optionNodes = A.NodeList.create(buffer.join(_EMPTY_STR));

			instance.get(TEMPLATE_NODE).setContent(instance.optionNodes);

			instance._uiSetPredefinedValue(
				instance.get(PREDEFINED_VALUE)
			);
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this;

			var optionNodes = instance.optionNodes;

			if (!optionNodes) {
				return;
			}

			optionNodes.set(SELECTED, false);

			AArray.each(val, function(item) {
				optionNodes.filter('[value="' + AEscape.html(item) + '"]').set(SELECTED, true);
			});
		}
	}

});

A.FormBuilderMultipleChoiceField = FormBuilderMultipleChoiceField;

A.FormBuilder.types['multiple-choice'] = A.FormBuilderMultipleChoiceField;
var L = A.Lang,

	AEscape = A.Escape,

	CHECKED = 'checked',
	CHOICE = 'choice',
	CONTAINER = 'container',
	CONTENT_BOX = 'contentBox',
	DOT = '.',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_RADIO_FIELD = 'form-builder-radio-field',
	ICON = 'icon',
	ID = 'id',
	INLINE = 'inline',
	LABEL = 'label',
	LABELS = 'labels',
	LEFT = 'left',
	NAME = 'name',
	NODE = 'node',
	OPTIONS_CONTAINER_NODE = 'optionsContainerNode',
	PREDEFINED_VALUE = 'predefinedValue',
	RADIO = 'radio',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	VALUE = 'value',

	getCN = A.getClassName,

	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_CHOICE = getCN(FIELD, CHOICE),
	CSS_FIELD_RADIO = getCN(FIELD, RADIO),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_FIELD_OPTIONS_CONTAINER = getCN(FORM_BUILDER_FIELD, OPTIONS, CONTAINER),
	CSS_FORM_BUILDER_FIELD_RADIO = getCN(FORM_BUILDER_FIELD, RADIO),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_OPTIONS_CONTAINER = '<div class="' + CSS_FORM_BUILDER_FIELD_OPTIONS_CONTAINER + '"></div>',
	TPL_RADIO = '<div><input id="{id}" class="' + [CSS_FIELD, CSS_FIELD_CHOICE, CSS_FIELD_RADIO, CSS_FORM_BUILDER_FIELD_NODE].join(SPACE) + '" name="{name}" type="radio" value="{value}" {checked} {disabled} /><label class="aui-field-label" for="{id}">{label}</label></div>';

var FormBuilderRadioField = A.Component.create({

	NAME: FORM_BUILDER_RADIO_FIELD,

	ATTRS: {

		name: {
			value: RADIO
		},

		template: {
			valueFn: function() {
				return TPL_RADIO;
			}
		}

	},

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderMultipleChoiceField,

	prototype: {

		getHTML: function() {
			return TPL_OPTIONS_CONTAINER;
		},

		_uiSetDisabled: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.all(INPUT).each(function(input){
				if (val) {
					input.setAttribute(DISABLED, val);
				}
				else {
					input.removeAttribute(DISABLED);
				}
			});
		},

		_uiSetOptions: function(val) {
			var instance = this;
			var counter = 0;
			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.setContent(EMPTY_STR);

			A.each(val, function(item, index, collection) {
				templateNode.append(
					A.Node.create(
						L.sub(
							TPL_RADIO,
							{
								checked: item.value === instance.get(PREDEFINED_VALUE) ? 'checked="checked"' : EMPTY_STR,
								disabled: instance.get(DISABLED) ? 'disabled="disabled"' : EMPTY_STR,
								id: AEscape.html(instance.get(ID) + counter++),
								label: AEscape.html(item.label),
								name: AEscape.html(instance.get(NAME)),
								value: AEscape.html(item.value)
							}
						)
					)
				);
			});
		}

	}

});

A.FormBuilderRadioField = FormBuilderRadioField;

A.FormBuilder.types.radio = A.FormBuilderRadioField;
var L = A.Lang,
	isArray = L.isArray,
	isNumber = L.isNumber,
	isString = L.isString,

	AEscape = A.Escape,

	BUTTON = 'button',
	DOT = '.',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_SELECT_FIELD = 'form-builder-select-field',
	ICON = 'icon',
	ID = 'id',
	INPUT = 'input',
	LABEL = 'label',
	MULTIPLE = 'multiple',
	NAME = 'name',
	NODE = 'node',
	OPTION = 'option',
	OPTIONS = 'options',
	PREDEFINED_VALUE = 'predefinedValue',
	SELECTED = 'selected',
	SELECTED_INDEX = 'selectedIndex',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TYPE = 'type',
	VALUE = 'value',

	getCN = A.getClassName,

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_SELECT = '<select id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE].join(SPACE) + '" name="{name}" value="{value}"></select>';

var FormBuilderSelectField = A.Component.create({

	NAME: FORM_BUILDER_SELECT_FIELD,

	ATTRS: {

		multiple: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		template: {
			valueFn: function() {
				return TPL_SELECT;
			}
		}

	},

	UI_ATTRS: A.FormBuilderField.UI_ATTRS.concat([MULTIPLE, PREDEFINED_VALUE]),

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderMultipleChoiceField,

	prototype: {

		getHTML: function() {
			var instance = this;

			return L.sub(
				instance.get(TEMPLATE),
				{
					id: AEscape.html(instance.get(ID)),
					label: AEscape.html(instance.get(LABEL)),
					name: AEscape.html(instance.get(NAME)),
					value: AEscape.html(instance.get(PREDEFINED_VALUE))
				}
			);
		},

		getPropertyModel: function() {
			var instance = this;
			var strings = instance.getStrings();

			var model = A.FormBuilderSelectField.superclass.getPropertyModel.apply(instance, arguments);

			model.push(
				{
					attributeName: MULTIPLE,
					editor: new A.RadioCellEditor({
						options: {
							'true': strings[YES],
							'false': strings[NO]
						}
					}),
					formatter: A.bind(instance._booleanFormatter, instance),
					name: strings[MULTIPLE]
				}
			);

			return model;
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

			instance.predefinedValueEditor.set(MULTIPLE, val);
		}

	}

});

A.FormBuilderSelectField = FormBuilderSelectField;

A.FormBuilder.types.select = A.FormBuilderSelectField;
var L = A.Lang,

	AEscape = A.Escape,

	BOUNDING_BOX = 'boundingBox',
	CONTAINER = 'container',
	CONTENT_BOX = 'contentBox',
	DOT = '.',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_TEXT_FIELD = 'form-builder-text-field',
	ICON = 'icon',
	ID = 'id',
	INPUT = 'input',
	LABEL = 'label',
	LARGE = 'large',
	MEDIUM = 'medium',
	NAME = 'name',
	NODE = 'node',
	PORTAL_LAYOUT = 'portalLayout',
	PREDEFINED_VALUE = 'predefinedValue',
	SMALL = 'small',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	VALUE = 'value',
	WIDTH = 'width',

	getCN = A.getClassName,

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

	TPL_INPUT = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT].join(SPACE) + '" name="{name}" type="text" value="{value}" />',

	WIDTH_VALUES_MAP = { 25: 'small', 50: 'medium', 100: 'large' };

var FormBuilderTextField = A.Component.create({

	NAME: FORM_BUILDER_TEXT_FIELD,

	ATTRS: {

		template: {
			valueFn: function() {
				return TPL_INPUT;
			}
		},

		width: {
			setter: A.DataType.String.evaluate,
			value: 25
		}

	},

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderField,

	prototype: {

		getHTML: function() {
			var instance = this;

			return L.sub(
				instance.get(TEMPLATE),
				{
					id: AEscape.html(instance.get(ID)),
					label: AEscape.html(instance.get(LABEL)),
					name: AEscape.html(instance.get(NAME)),
					value: AEscape.html(instance.get(PREDEFINED_VALUE)),
					width: AEscape.html(instance.get(WIDTH))
				}
			)
		},

		getPropertyModel: function() {
			var instance = this;
			var strings = instance.getStrings();

			var model = A.FormBuilderTextField.superclass.getPropertyModel.apply(instance, arguments);

			model.push(
				{
					attributeName: WIDTH,
					editor: new A.RadioCellEditor({
						options: {
							25: strings[SMALL],
							50: strings[MEDIUM],
							100: strings[LARGE]
						}
					}),
					formatter: function(o) {
						var value = o.record.get(DATA).value;

						return strings[WIDTH_VALUES_MAP[value]];
					},
					name: strings[WIDTH]
				}
			);

			return model;
		},

		_uiSetWidth: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.addClass(getCN('w' + val));
			templateNode.removeClass(getCN('w' + instance.prevWidth));

			instance.prevWidth = val;
		}

	}

});

A.FormBuilderTextField = FormBuilderTextField;

A.FormBuilder.types['text'] = A.FormBuilderTextField;
var L = A.Lang,
	isArray = L.isArray,
	isNumber = L.isNumber,
	isString = L.isString,

	DOT = '.',
	FORM_BUILDER_TEXTAREA_FIELD = 'form-builder-textarea-field',

	getCN = A.getClassName,

	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_TEXT = getCN(FIELD, TEXT),
	CSS_FIELD_TEXTAREA = getCN(FIELD, TEXTAREA),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

	TPL_TEXTAREA = '<textarea id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_TEXT, CSS_FIELD_TEXTAREA].join(SPACE) + '" name="{name}">{value}</textarea>'

var FormBuilderTextAreaField = A.Component.create({

	NAME: FORM_BUILDER_TEXTAREA_FIELD,

	ATTRS: {

		template: {
			valueFn: function() {
				return TPL_TEXTAREA;
			}
		}

	},

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderTextField,

	prototype: {
		
		getPropertyModel: function() {
			var instance = this;
			var options = instance.get(OPTIONS);

			var model = A.FormBuilderTextAreaField.superclass.getPropertyModel.apply(instance, arguments);

			AArray.each(
				model,
				function(item, index, collection) {
					if (item.attributeName === PREDEFINED_VALUE) {
						collection[index].editor = new A.TextAreaCellEditor();
					}
				}
			);

			return model;
		}

	}

});

A.FormBuilderTextAreaField = FormBuilderTextAreaField;

A.FormBuilder.types['textarea'] = A.FormBuilderTextAreaField;

}, '@VERSION@' ,{requires:['aui-datatype','aui-panel','aui-tooltip','escape'], skinnable:true});
