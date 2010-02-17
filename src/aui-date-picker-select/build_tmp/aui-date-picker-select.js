AUI.add('aui-date-picker-select', function(A) {
var L = A.Lang,
	isArray = L.isArray,

	nodeSetter = function(v) {
		return A.get(v);
	},

	createSelect = function() {
		return A.Node.create(SELECT_TPL);
	},

	APPEND_ORDER = 'appendOrder',
	BASE_NAME = 'baseName',
	BLANK = '',
	BODY = 'body',
	BUTTON = 'button',
	CALENDAR = 'calendar',
	CLEARFIX = 'clearfix',
	CURRENT_DAY = 'currentDay',
	CURRENT_MONTH = 'currentMonth',
	CURRENT_YEAR = 'currentYear',
	DATEPICKER = 'datepicker',
	DATE_FORMAT = 'dateFormat',
	DAY = 'day',
	DAY_FIELD = 'dayField',
	DAY_FIELD_NAME = 'dayFieldName',
	DISPLAY = 'display',
	DISPLAY_BOUNDING_BOX = 'displayBoundingBox',
	DOT = '.',
	HELPER = 'helper',
	MAX_DATE = 'maxDate',
	MIN_DATE = 'minDate',
	MONTH = 'month',
	MONTH_FIELD = 'monthField',
	MONTH_FIELD_NAME = 'monthFieldName',
	NAME = 'name',
	OPTION = 'option',
	POPULATE_DAY = 'populateDay',
	POPULATE_MONTH = 'populateMonth',
	POPULATE_YEAR = 'populateYear',
	SELECT = 'select',
	SELECTED = 'selected',
	TRIGGER = 'trigger',
	WRAPPER = 'wrapper',
	YEAR = 'year',
	YEAR_FIELD = 'yearField',
	YEAR_FIELD_NAME = 'yearFieldName',
	YEAR_RANGE = 'yearRange',

	getCN = A.ClassNameManager.getClassName,

	CSS_DATEPICKER = getCN(DATEPICKER),
	CSS_DATEPICKER_BUTTON_WRAPPER = getCN(DATEPICKER, BUTTON, WRAPPER),
	CSS_DATEPICKER_DAY = getCN(DATEPICKER, DAY),
	CSS_DATEPICKER_DISPLAY = getCN(DATEPICKER, DISPLAY),
	CSS_DATEPICKER_MONTH = getCN(DATEPICKER, MONTH),
	CSS_DATEPICKER_SELECT_WRAPPER = getCN(DATEPICKER, SELECT, WRAPPER),
	CSS_DATEPICKER_YEAR = getCN(DATEPICKER, YEAR),
	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),

	SELECT_TPL = '<select></select>',
	SELECT_OPTION_TPL = '<option></option>',
	DISPLAY_BOUNDING_BOX_TPL = '<div></div>',
	WRAPPER_BUTTON_TPL = '<div class="'+ CSS_DATEPICKER_BUTTON_WRAPPER +'"></div>',
	WRAPPER_SELECT_TPL = '<div class='+ CSS_DATEPICKER_SELECT_WRAPPER +'></div>';

function DatePickerSelect(config) {
	DatePickerSelect.superclass.constructor.apply(this, arguments);
}

A.mix(DatePickerSelect, {
	NAME: DATEPICKER,

	ATTRS: {
		appendOrder: {
			value: [ 'm', 'd', 'y' ],
			validator: isArray
		},

		baseName: {
			value: DATEPICKER
		},

		// displayBoundingBox is the boundingBox to the selects/button
		// the default boundingBox attribute refer to the Calendar Overlay
		displayBoundingBox: {
			value: null,
			setter: nodeSetter
		},

		dayField: {
			setter: nodeSetter,
			valueFn: createSelect
		},

		monthField: {
			setter: nodeSetter,
			valueFn: createSelect
		},

		yearField: {
			setter: nodeSetter,
			valueFn: createSelect
		},

		dayFieldName: {
			value: DAY
		},

		monthFieldName: {
			value: MONTH
		},

		yearFieldName: {
			value: YEAR
		},

		trigger: {
			valueFn: function() {
				return A.Node.create(WRAPPER_BUTTON_TPL).cloneNode();
			}
		},

		visible: {
			value: false
		},

		yearRange: {
			valueFn: function() {
				var year = new Date().getFullYear();

				return [ year - 10, year + 10 ]
			},
			validator: isArray
		},

		setValue: {
			value: false
		},

		populateDay: {
			value: true
		},

		populateMonth: {
			value: true
		},

		populateYear: {
			value: true
		}
	}
});

A.extend(DatePickerSelect, A.Calendar, {
	/*
	* Lifecycle
	*/
	renderUI: function() {
		var instance = this;

		DatePickerSelect.superclass.renderUI.apply(this, arguments);

		instance._renderElements();
		instance._renderTriggerButton();
	},

	bindUI: function() {
		var instance = this;

		DatePickerSelect.superclass.bindUI.apply(this, arguments);

		instance.after('datesChange', A.bind(instance._selectCurrentValues, instance));
		instance.after('currentMonthChange', A.bind(instance._afterSetCurrentMonth, instance));

		instance._bindSelectEvents();
	},

	syncUI: function() {
		var instance = this;

		DatePickerSelect.superclass.syncUI.apply(this, arguments);

		instance._pupulateSelects();
		instance._selectCurrentValues();
	},

	/*
	* Methods
	*/
	_getAppendOrder: function() {
		var instance = this;
		var appendOrder = instance.get(APPEND_ORDER);

		var mapping = {
			d: instance.get(DAY_FIELD),
			m: instance.get(MONTH_FIELD),
			y: instance.get(YEAR_FIELD)
		};

		var firstField = mapping[ appendOrder[0] ];
		var secondField = mapping[ appendOrder[1] ];
		var thirdField = mapping[ appendOrder[2] ];

		return [ firstField, secondField, thirdField ]
	},

	_renderElements: function() {
		var instance = this;
		var displayBoundingBox = instance.get(DISPLAY_BOUNDING_BOX);

		if (!displayBoundingBox) {
			displayBoundingBox = A.Node.create(DISPLAY_BOUNDING_BOX_TPL);

			instance.set(DISPLAY_BOUNDING_BOX, displayBoundingBox);

			A.get(BODY).append(displayBoundingBox);
		}

		var dayField = instance.get(DAY_FIELD);
		var monthField = instance.get(MONTH_FIELD);
		var yearField = instance.get(YEAR_FIELD);

		dayField.addClass(CSS_DATEPICKER_DAY);
		monthField.addClass(CSS_DATEPICKER_MONTH);
		yearField.addClass(CSS_DATEPICKER_YEAR);

		displayBoundingBox.addClass(CSS_DATEPICKER);
		displayBoundingBox.addClass(CSS_DATEPICKER_DISPLAY);
		displayBoundingBox.addClass(CSS_HELPER_CLEARFIX);

		instance._selectWrapper = A.Node.create(WRAPPER_SELECT_TPL);

		// setting name of the fields
		monthField.set(NAME, instance.get(MONTH_FIELD_NAME));
		yearField.set(NAME, instance.get(YEAR_FIELD_NAME));
		dayField.set(NAME, instance.get(DAY_FIELD_NAME));

		// append elements
		var orderedFields = instance._getAppendOrder();

		instance._selectWrapper.append(orderedFields[0]);
		instance._selectWrapper.append(orderedFields[1]);
		instance._selectWrapper.append(orderedFields[2]);

		displayBoundingBox.append( instance._selectWrapper );
	},

	_renderTriggerButton: function() {
		var instance = this;
		var trigger = instance.get(TRIGGER).item(0);
		var displayBoundingBox = instance.get(DISPLAY_BOUNDING_BOX);

		instance._buttonItem = new A.ToolItem(CALENDAR);

		displayBoundingBox.append(trigger);

		if ( trigger.test(DOT+CSS_DATEPICKER_BUTTON_WRAPPER) ) {
			// use ToolItem if the user doesn't specify a trigger
			instance._buttonItem.render(trigger);
		}
	},

	_bindSelectEvents: function() {
		var instance = this;
		var selects = instance._selectWrapper.all(SELECT);

		selects.on('change', A.bind(instance._onSelectChange, instance));
		selects.on('keypress', A.bind(instance._onSelectChange, instance));
	},

	_selectCurrentValues: function() {
		var instance = this;

		instance._selectCurrentDay();
		instance._selectCurrentMonth();
		instance._selectCurrentYear();
	},

	_selectCurrentDay: function() {
		var instance = this;
		var currentDate = instance.getCurrentDate();

		instance.get(DAY_FIELD).val( currentDate.getDate() );
	},

	_selectCurrentMonth: function() {
		var instance = this;
		var currentDate = instance.getCurrentDate();

		instance.get(MONTH_FIELD).val( currentDate.getMonth() );
	},

	_selectCurrentYear: function() {
		var instance = this;
		var currentDate = instance.getCurrentDate();

		instance.get(YEAR_FIELD).val( currentDate.getFullYear() );
	},

	_pupulateSelects: function() {
		var instance = this;

		instance._populateDays();
		instance._populateMonths();
		instance._populateYears();

		// restricting dates based on the selects values
		var monthOptions = instance.get(MONTH_FIELD).all(OPTION);
		var yearOptions = instance.get(YEAR_FIELD).all(OPTION);

		var mLength = monthOptions.size() - 1;
		var yLength = yearOptions.size() - 1;

		var firstMonth = monthOptions.item(0).val();
		var firstYear = yearOptions.item(0).val();
		var lastMonth = monthOptions.item(mLength).val();
		var lastYear = yearOptions.item(yLength).val();

		var maxMonthDays = instance.getDaysInMonth(lastYear, lastMonth);

		var minDate = new Date(firstYear, firstMonth, 1);
		var maxDate = new Date(lastYear, lastMonth, maxMonthDays);

		instance.set(MAX_DATE, maxDate);
		instance.set(MIN_DATE, minDate);
	},

	_populateYears: function() {
		var instance = this;
		var yearRange = instance.get(YEAR_RANGE);
		var yearField = instance.get(YEAR_FIELD);

		if (instance.get(POPULATE_YEAR)) {
			instance._populateSelect(yearField, yearRange[0], yearRange[1]);
		}
	},

	_populateMonths: function() {
		var instance = this;
		var monthField = instance.get(MONTH_FIELD);
		var localeMap = instance._getLocaleMap();
		var monthLabels = localeMap.B;

		if (instance.get(POPULATE_MONTH)) {
			instance._populateSelect(monthField, 0, (monthLabels.length - 1), monthLabels);
		}
	},

	_populateDays: function() {
		var instance = this;
		var dayField = instance.get(DAY_FIELD);
		var daysInMonth = instance.getDaysInMonth();

		if (instance.get(POPULATE_DAY)) {
			instance._populateSelect(dayField, 1, daysInMonth);
		}
	},

	_populateSelect: function(select, fromIndex, toIndex, labels, values) {
		var i = 0;
		var index = fromIndex;
		var instance = this;

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

	/*
	* Listeners
	*/
	_onSelectChange: function(event) {
		var instance = this;
		var target = event.currentTarget || event.target;
		var monthChanged = target.test(DOT+CSS_DATEPICKER_MONTH);

		var currentDay = instance.get(DAY_FIELD).val();
		var currentMonth = instance.get(MONTH_FIELD).val();
		var currentYear = instance.get(YEAR_FIELD).val();

		instance.set(CURRENT_DAY, currentDay);
		instance.set(CURRENT_MONTH, currentMonth);
		instance.set(CURRENT_YEAR, currentYear);

		if (monthChanged) {
			instance._afterSetCurrentMonth();
		}

		instance._selectDate();
	},

	_afterSetCurrentMonth: function(event) {
		var instance = this;

		instance._populateDays();
		instance._selectCurrentDay();
	}
});

A.DatePickerSelect = DatePickerSelect;

}, '@VERSION@' ,{requires:['aui-calendar','aui-tool-item'], skinnable:true});
