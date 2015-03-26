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

            // Remove 'compositionend' and 'compositionstart' from
            // DOM_EVENTS so we can simulate it in the test by just
            // calling 'fire'.
            delete Y.Node.DOM_EVENTS.compositionend;
            delete Y.Node.DOM_EVENTS.compositionstart;
        },

        setUp: function() {
            this.input = Y.one('#input');
            this.input.set('value', '');

            this.inputCounter = Y.one('#inputCounter');
            this.inputCounter.set('text', '');

            this.textarea = Y.one('#textarea');
            this.textarea.set('value', '');

            this.textareaCounter = Y.one('#textareaCounter');
            this.textareaCounter.set('text', '');
        },

        tearDown: function() {
            this.inputCharCounter && this.inputCharCounter.destroy();
            this.textareaCharCounter && this.textareaCharCounter.destroy();
        },

        /**
         * Changes the test input's content and manually triggers the
         * 'input' event on it.
         */
        changeInputContent: function(content) {
            this.input.set('value', content);
            this.input.fire('input');

            this.textarea.set('value', content);
            this.textarea.fire('input');
        },

        'should not allow text to exceed max': function() {
            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 5
            });

            this.textareaCharCounter = new Y.CharCounter({
                input: this.textarea,
                maxLength: 5
            });

            this.changeInputContent('1');
            Y.Assert.areEqual('1', this.input.val());
            Y.Assert.areEqual('1', this.textarea.val());

            this.changeInputContent('12345');
            Y.Assert.areEqual('12345', this.input.val());
            Y.Assert.areEqual('12345', this.textarea.val());

            this.changeInputContent('123456');
            Y.Assert.areEqual('12345', this.input.val(),
                'The string 123456 exceeds the limit, so it should be cropped.');
            Y.Assert.areEqual('12345', this.textarea.val(),
                'The string 123456 exceeds the limit, so it should be cropped.');
        },

        'should not allow text to exceed max initially': function() {
            this.changeInputContent('123456');

            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 5
            });

            this.textareaCharCounter = new Y.CharCounter({
                input: this.textarea,
                maxLength: 5
            });

            Y.Assert.areEqual('12345', this.input.val(),
                'The value 123456 should be cropped after initializing the CharCounter.');
            Y.Assert.areEqual('12345', this.textarea.val(),
                'The value 123456 should be cropped after initializing the CharCounter.');
        },

        'should be able to trigger length check manually': function() {
            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 5
            });

            this.textareaCharCounter = new Y.CharCounter({
                input: this.textarea,
                maxLength: 5
            });

            // Just setting the value directly won't trigger the 'input'
            // event that CharCounter listens to, so the user needs to
            // manually call checkLength instead.
            this.input.set('value', '123456');
            this.textarea.set('value', '123456');
            Y.Assert.areEqual('123456', this.input.val());
            Y.Assert.areEqual('123456', this.textarea.val());

            this.inputCharCounter.checkLength();
            this.textareaCharCounter.checkLength();

            Y.Assert.areEqual('12345', this.input.val());
            Y.Assert.areEqual('12345', this.textarea.val());
        },

        'should ignore calls if input is not defined': function() {
            this.inputCharCounter = new Y.CharCounter({
                maxLength: 5
            });

            Y.Assert.isFalse(this.inputCharCounter.checkLength());
        },

        'should return truthy if input is defined': function() {
            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 1
            });

            Y.Assert.isTrue(this.inputCharCounter.checkLength());
        },

        'should return trimmed value length if input is trimmed': function() {
            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 1
            });

            this.changeInputContent('12');

            Y.Assert.areEqual('1', this.inputCharCounter.checkLength());
        },


        'should render remaining char count': function() {
            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                counter: this.inputCounter,
                maxLength: 5
            });

            this.textareaCharCounter = new Y.CharCounter({
                input: this.textarea,
                counter: this.textareaCounter,
                maxLength: 5
            });

            Y.Assert.areEqual(5, Lang.toInt(this.inputCounter.text()),
                'Limit is set to 5 characters, initially there should be 5 characters remaining.');
            Y.Assert.areEqual(5, Lang.toInt(this.textareaCounter.text()),
                'Limit is set to 5 characters, initially there should be 5 characters remaining.');

            this.changeInputContent('1');
            Y.Assert.areEqual(4, Lang.toInt(this.inputCounter.text()),
                'Limit is set to 5 characters, 1 character added, remaining should be 4.');
            Y.Assert.areEqual(4, Lang.toInt(this.textareaCounter.text()),
                'Limit is set to 5 characters, 1 character added, remaining should be 4.');

            this.changeInputContent('12345');
            Y.Assert.areEqual(0, Lang.toInt(this.inputCounter.text()),
                'Limit is set to 5 characters, remaining should be 0.');
            Y.Assert.areEqual(0, Lang.toInt(this.textareaCounter.text()),
                'Limit is set to 5 characters, remaining should be 0.');

            this.changeInputContent('123456');
            Y.Assert.areEqual(0, Lang.toInt(this.inputCounter.text()),
                'Limit is set to 5 characters, remaining should be 0 and value should be cropped.');
            Y.Assert.areEqual(0, Lang.toInt(this.textareaCounter.text()),
                'Limit is set to 5 characters, remaining should be 0 and value should be cropped.');
        },

        'should work with max length changes': function() {
            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                counter: this.inputCounter,
                maxLength: 5
            });

            this.textareaCharCounter = new Y.CharCounter({
                input: this.textarea,
                counter: this.textareaCounter,
                maxLength: 5
            });

            this.changeInputContent('12345');

            this.inputCharCounter.set('maxLength', 2);
            this.textareaCharCounter.set('maxLength', 2);

            Y.Assert.areEqual('12', this.input.val(),
                'Max length set to 2, value should be cropped to \'12\'.');
            Y.Assert.areEqual('12', this.textarea.val(),
                'Max length set to 2, value should be cropped to \'12\'.');
            Y.Assert.areEqual(0, Lang.toInt(this.inputCounter.text()), 'Expecting 0 remaining characters.');
            Y.Assert.areEqual(0, Lang.toInt(this.textareaCounter.text()), 'Expecting 0 remaining characters.');
        },

        'should trigger event when max length is reached': function() {
            var eventTriggered = false;

            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 5
            });

            this.textareaCharCounter = new Y.CharCounter({
                input: this.textarea,
                maxLength: 5
            });

            this.inputCharCounter.on('maxLength', function() {
                eventTriggered = true;
            });

            this.textareaCharCounter.on('maxLength', function() {
                eventTriggered = true;
            });

            this.changeInputContent('123');
            Y.Assert.isFalse(eventTriggered, 'maxlength event should not be fired yet.');

            this.changeInputContent('12345');
            Y.Assert.isTrue(eventTriggered,
                'Max length is set to 5 characters, and value to \'12345\',  maxLength event should be fired now.'
            );
        },

        'should be destroyed correctly': function() {
            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 5
            });

            this.textareaCharCounter = new Y.CharCounter({
                input: this.textarea,
                maxLength: 5
            });

            this.inputCharCounter.destroy();
            this.textareaCharCounter.destroy();

            // We invoked destroy manually, prevent double destroying in tearDown.
            this.inputCharCounter = null;
            this.textareaCharCounter = null;

            this.changeInputContent('123456');
            Y.Assert.areEqual('123456', this.input.val());
            Y.Assert.areEqual('123456', this.textarea.val());
        },

        'should treat new lines in textareas as 2 characters': function() {
            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                maxLength: 10
            });

            this.textareaCharCounter = new Y.CharCounter({
                input: this.textarea,
                maxLength: 10
            });

            this.changeInputContent('12345\n67890');

            Y.Assert.areEqual(10, this.input.val().length);
            Y.Assert.areEqual(9, this.textarea.val().length);

            this.changeInputContent('12345\r\n67890');

            Y.Assert.areEqual(10, this.input.val().length);
            Y.Assert.areEqual(9, this.textarea.val().length);
        },

        'character counter should never be negative': function() {
            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                counter: this.inputCounter,
                maxLength: 10
            });

            this.textareaCharCounter = new Y.CharCounter({
                input: this.textarea,
                counter: this.textareaCounter,
                maxLength: 10
            });

            this.changeInputContent('12345\n67890');

            Y.Assert.isTrue(Lang.toInt(this.inputCounter.text()) >= 0);
            Y.Assert.isTrue(Lang.toInt(this.textareaCounter.text()) >= 0);

            this.changeInputContent('12345\r\n67890');

            Y.Assert.isTrue(Lang.toInt(this.inputCounter.text()) >= 0);
            Y.Assert.isTrue(Lang.toInt(this.textareaCounter.text()) >= 0);
        },

        'should not truncate value during IME composition': function() {
            this.inputCharCounter = new Y.CharCounter({
                input: this.input,
                counter: this.inputCounter,
                maxLength: 10
            });

            this.textareaCharCounter = new Y.CharCounter({
                input: this.textarea,
                counter: this.textareaCounter,
                maxLength: 10
            });

            this.input.fire('compositionstart');
            this.textarea.fire('compositionstart');

            this.changeInputContent('12345678901');

            Y.Assert.areEqual(11, this.input.val().length);
            Y.Assert.areEqual(11, this.textarea.val().length);

            this.input.fire('compositionend');
            this.textarea.fire('compositionend');

            Y.Assert.areEqual(10, this.input.val().length);
            Y.Assert.areEqual(10, this.textarea.val().length);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-char-counter', 'node']
});
