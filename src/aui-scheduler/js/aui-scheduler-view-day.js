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

		delegateConfig: {
			value: {},
			setter: function(val) {
				var instance = this;

				return A.merge(
					{
						bubbleTargets: instance,
						container: instance.get(BOUNDING_BOX),
						// handles: [DOT+CSS_SCHEDULER_EVENT_TITLE],
						nodes: DOT+CSS_SCHEDULER_EVENT
					},
					val || {}
				);
			},
			validator: isObject
		},

		headerDateFormat: {
			value: '%a %d/%m',
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
		            bubbles: true
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
				instance.delegate = new A.DD.Delegate(
					instance.get(DELEGATE_CONFIG)
				);
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