AUI.add('aui-io-request', function(A) {
var L = A.Lang,
	isBoolean = L.isBoolean,
	isFunction = L.isFunction,
	isString = L.isString,

	defaults = AUI.defaults.io,

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

function IORequest() {
	IORequest.superclass.constructor.apply(this, arguments);
}

A.mix(IORequest, {
	NAME: IO_REQUEST,

	ATTRS: {
		autoLoad: {
			value: true,
			validator: isBoolean
		},

		cache: {
			value: true,
			validator: isBoolean
		},

		dataType: {
			setter: function(v) {
				return (v || EMPTY_STRING).toLowerCase();
			},
			value: null,
			validator: isString
		},

		responseData: {
			setter: function(v) {
				return this._setResponseData(v);
			},
			value: null
		},

		uri: {
			setter: function(v) {
				return this._parseURL(v);
			},
			value: null,
			validator: isString
		},

		// User readOnly variables

		active: {
			value: false,
			validator: isBoolean
		},

		cfg: {
			getter: function() {
				var instance = this;

				// keep the current cfg object always synchronized with the mapped public attributes
				// when the user call .start() it always retrieve the last set values for each mapped attr
				return {
					arguments: instance.get(ARGUMENTS),
					context: instance.get(CONTEXT),
					data: instance.get(DATA),
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
				}
			},
			readOnly: true
		},

		transaction: {
			value: null
		},

		// Configuration Object mapping
		// To take advantages of the Attribute listeners of A.Base
		// See: http://developer.yahoo.com/yui/3/io/

		arguments: {
			valueFn: getDefault(ARGUMENTS)
		},

		context: {
			valueFn: getDefault(CONTEXT)
		},

		data: {
			valueFn: getDefault(DATA)
		},

		form: {
			valueFn: getDefault(FORM)
		},

		// set the correct ACCEPT header based on the dataType
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

		method: {
			valueFn: getDefault(METHOD)
		},

		sync: {
			valueFn: getDefault(SYNC)
		},

		timeout: {
			valueFn: getDefault(TIMEOUT)
		},

		xdr: {
			valueFn: getDefault(XDR)
		}
	}
});

A.extend(IORequest, A.Plugin.Base, {
	/*
	* Lifecycle
	*/
	initializer: function(config) {
		var instance = this;

		instance.after('init', instance._afterInit);
	},

	_afterInit: function() {
		var instance = this;

		if (instance.get(AUTO_LOAD)) {
			instance.start();
		}
	},

	destructor: function() {
		var instance = this;

		instance.stop();

		instance.set(TRANSACTION, null);
	},

	/*
	* Methods
	*/
	start: function() {
		var instance = this;

		instance.destructor();

		instance.set(ACTIVE, true);

		var transaction = A.io(
			instance.get(URI),
			instance.get(CFG)
		);

		instance.set(TRANSACTION, transaction);
	},

	stop: function() {
		var instance = this;
		var transaction = instance.get(TRANSACTION);

		if (transaction) {
			transaction.abort();
		}
	},

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

	/*
	* IO callbacks
	*/
	_end: function(id) {
		var instance = this;

		instance.set(ACTIVE, false);
		instance.set(TRANSACTION, null);

		instance.fire(END, id);
	},

	_success: function(id, obj) {
		var instance = this;

		// update the responseData attribute with the new data from xhr
		instance.set(RESPONSE_DATA, obj);

		instance.fire(SUCCESS, id, obj);
	},

	/*
	* Setters
	*/
	_setResponseData: function(xhr) {
		var data = null;
		var instance = this;

		if (xhr) {
			var dataType = instance.get(DATA_TYPE);
			var contentType = xhr.getResponseHeader(CONTENT_TYPE);

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
		}

		return data;
	}
});

A.IORequest = IORequest;

A.io.request = function(uri, config) {
	return new A.IORequest(
		A.merge(config, {
			uri: uri
		})
	);
};

}, '@VERSION@' ,{requires:['aui-base','io','json','plugin'], skinnable:false});
