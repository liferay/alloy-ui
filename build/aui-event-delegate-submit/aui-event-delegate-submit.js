YUI.add('aui-event-delegate-submit', function (A, NAME) {

/**
 * The Event Delegate Submit.
 *
 * @module aui-event
 * @submodule aui-event-delegate-submit
 */

var AArray = A.Array,
    AObject = A.Object,
    Selector = A.Selector;

/**
 * Defines a new `submit` event in the DOM event system.
 *
 * @event submit
 */
A.Event.define(
    'submit', {
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

            var clickHandles = instance._prepareHandles(subscription, node);

            if (!AObject.owns(clickHandles, 'click')) {
                clickHandles.click = node.delegate(
                    'click',
                    function(event) {
                        var activeElement = event.target;

                        if (instance._getNodeName(activeElement, 'input') || instance._getNodeName(activeElement,
                            'button')) {
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

            instance._attachEvent(node, node, subscription, notifier);
        },

        /**
         * Adds an event subscription.
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

            if (!AObject.owns(handles, 'submit')) {
                handles.submit = A.Event._attach(['submit', fireFn, form, notifier, filter ? 'submit_delegate' :
                    'submit_on']);
            }
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
         * Gets a node name.
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
         * Checks if a node has parent.
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

var originalOn = A.CustomEvent.prototype._on;

function sortSubscribers(subscribers) {
    AArray.some(
        subscribers,
        function(item, index) {
            if (item.args && item.args[0] === 'submit_delegate') {
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
        function(subscriber) {
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
        result = orderedSubscribers;
    }

    return result;
}

function updateSubscribers(eventHandle, fn, context, args, when) {
    var instance = this;

    if (args && args[0] === 'submit_on') {
        if (when === 'after' && instance._afters.length) {
            sortSubscribers.call(instance, instance._afters);
        }
        else if (instance._subscribers.length) {
            sortSubscribers.call(instance, instance._subscribers);
        }
    }
}

function updateDeprecatedSubscribers(eventHandle, fn, context, args, when) {
    var instance = this;

    if (args && args[0] === 'submit_on') {
        if (when === 'after' && !AObject.isEmpty(instance.afters)) {
            instance.afters = sortDeprecatedSubscribers.call(instance, eventHandle, instance.afters);
        }
        else if (!AObject.isEmpty(instance.subscribers)) {
            instance.subscribers = sortDeprecatedSubscribers.call(instance, instance.subscribers);
        }
    }
}

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


}, '3.0.1', {"requires": ["aui-event-base", "event-delegate", "event-synthetic"]});
