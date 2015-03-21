YUI.add('aui-timepicker-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-timepicker');

    suite.add(new Y.Test.Case({
        name: 'Timepicker Tests',

        'timepicker should scroll to the option whose time is nearest the current time': function() {
            var timePicker = new Y.TimePicker({
                trigger: '#trigger'
            });

            var closestCurTime,
                convertTime,
                date = new Date(),
                doc = Y.one(document),
                hour = date.getHours(),
                minutes = date.getMinutes(),
                optionList,
                popover = timePicker.getPopover(),
                scrollTop,
                scrolledOption,
                trigger = Y.one('#trigger');

            if (minutes > 44) {
                hour += 1;
            }

            if (minutes > 44 || minutes < 15) {
                minutes = '00';
            }
            else {
                minutes = '30';
            }

            closestCurTime = hour + ':' + minutes;

            closestCurTime = timePicker.convertTimeToInt(closestCurTime);

            trigger.simulate('focus');

            scrollTop = popover.bodyNode.get('scrollTop');

            optionList = Y.all('.yui3-aclist-item');

            if (optionList) {
                optionList.each(
                    function(node) {
                        var offsetTop = node.get('offsetTop');

                        if (offsetTop == scrollTop) {
                            scrolledOption = timePicker.convertTimeToInt(node.getHTML());
                        }
                    }
                );
            }

            doc.simulate('click');

            Y.Assert.areEqual(closestCurTime, scrolledOption, 'The current time offset is not the same as the scroll offset');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-datepicker', 'aui-timepicker', 'node-event-simulate']
});
