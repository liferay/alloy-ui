AUI.add('aui-ace-autocomplete-templateprocessor', function(A) {
var Lang = A.Lang,
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

			var variables = content.split(DOT);

			var variableCache = instance.get('variables');

			var lastEntry = variables[variables.length - 1];

			variables.length -= 1;

			var variable;

			if (variables.length > 0) {
				for (var i = 0; i < variables.length; i++) {
					variable = variables[i];

					if (Lang.isObject(variableCache)) {
						variableCache = variableCache[variable];
					}
				}
			}

			var matches = [];

			lastEntry = lastEntry.toLowerCase();

			if (Lang.isObject(variableCache)) {
				var host = instance.get(HOST);

				matches = host._filterResults(lastEntry, AObject.keys(variableCache));
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
