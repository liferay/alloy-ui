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

    concat = function() {
        return Array.prototype.slice.call(arguments).join(' ');
    },

    getCN = A.getClassName,

    CSS_ICON = getCN('glyphicon'),
    CSS_ICON_PAUSE = getCN('glyphicon', 'pause'),
    CSS_ICON_PLAY = getCN('glyphicon', 'play'),
    CSS_IMAGE_GALLERY_PAGINATION = getCN('image-gallery', 'pagination'),
    CSS_IMAGE_GALLERY_PAGINATION_THUMB = getCN('image-gallery', 'pagination', 'thumb'),
    CSS_IMAGE_GALLERY_PLAYER = getCN('image-gallery', 'player'),
    CSS_IMAGE_GALLERY_PLAYER_CONTENT = getCN('image-gallery', 'player', 'content'),
    CSS_WELL = getCN('well'),

    TPL_PAGINATION_CONTAINER = '<div class="' + CSS_IMAGE_GALLERY_PAGINATION + '"></div>',
    TPL_PAGINATION_THUMB = '<li><a class="' + concat(CSS_IMAGE_GALLERY_PAGINATION_THUMB, CSS_WELL) +
        '"><img src="{src}" /></a></li>',
    TPL_PLAYER_CONTAINER = '<div class="' + CSS_IMAGE_GALLERY_PLAYER + '"></div>',
    TPL_PLAYER_CONTENT = '<span class="' + CSS_IMAGE_GALLERY_PLAYER_CONTENT + '"></span>';

