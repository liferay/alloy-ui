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
AUI.add('aui-scheduler-view', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isFunction = Lang.isFunction,
	isNumber = Lang.isNumber,
	isObject = Lang.isObject,
	isString = Lang.isString,

	toNumber = function(v) {
		return parseFloat(v) || 0;
	},

	roundToNearestMultiple = function(n, multiple) {
		return Math.round(n/multiple)*multiple;
	},

	DateMath = A.DataType.DateMath,
	WidgetStdMod = A.WidgetStdMod,

	WEEK_LENGTH = DateMath.WEEK_LENGTH,

	SCHEDULER_VIEW = 'scheduler-view',
	SCHEDULER_VIEW_DAY = 'scheduler-view-day',
	SCHEDULER_VIEW_MONTH = 'scheduler-view-month',
	SCHEDULER_VIEW_TABLE = 'scheduler-view-table',
	SCHEDULER_VIEW_WEEK = 'scheduler-view-week',

	ACTIVE_COLUMN = 'activeColumn',
	ACTIVE_VIEW = 'activeView',
	ALL_DAY = 'allDay',
	BODY = 'body',
	BOUNDING_BOX = 'boundingBox',
	CANCEL = 'cancel',
	CLOSE = 'close',
	COL = 'col',
	COL_DAYS_NODE = 'colDaysNode',
	COL_HEADER_DAYS_NODE = 'colHeaderDaysNode',
	COLBLANK = 'colblank',
	COLDATA = 'coldata',
	COLDAY = 'colday',
	COLGRID = 'colgrid',
	COLSPAN = 'colspan',
	COLTIME = 'coltime',
	COLUMN_DATA = 'columnData',
	COLUMN_DAY_HEADER = 'columnDayHeader',
	COLUMN_SHIMS = 'columnShims',
	COLUMN_TABLE_GRID = 'columnTableGrid',
	COLUMN_TIME = 'columnTime',
	CONTAINER = 'container',
	CONTENT = 'content',
	CREATION_END_DATE = 'creationEndDate',
	CREATION_START_DATE = 'creationStartDate',
	CURRENT_DATE = 'currentDate',
	DATA = 'data',
	DAY = 'day',
	DAYS = 'days',
	DD = 'dd',
	DELEGATE = 'delegate',
	DELEGATE_CONFIG = 'delegateConfig',
	DISABLED = 'disabled',
	DISPLAY_DAYS_INTERVAL = 'displayDaysInterval',
	DISPLAY_ROWS = 'displayRows',
	DIV = 'div',
	DIVISION = 'division',
	DOTTED = 'dotted',
	DOWN = 'down',
	DRAG_NODE = 'dragNode',
	DRAGGING = 'dragging',
	DRAGGING_EVENT = 'draggingEvent',
	DURATION = 'duration',
	END_DATE = 'endDate',
	EVENT = 'event',
	EVENT_CLASS = 'eventClass',
	EVENT_PLACEHOLDER = 'eventPlaceholder',
	EVENT_RECORDER = 'eventRecorder',
	EVENT_WIDTH = 'eventWidth',
	EVENTS = 'events',
	EVENTS_OVERLAY = 'eventsOverlay',
	EVENTS_OVERLAY_NODE = 'eventsOverlayNode',
	FILTER_FN = 'filterFn',
	FIRST = 'first',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	FIXED_HEIGHT = 'fixedHeight',
	GRID = 'grid',
	GRID_CONTAINER = 'gridContainer',
	GRIP = 'grip',
	HD = 'hd',
	HEADER = 'header',
	HEADER_DATE_FORMATTER = 'headerDateFormatter',
	HEADER_TABLE_NODE = 'headerTableNode',
	HEADER_VIEW = 'headerView',
	HEADER_VIEW_CONFIG = 'headerViewConfig',
	HEADER_VIEW_LABEL_NODE = 'headerViewLabelNode',
	HEIGHT = 'height',
	HORIZONTAL = 'horizontal',
	HOST = 'host',
	HOUR_HEIGHT = 'hourHeight',
	ICON = 'icon',
	ICON = 'icon',
	ISO_TIME = 'isoTime',
	LABEL = 'label',
	LASSO = 'lasso',
	LEFT = 'left',
	LOCALE = 'locale',
	MARGIN_RIGHT = 'marginRight',
	MARKER = 'marker',
	MARKERCELL = 'markercell',
	MARKERCELLS_NODE = 'markercellsNode',
	MARKERS = 'markers',
	MARKERS_NODE = 'markersNode',
	MONTH = 'month',
	MONTH_CONTAINER_NODE = 'monthContainerNode',
	MONTH_ROW_CONTAINER = 'monthRowContainer',
	MONTH_ROWS = 'monthRows',
	MORE = 'more',
	MOUSEDOWN = 'mousedown',
	MOUSEMOVE = 'mousemove',
	MOUSEUP = 'mouseup',
	NEXT = 'next',
	NODE = 'node',
	NOMONTH = 'nomonth',
	NOSCROLL = 'noscroll',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OVERLAY = 'overlay',
	PAD = 'pad',
	PADDING_NODE = 'paddingNode',
	PARENT_EVENT = 'parentEvent',
	PARENT_NODE = 'parentNode',
	PROXY = 'proxy',
	PROXY_NODE = 'proxyNode',
	PX = 'px',
	REGION = 'region',
	RENDERED = 'rendered',
	REPEATED = 'repeated',
	RESIZER = 'resizer',
	RESIZER_NODE = 'resizerNode',
	RESIZING = 'resizing',
	RIGHT = 'right',
	ROW = 'row',
	ROWS_CONTAINER_NODE = 'rowsContainerNode',
	SAVE = 'save',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'scheduler-event',
	SCROLLABLE = 'scrollable',
	SHIM = 'shim',
	SHOW_MORE = 'showMore',
	START_DATE = 'startDate',
	START_XY = 'startXY',
	STRINGS = 'strings',
	TABLE = 'table',
	TABLE_GRID_NODE = 'tableGridNode',
	TABLE_NODE = 'tableNode',
	TABLE_ROW_CONTAINER = 'tableRowContainer',
	TABLE_ROWS = 'tableRows',
	TBODY = 'tbody',
	TD = 'td',
	TIME = 'time',
	TIMES_NODE = 'timesNode',
	TITLE = 'title',
	TL = 'tl',
	TODAY = 'today',
	TOP = 'top',
	TR = 'tr',
	VIEW = 'view',
	VISIBLE = 'visible',
	WEEK = 'week',
	WIDTH = 'width',

	DATA_COLNUMBER = 'data-colnumber',

	ANCHOR = 'a',
	COMMA = ',',
	DASH = '-',
	DOT = '.',
	EMPTY_STR = '',
	MDASH = '&mdash;',
	PERCENT = '%',
	SPACE = ' ',

	getCN = A.getClassName,

	CSS_SCHEDULER_VIEW_NOSCROLL = getCN(SCHEDULER_VIEW, NOSCROLL),
	CSS_SCHEDULER_VIEW_SCROLLABLE = getCN(SCHEDULER_VIEW, SCROLLABLE);

var SchedulerView = A.Component.create({
	NAME: SCHEDULER_VIEW,

	AUGMENTS: [A.WidgetStdMod],

	ATTRS: {
		bodyContent: {
			value: EMPTY_STR
		},

		eventClass: {
			valueFn: function() {
				return A.SchedulerEvent;
			}
		},

		filterFn: {
			validator: isFunction,
			value: function(evt) { return true; }
		},

		height: {
			value: 600
		},

		isoTime: {
			value: false,
			validator: isBoolean
		},

		name: {
			value: EMPTY_STR,
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

		nextDate: {
			getter: 'getNextDate',
			readOnly: true
		},

		prevDate: {
			getter: 'getPrevDate',
			readOnly: true
		},

		scheduler: {
			lazyAdd: false,
			setter: '_setScheduler'
		},

		scrollable: {
			value: true,
			validator: isBoolean
		},

		triggerNode: {
			setter: A.one
		},

		visible: {
			value: false
		}
	},

	BIND_UI_ATTRS: [SCROLLABLE],

	prototype: {
		initializer: function() {
			var instance = this;

			instance.after('render', instance._afterRender);
		},

		syncUI: function() {
			var instance = this;

			instance.syncStdContent();
		},

		adjustCurrentDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);

			scheduler.set(CURRENT_DATE, currentDate);
		},

		flushViewCache: function() {
		},

		getNextDate: function() {
		},

		getPrevDate: function() {
		},

		getToday: function() {
			return DateMath.clearTime(new Date());
		},

		limitDate: function(date, maxDate) {
			var instance = this;

			if (DateMath.after(date, maxDate)) {
				date = DateMath.clone(maxDate);
			}

			return date;
		},

		plotEvents: function() {
		},

		syncStdContent: function() {
		},

		syncEventUI: function(evt) {
		},

		_uiSetCurrentDate: function(val) {
		},

		_afterRender: function(event) {
			var instance = this;

			instance.adjustCurrentDate();

			instance._uiSetScrollable(
				instance.get(SCROLLABLE)
			);
		},

		_setScheduler: function(val) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			if (scheduler) {
				instance.removeTarget(scheduler);
			}

			if (val) {
				instance.addTarget(val);

				val.after('eventsChange', A.bind(instance.flushViewCache, instance));
			}

			return val;
		},

		_uiSetScrollable: function(val) {
			var instance = this;
			var bodyNode = instance.bodyNode;

			if (bodyNode) {
				bodyNode.toggleClass(CSS_SCHEDULER_VIEW_SCROLLABLE, val);
				bodyNode.toggleClass(CSS_SCHEDULER_VIEW_NOSCROLL, !val);
			}
		},

		_uiSetVisible: function(val) {
			var instance = this;

			SchedulerView.superclass._uiSetVisible.apply(this, arguments);

			if (val && instance.get(RENDERED)) {
				instance.adjustCurrentDate();
			}
		}
	}
});

A.SchedulerView = SchedulerView;
var sub = Lang.sub;

var getScrollbarWidth = A.cached(function () {
    var doc      = A.config.doc,
        testNode = doc.createElement('div'),
        body     = doc.getElementsByTagName('body')[0],
        // 0.1 because cached doesn't support falsy refetch values
        width    = 0.1;

    if (body) {
        testNode.style.cssText = "position:absolute;visibility:hidden;overflow:scroll;width:20px;";
        testNode.appendChild(doc.createElement('p')).style.height = '1px';
        body.insertBefore(testNode, body.firstChild);
        width = testNode.offsetWidth - testNode.clientWidth;

        body.removeChild(testNode);
    }

    return width;
}, null, 0.1);

var getNodeListHTMLParser = function(selector, sizeCondition) {
		return function(srcNode) {
			var nodes = srcNode.all(selector);
			return (nodes.size() >= sizeCondition) ? nodes : null;
		};
	},

	CSS_ICON = getCN(ICON),
	CSS_ICON_GRIP_DOTTED_HORIZONTAL = getCN(ICON, GRIP, DOTTED, HORIZONTAL),

	CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
	CSS_SCHEDULER_EVENT_DISABLED = getCN(SCHEDULER_EVENT, DISABLED),
	CSS_SCHEDULER_EVENT_PROXY = getCN(SCHEDULER_EVENT, PROXY),
	CSS_SCHEDULER_TODAY = getCN(SCHEDULER, TODAY),
	CSS_SCHEDULER_TODAY_HD = getCN(SCHEDULER, TODAY, HD),
	CSS_SCHEDULER_VIEW_DAY_COLDATA = getCN(SCHEDULER_VIEW, COLDATA),
	CSS_SCHEDULER_VIEW_DAY_COLGRID = getCN(SCHEDULER_VIEW, COLGRID),
	CSS_SCHEDULER_VIEW_DAY_GRID = getCN(SCHEDULER_VIEW, GRID),
	CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER = getCN(SCHEDULER_VIEW, GRID, CONTAINER),
	CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON = getCN(SCHEDULER_VIEW, DAY, RESIZER, ICON),
	CSS_SCHEDULER_VIEW_DAY_RESIZER = getCN(SCHEDULER_VIEW, DAY, RESIZER),
	CSS_SCHEDULER_VIEW_DAY_MARKER_DIVISION = getCN(SCHEDULER_VIEW, MARKER, DIVISION),
	CSS_SCHEDULER_VIEW_DAY_MARKERCELL = getCN(SCHEDULER_VIEW, MARKERCELL),
	CSS_SCHEDULER_VIEW_DAY_MARKERS = getCN(SCHEDULER_VIEW, MARKERS),
	CSS_SCHEDULER_VIEW_DAY_TABLE = getCN(SCHEDULER_VIEW, DAY, TABLE),

	CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE = getCN(SCHEDULER_VIEW, DAY, HEADER, TABLE),
	CSS_SCHEDULER_VIEW_DAY_HEADER_DAY = getCN(SCHEDULER_VIEW, DAY, HEADER, DAY),
	CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_PAD_RIGHT = getCN(SCHEDULER_VIEW, DAY, HEADER, DAY, PAD, RIGHT),
	CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST = getCN(SCHEDULER_VIEW, DAY, HEADER, DAY, FIRST),
	CSS_SCHEDULER_VIEW_DAY_HEADER_COL = getCN(SCHEDULER_VIEW, DAY, HEADER, COL),
	CSS_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL = getCN(SCHEDULER_VIEW, DAY, HEADER, VIEW, LABEL),

	CSS_SCHEDULER_VIEW_DAY_TABLE_COL = getCN(SCHEDULER_VIEW, DAY, TABLE, COL),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM = getCN(SCHEDULER_VIEW, DAY, TABLE, COL, SHIM),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COLBLANK = getCN(SCHEDULER_VIEW, DAY, TABLE, COLBLANK),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY = getCN(SCHEDULER_VIEW, DAY, TABLE, COLDAY),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME = getCN(SCHEDULER_VIEW, DAY, TABLE, COLTIME),
	CSS_SCHEDULER_VIEW_DAY_TABLE_TIME = getCN(SCHEDULER_VIEW, DAY, TABLE, TIME),

	TPL_SCHEDULER_VIEW_DAY_RESIZER = '<div class="' + CSS_SCHEDULER_VIEW_DAY_RESIZER + '">' +
										'<div class="' + [CSS_ICON, CSS_ICON_GRIP_DOTTED_HORIZONTAL, CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON].join(SPACE) + '"></div>' +
									'</div>',

	TPL_SCHEDULER_VIEW_DAY_MARKERCELL = '<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKERCELL + '">' +
											'<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKER_DIVISION + '"></div>' +
										'</div>',

	TPL_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL = '<span class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL + '">{label}</span>',

	TPL_SCHEDULER_VIEW_DAY_TABLE = '<table cellspacing="0" cellpadding="0" class="' + CSS_SCHEDULER_VIEW_DAY_TABLE + '">' +
										'<tbody>' +
											'<tr class="' + CSS_SCHEDULER_VIEW_DAY_COLGRID + '" height="1">' +
												'<td height="0" class="' + [ CSS_SCHEDULER_VIEW_DAY_TABLE_COL, CSS_SCHEDULER_VIEW_DAY_TABLE_COLBLANK ].join(SPACE) + '"></td>' +
												'<td class="' + CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER + '" colspan="1">' +
													'<div class="' + CSS_SCHEDULER_VIEW_DAY_GRID + '">' +
														'<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKERS + '"></div>' +
													'</div>' +
												'</td>' +
											'</tr>' +
											'<tr class="' + CSS_SCHEDULER_VIEW_DAY_COLDATA + '">' +
												'<td class="' + [ CSS_SCHEDULER_VIEW_DAY_TABLE_COL, CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME ].join(SPACE) + '"></td>' +
											'</tr>' +
										'</tbody>' +
									'</table>',

	TPL_SCHEDULER_VIEW_DAY_TABLE_COLDAY = '<td class="' + [ CSS_SCHEDULER_VIEW_DAY_TABLE_COL, CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY ].join(SPACE) + '" data-colnumber="{colNumber}">' +
												'<div class="' + CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM + '"></div>' +
											'</td>',

	TPL_SCHEDULER_VIEW_DAY_TABLE_TIME = '<div class="' + CSS_SCHEDULER_VIEW_DAY_TABLE_TIME + '">{hour}</div>',

	TPL_SCHEDULER_VIEW_DAY_HEADER_TABLE = '<table cellspacing="0" cellpadding="0" class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE + '">' +
											'<tbody>' +
												'<tr class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_COL + '"></tr>' +
											'</tbody>' +
										'</table>',

	TPL_SCHEDULER_VIEW_DAY_HEADER_DAY = '<th class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_DAY + '" data-colnumber="{colNumber}"><a href="#">&nbsp;</a></th>',
	TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST = '<td class="' + [ CSS_SCHEDULER_VIEW_DAY_HEADER_DAY, CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST ].join(SPACE) + '"></td>',
	TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_PAD_RIGHT = '<th class="' + [ CSS_SCHEDULER_VIEW_DAY_HEADER_DAY, CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_PAD_RIGHT ].join(SPACE) + '">&nbsp;</th>';

