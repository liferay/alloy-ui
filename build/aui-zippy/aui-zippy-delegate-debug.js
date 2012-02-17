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
	FIRST_CHILD = 'firstChild',
	HEADER = 'header',
	KEYDOWN = 'keydown',
	LINEAR = 'linear',
	TRANSITION = 'transition',
	WRAPPER = 'wrapper',
	ZIPPY = 'zippy',
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
			value: true
		},

		container: {
			setter: A.one,
			value: DOC
		},

		content: {
			validator: isString
		},

		header: {
			validator: isString
		},

		transition: {
			validator: isObject,
			value: {
				duration: 2,
			    easing: LINEAR
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
			var target = event.target;

			var zippy = target.getData(ZIPPY) || instance._create(target);

			if (Zippy.headerEventHandler(event, zippy) && instance.get(CLOSE_ALL_ON_EXPAND)) {
				AArray.each(
					instance.items,
					function(item, index, collection) {
						if (item !== zippy) {
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
				header: header,
				transition: instance.get(TRANSITION)
			});

			return zippy;
		}

	}
});

A.ZippyDelegate = ZippyDelegate;

}, '@VERSION@' ,{skinnable:false, requires:['aui-zippy-base']});
