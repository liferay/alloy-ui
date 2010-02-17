var L = A.Lang,
	isArray = L.isArray,
	isString = L.isString,
	isNumber = L.isNumber,

	UA = A.UA,

	isDoc = false,
	isWin = false,
	ie6 = (UA.ie && UA.version.major <= 6),

	ABSOLUTE = 'absolute',
	ALIGN_POINTS = 'alignPoints',
	BACKGROUND = 'background',
	BOUNDING_BOX = 'boundingBox',
	CONTENT_BOX = 'contentBox',
	FIXED = 'fixed',
	HEIGHT = 'height',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OPACITY = 'opacity',
	OVERLAY_MASK = 'overlaymask',
	POSITION = 'position',
	TARGET = 'target',
	WIDTH = 'width';

function OverlayMask(config) {
 	OverlayMask.superclass.constructor.apply(this, arguments);
}

A.mix(OverlayMask, {
	NAME: OVERLAY_MASK,

	ATTRS: {
		alignPoints: {
			value: [ 'tl', 'tl' ],
			validator: isArray
        },

		background: {
			lazyAdd: false,
			value: null,
			validator: isString,
			setter: function(v) {
				if (v) {
					this.get(CONTENT_BOX).setStyle(BACKGROUND, v);
				}

				return v;
			}
		},

		target: {
			lazyAdd: false,
			value: document,
			setter: function(v) {
				var target = A.get(v);

				isDoc = target.compareTo(document);
				isWin = target.compareTo(window);

				return target;
			}
		},

		opacity: {
			value: .5,
			validator: isNumber,
			setter: function(v) {
				return this._setOpacity(v);
			}
		},

		shim: {
			value: A.UA.ie
		},

		visible: {
			value: false
		},

		zIndex: {
			value: 1000
		}
	}
});

A.extend(OverlayMask, A.ComponentOverlay, {
	/*
	* Lifecycle
	*/
	bindUI: function() {
		var instance = this;

		OverlayMask.superclass.bindUI.apply(this, arguments);

		instance.after('targetChange', instance._afterTargetChange);
		instance.after('visibleChange', instance._afterVisibleChange);

		// window:resize YUI normalized event is not working, bug?
		A.on('windowresize', A.bind(instance.refreshMask, instance));
	},

	syncUI: function() {
		var instance = this;

		instance.refreshMask();
	},

	/*
	* Methods
	*/
	getTargetSize: function() {
		var instance = this;
		var target = instance.get(TARGET);

		var height = target.get(OFFSET_HEIGHT);
		var width = target.get(OFFSET_WIDTH);

		if (ie6) {
			// IE6 doesn't support height/width 100% on doc/win
			if (isWin) {
				width = A.DOM.winWidth();
				height = A.DOM.winHeight();
			}
			else if (isDoc) {
				width = A.DOM.docWidth();
				height = A.DOM.docHeight();
			}
		}
		// good browsers...
		else if (isDoc || isWin) {
			height = '100%';
			width = '100%';
		}

		return { height: height, width: width };
	},

	/*
	* Methods
	*/
	refreshMask: function() {
		var instance = this;
		var alignPoints = instance.get(ALIGN_POINTS);
		var target = instance.get(TARGET);
		var boundingBox = instance.get(BOUNDING_BOX);
		var targetSize = instance.getTargetSize();

		var fullPage = (isDoc || isWin);

		boundingBox.setStyles({
			position: (ie6 || !fullPage) ? ABSOLUTE : FIXED,
			left: 0,
			top: 0
		});

		instance.set(HEIGHT, targetSize.height);
		instance.set(WIDTH, targetSize.width);

		// if its not a full mask...
		if ( !fullPage ) {
			// if the target is not document|window align the overlay
			instance.align(target, alignPoints);
		}
	},

	/*
	* Setters
	*/
	_setOpacity: function(v) {
		var instance = this;

		instance.get(CONTENT_BOX).setStyle(OPACITY, v);

		return v;
	},

	_uiSetVisible: function(val) {
		var instance = this;

		OverlayMask.superclass._uiSetVisible.apply(this, arguments);

		if (val) {
			instance._setOpacity(
				instance.get(OPACITY)
			);
		}
	},

	/*
	* Listeners
	*/
	_afterTargetChange: function(event) {
		var instance = this;

		instance.refreshMask();
	},

	_afterVisibleChange: function(event) {
		var instance = this;

		instance._uiSetVisible(event.newVal);
	}
});

A.OverlayMask = OverlayMask;