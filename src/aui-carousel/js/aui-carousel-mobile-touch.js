/**
 * The Carousel should work a little differently on mobile touch devices,
 * changing the menu contents for example.
 * This module will be mixed into the Carousel automatically when loaded.
 *
 * @module aui-carousel-touch
 */

function CarouselMobileTouch() {}

CarouselMobileTouch.prototype = {
    TPL_MENU: '<div class="carousel-menu"><menu>{items}</menu></div>'
};

CarouselMobileTouch.ATTRS = {
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

A.Base.mix(A.Carousel, [CarouselMobileTouch]);
