var Lang = A.Lang,
	AArray = A.Array,
	AObject = A.Object,

	DIRECTIVES = [
		'flush',
		'recover',
		'fallback',
		'local',
		'break',
		'lt',
		'case',
		'global',
		'if',
		'compress',
		'escape',
		'assign',
		'elseif',
		'noescape',
		'setting',
		'list',
		'else',
		'switch',
		'include',
		'recurse',
		'rt',
		'ftl',
		'macro',
		'stop',
		'nt',
		'visit',
		'attempt',
		'nested',
		'import',
		'default',
		'return',
		't',
		'function'
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
		initializer: function(config) {
			var instance = this;

			instance._tstree = new A.TernarySearchTree();
		},

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

			var tstree = instance._tstree;

			var type = match.type;

			if (type === MATCH_DIRECTIVES) {
				var matchDirectives = DIRECTIVES;

				var content = match.content;

				if (content.length) {
					if (instance._lastTSTLoad !== MATCH_DIRECTIVES) {
						instance._addDirectives();
					}

					matchDirectives = tstree.prefixSearch(content, true);
				}
				else {
					matchDirectives = matchDirectives.sort();
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
				var fillMode = instance.get('host').get('fillMode');

				if (fillMode === Base.FILL_MODE_INSERT) {
					var type = match.type;

					if (type === MATCH_DIRECTIVES) {
						if (match.content && selectedSuggestion.indexOf(match.content) === 0) {
							result = selectedSuggestion.substring(match.content.length);
						}
					}
					else if (type === MATCH_VARIABLES) {
						var variables = match.content.split(DOT);

						var lastEntry = variables[variables.length - 1];

						if (lastEntry && selectedSuggestion.indexOf(lastEntry) === 0) {
							result = selectedSuggestion.substring(lastEntry.length);
						}
					}
				}
			}

			return result;
		},

		_addData: function(data) {
			var instance = this;

			var tstree = instance._tstree;

			tstree.empty();

			AArray.each(
				data,
				function(item, index) {
					tstree.add(item);
				}
			);
		},

		_addDirectives: function() {
			var instance = this;

			instance._addData(DIRECTIVES);

			instance._lastTSTLoad = MATCH_DIRECTIVES;
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

			if (Lang.isObject(variableCache)) {
				AArray.each(
					AObject.keys(variableCache),
					function(item, index) {
						matches.push(item);
					}
				);

				if (lastEntry) {
					var tstree = instance._tstree;

					tstree.empty();

					AArray.each(
						matches,
						function(item, index) {
							tstree.add(item);
						}
					);

					matches = tstree.prefixSearch(lastEntry, true);

					instance._lastTSTLoad = MATCH_VARIABLES;
				}
			}

			return matches;
		}
	}
});

Freemarker.DIRECTIVES = DIRECTIVES;

A.AceEditor.AutoCompleteFreemarker = Freemarker;