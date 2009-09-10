AUI.add('context-panel', function(A) {

var L = A.Lang,
	isBoolean = L.isBoolean,
	isString = L.isString,

	ALIGN = 'align',
	ARROW = 'arrow',
	BLANK = '',
	BOUNDING_BOX = 'boundingBox',
	CLICK = 'click',
	CONTEXTPANEL = 'contextpanel',
	DEFAULT = 'default',
	DOT = '.',
	HIDDEN = 'hidden',
	INNER = 'inner',
	POINTER = 'pointer',
	SHOW_ARROW = 'showArrow',
	STATE = 'state',
	STYLE = 'style',
	BACKGROUND_COLOR = 'backgroundColor',

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

	TPL_POINTER = '<div class="' + [ CSS_STATE_DEFAULT, CSS_CONTEXTPANEL_POINTER ].join(' ') + '"></div>'
	TPL_POINTER_INNER = '<div class="' + CSS_CONTEXTPANEL_POINTER_INNER + '"></div>';

function ContextPanel(config) {
 	ContextPanel.superclass.constructor.apply(this, arguments);
}

A.mix(ContextPanel, {
	NAME: CONTEXTPANEL,

	ATTRS: {
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
		var boudingBox = instance.get(BOUNDING_BOX);
		var pointer = boudingBox.query(DOT+CSS_CONTEXTPANEL_POINTER_INNER);

		pointer.removeAttribute(STYLE);

		var bColor = boudingBox.getStyle(BACKGROUND_COLOR);
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

		if (boudingBox.test(right)) {
			border = 'borderLeftColor';
		}
		else if (boudingBox.test(bottom)) {
			border = 'borderTopColor';
		}
		else if (boudingBox.test(left)) {
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

	_renderElements: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);
		var align = instance.get(ALIGN);
		var overlayPoint = align.points[0];

		boundingBox.addClass(CSS_STATE_DEFAULT);

		instance._pointerNode = A.Node.create(TPL_POINTER).append(TPL_POINTER_INNER);

		boundingBox.append(
			instance._pointerNode
		);
	},

	_syncElements: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);
		var pointerNode = instance._pointerNode;
		var overlayPoint = instance.getAlignPoint();

		if (instance.get(SHOW_ARROW)) {
			pointerNode.removeClass(CSS_CONTEXTPANEL_HIDDEN);
			boundingBox.removeClass(CSS_CONTEXTPANEL_ARROW + instance._lastOverlayPoint);
			boundingBox.addClass(CSS_CONTEXTPANEL_ARROW + overlayPoint);

			instance.fixPointerColor();
		}
		else {
			pointerNode.addClass(CSS_CONTEXTPANEL_HIDDEN);
		}

		instance._lastOverlayPoint = overlayPoint;
	},

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

	/*
	* Attribute Listeners
	*/
	_afterShowArrowChange: function() {
		var instance = this;

		instance._syncElements();
	}
});

A.ContextPanel = ContextPanel;

A.ContextPanelManager = new A.OverlayManager({
	zIndexBase: 1000
});

}, '@VERSION', { requires: [ 'context-overlay', 'overlay-manager', 'context-panel-css' ] });