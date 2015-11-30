YUI.add('aui-promise', function (A, NAME) {

/**
 * An extesion to the Promise utility that provides the ability to cancel
 * nested promises passing an instance of the `A.CancellablePromise.Error`.
 *
 * @module aui-promise
 */

/**
 * Adds a callback that will be invoked whether the Promise is fulfilled or
 * rejected. The callback receives no argument, and a new child Promise is
 * created. This is useful for ensuring that cleanup takes place after certain
 * asynchronous operations. Callbacks added with `thenAlways` will be executed
 * in the same order with other calls to `then`, `thenAlways`.
 *
 * @method thenAways
 * @param  {Function} callback A function that will be invoked when the Promise
 *     is resolved.
 * @return {Promise} A new Promise that will receive the result of the callback.
 */
A.Promise.prototype.thenAlways = function(callback) {
    var instance = this;

    return this.then(function() {
        callback.call(instance);
    }, function() {
        callback.call(instance);
    });
};

/**
 * Adds a callback that will be invoked only if the Promise is rejected. This is
 * equivalent to `then(null, onRejected)`.
 *
 * @method thenCatch
 * @param  {Function} callback A function that will be invoked with the
 *     rejection reason if the Promise is rejected.
 * @return {Promise} A new Promise that will receive the result of the callback.
 */
A.Promise.prototype.thenCatch = function(reject) {
    return this.then(null, reject);
};

/**
 * Cancellable promise.
 *
 * @class A.CancellablePromise
 * @constructor
 * @extends {Promise}
 * @param {Function} fn A function where to insert the logic that resolves this
 *     promise. Receives `fulfill` and `reject` functions as parameters. This
 *     function is called synchronously.
 * @param {Function} opt_errorCallback Optional error callback to be fired
 *     whenever a cancellable promise is cancelled.
 */

function CancellablePromise(fn, opt_errorCallback) {
    this._errorCallback = opt_errorCallback;
    CancellablePromise.superclass.constructor.apply(this, arguments);
}

A.extend(CancellablePromise, A.Promise, {
    /**
     * Holds the list of children promises.
     *
     * @property _childPromises
     * @type {Array}
     * @protected
     */
    _childPromises: null,

    /**
     * Holds the Optional error callback to be fired whenever a cancellable
     * promise is cancelled.
     *
     * @property _errorCallback
     * @type {Function}
     * @protected
     */
    _errorCallback: null,

    /**
     * Cancels the Promise by rejecting it with a `A.CancellablePromise.Error`. No
     * action is performed if the Promise is already resolved.
     *
     * @method cancel
     * @param {String} opt_message An optional debugging message for describing
     *     the cancellation reason.
     */
    cancel: function(opt_message) {
        var instance = this,
            resolver = this._resolver,
            error = new A.CancellablePromise.Error(opt_message);
        try {
            instance._cancelChildPromises(opt_message);
            if (instance._errorCallback && instance.getStatus() === 'pending') {
                A.soon(A.bind(instance._errorCallback, instance, error));
            }
        }
        catch (e) {
            resolver.reject(e);
        }
        resolver.reject(error);
        return this;
    },

    /**
     * @override
     */
    then: function(onFulfilled, onRejected) {
        var instance = this,
            child;

        function onFulfilledInternal() {
            var valueOrReason = onFulfilled.apply(instance, arguments);
            if (!instance._childPromises) {
                instance._childPromises = [];
            }
            instance._childPromises.push(valueOrReason);
            return valueOrReason;
        }

        child = CancellablePromise.superclass.then.call(this, onFulfilledInternal, function(reason) {
            try {
                if (A.Lang.isFunction(onRejected)) {
                    onRejected(reason);
                }
            }
            catch (e) {
                throw e;
            }
            // Always throw rejection error when comes from a cancellation
            if (A.instanceOf(reason, A.CancellablePromise.Error)) {
                throw reason;
            }
        });
        // TODO: Link cancel method from parent promise keeps child promises
        // available for future cancellation. The same may be achieve linking
        // the parent child reference on each child
        child.cancel = A.bind(instance.cancel, instance);

        return child;
    },

    /**
     * Cancels children Promises. If the Promise has not already been resolved,
     * reject it with a cancel error. If there are no other children in the list
     * of callback entries, propagate the cancellation by canceling this Promise
     * as well.
     *
     * @method  _cancelChildPromises
     * @param {CancellablePromise} childPromise The Promise to cancel.
     * @param {String} opt_message An optional debugging message for describing
     *     the cancellation reason.
     * @private
     */
    _cancelChildPromises: function(opt_message) {
        A.Array.invoke(this._childPromises, 'cancel', opt_message);
        this._childPromises = null;
    }
});

/*
 * Ensures that a certain value is a cancellable promise. If it is not a
 * promise, it wraps it in one.
 *
 * @method resolve
 * @param {Any} Any object that may or may not be a promise
 * @return {CancellablePromise}
 * @static
 */
CancellablePromise.resolve = A.Promise.resolve;

/*
 * A shorthand for creating a rejected cancellable promise.
 *
 * @method reject
 * @param {Any} reason Reason for the rejection of this promise. Usually an
 * Error Object
 * @return {CancellablePromise} A rejected promise
 * @static
 */
CancellablePromise.reject = A.Promise.reject;

/*
 * Returns a cancellable promise that is resolved or rejected when all values
 * are resolved or any is rejected. This is useful for waiting for the
 * resolution of multiple promises, such as reading multiple files in Node.js or
 * making multiple XHR requests in the browser.
 *
 * @method all
 * @param {Any[]} values An array of any kind of values, promises or not. If a
 * value is not
 * @return {CancellablePromise} A promise for an array of all the fulfillment values
 * @static
 */
CancellablePromise.all = function(values) {
    var children = [];

    return new A.CancellablePromise(
        function(resolve, reject) {
            if (!A.Lang.isArray(values)) {
                reject(new TypeError('CancellablePromise.all expects an array of values or promises'));
                return;
            }

            var instance = this,
                results = [],
                remaining = values.length;

            function resolveInternal(childPos, val) {
                results[childPos - 1] = val;
                remaining--;
                if (!remaining) {
                    resolve(results);
                }
            }

            A.Array.each(values, function(maybePromise) {
                var child = A.CancellablePromise.resolve(maybePromise);
                child.then(
                    A.bind(resolveInternal, instance, children.push(child)),
                    A.bind(instance.cancel, instance));
            });
        },
        function() {
            A.Array.invoke(children, 'cancel');
            children = null;
        }
    );
};

A.CancellablePromise = CancellablePromise;

/**
 * Error used as a rejection reason for canceled Promises.
 *
 * @class A.CancellablePromise.Error
 * @constructor
 * @extends {Error}
 * @param {String} opt_message An optional debugging message for describing the
 *     cancellation reason.
 */

function CancellablePromiseError(opt_message) {
    CancellablePromiseError.superclass.constructor.apply(this, arguments);
    this.message = opt_message;
}

A.extend(CancellablePromiseError, Error, {
    name: 'cancel'
});

A.CancellablePromise.Error = CancellablePromiseError;


}, '3.0.1', {"requires": ["array-invoke", "promise", "oop"]});
