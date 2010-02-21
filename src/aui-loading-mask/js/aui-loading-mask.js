var Lang = A.Lang,

	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	HIDE = 'hide',
	HOST = 'host',
	MESSAGE_EL = 'messageEl',
	NAME = 'loadingmask',
	POSITION = 'position',
	SHOW = 'show',
	STATIC = 'static',
	STRINGS = 'strings',
	TARGET = 'target',
	TOGGLE = 'toggle',

	getClassName = A.ClassNameManager.getClassName,

	CSS_LOADINGMASK = getClassName(NAME),
	CSS_MASKED = getClassName(NAME, 'masked'),
	CSS_MASKED_RELATIVE = getClassName(NAME, 'masked', 'relative'),
	CSS_MESSAGE_LOADING = getClassName(NAME, 'message'),
	CSS_MESSAGE_LOADING_CONTENT = getClassName(NAME, 'message', 'content'),

	TPL_MESSAGE_LOADING = '<div class="' + CSS_MESSAGE_LOADING + '"><div class="' + CSS_MESSAGE_LOADING_CONTENT + '">{0}</div></div>';

var LoadingMask = function(config) {
	LoadingMask.superclass.constructor.apply(this, arguments);
};

LoadingMask.NAME = NAME;
LoadingMask.NS = NAME;

LoadingMask.ATTRS = {
	messageEl: {
		valueFn: function(val) {
			var instance = this;
			var strings = instance.get(STRINGS);

			return A.Node.create(
				A.substitute(TPL_MESSAGE_LOADING, [strings.loading])
			);
		}
	},

	strings: {
		value: {
			loading: 'Loading&hellip;'
		}
	},

	target: {
		setter: function() {
			var instance = this;
			var target = instance.get(HOST);

			if (target instanceof A.Widget) {
				target = target.get(CONTENT_BOX);
			}

			return target;
		},
		value: null
	}
};

A.extend(
	LoadingMask,
	A.Plugin.Base,
	{
		/*
		* Lifecycle
		*/
		initializer: function(config) {
			var instance = this;

			instance.IGNORED_ATTRS = A.merge(
				{
					host: true
				},
				LoadingMask.ATTRS
			);

			instance.renderUI();
			instance.bindUI();

			instance._createDynamicAttrs(config);
		},

		renderUI: function() {
			var instance = this;
			var strings = instance.get(STRINGS);

			instance._renderOverlayMask();

			instance.overlayMask.get(BOUNDING_BOX).append(
				instance.get(MESSAGE_EL)
			);
		},

		bindUI: function() {
			var instance = this;

			instance._bindOverlayMaskUI();
		},

		_bindOverlayMaskUI: function() {
			var instance = this;

			instance.overlayMask.after('visibleChange', instance._afterVisibleChange, instance);
		},

		/*
		* Methods
		*/
		centerMessage: function() {
			var instance = this;

			instance.get(MESSAGE_EL).center(
				instance.overlayMask.get(BOUNDING_BOX)
			);
		},

		refreshMask: function() {
			var instance = this;

			instance.overlayMask.refreshMask();

			instance.centerMessage();
		},

		_afterVisibleChange: function(event) {
			var instance = this;
			var target = instance.get(TARGET);
			var isStaticPositioned = (target.getStyle(POSITION) == STATIC);

			target.toggleClass(CSS_MASKED, (event.newVal));
			target.toggleClass(CSS_MASKED_RELATIVE, (event.newVal && isStaticPositioned));

			if (event.newVal) {
				instance.refreshMask();
			}
		},

		_renderOverlayMask: function() {
			var instance = this;
			var target = instance.get(TARGET);

			instance.overlayMask = new A.OverlayMask(
				{
					target: target,
					cssClass: CSS_LOADINGMASK
				}
			).render(target);
		},

		_createDynamicAttrs: function(config) {
			var instance = this;

			A.each(config, function(value, key) {
				var ignoredAttr = instance.IGNORED_ATTRS[key];

				if (!ignoredAttr) {
					instance.addAttr(key, {
						setter: function(val) {
							this.overlayMask.set(key, val);

							return val;
						},
						value: value
					});
				}
			});
		}
	}
);

A.each([HIDE, SHOW, TOGGLE], function(method) {
	LoadingMask.prototype[method] = function() {
		this.overlayMask[method]();
	};
});

A.LoadingMask = LoadingMask;