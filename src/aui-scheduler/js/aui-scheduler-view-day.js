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
    isString = Lang.isString,

    DateMath = A.DataType.DateMath,
    WidgetStdMod = A.WidgetStdMod,

    _ANCHOR = 'a',
    _COMMA = ',',
    _DOT = '.',
    _EMPTY_STR = '',
    _PERCENT = '%',
    _SPACE = ' ',

    DATA_COLNUMBER = 'data-colnumber',
    SCHEDULER_VIEW = 'scheduler-view',
    SCHEDULER_VIEW_DAY = 'scheduler-view-day',

    getScrollbarWidth = A.cached(function() {
        var doc = A.config.doc,
            testNode = doc.createElement('div'),
            body = doc.getElementsByTagName('body')[0],
            // 0.1 because cached doesn't support falsy refetch values
            width = 0.1;

        if (body) {
            testNode.style.cssText = "position:absolute;visibility:hidden;overflow:scroll;width:20px;";
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

    ACTIVE_COLUMN = 'activeColumn',
    ACTIVE_VIEW = 'activeView',
    ALL_DAY = 'allDay',
    BOUNDING_BOX = 'boundingBox',
    COL = 'col',
    COL_DAYS_NODE = 'colDaysNode',
    COL_HEADER_DAYS_NODE = 'colHeaderDaysNode',
    COLBLANK = 'colblank',
    COLDATA = 'coldata',
    COLDAY = 'colday',
    COLGRID = 'colgrid',
    COLSPAN = 'colspan',
    COLTIME = 'coltime',
    COLUMN_DATA = 'columnData',
    COLUMN_DAY_HEADER = 'columnDayHeader',
    COLUMN_SHIMS = 'columnShims',
    COLUMN_TIME = 'columnTime',
    CONTAINER = 'container',
    CREATION_START_DATE = 'creationStartDate',
    DATA = 'data',
    DATE = 'date',
    DAY = 'day',
    DAYS = 'days',
    DELEGATE_CONFIG = 'delegateConfig',
    DISABLED = 'disabled',
    DIVISION = 'division',
    DRAGGING_EVENT = 'draggingEvent',
    DURATION = 'duration',
    END_DATE = 'endDate',
    EVENT_PLACEHOLDER = 'eventPlaceholder',
    EVENT_RECORDER = 'eventRecorder',
    EVENT_WIDTH = 'eventWidth',
    FILTER_FN = 'filterFn',
    FIRST = 'first',
    GRID = 'grid',
    GRID_CONTAINER = 'gridContainer',
    GRIP = 'grip',
    HD = 'hd',
    HEADER = 'header',
    HEADER_DATE_FORMATTER = 'headerDateFormatter',
    HEADER_TABLE_NODE = 'headerTableNode',
    HEADER_VIEW = 'headerView',
    HEADER_VIEW_CONFIG = 'headerViewConfig',
    HEADER_VIEW_LABEL_NODE = 'headerViewLabelNode',
    HEIGHT = 'height',
    HORIZONTAL = 'horizontal',
    HOST = 'host',
    HOUR_HEIGHT = 'hourHeight',
    ICON = 'icon',
    ISO_TIME = 'isoTime',
    LABEL = 'label',
    LEFT = 'left',
    LOCALE = 'locale',
    PADDING_RIGHT = 'paddingRight',
    REGION = 'region',
    RESIZER = 'resizer',
    RESIZER_NODE = 'resizerNode',
    RESIZING = 'resizing',
    SCHEDULER = 'scheduler',
    SCHEDULER_EVENT = 'scheduler-event',
    SHIM = 'shim',
    START_DATE = 'startDate',
    START_XY = 'startXY',
    STRINGS = 'strings',
    TABLE = 'table',
    TABLE_NODE = 'tableNode',
    TIME = 'time',
    TIMES_NODE = 'timesNode',
    TODAY = 'today',
    TODAY_DATE = 'todayDate',
    TOP = 'top',
    VIEW = 'view',
    VIEW_DATE = 'viewDate',
    VISIBLE = 'visible',
    WIDTH = 'width',
    MARKER = 'marker',
    MARKERCELL = 'markercell',
    MARKERCELLS_NODE = 'markercellsNode',
    MARKERS = 'markers',
    MARKERS_NODE = 'markersNode',
    NODE = 'node',
    OFFSET_HEIGHT = 'offsetHeight',
    PARENT_NODE = 'parentNode',
    PROXY = 'proxy',
    PX = 'px',

    getCN = A.getClassName,

    CSS_SVT_TABLE_DATA = getCN(SCHEDULER_VIEW, TABLE, DATA),

    CSS_SCHEDULER_EVENT = getCN(SCHEDULER_EVENT),
    CSS_SCHEDULER_EVENT_DISABLED = getCN(SCHEDULER_EVENT, DISABLED),
    CSS_SCHEDULER_EVENT_PROXY = getCN(SCHEDULER_EVENT, PROXY),

    CSS_SCHEDULER_TODAY = getCN(SCHEDULER, TODAY),
    CSS_SCHEDULER_TODAY_HD = getCN(SCHEDULER, TODAY, HD),

    CSS_SCHEDULER_VIEW_DAY_COLDATA = getCN(SCHEDULER_VIEW, COLDATA),
    CSS_SCHEDULER_VIEW_DAY_COLGRID = getCN(SCHEDULER_VIEW, COLGRID),
    CSS_SCHEDULER_VIEW_DAY_GRID = getCN(SCHEDULER_VIEW, GRID),
    CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER = getCN(SCHEDULER_VIEW, GRID, CONTAINER),
    CSS_SCHEDULER_VIEW_DAY_HEADER_COL = getCN(SCHEDULER_VIEW, DAY, HEADER, COL),
    CSS_SCHEDULER_VIEW_DAY_HEADER_DAY = getCN(SCHEDULER_VIEW, DAY, HEADER, DAY),
    CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST = getCN(SCHEDULER_VIEW, DAY, HEADER, DAY, FIRST),
    CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE = getCN(SCHEDULER_VIEW, DAY, HEADER, TABLE),
    CSS_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL = getCN(SCHEDULER_VIEW, DAY, HEADER, VIEW, LABEL),
    CSS_SCHEDULER_VIEW_DAY_ICON_GRIP_HORIZONTAL = getCN(SCHEDULER_VIEW, ICON, GRIP, HORIZONTAL),
    CSS_SCHEDULER_VIEW_DAY_MARKER_DIVISION = getCN(SCHEDULER_VIEW, MARKER, DIVISION),
    CSS_SCHEDULER_VIEW_DAY_MARKERCELL = getCN(SCHEDULER_VIEW, MARKERCELL),
    CSS_SCHEDULER_VIEW_DAY_MARKERS = getCN(SCHEDULER_VIEW, MARKERS),
    CSS_SCHEDULER_VIEW_DAY_RESIZER = getCN(SCHEDULER_VIEW, DAY, RESIZER),
    CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON = getCN(SCHEDULER_VIEW, DAY, RESIZER, ICON),
    CSS_SCHEDULER_VIEW_DAY_TABLE = getCN(SCHEDULER_VIEW, DAY, TABLE),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COL = getCN(SCHEDULER_VIEW, DAY, TABLE, COL),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM = getCN(SCHEDULER_VIEW, DAY, TABLE, COL, SHIM),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COLBLANK = getCN(SCHEDULER_VIEW, DAY, TABLE, COLBLANK),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY = getCN(SCHEDULER_VIEW, DAY, TABLE, COLDAY),
    CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME = getCN(SCHEDULER_VIEW, DAY, TABLE, COLTIME),
    CSS_SCHEDULER_VIEW_DAY_TABLE_TIME = getCN(SCHEDULER_VIEW, DAY, TABLE, TIME),

    TPL_SCHEDULER_VIEW_DAY_RESIZER = '<div class="' + CSS_SCHEDULER_VIEW_DAY_RESIZER + '">' +
        '<div class="' + [CSS_SCHEDULER_VIEW_DAY_ICON_GRIP_HORIZONTAL, CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON].join(_SPACE) +
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
            _SPACE) + '"></td>' +
        '<td class="' + CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER + '" colspan="1">' +
        '<div class="' + CSS_SCHEDULER_VIEW_DAY_GRID + '">' +
        '<div class="' + CSS_SCHEDULER_VIEW_DAY_MARKERS + '"></div>' +
        '</div>' +
        '</td>' +
        '</tr>' +
        '<tr class="' + CSS_SCHEDULER_VIEW_DAY_COLDATA + '">' +
        '<td class="' + [CSS_SCHEDULER_VIEW_DAY_TABLE_COL, CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME].join(_SPACE) +
        '"></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>',

    TPL_SCHEDULER_VIEW_DAY_TABLE_COLDAY = '<td class="' + [CSS_SCHEDULER_VIEW_DAY_TABLE_COL,
        CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY].join(_SPACE) + '" data-colnumber="{colNumber}">' +
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
    TPL_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST = '<td class="' + [CSS_SCHEDULER_VIEW_DAY_HEADER_DAY,
        CSS_SCHEDULER_VIEW_DAY_HEADER_DAY_FIRST].join(_SPACE) + '"></td>';

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
    NAME: SCHEDULER_VIEW_DAY,

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
            value: _EMPTY_STR
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
         * Configures this view's DD Delegate.
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
                        container: instance.get(BOUNDING_BOX),
                        nodes: _DOT + CSS_SCHEDULER_EVENT,
                        invalid: 'input, select, button, a, textarea, ' + _DOT + CSS_SCHEDULER_EVENT_DISABLED
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
                return (evt.getHoursDuration() <= 24 && !evt.get(ALL_DAY));
            }
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
                        format: '<span>%d</span> %a',
                        locale: scheduler.get(LOCALE)
                    }
                );
            },
            validator: isString
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
                var instance = this;

                return A.merge({
                        displayDaysInterval: 1,
                        displayRows: 6,
                        filterFn: function(evt) {
                            return ((evt.getHoursDuration() > 24) || evt.get(ALL_DAY));
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
            value: DAY
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
                        format: '%A, %B %d, %Y',
                        locale: scheduler.get(LOCALE)
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

                var strings = instance.get(STRINGS);

                return A.Node.create(
                    Lang.sub(TPL_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL, {
                        label: strings[ALL_DAY]
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
        colDaysNode: getNodeListHTMLParser(_DOT + CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY, 1),
        colHeaderDaysNode: getNodeListHTMLParser(_DOT + CSS_SCHEDULER_VIEW_DAY_HEADER_DAY, 2),
        headerTableNode: _DOT + CSS_SCHEDULER_VIEW_DAY_HEADER_TABLE,
        headerViewLabelNode: _DOT + CSS_SCHEDULER_VIEW_DAY_HEADER_VIEW_LABEL,
        markercellsNode: getNodeListHTMLParser(_DOT + CSS_SCHEDULER_VIEW_DAY_MARKERCELL, 24),
        resizerNode: _DOT + CSS_SCHEDULER_VIEW_DAY_RESIZER,
        tableNode: _DOT + CSS_SCHEDULER_VIEW_DAY_TABLE,
        timesNode: getNodeListHTMLParser(_DOT + CSS_SCHEDULER_VIEW_DAY_TABLE_TIME, 24)
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

            instance[COL_DAYS_NODE] = instance.get(COL_DAYS_NODE);
            instance[COL_HEADER_DAYS_NODE] = instance.get(COL_HEADER_DAYS_NODE);
            instance[HEADER_TABLE_NODE] = instance.get(HEADER_TABLE_NODE);
            instance[MARKERCELLS_NODE] = instance.get(MARKERCELLS_NODE);
            instance[RESIZER_NODE] = instance.get(RESIZER_NODE);
            instance[TABLE_NODE] = instance.get(TABLE_NODE);
            instance[TIMES_NODE] = instance.get(TIMES_NODE);

            instance[ACTIVE_COLUMN] = null;
            instance[COLUMN_DATA] = instance[TABLE_NODE].one(_DOT + CSS_SCHEDULER_VIEW_DAY_COLDATA);
            instance[COLUMN_DAY_HEADER] = instance.headerTableNode.one(_DOT + CSS_SCHEDULER_VIEW_DAY_HEADER_COL);
            instance[COLUMN_SHIMS] = instance[COL_DAYS_NODE].all(_DOT + CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM);
            instance[COLUMN_TIME] = instance[TABLE_NODE].one(_DOT + CSS_SCHEDULER_VIEW_DAY_TABLE_COLTIME);
            instance[GRID_CONTAINER] = instance[TABLE_NODE].one(_DOT + CSS_SCHEDULER_VIEW_DAY_GRID_CONTAINER);
            instance[MARKERS_NODE] = instance[TABLE_NODE].one(_DOT + CSS_SCHEDULER_VIEW_DAY_MARKERS);

            if (instance.get(HEADER_VIEW)) {
                instance[HEADER_VIEW] = new A.SchedulerTableView(
                    instance.get(HEADER_VIEW_CONFIG)
                );
            }
        },

        /**
         * Renders the `SchedulerDayView` component instance. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance[COLUMN_TIME].setContent(instance[TIMES_NODE]);
            instance[MARKERS_NODE].setContent(instance[MARKERCELLS_NODE]);
            instance[COL_DAYS_NODE].appendTo(instance[COLUMN_DATA]);
            instance[COL_HEADER_DAYS_NODE].appendTo(instance[COLUMN_DAY_HEADER]);

            if (instance[HEADER_VIEW]) {
                instance[HEADER_VIEW].set(SCHEDULER, instance.get(SCHEDULER));

                instance[HEADER_VIEW].render();
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

            instance[HEADER_TABLE_NODE].delegate('click', A.bind(instance._onClickDaysHeader, instance), _DOT +
                CSS_SCHEDULER_VIEW_DAY_HEADER_DAY);
            instance[COLUMN_DATA].delegate('mousedown', A.bind(instance._onMouseDownTableCol, instance), _DOT +
                CSS_SCHEDULER_VIEW_DAY_TABLE_COL);
            instance[COLUMN_DATA].delegate('mouseenter', A.bind(instance._onMouseEnterEvent, instance), _DOT +
                CSS_SCHEDULER_EVENT);
            instance[COLUMN_DATA].delegate('mouseleave', A.bind(instance._onMouseLeaveEvent, instance), _DOT +
                CSS_SCHEDULER_EVENT);
            instance[COLUMN_DATA].delegate('mousemove', A.bind(instance._onMouseMoveTableCol, instance), _DOT +
                CSS_SCHEDULER_VIEW_DAY_TABLE_COLDAY);
            instance[COLUMN_DATA].delegate('mouseup', A.bind(instance._onMouseUpTableCol, instance), _DOT +
                CSS_SCHEDULER_VIEW_DAY_TABLE_COL);

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

            instance[GRID_CONTAINER].attr(COLSPAN, instance.get(DAYS));

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
                WidgetStdMod.BODY, instance[TABLE_NODE].getDOM());

            var headerNodes = A.NodeList.create(instance[HEADER_TABLE_NODE]);

            if (instance[HEADER_VIEW]) {
                headerNodes.push(instance[HEADER_VIEW].get(BOUNDING_BOX));
                headerNodes.push(instance.get(HEADER_VIEW_LABEL_NODE));
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
            var hourHeight = instance.get(HOUR_HEIGHT);

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
                (date.getSeconds() / 60)) * (instance.get(HOUR_HEIGHT) / 60);
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
            var viewDate = instance.get(SCHEDULER).get(VIEW_DATE);

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
            var viewDate = instance.get(SCHEDULER).get(VIEW_DATE);

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

            return instance[COL_DAYS_NODE].item(instance.getDateDaysOffset(date));
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

            return instance[COLUMN_SHIMS].item(instance.getDateDaysOffset(date));
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
                instance.get(SCHEDULER).get(VIEW_DATE));

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
                instance.get(SCHEDULER).get(VIEW_DATE));

            return DateMath.getDayOffset(
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
            var hourHeight = instance.get(HOUR_HEIGHT);
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

            var nodeList = evt.get(NODE);

            if (nodeList.size() < 2) {
                evt.addPaddingNode();
            }

            var node = evt.get(NODE).item(0);
            var paddingNode = evt.get(NODE).item(1);
            var endShim = instance.getColumnShimByDate(evt.get(END_DATE));
            var startShim = instance.getColumnShimByDate(evt.get(START_DATE));

            if (startShim) {
                startShim.append(node);

                if (evt.get(VISIBLE)) {
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

                    if (evt.get(VISIBLE)) {
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
            var scheduler = instance.get(SCHEDULER);
            var filterFn = instance.get(FILTER_FN);

            instance[COLUMN_SHIMS].each(function(colShimNode, i) {
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
        },

        /**
         * Syncs the `SchedulerView` `columns` instance. Lifecycle.
         *
         * @method syncColumnsUI
         */
        syncColumnsUI: function() {
            var instance = this;
            var todayDate = instance.get(SCHEDULER).get(TODAY_DATE);

            instance[COL_DAYS_NODE].each(function(columnNode, i) {
                var columnDate = instance.getDateByColumn(i);

                columnNode.toggleClass(
                    CSS_SCHEDULER_TODAY, !DateMath.isDayOverlap(columnDate, todayDate));
            });
        },

        /**
         * Syncs the `SchedulerView` `daysHeader` instance. Lifecycle.
         *
         * @method syncDaysHeaderUI
         */
        syncDaysHeaderUI: function() {
            var instance = this;
            var viewDate = instance.get(SCHEDULER).get(VIEW_DATE);
            var formatter = instance.get(HEADER_DATE_FORMATTER);
            var locale = instance.get(LOCALE);
            var todayDate = instance.get(SCHEDULER).get(TODAY_DATE);

            instance[COL_HEADER_DAYS_NODE].all(_ANCHOR).each(
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
            var eventWidth = instance.get(EVENT_WIDTH);

            instance.get(SCHEDULER).flushEvents();

            A.Array.each(columnEvents, function(colEvt) {
                var intercessors = instance.findEventIntersections(
                    colEvt, columnEvents);

                var total = intercessors.length;
                var distributionRate = (eventWidth / total);

                A.Array.each(intercessors, function(evt, j) {
                    var evtNode = evt.get(NODE).item(0);
                    var left = distributionRate * j;
                    var width = distributionRate * 1.7;

                    if (j === (total - 1)) {
                        width = eventWidth - left;
                    }

                    evtNode.setStyle(WIDTH, width + _PERCENT);
                    evtNode.setStyle(LEFT, left + _PERCENT);

                    var evtParentNode = evtNode.get(PARENT_NODE);

                    if (evtParentNode) {
                        evtParentNode.insert(evtNode, j);
                    }

                    evt._filtered = true;
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
            var endDate = evt.get(END_DATE);
            var startDate = evt.get(START_DATE);

            var maxVisibleDate = DateMath.clone(startDate);
            maxVisibleDate.setHours(24, 0, 0);

            var minutesOffset = DateMath.getMinutesOffset(
                instance.limitDate(endDate, maxVisibleDate), startDate);

            evt.get(NODE).item(0).set(OFFSET_HEIGHT, instance.calculateEventHeight(minutesOffset));

            var paddingNode = evt.get(NODE).item(1);

            if (paddingNode.inDoc()) {
                var paddingMinutesOffset = DateMath.getMinutesOffset(
                    endDate, DateMath.toMidnight(evt.getClearEndDate()));

                paddingNode.set(OFFSET_HEIGHT, instance.calculateEventHeight(paddingMinutesOffset));
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

            evt.get(NODE).item(0).setStyle(
                TOP, instance.calculateTop(evt.get(START_DATE)) + PX);

            evt.get(NODE).item(1).setStyle(TOP, 0);
        },

        /**
         * Syncs the `SchedulerView` `headerView` instance. Lifecycle.
         *
         * @method syncHeaderViewUI
         */
        syncHeaderViewUI: function() {
            var instance = this;

            if (instance.get(HEADER_VIEW)) {
                var headerView = instance[HEADER_VIEW];

                headerView.plotEvents();

                instance.headerNode.setStyle(PADDING_RIGHT, getScrollbarWidth());

                var headerViewBB = headerView.get(BOUNDING_BOX);

                var headerViewData = headerViewBB.one(_DOT + CSS_SVT_TABLE_DATA);
                var height = Math.max(headerViewData.get(OFFSET_HEIGHT), 40);

                headerView.set(HEIGHT, height);

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

            return (xy[1] - startXY[1]) / (instance.get(HOUR_HEIGHT) / 2) * 30;
        },

        /**
         * Returns a collection of `SchedulerEvents` as the parameter `events`
         * that intersect with `evt`.
         *
         * @method findEventIntersections
         * @param {A.SchedulerEvent} evt A `Scheduler` event.
         * @param {A.SchedulerEvent[]} A collections of `SchedulerEvent`s.
         * @return {Array}
         */
        findEventIntersections: function(evt, events) {
            var instance = this;
            var group = [];

            A.Array.each(events, function(evtCmp) {
                if (!evt._filtered && evtCmp.get(VISIBLE) && evt.intersectHours(evtCmp)) {
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
         * @param {EventFacade} event Event Facade object
         */
        getXYDelta: function(event) {
            var instance = this;
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
                Math.ceil(instance.get(HOUR_HEIGHT) / 2), 10);
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
         * @param {EventFacade} event Event Facade object
         * @protected
         */
        _afterDragAlign: function(event) {
            var instance = this;
            var dd = event.target;

            if (!instance[START_XY]) {
                instance[START_XY] = dd.actXY;
            }

            dd.actXY[0] = null;
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
            var draggingEvent = instance[DRAGGING_EVENT];

            if (draggingEvent && !instance[RESIZING]) {
                var placeholder = instance[EVENT_PLACEHOLDER];
                var delta = toNumber(activeColumn.attr(DATA_COLNUMBER)) - instance.startColNumber;

                instance.draggingEventStartDate = DateMath.add(draggingEvent.get(START_DATE), DateMath.DAY, delta);

                var startDate = DateMath.clone(instance.draggingEventStartDate);

                DateMath.copyHours(startDate, placeholder.get(START_DATE));

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
         * @param {EventFacade} event Event Facade object
         * @protected
         */
        _dragTickAlignY: function(event) {
            var instance = this;
            var scheduler = instance.get(SCHEDULER);
            var recorder = scheduler.get(EVENT_RECORDER);

            var draggingEvent = instance[DRAGGING_EVENT];

            if (draggingEvent) {
                var dd = event.target.get(HOST);
                var placeholder = instance[EVENT_PLACEHOLDER];
                var delta = instance.calculateYDelta(instance[START_XY], dd.actXY);

                if (instance[RESIZING]) {
                    var endDate = DateMath.add(instance.draggingEventEndDate, DateMath.MINUTES, delta);

                    if (DateMath.getMinutesOffset(endDate, instance.draggingEventStartDate) < 30) {
                        return;
                    }

                    placeholder.set(END_DATE, endDate, {
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
         * Configures a `DD Delegate` that handles `DD` events for this
         * `SchedulerDayView`.
         *
         * @method _setupDragDrop
         * @protected
         */
        _setupDragDrop: function() {
            var instance = this,
                placeholder = instance[EVENT_PLACEHOLDER];

            if (!placeholder) {
                var scheduler = instance.get(SCHEDULER);

                placeholder = new scheduler.eventModel({
                    scheduler: scheduler
                });

                placeholder.removeTarget(scheduler);
                placeholder.get(NODE).addClass(CSS_SCHEDULER_EVENT_PROXY);
                placeholder.set(VISIBLE, false, {
                    silent: true
                });
                instance[EVENT_PLACEHOLDER] = placeholder;
            }

            if (!instance.delegate) {
                instance.delegate = new A.DD.Delegate(
                    instance.get(DELEGATE_CONFIG));
            }

            var dd = instance.delegate.dd;

            dd.unplug(A.Plugin.DDConstrained);
            dd.unplug(A.Plugin.DDNodeScroll);

            var region = instance.bodyNode.get(REGION);

            region.bottom = Infinity;
            region.top = -Infinity;

            dd.plug(A.Plugin.DDConstrained, {
                bubbleTargets: instance,
                constrain: region,
                stickY: true,
                tickY: instance.get(HOUR_HEIGHT) / 2
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
         * @param {*} val The value of the property.
         * @protected
         */
        _uiSetDate: function(val) {
            var instance = this;

            instance.syncColumnsUI();
            instance.syncDaysHeaderUI();
        },

        /**
         * Handles `clickDays` events.
         *
         * @method _onClickDaysHeader
         * @param {EventFacade} event Event Facade object
         * @protected
         */
        _onClickDaysHeader: function(event) {
            var instance = this;
            var scheduler = instance.get(SCHEDULER);

            if (event.target.test('a, a span')) {
                var dayView = scheduler.getViewByName(DAY);

                if (dayView) {
                    var colNumber = toNumber(event.currentTarget.attr(DATA_COLNUMBER));

                    scheduler.set(DATE, instance.getDateByColumn(colNumber));
                    scheduler.set(ACTIVE_VIEW, dayView);
                }
            }

            event.preventDefault();
        },

        /**
         * Handles `eventDrag` events.
         *
         * @method _onEventDragEnd
         * @param {EventFacade} event Event Facade object
         * @protected
         */
        _onEventDragEnd: function(event) {
            var instance = this;
            var draggingEvent = instance[DRAGGING_EVENT];

            if (draggingEvent) {
                var placeholder = instance[EVENT_PLACEHOLDER];

                placeholder.set(VISIBLE, false, {
                    silent: true
                });
                draggingEvent.set(VISIBLE, true, {
                    silent: true
                });
                draggingEvent.copyDates(placeholder);

                instance.get(SCHEDULER).syncEventsUI();
            }

            instance[START_XY] = null;
            instance[DRAGGING_EVENT] = null;
        },

        /**
         * Handles `eventDrag` events.
         *
         * @method _onEventDragStart
         * @param {EventFacade} event Event Facade object
         * @protected
         */
        _onEventDragStart: function(event) {
            var instance = this;
            var draggingEvent = instance[DRAGGING_EVENT] = instance.delegate.dd.get(NODE).getData(SCHEDULER_EVENT);

            if (draggingEvent) {
                var placeholder = instance[EVENT_PLACEHOLDER];

                placeholder.copyPropagateAttrValues(draggingEvent, null, {
                    silent: true
                });

                instance.plotEvent(placeholder);

                draggingEvent.set(VISIBLE, false, {
                    silent: true
                });

                instance.draggingEventStartDate = DateMath.clone(draggingEvent.get(START_DATE));
                instance.draggingEventEndDate = DateMath.clone(draggingEvent.get(END_DATE));

                var startColumn = instance.getColumnByDate(draggingEvent.get(START_DATE));

                instance.startColNumber = startColumn ? toNumber(startColumn.attr(DATA_COLNUMBER)) : 0;
            }
        },

        /**
         * Handles `mouseDownTableCol` events.
         *
         * @method _onMouseDownTableCol
         * @param {EventFacade} event Event Facade object
         * @protected
         */
        _onMouseDownTableCol: function(event) {
            var instance = this;
            var target = event.target;
            var scheduler = instance.get(SCHEDULER);
            var recorder = scheduler.get(EVENT_RECORDER);

            if (recorder && !scheduler.get(DISABLED)) {
                recorder.hidePopover();

                if (target.test(_DOT + CSS_SCHEDULER_VIEW_DAY_TABLE_COL_SHIM)) {
                    instance[START_XY] = [event.pageX, event.pageY];

                    var colNumber = toNumber(event.currentTarget.attr(DATA_COLNUMBER));
                    var startDate = instance.getDateByColumn(colNumber);
                    var clickLeftTop = instance.getXYDelta(event);

                    instance.roundToNearestHour(
                        startDate, instance.getYCoordTime(clickLeftTop[1]));

                    var endDate = DateMath.add(startDate, DateMath.MINUTES, recorder.get(DURATION));

                    recorder.move(startDate, {
                        silent: true
                    });

                    recorder.setAttrs({
                        allDay: false,
                        endDate: endDate
                    }, {
                        silent: true
                    });

                    instance[CREATION_START_DATE] = startDate;

                    event.halt();
                }
                else if (target.test(
                            [_DOT + CSS_SCHEDULER_VIEW_DAY_RESIZER,
                             _DOT + CSS_SCHEDULER_VIEW_DAY_RESIZER_ICON].join(_COMMA))) {

                    instance[RESIZING] = true;
                }
            }

            instance.get(BOUNDING_BOX).unselectable();
        },

        /**
         * Handles `mouseEnter` events.
         *
         * @method _onMouseEnterEvent
         * @param {EventFacade} event Event Facade object
         * @protected
         */
        _onMouseEnterEvent: function(event) {
            var instance = this;
            var target = event.currentTarget;
            var evt = target.getData(SCHEDULER_EVENT);

            if (evt && !evt.get(DISABLED)) {
                instance[RESIZER_NODE].appendTo(target);
            }
        },

        /**
         * Handles `mouseLeave` events.
         *
         * @method _onMouseLeaveEvent
         * @param {EventFacade} event Event Facade object
         * @protected
         */
        _onMouseLeaveEvent: function(event) {
            var instance = this;

            if (!instance[RESIZING]) {
                instance._removeResizer();
            }
        },

        /**
         * Handles `mouseMoveTableCol` events.
         *
         * @method _onMouseMoveTableCol
         * @param {EventFacade} event Event Facade object
         * @protected
         */
        _onMouseMoveTableCol: function(event) {
            var instance = this;
            var activeColumn = event.currentTarget;
            var recorder = instance.get(SCHEDULER).get(EVENT_RECORDER);

            if (instance[ACTIVE_COLUMN] !== activeColumn) {
                instance[ACTIVE_COLUMN] = activeColumn;
                instance._dragTickAlignX(instance[ACTIVE_COLUMN]);
            }

            var creationStartDate = instance[CREATION_START_DATE];

            if (creationStartDate) {
                var delta = roundToNearestMultiple(
                    instance.calculateYDelta(instance[START_XY], [event.pageX, event.pageY]),
                    instance.getTickY()
                );

                var down = (delta >= instance._delta);

                if (instance._delta !== delta) {
                    if (delta > 0) {
                        var newDelta = down ? Math.max(delta, recorder.get(DURATION)) : delta;

                        recorder.set(END_DATE, DateMath.add(creationStartDate, DateMath.MINUTES, newDelta), {
                            silent: true
                        });
                    }
                    else {
                        recorder.set(START_DATE, DateMath.add(creationStartDate, DateMath.MINUTES, delta), {
                            silent: true
                        });
                    }

                    instance.plotEvent(recorder);

                    instance._delta = delta;
                }
            }
        },

        /**
         * Handles `mouseUpTableCol` events.
         *
         * @method _onMouseUpTableCol
         * @param {EventFacade} event Event Facade object
         * @protected
         */
        _onMouseUpTableCol: function(event) {
            var instance = this;
            var scheduler = instance.get(SCHEDULER);
            var recorder = scheduler.get(EVENT_RECORDER);

            if (recorder && !scheduler.get(DISABLED)) {
                if (instance[CREATION_START_DATE]) {
                    instance.plotEvent(recorder);

                    recorder.showPopover();
                }
            }

            instance[CREATION_START_DATE] = null;
            instance[RESIZING] = false;
            instance[START_XY] = null;

            instance._removeResizer();
            instance.get(BOUNDING_BOX).selectable();
        },

        /**
         * Handles `scheduler` value change.
         *
         * @method _onSchedulerChange
         * @param {EventFacade} event Event Facade object
         * @protected
         */
        _onSchedulerChange: function(event) {
            var instance = this;

            if (instance[HEADER_VIEW]) {
                instance[HEADER_VIEW].set(SCHEDULER, event.newVal);
            }
        },

        /**
         * Removes the `SchedulerView`'s resizer `Node` from the DOM.
         *
         * @method _removeResizer
         * @protected
         */
        _removeResizer: function() {
            var instance = this;

            instance[RESIZER_NODE].remove();
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
            var days = instance.get(DAYS);
            var buffer = [],
                colNumber = 0;

            while (days--) {
                buffer.push(
                    A.Lang.sub(TPL_SCHEDULER_VIEW_DAY_TABLE_COLDAY, {
                        colNumber: colNumber++
                    })
                );
            }

            return A.NodeList.create(buffer.join(_EMPTY_STR));
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
            var days = instance.get(DAYS);
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

            return A.NodeList.create(buffer.join(_EMPTY_STR));
        },

        /**
         * Returns the `markercellsNode` value.
         *
         * @method _valueMarkercellsNode
         * @protected
         * @return {Node} The `markercellsNode` value.
         */
        _valueMarkercellsNode: function() {
            var instance = this;
            var buffer = [],
                i;

            for (i = 0; i <= 23; i++) {
                buffer.push(TPL_SCHEDULER_VIEW_DAY_MARKERCELL);
            }

            return A.NodeList.create(buffer.join(_EMPTY_STR));
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
            var isoTime = instance.get(ISO_TIME);
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

            return A.NodeList.create(buffer.join(_EMPTY_STR));
        }
    }
});

A.SchedulerDayView = SchedulerDayView;
