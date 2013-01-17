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
AUI.add('aui-event-input', function(A) {
/**
 * An object that encapsulates text changed events for textareas and input
 * element of type text and password. This event only occurs when the element
 * is focused.
 *
 * @module aui-event
 * @submodule aui-event-input
 *
 * @class AUI~event~input
 */

var DOM_EVENTS = A.Node.DOM_EVENTS;

// Input event feature check should be done on textareas. WebKit before
// version 531 (3.0.182.2) did not support input events for textareas.
// See http://dev.chromium.org/developers/webkit-version-table
if (A.Event.supportsDOMEvent(document.createElement('textarea'), 'input')) {
	// http://yuilibrary.com/projects/yui3/ticket/2533063
	DOM_EVENTS.input = 1;
	return;
}

DOM_EVENTS.cut = 1;
DOM_EVENTS.dragend = 1;
DOM_EVENTS.paste = 1;

var ACTIVE_ELEMENT = 'activeElement',
	OWNER_DOCUMENT = 'ownerDocument',

	_HANDLER_DATA_KEY = '~~aui|input|event~~',
	_INPUT_EVENT_TYPE = ['keydown', 'paste', 'drop', 'cut'],
	_SKIP_FOCUS_CHECK_MAP = {
		cut: 1,
		drop: 1,
		paste: 1
	};

A.Event.define('input', {
	on: function (node, subscription, notifier) {
		var instance = this;

		subscription._handler = node.on(
			_INPUT_EVENT_TYPE, A.bind(instance._dispatchEvent, instance, notifier));
	},

	delegate: function (node, subscription, notifier, filter) {
		var instance = this;

		subscription._handles = [];
		subscription._handler = node.delegate('focus', function(event) {
			var element = event.target,
				handler = element.getData(_HANDLER_DATA_KEY);

			if (!handler) {
				handler = element.on(
					_INPUT_EVENT_TYPE,
					A.bind(instance._dispatchEvent, instance, notifier));

				subscription._handles.push(handler);
				element.setData(_HANDLER_DATA_KEY, handler);
			}
		}, filter);
	},

	detach: function (node, subscription, notifier) {
		subscription._handler.detach();
	},

	detachDelegate: function (node, subscription, notifier) {
		A.Array.each(subscription._handles, function(handle) {
			var element = A.one(handle.evt.el);
			if (element) {
				element.setData(_HANDLER_DATA_KEY, null);
			}
			handle.detach();
		});
		subscription._handler.detach();
	},

	_dispatchEvent: function(notifier, event) {
		var instance = this,
			input = event.target;

		if (// Since cut, drop and paste events fires before the element is focused, skip focus checking.
			_SKIP_FOCUS_CHECK_MAP[event.type] ||
			(input.get(OWNER_DOCUMENT).get(ACTIVE_ELEMENT) === input)) {

			notifier.fire(event);
		}
	}
});

}, '@VERSION@' ,{requires:['event-synthetic']});
AUI.add('aui-event-delegate-change', function(A) {
var AObject = A.Object,
	Node = A.Node,
	Selector = A.Selector,

	EVENT_BEFOREACTIVATE = 'beforeactivate',
	EVENT_CHANGE = 'change';

A.Event.define(
	EVENT_CHANGE,
	{
		delegate: function (node, subscription, notifier, filter) {
			var instance = this;

			instance._attachEvents(node, subscription, notifier, filter);
		},

		detach: function (node, subscription, notifier) {
			var instance = this;

			instance._detachEvents(node, subscription, notifier);
		},

		detachDelegate: function (node, subscription, notifier) {
			var instance = this;

			instance._detachEvents(node, subscription, notifier);
		},

		on: function (node, subscription, notifier) {
			var instance = this;

			instance._attachEvent(node, subscription, notifier);
		},

		_attachEvent: function(node, subscription, notifier, delegateNode, filter) {
			var instance = this;

			var type = instance._getEventName(node);

			var handles = instance._prepareHandles(subscription, node);

			if (!AObject.owns(handles, type)) {
				var fireFn = notifier.fire;

				if (delegateNode) {
					fireFn = function(event) {
						var delegateEl = delegateNode.getDOM();

						var result = true;

						var tmpEl = node.getDOM();

						var tmpEvent = A.clone(event);

						do {
							if (tmpEl && Selector.test(tmpEl, filter)) {
								tmpEvent.currentTarget = A.one(tmpEl);
								tmpEvent.container = delegateNode;

								result = notifier.fire(tmpEvent);
							}

							tmpEl = tmpEl.parentNode;
						}
						while(result !== false && !tmpEvent.stopped && tmpEl && tmpEl !== delegateEl);

						return ((result !== false) && (tmpEvent.stopped !== 2));
					};
				}

				handles[type] = A.Event._attach([type, fireFn, node, notifier]);
			}
		},

		_attachEvents: function(node, subscription, notifier, filter) {
			var instance = this;

			var handles = instance._prepareHandles(subscription, node);

			handles[EVENT_BEFOREACTIVATE] = node.delegate(
				EVENT_BEFOREACTIVATE,
				function(event) {
					var activeElement = event.target;

					instance._attachEvent(activeElement, subscription, notifier, node, filter);
				},
				filter
			);
		},

		_detachEvents: function(node, subscription, notifier) {
			A.each(
				subscription._handles,
				function(events, node, handles) {
					A.each(
						events,
						function(handle, event, events) {
							handle.detach();
						}
					);
				}
			);

			delete subscription._handles;
		},

		_getEventName: A.cached(
			function(activeElement) {
				var eventName = EVENT_CHANGE;

				var tagName = activeElement.attr('tagName').toLowerCase();

				var type = activeElement.attr('type').toLowerCase();

				if (tagName == 'input' && (type == 'checkbox' || type == 'radio')) {
					eventName = 'click';
				}

				return eventName;
			}
		),

		_prepareHandles: function(subscription, node) {
			if (!AObject.owns(subscription, '_handles')) {
				subscription._handles = {};
			}

			var handles = subscription._handles;

			if (!AObject.owns(handles, node)) {
				handles[node] = {};
			}

			return handles[node];
		}
	},
	true
);

}, '@VERSION@' ,{requires:['aui-node-base','aui-event-base','event-synthetic'], condition: {name: 'aui-event-delegate-change', trigger: 'event-base-ie', ua: 'ie'}});
AUI.add('aui-event-delegate-submit', function(A) {
var AObject = A.Object,
	Node = A.Node,
	Selector = A.Selector,

	EVENT_CLICK = 'click',
	EVENT_SUBMIT = 'submit';

A.Event.define(
	EVENT_SUBMIT,
	{
		delegate: function (node, subscription, notifier, filter) {
			var instance = this;

			var clickHandles = instance._prepareHandles(subscription, node);

			if (!AObject.owns(clickHandles, EVENT_CLICK)) {
				clickHandles[EVENT_CLICK] = node.delegate(
					EVENT_CLICK,
					function(event) {
						var activeElement = event.target;

						if (instance._getNodeName(activeElement, 'input') || instance._getNodeName(activeElement, 'button')) {
							var form = activeElement.get('form');

							if (form) {
								instance._attachEvent(form, node, subscription, notifier, filter);
							}
						}
					},
					filter
				);
			}
		},

		detach: function (node, subscription, notifier) {
			var instance = this;

			instance._detachEvents(node, subscription, notifier);
		},

		detachDelegate: function (node, subscription, notifier) {
			var instance = this;

			instance._detachEvents(node, subscription, notifier);
		},

		on: function (node, subscription, notifier) {
			var instance = this;

			instance._attachEvent(node, node, subscription, notifier);
		},

		_attachEvent: function(form, node, subscription, notifier, filter) {
			var instance = this;

			var fireFn = function(event) {
				var result = true;

				if (filter) {
					if (!event.stopped || !instance._hasParent(event._stoppedOnNode, node)) {
						var delegateEl = node.getDOM();

						var tmpEl = form.getDOM();

						do {
							if (tmpEl && Selector.test(tmpEl, filter)) {
								event.currentTarget = A.one(tmpEl);
								event.container = node;

								result = notifier.fire(event);

								if (event.stopped && !event._stoppedOnNode) {
									event._stoppedOnNode = node;
								}
							}

							tmpEl = tmpEl.parentNode;
						}
						while (result !== false && !event.stopped && tmpEl && tmpEl !== delegateEl);

						result = ((result !== false) && (event.stopped !== 2));
					}					
				}
				else {
					result = notifier.fire(event);

					if (event.stopped && !event._stoppedOnNode) {
						event._stoppedOnNode = node;
					}
				}

				return result;
			};

			var handles = instance._prepareHandles(subscription, form);

			if (!AObject.owns(handles, EVENT_SUBMIT)) {
				handles[EVENT_SUBMIT] = A.Event._attach([EVENT_SUBMIT, fireFn, form, notifier, filter ? 'submit_delegate' : 'submit_on']);
			}
		},

		_detachEvents: function(node, subscription, notifier) {
			A.each(
				subscription._handles,
				function(events, node, handles) {
					A.each(
						events,
						function(handle, event, events) {
							handle.detach();
						}
					);
				}
			);

			delete subscription._handles;
		},

		_getNodeName: function(elem, name) {
			var nodeName = elem.get('nodeName');

			return nodeName && nodeName.toLowerCase() === name.toLowerCase();
		},

		_hasParent: function(node, testParentNode) {
			return node.ancestor(
				function(testNode) {
					return testNode === testParentNode;
				},
				false
			);
		},

		_prepareHandles: function(subscription, node) {
			if (!AObject.owns(subscription, '_handles')) {
				subscription._handles = {};
			}

			var handles = subscription._handles;

			if (!AObject.owns(handles, node)) {
				handles[node] = {};
			}

			return handles[node];
		}
	},
	true
);

var originalOn = A.CustomEvent.prototype._on;

A.CustomEvent.prototype._on = function(fn, context, args, when) {
	var instance = this;

	var eventHandle = originalOn.apply(instance, arguments);

	if (args && args[0] === 'submit_on' && instance.subCount > 1) {
		var subscribers = instance.subscribers;

		var lastSubscriber = subscribers[eventHandle.sub.id];

		var orderedSubscribers = {};

		var replace = false;

		AObject.each(
			subscribers,
			function(subscriber, index) {
				if (!replace && subscriber.args && subscriber.args[0] === 'submit_delegate') {
					 orderedSubscribers[lastSubscriber.id] = lastSubscriber;

					replace = true;
				}

				if (subscriber !== lastSubscriber) {
					 orderedSubscribers[subscriber.id] = subscriber;
				}
			}
		);

		if (replace) {
			instance.subscribers =  orderedSubscribers;
		}
	}

	return eventHandle;
};

}, '@VERSION@' ,{requires:['aui-node-base','aui-event-base','event-synthetic'], condition: {name: 'aui-event-delegate-submit', trigger: 'event-base-ie', ua: 'ie'}});


AUI.add('aui-event', function(A){}, '@VERSION@' ,{skinnable:false, use:['aui-event-base','aui-event-input']});

