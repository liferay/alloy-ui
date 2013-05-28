/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-base-view
 */

/**
 * A base class for SchedulerView.
 *
 * @class A.SchedulerView
 * @extends A.Component
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var SchedulerView = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property SchedulerView.NAME
	 * @type String
	 * @static
	 */
	NAME: SCHEDULER_VIEW,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property SchedulerView.AUGMENTS
	 * @type Array
	 * @static
	 */
	AUGMENTS: [A.WidgetStdMod],

	/**
	 * Static property used to define the default attribute
	 * configuration for the SchedulerView.
	 *
	 * @property SchedulerView.ATTRS
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
			value: _EMPTY_STR
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute filterFn
		 */
		filterFn: {
			validator: isFunction,
			value: function(evt) { return true; }
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute height
		 * @default 600
		 * @type Number
		 */
		height: {
			value: 600
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute isoTime
		 * @default false
		 * @type Boolean
		 */
		isoTime: {
			value: false,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute name
		 * @default ''
		 * @type String
		 */
		name: {
			value: _EMPTY_STR,
			validator: isString
		},

		/**
		 * The function to format the navigation header date.
		 *
		 * @attribute navigationDateFormatter
		 * @default %A - %d %b %Y
		 * @type Function
		 */
		navigationDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(date, {
					format: '%A, %d %B, %Y',
					locale: scheduler.get(LOCALE)
				});
			},
			validator: isFunction
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute nextDate
		 * @readOnly
		 */
		nextDate: {
			getter: 'getNextDate',
			readOnly: true
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute prevDate
		 * @readOnly
		 */
		prevDate: {
			getter: 'getPrevDate',
			readOnly: true
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute scheduler
		 */
		scheduler: {
			lazyAdd: false,
			setter: '_setScheduler'
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute scrollable
		 * @default true
		 * @type Boolean
		 */
		scrollable: {
			value: true,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute triggerNode
		 */
		triggerNode: {
			setter: A.one
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute visible
		 * @default false
		 * @type Boolean
		 */
		visible: {
			value: false
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property SchedulerView.BIND_UI_ATTRS
	 * @type Array
	 * @static
	 */
	BIND_UI_ATTRS: [SCROLLABLE],

	prototype: {

		/**
		 * Construction logic executed during SchedulerView instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
		initializer: function() {
			var instance = this;

			instance.after('render', instance._afterRender);
		},

		/**
		 * Sync the SchedulerView UI. Lifecycle.
		 *
		 * @method syncUI
		 * @protected
		 */
		syncUI: function() {
			var instance = this;

			instance.syncStdContent();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getAdjustedViewDate
		 * @param val
		 */
		getAdjustedViewDate: function(val) {
			var instance = this;

			return DateMath.toMidnight(val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method flushViewCache
		 */
		flushViewCache: function() {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getNextDate
		 */
		getNextDate: function() {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getPrevDate
		 */
		getPrevDate: function() {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getToday
		 */
		getToday: function() {
			return DateMath.clearTime(new Date());
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method limitDate
		 * @param date
		 * @param maxDate
		 */
		limitDate: function(date, maxDate) {
			var instance = this;

			if (DateMath.after(date, maxDate)) {
				date = DateMath.clone(maxDate);
			}

			return date;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method plotEvents
		 */
		plotEvents: function() {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method syncStdContent
		 */
		syncStdContent: function() {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method syncEventUI
		 * @param evt
		 */
		syncEventUI: function(evt) {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetDate
		 * @param val
		 * @protected
		 */
		_uiSetDate: function(val) {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterRender
		 * @param event
		 * @protected
		 */
		_afterRender: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			instance._uiSetScrollable(
				instance.get(SCROLLABLE)
			);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setScheduler
		 * @param val
		 * @protected
		 */
		_setScheduler: function(val) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			if (scheduler) {
				instance.removeTarget(scheduler);
			}

			if (val) {
				instance.addTarget(val);

				val.after(['*:add', '*:remove', '*:reset'], A.bind(instance.flushViewCache, instance));
			}

			return val;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetScrollable
		 * @param val
		 * @protected
		 */
		_uiSetScrollable: function(val) {
			var instance = this;
			var bodyNode = instance.bodyNode;

			if (bodyNode) {
				bodyNode.toggleClass(CSS_SCHEDULER_VIEW_SCROLLABLE, val);
				bodyNode.toggleClass(CSS_SCHEDULER_VIEW_NOSCROLL, !val);
			}
		}
	}
});

A.SchedulerView = SchedulerView;