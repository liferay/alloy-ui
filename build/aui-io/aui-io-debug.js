AUI.add('aui-io-request', function(A) {
/**
 * The IORequest Utility - Provides response data normalization for XML, JSON,
 * JavaScript and cache option.
 *
 * @module aui-io
 * @submodule aui-io-request
 */

var L = A.Lang,
	isBoolean = L.isBoolean,
	isFunction = L.isFunction,
	isString = L.isString,

	defaults = YUI.AUI.namespace('defaults.io'),

	getDefault = function(attr) {
		return function() {
			return defaults[attr];
		};
	},

	ACTIVE = 'active',
	ARGUMENTS = 'arguments',
	AUTO_LOAD = 'autoLoad',
	CACHE = 'cache',
	CFG = 'cfg',
	COMPLETE = 'complete',
	CONTENT_TYPE = 'content-type',
	CONTEXT = 'context',
	DATA = 'data',
	DATA_TYPE = 'dataType',
	EMPTY_STRING = '',
	END = 'end',
	FAILURE = 'failure',
	FORM = 'form',
	GET = 'get',
	HEADERS = 'headers',
	IO_REQUEST = 'IORequest',
	JSON = 'json',
	METHOD = 'method',
	RESPONSE_DATA = 'responseData',
	START = 'start',
	SUCCESS = 'success',
	SYNC = 'sync',
	TIMEOUT = 'timeout',
	TRANSACTION = 'transaction',
	URI = 'uri',
	XDR = 'xdr',
	XML = 'xml',

	PARSE_ERROR = 'Parser error: IO dataType is not correctly parsing',

	ACCEPTS = {
		all: '*/*',
		html: 'text/html',
		json: 'application/json, text/javascript',
		text: 'text/plain',
		xml: 'application/xml, text/xml'
	};

/**
 * A base class for IORequest, providing:
 * <ul>
 *    <li>Response data normalization for XML, JSON, JavaScript</li>
 *    <li>Cache options</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>A.io.request(uri, config);</code></pre>
 *
 * Check the list of <a href="IORequest.html#configattributes">Configuration Attributes</a> available for
 * IORequest.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class IORequest
 * @constructor
 * @extends Plugin.Base
 * @uses io
 */
var IORequest = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property IORequest.NAME
		 * @type String
		 * @static
		 */
		NAME: IO_REQUEST,

		/**
		 * Static property used to define the default attribute
		 * configuration for the IORequest.
		 *
		 * @property IORequest.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * If <code>true</code> invoke the
	         * <a href="IORequest.html#method_start">start</a> method automatically,
	         * initializing the IO transaction.
			 *
			 * @attribute autoLoad
			 * @default true
			 * @type boolean
			 */
			autoLoad: {
				value: true,
				validator: isBoolean
			},

			/**
			 * If <code>false</code> the current timestamp will be appended to the
	         * url, avoiding the url to be cached.
			 *
			 * @attribute cache
			 * @default true
			 * @type boolean
			 */
			cache: {
				value: true,
				validator: isBoolean
			},

			/**
			 * The type of the request (i.e., could be xml, json, javascript, text).
			 *
			 * @attribute dataType
			 * @default null
			 * @type String
			 */
			dataType: {
				setter: function(v) {
					return (v || EMPTY_STRING).toLowerCase();
				},
				value: null,
				validator: isString
			},

			/**
			 * This is a normalized attribute for the response data. It's useful
	         * to retrieve the correct type for the
	         * <a href="IORequest.html#config_dataType">dataType</a> (i.e., in json
	         * requests the <code>responseData</code>) is a JSONObject.
			 *
			 * @attribute responseData
			 * @default null
			 * @type String | JSONObject | XMLDocument
			 */
			responseData: {
				setter: function(v) {
					return this._setResponseData(v);
				},
				value: null
			},

			/**
			 * URI to be requested using AJAX.
			 *
			 * @attribute uri
			 * @default null
			 * @type String
			 */
			uri: {
				setter: function(v) {
					return this._parseURL(v);
				},
				value: null,
				validator: isString
			},

			// User readOnly variables

			/**
			 * Whether the transaction is active or not.
			 *
			 * @attribute active
			 * @default false
			 * @type boolean
			 */
			active: {
				value: false,
				validator: isBoolean
			},

			/**
			 * Object containing all the
	         * <a href="io.html#configattributes">IO Configuration Attributes</a>.
	         * This Object is passed to the <code>A.io</code> internally.
			 *
			 * @attribute cfg
			 * @default Object containing all the
	         * <a href="io.html#configattributes">IO Configuration Attributes</a>.
	         * @readOnly
			 * @type String
			 */
			cfg: {
				getter: function() {
					var instance = this;

					// keep the current cfg object always synchronized with the mapped public attributes
					// when the user call .start() it always retrieve the last set values for each mapped attr
					return {
						arguments: instance.get(ARGUMENTS),
						context: instance.get(CONTEXT),
						data: instance.getFormattedData(),
						form: instance.get(FORM),
						headers: instance.get(HEADERS),
						method: instance.get(METHOD),
						on: {
							complete: A.bind(instance.fire, instance, COMPLETE),
							end: A.bind(instance._end, instance),
							failure: A.bind(instance.fire, instance, FAILURE),
							start: A.bind(instance.fire, instance, START),
							success: A.bind(instance._success, instance)
						},
						sync: instance.get(SYNC),
						timeout: instance.get(TIMEOUT),
						xdr: instance.get(XDR)
					};
				},
				readOnly: true
			},

			/**
			 * Stores the IO Object of the current transaction.
			 *
			 * @attribute transaction
			 * @default null
			 * @type Object
			 */
			transaction: {
				value: null
			},

			// Configuration Object mapping
			// To take advantages of the Attribute listeners of A.Base
			// See: http://developer.yahoo.com/yui/3/io/

			/**
			 * See <a href="http://developer.yahoo.com/yui/3/io/#configuration">IO
	        * Configuration</a>.
			 *
			 * @attribute arguments
			 * @default Value mapped on YUI.AUI.defaults.io.
			 * @type Object
			 */
			arguments: {
				valueFn: getDefault(ARGUMENTS)
			},

			/**
			 * See <a href="http://developer.yahoo.com/yui/3/io/#configuration">IO
	        * Configuration</a>.
			 *
			 * @attribute context
			 * @default Value mapped on YUI.AUI.defaults.io.
			 * @type Object
			 */
			context: {
				valueFn: getDefault(CONTEXT)
			},

			/**
			 * See <a href="http://developer.yahoo.com/yui/3/io/#configuration">IO
	        * Configuration</a>.
			 *
			 * @attribute data
			 * @default Value mapped on YUI.AUI.defaults.io.
			 * @type Object
			 */
			data: {
				valueFn: getDefault(DATA)
			},

			/**
			 * See <a href="http://developer.yahoo.com/yui/3/io/#configuration">IO
	        * Configuration</a>.
			 *
			 * @attribute form
			 * @default Value mapped on YUI.AUI.defaults.io.
			 * @type Object
			 */
			form: {
				valueFn: getDefault(FORM)
			},

			/**
			 * Set the correct ACCEPT header based on the dataType.
			 *
			 * @attribute headers
			 * @default Object
			 * @type Object
			 */
			headers: {
				getter: function(value) {
					var header = [];
					var instance = this;
					var dataType = instance.get(DATA_TYPE);

					if (dataType) {
						header.push(
							ACCEPTS[dataType]
						);
					}

					// always add *.* to the accept header
					header.push(
						ACCEPTS.all
					);

					return A.merge(
						value,
						{
							Accept: header.join(', ')
						}
					);
				},
				valueFn: getDefault(HEADERS)
			},

			/**
			 * See <a href="http://developer.yahoo.com/yui/3/io/#configuration">IO
	        * Configuration</a>.
			 *
			 * @attribute method
			 * @default Value mapped on YUI.AUI.defaults.io.
			 * @type String
			 */
			method: {
				valueFn: getDefault(METHOD)
			},

			/**
			 * A selector to be used to query against the response of the
			 * request. Only works if the response is XML or HTML.
			 *
			 * @attribute selector
			 * @type string
			 */
			selector: {
				value: null
			},

			/**
			 * See <a href="http://developer.yahoo.com/yui/3/io/#configuration">IO
	        * Configuration</a>.
			 *
			 * @attribute sync
			 * @default Value mapped on YUI.AUI.defaults.io.
			 * @type boolean
			 */
			sync: {
				valueFn: getDefault(SYNC)
			},

			/**
			 * See <a href="http://developer.yahoo.com/yui/3/io/#configuration">IO
	        * Configuration</a>.
			 *
			 * @attribute timeout
			 * @default Value mapped on YUI.AUI.defaults.io.
			 * @type Number
			 */
			timeout: {
				valueFn: getDefault(TIMEOUT)
			},

			/**
			 * See <a href="http://developer.yahoo.com/yui/3/io/#configuration">IO
	         * Configuration</a>.
			 *
			 * @attribute xdr
			 * @default Value mapped on YUI.AUI.defaults.io.
			 * @type Object
			 */
			xdr: {
				valueFn: getDefault(XDR)
			}
		},

		EXTENDS: A.Plugin.Base,

		prototype: {
			/**
			 * Construction logic executed during IORequest instantiation. Lifecycle.
			 *
			 * @method initializer
			 * @protected
			 */
			init: function(config) {
				var instance = this;

				IORequest.superclass.init.apply(this, arguments);

				instance._autoStart();
			},

			/**
			 * Descructor lifecycle implementation for the IORequest class.
			 * Purges events attached to the node (and all child nodes).
			 *
			 * @method destructor
			 * @protected
			 */
			destructor: function() {
				var instance = this;

				instance.stop();

				instance.set(TRANSACTION, null);
			},

			/**
			 * Applies the <code>YUI.AUI.defaults.io.dataFormatter</code> if defined and return the formatted data.
			 *
			 * @method getFormattedData
			 * @protected
			 * @return {String}
			 */
			getFormattedData: function() {
				var instance = this;
				var value = instance.get(DATA);
				var dataFormatter = defaults.dataFormatter;

				if (isFunction(dataFormatter)) {
					value = dataFormatter.call(instance, value);
				}

				return value;
			},

			/**
			 * Starts the IO transaction. Used to refresh the content also.
			 *
			 * @method start
			 */
			start: function() {
				var instance = this;

				instance.destructor();

				instance.set(ACTIVE, true);

				var ioObj = instance._yuiIOObj;

				if (!ioObj) {
					ioObj = new A.IO();

					instance._yuiIOObj = ioObj;
				}

				var transaction = ioObj.send(
					instance.get(URI),
					instance.get(CFG)
				);

				instance.set(TRANSACTION, transaction);
			},

			/**
			 * Stops the IO transaction.
			 *
			 * @method stop
			 */
			stop: function() {
				var instance = this;
				var transaction = instance.get(TRANSACTION);

				if (transaction) {
					transaction.abort();
				}
			},

			/**
			 * Invoke the <code>start</code> method (autoLoad attribute).
			 *
			 * @method _autoStart
			 * @protected
			 */
			_autoStart: function() {
				var instance = this;

				if (instance.get(AUTO_LOAD)) {
					instance.start();
				}
			},

			/**
			 * Parse the <a href="IORequest.html#config_uri">uri</a> to add a
		     * timestamp if <a href="IORequest.html#config_cache">cache</a> is
		     * <code>true</code>. Also applies the
		     * <code>YUI.AUI.defaults.io.uriFormatter</code>.
			 *
			 * @method _parseURL
			 * @param {String} url
			 * @protected
			 * @return {String}
			 */
			_parseURL: function(url) {
				var instance = this;
				var cache = instance.get(CACHE);
				var method = instance.get(METHOD);

				// reusing logic to add a timestamp on the url from jQuery 1.3.2
				if ( (cache === false) && (method == GET) ) {
					var ts = +new Date;
					// try replacing _= if it is there
					var ret = url.replace(/(\?|&)_=.*?(&|$)/, '$1_=' + ts + '$2');
					// if nothing was replaced, add timestamp to the end
					url = ret + ((ret == url) ? (url.match(/\?/) ? '&' : '?') + '_=' + ts : '');
				}

				// formatting the URL with the default uriFormatter after the cache timestamp was added
				var uriFormatter = defaults.uriFormatter;

				if (isFunction(uriFormatter)) {
					url = uriFormatter.apply(instance, [url]);
				}

				return url;
			},

			/**
			 * Internal end callback for the IO transaction.
			 *
			 * @method _end
			 * @param {Number} id ID of the IO transaction.
			 * @param {Object} args Custom arguments, passed to the event handler. See <a href="http://developer.yahoo.com/yui/3/io/#configuration">IO
			 * @protected
			 */
			_end: function(id, args) {
				var instance = this;

				instance.set(ACTIVE, false);
				instance.set(TRANSACTION, null);

				instance.fire(END, id, args);
			},

			/**
			 * Internal success callback for the IO transaction.
			 *
			 * @method _success
			 * @param {Number} id ID of the IO transaction.
			 * @param {Object} obj IO transaction Object.
			 * @param {Object} args Custom arguments, passed to the event handler. See <a href="http://developer.yahoo.com/yui/3/io/#configuration">IO
			 * @protected
			 */
			_success: function(id, obj, args) {
				var instance = this;

				// update the responseData attribute with the new data from xhr
				instance.set(RESPONSE_DATA, obj);

				instance.fire(SUCCESS, id, obj, args);
			},

			/**
			 * Setter for <a href="IORequest.html#config_responseData">responseData</a>.
			 *
			 * @method _setResponseData
			 * @protected
			 * @param {Object} xhr XHR Object.
			 * @return {Object}
			 */
			_setResponseData: function(xhr) {
				var data = null;
				var instance = this;

				if (xhr) {
					var dataType = instance.get(DATA_TYPE);
					var contentType = xhr.getResponseHeader(CONTENT_TYPE) || '';

					// if the dataType or the content-type is XML...
					if ((dataType == XML) ||
						(!dataType && contentType.indexOf(XML) >= 0)) {

						// use responseXML
						data = xhr.responseXML;

						// check if the XML was parsed correctly
						if (data.documentElement.tagName == 'parsererror') {
							throw PARSE_ERROR;
						}
					}
					else {
						// otherwise use the responseText
						data = xhr.responseText;
					}

					// empty string is not a valid JSON, convert it to null
					if (data === EMPTY_STRING) {
						data = null;
					}

					// trying to parse to JSON if dataType is a valid json
					if (dataType == JSON) {
						try {
							data = A.JSON.parse(data);
						}
						catch(e) {
							// throw PARSE_ERROR;
						}
					}
					else {
						var selector = instance.get('selector');

						if (data && selector) {
							var tempRoot;

							if (data.documentElement) {
								tempRoot = A.one(data);
							}
							else {
								tempRoot = A.Node.create(data);
							}

							data = tempRoot.all(selector);
						}
					}
				}

				return data;
			}
		}
	}
);

