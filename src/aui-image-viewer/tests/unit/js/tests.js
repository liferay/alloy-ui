YUI.add('aui-image-viewer-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-image-viewer');

    suite.add(new Y.Test.Case({
        name: 'Image Viewer Tests',

        tearDown: function() {
            if (this._imageViewer) {
                this._imageViewer.destroy();
            }
        },

        _createImageViewer: function(config) {
            this._imageViewer = new Y.ImageViewer(Y.merge({
                links: '#viewer a',
                captionFromTitle: true,
                zIndex: 1
            }, config)).render();
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

        'should open image viewer when clicking one of the links': function() {
            this._createImageViewer();

            Y.Assert.areEqual(
                3,
                this._imageViewer.get('links').size(),
                'The viewer should have 3 links'
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
                3,
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
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-image-viewer', 'node-event-simulate', 'test']
});
