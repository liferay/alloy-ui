YUI.add('aui-image-viewer-swipe-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-image-viewer-swipe');

    suite.add(new Y.Test.Case({
        name: 'Image Viewer Swipe Tests',

        setUp: function() {
            this._imageViewer = new Y.ImageViewer({
                links: '#viewer a',
                captionFromTitle: true
            }).render();
        },

        tearDown: function() {
            if (this._imageViewer) {
                this._imageViewer.destroy();
            }
        },

        'swipe attribute should have correct configuration': function() {
            var swipe = this._imageViewer.get('swipe');

            Y.Assert.areSame(
                this._imageViewer.get('contentBox'),
                swipe.boundingBox,
                'The viewer\'s content box should be the scroll view\'s bounding box'
            );
            Y.Assert.areSame(
                this._imageViewer.getStdModNode('body'),
                swipe.contentBox,
                'The viewer\'s body should be the scroll view\'s content box'
            );
        },

        'index attribute should be set correctly': function() {
            Y.Assert.areEqual(
                'currentIndex',
                this._imageViewer.WIDGET_INDEX_ATTRIBUTE,
                'The name of the viewer\'s index attribute is currentIndex'
            );

            Y.Assert.areEqual(
                '.image-viewer-image-container',
                this._imageViewer.WIDGET_ITEM_SELECTOR,
                'The viewer\'s items are defined by the image container css class'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-image-viewer-swipe', 'test']
});
