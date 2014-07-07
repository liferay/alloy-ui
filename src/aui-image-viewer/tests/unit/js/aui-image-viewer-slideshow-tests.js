YUI.add('aui-image-viewer-slideshow-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-image-viewer-slideshow'),
        ImageViewerWithSlideshow = Y.Base.create(
            'test-slideshow',
            Y.ImageViewerBase, [Y.ImageViewerSlideshow]
        );

    suite.add(new Y.Test.Case({
        name: 'Image Viewer Slideshow Tests',

        tearDown: function() {
            if (this._imageViewer) {
                this._imageViewer.destroy();
            }
        },

        assertPaused: function(callback) {
            var instance = this,
                previousIndex = this._imageViewer.get('currentIndex');

            this.wait(function() {
                Y.Assert.areEqual(
                    previousIndex,
                    instance._imageViewer.get('currentIndex'),
                    'Carousel was paused, so currentIndex should not have been updated'
                );

                callback && callback();
            }, (this._imageViewer.get('imageAnim').duration + this._imageViewer.get('intervalTime')) * 1000 + 100);
        },

        waitForNext: function(callback) {
            var instance = this,
                timeBefore = new Date().getTime();

            this._imageViewer.onceAfter('currentIndexChange', function() {
                instance.resume(function() {
                    callback(Math.round((new Date().getTime() - timeBefore) / 1000));
                });
            });

            this.wait();
        },

        _createImageViewer: function(config) {
            this._imageViewer = new ImageViewerWithSlideshow(Y.merge({
                intervalTime: 1,
                sources: [
                    'assets/lfr-soccer-2.jpg',
                    'assets/lfr-soccer-3.jpg',
                    'assets/lfr-soccer-4.jpg',
                    'assets/lfr-soccer-5.jpg',
                    'assets/lfr-soccer-6.jpg'
                ]
            }, config)).render('#container');
        },

        'should change the interval time': function() {
            var instance = this;

            this._createImageViewer();

            this.waitForNext(function(intervalTime1) {
                Y.Assert.isTrue(
                    intervalTime1 >= 1,
                    'Initial interval time is of at least 1 second'
                );

                instance._imageViewer.set('intervalTime', 2);
                instance.waitForNext(function(intervalTime2) {
                    Y.Assert.isTrue(
                        intervalTime2 >= 2,
                        'Interval time should have been updated to at least 2 seconds'
                    );
                });
            });
        },

        'should play/pause when functions are called': function() {
            var instance = this;

            this._createImageViewer();

            this._imageViewer.pause();

            this.assertPaused(function() {
                instance._imageViewer.play();

                instance.waitForNext(function() {
                    Y.Assert.areEqual(
                        1,
                        instance._imageViewer.get('currentIndex'),
                        'Carousel was resumed, so currentIndex should have been updated to 1'
                    );
                });
            });
        },

        'should play/pause when user clicks the button': function() {
            var instance = this,
                playerButton;

            this._createImageViewer();

            playerButton = this._imageViewer.get('boundingBox').one('.image-viewer-player');
            playerButton.simulate('click');

            this.assertPaused(function() {
                playerButton.simulate('click');

                instance.waitForNext(function() {
                    Y.Assert.areEqual(
                        1,
                        instance._imageViewer.get('currentIndex'),
                        'The viewer was resumed, so currentIndex should have been updated to 1'
                    );
                });
            });
        },

        'should work without a player when requested': function() {
            var playerButton;

            this._createImageViewer({
                showPlayer: false
            });

            playerButton = this._imageViewer.get('boundingBox').one('.image-viewer-player');
            Y.Assert.isNull(playerButton, 'Player should not have been rendered');
        },

        'should show/hide player as requested': function() {
            var playerButton;

            this._createImageViewer({
                showPlayer: false
            });

            this._imageViewer.set('showPlayer', true);

            playerButton = this._imageViewer.get('boundingBox').one('.image-viewer-player');
            Y.Assert.isNotNull(playerButton, 'Player should have been rendered');
            Y.Assert.areNotEqual(
                'none',
                playerButton.getStyle('display'),
                'Player should be visible'
            );

            this._imageViewer.set('showPlayer', false);
            Y.Assert.areEqual(
                'none',
                playerButton.getStyle('display'),
                'Player should have been hidden'
            );

            this._imageViewer.set('showPlayer', true);
            Y.Assert.areNotEqual(
                'none',
                playerButton.getStyle('display'),
                'Player should have been shown'
            );
        },

        'should pause when widget becomes invisible': function() {
            this._createImageViewer();

            this._imageViewer.set('visible', false);
            this.assertPaused();
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-image-viewer-base', 'aui-image-viewer-slideshow', 'node-event-simulate', 'test']
});
