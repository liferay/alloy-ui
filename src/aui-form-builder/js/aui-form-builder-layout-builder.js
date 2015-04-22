/**
 * The Form Builder Layout Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-layout-builder
 */

var CSS_ADD_PAGE_BREAK = A.getClassName('form', 'builder', 'add', 'page', 'break'),
    CSS_CHOOSE_COL_MOVE = A.getClassName('form', 'builder', 'choose', 'col', 'move'),
    CSS_CHOOSE_COL_MOVE_TARGET = A.getClassName('form', 'builder', 'choose', 'col', 'move', 'target'),
    CSS_FIELD = A.getClassName('form', 'builder', 'field'),
    CSS_FIELD_MOVE_BUTTON = A.getClassName('form', 'builder', 'field', 'move', 'button'),
    CSS_FIELD_MOVE_TARGET = A.getClassName('form', 'builder', 'field', 'move', 'target'),
    CSS_FIELD_MOVE_TARGET_INVALID = A.getClassName('form', 'builder', 'field', 'move', 'target', 'invalid'),
    CSS_FIELD_MOVING = A.getClassName('form', 'builder', 'field', 'moving'),
    CSS_LAYOUT = A.getClassName('form', 'builder', 'layout'),
    CSS_LAYOUT_BUILDER_MOVE_CANCEL = A.getClassName('layout', 'builder', 'move', 'cancel'),
    CSS_LAYOUT_MODE = A.getClassName('form', 'builder', 'layout', 'mode'),

    SELECTOR_LAYOUT_BUILDER_ADD_ROW = '.layout-builder-add-row',
    SELECTOR_LAYOUT_BUILDER_ADD_ROW_CHOOSE_ROW = '.layout-builder-add-row-choose-row';

/**
 * `A.FormBuilder` extension, which handles the `A.LayoutBuilder` inside it.
 *
 * @class A.FormBuilderLayoutBuilder
 * @param {Object} config Object literal specifying layout builder configuration
 *     properties.
 * @constructor
 */
A.FormBuilderLayoutBuilder = function() {};

