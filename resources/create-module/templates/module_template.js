var Lang = A.Lang,
	isString = Lang.isString,

	@module.base.name.constant@ = '@module.base.name.camelcase@',

	getClassName = A.getClassName,

	CSS_ = getClassName(@module.base.name.constant@);

@module.base.name.camelcase@ = A.Component.create(
	{
		NAME: @module.base.name.constant@,

		ATTRS: {

		},

		prototype: {
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
		}
	}
);

A.@module.base.name.camelcase@ = @module.base.name.camelcase@;