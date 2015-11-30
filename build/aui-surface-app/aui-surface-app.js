YUI.add('aui-surface-app', function (A, NAME) {

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
     * @property pendingNavigate
     * @type {Promise}
     * @protected
     */
    pendingNavigate: null,

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
     * When set to true the first erroneous popstate fired on page load will be
     * ignored, only if `window.history.state` is also `null`.
     *
     * @property skipLoadPopstate
     * @type {Boolean}
     * @protected
     */
    skipLoadPopstate: false,

    /**
     * Maps that index the surfaces instances by the surface id.
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
            startNavigate: {
                defaultFn: this._defStartNavigateFn,
                preventedFn: this._preventNavigateFn
            },
            failNavigate: {},
            successNavigate: {},
            endNavigate: {}
        });
        A.once('load', this._onLoad, win, this);
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
     * @return {Promise} Returns a pending request cancellable promise.
     */
    dispatch: function() {
        return this.navigate(
            win.location.pathname + win.location.search + win.location.hash,
            true
        );
    },

    /**
     * Matches if path is a known route, if not found any returns null. The path
     * could contain a fragment-id (#). If the path is the same as the current
     * url, and the path contains a fragment, we do not prevent the default
     * browser behavior.
     *
     * @method matchesPath
     * @param {String} path Path containing the querystring part.
     * @return {Object | null} Route handler if match any or `null` if the path
     *     is the same as the current url and the path contains a fragment.
     */
    matchesPath: function(path) {
        var basePath = this.get('basePath'),
            hashIndex;

        // Remove path hash before match
        hashIndex = path.lastIndexOf('#');
        if (hashIndex > -1) {
            path = path.substr(0, hashIndex);
            if (path === win.location.pathname + win.location.search) {
                return null;
            }
        }

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
     * @return {Promise} Returns a pending request cancellable promise.
     */
    navigate: function(path, opt_replaceHistory) {
        this._stopPending();

        this.fire('startNavigate', {
            path: path,
            replaceHistory: !! opt_replaceHistory
        });
        return this.pendingNavigate;
    },

    /**
     * Prefetches the specified path if there is a route handler that matches.
     *
     * @method navigate
     * @param {String} path Path containing the querystring part.
     * @return {Promise} Returns a pending request cancellable promise.
     */
    prefetch: function(path) {
        var nextScreen,
            pendingPrefetch,
            route = this.matchesPath(path),
            self = this;

        if (!route) {
            return A.CancellablePromise.reject(new A.CancellablePromise.Error('No screen for ' + path));
        }

        A.log('Prefetching [' + path + ']', 'info');

        nextScreen = this._getScreenInstance(path, route);
        pendingPrefetch = A.CancellablePromise.resolve()
            .then(function() {
                return nextScreen.load(path);
            })
            .then(function() {
                    self.screens[path] = nextScreen;
                },
                function(reason) {
                    self._removeScreen(path, nextScreen);
                    throw reason;
                });

        return pendingPrefetch;
    },

    /**
     * Starts navigation to a path.
     *
     * @method  _defStartNavigateFn
     * @param {EventFacade} event Event facade containing `path` and
     *     `replaceHistory`.
     */
    _defStartNavigateFn: function(event) {
        var instance = this,
            payload = {
                path: event.path
            };

        this.pendingNavigate = this._doNavigate(
            event.path,
            event.replaceHistory
        ).thenCatch(
            function(reason) {
                A.log(reason.message, 'info');
                payload.error = reason;
                instance._stopPending();
                throw reason;
            }
        ).thenAlways(
            function() {
                instance.fire('endNavigate', payload);
            }
        );
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
            route,
            nextScreen,
            activeScreen = instance.activeScreen;

        if (this.activeScreen && this.activeScreen.beforeDeactivate()) {
            this.pendingNavigate = A.CancellablePromise.reject(
                new A.CancellablePromise.Error('Cancelled by active screen'));
            return this.pendingNavigate;
        }

        route = this.matchesPath(path);
        if (!route) {
            this.pendingNavigate = A.CancellablePromise.reject(
                new A.CancellablePromise.Error('No screen for ' + path));
            return this.pendingNavigate;
        }

        A.log('Navigate to [' + path + ']', 'info');

        // When reloading the same path do replaceState instead of pushState to
        // avoid polluting history with states with the same path.
        if (path === this.activePath) {
            opt_replaceHistory = true;
        }

        nextScreen = this._getScreenInstance(path, route);

        this.pendingNavigate = A.CancellablePromise.resolve(
            nextScreen.load(path)
        ).then(
            function(contents) {
                var screenId = nextScreen.get('id');
                A.Object.each(instance.surfaces, function(surface, surfaceId) {
                    surface.addContent(screenId, nextScreen.getSurfaceContent(surfaceId, contents));
                });

                if (activeScreen) {
                    activeScreen.deactivate();
                }

                return nextScreen.flip(instance.surfaces);
            }
        ).then(
            function() {
                instance._finalizeNavigate(path, nextScreen, opt_replaceHistory);
            },
            function(reason) {
                instance._handleNavigateError(path, nextScreen, reason);
            }
        );

        return this.pendingNavigate;
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

        nextScreen.activate();

        if (activeScreen && !activeScreen.get('cacheable')) {
            this._removeScreen(this.activePath, activeScreen);
        }

        this.activePath = path;
        this.activeScreen = nextScreen;
        this.screens[path] = nextScreen;
        this.pendingNavigate = null;
        A.log('Navigation done', 'info');
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
        this.pendingNavigate = null;
    },

    /**
     * Tests if hostname is an offsite link.
     *
     * @method _isLinkSameOrigin
     * @param  {String} hostname Link hostname to compare with
     *     `window.location.hostname`.
     * @return {Boolean}
     * @private
     */
    _isLinkSameOrigin: function(hostname) {
        return hostname === win.location.hostname;
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
     * Retrieves or create a screen instance to a path.
     *
     * @method  _getScreenInstance
     * @param {String} path Path containing the querystring part.
     * @private
     */
    _getScreenInstance: function(path, route) {
        var screen,
            refreshScreen;

        // When simulating page refresh the request lifecycle for activeScreen
        // and nextScreen should be respected, therefore creating a new screen
        // instance for the same path is needed
        if (path === this.activePath) {
            A.log('Already at destination, refresh navigation', 'info');
            refreshScreen = this.screens[path];
            delete this.screens[path];
        }

        screen = this.screens[path];
        if (!screen) {
            A.log('Create screen for [' + path + ']', 'info');
            screen = new(route.get('screen'))();
            // When simulating a page refresh the cache should copy the cache
            // from refreshScreen to avoid roundtrip to the server
            if (refreshScreen) {
                screen.addCache(refreshScreen.getCache());
            }
        }

        return screen;
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
            hostname = link.get('hostname'),
            path = link.get('pathname') + link.get('search') + link.get('hash'),
            navigateFailed = false;

        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            A.log('Stop the SPA navigation when a modifier key is pressed');
            return;
        }

        if (!this._isLinkSameOrigin(hostname)) {
            A.log('Offsite link clicked', 'info');
            return;
        }
        if (!this._isSameBasePath(path)) {
            A.log('Link clicked outside app\'s base path', 'info');
            return;
        }
        if (!this.matchesPath(path)) {
            A.log('No screen for ' + path, 'info');
            return;
        }

        this.navigate(path).thenCatch(function() {
            // Do not prevent link navigation in case some synchronous error occurs
            navigateFailed = true;
        });

        if (!navigateFailed) {
            event.preventDefault();
        }
    },

    /**
     * Listens to the window's load event in order avoid issues with some browsers
     * that trigger popstate calls on the first load. For more information see
     * http://stackoverflow.com/questions/6421769/popstate-on-pages-load-in-chrome.
     *
     * @method _onLoad
     * @private
     */
    _onLoad: function() {
        var instance = this;

        this.skipLoadPopstate = true;
        setTimeout(function() {
            // The timeout ensures that popstate events will be unblocked right
            // after the load event occured, but not in the same event-loop cycle.
            instance.skipLoadPopstate = false;
        }, 0);
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
            if (this.skipLoadPopstate) {
                return;
            }

            if (!win.location.hash) {
                win.location.reload();
                return;
            }
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
     * Fires when navigation is prevented from `startNavigate` event.
     *
     * @method  _preventNavigateFn
     * @param {EventFacade} event
     */
    _preventNavigateFn: function() {
        this.pendingNavigate = A.CancellablePromise.reject(
            new A.CancellablePromise.Error('Navigation has been prevented'));
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
     * Cancels pending navigate with `Cancel pending navigation` error.
     *
     * @method  _stopPending
     * @protected
     */
    _stopPending: function() {
        if (this.pendingNavigate) {
            this.pendingNavigate.cancel('Cancel pending navigation');
            this.pendingNavigate = null;
        }
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


}, '3.0.1', {
    "requires": [
        "event-delegate",
        "node-event-html5",
        "aui-surface-base",
        "aui-surface-screen",
        "aui-surface-screen-route"
    ]
});