A.FormBuilderLayoutBuilder.prototype = {
    TITLE_LAYOUT: 'Edit Layout',

    /**
     * Construction logic executed during the `A.FormBuilderLayoutBuilder`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after({
            create: this._afterFieldCreate,
            layoutChange: this._afterLayoutBuilderLayoutChange,
            modeChange: this._afterLayoutBuilderModeChange,
            render: this._afterLayoutBuilderRender
        });
    },

    /**
     * Destructor implementation for the `A.FormBuilderLayoutBuilder` class.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        if (this._layoutBuilder) {
            this._layoutBuilder.destroy();
        }
    },

    /**
     * Overrides default `addColMoveButton` attribute.
     *
     * @method _addColMoveButton
     * @param {Node} colNode
     * @param {Node} rowNode
     * @protected
     */
    _addColMoveButton: function(colNode, rowNode) {
        var targetNodes = colNode.all('.' + CSS_FIELD_MOVE_BUTTON);

        targetNodes.setData('node-col', colNode);
        targetNodes.setData('node-row', rowNode);
    },

    /**
     * Overrides default `addColMoveTarget` attribute.
     *
     * @method _addColMoveTarget
     * @param {A.LayoutCol} col
     * @param {Number} index
     * @protected
     */
    _addColMoveTarget: function(col) {
        var cantReceiveMoveTarget,
            colNode = col.get('node'),
            targetNodes;

        cantReceiveMoveTarget = !col.get('movableContent') && !colNode.one('.form-builder-empty-col');

        if (cantReceiveMoveTarget) {
            return;
        }

        colNode.addClass(CSS_CHOOSE_COL_MOVE_TARGET);

        targetNodes = colNode.all('.' + CSS_FIELD_MOVE_TARGET);
        targetNodes.setData('col', col);
    },

    /**
     * Executed after the `layout:create` is fired.
     *
     * @method _afterFieldCreate
     * @protected
     */
    _afterFieldCreate: function() {
        this._checkLastEmptyRow();
    },

    /**
     * Fired after the `layout:isColumnMode` attribute changes.
     *
     * @method _afterLayoutBuilderIsColumnModeChange
     * @protected
     */
    _afterLayoutBuilderIsColumnModeChange: function() {
        this._setPositionForPageBreakButton();
    },

    /**
     * Fired after the `layout` attribute is set.
     *
     * @method _afterLayoutBuilderLayoutChange
     * @protected
     */
    _afterLayoutBuilderLayoutChange: function() {
        if (this._layoutBuilder) {
            this._layoutBuilder.set('layout', this.get('layout'));
        }
    },

    /**
     * Fired after the `mode` attribute is set.
     *
     * @method _afterLayoutBuilderModeChange
     * @protected
     */
    _afterLayoutBuilderModeChange: function() {
        var layout = this.get('layout');

        this._uiSetLayoutBuilderMode(this.get('mode'));
        layout.normalizeColsHeight(layout.get('node').all('.row'));
    },

    /**
     * Fired after this widget is rendered.
     *
     * @method _afterLayoutBuilderRender
     * @protected
     */
    _afterLayoutBuilderRender: function() {
        var originalChooseColMoveTargetFn;

        this._layoutBuilder = new A.LayoutBuilder({
            addColMoveButton: A.bind(this._addColMoveButton, this),
            addColMoveTarget: A.bind(this._addColMoveTarget, this),
            clickColMoveTarget: A.bind(this._clickColMoveTarget, this),
            container: this.get('contentBox').one('.' + CSS_LAYOUT),
            layout: this.get('layout'),
            removeColMoveButtons: A.bind(this._removeColMoveButtons, this),
            removeColMoveTargets: A.bind(this._removeColMoveTargets, this)
        });

        originalChooseColMoveTargetFn = this._layoutBuilder.get('chooseColMoveTarget');
        this._layoutBuilder.set('chooseColMoveTarget', A.bind(this._chooseColMoveTarget, this, originalChooseColMoveTargetFn));

        this._uiSetLayoutBuilderMode(this.get('mode'));

        this._layoutBuilder.get('layout').after('isColumnModeChange', A.bind(this._afterLayoutBuilderIsColumnModeChange, this));
        this._setPositionForPageBreakButton();

        this._eventHandles.push(
            this._fieldToolbar.on('onToolbarFieldMouseEnter', A.bind(this._onFormBuilderToolbarFieldMouseEnter, this))
        );

        this._removeLayoutCutColButtons();

        this._removeAddRowButton();
        this._checkLastEmptyRow();
    },

    /**
     * Checks if the last row is empty.
     *
     * @method _checkLastEmptyRow
     * @protected
     */
    _checkLastEmptyRow: function() {
        var cols;

        this._lastRow = this._getLastRow();

        cols = this._lastRow.get('cols');

        for (var i = 0; i < cols.length; i++) {
            if (!cols[i].get('node').one('.form-builder-empty-col')) {
                this._createLastRow();
                break;
            }
        }
    },

    /**
     * Overrides default `chooseColMoveTarget` attribute.
     *
     * @method _chooseColMoveTarget
     * @param {Function} originalFn
     * @param {Node} cutButton
     * @param {A.LayoutCol} col
     * @protected
     */
    _chooseColMoveTarget: function(originalFn, cutButton, col) {
        var colNode = col.get('node'),
            fieldNode = cutButton.ancestor('.' + CSS_FIELD),
            targetNode;

        this._fieldBeingMoved = fieldNode.getData('field-instance');
        this._fieldBeingMovedCol = col;

        colNode.addClass(CSS_CHOOSE_COL_MOVE_TARGET);
        fieldNode.addClass(CSS_FIELD_MOVING);

        targetNode = fieldNode.previous('.' + CSS_FIELD_MOVE_TARGET);
        if (targetNode) {
            targetNode.addClass(CSS_FIELD_MOVE_TARGET_INVALID);
        }

        targetNode = fieldNode.next('.' + CSS_FIELD_MOVE_TARGET);
        if (targetNode) {
            targetNode.addClass(CSS_FIELD_MOVE_TARGET_INVALID);
        }

        originalFn(cutButton, col);
    },

    /**
     * Overrides default `clickColMoveTarget` attribute.
     *
     * @method _clickColMoveTarget
     * @param {Node} moveTarget
     * @protected
     */
    _clickColMoveTarget: function(moveTarget) {
        var parentFieldNode = this._fieldBeingMoved.get('content').ancestor('.' + CSS_FIELD),
            targetNestedParent = moveTarget.getData('nested-field-parent'),
            toolbarMoveIconCancelMode = this._fieldToolbar.getItem('.' + CSS_LAYOUT_BUILDER_MOVE_CANCEL);

        if (toolbarMoveIconCancelMode) {
            toolbarMoveIconCancelMode.removeClass(CSS_LAYOUT_BUILDER_MOVE_CANCEL);
        }

        if (parentFieldNode) {
            parentFieldNode.getData('field-instance').removeNestedField(this._fieldBeingMoved);

            this.get('layout').normalizeColsHeight(new A.NodeList(this.getFieldRow(parentFieldNode.getData('field-instance'))));
        }
        else {
            this._fieldBeingMovedCol.set('value', null);
        }

        if (targetNestedParent) {
            this._addNestedField(
                targetNestedParent,
                this._fieldBeingMoved,
                moveTarget.getData('nested-field-index')
            );
        }
        else {
            moveTarget.getData('col').set('value', this._fieldBeingMoved);
        }

        this._layoutBuilder.cancelMove();
        this._removeLayoutCutColButtons();
    },

    /**
     * Put add page break button together with add row button.
     *
     * @method _collapseAddPageBreakButton
     * @param {Node} addPageBreakButton
     * @param {Node} addRowContainer
     * @protected
     */
    _collapseAddPageBreakButton: function(addPageBreakButton, addRowContainer) {
        addRowContainer.append(addPageBreakButton);
    },

    /**
     * Creates a row with the same layout of the last row.
     *
     * @method _copyLastRow
     * @protected
     * @return {A.LayoutRow}
     */
    _copyLastRow: function() {
        var cols = this._lastRow.get('cols'),
            newCols = [];

        for (var i = 0; i < cols.length; i++) {
            newCols.push(new A.LayoutCol({ size: cols[i].get('size') }));
        }

        return new A.LayoutRow({ cols: newCols });
    },

    /**
     * Creates a new row in the last position.
     *
     * @method _createLastRow
     * @protected
     */
    _createLastRow: function() {
        var lastRow = this._copyLastRow(),
            layout = this.get('layout'),
            rows = layout.get('rows');

        layout.addRow(rows.length, lastRow);

        this._lastRow = this._getLastRow();
    },

    /**
     * Makes the form builder enter layout mode, where the layout can be edited.
     *
     * @method _enterLayoutMode
     * @protected
     */
    _enterLayoutMode: function() {
        if (this._layoutBuilder) {
            this._layoutBuilder.setAttrs({
                enableMoveCols: false,
                enableMoveRows: true,
                enableRemoveCols: true,
                enableRemoveRows: true
            });
        }

        this._updateHeaderTitle(this.TITLE_LAYOUT);
    },

    /**
     * Makes the form builder exit layout mode.
     *
     * @method _exitLayoutMode
     * @protected
     */
    _exitLayoutMode: function() {
        if (this._layoutBuilder) {
            this._layoutBuilder.setAttrs({
                enableMoveCols: true,
                enableMoveRows: false,
                enableRemoveCols: false,
                enableRemoveRows: false,
            });
        }

        this._updateHeaderTitle(this.TITLE_REGULAR);
    },

    /**
     * Appends add page break button on content box.
     *
     * @method _expandAddPageBreakButton
     * @param {Node} addPageBreakButton
     * @param {Node} contentBox
     * @protected
     */
    _expandAddPageBreakButton: function(addPageBreakButton, contentBox) {
        contentBox.append(addPageBreakButton);
    },

    /**
     * Gets the last row.
     *
     * @method _getLastRow
     * @protected
     * @return {A.LayoutRow}
     */
    _getLastRow: function() {
        var rows = this.get('layout').get('rows');

        for (var i = rows.length - 1; i >= 0; i--) {
            if (rows[i].name === 'layout-row') {
                return rows[i];
            }
        }

        return new A.LayoutRow();
    },

    /**
     * Fired when mouse enters a toolbar's field.
     *
     * @method _onFormBuilderToolbarFieldMouseEnter
     * @params {EventFacade} event
     * @protected
     */
    _onFormBuilderToolbarFieldMouseEnter: function(event) {
        this._toggleMoveColItem(event.colNode);
    },

    /**
     * Removes add row button.
     *
     * @method _removeAddRowButton
     * @protected
     */
    _removeAddRowButton: function() {
        A.one(SELECTOR_LAYOUT_BUILDER_ADD_ROW_CHOOSE_ROW + SELECTOR_LAYOUT_BUILDER_ADD_ROW).remove();
    },

    /**
     * Overrides default `removeColMoveButtons` attribute.
     *
     * @method _removeColMoveButtons
     * @protected
     */
    _removeColMoveButtons: function() {
        this.get('contentBox').all('.' + CSS_CHOOSE_COL_MOVE).removeClass(CSS_CHOOSE_COL_MOVE);
    },

    /**
     * Overrides default `removeColMoveTargets` attribute.
     *
     * @method _removeColMoveTargets
     * @protected
     */
    _removeColMoveTargets: function() {
        var contentBox = this.get('contentBox');

        contentBox.all('.' + CSS_CHOOSE_COL_MOVE_TARGET).removeClass(CSS_CHOOSE_COL_MOVE_TARGET);
        contentBox.all('.' + CSS_FIELD_MOVING).removeClass(CSS_FIELD_MOVING);
        contentBox.all('.' + CSS_FIELD_MOVE_TARGET_INVALID).removeClass(CSS_FIELD_MOVE_TARGET_INVALID);
    },

    /**
     * Remove original layout cut col buttons.
     *
     * @method _removeLayoutCutColButtons
     * @protected
     */
    _removeLayoutCutColButtons: function() {
        this._layoutBuilder.get('removeColMoveButtons')();
    },

    /**
     * Sets the proper position for page break button.
     *
     * @method _setPositionForPageBreakButton
     * @protected
     */
    _setPositionForPageBreakButton: function() {
        var addPageBreakButton,
            addRowContainer,
            contentBox = this.get('contentBox'),
            isColumnMode = this._layoutBuilder.get('layout').get('isColumnMode');

        addPageBreakButton = contentBox.one('.' + CSS_ADD_PAGE_BREAK);
        addRowContainer = this._layoutBuilder.addRowArea;

        if (isColumnMode) {
            this._collapseAddPageBreakButton(addPageBreakButton, addRowContainer);
        }
        else {
            this._expandAddPageBreakButton(addPageBreakButton, contentBox);
        }
    },

    /**
     * Show or hide move item in toolbar.
     *
     * @method _toggleMoveColItem
     * @param {Node} colNode
     * @protected
     */
    _toggleMoveColItem: function(colNode) {
        var hasMovableContent = colNode.getData('layout-col').get('movableContent'),
            moveItem = this._fieldToolbar.getItem('.glyphicon-move').ancestor();

        if (!hasMovableContent) {
            moveItem.addClass('hidden');
        }
        else {
            moveItem.setData('layout-row', colNode.ancestor('.row').getData('layout-row'));
            moveItem.setData('node-col', colNode);
            moveItem.removeClass('hidden');
        }
    },

    /**
     * Updates the UI according to the value of the `mode` attribute.
     *
     * @method _uiSetLayoutBuilderMode
     * @param  {String} mode
     * @protected
     */
    _uiSetLayoutBuilderMode: function(mode) {
        if (mode === A.FormBuilder.MODES.LAYOUT) {
            this._enterLayoutMode();
            this.get('boundingBox').addClass(CSS_LAYOUT_MODE);
        }
        else {
            this._exitLayoutMode();
            this.get('boundingBox').removeClass(CSS_LAYOUT_MODE);
        }
    }
};
