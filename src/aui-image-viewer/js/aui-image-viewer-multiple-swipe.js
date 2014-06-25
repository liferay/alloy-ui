/**
 * This adds the functionality of swiping to go to the previous/ image in the
 * viewer for multiple images. Will be mixed into ImageViewerMultiple automatically
 * when loaded.
 *
 * @module aui-image-viewer-multiple-swipe
 */

function ImageViewerMultipleSwipe() {}

ImageViewerMultipleSwipe.prototype = {
    /**
     * Constructor for the `A.ImageViewerMultipleSwipe`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._eventHandles.push(
            A.after(this._attachMultipleSwipeEvents, this, '_attachSwipeEvents')
        );
    },

    /**
     * Attaches swipe events for the viewer's thumbnails.
     *
     * @method _attachThumbnailsSwipeEvents
     * @protected
     */
    _attachMultipleSwipeEvents: function() {
        var instance = this;

        this._swipeEventHandles.push(
            this._scrollView.after('scrollXChange', A.bind(this._loadVisibleImages, this)),
            this.get('contentBox').on('mousedown', function() {
                instance._lastThumbnailsScrollX = instance._scrollView.get('scrollX');
            }),
            this.on('imageClicked', function(event) {
                if (instance._lastThumbnailsScrollX !== instance._scrollView.get('scrollX')) {
                    event.preventDefault();
                }
            }),
            this.on('makeImageVisible', A.bind(this._onMakeImageVisible, this))
        );
    },

    /**
     * Fired on the `makeImageVisible` event. It replaces the original logic for
     * making the image visible through scrolling, using the scroll view for this
     * instead.
     *
     * @method _onMakeImageVisible
     * @protected
     */
    _onMakeImageVisible: function(event) {
        var imageRegion = this._getImageContainerAtIndex(event.index).get('region'),
            list = this.get('contentBox').one('.image-viewer-base-image-list'),
            listRegion = list.get('region'),
            scrollX = this._scrollView.get('scrollX');

        if (imageRegion.left < listRegion.left) {
            this._scrollView.set('scrollX', scrollX - (listRegion.left - imageRegion.left));
        }
        else if (imageRegion.right > listRegion.right) {
            this._scrollView.set('scrollX', scrollX + imageRegion.right - listRegion.right);
        }

        this._loadVisibleImages();

        event.preventDefault();
    }
};

ImageViewerMultipleSwipe.ATTRS = {
    /**
     * Flag indicating if ScrollViewPaginator should be plugged.
     *
     * @attribute useScrollViewPaginator
     * @default false
     * @type {Boolean}
     */
    useScrollViewPaginator: {
        value: false
    }
};

A.Base.mix(A.ImageViewerMultiple, [ImageViewerMultipleSwipe]);
