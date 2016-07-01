YUI.add('aui-video-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-video');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        setUp: function() {
            this._video = new Y.Video(
                {
                    boundingBox: '#demo',
                    width: 640,
                    height: 480,
                    url: 'http://videos.liferay.com/webinars/2010-08-11.mp4',
                    ogvUrl: 'http://videos.liferay.com/webinars/2010-08-11.ogv',
                    swfUrl: 'http://videos.liferay.com/common/player.swf',
                    fixedAttributes: {
                        allowfullscreen: 'true'
                    }
                }
            ).render();
        },

        tearDown: function() {
            this._video && this._video.destroy();
        },

        simulateResizeWindow: function(width, height) {
            var winNode = Y.one(Y.config.win);

            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                this._video._onWindowResize();
            }
            else {
                winNode.set('innerWidth', width || winNode.get('innerWidth'));
                winNode.set('innerHeight', height || winNode.get('innerHeight'));

                winNode.simulate('resize');
            }
        },

        'should video tag adjust it\'s size on window height changes': function() {
            var contentBox,
                instance,
                prevVideoPlayerHeight,
                prevVideoPlayerWidth,
                videoPlayer;

            instance = this;
            contentBox = this._video.get('contentBox');
            videoPlayer = contentBox.one('.video-node');
            prevVideoPlayerHeight = videoPlayer.height();
            prevVideoPlayerWidth = videoPlayer.width();

            instance.simulateResizeWindow(0, 200);

            this.wait(function() {
                Y.Assert.isTrue(prevVideoPlayerWidth > videoPlayer.width());
                Y.Assert.isTrue(prevVideoPlayerHeight > videoPlayer.height());

                Y.Assert.isTrue(contentBox.width() >= videoPlayer.width(), 'video width exceeds contentBox');
                Y.Assert.isTrue(contentBox.height() >= videoPlayer.height(), 'video height exceeds contentBox');

                prevVideoPlayerHeight = videoPlayer.height();
                prevVideoPlayerWidth = videoPlayer.width();

                instance.simulateResizeWindow(0, 2000);

            this.wait(function() {
                    Y.Assert.isTrue(prevVideoPlayerWidth < videoPlayer.width(), videoPlayer.width());
                    Y.Assert.isTrue(prevVideoPlayerHeight < videoPlayer.height());

                    Y.Assert.isTrue(contentBox.width() >= videoPlayer.width(), 'video width exceeds contentBox');
                    Y.Assert.isTrue(contentBox.height() >= videoPlayer.height(), 'video height exceeds contentBox');
                }, Y.config.windowResizeDelay || 100);
            }, Y.config.windowResizeDelay || 100);
        },

        'should video tag adjust it\'s size on window width changes': function() {
            var contentBox,
                instance,
                prevVideoPlayerHeight,
                prevVideoPlayerWidth,
                videoPlayer;

            instance = this;
            contentBox = this._video.get('contentBox');
            videoPlayer = contentBox.one('.video-node');
            prevVideoPlayerHeight = videoPlayer.height();
            prevVideoPlayerWidth = videoPlayer.width();

            instance.simulateResizeWindow(200, 0);

            this.wait(function() {
                Y.Assert.isTrue(prevVideoPlayerWidth > videoPlayer.width(), videoPlayer.width());
                Y.Assert.isTrue(prevVideoPlayerHeight > videoPlayer.height());

                Y.Assert.isTrue(contentBox.width() >= videoPlayer.width(), 'video width exceeds contentBox');
                Y.Assert.isTrue(contentBox.height() >= videoPlayer.height(), 'video height exceeds contentBox');

                prevVideoPlayerHeight = videoPlayer.height();
                prevVideoPlayerWidth = videoPlayer.width();

                instance.simulateResizeWindow(2000, 0);

            this.wait(function() {
                    Y.Assert.isTrue(prevVideoPlayerWidth < videoPlayer.width(), videoPlayer.width());
                    Y.Assert.isTrue(prevVideoPlayerHeight < videoPlayer.height());

                    Y.Assert.isTrue(contentBox.width() >= videoPlayer.width(), 'video width exceeds contentBox');
                    Y.Assert.isTrue(contentBox.height() >= videoPlayer.height(), 'video height exceeds contentBox');
                }, Y.config.windowResizeDelay || 100);
            }, Y.config.windowResizeDelay || 100);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-node', 'aui-video', 'node-event-simulate', 'event-resize', 'test']
});
