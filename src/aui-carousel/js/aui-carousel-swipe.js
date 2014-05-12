/**
 * The Carousel funcionality of swiping to go to the previous/next image.
 * Will be mixed into the Carousel automatically when loaded.
 *
 * @module aui-carousel-swipe
 */

function CarouselSwipe() {}

CarouselSwipe.prototype = {
    WIDGET_INDEX_ATTRIBUTE: 'activeIndex',

    /**
     * Construction logic executed during instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        A.after(this._afterAttachSwipeEvents, this, '_attachSwipeEvents');

        this.WIDGET_ITEM_SELECTOR = this.get('itemSelector');
    },

    /**
     * Attaches more events related to the swipe functionality.
     *
     * @method _afterAttachSwipeEvents
     * @protected
     */
    _afterAttachSwipeEvents: function() {
        this._swipeEventHandles.push(
            this.on('showImage', this._onShowImage)
        );
    },

    /**
     * Fired on the `showImage` event. This prevents new image animations when
     * the current image was shown by scrolling.
     *
     * @method _onShowImage
     * @param {EventFacade} event
     * @protected
     */
    _onShowImage: function(event) {
        if (this._scrollView && this._scrollView.pages.get('index') === this.get(this.WIDGET_INDEX_ATTRIBUTE)) {
            // If the scroll view is already at the new index, then it was already
            // scrolled there, so we don't want the carousel to animate it.
            event.preventDefault();
        }
    }
};

A.Base.mix(A.Carousel, [A.WidgetSwipe, CarouselSwipe]);
