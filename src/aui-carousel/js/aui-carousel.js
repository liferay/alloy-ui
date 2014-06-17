/**
 * The Carousel Component
 *
 * @module aui-carousel
 */

var Lang = A.Lang,

    getCN = A.getClassName,

    CSS_IMAGE_VIEWER_CONTROL = getCN('image', 'viewer', 'base', 'control'),
    CSS_IMAGE_VIEWER_CONTROL_LEFT = getCN('image', 'viewer', 'base', 'control', 'left'),
    CSS_IMAGE_VIEWER_CONTROL_RIGHT = getCN('image', 'viewer', 'base', 'control', 'right'),

    CSS_ITEM = getCN('image', 'viewer', 'base', 'image'),
    CSS_ITEM_ACTIVE_TRANSITION = getCN('carousel', 'item', 'active', 'transition'),
    CSS_ITEM_TRANSITION = getCN('carousel', 'item', 'transition'),
    CSS_MENU = getCN('carousel', 'menu'),
    CSS_MENU_ACTIVE = getCN('carousel', 'menu', 'active'),
    CSS_MENU_INDEX = getCN('carousel', 'menu', 'index'),
    CSS_MENU_ITEM = getCN('carousel', 'menu', 'item'),
    CSS_MENU_NEXT = getCN('carousel', 'menu', 'next'),
    CSS_MENU_PLAY = getCN('carousel', 'menu', 'play'),
    CSS_MENU_PAUSE = getCN('carousel', 'menu', 'pause'),
    CSS_MENU_PREV = getCN('carousel', 'menu', 'prev'),
    CSS_MENU_ITEM_DEFAULT = [CSS_MENU_ITEM, CSS_MENU_INDEX].join(' '),
    CSS_MENU_ITEM_ACTIVE = [CSS_MENU_ITEM, CSS_MENU_INDEX, CSS_MENU_ACTIVE].join(' '),
    CSS_OUTSIDE_MENU = getCN('carousel', 'outside', 'menu'),

    NODE_MENU_INSIDE = 'inside',
    NODE_MENU_OUTSIDE = 'outside',

    SELECTOR_MENU_INDEX = '.' + CSS_MENU_INDEX,
    SELECTOR_MENU_PAUSE = '.' + CSS_MENU_PAUSE,
    SELECTOR_MENU_PLAY = '.' + CSS_MENU_PLAY,
    SELECTOR_MENU_PLAY_OR_PAUSE = [SELECTOR_MENU_PLAY, SELECTOR_MENU_PAUSE].join();

/**
 * A base class for Carousel.
 *
 * Check the [live demo](http://alloyui.com/examples/carousel/).
 *
 * @class A.Carousel
 * @extends A.Component
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/carousel/basic-markup.html
 * @include http://alloyui.com/examples/carousel/basic.js
 */

