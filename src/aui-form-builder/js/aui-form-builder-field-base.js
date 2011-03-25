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
	STRING = 'string',
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
		 * The type of the field data
		 *
		 * @attribute dataType
		 */
		dataType: {
			value: STRING
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
