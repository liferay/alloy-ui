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
                'detach input event': hasNativeInput
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

        /**
         * Checks that the synthetic input event is fired as expected when input
         * content changes.
         *
         * @tests AUI-749
         */
        'input event': function() {
            var instance = this,
                mock = new Y.Mock();

            Y.Mock.expect(
                mock, {
                    method: 'onInput',
                    args: [YUITest.Mock.Value.Object],
                    callCount: 1
                }
            );

            instance._eventHandles.push(
                input.on('input', mock.onInput, instance)
            );

            // Simulating keydown events does not update the input value. Need
            // to do it manually to mimic browser behaviour properly.
            input.focus();
            input.simulate('keydown', { keyCode: KeyMap.A });
            input.val('a');

            instance.wait(
                function() {
                    Y.Mock.verify(mock);
                },
                0
            );
        },

        /**
         * Checks that the synthetic input event is detached properly.
         *
         * @tests AUI-749
         */
        'detach input event': function() {
            var instance = this,
                mock = new Y.Mock();

            Y.Mock.expect(
                mock, {
                    method: 'onInput',
                    args: [YUITest.Mock.Value.Object],
                    callCount: 1
                }
            );

            var onInput = input.on('input', mock.onInput, instance);

            // Simulating keydown events does not update the input value. Need
            // to do it manually to mimic browser behaviour properly.
            input.focus();
            input.simulate('keydown', { keyCode: KeyMap.A });
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

        /**
         * Checks that keys that can't cause an input modification don't fire
         * an input event.
         *
         * @tests AUI-749
         */
        'do not dispatch on not modifying keys': function() {
            var instance = this,
                nonModifyingKeys,
                mock = new Y.Mock();

            Y.Mock.expect(
                mock, {
                    method: 'onInput',
                    args: [YUITest.Mock.Value.Object],
                    callCount: 0
                }
            );

            instance._eventHandles.push(
                input.on('input', mock.onInput, instance)
            );

            nonModifyingKeys = [
                KeyMap.SHIFT,
                KeyMap.CTRL,
                KeyMap.ALT,
                KeyMap.PAUSE,
                KeyMap.CAPS_LOCK,
                KeyMap.ESC,
                KeyMap.PAGE_UP,
                KeyMap.PAGE_DOWN,
                KeyMap.END,
                KeyMap.HOME,
                KeyMap.LEFT,
                KeyMap.UP,
                KeyMap.RIGHT,
                KeyMap.DOWN,
                KeyMap.PRINT_SCREEN,
                KeyMap.F1,
                KeyMap.F2,
                KeyMap.F3,
                KeyMap.F4,
                KeyMap.F5,
                KeyMap.F6,
                KeyMap.F7,
                KeyMap.F8,
                KeyMap.F9,
                KeyMap.F10,
                KeyMap.F11,
                KeyMap.F12,
                KeyMap.NUM_LOCK,
                KeyMap.WIN_KEY
            ];

            input.focus();

            Y.Array.each(
                nonModifyingKeys,
                function(item) {
                    input.simulate('keydown', { keyCode: item });
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
