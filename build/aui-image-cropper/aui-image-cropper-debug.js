AUI.add('aui-image-cropper', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,

	toInt = Lang.toInt,

	NAME = 'image-cropper',

	CSS_CROP = A.getClassName(NAME, 'crop'),
	CSS_CROP_OUTLINE = A.getClassName(NAME, 'crop', 'outline'),
	CSS_OVERLAY = A.getClassName(NAME, 'overlay');
	CSS_OVERLAY_HOVER = A.getClassName(NAME, 'crop', 'hover');

var ImageCropper = A.Component.create(
	{
		NAME: NAME,

		ATTRS: {
			cropHeight: {
				value: 100,
				validator: isNumber
			},

			cropWidth: {
				value: 100,
				validator: isNumber
			},

			minWidth: {
				value: undefined
			},

			minHeight: {
				value: undefined
			},

			movable: {
				value: true,
				validator: isBoolean
			},

			preserveRatio: {
				value: false,
				validator: isBoolean
			},

			region: {
				getter: '_getCropRegion',
				value: {}
			},

			resizable: {
				value: true,
				validator: isBoolean
			},

			x: {
				value: 0,
				setter: Math.round,
				validator: isNumber
			},

			y: {
				value: 0,
				setter: Math.round,
				validator: isNumber
			}
		},

		UI_ATTRS: [
			'cropHeight',
			'cropWidth',
			'minWidth',
			'minHeight',
			'movable',
			'resizable',
			'x',
			'y'
		],

		prototype: {
			renderUI: function() {
				var instance = this;

				var boundingBox = instance.get('boundingBox');
				var imageNode = instance.get('srcNode');

				instance.cropNode = A.Node.create('<div class="' + CSS_CROP + '"></div>');
				instance.cropNode.append(A.Node.create('<div class="' + CSS_CROP_OUTLINE + '"></div>'));

				instance.overlay = A.Node.create('<div class="' + CSS_OVERLAY + '"></div>');

				A.all([instance.cropNode, instance.overlay]).appendTo(boundingBox);

				instance._boundingBox = boundingBox;

				instance._renderDrag();
				instance._renderResize();
			},

			bindUI: function() {
				var instance = this;

				instance._fireCropEventTask = A.debounce(instance._fireCropEvent, 10, instance);

				instance.publish(
					'crop',
					{
						defaultFn: instance._defCropFn
					}
				);

				instance.on(['drag:start', 'resize:start'], A.debounce(instance._syncRegion, 25));

				instance.after(['drag:drag', 'resize:resize'], instance._fireCropEvent, instance);

				instance.after(
					['xChange', 'yChange', 'cropWidthChange', 'cropHeightChange'],
					function(event) {
						instance._fireCropEventTask(event);

						instance._syncCropNodeUI();
					}
				);

				instance._createHover();
			},

			syncUI: function() {
				var instance = this;

				instance._uiSetPreserveRatio(instance.get('preserveRatio'));

				instance.syncImageUI();
				instance._syncCropNodeUI();
			},

			destructor: function() {
				var instance = this;

				instance._destroyDrag();
				instance._destroyResize();
			},

			syncImageUI: function() {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var overlayNode = instance.overlay;

				instance.cropNode.setStyle('backgroundImage', 'url(' + imageNode.attr('src') + ')');

				instance._constrainValues();
				instance._syncXY();

				var origRegion = instance._getConstraintRegion();

				var drag = instance.drag;
				var resize = instance.resize;

				if (drag) {
					drag.con.set('constrain', origRegion);
				}

				if (resize) {
					resize.con.set('constrain', origRegion);
				}
			},

			_constrainValues: function() {
				var instance = this;

				var imageNode = instance.get('srcNode');

				var cropHeight = instance.get('cropHeight');
				var cropWidth = instance.get('cropWidth');

				var x = instance.get('x');
				var y = instance.get('y');

				var imageWidth = imageNode.width();
				var imageHeight = imageNode.height();

				// Find valid y

				y = Math.max(y, 0);

				if (y + cropHeight > imageHeight) {
					y = Math.max(imageHeight - cropHeight, 0);
				}

				instance.set('y', y);

				// Find valid cropHeight

				if (y + cropHeight > imageHeight) {
					cropHeight = Math.max(imageHeight - y, 0);
				}

				instance.set('cropHeight', cropHeight);

				// Find valid x

				x = Math.max(x, 0);

				if (x + cropWidth > imageWidth) {
					x = Math.max(imageWidth - cropWidth, 0);
				}

				instance.set('x', x);

				// Find valid cropWidth

				if (x + cropWidth > imageWidth) {
					cropWidth = Math.max(imageWidth - x, 0);
				}

				instance.set('cropWidth', cropWidth);
			},

			_createHover: function() {
				var instance = this;

				instance._destroyHover();

				instance._hoverHandles = instance.cropNode.on(
					'hover',
					instance._hoverOverlay,
					instance._unHoverOverlay,
					instance
				);
			},

			_defCropFn: function(event) {
				var instance = this;

				var cropType = event.cropType;

				if (cropType == 'drag:drag') {
					instance._syncXY();
				}
				else if (cropType == 'resize:resize') {
					instance._syncCropSize();
				}
			},

			_destroyDrag: function(object) {
				var instance = this;

				if (instance.drag) {
					instance.drag.destroy();

					delete instance.drag;
				}
			},

			_destroyHover: function() {
				var instance = this;

				if (instance._hoverHandles) {
					instance._hoverHandles.detach();

					instance._hoverHandles = null;
				}
			},

			_destroyResize: function(object) {
				var instance = this;

				if (instance.resize) {
					instance.resize.destroy();

					delete instance.resize;
				}
			},

			_fireCropEvent: function(event) {
				var instance = this;

				instance.fire('crop', {cropType: event.type});
			},

			_getConstraintRegion: function(force) {
				var instance = this;

				var region = !force ? instance._origRegion : null;

				if (!region) {
					var imageNode = instance.get('srcNode');

					var cropNode = instance.cropNode;

					var imageXY = imageNode.getXY();

					var imageX = imageXY[0];
					var imageY = imageXY[1];

					region = {
						bottom: imageY + imageNode.height() + cropNode.getBorderWidth('b'),
						left: imageX - cropNode.getBorderWidth('l'),
						right: imageX + imageNode.width() + cropNode.getBorderWidth('r'),
						top: imageY - cropNode.getBorderWidth('t')
					};

					if (!instance._origRegion) {
						instance._origRegion = region;
					}
				}

				return region;
			},

			_getCropRegion: function() {
				var instance = this;

				return {
					height: instance.get('cropHeight'),
					width: instance.get('cropWidth'),
					x: instance.get('x'),
					y: instance.get('y')
				};
			},

			_hoverOverlay: function() {
				var instance = this;

				if (!instance._isDragging() && !instance._isResizing()) {
					instance._boundingBox.addClass(CSS_OVERLAY_HOVER);
				}
			},

			_isDragging: function() {
				var instance = this;

				var drag = instance.drag;

				return drag && drag.get('dragging');
			},

			_isResizing: function() {
				var instance = this;

				var resize = instance.resize;

				return resize && resize.get('resizing');
			},

			_renderDrag: function() {
				var instance = this;

				var drag = new A.DD.Drag(
					{
						node: instance.cropNode
					}
				).plug(
					A.Plugin.DDConstrained,
					{
						constrain: instance._getConstraintRegion()
					}
				);

				drag.addTarget(instance);

				instance.drag = drag;
			},

			_renderResize: function() {
				var instance = this;

				var resize = new A.Resize(
					{
						node: instance.cropNode
					}
				).plug(
					A.Plugin.ResizeConstrained,
					{
						constrain: instance._getConstraintRegion(),
						preserveRatio: instance.get('preserveRatio'),
						minHeight: instance.get('minHeight'),
						minWidth: instance.get('minWidth')
					}
				);

				resize.addTarget(instance);

				instance.resize = resize;
			},

			_syncCropNodeUI: function() {
				var instance = this;

				instance.cropNode.setStyle('backgroundPosition', (-instance.get('x')) + 'px ' + (-instance.get('y')) + 'px');
			},

			_syncCropSize: function(event) {
				var instance = this;

				var cropNode = instance.cropNode;

				instance.set('cropHeight', cropNode.height());
				instance.set('cropWidth', cropNode.width());
			},

			_syncRegion: function(event) {
				var instance = this;

				var region = instance._getConstraintRegion(true);

				var origRegion = instance._origRegion;

				if (
					region.bottom != origRegion.bottom ||
					region.left != origRegion.left ||
					region.right != origRegion.right ||
					region.top != origRegion.top
				) {

					var drag = instance.drag;
					var resize = instance.resize;

					if (drag) {
						drag.con.set('constrain', region);
					}

					if (resize) {
						resize.con.set('constrain', region);
					}

					instance._origRegion = region;
				}
			},

			_syncXY: function(event) {
				var instance = this;

				var cropNode = instance.cropNode;

				instance.set('x', toInt(cropNode.getStyle('left')) + cropNode.getBorderWidth('l'));
				instance.set('y', toInt(cropNode.getStyle('top')) + cropNode.getBorderWidth('t'));
			},

			_uiSetCropHeight: function(value) {
				var instance = this;

				instance.cropNode.height(value);
			},

			_uiSetCropWidth: function(value) {
				var instance = this;

				instance.cropNode.width(value);
			},

			_uiSetDisabled: function(value) {
				var instance = this;

				ImageCropper.superclass._uiSetDisabled.apply(instance, arguments);

				var enabled = !value;

				instance.cropNode.toggle(enabled);

				if (enabled) {
					instance._createHover();
				}
				else {
					instance._destroyHover();
				}
			},

			_uiSetMinHeight: function(value) {
				var instance = this;

				var resize = instance.resize;

				if (resize) {
					resize.con.set('minHeight', value);
				}
			},

			_uiSetMinWidth: function(value) {
				var instance = this;

				var resize = instance.resize;

				if (resize) {
					resize.con.set('minWidth', value);
				}
			},

			_uiSetMovable: function(value) {
				var instance = this;

				instance.drag.set('lock', !value);
			},

			_uiSetPreserveRatio: function(value) {
				var instance = this;

				var resize = instance.resize;

				if (resize) {
					resize.con.set('preserveRatio', value);
				}
			},

			_uiSetResizable: function(value) {
				var instance = this;

				if (value) {
					if (instance._stopResizeHandle) {
						instance._stopResizeHandle.detach();
					}
				}
				else if (!instance._stopResizeHandle) {
					instance._stopResizeHandle = instance.resize.on(
						'resize:resize',
						function (event) {
							event.halt();
						}
					);
				}
			},

			_uiSetX: function(value) {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var cropNode = instance.cropNode;

				cropNode.setStyle('left', value - cropNode.getBorderWidth('l'));
			},

			_uiSetY: function(value) {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var cropNode = instance.cropNode;

				cropNode.setStyle('top', value - cropNode.getBorderWidth('t'));
			},

			_unHoverOverlay: function() {
				var instance = this;

				if (!instance._isDragging() && !instance._isResizing()) {
					instance._boundingBox.removeClass(CSS_OVERLAY_HOVER);
				}
			}
		}
	}
);

A.ImageCropper = ImageCropper;

}, '@VERSION@' ,{skinnable:true, requires:['widget','aui-base','resize','dd-constrain']});
