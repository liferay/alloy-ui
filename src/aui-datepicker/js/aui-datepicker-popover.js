/**
 * The DatePicker Component
 *
 * @module aui-datepicker
 * @submodule aui-datepicker-popover
 */

var Lang = A.Lang,

    _DOCUMENT = A.one(A.config.doc),

    ACTIVE_ELEMENT = 'activeElement',
    ACTIVE_INPUT = 'activeInput',
    BOTTOM = 'bottom',
    BOUNDING_BOX = 'boundingBox',
    CLICK = 'click',
    CLICKOUTSIDE = 'clickoutside',
    ESC = 'esc',
    KEY = 'key',
    POPOVER = 'popover',
    POPOVER_CSS_CLASS = 'popoverCssClass';

/**
 * A base class for `DatePickerPopover`.
 *
 * @class A.DatePickerPopover
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */

function DatePickerPopover() {}

/**
 * Static property used to define the default attribute configuration for the
 * `DatePickerPopover`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
DatePickerPopover.ATTRS = {

    /**
     * Sets the initial visibility.
     *
     * @attribute autoHide
     * @default true
     * @type {Boolean}
     */
    autoHide: {
        validator: Lang.isBoolean,
        value: true
    },

    /**
     * Stores the configuration of the `Popover` instance.
     *
     * @attribute popover
     * @default {}
     * @writeOnce
     */
    popover: {
        setter: '_setPopover',
        value: {},
        writeOnce: true
    },

    /**
     * Defines the CSS classname of the `Popover`.
     *
     * @attribute popoverCssClass
     * @default A.getClassName('datepicker-popover')
     * @type {String}
     */
    popoverCssClass: {
        validator: Lang.isString,
        value: A.getClassName('datepicker-popover')
    }
};

A.mix(DatePickerPopover.prototype, {
    popover: null,

    /**
     * Sets the `Popover` alignment.
     *
     * @method alignTo
     * @param node
     */
    alignTo: function(node) {
        var instance = this,
            popover = instance.getPopover();

        popover.set('align.node', node);
    },

    /**
     * Returns an existent `Popover` instance or creates a new one if it
     * doesn't exists.
     *
     * @method getPopover
     * @return {Popover}
     */
    getPopover: function() {
        var instance = this,
            popover = instance.popover;

        if (!popover) {
            popover = new A.Popover(instance.get(POPOVER));
            popover.get(BOUNDING_BOX).on(
                CLICKOUTSIDE, instance._onPopoverClickOutside, instance);

            instance.popover = popover;
        }

        return popover;
    },

    /**
     * Hides the `Popover`.
     *
     * @method hide
     */
    hide: function() {
        var instance = this;

        instance.getPopover().hide();
    },

    /**
     * Shows the `Popover`.
     *
     * @method show
     */
    show: function() {
        var instance = this;

        instance.getPopover().show();
    },

    /**
     * Checks if the active input is focused.
     *
     * @method _isActiveInputFocused
     * @protected
     * @return {Boolean}
     */
    _isActiveInputFocused: function() {
        var instance = this,
            activeInput = instance.get(ACTIVE_INPUT);

        return (activeInput === _DOCUMENT.get(ACTIVE_ELEMENT));
    },

    /**
     * Fires when there's a click outside of the `Popover`.
     *
     * @method _onPopoverClickOutside
     * @param event
     * @protected
     */
    _onPopoverClickOutside: function(event) {
        var instance = this,
            target = event.target,
            activeInput = instance.get(ACTIVE_INPUT);

        if (!instance._isActiveInputFocused() && !activeInput.contains(target)) {

            instance.hide();
        }
    },

    /**
     * Sets the `popover` value by merging its object with another properties.
     *
     * @method _setPopover
     * @param val
     * @protected
     */
    _setPopover: function(val) {
        var instance = this;

        return A.merge({
            bodyContent: '',
            cssClass: instance.get(POPOVER_CSS_CLASS),
            constrain: true,
            hideOn: [
                {
                    node: _DOCUMENT,
                    eventName: KEY,
                    keyCode: ESC
                }
            ],
            position: BOTTOM,
            render: true,
            triggerShowEvent: CLICK,
            triggerToggleEvent: null,
            visible: false
        }, val);
    }
}, true);

A.DatePickerPopover = DatePickerPopover;
