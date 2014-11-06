/**
 * The Layout Builder Component
 *
 * @module aui-layout-builder
 */

var RESPONSIVENESS_BREAKPOINT = 992,
    TPL_LAYOUT_CONTAINER = '<div class="layout-builder-layout-container"></div>';

/**
 * Fired when the the responsive mode changes.
 *
 * @event columnModeChange
 */

/**
 * A base class for Layout Builder.
 *
 * Check the [live demo](http://alloyui.com/examples/layout-builder/).
 *
 * @class A.LayoutBuilder
 * @extends Base
 * @uses A.LayoutBuilderAddCol, A.LayoutBuilderRemoveCol
 * @param {Object} config Object literal specifying layout builder configuration
 *     properties.
 * @constructor
 */
A.LayoutBuilder = A.Base.create('layout-builder', A.Base, [
    A.LayoutBuilderAddCol,
    A.LayoutBuilderAddRow,
    A.LayoutBuilderMove,
    A.LayoutBuilderRemoveCol,
    A.LayoutBuilderRemoveRow,
    A.LayoutBuilderResizeCol
], {

    /**
     * Determines if columns should collapse.
     *
     * @property _isColumnModeEnabled
     * @type {Boolean}
     * @protected
     */
    _isColumnModeEnabled: null,

    /**
     * The node where the layout will be rendered.
     *
     * @property _layoutContainer
     * @type {Node}
     * @protected
     */
    _layoutContainer: null,

    /**
     * Construction logic executed during LayoutBuilder instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var container = this.get('container'),
            layout = this.get('layout');

        this._createLayoutContainer(container);

        layout.addTarget(this);
        layout.draw(this._layoutContainer);

        this._layoutContainer.unselectable();

        this._eventHandles = [
            this.after('layoutChange', A.bind(this._afterLayoutChange, this)),
            A.on('windowresize', A.bind(this._afterWindowResize, this))
        ];

        this._handleResponsive(A.config.win.innerWidth);
    },

    /**
     * Destructor implementation for the `A.LayoutBuilder` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        (new A.EventHandle(this._eventHandles)).detach();

        this.get('container').empty();
    },

    /**
     * Fires after layout changes.
     *
     * @method _afterLayoutChange
     * @param {EventFacade} event
     * @protected
     */
    _afterLayoutChange: function(event) {
        var newLayout = event.newVal,
            prevLayout = event.prevVal;

        prevLayout.removeTarget(this);

        newLayout.addTarget(this);
        newLayout.draw(this._layoutContainer);
    },

    /**
     * Fired after window resize.
     *
     * @method _afterWindowResize
     * @param {EventFacade} event
     * @protected
     */
    _afterWindowResize: function(event) {
        var viewportSize = event.target.get('innerWidth');

        this._handleResponsive(viewportSize);
    },

    /**
     * Create layout container node.
     *
     * @method _createLayoutContainer
     * @param {Node} container Node that will append the _layoutContainer node.
     * @protected
     */
    _createLayoutContainer: function(container) {
        this._layoutContainer = A.Node.create(TPL_LAYOUT_CONTAINER);
        container.append(this._layoutContainer);
    },

    /**
     * Fires the `columnModeChange` event.
     *
     * @method _handleResponsive
     * @param {Number} viewportSize
     * @protected
     */
    _handleResponsive: function(viewportSize) {
        var enableColumnMode = viewportSize >= RESPONSIVENESS_BREAKPOINT;

        if (this._isColumnModeEnabled !== enableColumnMode) {
            this._isColumnModeEnabled = enableColumnMode;
            this.fire('columnModeChange');
        }
    }
}, {
    /**
     * Static property used to define the default attribute
     * configuration for LayoutBuilder.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * Node that that will be inserted the layout.
         *
         * @attribute container
         * @type {String | Node}
         * @initOnly
         */
        container: {
            setter: A.one,
            validator: function(val) {
                return A.Lang.isString(val) || A.instanceOf(val, A.Node);
            },
            writeOnce: 'initOnly'
        },

        /**
         * Object with layout configuration.
         *
         * @attribute layout
         * @type {A.Layout}
         */
        layout: {
            validator: function(val) {
                return A.instanceOf(val, A.Layout);
            }
        }
    }
});
