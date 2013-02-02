(function() {
	var slice = Array.prototype.slice;

	YUI.prototype.ready = function() {
		var instance = this,
			xargs = arguments,
			index = xargs.length - 1,
			modules = slice.call(arguments, 0, index);

		modules.unshift('event-base');
		modules.push(function(instance) {
			var args = arguments;

			instance.on('domready', function() {
				xargs[index].apply(this, args);
			});
		});
		instance.use.apply(instance, modules);
	};
}());