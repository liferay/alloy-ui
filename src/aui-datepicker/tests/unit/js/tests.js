YUI.add('aui-datepicker-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-datepicker');

    suite.add(new Y.Test.Case({
        name: 'Datepicker Tests',

        selectDate: function(dayIndex, options) {
            var popover = this.datePicker.getPopover(),
                dayCells = popover.bodyNode.all('.yui3-calendar-day'),
                os = Y.UA.os,
                toClick = dayCells.item(dayIndex);

                var option = options || {};

                if ((options && !Y.Object.isEmpty(options)) && (os === 'macintosh'))  {
                    option = { metaKey: true };
                }

            toClick.simulate('click', option);
        },

        tearDown: function() {
            this.datePicker.destroy();
        },

        'selectionChange event should only fire when selection changes': function() {
            var selectionChangeCount = 0,
                trigger = Y.one('#trigger');

            this.datePicker = new Y.DatePicker({
                on: {
                    selectionChange: function() {
                        selectionChangeCount++;
                    }
                },
                popover: {
                    zIndex: 1
                },
                panes: 1,
                trigger: '#trigger'
            });

            Y.Assert.areEqual(0, selectionChangeCount);

            trigger.simulate('click');

            Y.Assert.areEqual(0, selectionChangeCount);

            this.selectDate(0);

            Y.Assert.areEqual(1, selectionChangeCount);

            trigger.simulate('click');

            this.selectDate(1);

            Y.Assert.areEqual(2, selectionChangeCount);
        },

        'selectionChange event should not fire when switching between datepickers': function() {
            var selectionChangeCount = 0,
                triggerA = Y.one('#triggerA'),
                triggerB = Y.one('#triggerB');

            this.datePicker = new Y.DatePicker({
                on: {
                    selectionChange: function() {
                        selectionChangeCount++;
                    }
                },
                popover: {
                    zIndex: 1
                },
                panes: 1,
                trigger: '#triggerA, #triggerB'
            });

            triggerA.simulate('click');

            this.selectDate(0);

            triggerB.simulate('click');

            this.selectDate(1);

            Y.Assert.areEqual(2, selectionChangeCount);

            triggerA.simulate('click');

            Y.Assert.areEqual(2, selectionChangeCount);

            triggerB.simulate('click');

            Y.Assert.areEqual(2, selectionChangeCount);
        },

        'selectionChange event should fire when removing date from selection': function() {
            var selectionChangeCount = 0,
                trigger = Y.one('#inputTrigger');

            this.datePicker = new Y.DatePicker({
                calendar: {
                    selectionMode: 'multiple'
                },
                mask: '%a, %b %d, %Y',
                on: {
                    selectionChange: function() {
                        selectionChangeCount++;
                    }
                },
                popover: {
                    zIndex: 1
                },
                panes: 1,
                trigger: '#inputTrigger'
            });

            trigger.focus();

            trigger.simulate('click');

            this.selectDate(0);

            trigger.simulate('click');

            this.selectDate(1, { ctrlKey: true });

            trigger.simulate('click');

            this.selectDate(2, { ctrlKey: true });

            trigger.simulate('click');

            this.selectDate(1, { ctrlKey: true });

            Y.Assert.areEqual(5, selectionChangeCount);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-datepicker', 'node-event-simulate']
});