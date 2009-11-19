AUI.add('image-gallery', function(A) {

/*
* ImageGallery
*/
var L = A.Lang,
	isBoolean = L.isBoolean,
	isObject = L.isObject,
	isString = L.isString,

	BODY = 'body',
	CONTENT = 'content',
	CURRENT_INDEX = 'currentIndex',
	DOT = '.',
	HIDDEN = 'hidden',
	HREF = 'href',
	IMAGE_GALLERY = 'image-gallery',
	IMG = 'img',
	LEFT = 'left',
	OFFSET_WIDTH = 'offsetWidth',
	OVERLAY = 'overlay',
	PAGE = 'page',
	PAGINATOR = 'paginator',
	PAGINATOR_EL = 'paginatorEl',
	PAGINATOR_INSTANCE = 'paginatorInstance',
	PX = 'px',
	SPACE = ' ',
	SRC = 'src',
	THUMB = 'thumb',
	TOTAL_LINKS = 'totalLinks',
	USE_ORIGINAL_IMAGE = 'useOriginalImage',
	VIEWPORT_REGION = 'viewportRegion',
	VISIBLE = 'visible',

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	getCN = A.ClassNameManager.getClassName,

	CSS_OVERLAY_HIDDEN = getCN(OVERLAY, HIDDEN),
	CSS_IMAGE_GALLERY_PAGINATOR = getCN(IMAGE_GALLERY, PAGINATOR),
	CSS_IMAGE_GALLERY_PAGINATOR_ENTRY = getCN(IMAGE_GALLERY, PAGINATOR, 'entry'),
	CSS_IMAGE_GALLERY_PAGINATOR_LINKS = getCN(IMAGE_GALLERY, PAGINATOR, 'links'),
	CSS_IMAGE_GALLERY_PAGINATOR_THUMB = getCN(IMAGE_GALLERY, PAGINATOR, THUMB),
	CSS_IMAGE_GALLERY_PAGINATOR_CONTENT = getCN(IMAGE_GALLERY, PAGINATOR, CONTENT),

	TEMPLATE_PAGINATOR = '<div class="'+CSS_IMAGE_GALLERY_PAGINATOR_CONTENT+'">{PageLinks}</div>',

	TPL_LINK = '<span class="' + CSS_IMAGE_GALLERY_PAGINATOR_ENTRY + '"><span class="' + CSS_IMAGE_GALLERY_PAGINATOR_THUMB+'"></span></span>',
	TPL_LINK_CONTAINER = '<div class="' + CSS_IMAGE_GALLERY_PAGINATOR_LINKS + '"></div>',
	TPL_PAGINATOR_CONTAINER = '<div class="'+concat(CSS_OVERLAY_HIDDEN, CSS_IMAGE_GALLERY_PAGINATOR)+'"></div>';

function ImageGallery(config) {
	ImageGallery.superclass.constructor.apply(this, arguments);
}

A.mix(ImageGallery, {
	NAME: IMAGE_GALLERY,

	ATTRS: {
		paginator: {
			value: {},
			setter: function(value) {
				var instance = this;
				var paginatorEl = instance.get(PAGINATOR_EL);
				var totalLinks = instance.get(TOTAL_LINKS);

				return A.merge(
					{
						containers: paginatorEl,
						pageContainerTemplate: TPL_LINK_CONTAINER,
						pageLinkContent: A.bind(instance._setThumbContent, instance),
						pageLinkTemplate: TPL_LINK,
						template: TEMPLATE_PAGINATOR,
						total: totalLinks,
						on: {
							changeRequest: A.bind(instance._changeRequest, instance)
						}
					},
					value
				);
			},
			validator: isObject
		},

		paginatorEl: {
			readyOnly: true,
			valueFn: function() {
				return A.Node.create(TPL_PAGINATOR_CONTAINER);
			}
		},

		paginatorInstance: {
			value: null
		},

		useOriginalImage: {
			value: false,
			validator: isBoolean
		}
	}
});

A.extend(ImageGallery, A.ImageViewer, {
	/*
	* Lifecycle
	*/
	renderUI: function() {
		var instance = this;

		ImageGallery.superclass.renderUI.apply(this, arguments);

		instance._renderPaginator();
	},

	destroy: function() {
		var instance = this;

		ImageGallery.superclass.destroy.apply(this, arguments);

		instance.get(PAGINATOR_INSTANCE).destroy();
	},

	/*
	* Methods
	*/
	hidePaginator: function() {
		var instance = this;

		instance.get(PAGINATOR_EL).addClass(CSS_OVERLAY_HIDDEN);
	},

	showPaginator: function() {
		var instance = this;

		instance.get(PAGINATOR_EL).removeClass(CSS_OVERLAY_HIDDEN);
	},

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

	_syncControlsUI: function() {
		var instance = this;

		ImageGallery.superclass._syncControlsUI.apply(this, arguments);

		if (instance.get(VISIBLE)) {
			instance._syncSelectedThumbUI();

			instance.showPaginator();
		}
		else {
			instance.hidePaginator();
		}
	},

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

	/*
	* Paginator Methods
	*/
	_changeRequest: function(event) {
		var instance = this;
		var paginatorInstance = event.target;
		var newState = event.state;
		var beforeState = newState.before;
		var page = newState.page;

		// only update the paginator UI when the Overlay is visible
		if (!instance.get(VISIBLE)) {
			return false; // NOTE: return
		}

		var currentIndex = instance.get(CURRENT_INDEX);
		var paginatorIndex = page - 1;

		// check if the beforeState page number is different from the newState page number.
		if (!beforeState || beforeState && (beforeState.page != page)) {
			// updating currentIndex
			instance.set(CURRENT_INDEX, paginatorIndex);

			// loading current index image
			instance.loadImage(
				instance.getCurrentLink().attr(HREF)
			);

			// updating the UI of the paginator
			paginatorInstance.setState(newState);
		}
	},

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

		if (thumbSrc) {
			thumbEl.setStyles({
				// use background to show the thumbnails to take advantage of the background-position: 50% 50%
				backgroundImage: 'url(' + thumbSrc + ')'
			});
		}
	}

	/*
	* Listeners
	*/
});

A.ImageGallery = ImageGallery;

}, '@VERSION', { requires: [ 'image-viewer', 'paginator' ] });