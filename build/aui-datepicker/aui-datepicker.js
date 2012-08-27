AUI.add('aui-datepicker-base', function(A) {
var Lang = A.Lang,
	isArray	= Lang.isArray,
	isBoolean = Lang.isBoolean,
	isFunction = Lang.isFunction,
	isString = Lang.isString,

	AArray = A.Array,
	DataType = A.DataType,

	CALENDAR = 'calendar',
	CONTENT_BOX = 'contentBox',
	CURRENT_NODE = 'currentNode',
	DATE_FORMAT = 'dateFormat',
	DATEPICKER = 'date-picker',
	FORMATTER = 'formatter',
	LOCALE = 'locale',
	SELECT_MODE = 'selectionMode',
	SET_VALUE = 'setValue';


var DatePicker = A.Component.create({
	NAME: DATEPICKER,

	ATTRS: {
		/**
		 * <a href="Calendar.html">Calendar</a> configuration Object.</a>
		 *
		 * @attribute calendar
		 * @default {}
		 * @type Object
		 */
		calendar: {
			setter: '_setCalendar',
			value: {}
		},

		/**
		 * Function to format the array of the selected dates before set the
         * value of the input.
		 *
		 * @attribute formatter
		 * @default function(dates) { return dates.formatted.join(','); }
		 * @type function
		 */
		formatter: {
			value: function (dates) {
				var instance = this,
					formattedDates = [];

				if (isArray(dates)) {
					AArray.each(dates, function (date, index) {
						formattedDates[index] = instance.calendar.formatDate(date);
					});

					return formattedDates.join(',');
				} else {
					return instance.calendar.formatDate(dates);
				}
			},

			validator: isFunction
		},

		/**
		 * If true set the selected date with the correct
		 * dateFormat to the value of the input field
		 * which is hosting the Calendar.
		 *
		 * @attribute setValue
		 * @default true
		 * @type boolean
		 */
		setValue: {
			value: true,
			validator: isBoolean
		},

		/**
		 * If true is able to do stacking with another overlays.
		 *
		 * @attribute stack
		 * @default true
		 * @type boolean
		 */
		stack: {
			lazyAdd: false,
			value: true,
			setter: '_setStack',
			validator: isBoolean
		},

		showOn: {
			value: 'mousedown'
		},

		hideOn: {
			value: 'mousedown'
		}
	},

	EXTENDS: A.OverlayContext,

	prototype: {
		/**
		 * Construction logic executed during Datepicker instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function () {
			var instance = this,
				calendarConfig = instance.get(CALENDAR),
				calendar = new A.Calendar(calendarConfig);

			instance.calendar = calendar;

			// TODO

			instance.after('calendar:selectionChange', instance._afterSelectionChange);

			if (calendarConfig.hasOwnProperty('selectedDates')) {
				calendar.set('selectedDates', calendarConfig.selectedDates);
			}
		},

		/**
		 * Bind the events on the Datepicker UI. Lifecycle.
		 *
		 * @method bindUI
		 * @protected
		 */
		bindUI: function () {
			var instance = this;

			DatePicker.superclass.bindUI.apply(this, arguments);

			instance.on('show', instance._onShowOverlay);
		},

		/**
		 * Descructor lifecycle implementation for the Datepicker class.
		 * Purges events attached to the node (and all child nodes).
		 *
		 * @method destructor
		 * @protected
		 */
		destructor: function () {
			var instance = this;

			instance.calendar.destroy();
		},

		/**
		 * Fires when a date is selected on the Calendar.
		 *
		 * @method _afterSelectionChange
		 * @param {Event} event
		 * @protected
		 */
		_afterSelectionChange: function (event) {
			var instance = this;

			instance._uiSetSelectedDates(event.newSelection);
		},

		/**
		* Fires before the DatePicker overlay show. Responsible to invoke the
		* render phase of the Calendar.
		 *
		 * @method _onShowOverlay
		 * @param {Event} event
		 * @protected
		 */
		_onShowOverlay: function (event) {
			var instance = this;

			instance._renderCalendar();
		},

		/**
		 * Render the Calendar used inside the DatePicker.
		 *
		 * @method _renderCalendar
		 * @protected
		 */
		_renderCalendar: function () {
			var instance = this;

			instance.calendar.render(
				instance.get(CONTENT_BOX)
			);
		},

		/**
		 * Setter for the <a href="DatePicker.html#calendar">calendar</a>
	     * attribute.
		 *
		 * @method _setCalendar
		 * @param {String} eventType Event type
		 * @protected
		 * @return {}
		 */
		_setCalendar: function (val) {
			var instance = this;

			A.mix(val, {
				bubbleTargets: instance
			});

			return val;
		},

		/**
		 * Setter for the <a href="Calendar.html#config_stack">stack</a> attribute.
		 *
		 * @method _setStack
		 * @param {boolean} value
		 * @protected
		 * @return {boolean}
		 */
		_setStack: function (value) {
			var instance = this;

			if (value) {
				A.DatepickerManager.register(instance);
			}
			else {
				A.DatepickerManager.remove(instance);
			}

			return value;
		},

		/**
		 * Set the value of the trigger input with the date information.
		 *
		 * @method _setTriggerValue
		 * @param {Object} dateObj Object containing date information
		 * @protected
		 */
		_setTriggerValue: function (dateObj) {
			var instance = this;

			var value = instance.get(FORMATTER).apply(instance, [dateObj]);

			instance.get(CURRENT_NODE).val(value);
		},

		_uiSetSelectedDates: function (val) {
			var instance = this;

			if (instance.calendar.get(SELECT_MODE) !== 'multiple') {
				instance.hide();
			}

			if (instance.get(SET_VALUE)) {
				instance._setTriggerValue(val);
			}

			if (val.length) {
				instance.calendar.set('date', val[val.length-1]);
			}
		}
	}
});

A.DatePicker = DatePicker;

/**
 * A base class for DatepickerManager:
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class DatepickerManager
 * @constructor
 * @extends OverlayManager
 * @static
 */
A.DatepickerManager = new A.OverlayManager({
	/**
	 * ZIndex default value passed to the
     * <a href="OverlayManager.html#config_zIndexBase">zIndexBase</a> of
     * <a href="OverlayManager.html">OverlayManager</a>.
	 *
	 * @attribute zIndexBase
	 * @default 1000
	 * @type Number
	 */
	zIndexBase: 1000
});

var Calendar = function() {};

Calendar.ATTRS = {
	/**
	 * The default date format string which can be overriden for
	 * localization support. The format must be valid according to
	 * <a href="DataType.Date.html">A.DataType.Date.format</a>.
	 *
	 * @attribute dateFormat
	 * @default %m/%d/%Y
	 * @type String
	 */
	dateFormat: {
		value: '%m/%d/%Y',
		validator: isString
	},

	selectedDates: {
		readOnly: false,
		setter: function(val) {
			var instance = this;

			instance._clearSelection();

			instance.selectDates(val);
		}
	}
};

Calendar.prototype = {
	formatDate: function (date) {
		var instance = this,
			dateFormat = instance.get(DATE_FORMAT),
			locale = instance.get(LOCALE);

		return DataType.Date.format(date, {format: dateFormat, locale: locale});
	}
};

A.Base.mix(A.Calendar, [Calendar]);

}, '@VERSION@' ,{skinnable:true, requires:['aui-datatype','calendar','aui-overlay-context']});
AUI.add('aui-datepicker-select', function(A) {
/**
 * The DatePickerSelect Utility
 *
 * @module aui-calendar
 * @submodule aui-calendar-datepicker-select
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

	createSelect = function() {
		return A.Node.create(SELECT_TPL);
	},

	DOC = A.config.doc,

	APPEND_ORDER = 'appendOrder',
	BLANK = '',
	BODY = 'body',
	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	BUTTONITEM = 'buttonitem',
	BUTTON_NODE = 'buttonNode',
	CALENDAR = 'calendar',
	CLEARFIX = 'clearfix',
	CONTENT_BOX = 'contentBox',
	CONTENT = 'content',
	CURRENT_DAY = 'currentDay',
	CURRENT_MONTH = 'currentMonth',
	CURRENT_YEAR = 'currentYear',
	DATA_COMPONENT_ID = 'data-auiComponentID',
	DATEPICKER = 'datepicker',
	DAY = 'day',
	DAY_NODE = 'dayNode',
	DAY_NODE_NAME = 'dayNodeName',
	DISPLAY = 'display',
	DOT = '.',
	HELPER = 'helper',
	MAX_DATE = 'maxDate',
	MIN_DATE = 'minDate',
	LOCALE = 'locale',
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
	SELECTED = 'selected',
	SELECT_WRAPPER_NODE = 'selectWrapperNode',
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

	SELECT_TPL = '<select></select>',
	SELECT_OPTION_TPL = '<option></option>',
	WRAPPER_BUTTON_TPL = '<div class="'+ CSS_DATEPICKER_BUTTON_WRAPPER +'"></div>',
	WRAPPER_SELECT_TPL = '<div class='+ CSS_DATEPICKER_SELECT_WRAPPER +'></div>';

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
var DatePickerSelect = A.Component.create(
	{
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
				value: [ 'm', 'd', 'y' ],
				validator: isArray
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
			buttonNode: {},

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
				setter: function(v) {
					if (v instanceof A.NodeList) {
						return v;
					}
					else if (Lang.isString(v)) {
						return A.all(v);
					}

					return new A.NodeList(v);
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
				valueFn: function() {
					var year = new Date().getFullYear();

					return [ year - 10, year + 10 ];
				},
				validator: isArray
			},

			/**
			 * Current locale
			 *
			 * @attribute locale
			 * @default en
			 * @type String
			 */
			locale: {
				value: 'en',
				validator: 'isString'
			},

			/**
			 * Current day number.
			 *
			 * @attribute currentDay
			 * @default Current day
			 * @type Number
			 */
			currentDay: {
				setter: 'toInt',
				value: (new Date()).getDate()
			},

			/**
			 * Current month number.
			 *
			 * @attribute currentMonth
			 * @default Current month
			 * @type Number
			 */
			currentMonth: {
				setter: 'toInt',
				value: (new Date()).getMonth()
			},

			/**
			 * Current year number.
			 *
			 * @attribute currentYear
			 * @default Current year
			 * @type Number
			 */
			currentYear: {
				setter: 'toInt',
				value: (new Date()).getFullYear()
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
			buttonNode: DOT+CSS_BUTTONITEM,

			dayNode: DOT+CSS_DATEPICKER_DAY,

			monthNode: DOT+CSS_DATEPICKER_MONTH,

			selectWrapperNode: DOT+CSS_DATEPICKER_SELECT_WRAPPER,

			trigger: DOT+CSS_DATEPICKER_BUTTON_WRAPPER,

			yearNode: DOT+CSS_DATEPICKER_YEAR
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
			 * Descructor lifecycle implementation for the Datepicker class.
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

				if (!isValue(day)) {
					day = instance.get(CURRENT_DAY);
				}

				if (!isValue(month)) {
					month = instance.get(CURRENT_MONTH);
				}

				if (!isValue(year)) {
					year = instance.get(CURRENT_YEAR);
				}

				return { year: year, month: month, day: day };
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
				var instance = this,
					date = instance._normalizeYearMonth(year, month);

				return DateMath.getDaysInMonth(date.year, date.month);
			},

			/**
			 * Bind events on each select element (change, keypress, etc).
			 *
			 * @method _bindSelectEvents
			 * @protected
			 */
			_bindSelectEvents: function() {
				var instance = this,
					selects = instance.get(SELECT_WRAPPER_NODE).all(SELECT);

				selects.on('change', instance._onSelectChange, instance);
				selects.on('keypress', instance._onSelectChange, instance);
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
				var instance = this,
					appendOrder = instance.get(APPEND_ORDER),

					mapping = {
						d: instance.get(DAY_NODE),
						m: instance.get(MONTH_NODE),
						y: instance.get(YEAR_NODE)
					},

					firstField = mapping[ appendOrder[0] ],
					secondField = mapping[ appendOrder[1] ],
					thirdField = mapping[ appendOrder[2] ],

					id = instance.get('id');

				firstField.setAttribute(DATA_COMPONENT_ID, id);
				secondField.setAttribute(DATA_COMPONENT_ID, id);
				thirdField.setAttribute(DATA_COMPONENT_ID, id);

				return [ firstField, secondField, thirdField ];
			},

			/**
			 * Fires when a date is selected on the Calendar.
			 *
			 * @method _afterSelectDate
			 * @param {Event} event
			 * @protected
			 */
			_afterSelectionChange: function(event) {
				var instance = this,
					selectedDates = event.newSelection;

				if (selectedDates.length) {
					instance._syncSelectsUI(selectedDates[selectedDates.length-1]);
				}
			},

			/**
			 * Fired on any select change.
			 *
			 * @method _onSelectChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_onSelectChange: function(event) {
				var instance = this,
					target = event.currentTarget || event.target,
					monthChanged = target.test(DOT+CSS_DATEPICKER_MONTH),

					currentDay = instance.get(DAY_NODE).val(),
					currentMonth = instance.get(MONTH_NODE).val(),
					currentYear = instance.get(YEAR_NODE).val(),

					validDay = (currentDay > -1),
					validMonth = (currentMonth > -1),
					validYear = (currentYear > -1),

					date = new Date(currentYear, currentMonth, currentDay);


				if (!validDay || !validMonth || !validYear) {
					instance.calendar._clearSelection();
				} else {
					instance.calendar.set('selectedDates', date);
				}

				if (monthChanged) {
					instance._uiSetCurrentMonth();

					if (validDay) {
						instance._selectCurrentDay(date);
					}
				}
			},

			_setCalendar: function (val) {
				var instance = this;

				return A.merge(
					{
						selectedDates: new Date()
					},
					val || {}
				);
			},

			/**
			 * Get current date.
			 *
			 * @method getCurrentDate
			 * @return {Date}
			 */
			getCurrentDate: function(offsetYear, offsetMonth, offsetDay) {
				var instance = this,
					date = instance._normalizeYearMonth();

				return DateMath.getDate(date.year + toInt(offsetYear), date.month + toInt(offsetMonth), date.day + toInt(offsetDay));
			},

			/**
			 * Populate the day select element with the correct data.
			 *
			 * @method _populateDays
			 * @protected
			 */
			_populateDays: function() {
				var instance = this,
					dayNode = instance.get(DAY_NODE),
					daysInMonth = instance._getDaysInMonth();

				if (instance.get(POPULATE_DAY)) {
					instance._populateSelect(dayNode, 1, daysInMonth, null, null, instance.get(NULLABLE_DAY));
				}
			},

			/**
			 * Populate the month select element with the correct data.
			 *
			 * @method _populateMonths
			 * @protected
			 */
			_populateMonths: function() {
				var instance = this,
					monthNode = instance.get(MONTH_NODE),
					localeMap = instance._getLocaleMap(),
					monthLabels = localeMap.B;

				if (instance.get(POPULATE_MONTH)) {
					instance._populateSelect(monthNode, 0, (monthLabels.length - 1), monthLabels, null, instance.get(NULLABLE_MONTH));
				}
			},

			/**
			 * Populate the year select element with the correct data.
			 *
			 * @method _populateYears
			 * @protected
			 */
			_populateYears: function() {
				var instance = this,
					yearRange = instance.get(YEAR_RANGE),
					yearNode = instance.get(YEAR_NODE);

				if (instance.get(POPULATE_YEAR)) {
					instance._populateSelect(yearNode, yearRange[0], yearRange[1], null, null, instance.get(NULLABLE_YEAR));
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
				var i = 0,
					index = fromIndex,
					selectEl = A.Node.getDOMNode(select);

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
				var monthOptions = instance.get(MONTH_NODE).all(OPTION),
					yearOptions = instance.get(YEAR_NODE).all(OPTION),

					mLength = monthOptions.size() - 1,
					yLength = yearOptions.size() - 1,

					firstMonth = monthOptions.item(0).val(),
					firstYear = yearOptions.item(0).val(),
					lastMonth = monthOptions.item(mLength).val(),
					lastYear = yearOptions.item(yLength).val(),

					maxMonthDays = instance._getDaysInMonth(lastYear, lastMonth),

					minDate = new Date(firstYear, firstMonth, 1),
					maxDate = new Date(lastYear, lastMonth, maxMonthDays);

				instance.calendar.set(MAX_DATE, maxDate);
				instance.calendar.set(MIN_DATE, minDate);
			},

			_renderCalendar: function() {
				var instance = this,
					datePickerConfig = {
						calendar: instance.get(CALENDAR),
						trigger: instance.get(TRIGGER).item(0)
					},
					datePicker = new A.DatePicker(datePickerConfig).render();

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
				var instance = this,

					boundingBox = instance.get(BOUNDING_BOX),
					contentBox = instance.get(CONTENT_BOX),

					dayNode = instance.get(DAY_NODE),
					monthNode = instance.get(MONTH_NODE),
					yearNode = instance.get(YEAR_NODE);

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
					var selectWrapper = instance.get(SELECT_WRAPPER_NODE),
						orderedFields = instance._getAppendOrder();

					// this textNode is to prevent layout shifting only
					// simulate the default browser space between inputs/selects on re-append
					var textNode = A.one(
						DOC.createTextNode(SPACE)
					);

					selectWrapper.append(orderedFields[0]);
					selectWrapper.append( textNode.clone() );
					selectWrapper.append(orderedFields[1]);
					selectWrapper.append( textNode );
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
				var instance = this,
					trigger = instance.get(TRIGGER).item(0),
					contentBox = instance.get(CONTENT_BOX);

				instance._buttonItem = new A.ButtonItem({
					boundingBox: instance.get(BUTTON_NODE),
					icon: CALENDAR
				});

				contentBox.append(trigger);

				trigger.setAttribute(DATA_COMPONENT_ID, instance.get('id'));

				if ( trigger.test(DOT+CSS_DATEPICKER_BUTTON_WRAPPER) ) {
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

			/**
			 * Sync the UI of each DOM Select element.
			 *
			 * @method _syncSelectsUI
			 * @protected
			 */
			_syncSelectsUI: function(date) {
				var instance = this,
					selectedDates = instance.calendar.get('selectedDates');

				date = date || (selectedDates.length ? selectedDates[0] : new Date());

				instance._selectCurrentDay(date);
				instance._selectCurrentMonth(date);
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
			}
		}
	}
);

A.DatePickerSelect = DatePickerSelect;

}, '@VERSION@' ,{skinnable:true, requires:['aui-datepicker-base','aui-button-item']});


AUI.add('aui-datepicker', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-datepicker-base','aui-datepicker-select']});

