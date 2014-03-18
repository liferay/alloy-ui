YUI({
    filter: 'raw',
    filters: {
        'aui-surface': 'debug'
    }
}).use('aui-surface', 'transition', 'io', function(Y) {

    /**
     * Utils
     */
    var load = function(url) {
        return new Y.Promise(function(resolve) {
            Y.io(url, {
                on: {
                    success: function(id, xhr) {
                        resolve(xhr.responseText);
                    }
                }
            });
        });
    };

    var delay = function(ms) {
        return new Y.Promise(function(resolve) {
            setTimeout(function() {
                resolve();
            }, ms);
        });
    };

    /**
     * Screens
     */
    Y.HomeScreen = Y.Base.create('testScreen', Y.Screen, [], {
        // beforeFlip: function() {
        //     return delay(1000);
        // },

        // beforeDeactivate: function() {
        //     return true;
        // },

        getSurfaceContent: function(surfaceId) {
            switch (surfaceId) {
                case 'page':
                    return load('home?pjax=1');
            }
        }
    }, {
        ATTRS: {
            cacheable: {
                value: true
            },
            id: {
                value: 'test'
            },
            title: {
                value: 'Home'
            }
        }
    });

    Y.AboutScreen = Y.Base.create('aboutScreen', Y.Screen, [], {
        // beforeDeactivate: function() {
        //     return true;
        // },
        getSurfaceContent: function(surfaceId) {
            switch (surfaceId) {
                case 'page':
                    return load('about?pjax=1');
            }
        }
    }, {
        ATTRS: {
            cacheable: {
                value: true
            },
            id: {
                value: 'about'
            },
            title: {
                value: 'About'
            }
        }
    });

    // Y.Surface.TRANSITION = function(from, to) {
    //     return new Y.Promise(function(resolve) {
    //         if (from) {
    //             from.setStyle('opacity', 0).hide();
    //             resolve();
    //         }
    //         if (to) {
    //             to.show(true, resolve);
    //         }
    //     });
    // };

    /**
     * App
     */
    var app = new Y.SurfaceApp({
        linkSelector: 'a',
        root: '/demos/surface'
    });

    app.addScreens([
        {
            path: '/home:sid',
            screen: Y.HomeScreen
        },
        {
            path: '/about',
            screen: Y.AboutScreen
        }
    ]);

    app.addSurfaces(['page', 'header', 'nav', 'body']);

    app.dispatch();
});