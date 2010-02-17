var DelayedTask = function(fn, scope, args) {
	var instance = this;

	instance._args = args;
	instance._delay = 0;
	instance._fn = fn;
	instance._id = null;
	instance._scope = scope || instance;
	instance._time = 0;

	instance._base = function() {
		var now = instance._getTime();

		if (now - instance._time >= instance._delay) {
			clearInterval(instance._id);

			instance._id = null;

			instance._fn.apply(instance._scope, instance._args || []);
		}
	};
};

DelayedTask.prototype = {
	delay: function(delay, newFn, newScope, newArgs) {
		var instance = this;

		if (instance._id && instance._delay != delay) {
			instance.cancel();
		}

		instance._delay = delay || instance._delay;
		instance._time = instance._getTime();

		instance._fn = newFn || instance._fn;
		instance._scope = newScope || instance._scope;
		instance._args = newArgs || instance._args;

		if (!A.Lang.isArray(instance._args)) {
			instance._args = [instance._args];
		}

		if (!instance._id) {
			if (instance._delay > 0) {
				instance._id = setInterval(instance._base, instance._delay);
			}
			else {
				instance._base();
			}
		}
	},

	cancel: function() {
		var instance = this;

		if (instance._id) {
			clearInterval(instance._id);

			instance._id = null;
		}
	},

	_getTime: function() {
		var instance = this;

		return (+new Date());
	}
};

A.DelayedTask = DelayedTask;