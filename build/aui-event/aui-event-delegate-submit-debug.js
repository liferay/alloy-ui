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
