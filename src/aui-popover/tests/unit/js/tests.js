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

        'assert popover appears on the same position after toggling visibility': function() {
            var equal,
                newPosition,
                oldPosition,
                popoverBottom,
                popoverTop;

            popoverTop = new Y.Popover({
                bodyContent: 'One fine body…',
                headerContent: 'Header content',
                plugins: [Y.Plugin.WidgetAnim],
                trigger: '#triggerTop'
            }).render();

            popoverBottom = new Y.Popover({
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
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-popover', 'widget-anim']
});
