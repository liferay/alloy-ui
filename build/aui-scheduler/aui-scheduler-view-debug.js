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
