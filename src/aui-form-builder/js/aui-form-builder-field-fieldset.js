var L = A.Lang,

	ACCEPT_CHILDREN = 'acceptChildren',
	BUILDER = 'builder',
	CONTENT_BOX = 'contentBox',
	DOT = '.',
	DROP = 'drop',
	DROP_ZONE_NODE = 'dropZoneNode',
	FORM = 'form',
	FORM_BUILDER_FIELD = 'form-builder-field',
	FORM_BUILDER_FIELDSET_FIELD = 'form-builder-fieldset-field',
	ID = 'id',
	LABEL = 'label',
	NO = 'no',
	NODE = 'node',
	SHOW_LABEL = 'showLabel',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TYPE = 'type',
	YES = 'yes',
	ZONE = 'zone',

	getCN = A.getClassName,

	CSS_FIELD_LABEL = getCN(FORM_BUILDER_FIELD, LABEL),
	CSS_FORM_BUILDER_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

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
			var instance = this,
				strings = instance.getStrings();

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
			var instance = this,
				contentBox = instance.get(CONTENT_BOX),
				dropZone = instance.get(DROP_ZONE_NODE),
				markupDropZone = contentBox.one(DOT+CSS_FORM_BUILDER_DROP_ZONE);

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

A.FormBuilder.types.fieldset = A.FormBuilderFieldsetField;