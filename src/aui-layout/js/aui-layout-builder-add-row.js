/**
 * The Layout Add Row Component
 *
 * @module aui-layout-add-row
 */

var CSS_ADD_ROW_AREA = A.getClassName('layout', 'builder', 'add', 'row', 'area'),
    CSS_ADD_ROW_AREA_FIXED = A.getClassName('layout', 'builder', 'add', 'row', 'area', 'fixed'),
    CSS_ADD_ROW_CHOOSE_ROW = A.getClassName('layout', 'builder', 'add', 'row', 'choose', 'row'),

    TPL_ADD_ROW_AREA = '<div class="' + CSS_ADD_ROW_AREA + ' ' + CSS_ADD_ROW_AREA_FIXED + '"></div>',
    TPL_ADD_ROW_CHOOSE_ROW = '<div class="' + CSS_ADD_ROW_CHOOSE_ROW + '"></div>';

/**
 * A base class for Layout Add Row.
 *
 * @class A.LayoutBuilderAddRow
 * @param {Object} config Object literal specifying layout configuration
 *     properties.
 */
function LayoutBuilderAddRow() {}

LayoutBuilderAddRow.prototype = {

    /**
     * Area to choose a new type of row.
     *
     * @property _addRowArea
     * @type {Node}
     * @protected
     */
    _addRowArea: null,

    /**
     * Body's node.
     *
     * @property _bodyNode
     * @type {Node}
     * @protected
     */
    _bodyNode: null,

    /**
     * Construction logic executed during instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._addRowArea = this._createAddRowArea();

        this._bodyNode = A.one('body');

        this._eventHandles.push(
            this.after('enableAddRowsChange', this._afterEnableAddRowsChange)
        );

        this._uiSetEnableAddRows(this.get('enableAddRows'));
    },

    /**
     * Destructor implementation for the `A.LayoutBuilderAddRow` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this._unbindAddRowEvents();
    },

    /**
     * Fired after the `enableAddRows` attribute changes.
     *
     * @method _afterEnableAddRowsChange
     * @protected
     */
    _afterEnableAddRowsChange: function() {
        this._uiSetEnableAddRows(this.get('enableAddRows'));
    },

    /**
     * Binds the necessary events for the functionality of adding rows to the
     * layout.
     *
     * @method _bindAddRowEvents
     * @protected
     */
    _bindAddRowEvents: function() {
        var instance = this,
            container = this.get('container');

        this._bodyNode.plug(A.Plugin.ScrollInfo);

        this._bodyNode.scrollInfo.on('scroll', function() {
            instance._setAddRowAreaPosition();
        });

        this._addRowsEventHandles = [
            container.delegate('click', A.bind(this._onMouseClickAddRowEvent, this), '.' + CSS_ADD_ROW_AREA)
        ];
    },

    /**
     * Sets row area to fixed or relative depending on it's position.
     *
     * @method _setAddRowAreaPosition
     * @protected
     */
    _setAddRowAreaPosition: function() {
        var addRowArea = this._addRowArea,
            bodyBottom = this._bodyNode.scrollInfo.getScrollInfo().scrollBottom,
            layoutContainerBottom = this._layoutContainer.get('region').bottom;

        if (bodyBottom < layoutContainerBottom) {
            addRowArea.addClass(CSS_ADD_ROW_AREA_FIXED);
        }
        else if (bodyBottom >= layoutContainerBottom && addRowArea.hasClass(CSS_ADD_ROW_AREA_FIXED)) {
            addRowArea.removeClass(CSS_ADD_ROW_AREA_FIXED);
            window.scrollBy(0, addRowArea.get('region').height);
        }
    },

    /**
     * Creates the area to choose the new row.
     *
     * @method _createAddRowArea
     * @protected
     */
    _createAddRowArea: function() {
        var colWidth,
            index,
            maximumColsForNewRows = this.get('maximumColsForNewRows'),
            rowArea = A.Node.create(TPL_ADD_ROW_AREA),
            rowOption;

        colWidth = (100 / maximumColsForNewRows) + '%';
        rowArea.setStyle('width', this._layoutContainer.getStyle('width'));

        for (index = 1; index <= maximumColsForNewRows; index++) {
            rowOption = A.Node.create(TPL_ADD_ROW_CHOOSE_ROW);
            rowOption.setData('numberOfCols', index);
            rowOption.setStyle('width', colWidth);
            rowOption.set('text', 'Add ' + index + (index !== 1 ? ' cols' : ' col'));

            rowArea.append(rowOption);
        }

        return rowArea;
    },

    /**
     * Fires after click on add row button.
     *
     * @method _onMouseClickEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickAddRowEvent: function(event) {
        var button = event.target,
            numberOfCols = button.getData('numberOfCols');

        this.get('layout').addRowWithSpecifiedColNumber(numberOfCols);
    },

    /**
     * Updates the UI according to the value of the `enableAddRows` attribute.
     *
     * @method _uiSetEnableAddRows
     * @param {Boolean} enableAddRows
     * @protected
     */
    _uiSetEnableAddRows: function(enableAddRows) {
        if (enableAddRows) {
            this.get('container').append(this._addRowArea);
            this._bindAddRowEvents();
            this._setAddRowAreaPosition();
        }
        else {
            this._addRowArea.remove();
            this._unbindAddRowEvents();
        }
    },

    /**
     * Unbinds the events related to the functionality of adding rows to the
     * layout.
     *
     * @method _unbindAddRowEvents
     * @protected
     */
    _unbindAddRowEvents: function() {
        this._bodyNode.unplug(A.Plugin.ScrollInfo);

        if (this._addRowsEventHandles) {
            (new A.EventHandle(this._addRowsEventHandles)).detach();
        }
    }
};

/**
 * Static property used to define the default attribute configuration for the
 * `A.LayoutBuilderAddRow`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
LayoutBuilderAddRow.ATTRS = {
    /**
     * Flag indicating if the feature of adding rows to the layout is
     * enabled or not.
     *
     * @attribute enableAddRows
     * @default true
     * @type {Boolean}
     */
    enableAddRows: {
        validator: A.Lang.isBoolean,
        value: true
    },

    /**
     * Flag indicating the maximum number of cols for new rows.
     *
     * @attribute
     * @default 4
     * @type {Number}
     */
    maximumColsForNewRows: {
        validator: A.Lang.isNumber,
        value: 4,
        writeOnce: 'initOnly'
    }
};

A.LayoutBuilderAddRow = LayoutBuilderAddRow;
