YUI.add('aui-io-request', function (A, NAME) {

/**
 * The IORequest Utility - Provides response data normalization for 'xml', 'json',
 * JavaScript and cache option.
 *
 * @module aui-io
 * @submodule aui-io-request
 */

var L = A.Lang,
    isBoolean = L.isBoolean,
    isFunction = L.isFunction,
    isString = L.isString,

    defaults = A.namespace('config.io'),

    getDefault = function(attr) {
        return function() {
            return defaults[attr];
        };
    },

    ACCEPTS = {
        all: '*/*',
        html: 'text/html',
        json: 'application/json, text/javascript',
        text: 'text/plain',
        xml: 'application/xml, text/xml'
    };

/**
 * A base class for IORequest, providing:
 *
 * - Response data normalization for XML, JSON, JavaScript
 * - Cache options
 *
 * Check the [live demo](http://alloyui.com/examples/io/).
 *
 * @class A.IORequest
 * @extends Plugin.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @uses io
 * @constructor
 * @include http://alloyui.com/examples/io/basic.js
 */
var IORequest = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'IORequest',

    /**
     * Static property used to define the default attribute
     * configuration for the IORequest.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * If `true` invoke the [start](A.IORequest.html#method_start) method
         * automatically, initializing the IO transaction.
         *
         * @attribute autoLoad
         * @default true
         * @type Boolean
         */
        autoLoad: {
            value: true,
            validator: isBoolean
        },

        /**
         * If `false` the current timestamp will be appended to the
         * url, avoiding the url to be cached.
         *
         * @attribute cache
         * @default true
         * @type Boolean
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
                return (v || '').toLowerCase();
            },
            value: null,
            validator: isString
        },

        /**
         * This is a normalized attribute for the response data. It's useful to
         * retrieve the correct type for the
         * [dataType](A.IORequest.html#attr_dataType) (i.e., in json requests
         * the `responseData`) is a JSONObject.
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
         * @type Boolean
         */
        active: {
            value: false,
            validator: isBoolean
        },

        /**
         * Object containing all the [IO Configuration Attributes](A.io.html).
         * This Object is passed to the `A.io` internally.
         *
         * @attribute cfg
         * @default Object containing all the [IO Configuration
         *     Attributes](A.io.html).
         * @readOnly
         * @type String
         */
        cfg: {
            getter: function() {
                var instance = this;

                // keep the current cfg object always synchronized with the
                // mapped public attributes when the user call .start() it
                // always retrieve the last set values for each mapped attr
                return {
                    arguments: instance.get('arguments'),
                    context: instance.get('context'),
                    data: instance.getFormattedData(),
                    form: instance.get('form'),
                    headers: instance.get('headers'),
                    method: instance.get('method'),
                    on: {
                        complete: A.bind(instance.fire, instance, 'complete'),
                        end: A.bind(instance._end, instance),
                        failure: A.bind(instance.fire, instance, 'failure'),
                        start: A.bind(instance.fire, instance, 'start'),
                        success: A.bind(instance._success, instance)
                    },
                    sync: instance.get('sync'),
                    timeout: instance.get('timeout'),
                    xdr: instance.get('xdr')
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
         * See [IO
         * Configuration](http://developer.yahoo.com/yui/3/io/#configuration).
         *
         * @attribute arguments
         * @default Value mapped on YUI.AUI.defaults.io.
         * @type Object
         */
        arguments: {
            valueFn: getDefault('arguments')
        },

        /**
         * See [IO
         * Configuration](http://developer.yahoo.com/yui/3/io/#configuration).
         *
         * @attribute context
         * @default Value mapped on YUI.AUI.defaults.io.
         * @type Object
         */
        context: {
            valueFn: getDefault('context')
        },

        /**
         * See [IO
         * Configuration](http://developer.yahoo.com/yui/3/io/#configuration).
         *
         * @attribute data
         * @default Value mapped on YUI.AUI.defaults.io.
         * @type Object
         */
        data: {
            valueFn: getDefault('data')
        },

        /**
         * See [IO
         * Configuration](http://developer.yahoo.com/yui/3/io/#configuration).
         *
         * @attribute form
         * @default Value mapped on YUI.AUI.defaults.io.
         * @type Object
         */
        form: {
            valueFn: getDefault('form')
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
                var dataType = instance.get('dataType');

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
                    value, {
                        Accept: header.join(', ')
                    }
                );
            },
            valueFn: getDefault('headers')
        },

        /**
         * See [IO
         * Configuration](http://developer.yahoo.com/yui/3/io/#configuration).
         *
         * @attribute method
         * @default Value mapped on YUI.AUI.defaults.io.
         * @type String
         */
        method: {
            setter: function(val) {
                return val.toLowerCase();
            },
            valueFn: getDefault('method')
        },

        /**
         * A selector to be used to query against the response of the
         * request. Only works if the response is XML or HTML.
         *
         * @attribute selector
         * @default null
         * @type String
         */
        selector: {
            value: null
        },

        /**
         * See [IO
         * Configuration](http://developer.yahoo.com/yui/3/io/#configuration).
         *
         * @attribute sync
         * @default Value mapped on YUI.AUI.defaults.io.
         * @type Boolean
         */
        sync: {
            valueFn: getDefault('sync')
        },

        /**
         * See [IO
         * Configuration](http://developer.yahoo.com/yui/3/io/#configuration).
         *
         * @attribute timeout
         * @default Value mapped on YUI.AUI.defaults.io.
         * @type Number
         */
        timeout: {
            valueFn: getDefault('timeout')
        },

        /**
         * See [IO
         * Configuration](http://developer.yahoo.com/yui/3/io/#configuration).
         *
         * @attribute xdr
         * @default Value mapped on YUI.AUI.defaults.io.
         * @type Object
         */
        xdr: {
            valueFn: getDefault('xdr')
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Plugin.Base,

    prototype: {

        /**
         * Construction logic executed during IORequest instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @param config
         * @protected
         */
        init: function() {
            var instance = this;

            IORequest.superclass.init.apply(this, arguments);

            instance._autoStart();
        },

        /**
         * Destructor lifecycle implementation for the `IORequest` class.
         * Purges events attached to the node (and all child nodes).
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            var instance = this;

            instance.stop();

            instance.set('transaction', null);
        },

        /**
         * Applies the `YUI.AUI.defaults.io.dataFormatter` if
         * defined and return the formatted data.
         *
         * @method getFormattedData
         * @return {String}
         */
        getFormattedData: function() {
            var instance = this;
            var value = instance.get('data');
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

            instance.set('active', true);

            var ioObj = instance._yuiIOObj;

            if (!ioObj) {
                ioObj = new A.IO();

                instance._yuiIOObj = ioObj;
            }

            var transaction = ioObj.send(
                instance.get('uri'),
                instance.get('cfg')
            );

            instance.set('transaction', transaction);
        },

        /**
         * Stops the IO transaction.
         *
         * @method stop
         */
        stop: function() {
            var instance = this;
            var transaction = instance.get('transaction');

            if (transaction) {
                transaction.abort();
            }
        },

        /**
         * Invoke the `start` method (autoLoad attribute).
         *
         * @method _autoStart
         * @protected
         */
        _autoStart: function() {
            var instance = this;

            if (instance.get('autoLoad')) {
                instance.start();
            }
        },

        /**
         * Parse the [uri](A.IORequest.html#attr_uri) to add a
         * timestamp if [cache](A.IORequest.html#attr_cache) is
         * `true`. Also applies the `YUI.AUI.defaults.io.uriFormatter`.
         *
         * @method _parseURL
         * @param {String} url
         * @protected
         * @return {String}
         */
        _parseURL: function(url) {
            var instance = this;
            var cache = instance.get('cache');
            var method = instance.get('method');

            // reusing logic to add a timestamp on the url from jQuery 1.3.2
            if ((cache === false) && (method === 'get')) {
                var ts = +new Date();
                // try replacing _= if it is there
                var ret = url.replace(/(\?|&)_=.*?(&|$)/, '$1_=' + ts + '$2');
                // if nothing was replaced, add timestamp to the end
                url = ret + ((ret === url) ? (url.match(/\?/) ? '&' : '?') + '_=' + ts : '');
            }

            // formatting the URL with the default uriFormatter after the cache
            // timestamp was added
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
         * @param {Object} args Custom arguments, passed to the event handler.
         *     See [IO](http://developer.yahoo.com/yui/3/io/#configuration).
         * @protected
         */
        _end: function(id, args) {
            var instance = this;

            instance.set('active', false);
            instance.set('transaction', null);

            instance.fire('end', id, args);
        },

        /**
         * Internal success callback for the IO transaction.
         *
         * @method _success
         * @param {Number} id ID of the IO transaction.
         * @param {Object} obj IO transaction Object.
         * @param {Object} args Custom arguments, passed to the event handler.
         *     See [IO](http://developer.yahoo.com/yui/3/io/#configuration).
         * @protected
         */
        _success: function(id, obj, args) {
            var instance = this;

            // update the responseData attribute with the new data from xhr
            instance.set('responseData', obj);

            instance.fire('success', id, obj, args);
        },

        /**
         * Setter for [responseData](A.IORequest.html#attr_responseData).
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
                var dataType = instance.get('dataType');
                var contentType = xhr.getResponseHeader('content-type') || '';

                // if the dataType or the content-type is XML...
                if ((dataType === 'xml') ||
                    (!dataType && contentType.indexOf('xml') >= 0)) {

                    // use responseXML
                    data = xhr.responseXML;

                    // check if the XML was parsed correctly
                    if (data.documentElement.tagName === 'parsererror') {
                        throw 'Parser error: IO dataType is not correctly parsing';
                    }
                }
                else {
                    // otherwise use the responseText
                    data = xhr.responseText;
                }

                // empty string is not a valid 'json', convert it to null
                if (data === '') {
                    data = null;
                }

                // trying to parse to JSON if dataType is a valid json
                if (dataType === 'json') {
                    try {
                        data = A.JSON.parse(data);
                    }
                    catch (e) {
                        // throw 'Parser error: IO dataType is not correctly parsing';
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
});

A.IORequest = IORequest;

/**
 * Alloy IO extension
 *
 * @class A.io
 * @static
 */

/**
 * Static method to invoke the [IORequest](A.IORequest.html).
 * Likewise [IO](A.io.html).
 *
 * @method A.io.request
 * @for A.io
 * @param {String} uri URI to be requested.
 * @param {Object} config Configuration Object for the [IO](A.io.html).
 * @return {IORequest}
 */
A.io.request = function(uri, config) {
    return new A.IORequest(
        A.merge(config, {
            uri: uri
        })
    );
};


}, '3.0.1', {"requires": ["io-base", "json", "plugin", "querystring-stringify", "aui-component"]});
