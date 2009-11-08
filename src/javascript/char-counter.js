AUI.add('char-counter', function(A) {

/*
* CharCounter
*/
var L = A.Lang,
	isNumber = L.isNumber,

	ACTIVE_ELEMENT = 'activeElement',
	BLANK = '',
	CHAR_COUNTER = 'char-counter',
	COUNTER = 'counter',
	INPUT = 'input',
	MAX_LENGTH = 'maxLength',
	OWNER_DOCUMENT = 'ownerDocument',
	SCROLL_LEFT = 'scrollLeft',
	SCROLL_TOP = 'scrollTop',

	UA = A.UA;

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

		instance.after('maxLengthChange', instance.checkLength);

		// priorize input event that supports copy & paste
		var type = 'input';

		// WebKit before version 531 (3.0.182.2) did not support input events for textareas.
		// http://dev.chromium.org/developers/webkit-version-table
		// All Chrome versions supports input event
		// TODO: use UA.chrome when YUI 3 detects it
		if (!/chrome/i.test(UA.agent) && UA.webkit && UA.version.major <= 2) {
			type = 'keypress';
		}
		else if (UA.ie) {
			// IE doesn't support input event, simulate it with propertychange
			type = 'propertychange';
		}

		A.Event.attach(type, A.bind(instance._onInputChange, instance), input);
	},

	syncUI: function() {
		var instance = this;
		var counter = instance.get(COUNTER);

		if (counter) {
			value = instance.get(INPUT).val() || BLANK;

			counter.html(
				instance.get(MAX_LENGTH) - value.length
			);
		}
	},

	checkLength: function() {
		var instance = this;
		var input = instance.get(INPUT);
		var maxLength = instance.get(MAX_LENGTH);
		var value = input.val() || BLANK;

		var scrollTop = input.get(SCROLL_TOP);
		var scrollLeft = input.get(SCROLL_LEFT);

		if (value.length > maxLength) {
			input.val(
				value.substring(0, maxLength)
			);
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
		var input = instance.get(INPUT);
		var originalEvent = event._event;

		// only trigger checkLength() on IE when propertychange happens on the value attribute
		if (event.type == 'propertychange') {
			if (originalEvent && (originalEvent.propertyName != 'value')) {
				return false; // NOTE: return
			}
		}

		var focused = (input.get(OWNER_DOCUMENT).get(ACTIVE_ELEMENT) == input);

		if (focused) {
			instance.checkLength();
		}
	},

	/*
	* Setters
	*/
	_setMaxLength: function(v) {
		var instance = this;
		var input = instance.get(INPUT);

		if (v < Infinity) {
			input.set(MAX_LENGTH, v);
		}

		return v;
	}
});

A.CharCounter = CharCounter;

}, '@VERSION', { requires: [ 'aui-base' ] });