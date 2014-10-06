/**
 * The Layout Builder Remove Col Component
 *
 * @module aui-layout-builder-remove-col
 */

var CSS_REMOVE_COL = A.getClassName('layout', 'remove', 'col'),
    SELECTOR_COL = '.col';

/**
 * LayoutBuilder extension, which can be used to add the funcionality of removing
 * columns from the builder's layout.
 *
 * @class A.LayoutBuilderRemoveCol
 * @param {Object} config Object literal specifying layout builder configuration
 *     properties.
 * @constructor
 */
A.LayoutBuilderRemoveCol = function() {};

A.LayoutBuilderRemoveCol.prototype = {
    /**
     * Button to remove a col.
     *
     * @property _removeColButton
     * @type {Node}
     * @protected
     */
    _removeColButton: null,

    /**
     * Construction logic executed during LayoutBuilderRemoveCol instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._removeColButton = A.Node.create('<span>').addClass(CSS_REMOVE_COL + ' glyphicon glyphicon-remove');

        this._eventHandles.push(
            this.after('enableRemoveColsChange', this._afterEnableRemoveColsChange)
        );

        this._uiSetEnableRemoveCols(this.get('enableRemoveCols'));
    },

    /**
     * Destructor implementation for the `A.LayoutBuilderRemoveCol` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this._unbindRemoveColEvents();
    },

    /**
     * Fired after the `enableRemoveCols` attribute changes.
     *
     * @method _afterEnableRemoveColsChange
     * @protected
     */
    _afterEnableRemoveColsChange: function() {
        this._uiSetEnableRemoveCols(this.get('enableRemoveCols'));
    },

    /**
     * Binds the necessary events for the functionality of removing columns from
     * the layout.
     *
     * @method _bindRemoveColEvents
     * @protected
     */
    _bindRemoveColEvents: function() {
        var container = this.get('container');

        this._removeColsEventHandles = [
            container.delegate('mouseenter', A.bind(this._onMouseEnterRemoveColEvent, this), SELECTOR_COL),
            container.delegate('mouseleave', A.bind(this._onMouseLeaveRemoveColEvent, this), SELECTOR_COL),
            container.delegate('click', A.bind(this._onMouseClickRemoveColEvent, this), '.' + CSS_REMOVE_COL)
        ];
    },

    /**
     * Fired on `click` event for the remove column button.
     *
     * @method _onMouseClickRemoveColEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickRemoveColEvent: function(event) {
        var col = event.target.ancestor(),
            row = col.ancestor().getData('layout-row');

        row.removeCol(col.getData('layout-col'));
    },

    /**
     * Fired on `mouseenter` event for the layout columns.
     *
     * @method _onMouseEnterRemoveColEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseEnterRemoveColEvent: function(event) {
        event.currentTarget.append(this._removeColButton);
    },

    /**
     * Fired on `mouseleave` event for the layout columns.
     *
     * @method _onMouseLeaveRemoveColEvent
     * @protected
     */
    _onMouseLeaveRemoveColEvent: function() {
        this._removeColButton.remove();
    },

    /**
     * Updates the UI according to the value of the `enableRemoveCols` attribute.
     *
     * @method _uiSetEnableRemoveCols
     * @param {Boolean} enableRemoveCols
     * @protected
     */
    _uiSetEnableRemoveCols: function(enableRemoveCols) {
        if (enableRemoveCols) {
            this._bindRemoveColEvents();
        }
        else {
            this._unbindRemoveColEvents();
            this._removeColButton.remove();
        }
    },

    /**
     * Unbinds the events related to the functionality of removing columns from
     * the layout.
     *
     * @method _unbindRemoveColEvents
     * @protected
     */
    _unbindRemoveColEvents: function() {
        if (this._removeColsEventHandles) {
            (new A.EventHandle(this._removeColsEventHandles)).detach();
        }
    }
};

/**
 * Static property used to define the default attribute configuration for the
 * `A.LayoutBuilderRemoveCol`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
A.LayoutBuilderRemoveCol.ATTRS = {
    /**
     * Flag indicating if the feature of removing columns from the layout is
     * enabled or not.
     *
     * @attribute enableRemoveCols
     * @default true
     * @type {Boolean}
     */
    enableRemoveCols: {
        validator: A.Lang.isBoolean,
        value: true
    }
};
