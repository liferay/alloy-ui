var SchedulerCalendar = A.Base.create(SCHEDULER_CALENDAR, A.ModelList, [], {
	model: A.SchedulerEvent,

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

		instance._uiSetColor(
			instance.get(COLOR)
		);

		instance._uiSetDisabled(
			instance.get(DISABLED)
		);

		instance._uiSetVisible(
			instance.get(VISIBLE)
		);
	},

	_afterColorChange: function(event) {
		var instance = this;

		instance._uiSetColor(event.newVal);
	},

	_afterDisabledChange: function(event) {
		var instance = this;

		instance._uiSetDisabled(event.newVal);
	},

	_afterEventsChange: function(event) {
		var instance = this;

		instance._uiSetEvents(instance.toArray());
	},

	_afterVisibleChange: function(event) {
		var instance = this;

		instance._uiSetVisible(event.newVal);
	},

	_onRemoveEvents: function(event) {
		var instance = this;
		var scheduler = instance.get(SCHEDULER);

		if (scheduler) {
			scheduler.removeEvents(instance);
		}
	},

	_propagateAttrs: function(attrMap, options) {
		var instance = this;

		instance.each(function(schedulerEvent) {
			schedulerEvent.setAttrs(attrMap, options);
		});
	},

	_uiSetColor: function(val) {
		var instance = this;

		instance._propagateAttrs({
			color: instance.get(COLOR)
		});
	},

	_uiSetDisabled: function(val) {
		var instance = this;

		instance._propagateAttrs({
			disabled: val
		});
	},

	_uiSetEvents: function(val) {
		var instance = this;
		var scheduler = instance.get(SCHEDULER);

		instance._propagateAttrs({
			color: instance.get(COLOR),
			disabled: instance.get(DISABLED),
			visible: instance.get(VISIBLE)
		}, { silent: true });

		if (scheduler) {
			scheduler.addEvents(val);
			scheduler.syncEventsUI();
		}
	},

	_uiSetVisible: function(val) {
		var instance = this;

		instance._propagateAttrs({
			visible: val
		});
	}
}, {
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

		disabled: {
			value: false,
			validator: isBoolean
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
		},

		visible: {
			value: true,
			validator: isBoolean
		}
	}
});

A.SchedulerCalendar = SchedulerCalendar;