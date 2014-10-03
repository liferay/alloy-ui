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
        var container = this.get('container');

        this._addColButton = A.Node.create('<span>').addClass(CSS_ADD_COL + ' glyphicon glyphicon-plus');

        this._eventHandles.push(
            container.delegate('mouseenter', A.bind(this._onMouseEnterAddColEvent, this), SELECTOR_COL),
            container.delegate('mouseleave', A.bind(this._onMouseLeaveAddColEvent, this), SELECTOR_COL),
            container.delegate('click', A.bind(this._onMouseClickAddColEvent, this), '.' + CSS_ADD_COL)
        );
    },

    /**
     * Fires on `click` event for the add column button.
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
    }
};
