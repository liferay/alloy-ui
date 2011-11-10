AUI.add('aui-messaging', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,

	lastHash,

	ENV = A.Env,
	G_ENV = AUI.Env,

	WIN = A.config.win,
	LOCATION = WIN.location,

	NATIVE_MSG = !!(WIN.postMessage),

	TOKEN_CLOSE = '_A=',
	TOKEN_OPEN = '=A_',

	STR_REGEX_CONTENT = '.*?',
	STR_REGEX_TOKEN_OPEN = TOKEN_OPEN + '\\d+&',

	REGEX_TOKEN_EXTRACT_HASH = new RegExp(STR_REGEX_TOKEN_OPEN + '(' + STR_REGEX_CONTENT + ')' + TOKEN_CLOSE),
	REGEX_TOKEN_REPLACE_HASH = new RegExp(STR_REGEX_TOKEN_OPEN + STR_REGEX_CONTENT + TOKEN_CLOSE);

fnPostMessage = function(message, targetURI, targetFrame) {
	if (targetURI) {
		if (Lang.isObject(message)) {
			message = A.QueryString.stringify(message);
		}

		try {
			targetFrame = A.one(targetFrame);

			targetFrame = targetFrame && targetFrame.getDOM().contentWindow;
		}
		catch (e) {
		}

		targetFrame = targetFrame || WIN.parent;

		if (NATIVE_MSG) {
			targetURI = targetURI.replace(/([^:]+:\/\/[^\/?]+).*/, '$1');

			targetFrame.postMessage(message, targetURI);
		}
		else {
			var uriPieces = targetURI.split('#');

			var uri = uriPieces[1] || '';

			// If we reuse a uri that has the token in it,
			// let's replace it.
			uri = uri.replace(REGEX_TOKEN_REPLACE_HASH, '');

			var cacheBreaker = Lang.now() + (++ENV._uidx);

			uri = (TOKEN_OPEN + cacheBreaker + '&' + message + TOKEN_CLOSE) + uri;

			uriPieces[1] = uri;

			targetFrame.location = uriPieces.join('#');
		}
	}
};

fnReceiveMessage = function(callback, sourceURI, interval) {
	if (NATIVE_MSG) {
		var previousCallbackWrapper = Messaging._callbackFn;

		if (previousCallbackWrapper) {
			G_ENV.remove(WIN, 'message', previousCallbackWrapper);

			Messaging._callbackFn = null;
		}

		if (callback) {
			var callbackFn = A.rbind(Messaging._validateCallback, Messaging, sourceURI, callback);

			Messaging._callbackFn = callbackFn;

			G_ENV.add(WIN, 'message', callbackFn);
		}
	}
	else {
		var intervalId = Messaging._INTERVAL_ID;

		if (intervalId) {
			A.clearInterval(intervalId);

			Messaging._INTERVAL_ID = null;
		}

		if (callback) {
			if (Lang.isUndefined(interval)) {
				interval = 100;

				if (Lang.isNumber(sourceURI)) {
					interval = sourceURI;
				}
			}

			Messaging._INTERVAL_ID = A.setInterval(Messaging._pollHash, interval, Messaging, callback);
		}
	}
};

Messaging = {
	post: fnPostMessage,
	receive: fnReceiveMessage,

	_formatEventObject: function(obj) {
		var instance = this;

		obj.responseData = instance._getResponseData(obj.data);

		return obj;
	},

	_getResponseData: function(data) {
		var instance = this;

		var responseData = data;

		if (responseData && /\w+=\w+/.test(responseData)) {
			responseData = A.QueryString.parse(responseData);
		}

		return responseData;
	},

	_pollHash: function(callback) {
		var instance = Messaging;

		var hash = LOCATION.hash;

		if (hash != lastHash && REGEX_TOKEN_REPLACE_HASH.test(hash)) {
			lastHash = hash;

			var data = hash.match(REGEX_TOKEN_EXTRACT_HASH);

			data = (data && data[1]) || '';

			var obj = {
				data: data
			};

			instance._formatEventObject(obj);

			callback.call(Messaging, obj);
		}
	},

	_validateCallback: function(event, sourceURI, callback) {
		var instance = Messaging;

		var origin = event.origin;

		var valid = false;

		if (Lang.isFunction(sourceURI)) {
			valid = sourceURI(origin);
		}
		else if (isString(sourceURI)) {
			valid = (sourceURI == origin);
		}

		if (valid) {
			instance._formatEventObject(event);

			callback.call(Messaging, event);
		}
	}
};

A.postMessage = fnPostMessage;
A.receiveMessage = fnReceiveMessage;

A.Messaging = Messaging;

}, '@VERSION@' ,{requires:['aui-base','aui-task-manager','querystring'], skinnable:false});
