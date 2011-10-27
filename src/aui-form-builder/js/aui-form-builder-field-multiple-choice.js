var Lang = A.Lang,
	AArray = A.Array,
	isString = Lang.isString,

	ADD_OPTION = 'addOption',
	DATA = 'data',
	DRAG = 'drag',
	DROP = 'drop',
	EDIT_OPTIONS = 'editOptions',
	EDITABLE = 'editable',
	EDITOR = 'editor',
	FIELD = 'field',
	FIELDS = 'fields',
	FORM_BUILDER = 'form-builder',
	FORM_BUILDER_MULTIPLE_CHOICE_FIELD = 'form-builder-multiple-choice-field',
	FORM_BUILDER_OPTIONS_EDITOR = 'form-builder-options-editor',
	HIDDEN = 'hidden',
	ICON = 'icon',
	ID = 'id',
	INPUT = 'input',
	ITEM = 'item',
	LABEL = 'label',
	MULTIPLE = 'multiple',
	NAME = 'name',
	NODE = 'node',
	OPTION = 'option',
	OPTION_TEMPLATE = 'optionTemplate',
	OPTIONS = 'options',
	PREDEFINED_VALUE = 'predefinedValue',
	RENDER = 'render',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TYPE = 'type',
	VALUE = 'value',

	_COMMA = ',',
	_EMPTY_STR = '',
	_SPACE = ' ',

	getCN = A.getClassName,

	getEditorOptions = function(val) {
		var options = {};

		AArray.each(
			val,
			function(item, index, collection) {
				options[item.value] = item.label;
			}
		);

		return options;
	},

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER, FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),
	CSS_FORM_BUILDER_OPTIONS_EDITOR_HIDDEN = getCN(FORM_BUILDER, OPTIONS, EDITOR, HIDDEN);

var OptionsEditor = A.Component.create({
	NAME: FORM_BUILDER_OPTIONS_EDITOR,

	ATTRS: {
		editable: {
			setter: function() {
				return false;	
			}
		}
	},

	EXTENDS: A.RadioCellEditor,

	prototype: {
		ELEMENT_TEMPLATE: '<div class="' + CSS_FORM_BUILDER_OPTIONS_EDITOR_HIDDEN + '"></div>',

		initializer: function() {
			var instance = this;

			instance.after(RENDER, function() {
				instance._onEditEvent();
			});
		},

		_onSubmit: function(event) {
			var instance = this;

			instance.saveOptions();

			OptionsEditor.superclass._onSubmit.apply(this, arguments);
		}
	}
});

var FormBuilderMultipleChoiceField = A.Component.create({
	NAME: FORM_BUILDER_MULTIPLE_CHOICE_FIELD,

	ATTRS: {
		acceptChildren: {
			value: false,
			readOnly: true
		},

		options: {
			value: [
				{
					label: 'option 1',
					value: 'value 1'
				},
				{
					label: 'option 2',
					value: 'value 2'
				},
				{
					label: 'option 3',
					value: 'value 3'
				}
			]
		},

		optionTemplate: {
			value: '<option {selected} value="{value}">{label}</option>'
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, OPTIONS, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	EXTENDS: A.FormBuilderField,

	prototype: {

		initializer: function() {
			var instance = this;
			var options = instance.get(OPTIONS);

			instance.predefinedValueEditor = new A.RadioCellEditor({
				options: getEditorOptions(options)
			});
		},

		getPropertyModel: function() {
			var instance = this;
			var options = instance.get(OPTIONS);
			var strings = instance.getStrings();

			var model = A.FormBuilderMultipleChoiceField.superclass.getPropertyModel.apply(instance, arguments);

			AArray.each(
				model,
				function(item, index, collection) {
					if (item.attributeName === PREDEFINED_VALUE) {
						collection[index] = A.merge(
							item,
							{
								editor: instance.predefinedValueEditor,
								formatter: function(o) {
									var editorOptions = instance.predefinedValueEditor.get(OPTIONS);

									var value = editorOptions[o.record.get(DATA).value];

									if (!isString(value)) {
										value = _EMPTY_STR;
									}

									return value;
								}
							}
						);
					}
				}
			);

			model.push(
				{
					attributeName: OPTIONS,
					editor: new OptionsEditor({
						editable: true,
						on: {
							optionsChange : function (event) {
								instance.predefinedValueEditor.set(OPTIONS, event.newVal);
							}
						},
						options: getEditorOptions(options),
						inputFormatter: function() {
							var input = [];

							A.each(
								this.get(OPTIONS),
								function(item, index, collection) {
									var option = {
										label: item,
										value: index
									};

									AArray.each(
										options,
										function(oItem) {
											if (oItem.value === index) {
												option = A.merge(oItem, option);
											}
										}
									);

									input.push(option);
								}
							);

							return input;
						}
					}),
					formatter: function(o) {
						var buffer = [];

						A.each(
							o.record.get(DATA).value,
							function(item, index, collection) {
								buffer.push(item.label);
							}
						);

						return buffer.join(_COMMA+_SPACE);
					},
					name: strings[OPTIONS]
				}
			);

			return model;
		},

		_uiSetOptions: function(val) {
			var instance = this;
			var predefinedValue = instance.get(PREDEFINED_VALUE);

			var buffer = [];

			A.each(
				val,
				function(item, index, collection) {
					buffer.push(
						Lang.sub(
							instance.get(OPTION_TEMPLATE),
							{
								label: item.label,
								selected: item.value === predefinedValue ? 'selected="selected"' : _EMPTY_STR,
								value: item.value
							}
						)
					);
				}
			);

			instance.get(TEMPLATE_NODE).setContent(buffer.join(_EMPTY_STR));
		}
	}

});

A.FormBuilderMultipleChoiceField = FormBuilderMultipleChoiceField;

A.FormBuilder.types['multiple-choice'] = A.FormBuilderMultipleChoiceField;