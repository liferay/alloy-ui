YUI.add('aui-search-tst', function (A, NAME) {

/**
 * The Search Component
 *
 * @module aui-search
 * @submodule aui-search-ternary-search-tree
 */

var Lang = A.Lang;

/**
 * A base class for TernarySearchTree.
 *
 * @class A.TernarySearchTree
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var TernarySearchTree = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'TernarySearchTree',

    /**
     * Static property provides a string to identify the namespace.
     *
     * @property NS
     * @type String
     * @static
     */
    NS: 'ternarysearchtree',

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
         * Adds a word in the tree.
         *
         * @method add
         * @param word
         */
        add: function(word) {
            var instance = this;

            var root = instance._root;

            var node = instance._insert(root, word, 0);

            if (!Lang.isValue(root)) {
                instance._root = node;
            }
        },

        /**
         * Checks if the argument is part of the tree.
         *
         * @method contains
         * @param word
         * @return {Boolean}
         */
        contains: function(word) {
            var instance = this;

            var node = instance._search(instance._root, word, 0);

            return !!(Lang.isValue(node) && node.isEndOfWord());
        },

        /**
         * Set tree's root to `null`.
         *
         * @method empty
         */
        empty: function() {
            var instance = this;

            instance._root = null;
        },

        /**
         * Checks if a pattern match.
         *
         * @method patternMatch
         * @param pattern
         * @return {Array}
         */
        patternMatch: function(pattern) {
            var instance = this;

            var results = [];

            instance._patternMatch(instance._root, pattern, 0, results);

            return results;
        },

        /**
         * Searches for a prefix in the tree.
         *
         * @method prefixSearch
         * @param prefix
         * @return {Array}
         */
        prefixSearch: function(prefix) {
            var instance = this;

            var results = [];

            var node = instance._search(instance._root, prefix, 0);

            if (node) {
                instance._inOrderTraversal(node.get('child'), results);
            }

            return results;
        },

        /**
         * Traversals a tree.
         *
         * @method _inOrderTraversal
         * @param node
         * @param results
         * @protected
         */
        _inOrderTraversal: function(node, results) {
            var instance = this;

            if (!Lang.isValue(node)) {
                return;
            }

            instance._inOrderTraversal(node.get('smallerNode'), results);

            if (node.isEndOfWord()) {
                results.push(node.get('word'));
            }

            instance._inOrderTraversal(node.get('child'), results);

            instance._inOrderTraversal(node.get('largerNode'), results);
        },

        /**
         * Insert a node in the tree.
         *
         * @method _insert
         * @param node
         * @param word
         * @param index
         * @protected
         */
        _insert: function(node, word, index) {
            var instance = this;

            var character = word.charAt(index);

            if (Lang.isValue(node)) {
                if (character === node.get('character')) {
                    if (index + 1 < word.length) {
                        node.set('child', instance._insert(node.get('child'), word, index + 1));
                    }
                    else {
                        node.set('word', word);
                    }
                }
                else if (character < node.get('character')) {
                    node.set('smallerNode', instance._insert(node.get('smallerNode'), word, index));
                }
                else {
                    node.set('largerNode', instance._insert(node.get('largerNode'), word, index));
                }
            }
            else {
                node = instance._insert(
                    new A.TernarySearchNode({
                        character: character
                    }),
                    word,
                    index
                );
            }

            return node;
        },

        /**
         * Recursive search for a pattern in the tree.
         *
         * @method _patternMatch
         * @param node
         * @param pattern
         * @param index
         * @param results
         * @protected
         */
        _patternMatch: function(node, pattern, index, results) {
            var instance = this;

            if (Lang.isValue(node)) {
                var character = pattern.charAt(index);

                var nodeCharacter = node.get('character');

                var patternChar = TernarySearchTree.PATTERN_CHAR;

                if (character === patternChar || character < nodeCharacter) {
                    instance._patternMatch(node.get('smallerNode'), pattern, index, results);
                }

                if (character === patternChar || character === nodeCharacter) {
                    if (index + 1 < pattern.length) {
                        instance._patternMatch(node.get('child'), pattern, index + 1, results);
                    }
                    else if (node.isEndOfWord()) {
                        results.push(node.get('word'));
                    }
                }

                if (character === patternChar || character > nodeCharacter) {
                    instance._patternMatch(node.get('largerNode'), pattern, index, results);
                }
            }
        },

        /**
         * Recursive search for a node in the tree.
         *
         * @method _search
         * @param node
         * @param word
         * @param index
         * @protected
         */
        _search: function(node, word, index) {
            var instance = this;

            var result = node;

            if (Lang.isValue(node)) {
                var character = word.charAt(index);

                var nodeCharacter = node.get('character');

                if (character === nodeCharacter) {
                    if (index + 1 < word.length) {
                        result = instance._search(node.get('child'), word, index + 1);
                    }
                }
                else if (character < nodeCharacter) {
                    result = instance._search(node.get('smallerNode'), word, index);
                }
                else {
                    result = instance._search(node.get('largerNode'), word, index);
                }
            }

            return result;
        }
    }
});

TernarySearchTree.PATTERN_CHAR = '?';

A.TernarySearchTree = TernarySearchTree;
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


}, '3.0.1', {"requires": ["aui-component"]});
