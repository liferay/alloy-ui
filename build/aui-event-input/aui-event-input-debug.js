YUI.add('aui-event-input', function (A, NAME) {

/**
 * An object that encapsulates text changed events for textareas and input
 * element of type text and password. This event only occurs when the element
 * is focused.
 *
 * @module aui-event
 * @submodule aui-event-input
 */

var DOM_EVENTS = A.Node.DOM_EVENTS;

// Input event feature check should be done on textareas. WebKit before
// version 531 (3.0.182.2) did not support input events for textareas.
// See http://dev.chromium.org/developers/webkit-version-table
if (A.Features.test('event', 'input')) {
    // http://yuilibrary.com/projects/yui3/ticket/2533063
    DOM_EVENTS.input = 1;
    return;
}

DOM_EVENTS.cut = 1;
DOM_EVENTS.dragend = 1;
DOM_EVENTS.paste = 1;

var KeyMap = A.Event.KeyMap,

    _HANDLER_DATA_KEY = '~~aui|input|event~~',
    _INPUT_EVENT_TYPE = ['keydown', 'paste', 'drop', 'cut'],
    _SKIP_FOCUS_CHECK_MAP = {
        cut: 1,
        drop: 1,
        paste: 1
    };

/**
 * Defines a new `input` event in the DOM event system.
 *
 * @event input
 */
A.Event.define('input', {

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

        subscription._handler = node.on(
            _INPUT_EVENT_TYPE, A.bind(instance._dispatchEvent, instance, subscription, notifier));
    },

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

        subscription._handles = [];
        subscription._handler = node.delegate('focus', function(event) {
            var element = event.target,
                handler = element.getData(_HANDLER_DATA_KEY);

            if (!handler) {
                handler = element.on(
                    _INPUT_EVENT_TYPE,
                    A.bind(instance._dispatchEvent, instance, subscription, notifier));

                subscription._handles.push(handler);
                element.setData(_HANDLER_DATA_KEY, handler);
            }
        }, filter);
    },

    /**
     * Implementation logic for cleaning up a detached subscription.
     *
     * @method detach
     * @param node
     * @param subscription
     * @param notifier
     */
    detach: function(node, subscription) {
        subscription._handler.detach();
    },

    /**
     * Implementation logic for cleaning up a detached delegate subscription.
     *
     * @method detachDelegate
     * @param node
     * @param subscription
     * @param notifier
     */
    detachDelegate: function(node, subscription) {
        A.Array.each(subscription._handles, function(handle) {
            var element = A.one(handle.evt.el);
            if (element) {
                element.setData(_HANDLER_DATA_KEY, null);
            }
            handle.detach();
        });
        subscription._handler.detach();
    },

    /**
     * Dispatches an `input` event.
     *
     * @method _dispatchEvent
     * @param subscription
     * @param notifier
     * @param event
     * @protected
     */
    _dispatchEvent: function(subscription, notifier, event) {
        var instance = this,
            input,
            valueBeforeKey;

        input = event.target;

        // Since cut, drop and paste events fires before the element is focused,
        // skip focus checking.
        if (_SKIP_FOCUS_CHECK_MAP[event.type] ||
            (input.get('ownerDocument').get('activeElement') === input)) {

            if (KeyMap.isModifyingKey(event.keyCode)) {
                if (subscription._timer) {
                    subscription._timer.cancel();
                    subscription._timer = null;
                }

                valueBeforeKey = KeyMap.isKey(event.keyCode, 'WIN_IME') ? null : input.get('value');

                subscription._timer = A.soon(
                    A.bind('_fireEvent', instance, subscription, notifier, event, valueBeforeKey)
                );
            }
        }
    },

    /**
     * Fires an event.
     *
     * @method _fireEvent
     * @param subscription
     * @param notifier
     * @param event
     * @param valueBeforeKey
     * @protected
     */
    _fireEvent: function(subscription, notifier, event, valueBeforeKey) {
        var input = event.target;

        subscription._timer = null;

        if (input.get('value') !== valueBeforeKey) {
            notifier.fire(event);
        }
    }
});


}, '3.0.1', {"requires": ["aui-event-base", "event-delegate", "event-synthetic", "timers"]});
