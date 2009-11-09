AUI().add(
	'textfield',
	function(A) {
		var Lang = A.Lang,

			getClassName = A.ClassNameManager.getClassName,

			NAME = 'textfield',

			CSS_TEXTFIELD = getClassName(NAME);

		var Textfield = function() {
			Textfield.superclass.constructor.apply(this, arguments);
		};

		Textfield.NAME = NAME;

		Textfield.ATTRS = {
			selectOnFocus: {
				value: false
			},

			allowOnly: {
				value: null,
				validator: function(value) {
					var instance = this;

					return value instanceof RegExp;
				}
			},

			defaultValue: {
				value: ''
			},

			validator: {
				value: null
			}
		};

		A.extend(
			Textfield,
			A.Field,
			{
				bindUI: function() {
					var instance = this;

					Textfield.superclass.bindUI.call(instance);

					var node = instance.get('node');

					if (instance.get('allowOnly')) {
						node.on('keypress', instance._filterInputText, instance);
					}

					if (instance.get('selectOnFocus')) {
						node.on('focus', instance._selectInputText, instance);
					}

					var defaultValue = instance.get('defaultValue');

					if (defaultValue) {
						node.on('blur', instance._checkDefaultValue, instance);
						node.on('focus', instance._checkDefaultValue, instance);
					}
				},

				syncUI: function() {
					var instance = this;

					var node = instance.get('node');
					var currentValue = node.val();

					if (!currentValue) {
						var defaultValue = instance.get('defaultValue');

						node.val(instance.get('defaultValue'));
					}
				},

				_filterInputText: function(event) {
					var instance = this;

					var allowOnly = instance.get('allowOnly');

					var inputChar = String.fromCharCode(event.charCode);

					if (!allowOnly.test(inputChar)) {
						event.halt();
					}
				},

				_checkDefaultValue: function(event) {
					var instance = this;

					var defaultValue = instance.get('defaultValue');
					var node = instance.get('node');
					var currentValue = Lang.trim(node.val());
					var eventType = event.type;

					if (defaultValue) {
						var value = currentValue;

						if (eventType == 'focus' && (currentValue == defaultValue)) {
							value = '';
						}
						else if (eventType == 'blur' && !currentValue) {
							value = defaultValue;
						}

						node.val(value);
					}
				},

				_selectInputText: function(event) {
					var instance = this;

					event.currentTarget.select();
				}
			}
		);

		A.Textfield = Textfield;
	},
	'@VERSION',
	{
		requires: ['field'],
		use: []
	}
);