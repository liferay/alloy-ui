AUI.add('overlay-manager', function(A) {

var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

	DEFAULT = 'default',
	HOST = 'host',
	OVERLAY_MANAGER = 'OverlayManager',
	GROUP = 'group',
	Z_INDEX = 'zIndex',
	Z_INDEX_BASE = 'zIndexBase';

	function OverlayManager(config) {
	 	OverlayManager.superclass.constructor.apply(this, arguments);
	}

	A.mix(
		OverlayManager,
		{
			NAME: OVERLAY_MANAGER.toLowerCase(),

			ATTRS: {
				zIndexBase: {
					value: 1000,
					setter: function(value) {
						if (isString(value)) {
							value = parseInt(value, 10);
						}

						if (!isNumber(value)) {
							value = A.Attribute.INVALID_VALUE;
						}

						return value;
					}
				}
			}
		}
	);

	A.extend(OverlayManager, A.Base, {
		initializer: function() {
			var instance = this;

			instance._overlays = [];
		},

		bringToTop: function(overlay) {
			var instance = this;

			var overlays = instance._overlays.sort(instance.sortByZIndexDesc);

			var highest = overlays[0];

			if (highest !== overlay) {
				var overlayZ = overlay.get(Z_INDEX);
				var highestZ = highest.get(Z_INDEX);

				overlay.set(Z_INDEX, highestZ + 1);

				overlay.focus();
			}
		},

		destroy: function() {
			var instance = this;

			instance.remove();
		},

		register: function (overlay) {
			var instance = this;

			var overlays = instance._overlays;

			if (isArray(overlay)) {
				for (var i = overlay.length - 1; i >= 0; i--) {
					instance.register(overlay[i]);
				}
			}
			else {
				var zIndexBase = instance.get(Z_INDEX_BASE);

				var canRegister = (A.Array.indexOf(overlays, overlay) == -1);

				if (canRegister && overlay && (overlay instanceof A.Overlay)) {
					overlays.push(overlay);

					var zIndex = overlay.get(Z_INDEX) || 0;
					var newZIndex = overlays.length + zIndex + zIndexBase;

					overlay.plug(
						OverlayManagerPlugin,
						{
							group: instance
						}
					);

					overlay.set(Z_INDEX, newZIndex);

					overlay.on('focusedChange', instance._onFocusChange, instance);
				}
			}

			return overlays;
		},

		remove: function (overlay) {
			var instance = this;

			var overlays = instance._overlays;

			return A.Array.removeItem(overlays, overlay);
		},

		each: function(fn) {
			var instance = this;

			var overlays = instance._overlays;

			A.Array.each(overlays, fn);
		},

		showAll: function() {
			this.each(
				function(overlay) {
					overlay.show();
				}
			);
		},

		hideAll: function() {
			this.each(
				function(overlay) {
					overlay.hide();
				}
			);
		},

		sortByZIndexDesc: function(a, b) {
			if (!a || !b || !a.hasImpl(A.WidgetStack) || !b.hasImpl(A.WidgetStack)) {
				return 0;
			}
			else {
				var aZ = a.get(Z_INDEX);
				var bZ = b.get(Z_INDEX);

				if (aZ > bZ) {
					return -1;
				} else if (aZ < bZ) {
					return 1;
				} else {
					return 0;
				}
			}
		},

		_onFocusChange: function(event) {
			var instance = this;

			var overlay = event.currentTarget;

			if (event.newVal) {
				instance.bringToTop(overlay);
			}
		}
	});

	A.OverlayManager = OverlayManager;

	function OverlayManagerPlugin(config) {
	 	OverlayManagerPlugin.superclass.constructor.apply(this, arguments);
	}

	A.mix(OverlayManagerPlugin, {
		NAME: OVERLAY_MANAGER.toLowerCase(),

		NS: OVERLAY_MANAGER,

		managers: {},

		ATTRS: {
			group: {
				value: DEFAULT
			},

			zIndexBase: {
				value: null
			}
		}
	});

	A.extend(
		OverlayManagerPlugin,
		A.Plugin.Base,
		{
			initializer: function() {
				var instance = this;

				var group = instance.get(GROUP);
				var zIndexBase = instance.get(Z_INDEX_BASE);

				if (group instanceof OverlayManager) {
					OverlayManagerPlugin.managers[group.toString()] = group;
				}
				else {
					if (!(group in OverlayManagerPlugin.managers)) {
						OverlayManagerPlugin.managers[group] = new OverlayManager(
							{
								group: group,
								zIndexBase: zIndexBase
							}
						);
					}

					instance.register();
				}
			},

			bringToTop: function() {
				var instance = this;

				var overlay = instance.get(HOST);
				var manager = instance.getManager();

				manager.bringToTop(overlay);
			},

			getManager: function(group) {
				var instance = this;

				return OverlayManagerPlugin.managers[group || instance.get(GROUP)];
			},

			destroy: function() {
				var instance = this;

				instance.remove();
			},

			register: function () {
				var instance = this;

				var overlay = instance.get(HOST);

				var manager = instance.getManager();

				manager.register(overlay);

				return manager;
			},

			remove: function () {
				var instance = this;

				var overlay = instance.get(HOST);
				var manager = instance.getManager();

				return manager.remove(overlay);
			},

			each: function(fn) {
				var instance = this;

				var manager = instance.getManager();

				manager.each(fn);
			},

			showAll: function() {
				var instance = this;

				var manager = instance.getManager();

				manager.showAll();
			},

			setManager: function(manager, group) {
				var instance = this;

				OverlayManagerPlugin.managers[group || instance.get(GROUP)] = manager;

				return manager;
			},

			hideAll: function() {
				var instance = this;

				var group = instance.get(GROUP);
				var manager = instance.getManager();

				manager.hideAll();
			}
		}
	);

	A.namespace('Plugin');
	A.Plugin.OverlayManager = OverlayManagerPlugin;

}, '@VERSION', { requires: [ 'overlay', 'plugin' ] });