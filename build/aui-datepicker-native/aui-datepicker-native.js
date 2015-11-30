YUI.add('aui-datepicker-native', function (A, NAME) {

/**
 * The DatePicker Component
 *
 * @module aui-datepicker
 * @submodule aui-datepicker-native
 */

var Lang = A.Lang;

/**
 * A base class for `DatePickerNativeBase`.
 *
 * @class A.DatePickerNativeBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */

function DatePickerNativeBase() {}

/**
 * Static property used to define the default attribute configuration for the
 * `DatePickerNativeBase`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
DatePickerNativeBase.ATTRS = {

    /**
     * Defines the native date mask.
     *
     * @attribute nativeMask
     * @default '%Y-%m-%d'
     * @type {String}
     */
    nativeMask: {
        validator: Lang.isString,
        value: '%Y-%m-%d'
    },

    /**
     * Defines the type attribute in an HTML element.
     *
     * @attribute nativeType
     * @default 'date'
     * @type {String}
     */
    nativeType: {
        validator: Lang.isString,
        value: 'date'
    }
};

DatePickerNativeBase.prototype = {

    /**
     * Construction logic executed during `DatePickerNativeBase` instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.bindNativeUI();
    },

    /**
     * Bind the events on the `DatePickerNativeBase` UI. Lifecycle.
     *
     * @method bindNativeUI
     */
    bindNativeUI: function() {
        var instance = this,
            container = instance.get('container'),
            selector = instance.get('selector');

        instance._eventHandles.push(
            container.delegate(
                'touchstart',
                A.bind('_onceUserInteraction', instance), selector),

            container.delegate(
                'change',
                A.bind('_afterNativeSelectionChange', instance), selector)
        );
    },

    /**
     * Clears selected dates in the native calendar.
     *
     * @method clearSelection
     */
    clearSelection: function() {
        var instance = this,
            activeInput = instance.get('activeInput');

        activeInput.val('');
    },

    /**
     * Deselects dates in the native calendar.
     *
     * @method deselectDates
     */
    deselectDates: function() {
        var instance = this;

        instance.clearSelection();
    },

    /**
     * Blurs native calendar.
     *
     * @method hide
     */
    hide: function() {
        var instance = this,
            activeInput = instance.get('activeInput');

        activeInput.blur();
    },

    /**
     * Focus native calendar.
     *
     * @method show
     */
    show: function() {
        var instance = this,
            activeInput = instance.get('activeInput');

        activeInput.focus();
    },

    /**
     * Selects a date in the native calendar.
     *
     * @method selectDates
     * @param dates
     */
    selectDates: function(dates) {
        var instance = this,
            activeInput = instance.get('activeInput');

        if (Lang.isArray(dates)) {
            dates = dates[0];
        }

        if (Lang.isDate(dates)) {
            activeInput.val(instance._formatDate(dates));
        }
    },

    /**
     * Renders the widget in an `<input>` node.
     *
     * @method useInputNode
     * @param node
     */
    useInputNode: function(node) {
        var instance = this,
            nativeType = instance.get('nativeType'),
            type = node.attr('type'),
            parsed;

        instance.set('activeInput', node);

        if (!instance._isTypeSupported(type)) {
            parsed = instance.getParsedDatesFromInputValue();
            if (parsed) {
                node.val(instance._formatDate(parsed[0]));
            }
        }

        if (node.getAttribute('type') !== nativeType) {
            node.setAttribute('type', nativeType);
        }

        instance._fireSelectionChange();
    },

    /**
     * Adds four digits as a padding for the year value.
     *
     * @method _addFourDigitsYearPadding
     * @param text
     * @protected
     * @return {String} The result of the string manipulation.
     */
    _addFourDigitsYearPadding: function(text) {
        return A.Lang.String.repeat('0', 4 - text.indexOf('-')) + text;
    },

    /**
     * Fires after a selection change in the native calendar.
     *
     * @method _afterNativeSelectionChange
     * @param event
     * @protected
     */
    _afterNativeSelectionChange: function(event) {
        var instance = this,
            type = event.currentTarget.attr('type');

        if (instance._isTypeSupported(type)) {
            instance._fireSelectionChange();
        }
    },

    /**
     * Fires a selection change.
     *
     * @method _fireSelectionChange
     * @protected
     */
    _fireSelectionChange: function() {
        var instance = this,
            activeInput = instance.get('activeInput'),
            parsed = instance._parseDateFromString(activeInput.val());

        instance.fire(
            'selectionChange', {
                newSelection: parsed ? [parsed] : []
            });
    },

    /**
     * Formats native date.
     *
     * @method _formatDate
     * @param date
     * @protected
     * @return {Date}
     */
    _formatDate: function(date) {
        var instance = this,
            nativeMask = instance.get('nativeMask'),
            nativeType = instance.get('nativeType'),
            formatted = A.Date.format(date, {
                format: nativeMask
            });

        if (nativeType === 'date') {
            formatted = instance._addFourDigitsYearPadding(formatted);
        }

        return formatted;
    },

    /**
     * Checks if type attribute is supported.
     *
     * @method _isTypeSupported
     * @param type
     * @protected
     * @return {Boolean}
     */
    _isTypeSupported: function(type) {
        switch (type.toLowerCase()) {
            case 'date':
            case 'time':
                return true;
            default:
                return false;
        }
    },

    /**
     * Parses a date from a string.
     *
     * @method _parseDateFromString
     * @param text
     * @protected
     * @return {Date}
     */
    _parseDateFromString: function(text) {
        var instance = this,
            nativeMask = instance.get('nativeMask');

        if (!text) {
            return false;
        }

        return A.Date.parse(nativeMask, text);
    }
};

A.DatePickerNativeBase = DatePickerNativeBase;

/**
 * A base class for `DatePickerNative`.
 *
 * @class A.DatePickerNative
 * @extends Base
 * @uses A.DatePickerDelegate, A.DatePickerNativeBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.DatePickerNative = A.Base.create('datepicker-native', A.Base, [A.DatePickerDelegate, A.DatePickerNativeBase]);


}, '3.0.1', {"requires": ["base", "base-build", "aui-node-base", "aui-datepicker-delegate"]});
