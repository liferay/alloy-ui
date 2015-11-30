YUI.add('aui-widget-trigger', function (A, NAME) {

var Lang = A.Lang;

/**
 * Widget extension, which can be used to add trigger support to the
 * base Widget class, through the [Base.build](Base.html#method_build) method.
 *
 * @class A.WidgetTrigger
 * @param {Object} The user configuration object
 */

function WidgetTrigger() {}

/**
 * Static property used to define the default attribute
 * configuration.
 *
 * @property ATTRS
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

    triggerShowFn: {
        validator: Lang.isString,
        value: 'show'
    },

    triggerHideFn: {
        validator: Lang.isString,
        value: 'hide'
    },

    triggerToggleFn: {
        validator: Lang.isString,
        value: 'toggle'
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
    _triggerEventHandles: null,

    /**
     * Construction logic executed during WidgetTrigger
     * instantiation. Lifecycle.
     *
     * @method initializer
     */
    initializer: function() {
        var instance = this;

        A.after(instance._afterRenderUIWT, instance, 'renderUI');

        instance.after('triggerChange', instance._afterTriggerChange);
    },

    /**
     * Destructor lifecycle implementation for the `WidgetTrigger` class.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        var instance = this;

        (new A.EventHandle(instance._triggerEventHandles)).detach();
    },

    /**
     * Fire after `renderUI`.
     *
     * @method _afterRenderUIWT
     * @param event
     * @protected
     */
    _afterRenderUIWT: function() {
        var instance = this;

        instance._uiSetTrigger(instance.get('trigger'));
    },

    /**
     * Fire after `trigger` changes.
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
     * Set the `trigger` UI.
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
            triggerToggleEvent,
            triggerHideFn,
            triggerShowFn,
            triggerToggleFn;

        (new A.EventHandle(instance._triggerEventHandles)).detach();

        if (val && instance.get('bindDOMEvents')) {
            eventHandles = instance._triggerEventHandles = [];

            triggerHideEvent = instance.get('triggerHideEvent');
            triggerShowEvent = instance.get('triggerShowEvent');
            triggerToggleEvent = instance.get('triggerToggleEvent');
            triggerHideFn = instance.get('triggerHideFn');
            triggerShowFn = instance.get('triggerShowFn');
            triggerToggleFn = instance.get('triggerToggleFn');

            if (triggerHideEvent) {
                eventHandles.push(
                    val.on(instance.get('triggerHideEvent'), A.bind(instance[triggerHideFn], instance)));
            }

            if (triggerShowEvent) {
                eventHandles.push(
                    val.on(instance.get('triggerShowEvent'), A.bind(instance[triggerShowFn], instance)));
            }

            if (triggerToggleEvent) {
                eventHandles.push(
                    val.on(instance.get('triggerToggleEvent'), A.bind(instance[triggerToggleFn], instance)));
            }
        }
    }
});

A.WidgetTrigger = WidgetTrigger;


}, '3.0.1', {"requires": ["node"]});