/**
 * A base class for `A.ImageGallery`, providing:
 *
 * - Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)
 * - Displays an image in a Overlay
 * - Displays list of thumbnails of the images as a control
 * - Slide show functionalities (i.e., play, pause etc)
 * - Keyboard navigation support
 *
 * Check the [live demo](http://alloyui.com/examples/image-viewer/gallery/).
 *
 * @class A.ImageGallery
 * @extends A.ImageViewer
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var ImageGallery = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'image-gallery',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.ImageGallery`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * If `true` the slide show will be played when the
         * `A.ImageGallery` is displayed.
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
         * [A.Pagination](A.Pagination.html) configuration Object. The
         * `A.Pagination` handles the thumbnails control.
         *
         * @attribute pagination
         * @default [A.Pagination](A.Pagination.html) configuration Object.
         * @type Object
         */
        pagination: {
            value: {},
            setter: function(value) {
                var instance = this;

                return A.merge({
                        formatter: A.bind(instance._thumbnailFormatter, instance),
                        after: {
                            changeRequest: function(event) {
                                // fire changeRequest from `A.ImageGallery` passing
                                // the "state" object from Pagination
                                instance.fire(
                                    'changeRequest', {
                                        lastState: event.lastState,
                                        state: event.state
                                    }
                                );
                            }
                        },
                        render: instance.get('paginationEl'),
                        showControls: false
                    },
                    value
                );
            },
            validator: isObject
        },

        /**
         * Element which contains the [A.Pagination](A.Pagination.html) with the
         * thumbnails.
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
         * Stores the [A.Pagination](A.Pagination.html) instance.
         *
         * @attribute paginationInstance
         * @default null
         * @type A.Pagination
         */
        paginationInstance: {
            value: null
        },

        /**
         * If `true` the slide show is paused.
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
         * If `true` the slide show is playing.
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
            value: '(playing)',
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
         * Shows the player controls (i.e., pause and show buttons).
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
         * [A.Toolbar](A.Toolbar.html) with a play, and pause buttons.
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
         * If `true` will use the original image as thumbnails.
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
     * @property EXTENDS
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
         * Stores the `A.later` reference.
         *
         * @property _timer
         * @type Number
         * @protected
         */
        _timer: null,

        /**
         * Creates the DOM structure for the `A.ImageGallery`. Lifecycle.
         *
         * @method renderUI
         * @protected
         */
        renderUI: function() {
            var instance = this;

            ImageGallery.superclass.renderUI.apply(this, arguments);

            instance._renderPagination();

            if (instance.get('showPlayer')) {
                instance._renderPlayer();
            }
        },

        /**
         * Bind the events on the `A.ImageGallery` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this;

            ImageGallery.superclass.bindUI.apply(this, arguments);

            instance.on('playingChange', instance._onPlayingChange);
            instance.on('pausedChange', instance._onPausedChange);
            instance.after('currentIndexChange', instance._onCurrentIndexChange);

            instance.publish('changeRequest', {
                defaultFn: this._changeRequest
            });
        },

        /**
         * Destructor lifecycle implementation for the `A.ImageGallery` class.
         * Purges events attached to the node (and all child nodes).
         *
         * @method destroy
         * @protected
         */
        destroy: function() {
            var instance = this;

            ImageGallery.superclass.destroy.apply(this, arguments);

            instance.get('paginationInstance').destroy();
            instance.toolbar.destroy();
        },

        /**
         * Hides the [A.Pagination](A.Pagination.html) with the thumbnails list.
         *
         * @method hidePagination
         */
        hidePagination: function() {
            var instance = this;

            instance.get('paginationEl').hide();
        },

        /**
         * Pauses the slide show.
         *
         * @method pause
         */
        pause: function() {
            var instance = this;

            instance.set('paused', true);
            instance.set('playing', false);

            instance._syncInfoUI();
        },

        /**
         * Plays the slide show.
         *
         * @method play
         */
        play: function() {
            var instance = this;

            instance.set('paused', false);
            instance.set('playing', true);

            instance._syncInfoUI();
        },

        /**
         * Shows the [A.Pagination](A.Pagination.html) with the thumbnails list.
         *
         * @method showPagination
         */
        showPagination: function() {
            var instance = this;

            instance.get('paginationEl').show();
        },

        /**
         * Cancels the timer between slides.
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
         * Fired after `currentIndex` changes.
         *
         * @method _onCurrentIndexChange
         * @protected
         */
        _onCurrentIndexChange: function() {
            this.get('paginationInstance')._dispatchRequest({
                page: this.get('currentIndex') + 1
            });
        },

        /**
         * Render the [A.Pagination](A.Pagination.html) with the thumbnails.
         *
         * @method _renderPagination
         * @protected
         */
        _renderPagination: function() {
            var instance = this;
            var paginationEl = instance.get('paginationEl');

            A.one('body').append(
                paginationEl.hide()
            );

            var paginationInstance = new A.Pagination(
                instance.get('pagination')
            ).render();

            instance.set('paginationInstance', paginationInstance);
        },

        /**
         * Render the player controls.
         *
         * @method _renderPlayer
         * @protected
         */
        _renderPlayer: function() {
            var instance = this;
            var paginationEl = instance.get('paginationEl');
            var playerContent = A.Node.create(TPL_PLAYER_CONTENT);

            paginationEl.append(
                A.Node.create(TPL_PLAYER_CONTAINER).append(playerContent)
            );

            instance.toolbar = new A.Toolbar(
                instance.get('toolbar')
            ).render(playerContent);
        },

        /**
         * Sets the `A.Toolbar` instance.
         *
         * @method _setToolbar
         * @param value
         * @protected
         */
        _setToolbar: function(value) {
            var instance = this;

            if (instance.get('showPlayer')) {
                value = A.merge({
                    children: [
                        [
                            {
                                icon: [CSS_ICON, CSS_ICON_PLAY].join(' '),
                                on: {
                                    click: A.bind(instance.play, instance)
                                }
                            },
                            {
                                icon: [CSS_ICON, CSS_ICON_PAUSE].join(' '),
                                on: {
                                    click: A.bind(instance.pause, instance)
                                }
                            }
                        ]
                    ]
                }, value);
            }

            return value;
        },

        /**
         * Starts the timer between slides.
         *
         * @method _startTimer
         * @protected
         */
        _startTimer: function() {
            var instance = this;
            var delay = instance.get('delay');

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

            if (instance.get('visible')) {
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
                if (instance.get('repeat')) {
                    instance.set('currentIndex', -1);
                }
                else {
                    instance._cancelTimer();
                }
            }

            instance.next();
        },

        /**
         * Changes the UI when click on a thumbnail.
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
            if (!instance.get('visible')) {
                return false; // NOTE: return
            }

            // check if the lastState page number is different from the newState
            // page number.
            if (!lastState || (lastState && lastState.page !== page)) {
                instance.set('currentIndex', page - 1);

                instance._processChangeRequest();
            }

            var linksCount = instance.get('links').size(),
                paginationInstance = instance.get('paginationInstance'),
                total = paginationInstance.get('total');

            if (linksCount > total) {
                var offset = parseInt(page / total, 10) * total + 1;

                if (page % total === 0) {
                    offset -= total;
                }

                page = page % total || total;

                paginationInstance.set('offset', offset);

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

            // restart the timer if the user change the image, respecting the
            // paused state
            var paused = instance.get('paused');
            var playing = instance.get('playing');

            if (playing && !paused) {
                instance._startTimer();
            }
        },

        /**
         * See [_formatter](A.Pagination.html#attr_formatter).
         *
         * @method _thumbnailFormatter
         * @param {Number} pageNumber
         * @protected
         */
        _thumbnailFormatter: function(pageNumber) {
            var instance = this,
                linksCount = instance.get('links').size(),
                index = pageNumber - 1;

            if (pageNumber > linksCount) {
                return '';
            }

            var link = instance.getLink(index),
                thumbSrc = null;

            if (instance.get('useOriginalImage')) {
                thumbSrc = link.attr('href');
            }
            else {
                // try to find a inner thumbnail image to show on the pagination
                var innerImage = link.one('img');

                if (innerImage) {
                    thumbSrc = innerImage.attr('src');
                }
            }

            return L.sub(TPL_PAGINATION_THUMB, {
                src: thumbSrc
            });
        },

        /**
         * Gets the [infoTemplate](A.ImageViewer.html#attr_infoTemplate) template.
         *
         * @method _getInfoTemplate
         * @param {String} v template
         * @protected
         * @return {String} Parsed string.
         */
        _getInfoTemplate: function() {
            var label;
            var instance = this;
            var paused = instance.get('paused');
            var playing = instance.get('playing');

            if (playing) {
                label = instance.get('playingLabel');
            }
            else if (paused) {
                label = instance.get('pausedLabel');
            }

            return concat(
                ImageGallery.superclass._getInfoTemplate.apply(this, arguments),
                label
            );
        },

        /**
         * Fires after the value of the
         * [visible](A.ImageViewer.html#attr_visible) attribute change.
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
                if (instance.get('autoPlay')) {
                    instance.play();
                }
            }
        },

        /**
         * Fires before the value of the
         * [paused](A.ImageGallery.html#attr_paused) attribute change.
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
         * [playing](A.ImageGallery.html#attr_playing) attribute change.
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
});

A.ImageGallery = ImageGallery;
