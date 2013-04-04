AUI.add('aui-ace-autocomplete-templateprocessor', function(A) {
var Lang = A.Lang,
	AArray = A.Array,
	AObject = A.Object,
	Base = A.AceEditor.AutoCompleteBase,

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

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

		_getVariableMatches: function(content) {
			var instance = this;

			var results = [];

			var resultsData = {};

			var lastEntry;

			var data = instance.get('variables');

			var parts = content.split(DOT);

			if (parts.length) {
				var lastEntryIndex = parts.length - 1;

				lastEntry = parts[parts.length - 1];

				var part = parts[0];

				var variableData = data.variables[part];

				if (variableData) {
					var variableType = variableData.type;

					var typeData = data.types[variableType];

					for (var i = 1; typeData && i < parts.length; i++) {
						part = parts[i];

						if (i < lastEntryIndex) {
							var leftPartheseIndex = part.indexOf('(');

							if (leftPartheseIndex !== -1) {
								part = part.substring(0, leftPartheseIndex);
							}
						}

						var tmp = typeData[part];

						if (tmp) {
							var returnType = tmp.returnType;

							typeData = data.types[returnType];
						}
						else {
							break;
						}
					}

					if (typeData) {
						resultsData = typeData;
					}
				}
				else {
					resultsData = data.variables;
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

}, '@VERSION@' ,{requires:['aui-ace-autocomplete-base']});
