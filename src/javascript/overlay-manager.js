AUI.add('overlay-manager', function(A) {

var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

	BOUNDING_BOX = 'boundingBox',
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
					validator: isNumber,
					setter: function(value) {
						return parseInt(value, 10);
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
				A.Array.each(overlay, function(o) {
					instance.register(o);
				});
			}
			else {
				var zIndexBase = instance.get(Z_INDEX_BASE);
				var registered = instance._registered(overlay);

				if (!registered && overlay && (overlay instanceof A.Overlay)) {
					var boundingBox = overlay.get(BOUNDING_BOX);

					overlays.push(overlay);

					var zIndex = overlay.get(Z_INDEX) || 0;
					var newZIndex = overlays.length + zIndex + zIndexBase;

					overlay.set(Z_INDEX, newZIndex);

					overlay.on('focusedChange', instance._onFocusedChange, instance);
					boundingBox.on('mousedown', instance._onMouseDown, instance);
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

		_registered: function(overlay) {
			var instance = this;

			return A.Array.indexOf(instance._overlays, overlay) != -1;
		},

		_onMouseDown: function(event) {
			var instance = this;
			var overlay = A.Widget.getByNode(event.currentTarget || event.target);
			var registered = instance._registered(overlay);

			if (overlay && registered) {
				instance.bringToTop(overlay);
			}
		},

		_onFocusedChange: function(event) {
			var instance = this;

			if (event.newVal) {
				var overlay = event.currentTarget || event.target;
				var registered = instance._registered(overlay);

				if (overlay && registered) {
					instance.bringToTop(overlay);
				}
			}
		}
	});

	A.OverlayManager = OverlayManager;

}, '@VERSION', { requires: [ 'overlay', 'plugin' ] });