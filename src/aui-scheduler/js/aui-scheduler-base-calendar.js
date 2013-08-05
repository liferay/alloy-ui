/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-base-calendar
 */

/**
 * A base class for SchedulerCalendar.
 *
 * @class A.SchedulerCalendar
 * @extends A.ModelList
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var SchedulerCalendar = A.Base.create(SCHEDULER_CALENDAR, A.ModelList, [], {
	model: A.SchedulerEvent,

	/**
	 * Construction logic executed during SchedulerCalendar instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function() {
		var instance = this;

		instance.after('colorChange', instance._afterColorChange);
		instance.after('disabledChange', instance._afterDisabledChange);
		instance.after('visibleChange', instance._afterVisibleChange);
		instance.after([ 'add', 'remove', 'reset' ], instance._afterEventsChange);
		instance.on([ 'remove', 'reset' ], instance._onRemoveEvents);

		instance._uiSetEvents(
			instance.toArray()
		);

		instance._setModelsAttrs({
			color: instance.get(COLOR),
			disabled: instance.get(DISABLED),
			visible: instance.get(VISIBLE)
		});
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _afterColorChange
	 * @param event
	 * @protected
	 */
	_afterColorChange: function(event) {
		var instance = this;

		instance._setModelsAttrs({
			color: instance.get(COLOR)
		},
		{ silent: event.silent });
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _afterDisabledChange
	 * @param event
	 * @protected
	 */
	_afterDisabledChange: function(event) {
		var instance = this;

		instance._setModelsAttrs({
			disabled: instance.get(DISABLED)
		},
		{ silent: event.silent });
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _afterEventsChange
	 * @param event
	 * @protected
	 */
	_afterEventsChange: function(event) {
		var instance = this;

		instance._setModelsAttrs({
			color: instance.get(COLOR),
			disabled: instance.get(DISABLED),
			visible: instance.get(VISIBLE)
		}, { silent: true });

		instance._uiSetEvents(instance.toArray());
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _afterVisibleChange
	 * @param event
	 * @protected
	 */
	_afterVisibleChange: function(event) {
		var instance = this;

		instance._setModelsAttrs({
			visible: instance.get(VISIBLE)
		},
		{ silent: event.silent });
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _onRemoveEvents
	 * @param event
	 * @protected
	 */
	_onRemoveEvents: function(event) {
		var instance = this;
		var scheduler = instance.get(SCHEDULER);

		if (scheduler) {
			scheduler.removeEvents(instance);
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _setModelsAttrs
	 * @param attrMap
	 * @param options
	 * @protected
	 */
	_setModelsAttrs: function(attrMap, options) {
		var instance = this;

		instance.each(function(schedulerEvent) {
			schedulerEvent.setAttrs(attrMap, options);
		});
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _uiSetEvents
	 * @param val
	 * @protected
	 */
	_uiSetEvents: function(val) {
		var instance = this;
		var scheduler = instance.get(SCHEDULER);

		if (scheduler) {
			scheduler.addEvents(val);
			scheduler.syncEventsUI();
		}
	}
}, {

	/**
	 * Static property used to define the default attribute
	 * configuration for the SchedulerCalendar.
	 *
	 * @property SchedulerCalendar.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute color
		 * @type String
		 */
		color: {
			valueFn: function() {
				var instance = this;
				var palette = instance.get(PALETTE);
				var randomIndex = Math.ceil(Math.random() * palette.length) - 1;

				return palette[randomIndex];
			},
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute disabled
		 * @default false
		 * @type Boolean
		 */
		disabled: {
			value: false,
			validator: isBoolean
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute name
		 * @default '(no name)'
		 * @type String
		 */
		name: {
			value: '(no name)',
			validator: isString
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute palette
		 * @type Array
		 */
		palette: {
			value: ['#d96666', '#e67399', '#b373b3', '#8c66d9', '#668cb3', '#668cd9', '#59bfb3', '#65ad89', '#4cb052', '#8cbf40', '#bfbf4d', '#e0c240', '#f2a640', '#e6804d', '#be9494', '#a992a9', '#8997a5', '#94a2be', '#85aaa5', '#a7a77d', '#c4a883', '#c7561e', '#b5515d', '#c244ab', '#603f99', '#536ca6', '#3640ad', '#3c995b', '#5ca632', '#7ec225', '#a7b828', '#cf9911', '#d47f1e', '#b56414', '#914d14', '#ab2671', '#9643a5', '#4585a3', '#737373', '#41a587', '#d1bc36', '#ad2d2d'],
			validator: isArray
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute scheduler
		 */
		scheduler: {
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute visible
		 * @default true
		 * @type Boolean
		 */
		visible: {
			value: true,
			validator: isBoolean
		}
	}
});

A.SchedulerCalendar = SchedulerCalendar;