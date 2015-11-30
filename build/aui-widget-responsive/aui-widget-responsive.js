YUI.add('aui-widget-responsive', function (A, NAME) {

/**
 * Provides support for making a widget responsive. This is specially
 * useful when the width/height ratio should be preserved, which happens
 * when dealing with images for example.
 *
 * @module aui-widget-responsive
 */

/**
 * Fired when the widget will be updated to be responsive.
 *
 * @event responsive
 */

/**
 * Widget extension, which can be used to add responsive support to the base
 * Widget class, through the [Base.build](Base.html#method_build) method.
 *
 * @class A.WidgetResponsive
 * @param {Object} The user configuration object
 */
function WidgetResponsive() {}

WidgetResponsive.prototype = {
    /**
     * Construction logic executed during instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._responsiveEventHandles = [
            A.after(this._handleResponsive, this, '_uiSetHeight'),
            A.after(this._handleResponsive, this, '_uiSetVisible'),
            A.after(this._handleResponsive, this, '_uiSetWidth'),
            this.after({
                gutterChange: this._handleResponsive,
                maxHeightChange: this._handleResponsive,
                maxWidthChange: this._handleResponsive,
                preserveRatioChange: this._handleResponsive,
                render: this._handleResponsive
            }),
            A.after('windowresize', A.bind(this._handleResponsive, this))
        ];

        this.publish({
            responsive: {
                defaultFn: this._defResponsiveFn
            }
        });
    },

    /**
     * Destructor implementation.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        (new A.EventHandle(this._responsiveEventHandles)).detach();
    },

    /**
     * Updates the widget's dimensions so that it will fit the page better.
     *
     * @method updateDimensions
     */
    updateDimensions: function() {
        this._handleResponsive();
    },

    /**
     * Updates the widget's dimensions like the `updateDimensions` method, but
     * also recalculates the ratio to be preserved. Useful if the visible content
     * of the widget has changed causing the ratio to change as well.
     *
     * @method updateDimensionsWithNewRatio
     */
    updateDimensionsWithNewRatio: function() {
        this._originalDimensions = null;
        this.updateDimensions();
    },

    /**
     * Calculates the original width and height of the widget, which will be
     * used when changing its dimensions to preserve its ratio.
     *
     * @method _calculateOriginalDimensions
     * @return {Object} An object with the original dimensions
     * @protected
     */
    _calculateOriginalDimensions: function() {
        var boundingBox = this.get('boundingBox'),
            gutter = this.get('gutter');

        if (!this._originalDimensions) {
            boundingBox.setStyles({
                display: 'inline-block'
            });

            this._originalDimensions = {
                height: boundingBox.get('offsetHeight') - gutter[1],
                width: boundingBox.get('offsetWidth') - gutter[0]
            };

            boundingBox.setStyles({
                display: ''
            });
        }

        return this._originalDimensions;
    },

    /**
     * Checks if the height can be manually changed.
     *
     * @method _canChangeHeight
     * @return {Boolean}
     */
    _canChangeHeight: function() {
        return this.get('height') === 'auto' || this.get('height') === '';
    },

    /**
     * Checks if the width can be manually changed.
     *
     * @method _canChangeWidth
     * @return {Boolean}
     */
    _canChangeWidth: function() {
        return this.get('width') === 'auto' || this.get('width') === '';
    },

    /**
     * Default behavior for the `responsive` event. It updates the dimensions of
     * the widget so it will respect the `preserveRatio`, `maxHeight` and `maxWidth`
     * attributes.
     *
     * @method _defResponsiveFn
     * @param {EventFacade} event
     * @protected
     */
    _defResponsiveFn: function(event) {
        if (!this.get('visible')) {
            return;
        }

        var boundingBox = this.get('boundingBox'),
            gutter = this.get('gutter'),
            maxHeight = this.get('maxHeight'),
            maxWidth = this.get('maxWidth'),
            newHeight,
            newWidth,
            originalDimensions,
            ratio = 1,
            viewportRegion = A.DOM.viewportRegion();

        this._uiSetDim('width', this.get('width'));
        this._uiSetDim('height', this.get('height'));

        newHeight = boundingBox.get('offsetHeight') - gutter[1];
        newWidth = boundingBox.get('offsetWidth') - gutter[0];

        if (this._canChangeHeight() && this.get('preserveRatio')) {
            originalDimensions = this._calculateOriginalDimensions();
            newHeight = (originalDimensions.height * newWidth) / originalDimensions.width;
        }

        if (this._canChangeHeight()) {
            maxHeight = Math.min(maxHeight, viewportRegion.height) - gutter[1];
        }
        if (this._canChangeWidth()) {
            maxWidth = Math.min(maxWidth, viewportRegion.width) - gutter[0];
        }

        if (newWidth > maxWidth || newHeight > maxHeight) {
            ratio = Math.min(
                maxHeight / newHeight,
                maxWidth / newWidth
            );
        }

        newHeight = Math.floor(newHeight * ratio);
        newWidth = Math.floor(newWidth * ratio);

        boundingBox.set('offsetHeight', newHeight + gutter[1]);
        boundingBox.set('offsetWidth', newWidth + gutter[0]);

        event.height = newHeight;
        event.width = newWidth;
    },

    /**
     * Fires the `responsive` event.
     *
     * @method _handleResponsive
     * @protected
     */
    _handleResponsive: function() {
        var boundingBox = this.get('boundingBox'),
            gutter = this.get('gutter');

        this.fire('responsive', {
            height: boundingBox.get('offsetHeight') - gutter[1],
            width: boundingBox.get('offsetWidth') - gutter[0]
        });
    }
};

WidgetResponsive.ATTRS = {
    /**
     * Vertical and horizontal values in pixels that should not be counted
     * when preserving the widget's ratio. widget.
     *
     * @attribute gutter
     * @default [0, 0]
     * @type Array
     */
    gutter: {
        value: [0, 0],
        validator: function(value) {
            return A.Lang.isArray(value) && value.length === 2;
        }
    },

    /**
     * The maximum height of the widget.
     *
     * @attribute maxHeight
     * @default Infinity
     * @type Number
     */
    maxHeight: {
        value: Infinity,
        validator: A.Lang.isNumber
    },

    /**
     * The maximum width of the widget.
     *
     * @attribute maxWidth
     * @default Infinity
     * @type Number
     */
    maxWidth: {
        value: Infinity,
        validator: A.Lang.isNumber
    },

    /**
     * Flag to indicate if the width/height ratio should be preserved.
     *
     * @attribute preserveRatio
     * @default true
     * @type Boolean
     */
    preserveRatio: {
        value: true,
        validator: A.Lang.isBoolean
    }
};

A.WidgetResponsive = WidgetResponsive;


}, '3.0.1', {"requires": ["event-resize", "widget-base"]});
