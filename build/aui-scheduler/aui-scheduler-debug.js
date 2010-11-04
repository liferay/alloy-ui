AUI.add('aui-scheduler-base', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,
	isObject = Lang.isObject,
	isArray = Lang.isArray,
	isDate = Lang.isDate,
	isNumber = Lang.isNumber,

	isSchedulerView = function(val) {
		return (val instanceof A.SchedulerView);
	},

	isSchedulerEvent = function(val) {
		return (val instanceof A.SchedulerEvent);
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


var SchedulerBase = A.Component.create({
	NAME: SCHEDULER_BASE,

	ATTRS: {
		activeView: {
			validator: isSchedulerView
		},

		eventRecorder: {
			setter: '_setEventRecorder'
		},

		events: {
			value: [],
			setter: '_setEvents',
			validator: isArray
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

		addEvent: function(evt) {
			var instance = this;
			var events = instance.get(EVENTS);

			if (A.Array.indexOf(events, evt) > -1) {
				A.Array.removeItem(events, evt);
			}

			events.push(evt);
			instance.set(EVENTS, events);
		},

		removeEvent: function(evt) {
			var instance = this;
			var events = instance.get(EVENTS);

			A.Array.removeItem(events, evt);

			instance.set(EVENTS, events);
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

		_setEvents: function(val) {
			var instance = this;
			var events = [];

			A.Array.each(val, function(evt, i) {
				if (!isSchedulerEvent(evt)) {
					evt = new A.SchedulerEvent(evt);
				}

				evt.set(SCHEDULER, instance);

				events.push(evt);
			});

			return events;
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

A.Scheduler = A.Base.create(SCHEDULER_BASE, SchedulerBase, [A.WidgetStdMod]);

}, '@VERSION@' ,{requires:['aui-scheduler-view','datasource'], skinnable:true});
AUI.add('aui-scheduler-view', function(A) {
var Lang = A.Lang,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,

	signum = function(x) {
	  return x == 0 ? 0 : (x < 0 ? -1 : 1);
	},

	maxAbs = function(x, n) {
	  return Math.max(Math.abs(x), n) * signum(x);
	},

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
	SCHEDULER_VIEW_WEEK = 'scheduler-view-week',
	SCHEDULER_VIEW_MONTH = 'scheduler-view-month',

	ACTIVE_VIEW = 'activeView',
	AM = 'am',
	BOUNDING_BOX = 'boundingBox',
	CHILDREN = 'children',
	CHILD_NODES = 'childNodes',
	COL = 'col',
	COLBLANK = 'colblank',
	COLDATA = 'coldata',
	COLDAY = 'colday',
	COLMONTH = 'colmonth',
	COLGRID = 'colgrid',
	COLSPAN = 'colspan',
	NAVIGATION_DATE_FORMAT = 'navigationDateFormat',
	COLTIME = 'coltime',
	COL_DAYS_NODE = 'colDaysNode',
	COL_HEADER_DAYS_NODE = 'colHeaderDaysNode',
	CONTAINER = 'container',
	CONTENT_BOX = 'contentBox',
	CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
	CURRENT_DATE = 'currentDate',
	DATE_FORMAT = 'dateFormat',
	DAY = 'day',
	DAYS = 'days',
	DIVISION = 'division',
	END_DATE = 'endDate',
	EVENTS = 'events',
	FIRST = 'first',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	GRID = 'grid',
	HD = 'hd',
	HEADER = 'header',
	HEADER_TABLE_NODE = 'headerTableNode',
	HOUR_HEIGHT = 'hourHeight',
	ISO_TIME = 'isoTime',
	LABEL_AM = 'labelAM',
	LABEL_PM = 'labelPM',
	LEFT = 'left',
	LOCALE = 'locale',
	MARKER = 'marker',
	MARKERCELL = 'markercell',
	MARKERCELLS_NODE = 'markercellsNode',
	MARKERCELL_NODE = 'markercellNode',
	MARKERS = 'markers',
	NEXT_DATE = 'nextDate',
	NODE = 'node',
	OFFSET_HEIGHT = 'offsetHeight',
	OWNER_DOCUMENT = 'ownerDocument',
	PAD = 'pad',
	PARENT_NODE = 'parentNode',
	PM = 'pm',
	PREV_DATE = 'prevDate',
	PX = 'px',
	RENDERED = 'rendered',
	RIGHT = 'right',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'scheduler-event',
	SCROLLABLE = 'scrollable',
	SHIM = 'shim',
	START_DATE = 'startDate',
	TABLE = 'table',
	TABLE_COL_NODE = 'tableColNode',
	TABLE_NODE = 'tableNode',
	TABLE_TIME_NODE = 'tableTimeNode',
	TIME = 'time',
	TIMES_NODE = 'timesNode',
	TODAY = 'today',
	TOP = 'top',
	TR = 'tr',
	WEEK = 'week',
	WIDTH = 'width',
	BORDER_RIGHT_WIDTH = 'borderRightWidth',
	BORDER_LEFT_WIDTH = 'borderLeftWidth',
	COLUMN_NODE = 'columnNode',
	PROXY = 'proxy',
	DRAG_NODE = 'dragNode',
	TITLE = 'title',
	HOST = 'host',
	OFFSET_TOP = 'offsetTop',
	OFFSET_WIDTH = 'offsetWidth',
	PARENT_EVENT = 'parentEvent',
	CONTENT = 'content',
	MONTH = 'month',
	HEADER_DATE_FORMAT = 'headerDateFormat',
	MONTH_CONTAINER_NODE = 'monthContainerNode',
	ROW = 'row',
	HEIGHT = 'height',
	TABLE_GRID_NODE = 'tableGridNode',
	DIV = 'div',
	NOSCROLL = 'noscroll',
	DATA = 'data',
	TABLE_DATA_NODE = 'tableDataNode',
	TBODY = 'tbody',
	NOMONTH = 'nomonth',
	EVENT = 'event',
	NEXT = 'next',
	DOWN = 'down',
	TD = 'td',
	REPEATED = 'repeated',
	ICON = 'icon',
	EVENT_WIDTH = 'eventWidth',
	EVENT_RECORDER = 'eventRecorder',
	DURATION = 'duration',

	// #cons

	DASH = '-',
	ANCHOR = 'a',
	DOT = '.',
	EMPTY_STR = '',
	PERCENT = '%',
	SPACE = ' ',

	getCN = A.ClassNameManager.getClassName,

	CSS_SCHEDULER_VIEW_NOSCROLL = getCN(SCHEDULER_VIEW, NOSCROLL),
	CSS_SCHEDULER_VIEW_SCROLLABLE = getCN(SCHEDULER_VIEW, SCROLLABLE);

var SchedulerView = A.Component.create({
	NAME: SCHEDULER_VIEW,

	ATTRS: {
		bodyContent: {
			value: EMPTY_STR
		},

		height: {
			value: 600
		},

		name: {
			value: EMPTY_STR,
			validator: isString
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
			value: '%A - %d %b %Y',
			validator: isString
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

		plotEvents: function(events) {
		},

		syncStdContent: function() {
		},

		syncEventUI: function(evt) {
		},

		_uiSetCurrentDate: function(val) {
		},

		_afterRender: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

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

A.SchedulerView = A.Base.create(SCHEDULER_VIEW, SchedulerView, [A.WidgetStdMod]);
var getNodeListHTMLParser = function(selector, sizeCondition) {
		return function(srcNode) {
			var nodes = srcNode.all(selector);

			return (nodes.size() >= sizeCondition) ? nodes : null;
		};
	},

	// EV_SCHEDULER_VIEW_EVENT_INTERSECT = 'scheduler-view:eventIntersect',

	// CSS_SCHEDULER_EVENT_TITLE = getCN(SCHEDULER_EVENT, TITLE),
	CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
	CSS_SCHEDULER_EVENT_PROXY = getCN(SCHEDULER_EVENT, PROXY),
	CSS_SCHEDULER_VIEW_DAY_COLDATA = getCN(SCHEDULER_VIEW, COLDATA),
	CSS_SCHEDULER_VIEW_DAY_COLGRID = getCN(SCHEDULER_VIEW, COLGRID),
	CSS_SCHEDULER_TODAY = getCN(SCHEDULER, TODAY),
	CSS_SCHEDULER_TODAY_HD = getCN(SCHEDULER, TODAY, HD),
	CSS_SCHEDULER_VIEW_DAY_GRID = getCN(SCHEDULER_VIEW, GRID),
	CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER = getCN(SCHEDULER_VIEW, GRID, CONTAINER),
	CSS_SCHEDULER_VIEW_DAY_MARKERCELL = getCN(SCHEDULER_VIEW, MARKERCELL),
	CSS_SCHEDULER_VIEW_DAY_MARKERS = getCN(SCHEDULER_VIEW, MARKERS),
	CSS_SCHEDULER_VIEW_DAY_MARKER_DIVISION = getCN(SCHEDULER_VIEW, MARKER, DIVISION),
	CSS_SCHEDULER_VIEW_DAY_TABLE = getCN(SCHEDULER_VIEW, TABLE),

	CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE = getCN(SCHEDULER_VIEW, DAY, HEADER, TABLE),
	CSS_SCHEDULER_VIEW_DAY_HEADER_DAY = getCN(SCHEDULER_VIEW, DAY, HEADER, DAY),
	CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_PAD_RIGHT = getCN(SCHEDULER_VIEW, DAY, HEADER, DAY, PAD, RIGHT),
	CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST = getCN(SCHEDULER_VIEW, DAY, HEADER, DAY, FIRST),
	CSS_SCHEDULER_VIEW_DAY_HEADER_COL = getCN(SCHEDULER_VIEW, DAY, HEADER, COL),

	CSS_SCHEDULER_VIEW_DAY_TABLE_COL = getCN(SCHEDULER_VIEW, TABLE, COL),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM = getCN(SCHEDULER_VIEW, TABLE, COL, SHIM),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COLBLANK = getCN(SCHEDULER_VIEW, TABLE, COLBLANK),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY = getCN(SCHEDULER_VIEW, TABLE, COLDAY),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY_HEADER = getCN(SCHEDULER_VIEW, TABLE, COLDAY, HEADER),
	CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME = getCN(SCHEDULER_VIEW, TABLE, COLTIME),
	CSS_SCHEDULER_VIEW_DAY_TABLE_TIME = getCN(SCHEDULER_VIEW, TABLE, TIME),

	TPL_SCHEDULER_VIEW_DAY_MARKERCELL = '<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKERCELL + '">' +
											'<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKER_DIVISION + '"></div>' +
										 '</div>',

	TPL_SCHEDULER_VIEW_DAY_TABLE = 	'<table class="' + CSS_SCHEDULER_VIEW_DAY_TABLE + '">' +
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

	TPL_SCHEDULER_VIEW_DAY_TABLE_COLDAY = '<td class="' + [ CSS_SCHEDULER_VIEW_DAY_TABLE_COL, CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY ].join(SPACE) + '">' +
												'<div class="' + CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM + '"></div>' +
											'</td>',

	TPL_SCHEDULER_VIEW_DAY_TABLE_TIME = '<div class="' + CSS_SCHEDULER_VIEW_DAY_TABLE_TIME + '">{hour}</div>',

	TPL_SCHEDULER_VIEW_DAY_HEADER_TABLE = '<table class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE + '">' +
											'<tbody>' +
												'<tr class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_COL + '"></tr>' +
											'</tbody>' +
										 '</table>',

	TPL_SCHEDULER_VIEW_DAY_HEADER_DAY = '<th class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_DAY + '"><a href="#">&nbsp;</a></th>',
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

		headerDateFormat: {
			value: '%a %d/%m',
			validator: isString
		},

		isoTime: {
			value: false,
			validator: isBoolean
		},

		name: {
			value: DAY
		},

		hourHeight: {
			value: 52,
			validator: isNumber
		},

		eventWidth: {
			value: 95,
			validator: isNumber
		},

		/*
		* HTML_PARSER attributes
		*/
		headerTableNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEW_DAY_HEADER_TABLE);
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
		colHeaderDaysNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_DAY, 2),
		colDaysNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY, 1),
		markercellsNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_MARKERCELL, 24),
		timesNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_TIME, 24),
		headerTableNode: DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE,
		tableNode: DOT+CSS_SCHEDULER_VIEW_DAY_TABLE
	},

	EXTENDS: A.SchedulerView,

	prototype: {
		initializer: function() {
			var instance = this;

			// instance._createEvents();

			instance.colDaysNode = instance.get(COL_DAYS_NODE);
			instance.colHeaderDaysNode = instance.get(COL_HEADER_DAYS_NODE);
			instance.headerTableNode = instance.get(HEADER_TABLE_NODE);
			instance.markercellsNode = instance.get(MARKERCELLS_NODE);
			instance.tableNode = instance.get(TABLE_NODE);
			instance.timesNode = instance.get(TIMES_NODE);

			instance.colShimNodes = instance.colDaysNode.all(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM);
			instance.colDataNode = instance.tableNode.one(DOT+CSS_SCHEDULER_VIEW_DAY_COLDATA);
			instance.colTimeNode = instance.tableNode.one(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME);
			instance.dayHeaderColNode = instance.headerTableNode.one(DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_COL);
			instance.gridContainer = instance.tableNode.one(DOT+CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER);
			instance.markersNode = instance.tableNode.one(DOT+CSS_SCHEDULER_VIEW_DAY_MARKERS);
		},

		renderUI: function() {
			var instance = this;

			instance.colTimeNode.setContent(instance.timesNode);
			instance.markersNode.setContent(instance.markercellsNode);
			instance.colDaysNode.appendTo(instance.colDataNode);
			instance.colHeaderDaysNode.appendTo(instance.dayHeaderColNode);
		},

		bindUI: function() {
			var instance = this;

			instance.headerTableNode.delegate('click', A.bind(instance._onClickDaysHeader, instance), DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_DAY);
			instance.colDataNode.delegate('click', A.bind(instance._onClickTableCol, instance), DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL);
			instance.colDataNode.delegate('mousedown', A.bind(instance._onMouseDownTableCol, instance), DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL);
			instance.colDataNode.delegate('mouseup', A.bind(instance._onMouseUpTableCol, instance), DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL);
			instance.colDataNode.delegate('mousemove', A.bind(instance._onMouseMoveTableCol, instance), DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL);

			instance.on('drag:end', instance._onEventDragEnd);
			instance.on('drag:start', instance._onEventDragStart);
			instance.on('drag:align', instance._dragAlign);
			instance.on('drag:tickAlignX', instance._dragTickAlignX);
			instance.on('drag:tickAlignY', instance._dragTickAlignY);
		},

		syncUI: function() {
			var instance = this;

			SchedulerDayView.superclass.syncUI.apply(this, arguments);

			instance.gridContainer.attr(COLSPAN, instance.get(DAYS));

			instance._setupDragDrop();
		},

		syncStdContent: function() {
			var instance = this;

			instance.setStdModContent(WidgetStdMod.BODY, instance.tableNode.getDOM());
			instance.setStdModContent(WidgetStdMod.HEADER, instance.headerTableNode.getDOM());
		},

		calculateTopByDate: function(date) {
			var instance = this;
			var hourHeight = instance.get(HOUR_HEIGHT);

			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds();

			return ((hours*60) + minutes + (seconds/60)) * (hourHeight/60);
		},

		calculateHoursByTop: function(top) {
			var instance = this;
			var hourHeight = instance.get(HOUR_HEIGHT);
			var prop = toNumber((top/hourHeight).toFixed(2));

			// isolate the decimals and convert to minutes: (prop*100)%100*0.6
			var seconds = 0;
			var minutes = Math.floor((prop*100)%100*0.6);
			var hours = Math.floor(prop);

			return [ hours, minutes, seconds ];
		},

		getNextDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);

			return DateMath.add(currentDate, DateMath.DAY, 1);
		},

		getPrevDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);

			return DateMath.subtract(currentDate, DateMath.DAY, 1);
		},

		getColumnByDate: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = DateMath.safeClearTime(scheduler.get(CURRENT_DATE));
			var daysOffset = DateMath.getDayOffset(DateMath.safeClearTime(date), currentDate);

			return instance.colDaysNode.item(daysOffset);
		},

		getDateByColumn: function(columnNumber) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = DateMath.safeClearTime(scheduler.get(CURRENT_DATE));

			return DateMath.add(currentDate, DateMath.DAY, columnNumber);
		},

		plotEvents: function(events) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			instance.colShimNodes.each(
				function(colShimNode, i) {
					var columnDate = instance.getDateByColumn(i);
					var columnEvents = scheduler.getEventsByDay(columnDate);

					colShimNode.empty();

					A.Array.each(columnEvents, function(evt, j) {
						if (!evt.isDayOverlapEvent()) {
							colShimNode.append(
								evt.get(NODE)
							);

							evt.set(COLUMN_NODE, colShimNode.get(PARENT_NODE));

							instance.syncEventTopUI(evt);
							instance.syncEventHeightUI(evt);
						}
					});

					instance.syncEventsIntersectionUI(columnEvents);
				}
			);
		},

		syncColumnsUI: function() {
			var instance = this;

			instance.colDaysNode.each(function(columnNode, i) {
				var columnDate = instance.getDateByColumn(i);

				columnNode.toggleClass(CSS_SCHEDULER_TODAY, DateMath.isToday(columnDate));
			});
		},

		syncDaysHeaderUI: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var dateFormat = instance.get(HEADER_DATE_FORMAT);
			var locale = instance.get(LOCALE);

			instance.colHeaderDaysNode.all(ANCHOR).each(
				function(columnNode, i) {
					var columnDate = DateMath.add(currentDate, DateMath.DAY, i);
					var formatted = A.DataType.Date.format(columnDate, { format: dateFormat, locale: locale });

					columnNode.toggleClass(CSS_SCHEDULER_TODAY_HD, DateMath.isToday(columnDate));

					columnNode.html(formatted);
				}
			);
		},

		syncEventsIntersectionUI: function(columnEvents) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var eventWidth = instance.get(EVENT_WIDTH);

			scheduler.flushEvents();

			A.Array.each(columnEvents, function(colEvt, i) {
				var intercessors = instance.findEventIntersections(colEvt, columnEvents);
				var total = intercessors.length;
				var distributionRate = (eventWidth/total);

				A.Array.each(intercessors, function(evt, j) {
					var evtNode = evt.get(NODE);
					var left = distributionRate*j;
					// increase the width 70% to cause the cascade impression
					var width = distributionRate*1.7;

					// for the last event fix the width
					if (j == (total - 1)) {
						width = eventWidth - left;
					}

					evtNode.setStyle(WIDTH, width+PERCENT);
					evtNode.setStyle(LEFT, left+PERCENT);

					// re-append nodes to correct the z-index
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
			var hourHeight = instance.get(HOUR_HEIGHT);
			var top = instance.calculateTopByDate(evt.get(START_DATE));
			var bottom = instance.calculateTopByDate(evt.get(END_DATE));

			evt.get(NODE).set(OFFSET_HEIGHT, Math.max(bottom-top, hourHeight/2));
		},

		syncEventRecorderUI: function(columnNode) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var eventRecorder = scheduler.get(EVENT_RECORDER);
			var eventRecorderNode = eventRecorder.get(NODE);

			if (columnNode && !eventRecorderNode.inDoc()) {
				columnNode.append(eventRecorderNode);
			}

			instance.syncEventTopUI(eventRecorder);
			instance.syncEventHeightUI(eventRecorder);
		},

		syncEventTopUI: function(evt) {
			var instance = this;
			var evtNode = evt.get(NODE);
			var top = instance.calculateTopByDate(evt.get(START_DATE));

			evtNode.setStyle(TOP, top + PX);
		},

		findEventIntersections: function(evt, events) {
			var instance = this;
			var group = [];

			A.Array.each(events, function(evtCmp, j) {
				if (!evt._filtered && !evtCmp.isDayOverlapEvent() && evt.intersectHours(evtCmp)) {
					group.push(evtCmp);
				}
			});

			return group;
		},

	    /**
	     * Create the custom events used on the Resize.
	     *
	     * @method _createEvents
	     * @private
	     */
		_createEvents: function() {
			var instance = this;

			// create publish function for kweight optimization
			var publish = function(name, fn) {
				instance.publish(name, {
		            defaultFn: fn,
		            queuable: false,
		            emitFacade: true,
		            bubbles: true,
		            prefix: SCHEDULER_VIEW
		        });
			};

			// publish(
			// 	EV_SCHEDULER_VIEW_EVENT_INTERSECT,
			// 	this._defEventIntersectFn
			// );
		},

		_dragTickAlignX: function(event) {
			var instance = this;
			var dd = event.target.get(HOST);
			var tickX = instance._getColumnRefWidth();
			var node = dd.get(NODE);
			var proxyEvt = instance.proxyEvt;
			var currentEvt = node.getData(SCHEDULER_EVENT);
			var evtActXY = (dd.actXY[0] - instance.bodyNode.getX() - instance.colTimeNode.get(OFFSET_WIDTH));

			var columnNumber = Math.floor(evtActXY/tickX);
			var columnNode = instance.colDaysNode.item(columnNumber);
			var columnDate = instance.getDateByColumn(columnNumber);

			var proxyStartDate = DateMath.clone(columnDate);
			var proxyEndDate = DateMath.clone(columnDate);

			// update proxyEvt with the columnDate to update correct the UI if needed
			DateMath.copyHours(proxyEndDate, proxyEvt.get(END_DATE));
			DateMath.copyHours(proxyStartDate, proxyEvt.get(START_DATE));

			proxyEvt.set(END_DATE, proxyEndDate);
			proxyEvt.set(START_DATE, proxyStartDate);

			// TODO
			// columnNode.append(proxyEvt.get(NODE));
		},

		_dragTickAlignY: function(event) {
			var instance = this;
			var dd = event.target.get(HOST);
			var node = dd.get(NODE);
			var proxyEvt = instance.proxyEvt;
			var currentEvt = node.getData(SCHEDULER_EVENT);

			var proxyStartDate = DateMath.clone(proxyEvt.get(START_DATE));

			var hourMinSec = instance.calculateHoursByTop(
				toNumber(dd.get(DRAG_NODE).getComputedStyle(TOP))
				// toNumber(dd.get(DRAG_NODE).get(OFFSET_TOP))
			);

			instance._setTickedHours(proxyStartDate, hourMinSec);

			var proxyEndDate = DateMath.clone(proxyStartDate);
			proxyEvt.set(END_DATE, DateMath.add(proxyEndDate, DateMath.MINUTES, instance._currentEvtDuration));
			proxyEvt.set(START_DATE, proxyStartDate);
			proxyEvt.syncNodeTitleUI();
		},

		_getXYDelta: function(event) {
			var instance = this;
			var currentTarget = event.currentTarget;
			var xy = currentTarget.getXY(), pageXY = [event.pageX, event.pageY];

			return A.Array.map(xy, function(val, i) {
				return (pageXY[i] - val);
			});
		},

		_getTickY: function() {
			var instance = this;

			return roundToNearestMultiple(Math.ceil(instance.get(HOUR_HEIGHT) / 2), 10);
		},

		_getColumnRefWidth: function() {
			var instance = this;
			var columnRef = instance.colDaysNode.item(0);

			return toNumber(columnRef.getStyle(WIDTH)) -
					toNumber(columnRef.getStyle(BORDER_RIGHT_WIDTH)) -
					toNumber(columnRef.getStyle(BORDER_LEFT_WIDTH));
		},

		_setupDragDrop: function() {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);

			if (!instance.proxyEvt) {
				var scheduler = instance.get(SCHEDULER);

				instance.proxyEvt = new A.SchedulerEvent({
					scheduler: scheduler
				});

				instance.proxyEvt.removeTarget(scheduler);

				instance.proxyEvt.get(NODE).addClass(CSS_SCHEDULER_EVENT_PROXY);
			}

			if (!instance.delegate) {
				instance.delegate = new A.DD.Delegate({
					bubbleTargets: instance,
					container: boundingBox,
					// handles: [DOT+CSS_SCHEDULER_EVENT_TITLE],
					nodes: DOT+CSS_SCHEDULER_EVENT
				});
			}

			var dd = instance.delegate.dd;
			var proxyEvt = instance.proxyEvt;

			var tickY = instance.get(HOUR_HEIGHT) / 2;
			var tickX = instance._getColumnRefWidth();

			dd.unplug(A.Plugin.DDConstrained);
			dd.unplug(A.Plugin.DDNodeScroll);

			dd.plug(A.Plugin.DDConstrained, {
				bubbleTargets: instance,
				constrain: instance.bodyNode,
				tickX: tickX,
				tickY: tickY
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
				// find the number of the clicked column -- ignores the first padding <td>, so add +1 to add this to the calculation.
				var columnNumber = instance.colHeaderDaysNode.indexOf( event.currentTarget ) - 1;

				if (dayView) {
					scheduler.set(
						CURRENT_DATE,
						instance.getDateByColumn(columnNumber)
					);

					scheduler.set(ACTIVE_VIEW, dayView);
				}
			}

			event.preventDefault();
		},

		_onClickTableCol: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var eventRecorder = scheduler.get(EVENT_RECORDER);

		},

		_onEventDragEnd: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var boundingBox = instance.get(BOUNDING_BOX);
			var dd = instance.delegate.dd;
			var node = dd.get(NODE);
			var proxyEvt = instance.proxyEvt;
			var proxyEvtNode = proxyEvt.get(NODE);
			var currentEvt = node.getData(SCHEDULER_EVENT);

			node.show();
			proxyEvtNode.hide();
			boundingBox.selectable();

			// update startDate and endDate with the latest values of the proxyEvt, including the hours, min, sec...
			currentEvt.copyDates(proxyEvt);

			scheduler.syncEventsUI();
		},

		_onEventDragStart: function(event) {
			var instance = this;
			var boundingBox = instance.get(BOUNDING_BOX);
			var dd = instance.delegate.dd;
			var node = dd.get(NODE);
			var proxyEvt = instance.proxyEvt;
			var currentEvt = node.getData(SCHEDULER_EVENT);

			// if the node is not on left:0 of the column, correct the deltaXY to respect the tickX, it offsets the node to the left:0 when drag start.
			var left = toNumber(node.getComputedStyle(LEFT));

			if (left) {
				dd.deltaXY[0] = (left + toNumber(dd.deltaXY[0]));
			}

			if (currentEvt) {
				var evtColumnNode = currentEvt.get(COLUMN_NODE);
				var proxyEvtNode = proxyEvt.get(NODE);

				dd.set(DRAG_NODE, proxyEvtNode);
				evtColumnNode.append(proxyEvtNode);

				proxyEvt.copyPropagateAttrValues(currentEvt);

				instance.syncEventTopUI(proxyEvt);
				instance.syncEventHeightUI(proxyEvt);
				proxyEvtNode.show();

				instance._currentEvtDuration = currentEvt.getMinutesDuration();
			}

			node.hide();
			boundingBox.unselectable();
		},

		_onMouseDownTableCol: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var eventRecorder = scheduler.get(EVENT_RECORDER);

			if (eventRecorder) {
				eventRecorder.hideOverlay();

				if (event.target.test(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM)) {
					var columnNumber = instance.colDaysNode.indexOf(event.currentTarget);

					instance.dragXY = instance.startXY = instance._getXYDelta(event);
					instance.ddStartDate = instance.getDateByColumn(columnNumber);
					instance.ddEndDate = DateMath.clone(instance.ddStartDate);

					instance._setTickedHours(
						instance.ddStartDate,
						instance.calculateHoursByTop(instance.startXY[1])
					);

					instance.ddMaxDate = DateMath.clone(instance.ddStartDate);
					instance.ddMaxDate.setHours(23, 59, 59);

					eventRecorder.set(START_DATE, instance.ddStartDate);
					eventRecorder.set(END_DATE, instance.limitDate(eventRecorder.get(END_DATE), instance.ddMaxDate));

					event.halt();
				}
			}
		},

		_onMouseMoveTableCol: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var eventRecorder = scheduler.get(EVENT_RECORDER);
			var ddStartDt = instance.ddStartDate;

			if (ddStartDt) {
				instance.dragXY = instance._getXYDelta(event);

				instance._setTickedHours(
					instance.ddEndDate,
					instance.calculateHoursByTop(instance.dragXY[1])
				);

				var mDelta = DateMath.getMinutesOffset(instance.ddEndDate, ddStartDt);

				// If the drag moviment is going down, don't allow the event duration be smaller than the specified duration
				if ((instance.dragXY[1] - instance.startXY[1]) > 0) {
					mDelta = maxAbs(mDelta, eventRecorder.get(DURATION));
				}

				var offsetDate = instance.limitDate(
					DateMath.add(ddStartDt, DateMath.MINUTES, mDelta),
					instance.ddMaxDate
				);

				if (mDelta > 0) {
					eventRecorder.set(END_DATE, offsetDate);
				}
				else {
					var lastEndDate = eventRecorder.get(END_DATE);
					eventRecorder.set(START_DATE, offsetDate);
					eventRecorder.set(END_DATE, lastEndDate);
				}

				instance.syncEventRecorderUI(event.currentTarget);
			}
		},

		_onMouseUpTableCol: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var eventRecorder = scheduler.get(EVENT_RECORDER);

			if (eventRecorder) {
				if (instance.ddStartDate) {
					instance.syncEventRecorderUI(event.currentTarget);

					eventRecorder.showOverlay();
				}

				instance.ddEndDate = null;
				instance.ddStartDate = null;
			}
		},

		_setTickedHours: function(date, hourMinSec) {
			var instance = this;

			date.setHours(
				hourMinSec[0],
				roundToNearestMultiple(hourMinSec[1], instance._getTickY()),
				hourMinSec[2]
			);
		},

		_valueColDaysNode: function() {
			var instance = this;
			var days = instance.get(DAYS);
			var buffer = [];

			while (days--) {
				buffer.push(TPL_SCHEDULER_VIEW_DAY_TABLE_COLDAY);
			}

			return A.NodeList.create(buffer.join(EMPTY_STR));
		},

		_valueColHeaderDaysNode: function() {
			var instance = this;
			var days = instance.get(DAYS);
			var buffer = [];

			buffer.push(TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST);

			while (days--) {
				buffer.push(TPL_SCHEDULER_VIEW_DAY_HEADER_DAY);
			}

			buffer.push(TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_PAD_RIGHT);

			return A.NodeList.create(buffer.join(EMPTY_STR));
		},

		_valueMarkercellsNode: function() {
			var instance = this;
			var buffer = [];

			for (var i = 0; i <= 23; i++) {
				buffer.push(TPL_SCHEDULER_VIEW_DAY_MARKERCELL);
			}

			return A.NodeList.create(buffer.join(EMPTY_STR));
		},

		_valueTimesNode: function() {
			var instance = this;
			var isoTime = instance.get(ISO_TIME);
			var buffer = [];

			for (var hour = 0; hour <= 23; hour++) {
				buffer.push(
					A.substitute(
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

		name: {
			value: WEEK
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
		}
	}
});

A.SchedulerWeekView = SchedulerWeekView;
var	CSS_SVM_CONTAINER = getCN(SCHEDULER_VIEW, MONTH, CONTAINER),
	CSS_SVM_HEADER_COL = getCN(SCHEDULER_VIEW, MONTH, HEADER, COL),
	CSS_SVM_HEADER_DAY = getCN(SCHEDULER_VIEW, MONTH, HEADER, DAY),
	CSS_SVM_HEADER_TABLE = getCN(SCHEDULER_VIEW, MONTH, HEADER, TABLE),
	CSS_SVM_ROW = getCN(SCHEDULER_VIEW, MONTH, ROW),
	CSS_SVM_ROW_CONTAINER = getCN(SCHEDULER_VIEW, MONTH, ROW, CONTAINER),

	CSS_ICON = getCN(ICON),
	CSS_ICON_ARROWSTOP_LEFT = getCN(ICON, 'arrowstop-1-l'),
	CSS_ICON_ARROWSTOP_RIGHT = getCN(ICON, 'arrowstop-1-r'),
	CSS_SVM_COLGRID = getCN(SCHEDULER_VIEW, MONTH, COLGRID),
	CSS_SVM_COLGRID_TODAY = getCN(SCHEDULER_VIEW, MONTH, COLGRID, TODAY),
	CSS_SVM_COLGRID_FIRST = getCN(SCHEDULER_VIEW, MONTH, COLGRID, FIRST),
	CSS_SVM_TABLE_DATA = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA),
	CSS_SVM_TABLE_DATA_FIRST = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, FIRST),
	CSS_SVM_TABLE_DATA_COL = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL),
	CSS_SVM_TABLE_DATA_COL_FIRST = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, FIRST),
	CSS_SVM_TABLE_DATA_COL_NOMONTH = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, NOMONTH),
	CSS_SVM_TABLE_DATA_COL_TITLE = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, TITLE),
	CSS_SVM_TABLE_DATA_COL_TITLE_TODAY = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, TITLE, TODAY),
	CSS_SVM_TABLE_DATA_COL_TITLE_FIRST = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, TITLE, FIRST),
	CSS_SVM_TABLE_DATA_COL_TITLE_NEXT = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, TITLE, NEXT),
	CSS_SVM_TABLE_DATA_COL_TITLE_DOWN = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, TITLE, DOWN),
	CSS_SVM_TABLE_DATA_EVENT = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, EVENT),
	CSS_SVM_TABLE_DATA_EVENT_LEFT = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, EVENT, LEFT),
	CSS_SVM_TABLE_DATA_EVENT_RIGHT = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, EVENT, RIGHT),
	CSS_SVM_TABLE_DATA_EVENT_REPEATED = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, EVENT, REPEATED),
	CSS_SVM_TABLE_GRID = getCN(SCHEDULER_VIEW, MONTH, TABLE, GRID),
	CSS_SVM_TABLE_GRID_FIRST = getCN(SCHEDULER_VIEW, MONTH, TABLE, GRID, FIRST),

	CSS_SVM_TABLE_COLDAY_HEADER = getCN(SCHEDULER_VIEW, TABLE, COLMONTH, HEADER),

	TPL_SVM_HEADER_TABLE = '<table class="' + CSS_SVM_HEADER_TABLE + '">' +
								'<tbody>' +
									'<tr class="' + CSS_SVM_HEADER_COL + '"></tr>' +
								'</tbody>' +
							 '</table>',

	TPL_SVM_HEADER_DAY = '<th class="' + CSS_SVM_HEADER_DAY + '"><div>&nbsp;</div></th>',

	TPL_SVM_CONTAINER = '<div class="' + CSS_SVM_CONTAINER + '">' +
							'<div class="' + CSS_SVM_ROW_CONTAINER + '">' +
								'<div class="' + CSS_SVM_ROW + '" style="top: 0; height: 16.6667%;"></div>' +
								'<div class="' + CSS_SVM_ROW + '" style="top: 16.6667%; height: 16.6667%;"></div>' +
								'<div class="' + CSS_SVM_ROW + '" style="top: 33.3333%; height: 16.6667%;"></div>' +
								'<div class="' + CSS_SVM_ROW + '" style="top: 50%; height: 16.6667%;"></div>' +
								'<div class="' + CSS_SVM_ROW + '" style="top: 66.6667%; height: 16.6667%;"></div>' +
								'<div class="' + CSS_SVM_ROW + '" style="top: 83.3333%; height: 16.6667%;"></div>' +
							'</div>' +
						'</div>',

	TPL_SVM_TABLE_GRID = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVM_TABLE_GRID + '">' +
						    '<tbody>' +
						        '<tr>' +
						            '<td class="' + [ CSS_SVM_COLGRID, CSS_SVM_COLGRID_FIRST ].join(SPACE) + '">&nbsp;</td>' +
						            '<td class="' + CSS_SVM_COLGRID + '">&nbsp;</td>' +
						            '<td class="' + CSS_SVM_COLGRID + '">&nbsp;</td>' +
						            '<td class="' + CSS_SVM_COLGRID + '">&nbsp;</td>' +
						            '<td class="' + CSS_SVM_COLGRID + '">&nbsp;</td>' +
						            '<td class="' + CSS_SVM_COLGRID + '">&nbsp;</td>' +
						            '<td class="' + CSS_SVM_COLGRID + '">&nbsp;</td>' +
						        '</tr>' +
						    '</tbody>' +
						'</table>',

	TPL_SVM_TABLE_DATA = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVM_TABLE_DATA + '">' +
						    	'<tbody></tbody>' +
							'</table>',

	TPL_SVM_TABLE_DATA_ROW = '<tr></tr>',
	TPL_SVM_TABLE_DATA_COL = '<td class="' + CSS_SVM_TABLE_DATA_COL + '"><div></div></td>',

	TPL_SVM_EV_ICON_LEFT = '<span class="' + [ CSS_ICON, CSS_ICON_ARROWSTOP_LEFT ].join(SPACE) + '"></span>',
	TPL_SVM_EV_ICON_RIGHT = '<span class="' + [ CSS_ICON, CSS_ICON_ARROWSTOP_RIGHT ].join(SPACE) + '"></span>';


