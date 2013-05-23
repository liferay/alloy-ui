/**
 * The Carousel Component
 *
 * @module aui-carousel
 */

var Lang = A.Lang,

    STR_BLANK = ' ',

    CAROUSEL = 'carousel',

    getCN = A.getClassName,

    CSS_ITEM = getCN(CAROUSEL, 'item'),
    CSS_ITEM_ACTIVE = getCN(CAROUSEL, 'item', 'active'),
    CSS_ITEM_TRANSITION = getCN(CAROUSEL, 'item', 'transition'),
    CSS_MENU_ACTIVE = getCN(CAROUSEL, 'menu', 'active'),
    CSS_MENU_INDEX = getCN(CAROUSEL, 'menu', 'index'),
    CSS_MENU_ITEM = getCN(CAROUSEL, 'menu', 'item'),
    CSS_MENU_NEXT = getCN(CAROUSEL, 'menu', 'next'),
    CSS_MENU_PLAY = getCN(CAROUSEL, 'menu', 'play'),
    CSS_MENU_PAUSE = getCN(CAROUSEL, 'menu', 'pause'),
    CSS_MENU_PREV = getCN(CAROUSEL, 'menu', 'prev'),
    CSS_MENU_ITEM_DEFAULT = [CSS_MENU_ITEM, CSS_MENU_INDEX].join(STR_BLANK),
    CSS_MENU_ITEM_ACTIVE = [CSS_MENU_ITEM, CSS_MENU_INDEX, CSS_MENU_ACTIVE].join(STR_BLANK),

    DOT = '.',

    SELECTOR_MENU_INDEX = DOT + CSS_MENU_INDEX,
    SELECTOR_MENU_NEXT = DOT + CSS_MENU_NEXT,
    SELECTOR_MENU_PAUSE = DOT + CSS_MENU_PAUSE,
    SELECTOR_MENU_PLAY = DOT + CSS_MENU_PLAY,
    SELECTOR_MENU_PLAY_OR_PAUSE = [SELECTOR_MENU_PLAY, SELECTOR_MENU_PAUSE].join(),
    SELECTOR_MENU_PREV = DOT + CSS_MENU_PREV,

    TPL_ITEM = '<li><a class="' + CSS_MENU_ITEM + ' {cssClasses}">{index}</a></li>',

    TPL_MENU = '<menu>' +
                    '<li><a class="' + CSS_MENU_ITEM + ' ' + CSS_MENU_PLAY + '"></a></li>' +
                    '<li><a class="' + CSS_MENU_ITEM + ' ' + CSS_MENU_PREV + '"></a></li>' +
                    '{items}' +
                    '<li><a class="' + CSS_MENU_ITEM + ' ' + CSS_MENU_NEXT + '"></a></li>' +
                '</menu>',

    UI_SRC = A.Widget.UI_SRC,

    MAP_EVENT_INFO = {
        src: UI_SRC
    };

