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
	ICON = 'icon',
	IMAGE_GALLERY = 'image-gallery',
	IMG = 'img',
	LEFT = 'left',
	LINKS = 'links',
	OFFSET = 'offset',
	OFFSET_WIDTH = 'offsetWidth',
	PAGE = 'page',
	PAGINATION = 'pagination',
	PAGINATION_EL = 'paginationEl',
	PAGINATION_INSTANCE = 'paginationInstance',
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
	TOTAL = 'total',
	USE_ORIGINAL_IMAGE = 'useOriginalImage',
	VIEWPORT_REGION = 'viewportRegion',
	VISIBLE = 'visible',
	WELL = 'well',

	concat = function() {
		return Array.prototype.slice.call(arguments).join(SPACE);
	},

	getCN = A.getClassName,

	CSS_ICON_PAUSE = getCN(ICON, PAUSE),
	CSS_ICON_PLAY = getCN(ICON, PLAY),
	CSS_IMAGE_GALLERY_PAGINATION = getCN(IMAGE_GALLERY, PAGINATION),
	CSS_IMAGE_GALLERY_PAGINATION_THUMB = getCN(IMAGE_GALLERY, PAGINATION, THUMB),
	CSS_IMAGE_GALLERY_PLAYER = getCN(IMAGE_GALLERY, PLAYER),
	CSS_IMAGE_GALLERY_PLAYER_CONTENT = getCN(IMAGE_GALLERY, PLAYER, CONTENT),
	CSS_WELL = getCN(WELL),

	TEMPLATE_PLAYING_LABEL = '(playing)',

	TPL_PAGINATION_CONTAINER = '<div class="' + CSS_IMAGE_GALLERY_PAGINATION + '"></div>',
	TPL_PAGINATION_THUMB = '<li><a class="' + concat(CSS_IMAGE_GALLERY_PAGINATION_THUMB, CSS_WELL) +'"><img src="{src}" /></a></li>',
	TPL_PLAYER_CONTAINER = '<div class="' + CSS_IMAGE_GALLERY_PLAYER + '"></div>',
	TPL_PLAYER_CONTENT = '<span class="' + CSS_IMAGE_GALLERY_PLAYER_CONTENT + '"></span>';

