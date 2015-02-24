/**
 * This module adds some behavior for the scheduler when running on touch devices.
 * This will be mixed into the Scheduler automatically when loaded.
 *
 * @module aui-scheduler-touch
 */

var CSS_SCHEDULER_EVENT = A.getClassName('scheduler-event'),
    CSS_SCHEDULER_EVENT_ALL_DAY =  A.getClassName('scheduler-event', 'all', 'day'),
    CSS_SCHEDULER_VIEW_DAY_RESIZER = A.getClassName('scheduler-view', 'day', 'resizer'),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COL = A.getClassName('scheduler-view', 'day', 'table', 'col'),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY = A.getClassName('scheduler-view', 'day', 'table', 'colday'),
    CSS_SCHEDULER_TOUCH = A.getClassName('scheduler', 'touch');

function SchedulerDayViewTouch() {}

SchedulerDayViewTouch.prototype = {
    /**
     * Construction logic executed during instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._schedulerTouchEventHandles = [
            A.after(this._afterBindUI, this, 'bindUI'),
            A.after(this._afterSyncUI, this, 'syncUI')
        ];
    },

    /**
     * Destructor implementation. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        (new A.EventHandle(this._schedulerTouchEventHandles)).detach();
    },

    /**
     * Fired after the `bindUI` method runs.
     *
     * @method _afterBindUI
     * @protected
     */
    _afterBindUI: function() {
        this._schedulerTouchEventHandles.push(
            A.on(this._onPrepareEventCreation, this, '_prepareEventCreation'),
            A.after(this._afterPlotEvents, this, 'plotEvents'),
            this.columnData.delegate(
                'click',
                A.bind(this._onClickTableCol, this),
                '.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COL
            )
        );
    },

    /**
     * Fired after the `syncUI` method runs.
     *
     * @method _afterSyncUI
     * @protected
     */
    _afterSyncUI: function() {
        var scheduler = this.get('scheduler');

        scheduler.controlsNode.get('parentNode').prepend(scheduler.viewDateNode);
        scheduler.get('boundingBox').addClass(CSS_SCHEDULER_TOUCH);
    },

    /**
     * Overrides the form builder mouse events to use touch gestures instead.
     *
     * @method _bindMouseEvents
     * @protected
     */
    _bindMouseEvents: function() {
        this._schedulerTouchEventHandles.push(
            this.columnData.delegate(
                'gesturemovestart',
                A.bind(this._onGestureMoveStartTableCol, this),
                '.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COL
            ),
            this.columnData.delegate(
                'gesturemove',
                A.bind(this._onGestureMoveTableCol, this),
                '.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY
            ),
            this.columnData.delegate(
                'gesturemoveend',
                A.bind(this._onGestureMoveEndTableCol, this),
                '.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COL
            )
        );
    },

    /**
     * Fired after the `plotEvents` method runs. Adds the resizer node to all
     * events.
     *
     * @method _afterPlotEvents
     * @protected
     */
    _afterPlotEvents: function() {
        var instance = this;

        this.get('boundingBox').all('.' + CSS_SCHEDULER_EVENT).each(function() {
            if (!this.hasClass(CSS_SCHEDULER_EVENT_ALL_DAY) && !this.one('.' + CSS_SCHEDULER_VIEW_DAY_RESIZER)) {
                instance.get('resizerNode').cloneNode(true).appendTo(this);
            }
        });
    },

    /**
     * Finds and returns the column related to the given event. We need to find
     * this manually because the gesturemove event doesn't give us this information
     * directly through currentTarget, like the mousedown event does. It always
     * returns the event's original column instead.
     *
     * @method _findActiveColumn
     * @param {EventFacade} event
     * @protected
     */
    _findActiveColumn: function(event) {
        var allColumns = this.get('boundingBox').all('.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY),
            currentColumn;

        for (var i = 0; i < allColumns.size(); i++) {
            currentColumn = allColumns.item(i);
            if (currentColumn.get('region').left <= event.pageX &&
                event.pageX <= currentColumn.get('region').right) {

                return currentColumn;
            }
        }
    },

    /**
     * Fired when the `click` event is triggered for a table column.
     *
     * @method _onClickTableCol
     * @protected
     */
    _onClickTableCol: function(event) {
        var recorder = this.get('scheduler').get('eventRecorder');

        this._prepareEventCreation(event, 60);
        this.plotEvent(recorder);
        recorder.showPopover();

        this.creationStartDate = null;
        this.startXY = null;
    },

    /**
     * Fired on the `gesturemoveend` event.
     *
     * @method _onGestureMoveEndTableCol
     * @protected
     */
    _onGestureMoveEndTableCol: function() {
        this.resizing = false;

        this.get('boundingBox').selectable();
    },

    /**
     * Fired on the `gesturemovestart` event.
     *
     * @method _onGestureMoveStartTableCol
     * @param {EventFacade} event
     * @protected
     */
    _onGestureMoveStartTableCol: function(event) {
        this._onMouseDownTableCol(event);
    },

    /**
     * Fired on the `gesturemove` event.
     *
     * @method _onGestureMoveTableCol
     * @param {EventFacade} event
     * @protected
     */
    _onGestureMoveTableCol: function(event) {
        this._onMouseMoveTableCol(event);
    },

    /**
     * Fired before the `_prepareEventCreation` method runs. Prevents
     * the original method from running if it came from a gesturemovestart
     * DOM event, as we only want this feature for click events on touch.
     */
    _onPrepareEventCreation: function(event) {
        if (event.type === 'gesturemovestart') {
            return new A.Do.Prevent();
        }
    }
};

SchedulerDayViewTouch.ATTRS = {
    /**
     * Contains the width of a `SchedulerView` in pixels.
     *
     * @attribute eventWidth
     * @default 95
     * @type {Number}
     */
    eventWidth: {
        value: 100,
        validator: A.Lang.isNumber
    }
};

A.Base.mix(A.SchedulerDayView, [SchedulerDayViewTouch]);
