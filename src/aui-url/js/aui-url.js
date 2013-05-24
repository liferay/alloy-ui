/**
 * The Url Utility.
 *
 * @module aui-url
 */

var QS = A.QueryString,

    _BLANK = '',

    _ANCHOR_SEPARATOR = '#',
    _QUERY_SEPARATOR = '?',
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
Url.URI_REGEX_RFC3986 = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

/**
 * A base class for Url.
 *
 * @class A.Url
 * @param config {Object} Object literal specifying widget configuration properties.
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method hasParameter
     * @param key
     */
    hasParameter: function(key) {
        var instance = this;

        return instance._parameters.hasOwnProperty(key);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getParameter
     * @param key
     */
    getParameter: function(key) {
        var instance = this;

        return instance._parameters[key];
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getParameters
     */
    getParameters: function() {
        var instance = this;

        return instance._parameters;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getAnchor
     */
    getAnchor: function() {
        var instance = this;

        return instance._anchor;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getAuthority
     */
    getAuthority: function() {
        var instance = this;

        return instance._authority;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getDirectory
     */
    getDirectory: function() {
        var instance = this;

        return instance._directory;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getFile
     */
    getFile: function() {
        var instance = this;

        return instance._file;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getHost
     */
    getHost: function() {
        var instance = this;

        return instance._host;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getPassword
     */
    getPassword: function() {
        var instance = this;

        return instance._password;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getPath
     */
    getPath: function() {
        var instance = this;

        return instance._path;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getPort
     */
    getPort: function() {
        var instance = this;

        return instance._port;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getProtocol
     */
    getProtocol: function() {
        var instance = this;

        return instance._protocol;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getQuery
     */
    getQuery: function() {
        var instance = this;

        return instance._query;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getRelative
     */
    getRelative: function() {
        var instance = this;

        return instance._relative;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getSource
     */
    getSource: function() {
        var instance = this;

        return instance._source;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getUser
     */
    getUser: function() {
        var instance = this;

        return instance._user;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getUserInfo
     */
    getUserInfo: function() {
        var instance = this;

        return instance._user_info;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setAnchor
     * @param val
     */
    setAnchor: function(val) {
        var instance = this;

        instance._anchor = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setAuthority
     * @param val
     */
    setAuthority: function(val) {
        var instance = this;

        instance._authority = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setDirectory
     * @param val
     */
    setDirectory: function(val) {
        var instance = this;

        instance._directory = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setFile
     * @param val
     */
    setFile: function(val) {
        var instance = this;

        instance._file = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setHost
     * @param val
     */
    setHost: function(val) {
        var instance = this;

        instance._host = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setPassword
     * @param val
     */
    setPassword: function(val) {
        var instance = this;

        instance._password = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setPath
     * @param val
     */
    setPath: function(val) {
        var instance = this;

        instance._path = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setPort
     * @param val
     */
    setPort: function(val) {
        var instance = this;

        instance._port = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setProtocol
     * @param val
     */
    setProtocol: function(val) {
        var instance = this;

        instance._protocol = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setRelative
     * @param val
     */
    setRelative: function(val) {
        var instance = this;

        instance._relative = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setSource
     * @param val
     */
    setSource: function(val) {
        var instance = this;

        instance._source = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setUser
     * @param val
     */
    setUser: function(val) {
        var instance = this;

        instance._user = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method setUserInfo
     * @param val
     */
    setUserInfo: function(val) {
        var instance = this;

        instance._user_info = val;
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method toString
     */
    toString: function() {
        var instance = this,
            url = [];

        //   foo://example.com:8042/over/there?name=ferret#nose
        //   \_/   \______________/\_________/ \_________/ \__/
        // scheme     authority       path        query   fragment

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
                _QUERY_SEPARATOR,
                instance._query
            );
        }

        if (instance._anchor) {
            url.push(
                _ANCHOR_SEPARATOR,
                instance._anchor
            );
        }

        return url.join(_BLANK);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _indexParameters
     * @protected
     */
    _indexParameters: function() {
        var instance = this;

        if (!instance._parameters) {
            instance._parameters = QS.parse(instance._query || _BLANK);
        }

        instance._query = QS.stringify(instance._parameters);
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
        instance._directory =  parts[URL_DIRECTORY];
        instance._file =  parts[URL_FILE];
        instance._query =  parts[URL_QUERY];
        instance._anchor =  parts[URL_ANCHOR];
    }
}, true);

A.Url = Url;