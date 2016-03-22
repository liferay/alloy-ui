YUI.add('module-tests', function(Y) {

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
            var tooltip = new Y.Tooltip({
                position: 'top',
                trigger: '#triggerTop'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('top'),
                '.tooltip does not have class top.');
        },

        '#3: #triggerRight button should have tooltip on right': function() {
            var tooltip = new Y.Tooltip({
                position: 'right',
                trigger: '#triggerRight'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('right'),
                '.tooltip does not have class right.');
        },

        '#4: #triggerBottom button should have tooltip on bottom': function() {
            var tooltip = new Y.Tooltip({
                position: 'bottom',
                trigger: '#triggerBottom'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('bottom'),
                '.tooltip does not have class bottom.');
        },

        '#5: #triggerLeft button should have tooltip on left': function() {
            var tooltip = new Y.Tooltip({
                position: 'left',
                trigger: '#triggerLeft'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('left'),
                '.tooltip does not have class left.');
        },

        '#6: #triggerTooltipHelp button should display tooltip with class tooltip-help': function() {
            var tooltip = new Y.Tooltip({
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
                tooltip = Y.one('.tooltip'),
                triggerTooltipHelp = Y.one('#triggerTooltipHelp');

            triggerTooltipHelp.once('mouseout', function(e) {
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
                tooltip = Y.one('.tooltip'),
                triggerTooltipHelp = Y.one('#triggerTooltipHelp');

            triggerTooltipHelp.once('mouseover', function(e) {
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

            tooltip.once('mouseover', function(e) {
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
                tooltip = Y.one('.tooltip'),
                triggerTooltipHelp = Y.one('#triggerTooltipHelp');

            tooltip.once('mouseout', function(e) {
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

            tooltip.once('mouseout', function(e) {
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

        /**
         * @tests AUI-1092
         */
        '#12 #triggerLeft\'s tooltip should not cover button #triggerBottom': function() {
            var condition,
                tooltipLeft = Y.one('.tooltip.left'),
                triggerTooltipHelp = Y.one('#triggerTooltipHelp');

            triggerTooltipHelp.simulate('mouseout');
            tooltipLeft.simulate('mouseover');
            tooltipLeft.simulate('mouseout');

            condition = (tooltipLeft === null ||
                tooltipLeft.getStyle('zIndex') < 0 || tooltipLeft.getComputedStyle(
                    'zIndex') < 0);

            Y.Assert.isTrue(
                condition,
                '.tooltip.left does not have a z-index less than 0');
        },

        '#13 should format the content as requested': function() {
            var tooltip = new Y.Tooltip({
                formatter: function(text) {
                    return text.toUpperCase();
                },
                trigger: '#triggerTooltipFormatted'
            }).render();

            Y.Assert.areEqual(
                'TEST',
                tooltip.get('contentBox').get('text'),
                'Tooltip content should be uppercase'
            );
        },

        '#14 should create tooltip without trigger': function() {
            var tooltip = new Y.Tooltip({
                contentBox: '#noTrigger'
            }).render();

            Y.Assert.isTrue(
                tooltip.get('boundingBox').hasClass('tooltip'),
                'Bounding box should have the tooltip class'
            );
            Y.Assert.areEqual(
                'noTrigger',
                tooltip.get('contentBox').get('id'),
                'Content box should be the original element'
            );
        },

        '#15 should create tooltip without title': function() {
            var bodyContent = 'Some Content',
                tooltip;

            tooltip = new Y.Tooltip({
                trigger: '#triggerNoTitle',
                bodyContent: bodyContent
            }).render();

            Y.Assert.areEqual(
                bodyContent,
                tooltip.get('contentBox').get('text'),
                'Body content should have been used as the tooltip\'s content'
            );
        },

        'should create tooltip with html content': function() {
            var html = '<b>foo</b>',
                text = 'foo',
                tooltip;

            tooltip = new Y.Tooltip({
                trigger: '#triggerHtml',
                bodyContent: html,
                html: true
            }).render();

            Y.Assert.areEqual(
                text,
                tooltip.get('contentBox').get('text'),
                'Body content text should be with no HTML markup'
            );

            tooltip.set('html', false);
            tooltip.set('bodyContent', html);

            Y.Assert.areEqual(
                html,
                tooltip.get('contentBox').get('text'),
                'Body content text should be with no HTML markup'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-tooltip', 'node-event-simulate', 'test']
});
