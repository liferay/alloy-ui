var L = A.Lang,

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
								id: instance.get(ID) + counter++,
								label: item.label,
								name: instance.get(NAME),
								value: item.value
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