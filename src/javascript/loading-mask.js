AUI().add(
	'loading-mask',
	function(A) {
		var Lang = A.Lang,

			getClassName = A.ClassNameManager.getClassName,

			NAME = 'loadingmask',

			CSS_LOADINGMASK = getClassName(NAME),
			CSS_MESSAGE_LOADING = getClassName(NAME, 'message'),
			CSS_MESSAGE_LOADING_CONTENT = getClassName(NAME, 'message', 'content'),

			TPL_MESSAGE_LOADING = '<div class="' + CSS_MESSAGE_LOADING + '"><div class="' + CSS_MESSAGE_LOADING_CONTENT + '">{0}</div></div>';

		var LoadingMask = function(config) {
			var instance = this;

			var host = config.host;
			var node = host;

			if (A.Widget && host instanceof A.Widget) {
				node = host.get('contentBox');
			}

			config.target = node;

			instance._mask = new A.OverlayMask(config).render();

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

					if (event.newVal) {
						instance.refreshMask();

						instance._centerMessage();
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

				_centerMessage: function() {
					var instance = this;

					var maskRegion = instance._mask.get('contentBox').get('region');

					var messageNode = instance._message;
					var messageRegion = messageNode.get('region');

					var maskXCenter = maskRegion.left + (maskRegion.width / 2);
					var maskYCenter = maskRegion.top + (maskRegion.height / 2);

					var messageXCenter = messageRegion.left + (messageRegion.width / 2);
					var messageYCenter = messageRegion.top + (messageRegion.height / 2);

					messageNode.setXY([maskXCenter - (messageRegion.width / 2), maskYCenter - (messageRegion.height / 2)]);
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
				}
			}
		);

		A.LoadingMask = LoadingMask;
	},
	'@VERSION',
	{
		requires: ['overlay-mask', 'plugin', 'substitute', 'loading-mask-css']
	}
);