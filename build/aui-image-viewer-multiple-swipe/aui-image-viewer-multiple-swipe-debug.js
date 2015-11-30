YUI.add('aui-image-viewer-multiple-swipe', function (A, NAME) {

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
            A.after(this._afterAttachSwipeEvents, this, '_attachSwipeEvents')
        );
    },

    /**
     * Attaches swipe events for the viewer's thumbnails.
     *
     * @method _afterAttachSwipeEvents
     * @protected
     */
    _afterAttachSwipeEvents: function() {
        this._swipeEventHandles.push(
            this._scrollView.after('scrollXChange', A.bind(this._afterScrollXChange, this)),
            this.get('contentBox').on('mousedown', A.bind(this._onMousedown, this)),
            this.on({
                imageClicked: this._onImageClicked,
                makeImageVisible: this._onMakeImageVisible
            })
        );
    },

    /**
     * Fired after the scroll view's `scrollX` attribute changes.
     *
     * @method _afterScrollXChange
     * @protected
     */
    _afterScrollXChange: function() {
        this._loadVisibleImages();
    },

    /**
     * Fired on the `imageClicked` event. Prevents its default behavior when
     * the widget was scrolled, as the image shouldn't change when dragging.
     *
     * @method _onImageClicked
     * @param {EventFacade} event
     * @protected
     */
    _onImageClicked: function(event) {
        if (this._lastThumbnailsScrollX !== this._scrollView.get('scrollX')) {
            event.preventDefault();
        }
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
    },

    /**
     * Fired when the `mousedown` event is triggered on the widget. Stores
     * the value of `scrollX` at the moment the mousedown happened.
     *
     * @method _onMousedown
     * @protected
     */
    _onMousedown: function() {
        this._lastThumbnailsScrollX = this._scrollView.get('scrollX');
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


}, '3.0.1', {"requires": ["aui-image-viewer-multiple", "aui-image-viewer-swipe"]});
