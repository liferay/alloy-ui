var Lang = A.Lang,
	isString = Lang.isString,

	RESIZE_IFRAME = 'resizeiframe',

	getClassName = A.getClassName,

	HEIGHT = 'height',
	HIDDEN = 'hidden',
	NO = 'no',
	SCROLLING = 'scrolling',
	WIDTH = 'width',

	CSS_RESIZE_IFRAME_MONITORED_HEIGHT = getClassName(RESIZE_IFRAME, 'monitored', HEIGHT);

ResizeIframe = A.Component.create(
	{
		NAME: RESIZE_IFRAME,
		NS: RESIZE_IFRAME,

		EXTENDS: A.Plugin.Base,

		ATTRS: {
			height: {
				value: 0
			},
			monitorHeight: {
				value: true
			},
			width: {
				value: null
			}
		},

		prototype: {
			initializer: function() {
				var instance = this;

				var frame = instance.get('host');

				instance._iframe = frame;
				instance._iframeEl = frame.getDOM();

				instance.bindUI();
				instance.syncUI();
			},

			bindUI: function() {
				var instance = this;

				instance.after('heightChange', instance._afterHeightChange);
				instance.after('monitorHeightChange', instance._afterMonitorHeightChange);
				instance.after('widthChange', instance._afterWidthChange);
			},

			syncUI: function() {
				var instance = this;

				instance._uiSetMonitorHeight(instance.get('monitorHeight'));
			},

			destructor: function() {
				var instance = this;

				instance._uiSetMonitorHeight(false);
			},

			_afterHeightChange: function(event) {
				var instance = this;

				instance.set('monitorHeight', false);

				instance._uiSetHeight(event.newVal);
			},

			_afterMonitorHeightChange: function(event) {
				var instance = this;

				instance._uiSetMonitorHeight(event.newVal);
			},

			_afterWidthChange: function(event) {
				var instance = this;

				instance._uiSetWidth(event.newVal);
			},

			_clearInterval: function() {
				var instance = this;

				var iframeDoc = instance._iframeDoc;

				if (iframeDoc) {
					var docEl = iframeDoc.documentElement;

					if (docEl) {
						docEl.style.overflow = '';
					}
				}

				if (instance._intervalId) {
					A.clearInterval(instance._intervalId);

					instance._intervalId = null;
				}
			},

			_onResize: function() {
				var instance = this;

				instance._iframeDoc = null;

				var newHeight = instance._iframeHeight;
				var iframeDoc;

				try {
					iframeDoc = instance._iframeEl.contentWindow.document;

					instance._iframeDoc = iframeDoc;
				}
				catch (e) {
				}

				if (iframeDoc) {
					var docEl = iframeDoc.documentElement;

					if (docEl) {
						docEl.style.overflow = HIDDEN;
					}
				}

				if (iframeDoc && iframeDoc.body) {
					newHeight = iframeDoc.body.offsetHeight;

					instance._uiSetHeight(newHeight);
				}
				else if (!iframeDoc) {
					instance._clearInterval();
				}
			},

			_setInterval: function(event) {
				var instance = this;

				if (!instance._intervalId) {
					instance._intervalId = A.setInterval(instance._onResize, 100, instance);
				}
			},

			_uiSetHeight: function(value) {
				var instance = this;

				if (instance._iframeHeight != value) {
					instance._iframeHeight = value;

					instance._iframe.setStyle(HEIGHT, value);
				}
			},

			_uiSetMonitorHeight: function(monitorHeight) {
				var instance = this;

				var iframe = instance._iframe;

				if (monitorHeight) {
					instance._setInterval();

					instance._loadHandle = iframe.on('load', instance._setInterval, instance);

					iframe.addClass(CSS_RESIZE_IFRAME_MONITORED_HEIGHT);
				}
				else {
					instance._clearInterval();

					if (instance._loadHandle) {
						instance._loadHandle.detach();
					}

					iframe.removeClass(CSS_RESIZE_IFRAME_MONITORED_HEIGHT);
				}
			},

			_uiSetWidth: function(value) {
				var instance = this;

				instance._iframe.setStyle(WIDTH, value);
			},

			_iframeHeight: 0
		}
	}
);

A.Plugin.ResizeIframe = ResizeIframe;