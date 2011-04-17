AUI.add('aui-form-select', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isObject = Lang.isObject,

	getClassName = A.getClassName,

	NAME = 'select',

	CSS_SELECT = getClassName(NAME),
	TPL_SELECT = '<select {multiple} class="{cssClass}" id="{id}" name="{name}"></select>';

var Select = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {

			multiple: {
				value: false
			},

			options: {
				value: [],
				setter: '_setOptions'
			},

			selectedIndex: {
				value: -1
			}
		},

		UI_ATTRS: ['multiple', 'options', 'selectedIndex'],

		EXTENDS: A.Field,

		HTML_PARSER: {
			node: 'select'
		},

		prototype: {
			FIELD_TEMPLATE: TPL_SELECT,
			FIELD_TYPE: NAME,

			_setOptions: function(value) {
				var instance = this;

				if (!isArray(value)) {
					value = [value];
				}

				return value;
			},

			_uiSetMultiple: function(value) {
				var instance = this;

				instance.get('node').attr('multiple', value);
			},

			_uiSetOptions: function(value) {
				var instance = this;

				var buffer = [];

				var option;
				var optionLabel;
				var optionValue;
				var selectedIndex = 0;

				for (var i = 0; i < value.length; i++) {
					option = value[i];
					optionLabel = option.labelText || option;
					optionValue = option.value || option;

					if (option.selected) {
						selectedIndex = i;
					}

					buffer.push('<option value="' + optionValue + '">' + optionLabel + '</option>');
				}

				var node = instance.get('node');

				node.all('option').remove(true);

				node.append(buffer.join(''));

				instance.set('selectedIndex', selectedIndex);
			},

			_uiSetSelectedIndex: function(value) {
				var instance = this;

				if (value > -1) {
					instance.get('node').attr('selectedIndex', value);
				}
			}
		}
	}
);

A.Select = Select;

}, '@VERSION@' ,{requires:['aui-form-field']});
