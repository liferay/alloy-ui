/**
 * The Event Delegate Change.
 *
 * @module aui-event
 * @submodule aui-event-delegate-change
 */

var AObject = A.Object,
	Node = A.Node,
	Selector = A.Selector,

	EVENT_BEFOREACTIVATE = 'beforeactivate',
	EVENT_CHANGE = 'change';

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @event change
 */
A.Event.define(
	EVENT_CHANGE,
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

			instance._attachEvents(node, subscription, notifier, filter);
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

			instance._attachEvent(node, subscription, notifier);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _attachEvent
		 * @param node
		 * @param subscription
		 * @param notifier
		 * @param delegateNode
		 * @param filter
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _attachEvents
		 * @param node
		 * @param subscription
		 * @param notifier
		 * @param filter
		 * @protected
		 */
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
		 * @method _getEventName
		 * @protected
		 */
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