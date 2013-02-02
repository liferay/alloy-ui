var Lang = A.Lang,
    now = Lang.now,
    isEmpty = A.Object.isEmpty,

    AArray = A.Array;

var Timer = {
    clearInterval: function(id) {
        var instance = Timer;

        instance.unregister(true, id);
    },

    clearTimeout: function(id) {
        var instance = Timer;

        instance.unregister(false, id);
    },

    intervalTime: function(newInterval) {
        var instance = Timer;

        if (arguments.length) {
            instance._INTERVAL = newInterval;
        }

        return instance._INTERVAL;
    },

    isRepeatable: function(task) {
        var instance = Timer;

        return task.repeats;
    },

    setTimeout: function(fn, ms, context) {
        var instance = Timer;

        var args = AArray(arguments, 3, true);

        return instance.register(false, fn, ms, context, args);
    },

    setInterval: function(fn, ms, context) {
        var instance = Timer;

        var args = AArray(arguments, 3, true);

        return instance.register(true, fn, ms, context, args);
    },

    register: function(repeats, fn, ms, context, args) {
        var instance = Timer;

        var id = (++A.Env._uidx);

        args = args || [];

        args.unshift(fn, context);

        instance._TASKS[id] = instance._create(repeats, instance._getNearestInterval(ms), A.rbind.apply(A, args));

        instance._lazyInit();

        return id;
    },

    run: function(task) {
        var instance = Timer;

        task.lastRunTime = now();

        return task.fn();
    },

    unregister: function(repeats, id) {
        var instance = Timer;

        var tasks = instance._TASKS;

        var task = tasks[id];

        instance._lazyDestroy();

        return task && task.repeats === repeats && delete tasks[id];
    },

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

    _decrementNextRunTime: function(task) {
        var instance = Timer;

        return task.next = task.timeout - (now() - task.lastRunTime);
    },

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

    _lazyDestroy: function() {
        var instance = Timer;

        if (instance._initialized && isEmpty(instance._TASKS)) {
            clearTimeout(instance._globalIntervalId);

            instance._initialized = false;
        }
    },

    _lazyInit: function() {
        var instance = Timer;

        if (!instance._initialized && !isEmpty(instance._TASKS)) {
            instance._lastRunTime = now();

            instance._globalIntervalId = setTimeout(instance._runner, instance._INTERVAL);

            instance._initialized = true;
        }
    },

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

    _runner: function() {
        var instance = Timer;

        var i = 0;
        var pendingTasks = A.Object.keys(instance._TASKS);
        var length = pendingTasks.length;

        instance._loop(i, pendingTasks, length);
    },

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