/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-view-table
 */

var Lang = A.Lang,
    isFunction = Lang.isFunction,

    DateMath = A.DataType.DateMath,
    WidgetStdMod = A.WidgetStdMod,

    WEEK_LENGTH = DateMath.WEEK_LENGTH,

    getNodeListHTMLParser = function(selector, sizeCondition) {
        return function(srcNode) {
            var nodes = srcNode.all(selector);
            return (nodes.size() >= sizeCondition) ? nodes : null;
        };
    },

    getCN = A.getClassName,

    CSS_ICON = getCN('icon'),
    CSS_ICON_ARROWSTOP_LEFT = getCN('icon', 'arrowstop-1-l'),
    CSS_ICON_ARROWSTOP_RIGHT = getCN('icon', 'arrowstop-1-r'),
    CSS_SVT_COLGRID = getCN('scheduler-view', 'table', 'colgrid'),
    CSS_SVT_COLGRID_FIRST = getCN('scheduler-view', 'table', 'colgrid', 'first'),
    CSS_SVT_COLGRID_TODAY = getCN('scheduler-view', 'table', 'colgrid', 'today'),
    CSS_SVT_CONTAINER = getCN('scheduler-view', 'table', 'container'),
    CSS_SVT_EVENTS_OVERLAY_NODE = getCN('scheduler-view', 'table', 'events', 'overlay', 'node'),
    CSS_SVT_EVENTS_OVERLAY_NODE_BODY = getCN('scheduler-view', 'table', 'events', 'overlay', 'node', 'body'),
    CSS_SVT_EVENTS_OVERLAY_NODE_CLOSE = getCN('scheduler-view', 'table', 'events', 'overlay', 'node', 'close'),
    CSS_SVT_HEADER_COL = getCN('scheduler-view', 'table', 'header', 'col'),
    CSS_SVT_HEADER_DAY = getCN('scheduler-view', 'table', 'header', 'day'),
    CSS_SVT_HEADER_TABLE = getCN('scheduler-view', 'table', 'header', 'table'),
    CSS_SVT_MORE = getCN('scheduler-view', 'table', 'more'),
    CSS_SVT_ROW = getCN('scheduler-view', 'table', 'row'),
    CSS_SVT_ROW_CONTAINER = getCN('scheduler-view', 'table', 'row', 'container'),
    CSS_SVT_TABLE_DATA = getCN('scheduler-view', 'table', 'data'),
    CSS_SVT_TABLE_DATA_COL = getCN('scheduler-view', 'table', 'data', 'col'),
    CSS_SVT_TABLE_DATA_COL_TITLE = getCN('scheduler-view', 'table', 'data', 'col', 'title'),
    CSS_SVT_TABLE_DATA_COL_TITLE_DOWN = getCN('scheduler-view', 'table', 'data', 'col', 'title', 'down'),
    CSS_SVT_TABLE_DATA_COL_TITLE_FIRST = getCN('scheduler-view', 'table', 'data', 'col', 'title', 'first'),
    CSS_SVT_TABLE_DATA_COL_TITLE_NEXT = getCN('scheduler-view', 'table', 'data', 'col', 'title', 'next'),
    CSS_SVT_TABLE_DATA_COL_TITLE_TODAY = getCN('scheduler-view', 'table', 'data', 'col', 'title', 'today'),
    CSS_SVT_TABLE_DATA_EVENT = getCN('scheduler-view', 'table', 'data', 'event'),
    CSS_SVT_TABLE_DATA_EVENT_LEFT = getCN('scheduler-view', 'table', 'data', 'event', 'left'),
    CSS_SVT_TABLE_DATA_EVENT_RIGHT = getCN('scheduler-view', 'table', 'data', 'event', 'right'),
    CSS_SVT_TABLE_DATA_FIRST = getCN('scheduler-view', 'table', 'data', 'first'),
    CSS_SVT_TABLE_GRID = getCN('scheduler-view', 'table', 'grid'),
    CSS_SVT_TABLE_GRID_CONTAINER = getCN('scheduler-view', 'table', 'grid', 'container'),
    CSS_SVT_TABLE_GRID_FIRST = getCN('scheduler-view', 'table', 'grid', 'first'),

    TPL_SVT_CONTAINER = '<div class="' + CSS_SVT_CONTAINER + '">' +
        '<div class="' + CSS_SVT_ROW_CONTAINER + '"></div>' +
        '</div>',

    TPL_SVT_EVENTS_OVERLAY_NODE = '<div class="' + CSS_SVT_EVENTS_OVERLAY_NODE + '">' +
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

    TPL_SVT_MORE = '<a href="javascript:;" class="' + CSS_SVT_MORE + '">{labelPrefix} {count} {labelSuffix}</a>',

    TPL_SVT_ROW = '<div class="' + CSS_SVT_ROW + '"></div>',

    TPL_SVT_TABLE_DATA = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVT_TABLE_DATA + '">' +
        '<tbody></tbody>' +
        '</table>',

    TPL_SVT_TABLE_GRID = '<div class="' + CSS_SVT_TABLE_GRID_CONTAINER + '">' +
        '<table cellspacing="0" cellpadding="0" class="' + CSS_SVT_TABLE_GRID + '">' +
        '<tbody>' +
        '<tr></tr>' +
        '</tbody>' +
        '</table></div>',

    TPL_SVT_EV_ICON_LEFT = '<span class="' + [CSS_ICON, CSS_ICON_ARROWSTOP_LEFT].join(' ') + '"></span>',
    TPL_SVT_EV_ICON_RIGHT = '<span class="' + [CSS_ICON, CSS_ICON_ARROWSTOP_RIGHT].join(' ') + '"></span>',

    TPL_SVT_TABLE_DATA_COL = '<td class="' + CSS_SVT_TABLE_DATA_COL + '"><div></div></td>',
    TPL_SVT_TABLE_DATA_ROW = '<tr></tr>';

