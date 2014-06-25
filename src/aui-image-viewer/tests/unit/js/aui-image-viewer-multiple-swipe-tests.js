YUI.add('aui-image-viewer-multiple-swipe-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-image-viewer-multiple-swipe');

    suite.add(new Y.Test.Case({
        name: 'Image Viewer Multiple Swipe Tests',

        tearDown: function() {
            if (this._imageViewer) {
                this._imageViewer.destroy();
            }
        },

        _createImageViewer: function(config) {
            this._imageViewer = new Y.ImageViewerMultiple(Y.merge({
                height: 70,
                width: 200,
                sources: [
                    'assets/lfr-soccer-2.jpg',
                    'assets/lfr-soccer-3.jpg',
                    'assets/lfr-soccer-4.jpg',
                    'assets/lfr-soccer-5.jpg',
                    'assets/lfr-soccer-6.jpg'
                ]
            }, config)).render('#container');
        },

        'should load visible images when scrolling': function() {
            var mock = new Y.Mock();

            this._createImageViewer({
                preloadNeighborImages: false
            });

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onLoad0',
                args: [Y.Mock.Value.Object]
            });
            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onLoad1',
                args: [Y.Mock.Value.Object]
            });
            Y.Mock.expect(mock, {
                callCount: 1,
                method: 'onLoad2',
                args: [Y.Mock.Value.Object]
            });
            Y.Mock.expect(mock, {
                callCount: 1,
                method: 'onLoad3',
                args: [Y.Mock.Value.Object]
            });
            Y.Mock.expect(mock, {
                callCount: 1,
                method: 'onLoad4',
                args: [Y.Mock.Value.Object]
            });

            this._imageViewer.once('load0', mock.onLoad0);
            this._imageViewer.once('load1', mock.onLoad1);
            this._imageViewer.once('load2', mock.onLoad2);
            this._imageViewer.once('load3', mock.onLoad3);
            this._imageViewer.once('load4', mock.onLoad4);

            this._imageViewer._scrollView.set('scrollX', 150);

            Y.Mock.verify(mock);
        },

        'should scroll to show the current image when necessary': function() {
            var previousScrollX,
                scrollView;

            this._createImageViewer();

            scrollView = this._imageViewer._scrollView;
            Y.Assert.areEqual(
                0,
                scrollView.get('scrollX'),
                'Scroll position should start on left side'
            );

            previousScrollX = scrollView.get('scrollX'),
            this._imageViewer.set('currentIndex', 3);
            Y.Assert.isTrue(
                scrollView.get('scrollX') > previousScrollX,
                'Scroll position should have changed to show the image'
            );

            previousScrollX = scrollView.get('scrollX');
            this._imageViewer.set('currentIndex', 2);
            Y.Assert.isTrue(
                scrollView.get('scrollX') === previousScrollX,
                'Scroll position should not have changed'
            );

            previousScrollX = scrollView.get('scrollX');
            this._imageViewer.set('currentIndex', 0);
            Y.Assert.isTrue(
                scrollView.get('scrollX') < previousScrollX,
                'Scroll position should have changed to show the image'
            );
        },

        'should change current image on click': function() {
            var image;

            this._createImageViewer();

            image = this._imageViewer._getImageContainerAtIndex(1);
            image.simulate('mousedown');
            image.simulate('click');

            Y.Assert.areEqual(
                1,
                this._imageViewer.get('currentIndex'),
                'The currentIndex should have been updated after click'
            );
        },

        'should not change current image during swipe': function() {
            var image;

            this._createImageViewer();

            image = this._imageViewer._getImageContainerAtIndex(1);
            image.simulate('mousedown');

            this._imageViewer._scrollView.set('scrollX', 50);
            image.simulate('click');

            Y.Assert.areEqual(
                0,
                this._imageViewer.get('currentIndex'),
                'The currentIndex should not have been updated during swipe'
            );
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-image-viewer-multiple-swipe', 'node-event-simulate', 'test']
});
