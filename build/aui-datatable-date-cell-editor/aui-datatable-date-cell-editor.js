YUI.add('aui-datatable-date-cell-editor', function (A, NAME) {

var CSS_CELLEDITOR_ELEMENT = A.getClassName('celleditor', 'element'),
    DateCellEditor;

/**
 * DateCellEditor class.
 *
 * @class A.DateCellEditor
 * @extends A.BaseCellEditor
 * @param {Object} config Object literal specifying widget configuration
 * properties.
 * @constructor
 */
DateCellEditor = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'dateCellEditor',

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.BaseCellEditor,

    /**
     * Static property used to define the default attribute
     * configuration for the `A.DateCellEditor`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Defines the content of body.
         *
         * @attribute bodyContent
         * @default ''
         * @type String
         */
        bodyContent: {
            value: ''
        },

        /**
         * Defines the `A.Calendar` object used for the `A.DateCellEditor` input.
         *
         * @attribute calendar
         * @default null
         * @type Object
         */
        calendar: {
            setter: '_setCalendar',
            validator: A.Lang.isObject,
            value: null
        },

        /**
         * Defines the `A.DataType.Date` format used in input and output methods
         * of the `A.DateCellEditor` input.
         *
         * @attribute dateFormat
         * @default '%Y-%m-%d'
         * @type String
         */
        dateFormat: {
            value: '%Y-%m-%d',
            validator: A.Lang.isString
        },

        /**
         * Defines the Function which is used in `formatValue` to modify values
         * for the `A.DateCellEditor` input.
         *
         * Default Function iterates and formats values using the `dateFormat`
         * attribute.
         *
         * @attribute inputFormatter
         * @type Function
         */
        inputFormatter: {
            value: function(val) {
                var instance = this,
                    values = [];

                A.Array.each(val, function(date) {
                    values.push(instance.formatDate(date).toString());
                });

                return values;
            }
        },

        /**
         * Defines the Function which is used in `formatValue` to modify values
         * for the `A.DateCellEditor` input.
         *
         * Default Function iterates and formats values using the `dateFormat`
         * attribute.
         *
         * @attribute outputFormatter
         * @type Function
         */
        outputFormatter: {
            value: function(val) {
                var instance = this,
                    values = [];

                A.Array.each(val, function(date) {
                    values.push(A.DataType.Date.parse(instance.get('dateFormat'), date));
                });

                return values;
            }
        }
    },

    prototype: {
        ELEMENT_TEMPLATE: '<input class="' + CSS_CELLEDITOR_ELEMENT + '" type="hidden" />',

        /**
         * Construction logic executed during `A.DateCellEditor` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.after('calendar:dateClick', A.bind(instance._afterDateSelect, instance));
        },

        /**
         * Gets the `A.DateCellEditor` input value.
         *
         * @method getElementsValue
         * @return {String} Input value.
         */
        getElementsValue: function() {
            var instance = this;

            return instance.calendar.get('selectedDates');
        },

        /**
         * Formats the passed `date` using the format define in the `dateFormat`
         * attribute.
         *
         * @method formatDate
         * @param {String} date
         * @return {String} HTML formatted for display.
         */
        formatDate: function(date) {
            var instance = this,
                mask = instance.get('dateFormat'),
                locale = instance.get('locale');

            return A.DataType.Date.format(date, {
                format: mask,
                locale: locale
            });
        },

        /**
         * Fires after `calendar:dateClick` event. Sets the elements values to
         * the selected dates.
         *
         * @method _afterDateSelect
         * @param {EventFacade} event
         * @protected
         */
        _afterDateSelect: function() {
            var instance = this,
                selectedDates = instance.calendar.get('selectedDates');

            instance.elements.val(A.Array.invoke(selectedDates, 'getTime').join(','));
        },

        /**
         * Fires after `render` event.
         *
         * @method _afterRender
         * @protected
         */
        _afterRender: function() {
            var instance = this;

            A.DateCellEditor.superclass._afterRender.apply(instance, arguments);

            instance.calendar = new A.Calendar(
                instance.get('calendar')
            ).render(instance.bodyNode);
        },

        /**
         * Sets the calendar attribute.
         *
         * @method _setCalendar
         * @param {Object} val
         * @protected
         * @return {Object} Merged `A.Calendar` object.
         */
        _setCalendar: function(val) {
            var instance = this;

            return A.merge({
                    bubbleTargets: instance
                },
                val
            );
        },

        /**
         * Places keyboard focus on the first selected date, if any. Otherwise,
         * places focus on the default date.
         *
         * @method _syncElementsFocus
         * @protected
         */
        _syncElementsFocus: function() {
            var instance = this,
                calendar = instance.calendar,
                date = calendar.get('selectedDates')[0];

            A.DateCellEditor.superclass._syncElementsFocus.apply(instance, arguments);

            if (!date) {
                date = calendar.get('date');
            }

            calendar.focus();

            calendar._highlightDateNode(date);
        },

        /**
         * Sets and formats `A.DateCellEditor` `A.Calendar` `date` attribute.
         *
         * @method _uiSetValue
         * @param {Array} val
         * @protected
         */
        _uiSetValue: function(val) {
            var instance = this,
                calendar = instance.calendar,
                formatedValue;

            if (calendar) {
                if (!A.Lang.isArray(val)) {
                    val = [val];
                }

                formatedValue = instance.formatValue(instance.get('outputFormatter'), val);

                calendar._clearSelection();

                if (formatedValue[0]) {
                    calendar.set('date', formatedValue[0]);
                    calendar.selectDates(formatedValue);
                }
                else {
                    calendar.set('date', new Date());
                }
            }
        }
    }
});

A.DateCellEditor = DateCellEditor;


}, '3.0.1', {"requires": ["aui-datatable-base-options-cell-editor"]});
