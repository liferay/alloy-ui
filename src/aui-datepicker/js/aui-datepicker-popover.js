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
 * A base class for DatePickerPopover.
 *
 * @class A.DatePickerPopover
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */

function DatePickerPopover() {}

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property DatePickerPopover.ATTRS
 * @type Object
 * @static
 */
DatePickerPopover.ATTRS = {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute autoHide
     * @default true
     * @type Boolean
     */
    autoHide: {
        validator: Lang.isBoolean,
        value: true
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute popoverCssClass
     * @default A.getClassName('datepicker-popover')
     * @type String
     */
    popoverCssClass: {
        validator: Lang.isString,
        value: A.getClassName('datepicker-popover')
    }
};

A.mix(DatePickerPopover.prototype, {
    popover: null,

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getPopover
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method hide
     */
    hide: function() {
        var instance = this;

        instance.getPopover().hide();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method show
     */
    show: function() {
        var instance = this;

        instance.getPopover().show();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _isActiveInputFocused
     * @protected
     */
    _isActiveInputFocused: function() {
        var instance = this,
            activeInput = instance.get(ACTIVE_INPUT);

        return (activeInput === _DOCUMENT.get(ACTIVE_ELEMENT));
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onPopoverClickOutside
     * @param event
     * @protected
     */
    _onPopoverClickOutside: function(event) {
        var instance = this,
            target = event.target,
            activeInput = instance.get(ACTIVE_INPUT);

        if (activeInput && (!instance._isActiveInputFocused() && !activeInput.contains(target))) {

            instance.hide();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
