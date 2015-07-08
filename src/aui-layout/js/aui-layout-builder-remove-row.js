/**
 * The Layout Remove Row Component
 *
 * @module aui-layout-remove-row
 */

var CSS_REMOVE_ROW = A.getClassName('layout', 'builder', 'remove', 'row', 'button'),
    SELECTOR_ROW = '.layout-row',
    TPL_REMOVE_ROW_BUTTON = '<button class="btn btn-default btn-xs ' + CSS_REMOVE_ROW + '" tabindex="4" type="button">' +
        '<span class="glyphicon glyphicon-trash"></span></button>';
/**
 * A base class for Layout Remove Row.
 *
 * @class A.LayoutBuilderRemoveRow
 * @param {Object} config Object literal specifying layout configuration
 *     properties.
 * @constructor
 */
function LayoutBuilderRemoveRow() {}

LayoutBuilderRemoveRow.prototype = {
    /**
     * Construction logic executed during instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._eventHandles.push(
            this.after('enableRemoveRowsChange', A.bind(this._afterEnableRemoveRowsChange, this)),
            this.after('layout:rowsChange', A.bind(this._afterRemoveRowRowsChange, this)),
            this.after('layoutChange', A.bind(this._afterRemoveRowLayoutChange, this)),
            this.after('layout:isColumnModeChange', A.bind(this._afterRemoveRowIsColumnModeChange, this))
        );

        this._uiSetEnableRemoveRows(this.get('enableRemoveRows'));
    },

    /**
     * Destructor implementation for the `A.LayoutBuilderRemoveRow` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this._unbindRemoveRowEvents();
    },

    /**
     * Fired after `isColumnMode` changes.
     *
     * @method _afterRemoveRowIsColumnModeChange
     * @protected
     */
    _afterRemoveRowIsColumnModeChange: function() {
        this._uiSetEnableRemoveRows(this.get('enableRemoveRows'));
    },

    /**
     * Fired after `layout` attribute changes.
     *
     * @method _afterRemoveRowLayoutChange
     * @protected
     */
    _afterRemoveRowLayoutChange: function() {
        this._uiSetEnableRemoveRows(this.get('enableRemoveRows'));
    },

    /**
     * Fired after the `removable` attribute changes.
     *
     * @method _afterRemoveRowRemovableChange
     * @params {EventFacade} event
     * @protected
     */
    _afterRemoveRowRemovableChange: function(event) {
        var containerRow = event.target.get('node'),
            layoutRow = event.target,
            removeRowButton;

        removeRowButton = containerRow.one('.' + CSS_REMOVE_ROW);

        if (!event.newVal) {
            if (removeRowButton) {
                removeRowButton.remove();
            }
        }
        else {
            this._insertRemoveButtonBeforeRow(layoutRow, containerRow.one(SELECTOR_ROW));
        }
    },

    /**
     * Fired after `rows` attribute changes.
     *
     * @method _afterRemoveRowRowsChange
     * @protected
     */
    _afterRemoveRowRowsChange: function() {
        this._uiSetEnableRemoveRows(this.get('enableRemoveRows'));
    },

    /**
     * Fired after the `enableRemoveRows` attribute changes.
     *
     * @method _afterEnableRemoveRowsChange
     * @protected
     */
    _afterEnableRemoveRowsChange: function() {
        this._uiSetEnableRemoveRows(this.get('enableRemoveRows'));
    },

    /**
     * Appends one remove row button before each row.
     *
     * @method _appendButtonToRows
     * @protected
     */
    _appendButtonToRows: function() {
        var instance = this,
            layoutRow,
            rows = this._layoutContainer.all(SELECTOR_ROW);

        rows.each(function(row) {
            layoutRow = row.getData('layout-row');

            if (layoutRow.get('removable')) {
                instance._insertRemoveButtonBeforeRow(layoutRow, row);
            }
        });
    },

    /**
     * Binds the necessary events for the functionality of removing rows from layout.
     *
     * @method _bindRemoveRowEvents
     * @protected
     */
    _bindRemoveRowEvents: function() {
        var container = this.get('container');

        this._removeRowsEventHandles = [
            container.delegate('click', A.bind(this._onMouseClickRemoveRowEvent, this), '.' + CSS_REMOVE_ROW),
            this.after('layout-row:removableChange', this._afterRemoveRowRemovableChange)
        ];
    },

    /**
     * Inserts remove button before a specified row.
     *
     * @method _insertRemoveButtonBeforeRow
     * @param {A.LayoutRow} layoutRow
     * @param {Node} row
     * @protected
     */
    _insertRemoveButtonBeforeRow: function(layoutRow, row) {
        var removeRowButton;

        removeRowButton = A.Node.create(TPL_REMOVE_ROW_BUTTON);

        removeRowButton.setData('layout-row', layoutRow);
        this._layoutContainer.insertBefore(removeRowButton, row);
    },

    /**
     * Fires after click on remove row button.
     *
     * @method _onMouseClickEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickRemoveRowEvent: function(event) {
        var removeRowButton = event.currentTarget,
            row = removeRowButton.getData('layout-row');

        if (this.get('clickRemoveRow')(row)){
            this.get('layout').removeRow(row);
        }
    },

    /**
     * Removes all remove row buttons.
     *
     * @method _removeRemoveButtonFromRows
     * @protected
     */
    _removeRemoveButtonFromRows: function() {
        this.get('container').all('.' + CSS_REMOVE_ROW).remove();
    },

    /**
     * Updates the UI according to the value of the `enableRemoveRows` attribute.
     *
     * @method _uiSetEnableRemoveRows
     * @param {Boolean} enableRemoveRows
     * @protected
     */
    _uiSetEnableRemoveRows: function(enableRemoveRows) {
        this._removeRemoveButtonFromRows();

        if (enableRemoveRows && this.get('layout').get('isColumnMode')) {
            this._appendButtonToRows();
            this._bindRemoveRowEvents();
        }
        else {
            this._unbindRemoveRowEvents();
        }
    },

    /**
     * Unbinds the events related to the functionality of removing rows from layout.
     *
     * @method _unbindRemoveRowEvents
     * @protected
     */
    _unbindRemoveRowEvents: function() {
        if (this._removeRowsEventHandles) {
            (new A.EventHandle(this._removeRowsEventHandles)).detach();
        }
    }
};

/**
 * Static property used to define the default attribute configuration for the
 * `A.LayoutBuilderRemoveRow`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
LayoutBuilderRemoveRow.ATTRS = {
    /**
     * Check if the row can be remove when remove button is clicked.  
     *
     * @attribute clickRemoveRow
     * @type {Function}
     */
    clickRemoveRow: {
        validator: A.Lang.isFunction,
        value: function() {
            return true;
        }
    },

    /**
     * Flag indicating if the feature of removing rows from layout is
     * enabled or not.
     *
     * @attribute enableRemoveRows
     * @default true
     * @type {Boolean}
     */
    enableRemoveRows: {
        validator: A.Lang.isBoolean,
        value: true
    }
};

A.LayoutBuilderRemoveRow = LayoutBuilderRemoveRow;
