YUI({
    filter: 'raw',
    filters: {
        'aui-surface': 'debug'
    }
}).use('aui-surface', 'transition', 'io', function(Y) {

    Y.HomeScreen = Y.Base.create('testScreen', Y.Screen, [], {
        // beforeFlip: function() {
        //     return new Y.Promise(function(resolve) {
        //         setTimeout(function() {
        //             resolve();
        //         }, 500);
        //     });
        // },

        // beforeDeactivate: function() {
        //     return true;
        // },

        getSurfaceContent: function(surfaceId) {
            switch (surfaceId) {
                case 'page':
                    return new Y.Promise(function(resolve) {
                        Y.io('home?pjax=1', {
                            on: {
                                success: function(id, xhr) {
                                    resolve(xhr.responseText);
                                }
                            }
                        });
                    });
            }
        }
    }, {
        ATTRS: {
            cacheable: {
                value: false
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
                    return new Y.Promise(function(resolve) {
                        Y.io('about?pjax=1', {
                            on: {
                                success: function(id, xhr) {
                                    resolve(xhr.responseText);
                                }
                            }
                        });
                    });
            }
        }
    }, {
        ATTRS: {
            cacheable: {
                value: false
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

    new Y.SurfaceApp({
        linkSelector: 'a',
        root: '/demos/surface',

        screens: {
            '/home': Y.HomeScreen,
            '/about': Y.AboutScreen
        },

        surfaces: ['page', 'header', 'nav', 'body']
    })
    .dispatch();

});