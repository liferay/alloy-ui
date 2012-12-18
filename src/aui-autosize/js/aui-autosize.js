var Lang = A.Lang,

	DOC = A.config.doc,

	AUTOSIZE = 'autosize',

	getClassName = A.getClassName,

	ADJUSTSIZE = 'adjustSize',
	HEIGHT = 'height',
	HOST = 'host',
	INNERHTML = 'innerHTML',
	MAXHEIGHT = 'maxHeight',
	MINHEIGHT = 'minHeight',
	WIDTH = 'width',

	CSS_HEIGHT_MONITOR = [
		getClassName(AUTOSIZE, HEIGHT, 'monitor'),
		getClassName('field', 'text', 'input'),
		getClassName('helper', 'hidden', 'accessible')
	].join(' '),

	DEFAULT_APPEND_CONTENT = '&nbsp;\n&nbsp;',

	TPL_HEIGHT_MONITOR = '<pre class="' + CSS_HEIGHT_MONITOR + '">' + DEFAULT_APPEND_CONTENT + '</pre>';

Autosize = A.Component.create(
	{
		NAME: AUTOSIZE,

		NS: AUTOSIZE,

		ATTRS: {
			maxHeight: {
				value: 1000,
				setter: '_setAutoDimension'
			},

			minHeight: {
				value: 45,
				setter: '_setAutoDimension'
			}
		},

		EXTENDS: A.Plugin.Base,

		prototype: {
			initializer: function() {
				var instance = this;

				instance._renderUI();
				instance._bindUI();
				instance._syncUI();
			},

			_bindUI: function() {
				var instance = this;

				instance.onHostEvent('valuechange', instance._onValueChange, instance);

				instance.after(['maxHeightChange', 'minHeightChange'], instance._syncHeight);

				instance.after(ADJUSTSIZE, instance._uiAutoSize);
			},

			_onValueChange: function(event) {
				var instance = this;

				instance.fire(ADJUSTSIZE);
			},

			_renderUI: function() {
				var instance = this;

				var heightMonitor = A.Node.create(TPL_HEIGHT_MONITOR);

				var node = instance.get(HOST);

				A.getBody().append(heightMonitor);

				instance._heightMonitor = heightMonitor;

				var fontFamily = node.getComputedStyle('fontFamily');
				var fontSize = node.getComputedStyle('fontSize');
				var fontStyle = node.getComputedStyle('fontStyle');
				var fontWeight = node.getComputedStyle('fontWeight');
				var lineHeight = node.getComputedStyle('lineHeight');
				var letterSpacing = node.getComputedStyle('letterSpacing');
				var textTransform = node.getComputedStyle('textTransform');

				heightMonitor.setStyles(
					{
						fontFamily: fontFamily,
						fontSize: fontSize,
						fontStyle: fontStyle,
						fontWeight: fontWeight,
						lineHeight: lineHeight,
						letterSpacing: letterSpacing,
						textTransform: textTransform
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

			_syncUI: function() {
				var instance = this;

				instance._syncHeight();
			},

			_syncHeight: function() {
				var instance = this;

				var node = instance.get(HOST);

				var heightMonitor = instance._heightMonitor;

				var height = heightMonitor.height();

				var defMaxHeight = heightMonitor.height(instance.get(MAXHEIGHT)).height();
				var defMinHeight = heightMonitor.height(instance.get(MINHEIGHT)).height();

				heightMonitor.height('');

				var maxHeight = Math.max(defMinHeight, defMaxHeight);
				var minHeight = Math.min(Math.max(height, defMinHeight), defMaxHeight);

				instance._setAutoDimension(minHeight, HEIGHT);
				instance._setAutoDimension(minHeight, MINHEIGHT);

				instance._setAutoDimension(maxHeight, MAXHEIGHT);

				node.height(minHeight);
			},

			_uiAutoSize: function() {
				var instance = this;

				var node = instance.get(HOST);
				var heightMonitor = instance._heightMonitor;

				var minHeight = instance._minHeight;
				var maxHeight = instance._maxHeight;

				var content = node.val();

				heightMonitor.set(INNERHTML, '');

				heightMonitor.appendChild(DOC.createTextNode(content));

				heightMonitor.setStyle(WIDTH, node.getComputedStyle(WIDTH));

				content = heightMonitor.get(INNERHTML) + DEFAULT_APPEND_CONTENT;

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

				var node = instance.get(HOST);

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
		}
	}
);

A.Plugin.Autosize = Autosize;