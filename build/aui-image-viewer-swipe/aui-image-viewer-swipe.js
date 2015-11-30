YUI.add('aui-image-viewer-swipe', function (A, NAME) {

/**
 * This adds the functionality of swiping to go to the previous/ image in the
 * viewer. Will be mixed into ImageViewer automatically when loaded.
 *
 * @module aui-image-viewer-swipe
 */

function ImageViewerSwipe() {}

ImageViewerSwipe.prototype = {
    WIDGET_INDEX_ATTRIBUTE: 'currentIndex',
    WIDGET_ITEM_SELECTOR: '.image-viewer-base-image-container'
};

ImageViewerSwipe.ATTRS = {
    /**
     * Turns the swipe interaction on/off.
     *
     * @attribute swipe
     * @type {Object|Boolean}
     */
    swipe: {
        getter: function(value) {
            return A.merge(value, {
                boundingBox: this.get('contentBox').one('.image-viewer-base-image-list'),
                contentBox: this.get('contentBox').one('.image-viewer-base-image-list-inner')
            });
        }
    }
};

A.Base.mix(A.ImageViewerBase, [A.WidgetSwipe, ImageViewerSwipe]);


}, '3.0.1', {"requires": ["event-resize", "aui-image-viewer-base", "aui-widget-swipe"]});
