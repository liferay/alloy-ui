YUI({
    filter: 'raw',
    filters: {
        'aui-surface': 'debug'
    }
}).use('aui-surface', 'aui-url', 'transition', 'io', function(Y) {

    /**
     * Utils
     */
    var load = function(url, opt_selector) {
        return new Y.Promise(function(resolve) {
            Y.io(url, {
                on: {
                    success: function(id, xhr) {
                        var content = xhr.responseText;
                        resolve(opt_selector ?
                                    Y.Node.create(content).one(opt_selector).get('innerHTML') :
                                      content);
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
    Y.HomeScreen = Y.Base.create('homeScreen', Y.Screen, [], {
        // beforeFlip: function() {
        //     return delay(1000);
        // },

        // beforeDeactivate: function() {
        //     return true;
        // },

        getSurfacesContent: function(surfaces, req) {
            var url = new Y.Url(req.url);
            url.addParameter('pjax', '1');

            return load(url);
        },

        getSurfaceContent: function(surfaceId, req, opt_contents) {
            var content = Y.Node.create(opt_contents);

            switch (surfaceId) {
                case 'info': return 'I was injected by HomeScreen.';
                case 'surface1': return content.one('#surface1').get('innerHTML');
                case 'surface2': return content.one('#surface2').get('innerHTML');
                case 'nav': return content.one('#nav').get('innerHTML');
                case 'header': return content.one('#header').get('innerHTML');
            }
        }
    }, {
        ATTRS: {
            cacheable: {
                value: false
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

        getSurfacesContent: function(surfaces, req) {
            var url = new Y.Url(req.url);
            url.addParameter('pjax', '1');

            return load(url);
        },

        getSurfaceContent: function(surfaceId, req, opt_contents) {
            var content = Y.Node.create(opt_contents);

            switch (surfaceId) {
                case 'info': return 'I was injected by AboutScreen.';
                case 'surface1': return content.one('#surface1').get('innerHTML');
                case 'surface2': return content.one('#surface2').get('innerHTML');
                case 'nav': return content.one('#nav').get('innerHTML');
                case 'header': return content.one('#header').get('innerHTML');
            }
        }
    }, {
        ATTRS: {
            cacheable: {
                value: false
            },
            title: {
                value: 'About'
            }
        }
    });

    Y.SurfaceScreen = Y.Base.create('surfaceScreen', Y.Screen, [], {
        getSurfacesContent: function(surfaces, req) {
            var url = new Y.Url(req.url);
            url.addParameter('pjax', '1');

            return load(url);
        },

        getSurfaceContent: function(surfaceId, req, opt_contents) {
            var content = Y.Node.create(opt_contents);

            switch (surfaceId) {
                case 'surface' + req.query.sid: return content.one('#surface' + req.query.sid).get('innerHTML');
                case 'nav': return content.one('#nav').get('innerHTML');
                case 'header': return content.one('#header').get('innerHTML');
            }
        }
    }, {
        ATTRS: {
            cacheable: {
                value: false
            },
            title: {
                value: 'Surface 1'
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
            path: /^\/home\?sid=[0-9]+/,
            screen: Y.SurfaceScreen
        },
        {
            path: '/home',
            screen: Y.HomeScreen
        },
        {
            path: '/about',
            screen: Y.AboutScreen
        }
    ]);

    app.addSurfaces(['header', 'nav', 'info', 'surface1', 'surface2']);

    app.dispatch();
});