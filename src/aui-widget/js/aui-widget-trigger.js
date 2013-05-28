var Lang = A.Lang,

    TRIGGER_CHANGE = 'triggerChange',
    TRIGGER = 'trigger',
    BIND_DOM_EVENTS = 'bindDOMEvents',
    TRIGGER = 'trigger',
    TRIGGER_CHANGE = 'triggerChange',
    TRIGGER_HIDE_EVENT = 'triggerHideEvent',
    TRIGGER_TOGGLE_EVENT = 'triggerToggleEvent',
    TRIGGER_SHOW_EVENT = 'triggerShowEvent';

/**
* Widget extension, which can be used to add trigger support to the
* base Widget class, through the <a href="Base.html#method_build">Base.build</a>
* method.
*
* @class A.WidgetTrigger
* @param {Object} The user configuration object
*/
function WidgetTrigger() {}

/**
 * Static property used to define the default attribute
 * configuration.
 *
 * @property WidgetTrigger.ATTRS
 * @type Object
 * @static
 */
WidgetTrigger.ATTRS = {
    /**
     * Determine if the Toggler should bind DOM events or not.
     *
     * @attribute bindDOMEvents
     * @default true
     * @type Boolean
     * @writeOnce
     */
    bindDOMEvents: {
        validator: Lang.isBoolean,
        value: true,
        writeOnce: true
    },

    /**
     * Trigger node to change widget visibility state.
     *
     * @attribute trigger
     */
    trigger: {
        setter: A.one
    },

    /**
     * DOM event to hide the tooltip.
     *
     * @attribute triggerHideEvent
     * @type String
     */
    triggerHideEvent: {
        value: null
    },

    /**
     * DOM event to show the tooltip.
     *
     * @attribute triggerShowEvent
     * @type String
     */
    triggerShowEvent: {
        value: null
    },

    /**
     * DOM event to toggle the tooltip.
     *
     * @attribute triggerToggleEvent
     * @type String
     */
    triggerToggleEvent: {
        value: null
    }
};

A.mix(WidgetTrigger.prototype, {
    _eventHandles: null,

    /**
     * Construction logic executed during WidgetTrigger
     * instantiation. Lifecycle.
     *
     * @method initializer
     */
    initializer: function() {
        var instance = this;

        A.after(instance._afterRenderUIWT, instance, 'renderUI');

        instance.after(TRIGGER_CHANGE, instance._afterTriggerChange);
    },

    /**
     * Destructor logic for tooltip.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        var instance = this;

        (new A.EventHandle(instance._eventHandles)).detach();
    },

    /**
     * Fire after <code>renderUI</code>.
     *
     * @method _afterRenderUIWT
     * @param event
     * @protected
     */
    _afterRenderUIWT: function() {
        var instance = this;

        instance._uiSetTrigger(instance.get(TRIGGER));
    },

    /**
     * Fire after <code>trigger</code> changes.
     *
     * @method _afterTriggerChange
     * @param event
     * @protected
     */
    _afterTriggerChange: function(event) {
        var instance = this;

        instance._uiSetTrigger(event.newVal);
    },

    /**
     * Set the <code>trigger</code> UI.
     *
     * @method _uiSetTrigger
     * @param val
     * @protected
     */
    _uiSetTrigger: function(val) {
        var instance = this,
            eventHandles,
            triggerHideEvent,
            triggerShowEvent,
            triggerToggleEvent;

        (new A.EventHandle(instance._eventHandles)).detach();

        if (val && instance.get(BIND_DOM_EVENTS)) {
            eventHandles = instance._eventHandles = [];

            triggerHideEvent = instance.get(TRIGGER_HIDE_EVENT);
            triggerShowEvent = instance.get(TRIGGER_SHOW_EVENT);
            triggerToggleEvent = instance.get(TRIGGER_TOGGLE_EVENT);

            if (triggerHideEvent) {
                eventHandles.push(
                    val.on(instance.get(TRIGGER_HIDE_EVENT), instance.hide, instance));
            }

            if (triggerShowEvent) {
                eventHandles.push(
                    val.on(instance.get(TRIGGER_SHOW_EVENT), instance.show, instance));
            }

            if (triggerToggleEvent) {
                eventHandles.push(
                    val.on(instance.get(TRIGGER_TOGGLE_EVENT), instance.toggle, instance));
            }
        }
    }
});

A.WidgetTrigger = WidgetTrigger;