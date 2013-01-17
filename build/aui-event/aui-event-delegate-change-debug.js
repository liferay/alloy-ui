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
