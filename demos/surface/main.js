YUI({
    filter: 'raw',
    filters: {
        'aui-surface': 'debug'
    }
}).use('aui-surface-app', 'aui-surface-screen-html', 'transition', function(Y) {

    /**
     * Utils
     */
    var load = function(url, opt_selector) {
        var io;
        return new Y.CancellablePromise(
            function(resolve, reject) {
                io = Y.io(url, {
                    on: {
                        success: function(id, xhr) {
                            var content = xhr.responseText;
                            resolve(opt_selector ?
                                Y.Node.create(content).one(opt_selector).get('innerHTML') :
                                content);
                        },
                        failure: function() {
                            reject('Cannot load');
                        }
                    }
                });
            },
            function(reason) {
                io.abort();
                console.log('io.abort()', reason);
            }
        );
    };

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
                case 'info':
                    return 'I was injected by HomeScreen.';
                case 'surface1':
                    return content.one('#surface1').get('innerHTML');
                case 'surface2':
                    return content.one('#surface2').get('innerHTML');
                case 'nav':
                    return content.one('#nav').get('innerHTML');
                case 'header':
                    return content.one('#header').get('innerHTML');
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

    Y.SurfaceScreen = Y.Base.create('surfaceScreen', Y.Screen, [], {
        getSurfacesContent: function(surfaces, req) {
            var url = new Y.Url(req.url);
            url.addParameter('pjax', '1');

            return load(url);
        },

        getSurfaceContent: function(surfaceId, req, opt_contents) {
            var content = Y.Node.create(opt_contents);

            switch (surfaceId) {
                case 'surface' + req.query.sid:
                    return content.one('#surface' + req.query.sid).get('innerHTML');
                case 'nav':
                    return content.one('#nav').get('innerHTML');
                case 'header':
                    return content.one('#header').get('innerHTML');
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
            path: /^\/\w+\?sid=[0-9]+/,
            screen: Y.SurfaceScreen
        },
        {
            path: '/home',
            screen: Y.HomeScreen
        },
        {
            path: '/about',
            screen: Y.HTMLScreen
        }
    ]);

    app.addSurfaces(['header', 'nav', 'info', 'surface1', 'surface2']);

    app.dispatch();
});