/**
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
 * Check the [live demo](http://alloyui.com/examples/image-viewer/gallery/).
 *
 * @class A.ImageGallery
 * @extends A.ImageViewer
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
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
			 * @type Boolean
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
			 * <a href="Pagination.html">Pagination</a> configuration Object. The
			 * <code>Pagination</code> handles the thumbnails control.
			 *
			 * @attribute pagination
			 * @default <a href="Pagination.html">Pagination</a> configuration Object.
			 * @type Object
			 */
			pagination: {
				value: {},
				setter: function(value) {
					var instance = this;

					return A.merge(
						{
							formatter: A.bind(instance._thumbnailFormatter, instance),
							after: {
								changeRequest: function(event) {
									// fire changeRequest from ImageGallery passing the "state" object from Pagination
									instance.fire(
										'changeRequest',
										{
											lastState: event.lastState,
											state: event.state
										}
									);
								}
							},
							render: instance.get(PAGINATION_EL),
							showNavigation: false
						},
						value
					);
				},
				validator: isObject
			},

			/**
			 * Element which contains the <a href="Pagination.html">Pagination</a>
			 * with the thumbnails.
			 *
			 * @attribute paginationEl
			 * @default Generated HTML div.
			 * @readOnly
			 * @type Node
			 */
			paginationEl: {
				readyOnly: true,
				valueFn: function() {
					return A.Node.create(TPL_PAGINATION_CONTAINER);
				}
			},

			/**
			 * Stores the <a href="Pagination.html">Pagination</a> instance.
			 *
			 * @attribute paginationInstance
			 * @default null
			 * @type Pagination
			 */
			paginationInstance: {
				value: null
			},

			/**
			 * If <code>true</code> the slide show is paused.
			 *
			 * @attribute paused
			 * @default false
			 * @type Boolean
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
			 * @type Boolean
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
			 * @type Boolean
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
			 * @type Boolean
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
				setter: '_setToolbar',
				validator: isObject
			},

			/**
			 * If <code>true</code> will use the original image as thumbnails.
			 *
			 * @attribute useOriginalImage
			 * @default false
			 * @type Boolean
			 */
			useOriginalImage: {
				value: false,
				validator: isBoolean
			}
		},

		/**
		 * Static property used to define which component it extends.
		 *
		 * @property ImageGallery.EXTENDS
		 * @type Object
		 * @static
		 */
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

				instance._renderPagination();

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

				instance.on('playingChange', instance._onPlayingChange);
				instance.on('pausedChange', instance._onPausedChange);
				instance.on('currentIndexChange', instance._onCurrentIndexChange);

				instance.publish('changeRequest', { defaultFn: this._changeRequest });
			},

			/**
			 * Destructor lifecycle implementation for the ImageGallery class.
			 * Purges events attached to the node (and all child nodes).
			 *
			 * @method destroy
			 * @protected
			 */
			destroy: function() {
				var instance = this;

				ImageGallery.superclass.destroy.apply(this, arguments);

				instance.get(PAGINATION_INSTANCE).destroy();
				instance.toolbar.destroy();
			},

			/**
			 * Hide the <a href="Pagination.html">Pagination</a>
			 * with the thumbnails list.
			 *
			 * @method hidePagination
			 */
			hidePagination: function() {
				var instance = this;

				instance.get(PAGINATION_EL).hide();
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
					A.ImageViewer.superclass.show.apply(this, arguments);

					// changeRequest on paginationInstance with the new page set
					var paginationInstance = instance.get(PAGINATION_INSTANCE);

					paginationInstance._dispatchRequest(
						{
							page: instance.get(CURRENT_INDEX) + 1
						}
					);
				}
			},

			/**
			 * Show the <a href="Pagination.html">Pagination</a>
			 * with the thumbnails list.
			 *
			 * @method showPagination
			 */
			showPagination: function() {
				var instance = this;

				instance.get(PAGINATION_EL).show();
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
			 * Render the <a href="Pagination.html">Pagination</a> with the thumbnails.
			 *
			 * @method _renderPagination
			 * @protected
			 */
			_renderPagination: function() {
				var instance = this;
				var paginationEl = instance.get(PAGINATION_EL);

				A.one(BODY).append(
					paginationEl.hide()
				);

				var paginationInstance = new A.Pagination(
					instance.get(PAGINATION)
				)
				.render();

				instance.set(PAGINATION_INSTANCE, paginationInstance);
			},

			/**
			 * Render the player controls.
			 *
			 * @method _renderPlayer
			 * @protected
			 */
			_renderPlayer: function() {
				var instance = this;
				var paginationEl = instance.get(PAGINATION_EL);
				var playerContent = A.Node.create(TPL_PLAYER_CONTENT);

				paginationEl.append(
					A.Node.create(TPL_PLAYER_CONTAINER).append(playerContent)
				);

				instance.toolbar = new A.Toolbar(
					instance.get(TOOLBAR)
				)
				.render(playerContent);
			},

			/**
			 * Set the Toolbar instance.
			 *
			 * @method _setToolbar
			 * @param value
			 * @protected
			 */
			_setToolbar: function(value) {
				var instance = this;

				if (instance.get(SHOW_PLAYER)) {
					value = A.merge(
						{
							children: [
								[
									{
										icon: CSS_ICON_PLAY,
										on: {
											click: A.bind(instance.play, instance)
										}
									},
									{
										icon: CSS_ICON_PAUSE,
										on: {
											click: A.bind(instance.pause, instance)
										}
									}
								]
							]
						},
						value
					);
				}

				return value;
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
					instance.showPagination();
				}
				else {
					instance.hidePagination();

					instance._cancelTimer();
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
				var newState = event.state;
				var lastState = event.lastState;
				var page = newState.page;

				// only update the paginator UI when the Widget is visible
				if (!instance.get(VISIBLE)) {
					return false; // NOTE: return
				}

				// check if the lastState page number is different from the newState page number.
				if (!lastState || (lastState && lastState.page != page)) {
					instance.set(CURRENT_INDEX, page - 1);

					instance._processChangeRequest();
				}

				var linksCount = instance.get(LINKS).size(),
					paginationInstance = instance.get(PAGINATION_INSTANCE),
					total = paginationInstance.get(TOTAL);

				if (linksCount > total) {
					var offset = parseInt(page / total, 10) * total + 1;

					if (page % total === 0) {
						offset -= total;
					}

					page = page % total || total;

					paginationInstance.set(OFFSET,  offset);

					paginationInstance.setState({
						page: page
					});
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
			 * See <a href="Pagination.html#method__formatter">_formatter</a>.
			 *
			 * @method _thumbnailFormatter
			 * @param {Number} pageNumber
			 * @protected
			 */
			_thumbnailFormatter: function(pageNumber) {
				var instance = this,
					paginationInstance = instance.get(PAGINATION_INSTANCE),
					linksCount = instance.get(LINKS).size(),
					index = pageNumber - 1;

				if (pageNumber > linksCount) {
					return '';
				}

				var link = instance.getLink(index),
					thumbSrc = null;

				if (instance.get(USE_ORIGINAL_IMAGE)) {
					thumbSrc = link.attr(HREF);
				}
				else {
					// try to find a inner thumbnail image to show on the pagination
					var innerImage = link.one(IMG);

					if (innerImage) {
						thumbSrc = innerImage.attr(SRC);
					}
				}

				return L.sub(TPL_PAGINATION_THUMB, {
					src: thumbSrc
				});
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
			 * Fire after the value of the
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
					if (instance.get(AUTO_PLAY)) {
						instance.play();
					}
				}
			},

			/**
			 * Fire before the value of the
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
			 * Fire before the value of the
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