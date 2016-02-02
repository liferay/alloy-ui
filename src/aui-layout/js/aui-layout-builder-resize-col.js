/**
 * The Layout Builder Resize Col Component
 *
 * @module aui-layout-builder-resize-col
 */
var ADD_COLUMN_ACTION = 'addColumn',
    BREAKPOINTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    CSS_RESIZE_COL_BREAKPOINT = A.getClassName('layout', 'builder', 'resize', 'col', 'breakpoint'),
    CSS_RESIZE_COL_BREAKPOINT_LINE = A.getClassName('layout', 'builder', 'resize', 'col', 'breakpoint', 'line'),
    CSS_RESIZE_COL_BREAKPOINT_OVER = A.getClassName('layout', 'builder', 'resize', 'col', 'breakpoint', 'over'),
    CSS_RESIZE_COL_DRAGGABLE = A.getClassName('layout', 'builder', 'resize', 'col', 'draggable'),
    CSS_RESIZE_COL_DRAGGABLE_BORDER = A.getClassName('layout', 'builder', 'resize', 'col', 'draggable', 'border'),
    CSS_RESIZE_COL_DRAGGABLE_DRAGGING = A.getClassName('layout', 'builder', 'resize', 'col', 'draggable', 'dragging'),
    CSS_RESIZE_COL_DRAGGABLE_HANDLE = A.getClassName('layout', 'builder', 'resize', 'col', 'draggable', 'handle'),
    CSS_RESIZE_COL_DRAGGABLE_VISIBLE= A.getClassName('layout', 'builder', 'resize', 'col', 'draggable','visible'),
    CSS_RESIZE_COL_DRAGGING = A.getClassName('layout', 'builder', 'resize', 'col', 'dragging'),
    CSS_RESIZE_COL_ENABLED = A.getClassName('layout', 'builder', 'resize', 'col', 'enabled'),
    MAX_SIZE = 12,
    SELECTOR_COL = '.col',
    SELECTOR_ROW = '.layout-row';

/**
 * LayoutBuilder extension, which can be used to add the funcionality of resizing
 * columns of the builder's layout.
 *
 * @class A.LayoutBuilderResizeCol
 * @param {Object} config Object literal specifying layout builder configuration
 *     properties.
 * @constructor
 */
A.LayoutBuilderResizeCol = function() {};

