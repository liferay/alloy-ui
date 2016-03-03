/**
 * The Layout Add Row Component
 *
 * @module aui-layout-add-row
 */

var CSS_ADD_ROW = A.getClassName('layout', 'builder', 'add', 'row'),
    CSS_ADD_ROW_AREA = A.getClassName('layout', 'builder', 'add', 'row', 'area'),
    CSS_ADD_ROW_SMALL_SCREEN = A.getClassName('layout', 'builder', 'add', 'row', 'small', 'screen'),
    CSS_ADD_ROW_SMALL_SCREEN_AREA = A.getClassName('layout', 'builder', 'add', 'row', 'small', 'screen', 'area'),
    CSS_ADD_ROW_AREA_FIXED = A.getClassName('layout', 'builder', 'add', 'row', 'area', 'fixed'),
    CSS_ADD_ROW_CHOOSE_ROW = A.getClassName('layout', 'builder', 'add', 'row', 'choose', 'row'),

    TPL_ADD_ROW_AREA = '<div class="' + [CSS_ADD_ROW_AREA, CSS_ADD_ROW_AREA_FIXED].join(' ') + '"></div>',
    TPL_ADD_ROW_CHOOSE_ROW = '<div class="' + CSS_ADD_ROW_CHOOSE_ROW + ' ' + CSS_ADD_ROW + '">{addRow}</div>',
    TPL_ADD_ROW_SMALL_SCREEN_SIZE = '<div class="' + [CSS_ADD_ROW, CSS_ADD_ROW_SMALL_SCREEN_AREA].join(' ') +
        '"><div class="' + CSS_ADD_ROW_SMALL_SCREEN + '"></div><div>{addRow}</div></div>';

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
     * @property addRowArea
     * @type {Node}
     */
    addRowArea: null,

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
        this.addRowArea = this._createAddRowArea();
        this._addRowAreaForSmallScreens = this._createAddRowAreaForSmallScreens();

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
     * Adds the appropriate add row area to container.
     *
     * @method _addAppropriateAddRowArea
     * @protected
     */
    _addAppropriateAddRowArea: function() {
        var container = this.get('container');

        if (this.get('layout').get('isColumnMode')) {
            this._addRowAreaForSmallScreens.remove();
            container.append(this.addRowArea);
        }
        else {
            this.addRowArea.remove();
            container.append(this._addRowAreaForSmallScreens);
        }
    },

    /**
     * Add a row to layout.
     *
     * @method _addRow
     * @param {Node} button
     * @protected
     */
    _addRow: function(button) {
        var numberOfCols = button.getData('numberOfCols');

        this.get('layout').addRowWithSpecifiedColNumber(numberOfCols);

        window.scrollTo(0, A.DOM.region(this._layoutContainer._node).bottom);
    },

    /**
     * Fired after the `rows` attribute changes.
     *
     * @method _afterAddRowRowsChange
     * @protected
     */
    _afterAddRowRowsChange: function() {
        this._setAddRowAreaPosition();
    },

    /**
     * Fired after the window's resize.
     *
     * @method _afterAddRowWindowResize
     * @protected
     */
    _afterAddRowWindowResize: function() {
        this._setAddRowAreaPosition();
    },

    /**
     * Fired after `isColumnMode` changes.
     *
     * @method _afterAddRowIsColumnModeChange
     * @protected
     */
    _afterAddRowIsColumnModeChange: function() {
        this._addAppropriateAddRowArea();
        this._setAddRowAreaPosition();
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
            container.delegate('click', A.bind(this._onMouseClickAddRowEvent, this), '.' + CSS_ADD_ROW),
            container.delegate('key', A.bind(this._onKeyPressAddRowEvent, this), 'press:13', '.' + CSS_ADD_ROW),
            this.after('layout:rowsChange', A.bind(this._afterAddRowRowsChange, this)),
            this.after('layout:isColumnModeChange', A.bind(this._afterAddRowIsColumnModeChange, this)),
            A.on('windowresize', A.bind(this._afterAddRowWindowResize, this))
        ];
    },

    /**
     * Creates the area to choose the new row.
     *
     * @method _createAddRowArea
     * @protected
     */
    _createAddRowArea: function() {
        var rowArea = A.Node.create(TPL_ADD_ROW_AREA),
            rowOption;

        rowOption = A.Node.create(A.Lang.sub(TPL_ADD_ROW_CHOOSE_ROW, {
            addRow: this.get('strings').addRow
        }));
        rowOption.setData('numberOfCols', 1);

        rowArea.append(rowOption);

        return rowArea;
    },

    /**
     * Creates the area to add new row for smartphone.
     *
     * @method _createAddRowAreaForSmallScreens
     * @protected
     */
    _createAddRowAreaForSmallScreens: function() {
        var rowArea = A.Node.create(A.Lang.sub(TPL_ADD_ROW_SMALL_SCREEN_SIZE, {
            addRow: this.get('strings').addRow
        }));

        rowArea.setData('numberOfCols', 1);

        return rowArea;
    },

    /**
     * Fired on `key:press` event for the add row button.
     *
     * @method _onKeyPressAddRowEvent
     * @param {EventFacade} event
     * @protected
     */
    _onKeyPressAddRowEvent: function(event) {
        this._addRow(event.target);
    },

    /**
     * Fires after click on add row button.
     *
     * @method _onMouseClickEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickAddRowEvent: function(event) {
        this._addRow(event.target);
        this._setAddRowAreaPosition();
    },

    /**
     * Removes current add row template.
     *
     * @method _removeAddRowTemplate
     * @protected
     */
    _removeAddRowTemplate: function() {
        this.addRowArea.remove();
        this._addRowAreaForSmallScreens.remove();
    },

    /**
     * Sets row area to fixed or relative depending on it's position.
     *
     * @method _setAddRowAreaPosition
     * @protected
     */
    _setAddRowAreaPosition: function() {
        var addRowArea,
            bodyBottom = this._bodyNode.scrollInfo.getScrollInfo().scrollBottom,
            layoutContainerBottom = this._layoutContainer.get('region').bottom;

        if (this.addRowArea.get('parentNode')) {
            addRowArea = this.addRowArea;
        }
        else {
            addRowArea = this._addRowAreaForSmallScreens;
        }

        if (bodyBottom < layoutContainerBottom) {
            addRowArea.addClass(CSS_ADD_ROW_AREA_FIXED);
        }
        else if (bodyBottom >= layoutContainerBottom && addRowArea.hasClass(CSS_ADD_ROW_AREA_FIXED)) {
            addRowArea.removeClass(CSS_ADD_ROW_AREA_FIXED);
            window.scrollBy(0, addRowArea.get('region').height);
        }
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
            this._addAppropriateAddRowArea();
            this._bindAddRowEvents();
            this._setAddRowAreaPosition();
        }
        else {
            this._removeAddRowTemplate();
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
    }
};

A.LayoutBuilderAddRow = LayoutBuilderAddRow;
