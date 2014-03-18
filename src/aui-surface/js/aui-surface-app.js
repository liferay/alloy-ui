var Lang = A.Lang,
    AArray = A.Array;

A.SurfaceApp = A.Base.create('surface-app', A.Router, [A.PjaxBase], {
    /**
     * Holds the active path.
     *
     * @property activeChild
     * @type {String}
     * @protected
     */
    activePath: null,

    /**
     * Holds the active screen.
     *
     * @property activeScreen
     * @type {Screen}
     * @protected
     */
    activeScreen: null,

    /**
     * Maps the screen instances by the path.
     *
     * @property _screens
     * @type {Object}
     * @protected
     */
    _screens: null,

    /**
     * Map that index the surfaces instances by the surface id.
     *
     * @property _surfaces
     * @type {Object}
     * @protected
     */
    _surfaces: null,

    /**
     * Construction logic executed during SurfaceApp instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var instance = this;

        instance._surfaces = {};
        instance._screens = {};

        instance.on('navigate', instance._onNavigate);
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
        this._registerRoutes(AArray(screens));
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

        surfaces = AArray(surfaces);

        AArray.each(surfaces, function(surface) {
            if (Lang.isString(surface)) {
                surface = new A.Surface({
                    id: surface
                });
            }

            instance._surfaces[surface] = surface;
        });
    },

    /**
     * Finalizes a screen navigation.
     *
     * @method  _finalizeNavigate
     * @param {String} path
     * @param {Screen} screen
     * @private
     */
    _finalizeNavigate: function(path, screen) {
        var activeScreen = this.activeScreen;

        screen.afterFlip();

        // Concurrent routes can share the same screen, e.g. `/home` and
        // `/home:param`, for those cases a page refresh is performed and
        // removing the screen is not necessary.
        if (screen === activeScreen) {
            A.log('Screen [' + screen + '] refreshed', 'info');
            return;
        }

        if (activeScreen && !activeScreen.get('cacheable')) {
            this._removeScreen(this.activePath, activeScreen);
        }
        this.activePath = path;
        this.activeScreen = screen;
        this._screens[path] = screen;
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
    _handleNavigate: function(path, ScreenCtor, req, res, next) {
        var instance = this,
            screen = instance._screens[path],
            activeScreen = instance.activeScreen,
            screenId,
            deffered,
            contents = [],
            surfaces = [],
            transitions = [];

        A.log('Navigate to [' + path + ']', 'info');

        if (!screen) {
            A.log('Screen for [' + path + '] not found, create one', 'info');
            screen = new ScreenCtor();
        }

        screenId = screen.get('id');

        if (screen === activeScreen) {
            A.log('Screen [' + screen + '] simulates page refresh', 'info');
            screen.clearCache();
        }

        // Stack the surfaces and its operations in the right order. Since
        // getContentForSurface could return a promise in order to fetch async
        // content pass it to Y.batch in order to resolve them in parallel
        A.log('Loading surfaces content...', 'info');
        A.Object.each(instance._surfaces, function(surface, surfaceId) {
            surfaces.push(surface);
            contents.push(screen.handleSurfaceContent(surfaceId));
        });
        deffered = A.batch.apply(A, contents);
        deffered
            .then(function(data) {
                // When surfaces contents are ready, add them to each surface
                AArray.each(surfaces, function(surface, i) {
                    screen.addCache(surface, data[i]);
                    surface.addContent(screenId, data[i], (screen === activeScreen));
                });

                A.log('Tell the screen to get ready (beforeFlip)...', 'info');
                return A.when(screen.beforeFlip());
            })
            .then(function() {
                if (activeScreen) {
                    A.log('Deactivate active screen', 'info');
                    activeScreen.deactivate();
                }

                instance._setDocumentTitle(screen);

                // Animations should start at the same time, therefore
                // it's passed to Y.batch to be processed in parallel
                A.log('Screen [' + screen + '] ready, transition...', 'info');
                AArray.each(surfaces, function(surface) {
                    transitions.push(surface.show(screenId));
                });
                return A.batch.apply(A, transitions);
            })
            .then(function() {
                instance._finalizeNavigate(path, screen);
                A.log('Navigation done, request next screen', 'info');
                next();
            });
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
     * @param {String} path
     * @param {Screen} screen
     * @private
     */
    _removeScreen: function(path, screen) {
        var screenId = screen.get('id');

        A.Object.each(this._surfaces, function(surface) {
            surface.remove(screenId);
        });

        screen.destroy();

        delete this._screens[path];
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

        AArray.each(screens, function(value) {
            instance.route(
                value.path,
                A.bind(instance._handleNavigate, instance, value.path, value.screen));
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
            validator: Lang.isString,
            value: 'Home'
        }
    }
});
