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