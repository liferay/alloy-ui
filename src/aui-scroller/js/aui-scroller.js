var L = A.Lang,
	isString = L.isString,

	BOUNDING_BOX = 'boundingBox',
	CLIENT_WIDTH = 'clientWidth',
	CONTENT_BOX = 'contentBox',
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

	getCN = A.ClassNameManager.getClassName,

	CSS_HORIZONTAL = getCN(SCROLLER, HORIZONTAL),
	CSS_ITEM = getCN(SCROLLER, 'item'),
	CSS_VERTICAL = getCN(SCROLLER, VERTICAL);

var Scroller = A.Component.create (
	{
		NAME: SCROLLER,

		ATTRS: {
			itemSelector: {
				value: '>*'
			},

			orientation: {
				value: HORIZONTAL,
				validator: function (val) {
					return isString(val) && (val === HORIZONTAL || val === VERTICAL);
				}
			}
		},

		UI_ATTRS: [ORIENTATION],

		prototype: {
			nodeSelection: null,

			initializer: function() {
				var instance = this;

				instance._updateNodeSelection();
			},

			bindUI: function () {
				var instance = this;

				var boundingBox = instance.get(BOUNDING_BOX);
				var contentBox = instance.get(CONTENT_BOX);
				var orientation = instance.get(ORIENTATION);

				instance.publish(
					'scroll',
					{
						defaultFn: instance._defaultScrollFn
					}
				);

				contentBox.on('mousemove', A.rbind(instance._onMouseMove, instance, boundingBox, contentBox, orientation));
			},

			_defaultScrollFn: function (event) {
				var instance = this;

				var contentBox = instance.get(CONTENT_BOX);
				var orientation = instance.get(ORIENTATION);

				var transitionConfig = {
					duration: 0
				};

				if(orientation == HORIZONTAL) {
					transitionConfig.left = event.x + PX;
				}
				else {
					transitionConfig.top = event.y + PX;
				}

				contentBox.transition(transitionConfig);
			},

			_onMouseMove: function(event, boundingBox, contentBox, orientation) {
				var instance = this;

				var boundingBoxOffsetHeight = boundingBox.get(OFFSET_HEIGHT);
				var boundingBoxOffsetWidth = boundingBox.get(OFFSET_WIDTH);

				var absMouseX = event.pageX - boundingBox.get(OFFSET_LEFT);
				var absMouseY = event.pageY - boundingBox.get(OFFSET_TOP);

				var diffX = contentBox.get(CLIENT_WIDTH) - boundingBoxOffsetWidth;
				var diffY = contentBox.get(SCROLL_HEIGHT) - boundingBoxOffsetHeight;

				var mouseFactorX = diffX / boundingBoxOffsetWidth;
				var mouseFactorY = diffY / boundingBoxOffsetHeight;

				var x = -(absMouseX * mouseFactorX);
				var y = -(absMouseY * mouseFactorY);

				instance.fire(
					'scroll',
					{
						x: x,
						y: y
					}
				);
			},

			_uiSetOrientation: function (val) {
				var instance = this;

				var boundingBox = instance.get(BOUNDING_BOX);

				var horizontal = (val === HORIZONTAL);

				boundingBox.toggleClass(CSS_HORIZONTAL, horizontal);
				boundingBox.toggleClass(CSS_VERTICAL, !horizontal);
			},

			_updateNodeSelection: function () {
				var instance = this;

				var itemSelector = instance.get('itemSelector');

				instance.nodeSelection = instance.get('contentBox').all(itemSelector).addClass(CSS_ITEM);
			}
		}
	}
);

A.Scroller = Scroller;