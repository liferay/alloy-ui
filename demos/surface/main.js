YUI({
    filter: 'raw',
    filters: {
        'aui-surface': 'debug'
    }
}).use('aui-surface-app', 'aui-surface-screen-html', 'transition', function(Y) {

    /**
     * Utils
     */
    var delay = function(ms, val) {
        var timeout;
        return new Y.CancellablePromise(
            function(resolve) {
                timeout = setTimeout(function() {
                    resolve(val);
                }, ms);
            },
            function() {
                clearTimeout(timeout);
            }
        );
    };

    var fade = function(from, to) {
        return new Y.Promise(function(resolve) {
            if (from) {
                from.setStyle('opacity', 0).hide();
                resolve();
            }
            if (to) {
                to.show(true, resolve);
            }
        });
    };

    // Uncomment to change the default transition for all surfaces
    // Y.Surface.TRANSITION = fade;

    /**
     * Screens
     */
    Y.DummyScreen = Y.Base.create('dummyScreen', Y.Screen, [], {
        getSurfaceContent: function(surfaceId) {
            switch (surfaceId) {
                case 'info':
                    return 'I was injected by DummyScreen.';
                case 'surface1':
                    return 'Surface 1';
                case 'surface2':
                    return 'Surface 2';
                case 'nav':
                    return null;
                case 'header':
                    return '<h1 class="span12">AlloyUI - /dummy</h1>';
            }
        }
    }, {
        ATTRS: {
            title: {
                value: 'Dummy'
            }
        }
    });

    Y.HomeScreen = Y.Base.create('homeScreen', Y.HTMLScreen, [], {
        // flip: function() {
        //     var flip = Y.HomeScreen.superclass.flip.apply(this, arguments);

        //     return flip.then(function() {
        //         return delay(1000);
        //     });
        // },

        // beforeDeactivate: function() {
        //     return true;
        // }
    }, {
        ATTRS: {
            cacheable: {
                value: false
            }
        }
    });

    Y.SurfaceScreen = Y.Base.create('surfaceScreen', Y.HTMLScreen, [], {}, {
        ATTRS: {
            cacheable: {
                value: false
            }
        }
    });


    /**
     * App
     */
    window.app = new Y.SurfaceApp({
        linkSelector: 'a',
        basePath: '/demos/surface',
        on: {
            startNavigate: function(event) {
                console.log(event);
            },
            endNavigate: function(event) {
                console.log(event);
            }
        }
    });

    app.addScreenRoutes([
        {
            path: '/dummy',
            screen: Y.DummyScreen
        },
        {
            path: '/about',
            screen: Y.HTMLScreen
        },
        {
            path: /^\/\w+\?sid=[0-9]+/,
            screen: Y.SurfaceScreen
        },
        {
            path: function(value) {
                return value === '/home';
            },
            screen: Y.HomeScreen
        }
    ]);

    app.addSurfaces([
        new Y.Surface({
            id: 'header',
            transition: fade
        }),
        'nav',
        'info',
        'surface1',
        'surface2'
    ]);

    app.dispatch();
});