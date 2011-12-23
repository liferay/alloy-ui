AUI.add('aui-drawing-safari', function(A) {
A.Drawing.prototype.safari = function() {
	var instance = this;

	var rect = instance.rect(-99, -99, instance.get('width') + 99, instance.get('height') + 99).attr(
		{
			stroke: 'none'
		}
	);

	setTimeout(
		function() {
			rect.remove();
		},
		0
	);
};

}, '@VERSION@' ,{requires:['aui-drawing-base'], condition: {name: 'aui-drawing-safari', trigger: 'aui-drawing-base',test: function(A){var UA = A.UA; return UA.safari && (UA.version.major < 4 || (UA.iphone || UA.ipad));}}});
