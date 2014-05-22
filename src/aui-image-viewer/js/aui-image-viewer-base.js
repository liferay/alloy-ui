/**
 * The ImageViewer Utility
 *
 * @module aui-image-viewer
 * @submodule aui-image-viewer-base
 */

var CSS_CAPTION = A.getClassName('image', 'viewer', 'caption'),
    CSS_CLOSE = A.getClassName('image', 'viewer', 'close'),
    CSS_CONTROL = A.getClassName('image', 'viewer', 'control'),
    CSS_CURRENT_IMAGE = A.getClassName('image', 'viewer', 'current', 'image'),
    CSS_IMAGE = A.getClassName('image', 'viewer', 'image'),
    CSS_IMAGE_CONTAINER = A.getClassName('image', 'viewer', 'image', 'container'),
    CSS_IMAGE_LIST = A.getClassName('image', 'viewer', 'image', 'list'),
    CSS_INFO = A.getClassName('image', 'viewer', 'info'),
    CSS_LOADING = A.getClassName('image', 'viewer', 'loading'),
    CSS_LOADING_ICON = A.getClassName('image', 'viewer', 'loading', 'icon'),
    CSS_WELL = A.getClassName('well'),

    EVENT_LOAD = 'load',

    INFO_LABEL_TEMPLATE = 'Image {current} of {total}';

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
 */

