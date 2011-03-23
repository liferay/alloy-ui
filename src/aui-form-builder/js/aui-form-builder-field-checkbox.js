var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isString = L.isString,

	BOUNDING_BOX = 'boundingBox',
	BODY_CONTENT = 'bodyContent',
	CHECKBOX = 'checkbox',
	CHECKED = 'checked',
	CHOICE = 'choice',
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
	FORM_BUILDER_CHECKBOX_FIELD = 'form-builder-checkbox-field',
	ID = 'id',
	ICON = 'icon',
	INLINE = 'inline',
	LABEL = 'label',
	LABELS = 'labels',
	NAME = 'name',
	NODE = 'node',
	PORTAL_LAYOUT = 'portalLayout',
	PREDEFINED_VALUE = 'predefinedValue',
	PROXY = 'proxy',
	SIZE = 'size',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	VALUE = 'value',

	getCN = A.ClassNameManager.getClassName,

	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_CHECKBOX = getCN(FIELD, CHECKBOX),
	CSS_FIELD_CHOICE = getCN(FIELD, CHOICE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_CHECKBOX = getCN(FORM_BUILDER_FIELD, CHECKBOX),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),
	CSS_FIELD_LABELS_INLINE = getCN(FIELD, LABELS, INLINE),

	TPL_BOUNDING_BOX = '<li class="' + [CSS_WIDGET, CSS_COMPONENT, CSS_FORM_BUILDER_FIELD, CSS_FORM_BUILDER_FIELD_CHECKBOX].join(SPACE) + '"></li>',

	TPL_CHECKBOX = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_CHECKBOX, CSS_FIELD_CHOICE].join(SPACE) + '" name="{name}" type="checkbox" value="{value}" {checked} />'

var FormBuilderCheckBoxField = A.Component.create({

	NAME: FORM_BUILDER_CHECKBOX_FIELD,

	ATTRS: {

		/**
		 * The checked state of the checkbox field
		 *
		 * @attribute predefinedValue
		 */
		predefinedValue: {
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
				return TPL_CHECKBOX;
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		templateNode: {
			valueFn: 'getNode'
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderField,

	prototype: {
		BOUNDING_TEMPLATE: TPL_BOUNDING_BOX,

		/**
		 * Bind phase
		 *
		 * @method bindUI
		 */
		bindUI: function() {
			var instance = this;

			A.FormBuilderCheckBoxField.superclass.bindUI.apply(instance, arguments);

			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.on(
				{
					'change': A.bind(instance._onValueChange, instance)
				}
			);
		},

		/**
		 * Render phase
		 *
		 * @method renderUI
		 */
		renderUI: function() {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);
			var templateNode = instance.get(TEMPLATE_NODE);
			var labelNode = instance.get(LABEL_NODE);

			A.FormBuilderCheckBoxField.superclass.renderUI.apply(instance, arguments);

			labelNode.insert(templateNode, labelNode, 'before');
		},

		/**
		 * Returns the HTML content of the field
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			var instance = this;
			var template = instance.get(TEMPLATE);
			var checked = instance.get(CHECKED);
			var id = instance.get(ID);
			var label = instance.get(LABEL);
			var name = instance.get(NAME);
			var value = instance.get(PREDEFINED_VALUE);

			return A.substitute(
				template,
				{
					checked: checked ? 'checked="checked"' : EMPTY_STR,
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

			A.FormBuilderCheckBoxField.superclass.renderSettings.apply(instance, arguments);

			if (!instance._renderedCheckboxSettings) {
				instance._renderedCheckboxSettings = true;

				instance.predefinedValueField.destroy();

				var panelBody = instance.propertiesPanel.get(BODY_CONTENT);

				var checkedField = new A.Field(
					{
						type: 'checkbox',
						name: PREDEFINED_VALUE,
						labelText: 'Checked',
						labelAlign: 'left'
					}
				).render(panelBody.item(0));

				instance.checkedFieldNode = checkedField.get(NODE);

				instance.checkedFieldNode.on(
					{
						change: A.bind(instance._onValueChange, instance)
					}
				);

				instance.checkedFieldNode.set(CHECKED, instance.get(PREDEFINED_VALUE));
			}
		},

		_onValueChange: function(event) {
			var instance = this;
			var target = event.target;

			instance.set(PREDEFINED_VALUE, target.get(CHECKED));
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);
			var checkedFieldNode = instance.checkedFieldNode;

			if (checkedFieldNode) {
				checkedFieldNode.set(CHECKED, val);
			}

			templateNode.set(CHECKED, val);
		}

	}

});

A.FormBuilderCheckBoxField = FormBuilderCheckBoxField;

A.FormBuilder.types['checkbox'] = A.FormBuilderCheckBoxField;