A.Carousel = A.Base.create('carousel', A.ImageViewerBase, [], {
    TPL_ITEM: '<li><a class="' + CSS_MENU_ITEM + ' ' +
        CSS_IMAGE_VIEWER_CONTROL + ' {cssClasses}">{index}</a></li>',

    TPL_MENU: '<div class="' + CSS_MENU + '"><menu>' +
        '<li><a class="' + CSS_MENU_ITEM + ' ' + CSS_MENU_PLAY + ' ' +
        CSS_IMAGE_VIEWER_CONTROL + '"></a></li>' +
        '<li><a class="' + CSS_MENU_ITEM + ' ' + CSS_MENU_PREV + ' ' +
        CSS_IMAGE_VIEWER_CONTROL_LEFT + ' ' + CSS_IMAGE_VIEWER_CONTROL + '"></a></li>' +
        '{items}' +
        '<li><a class="' + CSS_MENU_ITEM + ' ' + CSS_MENU_NEXT + ' ' +
        CSS_IMAGE_VIEWER_CONTROL_RIGHT + ' ' + CSS_IMAGE_VIEWER_CONTROL + '"></a></li>' +
        '</menu></div>',

    /**
     * Bind the events on the `A.Carousel` UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        A.Carousel.superclass.bindUI.apply(this, arguments);

        this.after({
            intervalTimeChange: this._afterIntervalTimeChange,
            nodeMenuChange: this._afterNodeMenuChange,
            nodeMenuItemSelectorChange: this._bindControls,
            nodeMenuPositionChange: this._syncNodeMenuPositionUI,
            pauseOnHoverChange: this._bindPauseOnHover,
            playingChange: this._syncPlayUI
        });

        this._bindPauseOnHover();
    },

    /**
     * Sync the `A.Carousel` UI. Lifecycle.
     *
     * @method syncUI
     * @protected
     */
    syncUI: function() {
        this._syncNodeMenuPositionUI();
        this._syncPlayUI();
    },

    /**
     * Destructor implementation for the `A.Carousel` class. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        if (this._menuClickDelegateHandler) {
            this._menuClickDelegateHandler.detach();
        }
    },

    /**
     * Set the `currentIndex` attribute which
     * activates a certain item on `A.Carousel` based on its index.
     *
     * @method item
     * @param {Number} val
     */
    item: function(val) {
        this.set('currentIndex', val);
    },

    /**
     * Set the `playing` attribute to false which pauses the animation.
     *
     * @method pause
     */
    pause: function() {
        this.set('playing', false);
    },

    /**
     * Set the `playing` attribute to true which starts the animation.
     *
     * @method play
     */
    play: function() {
        this.set('playing', true);
    },

    /**
     * Fired after the `currentIndex` attribute is set.
     *
     * @method _afterCurrentIndexChange
     * @protected
     */
    _afterCurrentIndexChange: function() {
        A.Carousel.superclass._afterCurrentIndexChange.apply(this, arguments);

        if (this.get('playing')) {
            this._createIntervalRotationTask();
        }
    },

    /**
     * Fired after `intervalTime` attribute changes.
     *
     * @method _afterIntervalTimeChange
     * @protected
     */
    _afterIntervalTimeChange: function() {
        this._clearIntervalRotationTask();
        this._createIntervalRotationTask();
    },

    /**
     * Fired after `nodeMenu` attribute changes.
     *
     * @method _afterNodeMenuChange
     * @protected
     */
    _afterNodeMenuChange: function() {
        this._bindPauseOnHover();

        this._syncControlsUI();
        this._syncNodeMenuPositionUI();
        this._syncPlayUI();
    },

    /**
     * Fired after the `responsive` event.
     *
     * @method _afterResponsive
     * @param {EventFacade} event
     * @protected
     */
    _afterResponsive: function(event) {
        this.get('boundingBox').all('.image-viewer-base-image-list, .image-viewer-base-image').setStyles({
            height: event.height,
            width: event.width
        });
    },

    /**
     * Binds the events related to the carousel's controls.
     *
     * @method _bindControls
     * @protected
     */
    _bindControls: function() {
        if (this._menuClickDelegateHandler) {
            this._menuClickDelegateHandler.detach();
        }

        this._menuClickDelegateHandler = this.get('boundingBox').delegate(
            'click',
            this._onClickControl,
            this.get('nodeMenuItemSelector'),
            this
        );
    },

    /**
     * Binds the events related to the pause on hover behavior.
     *
     * @method _bindPauseOnHover
     * @protected
     */
    _bindPauseOnHover: function() {
        var boundingBox = this.get('boundingBox'),
            nodeMenu = this.get('nodeMenu'),
            pauseOnHover = this.get('pauseOnHover');

        if (pauseOnHover) {
            this.hoverEventHandles = [
                boundingBox.on('mouseenter', A.bind(this._onCarouselEnter, this)),
                boundingBox.on('mouseleave', A.bind(this._onCarouselLeave, this)),
                nodeMenu.on('mouseenter', A.bind(this._onMenuEnter, this)),
                nodeMenu.on('mouseleave', A.bind(this._onMenuLeave, this))
            ];
        }
        else {
            (new A.EventHandle(this.hoverEventHandles)).detach();
            this.hoverEventHandles = null;
        }
    },

    /**
     * Clear the rotation task interval.
     *
     * @method _clearIntervalRotationTask
     * @protected
     */
    _clearIntervalRotationTask: function() {
        clearInterval(this._intervalRotationTask);
    },

    /**
     * Create an timer for the rotation task.
     *
     * @method _createIntervalRotationTask
     * @protected
     */
    _createIntervalRotationTask: function() {
        this._clearIntervalRotationTask();

        this._intervalRotationTask = setInterval(
            A.bind(this.next, this),
            this.get('intervalTime') * 1000
        );
    },

    /**
     * Creates the default menu node.
     *
     * @method _renderMenu
     * @protected
     */
    _createMenuNode: function() {
        var currentIndex = this.get('currentIndex'),
            items = [],
            i,
            len = this.get('sources').length,
            menu;

        for (i = 0; i < len; i++) {
            items.push(
                Lang.sub(this.TPL_ITEM, {
                    cssClasses: currentIndex === i ? CSS_MENU_ITEM_ACTIVE : CSS_MENU_ITEM_DEFAULT,
                    index: i
                })
            );
        }

        menu = A.Node.create(Lang.sub(this.TPL_MENU, {
            items: items.join(' ')
        }));

        return menu;
    },

    /**
     * Default behavior for animating the current image in the viewer.
     *
     * @method _defAnimateFn
     * @protected
     */
    _defAnimateFn: function() {
        if (!this.get('playing')) {
            return;
        }

        A.Carousel.superclass._defAnimateFn.apply(this, arguments);

        var currentImage,
            previousImage;

        if (A.Lang.isNumber(this._previousIndex)) {
            previousImage = this._getImageContainerAtIndex(this._previousIndex);
            currentImage = this._getCurrentImageContainer(this._previousIndex);

            previousImage.addClass(CSS_ITEM_TRANSITION);
            currentImage.addClass(CSS_ITEM_ACTIVE_TRANSITION);

            this._animation.onceAfter('end', function() {
                previousImage.removeClass(CSS_ITEM_TRANSITION);
                currentImage.removeClass(CSS_ITEM_ACTIVE_TRANSITION);
            });
        }
    },

    /**
     * Checks if the mouse is inside the menu region.
     *
     * @method  _isMouseInsideMenu
     * @param  {EventFacade} event
     * @return {Boolean}
     */
    _isMouseInsideMenu: function(event) {
        var region = this.get('nodeMenu').get('region');
        return (region.left > event.clientX || event.clientX > region.right ||
            region.top > event.clientY || event.clientY > region.bottom);
    },

    /**
     * Fired when the mouse enters the carousel. If it has also entered the
     * menu the slideshow will be resumed.
     *
     * @method _onCarouselEnter
     * @param {EventFacade} event
     * @protected
     */
    _onCarouselEnter: function(event) {
        if (this._isMouseInsideMenu(event)) {
            this._pauseOnEnter();
        }
    },

    /**
     * Fired when the mouse leaves the carousel, which will resume the slideshow.
     *
     * @method _onCarouselLeave
     * @protected
     */
    _onCarouselLeave: function() {
        this._playOnLeave();
    },

    /**
     * Fired when one of the carousel's controls is clicked.
     *
     * @method _onClickControl
     * @param event
     * @protected
     */
    _onClickControl: function(event) {
        A.Carousel.superclass._onClickControl.apply(this, arguments);

        event.preventDefault();

        if (event.currentTarget.hasClass(CSS_MENU_INDEX)) {
            this.set('currentIndex', this._menuNodes.indexOf(event.currentTarget));
        }
        else if (event.currentTarget.test(SELECTOR_MENU_PLAY_OR_PAUSE)) {
            this.set('playing', !this.get('playing'));
        }
    },

    /**
     * Fired when the mouse enters the menu. If it's coming from the carousel
     * the slideshow will be resumed.
     *
     * @method _onMenuEnter
     * @param {EventFacade} event
     * @protected
     */
    _onMenuEnter: function(event) {
        if (event.relatedTarget && event.relatedTarget.hasClass(CSS_ITEM)) {
            this._playOnLeave();
        }
    },

    /**
     * Fired when the mouse leaves the menu. If it's going to the carousel
     * the slideshow will be paused.
     *
     * @method _onMenuLeave
     * @param {EventFacade} event
     * @protected
     */
    _onMenuLeave: function(event) {
        if (event.relatedTarget && event.relatedTarget.hasClass(CSS_ITEM)) {
            this._pauseOnEnter();
        }
    },

    /**
     * Fired on the `responsive` event.
     *
     * @method _onResponsive
     * @protected
     */
    _onResponsive: function() {
        this.get('boundingBox').all('.image-viewer-base-image-list, .image-viewer-base-image').setStyles({
            height: '',
            width: ''
        });
    },

    /**
     * Called when the mouse enters the carousel with pauseOnHover set to
     * true. Pauses the slideshow unless it was already paused.
     *
     * @method _pauseOnEnter
     * @protected
     */
    _pauseOnEnter: function() {
        if (this.get('playing')) {
            this.pause();
            this._pausedOnEnter = true;
        }
    },

    /**
     * Called when the mouse leaves the carousel with pauseOnHover set to
     * true. If the slideshow was paused due to entering the carousel before,
     * this will resume it.
     *
     * @method _playOnLeave
     * @protected
     */
    _playOnLeave: function() {
        if (this._pausedOnEnter) {
            this.play();
            this._pausedOnEnter = false;
        }
    },

    /**
     * Renders the carousel's menu with all its controls.
     *
     * @method _renderControls
     * @protected
     */
    _renderControls: function() {
        this.get('boundingBox').append(this.get('nodeMenu'));
    },

    /**
     * Set the `nodeMenu` attribute.
     *
     * @method _setNodeMenu
     * @param val
     * @protected
     */
    _setNodeMenu: function(val) {
        var nodeMenu = A.one(val) || this._createMenuNode();

        this._menuNodes = nodeMenu.all(SELECTOR_MENU_INDEX);
        return nodeMenu;
    },

    /**
     * Updates the controls, showing or hiding them as necessary.
     *
     * @method _syncControlsUI
     * @protected
     */
    _syncControlsUI: function() {
        var currentIndex = this.get('currentIndex'),
            item = this._menuNodes.item(currentIndex);

        if (item) {
            item.addClass(CSS_MENU_ACTIVE);
        }

        if (A.Lang.isNumber(this._previousIndex)) {
            item = this._menuNodes.item(this._previousIndex);
            if (item) {
                item.removeClass(CSS_MENU_ACTIVE);
            }
        }
    },

    /**
     * Updates the UI according to the value of the `nodeMenuPosition` attribute.
     *
     * @method _syncNodeMenuPositionUI
     * @protected
     */
    _syncNodeMenuPositionUI: function() {
        var nodeMenuPosition = this.get('nodeMenuPosition');

        this.get('boundingBox').toggleClass(CSS_OUTSIDE_MENU, nodeMenuPosition === NODE_MENU_OUTSIDE);

        if (nodeMenuPosition === NODE_MENU_OUTSIDE) {
            this.set('gutter', [0, this.get('nodeMenu').get('offsetHeight')]);
        }
        else {
            this.set('gutter', [0, 0]);
        }
    },

    /**
     * Updates the play/pause button according to the value of the `playing`
     * attribute.
     *
     * @method _syncPlayUI
     * @protected
     */
    _syncPlayUI: function() {
        var menuPlayItem = this.get('nodeMenu').one(SELECTOR_MENU_PLAY_OR_PAUSE);

        if (this.get('playing')) {
            this._createIntervalRotationTask();
            if (menuPlayItem) {
                menuPlayItem.replaceClass(CSS_MENU_PLAY, CSS_MENU_PAUSE);
            }
        }
        else {
            this._clearIntervalRotationTask();
            if (menuPlayItem) {
                menuPlayItem.replaceClass(CSS_MENU_PAUSE, CSS_MENU_PLAY);
            }
        }
    },

    /**
     * Validates the given value for the `nodeMenuPosition` attribute.
     *
     * @method _validateNodeMenuPosition
     * @param {String} val The value to be validated
     * @return {Boolean} `true` if the value is valid or `false` otherwise
     * @protected
     */
    _validateNodeMenuPosition: function(val) {
        return val === NODE_MENU_INSIDE || val === NODE_MENU_OUTSIDE;
    }
}, {
    /**
     * Static property used to define the default attribute
     * configuration for the `A.Carousel`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * If the carousel will be circular or not.
         *
         * @attribute circular
         * @default true
         * @type Boolean
         */
        circular: {
            value: true,
            validator: A.Lang.isBoolean
        },

        /**
         * The node for the control that shows the next image.
         *
         * @attribute controlNext
         * @default null
         * @type Node
         */
        controlNext: {
            setter: function(val) {
                return val ? val : this.get('nodeMenu').one('.' + CSS_MENU_NEXT);
            },
            value: null,
            validator: A.Lang.isNode
        },

        /**
         * The node for the control that shows the previous image.
         *
         * @attribute controlPrevious
         * @default null
         * @type Node
         */
        controlPrevious: {
            setter: function(val) {
                return val ? val : this.get('nodeMenu').one('.' + CSS_MENU_PREV);
            },
            value: null,
            validator: A.Lang.isNode
        },

        /**
         * Interval time in seconds between an item transition.
         *
         * @attribute intervalTime
         * @default 2
         * @type Number
         */
        intervalTime: {
            value: 2
        },

        /**
         * Node container of the navigation items.
         *
         * @attribute nodeMenu
         * @default null
         * @type Node | String
         */
        nodeMenu: {
            value: null,
            setter: '_setNodeMenu'
        },

        /**
         * CSS selector to match the navigation items.
         *
         * @attribute nodeMenuItemSelector
         * @default .carousel-menu-item
         * @type String
         */
        nodeMenuItemSelector: {
            value: '.' + CSS_MENU_ITEM,
            validator: A.Lang.isString
        },

        /**
         * Position of the menu.
         *
         * @attribute nodeMenuPosition
         * @default 'inside'
         * @type String
         */
        nodeMenuPosition: {
            value: NODE_MENU_INSIDE,
            validator: '_validateNodeMenuPosition'
        },

        /**
         * Determines if `A.Carousel` will pause on mouse enter or play when
         * mouse leave.
         *
         * @attribute pauseOnHover
         * @type Boolean
         */
        pauseOnHover: {
            value: false,
            validator: Lang.isBoolean
        },

        /**
         * Attributes that determines the status of transitions between
         * items.
         *
         * @attribute playing
         * @default true
         * @type Boolean
         */
        playing: {
            value: true,
            validator: Lang.isBoolean
        }
    },

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: A.getClassName('carousel')
});
