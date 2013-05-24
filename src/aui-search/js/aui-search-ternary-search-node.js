/**
 * The Search Component
 *
 * @module aui-search
 * @submodule aui-search-ternary-search-node
 */

var Lang = A.Lang,
	NAME = 'TernarySearchNode';

/**
 * A base class for TernarySearchNode.
 *
 * @class A.TernarySearchNode
 * @extends A.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var TernarySearchNode = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property TernarySearchNode.NAME
	 * @type String
	 * @static
	 */
	NAME: NAME,

	/**
	 * Static property provides a string to identify the namespace.
	 *
	 * @property TernarySearchNode.NS
	 * @type String
	 * @static
	 */
	NS: 'ternarysearchnode',

	/**
	 * Static property used to define the default attribute
	 * configuration for the TernarySearchNode.
	 *
	 * @property TernarySearchNode.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute character
		 * @type String
		 * @writeOnce
		 */
		character: {
			validator: '_validateCharacter',
			writeOnce: true
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute child
		 */
		child: {
			validator: '_validateChild'
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute largerNode
		 * @type TernarySearchNode
		 */
		largerNode: {
			validator: '_isInstanceOfNode'
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute smallerNode
		 * @type TernarySearchNode
		 */
		smallerNode: {
			validator: '_isInstanceOfNode'
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute word
		 * @type String
		 */
		word: {
			validator: Lang.isString
		}
	},

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property TernarySearchNode.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.Base,

	prototype: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method isEndOfWord
		 */
		isEndOfWord: function() {
			return !!this.get('word');
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _isInstanceOfNode
		 * @param value
		 * @protected
		 */
		_isInstanceOfNode: function(value) {
			return value instanceof A.TernarySearchNode;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _validateCharacter
		 * @param value
		 * @protected
		 */
		_validateCharacter: function(value) {
			return Lang.isString(value) && value.length === 1;
		}
	}
});

A.TernarySearchNode = TernarySearchNode;