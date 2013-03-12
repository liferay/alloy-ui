var Lang = A.Lang,
	AArray = A.Array,
	AObject = A.Object,

	DIRECTIVES = [
		'assign',
		'attempt',
		'break',
		'case',
		'compress',
		'default',
		'else',
		'elseif',
		'escape',
		'fallback',
		'flush',
		'ftl',
		'function',
		'global',
		'if',
		'import',
		'include',
		'list',
		'local',
		'lt',
		'macro',
		'nested',
		'noescape',
		'nt',
		'recover',
		'recurse',
		'return',
		'rt',
		'setting',
		'stop',
		'switch',
		't',
		'visit'
	],

	Base = A.AceEditor.AutoCompleteBase,

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

	REGEX_DIRECTIVES = /<#[\w.]*>?$/,
	REGEX_VARIABLES = /\$\{[\w., ()"]*\}?$/,

	STATUS_ERROR = -1,
	STATUS_SUCCESS = 0,

	ALL =  'all',
	DOT = '.',
	HOST = 'host',
	STR_EMPTY = '',
	STR_RESPONSE_DATA = 'responseData',
	VARIABLES = 'variables',

	NAME = 'aui-ace-autocomplete-freemarker';

var Freemarker = A.Component.create({
	NAME: NAME,

	NS: NAME,

	ATTRS: {
		host: {
			validator: Lang.isObject
		},

		variables: {
			validator: Lang.isObject
		}
	},

	EXTENDS: A.Base,

	prototype: {
		getMatch: function(content) {
			var instance = this;

			var match;

			var matchIndex;

			if ((matchIndex = content.lastIndexOf('<')) >= 0) {
				content = content.substring(matchIndex);

				if (REGEX_DIRECTIVES.test(content)) {
					match = {
						content: content.substring(2),
						start: matchIndex,
						type: MATCH_DIRECTIVES
					};
				}
			}
			else if ((matchIndex = content.lastIndexOf('$')) >= 0) {
				content = content.substring(matchIndex);

				if (REGEX_VARIABLES.test(content)) {
					match = {
						content: content.substring(2),
						start: matchIndex,
						type: MATCH_VARIABLES
					};
				}
			}

			return match;
		},

		getResults: function(match, callbackSuccess, callbackError) {
			var instance = this;

			var type = match.type;

			if (type === MATCH_DIRECTIVES) {
				var matchDirectives = DIRECTIVES;

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

			var variableCache = instance.get(VARIABLES);

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
		}
	}
});

Freemarker.DIRECTIVES = DIRECTIVES;

A.AceEditor.AutoCompleteFreemarker = Freemarker;