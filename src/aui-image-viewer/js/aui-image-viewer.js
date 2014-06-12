/**
 * The ImageViewer Utility
 *
 * @module aui-image-viewer
 */

var CSS_CAPTION = A.getClassName('image', 'viewer', 'caption'),
    CSS_CLOSE = A.getClassName('image', 'viewer', 'close'),
    CSS_CONTROL = A.getClassName('image', 'viewer', 'base', 'control'),
    CSS_CONTROL_LEFT = A.getClassName('image', 'viewer', 'base', 'control', 'left'),
    CSS_CONTROL_RIGHT = A.getClassName('image', 'viewer', 'base', 'control', 'right'),
    CSS_INFO = A.getClassName('image', 'viewer', 'info'),
    CSS_WELL = A.getClassName('well');

/**
 * A class for `A.ImageViewer`, providing:
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
    A.ImageViewerBase, [
        A.WidgetCssClass,
        A.WidgetStdMod,
        A.WidgetToggle,
        A.WidgetPosition,
        A.WidgetStack,
        A.WidgetPositionAlign,
        A.WidgetPositionConstrain,
        A.WidgetModality
    ], {
        TPL_CAPTION: '<h4 class="' + CSS_CAPTION + '"></h4>',
        TPL_CLOSE: '<button class="close ' + CSS_CONTROL + ' ' + CSS_CLOSE + '" type="button">' +
            '<span class="glyphicon glyphicon-remove"></span></button>',
        TPL_CONTROL_LEFT: '<a href="#" class="carousel-control left ' +
            CSS_CONTROL + ' ' + CSS_CONTROL_LEFT +
            '"><span class="glyphicon glyphicon-chevron-left"></span></a>',
        TPL_CONTROL_RIGHT: '<a href="#" class="carousel-control right ' +
            CSS_CONTROL + ' ' + CSS_CONTROL_RIGHT +
            '"><span class="glyphicon glyphicon-chevron-right"></span></a>',
        TPL_INFO: '<h5 class="' + CSS_INFO + '"></h5>',

        /**
         * Create the DOM structure for the `A.ImageViewer`. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            A.ImageViewer.superclass.renderUI.apply(this, arguments);

            this._renderFooter();
        },

        /**
         * Bind the events for the `A.ImageViewer` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            A.ImageViewer.superclass.bindUI.apply(this, arguments);

            this._attachLinkEvent();

            this._eventHandles.push(
                this.after('linksChange', this._afterLinksChange),
                this._closeEl.on('click', A.bind(this.hide, this)),
                A.getDoc().on('keydown', A.bind(this._onKeydown, this)),
                A.after(this._afterFillHeight, this, 'fillHeight')
            );
        },

        /**
         * Destructor lifecycle implementation for the `A.ImageViewer` class.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            this._detachLinkEvent();

            this._controlLeftEl.remove(true);
            this._controlRightEl.remove(true);
            this._closeEl.remove(true);
        },

        /**
         * Gets the `Node` reference to the `index` element from the
         * [links](A.ImageViewer.html#attr_links).
         *
         * @method getLink
         * @param index
         * @return {Node}
         */
        getLink: function(index) {
            return this.get('links').item(index);
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
            this._attachLinkEvent();
        },

        /**
         * Fired after the `responsive` event.
         *
         * @method _afterResponsive
         * @protected
         */
        _afterResponsive: function() {
            A.ImageViewer.superclass._afterResponsive.apply(this, arguments);

            this.footerNode.setStyle('width', '');

            this.bodyNode.setStyles({
                height: '',
                lineHeight: ''
            });
            this._fillHeight();

            this._setAlignCenter(true);
        },

        /**
         * Shows the `A.ImageViewer` UI.
         *
         * @method _afterUISetVisible
         * @protected
         */
        _afterUISetVisible: function() {
            A.ImageViewer.superclass._afterUISetVisible.apply(this, arguments);

            if (this.get('visible')) {
                this._fillHeight();

                this._closeEl.show();
            }
            else {
                this._closeEl.hide();
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
         * Binds the events related to the viewer's controls.
         *
         * @method _bindControls
         * @protected
         */
        _bindControls: function() {
            this._eventHandles.push(
                this._controlLeftEl.after('click', A.bind(this._onClickControl, this)),
                this._controlRightEl.after('click', A.bind(this._onClickControl, this))
            );
        },

        /**
         * Detaches the click event for the image links, if one was attached
         * earlier.
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
         * Gets the [info](A.ImageViewer.html#attr_info) template.
         *
         * @method _getInfoTemplate
         * @param {String} v template
         * @return {String} Parsed string.
         */
        _getInfoTemplate: function(val) {
            return A.Lang.sub(val, {
                current: this.get('currentIndex') + 1,
                total: this.get('links').size()
            });
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
            A.ImageViewer.superclass._onResponsive.apply(this, arguments);

            this.footerNode.setStyle('width', 0);
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
            body.append(this._controlLeftEl);

            this._controlRightEl = A.Node.create(this.TPL_CONTROL_RIGHT);
            body.append(this._controlRightEl);

            this._closeEl = A.Node.create(this.TPL_CLOSE);
            body.append(this._closeEl);
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
            this._captionEl.selectable();
            container.append(this._captionEl);

            this._infoEl = A.Node.create(this.TPL_INFO);
            this._infoEl.selectable();
            container.append(this._infoEl);

            this.setStdModContent('footer', container);
        },

        /**
         * Overrides this method from ImageViewerBase so that the image list will
         * be rendered inside the body node, instead of directly in the content box.
         *
         * @method _renderImageListNode
         * @protected
         */
        _renderImageListNode: function() {
            var list = A.Node.create(this.TPL_IMAGE_LIST);
            this.setStdModContent('body', list);

            return list.one('.image-viewer-base-image-list-inner');
        },

        /**
         * Sets `links` attribute.
         *
         * @method _setLinks
         * @param {String | NodeList} val
         * @protected
         */
        _setLinks: function(val) {
            var links,
                sources = [];

            if (val instanceof A.NodeList) {
                links = val;
            }
            else if (A.Lang.isString(val)) {
                links = A.all(val);
            }
            else {
                links = new A.NodeList([val]);
            }

            if (links.size() > 0) {
                links.each(function() {
                    sources.push(this.getAttribute('href'));
                });
                this.set('sources', sources);
            }

            return links;
        },

        /**
         * Loads the image specified at `currentIndex` and shows it.
         *
         * @method _showCurrentImage
         * @protected
         */
        _showCurrentImage: function() {
            A.ImageViewer.superclass._showCurrentImage.apply(this, arguments);

            this._syncCaptionUI();
            this._syncInfoUI();
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
         * Static property used to define the default attribute configuration
         * for the `A.ImageViewer`.
         *
         * @property ATTRS
         * @type {Object}
         * @static
         */
        ATTRS: {
            /**
             * The caption of the displayed image.
             *
             * @attribute caption
             * @default 'blank'
             * @type {String}
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
             * @type {Boolean}
             */
            captionFromTitle: {
                value: true,
                validator: A.Lang.isBoolean
            },

            /**
             * If `true` the Overlay with the image will be positioned on the
             * center of the viewport.
             *
             * @attribute centered
             * @default true
             * @type {Boolean}
             */
            centered: {
                value: true
            },

            /**
             * The CSS class to be added to the bounding box.
             *
             * @attribute cssClass
             * @default 'well'
             * @type {String}
             */
            cssClass: {
                value: CSS_WELL
            },

            /**
             * String template used to display the information.
             *
             * @attribute infoTemplate
             * @default 'Image {current} of {total}'
             * @type {String}
             */
            infoTemplate: {
                getter: '_getInfoTemplate',
                value: 'Image {current} of {total}',
                validator: A.Lang.isString
            },

            /**
             * Selector or NodeList containing the links where the
             * `A.ImageViewer` extracts the information to generate the
             * thumbnails.
             *
             * @attribute links
             * @type {String | NodeList}
             */
            links: {
                lazyAdd: false,
                setter: '_setLinks'
            },

            /**
             * Displays a mask behind the viewer. Set to `false` to disable.
             *
             * @attribute modal
             * @default true
             * @type {Boolean}
             */
            modal: {
                value: true
            },

            /**
             * Determines if the `A.ImageViewer` should be visible or not.
             *
             * @attribute visible
             * @default false
             * @type {Boolean}
             */
            visible: {
                value: false
            }
        },

        /**
         * Static property provides a string to identify the CSS prefix.
         *
         * @property CSS_PREFIX
         * @type {String}
         * @static
         */
        CSS_PREFIX: A.getClassName('image-viewer')
    }
);
