/**
 * The DatePicker Component
 *
 * @module aui-datepicker
 * @submodule aui-datepicker-delegate
 */

var Lang = A.Lang,
    isString = Lang.isString,

    _DOCUMENT = A.one(A.config.doc),

    ACTIVE_INPUT = 'activeInput',
    BLUR = 'blur',
    CLICK = 'click',
    CONTAINER = 'container',
    DATE_SEPARATOR = 'dateSeparator',
    DATEPICKER_SELECTION = 'datepickerSelection',
    FOCUS = 'focus',
    MASK = 'mask',
    MOUSEDOWN = 'mousedown',
    SELECTION_CHANGE = 'selectionChange',
    TRIGGER = 'trigger',
    VALUE_EXTRACTOR = 'valueExtractor',
    VALUE_FORMATTER = 'valueFormatter';

/**
 * A base class for DatePickerDelegate.
 *
 * @class A.DatePickerDelegate
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */

function DatePickerDelegate() {}

DatePickerDelegate.prototype = {
    _eventHandles: null,

    _userInteractionInProgress: false,

    /**
     * Construction logic executed during DatePickerDelegate instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.bindDelegateUI();
    },

    /**
     * Destructor logic implementation for the AutosizeIframe class. Lifecycle.
     *
     * @method destroy
     * @protected
     */
    destroy: function() {
        var instance = this;

        (new A.EventHandle(instance._eventHandles)).detach();
    },

    /**
     * Bind the events on the DatePickerDelegate UI. Lifecycle.
     *
     * @method bindDelegateUI
     * @protected
     */
    bindDelegateUI: function() {
        var instance = this,
            container = instance.get(CONTAINER),
            trigger = instance.get(TRIGGER);

        instance._eventHandles = [
            container.delegate(
                [FOCUS, MOUSEDOWN],
                A.bind('_onceUserInteraction', instance), trigger),

            container.delegate(
                BLUR,
                A.bind('_onUserInteractionRelease', instance), trigger),

            container.delegate(
                CLICK,
                A.bind('_onceUserInteractionRelease', instance), trigger)
        ];

        instance.publish(
            SELECTION_CHANGE, {
                defaultFn: instance._defSelectionChangeFn
            });
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getSelectedDates
     * @param node
     */
    getSelectedDates: function(node) {
        var instance = this,
            activeInput = node || instance.get(ACTIVE_INPUT),
            selectedDates = activeInput.getData(DATEPICKER_SELECTION);

        if (selectedDates) {
            return selectedDates;
        }

        return null;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getParsedDatesFromInputValue
     * @param opt_value
     */
    getParsedDatesFromInputValue: function(opt_value) {
        var instance = this,
            valueExtractor = instance.get(VALUE_EXTRACTOR),
            parsedDates = valueExtractor.call(instance, opt_value);

        if (parsedDates) {
            return A.Array.filter(parsedDates, function(parsed) {
                return parsed !== false;
            });
        }

        return null;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method useInputNode
     */
    useInputNode: function() {},

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method useInputNodeOnce
     * @param node
     */
    useInputNodeOnce: function(node) {
        var instance = this;

        if (!instance._userInteractionInProgress) {
            instance.useInputNode(node);
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _defSelectionChangeFn
     * @param event
     * @protected
     */
    _defSelectionChangeFn: function(event) {
        var instance = this,
            selection = event.newSelection,
            activeInput = instance.get(ACTIVE_INPUT),
            valueFormatter = instance.get(VALUE_FORMATTER);

        valueFormatter.call(instance, selection);

        activeInput.setData(DATEPICKER_SELECTION, selection);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _formatDate
     * @param event
     * @protected
     */
    _formatDate: function(date) {
        var instance = this,
            mask = instance.get(MASK);

        return A.Date.format(date, {
            format: mask
        });
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onceUserInteraction
     * @param event
     * @protected
     */
    _onceUserInteraction: function(event) {
        var instance = this;

        instance.useInputNodeOnce(event.currentTarget);

        instance._userInteractionInProgress = true;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onceUserInteractionRelease
     * @param event
     * @protected
     */
    _onceUserInteractionRelease: function(event) {
        var instance = this;

        instance.useInputNodeOnce(event.currentTarget);

        instance._userInteractionInProgress = false;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onUserInteractionRelease
     * @param event
     * @protected
     */
    _onUserInteractionRelease: function(event) {
        var instance = this;

        instance.useInputNode(event.currentTarget);

        instance._userInteractionInProgress = false;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _valueExtractorFn
     * @protected
     */
    _valueExtractorFn: function() {
        return function(opt_value) {
            var instance = this,
                activeInput = instance.get(ACTIVE_INPUT),
                activeInputValue = Lang.trim(opt_value || activeInput.val()),
                dateSeparator = instance.get(DATE_SEPARATOR),
                mask = instance.get(MASK),
                dates;

            if (activeInputValue) {
                dates = [];
                A.Array.each(
                    activeInputValue.split(dateSeparator),
                    function(text) {
                        text = Lang.trim(text);
                        if (text) {
                            dates.push(A.Date.parse(mask, text));
                        }
                    });
            }

            return dates;
        };
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _valueFormatterFn
     * @protected
     */
    _valueFormatterFn: function() {
        return function(dates) {
            var instance = this,
                activeInput = instance.get(ACTIVE_INPUT),
                dateSeparator = instance.get(DATE_SEPARATOR),
                values = [];

            A.Array.each(dates, function(date) {
                values.push(instance._formatDate(date));
            });

            activeInput.val(values.join(dateSeparator));
        };
    }
};

/**
 * TODO. Wanna help? Please send a Pull Request.
 *
 * @property DatePickerDelegate.ATTRS
 * @type Object
 * @static
 */
DatePickerDelegate.ATTRS = {

    /**
     * The active input element that holds the calendar instance.
     *
     * @attribute activeInput
     */
    activeInput: {},

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute container
     * @writeOnce
     */
    container: {
        setter: A.one,
        value: _DOCUMENT,
        writeOnce: true
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute dateSeparator
     * @default ' \u2014 '
     * @type String
     */
    dateSeparator: {
        value: ' \u2014 ',
        validator: Lang.isString
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute mask
     * @default '%m/%d/%Y'
     * @type String
     */
    mask: {
        value: '%m/%d/%Y',
        validator: Lang.isString
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute content
     * @type String
     */
    trigger: {
        validator: isString,
        writeOnce: true
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute valueExtractor
     * @type Function
     */
    valueExtractor: {
        valueFn: '_valueExtractorFn',
        validator: Lang.isFunction
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @attribute valueFormatter
     * @type Function
     */
    valueFormatter: {
        valueFn: '_valueFormatterFn',
        validator: Lang.isFunction
    }
};

A.DatePickerDelegate = DatePickerDelegate;
