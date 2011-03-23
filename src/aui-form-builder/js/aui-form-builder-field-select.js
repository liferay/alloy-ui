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
