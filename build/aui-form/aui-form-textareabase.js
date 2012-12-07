AUI.add('aui-form-textareabase', function(A) {
var Lang = A.Lang,

	getClassName = A.getClassName,

	DOC = A.config.doc,

	NAME = 'textareabase',

	ADJUSTSIZE = 'adjustSize',
	AUTO = 'auto',
	AUTOSIZE = 'autoSize',
	BIND_UI = 'bindUI',
	FONTSIZE = 'fontSize',
	HEIGHT = 'height',
	INNERHTML = 'innerHTML',
	MAXHEIGHT = 'maxHeight',
	MINHEIGHT = 'minHeight',
	NODE = 'node',
	PX = 'px',
	RENDER_UI = 'renderUI',
	SYNC_UI = 'syncUI',
	WIDTH = 'width',

	CSS_TEXTAREA = getClassName(NAME),
	CSS_HEIGHT_MONITOR = [
		getClassName(NAME, HEIGHT, 'monitor'),
		getClassName('field', 'text', 'input'),
		getClassName('helper', 'hidden', 'accessible')
	].join(' '),

	DEFAULT_EMPTY_CONTENT = '&nbsp;&nbsp;',
	DEFAULT_APPEND_CONTENT = '&nbsp;\n&nbsp;',

	TPL_HEIGHT_MONITOR_OPEN = '<pre class="' + CSS_HEIGHT_MONITOR + '">',
	TPL_HEIGHT_MONITOR_CLOSE = '</pre>',
	TPL_INPUT = '<textarea autocomplete="off" class="{cssClass}" name="{name}"></textarea>';

	function TextareaBase(config) {
		A.after(this._renderUITextareaBase, this, RENDER_UI);
		A.after(this._syncUITextareaBase, this, SYNC_UI);
		A.after(this._bindUITextareaBase, this, BIND_UI);
	}

	TextareaBase.NAME = NAME;

	TextareaBase.ATTRS = {
		autoSize: {
			value: true
		},

		height: {
			value: AUTO
		},

		maxHeight: {
			value: 1000,
			setter: '_setAutoDimension'
		},

		minHeight: {
			value: 45,
			setter: '_setAutoDimension'
		},

		width: {
			value: AUTO,
			setter: '_setAutoDimension'
		}
	};

	TextareaBase.HTML_PARSER = {
		node: 'textarea'
	};

	TextareaBase.prototype = {
		FIELD_TEMPLATE: TPL_INPUT,

		_renderUITextareaBase: function() {
			var instance = this;

			if (instance.get(AUTOSIZE)) {
				instance._renderHeightMonitor();
			}
		},

		_bindUITextareaBase: function() {
			var instance = this;

			if (instance.get(AUTOSIZE)) {
				instance.get(NODE).on('input', instance._onInput, instance);
			}

			instance.after(ADJUSTSIZE, instance._uiAutoSize);

			instance.after('heightChange', instance._afterHeightChange);
			instance.after('widthChange', instance._afterWidthChange);
		},

		_syncUITextareaBase: function() {
			var instance = this;

			instance._setAutoDimension(instance.get(MINHEIGHT), MINHEIGHT);
			instance._setAutoDimension(instance.get(MAXHEIGHT), MAXHEIGHT);

			var width = instance.get(WIDTH);
			var height = instance.get(MINHEIGHT);

			instance._setAutoDimension(width, WIDTH);

			instance._uiSetDim(HEIGHT, height);
			instance._uiSetDim(WIDTH, width);
		},

		_afterHeightChange: function(event) {
			var instance = this;

			instance._uiSetDim(HEIGHT, event.newVal, event.prevVal);
		},

		_afterWidthChange: function(event) {
			var instance = this;

			instance._uiSetDim(WIDTH, event.newVal, event.prevVal);
		},

		_onInput: function(event) {
			var instance = this;

			instance.fire(ADJUSTSIZE);
		},

		_renderHeightMonitor: function() {
			var instance = this;

			var heightMonitor = A.Node.create(TPL_HEIGHT_MONITOR_OPEN + TPL_HEIGHT_MONITOR_CLOSE);
			var node = instance.get(NODE);

			A.getBody().append(heightMonitor);

			instance._heightMonitor = heightMonitor;

			var fontFamily = node.getComputedStyle('fontFamily');
			var fontSize = node.getComputedStyle(FONTSIZE);
			var fontWeight = node.getComputedStyle('fontWeight');
			var lineHeight = node.getComputedStyle(FONTSIZE);

			node.setStyle(HEIGHT, instance.get(MINHEIGHT) + PX);

			heightMonitor.setStyles(
				{
					fontFamily: fontFamily,
					fontSize: fontSize,
					fontWeight: fontWeight
				}
			);

			if ('outerHTML' in heightMonitor.getDOM()) {
				instance._updateContent = instance._updateOuterContent;
			}
			else {
				instance._updateContent = instance._updateInnerContent;
			}
		},

		_setAutoDimension: function(value, key) {
			var instance = this;

			instance['_' + key] = value;
		},

		_uiAutoSize: function() {
			var instance = this;

			var node = instance.get(NODE);
			var heightMonitor = instance._heightMonitor;

			var minHeight = instance._minHeight;
			var maxHeight = instance._maxHeight;

			var content = node.val();
			var textNode = DOC.createTextNode(content);

			heightMonitor.set(INNERHTML, '');

			heightMonitor.appendChild(textNode);

			heightMonitor.setStyle(WIDTH, node.getComputedStyle(WIDTH));

			content = heightMonitor.get(INNERHTML);

			if (!content.length) {
				content = DEFAULT_EMPTY_CONTENT;
			}
			else {
				content += DEFAULT_APPEND_CONTENT;
			}

			instance._updateContent(content);

			var height = Math.max(heightMonitor.get('offsetHeight'), minHeight);

			height = Math.min(height, maxHeight);

			if (height != instance._lastHeight) {
				instance._lastHeight = height;

				instance._uiSetDim(HEIGHT, height);
			}
		},

		_uiSetDim: function(key, newVal) {
			var instance = this;

			var node = instance.get(NODE);

			if (Lang.isNumber(newVal)) {
				newVal += PX;
			}

			node.setStyle(key, newVal);
		},

		_updateInnerContent: function(content) {
			var instance = this;

			return instance._heightMonitor.set(INNERHTML, content);
		},

		_updateOuterContent: function(content) {
			var instance = this;

			content = content.replace(/\n/g, '<br />');

			return instance._updateInnerContent(content);
		}
	};

	A.TextareaBase = TextareaBase;

}, '@VERSION@' ,{skinnable:false, requires:['aui-base']});
