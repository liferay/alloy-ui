YUI.add('aui-image-viewer-slideshow', function (A, NAME) {

/**
 * The slideshow functionality for image viewers.
 *
 * @module aui-image-viewer-slideshow
 */

var CSS_ICON_PAUSE = A.getClassName('glyphicon', 'pause'),
    CSS_ICON_PLAY = A.getClassName('glyphicon', 'play'),

    CSS_IMAGE_VIEWER_PLAYER = A.getClassName('image', 'viewer', 'player');

function ImageViewerSlideshow() {}

ImageViewerSlideshow.prototype = {
    TPL_IMAGE_VIEWER_PLAYER: '<div class="text-center ' + CSS_IMAGE_VIEWER_PLAYER +
        '"><div class="text-center glyphicon ' +
        CSS_ICON_PLAY + '" style="cursor: pointer;"></span></div>',

    /**
     * Construction logic executed during instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._slideshowEventHandles = [
            this.after({
                currentIndexChange: this._afterSlideshowCurrentIndexChange,
                intervalTimeChange: this._afterSlideshowIntervalTimeChange,
                playingChange: this._afterSlideshowPlayingChange,
                showPlayerChange: this._afterSlideshowShowPlayerChange
            }),
            A.after(this._afterSlideshowBindUI, this, 'bindUI'),
            A.after(this._afterSlideshowRenderUI, this, 'renderUI'),
            A.after(this._afterSlideshowUISetVisible, this, '_uiSetVisible')
        ];
    },

    /**
     * Destructor implementation.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        if (this._playerEventHandle) {
            this._playerEventHandle.detach();
        }

        (new A.EventHandle(this._slideshowEventHandles)).detach();
    },

    /**
     * Pauses the slideshow.
     *
     * @method pause
     */
    pause: function() {
        this.set('playing', false);
    },

    /**
     * Resumes the slideshow.
     *
     * @method play
     */
    play: function() {
        this.set('playing', true);
    },

    /**
     * Fired after the `bindUI` method runs.
     *
     * @method _afterSlideshowBindUI
     * @protected
     */
    _afterSlideshowBindUI: function() {
        this._bindPlayer();
    },

    /**
     * Fired after the `renderUI` method runs.
     *
     * @method _afterSlideshowRenderUI
     * @protected
     */
    _afterSlideshowRenderUI: function() {
        this._renderPlayer();
    },

    /**
     * Fired after the `currentIndex` attribute changes.
     *
     * @method _afterSlideshowCurrentIndexChange
     * @protected
     */
    _afterSlideshowCurrentIndexChange: function() {
        this._syncTimers();
    },

    /**
     * Fired after the `intervalTime` attribute changes.
     *
     * @method _afterSlideshowIntervalTimeChange
     * @protected
     */
    _afterSlideshowIntervalTimeChange: function() {
        this._syncTimers();
    },

    /**
     * Fired after the `playing` attribute changes.
     *
     * @method _afterSlideshowPlayingChange
     * @protected
     */
    _afterSlideshowPlayingChange: function() {
        this._syncPlaying();
        this._syncTimers();
    },

    /**
     * Fired after the `showPlayer` attribute changes.
     *
     * @method _afterSlideshowShowPlayerChange
     * @protected
     */
    _afterSlideshowShowPlayerChange: function() {
        this._renderPlayer();
        this._syncShowPlayer();
        this._bindPlayer();
    },

    /**
     * Fired after the `_uiSetVisible` method runs.
     *
     * @method _afterSlideshowUISetVisible
     * @protected
     */
    _afterSlideshowUISetVisible: function() {
        if (this.get('visible')) {
            this._syncPlaying();
            this._syncShowPlayer();
            this._syncTimers();
        }
        else {
            this._syncShowPlayer();
            this._clearTimer();
        }
    },

    /**
     * Binds the necessary events for the behavior of the play button.
     *
     * @method _bindPlayer
     * @protected
     */
    _bindPlayer: function() {
        if (this._player && !this._playerEventHandle) {
            this._playerEventHandle = this._player.on('click', A.bind(this._onPlayerClick, this));
        }
    },

    /**
     * Clear the rotation task interval.
     *
     * @method _clearIntervalRotationTask
     * @protected
     */
    _clearTimer: function() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    },

    /**
     * Fired when the play button is clicked.
     *
     * @method _onPlayerClick
     * @protected
     */
    _onPlayerClick: function() {
        this.set('playing', !this.get('playing'));
    },

    /**
     * Renders the player button.
     *
     * @method _renderPlayer
     * @protected
     */
    _renderPlayer: function() {
        if (this.get('showPlayer') && !this._player) {
            this._player = A.Node.create(this.TPL_IMAGE_VIEWER_PLAYER);
            this.get('contentBox').append(this._player);
        }
    },

    /**
     * Create an timer for the rotation task.
     *
     * @method _createIntervalRotationTask
     * @protected
     */
    _startTimer: function() {
        this._clearTimer();

        this._timer = setInterval(
            A.bind(this.next, this),
            this.get('intervalTime') * 1000
        );
    },

    /**
     * Updates the player according to the value of the `playing` attribute.
     *
     * @method _syncPlaying
     * @protected
     */
    _syncPlaying: function() {
        if (!this._player) {
            return;
        }

        if (this.get('playing')) {
            this._player.one('.glyphicon').replaceClass(CSS_ICON_PLAY, CSS_ICON_PAUSE);
        }
        else {
            this._player.one('.glyphicon').replaceClass(CSS_ICON_PAUSE, CSS_ICON_PLAY);
        }
    },

    /**
     * Updates the player according to the value of the `showPlayer` attribute.
     *
     * @method _syncShowPlayer
     * @protected
     */
    _syncShowPlayer: function() {
        if (!this._player) {
            return;
        }

        if (this.get('showPlayer') && this.get('visible')) {
            this._player.show();
        }
        else {
            this._player.hide();
        }
    },

    /**
     * Updates the timers according to the value of the `playing` attribute.
     *
     * @method _syncTimers
     * @protected
     */
    _syncTimers: function() {
        if (this.get('playing')) {
            this._startTimer();
        }
        else {
            this._clearTimer();
        }
    }
};

ImageViewerSlideshow.ATTRS = {
    /**
     * Interval time in seconds between an item transition.
     *
     * @attribute intervalTime
     * @default 2
     * @type Number
     */
    intervalTime: {
        value: 2,
        validator: A.Lang.isNumber
    },

    /**
     * True if the slideshow is playing, or false otherwise.
     *
     * @attribute playing
     * @default true
     * @type Boolean
     */
    playing: {
        value: true,
        validator: A.Lang.isBoolean
    },

    /**
     * Shows the play button.
     *
     * @attribute showPlayer
     * @default true
     * @type {Boolean}
     */
    showPlayer: {
        value: true,
        validator: A.Lang.isBoolean
    }
};

A.ImageViewerSlideshow = ImageViewerSlideshow;


}, '3.0.1', {"requires": ["node", "aui-classnamemanager"]});
