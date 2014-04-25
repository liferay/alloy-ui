/**
 * The ImageViewer Utility
 *
 * @module aui-image-viewer
 * @submodule aui-image-viewer-base
 */

var L = A.Lang,
    isBoolean = L.isBoolean,
    isNumber = L.isNumber,
    isObject = L.isObject,
    isString = L.isString,

    NodeFx = A.Plugin.NodeFX,

    DOC = A.config.doc,

    isNodeList = function(v) {
        return (v instanceof A.NodeList);
    },

    concat = function() {
        return Array.prototype.slice.call(arguments).join(' ');
    },

    getCN = A.getClassName,

    CSS_CAROUSEL_CONTROL = getCN('carousel', 'control'),
    CSS_CLOSE = getCN('close'),
    CSS_ICON = getCN('glyphicon'),
    CSS_ICON_REMOVE = getCN('glyphicon', 'remove'),
    CSS_ICON_CHEVRON_LEFT = getCN('glyphicon', 'chevron', 'left'),
    CSS_ICON_CHEVRON_RIGHT = getCN('glyphicon', 'chevron', 'right'),
    CSS_ICON_TIME = getCN('glyphicon', 'time'),
    CSS_IMAGE_VIEWER_BD = getCN('image-viewer', 'bd'),
    CSS_IMAGE_VIEWER_CAPTION = getCN('image-viewer', 'caption'),
    CSS_IMAGE_VIEWER_CLOSE = getCN('image-viewer', 'close'),
    CSS_IMAGE_VIEWER_CONTROL = getCN('image-viewer', 'control'),
    CSS_IMAGE_VIEWER_IMAGE = getCN('image-viewer', 'image'),
    CSS_IMAGE_VIEWER_INFO = getCN('image-viewer', 'info'),
    CSS_IMAGE_VIEWER_LINK = getCN('image-viewer', 'link'),
    CSS_IMAGE_VIEWER_LOADER = getCN('image-viewer', 'loader'),
    CSS_IMAGE_VIEWER_LOADING = getCN('image-viewer', 'loading'),
    CSS_LEFT = getCN('left'),
    CSS_RIGHT = getCN('right'),
    CSS_WELL = getCN('well'),

    MAP_RESET_DIMENSIONS = {
        height: 'auto',
        width: 'auto'
    },

    NODE_BLANK_TEXT = DOC.createTextNode(''),

    INFO_LABEL_TEMPLATE = 'Image {current} of {total}',

    TPL_CAPTION = '<h4 class="' + CSS_IMAGE_VIEWER_CAPTION + '"></h4>',
    TPL_CLOSE = '<button class="' + concat(CSS_IMAGE_VIEWER_CLOSE, CSS_CLOSE) + '" type="button">' +
        '<span class="' + [CSS_ICON, CSS_ICON_REMOVE].join(' ') + '"></span></button>',
    TPL_CONTROL_LEFT = '<a href="#" class="' + concat(CSS_IMAGE_VIEWER_CONTROL, CSS_CAROUSEL_CONTROL, CSS_LEFT) +
        '"><span class="' + [CSS_ICON, CSS_ICON_CHEVRON_LEFT].join(' ') + '"></span></a>',
    TPL_CONTROL_RIGHT = '<a href="#" class="' + concat(CSS_IMAGE_VIEWER_CONTROL, CSS_CAROUSEL_CONTROL, CSS_RIGHT) +
        '"><span class="' + [CSS_ICON, CSS_ICON_CHEVRON_RIGHT].join(' ') + '"></span></a>',
    TPL_IMAGE = '<img class="' + CSS_IMAGE_VIEWER_IMAGE + '" />',
    TPL_INFO = '<h5 class="' + CSS_IMAGE_VIEWER_INFO + '"></h5>',
    TPL_LOADER = '<div class="' + CSS_IMAGE_VIEWER_LOADER + '"></div>',
    TPL_LOADING = '<div class="' + CSS_ICON_TIME + '"></div>';

