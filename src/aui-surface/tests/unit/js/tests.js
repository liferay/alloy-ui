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
                'should cancel pending navigate': noHTML5,
                'should dispatch to the current url': noHTML5,
                'should lazily match surface element': noHTML5,
                'should match screen routes': noHTML5,
                'should match surface elements': noHTML5,
                'should navigate fail using HTMLScreen': noHTML5,
                'should navigate to /base/delayed asynchronously': noHTML5,
                'should navigate to /base/page': noHTML5,
                'should navigate to next page': noHTML5,
                'should navigate to path with querystring': noHTML5,
                'should navigate to previous page asynchronously': noHTML5,
                'should navigate to previous page': noHTML5,
                'should navigate to routed link': noHTML5,
                'should navigate with events': noHTML5,
                'should navigate with screen lifecycle': noHTML5,
                'should not navigate to history states that are not ours': noHTML5,
                'should not navigate to offsite link': noHTML5,
                'should not navigate to outside base path link': noHTML5,
                'should not navigate to unrouted link': noHTML5,
                'should not navigate to unrouted route': noHTML5,
                'should not navigate when navigation cancelled by active screen': noHTML5,
                'should not navigate when navigation is prevented': noHTML5,
                'should remember the scroll position': noHTML5 || Y.UA.ie,
                'should simulate a refresh when navigate to the same destination': noHTML5,
                'should throw error when surface id is not found': noHTML5,
                'should update surfaces and title using HTMLScreen': noHTML5,
                'should update surfaces using HTMLScreen': noHTML5
            }
        },

        init: function() {
            var instance = this;

            instance.regexRoute = /^\/regex\?foo=\w+$/;
            instance.originalPath = instance.getCurrentPath();

            instance.app = new Y.SurfaceApp({
                basePath: '/base',
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
                    path: instance.regexRoute,
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
            Y.config.win.history.pushState(null, '', this.originalPath);
        },

        tearDown: function() {
            this.app.detachAll();
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
                    Y.Assert.isNotNull(instance.app.surfaces.lazy.getEl());
                    instance.app.navigate('/base/lazy').then(function() {
                        instance.resume(function() {
                            instance.assertEqualCurrentPath('/base/lazy');
                            instance.assertEqualSurfaceContent('lazy', 'lazy');
                            instance.assertEqualSurfaceContent('body', 'body-default');
                            instance.assertEqualSurfaceContent('header', 'header-default');
                        });
                    });
                });
            });
            instance.wait();
        },

        'should simulate a refresh when navigate to the same destination': function() {
            var instance = this,
                shouldNotCallStartEvent = false,
                shouldNotCallFailEvent = false,
                shouldNotCallSuccessEvent = false,
                shouldNotCallEndEvent = false;

            instance.app.on('endNavigate', function() {
                instance.app.on({
                    startNavigate: function() {
                        shouldNotCallStartEvent = true;
                    },
                    failNavigate: function() {
                        shouldNotCallStartEvent = true;
                    },
                    successNavigate: function() {
                        shouldNotCallSuccessEvent = true;
                    },
                    endNavigate: function() {
                        shouldNotCallEndEvent = true;
                    }
                });
                instance.app.navigate('/base/page').then(function() {
                    instance.resume(function() {
                        Y.Assert.isFalse(shouldNotCallStartEvent);
                        Y.Assert.isFalse(shouldNotCallFailEvent);
                        Y.Assert.isFalse(shouldNotCallSuccessEvent);
                        Y.Assert.isFalse(shouldNotCallEndEvent);
                    });
                });
            });
            Y.one('a[href="/base/page"]').simulate('click');
            instance.wait();
        },

        'should navigate to routed link': function() {
            var instance = this;

            instance.app.on('endNavigate', function() {
                instance.resume(function() {
                    instance.assertEqualCurrentPath('/base/regex?foo=1');
                    instance.assertEqualSurfaceContent('body', 'body-regex');
                    instance.assertEqualSurfaceContent('header', 'header-regex');
                    Y.Assert.areEqual('Regex', Y.config.doc.title);
                });
            });
            Y.one('a[href="/base/regex?foo=1"]').simulate('click');
            instance.wait();
        },

        'should not navigate to offsite link': function() {
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
            }, 50);
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
            }, 50);
        },

        'should not navigate to outside base path link': function() {
            var external = Y.one('a[href="/outside"]');

            external.on('click', function(event) {
                event.preventDefault();
            });
            external.simulate('click');
            this.wait(function() {
                this.assertEqualCurrentPath('/base/regex?foo=1');
                this.assertEqualSurfaceContent('body', 'body-regex');
                this.assertEqualSurfaceContent('header', 'header-regex');
                Y.Assert.areEqual('Regex', Y.config.doc.title);
            }, 50);
        },

        'should cancel pending navigate': function() {
            var instance = this,
                shouldNotChangePath = false,
                shouldFailDelayedNavigate = false;

            instance.app.navigate('/base/delayed').thenCatch(function() {
                shouldFailDelayedNavigate = true;
                shouldNotChangePath = (instance.getCurrentPath() === '/base/regex?foo=1');
            });
            setTimeout(function() {
                instance.app.navigate('/base/regex?foo=80').then(function() {
                    instance.resume(function() {
                        Y.Assert.isTrue(shouldFailDelayedNavigate);
                        Y.Assert.isTrue(shouldNotChangePath);
                        instance.assertEqualCurrentPath('/base/regex?foo=80');
                        instance.assertEqualSurfaceContent('body', 'body-regex');
                        instance.assertEqualSurfaceContent('header', 'header-regex');
                        Y.Assert.areEqual('Regex', Y.config.doc.title);
                    });
                });
                instance.app.navigate('/base/regex?foo=80');
            }, 10);
            instance.wait();
        },

        'should navigate with events': function() {
            var instance = this,
                startCalledAt = 0,
                successCalledAt = 0,
                endCalledAt = 0,
                startEvent = null,
                successEvent = null;

            instance.app.on({
                startNavigate: function(event) {
                    startEvent = event;
                    startCalledAt = Date.now();
                },
                successNavigate: function(event) {
                    successEvent = event;
                    successCalledAt = Date.now();
                },
                endNavigate: function(event) {
                    endCalledAt = Date.now();
                    instance.resume(function() {
                        Y.Assert.isTrue(
                            (startCalledAt > 0) &&
                            (successCalledAt > 0) &&
                            (endCalledAt > 0) &&
                            (startCalledAt <= successCalledAt) &&
                            (successCalledAt <= endCalledAt)
                        );
                        Y.ObjectAssert.ownsKey('path', event);
                        Y.ObjectAssert.ownsKey('path', startEvent);
                        Y.ObjectAssert.ownsKey('path', successEvent);
                        Y.ObjectAssert.ownsKey('replaceHistory', startEvent);
                        Y.ObjectAssert.ownsKey('route', startEvent);
                    });
                }
            });
            instance.app.navigate('/base/regex?foo=events');
            instance.wait();
        },

        'should navigate with screen lifecycle': function() {
            var instance = this,
                beforeFlip1CalledAt = 0,
                beforeFlip2CalledAt = 0,
                afterFlip2CalledAt = 0,
                afterFlip1CalledAt = 0,
                deactivate1CalledAt = 0,
                LifecycleScreen1 = Y.Base.create('lifecycleScreen1', Y.Screen, [], {
                    beforeFlip: function() {
                        beforeFlip1CalledAt = Date.now();
                    },
                    afterFlip: function() {
                        afterFlip1CalledAt = Date.now();
                    },
                    deactivate: function() {
                        deactivate1CalledAt = Date.now();
                    }
                }, {}),
                LifecycleScreen2 = Y.Base.create('lifecycleScreen2', Y.Screen, [], {
                    beforeFlip: function() {
                        beforeFlip2CalledAt = Date.now();
                    },
                    afterFlip: function() {
                        afterFlip2CalledAt = Date.now();
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

            instance.app.navigate('/base/lifecycle1').then(function() {
                instance.app.navigate('/base/lifecycle2').then(function() {
                    instance.resume(function() {
                        Y.Assert.isTrue(
                            (beforeFlip1CalledAt > 0) &&
                            (afterFlip1CalledAt > 0) &&
                            (beforeFlip1CalledAt <= afterFlip1CalledAt)
                        );

                        Y.Assert.isTrue(
                            (beforeFlip2CalledAt > 0) &&
                            (deactivate1CalledAt > 0) &&
                            (afterFlip2CalledAt > 0) &&
                            (beforeFlip2CalledAt <= deactivate1CalledAt) &&
                            (deactivate1CalledAt <= afterFlip2CalledAt)
                        );
                    });
                });
            });
            instance.wait();
        },

        'should navigate to /base/delayed asynchronously': function() {
            var instance = this,
                shouldNotChangePath = false;

            instance.app.navigate('/base/regex?foo=1').then(function() {
                instance.app.on('startNavigate', function() {
                    shouldNotChangePath = (instance.getCurrentPath() === '/base/regex?foo=1');
                });
                instance.app.navigate('/base/delayed').then(function() {
                    instance.resume(function() {
                        Y.Assert.isTrue(shouldNotChangePath);
                        instance.assertEqualCurrentPath('/base/delayed');
                        instance.assertEqualSurfaceContent('body', 'body-delayed');
                        instance.assertEqualSurfaceContent('header', 'header-delayed');
                        Y.Assert.areEqual('Delayed', Y.config.doc.title);
                    });
                });
            });
            instance.wait();
        },

        'should navigate to /base/page': function() {
            var instance = this;

            instance.app.navigate('/base/page').then(function() {
                instance.resume(function() {
                    instance.assertEqualCurrentPath('/base/page');
                    instance.assertEqualSurfaceContent('body', 'body-page');
                    instance.assertEqualSurfaceContent('header', 'header-page');
                    Y.Assert.areEqual('Page', Y.config.doc.title);
                });
            });
            instance.wait();
        },

        'should navigate to path with querystring': function() {
            var instance = this;

            instance.app.navigate('/base/regex?foo=1').then(function() {
                instance.resume(function() {
                    this.assertEqualCurrentPath('/base/regex?foo=1');
                    this.assertEqualSurfaceContent('body', 'body-regex');
                    this.assertEqualSurfaceContent('header', 'header-regex');
                    Y.Assert.areEqual('Regex', Y.config.doc.title);
                });
            });
            instance.wait();
        },

        'should navigate to previous page': function() {
            var instance = this;

            instance.app.navigate('/base/regex?foo=10').then(function() {
                instance.app.navigate('/base/regex?foo=20').then(function() {
                    instance.app.on('endNavigate', function() {
                        instance.resume(function() {
                            instance.assertEqualCurrentPath('/base/regex?foo=10');
                            instance.assertEqualSurfaceContent('body', 'body-regex');
                            instance.assertEqualSurfaceContent('header', 'header-regex');
                            Y.Assert.areEqual('Regex', Y.config.doc.title);
                        });
                    });
                    Y.config.win.history.back();
                });
            });
            instance.wait();
        },

        'should navigate to previous page asynchronously': function() {
            var instance = this,
                bodySurfaceContentAfterBack,
                currentPathAfterBack,
                headerSurfaceContentAfterBack,
                titleAfterBack;

            instance.app.navigate('/base/delayed').then(function() {
                instance.app.navigate('/base/regex?foo=30').then(function() {
                    instance.app.on('endNavigate', function() {
                        instance.resume(function() {
                            Y.Assert.areEqual('/base/delayed', currentPathAfterBack);
                            Y.Assert.areEqual('body-regex', bodySurfaceContentAfterBack);
                            Y.Assert.areEqual('header-regex', headerSurfaceContentAfterBack);
                            Y.Assert.areEqual('Regex', titleAfterBack);
                            instance.assertEqualCurrentPath('/base/delayed');
                            instance.assertEqualSurfaceContent('body', 'body-delayed');
                            instance.assertEqualSurfaceContent('header', 'header-delayed');
                            Y.Assert.areEqual('Delayed', Y.config.doc.title);
                        });
                    });

                    Y.config.win.history.back();

                    setTimeout(function() {
                        bodySurfaceContentAfterBack = instance.getSurfaceContent('body');
                        currentPathAfterBack = instance.getCurrentPath();
                        headerSurfaceContentAfterBack = instance.getSurfaceContent('header');
                        titleAfterBack = Y.config.doc.title;
                    }, 100);
                });
            });
            instance.wait();
        },

        'should navigate to next page': function() {
            var instance = this;

            instance.app.navigate('/base/regex?foo=40').then(function() {
                instance.app.navigate('/base/regex?foo=50').then(function() {
                    instance.app.on('endNavigate', function() {
                        instance.app.on('endNavigate', function() {
                            instance.resume(function() {
                                instance.assertEqualCurrentPath('/base/regex?foo=50');
                                instance.assertEqualSurfaceContent('body', 'body-regex');
                                instance.assertEqualSurfaceContent('header',
                                    'header-regex');
                                Y.Assert.areEqual('Regex', Y.config.doc.title);
                            });
                        });
                        Y.config.win.history.forward();
                    });
                    Y.config.win.history.back();
                });
            });
            instance.wait();
        },

        'should dispatch to the current url': function() {
            var instance = this;

            Y.config.win.history.pushState(null, '', '/base/regex?foo=1');

            instance.app.dispatch().then(function() {
                instance.resume(function() {
                    instance.assertEqualCurrentPath('/base/regex?foo=1');
                    instance.assertEqualSurfaceContent('body', 'body-regex');
                    instance.assertEqualSurfaceContent('header', 'header-regex');
                    Y.Assert.areEqual('Regex', Y.config.doc.title);
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
                        instance.assertEqualCurrentPath('/unknown/state');
                        instance.assertEqualSurfaceContent('body', 'body-page');
                        instance.assertEqualSurfaceContent('header', 'header-page');
                        Y.Assert.areEqual('Page', Y.config.doc.title);
                    });
                }, 100);
                Y.config.win.history.back();
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
                    instance.assertEqualCurrentPath(path);
                    instance.assertEqualSurfaceContent('body', 'body-html');
                    instance.assertEqualSurfaceContent('header', 'header-html');
                    Y.Assert.areEqual('HTML', Y.config.doc.title);
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
            instance.app.set('basePath', instance.getOriginalBasePath());
            instance.app.navigate(path).then(function() {
                instance.resume(function() {
                    instance.app.set('basePath', '/base');
                    instance.assertEqualCurrentPath(path);
                    instance.assertEqualSurfaceContent('body', 'body-html');
                    instance.assertEqualSurfaceContent('header', 'header-html');
                });
            });
            instance.wait();
        },

        'should navigate fail using HTMLScreen': function() {
            var instance = this,
                path = instance.getOriginalBasePath() + '/notitle.txt',
                path404 = instance.getOriginalBasePath() + '/404.txt';

            instance.app.addScreenRoutes({
                path: '/404.txt',
                screen: Y.HTML404Screen
            });
            instance.app.set('basePath', instance.getOriginalBasePath());
            instance.app.navigate(path404).thenCatch(function() {
                instance.resume(function() {
                    instance.assertEqualCurrentPath(path);
                    instance.assertEqualSurfaceContent('body', 'body-html');
                    instance.assertEqualSurfaceContent('header', 'header-html');
                    instance.app.set('basePath', '/base');
                });
            });
            instance.wait();
        },

        'should remember the scroll position': function() {
            var instance = this,
                pageXOffsetAfterNavigate = 0,
                pageYOffsetAfterNavigate = 0;

            instance.app.navigate('/base/regex?foo=60').then(function() {
                Y.once('scroll', function() {
                    // History scrolling requires some time to persist the
                    // scroll position set by the back/forward button
                    setTimeout(function() {
                        instance.app.navigate('/base/regex?foo=70').then(function() {
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
                            // time to persis before back/forward button is
                            // invoked
                            setTimeout(function() {
                                Y.config.win.history.back();
                            }, 100);
                        });
                    }, 1000);
                });
                pageXOffsetAfterNavigate = Y.config.win.pageXOffset;
                pageYOffsetAfterNavigate = Y.config.win.pageYOffset;
                Y.config.win.scrollTo(10, 10);
            });
            instance.wait();
        },

        'should not navigate when navigation is prevented': function() {
            var instance = this;

            instance.app.on({
                startNavigate: function(event) {
                    event.halt();
                }
            });
            instance.app.navigate('/base/regex?foo=80').thenCatch(function(err) {
                instance.resume(function() {
                    Y.Assert.isInstanceOf(Error, err);
                    Y.Assert.areEqual('Navigation has been prevented', err.message);
                });
            });
            instance.wait();
        },

        'should not navigate when navigation cancelled by active screen': function() {
            var instance = this,
                shouldNotCallStartEvent = false,
                shouldNotCallFailEvent = false,
                shouldNotCallSuccessEvent = false,
                shouldNotCallEndEvent = false;

            instance.app.navigate('/base/locked').then(function() {
                instance.app.on({
                    startNavigate: function() {
                        shouldNotCallStartEvent = true;
                    },
                    failNavigate: function() {
                        shouldNotCallStartEvent = true;
                    },
                    successNavigate: function() {
                        shouldNotCallSuccessEvent = true;
                    },
                    endNavigate: function() {
                        shouldNotCallEndEvent = true;
                    }
                });
                instance.app.navigate('/base/page').thenCatch(function(err) {
                    instance.resume(function() {
                        Y.Assert.isFalse(shouldNotCallStartEvent);
                        Y.Assert.isFalse(shouldNotCallFailEvent);
                        Y.Assert.isFalse(shouldNotCallSuccessEvent);
                        Y.Assert.isFalse(shouldNotCallEndEvent);
                        Y.Assert.isInstanceOf(Error, err);
                        Y.Assert.areEqual('Navigation cancelled by active screen', err.message);
                    });
                });
            });
            instance.wait();
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'tests-aui-surface-utils', 'node-event-simulate', 'aui-surface']
});
