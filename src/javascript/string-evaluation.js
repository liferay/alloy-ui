AUI.add('string-evaluation', function(A) {

var L = A.Lang,
	FALSE = 'false',
	TRUE = 'true';

L.parseBoolean = function(value) {
	return (value == FALSE) ? false : !!value;
};

// parseString inspired on Ariel Flesler jQuery Parse Plugin - http://plugins.jquery.com/project/Parse
L.parseString = function(value) {
	// booleans
	if (value == TRUE || value == FALSE) {
		return L.parseBoolean(value);
	}

	// Handle positive & negative numbers (integer or float)
	// Handle hexadecimal numbers: 0xFF -> 255
	// Handle exponential notation: 1e5 -> 100000
	if (value && L.isString(value)) {
		var number = +value;

		if (!isNaN(number)) {
			return number;
		}
	}

	return value;
};

}, '@VERSION', { requires: [ 'aui-base' ] });