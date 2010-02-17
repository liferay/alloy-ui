AUI.add('aui-context-panel', function(A) {
var L = A.Lang,
	isBoolean = L.isBoolean,
	isString = L.isString,
	isObject = L.isObject,

	ALIGN = 'align',
	ANIM = 'anim',
	ARROW = 'arrow',
	BACKGROUND_COLOR = 'backgroundColor',
	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CLICK = 'click',
	CONTENT_BOX = 'contentBox',
	CONTEXTPANEL = 'contextpanel',
	DEFAULT = 'default',
	DOT = '.',
	END = 'end',
	HIDDEN = 'hidden',
	INNER = 'inner',
	OPACITY = 'opacity',
	POINTER = 'pointer',
	SHOW_ARROW = 'showArrow',
	STATE = 'state',
	STYLE = 'style',
	VISIBLE = 'visible',

	BC = 'bc',
	BL = 'bl',
	BR = 'br',
	CC = 'cc',
	LB = 'lb',
	LC = 'lc',
	LT = 'lt',
	RB = 'rb',
	RC = 'rc',
	RL = 'rl',

	getCN = A.ClassNameManager.getClassName,

	CSS_CONTEXTPANEL = getCN(CONTEXTPANEL),
	CSS_CONTEXTPANEL_ARROW = getCN(CONTEXTPANEL, ARROW, BLANK),
	CSS_CONTEXTPANEL_HIDDEN = getCN(CONTEXTPANEL, HIDDEN),
	CSS_CONTEXTPANEL_POINTER = getCN(CONTEXTPANEL, POINTER),
	CSS_CONTEXTPANEL_POINTER_INNER = getCN(CONTEXTPANEL, POINTER, INNER),
	CSS_STATE_DEFAULT = getCN(STATE, DEFAULT),

	TPL_POINTER = '<div class="' + [ CSS_STATE_DEFAULT, CSS_CONTEXTPANEL_POINTER ].join(' ') + '"></div>',
	TPL_POINTER_INNER = '<div class="' + CSS_CONTEXTPANEL_POINTER_INNER + '"></div>';

function ContextPanel(config) {
 	ContextPanel.superclass.constructor.apply(this, arguments);
}

A.mix(ContextPanel, {
	NAME: CONTEXTPANEL,

	ATTRS: {
		anim: {
			lazyAdd: false,
			value: {
				show: false
			},
			setter: function(v) {
				return this._setAnim(v);
			}
		},

		arrow: {
			value: null,
			validator: isString
		},

		hideOn: {
			value: CLICK
		},

		showOn: {
			value: CLICK
		},

		showArrow: {
			lazyAdd: false,
			value: true,
			validator: isBoolean
		},

		stack: {
			lazyAdd: false,
			value: true,
			setter: function(v) {
				return this._setStack(v);
			},
			validator: isBoolean
		}
	}
});

A.extend(ContextPanel, A.ContextOverlay, {
	/*
	* Lifecycle
	*/
	bindUI: function() {
		var instance = this;

		instance.after('showArrowChange', instance._afterShowArrowChange);

		instance.before('show', instance._beforeShow);

		ContextPanel.superclass.bindUI.apply(instance, arguments);
	},

	renderUI: function() {
		var instance = this;

		instance._renderElements();
	},

	syncUI: function() {
		var instance = this;

		instance._syncElements();
	},

	/*
	* Methods
	*/
	align: function (node, points) {
		var instance = this;

		ContextPanel.superclass.align.apply(this, arguments);

		instance._syncElements();
	},

	fixPointerColor: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var pointer = contentBox.query(DOT+CSS_CONTEXTPANEL_POINTER_INNER);

		pointer.removeAttribute(STYLE);

		var bColor = contentBox.getStyle(BACKGROUND_COLOR);
		var border = 'borderBottomColor';

		var right = [
			DOT+CSS_CONTEXTPANEL_ARROW+RB,
				DOT+CSS_CONTEXTPANEL_ARROW+RC,
					DOT+CSS_CONTEXTPANEL_ARROW+RL
		]
		.join(',');

		var bottom = [
			DOT+CSS_CONTEXTPANEL_ARROW+BR,
				DOT+CSS_CONTEXTPANEL_ARROW+BC,
					DOT+CSS_CONTEXTPANEL_ARROW+BL
		]
		.join(',');

		var left = [
			DOT+CSS_CONTEXTPANEL_ARROW+LB,
				DOT+CSS_CONTEXTPANEL_ARROW+LC,
					DOT+CSS_CONTEXTPANEL_ARROW+LT
		]
		.join(',');

		if (contentBox.test(right)) {
			border = 'borderLeftColor';
		}
		else if (contentBox.test(bottom)) {
			border = 'borderTopColor';
		}
		else if (contentBox.test(left)) {
			border = 'borderRightColor';
		}

		pointer.setStyle(border, bColor);
	},

	getAlignPoint: function() {
		var instance = this;
		var overlayPoint = instance.get(ALIGN).points[0];

		if (overlayPoint == CC) {
			// CC is not a valid position for the arrow
			overlayPoint = BC;
		}

		return instance.get(ARROW) || overlayPoint;
	},

	hide: function(event) {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		if(instance._hideAnim) {
			var visible = instance.get(VISIBLE);

			if (visible) {
				instance._hideAnim.run();

				instance._hideAnim.on(END, function() {
					ContextPanel.superclass.hide.apply(instance, arguments);
				});
			}
		}
		else {
			ContextPanel.superclass.hide.apply(instance, arguments);
		}
	},

	_renderElements: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var align = instance.get(ALIGN);
		var overlayPoint = align.points[0];

		contentBox.addClass(CSS_STATE_DEFAULT);

		instance._pointerNode = A.Node.create(TPL_POINTER).append(TPL_POINTER_INNER);

		contentBox.append(
			instance._pointerNode
		);
	},

	_syncElements: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var pointerNode = instance._pointerNode;
		var overlayPoint = instance.getAlignPoint();

		if (instance.get(SHOW_ARROW)) {
			pointerNode.removeClass(CSS_CONTEXTPANEL_HIDDEN);
			contentBox.removeClass(CSS_CONTEXTPANEL_ARROW + instance._lastOverlayPoint);
			contentBox.addClass(CSS_CONTEXTPANEL_ARROW + overlayPoint);

			instance.fixPointerColor();
		}
		else {
			pointerNode.addClass(CSS_CONTEXTPANEL_HIDDEN);
		}

		instance._lastOverlayPoint = overlayPoint;
	},

	/*
	* Setters
	*/
	_setStack: function(value) {
		var instance = this;

		if (value) {
			A.ContextPanelManager.register(instance);
		}
		else {
			A.ContextPanelManager.remove(instance);
		}

		return value;
	},

	_setAnim: function(value) {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);

		if (value) {
			var defaults = {
				node: boundingBox,
				duration: 0.1
			};

			var showOptions = A.merge(defaults, {
	    		from: { opacity: 0 },
	    		to: { opacity: 1 }
			});

			var hideOptions = A.merge(defaults, {
				from: { opacity: 1 },
	    		to: { opacity: 0 }
			});

			if (isObject(value)) {
				// loading user settings for animation
				showOptions = A.merge(showOptions, value.show);
				hideOptions = A.merge(hideOptions, value.hide);
			}

			instance._showAnim = new A.Anim(showOptions);
			instance._hideAnim = new A.Anim(hideOptions);

			// if anim.show or anim.hide === false, cancel respective animation
			if (isObject(value)) {
				if (value.show === false) {
					instance._showAnim = null;
				}

				if (value.hide === false) {
					instance._hideAnim = null;
				}
			}
		}

		return value;
	},

	/*
	* Listeners
	*/
	_beforeShow: function(event) {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);
		var visible = instance.get(VISIBLE);

		if(!visible && instance._showAnim) {
			boundingBox.setStyle(OPACITY, 0);

			instance._showAnim.run();
		}
		else {
			boundingBox.setStyle(OPACITY, 1);
		}
	},

	_afterShowArrowChange: function() {
		var instance = this;

		instance._syncElements();
	}
});

A.ContextPanel = ContextPanel;

A.ContextPanelManager = new A.OverlayManager({
	zIndexBase: 1000
});

}, '@VERSION@' ,{requires:['aui-context-overlay','anim'], skinnable:true});
