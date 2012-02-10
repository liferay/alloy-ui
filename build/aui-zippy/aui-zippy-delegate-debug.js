AUI.add('aui-zippy-delegate', function(A) {
var Lang = A.Lang,
	isBoolean = Lang.isBoolean,
	isObject = Lang.isObject,
	isString = Lang.isString,

	ZippyItem = A.ZippyItem,

	isZippyItem = function(v) {
		return (v instanceof ZippyItem);
	},

	DASH = '-',
	DOT = '.',
	EMPTY_STR = '',
	SPACE = ' ',

	ANIMATED = 'animated',
	CLICK = 'click',
	CONTENT = 'content',
	CONTAINER = 'container',
	HEADER = 'header',
	KEYDOWN = 'keydown',
	LINEAR = 'linear',
	TRANSITION = 'transition',
	ZIPPY = 'zippy',
	ZIPPY_ITEM = 'zippy-item';

var Zippy = A.Component.create({
	NAME: ZIPPY,

	ATTRS: {

		animated: {
			validator: isBoolean,
			value: false,
			writeOnce: true
		},

		container: {
			setter: A.one
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
				duration: 0.5,
			    easing: LINEAR
			}
		}

	},

	EXTENDS: A.Base,

	prototype: {

		initializer: function() {
			var instance = this;

			instance.bindUI();
		},

		bindUI: function() {
			var instance = this;
			var container = instance.get(CONTAINER);
			var header = instance.get(HEADER);

			container.delegate([CLICK, KEYDOWN], A.bind(instance.headerEventHandler, instance), header);
		},

		headerEventHandler: function(event) {
			var instance = this;
			var target = event.target;

			var zippyItem = target.getData(ZIPPY_ITEM);

			if (!isZippyItem(zippyItem)) {
				zippyItem = new ZippyItem({
					animated: instance.get(ANIMATED),
					bindDOMEvents: false,
					content: target.next(instance.get(CONTENT)),
					header: target,
					transition: instance.get(TRANSITION)
				});

				zippyItem.addTarget(instance);

				target.setData(ZIPPY_ITEM, zippyItem);
			}

			ZippyItem.headerEventHandler(event, zippyItem);
		}

	}
});

A.Zippy = Zippy;

}, '@VERSION@' ,{skinnable:false, requires:['aui-zippy-item']});