var SchedulerMonthView = A.Component.create({
	NAME: SCHEDULER_VIEW_MONTH,

	ATTRS: {
		bodyContent: {
			value: EMPTY_STR
		},

		name: {
			value: MONTH
		},

		headerDateFormat: {
			value: '%a'
		},

		navigationDateFormat: {
			value: '%b %Y'
		},

		scrollable: {
			value: false
		},

		/*
		* HTML_PARSER attributes
		*/
		monthContainerNode: {
			valueFn: function() {
				return A.Node.create(TPL_SVM_CONTAINER);
			}
		},

		headerTableNode: {
			valueFn: function() {
				return A.Node.create(TPL_SVM_HEADER_TABLE);
			}
		},

		colHeaderDaysNode: {
			valueFn: '_valueColHeaderDaysNode'
		},

		tableGridNode: {
			valueFn: '_valueTableGridNode'
		}
	},

	HTML_PARSER: {
		tableGridNode: getNodeListHTMLParser(DOT+CSS_SVM_TABLE_GRID, 7),
		colHeaderDaysNode: getNodeListHTMLParser(DOT+CSS_SVM_HEADER_DAY, 7),
		monthContainerNode: DOT+CSS_SVM_CONTAINER,
		headerTableNode: DOT+CSS_SVM_HEADER_TABLE
	},

	EXTENDS: A.SchedulerView,

	prototype: {
		evtDateStack: null,
		evtDataTableStack: null,

		initializer: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			instance.evtDateStack = {};
			instance.evtDataTableStack = {};

			instance.colHeaderDaysNode = instance.get(COL_HEADER_DAYS_NODE);
			instance.headerTableNode = instance.get(HEADER_TABLE_NODE);
			instance.monthContainerNode = instance.get(MONTH_CONTAINER_NODE);
			instance.tableGridNode = instance.get(TABLE_GRID_NODE);

			instance.dayHeaderColNode = instance.headerTableNode.one(DOT+CSS_SVM_HEADER_COL);
			instance.monthRows = instance.monthContainerNode.all(DOT+CSS_SVM_ROW);
			instance.tableGridCols = instance.tableGridNode.all(TD);
		},

		renderUI: function() {
			var instance = this;

			instance.colHeaderDaysNode.appendTo(instance.dayHeaderColNode);

			instance.monthRows.each(function(rowNode, index) {
				var tableGridNode = instance.tableGridNode.item(index);

				rowNode.append(
					tableGridNode.toggleClass(CSS_SVM_TABLE_GRID_FIRST, (index == 0))
				);
			});
		},

		buildEventsTable: function(rowStartDate, rowEndDate) {
			var instance = this;
			var displayRows = 5;
			var monthEndDate = DateMath.clearTime(instance._findCurrentMonthEnd());
			var monthStartDate = DateMath.clearTime(instance._findCurrentMonthStart());

			var cacheKey = String(monthStartDate.getTime())
								.concat(rowStartDate.getTime())
								.concat(rowEndDate.getTime());

			var evtDataTable = instance.evtDataTableStack[cacheKey];

			if (!evtDataTable) {
				evtDataTable = A.Node.create(TPL_SVM_TABLE_DATA);
				var tBody = evtDataTable.one(TBODY);

				// creating title rows
				var firstRowNode = A.Node.create(TPL_SVM_TABLE_DATA_ROW);

				instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
					var colTitleNode = A.Node.create(TPL_SVM_TABLE_DATA_COL);

					colTitleNode
						.addClass(CSS_SVM_TABLE_DATA_COL_TITLE)
						.toggleClass(
							CSS_SVM_TABLE_DATA_COL_TITLE_FIRST,
							(index == 0)
						)
						.toggleClass(
							CSS_SVM_TABLE_DATA_COL_TITLE_TODAY,
							DateMath.isToday(celDate)
						)
						.toggleClass(
							CSS_SVM_TABLE_DATA_COL_TITLE_NEXT,
							DateMath.isToday(DateMath.subtract(celDate, DateMath.DAY, 1))
						)
						.toggleClass(
							CSS_SVM_TABLE_DATA_COL_TITLE_DOWN,
							DateMath.isToday(DateMath.subtract(celDate, DateMath.WEEK, 1))
						);

					if (DateMath.before(celDate, monthStartDate) || DateMath.after(celDate, monthEndDate)) {
						colTitleNode.addClass(CSS_SVM_TABLE_DATA_COL_NOMONTH);
					}

					firstRowNode.append(
						colTitleNode.setContent(celDate.getDate())
					);
				});

				tBody.append(firstRowNode);

				// creating data rows
				for (var r = 0; r < displayRows; r++) {
					var renderIndex = 0;
					var rowNode = A.Node.create(TPL_SVM_TABLE_DATA_ROW);

					instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
						if (renderIndex <= index) {
							var events = instance.getIntersectEvents(celDate), evt = events[r];
							var evtColNode = A.Node.create(TPL_SVM_TABLE_DATA_COL);

							if (evt) {
								var evtNode = evtColNode.one(DIV);
								var splitInfo = instance._getEvtSplitInfo(evt, rowStartDate, rowEndDate);

								evtColNode.attr(COLSPAN, splitInfo.colspan);
								evtNode.addClass(CSS_SVM_TABLE_DATA_EVENT).setContent( instance._getEvtLabel(evt) );

								if (splitInfo.left) {
									evtNode.addClass(CSS_SVM_TABLE_DATA_EVENT_LEFT).prepend(TPL_SVM_EV_ICON_LEFT);
								}

								if (splitInfo.right) {
									evtNode.addClass(CSS_SVM_TABLE_DATA_EVENT_RIGHT).append(TPL_SVM_EV_ICON_RIGHT);
								}

								if (evt.get(PARENT_EVENT)) {
									evtNode.addClass(CSS_SVM_TABLE_DATA_EVENT_REPEATED);
								}

								renderIndex += splitInfo.colspan;
							}
							else {
								renderIndex++;
							}
							rowNode.append(evtColNode);
						}
					});

					tBody.append(rowNode);
				}

				instance.evtDataTableStack[cacheKey] = evtDataTable;
			}

			return evtDataTable;
		},

		flushViewCache: function() {
			var instance = this;

			instance.evtDateStack = {};
			instance.evtDataTableStack = {};
		},

		getIntersectEvents: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			var key = String(date.getTime());

			if (!instance.evtDateStack[key]) {
				instance.evtDateStack[key] = scheduler.getIntersectEvents(date);
			}

			return instance.evtDateStack[key];
		},

		loopDates: function(startDate, endDate, fn, incrementBy, factor) {
			var instance = this;
			var curDate = DateMath.clone(startDate);
			var endDateMs = endDate.getTime();

			for (var index = 0; curDate.getTime() <= endDateMs; index++) {
				fn.apply(instance, [curDate, index]);

				curDate = DateMath.add(curDate, (incrementBy || DateMath.DAY), (factor || 1));
			}
		},

		plotEvents: function() {
			var instance = this;
			var monthStartDate = instance._findCurrentMonthStart();
			var startDateRef = DateMath.safeClearTime(instance._findFirstDayOfWeek(monthStartDate));

			instance.bodyNode.all(DOT+CSS_SVM_TABLE_DATA).remove();

			instance.monthRows.each(function(rowNode, index) {
				var rowStartDate = DateMath.add(startDateRef, DateMath.WEEK, index);
				var rowEndDate = DateMath.add(rowStartDate, DateMath.DAY, WEEK_LENGTH - 1);
				var tableNode = instance.buildEventsTable(rowStartDate, rowEndDate);

				if (index == 0) {
					tableNode.addClass(CSS_SVM_TABLE_DATA_FIRST);
				}

				rowNode.append(tableNode);
			});
		},

		syncStdContent: function() {
			var instance = this;

			instance.setStdModContent(WidgetStdMod.BODY, instance.monthContainerNode.getDOM());
			instance.setStdModContent(WidgetStdMod.HEADER, instance.headerTableNode.getDOM());
		},

		syncGridUI: function() {
			var instance = this;
			var today = instance.getToday();
			var scheduler = instance.get(SCHEDULER);

			instance.tableGridCols.removeClass(CSS_SVM_COLGRID_TODAY);

			if (DateMath.isSameMonth(today, scheduler.get(CURRENT_DATE))) {
				var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);
				var today = instance.getToday();
				var monthStartDate = instance._findCurrentMonthStart();
				var firstWeekDay = instance._findFirstDayOfWeek(today);

				var rowIndex = DateMath.getWeekNumber(today, firstDayOfWeek) - DateMath.getWeekNumber(monthStartDate, firstDayOfWeek);
				var colIndex = (today.getDate() - firstWeekDay.getDate());
				var todayCel = instance.tableGridNode.item(rowIndex).all(TD).item(colIndex);

				if (todayCel) {
					todayCel.addClass(CSS_SVM_COLGRID_TODAY);
				}
			}
		},

		adjustCurrentDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			scheduler.set(
				CURRENT_DATE,
				instance._findCurrentMonthStart()
			);
		},

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

		syncDaysHeaderUI: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);
			var dateFormat = instance.get(HEADER_DATE_FORMAT);
			var locale = instance.get(LOCALE);
			var firstDayOfWeekDt = instance._findFirstDayOfWeek(currentDate);

			instance.colHeaderDaysNode.all(DIV).each(
				function(columnNode, i) {
					var columnDate = DateMath.add(firstDayOfWeekDt, DateMath.DAY, i);
					var formatted = A.DataType.Date.format(columnDate, { format: dateFormat, locale: locale });

					columnNode.html(formatted);
				}
			);
		},

		_findCurrentMonthEnd: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);

			return DateMath.findMonthEnd(currentDate);
		},

		_findCurrentMonthStart: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var currentDate = scheduler.get(CURRENT_DATE);

			return DateMath.findMonthStart(currentDate);
		},

		_findFirstDayOfWeek: function(date) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

			return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
		},

		_getEvtLabel: function(evt) {
			var instance = this;
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return [ startDate.getHours(), DASH, endDate.getHours(), SPACE, evt.get(CONTENT) ].join(EMPTY_STR);
		},

		_getEvtSplitInfo: function(evt, rowStartDate, rowEndDate) {
			var instance = this;
			var startDate = evt.getClearStartDate();
			var endDate = evt.getClearEndDate();
			var duration = evt.getDaysDuration();
			var info = {};
			var colspan = 1;

			if (DateMath.after(startDate, rowStartDate)) {
				colspan = Math.min(duration, Math.abs(DateMath.getDayOffset(rowEndDate, startDate)) + 1);

				if (colspan > 1) {
					info.right = true;
				}
			}
			else {
				colspan = Math.abs(DateMath.getDayOffset(endDate, rowStartDate) + 1);

				if (colspan > 1) {
					info.left = true;
				}
			}

			info.colspan = Math.min(colspan, WEEK_LENGTH);

			if (colspan >= WEEK_LENGTH) {
				info.right = true;
				info.left = true;
			}

			return info;
		},

		_uiSetCurrentDate: function(val) {
			var instance = this;

			instance.syncDaysHeaderUI();
			instance.syncGridUI();
		},

		_valueColHeaderDaysNode: function() {
			var instance = this;

			return instance._valueNodeList(WEEK_LENGTH, TPL_SVM_HEADER_DAY);
		},

		_valueTableGridNode: function() {
			var instance = this;

			return instance._valueNodeList(WEEK_LENGTH, TPL_SVM_TABLE_GRID);
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

A.SchedulerMonthView = SchedulerMonthView;

}, '@VERSION@' ,{requires:['aui-scheduler-event','aui-calendar','aui-button-item','substitute','dd-drag','dd-delegate','dd-drop','dd-constrain'], skinnable:true});
AUI.add('aui-scheduler-event', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,
	isDate = Lang.isDate,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,

	Color = A.Color,
	DateMath = A.DataType.DateMath,

    _toInitialCap = A.cached(function(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }),

	DASH = '-',
	DOT = '.',
	EMPTY_STR = '',
	SPACE = ' ',
	UNDERLINE = '_',

	_PROPAGATE_SET = '_propagateSet',

	ACTIVE_VIEW = 'activeView',
	BORDER_WIDTH = 'borderWidth',
	COLOR_BRIGHTNESS_FACTOR = 'colorBrightnessFactor',
	COLOR_SATURATION_FACTOR = 'colorSaturationFactor',
	CHANGE = 'Change',
	COLOR = 'color',
	CONTENT = 'content',
	CONTENT_NODE = 'contentNode',
	DURATION = 'duration',
	END_DATE = 'endDate',
	EVENTS = 'events',
	ID = 'id',
	ISO_TIME = 'isoTime',
	LOCALE = 'locale',
	NODE = 'node',
	OVERLAY = 'overlay',
	PARENT_EVENT = 'parentEvent',
	RECORDER = 'recorder',
	REPEAT = 'repeat',
	REPEATED = 'repeated',
	REPEATED_EVENTS = 'repeatedEvents',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'scheduler-event',
	SCHEDULER_EVENT_RECORDER = 'scheduler-event-recorder',
	START_DATE = 'startDate',
	TEMPLATE = 'template',
	TITLE = 'title',
	TITLE_DATE_FORMAT = 'titleDateFormat',
	TITLE_NODE = 'titleNode',
	BORDER_STYLE = 'borderStyle',

	TITLE_DT_FORMAT_ISO = '%H:%M',
	TITLE_DT_FORMAT_US = '%I:%M',

	getCN = A.ClassNameManager.getClassName,

	CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
	CSS_SCHEDULER_EVENT_RECORDER = getCN(SCHEDULER_EVENT, RECORDER),
	CSS_SCHEDULER_EVENT_CONTENT = getCN(SCHEDULER_EVENT, CONTENT),
	CSS_SCHEDULER_EVENT_REPEATED = getCN(SCHEDULER_EVENT, REPEATED),
	CSS_SCHEDULER_EVENT_TITLE = getCN(SCHEDULER_EVENT, TITLE),

	TPL_SCHEDULER_EVENT_NODE = '<div class="' + CSS_SCHEDULER_EVENT + '">' +
									'<div class="' + CSS_SCHEDULER_EVENT_TITLE + '"></div>' +
									'<div class="' + CSS_SCHEDULER_EVENT_CONTENT + '"></div>' +
								'</div>';

var SchedulerEvent = A.Component.create({
	NAME: SCHEDULER_EVENT,

	ATTRS: {
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
			valueFn: function() {
				var date = DateMath.clone(this.get(START_DATE));

				date.setHours(date.getHours() + 1);

				return date;
			},
			validator: isDate
		},

		columnNode: {
			setter: A.one
		},

		node: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_EVENT_NODE).setData(SCHEDULER_EVENT, this);
			},
			setter: A.one
		},

		parentEvent: {
		},

		repeat: {
			setter: '_setRepeat'
		},

		scheduler: {
			lazyAdd: false,
			setter: '_setScheduler'
		},

		startDate: {
			valueFn: function() {
				return new Date();
			},
			validator: isDate
		}
	},

	EXTENDS: A.Base,

	PROPAGATE_ATTRS: [START_DATE, END_DATE, CONTENT, COLOR, COLOR_BRIGHTNESS_FACTOR, COLOR_SATURATION_FACTOR, BORDER_STYLE, BORDER_WIDTH, TITLE_DATE_FORMAT],

	prototype: {
		eventStack: null,

		initializer: function() {
			var instance = this;
			var node = instance.get(NODE);

			instance.eventStack = {};
			instance.nodeStack = {};

			A.Array.each(A.SchedulerEvent.PROPAGATE_ATTRS, function(attrName) {
				instance.after(attrName+CHANGE, instance._propagateAttrChange);
			});

			instance.contentNode = node.one(DOT+CSS_SCHEDULER_EVENT_CONTENT);
			instance.titleNode = node.one(DOT+CSS_SCHEDULER_EVENT_TITLE);

			instance.syncNodeUI(true);
		},

		destroy: function() {
			var instance = this;

			instance.eachRepeatedEvent(function(evt, uid) {
				evt.destroy();
			});

			instance.eventStack = {};

			// remove and purge DOM node
			instance.get(NODE).remove(true);
		},

		copyDates: function(evt) {
			var instance = this;

			instance.set(END_DATE, DateMath.clone(evt.get(END_DATE)));
			instance.set(START_DATE, DateMath.clone(evt.get(START_DATE)));
		},

		copyPropagateAttrValues: function(evt, dontCopyMap) {
			var instance = this;

			instance.copyDates(evt);

			A.Array.each(A.SchedulerEvent.PROPAGATE_ATTRS, function(attrName) {
				if ( !(attrName in (dontCopyMap || {})) ) {
					var value = evt.get(attrName);

					if (!isObject(value)) {
						instance.set(attrName, value);
					}
				}
			});
		},

		getBorderColor: function() {
			var instance = this;

			return instance.borderColorRGB.hex;
		},

		getDaysDuration: function() {
			var instance = this;

			return DateMath.getDayOffset(instance.get(END_DATE), instance.get(START_DATE));
		},

		getHoursDuration: function() {
			var instance = this;

			return DateMath.getHoursOffset(instance.get(END_DATE), instance.get(START_DATE));
		},

		getMinutesDuration: function() {
			var instance = this;

			return DateMath.getMinutesOffset(instance.get(END_DATE), instance.get(START_DATE));
		},

		getSecondsDuration: function() {
			var instance = this;

			return DateMath.getSecondsOffset(instance.get(END_DATE), instance.get(START_DATE));
		},

		sameEndDate: function(evt) {
			var instance = this;

			return DateMath.compare(instance.get(END_DATE), evt.get(END_DATE));
		},

		sameStartDate: function(evt) {
			var instance = this;

			return DateMath.compare(instance.get(START_DATE), evt.get(START_DATE));
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

			if (!instance.eventStack[uid]) {
				var repeatedStartDate = DateMath.clone(date);
				var repeatedEndDate = DateMath.clone(date);

				DateMath.copyHours(repeatedStartDate, instance.get(START_DATE));
				DateMath.copyHours(repeatedEndDate, instance.get(END_DATE));

				// copying base attrs
				var newEvt = new A.SchedulerEvent({
					endDate: repeatedEndDate,
					parentEvent: instance,
					scheduler: instance.get(SCHEDULER),
					startDate: repeatedStartDate
				});

				// copying propagatable attrs
				newEvt.copyPropagateAttrValues(instance);

				instance.eventStack[uid] = newEvt;
			}

			return instance.eventStack[uid];
		},

		intersects: function(evt) {
			var instance = this;
			var endDate = instance.get(END_DATE);
			var startDate = instance.get(START_DATE);
			var evtStartDate = evt.get(START_DATE);

			return (instance.sameStartDate(evt) || DateMath.between(evtStartDate, startDate, endDate));
		},

		intersectHours: function(evt) {
			var instance = this;
			var endDate = instance.get(END_DATE);
			var startDate = instance.get(START_DATE);
			var evtModifiedStartDate = DateMath.clone(startDate);

			DateMath.copyHours(evtModifiedStartDate, evt.get(START_DATE));

			return (DateMath.compare(startDate, evtModifiedStartDate) || DateMath.between(evtModifiedStartDate, startDate, endDate));
		},

		isDayOverlapEvent: function() {
			var instance = this;

			return DateMath.isDayOverlap(instance.get(START_DATE), instance.get(END_DATE));
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

		uidByDate: function(date) {
			var instance = this;

			date = isDate(date) ?  DateMath.safeClearTime(date) : instance.getClearStartDate();

			return [SCHEDULER_EVENT, date.getTime()].join(UNDERLINE);
		},

		setContent: function(content, propagate) {
			var instance = this;

			instance._setContent(CONTENT_NODE, content, propagate);
		},

		setTitle: function(content, propagate) {
			var instance = this;

			instance._setContent(TITLE_NODE, content, propagate);
		},

		syncNodeUI: function(propagate) {
			var instance = this;

			instance.get(NODE).toggleClass(
				CSS_SCHEDULER_EVENT_REPEATED,
				!!(instance.get(PARENT_EVENT))
			);

			instance.syncNodeColorUI(propagate);
			instance.syncNodeTitleUI(propagate);
			instance.syncNodeContentUI(propagate);
		},

		syncNodeColorUI: function(propagate) {
			var instance = this;
			var node = instance.get(NODE);
			var borderColor = instance.getBorderColor();

			// update original event node
			if (node) {
				node.setStyles({
					borderWidth: instance.get(BORDER_WIDTH),
					borderColor: borderColor,
					backgroundColor: instance.get(COLOR),
					borderStyle: instance.get(BORDER_STYLE)
				});
			}

			if (instance.titleNode) {
				instance.titleNode.setStyles({
					backgroundColor: borderColor
				});
			}

			// update repeated nodes
			if (propagate) {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.syncNodeColorUI()
				});
			}
		},

		syncNodeContentUI: function(propagate) {
			var instance = this;

			instance.setContent(instance.get(CONTENT), propagate);
		},

		syncNodeTitleUI: function(propagate) {
			var instance = this;
			var sDateFormatted = instance._formatDate(instance.get(START_DATE));
			var eDateFormatted = instance._formatDate(instance.get(END_DATE));

			instance.setTitle([sDateFormatted, eDateFormatted].join(SPACE+DASH+SPACE), propagate);
		},

		eachRepeatedEvent: function(fn) {
			var instance = this;

			A.each(instance.eventStack, fn, instance);
		},

		unlink: function() {
			var instance = this;

			if (instance.get(PARENT_EVENT)) {
				instance.set(PARENT_EVENT, null);
			}
			// if node is a parent event
			else {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt.unlink();
				});
			}

			// clean all child events
			instance.eventStack = {};

			instance.syncNodeUI();
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

			// finding the respective nice color to the border
			instance.hsbColor = Color.rgb2hsb(Color.getRGB(val));
			instance.borderColor = A.clone(instance.hsbColor);
			instance.borderColor.b *= instance.get(COLOR_BRIGHTNESS_FACTOR);
			instance.borderColor.s *= instance.get(COLOR_SATURATION_FACTOR);
			instance.borderColorRGB = Color.hsb2rgb(instance.borderColor);

			return val;
		},

		_setContent: function(nodeRefName, content, propagate) {
			var instance = this;
			var node = instance[nodeRefName];

			// update original event node
			if (node) {
				node.setContent(content);
			}

			// update repeated nodes
			if (propagate) {
				instance.eachRepeatedEvent(function(evt, uid) {
					evt[nodeRefName].setContent(content);
				});
			}
		},

		_setRepeat: function(val) {
			var instance = this;

			if (isString(val)) {
				val = A.SchedulerEventRepeat[val];
			}

			return val;
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

		_formatDate: function(date, format) {
			var instance = this;
			var locale = instance.get(LOCALE);

			format = format || instance.get(TITLE_DATE_FORMAT);

			return A.DataType.Date.format(date, { format: format, locale: locale });
		},

		_getTitleDateFormat: function(val) {
			var instance = this;

			if (!isString(val)) {
				var scheduler = instance.get(SCHEDULER);

				val = (scheduler && scheduler.get(ACTIVE_VIEW).get(ISO_TIME)) ? TITLE_DT_FORMAT_ISO : TITLE_DT_FORMAT_US;
			}

			return val;
		}
	}
});

