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
