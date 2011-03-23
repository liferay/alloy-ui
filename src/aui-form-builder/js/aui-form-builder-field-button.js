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