A.LayoutBuilderResizeCol.prototype = {
    TPL_RESIZE_COL_BREAKPOINT: '<div class="' + CSS_RESIZE_COL_BREAKPOINT + '">' +
        '<div class="' + CSS_RESIZE_COL_BREAKPOINT_LINE + '"></div></div>',
    TPL_RESIZE_COL_DRAGGABLE: '<div class="' + CSS_RESIZE_COL_DRAGGABLE + '">' +
        '<div class="' + CSS_RESIZE_COL_DRAGGABLE_BORDER + '"></div>' +
        '<div class="' + CSS_RESIZE_COL_DRAGGABLE_HANDLE + '">' +
        '<span class="glyphicon glyphicon-chevron-left"></span>' +
        '<span class="glyphicon glyphicon-chevron-right"></span></div></div>',

    /**
     * Keeps a reference for dragNode for keyboard purposes only.
     *
     * @property _dragNode
     * @type {Node}
     * @protected
     */
    _dragNode: null,

    /**
     * Grid line nodes.
     *
     * @property _gridlineNodes
     * @type {Array}
     * @protected
     */
    _gridlineNodes: [],

    /**
     * Construction logic executed during `A.LayoutBuilderResizeCol` instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._createDelegateDrag();

        this._gridlineNodes = [];

        this._eventHandles.push(
            this.after('enableResizeColsChange', this._afterEnableResizeColsChange),
            this.after('layout:isColumnModeChange', A.bind(this._afterResizeColIsColumnModeChange, this))
        );

        this._uiSetEnableResizeCols(this.get('enableResizeCols'));
    },

    /**
     * Destructor implementation for the `A.LayoutBuilderResizeCol` class.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this._unbindResizeColEvents();

        this._removeGrid();
    },

    /**
     * Fired when the `drag:end` event is triggered.
     *
     * @method _afterDragEnd
     * @protected
     */
    _afterDragEnd: function() {
        var dragNode = this._delegateDrag.get('lastNode'),
            row = dragNode.ancestor(SELECTOR_ROW);

        if (row) {
            if (dragNode.getData('layout-action') && dragNode.getData('layout-action') === 'addColumn') {
                this._insertColumnAfterDropHandles(dragNode);
            }
            else {
                this._resize(dragNode);
                this.get('layout').normalizeColsHeight(new A.NodeList(row));
            }

            row.removeClass(CSS_RESIZE_COL_DRAGGING);

            this._hideBreakpoints(row);
        }

        this._syncDragHandles();

        this.dragging = false;

        dragNode.removeClass(CSS_RESIZE_COL_DRAGGABLE_DRAGGING);

        dragNode.show();
    },

    /**
     * Fired when the `drag:enter` event is triggered.
     *
     * @method _afterDragEnter
     * @param {EventFacade} event
     * @protected
     */
    _afterDragEnter: function(event) {
        var dropNode = event.drop.get('node');

        this._layoutContainer.all('.' + CSS_RESIZE_COL_BREAKPOINT_OVER)
            .removeClass(CSS_RESIZE_COL_BREAKPOINT_OVER);
        dropNode.addClass(CSS_RESIZE_COL_BREAKPOINT_OVER);

        this._lastDropEnter = dropNode;
    },

    /**
     * Fired when the `drag:mouseDown` event is triggered.
     *
     * @method _afterDragMouseDown
     * @param {EventFacade} event
     * @protected
     */
    _afterDragMouseDown: function(event) {
        var dragNode,
            row;

        if (event.ev.button > 1 || !event.target.validClick(event.ev)) {
            return;
        }

        dragNode = event.target.get('node');
        row = dragNode.ancestor(SELECTOR_ROW);

        dragNode.addClass(CSS_RESIZE_COL_DRAGGABLE_DRAGGING);

        this._showBreakpoints(row, dragNode);
    },

    /**
     * Fired when the `drag:mouseup` event is triggered.
     *
     * @method _afterDragMouseup
     * @param {EventFacade} event
     * @protected
     */
    _afterDragMouseup: function(event) {
        var dragNode = event.target.get('node'),
            row = dragNode.ancestor(SELECTOR_ROW);

        if (row) {
            this._hideBreakpoints(row);
        }
    },

    /**
     * Fired when the `drag:start` event is triggered.
     *
     * @method _afterDragStart
     * @param {EventFacade} event
     * @protected
     */
    _afterDragStart: function(event) {
        var dragNode = event.target.get('node');

        this.dragging = true;
        
        dragNode.hide();
        dragNode.ancestor(SELECTOR_ROW).addClass(CSS_RESIZE_COL_DRAGGING);

        this._hideColDraggableBoundaries();
    },

    /**
     * Fired after the `enableResizeCols` attribute changes.
     *
     * @method _afterEnableResizeColsChange
     * @protected
     */
    _afterEnableResizeColsChange: function() {
        this._uiSetEnableResizeCols(this.get('enableResizeCols'));
    },

    /**
     * Fired after the `isColumnMode` changes.
     *
     * @method _afterResizeColIsColumnModeChange
     * @protected
     */
    _afterResizeColIsColumnModeChange: function() {
        this._uiSetEnableResizeCols(this.get('enableResizeCols'));
    },

    /**
     * Fired after the `layout` attribute is set.
     *
     * @method _afterResizeColLayoutChange
     * @protected
     */
    _afterResizeColLayoutChange: function() {
        this._syncDragHandles();
        this._insertGrid();
    },

    /**
     * Fired after the `rows` attribute from the layout is set.
     *
     * @method _afterResizeColLayoutRowsChange
     * @protected
     */
    _afterResizeColLayoutRowsChange: function() {
        this._syncDragHandles();
        this._insertGrid();
    },

    /**
     * Fired after the `cols` attribute from a layout row is set.
     *
     * @method _afterResizeColLayoutColsChange
     * @protected
     */
    _afterResizeColLayoutColsChange: function() {
        this._syncDragHandles();
        this._insertGrid();
    },

    /**
     * Binds the necessary events for the functionality of resizing layout
     * columns.
     *
     * @method _bindResizeColEvents
     * @protected
     */
    _bindResizeColEvents: function() {
        this._resizeColsEventHandles = [
            this.after('layoutChange', this._afterResizeColLayoutChange),
            this.after('layout:rowsChange', this._afterResizeColLayoutRowsChange),
            this.after('layout-row:colsChange', this._afterResizeColLayoutColsChange),
            this._delegateDrag.after('drag:end', A.bind(this._afterDragEnd, this)),
            this._delegateDrag.after('drag:enter', A.bind(this._afterDragEnter, this)),
            this._delegateDrag.after('drag:mouseDown', A.bind(this._afterDragMouseDown, this)),
            this._delegateDrag.after('drag:mouseup', A.bind(this._afterDragMouseup, this)),
            this._delegateDrag.after('drag:start', A.bind(this._afterDragStart, this)),
            this._layoutContainer.delegate('key', A.bind(this._onKeyPressResizeColDragHandle, this), 
                'press:13', '.' + CSS_RESIZE_COL_DRAGGABLE),
            this._layoutContainer.delegate('key', A.bind(this._onKeyPressResizeColBreakpoint, this), 
                'press:13', '.' + CSS_RESIZE_COL_BREAKPOINT_LINE),
            this._layoutContainer.delegate('mouseenter', A.bind(this._onMouseEnterCol, this), SELECTOR_COL),
            this._layoutContainer.delegate('mouseenter', A.bind(this._onMouseEnterDraggable, this), '.' + CSS_RESIZE_COL_DRAGGABLE),
            this._layoutContainer.delegate('mouseleave', A.bind(this._onMouseLeaveCol, this), SELECTOR_ROW)
        ];
    },

    /**
     * Checks if a drag node can be dragged to at least one valid position.
     *
     * @method _canDrag
     * @param {Node} dragNode
     * @protected
     */
    _canDrag: function(dragNode) {
        var index;

        for (index = 0; index < BREAKPOINTS.length; index++) {
            if (BREAKPOINTS[index] !== dragNode.getData('layout-position') &&
                this._canDrop(dragNode, BREAKPOINTS[index])) {
                return true;
            }
        }

        return false;
    },

    /**
     * Checks if a drag node can be droppped in the given position.
     *
     * @method _canDrop
     * @param {Node} dragNode
     * @param {Number} position
     * @return {Boolean}
     * @protected
     */
    _canDrop: function(dragNode, position) {
        var col1 = dragNode.getData('layout-col1'),
            col2 = dragNode.getData('layout-col2'),
            col1MinSize,
            col2MinSize,
            diff1,
            diff2,
            difference = position - dragNode.getData('layout-position');

        if (dragNode.getData('layout-action') === ADD_COLUMN_ACTION) {
            if ((col2 && difference < col2.get('size')) ||
                (col1 && MAX_SIZE - col1.get('size') < position)) {
                return true;
            }

            return false;
        }

        diff1 = col1.get('size') + difference,
        diff2 = col2.get('size') - difference,
        col1MinSize = col1.get('minSize'),
        col2MinSize = col2.get('minSize');

        if (diff1 !== 0 && diff2 !== 0 && (diff1 < col1MinSize || diff2 < col2MinSize)) {
            return false;
        }

        return true;
    },

    /**
     * Creates the `A.DD.Delegate` instance responsible for the dragging
     * functionality.
     *
     * @method _createDelegateDrag
     * @protected
     */
    _createDelegateDrag: function() {
        this._delegateDrag = new A.DD.Delegate({
            container: this._layoutContainer,
            handles: ['.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE],
            nodes: '.' + CSS_RESIZE_COL_DRAGGABLE
        });

        this._delegateDrag.dd.plug(A.Plugin.DDConstrained, {
            constrain: this._layoutContainer,
            stickX: true
        });

        this._delegateDrag.dd.plug(A.Plugin.DDProxy, {
            cloneNode: true,
            moveOnEnd: false
        });
    },

    /**
     * Handles the action of dropping a drag handler on top of a breakpoint.
     *
     * @method _handleBreakpointDrop
     * @param {Node} dragNode
     * @param {Node} dropNode
     * @protected
     */
    _handleBreakpointDrop: function(dragNode, dropNode) {
        var col1 = dragNode.getData('layout-col1'),
            col2 = dragNode.getData('layout-col2'),
            difference = dropNode.getData('layout-position') - dragNode.getData('layout-position'),
            col1NewSize = col1.get('size') + difference,
            col2NewSize = col2.get('size') - difference,
            row;

        if (!col1.get('removable') && col1NewSize === 0) {
            col1.fire('removalCanceled');
            return;
        }

        if (!col2.get('removable') && col2NewSize === 0) {
            col2.fire('removalCanceled');
            return;
        }

        col1.set('size', col1NewSize);
        col2.set('size', col2NewSize);

        if (col1NewSize === 0) {
            row = col1.get('node').ancestor().getData('layout-row');
            row.removeCol(col1.get('node').getData('layout-col'));
        }

        if (col2NewSize === 0) {
            row = col2.get('node').ancestor().getData('layout-row');
            row.removeCol(col2.get('node').getData('layout-col'));
        }
    },

    /**
     * Hides all the breakpoints in the given row.
     *
     * @method _hideBreakpoints
     * @param  {Node} rowNode
     * @protected
     */
    _hideBreakpoints: function(rowNode) {
        var dropNodes = rowNode.all('.' + CSS_RESIZE_COL_BREAKPOINT);

        dropNodes.each(function(dropNode) {
            dropNode.setStyle('display', 'none');
        });
    },

    /**
     * Hides all the draggable bars.
     *
     * @method _hideColDraggableBoundaries
     * @protected
    */
    _hideColDraggableBoundaries: function() {
        this._layoutContainer.all('.' + CSS_RESIZE_COL_DRAGGABLE).removeClass(CSS_RESIZE_COL_DRAGGABLE_VISIBLE);
    },

    /**
     * Add new column for the given layout row after drop handler.
     *
     * @method _insertColumnAfterDropHandles
     * @param {Node} dragNode
     * @protected
     */
     _insertColumnAfterDropHandles: function(dragNode) {
        var colLayoutPosition = this._lastDropEnter.getData('layout-position'),
            dragPosition = dragNode.getData('layout-position'),
            newCol = new A.LayoutCol(),
            newColPosition,
            newColumnSize = Math.abs(dragPosition - colLayoutPosition),
            row = dragNode.ancestor(SELECTOR_ROW).getData('layout-row');

        if (dragPosition === 0) {
            newColPosition = 0;
        }
        else {
            newColPosition = row.get('cols').length;
        }

        if (colLayoutPosition > 0 && colLayoutPosition < 12) {
            newCol.set('size', newColumnSize);
            row.addCol(newColPosition, newCol);
        }
    },

    /**
     * Inserts a grid to the current row in order to visualize the possible breakpoints.
     *
     * @method _insertGrid
     * @protected
     */
    _insertGrid: function() {
        var instance = this,
            gridLine,
            node,
            rows = this.get('layout').get('rows');

        this._removeGrid();

        A.each(rows, function(row) {
            node = row.get('node').one(SELECTOR_ROW);

            A.each(BREAKPOINTS, function(point) {
                gridLine = A.Node.create(instance.TPL_RESIZE_COL_BREAKPOINT);
                gridLine.setStyle('left', ((point * 100) / MAX_SIZE) + '%');
                gridLine.setData('layout-position', point);
                gridLine.plug(A.Plugin.Drop, {
                    padding: '30px'
                });
                node.append(gridLine);

                instance._gridlineNodes.push(gridLine);
            });
        });
    },

    /**
     * Fired when the cursor is over a column.
     *
     * @method _onMouseEnterCol
     * @param {EventFacade} event
     * @protected
     */
    _onMouseEnterCol: function(event) {
        var colNode = event.currentTarget;

        this._hideColDraggableBoundaries(colNode);

        this._showColDraggableBoundaries(colNode);
    },

    /**
     * Fired when the cursor is over a Draggable bar.
     *
     * @method _onMouseEnterDraggable
     * @param {EventFacade} event
     * @protected
     */
    _onMouseEnterDraggable: function(event) {
        var col1 = event.currentTarget.getData('layout-col1'),
            col2 = event.currentTarget.getData('layout-col2');

        if (col1) {
            this._showColDraggableBoundaries(col1.get('node'));
        }

        if (col2) {
            this._showColDraggableBoundaries(col2.get('node'));
        }
    },

    /**
     * Fired when the cursor is over a Draggable bar.
     *
     * @method _onMouseEnterDraggable
     * @param {EventFacade} event
     * @protected
     */
    _onMouseLeaveCol: function(e) {
        var colNode = e.currentTarget;

        this._hideColDraggableBoundaries(colNode);
    },

    /**
     * Fired when the user starts the action to resize a col.
     *
     * @method _onKeyPressResizeColBreakpoint
     * @param {EventFacade} event
     * @protected
     */
    _onKeyPressResizeColBreakpoint: function(event) {
        var row;

        this._lastDropEnter = event.target.ancestor('.' + CSS_RESIZE_COL_BREAKPOINT);

        row = this._lastDropEnter.ancestor(SELECTOR_ROW);

        this._resize(this._dragNode);

        if (row) {
            this._hideBreakpoints(row);
        }

        this._syncDragHandles();
    },

    /**
     * Fired when the enter button is pressed on drag handle.
     *
     * @method _onKeyPressResizeColDragHandle
     * @param {EventFacade} event
     * @protected
     */
    _onKeyPressResizeColDragHandle: function(event) {
        var breakpoints,
            dragNode = event.target.ancestor('.' + CSS_RESIZE_COL_DRAGGABLE),
            hasVisibleBreakpoint,
            row = event.target.ancestor(SELECTOR_ROW);

        this._dragNode = dragNode;

        breakpoints = row.all('.' + CSS_RESIZE_COL_BREAKPOINT);

        hasVisibleBreakpoint = breakpoints.filter(function(breakpoint) {
            return breakpoint.getStyle('display') !== 'none';
        }).size();

        if (hasVisibleBreakpoint) {
            this._hideBreakpoints(row);
        }
        else {
            this._showBreakpoints(row, dragNode);
        }
    },

    /**
     * Removes all the drag handles from the layout.
     *
     * @method _removeDragHandles
     * @protected
     */
    _removeDragHandles: function() {
        this._layoutContainer.all('.' + CSS_RESIZE_COL_DRAGGABLE + ':not(.layout-builder-add-col-draggable)').remove();
    },

    /**
     * Removes the grid from the target.
     *
     * @method _removeGrid
     * @protected
     */
    _removeGrid: function() {
        if (this._gridlineNodes.length) {
            A.Array.each(this._gridlineNodes, function(node) {
                node.unplug(A.Plugin.Drop);
                node.remove();
            });

            this._gridlineNodes = [];
        }
    },

    /**
     * Resizes cols after a resize event.
     *
     * @method _resize
     * @param {Node} dragNode
     * @protected
     */
    _resize: function(dragNode) {
        if (this._lastDropEnter) {
            this._handleBreakpointDrop(dragNode, this._lastDropEnter);
            this._lastDropEnter = null;
        }
        else {
            dragNode.show();
        }
    },

    /**
     * Shows all breakpoints in the given row.
     * We need to show the drop targets before `drag:start` event, or they won't work.
     *
     * @method _showBreakpoints
     * @param {Node} row
     * @param {Node} dragNode
     * @protected
     */
    _showBreakpoints: function(row, dragNode) {
        var dropNodes = row.all('.' + CSS_RESIZE_COL_BREAKPOINT),
            instance = this;

        dropNodes.each(function(dropNode) {
            if (instance._canDrop(dragNode, dropNode.getData('layout-position'))) {
                dropNode.setStyle('display', 'block');
            }
        });
    },

    /**
     * Shows draggable bars of a column.
     *
     * @method _showColDraggableBoundaries
     * @param {Node} colNode
     * @protected
     */
    _showColDraggableBoundaries: function(colNode) {
        var col1,
            col2,
            draggablesList = colNode.ancestor().all('.' + CSS_RESIZE_COL_DRAGGABLE);

        for (var i = draggablesList._nodes.length; i--;) {
            col1 = draggablesList.item(i).getData('layout-col1');
            col2 = draggablesList.item(i).getData('layout-col2');

            if ((col2 && col2.get('node') === colNode) || (col1 && col1.get('node') === colNode)) {
                draggablesList.item(i).addClass(CSS_RESIZE_COL_DRAGGABLE_VISIBLE);
            }
        }
    },

    /**
     * Updates the drag handles for all the layout rows.
     *
     * @method _syncDragHandles
     * @protected
     */
    _syncDragHandles: function() {
        var instance = this;

        this._removeDragHandles();
        A.Array.each(this.get('layout').get('rows'), function(row) {
            instance._syncRowDragHandles(row);
        });
    },

    /**
     * Updates the drag handles for the given layout row.
     *
     * @method _syncRowDragHandles
     * @param {A.LayoutRow} row
     * @protected
     */
    _syncRowDragHandles: function(row) {
        var cols = row.get('cols'),
            numberOfCols = cols.length,
            currentPos = 0,
            draggable,
            index,
            rowNode = row.get('node').one(SELECTOR_ROW);

        for (index = 0; index < numberOfCols - 1; index++) {
            currentPos += cols[index].get('size');

            draggable = A.Node.create(this.TPL_RESIZE_COL_DRAGGABLE);
            draggable.setStyle('left', ((currentPos * 100) / MAX_SIZE) + '%');
            draggable.setData('layout-position', currentPos);
            draggable.setData('layout-col1', cols[index]);
            draggable.setData('layout-col2', cols[index + 1]);

            if (!this._canDrag(draggable)) {
                draggable.one('.' + CSS_RESIZE_COL_DRAGGABLE_HANDLE).hide();
            }

            rowNode.append(draggable);
        }
    },

    /**
     * Updates the UI according to the value of the `enableResizeCols` attribute.
     *
     * @method _uiSetEnableResizeCols
     * @param {Boolean} enableResizeCols
     * @protected
     */
    _uiSetEnableResizeCols: function(enableResizeCols) {
        if (enableResizeCols && this.get('layout').get('isColumnMode')) {
            this._syncDragHandles();
            this._insertGrid();
            this._bindResizeColEvents();
        }
        else {
            this._removeDragHandles();
            this._removeGrid();
            this._unbindResizeColEvents();
        }

        this.get('container').toggleClass(CSS_RESIZE_COL_ENABLED, enableResizeCols);
    },

    /**
     * Unbinds the events related to the functionality of resizing layout
     * columns.
     *
     * @method _unbindResizeColEvents
     * @protected
     */
    _unbindResizeColEvents: function() {
        if (this._resizeColsEventHandles) {
            (new A.EventHandle(this._resizeColsEventHandles)).detach();
        }
    }
};

/**
 * Static property used to define the default attribute
 * configuration for `A.LayoutBuilderResizeCol`.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
A.LayoutBuilderResizeCol.ATTRS = {
    /**
     * Flag indicating if the feature of resizing layout columns is enabled or
     * not.
     *
     * @attribute enableResizeCols
     * @default true
     * @type {Boolean}
     */
    enableResizeCols: {
        validator: A.Lang.isBoolean,
        value: true
    }
};
