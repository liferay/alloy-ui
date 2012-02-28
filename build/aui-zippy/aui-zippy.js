AUI.add('aui-zippy-base', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isUndefined = Lang.isUndefined,

	toNumber = function(val) {
		return parseInt(val, 10) || 0;
	},

	DASH = '-',
	DOT = '.',
	EMPTY_STR = '',
	PIXEL = 'px',
	SPACE = ' ',

	ANIMATED = 'animated',
	ANIMATING = 'animating',
	BIND_DOM_EVENTS = 'bindDOMEvents',
	CLICK = 'click',
	COLLAPSED = 'collapsed',
	CONTENT = 'content',
	CUBIC_BEZIER = 'cubic-bezier',
	DOWN = 'down',
	ENTER = 'enter',
	ESC = 'esc',
	EXPANDED = 'expanded',
	EXPANDED_CHANGE = 'expandedChange',
	GET_BOUNDING_CLIENT_RECT = 'getBoundingClientRect',
	GUTTER = 'gutter',
	HEADER = 'header',
	HELPER = 'helper',
	KEYDOWN = 'keydown',
	LEFT = 'left',
	LINEAR = 'linear',
	MARGIN_TOP = 'marginTop',
	MINUS = 'minus',
	NUM_MINUS = 'num_minus',
	NUM_PLUS = 'num_plus',
	PARENT_NODE = 'parentNode',
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

	CSS_ZIPPY_CONTENT = getCN(ZIPPY, CONTENT),
	CSS_ZIPPY_CONTENT_COLLAPSED = getCN(ZIPPY, CONTENT, COLLAPSED),
	CSS_ZIPPY_CONTENT_EXPANDED = getCN(ZIPPY, CONTENT, EXPANDED),
	CSS_ZIPPY_CONTENT_WRAPPER = getCN(ZIPPY, CONTENT, WRAPPER),
	CSS_ZIPPY_HEADER = getCN(ZIPPY, HEADER),
	CSS_ZIPPY_HEADER_COLLAPSED = getCN(ZIPPY, HEADER, COLLAPSED),
	CSS_ZIPPY_HEADER_EXPANDED = getCN(ZIPPY, HEADER, EXPANDED),

	CSS_ZIPPY_CONTENT_STATE = {
		'false': CSS_ZIPPY_CONTENT_COLLAPSED,
		'true': CSS_ZIPPY_CONTENT_EXPANDED
	},

	CSS_ZIPPY_HEADER_STATE = {
		'false': CSS_ZIPPY_HEADER_COLLAPSED,
		'true': CSS_ZIPPY_HEADER_EXPANDED
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

		animating: {
			validator: isBoolean,
			value: false
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
				duration: 0.4,
			    easing: CUBIC_BEZIER
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

		toggle: function(expand) {
			var instance = this;

			if (isUndefined(expand)) {
				expand = !instance.get(EXPANDED);
			}

			if (instance.get(ANIMATED)) {
				if (instance.get(ANIMATING)) {
					return expand;
				}

				var content = instance.get(CONTENT);

				var height = instance.getContentHeight();
				var gutter = toNumber(content.getStyle(MARGIN_TOP));

				if (!instance.wrapped) {
					content.wrap(TPL_CONTENT_WRAPPER);

					if (expand) {
						gutter = -(height + gutter);
							
						content.setStyle(MARGIN_TOP, gutter);
					}

					instance.wrapped = true;
				}

				instance.set(ANIMATING, true);

				instance.animate(
					{
						marginTop: -(height + gutter) + PIXEL
					},
					function() {
						instance.set(ANIMATING, false);

						instance.set(EXPANDED, expand);
					}
				);
			}
			else {
				instance.set(EXPANDED, expand);
			}

			return expand;
		},

		_onExpandedChange: function(event) {
			var instance = this;

			instance._uiSetExpanded(event.newVal);
		},

		_uiSetExpanded: function(val) {
			var instance = this;

			instance.get(CONTENT).replaceClass(CSS_ZIPPY_CONTENT_STATE[!val], CSS_ZIPPY_CONTENT_STATE[val]);
			instance.get(HEADER).replaceClass(CSS_ZIPPY_HEADER_STATE[!val], CSS_ZIPPY_HEADER_STATE[val]);
		}

	}
});

