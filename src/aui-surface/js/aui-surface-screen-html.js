var Lang = A.Lang;

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
     * Loads the content for all surfaces in one AJAX request from the server.
     *
     * @method getSurfacesContent
     * @param {Array} surfaces An array of surfaces which content should be
     *     loaded from the server.
     * @return {A.Promise} Promise, which should be resolved with the returned
     *     content from the server.
     */
    getSurfacesContent: function(surfaces, req) {
        var url = new A.Url(req.url);

        url.addParameters(this.get('urlParams'));

        return this._loadContent(url);
    },

    /**
     * Returns content for given surface from the provided content.
     *
     * @method getSurfaceContent
     * @param {String} surfaceId The ID of the surface, which content should be
     *     loaded.
     * @req {Object} The request object.
     * @contents {Node} The content container from which the surface content
     *     will be retrieved.
     * @return {String|Node} String or Node instance which contains the content
     *     of the surface.
     */
    getSurfaceContent: function(surfaceId, req, contents) {
        var frag = contents.one('#' + surfaceId);

        if (frag) {
            return frag.getHTML();
        }
    },

    /**
     * Loads the content from server via single AJAX request.
     *
     * @method _loadContent
     * @protected
     * @return {A.Promise} Promise, which should be resolved with the returned
     *     content from the server.
     */
    _loadContent: function(url, opt_selector) {
        var instance = this;

        // If there's an outstanding request, abort it.
        if (instance._request) {
            instance._request.abort();
        }

        return new A.Promise(function(resolve, reject) {
            instance._request = A.io(url, {
                headers: {
                    'X-PJAX': 'true'
                },
                on: {
                    failure: function(id, response) {
                        reject(response.responseText);
                    },

                    success: function(id, response) {
                        var frag = A.Node.create(response.responseText);

                        if (opt_selector) {
                            frag = frag.one(opt_selector);
                        }

                        instance._setTitleFromFragment(frag);

                        resolve(frag);
                    }
                },
                timeout: instance.get('timeout')
            });
        });
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

        if (Lang.isString(val)) {
            params = {};
            params[val] = 1;
        }

        return params;
    },

    /**
     * Retrieves the title from the provided content and sets it to title
     * attribute of the class.
     *
     * @method _setTitleFromFragment
     * @param  {Node} frag The container from which the title should be
     *     retrieve.
     */
    _setTitleFromFragment: function(frag) {
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
        return Lang.isString(val) || Lang.isObject(val);
    }
}, {
    ATTRS: {
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
        }
    }
});
