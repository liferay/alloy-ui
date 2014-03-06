/**
 * The Search Component
 *
 * @module aui-search
 * @submodule aui-search-ternary-search-node
 */

var Lang = A.Lang;

/**
 * A base class for TernarySearchNode.
 *
 * @class A.TernarySearchNode
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var TernarySearchNode = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'TernarySearchNode',

    /**
     * Static property provides a string to identify the namespace.
     *
     * @property NS
     * @type String
     * @static
     */
    NS: 'ternarysearchnode',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.TernarySearchNode`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * String formed by a single letter.
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
         * The child node in the tree.
         *
         * @attribute child
         */
        child: {
            validator: '_validateChild'
        },

        /**
         * The larger node in the tree.
         *
         * @attribute largerNode
         * @type A.TernarySearchNode
         */
        largerNode: {
            validator: '_isInstanceOfNode'
        },

        /**
         * The smaller node in the tree.
         *
         * @attribute smallerNode
         * @type A.TernarySearchNode
         */
        smallerNode: {
            validator: '_isInstanceOfNode'
        },

        /**
         * String formed by a group of letters.
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
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Base,

    prototype: {

        /**
         * Converts the `word` attribute value to a `Boolean` and ensures a
         * `Boolean` type.
         *
         * @method isEndOfWord
         */
        isEndOfWord: function() {
            return !!this.get('word');
        },

        /**
         * Checks if the argument is an instance of `A.TernarySearchNode`.
         *
         * @method _isInstanceOfNode
         * @param value
         * @protected
         * @return {Boolean}
         */
        _isInstanceOfNode: function(value) {
            return value instanceof A.TernarySearchNode;
        },

        /**
         * Checks if the argument is a `String` and contains only one character.
         *
         * @method _validateCharacter
         * @param value
         * @protected
         * @return {Boolean}
         */
        _validateCharacter: function(value) {
            return Lang.isString(value) && value.length === 1;
        }
    }
});

A.TernarySearchNode = TernarySearchNode;
