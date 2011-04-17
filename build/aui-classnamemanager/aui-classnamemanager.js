AUI.add('aui-classnamemanager', function(A) {
var ClassNameManager = A.ClassNameManager,
	_getClassName = ClassNameManager.getClassName,

	PREFIX = 'aui';

A.getClassName = function() {
	var args = A.Array(arguments, 0, true);

	args.unshift(PREFIX);

	return _getClassName.apply(ClassNameManager, args);
};

}, '@VERSION@' ,{requires:['classnamemanager'], skinnable:false, condition: {trigger: 'classnamemanager', test: function(){return true;}}});
