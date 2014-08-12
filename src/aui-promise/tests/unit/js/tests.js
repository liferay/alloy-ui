YUI.add('aui-promise-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Promise Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-promise');

    var delay = function(ms) {
        var timeout;
        return new Y.CancellablePromise(
            function(resolve) {
                timeout = setTimeout(function() {
                    resolve();
                }, ms);
            },
            function() {
                clearTimeout(timeout);
            }
        );
    };

    function fail(reason) {
        Y.Assert.fail('This should not have been called (result: ' + String(reason) + ')');
    }

    function shouldNotCall(result) {
        if (Y.Test.Runner.isWaiting()) {
            Y.Test.Runner.resume(function() {
                fail(result);
            });
        }
        else {
            fail(result);
        }
    }

    function shouldCallWithCancellableError(reason, message) {
        Y.Assert.isInstanceOf(Y.CancellablePromise.Error, reason);
        Y.Assert.areSame(reason.message, message, 'The cancel message should be (' + message + ')');
        if (Y.Test.Runner.isWaiting()) {
            Y.Test.Runner.resume();
        }
    }

    suite.add(new Y.Test.Case({
        name: 'CancellablePromise',

        'test cancel': function() {
            var instance = this,
                cancelCallbackCalled = false;

            new Y.CancellablePromise(
                function() {},
                function(reason) {
                    cancelCallbackCalled = true;
                    shouldCallWithCancellableError(reason, 'withMessage');
                }
            ).then(
                shouldNotCall,
                shouldCallWithCancellableError
            ).thenAlways(function() {
                instance.resume(function() {
                    Y.Assert.isTrue(cancelCallbackCalled, 'Cancel should be called');
                });
            }).cancel('withMessage');

            instance.wait();
        },

        'test cancel after resolve': function() {
            new Y.CancellablePromise(
                function(resolve) {
                    resolve();
                },
                shouldNotCall
            ).cancel();
        },

        'test cancel after reject': function() {
            new Y.CancellablePromise(
                function(resolve, reject) {
                    reject();
                },
                shouldNotCall
            ).cancel();
        },

        'test cancel after resolve with value': function() {
            var instance = this,
                resolvedValue = false;

            new Y.CancellablePromise(
                function(resolve) {
                    resolve(true);
                },
                shouldNotCall
            ).then(
                function(value) {
                    return value;
                },
                shouldNotCall
            ).then(
                function(value) {
                    resolvedValue = value;
                },
                shouldNotCall
            ).thenAlways(function() {
                instance.resume(function() {
                    Y.Assert.isTrue(resolvedValue,
                        'Resolve value should be passed onto child promises');
                });
            }).cancel();

            instance.wait();
        },

        'test cancel after reject with cancellable reason error': function() {
            var instance = this,
                error = new Y.CancellablePromise.Error(),
                rejectedReasons = [];

            new Y.CancellablePromise(
                function(resolve, reject) {
                    reject(error);
                },
                shouldNotCall
            ).then(
                shouldNotCall,
                function(reason) {
                    rejectedReasons.push(reason);
                }
            ).then(
                shouldNotCall,
                function(reason) {
                    rejectedReasons.push(reason);
                }
            ).thenAlways(function() {
                instance.resume(function() {
                    Y.ArrayAssert.itemsAreSame([error, error], rejectedReasons,
                        'Reject value should be passed onto child promises');
                });
            }).cancel();

            instance.wait();
        },

        'test cancel with nested child': function() {
            var instance = this,
                callbacks = [];

            new Y.CancellablePromise(
                function() {},
                function(reason) {
                    callbacks.push(1);
                    shouldCallWithCancellableError(reason);
                }
            ).then(
                shouldNotCall,
                function(reason) {
                    callbacks.push(2);
                    shouldCallWithCancellableError(reason);
                }
            ).then(
                shouldNotCall,
                function(reason) {
                    callbacks.push(3);
                    shouldCallWithCancellableError(reason);
                }
            ).thenAlways(function() {
                instance.resume(function() {
                    Y.ArrayAssert.itemsAreSame([1, 2, 3], callbacks,
                        'Cancel reason should be in order of the child promises');
                });
            }).cancel();

            instance.wait();
        },

        'test cancel with nested grandchild': function() {
            var instance = this,
                callbacks = [];

            var p = new Y.CancellablePromise(
                function(resolve) {
                    resolve();
                },
                shouldNotCall
            ).then(
                function() {
                    callbacks.push(1);
                    return delay(1000);
                },
                shouldNotCall
            ).then(
                shouldNotCall,
                function(reason) {
                    callbacks.push(2);
                    shouldCallWithCancellableError(reason);
                }
            ).thenAlways(function() {
                instance.resume(function() {
                    Y.ArrayAssert.itemsAreSame([1, 2], callbacks,
                        'Cancel reason should be in order of the child promises');
                });
            });

            setTimeout(function() {
                p.cancel();
            }, 500);

            instance.wait();
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-promise', 'test', 'timers']
});
