YUI.add('aui-image-cropper-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Image Cropper Tests
    //--------------------------------------------------------------------------

    var IE = Y.UA.ie;

    var suite = new Y.Test.Suite('aui-image-cropper');

    var imageCropper = new Y.ImageCropper({
        srcNode: '#image',
        x: 100,
        y: 100
    }).render();

    //--------------------------------------------------------------------------
    // Test Case for resizing Image Cropper
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        // Tests: AUI-1369
        'assert resize does not trigger image drag': function() {
            var bottomRightHandle = Y.one('.yui3-resize-handle-br'),
                simulationEvent = 'mousedown',
                test = this;

            if (IE) {
                if (IE == 10) {
                    simulationEvent = 'MSPointerDown';
                }
                else if (IE > 10) {
                    simulationEvent = 'pointerdown';
                }
            }

            bottomRightHandle.simulate(simulationEvent);

            setTimeout(function() {
                test.resume(function() {
                    Y.Assert.isFalse(imageCropper._isDragging(), 'Image should not be dragging');
                });
            }, 2500);

            test.wait(3500);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-image-cropper', 'node-event-simulate']
});
