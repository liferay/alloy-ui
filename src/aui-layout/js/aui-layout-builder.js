/**
 * The Layout Builder Component
 *
 * @module aui-layout-builder
 */

var CSS_ADD_COL = A.getClassName('layout', 'add', 'col'),
    CSS_LAYOUT_DRAG_HANDLE = A.getClassName('layout', 'drag', 'handle'),
    CSS_LAYOUT_GRID = A.getClassName('layout', 'grid'),
    CSS_LAYOUT_RESIZING = A.getClassName('layout', 'resizing'),
    CSS_REMOVE_COL = A.getClassName('layout', 'remove', 'col'),
    MAX_NUMBER_OF_COLUMNS = 4,
    MAX_SIZE = 12,
    OFFSET_WIDTH = 'offsetWidth',
    SELECTOR_COL = '.col',
    SELECTOR_ROW = '.row';

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
     * Button to add a col.
     *
     * @property addColButton
     * @type {Node}
     * @protected
     */
    addColButton: null,

    /**
     * Holds the drag handle node.
     *
     * @property dragHandle
     * @type {Node}
     * @protected
     */
    dragHandle: null,

    /**
     * Determines if dragHandle is locked.
     *
     * @property isDragHandleLocked
     * @type {Boolean}
     * @protected
     */
    isDragHandleLocked: false,

    /**
     * Button to remove a col.
     *
     * @property removeColButton
     * @type {Node}
     * @protected
     */
    removeColButton: null,

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
        this._createHelperButtons();

        container.unselectable();

        this._eventHandles = [
            container.delegate('mousedown', A.bind(this._onMouseDownEvent, this), '.' + CSS_LAYOUT_DRAG_HANDLE),
            container.delegate('mouseenter', A.bind(this._onMouseEnterEvent, this), SELECTOR_COL),
            container.delegate('mouseleave', A.bind(this._onMouseLeaveEvent, this), SELECTOR_COL),
            container.delegate('click', A.bind(this._onMouseClickRemoveColEvent, this), '.' + CSS_REMOVE_COL),
            container.delegate('click', A.bind(this._onMouseClickAddColEvent, this), '.' + CSS_ADD_COL),
            this.after('layoutChange', A.bind(this._afterLayoutChange, this))
        ];

        this._layoutEventHandles = [
            layout.after('layout-row:colsChange', A.bind(this._afterLayoutColsChange, this)),
            layout.after('rowsChange', A.bind(this._afterLayoutRowsChange, this))
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
        (new A.EventHandle(this._layoutEventHandles)).detach();
    },

    /**
     * Fires after layout changes.
     *
     * @method _afterLayoutChange
     * @param {EventFacade} event
     * @protected
     */
    _afterLayoutChange: function(event) {
        var container = this.get('container'),
            newLayout = event.newVal;

        (new A.EventHandle(this._layoutEventHandles)).detach();

        this._layoutEventHandles = [
            newLayout.after('layout-row:colsChange', A.bind(this._afterLayoutColsChange, this)),
            newLayout.after('rowsChange', A.bind(this._afterLayoutRowsChange, this)),
        ];

        newLayout.draw(container);
    },

    /**
     * Fires after cols changes.
     *
     * @method _afterLayoutColsChange
     * @protected
     */
    _afterLayoutColsChange: function() {
        var container = this.get('container'),
            layout = this.get('layout');

        layout.draw(container);
    },

    /**
     * Fires after rows changes.
     *
     * @method _afterLayoutRowsChange
     * @param {EventFacade} event
     * @protected
     */
    _afterLayoutRowsChange: function() {
        var container = this.get('container'),
            layout = this.get('layout');

        layout.draw(container);
    },

    /**
     * Calculates if current target has space to move into parent's row.
     *
     * @method _availableSpaceToMove
     * @param {Node} col Node to check if next col has available space to decrease.
     * @return {Number}
     * @protected
     */
    _availableSpaceToMove: function(col) {
        var nextCol = col.next().getData('layout-col');

        return nextCol.get('size') - nextCol.get('minSize');
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
     * Creates remove col button.
     *
     * @method _createHelperButtons
     * @protected
     */
    _createHelperButtons: function() {
        this.addColButton = A.Node.create('<span>').addClass(CSS_ADD_COL + ' glyphicon glyphicon-plus');
        this.removeColButton = A.Node.create('<span>').addClass(CSS_REMOVE_COL + ' glyphicon glyphicon-remove');
    },

    /**
     * Decreases col width.
     *
     * @method _decreaseCol
     * @param {Node} target Node that will be decreased.
     * @param {Number} dragDifference Difference in pixels between mousedown and
     *   mouseup event's clientX.
     * @protected
     */
    _decreaseCol: function(target, dragDifference) {
        var colWidth = this.get('container').get(OFFSET_WIDTH) / MAX_SIZE,
            col = target.getData('layout-col'),
            currentSize = col.get('size'),
            minSize = col.get('minSize'),
            nextSize,
            targetWidth = target.get(OFFSET_WIDTH);

        nextSize = Math.ceil((targetWidth - dragDifference) / colWidth);

        if (nextSize < minSize) {
            nextSize = minSize;
        }

        if (!this._isBreakpoint(target, nextSize)) {
            return;
        }

        if (nextSize < currentSize) {
            col.set('size', nextSize);
            this._increaseNextCol(target, currentSize - nextSize);
        }
    },

    /**
     * Decreases col width.
     *
     * @method _decreaseNextCol
     * @param {Node} col Node that will be decreased.
     * @param {Number} size Exact size to decrease.
     * @protected
     */
    _decreaseNextCol: function(col, size) {
        var nextCol = col.next().getData('layout-col');
        nextCol.set('size', nextCol.get('size') - size);
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
     * Calculates if current target has space to move into parent's row.
     *
     * @method _hasSpaceToMove
     * @param {Node} col Node of the column to check for space.
     * @return {Boolean}
     * @protected
     */
    _hasSpaceToMove: function(col) {
        var nextCol = col.next().getData('layout-col'),
            nextColSize = nextCol.get('size');

        return nextColSize > nextCol.get('minSize');
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
        var availableSpaceToMove = this._availableSpaceToMove(col),
            colWidth = this.get('container').get(OFFSET_WIDTH) / MAX_SIZE,
            currentSize = this._getColSize(col),
            difference,
            nextSize;

        nextSize = Math.ceil((col.get(OFFSET_WIDTH) - dragDifference) / colWidth);

        difference = nextSize - currentSize;

        if (difference > availableSpaceToMove) {
            nextSize = currentSize + availableSpaceToMove;
            difference = availableSpaceToMove;
        }

        if (!this._isBreakpoint(col, nextSize)) {
            return;
        }

        col.getData('layout-col').set('size', nextSize);
        this._decreaseNextCol(col, difference);
    },

    /**
     * Increases col width.
     *
     * @method _increaseNextCol
     * @param {Node} col Node that will be increased.
     * @param {Number} size Exact size to increase.
     * @protected
     */
    _increaseNextCol: function(col, size) {
        var nextCol = col.next().getData('layout-col');
        nextCol.set('size', nextCol.get('size') + size);
    },

    /**
     * Inserts a grid to the current row in order to visualize the possible breakpoints.
     *
     * @method _insertGrid
     * @param {Node} target Node in which the grid will be inserted.
     * @protected
     */
    _insertGrid: function(row) {
        var breakpoints = this.get('breakpoints'),
            gridLine,
            gridWidth = row.get(OFFSET_WIDTH) / MAX_SIZE;

        A.each(breakpoints, function(point) {
            gridLine = A.Node.create('<div>').addClass(CSS_LAYOUT_GRID);
            gridLine.setStyle('left', gridWidth * point);
            row.append(gridLine);
        });
    },

    /**
     * Calculates if this col is inside a breakpoint.
     *
     * @method _isBreakpoint
     * @param {Node} col Node in which the breakpoint will be calculated.
     * @param {Node} size Size of the current col.
     * @return {Boolean}
     * @protected
     */
    _isBreakpoint: function(col, size) {
        var breakpoints = this.get('breakpoints'),
            totalSize = 0;

        while (col.previous()) {
            col = col.previous();

            totalSize += col.getData('layout-col').get('size');
        }

        totalSize += size;

        return A.Array.indexOf(breakpoints, totalSize) >= 0;
    },

    /**
     * Calculates the space on the left side of a col.
     *
     * @method _leftAvailableSpace
     * @param {Node} col
     * @return {Number}
     * @protected
     */
    _leftAvailableSpace: function(col) {
        var width = col.get(OFFSET_WIDTH);

        while (col.previous()) {
            col = col.previous();
            width += col.get(OFFSET_WIDTH);
        }

        return width;
    },

    /**
     * Fires after click on add col button.
     *
     * @method _onMouseClickAddColEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickAddColEvent: function(event) {
        var row = event.target.ancestor(SELECTOR_ROW).getData('layout-row');
        row.addCol(0);
    },

    /**
     * Fires after click on delete col button.
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
     * Fired on `mousedown`. Inserts the drag grid and listens to the next
     * `mouseup` event.
     *
     * @method _onMouseDownEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseDownEvent: function(event) {
        var body = A.one('body'),
            clientX = event.clientX,
            col = event.target.ancestor(),
            leftAvailableSpace = this._leftAvailableSpace(col),
            rightAvailableSpace = this._rightAvailableSpace(col);

        this.isDragHandleLocked = true;

        this._insertGrid(col.ancestor(SELECTOR_ROW));

        body.addClass(CSS_LAYOUT_RESIZING);

        body.once('mouseup', this._onMouseUpEvent, this, clientX, col);

        this._mouseMoveEvent = body.on('mousemove', this._onMouseMove, this, clientX, leftAvailableSpace, rightAvailableSpace);
    },

    /**
     * Adds a handle node to target.
     *
     * @method _onMouseEnterEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseEnterEvent: function(event) {
        var col = event.target,
            numberOfCols,
            row = col.ancestor(SELECTOR_ROW).getData('layout-row');

        numberOfCols = row.get('cols').length;

        col.append(this.removeColButton);

        if (numberOfCols < MAX_NUMBER_OF_COLUMNS) {
            col.append(this.addColButton);

            if (!this.isDragHandleLocked && col.next()) {
                col.append(this.dragHandle);
            }
        }
    },

    /**
     * Removes handle node.
     *
     * @method _onMouseLeaveEvent
     * @protected
     */
    _onMouseLeaveEvent: function() {
        if (!this.isDragHandleLocked) {
            this.dragHandle.remove();
        }

        this.removeColButton.remove();
        this.addColButton.remove();
    },

    /**
     * Moves drag handle.
     *
     * @method _onMouseMove
     * @param {EventFacade} event
     * @param {Number} clientX
     * @param {Number} leftAvailableSpace
     * @param {Number} rightAvailableSpace
     * @protected
     */
    _onMouseMove: function(event, clientX, leftAvailableSpace, rightAvailableSpace) {
        var absDifference,
            difference = clientX - event.clientX,
            dragHandleWidth = this.dragHandle.get('offsetWidth'),
            rightPosition;

        absDifference = Math.abs(difference);

        if (difference < 0) {
            if (absDifference <= rightAvailableSpace) {
                rightPosition = difference + 'px';
            }
            else {
                rightPosition = -rightAvailableSpace + 'px';
            }
        }
        else {
            if (difference <= leftAvailableSpace) {
                rightPosition = (difference - dragHandleWidth) + 'px';
            }
            else {
                rightPosition = (leftAvailableSpace - dragHandleWidth) + 'px';
            }
        }

        this.dragHandle.setStyle('right', rightPosition);
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
        var container = this.get('container'),
            dragDifference = mouseDownClientX - event.clientX,
            layout = this.get('layout');

        this.dragHandle.setStyle('right', 0);

        this.isDragHandleLocked = false;

        this._mouseMoveEvent.detach();

        this._removeGrid(event.target);

        if (dragDifference > 0) {
            this._decreaseCol(col, dragDifference);
        }
        else if (dragDifference < 0 && this._hasSpaceToMove(col)) {
            this._increaseCol(col, dragDifference);
        }

        layout.draw(container);
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

    /**
     * Calculates the space on the right side of a col.
     *
     * @method _rightAvailableSpace
     * @param {Node} col
     * @return {Number}
     * @protected
     */
    _rightAvailableSpace: function(col) {
        var width = 0;

        while (col.next()) {
            col = col.next();
            width += col.get(OFFSET_WIDTH);
        }

        return width;
    }
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
         * Array of breakpoints.
         *
         * @attribute breakpoints
         * @type {Array}
         */
        breakpoints: {
            validator: A.Lang.isArray,
            value: [3, 4, 6, 8, 9]
        },

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