var SchedulerDayView = A.Component.create({
	NAME: SCHEDULER_VIEW_DAY,

	ATTRS: {
		bodyContent: {
			value: EMPTY_STR
		},

		days: {
			value: 1,
			validator: isNumber
		},

		delegateConfig: {
			value: {},
			setter: function(val) {
				var instance = this;

				return A.merge(
					{
						dragConfig: {
							useShim: false
						},
						bubbleTargets: instance,
						container: instance.get(BOUNDING_BOX),
						nodes: DOT+CSS_SCHEDULER_EVENT,
						invalid: 'input, select, button, a, textarea, ' + DOT+CSS_SCHEDULER_EVENT_DISABLED
					},
					val || {}
				);
			},
			validator: isObject
		},

		eventWidth: {
			value: 95,
			validator: isNumber
		},

		filterFn: {
			value: function(evt) {
				return (evt.getHoursDuration() <= 24 && !evt.get(ALL_DAY));
			}
		},

		headerDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(
					date,
					{
						format: '%a %m/%d',
						locale: scheduler.get(LOCALE)
					}
				);
			},
			validator: isString
		},

		headerView: {
			value: true,
			validator: isBoolean
		},

		headerViewConfig: {
			setter: function(val) {
				var instance = this;

				return A.merge(
					{
						displayDaysInterval: 1,
						displayRows: 6,
						filterFn: function(evt) {
							return ((evt.getHoursDuration() > 24) || evt.get(ALL_DAY));
						},
						height: 'auto',
						visible: true
					},
					val || {}
				);
			},
			value: {}
		},

		hourHeight: {
			value: 52,
			validator: isNumber
		},

		name: {
			value: DAY
		},

		navigationDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(
					date,
					{
						format: '%A, %b %d, %Y',
						locale: scheduler.get(LOCALE)
					}
				);
			},
			validator: isFunction
		},

		strings: {
			value: {
				allDay: 'All day'
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		headerTableNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEW_DAY_HEADER_TABLE);
			}
		},

		headerViewLabelNode: {
			valueFn: function() {
				var instance = this;

				var strings = instance.get(STRINGS);

				return A.Node.create(
					sub(TPL_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL, {
						label: strings[ALL_DAY]
					})
				);
			}
		},

		resizerNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEW_DAY_RESIZER);
			}
		},

		tableNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEW_DAY_TABLE);
			}
		},

		colDaysNode: {
			valueFn: '_valueColDaysNode'
		},

		colHeaderDaysNode: {
			valueFn: '_valueColHeaderDaysNode'
		},

		markercellsNode: {
			valueFn: '_valueMarkercellsNode'
		},

		timesNode: {
			valueFn: '_valueTimesNode'
		}
	},

	HTML_PARSER: {
		colDaysNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY, 1),
		colHeaderDaysNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_DAY, 2),
		headerTableNode: DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE,
		headerViewLabelNode: DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL,
		markercellsNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_MARKERCELL, 24),
		resizerNode: DOT+CSS_SCHEDULER_VIEW_DAY_RESIZER,
		tableNode: DOT+CSS_SCHEDULER_VIEW_DAY_TABLE,
		timesNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_TIME, 24)
	},

	EXTENDS: A.SchedulerView,

	prototype: {
		initializer: function() {
			var instance = this;

			instance[COL_DAYS_NODE] = instance.get(COL_DAYS_NODE);
			instance[COL_HEADER_DAYS_NODE] = instance.get(COL_HEADER_DAYS_NODE);
			instance[HEADER_TABLE_NODE] = instance.get(HEADER_TABLE_NODE);
			instance[MARKERCELLS_NODE] = instance.get(MARKERCELLS_NODE);
			instance[RESIZER_NODE] = instance.get(RESIZER_NODE);
			instance[TABLE_NODE] = instance.get(TABLE_NODE);
			instance[TIMES_NODE] = instance.get(TIMES_NODE);

			instance[ACTIVE_COLUMN] = null;
			instance[COLUMN_DATA] = instance[TABLE_NODE].one(DOT+CSS_SCHEDULER_VIEW_DAY_COLDATA);
			instance[COLUMN_DAY_HEADER] = instance.headerTableNode.one(DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_COL);
			instance[COLUMN_SHIMS] = instance[COL_DAYS_NODE].all(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM);
			instance[COLUMN_TIME] = instance[TABLE_NODE].one(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME);
			instance[GRID_CONTAINER] = instance[TABLE_NODE].one(DOT+CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER);
			instance[MARKERS_NODE] = instance[TABLE_NODE].one(DOT+CSS_SCHEDULER_VIEW_DAY_MARKERS);

			if (instance.get(HEADER_VIEW)) {
				instance[HEADER_VIEW] = new A.SchedulerTableView(
					instance.get(HEADER_VIEW_CONFIG)
				);
			}
		},

		renderUI: function() {
			var instance = this;

			instance[COLUMN_TIME].setContent(instance[TIMES_NODE]);
			instance[MARKERS_NODE].setContent(instance[MARKERCELLS_NODE]);
			instance[COL_DAYS_NODE].appendTo(instance[COLUMN_DATA]);
			instance[COL_HEADER_DAYS_NODE].appendTo(instance[COLUMN_DAY_HEADER]);

			if (instance[HEADER_VIEW]) {
				instance[HEADER_VIEW].set(SCHEDULER, instance.get(SCHEDULER));

				instance[HEADER_VIEW].render();
			}
		},

		bindUI: function() {
			var instance = this;

			instance[HEADER_TABLE_NODE].delegate('click', A.bind(instance._onClickDaysHeader, instance), DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_DAY);
			instance[COLUMN_DATA].delegate('mousedown', A.bind(instance._onMouseDownTableCol, instance), DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL);
			instance[COLUMN_DATA].delegate('mouseenter', A.bind(instance._onMouseEnterEvent, instance), DOT+CSS_SCHEDULER_EVENT);
			instance[COLUMN_DATA].delegate('mouseleave', A.bind(instance._onMouseLeaveEvent, instance), DOT+CSS_SCHEDULER_EVENT);
			instance[COLUMN_DATA].delegate('mousemove', A.bind(instance._onMouseMoveTableCol, instance), DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY);
			instance[COLUMN_DATA].delegate('mouseup', A.bind(instance._onMouseUpTableCol, instance), DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL);

			instance.on('drag:end', instance._onEventDragEnd);
			instance.on('drag:start', instance._onEventDragStart);
			instance.on('drag:tickAlignY', instance._dragTickAlignY);
			instance.on('schedulerChange', instance._onSchedulerChange);
			instance.after('drag:align', instance._afterDragAlign);
		},

		syncUI: function() {
			var instance = this;

			SchedulerDayView.superclass.syncUI.apply(this, arguments);

			instance[GRID_CONTAINER].attr(COLSPAN, instance.get(DAYS));

			instance._setupDragDrop();
		},

		syncStdContent: function() {
			var instance = this;

			instance.setStdModContent(
				WidgetStdMod.BODY, instance[TABLE_NODE].getDOM());

			var headerNodes = A.NodeList.create(instance[HEADER_TABLE_NODE]);

			if (instance[HEADER_VIEW]) {
				headerNodes.push(instance[HEADER_VIEW].get(BOUNDING_BOX));
				headerNodes.push(instance.get(HEADER_VIEW_LABEL_NODE));
			}

			instance.setStdModContent(WidgetStdMod.HEADER, headerNodes);
		},

		calculateEventHeight: function(duration) {
			var instance = this;
			var hourHeight = instance.get(HOUR_HEIGHT);

			return Math.max(duration*(hourHeight/60), hourHeight/2);
		},

		calculateTop: function(date) {
			var instance = this;

			return ((date.getHours()*60) + date.getMinutes() +
					(date.getSeconds()/60)) * (instance.get(HOUR_HEIGHT)/60);
		},

		getNextDate: function() {
			var instance = this;
			var currentDate = instance.get(SCHEDULER).get(CURRENT_DATE);

			return DateMath.add(currentDate, DateMath.DAY, 1);
		},

		getPrevDate: function() {
			var instance = this;
			var currentDate = instance.get(SCHEDULER).get(CURRENT_DATE);

			return DateMath.subtract(currentDate, DateMath.DAY, 1);
		},

		getColumnByDate: function(date) {
			var instance = this;

			return instance[COL_DAYS_NODE].item(instance.getDateDaysOffset(date));
		},

		getColumnShimByDate: function(date) {
			var instance = this;

			return instance[COLUMN_SHIMS].item(instance.getDateDaysOffset(date));
		},

		getDateByColumn: function(colNumber) {
			var instance = this;
			var currentDate = DateMath.safeClearTime(
				instance.get(SCHEDULER).get(CURRENT_DATE));

			return DateMath.add(currentDate, DateMath.DAY, colNumber);
		},

		getDateDaysOffset: function(date) {
			var instance = this;

			var currentDate = DateMath.safeClearTime(
				instance.get(SCHEDULER).get(CURRENT_DATE));

			return DateMath.getDayOffset(
				DateMath.safeClearTime(date), currentDate);
		},

		getYCoordTime: function(top) {
			var instance = this;
			var hourHeight = instance.get(HOUR_HEIGHT);
			var prop = toNumber((top/hourHeight).toFixed(2));

			// Isolate the decimals and convert to minutes: (prop*100)%100*0.6.
			var minutes = Math.floor((prop*100)%100*0.6);
			var hours = Math.floor(prop);

			return [ hours, minutes, 0 ];
		},

		plotEvent: function(evt) {
			var instance = this;

			var nodeList = evt.get(NODE);

			if (nodeList.size() < 2) {
				evt.addPaddingNode();
			}

			var node = evt.get(NODE).item(0);
			var paddingNode = evt.get(NODE).item(1);
			var endShim = instance.getColumnShimByDate(evt.get(END_DATE));
			var startShim = instance.getColumnShimByDate(evt.get(START_DATE));

			if (startShim) {
				startShim.append(node);

				if (evt.get(VISIBLE)) {
					node.show();
				}
			}
			else {
				node.hide();
			}

			if (endShim) {
				if (endShim.compareTo(startShim) || evt.isDayBoundaryEvent()) {
					paddingNode.hide();
				}
				else {
					endShim.append(paddingNode);

					if (evt.get(VISIBLE)) {
						paddingNode.show();
					}
				}
			}
			else {
				paddingNode.hide();
			}

			evt.syncNodeUI();

			instance.syncEventTopUI(evt);
			instance.syncEventHeightUI(evt);
		},

		plotEvents: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var filterFn = instance.get(FILTER_FN);

			instance[COLUMN_SHIMS].each(function(colShimNode, i) {
				var columnEvents = scheduler.getEventsByDay(instance.getDateByColumn(i), true);
				var plottedEvents = [];

				colShimNode.empty();

				A.Array.each(columnEvents, function(evt) {
					if (filterFn.apply(instance, [evt])) {
						instance.plotEvent(evt);

						plottedEvents.push(evt);
					}
				});

				instance.syncEventsIntersectionUI(plottedEvents);
			});

			if (instance.get(HEADER_VIEW)) {
				instance.syncHeaderViewUI();
			}
		},

		syncColumnsUI: function() {
			var instance = this;

			instance[COL_DAYS_NODE].each(function(columnNode, i) {
				var columnDate = instance.getDateByColumn(i);

				columnNode.toggleClass(
					CSS_SCHEDULER_TODAY, DateMath.isToday(columnDate));
			});
		},

		syncDaysHeaderUI: function() {
			var instance = this;
			var currentDate = instance.get(SCHEDULER).get(CURRENT_DATE);
			var formatter = instance.get(HEADER_DATE_FORMATTER);
			var locale = instance.get(LOCALE);

			instance[COL_HEADER_DAYS_NODE].all(ANCHOR).each(
				function(columnNode, i) {
					var columnDate = DateMath.add(currentDate, DateMath.DAY, i);

					columnNode.toggleClass(
						CSS_SCHEDULER_TODAY_HD, DateMath.isToday(columnDate));

					columnNode.html(formatter.call(instance, columnDate));
				}
			);
		},

		// TODO
		syncEventsIntersectionUI: function(columnEvents) {
			var instance = this;
			var eventWidth = instance.get(EVENT_WIDTH);

			instance.get(SCHEDULER).flushEvents();

			A.Array.each(columnEvents, function(colEvt) {
				var intercessors = instance.findEventIntersections(
					colEvt, columnEvents);

				var total = intercessors.length;
				var distributionRate = (eventWidth/total);

				A.Array.each(intercessors, function(evt, j) {
					var evtNode = evt.get(NODE).item(0);
					var left = distributionRate*j;
					var width = distributionRate*1.7;

					if (j === (total - 1)) {
						width = eventWidth - left;
					}

					evtNode.setStyle(WIDTH, width+PERCENT);
					evtNode.setStyle(LEFT, left+PERCENT);

					var evtParentNode = evtNode.get(PARENT_NODE);

					if (evtParentNode) {
						evtParentNode.insert(evtNode, j);
					}

					evt._filtered = true;
				});
			});
		},

		syncEventHeightUI: function(evt) {
			var instance = this;
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			var maxVisibleDate = DateMath.clone(startDate);
			maxVisibleDate.setHours(24, 0, 0);

			var minutesOffset = DateMath.getMinutesOffset(
				instance.limitDate(endDate, maxVisibleDate), startDate);

			evt.get(NODE).item(0).set(OFFSET_HEIGHT, instance.calculateEventHeight(minutesOffset));

			var paddingNode = evt.get(NODE).item(1);

			if (paddingNode.inDoc()) {
				var paddingMinutesOffset = DateMath.getMinutesOffset(
					endDate, DateMath.toMidnight(evt.getClearEndDate()));

				paddingNode.set(OFFSET_HEIGHT, instance.calculateEventHeight(paddingMinutesOffset));
			}
		},

		syncEventTopUI: function(evt) {
			var instance = this;

			evt.get(NODE).item(0).setStyle(TOP,
				instance.calculateTop(evt.get(START_DATE)) + PX);
			evt.get(NODE).item(1).setStyle(TOP, 0);
		},

		syncHeaderViewUI: function() {
			var instance = this;

			if (instance.get(HEADER_VIEW)) {
				var headerView = instance[HEADER_VIEW];

				headerView.plotEvents();

				var headerViewBB = headerView.get(BOUNDING_BOX);

				headerViewBB.setStyle(MARGIN_RIGHT, getScrollbarWidth());

				var headerViewData = headerViewBB.one(DOT+CSS_SVT_TABLE_DATA);
				var height = Math.max(headerViewData.get(OFFSET_HEIGHT), 40);

				headerView.set(HEIGHT, height);

				instance._fillHeight();
			}
		},

		calculateYDelta: function(startXY, xy) {
			var instance = this;

			return (xy[1] - startXY[1])/(instance.get(HOUR_HEIGHT)/2)*30;
		},

		findEventIntersections: function(evt, events) {
			var instance = this;
			var group = [];

			A.Array.each(events, function(evtCmp) {
				if (!evt._filtered && evt.intersectHours(evtCmp)) {
					group.push(evtCmp);
				}
			});

			return group;
		},

		getXYDelta: function(event) {
			var instance = this;
			var xy = event.currentTarget.getXY(),
				pageXY = [event.pageX, event.pageY];

			return A.Array.map(xy, function(val, i) {
				return (pageXY[i] - val);
			});
		},

		getTickY: function() {
			var instance = this;

			return roundToNearestMultiple(
				Math.ceil(instance.get(HOUR_HEIGHT) / 2), 10);
		},

		roundToNearestHour: function(date, time) {
			var instance = this;

			date.setHours(
				time[0],
				roundToNearestMultiple(time[1], instance.getTickY()),
				time[2]);
		},

		_afterDragAlign: function(event) {
			var instance = this;
			var dd = event.target;

			if (!instance[START_XY]) {
				instance[START_XY] = dd.actXY;
			}

			dd.actXY[0] = null;
		},

		_dragTickAlignX: function(activeColumn) {
			var instance = this;
			var draggingEvent = instance[DRAGGING_EVENT];

			if (draggingEvent && !instance[RESIZING]) {
				var placeholder = instance[EVENT_PLACEHOLDER];
				var delta = toNumber(activeColumn.attr(DATA_COLNUMBER)) - instance.startColNumber;

				instance.draggingEventStartDate = DateMath.add(draggingEvent.get(START_DATE), DateMath.DAY, delta);

				var startDate = DateMath.clone(instance.draggingEventStartDate);

				DateMath.copyHours(startDate, placeholder.get(START_DATE));

				placeholder.move(startDate);

				instance.plotEvent(placeholder);
			}
		},

		_dragTickAlignY: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var recorder = scheduler.get(EVENT_RECORDER);

			var draggingEvent = instance[DRAGGING_EVENT];

			if (draggingEvent) {
				var dd = event.target.get(HOST);
				var placeholder = instance[EVENT_PLACEHOLDER];
				var delta = instance.calculateYDelta(instance[START_XY], dd.actXY);

				if (instance[RESIZING]) {
					var endDate = DateMath.add(instance.draggingEventEndDate, DateMath.MINUTES, delta);

					if (DateMath.getMinutesOffset(endDate, instance.draggingEventStartDate) <= recorder.get(DURATION)) {
						return;
					}

					placeholder.set(END_DATE, endDate);
				}
				else {
					placeholder.move(DateMath.add(instance.draggingEventStartDate, DateMath.MINUTES, delta));
				}

				instance.plotEvent(placeholder);
			}
		},

		_setupDragDrop: function() {
			var instance = this;

			if (!instance[EVENT_PLACEHOLDER]) {
				var scheduler = instance.get(SCHEDULER);

				instance[EVENT_PLACEHOLDER] = new (instance.get(EVENT_CLASS))({
					scheduler: scheduler
				});

				instance[EVENT_PLACEHOLDER].removeTarget(scheduler);
				instance[EVENT_PLACEHOLDER].get(NODE).addClass(
					CSS_SCHEDULER_EVENT_PROXY).hide();
			}

			if (!instance.delegate) {
				instance.delegate = new A.DD.Delegate(
					instance.get(DELEGATE_CONFIG));
			}

			var dd = instance.delegate.dd;

			dd.unplug(A.Plugin.DDConstrained);
			dd.unplug(A.Plugin.DDNodeScroll);

			var region = instance.bodyNode.get(REGION);

			region.bottom = Infinity;
			region.top = -Infinity;

			dd.plug(A.Plugin.DDConstrained, {
				bubbleTargets: instance,
				constrain: region,
				stickY: true,
				tickY: instance.get(HOUR_HEIGHT) / 2
			});

			dd.plug(A.Plugin.DDNodeScroll, {
				node: instance.bodyNode,
				scrollDelay: 150
			});
		},

		_uiSetCurrentDate: function(val) {
			var instance = this;

			instance.syncColumnsUI();
			instance.syncDaysHeaderUI();
		},

		_onClickDaysHeader: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			if (event.target.test(ANCHOR)) {
				var dayView = scheduler.getViewByName(DAY);

				if (dayView) {
					var colNumber = toNumber(event.currentTarget.attr(DATA_COLNUMBER));

					scheduler.set(
						CURRENT_DATE, instance.getDateByColumn(colNumber));

					scheduler.set(ACTIVE_VIEW, dayView);
				}
			}

			event.preventDefault();
		},

		_onEventDragEnd: function(event) {
			var instance = this;
			var draggingEvent = instance[DRAGGING_EVENT];

			if (draggingEvent) {
				var placeholder = instance[EVENT_PLACEHOLDER];

				placeholder.set(VISIBLE, false);
				draggingEvent.set(VISIBLE, true);
				draggingEvent.copyDates(placeholder);

				instance.get(SCHEDULER).syncEventsUI();
			}

			instance[START_XY] = null;
			instance[DRAGGING_EVENT] = null;
		},

		_onEventDragStart: function(event) {
			var instance = this;
			var draggingEvent = instance[DRAGGING_EVENT] = instance.delegate.dd.get(NODE).getData(SCHEDULER_EVENT);

			if (draggingEvent) {
				var placeholder = instance[EVENT_PLACEHOLDER];

				placeholder.copyPropagateAttrValues(draggingEvent);

				instance.plotEvent(placeholder);

				draggingEvent.set(VISIBLE, false);

				instance.draggingEventStartDate = DateMath.clone(draggingEvent.get(START_DATE));
				instance.draggingEventEndDate = DateMath.clone(draggingEvent.get(END_DATE));

				var startColumn = instance.getColumnByDate(draggingEvent.get(START_DATE));

				instance.startColNumber = startColumn ? toNumber(startColumn.attr(DATA_COLNUMBER)) : 0;
			}
		},

		_onMouseDownTableCol: function(event) {
			var instance = this;
			var target = event.target;
			var scheduler = instance.get(SCHEDULER);
			var recorder = scheduler.get(EVENT_RECORDER);

			if (recorder && !scheduler.get(DISABLED)) {
				recorder.hideOverlay();

				if (target.test(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM)) {
					instance[START_XY] = [ event.pageX, event.pageY ];

					var colNumber = toNumber(event.currentTarget.attr(DATA_COLNUMBER));
					var startDate = instance.getDateByColumn(colNumber);
					var clickLeftTop = instance.getXYDelta(event);

					instance.roundToNearestHour(
						startDate, instance.getYCoordTime(clickLeftTop[1]));

					var endDate = DateMath.add(startDate, DateMath.MINUTES, recorder.get(DURATION));

					recorder.move(startDate);
					recorder.set(ALL_DAY, false);
					recorder.set(END_DATE, endDate);

					instance[CREATION_START_DATE] = startDate;
					instance[CREATION_END_DATE] = endDate;

					event.halt();
				}
				else if (target.test(
							[ DOT+CSS_SCHEDULER_VIEW_DAY_RESIZER,
								DOT+CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON ].join(COMMA))) {

					instance[RESIZING] = true;
				}
			}

			instance.get(BOUNDING_BOX).unselectable();
		},

		_onMouseEnterEvent: function(event) {
			var instance = this;
			var target = event.currentTarget;
			var evt = target.getData(SCHEDULER_EVENT);

			if (evt && !evt.get(DISABLED)) {
				instance[RESIZER_NODE].appendTo(target);
			}
		},

		_onMouseLeaveEvent: function(event) {
			var instance = this;

			if (!instance[RESIZING]) {
				instance._removeResizer();
			}
		},

		_onMouseMoveTableCol: function(event) {
			var instance = this;
			var activeColumn = event.currentTarget;
			var recorder = instance.get(SCHEDULER).get(EVENT_RECORDER);

			if (instance[ACTIVE_COLUMN] !== activeColumn) {
				instance[ACTIVE_COLUMN] = activeColumn;
				instance._dragTickAlignX(instance[ACTIVE_COLUMN]);
			}

			var creationEndDate = instance[CREATION_END_DATE];
			var creationStartDate = instance[CREATION_START_DATE];

			if (creationStartDate) {
				var delta = roundToNearestMultiple(
					instance.calculateYDelta(instance[START_XY], [ event.pageX, event.pageY ]),
					instance.getTickY()
				);

				if (instance._delta !== delta) {
					if (delta > 0) {
						recorder.set(END_DATE, DateMath.add(creationEndDate, DateMath.MINUTES, delta));
					}
					else {
						recorder.set(START_DATE, DateMath.add(creationStartDate, DateMath.MINUTES, delta));
					}

					instance.plotEvent(recorder);

					instance._delta = delta;
				}
			}
		},

		_onMouseUpTableCol: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var recorder = scheduler.get(EVENT_RECORDER);

			if (recorder && !scheduler.get(DISABLED)) {
				if (instance[CREATION_START_DATE]) {
					instance.plotEvent(recorder);

					recorder.showOverlay([ event.pageX, event.pageY ]);
				}
			}

			instance[CREATION_START_DATE] = null;
			instance[CREATION_END_DATE] = null;
			instance[RESIZING] = false;
			instance[START_XY] = null;

			instance._removeResizer();
			instance.get(BOUNDING_BOX).selectable();
		},

		_onSchedulerChange: function(event) {
			var instance = this;

			if (instance[HEADER_VIEW]) {
				instance[HEADER_VIEW].set(SCHEDULER, event.newVal);
			}
		},

		_removeResizer: function() {
			var instance = this;

			instance[RESIZER_NODE].remove();
		},

		_valueColDaysNode: function() {
			var instance = this;
			var days = instance.get(DAYS);
			var buffer = [], colNumber = 0;

			while (days--) {
				buffer.push(
					A.Lang.sub(TPL_SCHEDULER_VIEW_DAY_TABLE_COLDAY, {
						colNumber: colNumber++
					})
				);
			}

			return A.NodeList.create(buffer.join(EMPTY_STR));
		},

		_valueColHeaderDaysNode: function() {
			var instance = this;
			var days = instance.get(DAYS);
			var buffer = [], colNumber = 0;

			buffer.push(TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST);

			while (days--) {
				buffer.push(
					A.Lang.sub(TPL_SCHEDULER_VIEW_DAY_HEADER_DAY, {
						colNumber: colNumber++
					})
				);
			}

			buffer.push(TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_PAD_RIGHT);

			return A.NodeList.create(buffer.join(EMPTY_STR));
		},

		_valueMarkercellsNode: function() {
			var instance = this;
			var buffer = [], i;

			for (i = 0; i <= 23; i++) {
				buffer.push(TPL_SCHEDULER_VIEW_DAY_MARKERCELL);
			}

			return A.NodeList.create(buffer.join(EMPTY_STR));
		},

		_valueTimesNode: function() {
			var instance = this;
			var isoTime = instance.get(ISO_TIME);
			var buffer = [], hour;

			for (hour = 0; hour <= 23; hour++) {
				buffer.push(
					sub(
						TPL_SCHEDULER_VIEW_DAY_TABLE_TIME,
						{
							hour: isoTime ? DateMath.toIsoTimeString(hour) : DateMath.toUsTimeString(hour, false, true)
						}
					)
				);
			}

			return A.NodeList.create(buffer.join(EMPTY_STR));
		}
	}
});

