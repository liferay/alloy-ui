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

            instance._inputObserver = Y.Do.before(instance._observe('input'), instance, '_onInput');

            instance._eventHandles = [];
        },

        tearDown: function() {
            var instance = this;

            Y.Do.detach(instance._inputObserver);

            (new Y.EventHandle(instance._eventHandles)).detach();

            instance._calls = null;
        },

        _called: function(method, times) {
            var instance = this;

            if (times) {
                return (instance._calls && instance._calls[method] === times);
            } else {
                return (instance._calls && instance._calls[method] > 0);
            }
        },

        _notCalled: function(method) {
            var instance = this;

            return (!instance._calls || !instance._calls[method]);
        },

        _observe: function(method) {
            var instance = this;

            return function() {
                if (!instance._calls) {
                    instance._calls = {};
                }

                if (!instance._calls[method]) {
                    instance._calls[method] = 1;
                }
                else {
                    instance._calls[method]++;
                }
            };
        },

        _onInput: function(event) {},

        //----------------------------------------------------------------------
        // Tests
        //----------------------------------------------------------------------

        /**
         * Checks that the synthetic input event is fired as expected
         *
         * @tests AUI-749
         */
        'input event': function() {
            var instance = this;

            instance._eventHandles.push(
                input.on('input', instance._onInput, instance)
            );

            input.focus();
            input.simulate('keydown');
            input.simulate('keydown');

            instance.wait(
                function() {
                    Y.Assert.isTrue(instance._called('input', 2), 'Event of type input should have been fired twice');
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
            var instance = this;

            input.focus();
            input.simulate('keydown');

            instance.wait(
                function() {
                    Y.Assert.isTrue(instance._notCalled('input'), 'Event of type input should not have been fired');

                    var onInput = input.on('input', instance._onInput, instance);

                    input.simulate('keydown');

                    instance.wait(
                        function() {
                            Y.Assert.isTrue(instance._called('input', 1), 'Event of type input should have been fired once');

                            onInput.detach();

                            input.simulate('keydown');

                            instance.wait(
                                function() {
                                    Y.Assert.isTrue(instance._called('input', 1), 'Event of type input should not have been fired again');
                                },
                                0
                            );
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
