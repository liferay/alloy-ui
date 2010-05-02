AUI.add('aui-progressbar', function(A) {
var L = A.Lang,
	isNumber = L.isNumber,
	isString = L.isString,

	BLANK = '',
	DOT = '.',
	SPACE = ' ',

	AUTO = 'auto',
	BOUNDING_BOX = 'boundingBox',
	COMPLETE = 'complete',
	CONTENT_BOX = 'contentBox',
	HEIGHT = 'height',
	HORIZONTAL = 'horizontal',
	LABEL = 'label',
	LINE_HEIGHT = 'lineHeight',
	MAX = 'max',
	MIN = 'min',
	OFFSET_HEIGHT = 'offsetHeight',
	ORIENTATION = 'orientation',
	PROGRESS_BAR = 'progress-bar',
	PX = 'px',
	RATIO = 'ratio',
	STATUS = 'status',
	STATUS_NODE = 'statusNode',
	STEP = 'step',
	TEXT = 'text',
	TEXT_NODE = 'textNode',
	VALUE = 'value',
	VERTICAL = 'vertical',
	WIDTH = 'width',

	toNumber = function(v) {
		return parseFloat(v) || 0;
	},

	getCN = A.ClassNameManager.getClassName,

	CSS_HORIZONTAL = getCN(PROGRESS_BAR, HORIZONTAL),
	CSS_STATUS = getCN(PROGRESS_BAR, STATUS),
	CSS_TEXT = getCN(PROGRESS_BAR, TEXT),
	CSS_VERTICAL = getCN(PROGRESS_BAR, VERTICAL),

	TPL_STATUS = '<div class="'+CSS_STATUS+'"></div>',
	TPL_TEXT = '<div class="'+CSS_TEXT+'"></div>',

	WP = A.Widget.prototype,

	UI_ATTRS = [ LABEL, ORIENTATION, VALUE ],

	_BIND_UI_ATTRS = WP._BIND_UI_ATTRS,
	_SYNC_UI_ATTRS = WP._SYNC_UI_ATTRS,

	BIND_UI_ATTRS = _BIND_UI_ATTRS.concat(UI_ATTRS),
	SYNC_UI_ATTRS = _SYNC_UI_ATTRS.concat(UI_ATTRS);

function ProgressBar() {
	ProgressBar.superclass.constructor.apply(this, arguments);
}

A.mix(ProgressBar, {
	NAME: PROGRESS_BAR,

	ATTRS: {
		height: {
			valueFn: function() {
				return this.get(BOUNDING_BOX).get(OFFSET_HEIGHT) || 25;
			}
		},

		label: {
			value: BLANK
		},

		max: {
			validator: isNumber,
			value: 100
		},

		min: {
			validator: isNumber,
			value: 0
		},

		orientation: {
			value: HORIZONTAL,
			validator: function(val) {
				return isString(val) && (val === HORIZONTAL || val === VERTICAL);
			}
		},

		ratio: {
			getter: '_getRatio',
			readOnly: true
		},

		step: {
			getter: '_getStep',
			readOnly: true
		},

		statusNode: {
			valueFn: function() {
				return A.Node.create(TPL_STATUS);
			}
		},

		textNode: {
			valueFn: function() {
				return A.Node.create(TPL_TEXT);
			}
		},

		value: {
			setter: toNumber,
			validator: function(val) {
				return isNumber(toNumber(val)) && ((val >= this.get(MIN)) && (val <= this.get(MAX)));
			},
			value: 0
		}
	},

	HTML_PARSER: {
		label: function(contentBox) {
			var textNode = contentBox.one(DOT+CSS_TEXT);

			if (textNode) {
				return textNode.html();
			}
		},

		statusNode: DOT+CSS_STATUS,

		textNode: DOT+CSS_TEXT
	}
});

A.extend(ProgressBar, A.Widget, {
	_BIND_UI_ATTRS: BIND_UI_ATTRS,
	_SYNC_UI_ATTRS: SYNC_UI_ATTRS,

	/*
	* Lifecycle
	*/
	renderUI: function() {
		var instance = this;

		instance._renderStatusNode();
		instance._renderTextNode();
	},

	bindUI: function() {
		var instance = this;

		instance.after('valueChange', A.bind(instance._afterValueChange, instance));
	},

	_afterValueChange: function(event) {
		var instance = this;
		var step = instance.get(STEP);

		if (step >= 100) {
			instance.fire(COMPLETE, {
				progressbar: {
					ratio: instance.get(RATIO),
					step: step,
					value: instance.get(VALUE)
				}
			});
		}
	},

	_getContentBoxSize: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);

		return toNumber(
			contentBox.getStyle(
				this.get(ORIENTATION) === HORIZONTAL ? WIDTH : HEIGHT
			)
		);
	},

	_getPixelStep: function() {
		var instance = this;

		return instance._getContentBoxSize() * instance.get(RATIO);
	},

	_getRatio: function() {
		var instance = this;
		var min = instance.get(MIN);
		var ratio = (instance.get(VALUE) - min) / (instance.get(MAX) - min);

		return Math.max(ratio, 0);
	},

	_getStep: function() {
		return this.get(RATIO) * 100;
	},

	_renderStatusNode: function() {
		var instance = this;

		instance.get(CONTENT_BOX).append(
			instance.get(STATUS_NODE)
		);
	},

	_renderTextNode: function() {
		var instance = this;

		instance.get(CONTENT_BOX).append(
			instance.get(TEXT_NODE)
		);
	},

	_uiSetLabel: function(val) {
		this.get(TEXT_NODE).html(val);
	},

	_uiSetOrientation: function(val) {
		var instance = this;
		var boundingBox = instance.get(BOUNDING_BOX);
		var horizontal = (val === HORIZONTAL);

		boundingBox.toggleClass(CSS_HORIZONTAL, horizontal);
		boundingBox.toggleClass(CSS_VERTICAL, !horizontal);

		instance._uiSizeTextNode();
	},

	_uiSetValue: function(val) {
		var instance = this;
		var statusNode = instance.get(STATUS_NODE);
		var pixelStep = instance._getPixelStep();

		var styles = {};

		if (instance.get(ORIENTATION) === HORIZONTAL) {
			styles = {
				height: '100%',
				top: AUTO,
				width: pixelStep+PX
			};
		}
		else {
			 styles = {
				height: pixelStep+PX,
				top: toNumber(instance._getContentBoxSize() - pixelStep)+PX,
				width: '100%'
			};
		}

		statusNode.setStyles(styles);
	},

	_uiSizeTextNode: function() {
		var instance = this;
		var contentBox = instance.get(CONTENT_BOX);
		var textNode = instance.get(TEXT_NODE);

		textNode.setStyle(
			LINE_HEIGHT,
			contentBox.getStyle(HEIGHT)
		);
	}
});

A.ProgressBar = ProgressBar;

}, '@VERSION@' ,{requires:['aui-base'], skinnable:true});
