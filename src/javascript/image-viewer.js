AUI.add('image-viewer', function(A) {

/*
* ImageViewer
*/
var L = A.Lang,
	isBoolean = L.isBoolean,
	isString = L.isString,
	isObject = L.isObject,

	NodeFx = A.Plugin.NodeFX,

	ANIM = 'anim',
	ARROW = 'arrow',
	ARROW_LEFT_EL = 'arrowLeftEl',
	ARROW_RIGHT_EL = 'arrowRightEl',
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
	CREATE_DOCUMENT_FRAGMENT = "createDocumentFragment",
	EASE_BOTH_STRONG = 'easeBothStrong',
	FOOTER = 'footer',
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
	MODAL = 'modal',
	OFFSET_HEIGHT = 'offsetHeight',
	OFFSET_WIDTH = 'offsetWidth',
	OPACITY = 'opacity',
	OVERLAY = 'overlay',
	PX = 'px',
	RIGHT = 'right',
	SHOW = 'show',
	SHOW_ARROWS = 'showArrows',
	SHOW_CLOSE = 'showClose',
	SPACE = ' ',
	SRC = 'src',
	TITLE = 'title',
	TOP = 'top',
	VIEWPORT_REGION = 'viewportRegion',
	VISIBLE = 'visible',
    OWNER_DOCUMENT = "ownerDocument",

	isNodeList = function(v) {
		return (v instanceof A.NodeList);
	},

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	KEY_ESC = 27,
	KEY_RIGHT = 39,
	KEY_LEFT = 37,

	getCN = A.ClassNameManager.getClassName,

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
	CSS_OVERLAY_HIDDEN = getCN(OVERLAY, HIDDEN),

	INFO_LABEL_TEMPLATE = 'Image {current} of {total}',

	TPL_ARROW_LEFT = '<a href="#" class="'+concat(CSS_IMAGE_VIEWER_ARROW, CSS_IMAGE_VIEWER_ARROW_LEFT)+'"></a>',
	TPL_ARROW_RIGHT = '<a href="#" class="'+concat(CSS_IMAGE_VIEWER_ARROW, CSS_IMAGE_VIEWER_ARROW_RIGHT)+'"></a>',
	TPL_CAPTION = '<div class="' + CSS_IMAGE_VIEWER_CAPTION + '"></div>',
	TPL_CLOSE = '<a href="#" class="'+ CSS_IMAGE_VIEWER_CLOSE +'"></a>',
	TPL_IMAGE = '<img class="' + CSS_IMAGE_VIEWER_IMAGE + '" />',
	TPL_INFO = '<div class="' + CSS_IMAGE_VIEWER_INFO + '"></div>',
	TPL_LOADER = '<div class="' + CSS_OVERLAY_HIDDEN + '"></div>',
	TPL_LOADING = '<div class="' + CSS_ICON_LOADING + '"></div>';

function ImageViewer(config) {
	ImageViewer.superclass.constructor.apply(this, arguments);
}

A.mix(ImageViewer, {
	NAME: IMAGE_VIEWER,

	ATTRS: {
		anim: {
			value: true,
			validator: isBoolean
		},

		bodyContent: {
			value: SPACE
		},

		caption: {
			value: BLANK,
			validator: isString
		},


		captionFromTitle: {
			value: true,
			validator: isBoolean
		},

		centered: {
			value: true
		},

		image: {
			readyOnly: true,
			valueFn: function() {
				return A.Node.create(TPL_IMAGE);
			}
		},

		imageAnim: {
			value: {},
			setter: function(value) {
				return A.merge(
					{
						to: {
							opacity: 1
						},
						easing: EASE_BOTH_STRONG,
						duration: .8
					},
					value
				);
			},
			validator: isObject
		},

		infoTemplate: {
			getter: function(v) {
				var instance = this;
				var total = instance.get(LINKS).size();
				var current = instance.index + 1;

				return A.substitute(v, {
					current: current,
					total: total
				});
			},
			value: INFO_LABEL_TEMPLATE,
			validator: isString
		},

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

		loader: {
			readyOnly: true,
			valueFn: function() {
				return A.Node.create(TPL_LOADER).appendTo(document.body);
			}
		},

		loading: {
			value: false,
			validator: isBoolean
		},

		modal: {
			value: {
				opacity: .8,
				background: '#000'
			}
		},

		showClose: {
			value: true,
			validator: isBoolean
		},

		showArrows: {
			value: true,
			validator: isBoolean
		},

		visible: {
			value: false
		},

		zIndex: {
			value: 2000
		},

		/*
		* Static Attrs
		*/
		arrowLeftEl: {
			readyOnly: true,
			valueFn: function() {
				return A.Node.create(TPL_ARROW_LEFT);
			}
		},

		arrowRightEl: {
			readyOnly: true,
			valueFn: function() {
				return A.Node.create(TPL_ARROW_RIGHT);
			}
		},

		captionEl: {
			readyOnly: true,
			valueFn: function() {
				return A.Node.create(TPL_CAPTION);
			}
		},

		closeEl: {
			readyOnly: true,
			valueFn: function() {
				return A.Node.create(TPL_CLOSE);
			}
		},

		infoEl: {
			readyOnly: true,
			valueFn: function() {
				return A.Node.create(TPL_INFO);
			}
		},

		loadingEl: {
			valueFn: function() {
				return A.Node.create(TPL_LOADING);
			}
		}
	}
});

A.extend(ImageViewer, A.ComponentOverlay, {
	index: 0,

	_keyHandler: null,

	/*
	* Lifecycle
	*/
	renderUI: function() {
		var instance = this;

		instance._renderControls();
		instance._renderFooter();

		instance.get(LINKS).addClass(CSS_IMAGE_VIEWER_LINK);
	},

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
	},

	destroy: function() {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);
		var links = instance.get(LINKS);

		instance.close();

		links.detach('click');
		links.removeClass(CSS_IMAGE_VIEWER_LINK);

		// detach key global listener from the document
		A.getDoc().detach('keydown', instance._keyHandler);

		instance.get(ARROW_LEFT_EL).remove();
		instance.get(ARROW_RIGHT_EL).remove();
		instance.get(CLOSE_EL).remove();

		boundingBox.remove();
	},

	/*
	* Methods
	*/
	close: function() {
		var instance = this;

		instance.hide();
		instance.hideMask();
	},

	getLink: function(index) {
		var instance = this;

		return instance.get(LINKS).item(index);
	},

	getCurrentLink: function() {
		var instance = this;

		return instance.getLink(instance.index);
	},

	loadImage: function(src) {
		var instance = this;
		var bodyNode = instance.bodyNode;
		var loader = instance.get(LOADER);

		instance.set(LOADING, true);

		// creating the placeholder image
		var image = instance.get(IMAGE).cloneNode(true);

		// append the placeholder image to the loader div
		loader.empty();
		loader.append(image);

		// bind the onLoad handler to the image, this handler should append the loaded image
		// to the overlay and take care of all animations
		image.on('load', A.bind(instance._onLoadImage, instance));

		// set the src of the image to be loaded on the placeholder image
		image.attr(SRC, src);
	},

	hasLink: function(index) {
		var instance = this;

		return instance.getLink(index);
	},

	hasNext: function() {
		var instance = this;

		return instance.hasLink(
			instance.index + 1
		);
	},

	hasPrev: function() {
		var instance = this;

		return instance.hasLink(
			instance.index - 1
		);
	},

	next: function() {
		var instance = this;
		var index = instance.index;

		if (instance.hasNext()) {
			instance.index = index + 1;

			instance.loadImage(
				instance.getCurrentLink().attr(HREF)
			);
		}
	},

	prev: function() {
		var instance = this;
		var index = instance.index;

		if (instance.hasPrev()) {
			instance.index = index - 1;

			instance.loadImage(
				instance.getCurrentLink().attr(HREF)
			);
		}
	},

	showLoading: function() {
		var instance = this;
		var bodyNode = instance.bodyNode;

		instance.setStdModContent(
			BODY,
			instance.get(LOADING_EL)
		);
	},

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

	hideControls: function() {
		var instance = this;

		instance.get(ARROW_LEFT_EL).hide();
		instance.get(ARROW_RIGHT_EL).hide();
		instance.get(CLOSE_EL).hide();
	},

	hideMask: function() {
		A.ImageViewerMask.hide();
	},

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

	_syncImageViewerUI: function() {
		var instance = this;

		instance._syncControlsUI();
		instance._syncCaptionUI();
		instance._syncInfoUI();
	},

	_syncInfoUI: function() {
		var instance = this;
		var infoEl = instance.get(INFO_EL);

		infoEl.html(
			instance.get(INFO_TEMPLATE)
		);
	},

	/*
	* Listeners
	*/
	_afterRender: function() {
		var instance = this;
		var bodyNode = instance.bodyNode;

		bodyNode.addClass(CSS_IMAGE_VIEWER_BD);
	},

	_afterLoadingChange: function(event) {
		var instance = this;

		if (event.newVal) {
			instance.showLoading();
		}
	},

	_afterVisibleChange: function(event) {
		var instance = this;

		// invoke A.Overlay _afterVisibleChange method
		ImageViewer.superclass._afterVisibleChange.apply(this, arguments)

		instance._syncControlsUI();
	},

	_onClickCloseEl: function(event) {
		var instance = this;

		instance.close();

		event.halt()
	},

	_onClickLeftArrow: function(event) {
		var instance = this;

		instance.prev();

		event.halt()
	},

	_onClickRightArrow: function(event) {
		var instance = this;

		instance.next();

		event.halt()
	},

	_onClickLinks: function(event) {
		var instance = this;
		var target = event.currentTarget;
		var src = target.attr(HREF);

		// set the current index of the clicked image
		instance.index = instance.get(LINKS).indexOf(target);

		instance.showMask();

		instance.show();

		instance.loadImage(src);

		event.preventDefault();
	},

	_onKeyInteraction: function(event) {
		var instance = this;
		var keyCode = event.keyCode;

		if (!instance.get(VISIBLE)) {
			return false; // NOTE: return
		}

		if (keyCode == KEY_LEFT) {
			instance.prev();
		}
		else if (keyCode == KEY_RIGHT) {
			instance.next();
		}
		else if (keyCode == KEY_ESC) {
			instance.close();
		}
	},

	_onLoadImage: function(event) {
		var instance = this;
		var bodyNode = instance.bodyNode;
		var image = event.currentTarget;

		var offsetHeight = image.get(OFFSET_HEIGHT) + PX;
		var offsetWidth = image.get(OFFSET_WIDTH) + PX;
		var imageAnim = instance.get(IMAGE_ANIM);

		if (instance.get(ANIM)) {
			image.setStyle(OPACITY, 0);

			// preparing node to the animation, pluging the NodeFX
			image.unplug(NodeFx).plug(NodeFx);

			image.fx.setAttrs(imageAnim);
			image.fx.stop().run();
		}

		instance.setStdModContent(BODY, image);

		bodyNode.setStyles({
			width: offsetWidth,
			height: offsetHeight
		});

		instance._syncImageViewerUI();

		instance.set(CENTERED, true);
		instance.set(LOADING, false);
	}
});

A.ImageViewer = ImageViewer;

A.ImageViewerMask = new A.OverlayMask().render();

}, '@VERSION', { requires: [ 'aui-base', 'anim', 'overlay-mask', 'substitute', 'image-viewer-css' ] });