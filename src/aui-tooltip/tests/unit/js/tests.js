YUI.add('aui-tooltip-tests', function(Y) {

    //--------------------------------------------------------------------------
    // AUI Tooltip Base Unit Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-tooltip');

    suite.add(new Y.Test.Case({
        name: 'Tooltips',
        'should Tooltip constructor work without a config object': function() {
            var tooltip = new Y.Tooltip();

            Y.Assert.isInstanceOf(
                Y.Tooltip,
                tooltip,
                'tooltip is not an instance of Y.Tooltip.');
        },

        'should have tooltip on top': function() {
            new Y.Tooltip({
                position: 'top',
                trigger: '#triggerTop'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('top'),
                '.tooltip does not have class top.');
        },

        'should have tooltip on right': function() {
            new Y.Tooltip({
                position: 'right',
                trigger: '#triggerRight'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('right'),
                '.tooltip does not have class right.');
        },

        'should have tooltip on bottom': function() {
            new Y.Tooltip({
                position: 'bottom',
                trigger: '#triggerBottom'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('bottom'),
                '.tooltip does not have class bottom.');
        },

        'should have tooltip on left': function() {
            new Y.Tooltip({
                position: 'left',
                trigger: '#triggerLeft'
            }).render();

            Y.Assert.isTrue(
                Y.one('.tooltip').hasClass('left'),
                '.tooltip does not have class left.');
        },

        'should display tooltip with class tooltip-help': function() {
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

        'should be hidden when mouseout on #triggerTooltipHelp': function() {
            var test = this,
                tooltip = Y.one('.tooltip'),
                triggerTooltipHelp = Y.one('#triggerTooltipHelp');

            triggerTooltipHelp.once('mouseout', function() {
                setTimeout(function() {
                    test.resume(function() {
                        Y.Assert.isFalse(
                            tooltip.getStyle('opacity') > 0,
                            '.tooltip is not hidden.');

                        Y.Assert.isTrue(
                            tooltip.hasClass('tooltip-hidden'),
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

        'should be visible when mouseover on #triggerTooltipHelp': function() {
            var test = this,
                tooltip = Y.one('.tooltip'),
                triggerTooltipHelp = Y.one('#triggerTooltipHelp');

            triggerTooltipHelp.once('mouseover', function() {
                setTimeout(function() {
                    test.resume(function() {
                        Y.Assert.isTrue(
                            tooltip.getStyle('opacity') > 0,
                            '.tooltip is hidden.');

                        Y.Assert.isFalse(
                            tooltip.hasClass('tooltip-hidden'),
                            '.tooltip should not have class tooltip-hidden');
                    });
                }, 800);
            });

            setTimeout(function() {
                triggerTooltipHelp.simulate('mouseover');
            }, 0);

            test.wait(1000);
        },

        'should be visible when mouse moves from #triggerTooltipHelp to .tooltip': function() {
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

        'should be hidden when mouseout of .tooltip': function() {
            var test = this,
                tooltip = Y.one('.tooltip');

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

        'should remain visible when mouse moves from .tooltip to #triggerTooltipHelp': function() {
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
        'should not cover button #triggerBottom': function() {
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
        },

        'should format the content as requested': function() {
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

        'should create tooltip without trigger': function() {
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

        'should create tooltip without title': function() {
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
        },

        'should update position on resize from .tooltip on triggerResize': function() {
            var bodyContent = 'Some Content',
                button = Y.one('#triggerResize'),
                oldPosition,
                tooltip;

            tooltip = new Y.Tooltip({
                align: {
                    node: button
                },
                trigger: '#triggerResize',
                bodyContent: bodyContent
            }).render();

            oldPosition = tooltip.get('boundingBox').get('offsetTop');

            // This simulates moving the button as the window resizes.
            button.setStyle('position', 'relative');
            button.setStyle('top', '20px');
            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                tooltip._onResize();
            } else {
                Y.one(Y.config.win).simulate('resize');
            }

            this.wait(function() {
                Y.Assert.areEqual(
                    oldPosition + 20,
                    tooltip.get('boundingBox').get('offsetTop'),
                    'Trigger was moved down, so the popover should be moved as well'
                );
            }, Y.config.windowResizeDelay || 100);
        },

        'should update position on scrolling from .tooltip on triggerScroll': function() {
            var bodyContent = 'Some Content',
                button = Y.one('#triggerScroll'),
                oldPosition,
                tooltip;

            tooltip = new Y.Tooltip({
                align: {
                    node: button
                },
                position: 'bottom',
                trigger: '#triggerScroll',
                bodyContent: bodyContent
            }).render();

            oldPosition = tooltip.get('contentBox').get('region').top;
            window.scrollTo(0, 20);

            this.wait(function() {

                Y.Assert.areEqual(
                    oldPosition + 20,
                    tooltip.get('contentBox').get('region').top,
                    'Trigger are out of viewport and there is a scroll on page, so the tooltip should be moved as well'
                );
            }, 500);
        }
    }));
    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-tooltip', 'node-event-simulate', 'test']
});
