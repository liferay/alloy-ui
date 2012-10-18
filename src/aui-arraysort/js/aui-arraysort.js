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
		},

		/**
		 * Sorts an object array keeping the order of equal items. ECMA script
		 * standard does not specify the behaviour when the compare function
		 * returns the value 0;
		 */
		stableSort: function(array, compareFn) {
			var i, len = array.length;

			for (i = 0; i < len; i++) {
				array[i] = { index: i, value: array[i] };
			}

			array.sort(
				function(a, b) {
					var result = compareFn.call(array, a.value, b.value);

					return (result === 0) ? (a.index - b.index) : result;
				}
			);

			for (i = 0; i < len; i++) {
				array[i] = array[i].value;
			}
		}
	}
);