var L = A.Lang,
	isString = L.isString,

	@module.base.name.constant@ = '@module.base.name.camelcase@',

	getCN = A.ClassNameManager.getClassName,

	CSS_ = getCN(@module.base.name.constant@);

function @module.base.name.camelcase@(config) {
	@module.base.name.camelcase@.superclass.constructor.apply(this, arguments);
}

A.mix(@module.base.name.camelcase@, {
	NAME: @module.base.name.constant@,

	ATTRS: {

	}
});

A.extend(@module.base.name.camelcase@, A.Widget, {
	/*
	* Lifecycle
	*/
	initializer: function() {
		var instance = this;


	},

	/*
	* Methods
	*/
	method_name: function() {
		var instance = this;


	}
});

A.@module.base.name.camelcase@ = @module.base.name.camelcase@;