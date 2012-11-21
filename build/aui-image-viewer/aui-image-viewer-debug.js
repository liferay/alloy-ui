AUI.add('aui-image-viewer-base', function(A) {
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

	ANIM = 'anim',
	ARROW = 'arrow',
	ARROW_LEFT_EL = 'arrowLeftEl',
	ARROW_RIGHT_EL = 'arrowRightEl',
	AUTO = 'auto',
	BD = 'bd',
	BLANK = 'blank',
	BODY = 'body',
	BOUNDING_BOX = 'boundingBox',
	CAPTION = 'caption',
	CAPTION_EL = 'captionEl',
	CAPTION_FROM_TITLE = 'captionFromTitle',
	CENTERED = 'centered',
	CLOSE = 'close',
	CLOSE_EL = 'closeEl',
	CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
	CURRENT_INDEX = 'currentIndex',
	EASE_BOTH_STRONG = 'easeBothStrong',
	FOOTER = 'footer',
	HELPER = 'helper',
	HIDDEN = 'hidden',
	HIDE = 'hide',
	HREF = 'href',
	ICON = 'icon',
	IMAGE = 'image',
	IMAGE_ANIM = 'imageAnim',
	IMAGE_VIEWER = 'image-viewer',
	INFO = 'info',
	INFO_EL = 'infoEl',
	INFO_TEMPLATE = 'infoTemplate',
	LEFT = 'left',
	LINK = 'link',
	LINKS = 'links',
	LOADER = 'loader',
	LOADING = 'loading',
	LOADING_EL = 'loadingEl',
	LOCK = 'lock',
	MAX_HEIGHT = 'maxHeight',
	MAX_WIDTH = 'maxWidth',
	MODAL = 'modal',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OPACITY = 'opacity',
	OVERLAY = 'overlay',
	PRELOAD_ALL_IMAGES = 'preloadAllImages',
	PRELOAD_NEIGHBOR_IMAGES = 'preloadNeighborImages',
	PX = 'px',
	REGION = 'region',
	RIGHT = 'right',
	SCROLL = 'scroll',
	SHOW = 'show',
	SHOW_ARROWS = 'showArrows',
	SHOW_CLOSE = 'showClose',
	SPACE = ' ',
	SRC = 'src',
	TITLE = 'title',
	TOP = 'top',
	TOTAL_LINKS = 'totalLinks',
	VIEWPORT_REGION = 'viewportRegion',
	VISIBLE = 'visible',
    OWNER_DOCUMENT = 'ownerDocument',

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	getCN = A.getClassName,

	CSS_HELPER_SCROLL_LOCK = getCN(HELPER, SCROLL, LOCK),
	CSS_ICON_LOADING = getCN(ICON, LOADING),
	CSS_IMAGE_VIEWER_ARROW = getCN(IMAGE_VIEWER, ARROW),
	CSS_IMAGE_VIEWER_ARROW_LEFT = getCN(IMAGE_VIEWER, ARROW, LEFT),
	CSS_IMAGE_VIEWER_ARROW_RIGHT = getCN(IMAGE_VIEWER, ARROW, RIGHT),
	CSS_IMAGE_VIEWER_BD = getCN(IMAGE_VIEWER, BD),
	CSS_IMAGE_VIEWER_CAPTION = getCN(IMAGE_VIEWER, CAPTION),
	CSS_IMAGE_VIEWER_CLOSE = getCN(IMAGE_VIEWER, CLOSE),
	CSS_IMAGE_VIEWER_IMAGE = getCN(IMAGE_VIEWER, IMAGE),
	CSS_IMAGE_VIEWER_INFO = getCN(IMAGE_VIEWER, INFO),
	CSS_IMAGE_VIEWER_LINK = getCN(IMAGE_VIEWER, LINK),
	CSS_IMAGE_VIEWER_LOADING = getCN(IMAGE_VIEWER, LOADING),
	CSS_OVERLAY_HIDDEN = getCN(OVERLAY, HIDDEN),

	KEY_ESC = 'ESC',
	KEY_RIGHT = 'RIGHT',
	KEY_LEFT = 'LEFT',

	MAP_RESET_DIMENSIONS = {
		height: AUTO,
		width: AUTO
	},

	NODE_BLANK_TEXT = DOC.createTextNode(''),

	INFO_LABEL_TEMPLATE = 'Image {current} of {total}',

	TPL_ARROW_LEFT = '<a href="#" class="'+concat(CSS_IMAGE_VIEWER_ARROW, CSS_IMAGE_VIEWER_ARROW_LEFT)+'"></a>',
	TPL_ARROW_RIGHT = '<a href="#" class="'+concat(CSS_IMAGE_VIEWER_ARROW, CSS_IMAGE_VIEWER_ARROW_RIGHT)+'"></a>',
	TPL_CAPTION = '<div class="' + CSS_IMAGE_VIEWER_CAPTION + '"></div>',
	TPL_CLOSE = '<a href="#" class="'+ CSS_IMAGE_VIEWER_CLOSE +'"></a>',
	TPL_IMAGE = '<img class="' + CSS_IMAGE_VIEWER_IMAGE + '" />',
	TPL_INFO = '<div class="' + CSS_IMAGE_VIEWER_INFO + '"></div>',
	TPL_LOADER = '<div class="' + CSS_OVERLAY_HIDDEN + '"></div>',
	TPL_LOADING = '<div class="' + CSS_ICON_LOADING + '"></div>';

/**
 * <p><img src="assets/images/aui-image-viewer-base/main.png"/></p>
 *
 * A base class for ImageViewer, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Displays an image in a Overlay</li>
 *    <li>Keyboard navigation support</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.ImageViewer({
 *   links: '#gallery1 a',
 *   caption: 'Liferay Champion Soccer',
 *   captionFromTitle: true,
 *   preloadNeighborImages: true,
 *   preloadAllImages: true,
 *   showInfo: true
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="ImageViewer.html#configattributes">Configuration Attributes</a> available for
 * ImageViewer.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class ImageViewer
 * @constructor
 * @extends OverlayBase
 */
var ImageViewer = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property ImageViewer.NAME
		 * @type String
		 * @static
		 */
		NAME: IMAGE_VIEWER,

		/**
		 * Static property used to define the default attribute
		 * configuration for the ImageViewer.
		 *
		 * @property ImageViewer.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * If <code>true</code> the navigation is animated.
			 *
			 * @attribute anim
			 * @default true
			 * @type boolean
			 */
			anim: {
				value: true,
				validator: isBoolean
			},

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
				value: BLANK,
				validator: isString
			},

			/**
			 * If <code>true</code> the <a
	         * href="ImageViewer.html#config_caption">caption</a> will be pulled
	         * from the title DOM attribute.
			 *
			 * @attribute captionFromTitle
			 * @default true
			 * @type boolean
			 */
			captionFromTitle: {
				value: true,
				validator: isBoolean
			},

			/**
			 * If <code>true</code> the Overlay with the image will be positioned
	         * on the center of the viewport.
			 *
			 * @attribute centered
			 * @default true
			 * @type boolean
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
			 * Configuration attributes passed to the <a href="Anim.html">Anim</a>
	         * class.
			 *
			 * @attribute imageAnim
			 * @default Predefined <a href="Anim.html">Anim</a> configuration.
			 * @type Object
			 */
			imageAnim: {
				value: {},
				setter: function(value) {
					return A.merge(
						{
							to: {
								opacity: 1
							},
							easing: EASE_BOTH_STRONG,
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
			 * Selector or NodeList containing the links where the ImageViewer
	         * extracts the information to generate the thumbnails.
			 *
			 * @attribute links
			 * @type String | NodeList
			 */
			links: {
				setter: function(v) {
					var instance = this;

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
			 * @type boolean
			 */
			loading: {
				value: false,
				validator: isBoolean
			},

			/**
			 * Displays the modal <a href="OverlayMask.html">OverlayMask</a> on
	         * the viewport. Set to <code>false</code> to disable.
			 *
			 * @attribute modal
			 * @default { opacity: .8, background: '#000' }
			 * @type boolean | Object
			 */
			modal: {
				value: {
					opacity: 0.8,
					background: '#000'
				}
			},

			/**
			 * Preload all images grabbed from the <a
	         * href="ImageViewer.html#config_links">links</a> attribute.
			 *
			 * @attribute preloadAllImages
			 * @default false
			 * @type boolean
			 */
			preloadAllImages: {
				value: false,
				validator: isBoolean
			},

			/**
			 * Preload the neighbor image (i.e., the previous and next image based
	         * on the current load one).
			 *
			 * @attribute preloadAllImages
			 * @default false
			 * @type boolean
			 */
			preloadNeighborImages: {
				value: true,
				validator: isBoolean
			},

			/**
			 * Show close icon control.
			 *
			 * @attribute showClose
			 * @default true
			 * @type boolean
			 */
			showClose: {
				value: true,
				validator: isBoolean
			},

			/**
			 * Show the arrow controls.
			 *
			 * @attribute showArrows
			 * @default true
			 * @type boolean
			 */
			showArrows: {
				value: true,
				validator: isBoolean
			},

			/**
			 * Helper attribute to get the <code>size</code> of the <a
	         * href="ImageViewer.html#config_links">links</a> NodeList.
			 *
			 * @attribute totalLinks
			 * @default true
			 * @readOnly
			 * @type boolean
			 */
			totalLinks: {
				readOnly: true,
				getter: function(v) {
					return this.get(LINKS).size();
				}
			},

			visible: {
				value: false
			},

			zIndex: {
				value: 3000,
				validator: isNumber
			},

			/**
			 * The element to be used as arrow left.
			 *
			 * @attribute arrowLeftEl
			 * @default Generated HTML div element.
			 * @readOnly
			 * @type Node
			 */
			arrowLeftEl: {
				readOnly: true,
				valueFn: function() {
					return A.Node.create(TPL_ARROW_LEFT);
				}
			},

			/**
			 * The element to be used as arrow right.
			 *
			 * @attribute arrowRightEl
			 * @default Generated HTML div element.
			 * @readOnly
			 * @type Node
			 */
			arrowRightEl: {
				readOnly: true,
				valueFn: function() {
					return A.Node.create(TPL_ARROW_RIGHT);
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
			 * HTML element to house the <code>img</code> which is being loaded.
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
	         * The maximum height of the element
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
	         * The maximum width of the element
	         *
	         * @attribute maxWidth
	         * @default Infinity
	         * @type Number
	         */
			maxWidth: {
				value: Infinity,
				validator: isNumber
			}
		},

		EXTENDS: A.OverlayBase,

		prototype: {
			/**
			 * Handler for the key events.
			 *
			 * @property _keyHandler
			 * @type EventHandler
			 * @protected
			 */
			_keyHandler: null,

			/**
			 * Create the DOM structure for the ImageViewer. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				var instance = this;

				instance._renderControls();
				instance._renderFooter();

				instance.get(LINKS).addClass(CSS_IMAGE_VIEWER_LINK);
			},

			/**
			 * Bind the events on the ImageViewer UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;
				var links = instance.get(LINKS);
				var arrowLeftEl = instance.get(ARROW_LEFT_EL);
				var arrowRightEl = instance.get(ARROW_RIGHT_EL);
				var closeEl = instance.get(CLOSE_EL);

				arrowLeftEl.on('click', A.bind(instance._onClickLeftArrow, instance));
				arrowRightEl.on('click', A.bind(instance._onClickRightArrow, instance));
				closeEl.on('click', A.bind(instance._onClickCloseEl, instance));
				links.on('click', A.bind(instance._onClickLinks, instance));

				instance._keyHandler = A.bind(instance._onKeyInteraction, instance);

				// NOTE: using keydown to avoid keyCode bug on IE
				A.getDoc().on('keydown', instance._keyHandler);

				instance.after('render', instance._afterRender);
				instance.after('loadingChange', instance._afterLoadingChange);
				instance.after('visibleChange', instance._afterVisibleChange);

				/**
				 * Handles the load event. Fired when a image is laoded.
				 *
				 * @event load
				 * @param {Event.Facade} event The load event.
				 * @type {Event.Custom}
				 */

				/**
				 * Handles the request event. Fired when a image is requested.
				 *
				 * @event request
				 * @param {Event.Facade} event The load event.
				 * @type {Event.Custom}
				 */

				/**
				 * Handles the anim event. Fired when the image anim ends.
				 *
				 * @event anim
				 * @param {Event.Facade} event The load event.
				 * @type {Event.Custom}
				 */
			},

			/**
			 * Descructor lifecycle implementation for the ImageViewer class.
			 * Purges events attached to the node (and all child nodes).
			 *
			 * @method destructor
			 * @protected
			 */
			destructor: function() {
				var instance = this;

				var links = instance.get(LINKS);

				instance.close();

				links.detach('click');
				links.removeClass(CSS_IMAGE_VIEWER_LINK);

				// detach key global listener from the document
				A.getDoc().detach('keydown', instance._keyHandler);

				instance.get(ARROW_LEFT_EL).remove(true);
				instance.get(ARROW_RIGHT_EL).remove(true);
				instance.get(CLOSE_EL).remove(true);
				instance.get(LOADER).remove(true);
			},

			/**
			 * Close the ImageViewer.
			 *
			 * @method close
			 */
			close: function() {
				var instance = this;

				instance.hide();
				instance.hideMask();
			},

			/**
			 * Get the Node reference to the <code>currentIndex</code> element from
		     * the <a href="ImageViewer.html#config_links">links</a>.
			 *
			 * @method getLink
			 * @param {Number} currentIndex
			 * @return {Node}
			 */
			getLink: function(currentIndex) {
				var instance = this;

				return instance.get(LINKS).item(currentIndex);
			},

			/**
			 * Get the current loaded node link reference.
			 *
			 * @method getCurrentLink
			 * @return {Node}
			 */
			getCurrentLink: function() {
				var instance = this;

				return instance.getLink(
					instance.get(CURRENT_INDEX)
				);
			},

			/**
			 * Load an image <code>src</code> on the ImageViewer.
			 *
			 * @method loadImage
			 * @param {String} src Image src.
			 */
			loadImage: function(src) {
				var instance = this;

				var bodyNode = instance.bodyNode;
				var loader = instance.get(LOADER);

				instance.set(LOADING, true);

				var activeImagePool = instance._activeImagePool;

				if (!activeImagePool) {
					activeImagePool = [];

					// creating the placeholder image
					var placeholder = instance.get(IMAGE);

					var image0 = placeholder.clone();
					var image1 = placeholder.clone();

					// bind the onLoad handler to the image, this handler should append the loaded image
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
				// dataURI allows cached images to refire load event in webkit, and bypass
				// the MimeType error (c/o Paul Irish & Doug Jones)
				if (A.UA.webkit) {
					image.attr(SRC, 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==');
				}

				image.attr(SRC, src);

				instance.fire('request', { image: image });
			},

			/**
			 * Check if there is a node reference for the <code>currentIndex</code>.
			 *
			 * @method hasLink
			 * @param {Number} currentIndex
			 * @return {boolean}
			 */
			hasLink: function(currentIndex) {
				var instance = this;

				return instance.getLink(currentIndex);
			},

			/**
			 * Check if there is a next element to navigate.
			 *
			 * @method hasNext
			 * @return {boolean}
			 */
			hasNext: function() {
				var instance = this;

				return instance.hasLink(
					instance.get(CURRENT_INDEX) + 1
				);
			},

			/**
			 * Check if there is a previous element to navigate.
			 *
			 * @method hasPrev
			 * @return {boolean}
			 */
			hasPrev: function() {
				var instance = this;

				return instance.hasLink(
					instance.get(CURRENT_INDEX) - 1
				);
			},

			/**
			 * Hide all UI controls (i.e., arrows, close icon etc).
			 *
			 * @method hideControls
			 */
			hideControls: function() {
				var instance = this;

				instance.get(ARROW_LEFT_EL).hide();
				instance.get(ARROW_RIGHT_EL).hide();
				instance.get(CLOSE_EL).hide();
			},

			/**
			 * Hide the <a href="OverlayMask.html">OverlayMask</a> used when <a
		     * href="ImageViewer.html#config_modal">modal</a> is <code>true</code>.
			 *
			 * @method hideMask
			 */
			hideMask: function() {
				A.ImageViewerMask.hide();
			},

			/**
			 * Load the next image.
			 *
			 * @method next
			 */
			next: function() {
				var instance = this;

				if (instance.hasNext()) {
					instance.set(
						CURRENT_INDEX,
						instance.get(CURRENT_INDEX) + 1
					);

					instance.show();
				}
			},

			/**
			 * Preload all images.
			 *
			 * @method preloadAllImages
			 */
			preloadAllImages: function() {
				var instance = this;

				instance.get(LINKS).each(function(link, index) {
					instance.preloadImage(index);
				});
			},

			/**
			 * Preload an image based on its <code>index</code>.
			 *
			 * @method preloadImage
			 * @param {Number} currentIndex
			 */
			preloadImage: function(currentIndex) {
				var instance = this;
				var link = instance.getLink(currentIndex);

				if (link) {
					var src = link.attr(HREF);

					instance._createPreloadImage(src);
				}
			},

			/**
			 * Load the previous image.
			 *
			 * @method next
			 */
			prev: function() {
				var instance = this;

				if (instance.hasPrev()) {
					instance.set(
						CURRENT_INDEX,
						instance.get(CURRENT_INDEX) - 1
					);

					instance.show();
				}
			},

			/**
			 * Show the loading icon.
			 *
			 * @method showLoading
			 */
			showLoading: function() {
				var instance = this;
				var loadingEl = instance.get(LOADING_EL);

				instance.setStdModContent(BODY, loadingEl);

				loadingEl.center(instance.bodyNode);
			},

			/**
			 * Show the the OverlayMask used on the <a
		     * href="ImageViewer.html#config_modal">modal</a>.
			 *
			 * @method showMask
			 */
			showMask: function() {
				var instance = this;
				var modal = instance.get(MODAL);

				if (isObject(modal)) {
					A.each(modal, function(value, key) {
						A.ImageViewerMask.set(key, value);
					});
				}

				if (modal) {
					A.ImageViewerMask.show();
				}
			},

			/**
			 * Show the ImageViewer UI.
			 *
			 * @method show
			 */
			show: function() {
				var instance = this;
				var currentLink = instance.getCurrentLink();

				if (currentLink) {
					instance.showMask();

					ImageViewer.superclass.show.apply(this, arguments);

					instance.loadImage(
						currentLink.attr(HREF)
					);
				}
			},

			/**
			 * Removes the references to the preload images to free up memory
			 *
			 * @method _clearPreloadImageFn
			 * @protected
			 */
			_clearPreloadImageFn: function() {
				var instance = this;

				var preloadImagePool = instance._preloadImagePool;
				var image;

				for (var i in preloadImagePool) {
					image = preloadImagePool[i];

					if (image && image.complete) {
						preloadImagePool[i] = null;
					}
				}
			},

			/**
			 * Creates the preload image instance, and add's it
			 * to the internal pool.
			 *
			 * @method _createPreloadImage
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
			 * Render the controls UI.
			 *
			 * @method _renderControls
			 * @protected
			 */
			_renderControls: function() {
				var instance = this;
				var body = A.one(BODY);

				body.append(
					instance.get(ARROW_LEFT_EL).hide()
				);

				body.append(
					instance.get(ARROW_RIGHT_EL).hide()
				);

				body.append(
					instance.get(CLOSE_EL).hide()
				);
			},

			/**
			 * Render the footer UI.
			 *
			 * @method _renderFooter
			 * @protected
			 */
			_renderFooter: function() {
				var instance = this;

				var boundingBox = instance.get(BOUNDING_BOX);

				var docFrag = boundingBox.get(OWNER_DOCUMENT).invoke(CREATE_DOCUMENT_FRAGMENT);

				docFrag.append(
					instance.get(CAPTION_EL)
				);
				docFrag.append(
					instance.get(INFO_EL)
				);

				instance.setStdModContent(
					FOOTER,
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
				var caption = instance.get(CAPTION);
				var captionEl = instance.get(CAPTION_EL);
				var captionFromTitle = instance.get(CAPTION_FROM_TITLE);

				if (captionFromTitle) {
					var currentLink = instance.getCurrentLink();

					if (currentLink) {
						var title = currentLink.attr(TITLE);

						if (title) {
							caption = currentLink.attr(TITLE);
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
				var boundingBox = instance.get(BOUNDING_BOX);
				var arrowLeftEl = instance.get(ARROW_LEFT_EL);
				var arrowRightEl = instance.get(ARROW_RIGHT_EL);
				var closeEl = instance.get(CLOSE_EL);

				if (instance.get(VISIBLE)) {
					if (instance.get(SHOW_ARROWS)) {
						// get the viewportRegion to centralize the arrows on the middle of the window viewport
						var viewportRegion = boundingBox.get(VIEWPORT_REGION);
						var heightRegion = Math.floor(viewportRegion.height/2) + viewportRegion.top;

						// show or hide arrows based on the hasPrev/hasNext information
						arrowLeftEl[ instance.hasPrev() ? SHOW : HIDE ]();
						arrowRightEl[ instance.hasNext() ? SHOW : HIDE ]();

						// set style top of the arrows in the middle of the window viewport
						arrowLeftEl.setStyle(TOP, heightRegion - arrowLeftEl.get(OFFSET_HEIGHT) + PX);
						arrowRightEl.setStyle(TOP, heightRegion - arrowRightEl.get(OFFSET_HEIGHT) + PX);
					}

					// if SHOW_CLOSE is enables, show close icon
					if (instance.get(SHOW_CLOSE)) {
						closeEl.show();
					}
				}
				else {
					// if the overlay is not visible hide all controls
					instance.hideControls();
				}
			},

			/**
			 * Sync the ImageViewer UI.
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
				var infoEl = instance.get(INFO_EL);

				infoEl.html(
					instance.get(INFO_TEMPLATE)
				);
			},

			/**
			 * Calculate the resize ratio for the loaded image.
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
				var maxHeight = instance.get(MAX_HEIGHT);
				var maxWidth = instance.get(MAX_WIDTH);

				if ((height > maxHeight) || (width > maxWidth)) {
					var hRatio = (height / maxHeight);
					var wRatio = (width / maxWidth);

					ratio = Math.max(hRatio, wRatio);
				}

				return ratio;
			},

			/**
			 * Get the <a href="ImageViewer.html#config_info">info</a> template.
			 *
			 * @method _getInfoTemplate
			 * @param {String} v template
			 * @protected
			 * @return {String} Parsed string.
			 */
			_getInfoTemplate: function(v) {
				var instance = this;
				var total = instance.get(TOTAL_LINKS);
				var current = instance.get(CURRENT_INDEX) + 1;

				return L.sub(v, {
					current: current,
					total: total
				});
			},

			/**
			 * Display the image once it's been loaded.
			 *
			 * @method _displayLoadedImage
			 * @param {Node} image The loaded image
			 * @protected
			 */
			_displayLoadedImage: function(image) {
				var instance = this;

				instance.setStdModContent(BODY, image);

				instance._uiSetImageSize(image);

				instance._syncImageViewerUI();

				// invoke WidgetPosition _setAlignCenter to force center alignment
				instance._setAlignCenter(true);

				instance.set(LOADING, false);

				instance.fire('load', { image: image });

				if (instance.get(PRELOAD_NEIGHBOR_IMAGES)) {
					// preload neighbor images
					var currentIndex = instance.get(CURRENT_INDEX);

					instance.preloadImage(currentIndex + 1);
					instance.preloadImage(currentIndex - 1);
				}
			},

			/**
			 * Fires after the ImageViewer render phase.
			 *
			 * @method _afterRender
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterRender: function() {
				var instance = this;
				var bodyNode = instance.bodyNode;

				bodyNode.addClass(CSS_IMAGE_VIEWER_BD);

				if (instance.get(PRELOAD_ALL_IMAGES)) {
					instance.preloadAllImages();
				}
			},

			/**
			 * Fires after the value of the
			 * <a href="ImageViewer.html#config_loading">loading</a> attribute change.
			 *
			 * @method _afterLoadingChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterLoadingChange: function(event) {
				var instance = this;
				var boundingBox = instance.get(BOUNDING_BOX);

				if (event.newVal) {
					boundingBox.addClass(CSS_IMAGE_VIEWER_LOADING);

					instance.showLoading();
				}
				else{
					boundingBox.removeClass(CSS_IMAGE_VIEWER_LOADING);
				}
			},

			/**
			 * Fires after the value of the
			 * <a href="ImageViewer.html#config_visible">visible</a> attribute change.
			 *
			 * @method _afterVisibleChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterVisibleChange: function(event) {
				var instance = this;

				instance._syncControlsUI();
			},

			/**
			 * Fires the click event on the close icon.
			 *
			 * @method _onClickCloseEl
			 * @param {EventFacade} event click event facade
			 * @protected
			 */
			_onClickCloseEl: function(event) {
				var instance = this;

				instance.close();

				event.halt();
			},

			/**
			 * Fires the click event on the left arrow icon.
			 *
			 * @method _onClickLeftArrow
			 * @param {EventFacade} event click event facade
			 * @protected
			 */
			_onClickLeftArrow: function(event) {
				var instance = this;

				instance.prev();

				event.halt();
			},

			/**
			 * Fires the click event on the right arrow icon.
			 *
			 * @method _onClickRightArrow
			 * @param {EventFacade} event click event facade
			 * @protected
			 */
			_onClickRightArrow: function(event) {
				var instance = this;

				instance.next();

				event.halt();
			},

			/**
			 * Fires the click event on the links.
			 *
			 * @method _onClickLinks
			 * @param {EventFacade} event click event facade
			 * @protected
			 */
			_onClickLinks: function(event) {
				var instance = this;
				var target = event.currentTarget;

				// set the current currentIndex of the clicked image
				instance.set(
					CURRENT_INDEX,
					instance.get(LINKS).indexOf(target)
				);

				instance.show();

				event.preventDefault();
			},

			/**
			 * Handles the key interaction (i.e., next, prev etc).
			 *
			 * @method _onKeyInteraction
			 * @param {EventFacade} event click event facade
			 * @protected
			 */
			_onKeyInteraction: function(event) {
				var instance = this;

				if (!instance.get(VISIBLE)) {
					return false; // NOTE: return
				}

				if (event.isKey(KEY_LEFT)) {
					instance.prev();
				}
				else if (event.isKey(KEY_RIGHT)) {
					instance.next();
				}
				else if (event.isKey(KEY_ESC)) {
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

				var imageAnim = instance.get(IMAGE_ANIM);

				if (instance.get(ANIM)) {
					image.setStyle(OPACITY, 0);

					// preparing node to the animation, pluging the NodeFX
					image.unplug(NodeFx).plug(NodeFx);

					image.fx.on('end', function(info) {
						instance.fire('anim', { anim: info, image: image });

						instance._displayLoadedImage(image);
					});

					image.fx.setAttrs(imageAnim);
					image.fx.stop().run();
				}
				else {
					instance._displayLoadedImage(image);
				}
			},

			/**
			 * Set the size of the image and the overlay respecting the
             * maxHeight/maxWidth ratio.
			 *
			 * @method _uiSetImageSize
			 * @param {HTMLImage} image Image
			 * @protected
			 */
			_uiSetImageSize: function(image) {
				var instance = this;
				var bodyNode = instance.bodyNode;
				var imageRegion = image.get(REGION);

				var ratio = instance._getRatio(
					imageRegion.width,
					imageRegion.height
				);

				var height = (imageRegion.height / ratio);
				var width = (imageRegion.width / ratio);

				image.set(OFFSET_HEIGHT, height);
				image.set(OFFSET_WIDTH, width);

				bodyNode.setStyles({
					height: height + PX,
					width: width + PX
				});
			}
		}
	}
);

A.ImageViewer = ImageViewer;

/**
 * A base class for ImageViewerMask - Controls the <a
 * href="ImageViewer.html#config_modal">modal</a> attribute.
 *
 * @class ImageViewerMask
 * @constructor
 * @extends OverlayMask
 * @static
 */
A.ImageViewerMask = new A.OverlayMask().render();

}, '@VERSION@' ,{skinnable:true, requires:['anim','aui-overlay-mask']});
AUI.add('aui-image-viewer-gallery', function(A) {
/**
 * The ImageGallery Utility
 *
 * @module aui-image-viewer
 * @submodule aui-image-viewer-gallery
 */

var L = A.Lang,
	isBoolean = L.isBoolean,
	isNumber = L.isNumber,
	isObject = L.isObject,
	isString = L.isString,

	AUTO_PLAY = 'autoPlay',
	BODY = 'body',
	CONTENT = 'content',
	CURRENT_INDEX = 'currentIndex',
	DELAY = 'delay',
	DOT = '.',
	ENTRY = 'entry',
	HANDLER = 'handler',
	HIDDEN = 'hidden',
	HREF = 'href',
	IMAGE_GALLERY = 'image-gallery',
	IMG = 'img',
	LEFT = 'left',
	LINKS = 'links',
	OFFSET_WIDTH = 'offsetWidth',
	OVERLAY = 'overlay',
	PAGE = 'page',
	PAGINATOR = 'paginator',
	PAGINATOR_EL = 'paginatorEl',
	PAGINATOR_INSTANCE = 'paginatorInstance',
	PAUSE = 'pause',
	PAUSED = 'paused',
	PAUSED_LABEL = 'pausedLabel',
	PLAY = 'play',
	PLAYER = 'player',
	PLAYING = 'playing',
	PLAYING_LABEL = 'playingLabel',
	PX = 'px',
	REPEAT = 'repeat',
	SHOW_PLAYER = 'showPlayer',
	SPACE = ' ',
	SRC = 'src',
	THUMB = 'thumb',
	TOOLBAR = 'toolbar',
	TOTAL_LINKS = 'totalLinks',
	USE_ORIGINAL_IMAGE = 'useOriginalImage',
	VIEWPORT_REGION = 'viewportRegion',
	VISIBLE = 'visible',

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	getCN = A.getClassName,

	CSS_IMAGE_GALLERY_PAGINATOR = getCN(IMAGE_GALLERY, PAGINATOR),
	CSS_IMAGE_GALLERY_PAGINATOR_CONTENT = getCN(IMAGE_GALLERY, PAGINATOR, CONTENT),
	CSS_IMAGE_GALLERY_PAGINATOR_ENTRY = getCN(IMAGE_GALLERY, PAGINATOR, ENTRY),
	CSS_IMAGE_GALLERY_PAGINATOR_LINKS = getCN(IMAGE_GALLERY, PAGINATOR, LINKS),
	CSS_IMAGE_GALLERY_PAGINATOR_THUMB = getCN(IMAGE_GALLERY, PAGINATOR, THUMB),
	CSS_IMAGE_GALLERY_PLAYER = getCN(IMAGE_GALLERY, PLAYER),
	CSS_IMAGE_GALLERY_PLAYER_CONTENT = getCN(IMAGE_GALLERY, PLAYER, CONTENT),
	CSS_OVERLAY_HIDDEN = getCN(OVERLAY, HIDDEN),

	TEMPLATE_PLAYING_LABEL = '(playing)',
	TEMPLATE_PAGINATOR = '<div class="'+CSS_IMAGE_GALLERY_PAGINATOR_CONTENT+'">{PageLinks}</div>',

	TPL_LINK = '<span class="' + CSS_IMAGE_GALLERY_PAGINATOR_ENTRY + '"><span class="' + CSS_IMAGE_GALLERY_PAGINATOR_THUMB+'"></span></span>',
	TPL_LINK_CONTAINER = '<div class="' + CSS_IMAGE_GALLERY_PAGINATOR_LINKS + '"></div>',
	TPL_PAGINATOR_CONTAINER = '<div class="'+concat(CSS_OVERLAY_HIDDEN, CSS_IMAGE_GALLERY_PAGINATOR)+'"></div>',
	TPL_PLAYER_CONTAINER = '<div class="'+CSS_IMAGE_GALLERY_PLAYER+'"></div>',
	TPL_PLAYER_CONTENT = '<span class="'+CSS_IMAGE_GALLERY_PLAYER_CONTENT+'"></span>';

/**
 * <p><img src="assets/images/aui-image-viewer-gallery/main.png"/></p>
 *
 * A base class for ImageGallery, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Displays an image in a Overlay</li>
 *    <li>Displays list of thumbnails of the images as a control</li>
 *    <li>Slide show functionalities (i.e., play, pause etc)</li>
 *    <li>Keyboard navigation support</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.ImageGallery({
 *   links: '#gallery1 a',
 *   caption: 'Liferay Champion Soccer',
 *   captionFromTitle: true,
 *   preloadNeighborImages: true,
 *   preloadAllImages: true,
 *   showInfo: true
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="ImageGallery.html#configattributes">Configuration Attributes</a> available for
 * ImageGallery.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class ImageGallery
 * @constructor
 * @extends ImageViewer
 */
var ImageGallery = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property ImageGallery.NAME
		 * @type String
		 * @static
		 */
		NAME: IMAGE_GALLERY,

		/**
		 * Static property used to define the default attribute
		 * configuration for the ImageGallery.
		 *
		 * @property ImageGallery.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * If <code>true</code> the slide show will be played when the
	         * ImageGallery is displayed.
			 *
			 * @attribute autoPlay
			 * @default false
			 * @type boolean
			 */
			autoPlay: {
				value: false,
				validator: isBoolean
			},

			/**
			 * Delay in milliseconds to change to the next image.
			 *
			 * @attribute delay
			 * @default 7000
			 * @type Number
			 */
			delay: {
				value: 7000,
				validator: isNumber
			},

			/**
			 * <a href="Paginator.html">Paginator</a> configuration Object. The
	         * <code>Paginator</code> handles the thumbnails control.
			 *
			 * @attribute paginator
			 * @default <a href="Paginator.html">Paginator</a> configuration Object.
			 * @type Object
			 */
			paginator: {
				value: {},
				setter: function(value) {
					var instance = this;
					var paginatorEl = instance.get(PAGINATOR_EL);
					var totalLinks = instance.get(TOTAL_LINKS);

					return A.merge(
						{
							containers: paginatorEl,
							pageLinkContent: A.bind(instance._setThumbContent, instance),
							on: {
								changeRequest: function(event) {
									// fire changeRequest from ImageGallery passing the "state" object from Paginator
									instance.fire('changeRequest', { state: event.state })
								}
							},
							TPL: {
								defaultOutput: TEMPLATE_PAGINATOR,
								pageContainer: TPL_LINK_CONTAINER,
								pageLink: TPL_LINK,
								total: totalLinks
							},
						},
						value
					);
				},
				validator: isObject
			},

			/**
			 * Element which contains the <a href="Paginator.html">Paginator</a>
	         * with the thumbnails.
			 *
			 * @attribute paginatorEl
			 * @default Generated HTML div.
			 * @readOnly
			 * @type Node
			 */
			paginatorEl: {
				readyOnly: true,
				valueFn: function() {
					return A.Node.create(TPL_PAGINATOR_CONTAINER);
				}
			},

			/**
			 * Stores the <a href="Paginator.html">Paginator</a> instance.
			 *
			 * @attribute paginatorInstance
			 * @default null
			 * @type Paginator
			 */
			paginatorInstance: {
				value: null
			},

			/**
			 * If <code>true</code> the slide show is paused.
			 *
			 * @attribute paused
			 * @default false
			 * @type boolean
			 */
			paused: {
				value: false,
				validator: isBoolean
			},

			/**
			 * Label to display when the slide show is paused.
			 *
			 * @attribute pausedLabel
			 * @default ''
			 * @type String
			 */
			pausedLabel: {
				value: '',
				validator: isString
			},

			/**
			 * If <code>true</code> the slide show is playing.
			 *
			 * @attribute playing
			 * @default false
			 * @type boolean
			 */
			playing: {
				value: false,
				validator: isBoolean
			},

			/**
			 * Label to display when the slide show is playing.
			 *
			 * @attribute playingLabel
			 * @default '(Playing)'
			 * @type String
			 */
			playingLabel: {
				value: TEMPLATE_PLAYING_LABEL,
				validator: isString
			},

			/**
			 * Restart the navigation when reach the last element.
			 *
			 * @attribute repeat
			 * @default true
			 * @type boolean
			 */
			repeat: {
				value: true,
				validator: isBoolean
			},

			/**
			 * Show the player controls (i.e., pause and show buttons).
			 *
			 * @attribute showPlayer
			 * @default true
			 * @type boolean
			 */
			showPlayer: {
				value: true,
				validator: isBoolean
			},

			/**
			 * <a href="Toolbar.html">Toolbar</a> with a play, and pause buttons.
			 *
			 * @attribute toolbar
			 * @default Generated Toolbar with a play, and pause buttons.
			 * @type Toolbar constructor.
			 */
			toolbar: {
				value: {},
				setter: function(value) {
					var instance = this;

					return A.merge(
						{
							children: [
								{
									id: PLAY,
									icon: PLAY
								},
								{
									id: PAUSE,
									icon: PAUSE
								}
							]
						},
						value
					);
				},
				validator: isObject
			},

			/**
			 * If <code>true</code> will use the original image as thumbnails.
			 *
			 * @attribute useOriginalImage
			 * @default false
			 * @type boolean
			 */
			useOriginalImage: {
				value: false,
				validator: isBoolean
			}
		},

		EXTENDS: A.ImageViewer,

		prototype: {
			/**
			 * Toolbar instance reference.
			 *
			 * @property toolbar
			 * @type Toolbar
			 * @protected
			 */
			toolbar: null,

			/**
			 * Stores the <code>A.later</code> reference.
			 *
			 * @property _timer
			 * @type Number
			 * @protected
			 */
			_timer: null,

			/**
			 * Create the DOM structure for the ImageGallery. Lifecycle.
			 *
			 * @method renderUI
			 * @protected
			 */
			renderUI: function() {
				var instance = this;

				ImageGallery.superclass.renderUI.apply(this, arguments);

				instance._renderPaginator();

				if (instance.get(SHOW_PLAYER)) {
					instance._renderPlayer();
				}
			},

			/**
			 * Bind the events on the ImageGallery UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;

				ImageGallery.superclass.bindUI.apply(this, arguments);

				instance._bindToolbarUI();

				instance.on('playingChange', instance._onPlayingChange);
				instance.on('pausedChange', instance._onPausedChange);

				instance.publish('changeRequest', { defaultFn: this._changeRequest });
			},

			/**
			 * Descructor lifecycle implementation for the ImageGallery class.
			 * Purges events attached to the node (and all child nodes).
			 *
			 * @method destroy
			 * @protected
			 */
			destroy: function() {
				var instance = this;

				ImageGallery.superclass.destroy.apply(this, arguments);

				instance.get(PAGINATOR_INSTANCE).destroy();
			},

			/**
			 * Hide the <a href="Paginator.html">Paginator</a> with the thumbnails
		     * list.
			 *
			 * @method hidePaginator
			 */
			hidePaginator: function() {
				var instance = this;

				instance.get(PAGINATOR_EL).addClass(CSS_OVERLAY_HIDDEN);
			},

			/**
			 * Pause the slide show.
			 *
			 * @method pause
			 */
			pause: function() {
				var instance = this;

				instance.set(PAUSED, true);
				instance.set(PLAYING, false);

				instance._syncInfoUI();
			},

			/**
			 * Play the slide show.
			 *
			 * @method play
			 */
			play: function() {
				var instance = this;

				instance.set(PAUSED, false);
				instance.set(PLAYING, true);

				instance._syncInfoUI();
			},

			/**
			 * <p>Show the ImageGallery.</p>
			 *
			 * <p><strong>NOTE:</strong>Overloads the <a
		     * href="ImageViewer.html">ImageViewer</a> show method to not loadImage, the
		     * changeRequest now is responsible to do that if we invoke the superclass
		     * show method its loading the image, and the changeRequest loads again,
		     * avoiding double request.</p>
			 *
			 * @method show
			 */
			show: function() {
				var instance = this;
				var currentLink = instance.getCurrentLink();

				if (currentLink) {
					instance.showMask();

					// invoke the Overlay show method
					// NODE: A.ImageViewer is the parent of ImageGallery, the A.ImageViewer.superclass is the Overlay
					A.ImageViewer.superclass.show.apply(this, arguments);

					// changeRequest on paginatorInstance with the new page set
					var paginatorInstance = instance.get(PAGINATOR_INSTANCE);

					// page start on 1, index on 0, add +1 to the nextIndex to set the correct page on the paginator
					paginatorInstance.set(
						PAGE,
						instance.get(CURRENT_INDEX) + 1
					);

					paginatorInstance.changeRequest();
				}
			},

			/**
			 * Show the <a href="Paginator.html">Paginator</a> with the thumbnails
		     * list.
			 *
			 * @method showPaginator
			 */
			showPaginator: function() {
				var instance = this;

				instance.get(PAGINATOR_EL).removeClass(CSS_OVERLAY_HIDDEN);
			},

			/**
			 * Bind the Toolbar UI for the play and pause buttons.
			 *
			 * @method _bindToolbarUI
			 * @protected
			 */
			_bindToolbarUI: function() {
				var instance = this;

				if (instance.get(SHOW_PLAYER)) {
					var toolbar = instance.toolbar;

					var play = toolbar.item(PLAY);
					var pause = toolbar.item(PAUSE);

					if (play) {
						play.set(HANDLER, A.bind(instance.play, instance));
					}
					if (pause) {
						pause.set(HANDLER, A.bind(instance.pause, instance));
					}
				}
			},

			/**
			 * Cancel the timer between slides.
			 *
			 * @method _cancelTimer
			 * @protected
			 */
			_cancelTimer: function() {
				var instance = this;

				if (instance._timer) {
					instance._timer.cancel();
				}
			},

			/**
			 * Render the <a href="Paginator.html">Paginator</a> with the thumbnails.
			 *
			 * @method _renderPaginator
			 * @protected
			 */
			_renderPaginator: function() {
				var instance = this;
				var paginatorEl = instance.get(PAGINATOR_EL);

				A.one(BODY).append(
					paginatorEl.hide()
				);

				var paginatorInstance = new A.Paginator(
					instance.get(PAGINATOR)
				)
				.render();

				instance.set(PAGINATOR_INSTANCE, paginatorInstance);
			},

			/**
			 * Render the player controls.
			 *
			 * @method _renderPlayer
			 * @protected
			 */
			_renderPlayer: function() {
				var instance = this;
				var paginatorEl = instance.get(PAGINATOR_EL);
				var playerContent = A.Node.create(TPL_PLAYER_CONTENT);

				paginatorEl.append(
					A.Node.create(TPL_PLAYER_CONTAINER).append(playerContent)
				);

				instance.toolbar = new A.Toolbar(
					instance.get(TOOLBAR)
				)
				.render(playerContent);
			},

			/**
			 * Start the timer between slides.
			 *
			 * @method _startTimer
			 * @protected
			 */
			_startTimer: function() {
				var instance = this;
				var delay = instance.get(DELAY);

				instance._cancelTimer();

				instance._timer = A.later(delay, instance, instance._syncSlideShow);
			},

			/**
			 * Sync the controls UI.
			 *
			 * @method _syncControlsUI
			 * @protected
			 */
			_syncControlsUI: function() {
				var instance = this;

				ImageGallery.superclass._syncControlsUI.apply(this, arguments);

				if (instance.get(VISIBLE)) {
					instance._syncSelectedThumbUI();

					instance.showPaginator();
				}
				else {
					instance.hidePaginator();

					instance._cancelTimer();
				}
			},

			/**
			 * Sync the selected thumb UI.
			 *
			 * @method _syncSelectedThumbUI
			 * @protected
			 */
			_syncSelectedThumbUI: function() {
				var instance = this;
				var currentIndex = instance.get(CURRENT_INDEX);
				var paginatorInstance = instance.get(PAGINATOR_INSTANCE);
				var paginatorIndex = paginatorInstance.get(PAGE) - 1;

				// when currentIndex != paginatorIndex we need to load the new image
				if (currentIndex != paginatorIndex) {
					// originally the paginator changeRequest is only invoked when user interaction happens, forcing invoke changeRequest from paginator
					paginatorInstance.set(PAGE, currentIndex + 1);

					paginatorInstance.changeRequest();
				}
			},

			/**
			 * Sync the slide show UI.
			 *
			 * @method _syncSlideShow
			 * @protected
			 */
			_syncSlideShow: function() {
				var instance = this;

				if (!instance.hasNext()) {
					if (instance.get(REPEAT)) {
						instance.set(CURRENT_INDEX, -1);
					}
					else {
						instance._cancelTimer();
					}
				}

				instance.next();
			},

			/**
			 * Change the UI when click on a thumbnail.
			 *
			 * @method _changeRequest
			 * @param {EventFacade} event
			 * @protected
			 */
			_changeRequest: function(event) {
				var instance = this;
				var paginatorInstance = event.state.paginator;
				var newState = event.state;
				var beforeState = newState.before;
				var page = newState.page;

				// only update the paginator UI when the Overlay is visible
				if (!instance.get(VISIBLE)) {
					return false; // NOTE: return
				}

				var paginatorIndex = page - 1;

				// check if the beforeState page number is different from the newState page number.
				if (!beforeState || (beforeState && beforeState.page != page)) {
					// updating currentIndex
					instance.set(CURRENT_INDEX, paginatorIndex);

					// updating the UI of the paginator
					paginatorInstance.setState(newState);

					instance._processChangeRequest();
				}
			},

			/**
			 * Process the change request.
			 * Load image and restart the timer, if needed.
			 *
			 * @method _processChangeRequest
			 * @protected
			 */
			_processChangeRequest: function() {
				var instance = this;

				// loading current index image
				instance.loadImage(
					instance.getCurrentLink().attr(HREF)
				);

				// restart the timer if the user change the image, respecting the paused state
				var paused = instance.get(PAUSED);
				var playing = instance.get(PLAYING);

				if (playing && !paused) {
					instance._startTimer();
				}
			},

			/**
			 * See <a href="Paginator.html#method_pageLinkContent">pageLinkContent</a>.
			 *
			 * @method _setThumbContent
			 * @param {Node} pageEl
			 * @param {Number} pageNumber
			 * @protected
			 */
			_setThumbContent: function(pageEl, pageNumber) {
				var instance = this;
				var index = pageNumber - 1;
				var link = instance.getLink(index);
				var thumbEl = pageEl.one(DOT+CSS_IMAGE_GALLERY_PAGINATOR_THUMB);
				var thumbSrc = null;

				if (instance.get(USE_ORIGINAL_IMAGE)) {
					thumbSrc = link.attr(HREF);
				}
				else {
					// try to find a inner thumbnail image to show on the paginator
					var innerImage = link.one(IMG);

					if (innerImage) {
						thumbSrc = innerImage.attr(SRC);
					}
				}

				if (thumbSrc && thumbEl.getData('thumbSrc') != thumbSrc) {
					thumbEl.setStyles({
						// use background to show the thumbnails to take advantage of the background-position: 50% 50%
						backgroundImage: 'url(' + thumbSrc + ')'
					});

					thumbEl.setData('thumbSrc', thumbSrc);
				}
			},

			/**
			 * Get the <a href="ImageViewer.html#config_info">info</a> template.
			 *
			 * @method _getInfoTemplate
			 * @param {String} v template
			 * @protected
			 * @return {String} Parsed string.
			 */
			_getInfoTemplate: function(v) {
				var label;
				var instance = this;
				var paused = instance.get(PAUSED);
				var playing = instance.get(PLAYING);

				if (playing) {
					label = instance.get(PLAYING_LABEL);
				}
				else if (paused) {
					label = instance.get(PAUSED_LABEL);
				}

				return concat(
					ImageGallery.superclass._getInfoTemplate.apply(this, arguments),
					label
				);
			},

			/**
			 * Fires after the value of the
			 * <a href="ImageViewer.html#config_visible">visible</a> attribute change.
			 *
			 * @method _afterVisibleChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_afterVisibleChange: function(event) {
				var instance = this;

				// invoke A.ImageViewer _afterVisibleChange method
				ImageGallery.superclass._afterVisibleChange.apply(this, arguments);

				if (event.newVal) {
					// trigger autoPlay when overlay is visible
					if (instance.get(AUTO_PLAY)) {
						instance.play();
					}
				}
			},

			/**
			 * Fires before the value of the
			 * <a href="ImageGallery.html#config_paused">paused</a> attribute change.
			 *
			 * @method _onPausedChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_onPausedChange: function(event) {
				var instance = this;

				if (event.newVal) {
					instance._cancelTimer();
				}
			},

			/**
			 * Fires before the value of the
			 * <a href="ImageGallery.html#config_playing">playing</a> attribute change.
			 *
			 * @method _onPlayingChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_onPlayingChange: function(event) {
				var instance = this;

				if (event.newVal) {
					instance._startTimer();
				}
			}
		}
	}
);

A.ImageGallery = ImageGallery;

}, '@VERSION@' ,{skinnable:true, requires:['aui-image-viewer-base','aui-paginator','aui-toolbar']});
AUI.add('aui-media-viewer-plugin', function(A) {
/**
 * The ImageViewer Media Plugin
 *
 * @module aui-media-viewer-plugin
 */

var Lang = A.Lang,
	Do = A.Do,

	STR_ABOUT_BLANK = 'about:blank',
	STR_BODY = 'body',
	STR_HREF = 'href',
	STR_IFRAME = 'iframe',
	STR_IMAGE = 'image',
	STR_LOADING = 'loading',
	STR_PROVIDERS = 'providers',
	STR_SRC = 'src',

	NAME = 'mediaViewerPlugin',

	DATA_OPTIONS = 'data-options',

	DEFAULT_OPTIONS = {
		height: 360,
		width: 640,
		wmode: 'embed'
	},

	REGEX_DOMAIN = 'https?://(?:www\\.)?{domain}',

	REGEX_PARAM = '(?:[\\?&]|^){param}=([^&#]*)';

var MediaViewerPlugin = A.Component.create(
	{
		NAME: NAME,
		NS: 'media',

		ATTRS: {
			providers: {
				validator: Lang.isObject,
				value: {
					'flash': {
						container: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{media}" /><embed src="{media}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
						matcher: /\b.swf\b/i,
						options: DEFAULT_OPTIONS,
						mediaRegex: /([^?&#]+)/
					},
					'youtube': {
						container: '<iframe width="{width}" height="{height}" src="http://www.youtube.com/embed/{media}" frameborder="0" allowfullscreen></iframe>',
						matcher: new RegExp(
							Lang.sub(
								REGEX_DOMAIN,
								{
									domain: 'youtube.com'
								}
							),
							'i'
						),
						options: DEFAULT_OPTIONS,
						mediaRegex: /[\?&]v=([^&#]*)/i
					},
					'vimeo': {
						container: '<iframe src="http://player.vimeo.com/video/{media}?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="{width}" height="{height}" frameborder="0"></iframe>',
						matcher: new RegExp(
							Lang.sub(
								REGEX_DOMAIN,
								{
									domain: 'vimeo.com'
								}
							),
							'i'
						),
						options: DEFAULT_OPTIONS,
						mediaRegex: /\/(\d+)/
					}
				}
			}
		},

		EXTENDS: A.Plugin.Base,

		prototype: {
			initializer: function(config) {
				var instance = this;

				var handles = instance._handles;

				handles.changeReqeust = instance.afterHostMethod('_changeRequest', instance._restoreMedia);
				handles.close = instance.beforeHostMethod('close', instance.close);
				handles.loadMedia = instance.beforeHostMethod('loadImage', instance.loadMedia);
				handles.preloadImage = instance.beforeHostMethod('preloadImage', instance.preloadImage);
			},

			close: function() {
				var instance = this;

				var host = instance.get('host');

				var source = host.getCurrentLink();

				var mediaType = instance._getMediaType(source.attr('href'));

				if (mediaType != STR_IMAGE) {
					instance._redirectIframe(STR_ABOUT_BLANK);

					host.setStdModContent(STR_BODY, '');
				}
			},

			loadMedia: function(linkHref) {
				var instance = this;

				var host = instance.get('host');

				var mediaType = instance._getMediaType(linkHref);

				var result = true;

				instance._redirectIframe(STR_ABOUT_BLANK);

				if (mediaType != STR_IMAGE) {
					var providers = instance.get(STR_PROVIDERS)[mediaType];

					var source = host.getCurrentLink();

					var options = instance._updateOptions(
						source,
						A.clone(providers.options)
					);

					var media = providers.mediaRegex.exec(linkHref);

					if (media) {
						options.media = media[1];
					}

					var container = Lang.sub(
						providers.container,
						options
					);

					host.setStdModContent(STR_BODY, container);

					host._syncImageViewerUI();

					instance._uiSetContainerSize(options.width, options.height);

					host._setAlignCenter(true);

					host.set(STR_LOADING, false);

					host.fire(
						'load',
						{
							media: media
						}
					);

					if (host.get('preloadNeighborImages')) {
						var currentIndex = host.get('currentIndex');

						host.preloadImage(currentIndex + 1);
						host.preloadImage(currentIndex - 1);
					}

					result = new Do.Prevent();
				}

				return result;
			},

			preloadImage: function(index) {
				var instance = this;

				var host = instance.get('host');

				var currentLink = host.getLink(index);

				var result = new Do.Prevent();

				if (currentLink) {
					var linkHref = currentLink.attr(STR_HREF);

					var mediaType = instance._getMediaType(linkHref);

					if (mediaType == STR_IMAGE) {
						result = true;
					}
				}

				return result;
			},

			_getMediaType: function(source) {
				var instance = this;

				var providers = instance.get(STR_PROVIDERS);

				var mediaType = STR_IMAGE;

				A.some(
					providers,
					function(value, key, collection) {
						return value.matcher.test(source) && (mediaType = key);
					}
				);

				return mediaType;
			},

			_redirectIframe: function(source) {
				var instance = this;

				var bodyNode = instance.get('host.bodyNode');

				if (bodyNode) {
					var iframe = bodyNode.one(STR_IFRAME);

					if (iframe) {
						iframe.attr(STR_SRC, source);
					}
				}
			},

			_restoreMedia: function(event) {
				var instance = this;

				var host = instance.get('host');

				var source = host.getCurrentLink();

				var href = source.attr('href');

				var mediaType = instance._getMediaType(href);

				if (mediaType != STR_IMAGE && !host.getStdModNode(STR_BODY).html()) {
					host._processChangeRequest();
				}
			},

			_uiSetContainerSize: function(width, height) {
				var instance = this;

				var host = instance.get('host');

				var bodyNode = host.bodyNode;

				bodyNode.setStyles(
					{
						height: height,
						width: width
					}
				);
			},

			_updateOptions: function(source, options) {
				var dataOptions = source.attr(DATA_OPTIONS);
				var linkHref = source.attr(STR_HREF);

				A.each(
					options,
					function(value, key, collection) {
						var regexParam = new RegExp(
							Lang.sub(
								REGEX_PARAM,
								{
									param: key
								}
							)
						);

						var result = regexParam.exec(dataOptions) || regexParam.exec(linkHref);

						if (result) {
							options[key] = result[1];
						}
					}
				);

				return options;
			},

			_handles: {}
		},

		DATA_OPTIONS: DATA_OPTIONS,

		DEFAULT_OPTIONS: DEFAULT_OPTIONS,

		REGEX_DOMAIN: REGEX_DOMAIN,
		REGEX_PARAM: REGEX_PARAM
	}
);

A.MediaViewerPlugin = MediaViewerPlugin;

A.MediaViewer = A.ImageViewer;

}, '@VERSION@' ,{requires:['aui-image-viewer-base'], skinnable:false});


AUI.add('aui-image-viewer', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-image-viewer-base','aui-image-viewer-gallery','aui-media-viewer-plugin']});

