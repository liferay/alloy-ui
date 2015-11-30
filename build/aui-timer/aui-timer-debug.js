YUI.add('aui-timer', function (A, NAME) {

/**
 * Utility for timing logics used to manage [JavaScript Timer
 * Congestion](http://fitzgeraldnick.com/weblog/40/) problems.
 *
 * @module aui-timer
 */

var Lang = A.Lang,
    now = Lang.now,
    isEmpty = A.Object.isEmpty,

    aArray = A.Array;

/**
 * A base class for Timer.
 *
 * @class A.Timer
 * @constructor
 */
var Timer = {

    /**
     * Cancels repeated action which was set up using `setInterval` function.
     *
     * @method clearInterval
     * @param id
     */
    clearInterval: function(id) {
        var instance = Timer;

        instance.unregister(true, id);
    },

    /**
     * Clears the delay set by `setTimeout` function.
     *
     * @method clearTimeout
     * @param id
     */
    clearTimeout: function(id) {
        var instance = Timer;

        instance.unregister(false, id);
    },

    /**
     * Defines the fixed time delay between each interval.
     *
     * @method intervalTime
     * @param newInterval
     * @return {Number}
     */
    intervalTime: function(newInterval) {
        var instance = Timer;

        if (arguments.length) {
            instance._INTERVAL = newInterval;
        }

        return instance._INTERVAL;
    },

    /**
     * Checks if the task is repeatable or not.
     *
     * @method isRepeatable
     * @param task
     * @return {Boolean}
     */
    isRepeatable: function(task) {
        return task.repeats;
    },

    /**
     * Calls a function after a specified delay.
     *
     * @method setTimeout
     * @param fn
     * @param ms
     * @param context
     */
    setTimeout: function(fn, ms, context) {
        var instance = Timer;

        var args = aArray(arguments, 3, true);

        return instance.register(false, fn, ms, context, args);
    },

    /**
     * Calls a function repeatedly, with a fixed time delay between each call to
     * that function.
     *
     * @method setInterval
     * @param fn
     * @param ms
     * @param context
     */
    setInterval: function(fn, ms, context) {
        var instance = Timer;

        var args = aArray(arguments, 3, true);

        return instance.register(true, fn, ms, context, args);
    },

    /**
     * Adds a new task to the timer.
     *
     * @method register
     * @param repeats
     * @param fn
     * @param ms
     * @param context
     * @param args
     */
    register: function(repeats, fn, ms, context, args) {
        var instance = Timer;

        var id = (++A.Env._uidx);

        args = args || [];

        args.unshift(fn, context);

        instance._TASKS[id] = instance._create(
            repeats, instance._getNearestInterval(ms), A.rbind.apply(A, args)
        );

        instance._lazyInit();

        return id;
    },

    /**
     * Runs the task function.
     *
     * @method run
     * @param task
     */
    run: function(task) {
        task.lastRunTime = now();

        return task.fn();
    },

    /**
     * Removes a task from the timer.
     *
     * @method unregister
     * @param repeats
     * @param id
     */
    unregister: function(repeats, id) {
        var instance = Timer;

        var tasks = instance._TASKS;

        var task = tasks[id];

        instance._lazyDestroy();

        return task && task.repeats === repeats && delete tasks[id];
    },

    /**
     * Creates a collection of timer definitions.
     *
     * @method _create
     * @param repeats
     * @param ms
     * @param fn
     * @protected
     * @return {Object}
     */
    _create: function(repeats, ms, fn) {
        return {
            fn: fn,
            lastRunTime: now(),
            next: ms,
            repeats: repeats,
            timeout: ms
        };
    },

    /**
     * Subtracts the current time with the last run time. The result of this
     * operation is subtracted with the task timeout.
     *
     * @method _decrementNextRunTime
     * @param tasks
     * @protected
     */
    _decrementNextRunTime: function(task) {
        return task.next = task.timeout - (now() - task.lastRunTime);
    },

    /**
     * Calculates the nearest interval by using the modulus of the argument with
     * the interval as reference.
     *
     * @method _getNearestInterval
     * @param num
     * @protected
     * @return {Number}
     */
    _getNearestInterval: function(num) {
        var instance = Timer;

        var interval = instance._INTERVAL;

        var delta = num % interval;

        var nearestInterval;

        if (delta < interval / 2) {
            nearestInterval = num - delta;
        }
        else {
            nearestInterval = num + interval - delta;
        }

        return nearestInterval;
    },

    /**
     * Checks if the timer is initialized and empty, then calls the
     * `clearTimeout` function using the global interval id.
     *
     * @method _lazyDestroy
     * @protected
     */
    _lazyDestroy: function() {
        var instance = Timer;

        if (instance._initialized && isEmpty(instance._TASKS)) {
            clearTimeout(instance._globalIntervalId);

            instance._initialized = false;
        }
    },

    /**
     * Checks if the timer is initialized and contains a task, then calls the
     * `setTimeout` function and stores the global interval id.
     *
     * @method _lazyInit
     * @protected
     */
    _lazyInit: function() {
        var instance = Timer;

        if (!instance._initialized && !isEmpty(instance._TASKS)) {
            instance._lastRunTime = now();

            instance._globalIntervalId = setTimeout(
                instance._runner, instance._INTERVAL
            );

            instance._initialized = true;
        }
    },

    /**
     * Goes through all pending tasks and initializes its timer or unregisters
     * it depending on the task status.
     *
     * @method _loop
     * @param i
     * @param pendingTasks
     * @param length
     * @protected
     */
    _loop: function(i, pendingTasks, length) {
        var instance = Timer;

        var interval = instance._INTERVAL;
        var tasks = instance._TASKS;

        var halfInterval = interval / 2;

        for (var start = now(); i < length && now() - start < 50; i++) {
            var taskId = pendingTasks[i];
            var task = tasks[taskId];

            if (task && instance._decrementNextRunTime(task) < halfInterval) {
                instance.run(task);

                if (instance.isRepeatable(task)) {
                    instance._resetNextRunTime(task);
                }
                else {
                    instance.unregister(false, taskId);
                }
            }
        }

        if (instance._initialized) {
            if (i < length) {
                instance._globalIntervalId = setTimeout(instance._loop, 10);
            }
            else {
                instance._globalIntervalId = setTimeout(
                    instance._runner, interval
                );
            }
        }
    },

    /**
     * Gets the arguments to call the `_loop` method.
     *
     * @method _runner
     * @protected
     */
    _runner: function() {
        var instance = Timer;

        var i = 0;
        var pendingTasks = A.Object.keys(instance._TASKS);
        var length = pendingTasks.length;

        instance._loop(i, pendingTasks, length);
    },

    /**
     * Resets the next run time.
     *
     * @method _resetNextRunTime
     * @param task
     * @protected
     */
    _resetNextRunTime: function(task) {
        return task.next = task.timeout;
    },

    _INTERVAL: 50,
    _TASKS: {},

    _lastRunTime: 0,
    _globalIntervalId: 0,
    _initialized: false
};

/**
 * Cancels repeated action which was set up using `setInterval` function.
 *
 * @method A.clearInterval
 * @static
 * @param id
 */
A.clearInterval = Timer.clearInterval;

/**
 * Clears the delay set by `setTimeout` function.
 *
 * @method A.clearTimeout
 * @static
 * @param id
 */
A.clearTimeout = Timer.clearTimeout;

/**
 * Calls a function repeatedly, with a fixed time delay between each call to
 * that function.
 *
 * @method A.setInterval
 * @static
 * @param fn
 * @param ms
 * @param context
 */
A.setInterval = Timer.setInterval;

/**
 * Calls a function after a specified delay.
 *
 * @method A.setTimeout
 * @static
 * @param fn
 * @param ms
 * @param context
 */
A.setTimeout = Timer.setTimeout;

A.Timer = Timer;


}, '3.0.1', {"requires": ["oop"]});
