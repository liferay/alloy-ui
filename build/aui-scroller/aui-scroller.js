AUI.add('aui-scroller', function(A) {
var L = A.Lang,
	isNumber = L.isNumber,
	isString = L.isString,

	BOUNDING_BOX = 'boundingBox',
	CLIENT_WIDTH = 'clientWidth',
	CONTENT_BOX = 'contentBox',
	DURATION = 'duration',
	HORIZONTAL = 'horizontal',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_LEFT = 'offsetLeft',
	OFFSET_TOP = 'offsetTop',
	OFFSET_WIDTH = 'offsetWidth',
	ORIENTATION = 'orientation',
	PX = 'px',
	SCROLL_HEIGHT = 'scrollHeight',
	SCROLLER = 'scroller',
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
				validator: function (val) {
					return isNumber(val);
				},
				value: 0.5
			},

			itemSelector: {
				value: '>*'
			},

			orientation: {
				validator: function (val) {
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

				instance._boundingBox = instance.get(BOUNDING_BOX);
				instance._contentBox = instance.get(CONTENT_BOX);
				instance._duration = instance.get(DURATION);
				instance._orientation = instance.get(ORIENTATION);

				instance._boundingBoxXY = instance._boundingBox.getXY();

				instance._updateNodeSelection();
			},

			bindUI: function () {
				var instance = this;

				instance.publish(
					'scroll',
					{
						defaultFn: instance._defaultScrollFn
					}
				);

				instance.after(
					{
						durationChange: instance._afterDurationChange,
						orientationChange: instance._afterOrientationChange
					}
				);

				instance._contentBox.on('mouseenter', A.rbind(instance._updateXY, instance, instance._boundingBox));

				instance._contentBox.on('mousemove', A.rbind(instance._onMouseMove, instance, instance._boundingBox, instance._contentBox, instance._orientation));
			},

			_afterDurationChange: function (event) {
				var instance = this;

				instance._duration = event.newVal;
			},

			_afterOrientationChange: function (event) {
				var instance = this;

				instance._orientation = event.newVal;
			},

			_defaultScrollFn: function (event) {
				var instance = this;

				var contentBox = instance._contentBox;
				var orientation = instance._orientation;

				var transitionConfig = {
					duration: instance._duration
				};

				if(orientation == HORIZONTAL) {
					transitionConfig.left = -event.offsetX + PX;
				}
				else {
					transitionConfig.top = -event.offsetY + PX;
				}

				contentBox.transition(transitionConfig);
			},

			_onMouseMove: function(event, boundingBox, contentBox, orientation) {
				var instance = this;

				var boundingBoxOffsetHeight = boundingBox.get(OFFSET_HEIGHT);
				var boundingBoxOffsetWidth = boundingBox.get(OFFSET_WIDTH);

				var absMouseX = event.pageX - instance._boundingBoxXY[0];
				var absMouseY = event.pageY - instance._boundingBoxXY[1];

				var diffX = contentBox.get(CLIENT_WIDTH) - boundingBoxOffsetWidth;
				var diffY = contentBox.get(SCROLL_HEIGHT) - boundingBoxOffsetHeight;

				var factorX = diffX / boundingBoxOffsetWidth;
				var factorY = diffY / boundingBoxOffsetHeight;

				var offsetX = absMouseX * factorX;
				var offsetY = absMouseY * factorY;

				instance.fire(
					'scroll',
					{
						factorX: factorX,
						factorY: factorY,
						offsetX: offsetX,
						offsetY: offsetY,
						x: absMouseX,
						y: absMouseY
					}
				);
			},

			_updateXY: function (event, boundingBox) {
				var instance = this;

				instance._boundingBoxXY = boundingBox.getXY();
			},

			_uiSetOrientation: function (val) {
				var instance = this;

				var boundingBox = instance._boundingBox;

				var horizontal = (val === HORIZONTAL);

				boundingBox.toggleClass(CSS_HORIZONTAL, horizontal);
				boundingBox.toggleClass(CSS_VERTICAL, !horizontal);
			},

			_updateNodeSelection: function () {
				var instance = this;

				var itemSelector = instance.get('itemSelector');

				instance.nodeSelection = instance._contentBox.all(itemSelector).addClass(CSS_ITEM);
			}
		}
	}
);

A.Scroller = Scroller;

}, '@VERSION@' ,{skinnable:true, requires:['aui-base','transition']});
