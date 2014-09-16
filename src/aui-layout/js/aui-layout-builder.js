/**
 * The Layout Builder Component
 *
 * @module aui-layout-builder
 */

var CSS_LAYOUT_DRAG_HANDLE = A.getClassName('layout', 'drag', 'handle'),
    CSS_LAYOUT_GRID = A.getClassName('layout', 'grid'),
    CSS_LAYOUT_RESIZING = A.getClassName('layout', 'resizing'),
    SELECTOR_COL = '.col',
    MAX_NUMBER_OF_COLUMNS = 12,
    OFFSET_WIDTH = 'offsetWidth';

/**
 * A base class for Layout Builder.
 *
 * Check the [live demo](http://alloyui.com/examples/layout-builder/).
 *
 * @class A.LayoutBuilder
 * @extends Base
 * @param {Object} config Object literal specifying layout builder configuration
 *     properties.
 * @constructor
 */
A.LayoutBuilder = A.Base.create('layout-builder', A.Base, [], {

    /**
     * Holds the drag handle node.
     *
     * @property dragHandle
     * @type {Node}
     * @protected
     */
    dragHandle: null,

    /**
     * Construction logic executed during LayoutBuilder instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var container = this.get('container'),
            layout = this.get('layout');

        layout.draw(container);

        this._createDragHandle();
        container.unselectable();

        this._eventHandles = [
            container.delegate('mousedown', A.bind(this._onMouseDownEvent, this), '.' + CSS_LAYOUT_DRAG_HANDLE),
            container.delegate('mouseenter', A.bind(this._onMouseEnterEvent, this), SELECTOR_COL),
            container.delegate('mouseleave', A.bind(this._onMouseLeaveEvent, this), SELECTOR_COL)
        ];

        this.bindUI();
    },

    /**
     * Bind the events on the A.LayoutBuilder. Lifecycle.
     *
     * @method bindUI
     */
    bindUI: function() {
        var container = this.get('container'),
            layout = this.get('layout');

        layout.addTarget(this);

        this.on('layout:rowsChange', function() {
            layout.draw(container);
        });

        this.on('layout-row:colsChange', function() {
            layout.draw(container);
        });
    },

    /**
     * Destructor implementation for the `A.LayoutBuilder` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        (new A.EventHandle(this._eventHandles)).detach();
    },

    /**
     * Creates drag handle node.
     *
     * @method _createDragHandle
     * @protected
     */
    _createDragHandle: function() {
        this.dragHandle = A.Node.create('<span>').addClass(CSS_LAYOUT_DRAG_HANDLE);
    },

    /**
     * Decreases target width.
     *
     * @method _decreaseCol
     * @param {Node} target Node that will be decreased.
     * @param {Number} dragDifference Difference in pixels between mousedown and
     *   mouseup event's clientX.
     * @protected
     */
    _decreaseCol: function(target, dragDifference) {
        var colWidth = this.get('container').get(OFFSET_WIDTH) / MAX_NUMBER_OF_COLUMNS,
            nextClassNumber,
            targetWidth = target.get(OFFSET_WIDTH);

        nextClassNumber = Math.ceil((targetWidth - dragDifference) / colWidth);
        nextClassNumber = nextClassNumber > 0 ? nextClassNumber : 1;

        target.getData('layout-col').set('size', nextClassNumber);
        this.get('layout').draw(this.get('container'));
    },

    /**
     * Gets the size of the given column node.
     *
     * @method _getColSize
     * @param {Node} col Node to get the size of.
     * @return {Number} Size of the column.
     * @protected
     */
    _getColSize: function(col) {
        return col.getData('layout-col').get('size');
    },

    /**
     * Calculates the space already being used by the given column's parent row.
     *
     * @method _getUsedSpaceInParentRow
     * @param {Node} col
     * @return {Number}
     * @protected
     */
     _getUsedSpaceInParentRow: function(col) {
         var row = col.ancestor('.row');

         return row.getData('layout-row').getSize();
     },

    /**
     * Calculates if current target has space to move into parent's row.
     *
     * @method _hasSpaceToMove
     * @param {Node} col Node of the column to check for space.
     * @return {Boolean}
     * @protected
     */
    _hasSpaceToMove: function(col) {
        var numberOfColumns = this._getUsedSpaceInParentRow(col);

        return numberOfColumns < MAX_NUMBER_OF_COLUMNS;
    },

    /**
     * Increases col width.
     *
     * @method _increaseCol
     * @param {Node} col Node that will be increased.
     * @param {Number} dragDifference Difference in pixels between mousedown and
     *   mouseup event's clientX.
     * @protected
     */
    _increaseCol: function(col, dragDifference) {
        var colWidth = this.get('container').get(OFFSET_WIDTH) / MAX_NUMBER_OF_COLUMNS,
            currentTargetColNumber = this._getColSize(col),
            nextClassNumber,
            numberOfUsedColumns = this._getUsedSpaceInParentRow(col),
            availableColumns = MAX_NUMBER_OF_COLUMNS - numberOfUsedColumns;

        nextClassNumber = Math.ceil((col.get(OFFSET_WIDTH) - dragDifference) / colWidth);

        if ((nextClassNumber - currentTargetColNumber) + numberOfUsedColumns > MAX_NUMBER_OF_COLUMNS) {
            nextClassNumber = currentTargetColNumber + availableColumns;
        }

        col.getData('layout-col').set('size', nextClassNumber);
        this.get('layout').draw(this.get('container'));
    },

    /**
     * Inserts a grid to the current node in order to visualize the columns area.
     *
     * @method _insertGrid
     * @param {Node} target Node in which the grid will be inserted.
     * @protected
     */
    _insertGrid: function(target) {
        var gridLine,
            i,
            targetColNumber = this._getColSize(target),
            gridWidth = target.get(OFFSET_WIDTH) / targetColNumber;

        for (i = 1; i < targetColNumber; i++) {
            gridLine = A.Node.create('<div>').addClass(CSS_LAYOUT_GRID);
            gridLine.setStyle('left', gridWidth * i);
            target.append(gridLine);
        }
    },

    /**
     * Fired on `mousedown`. Inserts the drag grid and listens to the next
     * `mouseup` event.
     *
     * @method _onMouseDownEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseDownEvent: function(event) {
        var clientX = event.clientX,
            col = event.target.ancestor();

        this._insertGrid(col);

        A.one('body').addClass(CSS_LAYOUT_RESIZING);

        this.get('container').once('mouseup', this._onMouseUpEvent, this, clientX, col);
    },

    /**
     * Adds a handle node to target.
     *
     * @method _onMouseEnterEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseEnterEvent: function(event) {
        event.target.append(this.dragHandle);
    },

    /**
     * Removes handle node.
     *
     * @method _onMouseLeaveEvent
     * @protected
     */
    _onMouseLeaveEvent: function() {
        this.dragHandle.remove();
    },

    /**
     * Fires on `mouseup`. Makes the necessary changes to the layout.
     *
     * @method _onMouseUpEvent
     * @param {EventFacade} event
     * @param {Number} mouseDownClientX ClientX of previous mousedown event
     * @param {Node} col Node of the column to be resized
     * @protected
     */
    _onMouseUpEvent: function(event, mouseDownClientX, col) {
        var dragDifference = mouseDownClientX - event.clientX;

        this._removeGrid(event.target);

        if (dragDifference > 0) {
            this._decreaseCol(col, dragDifference);
        }
        else if (dragDifference < 0 && this._hasSpaceToMove(col)) {
            this._increaseCol(col, dragDifference);
        }

        A.one('body').removeClass(CSS_LAYOUT_RESIZING);
    },

    /**
     * Removes the grid from the target.
     *
     * @method _removeGrid
     * @param {Node} target Node to remove the grid.
     * @protected
     */
    _removeGrid: function(target) {
        target.ancestor().all('.' + CSS_LAYOUT_GRID).remove();
    },

}, {
    /**
     * Static property used to define the default attribute
     * configuration for LayoutBuilder.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Node that that will be inserted the layout.
         *
         * @attribute container
         * @type {String | Node}
         * @initOnly
         */
        container: {
            setter: A.one,
            validator: function(val) {
                return A.Lang.isString(val) || A.instanceOf(val, A.Node);
            },
            writeOnce: 'initOnly'
        },

        /**
         * Object with layout configuration.
         *
         * @attribute layout
         * @type {A.Layout}
         */
        layout: {
            validator: function(val) {
                return A.instanceOf(val, A.Layout);
            }
        }
    }
});