/**
 * A base class for `A.ImageViewer`, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - Displays an image in a Overlay
 * - Keyboard navigation support
 *
 * Check the [live demo](http://alloyui.com/examples/image-viewer/).
 *
 * @class A.ImageViewer
 * @extends Widget
 * @uses WidgetStdMod, WidgetPosition, WidgetStack, WidgetPositionAlign,
 *     WidgetPositionConstrain, WidgetModality
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/image-viewer/basic-markup.html
 * @include http://alloyui.com/examples/image-viewer/basic.js
 */
var ImageViewer = A.Base.create(
    'aui-image-viewer',
    A.Widget, [
        A.WidgetCssClass,
        A.WidgetStdMod,
        A.WidgetToggle,
        A.WidgetPosition,
        A.WidgetStack,
        A.WidgetPositionAlign,
        A.WidgetPositionConstrain,
        A.WidgetModality
    ], {
        /**
         * Handler for the key events.
         *
         * @property _keyHandler
         * @type EventHandler
         * @protected
         */
        _keyHandler: null,

        /**
         * Create the DOM structure for the `A.ImageViewer`. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            instance._renderControls();
            instance._renderFooter();

            instance.get('links').addClass(CSS_IMAGE_VIEWER_LINK);
        },

        /**
         * Bind the events on the `A.ImageViewer` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;
            var links = instance.get('links');
            var controlLeftEl = instance.get('controlLeftEl');
            var controlRightEl = instance.get('controlRightEl');
            var closeEl = instance.get('closeEl');

            closeEl.on('click', A.bind(instance._onClickCloseEl, instance));
            controlLeftEl.on('click', A.bind(instance._onClickLeftControl, instance));
            controlRightEl.on('click', A.bind(instance._onClickRightControl, instance));
            links.on('click', A.bind(instance._onClickLinks, instance));

            instance._keyHandler = A.bind(instance._onKeyInteraction, instance);

            // NOTE: using keydown to avoid keyCode bug on IE
            A.getDoc().on('keydown', instance._keyHandler);

            A.getWin().on(
                'resize',
                function() {
                    instance._setAlignCenter(true);
                }
            );

            instance.after('render', instance._afterRender);
            instance.after('loadingChange', instance._afterLoadingChange);
            instance.after('visibleChange', instance._afterVisibleChange);
        },

        /**
         * Destructor lifecycle implementation for the `A.ImageViewer` class.
         * Purges events attached to the node (and all child nodes).
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var instance = this;

            var links = instance.get('links');

            instance.close();

            links.detach('click');
            links.removeClass(CSS_IMAGE_VIEWER_LINK);

            // detach key global listener from the document
            A.getDoc().detach('keydown', instance._keyHandler);

            instance.get('controlLeftEl').remove(true);
            instance.get('controlRightEl').remove(true);
            instance.get('closeEl').remove(true);
            instance.get('loader').remove(true);
        },

        /**
         * Hides the `A.ImageViewer` instance.
         *
         * @method close
         */
        close: function() {
            var instance = this;

            instance.hide();
        },

        /**
         * Gets the `Node` reference to the `currentIndex` element from
         * the [links](A.ImageViewer.html#attr_links).
         *
         * @method getLink
         * @param {Number} currentIndex
         * @return {Node}
         */
        getLink: function(currentIndex) {
            var instance = this;

            return instance.get('links').item(currentIndex);
        },

        /**
         * Gets the current loaded node link reference.
         *
         * @method getCurrentLink
         * @return {Node}
         */
        getCurrentLink: function() {
            var instance = this;

            return instance.getLink(
                instance.get('currentIndex')
            );
        },

        /**
         * Loads an image `src` on the `A.ImageViewer`.
         *
         * @method loadImage
         * @param {String} src Image src.
         */
        loadImage: function(src) {
            var instance = this;

            var loader = instance.get('loader');

            instance.set('loading', true);

            var activeImagePool = instance._activeImagePool;

            if (!activeImagePool) {
                activeImagePool = [];

                // creating the placeholder image
                var placeholder = instance.get('image');

                var image0 = placeholder.clone();
                var image1 = placeholder.clone();

                // bind the onLoad handler to the image, this handler should
                // append the loaded image
                var onload = A.bind(instance._onLoadImage, instance);

                image0.on('load', onload);
                image1.on('load', onload);

                activeImagePool.push(image0, image1);

                instance._activeImagePool = activeImagePool;
            }

            var image = activeImagePool[0];

            image.removeAttribute('height');
            image.removeAttribute('width');

            image.setStyles(MAP_RESET_DIMENSIONS);

            // append the placeholder image to the loader div
            loader.append(image);

            // re-sort the pool
            activeImagePool.push(activeImagePool.shift(image));

            // set the src of the image to be loaded on the placeholder image.
            // dataURI allows cached images to refire load event in webkit, and
            // bypass the MimeType error (c/o Paul Irish & Doug Jones)
            if (A.UA.webkit) {
                image.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==');
            }

            image.attr('src', src);

            instance.fire('request', {
                image: image
            });
        },

        /**
         * Checks if there is a node reference for the `currentIndex`.
         *
         * @method hasLink
         * @param {Number} currentIndex
         * @return {Boolean}
         */
        hasLink: function(currentIndex) {
            var instance = this;

            return instance.getLink(currentIndex);
        },

        /**
         * Checks if there is a next element to navigate.
         *
         * @method hasNext
         * @return {Boolean}
         */
        hasNext: function() {
            var instance = this;

            return instance.hasLink(
                instance.get('currentIndex') + 1
            );
        },

        /**
         * Checks if there is a previous element to navigate.
         *
         * @method hasPrev
         * @return {Boolean}
         */
        hasPrev: function() {
            var instance = this;

            return instance.hasLink(
                instance.get('currentIndex') - 1
            );
        },

        /**
         * Hide all UI controls (i.e., arrows, close icon etc).
         *
         * @method hideControls
         */
        hideControls: function() {
            var instance = this;

            instance.get('controlLeftEl').hide();
            instance.get('controlRightEl').hide();
            instance.get('closeEl').hide();
        },

        /**
         * Loads the next image.
         *
         * @method next
         */
        next: function() {
            var instance = this;

            if (instance.hasNext()) {
                instance.set(
                    'currentIndex',
                    instance.get('currentIndex') + 1
                );

                instance.show();
            }
        },

        /**
         * Preloads all images.
         *
         * @method preloadAllImages
         */
        preloadAllImages: function() {
            var instance = this;

            instance.get('links').each(function(link, index) {
                instance.preloadImage(index);
            });
        },

        /**
         * Preloads an image based on its `index`.
         *
         * @method preloadImage
         * @param {Number} currentIndex
         */
        preloadImage: function(currentIndex) {
            var instance = this;
            var link = instance.getLink(currentIndex);

            if (link) {
                var src = link.attr('href');

                instance._createPreloadImage(src);
            }
        },

        /**
         * Loads the previous image.
         *
         * @method next
         */
        prev: function() {
            var instance = this;

            if (instance.hasPrev()) {
                instance.set(
                    'currentIndex',
                    instance.get('currentIndex') - 1
                );

                instance.show();
            }
        },

        /**
         * Shows the loading icon.
         *
         * @method showLoading
         */
        showLoading: function() {
            var instance = this;
            var loadingEl = instance.get('loadingEl');

            instance.setStdModContent('body', loadingEl);

            loadingEl.center(instance.bodyNode);
        },

        /**
         * Shows the `A.ImageViewer` UI.
         *
         * @method show
         */
        show: function() {
            var instance = this;
            var currentLink = instance.getCurrentLink();

            if (currentLink) {
                ImageViewer.superclass.show.apply(this, arguments);

                instance.loadImage(
                    currentLink.attr('href')
                );
            }
        },

        /**
         * Removes the references to the preload images to free up memory.
         *
         * @method _clearPreloadImageFn
         * @protected
         */
        _clearPreloadImageFn: function() {
            var instance = this;

            var preloadImagePool = instance._preloadImagePool;
            var image;

            for (var i in preloadImagePool) {
                if (preloadImagePool.hasOwnProperty(i)) {
                    image = preloadImagePool[i];

                    if (image && image.complete) {
                        preloadImagePool[i] = null;
                    }
                }
            }
        },

        /**
         * Creates the preload image instance, and add's it to the internal
         * pool.
         *
         * @method _createPreloadImage
         * @param src
         * @protected
         */
        _createPreloadImage: function(src) {
            var instance = this;

            var preloadImagePool = instance._preloadImagePool;

            if (!preloadImagePool) {
                preloadImagePool = instance._preloadImagePool = {};

                instance._clearPreloadImageTask = A.debounce(instance._clearPreloadImageFn, 50, instance);
            }

            if (!(src in preloadImagePool)) {
                var image = new Image();

                image.onload = instance._clearPreloadImageTask;
                image.src = src;

                preloadImagePool[src] = image;
            }
        },

        /**
         * Renders the controls UI.
         *
         * @method _renderControls
         * @protected
         */
        _renderControls: function() {
            var instance = this;
            var body = A.one('body');

            body.append(
                instance.get('controlLeftEl').hide()
            );

            body.append(
                instance.get('controlRightEl').hide()
            );

            body.append(
                instance.get('closeEl').hide()
            );
        },

        /**
         * Renders the footer UI.
         *
         * @method _renderFooter
         * @protected
         */
        _renderFooter: function() {
            var instance = this;

            var boundingBox = instance.get('boundingBox');

            var docFrag = boundingBox.get('ownerDocument').invoke('createDocumentFragment');

            docFrag.append(
                instance.get('captionEl')
            );
            docFrag.append(
                instance.get('infoEl')
            );

            instance.setStdModContent(
                'footer',
                docFrag
            );
        },

        /**
         * Sync the caption UI.
         *
         * @method _syncCaptionUI
         * @protected
         */
        _syncCaptionUI: function() {
            var instance = this;
            var caption = instance.get('caption');
            var captionEl = instance.get('captionEl');
            var captionFromTitle = instance.get('captionFromTitle');

            if (captionFromTitle) {
                var currentLink = instance.getCurrentLink();

                if (currentLink) {
                    var title = currentLink.attr('title');

                    if (title) {
                        caption = currentLink.attr('title');
                    }
                }
            }

            captionEl.html(caption);
        },

        /**
         * Sync the controls UI.
         *
         * @method _syncControlsUI
         * @protected
         */
        _syncControlsUI: function() {
            var instance = this;
            var controlLeftEl = instance.get('controlLeftEl');
            var controlRightEl = instance.get('controlRightEl');
            var closeEl = instance.get('closeEl');

            if (instance.get('visible')) {
                if (instance.get('showControls')) {
                    // show or hide controls based on the hasPrev/hasNext
                    // information
                    controlLeftEl[instance.hasPrev() ? 'show' : 'hide']();
                    controlRightEl[instance.hasNext() ? 'show' : 'hide']();

                    closeEl.show();
                }
            }
            else {
                // if the overlay is not visible hide all controls
                instance.hideControls();
            }
        },

        /**
         * Sync the `A.ImageViewer` UI.
         *
         * @method _syncImageViewerUI
         * @protected
         */
        _syncImageViewerUI: function() {
            var instance = this;

            instance._syncControlsUI();
            instance._syncCaptionUI();
            instance._syncInfoUI();
        },

        /**
         * Sync the info UI.
         *
         * @method _syncInfoUI
         * @protected
         */
        _syncInfoUI: function() {
            var instance = this;
            var infoEl = instance.get('infoEl');

            infoEl.html(
                instance.get('infoTemplate')
            );
        },

        /**
         * Calculates the resize ratio for the loaded image.
         *
         * @method _getRatio
         * @param {Number} width Image width
         * @param {Number} height Image height
         * @protected
         * @return {Number}
         */
        _getRatio: function(width, height) {
            var instance = this;

            var ratio = 1;
            var maxHeight = instance.get('maxHeight');
            var maxWidth = instance.get('maxWidth');

            if ((height > maxHeight) || (width > maxWidth)) {
                var hRatio = (height / maxHeight);
                var wRatio = (width / maxWidth);

                ratio = Math.max(hRatio, wRatio);
            }

            return ratio;
        },

        /**
         * Gets the [info](A.ImageViewer.html#attr_info) template.
         *
         * @method _getInfoTemplate
         * @param {String} v template
         * @protected
         * @return {String} Parsed string.
         */
        _getInfoTemplate: function(v) {
            var instance = this;
            var total = instance.get('totalLinks');
            var current = instance.get('currentIndex') + 1;

            return L.sub(v, {
                current: current,
                total: total
            });
        },

        /**
         * Displays the image once it's been loaded.
         *
         * @method _displayLoadedImage
         * @param {Node} image The loaded image
         * @protected
         */
        _displayLoadedImage: function(image) {
            var instance = this;

            instance._uiSetImageSize(image);

            instance.setStdModContent('body', image);

            instance.set('loading', false);

            instance._syncImageViewerUI();

            // invoke WidgetPosition _setAlignCenter to force center alignment
            instance._setAlignCenter(true);

            instance.fire('load', {
                image: image
            });

            if (instance.get('preloadNeighborImages')) {
                // preload neighbor images
                var currentIndex = instance.get('currentIndex');

                instance.preloadImage(currentIndex + 1);
                instance.preloadImage(currentIndex - 1);
            }
        },

        /**
         * Fires after the `A.ImageViewer` render phase.
         *
         * @method _afterRender
         * @protected
         */
        _afterRender: function() {
            var instance = this;
            var bodyNode = instance.bodyNode;
            var boundingBox = instance.get('boundingBox');

            bodyNode.addClass(CSS_IMAGE_VIEWER_BD);
            boundingBox.addClass(CSS_WELL);

            if (instance.get('preloadAllImages')) {
                instance.preloadAllImages();
            }
        },

        /**
         * Fires after the value of the
         * [loading](A.ImageViewer.html#attr_loading) attribute change.
         *
         * @method _afterLoadingChange
         * @param {EventFacade} event
         * @protected
         */
        _afterLoadingChange: function(event) {
            var instance = this;
            var boundingBox = instance.get('boundingBox');

            if (event.newVal) {
                boundingBox.addClass(CSS_IMAGE_VIEWER_LOADING);

                instance.showLoading();
            }
            else {
                boundingBox.removeClass(CSS_IMAGE_VIEWER_LOADING);
            }
        },

        /**
         * Fires after the value of the
         * [visible](A.ImageViewer.html#attr_visible) attribute change.
         *
         * @method _afterVisibleChange
         * @param {EventFacade} event
         * @protected
         */
        _afterVisibleChange: function() {
            var instance = this;

            instance._syncControlsUI();
        },

        /**
         * Fires the click event on the close icon.
         *
         * @method _onClickCloseEl
         * @param {EventFacade} event Click event facade
         * @protected
         */
        _onClickCloseEl: function(event) {
            var instance = this;

            instance.close();

            event.halt();
        },

        /**
         * Fires the click event on the left control icon.
         *
         * @method _onClickLeftControl
         * @param {EventFacade} event Click event facade
         * @protected
         */
        _onClickLeftControl: function(event) {
            var instance = this;

            instance.prev();

            event.halt();
        },

        /**
         * Fires the click event on the right control icon.
         *
         * @method _onClickRightControl
         * @param {EventFacade} event Click event facade
         * @protected
         */
        _onClickRightControl: function(event) {
            var instance = this;

            instance.next();

            event.halt();
        },

        /**
         * Fires the click event on the links.
         *
         * @method _onClickLinks
         * @param {EventFacade} event Click event facade
         * @protected
         */
        _onClickLinks: function(event) {
            var instance = this;
            var target = event.currentTarget;

            // set the current currentIndex of the clicked image
            instance.set(
                'currentIndex',
                instance.get('links').indexOf(target)
            );

            instance.show();

            event.preventDefault();
        },

        /**
         * Handles the key interaction (i.e., next, prev etc).
         *
         * @method _onKeyInteraction
         * @param {EventFacade} event Click event facade
         * @protected
         */
        _onKeyInteraction: function(event) {
            var instance = this;

            if (!instance.get('visible')) {
                return false; // NOTE: return
            }

            if (event.isKey('LEFT')) {
                instance.prev();
            }
            else if (event.isKey('RIGHT')) {
                instance.next();
            }
            else if (event.isKey('ESC')) {
                instance.close();
            }
        },

        /**
         * Fires on a image load.
         *
         * @method _onLoadImage
         * @param {EventFacade} event
         * @protected
         */
        _onLoadImage: function(event) {
            var instance = this;
            var image = event.currentTarget;

            instance._displayLoadedImage(image);

            var imageAnim = instance.get('imageAnim');

            if (instance.get('anim')) {
                image.setStyle('opacity', 0);

                if (!image.fx) {
                    image.plug(NodeFx, imageAnim);
                }

                image.fx.on('end', function(info) {
                    instance.fire('anim', {
                        anim: info,
                        image: image
                    });
                });

                image.fx.stop().run();
            }
        },

        /**
         * Sets the size of the image and the overlay respecting the
         * maxHeight/maxWidth ratio.
         *
         * @method _uiSetImageSize
         * @param {HTMLImage} image Image
         * @protected
         */
        _uiSetImageSize: function(image) {
            var instance = this;
            var bodyNode = instance.bodyNode;
            var footerNode = instance.footerNode;
            var imageRegion = image.get('region');

            var ratio = instance._getRatio(
                imageRegion.width,
                imageRegion.height
            );

            var height = (imageRegion.height / ratio);
            var width = (imageRegion.width / ratio);

            image.set('offsetHeight', height);
            image.set('offsetWidth', width);

            footerNode.setStyle('width', width + 'px');

            bodyNode.setStyles({
                height: height + 'px',
                width: width + 'px'
            });
        }
    },

    {
        /**
         * Static property provides a string to identify the class.
         *
         * @property NAME
         * @type String
         * @static
         */
        NAME: 'image-viewer',

        /**
         * Static property provides a string to identify the CSS prefix.
         *
         * @property CSS_PREFIX
         * @type String
         * @static
         */
        CSS_PREFIX: getCN('image-viewer'),

        /**
         * Static property used to define the default attribute
         * configuration for the `A.ImageViewer`.
         *
         * @property ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             * If `true` the navigation is animated.
             *
             * @attribute anim
             * @default true
             * @type Boolean
             */
            anim: {
                value: true,
                validator: isBoolean
            },

            /**
             * The content of body.
             *
             * @attribute bodyContent
             * @type String
             */
            bodyContent: {
                value: NODE_BLANK_TEXT
            },

            /**
             * The caption of the displayed image.
             *
             * @attribute caption
             * @default ''
             * @type String
             */
            caption: {
                value: 'blank',
                validator: isString
            },

            /**
             * If `true` the [caption](A.ImageViewer.html#attr_caption) will be
             * pulled from the title DOM attribute.
             *
             * @attribute captionFromTitle
             * @default true
             * @type Boolean
             */
            captionFromTitle: {
                value: true,
                validator: isBoolean
            },

            /**
             * If `true` the Overlay with the image will be positioned
             * on the center of the viewport.
             *
             * @attribute centered
             * @default true
             * @type Boolean
             */
            centered: {
                value: true
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
                validator: isNumber
            },

            /**
             * Image node element used to load the images.
             *
             * @attribute image
             * @default Generated img element.
             * @readOnly
             * @type Node
             */
            image: {
                readOnly: true,
                valueFn: function() {
                    return A.Node.create(TPL_IMAGE);
                }
            },

            /**
             * Configuration attributes passed to the [Anim](Anim.html) class.
             *
             * @attribute imageAnim
             * @default Predefined [Anim](Anim.html) configuration.
             * @type Object
             */
            imageAnim: {
                value: {},
                setter: function(value) {
                    return A.merge({
                            to: {
                                opacity: 1
                            },
                            duration: 0.8
                        },
                        value
                    );
                },
                validator: isObject
            },

            /**
             * String template used to display the information.
             *
             * @attribute infoTemplate
             * @default 'Image {current} of {total}'
             * @type String
             */
            infoTemplate: {
                getter: function(v) {
                    return this._getInfoTemplate(v);
                },
                value: INFO_LABEL_TEMPLATE,
                validator: isString
            },

            /**
             * Selector or NodeList containing the links where the
             * `A.ImageViewer` extracts the information to generate the
             * thumbnails.
             *
             * @attribute links
             * @type String | NodeList
             */
            links: {
                setter: function(v) {
                    if (isNodeList(v)) {
                        return v;
                    }
                    else if (isString(v)) {
                        return A.all(v);
                    }

                    return new A.NodeList([v]);
                }
            },

            /**
             * Whether the image is during a loading state.
             *
             * @attribute loading
             * @default false
             * @type Boolean
             */
            loading: {
                value: false,
                validator: isBoolean
            },

            /**
             * Displays the modal the viewport. Set to `false` to disable.
             *
             * @attribute modal
             * @default true
             * @type Boolean
             */
            modal: {
                value: true
            },

            /**
             * Preloads all images grabbed from the
             * [links](A.ImageViewer.html#attr_links) attribute.
             *
             * @attribute preloadAllImages
             * @default false
             * @type Boolean
             */
            preloadAllImages: {
                value: false,
                validator: isBoolean
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
                validator: isBoolean
            },

            /**
             * Shows close icon control.
             *
             * @attribute showClose
             * @default true
             * @type Boolean
             */
            showClose: {
                value: true,
                validator: isBoolean
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
                validator: isBoolean
            },

            /**
             * Specify the tab order of elements.
             *
             * @attribute tabIndex
             * @default null
             * @type Number
             */
            tabIndex: {
                value: null
            },

            /**
             * Helper attribute to get the `size` of the
             * [links](A.ImageViewer.html#attr_links) NodeList.
             *
             * @attribute totalLinks
             * @default true
             * @readOnly
             * @type Boolean
             */
            totalLinks: {
                readOnly: true,
                getter: function() {
                    return this.get('links').size();
                }
            },

            /**
             * Determines if the `A.ImageViewer` should be visible or not.
             *
             * @attribute visible
             * @default false
             * @type Boolean
             */
            visible: {
                value: false
            },

            /**
             * Specify the stack order of elements.
             *
             * @attribute zIndex
             * @default 3000
             * @type Number
             */
            zIndex: {
                value: 3000,
                validator: isNumber
            },

            /**
             * The element to be used as left control.
             *
             * @attribute controlLeftEl
             * @default Generated HTML div element.
             * @readOnly
             * @type Node
             */
            controlLeftEl: {
                readOnly: true,
                valueFn: function() {
                    return A.Node.create(TPL_CONTROL_LEFT);
                }
            },

            /**
             * The element to be used as right control.
             *
             * @attribute controlRightEl
             * @default Generated HTML div element.
             * @readOnly
             * @type Node
             */
            controlRightEl: {
                readOnly: true,
                valueFn: function() {
                    return A.Node.create(TPL_CONTROL_RIGHT);
                }
            },

            /**
             * The element to be used as caption.
             *
             * @attribute captionEl
             * @default Generated HTML div element.
             * @readOnly
             * @type Node
             */
            captionEl: {
                readOnly: true,
                valueFn: function() {
                    return A.Node.create(TPL_CAPTION);
                }
            },

            /**
             * The element to be used as close.
             *
             * @attribute closeEl
             * @default Generated HTML div element.
             * @readOnly
             * @type Node
             */
            closeEl: {
                readOnly: true,
                valueFn: function() {
                    return A.Node.create(TPL_CLOSE);
                }
            },

            /**
             * The element to be used as info.
             *
             * @attribute infoEl
             * @default Generated HTML div element.
             * @readOnly
             * @type Node
             */
            infoEl: {
                readOnly: true,
                valueFn: function() {
                    return A.Node.create(TPL_INFO);
                }
            },

            /**
             * HTML element to contain the `img` which is being loaded.
             *
             * @attribute loader
             * @default Generated HTML div element.
             * @type Node
             */
            loader: {
                readOnly: true,
                valueFn: function() {
                    return A.Node.create(TPL_LOADER).appendTo(DOC.body);
                }
            },

            /**
             * The element to be used as loading.
             *
             * @attribute loadingEl
             * @default Generated HTML div element.
             * @type Node
             */
            loadingEl: {
                valueFn: function() {
                    return A.Node.create(TPL_LOADING);
                }
            },

            /**
             * The maximum height of the element.
             *
             * @attribute maxHeight
             * @default Infinity
             * @type Number
             */
            maxHeight: {
                value: Infinity,
                validator: isNumber
            },

            /**
             * The maximum width of the element.
             *
             * @attribute maxWidth
             * @default Infinity
             * @type Number
             */
            maxWidth: {
                value: Infinity,
                validator: isNumber
            }
        }
    }
);

A.ImageViewer = ImageViewer;
