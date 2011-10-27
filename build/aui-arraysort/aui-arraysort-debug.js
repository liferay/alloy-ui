AUI.add('aui-arraysort', function(A) {
ASort = A.ArraySort;

A.mix(
	ASort,
	{
		compareIgnoreWhiteSpace: function(a, b, desc) {
			var sort;

			if ((a === '') && (b === '')) {
				sort = 0;
			}
			else if (a === '') {
				sort = 1;
			}
			else if (b === '') {
				sort = -1;
			}
			else {
				sort = ASort.compare(a, b, desc);
			}

			return sort;
		}
	}
);

}, '@VERSION@' ,{requires:['arraysort'], skinnable:false});
