YUI.add('aui-scheduler-view-table-dd', function (A, NAME) {

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

    getCN = A.getClassName,

    CSS_SCHEDULER_EVENT = getCN('scheduler-event'),
    CSS_SCHEDULER_EVENT_DISABLED = getCN('scheduler-event', 'disabled'),

    CSS_SVT_COLGRID = getCN('scheduler-view', 'table', 'colgrid'),
    CSS_SVT_DRAGGING = getCN('scheduler-view', 'table', 'dragging'),
    CSS_SVT_LASSO = getCN('scheduler-view', 'table', 'lasso'),
    CSS_SVT_PROXY_NODE = getCN('scheduler-view', 'table', 'proxy', 'node'),
    CSS_SVT_TABLE_DATA_COL = getCN('scheduler-view', 'table', 'data', 'col'),

    TPL_SVT_LASSO = '<div class="' + CSS_SVT_LASSO + '"></div>',
    TPL_SVT_PROXY_NODE = '<div class="' + CSS_SVT_PROXY_NODE + '"></div>';

/**
 * A base class for `SchedulerTableViewDD`.
 *
 * @class A.SchedulerTableViewDD
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.SchedulerTableViewDD = function() {};

/**
 * Static property used to define the default attribute
 * configuration for the `SchedulerTableViewDD`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
A.SchedulerTableViewDD.ATTRS = {

    /**
     * Configures this view's `DD.Delegate`.
     *
     * @attribute delegateConfig
     * @default {}
     * @type {Object}
     */
    delegateConfig: {
        value: {},
        setter: function(val) {
            var instance = this;

            return A.merge({
                    dragConfig: {
                        offsetNode: false,
                        useShim: false
                    },
                    bubbleTargets: instance,
                    container: instance.get('boundingBox'),
                    nodes: '.' + CSS_SCHEDULER_EVENT,
                    invalid: 'input, select, button, a, textarea, ' + '.' + CSS_SCHEDULER_EVENT_DISABLED
                },
                val || {}
            );
        },
        validator: isObject
    }

};

A.mix(A.SchedulerTableViewDD.prototype, {

    /**
     * Construction logic executed during `SchedulerTableViewDD` instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance.proxyNode = A.Node.create(TPL_SVT_PROXY_NODE);

        instance.after(instance.viewDDBindUI, instance, 'bindUI');
        instance.after(instance.viewDDRenderUI, instance, 'renderUI');
        instance.after(instance.viewDDSyncUI, instance, 'syncUI');
    },

    /**
     * Binds the scheduler view `DD.Delegate` events on the UI. Lifecycle.
     *
     * @method viewDDBindUI
     */
    viewDDBindUI: function() {
        var instance = this;
        var recorder = instance.get('scheduler').get('eventRecorder');

        if (recorder) {
            recorder.on({
                cancel: A.bind(instance.removeLasso, instance),
                save: A.bind(instance.removeLasso, instance)
            });
        }

        instance.rowsContainerNode.on({
            mousedown: A.bind(instance._onMouseDownGrid, instance),
            mousemove: A.bind(instance._onMouseMoveGrid, instance),
            mouseup: A.bind(instance._onMouseUpGrid, instance)
        });

        instance.after('drag:align', instance._afterDragAlign);
        instance.on('drag:end', instance._onEventDragEnd);
        instance.on('drag:start', instance._onEventDragStart);
    },

    /**
     * Renders the scheduler view `DD.Delegate` instance. Lifecycle.
     *
     * @method viewDDRenderUI
     */
    viewDDRenderUI: function() {},

    /**
     * Syncs the scheduler view `DD.Delegate` instance. Lifecycle.
     *
     * @method viewDDSyncUI
     */
    viewDDSyncUI: function() {
        var instance = this;

        instance._setupDragDrop();
    },

    /**
     * Removes the table view lasso.
     *
     * @method removeLasso
     */
    removeLasso: function() {
        var instance = this;

        if (instance.lasso) {
            instance.lasso.remove();
        }
    },

    /**
     * Removes the table view proxy node.
     *
     * @method removeProxy
     */
    removeProxy: function() {
        var instance = this;

        if (instance.proxyNode) {
            instance.proxyNode.remove();
        }
    },

    /**
     * Renders the table view lasso at the given `ij` coordinates for the table
     * matrix. It represents the selection for the table view, e.g. `j`
     * represents a row and `i` a column, for `startPos` being `[0,0]` and
     * `endPos` being `[0,3]`, this method will render three nodes representing
     * the selected lasso.
     *
     * @method renderLasso
     * @param startPos {Array} Contains starting i, j posiiton to lasso.
     * @param endPos {Array} Contains ending i, j posiiton to lasso.
     */
    renderLasso: function(startPos, endPos) {
        var instance = this;

        var minPos = startPos;
        var maxPos = endPos;

        if (startPos[1] > endPos[1]) {
            minPos = endPos;
            maxPos = startPos;
        }

        var imin = minPos[0],
            jmin = minPos[1],
            imax = maxPos[0],
            jmax = maxPos[1],
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

            instance.rowsContainerNode.append(lassoNode);
            lassoNode.sizeTo(w, h);
            lassoNode.setXY(instance._offsetXY([x, y], 1));
        }
    },

    /**
     * Handles `dragAlign` events.
     *
     * @method _afterDragAlign
     * @param {EventFacade} event
     * @protected
     */
    _afterDragAlign: function(event) {
        var instance = this;

        var bodyRegion = instance.bodyNode.get('region');

        var mouseRegion = {
            bottom: event.pageY,
            left: event.pageX,
            right: event.pageX,
            top: event.pageY
        };

        if (!A.DOM.inRegion(null, bodyRegion, true, mouseRegion)) {
            return;
        }

        var draggingEvent = instance.draggingEvent;
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
     * Returns the grid cell position array for a given XY coordinate.
     *
     * @method _findPosition
     * @param {Array} xy
     * @return {Array} The grid cell position array for a given XY coordinate.
     * @protected
     */
    _findPosition: function(xy) {
        var instance = this;

        var i = Math.floor(xy[0] / instance.gridCellWidth);
        var j = Math.floor(xy[1] / instance.gridCellHeight);

        return [i, j];
    },

    /**
     * Return the position coordinate of a given `Date`.
     *
     * @method _getDatePosition
     * @param {Date} date
     * @protected
     * @return {Array} The position coordinate of a given `Date`.
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
     * Return the `Date` corresponding to a given position coordinate.
     *
     * @method _getPositionDate
     * @param {Array} position The XY position coordinate.
     * @protected
     * @return {Date} The `Date` corresponding to a given position coordinate.
     */
    _getPositionDate: function(position) {
        var instance = this,
            intervalStartDate = instance._findCurrentIntervalStart(),
            date = DateMath.add(intervalStartDate, DateMath.DAY, instance._getCellIndex(position));

        date.setHours(0, 0, 0, 0);

        return date;
    },

    /**
     * Indicates whether the lasso value has changed given a XY position
     * coordinate.
     *
     * @method _hasLassoChanged
     * @param position
     * @protected
     * @return {Boolean} Whether the lasso value has changed given a XY position
     * coordinate.
     */
    _hasLassoChanged: function(position) {
        var instance = this;

        var lassoLastPosition = instance.lassoLastPosition || instance.lassoStartPosition;

        return lassoLastPosition && ((position[0] !== lassoLastPosition[0]) || (position[1] !== lassoLastPosition[1]));
    },

    /**
     * Returns the offset XY coordinate given an XY coordinate and a sign.
     *
     * @method _offsetXY
     * @param {Array} xy
     * @param {Number} sign
     * @protected
     * @return {Array} The offset XY coordinate given an XY coordinate and a sign.
     */
    _offsetXY: function(xy, sign) {
        var instance = this;
        var offsetXY = instance.rowsContainerNode.getXY();

        return [xy[0] + offsetXY[0] * sign, xy[1] + offsetXY[1] * sign];
    },

    /**
     * Handle `eventDragEnd` events.
     *
     * @method _onEventDragEnd
     * @param {EventFacade} event
     * @protected
     */
    _onEventDragEnd: function(event) {
        var instance = this;
        var draggingEvent = instance.draggingEvent;

        if (draggingEvent) {
            var positionDate = instance._getPositionDate(instance.lassoLastPosition);

            DateMath.copyHours(positionDate, draggingEvent.get('startDate'));
            draggingEvent.move(positionDate);
            draggingEvent.set('visible', true, {
                silent: true
            });

            instance.rowsContainerNode.removeClass(CSS_SVT_DRAGGING).unselectable();

            event.target.set('dragNode', instance.originalDragNode);

            instance.removeLasso();
            instance.removeProxy();

            instance.get('scheduler').syncEventsUI();
        }

        instance.draggingEvent = null;
    },

    /**
     * Handle `eventDragStart` events.
     *
     * @method _onEventDragStart
     * @param {EventFacade} event
     * @protected
     */
    _onEventDragStart: function(event) {
        var instance = this;
        var draggingEvent = instance.draggingEvent =
            instance.delegate.dd.get('node').getData('scheduler-event');

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

            draggingEvent.set('visible', false, {
                silent: true
            });

            instance.lassoStartPosition = instance.lassoLastPosition = startPosition;

            instance.rowsContainerNode.addClass(CSS_SVT_DRAGGING).unselectable();

            instance.originalDragNode = event.target.get('dragNode');

            event.target.set('dragNode', instance.proxyNode);
        }
    },

    /**
     * Handle `mouseDownGrid` events.
     *
     * @method _onMouseDownGrid
     * @param {EventFacade} event
     * @protected
     */
    _onMouseDownGrid: function(event) {
        var instance = this;
        var scheduler = instance.get('scheduler');
        var recorder = scheduler.get('eventRecorder');
        var target = event.target;

        if (recorder && !scheduler.get('disabled') &&
            target.test(['.' + CSS_SVT_COLGRID, '.' + CSS_SVT_TABLE_DATA_COL].join())) {

            instance._recording = true;

            instance._syncCellDimensions();

            var eventXY = instance._offsetXY([event.pageX, event.pageY], -1);

            instance.lassoStartPosition = instance.lassoLastPosition = instance._findPosition(eventXY);

            instance.renderLasso(instance.lassoStartPosition, instance.lassoLastPosition);

            instance.rowsContainerNode.unselectable();
        }
    },

    /**
     * Handle `mouseMoveGrid` events.
     *
     * @method _onMouseMoveGrid
     * @param {EventFacade} event
     * @protected
     */
    _onMouseMoveGrid: function(event) {
        var instance = this;

        var eventXY = [event.pageX, event.pageY];
        var position = instance._findPosition(instance._offsetXY(eventXY, -1));

        if (instance._recording && instance._hasLassoChanged(position)) {
            instance.lassoLastPosition = position;

            instance.renderLasso(instance.lassoStartPosition, position);
        }
    },

    /**
     * Handle `mouseUpGrid` events.
     *
     * @method _onMouseUpGrid
     * @param {EventFacade} event
     * @protected
     */
    _onMouseUpGrid: function() {
        var instance = this;
        var scheduler = instance.get('scheduler');
        var recorder = scheduler.get('eventRecorder');

        if (recorder && instance._recording && !scheduler.get('disabled')) {
            var startPositionDate = instance._getPositionDate(instance.lassoStartPosition);
            var endPositionDate = instance._getPositionDate(instance.lassoLastPosition);

            var startDate = new Date(Math.min(startPositionDate, endPositionDate));
            startDate.setHours(0, 0, 0);

            var endDate = new Date(Math.max(startPositionDate, endPositionDate));
            endDate.setHours(23, 59, 59);

            recorder.hidePopover();

            recorder.setAttrs({
                allDay: true,
                endDate: endDate,
                startDate: startDate
            }, {
                silent: true
            });

            recorder.showPopover(instance.lasso);

            instance._recording = false;
        }
    },

    /**
     * Configures a `DD.Delegate` that handles `DD` events for this
     * `SchedulerTableViewDD`s.
     *
     * @method _setupDragDrop
     * @protected
     */
    _setupDragDrop: function() {
        var instance = this;

        if (!instance.delegate) {
            instance.delegate = new A.DD.Delegate(
                instance.get('delegateConfig'));
        }

        var dd = instance.delegate.dd;

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
     * Updates this `SchedulerTableViewDD`'s grid cell dimension properties.
     *
     * @method _syncCellDimensions
     * @protected
     */
    _syncCellDimensions: function() {
        var instance = this;

        var displayDaysInterval = instance.get('displayDaysInterval');
        var displayRowsCount = Math.ceil(displayDaysInterval / WEEK_LENGTH);
        var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

        instance.gridCellHeight = instance.rowsContainerNode.get('offsetHeight') / displayRowsCount;
        instance.gridCellWidth = instance.rowsContainerNode.get('offsetWidth') / weekDaysCount;
    },

    /**
     * Updates this `SchedulerTableViewDD`'s proxyNode UI styles and content.
     *
     * @method _syncProxyNodeUI
     * @param {A.SchedulerEvent} evt A `Scheduler` event.
     * @protected
     */
    _syncProxyNodeUI: function(evt) {
        var instance = this;

        var eventNode = evt.get('node').item(0);
        var eventNodePadding = evt.get('node').item(1);

        instance.proxyNode.setStyles({
            backgroundColor: eventNode.getStyle('backgroundColor'),
            color: eventNode.getStyle('color'),
            display: 'block'
        });

        if (!eventNodePadding || !eventNodePadding.test(':visible')) {
            var offsetWidth = eventNode.get('offsetWidth');

            instance.proxyNode.set('offsetWidth', offsetWidth);
        }

        instance.proxyNode.appendTo(instance.rowsContainerNode);
        instance.proxyNode.setContent(evt.get('content'));
    }
});

A.Base.mix(A.SchedulerTableView, [A.SchedulerTableViewDD]);


}, '3.0.1', {"requires": ["dd-drag", "dd-delegate", "dd-drop", "aui-scheduler-view-table"]});
