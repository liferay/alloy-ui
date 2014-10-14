/**
 * The Layout Builder Resize Col Component
 *
 * @module aui-layout-builder-resize-col
 */

var CSS_RESIZE_COL_BREAKPOINT = A.getClassName('layout', 'builder', 'resize', 'col', 'breakpoint'),
    CSS_RESIZE_COL_BREAKPOINT_LINE = A.getClassName('layout', 'builder', 'resize', 'col', 'breakpoint', 'line'),
    CSS_RESIZE_COL_BREAKPOINT_OVER = A.getClassName('layout', 'builder', 'resize', 'col', 'breakpoint', 'over'),
    CSS_RESIZE_COL_ENABLED = A.getClassName('layout', 'builder', 'resize', 'col', 'enabled'),
    CSS_RESIZE_COL_DRAGGABLE = A.getClassName('layout', 'builder', 'resize', 'col', 'draggable'),
    CSS_RESIZE_COL_DRAGGABLE_BORDER = A.getClassName('layout', 'builder', 'resize', 'col', 'draggable', 'border'),
    CSS_RESIZE_COL_DRAGGABLE_HANDLE = A.getClassName('layout', 'builder', 'resize', 'col', 'draggable', 'handle'),
    MAX_SIZE = 12,
    OFFSET_WIDTH = 'offsetWidth',
    SELECTOR_ROW = '.row';

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
        '<span class="glyphicon glyphicon-resize-horizontal"></span></div></div>',

    /**
     * Construction logic executed during `A.LayoutBuilderResizeCol` instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._createDelegateDrag();

        this._eventHandles.push(
            this.after('enableResizeColsChange', this._afterEnableResizeColsChange)
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

        if (this._lastDropEnter) {
            this._handleBreakpointDrop(dragNode, this._lastDropEnter);
            this._lastDropEnter = null;
        }
        else {
            dragNode.show();
        }

        this._hideBreakpoints(row);
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
        var instance = this,
            dropNodes,
            dragNode = event.target.get('node'),
            row = dragNode.ancestor(SELECTOR_ROW);

        if (!event.target.validClick(event.ev)) {
            return;
        }

        // We need to show the drop targets before drag:start, or they won't work.
        dropNodes = row.all('.' + CSS_RESIZE_COL_BREAKPOINT);
        dropNodes.each(function(dropNode) {
            if (instance._canDrop(dragNode, dropNode.getData('layout-position'))) {
                dropNode.setStyle('display', 'block');
            }
        });
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
            rowNode = dragNode.ancestor(SELECTOR_ROW);

        if (rowNode) {
            this._hideBreakpoints(rowNode);
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
        event.target.get('node').hide();
    },

    /**
     * Fired after the `breakpoints` attribute changes.
     *
     * @method _afterBreakpointsChange
     * @protected
     */
    _afterBreakpointsChange: function() {
        this._insertGrid();
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
            this.after('breakpointsChange', this._afterBreakpointsChange),
            this.after('layoutChange', this._afterResizeColLayoutChange),
            this.after('layout:rowsChange', this._afterResizeColLayoutRowsChange),
            this.after('layout-row:colsChange', this._afterResizeColLayoutColsChange),
            this._delegateDrag.after('drag:end', A.bind(this._afterDragEnd, this)),
            this._delegateDrag.after('drag:enter', A.bind(this._afterDragEnter, this)),
            this._delegateDrag.after('drag:mouseDown', A.bind(this._afterDragMouseDown, this)),
            this._delegateDrag.after('drag:mouseup', A.bind(this._afterDragMouseup, this)),
            this._delegateDrag.after('drag:start', A.bind(this._afterDragStart, this))
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
        var breakpoints = this.get('breakpoints'),
            index;

        for (index = 0; index < breakpoints.length; index++) {
            if (breakpoints[index] !== dragNode.getData('layout-position') &&
                this._canDrop(dragNode, breakpoints[index])) {
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
     * @protected
     */
    _canDrop: function(dragNode, position) {
        var col1 = dragNode.getData('layout-col1'),
            col2 = dragNode.getData('layout-col2'),
            difference = position - dragNode.getData('layout-position');

        if (col1.get('size') + difference < col1.get('minSize')) {
            return false;
        }
        if (col2.get('size') - difference < col2.get('minSize')) {
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
            difference = dropNode.getData('layout-position') - dragNode.getData('layout-position');

        col1.set('size', col1.get('size') + difference);
        col2.set('size', col2.get('size') - difference);

        this._syncDragHandles();
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
     * Inserts a grid to the current row in order to visualize the possible breakpoints.
     *
     * @method _insertGrid
     * @protected
     */
    _insertGrid: function() {
        var instance = this,
            breakpoints = this.get('breakpoints'),
            gridLine,
            gridWidth;

        this._removeGrid();
        A.each(this.get('layout').get('rows'), function(row) {
            gridWidth = row.get('node').get(OFFSET_WIDTH) / MAX_SIZE;

            A.each(breakpoints, function(point) {
                gridLine = A.Node.create(instance.TPL_RESIZE_COL_BREAKPOINT);
                gridLine.setStyle('left', gridWidth * point);
                gridLine.setData('layout-position', point);
                gridLine.plug(A.Plugin.Drop, {
                    padding: '30px'
                });
                row.get('node').append(gridLine);
            });
        });
    },

    /**
     * Removes all the drag handles from the layout.
     *
     * @method _removeDragHandles
     * @protected
     */
    _removeDragHandles: function() {
        this._layoutContainer.all('.' + CSS_RESIZE_COL_DRAGGABLE).remove();
    },

    /**
     * Removes the grid from the target.
     *
     * @method _removeGrid
     * @protected
     */
    _removeGrid: function() {
        this.get('container').all('.' + CSS_RESIZE_COL_BREAKPOINT).remove();
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
        var instance = this,
            cols = row.get('cols'),
            currentPos = 0,
            draggable,
            index,
            rowNode = row.get('node');

        for (index = 0; index < cols.length - 1; index++) {
            currentPos += cols[index].get('size');

            draggable = A.Node.create(instance.TPL_RESIZE_COL_DRAGGABLE);
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
        if (enableResizeCols) {
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
