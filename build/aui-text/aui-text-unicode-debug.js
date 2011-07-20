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
     * Tests a string against an Unicode pattern. Returns the first match.
     *
     * @param {String} str
	 * @param {String} group
	 * @param {String} flags
     * @method match
     */
	match: A.cached(function(str, group, flags) {
		return Unicode._getUnicodeRegex(group, flags).exec(str);
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
		return Unicode._getUnicodeRegex(group, flags).test(str);
	}),

	/**
     * Return a unicode regex for the given group (under A.Text.Data.Unicode).
     *
   	 * @param {String} group
	 * @param {String} flags
     * @method _getUnicodeRegex
     * @private
     */
	_getUnicodeRegex: function(group, flags) {
		var instance = this;

		var regex = new RegExp(null);

		if (UData.hasOwnProperty(group)) {
			regex.compile(UData[group], flags);
		}

		return regex;
	}

};

Text.Unicode = Unicode;

}, '@VERSION@' ,{skinnable:false, requires:['aui-text-data-unicode']});
