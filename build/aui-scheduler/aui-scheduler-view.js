AUI.add('aui-scheduler-view', function(A) {
var Lang = A.Lang,
	isObject = Lang.isObject,
	isString = Lang.isString,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,

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

	ACTIVE_COLUMN = 'activeColumn',
	ACTIVE_VIEW = 'activeView',
	BOUNDING_BOX = 'boundingBox',
	CANCEL = 'cancel',
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
	DELEGATE_CONFIG = 'delegateConfig',
	DISABLED = 'disabled',
	DIV = 'div',
	DIVISION = 'division',
	DOTTED = 'dotted',
	DOWN = 'down',
	DRAGGING_EVENT = 'draggingEvent',
	DURATION = 'duration',
	END_DATE = 'endDate',
	EVENT = 'event',
	EVENT_CLASS = 'eventClass',
	EVENT_PLACEHOLDER = 'eventPlaceholder',
	EVENT_RECORDER = 'eventRecorder',
	EVENT_WIDTH = 'eventWidth',
	FIRST = 'first',
	FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
	GRID = 'grid',
	GRID_CONTAINER = 'gridContainer',
	GRIP = 'grip',
	HANDLER = 'handler',
	HANDLER_CONTAINER_NODE = 'handlerContainerNode',
	HD = 'hd',
	HEADER = 'header',
	HEADER_DATE_FORMAT = 'headerDateFormat',
	HEADER_TABLE_NODE = 'headerTableNode',
	HORIZONTAL = 'horizontal',
	HOST = 'host',
	HOUR_HEIGHT = 'hourHeight',
	ICON = 'icon',
	ICON = 'icon',
	ISO_TIME = 'isoTime',
	LASSO = 'lasso',
	LEFT = 'left',
	LOCALE = 'locale',
	MARKER = 'marker',
	MARKERCELL = 'markercell',
	MARKERCELLS_NODE = 'markercellsNode',
	MARKERS = 'markers',
	MARKERS_NODE = 'markersNode',
	MONTH = 'month',
	MONTH_CONTAINER_NODE = 'monthContainerNode',
	MONTH_ROWS = 'monthRows',
	MOUSEDOWN = 'mousedown',
	MOUSEMOVE = 'mousemove',
	MOUSEUP = 'mouseup',
	NEXT = 'next',
	NODE = 'node',
	NOMONTH = 'nomonth',
	NOSCROLL = 'noscroll',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	PAD = 'pad',
	PADDING_NODE = 'paddingNode',
	PARENT_EVENT = 'parentEvent',
	PARENT_NODE = 'parentNode',
	PROXY = 'proxy',
	PX = 'px',
	REGION = 'region',
	RENDERED = 'rendered',
	REPEATED = 'repeated',
	RESIZING = 'resizing',
	RIGHT = 'right',
	ROW = 'row',
	SAVE = 'save',
	SCHEDULER = 'scheduler',
	SCHEDULER_EVENT = 'scheduler-event',
	SCROLLABLE = 'scrollable',
	SHIM = 'shim',
	START_DATE = 'startDate',
	START_XY = 'startXY',
	TABLE = 'table',
	TABLE_GRID_NODE = 'tableGridNode',
	TABLE_NODE = 'tableNode',
	TBODY = 'tbody',
	TD = 'td',
	TIME = 'time',
	TIMES_NODE = 'timesNode',
	TITLE = 'title',
	TODAY = 'today',
	TOP = 'top',
	VISIBLE = 'visible',
	WEEK = 'week',
	WIDTH = 'width',

	DATA_COLNUMBER = 'data-colnumber',

	ANCHOR = 'a',
	COMMA = ',',
	DASH = '-',
	DOT = '.',
	EMPTY_STR = '',
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
		 * The default date format string which can be overriden for
         * localization support. The format must be valid according to
         * <a href="DataType.Date.html">A.DataType.Date.format</a>.
		 *
		 * @attribute dateFormat
		 * @default %A - %d %b %Y
		 * @type String
		 */
		navigationDateFormat: {
			value: '%A - %d %B, %Y',
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
	CSS_SCHEDULER_VIEW_DAY_HANDLER = getCN(SCHEDULER_VIEW, DAY, HANDLER),
	CSS_SCHEDULER_VIEW_DAY_HANDLER_CONTAINER = getCN(SCHEDULER_VIEW, DAY, HANDLER, CONTAINER),
	CSS_SCHEDULER_VIEW_DAY_MARKER_DIVISION = getCN(SCHEDULER_VIEW, MARKER, DIVISION),
	CSS_SCHEDULER_VIEW_DAY_MARKERCELL = getCN(SCHEDULER_VIEW, MARKERCELL),
	CSS_SCHEDULER_VIEW_DAY_MARKERS = getCN(SCHEDULER_VIEW, MARKERS),
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
	CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME = getCN(SCHEDULER_VIEW, TABLE, COLTIME),
	CSS_SCHEDULER_VIEW_DAY_TABLE_TIME = getCN(SCHEDULER_VIEW, TABLE, TIME),

	TPL_SCHEDULER_VIEW_DAY_HANDLER = '<div class="' + CSS_SCHEDULER_VIEW_DAY_HANDLER_CONTAINER + '">' +
										'<div class="' + [CSS_ICON, CSS_ICON_GRIP_DOTTED_HORIZONTAL, CSS_SCHEDULER_VIEW_DAY_HANDLER].join(SPACE) + '"></div>' +
									'</div>',

	TPL_SCHEDULER_VIEW_DAY_MARKERCELL = '<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKERCELL + '">' +
											'<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKER_DIVISION + '"></div>' +
										'</div>',

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

		headerDateFormat: {
			value: '%d %A',
			validator: isString
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
		handlerContainerNode: {
			valueFn: function() {
				return A.Node.create(TPL_SCHEDULER_VIEW_DAY_HANDLER);
			}
		},

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
		colDaysNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY, 1),
		colHeaderDaysNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_DAY, 2),
		hanlderContainerNode: DOT+CSS_SCHEDULER_VIEW_DAY_HANDLER_CONTAINER,
		headerTableNode: DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE,
		markercellsNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_MARKERCELL, 24),
		tableNode: DOT+CSS_SCHEDULER_VIEW_DAY_TABLE,
		timesNode: getNodeListHTMLParser(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_TIME, 24)
	},

	EXTENDS: A.SchedulerView,

	prototype: {
		initializer: function() {
			var instance = this;

			instance[COL_DAYS_NODE] = instance.get(COL_DAYS_NODE);
			instance[COL_HEADER_DAYS_NODE] = instance.get(COL_HEADER_DAYS_NODE);
			instance[HANDLER_CONTAINER_NODE] = instance.get(HANDLER_CONTAINER_NODE);
			instance[HEADER_TABLE_NODE] = instance.get(HEADER_TABLE_NODE);
			instance[MARKERCELLS_NODE] = instance.get(MARKERCELLS_NODE);
			instance[TABLE_NODE] = instance.get(TABLE_NODE);
			instance[TIMES_NODE] = instance.get(TIMES_NODE);

			instance[ACTIVE_COLUMN] = null;
			instance[COLUMN_DATA] = instance[TABLE_NODE].one(DOT+CSS_SCHEDULER_VIEW_DAY_COLDATA);
			instance[COLUMN_DAY_HEADER] = instance.headerTableNode.one(DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_COL);
			instance[COLUMN_SHIMS] = instance[COL_DAYS_NODE].all(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM);
			instance[COLUMN_TIME] = instance[TABLE_NODE].one(DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME);
			instance[GRID_CONTAINER] = instance[TABLE_NODE].one(DOT+CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER);
			instance[MARKERS_NODE] = instance[TABLE_NODE].one(DOT+CSS_SCHEDULER_VIEW_DAY_MARKERS);
		},

		renderUI: function() {
			var instance = this;

			instance[COLUMN_TIME].setContent(instance[TIMES_NODE]);
			instance[MARKERS_NODE].setContent(instance[MARKERCELLS_NODE]);
			instance[COL_DAYS_NODE].appendTo(instance[COLUMN_DATA]);
			instance[COL_HEADER_DAYS_NODE].appendTo(instance[COLUMN_DAY_HEADER]);
		},

		bindUI: function() {
			var instance = this;

			instance.headerTableNode.delegate('click', A.bind(instance._onClickDaysHeader, instance), DOT+CSS_SCHEDULER_VIEW_DAY_HEADER_DAY);
			instance[COLUMN_DATA].delegate('mousedown', A.bind(instance._onMouseDownTableCol, instance), DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL);
			instance[COLUMN_DATA].delegate('mouseenter', A.bind(instance._onMouseEnterSchedulerEvent, instance), DOT+CSS_SCHEDULER_EVENT);
			instance[COLUMN_DATA].delegate('mouseleave', A.bind(instance._onMouseLeaveSchedulerEvent, instance), DOT+CSS_SCHEDULER_EVENT);
			instance[COLUMN_DATA].delegate('mousemove', A.bind(instance._onMouseMoveTableCol, instance), DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY);
			instance[COLUMN_DATA].delegate('mouseup', A.bind(instance._onMouseUpTableCol, instance), DOT+CSS_SCHEDULER_VIEW_DAY_TABLE_COL);

			instance.on('drag:end', instance._onEventDragEnd);
			instance.on('drag:start', instance._onEventDragStart);
			instance.on('drag:tickAlignY', instance._dragTickAlignY);
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

			instance.setStdModContent(
				WidgetStdMod.HEADER, instance[HEADER_TABLE_NODE].getDOM());
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

			instance.syncEventTopUI(evt);
			instance.syncEventHeightUI(evt);
		},

		plotEvents: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			instance[COLUMN_SHIMS].each(function(colShimNode, i) {
				var columnEvents = scheduler.getEventsByDay(instance.getDateByColumn(i), true);

				colShimNode.empty();

				A.Array.each(columnEvents, function(evt) {
					if (evt.getHoursDuration() <= 24) {
						instance.plotEvent(evt);
					}
				});

				instance.syncEventsIntersectionUI(columnEvents);
			});
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
			var dateFormat = instance.get(HEADER_DATE_FORMAT);
			var locale = instance.get(LOCALE);

			instance[COL_HEADER_DAYS_NODE].all(ANCHOR).each(
				function(columnNode, i) {
					var columnDate = DateMath.add(currentDate, DateMath.DAY, i);

					var formatted = A.DataType.Date.format(columnDate, {
						format: dateFormat,
						locale: locale
					});

					columnNode.toggleClass(
						CSS_SCHEDULER_TODAY_HD, DateMath.isToday(columnDate));

					columnNode.html(formatted);
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

		calculateYDelta: function(startXY, xy) {
			var instance = this;

			return (xy[1] - startXY[1])/(instance.get(HOUR_HEIGHT)/2)*30;
		},

		findEventIntersections: function(evt, events) {
			var instance = this;
			var group = [];

			A.Array.each(events, function(evtCmp) {
				if (!evt._filtered && evt.intersectHours(evtCmp) && (!evtCmp.isDayOverlapEvent() || evtCmp.isDayBoundaryEvent())) {
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

			if (draggingEvent) {
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
			var draggingEvent = instance[DRAGGING_EVENT];

			if (draggingEvent) {
				var dd = event.target.get(HOST);
				var placeholder = instance[EVENT_PLACEHOLDER];
				var delta = instance.calculateYDelta(instance[START_XY], dd.actXY);

				if (instance[RESIZING]) {
					placeholder.set(END_DATE, DateMath.add(instance.draggingEventEndDate, DateMath.MINUTES, delta));
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
					recorder.set(END_DATE, endDate);

					instance[CREATION_START_DATE] = startDate;
					instance[CREATION_END_DATE] = endDate;

					event.halt();
				}
				else if (target.test(DOT+CSS_SCHEDULER_VIEW_DAY_HANDLER)) {
					instance[RESIZING] = true;
				}
			}

			instance.get(BOUNDING_BOX).unselectable();
		},

		_onMouseEnterSchedulerEvent: function(event) {
			var instance = this;
			var target = event.currentTarget;

			instance[HANDLER_CONTAINER_NODE].appendTo(target);
		},

		_onMouseLeaveSchedulerEvent: function(event) {
			var instance = this;
			var target = event.currentTarget;

			target.removeChild(instance[HANDLER_CONTAINER_NODE]);
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
					recorder.showOverlay();
				}
			}

			instance[CREATION_START_DATE] = null;
			instance[CREATION_END_DATE] = null;
			instance[RESIZING] = false;
			instance[START_XY] = null;

			instance.get(BOUNDING_BOX).selectable();
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
var CSS_ICON = getCN(ICON),
	CSS_ICON_ARROWSTOP_LEFT = getCN(ICON, 'arrowstop-1-l'),
	CSS_ICON_ARROWSTOP_RIGHT = getCN(ICON, 'arrowstop-1-r'),
	CSS_SVM_COLGRID = getCN(SCHEDULER_VIEW, MONTH, COLGRID),
	CSS_SVM_COLGRID_FIRST = getCN(SCHEDULER_VIEW, MONTH, COLGRID, FIRST),
	CSS_SVM_COLGRID_TODAY = getCN(SCHEDULER_VIEW, MONTH, COLGRID, TODAY),
	CSS_SVM_CONTAINER = getCN(SCHEDULER_VIEW, MONTH, CONTAINER),
	CSS_SVM_HEADER_COL = getCN(SCHEDULER_VIEW, MONTH, HEADER, COL),
	CSS_SVM_HEADER_DAY = getCN(SCHEDULER_VIEW, MONTH, HEADER, DAY),
	CSS_SVM_HEADER_TABLE = getCN(SCHEDULER_VIEW, MONTH, HEADER, TABLE),
	CSS_SVM_LASSO = getCN(SCHEDULER_VIEW, MONTH, LASSO),
	CSS_SVM_ROW = getCN(SCHEDULER_VIEW, MONTH, ROW),
	CSS_SVM_ROW_CONTAINER = getCN(SCHEDULER_VIEW, MONTH, ROW, CONTAINER),
	CSS_SVM_TABLE_DATA = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA),
	CSS_SVM_TABLE_DATA_COL = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL),
	CSS_SVM_TABLE_DATA_COL_NOMONTH = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, NOMONTH),
	CSS_SVM_TABLE_DATA_COL_TITLE = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, TITLE),
	CSS_SVM_TABLE_DATA_COL_TITLE_DOWN = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, TITLE, DOWN),
	CSS_SVM_TABLE_DATA_COL_TITLE_FIRST = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, TITLE, FIRST),
	CSS_SVM_TABLE_DATA_COL_TITLE_NEXT = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, TITLE, NEXT),
	CSS_SVM_TABLE_DATA_COL_TITLE_TODAY = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, COL, TITLE, TODAY),
	CSS_SVM_TABLE_DATA_EVENT = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, EVENT),
	CSS_SVM_TABLE_DATA_EVENT_LEFT = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, EVENT, LEFT),
	CSS_SVM_TABLE_DATA_EVENT_REPEATED = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, EVENT, REPEATED),
	CSS_SVM_TABLE_DATA_EVENT_RIGHT = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, EVENT, RIGHT),
	CSS_SVM_TABLE_DATA_FIRST = getCN(SCHEDULER_VIEW, MONTH, TABLE, DATA, FIRST),
	CSS_SVM_TABLE_GRID = getCN(SCHEDULER_VIEW, MONTH, TABLE, GRID),
	CSS_SVM_TABLE_GRID_FIRST = getCN(SCHEDULER_VIEW, MONTH, TABLE, GRID, FIRST),

	TPL_SVM_HEADER_TABLE = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVM_HEADER_TABLE + '">' +
								'<tbody>' +
									'<tr class="' + CSS_SVM_HEADER_COL + '"></tr>' +
								'</tbody>' +
							 '</table>',

	TPL_SVM_HEADER_DAY = '<th class="' + CSS_SVM_HEADER_DAY + '"><div>&nbsp;</div></th>',

	TPL_SVM_LASSO = '<div class="' + CSS_SVM_LASSO + '"></div>',

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

			instance.evtDateStack = {};
			instance.evtDataTableStack = {};

			instance[COL_HEADER_DAYS_NODE] = instance.get(COL_HEADER_DAYS_NODE);
			instance[HEADER_TABLE_NODE] = instance.get(HEADER_TABLE_NODE);
			instance[MONTH_CONTAINER_NODE] = instance.get(MONTH_CONTAINER_NODE);
			instance[TABLE_GRID_NODE] = instance.get(TABLE_GRID_NODE);

			instance[COLUMN_DAY_HEADER] = instance.headerTableNode.one(DOT+CSS_SVM_HEADER_COL);
			instance[COLUMN_TABLE_GRID] = instance[TABLE_GRID_NODE].all(TD);
			instance[MONTH_ROWS] = instance[MONTH_CONTAINER_NODE].all(DOT+CSS_SVM_ROW);
		},

		bindUI: function() {
			var instance = this;
			var recorder = instance.get(SCHEDULER).get(EVENT_RECORDER);

			recorder.on({
				cancel: A.bind(instance.removeLasso, instance),
				save: A.bind(instance.removeLasso, instance)
			});

			instance[MONTH_CONTAINER_NODE].on({
				mousedown: A.bind(instance._onMouseDownGrid, instance),
				mousemove: A.bind(instance._onMouseMoveGrid, instance),
				mouseup: A.bind(instance._onMouseUpGrid, instance)
			});
		},

		renderUI: function() {
			var instance = this;

			instance.colHeaderDaysNode.appendTo(instance[COLUMN_DAY_HEADER]);

			instance[MONTH_ROWS].each(function(rowNode, index) {
				var tableGridNode = instance[TABLE_GRID_NODE].item(index);

				rowNode.append(
					tableGridNode.toggleClass(CSS_SVM_TABLE_GRID_FIRST, (index === 0))
				);
			});
		},

		adjustCurrentDate: function() {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);

			scheduler.set(
				CURRENT_DATE,
				instance._findCurrentMonthStart()
			);
		},

		buildEventsTable: function(rowStartDate, rowEndDate) {
			var instance = this;
			var displayRows = 4;
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
							(index === 0)
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

				var r;

				for (r = 0; r < displayRows; r++) {
					var renderIndex = 0;
					var rowNode = A.Node.create(TPL_SVM_TABLE_DATA_ROW);

					instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
						if (renderIndex <= index) {
							var events = instance.getIntersectEvents(celDate), evt = events[r];
							var evtColNode = A.Node.create(TPL_SVM_TABLE_DATA_COL);

							if (evt) {
								var startDate = evt.get(START_DATE);

								if (!(DateMath.before(startDate, rowStartDate) && DateMath.getDayOffset(celDate, rowStartDate) > 0)) {
									var evtNodeList = evt.get(NODE);
									var paddingIndex = Math.floor(DateMath.getDayOffset(celDate, DateMath.getFirstDayOfWeek(startDate)) / WEEK_LENGTH);

									if (evtNodeList.size() < paddingIndex + 1) {
										evt.addPaddingNode();
									}

									var evtNode = evtNodeList.item(paddingIndex);

									evtNode.setStyles({
										height: 'auto',
										left: 0,
										top: 0,
										width: 'auto'
									});

									var evtNodeContainer = evtColNode.one(DIV);

									evtNode.appendTo(evtNodeContainer);

									var splitInfo = instance._getEvtSplitInfo(evt, celDate, rowStartDate, rowEndDate);

									evtColNode.attr(COLSPAN, splitInfo.colspan);
									evtNodeContainer.addClass(CSS_SVM_TABLE_DATA_EVENT);

									if (splitInfo.left) {
										evtNodeContainer.addClass(CSS_SVM_TABLE_DATA_EVENT_LEFT).prepend(TPL_SVM_EV_ICON_LEFT);
									}

									if (splitInfo.right) {
										evtNodeContainer.addClass(CSS_SVM_TABLE_DATA_EVENT_RIGHT).append(TPL_SVM_EV_ICON_RIGHT);
									}

									if (evt.get(PARENT_EVENT)) {
										evtNodeContainer.addClass(CSS_SVM_TABLE_DATA_EVENT_REPEATED);
									}

									renderIndex += splitInfo.colspan;
								}
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

		loopDates: function(startDate, endDate, fn, incrementBy, factor) {
			var instance = this;
			var curDate = DateMath.clone(startDate);
			var endDateMs = endDate.getTime(), index;

			for (index = 0; curDate.getTime() <= endDateMs; index++) {
				fn.apply(instance, [curDate, index]);

				curDate = DateMath.add(curDate, (incrementBy || DateMath.DAY), (factor || 1));
			}
		},

		plotEvents: function() {
			var instance = this;
			var monthStartDate = instance._findCurrentMonthStart();
			var startDateRef = DateMath.safeClearTime(instance._findFirstDayOfWeek(monthStartDate));

			instance.flushViewCache();

			instance.bodyNode.all(DOT+CSS_SVM_TABLE_DATA).remove();

			instance[MONTH_ROWS].each(function(rowNode, index) {
				var rowStartDate = DateMath.add(startDateRef, DateMath.WEEK, index);
				var rowEndDate = DateMath.add(rowStartDate, DateMath.DAY, WEEK_LENGTH - 1);
				var tableNode = instance.buildEventsTable(rowStartDate, rowEndDate);

				if (index === 0) {
					tableNode.addClass(CSS_SVM_TABLE_DATA_FIRST);
				}

				rowNode.append(tableNode);
			});
		},

		removeLasso: function() {
			var instance = this;

			if (instance.lasso) {
				instance.lasso.remove();
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

				var lassoNode = A.Node.create(TPL_SVM_LASSO);

				instance.lasso.push(lassoNode);

				instance[MONTH_CONTAINER_NODE].append(lassoNode);
				lassoNode.sizeTo(w, h);
				lassoNode.setXY(instance._offsetXY([x, y], 1));
			}
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

		syncGridUI: function() {
			var instance = this;
			var today = instance.getToday();
			var scheduler = instance.get(SCHEDULER);

			instance[COLUMN_TABLE_GRID].removeClass(CSS_SVM_COLGRID_TODAY);

			if (DateMath.isSameMonth(today, scheduler.get(CURRENT_DATE))) {
				var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);
				var monthStartDate = instance._findCurrentMonthStart();
				var firstWeekDay = instance._findFirstDayOfWeek(today);

				var rowIndex = DateMath.getWeekNumber(today, firstDayOfWeek) - DateMath.getWeekNumber(monthStartDate, firstDayOfWeek);
				var colIndex = (today.getDate() - firstWeekDay.getDate());
				var todayCel = instance[TABLE_GRID_NODE].item(rowIndex).all(TD).item(colIndex);

				if (todayCel) {
					todayCel.addClass(CSS_SVM_COLGRID_TODAY);
				}
			}
		},

		syncStdContent: function() {
			var instance = this;

			instance.setStdModContent(
				WidgetStdMod.BODY, instance[MONTH_CONTAINER_NODE].getDOM());

			instance.setStdModContent(
				WidgetStdMod.HEADER, instance[HEADER_TABLE_NODE].getDOM());
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

		_getEvtSplitInfo: function(evt, celDate, rowStartDate, rowEndDate) {
			var instance = this;
			var startDate = evt.getClearStartDate();
			var endDate = evt.getClearEndDate();

			var firstWeekDay = DateMath.getFirstDayOfWeek(celDate);
			var maxColspan = rowEndDate.getDate() - celDate.getDate();

			var info = {
				colspan: Math.min(DateMath.getDayOffset(endDate, celDate), maxColspan) + 1,
				left: DateMath.before(startDate, rowStartDate),
				right: DateMath.after(endDate, rowEndDate)
			};

			return info;
		},

		_getPositionDate: function(position) {
			var instance = this;
			var monthStartDate = instance._findCurrentMonthStart();
			var startDateRef = DateMath.safeClearTime(instance._findFirstDayOfWeek(monthStartDate));

			return DateMath.add(startDateRef, DateMath.DAY, instance._getCellIndex(position));
		},

		_getCellIndex: function(position) {
			var instance = this;

			return position[1] * WEEK_LENGTH + position[0];
		},

		_offsetXY: function(xy, sign) {
			var instance = this;
			var offsetXY = instance[MONTH_CONTAINER_NODE].getXY();

			return [ xy[0] + offsetXY[0]*sign, xy[1] + offsetXY[1]*sign ];
		},

		_onMouseDownGrid: function(event) {
			var instance = this;
			var target = event.target;

			if (target.test([DOT+CSS_SVM_COLGRID, DOT+CSS_SVM_TABLE_DATA_COL].join(COMMA))) {
				instance._recording = true;

				var cell = instance[TABLE_GRID_NODE].item(0).all(TD).item(0);

				instance.gridCellHeight = instance[MONTH_CONTAINER_NODE].get(OFFSET_HEIGHT)/6;
				instance.gridCellWidth = instance[MONTH_CONTAINER_NODE].get(OFFSET_WIDTH)/WEEK_LENGTH;

				var eventXY = instance._offsetXY([event.pageX, event.pageY], -1);

				instance.lassoStartPosition = instance.lassoLastPosition = instance._findPosition(eventXY);

				instance.renderLasso(instance.lassoStartPosition, instance.lassoLastPosition);

				instance[MONTH_CONTAINER_NODE].unselectable();
			}
		},

		_onMouseMoveGrid: function(event) {
			var instance = this;
			var target = event.currentTarget;

			var eventXY = instance._offsetXY([event.pageX, event.pageY], -1);
			var lassoLastPosition = instance.lassoLastPosition || instance.lassoStartPosition;
			var position = instance._findPosition(eventXY);
			var changed = lassoLastPosition &&
							((position[0] !== lassoLastPosition[0]) ||
								(position[1] !== lassoLastPosition[1]));

			if (changed && instance._recording) {
				instance.lassoLastPosition = position;

				instance.renderLasso(instance.lassoStartPosition, position);
			}
		},

		_onMouseUpGrid: function(event) {
			var instance = this;
			var scheduler = instance.get(SCHEDULER);
			var recorder = scheduler.get(EVENT_RECORDER);

			if (recorder && instance._recording && !scheduler.get(DISABLED)) {
				var startDate = instance._getPositionDate(instance.lassoStartPosition);
				var endDate = instance._getPositionDate(instance.lassoLastPosition);

				recorder.set(START_DATE, Math.min(startDate, endDate));
				recorder.set(END_DATE, Math.max(startDate, endDate));

				recorder.showOverlay([event.pageX, event.pageY]);

				instance._recording = false;
			}
		},

		_findPosition: function(xy) {
			var instance = this;

			var i = Math.floor(xy[0] / instance.gridCellWidth);
			var j = Math.floor(xy[1] / instance.gridCellHeight);

			return [i, j];
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

}, '@VERSION@' ,{skinnable:true, requires:['aui-scheduler-event','aui-calendar','aui-button-item','dd-drag','dd-delegate','dd-drop','dd-constrain']});
