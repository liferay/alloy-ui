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

	ADD = 'add',
	ADD_NODE = 'addNode',
	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	BUTTON_TYPE = 'buttonType',
	CONTENT_BOX = 'contentBox',
	CONTAINER = 'container',
	DEFAULT = 'default',
	DEFAULT_NAME = 'defaultName',
	DEFAULT_OPTIONS = 'defaultOptions',
	DEFAULT_VALUE = 'defaultValue',
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
	FORM_BUILDER_MULTIPLE_CHOICE_FIELD = 'form-builder-multiple-choice-field',
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
	PROXY = 'proxy',
	REMOVE = 'remove',
	RESET = 'reset',
	SUBMIT = 'submit',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	TEXT = 'text',
	TYPE = 'type',
	VALUE = 'value',

	getCN = A.getClassName,

	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_FIELD_OPTIONS_ADD = getCN(FIELD, OPTIONS, ADD),
	CSS_FIELD_OPTIONS_ITEM = getCN(FIELD, OPTIONS, ITEM),
	CSS_FIELD_OPTIONS_ITEM_INPUT = getCN(FIELD, OPTIONS, ITEM, INPUT),
	CSS_FIELD_OPTIONS_ITEM_INPUT_NAME = getCN(FIELD, OPTIONS, ITEM, INPUT, NAME),
	CSS_FIELD_OPTIONS_ITEM_INPUT_VALUE = getCN(FIELD, OPTIONS, ITEM, INPUT, VALUE),
	CSS_FIELD_OPTIONS_ITEM_REMOVE = getCN(FIELD, OPTIONS, ITEM, REMOVE),

	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_OPTION = '<div class="' + [CSS_FIELD_OPTIONS_ITEM, CSS_FIELD_LABELS_INLINE, CSS_HELPER_CLEARFIX].join(SPACE) + '">' +
					'<input type="text" class="' + [CSS_FIELD_OPTIONS_ITEM_INPUT, CSS_FIELD_OPTIONS_ITEM_INPUT_NAME, CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT].join(SPACE) + '" value="{name}" />' +
					'<input type="text" class="' + [CSS_FIELD_OPTIONS_ITEM_INPUT, CSS_FIELD_OPTIONS_ITEM_INPUT_VALUE, CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT].join(SPACE) + '" value="{value}" />' +
					'<a href="javascript:;" class="' + CSS_FIELD_OPTIONS_ITEM_REMOVE + '">&nbsp;</a>' +
				 '</div>';

	TPL_ADD = '<a class="' + CSS_FIELD_OPTIONS_ADD + '" href="javascript:;">Add an option</a>',

	ENTER = 'ENTER';

var FieldOptions = A.Component.create({

	NAME: OPTIONS,

	ATTRS: {

		allowClear: {
			value: false
		},

		defaultName: {
			value: EMPTY_STR
		},

		defaultValue: {
			value: EMPTY_STR
		},

		options: {
			value: [],
			getter: '_getOptions',
			validator: isArray
		},

		addNode: {
			valueFn: function() {
				return A.Node.create(TPL_ADD);
			}
		}

	},

	HTML_PARSER: {
		addNode: DOT + CSS_FIELD_OPTIONS_ADD
	},

	UI_ATTRS: [OPTIONS],

	EXTENDS: A.Widget,

	prototype: {

		renderUI: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var addNode = instance.get(ADD_NODE);

			if (!addNode.inDoc()) {
				boundingBox.append(addNode);
			}
		},

		bindUI: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var addNode = instance.get(ADD_NODE);

			addNode.on('click', A.bind(instance._onClickAdd, instance));

			boundingBox.delegate('click', A.bind(instance._onClickOptionRemove, instance), DOT + CSS_FIELD_OPTIONS_ITEM_REMOVE);
			boundingBox.delegate('keypress', A.bind(instance._onKeyPressOption, instance), DOT + CSS_FIELD_OPTIONS_ITEM_INPUT);
		},

		add: function(option) {
			var instance = this;
			var options = instance.get(OPTIONS);

			options.push(option);

			instance.set(OPTIONS, options);
		},

		clear: function() {
			var instance = this;

			if (instance.get(ALLOW_CLEAR)) {
				instance.set(OPTIONS, []);
			}
		},

		remove: function(index) {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);
			var optionNode = instance._getOptionNode(index);

			if (optionNode) {
				optionNode.remove();
			}

			instance.items = contentBox.all(DOT + CSS_FIELD_OPTIONS_ITEM);
		},

		_addNewOption: function() {
			var instance = this;
			var contentBox = instance.get(CONTENT_BOX);

			var newOptionNode = instance._createOption(
				{
					name: instance.get(DEFAULT_NAME),
					value: instance.get(DEFAULT_VALUE)
				}
			);

			newOptionNode = A.Node.create(newOptionNode);

			contentBox.append(newOptionNode);

			var newOptionNodeInput = newOptionNode.one(INPUT);

			newOptionNodeInput.focus();
			newOptionNodeInput.select();

			instance.items = contentBox.all(DOT + CSS_FIELD_OPTIONS_ITEM);

			return newOptionNode;
		},

		_createOption: function(option) {
			var  instance = this;

			return A.substitute(TPL_OPTION, option);
		},

		_getOptionNode: function(index) {
			var instance = this;

			return instance.items.item(index);
		},

		_getOptions: function(val) {
			var instance = this;
			var options = [];

			if (instance.items) {
				A.each(instance.items, function(option) {
					var nameInput = option.one(DOT + CSS_FIELD_OPTIONS_ITEM_INPUT_NAME);
					var valueInput = option.one(DOT + CSS_FIELD_OPTIONS_ITEM_INPUT_VALUE);

					options.push(
						{
							name: nameInput.val(),
							value: valueInput.val()
						}
					);
				});
			}
			else {
				options = val;
			}

			return options;
		},

		_indexOfTarget: function(target) {
			var instance = this;
			var currentItem = target.ancestor(DOT + CSS_FIELD_OPTIONS_ITEM);

			return instance.items.indexOf(currentItem);
		},

		_onClickAdd: function(event) {
			var instance = this;

			instance._addNewOption();
		},

		_onClickOptionRemove: function(event) {
			var instance = this;
			var options = instance.get(OPTIONS);
			var index = instance._indexOfTarget(event.target);

			instance.remove(index);
		},

		_onKeyPressOption: function(event) {
			var instance = this;
			var options = instance.get(OPTIONS);
			var target = event.currentTarget;
			var items = instance.items;

			if (event.isKey(ENTER)) {
				var index = instance._indexOfTarget(target);
				var isValue = target.hasClass(CSS_FIELD_OPTIONS_ITEM_INPUT_VALUE);

				if ((index == items.size() - 1) && isValue) {
					instance._addNewOption();
				}
			}
		},

		_uiSetOptions: function(val) {
			var instance = this;
			var buffer = [];
			var contentBox = instance.get(CONTENT_BOX);

			contentBox.empty();

			A.each(val, function(item) {
				contentBox.append(instance._createOption(item));
			});

			instance.items = contentBox.all(DOT + CSS_FIELD_OPTIONS_ITEM);
		}
	}
});

