/**
 * The Event Delegate Submit.
 *
 * @module aui-event
 * @submodule aui-event-delegate-submit
 */

var AArray = A.Array,
	AObject = A.Object,
	Node = A.Node,
	Selector = A.Selector,

	EVENT_CLICK = 'click',
	EVENT_SUBMIT = 'submit',

	AFTER = 'after',
	SUBMIT_DELEGATE = 'submit_delegate',
	SUBMIT_ON = 'submit_on';

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @event submit
 */
A.Event.define(
	EVENT_SUBMIT,
	{
		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method delegate
		 * @param node
		 * @param subscription
		 * @param notifier
		 * @param filter
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method detach
		 * @param node
		 * @param subscription
		 * @param notifier
		 */
		detach: function (node, subscription, notifier) {
			var instance = this;

			instance._detachEvents(node, subscription, notifier);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method detachDelegate
		 * @param node
		 * @param subscription
		 * @param notifier
		 */
		detachDelegate: function (node, subscription, notifier) {
			var instance = this;

			instance._detachEvents(node, subscription, notifier);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method on
		 * @param node
		 * @param subscription
		 * @param notifier
		 */
		on: function (node, subscription, notifier) {
			var instance = this;

			instance._attachEvent(node, node, subscription, notifier);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _attachEvent
		 * @param form
		 * @param node
		 * @param subscription
		 * @param notifier
		 * @param filter
		 * @protected
		 */
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
				handles[EVENT_SUBMIT] = A.Event._attach([EVENT_SUBMIT, fireFn, form, notifier, filter ? SUBMIT_DELEGATE : SUBMIT_ON]);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _detachEvents
		 * @param node
		 * @param subscription
		 * @param notifier
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _getNodeName
		 * @param elem
		 * @param name
		 * @protected
		 */
		_getNodeName: function(elem, name) {
			var nodeName = elem.get('nodeName');

			return nodeName && nodeName.toLowerCase() === name.toLowerCase();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _hasParent
		 * @param node
		 * @param testParentNode
		 * @protected
		 */
		_hasParent: function(node, testParentNode) {
			return node.ancestor(
				function(testNode) {
					return testNode === testParentNode;
				},
				false
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _prepareHandles
		 * @param subscription
		 * @param node
		 * @protected
		 */
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

	if (instance._kds) {
		updateDeprecatedSubscribers.call(instance, eventHandle, fn, context, args, when);
	}
	else {
		updateSubscribers.call(instance, eventHandle, fn, context, args, when);
	}

	return eventHandle;
};

function sortSubscribers(subscribers) {
	var instance = this;

	var item = AArray.some(
		subscribers,
		function(item, index) {
			if (item.args && item.args[0] === SUBMIT_DELEGATE) {
				var lastSubscriber = subscribers.splice(subscribers.length - 1, 1)[0];

				subscribers.splice(index, 0, lastSubscriber);

				return true;
			}
		}
	);
}

function sortDeprecatedSubscribers(eventHandle, subscribers) {
	var result = subscribers;

	var orderedSubscribers = {};

	var lastSubscriber = subscribers[eventHandle.sub.id];

	var replace = false;

	AObject.each(
		subscribers,
		function(subscriber, index) {
			if (!replace && subscriber.args && subscriber.args[0] === SUBMIT_DELEGATE) {
				orderedSubscribers[lastSubscriber.id] = lastSubscriber;

				replace = true;
			}

			if (subscriber !== lastSubscriber) {
				orderedSubscribers[subscriber.id] = subscriber;
			}
		}
	);

	if (replace) {
		result = orderedSubscribers;
	}

	return result;
}

function updateSubscribers(eventHandle, fn, context, args, when) {
	var instance = this;

	if (args && args[0] === SUBMIT_ON) {
		if (when === AFTER && instance._afters.length) {
			sortSubscribers.call(instance, instance._afters);
		}
		else if (instance._subscribers.length) {
			sortSubscribers.call(instance, instance._subscribers);
		}
	}
}

function updateDeprecatedSubscribers(eventHandle, fn, context, args, when) {
	var instance = this;

	if (args && args[0] === SUBMIT_ON) {
		if (when === AFTER && !AObject.isEmpty(instance.afters)) {
			instance.afters = sortDeprecatedSubscribers.call(instance, eventHandle, instance.afters);
		}
		else if (!AObject.isEmpty(instance.subscribers)) {
			instance.subscribers = sortDeprecatedSubscribers.call(instance, instance.subscribers);
		}
	}
}