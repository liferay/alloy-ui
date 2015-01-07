/**
 * The Form Builder Layout Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-layout-builder
 */

var CSS_CHOOSE_COL_MOVE = A.getClassName('form', 'builder', 'choose', 'col', 'move'),
    CSS_CHOOSE_COL_MOVE_TARGET = A.getClassName('form', 'builder', 'choose', 'col', 'move', 'target'),
    CSS_FIELD = A.getClassName('form', 'builder', 'field'),
    CSS_FIELD_MOVE_BUTTON = A.getClassName('form', 'builder', 'field', 'move', 'button'),
    CSS_FIELD_MOVE_TARGET = A.getClassName('form', 'builder', 'field', 'move', 'target'),
    CSS_FIELD_MOVE_TARGET_INVALID = A.getClassName('form', 'builder', 'field', 'move', 'target', 'invalid'),
    CSS_FIELD_MOVING = A.getClassName('form', 'builder', 'field', 'moving'),
    CSS_LAYOUT = A.getClassName('form', 'builder', 'layout'),
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
        var targetNodes;

        colNode.addClass(CSS_CHOOSE_COL_MOVE);

        targetNodes = colNode.all('.' + CSS_FIELD_MOVE_BUTTON);
        targetNodes.setData('node-col', colNode);
        targetNodes.setData('node-row', rowNode);
    },

    /**
     * Overrides default `addColMoveTarget` attribute.
     *
     * @method _addColMoveTarget
     * @param {A.LayoutCol} col
     * @protected
     */
    _addColMoveTarget: function(col) {
        var colNode = col.get('node'),
            targetNodes;

        colNode.addClass(CSS_CHOOSE_COL_MOVE_TARGET);

        targetNodes = colNode.all('.' + CSS_FIELD_MOVE_TARGET);
        targetNodes.setData('col', col);
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
            targetNestedParent = moveTarget.getData('nested-field-parent');

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
                enableMove: true,
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
                enableMove: false,
                enableRemoveCols: false,
                enableRemoveRows: false,
            });
        }

        this._updateHeaderTitle(this.TITLE_REGULAR);
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
        this.get('contentBox').all('.' + CSS_CHOOSE_COL_MOVE_TARGET).removeClass(CSS_CHOOSE_COL_MOVE_TARGET);
        this.get('contentBox').all('.' + CSS_FIELD_MOVING).removeClass(CSS_FIELD_MOVING);
        this.get('contentBox').all('.' + CSS_FIELD_MOVE_TARGET_INVALID).removeClass(CSS_FIELD_MOVE_TARGET_INVALID);
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
