var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isString = Lang.isString,

	isSchedulerEvent = function(val) {
		return (val instanceof A.SchedulerEvent);
	},

	COLOR = 'color',
	EVENTS = 'events',
	PALLETE = 'pallete',
	SCHEDULER = 'scheduler',
	SCHEDULER_CALENDAR = 'scheduler-calendar',
	VISIBLE = 'visible';

var SchedulerCalendar = A.Component.create({
	NAME: SCHEDULER_CALENDAR,

	ATTRS: {
		color: {
			valueFn: function() {
				var instance = this;
				var pallete = instance.get(PALLETE);
				var randomIndex = Math.ceil(Math.random() * pallete.length) - 1;

				return pallete[randomIndex];
			},
			validator: isString
		},

		name: {
			value: '(no name)',
			validator: isString
		},

		pallete: {
			value: ['#d96666', '#e67399', '#b373b3', '#8c66d9', '#668cb3', '#668cd9', '#59bfb3', '#65ad89', '#4cb052', '#8cbf40', '#bfbf4d', '#e0c240', '#f2a640', '#e6804d', '#be9494', '#a992a9', '#8997a5', '#94a2be', '#85aaa5', '#a7a77d', '#c4a883', '#c7561e', '#b5515d', '#c244ab', '#603f99', '#536ca6', '#3640ad', '#3c995b', '#5ca632', '#7ec225', '#a7b828', '#cf9911', '#d47f1e', '#b56414', '#914d14', '#ab2671', '#9643a5', '#4585a3', '#737373', '#41a587', '#d1bc36', '#ad2d2d'],
			validator: isArray
		},

		scheduler: {
			lazyAdd: false,
			setter: '_setScheduler'
		},

		visible: {
			value: true,
			validator: isBoolean
		}
	},

	EXTENDS: A.Base,

	AUGMENTS: A.SchedulerEventSupport,

	prototype: {
		initializer: function() {
			var instance = this;

			instance.after('colorChange', instance._afterColorChange);
			instance.on('eventsChange', instance._onEventsChange);
			instance.on('visibleChange', instance._onVisibleChange);

			instance._uiSetVisible(
				instance.get(VISIBLE)
			);

			instance._uiSetEvents(
				instance.get(EVENTS)
			);
		},

		syncEventsColor: function(events) {
			var instance = this;

			A.Array.each(events || instance.get(EVENTS), function(evt) {
				evt.set(COLOR, instance.get(COLOR));
			});
		},

		_afterColorChange: function(event) {
			var instance = this;

			instance.syncEventsColor(instance.get(EVENTS));
		},

		_onEventsChange: function(event) {
			var instance = this;

			instance._uiSetEvents(event.newVal);
		},

		_onVisibleChange: function(event) {
			var instance = this;

			instance._uiSetVisible(event.newVal);
		},

		_setScheduler: function(val) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			if (scheduler) {
				instance.removeTarget(scheduler);
			}

			instance.addTarget(val);

			return val;
		},

		_uiSetEvents: function(val) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			instance.syncEventsColor(val);

			if (scheduler) {
				scheduler.removeEvents(instance);
				scheduler.addEvents(val);
				scheduler.syncEventsUI();
			}
		},

		_uiSetVisible: function(val) {
			var instance = this;

			instance.eachEvent(function(evt) {
				evt.set(VISIBLE, val);
			});
		}
	}
});

A.SchedulerCalendar = SchedulerCalendar;