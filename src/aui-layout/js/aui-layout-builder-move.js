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
    CSS_MOVE_TARGET = A.getClassName('layout', 'builder', 'move', 'target'),
    TPL_MOVE_BUTTON = '<button type="button" class="btn btn-default btn-xs ' + CSS_MOVE_BUTTON + '">' +
        '<span class="glyphicon glyphicon-sort"></span> <span class="' + CSS_MOVE_BUTTON_TEXT + '"> Move</span></button>',
    TPL_MOVE_CUT = '<div class="' + CSS_MOVE_CUT_BUTTON + '"></div>',
    TPL_MOVE_TARGET = '<div class="' + CSS_MOVE_TARGET + '">Move</div>';

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
        var layoutContainer = this._layoutContainer,
            moveButton,
            rows = layoutContainer.all('.row');

        rows.each(function(row) {
            moveButton = A.Node.create(TPL_MOVE_BUTTON);
            moveButton.setData('layout-row', row.getData('layout-row'));
            moveButton.setData('node-row', row);
            layoutContainer.insertBefore(moveButton, row);
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
            this._layoutContainer.delegate('click', A.bind(this._onMouseClickOnMoveTarget, this), '.' + CSS_MOVE_TARGET)
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
     * Create target area to move the col.
     *
     * @method _createColTargetArea
     * @param {Node} col
     * @protected
     */
    _createColTargetArea: function(col) {
        var cols,
            rows = this._layoutContainer.all('.row'),
            target;

        this._colToBeMoved = col.getData('layout-col');

        rows.each(function(row) {
            cols = row.all('.col');

            cols.each(function(currentCol, index) {
                if (currentCol !== col) {
                    target = A.Node.create(TPL_MOVE_TARGET);
                    target.setData('position', index);
                    target.addClass(CSS_MOVE_COL_TARGET);
                    currentCol.append(target);
                }
            });
        });
    },

    /**
     * Create target area to move the row.
     *
     * @method _createRowTargetArea
     * @protected
     */
    _createRowTargetArea: function() {
        var container = this._layoutContainer,
            indexRowToBeMoved = this.get('layout').get('rows').indexOf(this._rowToBeMoved),
            rows = this._layoutContainer.all('.row'),
            target;

        if (indexRowToBeMoved !== 0) {
            target = A.Node.create(TPL_MOVE_TARGET);
            target.setData('position', 0);
            container.prepend(target);
        }

        rows.each(function(row, index) {
            if (indexRowToBeMoved !== index && indexRowToBeMoved !== index + 1) {
                target = A.Node.create(TPL_MOVE_TARGET);
                target.setData('position', index + 1);
                container.insertBefore(target, row.next());
            }
        });
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
        this._insertCutButtonOnCols(moveButton);
    },

    /**
     * Inserts cut buttons on cols.
     *
     * @method _insertCutButtonOnCols
     * @param {Node} moveButton
     * @protected
     */
    _insertCutButtonOnCols: function(moveButton) {
        var cols,
            cutButton,
            row = moveButton.getData('node-row'),
            rows = this._layoutContainer.all('.row');

        cols = row.all('.col');

        if (cols.size() === 1 && rows.size() === 1) {
            return;
        }

        cols.each(function(col) {
            cutButton = A.Node.create(TPL_MOVE_CUT);
            cutButton.setData('node-row', row);
            cutButton.setData('node-col', col);
            cutButton.addClass(CSS_MOVE_CUT_COL_BUTTON);
            col.append(cutButton);
        });
    },

    /**
     * Inserts cut buttons on rows.
     *
     * @method _insertCutButtonOnRow
     * @param {Node} moveButton
     * @protected
     */
    _insertCutButtonOnRow: function(moveButton) {
        var cutButton = A.Node.create(TPL_MOVE_CUT),
            rows = this._layoutContainer.all('.row');

        if (rows.size() === 1) {
            return;
        }

        cutButton.addClass(CSS_MOVE_CUT_ROW_BUTTON);

        this._rowToBeMoved = moveButton.getData('layout-row');

        this._layoutContainer.insertBefore(cutButton, moveButton);
    },

    /**
     * Moves col content between rows.
     *
     * @method _moveColContent
     * @param {Node} target
     * @protected
     */
    _moveColContent: function(target) {
        var row = target.ancestor('.row').getData('layout-row');

        row.moveColContent(this._colToBeMoved.get('value'), target.getData('position'));
        this._colToBeMoved.set('value', null);
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
            moveButton.remove();
            this._removeAllCutButton();
            this._resetMoveUI();
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
        var col,
            cutButton = event.currentTarget,
            row;

        this._removeAllCutButton();

        if (cutButton.hasClass(CSS_MOVE_CUT_ROW_BUTTON)) {
            this._createRowTargetArea();
        }
        else {
            col = cutButton.getData('node-col');
            row = cutButton.getData('node-row');
            this._createColTargetArea(col, row);
        }
    },

    /**
     * Fires when click on target area.
     *
     * @method _onMouseClickOnMoveTarget
     * @param {EventFacade} event
     * @protected
     */
    _onMouseClickOnMoveTarget: function(event) {
        var layout = this.get('layout'),
            target = event.currentTarget;

        if (target.hasClass(CSS_MOVE_COL_TARGET)) {
            this._moveColContent(target);
        }
        else {
            layout.moveRow(this._rowToBeMoved, target.getData('position'));
        }
    },

    /**
     * Removes all cut buttons.
     *
     * @method _removeAllCutButton
     * @protected
     */
    _removeAllCutButton: function() {
        this._layoutContainer.all('.' + CSS_MOVE_CUT_BUTTON).remove();
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
        this._layoutContainer.all('.' + CSS_MOVE_TARGET).remove();
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
