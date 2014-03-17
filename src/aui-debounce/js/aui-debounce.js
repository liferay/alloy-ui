var Lang = A.Lang,
    aArray = A.Array,
    isString = Lang.isString,
    isUndefined = Lang.isUndefined,

    DEFAULT_ARGS = [];

var toArray = function(arr, fallback, index, arrayLike) {
    return !isUndefined(arr) ? aArray(arr, index || 0, (arrayLike !== false)) : fallback;
};

A.debounce = function(fn, delay, context, args) {
    var id;
    var tempArgs;

    if (isString(fn) && context) {
        fn = A.bind(fn, context);
    }

    delay = delay || 0;

    args = toArray(arguments, DEFAULT_ARGS, 3);

    var clearFn = function() {
        clearInterval(id);

        id = null;
    };

    var base = function() {
        clearFn();

        var result = fn.apply(context, tempArgs || args || DEFAULT_ARGS);

        tempArgs = null;

        return result;
    };

    var delayFn = function(delayTime, newArgs, newContext, newFn) {
        wrapped.cancel();

        delayTime = !isUndefined(delayTime) ? delayTime : delay;

        fn = newFn || fn;
        context = newContext || context;

        if (newArgs !== args) {
            tempArgs = toArray(newArgs, DEFAULT_ARGS, 0, false).concat(args);
        }

        if (delayTime > 0) {
            id = setInterval(base, delayTime);
        }
        else {
            return base();
        }
    };

    var cancelFn = function() {
        if (id) {
            clearFn();
        }
    };

    var setDelay = function(delay) {
        cancelFn();

        delay = delay || 0;
    };

    var wrapped = function() {
        var currentArgs = arguments.length ? arguments : args;

        return wrapped.delay(delay, currentArgs, context || this);
    };

    wrapped.cancel = cancelFn;
    wrapped.delay = delayFn;
    wrapped.setDelay = setDelay;

    return wrapped;
};
