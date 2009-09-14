AUI.add('overlay-mask', function(A) {

var L = A.Lang,
	isString = L.isString,
	isNumber = L.isNumber,

	ALIGN = 'align',
	BACKGROUND = 'background',
	BOUNDING_BOX = 'boundingBox'
	HEIGHT = 'height',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OPACITY = 'opacity',
	OVERLAY_MASK = 'OverlayMask',
	TARGET = 'target',
	TL = 'tl',
	WIDTH = 'width';

function OverlayMask(config) {
 	OverlayMask.superclass.constructor.apply(this, arguments);
}

A.mix(OverlayMask, {
	NAME: OVERLAY_MASK,

	ATTRS: {
		align: {
            value: { node: null, points: [ TL, TL ] }
        },

		background: {
			lazyAdd: false,
			value: '#000',
			validator: isString,
			setter: function(v) {
				this.get(BOUNDING_BOX).setStyle(BACKGROUND, v);

				return v;
			}
		},

		target: {
			lazyAdd: false,
			value: document,
			setter: function(v) {
				return A.get(v);
			}
		},

		opacity: {
			lazyAdd: false,
			value: .5,
			validator: isNumber,
			setter: function(v) {
				this.get(BOUNDING_BOX).setStyle(OPACITY, v);

				return v;
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

A.extend(OverlayMask, A.Overlay, {
	/*
	* Lifecycle
	*/
	bindUI: function() {
		var instance = this;

		OverlayMask.superclass.bindUI.apply(this, arguments);

		instance.after('targetChange', instance._afterTargetChange);

		// window:resize YUI normalized event is not working, bug?
		A.on('resize', A.bind(instance.refreshMask, instance));
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
		var height = 0, width = 0;

		var isDoc = target.compareTo(document);
		var isWin = target.compareTo(window);

		if (isDoc) {
		    width = A.DOM.docWidth();
		    height = A.DOM.docHeight();
		}
		else if (isWin) {
		    width = A.DOM.winWidth();
		    height = A.DOM.winHeight();
		}
		else {
			height = target.get(OFFSET_HEIGHT);
			width = target.get(OFFSET_WIDTH);
		}

		return { height: height, width: width };
	},

	/*
	* Methods
	*/
	refreshMask: function() {
		var instance = this;
		var align = instance.get(ALIGN);
		var target = instance.get(TARGET);
		var size = instance.getTargetSize();

		instance.set(HEIGHT, size.height);
		instance.set(WIDTH, size.width);

		instance.align(target, align.points);
	},

	/*
	* Listeners
	*/
	_afterTargetChange: function(event) {
		var instance = this;

		instance.refreshMask();
	}
});

A.OverlayMask = OverlayMask;

}, '@VERSION', { requires: [ 'overlay', 'event-resize' ] });