/**
 * The Carousel should work a little differently on touch devices,
 * having swipe turned on by default for example.
 * This module will be mixed into the Carousel automatically when loaded.
 *
 * @module aui-carousel-touch
 */

function CarouselTouch() {}

CarouselTouch.prototype = {
    TPL_MENU: '<div class="carousel-menu"><menu>{items}</menu></div>'
};

CarouselTouch.ATTRS = {
    /**
     * Position of the menu.
     *
     * @attribute nodeMenuPosition
     * @default 'outside'
     * @type String
     */
    nodeMenuPosition: {
        value: 'outside',
        validator: '_validateNodeMenuPosition'
    }
};

A.Base.mix(A.Carousel, [CarouselTouch]);