A.SchedulerDayView = SchedulerDayView;
var SchedulerWeekView = A.Component.create({
	NAME: SCHEDULER_VIEW_WEEK,

	ATTRS: {
		bodyContent: {
			value: EMPTY_STR
		},

		days: {
			value: 7
		},

		headerViewConfig: {
			value: {
				displayDaysInterval: WEEK_LENGTH
			}
		},

		name: {
			value: WEEK
		},

		navigationDateFormatter: {
			valueFn: function() {
				return this._valueNavigationDateFormatter;
			},
			validator: isFunction
		}
	},

	EXTENDS: A.SchedulerDayView,

	prototype: {
		adjustCurrentDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			scheduler.set(
				CURRENT_DATE,
				DateMath.getFirstDayOfWeek(currentDate, firstDayOfWeek)
			);
		},

		getNextDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var firstDayOfWeekDate = instance._firstDayOfWeek(currentDate);

			return DateMath.add(firstDayOfWeekDate, DateMath.WEEK, 1);
		},

		getPrevDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var firstDayOfWeekDate = instance._firstDayOfWeek(currentDate);

			return DateMath.subtract(firstDayOfWeekDate, DateMath.WEEK, 1);
		},

		getToday: function() {
			var instance = this;
			var todayDate = SchedulerWeekView.superclass.getToday.apply(this, arguments);

			return instance._firstDayOfWeek(todayDate);
		},

		_firstDayOfWeek: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
		},

		_valueNavigationDateFormatter: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var locale = scheduler.get(LOCALE);

			var startDate = instance._firstDayOfWeek(date);

			var startDateLabel = A.DataType.Date.format(
				startDate,
				{
					format: '%b %d',
					locale: locale
				}
			);

			var endDate = DateMath.add(startDate, DateMath.DAY, instance.get(DAYS) - 1);

			var endDateLabel = A.DataType.Date.format(
				endDate,
				{
					format: (DateMath.isMonthOverlapWeek(date) ? '%b %d' : '%d') + ', %Y',
					locale: locale
				}
			);

			return [startDateLabel, MDASH, endDateLabel].join(SPACE);
		}
	}
});

