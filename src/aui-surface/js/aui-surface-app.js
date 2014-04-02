A.SurfaceApp = A.Base.create('surface-app', A.Router, [A.PjaxBase], {
    /**
     * Holds the active screen.
     *
     * @property activeScreen
     * @type {Screen}
     * @protected
     */
    activeScreen: null,

    /**
     * Holds the active url containing the query parameters.
     *
     * @property activeUrl
     * @type {String}
     * @protected
     */
    activeUrl: null,

    /**
     * Holds a deferred withe the current navigation.
     *
     * @property pendingRequest
     * @type {Promise}
     * @protected
     */
    pendingRequest: null,

    /**
     * Maps the screen instances by the url containing the parameters.
     *
     * @property screens
     * @type {Object}
     * @protected
     */
    screens: null,

    /**
     * Map that index the surfaces instances by the surface id.
     *
     * @property surfaces
     * @type {Object}
     * @protected
     */
    surfaces: null,

    /**
     * Construction logic executed during SurfaceApp instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.surfaces = {};
        this.screens = {};
        this.on('navigate', this._onNavigate);
    },

    /**
     * Adds one or more screens to the application.
     *
     * @method addScreens
     * @param {Object} or {Array} screens Single object or an array of object. Each object should contain `path`
     *     and `screen`.
     * The `path` should be a string or
     * a regex that maps the navigation route to a screen class definition
     * (not an instance), e.g:
     *
     *     `{ path: "/home:param1", screen: Y.MyScreen }`
     *     `{ path: /foo.+/, screen: Y.MyScreen }`
     */
    addScreens: function(screens) {
        this._registerRoutes(A.Array(screens));
    },

    /**
     * Adds one or more surfaces to the application.
     *
     * @method addSurfaces
     * @param {Surface} or {String} or [{Surface | String}] surfaces String (id) or Surface instance. You can
     * also pass an Array which contains Surface instances or String (id). In case of ID, these should be the ID of
     * surface DOM element.
     */
    addSurfaces: function(surfaces) {
        var instance = this;

        surfaces = A.Array(surfaces);

        A.Array.each(surfaces, function(surface) {
            if (A.Lang.isString(surface)) {
                surface = new A.Surface({
                    id: surface
                });
            }
            instance.surfaces[surface] = surface;
        });
    },

    /**
     * Finalizes a screen navigation.
     *
     * @method  _finalizeNavigate
     * @param {String} url
     * @param {Screen} nextScreen
     * @private
     */
    _finalizeNavigate: function(url, nextScreen) {
        var activeScreen = this.activeScreen;

        nextScreen.afterFlip();

        this._setDocumentTitle(nextScreen);

        if (activeScreen && !activeScreen.get('cacheable')) {
            this._removeScreen(this.activeUrl, activeScreen);
        }

        this.activeUrl = url;
        this.activeScreen = nextScreen;
        this.screens[url] = nextScreen;
    },

    /**
     * @override
     */
    _getPath: function() {
        return this._getURL().replace(this._regexUrlOrigin, '');
    },

    /**
     * Handle navigation error.
     *
     * @method  _handleNavigateError
     * @param {String} url
     * @param {Screen} nextScreen
     * @param {Error} error
     * @private
     */
    _handleNavigateError: function(url, nextScreen, err) {
        A.log('Navigation error for [' + nextScreen + '] (' + err + ')', 'info');
        this.pendingRequest = null;
    },

    /**
     * @override
     */
    removeQuery: function(url) {
        return url;
    },

    /**
     * TODO:
     *   -
     *   - If screen is cacheable read its value from cache and leave the screen surface children in doc.
     *   - Else, invoke screen beforeDeactivate, deactivate and destroy. This should remove all screen surface children.
     * @param  {[type]}   path       [description]
     * @param  {[type]}   ScreenCtor [description]
     * @param  {[type]}   req        [description]
     * @param  {[type]}   res        [description]
     * @param  {Function} next       [description]
     * @return {[type]}              [description]
     */
    _handleNavigate: function() {
        var instance = this,
            args = arguments;

        function handleNavigateInternal() {
            instance._doNavigate.apply(instance, args);
        }

        if (instance.pendingRequest) {
            instance.pendingRequest.cancel('Navigation cancelled').thenAlways(handleNavigateInternal);
        }
        else {
            A.soon(handleNavigateInternal);
        }
    },

    /**
     * [_doNavigate description]
     * @param  {[type]}   screenFactory [description]
     * @param  {[type]}   req           [description]
     * @param  {[type]}   res           [description]
     * @param  {Function} next          [description]
     * @return {[type]}                 [description]
     */
    _doNavigate: function(screenFactory, req, res, next) {
        var instance = this,
            url = this.removeRoot(req.url),
            nextScreen = instance.screens[url],
            activeScreen = instance.activeScreen,
            screenId,
            contents = [],
            transitions = [],
            surfaces = [],
            surfacesId = A.Object.keys(instance.surfaces);

        A.log('Navigate to [' + url + ']', 'info');

        if (!nextScreen) {
            A.log('Create screen for [' + url + ']', 'info');
            nextScreen = new(screenFactory.screen)();
        }

        screenId = nextScreen.get('id');

        instance.pendingRequest = A.CancellablePromise.resolve(
            nextScreen.handleSurfacesContent(surfacesId, req));

        instance.pendingRequest.then(
            function(opt_contents) {
                nextScreen.addCache(surfacesId, opt_contents);
                // Stack the surfaces and its operations in the right order. Since
                // getSurfaceContent could return a promise in order to fetch async
                // content pass it to Y.batch in order to resolve them in parallel
                A.log('Loading surfaces content...', 'info');
                A.Object.each(instance.surfaces, function(surface, surfaceId) {
                    surfaces.push(surface);
                    contents.push(nextScreen.handleSurfaceContent(surfaceId, req, opt_contents));
                });

                return A.CancellablePromise.all(contents);
            }
        ).then(
            function(data) {
                // Add the new content to each surface
                A.Array.each(surfaces, function(surface, i) {
                    surface.addContent(screenId, data[i]);
                    nextScreen.addCache(surface, data[i]);
                });

                return A.CancellablePromise.resolve(nextScreen.beforeFlip());
            }
        ).then(
            function() {
                if (activeScreen) {
                    activeScreen.deactivate();
                }

                // Animations should start at the same time, therefore
                // it's passed to Y.batch to be processed in parallel
                A.log('Screen [' + nextScreen + '] ready, flip...', 'info');
                A.Array.each(surfaces, function(surface) {
                    transitions.push(surface.show(screenId));
                });

                return A.CancellablePromise.all(transitions);
            }
        ).then(
            function() {
                instance._finalizeNavigate(url, nextScreen);
                A.log('Navigation done, request next screen', 'info');
                next();
            },
            function(reason) {
                instance._handleNavigateError(url, nextScreen, reason);
            }
        );
    },

    /**
     * Intercepts navigate event in order to prevent URL change if needed.
     *
     * @method  _onNavigate
     * @param {EventFacade} event Navigate event facade
     * @private
     */
    _onNavigate: function(event) {
        // Chained routes and route with params are resolved to the same path,
        // since parameters can distinguish the page state the full URL is
        // compared to determine when is already at the destination
        if (event.url === this._getURL()) {
            A.log('Not navigating, already at destination', 'info');
            event.halt();
            return;
        }
        if (this.activeScreen && this.activeScreen.beforeDeactivate()) {
            A.log('Navigation cancelled by active screen', 'info');
            event.halt();
            return;
        }
    },

    /**
     * Removes a screen.
     *
     * @method  _removeScreen
     * @param {String} url
     * @param {Screen} screen
     * @private
     */
    _removeScreen: function(url, screen) {
        var screenId = screen.get('id');

        A.Object.each(this.surfaces, function(surface) {
            surface.remove(screenId);
        });

        screen.destroy();
        delete this.screens[url];
    },

    /**
     * Escapes characters in the string that are not safe to use in a RegExp.
     *
     * @method _regExpEscape
     * @param {String} s The string to escape. If not a string, it will be casted
     *     to one.
     * @return {string} A RegExp safe, escaped copy of `s`.
     */
    _regExpEscape: function(s) {
        return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
    },

    /**
     * Registers a route for a screen.
     *
     * @method  _registerRoutes
     * @param {Array} screens Array of objects with `path` and `screen`
     *     keys.
     * @private
     */
    _registerRoutes: function(screens) {
        var instance = this;

        A.Array.each(screens, function(value) {
            var regex = value.path;

            if (!A.instanceOf(regex, RegExp)) {
                regex = new RegExp('^' + instance._regExpEscape(value.path) + '$');
            }

            instance._routes.push({
                callbacks: [A.bind(instance._handleNavigate, instance, value)],
                keys: [],
                path: value.path,
                regex: regex
            });
        });
    },

    /**
     * Updates the document title with the `title` of the screen or the
     * `defaultTitle` of the surface app.
     *
     * @method  _setDocumentTitle
     * @param {Screen} screen
     * @private
     */
    _setDocumentTitle: function(screen) {
        A.config.doc.title = screen.get('title') || this.get('defaultTitle');
    }
}, {
    ATTRS: {
        /**
         * Defines the default document title in case the screen doesn't have
         * any `title`.
         *
         * @attribute defaultTitle
         * @default Home
         * @type {String}
         */
        defaultTitle: {
            validator: A.Lang.isString,
            value: 'Home'
        }
    }
});
