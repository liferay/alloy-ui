YUI.add('aui-surface-tests', function(Y) {

    var noHTML5 = !(Y.config.win &&
        Y.config.win.history.pushState &&
        Y.config.win.history.replaceState &&
        ('onpopstate' in Y.config.win || Y.UA.gecko >= 2));

    var suite = new Y.Test.Suite('aui-surface');

    suite.add(new Y.Test.Case({
        name: 'Surface Tests',

        _should: {
            // Ignore all tests in browsers without HTML5 history support.
            ignore: {
                'should find screen route from path': noHTML5,
                'should throw error when surface is not found': noHTML5,
                'should match surface elements': noHTML5,
                'should lazily match surface element': noHTML5,
                'should navigate with screen lifecycle': noHTML5,
                'should navigate to hash clicked links': noHTML5,
                'should navigate asynchronously': noHTML5,
                'should dispatch to the current url': noHTML5,
                'should prevent navigate from startNavigate': noHTML5,
                'should not navigate to unrouted path': noHTML5,
                'should not navigate when prevented by active screen': noHTML5,
                'should cancel pending navigate': noHTML5,
                'should remember the scroll position': noHTML5 || Y.UA.ie,
                'should navigate when history buttons are clicked': noHTML5,
                'should not navigate to history states that are not ours': noHTML5,
                'should navigate fail using HTMLScreen': noHTML5,
                'should update surfaces and title using HTMLScreen': noHTML5,
                'should update surfaces using HTMLScreen': noHTML5,
                'should navigate to clicked links': noHTML5,
                'should not navigate to unrouted clicked links': noHTML5,
                'should not navigate to external clicked links': noHTML5,
                'should not navigate to clicked links outside base path': noHTML5,
                'should not navigate to hash clicked links in the same url': noHTML5,
                'should navigate to previous page asynchronously': noHTML5
            }
        },

        init: function() {
            var instance = this;

            instance.queryStringRoute = /^\/querystring\?p=\w+$/;
            instance.originalPath = instance.getCurrentPath();

            instance.app = new Y.SurfaceApp({
                basePath: '/base',
                defaultTitle: 'default',
                linkSelector: 'a'
            });

            instance.app.addScreenRoutes([
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
                    path: instance.queryStringRoute,
                    screen: Y.QueryStringScreen
                },
                {
                    path: function(value) {
                        return value === '/delayed200ms';
                    },
                    screen: Y.DelayedScreen
                },
                {
                    path: {
                        wrongtype: true
                    },
                    screen: Y.Screen
                }
            ]);

            instance.app.addSurfaces([
                new Y.Surface({
                    id: 'header'
                }),
                'body',
                'unknown'
            ]);
        },

        destroy: function() {
            this.app = null;
            Y.config.win.history.pushState(null, null, this.originalPath);
        },

        tearDown: function() {
            this.app.detachAll();
        },

        'should find screen route from path': function() {
            var route = null;

            route = this.app.matchesPath('/base/unknown');
            Y.Assert.isNull(route);

            route = this.app.matchesPath('/base/page');
            Y.Assert.isInstanceOf(Y.ScreenRoute, route);
            Y.Assert.areEqual('/page', route.get('path'));

            route = this.app.matchesPath('/base/querystring?p=1');
            Y.Assert.isInstanceOf(Y.ScreenRoute, route);
            Y.Assert.areEqual(this.queryStringRoute, route.get('path'));
        },

        'should throw error when surface is not found': function() {
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

        'should lazily match surface element': function() {
            var instance = this,
                lazySurface = new Y.Surface({
                    id: 'lazy'
                });

            instance.app.addSurfaces(lazySurface);
            Y.Assert.isNull(lazySurface.getEl());

            instance.app.navigate('/base/lazy').then(function() {
                instance.app.navigate('/base/page').then(function() {
                    Y.one('body').append('<div id="lazy"/>');
                    Y.Assert.isNotNull(lazySurface.getEl());
                    instance.app.navigate('/base/lazy').then(function() {
                        instance.resume(function() {
                            instance.assertPath('/base/lazy');
                            instance.assertSurfaceContent('lazy', 'lazy');
                            instance.assertSurfaceContent('body', 'default');
                            instance.assertSurfaceContent('header', 'default');
                        });
                    });
                });
            });
            instance.wait();
        },

        'should navigate with screen lifecycle': function() {
            var instance = this,
                activate1CalledAt = 0,
                activate2CalledAt = 0,
                deactivate1CalledAt = 0,
                destroy1CalledAt = 0,
                flip1CalledAt = 0,
                flip2CalledAt = 0,
                startNavigate = [],
                endNavigate = [],

                LifecycleScreen1 = Y.Base.create('lifecycleScreen1', Y.Screen, [], {
                    flip: function() {
                        flip1CalledAt = Date.now();
                        return LifecycleScreen1.superclass.flip.apply(this, arguments);
                    },
                    activate: function() {
                        activate1CalledAt = Date.now();
                    },
                    deactivate: function() {
                        deactivate1CalledAt = Date.now();
                    },
                    destroy: function() {
                        destroy1CalledAt = Date.now();
                    }
                }, {
                    ATTRS: {
                        cacheable: {
                            value: false
                        }
                    }
                }),

                LifecycleScreen2 = Y.Base.create('lifecycleScreen2', Y.Screen, [], {
                    flip: function() {
                        flip2CalledAt = Date.now();
                        return LifecycleScreen2.superclass.flip.apply(this, arguments);
                    },
                    activate: function() {
                        activate2CalledAt = Date.now();
                    }
                }, {});

            instance.app.addScreenRoutes([
                {
                    path: '/lifecycle1',
                    screen: LifecycleScreen1
                },
                {
                    path: '/lifecycle2',
                    screen: LifecycleScreen2
                }
            ]);

            instance.app.on({
                startNavigate: function(event) {
                    startNavigate.push(event.path);
                    startNavigate.push(event.replaceHistory);
                },
                endNavigate: function(event) {
                    endNavigate.push(event.path);
                    endNavigate.push(event.error);
                }
            });

            instance.app.navigate('/base/lifecycle1').then(function() {
                // Navigate to the same path to simulate a page refresh
                instance.app.navigate('/base/lifecycle1').then(function() {
                    instance.app.navigate('/base/lifecycle2', true).then(function() {
                        instance.resume(function() {
                            Y.Assert.isTrue(
                                (flip1CalledAt > 0) &&
                                (activate1CalledAt > 0) &&
                                (flip1CalledAt <= activate1CalledAt)
                            );

                            Y.Assert.isTrue(
                                (flip2CalledAt > 0) &&
                                (activate2CalledAt > 0) &&
                                (flip2CalledAt <= activate2CalledAt)
                            );

                            Y.Assert.isTrue(
                                (flip2CalledAt > 0) &&
                                (deactivate1CalledAt > 0) &&
                                (destroy1CalledAt > 0) &&
                                (activate2CalledAt > 0) &&
                                (deactivate1CalledAt <= flip2CalledAt) &&
                                (flip2CalledAt <= activate2CalledAt) &&
                                (activate2CalledAt <= destroy1CalledAt)
                            );
                            Y.ArrayAssert.itemsAreEqual(
                                [
                                    '/base/lifecycle1',
                                    false,
                                    '/base/lifecycle1',
                                    false,
                                    '/base/lifecycle2',
                                    true
                                ],
                                startNavigate
                            );
                            Y.ArrayAssert.itemsAreEqual(
                                [
                                    '/base/lifecycle1',
                                    undefined,
                                    '/base/lifecycle1',
                                    undefined,
                                    '/base/lifecycle2',
                                    undefined
                                ],
                                endNavigate
                            );
                        });
                    });
                });
            });
            instance.wait();
        },

        'should navigate to hash clicked links': function() {
            var instance = this;

            instance.app.navigate('/base/querystring?p=beforehash').then(function() {
                instance.app.navigate('/base/page#hash').then(function() {
                    instance.resume(function() {
                        instance.assertNavigation('/base/page#hash', 'page');
                    });
                });
            });
            instance.wait();
        },

        'should navigate asynchronously': function() {
            var instance = this,
                pathBeforeAsync;

            instance.app.navigate('/base/querystring?p=beforeasync').then(function() {
                instance.app.on('startNavigate', function() {
                    pathBeforeAsync = instance.getCurrentPath();
                });
                instance.app.navigate('/base/delayed200ms').then(function() {
                    instance.resume(function() {
                        Y.Assert.areEqual('/base/querystring?p=beforeasync', pathBeforeAsync);
                        instance.assertNavigation('/base/delayed200ms', 'delayed');
                    });
                });
            });
            instance.wait();
        },

        'should dispatch to the current url': function() {
            var instance = this;

            Y.config.win.history.pushState(null, '', '/base/querystring?p=dispatch');

            instance.app.dispatch().then(function() {
                instance.resume(function() {
                    instance.assertNavigation('/base/querystring?p=dispatch', 'querystring');
                });
            });
            instance.wait();
        },

        'should prevent navigate from startNavigate': function() {
            var instance = this,
                endNavigateCalled = false;

            instance.app.navigate('/base/querystring?p=beforeprevent').then(function() {
                instance.app.on({
                    startNavigate: function(event) {
                        event.halt();
                    },
                    endNavigate: function() {
                        endNavigateCalled = true;
                    }
                });
                instance.app.navigate('/base/querystring?p=prevent').
                then (undefined, function(err) {
                    instance.resume(function() {
                        instance.assertNavigation(
                            '/base/querystring?p=beforeprevent',
                            'querystring'
                        );
                        Y.Assert.isFalse(endNavigateCalled);
                        Y.Assert.isInstanceOf(Error, err);
                        Y.Assert.areEqual('Navigation has been prevented', err.message);
                    });
                });
            });
            instance.wait();
        },

        'should not navigate to unrouted path': function() {
            var instance = this,
                err1,
                startNavigateCalled = false,
                endNavigateCalled = false;

            instance.app.navigate('/base/querystring?p=beforeunrouted').then(function() {
                instance.app.on({
                    startNavigate: function() {
                        startNavigateCalled = true;
                    },
                    endNavigate: function(event) {
                        err1 = event.error;
                        endNavigateCalled = true;
                    }
                });
                instance.app.navigate('/base/unknown').thenCatch(function(err2) {
                    instance.resume(function() {
                        instance.assertNavigation(
                            '/base/querystring?p=beforeunrouted',
                            'querystring'
                        );
                        Y.Assert.isTrue(endNavigateCalled);
                        Y.Assert.isTrue(startNavigateCalled);
                        Y.Assert.isInstanceOf(Error, err1);
                        Y.Assert.areEqual('No screen for /base/unknown', err1.message);
                        Y.Assert.isInstanceOf(Error, err2);
                        Y.Assert.areEqual('No screen for /base/unknown', err2.message);
                    });
                });
            });
            instance.wait();
        },

        'should not navigate when prevented by active screen': function() {
            var instance = this,
                err1,
                startNavigateCalled = false,
                endNavigateCalled = false;

            instance.app.navigate('/base/locked').then(function() {
                instance.app.on({
                    startNavigate: function() {
                        startNavigateCalled = true;
                    },
                    endNavigate: function(event) {
                        err1 = event.error;
                        endNavigateCalled = true;
                    }
                });
                instance.app.navigate('/base/querystring?p=afterlocked').thenCatch(function(err2) {
                    instance.resume(function() {
                        Y.LockedScreen.locked = false;
                        instance.assertNavigation('/base/locked', 'default');
                        Y.Assert.isTrue(endNavigateCalled);
                        Y.Assert.isTrue(startNavigateCalled);
                        Y.Assert.isInstanceOf(Error, err1);
                        Y.Assert.areEqual('Cancelled by active screen', err1.message);
                        Y.Assert.isInstanceOf(Error, err2);
                        Y.Assert.areEqual('Cancelled by active screen', err2.message);
                    });
                });
            });
            instance.wait();
        },

        'should cancel pending navigate': function() {
            var instance = this,
                err = [],
                startNavigate = [],
                endNavigate = [];

            instance.app.on({
                startNavigate: function(event) {
                    startNavigate.push(event.path);
                },
                endNavigate: function(event) {
                    endNavigate.push(event.path);
                    err.push(event.error);
                }
            });

            instance.app.navigate('/base/delayed200ms').
            then (undefined, function(error) {
                err.push(error);
            });

            Y.soon(function() {
                instance.app.navigate('/base/querystring?p=cancelpending').then(function() {
                    instance.resume(function() {
                        instance.assertNavigation(
                            '/base/querystring?p=cancelpending',
                            'querystring'
                        );
                        Y.ArrayAssert.itemsAreEqual(
                            [
                                '/base/delayed200ms',
                                '/base/querystring?p=cancelpending'
                            ],
                            startNavigate
                        );
                        Y.ArrayAssert.itemsAreEqual(
                            [
                                '/base/delayed200ms',
                                '/base/querystring?p=cancelpending'
                            ],
                            endNavigate
                        );
                        Y.Assert.isUndefined(err[2]);
                        Y.Assert.isInstanceOf(Error, err[1]);
                        Y.Assert.areEqual('Cancel pending navigation', err[1].message);
                        Y.Assert.isInstanceOf(Error, err[0]);
                        Y.Assert.areEqual('Cancel pending navigation', err[0].message);
                    });
                });
            });

            instance.wait();
        },

        'should remember the scroll position': function() {
            var instance = this,
                pageXOffsetAfterNavigate = 0,
                pageYOffsetAfterNavigate = 0;

            instance.app.navigate('/base/querystring?p=scroll1').then(function() {
                Y.once('scroll', function() {
                    // History scrolling requires some time to persist the
                    // scroll position set by the back/forward button
                    setTimeout(function() {
                        instance.app.navigate('/base/querystring?p=scroll2').then(function() {
                            instance.app.once('endNavigate', function() {
                                instance.resume(function() {
                                    Y.Assert.areEqual(0, pageXOffsetAfterNavigate);
                                    Y.Assert.areEqual(0, pageYOffsetAfterNavigate);
                                    Y.Assert.areEqual(10, Y.config.win.pageXOffset);
                                    Y.Assert.areEqual(10, Y.config.win.pageYOffset);
                                });
                            });
                            // After the new navigation happens the scroll
                            // position goes back to 0,0 and also needs some
                            // time to persist before back/forward button is
                            // invoked
                            setTimeout(function() {
                                Y.config.win.history.back();
                            }, 200);
                        });
                    }, 1000);
                });
                pageXOffsetAfterNavigate = Y.config.win.pageXOffset;
                pageYOffsetAfterNavigate = Y.config.win.pageYOffset;
                Y.config.win.scrollTo(10, 10);
            });
            instance.wait();
        },

        'should navigate when history buttons are clicked': function() {
            var instance = this,
                history = [];

            instance.app.navigate('/base/querystring?p=pageback').then(function() {
                instance.app.navigate('/base/querystring?p=pageforward').then(function() {
                    instance.app.once('endNavigate', function(event) {
                        history.push(event.path);
                        instance.app.once('endNavigate', function(event) {
                            history.push(event.path);
                            instance.resume(function() {
                                instance.assertNavigation(
                                    '/base/querystring?p=pageforward',
                                    'querystring'
                                );
                                Y.ArrayAssert.itemsAreEqual(
                                    [
                                        '/base/querystring?p=pageback',
                                        '/base/querystring?p=pageforward'
                                    ],
                                    history
                                );
                            });
                        });
                        Y.config.win.history.forward();
                    });
                    Y.config.win.history.back();
                });
            });
            instance.wait();
        },

        'should not navigate to history states that are not ours': function() {
            var instance = this;

            Y.config.win.history.pushState({}, '', '/unknown/state');
            instance.app.navigate('/base/page').then(function() {
                setTimeout(function() {
                    instance.resume(function() {
                        instance.assertPath('/unknown/state');
                        instance.assertSurfaceContent('body', 'page');
                        instance.assertSurfaceContent('header', 'page');
                        Y.Assert.areEqual('page', Y.config.doc.title);
                    });
                }, 200);
                Y.config.win.history.back();
            });
            instance.wait();
        },

        'should navigate fail using HTMLScreen': function() {
            var instance = this,
                path404 = instance.getOriginalBasePath() + '/404.txt';

            instance.app.addScreenRoutes({
                path: '/404.txt',
                screen: Y.HTML404Screen
            });
            instance.app.navigate('/base/querystring?p=before404').then(function() {
                instance.app.set('basePath', instance.getOriginalBasePath());
                instance.app.navigate(path404).
                then (undefined, function() {
                    instance.resume(function() {
                        instance.assertNavigation(
                            '/base/querystring?p=before404',
                            'querystring'
                        );
                        instance.app.set('basePath', '/base');
                    });
                });
            });
            instance.wait();
        },

        'should update surfaces and title using HTMLScreen': function() {
            var instance = this,
                path = instance.getOriginalBasePath() + '/content.txt';

            instance.app.addScreenRoutes({
                path: '/content.txt',
                screen: Y.HTMLScreen
            });
            instance.app.set('basePath', instance.getOriginalBasePath());
            instance.app.navigate(path).then(function() {
                instance.resume(function() {
                    instance.assertNavigation(path, 'html');
                    instance.app.set('basePath', '/base');
                });
            });
            instance.wait();
        },

        'should update surfaces using HTMLScreen': function() {
            var instance = this,
                path = instance.getOriginalBasePath() + '/notitle.txt';

            instance.app.addScreenRoutes({
                path: '/notitle.txt',
                screen: Y.HTMLScreen
            });
            instance.app.navigate('/base/querystring?p=beforehtml').then(function() {
                instance.app.set('basePath', instance.getOriginalBasePath());
                instance.app.navigate(path).then(function() {
                    instance.resume(function() {
                        instance.assertPath(path);
                        instance.assertSurfaceContent('body', 'html');
                        instance.assertSurfaceContent('header', 'html');
                        Y.Assert.areEqual('default', Y.config.doc.title);
                        instance.app.set('basePath', '/base');
                    });
                });
            });

            instance.wait();
        },

        'should navigate to clicked links': function() {
            var instance = this;

            instance.app.on('endNavigate', function() {
                instance.resume(function() {
                    instance.assertNavigation('/base/page', 'page');
                });
            });
            Y.one('a[href="/base/page"]').simulate('click');
            instance.wait();
        },

        'should not navigate to unrouted clicked links': function() {
            Y.one('a[href="/base/unrouted"]').simulate('click');
            Y.Assert.isNull(this.app.pendingNavigate);
        },

        'should not navigate to external clicked links': function() {
            Y.one('a[href="http://alloyui.com/external"]').simulate('click');
            Y.Assert.isNull(this.app.pendingNavigate);
        },

        'should not navigate to clicked links outside base path': function() {
            Y.one('a[href="/outside"]').simulate('click');
            Y.Assert.isNull(this.app.pendingNavigate);
        },

        'should not navigate to hash clicked links in the same url': function() {
            Y.one('a[href="/base/page#hash"]').simulate('click');
            Y.Assert.isNull(this.app.pendingNavigate);
        },

        'should navigate to previous page asynchronously': function() {
            var instance = this,
                start = 0,
                end = 0;

            instance.app.navigate('/base/delayed200ms').then(function() {
                instance.app.navigate('/base/querystring?p=afterasync').then(function() {
                    instance.app.on('endNavigate', function() {
                        end = Date.now();
                        instance.resume(function() {
                            Y.Assert.isTrue((end - start) > 200);
                        });
                    });
                    start = Date.now();
                    Y.config.win.history.back();
                });
            });
            instance.wait();
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'tests-aui-surface-utils', 'node-event-simulate', 'aui-surface']
});
