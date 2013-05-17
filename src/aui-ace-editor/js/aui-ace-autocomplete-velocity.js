var Lang = A.Lang,

	Base = A.AceEditor.AutoCompleteBase,

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

	_NAME = 'aui-ace-autocomplete-velocity',

	DIRECTIVES_MATCHER = 'directivesMatcher',
	VARIABLES_MATCHER = 'variablesMatcher',

Velocity = A.Base.create(_NAME, A.AceEditor.TemplateProcessor, [], {
    getMatch: function(content) {
        var instance = this,
            match,
            matchIndex;

        if ((matchIndex = content.lastIndexOf('#')) >= 0) {
            content = content.substring(matchIndex);

            if (instance.get(DIRECTIVES_MATCHER).test(content)) {
                match = {
                    content: content.substring(1),
                    start: matchIndex,
                    type: MATCH_DIRECTIVES
                };
            }
        }
        else if ((matchIndex = content.lastIndexOf('$')) >= 0) {
            content = content.substring(matchIndex);

            if (instance.get(VARIABLES_MATCHER).test(content)) {
                match = {
                    content: content.substring(1),
                    start: matchIndex,
                    type: MATCH_VARIABLES
                };
            }
        }

        return match;
    }
}, {
	NAME: _NAME,

	NS: _NAME,

	ATTRS: {
		directives: {
			validator: Lang.isArray,
			value: [
				'else',
				'elseif',
				'foreach',
				'if',
				'include',
				'macro',
				'parse',
				'set',
				'stop'
			]
		},

		directivesMatcher: {
			setter: '_setRegexValue',
			value: /#[\w]*[^#]*$/
		},

		host: {
			validator: Lang.isObject
		},

		variables: {
			validator: Lang.isObject
		},

		variablesMatcher: {
			setter: '_setRegexValue',
			value: /\$[\w., ()"]*(?:[^$]|\\\$)*$/
		}
    }
});

A.AceEditor.AutoCompleteVelocity = Velocity;