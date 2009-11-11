AUI.add('char-counter', function(A) {

/*
* CharCounter
*/
var L = A.Lang,
	isNumber = L.isNumber,

	CHAR_COUNTER = 'char-counter',
	COUNTER = 'counter',
	INPUT = 'input',
	MAX_LENGTH = 'maxLength',
	SCROLL_LEFT = 'scrollLeft',
	SCROLL_TOP = 'scrollTop';

function CharCounter(config) {
	CharCounter.superclass.constructor.apply(this, arguments);
}

A.mix(CharCounter, {
	NAME: CHAR_COUNTER,

	ATTRS: {
		counter: {
			setter: function(v) {
				return A.one(v);
			}
		},

		maxLength: {
			lazyAdd: false,
			setter: function(v) {
				return this._setMaxLength(v);
			},
			value: Infinity,
			validator: isNumber
		},

		input: {
			setter: function(v) {
				return A.one(v);
			}
		}
	}
});

A.extend(CharCounter, A.Base, {
	handler: null,

	/*
	* Lifecycle
	*/
	initializer: function() {
		var instance = this;

		instance.bindUI();

		instance.checkLength();
	},

	/*
	* Methods
	*/
	bindUI: function() {
		var instance = this;
		var input = instance.get(INPUT);

		instance.publish('maxLength');

		instance.after('maxLengthChange', instance.checkLength);

		// use cross browser input-handler event
		instance.handler = input.on(INPUT, A.bind(instance._onInputChange, instance));
	},

	syncUI: function() {
		var instance = this;
		var counter = instance.get(COUNTER);

		if (counter) {
			var value = instance.get(INPUT).val();

			counter.html(
				instance.get(MAX_LENGTH) - value.length
			);
		}
	},

	destroy: function() {
		var instance = this;

		if (instance.handler) {
			instance.handler.detach();
		}
	},

	checkLength: function() {
		var instance = this;
		var input = instance.get(INPUT);
		var maxLength = instance.get(MAX_LENGTH);
		var value = input.val();

		var scrollTop = input.get(SCROLL_TOP);
		var scrollLeft = input.get(SCROLL_LEFT);

		if (value.length > maxLength) {
			input.val(
				value.substring(0, maxLength)
			);
		}

		if (value.length == maxLength) {
			instance.fire('maxLength');
		}

		input.set(SCROLL_TOP, scrollTop);
		input.set(SCROLL_LEFT, scrollLeft);

		instance.syncUI();
	},

	/*
	* Listeners
	*/
	_onInputChange: function(event) {
		var instance = this;

		instance.checkLength();
	},

	/*
	* Setters
	*/
	_setMaxLength: function(v) {
		var instance = this;
		var input = instance.get(INPUT);

		if (input && (v < Infinity)) {
			input.set(MAX_LENGTH, v);
		}

		return v;
	}
});

A.CharCounter = CharCounter;

}, '@VERSION', { requires: [ 'aui-base', 'input-handler' ] });