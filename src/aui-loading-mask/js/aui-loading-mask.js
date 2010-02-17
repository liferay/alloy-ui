var Lang = A.Lang,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'loadingmask',

	CSS_LOADINGMASK = getClassName(NAME),
	CSS_MASKED = getClassName(NAME, 'masked'),
	CSS_MASKED_RELATIVE = getClassName(NAME, 'masked', 'relative'),
	CSS_MESSAGE_LOADING = getClassName(NAME, 'message'),
	CSS_MESSAGE_LOADING_CONTENT = getClassName(NAME, 'message', 'content'),

	TPL_MESSAGE_LOADING = '<div class="' + CSS_MESSAGE_LOADING + '"><div class="' + CSS_MESSAGE_LOADING_CONTENT + '">{0}</div></div>';

var LoadingMask = function(config) {
	var instance = this;

	var host = config.host;
	var node = host;

	var zIndex;

	if (A.Widget && host instanceof A.Widget) {
		node = host.get('contentBox');
	}

	config.target = node;
	config.cssClass = config.cssClass || CSS_LOADINGMASK;

	instance._mask = new A.OverlayMask(config).render(node);

	LoadingMask.superclass.constructor.apply(this, arguments);
};

LoadingMask.NAME = NAME;
LoadingMask.NS = NAME;

LoadingMask.ATTRS = {
	strings: {
		value: {
			loading: 'Loading&hellip;'
		}
	}
};

var ATTRS = LoadingMask.ATTRS;

A.each(
	A.OverlayMask.ATTRS,
	function(item, index, collection) {
		var attr = ATTRS[index];

		if (!attr) {
			attr = ATTRS[index] = A.mix(
				{
					getter: '_getHostAttribute',
					setter: '_setHostAttribute'
				}, item);
		}
	}
);

A.extend(
	LoadingMask,
	A.Plugin.Base,
	{
		initializer: function() {
			var instance = this;

			var messageHTML = A.substitute(TPL_MESSAGE_LOADING, [instance.get('strings.loading')]);

			instance._message = A.Node.create(messageHTML);

			instance._mask.get('boundingBox').appendChild(instance._message);

			instance._mask.after('visibleChange', instance._afterVisibleChange, instance);
		},

		_afterVisibleChange: function(event) {
			var instance = this;

			var target = instance.get('target');

			target.toggleClass(CSS_MASKED, (event.newVal));
			target.toggleClass(CSS_MASKED_RELATIVE, (event.newVal && (target.getStyle('position') == 'static')));

			if (event.newVal) {
				instance.refreshMask();
			}
		},

		_getHostAttribute: function(value, key) {
			var instance = this;

			return instance._mask.get(key);
		},

		_setHostAttribute: function(value, key) {
			var instance = this;

			return instance._mask.set(key, value);
		},

		centerMessage: function() {
			var instance = this;

			instance._message.center(instance._mask.get('contentBox'));
		},

		hide: function() {
			var instance = this;

			instance._mask.hide();
		},

		show: function() {
			var instance = this;

			instance._mask.show();
		},

		toggle: function() {
			var instance = this;

			instance._mask.toggle();
		},

		refreshMask: function() {
			var instance = this;

			instance._mask.refreshMask();

			instance.centerMessage();
		}
	}
);

A.LoadingMask = LoadingMask;