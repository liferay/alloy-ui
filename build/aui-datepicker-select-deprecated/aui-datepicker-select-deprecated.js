YUI.add('aui-datepicker-select-deprecated', function (A, NAME) {

/**
 * The DatePickerSelect Utility
 *
 * @module aui-datepicker
 */

var Lang = A.Lang,
    isArray = Lang.isArray,
    isString = Lang.isString,
    isBoolean = Lang.isBoolean,
    isValue = Lang.isValue,
    isNumber = Lang.isNumber,
    isDate = Lang.isDate,
    toInt = Lang.toInt,
    DataType = A.DataType,
    DateMath = DataType.DateMath,

    nodeSetter = function(v) {
        return A.one(v);
    },

    createButton = function() {
        return A.Node.create(BUTTON_TPL);
    },

    createSelect = function() {
        return A.Node.create(SELECT_TPL);
    },

    DOC = A.config.doc,

    APPEND_ORDER = 'appendOrder',
    BLANK = '',
    BODY = 'body',
    BOUNDING_BOX = 'boundingBox',
    BUTTON = 'button',
    BUTTON_NODE = 'buttonNode',
    BUTTONITEM = 'buttonitem',
    CALENDAR = 'calendar',
    CHANGE = 'change',
    CLEARFIX = 'clearfix',
    CONTENT = 'content',
    CONTENT_BOX = 'contentBox',
    DATA_COMPONENT_ID = 'data-auiComponentID',
    DATEPICKER = 'datepicker',
    DAY = 'day',
    DAY_NODE = 'dayNode',
    DAY_NODE_NAME = 'dayNodeName',
    DISABLED = 'disabled',
    DISPLAY = 'display',
    DOT = '.',
    HELPER = 'helper',
    KEY_PRESS = 'keypress',
    LOCALE = 'locale',
    MAX_DATE = 'maxDate',
    MIN_DATE = 'minDate',
    MONTH = 'month',
    MONTH_NODE = 'monthNode',
    MONTH_NODE_NAME = 'monthNodeName',
    NAME = 'name',
    NULLABLE_DAY = 'nullableDay',
    NULLABLE_MONTH = 'nullableMonth',
    NULLABLE_YEAR = 'nullableYear',
    OPTION = 'option',
    POPULATE_DAY = 'populateDay',
    POPULATE_MONTH = 'populateMonth',
    POPULATE_YEAR = 'populateYear',
    SELECT = 'select',
    SELECT_MULTIPLE_DATES = 'selectionMode',
    SELECT_WRAPPER_NODE = 'selectWrapperNode',
    SELECTED = 'selected',
    SELECTED_DATES = 'selectedDates',
    SPACE = ' ',
    SRC_NODE = 'srcNode',
    TRIGGER = 'trigger',
    WRAPPER = 'wrapper',
    YEAR = 'year',
    YEAR_NODE = 'yearNode',
    YEAR_NODE_NAME = 'yearNodeName',
    YEAR_RANGE = 'yearRange',

    getClassName = A.getClassName,

    CSS_BUTTONITEM = getClassName(BUTTONITEM),
    CSS_DATEPICKER = getClassName(DATEPICKER),
    CSS_DATEPICKER_BUTTON_WRAPPER = getClassName(DATEPICKER, BUTTON, WRAPPER),
    CSS_DATEPICKER_DAY = getClassName(DATEPICKER, DAY),
    CSS_DATEPICKER_DISPLAY = getClassName(DATEPICKER, DISPLAY),
    CSS_DATEPICKER_DISPLAY_CONTENT = getClassName(DATEPICKER, DISPLAY, CONTENT),
    CSS_DATEPICKER_MONTH = getClassName(DATEPICKER, MONTH),
    CSS_DATEPICKER_SELECT_WRAPPER = getClassName(DATEPICKER, SELECT, WRAPPER),
    CSS_DATEPICKER_YEAR = getClassName(DATEPICKER, YEAR),
    CSS_HELPER_CLEARFIX = getClassName(HELPER, CLEARFIX),

    BUTTON_TPL = '<button />',
    SELECT_TPL = '<select></select>',
    SELECT_OPTION_TPL = '<option></option>',
    WRAPPER_BUTTON_TPL = '<div class="' + CSS_DATEPICKER_BUTTON_WRAPPER + '"></div>',
    WRAPPER_SELECT_TPL = '<div class=' + CSS_DATEPICKER_SELECT_WRAPPER + '></div>';

/**
 * <p><img src="assets/images/aui-calendar-datepicker-select/main.png"/></p>
 *
 * A base class for DatePickerSelect, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Select a date from Calendar to select elements</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.DatePickerSelect({
 *  srcNode: '#srcNodeId',
 *  calendar: {
 *      // locale: 'pt-br',
 *      dateFormat: '%m/%d/%y',
 *      yearRange: [ 1970, 2009 ]
 *	}
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="DatePickerSelect.html#configattributes">Configuration Attributes</a> available for
 * DatePickerSelect.
 *
 * @class DatePickerSelect
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 * @extends Component
 */
var DatePickerSelect = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property DatePickerSelect.NAME
     * @type String
     * @static
     */
    NAME: DATEPICKER,

    /**
     * Static property used to define the default attribute
     * configuration for the DatePickerSelect.
     *
     * @property DatePickerSelect.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The order the selects elements are appended to the
         * <a href="DatePickerSelect.html#config_srcNode">srcNode</a>.
         *
         * @attribute appendOrder
         * @default [ 'm', 'd', 'y' ]
         * @type Array
         */
        appendOrder: {
            validator: isArray,
            value: ['m', 'd', 'y']
        },

        /**
         * DOM Node to display the button of the DatePickerSelect. If not
         * specified try to query using HTML_PARSER an element inside
         * contentBox which matches <code>aui-buttonitem</code>.
         *
         * @attribute buttonNode
         * @default Generated div element.
         * @type String
         */
        buttonNode: {
            setter: nodeSetter,
            valueFn: createButton
        },

        /**
         * <a href="Calendar.html">Calendar</a> configuration Object.</a>
         *
         * @attribute calendar
         * @default {}
         * @type Object
         */
        calendar: {
            setter: '_setCalendar'
        },

        /**
         * DOM Node to display the day of the DatePickerSelect. If not
         * specified try to query using HTML_PARSER an element inside
         * contentBox which matches <code>aui-datepicker-year</code>.
         *
         * @attribute dayNode
         * @default Generated div element.
         * @type String | Node
         */
        dayNode: {
            setter: nodeSetter,
            valueFn: createSelect
        },

        /**
         * Name attribute used on the
         * <a href="DatePickerSelect.html#config_dayNode">dayNode</a>.
         *
         * @attribute dayNodeName
         * @default day
         * @type String
         */
        dayNodeName: {
            valueFn: function() {
                return this.get(DAY_NODE).get(NAME) || DAY;
            }
        },

        /**
         * Current locale
         *
         * @attribute locale
         * @default en
         * @type String
         */
        locale: {
            validator: 'isString',
            value: 'en'
        },

        /**
         * DOM Node to display the month of the DatePickerSelect. If not
         * specified try to query using HTML_PARSER an element inside
         * contentBox which matches <code>aui-datepicker-year</code>.
         *
         * @attribute monthNode
         * @default Generated div element.
         * @type String | Node
         */
        monthNode: {
            setter: nodeSetter,
            valueFn: createSelect
        },

        /**
         * Name attribute used on the
         * <a href="DatePickerSelect.html#config_monthNode">monthNode</a>.
         *
         * @attribute monthNodeName
         * @default month
         * @type String
         */
        monthNodeName: {
            valueFn: function() {
                return this.get(MONTH_NODE).get(NAME) || MONTH;
            }
        },

        /**
         * If true the select element for the day will be nullable
         *
         * @attribute nullableDay
         * @default false
         * @type boolean
         */
        nullableDay: {
            value: false
        },

        /**
         * If true the select element for the month will be nullable
         *
         * @attribute nullableMonth
         * @default false
         * @type boolean
         */
        nullableMonth: {
            value: false
        },

        /**
         * If true the select element for the year will be nullable
         *
         * @attribute nullableYear
         * @default false
         * @type boolean
         */
        nullableYear: {
            value: false
        },

        /**
         * If true the select element for the days will be automatic
         * populated.
         *
         * @attribute populateDay
         * @default true
         * @type boolean
         */
        populateDay: {
            value: true
        },

        /**
         * If true the select element for the month will be automatic
         * populated.
         *
         * @attribute populateMonth
         * @default true
         * @type boolean
         */
        populateMonth: {
            value: true
        },

        /**
         * If true the select element for the year will be automatic
         * populated.
         *
         * @attribute populateYear
         * @default true
         * @type boolean
         */
        populateYear: {
            value: true
        },

        /**
         * DOM Node to display the selects of the DatePickerSelect. If not
         * specified try to query using HTML_PARSER an element inside
         * contentBox which matches <code>aui-datepicker-select-wrapper</code>.
         *
         * @attribute selectWrapperNode
         * @default Generated div element.
         * @type String
         */
        selectWrapperNode: {
            valueFn: function() {
                return A.Node.create(WRAPPER_SELECT_TPL);
            }
        },

        /**
         * Trigger element to open the calendar. Inherited from
         * <a href="OverlayContext.html#config_trigger">OverlayContext</a>.
         *
         * @attribute trigger
         * @default Generated HTLM div element
         * @type {Node | String}
         */
        trigger: {
            setter: function(value) {
                if (value instanceof A.NodeList) {
                    return value;
                }
                else if (Lang.isString(value)) {
                    return A.all(value);
                }

                return new A.NodeList(value);
            },
            valueFn: function() {
                return A.NodeList.create(WRAPPER_BUTTON_TPL);
            }
        },

        /**
         * DOM Node to display the year of the DatePickerSelect. If not
         * specified try to query using HTML_PARSER an element inside
         * contentBox which matches <code>aui-datepicker-year</code>.
         *
         * @attribute yearNode
         * @default Generated div element.
         * @type String | Node
         */
        yearNode: {
            setter: nodeSetter,
            valueFn: createSelect
        },

        /**
         * Name attribute used on the
         * <a href="DatePickerSelect.html#config_yearNode">yearNode</a>.
         *
         * @attribute yearNodeName
         * @default year
         * @type String
         */
        yearNodeName: {
            valueFn: function() {
                return this.get(YEAR_NODE).get(NAME) || YEAR;
            }
        },

        /**
         * Year range to be displayed on the year select element. By default
         * it displays from -10 to +10 years from the current year.
         *
         * @attribute yearRange
         * @default [ year - 10, year + 10 ]
         * @type Array
         */
        yearRange: {
            validator: isArray,
            valueFn: function() {
                var year = new Date().getFullYear();

                return [year - 10, year + 10];
            }
        }
    },

    /**
     * Object hash, defining how attribute values are to be parsed from
     * markup contained in the widget's content box.
     *
     * @property DatePickerSelect.HTML_PARSER
     * @type Object
     * @static
     */
    HTML_PARSER: {
        buttonNode: DOT + CSS_BUTTONITEM,
        dayNode: DOT + CSS_DATEPICKER_DAY,
        monthNode: DOT + CSS_DATEPICKER_MONTH,
        selectWrapperNode: DOT + CSS_DATEPICKER_SELECT_WRAPPER,
        trigger: DOT + CSS_DATEPICKER_BUTTON_WRAPPER,
        yearNode: DOT + CSS_DATEPICKER_YEAR
    },

    EXTENDS: A.Component,

    prototype: {
        /**
         * Bind the events on the DatePickerSelect UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance._bindSelectEvents();

            instance.after('calendar:selectionChange', instance._afterSelectionChange);
        },

        /**
         * Destructor lifecycle implementation for the Datepicker class.
         * Purges events attached to the node (and all child nodes).
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var instance = this;

            instance.datePicker.destroy();
        },

        /**
         * Create the DOM structure for the DatePickerSelect. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance._renderElements();
            instance._renderTriggerButton();
            instance._renderCalendar();
        },

        /**
         * Sync the DatePickerSelect UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;

            instance._populateSelects();
            instance._syncSelectsUI();
        },

        /**
         * Get current date.
         *
         * @method getCurrentDate
         * @return {Date}
         */
        getCurrentDate: function(offsetYear, offsetMonth, offsetDay) {
            var instance = this;

            var date = instance._normalizeYearMonth();

            var newDay = date.day + toInt(offsetDay);
            var newMonth = date.month + toInt(offsetMonth);
            var newYear = date.year + toInt(offsetYear);

            var totalMonthDays = instance.getDaysInMonth(date.year, newMonth);

            if (newDay > totalMonthDays) {
                newDay = totalMonthDays;
            }

            return DateMath.getDate(newYear, newMonth, newDay);
        },

        /**
         * Fires when a date is selected on the Calendar.
         *
         * @method _afterSelectDate
         * @param {Event} event
         * @protected
         */
        _afterSelectionChange: function(event) {
            var instance = this;

            var selectedDates = event.newSelection;

            if (selectedDates.length) {
                instance._syncSelectsUI(selectedDates[selectedDates.length - 1]);
            }
        },

        /**
         * Bind events on each select element (change, keypress, etc).
         *
         * @method _bindSelectEvents
         * @protected
         */
        _bindSelectEvents: function() {
            var instance = this;

            var selects = instance.get(SELECT_WRAPPER_NODE).all(SELECT);

            selects.on(CHANGE, instance._onSelectChange, instance);
            selects.on(KEY_PRESS, instance._onSelectChange, instance);
        },

        /**
         * Gets an Array with the field elements in the correct order defined
         * on <a href="DatePickerSelect.html#config_appendOrder">appendOrder</a>.
         *
         * @method _getAppendOrder
         * @protected
         * @return {Array}
         */
        _getAppendOrder: function() {
            var instance = this;

            var appendOrder = instance.get(APPEND_ORDER);
            var id = instance.get('id');

            var mapping = {
                d: instance.get(DAY_NODE),
                m: instance.get(MONTH_NODE),
                y: instance.get(YEAR_NODE)
            };

            var firstField = mapping[appendOrder[0]];
            var secondField = mapping[appendOrder[1]];
            var thirdField = mapping[appendOrder[2]];

            firstField.setAttribute(DATA_COMPONENT_ID, id);
            secondField.setAttribute(DATA_COMPONENT_ID, id);
            thirdField.setAttribute(DATA_COMPONENT_ID, id);

            return [firstField, secondField, thirdField];
        },

        /**
         * Get the number of days in the passed year and month.
         *
         * @method getDaysInMonth
         * @param {Number} year Year in the format YYYY.
         * @param {Number} month 0 for January 11 for December.
         * @return {Number}
         */
        _getDaysInMonth: function(year, month) {
            var instance = this;

            var date = instance._normalizeYearMonth(year, month);

            return DateMath.getDaysInMonth(date.year, date.month);
        },

        /**
         * Get the locale map containing the respective values for the
         * <a href="Widget.html#config_locale">locale</a> used.
         *
         * <pre><code>A.DataType.Date.Locale['pt-br'] = A.merge(
         *	A.DataType.Date.Locale['en'], {
         *		a: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Fri', 'Sat'],
         *		A: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
         *		b: ['Jan','Fev','Mar','Abr','Mai','Jun', 'Jul','Ago','Set','Out','Nov','Dez'],
         *		B: ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho', 'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
         *		c: '%a %d %b %Y %T %Z',
         *		p: ['AM', 'PM'],
         *		P: ['am', 'pm'],
         *		r: '%I:%M:%S %p',
         *		x: '%d/%m/%y',
         *		X: '%T'
         *	}
         *);</code></pre>
         *
         * @method _getLocaleMap
         * @protected
         * @return {Object}
         */
        _getLocaleMap: function() {
            var instance = this;

            return DataType.Date.Locale[instance.get(LOCALE)];
        },

        /**
         * Returns an Object with the current day, month and year.
         *
         * @method _normalizeYearMonth
         * @param {Number} year Year in the format YYYY.
         * @param {Number} month 0 for January 11 for December.
         * @param {Number} day
         * @protected
         * @return {Object}
         */
        _normalizeYearMonth: function(year, month, day) {
            var instance = this;

            var selectedDates = instance.calendar.get(SELECTED_DATES);

            var date = selectedDates.length ? selectedDates[0] : new Date();

            if (!isValue(day)) {
                day = date.getDate();
            }

            if (!isValue(month)) {
                month = date.getMonth();
            }

            if (!isValue(year)) {
                year = date.getFullYear();
            }

            return {
                year: year,
                month: month,
                day: day
            };
        },

        /**
         * Fired on any select change.
         *
         * @method _onSelectChange
         * @param {EventFacade} event
         * @protected
         */
        _onSelectChange: function(event) {
            var instance = this;

            var target = event.currentTarget || event.target;

            var monthChanged = target.test(DOT + CSS_DATEPICKER_MONTH);

            var currentDay = instance.get(DAY_NODE).val();
            var currentMonth = instance.get(MONTH_NODE).val();
            var currentYear = instance.get(YEAR_NODE).val();

            var validDay = (currentDay > -1);
            var validMonth = (currentMonth > -1);
            var validYear = (currentYear > -1);

            if (validMonth && validYear) {
                var totalMonthDays = instance._getDaysInMonth(currentYear, currentMonth);

                if (currentDay > totalMonthDays) {
                    currentDay = totalMonthDays;
                }
            }

            var date = new Date(currentYear, currentMonth, currentDay);

            if (!validDay || !validMonth || !validYear) {
                instance.calendar._clearSelection();
            }
            else {
                instance.calendar.set(SELECTED_DATES, date);
            }

            if (monthChanged) {
                instance._uiSetCurrentMonth();

                if (validDay) {
                    instance._selectCurrentDay(date);
                }
            }
        },

        /**
         * Populate the day select element with the correct data.
         *
         * @method _populateDays
         * @protected
         */
        _populateDays: function() {
            var instance = this;

            if (instance.get(POPULATE_DAY)) {
                instance._populateSelect(
                    instance.get(DAY_NODE),
                    1,
                    instance._getDaysInMonth(),
                    null,
                    null,
                    instance.get(NULLABLE_DAY)
                );
            }
        },

        /**
         * Populate the month select element with the correct data.
         *
         * @method _populateMonths
         * @protected
         */
        _populateMonths: function() {
            var instance = this;

            var localeMap = instance._getLocaleMap();

            var monthLabels = localeMap.B;

            if (instance.get(POPULATE_MONTH)) {
                instance._populateSelect(
                    instance.get(MONTH_NODE),
                    0, (monthLabels.length - 1),
                    monthLabels,
                    null,
                    instance.get(NULLABLE_MONTH)
                );
            }
        },

        /**
         * Populate a select element with the data passed on the params.
         *
         * @method _populateSelect
         * @param {HTMLSelectElement} select Select to be populated
         * @param {Number} fromIndex Index to start
         * @param {Number} toIndex Index to end
         * @param {Object} values Object with labels to be used as content of each
         * option. Optional.
         * @protected
         * @return {String}
         */
        _populateSelect: function(select, fromIndex, toIndex, labels, values, nullable) {
            var i = 0;

            var index = fromIndex;
            var selectEl = A.Node.getDOMNode(select);

            select.empty();

            labels = labels || [];
            values = values || [];

            if (nullable) {
                selectEl.options[0] = new Option(BLANK, -1);

                i++;
            }

            while (index <= toIndex) {
                var value = values[index] || index,
                    label = labels[index] || index;

                selectEl.options[i] = new Option(label, index);

                i++;
                index++;
            }
        },

        /**
         * Populate each select element with the correct data for the day, month
         * and year.
         *
         * @method _populateSelects
         * @protected
         */
        _populateSelects: function() {
            var instance = this;

            instance._populateDays();
            instance._populateMonths();
            instance._populateYears();

            // restricting dates based on the selects values
            var monthOptions = instance.get(MONTH_NODE).all(OPTION);
            var yearOptions = instance.get(YEAR_NODE).all(OPTION);

            var mLength = monthOptions.size() - 1;
            var yLength = yearOptions.size() - 1;

            var firstMonth = monthOptions.item(0).val();
            var firstYear = yearOptions.item(0).val();
            var lastMonth = monthOptions.item(mLength).val();
            var lastYear = yearOptions.item(yLength).val();

            var maxMonthDays = instance._getDaysInMonth(lastYear, lastMonth);

            var minDate = new Date(firstYear, firstMonth, 1);
            var maxDate = new Date(lastYear, lastMonth, maxMonthDays);

            instance.calendar.set(MAX_DATE, maxDate);
            instance.calendar.set(MIN_DATE, minDate);
        },

        /**
         * Populate the year select element with the correct data.
         *
         * @method _populateYears
         * @protected
         */
        _populateYears: function() {
            var instance = this;

            var yearRange = instance.get(YEAR_RANGE);

            if (instance.get(POPULATE_YEAR)) {
                instance._populateSelect(
                    instance.get(YEAR_NODE),
                    yearRange[0],
                    yearRange[1],
                    null,
                    null,
                    instance.get(NULLABLE_YEAR)
                );
            }
        },

        _renderCalendar: function() {
            var instance = this;

            var datePickerConfig = {
                calendar: instance.get(CALENDAR),
                trigger: instance.get(TRIGGER).item(0)
            };

            var datePicker = new A.DatePicker(datePickerConfig).render();

            datePicker.addTarget(instance);

            instance.datePicker = datePicker;
            instance.calendar = datePicker.calendar;
        },

        /**
         * Render DOM elements for the DatePickerSelect.
         *
         * @method _renderElements
         * @protected
         */
        _renderElements: function() {
            var instance = this;

            var boundingBox = instance.get(BOUNDING_BOX);
            var contentBox = instance.get(CONTENT_BOX);

            var dayNode = instance.get(DAY_NODE);
            var monthNode = instance.get(MONTH_NODE);
            var yearNode = instance.get(YEAR_NODE);

            dayNode.addClass(CSS_DATEPICKER_DAY);
            monthNode.addClass(CSS_DATEPICKER_MONTH);
            yearNode.addClass(CSS_DATEPICKER_YEAR);

            boundingBox.addClass(CSS_DATEPICKER_DISPLAY);
            boundingBox.addClass(CSS_HELPER_CLEARFIX);

            contentBox.addClass(CSS_DATEPICKER_DISPLAY_CONTENT);

            // setting name of the fields
            monthNode.set(NAME, instance.get(MONTH_NODE_NAME));
            yearNode.set(NAME, instance.get(YEAR_NODE_NAME));
            dayNode.set(NAME, instance.get(DAY_NODE_NAME));

            if (!monthNode.inDoc(A.config.doc)) {
                // append elements
                var selectWrapper = instance.get(SELECT_WRAPPER_NODE);

                var orderedFields = instance._getAppendOrder();

                // this textNode is to prevent layout shifting only
                // simulate the default browser space between inputs/selects on re-append
                var textNode = A.one(
                    DOC.createTextNode(SPACE)
                );

                selectWrapper.append(orderedFields[0]);
                selectWrapper.append(textNode.clone());
                selectWrapper.append(orderedFields[1]);
                selectWrapper.append(textNode);
                selectWrapper.append(orderedFields[2]);

                contentBox.append(selectWrapper);
            }
        },

        /**
         * Render DOM element for the trigger button of the DatePickerSelect.
         *
         * @method _renderTriggerButton
         * @protected
         */
        _renderTriggerButton: function() {
            var instance = this;

            var trigger = instance.get(TRIGGER).item(0);

            instance._buttonItem = new A.ButtonItem({
                boundingBox: instance.get(BUTTON_NODE),
                icon: CALENDAR
            });

            instance.get(CONTENT_BOX).append(trigger);

            trigger.setAttribute(DATA_COMPONENT_ID, instance.get('id'));

            if (trigger.test(DOT + CSS_DATEPICKER_BUTTON_WRAPPER)) {
                // use Button if the user doesn't specify a trigger
                instance._buttonItem.render(trigger);
            }
        },

        /**
         * Select the current day on the respective input field.
         *
         * @method _selectCurrentDay
         * @protected
         */
        _selectCurrentDay: function(currentDate) {
            var instance = this;

            instance.get(DAY_NODE).val(
                String(currentDate.getDate())
            );
        },

        /**
         * Select the current month on the respective input field.
         *
         * @method _selectCurrentMonth
         * @protected
         */
        _selectCurrentMonth: function(currentDate) {
            var instance = this;

            instance.get(MONTH_NODE).val(
                String(currentDate.getMonth())
            );

            instance._uiSetCurrentMonth();
        },

        /**
         * Select the current year on the respective input field.
         *
         * @method _selectCurrentYear
         * @protected
         */
        _selectCurrentYear: function(currentDate) {
            var instance = this;

            instance.get(YEAR_NODE).val(
                String(currentDate.getFullYear())
            );
        },

        _setCalendar: function(val) {
            var instance = this;

            return A.merge({
                    selectedDates: new Date()
                },
                val || {}
            );
        },

        /**
         * Sync the UI of each DOM Select element.
         *
         * @method _syncSelectsUI
         * @protected
         */
        _syncSelectsUI: function(date) {
            var instance = this;

            var selectedDates = instance.calendar.get(SELECTED_DATES);

            date = date || (selectedDates.length ? selectedDates[0] : new Date());

            instance._selectCurrentMonth(date);
            instance._selectCurrentDay(date);
            instance._selectCurrentYear(date);
        },

        /**
         * Fired after
         * <a href="DatePickerSelect.html#config_currentMonth">currentMonth</a> is set.
         *
         * @method _uiSetCurrentMonth
         * @param {EventFacade} event
         * @protected
         */
        _uiSetCurrentMonth: function(value) {
            var instance = this;

            instance._populateDays();
        },

        /**
         * Fired after
         * <a href="DatePickerSelect.html#config_disabled">disabled</a> is set.
         *
         * @method _afterDisabledChangeDatePicker
         * @param {EventFacade} event
         * @protected
         */
        _uiSetDisabled: function(disabled) {
            var instance = this;

            DatePickerSelect.superclass._uiSetDisabled.apply(instance, arguments);

            instance.get(DAY_NODE).set('disabled', disabled);
            instance.get(MONTH_NODE).set('disabled', disabled);
            instance.get(YEAR_NODE).set('disabled', disabled);

            instance.datePicker.set(DISABLED, disabled);

            instance._buttonItem.set(DISABLED, disabled);
            instance._buttonItem.StateInteraction.set(DISABLED, disabled);
        }
    }
});

A.DatePickerSelect = DatePickerSelect;


}, '3.0.1', {"requires": ["aui-datepicker-base-deprecated", "aui-button-item-deprecated"], "skinnable": true});
