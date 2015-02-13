YUI.add('aui-image-cropper-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Image Cropper Tests
    //--------------------------------------------------------------------------

    var IE = Y.UA.ie;

    var suite = new Y.Test.Suite('aui-image-cropper');

    var cropHeight = 50;
    var cropWidth = 200;

    //--------------------------------------------------------------------------
    // Test Case for resizing Image Cropper
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        setUp: function() {
            var imageNode = '<img id="image" src="../../../../demos/image-cropper/assets/lfr-soccer-1.jpg" />';

            Y.one('#imageWrapper').append(imageNode);

            this.imageCropper = new Y.ImageCropper({
                srcNode: '#image',
                x: 100,
                y: 100,
                cropHeight: cropHeight,
                cropWidth: cropWidth
            });
        },

        tearDown: function() {
            this.imageCropper.destroy();
        },

        // Tests: AUI-1369
        'assert resize does not trigger image drag': function() {
            this.imageCropper.render();

            var bottomRightHandle = Y.one('.yui3-resize-handle-br'),
                simulationEvent = 'mousedown',
                simulationEndEvent = 'mouseup',
                test = this;

            if (IE) {
                if (IE === 10) {
                    simulationEvent = 'MSPointerDown';
                    simulationEndEvent = 'MSPointerUp';
                }
                else if (IE > 10) {
                    simulationEvent = 'pointerdown';
                    simulationEndEvent = 'pointerup';
                }
            }

            bottomRightHandle.simulate(simulationEvent);

            setTimeout(function() {
                test.resume(function() {
                    Y.Assert.isFalse(this.imageCropper._isDragging(), 'Image should not be dragging');

                    bottomRightHandle.simulate(simulationEndEvent);
                });
            }, 2500);

            test.wait(3500);
        },

        // Tests: AUI-1837
        'assert image cropper works correctly when image is centered': function() {
            this.imageCropper.render();

            var cropNode = this.imageCropper.cropNode,
                imageNode = this.imageCropper.get('srcNode'),
                inRegion = imageNode.intersect(cropNode).inRegion;

            Y.Assert.isTrue(inRegion);
        },

        'assert cropNode dimensions are correct when image is hidden when rendered': function() {
            var hideClass = 'hide',
                imageWrapper = Y.one('#imageWrapper');

            if (IE && IE < 9) {
                hideClass = 'sr-only';
            }

            imageWrapper.addClass(hideClass);

            this.imageCropper.render();

            imageWrapper.removeClass(hideClass);

            var cropNode = this.imageCropper.cropNode;

            var renderedCropHeight = cropNode.outerHeight();
            var renderedCropWidth = cropNode.outerWidth();

            Y.Assert.areSame(renderedCropHeight, cropHeight);
            Y.Assert.areSame(renderedCropWidth, cropWidth);
        },

        'assert image cropping is accurate when image node has max-height or max-width': function() {
            var backgroundSize,
                image,
                imageCropper = this.imageCropper;

            image = imageCropper.get('srcNode');
            image.setStyles({
                maxHeight: 400,
                maxWidth: 400
            });

            imageCropper.render();

            backgroundSize = imageCropper.cropNode.getComputedStyle('backgroundSize');

            Y.Assert.areSame(backgroundSize, image.outerWidth() + 'px ' + image.outerHeight() + 'px');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-image-cropper', 'node-event-simulate']
});
