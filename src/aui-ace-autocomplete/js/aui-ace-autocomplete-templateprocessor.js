var Lang = A.Lang,
	AArray = A.Array,
	AObject = A.Object,
	Base = A.AceEditor.AutoCompleteBase,

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

	TOKEN_PUNCTUATOR_DOT = 1,
	TOKEN_UNRECOGNIZED = -1,
	TOKEN_VARIABLE = 0,

	DOT = '.',
	HOST = 'host',
	STR_EMPTY = '',

	NAME = 'aui-ace-autocomplete-templateprocessor';

var TemplateProcessor = A.Component.create({
	NAME: NAME,

	NS: NAME,

	ATTRS: {
		directives: {
			validator: Lang.isArray
		},

		host: {
			validator: Lang.isObject
		},

		variables: {
			validator: Lang.isObject
		}
	},

	EXTENDS: A.Base,

	prototype: {
		getResults: function(match, callbackSuccess, callbackError) {
			var instance = this;

			var type = match.type;

			if (type === MATCH_DIRECTIVES) {
				var matchDirectives = instance.get('directives');

				var content = match.content.toLowerCase();

				if (content.length) {
					var host = instance.get(HOST);

					matchDirectives = host._filterResults(content, matchDirectives);
				}

				callbackSuccess(matchDirectives);
			}
			else if (type === MATCH_VARIABLES) {
				var matches = instance._getVariableMatches(match.content);

				callbackSuccess(matches);
			}
		},

		getSuggestion: function(match, selectedSuggestion) {
			var instance = this;

			var result = selectedSuggestion || STR_EMPTY;

			if (selectedSuggestion) {
				var fillMode = instance.get(HOST).get('fillMode');

				var type = match.type;

				var variables;

				var lastEntry;

				if (fillMode === Base.FILL_MODE_INSERT) {
					if (type === MATCH_DIRECTIVES) {
						if (match.content && selectedSuggestion.indexOf(match.content) === 0) {
							result = selectedSuggestion.substring(match.content.length);
						}
					}
					else if (type === MATCH_VARIABLES) {
						variables = match.content.split(DOT);

						lastEntry = variables[variables.length - 1];

						if (lastEntry && selectedSuggestion.indexOf(lastEntry) === 0) {
							result = selectedSuggestion.substring(lastEntry.length);
						}
					}
				}
				else if (type === MATCH_VARIABLES) {
					variables = match.content.split(DOT);

					variables[variables.length - 1] = selectedSuggestion;

					result = variables.join(DOT);
				}
			}

			return result;
		},

		_isLastToken: function(index, tokens) {
			return index === tokens.length - 1;
		},

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

		_getVariableMatches: function(content) {
			var instance = this;

			var results = [];

			var data = instance.get('variables');

			var resultsData = {};

			var curVariableData = data.variables;

			var lastEntry;

			if (content) {
				var tokens = content.split(DOT);

				lastEntry = tokens[tokens.length - 1];

				for (var i = 0; i < tokens.length; i++) {
					var token = tokens[i];

					var tokenType = instance._getTokenType(token);

					if (tokenType === TOKEN_PUNCTUATOR_DOT) {
						if (i === 0) {
							curVariableData = {};
						}
						else {
							resultsData = curVariableData;
						}
					}
					else if (tokenType === TOKEN_VARIABLE) {
						var isLastToken = instance._isLastToken(i, tokens);

						if (isLastToken) {
							resultsData = curVariableData;

							break;
						}

						var leftPartheseIndex = token.indexOf('(');

						if (leftPartheseIndex !== -1) {
							token = token.substring(0, leftPartheseIndex);
						}

						var variableData = curVariableData[token];

						if (variableData) {
							var variableType;

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

			var matches = results.sort();

			if (lastEntry) {
				var host = instance.get(HOST);

				matches = host._filterResults(lastEntry, matches);
			}

			if (matches.length) {
				matches = AArray.map(
					matches,
					function(item, index) {
						var data = resultsData[item];

						if (data.type === 'Method') {
							var args = AArray.map(
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
	}
});

A.AceEditor.TemplateProcessor = TemplateProcessor;