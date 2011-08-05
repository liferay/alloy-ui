AUI.add('aui-scroller', function(A) {
var L = A.Lang,
	isNumber = L.isNumber,
	isString = L.isString,

	BOUNDING_BOX = 'boundingBox',
	CLIENT_WIDTH = 'clientWidth',
	CONTENT_BOX = 'contentBox',
	DURATION = 'duration',
	EDGE_PROXIMITY = 'edgeProximity',

	HEIGHT = 'Height',
	LEFT = 'Left',
	OFFSET = 'offset',
	SCROLL = 'scroll',
	TOP = 'Top',
	WIDTH = 'Width',

	HORIZONTAL = 'horizontal',
	OFFSET_HEIGHT = OFFSET + HEIGHT,
	OFFSET_LEFT = OFFSET + LEFT,
	OFFSET_TOP = OFFSET + TOP,
	OFFSET_WIDTH = OFFSET + WIDTH,
	ORIENTATION = 'orientation',
	PX = 'px',
	SCROLL_HEIGHT = SCROLL + HEIGHT,
	SCROLLER = 'scroller',
	SCROLLCONTENT = 'scrollcontent',
	UNDERLINE = '_',
	VERTICAL = 'vertical',

	getCN = A.getClassName,

	CSS_HORIZONTAL = getCN(SCROLLER, HORIZONTAL),
	CSS_ITEM = getCN(SCROLLER, 'item'),
	CSS_VERTICAL = getCN(SCROLLER, VERTICAL);

var Scroller = A.Component.create (
	{
		NAME: SCROLLER,

		ATTRS: {
			duration: {
				setter: function(value) {
					return value * 1000;
				},
				validator: isNumber,
				value: 0.1
			},

			edgeProximity: {
				value: 0.1
			},

			itemSelector: {
				value: '>*'
			},

			orientation: {
				validator: function(val) {
					return isString(val) && (val === HORIZONTAL || val === VERTICAL);
				},
				value: HORIZONTAL
			}
		},

		UI_ATTRS: [ORIENTATION],

		prototype: {
			nodeSelection: null,

			initializer: function() {
				var instance = this;

				var boundingBox = instance.get(BOUNDING_BOX);
				var contentBox = instance.get(CONTENT_BOX);

				instance._boundingBox = boundingBox;
				instance._contentBox = contentBox;

				instance._duration = instance.get(DURATION);
				instance._edgeProximity = instance.get(EDGE_PROXIMITY);
				instance._orientation = instance.get(ORIENTATION);

				instance.boundingBoxXY = instance._boundingBox.getXY();

				instance._boundingBoxEl = boundingBox.getDOM();
				instance._contentBoxEl = contentBox.getDOM();

				instance._setCoords(instance._orientation == HORIZONTAL);

				instance._updateNodeSelection();
			},

			bindUI: function() {
				var instance = this;

				instance.publish(
					SCROLLCONTENT,
					{
						defaultFn: instance._defaultScrollFn
					}
				);

				var contentBox = instance._contentBox;

				instance.after(['durationChange', 'edgeProximityChange'], instance._setPrivateAttr);

				contentBox.on('mouseenter', A.rbind(instance._updateDimensions, instance));

				contentBox.on('mousemove', A.rbind(instance._onMouseMove, instance, instance._boundingBox, instance._contentBox, instance._orientation));

				instance._boundingBox.on('focus', instance._onItemFocus, instance);

				instance._createAnimation();
			},

			_adjustToEdge: function(value) {
				var instance = this;

				var edgeProximity = instance._edgeProximity;

				var adjusted = value;

				if (edgeProximity) {
					value = Math.max(value, edgeProximity);
					value = Math.min(value, 1 - edgeProximity);

					value = value - edgeProximity;

					adjusted = value / (1 - (edgeProximity * 2));
				}

				return adjusted;
			},

			_animate: function(event) {
				var instance = this;

				var fx = instance._fx;

				var boundingBoxEl = instance._boundingBoxEl;
				var orientation = instance._orientation;

				var scroll = SCROLL + instance._coordTL;
				var coordXY = instance._coordXY.toLowerCase();

				var from = boundingBoxEl[scroll] || 0;
				var to = event[coordXY];

				fx.from = from;
				fx.to = to;

				fx.start();
			},

			_constrain: function(value, min, max) {
				var instance = this;

				return Math.max(Math.min(value, max), min);
			},

			_createAnimation: function() {
				var instance = this;

				var boundingBoxEl = instance._boundingBoxEl;

				var from = boundingBoxEl[SCROLL + instance._coordTL] || 0;
				var to = from;

				instance._fx = new A.SimpleAnim(
					{
						duration: instance._duration,
						from: from,
						intervalRate: 1,
						to: to,
						onTween: function(value) {
							boundingBoxEl[SCROLL + instance._coordTL] = value;
						}
					}
				);

				instance._throttleAnimate = instance._animate;
			},

			_defaultScrollFn: function(event) {
				var instance = this;

				instance._throttleAnimate(event);
			},

			_getPositionData: function(absoluteX, absoluteY) {
				var instance = this;

				var boundingBoxXY = instance.boundingBoxXY;

				var relativeMouseX = absoluteX - boundingBoxXY[0];
				var relativeMouseY = absoluteY - boundingBoxXY[1];

				var scaledX = relativeMouseX * instance.ratioX;
				var scaledY = relativeMouseY * instance.ratioY;

				var relativeX = instance._constrain(relativeMouseX / instance.boundingBoxWidth, 0, 1);
				var relativeY = instance._constrain(relativeMouseY / instance.boundingBoxHeight, 0, 1);

				relativeX = instance._adjustToEdge(relativeX);
				relativeY = instance._adjustToEdge(relativeY);

				var adjustedX = (instance.deltaX * relativeX);
				var adjustedY = (instance.deltaY * relativeY);

				return {
					x: adjustedX,
					y: adjustedY,
					scaledX: scaledX,
					scaledY: scaledY,
					relativeX: relativeMouseX,
					relativeY: relativeMouseY
				};
			},

			_onItemFocus: function(event) {
				var instance = this;

				instance._updateDimensions();

				var xy = event.target.getXY();

				var data = instance._getPositionData.apply(instance, xy);

				instance.fire(SCROLLCONTENT, data);

				instance._updatePrevXY(data.relativeX, data.relativeY);
			},

			_onMouseMove: function(event, boundingBox, contentBox, orientation) {
				var instance = this;

				var data = instance._getPositionData(event.pageX, event.pageY);

				instance.fire(SCROLLCONTENT, data);

				instance._updatePrevXY(data.relativeX, data.relativeY);
			},

			_setCoords: function(horizontal) {
				var instance = this;

				var coordTL = TOP;
				var coordXY = 'Y';

				if (horizontal) {
					coordTL = LEFT;
					coordXY = 'X';
				}

				instance._coordTL = coordTL;
				instance._coordXY = coordXY;
			},

			_setPrivateAttr: function(event) {
				var instance = this;

				instance[UNDERLINE + event.attrName] = event.newVal;
			},

			_updateDimensions: function(event) {
				var instance = this;

				var boundingBox = instance._boundingBox;
				var contentBox = instance._contentBox;

				var boundingBoxOffsetHeight = boundingBox.get(OFFSET_HEIGHT);
				var boundingBoxOffsetWidth = boundingBox.get(OFFSET_WIDTH);

				var contentBoxClientWidth = contentBox.get(CLIENT_WIDTH);
				var contentBoxScrollHeight = contentBox.get(SCROLL_HEIGHT);

				var deltaX = contentBoxClientWidth - boundingBoxOffsetWidth;
				var deltaY = contentBoxScrollHeight - boundingBoxOffsetHeight;

				instance.boundingBoxXY = boundingBox.getXY();

				instance.ratioX = deltaX / boundingBoxOffsetWidth;
				instance.ratioY = deltaY / boundingBoxOffsetHeight;

				instance.deltaX = deltaX;
				instance.deltaY = deltaY;

				instance.boundingBoxHeight = boundingBoxOffsetHeight;
				instance.boundingBoxWidth = boundingBoxOffsetWidth;

				instance.contentBoxHeight = contentBoxScrollHeight;
				instance.contentBoxWidth = contentBoxClientWidth;
			},

			_updatePrevXY: function(x, y) {
				var instance = this;

				instance._prevX = x;
				instance._prevY = y;
			},

			_uiSetOrientation: function(val) {
				var instance = this;

				var boundingBox = instance._boundingBox;

				var horizontal = (val === HORIZONTAL);

				boundingBox.toggleClass(CSS_HORIZONTAL, horizontal);
				boundingBox.toggleClass(CSS_VERTICAL, !horizontal);

				instance._setCoords(horizontal);

				instance._orientation = val;
			},

			_updateNodeSelection: function() {
				var instance = this;

				var itemSelector = instance.get('itemSelector');

				instance.nodeSelection = instance._contentBox.all(itemSelector).addClass(CSS_ITEM);
			},

			_prevX: 0,
			_prevY: 0
		}
	}
);

A.Scroller = Scroller;

}, '@VERSION@' ,{requires:['aui-base','aui-simple-anim'], skinnable:true});
