/**
 * The Layout Move Component
 *
 * @module aui-layout-move
 */

var CSS_MOVE_CANCEL = A.getClassName('layout', 'builder', 'move', 'cancel'),
    CSS_MOVE_COL_TARGET = A.getClassName('layout', 'builder', 'move', 'col', 'target'),
    CSS_MOVE_CUT_BUTTON = A.getClassName('layout', 'builder', 'move', 'cut', 'button'),
    CSS_MOVE_CUT_ROW_BUTTON = A.getClassName('layout', 'builder', 'move', 'cut', 'row', 'button'),
    CSS_MOVE_CUT_COL_BUTTON = A.getClassName('layout', 'builder', 'move', 'cut', 'col', 'button'),
    CSS_MOVE_ROW_TARGET = A.getClassName('layout', 'builder', 'move', 'row', 'target'),
    CSS_MOVE_TARGET = A.getClassName('layout', 'builder', 'move', 'target'),
    CSS_ROW_CONTAINER_ROW = A.getClassName('layout', 'row', 'container', 'row'),

    SELECTOR_COL = '.col',
    SELECTOR_ROW = '.layout-row',

    TPL_MOVE_CUT = '<div class="' + CSS_MOVE_CUT_BUTTON + '" tabindex="2"></div>',
    TPL_MOVE_TARGET = '<div class="' + CSS_MOVE_TARGET + '" tabindex="3">Move</div>';

/**
 * A base class for Layout Move.
 *
 * @class A.LayoutBuilderMove
 * @param {Object} config Object literal specifying layout configuration
 *     properties.
 * @constructor
 */
function LayoutBuilderMove() {}

