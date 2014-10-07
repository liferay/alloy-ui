/**
 * The Layout Add Row Component
 *
 * @module aui-layout-add-row
 */

var CSS_ADD_ROW = A.getClassName('layout', 'builder', 'add', 'row', 'button'),
    TPL_ADD_ROW_BUTTON = '<div><button class="' + CSS_ADD_ROW + '">Add row</button></div>';

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
     * Construction logic executed during instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._addRowButton = A.Node.create(TPL_ADD_ROW_BUTTON);

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
        var container = this.get('container');

        this._addRowsEventHandles = [
            container.delegate('click', A.bind(this._onMouseClickAddRowEvent, this), '.' + CSS_ADD_ROW)
        ];
    },

    /**
     * Fires after click on add row button.
     *
     * @method _onMouseClickEvent
     * @protected
     */
    _onMouseClickAddRowEvent: function() {
        this.get('layout').addRow();
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
            this.get('container').append(this._addRowButton);
            this._bindAddRowEvents();
        }
        else {
            this._addRowButton.remove();
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
