var Lang = A.Lang,

	CAROUSEL = 'carousel',

	getCN = A.ClassNameManager.getClassName,

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

	TPL_MENU_INDEX = ['<li><a class="', CSS_MENU_ITEM, CSS_MENU_INDEX, '">'].join(' '),
	TPL_MENU_NEXT = ['<li><a class="', CSS_MENU_ITEM, CSS_MENU_NEXT, '">'].join(' '),
	TPL_MENU_PLAY = ['<li><a class="', CSS_MENU_ITEM, CSS_MENU_PLAY, '">'].join(' '),
	TPL_MENU_PREV = ['<li><a class="', CSS_MENU_ITEM, CSS_MENU_PREV, '">'].join(' '),

	UI_SRC = A.Widget.UI_SRC;

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
			playing: {
				value: true
			}
		},

		prototype: {
			animation: null,
			nodeSelection: null,
			nodeMenu: null,

			initializer: function(){
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

			renderUI: function() {
				var instance = this;

				instance._updateNodeSelection();
				instance._renderMenu();
			},

			bindUI: function() {
				var instance = this;

				instance.after(
					{
						activeIndexChange: instance._afterActiveIndexChange,
						animationTimeChange: instance._afterAnimationTimeChange,
						itemSelectorChange: instance._afterItemSelectorChange,
						intervalTimeChange: instance._afterIntervalTimeChange,
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

			syncUI: function() {
				var instance = this;

				instance._uiSetActiveIndex(instance.get('activeIndex'));
			},

			item: function(val) {
				var instance = this;

				instance.set('activeIndex', val);
			},

			next: function() {
				instance._updateIndexNext();
			},

			pause: function() {
				var instance = this;

				instance.set('playing', false);
			},

			play: function() {
				var instance = this;

				instance.set('playing', true);
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
						animate: event.animate,
						src: event.src
					}
				);
			},

			_afterAnimationTimeChange: function(event) {
				var instance = this;

				instance.animation.set('duration', event.newVal);
			},

			_afterItemSelectorChange: function(event) {
				var instance = this;

				instance._updateNodeSelection();
			},

			_afterIntervalTimeChange: function(event) {
				var instance = this;

				instance._clearIntervalRotationTask();
				instance._createIntervalRotationTask();
			},

			_afterPlayingChange: function(event) {
				var instance = this;

				var menuPlayItem = instance.nodeMenu.get('children').item(0).get('children').item(0);

				if (event.newVal) {
					instance._createIntervalRotationTask();
					menuPlayItem.removeClass(CSS_MENU_PLAY).addClass(CSS_MENU_PAUSE);
				}
				else {
					instance._clearIntervalRotationTask();
					menuPlayItem.removeClass(CSS_MENU_PAUSE).addClass(CSS_MENU_PLAY);
				}
			},

			_bindMenu: function() {
				var instance = this;

				var menu = instance.nodeMenu;
				var lis = menu.get('children');

				lis.each(
					function(item, index, collection) {
						if (index > 1 && index !== collection.size() - 1) {
							item.on('click', instance._onMenuItemClick, instance);
						}
					}
				);

				lis.first().on('click', instance._onMenuPlayClick, instance);
				lis.item(1).on('click', instance._updateIndexPrev, instance);

				lis.last().on('click', instance._updateIndexNext, instance);
			},

			_clearIntervalRotationTask: function() {
				var instance = this;

				clearInterval(instance._intervalRotationTask);
			},

			_createIndexRandom: function() {
				var instance = this;

				return Math.ceil(Math.random() * instance.nodeSelection.size()) - 1;
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
					instance.get('intervalTime') * 1000
				);
			},

			_onAnimationEnd: function(event, newImage, oldImage, newMenuItem, oldMenuItem) {
				var instance = this;

				if (oldImage) {
					oldImage.removeClass(CSS_ITEM_TRANSITION);
				}

				newImage.setStyle('opacity', '1');
			},

			_onAnimationStart: function(event, newImage, oldImage, newMenuItem, oldMenuItem) {
				var instance = this;

				newImage.addClass(CSS_ITEM_ACTIVE);

				newMenuItem.addClass(CSS_MENU_ACTIVE);

				if (oldImage) {
					oldImage.replaceClass(CSS_ITEM_ACTIVE, CSS_ITEM_TRANSITION);
				}

				if (oldMenuItem) {
					oldMenuItem.removeClass(CSS_MENU_ACTIVE);
				}
			},

			_onMenuItemClick: function(event) {
				var instance = this;

				event.preventDefault();

				var newIndex = instance.nodeMenu.all('li').indexOf(event.currentTarget) - 2;

				instance.set('activeIndex', newIndex,  MAP_EVENT_INFO);
			},

			_onMenuPlayClick: function(event) {
				var instance = this;

				this.set('playing', !this.get('playing'));
			},

			_renderMenu: function() {
				var instance = this;

				var buffer = [TPL_MENU_PLAY, TPL_MENU_PREV];

				var nodeSelectionSize = instance.nodeSelection.size();

				var strBuffer = '';

				var i = 0;

				while (i <= nodeSelectionSize) {
					strBuffer += i++;
				}

				var indexTPL = strBuffer.split('').join(TPL_MENU_INDEX);

				buffer.push(indexTPL, TPL_MENU_NEXT);

				var menu = A.Node.create('<menu>' + buffer.join('') + '</menu>');

				instance.get('contentBox').appendChild(menu);
				instance.nodeMenu = menu;
			},

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

			_uiSetActiveIndex: function(newVal, objOptions) {
				var instance = this;

				var menuOffset = 2;
				var oldImage = null;
				var oldMenuItem = null;
				var onStart = null;
				var onEnd = null;

				var newImage = instance.nodeSelection.item(newVal);
				var newMenuItem = instance.nodeMenu.get('children').item(newVal + menuOffset).get('children').item(0);

				instance.animation.set('node', newImage);

				if (objOptions && !Lang.isUndefined(objOptions.prevVal)) {
					var prevVal = objOptions.prevVal;

					var index = prevVal + menuOffset;

					oldMenuItem = instance.nodeMenu.get('children').item(index).get('children').item(0);
					oldImage = instance.nodeSelection.item(prevVal);

					oldImage.replaceClass(CSS_ITEM_ACTIVE, CSS_ITEM_TRANSITION);

					instance.animation.stop();
				}

				newImage.setStyle('opacity', '0');

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

					if (objOptions.src == UI_SRC) {
						instance._createIntervalRotationTask();
					}
				}
			},

			_updateIndexNext: function(options) {
				var instance = this;

				var currentIndex = instance.get('activeIndex');
				var nodeSelectionSize = instance.nodeSelection.size();

				var newIndex = currentIndex + 1;

				if (newIndex > (nodeSelectionSize - 1)) {
					newIndex = 0;
				}

				options.src = UI_SRC;

				instance.set('activeIndex', newIndex, options);
			},

			_updateIndexPrev: function(options) {
				var instance = this;

				var currentIndex = instance.get('activeIndex');

				var newIndex = currentIndex - 1;

				if (newIndex < 0) {
					newIndex = instance.nodeSelection.size() - 1;
				}

				options.src = UI_SRC;

				instance.set('activeIndex', newIndex, options);
			},

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