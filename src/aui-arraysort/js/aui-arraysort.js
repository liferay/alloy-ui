/**
 * The A.ArraySort Utility - A set of utility methods to the ArraySort.
 *
 * @module aui-arraysort
 */

ASort = A.ArraySort;

/**
 * Augment the <a href="ArraySort.html">YUI3 ArraySort</a> with more util methods.
 *
 * @class A.ArraySort
 * @uses ArraySort
 * @constructor
 */
A.mix(
	ASort,
	{
		/**
		 * Compare two arrays ignoring white spaces.
		 *
		 * @method compareIgnoreWhiteSpace
		 * @param a
		 * @param b
		 * @param desc
		 * @param compareFn
		 * @return sort
		 */
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
		 *
		 * @method stableSort
		 * @param array
		 * @param compareFn
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