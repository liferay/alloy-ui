/**
 * The Layout Builder Add Col Component
 *
 * @module aui-layout-builder-add-col
 */

var CSS_ADD_COL = A.getClassName('layout', 'add', 'col'),
    MAX_NUMBER_OF_COLUMNS = 4,
    SELECTOR_COL = '.col',
    SELECTOR_ROW = '.row';

/**
 * LayoutBuilder extension, which can be used to add the funcionality of adding
 * columns to the builder's layout.
 *
 * @class A.LayoutBuilderAddCol
 * @param {Object} config Object literal specifying layout builder configuration
 *     properties.
 * @constructor
 */

A.LayoutBuilderAddCol = function() {};

A.LayoutBuilderAddCol.prototype = {
    /**
     * Button to add a col.
     *
     * @property _addColButton
     * @type {Node}
     * @protected
     */
    _addColButton: null,

    /**
     * Construction logic executed during `A.LayoutBuilderAddCol` instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._addColButton = A.Node.create('<span>').addClass(CSS_ADD_COL + ' glyphicon glyphicon-plus');

        this._eventHandles.push(
            this.after('enableAddColsChange', this._afterEnableAddColsChange)
        );

        this._uiSetEnableAddCols(this.get('enableAddCols'));
    },

    /**
     * Destructor implementation for the `A.LayoutBuilderAddCol` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this._unbindAddColEvents();
    },

    /**
     * Fired after the `enableAddCols` attribute changes.
     *
     * @method _afterEnableAddColsChange
     * @protected
     */
    _afterEnableAddColsChange: function() {
        this._uiSetEnableAddCols(this.get('enableAddCols'));
    },

    /**
     * Binds the necessary events for the functionality of adding columns to the
     * layout.
     *
     * @method _bindAddColEvents
     * @protected
     */
    _bindAddColEvents: function() {
        var container = this.get('container');

        this._addColsEventHandles = [
            container.delegate('mouseenter', A.bind(this._onMouseEnterAddColEvent, this), SELECTOR_COL),
            container.delegate('mouseleave', A.bind(this._onMouseLeaveAddColEvent, this), SELECTOR_COL),
            container.delegate('click', A.bind(this._onMouseClickAddColEvent, this), '.' + CSS_ADD_COL)
        ];
    },

    /**
     * Fired on `click` event for the add column button.
     *
     * @method _onMouseClickAddColEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickAddColEvent: function(event) {
        var row = event.currentTarget.ancestor(SELECTOR_ROW).getData('layout-row');
        row.addCol(0);
    },

    /**
     * Fired on `mouseenter` event for the layout columns.
     *
     * @method _onMouseEnterAddColEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseEnterAddColEvent: function(event) {
        var col = event.target,
            numberOfCols,
            row = col.ancestor(SELECTOR_ROW).getData('layout-row');

        numberOfCols = row.get('cols').length;

        if (numberOfCols < MAX_NUMBER_OF_COLUMNS) {
            event.currentTarget.append(this._addColButton);
        }
    },

    /**
     * Fired on `mouseleave` event for the layout columns.
     *
     * @method _onMouseLeaveAddColEvent
     * @protected
     */
    _onMouseLeaveAddColEvent: function() {
        this._addColButton.remove();
    },

    /**
     * Updates the UI according to the value of the `enableAddCols` attribute.
     *
     * @method _uiSetEnableAddCols
     * @param {Boolean} enableAddCols
     * @protected
     */
    _uiSetEnableAddCols: function(enableAddCols) {
        if (enableAddCols) {
            this._bindAddColEvents();
        }
        else {
            this._unbindAddColEvents();
            this._addColButton.remove();
        }
    },

    /**
     * Unbinds the events related to the functionality of adding columns to the
     * layout.
     *
     * @method _unbindAddColEvents
     * @protected
     */
    _unbindAddColEvents: function() {
        if (this._addColsEventHandles) {
            (new A.EventHandle(this._addColsEventHandles)).detach();
        }
    }
};

/**
 * Static property used to define the default attribute configuration for the
 * `A.LayoutBuilderAddCol`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
A.LayoutBuilderAddCol.ATTRS = {
    /**
     * Flag indicating if the feature of adding columns to the layout is
     * enabled or not.
     *
     * @attribute enableAddCols
     * @default true
     * @type {Boolean}
     */
    enableAddCols: {
        validator: A.Lang.isBoolean,
        value: true
    }
};
