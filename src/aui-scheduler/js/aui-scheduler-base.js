A.SchedulerEvents = A.Base.create('scheduler-events', A.ModelList, [], {
	comparator: function(model) {
		var startDateTime = model.get(START_DATE),
			endDateTime = model.get(END_DATE);

		return startDateTime + 1/(endDateTime - startDateTime);
	},
	model: A.SchedulerEvent
}, {
	ATTRS: {
		scheduler: {}
	}
});

var SchedulerEventSupport = function() {};

SchedulerEventSupport.ATTRS = {};

A.mix(SchedulerEventSupport.prototype, {
	calendarModel: A.SchedulerCalendar,

	eventModel: A.SchedulerEvent,

	eventsModel: A.SchedulerEvents,

	initializer: function(config) {
		var instance = this;

		instance._events = new instance.eventsModel({
			after: {
				add: A.bind(instance._afterAddEvent, instance)
			},
			bubbleTargets: instance,
			scheduler: instance
		});

		instance.addEvents(config.items || config.events);
	},

	addEvents: function(models) {
		var instance = this,
			events = instance._toSchedulerEvents(models);

		return instance._events.add(events);
	},

	eachEvent: function(fn) {
		var instance = this;

		return instance._events.each(fn);
	},

	flushEvents: function() {
		var instance = this;

		instance._events.each(function(evt) {
			delete evt._filtered;
		});
	},

	getEventByClientId: function(clientId) {
		var instance = this;

		return instance._events.getByClientId(clientId);
	},

	getEvents: function(filterFn) {
		var instance = this,
			events = instance._events;

		// TODO: Check why the items are not being sorted on add
		events.sort({ silent: true });

		if (filterFn) {
			events = events.filter(filterFn);
		}
		else {
			events = events.toArray();
		}

		return events;
	},

	getEventsByDay: function(date, includeOverlap) {
		var instance = this;

		date = instance._safeClearUTCTime(date);

		return instance.getEvents(function(evt) {
			return DateMath.compare(evt.getClearStartDate(), date) ||
					(includeOverlap && DateMath.compare(evt.getClearEndDate(), date));
		});
	},

	getIntersectEvents: function(date) {
		var instance = this;

		date = instance._safeClearUTCTime(date);

		return instance.getEvents(function(evt) {
			var startDate = evt.getClearStartDate();
			var endDate = evt.getClearEndDate();

			return (evt.get(VISIBLE) &&
					(DateMath.compare(date, startDate) ||
					DateMath.compare(date, endDate) ||
					DateMath.between(date, startDate, endDate)));
		});
	},

	removeEvents: function(models) {
		var instance = this,
			events = instance._toSchedulerEvents(models);

		return instance._events.remove(events);
	},

	resetEvents: function(models) {
		var instance = this,
			events = instance._toSchedulerEvents(models);

		return instance._events.reset(events);
	},

	_afterAddEvent: function(event) {
		var instance = this;

		event.model.set(SCHEDULER, instance);
	},

	_clearUTCTime: function(date) {
		var instance = this;
		date.setHours(12, 0, 0, 0);
		date.setUTCHours(12, 0, 0, 0);
		return date;
	},

	_safeClearUTCTime: function(date) {
		var instance = this;
		return instance._clearUTCTime(DateMath.clone(date));
	},

	_toSchedulerEvents: function(values) {
		var instance = this,
			events = [];

		if (isModelList(values)) {
			events = values.toArray();
			values.set(SCHEDULER, instance);
		}
		else if (isArray(values)) {
			A.Array.each(values, function(value) {
				if (isModelList(value)) {
					events = events.concat(value.toArray());
					value.set(SCHEDULER, instance);
				}
				else {
					events.push(value);
				}
			});
		}
		else {
			events = values;
		}

		return events;
	}

});

A.SchedulerEventSupport = SchedulerEventSupport;

