/**
 * The Image Viewer Base module.
 *
 * @module aui-image-viewer-base
 */

var CSS_CONTROL = A.getClassName('image', 'viewer', 'base', 'control'),
    CSS_CONTROL_LEFT = A.getClassName('image', 'viewer', 'base', 'control', 'left'),
    CSS_CONTROL_RIGHT = A.getClassName('image', 'viewer', 'base', 'control', 'right'),
    CSS_CURRENT_IMAGE = A.getClassName('image', 'viewer', 'base', 'current', 'image'),
    CSS_IMAGE = A.getClassName('image', 'viewer', 'base', 'image'),
    CSS_IMAGE_CONTAINER = A.getClassName('image', 'viewer', 'base', 'image', 'container'),
    CSS_IMAGE_LIST = A.getClassName('image', 'viewer', 'base', 'image', 'list'),
    CSS_IMAGE_LIST_INNER = A.getClassName('image', 'viewer', 'base', 'image', 'list', 'inner'),
    CSS_LOADING = A.getClassName('image', 'viewer', 'base', 'loading'),
    CSS_LOADING_ICON = A.getClassName('image', 'viewer', 'base', 'loading', 'icon');

/**
 * Fired when the current image will be animated in.
 *
 * @event animate
 * @preventable _defAnimateFn
 */