A.SchedulerEvent = SchedulerEvent;
A.SchedulerEventRepeat = {
	dayly: {
		description: 'Every day',
		validate: function(evt, date) {
			return true;
		}
	},

	monthly: {
		description: 'Every month',
		validate: function(evt, date) {
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return (startDate.getDate() === evt.getDate());
		}
	},

	monWedFri: {
		description: 'Every Monday, Wednesday and Friday',
		validate: function(evt, date) {
			return DateMath.isMonWedOrFri(date);
		}
	},

	tuesThurs: {
		description: 'Every Tuesday and Thursday',
		validate: function(evt, date) {
			return DateMath.isTueOrThu(date);
		}
	},

	weekDays: {
		description: 'Every week days',
		validate: function(evt, date) {
			return DateMath.isWeekDay(date);
		}
	},

	weekly: {
		description: 'Every week',
		validate: function(evt, date) {
			var endDate = evt.get(END_DATE);
			var startDate = evt.get(START_DATE);

			return (startDate.getDay() === evt.getDay());
		}
	}

};
var BC = 'bc',
	BD = 'bd',
	BODY_CONTENT = 'bodyContent',
	BOUNDING_BOX = 'boundingBox',
	BUTTON = 'button',
	COLUMN = 'column',
	CONTENT = 'content',
	DBLCLICK = 'dblclick',
	DESC = 'desc',
	DISK = 'disk',
	FIELD = 'field',
	FIELDSET = 'fieldset',
	FORM = 'form',
	HINT = 'hint',
	INPUT = 'input',
	LABEL = 'label',
	LAYOUT = 'layout',
	MENU = 'menu',
	OVERLAY_CONTEXT_PANEL = 'overlayContextPanel',
	REPEAT = 'repeat',
	ROW = 'row',
	SELECT = 'select',
	STRINGS = 'strings',
	TC = 'tc',
	TEXT = 'text',
	WHEN = 'when',
	DATE_FORMAT = 'dateFormat',
	SCHEDULER = 'scheduler',
	ISO_TIME = 'isoTime',

	AUI_SCHEDULER_EVENT_RECORDER_WHEN = 'auiSchedulerEventRecorderWhen',
	AUI_SCHEDULER_EVENT_RECORDER_DESC = 'auiSchedulerEventRecorderDesc',
	AUI_SCHEDULER_EVENT_RECORDER_SELECT = 'auiSchedulerEventRecorderSelect',
	AUI_SCHEDULER_EVENT_RECORDER_BUTTON_ROW = 'auiSchedulerEventRecorderButtonRow',

	EV_SCHEDULER_EVENT_RECORDER_SAVE = 'scheduler-event-recorder:save',
	EV_SCHEDULER_EVENT_RECORDER_CANCEL = 'scheduler-event-recorder:cancel',

	DASH = '-',
	POUND = '#',

	CSS_SCHEDULER_EVENT_RECORDER_OVERLAY = getCN(SCHEDULER_EVENT, RECORDER, OVERLAY),
	CSS_SCHEDULER_EVENT_RECORDER_FORM = getCN(SCHEDULER_EVENT, RECORDER, FORM),
	CSS_FORM = getCN(FORM),
	CSS_LAYOUT_CONTENT = getCN(LAYOUT, CONTENT),
	CSS_FIELDSET = getCN(LAYOUT, FIELDSET),
	CSS_FIELDSET_BD = getCN(LAYOUT, FIELDSET, BD),
	CSS_FIELDSET_CONTENT = getCN(LAYOUT, FIELDSET, CONTENT),
	CSS_W100 = getCN(LAYOUT, 'w100'),
	CSS_COLUMN = getCN(COLUMN),
	CSS_COLUMN_CONTENT = getCN(COLUMN, CONTENT),
	CSS_FIELD = getCN(FIELD),
	CSS_FIELD_MENU = getCN(FIELD, MENU),
	CSS_FIELD_SELECT = getCN(FIELD, SELECT),
	CSS_FIELD_CONTENT = getCN(FIELD, CONTENT),
	CSS_FIELD_LABEL = getCN(FIELD, LABEL),
	CSS_FIELD_TEXT = getCN(FIELD, TEXT),
	CSS_BUTTON_ROW = getCN(BUTTON, ROW),
	CSS_FIELD_INPUT = getCN(FIELD, INPUT),
	CSS_FIELD_INPUT_SELECT = getCN(FIELD, INPUT, SELECT),
	CSS_FIELD_INPUT_TEXT = getCN(FIELD, INPUT, TEXT),
	CSS_SCHEDULER_EVENT_RECORDER_LABEL_WHEN = getCN(SCHEDULER_EVENT, RECORDER, LABEL, WHEN),
	CSS_SCHEDULER_EVENT_RECORDER_DESC = getCN(SCHEDULER_EVENT, RECORDER, DESC),

	CSS_SCHEDULER_EVENT_RECORDER_FIELD_HINT = getCN(SCHEDULER_EVENT, RECORDER, FIELD, HINT),
	CSS_SCHEDULER_EVENT_RECORDER_REPEAT = getCN(SCHEDULER_EVENT, RECORDER, REPEAT),
	CSS_SCHEDULER_EVENT_RECORDER_BUTTON_ROW = getCN(SCHEDULER_EVENT, RECORDER, BUTTON, ROW),

	TPL_OPTION = '<option></option>',

	TPL_EVT_REC_OVERLAY = '<form id="auiSchedulerEventRecorderForm" class="' + [ CSS_SCHEDULER_EVENT_RECORDER_FORM, CSS_LAYOUT_CONTENT, CSS_FORM ].join(SPACE) + '">' +
							'<div class="' + [ CSS_FIELDSET, CSS_W100, CSS_COLUMN ].join(SPACE) + '">' +
								'<div class="' + [ CSS_FIELDSET_CONTENT, CSS_COLUMN_CONTENT ].join(SPACE) + 'aui-fieldset-content aui-column-content">' +

									'<div class="' + CSS_FIELDSET_BD + '">' +
										'<span class="' + [ CSS_FIELD, CSS_FIELD_TEXT ].join(SPACE) + '">' +
											'<span class="' + CSS_FIELD_CONTENT + '">' +
												'<label class="' + CSS_FIELD_LABEL + '">{when}:</label>' +
												'<span id="auiSchedulerEventRecorderWhen" class="' + CSS_SCHEDULER_EVENT_RECORDER_LABEL_WHEN + '"></span>' +
											'</span>' +
										'</span>' +

										'<span class="' + [ CSS_FIELD, CSS_FIELD_TEXT ].join(SPACE) + '">' +
											'<span class="' + CSS_FIELD_CONTENT + '">' +
												'<label class="' + CSS_FIELD_LABEL + '" for="auiSchedulerEventRecorderDesc">{description}</label>' +
												'<input id="auiSchedulerEventRecorderDesc" class="' + [ CSS_FIELD_INPUT, CSS_FIELD_INPUT_TEXT, CSS_SCHEDULER_EVENT_RECORDER_DESC ].join(SPACE) + '" size="30" type="text" />' +
												'<div class="' + CSS_SCHEDULER_EVENT_RECORDER_FIELD_HINT + '">' +
													'<span>{description-hint}</span>' +
												'</div>' +
											'</span>' +
										'</span>' +

										'<span class="' + [ CSS_FIELD, CSS_FIELD_MENU, CSS_FIELD_SELECT ].join(SPACE) + '">' +
											'<label class="' + CSS_FIELD_LABEL + '" for="auiSchedulerEventRecorderSelect">{repeat}:</label>' +
											'<select id="auiSchedulerEventRecorderSelect" class="' + [ CSS_FIELD_INPUT, CSS_FIELD_INPUT_SELECT, CSS_SCHEDULER_EVENT_RECORDER_REPEAT ].join(SPACE) + '">' +
												'<option selected="selected" value="">{no-repeat}</option>' +
											'</select>' +
										'</span>' +
										'<div id="auiSchedulerEventRecorderButtonRow" class="' + [ CSS_FIELD, CSS_BUTTON_ROW, CSS_SCHEDULER_EVENT_RECORDER_BUTTON_ROW ].join(SPACE) + '"></div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</form>';