A.SchedulerWeekView = SchedulerWeekView;
var CSS_ICON = getCN(ICON),
	CSS_ICON_ARROWSTOP_LEFT = getCN(ICON, 'arrowstop-1-l'),
	CSS_ICON_ARROWSTOP_RIGHT = getCN(ICON, 'arrowstop-1-r'),
	CSS_SVT_COLGRID = getCN(SCHEDULER_VIEW, TABLE, COLGRID),
	CSS_SVT_COLGRID_FIRST = getCN(SCHEDULER_VIEW, TABLE, COLGRID, FIRST),
	CSS_SVT_COLGRID_TODAY = getCN(SCHEDULER_VIEW, TABLE, COLGRID, TODAY),
	CSS_SVT_CONTAINER = getCN(SCHEDULER_VIEW, TABLE, CONTAINER),
	CSS_SVT_EVENTS_OVERLAY_NODE = getCN(SCHEDULER_VIEW, TABLE, EVENTS, OVERLAY, NODE),
	CSS_SVT_EVENTS_OVERLAY_NODE_BODY = getCN(SCHEDULER_VIEW, TABLE, EVENTS, OVERLAY, NODE, BODY),
	CSS_SVT_EVENTS_OVERLAY_NODE_CLOSE = getCN(SCHEDULER_VIEW, TABLE, EVENTS, OVERLAY, NODE, CLOSE),
	CSS_SVT_HEADER_COL = getCN(SCHEDULER_VIEW, TABLE, HEADER, COL),
	CSS_SVT_HEADER_DAY = getCN(SCHEDULER_VIEW, TABLE, HEADER, DAY),
	CSS_SVT_HEADER_TABLE = getCN(SCHEDULER_VIEW, TABLE, HEADER, TABLE),
	CSS_SVT_MORE = getCN(SCHEDULER_VIEW, TABLE, MORE),
	CSS_SVT_ROW = getCN(SCHEDULER_VIEW, TABLE, ROW),
	CSS_SVT_ROW_CONTAINER = getCN(SCHEDULER_VIEW, TABLE, ROW, CONTAINER),
	CSS_SVT_TABLE_DATA = getCN(SCHEDULER_VIEW, TABLE, DATA),
	CSS_SVT_TABLE_DATA_COL = getCN(SCHEDULER_VIEW, TABLE, DATA, COL),
	CSS_SVT_TABLE_DATA_COL_TITLE = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE),
	CSS_SVT_TABLE_DATA_COL_TITLE_DOWN = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE, DOWN),
	CSS_SVT_TABLE_DATA_COL_TITLE_FIRST = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE, FIRST),
	CSS_SVT_TABLE_DATA_COL_TITLE_NEXT = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE, NEXT),
	CSS_SVT_TABLE_DATA_COL_TITLE_TODAY = getCN(SCHEDULER_VIEW, TABLE, DATA, COL, TITLE, TODAY),
	CSS_SVT_TABLE_DATA_EVENT = getCN(SCHEDULER_VIEW, TABLE, DATA, EVENT),
	CSS_SVT_TABLE_DATA_EVENT_LEFT = getCN(SCHEDULER_VIEW, TABLE, DATA, EVENT, LEFT),
	CSS_SVT_TABLE_DATA_EVENT_REPEATED = getCN(SCHEDULER_VIEW, TABLE, DATA, EVENT, REPEATED),
	CSS_SVT_TABLE_DATA_EVENT_RIGHT = getCN(SCHEDULER_VIEW, TABLE, DATA, EVENT, RIGHT),
	CSS_SVT_TABLE_DATA_FIRST = getCN(SCHEDULER_VIEW, TABLE, DATA, FIRST),
	CSS_SVT_TABLE_GRID = getCN(SCHEDULER_VIEW, TABLE, GRID),
	CSS_SVT_TABLE_GRID_FIRST = getCN(SCHEDULER_VIEW, TABLE, GRID, FIRST),

	TPL_SVT_CONTAINER = '<div class="' + CSS_SVT_CONTAINER + '">' +
							'<div class="' + CSS_SVT_ROW_CONTAINER + '"></div>' +
						'</div>',

	TPL_SVT_EVENTS_OVERLAY_NODE =  '<div class="' + CSS_SVT_EVENTS_OVERLAY_NODE + '">' +
										'<div class="' + CSS_SVT_EVENTS_OVERLAY_NODE_BODY + '"></div>' +
										'<a href="javascript:;" class="' + CSS_SVT_EVENTS_OVERLAY_NODE_CLOSE + '">{label}</a>' +
									'</div>',

	TPL_SVT_GRID_COLUMN = '<td class="' + CSS_SVT_COLGRID + '">&nbsp;</td>',

	TPL_SVT_HEADER_DAY = '<th class="' + CSS_SVT_HEADER_DAY + '"><div>&nbsp;</div></th>',

	TPL_SVT_HEADER_TABLE = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVT_HEADER_TABLE + '">' +
								'<tbody>' +
									'<tr class="' + CSS_SVT_HEADER_COL + '"></tr>' +
								'</tbody>' +
							'</table>',

	TPL_SVT_MORE = '<a href="javascript:;" class="' + CSS_SVT_MORE + '">{label} {count}</a>',

	TPL_SVT_ROW = '<div class="' + CSS_SVT_ROW + '" style="top: {top}%; height: {height}%;"></div>',

	TPL_SVT_TABLE_DATA = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVT_TABLE_DATA + '">' +
								'<tbody></tbody>' +
						'</table>',

	TPL_SVT_TABLE_GRID = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVT_TABLE_GRID + '">' +
							'<tbody>' +
								'<tr></tr>' +
							'</tbody>' +
						'</table>',

	TPL_SVT_EV_ICON_LEFT = '<span class="' + [ CSS_ICON, CSS_ICON_ARROWSTOP_LEFT ].join(SPACE) + '"></span>',
	TPL_SVT_EV_ICON_RIGHT = '<span class="' + [ CSS_ICON, CSS_ICON_ARROWSTOP_RIGHT ].join(SPACE) + '"></span>',

	TPL_SVT_TABLE_DATA_COL = '<td class="' + CSS_SVT_TABLE_DATA_COL + '"><div></div></td>',
	TPL_SVT_TABLE_DATA_ROW = '<tr></tr>';

