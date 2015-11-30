YUI.add('aui-scheduler-touch', function (A, NAME) {

/**
 * This module adds some behavior for the scheduler when running on touch devices.
 * This will be mixed into the Scheduler automatically when loaded.
 *
 * @module aui-scheduler-touch
 */

var CSS_SCHEDULER_EVENT = A.getClassName('scheduler-event'),
    CSS_SCHEDULER_EVENT_ALL_DAY = A.getClassName('scheduler-event', 'all', 'day'),
    CSS_SCHEDULER_MOBILE = A.getClassName('scheduler', 'mobile'),
    CSS_SCHEDULER_VIEW_DAY_RESIZER = A.getClassName('scheduler-view', 'day', 'resizer'),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY = A.getClassName('scheduler-view', 'day', 'table', 'colday');

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
            A.on(this._onPrepareEventCreation, this, '_prepareEventCreation')
        );

        if (A.UA.mobile) {
            this._schedulerTouchEventHandles.push(
                A.after(this._afterPlotEvents, this, 'plotEvents')
            );
        }
    },

    /**
     * Fired after the `syncUI` method runs.
     *
     * @method _afterSyncUI
     * @protected
     */
    _afterSyncUI: function() {
        var scheduler = this.get('scheduler');

        if (A.UA.mobile) {
            scheduler.get('boundingBox').addClass(CSS_SCHEDULER_MOBILE);
        }
    },

    /**
     * Fired after the `plotEvents` method runs. Adds the resizer node to all
     * events, which is necessary on devices that don't have the hover interaction,
     * like mobile devices.
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
     * Fired before the `_prepareEventCreation` method runs. Prevents
     * the original method from running if it came from a touchstart
     * DOM event, as we only want this feature for click events on touch.
     *
     * @method _onPrepareEventCreation
     * @param {EventFacade} event
     * @protected
     */
    _onPrepareEventCreation: function(event) {
        if (event._event.type === 'touchstart') {
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
        value: A.UA.mobile ? 100 : 95,
        validator: A.Lang.isNumber
    }
};

A.Base.mix(A.SchedulerDayView, [SchedulerDayViewTouch]);


}, '3.0.1', {"requires": ["base-build", "aui-scheduler"], "skinnable": true});
