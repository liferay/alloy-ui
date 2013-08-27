/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-view-table-dd
 */

var Lang = A.Lang,
	isObject = Lang.isObject,

	DateMath = A.DataType.DateMath,

	WEEK_LENGTH = DateMath.WEEK_LENGTH,

	_DOT = '.',

	SCHEDULER_EVENT = 'scheduler-event',
	SCHEDULER_VIEW = 'scheduler-view',

	BOUNDING_BOX = 'boundingBox',
	COL = 'col',
	COLGRID = 'colgrid',
	CONTENT = 'content',
	DATA = 'data',
	DD = 'dd',
	DELEGATE = 'delegate',
	DELEGATE_CONFIG = 'delegateConfig',
	DISABLED = 'disabled',
	DISPLAY_DAYS_INTERVAL = 'displayDaysInterval',
	DRAG_NODE = 'dragNode',
	DRAGGING = 'dragging',
	DRAGGING_EVENT = 'draggingEvent',
	EVENT_RECORDER = 'eventRecorder',
	LASSO = 'lasso',
	NODE = 'node',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	PROXY = 'proxy',
	PROXY_NODE = 'proxyNode',
	REGION = 'region',
	ROWS_CONTAINER_NODE = 'rowsContainerNode',
	SCHEDULER = 'scheduler',
	START_DATE = 'startDate',
	TABLE = 'table',
	VISIBLE = 'visible',

	getCN = A.getClassName,

	CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
	CSS_SCHEDULER_EVENT_DISABLED = getCN(SCHEDULER_EVENT, DISABLED),

	CSS_SVT_COLGRID = getCN(SCHEDULER_VIEW, TABLE, COLGRID),
	CSS_SVT_DRAGGING = getCN(SCHEDULER_VIEW, TABLE, DRAGGING),
	CSS_SVT_LASSO = getCN(SCHEDULER_VIEW, TABLE, LASSO),
	CSS_SVT_PROXY_NODE = getCN(SCHEDULER_VIEW, TABLE, PROXY, NODE),
	CSS_SVT_TABLE_DATA_COL = getCN(SCHEDULER_VIEW, TABLE, DATA, COL),

	TPL_SVT_LASSO = '<div class="' + CSS_SVT_LASSO + '"></div>',
	TPL_SVT_PROXY_NODE = '<div class="' + CSS_SVT_PROXY_NODE + '"></div>';

/**
 * A base class for SchedulerTableViewDD.
 *
 * @class A.SchedulerTableViewDD
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.SchedulerTableViewDD = function() {};

/**
 * Static property used to define the default attribute
 * configuration for the SchedulerTableViewDD.
 *
 * @property SchedulerTableViewDD.ATTRS
 * @type Object
 * @static
 */
A.SchedulerTableViewDD.ATTRS = {

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @attribute delegateConfig
	 * @default {}
	 * @type Object
	 */
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
					nodes: _DOT+CSS_SCHEDULER_EVENT,
					invalid: 'input, select, button, a, textarea, ' + _DOT+CSS_SCHEDULER_EVENT_DISABLED
				},
				val || {}
			);
		},
		validator: isObject
	}

};