A.IORequest = IORequest;

/**
 * Alloy IO extension
 *
 * @class A.io
 * @static
 */

/**
 * Static method to invoke the <a href="IORequest.html">IORequest</a>. Likewise <a href="io.html#method_io">io</a>.
 *
 * @method A.io.request
 * @for A.io
 * @param {String} uri URI to be requested.
 * @param {Object} config Configuration Object for the <a href="io.html">IO</a>.
 * @return {IORequest}
 */
A.io.request = function(uri, config) {
	return new A.IORequest(
		A.merge(config, {
			uri: uri
		})
	);
};

}, '@VERSION@' ,{requires:['aui-base','io-base','json','plugin','querystring-stringify']});
AUI.add('aui-io-plugin', function(A) {
/**
 * The IOPlugin Utility - When plugged to a Node or Widget loads the content
 * of a URI and set as its content, parsing the <code>script</code> tags if
 * present on the code.
 *
 * @module aui-io
 * @submodule aui-io-plugin
 */

var L = A.Lang,
	isBoolean = L.isBoolean,
	isString = L.isString,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	StdMod = A.WidgetStdMod,

	TYPE_NODE = 'Node',
	TYPE_WIDGET = 'Widget',

	EMPTY = '',
	FAILURE = 'failure',
	FAILURE_MESSAGE = 'failureMessage',
	HOST = 'host',
	ICON = 'icon',
	IO = 'io',
	IO_PLUGIN = 'IOPlugin',
	LOADING = 'loading',
	LOADING_MASK = 'loadingMask',
	NODE = 'node',
	OUTER = 'outer',
	PARSE_CONTENT = 'parseContent',
	QUEUE = 'queue',
	RENDERED = 'rendered',
	SECTION = 'section',
	SHOW_LOADING = 'showLoading',
	SUCCESS = 'success',
	TYPE = 'type',
	WHERE = 'where',

	getCN = A.getClassName,

	CSS_ICON_LOADING = getCN(ICON, LOADING);

/**
 * A base class for IOPlugin, providing:
 * <ul>
 *    <li>Loads the content of a URI as content of a Node or Widget</li>
 *    <li>Use <a href="ParseContent.html">ParseContent</a> to parse the JavaScript tags from the content and evaluate them</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>A.one('#content').plug(A.Plugin.IO, { uri: 'assets/content.html', method: 'GET' });</code></pre>
 *
 * Check the list of <a href="A.Plugin.IO.html#configattributes">Configuration Attributes</a> available for
 * IOPlugin.
 *
 * @param config {Object} Object literal specifying widget configuration properties.
 *
 * @class A.Plugin.IO
 * @constructor
 * @extends IORequest
 */
var IOPlugin = A.Component.create(
	{
		/**
		 * Static property provides a string to identify the class.
		 *
		 * @property A.Plugin.IO.NAME
		 * @type String
		 * @static
		 */
		NAME: IO_PLUGIN,

		/**
		 * Static property provides a string to identify the namespace.
		 *
		 * @property A.Plugin.IO.NS
		 * @type String
		 * @static
		 */
		NS: IO,

		/**
		 * Static property used to define the default attribute
		 * configuration for the A.Plugin.IO.
		 *
		 * @property A.Plugin.IO.ATTRS
		 * @type Object
		 * @static
		 */
		ATTRS: {
			/**
			 * Plug IO in any object we want, the setContent will use the node to
	         * set the content.
			 *
			 * @attribute node
			 * @default null
			 * @type Node | String
			 */
			node: {
				value: null,
				getter: function(value) {
					var instance = this;

					if (!value) {
						var host = instance.get(HOST);
						var type = instance.get(TYPE);

						if (type == TYPE_NODE) {
							value = host;
						}
						else if (type == TYPE_WIDGET) {
							var section = instance.get(SECTION);

							// if there is no node for the SECTION, forces creation
							if (!host.getStdModNode(section)) {
								host.setStdModContent(section, EMPTY);
							}

							value = host.getStdModNode(section);
						}
					}

					return A.one(value);
				},
				validator: isNode
			},

			/**
			 * Message to be set on the content when the transaction fails.
			 *
			 * @attribute failureMessage
			 * @default 'Failed to retrieve content'
			 * @type String
			 */
			failureMessage: {
				value: 'Failed to retrieve content',
				validator: isString
			},

			/**
			 * Options passed to the <a href="LoadingMask.html">LoadingMask</a>.
			 *
			 * @attribute loadingMask
			 * @default {}
			 * @type Object
			 */
			loadingMask: {
				value: {}
			},

			/**
			 * If true the <a href="ParseContent.html">ParseContent</a> plugin
	         * will be plugged to the <a href="A.Plugin.IO.html#config_node">node</a>.
			 *
			 * @attribute parseContent
			 * @default true
			 * @type boolean
			 */
			parseContent: {
				value: true,
				validator: isBoolean
			},

			/**
			 * Show the <a href="LoadingMask.html">LoadingMask</a> covering the <a
	         * href="A.Plugin.IO.html#config_node">node</a> while loading.
			 *
			 * @attribute showLoading
			 * @default true
			 * @type boolean
			 */
			showLoading: {
				value: true,
				validator: isBoolean
			},

			/**
			 * Section where the content will be set in case you are plugging it
	         * on a instace of <a href="WidgetStdMod.html">WidgetStdMod</a>.
			 *
			 * @attribute section
			 * @default StdMod.BODY
			 * @type String
			 */
			section: {
				value: StdMod.BODY,
				validator: function(val) {
					return (!val || val == StdMod.BODY || val == StdMod.HEADER || val == StdMod.FOOTER);
				}
			},

			/**
			 * Type of the <code>instance</code> we are pluggin the A.Plugin.IO.
	         * Could be a Node, or a Widget.
			 *
			 * @attribute type
			 * @default 'Node'
			 * @readOnly
			 * @type String
			 */
			type: {
				readOnly: true,
				valueFn: function() {
					var instance = this;
					// NOTE: default type
					var type = TYPE_NODE;

					if (instance.get(HOST) instanceof A.Widget) {
						type = TYPE_WIDGET;
					}

					return type;
				},
				validator: isString
			},

			/**
			 * Where to insert the content, AFTER, BEFORE or REPLACE. If you're plugging a Node, there is a fourth option called OUTER that will not only replace the entire node itself. This is different from REPLACE, in that REPLACE will replace the *contents* of the node, OUTER will replace the entire Node itself.
			 *
			 * @attribute where
			 * @default StdMod.REPLACE
			 * @type String
			 */
			where: {
				value: StdMod.REPLACE,
				validator: function(val) {
					return (!val || val == StdMod.AFTER || val == StdMod.BEFORE || val == StdMod.REPLACE || val == OUTER);
				}
			}
		},

		EXTENDS: A.IORequest,

		prototype: {
			/**
			 * Bind the events on the A.Plugin.IO UI. Lifecycle.
			 *
			 * @method bindUI
			 * @protected
			 */
			bindUI: function() {
				var instance = this;

				instance.on('activeChange', instance._onActiveChange);

				instance.on(SUCCESS, instance._successHandler);
				instance.on(FAILURE, instance._failureHandler);

				if ((instance.get(TYPE) == TYPE_WIDGET) && instance.get(SHOW_LOADING)) {
					var host = instance.get(HOST);

					host.after('heightChange', instance._syncLoadingMaskUI, instance);
					host.after('widthChange', instance._syncLoadingMaskUI, instance);
				}
			},

			/**
			 * Invoke the <code>start</code> method (autoLoad attribute).
			 *
			 * @method _autoStart
			 * @protected
			 */
			_autoStart: function() {
				var instance = this;

				instance.bindUI();

				IOPlugin.superclass._autoStart.apply(this, arguments);
			},

			/**
			 * Bind the ParseContent plugin on the <code>instance</code>.
			 *
			 * @method _bindParseContent
			 * @protected
			 */
			_bindParseContent: function() {
				var instance = this;
				var node = instance.get(NODE);

				if (node && !node.ParseContent && instance.get(PARSE_CONTENT)) {
					node.plug(A.Plugin.ParseContent);
				}
			},

			/**
			 * Invoke the <a href="OverlayMask.html#method_hide">OverlayMask hide</a> method.
			 *
			 * @method hideLoading
			 */
			hideLoading: function() {
				var instance = this;

				var node = instance.get(NODE);

				if (node.loadingmask) {
					node.loadingmask.hide();
				}
			},

			/**
			 * Set the content of the <a href="A.Plugin.IO.html#config_node">node</a>.
			 *
			 * @method setContent
			 */
			setContent: function(content) {
				var instance = this;

				instance._bindParseContent();

				instance._getContentSetterByType().apply(instance, [content]);

				if (instance.overlayMaskBoundingBox) {
					instance.overlayMaskBoundingBox.remove();
				}
			},

			/**
			 * Invoke the <a href="OverlayMask.html#method_show">OverlayMask show</a> method.
			 *
			 * @method showLoading
			 */
			showLoading: function() {
				var instance = this;
				var node = instance.get(NODE);

				if (node.loadingmask) {
					if (instance.overlayMaskBoundingBox) {
						node.append(instance.overlayMaskBoundingBox);
					}
				}
				else {
					node.plug(
						A.LoadingMask,
						instance.get(LOADING_MASK)
					);

					instance.overlayMaskBoundingBox = node.loadingmask.overlayMask.get('boundingBox');
				}

				node.loadingmask.show();
			},

			/**
			 * Overload to the <a href="IORequest.html#method_start">IORequest
		     * start</a> method. Check if the <code>host</code> is already rendered,
		     * otherwise wait to after render phase and to show the LoadingMask.
			 *
			 * @method start
			 */
			start: function() {
				var instance = this;
				var host = instance.get(HOST);

				if (!host.get(RENDERED)) {
					host.after('render', function() {
						instance._setLoadingUI(true);
					});
				}

				IOPlugin.superclass.start.apply(instance, arguments);
			},

			/**
			 * Get the appropriated <a
		     * href="A.Plugin.IO.html#method_setContent">setContent</a> function
		     * implementation for each <a href="A.Plugin.IO.html#config_type">type</a>.
			 *
			 * @method _getContentSetterByType
			 * @protected
			 * @return {function}
			 */
			_getContentSetterByType: function() {
				var instance = this;

				var setters = {
					// NOTE: default setter, see 'type' attribute definition
					Node: function(content) {
						var instance = this;
						// when this.get(HOST) is a Node instance the NODE is the host
						var node = instance.get(NODE);

						if (content instanceof A.NodeList) {
							content = content.toFrag();
						}

						if (content instanceof A.Node) {
							content = content._node;
						}

						var where = instance.get(WHERE);

						if (where == OUTER) {
							node.replace(content);
						}
						else {
							node.insert(content, where);
						}
					},

					// Widget forces set the content on the SECTION node using setStdModContent method
					Widget: function(content) {
						var instance = this;
						var host = instance.get(HOST);

						host.setStdModContent.apply(host, [
							instance.get(SECTION),
							content,
							instance.get(WHERE)
						]);
					}
				};

				return setters[this.get(TYPE)];
			},

			/**
			 * Whether the <code>show</code> is true show the LoadingMask.
			 *
			 * @method _setLoadingUI
			 * @param {boolean} show
			 * @protected
			 */
			_setLoadingUI: function(show) {
				var instance = this;

				if (instance.get(SHOW_LOADING)) {
					if (show) {
						instance.showLoading();
					}
					else {
						instance.hideLoading();
					}
				}
			},

			/**
			 * Sync the loading mask UI.
			 *
			 * @method _syncLoadingMaskUI
			 * @protected
			 */
			_syncLoadingMaskUI: function() {
				var instance = this;

				instance.get(NODE).loadingmask.refreshMask();
			},

			/**
			 * Internal success callback for the IO transaction.
			 *
			 * @method _successHandler
			 * @param {EventFavade} event
			 * @param {String} id Id of the IO transaction.
			 * @param {Object} obj XHR transaction Object.
			 * @protected
			 */
			_successHandler: function(event, id, xhr) {
				var instance = this;

				instance.setContent(
					this.get('responseData')
				);
			},

			/**
			 * Internal failure callback for the IO transaction.
			 *
			 * @method _failureHandler
			 * @param {EventFavade} event
			 * @param {String} id Id of the IO transaction.
			 * @param {Object} obj XHR transaction Object.
			 * @protected
			 */
			_failureHandler: function(event, id, xhr) {
				var instance = this;

				instance.setContent(
					instance.get(FAILURE_MESSAGE)
				);
			},

			/**
			 * Fires after the value of the
			 * <a href="A.Plugin.IO.html#config_active">active</a> attribute change.
			 *
			 * @method _onActiveChange
			 * @param {EventFacade} event
			 * @protected
			 */
			_onActiveChange: function(event) {
				var instance = this;
				var host = instance.get(HOST);
				var widget = instance.get(TYPE) == TYPE_WIDGET;

				if (!widget || (widget && host && host.get(RENDERED))) {
					instance._setLoadingUI(event.newVal);
				}
			}
		}
	}
);

A.Node.prototype.load = function(uri, config, callback) {
	var instance = this;

	var index = uri.indexOf(' ');
	var selector;

	if (index > 0) {
		selector = uri.slice(index, uri.length);

		uri = uri.slice(0, index);
	}

	if (L.isFunction(config)) {
		callback = config;
		config = null;
	}

	config = config || {};

	if (callback) {
		config.after = config.after || {};

		config.after.success = callback;
	}

	var where = config.where;

	config.uri = uri;
	config.where = where;

	if (selector) {
		config.selector = selector;
		config.where = where || 'replace';
	}

	instance.plug(A.Plugin.IO, config);

	return instance;
};

A.namespace('Plugin').IO = IOPlugin;

}, '@VERSION@' ,{requires:['aui-overlay-base','aui-parse-content','aui-io-request','aui-loading-mask']});


AUI.add('aui-io', function(A){}, '@VERSION@' ,{use:['aui-io-request','aui-io-plugin'], skinnable:false});

