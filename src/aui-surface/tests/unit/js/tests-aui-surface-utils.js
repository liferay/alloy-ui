YUI.add('tests-aui-surface-utils', function(Y) {
    Y.mix(Y.Test.Case.prototype, {
        assertNavigation: function(url, content) {
            this.assertPath(url);
            this.assertSurfaceContent('body', content);
            this.assertSurfaceContent('header', content);
            Y.Assert.areEqual(content, Y.config.doc.title);
        },

        assertPath: function(path) {
            Y.Assert.areEqual(path, this.getCurrentPath());
        },

        assertSurfaceContent: function(surfaceId, content) {
            Y.Assert.areEqual(content, this.getSurfaceContent(surfaceId));
        },

        delay: function(ms, val) {
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
        },

        getCurrentPath: function() {
            return Y.config.win.location.pathname + Y.config.win.location.search + Y.config.win.location.hash;
        },

        getOriginalBasePath: function() {
            var path = this.originalPath;
            return path.substr(0, path.lastIndexOf('/'));
        },

        getSurfaceContent: function(surfaceId) {
            return Y.one('#' + surfaceId).one('div').get('text').trim();
        }
    });

    Y.PageScreen = Y.Base.create('pageScreen', Y.Screen, [], {
        getSurfaceContent: function(surfaceId) {
            switch (surfaceId) {
                case 'header':
                    return 'page';
                case 'body':
                    return 'page';
            }
        },
        getSurfacesContent: function() {
            return 'cached';
        }
    }, {
        ATTRS: {
            cacheable: {
                value: true
            },
            title: {
                value: 'page'
            }
        }
    });

    Y.QueryStringScreen = Y.Base.create('queryStringScreen', Y.Screen, [], {
        getSurfaceContent: function(surfaceId) {
            switch (surfaceId) {
                case 'header':
                    return 'querystring';
                case 'body':
                    return 'querystring';
            }
        }
    }, {
        ATTRS: {
            title: {
                value: 'querystring'
            }
        }
    });

    Y.DelayedScreen = Y.Base.create('delayedScreen', Y.Screen, [], {
        flip: function() {
            var flip = Y.DelayedScreen.superclass.flip.apply(this, arguments);

            return flip.then(function() {
                return Y.Test.Case.prototype.delay(200);
            });
        },

        getSurfaceContent: function(surfaceId) {
            switch (surfaceId) {
                case 'header':
                    return 'delayed';
                case 'body':
                    return 'delayed';
            }
        }
    }, {
        ATTRS: {
            title: {
                value: 'delayed'
            }
        }
    });

    Y.LockedScreen = Y.Base.create('lockedScreen', Y.Screen, [], {
        beforeDeactivate: function() {
            return Y.LockedScreen.locked;
        }
    }, {
        locked: true
    });

    Y.LazySurfaceScreen = Y.Base.create('lazySurfaceScreen', Y.Screen, [], {
        getSurfaceContent: function(surfaceId) {
            switch (surfaceId) {
                case 'lazy':
                    return 'lazy';
            }
        }
    }, {});

    Y.HTML404Screen = Y.Base.create('html404Screen', Y.HTMLScreen, [], {}, {
        ATTRS: {
            urlParams: {
                value: {
                    404: 1
                }
            }
        }
    });
}, '', {
    requires: ['base-build', 'aui-surface-app', 'aui-surface-base', 'aui-surface-screen', 'aui-surface-screen-html',
        'aui-surface-screen-route']
});
