/**
 * This adds the functionality of swiping to go to the previous/ image in the
 * viewer. Will be mixed into ImageViewer automatically when loaded.
 *
 * @module aui-image-viewer-swipe
 */

var DEFAULT_HEIGHT = '90%',
    DEFAULT_WIDTH = '90%';

function ImageViewerSwipe() {}

ImageViewerSwipe.prototype = {
    WIDGET_INDEX_ATTRIBUTE: 'currentIndex',
    WIDGET_ITEM_SELECTOR: '.image-viewer-base-image-container'
};

ImageViewerSwipe.ATTRS = {
    /**
     * The height of the image viewer.
     *
     * @attribute height
     * @default '90%'
     * @type {String | Number}
     */
    height: {
        value: DEFAULT_HEIGHT
    },

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
    },

    /**
     * The width of the image viewer.
     *
     * @attribute width
     * @default '90%'
     * @type {String | Number}
     */
    width: {
        value: DEFAULT_WIDTH
    }
};

A.Base.mix(A.ImageViewerBase, [A.WidgetSwipe, ImageViewerSwipe]);
