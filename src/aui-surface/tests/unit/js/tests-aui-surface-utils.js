YUI.add('tests-aui-surface-utils', function(Y) {
    Y.mix(Y.Test.Case.prototype, {
        assertEqualCurrentPath: function(path) {
            Y.Assert.areEqual(path, this.getCurrentPath());
        },

        assertEqualSurfaceContent: function(surfaceId, content) {
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
            return Y.config.win.location.pathname + Y.config.win.location.search;
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
                    return 'header-page';
                case 'body':
                    return 'body-page';
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
                value: 'Page'
            }
        }
    });

    Y.RegexScreen = Y.Base.create('regexScreen', Y.Screen, [], {
        getSurfaceContent: function(surfaceId) {
            switch (surfaceId) {
                case 'header':
                    return 'header-regex';
                case 'body':
                    return 'body-regex';
            }
        }
    }, {
        ATTRS: {
            title: {
                value: 'Regex'
            }
        }
    });

    Y.DelayedScreen = Y.Base.create('delayedScreen', Y.Screen, [], {
        beforeFlip: function() {
            return Y.Test.Case.prototype.delay(200);
        },

        getSurfaceContent: function(surfaceId) {
            switch (surfaceId) {
                case 'header':
                    return 'header-delayed';
                case 'body':
                    return 'body-delayed';
            }
        }
    }, {
        ATTRS: {
            title: {
                value: 'Delayed'
            }
        }
    });

    Y.LockedScreen = Y.Base.create('lockedScreen', Y.Screen, [], {
        beforeDeactivate: function() {
            return true;
        }
    }, {});

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
