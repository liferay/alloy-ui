YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-datepicker');

    suite.add(new Y.Test.Case({
        name: 'Datepicker Tests',

        'enterKey event should fire when enter key is pressed in the active input': function() {
            var enterKeydownCount = 0,
                triggers = [
                    '#inputTriggerA',
                    '#inputTriggerB',
                    '#inputTriggerC',
                    '#inputTriggerB',
                    '#inputTriggerA'
                ];

            this.datePicker = new Y.DatePicker({
                on: {
                    enterKey: function() {
                        enterKeydownCount++;
                    }
                },
                trigger: triggers.join()
            });

            triggers.forEach(function(trigger) {
                trigger = Y.one(trigger);

                trigger.focus();

                trigger.simulate('keydown', {
                    keyCode: 13
                });
            });

            Y.Assert.areEqual(5, enterKeydownCount);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-datepicker', 'node-event-simulate']
});