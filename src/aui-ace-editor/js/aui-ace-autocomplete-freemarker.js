/**
 * The ACE Editor Component
 *
 * @module aui-ace-editor
 * @submodule aui-ace-autocomplete-freemarker
 */

var Lang = A.Lang,
    Base = A.AceEditor.AutoCompleteBase,

    MATCH_DIRECTIVES = 0,
    MATCH_VARIABLES = 1,

    _NAME = 'aui-ace-autocomplete-freemarker',

    DIRECTIVES_MATCHER = 'directivesMatcher',
    VARIABLES_MATCHER = 'variablesMatcher',

/**
 * A base class for Freemarker.
 *
 * @class A.Freemarker
 * @extends A.AceEditor.TemplateProcessor
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
Freemarker = A.Base.create(_NAME, A.AceEditor.TemplateProcessor, [
], {

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getMatch
     * @param content
     */
    getMatch: function(content) {
        var instance = this,
            match,
            matchIndex;

        if ((matchIndex = content.lastIndexOf('<')) >= 0) {
            content = content.substring(matchIndex);

            if (instance.get(DIRECTIVES_MATCHER).test(content)) {
                match = {
                    content: content.substring(2),
                    start: matchIndex,
                    type: MATCH_DIRECTIVES
                };
            }
        }
        else if ((matchIndex = content.lastIndexOf('$')) >= 0) {
            content = content.substring(matchIndex);

            if (instance.get(VARIABLES_MATCHER).test(content)) {
                match = {
                    content: content.substring(2),
                    start: matchIndex,
                    type: MATCH_VARIABLES
                };
            }
        }

        return match;
    }
}, {

    /**
     * Static property provides a string to identify the class.
     *
     * @property Freemarker.NAME
     * @type String
     * @static
     */
    NAME: _NAME,

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @property Freemarker.NS
     * @type String
     * @static
     */
    NS: _NAME,

    /**
     * Static property used to define the default attribute
     * configuration for the Freemarker.
     *
     * @property Freemarker.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute directives
         * @type Array
         */
        directives: {
            validator: Lang.isArray,
            value: [
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
            ]
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute directivesMatcher
         */
        directivesMatcher: {
            setter: '_setRegexValue',
            value: /<#[\w]*[^<#]*$/
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute host
         * @type Object
         */
        host: {
            validator: Lang.isObject
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute variables
         * @type Object
         */
        variables: {
            validator: Lang.isObject
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * @attribute variablesMatcher
         */
        variablesMatcher: {
            setter: '_setRegexValue',
            value: /\${[\w., ()"]*(?:[^$]|\\\$)*$/
        }
    }
});

A.AceEditor.AutoCompleteFreemarker = Freemarker;