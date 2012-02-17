var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isUndefined = Lang.isUndefined,

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

	getCN = A.getClassName,

	CSS_ZIPPY_COLLAPSED = getCN(ZIPPY, COLLAPSED),
	CSS_ZIPPY_CONTENT = getCN(ZIPPY, CONTENT),
	CSS_ZIPPY_CONTENT_WRAPPER = getCN(ZIPPY, CONTENT, WRAPPER),
	CSS_ZIPPY_EXPANDED = getCN(ZIPPY, EXPANDED),
	CSS_ZIPPY_HEADER = getCN(ZIPPY, HEADER),

	CSS_ZIPPY_STATE = {
		'false': CSS_ZIPPY_COLLAPSED,
		'true': CSS_ZIPPY_EXPANDED
	},

	TPL_CONTENT_WRAPPER = '<div class="' + CSS_ZIPPY_CONTENT_WRAPPER + '"></div>';

var Zippy = A.Component.create({
	NAME: ZIPPY,

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
			event.preventDefault();

			return instance.toggle();
		}
		else if (event.isKey(DOWN) || event.isKey(RIGHT) || event.isKey(NUM_PLUS)) {
			event.preventDefault();

			return instance.expand();
		}
		else if (event.isKey(UP) || event.isKey(LEFT) || event.isKey(ESC) || event.isKey(NUM_MINUS)) {
			event.preventDefault();

			return instance.collapse();
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

			header.setData(ZIPPY, instance);

			instance.on(EXPANDED_CHANGE, A.bind(instance._onExpandedChange, instance));

			if (instance.get(BIND_DOM_EVENTS)) {
				header.on([CLICK, KEYDOWN], A.rbind(Zippy.headerEventHandler, null, instance));
			}
		},

		syncUI: function() {
			var instance = this;

			instance.get(CONTENT).addClass(CSS_ZIPPY_CONTENT);
			instance.get(HEADER).addClass(CSS_ZIPPY_HEADER);
		},

		animate: function(config, fn) {
			var instance = this;

			instance._uiSetExpanded(true);

			var transition = A.merge(config, instance.get(TRANSITION));

			instance.get(CONTENT).transition(transition, A.bind(fn, instance));
		},

		collapse: function() {
			var instance = this;

			return instance.toggle(false);
		},

		expand: function() {
			var instance = this;
			
			return instance.toggle(true);
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

		toggle: function(expanded) {
			var instance = this;

			if (isUndefined(expanded)) {
				expanded = !instance.get(EXPANDED);
			}

			if (instance.get(ANIMATED)) {
				instance.animate(
					{
						marginTop: expanded ? 0 : instance.getContentHeight() * -1 + PIXEL
					},
					function() {
						instance.set(EXPANDED, expanded);
					}
				);
			}
			else {
				instance.set(EXPANDED, expanded);
			}

			return expanded;
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

			instance.get(CONTENT).replaceClass(CSS_ZIPPY_STATE[!val], CSS_ZIPPY_STATE[val]);
		}

	}
});

A.Zippy = Zippy;