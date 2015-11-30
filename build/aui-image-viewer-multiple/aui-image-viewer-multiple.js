YUI.add('aui-image-viewer-multiple', function (A, NAME) {

/**
 * The Image Viewer Multiple module.
 *
 * @module aui-image-viewer-multiple
 */

/**
 * Fired when one of the viewer's images was clicked.
 *
 * @event imageClicked
 * @preventable _defImageClicked
 */
/**
 * Fired when the widget needs to make an image visible.
 *
 * @event makeImageVisible
 * @preventable _defMakeImageVisible
 */

/**
 * The base class for Image Viewer.
 *
 * @class A.ImageViewerMultiple
 * @extends A.ImageViewerBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.ImageViewerMultiple = A.Base.create('image-viewer-multiple', A.ImageViewerBase, [], {
    VISIBLE_THRESHOLD: 5,

    /**
     * Constructor for the `A.ImageViewerMultiple`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._eventHandles.push(
            this.after({
                currentIndexChange: this._afterMultipleCurrentIndexChange,
                responsive: this._afterMultipleResponsive
            }),
            A.after(this._afterMultipleBindUI, this, 'bindUI'),
            A.after(this._afterMultipleRenderUI, this, 'renderUI')
        );

        this.publish({
            imageClicked: {
                defaultFn: this._defImageClicked
            },
            makeImageVisible: {
                defaultFn: this._defMakeImageVisible
            }
        });
    },

    /**
     * Fired after the `bindUI` method runs.
     *
     * @method _afterMultipleBindUI
     * @protected
     */
    _afterMultipleBindUI: function() {
        this._bindClickImages();
    },

    /**
     * Fired after the `renderUI` method runs.
     *
     * @method _afterMultipleRenderUI
     * @protected
     */
    _afterMultipleRenderUI: function() {
        this._loadVisibleImages();
    },

    /**
     * Fired after the `currentIndex` attribute is set.
     *
     * @method _afterMultipleCurrentIndexChange
     * @protected
     */
    _afterMultipleCurrentIndexChange: function() {
        this.fire('makeImageVisible', {
            index: this.get('currentIndex')
        });
    },

    /**
     * Fired after the `responsive` event is triggered.
     *
     * @method _afterMultipleResponsive
     * @protected
     */
    _afterMultipleResponsive: function() {
        this._loadVisibleImages();
    },

    /**
     * Binds the events for clicking images.
     *
     * @method _bindClickImages
     * @protected
     */
    _bindClickImages: function() {
        this._eventHandles.push(
            this.get('contentBox').delegate(
                'click',
                this._onClickImage,
                '.image-viewer-base-image-container',
                this
            )
        );
    },

    /**
     * Default behavior for the `imageClicked` event. The current index is updated
     * to point to the image that was clicked.
     *
     * @method _defImageClicked
     * @protected
     */
    _defImageClicked: function(event) {
        this.set('currentIndex', event.index);
    },

    /**
     * Default behavior for the `makeImageVisible` event. The scroll position is
     * updated to make the specified image visible.
     *
     * @method _defMakeImageVisible
     * @protected
     */
    _defMakeImageVisible: function(event) {
        var imageRegion = this._getImageContainerAtIndex(event.index).get('region'),
            list = this.get('contentBox').one('.image-viewer-base-image-list'),
            listRegion = list.get('region');

        if (imageRegion.left < listRegion.left) {
            list.set('scrollLeft', list.get('scrollLeft') - (listRegion.left - imageRegion.left));
        }
        else if (imageRegion.right > listRegion.right) {
            list.set('scrollLeft', list.get('scrollLeft') + imageRegion.right - listRegion.right);
        }

        this._loadVisibleImages();
    },

    /**
     * Checks if the image at the given index is visible in the viewer.
     *
     * @method _isImageVisible
     * @param {Node} image
     * @protected
     */
    _isImageVisible: function(image) {
        var imageRegion = image.get('region'),
            listRegion = this.get('contentBox').one('.image-viewer-base-image-list').get('region');

        return (imageRegion.left >= listRegion.left && imageRegion.left + this.VISIBLE_THRESHOLD <= listRegion.right) ||
            (imageRegion.right <= listRegion.right && imageRegion.right - this.VISIBLE_THRESHOLD >= listRegion.left);
    },

    /**
     * Loads all images that are currently visible in the viewer.
     *
     * @method _loadVisibleImages
     * @protected
     */
    _loadVisibleImages: function() {
        var containers = this.get('contentBox').all('.image-viewer-base-image-container');

        for (var i = 0; i < containers.size(); i++) {
            if (this._isImageVisible(containers.item(i))) {
                this._loadImage(i);
            }
        }
    },

    /**
     * Fired when one of the viewer's images is clicked.
     *
     * @method _onClickImage
     * @param {EventFacade} event
     * @protected
     */
    _onClickImage: function(event) {
        var index = event.currentTarget.get('parentNode').get('children').indexOf(event.currentTarget);
        this.fire('imageClicked', {
            index: index
        });
    }
}, {
    ATTRS: {
        /**
         * The height of the image viewer.
         *
         * @attribute height
         * @default 100
         * @type Number | String
         */
        height: 100
    },

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: A.getClassName('image-viewer-multiple')
});


}, '3.0.1', {
    "requires": [
        "base-build",
        "node-base",
        "aui-classnamemanager",
        "aui-image-viewer-base"
    ],
    "skinnable": true
});
