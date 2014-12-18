YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-datepicker');

    suite.add(new Y.Test.Case({
        name: 'Datepicker Tests',

        'enterKey event should fire when enter key is pressed in the active input': function() {
            var test = this,
                enterKeydownCount = 0,
                keypress,
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

            keypress = function(trigger) {
                // Ideally we should focus and simulate a keydown event here, but
                // Yeti currently has a problem with tests that try to focus elements,
                // so we need to call the handler function directly here to test its
                // behavior.
                test.datePicker.set('activeInput', trigger);
                test.datePicker._handleKeydownEvent({
                    isKey: function() {
                        return true;
                    }
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