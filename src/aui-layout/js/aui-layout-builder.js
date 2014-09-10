/**
 * The Layout Builder Component
 *
 * @module aui-layout-builder
 */

var COL_CLASS = '.col',
    CURSOR_COL_RESIZE = 'col-resize',
    DRAG_HANDLE_CLASS = A.getClassName('drag', 'handle'),
    LAYOUT_GRID_CLASS = A.getClassName('layout', 'grid'),
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
     * Holds a reference to document's body style.
     *
     * @property documentBody
     * @type {Node}
     * @protected
     */
    bodyStyle: A.config.doc.body.style,

    /**
     * Holds the drag handle node.
     *
     * @property dragHandle
     * @type {Node}
     * @protected
     */
    dragHandle: null,

    /**
     * Holds the previous body cursor.
     *
     * @property activeLink
     * @type {Node}
     * @protected
     */
    previousBodyCursor: '',

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
            container.delegate('mousedown', A.bind(this._onMouseDownEvent, this), '.' + DRAG_HANDLE_CLASS),
            container.delegate('mouseenter', A.bind(this._onMouseEnterEvent, this), COL_CLASS),
            container.delegate('mouseleave', A.bind(this._onMouseLeaveEvent, this), COL_CLASS)
        ];
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
        this.dragHandle = A.Node.create('<span>').addClass(DRAG_HANDLE_CLASS);
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
        var colWidth = this.get('container').get(OFFSET_WIDTH)/MAX_NUMBER_OF_COLUMNS,
            nextClassNumber,
            targetWidth = target.get(OFFSET_WIDTH);

        nextClassNumber = Math.ceil((targetWidth - dragDifference)/colWidth);
        nextClassNumber = nextClassNumber > 0 ? nextClassNumber : 1;

        target.getData('layout-col').set('size', nextClassNumber);
        this.get('layout').draw(this.get('container'));
    },

    /**
     * Calculates the space used in a row according to bootstrap's class number.
     *
     * @method _getUsedSpaceInARow
     * @param {Node} col
     * @return {Number}
     * @protected
     */

     _getUsedSpaceInARow: function(col) {
         var row = col.ancestor('.row');

         return row.getData('layout-row').getSize();
     },

    /**
     * Gets the column number according to bootstrap class.
     *
     * @method _getColSize
     * @param {Node} col Node to extract the bootstrap class number.
     * @return {Number} Node's column number according bootstrap class.
     * @protected
     */
    _getColSize: function(col) {
        return col.getData('layout-col').get('size');
    },

    /**
     * Calculates if current target has space to move into parent's row.
     *
     * @method _hasSpaceToMove
     * @param {Node} col Node which parent will determine if has space to move.
     * @return {Boolean}
     * @protected
     */
    _hasSpaceToMove: function(col) {
        var numberOfColumns = this._getUsedSpaceInARow(col);

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
            numberOfUsedColumns = this._getUsedSpaceInARow(col),
            availableColumns = MAX_NUMBER_OF_COLUMNS - numberOfUsedColumns;

        nextClassNumber = Math.ceil((col.get(OFFSET_WIDTH) - dragDifference)/colWidth);

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
     * @param {Node} target Node which the grid will be inserted.
     * @protected
     */
    _insertGrid: function(target) {
        var gridLine,
            i,
            len,
            targetColNumber = this._getColSize(target),
            gridWidth = target.get(OFFSET_WIDTH)/targetColNumber;

        for (i = 1, len = targetColNumber; i < len; i++) {
            gridLine = A.Node.create('<div>').addClass(LAYOUT_GRID_CLASS);
            gridLine.setStyle('left', gridWidth * i);
            target.append(gridLine);
        }
    },

    /**
     * Attaches a mouseup event.
     *
     * @method _onMouseDownEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseDownEvent: function(event) {
        var clientX = event.clientX,
            bodyStyle = this.bodyStyle,
            row = event.target.ancestor();

        this._insertGrid(row);

        this.previousBodyCursor = bodyStyle.cursor;
        bodyStyle.cursor = CURSOR_COL_RESIZE;

        this.get('container').on('mouseup', this._onMouseUpEvent, this, clientX, row);
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
     *
     *
     * @method _onMouseUpEvent
     * @param {EventFacade} event
     * @param {Number} mouseDownClientX ClientX of previous mousedown event
     * @param {Node} row Node to be resized
     * @protected
     */
    _onMouseUpEvent: function(event, mouseDownClientX, row) {
        var mouseUpClientX = event.clientX,
            dragDifference = mouseDownClientX - mouseUpClientX;

        this._removeGrid(event.target);

        if (dragDifference > 0) {
            this._decreaseCol(row, dragDifference);
        }
        else if (dragDifference < 0 && this._hasSpaceToMove(row)) {
            this._increaseCol(row, dragDifference);
        }

        this.bodyStyle.cursor = this.previousBodyCursor;
        this.get('container').detachAll('mouseup');
    },

    /**
     * Removes the grid from the target.
     *
     * @method _removeGrid
     * @param {Node} target Node to remove the grid.
     * @protected
     */
    _removeGrid: function(target) {
        target.ancestor().all('.' + LAYOUT_GRID_CLASS).remove();
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