A.ImageViewer = A.Base.create(
    'image-viewer',
    A.Widget, [
        A.WidgetCssClass,
        A.WidgetStdMod,
        A.WidgetToggle,
        A.WidgetPosition,
        A.WidgetStack,
        A.WidgetPositionAlign,
        A.WidgetPositionConstrain,
        A.WidgetResponsive,
        A.WidgetModality
    ], {
        TPL_CAPTION: '<h4 class="' + CSS_CAPTION + '"></h4>',
        TPL_CLOSE: '<button class="close ' + CSS_CLOSE + '" type="button">' +
            '<span class="glyphicon glyphicon-remove"></span></button>',
        TPL_CONTROL_LEFT: '<a href="#" class="carousel-control left ' + CSS_CONTROL +
            '"><span class="glyphicon glyphicon-chevron-left"></span></a>',
        TPL_CONTROL_RIGHT: '<a href="#" class="carousel-control right ' + CSS_CONTROL +
            '"><span class="glyphicon glyphicon-chevron-right"></span></a>',
        TPL_IMAGE: '<img class="' + CSS_IMAGE + '"></img>',
        TPL_IMAGE_CONTAINER: '<div class="' + CSS_IMAGE_CONTAINER + '">' +
            '<span class="glyphicon glyphicon-time ' + CSS_LOADING_ICON + '"></span></div>',
        TPL_IMAGE_LIST: '<div class="' + CSS_IMAGE_LIST + '"></div>',
        TPL_INFO: '<h5 class="' + CSS_INFO + '"></h5>',

        /**
         * Constructor for the `ImageViewer`. Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            this._eventHandles = [
                this.after('currentIndexChange', this._showCurrentImage),
                this.after('linksChange', this._afterLinksChange),
                this.after('preloadAllImagesChange', this._preloadAll),
                this.after('showControlsChange', this._syncControlsUI),
                this.after('responsive', this._afterResponsive),
                this.on('responsive', this._onResponsive),
                A.after(this._afterFillHeight, this, 'fillHeight'),
                A.after(this._afterUISetVisible, this, '_uiSetVisible')
            ];

            this._imgLoadGroups = [];
        },

        /**
         * Create the DOM structure for the `A.ImageViewer`. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            this._renderImages();
            this._renderControls();
            this._renderFooter();
        },

        /**
         * Bind the events for the `A.ImageViewer` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            this._attachLinkEvent();

            this._eventHandles.push(
                this._controlLeftEl.on('click', A.bind(this.prev, this)),
                this._controlRightEl.on('click', A.bind(this.next, this)),
                this._closeEl.on('click', A.bind(this.hide, this)),
                A.getDoc().on('keydown', A.bind(this._onKeydown, this))
            );
        },

        /**
         * Destructor lifecycle implementation for the `A.ImageViewer` class.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            (new A.EventHandle(this._eventHandles)).detach();

            this._detachLinkEvent();

            this._controlLeftEl.remove(true);
            this._controlRightEl.remove(true);
            this._closeEl.remove(true);
        },

        /**
         * Gets the `Node` reference to the `index` element from
         * the [links](A.ImageViewer.html#attr_links).
         *
         * @method getLink
         * @param index
         * @return {Node}
         */
        getLink: function(index) {
            return this.get('links').item(index);
        },

        /**
         * Checks if there is a next element to navigate.
         *
         * @method hasNext
         * @return {Boolean}
         */
        hasNext: function() {
            return this.get('currentIndex') + 1 < this.get('links').size();
        },

        /**
         * Checks if there is a previous element to navigate.
         *
         * @method hasPrev
         * @return {Boolean}
         */
        hasPrev: function() {
            return this.get('currentIndex') > 0;
        },

        /**
         * Loads the next image.
         *
         * @method next
         */
        next: function() {
            if (this.hasNext()) {
                this.set('currentIndex', this.get('currentIndex') + 1);
            }
        },

        /**
         * Loads the previous image.
         *
         * @method prev
         */
        prev: function() {
            if (this.hasPrev()) {
                this.set('currentIndex', this.get('currentIndex') - 1);
            }
        },

        /**
         * Fired after `fillHeight` function is called. Updates the line-height
         * of the fillHeight node to be equal to its height, so the images can
         * be vertically centered.
         *
         * @method _afterFillHeight
         * @protected
         */
        _afterFillHeight: function() {
            var fillHeightNode = this.getStdModNode(this.get('fillHeight'));

            fillHeightNode.setStyle('lineHeight', fillHeightNode.getStyle('height'));
        },

        /**
         * Fired after the `link` attribute is changed. It will render the
         * referenced images and attach click events to those links.
         *
         * @method _attachLinkEvents
         * @protected
         */
        _afterLinksChange: function() {
            this._renderImages();
            this._attachLinkEvent();
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
                this.footerNode.setStyle('width', '');
                image.setStyles({
                    maxHeight: '100%',
                    maxWidth: '100%'
                });

                this.bodyNode.setStyles({
                    height: '',
                    lineHeight: ''
                });
                this._fillHeight();

                this._setAlignCenter(true);
            }
        },

        /**
         * Shows the `A.ImageViewer` UI.
         *
         * @method _afterUISetVisible
         * @protected
         */
        _afterUISetVisible: function() {
            if (this.get('visible')) {
                this._showCurrentImage();

                this._fillHeight();
            }
            else {
                this._closeEl.hide();
                this._syncControlsUI();
            }
        },

        /**
         * Attaches the click event for the image links.
         *
         * @method _attachLinkEvent
         * @protected
         */
        _attachLinkEvent: function() {
            this._detachLinkEvent();

            this._linkEvent = this.get('links').on(
                'click',
                A.bind(this._onClickLinks, this)
            );
        },

        /**
         * Detaches the click event for the image links, if one
         * was attached earlier.
         *
         * @method _detachLinkEvent
         * @protected
         */
        _detachLinkEvent: function() {
            if (this._linkEvent) {
                this._linkEvent.detach();
                this._linkEvent = null;
            }
        },

        /**
         * Gets the current image container.
         *
         * @method _getCurrentImageContainer
         * @return {Node}
         * @protected
         */
        _getCurrentImageContainer: function() {
            var containers = this.get('contentBox').all('.' + CSS_IMAGE_CONTAINER);
            return containers.item(this.get('currentIndex'));
        },

        /**
         * Gets the current image node.
         *
         * @method _getCurrentImage
         * @return {Node}
         * @protected
         */
        _getCurrentImage: function() {
            var container = this._getCurrentImageContainer();
            return container.one('.' + CSS_IMAGE);
        },

        /**
         * Gets the [info](A.ImageViewer.html#attr_info) template.
         *
         * @method _getInfoTemplate
         * @param {String} v template
         * @return {String} Parsed string.
         */
        _getInfoTemplate: function(v) {
            return A.Lang.sub(v, {
                current: this.get('currentIndex') + 1,
                total: this.get('links').size()
            });
        },

        /**
         * Fires the necessary events to load the requested image.
         *
         * @method _loadImage
         * @param {Number} index The index of the image to load.
         * @protected
         */
        _loadImage: function(index) {
            this.fire(EVENT_LOAD + index);
        },

        /**
         * Fired when the nodes in the `links` attribute are clicked.
         *
         * @method _onClickLinks
         * @param {EventFacade} event
         * @protected
         */
        _onClickLinks: function(event) {
            event.preventDefault();

            this.show();
            this.set(
                'currentIndex',
                this.get('links').indexOf(event.currentTarget)
            );
        },

        /**
         * This should be called when the current image is ready to be
         * displayed.
         *
         * @method _onCurrentImageReady
         * @protected
         */
        _onCurrentImageReady: function() {
            var instance = this,
                image = this._getCurrentImage();

            this.updateDimensionsWithNewRatio();

            if (this.get('anim') && this.get('visible')) {
                image.setStyle('opacity', 0);

                if (!image.fx) {
                    image.plug(A.Plugin.NodeFX, this.get('imageAnim'));

                    image.fx.on('end', function(info) {
                        instance.fire('anim', {
                            anim: info,
                            image: image
                        });
                    });
                }

                image.fx.stop().run();
            }

            this.fire('load', {
                image: image
            });
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
         * Fired when the user presses a key on the keyboard.
         *
         * @method _onKeydown
         * @param {EventFacade} event
         * @protected
         */
        _onKeydown: function(event) {
            if (!this.get('visible')) {
                return false;
            }

            if (event.isKey('LEFT')) {
                this.prev();
            }
            else if (event.isKey('RIGHT')) {
                this.next();
            }
            else if (event.isKey('ESC')) {
                this.hide();
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
                this.footerNode.setStyle('width', 0);
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
            var instance = this;

            if (this.get('preloadAllImages')) {
                this.get('links').each(function(link, index) {
                    instance._loadImage(index);
                });
            }
        },

        /**
         * Renders the viewer controsl (next/prev/close).
         *
         * @method _renderControls
         * @protected
         */
        _renderControls: function() {
            var body = A.one('body');

            this._controlLeftEl = A.Node.create(this.TPL_CONTROL_LEFT);
            body.append(this._controlLeftEl.hide());

            this._controlRightEl = A.Node.create(this.TPL_CONTROL_RIGHT);
            body.append(this._controlRightEl.hide());

            this._closeEl = A.Node.create(this.TPL_CLOSE);
            body.append(this._closeEl.hide());
        },

        /**
         * Renders the footer of the viewer.
         *
         * @method _renderFooter
         * @protected
         */
        _renderFooter: function() {
            var container = A.Node.create('<div></div>');

            this._captionEl = A.Node.create(this.TPL_CAPTION);
            container.append(this._captionEl);

            this._infoEl = A.Node.create(this.TPL_INFO);
            container.append(this._infoEl);

            this.setStdModContent('footer', container);
        },

        /**
         * Renders the image in the given index inside the given container.
         *
         * @method _renderImage
         * @param {Number} index The index of the image to be loaded.
         * @param {Node} container The container where the image should be added.
         * @protected
         */
        _renderImage: function(index, container) {
            var group,
                id,
                image = A.Node.create(this.TPL_IMAGE),
                link = this.get('links').item(index);

            container.prepend(image);

            if (A.UA.ie === 8) {
                // YUI is currently losing the reference to the img node on IE8
                // after creating it, in a way that setting attributes doesn't
                // work on the img unless we find it from the DOM again.
                image = container.one('.' + CSS_IMAGE);
            }

            this._eventHandles.push(image.once('load', A.bind(this._onImageLoad, this, image, index)));
            id = image.generateID();

            group = new A.ImgLoadGroup();
            group.addCustomTrigger(EVENT_LOAD + index, this);
            group.registerImage({
                domId: id,
                srcUrl: link.attr('href')
            });
            this._imgLoadGroups.push(group);
        },

        /**
         * Renders the images inside the viewer.
         *
         * @method _renderImages
         * @protected
         */
        _renderImages: function() {
            var instance = this,
                container,
                list = A.Node.create(this.TPL_IMAGE_LIST);

            this.setStdModContent('body', list);

            this.get('links').each(function(link, index) {
                container = A.Node.create(instance.TPL_IMAGE_CONTAINER);
                container.addClass(CSS_LOADING);
                list.append(container);

                instance._renderImage(index, container);
            });

            this._preloadAll();
        },

        /**
         * Loads the image specified at `currentIndex` and shows it.
         *
         * @method _showCurrentImage
         * @protected
         */
        _showCurrentImage: function() {
            var containers,
                contentBox = this.get('contentBox'),
                currentIndex = this.get('currentIndex'),
                image,
                imageContainer;

            if (!this.get('visible')) {
                return;
            }

            containers = contentBox.all('.' + CSS_IMAGE_CONTAINER);
            containers.removeClass(CSS_CURRENT_IMAGE);

            imageContainer = containers.item(this.get('currentIndex'));
            imageContainer.addClass(CSS_CURRENT_IMAGE);

            this._closeEl.show();
            this._syncControlsUI();
            this._syncCaptionUI();
            this._syncInfoUI();

            this._loadImage(currentIndex);

            image = imageContainer.one('.' + CSS_IMAGE);
            this.fire('request', {
                image: image
            });

            if (this.get('preloadNeighborImages')) {
                if (this.hasPrev()) {
                    this._loadImage(currentIndex - 1);
                }
                if (this.hasNext()) {
                    this._loadImage(currentIndex + 1);
                }
            }

            if (image.getData('loaded')) {
                this._onCurrentImageReady();
            }
        },

        /**
         * Updates the caption.
         *
         * @method _syncCaptionUI
         * @protected
         */
        _syncCaptionUI: function() {
            var caption = this.get('caption'),
                link;

            if (this.get('captionFromTitle')) {
                link = this.get('links').item(this.get('currentIndex'));
                caption = link.attr('title') ? link.attr('title') : caption;
            }

            this._captionEl.set('text', caption);
        },

        /**
         * Updates the controls (next/prev/close), showing or hiding them
         * as necessary.
         *
         * @method _syncControlsUI
         * @protected
         */
        _syncControlsUI: function() {
            if (this.get('visible') && this.get('showControls')) {
                this._controlLeftEl[this.hasPrev() ? 'show' : 'hide']();
                this._controlRightEl[this.hasNext() ? 'show' : 'hide']();
            }
            else {
                this._controlLeftEl.hide();
                this._controlRightEl.hide();
            }
        },

        /**
         * Updates the info node.
         *
         * @method _syncInfoUI
         * @protected
         */
        _syncInfoUI: function() {
            this._infoEl.setHTML(this.get('infoTemplate'));
        }
    }, {
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
                validator: A.Lang.isBoolean
            },

            /**
             * The caption of the displayed image.
             *
             * @attribute caption
             * @default 'blank'
             * @type String
             */
            caption: {
                value: 'blank',
                validator: A.Lang.isString
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
                validator: A.Lang.isBoolean
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
             * The CSS class to be added to the bounding box.
             *
             * @attribute cssClass
             * @default 'well'
             * @type String
             */
            cssClass: {
                value: CSS_WELL
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
                validator: A.Lang.isObject
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
                validator: A.Lang.isString
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
                    if (v instanceof A.NodeList) {
                        return v;
                    }
                    else if (A.Lang.isString(v)) {
                        return A.all(v);
                    }

                    return new A.NodeList([v]);
                }
            },

            /**
             * Displays a mask behind the viewer. Set to `false` to disable.
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
             * Determines if the `A.ImageViewer` should be visible or not.
             *
             * @attribute visible
             * @default false
             * @type Boolean
             */
            visible: {
                value: false
            }
        },

        /**
         * Static property provides a string to identify the CSS prefix.
         *
         * @property CSS_PREFIX
         * @type String
         * @static
         */
        CSS_PREFIX: A.getClassName('image-viewer')
    }
);
