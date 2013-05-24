/**
 * The Image Cropper Component
 *
 * @module aui-image-cropper
 */

var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isNumber = Lang.isNumber,

    toInt = Lang.toInt,

    NAME = 'image-cropper',

    CSS_CROP = A.getClassName(NAME, 'crop'),
    CSS_CROP_OUTLINE = A.getClassName(NAME, 'crop', 'outline'),
    CSS_OVERLAY = A.getClassName(NAME, 'overlay');
    CSS_OVERLAY_HOVER = A.getClassName(NAME, 'crop', 'hover');

/**
 * A base class for Image Cropper.
 *
 * Check the [live demo](http://alloyui.com/examples/image-cropper/).
 *
 * @class A.ImageCropper
 * @extends A.Component
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var ImageCropper = A.Component.create(
    {
        /**
         * Static property provides a string to identify the class.
         *
         * @property ImageCropper.NAME
         * @type String
         * @static
         */
        NAME: NAME,

        /**
         * Static property used to define the default attribute
         * configuration for the Image Cropper.
         *
         * @property ImageCropper.ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             * The height of a selected area to crop.
             *
             * @attribute cropHeight
             * @default 100
             * @type Number
             */
            cropHeight: {
                value: 100,
                validator: isNumber
            },

            /**
             * The width of a selected area to crop.
             *
             * @attribute cropWidth
             * @default 100
             * @type Number
             */
            cropWidth: {
                value: 100,
                validator: isNumber
            },

            /**
             * The minimum width of a selected area to crop.
             *
             * @attribute minWidth
             * @default undefined
             * @type Number
             */
            minWidth: {
                value: undefined
            },

            /**
             * The minimum height of a selected area to crop.
             *
             * @attribute minHeight
             * @default undefined
             * @type Number
             */
            minHeight: {
                value: undefined
            },

            /**
             * Determine if the crop area should move or not.
             *
             * @attribute movable
             * @default true
             * @type Boolean
             */
            movable: {
                value: true,
                validator: isBoolean
            },

            /**
             * Determine if the crop area should preserve the
             * aspect ratio or not.
             *
             * @attribute preserveRatio
             * @default false
             * @type Boolean
             */
            preserveRatio: {
                value: false,
                validator: isBoolean
            },

            /**
             * Determine the region of a selected area to crop.
             *
             * @attribute region
             * @default {}
             * @type Object
             */
            region: {
                getter: '_getCropRegion',
                value: {}
            },

            /**
             * Determine if the crop area should resize or not.
             *
             * @attribute resizable
             * @default true
             * @type Boolean
             */
            resizable: {
                value: true,
                validator: isBoolean
            },

            /**
             * The X position of a selected area to crop.
             *
             * @attribute x
             * @default 0
             * @type Number
             */
            x: {
                value: 0,
                setter: Math.round,
                validator: isNumber
            },

            /**
             * The Y position of a selected area to crop.
             *
             * @attribute y
             * @default 0
             * @type Number
             */
            y: {
                value: 0,
                setter: Math.round,
                validator: isNumber
            }
        },

        /**
         * Static property used to define the UI attributes.
         *
         * @property ImageCropper.UI_ATTRS
         * @type Array
         * @static
         */
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

            /**
             * Render the Image Cropper component instance. Lifecycle.
             *
             * @method renderUI
             * @protected
             */
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

            /**
             * Bind the events on the Image Cropper UI. Lifecycle.
             *
             * @method bindUI
             * @protected
             */
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

            /**
             * Sync the Image Cropper UI. Lifecycle.
             *
             * @method syncUI
             * @protected
             */
            syncUI: function() {
                var instance = this;

                instance._uiSetPreserveRatio(instance.get('preserveRatio'));

                instance.syncImageUI();
                instance._syncCropNodeUI();
            },

            /**
             * Destroy the Image Cropper. Lifecycle.
             *
             * @method syncUI
             * @protected
             */
            destructor: function() {
                var instance = this;

                instance._destroyDrag();
                instance._destroyResize();
            },

            /**
             * Sync the image on the UI.
             *
             * @method syncImageUI
             */
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

            /**
             * Constrain to valid values.
             *
             * @method _constrainValues
             * @protected
             */
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

            /**
             * Create mouse over effect.
             *
             * @method _createHover
             * @protected
             */
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

            /**
             * Define which function Image Cropper should execute.
             *
             * @method _defCropFn
             * @protected
             */
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

            /**
             * Destroy the ability to drag.
             *
             * @method _destroyDrag
             * @param object
             * @protected
             */
            _destroyDrag: function(object) {
                var instance = this;

                if (instance.drag) {
                    instance.drag.destroy();

                    delete instance.drag;
                }
            },

            /**
             * Destroy the mouse over effect.
             *
             * @method _destroyHover
             * @protected
             */
            _destroyHover: function() {
                var instance = this;

                if (instance._hoverHandles) {
                    instance._hoverHandles.detach();

                    instance._hoverHandles = null;
                }
            },

            /**
             * Destroy the ability to resize.
             *
             * @method _destroyResize
             * @param object
             * @protected
             */
            _destroyResize: function(object) {
                var instance = this;

                if (instance.resize) {
                    instance.resize.destroy();

                    delete instance.resize;
                }
            },

            /**
             * Fire event of cropping a selected area.
             *
             * @method _fireCropEvent
             * @param event
             * @protected
             */
            _fireCropEvent: function(event) {
                var instance = this;

                instance.fire('crop', {cropType: event.type});
            },

            /**
             * Get contraint region.
             *
             * @method _getConstraintRegion
             * @param force
             * @protected
             */
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

            /**
             * Get crop region (width/height/x/y).
             *
             * @method _getCropRegion
             * @return {Object}
             * @protected
             */
            _getCropRegion: function() {
                var instance = this;

                return {
                    height: instance.get('cropHeight'),
                    width: instance.get('cropWidth'),
                    x: instance.get('x'),
                    y: instance.get('y')
                };
            },

            /**
             * Add overlay class on mouse over event.
             *
             * @method _hoverOverlay
             * @protected
             */
            _hoverOverlay: function() {
                var instance = this;

                if (!instance._isDragging() && !instance._isResizing()) {
                    instance._boundingBox.addClass(CSS_OVERLAY_HOVER);
                }
            },

            /**
             * Check if it's dragging.
             *
             * @method _isDragging
             * @protected
             */
            _isDragging: function() {
                var instance = this;

                var drag = instance.drag;

                return drag && drag.get('dragging');
            },

            /**
             * Check if it's resizing.
             *
             * @method _isResizing
             * @protected
             */
            _isResizing: function() {
                var instance = this;

                var resize = instance.resize;

                return resize && resize.get('resizing');
            },

            /**
             * Plug Drag into Image Cropper.
             *
             * @method _renderDrag
             * @protected
             */
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

            /**
             * Plug Resize into Image Cropper.
             *
             * @method _renderResize
             * @protected
             */
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

            /**
             * Sync crop node on the UI.
             *
             * @method _syncCropNodeUI
             * @protected
             */
            _syncCropNodeUI: function() {
                var instance = this;

                instance.cropNode.setStyle('backgroundPosition', (-instance.get('x')) + 'px ' + (-instance.get('y')) + 'px');
            },

            /**
             * Sync crop size (width/height).
             *
             * @method _syncCropSize
             * @param event
             * @protected
             */
            _syncCropSize: function(event) {
                var instance = this;

                var cropNode = instance.cropNode;

                instance.set('cropHeight', cropNode.height());
                instance.set('cropWidth', cropNode.width());
            },

            /**
             * Sync region (top/bottom/left/right).
             *
             * @method _syncRegion
             * @param event
             * @protected
             */
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

            /**
             * Sync positions (x/y).
             *
             * @method _syncXY
             * @param event
             * @protected
             */
            _syncXY: function(event) {
                var instance = this;

                var cropNode = instance.cropNode;

                instance.set('x', toInt(cropNode.getStyle('left')) + cropNode.getBorderWidth('l'));
                instance.set('y', toInt(cropNode.getStyle('top')) + cropNode.getBorderWidth('t'));
            },

            /**
             * Set <code>cropHeight</code> attribute on the UI.
             *
             * @method _uiSetCropHeight
             * @param value
             * @protected
             */
            _uiSetCropHeight: function(value) {
                var instance = this;

                instance.cropNode.height(value);
            },

            /**
             * Set <code>cropWidth</code> attribute on the UI.
             *
             * @method _uiSetCropWidth
             * @param value
             * @protected
             */
            _uiSetCropWidth: function(value) {
                var instance = this;

                instance.cropNode.width(value);
            },

            /**
             * Enable or disable mouse over effect on the UI.
             *
             * @method _uiSetDisabled
             * @param value
             * @protected
             */
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

            /**
             * Set <code>minHeight</code> attribute on the UI.
             *
             * @method _uiSetMinHeight
             * @param value
             * @protected
             */
            _uiSetMinHeight: function(value) {
                var instance = this;

                var resize = instance.resize;

                if (resize) {
                    resize.con.set('minHeight', value);
                }
            },

            /**
             * Set <code>minWidth</code> attribute on the UI.
             *
             * @method _uiSetMinWidth
             * @param value
             * @protected
             */
            _uiSetMinWidth: function(value) {
                var instance = this;

                var resize = instance.resize;

                if (resize) {
                    resize.con.set('minWidth', value);
                }
            },

            /**
             * Set <code>movable</code> attribute on the UI.
             *
             * @method _uiSetMovable
             * @param value
             * @protected
             */
            _uiSetMovable: function(value) {
                var instance = this;

                instance.drag.set('lock', !value);
            },

            /**
             * Set <code>preserveRatio</code> attribute on the UI.
             *
             * @method _uiSetPreserveRatio
             * @param value
             * @protected
             */
            _uiSetPreserveRatio: function(value) {
                var instance = this;

                var resize = instance.resize;

                if (resize) {
                    resize.con.set('preserveRatio', value);
                }
            },

            /**
             * Set <code>resizable</code> attribute on the UI.
             *
             * @method _uiSetResizable
             * @param value
             * @protected
             */
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

            /**
             * Set <code>x</code> attribute on the UI.
             *
             * @method _uiSetX
             * @param value
             * @protected
             */
            _uiSetX: function(value) {
                var instance = this;

                var imageNode = instance.get('srcNode');
                var cropNode = instance.cropNode;

                cropNode.setStyle('left', value - cropNode.getBorderWidth('l'));
            },

            /**
             * Set <code>y</code> attribute on the UI.
             *
             * @method _uiSetY
             * @param value
             * @protected
             */
            _uiSetY: function(value) {
                var instance = this;

                var imageNode = instance.get('srcNode');
                var cropNode = instance.cropNode;

                cropNode.setStyle('top', value - cropNode.getBorderWidth('t'));
            },

            /**
             * Remove overlay class on mouse over event.
             *
             * @method _unHoverOverlay
             * @protected
             */
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