var SchedulerTableView = A.Component.create({
	NAME: SCHEDULER_VIEW_TABLE,

	ATTRS: {
		bodyContent: {
			value: EMPTY_STR
		},

		displayDaysInterval: {
			value: 42
		},

		displayRows: {
			value: 4
		},

		fixedHeight: {
			value: true
		},

		name: {
			value: TABLE
		},

		headerDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(
					date,
					{
						format: '%a',
						locale: scheduler.get(LOCALE)
					}
				);
			},
			validator: isString
		},

		navigationDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(
					date,
					{
						format: '%b %Y',
						locale: scheduler.get(LOCALE)
					}
				);
			},
			validator: isFunction
		},

		scrollable: {
			value: false
		},

		strings: {
			value: {
				close: 'Close',
				showMore: 'Show more'
			}
		},

		/*
		* HTML_PARSER attributes
		*/
		headerTableNode: {
			valueFn: function() {
				return A.Node.create(TPL_SVT_HEADER_TABLE);
			}
		},

		colHeaderDaysNode: {
			valueFn: '_valueColHeaderDaysNode'
		},

		rowsContainerNode: {
			valueFn: function() {
				return A.Node.create(TPL_SVT_CONTAINER);
			}
		},

		tableGridNode: {
			valueFn: '_valueTableGridNode'
		}
	},

	HTML_PARSER: {
		colHeaderDaysNode: getNodeListHTMLParser(DOT+CSS_SVT_HEADER_DAY, 7),
		headerTableNode: DOT+CSS_SVT_HEADER_TABLE,
		rowsContainerNode: DOT+CSS_SVT_CONTAINER,
		tableGridNode: getNodeListHTMLParser(DOT+CSS_SVT_TABLE_GRID, 7)
	},

	EXTENDS: A.SchedulerView,

	prototype: {
		evtDateStack: null,
		evtRenderedStack: null,
		rowDataTableStack: null,

		initializer: function() {
			var instance = this;

			instance.evtDateStack = {};
			instance.evtRenderedStack = {};
			instance.rowDataTableStack = {};

			instance[COL_HEADER_DAYS_NODE] = instance.get(COL_HEADER_DAYS_NODE);
			instance[HEADER_TABLE_NODE] = instance.get(HEADER_TABLE_NODE);
			instance[ROWS_CONTAINER_NODE] = instance.get(ROWS_CONTAINER_NODE);
			instance[TABLE_GRID_NODE] = instance.get(TABLE_GRID_NODE);
			instance[COLUMN_DAY_HEADER] = instance.headerTableNode.one(DOT+CSS_SVT_HEADER_COL);
			instance[COLUMN_TABLE_GRID] = A.NodeList.create();
			instance[TABLE_ROW_CONTAINER] = instance[ROWS_CONTAINER_NODE].one(DOT+CSS_SVT_ROW_CONTAINER);
			instance[TABLE_ROWS] = A.NodeList.create();
		},

		bindUI: function() {
			var instance = this;

			instance[ROWS_CONTAINER_NODE].delegate('click', A.bind(instance._onClickMore, instance), DOT+CSS_SVT_MORE);
		},

		renderUI: function() {
			var instance = this;

			var displayRowsCount = instance._getDisplayRowsCount();

			for (var rowIndex = 0; rowIndex < displayRowsCount; rowIndex++) {
				instance[TABLE_ROWS].push(
					instance.buildGridRowNode(rowIndex)
				);
			}

			instance._renderEventsOverlay();

			instance[COL_HEADER_DAYS_NODE].appendTo(instance[COLUMN_DAY_HEADER]);
			instance[TABLE_ROWS].appendTo(instance[TABLE_ROW_CONTAINER]);
		},

		buildEventsRow: function(rowStartDate, rowEndDate, rowDisplayIndex) {
			var instance = this;
			var displayRows = instance.get(DISPLAY_ROWS);

			var displayRowDaysCount = instance._getDisplayRowDaysCount();
			var rowRenderedColumns = 0;
			var rowNode = A.Node.create(TPL_SVT_TABLE_DATA_ROW);

			instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
				if (rowRenderedColumns > index) {
					return;
				}

				var events = instance.getIntersectEvents(celDate);
				var evt = instance._getRenderableEvent(events, rowStartDate, rowEndDate, celDate);

				var evtColNode = A.Node.create(TPL_SVT_TABLE_DATA_COL);
				var evtNodeContainer = evtColNode.one(DIV);

				if ((displayRows < events.length) && (rowDisplayIndex === (displayRows - 1))) {
					var strings = instance.get(STRINGS);

					var showMoreEventsLink = A.Node.create(
						Lang.sub(
							TPL_SVT_MORE,
							{
								count: (events.length - (displayRows - 1)),
								label: strings[SHOW_MORE]
							}
						)
					);

					showMoreEventsLink.setData(EVENTS, events);

					evtNodeContainer.append(showMoreEventsLink);
				}
				else if (evt) {
					var evtSplitInfo = instance._getEvtSplitInfo(evt, celDate, rowStartDate, rowEndDate);

					evtColNode.attr(COLSPAN, evtSplitInfo.colspan);

					rowRenderedColumns += (evtSplitInfo.colspan - 1);

					instance._syncEventNodeContainerUI(evt, evtNodeContainer, evtSplitInfo);
					instance._syncEventNodeUI(evt, evtNodeContainer, celDate);

					var key = String(celDate.getTime());

					instance.evtRenderedStack[key].push(evt);
				}

				rowRenderedColumns++;

				rowNode.append(evtColNode);
			});

			return rowNode;
		},

		buildEventsTable: function(rowStartDate, rowEndDate) {
			var instance = this;
			var displayRows = instance.get(DISPLAY_ROWS);

			var intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart());

			var cacheKey = String(intervalStartDate.getTime())
								.concat(rowStartDate.getTime())
								.concat(rowEndDate.getTime());

			var rowDataTableNode = instance.rowDataTableStack[cacheKey];

			if (!rowDataTableNode) {
				rowDataTableNode = A.Node.create(TPL_SVT_TABLE_DATA);

				var tableBody = rowDataTableNode.one(TBODY);
				var titleRowNode = instance.buildEventsTitleRow(rowDataTableNode, rowStartDate, rowEndDate);

				tableBody.append(titleRowNode);

				for (var rowDisplayIndex = 0; rowDisplayIndex < displayRows; rowDisplayIndex++) {
					var rowNode = instance.buildEventsRow(rowStartDate, rowEndDate, rowDisplayIndex);

					tableBody.append(rowNode);
				}

				instance.rowDataTableStack[cacheKey] = rowDataTableNode;
			}

			return rowDataTableNode;
		},

		buildEventsTitleRow: function(tableNode, rowStartDate, rowEndDate) {
			var instance = this;

			var titleRowNode = A.Node.create(TPL_SVT_TABLE_DATA_ROW);

			instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
				var colTitleNode = A.Node.create(TPL_SVT_TABLE_DATA_COL);

				colTitleNode
					.addClass(CSS_SVT_TABLE_DATA_COL_TITLE)
					.toggleClass(
						CSS_SVT_TABLE_DATA_COL_TITLE_FIRST,
						(index === 0)
					)
					.toggleClass(
						CSS_SVT_TABLE_DATA_COL_TITLE_TODAY,
						DateMath.isToday(celDate)
					)
					.toggleClass(
						CSS_SVT_TABLE_DATA_COL_TITLE_NEXT,
						DateMath.isToday(DateMath.subtract(celDate, DateMath.DAY, 1))
					)
					.toggleClass(
						CSS_SVT_TABLE_DATA_COL_TITLE_DOWN,
						DateMath.isToday(DateMath.subtract(celDate, DateMath.WEEK, 1))
					);

				titleRowNode.append(
					colTitleNode.setContent(celDate.getDate())
				);
			});

			return titleRowNode;
		},

		buildGridRowNode: function(rowIndex) {
			var instance = this;

			var displayRowsCount = instance._getDisplayRowsCount();
			var rowRelativeHeight = 100 / displayRowsCount;
			var tableGridNode = instance._getTableGridNode(rowIndex);

			var rowNode = A.Node.create(
				Lang.sub(
					TPL_SVT_ROW,
					{
						height: rowRelativeHeight,
						top: rowRelativeHeight * rowIndex
					}
				)
			);

			rowNode.append(
				tableGridNode.toggleClass(CSS_SVT_TABLE_GRID_FIRST, (rowIndex === 0))
			);

			return rowNode;
		},

		flushViewCache: function() {
			var instance = this;

			instance.evtDateStack = {};
			instance.evtRenderedStack = {};
			instance.rowDataTableStack = {};
		},

		getIntersectEvents: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			var key = String(date.getTime());

			if (!instance.evtDateStack[key]) {
				var events = scheduler.getIntersectEvents(date);

				instance.evtDateStack[key] = events.filter(
					instance.get(FILTER_FN)
				);
			}

			return instance.evtDateStack[key];
		},

		getNextDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return DateMath.add(currentDate, DateMath.DAY, displayDaysInterval);
		},

		getPrevDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return DateMath.subtract(currentDate, DateMath.DAY, displayDaysInterval);
		},

		hideEventsOverlay: function() {
			var instance = this;

			instance[EVENTS_OVERLAY].set(VISIBLE, false);
		},

		loopDates: function(startDate, endDate, fn, incrementBy, factor) {
			var instance = this;
			var curDate = DateMath.clone(startDate);
			var endDateMs = endDate.getTime();
			var index;

			for (index = 0; curDate.getTime() <= endDateMs; index++) {
				fn.apply(instance, [curDate, index]);

				curDate = DateMath.add(curDate, (incrementBy || DateMath.DAY), (factor || 1));
			}
		},

		plotEvents: function() {
			var instance = this;
			var intervalStartDate = instance._findCurrentIntervalStart();
			var startDateRef = DateMath.safeClearTime(intervalStartDate);

			instance.flushViewCache();

			instance.hideEventsOverlay();

			instance.bodyNode.all(DOT+CSS_SVT_TABLE_DATA).remove();

			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
			var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

			instance[TABLE_ROWS].each(function(rowNode, index) {
				var rowStartDate = DateMath.add(startDateRef, DateMath.DAY, weekDaysCount * index);
				var rowEndDate = DateMath.add(rowStartDate, DateMath.DAY, weekDaysCount - 1);

				var tableNode = instance.buildEventsTable(rowStartDate, rowEndDate);

				if (index === 0) {
					tableNode.addClass(CSS_SVT_TABLE_DATA_FIRST);
				}

				rowNode.append(tableNode);
			});
		},

		syncDaysHeaderUI: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var formatter = instance.get(HEADER_DATE_FORMATTER);
			var locale = instance.get(LOCALE);
			var firstDayOfWeekDt = instance._findFirstDayOfWeek(currentDate);

			instance.colHeaderDaysNode.all(DIV).each(
				function(columnNode, i) {
					var columnDate = DateMath.add(firstDayOfWeekDt, DateMath.DAY, i);

					columnNode.html(formatter.call(instance, columnDate));
				}
			);
		},

		syncGridUI: function() {
			var instance = this;
			var today = instance.getToday();
			var scheduler = instance.get(SCHEDULER);

			instance[COLUMN_TABLE_GRID].removeClass(CSS_SVT_COLGRID_TODAY);

			var intervalStartDate = instance._findCurrentIntervalStart();
			var intervalEndDate = instance._findCurrentIntervalEnd();

			if (DateMath.between(today, intervalStartDate, intervalEndDate)) {
				var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);
				var firstWeekDay = instance._findFirstDayOfWeek(today);

				var rowIndex = DateMath.getWeekNumber(today, firstDayOfWeek) - DateMath.getWeekNumber(intervalStartDate, firstDayOfWeek);
				var colIndex = (today.getDate() - firstWeekDay.getDate());
				var celIndex = instance._getCellIndex([colIndex, rowIndex]);

				var todayCel = instance[COLUMN_TABLE_GRID].item(celIndex);

				if (todayCel) {
					todayCel.addClass(CSS_SVT_COLGRID_TODAY);
				}
			}
		},

		syncStdContent: function() {
			var instance = this;

			instance.setStdModContent(
				WidgetStdMod.BODY, instance[ROWS_CONTAINER_NODE].getDOM());

			instance.setStdModContent(
				WidgetStdMod.HEADER, instance[HEADER_TABLE_NODE].getDOM());
		},

		_findCurrentIntervalEnd: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return DateMath.add(currentDate, DateMath.DAY, displayDaysInterval);
		},

		_findCurrentIntervalStart: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			return scheduler.get(CURRENT_DATE);
		},

		_findFirstDayOfWeek: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
		},

		_getDisplayRowsCount: function() {
			var instance = this;
			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return Math.ceil(displayDaysInterval / WEEK_LENGTH);
		},

		_getDisplayRowDaysCount: function() {
			var instance = this;
			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return Math.min(displayDaysInterval, WEEK_LENGTH);
		},

		_getEvtLabel: function(evt) {
			var instance = this;
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return [ startDate.getHours(), DASH, endDate.getHours(), SPACE, evt.get(CONTENT) ].join(EMPTY_STR);
		},

		_getEvtSplitInfo: function(evt, celDate, rowStartDate, rowEndDate) {
			var instance = this;
			var startDate = evt.getClearStartDate();
			var endDate = evt.getClearEndDate();

			var maxColspan = DateMath.getDayOffset(rowEndDate, celDate);

			var info = {
				colspan: Math.min(DateMath.getDayOffset(endDate, celDate), maxColspan) + 1,
				left: DateMath.before(startDate, rowStartDate),
				right: DateMath.after(endDate, rowEndDate)
			};

			return info;
		},

		_getRenderableEvent: function(events, rowStartDate, rowEndDate, celDate) {
			var instance = this;

			var key = String(celDate.getTime());

			if (!instance.evtRenderedStack[key]) {
				instance.evtRenderedStack[key] = [];
			}

			for (var i = 0; i < events.length; i++) {
				var evt = events[i];

				var startDate = evt.get(START_DATE);

				var isEventDateContinuation = DateMath.after(celDate, startDate) && !DateMath.isDayOverlap(celDate, rowStartDate);
				var isEventStartDateDay = !DateMath.isDayOverlap(startDate, celDate);

				var isRendered = A.Array.indexOf(instance.evtRenderedStack[key], evt) > -1;

				if (!isRendered && (isEventStartDateDay || isEventDateContinuation)) {
					return evt;
				}
			}

			return null;
		},

		_getTableGridNode: function(rowIndex) {
			var instance = this;

			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			var tableGridNode = instance[TABLE_GRID_NODE].item(rowIndex);
			var firstRowNode = tableGridNode.one(TR);

			for (var i = 0; i < Math.min(displayDaysInterval, WEEK_LENGTH); i++) {
				var columnNode = A.Node.create(TPL_SVT_GRID_COLUMN);

				firstRowNode.append(columnNode);

				instance[COLUMN_TABLE_GRID].push(columnNode);
			}

			return tableGridNode;
		},

		_onClickMore: function(event) {
			var instance = this;

			var target = event.target;
			var events = target.getData(EVENTS);
			var eventsNodeList = A.NodeList.create();

			A.Array.each(events, function(evt) {
				var evtNode = evt.get(NODE).item(0).clone();

				evtNode.setData(SCHEDULER_EVENT, evt);

				evtNode.setStyles({
					height: 'auto',
					left: 0,
					position: 'relative',
					top: 0,
					width: 'auto'
				});

				eventsNodeList.push(evtNode);
			});

			instance[EVENTS_OVERLAY].bodyNode.one(DOT+CSS_SVT_EVENTS_OVERLAY_NODE_BODY).setContent(eventsNodeList);

			instance[EVENTS_OVERLAY].setAttrs({
				visible: true,
				xy: target.getXY()
			});
		},

		_renderEventsOverlay: function() {
			var instance = this;
			var strings = instance.get(STRINGS);

			instance[EVENTS_OVERLAY] = new A.Overlay({
				align: {
					points: [ TL, TL ]
				},
				bodyContent: Lang.sub(
					TPL_SVT_EVENTS_OVERLAY_NODE,
					{
						label: strings[CLOSE]
					}
				),
				render: instance[ROWS_CONTAINER_NODE],
				visible: false,
				width: 250,
				zIndex: 450
			});

			instance[EVENTS_OVERLAY].bodyNode.delegate('click', A.bind(instance.hideEventsOverlay, instance), DOT+CSS_SVT_EVENTS_OVERLAY_NODE_CLOSE);
		},

		_syncEventNodeContainerUI: function(evt, node, evtSplitInfo) {
			var instance = this;

			node.addClass(CSS_SVT_TABLE_DATA_EVENT);

			if (evtSplitInfo.left) {
				node.addClass(CSS_SVT_TABLE_DATA_EVENT_LEFT).prepend(TPL_SVT_EV_ICON_LEFT);
			}

			if (evtSplitInfo.right) {
				node.addClass(CSS_SVT_TABLE_DATA_EVENT_RIGHT).append(TPL_SVT_EV_ICON_RIGHT);
			}

			if (evt.get(PARENT_EVENT)) {
				node.addClass(CSS_SVT_TABLE_DATA_EVENT_REPEATED);
			}
		},

		_syncEventNodeUI: function(evt, container, celDate) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			var evtNodeList = evt.get(NODE);
			var startDate = evt.get(START_DATE);

			var intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart());
			var startDateFirstDayOfWeek = DateMath.getFirstDayOfWeek(new Date(Math.max(startDate, intervalStartDate)), firstDayOfWeek);
			var paddingNodeIndex = Math.floor(DateMath.getDayOffset(celDate, startDateFirstDayOfWeek) / WEEK_LENGTH);

			if (evtNodeList.size() <= paddingNodeIndex) {
				evt.addPaddingNode();
			}

			var evtNode = evtNodeList.item(paddingNodeIndex);

			evtNode.setStyles({
				height: 'auto',
				left: 0,
				top: 0,
				width: 'auto'
			});

			evtNode.appendTo(container);

			evt.syncNodeUI();
		},

		_uiSetCurrentDate: function(val) {
			var instance = this;

			instance.syncDaysHeaderUI();
			instance.syncGridUI();
		},

		_valueColHeaderDaysNode: function() {
			var instance = this;

			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
			var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

			return instance._valueNodeList(weekDaysCount, TPL_SVT_HEADER_DAY);
		},

		_valueTableGridNode: function() {
			var instance = this;

			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
			var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

			return instance._valueNodeList(weekDaysCount, TPL_SVT_TABLE_GRID);
		},

		_valueNodeList: function(size, tpl) {
			var instance = this;
			var buffer = [];

			while (size--) {
				buffer.push(tpl);
			}

			return A.NodeList.create(buffer.join(EMPTY_STR));
		}
	}
});

A.SchedulerTableView = SchedulerTableView;
var CSS_SVM_TABLE_DATA_COL_NOMONTH = getCN(SCHEDULER_VIEW_MONTH, TABLE, DATA, COL, NOMONTH);

var SchedulerMonthView = A.Component.create({
	NAME: SCHEDULER_VIEW_MONTH,

	ATTRS: {
		displayDaysInterval: {
			readOnly: true,
			value: 42
		},

		name: {
			value: MONTH
		},

		navigationDateFormatter: {
			value: function(date) {
				var instance = this;
				var scheduler = instance.get(SCHEDULER);

				return A.DataType.Date.format(
					date,
					{
						format: '%B %Y',
						locale: scheduler.get(LOCALE)
					}
				);
			},
			validator: isFunction
		}
	},

	EXTENDS: A.SchedulerTableView,

	prototype: {

		getNextDate: function() {
			var instance = this;

			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);

			return DateMath.add(currentDate, DateMath.MONTH, 1);
		},

		getPrevDate: function() {
			var instance = this;

			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);

			return DateMath.subtract(currentDate, DateMath.MONTH, 1);
		},

		plotEvents: function() {
			var instance = this;

			A.SchedulerMonthView.superclass.plotEvents.apply(instance, arguments);

			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);

			var monthEnd = DateMath.findMonthEnd(currentDate);
			var monthStart = DateMath.findMonthStart(currentDate);

			var currentIntervalStart = instance._findCurrentIntervalStart();

			var colTitleNodes = instance[TABLE_ROW_CONTAINER].all(DOT+CSS_SVT_TABLE_DATA_COL_TITLE);

			colTitleNodes.each(function(colTitleNode, index) {
				var celDate = DateMath.add(currentIntervalStart, DateMath.DAY, index);

				if (DateMath.before(celDate, monthStart) || DateMath.after(celDate, monthEnd)) {
					colTitleNode.addClass(CSS_SVM_TABLE_DATA_COL_NOMONTH);
				}
			});
		},

		_findCurrentIntervalStart: function() {
			var instance = this;

			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);

			var monthStartDate = DateMath.findMonthStart(currentDate);

			return instance._findFirstDayOfWeek(monthStartDate);
		},

		_findFirstDayOfWeek: function(date) {
			var instance = this;

			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
		}

	}
});

A.SchedulerMonthView = SchedulerMonthView;
var CSS_SVT_DRAGGING = getCN(SCHEDULER_VIEW, TABLE, DRAGGING),
	CSS_SVT_LASSO = getCN(SCHEDULER_VIEW, TABLE, LASSO),
	CSS_SVT_PROXY_NODE = getCN(SCHEDULER_VIEW, TABLE, PROXY, NODE),

	TPL_SVT_LASSO = '<div class="' + CSS_SVT_LASSO + '"></div>',
	TPL_SVT_PROXY_NODE = '<div class="' + CSS_SVT_PROXY_NODE + '"></div>';

A.SchedulerTableViewDD = function() {};

A.SchedulerTableViewDD.ATTRS = {

	delegateConfig: {
		value: {},
		setter: function(val) {
			var instance = this;

			return A.merge(
				{
					dragConfig: {
						offsetNode: false,
						useShim: false
					},
					bubbleTargets: instance,
					container: instance.get(BOUNDING_BOX),
					nodes: DOT+CSS_SCHEDULER_EVENT,
					invalid: 'input, select, button, a, textarea, ' + DOT+CSS_SCHEDULER_EVENT_DISABLED
				},
				val || {}
			);
		},
		validator: isObject
	}

};

