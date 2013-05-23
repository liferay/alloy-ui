/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-multiple-choice
 */

var Lang = A.Lang,

	isArray = Lang.isArray,

	AArray = A.Array,

	ACCEPT_CHILDREN = 'acceptChildren',
	EDITOR = 'editor',
	FIELD = 'field',
	FORM_BUILDER = 'form-builder',
	FORM_BUILDER_MULTIPLE_CHOICE_FIELD = 'form-builder-multiple-choice-field',
	FORM_BUILDER_OPTIONS_EDITOR = 'form-builder-options-editor',
	HIDDEN = 'hidden',
	LABEL = 'label',
	NAME = 'name',
	OPTION_TEMPLATE = 'optionTemplate',
	OPTIONS = 'options',
	PREDEFINED_VALUE = 'predefinedValue',
	RENDER = 'render',
	SELECTED = 'selected',
	SHOW_LABEL = 'showLabel',
	TEMPLATE_NODE = 'templateNode',

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

	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER, FIELD),
	CSS_FORM_BUILDER_OPTIONS_EDITOR_HIDDEN = getCN(FORM_BUILDER, OPTIONS, EDITOR, HIDDEN);

/**
 * A base class for OptionsEditor.
 *
 * @class A.OptionsEditor
 * @extends A.RadioCellEditor
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var OptionsEditor = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property OptionsEditor.NAME
	 * @type String
	 * @static
	 */
	NAME: FORM_BUILDER_OPTIONS_EDITOR,

	/**
	 * Static property used to define the default attribute
	 * configuration for the OptionsEditor.
	 *
	 * @property OptionsEditor.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute editable
		 */
		editable: {
			setter: function() {
				return false;
			}
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property OptionsEditor.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.RadioCellEditor,

	prototype: {
		ELEMENT_TEMPLATE: '<div class="' + CSS_FORM_BUILDER_OPTIONS_EDITOR_HIDDEN + '"></div>',

		/**
		 * Construction logic executed during OptionsEditor instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function() {
			var instance = this;

			instance.after(RENDER, function() {
				instance._onEditEvent();
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleSaveEvent
		 * @param event
		 * @protected
		 */
		_handleSaveEvent: function(event) {
			var instance = this;

			instance.saveOptions();

			OptionsEditor.superclass._handleSaveEvent.apply(this, arguments);
		}
	}
});

/**
 * A base class for FormBuilderMultipleChoiceField.
 *
 * @class A.FormBuilderMultipleChoiceField
 * @extends A.FormBuilderField
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var FormBuilderMultipleChoiceField = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property FormBuilderMultipleChoiceField.NAME
	 * @type String
	 * @static
	 */
	NAME: FORM_BUILDER_MULTIPLE_CHOICE_FIELD,

	/**
	 * Static property used to define the default attribute
	 * configuration for the FormBuilderMultipleChoiceField.
	 *
	 * @property FormBuilderMultipleChoiceField.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute acceptChildren
		 * @default false
		 * @type Boolean
		 * @readOnly
		 */
		acceptChildren: {
			value: false,
			readOnly: true
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute options
		 * @type Object
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute optionTemplate
		 * @default '<option value="{value}">{label}</option>'
		 * @type String
		 */
		optionTemplate: {
			value: '<option value="{value}">{label}</option>'
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute predefinedValue
		 */
		predefinedValue: {
			setter: function(val) {
				return isArray(val) ? val : [val];
			}
		}
	},

	/**
	 * Static property used to define the UI attributes.
	 *
	 * @property FormBuilderMultipleChoiceField.UI_ATTRS
	 * @type Array
	 * @static
	 */
	UI_ATTRS: [ACCEPT_CHILDREN, LABEL, NAME, OPTIONS, PREDEFINED_VALUE, SHOW_LABEL],

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property FormBuilderMultipleChoiceField.CSS_PREFIX
	 * @type String
	 * @static
	 */
	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property FormBuilderMultipleChoiceField.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.FormBuilderField,

	prototype: {

		/**
		 * Construction logic executed during FormBuilderMultipleChoiceField
		 * instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function() {
			var instance = this,
				options = instance.get(OPTIONS);

			instance.predefinedValueEditor = new A.DropDownCellEditor({
				options: getEditorOptions(options)
			});
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getPropertyModel
		 */
		getPropertyModel: function() {
			var instance = this,
				options = instance.get(OPTIONS),
				strings = instance.getStrings();

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
									var editorOptions = instance.predefinedValueEditor.get(OPTIONS),
										values = o.data.value;

									if (!isArray(values)) {
										values = [values];
									}

									var labels = A.Array.map(values, function (val) {
										return editorOptions[val];
									});

									return labels.join(_COMMA+_SPACE);
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
							o.data.value,
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetOptions
		 * @param val
		 * @protected
		 */
		_uiSetOptions: function(val) {
			var instance = this;

			var buffer = [];

			A.each(
				val,
				function(item, index, collection) {
					buffer.push(
						Lang.sub(
							instance.get(OPTION_TEMPLATE),
							{
								label: item.label,
								value: item.value
							}
						)
					);
				}
			);

			instance.optionNodes = A.NodeList.create(buffer.join(_EMPTY_STR));

			instance.get(TEMPLATE_NODE).setContent(instance.optionNodes);

			instance._uiSetPredefinedValue(
				instance.get(PREDEFINED_VALUE)
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetPredefinedValue
		 * @param val
		 * @protected
		 */
		_uiSetPredefinedValue: function(val) {
			var instance = this,
				optionNodes = instance.optionNodes;

			if (!optionNodes) {
				return;
			}

			optionNodes.set(SELECTED, false);

			AArray.each(val, function(item) {
				optionNodes.filter('[value="' + item + '"]').set(SELECTED, true);
			});
		}
	}

});

A.FormBuilderMultipleChoiceField = FormBuilderMultipleChoiceField;

A.FormBuilder.types['multiple-choice'] = A.FormBuilderMultipleChoiceField;