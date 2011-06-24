var L = A.Lang,
	isArray = L.isArray,
	isString = L.isString,

	_serialize = A.IO.prototype._serialize,

	ACCEPT_CHILDREN = 'acceptChildren',
	BODY_CONTENT = 'bodyContent',
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
	DATA_TYPE = 'dataType',
	DEFAULT = 'default',
	DELETE = 'delete',
	DISABLED = 'disabled',
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
	FIXED = 'fixed',
	FOR = 'for',
	FORM = 'form',
	FORM_BUILDER = 'formBuilder',
	FORM_BUILDER_FIELD = 'form-builder-field',
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
	NODE = 'node',
	PANEL = 'panel',
	PORTAL_LAYOUT = 'portalLayout',
	PREDEFINED_VALUE = 'predefinedValue',
	PROXY = 'proxy',
	READ_ONLY_ATTRIBUTES = 'readOnlyAttributes',
	REQUIRED = 'required',
	REQUIRED_FLAG_NODE = 'requiredFlagNode',
	STATE = 'state',
	SELECT = 'select',
	SETTINGS = 'settings',
	SETTINGS_FORM_NODE = 'settingsFormNode',
	SHOW_LABEL = 'showLabel',
	SIZE = 'size',
	SPACE = ' ',
	STRING = 'string',
	STRINGS = 'strings',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TEXTAREA = 'textarea',
	TIP = 'tip',
	TIP_ICON_NODE = 'tipIconNode',
	TYPE = 'type',
	UNIQUE = 'unique',
	ZONE = 'zone',
	WIDGET = 'widget',

	getCN = A.getClassName,

	CSS_COMPONENT = getCN(COMPONENT),
	CSS_FIELD_LABEL = getCN(FIELD, LABEL),
	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_HELPER_HIDDEN = getCN(HELPER, HIDDEN),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),
	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_TEXT = getCN(FIELD, TEXT),
	CSS_FORM_BUILDER_BUTTON = getCN(FORM, BUILDER, BUTTON),
	CSS_FORM_BUILDER_BUTTON_DELETE = getCN(FORM, BUILDER, BUTTON, DELETE),
	CSS_FORM_BUILDER_BUTTON_DUPLICATE = getCN(FORM, BUILDER, BUTTON, DUPLICATE),
	CSS_FORM_BUILDER_BUTTON_EDIT = getCN(FORM, BUILDER, BUTTON, EDIT),
	CSS_FORM_BUILDER_DROP_NODE = getCN(FORM, BUILDER, DROP, NODE),
	CSS_FORM_BUILDER_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
	CSS_FORM_BUILDER_ICON = getCN(FORM, BUILDER, ICON),
	CSS_FORM_BUILDER_ICON_DELETE = getCN(FORM, BUILDER, ICON, DELETE),
	CSS_FORM_BUILDER_ICON_DUPLICATE = getCN(FORM, BUILDER, ICON, DUPLICATE),
	CSS_FORM_BUILDER_ICON_EDIT = getCN(FORM, BUILDER, ICON, EDIT),
	CSS_FORM_BUILDER_ICON_TIP = getCN(FORM, BUILDER, ICON, TIP),
	CSS_FORM_BUILDER_FIELD = getCN(FORM, BUILDER, FIELD),
	CSS_FORM_BUILDER_FIELD_BUTTONS = getCN(FORM, BUILDER, FIELD, BUTTONS),
	CSS_FORM_BUILDER_FIXED = getCN(FORM, BUILDER, FIXED),
	CSS_FORM_BUILDER_REQUIRED = getCN(FORM, BUILDER, REQUIRED),
	CSS_FORM_BUILDER_UNIQUE = getCN(FORM, BUILDER, UNIQUE),
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

	TPL_DROP_ZONE = '<ul class="' + CSS_FORM_BUILDER_DROP_ZONE + '"></ul>',

	TPL_FIELD_TEXT = '<span class="' + [CSS_FIELD, CSS_FIELD_TEXT].join(SPACE) + '"></span>',

	TPL_LABEL = '<label class="' + CSS_FIELD_LABEL + '"></label>',

	TPL_REQUIRED_FLAG = '<span class="' + CSS_FORM_BUILDER_REQUIRED + '">*</span>',

	TPL_TEXT = '<p></p>',

	TPL_TIP_ICON = '<a href="javascript:;" class="' + CSS_FORM_BUILDER_ICON_TIP + '"></a>';

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
		 * The type of the field data
		 *
		 * @attribute dataType
		 */
		dataType: {
			value: STRING
		},

		/**
		 * Wether the field is disabled for editing
		 *
		 * @attribute disabled
		 */
		disabled: {
			value: false
		},

		/**
		 * The id of the available field that originated the field
		 *
		 * @attribute key
		 * @private
		 */
		key: {
			value: EMPTY_STR
		},

		/**
		 * A fixed field cannot be removed once instanciated
		 *
		 * @attribute fixed
		 */
		fixed: {
			value: false
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
		 * The readOnly attributes
		 *
		 * @attribute readOnlyAttributes
		 */
		readOnlyAttributes: {
			value: [],
			validator: isArray
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
		 * A tip for the user
		 *
		 * @attribute tip
		 */
		tip: {
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

		/**
		 * Whether the field is unique or not
		 *
		 * @attribute unique
		 */
		unique: {
			setter: A.DataType.Boolean.parse,
			value: false
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

	AUGMENTS: [A.FormBuilderFieldSupport],

	UI_ATTRS: [ACCEPT_CHILDREN, DISABLED, FIXED, LABEL, NAME, PREDEFINED_VALUE, REQUIRED, SHOW_LABEL, TIP, UNIQUE],

	HTML_PARSER: {
		buttonsNode: DOT + CSS_FORM_BUILDER_FIELD_BUTTONS,
		dropZoneNode: DOT + CSS_FORM_BUILDER_DROP_ZONE,
		labelNode: LABEL + DOT + CSS_FIELD_LABEL,
		requiredFlagNode: DOT + CSS_FORM_BUILDER_REQUIRED,
		tipIconNode: DOT + CSS_FORM_BUILDER_ICON_TIP
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

			instance.toolTip = new A.Tooltip({
				trigger: instance.get(TIP_ICON_NODE),
				hideDelay: 100
			});
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
			var requiredFlagNode = instance.get(REQUIRED_FLAG_NODE);
			var templateNode = instance.get(TEMPLATE_NODE);
			var tipIconNode = instance.get(TIP_ICON_NODE);

			contentBox.addClass(CSS_HELPER_CLEARFIX);

			boundingBox.prepend(buttonsNode);

			contentBox.append(labelNode);
			contentBox.append(requiredFlagNode);
			contentBox.append(tipIconNode);
			contentBox.append(templateNode);

			instance.toolTip.render();
		},

		/**
		 * Settings nodes map
		 *
		 * @attribute settingsNodesMap
		 */
		settingsNodesMap: {},

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
				_serialize(formNode._node).split('&'),
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
			var strings = formBuilder.get(STRINGS);
			var settingsNodesMap = instance.settingsNodesMap;

			if (!instance.fieldSettingsNode) {
				instance.fieldSettingsNode = A.Node.create(TPL_DIV);

				var propertiesNode = A.Node.create(TPL_DIV);

				var fieldType = A.Node.create(TPL_FIELD_TEXT);
				var fieldTypeLabel = A.Node.create(TPL_LABEL);
				var fieldTypeText = A.Node.create(TPL_TEXT);

				fieldTypeLabel.setContent(strings[TYPE]);
				fieldTypeText.setContent(instance.get(DATA_TYPE) || instance.get(TYPE));

				fieldType.append(fieldTypeLabel);
				fieldType.append(fieldTypeText);
				fieldType.appendTo(propertiesNode);

				instance._renderSettingsFields(
					[
						{
							type: 'text',
							name: LABEL,
							labelText: 'Label',
							value: instance.get(LABEL)
						},
						{
							type: 'checkbox',
							name: SHOW_LABEL,
							labelText: 'Show label',
							labelAlign: 'left',
							value: instance.get(SHOW_LABEL)
						},
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
							value: REQUIRED
						},
						{
							type: 'text',
							name: PREDEFINED_VALUE,
							labelText: 'Default value',
							value: instance.get(PREDEFINED_VALUE)
						},
						{
							type: 'textarea',
							name: TIP,
							labelText: 'Tip',
							value: instance.get(TIP)
						}
					],
					propertiesNode
				);

				var labelNode = settingsNodesMap.labelSettingNode;

				labelNode.on(
					{
						input: A.bind(instance._onLabelInput, instance)
					}
				);

				var showLabelNode = settingsNodesMap.showLabelSettingNode;

				showLabelNode.set(CHECKED, instance.get(SHOW_LABEL));

				showLabelNode.on(
					{
						change: A.bind(instance._onSettingsFieldChange, instance)
					}
				);

				var requiredNode = settingsNodesMap.requiredSettingNode;

				requiredNode.set(CHECKED, instance.get(REQUIRED));

				requiredNode.on(
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

				instance.fieldSettingsNode.append(
					instance.propertiesPanel.get(BOUNDING_BOX)
				);
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

		_onLabelInput: function(event) {
			var instance = this;
			var target = event.target;
			var value = target.val();

			instance.set(LABEL, value);
		},

		_onSettingsFieldChange: function(event)  {
			var instance = this;
			var target = event.target;
			var value = target.val();

			if (target.get(TYPE) === CHECKBOX) {
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
			var readOnlyAttributes = instance.get(READ_ONLY_ATTRIBUTES);

			A.each(fields, function(config) {
				var field;

				if (A.Array.indexOf(readOnlyAttributes, config.name) > -1) {
					config.disabled = true;
				}

				if (config.type === SELECT) {
					field = new A.Select(config);
				}
				else if (config.type === TEXTAREA) {
					field = new A.Textarea(config);
				}
				else {
					field = new A.Field(config);
				}

				field.render(container);

				var fieldNode = field.get(NODE);

				if (config.type === CHECKBOX) {
					fieldNode.set(CHECKED, config.value);
				}

				instance.settingsNodesMap[config.name + 'SettingNode'] = fieldNode;
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

		_uiSetFixed: function(val) {
			var instance = this;
			var buttonsNode = instance.get(BUTTONS_NODE);
			var deleteNode = buttonsNode.one(DOT + CSS_FORM_BUILDER_BUTTON_DELETE);

			deleteNode.toggleClass(CSS_HELPER_HIDDEN, val);
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

			requiredFlagNode.toggleClass(CSS_HELPER_HIDDEN, !val);
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
			var buttonsNode = instance.get(BUTTONS_NODE);

			boundingBox.toggleClass(CSS_FORM_BUILDER_UNIQUE, val);

			buttonsNode.one(DOT + CSS_FORM_BUILDER_BUTTON_DUPLICATE).toggleClass(CSS_HELPER_HIDDEN, val);
		}

	}

});

A.FormBuilderField = FormBuilderField;

A.FormBuilder.types['field'] = A.FormBuilderField;
