/*
* AUI Base
*/
AUI.add('aui-base', function(A) {

	A.mix(A.Array, {
		remove: function(a, from, to) {
		  var rest = a.slice((to || from) + 1 || a.length);
		  a.length = (from < 0) ? (a.length + from) : from;

		  return a.push.apply(a, rest);
		},

		removeItem: function(a, item) {
			var index = A.Array(a).indexOf(item);

		  	return A.Array.remove(a, index);
		}
	});

}, '@VERSION', { requires: [ 'yui-base' ] });

/*
* AUI Node
*/
AUI.add('aui-node', function(A) {

	var L = A.Lang,
		isString = L.isString,

		INNER_HTML = 'innerHTML';

	A.mix(A.Node.prototype, {
		html: function() {
			var args = arguments, length = args.length;

			if (length) {
				A.Node.DEFAULT_SETTER.apply(this, [ INNER_HTML, args[0] ]);
			}
			else {
				return this.get(INNER_HTML);
			}

			return this;
		}
	}, true);

	A.Node.ATTRS.innerHTML = {
		setter: function(v) {
			A.Node.DEFAULT_SETTER.apply(this, [ INNER_HTML, v ]);

			return v;
		}
	};

}, '@VERSION', { requires: [ 'node' ] });