/**
 * A base class for Carousel.
 *
 * Check the [live demo](http://alloyui.com/examples/carousel/).
 *
 * @class A.Carousel
 * @uses A.Component
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var Carousel = A.Component.create(
    {
        /**
         * Static property provides a string to identify the class.
         *
         * @property Carousel.NAME
         * @type String
         * @static
         */
        NAME: CAROUSEL,

        /**
         * Static property used to define the default attribute
         * configuration for the Carousel.
         *
         * @property Carousel.ATTRS
         * @type Object
         * @static
         */
        ATTRS: {

            /**
             * Index of the first visible item of the carousel.
             *
             * @attribute activeIndex
             * @default 0
             * @type Number
             */
            activeIndex: {
                value: 0,
                setter: '_setActiveIndex'
            },

            /**
             * Duration of the animation in seconds when change index on
             * Carousel.
             *
             * @attribute animationTime
             * @default 0.5
             * @type Number
             */
            animationTime: {
                value: 0.5
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
             * CSS Selector whitch determines the items to be loaded to the
             * Carousel.
             *
             * @attribute itemSelector
             * @default >* (All first childs)
             * @type String
             */
            itemSelector: {
                value: '>*'
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
                value: DOT + CSS_MENU_ITEM
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
                value: true
            }
        },

        prototype: {
            animation: null,
            nodeSelection: null,
            nodeMenu: null,

            /**
             * Construction logic executed during Carousel instantiation. Lifecycle.
             *
             * @method initializer
             * @protected
             */
            initializer: function() {
                var instance = this;

                instance.animation = new A.Anim(
                    {
                        duration: instance.get('animationTime'),
                        to: {
                            opacity: 1
                        }
                    }
                );
            },

            /**
             * Render the Carousel component instance. Lifecycle.
             *
             * @method renderUI
             * @protected
             */
            renderUI: function() {
                var instance = this;

                instance._updateNodeSelection();
                instance.nodeMenu = instance.get('nodeMenu');

                instance._updateMenuNodes();
            },

            /**
             * Bind the events on the Carousel UI. Lifecycle.
             *
             * @method bindUI
             * @protected
             */
            bindUI: function() {
                var instance = this;

                instance.after(
                    {
                        activeIndexChange: instance._afterActiveIndexChange,
                        animationTimeChange: instance._afterAnimationTimeChange,
                        itemSelectorChange: instance._afterItemSelectorChange,
                        intervalTimeChange: instance._afterIntervalTimeChange,
                        nodeMenuItemSelector: instance._afterNodeMenuItemSelectorChange,
                        playingChange: instance._afterPlayingChange
                    }
                );

                instance._bindMenu();

                if (instance.get('playing') === true) {
                    instance._afterPlayingChange(
                        {
                            prevVal: false,
                            newVal: true
                        }
                    );
                }
            },

            /**
             * Sync the Carousel UI. Lifecycle.
             *
             * @method syncUI
             * @protected
             */
            syncUI: function() {
                var instance = this;

                instance._uiSetActiveIndex(instance.get('activeIndex'));
            },

            /**
             * Set the <code>activeIndex</code> attribute which
             * activates a certain item on Carousel based on its index.
             *
             * @method item
             * @param val
             */
            item: function(val) {
                var instance = this;

                instance.set('activeIndex', val);
            },

            /**
             * Go to the next index.
             *
             * @method next
             */
            next: function() {
                var instance = this;

                instance._updateIndexNext();
            },

            /**
             * Set the <code>playing</code> attribute
             * to false which pauses the animation.
             *
             * @method pause
             */
            pause: function() {
                var instance = this;

                instance.set('playing', false);
            },

            /**
             * Set the <code>playing</code> attribute
             * to true which starts the animation.
             *
             * @method play
             */
            play: function() {
                var instance = this;

                instance.set('playing', true);
            },

            /**
             * Go to previous index.
             *
             * @method prev
             */
            prev: function() {
                var instance = this;

                instance._updateIndexPrev();
            },

            /**
             * Fire after <code>activeIndex</code> attribute changes.
             *
             * @method _afterActiveIndexChange
             * @param event
             * @protected
             */
            _afterActiveIndexChange: function(event) {
                var instance = this;

                instance._uiSetActiveIndex(
                    event.newVal,
                    {
                        prevVal: event.prevVal,
                        animate: instance.get('playing'),
                        src: event.src
                    }
                );
            },

            /**
             * Fire after <code>animationTime</code> attribute changes.
             *
             * @method _afterAnimationTimeChange
             * @param event
             * @protected
             */
            _afterAnimationTimeChange: function(event) {
                var instance = this;

                instance.animation.set('duration', event.newVal);
            },

            /**
             * Fire after <code>itemSelector</code> attribute change.
             *
             * @method _afterItemSelectorChange
             * @param event
             * @protected
             */
            _afterItemSelectorChange: function(event) {
                var instance = this;

                instance._updateNodeSelection();
            },

            /**
             * Fire after <code>nodeMenuItemSelector</code> attribute change.
             *
             * @method _afterNodeMenuItemSelectorChange
             * @param event
             * @protected
             */
            _afterNodeMenuItemSelectorChange: function(event) {
                var instance = this;

                instance.nodeMenuItemSelector = event.newVal;

                instance._updateMenuNodes();
            },

            /**
             * Fire after <code>intervalTime</code> attribute changes.
             *
             * @method _afterIntervalTimeChange
             * @param event
             * @protected
             */
            _afterIntervalTimeChange: function(event) {
                var instance = this;

                instance._clearIntervalRotationTask();
                instance._createIntervalRotationTask();
            },

            /**
             * Fire after <code>playing</code> attribute changes.
             *
             * @method _afterPlayingChange
             * @param event
             * @protected
             */
            _afterPlayingChange: function(event) {
                var instance = this;

                var menuPlayItem = instance.nodeMenu.one(SELECTOR_MENU_PLAY_OR_PAUSE);
                var playing = event.newVal;

                var fromClass = CSS_MENU_PAUSE;
                var toClass = CSS_MENU_PLAY;

                var rotationTaskMethod = '_clearIntervalRotationTask';

                if (playing) {
                    fromClass = CSS_MENU_PLAY;
                    toClass = CSS_MENU_PAUSE;

                    rotationTaskMethod = '_createIntervalRotationTask';
                }

                instance[rotationTaskMethod]();

                if (menuPlayItem) {
                    menuPlayItem.replaceClass(fromClass, toClass);
                }
            },

            /**
             * Attach delegate to the carousel menu.
             *
             * @method _bindMenu
             * @protected
             */
            _bindMenu: function() {
                var instance = this;

                var menu = instance.nodeMenu;

                var nodeMenuItemSelector = instance.get('nodeMenuItemSelector');

                menu.delegate('click', instance._onClickDelegate, nodeMenuItemSelector, instance);

                instance.nodeMenuItemSelector = nodeMenuItemSelector;
            },

            /**
             * Clear the rotation task interval.
             *
             * @method _clearIntervalRotationTask
             * @protected
             */
            _clearIntervalRotationTask: function() {
                var instance = this;

                clearInterval(instance._intervalRotationTask);
            },

            /**
             * Create an random number to be current index.
             *
             * @method _createIndexRandom
             * @protected
             */
            _createIndexRandom: function() {
                var instance = this;

                return Math.ceil(Math.random() * instance.nodeSelection.size()) - 1;
            },

            /**
             * Create an timer for the rotation task.
             *
             * @method _createIntervalRotationTask
             * @protected
             */
            _createIntervalRotationTask: function() {
                var instance = this;

                instance._clearIntervalRotationTask();

                instance._intervalRotationTask = setInterval(
                    function() {
                        instance._updateIndexNext(
                            {
                                animate: true
                            }
                        );
                    },
                    instance.get('intervalTime') * 1000
                );
            },

            /**
             * Fire when animation ends.
             *
             * @method _onAnimationEnd
             * @param event
             * @param newImage
             * @param oldImage
             * @param newMenuItem
             * @param oldMenuItem
             * @protected
             */
            _onAnimationEnd: function(event, newImage, oldImage, newMenuItem, oldMenuItem) {
                var instance = this;

                if (oldImage) {
                    oldImage.removeClass(CSS_ITEM_TRANSITION);
                }

                newImage.setStyle('opacity', '1');
            },

            /**
             * Fire when animation starts.
             *
             * @method _onAnimationStart
             * @param event
             * @param newImage
             * @param oldImage
             * @param newMenuItem
             * @param oldMenuItem
             * @protected
             */
            _onAnimationStart: function(event, newImage, oldImage, newMenuItem, oldMenuItem) {
                var instance = this;

                newImage.addClass(CSS_ITEM_ACTIVE);

                if (newMenuItem) {
                    newMenuItem.addClass(CSS_MENU_ACTIVE);
                }

                if (oldImage) {
                    oldImage.replaceClass(CSS_ITEM_ACTIVE, CSS_ITEM_TRANSITION);
                }

                if (oldMenuItem) {
                    oldMenuItem.removeClass(CSS_MENU_ACTIVE);
                }
            },

            /**
             * Fire when a click is fired on menu.
             *
             * @method _onClickDelegate
             * @param event
             * @protected
             */
            _onClickDelegate: function(event) {
                var instance = this;

                event.preventDefault();

                var currentTarget = event.currentTarget;

                var handler;

                if (currentTarget.hasClass(CSS_MENU_INDEX)) {
                    handler = instance._onMenuItemClick;
                }
                else if (currentTarget.hasClass(CSS_MENU_PREV)) {
                    handler = instance._updateIndexPrev;
                }
                else if (currentTarget.hasClass(CSS_MENU_NEXT)) {
                    handler = instance._updateIndexNext;
                }
                else if (currentTarget.test(SELECTOR_MENU_PLAY_OR_PAUSE)) {
                    handler = instance._onMenuPlayClick;
                }

                if (handler) {
                    handler.apply(instance, arguments);
                }
            },

            /**
             * Execute when delegates handle menuItem click.
             *
             * @method _onMenuItemClick
             * @param event
             * @protected
             */
            _onMenuItemClick: function(event) {
                var instance = this;

                event.preventDefault();

                var newIndex = instance.menuNodes.indexOf(event.currentTarget);

                instance.set('activeIndex', newIndex, MAP_EVENT_INFO);
            },

            /**
             * Execute when delegates handle play click.
             *
             * @method _onMenuPlayClick
             * @param event
             * @protected
             */
            _onMenuPlayClick: function(event) {
                var instance = this;

                this.set('playing', !this.get('playing'));
            },

            /**
             * Render the menu in DOM.
             *
             * @method _renderMenu
             * @protected
             */
            _renderMenu: function() {
                var instance = this,
                    activeIndex = instance.get('activeIndex'),
                    items = [],
                    i,
                    len = instance.nodeSelection.size();

                for (i = 0; i < len; i++) {
                    items.push(
                        Lang.sub(TPL_ITEM, {
                            cssClasses: activeIndex === i ? CSS_MENU_ITEM_ACTIVE : CSS_MENU_ITEM_DEFAULT,
                            index: i
                        })
                    );
                }

                var menu = A.Node.create(Lang.sub(TPL_MENU, { items: items.join(STR_BLANK) }));

                instance.get('contentBox').appendChild(menu);

                return menu;
            },

            /**
             * Set the <code>activeIndex</code> attribute.
             *
             * @method _setActiveIndex
             * @param val
             * @protected
             */
            _setActiveIndex: function(val) {
                var instance = this;

                if (val == 'rand') {
                    val = instance._createIndexRandom();
                }
                else {
                    val = Math.max(Math.min(val, instance.nodeSelection.size()), -1);
                }

                return val;
            },

            /**
             * Set the <code>nodeMenu</code> attribute.
             *
             * @method _setNodeMenu
             * @param val
             * @protected
             */
            _setNodeMenu: function(val) {
                var instance = this;

                return A.one(val) || instance._renderMenu();
            },

            /**
             * Set the <code>activeIndex</code> on the UI.
             *
             * @method _uiSetActiveIndex
             * @param newVal
             * @param objOptions
             * @protected
             */
            _uiSetActiveIndex: function(newVal, objOptions) {
                var instance = this;

                var oldImage = null;
                var oldMenuItem = null;
                var onStart = null;
                var onEnd = null;

                var newImage = instance.nodeSelection.item(newVal);

                var menuNodes = instance.menuNodes;

                var newMenuItem = menuNodes.item(newVal);

                instance.animation.set('node', newImage);

                if (objOptions && !Lang.isUndefined(objOptions.prevVal)) {
                    var prevVal = objOptions.prevVal;

                    newImage.setStyle('opacity', '0');

                    oldMenuItem = menuNodes.item(prevVal);
                    oldImage = instance.nodeSelection.item(prevVal);

                    oldImage.replaceClass(CSS_ITEM_ACTIVE, CSS_ITEM_TRANSITION);

                    instance.animation.stop();
                }
                else {
                    newImage.addClass(CSS_ITEM_ACTIVE);

                    newImage.setStyle('opacity', '1');
                }

                onStart = instance.animation.on(
                    'start',
                    function(event) {
                        instance._onAnimationStart(event, newImage, oldImage, newMenuItem, oldMenuItem);

                        onStart.detach();
                    }
                );

                onEnd = instance.animation.on(
                    'end',
                    function(event) {
                        instance._onAnimationEnd(event, newImage, oldImage, newMenuItem, oldMenuItem);

                        onEnd.detach();
                    }
                );

                if (objOptions) {
                    if (objOptions.animate) {
                        instance.animation.run();
                    }
                    else {
                        instance.animation.fire('start');
                        instance.animation.fire('end');
                    }

                    if (objOptions.src == UI_SRC && objOptions.animate) {
                        instance._createIntervalRotationTask();
                    }
                }
            },

            /**
             * Set the <code>activeIndex</code> to the next index.
             *
             * @method _updateIndexNext
             * @param options
             * @protected
             */
            _updateIndexNext: function(options) {
                var instance = this;

                var currentIndex = instance.get('activeIndex');
                var nodeSelectionSize = instance.nodeSelection.size();

                var newIndex = currentIndex + 1;

                if (newIndex > (nodeSelectionSize - 1)) {
                    newIndex = 0;
                }

                if (options) {
                    options.src = UI_SRC;
                }

                instance.set('activeIndex', newIndex, options);
            },

            /**
             * Set the <code>activeIndex</code> to the previous index.
             *
             * @method _updateIndexPrev
             * @param options
             * @protected
             */
            _updateIndexPrev: function(options) {
                var instance = this;

                var currentIndex = instance.get('activeIndex');

                var newIndex = currentIndex - 1;

                if (newIndex < 0) {
                    newIndex = instance.nodeSelection.size() - 1;
                }

                if (options) {
                    options.src = UI_SRC;
                }

                instance.set('activeIndex', newIndex, options);
            },

            /**
             * Set the <code>menuNodes</code> attribute based on the selector menu index.
             *
             * @method _updateMenuNodes
             * @param options
             * @protected
             */
            _updateMenuNodes: function() {
                var instance = this;

                instance.menuNodes = instance.nodeMenu.all(SELECTOR_MENU_INDEX);
            },

            /**
             * Update the <code>nodeSelection</code> by adding the CSS_ITEM class.
             *
             * @method _updateMenuNodes
             * @param options
             * @protected
             */
            _updateNodeSelection: function() {
                var instance = this;

                var itemSelector = instance.get('itemSelector');

                var nodeSelection = instance.get('contentBox').all(itemSelector);

                nodeSelection.addClass(CSS_ITEM);

                instance.nodeSelection = nodeSelection;
            },

            _intervalRotationTask: null
        }
    }
);

A.Carousel = Carousel;