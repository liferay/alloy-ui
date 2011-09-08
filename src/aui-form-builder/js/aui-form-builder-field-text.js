var L = A.Lang,

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

			return A.substitute(
				instance.get(TEMPLATE),
				{
					id: instance.get(ID),
					label: instance.get(LABEL),
					name: instance.get(NAME),
					value: instance.get(PREDEFINED_VALUE),
					width: instance.get(WIDTH)
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
