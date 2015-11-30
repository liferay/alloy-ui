YUI.add('aui-url', function (A, NAME) {

/**
 * The Url Utility.
 *
 * @module aui-url
 */

var QS = A.QueryString,
    _SCHEME_SEPARATOR = '://',

    URL_SOURCE = 0,
    URL_PROTOCOL = 1,
    URL_AUTHORITY = 2,
    URL_USER_INFO = 3,
    URL_USER = 4,
    URL_PASSWORD = 5,
    URL_HOST = 6,
    URL_PORT = 7,
    URL_RELATIVE = 8,
    URL_PATH = 9,
    URL_DIRECTORY = 10,
    URL_FILE = 11,
    URL_QUERY = 12,
    URL_ANCHOR = 13;

function Url(url) {
    var instance = this;

    if (!url) {
        throw 'An URL should be specified.';
    }

    instance._indexParts(url);
    instance._indexParameters();
}

// Loose implementation of http://tools.ietf.org/html/rfc3986
// See http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
Url.URI_REGEX_RFC3986 = new RegExp('^(?:(?![^:@]+:[^:@\\/]*@)([^:\\/?#.]+):)' +
    '?(?:\\/\\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\\/?#]*)(?::(\\d*))?)' +
    '(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\\/?)?([^?#\\/]*)' +
    ')(?:\\?([^#]*))?(?:#(.*))?)');

/**
 * A base class for `A.Url`.
 *
 * In order to understand what each attribute/method does,
 * you need to see the anatomy of a URL:
 *
 * ```
 *  foo://example.com:8042/over/there?name=ferret#nose
 *  \_/   \______________/\_________/ \_________/ \__/
 * Scheme     Authority       Path       Query   Anchor
 * ```
 *
 * @class A.Url
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.mix(Url.prototype, {
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

    /**
     * Adds a single parameter in the URL.
     *
     * @method addParameter
     * @param key
     * @param values
     */
    addParameter: function(key, values) {
        var instance = this;

        instance.setParameter(key, !instance.hasParameter(key) ?
            values :
            A.Array(instance.getParameter(key)).concat(values));
    },

    /**
     * Adds a list of parameters in the URL.
     *
     * @method addParameters
     * @param parameters
     */
    addParameters: function(parameters) {
        var instance = this;

        A.each(parameters, function(val, key) {
            instance.addParameter(key, val);
        });
    },

    /**
     * Checks if the URL has a parameter.
     *
     * @method hasParameter
     * @param key
     * @return {Boolean}
     */
    hasParameter: function(key) {
        var instance = this;

        return instance._parameters.hasOwnProperty(key);
    },

    /**
     * Gets a single parameter.
     *
     * @method getParameter
     * @param key
     * @return {String}
     */
    getParameter: function(key) {
        var instance = this;

        return instance._parameters[key];
    },

    /**
     * Gets a list of parameters.
     *
     * @method getParameters
     * @return {Array}
     */
    getParameters: function() {
        var instance = this;

        return instance._parameters;
    },

    /**
     * Gets the anchor.
     *
     * @method getAnchor
     * @return {String}
     */
    getAnchor: function() {
        var instance = this;

        return instance._anchor;
    },

    /**
     * Gets the authority.
     *
     * @method getAuthority
     * @return {String}
     */
    getAuthority: function() {
        var instance = this;

        return instance._authority;
    },

    /**
     * Gets the directory.
     *
     * @method getDirectory
     * @return {String}
     */
    getDirectory: function() {
        var instance = this;

        return instance._directory;
    },

    /**
     * Gets the file.
     *
     * @method getFile
     * @return {String}
     */
    getFile: function() {
        var instance = this;

        return instance._file;
    },

    /**
     * Gets the host.
     *
     * @method getHost
     * @return {String}
     */
    getHost: function() {
        var instance = this;

        return instance._host;
    },

    /**
     * Gets the password.
     *
     * @method getPassword
     * @return {String}
     */
    getPassword: function() {
        var instance = this;

        return instance._password;
    },

    /**
     * Gets the path.
     *
     * @method getPath
     * @return {String}
     */
    getPath: function() {
        var instance = this;

        return instance._path;
    },

    /**
     * Gets the port.
     *
     * @method getPort
     * @return {String}
     */
    getPort: function() {
        var instance = this;

        return instance._port;
    },

    /**
     * Gets the protocol.
     *
     * @method getProtocol
     * @return {String}
     */
    getProtocol: function() {
        var instance = this;

        return instance._protocol;
    },

    /**
     * Gets the query.
     *
     * @method getQuery
     * @return {String}
     */
    getQuery: function() {
        var instance = this;

        return instance._query;
    },

    /**
     * Gets the relative.
     *
     * @method getRelative
     * @return {String}
     */
    getRelative: function() {
        var instance = this;

        return instance._relative;
    },

    /**
     * Gets the source.
     *
     * @method getSource
     * @return {String}
     */
    getSource: function() {
        var instance = this;

        return instance._source;
    },

    /**
     * Gets the user.
     *
     * @method getUser
     * @return {String}
     */
    getUser: function() {
        var instance = this;

        return instance._user;
    },

    /**
     * Gets the user info.
     *
     * @method getUserInfo
     * @return {String}
     */
    getUserInfo: function() {
        var instance = this;

        return instance._user_info;
    },

    /**
     * Removes a single parameter from the parameters list.
     *
     * @method removeParameter
     * @param key
     */
    removeParameter: function(key) {
        var instance = this;

        delete instance._parameters[key];

        instance._indexParameters();
    },

    /**
     * Removes a list of parameters from the parameters list.
     *
     * @method removeParameters
     * @param parameters
     */
    removeParameters: function(parameters) {
        var instance = this;

        A.each(parameters, function(val, key) {
            instance.removeParameter(key);
        });
    },

    /**
     * Sets a single parameter.
     *
     * @method setParameter
     * @param key
     * @param opt_values
     */
    setParameter: function(key, opt_values) {
        var instance = this;

        instance._parameters[key] = opt_values;

        instance._indexParameters();
    },

    /**
     * Sets a list of parameters.
     *
     * @method setParameters
     * @param parameters
     */
    setParameters: function(parameters) {
        var instance = this;

        A.each(parameters, function(val, key) {
            instance.setParameter(key, val);
        });
    },

    /**
     * Sets the anchor.
     *
     * @method setAnchor
     * @param val
     */
    setAnchor: function(val) {
        var instance = this;

        instance._anchor = val;
    },

    /**
     * Sets the authority.
     *
     * @method setAuthority
     * @param val
     */
    setAuthority: function(val) {
        var instance = this;

        instance._authority = val;
    },

    /**
     * Sets the directory.
     *
     * @method setDirectory
     * @param val
     */
    setDirectory: function(val) {
        var instance = this;

        instance._directory = val;
    },

    /**
     * Sets the file.
     *
     * @method setFile
     * @param val
     */
    setFile: function(val) {
        var instance = this;

        instance._file = val;
    },

    /**
     * Sets the host.
     *
     * @method setHost
     * @param val
     */
    setHost: function(val) {
        var instance = this;

        instance._host = val;
    },

    /**
     * Sets the password.
     *
     * @method setPassword
     * @param val
     */
    setPassword: function(val) {
        var instance = this;

        instance._password = val;
    },

    /**
     * Sets the path.
     *
     * @method setPath
     * @param val
     */
    setPath: function(val) {
        var instance = this;

        instance._path = val;
    },

    /**
     * Sets the port.
     *
     * @method setPort
     * @param val
     */
    setPort: function(val) {
        var instance = this;

        instance._port = val;
    },

    /**
     * Sets the protocol.
     *
     * @method setProtocol
     * @param val
     */
    setProtocol: function(val) {
        var instance = this;

        instance._protocol = val;
    },

    /**
     * Sets the relative.
     *
     * @method setRelative
     * @param val
     */
    setRelative: function(val) {
        var instance = this;

        instance._relative = val;
    },

    /**
     * Sets the source.
     *
     * @method setSource
     * @param val
     */
    setSource: function(val) {
        var instance = this;

        instance._source = val;
    },

    /**
     * Sets the user.
     *
     * @method setUser
     * @param val
     */
    setUser: function(val) {
        var instance = this;

        instance._user = val;
    },

    /**
     * Sets the user info.
     *
     * @method setUserInfo
     * @param val
     */
    setUserInfo: function(val) {
        var instance = this;

        instance._user_info = val;
    },

    /**
     * Generates the entire URL based on each attribute.
     *
     * @method toString
     * @return {String}
     */
    toString: function() {
        var instance = this,
            url = [];

        //   foo://example.com:8042/over/there?name=ferret#nose
        //   \_/   \______________/\_________/ \_________/ \__/
        // scheme     authority       path        query   anchor

        if (instance._protocol) {
            url.push(
                instance._protocol,
                _SCHEME_SEPARATOR
            );
        }

        url.push(
            instance._authority,
            instance._path
        );

        if (instance._query) {
            url.push(
                '?',
                instance._query
            );
        }

        if (instance._anchor) {
            url.push(
                '#',
                instance._anchor
            );
        }

        return url.join('');
    },

    /**
     * Indexes all parameters into the query.
     *
     * @method _indexParameters
     * @protected
     */
    _indexParameters: function() {
        var instance = this;

        if (!instance._parameters) {
            instance._parameters = QS.parse(instance._query || '');
        }

        instance._query = QS.stringify(instance._parameters);
    },

    /**
     * Indexes all URL parts to its private attributes.
     *
     * @method _indexParts
     * @param url
     * @protected
     */
    _indexParts: function(url) {
        var instance = this,
            parts = Url.URI_REGEX_RFC3986.exec(url);

        instance._source = parts[URL_SOURCE];
        instance._protocol = parts[URL_PROTOCOL];
        instance._authority = parts[URL_AUTHORITY];
        instance._user_info = parts[URL_USER_INFO];
        instance._user = parts[URL_USER];
        instance._password = parts[URL_PASSWORD];
        instance._host = parts[URL_HOST];
        instance._port = parts[URL_PORT];
        instance._relative = parts[URL_RELATIVE];
        instance._path = parts[URL_PATH];
        instance._directory = parts[URL_DIRECTORY];
        instance._file = parts[URL_FILE];
        instance._query = parts[URL_QUERY];
        instance._anchor = parts[URL_ANCHOR];
    }
}, true);

A.Url = Url;


}, '3.0.1', {"requires": ["oop", "querystring-parse", "querystring-stringify"]});
