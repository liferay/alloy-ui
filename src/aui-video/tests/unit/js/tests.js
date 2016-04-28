YUI.add('aui-video-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-video');

    var height = 480;
    var width = 640;
    var video;

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        setUp: function(config) {
            if (video) {
                video.destroy();
            }

            video = new Y.Video(
                {
                    boundingBox: '#demo',
                    width: width,
                    height: height,
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
            video && video.destroy();
        },

        'video player bounding box should not have height or width set': function() {
            var windowHeight = Y.one(Y.config.win).height();
            var windowWidth = Y.one(Y.config.win).width();

            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                video._onWindowResize();
            }
            else {
                Y.one(Y.config.win).simulate('resize');
            }

            setTimeout(function() {
                var contentBox = video.get('contentBox');

                var videoPlayer = contentBox.one('.video-node');

                if (videoPlayer) {
                    var aspectRatio = height / width;

                    if (windowWidth < width) {
                        Y.Assert.areSame(windowWidth, videoPlayer.width(), 'Video node width should be the same size as the window width.');
                    }

                    if (windowHeight < height) {
                        Y.Assert.areSame(windowHeight, videoPlayer.height(), 'Video node height should be the same size as the window height.');
                    }
                }
            }, 100);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-node', 'aui-video', 'node-event-simulate', 'event-resize', 'test']
});
