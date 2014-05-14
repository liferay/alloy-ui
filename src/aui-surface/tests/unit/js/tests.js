YUI.add('aui-surface-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-surface');

    suite.add(new Y.Test.Case({
        name: 'Surface Tests',

        init: function() {
            this.regexRoute = /^\/regex\?foo=\d$/;
            this.currentPath = this.getCurrentPath();

            this.app = new Y.SurfaceApp({
                basePath: '/base',
                linkSelector: 'a'
            });

            this.app.addScreenRoutes([
                new Y.ScreenRoute({
                    path: '/page',
                    screen: Y.PageScreen
                }),
                {
                    path: '/locked',
                    screen: Y.LockedScreen
                },
                {
                    path: '/lazy',
                    screen: Y.LazySurfaceScreen
                },
                {
                    path: this.regexRoute,
                    screen: Y.RegexScreen
                },
                {
                    path: function(value) {
                        return value === '/delayed';
                    },
                    screen: Y.DelayedScreen
                },
                {
                    path: {
                        unknown: true
                    },
                    screen: Y.Screen
                }
            ]);

            this.app.addSurfaces([
                new Y.Surface({
                    id: 'header'
                }),
                'body',
                'unknown'
            ]);
        },

        destroy: function() {
            this.app = null;
            Y.config.win.history.pushState(null, '', this.currentPath);
        },

        'should match screen routes': function() {
            var route = null;

            route = this.app.matchesRoute('/base/unknown');
            Y.Assert.isNull(route);

            route = this.app.matchesRoute('/base/page');
            Y.Assert.isInstanceOf(Y.ScreenRoute, route);
            Y.Assert.areEqual('/page', route.get('path'));

            route = this.app.matchesRoute('/base/regex?foo=1');
            Y.Assert.isInstanceOf(Y.ScreenRoute, route);
            Y.Assert.areEqual(this.regexRoute, route.get('path'));
        },

        'should throw error when surface id is not found': function() {
            Y.Assert.throwsError(Error, function() {
                new Y.Surface({
                    id: ''
                });
            });
        },

        'should match surface elements': function() {
            Y.Assert.areEqual(Y.one('#body'), this.app.surfaces.body.getEl());
            Y.Assert.areEqual(Y.one('#header'), this.app.surfaces.header.getEl());
        },

        'should update surfaces and title using HTMLScreen': function() {
            var path = this.getBasePath() + 'content.txt';

            this.app.set('basePath', this.getBasePath());
            this.app.addScreenRoutes({
                path: 'content.txt',
                screen: Y.HTMLScreen
            });
            this.app.navigate(path);
            this.wait(function() {
                this.app.set('basePath', '/base');
                this.assertEqualCurrentPath(path);
                this.assertEqualSurfaceContent('body', 'body-html');
                this.assertEqualSurfaceContent('header', 'header-html');
                Y.Assert.areEqual('HTML', Y.config.doc.title);
            }, 100);
        },

        'should update surfaces using HTMLScreen': function() {
            var path = this.getBasePath() + 'notitle.txt';

            this.app.set('basePath', this.getBasePath());
            this.app.addScreenRoutes({
                path: 'notitle.txt',
                screen: Y.HTMLScreen
            });
            this.app.navigate(path);
            this.wait(function() {
                this.app.set('basePath', '/base');
                this.assertEqualCurrentPath(path);
                this.assertEqualSurfaceContent('body', 'body-html');
                this.assertEqualSurfaceContent('header', 'header-html');
            }, 100);
        },

        'should navigate fail using HTMLScreen': function() {
            var path = this.getBasePath() + 'notitle.txt',
                path404 = this.getBasePath() + '404.txt';

            this.app.set('basePath', this.getBasePath());
            this.app.addScreenRoutes({
                path: '404.txt',
                screen: Y.HTML404Screen
            });
            this.app.navigate(path404);
            this.wait(function() {
                this.app.set('basePath', '/base');
                this.assertEqualCurrentPath(path);
                this.assertEqualSurfaceContent('body', 'body-html');
                this.assertEqualSurfaceContent('header', 'header-html');
            }, 100);
        },

        'should lazily find surface element': function() {
            this.app.addSurfaces(
                new Y.Surface({
                    id: 'lazy'
                })
            );
            Y.Assert.isNull(this.app.surfaces.lazy.getEl());

            this.app.navigate('/base/lazy');

            setTimeout(function() {
                this.app.navigate('/base/page');
            }.bind(this), 10);

            setTimeout(function() {
                Y.one('body').append('<div id="lazy"/>');
                Y.Assert.isNotNull(this.app.surfaces.lazy.getEl());
                this.app.navigate('/base/lazy');
            }.bind(this), 20);

            this.wait(function() {
                this.assertEqualCurrentPath('/base/lazy');
                this.assertEqualSurfaceContent('lazy', 'lazy');
                this.assertEqualSurfaceContent('body', 'body-default');
                this.assertEqualSurfaceContent('header', 'header-default');
            }, 30);
        },

        'should navigate to /base/delayed asynchronously': function() {
            this.app.navigate('/base/delayed');

            // When navigate the url updates after navigation lifecycle
            setTimeout(function() {
                this.assertNotSameCurrentPath('/base/delayed');
            }.bind(this), 10);

            this.wait(function() {
                this.assertEqualCurrentPath('/base/delayed');
                this.assertEqualSurfaceContent('body', 'body-delayed');
                this.assertEqualSurfaceContent('header', 'header-delayed');
                Y.Assert.areEqual('Delayed', Y.config.doc.title);
            }, 60);
        },

        'should navigate to /base/page': function() {
            this.app.navigate('/base/page');
            this.wait(function() {
                this.assertEqualCurrentPath('/base/page');
                this.assertEqualSurfaceContent('body', 'body-page');
                this.assertEqualSurfaceContent('header', 'header-page');
                Y.Assert.areEqual('Page', Y.config.doc.title);
            }, 10);
        },

        'should navigate to /base/regex?foo=1': function() {
            this.app.navigate('/base/regex?foo=1');
            this.wait(function() {
                this.assertEqualCurrentPath('/base/regex?foo=1');
                this.assertEqualSurfaceContent('body', 'body-regex');
                this.assertEqualSurfaceContent('header', 'header-regex');
                Y.Assert.areEqual('Regex', Y.config.doc.title);
            }, 10);
        },

        'should navigate to previous page': function() {
            Y.config.win.history.back();
            this.wait(function() {
                this.assertEqualCurrentPath('/base/page');
                this.assertEqualSurfaceContent('body', 'body-page');
                this.assertEqualSurfaceContent('header', 'header-page');
                Y.Assert.areEqual('Page', Y.config.doc.title);
            }, 50);
        },

        'should navigate to previous /base/delayed asynchronously': function() {
            Y.config.win.history.back();

            // When popstate happens the url updates first than navigation lifecycle
            setTimeout(function() {
                this.assertEqualCurrentPath('/base/delayed');
            }.bind(this), 50);

            this.wait(function() {
                this.assertEqualCurrentPath('/base/delayed');
                this.assertEqualSurfaceContent('body', 'body-delayed');
                this.assertEqualSurfaceContent('header', 'header-delayed');
                Y.Assert.areEqual('Delayed', Y.config.doc.title);
            }, 100);
        },

        'should navigate to next page': function() {
            Y.config.win.history.forward();
            this.wait(function() {
                this.assertEqualCurrentPath('/base/page');
                this.assertEqualSurfaceContent('body', 'body-page');
                this.assertEqualSurfaceContent('header', 'header-page');
                Y.Assert.areEqual('Page', Y.config.doc.title);
            }, 50);
        },

        'should remember the scroll position': function() {
            var docScrollXAfterNavigate = 0,
                docScrollYAfterNavigate = 0;

            Y.config.win.scrollTo(200, 200);

            setTimeout(function() {
                this.app.navigate('/base/regex?foo=1');
            }.bind(this), 2000);

            setTimeout(function() {
                docScrollXAfterNavigate = Y.DOM.docScrollX();
                docScrollYAfterNavigate = Y.DOM.docScrollY();
                Y.config.win.history.back();
            }.bind(this), 4000);

            this.wait(function() {
                Y.Assert.areEqual(0, docScrollXAfterNavigate);
                Y.Assert.areEqual(0, docScrollYAfterNavigate);
                Y.Assert.areEqual(200, Y.DOM.docScrollY());
                Y.Assert.areEqual(200, Y.DOM.docScrollX());
            }, 4050);
        },

        'should cancel pending navigate': function() {
            this.app.navigate('/base/delayed');

            setTimeout(function() {
                this.app.navigate('/base/page');
            }.bind(this), 10);

            this.wait(function() {
                this.assertEqualCurrentPath('/base/page');
                this.assertEqualSurfaceContent('body', 'body-page');
                this.assertEqualSurfaceContent('header', 'header-page');
                Y.Assert.areEqual('Page', Y.config.doc.title);
            }, 20);
        },

        'should dispatch to the current url': function() {
            Y.config.win.history.pushState(null, '', '/base/regex?foo=1');

            setTimeout(function() {
                this.app.dispatch();
            }.bind(this), 25);

            this.wait(function() {
                this.assertEqualCurrentPath('/base/regex?foo=1');
                this.assertEqualSurfaceContent('body', 'body-regex');
                this.assertEqualSurfaceContent('header', 'header-regex');
                Y.Assert.areEqual('Regex', Y.config.doc.title);
            }, 35);
        },

        'should not handle history states that are not ours': function() {
            Y.config.win.history.pushState({}, '', '/unknown/state');

            setTimeout(function() {
                this.app.navigate('/base/page');
            }.bind(this), 25);

            setTimeout(function() {
                Y.config.win.history.back();
            }.bind(this), 50);

            this.wait(function() {
                this.assertEqualCurrentPath('/unknown/state');
                this.assertEqualSurfaceContent('body', 'body-page');
                this.assertEqualSurfaceContent('header', 'header-page');
                Y.Assert.areEqual('Page', Y.config.doc.title);
            }, 100);
        },

        'should navigate on link click': function() {
            Y.one('a[href="/base/regex?foo=1"]').simulate('click');
            this.wait(function() {
                this.assertEqualCurrentPath('/base/regex?foo=1');
                this.assertEqualSurfaceContent('body', 'body-regex');
                this.assertEqualSurfaceContent('header', 'header-regex');
                Y.Assert.areEqual('Regex', Y.config.doc.title);
            }, 10);
        },

        'should not navigate on offsite link click': function() {
            var external = Y.one('a[href="http://alloyui.com/external"]');

            external.on('click', function(event) {
                event.preventDefault();
            });

            external.simulate('click');

            this.wait(function() {
                this.assertEqualCurrentPath('/base/regex?foo=1');
                this.assertEqualSurfaceContent('body', 'body-regex');
                this.assertEqualSurfaceContent('header', 'header-regex');
                Y.Assert.areEqual('Regex', Y.config.doc.title);
            }, 10);
        },

        'should not navigate to unrouted link': function() {
            var external = Y.one('a[href="/base/unrouted"]');

            external.on('click', function(event) {
                event.preventDefault();
            });

            external.simulate('click');

            this.wait(function() {
                this.assertEqualCurrentPath('/base/regex?foo=1');
                this.assertEqualSurfaceContent('body', 'body-regex');
                this.assertEqualSurfaceContent('header', 'header-regex');
                Y.Assert.areEqual('Regex', Y.config.doc.title);
            }, 10);
        },

        'should not navigate to unrouted route': function() {
            Y.Assert.isFalse(this.app.navigate('/base/unrouted'));
            this.wait(function() {
                this.assertEqualCurrentPath('/base/regex?foo=1');
                this.assertEqualSurfaceContent('body', 'body-regex');
                this.assertEqualSurfaceContent('header', 'header-regex');
                Y.Assert.areEqual('Regex', Y.config.doc.title);
            }, 10);
        },

        'should not navigate to link outside base path': function() {
            this.app.navigate('/outside');
            this.wait(function() {
                this.assertEqualCurrentPath('/base/regex?foo=1');
                this.assertEqualSurfaceContent('body', 'body-regex');
                this.assertEqualSurfaceContent('header', 'header-regex');
                Y.Assert.areEqual('Regex', Y.config.doc.title);
            }, 10);
        },

        'should not navigate when navigation cancelled by active screen': function() {
            this.app.navigate('/base/locked');

            setTimeout(function() {
                this.app.navigate('/base/page');
            }.bind(this), 10);

            this.wait(function() {
                this.assertEqualCurrentPath('/base/locked');
                this.assertEqualSurfaceContent('body', 'body-default');
                this.assertEqualSurfaceContent('header', 'header-default');
            }, 20);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'tests-aui-surface-utils', 'dom-screen', 'node-event-simulate', 'aui-surface']
});
