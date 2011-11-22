AUI.add('aui-classnamemanager', function(A) {
var ClassNameManager = A.ClassNameManager,
	_getClassName = ClassNameManager.getClassName,

	PREFIX = 'aui';

A.getClassName = A.cached(
	function() {
		var args = A.Array(arguments, 0, true);

		args.unshift(PREFIX);

		args[args.length] = true;

		return _getClassName.apply(ClassNameManager, args);
	}
);

}, '@VERSION@' ,{skinnable:false, condition: {trigger: 'classnamemanager', test: function(){return true;}}, requires:['classnamemanager']});
