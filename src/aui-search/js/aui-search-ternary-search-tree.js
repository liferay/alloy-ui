/**
 * The Search Component
 *
 * @module aui-search
 * @submodule aui-search-ternary-search-tree
 */

var Lang = A.Lang,

	NAME = 'TernarySearchTree',

	CHARACTER = 'character',
	CHILD = 'child',
	LARGER_NODE = 'largerNode',
	SMALLER_NODE = 'smallerNode',
	WORD = 'word';

/**
 * A base class for TernarySearchTree.
 *
 * @class A.TernarySearchTree
 * @extends A.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var TernarySearchTree = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property TernarySearchTree.NAME
	 * @type String
	 * @static
	 */
	NAME: NAME,

	/**
	 * Static property provides a string to identify the namespace.
	 *
	 * @property TernarySearchTree.NS
	 * @type String
	 * @static
	 */
	NS: 'ternarysearchtree',

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property TernarySearchTree.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: A.Base,

	prototype: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method contains
		 * @param word
		 */
		contains: function(word) {
			var instance = this;

			var node = instance._search(instance._root, word, 0);

			return !!(Lang.isValue(node) && node.isEndOfWord());
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method empty
		 */
		empty: function() {
			var instance = this;

			instance._root = null;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method patternMatch
		 * @param pattern
		 */
		patternMatch: function(pattern) {
			var instance = this;

			var results = [];

			instance._patternMatch(instance._root, pattern, 0, results);

			return results;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method prefixSearch
		 * @param prefix
		 */
		prefixSearch: function(prefix) {
			var instance = this;

			var results = [];

			var node = instance._search(instance._root, prefix, 0);

			if (node) {
				instance._inOrderTraversal(node.get(CHILD), results);
			}

			return results;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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

			instance._inOrderTraversal(node.get(SMALLER_NODE), results);

			if (node.isEndOfWord()) {
				results.push(node.get(WORD));
			}

			instance._inOrderTraversal(node.get(CHILD), results);

			instance._inOrderTraversal(node.get(LARGER_NODE), results);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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
				if (character === node.get(CHARACTER)) {
					if (index + 1 < word.length) {
						node.set(CHILD, instance._insert(node.get(CHILD), word, index + 1));
					}
					else {
						node.set(WORD, word);
					}
				}
				else if (character < node.get(CHARACTER)) {
					node.set(SMALLER_NODE, instance._insert(node.get(SMALLER_NODE), word, index));
				}
				else {
					node.set(LARGER_NODE, instance._insert(node.get(LARGER_NODE), word, index));
				}
			}
			else {
				node = instance._insert(
					new A.TernarySearchNode(
						{
							character: character
						}
					),
					word,
					index
				);
			}

			return node;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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

				var nodeCharacter = node.get(CHARACTER);

				var patternChar = TernarySearchTree.PATTERN_CHAR;

				if (character === patternChar || character < nodeCharacter) {
					instance._patternMatch(node.get(SMALLER_NODE), pattern, index, results);
				}

				if (character === patternChar || character === nodeCharacter) {
					if (index + 1 < pattern.length) {
						instance._patternMatch(node.get(CHILD), pattern, index + 1, results);
					}
					else if (node.isEndOfWord()) {
						results.push(node.get(WORD));
					}
				}

				if (character === patternChar || character > nodeCharacter) {
					instance._patternMatch(node.get(LARGER_NODE), pattern, index, results);
				}
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
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

				var nodeCharacter = node.get(CHARACTER);

				if (character === nodeCharacter) {
					if (index + 1 < word.length) {
						result = instance._search(node.get(CHILD), word, index + 1);
					}
				}
				else if (character < nodeCharacter) {
					result = instance._search(node.get(SMALLER_NODE), word, index);
				}
				else {
					result = instance._search(node.get(LARGER_NODE), word, index);
				}
			}

			return result;
		}
	}
});

TernarySearchTree.PATTERN_CHAR = '?';

A.TernarySearchTree = TernarySearchTree;