A.mix(A.SchedulerTableViewDD.prototype, {

	/**
	 * Construction logic executed during SchedulerTableViewDD instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function() {
		var instance = this;

		instance[PROXY_NODE] = A.Node.create(TPL_SVT_PROXY_NODE);

		instance.after(instance.viewDDBindUI, instance, 'bindUI');
		instance.after(instance.viewDDRenderUI, instance, 'renderUI');
		instance.after(instance.viewDDSyncUI, instance, 'syncUI');
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method viewDDBindUI
	 */
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

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method viewDDRenderUI
	 */
	viewDDRenderUI: function() {
		var instance = this;

	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method viewDDSyncUI
	 */
	viewDDSyncUI: function() {
		var instance = this;

		instance._setupDragDrop();
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method removeLasso
	 */
	removeLasso: function() {
		var instance = this;

		if (instance[LASSO]) {
			instance[LASSO].remove();
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method removeProxy
	 */
	removeProxy: function() {
		var instance = this;

		if (instance[PROXY_NODE]) {
			instance[PROXY_NODE].remove();
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method renderLasso
	 * @param startPos
	 * @param endPos
	 */
	renderLasso: function(startPos, endPos) {
		var instance = this;

		var minPos = startPos;
		var maxPos = endPos;

		if (startPos[1] > endPos[1]) {
			minPos = endPos;
			maxPos = startPos;
		}

		var imin = minPos[0], jmin = minPos[1],
			imax = maxPos[0], jmax = maxPos[1],
			j;

		instance.removeLasso();

		instance.lasso = A.NodeList.create();

		for (j = jmin; j <= jmax; j++) {
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

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _afterDragAlign
	 * @param event
	 * @protected
	 */
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

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _findPosition
	 * @param xy
	 * @protected
	 */
	_findPosition: function(xy) {
		var instance = this;

		var i = Math.floor(xy[0] / instance.gridCellWidth);
		var j = Math.floor(xy[1] / instance.gridCellHeight);

		return [i, j];
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _getDatePosition
	 * @param date
	 * @protected
	 */
	_getDatePosition: function(date) {
		var instance = this;

		var intervalStartDate = instance._findCurrentIntervalStart();
		var offset = DateMath.getDayOffset(date, intervalStartDate);

		var position = [];

		position[1] = Math.floor(offset / WEEK_LENGTH);
		position[0] = offset % WEEK_LENGTH;

		return position;
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _getPositionDate
	 * @param position
	 * @protected
	 */
	_getPositionDate: function(position) {
		var instance = this,
			intervalStartDate = instance._findCurrentIntervalStart(),
			date = DateMath.add(intervalStartDate, DateMath.DAY, instance._getCellIndex(position));

		date.setHours(0, 0, 0, 0);

		return date;
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _hasLassoChanged
	 * @param position
	 * @protected
	 */
	_hasLassoChanged: function(position) {
		var instance = this;

		var lassoLastPosition = instance.lassoLastPosition || instance.lassoStartPosition;

		return lassoLastPosition && ((position[0] !== lassoLastPosition[0]) || (position[1] !== lassoLastPosition[1]));
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _offsetXY
	 * @param xy, sign
	 * @protected
	 */
	_offsetXY: function(xy, sign) {
		var instance = this;
		var offsetXY = instance[ROWS_CONTAINER_NODE].getXY();

		return [ xy[0] + offsetXY[0]*sign, xy[1] + offsetXY[1]*sign ];
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _onEventDragEnd
	 * @param event
	 * @protected
	 */
	_onEventDragEnd: function(event) {
		var instance = this;
		var draggingEvent = instance[DRAGGING_EVENT];

		if (draggingEvent) {
			var positionDate = instance._getPositionDate(instance.lassoLastPosition);

			DateMath.copyHours(positionDate, draggingEvent.get(START_DATE));
			draggingEvent.move(positionDate);
			draggingEvent.set(VISIBLE, true, { silent: true });

			instance[ROWS_CONTAINER_NODE].removeClass(CSS_SVT_DRAGGING).unselectable();

			event.target.set(DRAG_NODE, instance.originalDragNode);

			instance.removeLasso();
			instance.removeProxy();

			instance.get(SCHEDULER).syncEventsUI();
		}

		instance[DRAGGING_EVENT] = null;
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _onEventDragStart
	 * @param event
	 * @protected
	 */
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

			instance._syncProxyNodeUI(draggingEvent);

			draggingEvent.set(VISIBLE, false, { silent: true });

			instance.lassoStartPosition = instance.lassoLastPosition = startPosition;

			instance[ROWS_CONTAINER_NODE].addClass(CSS_SVT_DRAGGING).unselectable();

			instance.originalDragNode = event.target.get(DRAG_NODE);

			event.target.set(DRAG_NODE, instance[PROXY_NODE]);
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _onMouseDownGrid
	 * @param event
	 * @protected
	 */
	_onMouseDownGrid: function(event) {
		var instance = this;
		var scheduler = instance.get(SCHEDULER);
		var recorder = scheduler.get(EVENT_RECORDER);
		var target = event.target;

		if (recorder && target.test([_DOT+CSS_SVT_COLGRID, _DOT+CSS_SVT_TABLE_DATA_COL].join())) {
			instance._recording = true;

			instance._syncCellDimensions();

			var eventXY = instance._offsetXY([event.pageX, event.pageY], -1);

			instance.lassoStartPosition = instance.lassoLastPosition = instance._findPosition(eventXY);

			instance.renderLasso(instance.lassoStartPosition, instance.lassoLastPosition);

			instance[ROWS_CONTAINER_NODE].unselectable();
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _onMouseMoveGrid
	 * @param event
	 * @protected
	 */
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

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _onMouseUpGrid
	 * @param event
	 * @protected
	 */
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

			recorder.setAttrs({
				allDay: true,
				endDate: endDate,
				startDate: startDate
			},
			{ silent: true });

			recorder.showPopover(instance.lasso);

			instance._recording = false;
		}
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _setupDragDrop
	 * @protected
	 */
	_setupDragDrop: function() {
		var instance = this;

		if (!instance[DELEGATE]) {
			instance[DELEGATE] = new A.DD.Delegate(
				instance.get(DELEGATE_CONFIG));
		}

		var dd = instance[DELEGATE][DD];

		dd.unplug(A.Plugin.DDNodeScroll);
		dd.unplug(A.Plugin.DDProxy);

		dd.plug(A.Plugin.DDNodeScroll, {
			node: instance.bodyNode,
			scrollDelay: 150
		});

		dd.plug(A.Plugin.DDProxy, {
			moveOnEnd: false,
			positionProxy: false
		});
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _syncCellDimensions
	 * @protected
	 */
	_syncCellDimensions: function() {
		var instance = this;

		var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
		var displayRowsCount = Math.ceil(displayDaysInterval / WEEK_LENGTH);
		var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

		instance.gridCellHeight = instance[ROWS_CONTAINER_NODE].get(OFFSET_HEIGHT) / displayRowsCount;
		instance.gridCellWidth = instance[ROWS_CONTAINER_NODE].get(OFFSET_WIDTH) / weekDaysCount;
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _syncProxyNodeUI
	 * @param evt
	 * @protected
	 */
	_syncProxyNodeUI: function(evt) {
		var instance = this;

		var eventNode = evt.get(NODE).item(0);
		var eventNodePadding = evt.get(NODE).item(1);

		instance[PROXY_NODE].setStyles({
			backgroundColor: eventNode.getStyle('backgroundColor'),
			display: 'block'
		});

		if (!eventNodePadding || !eventNodePadding.test(':visible')) {
			var offsetWidth = eventNode.get(OFFSET_WIDTH);

			instance[PROXY_NODE].set(OFFSET_WIDTH, offsetWidth);
		}

		instance[PROXY_NODE].appendTo(instance[ROWS_CONTAINER_NODE]);
		instance[PROXY_NODE].setContent(evt.get(CONTENT));
	}
});

A.Base.mix(A.SchedulerTableView, [ A.SchedulerTableViewDD ]);