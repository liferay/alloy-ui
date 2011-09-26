var L = A.Lang,

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DATA_TYPE = 'dataType',
	DOT = '.',
	DROP = 'drop',
	EMPTY_STR = '',
	SHOW_LABEL = 'showLabel',
	FIELD = 'field',
	FIELDS = 'fields',
	DROP_ZONE_NODE = 'dropZoneNode',
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
	TPL_LEGEND = '<legend class="' + CSS_FIELD_LABEL + '"></legend>';

var FormBuilderFieldsetField = A.Component.create({

	NAME: FORM_BUILDER_FIELDSET_FIELD,

	ATTRS: {

		acceptChildren: {
			value: true,
			readOnly: true
		},

		dataType: {
			value: undefined
		},

		labelNode: {
			valueFn: function() {
				return A.Node.create(TPL_LEGEND);
			}
		},

		template: {
			valueFn: function() {
				return TPL_FIELDSET;
			}
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, LABEL, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderField,

	prototype: {
		CONTENT_TEMPLATE: TPL_FIELDSET,

		getHTML: function() {
			var instance = this;

			return L.sub(
				instance.get(TEMPLATE),
				{
					id: instance.get(ID)
				}
			);
		},

		getPropertyModel: function() {
			var instance = this;
			var strings = instance.getStrings();

			return [
				{
					attributeName: TYPE,
					editor: false,
					name: strings[TYPE]
				},
				{
					attributeName: LABEL,
					editor: new A.TextCellEditor(),
					name: strings[LABEL]
				},
				{
					attributeName: SHOW_LABEL,
					editor: new A.RadioCellEditor({
						options: {
							'true': strings[YES],
							'false': strings[NO]
						}
					}),
					formatter: A.bind(instance._booleanFormatter, instance),
					name: strings[SHOW_LABEL]
				}
			];
		},

		_uiSetAcceptChildren: function(val) {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);
			var dropZone = instance.get(DROP_ZONE_NODE);
			var markupDropZone = contentBox.one(DOT+CSS_FORM_BUILDER_DROP_ZONE);

			if (val && !markupDropZone) {
				contentBox.append(dropZone);
			}
			else if (!val && markupDropZone) {
				markupDropZone.remove();
			}
			else if (val && markupDropZone) {
				instance.set(DROP_ZONE_NODE, markupDropZone);
			}

			instance.get(TEMPLATE_NODE).hide();
		}

	}

});

A.FormBuilderFieldsetField = FormBuilderFieldsetField;

A.FormBuilder.types['fieldset'] = A.FormBuilderFieldsetField;