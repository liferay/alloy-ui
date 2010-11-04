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