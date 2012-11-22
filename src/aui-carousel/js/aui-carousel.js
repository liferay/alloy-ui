var Lang = A.Lang,

	ACTIVE_INDEX = 'activeIndex',
	ANIMATION_TIME = 'animationTime',
	CONTENT_BOX = 'contentBox',
	DOT = '.',
	DURATION = 'duration',
	INTERVAL_TIME = 'intervalTime',
	ITEM_SELECTOR = 'itemSelector',
	NODE = 'node',
	NODE_MENU = 'nodeMenu',
	NODE_MENU_ITEM_SELECTOR = 'nodeMenuItemSelector',
	OPACITY = 'opacity',
	PLAYING = 'playing',
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

	GESTURE_FLICK_FILTER_DISTANCE = 75,
	GESTURE_FLICK_FILTER_VELOCITY = 0.5,

	SELECTOR_MENU_INDEX = DOT + CSS_MENU_INDEX,
	SELECTOR_MENU_NEXT = DOT + CSS_MENU_NEXT,
	SELECTOR_MENU_PAUSE = DOT + CSS_MENU_PAUSE,
	SELECTOR_MENU_PLAY = DOT + CSS_MENU_PLAY,
	SELECTOR_MENU_PLAY_OR_PAUSE = [SELECTOR_MENU_PLAY, SELECTOR_MENU_PAUSE].join(),
	SELECTOR_MENU_PREV = DOT + CSS_MENU_PREV,

	TPL_MENU = new A.Template(
		'<menu>',
		'<li><a class="', CSS_MENU_ITEM, ' ', CSS_MENU_PLAY, '"></a></li>',
		'<li><a class="', CSS_MENU_ITEM, ' ', CSS_MENU_PREV, '"></a></li>',
		'<tpl for="items">',
			'<li><a class="', CSS_MENU_ITEM, ' {[ $i == parent.activeIndex ? "', CSS_MENU_ITEM_ACTIVE, '" : "', CSS_MENU_ITEM_DEFAULT,'" ]}">{$index}</a></li>',
		'</tpl>',
		'<li><a class="', CSS_MENU_ITEM, ' ', CSS_MENU_NEXT, '"></a></li>',
		'</menu>'
	),

	UI_SRC = A.Widget.UI_SRC,

	MAP_EVENT_INFO = {
		src: UI_SRC
	};