/**
 * A base class for `SchedulerTableView`.
 *
 * @class A.SchedulerTableView
 * @extends A.SchedulerView
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var SchedulerTableView = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type {String}
     * @static
     */
    NAME: 'scheduler-view-table',

    /**
     * Static property used to define the default attribute
     * configuration for the `SchedulerTableView`.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {

        /**
         * Determines the content of Scheduler table view's body section.
         *
         * @attribute bodyContent
         * @default ''
         * @type {String}
         */
        bodyContent: {
            value: ''
        },

        /**
         * Contains the number of days to display per interval in the
         * `SchedulerTableView`.
         *
         * @attribute displayDaysInterval
         * @default 42
         * @type {Number}
         */
        displayDaysInterval: {
            value: 42
        },

        /**
         * Contains the number of rows to display in the `SchedulerTableView`.
         *
         * @attribute displayRows
         * @default 3
         * @type {Number}
         */
        displayRows: {
            value: 3
        },

        /**
         * Indicates whether the height of the `SchedulerTableView` is fixed.
         *
         * @attribute fixedHeight
         * @default true
         * @type {Boolean}
         */
        fixedHeight: {
            value: true
        },

        /**
         * Determines the name for this `SchedulerTableView`.
         *
         * @attribute name
         * @default 'table'
         * @type {String}
         */
        name: {
            value: 'table'
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
                        format: '%a',
                        locale: scheduler.get('locale')
                    }
                );
            },
            validator: isFunction
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
                        format: '%b %Y',
                        locale: scheduler.get('locale')
                    }
                );
            },
            validator: isFunction
        },

        /**
         * Indicates whether the `SchedulerTableView` is scrollable.
         *
         * @attribute scrollable
         * @default false
         * @type {Boolean}
         */
        scrollable: {
            value: false
        },

        /**
         * Contains the collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type {Object}
         */
        strings: {
            value: {
                close: 'Close',
                show: 'Show',
                more: 'more'
            }
        },

        /**
         * Contains the function that returns the `headerTable` node.
         *
         * @attribute headerTableNode
         * @type {Node}
         */
        headerTableNode: {
            valueFn: function() {
                return A.Node.create(TPL_SVT_HEADER_TABLE);
            }
        },

        /**
         * Contains the function that returns the `colHeaderDays` node.
         *
         * @attribute colHeaderDaysNode
         * @type {Node}
         */
        colHeaderDaysNode: {
            valueFn: '_valueColHeaderDaysNode'
        },

        /**
         * Contains the function that returns the `rowsContainer` node.
         *
         * @attribute rowsContainerNode
         * @type {Node}
         */
        rowsContainerNode: {
            valueFn: function() {
                return A.Node.create(TPL_SVT_CONTAINER);
            }
        },

        /**
         * Contains the function that returns the `tableGrid` node.
         *
         * @attribute tableGridNode
         * @type {Node}
         */
        tableGridNode: {
            valueFn: '_valueTableGridNode'
        }
    },

    /**
     * Contains an object hash, defining how attribute values are to be parsed
     * from markup contained in the widget's bounding box.
     *
     * @property HTML_PARSER
     * @type {Object}
     * @static
     */
    HTML_PARSER: {
        colHeaderDaysNode: getNodeListHTMLParser('.' + CSS_SVT_HEADER_DAY, 7),
        headerTableNode: '.' + CSS_SVT_HEADER_TABLE,
        rowsContainerNode: '.' + CSS_SVT_CONTAINER,
        tableGridNode: getNodeListHTMLParser('.' + CSS_SVT_TABLE_GRID, 7)
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
        evtDateStack: null,
        evtRenderedStack: null,
        rowDataTableStack: null,

        /**
         * Construction logic executed during `SchedulerTableView` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.evtDateStack = {};
            instance.evtRenderedStack = {};
            instance.rowDataTableStack = {};

            instance.colHeaderDaysNode = instance.get('colHeaderDaysNode');
            instance.headerTableNode = instance.get('headerTableNode');
            instance.rowsContainerNode = instance.get('rowsContainerNode');
            instance.tableGridNode = instance.get('tableGridNode');
            instance.columnDayHeader = instance.headerTableNode.one('.' + CSS_SVT_HEADER_COL);
            instance.columnTableGrid = A.NodeList.create();
            instance.tableRowContainer = instance.rowsContainerNode.one('.' + CSS_SVT_ROW_CONTAINER);
            instance.tableRows = A.NodeList.create();
        },

        /**
         * Binds the events on the `SchedulerTableView` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance.rowsContainerNode.delegate('click', A.bind(instance._onClickMore, instance), '.' +
                CSS_SVT_MORE);
        },

        /**
         * Renders the `SchedulerTableView` component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this,
                displayRowsCount = instance._getDisplayRowsCount(),
                rowIndex;

            for (rowIndex = 0; rowIndex < displayRowsCount; rowIndex++) {
                instance.tableRows.push(
                    instance.buildGridRowNode(rowIndex)
                );
            }

            instance._renderEventsOverlay();

            instance.colHeaderDaysNode.appendTo(instance.columnDayHeader);
            instance.tableRows.appendTo(instance.tableRowContainer);
        },

        /**
         * Builds a row of events.
         *
         * @method buildEventsRow
         * @param {Date} rowStartDate
         * @param {Date} rowEndDate
         * @param {Number} rowDisplayIndex
         * @return {Node}
         */
        buildEventsRow: function(rowStartDate, rowEndDate, rowDisplayIndex) {
            var instance = this;
            var displayRows = instance.get('displayRows');

            var rowRenderedColumns = 0;
            var rowNode = A.Node.create(TPL_SVT_TABLE_DATA_ROW);

            var renderedEvents = false;

            instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
                var key = String(celDate.getTime());

                var evtRenderedStack = instance.evtRenderedStack[key];

                if (!evtRenderedStack) {
                    instance.evtRenderedStack[key] = [];

                    evtRenderedStack = instance.evtRenderedStack[key];
                }

                if (rowRenderedColumns > index) {
                    evtRenderedStack.push(null);

                    return;
                }

                var events = instance.evtDateStack[key];
                if (!events) {
                    events = [];
                }

                events = events.filter(function(currEvent) {
                    return currEvent.get('visible');
                });

                var evt = instance._getRenderableEvent(events, rowStartDate, rowEndDate, celDate);

                var evtColNode = A.Node.create(TPL_SVT_TABLE_DATA_COL);
                var evtNodeContainer = evtColNode.one('div');

                if ((evtRenderedStack.length < events.length) && displayRows && (rowDisplayIndex === (displayRows - 1))) {
                    var strings = instance.get('strings');

                    var showMoreEventsLink = A.Node.create(
                        Lang.sub(
                            TPL_SVT_MORE, {
                                count: (events.length - evtRenderedStack.length),
                                labelPrefix: strings.show,
                                labelSuffix: strings.more
                            }
                        )
                    );

                    showMoreEventsLink.setData('events', events);

                    evtNodeContainer.append(showMoreEventsLink);
                    renderedEvents = true;
                }
                else if (evt) {
                    var evtSplitInfo = instance._getEvtSplitInfo(evt, celDate, rowStartDate, rowEndDate);

                    evtColNode.attr('colspan', evtSplitInfo.colspan);

                    rowRenderedColumns += (evtSplitInfo.colspan - 1);

                    instance._syncEventNodeContainerUI(evt, evtNodeContainer, evtSplitInfo);
                    instance._syncEventNodeUI(evt, evtNodeContainer, celDate);

                    evtRenderedStack.push(evt);
                    renderedEvents = true;
                }

                rowRenderedColumns++;

                rowNode.append(evtColNode);
            });

            return renderedEvents ? rowNode : null;
        },

        /**
         * Builds a table of events.
         *
         * @method buildEventsTable
         * @param {Date} rowStartDate
         * @param {Date} rowEndDate
         * @return {Node}
         */
        buildEventsTable: function(rowStartDate, rowEndDate) {
            var instance = this,
                displayRows = instance.get('displayRows'),
                end = false,
                intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart()),
                cacheKey = String(intervalStartDate.getTime()).concat(rowStartDate.getTime()).concat(rowEndDate.getTime()),
                rowDataTableNode = instance.rowDataTableStack[cacheKey],
                rowDisplayIndex = 0;

            if (!rowDataTableNode) {
                rowDataTableNode = A.Node.create(TPL_SVT_TABLE_DATA);

                var tableBody = rowDataTableNode.one('tbody');
                var titleRowNode = instance.buildEventsTitleRow(rowDataTableNode, rowStartDate, rowEndDate);

                tableBody.append(titleRowNode);

                while (!end) {
                    var rowNode = instance.buildEventsRow(rowStartDate, rowEndDate, rowDisplayIndex);

                    if (rowNode) {
                        tableBody.append(rowNode);

                        rowDisplayIndex++;
                        if (displayRows && rowDisplayIndex >= displayRows) {
                            end = true;
                        }
                    }
                    else {
                        end = true;
                    }
                }

                instance.rowDataTableStack[cacheKey] = rowDataTableNode;
            }

            return rowDataTableNode;
        },

        /**
         * Builds a row with the title and today's date.
         *
         * @method buildEventsTitleRow
         * @param {Node} tableNode
         * @param {Date} rowStartDate
         * @param {Date} rowEndDate
         * @return {Node} titleRowNode The title row `Node`.
         */
        buildEventsTitleRow: function(tableNode, rowStartDate, rowEndDate) {
            var instance = this;

            var todayDate = instance.get('scheduler').get('todayDate');

            var titleRowNode = A.Node.create(TPL_SVT_TABLE_DATA_ROW);

            instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
                var colTitleNode = A.Node.create(TPL_SVT_TABLE_DATA_COL);

                colTitleNode
                    .addClass(CSS_SVT_TABLE_DATA_COL_TITLE)
                    .toggleClass(
                        CSS_SVT_TABLE_DATA_COL_TITLE_FIRST, (index === 0))
                    .toggleClass(
                        CSS_SVT_TABLE_DATA_COL_TITLE_TODAY, !DateMath.isDayOverlap(celDate, todayDate))
                    .toggleClass(
                        CSS_SVT_TABLE_DATA_COL_TITLE_NEXT, !DateMath.isDayOverlap(
                            DateMath.subtract(celDate, DateMath.DAY, 1), todayDate))
                    .toggleClass(
                        CSS_SVT_TABLE_DATA_COL_TITLE_DOWN, !DateMath.isDayOverlap(
                            DateMath.subtract(celDate, DateMath.WEEK, 1), todayDate));

                titleRowNode.append(
                    colTitleNode.setContent(celDate.getDate())
                );
            });

            return titleRowNode;
        },

        /**
         * Builds a new row `Node` and appends a table grid `Node`. Returns the
         * row `Node`.
         *
         * @method buildGridRowNode
         * @param {Number} rowIndex
         * @return {Node} A row `Node`.
         */
        buildGridRowNode: function(rowIndex) {
            var instance = this;

            var tableGridNode = instance._getTableGridNode(rowIndex);

            var rowNode = A.Node.create(TPL_SVT_ROW);

            rowNode.append(
                tableGridNode.toggleClass(CSS_SVT_TABLE_GRID_FIRST, (rowIndex === 0))
            );

            return rowNode;
        },

        /**
         * Removes all data from `evtDateStack`, `evtRenderedStack` and
         * `rowDateTableStack`.
         *
         * @method flushViewCache
         */
        flushViewCache: function() {
            var instance = this;

            instance.evtDateStack = {};
            instance.evtRenderedStack = {};
            instance.rowDataTableStack = {};
        },

        /**
         * Returns the date interval in which this view shows events for.
         *
         * @method getDateInterval
         * @return {Object} Object with 2 keys: startDate and endDate. Undefined
         *   keys are interpreted as unlimited sides of the interval.
         */
        getDateInterval: function() {
            var daysAmount = this.getWeekDaysCount() * this._getDisplayRowsCount() - 1,
                startDate = this._findCurrentIntervalStart();

            return {
                endDate: DateMath.toLastHour(DateMath.add(startDate, DateMath.DAY, daysAmount)),
                startDate: DateMath.toMidnight(startDate)
            };
        },

        /**
         * Returns the list of all events that intersect with a given date.
         *
         * @method getIntersectEvents
         * @param {Date} date
         * @return {Array} The list of all events that intersect with a given
         * date.
         */
        getIntersectEvents: function(date) {
            var instance = this;
            var scheduler = instance.get('scheduler');

            var key = String(date.getTime());

            if (!instance.evtDateStack[key]) {
                var events = scheduler.getIntersectEvents(date);

                instance.evtDateStack[key] = A.Array.filter(
                    events, instance.get('filterFn')
                );
            }

            return instance.evtDateStack[key];
        },

        /**
         * Returns the value of the date that follows the `SchedulerTableView`'s
         current date.
         *
         * @method getNextDate
         * @return {Date} The value of the date that follows the
         * `SchedulerTableView`'scurrent date.
         */
        getNextDate: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var viewDate = scheduler.get('viewDate');
            var displayDaysInterval = instance.get('displayDaysInterval');

            return DateMath.toLastHour(DateMath.add(viewDate, DateMath.DAY, displayDaysInterval));
        },

        /**
         * Returns the value of the date that preceeds the
         * `SchedulerTableView`'s current date.
         *
         * @method getPrevDate
         * @return {Date} The value of the date that preceeds the
         * `SchedulerTableView`'s current date.
         */
        getPrevDate: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var viewDate = scheduler.get('viewDate');
            var displayDaysInterval = instance.get('displayDaysInterval');

            return DateMath.toMidnight(DateMath.subtract(viewDate, DateMath.DAY, displayDaysInterval));
        },

        /**
         * Get the number of days that should be shown in the week.
         *
         * @method getWeekDaysCount
         * @return {Number}
         */
        getWeekDaysCount: function() {
            var displayDaysInterval = this.get('displayDaysInterval');

            return Math.min(displayDaysInterval, WEEK_LENGTH);
        },

        /**
         * Hides this `SchedulerViewTable` event's `overlay` component.
         *
         * @method hideEventsOverlay
         */
        hideEventsOverlay: function() {
            var instance = this;

            instance.eventsOverlay.set('visible', false);
        },

        /**
         * Applies a given function to each date between `startDate` and
         * `endDate`.
         *
         * @method loopDates
         * @param {Date} startDate
         * @param {Date} endDate
         * @param {Function} fn
         * @param {String} incrementBy  The field constant to be used for
         * performing addition.
         * @param {Number} factor   The ratio used to calculate the number of
         * units (measured in the field constant) to add to the date.
         */
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

        /**
         * Plots all events in the current view.
         *
         * @method plotEvents
         */
        plotEvents: function() {
            var instance = this;
            var intervalStartDate = instance._findCurrentIntervalStart();
            var startDateRef = DateMath.safeClearTime(intervalStartDate);

            instance.flushViewCache();

            instance.hideEventsOverlay();

            instance.bodyNode.all('.' + CSS_SVT_TABLE_DATA).remove();

            var weekDaysCount = this.getWeekDaysCount();

            var finalDate = DateMath.add(startDateRef, DateMath.DAY, (weekDaysCount * this.tableRows.size()) - 1);
            instance._findIntersections(startDateRef, finalDate);

            instance.tableRows.each(function(rowNode, index) {
                var rowStartDate = DateMath.add(startDateRef, DateMath.DAY, weekDaysCount * index);
                var rowEndDate = DateMath.add(rowStartDate, DateMath.DAY, weekDaysCount - 1);

                var tableNode = instance.buildEventsTable(rowStartDate, rowEndDate);

                if (index === 0) {
                    tableNode.addClass(CSS_SVT_TABLE_DATA_FIRST);
                }

                rowNode.append(tableNode);
            });
        },

        /**
         * Updates the `SchedulerTableView`'s `colHeaderDaysNode` to reflect
         * any changes made to the instance attributes.
         *
         * @method syncDaysHeaderUI
         */
        syncDaysHeaderUI: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var viewDate = scheduler.get('viewDate');
            var formatter = instance.get('headerDateFormatter');
            var firstDayOfWeekDt = instance._findFirstDayOfWeek(viewDate);

            instance.colHeaderDaysNode.all('div').each(
                function(columnNode, i) {
                    var columnDate = DateMath.add(firstDayOfWeekDt, DateMath.DAY, i);

                    columnNode.html(formatter.call(instance, columnDate));
                }
            );
        },

        /**
         * Updates the `SchedulerTableView`'s column grid by moving styling to
         * the current day cell `Node`.
         *
         * @method syncGridUI
         */
        syncGridUI: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var todayDate = scheduler.get('todayDate');

            instance.columnTableGrid.removeClass(CSS_SVT_COLGRID_TODAY);

            var intervalStartDate = instance._findCurrentIntervalStart();
            var intervalEndDate = instance._findCurrentIntervalEnd();

            if (DateMath.between(todayDate, intervalStartDate, intervalEndDate)) {
                var firstDayOfWeek = scheduler.get('firstDayOfWeek');
                var firstWeekDay = instance._findFirstDayOfWeek(todayDate);

                var rowIndex = DateMath.getWeekNumber(todayDate, firstDayOfWeek) - DateMath.getWeekNumber(
                    intervalStartDate, firstDayOfWeek);
                var colIndex = (todayDate.getDate() - firstWeekDay.getDate());
                var celIndex = instance._getCellIndex([colIndex, rowIndex]);

                var todayCel = instance.columnTableGrid.item(celIndex);

                if (todayCel) {
                    todayCel.addClass(CSS_SVT_COLGRID_TODAY);
                }
            }
        },

        /**
         * Sync SchedulerView content.
         *
         * @method syncStdContent
         */
        syncStdContent: function() {
            var instance = this;

            instance.setStdModContent(
                WidgetStdMod.BODY, instance.rowsContainerNode.getDOM());

            instance.setStdModContent(
                WidgetStdMod.HEADER, instance.headerTableNode.getDOM());
        },

        /**
         * Adds the given event to the stack for all dates between the given
         * range.
         *
         * @method _addEventToAllDates
         * @param {A.SchedulerEvent} event
         * @param {Date} firstDate
         * @param {Date} lastDate
         * @protected
         */
        _addEventToAllDates: function(event, firstDate, lastDate) {
            var currentDate = firstDate,
                eventEndDate = event.getClearEndDate();

            if (DateMath.after(lastDate, eventEndDate)) {
                lastDate = eventEndDate;
            }

            while (!DateMath.after(currentDate, lastDate)) {
                this._addToEvtDateStack(
                    String(currentDate.getTime()),
                    event
                );

                currentDate = DateMath.add(currentDate, DateMath.DAY, 1);
            }
        },

        /**
         * Adds the given event to the stack for the given date key.
         *
         * @method _addToEvtDateStack
         * @param {String} key String representation of a date
         * @param {A.SchedulerEvent} event
         * @protected
         */
        _addToEvtDateStack: function(key, event) {
            if (!this.evtDateStack[key]) {
                this.evtDateStack[key] = [];
            }
            this.evtDateStack[key].push(event);
        },

        /**
         * Returns this `SchedulerTableView`'s date ending interval.
         *
         * @method _findCurrentIntervalEnd
         * @protected
         * @return {Date} This `SchedulerTableView`'s date ending interval.
         */
        _findCurrentIntervalEnd: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var viewDate = scheduler.get('viewDate');
            var displayDaysInterval = instance.get('displayDaysInterval');

            return DateMath.add(viewDate, DateMath.DAY, displayDaysInterval);
        },

        /**
         * Returns this `SchedulerTableView`'s date starting interval.
         *
         * @method _findCurrentIntervalStart
         * @protected
         * @return {Date} This `SchedulerTableView`'s date starting interval.
         */
        _findCurrentIntervalStart: function() {
            var instance = this;
            var scheduler = instance.get('scheduler');

            return scheduler.get('viewDate');
        },

        /**
         * Returns the first day of the week.
         *
         * @method _findFirstDayOfWeek
         * @param {Date} date
         * @protected
         * @return {Date} The first day of the week.
         */
        _findFirstDayOfWeek: function(date) {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var firstDayOfWeek = scheduler.get('firstDayOfWeek');

            return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
        },

        /**
         * Finds the events that intersect each of the given dates, but without
         * duplicating the event on different days. Events will show up on the
         * day that first intersected with it.
         *
         * @method _findIntersections
         * @param {Date} startDate
         * @param {Date} endDate
         * @protected
         */
        _findIntersections: function(startDate, endDate) {
            var currentDate = startDate,
                eventEndDate,
                events = this.get('scheduler').getEvents(null, true),
                eventStartDate,
                filterFn = this.get('filterFn'),
                i = 0;

            // Sort events by start date (they are sorted in a different way
            // by default).
            events.sort(function(evt1, evt2) {
                return evt1.getClearStartDate() - evt2.getClearStartDate();
            });

            while (i < events.length) {
                eventStartDate = events[i].getClearStartDate();
                eventEndDate = events[i].getClearEndDate();

                if (DateMath.after(currentDate, eventEndDate)) {
                    // Ignore events that end before the current date.
                    i++;
                }
                else if (DateMath.before(currentDate, eventStartDate)) {
                    // This is the first event that starts after the current date.
                    // Let's jump to the next date then.
                    currentDate = DateMath.add(currentDate, DateMath.DAY, 1);
                    if (DateMath.after(currentDate, endDate)) {
                        // The current date is past the last date we want to find
                        // intersections for. Exit the loop.
                        break;
                    }
                }
                else {
                    if (!filterFn || filterFn(events[i])) {
                        this._addEventToAllDates(events[i], currentDate, endDate);
                    }

                    i++;
                }
            }
        },

        /**
         * Returns the cell index at a given `position`.
         *
         * @method _getCellIndex
         * @param {Array} position
         * @protected
         * @return {Number} The cell index at a given `position`.
         */
        _getCellIndex: function(position) {
            return position[1] * WEEK_LENGTH + position[0];
        },

        /**
         * Returns the display rows count.
         *
         * @method _getDisplayRowsCount
         * @protected
         * @return {Number} The display rows count.
         */
        _getDisplayRowsCount: function() {
            var instance = this;
            var displayDaysInterval = instance.get('displayDaysInterval');

            return Math.ceil(displayDaysInterval / WEEK_LENGTH);
        },

        /**
         * Returns the display row days count.
         *
         * @method _getDisplayRowDaysCount
         * @protected
         * @return {Number} The display row days count.
         */
        _getDisplayRowDaysCount: function() {
            var instance = this;
            var displayDaysInterval = instance.get('displayDaysInterval');

            return Math.min(displayDaysInterval, WEEK_LENGTH);
        },

        /**
         * Returns the label that belongs to a given `A.SchedulerEvent`.
         *
         * @method _getEvtLabel
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @protected
         * @return {String} The label that belongs to a given `A.SchedulerEvent`.
         */
        _getEvtLabel: function(evt) {
            var endDate = evt.get('endDate');
            var startDate = evt.get('startDate');

            return [startDate.getHours(), '-', endDate.getHours(), ' ', evt.get('content')].join('');
        },

        /**
         * Returns nn object containing the `colspan`, `left` and
         * `right` values that determine a `SchedulerEvent`'s split information.
         *
         * @method _getEvtSplitInfo
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @param celDate
         * @param {Date} rowStartDate
         * @param {Date} rowEndDate
         * @return {Object} info An object containing the `colspan`, `left` and
         * `right` values that determine a `SchedulerEvent`'s split information.
         * @protected
         */
        _getEvtSplitInfo: function(evt, celDate, rowStartDate, rowEndDate) {
            var startDate = evt.getClearStartDate();
            var endDate = evt.getClearEndDate();

            var maxColspan = DateMath.countDays(rowEndDate, celDate);

            var info = {
                colspan: Math.min(DateMath.countDays(endDate, celDate), maxColspan) + 1,
                left: DateMath.before(startDate, rowStartDate),
                right: DateMath.after(endDate, rowEndDate)
            };

            return info;
        },

        /**
         * Returns either a `SchedulerEvent` that is not yet rendered and has a
         * `startDate` that does not overlap with with a given `celDate` or is
         * a continuation of an existing event.
         *
         * @method _getRenderableEvent
         * @param {EventFacade} event
         * @param {Date} rowStartDate
         * @param {Date} rowEndDate
         * @param {Date} celDate
         * @return {A.SchedulerEvent|null} Either a `SchedulerEvent` that is not
         *     yet rendered and has a`startDate` that does not overlap with with
         *     a given `celDate` or is a continuation of an existing event.
         * @protected
         */
        _getRenderableEvent: function(events, rowStartDate, rowEndDate, celDate) {
            var instance = this,
                key = String(celDate.getTime()),
                i;

            if (!instance.evtRenderedStack[key]) {
                instance.evtRenderedStack[key] = [];
            }

            for (i = 0; i < events.length; i++) {
                var evt = events[i];

                var startDate = evt.get('startDate');

                var isEventDateContinuation = DateMath.after(celDate, startDate) && !DateMath.isDayOverlap(celDate,
                    rowStartDate);
                var isEventStartDateDay = !DateMath.isDayOverlap(startDate, celDate);

                var isRendered = A.Array.indexOf(instance.evtRenderedStack[key], evt) > -1;

                if (!isRendered && (isEventStartDateDay || isEventDateContinuation)) {
                    return evt;
                }
            }

            return null;
        },

        /**
         * Returns the table grid `Node` for a given `rowIndex`.
         *
         * @method _getTableGridNode
         * @param {Number} rowIndex
         * @return {Node} tableGridNode The table grid `Node` from a given
         *     `rowIndex`.
         * @protected
         */
        _getTableGridNode: function(rowIndex) {
            var instance = this,
                displayDaysInterval = instance.get('displayDaysInterval'),
                tableGridNode = instance.tableGridNode.item(rowIndex),
                firstRowNode = tableGridNode.one('tr'),
                i;

            for (i = 0; i < Math.min(displayDaysInterval, WEEK_LENGTH); i++) {
                var columnNode = A.Node.create(TPL_SVT_GRID_COLUMN);

                firstRowNode.append(columnNode);

                if (i === 0) {
                    columnNode.addClass(CSS_SVT_COLGRID_FIRST);
                }

                instance.columnTableGrid.push(columnNode);
            }

            return tableGridNode;
        },

        /**
         * Handles `SchedulerEvent` `click` events for the `SchedulerViewTable`.
         *
         * @method _onClickMore
         * @param {EventFacade} event
         * @protected
         */
        _onClickMore: function(event) {
            var instance = this;

            var target = event.target;
            var events = target.getData('events');
            var eventsNodeList = A.NodeList.create();

            A.Array.each(events, function(evt) {
                evt.syncNodeTitleUI();

                var evtNode = evt.get('node').item(0).clone();

                evtNode.setData('scheduler-event', evt);

                evtNode.setStyles({
                    height: 'auto',
                    left: 0,
                    position: 'relative',
                    top: 0,
                    width: 'auto'
                });

                eventsNodeList.push(evtNode);
            });

            instance.eventsOverlay.bodyNode.one('.' + CSS_SVT_EVENTS_OVERLAY_NODE_BODY).setContent(
                eventsNodeList);

            instance.eventsOverlay.setAttrs({
                visible: true,
                xy: target.getXY()
            });
        },

        /**
         * Renders this `SchedulerViewTable` event's `overlay` component.
         *
         * @method _renderEventsOverlay
         * @protected
         */
        _renderEventsOverlay: function() {
            var instance = this;
            var strings = instance.get('strings');

            instance.eventsOverlay = new A.Overlay({
                align: {
                    points: ['tl', 'tl']
                },
                bodyContent: Lang.sub(
                    TPL_SVT_EVENTS_OVERLAY_NODE, {
                        label: strings.close
                    }
                ),
                render: instance.get('boundingBox'),
                visible: false,
                width: 250,
                zIndex: 450
            });

            instance.eventsOverlay.bodyNode.delegate('click', A.bind(instance.hideEventsOverlay, instance), '.' +
                CSS_SVT_EVENTS_OVERLAY_NODE_CLOSE);
        },

        /**
         * Updates a given `Node`'s UI with a given `evtSplitInfo` value.
         * any changes made to the instance attributes.
         *
         * @method _syncEventNodeContainerUI
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @param node
         * @param {Object} evtSplitInfo An object containing the `colspan`,
         *     `left` and `right` values that determine a `SchedulerEvent`'s
         *     split information.
         * @protected
         */
        _syncEventNodeContainerUI: function(evt, node, evtSplitInfo) {
            node.addClass(CSS_SVT_TABLE_DATA_EVENT);

            if (evtSplitInfo.left) {
                node.addClass(CSS_SVT_TABLE_DATA_EVENT_LEFT).prepend(TPL_SVT_EV_ICON_LEFT);
            }

            if (evtSplitInfo.right) {
                node.addClass(CSS_SVT_TABLE_DATA_EVENT_RIGHT).append(TPL_SVT_EV_ICON_RIGHT);
            }
        },

        /**
         * Updates a given `SchedulerEvent` `Node` with the given `celDate` and
         * appends it to a given `container` `Node`.
         *
         * @method _syncEventNodeUI
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @param container
         * @param celDate
         * @protected
         */
        _syncEventNodeUI: function(evt, container, celDate) {
            var instance = this;
            var scheduler = instance.get('scheduler');
            var firstDayOfWeek = scheduler.get('firstDayOfWeek');

            var evtNodeList = evt.get('node');
            var startDate = evt.get('startDate');

            var intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart());
            var startDateFirstDayOfWeek = DateMath.clearTime(DateMath.getFirstDayOfWeek(
                new Date(Math.max(startDate, intervalStartDate)),
                firstDayOfWeek
            ));
            var paddingNodeIndex = Math.floor(DateMath.countDays(celDate, startDateFirstDayOfWeek) / WEEK_LENGTH);

            if (evtNodeList.size() <= paddingNodeIndex) {
                evt.addPaddingNode();
            }

            if (evtNodeList.size() <= paddingNodeIndex) {
                paddingNodeIndex = evtNodeList.size() - 1;
            }

            var evtNode = evtNodeList.item(paddingNodeIndex);

            evtNode.show();
            evtNode.setStyles({
                height: 'auto',
                left: 0,
                top: 0,
                width: 'auto'
            });

            evtNode.appendTo(container);

            evt.syncUI();
        },

        /**
         * Sets `date` on the UI.
         *
         * @method _uiSetDate
         * @protected
         */
        _uiSetDate: function() {
            var instance = this;

            instance.syncDaysHeaderUI();
            instance.syncGridUI();
        },

        /**
         * Returns the value of `colHeaderDaysNode`.
         *
         * @method _valueColHeaderDaysNode
         * @protected
         */
        _valueColHeaderDaysNode: function() {
            var instance = this;

            var displayDaysInterval = instance.get('displayDaysInterval');
            var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

            return instance._valueNodeList(weekDaysCount, TPL_SVT_HEADER_DAY);
        },

        /**
         * Returns the value of `tableGridNode`.
         *
         * @method _valueTableGridNode
         * @protected
         */
        _valueTableGridNode: function() {
            var instance = this;

            var displayDaysInterval = instance.get('displayDaysInterval');
            var weekDaysCount = Math.min(displayDaysInterval, WEEK_LENGTH);

            return instance._valueNodeList(weekDaysCount, TPL_SVT_TABLE_GRID);
        },

        /**
         * Returns the a new `NodeList` with a given size and template.
         *
         * @method _valueNodeList
         * @param size
         * @param tpl
         * @protected
         */
        _valueNodeList: function(size, tpl) {
            var buffer = [];

            while (size--) {
                buffer.push(tpl);
            }

            return A.NodeList.create(buffer.join(''));
        }
    }
});

A.SchedulerTableView = SchedulerTableView;
