var Lang = A.Lang,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

	AArray = A.Array,
	arrayIndexOf = AArray.indexOf;

A.mix(
	AArray,
	{
		remove: function(a, from, to) {
		  var rest = a.slice((to || from) + 1 || a.length);
		  a.length = (from < 0) ? (a.length + from) : from;

		  return a.push.apply(a, rest);
		},

		removeItem: function(a, item) {
			var index = arrayIndexOf(a, item);

			return AArray.remove(a, index);
		}
	}
);

A.fn = function(fn, context, args) {
	var wrappedFn;

	// Explicitly set function arguments
	if (!isNumber(fn)) {
		var xargs = arguments;

		if (xargs.length > 2) {
			xargs = AArray(xargs, 2, true);
		}

		var dynamicLookup = (isString(fn) && context);

		wrappedFn = function() {
			var method = (!dynamicLookup) ? fn : context[fn];

			return method.apply(context || fn, xargs);
		};
	}
	else {
		// Set function arity
		var argLength = fn;

		fn = context;
		context = args;

		var dynamicLookup = (isString(fn) && context);

		wrappedFn = function() {
			var method = (!dynamicLookup) ? fn : context[fn];
			context = context || method;

			var returnValue;

			if (argLength > 0) {
				returnValue = method.apply(context, AArray(arguments, 0, true).slice(0, argLength));
			}
			else {
				returnValue = method.call(context);
			}

			return returnValue;
		};
	}

	return wrappedFn;
};