var Carousel = A.Component.create(
	{
		NAME: CAROUSEL,

		ATTRS: {
			activeIndex: {
				value: 0,
				setter: '_setActiveIndex'
			},
			animationTime: {
				value: 0.5
			},
			intervalTime: {
				value: 0.75
			},
			itemSelector: {
				value: '>*'
			},
			nodeMenu: {
				value: null,
				setter: '_setNodeMenu'
			},
			nodeMenuItemSelector: {
				value: DOT + CSS_MENU_ITEM
			},
			playing: {
				value: true
			}
		},

		prototype: {
			animation: null,
			nodeSelection: null,
			nodeMenu: null,

			initializer: function() {
				var instance = this;

				instance.animation = new A.Anim(
					{
						duration: instance.get(ANIMATION_TIME),
						to: {
							opacity: 1
						}
					}
				);
			},

			renderUI: function() {
				var instance = this;

				instance._updateNodeSelection();
				instance.nodeMenu = instance.get(NODE_MENU);

				instance._updateMenuNodes();
			},

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
				instance._bindItemGestures();

				if (instance.get(PLAYING) === true) {
					instance._afterPlayingChange(
						{
							prevVal: false,
							newVal: true
						}
					);
				}
			},

			syncUI: function() {
				var instance = this;

				instance._uiSetActiveIndex(instance.get(ACTIVE_INDEX));
			},

			item: function(val) {
				var instance = this;

				instance.set(ACTIVE_INDEX, val);
			},

			next: function() {
				var instance = this;

				instance._updateIndexNext();
			},

			pause: function() {
				var instance = this;

				instance.set(PLAYING, false);
			},

			play: function() {
				var instance = this;

				instance.set(PLAYING, true);
			},

			prev: function() {
				var instance = this;

				instance._updateIndexPrev();
			},

			_afterActiveIndexChange: function(event) {
				var instance = this;

				instance._uiSetActiveIndex(
					event.newVal,
					{
						prevVal: event.prevVal,
						animate: instance.get(PLAYING),
						src: event.src
					}
				);
			},

			_afterAnimationTimeChange: function(event) {
				var instance = this;

				instance.animation.set(DURATION, event.newVal);
			},

			_afterItemSelectorChange: function(event) {
				var instance = this;

				instance._updateNodeSelection();
			},

			_afterNodeMenuItemSelectorChange: function(event) {
				var instance = this;

				instance.nodeMenuItemSelector = event.newVal;

				instance._updateMenuNodes();
			},

			_afterIntervalTimeChange: function(event) {
				var instance = this;

				instance._clearIntervalRotationTask();
				instance._createIntervalRotationTask();
			},

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

			_bindMenu: function() {
				var instance = this;

				var menu = instance.nodeMenu;

				var nodeMenuItemSelector = instance.get(NODE_MENU_ITEM_SELECTOR);

				menu.delegate('click', instance._onClickDelegate, nodeMenuItemSelector, instance);

				instance.nodeMenuItemSelector = nodeMenuItemSelector;
			},

			_bindItemGestures: function() {
				var instance = this;

				var contentBox = instance.get(CONTENT_BOX);

				var nodeSelection = contentBox.all(DOT + CSS_ITEM);

				var gestureFlickFilter = {
					minDistance: GESTURE_FLICK_FILTER_DISTANCE,
					minVelocity: GESTURE_FLICK_FILTER_VELOCITY
				};

				nodeSelection.each(
					function(item, index, collection) {
						item.on(
							'flick',
							instance._onFlickHandler,
							gestureFlickFilter,
							instance
						);
					}
				);
			},

			_clearIntervalRotationTask: function() {
				var instance = this;

				clearInterval(instance._intervalRotationTask);
			},

			_createIndexRandom: function() {
				var instance = this;

				var randomIndex = Math.random() * instance.nodeSelection.size();

				return Math.ceil(randomIndex) - 1;
			},

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
					instance.get(INTERVAL_TIME) * 1000
				);
			},

			_onAnimationEnd: function(event, newImage, oldImage, newMenuItem, oldMenuItem) {
				var instance = this;

				if (oldImage) {
					oldImage.removeClass(CSS_ITEM_TRANSITION);
				}

				newImage.setStyle(OPACITY, 1);
			},

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

			_onClickDelegate: function(event) {
				var instance = this;

				var handler;

				var currentTarget = event.currentTarget;

				event.preventDefault();

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

			_onFlickHandler: function(event) {
				var instance = this;

				var handler;

				var distance = event.flick.distance;

				if (event.flick.axis == 'x') {
					// event.flick.axis has more consistant behavior than {axis: 'x'}
					if (distance < 0) {//Think backwards for touch.
						handler = instance._updateIndexNext;
					}
					else if (distance > 0) {
						handler = instance._updateIndexPrev;
					}

					if (handler) {
						handler.apply(instance, arguments);
					}
				}
			},

			_onMenuItemClick: function(event) {
				var instance = this;

				event.preventDefault();

				var newIndex = instance.menuNodes.indexOf(event.currentTarget);

				instance.set(ACTIVE_INDEX, newIndex, MAP_EVENT_INFO);
			},

			_onMenuPlayClick: function(event) {
				var instance = this;

				this.set(PLAYING, !this.get(PLAYING));
			},

			_renderMenu: function() {
				var instance = this;

				var menu = TPL_MENU.render(
					{
						activeIndex: instance.get(ACTIVE_INDEX),
						items: instance.nodeSelection.getDOM()
					}
				);

				instance.get(CONTENT_BOX).appendChild(menu);

				return menu;
			},

			_setActiveIndex: function(val) {
				var instance = this;

				if (val == 'rand') {
					val = instance._createIndexRandom();
				}
				else {
					var minVal = Math.min(val, instance.nodeSelection.size());

					val = Math.max(minVal, -1);
				}

				return val;
			},

			_setNodeMenu: function(val) {
				var instance = this;

				return A.one(val) || instance._renderMenu();
			},

			_uiSetActiveIndex: function(newVal, objOptions) {
				var instance = this;

				var oldImage = null;
				var oldMenuItem = null;
				var onStart = null;
				var onEnd = null;

				var newImage = instance.nodeSelection.item(newVal);
				var menuNodes = instance.menuNodes;

				var newMenuItem = menuNodes.item(newVal);

				instance.animation.set(NODE, newImage);

				newImage.addClass(CSS_ITEM_ACTIVE);
				newImage.setStyle(OPACITY, 1);

				if (objOptions && !Lang.isUndefined(objOptions.prevVal)) {
					var prevVal = objOptions.prevVal;

					oldMenuItem = menuNodes.item(prevVal);
					oldImage = instance.nodeSelection.item(prevVal);

					oldImage.replaceClass(CSS_ITEM_ACTIVE, CSS_ITEM_TRANSITION);
					oldImage.setStyle(OPACITY, 0);

					instance.animation.stop();
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
					var animate = objOptions.animate;

					if (animate) {
						instance.animation.run();
					}
					else {
						instance.animation.fire('start');
						instance.animation.fire('end');
					}

					if (objOptions.src == UI_SRC && animate) {
						instance._createIntervalRotationTask();
					}
				}
			},

			_updateIndexNext: function(options) {
				var instance = this;

				var nodeSelectionSize = instance.nodeSelection.size() - 1;

				var newIndex = instance.get(ACTIVE_INDEX) + 1;

				if (newIndex > (nodeSelectionSize)) {
					newIndex = 0;
				}

				if (options) {
					options.src = UI_SRC;
				}

				instance.set(ACTIVE_INDEX, newIndex, options);
			},

			_updateIndexPrev: function(options) {
				var instance = this;

				var newIndex = instance.get(ACTIVE_INDEX) - 1;

				if (newIndex < 0) {
					newIndex = instance.nodeSelection.size() - 1;
				}

				if (options) {
					options.src = UI_SRC;
				}

				instance.set(ACTIVE_INDEX, newIndex, options);
			},

			_updateMenuNodes: function() {
				var instance = this;

				instance.menuNodes = instance.nodeMenu.all(SELECTOR_MENU_INDEX);
			},

			_updateNodeSelection: function() {
				var instance = this;

				var itemSelector = instance.get(ITEM_SELECTOR);

				var nodeSelection = instance.get(CONTENT_BOX).all(itemSelector);

				nodeSelection.addClass(CSS_ITEM);

				instance.nodeSelection = nodeSelection;
			},

			_intervalRotationTask: null
		}
	}
);

A.Carousel = Carousel;