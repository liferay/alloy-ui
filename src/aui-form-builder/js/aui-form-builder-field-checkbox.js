/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-checkbox
 */

var L = A.Lang,

	AArray = A.Array,

	BOOLEAN = 'boolean',
	CHECKBOX = 'checkbox',
	CHECKED = 'checked',
	CHOICE = 'choice',
	EMPTY_STR = '',
	FIELD = 'field',
	FORM_BUILDER_CHECKBOX_FIELD = 'form-builder-checkbox-field',
	FORM_BUILDER_FIELD = 'form-builder-field',
	ID = 'id',
	LABEL = 'label',
	LABEL_NODE = 'labelNode',
	NAME = 'name',
	NO = 'no',
	NODE = 'node',
	PREDEFINED_VALUE = 'predefinedValue',
	SPACE = ' ',
	TEMPLATE = 'template',
	TEMPLATE_NODE = 'templateNode',
	YES = 'yes',

	getCN = A.getClassName,

	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_CHECKBOX = getCN(FIELD, CHECKBOX),
	CSS_FIELD_CHOICE = getCN(FIELD, CHOICE),
	CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
	CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

	TPL_CHECKBOX = '<input id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE, CSS_FIELD, CSS_FIELD_CHECKBOX, CSS_FIELD_CHOICE].join(SPACE) + '" name="{name}" type="checkbox" value="{value}" {checked} />';

/**
 * A base class for FormBuilderCheckBoxField.
 *
 * @class A.FormBuilderCheckBoxField
 * @extends A.FormBuilderField
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var FormBuilderCheckBoxField = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property FormBuilderCheckBoxField.NAME
	 * @type String
	 * @static
	 */
	NAME: FORM_BUILDER_CHECKBOX_FIELD,

	/**
	 * Static property used to define the default attribute
	 * configuration for the FormBuilderCheckBoxField.
	 *
	 * @property FormBuilderCheckBoxField.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute dataType
		 * @default 'boolean'
		 * @type String
		 */
		dataType: {
			value: BOOLEAN
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute predefinedValue
		 * @default false
		 * @type Boolean
		 */
		predefinedValue: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute template
		 */
		template: {
			valueFn: function() {
				return TPL_CHECKBOX;
			}
		}

	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property FormBuilderCheckBoxField.CSS_PREFIX
	 * @static
	 */
	CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property FormBuilderCheckBoxField.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.FormBuilderField,

	prototype: {

		/**
		 * Render the FormBuilderCheckBoxField component instance. Lifecycle.
		 *
		 * @method renderUI
		 * @protected
		 */
		renderUI: function() {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE),
				labelNode = instance.get(LABEL_NODE);

			A.FormBuilderCheckBoxField.superclass.renderUI.apply(instance, arguments);

			labelNode.insert(templateNode, labelNode, 'before');
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getPropertyModel
		 */
		getPropertyModel: function() {
			var instance = this,
				strings = instance.getStrings();

			var model = A.FormBuilderCheckBoxField.superclass.getPropertyModel.apply(instance, arguments);

			AArray.each(model, function(item, index, collection) {
				if (item.attributeName === PREDEFINED_VALUE) {
					collection[index] = {
						attributeName: PREDEFINED_VALUE,
						editor: new A.RadioCellEditor({
							options: {
								'true': strings[YES],
								'false': strings[NO]
							}
						}),
						formatter: A.bind(instance._booleanFormatter, instance),
						name: strings[PREDEFINED_VALUE]
					};
				}
			});

			return model;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			var instance = this,
				checked = instance.get(CHECKED);

			return L.sub(
				instance.get(TEMPLATE),
				{
					checked: checked ? 'checked="checked"' : EMPTY_STR,
					id: instance.get(ID),
					label: instance.get(LABEL),
					name: instance.get(NAME),
					value: instance.get(PREDEFINED_VALUE)
				}
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
				templateNode = instance.get(TEMPLATE_NODE);

			if (val) {
				templateNode.setAttribute(CHECKED, val);
			}
			else {
				templateNode.removeAttribute(CHECKED);
			}
		}

	}

});

A.FormBuilderCheckBoxField = FormBuilderCheckBoxField;

A.FormBuilder.types.checkbox = A.FormBuilderCheckBoxField;