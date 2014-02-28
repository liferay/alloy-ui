/**
 * Provides a class extension which can be used to animate widget visibility
 * changes.
 *
 * @module aui-widget-transition
 */

var Lang = A.Lang;

/**
 * Widget extension, which can be used to add toggle visibility support to the
 * base Widget class, through the [Base.build](Base.html#method_build)
 * method.
 *
 * @class A.WidgetTransition
 * @constructor
 */

function WidgetTransition() {
    var instance = this;

    // Store reference for the host class _uiSetVisible during class creation.
    instance._uiSetVisibleHost = instance._uiSetVisible;
}

/**
 * Static property used to define the default attribute configuration.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
WidgetTransition.ATTRS = {
    /**
     * Determine if the transitions will animate or not.
     *
     * @attribute animated
     * @default false
     * @type Boolean
     * @writeOnce
     */
    animated: {
        validator: Lang.isBoolean,
        value: false
    },

    /**
     * Determine the duration of the transition.
     *
     * @attribute duration
     * @default 0.15
     * @type Number
     */
    duration: {
        validator: Lang.isNumber,
        value: 0.15
    },

    /**
     * Determine the opacity.
     *
     * @attribute opacity
     * @default 1
     * @type Number
     */
    opacity: {
        validator: Lang.isNumber,
        value: 1
    },

    /**
     * Determine the duration (in milliseconds) for the widget to stick
     * visibility after the trigger element. By default the stick duration is
     * not specified.
     *
     * @attribute stickDuration
     * @type Number
     */
    stickDuration: {
        validator: Lang.isNumber,
        value: 0
    }
};

WidgetTransition.prototype = {

    /**
     * Stores the `Y.later` context object.
     *
     * @property _hideTimer
     * @type Object
     * @protected
     */
    _hideTimer: null,

    /**
     * Destructor lifecycle implementation for the `A.WidgetTransition` class.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        var instance = this;

        instance._clearHideTimer();
    },

    /**
     * Construction logic executed during `A.WidgetTransition` instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        A.on(instance._onUiSetVisibleWidgetTranstion, instance, '_uiSetVisible');
    },

    /**
     * Helper method called to clear the close timer.
     *
     * @method _clearHideTimer
     * @protected
     */
    _clearHideTimer: function() {
        var instance = this;

        if (instance._hideTimer) {
            instance._hideTimer.cancel();
            instance._hideTimer = null;
        }
    },

    /**
     * Maybe hides if `stickDuration` do not prevent.
     *
     * @method _maybeHide
     * @protected
     */
    _maybeHide: function() {
        var instance = this,
            stickDuration = instance.get('stickDuration');

        instance._hideTimer = A.later(stickDuration, instance, instance._transition);
    },

    /**
     * Maybe shows if `stickDuration` do not prevent.
     *
     * @method _maybeShow
     * @protected
     */
    _maybeShow: function() {
        var instance = this;
        instance._transition(true);
    },

    /**
     * Fire after `boundingBox` style changes.
     *
     * @method _afterUiSetVisible
     * @param val
     * @protected
     */
    _onUiSetVisibleWidgetTranstion: function(val) {
        var instance = this;

        if (instance.get('animated')) {
            if (val) {
                instance._maybeShow();
            }
            else {
                instance._maybeHide();
            }
            return new A.Do.Prevent();
        }

    },

    /**
     * Shows or hides depending on the passed parameter, when no parameter is
     * specified the default behavior is to hide the element.
     *
     * @method _transition
     * @param {Boolean} visible When `true`, fade in the element, otherwise
     *     fades out.
     * @protected
     */
    _transition: function(visible) {
        var instance = this,
            boundingBox = instance.get('boundingBox');

        instance._clearHideTimer();

        if (visible) {
            // when transitioning to visible invoke the host _uiSetVisible implementation...
            instance._uiSetVisibleHost(true);
            // then make sure the opacity transition goes from 0 to 1.
            boundingBox.setStyle('opacity', 0);
        }

        boundingBox.transition({
                duration: instance.get('duration'),
                opacity: visible ? instance.get('opacity') : 0
            },
            function() {
                boundingBox.toggleClass('in', visible);

                instance._uiSetVisibleHost(visible);
            }
        );
    }
};

A.WidgetTransition = WidgetTransition;
