YUI.add('aui-char-counter-tests', function(Y) {

    var Lang = Y.Lang,
        suite = new Y.Test.Suite('aui-char-counter');

    suite.add(new Y.Test.Case({
        name: 'Char Counter Tests',

        init: function() {
            // Remove 'input' from DOM_EVENTS so we can simulate it
            // in the test by just calling 'fire', instead of having to
            // follow the whole logic in aui-event-input, which is unit
            // tested separately.
            delete Y.Node.DOM_EVENTS.input;
        },

        setUp: function() {
            this.input = Y.one('#input');
            this.input.set('value', '');

            this.counter = Y.one('#counter');
            this.counter.set('text', '');
        },

        tearDown: function() {
            this.charCounter && this.charCounter.destroy();
        },

        /**
         * Changes the test input's content and manually triggers the
         * 'input' event on it.
         */
        changeInputContent: function(content) {
            this.input.set('value', content);
            this.input.fire('input');
        },

        'should not allow text to exceed max': function() {
            this.charCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 5
            });

            this.changeInputContent('1');
            Y.Assert.areEqual('1', this.input.get('value'));

            this.changeInputContent('12345');
            Y.Assert.areEqual('12345', this.input.get('value'));

            this.changeInputContent('123456');
            Y.Assert.areEqual('12345', this.input.get('value'), 'The string 123456 exceeds the limit, so it should be cropped.');
        },

        'should not allow text to exceed max initially': function() {
            this.changeInputContent('123456');

            this.charCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 5
            });

            Y.Assert.areEqual('12345', this.input.get('value'), 'The value 123456 should be cropped after initializing the CharCounter.');
        },

        'should be able to trigger length check manually': function() {
            this.charCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 5
            });

            // Just setting the value directly won't trigger the 'input'
            // event that CharCounter listens to, so the user needs to
            // manually call checkLength instead.
            this.input.set('value', '123456');
            Y.Assert.areEqual('123456', this.input.get('value'));

            this.charCounter.checkLength();
            Y.Assert.areEqual('12345', this.input.get('value'));
        },

        'should ignore calls if input is not defined': function() {
            this.charCounter = new Y.CharCounter({
                maxLength: 5
            });

            Y.Assert.isFalse(this.charCounter.checkLength());
        },

        'should render remaining char count': function() {
            this.charCounter = new Y.CharCounter({
                input: this.input,
                counter: this.counter,
                maxLength: 5
            });

            Y.Assert.areEqual(5, Lang.toInt(this.counter.get('text')), 'Limit is set to 5 characters, initially there should be 5 characters remaining.');

            this.changeInputContent('1');
            Y.Assert.areEqual(4, Lang.toInt(this.counter.get('text')), 'Limit is set to 5 characters, 1 character added, remaining should be 4.');

            this.changeInputContent('12345');
            Y.Assert.areEqual(0, Lang.toInt(this.counter.get('text')), 'Limit is set to 5 characters, remaining should be 0.');

            this.changeInputContent('123456');
            Y.Assert.areEqual(0, Lang.toInt(this.counter.get('text')), 'Limit is set to 5 characters, remaining should be 0 and value should be cropped.');
        },

        'should work with max length changes': function() {
            this.charCounter = new Y.CharCounter({
                input: this.input,
                counter: this.counter,
                maxLength: 5
            });

            this.changeInputContent('12345');

            this.charCounter.set('maxLength', 2);

            Y.Assert.areEqual('12', this.input.get('value'), 'Max length set to 2, value should be cropped to \'12\'.');
            Y.Assert.areEqual(0, Lang.toInt(this.counter.get('text')), 'Expecting 0 remaining characters.');
        },

        'should trigger event when max length is reached': function() {
            var eventTriggered = false;

            this.charCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 5
            });

            this.charCounter.on('maxLength', function() {
                eventTriggered = true;
            });

            this.changeInputContent('123');
            Y.Assert.isFalse(eventTriggered, 'maxlength event should not be fired yet.');

            this.changeInputContent('12345');
            Y.Assert.isTrue(eventTriggered, 'Max length is set to 5 characters, and value to \'12345\',  maxLength event should be fired now.');
        },

        'should be destroyed correctly': function() {
            this.charCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 5
            });

            this.charCounter.destroy();

            // We invoked destroy manually, prevent double destroying in tearDown.
            this.charCounter = null;

            this.changeInputContent('123456');
            Y.Assert.areEqual('123456', this.input.get('value'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-char-counter', 'node']
});
