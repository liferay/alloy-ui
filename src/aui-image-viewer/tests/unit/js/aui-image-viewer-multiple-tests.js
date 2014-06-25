YUI.add('aui-image-viewer-multiple-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-image-viewer-multiple');

    suite.add(new Y.Test.Case({
        name: 'Image Viewer Multiple Tests',

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

        'should load all visible images': function() {
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
                callCount: 1,
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
                callCount: 0,
                method: 'onLoad4',
                args: [Y.Mock.Value.Object]
            });

            this._imageViewer.once('load0', mock.onLoad0);
            this._imageViewer.once('load1', mock.onLoad1);
            this._imageViewer.once('load2', mock.onLoad2);
            this._imageViewer.once('load3', mock.onLoad3);
            this._imageViewer.once('load4', mock.onLoad4);

            this._imageViewer.set('currentIndex', 3);

            Y.Mock.verify(mock);
        },

        'should update currentIndex when an image is clicked': function() {
            var image;

            this._createImageViewer();

            Y.Assert.areEqual(
                0,
                this._imageViewer.get('currentIndex'),
                'Current index should have been updated'
            );

            image = this._imageViewer._getImageContainerAtIndex(2);
            image.simulate('click');

            Y.Assert.areEqual(
                2,
                this._imageViewer.get('currentIndex'),
                'Current index should have been updated'
            );
        },

        'should scroll to show the current image when necessary': function() {
            var list,
                previousScrollLeft;

            this._createImageViewer();

            list = this._imageViewer.get('contentBox').one('.image-viewer-base-image-list');
            Y.Assert.areEqual(
                0,
                list.get('scrollLeft'),
                'Scroll position should start on left side'
            );

            previousScrollLeft = list.get('scrollLeft');
            this._imageViewer.set('currentIndex', 3);
            Y.Assert.isTrue(
                list.get('scrollLeft') > previousScrollLeft,
                'Scroll position should have changed to show the image'
            );

            previousScrollLeft = list.get('scrollLeft');
            this._imageViewer.set('currentIndex', 2);
            Y.Assert.isTrue(
                list.get('scrollLeft') === previousScrollLeft,
                'Scroll position should not have changed'
            );

            previousScrollLeft = list.get('scrollLeft');
            this._imageViewer.set('currentIndex', 0);
            Y.Assert.isTrue(
                list.get('scrollLeft') < previousScrollLeft,
                'Scroll position should have changed to show the image'
            );
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-image-viewer-multiple', 'node-event-simulate', 'test']
});
