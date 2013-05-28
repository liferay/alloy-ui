/**
 * The Autosize Iframe Utility
 *
 * @module aui-autosize-iframe
 */

var Lang = A.Lang,
	isString = Lang.isString,

	AUTOSIZE_IFRAME = 'autosizeiframe',

	getClassName = A.getClassName,

	HEIGHT = 'height',
	HIDDEN = 'hidden',
	NO = 'no',
	SCROLLING = 'scrolling',
	WIDTH = 'width',

	CSS_AUTOSIZE_IFRAME_MONITORED_HEIGHT = getClassName(AUTOSIZE_IFRAME, 'monitored', HEIGHT);

/**
 * A base class for AutosizeIframe.
 *
 * @class A.AutosizeIframe
 * @extends A.Plugin.Base
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
AutosizeIframe = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property AutosizeIframe.NAME
	 * @type String
	 * @static
	 */
	NAME: AUTOSIZE_IFRAME,

	/**
	 * Static property provides a string to identify the namespace.
	 *
	 * @property AutosizeIframe.NS
	 * @type String
	 * @static
	 */
	NS: AUTOSIZE_IFRAME,

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property AutosizeIframe.EXTENDS
	 * @type String
	 * @static
	 */
	EXTENDS: A.Plugin.Base,

	/**
	 * Static property used to define the default attribute
	 * configuration for the AutosizeIframe.
	 *
	 * @property AutosizeIframe.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute height
		 * @default 0
		 * @type Number
		 */
		height: {
			value: 0
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute monitorHeight
		 * @default true
		 * @type Boolean
		 */
		monitorHeight: {
			value: true
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute width
		 * @default null
		 * @type Number
		 */
		width: {
			value: null
		}
	},

	prototype: {

		/**
		 * Construction logic executed during AutosizeIframe instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @param config
		 * @protected
		 */
		initializer: function(config) {
			var instance = this;

			var frame = instance.get('host');

			instance.node = frame;
			instance._iframeEl = frame.getDOM();

			instance._defaultHeight = config.height;

			instance.bindUI();
			instance.syncUI();
		},

		/**
		 * Bind the events on the AutosizeIframe UI. Lifecycle.
		 *
		 * @method bindUI
		 * @protected
		 */
		bindUI: function() {
			var instance = this;

			instance.after('heightChange', instance._afterHeightChange);
			instance.after('widthChange', instance._afterWidthChange);
			instance.after('monitorHeightChange', instance._afterMonitorHeightChange);
		},

		/**
		 * Sync the AutosizeIframe UI. Lifecycle.
		 *
		 * @method syncUI
		 * @protected
		 */
		syncUI: function() {
			var instance = this;

			instance._uiSetMonitorHeight(instance.get('monitorHeight'));
		},

		/**
		 * Destructor lifecycle implementation for the AutosizeIframe class. Lifecycle.
		 *
		 * @method destructor
		 * @protected
		 */
		destructor: function() {
			var instance = this;

			instance._uiSetMonitorHeight(false);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method pauseMonitor
		 */
		pauseMonitor: function() {
			var instance = this;

			instance._clearInterval();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method restartMonitor
		 */
		restartMonitor: function() {
			var instance = this;

			if (instance.get('monitorHeight')) {
				instance._setInterval();
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterHeightChange
		 * @param event
		 * @protected
		 */
		_afterHeightChange: function(event) {
			var instance = this;

			instance._uiSetHeight(event.newVal);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterMonitorHeightChange
		 * @param event
		 * @protected
		 */
		_afterMonitorHeightChange: function(event) {
			var instance = this;

			instance._uiSetMonitorHeight(event.newVal);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _afterWidthChange
		 * @param event
		 * @protected
		 */
		_afterWidthChange: function(event) {
			var instance = this;

			instance._uiSetWidth(event.newVal);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _clearInterval
		 * @protected
		 */
		_clearInterval: function() {
			var instance = this,
				iframeDoc = instance._iframeDoc;

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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onResize
		 * @protected
		 */
		_onResize: function() {
			var instance = this;

			instance._iframeDoc = null;

			var newHeight = instance._iframeHeight;

			var iframeDoc;
			var iframeWin;

			try {
				iframeWin = instance._iframeEl.contentWindow;

				iframeDoc = iframeWin.document;

				instance._iframeDoc = iframeDoc;
			}
			catch (e) {
			}

			if (iframeDoc && iframeWin) {
				newHeight = AutosizeIframe._getContentHeight(iframeWin, iframeDoc, instance._iframeHeight);

				instance._uiSetHeight(newHeight);
			}
			else if (!iframeDoc) {
				instance._clearInterval();

				instance._uiSetHeight(instance._defaultHeight);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setInterval
		 * @param event
		 * @protected
		 */
		_setInterval: function(event) {
			var instance = this;

			if (!instance._intervalId) {
				instance._onResize();

				instance._intervalId = A.setInterval(instance._onResize, 100, instance);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetHeight
		 * @param value
		 * @protected
		 */
		_uiSetHeight: function(value) {
			var instance = this;

			if (instance._iframeHeight != value) {
				instance._iframeHeight = value;

				instance.node.setStyle(HEIGHT, value);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetMonitorHeight
		 * @param monitorHeight
		 * @protected
		 */
		_uiSetMonitorHeight: function(monitorHeight) {
			var instance = this;

			var iframe = instance.node;

			if (monitorHeight) {
				instance._setInterval();

				instance._loadHandle = iframe.on('load', instance._setInterval, instance);

				iframe.addClass(CSS_AUTOSIZE_IFRAME_MONITORED_HEIGHT);
			}
			else {
				instance._clearInterval();

				if (instance._loadHandle) {
					instance._loadHandle.detach();
				}

				iframe.removeClass(CSS_AUTOSIZE_IFRAME_MONITORED_HEIGHT);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetWidth
		 * @param value
		 * @protected
		 */
		_uiSetWidth: function(value) {
			var instance = this;

			instance.node.setStyle(WIDTH, value);
		},

		_iframeHeight: 0
	}
});

A.mix(AutosizeIframe, {

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method getContentHeight
	 * @param iframeWin
	 */
	getContentHeight: function(iframeWin) {
		var contentHeight = null;

		try {
			var iframeDoc;

			if (iframeWin.nodeName && iframeWin.nodeName.toLowerCase() == 'iframe') {
				iframeWin = iframeWin.contentWindow;
			}
			else if (A.instanceOf(iframeWin, A.Node)) {
				iframeWin = iframeWin.getDOM().contentWindow;
			}

			iframeDoc = iframeWin.document;

			contentHeight = AutosizeIframe._getContentHeight(iframeWin, iframeDoc);
		}
		catch (e) {
		}

		return contentHeight;
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _getContentHeight
	 * @param iframeWin
	 * @param iframeDoc
	 * @param fallbackHeight
	 * @protected
	 */
	_getContentHeight: function(iframeWin, iframeDoc, fallbackHeight) {
		var contentHeight = null;

		if (iframeDoc && iframeWin.location.href != 'about:blank') {
			var docEl = iframeDoc.documentElement;
			var iframeBody = iframeDoc.body;

			if (docEl) {
				docEl.style.overflowY = HIDDEN;
			}

			var docOffsetHeight = (iframeBody && iframeBody.offsetHeight) || 0;

			var standardsMode = (iframeDoc.compatMode == 'CSS1Compat');

			if (standardsMode && docOffsetHeight) {
				contentHeight = docOffsetHeight;
			}
			else {
				contentHeight = AutosizeIframe._getQuirksHeight(iframeWin) || fallbackHeight;
			}
		}

		return contentHeight;
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method _getQuirksHeight
	 * @param iframeWin
	 * @protected
	 */
	_getQuirksHeight: function(iframeWin) {
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
	}
});

A.Plugin.AutosizeIframe = AutosizeIframe;