var doc = A.config.doc,
    win = A.config.win;

A.SurfaceApp = A.Base.create('surface-app', A.Base, [], {
    /**
     * Holds the active screen.
     *
     * @property activeScreen
     * @type {Screen}
     * @protected
     */
    activeScreen: null,

    /**
     * Holds the active path containing the query parameters.
     *
     * @property activePath
     * @type {String}
     * @protected
     */
    activePath: null,

    /**
     * Holds the window hotizontal scroll position before navigation using back
     * or forward happens to lock the scroll position until the surfaces are
     * updated.
     *
     * @property lockPageXOffset
     * @type {Number}
     * @protected
     */
    lockPageXOffset: 0,

    /**
     * Holds the window vertical scroll position before navigation using back or
     * forward happens to lock the scroll position until the surfaces are
     * updated.
     *
     * @property lockPageYOffset
     * @type {Number}
     * @protected
     */
    lockPageYOffset: 0,

    /**
     * Holds the window hotizontal scroll position when the navigation using
     * back or forward happens to be restored after the surfaces are updated.
     *
     * @property pageXOffset
     * @type {Number}
     * @protected
     */
    pageXOffset: 0,

    /**
     * Holds the window vertical scroll position when the navigation using
     * back or forward happens to be restored after the surfaces are updated.
     *
     * @property pageYOffset
     * @type {Number}
     * @protected
     */
    pageYOffset: 0,

    /**
     * Holds a deferred withe the current navigation.
     *
     * @property pendingRequest
     * @type {Promise}
     * @protected
     */
    pendingRequest: null,

    /**
     * Holds the screen routes configuration.
     *
     * @property routes
     * @type {Array}
     * @protected
     */
    routes: null,

    /**
     * Maps the screen instances by the url containing the parameters.
     *
     * @property screens
     * @type {Object}
     * @protected
     */
    screens: null,

    /**
     * Holds the scroll event handle.
     *
     * @property scrollHandle
     * @type {Object}
     * @private
     */
    scrollHandle: null,

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
        this.routes = [];
        this.surfaces = {};
        this.screens = {};
        this.publish({
            endNavigate: {},
            startNavigate: {
                defaultFn: this._defStartNavigateFn
            }
        });
        A.on('scroll', A.debounce(this._onScroll, 50, this));
        A.on('popstate', this._onPopState, win, this);
        A.delegate('click', this._onDocClick, doc, this.get('linkSelector'), this);
    },

    /**
     * Adds one or more screens to the application.
     *
     * @method addScreenRoutes
     * @param {Object} or {Array} screens Single object or an array of object. Each object should contain `path`
     *     and `screen`.
     *     The `path` should be a string or a regex that maps the navigation
     *     route to a screen class definition (not an instance), e.g:
     *         `{ path: "/home:param1", screen: Y.MyScreen }`
     *         `{ path: /foo.+/, screen: Y.MyScreen }`
     * @chainable
     */
    addScreenRoutes: function(screens) {
        this._registerRoutes(A.Array(screens));
        return this;
    },

    /**
     * Adds one or more surfaces to the application.
     *
     * @method addSurfaces
     * @param {Surface} or {String} or [{Surface | String}] surfaces String (id) or Surface instance. You can
     * also pass an Array which contains Surface instances or String (id). In case of ID, these should be the ID of
     * surface DOM element.
     * @chainable
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

        return this;
    },

    /**
     * Dispatches to the first route handler that matches the current path, if
     * any.
     *
     * @method dispatch
     * @chainable
     */
    dispatch: function() {
        var location = A.getLocation();

        this.navigate(location.pathname + location.search, true);

        return this;
    },

    /**
     * Matches a route handler from a path, if not found any returns null.
     *
     * @method matchesRoute
     * @param {String} path Path containing the querystring part.
     * @return {Object | null} Route handler if match any.
     */
    matchesRoute: function(path) {
        var basePath = this.get('basePath');

        // Removes base path from link path
        path = path.substr(basePath.length);

        return A.Array.find(this.routes, function(route) {
            return route.matchesPath(path);
        });
    },

    /**
     * Navigates to the specified path if there is a route handler that matches.
     *
     * @method navigate
     * @param {String} path Path containing the querystring part.
     * @param {Boolean} opt_replaceHistory Replaces browser history.
     */
    navigate: function(path, opt_replaceHistory) {
        if (this.pendingRequest) {
            this.pendingRequest.cancel('Navigation cancelled');
            this.pendingRequest = null;
        }
        if (!this._isSameBasePath(path)) {
            A.log('Link clicked outside app\'s base path', 'info');
            return;
        }
        if (path === this.activePath) {
            A.log('Not navigating, already at destination', 'info');
            return;
        }
        if (this.activeScreen && this.activeScreen.beforeDeactivate()) {
            A.log('Navigation cancelled by active screen', 'info');
            return;
        }

        var route = this.matchesRoute(path);
        if (route) {
            this.fire('startNavigate', {
                replaceHistory: opt_replaceHistory,
                path: path,
                route: route
            });
            return true;
        }
        return false;
    },

    /**
     * Starts navigation to a path.
     *
     * @method  _defStartNavigateFn
     * @param {EventFacade} event Event facade containing `path` and
     * `replaceHistory`.
     */
    _defStartNavigateFn: function(event) {
        var instance = this;

        this._doNavigate(event.path, event.replaceHistory).thenAlways(function() {
            instance.fire('endNavigate', {
                path: event.path
            });
        });
    },

    /**
     * Starts navigation to a path.
     *
     * @method  _doNavigate
     * @param {String} path Path containing the querystring part.
     * @param {Boolean} opt_replaceHistory Replaces browser history.
     * @return {Promise} Returns a pending request cancellable promise.
     */
    _doNavigate: function(path, opt_replaceHistory) {
        var instance = this,
            activeScreen = instance.activeScreen,
            nextScreen = this._getScreen(path),
            screenId = nextScreen.get('id'),
            transitions = [],
            surfaces = [],
            surfacesId = A.Object.keys(instance.surfaces);

        A.log('Navigate to [' + path + ']', 'info');

        instance.pendingRequest = A.CancellablePromise.resolve(nextScreen.handleSurfacesContent(surfacesId, path)).then(
            function(opt_contents) {
                nextScreen.addCache(surfacesId, opt_contents);
                // Stack the surfaces and its operations in the right order. Since
                // getSurfaceContent could return a promise in order to fetch async
                // content pass it to Y.batch in order to resolve them in parallel
                A.log('Loading surfaces content...', 'info');
                A.Object.each(instance.surfaces, function(surface, surfaceId) {
                    surfaces.push(surface);
                    surface.addContent(screenId, nextScreen.getSurfaceContent(surfaceId, opt_contents));
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
                instance._finalizeNavigate(path, nextScreen, opt_replaceHistory);
            },
            function(reason) {
                instance._handleNavigateError(path, nextScreen, reason);
            }
        );

        return instance.pendingRequest;
    },

    /**
     * Finalizes a screen navigation.
     *
     * @method  _finalizeNavigate
     * @param {String} path Path containing the querystring part.
     * @param {Screen} nextScreen
     * @param {Boolean} opt_replaceHistory Replaces browser history.
     * @private
     */
    _finalizeNavigate: function(path, nextScreen, opt_replaceHistory) {
        var activeScreen = this.activeScreen,
            title = nextScreen.get('title') || this.get('defaultTitle');

        this._updateHistory(title, path, opt_replaceHistory);

        this._syncScrollPosition(opt_replaceHistory);

        doc.title = title;

        nextScreen.afterFlip();

        if (activeScreen && !activeScreen.get('cacheable')) {
            this._removeScreen(this.activePath, activeScreen);
        }

        this.activePath = path;
        this.activeScreen = nextScreen;
        this.screens[path] = nextScreen;
        this.pendingRequest = null;
        A.log('Navigation done', 'info');
    },

    /**
     * Retrieves or create a screen to a path.
     *
     * @method  _getScreen
     * @param {String} path Path containing the querystring part.
     * @private
     */
    _getScreen: function(path) {
        var screen = this.screens[path];

        if (!screen) {
            A.log('Create screen for [' + path + ']', 'info');
            return new(this.matchesRoute(path).get('screen'))();
        }

        return screen;
    },

    /**
     * Handle navigation error.
     *
     * @method  _handleNavigateError
     * @param {String} path Path containing the querystring part.
     * @param {Screen} nextScreen
     * @param {Error} error
     * @private
     */
    _handleNavigateError: function(path, nextScreen, err) {
        A.log('Navigation error for [' + nextScreen + '] (' + err + ')', 'info');
        this._removeScreen(path, nextScreen);
        this.pendingRequest = null;
    },

    /**
     * Tests if link element has the same app's base path.
     *
     * @param  {String} path Link path containing the querystring part.
     * @return {Boolean}
     * @private
     */
    _isSameBasePath: function(path) {
        return path.indexOf(this.get('basePath')) === 0;
    },

    /**
     * Tests if link element is an offsite link.
     *
     * @method _isLinkSameOrigin
     * @param  {Node} link Link element to check base path.
     * @return {Boolean}
     * @private
     */
    _isLinkSameOrigin: function(link) {
        return A.getLocation().hostname === link.get('hostname');
    },

    /**
     * Lock the document scroll in order to avoid the browser native back and
     * forward navigation to change the scroll position. Surface app takes care
     * of updating it when surfaces are ready.
     *
     * @method _lockScroll
     * @private
     */
    _lockScroll: function() {
        var instance = this,
            lockPageXOffset = instance.lockPageXOffset,
            lockPageYOffset = instance.lockPageYOffset;

        instance.pageXOffset = win.pageXOffset;
        instance.pageYOffset = win.pageYOffset;

        // In order to keep the history scrolling fluid, the scroll position
        // needs to be locked until content is fully loaded and surfaces
        // painted. The problem is that behavior is incosistent through
        // browsers. Blink and Webkit popstate event happens before scroll
        // position updates, and on Firefox and IE scroll position updates
        // before popstate event. If we assume the lock position is the same as
        // the current win.page[XY]Offset on popstate, we should capture the
        // next scroll tick, otherwise listens for the next scroll once to
        // capture the history scroll position. For more information see
        // discussion https://bugzilla.mozilla.org/show_bug.cgi?id=679458.
        if (lockPageXOffset === instance.pageXOffset &&
            lockPageYOffset === instance.pageYOffset) {
            A.soon(function() {
                instance.pageXOffset = win.pageXOffset;
                instance.pageYOffset = win.pageYOffset;
                win.scrollTo(lockPageXOffset, lockPageYOffset);
            });
        }
        else {
            A.once('scroll', function() {
                instance.pageXOffset = win.pageXOffset;
                instance.pageYOffset = win.pageYOffset;
                win.scrollTo(lockPageXOffset, lockPageYOffset);
            });
        }
    },

    /**
     * Intercepts document clicks and test link elements in order to decide
     * whether Surface app can navigate.
     *
     * @method  _onDocClick
     * @param {EventFacade} event Event facade
     * @private
     */
    _onDocClick: function(event) {
        var link = event.currentTarget,
            path = link.get('pathname') + link.get('search');

        if (!this._isLinkSameOrigin(link)) {
            A.log('Offsite link clicked', 'info');
            return;
        }

        if (this.navigate(path)) {
            event.preventDefault();
        }
        else {
            A.log('Link clicked without route', 'info');
        }
    },

    /**
     * Handles browser history changes and fires app's navigation if the state
     * belows to us. If we detect a popstate and the state is `null`, assume it
     * is navigating to an external page or to a page we don't have route, then
     * `window.location.reload()` is invoked in order to reload the content to
     * the current url.
     *
     * @method _onPopState
     * @param {EventFacade} event Event facade
     * @private
     */
    _onPopState: function(event) {
        var state = event._event.state;

        if (state === null) {
            win.location.reload();
            return;
        }

        if (state && state.surface) {
            A.log('History navigation to [' + state.path + ']', 'info');
            this._lockScroll();
            this.navigate(state.path, true);
        }
    },

    /**
     * Listens document scroll changes in order to capture the possible lock
     * scroll position for history scrolling.
     *
     * @method _onScroll
     * @param {EventFacade} event Event facade
     * @private
     */
    _onScroll: function() {
        this.lockPageXOffset = win.pageXOffset;
        this.lockPageYOffset = win.pageYOffset;
    },

    /**
     * Removes a screen.
     *
     * @method  _removeScreen
     * @param {String} path Path containing the querystring part.
     * @param {Screen} screen
     * @private
     */
    _removeScreen: function(path, screen) {
        var screenId = screen.get('id');

        A.Object.each(this.surfaces, function(surface) {
            surface.remove(screenId);
        });

        screen.destroy();
        delete this.screens[path];
    },

    /**
     * Registers a route for a screen.
     *
     * @method  _registerRoutes
     * @param {Array} screenRoutes Array of objects with `path` and `screen`
     *     keys or `A.ScreenRoute` instances.
     * @private
     */
    _registerRoutes: function(screenRoutes) {
        var instance = this;

        A.Array.each(screenRoutes, function(value) {
            if (!A.instanceOf(value, A.ScreenRoute)) {
                value = new A.ScreenRoute({
                    path: value.path,
                    screen: value.screen
                });
            }

            instance.routes.push(value);
        });
    },

    /**
     * Sync document scroll position to the values captured when the default
     * back and forward navigation happened. The scroll position updates after
     * `beforeFlip` is called and before the surface transitions.
     *
     * @method  _syncScrollPosition
     * @param {Boolean} opt_replaceHistory Replaces browser history.
     * @private
     */
    _syncScrollPosition: function(opt_replaceHistory) {
        win.scrollTo(
            opt_replaceHistory ? this.pageXOffset : 0,
            opt_replaceHistory ? this.pageYOffset : 0
        );
    },

    /**
     * Updates or replace browser history.
     *
     * @method _updateHistory
     * @param {String} path Path containing the querystring part.
     * @param {String} title Document title.
     * @param {Boolean} opt_replaceHistory Replaces browser history.
     * @private
     */
    _updateHistory: function(title, path, opt_replaceHistory) {
        var historyParams = {
            path: path,
            surface: true
        };

        if (opt_replaceHistory) {
            win.history.replaceState(historyParams, title, path);
        }
        else {
            win.history.pushState(historyParams, title, path);
        }
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
        },

        /**
         * CSS selector string used to filter link click events so that only the
         * links which match it will have the enhanced navigation behavior.
         *
         * @attribute linkSelector
         * @type String
         * @default "a"
         * @initOnly
         */
        linkSelector: {
            value: 'a',
            writeOnce: 'initOnly'
        },

        /**
         * Absolute base path from which all routes should be evaluated.
         *
         * @attribute basePath
         * @type String
         * @default ''
         */
        basePath: {
            value: ''
        }
    }
});
