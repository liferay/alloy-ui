/**
 * The Layout Builder Component
 *
 * @module aui-layout-builder
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
    A.LayoutBuilderRemoveCol,
    A.LayoutBuilderResizeCol
], {

    /**
     * Construction logic executed during LayoutBuilder instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var container = this.get('container'),
            layout = this.get('layout');

        layout.draw(container);

        container.unselectable();

        this._eventHandles = [
            this.after('layoutChange', A.bind(this._afterLayoutChange, this))
        ];

        this._layoutEventHandles = [
            layout.after('layout-row:colsChange', A.bind(this._afterLayoutColsChange, this)),
            layout.after('rowsChange', A.bind(this._afterLayoutRowsChange, this))
        ];
    },

    /**
     * Destructor implementation for the `A.LayoutBuilder` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        (new A.EventHandle(this._eventHandles)).detach();
        (new A.EventHandle(this._layoutEventHandles)).detach();

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
        var container = this.get('container'),
            newLayout = event.newVal;

        (new A.EventHandle(this._layoutEventHandles)).detach();

        this._layoutEventHandles = [
            newLayout.after('layout-row:colsChange', A.bind(this._afterLayoutColsChange, this)),
            newLayout.after('rowsChange', A.bind(this._afterLayoutRowsChange, this)),
        ];

        newLayout.draw(container);
    },

    /**
     * Fires after cols changes.
     *
     * @method _afterLayoutColsChange
     * @protected
     */
    _afterLayoutColsChange: function() {
        var container = this.get('container'),
            layout = this.get('layout');

        layout.draw(container);
    },

    /**
     * Fires after rows changes.
     *
     * @method _afterLayoutRowsChange
     * @param {EventFacade} event
     * @protected
     */
    _afterLayoutRowsChange: function() {
        var container = this.get('container'),
            layout = this.get('layout');

        layout.draw(container);
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
