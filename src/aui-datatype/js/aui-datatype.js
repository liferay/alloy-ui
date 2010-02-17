var L = A.Lang,
	FALSE = 'false',
	TRUE = 'true',

	DB = A.namespace('DataType.Boolean'),
	DS = A.namespace('DataType.String');

DB.parse = function(data) {
	return (data == FALSE) ? false : !!data;
};

// parseString inspired on Ariel Flesler jQuery Parse Plugin - http://plugins.jquery.com/project/Parse
DS.evaluate = function(data) {
	// booleans
	if (data == TRUE || data == FALSE) {
		return DB.parse(data);
	}

	// Handle positive & negative numbers (integer or float)
	// Handle hexadecimal numbers: 0xFF -> 255
	// Handle exponential notation: 1e5 -> 100000
	if (data && L.isString(data)) {
		var number = +data;

		if (!isNaN(number)) {
			return number;
		}
	}

	return data;
};