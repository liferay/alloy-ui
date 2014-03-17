YUI.add('aui-tooltip-tests', function(Y) {

    //--------------------------------------------------------------------------
    // AUI Tooltip Unit Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-tooltip');

    suite.add(new Y.Test.Case({
        name: 'Tooltips',
        '#1: Tooltip constructor should work without a config object.': function() {
            var tooltip = new Y.Tooltip();

            Y.Assert.isInstanceOf(
                Y.Tooltip,
                tooltip,
                'tooltip is not an instance of Y.Tooltip.');
        },

        '#2: #triggerTop button should have tooltip on top.': function() {
            new Y.Tooltip({
                position: 'top',
                trigger: '#triggerTop'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('top'),
                '.tooltip does not have class top.');
        },

        '#3: #triggerRight button should have tooltip on right': function() {
            new Y.Tooltip({
                position: 'right',
                trigger: '#triggerRight'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('right'),
                '.tooltip does not have class right.');
        },

        '#4: #triggerBottom button should have tooltip on bottom': function() {
            new Y.Tooltip({
                position: 'bottom',
                trigger: '#triggerBottom'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('bottom'),
                '.tooltip does not have class bottom.');
        },

        '#5: #triggerLeft button should have tooltip on left': function() {
            new Y.Tooltip({
                position: 'left',
                trigger: '#triggerLeft'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('left'),
                '.tooltip does not have class left.');
        },

        '#6: #triggerTooltipHelp button should display tooltip with class tooltip-help': function() {
            new Y.Tooltip({
                cssClass: 'tooltip-help',
                position: 'right',
                stickDuration: 25,
                trigger: '#triggerTooltipHelp'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('tooltip-help'),
                '.tooltip does not have class tooltip-help.');
        },

        '#7: .tooltip should be hidden when mouseout on #triggerTooltipHelp.': function() {
            var test = this,
                triggerTooltipHelp;

            Y.one('.tooltip');
            triggerTooltipHelp = Y.one('#triggerTooltipHelp');

            triggerTooltipHelp.once('mouseout', function() {
                setTimeout(function() {
                    test.resume(function() {
                        Y.Assert.isFalse(
                            Y.one('.tooltip').getStyle('opacity') > 0,
                            '.tooltip is not hidden.');

                        Y.Assert.isTrue(
                            Y.one('.tooltip').hasClass('tooltip-hidden'),
                            '.tooltip does not have class tooltip-hidden');
                    });
                }, 800);
            });

            setTimeout(function() {
                triggerTooltipHelp.simulate('mouseover');
                triggerTooltipHelp.simulate('mouseout');
            }, 0);

            test.wait(1000);
        },

        '#8: .tooltip should be visible when mouseover on #triggerTooltipHelp.': function() {
            var test = this,
                triggerTooltipHelp;

            Y.one('.tooltip');
            triggerTooltipHelp = Y.one('#triggerTooltipHelp');

            triggerTooltipHelp.once('mouseover', function() {
                setTimeout(function() {
                    test.resume(function() {
                        Y.Assert.isTrue(
                            Y.one('.tooltip').getStyle('opacity') > 0,
                            '.tooltip is hidden.');

                        Y.Assert.isFalse(
                            Y.one('.tooltip').hasClass('tooltip-hidden'),
                            '.tooltip should not have class tooltip-hidden');
                    });
                }, 800);
            });

            setTimeout(function() {
                triggerTooltipHelp.simulate('mouseover');
            }, 0);

            test.wait(1000);
        },

        '#9: .tooltip should be visible when mouse moves from #triggerTooltipHelp to .tooltip': function() {
            var test = this,
                tooltip = Y.one('.tooltip'),
                triggerTooltipHelp = Y.one('#triggerTooltipHelp');

            tooltip.once('mouseover', function() {
                setTimeout(function() {
                    test.resume(function() {
                        Y.Assert.isTrue(
                            Y.one('.tooltip').getStyle('opacity') > 0,
                            '.tooltip is visible.');

                        Y.Assert.isFalse(
                            Y.one('.tooltip').hasClass('tooltip-hidden'),
                            '.tooltip should not have class tooltip-hidden');
                    });
                }, 800);
            });

            setTimeout(function() {
                triggerTooltipHelp.simulate('mouseout');
                tooltip.simulate('mouseover');
            }, 0);

            test.wait(1000);
        },

        '#10: .tooltip should be hidden when mouseout of .tooltip.': function() {
            var test = this,
                tooltip = Y.one('.tooltip');

            Y.one('#triggerTooltipHelp');

            tooltip.once('mouseout', function() {
                setTimeout(function() {
                    test.resume(function() {
                        Y.Assert.isFalse(
                            Y.one('.tooltip').getStyle('opacity') > 0,
                            '.tooltip is visible.');

                        Y.Assert.isTrue(
                            Y.one('.tooltip').hasClass('tooltip-hidden'),
                            '.tooltip does not have class tooltip-hidden');
                    });
                }, 800);
            });

            setTimeout(function() {
                tooltip.simulate('mouseout');
            }, 0);

            test.wait(1000);
        },

        '#11: .tooltip should remain visible when mouse moves from .tooltip to #triggerTooltipHelp': function() {
            var test = this,
                tooltip = Y.one('.tooltip'),
                triggerTooltipHelp = Y.one('#triggerTooltipHelp');

            tooltip.once('mouseout', function() {
                setTimeout(function() {
                    test.resume(function() {
                        Y.Assert.isTrue(
                            Y.one('.tooltip').getStyle('opacity') > 0,
                            '.tooltip is hidden.');

                        Y.Assert.isFalse(
                            Y.one('.tooltip').hasClass('tooltip-hidden'),
                            '.tooltip should not have class tooltip-hidden');
                    });
                }, 800);
            });

            setTimeout(function() {
                triggerTooltipHelp.simulate('mouseover');
                triggerTooltipHelp.simulate('mouseout');
                tooltip.simulate('mouseover');
                tooltip.simulate('mouseout');
                triggerTooltipHelp.simulate('mouseover');
            }, 0);

            test.wait(1000);
        },

        // Tests: AUI-1092
        '#12 #triggerLeft\'s tooltip should not cover button #triggerBottom': function() {
            var test = this,
                tooltipLeft = Y.one('.tooltip.left'),
                triggerTooltipHelp = Y.one('#triggerTooltipHelp');

            tooltipLeft.once('mouseout', function() {
                setTimeout(function() {
                    test.resume(function() {
                        var condition = (tooltipLeft === null ||
                            tooltipLeft.getStyle('zIndex') < 0 || tooltipLeft.getComputedStyle(
                                'zIndex') < 0);

                        Y.Assert.isTrue(
                            condition,
                            '.tooltip.left does not have a z-index less than 0');
                    });
                }, 800);
            });

            setTimeout(function() {
                triggerTooltipHelp.simulate('mouseout');
                tooltipLeft.simulate('mouseover');
                tooltipLeft.simulate('mouseout');
            });

            test.wait(1000);
        }
    }));
    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-tooltip', 'node-event-simulate', 'test']
});