var SchedulerEventRecorder = A.Component.create({
	NAME: SCHEDULER_EVENT_RECORDER,

	ATTRS: {
		content: {
			value: EMPTY_STR
		},

		duration: {
			value: 60
		},

		dateFormat: {
			value: '%a, %B %d,',
			validator: isString
		},

		strings: {
			value: {},
			setter: function(val) {
				return A.merge(
					{
						save: 'Save',
						cancel: 'Cancel',
						description: 'Description',
						repeat: 'Repeat',
						when: 'When',
						'description-hint': 'e.g., Dinner at Brian\'s',
						'no-repeat': 'No repeat'
					},
					val || {}
				);
			},
			validator: isObject
		},

		overlayContextPanel: {
			value: {},
			setter: function(val) {
				var instance = this;

				var bodyContent = A.Node.create(
					A.substitute(TPL_EVT_REC_OVERLAY, instance.get(STRINGS))
				);

				return A.merge(
					{
						align: { points: [ BC, TC ] },
						anim: false,
						bodyContent: bodyContent,
						hideOn: DBLCLICK,
						trigger: instance.get(NODE),
						visible: false,
						zIndex: 9999
					},
					val || {}
				);
			}
		}
	},

	EXTENDS: A.SchedulerEvent,

	prototype: {
		initializer: function() {
			var instance = this;

			instance._createEvents();

			instance.on('startDateChange', instance._onStartDateChange);

			instance.get(NODE).addClass(CSS_SCHEDULER_EVENT_RECORDER);
		},

		showOverlay: function() {
			var instance = this;

			if (!instance.overlay) {
				instance._initOverlay();
			}

			instance.overlay.render().show();
		},

		getEventCopy: function(evt) {
			var instance = this;
			var content = instance.overlayDescNode.val();

			// copying base attrs
			var newEvt = new A.SchedulerEvent({
				endDate: instance.get(END_DATE),
				scheduler: instance.get(SCHEDULER),
				startDate: instance.get(START_DATE),
				repeat: instance.overlaySelectNode.val()
			});

			// copying propagatable attrs
			newEvt.copyPropagateAttrValues(instance, { content: true });

			if (content) {
				newEvt.set(CONTENT, content);
			}

			return newEvt;
		},

		hideOverlay: function() {
			var instance = this;

			if (instance.overlay) {
				instance.overlay.hide();
			}
		},

	    /**
	     * Create the custom events used on the Resize.
	     *
	     * @method _createEvents
	     * @private
	     */
		_createEvents: function() {
			var instance = this;

			// create publish function for kweight optimization
			var publish = function(name, fn) {
				instance.publish(name, {
		            defaultFn: fn,
		            queuable: false,
		            emitFacade: true,
		            bubbles: true,
		            prefix: SCHEDULER_EVENT_RECORDER
		        });
			};

			publish(
				EV_SCHEDULER_EVENT_RECORDER_SAVE,
				this._defSaveEventFn
			);

			publish(
				EV_SCHEDULER_EVENT_RECORDER_CANCEL,
				this._defCancelEventFn
			);
		},

		_initOverlay: function() {
			var instance = this;
			var strings = instance.get(STRINGS);

			instance.overlay = new A.OverlayContextPanel(
				instance.get(OVERLAY_CONTEXT_PANEL)
			);

			var overlay = instance.overlay;
			var oBoundingBox = overlay.get(BOUNDING_BOX);
			var oBodyContent = overlay.get(BODY_CONTENT);

			instance.overlayButtonRowNode = oBodyContent.one(POUND+AUI_SCHEDULER_EVENT_RECORDER_BUTTON_ROW);
			instance.overlayDescNode = oBodyContent.one(POUND+AUI_SCHEDULER_EVENT_RECORDER_DESC);
			instance.overlaySelectNode = oBodyContent.one(POUND+AUI_SCHEDULER_EVENT_RECORDER_SELECT);
			instance.overlayWhenNode = oBodyContent.one(POUND+AUI_SCHEDULER_EVENT_RECORDER_WHEN);

			instance.overlaySaveBtn = new A.ButtonItem({
				label: strings.save,
				icon: DISK,
				render: instance.overlayButtonRowNode,
				handler: {
					fn: instance._handleSaveEvent,
					context: instance
				}
			});

			instance.overlayCancelBtn = new A.ButtonItem({
				label: strings.cancel,
				render: instance.overlayButtonRowNode,
				handler: {
					fn: instance._handleCancelEvent,
					context: instance
				}
			});

			A.each(A.SchedulerEventRepeat, function(repeat, key) {
				instance.overlaySelectNode.append(
					A.Node.create(TPL_OPTION).val(key).setContent(repeat.description)
				);
			});

			overlay.on('hide', A.bind(instance._onOverlayHide, instance));
			overlay.on('show', A.bind(instance._onOverlayShow, instance));
			oBodyContent.on('submit', A.bind(instance._handleSaveEvent, instance));
			oBoundingBox.addClass(CSS_SCHEDULER_EVENT_RECORDER_OVERLAY);
		},

		_defCancelEventFn: function(event) {
			var instance = this;

			instance.hideOverlay();
		},

		_defSaveEventFn: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			scheduler.addEvent(instance.getEventCopy());

			instance.hideOverlay();

			scheduler.syncEventsUI();
		},

		_getWhenFormattedDt: function() {
			var instance = this;
			var dateFormat = instance.get(DATE_FORMAT);
			var endDate = instance.get(END_DATE);
			var scheduler = instance.get(SCHEDULER);
			var startDate = instance.get(START_DATE);
			var fmtHourFn = (scheduler.get(ISO_TIME) ? DateMath.toIsoTimeString : DateMath.toUsTimeString);

			return [ instance._formatDate(startDate, dateFormat), fmtHourFn(startDate), DASH, fmtHourFn(endDate) ].join(SPACE);
		},

		_handleSaveEvent: function(event) {
			var instance = this;

			instance.fire(EV_SCHEDULER_EVENT_RECORDER_SAVE);

			event.preventDefault();
		},

		_handleCancelEvent: function(event) {
			var instance = this;

			instance.fire(EV_SCHEDULER_EVENT_RECORDER_CANCEL);

			event.preventDefault();
		},

		_onOverlayHide: function(event) {
			var instance = this;

			instance.get(NODE).remove();
		},

		_onOverlayShow: function(event) {
			var instance = this;

			instance.overlayWhenNode.setContent(instance._getWhenFormattedDt());

			setTimeout(function() {
				instance.overlayDescNode.val(EMPTY_STR).selectText();
			}, 0);
		},

		_onStartDateChange: function(event) {
			var instance = this;
			var duration = instance.get(DURATION);

			instance.set(
				END_DATE,
				DateMath.add(event.newVal, DateMath.MINUTES, duration)
			);
		}
	}
});

