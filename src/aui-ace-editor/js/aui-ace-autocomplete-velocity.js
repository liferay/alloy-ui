/**
 * The ACE Editor Velocity Plugin
 *
 * @module aui-ace-editor
 * @submodule aui-ace-autocomplete-velocity
 */

var Lang = A.Lang,

	Base = A.AceEditor.AutoCompleteBase,

	MATCH_DIRECTIVES = 0,
	MATCH_VARIABLES = 1,

	_NAME = 'aui-ace-autocomplete-velocity',

	DIRECTIVES_MATCHER = 'directivesMatcher',
	VARIABLES_MATCHER = 'variablesMatcher',

/**
 * A base class for Velocity plugin.
 *
 * @class A.Velocity
 * @extends A.AceEditor.TemplateProcessor
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
Velocity = A.Base.create(_NAME, A.AceEditor.TemplateProcessor, [], {

	/**
     * Checks if the provided content contains directive or variable.
     *
     * @method getMatch
     * @param {String} content The content which should be traversed for matches
     * @return {Object} An Object which contains the following properties:
     * content - the found content
     * start - the start index of the match
     * type - match type, could be 0 (DIRECTIVES) or 1 (VARIABLES)
     */
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

	/**
	 * Static property which provides a string to identify the class.
	 *
	 * @property Velocity.NAME
	 * @type String
	 * @static
	 */
	NAME: _NAME,

	/**
	 * The namespace of the plugin.
	 *
	 * @property Velocity.NS
	 * @type String
	 * @static
	 */
	NS: _NAME,

	/**
	 * Static property used to define the default attribute
	 * configuration for the Velocity.
	 *
	 * @property Velocity.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
         * Contains the list of supported directives according to Velocity specification.
         *
         * @attribute directives
         * @default
         * value: [
		 *  'else',
		 *  'elseif',
		 *  'foreach',
		 *  'if',
		 *  'include',
		 *  'macro',
		 *  'parse',
		 *  'set',
		 *  'stop'
		 *]
         * @type Array
         */
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

		/**
		 * Contains the regular expression which checks for directive.
		 *
		 * @attribute directivesMatcher
		 * @default /#[\w]*[^#]*$/
		 */
		directivesMatcher: {
			setter: '_setRegexValue',
			value: /#[\w]*[^#]*$/
		},

		/**
		 * he Editor in which the current instance is plugged.
		 *
		 * @attribute host
		 * @type Object
		 */
		host: {
			validator: Lang.isObject
		},

		/**
		 * Contains the supported variables.
		 *
		 * @attribute variables
		 * @type Object
		 */
		variables: {
			validator: Lang.isObject
		},

		/**
		 * Contains the regular expression which will check for variable match.
		 *
		 * @attribute variablesMatcher
		 * @default /\$[\w., ()"]*(?:[^$]|\\\$)*$/
		 */
		variablesMatcher: {
			setter: '_setRegexValue',
			value: /\$[\w., ()"]*(?:[^$]|\\\$)*$/
		}
	}
});

A.AceEditor.AutoCompleteVelocity = Velocity;