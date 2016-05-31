/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-view-day
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isFunction = Lang.isFunction,
    isNumber = Lang.isNumber,
    isObject = Lang.isObject,

    DateMath = A.DataType.DateMath,
    WidgetStdMod = A.WidgetStdMod,

    getScrollbarWidth = A.cached(function() {
        var doc = A.config.doc,
            testNode = doc.createElement('div'),
            body = doc.getElementsByTagName('body')[0],
            // 0.1 because cached doesn't support falsy refetch values
            width = 0.1;

        if (body) {
            testNode.style.cssText = 'position:absolute;visibility:hidden;overflow:scroll;width:20px;';
            testNode.appendChild(doc.createElement('p')).style.height = '1px';
            body.insertBefore(testNode, body.firstChild);
            width = testNode.offsetWidth - testNode.clientWidth;

            body.removeChild(testNode);
        }

        return width;
    }, null, 0.1),

    getNodeListHTMLParser = function(selector, sizeCondition) {
        return function(srcNode) {
            var nodes = srcNode.all(selector);
            return (nodes.size() >= sizeCondition) ? nodes : null;
        };
    },

    roundToNearestMultiple = function(n, multiple) {
        return Math.round(n / multiple) * multiple;
    },

    toNumber = function(v) {
        return parseFloat(v) || 0;
    },

    getCN = A.getClassName,

    CSS_SVT_TABLE_DATA = getCN('scheduler-view', 'table', 'data'),

    CSS_SCHEDULER_EVENT = getCN('scheduler-event'),
    CSS_SCHEDULER_EVENT_DISABLED = getCN('scheduler-event', 'disabled'),
    CSS_SCHEDULER_EVENT_INTERSECTING = getCN('scheduler-event', 'intersecting'),
    CSS_SCHEDULER_EVENT_PROXY = getCN('scheduler-event', 'proxy'),

    CSS_SCHEDULER_TODAY = getCN('scheduler', 'today'),
    CSS_SCHEDULER_TODAY_HD = getCN('scheduler', 'today', 'hd'),

    CSS_SCHEDULER_VIEW_SCROLLABLE = getCN('scheduler-view', 'scrollable'),

    CSS_SCHEDULER_VIEW_DAY_COLDATA = getCN('scheduler-view', 'coldata'),
    CSS_SCHEDULER_VIEW_DAY_COLGRID = getCN('scheduler-view', 'colgrid'),
    CSS_SCHEDULER_VIEW_DAY_CURRENT_TIME = getCN('scheduler-view', 'day', 'current', 'time'),
    CSS_SCHEDULER_VIEW_DAY_GRID = getCN('scheduler-view', 'grid'),
    CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER = getCN('scheduler-view', 'grid', 'container'),
    CSS_SCHEDULER_VIEW_DAY_HEADER_COL = getCN('scheduler-view', 'day', 'header', 'col'),
    CSS_SCHEDULER_VIEW_DAY_HEADER_DAY = getCN('scheduler-view', 'day', 'header', 'day'),
    CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST = getCN('scheduler-view', 'day', 'header', 'day', 'first'),
    CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_NUMBER = getCN('scheduler-view', 'day', 'header', 'day', 'number'),
    CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_WEEKDAY = getCN('scheduler-view', 'day', 'header', 'day', 'weekday'),
    CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE = getCN('scheduler-view', 'day', 'header', 'table'),
    CSS_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL = getCN('scheduler-view', 'day', 'header', 'view', 'label'),
    CSS_SCHEDULER_VIEW_DAY_ICON_GRIP_HORIZONTAL = getCN('scheduler-view', 'icon', 'grip', 'horizontal'),
    CSS_SCHEDULER_VIEW_DAY_MARKER_DIVISION = getCN('scheduler-view', 'marker', 'division'),
    CSS_SCHEDULER_VIEW_DAY_MARKERCELL = getCN('scheduler-view', 'markercell'),
    CSS_SCHEDULER_VIEW_DAY_MARKERS = getCN('scheduler-view', 'markers'),
    CSS_SCHEDULER_VIEW_DAY_RESIZER = getCN('scheduler-view', 'day', 'resizer'),
    CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON = getCN('scheduler-view', 'day', 'resizer', 'icon'),
    CSS_SCHEDULER_VIEW_DAY_TABLE = getCN('scheduler-view', 'day', 'table'),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COL = getCN('scheduler-view', 'day', 'table', 'col'),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM = getCN('scheduler-view', 'day', 'table', 'col', 'shim'),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COLBLANK = getCN('scheduler-view', 'day', 'table', 'colblank'),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY = getCN('scheduler-view', 'day', 'table', 'colday'),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME = getCN('scheduler-view', 'day', 'table', 'coltime'),
    CSS_SCHEDULER_VIEW_DAY_TABLE_TIME = getCN('scheduler-view', 'day', 'table', 'time'),

    TPL_SCHEDULER_VIEW_DAY_CURRENT_TIME = '<div class="' + CSS_SCHEDULER_VIEW_DAY_CURRENT_TIME +
        '"></div>',

    TPL_SCHEDULER_VIEW_DAY_RESIZER = '<div class="' + CSS_SCHEDULER_VIEW_DAY_RESIZER + '">' +
        '<div class="' + [CSS_SCHEDULER_VIEW_DAY_ICON_GRIP_HORIZONTAL, CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON].join(' ') +
        '"></div>' +
        '</div>',

    TPL_SCHEDULER_VIEW_DAY_MARKERCELL = '<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKERCELL + '">' +
        '<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKER_DIVISION + '"></div>' +
        '</div>',

    TPL_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL = '<span class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL +
        '">{label}</span>',

    TPL_SCHEDULER_VIEW_DAY_TABLE = '<table cellspacing="0" cellpadding="0" class="' + CSS_SCHEDULER_VIEW_DAY_TABLE +
        '">' +
        '<tbody>' +
        '<tr class="' + CSS_SCHEDULER_VIEW_DAY_COLGRID + '" height="1">' +
        '<td height="0" class="' + [CSS_SCHEDULER_VIEW_DAY_TABLE_COL, CSS_SCHEDULER_VIEW_DAY_TABLE_COLBLANK].join(
            ' ') + '"></td>' +
        '<td class="' + CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER + '" colspan="1">' +
        '<div class="' + CSS_SCHEDULER_VIEW_DAY_GRID + '">' +
        '<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKERS + '"></div>' +
        '</div>' +
        '</td>' +
        '</tr>' +
        '<tr class="' + CSS_SCHEDULER_VIEW_DAY_COLDATA + '">' +
        '<td class="' + [CSS_SCHEDULER_VIEW_DAY_TABLE_COL, CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME].join(' ') +
        '"></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>',

    TPL_SCHEDULER_VIEW_DAY_TABLE_COLDAY = '<td class="' + [CSS_SCHEDULER_VIEW_DAY_TABLE_COL,
        CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY].join(' ') + '" data-colnumber="{colNumber}">' +
        '<div class="' + CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM + '">&nbsp;</div>' +
        '</td>',

    TPL_SCHEDULER_VIEW_DAY_TABLE_TIME = '<div class="' + CSS_SCHEDULER_VIEW_DAY_TABLE_TIME + '">{hour}</div>',

    TPL_SCHEDULER_VIEW_DAY_HEADER_TABLE = '<table cellspacing="0" cellpadding="0" class="' +
        CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE + '">' +
        '<tbody>' +
        '<tr class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_COL + '"></tr>' +
        '</tbody>' +
        '</table>',

    TPL_SCHEDULER_VIEW_DAY_HEADER_DAY = '<th class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_DAY +
        '" data-colnumber="{colNumber}"><a href="#">&nbsp;</a></th>',
    TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_CONTENT = '<span class="' + CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_WEEKDAY + '">%a</span> <span class="' +
        CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_NUMBER + '">%d</span>',
    TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST = '<td class="' + [CSS_SCHEDULER_VIEW_DAY_HEADER_DAY,
        CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST].join(' ') + '"></td>';

