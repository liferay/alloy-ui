YUI.add('aui-timepicker-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-timepicker');

    suite.add(new Y.Test.Case({
        name: 'Timepicker Tests',

        getLocalTime: function () {
            var curTime,
                date,
                hour,
                localTime,
                minutes;

            date = new Date();
            curTime = new Date(date.toUTCString(Date.now()));

            hour = curTime.getHours();
            minutes = curTime.getMinutes();

            if (minutes > 44) {
                hour += 1;
            }

            if (minutes > 44 || minutes < 15) {
                minutes = ':00';
            }
            else {
                minutes = ':30';
            }

            localTime = hour + minutes;

            localTime = Date.parse(Y.Date.parse('%H:%M', localTime));

            return localTime;
        },

        getScrolledOptTime: function (format, popoverBody) {
            var currentOption,
                offsetTop,
                optionList,
                scrollTop,
                scrolledOptTime;

            scrollTop = popoverBody.get('scrollTop');

            optionList = popoverBody.all('.yui3-aclist-item');

            if (optionList) {
                for (var i = 0; i < optionList.size(); i++) {
                    currentOption = optionList.item(i);

                    offsetTop = currentOption.get('offsetTop');

                    if (offsetTop === scrollTop) {
                        scrolledOptTime = Date.parse(Y.Date.parse(format, currentOption.getHTML()));
                    }
                }
            }

            if (!scrolledOptTime) {
                popoverBody.set('scrollTop', (scrollTop + 1));

                if (scrollTop === popoverBody.get('scrollTop')) {
                    scrolledOptTime = this.getLocalTime();
                }
            }

            return scrolledOptTime;
        },

        selectTime: function(popoverBody, timeIndex) {
            var select,
                timeOpts;

                timeOpts = popoverBody.all('.yui3-aclist-item');

                select = timeOpts.item(timeIndex);

            select.simulate('click');
        },

        'timepicker should scroll to option nearest the current local time if input value is not defined': function() {
            var localTime,
                mask,
                popoverBody,
                scrolledOptTime,
                timePicker,
                trigger;

            timePicker = new Y.TimePicker({
                popover: {
                    visible: true
                },
                trigger: '#trigger'
            });

            mask = timePicker.get('mask');

            popoverBody = timePicker.getPopover().bodyNode;

            trigger = Y.one('#trigger');

            localTime = this.getLocalTime();

            trigger.simulate('click');

            scrolledOptTime = this.getScrolledOptTime(mask, popoverBody);

            timePicker.hide();

            Y.Assert.areEqual(localTime, scrolledOptTime, 'The timepicker did not scroll to the time nearest the current local time');
        },

        'timepicker should scroll to the option nearest the time value in the input field when input value is defined': function() {
            var inputTime,
                mask,
                popoverBody,
                scrolledOptTime,
                timePicker,
                trigger;

            timePicker = new Y.TimePicker({
                popover: {
                    visible: true
                },
                trigger: '#trigger1'
            });

            mask = timePicker.get('mask');
            popoverBody = timePicker.getPopover().bodyNode;

            trigger = Y.one('#trigger1');

            inputTime = Date.parse(Y.Date.parse(mask, trigger.get('value')));

            trigger.simulate('click');

            scrolledOptTime = this.getScrolledOptTime(mask, popoverBody);

            this.selectTime(popoverBody, 20);

            Y.Assert.areEqual(inputTime, scrolledOptTime, 'The timepicker did not scroll to the time nearest the current input value');

            inputTime = Date.parse(Y.Date.parse(mask, trigger.get('value')));

            trigger.simulate('click');

            scrolledOptTime = this.getScrolledOptTime(mask, popoverBody);

            timePicker.hide();

            Y.Assert.areEqual(
                inputTime,
                scrolledOptTime,
                'The timepicker did not scroll to the time matching the input value after a new time was chosen'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-datepicker', 'aui-timepicker', 'node-event-simulate']
});