A.mix(A.SchedulerTableViewDD.prototype, {

	initializer: function() {
		var instance = this;

		instance[PROXY_NODE] = A.Node.create(TPL_SVT_PROXY_NODE);

		instance.after(instance.viewDDBindUI, instance, 'bindUI');
		instance.after(instance.viewDDRenderUI, instance, 'renderUI');
		instance.after(instance.viewDDSyncUI, instance, 'syncUI');
	},

	viewDDBindUI: function() {
		var instance = this;
		var recorder = instance.get(SCHEDULER).get(EVENT_RECORDER);

		if (recorder) {
			recorder.on({
				cancel: A.bind(instance.removeLasso, instance),
				save: A.bind(instance.removeLasso, instance)
			});
		}

		instance[ROWS_CONTAINER_NODE].on({
			mousedown: A.bind(instance._onMouseDownGrid, instance),
			mousemove: A.bind(instance._onMouseMoveGrid, instance),
			mouseup: A.bind(instance._onMouseUpGrid, instance)
		});

		instance.after('drag:align', instance._afterDragAlign);
		instance.on('drag:end', instance._onEventDragEnd);
		instance.on('drag:start', instance._onEventDragStart);
	},

	viewDDRenderUI: function() {
		var instance = this;

	},

	viewDDSyncUI: function() {
		var instance = this;

		instance._setupDragDrop();
	},

	removeLasso: function() {
		var instance = this;

		if (instance[LASSO]) {
			instance[LASSO].remove();
		}
	},

	removeProxy: function() {
		var instance = this;

		if (instance[PROXY_NODE]) {
			instance[PROXY_NODE].remove();
		}
	},

	renderLasso: function(startPos, endPos) {
		var instance = this;

		var minPos = startPos;
		var maxPos = endPos;

		if (startPos[1] > endPos[1]) {
			minPos = endPos;
			maxPos = startPos;
		}

		var imin = minPos[0], jmin = minPos[1],
			imax = maxPos[0], jmax = maxPos[1];

		instance.removeLasso();

		instance.lasso = A.NodeList.create();

		for (var j = jmin; j <= jmax; j++) {
			var h = instance.gridCellHeight,
				w = instance.gridCellWidth,
				x = 0,
				y = (h * j);

			if (j === jmin) {
				if (jmin === jmax) {
					x += Math.min(imin, imax) * w;
					w *= Math.abs(imax - imin) + 1;
				}
				else {
					x += imin * w;
					w *= WEEK_LENGTH - imin;
				}
			}
			else if (j === jmax) {
				w *= imax + 1;
			}
			else {
				w *= WEEK_LENGTH;
			}

			var lassoNode = A.Node.create(TPL_SVT_LASSO);

			instance.lasso.push(lassoNode);

			instance[ROWS_CONTAINER_NODE].append(lassoNode);
			lassoNode.sizeTo(w, h);
			lassoNode.setXY(instance._offsetXY([x, y], 1));
		}
	},

	_afterDragAlign: function(event) {
		var instance = this;
		var dd = event.target;

		var bodyRegion = instance.bodyNode.get(REGION);

		var mouseRegion = {
			bottom: event.pageY,
			left: event.pageX,
			right: event.pageX,
			top: event.pageY
		};

		if (!A.DOM.inRegion(null, bodyRegion, true, mouseRegion)) {
			return;
		}

		var draggingEvent = instance[DRAGGING_EVENT];
		var eventXY = [event.pageX, event.pageY];
		var position = instance._findPosition(instance._offsetXY(eventXY, -1));

		if (draggingEvent && instance._hasLassoChanged(position)) {
			instance.lassoLastPosition = position;

			var endPositionDate = DateMath.add(
				instance._getPositionDate(position),
				DateMath.MINUTES,
				draggingEvent.getMinutesDuration()
			);

			instance.renderLasso(position, instance._getDatePosition(endPositionDate));
		}
	},

	_findPosition: function(xy) {
		var instance = this;

		var i = Math.floor(xy[0] / instance.gridCellWidth);
		var j = Math.floor(xy[1] / instance.gridCellHeight);

		return [i, j];
	},

	_getCellIndex: function(position) {
		var instance = this;

		return position[1] * WEEK_LENGTH + position[0];
	},

	_getDatePosition: function(date) {
		var instance = this;

		var intervalStartDate = instance._findCurrentIntervalStart();
		var offset = DateMath.getDayOffset(date, intervalStartDate);

		var position = [];

		position[1] = Math.floor(offset / WEEK_LENGTH);
		position[0] = offset % WEEK_LENGTH;

		return position;
	},

	_getPositionDate: function(position) {
		var instance = this;
		var intervalStartDate = instance._findCurrentIntervalStart();
		var startDateRef = DateMath.safeClearTime(instance._findFirstDayOfWeek(intervalStartDate));

		var date = DateMath.add(startDateRef, DateMath.DAY, instance._getCellIndex(position));

		date.setHours(0, 0, 0, 0);

		return date;
	},

	_hasLassoChanged: function(position) {
		var instance = this;

		var lassoLastPosition = instance.lassoLastPosition || instance.lassoStartPosition;

		return lassoLastPosition && ((position[0] !== lassoLastPosition[0]) || (position[1] !== lassoLastPosition[1]));
	},

	_offsetXY: function(xy, sign) {
		var instance = this;
		var offsetXY = instance[ROWS_CONTAINER_NODE].getXY();

		return [ xy[0] + offsetXY[0]*sign, xy[1] + offsetXY[1]*sign ];
	},

	_onEventDragEnd: function(event) {
		var instance = this;
		var draggingEvent = instance[DRAGGING_EVENT];

		if (draggingEvent) {
			draggingEvent.move(instance._getPositionDate(instance.lassoLastPosition));
			draggingEvent.set(VISIBLE, true);

			instance[ROWS_CONTAINER_NODE].removeClass(CSS_SVT_DRAGGING).unselectable();

			event.target.set(DRAG_NODE, instance.originalDragNode);

			instance.removeLasso();
			instance.removeProxy();

			instance.get(SCHEDULER).syncEventsUI();
		}

		instance[DRAGGING_EVENT] = null;
	},

	_onEventDragStart: function(event) {
		var instance = this;
		var draggingEvent = instance[DRAGGING_EVENT] = instance[DELEGATE][DD].get(NODE).getData(SCHEDULER_EVENT);

		if (draggingEvent) {
			instance._syncCellDimensions();

			var eventXY = [event.pageX, event.pageY];

			var startPosition = instance._findPosition(instance._offsetXY(eventXY, -1));

			var endPositionDate = DateMath.add(
				instance._getPositionDate(startPosition),
				DateMath.MINUTES,
				draggingEvent.getMinutesDuration()
			);

			instance.renderLasso(startPosition, instance._getDatePosition(endPositionDate));

			draggingEvent.set(VISIBLE, false);

			instance._syncProxyNodeUI(draggingEvent);

			instance.lassoStartPosition = instance.lassoLastPosition = startPosition;

			instance[ROWS_CONTAINER_NODE].addClass(CSS_SVT_DRAGGING).unselectable();

			instance.originalDragNode = event.target.get(DRAG_NODE);

			event.target.set(DRAG_NODE, instance[PROXY_NODE]);
		}
	},

	_onMouseDownGrid: function(event) {
		var instance = this;
		var scheduler = instance.get(SCHEDULER);
		var recorder = scheduler.get(EVENT_RECORDER);
		var target = event.target;

		if (recorder && target.test([DOT+CSS_SVT_COLGRID, DOT+CSS_SVT_TABLE_DATA_COL].join(COMMA))) {
			instance._recording = true;

			instance._syncCellDimensions();

			var eventXY = instance._offsetXY([event.pageX, event.pageY], -1);

			instance.lassoStartPosition = instance.lassoLastPosition = instance._findPosition(eventXY);

			instance.renderLasso(instance.lassoStartPosition, instance.lassoLastPosition);

			instance[ROWS_CONTAINER_NODE].unselectable();
		}
	},

	_onMouseMoveGrid: function(event) {
		var instance = this;
		var target = event.currentTarget;

		var eventXY = [event.pageX, event.pageY];
		var position = instance._findPosition(instance._offsetXY(eventXY, -1));

		if (instance._recording && instance._hasLassoChanged(position)) {
			instance.lassoLastPosition = position;

			instance.renderLasso(instance.lassoStartPosition, position);
		}
	},

	_onMouseUpGrid: function(event) {
		var instance = this;
		var scheduler = instance.get(SCHEDULER);
		var recorder = scheduler.get(EVENT_RECORDER);

		if (recorder && instance._recording && !scheduler.get(DISABLED)) {
			var startPositionDate = instance._getPositionDate(instance.lassoStartPosition);
			var endPositionDate = instance._getPositionDate(instance.lassoLastPosition);

			var startDate = new Date(Math.min(startPositionDate, endPositionDate));
			startDate.setHours(0, 0, 0);

			var endDate = new Date(Math.max(startPositionDate, endPositionDate));
			endDate.setHours(23, 59, 59);

			recorder.set(ALL_DAY, true);
			recorder.set(END_DATE, endDate);
			recorder.set(START_DATE, startDate);

			recorder.showOverlay([event.pageX, event.pageY]);

			instance._recording = false;
		}
	},

	_setupDragDrop: function() {
		var instance = this;

		if (!instance[DELEGATE]) {
			instance[DELEGATE] = new A.DD.Delegate(
				instance.get(DELEGATE_CONFIG));
		}

		var dd = instance[DELEGATE][DD];

		dd.unplug(A.Plugin.DDConstrained);
		dd.unplug(A.Plugin.DDNodeScroll);
		dd.unplug(A.Plugin.DDProxy);

		dd.plug(A.Plugin.DDConstrained, {
			bubbleTargets: instance,
			constrain: instance.bodyNode
		});

		dd.plug(A.Plugin.DDNodeScroll, {
			node: instance.bodyNode,
			scrollDelay: 150
		});

		dd.plug(A.Plugin.DDProxy, {
			moveOnEnd: false,
			positionProxy: false
		});
	},

	_syncCellDimensions: function() {
		var instance = this;

		var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
		var displayRowsCount = Math.ceil(displayDaysInterval / WEEK_LENGTH);
		var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

		instance.gridCellHeight = instance[ROWS_CONTAINER_NODE].get(OFFSET_HEIGHT) / displayRowsCount;
		instance.gridCellWidth = instance[ROWS_CONTAINER_NODE].get(OFFSET_WIDTH) / weekDaysCount;
	},

	_syncProxyNodeUI: function(evt) {
		var instance = this;

		var eventNode = evt.get(NODE).item(0);

		instance[PROXY_NODE].setStyles({
			backgroundColor: eventNode.getStyle('backgroundColor'),
			display: 'block',
			width: '200px'
		});

		instance[PROXY_NODE].appendTo(instance[ROWS_CONTAINER_NODE]);
		instance[PROXY_NODE].setContent(evt.get(CONTENT));
	}
});

