AUI.add('aui-scheduler-base', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,
	isArray = Lang.isArray,
	isDate = Lang.isDate,
	isFunction = Lang.isFunction,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,

	isScheduler = function(val) {
		return (val instanceof A.Scheduler);
	},

	isSchedulerView = function(val) {
		return (val instanceof A.SchedulerView);
	},

	isSchedulerEvent = function(val) {
		return (val instanceof A.SchedulerEvent);
	},

	isSchedulerCalendar = function(val) {
		return (A.SchedulerCalendar && (val instanceof A.SchedulerCalendar));
	},

	DateMath = A.DataType.DateMath,
	WidgetStdMod = A.WidgetStdMod,

	DOT = '.',
	EMPTY_STR = '',
	SPACE = ' ',

	SCHEDULER_BASE = 'scheduler-base',
	DATA_VIEW_NAME = 'data-view-name',

	ACTIVE_VIEW = 'activeView',
	CLEARFIX = 'clearfix',
	CONTROLS = 'controls',
	CONTROLS_NODE = 'controlsNode',
	CURRENT = 'current',
	CURRENT_DATE = 'currentDate',
	CURRENT_DATE_NODE = 'currentDateNode',
	DATE = 'date',
	END_DATE = 'endDate',
	EVENT_CLASS = 'eventClass',
	EVENT_RECORDER = 'eventRecorder',
	EVENTS = 'events',
	HD = 'hd',
	HEADER = 'header',
	HEADER_NODE = 'headerNode',
	HELPER = 'helper',
	ICON = 'icon',
	ICON_NEXT_NODE = 'iconNextNode',
	ICON_PREV_NODE = 'iconPrevNode',
	LOCALE = 'locale',
	NAME = 'name',
	NAV = 'nav',
	NAV_NODE = 'navNode',
	NAVIGATION_DATE_FORMATTER = 'navigationDateFormatter',
	NEXT = 'next',
	NEXT_DATE = 'nextDate',
	PREV = 'prev',
	PREV_DATE = 'prevDate',
	RENDERED = 'rendered',
	SCHEDULER = 'scheduler',
	START_DATE = 'startDate',
	STRINGS = 'strings',
	TODAY = 'today',
	TODAY_NODE = 'todayNode',
	TRIGGER_NODE = 'triggerNode',
	VIEW = 'view',
	VIEW_STACK = 'viewStack',
	VIEWS = 'views',
	VIEWS_NODE = 'viewsNode',

	getCN = A.getClassName,

	CSS_HELPER_CLEARFIX = getCN(HELPER, CLEARFIX),
	CSS_ICON = getCN(ICON),
	CSS_SCHEDULER_CONTROLS = getCN(SCHEDULER_BASE, CONTROLS),
	CSS_SCHEDULER_CURRENT_DATE = getCN(SCHEDULER_BASE, CURRENT, DATE),
	CSS_SCHEDULER_HD = getCN(SCHEDULER_BASE, HD),
	CSS_SCHEDULER_ICON_NEXT = getCN(SCHEDULER_BASE, ICON, NEXT),
	CSS_SCHEDULER_ICON_PREV = getCN(SCHEDULER_BASE, ICON, PREV),
	CSS_SCHEDULER_NAV = getCN(SCHEDULER_BASE, NAV),
	CSS_SCHEDULER_TODAY = getCN(SCHEDULER_BASE, TODAY),
	CSS_SCHEDULER_VIEW = getCN(SCHEDULER_BASE, VIEW),
	CSS_SCHEDULER_VIEW_ = getCN(SCHEDULER_BASE, VIEW, EMPTY_STR),
	CSS_SCHEDULER_VIEWS = getCN(SCHEDULER_BASE, VIEWS),

	TPL_SCHEDULER_CONTROLS = '<div class="'+CSS_SCHEDULER_CONTROLS+'"></div>',
	TPL_SCHEDULER_CURRENT_DATE = '<div class="'+CSS_SCHEDULER_CURRENT_DATE+'"></div>',
	TPL_SCHEDULER_HD = '<div class="'+CSS_SCHEDULER_HD+'"></div>',
	TPL_SCHEDULER_ICON_NEXT = '<a href="#" class="'+[ CSS_ICON, CSS_SCHEDULER_ICON_NEXT ].join(SPACE)+'">Next</a>',
	TPL_SCHEDULER_ICON_PREV = '<a href="#" class="'+[ CSS_ICON, CSS_SCHEDULER_ICON_PREV ].join(SPACE)+'">Prev</a>',
	TPL_SCHEDULER_NAV = '<div class="'+CSS_SCHEDULER_NAV+'"></div>',
	TPL_SCHEDULER_TODAY = '<a href="#" class="'+CSS_SCHEDULER_TODAY+'">{today}</a>',
	TPL_SCHEDULER_VIEW = '<a href="#" class="'+[ CSS_SCHEDULER_VIEW, CSS_SCHEDULER_VIEW_ ].join(SPACE)+'{name}" data-view-name="{name}">{label}</a>',
	TPL_SCHEDULER_VIEWS = '<div class="'+CSS_SCHEDULER_VIEWS+'"></div>';

var SchedulerEventSupport = function() {};

SchedulerEventSupport.ATTRS = {
	eventClass: {
		valueFn: function() {
			return A.SchedulerEvent;
		}
	},

	events: {
		value: [],
		setter: '_setEvents',
		validator: isArray
	}
};

A.mix(SchedulerEventSupport.prototype, {
	addEvent: function(evt) {
		var instance = this;
		var events = instance.get(EVENTS);

		if (A.Array.indexOf(events, evt) > -1) {
			A.Array.removeItem(events, evt);
		}

		events.push(evt);
		instance.set(EVENTS, events);
	},

	addEvents: function(events) {
		var instance = this;

		A.Array.each(
			instance._normalizeEvents(events),
			A.bind(instance.addEvent, instance)
		);
	},

	eachEvent: function(fn) {
		var instance = this;
		var events = instance.get(EVENTS);

		A.Array.each(events, fn, instance);
	},

	removeEvent: function(evt) {
		var instance = this;
		var events = instance.get(EVENTS);

		if (events.length) {
			A.Array.removeItem(events, evt);

			instance.set(EVENTS, events);
		}
	},

	removeEvents: function(events) {
		var instance = this;

		A.Array.each(
			instance._normalizeEvents(events),
			A.bind(instance.removeEvent, instance)
		);
	},

	_normalizeEvents: function(events) {
		var instance = this;
		var output = [];

		events = A.Array(events);

		A.Array.each(events, function(evt) {
			if (isSchedulerEvent(evt)) {
				output.push(evt);
			}
			else if (isSchedulerCalendar(evt)) {
				if (isScheduler(instance)) {
					evt.set(SCHEDULER, instance);
				}

				// get events from the calendar
				output = output.concat(
					instance._normalizeEvents(evt.get(EVENTS))
				);
			}
			else {
				evt = new (instance.get(EVENT_CLASS))(evt);

				output.push(evt);
			}

			if (isScheduler(instance)) {
				evt.set(SCHEDULER, instance);
				evt.set(EVENT_CLASS, instance.get(EVENT_CLASS));
			}
		});

		return output;
	},

	_setEvents: function(val) {
		var instance = this;

		return instance._normalizeEvents(val);
	}
});

A.SchedulerEventSupport = SchedulerEventSupport;

var SchedulerBase = A.Component.create({
	NAME: SCHEDULER_BASE,

	ATTRS: {
		activeView: {
			validator: isSchedulerView
		},

		eventRecorder: {
			setter: '_setEventRecorder'
		},

		strings: {
			value: {
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

		currentDate: {
			valueFn: function() {
				return new Date();
			},
			validator: isDate
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

		currentDateNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_CURRENT_DATE);
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
		controlsNode: DOT+CSS_SCHEDULER_CONTROLS,
		currentDateNode: DOT+CSS_SCHEDULER_CURRENT_DATE,
		headerNode: DOT+CSS_SCHEDULER_HD,
		iconNextNode: DOT+CSS_SCHEDULER_ICON_NEXT,
		iconPrevNode: DOT+CSS_SCHEDULER_ICON_PREV,
		navNode: DOT+CSS_SCHEDULER_NAV,
		todayNode: DOT+CSS_SCHEDULER_TODAY,
		viewsNode: DOT+CSS_SCHEDULER_VIEWS
	},

	UI_ATTRS: [CURRENT_DATE],

	AUGMENTS: [A.SchedulerEventSupport, A.WidgetStdMod],

	prototype: {
		viewStack: null,

		initializer: function() {
			var instance = this;

			instance[VIEW_STACK] = {};

			instance[CONTROLS_NODE] = instance.get(CONTROLS_NODE);
			instance[CURRENT_DATE_NODE] = instance.get(CURRENT_DATE_NODE);
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

		flushEvents: function() {
			var instance = this;

			A.Array.each(instance.get(EVENTS), function(evt) {
				evt.eachRepeatedEvent(function(repeatedEvt) {
					delete repeatedEvt._filtered;
				});

				delete evt._filtered;
			});
		},

		getEventsByDay: function(date, includeOverlap) {
			var instance = this;

			date = DateMath.safeClearTime(date);

			return instance._getEvents(date, function(evt) {
				return DateMath.compare(evt.getClearStartDate(), date) ||
						(includeOverlap && DateMath.compare(evt.getClearEndDate(), date));
			});
		},

		getIntersectEvents: function(date) {
			var instance = this;

			date = DateMath.safeClearTime(date);

			return instance._getEvents(date, function(evt) {
				var startDate = evt.getClearStartDate();
				var endDate = evt.getClearEndDate();

				return (DateMath.compare(date, startDate) ||
						DateMath.compare(date, endDate) ||
						DateMath.between(date, startDate, endDate));
			});
		},

		sortEventsByDateAsc: function(events) {
			var instance = this;

			// sort events by start date and duration
			events.sort(function(evt1, evt2) {
				var endDate1 = evt1.get(END_DATE);
				var endDate2 = evt2.get(END_DATE);
				var startDate1 = evt1.get(START_DATE);
				var startDate2 = evt2.get(START_DATE);

				if (DateMath.after(startDate1, startDate2) ||
					(DateMath.compare(startDate1, startDate2) && DateMath.before(endDate1, endDate2))) {

					return 1;
				}
				else {
					return -1;
				}
			});
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
						instance.setStdModContent(WidgetStdMod.BODY, EMPTY_STR);
					}

					view.render(instance.bodyNode);
				}
			}
		},

		plotViewEvents: function(view) {
			var instance = this;

			view.plotEvents(
				instance.get(EVENTS)
			);
		},

		syncEventsUI: function() {
			var instance = this;

			instance.plotViewEvents(instance.get(ACTIVE_VIEW));
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
			}
		},

		_afterRender: function(event) {
			var instance = this;

			instance.renderView(
				instance.get(ACTIVE_VIEW)
			);
		},

		_bindDelegate: function() {
			var instance = this;

			instance[VIEWS_NODE].delegate('click', instance._onClickViewTrigger, DOT+CSS_SCHEDULER_VIEW, instance);
			instance[CONTROLS_NODE].delegate('click', instance._onClickPrevIcon, DOT+CSS_SCHEDULER_ICON_PREV, instance);
			instance[CONTROLS_NODE].delegate('click', instance._onClickNextIcon, DOT+CSS_SCHEDULER_ICON_NEXT, instance);
			instance[CONTROLS_NODE].delegate('click', instance._onClickToday, DOT+CSS_SCHEDULER_TODAY, instance);
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

		_getEvents: function(date, filterFn) {
			var instance = this;
			var events = instance.get(EVENTS);
			var results = [];

			A.Array.each(events, function(evt) {
				if (filterFn.apply(instance, [evt])) {
					results.push(evt);
				}
				else if (evt.isRepeatableDate(date)) {
					var repeatedEvt = evt.repeatByDate(date);

					results.push(repeatedEvt);
				}
			});

			instance.sortEventsByDateAsc(results);

			return results;
		},

		_onClickToday: function(event) {
			var instance = this;

			instance.set(
				CURRENT_DATE,
				instance.get(ACTIVE_VIEW).getToday()
			);

			event.preventDefault();
		},

		_onClickNextIcon: function(event) {
			var instance = this;

			instance.set(
				CURRENT_DATE,
				instance.get(ACTIVE_VIEW).get(NEXT_DATE)
			);

			event.preventDefault();
		},

		_onClickPrevIcon: function(event) {
			var instance = this;

			instance.set(
				CURRENT_DATE,
				instance.get(ACTIVE_VIEW).get(PREV_DATE)
			);

			event.preventDefault();
		},

		_onClickViewTrigger: function(event) {
			var instance = this;
			var viewName = event.currentTarget.attr(DATA_VIEW_NAME);

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
				val.set(SCHEDULER, instance);
				val.set(EVENT_CLASS, instance.get(EVENT_CLASS));
			}
		},

		_setViews: function(val) {
			var instance = this;
			var views = [];

			A.Array.each(val, function(view) {
				if (isSchedulerView(view) && !view.get(RENDERED)) {
					view.set(SCHEDULER, instance);
					view.set(EVENT_CLASS, instance.get(EVENT_CLASS));

					views.push(view);

					instance[VIEW_STACK][view.get(NAME)] = view;
				}
			});

			if (!instance.get(ACTIVE_VIEW)) {
				instance.set(ACTIVE_VIEW, val[0]);
			}

			return views;
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
			instance[CONTROLS_NODE].append(instance[CURRENT_DATE_NODE]);

			A.Array.each(views, function(view) {
				instance[VIEWS_NODE].append( instance._createViewTriggerNode(view) );
			});

			instance[HEADER].append(instance[CONTROLS_NODE]);
			instance[HEADER].append(instance[VIEWS_NODE]);
			instance[HEADER].addClass(CSS_HELPER_CLEARFIX);

			instance.setStdModContent(WidgetStdMod.HEADER, instance[HEADER].getDOM());
		},

		_uiSetCurrentDate: function(val) {
			var instance = this;

			var formatter = instance.get(NAVIGATION_DATE_FORMATTER);
			var navigationTitle = formatter.call(instance, val);

			if (instance.get(RENDERED)) {
				var activeView = instance.get(ACTIVE_VIEW);

				if (activeView) {
					activeView._uiSetCurrentDate(val);

					formatter = activeView.get(NAVIGATION_DATE_FORMATTER);
					navigationTitle = formatter.call(activeView, val);
				}

				instance[CURRENT_DATE_NODE].html(navigationTitle);

				instance.syncEventsUI();
			}
		}
	}
});

A.Scheduler = SchedulerBase;

}, '@VERSION@' ,{skinnable:true, requires:['aui-scheduler-view','datasource']});
