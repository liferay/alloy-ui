var QS = A.QueryString,

	_BLANK = '',

	_ANCHOR_SEPARATOR = '#',
	_QUERY_SEPARATOR = '?',
	_SCHEME_SEPARATOR = '://';

function UrlParser(url) {
	var instance = this;

	if (!url) {
		throw 'An URL should be specified.';
	}

	instance._indexParts(url);
	instance._indexParameters();
}

A.mix(UrlParser, {
	URL_SOURCE: 0,
	URL_PROTOCOL: 1,
	URL_AUTHORITY: 2,
	URL_USER_INFO: 3,
	URL_USER: 4,
	URL_PASSWORD: 5,
	URL_HOST: 6,
	URL_PORT: 7,
	URL_RELATIVE: 8,
	URL_PATH: 9,
	URL_DIRECTORY: 10,
	URL_FILE: 11,
	URL_QUERY: 12,
	URL_ANCHOR: 13,
	// Loose implementation of http://tools.ietf.org/html/rfc3986
	// See http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
	URI_REGEX_RFC3986: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
});

A.mix(UrlParser.prototype, {
	_source: undefined,
	_protocol: undefined,
	_authority: undefined,
	_user_info: undefined,
	_user: undefined,
	_password: undefined,
	_host: undefined,
	_port: undefined,
	_relative: undefined,
	_path: undefined,
	_directory: undefined,
	_file: undefined,
	_query: undefined,
	_anchor: undefined,
	_parameters: undefined,

	addParameter: function(key, values) {
		var instance = this;

		instance.setParameter(key, !instance.hasParameter(key) ?
									values :
									A.Array(instance.getParameter(key)).concat(values));
	},

	addParameters: function(parameters) {
		var instance = this;

		A.each(parameters, function(val, key) {
			instance.addParameter(key, val);
		});
	},

	hasParameter: function(key) {
		var instance = this;

		return instance._parameters.hasOwnProperty(key);
	},

	getParameter: function(key) {
		var instance = this;

		return instance._parameters[key];
	},

	getParameters: function() {
		var instance = this;

		return instance._parameters;
	},

	getAnchor: function() {
		var instance = this;

		return instance._anchor;
	},

	getAuthority: function() {
		var instance = this;

		return instance._authority;
	},

	getDirectory: function() {
		var instance = this;

		return instance._directory;
	},

	getFile: function() {
		var instance = this;

		return instance._file;
	},

	getHost: function() {
		var instance = this;

		return instance._host;
	},

	getPassword: function() {
		var instance = this;

		return instance._password;
	},

	getPath: function() {
		var instance = this;

		return instance._path;
	},

	getPort: function() {
		var instance = this;

		return instance._port;
	},

	getProtocol: function() {
		var instance = this;

		return instance._protocol;
	},

	getQuery: function() {
		var instance = this;

		return instance._query;
	},

	getRelative: function() {
		var instance = this;

		return instance._relative;
	},

	getSource: function() {
		var instance = this;

		return instance._source;
	},

	getUrl: function() {
		var instance = this;

       //   foo://example.com:8042/over/there?name=ferret#nose
       //   \_/   \______________/\_________/ \_________/ \__/
       // scheme     authority       path        query   fragment
		return [ instance._protocol,
				_SCHEME_SEPARATOR,
				instance._authority,
				instance._path,
				_QUERY_SEPARATOR,
				instance._query,
				_ANCHOR_SEPARATOR,
				instance._anchor ].join(_BLANK);
	},

	getUser: function() {
		var instance = this;

		return instance._user;
	},

	getUserInfo: function() {
		var instance = this;

		return instance._user_info;
	},

	removeParameter: function(key) {
		var instance = this;

		delete instance._parameters[key];

		instance._indexParameters();
	},

	removeParameters: function(parameters) {
		var instance = this;

		A.each(parameters, function(val, key) {
			instance.removeParameter(key);
		});
	},

	setParameter: function(key, opt_values) {
		var instance = this;

		instance._parameters[key] = opt_values;

		instance._indexParameters();
	},

	setParameters: function(parameters) {
		var instance = this;

		A.each(parameters, function(val, key) {
			instance.setParameter(key, val);
		});
	},

	_indexParameters: function() {
		var instance = this;

		if (!instance._parameters) {
			instance._parameters = QS.parse(instance._query || _BLANK);
		}

		instance._query = QS.stringify(instance._parameters);
	},

	_indexParts: function(url) {
		var instance = this,
			parts = UrlParser.URI_REGEX_RFC3986.exec(url);

		instance._source = parts[UrlParser.URL_SOURCE];
		instance._protocol = parts[UrlParser.URL_PROTOCOL];
		instance._authority = parts[UrlParser.URL_AUTHORITY];
		instance._user_info = parts[UrlParser.URL_USER_INFO];
		instance._user = parts[UrlParser.URL_USER];
		instance._password = parts[UrlParser.URL_PASSWORD];
		instance._host = parts[UrlParser.URL_HOST];
		instance._port = parts[UrlParser.URL_PORT];
		instance._relative = parts[UrlParser.URL_RELATIVE];
		instance._path = parts[UrlParser.URL_PATH];
		instance._directory =  parts[UrlParser.URL_DIRECTORY];
		instance._file =  parts[UrlParser.URL_FILE];
		instance._query =  parts[UrlParser.URL_QUERY];
		instance._anchor =  parts[UrlParser.URL_ANCHOR];
	}
});

A.UrlParser = UrlParser;