/**
 * The base class for Image Viewer.
 *
 * @class A.ImageViewerBase
 * @extends A.Widget
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.ImageViewerBase = A.Base.create(
    'image-viewer-base',
    A.Widget, [
        A.WidgetResponsive
    ], {
        TPL_CONTROL_LEFT: '<a href="#" class="' + CSS_CONTROL + ' ' + CSS_CONTROL_LEFT +
            '"><span class="glyphicon glyphicon-chevron-left"></span></a>',
        TPL_CONTROL_RIGHT: '<a href="#" class="' + CSS_CONTROL + ' ' + CSS_CONTROL_RIGHT +
            '"><span class="glyphicon glyphicon-chevron-right"></span></a>',
        TPL_IMAGE: '<img class="' + CSS_IMAGE + '"></img>',
        TPL_IMAGE_CONTAINER: '<div class="' + CSS_IMAGE_CONTAINER + '">' +
            '<span class="glyphicon glyphicon-time ' + CSS_LOADING_ICON + '"></span></div>',
        TPL_IMAGE_LIST: '<div class="' + CSS_IMAGE_LIST + '"><div class="' + CSS_IMAGE_LIST_INNER + '"></div></div>',

        /**
         * Constructor for the `A.ImageViewerBase`. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            this._eventHandles = [];

            this.publish({
                animate: {
                    defaultFn: this._defAnimateFn
                }
            });
        },

        /**
         * Create the DOM structure for the `A.ImageViewerBase`. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            this.get('boundingBox').unselectable();

            this._renderImages();
            this._renderControls();
        },

        /**
         * Bind the events for the `A.ImageViewerBase` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            this._eventHandles.push(
                this.after({
                    sourcesChange: this._renderImages,
                    currentIndexChange: this._afterCurrentIndexChange,
                    preloadAllImagesChange: this._preloadAll,
                    responsive: this._afterResponsive,
                    showControlsChange: this._syncControlsUI
                }),
                this.on('responsive', this._onResponsive),
                A.after(this._afterUISetVisible, this, '_uiSetVisible')
            );

            this._bindControls();
        },

        /**
         * Destructor implementation for the `A.ImageViewerBase` class. Lifecycle.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            (new A.EventHandle(this._eventHandles)).detach();
        },

        /**
         * Checks if there is a next element to navigate.
         *
         * @method hasNext
         * @return {Boolean}
         */
        hasNext: function() {
            return this.get('circular') || this.get('currentIndex') < this.get('sources').length - 1;
        },

        /**
         * Checks if there is a previous element to navigate.
         *
         * @method hasPrev
         * @return {Boolean}
         */
        hasPrev: function() {
            return this.get('circular') || this.get('currentIndex') > 0;
        },

        /**
         * Loads the next image.
         *
         * @method next
         */
        next: function() {
            if (this.hasNext()) {
                if (this.get('currentIndex') === this.get('sources').length - 1) {
                    this.set('currentIndex', 0);
                }
                else {
                    this.set('currentIndex', this.get('currentIndex') + 1);
                }
            }
        },

        /**
         * Loads the previous image.
         *
         * @method prev
         */
        prev: function() {
            if (this.hasPrev()) {
                if (this.get('currentIndex') === 0) {
                    this.set('currentIndex', this.get('sources').length - 1);
                }
                else {
                    this.set('currentIndex', this.get('currentIndex') - 1);
                }
            }
        },

        /**
         * Fired after the `currentIndex` attribute is set.
         *
         * @method _afterCurrentIndexChange
         * @param {EventFacade} event
         * @protected
         */
        _afterCurrentIndexChange: function(event) {
            this._previousIndex = event.prevVal;
            this._showCurrentImage();
        },

        /**
         * Fired after the `responsive` event.
         *
         * @method _afterResponsive
         * @protected
         */
        _afterResponsive: function() {
            var image = this._getCurrentImage();

            if (image) {
                image.setStyles({
                    maxHeight: '100%',
                    maxWidth: '100%'
                });
            }
        },

        /**
         * Fired after the `visible` attribute is set.
         *
         * @method _afterUISetVisible
         * @protected
         */
        _afterUISetVisible: function() {
            if (this.get('visible')) {
                this._showCurrentImage();
            }
            else {
                this._syncControlsUI();
            }

        },

        /**
         * Binds the events related to the viewer's controls.
         *
         * @method _bindControls
         * @protected
         */
        _bindControls: function() {
            this._eventHandles.push(
                this.get('contentBox').delegate('click', this._onClickControl, '.' + CSS_CONTROL, this)
            );
        },

        /**
         * Default behavior for animating the current image in the viewer.
         *
         * @method _defAnimateFn
         * @protected
         */
        _defAnimateFn: function() {
            var image = this._getCurrentImage(),
                imageAnim = this.get('imageAnim');

            if (imageAnim === false) {
                return;
            }

            if (!this._animation) {
                this._animation = new A.Anim(imageAnim);
            }
            else {
                this._animation.stop(true);
                this._animation.setAttrs(imageAnim);
            }

            image.setStyle('opacity', 0);
            this._animation.set('node', image);
            this._animation.run();
        },

        /**
         * Gets the current image node.
         *
         * @method _getCurrentImage
         * @return {Node}
         * @protected
         */
        _getCurrentImage: function() {
            return this._getCurrentImageContainer().one('.' + CSS_IMAGE);
        },

        /**
         * Returns the container node for the current image.
         *
         * @method _getCurrentImageContainer
         * @protected
         */
        _getCurrentImageContainer: function() {
            return this._getImageContainerAtIndex(this.get('currentIndex'));
        },

        /**
         * Returns the container node at the requested index.
         *
         * @method _getImageContainerAtIndex
         * @param {Number} index
         * @protected
         */
        _getImageContainerAtIndex: function(index) {
            return this.get('contentBox').all('.' + CSS_IMAGE_CONTAINER).item(index);
        },

        /**
         * Fires the necessary events to load the requested image.
         *
         * @method _loadImage
         * @param {Number} index The index of the image to load.
         * @protected
         */
        _loadImage: function(index) {
            this.fire('load' + index);
        },

        /**
         * Fired when one of the viewer's controls is clicked.
         *
         * @method _onClickControl
         * @param {EventFacade} event
         * @protected
         */
        _onClickControl: function(event) {
            event.preventDefault();

            if (event.currentTarget.hasClass(CSS_CONTROL_LEFT)) {
                this.prev();
            }
            else if (event.currentTarget.hasClass(CSS_CONTROL_RIGHT)) {
                this.next();
            }
        },

        /**
         * This should be called when the current image is ready to be
         * displayed.
         *
         * @method _onCurrentImageReady
         * @protected
         */
        _onCurrentImageReady: function() {
            if (this.get('visible')) {
                this.updateDimensionsWithNewRatio();

                this.fire('animate', {
                    image: this._getCurrentImage()
                });
            }
        },

        /**
         * Fired when an image has finished loading.
         *
         * @method _onImageLoad
         * @protected
         */
        _onImageLoad: function(image, index) {
            image.setData('loaded', true);
            image.get('parentNode').removeClass(CSS_LOADING);

            if (this.get('visible') && index === this.get('currentIndex')) {
                this._onCurrentImageReady();
            }
        },

        /**
         * Fired on the `responsive` event.
         *
         * @method _onResponsive
         * @protected
         */
        _onResponsive: function() {
            var image = this._getCurrentImage();

            if (image) {
                image.setStyles({
                    maxHeight: 'none',
                    maxWidth: 'none'
                });
            }
        },

        /**
         * Preloads all the images if the `preloadAllImages` attribute is true.
         *
         * @method _preloadAll
         * @protected
         */
        _preloadAll: function() {
            var sources = this.get('sources');

            if (this.get('preloadAllImages')) {
                for (var i = 0; i < sources.length; i++) {
                    this._loadImage(i);
                }
            }
        },

        /**
         * Renders the viewer's controls.
         *
         * @method _renderControls
         * @protected
         */
        _renderControls: function() {
            var gutterHorizontal = 0;

            this._controlLeftEl = A.Node.create(this.TPL_CONTROL_LEFT);
            this.get('contentBox').prepend(this._controlLeftEl);
            gutterHorizontal += this._controlLeftEl.get('offsetWidth');

            this._controlRightEl = A.Node.create(this.TPL_CONTROL_RIGHT);
            this.get('contentBox').append(this._controlRightEl);
            gutterHorizontal += this._controlRightEl.get('offsetWidth');

            this.set('gutter', [gutterHorizontal, 0]);
        },

        /**
         * Renders the requested image and registers it to be loaded when used.
         *
         * @method _renderImage
         * @param {Number} index The index of the image to be loaded.
         * @param {Node} container The container where the image should be added.
         * @protected
         */
        _renderImage: function(index, container) {
            var group,
                image = A.Node.create(this.TPL_IMAGE),
                src = this.get('sources')[index];

            container.prepend(image);

            if (A.UA.ie === 8) {
                // YUI is currently losing the reference to the img node on IE8
                // after creating it, in a way that setting attributes doesn't
                // work on the img unless we find it from the DOM again.
                image = container.one('.' + CSS_IMAGE);
            }

            this._eventHandles.push(
                image.once('load', A.bind(this._onImageLoad, this, image, index))
            );

            group = new A.ImgLoadGroup();
            group.addCustomTrigger('load' + index, this);
            group.registerImage({
                domId: image.generateID(),
                srcUrl: src
            });
        },

        /**
         * Renders the image list node inside the image viewer.
         *
         * @method _renderImageListNode
         * @protected
         */
        _renderImageListNode: function() {
            var list = A.Node.create(this.TPL_IMAGE_LIST);
            this.get('contentBox').setHTML(list);

            return list.one('.' + CSS_IMAGE_LIST_INNER);
        },

        /**
         * Renders the images indicated in the `sources` attribute.
         *
         * @method _renderImages
         * @protected
         */
        _renderImages: function() {
            var container,
                list = this._renderImageListNode(),
                sources = this.get('sources');

            for (var i = 0; i < sources.length; i++) {
                container = A.Node.create(this.TPL_IMAGE_CONTAINER);
                container.addClass(CSS_LOADING);
                list.append(container);

                this._renderImage(i, container);
            }

            this._preloadAll();
        },

        /**
         * Shows the current image in the viewer.
         *
         * @method _showCurrentImage
         * @protected
         */
        _showCurrentImage: function() {
            var currentIndex = this.get('currentIndex'),
                image;

            if (!this.get('visible')) {
                return;
            }

            this._updateCurrentImageCSS();

            this._loadImage(currentIndex);

            if (this.get('preloadNeighborImages')) {
                if (this.hasPrev()) {
                    this._loadImage(currentIndex - 1);
                }
                if (this.hasNext()) {
                    this._loadImage(currentIndex + 1);
                }
            }

            image = this._getCurrentImage();
            if (image.getData('loaded')) {
                this._onCurrentImageReady();
            }

            this._syncControlsUI();
        },

        /**
         * Sets `imageAnim` attribute.
         *
         * @method _setImageAnim
         * @param {Object} val
         * @protected
         */
        _setImageAnim: function(val) {
            if (val === false) {
                return val;
            }
            else {
                return A.merge({
                        to: {
                            opacity: 1
                        },
                        duration: 0.8
                    },
                    val
                );
            }
        },

        /**
         * Updates the controls, showing or hiding them as necessary.
         *
         * @method _syncControlsUI
         * @protected
         */
        _syncControlsUI: function() {
            if (this.get('visible') && this.get('showControls') && this.hasPrev()) {
                this._controlLeftEl.setStyle('visibility', 'visible');
            }
            else {
                this._controlLeftEl.setStyle('visibility', 'hidden');
            }

            if (this.get('visible') && this.get('showControls') && this.hasNext()) {
                this._controlRightEl.setStyle('visibility', 'visible');
            }
            else {
                this._controlRightEl.setStyle('visibility', 'hidden');
            }
        },

        /**
         * Sets the CSS class that indicates the current image.
         *
         * @method _updateCurrentImageCSS
         * @protected
         */
        _updateCurrentImageCSS: function() {
            if (A.Lang.isNumber(this._previousIndex)) {
                this._getImageContainerAtIndex(this._previousIndex).removeClass(CSS_CURRENT_IMAGE);
            }
            this._getCurrentImageContainer().addClass(CSS_CURRENT_IMAGE);
        }
    }, {
        /**
         * Static property used to define the default attribute configuration
         * for the `A.ImageViewerBase`.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {
            /**
             * If the image list will be circular or not.
             *
             * @attribute circular
             * @default false
             * @type Boolean
             */
            circular: {
                value: false,
                validator: A.Lang.isBoolean
            },

            /**
             * Index of the current image.
             *
             * @attribute currentIndex
             * @default 0
             * @type Number
             */
            currentIndex: {
                value: 0,
                validator: A.Lang.isNumber
            },

            /**
             * Configuration attributes passed to the [Anim](Anim.html) class, or
             * false if there should be no animation.
             *
             * @attribute imageAnim
             * @default Predefined [Anim](Anim.html) configuration.
             * @type Boolean | Object
             */
            imageAnim: {
                value: {},
                setter: '_setImageAnim',
                validator: function(val) {
                    return A.Lang.isObject(val) || val === false;
                }
            },

            /**
             * Preloads all images listed in the `sources` attribute.
             *
             * @attribute preloadAllImages
             * @default false
             * @type Boolean
             */
            preloadAllImages: {
                value: false,
                validator: A.Lang.isBoolean
            },

            /**
             * Preloads the neighbor image (i.e., the previous and next image
             * based on the current load one).
             *
             * @attribute preloadAllImages
             * @default false
             * @type Boolean
             */
            preloadNeighborImages: {
                value: true,
                validator: A.Lang.isBoolean
            },

            /**
             * Shows the controls.
             *
             * @attribute showControls
             * @default true
             * @type Boolean
             */
            showControls: {
                value: true,
                validator: A.Lang.isBoolean
            },

            /**
             * The source links for the images to be shown.
             *
             * @attribute sources
             * @default []
             * @type Array
             */
            sources: {
                value: [],
                validator: A.Lang.isArray
            }
        },

        /**
         * Static property provides a string to identify the CSS prefix.
         *
         * @property CSS_PREFIX
         * @type String
         * @static
         */
        CSS_PREFIX: A.getClassName('image-viewer-base')
    }
);
