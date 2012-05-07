var CANCEL = 'cancel',
	LASSO = 'lasso',
	MOUSEDOWN = 'mousedown',
	MOUSEMOVE = 'mousemove',
	MOUSEUP = 'mouseup',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	SAVE = 'save',

	CSS_ICON = getCN(ICON),
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
									'<td class="' + [ CSS_SVM_COLGRID, CSS_SVM_COLGRID_FIRST ].join(SPACE) + '">&nbsp;</div></td>' +
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
			var scheduler = instance.get(SCHEDULER);
			var recorder = scheduler.get(EVENT_RECORDER);

			recorder.on(CANCEL,  A.bind(instance._removeLasso, instance));
			recorder.on(SAVE,  A.bind(instance._removeLasso, instance));

			instance[MONTH_CONTAINER_NODE].on(MOUSEDOWN, A.bind(instance._onMouseDownGrid, instance));
			instance[MONTH_CONTAINER_NODE].on(MOUSEMOVE, A.bind(instance._onMouseMoveGrid, instance));
			instance[MONTH_CONTAINER_NODE].on(MOUSEUP, A.bind(instance._onMouseUpGrid, instance));
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
				WidgetStdMod.HEADER, instance.headerTableNode.getDOM());
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

		_getCoordsColumn: function(ij) {
			var instance = this;

			return ij[1] * WEEK_LENGTH + ij[0];
		},

		_getCoordsDate: function(ij) {
			var instance = this;
			var monthStartDate = instance._findCurrentMonthStart();
			var startDateRef = DateMath.safeClearTime(instance._findFirstDayOfWeek(monthStartDate));

			return DateMath.add(startDateRef, DateMath.DAY, instance._getCoordsColumn(ij));
		},

		_normalizeXY: function(xy) {
			var instance = this;

			var offsetXY = instance[MONTH_CONTAINER_NODE].getXY();

			return [xy[0] - offsetXY[0], xy[1] - offsetXY[1]];
		},

		_onMouseDownGrid: function(event) {
			var instance = this;
			var target = event.target;

			if (target.test([DOT+CSS_SVM_COLGRID, DOT+CSS_SVM_TABLE_DATA_COL].join())) {
				instance._recording = true;

				var gridSample = instance[TABLE_GRID_NODE].item(0).all(TD).item(0);

				instance.gridCellHeight = gridSample.get(OFFSET_HEIGHT);
				instance.gridCellWidth = gridSample.get(OFFSET_WIDTH);

				var eventXY = instance._normalizeXY([event.pageX, event.pageY]);

				instance.lassoStartCoordinates = instance.lastCoords = instance._toCoordinates(eventXY);

				instance._renderLasso(instance.lassoStartCoordinates, instance.lastCoords);

				instance[MONTH_CONTAINER_NODE].unselectable();
			}
		},

		_onMouseMoveGrid: function(event) {
			var instance = this;
			var target = event.currentTarget;

			var eventXY = instance._normalizeXY([event.pageX, event.pageY]);

			var lastCoords = instance.lastCoords || instance.lassoStartCoordinates;
			var coords = instance._toCoordinates(eventXY);

			var changed = lastCoords && ((coords[0] != lastCoords[0]) || (coords[1] != lastCoords[1]));

			if (instance._recording && changed) {
				instance.lastCoords = coords;

				instance._renderLasso(instance.lassoStartCoordinates, coords);
			}
		},

		_onMouseUpGrid: function(event) {
			var instance = this;
			var target = event.currentTarget;
			var scheduler = instance.get(SCHEDULER);
			var recorder = scheduler.get(EVENT_RECORDER);

			if (instance._recording && recorder && !scheduler.get(DISABLED)) {
				var startDate = instance._getCoordsDate(instance.lassoStartCoordinates);
				var endDate = instance._getCoordsDate(instance.lastCoords);

				recorder.set(START_DATE, Math.min(startDate, endDate));
				recorder.set(END_DATE, Math.max(startDate, endDate));

				recorder.showOverlay([event.pageX, event.pageY]);

				instance._recording = false;
			}
		},

		_removeLasso: function() {
			var instance = this;

			if (instance.lasso) {
				instance.lasso.remove();
			}
		},

		_renderLasso: function(coordA, coordB) {
			var instance = this;

			var minCoord = coordA;
			var maxCoord = coordB;

			if (coordA[1] > coordB[1]) {
				minCoord = coordB;
				maxCoord = coordA;
			}

			instance.lasso = (instance.lasso || A.NodeList.create()).remove();

			var offsetXY = instance[MONTH_CONTAINER_NODE].getXY();

			for (var i = minCoord[1]; i < maxCoord[1] + 1; i++) {
				var height = instance.gridCellHeight,
					width = instance.gridCellWidth,
					x = offsetXY[0],
					y = offsetXY[1] + (height * i);

				if (i == minCoord[1]) {
					if (minCoord[1] == maxCoord[1]) {
						x += width * Math.min(minCoord[0], maxCoord[0]);

						width *= Math.abs(maxCoord[0] - minCoord[0]) + 1;
					}
					else {
						x += width * minCoord[0];

						width *= WEEK_LENGTH - minCoord[0];
					}
				}
				else if (i == maxCoord[1]) {
					width *= maxCoord[0] + 1;
				}
				else {
					width *= WEEK_LENGTH;
				}

				var lassoNode = A.Node.create(TPL_SVM_LASSO);

				instance[MONTH_CONTAINER_NODE].append(lassoNode);

				lassoNode.set(OFFSET_HEIGHT, height);
				lassoNode.set(OFFSET_WIDTH, width);

				lassoNode.setXY([x, y]);

				instance.lasso.push(lassoNode);
			}
		},

		_toCoordinates: function(xy) {
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