var FormBuilderMultipleChoiceField = A.Component.create({

	NAME: FORM_BUILDER_MULTIPLE_CHOICE_FIELD,

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
		 * The options of the multiple choice field
		 *
		 * @attribute options
		 */
		options: {
			value:
			[
				{
					name: 'option 1',
					value: 'value 1'
				},
				{
					name: 'option 2',
					value: 'value 2'
				},
				{
					name: 'option 3',
					value: 'value 3'
				}
			]
		},

		/**
		 * The template for each option
		 *
		 * @attribute optionTemplate
		 */
		optionTemplate: {
			value: '<option value="{value}">{name}</option>'
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, PREDEFINED_VALUE, LABEL, NAME, OPTIONS, SHOW_LABEL],

	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	HTML_PARSER: {
		templateNode: DOT + CSS_FORM_BUILDER_FIELD_NODE
	},

	EXTENDS: A.FormBuilderField,

	prototype: {

		/**
		 * Initializer
		 *
		 * @method initializer
		 */
		initializer: function() {
			var instance = this;

			A.FormBuilderMultipleChoiceField.superclass.initializer.apply(instance, arguments);
		},

		/**
		 * Returns the A.Node of the field's HTML content
		 *
		 * @method getFieldNode
		 */
		getNode: function() {
			var instance = this;

			return A.FormBuilderMultipleChoiceField.superclass.getNode.apply(instance, arguments);
		},

		/**
		 * Renders the settings UI
		 *
		 * @method renderSettings
		 */
		renderSettings: function() {
			var instance = this;

			A.FormBuilderMultipleChoiceField.superclass.renderSettings.apply(instance, arguments);

			if (!instance._renderedMultipleChoiceSettings) {
				instance._renderedMultipleChoiceSettings = true;

				var optionsPanelBody = A.Node.create(TPL_DIV);

				instance.optionsPanel = new A.Panel(
					{
						bodyContent: optionsPanelBody,
						collapsible: true,
						title: 'Options'
					}
				).render();

				instance.options = new FieldOptions(
					{
						options: instance.get(OPTIONS)
					}
				).render(optionsPanelBody);

				instance.fieldSettingsNode.append(instance.optionsPanel.get(BOUNDING_BOX));
			}
		},

		/**
		 * Saves the settings info from the settings form to the settings
		 * attribute
		 *
		 * @method saveSettings
		 */
		saveSettings: function() {
			var instance = this;

			A.FormBuilderMultipleChoiceField.superclass.saveSettings.apply(instance, arguments);

			instance.set(OPTIONS, instance.options.get(OPTIONS));
		},

		_uiSetOptions: function(val) {
			var instance = this;
			var templateNode = instance.get(TEMPLATE_NODE);

			templateNode.empty();

			A.each(val, function(item) {
				templateNode.append(
					A.substitute(instance.get(OPTION_TEMPLATE), item)
				);
			});
		}

	}

});

A.FormBuilderMultipleChoiceField = FormBuilderMultipleChoiceField;

A.FormBuilder.types['multiple-choice'] = A.FormBuilderMultipleChoiceField;
