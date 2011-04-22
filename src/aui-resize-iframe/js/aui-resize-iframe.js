var Lang = A.Lang,
	isString = Lang.isString,

	RESIZE_IFRAME = 'resizeiframe',

	getClassName = A.getClassName,

	HEIGHT = 'height',
	NO = 'no',
	SCROLLING = 'scrolling',

	CSS_RESIZE_IFRAME_MONITORED_HEIGHT = getClassName(RESIZE_IFRAME, 'monitored', HEIGHT);

ResizeIframe = A.Component.create(
	{
		NAME: RESIZE_IFRAME,
		NS: RESIZE_IFRAME,

		EXTENDS: A.Plugin.Base,

		ATTRS: {
			monitorHeight: {
				value: true
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

				instance.after('monitorHeightChange', instance._afterMonitorHeightChange);
			},

			syncUI: function() {
				var instance = this;

				instance._uiSetMonitorHeight(instance.get('monitorHeight'));
			},

			destructor: function() {
				var instance = this;

				instance._uiSetMonitorHeight(false);
			},

			_afterMonitorHeightChange: function(event) {
				var instance = this;

				instance._uiSetMonitorHeight(event.newVal);
			},

			_clearInterval: function() {
				var instance = this;

				if (instance._intervalId) {
					A.clearInterval(instance._intervalId);
					instance._intervalId = null;
				}
			},

			_isIframeLoaded: function() {
				var instance = this;

				var loaded = false;

				try {
					var readyState = instance._iframe.contentWindow.document.readyState;

					loaded = (readyState == 'complete' || readyState == 'loaded');
				}
				catch (e) {
				}

				return loaded;
			},

			_onResize: function(event) {
				var instance = this;

				instance._sameDomain = null;

				var iframeHeight = instance._iframeHeight;
				var newHeight = iframeHeight;
				var doc;

				try {
					doc = instance._iframeEl.contentWindow.document;

					instance._sameDomain = true;
				}
				catch (e) {
				}

				if (doc && doc.body) {
					newHeight = doc.body.offsetHeight;

					if (iframeHeight != newHeight) {
						instance._iframeHeight = newHeight;

						instance._iframe.setStyle(HEIGHT, newHeight);
					}
				}
				else if (!doc) {
					instance._clearInterval();
				}
			},

			_setInterval: function() {
				var instance = this;

				if (!instance._intervalId) {
					instance._intervalId = A.setInterval(instance._onResize, 100, instance);
				}
			},

			_uiSetMonitorHeight: function(monitorHeight) {
				var instance = this;

				var iframe = instance._iframe;

				if (monitorHeight) {
					instance._setInterval();

					instance._loadHandle = iframe.on('load', instance._setInterval, instance);
					instance._previousScrolling = iframe.attr(SCROLLING);

					iframe.attr(SCROLLING, NO);

					iframe.addClass(CSS_RESIZE_IFRAME_MONITORED_HEIGHT);
				}
				else {
					instance._clearInterval();

					if (instance._loadHandle) {
						instance._loadHandle.detach();
					}

					iframe.attr(SCROLLING, instance._previousScrolling);

					iframe.removeClass(CSS_RESIZE_IFRAME_MONITORED_HEIGHT);
				}
			},

			_iframeHeight: 0
		}
	}
);

A.Plugin.ResizeIframe = ResizeIframe;