/**
 * A base class for `SchedulerDayView`.
 *
 * @class A.SchedulerDayView
 * @extends A.SchedulerView
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var SchedulerDayView = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type {String}
     * @static
     */
    NAME: 'scheduler-view-day',

    /**
     * Static property used to define the default attribute
     * configuration for the `SchedulerDayView`.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * Determines the content of Scheduler day view's body section.
         *
         * @attribute bodyContent
         * @default ''
         * @type {String}
         */
        bodyContent: {
            value: ''
        },

        /**
         * Contains the function that returns the `currentTime` node.
         *
         * @attribute currentTimeNode
         * return {Node}
         */
        currentTimeNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_VIEW_DAY_CURRENT_TIME);
            }
        },

        /**
         * Contains the number of day columns this view displays.
         *
         * @attribute days
         * @default 1
         * @type {Number}
         */
        days: {
            value: 1,
            validator: isNumber
        },

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
        },

        /**
         * Contains the width of a `SchedulerView` in pixels.
         *
         * @attribute eventWidth
         * @default 95
         * @type {Number}
         */
        eventWidth: {
            value: 95,
            validator: isNumber
        },

        /**
         * Applies a filter to `SchedulerEvent`s.
         *
         * @attribute filterFn
         * @type {Function}
         */
        filterFn: {
            value: function(evt) {
                return (evt.get('visible') && evt.getHoursDuration() <= 24 && !evt.get('allDay'));
            }
        },

        /**
         * Contains the function that formats the header date.
         *
         * @attribute headerDateFormatter
         * @type {Function}
         */
        headerDateFormatter: {
            value: function(date) {
                var instance = this;
                var scheduler = instance.get('scheduler');

                return A.DataType.Date.format(
                    date, {
                        format: TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_CONTENT,
                        locale: scheduler.get('locale')
                    }
                );
            },
            validator: isFunction
        },

        /**
         * Contains the header view.
         *
         * @attribute headerView
         * @default true
         * @type {Boolean}
         */
        headerView: {
            value: true,
            validator: isBoolean
        },

        /**
         * Configures the header day view.
         *
         * @attribute headerViewConfig
         * @default {}
         * @type {Object}
         */
        headerViewConfig: {
            setter: function(val) {
                return A.merge({
                        displayDaysInterval: 1,
                        displayRows: 6,
                        filterFn: function(evt) {
                            return ((evt.getHoursDuration() > 24) || evt.get('allDay'));
                        },
                        height: 'auto',
                        visible: true
                    },
                    val || {}
                );
            },
            value: {}
        },

        /**
         * Contains the height of an hour in pixels.
         *
         * @attribute hourHeight
         * @default 52
         * @type {Number}
         */
        hourHeight: {
            value: 52,
            validator: isNumber
        },

        /**
         * Determines the name for this day view.
         *
         * @attribute name
         * @default 'day'
         * @type {String}
         */
        name: {
            value: 'day'
        },

        /**
         * Contains the function that formats the navigation date.
         *
         * @attribute navigationDateFormatter
         * @type {Function}
         */
        navigationDateFormatter: {
            value: function(date) {
                var instance = this;
                var scheduler = instance.get('scheduler');

                return A.DataType.Date.format(
                    date, {
                        format: '%A, %B %d, %Y',
                        locale: scheduler.get('locale')
                    }
                );
            },
            validator: isFunction
        },

        /**
         * Contains the collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type {Object}
         */
        strings: {
            value: {
                allDay: 'All day'
            }
        },

        /**
         * Contains the function that returns the `headerTable` node.
         *
         * @attribute headerTableNode
         * return {Node}
         */
        headerTableNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_VIEW_DAY_HEADER_TABLE);
            }
        },

        /**
         * Contains the function that returns the `headerViewLabel` node.
         *
         * @attribute headerViewLabelNode
         * return {Node}
         */
        headerViewLabelNode: {
            valueFn: function() {
                var instance = this;

                var strings = instance.get('strings');

                return A.Node.create(
                    Lang.sub(TPL_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL, {
                        label: strings.allDay
                    })
                );
            }
        },

        /**
         * Contains the function that returns the `resizer` node.
         *
         * @attribute resizerNode
         * return {Node}
         */
        resizerNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_VIEW_DAY_RESIZER);
            }
        },

        /**
         * Contains the function that returns the `table` node.
         *
         * @attribute tableNode
         * return {Node}
         */
        tableNode: {
            valueFn: function() {
                return A.Node.create(TPL_SCHEDULER_VIEW_DAY_TABLE);
            }
        },

        /**
         * Contains the function that returns the `colDays` node.
         *
         * @attribute colDaysNode
         * return {Node}
         */
        colDaysNode: {
            valueFn: '_valueColDaysNode'
        },

        /**
         * Contains the function that returns the `colHeaderDays` node.
         *
         * @attribute colHeaderDaysNode
         * return {Node}
         */
        colHeaderDaysNode: {
            valueFn: '_valueColHeaderDaysNode'
        },

        /**
         * Contains the function that returns the `markercells` node.
         *
         * @attribute markercellsNode
         * return {Node}
         */
        markercellsNode: {
            valueFn: '_valueMarkercellsNode'
        },

        /**
         * Contains the function that returns the `times` node.
         *
         * @attribute timesNode
         * return {Node}
         */
        timesNode: {
            valueFn: '_valueTimesNode'
        }
    },

    /**
     * Contains an object hash, defining how attribute values are to be parsed
     * from markup contained in the widget's bounding box.
     *
     * @property HTML_PARSER
     * @default defaultName
     * @type {Object}
     * @static
     */
    HTML_PARSER: {
        colDaysNode: getNodeListHTMLParser('.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY, 1),
        colHeaderDaysNode: getNodeListHTMLParser('.' + CSS_SCHEDULER_VIEW_DAY_HEADER_DAY, 2),
        currentTimeNode: '.' + CSS_SCHEDULER_VIEW_DAY_CURRENT_TIME,
        headerTableNode: '.' + CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE,
        headerViewLabelNode: '.' + CSS_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL,
        markercellsNode: getNodeListHTMLParser('.' + CSS_SCHEDULER_VIEW_DAY_MARKERCELL, 24),
        resizerNode: '.' + CSS_SCHEDULER_VIEW_DAY_RESIZER,
        tableNode: '.' + CSS_SCHEDULER_VIEW_DAY_TABLE,
        timesNode: getNodeListHTMLParser('.' + CSS_SCHEDULER_VIEW_DAY_TABLE_TIME, 24)
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type {Object}
     * @static
     */
    EXTENDS: A.SchedulerView,

    prototype: {

        /**
         * Construction logic executed during `SchedulerDayView` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.colDaysNode = instance.get('colDaysNode');
            instance.colHeaderDaysNode = instance.get('colHeaderDaysNode');
            instance.currentTimeNode = instance.get('currentTimeNode');
            instance.headerTableNode = instance.get('headerTableNode');
            instance.markercellsNode = instance.get('markercellsNode');
            instance.resizerNode = instance.get('resizerNode');
            instance.tableNode = instance.get('tableNode');
            instance.timesNode = instance.get('timesNode');

            instance.activeColumn = null;
            instance.columnData = instance.tableNode.one('.' + CSS_SCHEDULER_VIEW_DAY_COLDATA);
            instance.columnDayHeader = instance.headerTableNode.one('.' + CSS_SCHEDULER_VIEW_DAY_HEADER_COL);
            instance.columnShims = instance.colDaysNode.all('.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM);
            instance.columnTime = instance.tableNode.one('.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME);
            instance.gridContainer = instance.tableNode.one('.' + CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER);
            instance.markersNode = instance.tableNode.one('.' + CSS_SCHEDULER_VIEW_DAY_MARKERS);

            if (instance.get('headerView')) {
                instance.headerView = new A.SchedulerTableView(
                    instance.get('headerViewConfig')
                );
            }
        },

        /**
         * Destructor implementation. Lifecycle.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            if (this._eventHandles) {
                (new A.EventHandle(this._eventHandles)).detach();
            }

            clearInterval(this._currentTimeInterval);
        },

        /**
         * Renders the `SchedulerDayView` component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance.columnTime.setContent(instance.timesNode);
            instance.markersNode.setContent(instance.markercellsNode);
            instance.colDaysNode.appendTo(instance.columnData);
            instance.colHeaderDaysNode.appendTo(instance.columnDayHeader);

            if (instance.headerView) {
                instance.headerView.set('scheduler', instance.get('scheduler'));

                instance.headerView.render();
            }
        },

        /**
         * Binds the events on the `SchedulerDayView` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance.headerTableNode.delegate(
                'click', A.bind(instance._onClickDaysHeader, instance), '.' + CSS_SCHEDULER_VIEW_DAY_HEADER_DAY);

            this._bindMouseEvents();

            this._bindCurrentTimeInterval();

            instance.on('drag:end', instance._onEventDragEnd);
            instance.on('drag:start', instance._onEventDragStart);
            instance.on('drag:tickAlignY', instance._dragTickAlignY);
            instance.on('schedulerChange', instance._onSchedulerChange);
            instance.after('drag:align', instance._afterDragAlign);
        },

        /**
         * Syncs the `SchedulerDayView` UI. Lifecycle.
         *
         * @method syncUI
         * @protected
         */
        syncUI: function() {
            var instance = this;

            SchedulerDayView.superclass.syncUI.apply(this, arguments);

            instance.gridContainer.attr('colspan', instance.get('days'));

            instance.syncCurrentTimeUI();

            instance._setupDragDrop();
        },

        /**
         * Sync SchedulerView StdContent.
         *
         * @method syncStdContent
         */
        syncStdContent: function() {
            var instance = this;

            instance.setStdModContent(
                WidgetStdMod.BODY, instance.tableNode.getDOM());

            var headerNodes = A.NodeList.create(instance.headerTableNode);

            if (instance.headerView) {
                headerNodes.push(instance.headerView.get('boundingBox'));
                headerNodes.push(instance.get('headerViewLabelNode'));
            }

            instance.setStdModContent(WidgetStdMod.HEADER, headerNodes);
        },

        /**
         * Calculates and returns the height of an event based on a given
         * `duration`.
         *
         * @method calculateEventHeight
         * @param {Number} duration The duration of an event.
         * @return {Number} The height of an event.
         */
        calculateEventHeight: function(duration) {
            var instance = this;
            var hourHeight = instance.get('hourHeight');

            return Math.max(duration * (hourHeight / 60), hourHeight / 2);
        },

        /**
         * Calculates and returns the value needed to get the `top` property
         * give a `date`.
         *
         * @method calculateTop
         * @param {Date} date
         * @return {Number} The value needed to get the `top` property give a
         *     `date`.
         */
        calculateTop: function(date) {
            var instance = this;

            return ((date.getHours() * 60) + date.getMinutes() +
                (date.getSeconds() / 60)) * (instance.get('hourHeight') / 60);
        },

        /**
         * Returns the value of the date that follows the day view's current
         * date.
         *
         * @method getNextDate
         * @return {Date}
         */
        getNextDate: function() {
            var instance = this;
            var viewDate = instance.get('scheduler').get('viewDate');

            return DateMath.toLastHour(DateMath.add(viewDate, DateMath.DAY, 1));
        },

        /**
         * Returns the value of the date that preceeds the day view's current
         * date.
         *
         * @method getPrevDate
         * @return {Date}
         */
        getPrevDate: function() {
            var instance = this;
            var viewDate = instance.get('scheduler').get('viewDate');

            return DateMath.toMidnight(DateMath.subtract(viewDate, DateMath.DAY, 1));
        },

        /**
         * Returns the column `Node` determined by a given `Date`.
         *
         * @method getColumnByDate
         * @param {Date} date
         * @return {Number} The column `Node` determined by a given `Date`.
         */
        getColumnByDate: function(date) {
            var instance = this;

            return instance.colDaysNode.item(instance.getDateDaysOffset(date));
        },

        /**
         * Returns the column shim `Node` determined by a given `Date`.
         *
         * @method getColumnShimByDate
         * @param {Date} date
         * @return {Number} The column shim `Node` determined by a given `Date`.
         */
        getColumnShimByDate: function(date) {
            var instance = this;

            return instance.columnShims.item(instance.getDateDaysOffset(date));
        },

        /**
         * Returns the `Date` determined by a given column `Node`.
         *
         * @method getDateByColumn
         * @param colNumber
         * @return The `Date` determined by a given column `Node`.
         */
        getDateByColumn: function(colNumber) {
            var instance = this;
            var viewDate = DateMath.safeClearTime(
                instance.get('scheduler').get('viewDate'));

            return DateMath.add(viewDate, DateMath.DAY, colNumber);
        },

        /**
         * Returns the number of offset days.
         *
         * @method getDateDaysOffset
         * @param {Date} date
         * @return {Number} The number of offset days.
         */
        getDateDaysOffset: function(date) {
            var instance = this;

            var viewDate = DateMath.safeClearTime(
                instance.get('scheduler').get('viewDate'));

            return DateMath.countDays(
                DateMath.safeClearTime(date), viewDate);
        },

        /**
         * Returns the time at the Y coordinate from a given top position.
         *
         * @method getYCoordTime
         * @param {Number} top
         * @return {Array}
         */
        getYCoordTime: function(top) {
            var instance = this;
            var hourHeight = instance.get('hourHeight');
            var prop = toNumber((top / hourHeight).toFixed(2));

            // Isolate the decimals and convert to minutes: (prop*100)%100*0.6.
            var minutes = Math.floor((prop * 100) % 100 * 0.6);
            var hours = Math.floor(prop);

            return [hours, minutes, 0];
        },

        /**
         * Plots a given event for the day view.
         *
         * @method plotEvent
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         */
        plotEvent: function(evt) {
            var instance = this;

            var nodeList = evt.get('node');

            if (nodeList.size() < 2) {
                evt.addPaddingNode();
            }

            var node = evt.get('node').item(0);
            var paddingNode = evt.get('node').item(1);
            var endShim = instance.getColumnShimByDate(evt.get('endDate'));
            var startShim = instance.getColumnShimByDate(evt.get('startDate'));

            if (startShim) {
                startShim.append(node);

                if (evt.get('visible')) {
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

                    if (evt.get('visible')) {
                        paddingNode.show();
                    }
                }
            }
            else {
                paddingNode.hide();
            }

            evt.syncUI();

            instance.syncEventTopUI(evt);
            instance.syncEventHeightUI(evt);
        },

        /**
         * Plots all events in the current view.
         *
         * @method plotEvents
         */
        plotEvents: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var filterFn = instance.get('filterFn');

            instance.get('scheduler').flushEvents();

            instance.columnShims.each(function(colShimNode, i) {
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

            instance.syncHeaderViewUI();
            instance.syncCurrentTimeUI();
        },

        /**
         * Scrolls to given date.
         *
         * @method scrollToDate
         * @param {Date} date The date to scroll to
         */
        scrollToDate: function(date) {
            var scrollNode = this.get('boundingBox').one('.' + CSS_SCHEDULER_VIEW_SCROLLABLE);

            if (this.get('scrollable') && scrollNode) {
                scrollNode.set('scrollTop', this.calculateTop(date));
            }
        },

        /**
         * Syncs the `SchedulerView` `columns` instance. Lifecycle.
         *
         * @method syncColumnsUI
         */
        syncColumnsUI: function() {
            var instance = this;
            var todayDate = instance.get('scheduler').get('todayDate');

            instance.colDaysNode.each(function(columnNode, i) {
                var columnDate = instance.getDateByColumn(i);

                columnNode.toggleClass(
                    CSS_SCHEDULER_TODAY, !DateMath.isDayOverlap(columnDate, todayDate));
            });

            this.syncCurrentTimeUI();
        },

        /**
         * Syncs the `SchedulerView` current time marker. Lifecycle.
         *
         * @method syncCurrentTimeUI
         */
        syncCurrentTimeUI: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var currentTime = scheduler.get('currentTimeFn');

            currentTime(A.bind(instance._moveCurrentTimeNode, instance));
        },

        /**
         * Syncs the `SchedulerView` `daysHeader` instance. Lifecycle.
         *
         * @method syncDaysHeaderUI
         */
        syncDaysHeaderUI: function() {
            var instance = this;
            var viewDate = instance.get('scheduler').get('viewDate');
            var formatter = instance.get('headerDateFormatter');
            var todayDate = instance.get('scheduler').get('todayDate');

            instance.colHeaderDaysNode.all('a').each(
                function(columnNode, i) {
                    var columnDate = DateMath.add(viewDate, DateMath.DAY, i);

                    columnNode.toggleClass(
                        CSS_SCHEDULER_TODAY_HD, !DateMath.isDayOverlap(columnDate, todayDate));

                    columnNode.html(formatter.call(instance, columnDate));
                }
            );
        },

        /**
         * Syncs the `SchedulerView` `eventsIntersection` instance. Lifecycle.
         *
         * @method syncEventsIntersectionUI
         * @param {Array} columnEvents
         */
        syncEventsIntersectionUI: function(columnEvents) {
            var instance = this;
            var insertedNodes = [];
            var eventWidth = instance.get('eventWidth');

            A.Array.each(columnEvents, function(colEvt) {
                var intercessors = instance.findEventIntersections(
                    colEvt, columnEvents);

                var i = 0;
                var total = intercessors.length;
                var distributionRate = (eventWidth / total);

                A.Array.each(intercessors, function(evt) {
                    var clientId = evt.get('clientId');
                    var nodeIndex = A.Array.indexOf(insertedNodes, clientId);

                    if (nodeIndex === -1) {
                        nodeIndex = 0;

                        if (evt._filtered) {
                            nodeIndex = 1;
                        }

                        var evtNode = evt.get('node').item(nodeIndex);
                        var left = distributionRate * i;
                        var width = distributionRate * 1.7;

                        if (i === (total - 1)) {
                            width = eventWidth - left;
                        }

                        evtNode.setStyle('width', width + '%');
                        evtNode.setStyle('left', left + '%');

                        if (total > 1) {
                            evtNode.addClass(CSS_SCHEDULER_EVENT_INTERSECTING);
                        }
                        else {
                            evtNode.removeClass(CSS_SCHEDULER_EVENT_INTERSECTING);
                        }

                        var evtParentNode = evtNode.get('parentNode');

                        if (evtParentNode) {
                            evtParentNode.insert(evtNode, i);
                        }

                        evt._filtered = true;

                        insertedNodes.push(clientId);

                        i = i + 1;
                    }
                });
            });
        },

        /**
         * Syncs the `SchedulerView` `eventHeight` instance. Lifecycle.
         *
         * @method syncEventHeightUI
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         */
        syncEventHeightUI: function(evt) {
            var instance = this;
            var endDate = evt.get('endDate');
            var startDate = evt.get('startDate');

            var maxVisibleDate = DateMath.clone(startDate);
            maxVisibleDate.setHours(24, 0, 0);

            var minutesOffset = DateMath.getMinutesOffset(
                instance.limitDate(endDate, maxVisibleDate), startDate);

            evt.get('node').item(0).set('offsetHeight', instance.calculateEventHeight(minutesOffset));

            var paddingNode = evt.get('node').item(1);

            if (paddingNode.inDoc()) {
                var paddingMinutesOffset = DateMath.getMinutesOffset(
                    endDate, DateMath.toMidnight(evt.getClearEndDate()));

                paddingNode.set('offsetHeight', instance.calculateEventHeight(paddingMinutesOffset));
            }
        },

        /**
         * Syncs the `SchedulerView` `eventTop` instance. Lifecycle.
         *
         * @method syncEventTopUI
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         */
        syncEventTopUI: function(evt) {
            var instance = this;

            evt.get('node').item(0).setStyle(
                'top', instance.calculateTop(evt.get('startDate')) + 'px');

            evt.get('node').item(1).setStyle('top', 0);
        },

        /**
         * Syncs the `SchedulerView` `headerView` instance. Lifecycle.
         *
         * @method syncHeaderViewUI
         */
        syncHeaderViewUI: function() {
            var instance = this;

            if (instance.get('headerView')) {
                var headerView = instance.headerView;

                headerView.plotEvents();

                instance.headerNode.setStyle('paddingRight', getScrollbarWidth());

                var headerViewBB = headerView.get('boundingBox');

                var headerViewData = headerViewBB.one('.' + CSS_SVT_TABLE_DATA);
                var height = Math.max(headerViewData.get('offsetHeight'), 40);

                headerView.set('height', height);

                instance._fillHeight();
            }
        },

        /**
         * Calculates the Y delta between two XY coordinates.
         *
         * @method calculateYDelta
         * @param {Array} startXY The starting XY coords
         * @param {Array} xy The XY coords to compare to the starting XY coords
         */
        calculateYDelta: function(startXY, xy) {
            var instance = this;

            return (xy[1] - startXY[1]) / (instance.get('hourHeight') / 2) * 30;
        },

        /**
         * Returns a collection of `SchedulerEvents` as the parameter `events`
         * that intersect with `evt`.
         *
         * @method findEventIntersections
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @param {Array} Array of intersecting `SchedulerEvent`s.
         * @return {Array}
         */
        findEventIntersections: function(evt, events) {
            var group = [];

            A.Array.each(events, function(evtCmp) {
                if (evtCmp.get('visible') && evt.intersects(evtCmp)) {
                    group.push(evtCmp);
                }
            });

            return group;
        },

        /**
         * Calculates the XY delta between the `event.currentTarget` XY
         * coordinates as well as the XY coordinates from the event page.
         *
         * @method getXYDelta
         * @param {EventFacade} event
         */
        getXYDelta: function(event) {
            var xy = event.currentTarget.getXY(),
                pageXY = [event.pageX, event.pageY];

            return A.Array.map(xy, function(val, i) {
                return (pageXY[i] - val);
            });
        },

        /**
         * Returns the nearest multiple of 10 to half the height of this
         * `SchedulerView`.
         *
         * @method getTickY
         * @return {Number} The nearest multiple of 10 to half the height of
         * this `SchedulerView`.
         */
        getTickY: function() {
            var instance = this;

            return roundToNearestMultiple(
                Math.ceil(instance.get('hourHeight') / 2), 10);
        },

        /**
         * Rounds a given `Date` to a given hour represented as time.
         *
         * @method roundToNearestHour
         * @param {Date} date
         * @param {Array} time Time value used to compute value
         */
        roundToNearestHour: function(date, time) {
            var instance = this;

            date.setHours(
                time[0],
                roundToNearestMultiple(time[1], instance.getTickY()),
                time[2]);
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
            var dd = event.target;

            if (!instance.startXY) {
                instance.startXY = dd.actXY;
            }

            dd.actXY[0] = null;
        },

        /**
         * Binds the events related to the mouse.
         *
         * @method _bindMouseEvents
         * @protected
         */
        _bindMouseEvents: function() {
            this.columnData.delegate(
                'gesturemovestart', A.bind(this._onGestureMoveStartTableCol, this), '.' +
                CSS_SCHEDULER_VIEW_DAY_TABLE_COL);

            this.columnData.delegate(
                'mouseenter', A.bind(this._onMouseEnterEvent, this), '.' + CSS_SCHEDULER_EVENT);

            this.columnData.delegate(
                'mouseleave', A.bind(this._onMouseLeaveEvent, this), '.' + CSS_SCHEDULER_EVENT);

            this.columnData.delegate(
                'gesturemove',
                A.bind(this._onGestureMoveTableCol, this),
                '.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY,
                {standAlone: true}
            );

            this.columnData.delegate(
                'gesturemoveend', A.bind(this._onGestureMoveEndTableCol, this), '.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COL);
        },

        /**
         * Fired after the `visible` attribute changes.
         *
         * @method _afterVisibleChange
         * @protected
         */
        _afterVisibleChange: function() {
            clearInterval(this._currentTimeInterval);

            if (this.get('visible')) {
                this._bindCurrentTimeInterval();
            }
        },

        /**
         * Binds the listener that updates the current time marker every minute.
         *
         * @method _bindCurrentTimeInterval
         * @protected
         */
        _bindCurrentTimeInterval: function() {
            this._currentTimeInterval = setInterval(A.bind(this.syncCurrentTimeUI, this), 60000);
        },

        /**
         * Aligns the dragging `SchedulerEvent` to the X axis while bound to the
         * Y axis on the `activeColumn`.
         *
         * @method _dragTickAlignX
         * @param {Node} activeColumn
         * @protected
         */
        _dragTickAlignX: function(activeColumn) {
            var instance = this;
            var draggingEvent = instance.draggingEvent;

            if (draggingEvent && !instance.resizing) {
                var placeholder = instance.eventPlaceholder;
                var delta = toNumber(activeColumn.attr('data-colnumber')) - instance.startColNumber;

                instance.draggingEventStartDate = DateMath.add(draggingEvent.get('startDate'), DateMath.DAY, delta);

                var startDate = DateMath.clone(instance.draggingEventStartDate);

                DateMath.copyHours(startDate, placeholder.get('startDate'));

                placeholder.move(startDate, {
                    silent: true
                });

                instance.plotEvent(placeholder);
            }
        },

        /**
         * Aligns the dragging `SchedulerEvent` to the Y axis by either setting
         * the end date if the event is a `resize`, or moves the event
         * otherwise.
         *
         * @method _dragTickAlignY
         * @param {EventFacade} event
         * @protected
         */
        _dragTickAlignY: function(event) {
            var instance = this;

            var draggingEvent = instance.draggingEvent;

            if (draggingEvent) {
                var dd = event.target.get('host');
                var placeholder = instance.eventPlaceholder;
                var delta = instance.calculateYDelta(instance.startXY, dd.actXY);

                if (instance.resizing) {
                    var endDate = DateMath.add(instance.draggingEventEndDate, DateMath.MINUTES, delta);

                    if (DateMath.getMinutesOffset(endDate, instance.draggingEventStartDate) < 30) {
                        return;
                    }

                    placeholder.set('endDate', endDate, {
                        silent: true
                    });
                }
                else {
                    placeholder.move(DateMath.add(instance.draggingEventStartDate, DateMath.MINUTES, delta), {
                        silent: true
                    });
                }

                instance.plotEvent(placeholder);
            }
        },

        /**
         * Finds and returns the column related to the given event.
         *
         * @method _findActiveColumn
         * @param {EventFacade} event
         * @protected
         */
        _findActiveColumn: function(event) {
            return event.currentTarget;
        },

        /**
         * Move the red line representing the current time to a specific point,
         * determined by the given {Date} object.
         *
         * @method _moveCurrentTimeNode
         * @param {Date} time
         * @protected
         */
        _moveCurrentTimeNode: function(time) {
            var instance = this;

            var currentTimeNode = instance.get('currentTimeNode');
            var todayColumn = instance.colDaysNode.get('parentNode').one('.' + CSS_SCHEDULER_TODAY);

            if (todayColumn) {
                todayColumn.one('.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM).append(currentTimeNode);

                currentTimeNode.setStyle('top', instance.calculateTop(time) + 'px');
            }
            else {
                currentTimeNode.remove();
            }
        },

        /**
         * Configures a `DD.Delegate` that handles `DD` events for this
         * `SchedulerDayView`.
         *
         * @method _setupDragDrop
         * @protected
         */
        _setupDragDrop: function() {
            var instance = this,
                placeholder = instance.eventPlaceholder;

            if (!placeholder) {
                var scheduler = instance.get('scheduler');

                placeholder = new scheduler.eventModel({
                    scheduler: scheduler
                });

                placeholder.removeTarget(scheduler);
                placeholder.get('node').addClass(CSS_SCHEDULER_EVENT_PROXY);
                placeholder.set('visible', false, {
                    silent: true
                });
                instance.eventPlaceholder = placeholder;
            }

            if (!instance.delegate) {
                instance.delegate = new A.DD.Delegate(
                    instance.get('delegateConfig'));
            }

            var dd = instance.delegate.dd;

            dd.unplug(A.Plugin.DDConstrained);
            dd.unplug(A.Plugin.DDNodeScroll);

            var region = instance.bodyNode.get('region');

            region.bottom = Infinity;
            region.top = -Infinity;

            dd.plug(A.Plugin.DDConstrained, {
                bubbleTargets: instance,
                constrain: region,
                stickY: true,
                tickY: instance.get('hourHeight') / 2
            });

            dd.plug(A.Plugin.DDNodeScroll, {
                node: instance.bodyNode,
                scrollDelay: 150
            });
        },

        /**
         * Sets `date` on the UI.
         *
         * @method _uiSetDate
         * @protected
         */
        _uiSetDate: function() {
            var instance = this;

            instance.syncColumnsUI();
            instance.syncDaysHeaderUI();
        },

        /**
         * Handles `clickDays` events.
         *
         * @method _onClickDaysHeader
         * @param {EventFacade} event
         * @protected
         */
        _onClickDaysHeader: function(event) {
            var instance = this;
            var scheduler = instance.get('scheduler');

            if (event.target.test('a, a span')) {
                var dayView = scheduler.getViewByName('day');

                if (dayView) {
                    var colNumber = toNumber(event.currentTarget.attr('data-colnumber'));

                    scheduler.set('date', instance.getDateByColumn(colNumber));
                    scheduler.set('activeView', dayView);
                }
            }

            event.preventDefault();
        },

        /**
         * Handles `eventDrag` events.
         *
         * @method _onEventDragEnd
         * @param {EventFacade} event
         * @protected
         */
        _onEventDragEnd: function() {
            var instance = this;
            var draggingEvent = instance.draggingEvent;

            if (draggingEvent) {
                var placeholder = instance.eventPlaceholder;

                placeholder.set('visible', false, {
                    silent: true
                });
                draggingEvent.set('visible', true, {
                    silent: true
                });
                draggingEvent.copyDates(placeholder);

                instance.get('scheduler').syncEventsUI();
            }

            instance.startXY = null;
            instance.draggingEvent = null;
        },

        /**
         * Handles `eventDrag` events.
         *
         * @method _onEventDragStart
         * @param {EventFacade} event
         * @protected
         */
        _onEventDragStart: function() {
            var instance = this;
            var draggingEvent = instance.draggingEvent =
                instance.delegate.dd.get('node').getData('scheduler-event');

            if (draggingEvent) {
                var placeholder = instance.eventPlaceholder;

                placeholder.copyPropagateAttrValues(draggingEvent, null, {
                    silent: true
                });

                instance.plotEvent(placeholder);

                draggingEvent.set('visible', false, {
                    silent: true
                });

                instance.draggingEventStartDate = DateMath.clone(draggingEvent.get('startDate'));
                instance.draggingEventEndDate = DateMath.clone(draggingEvent.get('endDate'));

                var startColumn = instance.getColumnByDate(draggingEvent.get('startDate'));

                instance.startColNumber = startColumn ? toNumber(startColumn.attr('data-colnumber')) : 0;
            }
        },

        /**
         * Handles `gesturemoveend` events.
         *
         * @method _onGestureMoveEndTableCol
         * @protected
         */
        _onGestureMoveEndTableCol: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var recorder = scheduler.get('eventRecorder');

            if (recorder && !scheduler.get('disabled')) {
                if (!instance.recorderPlotted) {
                    var startDate = recorder.get('startDate');
                    var duration = recorder.get('duration');
                    var endDate = DateMath.add(startDate, DateMath.MINUTES, duration);

                    recorder.set('endDate', endDate, {
                        silent: true
                    });
                }

                if (instance.creationStartDate) {
                    instance.plotEvent(recorder);

                    recorder.showPopover();
                }
            }

            instance.creationStartDate = null;
            instance.recorderPlotted = false;
            instance.resizing = false;
            instance.startXY = null;

            instance._removeResizer();
            instance.get('boundingBox').selectable();
        },

        /**
         * Handles `gestureMoveStart` events.
         *
         * @method _onGestureMoveStartTableCol
         * @param {EventFacade} event
         * @protected
         */
        _onGestureMoveStartTableCol: function(event) {
            var instance = this;
            var target = event.target;
            var scheduler = instance.get('scheduler');
            var recorder = scheduler.get('eventRecorder');

            if (recorder && !scheduler.get('disabled')) {
                recorder.hidePopover();

                if (target.test('.' + CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM)) {
                    this._prepareEventCreation(event, 30);
                }
                else if (target.test(
                            ['.' + CSS_SCHEDULER_VIEW_DAY_RESIZER,
                             '.' + CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON].join(','))) {

                    instance.resizing = true;
                }
            }

            instance.get('boundingBox').unselectable();
        },

        /**
         * Handles `gesturemove` events.
         *
         * @method _onGestureMoveTableCol
         * @param {EventFacade} event
         * @protected
         */
        _onGestureMoveTableCol: function(event) {
            var instance = this;
            var activeColumn = this._findActiveColumn(event);
            var recorder = instance.get('scheduler').get('eventRecorder');

            if (instance.activeColumn !== activeColumn) {
                instance.activeColumn = activeColumn;
                instance._dragTickAlignX(instance.activeColumn);
            }

            var creationStartDate = instance.creationStartDate;

            if (creationStartDate) {
                var delta = roundToNearestMultiple(
                    instance.calculateYDelta(instance.startXY, [event.pageX, event.pageY]),
                    instance.getTickY()
                );

                var down = (delta >= instance._delta);

                if (instance._delta !== delta) {
                    if (delta > 0) {
                        var newDelta = down ? Math.max(delta, recorder.get('duration')) : delta;

                        recorder.set('endDate', DateMath.add(creationStartDate, DateMath.MINUTES, newDelta), {
                            silent: true
                        });
                    }
                    else {
                        recorder.set('startDate', DateMath.add(creationStartDate, DateMath.MINUTES, delta), {
                            silent: true
                        });
                    }

                    instance.plotEvent(recorder);

                    instance.recorderPlotted = true;
                    instance._delta = delta;
                }
            }
        },

        /**
         * Handles `mouseEnter` events.
         *
         * @method _onMouseEnterEvent
         * @param {EventFacade} event
         * @protected
         */
        _onMouseEnterEvent: function(event) {
            var instance = this;
            var target = event.currentTarget;
            var evt = target.getData('scheduler-event');

            if (evt && !evt.get('disabled')) {
                instance.resizerNode.appendTo(target);
            }
        },

        /**
         * Handles `mouseLeave` events.
         *
         * @method _onMouseLeaveEvent
         * @param {EventFacade} event
         * @protected
         */
        _onMouseLeaveEvent: function() {
            var instance = this;

            if (!instance.resizing) {
                instance._removeResizer();
            }
        },

        /**
         * Handles `scheduler` value change.
         *
         * @method _onSchedulerChange
         * @param {EventFacade} event
         * @protected
         */
        _onSchedulerChange: function(event) {
            var instance = this;

            if (instance.headerView) {
                instance.headerView.set('scheduler', event.newVal);
            }
        },

        /**
         * Prepares for the creation of a new scheduler event.
         *
         * @method _prepareEventCreation
         * @protected
         */
        _prepareEventCreation: function(event, duration) {
            var clickLeftTop = this.getXYDelta(event),
                colNumber = toNumber(event.currentTarget.attr('data-colnumber')),
                endDate,
                startDate = this.getDateByColumn(colNumber),
                recorder = this.get('scheduler').get('eventRecorder');

            this.startXY = [event.pageX, event.pageY];

            this.roundToNearestHour(startDate, this.getYCoordTime(clickLeftTop[1]));

            if (!duration) {
                duration = recorder.get('duration');
            }
            endDate = DateMath.add(startDate, DateMath.MINUTES, duration);

            recorder.move(startDate, {
                silent: true
            });

            recorder.setAttrs({
                allDay: false,
                endDate: endDate
            }, {
                silent: true
            });

            this.creationStartDate = startDate;

            event.halt();
        },

        /**
         * Removes the `SchedulerView`'s resizer `Node` from the DOM.
         *
         * @method _removeResizer
         * @protected
         */
        _removeResizer: function() {
            var instance = this;

            instance.resizerNode.remove();
        },

        /**
         * Returns the value of `colDaysNode`.
         *
         * @method _valueColDaysNode
         * @protected
         * @return {Node} The value of `colDaysNode`.
         */
        _valueColDaysNode: function() {
            var instance = this;
            var days = instance.get('days');
            var buffer = [],
                colNumber = 0;

            while (days--) {
                buffer.push(
                    A.Lang.sub(TPL_SCHEDULER_VIEW_DAY_TABLE_COLDAY, {
                        colNumber: colNumber++
                    })
                );
            }

            return A.NodeList.create(buffer.join(''));
        },

        /**
         * Returns the `colHeaderDaysNode` value.
         *
         * @method _valueColHeaderDaysNode
         * @protected
         * @return {Node} The `colHeaderDaysNode` value.
         */
        _valueColHeaderDaysNode: function() {
            var instance = this;
            var days = instance.get('days');
            var buffer = [],
                colNumber = 0;

            buffer.push(TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST);

            while (days--) {
                buffer.push(
                    A.Lang.sub(TPL_SCHEDULER_VIEW_DAY_HEADER_DAY, {
                        colNumber: colNumber++
                    })
                );
            }

            return A.NodeList.create(buffer.join(''));
        },

        /**
         * Returns the `markercellsNode` value.
         *
         * @method _valueMarkercellsNode
         * @protected
         * @return {Node} The `markercellsNode` value.
         */
        _valueMarkercellsNode: function() {
            var buffer = [],
                i;

            for (i = 0; i <= 23; i++) {
                buffer.push(TPL_SCHEDULER_VIEW_DAY_MARKERCELL);
            }

            return A.NodeList.create(buffer.join(''));
        },

        /**
         * Returns the `timesNode` value.
         *
         * @method _valueTimesNode
         * @protected
         * @return {Node} The `timesNode` value.
         */
        _valueTimesNode: function() {
            var instance = this;
            var isoTime = instance.get('isoTime');
            var buffer = [],
                hour;

            for (hour = 0; hour <= 23; hour++) {
                buffer.push(
                    Lang.sub(
                        TPL_SCHEDULER_VIEW_DAY_TABLE_TIME, {
                            hour: isoTime ? DateMath.toIsoTimeString(hour) : DateMath.toUsTimeString(hour, false,
                                true)
                        }
                    )
                );
            }

            return A.NodeList.create(buffer.join(''));
        }
    }
});

A.SchedulerDayView = SchedulerDayView;
