YUI.add('aui-carousel', function (A, NAME) {

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

    SELECTOR_MENU_INDEX = '.' + CSS_MENU_INDEX;

/**
 * A base class for Carousel.
 *
 * Check the [live demo](http://alloyui.com/examples/carousel/).
 *
 * @class A.Carousel
 * @extends A.ImageViewerBase
 * @uses A.ImageViewerSlideshow
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/carousel/basic-markup.html
 * @include http://alloyui.com/examples/carousel/basic.js
 */

A.Carousel = A.Base.create('carousel', A.ImageViewerBase, [A.ImageViewerSlideshow], {
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
            nodeMenuChange: this._afterNodeMenuChange,
            nodeMenuItemSelectorChange: this._afterNodeMenuItemSelectorChange,
            nodeMenuPositionChange: this._afterNodeMenuPositionChange,
            pauseOnHoverChange: this._afterPauseOnHoverChange
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
     * Fired after `nodeMenu` attribute changes.
     *
     * @method _afterNodeMenuChange
     * @protected
     */
    _afterNodeMenuChange: function() {
        this._bindPauseOnHover();

        this._syncControlsUI();
        this._syncNodeMenuPositionUI();
    },

    /**
     * Fired after `nodeMenuItemSelector` attribute changes.
     *
     * @method _afterNodeMenuItemSelectorChange
     * @protected
     */
    _afterNodeMenuItemSelectorChange: function() {
        this._bindControls();
    },

    /**
     * Fired after `nodeMenuPosition` attribute changes.
     *
     * @method _afterNodeMenuPositionChange
     * @protected
     */
    _afterNodeMenuPositionChange: function() {
        this._syncNodeMenuPositionUI();
    },

    /**
     * Fired after `pauseOnHover` attribute changes.
     *
     * @method _afterPauseOnHoverChange
     * @protected
     */
    _afterPauseOnHoverChange: function() {
        this._bindPauseOnHover();
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
     * Overrides the original method for rendering the player button. The button
     * is already rendered together with the menu by `_renderControls`, so this is
     * just storing its reference in the right variable.
     *
     * @method _renderPlayer
     * @protected
     */
    _renderPlayer: function() {
        this._player = this.get('nodeMenu').one('.' + CSS_MENU_PLAY);
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
            this._player.replaceClass(CSS_MENU_PLAY, CSS_MENU_PAUSE);
        }
        else {
            this._player.replaceClass(CSS_MENU_PAUSE, CSS_MENU_PLAY);
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


}, '3.0.1', {
    "requires": [
        "anim",
        "node-event-delegate",
        "aui-image-viewer-base",
        "aui-image-viewer-slideshow"
    ],
    "skinnable": true
});
