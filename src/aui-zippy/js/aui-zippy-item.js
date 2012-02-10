var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	DASH = '-',
	DOT = '.',
	EMPTY_STR = '',
	PIXEL = 'px',
	SPACE = ' ',

	ANIMATED = 'animated',
	BIND_DOM_EVENTS = 'bindDOMEvents',
	CLICK = 'click',
	COLLAPSED = 'collapsed',
	CONTENT = 'content',
	DOWN = 'down',
	ENTER = 'enter',
	ESC = 'esc',
	EXPANDED = 'expanded',
	EXPANDED_CHANGE = 'expandedChange',
	GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',
	HEADER = 'header',
	HELPER = 'helper',
	ITEM = 'item',
	KEYDOWN = 'keydown',
	LEFT = 'left',
	LINEAR = 'linear',
	MARGIN_TOP = 'marginTop',
	MINUS = 'minus',
	NUM_MINUS = 'num_minus',
	NUM_PLUS = 'num_plus',
	PLUS = 'plus',
	RIGHT = 'right',
	SPACE = 'space',
	TRANSITION = 'transition',
	TRANSITION_END = 'transitionEnd',
	TRANSITION_START = 'transitionStart',
	UP = 'up',
	WRAPPER = 'wrapper',
	ZIPPY = 'zippy',
	ZIPPY_ITEM = 'zippy-item',

	getCN = A.getClassName,

	CSS_ZIPPY_ITEM_COLLAPSED = getCN(ZIPPY, ITEM, COLLAPSED),
	CSS_ZIPPY_ITEM_CONTENT = getCN(ZIPPY, ITEM, CONTENT),
	CSS_ZIPPY_ITEM_CONTENT_WRAPPER = getCN(ZIPPY, ITEM, CONTENT, WRAPPER),
	CSS_ZIPPY_ITEM_EXPANDED = getCN(ZIPPY, ITEM, EXPANDED),
	CSS_ZIPPY_ITEM_HEADER = getCN(ZIPPY, ITEM, HEADER),

	CSS_ZIPPY_ITEM_STATE = {
		'false': CSS_ZIPPY_ITEM_COLLAPSED,
		'true': CSS_ZIPPY_ITEM_EXPANDED
	},

	TPL_CONTENT_WRAPPER = '<div class="' + CSS_ZIPPY_ITEM_CONTENT_WRAPPER + '"></div>';

var ZippyItem = A.Component.create({
	NAME: ZIPPY_ITEM,

	ATTRS: {

		animated: {
			validator: isBoolean,
			value: false,
			writeOnce: true
		},

		bindDOMEvents: {
			validator: isBoolean,
			value: true,
			writeOnce: true
		},

		content: {
			setter: A.one
		},

		expanded: {
			validator: isBoolean,
			value: true
		},

		header: {
			setter: A.one
		},

		transition: {
			validator: isObject,
			value: {
				duration: 0.1,
			    easing: LINEAR
			}
		}

	},

	EXTENDS: A.Base,

	headerEventHandler: function(event, instance) {
		if (event.type === CLICK || event.isKey(ENTER) || event.isKey(SPACE)) {
			instance.toggle();

			event.preventDefault();
		}
		else if (event.isKey(DOWN) || event.isKey(RIGHT) || event.isKey(NUM_PLUS)) {
			instance.expand();

			event.preventDefault();
		}
		else if (event.isKey(UP) || event.isKey(LEFT) || event.isKey(ESC) || event.isKey(NUM_MINUS)) {
			instance.collapse();

			event.preventDefault();
		}
	},

	prototype: {

		initializer: function() {
			var instance = this;

			instance.bindUI();
			instance.syncUI();

			instance._uiSetAnimated(instance.get(ANIMATED));
			instance._uiSetExpanded(instance.get(EXPANDED));
		},

		bindUI: function() {
			var instance = this;
			var header = instance.get(HEADER);

			instance.on(EXPANDED_CHANGE, A.bind(instance._onExpandedChange, instance));

			if (instance.get(BIND_DOM_EVENTS)) {
				header.on([CLICK, KEYDOWN], A.rbind(ZippyItem.headerEventHandler, null, instance));
			}
		},

		syncUI: function() {
			var instance = this;

			instance.get(CONTENT).addClass(CSS_ZIPPY_ITEM_CONTENT);
			instance.get(HEADER).addClass(CSS_ZIPPY_ITEM_HEADER);
		},

		collapse: function() {
			var instance = this;

			if (instance.get(ANIMATED)) {
				instance._animate(
					{
						marginTop: instance.getContentHeight() * -1 + PIXEL,
						opacity: 0
					},
					function() {
						instance.set(EXPANDED, false);
					}
				);
			}
			else {
				instance.set(EXPANDED, false);
			}
		},

		expand: function() {
			var instance = this;

			if (instance.get(ANIMATED)) {
				instance._animate(
					{
						marginTop: 0,
						opacity: 1
					},
					function() {
						instance.set(EXPANDED, true);
					}
				);
			}
			else {
				instance.set(EXPANDED, true);
			}
		},

		getContentHeight: function() {
			var instance = this;
			var content = instance.get(CONTENT);
			var expanded = instance.get(EXPANDED), height;

			if (!expanded) {
				instance._uiSetExpanded(true);
			}

			if (content.hasMethod(GET_BOUNDING_CLIENT_RECT)) {
				var preciseRegion = content.invoke(GET_BOUNDING_CLIENT_RECT);

				if (preciseRegion) {
					height = preciseRegion.bottom - preciseRegion.top;
				}
			}
			else {
				height = content.get(OFFSET_HEIGHT);
			}

			if (!expanded) {
				instance._uiSetExpanded(false);
			}

			return height;
		},

		toggle: function() {
			var instance = this;

			if (instance.get(EXPANDED)) {
				instance.collapse();
			}
			else {
				instance.expand();
			}
		},

		_animate: function(config, fn) {
			var instance = this;
			var transition = A.merge(config, instance.get(TRANSITION));

			instance._uiSetExpanded(true);

			instance.get(CONTENT).transition(transition, A.bind(fn, instance));
		},

		_onExpandedChange: function(event) {
			var instance = this;

			instance._uiSetExpanded(event.newVal);
		},

		_uiSetAnimated: function(val) {
			var instance = this;

			if (val) {
				instance.get(CONTENT).wrap(TPL_CONTENT_WRAPPER);
			}
		},

		_uiSetExpanded: function(val) {
			var instance = this;

			instance.get(CONTENT).replaceClass(CSS_ZIPPY_ITEM_STATE[!val], CSS_ZIPPY_ITEM_STATE[val]);
		}

	}
});

A.ZippyItem = ZippyItem;