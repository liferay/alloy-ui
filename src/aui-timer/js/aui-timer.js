/**
 * Utility for timing logics.
 *
 * @module aui-timer
 */

var Lang = A.Lang,
    now = Lang.now,
    isEmpty = A.Object.isEmpty,

    AArray = A.Array;

var Timer = {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method clearInterval
     * @param id
     */
    clearInterval: function(id) {
        var instance = Timer;

        instance.unregister(true, id);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method clearTimeout
     * @param id
     */
    clearTimeout: function(id) {
        var instance = Timer;

        instance.unregister(false, id);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method intervalTime
     * @param newInterval
     */
    intervalTime: function(newInterval) {
        var instance = Timer;

        if (arguments.length) {
            instance._INTERVAL = newInterval;
        }

        return instance._INTERVAL;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method isRepeatable
     * @param task
     */
    isRepeatable: function(task) {
        var instance = Timer;

        return task.repeats;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setTimeout
     * @param fn
     * @param ms
     * @param context
     */
    setTimeout: function(fn, ms, context) {
        var instance = Timer;

        var args = AArray(arguments, 3, true);

        return instance.register(false, fn, ms, context, args);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setInterval
     * @param fn
     * @param ms
     * @param context
     */
    setInterval: function(fn, ms, context) {
        var instance = Timer;

        var args = AArray(arguments, 3, true);

        return instance.register(true, fn, ms, context, args);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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

        instance._TASKS[id] = instance._create(repeats, instance._getNearestInterval(ms), A.rbind.apply(A, args));

        instance._lazyInit();

        return id;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method run
     * @param task
     */
    run: function(task) {
        var instance = Timer;

        task.lastRunTime = now();

        return task.fn();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _create
     * @param repeats
     * @param ms
     * @param fn
     * @protected
     */
    _create: function(repeats, ms, fn) {
        var instance = Timer;

        return {
            fn: fn,
            lastRunTime: now(),
            next: ms,
            repeats: repeats,
            timeout: ms
        };
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _decrementNextRunTime
     * @param tasks
     * @protected
     */
    _decrementNextRunTime: function(task) {
        var instance = Timer;

        return task.next = task.timeout - (now() - task.lastRunTime);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _getNearestInterval
     * @param num
     * @protected
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _lazyInit
     * @protected
     */
    _lazyInit: function() {
        var instance = Timer;

        if (!instance._initialized && !isEmpty(instance._TASKS)) {
            instance._lastRunTime = now();

            instance._globalIntervalId = setTimeout(instance._runner, instance._INTERVAL);

            instance._initialized = true;
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
                instance._globalIntervalId = setTimeout(instance._runner, interval);
            }
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _resetNextRunTime
     * @param task
     * @protected
     */
    _resetNextRunTime: function(task) {
        var instance = Timer;

        return task.next = task.timeout;
    },

    _INTERVAL: 50,
    _TASKS: {},

    _lastRunTime: 0,
    _globalIntervalId: 0,
    _initialized: false
};

A.clearInterval = Timer.clearInterval;
A.clearTimeout = Timer.clearTimeout;
A.setInterval = Timer.setInterval;
A.setTimeout = Timer.setTimeout;

A.Timer = Timer;