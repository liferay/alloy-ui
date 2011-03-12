var Lang = A.Lang;

var DEFAULT_ARGS = [];

A.debounce = function(fn, delay, context, args) {
	var id;

	delay = delay || 0;

	args = !Lang.isUndefined(args) ? A.Array(args) : DEFAULT_ARGS;

	var clearFn = function() {
		clearInterval(id);

		id = null;
	};

	var base = function() {
		clearFn();

		return fn.apply(context, args || DEFAULT_ARGS);
	};

	var delayFn = function(delayTime, newArgs, newContext, newFn) {
		wrapped.cancel();

		delayTime = delayTime || delay;

		fn = newFn || fn;
		context = newContext || context;

		args = !Lang.isUndefined(newArgs) ? A.Array(newArgs) : args;

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

	var wrapped = function() {
		var currentArgs = arguments.length ? arguments : args;

		return wrapped.delay(delay, currentArgs, context || this);
	};

	wrapped.cancel = cancelFn;
	wrapped.delay = delayFn;

	return wrapped;
};