LayoutBuilderMove.prototype = {

    /**
     * Col that will be moved.
     *
     * @property _colToBeMoved
     * @type {Node}
     * @protected
     */
    _colToBeMoved: null,

    /**
     * Row that will be moved.
     *
     * @property _rowToBeMoved
     * @type {Node}
     * @protected
     */
    _rowToBeMoved: null,

    /**
     * Construction logic executed during instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._eventHandles.push(
            this.after('enableMoveColsChange', A.bind(this._afterEnableMoveColsChange, this)),
            this.after('enableMoveRowsChange', A.bind(this._afterEnableMoveRowsChange, this)),
            this.after('layout-row:colsChange', A.bind(this._afterMoveColsChange, this)),
            this.after('layout-row:movableChange', A.bind(this._afterMoveMovableChange, this)),
            this.after('layout:rowsChange', A.bind(this._afterMoveRowsChange, this)),
            this.after('layout:isColumnModeChange', A.bind(this._afterMoveIsColumnModeChange, this)),
            this.after('layoutChange', A.bind(this._afterMoveLayoutChange, this))
        );

        this._uiSetEnableMoveRows(this.get('enableMoveRows'));
        this._uiSetEnableMoveCols(this.get('enableMoveCols'));
    },

    /**
     * Destructor implementation for the `A.LayoutBuilderMove` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this._unbindMoveColEvents();
        this._unbindMoveRowEvents();
    },

    /**
     * Cancels the ongoing move operation.
     *
     * @method cancelMove
     */
    cancelMove: function() {
        this._resetMoveUI();
    },

    /**
     * Default value for `addColMoveButton` attribute.
     *
     * @method _addColMoveButton
     * @param {Node} colNode
     * @param {Node} rowNode
     * @protected
     */
    _addColMoveButton: function(colNode, rowNode) {
        var cutButton = A.Node.create(TPL_MOVE_CUT);

        cutButton.setData('node-row', rowNode);
        cutButton.setData('node-col', colNode);
        cutButton.addClass(CSS_MOVE_CUT_COL_BUTTON);
        colNode.append(cutButton);
    },

    /**
     * Default value for `addColMoveTarget` attribute.
     *
     * @method _addColMoveTarget
     * @param {A.LayoutCol} col
     * @param {Number} index
     * @protected
     */
    _addColMoveTarget: function(col, index) {
        var target = A.Node.create(TPL_MOVE_TARGET);

        target.setData('col-index', index);
        target.addClass(CSS_MOVE_COL_TARGET);
        col.get('node').append(target);
    },

    /**
     * Fired after the `enableMoveCols` attribute changes.
     *
     * @method _afterEnableMoveColsChange
     * @protected
     */
    _afterEnableMoveColsChange: function() {
        this._resetMoveUI();
    },

    /**
     * Fired after the `enableMoveRows` attribute changes.
     *
     * @method _afterEnableMoveRowsChange
     * @protected
     */
    _afterEnableMoveRowsChange: function() {
        this._resetMoveUI();
    },

    /**
    * Fired after `layout-row:movable` attribute changes.
    *
    * @method _afterMoveMovableChange
    * @param {EventFacade} event
    * @protected
    */
    _afterMoveMovableChange: function(event) {
        var row = event.target.get('node');

        if (event.newVal) {
            this._insertCutButtonOnRow(row.one(SELECTOR_ROW));
        }
        else {
            this._removeCutButtonFromRow(row);
        }
    },

    /**
     * Fired after `cols` attribute changes.
     *
     * @method _afterMoveColsChange
     * @protected
     */
    _afterMoveColsChange: function() {
        this._resetMoveUI();
    },

    /**
    * Fired after `layout:isColumnMode` attribute changes.
    *
    * @method _afterMoveIsColumnModeChange
    * @param {EventFacade} event
    * @protected
    */
    _afterMoveIsColumnModeChange: function(event) {
        var instance = this,
            rows = this._layoutContainer.all(SELECTOR_ROW);

        if (event.newVal) {
            rows.each(function(row) {
                if (instance._hasAnythingMovable(row)) {
                    instance._insertCutButtonOnCols(row);
                }
            });
        }
        else {
            this.get('removeColMoveButtons')();
        }
    },

    /**
     * Fired after `layout` attribute changes.
     *
     * @method _afterMoveLayoutChange
     * @protected
     */
    _afterMoveLayoutChange: function() {
        this._resetMoveUI();
    },

    /**
     * Fired after `rows` attribute changes.
     *
     * @method _afterMoveRowsChange
     * @protected
     */
    _afterMoveRowsChange: function() {
        this._resetMoveUI();
    },

    /**
     * Appends one move button before each row.
     *
     * @method _appendMoveButtonToRows
     * @protected
     */
    _appendMoveButtonToRows: function() {
        var instance = this,
            rows = this._layoutContainer.all(SELECTOR_ROW);

        rows.each(function(row) {
            if (instance._hasAnythingMovable(row)) {
                instance._insertCutButtonOnRow(row);
            }
        });
    },

    /**
     * Appends a move button for each col.
     *
     * @method _appendMoveButtonToCols
     * @protected
     */
    _appendMoveButtonToCols: function() {
        var instance = this,
            rows = this._layoutContainer.all(SELECTOR_ROW);

        rows.each(function(row) {
            if (instance._hasAnythingMovable(row)) {
                instance._insertCutButtonOnCols(row);
            }
        });
    },

    /**
     * Binds the necessary events for the functionality of moving cols on layout.
     *
     * @method _bindMoveColsEvents
     * @protected
     */
    _bindMoveColEvents: function() {
        var colCutButtonSelector = '.' + CSS_MOVE_CUT_BUTTON + '.' + CSS_MOVE_CUT_COL_BUTTON,
            colTargetSelector = '.' + CSS_MOVE_TARGET + '.' + CSS_MOVE_COL_TARGET;

        this._moveColEventHandles = [
            this._layoutContainer.delegate('click', A.bind(this._onMouseClickOnMoveCutButton, this), colCutButtonSelector),
            this._layoutContainer.delegate('key', A.bind(this._onKeyPressOnMoveCutButton, this), 'press:13', colCutButtonSelector),
            this._layoutContainer.delegate('click', A.bind(this._onMouseClickOnMoveTarget, this), colTargetSelector),
            this._layoutContainer.delegate('key', A.bind(this._onKeyPressOnMoveTarget, this), 'press:13', colTargetSelector)
        ];
    },

    /**
     * Binds the necessary events for the functionality of moving rows on layout.
     *
     * @method _bindMoveRowEvents
     * @protected
     */
    _bindMoveRowEvents: function() {
        var rowCutButtonSelector = '.' + CSS_MOVE_CUT_BUTTON + '.' + CSS_MOVE_CUT_ROW_BUTTON,
            rowTargetSelector = '.' + CSS_MOVE_TARGET + '.' + CSS_MOVE_ROW_TARGET;

        this._moveRowEventHandles = [
            this._layoutContainer.delegate('click', A.bind(this._onMouseClickOnMoveCutButton, this), rowCutButtonSelector),
            this._layoutContainer.delegate('key', A.bind(this._onKeyPressOnMoveCutButton, this), 'press:13', rowCutButtonSelector),
            this._layoutContainer.delegate('click', A.bind(this._onMouseClickOnMoveTarget, this), rowTargetSelector),
            this._layoutContainer.delegate('key', A.bind(this._onKeyPressOnMoveTarget, this), 'press:13', rowTargetSelector)
        ];
    },

    /**
     * Default value for `chooseColMoveTarget` attribute.
     *
     * @method _chooseColMoveTarget
     * @param {Node} cutButton
     * @param {A.LayoutCol} col
     * @protected
     */
    _chooseColMoveTarget: function(cutButton, col) {
        var instance = this,
            rows = this.get('layout').get('rows');

        this._colToBeMoved = col;

        A.Array.forEach(rows, function(row) {
            A.Array.forEach(row.get('cols'), function(col, index) {
                if (col !== instance._colToBeMoved) {
                    instance.get('addColMoveTarget')(col, index);
                }
            });
        });
    },

    /**
     * Default value for `clickColMoveTarget` attribute.
     *
     * @method _clickColMoveTarget
     * @param {Node} target
     * @protected
     */
    _clickColMoveTarget: function(target) {
        var row = target.ancestor(SELECTOR_ROW).getData('layout-row');

        this._resetMoveUI();
        row.moveColContent(target.getData('col-index'), this._colToBeMoved);
    },

    /**
     * Starts or cancels movement of rows and cols.
     *
     * @method _clickOnCutButton
     * @param {Node} cutButton
     * @protected
     */
    _clickOnCutButton: function(cutButton) {
        this._rowToBeMoved = cutButton.getData('layout-row');

        this._removeAllCutButton(cutButton);

        if (cutButton.hasClass(CSS_MOVE_CANCEL)) {
            cutButton.toggleClass(CSS_MOVE_CANCEL);
            this.cancelMove();
            return;
        }

        cutButton.toggleClass(CSS_MOVE_CANCEL);

        if (cutButton.hasClass(CSS_MOVE_CUT_ROW_BUTTON)) {
            this._createRowTargetArea();
        }
        else {
            this.get('chooseColMoveTarget')(cutButton, cutButton.getData('node-col').getData('layout-col'));
        }
    },

    /**
     * Create target area to move the row.
     *
     * @method _createRowTargetArea
     * @protected
     */
    _createRowTargetArea: function() {
        this._createRowTargetAreaInOneDirection('before');
        this._createRowTargetAreaInOneDirection('after');
    },

    /**
     * Create target area to move the row to one direction.
     *
     * @method _createRowTargetAreaInOneDirection
     * @param {String} direction Should be either 'before' or 'after'.
     * @protected
     */
    _createRowTargetAreaInOneDirection: function(direction) {
        var containerRow,
            currentIndex = A.Array.indexOf(this.get('layout').get('rows'), this._rowToBeMoved),
            currentRow,
            method = direction === 'before' ? 'previous' : 'next',
            target;

        containerRow = this._rowToBeMoved.get('node')[method]('.' + CSS_ROW_CONTAINER_ROW);
        while (containerRow) {
            currentRow = containerRow.one(SELECTOR_ROW);

            if (direction === 'before') {
                currentIndex -= 1;
            }
            else {
                currentIndex += 1;
            }

            if (currentRow.getData('layout-row').get('movable')) {
                target = A.Node.create(TPL_MOVE_TARGET);
                target.addClass(CSS_MOVE_ROW_TARGET);
                target.setData('row-index', currentIndex);
                containerRow.insert(target, direction);
                containerRow = containerRow[method]('.' + CSS_ROW_CONTAINER_ROW);
            }
            else {
                break;
            }
        }
    },

    /**
     * Checks if the given row either can be moved or has at least one column
     * that can.
     *
     * @method _hasAnythingMovable
     * @param {A.LayoutRow} row
     * @return {Boolean}
     * @protected
     */
    _hasAnythingMovable: function(row) {
        var index,
            layoutCols,
            layoutRow = row.getData('layout-row');

        if (layoutRow.get('movable')) {
            return true;
        }

        layoutCols = layoutRow.get('cols');
        for (index = 0; index < layoutCols.length; index++) {
            if (layoutCols[index].get('movableContent')) {
                return true;
            }
        }

        return false;
    },

    /**
     * Inserts cut buttons on cols.
     *
     * @method _insertCutButtonOnCols
     * @param {Node} row
     * @protected
     */
    _insertCutButtonOnCols: function(row) {
        var instance = this,
            cols,
            layoutCol,
            rows = this._layoutContainer.all(SELECTOR_ROW);

        cols = row.all(SELECTOR_COL);

        if (!this.get('layout').get('isColumnMode')) {
            return;
        }

        if (cols.size() === 1 && rows.size() === 1) {
            return;
        }

        cols.each(function(col) {
            layoutCol = col.getData('layout-col');

            if (layoutCol.get('movableContent')) {
                instance.get('addColMoveButton')(col, row);
            }
        });
    },

    /**
     * Inserts cut button on a row.
     *
     * @method _insertCutButtonOnRow
     * @param {Node} row
     * @protected
     */
    _insertCutButtonOnRow: function(row) {
        var cutButton = A.Node.create(TPL_MOVE_CUT),
            layoutRow = row.getData('layout-row'),
            rows = this._layoutContainer.all(SELECTOR_ROW);

        if (rows.size() === 1) {
            return;
        }

        if (!layoutRow.get('movable')) {
            return;
        }

        cutButton.addClass(CSS_MOVE_CUT_ROW_BUTTON);
        cutButton.setData('node-row', row);
        cutButton.setData('layout-row', layoutRow);

        this._layoutContainer.insertBefore(cutButton, row);
    },

    /**
     * Move col or row to another place.
     *
     * @method _moveToTarget
     * @param {EventFacade} event
     * @protected
     */
    _moveToTarget: function(event) {
        var layout = this.get('layout'),
            target = event.currentTarget;

        if (target.hasClass(CSS_MOVE_COL_TARGET)) {
            this.get('clickColMoveTarget')(target);
        }
        else {
            layout.moveRow(target.getData('row-index'), this._rowToBeMoved);
        }
    },

    /**
     * Fires when key press on cut button.
     *
     * @method _onKeyPressOnMoveCutButton
     * @param {EventFacade} event
     * @protected
     */
    _onKeyPressOnMoveCutButton: function(event) {
        this._clickOnCutButton(event.currentTarget);
    },

    /**
     * Fires when click on cut button.
     *
     * @method _onMouseClickOnMoveCutButton
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickOnMoveCutButton: function(event) {
        event.stopPropagation();
        this._clickOnCutButton(event.currentTarget);
    },

    /**
     * Fires when key press on target area.
     *
     * @method _onKeyPressOnMoveTarget
     * @param {EventFacade} event
     * @protected
     */
    _onKeyPressOnMoveTarget: function(event) {
        this._moveToTarget(event);
    },

    /**
     * Fires when click on target area.
     *
     * @method _onMouseClickOnMoveTarget
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickOnMoveTarget: function(event) {
        this._moveToTarget(event);
    },

    /**
     * Removes all cut buttons.
     *
     * @method _removeAllCutButton
     * @param {Node} cutButton
     * @protected
     */
    _removeAllCutButton: function(cutButton) {
        var cutRowButtons = this._layoutContainer.all('.' + CSS_MOVE_CUT_ROW_BUTTON);

        this.get('removeColMoveButtons')(cutButton);

        cutRowButtons.each(function(cutRowButton) {
            if (cutRowButton !== cutButton) {
                cutRowButton.remove();
            }
        });
    },

    /**
     * Default value for `removeColMoveButtons` attribute.
     *
     * @method _removeColMoveButtons
     * @param {Node} clickedButton
     * @protected
     */
    _removeColMoveButtons: function(clickedButton) {
        var cutButtons = this._layoutContainer.all('.' + CSS_MOVE_CUT_COL_BUTTON);

        cutButtons.each(function(cutButton) {
            if (cutButton !== clickedButton) {
                cutButton.remove();
            }
        });
    },

    /**
     * Default value for `removeColMoveTargets` attribute.
     *
     * @method _removeColMoveTargets
     * @protected
     */
    _removeColMoveTargets: function() {
        this._layoutContainer.all('.' + CSS_MOVE_COL_TARGET).remove();
    },

    /**
    * Removes cut button from row.
    *
    * @method _removeCutButtonFromRow
    * @param {Node} row
    * @protected
    */
    _removeCutButtonFromRow: function(row) {
        row.one('.' + CSS_MOVE_CUT_ROW_BUTTON).remove();
    },

    /**
     * Removes all target area.
     *
     * @method _removeTargetArea
     * @protected
     */
    _removeTargetArea: function() {
        this._layoutContainer.all('.' + CSS_MOVE_ROW_TARGET).remove();
        this.get('removeColMoveTargets')();
    },

    /**
     * Reset the UI to a initial state.
     *
     * @method _resetMoveUI
     * @protected
     */
    _resetMoveUI: function() {
        this._removeAllCutButton();
        this._removeTargetArea();
        this._unbindMoveColEvents();
        this._unbindMoveRowEvents();

        this._uiSetEnableMoveCols(this.get('enableMoveCols'));
        this._uiSetEnableMoveRows(this.get('enableMoveRows'));
    },

    /**
     * Updates the UI according to the value of the `enableMoveCols` attribute.
     *
     * @method _uiSetEnableMoveCols
     * @param {Boolean} enableMoveCols
     * @protected
     */
    _uiSetEnableMoveCols: function(enableMoveCols) {
        if (enableMoveCols) {
            this._appendMoveButtonToCols();
            this._bindMoveColEvents();
        }
        else {
            this._unbindMoveColEvents();
        }
    },

    /**
     * Updates the UI according to the value of the `enableMoveRows` attribute.
     *
     * @method _uiSetEnableMoveRows
     * @param {Boolean} enableMoveRows
     * @protected
     */
    _uiSetEnableMoveRows: function(enableMoveRows) {
        if (enableMoveRows) {
            this._appendMoveButtonToRows();
            this._bindMoveRowEvents();
        }
        else {
            this._unbindMoveRowEvents();
        }
    },

    /**
     * Unbinds the events related to the functionality of moving cols from layout.
     *
     * @method _unbindMoveColEvents
     * @protected
     */
    _unbindMoveColEvents: function() {
        if (this._moveColEventHandles) {
            (new A.EventHandle(this._moveColEventHandles)).detach();
        }
    },

    /**
     * Unbinds the events related to the functionality of moving rows from layout.
     *
     * @method _unbindMoveRowEvents
     * @protected
     */
    _unbindMoveRowEvents: function() {
        if (this._moveRowEventHandles) {
            (new A.EventHandle(this._moveRowEventHandles)).detach();
        }
    }
};

