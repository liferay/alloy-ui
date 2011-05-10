var L = A.Lang,
	isArray = L.isArray,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isString = L.isString,

	BOUNDING_BOX = 'boundingBox',
	BODY_CONTENT = 'bodyContent',
	CHECKED = 'checked',
	CHOICE = 'choice',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DOT = '.',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_RADIO_FIELD = 'form-builder-radio-field',
	ID = 'id',
	ICON = 'icon',
	INLINE = 'inline',
	LABEL = 'label',
	LABELS = 'labels',
	NAME = 'name',
	NODE = 'node',
	OPTIONS_CONTAINER_NODE = 'optionsContainerNode',
	PREDEFINED_VALUE = 'predefinedValue',
	RADIO = 'radio',
	SIZE = 'size',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	VALUE = 'value',

	getCN = A.getClassName,

	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_CHOICE = getCN(FIELD, CHOICE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_RADIO = getCN(FORM_BUILDER_FIELD, RADIO),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_FIELD_OPTIONS_CONTAINER = getCN(FORM_BUILDER_FIELD, OPTIONS, CONTAINER),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),
	CSS_FIELD_LABELS_INLINE = getCN(FIELD, LABELS, INLINE),

	TPL_BOUNDING_BOX = '<li class="' + [CSS_WIDGET, CSS_COMPONENT, CSS_FORM_BUILDER_FIELD, CSS_FORM_BUILDER_FIELD_RADIO].join(SPACE) + '"></li>',

	TPL_OPTIONS_CONTAINER = '<div class="' + CSS_FORM_BUILDER_FIELD_OPTIONS_CONTAINER + '"></div>',

	TPL_RADIO = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_CHOICE].join(SPACE) + '" name="{name}" type="radio" value="{value}" {checked} />',

	TPL_FIELD = '<input type="hidden" />';

var FormBuilderRadioField = A.Component.create({

	NAME: FORM_BUILDER_RADIO_FIELD,

	ATTRS: {

		/**
		 * The name of the field
		 *
		 * @attribute name
		 */
		name: {
			value: RADIO
		},

		/**
		 * The template for each option
		 *
		 * @attribute optionTemplate
		 */
		optionTemplate: {
			value: TPL_RADIO
		},

		/**
		 * The HTML template of the field
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_RADIO;
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		optionsContainerNode: {
			valueFn: function() {
				return A.Node.create(TPL_OPTIONS_CONTAINER);
			}
		},

		templateNode: {
			valueFn: 'getNode'
		}

	},

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		optionsContainerNode: DOT + CSS_FORM_BUILDER_FIELD_OPTIONS_CONTAINER,
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderMultipleChoiceField,

	prototype: {
		BOUNDING_TEMPLATE: TPL_BOUNDING_BOX,

		/**
		 * Render phase
		 *
		 * @method renderUI
		 */
		renderUI: function() {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);
			var optionsContainerNode = instance.get(OPTIONS_CONTAINER_NODE);

			A.FormBuilderRadioField.superclass.renderUI.apply(instance, arguments);

			contentBox.append(optionsContainerNode);
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getFieldNode
		 */
		getNode: function() {
			var instance = this;

			return A.Node.create(TPL_FIELD);
		},

		_onFieldChange: function(event) {
			var instance = this;
			var target = event.target;

			instance.set(PREDEFINED_VALUE, target.val());
		},

		_uiSetDisabled: function(val) {
			var instance = this;
			var optionsContainerNode = instance.get(OPTIONS_CONTAINER_NODE);

			optionsContainerNode.all(INPUT).each(function(input){
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
			var contentBox = instance.get(CONTENT_BOX);
			var optionsContainerNode = instance.get(OPTIONS_CONTAINER_NODE);
			var templateNode = instance.get(TEMPLATE_NODE);

			optionsContainerNode.empty();

			A.each(val, function(item) {
				var radioField = new A.Field(
					{
						type: RADIO,
						disabled: instance.get(DISABLED),
						name: instance.get(NAME),
						labelText: item.label,
						labelAlign: 'left',
						value: item.value
					}
				).render(optionsContainerNode);

				var radioFieldNode = radioField.get(NODE);

				if (item.value == instance.get(PREDEFINED_VALUE)) {
					radioFieldNode.set(CHECKED, true);
				}

				if (instance.get(DISABLED)) {
					radioFieldNode.setAttribute(DISABLED, val);
				}
				else {
					radioFieldNode.removeAttribute(DISABLED);
				}

				radioFieldNode.on(
					{
						change: A.bind(instance._onFieldChange, instance)
					}
				);
			});
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this;
			var formBuilder = instance.get(FORM_BUILDER);
			var formNode = formBuilder.get(SETTINGS_FORM_NODE);
			var predefinedValueNode = formNode.one('input[name=predefinedValue]');

			if (predefinedValueNode) {
				predefinedValueNode.val(val);
			}
		}

	}

});

A.FormBuilderRadioField = FormBuilderRadioField;

A.FormBuilder.types['radio'] = A.FormBuilderRadioField;
