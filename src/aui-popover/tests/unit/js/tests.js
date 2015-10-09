YUI.add('aui-popover-tests', function(Y) {

    //--------------------------------------------------------------------------
    // AUI Popover Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-popover');

    //--------------------------------------------------------------------------
    // Test Case for aligning the Popover
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Test Popover appearance after toggling visibility',

        tearDown: function() {
            if (this._popover) {
                this._popover.destroy();
            }
        },

        'assert popover appears on the same position after toggling visibility': function() {
            var equal,
                newPosition,
                oldPosition,
                popoverBottom,
                popoverTop;

            popoverTop = new Y.Popover({
                align: {
                    node: '#triggerTop'
                },
                bodyContent: 'One fine body…',
                headerContent: 'Header content',
                plugins: [Y.Plugin.WidgetAnim],
                trigger: '#triggerTop'
            }).render();

            popoverBottom = new Y.Popover({
                align: {
                    node: '#triggerBottom'
                },
                bodyContent: 'Another fine body…',
                headerContent: 'Header content',
                position: 'bottom',
                trigger: '#triggerBottom'
            }).render();

            oldPosition = Y.one('.popover').get('offsetLeft');

            popoverBottom.set('visible', false);

            popoverBottom.set('visible', true);

            newPosition = Y.one('.popover').get('offsetLeft');

            // Firefox shows widget the second time with one pixel difference, ignore it for now
            equal = (newPosition - oldPosition) <= 1 ? true : false;

            Y.Test.Assert.isTrue(equal, 'The old and new widget position should be equal.');

            popoverBottom.destroy();
            popoverTop.destroy();
        },

        'should update position on resize': function() {
            var button = Y.one('#triggerTop'),
                oldPosition;

            this._popover = new Y.Popover({
                align: {
                    node: button
                },
                bodyContent: 'Body content',
                headerContent: 'Header content',
                trigger: button
            }).render();

            oldPosition = Y.one('.popover').get('offsetTop');

            // This simulates moving the button as the window resizes.
            button.setStyle('position', 'relative');
            button.setStyle('top', '20px');
            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                this._popover._onResize();
            }
            else {
                Y.one(Y.config.win).simulate('resize');
            }

            this.wait(function() {
                Y.Assert.areEqual(
                    oldPosition + 20,
                    Y.one('.popover').get('offsetTop'),
                    'Trigger was moved down, so the popover should be moved as well'
                );
            }, Y.config.windowResizeDelay || 100);
        },

        'should be destroyed': function() {
            this._popover = new Y.Popover({
                align: {
                    node: '#triggerTop'
                },
                bodyContent: 'Body content',
                headerContent: 'Header content',
                trigger: '#triggerTop'
            }).render();

            this._popover.destroy();
            this._popover = null;

            Y.Assert.isNull(
                Y.one('.popover'),
                'The popover element shouldn\'t exist after being destroyed'
            );
        },

        'should keep inside of the viewport if attribute constrain is true': function() {
            var button = Y.one('#triggerTop');

            this._popover = new Y.Popover({
                align: {
                    node: button
                },
                bodyContent: 'Body content',
                headerContent: 'Header content',
                position: 'top',
                constrain: true,
                trigger: button
            }).render();

            button.setStyle('position', 'relative');
            button.setStyle('top', '-20000px');
            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                this._popover._onResize();
            }
            else {
                Y.one(Y.config.win).simulate('resize');
            }

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, Y.config.windowResizeDelay || 100);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-popover', 'widget-anim', 'node-event-simulate']
});
