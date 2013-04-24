AUI.add('aui-toggler-base', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isUndefined = Lang.isUndefined,

	toInt = Lang.toInt,

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
	TOGGLER = 'toggler',
	TRANSITION = 'transition',
	TRANSITION_END = 'transitionEnd',
	TRANSITION_START = 'transitionStart',
	UP = 'up',
	WRAPPER = 'wrapper',

	getCN = A.getClassName,

	CSS_TOGGLER_CONTENT = getCN(TOGGLER, CONTENT),
	CSS_TOGGLER_CONTENT_COLLAPSED = getCN(TOGGLER, CONTENT, COLLAPSED),
	CSS_TOGGLER_CONTENT_EXPANDED = getCN(TOGGLER, CONTENT, EXPANDED),
	CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER),
	CSS_TOGGLER_HEADER = getCN(TOGGLER, HEADER),
	CSS_TOGGLER_HEADER_COLLAPSED = getCN(TOGGLER, HEADER, COLLAPSED),
	CSS_TOGGLER_HEADER_EXPANDED = getCN(TOGGLER, HEADER, EXPANDED),

	CSS_TOGGLER_CONTENT_STATE = {
		'false': CSS_TOGGLER_CONTENT_COLLAPSED,
		'true': CSS_TOGGLER_CONTENT_EXPANDED
	},

	CSS_TOGGLER_HEADER_STATE = {
		'false': CSS_TOGGLER_HEADER_COLLAPSED,
		'true': CSS_TOGGLER_HEADER_EXPANDED
	},

	TPL_CONTENT_WRAPPER = '<div class="' + CSS_TOGGLER_CONTENT_WRAPPER + '"></div>';

var Toggler = A.Component.create({
	NAME: TOGGLER,

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
				duration: 0.4
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

			header.setData(TOGGLER, instance);

			instance.on(EXPANDED_CHANGE, A.bind(instance._onExpandedChange, instance));

			if (instance.get(BIND_DOM_EVENTS)) {
				header.on([CLICK, KEYDOWN], A.rbind(Toggler.headerEventHandler, null, instance));
			}
		},

		syncUI: function() {
			var instance = this;

			instance.get(CONTENT).addClass(CSS_TOGGLER_CONTENT);
			instance.get(HEADER).addClass(CSS_TOGGLER_HEADER);
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
				var gutter = toInt(content.getStyle(MARGIN_TOP));

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

			instance.get(CONTENT).replaceClass(CSS_TOGGLER_CONTENT_STATE[!val], CSS_TOGGLER_CONTENT_STATE[val]);
			instance.get(HEADER).replaceClass(CSS_TOGGLER_HEADER_STATE[!val], CSS_TOGGLER_HEADER_STATE[val]);
		}

	}
});

A.Toggler = Toggler;

}, '@VERSION@' ,{skinnable:true, requires:['aui-base','transition']});
AUI.add('aui-toggler-delegate', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isString = Lang.isString,

	AArray = A.Array,

	DOC = A.config.doc,

	Toggler = A.Toggler,

	DASH = '-',
	DOT = '.',
	EMPTY_STR = '',
	SPACE = ' ',

	ANIMATED = 'animated',
	CLICK = 'click',
	CLOSE_ALL_ON_EXPAND = 'closeAllOnExpand',
	CONTAINER = 'container',
	CONTENT = 'content',
	CUBIC_BEZIER = 'cubic-bezier(0.25, 0.1, 0.25, 1)',
	EXPANDED = 'expanded',
	FIRST_CHILD = 'firstChild',
	HEADER = 'header',
	KEYDOWN = 'keydown',
	LINEAR = 'linear',
	TOGGLER = 'toggler',
	TOGGLER_ANIMATING_CHANGE = 'toggler:animatingChange',
	TOGGLER_DELEGATE = 'toggler-delegate',
	TRANSITION = 'transition',
	WRAPPER = 'wrapper',

	getCN = A.getClassName,

	CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER);

var TogglerDelegate = A.Component.create({
	NAME: TOGGLER_DELEGATE,

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

			instance.on(TOGGLER_ANIMATING_CHANGE, A.bind(instance._onAnimatingChange, instance));

			container.delegate([CLICK, KEYDOWN], A.bind(instance.headerEventHandler, instance), header);
		},

		findContentNode: function(header) {
			var instance = this;
			var content = instance.get(CONTENT);

			var contentNode = header.next(content) || header.one(content);

			if (!contentNode) {
				var wrapper = header.next(DOT + CSS_TOGGLER_CONTENT_WRAPPER); 

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
			var toggler = target.getData(TOGGLER) || instance._create(target);

			if (Toggler.headerEventHandler(event, toggler) && instance.get(CLOSE_ALL_ON_EXPAND)) {
				AArray.each(
					instance.items,
					function(item, index, collection) {
						if (item !== toggler && item.get(EXPANDED)) {
							item.collapse();
						}
					}
				);
			}
		},

		_create: function(header) {
			var instance = this;

			var toggler = new Toggler({
				animated: instance.get(ANIMATED),
				bindDOMEvents: false,
				bubbleTargets: [ instance ],
				content: instance.findContentNode(header),
				expanded: instance.get(EXPANDED),
				header: header,
				transition: instance.get(TRANSITION)
			});

			return toggler;
		},

		_onAnimatingChange: function(event) {
			var instance = this;

			instance.animating = event.newVal;
		}

	}
});

A.TogglerDelegate = TogglerDelegate;

}, '@VERSION@' ,{requires:['aui-toggler-base'], skinnable:false});


AUI.add('aui-toggler', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-toggler-base','aui-toggler-delegate']});

