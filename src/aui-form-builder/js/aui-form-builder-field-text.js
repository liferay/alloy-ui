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
	FORM_BUILDER_TEXT_FIELD = 'form-builder-input-field',
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
	WIDTH = 'width',

	getCN = A.getClassName,

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_INPUT = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT].join(SPACE) + '" name="{name}" type="text" value="{value}" />',

	WIDTH_VALUES_MAP = { small: 25, medium: 50, large: 100 }

var FormBuilderTextField = A.Component.create({

	NAME: FORM_BUILDER_TEXT_FIELD,

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
		},

		/**
		 * The width of the input
		 *
		 * @attribute width
		 */
		width: {
			setter: A.DataType.String.evaluate,
			value: 25
		}

	},

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

			A.FormBuilderTextField.superclass.bindUI.apply(instance, arguments);

			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.on(
				{
					input: A.bind(instance._onValueInput, instance)
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
			var value = instance.get(PREDEFINED_VALUE);
			var width = instance.get(WIDTH);

			return A.substitute(
				template,
				{
					id: id,
					label: label,
					name: name,
					value: value,
					width: width
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
			var settingsNodesMap = instance.settingsNodesMap;
			var strings = formBuilder.get(STRINGS);

			A.FormBuilderTextField.superclass.renderSettings.apply(instance, arguments);

			if (!instance._renderedInputSettings) {
				instance._renderedInputSettings = true;

				var panelBody = instance.propertiesPanel.get(BODY_CONTENT);

				var counter = 0;
				var selectedIndex = -1;
				var widthOptions = [];

				A.each(WIDTH_VALUES_MAP, function(value, key) {
					if (value == instance.get(WIDTH)) {
						selectedIndex = counter;
					}

					widthOptions.push(
						{
							labelText: strings[key],
							value: value
						}
					);

					counter++;
				});

				instance._renderSettingsFields(
					[
						{
							labelText: 'Width',
							name: WIDTH,
							options: widthOptions,
							type: 'select',
							value: instance.get(WIDTH)
						}
					],
					panelBody.item(0)
				);

				var predefinedValueNode = settingsNodesMap['predefinedValueSettingNode'];

				predefinedValueNode.on(
					{
						input: A.bind(instance._onValueInput, instance)
					}
				);

				var widthNode = settingsNodesMap['widthSettingNode'];

				widthNode.on(
					{
						change: A.bind(instance._onWidthChange, instance)
					}
				);

				widthNode.all(OPTION).item(selectedIndex).set(SELECTED, true);
			}
		},

		/**
		 * Handles the onKeyUp event for the value nodes
		 *
		 * @method _onValueKeyUp
		 */
		_onValueInput: function(event) {
			var instance = this;
			var target = event.target;

			instance.set(PREDEFINED_VALUE, target.val());
		},

		_onWidthChange: function(event) {
			var instance = this;
			var target = event.target;

			instance.set(WIDTH, target.val());
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
