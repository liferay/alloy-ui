var AObject = A.Object,

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

		_attachEvent: function(node, subscription, notifier, delegateNode) {
			var instance = this;

			var type = instance._getEventName(node);

			var handles = instance._prepareHandels(subscription, node);

			if (!AObject.owns(handles, type)) {
				handles[type] = A.Event._attach(
					[
						type,
						function(event) {
							if (delegateNode) {
								event.currentTarget = delegateNode;
							}

							notifier.fire(event);
						},
						node,
						notifier
					]
				);
			}
		},

		_attachEvents: function(node, subscription, notifier, filter) {
			var instance = this;

			var handles = instance._prepareHandels(subscription, node);

			handles[EVENT_BEFOREACTIVATE] = node.delegate(
				EVENT_BEFOREACTIVATE,
				function(event) {
					var activeElement = event.target;

					instance._attachEvent(activeElement, subscription, notifier, node);
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

		_prepareHandels: function(subscription, node) {
			if (!AObject.owns(subscription, '_handles')) {
				subscription._handles = {};
			}

			var handles =  subscription._handles;

			if (!AObject.owns(handles, node)) {
				handles[node] = {};
			}

			return handles[node];
		}
	},
	true
);