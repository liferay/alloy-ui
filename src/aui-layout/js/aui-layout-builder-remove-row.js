/**
 * The Layout Remove Row Component
 *
 * @module aui-layout-remove-row
 */

var CSS_REMOVE_ROW = A.getClassName('layout', 'builder', 'remove', 'row', 'button'),
    TPL_REMOVE_ROW_BUTTON = '<button type="button" class="btn btn-default btn-xs layout-builder-remove-row-button">' +
        '<span class="glyphicon glyphicon-trash"></span> Remove Row</button>';

/**
 * A base class for Layout Remove Row.
 *
 * @class A.LayoutBuilderRemoveRow
 * @param {Object} config Object literal specifying layout configuration
 *     properties.
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
            this.after('layoutChange', A.bind(this._afterRemoveRowLayoutChange, this))
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
     * Fired after `layout` attribute changes.
     *
     * @method _afterRemoveRowLayoutChange
     * @protected
     */
    _afterRemoveRowLayoutChange: function() {
        this._uiSetEnableRemoveRows(this.get('enableRemoveRows'));
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
        var layoutContainer = this._layoutContainer,
            removeRowButton,
            rows = layoutContainer.all('.row');

        rows.each(function(row) {
            removeRowButton = A.Node.create(TPL_REMOVE_ROW_BUTTON);
            removeRowButton.setData('layout-row', row.getData('layout-row'));
            layoutContainer.insertBefore(removeRowButton, row);
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
            container.delegate('click', A.bind(this._onMouseClickRemoveRowEvent, this), '.' + CSS_REMOVE_ROW)
        ];
    },

    /**
     * Fires after click on remove row button.
     *
     * @method _onMouseClickEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickRemoveRowEvent: function(event) {
        var removeRowButton = event.target,
            row = removeRowButton.getData('layout-row');

        this.get('layout').removeRow(row);
    },

    /**
     * Removes all remove row buttons.
     *
     * @method _removeButtonFromRows
     * @protected
     */
    _removeButtonFromRows: function() {
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
        if (enableRemoveRows) {
            this._appendButtonToRows();
            this._bindRemoveRowEvents();
        }
        else {
            this._removeButtonFromRows();
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
