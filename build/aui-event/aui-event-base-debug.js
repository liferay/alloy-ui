AUI.add('aui-event-base', function(A) {
var Lang = A.Lang,
	AArray = A.Array,
	DOMEventFacade = A.DOMEventFacade,
	DOMEventFacadeProto = DOMEventFacade.prototype,

	BACKSPACE = 'BACKSPACE',
	CAPS_LOCK = 'CAPS_LOCK',
	DOWN = 'DOWN',
	ENTER = 'ENTER',
	ESC = 'ESC',
	INSERT = 'INSERT',
	PAGE_UP = 'PAGE_UP',
	PRINT_SCREEN = 'PRINT_SCREEN',
	SHIFT = 'SHIFT',
	TAB = 'TAB',
	WIN_IME = 'WIN_IME',

	STR_EMPTY = '';

var KeyMap = {
	BACKSPACE: 8,
	TAB: 9,
	NUM_CENTER: 12,

	ENTER: 13,
	RETURN: 13,

	SHIFT: 16,
	CTRL: 17,
	ALT: 18,

	PAUSE: 19,
	CAPS_LOCK: 20,
	ESC: 27,
	SPACE: 32,

	PAGE_UP: 33,
	PAGE_DOWN: 34,

	END: 35,
	HOME: 36,

	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,

	PRINT_SCREEN: 44,
	INSERT: 45,
	DELETE: 46,

	ZERO: 48,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,

	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,

	CONTEXT_MENU: 93,

	NUM_ZERO: 96,
	NUM_ONE: 97,
	NUM_TWO: 98,
	NUM_THREE: 99,
	NUM_FOUR: 100,
	NUM_FIVE: 101,
	NUM_SIX: 102,
	NUM_SEVEN: 103,
	NUM_EIGHT: 104,
	NUM_NINE: 105,

	NUM_MULTIPLY: 106,
	NUM_PLUS: 107,
	NUM_MINUS: 109,
	NUM_PERIOD: 110,
	NUM_DIVISION: 111,

	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,

	NUM_LOCK: 144,

	WIN_KEY: 224,
	WIN_IME: 229,

	hasModifier: function(event) {
		var instance = this;

		return event &&
			(event.ctrlKey ||
			event.altKey ||
			event.shiftKey ||
			event.metaKey);
	},

	isKey: function(keyCode, name) {
		var instance = this;

		return name && ((instance[name] || instance[name.toUpperCase()]) == keyCode);
	},

	isKeyInRange: function(keyCode, start, end) {
		var instance = this;

		var result = false;

		if (start && end) {
			var startKey = instance[start] || instance[start.toUpperCase()];
			var endKey = instance[end] || instance[end.toUpperCase()];

			result = startKey && endKey &&
					(keyCode >= startKey && keyCode <= endKey);
		}

		return result;
	},

	isKeyInSet: function(keyCode, name) {
		var instance = this;

		var args = AArray(arguments, 1, true);

		return instance._isKeyInSet(keyCode, args);
	},

	isNavKey: function(keyCode) {
		var instance = this;

		return instance.isKeyInRange(keyCode, PAGE_UP, DOWN) || instance.isKeyInSet(keyCode, ENTER, TAB, ESC);
	},

	isSpecialKey: function(keyCode, eventType) {
		var instance = this;

		var isCtrlPress = (eventType == 'keypress' && instance.ctrlKey);

		return isCtrlPress ||
			instance.isNavKey(keyCode) ||
			instance.isKeyInRange(keyCode, SHIFT, CAPS_LOCK) ||
			instance.isKeyInSet(keyCode, BACKSPACE, PRINT_SCREEN, INSERT, WIN_IME);
	},

	_isKeyInSet: function(keyCode, arr) {
		var instance = this;

		var i = arr.length;

		var result = false;

		var keyName;
		var key;

		while (i--) {
			keyName = arr[i];
			key = keyName && (instance[keyName] || instance[String(keyName).toUpperCase()]);

			if (keyCode == key) {
				result = true;

				break;
			}
		}

		return result;
	}
};

A.mix(
	DOMEventFacadeProto,
	{
		hasModifier: function() {
			var instance = this;

			return KeyMap.hasModifier(instance);
		},

		isKey: function(name) {
			var instance = this;

			return KeyMap.isKey(instance.keyCode, name);
		},

		isKeyInRange: function(start, end) {
			var instance = this;

			return KeyMap.isKeyInRange(instance.keyCode, start, end);
		},

		isKeyInSet: function() {
			var instance = this;

			var args = AArray(arguments, 0, true);

			return KeyMap._isKeyInSet(instance.keyCode, args);
		},

		isNavKey: function() {
			var instance = this;

			return KeyMap.isNavKey(instance.keyCode);
		},

		isSpecialKey: function() {
			var instance = this;

			return KeyMap.isSpecialKey(instance.keyCode, instance.type);
		}
	}
);

A.Event.KeyMap = KeyMap;

// Simple version of http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
A.Event.supportsDOMEvent = function(domNode, eventName) {
	eventName = 'on' + eventName;

	if (!(eventName in domNode)) {
		if (!domNode.setAttribute) {
			domNode = document.createElement('div');
		}

		if (domNode.setAttribute) {
			domNode.setAttribute(eventName, '');
			return (typeof domNode[eventName] === 'function');
		}
	}

	domNode = null;

	return true;
};

}, '@VERSION@' ,{requires:['event']});
