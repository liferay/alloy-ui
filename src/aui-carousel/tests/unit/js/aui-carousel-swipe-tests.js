YUI.add('aui-carousel-swipe-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-carousel-swipe');

    suite.add(new Y.Test.Case({
        name: 'AUI Carousel Swipe Unit Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        tearDown: function() {
            if (this._carousel) {
                this._carousel.destroy();
            }
        },

        createCarousel: function(config) {
            var content = Y.Node.create('<div id="content"></div>'),
                images = Y.one('#images');

            content.setHTML(images.getHTML());
            this._container.append(content);

            config = Y.mix({
                contentBox: '#content',
                height: 300,
                intervalTime: 1,
                itemSelector: '> div,img',
                width: 940
            }, config || {});

            return new Y.Carousel(config).render();
        },

        'should animate when changing index through carousel': function() {
            var mock = new Y.Mock();

            this._carousel = this.createCarousel();

            Y.Mock.expect(mock, {
                callCount: 1,
                method: 'animationStart',
                args: [Y.Mock.Value.Object]
            });
            this._carousel.animation.on('start', mock.animationStart);

            this._carousel.set('activeIndex', 1);

            Y.Mock.verify(mock);
        },

        'should not animate when scrolling to image by swiping': function() {
            var mock = new Y.Mock();

            this._carousel = this.createCarousel();

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'animationStart',
                args: [Y.Mock.Value.Object]
            });
            this._carousel._scrollView.pages.scrollToIndex(2, 0);
            Y.Mock.verify(mock);
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-carousel-swipe', 'node-base', 'test']
});
