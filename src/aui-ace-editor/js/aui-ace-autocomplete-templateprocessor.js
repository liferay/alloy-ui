/**
 * The ACE Editor TemplateProcessor base
 *
 * @module aui-ace-editor
 * @submodule aui-ace-autocomplete-templateprocessor
 */

var Lang = A.Lang,
	AArray = A.Array,
	AObject = A.Object,
	Base = A.AceEditor.AutoCompleteBase,

	_DOT = '.',
	_STR_EMPTY = '',
	DIRECTIVES = 'directives',
	FILL_MODE = 'fillMode',
	HOST = 'host',
	METHOD = 'Method',
	VARIABLES = 'variables',

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

	TOKEN_PUNCTUATOR_DOT = 1,
	TOKEN_UNRECOGNIZED = -1,
	TOKEN_VARIABLE = 0,

	_NAME = 'aui-ace-autocomplete-templateprocessor',

/**
 * A base class for TemplateProcessor.
 *
 * @class A.TemplateProcessor
 * @extends A.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
TemplateProcessor = A.Base.create(_NAME, A.Base, [
], {

	/**
	 * Accepts match and depending on its type processes directives or variables.
	 * In case of success, calls the provided success callback, or the error callback otherwise.
	 *
	 * @method getResults
	 * @param {Object} match The provided match. It should contain at least type and content properties
	 * @param {Function} callbackSuccess The function to be called in case of success
	 * @param {Function} callbackError The function to be called in case of error
	 */
	getResults: function(match, callbackSuccess, callbackError) {
		var instance = this,
			content,
			host,
			matchDirectives,
			matches,
			type;

		type = match.type;

		if (type === MATCH_DIRECTIVES) {
			matchDirectives = instance.get(DIRECTIVES);

			content = match.content.toLowerCase();

			if (content.length) {
				host = instance.get(HOST);

				matchDirectives = host._filterResults(content, matchDirectives);
			}

			callbackSuccess(matchDirectives);
		}
		else if (type === MATCH_VARIABLES) {
			matches = instance._getVariableMatches(match.content);

			callbackSuccess(matches);
		}
	},

	/**
	 * Formats the selected suggestion depending on the match type and currently selected editor mode.
	 * The match type can be one of:
	 * MATCH_DIRECTOVES or MATCH_VARIABLES.
	 * The selected editor mode can be one of the following:
	 * INSERT or OVERWRITE.
	 * See {{#crossLink "AceEditor.AutoCompleteBase/fillMode:attribute"}}{{/crossLink}}
	 *
	 * @method getSuggestion
	 * @param {Object} match The provided match. It should contain at least type and content properties
	 * @param {String} selectedSuggestion The selected suggestion from the list with suggestions
	 * @return {String} The final suggestion which should be inserted to the editor
	 */
	getSuggestion: function(match, selectedSuggestion) {
		var instance = this,
			fillMode,
			lastEntry,
			result,
			type,
			variables;

		result = selectedSuggestion || _STR_EMPTY;

		if (selectedSuggestion) {
			fillMode = instance.get(HOST).get(FILL_MODE);

			type = match.type;

			if (fillMode === Base.FILL_MODE_INSERT) {
				if (type === MATCH_DIRECTIVES) {
					if (match.content && selectedSuggestion.indexOf(match.content) === 0) {
						result = selectedSuggestion.substring(match.content.length);
					}
				}
				else if (type === MATCH_VARIABLES) {
					variables = match.content.split(_DOT);

					lastEntry = variables[variables.length - 1];

					if (lastEntry && selectedSuggestion.indexOf(lastEntry) === 0) {
						result = selectedSuggestion.substring(lastEntry.length);
					}
				}
			}
			else if (type === MATCH_VARIABLES) {
				variables = match.content.split(_DOT);

				variables[variables.length - 1] = selectedSuggestion;

				result = variables.join(_DOT);
			}
		}

		return result;
	},

	/**
	 * Checks if the the provided index is the last token in the list of tokens.
	 *
	 * @method _isLastToken
	 * @param {Number} index The index which should be checked
	 * @param {Array} tokens The array with tokens
	 * @protected
	 * @return {Boolean} True if the provided index is the last token in the list
	 */
	_isLastToken: function(index, tokens) {
		return index === tokens.length - 1;
	},

	/**
	 * Retrieves the type of a token. It can be one of these:
	 * TOKEN_PUNCTUATOR_DOT = 1
	 * TOKEN_UNRECOGNIZED = -1
	 * TOKEN_VARIABLE = 0
	 *
	 * @method _getTokenType
	 * @param {Number} token The type of the token
	 * @protected
	 * @return {Number} The token type
	 */
	_getTokenType: function(token) {
		var tokenType = TOKEN_UNRECOGNIZED;

		if (Lang.isString(token)) {
			if (token.length) {
				tokenType = TOKEN_VARIABLE;
			}
			else {
				tokenType = TOKEN_PUNCTUATOR_DOT;
			}
		}

		return tokenType;
	},

	/**
	 * Scans the content and extracts variables.
	 *
	 * @method _getVariableMatches
	 * @param {String} content The content from which variable matches will be extracted
	 * @protected
	 * @return {Array} List with variable matches
	 */
	_getVariableMatches: function(content) {
		var instance = this,
			curVariableData,
			data,
			host,
			i,
			isLastToken,
			lastEntry,
			leftPartheseIndex,
			matches,
			results,
			resultsData,
			token,
			tokens,
			tokenType,
			variableData,
			variableType;

		results = [];

		data = instance.get(VARIABLES);

		resultsData = {};

		curVariableData = data.variables;

		if (content) {
			tokens = content.split(_DOT);

			lastEntry = tokens[tokens.length - 1];

			for (i = 0; i < tokens.length; i++) {
				token = tokens[i];

				tokenType = instance._getTokenType(token);

				if (tokenType === TOKEN_PUNCTUATOR_DOT) {
					if (i === 0) {
						curVariableData = {};
					}
					else {
						resultsData = curVariableData;
					}
				}
				else if (tokenType === TOKEN_VARIABLE) {
					isLastToken = instance._isLastToken(i, tokens);

					if (isLastToken) {
						resultsData = curVariableData;

						break;
					}

					leftPartheseIndex = token.indexOf('(');

					if (leftPartheseIndex !== -1) {
						token = token.substring(0, leftPartheseIndex);
					}

					variableData = curVariableData[token];

					if (variableData) {
						if (i === 0) {
							variableType = variableData.type;
						}
						else {
							variableType = variableData.returnType;
						}

						curVariableData = data.types[variableType] || {};
					}
					else if (isLastToken) {
						resultsData = curVariableData;

						break;
					}
					else {
						resultsData = {};

						break;
					}
				}
			}
		}
		else {
			resultsData = data.variables;
		}

		results = AObject.keys(resultsData);

		matches = results.sort();

		if (lastEntry) {
			host = instance.get(HOST);

			matches = host._filterResults(lastEntry, matches);
		}

		if (matches.length) {
			matches = AArray.map(
				matches,
				function(item, index) {
					var args,
						data;

					data = resultsData[item];

					if (data.type === METHOD) {
						args = AArray.map(
							data.argumentTypes,
							function(item, index) {
								var parts = item.split('.');

								return parts[parts.length - 1];
							}
						);

						return item + '(' + args.join(', ') + ')';
					}
					else {
						return item;
					}
				}
			);
		}

		return matches;
	},

	/**
	 * Normalizes a regualr expression value. If the value is String, it will be converted to an RegExp.
	 *
	 * @method _setRegexValue
	 * @param {String|RegExp} value The provided regualr expression value
	 * @protected
	 * @return {RegExp} The final instance of RegExp object
	 */
	_setRegexValue: function(value) {
		var result = A.AttributeCore.INVALID_VALUE;

		if (Lang.isString(value)) {
			result = new RegExp(value);
		}
		else if (value instanceof RegExp) {
			result = value;
		}

		return result;
	}
}, {

	/**
	 * Static property which provides a string to identify the class.
	 *
	 * @property TemplateProcessor.NAME
	 * @type String
	 * @static
	 */
	NAME: _NAME,

	/**
	 * The namespace of the plugin.
	 *
	 * @property TemplateProcessor.NS
	 * @type String
	 * @static
	 */
	NS: _NAME,

	/**
	 * Static property used to define the default attribute
	 * configuration for the TemplateProcessor.
	 *
	 * @property TemplateProcessor.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * Contains an array of all possible directives for the corresponding language.
		 *
		 * @attribute directives
		 * @type Array
		 */
		directives: {
			validator: Lang.isArray
		},

		/**
		 * The Editor in which the current instance is plugged.
		 *
		 * @attribute host
		 * @type Object
		 */
		host: {
			validator: Lang.isObject
		},

		/**
		 * Contains the supported variables for the corresponding language.
		 *
		 * @attribute variables
		 * @type Object
		 */
		variables: {
			validator: Lang.isObject
		}
	}
});

A.AceEditor.TemplateProcessor = TemplateProcessor;