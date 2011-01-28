AUI.add('aui-component-lazy', function(A) {

var L = A.Lang,
	isString = L.isString,

	BOUNDING_BOX = 'boundingBox';

/*
* Base
*/
function MyBase(config) {
	MyBase.superclass.constructor.apply(this, arguments);
}

A.mix(MyBase, {
	NAME: 'MyBase',

	ATTRS: {
		myBase: {
			setter: function(v) {
				console.log('setter myBase');

				return v;
			}
		}
	}
});

A.extend(MyBase, A.Base, {
	initializer: function() {
		console.log('MyBase initializer');
	}
});

A.MyBase = MyBase;


/*
* Widget
*/
function MyWidget(config) {
	MyWidget.superclass.constructor.apply(this, arguments);
}

A.mix(MyWidget, {
	NAME: 'MyWidget',

	ATTRS: {
		myWidget: {
			setter: function(v) {
				console.log('setter myWidget');

				return v;
			}
		},

		_initDrag: function() {
			var instance = this;


		},

		_initResize: function() {
			var instance = this;


		}
	},

	COMPONENTS: {
		drag: {
			requires: ['dd'],
			// initializer: '_initDrag'
			initializer: {
				on: {
					mouseenter: {
						node: boundingBox,
						fn: '_initDrag'
					},

					click: {
						node: 'body',
						fn: '_initDrag'
					}
				}
			}
		},

		resize: {
			requires: ['aui-resize'],
			initializer: '_initResize'
		}
	}
});

A.extend(MyWidget, A.Widget, {
	initializer: function() {
		console.log('MyWidget initializer');
	},

	renderUI: function() {
		var instance = this;

		console.log('MyWidget render UI');

		instance.box = A.Node.create('<div class="red"></div>');

		instance.get(BOUNDING_BOX).append(instance.box);
	}
});

A.MyWidget = MyWidget;



/*
* LazyFetch
*/

var LazyFetch =	function() {
	this._initializer.apply(this, arguments);
};

LazyFetch.prototype = {
	// initializer: function() {
	// 	var instance = this;
	//
	// 	console.log('LazyFetch initializer Base');
	// },

	_initializer: function(config) {
		console.log(arguments);
		console.log('LazyFetch initializer');

		console.log(this);

		// this.after('initializedChange', function() {
		// 	console.log( this.get('myWidget') );
		// });
	},

	test: function() {}
};

A.LazyFetch = LazyFetch;

// A.MyExt = MyExt;
A.MyBase = A.Base.mix(MyBase, [A.LazyFetch]);
A.MyWidget = A.Base.mix(MyWidget, [A.LazyFetch]);
// A.MyExt = A.augment(MyExt, [ComponentLazy]);

}, '@VERSION', { requires: [ 'aui-base', 'base', 'log' ] });