A.Base.mix(A.SchedulerTableView, [ A.SchedulerTableViewDD ]);

}, '@VERSION@' ,{skinnable:true, requires:['aui-scheduler-event','aui-calendar','aui-button-item','dd-drag','dd-delegate','dd-drop','dd-constrain']});
AUI.add('aui-scheduler-event', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,
	isDate = Lang.isDate,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,

	ColorUtil = A.ColorUtil,
	DateMath = A.DataType.DateMath,

	_toInitialCap = A.cached(function(str) {
		return str.substring(0, 1).toUpperCase() + str.substring(1);
	}),

	DASH = '-',
	NDASH = '&ndash;',
	DOT = '.',
	EMPTY_STR = '',
	SPACE = ' ',
	UNDERLINE = '_',

	_PROPAGATE_SET = '_propagateSet',

	ACTIVE_VIEW = 'activeView',
	BORDER_COLOR = 'borderColor',
	BORDER_COLOR_RGB = 'borderColorRGB',
	BORDER_STYLE = 'borderStyle',
	BORDER_WIDTH = 'borderWidth',
	CHANGE = 'Change',
	COLOR = 'color',
	COLOR_BRIGHTNESS_FACTOR = 'colorBrightnessFactor',
	COLOR_SATURATION_FACTOR = 'colorSaturationFactor',
	CONTENT = 'content',
	DISABLED = 'disabled',
	DURATION = 'duration',
	END_DATE = 'endDate',
	EVENT_CLASS = 'eventClass',
	EVENT_STACK = 'eventStack',
	EVENTS = 'events',
	HIDDEN = 'hidden',
	HSB_COLOR = 'hsbColor',
	ICON = 'icon',
	ICONS = 'icons',
	ID = 'id',
	INHERIT = 'inherit',
	ISO_TIME = 'isoTime',
	LOCALE = 'locale',
	NEVER = 'never',
	NODE = 'node',
	OVERLAY = 'overlay',
	PARENT_EVENT = 'parentEvent',
	RECORDER = 'recorder',
	REPEAT = 'repeat',
	REPEATED = 'repeated',
	REPEATED_EVENTS = 'repeatedEvents',
	REPEATER = 'repeater',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'scheduler-event',
	SCHEDULER_EVENT_RECORDER = 'scheduler-event-recorder',
	START_DATE = 'startDate',
	TEMPLATE = 'template',
	TITLE = 'title',
	TITLE_DATE_FORMAT = 'titleDateFormat',
	VISIBLE = 'visible',

	TITLE_DT_FORMAT_ISO = '%H:%M',
	TITLE_DT_FORMAT_US = '%I:%M',

	getCN = A.getClassName,

	CSS_ICON = getCN(ICON),
	CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
	CSS_SCHEDULER_EVENT_CONTENT = getCN(SCHEDULER_EVENT, CONTENT),
	CSS_SCHEDULER_EVENT_HIDDEN = getCN(SCHEDULER_EVENT, HIDDEN),
	CSS_SCHEDULER_EVENT_DISABLED = getCN(SCHEDULER_EVENT, DISABLED),
	CSS_SCHEDULER_EVENT_RECORDER = getCN(SCHEDULER_EVENT, RECORDER),
	CSS_SCHEDULER_EVENT_REPEATED = getCN(SCHEDULER_EVENT, REPEATED),
	CSS_SCHEDULER_EVENT_REPEATER = getCN(SCHEDULER_EVENT, REPEATER),
	CSS_SCHEDULER_EVENT_TITLE = getCN(SCHEDULER_EVENT, TITLE),
	CSS_SCHEDULER_EVENT_ICONS = getCN(SCHEDULER_EVENT, ICONS),
	CSS_SCHEDULER_EVENT_ICON_DISABLED = getCN(SCHEDULER_EVENT, ICON, DISABLED),
	CSS_SCHEDULER_EVENT_ICON_REPEATED = getCN(SCHEDULER_EVENT, ICON, REPEATED),
	CSS_SCHEDULER_EVENT_ICON_REPEATER = getCN(SCHEDULER_EVENT, ICON, REPEATER);

var SchedulerEvent = A.Component.create({
	NAME: SCHEDULER_EVENT,

	ATTRS: {
		allDay: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		borderStyle: {
			value: 'solid',
			validator: isString
		},

		borderWidth: {
			value: '1px',
			validator: isString
		},

		colorBrightnessFactor: {
			value: 0.75,
			validator: isNumber
		},

		colorSaturationFactor: {
			value: 1.5,
			validator: isNumber
		},

		content: {
			value: '(no title)',
			validator: isString
		},

		color: {
			lazyAdd: false,
			setter: '_setColor',
			value: '#D96666',
			validator: isString
		},

		titleDateFormat: {
			getter: '_getTitleDateFormat',
			validator: isString
		},

		endDate: {
			setter: '_setDate',
			valueFn: function() {
				var date = DateMath.clone(this.get(START_DATE));

				date.setHours(date.getHours() + 1);

				return date;
			}
		},

		eventClass: {
			valueFn: function() {
				return A.SchedulerEvent;
			}
		},

		disabled: {
			value: false,
			validator: isBoolean
		},

		node: {
			valueFn: function() {
				return A.NodeList.create(A.Node.create(this.EVENT_NODE_TEMPLATE).setData(SCHEDULER_EVENT, this));
			}
		},

		parentEvent: {
		},

		repeat: {
			value: EMPTY_STR,
			setter: '_setRepeat'
		},

		scheduler: {
			lazyAdd: false,
			setter: '_setScheduler'
		},

		startDate: {
			setter: '_setDate',
			valueFn: function() {
				return new Date();
			}
		},

		visible: {
			value: true,
			validator: isBoolean
		}
	},

	EXTENDS: A.Base,

	PROPAGATE_ATTRS: [START_DATE, END_DATE, CONTENT, COLOR, COLOR_BRIGHTNESS_FACTOR, COLOR_SATURATION_FACTOR, BORDER_STYLE, BORDER_WIDTH, TITLE_DATE_FORMAT, VISIBLE, DISABLED],

	prototype: {
		EVENT_NODE_TEMPLATE: '<div class="' + CSS_SCHEDULER_EVENT + '">' +
									'<div class="' + CSS_SCHEDULER_EVENT_TITLE + '"></div>' +
									'<div class="' + CSS_SCHEDULER_EVENT_CONTENT + '"></div>' +
									'<div class="' + CSS_SCHEDULER_EVENT_ICONS + '">' +
										'<span class="' + [CSS_ICON, CSS_SCHEDULER_EVENT_ICON_REPEATED].join(SPACE) + '"></span>' +
										'<span class="' + [CSS_ICON, CSS_SCHEDULER_EVENT_ICON_REPEATER].join(SPACE) + '"></span>' +
										'<span class="' + [CSS_ICON, CSS_SCHEDULER_EVENT_ICON_DISABLED].join(SPACE) + '"></span>' +
									'</div>' +
								'</div>',

		eventStack: null,

		initializer: function() {
			var instance = this;
			var node = instance.get(NODE);

			instance[EVENT_STACK] = {};

			A.Array.each(instance.get(EVENT_CLASS).PROPAGATE_ATTRS, function(attrName) {
				instance.after(attrName+CHANGE, instance._propagateAttrChange);
			});

			instance._bindUIAttrs();

			instance.syncNodeUI(true);
		},

		destroy: function() {
			var instance = this;

			instance.eachRepeatedEvent(function(evt, uid) {
				evt.destroy();
			});

			instance[EVENT_STACK] = {};
			instance.get(NODE).remove(true);
		},

		addPaddingNode: function() {
			var instance = this;

			instance.get(NODE).push(A.Node.create(instance.EVENT_NODE_TEMPLATE).setData(SCHEDULER_EVENT, instance));

			instance.syncNodeUI();
		},

		copyDates: function(evt) {
			var instance = this;

			instance.set(END_DATE, DateMath.clone(evt.get(END_DATE)));
			instance.set(START_DATE, DateMath.clone(evt.get(START_DATE)));
		},

		copyPropagateAttrValues: function(evt, dontCopyMap) {
			var instance = this;

			instance.copyDates(evt);

			A.Array.each(instance.get(EVENT_CLASS).PROPAGATE_ATTRS, function(attrName) {
				if ( !((dontCopyMap || {}).hasOwnProperty(attrName)) ) {
					var value = evt.get(attrName);

					if (!isObject(value)) {
						instance.set(attrName, value);
					}
				}
			});
		},

		getBorderColor: function() {
			var instance = this;

			return instance[BORDER_COLOR_RGB].hex;
		},

		getDaysDuration: function() {
			var instance = this;

			return DateMath.getDayOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		getHoursDuration: function() {
			var instance = this;

			return DateMath.getHoursOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		getMinutesDuration: function() {
			var instance = this;

			return DateMath.getMinutesOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		getSecondsDuration: function() {
			var instance = this;

			return DateMath.getSecondsOffset(
				instance.get(END_DATE), instance.get(START_DATE));
		},

		sameEndDate: function(evt) {
			var instance = this;

			return DateMath.compare(instance.get(END_DATE), evt.get(END_DATE));
		},

		sameStartDate: function(evt) {
			var instance = this;

			return DateMath.compare(
				instance.get(START_DATE), evt.get(START_DATE));
		},

		isAfter: function(evt) {
			var instance = this;
			var startDate = instance.get(START_DATE);
			var evtStartDate = evt.get(START_DATE);

			return DateMath.after(startDate, evtStartDate);
		},

		isBefore: function(evt) {
			var instance = this;
			var startDate = instance.get(START_DATE);
			var evtStartDate = evt.get(START_DATE);

			return DateMath.before(startDate, evtStartDate);
		},

		repeatByDate: function(date) {
			var instance = this;
			var uid = instance.uidByDate(date);

			if (!instance[EVENT_STACK][uid]) {
				var startDate = DateMath.clone(date);
				var endDate = DateMath.clone(date);

				DateMath.copyHours(startDate, instance.get(START_DATE));
				DateMath.copyHours(endDate, instance.get(END_DATE));

				var newEvt = new instance.get(EVENT_CLASS)({
					endDate: endDate,
					parentEvent: instance,
					scheduler: instance.get(SCHEDULER),
					startDate: startDate
				});

				newEvt.copyPropagateAttrValues(instance);

				instance[EVENT_STACK][uid] = newEvt;
			}

			return instance[EVENT_STACK][uid];
		},

		intersects: function(evt) {
			var instance = this;
			var endDate = instance.get(END_DATE);
			var startDate = instance.get(START_DATE);
			var evtStartDate = evt.get(START_DATE);

			return (instance.sameStartDate(evt) ||
					DateMath.between(evtStartDate, startDate, endDate));
		},

		intersectHours: function(evt) {
			var instance = this;
			var endDate = instance.get(END_DATE);
			var startDate = instance.get(START_DATE);
			var evtModifiedStartDate = DateMath.clone(startDate);

			DateMath.copyHours(evtModifiedStartDate, evt.get(START_DATE));

			return (DateMath.compare(startDate, evtModifiedStartDate) ||
					DateMath.between(evtModifiedStartDate, startDate, endDate));
		},

		isDayBoundaryEvent: function() {
			var instance = this;

			return DateMath.isDayBoundary(
				instance.get(START_DATE), instance.get(END_DATE));
		},

		isDayOverlapEvent: function() {
			var instance = this;

			return DateMath.isDayOverlap(
				instance.get(START_DATE), instance.get(END_DATE));
		},

		isRepeatableDate: function(date) {
			var instance = this;
			var repeat = instance.get(REPEAT);

			return (repeat && repeat.validate(instance, date));
		},

		getClearEndDate: function() {
			var instance = this;

			return DateMath.safeClearTime(instance.get(END_DATE));
		},

		getClearStartDate: function() {
			var instance = this;

			return DateMath.safeClearTime(instance.get(START_DATE));
		},

		move: function(date) {
			var instance = this;
			var duration = instance.getMinutesDuration();

			instance.set(START_DATE, date);
			instance.set(END_DATE, DateMath.add(DateMath.clone(date), DateMath.MINUTES, duration));
		},

		uidByDate: function(date) {
			var instance = this;

			date = isDate(date) ?
					DateMath.safeClearTime(date) : instance.getClearStartDate();

			return [SCHEDULER_EVENT, date.getTime()].join(UNDERLINE);
		},

		setContent: function(content, propagate) {
			var instance = this;

			instance.get(NODE).each(function(node) {
				var contentNode = node.one(_DOT+CSS_SCHEDULER_EVENT_CONTENT);

				contentNode.setContent(content);
			});

			if (propagate) {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.setContent(content);
				});
			}
		},

		setTitle: function(content, propagate) {
			var instance = this;

			instance.get(NODE).each(function(node) {
				var titleNode = node.one(_DOT+CSS_SCHEDULER_EVENT_TITLE);

				titleNode.setContent(content);
			});

			if (propagate) {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.setTitle(content);
				});
			}
		},

		syncNodeUI: function(propagate) {
			var instance = this;

			instance._syncUIAttrs();
			instance.syncNodeColorUI(propagate);
			instance.syncNodeTitleUI(propagate);
			instance.syncNodeContentUI(propagate);
		},

		syncNodeColorUI: function(propagate) {
			var instance = this;
			var node = instance.get(NODE);
			var borderColor = instance.getBorderColor();

			if (node) {
				var styles = {
					borderWidth: instance.get(BORDER_WIDTH),
					borderColor: borderColor,
					backgroundColor: instance.get(COLOR),
					borderStyle: instance.get(BORDER_STYLE),
					color: INHERIT
				};

				node.setStyles(styles);
			}

			if (propagate) {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.syncNodeColorUI();
				});
			}
		},

		syncNodeContentUI: function(propagate) {
			var instance = this;

			instance.setContent(instance.get(CONTENT), propagate);
		},

		syncNodeTitleUI: function(propagate) {
			var instance = this;
			var sDate = instance._formatDate(instance.get(START_DATE));
			var eDate = instance._formatDate(instance.get(END_DATE));

			instance.setTitle([sDate, eDate].join(SPACE+NDASH+SPACE), propagate);
		},

		split: function() {
			var instance = this,
				s1 = DateMath.clone(instance.get(START_DATE)),
				e1 = DateMath.clone(instance.get(END_DATE));

			if (instance.isDayOverlapEvent() && !instance.isDayBoundaryEvent()) {
				var s2 = DateMath.clone(s1);
				s2.setHours(24,0,0,0);

				return [ [ s1, DateMath.toMidnight(DateMath.clone(s1)) ], [ s2, DateMath.clone(e1) ] ];
			}

			return [ [ s1, e1 ] ];
		},

		eachRepeatedEvent: function(fn) {
			var instance = this;

			A.each(instance[EVENT_STACK], fn, instance);
		},

		unlink: function() {
			var instance = this;

			if (instance.get(PARENT_EVENT)) {
				instance.set(PARENT_EVENT, null);
			}
			else {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.unlink();
				});
			}

			instance[EVENT_STACK] = {};

			instance.syncNodeUI();
		},

		_afterDisabledChange: function(event) {
			var instance = this;

			instance._uiSetDisabled(event.newVal);
		},

		_afterVisibleChange: function(event) {
			var instance = this;

			instance._uiSetVisible(event.newVal);
		},

		_afterRepeatChange: function(event) {
			var instance = this;

			instance._uiSetRepeat(event.newVal);
		},

		_afterParentEventChange: function(event) {
			var instance = this;

			instance._uiSetParentEvent(event.newVal);
		},

		_bindUIAttrs: function() {
			var instance = this;

			instance.after({
				disabledChange: instance._afterDisabledChange,
				visibleChange: instance._afterVisibleChange,
				parentEventChange: instance._afterParentEventChange,
				repeatChange: instance._afterRepeatChange
			});

			instance._syncUIAttrs();
		},

		_propagateAttrChange: function(event) {
			var instance = this;
			var attrName = event.attrName;
			var newVal = event.newVal;

			instance.eachRepeatedEvent(function(evt, uid) {
				var propFn = evt[_PROPAGATE_SET+_toInitialCap(attrName)];

				if (propFn) {
					propFn.apply(instance, [evt, attrName, newVal]);
				}
				else {
					evt.set(attrName, event.newVal);
				}

				evt.syncNodeUI();
			});

			instance.syncNodeUI();
		},

		_propagateSetEndDate: function(evt, attrName, val) {
			var endDate = DateMath.clone(evt.get(END_DATE));

			DateMath.copyHours(endDate, val);
			evt.set(END_DATE, endDate);
		},

		_propagateSetStartDate: function(evt, attrName, val) {
			var startDate = DateMath.clone(evt.get(START_DATE));

			DateMath.copyHours(startDate, val);
			evt.set(START_DATE, startDate);
		},

		_setColor: function(val) {
			var instance = this;

			instance[HSB_COLOR] = ColorUtil.rgb2hsb(ColorUtil.getRGB(val));
			instance[BORDER_COLOR] = A.clone(instance[HSB_COLOR]);
			instance[BORDER_COLOR].b *= instance.get(COLOR_BRIGHTNESS_FACTOR);
			instance[BORDER_COLOR].s *= instance.get(COLOR_SATURATION_FACTOR);
			instance[BORDER_COLOR_RGB] = ColorUtil.hsb2rgb(instance[BORDER_COLOR]);

			return val;
		},

		_setDate: function(val) {
			var instance = this;

			if (isNumber(val)) {
				val = new Date(val);
			}

			return val;
		},

		_setRepeat: function(val) {
			var instance = this;

			if (isString(val)) {
				val = A.SchedulerEventRepeat[val];
			}

			return isObject(val) ? val : null;
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

		_syncUIAttrs: function() {
			var instance = this;

			instance._uiSetDisabled(
				instance.get(DISABLED)
			);
			instance._uiSetVisible(
				instance.get(VISIBLE)
			);
			instance._uiSetParentEvent(
				instance.get(PARENT_EVENT)
			);
			instance._uiSetRepeat(
				instance.get(REPEAT)
			);
		},

		_formatDate: function(date, format) {
			var instance = this;
			var locale = instance.get(LOCALE);

			format = format || instance.get(TITLE_DATE_FORMAT);

			return A.DataType.Date.format(date, {
				format: format,
				locale: locale
			});
		},

		_getTitleDateFormat: function(val) {
			var instance = this;

			if (!isString(val)) {
				var scheduler = instance.get(SCHEDULER);

				val = (scheduler && scheduler.get(ACTIVE_VIEW).get(ISO_TIME)) ? TITLE_DT_FORMAT_ISO : TITLE_DT_FORMAT_US;
			}

			return val;
		},

		_uiSetDisabled: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_DISABLED, !!val);
		},

		_uiSetParentEvent: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_REPEATED, !!val);
		},

		_uiSetRepeat: function(val) {
			var instance = this;
			var value = !!val && val !== A.SchedulerEventRepeat[NEVER];

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_REPEATER, value);
		},

		_uiSetVisible: function(val) {
			var instance = this;

			instance.get(NODE).toggleClass(CSS_SCHEDULER_EVENT_HIDDEN, !val);
		}
	}
});

