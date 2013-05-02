var ClassNameManager = A.ClassNameManager,
	_getClassName = ClassNameManager.getClassName;

A.getClassName = A.cached(
	function() {
		var args = A.Array(arguments, 0, true);

		args[args.length] = true;

		return _getClassName.apply(ClassNameManager, args);
	}
);