A.Zippy = Zippy;

}, '@VERSION@' ,{skinnable:true, requires:['aui-base','transition']});
AUI.add('aui-zippy-delegate', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isString = Lang.isString,

	AArray = A.Array,

	DOC = A.config.doc,

	Zippy = A.Zippy,

	DASH = '-',
	DOT = '.',
	EMPTY_STR = '',
	SPACE = ' ',

	ANIMATED = 'animated',
	CLICK = 'click',
	CLOSE_ALL_ON_EXPAND = 'closeAllOnExpand',
	CONTAINER = 'container',
	CONTENT = 'content',
	CUBIC_BEZIER = 'cubic-bezier',
	EXPANDED = 'expanded',
	FIRST_CHILD = 'firstChild',
	HEADER = 'header',
	KEYDOWN = 'keydown',
	LINEAR = 'linear',
	TRANSITION = 'transition',
	WRAPPER = 'wrapper',
	ZIPPY = 'zippy',
	ZIPPY_ANIMATING_CHANGE = 'zippy:animatingChange',
	ZIPPY_DELEGATE = 'zippy-delegate',

	getCN = A.getClassName,

	CSS_ZIPPY_CONTENT_WRAPPER = getCN(ZIPPY, CONTENT, WRAPPER);

var ZippyDelegate = A.Component.create({
	NAME: ZIPPY_DELEGATE,

	ATTRS: {

		animated: {
			validator: isBoolean,
			value: false,
			writeOnce: true
		},

		closeAllOnExpand: {
			validator: isBoolean,
			value: false
		},

		container: {
			setter: A.one,
			value: DOC
		},

		content: {
			validator: isString
		},

		expanded: {
			validator: isBoolean,
			value: true
		},

		header: {
			validator: isString
		},

		transition: {
			validator: isObject,
			value: {
				duration: 0.4,
			    easing: CUBIC_BEZIER
			}
		}

	},

	EXTENDS: A.Base,

	prototype: {

		items: null,

		initializer: function() {
			var instance = this;

			instance.bindUI();
			instance.renderUI();
		},

		renderUI: function() {
			var instance = this;

			if (instance.get(CLOSE_ALL_ON_EXPAND)) {
				instance.items = [];

				instance.get(CONTAINER).all(instance.get(HEADER)).each(function(header) {
					instance.items.push(
						instance._create(header)
					);
				});
			}
		},

		bindUI: function() {
			var instance = this;
			var container = instance.get(CONTAINER);
			var header = instance.get(HEADER);

			instance.on(ZIPPY_ANIMATING_CHANGE, A.bind(instance._onAnimatingChange, instance));

			container.delegate([CLICK, KEYDOWN], A.bind(instance.headerEventHandler, instance), header);
		},

		findContentNode: function(header) {
			var instance = this;
			var content = instance.get(CONTENT);

			var contentNode = header.next(content) || header.one(content);

			if (!contentNode) {
				var wrapper = header.next(DOT + CSS_ZIPPY_CONTENT_WRAPPER); 
				
				if (wrapper) {
					contentNode = wrapper.get(FIRST_CHILD);
				}
			}

			return contentNode;
		},

		headerEventHandler: function(event) {
			var instance = this;

			if (instance.animating) {
				return false;
			}

			var target = event.currentTarget;
			var zippy = target.getData(ZIPPY) || instance._create(target);

			if (Zippy.headerEventHandler(event, zippy) && instance.get(CLOSE_ALL_ON_EXPAND)) {
				AArray.each(
					instance.items,
					function(item, index, collection) {
						if (item !== zippy && item.get(EXPANDED)) {
							item.collapse();
						}
					}
				);
			}
		},

		_create: function(header) {
			var instance = this;

			var zippy = new Zippy({
				animated: instance.get(ANIMATED),
				bindDOMEvents: false,
				bubbleTargets: [ instance ],
				content: instance.findContentNode(header),
				expanded: instance.get(EXPANDED),
				header: header,
				transition: instance.get(TRANSITION)
			});

			return zippy;
		},

		_onAnimatingChange: function(event) {
			var instance = this;

			instance.animating = event.newVal;
		}

	}
});

A.ZippyDelegate = ZippyDelegate;

}, '@VERSION@' ,{skinnable:false, requires:['aui-zippy-base']});


AUI.add('aui-zippy', function(A){}, '@VERSION@' ,{use:['aui-zippy-base','aui-zippy-delegate'], skinnable:true});

