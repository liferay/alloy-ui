var CSS_CELLEDITOR_ELEMENT = A.getClassName('celleditor', 'element'),
    DateCellEditor;

/**
 * DateCellEditor class.
 *
 * @class A.DateCellEditor
 * @extends A.BaseCellEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
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
     * configuration for the DateCellEditor.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute bodyContent
         * @default ''
         * @type String
         */
        bodyContent: {
            value: ''
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
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
         * TODO. Wanna help? Please send a Pull Request.
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
         * TODO. Wanna help? Please send a Pull Request.
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
         * TODO. Wanna help? Please send a Pull Request.
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
         * Construction logic executed during DateCellEditor instantiation.
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
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method getElementsValue
         */
        getElementsValue: function() {
            var instance = this;

            return instance.calendar.get('selectedDates');
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method formatDate
         * @param date
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
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _afterDateSelect
         * @param event
         * @protected
         */
        _afterDateSelect: function() {
            var instance = this,
                selectedDates = instance.calendar.get('selectedDates');

            instance.elements.val(A.Array.invoke(selectedDates, 'getTime').join(','));
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
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
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _setCalendar
         * @param val
         * @protected
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
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @method _uiSetValue
         * @param val
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
