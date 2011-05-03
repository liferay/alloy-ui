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
	DATA_TYPE = 'dataType',
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
		 * The type of the field data
		 *
		 * @attribute dataType
		 */
		dataType: {
			value: undefined
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
			var strings = formBuilder.get(STRINGS);
			var settingsNodesMap = instance.settingsNodesMap;

			if (!instance._renderedFieldsetSettings) {
				instance._renderedFieldsetSettings = true;

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
						}
					],
					propertiesNode
				);

				var labelNode = settingsNodesMap['labelSettingNode'];

				labelNode.on(
					{
						input: A.bind(instance._onLabelInput, instance)
					}
				);

				var showLabelNode = settingsNodesMap['showLabelSettingNode'];

				showLabelNode.set(CHECKED, instance.get(SHOW_LABEL));

				showLabelNode.on(
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
		}

	}

});

A.FormBuilderFieldsetField = FormBuilderFieldsetField;

A.FormBuilder.types['fieldset'] = A.FormBuilderFieldsetField;