var SchedulerBase = A.Component.create({
	NAME: SCHEDULER_BASE,

	ATTRS: {
		activeView: {
			validator: isSchedulerView
		},

		date: {
			value: new Date(),
			validator: isDate
		},

		eventRecorder: {
			setter: '_setEventRecorder'
		},

		strings: {
			value: {
				agenda: 'Agenda',
				day: 'Day',
				month: 'Month',
				today: 'Today',
				week: 'Week',
				year: 'Year'
			}
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

				return A.DataType.Date.format(
					date,
					{
						format: '%B %d, %Y',
						locale: instance.get(LOCALE)
					}
				);
			},
			validator: isFunction
		},

		views: {
			setter: '_setViews',
			value: []
		},

		viewDate: {
			getter: '_getViewDate',
			readOnly: true
		},

		/**
		 * First day of the week: Sunday is 0, Monday is 1.
		 *
		 * @attribute firstDayOfWeek
		 * @default 0
		 * @type Number
		 */
		firstDayOfWeek: {
			value: 0,
			validator: isNumber
		},

		/*
		* HTML_PARSER attributes
		*/
		controlsNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_CONTROLS);
			}
		},

		viewDateNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEW_DATE);
			}
		},

		headerNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_HD);
			}
		},

		iconNextNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_ICON_NEXT);
			}
		},

		iconPrevNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_ICON_PREV);
			}
		},

		navNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_NAV);
			}
		},

		todayNode: {
			valueFn: function() {
				return A.Node.create(
					this._processTemplate(TPL_SCHEDULER_TODAY)
				);
			}
		},

		viewsNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEWS);
			}
		}
	},

	HTML_PARSER: {
		controlsNode: _DOT+CSS_SCHEDULER_CONTROLS,
		viewDateNode: _DOT+CSS_SCHEDULER_VIEW_DATE,
		headerNode: _DOT+CSS_SCHEDULER_HD,
		iconNextNode: _DOT+CSS_SCHEDULER_ICON_NEXT,
		iconPrevNode: _DOT+CSS_SCHEDULER_ICON_PREV,
		navNode: _DOT+CSS_SCHEDULER_NAV,
		todayNode: _DOT+CSS_SCHEDULER_TODAY,
		viewsNode: _DOT+CSS_SCHEDULER_VIEWS
	},

	UI_ATTRS: [DATE, ACTIVE_VIEW],

	AUGMENTS: [A.SchedulerEventSupport, A.WidgetStdMod],

	prototype: {
		viewStack: null,

		initializer: function() {
			var instance = this;

			instance[VIEW_STACK] = {};

			instance[CONTROLS_NODE] = instance.get(CONTROLS_NODE);
			instance[VIEW_DATE_NODE] = instance.get(VIEW_DATE_NODE);
			instance[HEADER] = instance.get(HEADER_NODE);
			instance[ICON_NEXT_NODE] = instance.get(ICON_NEXT_NODE);
			instance[ICON_PREV_NODE] = instance.get(ICON_PREV_NODE);
			instance[NAV_NODE] = instance.get(NAV_NODE);
			instance[TODAY_NODE] = instance.get(TODAY_NODE);
			instance[VIEWS_NODE] = instance.get(VIEWS_NODE);

			instance.after({
				activeViewChange: instance._afterActiveViewChange,
				render: instance._afterRender
			});
		},

		bindUI: function() {
			var instance = this;

			instance._bindDelegate();
		},

		syncUI: function() {
			var instance = this;

			instance.syncStdContent();
		},

		getViewByName: function(name) {
			var instance = this;

			return instance[VIEW_STACK][name];
		},

		getStrings: function() {
			var instance = this;

			return instance.get(STRINGS);
		},

		getString: function(key) {
			var instance = this;

			return instance.getStrings()[key];
		},

		renderView: function(view) {
			var instance = this;

			if (view) {
				view.show();

				if (!view.get(RENDERED)) {
					if (!instance.bodyNode) {
						instance.setStdModContent(WidgetStdMod.BODY, _EMPTY_STR);
					}

					view.render(instance.bodyNode);
				}
			}
		},

		plotViewEvents: function(view) {
			var instance = this;

			view.plotEvents(
				instance.getEvents()
			);
		},

		syncEventsUI: function() {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				instance.plotViewEvents(activeView);
			}
		},

		renderButtonGroup: function() {
			var instance = this;

			instance.buttonGroup = new A.ButtonGroup({
				srcNode: instance[VIEWS_NODE],
				type: RADIO,
				on: {
					selectionChange: A.bind(instance._onButtonGroupSelectionChange, instance)
				}
			}).render();
		},

		/**
		 * Sync SchedulerBase StdContent.
		 *
		 * @method syncStdContent
		 * @protected
		 */
		syncStdContent: function() {
			var instance = this;
			var views = instance.get(VIEWS);

			instance[NAV_NODE].append(instance[ICON_PREV_NODE]);
			instance[NAV_NODE].append(instance[ICON_NEXT_NODE]);

			instance[CONTROLS_NODE].append(instance[TODAY_NODE]);
			instance[CONTROLS_NODE].append(instance[NAV_NODE]);
			instance[CONTROLS_NODE].append(instance[VIEW_DATE_NODE]);

			A.Array.each(views, function(view) {
				instance[VIEWS_NODE].append( instance._createViewTriggerNode(view) );
			});

			instance[HEADER].append(instance[CONTROLS_NODE]);
			instance[HEADER].append(instance[VIEWS_NODE]);
			instance[HEADER].addClass(CSS_HELPER_CLEARFIX);

			instance.setStdModContent(WidgetStdMod.HEADER, instance[HEADER].getDOM());
		},


		_afterActiveViewChange: function(event) {
			var instance = this;

			if (instance.get(RENDERED)) {
				var activeView = event.newVal;
				var lastActiveView = event.prevVal;

				if (lastActiveView) {
					lastActiveView.hide();
				}

				instance.renderView(activeView);

				var eventRecorder = instance.get(EVENT_RECORDER);

				if (eventRecorder) {
					eventRecorder.hideOverlay();
				}

				instance._uiSetDate(instance.get(DATE));
			}
		},

		_afterRender: function(event) {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			instance.renderView(activeView);
			instance.renderButtonGroup();

			instance._uiSetDate(instance.get(DATE));
			instance._uiSetActiveView(activeView);
		},

		_bindDelegate: function() {
			var instance = this;

			instance[CONTROLS_NODE].delegate('click', instance._onClickPrevIcon, _DOT+CSS_SCHEDULER_ICON_PREV, instance);
			instance[CONTROLS_NODE].delegate('click', instance._onClickNextIcon, _DOT+CSS_SCHEDULER_ICON_NEXT, instance);
			instance[CONTROLS_NODE].delegate('click', instance._onClickToday, _DOT+CSS_SCHEDULER_TODAY, instance);
		},

		_createViewTriggerNode: function(view) {
			var instance = this;

			if (!view.get(TRIGGER_NODE)) {
				var name = view.get(NAME);

				view.set(
					TRIGGER_NODE,
					A.Node.create(
						Lang.sub(TPL_SCHEDULER_VIEW, {
							name: name,
							label: (instance.getString(name) || name)
						})
					)
				);
			}

			return view.get(TRIGGER_NODE);
		},

		_getViewDate: function() {
			var instance = this,
				date = instance.get(DATE),
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				date = activeView.getAdjustedViewDate(date);
			}

			return date;
		},

		_onClickToday: function(event) {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				instance.set(DATE, activeView.getToday());
			}

			event.preventDefault();
		},

		_onClickNextIcon: function(event) {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				instance.set(DATE, activeView.get(NEXT_DATE));
			}

			event.preventDefault();
		},

		_onClickPrevIcon: function(event) {
			var instance = this,
				activeView = instance.get(ACTIVE_VIEW);

			if (activeView) {
				instance.set(DATE, activeView.get(PREV_DATE));
			}

			event.preventDefault();
		},

		_onButtonGroupSelectionChange: function(event) {
			var instance = this,
				viewName = event.originEvent.target.attr(DATA_VIEW_NAME);

			instance.set(ACTIVE_VIEW, instance.getViewByName(viewName));

			event.preventDefault();
		},

		_processTemplate: function(tpl) {
			var instance = this;

			return Lang.sub(tpl, instance.getStrings());
		},

		_setEventRecorder: function(val) {
			var instance = this;

			if (val) {
				val.setAttrs({
					scheduler: instance
				},
				{ silent: true });

				val.addTarget(instance);
			}
		},

		_setViews: function(val) {
			var instance = this;
			var views = [];

			A.Array.each(val, function(view) {
				if (isSchedulerView(view) && !view.get(RENDERED)) {
					view.setAttrs({
						scheduler: instance
					});

					views.push(view);

					instance[VIEW_STACK][view.get(NAME)] = view;
				}
			});

			if (!instance.get(ACTIVE_VIEW)) {
				instance.set(ACTIVE_VIEW, val[0]);
			}

			return views;
		},

		_uiSetActiveView: function(val) {
			var instance = this;

			if (val) {
				var activeView = val.get(NAME),
					activeNav = instance[VIEWS_NODE].one(_DOT+CSS_SCHEDULER_VIEW_+activeView);

				if (activeNav) {
					instance[VIEWS_NODE].all(BUTTON).removeClass(CSS_SCHEDULER_VIEW_SELECTED);
					activeNav.addClass(CSS_SCHEDULER_VIEW_SELECTED);
				}
			}
		},

		_uiSetDate: function(val) {
			var instance = this;

			var formatter = instance.get(NAVIGATION_DATE_FORMATTER);
			var navigationTitle = formatter.call(instance, val);

			if (instance.get(RENDERED)) {
				var activeView = instance.get(ACTIVE_VIEW);

				if (activeView) {
					activeView._uiSetDate(val);

					formatter = activeView.get(NAVIGATION_DATE_FORMATTER);
					navigationTitle = formatter.call(activeView, val);
				}

				instance[VIEW_DATE_NODE].html(navigationTitle);

				instance.syncEventsUI();
			}
		}
	}
});

A.Scheduler = SchedulerBase;