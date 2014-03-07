YUI.add('aui-event-tests', function(Y) {

    //--------------------------------------------------------------------------
    // EventInput Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-event'),

        KeyMap = Y.Event.KeyMap,

        input = Y.one('input'),

        hasNativeInput = Y.Features.test('event', 'input');

    //--------------------------------------------------------------------------
    // Test Case for event dispatch
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Firing event',

        _should: {
            ignore: {
                'input event': hasNativeInput,
                'detach input event': hasNativeInput,
                'do not dispatch on not modifying keys': hasNativeInput
            }
        },

        setUp: function() {
            var instance = this;

            input.val('');

            instance._eventHandles = [];
        },

        tearDown: function() {
            var instance = this;

            (new Y.EventHandle(instance._eventHandles)).detach();
        },

        //----------------------------------------------------------------------
        // Tests
        //----------------------------------------------------------------------

        /*
         * Checks that the synthetic input event is fired as expected when input
         * content changes.
         *
         * Tests: AUI-749
         */
        'input event': function() {
            var instance = this,
                mock = new Y.Mock();

            Y.Mock.expect(
                mock, {
                    args: [YUITest.Mock.Value.Object],
                    callCount: 1,
                    method: 'onInput'
                }
            );

            instance._eventHandles.push(
                input.on('input', mock.onInput, instance)
            );

            // Simulating keydown events does not update the input value. Need
            // to do it manually to mimic browser behaviour properly.
            input.focus();
            input.simulate('keydown', {
                keyCode: KeyMap.A
            });
            input.val('a');

            instance.wait(
                function() {
                    Y.Mock.verify(mock);
                },
                0
            );
        },

        /*
         * Checks that the synthetic input event is detached properly.
         *
         * Tests: AUI-749
         */
        'detach input event': function() {
            var instance = this,
                mock = new Y.Mock();

            Y.Mock.expect(
                mock, {
                    args: [YUITest.Mock.Value.Object],
                    callCount: 1,
                    method: 'onInput'
                }
            );

            var onInput = input.on('input', mock.onInput, instance);

            // Simulating keydown events does not update the input value. Need
            // to do it manually to mimic browser behaviour properly.
            input.focus();
            input.simulate('keydown', {
                keyCode: KeyMap.A
            });
            input.val('a');

            instance.wait(
                function() {
                    Y.Mock.verify(mock);

                    onInput.detach();

                    input.simulate('keydown');

                    instance.wait(
                        function() {
                            Y.Mock.verify(mock);
                        },
                        0
                    );
                },
                0
            );
        },

        /*
         * Checks that keys that can't cause an input modification don't fire
         * an input event.
         *
         * Tests: AUI-749
         */
        'do not dispatch on not modifying keys': function() {
            var instance = this,
                nonModifyingKeys,
                mock = new Y.Mock();

            Y.Mock.expect(
                mock, {
                    args: [YUITest.Mock.Value.Object],
                    callCount: 0,
                    method: 'onInput'
                }
            );

            instance._eventHandles.push(
                input.on('input', mock.onInput, instance)
            );

            nonModifyingKeys = [
                KeyMap.ALT,
                KeyMap.CAPS_LOCK,
                KeyMap.CTRL,
                KeyMap.DOWN,
                KeyMap.END,
                KeyMap.ESC,
                KeyMap.F1,
                KeyMap.F10,
                KeyMap.F11,
                KeyMap.F12,
                KeyMap.F2,
                KeyMap.F3,
                KeyMap.F4,
                KeyMap.F5,
                KeyMap.F6,
                KeyMap.F7,
                KeyMap.F8,
                KeyMap.F9,
                KeyMap.HOME,
                KeyMap.LEFT,
                KeyMap.NUM_LOCK,
                KeyMap.PAGE_DOWN,
                KeyMap.PAGE_UP,
                KeyMap.PAUSE,
                KeyMap.PRINT_SCREEN,
                KeyMap.RIGHT,
                KeyMap.SHIFT,
                KeyMap.UP,
                KeyMap.WIN_KEY
            ];

            input.focus();

            Y.Array.each(
                nonModifyingKeys,
                function(item) {
                    input.simulate('keydown', {
                        keyCode: item
                    });
                }
            );

            instance.wait(
                function() {
                    Y.Mock.verify(mock);
                },
                0
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-event', 'aui-node-base', 'node-event-simulate', 'test']
});
