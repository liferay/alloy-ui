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
	CSS_SVT_LASSO = getCN(SCHEDULER_VIEW, TABLE, LASSO),
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

	TPL_SVT_LASSO = '<div class="' + CSS_SVT_LASSO + '"></div>',

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

		headerDateFormat: {
			value: '%a'
		},

		navigationDateFormat: {
			value: '%b %Y'
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
			var recorder = instance.get(SCHEDULER).get(EVENT_RECORDER);

			recorder.on({
				cancel: A.bind(instance.removeLasso, instance),
				save: A.bind(instance.removeLasso, instance)
			});

			instance[ROWS_CONTAINER_NODE].on({
				mousedown: A.bind(instance._onMouseDownGrid, instance),
				mousemove: A.bind(instance._onMouseMoveGrid, instance),
				mouseup: A.bind(instance._onMouseUpGrid, instance)
			});

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

				var lassoNode = A.Node.create(TPL_SVT_LASSO);

				instance.lasso.push(lassoNode);

				instance[ROWS_CONTAINER_NODE].append(lassoNode);
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

		_getCellIndex: function(position) {
			var instance = this;

			return position[1] * WEEK_LENGTH + position[0];
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

		_getPositionDate: function(position) {
			var instance = this;
			var intervalStartDate = instance._findCurrentIntervalStart();
			var startDateRef = DateMath.safeClearTime(instance._findFirstDayOfWeek(intervalStartDate));

			return DateMath.add(startDateRef, DateMath.DAY, instance._getCellIndex(position));
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

		_offsetXY: function(xy, sign) {
			var instance = this;
			var offsetXY = instance[ROWS_CONTAINER_NODE].getXY();

			return [ xy[0] + offsetXY[0]*sign, xy[1] + offsetXY[1]*sign ];
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

		_onMouseDownGrid: function(event) {
			var instance = this;
			var target = event.target;

			if (target.test([DOT+CSS_SVT_COLGRID, DOT+CSS_SVT_TABLE_DATA_COL].join(COMMA))) {
				instance._recording = true;

				var displayRowsCount = instance._getDisplayRowsCount();
				var displayRowDaysCount = instance._getDisplayRowDaysCount();

				instance.gridCellHeight = instance[ROWS_CONTAINER_NODE].get(OFFSET_HEIGHT) / displayRowsCount;
				instance.gridCellWidth = instance[ROWS_CONTAINER_NODE].get(OFFSET_WIDTH) / displayRowDaysCount;

				var eventXY = instance._offsetXY([event.pageX, event.pageY], -1);

				instance.lassoStartPosition = instance.lassoLastPosition = instance._findPosition(eventXY);

				instance.renderLasso(instance.lassoStartPosition, instance.lassoLastPosition);

				instance[ROWS_CONTAINER_NODE].unselectable();
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

				instance.hideEventsOverlay();

				instance._recording = false;
			}
		},

		_findPosition: function(xy) {
			var instance = this;

			var i = Math.floor(xy[0] / instance.gridCellWidth);
			var j = Math.floor(xy[1] / instance.gridCellHeight);

			return [i, j];
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