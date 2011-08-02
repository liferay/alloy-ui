AUI.add('aui-text-unicode', function(A) {
/**
 * Utility for testing strings against unicode patterns.
 *
 * @module aui-text
 */

var Lang = A.Lang,
	Text = A.Text,
	UData = A.Text.Data.Unicode;

var Unicode = {
	/**
     * Return a unicode regex for the given group (under A.Text.Data.Unicode).
     *
   	 * @param {String} group
	 * @param {String} flags
     * @method compile
     * @private
     */
	compile: function(group, flags) {
		var instance = this;
		var regex = null;

		if (UData.hasOwnProperty(group)) {
			regex = new RegExp(UData[group], flags)
		}

		return regex;
	},

	/**
     * Tests a string against an Unicode pattern. Returns the first match.
     *
     * @param {String} str
	 * @param {String} group
	 * @param {String} flags
     * @method match
     */
	match: A.cached(function(str, group, flags) {
		return Unicode.compile(group, flags).exec(str);
	}),

	/**
     * Tests a string against an Unicode pattern. Returns true or false.
	 *
	 * @param {String} str
	 * @param {String} group
	 * @param {String} flags
	 * @method test
	 */
	test: A.cached(function(str, group, flags) {
		return Unicode.compile(group, flags).test(str);
	})
};

Text.Unicode = Unicode;

}, '@VERSION@' ,{requires:['aui-text-data-unicode'], skinnable:false});
