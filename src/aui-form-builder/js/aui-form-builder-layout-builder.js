/**
 * The Form Builder Layout Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-layout-builder
 */

var CSS_FIELD_LIST = A.getClassName('form', 'builder', 'field', 'list'),
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

        this._uiSetMode(this.get('mode'));
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
