AUI.add('aui-scheduler-base', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,
	isObject = Lang.isObject,
	isArray = Lang.isArray,
	isDate = Lang.isDate,
	isNumber = Lang.isNumber,

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

	DASH = '-',
	DOT = '.',
	EMPTY_STR = '',
	SPACE = ' ',

	SCHEDULER_BASE = 'scheduler-base',
	DATA_VIEW_NAME = 'data-view-name',

	ACTIVE_VIEW = 'activeView',
	BOUNDING_BOX = 'boundingBox',
	CLEARFIX = 'clearfix',
	CONTROLS = 'controls',
	CONTROLS_NODE = 'controlsNode',
	CURRENT = 'current',
	CURRENT_DATE = 'currentDate',
	CURRENT_DATE_NODE = 'currentDateNode',
	DATE = 'date',
	DATE_FORMAT = 'dateFormat',
	DAY = 'day',
	END_DATE = 'endDate',
	EVENTS = 'events',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	HD = 'hd',
	HEADER_NODE = 'headerNode',
	HELPER = 'helper',
	ICON = 'icon',
	ICON_NEXT_NODE = 'iconNextNode',
	ICON_PREV_NODE = 'iconPrevNode',
	LOCALE = 'locale',
	MONTH = 'month',
	NAME = 'name',
	NAV = 'nav',
	NAV_NODE = 'navNode',
	NEXT = 'next',
	NEXT_DATE = 'nextDate',
	PREV = 'prev',
	PREV_DATE = 'prevDate',
	RENDERED = 'rendered',
	SCHEDULER = 'scheduler',
	SRC_NODE = 'srcNode',
	START_DATE = 'startDate',
	STRINGS = 'strings',
	TEMPLATE = 'template',
	TODAY = 'today',
	TODAY_NODE = 'todayNode',
	TRIGGER_NODE = 'triggerNode',
	VIEW = 'view',
	VIEWS = 'views',
	VIEWS_NODE = 'viewsNode',
	WEEK = 'week',
	YEAR = 'year',
	NAVIGATION_DATE_FORMAT = 'navigationDateFormat',
	EVENT_RECORDER = 'eventRecorder',

	getCN = A.ClassNameManager.getClassName,

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
	CSS_SCHEDULER_VIEWS = getCN(SCHEDULER_BASE, VIEWS),
	CSS_SCHEDULER_VIEW_ = getCN(SCHEDULER_BASE, VIEW, EMPTY_STR),
	CSS_SCHEDULER_VIEW_DAY = getCN(SCHEDULER_BASE, VIEW, DAY),
	CSS_SCHEDULER_VIEW_MONTH = getCN(SCHEDULER_BASE, VIEW, MONTH),
	CSS_SCHEDULER_VIEW_WEEK = getCN(SCHEDULER_BASE, VIEW, WEEK),
	CSS_SCHEDULER_VIEW_YEAR = getCN(SCHEDULER_BASE, VIEW, YEAR),

	CSS_SCHEDULER_VIEW_CONTENT_ = getCN(SCHEDULER, VIEW, EMPTY_STR),

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

		A.Array.removeItem(events, evt);

		instance.set(EVENTS, events);
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

		A.Array.each(events, function(evt, i) {
			if (isSchedulerEvent(evt)) {
				output.push(evt);
			}
			else if (isSchedulerCalendar(evt)) {
				// get events from the calendar
				output = output.concat(
					instance._normalizeEvents(evt.get(EVENTS))
				);
			}
			else {
				evt = new A.SchedulerEvent(evt);

				output.push(evt);
			}

			if (isScheduler(instance)) {
				evt.set(SCHEDULER, instance);
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
		 * The default date format string which can be overriden for
         * localization support. The format must be valid according to
         * <a href="DataType.Date.html">A.DataType.Date.format</a>.
		 *
		 * @attribute dateFormat
		 * @default %A - %d %b %Y
		 * @type String
		 */
		navigationDateFormat: {
			getter: function(val) {
				var instance = this;
				var activeView = instance.get(ACTIVE_VIEW);

				if (activeView) {
					return activeView.get(NAVIGATION_DATE_FORMAT);
				}

				return val;
			},
			value: '%A - %d %b %Y',
			validator: isString
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

			instance.viewStack = {};

			instance.controlsNode = instance.get(CONTROLS_NODE);
			instance.currentDateNode = instance.get(CURRENT_DATE_NODE);
			instance.iconNextNode = instance.get(ICON_NEXT_NODE);
			instance.iconPrevNode = instance.get(ICON_PREV_NODE);
			instance.navNode = instance.get(NAV_NODE);
			instance.schedulerHeaderNode = instance.get(HEADER_NODE);
			instance.todayNode = instance.get(TODAY_NODE);
			instance.viewsNode = instance.get(VIEWS_NODE);

			instance.after({
				render: instance._afterRender,
				activeViewChange: instance._afterActiveViewChange
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

			A.Array.each(instance.get(EVENTS), function(evt, i) {
				evt.eachRepeatedEvent(function(repeatedEvt, uid) {
					delete repeatedEvt._filtered;
				});

				delete evt._filtered;
			});
		},

		getEventsByDay: function(date) {
			var instance = this;

			date = DateMath.safeClearTime(date);

			return instance._getEvents(date, function(evt) {
				return DateMath.compare(evt.getClearStartDate(), date);
			});
		},

		getIntersectEvents: function(date) {
			var instance = this;

			date = DateMath.safeClearTime(date);

			return instance._getEvents(date, function(evt) {
				var startDate = evt.getClearStartDate();
				var endDate = evt.getClearEndDate();

				return (DateMath.compare(date, startDate) || DateMath.compare(date, endDate) || DateMath.between(date, startDate, endDate));
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

				if (DateMath.after(startDate1, startDate2) || DateMath.compare(startDate1, startDate2) && DateMath.before(endDate1, endDate2)) {
					return 1;
				}
				else {
					return -1;
				}
			});
		},

		getViewByName: function(name) {
			var instance = this;

			return instance.viewStack[name];
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
					var viewName = view.get(NAME);

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

			instance.viewsNode.delegate('click', instance._onClickViewTrigger, DOT+CSS_SCHEDULER_VIEW, instance);
			instance.controlsNode.delegate('click', instance._onClickPrevIcon, DOT+CSS_SCHEDULER_ICON_PREV, instance);
			instance.controlsNode.delegate('click', instance._onClickNextIcon, DOT+CSS_SCHEDULER_ICON_NEXT, instance);
			instance.controlsNode.delegate('click', instance._onClickToday, DOT+CSS_SCHEDULER_TODAY, instance);
		},

		_createViewTriggerNode: function(view) {
			var instance = this;

			if (!view.get(TRIGGER_NODE)) {
				var name = view.get(NAME);

				view.set(
					TRIGGER_NODE,
					A.Node.create(
						A.substitute(TPL_SCHEDULER_VIEW, {
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
			var evtsByDate = [];

			A.Array.each(events, function(evt, i) {
				if (filterFn.apply(instance, [evt])) {
					evtsByDate.push(evt);
				}
				else if (evt.isRepeatableDate(date)) {
					var repeatedEvt = evt.repeatByDate(date);

					evtsByDate.push(repeatedEvt);
				}
			});

			instance.sortEventsByDateAsc(evtsByDate);

			return evtsByDate;
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
			var currentTarget = event.currentTarget;
			var viewName = currentTarget.attr(DATA_VIEW_NAME);
			var view = instance.getViewByName(viewName);

			instance.set(ACTIVE_VIEW, view);

			event.preventDefault();
		},

		_processTemplate: function(tpl) {
			var instance = this;

			return A.substitute(tpl, instance.getStrings());
		},

		_setEventRecorder: function(val) {
			var instance = this;

			if (val) {
				val.set(SCHEDULER, instance);
			}
		},

		_setViews: function(val) {
			var instance = this;
			var views = [];

			A.Array.each(val, function(view) {
				if (isSchedulerView(view) && !view.get(RENDERED)) {
					view.set(SCHEDULER, instance);

					views.push(view);

					instance.viewStack[view.get(NAME)] = view;
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

			instance.navNode.append(instance.iconPrevNode);
			instance.navNode.append(instance.iconNextNode);

			instance.controlsNode.append(instance.todayNode);
			instance.controlsNode.append(instance.navNode);
			instance.controlsNode.append(instance.currentDateNode);

			A.Array.each(views, function(view) {
				instance.viewsNode.append( instance._createViewTriggerNode(view) );
			});

			instance.schedulerHeaderNode.append(instance.controlsNode);
			instance.schedulerHeaderNode.append(instance.viewsNode);

			instance.schedulerHeaderNode.addClass(CSS_HELPER_CLEARFIX);

			instance.setStdModContent(WidgetStdMod.HEADER, instance.schedulerHeaderNode.getDOM());
		},

		_uiSetCurrentDate: function(val) {
			var instance = this;
			var dateFormat = instance.get(NAVIGATION_DATE_FORMAT);
			var locale = instance.get(LOCALE);

			var formatted = A.DataType.Date.format(val, { format: dateFormat, locale: locale });

			instance.currentDateNode.html(formatted);

			if (instance.get(RENDERED)) {
				var activeView = instance.get(ACTIVE_VIEW);

				if (activeView) {
					activeView._uiSetCurrentDate(val);
				}

				instance.syncEventsUI();
			}

		}
	}
});

A.Scheduler = SchedulerBase;

}, '@VERSION@' ,{requires:['aui-scheduler-view','datasource'], skinnable:true});
