YUI.add('aui-event-tests', function(Y) {

    //--------------------------------------------------------------------------
    // EventInput Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-event'),

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
         * Checks that the synthetic input event is fired as expected
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
                    callCount: 2
                }
            );

            instance._eventHandles.push(
                input.on('input', mock.onInput, instance)
            );

            input.focus();
            input.simulate('keydown');
            input.simulate('keydown');

            instance.wait(
                function() {
                    Y.Mock.verify(mock);
                },
                0
            );
        },

        /**
         * Checks that the synthetic input event is detached properly
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

            input.simulate('keydown');

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
        }

    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-event', 'node-event-simulate', 'test']
});
