AUI.add('date-picker-select', function(A) {

var L = A.Lang,
	isNumber = L.isNumber,

	nodeSetter = function(v) {
		return A.get(v);
	},

	createSelect = function() {
		return A.Node.create(SELECT_TPL);
	},

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
	DISPLAY = 'display',
	DISPLAY_BOUNDING_BOX = 'displayBoundingBox',
	DOT = '.',
	HELPER = 'helper',
	MONTH = 'month',
	MONTH_FIELD = 'monthField',
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

		trigger: {
			valueFn: function() {
				return A.Node.create(WRAPPER_BUTTON_TPL).cloneNode();
			}
		},

		visible: {
			value: false
		},

		yearRange: {
			value: 10,
			validator: isNumber
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
	selectByValue: function(select, value) {
		var instance = this;
		var options = select.all(OPTION);

		options.each(function(option, index) {
			var select = ( option.val() == value );

			option.attr( SELECTED, (select ? SELECTED : BLANK) );
		});
	},

	_getBaseName: function(prefix) {
		var instance = this;

		// converting first letter to uppercase
		prefix = prefix.replace(/^./, function(m) {
		    return m.toUpperCase();
		});

		return instance.get(BASE_NAME) + prefix;
	},

	_getAppendOrder: function() {
		var instance = this;
		var dateFormat = instance.get(DATE_FORMAT);
		var extractRegex = /%(\w)+\/%(\w)+?\/%(\w)+/;
		var match = dateFormat.toLowerCase().match(extractRegex) || [ null, 'm', 'd', 'y' ];

		var mapping = {
			d: instance.get(DAY_FIELD),
			m: instance.get(MONTH_FIELD),
			y: instance.get(YEAR_FIELD)
		};

		var firstField = mapping[match[1] ];
		var secondField = mapping[ match[2] ];
		var thirdField = mapping[ match[3] ];

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

		instance._buttonItem = new A.ToolItem(CALENDAR);
		instance._selectWrapper = A.Node.create(WRAPPER_SELECT_TPL);

		// setting name of the fields
		monthField.set(NAME, instance._getBaseName(MONTH));
		yearField.set(NAME, instance._getBaseName(YEAR));
		dayField.set(NAME, instance._getBaseName(DAY));

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
		var selectedValue = currentDate.getDate();

		instance.selectByValue(instance.get(DAY_FIELD), selectedValue);
	},

	_selectCurrentMonth: function() {
		var instance = this;
		var currentDate = instance.getCurrentDate();
		var selectedValue = currentDate.getMonth();

		instance.selectByValue(instance.get(MONTH_FIELD), selectedValue);
	},

	_selectCurrentYear: function() {
		var instance = this;
		var currentDate = instance.getCurrentDate();
		var selectedValue = currentDate.getFullYear();

		instance.selectByValue(instance.get(YEAR_FIELD), selectedValue);
	},

	_pupulateSelects: function() {
		var instance = this;

		instance._populateDays();
		instance._populateMonths();
		instance._populateYears();
	},

	_populateYears: function() {
		var instance = this;
		var now = new Date();
		var yearRange = instance.get(YEAR_RANGE);
		var yearField = instance.get(YEAR_FIELD);
		var year = now.getFullYear();

		if (instance.get(POPULATE_YEAR)) {
			instance._populateSelect(yearField, (year - yearRange), (year + yearRange));
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

}, '@VERSION', { requires: [ 'calendar', 'tool-item' ] });