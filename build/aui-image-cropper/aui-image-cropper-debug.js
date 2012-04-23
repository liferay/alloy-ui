AUI.add('aui-image-cropper', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isNumber = Lang.isNumber,

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

				A.all([
					instance.cropNode,
					instance.overlay
				]).appendTo(boundingBox);

				instance._boundingBox = boundingBox;

				instance._renderDrag();
				instance._renderResize();
			},

			bindUI: function() {
				var instance = this;

				instance.drag.addTarget(instance);
				instance.resize.addTarget(instance);

				instance.after('drag:drag', instance._afterMove);
				instance.after('resize:resize', instance._afterResize);

				instance.cropNode.hover(
					A.bind(instance._hoverOverlay, instance),
					A.bind(instance._unHoverOverlay, instance)
				);
			},

			syncUI: function() {
				var instance = this;

				instance._uiSetPreserveRatio(instance.get('preserveRatio'));

				instance.afterImageChange();
			},

			destructor: function() {
				var instance = this;

				instance._destroyDrag();
				instance._destroyResize();
			},

			afterImageChange: function() {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var overlayNode = instance.overlay;

				instance.cropNode.setStyle('backgroundImage', 'url(' + imageNode.attr('src') + ')');

				overlayNode.setXY(imageNode.getXY());
				overlayNode.width(imageNode.width());
				overlayNode.height(imageNode.height());

				instance.constrainValues();
				instance._afterMove();

				if (instance.drag) {
					instance.drag.con.set('constrain', instance._getConstraintRegion());
				}

				if (instance.resize) {
					instance.resize.con.set('constrain', instance._getConstraintRegion());
				}
			},

			constrainValues: function() {
				var instance = this;

				var imageNode = instance.get('srcNode');

				var imageWidth = imageNode.width();
				var imageHeight = imageNode.height();

				var originalX = instance.get('x');
				var originalY = instance.get('y');
				var originalCropHeight = instance.get('cropHeight');
				var originalCropWidth = instance.get('cropWidth');

				var y = originalY;
				var x = originalX;
				var cropHeight = originalCropHeight;
				var cropWidth = originalCropWidth;

				// Find valid y

				if (y < 0) {
					y = 0
				}

				if (y + cropHeight > imageHeight) {
					y = Math.max(imageHeight - cropHeight, 0);
				}

				if (y != originalY) {
					instance.set('y', y);
				}

				// Find valid cropHeight

				if (y + cropHeight > imageHeight) {
					cropHeight = Math.max(imageHeight - y, 0);
				}

				if (cropHeight != originalCropHeight) {
					instance.set('cropHeight', cropHeight);
				}

				// Find valid x

				if (x < 0) {
					x = 0
				}

				if (x + cropWidth > imageWidth) {
					x = Math.max(imageWidth - cropWidth, 0);
				}

				if (x != originalX) {
					instance.set('x', x);
				}

				// Find valid cropWidth

				if (x + cropWidth > imageWidth) {
					cropWidth = Math.max(imageWidth - x, 0);
				}

				if (cropWidth != originalCropWidth) {
					instance.set('cropWidth', cropWidth);
				}
			},

			getCropRegion: function() {
				var instance = this;

				return {
					x: instance.get('x'),
					y: instance.get('y'),
					width: instance.get('cropWidth'),
					height: instance.get('cropHeight')
				};
			},

			_afterMove: function(event) {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var cropNode = instance.cropNode;

				var imageXY = imageNode.getXY();
				var imageX = imageXY[0];
				var imageY = imageXY[1];

				var cropXY = cropNode.getXY();
				var cropX = cropXY[0];
				var cropY = cropXY[1];

				var offsetX = cropX - imageX + cropNode.getBorderWidth('l');
				var offsetY = cropY - imageY + cropNode.getBorderWidth('t');

				cropNode.setStyle('backgroundPosition', (-offsetX) + 'px ' + (-offsetY) + 'px');

				instance.set('x', offsetX);
				instance.set('y', offsetY);
			},

			_afterResize: function(event) {
				var instance = this;

				var cropNode = instance.cropNode;

				instance.set('cropHeight', cropNode.height());
				instance.set('cropWidth', cropNode.width());
			},

			_destroyDrag: function(object) {
				var instance = this;

				if (instance.drag) {
					instance.drag.destroy();
					delete instance.drag;
				}
			},

			_destroyResize: function(object) {
				var instance = this;

				if (instance.resize) {
					instance.resize.destroy();
					delete instance.resize;
				}
			},

			_getConstraintRegion: function() {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var cropNode = instance.cropNode;

				var imageXY = imageNode.getXY();
				var imageX = imageXY[0];
				var imageY = imageXY[1];

				return {
					top: imageY - cropNode.getBorderWidth('t'),
					right: imageX + imageNode.width() + cropNode.getBorderWidth('r'),
					bottom: imageY + imageNode.height() + cropNode.getBorderWidth('b'),
					left: imageX - cropNode.getBorderWidth('l')
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

				instance.drag = new A.DD.Drag(
					{
						node: instance.cropNode
					}
				).plug(
					A.Plugin.DDConstrained,
					{
						constrain: instance._getConstraintRegion()
					}
				);
			},

			_renderResize: function() {
				var instance = this;

				instance.resize = new A.Resize(
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
			},

			_uiSetCropHeight: function(value) {
				var instance = this;

				instance.cropNode.height(value);
			},

			_uiSetCropWidth: function(value) {
				var instance = this;

				instance.cropNode.width(value);
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
					if (instance.stopResize) {
						instance.stopResize.detach();
					}
				}
				else {
					if (!instance.stopResize) {
						instance.stopResize = instance.resize.on(
							'resize:resize',
							function (event) {
								event.preventDefault();
								event.stopPropagation();
							}
						);
					}
				}
			},

			_uiSetX: function(value) {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var cropNode = instance.cropNode;

				cropNode.setX(imageNode.getX() + value - cropNode.getBorderWidth('l'));
			},

			_uiSetY: function(value) {
				var instance = this;

				var imageNode = instance.get('srcNode');
				var cropNode = instance.cropNode;

				cropNode.setY(imageNode.getY() + value - cropNode.getBorderWidth('t'));
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

}, '@VERSION@' ,{requires:['widget','aui-base','resize','dd-constrain'], skinnable:true});
