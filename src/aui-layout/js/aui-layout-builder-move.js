/**
 * The Layout Move Component
 *
 * @module aui-layout-move
 */

var CSS_MOVE_BUTTON = A.getClassName('layout', 'builder', 'move', 'button'),
    CSS_MOVE_BUTTON_TEXT = A.getClassName('layout', 'builder', 'move', 'button', 'text'),
    CSS_MOVE_CANCEL_BUTTON = A.getClassName('layout', 'builder', 'move', 'cancel', 'targets'),
    CSS_MOVE_COL_TARGET = A.getClassName('layout', 'builder', 'move', 'col', 'target'),
    CSS_MOVE_CUT_BUTTON = A.getClassName('layout', 'builder', 'move', 'cut', 'button'),
    CSS_MOVE_CUT_ROW_BUTTON = A.getClassName('layout', 'builder', 'move', 'cut', 'row', 'button'),
    CSS_MOVE_CUT_COL_BUTTON = A.getClassName('layout', 'builder', 'move', 'cut', 'col', 'button'),
    CSS_MOVE_ROW_TARGET = A.getClassName('layout', 'builder', 'move', 'row', 'target'),
    CSS_MOVE_TARGET = A.getClassName('layout', 'builder', 'move', 'target'),
    CSS_ROW_CONTAINER_ROW = A.getClassName('layout', 'row', 'container', 'row'),

    EVENT_ADD_COL_MOVE_BUTTON = 'addColMoveButton',
    EVENT_ADD_COL_MOVE_TARGET = 'addColMoveTarget',
    EVENT_CHOOSE_COL_MOVE_TARGET = 'chooseColMoveTarget',
    EVENT_CLICK_COL_MOVE_TARGET = 'clickColMoveTarget',
    EVENT_REMOVE_COL_MOVE_BUTTONS = 'removeColMoveButtons',
    EVENT_REMOVE_COL_MOVE_TARGETS = 'removeColMoveTargets',

    SELECTOR_COL = '.col',
    SELECTOR_ROW = '.layout-row',

    TPL_MOVE_BUTTON = '<button class="btn btn-default btn-xs ' + CSS_MOVE_BUTTON + '" tabindex="1" type="button">' +
        '<span class="glyphicon glyphicon-sort"></span> <span class="' + CSS_MOVE_BUTTON_TEXT + '"> Move</span></button>',
    TPL_MOVE_CUT = '<div class="' + CSS_MOVE_CUT_BUTTON + '" tabindex="2"></div>',
    TPL_MOVE_TARGET = '<div class="' + CSS_MOVE_TARGET + '" tabindex="3">Move</div>';

/**
 * Fired when a button for moving a column will be added.
 *
 * @event addColMoveButton
 * @preventable _defAddColMoveButtonFn
 */

/**
 * Fired when a target for moving a column will be added.
 *
 * @event addColMoveTarget
 * @preventable _defAddColMoveTargetFn
 */

/**
 * Fired when the target where the picked column should move to will be chosen.
 *
 * @event chooseColMoveTarget
 * @preventable _defChooseColMoveTargetFn
 */

/**
 * Fired when a column move targets is clicked.
 *
 * @event clickColMoveTarget
 * @preventable _defClickColMoveTargetFn
 */

/**
 * Fired when all buttons for moving columns will be removed.
 *
 * @event removeColMoveButtons
 * @preventable _defRemoveColMoveButtonsFn
 */

