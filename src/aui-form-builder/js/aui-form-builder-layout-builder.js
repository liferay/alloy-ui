/**
 * The Form Builder Layout Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-layout-builder
 */

var CSS_CHOOSE_COL_MOVE = A.getClassName('form', 'builder', 'choose', 'col', 'move'),
    CSS_CHOOSE_COL_MOVE_TARGET = A.getClassName('form', 'builder', 'choose', 'col', 'move', 'target'),
    CSS_FIELD = A.getClassName('form', 'builder', 'field'),
    CSS_FIELD_LIST = A.getClassName('form', 'builder', 'field', 'list'),
    CSS_FIELD_MOVE_BUTTON = A.getClassName('form', 'builder', 'field', 'move', 'button'),
    CSS_FIELD_MOVE_TARGET = A.getClassName('form', 'builder', 'field', 'move', 'target'),
    CSS_FIELD_MOVE_TARGET_INVALID = A.getClassName('form', 'builder', 'field', 'move', 'target', 'invalid'),
    CSS_FIELD_MOVING = A.getClassName('form', 'builder', 'field', 'moving'),
    CSS_LAYOUT_MODE = A.getClassName('form', 'builder', 'layout', 'mode'),
    CSS_LAYOUT_MODE_BUTTON = A.getClassName('form', 'builder', 'layout', 'mode', 'button'),
    CSS_LAYOUT_MODE_CANCEL = A.getClassName('form', 'builder', 'layout', 'mode', 'cancel'),
    CSS_LAYOUT_MODE_EDIT = A.getClassName('form', 'builder', 'layout', 'mode', 'edit');

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
    TPL_BUTTON_LAYOUT_MODE: '<button class="btn-default btn ' + CSS_LAYOUT_MODE_BUTTON + '">' +
        '<span class="' + CSS_LAYOUT_MODE_EDIT + '">Edit Layout</span>' +
        '<span class="' + CSS_LAYOUT_MODE_CANCEL + '">Cancel</span></button>',

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
     * Fired after the button for entering/exiting layout mode is clicked.
     *
     * @method _afterClickLayoutModeButton
     * @protected
     */
    _afterClickLayoutModeButton: function() {
        var newMode = A.FormBuilder.MODES.LAYOUT;

        if (this.get('mode') === A.FormBuilder.MODES.LAYOUT) {
            newMode = A.FormBuilder.MODES.REGULAR;
        }

        this.set('mode', newMode);
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
        this._uiSetMode(this.get('mode'));
    },

    /**
     * Fired after this widget is rendered.
     *
     * @method _afterLayoutBuilderRender
     * @protected
     */
    _afterLayoutBuilderRender: function() {
        var button = this.get('layoutModeButton');

        if (!button.get('parentNode')) {
            this.get('contentBox').prepend(button);
        }
        button.after('click', A.bind(this._afterClickLayoutModeButton, this));

        this._layoutBuilder = new A.LayoutBuilder({
            container: this.get('contentBox').one('.' + CSS_FIELD_LIST),
            layout: this.get('layout')
        });
        this._bindLayoutBuilderEvents();

        this._uiSetMode(this.get('mode'));
    },

    /**
     * Binds all events related to the layout builder.
     *
     * @method _bindLayoutBuilderEvents
     * @protected
     */
    _bindLayoutBuilderEvents: function() {
        this._eventHandles.push(
            this._layoutBuilder.on({
                addColMoveButton: A.bind(this._onAddColMoveButton, this),
                addColMoveTarget: A.bind(this._onAddColMoveTarget, this),
                chooseColMoveTarget: A.bind(this._onChooseColMoveTarget, this),
                clickColMoveTarget: A.bind(this._onClickColMoveTarget, this),
                removeColMoveButtons: A.bind(this._onRemoveColMoveButtons, this),
                removeColMoveTargets: A.bind(this._onRemoveColMoveTargets, this)
            })
        );
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
                enableAddCols: true,
                enableMove: true,
                enableRemoveCols: true,
                enableRemoveRows: true,
                enableResizeCols: true
            });
        }
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
                enableAddCols: false,
                enableMove: false,
                enableRemoveCols: false,
                enableRemoveRows: false,
                enableResizeCols: false
            });
        }
    },

    /**
     * Fired when the `addColMoveButton` event from the layout builder is triggered.
     *
     * @method _onAddColMoveButton
     * @param  {EventFacade} event
     * @protected
     */
    _onAddColMoveButton: function(event) {
        var targetNodes;

        event.colNode.addClass(CSS_CHOOSE_COL_MOVE);

        targetNodes = event.colNode.all('.' + CSS_FIELD_MOVE_BUTTON);
        targetNodes.setData('node-col', event.colNode);
        targetNodes.setData('node-row', event.rowNode);

        event.preventDefault();
    },

    /**
     * Fired when the `addColMoveTarget` event from the layout builder is triggered.
     *
     * @method _onAddColMoveTarget
     * @param  {EventFacade]} event
     * @protected
     */
    _onAddColMoveTarget: function(event) {
        var colNode = event.col.get('node'),
            targetNodes;

        colNode.addClass(CSS_CHOOSE_COL_MOVE_TARGET);

        targetNodes = colNode.all('.' + CSS_FIELD_MOVE_TARGET);
        targetNodes.setData('col', event.col);

        event.preventDefault();
    },

    /**
     * Fired when the `chooseColMoveTarget` event from the layout builder is triggered.
     *
     * @method _onChooseColMoveTarget
     * @param  {EventFacade} event
     * @protected
     */
    _onChooseColMoveTarget: function(event) {
        var colNode = event.col.get('node'),
            fieldNode = event.clickedButton.ancestor('.' + CSS_FIELD),
            targetNode;

        this._fieldBeingMoved = fieldNode.getData('field-instance');
        this._fieldBeingMovedCol = event.col;

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
    },

    /**
     * Fired when the `clickColMoveTarget` event from the layout builder is triggered.
     *
     * @method _onClickColMoveTarget
     * @param  {EventFacade} event
     * @protected
     */
    _onClickColMoveTarget: function(event) {
        var moveTarget = event.moveTarget,
            parentFieldNode = this._fieldBeingMoved.get('content').ancestor('.' + CSS_FIELD),
            targetNestedParent = moveTarget.getData('nested-field-parent');

        if (parentFieldNode) {
            parentFieldNode.getData('field-instance').removeNestedField(this._fieldBeingMoved);
        }
        else {
            this._fieldBeingMovedCol.set('value', null);
        }

        if (targetNestedParent) {
            targetNestedParent.addNestedField(
                moveTarget.getData('nested-field-index'),
                this._fieldBeingMoved
            );
        }
        else {
            moveTarget.getData('col').set('value', this._fieldBeingMoved);
        }

        this._layoutBuilder.cancelMove();
        event.preventDefault();
    },

    /**
     * Fired when the `removeColMoveButtons` event from the layout builder is triggered.
     *
     * @method _onRemoveColMoveButtons
     * @param  {EventFacade} event
     * @protected
     */
    _onRemoveColMoveButtons: function(event) {
        this.get('contentBox').all('.' + CSS_CHOOSE_COL_MOVE).removeClass(CSS_CHOOSE_COL_MOVE);

        event.preventDefault();
    },

    /**
     * Fired when the `removeColMoveTargets` event from the layout builder is triggered.
     *
     * @method _onRemoveColMoveTargets
     * @param  {EventFacade} event
     * @protected
     */
    _onRemoveColMoveTargets: function(event) {
        this.get('contentBox').all('.' + CSS_CHOOSE_COL_MOVE_TARGET).removeClass(CSS_CHOOSE_COL_MOVE_TARGET);
        this.get('contentBox').all('.' + CSS_FIELD_MOVING).removeClass(CSS_FIELD_MOVING);
        this.get('contentBox').all('.' + CSS_FIELD_MOVE_TARGET_INVALID).removeClass(CSS_FIELD_MOVE_TARGET_INVALID);

        event.preventDefault();
    },

    /**
     * Updates the UI according to the value of the `mode` attribute.
     *
     * @method _uiSetMode
     * @param  {String} mode
     * @protected
     */
    _uiSetMode: function(mode) {
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

/**
 * Static property used to define the default attribute configuration for the
 * `A.FormBuilderLayoutBuilder`.
 *
 * @property ATTRS
 * @type {Object}
 * @static
 */
A.FormBuilderLayoutBuilder.ATTRS = {
    /**
     * The node that should be used as the button for entering/exiting layout
     * mode.
     *
     * @attribute layoutModeButton
     * @type Node
     */
    layoutModeButton: {
        valueFn: function() {
            return A.Node.create(this.TPL_BUTTON_LAYOUT_MODE);
        }
    }
};
