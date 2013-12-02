/**
 * The Scheduler Component
 *
 * @module aui-scheduler
 * @submodule aui-scheduler-view-table
 */

var Lang = A.Lang,
    isFunction = Lang.isFunction,
    isString = Lang.isString,

    DateMath = A.DataType.DateMath,
    WidgetStdMod = A.WidgetStdMod,

    WEEK_LENGTH = DateMath.WEEK_LENGTH,

    _DASH = '-',
    _DOT = '.',
    _EMPTY_STR = '',
    _SPACE = ' ',

    SCHEDULER_VIEW = 'scheduler-view',
    SCHEDULER_VIEW_TABLE = 'scheduler-view-table',

    getNodeListHTMLParser = function(selector, sizeCondition) {
        return function(srcNode) {
            var nodes = srcNode.all(selector);
            return (nodes.size() >= sizeCondition) ? nodes : null;
        };
    },

    BODY = 'body',
    BOUNDING_BOX = 'boundingBox',
    CLOSE = 'close',
    COL = 'col',
    COL_HEADER_DAYS_NODE = 'colHeaderDaysNode',
    COLGRID = 'colgrid',
    COLSPAN = 'colspan',
    COLUMN_DAY_HEADER = 'columnDayHeader',
    COLUMN_TABLE_GRID = 'columnTableGrid',
    CONTAINER = 'container',
    CONTENT = 'content',
    DATA = 'data',
    DAY = 'day',
    DISPLAY_DAYS_INTERVAL = 'displayDaysInterval',
    DISPLAY_ROWS = 'displayRows',
    DIV = 'div',
    DOWN = 'down',
    END_DATE = 'endDate',
    EVENT = 'event',
    EVENTS = 'events',
    EVENTS_OVERLAY = 'eventsOverlay',
    FILTER_FN = 'filterFn',
    FIRST = 'first',
    FIRST_DAY_OF_WEEK = 'firstDayOfWeek',
    GRID = 'grid',
    HEADER = 'header',
    HEADER_DATE_FORMATTER = 'headerDateFormatter',
    HEADER_TABLE_NODE = 'headerTableNode',
    ICON = 'icon',
    LEFT = 'left',
    LOCALE = 'locale',
    MORE = 'more',
    NEXT = 'next',
    NODE = 'node',
    OVERLAY = 'overlay',
    RIGHT = 'right',
    ROW = 'row',
    ROWS_CONTAINER_NODE = 'rowsContainerNode',
    SCHEDULER = 'scheduler',
    SCHEDULER_EVENT = 'scheduler-event',
    SHOW = 'show',
    MORE = 'more',
    START_DATE = 'startDate',
    STRINGS = 'strings',
    TABLE = 'table',
    TABLE_GRID_NODE = 'tableGridNode',
    TABLE_ROW_CONTAINER = 'tableRowContainer',
    TABLE_ROWS = 'tableRows',
    TBODY = 'tbody',
    TITLE = 'title',
    TL = 'tl',
    TODAY = 'today',
    TODAY_DATE = 'todayDate',
    TR = 'tr',
    VIEW_DATE = 'viewDate',
    VISIBLE = 'visible',

    getCN = A.getClassName,

    CSS_ICON = getCN(ICON),
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
    CSS_SVT_TABLE_DATA_EVENT_RIGHT = getCN(SCHEDULER_VIEW, TABLE, DATA, EVENT, RIGHT),
    CSS_SVT_TABLE_DATA_FIRST = getCN(SCHEDULER_VIEW, TABLE, DATA, FIRST),
    CSS_SVT_TABLE_GRID = getCN(SCHEDULER_VIEW, TABLE, GRID),
    CSS_SVT_TABLE_GRID_FIRST = getCN(SCHEDULER_VIEW, TABLE, GRID, FIRST),

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

    TPL_SVT_ROW = '<div class="' + CSS_SVT_ROW + '" style="top: {top}%; height: {height}%;"></div>',

    TPL_SVT_TABLE_DATA = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVT_TABLE_DATA + '">' +
        '<tbody></tbody>' +
        '</table>',

    TPL_SVT_TABLE_GRID = '<table cellspacing="0" cellpadding="0" class="' + CSS_SVT_TABLE_GRID + '">' +
        '<tbody>' +
        '<tr></tr>' +
        '</tbody>' +
        '</table>',

    TPL_SVT_EV_ICON_LEFT = '<span class="' + [CSS_ICON, CSS_ICON_ARROWSTOP_LEFT].join(_SPACE) + '"></span>',
    TPL_SVT_EV_ICON_RIGHT = '<span class="' + [CSS_ICON, CSS_ICON_ARROWSTOP_RIGHT].join(_SPACE) + '"></span>',

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
    NAME: SCHEDULER_VIEW_TABLE,

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
            value: _EMPTY_STR
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
            value: TABLE
        },

        /**
         * Contains the function that formats the header date.
         *
         * @attribute headerDateFormatter
         * @type {String}
         */
        headerDateFormatter: {
            value: function(date) {
                var instance = this;
                var scheduler = instance.get(SCHEDULER);

                return A.DataType.Date.format(
                    date, {
                        format: '%a',
                        locale: scheduler.get(LOCALE)
                    }
                );
            },
            validator: isString
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
                var scheduler = instance.get(SCHEDULER);

                return A.DataType.Date.format(
                    date, {
                        format: '%b %Y',
                        locale: scheduler.get(LOCALE)
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
        colHeaderDaysNode: getNodeListHTMLParser(_DOT + CSS_SVT_HEADER_DAY, 7),
        headerTableNode: _DOT + CSS_SVT_HEADER_TABLE,
        rowsContainerNode: _DOT + CSS_SVT_CONTAINER,
        tableGridNode: getNodeListHTMLParser(_DOT + CSS_SVT_TABLE_GRID, 7)
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

            instance[COL_HEADER_DAYS_NODE] = instance.get(COL_HEADER_DAYS_NODE);
            instance[HEADER_TABLE_NODE] = instance.get(HEADER_TABLE_NODE);
            instance[ROWS_CONTAINER_NODE] = instance.get(ROWS_CONTAINER_NODE);
            instance[TABLE_GRID_NODE] = instance.get(TABLE_GRID_NODE);
            instance[COLUMN_DAY_HEADER] = instance.headerTableNode.one(_DOT + CSS_SVT_HEADER_COL);
            instance[COLUMN_TABLE_GRID] = A.NodeList.create();
            instance[TABLE_ROW_CONTAINER] = instance[ROWS_CONTAINER_NODE].one(_DOT + CSS_SVT_ROW_CONTAINER);
            instance[TABLE_ROWS] = A.NodeList.create();
        },

        /**
         * Binds the events on the `SchedulerTableView` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            instance[ROWS_CONTAINER_NODE].delegate('click', A.bind(instance._onClickMore, instance), _DOT +
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
                instance[TABLE_ROWS].push(
                    instance.buildGridRowNode(rowIndex)
                );
            }

            instance._renderEventsOverlay();

            instance[COL_HEADER_DAYS_NODE].appendTo(instance[COLUMN_DAY_HEADER]);
            instance[TABLE_ROWS].appendTo(instance[TABLE_ROW_CONTAINER]);
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
            var displayRows = instance.get(DISPLAY_ROWS);

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
                            TPL_SVT_MORE, {
                                count: (events.length - (displayRows - 1)),
                                labelPrefix: strings[SHOW],
                                labelSuffix: strings[MORE]
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
                displayRows = instance.get(DISPLAY_ROWS),
                intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart()),
                cacheKey = String(intervalStartDate.getTime()).concat(rowStartDate.getTime()).concat(rowEndDate.getTime()),
                rowDataTableNode = instance.rowDataTableStack[cacheKey],
                rowDisplayIndex;

            if (!rowDataTableNode) {
                rowDataTableNode = A.Node.create(TPL_SVT_TABLE_DATA);

                var tableBody = rowDataTableNode.one(TBODY);
                var titleRowNode = instance.buildEventsTitleRow(rowDataTableNode, rowStartDate, rowEndDate);

                tableBody.append(titleRowNode);

                for (rowDisplayIndex = 0; rowDisplayIndex < displayRows; rowDisplayIndex++) {
                    var rowNode = instance.buildEventsRow(rowStartDate, rowEndDate, rowDisplayIndex);

                    tableBody.append(rowNode);
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

            var todayDate = instance.get(SCHEDULER).get(TODAY_DATE);

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

            var displayRowsCount = instance._getDisplayRowsCount();
            var rowRelativeHeight = 100 / displayRowsCount;
            var tableGridNode = instance._getTableGridNode(rowIndex);

            var rowNode = A.Node.create(
                Lang.sub(
                    TPL_SVT_ROW, {
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
         * Returns the list of all events that intersect with a given date.
         *
         * @method getIntersectEvents
         * @param {Date} date
         * @return {Array} The list of all events that intersect with a given
         * date.
         */
        getIntersectEvents: function(date) {
            var instance = this;
            var scheduler = instance.get(SCHEDULER);

            var key = String(date.getTime());

            if (!instance.evtDateStack[key]) {
                var events = scheduler.getIntersectEvents(date);

                instance.evtDateStack[key] = A.Array.filter(
                    events, instance.get(FILTER_FN)
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
            var scheduler = instance.get(SCHEDULER);
            var viewDate = scheduler.get(VIEW_DATE);
            var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

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
            var scheduler = instance.get(SCHEDULER);
            var viewDate = scheduler.get(VIEW_DATE);
            var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

            return DateMath.toMidnight(DateMath.subtract(viewDate, DateMath.DAY, displayDaysInterval));
        },

        /**
         * Hides this `SchedulerViewTable` event's `overlay` component.
         *
         * @method hideEventsOverlay
         */
        hideEventsOverlay: function() {
            var instance = this;

            instance[EVENTS_OVERLAY].set(VISIBLE, false);
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

            instance.bodyNode.all(_DOT + CSS_SVT_TABLE_DATA).remove();

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

        /**
         * Updates the `SchedulerTableView`'s `colHeaderDaysNode` to reflect
         * any changes made to the instance attributes.
         *
         * @method syncDaysHeaderUI
         */
        syncDaysHeaderUI: function() {
            var instance = this;
            var scheduler = instance.get(SCHEDULER);
            var viewDate = scheduler.get(VIEW_DATE);
            var formatter = instance.get(HEADER_DATE_FORMATTER);
            var locale = instance.get(LOCALE);
            var firstDayOfWeekDt = instance._findFirstDayOfWeek(viewDate);

            instance.colHeaderDaysNode.all(DIV).each(
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
            var scheduler = instance.get(SCHEDULER);
            var todayDate = scheduler.get(TODAY_DATE);

            instance[COLUMN_TABLE_GRID].removeClass(CSS_SVT_COLGRID_TODAY);

            var intervalStartDate = instance._findCurrentIntervalStart();
            var intervalEndDate = instance._findCurrentIntervalEnd();

            if (DateMath.between(todayDate, intervalStartDate, intervalEndDate)) {
                var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);
                var firstWeekDay = instance._findFirstDayOfWeek(todayDate);

                var rowIndex = DateMath.getWeekNumber(todayDate, firstDayOfWeek) - DateMath.getWeekNumber(
                    intervalStartDate, firstDayOfWeek);
                var colIndex = (todayDate.getDate() - firstWeekDay.getDate());
                var celIndex = instance._getCellIndex([colIndex, rowIndex]);

                var todayCel = instance[COLUMN_TABLE_GRID].item(celIndex);

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
                WidgetStdMod.BODY, instance[ROWS_CONTAINER_NODE].getDOM());

            instance.setStdModContent(
                WidgetStdMod.HEADER, instance[HEADER_TABLE_NODE].getDOM());
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
            var scheduler = instance.get(SCHEDULER);
            var viewDate = scheduler.get(VIEW_DATE);
            var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

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
            var scheduler = instance.get(SCHEDULER);

            return scheduler.get(VIEW_DATE);
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
            var scheduler = instance.get(SCHEDULER);
            var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

            return DateMath.getFirstDayOfWeek(date, firstDayOfWeek);
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
            var instance = this;

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
            var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

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
            var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

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
            var instance = this;
            var endDate = evt.get(END_DATE);
            var startDate = evt.get(START_DATE);

            return [startDate.getHours(), _DASH, endDate.getHours(), _SPACE, evt.get(CONTENT)].join(_EMPTY_STR);
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

                var startDate = evt.get(START_DATE);

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
                displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL),
                tableGridNode = instance[TABLE_GRID_NODE].item(rowIndex),
                firstRowNode = tableGridNode.one(TR),
                i;

            for (i = 0; i < Math.min(displayDaysInterval, WEEK_LENGTH); i++) {
                var columnNode = A.Node.create(TPL_SVT_GRID_COLUMN);

                firstRowNode.append(columnNode);

                if (i === 0) {
                    columnNode.addClass(CSS_SVT_COLGRID_FIRST);
                }

                instance[COLUMN_TABLE_GRID].push(columnNode);
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

            instance[EVENTS_OVERLAY].bodyNode.one(_DOT + CSS_SVT_EVENTS_OVERLAY_NODE_BODY).setContent(
                eventsNodeList);

            instance[EVENTS_OVERLAY].setAttrs({
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
            var scheduler = instance.get(SCHEDULER);
            var strings = instance.get(STRINGS);

            instance[EVENTS_OVERLAY] = new A.Overlay({
                align: {
                    points: [TL, TL]
                },
                bodyContent: Lang.sub(
                    TPL_SVT_EVENTS_OVERLAY_NODE, {
                        label: strings[CLOSE]
                    }
                ),
                render: instance.get(BOUNDING_BOX),
                visible: false,
                width: 250,
                zIndex: 450
            });

            instance[EVENTS_OVERLAY].bodyNode.delegate('click', A.bind(instance.hideEventsOverlay, instance), _DOT +
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
            var instance = this;

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
            var scheduler = instance.get(SCHEDULER);
            var firstDayOfWeek = scheduler.get(FIRST_DAY_OF_WEEK);

            var evtNodeList = evt.get(NODE);
            var startDate = evt.get(START_DATE);

            var intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart());
            var startDateFirstDayOfWeek = DateMath.getFirstDayOfWeek(new Date(Math.max(startDate, intervalStartDate)),
                firstDayOfWeek);
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

            var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
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

            var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);
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
            var instance = this;
            var buffer = [];

            while (size--) {
                buffer.push(tpl);
            }

            return A.NodeList.create(buffer.join(_EMPTY_STR));
        }
    }
});

A.SchedulerTableView = SchedulerTableView;
