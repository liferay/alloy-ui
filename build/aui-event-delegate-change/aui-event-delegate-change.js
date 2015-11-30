YUI.add('aui-event-delegate-change', function (A, NAME) {

/**
 * The Event Delegate Change.
 *
 * @module aui-event
 * @submodule aui-event-delegate-change
 */

var AObject = A.Object,
    Selector = A.Selector;

/**
 * Defines a new `change` event in the DOM event system.
 *
 * @event change
 */
A.Event.define(
    'change', {
        /**
         * Implementation logic for subscription via `node.delegate`.
         *
         * @method delegate
         * @param node
         * @param subscription
         * @param notifier
         * @param filter
         */
        delegate: function(node, subscription, notifier, filter) {
            var instance = this;

            instance._attachEvents(node, subscription, notifier, filter);
        },

        /**
         * Implementation logic for cleaning up a detached subscription.
         *
         * @method detach
         * @param node
         * @param subscription
         * @param notifier
         */
        detach: function(node, subscription, notifier) {
            var instance = this;

            instance._detachEvents(node, subscription, notifier);
        },

        /**
         * Implementation logic for cleaning up a detached delegate
         * subscription.
         *
         * @method detachDelegate
         * @param node
         * @param subscription
         * @param notifier
         */
        detachDelegate: function(node, subscription, notifier) {
            var instance = this;

            instance._detachEvents(node, subscription, notifier);
        },

        /**
         * Implementation logic for event subscription.
         *
         * @method on
         * @param node
         * @param subscription
         * @param notifier
         */
        on: function(node, subscription, notifier) {
            var instance = this;

            instance._attachEvent(node, subscription, notifier);
        },

        /**
         * Adds an event subscription.
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
                        while (result !== false && !tmpEvent.stopped && tmpEl && tmpEl !== delegateEl);

                        return ((result !== false) && (tmpEvent.stopped !== 2));
                    };
                }

                handles[type] = A.Event._attach([type, fireFn, node, notifier]);
            }
        },

        /**
         * Adds an event subscription.
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

            handles.beforeactivate = node.delegate(
                'beforeactivate',
                function(event) {
                    var activeElement = event.target;

                    instance._attachEvent(activeElement, subscription, notifier, node, filter);
                },
                filter
            );
        },

        /**
         * Deletes a group of event subscriptions.
         *
         * @method _detachEvents
         * @param node
         * @param subscription
         * @param notifier
         * @protected
         */
        _detachEvents: function(node, subscription) {
            A.each(
                subscription._handles,
                function(events) {
                    A.each(
                        events,
                        function(handle) {
                            handle.detach();
                        }
                    );
                }
            );

            delete subscription._handles;
        },

        /**
         * Gets an event name.
         *
         * @method _getEventName
         * @protected
         */
        _getEventName: A.cached(
            function(activeElement) {
                var eventName = 'change';

                var tagName = activeElement.attr('tagName').toLowerCase();

                var type = activeElement.attr('type').toLowerCase();

                if (tagName === 'input' && (type === 'checkbox' || type === 'radio')) {
                    eventName = 'click';
                }

                return eventName;
            }
        ),

        /**
         * Prepares event handles.
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


}, '3.0.1', {"requires": ["aui-event-base", "event-delegate", "event-synthetic"]});