A.SchedulerEvent = SchedulerEvent;
A.SchedulerEventRepeat = {
	never: {
		description: 'Never repeat',
		validate: function(evt, date) {
			return false;
		},
		value: 'never'
	},

	daily: {
		description: 'Every day',
		validate: function(evt, date) {
			return true;
		},
		value: 'daily'
	},

	monthly: {
		description: 'Every month',
		validate: function(evt, date) {
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return (startDate.getDate() === date.getDate());
		},
		value: 'monthly'
	},

	monWedFri: {
		description: 'Every Monday, Wednesday and Friday',
		validate: function(evt, date) {
			return DateMath.isMonWedOrFri(date);
		},
		value: 'monWedFri'
	},

	tuesThurs: {
		description: 'Every Tuesday and Thursday',
		validate: function(evt, date) {
			return DateMath.isTueOrThu(date);
		},
		value: 'tuesThurs'
	},

	weekDays: {
		description: 'Every week days',
		validate: function(evt, date) {
			return DateMath.isWeekDay(date);
		},
		value: 'weekDays'
	},

	weekly: {
		description: 'Every week',
		validate: function(evt, date) {
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return (startDate.getDay() === date.getDay());
		},
		value: 'weekly'
	},

	yearly: {
		description: 'Every year',
		validate: function(evt, date) {
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return ((startDate.getMonth() === date.getMonth()) && (startDate.getDay() === date.getDay()));
		},
		value: 'yearly'
	}

};
var L = A.Lang,
	isArray = L.isArray,
	isObject = L.isObject,

	ACTIVE_VIEW = 'activeView',
	ALL_DAY = 'allDay',
	ARROW = 'arrow',
	BODY = 'body',
	BODY_CONTENT = 'bodyContent',
	BOUNDING_BOX = 'boundingBox',
	CANCEL = 'cancel',
	CLICK = 'click',
	CONTENT = 'content',
	DATE = 'date',
	DATE_FORMAT = 'dateFormat',
	DELETE = 'delete',
	DESCRIPTION = 'description',
	EDIT = 'edit',
	EVENT = 'event',
	EVENT_CLASS = 'eventClass',
	FOOTER_CONTENT = 'footerContent',
	FORM = 'form',
	HEADER = 'header',
	HIDE = 'hide',
	ISO_TIME = 'isoTime',
	LINK = 'link',
	NODE = 'node',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OVERLAY = 'overlay',
	OVERLAY_OFFSET = 'overlayOffset',
	RECORDER = 'recorder',
	RENDERED = 'rendered',
	REPEAT = 'repeat',
	SAVE = 'save',
	SCHEDULER = 'scheduler',
	SCHEDULER_CHANGE = 'schedulerChange',
	SCHEDULER_EVENT = 'scheduler-event',
	SCHEDULER_EVENT_RECORDER = 'scheduler-event-recorder',
	SHADOW = 'shadow',
	SHOW = 'show',
	START_DATE_CHANGE = 'startDateChange',
	STRINGS = 'strings',
	TEMPLATE = 'template',
	TITLE = 'title',
	TL = 'tl',
	TOOLBAR = 'toolbar',
	SUBMIT = 'submit',
	VALUE = 'value',
	VISIBLE_CHANGE = 'visibleChange',
	WHEN = 'when',
	X = 'x',
	Y = 'y',

	EV_SCHEDULER_EVENT_RECORDER_CANCEL = 'cancel',
	EV_SCHEDULER_EVENT_RECORDER_DELETE = 'delete',
	EV_SCHEDULER_EVENT_RECORDER_EDIT = 'edit',
	EV_SCHEDULER_EVENT_RECORDER_SAVE = 'save',

	_DASH = '-',
	_DOT = '.',
	_EMPTY_STR = '',
	_POUND = '#',

	_serialize = A.IO.prototype._serialize,

	getCN = A.getClassName,

	CSS_SCHEDULER_EVENT = getCN(SCHEDULER, EVENT),
	CSS_SCHEDULER_EVENT_RECORDER = getCN(SCHEDULER, EVENT, RECORDER),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_SHADOW = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, ARROW, SHADOW),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_BODY = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, BODY),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_CONTENT = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, CONTENT),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_DATE = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, DATE),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_FORM = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, FORM),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_HEADER = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, HEADER),
	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_REPEAT = getCN(SCHEDULER, EVENT, RECORDER, OVERLAY, REPEAT),
	CSS_SCHEDULER_EVENT_TITLE = getCN(SCHEDULER, EVENT, TITLE),

	TPL_OVERLAY_BODY_CONTENT = new A.Template(
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW_SHADOW, ' ', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW, '"></div>',
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_ARROW, '"></div>',
		'<input type="hidden" name="startDate" value="{startDate}" />',
		'<input type="hidden" name="endDate" value="{endDate}" />',
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_HEADER, '">',
			'<input class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_CONTENT, '" name="content" value="{content}" />',
		'</div>',
		'<div class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_BODY, '">',
			'<label class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_DATE, '">{date}</label>',
			'<select class="', CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_REPEAT, '" name="repeat">',
				'<tpl for="eventRepeat">',
					'<option {[ (parent.repeat && parent.repeat.value) == parent.eventRepeat[$i].value ? \'selected="selected"\' : "" ]} value="{value}">{description}</option>',
				'</tpl>',
			'</select>',
		'</div>'
	),

	TPL_OVERLAY_FORM = '<form class="' + CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_FORM + '" id="schedulerEventRecorderForm"></form>';

var SchedulerEventRecorder = A.Component.create({
	NAME: SCHEDULER_EVENT_RECORDER,

	ATTRS: {
		allDay: {
			value: false
		},

		content: {
			value: _EMPTY_STR
		},

		duration: {
			value: 60
		},

		dateFormat: {
			validator: isString,
			value: '%a, %B %d,'
		},

		event: {
		},

		eventClass: {
			valueFn: function() {
				return A.SchedulerEvent;
			}
		},

		strings: {
			value: {},
			setter: function(val) {
				return A.merge(
					{
						'delete': 'Delete',
						'description-hint': 'e.g., Dinner at Brian\'s',
						'no-repeat': 'No repeat',
						cancel: 'Cancel',
						description: 'Description',
						edit: 'Edit',
						repeat: 'Repeat',
						save: 'Save',
						when: 'When'
					},
					val || {}
				);
			},
			validator: isObject
		},

		overlay: {
			validator: isObject,
			value: {
				align: {
					points: [ TL, TL ]
				},
				visible: false,
				width: 300,
				zIndex: 500
			}
		},

		// See #2530972
		overlayOffset: {
			value: [15, -38],
			validator: isArray
		},

		template: {
			value: TPL_OVERLAY_BODY_CONTENT
		},

		toolbar: {
			setter: function(val) {
				var instance = this;
				var strings = instance.get(STRINGS);

				return A.merge({
					children: [
						{
							handler: A.bind(instance._handleSaveEvent, instance),
							label: strings[SAVE]
						},
						{
							handler: A.bind(instance._handleCancelEvent, instance),
							label: strings[CANCEL]
						},
						{
							handler: A.bind(instance._handleDeleteEvent, instance),
							label: strings[DELETE]
						}
					]
				}, val || {});
			},
			validator: isObject,
			value: {}
		}
	},

	EXTENDS: A.SchedulerEvent,

	prototype: {

		initializer: function() {
			var instance = this;

			instance.get(NODE).addClass(CSS_SCHEDULER_EVENT_RECORDER);

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_CANCEL, {
				defaultFn: instance._defCancelEventFn
			});

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_DELETE, {
				defaultFn: instance._defDeleteEventFn
			});

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_EDIT, {
				defaultFn: instance._defEditEventFn
			});

			instance.publish(EV_SCHEDULER_EVENT_RECORDER_SAVE, {
				defaultFn: instance._defSaveEventFn
			});

			instance.after(SCHEDULER_CHANGE, instance._afterSchedulerChange);

			instance[OVERLAY] = new A.Overlay(instance.get(OVERLAY));
			instance[TOOLBAR] = new A.Toolbar(instance.get(TOOLBAR));
		},

		_afterSchedulerChange: function(event) {
			var instance = this;
			var scheduler = event.newVal;
			var schedulerBB = scheduler.get(BOUNDING_BOX);

			schedulerBB.delegate(CLICK, A.bind(instance._onClickSchedulerEvent, instance), _DOT + CSS_SCHEDULER_EVENT);
		},

		_defCancelEventFn: function(event) {
			var instance = this;

			instance.get(NODE).remove();

			instance.hideOverlay();
		},

		_defDeleteEventFn: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			scheduler.removeEvent(instance.get(EVENT));

			instance.hideOverlay();

			scheduler.syncEventsUI();
		},

		_defEditEventFn: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			instance.hideOverlay();

			scheduler.syncEventsUI();
		},

		_defSaveEventFn: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			scheduler.addEvent(event.newSchedulerEvent);

			instance.hideOverlay();

			scheduler.syncEventsUI();
		},

		_handleCancelEvent: function(event) {
			var instance = this;

			instance.fire(EV_SCHEDULER_EVENT_RECORDER_CANCEL);

			event.preventDefault();
		},

		_handleDeleteEvent: function(event) {
			var instance = this;

			instance.fire(EV_SCHEDULER_EVENT_RECORDER_DELETE, {
				schedulerEvent: instance.get(EVENT)
			});

			event.preventDefault();
		},

		_handleSaveEvent: function(event) {
			var instance = this;

			instance.fire(
				instance.get(EVENT) ? EV_SCHEDULER_EVENT_RECORDER_EDIT : EV_SCHEDULER_EVENT_RECORDER_SAVE,
				{
					newSchedulerEvent: instance.getEventCopy()
				}
			);

			event.preventDefault();
		},

		_onClickSchedulerEvent: function(event) {
			var instance = this;
			var evt = event.currentTarget.getData(SCHEDULER_EVENT);

			if (evt) {
				instance.set(EVENT, evt);
				instance.showOverlay([event.pageX, event.pageY]);

				instance.get(NODE).remove();
			}
		},

		_onOverlayVisibleChange: function(event) {
			var instance = this;

			if (event.newVal) {
				instance.populateForm();

				if (!instance.get(EVENT)) {
					var overlayBB = instance[OVERLAY].get(BOUNDING_BOX);
					var contentNode = overlayBB.one(_DOT + CSS_SCHEDULER_EVENT_RECORDER_OVERLAY_CONTENT);

					setTimeout(function() {
						contentNode.selectText();
					}, 0);
				}
			}
			else {
				instance.set(EVENT, null);

				instance.get(NODE).remove();
			}
		},

		_onSubmitForm: function(event) {
			var instance = this;

			instance._handleSaveEvent(event);
		},

		_renderOverlay: function() {
			var instance = this;
			var strings = instance.get(STRINGS);

			instance[OVERLAY].render();
			instance[TOOLBAR].render();

			var overlayBB = instance[OVERLAY].get(BOUNDING_BOX);
			overlayBB.addClass(CSS_SCHEDULER_EVENT_RECORDER_OVERLAY);

			instance[OVERLAY].set(FOOTER_CONTENT, instance[TOOLBAR].get(BOUNDING_BOX));
			instance[OVERLAY].on(VISIBLE_CHANGE, A.bind(instance._onOverlayVisibleChange, instance));

			instance.formNode = A.Node.create(TPL_OVERLAY_FORM);

			instance[OVERLAY].set(BODY_CONTENT, instance.formNode);

			instance.formNode.on(SUBMIT, A.bind(instance._onSubmitForm, instance));
		},

		getEventCopy: function() {
			var instance = this;
			var newEvt = instance.get(EVENT);

			if (!newEvt) {
				newEvt = new (instance.get(EVENT_CLASS))({
					allDay: instance.get(ALL_DAY),
					endDate: instance.get(END_DATE),
					scheduler: instance.get(SCHEDULER),
					startDate: instance.get(START_DATE)
				});

				// copying propagatable attrs
				newEvt.copyPropagateAttrValues(instance, { content: true });
			}

			var values = instance.serializeForm();

			newEvt.set(CONTENT, values[CONTENT]);
			newEvt.set(REPEAT, values[REPEAT]);

			return newEvt;
		},

		getFormattedDate: function() {
			var instance = this;
			var dateFormat = instance.get(DATE_FORMAT);
			var evt = (instance.get(EVENT) || instance);

			var endDate = evt.get(END_DATE);
			var scheduler = evt.get(SCHEDULER);
			var startDate = evt.get(START_DATE);
			var fmtHourFn = (scheduler.get(ACTIVE_VIEW).get(ISO_TIME) ? DateMath.toIsoTimeString : DateMath.toUsTimeString);

			return [ evt._formatDate(startDate, dateFormat), fmtHourFn(startDate), DASH, fmtHourFn(endDate) ].join(SPACE);
		},

		getTemplateData: function() {
			var instance = this;

			var strings = instance.get(STRINGS);
			var evt = (instance.get(EVENT) || instance);

			return {
				content: evt.get(CONTENT) || strings['description-hint'],
				date: instance.getFormattedDate(),
				endDate: evt.get(END_DATE).getTime(),
				eventRepeat: instance.eventRepeatArray,
				repeat: evt.get(REPEAT),
				startDate: evt.get(START_DATE).getTime()
			};
		},

		hideOverlay: function() {
			var instance = this;

			instance[OVERLAY].hide();
		},

		populateForm: function() {
			var instance = this;

			if (!instance.eventRepeatArray) {
				instance.eventRepeatArray = [];

				A.each(A.SchedulerEventRepeat, function(item) {
					instance.eventRepeatArray.push({
						description: item[DESCRIPTION],
						value: item[VALUE]
					});
				});
			}

			instance.formNode.setContent(
				instance.get(TEMPLATE).parse(instance.getTemplateData())
			);
		},

		serializeForm: function() {
			var instance = this;

			return A.QueryString.parse(_serialize(instance.formNode.getDOM()));
		},

		showOverlay: function(xy, offset) {
			var instance = this;
			var defaultOffset = instance.get(OVERLAY_OFFSET);

			if (!instance[OVERLAY].get(RENDERED)) {
				instance._renderOverlay();
			}

			instance[OVERLAY].show();

			if (!xy) {
				var eventNode = (instance.get(EVENT) || instance).get(NODE);
				var titleNode = eventNode.one(_DOT + CSS_SCHEDULER_EVENT_TITLE);

				offset = [defaultOffset[0] + titleNode.get(OFFSET_WIDTH), defaultOffset[1] + titleNode.get(OFFSET_HEIGHT) / 2];

				xy = titleNode.getXY();
			}

			// Since #2530972 is not yet done, manually putting an offset to the alignment
			offset = offset || defaultOffset;

			xy[0] += offset[0];
			xy[1] += offset[1];

			instance[OVERLAY].set('xy', xy);
		}

	}
});

A.SchedulerEventRecorder = SchedulerEventRecorder;

}, '@VERSION@' ,{skinnable:true, requires:['aui-base','aui-color-util','aui-datatype','aui-template','aui-toolbar','io-form','querystring','overlay']});
AUI.add('aui-scheduler-calendar', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isString = Lang.isString,

	isSchedulerEvent = function(val) {
		return (val instanceof A.SchedulerEvent);
	},

	COLOR = 'color',
	DISABLED = 'disabled',
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
			instance.after('disabledChange', instance._afterDisabledChange);
			instance.after('eventsChange', instance._afterEventsChange);
			instance.after('visibleChange', instance._afterVisibleChange);

			instance._uiSetColor(
				instance.get(COLOR)
			);

			instance._uiSetDisabled(
				instance.get(DISABLED)
			);

			instance._uiSetEvents(
				instance.get(EVENTS)
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

			instance._uiSetEvents(event.newVal);
		},

		_afterVisibleChange: function(event) {
			var instance = this;

			instance._uiSetVisible(event.newVal);
		},

		_propagateAttr: function(attrName, attrValue) {
			var instance = this;

			instance.eachEvent(function(evt) {
				evt.set(attrName, attrValue);
			});
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

		_uiSetColor: function(val) {
			var instance = this;

			instance._propagateAttr(COLOR, instance.get(COLOR));
		},

		_uiSetDisabled: function(val) {
			var instance = this;

			instance._propagateAttr(DISABLED, val);
		},

		_uiSetEvents: function(val) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			instance._propagateAttr(COLOR, instance.get(COLOR));
			instance._propagateAttr(DISABLED, instance.get(DISABLED));
			instance._propagateAttr(VISIBLE, instance.get(VISIBLE));

			if (scheduler) {
				scheduler.removeEvents(instance);
				scheduler.addEvents(val);
				scheduler.syncEventsUI();
			}
		},

		_uiSetVisible: function(val) {
			var instance = this;

			instance._propagateAttr(VISIBLE, val);
		}
	}
});

A.SchedulerCalendar = SchedulerCalendar;

}, '@VERSION@' ,{requires:['aui-scheduler-event'], skinnable:false});


AUI.add('aui-scheduler', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-scheduler-base','aui-scheduler-view','aui-scheduler-event','aui-scheduler-calendar']});