A.SchedulerEventRecorder = SchedulerEventRecorder;

}, '@VERSION@' ,{requires:['aui-base','aui-color','aui-datatype','aui-overlay-context-panel','substitute'], skinnable:true});
AUI.add('aui-scheduler-calendar', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,

	isSchedulerEvent = function(val) {
		return (val instanceof A.SchedulerEvent);
	},

	SCHEDULER_CALENDAR = 'scheduler-calendar',
	COLOR = 'color',
	PALLETE = 'pallete';

var SchedulerCalendar = A.Component.create({
	NAME: SCHEDULER_CALENDAR,

	ATTRS: {
		events: {
			lazyAdd: false,
			value: [],
			setter: '_setEvents',
			validator: isArray
		},

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
		}
	},

	EXTENDS: A.Base,

	prototype: {
		_setEvents: function(val) {
			var instance = this;
			var events = [];

			A.Array.each(val, function(evt, i) {
				if (!isSchedulerEvent(evt)) {
					evt = new A.SchedulerEvent(evt);
				}

				evt.set(COLOR, instance.get(COLOR));

				events.push(evt);
			});

			return events;
		}
	}
});

A.SchedulerCalendar = SchedulerCalendar;

}, '@VERSION@' ,{requires:['aui-scheduler-event'], skinnable:true});


AUI.add('aui-scheduler', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-scheduler-base','aui-scheduler-view','aui-scheduler-event']});

