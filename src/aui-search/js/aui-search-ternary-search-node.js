var Lang = A.Lang,

	NAME = 'TernarySearchNode';

var TernarySearchNode = A.Component.create({
	NAME: NAME,

	NS: 'ternarysearchnode',

	ATTRS: {
		character: {
			validator: '_validateCharacter',
			writeOnce: true
		},

		child: {
			validator: '_validateChild'
		},

		largerNode: {
			validator: '_isInstanceOfNode'
		},

		smallerNode: {
			validator: '_isInstanceOfNode'
		},

		word: {
			validator: Lang.isString
		}
	},

	EXTENDS: A.Base,

	prototype: {
		isEndOfWord: function() {
			return !!this.get('word');
		},

		_isInstanceOfNode: function(value) {
			return value instanceof A.TernarySearchNode;
		},

		_validateCharacter: function(value) {
			return Lang.isString(value) && value.length === 1;
		}
	}
});

A.TernarySearchNode = TernarySearchNode;