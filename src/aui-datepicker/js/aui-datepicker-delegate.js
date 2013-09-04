/**
 * The DatePickerDelegate Component
 *
 * @module aui-datepicker-delegate
 */

var Lang = A.Lang,
    isString = Lang.isString,

    _DOCUMENT = A.one(A.config.doc),

    ACTIVE_INPUT = 'activeInput',
    CLICK = 'click',
    CONTAINER = 'container',
    DATE_SEPARATOR = 'dateSeparator',
    DATEPICKER_SELECTION = 'datepickerSelection',
    MASK = 'mask',
    MOUSEDOWN = 'mousedown',
    SELECTION_CHANGE = 'selectionChange',
    TRIGGER = 'trigger',
    FOCUSIN = 'focusin',
    FOCUSOUT = 'focusout',
    VALUE_EXTRACTOR = 'valueExtractor',
    VALUE_FORMATTER = 'valueFormatter';

function DatePickerDelegate() {}

DatePickerDelegate.prototype = {
    _eventHandles: null,

    _userInteractionInProgress: false,

    initializer: function() {
        var instance = this;

        instance.bindDelegateUI();
    },

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
                [FOCUSIN, MOUSEDOWN],
                A.bind('_onceUserInteraction', instance), trigger),

            container.delegate(
                FOCUSOUT,
                A.bind('_onUserInteractionRelease', instance), trigger),

            container.delegate(
                CLICK,
                A.bind('_onceUserInteractionRelease', instance), trigger)
        ];

        instance.publish(
            SELECTION_CHANGE,
            { defaultFn: instance._defSelectionChangeFn });
    },

    getSelectedDates: function(node) {
        var instance = this,
            activeInput = node || instance.get(ACTIVE_INPUT),
            selectedDates = activeInput.getData(DATEPICKER_SELECTION);

        if (selectedDates) {
            return selectedDates;
        }

        return null;
    },

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

    useInputNode: function() {},

    useInputNodeOnce: function(node) {
        var instance = this;

        if (!instance._userInteractionInProgress) {
            instance.useInputNode(node);
        }
    },

    _defSelectionChangeFn: function(event) {
        var instance = this,
            selection = event.newSelection,
            activeInput = instance.get(ACTIVE_INPUT),
            valueFormatter = instance.get(VALUE_FORMATTER);

        valueFormatter.call(instance, selection);

        activeInput.setData(DATEPICKER_SELECTION, selection);
    },

    _formatDate: function(date) {
        var instance = this,
            mask = instance.get(MASK);

        return A.Date.format(date, { format: mask });
    },

    _onceUserInteraction: function(event) {
        var instance = this;

        instance.useInputNodeOnce(event.currentTarget);

        instance._userInteractionInProgress = true;
    },

    _onceUserInteractionRelease: function(event) {
        var instance = this;

        instance.useInputNodeOnce(event.currentTarget);

        instance._userInteractionInProgress = false;
    },

    _onUserInteractionRelease: function(event) {
        var instance = this;

        instance.useInputNode(event.currentTarget);

        instance._userInteractionInProgress = false;
    },

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

    _valueFormatterFn: function() {
        return function(dates) {
            var instance = this,
                activeInput = instance.get(ACTIVE_INPUT),
                dateSeparator = instance.get(DATE_SEPARATOR),
                values = [];

            A.Array.each(dates, function(date) {
                values.push(instance._formatDate(date));
            });

            activeInput.val( values.join(dateSeparator) );
        };
    }
};

DatePickerDelegate.ATTRS = {
    /**
     * The active input element that holds the calendar instance.
     *
     * @attribute activeInput
     */
    activeInput: {
    },

    /**
     * The container of Toggler Delegate instance.
     *
     * @attribute container
     */
    container: {
        setter: A.one,
        value: _DOCUMENT,
        writeOnce: true
    },

    dateSeparator: {
        value: ' \u2014 ',
        validator: Lang.isString
    },

    mask: {
        value: '%m/%d/%Y',
        validator: Lang.isString
    },

    /**
     * The content of a Toogler Delegate instance.
     *
     * @attribute content
     * @type String
     */
    trigger: {
        validator: isString,
        writeOnce: true
    },

    valueExtractor: {
        valueFn: '_valueExtractorFn',
        validator: Lang.isFunction
    },

    valueFormatter: {
        valueFn: '_valueFormatterFn',
        validator: Lang.isFunction
    }
};

A.DatePickerDelegate = DatePickerDelegate;