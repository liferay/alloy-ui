AUI.add('image-gallery', function(A) {

/*
* ImageGallery
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
	PLAY = 'play',
	PLAYER = 'player',
	PLAYING = 'playing',
	PX = 'px',
	REPEAT = 'repeat',
	SPACE = ' ',
	SRC = 'src',
	THUMB = 'thumb',
	TOOLSET = 'toolSet',
	TOOLSET_INSTANCE = 'toolSetInstance',
	TOTAL_LINKS = 'totalLinks',
	USE_ORIGINAL_IMAGE = 'useOriginalImage',
	VIEWPORT_REGION = 'viewportRegion',
	VISIBLE = 'visible',

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	getCN = A.ClassNameManager.getClassName,

	CSS_IMAGE_GALLERY_PAGINATOR = getCN(IMAGE_GALLERY, PAGINATOR),
	CSS_IMAGE_GALLERY_PAGINATOR_CONTENT = getCN(IMAGE_GALLERY, PAGINATOR, CONTENT),
	CSS_IMAGE_GALLERY_PAGINATOR_ENTRY = getCN(IMAGE_GALLERY, PAGINATOR, ENTRY),
	CSS_IMAGE_GALLERY_PAGINATOR_LINKS = getCN(IMAGE_GALLERY, PAGINATOR, LINKS),
	CSS_IMAGE_GALLERY_PAGINATOR_THUMB = getCN(IMAGE_GALLERY, PAGINATOR, THUMB),
	CSS_IMAGE_GALLERY_PLAYER = getCN(IMAGE_GALLERY, PLAYER),
	CSS_IMAGE_GALLERY_PLAYER_CONTENT = getCN(IMAGE_GALLERY, PLAYER, CONTENT),
	CSS_OVERLAY_HIDDEN = getCN(OVERLAY, HIDDEN),

	TEMPLATE_PAGINATOR = '<div class="'+CSS_IMAGE_GALLERY_PAGINATOR_CONTENT+'">{PageLinks}</div>',

	TPL_LINK = '<span class="' + CSS_IMAGE_GALLERY_PAGINATOR_ENTRY + '"><span class="' + CSS_IMAGE_GALLERY_PAGINATOR_THUMB+'"></span></span>',
	TPL_LINK_CONTAINER = '<div class="' + CSS_IMAGE_GALLERY_PAGINATOR_LINKS + '"></div>',
	TPL_PAGINATOR_CONTAINER = '<div class="'+concat(CSS_OVERLAY_HIDDEN, CSS_IMAGE_GALLERY_PAGINATOR)+'"></div>',
	TPL_PLAYER_CONTAINER = '<div class="'+CSS_IMAGE_GALLERY_PLAYER+'"></div>',
	TPL_PLAYER_CONTENT = '<span class="'+CSS_IMAGE_GALLERY_PLAYER_CONTENT+'"></span>';


function ImageGallery(config) {
	ImageGallery.superclass.constructor.apply(this, arguments);
}

A.mix(ImageGallery, {
	NAME: IMAGE_GALLERY,

	ATTRS: {
		autoPlay: {
			value: false,
			validator: isBoolean
		},

		delay: {
			value: 10000,
			validator: isNumber
		},

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

		paused: {
			value: false,
			validator: isBoolean
		},

		playing: {
			value: false,
			validator: isBoolean
		},

		repeat: {
			value: true,
			validator: isBoolean
		},

		toolSet: {
			value: {},
			setter: function(value) {
				var instance = this;

				return A.merge(
					{
						tools: [
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

		toolSetInstance: {
			value: null
		},

		useOriginalImage: {
			value: false,
			validator: isBoolean
		}
	}
});

A.extend(ImageGallery, A.ImageViewer, {
	_timer: null,

	/*
	* Lifecycle
	*/
	renderUI: function() {
		var instance = this;

		ImageGallery.superclass.renderUI.apply(this, arguments);

		instance._renderPaginator();
		instance._renderPlayer();
	},

	bindUI: function() {
		var instance = this;

		ImageGallery.superclass.bindUI.apply(this, arguments);

		instance._bindToolSetUI();

		instance.on('playingChange', instance._onPlayingChange);
		instance.on('pausedChange', instance._onPausedChange);
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

	pause: function() {
		var instance = this;

		if (instance.get(PLAYING)) {
			instance.set(PAUSED, true);
		}
	},

	play: function() {
		var instance = this;

		instance.set(PAUSED, false);
		instance.set(PLAYING, true);
	},

	showPaginator: function() {
		var instance = this;

		instance.get(PAGINATOR_EL).removeClass(CSS_OVERLAY_HIDDEN);
	},

	_bindToolSetUI: function() {
		var instance = this;
		var toolSetInstance = instance.get(TOOLSET_INSTANCE);

		var play = toolSetInstance.item(PLAY);
		var pause = toolSetInstance.item(PAUSE);

		play.set(HANDLER, A.bind(instance.play, instance));
		pause.set(HANDLER, A.bind(instance.pause, instance));
	},

	_cancelTimer: function() {
		var instance = this;

		if (instance._timer) {
			instance._timer.cancel();
		}
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

	_renderPlayer: function() {
		var instance = this;
		var paginatorEl = instance.get(PAGINATOR_EL);
		var playerContent = A.Node.create(TPL_PLAYER_CONTENT);

		paginatorEl.append(
			A.Node.create(TPL_PLAYER_CONTAINER).append(playerContent)
		);

		var toolSetInstance = new A.ToolSet(
			instance.get(TOOLSET)
		)
		.render(playerContent);

		instance.set(TOOLSET_INSTANCE, toolSetInstance);
	},

	_restartTimer: function() {
		var instance = this;
		var playing = instance.get(PLAYING);

		instance._cancelTimer();

		if (playing) {
			instance._startTimer();
		}
	},

	_startTimer: function() {
		var instance = this;
		var delay = instance.get(DELAY);

		instance._timer = A.later(delay, instance, instance._syncSlideShow, null, true);
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

			// restart the timer if the user change the image
			var playing = instance.get(PLAYING);

			if (playing) {
				instance._restartTimer();
			}
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
	},

	/*
	* Listeners
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

	_onPausedChange: function(event) {
		var instance = this;
		var paused = event.newVal;

		if (paused) {
			instance._cancelTimer();
		}
	},

	_onPlayingChange: function(event) {
		var instance = this;

		if (event.newVal) {
			instance._startTimer();
		}
	}
});

A.ImageGallery = ImageGallery;

}, '@VERSION', { requires: [ 'image-viewer', 'paginator', 'tool-set' ] });