/**
 * Fired when all targets for moving columns will be removed.
 *
 * @event removeColMoveTargets
 * @preventable _defRemoveColMoveTargetsFn
 */

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
            this.after('enableMoveChange', A.bind(this._afterEnableMoveChange, this)),
            this.after('layout-row:colsChange', A.bind(this._afterMoveColsChange, this)),
            this.after('layout:rowsChange', A.bind(this._afterMoveRowsChange, this)),
            this.after('layoutChange', A.bind(this._afterMoveLayoutChange, this))
        );

        this.publish({
            addColMoveButton: {
                defaultFn: this._defAddColMoveButtonFn
            },
            addColMoveTarget: {
                defaultFn: this._defAddColMoveTargetFn
            },
            chooseColMoveTarget: {
                defaultFn: this._defChooseColMoveTargetFn
            },
            clickColMoveTarget: {
                defaultFn: this._defClickColMoveTargetFn
            },
            removeColMoveButtons: {
                defaultFn: this._defRemoveColMoveButtonsFn
            },
            removeColMoveTargets: {
                defaultFn: this._defRemoveColMoveTargetsFn
            }
        });

        this._uiSetEnableMove(this.get('enableMove'));
    },

    /**
     * Destructor implementation for the `A.LayoutBuilderMove` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this._unbindMoveEvents();
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
     * Fired after the `enableMove` attribute changes.
     *
     * @method _afterEnableMoveChange
     * @protected
     */
    _afterEnableMoveChange: function() {
        this._resetMoveUI();
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
            layoutContainer = this._layoutContainer,
            moveButton,
            rows = layoutContainer.all(SELECTOR_ROW);

        rows.each(function(row) {
            if (instance._hasAnythingMovable(row)) {
                moveButton = A.Node.create(TPL_MOVE_BUTTON);
                moveButton.setData('layout-row', row.getData('layout-row'));
                moveButton.setData('node-row', row);
                layoutContainer.insertBefore(moveButton, row);
            }
        });
    },

    /**
     * Binds the necessary events for the functionality of moving on layout.
     *
     * @method _bindMoveEvents
     * @protected
     */
    _bindMoveEvents: function() {
        var container = this.get('container');

        this._moveEventHandles = [
            container.delegate('click', A.bind(this._onMouseClickMoveEvent, this), '.' + CSS_MOVE_BUTTON + ', .' + CSS_MOVE_CANCEL_BUTTON),
            this._layoutContainer.delegate('click', A.bind(this._onMouseClickOnMoveCutButton, this), '.' + CSS_MOVE_CUT_BUTTON),
            this._layoutContainer.delegate('key', A.bind(this._onKeyPressOnMoveCutButton, this), 'press:13', '.' + CSS_MOVE_CUT_BUTTON),
            this._layoutContainer.delegate('click', A.bind(this._onMouseClickOnMoveTarget, this), '.' + CSS_MOVE_TARGET),
            this._layoutContainer.delegate('key', A.bind(this._onKeyPressOnMoveTarget, this), 'press:13', '.' + CSS_MOVE_TARGET)
        ];
    },

    /**
     * Change button text to cancel and add cancel class.
     *
     * @method _changeButtonToCancel
     * @param {Node} button
     * @protected
     */
    _changeButtonToCancel: function(button) {
        button.one('.' + CSS_MOVE_BUTTON_TEXT).set('text', 'Cancel');

        button.removeClass(CSS_MOVE_BUTTON);
        button.addClass(CSS_MOVE_CANCEL_BUTTON);
    },

    /**
     * Create target areas.
     *
     * @method _clickOnCutButton
     * @param {EventFacade} event
     * @protected
     */
    _clickOnCutButton: function(event) {
        var cutButton = event.currentTarget;

        this._removeAllCutButton();

        if (cutButton.hasClass(CSS_MOVE_CUT_ROW_BUTTON)) {
            this._createRowTargetArea();
        }
        else {
            this.fire(EVENT_CHOOSE_COL_MOVE_TARGET, {
                clickedButton: cutButton,
                col: cutButton.getData('node-col').getData('layout-col')
            });
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
     * @param {A.LayoutRow} rowToBeMoved
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
     * Default behavior for the `addColMoveButton` event.
     *
     * @method _defAddColMoveButtonFn
     * @param {EventFacade} event
     * @protected
     */
    _defAddColMoveButtonFn: function(event) {
        var colNode = event.colNode,
            cutButton,
            rowNode = event.rowNode;

        cutButton = A.Node.create(TPL_MOVE_CUT);
        cutButton.setData('node-row', rowNode);
        cutButton.setData('node-col', colNode);
        cutButton.addClass(CSS_MOVE_CUT_COL_BUTTON);
        colNode.append(cutButton);
    },

    /**
     * Default behavior for the `addColMoveTarget` event.
     *
     * @method _defAddColMoveTargetFn
     * @param {EventFacade} event
     * @protected
     */
    _defAddColMoveTargetFn: function(event) {
        var target = A.Node.create(TPL_MOVE_TARGET);
        target.setData('col-index', event.colIndex);
        target.addClass(CSS_MOVE_COL_TARGET);
        event.col.get('node').append(target);
    },

    /**
     * Default behavior for the `chooseColMoveTarget` event.
     *
     * @method _defChooseColMoveTargetFn
     * @param {EventFacade} event
     * @protected
     */
    _defChooseColMoveTargetFn: function(event) {
        var instance = this,
            rows = this.get('layout').get('rows');

        this._colToBeMoved = event.col;

        A.Array.forEach(rows, function(row) {
            A.Array.forEach(row.get('cols'), function(col, index) {
                if (col !== instance._colToBeMoved) {
                    instance.fire(EVENT_ADD_COL_MOVE_TARGET, {
                        col: col,
                        colIndex: index,
                        row: row
                    });
                }
            });
        });
    },

    /**
     * Default behavior for the `clickColMoveTarget` event.
     *
     * @method _defClickColMoveTargetFn
     * @param {EventFacade} event
     * @protected
     */
    _defClickColMoveTargetFn: function(event) {
        var row = event.moveTarget.ancestor(SELECTOR_ROW).getData('layout-row');

        this._resetMoveUI();
        row.moveColContent(event.moveTarget.getData('col-index'), this._colToBeMoved);
    },

    /**
     * Default behavior for the `removeColMoveButtons` event.
     *
     * @method _defRemoveColMoveButtonsFn
     * @protected
     */
    _defRemoveColMoveButtonsFn: function() {
        this._layoutContainer.all('.' + CSS_MOVE_CUT_COL_BUTTON).remove();
    },

    /**
     * Default behavior for the `removeColMoveTargets` event.
     *
     * @method _defRemoveColMoveTargetsFn
     * @protected
     */
    _defRemoveColMoveTargetsFn: function() {
        this._layoutContainer.all('.' + CSS_MOVE_COL_TARGET).remove();
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
     * Inserts cut buttons on row and cols.
     *
     * @method _insertCutButton
     * @param {Node} moveButton
     * @protected
     */
    _insertCutButton: function(moveButton) {
        this._insertCutButtonOnRow(moveButton);

        if (this.get('layout').get('isColumnMode')) {
            this._insertCutButtonOnCols(moveButton);
        }
    },

    /**
     * Inserts cut buttons on cols.
     *
     * @method _insertCutButtonOnCols
     * @param {Node} moveButton
     * @protected
     */
    _insertCutButtonOnCols: function(moveButton) {
        var instance = this,
            cols,
            layoutCol,
            row = moveButton.getData('node-row'),
            rows = this._layoutContainer.all(SELECTOR_ROW);

        cols = row.all(SELECTOR_COL);

        if (cols.size() === 1 && rows.size() === 1) {
            return;
        }

        cols.each(function(col) {
            layoutCol = col.getData('layout-col');

            if (layoutCol.get('movableContent')) {
                instance.fire(EVENT_ADD_COL_MOVE_BUTTON, {
                    colNode: col,
                    rowNode: row
                });
            }
        });
    },

    /**
     * Inserts cut button on a row.
     *
     * @method _insertCutButtonOnRow
     * @param {Node} moveButton
     * @protected
     */
    _insertCutButtonOnRow: function(moveButton) {
        var cutButton = A.Node.create(TPL_MOVE_CUT),
            layoutRow = moveButton.getData('layout-row'),
            rows = this._layoutContainer.all(SELECTOR_ROW);

        if (rows.size() === 1) {
            return;
        }

        if (!layoutRow.get('movable')) {
            return;
        }

        cutButton.addClass(CSS_MOVE_CUT_ROW_BUTTON);
        cutButton.setData('node-row', moveButton.getData('node-row'));

        this._rowToBeMoved = layoutRow;

        this._layoutContainer.insertBefore(cutButton, moveButton);
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
            this.fire(EVENT_CLICK_COL_MOVE_TARGET, {
                moveTarget: target
            });
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
        this._clickOnCutButton(event);
    },

    /**
     * Fires after click on move button.
     *
     * @method _onMouseClickMoveEvent
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickMoveEvent: function(event) {
        var moveButton = event.currentTarget;

        if (moveButton.hasClass(CSS_MOVE_BUTTON)) {
            this._changeButtonToCancel(moveButton);
            this._removeMoveButtonFromRows(moveButton);
            this._insertCutButton(moveButton);
        }
        else {
            this.cancelMove();
        }
    },

    /**
     * Fires when click on cut button.
     *
     * @method _onMouseClickOnMoveCutButton
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickOnMoveCutButton: function(event) {
        this._clickOnCutButton(event);
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
     * @protected
     */
    _removeAllCutButton: function() {
        this.fire(EVENT_REMOVE_COL_MOVE_BUTTONS);
        this._layoutContainer.all('.' + CSS_MOVE_CUT_ROW_BUTTON).remove();
    },

    /**
     * Removes all move row buttons.
     *
     * @method _removeMoveButtonFromRows
     * @protected
     */
    _removeMoveButtonFromRows: function(button) {
        var buttons = this.get('container').all('.' + CSS_MOVE_BUTTON + ', .' + CSS_MOVE_CANCEL_BUTTON);

        if (button) {
            buttons.each(function(currentButton) {
                if (currentButton !== button) {
                    currentButton.detachAll();
                    currentButton.remove();
                }
            });
        }
        else {
            buttons.remove();
        }
    },

    /**
     * Removes all target area.
     *
     * @method _removeTargetArea
     * @protected
     */
    _removeTargetArea: function() {
        this._layoutContainer.all('.' + CSS_MOVE_ROW_TARGET).remove();
        this.fire(EVENT_REMOVE_COL_MOVE_TARGETS);
    },

    /**
     * Reset the UI to a initial state.
     *
     * @method _resetMoveUI
     * @protected
     */
    _resetMoveUI: function() {
        this._removeAllCutButton();
        this._removeMoveButtonFromRows();
        this._removeTargetArea();
        this._unbindMoveEvents();
        this._uiSetEnableMove(this.get('enableMove'));
    },

    /**
     * Updates the UI according to the value of the `enableMove` attribute.
     *
     * @method _uiSetEnableMove
     * @param {Boolean} enableMove
     * @protected
     */
    _uiSetEnableMove: function(enableMove) {
        this._removeMoveButtonFromRows();

        if (enableMove) {
            this._appendMoveButtonToRows();
            this._bindMoveEvents();
        }
        else {
            this._removeMoveButtonFromRows();
            this._unbindMoveEvents();
        }
    },

    /**
     * Unbinds the events related to the functionality of moving rows from layout.
     *
     * @method _unbindMoveEvents
     * @protected
     */
    _unbindMoveEvents: function() {
        if (this._moveEventHandles) {
            (new A.EventHandle(this._moveEventHandles)).detach();
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
     * Flag indicating if the feature of moving rows and cols from layout is
     * enabled or not.
     *
     * @attribute enableMove
     * @default true
     * @type {Boolean}
     */
    enableMove: {
        validator: A.Lang.isBoolean,
        value: true
    }
};

A.LayoutBuilderMove = LayoutBuilderMove;
