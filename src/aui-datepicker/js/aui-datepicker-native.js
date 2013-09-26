/**
 * The DatePicker Component
 *
 * @module aui-datepicker
 * @submodule aui-datepicker-native
 */

var Lang = A.Lang,

    _DASH = '-',

    ACTIVE_INPUT = 'activeInput',
    CHANGE = 'change',
    CONTAINER = 'container',
    DATE = 'date',
    NATIVE_MASK = 'nativeMask',
    NATIVE_TYPE = 'nativeType',
    SELECTION_CHANGE = 'selectionChange',
    SELECTOR = 'selector',
    TOUCHSTART = 'touchstart',
    TIME = 'time',
    TYPE = 'type';

/**
 * A base class for DatePickerNativeBase.
 *
 * @class A.DatePickerNativeBase
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */

function DatePickerNativeBase() {}

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property DatePickerNativeBase.ATTRS
 * @type Object
 * @static
 */
DatePickerNativeBase.ATTRS = {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute nativeMask
     * @default '%Y-%m-%d'
     * @type String
     */
    nativeMask: {
        validator: Lang.isString,
        value: '%Y-%m-%d'
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute nativeType
     * @default 'date'
     * @type String
     */
    nativeType: {
        validator: Lang.isString,
        value: 'date'
    }
};

DatePickerNativeBase.prototype = {

    /**
     * Construction logic executed during DatePickerNativeBase instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.bindNativeUI();
    },

    /**
     * Bind the events on the DatePickerNativeBase UI. Lifecycle.
     *
     * @method bindNativeUI
     */
    bindNativeUI: function() {
        var instance = this,
            container = instance.get(CONTAINER),
            selector = instance.get(SELECTOR);

        instance._eventHandles.push(
            container.delegate(
                TOUCHSTART,
                A.bind('_onceUserInteraction', instance), selector),

            container.delegate(
                CHANGE,
                A.bind('_afterNativeSelectionChange', instance), selector)
        );
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method clearSelection
     */
    clearSelection: function() {
        var instance = this,
            activeInput = instance.get(ACTIVE_INPUT);

        activeInput.val('');
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method deselectDates
     */
    deselectDates: function() {
        var instance = this;

        instance.clearSelection();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method hide
     */
    hide: function() {
        var instance = this,
            activeInput = instance.get(ACTIVE_INPUT);

        activeInput.blur();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method show
     */
    show: function() {
        var instance = this,
            activeInput = instance.get(ACTIVE_INPUT);

        activeInput.focus();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method selectDates
     * @param dates
     */
    selectDates: function(dates) {
        var instance = this,
            activeInput = instance.get(ACTIVE_INPUT);

        if (Lang.isArray(dates)) {
            dates = dates[0];
        }

        if (Lang.isDate(dates)) {
            activeInput.val(instance._formatDate(dates));
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method useInputNode
     * @param node
     */
    useInputNode: function(node) {
        var instance = this,
            nativeType = instance.get(NATIVE_TYPE),
            type = node.attr(TYPE),
            parsed;

        instance.set(ACTIVE_INPUT, node);

        if (!instance._isTypeSupported(type)) {
            parsed = instance.getParsedDatesFromInputValue();
            if (parsed) {
                node.val(instance._formatDate(parsed[0]));
            }
        }

        if (node.getAttribute(TYPE) !== nativeType) {
            node.setAttribute(TYPE, nativeType);
        }

        instance._fireSelectionChange();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _addFourDigitsYearPadding
     * @param text
     * @protected
     */
    _addFourDigitsYearPadding: function(text) {
        return A.Lang.String.repeat('0', 4 - text.indexOf(_DASH)) + text;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterNativeSelectionChange
     * @param event
     * @protected
     */
    _afterNativeSelectionChange: function(event) {
        var instance = this,
            type = event.currentTarget.attr(TYPE);

        if (instance._isTypeSupported(type)) {
            instance._fireSelectionChange();
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _fireSelectionChange
     * @protected
     */
    _fireSelectionChange: function() {
        var instance = this,
            activeInput = instance.get(ACTIVE_INPUT),
            parsed = instance._parseDateFromString(activeInput.val());

        instance.fire(
            SELECTION_CHANGE, {
                newSelection: parsed ? [parsed] : []
            });
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _formatDate
     * @param date
     * @protected
     */
    _formatDate: function(date) {
        var instance = this,
            nativeMask = instance.get(NATIVE_MASK),
            nativeType = instance.get(NATIVE_TYPE),
            formatted = A.Date.format(date, {
                format: nativeMask
            });

        if (nativeType === DATE) {
            formatted = instance._addFourDigitsYearPadding(formatted);
        }

        return formatted;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _isTypeSupported
     * @param type
     * @protected
     */
    _isTypeSupported: function(type) {
        switch (type.toLowerCase()) {
            case DATE:
            case TIME:
                return true;
            default:
                return false;
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _parseDateFromString
     * @param text
     * @protected
     */
    _parseDateFromString: function(text) {
        var instance = this,
            nativeMask = instance.get(NATIVE_MASK);

        if (!text) {
            return false;
        }

        return A.Date.parse(nativeMask, text);
    }
};

A.DatePickerNativeBase = DatePickerNativeBase;

/**
 * A base class for DatePickerNative.
 *
 * @class A.DatePickerNative
 * @extends A.Base
 * @uses A.DatePickerDelegate, A.DatePickerNativeBase
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.DatePickerNative = A.Base.create('datepicker-native', A.Base, [A.DatePickerDelegate, A.DatePickerNativeBase]);
