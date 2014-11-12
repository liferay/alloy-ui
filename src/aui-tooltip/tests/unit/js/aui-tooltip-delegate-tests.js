YUI.add('aui-tooltip-delegate-tests', function(Y) {

    //--------------------------------------------------------------------------
    // AUI Tooltip Delegate Unit Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-tooltip-delegate');

    suite.add(new Y.Test.Case({
        tearDown: function() {
            this._delegate && this._delegate.destroy();
        },

        'should show tooltips for all triggers': function() {
            var tooltip,
                tooltipClass = 'tooltip-class',
                triggers = Y.all('.tooltip-btn');

            this._delegate = new Y.TooltipDelegate({
                cssClass: tooltipClass,
                trigger: '.tooltip-btn'
            });

            tooltip = this._delegate.getTooltip();

            triggers.each(function(trigger) {
                trigger.simulate('mouseover');

                Y.Assert.areEqual(
                    trigger,
                    tooltip.get('trigger'),
                    'Trigger should have been updated'
                );

                Y.Assert.isFalse(
                    tooltip.get('boundingBox').hasClass('tooltip-hidden'),
                    'Tooltip should not be hidden after mouseover'
                );

                Y.Assert.areEqual(
                    trigger.getAttribute('data-title'),
                    tooltip.get('contentBox').get('text'),
                    'Tooltip content should have been updated for this trigger'
                );

                Y.Assert.isTrue(
                    tooltip.get('boundingBox').hasClass(tooltipClass),
                    'Tooltip should have the class assigned in the constructor'
                );

                Y.Assert.areEqual(
                    tooltipClass,
                    tooltip.get('cssClass'),
                    'Tooltip object should have the assigned \'cssClass\' attribute'
                );

                trigger.simulate('mouseout');
            });
        }
    }));
    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-tooltip-delegate', 'node-event-simulate', 'test', 'node-base']
});
