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
            this._imageViewer = new Y.ImageViewer(Y.merge({
                links: '#viewer a',
                captionFromTitle: true,
                zIndex: 1
            }, config));

            if (!skipRender) {
                this._imageViewer.render();
            }
        },

        'should show loading indicator until image is ready': function() {
            var instance = this,
                imageContainer,
                image;

            this._createImageViewer({
                preloadNeighborImages: false
            });

            this._imageViewer.getLink('0').simulate('click');

            image = this._imageViewer._getCurrentImage();
            imageContainer = image.get('parentNode');
            Y.Assert.isTrue(
                imageContainer.hasClass('image-viewer-loading'),
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
            var instance = this,
                image,
                mock = new Y.Mock();

            this._createImageViewer({
                preloadNeighborImages: false
            });

            this._imageViewer.getLink('1').simulate('click');
            image = this._imageViewer._getCurrentImage();

            image.once('load', function() {
                instance.resume(function() {
                    Y.Assert.isNotUndefined(
                        image.fx,
                        'NodeFX should have been added to the image'
                    );

                    Y.Mock.expect(mock, {
                        callCount: 1,
                        method: 'onAnim',
                        args: [Y.Mock.Value.Object]
                    });
                    instance._imageViewer.once('anim', mock.onAnim);

                    image.fx.once('end', function() {
                        instance.resume(function() {
                            Y.Mock.verify(mock);
                        });
                    });
                    instance.wait();
                });
            });
            this.wait();
        },

        'should not animate new images if requested': function() {
            var instance = this,
                image;

            this._createImageViewer({
                anim: false,
                preloadNeighborImages: false
            });

            this._imageViewer.getLink('2').simulate('click');
            image = this._imageViewer._getCurrentImage();

            image.once('load', function() {
                instance.resume(function() {
                    Y.Assert.isUndefined(
                        image.fx,
                        'NodeFX should not have been added to the image'
                    );
                });
            });
            this.wait();
        },

        'should not wait for images to load for the second time': function() {
            var instance = this,
                image;

            this._createImageViewer({
                preloadNeighborImages: false
            });

            this._imageViewer.getLink('3').simulate('click');
            image = this._imageViewer._getCurrentImage();

            Y.Assert.areEqual(
                1,
                image.getComputedStyle('opacity'),
                'Image should not be ready for animation yet'
            );
            image.once('load', function() {
                instance.resume(function() {
                    Y.Assert.areEqual(
                        0,
                        image.getComputedStyle('opacity'),
                        'Image should be ready for animation after first load'
                    );

                    image.fx.once('end', function() {
                        instance.resume(function() {
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

        'should have fixed width/height if requested': function() {
            var height = 300,
                width = 500;

            this._createImageViewer({
                height: height,
                width: width,
                preloadNeighborImages: false
            });

            this._imageViewer.getLink('0').simulate('click');

            Y.Assert.areEqual(
                height + 'px',
                this._imageViewer.get('boundingBox').getStyle('height'),
                'Height should have been added to the bounding box'
            );
            Y.Assert.areEqual(
                width + 'px',
                this._imageViewer.get('boundingBox').getStyle('width'),
                'Width should have been added to the bounding box'
            );

            width = 200;
            this._imageViewer.set('width', width);
            Y.Assert.areEqual(
                width + 'px',
                this._imageViewer.get('boundingBox').getStyle('width'),
                'Width should have been added to the bounding box'
            );
        },

        'should update width to fit in maxWidth': function() {
            var instance = this,
                boundingBox,
                image,
                imageContainer,
                initialWidth,
                maxWidth;

            this._createImageViewer({
                preloadNeighborImages: false
            });

            this._imageViewer.getLink('4').simulate('click');

            boundingBox = this._imageViewer.get('boundingBox');
            image = this._imageViewer._getCurrentImage();
            imageContainer = image.get('parentNode');

            image.once('load', function() {
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

        'should open image viewer when clicking one of the links': function() {
            this._createImageViewer();

            Y.Assert.areEqual(
                5,
                this._imageViewer.get('links').size(),
                'The viewer should have 5 links'
            );

            Y.Assert.isFalse(
                this._imageViewer.get('visible'),
                'Image viewer should not be visible yet'
            );

            this._imageViewer.getLink(1).simulate('click');

            Y.Assert.isTrue(
                this._imageViewer.get('visible'),
                'Image viewer should be visible now'
            );

            Y.Assert.areEqual(
                1,
                this._imageViewer.get('currentIndex'),
                'Current item should be the second one'
            );
        },

        'should allow links to be changed dynamically': function() {
            this._createImageViewer();

            this._imageViewer.set('links', '#viewer .viewer');
            Y.Assert.areEqual(
                2,
                this._imageViewer.get('links').size(),
                'The viewer now only has 2 links'
            );

            this._imageViewer.set('links', Y.all('#viewer a'));
            Y.Assert.areEqual(
                5,
                this._imageViewer.get('links').size(),
                'The viewer now has 3 links'
            );

            this._imageViewer.set('links', Y.all('#viewer a').item(0));
            Y.Assert.areEqual(
                1,
                this._imageViewer.get('links').size(),
                'The viewer now only has 1 link'
            );
        },

        'should go to the next item': function() {
            var button;

            this._createImageViewer();

            this._imageViewer.getLink(2).simulate('click');

            button = Y.one('.carousel-control.right');
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

            this._createImageViewer();

            this._imageViewer.getLink(2).simulate('click');

            button = Y.one('.carousel-control.left');
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

        'should close image viewer when requested': function() {
            this._createImageViewer();

            this._imageViewer.getLink(0).simulate('click');

            Y.one('.image-viewer-close').simulate('click');

            Y.Assert.isFalse(
                this._imageViewer.get('visible'),
                'The image viewer should not be visible anymore'
            );
        },

        'should work with keyboard controls': function() {
            var doc = Y.getDoc();

            this._createImageViewer();

            this._imageViewer.getLink(0).simulate('click');

            doc.simulate('keydown', {
                keyCode: 39
            });
            Y.Assert.areEqual(
                1,
                this._imageViewer.get('currentIndex'),
                'Current item should have been updated to the next item'
            );

            doc.simulate('keydown', {
                keyCode: 37
            });
            Y.Assert.areEqual(
                0,
                this._imageViewer.get('currentIndex'),
                'Current item should have been updated to the previous item'
            );

            doc.simulate('keydown', {
                keyCode: 27
            });
            Y.Assert.isFalse(
                this._imageViewer.get('visible'),
                'The image viewer should not be visible anymore'
            );
        },

        'should not work with keyboard controls when hidden': function() {
            var doc = Y.getDoc();

            this._createImageViewer();

            doc.simulate('keydown', {
                keyCode: 39
            });
            Y.Assert.areEqual(
                0,
                this._imageViewer.get('currentIndex'),
                'Current item should not have been updated while invisible'
            );
        },

        'should render caption from the title of the link': function() {
            var captionNode,
                currentLink;

            this._createImageViewer();

            captionNode = this._imageViewer.get('boundingBox').one('.image-viewer-caption');
            currentLink = this._imageViewer.getLink(0);
            currentLink.simulate('click');

            Y.Assert.areEqual(
                currentLink.getAttribute('title'),
                captionNode.get('text'),
                'Caption should be equal to the first link\'s title'
            );

            this._imageViewer.next();

            Y.Assert.areEqual(
                this._imageViewer.getLink(1).getAttribute('title'),
                captionNode.get('text'),
                'Caption should be equal to the second link\'s title'
            );
        },

        'should render the same caption for all images when requested': function() {
            var caption = 'My Test Caption',
                captionNode;

            this._createImageViewer({
                caption: caption,
                captionFromTitle: false
            });

            captionNode = this._imageViewer.get('boundingBox').one('.image-viewer-caption');
            this._imageViewer.getLink(0).simulate('click');

            Y.Assert.areEqual(
                caption,
                captionNode.get('text'),
                'Caption should be equal to the config param'
            );

            this._imageViewer.next();

            Y.Assert.areEqual(
                caption,
                captionNode.get('text'),
                'Caption should be equal to the config param'
            );
        },

        'should use default caption if none is specified in title': function() {
            var caption = 'My Test Caption',
                captionNode;

            this._createImageViewer({
                caption: caption
            });

            captionNode = this._imageViewer.get('boundingBox').one('.image-viewer-caption');
            this._imageViewer.getLink(2).simulate('click');

            Y.Assert.areEqual(
                caption,
                captionNode.get('text'),
                'Caption should be equal to the config param'
            );
        },

        'should load neighbour images by default': function() {
            var mock = new Y.Mock();

            this._createImageViewer();

            Y.Mock.expect(mock, {
                callCount: 2,
                method: 'onLoad',
                args: [Y.Mock.Value.Object]
            });

            this._imageViewer.once('load0', mock.onLoad);
            this._imageViewer.once('load1', mock.onLoad);
            this._imageViewer.once('load2', mock.onLoad);

            this._imageViewer.getLink('0').simulate('click');
            Y.Mock.verify(mock);

            Y.Mock.expect(mock, {
                callCount: 3,
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

            this._imageViewer.getLink('0').simulate('click');
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

            this._createImageViewer();

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onLoad',
                args: [Y.Mock.Value.Object]
            });
            this._imageViewer.once('load0', mock.onLoad);

            this._imageViewer.set('currentIndex', 0);
            Y.Mock.verify(mock);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-image-viewer-base', 'node-event-simulate', 'test']
});
