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

function DatePickerPopover() {}

DatePickerPopover.ATTRS = {
    autoHide: {
        validator: Lang.isBoolean,
        value: true
    },

    popover: {
        setter: '_setPopover',
        value: {},
        writeOnce: true
    },

    popoverCssClass: {
        validator: Lang.isString,
        value: A.getClassName('datepicker-popover')
    }
};

A.mix(DatePickerPopover.prototype, {
    popover: null,

    alignTo: function(node) {
        var instance = this,
            popover = instance.getPopover();

        popover.set('align.node', node);
    },

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

    hide: function() {
        var instance = this;

        instance.getPopover().hide();
    },

    show: function() {
        var instance = this;

        instance.getPopover().show();
    },

    _isActiveInputFocused: function() {
        var instance = this,
            activeInput = instance.get(ACTIVE_INPUT);

        return (activeInput === _DOCUMENT.get(ACTIVE_ELEMENT));
    },

    _onPopoverClickOutside: function(event) {
        var instance = this,
            target = event.target,
            activeInput = instance.get(ACTIVE_INPUT);

        if (!instance._isActiveInputFocused() &&
            !activeInput.contains(target)) {

            instance.hide();
        }
    },

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