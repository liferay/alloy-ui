/**
 * The Form Builder Layout Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-layout-builder
 */

var CSS_CHOOSE_COL_MOVE = A.getClassName('form', 'builder', 'choose', 'col', 'move'),
    CSS_CHOOSE_COL_MOVE_TARGET = A.getClassName('form', 'builder', 'choose', 'col', 'move', 'target'),
    CSS_COL_MOVING = A.getClassName('form', 'builder', 'col', 'moving'),
    CSS_FIELD = A.getClassName('form', 'builder', 'field'),
    CSS_FIELD_MOVE_BUTTON = A.getClassName('form', 'builder', 'field', 'move', 'button'),
    CSS_FIELD_MOVE_TARGET = A.getClassName('form', 'builder', 'field', 'move', 'target'),
    CSS_FIELD_MOVE_TARGET_INVALID = A.getClassName('form', 'builder', 'field', 'move', 'target', 'invalid'),
    CSS_FIELD_MOVING = A.getClassName('form', 'builder', 'field', 'moving'),
    CSS_LAYOUT = A.getClassName('form', 'builder', 'layout'),
    CSS_LAYOUT_BUILDER_MOVE_CANCEL = A.getClassName('layout', 'builder', 'move', 'cancel'),
    CSS_LAYOUT_MODE = A.getClassName('form', 'builder', 'layout', 'mode');

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

    /**
     * Construction logic executed during the `A.FormBuilderLayoutBuilder`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after({
            modeChange: this._afterLayoutBuilderModeChange,
            render: this._afterLayoutBuilderRender,
            'layout-row:colsChange': this._afterLayoutBuilderColsChange
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

        this._renderEmptyColumns();
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

        cantReceiveMoveTarget = col.get('value').get('fields').length > 0;

        if (cantReceiveMoveTarget) {
            return;
        }

        colNode.addClass(CSS_CHOOSE_COL_MOVE_TARGET);

        targetNodes = colNode.all('.' + CSS_FIELD_MOVE_TARGET);
        targetNodes.setData('col', col);
    },

    /**
     * Executed after the `layout:rowsChange` is fired.
     *
     * @method _afterLayoutBuilderColsChange
     * @param {EventFacade} event
     * @protected
     */
    _afterLayoutBuilderColsChange: function(event) {
        var lastRow = this._getLastRow();

        if (lastRow === event.target) {
            this._checkLastRow();
        }
    },

    /**
     * Fired after the `mode` attribute is set.
     *
     * @method _afterLayoutBuilderModeChange
     * @protected
     */
    _afterLayoutBuilderModeChange: function() {
        var layout = this.getActiveLayout();

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
            layout: this.getActiveLayout(),
            removeColMoveButtons: A.bind(this._removeColMoveButtons, this),
            removeColMoveTargets: A.bind(this._removeColMoveTargets, this)
        });

        originalChooseColMoveTargetFn = this._layoutBuilder.get('chooseColMoveTarget');
        this._layoutBuilder.set('chooseColMoveTarget', A.bind(this._chooseColMoveTarget, this,
            originalChooseColMoveTargetFn));

        this._uiSetLayoutBuilderMode(this.get('mode'));

        this._eventHandles.push(
            this._fieldToolbar.on('onToolbarFieldMouseEnter', A.bind(this._onFormBuilderToolbarFieldMouseEnter, this))
        );

        this._removeLayoutCutColButtons();

        this._checkLastRow();
    },

    /**
     * Checks if the last row has more the one col, if yes a new row is
     * created and seted as the last position.
     *
     * @method _checkLastRow
     * @protected
     */
    _checkLastRow: function() {
        if (this._getLastRow().get('cols').length > 1) {
            this._createLastRow();
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
            layout = this.getActiveLayout(),
            targetNode;

        this._fieldBeingMoved = fieldNode.getData('field-instance');
        this._fieldListBeingMoved = col.get('value');
        this._fieldBeingMovedCol = col;

        colNode.addClass(CSS_CHOOSE_COL_MOVE_TARGET);
        colNode.addClass(CSS_COL_MOVING);
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

        layout.normalizeColsHeight(layout.get('node').all('.row'));
    },

    /**
     * Overrides default `clickColMoveTarget` attribute.
     *
     * @method _clickColMoveTarget
     * @param {Node} moveTarget
     * @protected
     */
    _clickColMoveTarget: function(moveTarget) {
        var layout = this.getActiveLayout(),
            parentFieldNode = this._fieldBeingMoved.get('content').ancestor('.' + CSS_FIELD),
            row,
            targetNestedParent = moveTarget.getData('nested-field-parent'),
            toolbarMoveIconCancelMode = this._fieldToolbar.getItem('.' + CSS_LAYOUT_BUILDER_MOVE_CANCEL);

        if (toolbarMoveIconCancelMode) {
            toolbarMoveIconCancelMode.removeClass(CSS_LAYOUT_BUILDER_MOVE_CANCEL);
        }

        if (parentFieldNode) {
            parentFieldNode.getData('field-instance').removeNestedField(this._fieldBeingMoved);

            layout.normalizeColsHeight(new A.NodeList(this.getFieldRow(
                parentFieldNode.getData('field-instance'))));
        }
        else {
            row = this.getFieldRow(this._fieldBeingMoved);
            this._fieldListBeingMoved.removeField(this._fieldBeingMoved);
            layout.normalizeColsHeight(new A.NodeList(row));
        }

        if (targetNestedParent) {
            this._addNestedField(
                targetNestedParent,
                this._fieldBeingMoved,
                moveTarget.getData('nested-field-index')
            );
        }
        else {
            moveTarget.getData('col').get('value').addField(this._fieldBeingMoved);
        }

        this._layoutBuilder.cancelMove();
        this._removeLayoutCutColButtons();

        layout.normalizeColsHeight(new A.NodeList(this.getFieldRow(this._fieldBeingMoved)));
    },

    /**
     * Creates a new row in the last position.
     *
     * @method _createLastRow
     * @protected
     */
    _createLastRow: function() {
        var lastRow = new A.LayoutRow(),
            layout = this.getActiveLayout(),
            rows = layout.get('rows');

        layout.addRow(rows.length, lastRow);
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

        this._updateHeaderTitle(this.get('strings').titleOnEditLayoutMode);
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
                enableRemoveRows: false
            });
        }

        this._updateHeaderTitle(this.get('strings').titleOnRegularMode);
    },

    /**
     * Gets the last row.
     *
     * @method _getLastRow
     * @protected
     * @return {A.LayoutRow}
     */
    _getLastRow: function() {
        var rows = this.getActiveLayout().get('rows');

        return rows[rows.length - 1];
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
        var contentBox = this.get('contentBox'),
            layout = this.getActiveLayout();

        contentBox.all('.' + CSS_CHOOSE_COL_MOVE_TARGET).removeClass(CSS_CHOOSE_COL_MOVE_TARGET);
        contentBox.all('.' + CSS_FIELD_MOVING).removeClass(CSS_FIELD_MOVING);
        contentBox.all('.' + CSS_COL_MOVING).removeClass(CSS_COL_MOVING);
        contentBox.all('.' + CSS_FIELD_MOVE_TARGET_INVALID).removeClass(CSS_FIELD_MOVE_TARGET_INVALID);

        layout.normalizeColsHeight(layout.get('node').all('.row'));
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
     * Show or hide move item in toolbar.
     *
     * @method _toggleMoveColItem
     * @param {Node} colNode
     * @protected
     */
    _toggleMoveColItem: function(colNode) {
        var moveItem = this._fieldToolbar.getItem('.glyphicon-move').ancestor();

        moveItem.setData('layout-row', colNode.ancestor('.row').getData('layout-row'));
        moveItem.setData('node-col', colNode);
        moveItem.removeClass('hidden');
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
