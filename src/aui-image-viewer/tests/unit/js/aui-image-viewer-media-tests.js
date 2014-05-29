YUI.add('aui-image-viewer-media-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-image-viewer-media');

    suite.add(new Y.Test.Case({
        name: 'Media Viewer Plugin Tests',

        tearDown: function() {
            if (this._imageViewer) {
                this._imageViewer.destroy();
            }
        },

        _createImageViewer: function(config) {
            this._imageViewer = new Y.ImageViewer(Y.merge({
                caption: 'Some Caption',
                links: '#viewer a',
                plugins: [
                    {
                        fn: Y.MediaViewerPlugin
                    }
                ],
                preloadNeighborImages: false,
                zIndex: 1
            }, config || {})).render();
        },

        'should only render media content after load': function() {
            var media,
                mediaContainer;

            this._createImageViewer();

            media = this._imageViewer._getCurrentImage();
            Y.Assert.isNull(media, 'The media should not be rendered yet');

            this._imageViewer.getLink('0').simulate('click');

            media = this._imageViewer._getCurrentImage();
            mediaContainer = media.get('parentNode');

            Y.Assert.isNotNull(media, 'The media should have been rendered on load');
            Y.Assert.isFalse(
                mediaContainer.hasClass('image-viewer-loading'),
                'Media should not have loading indicator'
            );
        },

        'should still work with images': function() {
            var instance = this,
                image,
                imageContainer;

            this._createImageViewer();

            this._imageViewer.getLink('1').simulate('click');

            image = this._imageViewer._getCurrentImage();
            imageContainer = image.get('parentNode');

            Y.Assert.isTrue(
                imageContainer.hasClass('image-viewer-loading'),
                'Image should have started loading'
            );

            image.once('load', function() {
                instance.resume(function() {
                    Y.Assert.isFalse(
                        imageContainer.hasClass('image-viewer-loading'),
                        'Image should have finished loading'
                    );
                });
            });
            this.wait();
        },

        'should not render same media more than once': function() {
            var media,
                newMedia;

            this._createImageViewer();

            this._imageViewer.getLink('0').simulate('click');
            media = this._imageViewer._getCurrentImage();

            this._imageViewer.next();
            this._imageViewer.prev();
            newMedia = this._imageViewer._getCurrentImage();

            Y.Assert.areSame(
                media,
                newMedia,
                'Media node should not have been rerendered'
            );
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-image-viewer-media', 'node-event-simulate', 'test']
});