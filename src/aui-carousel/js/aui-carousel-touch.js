/**
 * The Carousel should work a little differently on touch devices,
 * having swipe turned on by default for example.
 * This module will be mixed into the Carousel automatically when loaded.
 *
 * @module aui-carousel-touch
 */

function CarouselTouch() {}

CarouselTouch.prototype = {
    TPL_MENU: '<menu>{items}</menu>'
};

A.Base.mix(A.Carousel, [CarouselTouch]);
