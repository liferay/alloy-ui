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

}, '@VERSION@' );
