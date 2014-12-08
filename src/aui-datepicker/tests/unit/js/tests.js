YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-datepicker');

    suite.add(new Y.Test.Case({
        name: 'Datepicker Tests',

        'enterKey event should fire when enter key is pressed in the active input': function() {
            var enterKeydownCount = 0,
                triggerA = Y.one('#inputTriggerA'),
                triggerB = Y.one('#inputTriggerB'),
                triggerC = Y.one('#inputTriggerC');

            this.datePicker = new Y.DatePicker({
                on: {
                    enterKey: function() {
                        enterKeydownCount++;
                    }
                },
                trigger: '#inputTriggerA, #inputTriggerB, #inputTriggerC'
            });

            var keypress = function(trigger) {
                trigger.focus();

                trigger.simulate('keydown', {
                    keyCode: 13
                });
            };

            keypress(triggerA);

            Y.Assert.areEqual(1, enterKeydownCount);

            keypress(triggerB);

            Y.Assert.areEqual(2, enterKeydownCount);

            keypress(triggerC);

            Y.Assert.areEqual(3, enterKeydownCount);

            keypress(triggerB);

            Y.Assert.areEqual(4, enterKeydownCount);

            keypress(triggerA);

            Y.Assert.areEqual(5, enterKeydownCount);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-datepicker', 'node-event-simulate']
});