/**
 * Static property used to define the default attribute configuration for the
 * `A.LayoutBuilderMove`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
LayoutBuilderMove.ATTRS = {
    /**
     * Default function to add move button to cols.
     *
     * @attribute addColMoveButton
     * @type {Function}
     */
    addColMoveButton: {
        validator: A.Lang.isFunction,
        valueFn: function() {
            return A.bind(this._addColMoveButton, this);
        }
    },

    /**
     * Default function to add target to cols.
     *
     * @attribute addColMoveTarget
     * @type {Function}
     */
    addColMoveTarget: {
        validator: A.Lang.isFunction,
        valueFn: function() {
            return A.bind(this._addColMoveTarget, this);
        }
    },

    /**
     * Default function to choose target on cols.
     *
     * @attribute chooseColMoveTarget
     * @type {Function}
     */
    chooseColMoveTarget: {
        validator: A.Lang.isFunction,
        valueFn: function() {
            return A.bind(this._chooseColMoveTarget, this);
        }
    },

    /**
     * Default function to click on targets in cols.
     *
     * @attribute clickColMoveTarget
     * @type {Function}
     */
    clickColMoveTarget: {
        validator: A.Lang.isFunction,
        valueFn: function() {
            return A.bind(this._clickColMoveTarget, this);
        }
    },

    /**
     * Flag indicating if the feature of moving cols from layout is
     * enabled or not.
     *
     * @attribute enableMoveCols
     * @default true
     * @type {Boolean}
     */
    enableMoveCols: {
        validator: A.Lang.isBoolean,
        value: true
    },

    /**
     * Flag indicating if the feature of moving rows from layout is
     * enabled or not.
     *
     * @attribute enableMoveRows
     * @default true
     * @type {Boolean}
     */
    enableMoveRows: {
        validator: A.Lang.isBoolean,
        value: true
    },

    /**
     * Default function to remove move button from cols.
     *
     * @attribute removeColMoveButtons
     * @type {Function}
     */
    removeColMoveButtons: {
        validator: A.Lang.isFunction,
        valueFn: function() {
            return A.bind(this._removeColMoveButtons, this);
        }
    },

    /**
     * Default function to remove targets from cols.
     *
     * @attribute removeColMoveTargets
     * @type {Function}
     */
    removeColMoveTargets: {
        validator: A.Lang.isFunction,
        valueFn: function() {
            return A.bind(this._removeColMoveTargets, this);
        }
    }
};

A.LayoutBuilderMove = LayoutBuilderMove;
