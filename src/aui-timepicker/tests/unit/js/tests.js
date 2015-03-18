YUI.add('aui-timepicker-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-timepicker');

    suite.add(new Y.Test.Case({
        name: 'Timepicker Tests',

        'timepicker should scroll to the option whose time is nearest the current time': function() {
            this.timePicker = new Y.TimePicker({
                trigger: '#trigger'
            });

            var convertTime,
                date = new Date(),
                doc = Y.one(document),
                hour = date.getHours(),
                minutes = date.getMinutes(),
                popover = this.timePicker.getPopover(),
                scrolledOption,
                trigger = Y.one('#trigger');

            convertTime = function(time) {
                var dateTime = [date.getMonth() + 1, date.getDate(), date.getFullYear(), time];

                var convertedTime = Date.parse(dateTime.join(' '));

                return convertedTime;
            };

            if (minutes > 44) {
                hour += 1;
            }

            if (minutes > 44 || minutes < 15) {
                minutes = '00';
            }
            else {
                minutes = '30';
            }

            var closestCurTime = hour + ':' + minutes;

            closestCurTime = convertTime(closestCurTime);

            trigger.simulate('focus');

            var scrollTop = popover.bodyNode.get('scrollTop');

            var optionList = Y.all('.yui3-aclist-item');

            if (optionList) {
                optionList.each(
                    function(node) {
                        var offsetTop = node.get('offsetTop');

                        if (offsetTop == scrollTop) {
                            scrolledOption = convertTime(node.getHTML());
                        }
                    }
                );
            }

            doc.simulate('click');

            Y.Assert.areEqual(closestCurTime, scrolledOption);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-datepicker', 'aui-timepicker', 'node-event-simulate']
});
