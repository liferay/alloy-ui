YUI.add('aui-image-viewer-base-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-image-viewer-base');

    suite.add(new Y.Test.Case({
        name: 'Image Viewer Base Tests',

        tearDown: function() {
            if (this._imageViewer) {
                this._imageViewer.destroy();
            }
        },

        _createImageViewer: function(config, skipRender) {
            this._imageViewer = new Y.ImageViewerBase(Y.merge({
                sources: [
                    'assets/lfr-soccer-2.jpg',
                    'assets/lfr-soccer-3.jpg',
                    'assets/lfr-soccer-4.jpg',
                    'assets/lfr-soccer-5.jpg',
                    'assets/lfr-soccer-6.jpg'
                ],
                preloadNeighborImages: false
            }, config));

            if (!skipRender) {
                this._imageViewer.render('#container');
            }
        },

        _testNodeContentVisibility: function() {
            var boundingBox = this._imageViewer.get('boundingBox'),
                nodeContent = boundingBox.one('.image-viewer-base-node-content'),
                parentNode = nodeContent.get('parentNode');

            Y.Assert.isNotNull(
                nodeContent,
                'A Node in the markeup with class image-viewer-base-node-content should be used in the viewer.'
            );

            this._imageViewer.set('currentIndex', 0);

            Y.Assert.isFalse(
                parentNode.hasClass('image-viewer-base-current-image'),
                'Node content should not be visible when it is not the current image.'
            );

            this._imageViewer.set('currentIndex', 1);

            Y.Assert.isTrue(
                parentNode.hasClass('image-viewer-base-current-image'),
                'Node content should be visible when it is the current image.'
            );
        },

        'should update the css z-index property when the zIndex attribute (inherited from WidgetStack) change': function() {
            var boundingBox;

            this._createImageViewer();
            boundingBox = this._imageViewer.get('boundingBox');

            Y.Assert.areEqual(0, boundingBox.getStyle('z-index'));
            this._imageViewer.set('zIndex', 2103);
            Y.Assert.areEqual(2103, boundingBox.getStyle('z-index'));
        },

        'should show loading indicator until image is ready': function() {
            var instance = this,
                imageContainer,
                image;

            this._createImageViewer();

            image = this._imageViewer._getCurrentImage();
            imageContainer = image.get('parentNode');
            Y.Assert.isTrue(
                imageContainer.hasClass('image-viewer-base-loading'),
                'Image should have loading css class'
            );

            image.once('load', function() {
                instance.resume(function() {
                    Y.Assert.isFalse(
                        imageContainer.hasClass('image-viewer-loading'),
                        'Image should not have loading css class anymore'
                    );
                });
            });
            this.wait();
        },

        'should animate new images by default': function() {
            var instance = this;

            this._createImageViewer({
                currentIndex: 1
            });

            this._imageViewer.onceAfter('animate', function() {
                instance.resume(function() {
                    Y.Assert.areSame(
                        instance._imageViewer._getCurrentImage(),
                        instance._imageViewer._animation.get('node'),
                        'Animation should be tied to the current image'
                    );
                });
            });
            this.wait();
        },

        'should not animate new images if requested': function() {
            var instance = this;

            this._createImageViewer({
                currentIndex: 2,
                imageAnim: false
            });

            this._imageViewer.onceAfter('animate', function() {
                instance.resume(function() {
                    Y.Assert.isUndefined(
                        instance._imageViewer._animation,
                        'Animation should have been created'
                    );
                });
            });
            this.wait();
        },

        'should not wait for images to load for the second time': function() {
            var instance = this,
                eventHandle,
                image;

            this._createImageViewer({
                currentIndex: 3
            });

            image = this._imageViewer._getCurrentImage();

            Y.Assert.areEqual(
                1,
                image.getComputedStyle('opacity'),
                'Image should not be ready for animation yet'
            );
            this._imageViewer.onceAfter('animate', function() {
                instance.resume(function() {
                    Y.Assert.areEqual(
                        0,
                        image.getComputedStyle('opacity'),
                        'Image should be ready for animation after first load'
                    );

                    eventHandle = instance._imageViewer._animation.once('end', function() {
                        instance.resume(function() {
                            eventHandle.detach();

                            Y.Assert.areEqual(
                                1,
                                image.getComputedStyle('opacity'),
                                'Image should be visible after animation'
                            );

                            instance._imageViewer.prev();
                            instance._imageViewer.next();

                            Y.Assert.areEqual(
                                0,
                                image.getComputedStyle('opacity'),
                                'Image should be instantly ready for animation'
                            );
                        });
                    });
                    instance.wait();
                });
            });
            this.wait();
        },

        'should update width to fit in maxWidth': function() {
            var instance = this,
                boundingBox,
                image,
                imageContainer,
                initialWidth,
                maxWidth;

            this._createImageViewer({
                currentIndex: 4
            });

            boundingBox = this._imageViewer.get('boundingBox');
            image = this._imageViewer._getCurrentImage();
            imageContainer = image.get('parentNode');

            this._imageViewer.onceAfter('animate', function() {
                instance.resume(function() {
                    initialWidth = boundingBox.get('offsetWidth');
                    maxWidth = initialWidth / 2;

                    instance._imageViewer.set('maxWidth', maxWidth);
                    Y.Assert.isTrue(
                        boundingBox.get('offsetWidth') <= maxWidth,
                        'Width should change to fit in the maxWidth'
                    );
                });
            });
            this.wait();
        },

        'should go to the next item': function() {
            var button;

            this._createImageViewer({
                currentIndex: 2
            });

            button = Y.one('.image-viewer-base-control-right');
            button.simulate('click');

            Y.Assert.areEqual(
                3,
                this._imageViewer.get('currentIndex'),
                'Current item should have been updated to the next item'
            );

            button.simulate('click');

            Y.Assert.areEqual(
                4,
                this._imageViewer.get('currentIndex'),
                'Current item should have been updated to the next item'
            );

            button.simulate('click');

            Y.Assert.areEqual(
                4,
                this._imageViewer.get('currentIndex'),
                'Current item should not be changed, since it was the last one'
            );
        },

        'should go to the previous item': function() {
            var button;

            this._createImageViewer({
                currentIndex: 2
            });

            button = Y.one('.image-viewer-base-control-left');
            button.simulate('click');

            Y.Assert.areEqual(
                1,
                this._imageViewer.get('currentIndex'),
                'Current item should have been updated to the previous item'
            );

            button.simulate('click');

            Y.Assert.areEqual(
                0,
                this._imageViewer.get('currentIndex'),
                'Current item should have been updated to the previous item'
            );

            button.simulate('click');

            Y.Assert.areEqual(
                0,
                this._imageViewer.get('currentIndex'),
                'Current item should not be changed, since it was the first one'
            );
        },

        'should load neighbour images if requested': function() {
            var mock = new Y.Mock();

            this._createImageViewer({
                preloadNeighborImages: true
            });

            Y.Mock.expect(mock, {
                callCount: 3,
                method: 'onLoad',
                args: [Y.Mock.Value.Object]
            });

            this._imageViewer.once('load0', mock.onLoad);
            this._imageViewer.once('load1', mock.onLoad);
            this._imageViewer.once('load2', mock.onLoad);

            this._imageViewer.set('currentIndex', 1);
            Y.Mock.verify(mock);

            Y.Mock.expect(mock, {
                callCount: 2,
                method: 'onLoad',
                args: [Y.Mock.Value.Object]
            });

            this._imageViewer.once('load0', mock.onLoad);
            this._imageViewer.once('load1', mock.onLoad);
            this._imageViewer.once('load2', mock.onLoad);

            this._imageViewer.next();
            Y.Mock.verify(mock);
        },

        'should not preload neighbour images if requested': function() {
            var mock = new Y.Mock();

            this._createImageViewer({
                preloadNeighborImages: false
            });

            Y.Mock.expect(mock, {
                callCount: 1,
                method: 'onLoad',
                args: [Y.Mock.Value.Object]
            });

            this._imageViewer.once('load0', mock.onLoad);
            this._imageViewer.once('load1', mock.onLoad);
            this._imageViewer.once('load2', mock.onLoad);

            this._imageViewer.set('currentIndex', 1);
            Y.Mock.verify(mock);
        },

        'should load all images at once if requested': function() {
            var mock = new Y.Mock();

            this._createImageViewer({
                preloadAllImages: true
            }, true);

            Y.Mock.expect(mock, {
                callCount: 3,
                method: 'onLoad',
                args: [Y.Mock.Value.Object]
            });

            this._imageViewer.once('load0', mock.onLoad);
            this._imageViewer.once('load1', mock.onLoad);
            this._imageViewer.once('load2', mock.onLoad);

            this._imageViewer.render();
            Y.Mock.verify(mock);
        },

        'should not load images when invisible': function() {
            var mock = new Y.Mock();

            this._createImageViewer({
                visible: false
            });

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onLoad',
                args: [Y.Mock.Value.Object]
            });
            this._imageViewer.once('load1', mock.onLoad);

            this._imageViewer.set('currentIndex', 1);
            Y.Mock.verify(mock);
        },

        'should treat images as circular when requested': function() {
            this._createImageViewer({
                circular: true
            });

            this._imageViewer.prev();
            Y.Assert.areEqual(
                4,
                this._imageViewer.get('currentIndex'),
                'Last item should be the current one, since viewer is circular'
            );

            this._imageViewer.next();
            Y.Assert.areEqual(
                0,
                this._imageViewer.get('currentIndex'),
                'First item should be the current one, since viewer is circular'
            );
        },

        'should set current index to random number': function() {
            var mock = new Y.Mock(),
                oldRandom = Math.random,
                value = 0.4;

            this._createImageViewer();

            // Switch Math.random with a mock during this test so we can check that it's
            // being called correctly.
            Y.Mock.expect(mock, {
                callCount: 1,
                method: 'fakeRandom',
                returns: value
            });
            Math.random = mock.fakeRandom;

            this._imageViewer.set('currentIndex', 'rand');
            Y.Assert.areEqual(
                2,
                this._imageViewer.get('currentIndex'),
                'currentIndex should be set to a value determined by Math.random'
            );

            Y.Mock.verify(mock);

            // Restore the original Math.random function as the test ends.
            Math.random = oldRandom;
        },

        'should populate images from existing elements': function() {
            this._imageViewer = new Y.ImageViewerBase({
                currentIndex: 2,
                srcNode: '#htmlparser'
            }).render();

            Y.Assert.areEqual(
                3,
                this._imageViewer.get('sources').length,
                'Sources should have been populated from the srcNode'
            );

            Y.Assert.isTrue(
                this._imageViewer.get('controlPrevious').hasClass('custom-control-previous'),
                'The previous control should have the custom class'
            );

            Y.Assert.isTrue(
                this._imageViewer.get('controlNext').hasClass('custom-control-next'),
                'The next control should have the custom class'
            );
        },

        'should accept both images and node sources': function() {
            this._imageViewer = new Y.ImageViewerBase({
                currentIndex: 2,
                sources: [
                    'assets/lfr-soccer-2.jpg',
                    Y.Node.create('<div class="image-viewer-base-node-content">Test Content</div>'),
                    'assets/lfr-soccer-4.jpg'
                ]
            }).render('#container');

            this._testNodeContentVisibility();
        },

        'should populate images from existing nodes': function() {
            this._imageViewer = new Y.ImageViewerBase({
                currentIndex: 2,
                srcNode: '#htmlparser2'
            }).render();

            this._testNodeContentVisibility();
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-image-viewer-base', 'node-event-simulate', 'test']
});
