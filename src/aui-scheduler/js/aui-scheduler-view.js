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