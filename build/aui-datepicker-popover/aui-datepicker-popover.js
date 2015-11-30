YUI.add('aui-datepicker-popover', function (A, NAME) {

/**
 * The DatePicker Component
 *
 * @module aui-datepicker
 * @submodule aui-datepicker-popover
 */

var Lang = A.Lang,

    _DOCUMENT = A.one(A.config.doc);

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
            popover = new A.Popover(instance.get('popover'));
            popover.get('boundingBox').on(
                'clickoutside', instance._onPopoverClickOutside, instance);

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
            activeInput = instance.get('activeInput');

        return (activeInput === _DOCUMENT.get('activeElement'));
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
            activeInput = instance.get('activeInput');

        if (activeInput && (!instance._isActiveInputFocused() && !activeInput.contains(target))) {

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
            cssClass: instance.get('popoverCssClass'),
            constrain: true,
            hideOn: [
                {
                    node: _DOCUMENT,
                    eventName: 'key',
                    keyCode: 'esc'
                }
            ],
            position: 'bottom',
            render: true,
            triggerShowEvent: 'click',
            triggerToggleEvent: null,
            visible: false
        }, val);
    }
}, true);

A.DatePickerPopover = DatePickerPopover;


}, '3.0.1', {"requires": ["aui-classnamemanager", "aui-popover"]});
