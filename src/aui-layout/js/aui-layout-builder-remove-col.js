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
        var container = this.get('container');

        this._removeColButton = A.Node.create('<span>').addClass(CSS_REMOVE_COL + ' glyphicon glyphicon-remove');

        this._eventHandles.push(
            container.delegate('mouseenter', A.bind(this._onMouseEnterRemoveColEvent, this), SELECTOR_COL),
            container.delegate('mouseleave', A.bind(this._onMouseLeaveRemoveColEvent, this), SELECTOR_COL),
            container.delegate('click', A.bind(this._onMouseClickRemoveColEvent, this), '.' + CSS_REMOVE_COL)
        );
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
    }
};
