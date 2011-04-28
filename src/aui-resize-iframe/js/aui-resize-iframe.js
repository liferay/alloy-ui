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

				instance.node = frame;
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

			pauseMonitor: function() {
				var instance = this;

				instance._clearInterval();
			},

			restartMonitor: function() {
				var instance = this;

				if (instance.get('monitorHeight')) {
					instance._setInterval();
				}
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
						docEl.style.overflowY = '';
					}
				}

				if (instance._intervalId) {
					A.clearInterval(instance._intervalId);

					instance._intervalId = null;
				}
			},

			_getQuirksHeight: function(iframeWin) {
				var instance = this;

				var contentHeight = 0;

				var iframeDoc = iframeWin.document;
				var docEl = iframeDoc && iframeDoc.documentElement;
				var iframeBody = iframeDoc && iframeDoc.body;

				var viewPortHeight = 0;

				if (iframeWin.innerHeight) {
					viewPortHeight = iframeWin.innerHeight;
				}
				else if (docEl && docEl.clientHeight) {
					viewPortHeight = docEl.clientHeight;
				}
				else if (iframeBody) {
					viewPortHeight = iframeBody.clientHeight;
				}

				if (iframeDoc) {
					var docClientHeight;
					var docScrollHeight;
					var docOffsetHeight = (iframeBody && iframeBody.offsetHeight);

					if (docEl) {
						docClientHeight = docEl.clientHeight;
						docScrollHeight = docEl.scrollHeight;
						docOffsetHeight = docEl.offsetHeight;
					}

					if (docClientHeight != docOffsetHeight && iframeBody) {
						docOffsetHeight = iframeBody.offsetHeight;
						docScrollHeight = iframeBody.scrollHeight;
					}

					var compareNum;

					if (docScrollHeight > viewPortHeight) {
						compareNum = Math.max;
					}
					else {
						compareNum = Math.min;
					}

					contentHeight = compareNum(docScrollHeight, docOffsetHeight);
				}

				return contentHeight;
			},

			_onResize: function() {
				var instance = this;

				instance._iframeDoc = null;

				var newHeight = instance._iframeHeight;
				var iframeWin = instance._iframeEl.contentWindow;

				var iframeDoc;

				try {
					iframeDoc = iframeWin.document;

					instance._iframeDoc = iframeDoc;
				}
				catch (e) {
				}

				if (iframeDoc) {
					var docEl = iframeDoc.documentElement;
					var iframeBody = iframeDoc.body;

					if (docEl) {
						docEl.style.overflowY = HIDDEN;
					}

					var docOffsetHeight = (iframeBody && iframeBody.offsetHeight) || 0;

					var standardsMode = (iframeDoc.compatMode == 'CSS1Compat');

					if (standardsMode && docOffsetHeight) {
						newHeight = docOffsetHeight;
					}
					else {
						newHeight = instance._getQuirksHeight(iframeWin) || instance._iframeHeight;
					}

					instance._uiSetHeight(newHeight);
				}
				else {
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

					instance.node.setStyle(HEIGHT, value);
				}
			},

			_uiSetMonitorHeight: function(monitorHeight) {
				var instance = this;

				var iframe = instance.node;

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

				instance.node.setStyle(WIDTH, value);
			},

			_iframeHeight: 0
		}
	}
);

A.Plugin.ResizeIframe = ResizeIframe;