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

			strings: {
				value: {
					defaultText: ''
				}
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
				},

				_filterInputText: function(event) {
					var instance = this;

					var allowOnly = instance.get('allowOnly');

					var inputChar = String.fromCharCode(event.charCode);

					if (!allowOnly.test(inputChar)) {
						event.halt();
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