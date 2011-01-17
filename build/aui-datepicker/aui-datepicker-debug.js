AUI.add('aui-datepicker-base', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isFunction = Lang.isFunction,

	CALENDAR = 'calendar',
	CONTENT_BOX = 'contentBox',
	CURRENT_NODE = 'currentNode',
	FORMATTER = 'formatter',
	SELECT_MULTIPLE_DATES = 'selectMultipleDates',
	SET_VALUE = 'setValue',

	DATEPICKER = 'date-picker';

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
			value: function(dates) {
				return dates.formatted.join(',');
			},
			validator: isFunction
		},

		/**
		 * If true set the selected date with the correct
		 * <a href="Calendar.html#config_dateFormat">dateFormat</a> to the
		 * value of the input field which is hosting the Calendar.
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
		initializer: function() {
			var instance = this;

			instance.calendar = new A.Calendar(
				instance.get(CALENDAR)
			);
		},

		/**
		 * Bind the events on the Datepicker UI. Lifecycle.
		 *
		 * @method bindUI
		 * @protected
		 */
		bindUI: function() {
			var instance = this;

			DatePicker.superclass.bindUI.apply(this, arguments);

			instance.on('show', instance._onShowOverlay);
			instance.after('calendar:select', instance._afterSelectDate);

			// Set the value of the trigger with the Calendar current date
			if (instance.get(SET_VALUE)) {
				instance._setTriggerValue(
					instance.calendar._getSelectEventData().date
				);
			}
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

			instance.calendar.destroy();
		},

		/**
		 * Fires when a date is selected on the Calendar.
		 *
		 * @method _afterSelectDate
		 * @param {Event} event
		 * @protected
		 */
		_afterSelectDate: function(event) {
			var instance = this;

			if (!instance.calendar.get(SELECT_MULTIPLE_DATES)) {
				instance.hide();
			}

			if (instance.get(SET_VALUE)) {
				instance._setTriggerValue(event.date);
			}
		},

		/**
		* Fires before the DatePicker overlay show. Responsible to invoke the
		* render phase of the Calendar.
		 *
		 * @method _onShowOverlay
		 * @param {Event} event
		 * @protected
		 */
		_onShowOverlay: function(event) {
			var instance = this;

			instance._renderCalendar();
		},

		/**
		 * Render the Calendar used inside the DatePicker.
		 *
		 * @method _renderCalendar
		 * @protected
		 */
		_renderCalendar: function() {
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
		_setCalendar: function(val) {
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
		_setStack: function(value) {
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
		_setTriggerValue: function(dateObj) {
			var instance = this;

			var value = instance.get(FORMATTER).apply(instance, [dateObj]);

			instance.get(CURRENT_NODE).val(value);
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

}, '@VERSION@' ,{requires:['aui-calendar','aui-overlay-context'], skinnable:true});
AUI.add('aui-datepicker-select', function(A) {
/**
 * The DatePickerSelect Utility
 *
 * @module aui-calendar
 * @submodule aui-calendar-datepicker-select
 */

var Lang = A.Lang,
	isArray = Lang.isArray,

	nodeSetter = function(v) {
		return A.one(v);
	},

	createSelect = function() {
		return A.Node.create(SELECT_TPL);
	},

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
	MONTH = 'month',
	MONTH_NODE = 'monthNode',
	MONTH_NODE_NAME = 'monthNodeName',
	NAME = 'name',
	OPTION = 'option',
	POPULATE_DAY = 'populateDay',
	POPULATE_MONTH = 'populateMonth',
	POPULATE_YEAR = 'populateYear',
	SELECT = 'select',
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

	getClassName = A.ClassNameManager.getClassName,

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
			 * <a href="Calendar.html">Calendar</a> configuration Object.</a>
			 *
			 * @attribute calendar
			 * @default {}
			 * @type Object
			 */
			calendar: {
				value: {}
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
			 * Bind the events on the DatePickerSelect UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;

				instance._bindSelectEvents();

				instance.after('calendar:select', instance._afterSelectDate);
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
			 * Fires when a date is selected on the Calendar.
			 *
			 * @method _afterSelectDate
			 * @param {Event} event
			 * @protected
			 */
			_afterSelectDate: function(event) {
				var instance = this;

				instance._syncSelectsUI();
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

				var mapping = {
					d: instance.get(DAY_NODE),
					m: instance.get(MONTH_NODE),
					y: instance.get(YEAR_NODE)
				};

				var firstField = mapping[ appendOrder[0] ];
				var secondField = mapping[ appendOrder[1] ];
				var thirdField = mapping[ appendOrder[2] ];

				var id = instance.get('id');

				firstField.setAttribute(DATA_COMPONENT_ID, id);
				secondField.setAttribute(DATA_COMPONENT_ID, id);
				thirdField.setAttribute(DATA_COMPONENT_ID, id);

				return [ firstField, secondField, thirdField ];
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
						document.createTextNode(SPACE)
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
				var instance = this;

				var trigger = instance.get(TRIGGER).item(0);
				var contentBox = instance.get(CONTENT_BOX);

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
			 * Bind events on each select element (change, keypress, etc).
			 *
			 * @method _bindSelectEvents
			 * @protected
			 */
			_bindSelectEvents: function() {
				var instance = this;
				var selects = instance.get(SELECT_WRAPPER_NODE).all(SELECT);

				selects.on('change', instance._onSelectChange, instance);
				selects.on('keypress', instance._onSelectChange, instance);
			},

			/**
			 * Sync the UI of each DOM Select element.
			 *
			 * @method _syncSelectsUI
			 * @protected
			 */
			_syncSelectsUI: function() {
				var instance = this;

				instance._selectCurrentDay();
				instance._selectCurrentMonth();
				instance._selectCurrentYear();
			},

			/**
			 * Select the current day on the respective input field.
			 *
			 * @method _selectCurrentDay
			 * @protected
			 */
			_selectCurrentDay: function() {
				var instance = this;
				var currentDate = instance.calendar.getCurrentDate();

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
			_selectCurrentMonth: function() {
				var instance = this;
				var currentDate = instance.calendar.getCurrentDate();

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
			_selectCurrentYear: function() {
				var instance = this;
				var currentDate = instance.calendar.getCurrentDate();

				instance.get(YEAR_NODE).val(
					String(currentDate.getFullYear())
				);
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

				var maxMonthDays = instance.calendar.getDaysInMonth(lastYear, lastMonth);

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
				var yearNode = instance.get(YEAR_NODE);

				if (instance.get(POPULATE_YEAR)) {
					instance._populateSelect(yearNode, yearRange[0], yearRange[1]);
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
				var monthNode = instance.get(MONTH_NODE);
				var localeMap = instance.calendar._getLocaleMap();
				var monthLabels = localeMap.B;

				if (instance.get(POPULATE_MONTH)) {
					instance._populateSelect(monthNode, 0, (monthLabels.length - 1), monthLabels);
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
				var dayNode = instance.get(DAY_NODE);
				var daysInMonth = instance.calendar.getDaysInMonth();

				if (instance.get(POPULATE_DAY)) {
					instance._populateSelect(dayNode, 1, daysInMonth);
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
			_populateSelect: function(select, fromIndex, toIndex, labels, values) {
				var i = 0;
				var index = fromIndex;

				select.empty();
				labels = labels || [];
				values = values || [];

				while (index <= toIndex) {
					var value = values[index] || index;
					var label = labels[index] || index;

					A.Node.getDOMNode(select).options[i] = new Option(label, index);

					i++;
					index++;
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
				var instance = this;
				var target = event.currentTarget || event.target;
				var monthChanged = target.test(DOT+CSS_DATEPICKER_MONTH);

				var currentDay = instance.get(DAY_NODE).val();
				var currentMonth = instance.get(MONTH_NODE).val();
				var currentYear = instance.get(YEAR_NODE).val();

				instance.calendar.set(CURRENT_DAY, currentDay);
				instance.calendar.set(CURRENT_MONTH, currentMonth);
				instance.calendar.set(CURRENT_YEAR, currentYear);

				if (monthChanged) {
					instance._uiSetCurrentMonth();
				}

				instance.calendar.selectCurrentDate();
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
				instance._selectCurrentDay();
			}
		}
	}
);

A.DatePickerSelect = DatePickerSelect;

}, '@VERSION@' ,{requires:['aui-datepicker-base','aui-button-item'], skinnable:true});


AUI.add('aui-datepicker', function(A){}, '@VERSION@' ,{use:['aui-datepicker-base','aui-datepicker-select'], skinnable:true});

