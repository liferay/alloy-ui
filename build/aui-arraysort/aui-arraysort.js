AUI.add('aui-arraysort', function(A) {
ASort = A.ArraySort;

A.mix(
	ASort,
	{
		compareIgnoreWhiteSpace: function(a, b, desc, compareFn) {
			var sort;

			compareFn = compareFn || ASort.compare;

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
				sort = compareFn.apply(this, arguments);
			}

			return sort;
		}
	}
);

}, '@VERSION@' ,{skinnable:false, requires:['arraysort']});
