YUI.add('aui-surface-screen-html', function (A, NAME) {

A.HTMLScreen = A.Base.create('htmlScreen', A.Screen, [], {
    /**
     * Holds the IO request.
     *
     * @property _request
     * @type {Object}
     * @protected
     */
    _request: null,

    /**
     * Aborts any outstanding request.
     *
     * @method abortRequest
     */
    abortRequest: function() {
        if (this._request) {
            this._request.abort();
        }
    },

    /**
     * Returns content for given surface from the provided content.
     *
     * @method getSurfaceContent
     * @param {String} surfaceId The ID of the surface, which content should be
     *     loaded.
     * @contents {Node} The content container from which the surface content
     *     will be retrieved.
     * @return {String|Node} String or Node instance which contains the content
     *     of the surface.
     */
    getSurfaceContent: function(surfaceId, contents) {
        var frag = contents.one('#' + surfaceId);

        if (frag) {
            return frag.getHTML();
        }
    },

    /**
     * Loads the content for all surfaces in one AJAX request from the server.
     *
     * @method load
     * @return {CancellablePromise} Promise, which should be resolved with the
     *     returned content from the server.
     */
    load: function(path) {
        var cache = this.getCache(),
            url;

        if (A.Lang.isValue(cache)) {
            return A.CancellablePromise.resolve(cache);
        }

        url = new A.Url(path);
        url.addParameters(this.get('urlParams'));
        return this.loadContent(url.toString());
    },

    /**
     * Loads the content from server via single AJAX request.
     *
     * @method loadContent
     * @protected
     * @return {CancellablePromise} Promise, which should be resolved with the returned
     *     content from the server.
     */
    loadContent: function(path) {
        var instance = this,
            promise;

        instance.abortRequest();

        promise = new A.CancellablePromise(
            function(resolve) {
                instance._request = A.io(path, {
                    headers: {
                        'X-PJAX': 'true'
                    },
                    method: instance.get('method'),
                    on: {
                        failure: function(id, response) {
                            promise.cancel(response.responseText);
                        },
                        success: function(id, response) {
                            var frag = A.Node.create('<div/>');
                            frag.append(response.responseText);
                            instance._setScreenTitleFromFragment(frag);
                            instance.addCache(frag);
                            resolve(frag);
                        }
                    },
                    timeout: instance.get('timeout')
                });
            },
            function() {
                instance.abortRequest();
            }
        );

        return promise;
    },

    /**
     * Setter for urlParams attribute.
     *
     * @method _setUrlParams
     * @protected
     * @return {String|Object} If the provided value was string, it will be
     *     converted to Object with one property - the provided string and "1"
     *     as value. Otherwise, the provided object will be passed directly to
     *     the attribute value.
     */
    _setUrlParams: function(val) {
        var params = val;

        if (A.Lang.isString(val)) {
            params = {};
            params[val] = 1;
        }

        return params;
    },

    /**
     * Retrieves the title from the provided content and sets it to title
     * attribute of the class.
     *
     * @method _setScreenTitleFromFragment
     * @param  {Node} frag The container from which the title should be
     *     retrieve.
     */
    _setScreenTitleFromFragment: function(frag) {
        var title = frag.one(this.get('titleSelector'));

        if (title) {
            this.set('title', title.get('text'));
        }
    },

    /**
     * Validates the value of urlParams. The value could be String or Object
     * with key and values. During URL construction, they will be added to the
     * other parameters.
     *
     * @method _validateUrlParams
     * @protected
     * @return {Boolean} true if val is String or an Object.
     */
    _validateUrlParams: function(val) {
        return A.Lang.isString(val) || A.Lang.isObject(val);
    }
}, {
    ATTRS: {
        /**
         * @attribute cacheable
         * @default true
         * @type Boolean
         */
        cacheable: {
            value: true
        },

        /**
         * Ajax request method.
         *
         * @attribute method
         * @type {String}
         * @default GET
         **/
        method: {
            validator: A.Lang.isString,
            value: 'GET'
        },

        /**
         * CSS selector used to extract a page title from the content of a page
         * loaded via Pjax.
         *
         * By default this is set to extract the title from the `<title>`
         * element, but you could customize it to extract the title from an
         * `<h1>`, or from any other element, if that's more appropriate for the
         * content you're loading.
         *
         * @attribute titleSelector
         * @type String
         * @default "title"
         **/
        titleSelector: {
            value: 'title'
        },

        /**
         * Time in milliseconds after which an Ajax request should time out.
         *
         * @attribute timeout
         * @type {Number}
         * @default 30000
         **/
        timeout: {
            value: 30000
        },

        /**
         * Could be String or Object with multiple keys and values. If String,
         * the defaule value will be "1". If an Object with multiple keys and
         * values, they will be concatenated to the URL.
         *
         * @attribute urlParams
         * @type {String|Object}
         * @default pjax
         */
        urlParams: {
            setter: '_setUrlParams',
            validator: '_validateUrlParams',
            value: 'pjax'
        }
    }
});


}, '3.0.1', {"requires": ["io", "aui-promise", "aui-surface-screen", "aui-url"]});
