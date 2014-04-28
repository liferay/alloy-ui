YUI.add('aui-carousel-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-carousel');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        init: function() {
            this.container = Y.one('#container');

            // Remove 'mouseenter' and 'mouseleave' from DOM_EVENTS so we
            // can simulate them in the test by just calling 'fire'.
            delete Y.Node.DOM_EVENTS.mouseenter;
            delete Y.Node.DOM_EVENTS.mouseleave;
        },

        setUp: function() {
            this.container.setHTML('<div id="content"><div></div><div></div><div></div></div>');

            this.carousel = new Y.Carousel({
                contentBox: '#content',
                intervalTime: 1,
                itemSelector: '> div'
            }).render();
        },

        tearDown: function() {
            this.carousel && this.carousel.destroy();
        },

        assertPaused: function(callback) {
            var instance = this,
                previousActiveIndex = this.carousel.get('activeIndex');

            this.wait(function() {
                Y.Assert.areEqual(
                    previousActiveIndex,
                    instance.carousel.get('activeIndex'),
                    'Carousel was paused, so activeIndex should not have been updated'
                );

                callback && callback();
            }, (this.carousel.get('animationTime') + this.carousel.get('intervalTime')) * 1000 + 100);
        },

        waitForNext: function(callback) {
            var instance = this;

            this.carousel.onceAfter('activeIndexChange', function() {
                instance.resume(function() {
                    callback && callback();
                });
            });
            this.wait();
        },

        'should play images in sequence': function() {
            var instance = this;

            Y.Assert.areEqual(0, this.carousel.get('activeIndex'), 'Initially, activeIndex should be 0');

            this.waitForNext(function() {
                Y.Assert.areEqual(
                    1,
                    instance.carousel.get('activeIndex'),
                    'Next activeIndex should be 1'
                );

                instance.waitForNext(function() {
                    Y.Assert.areEqual(
                        2,
                        instance.carousel.get('activeIndex'),
                        'Next activeIndex should be 2'
                    );

                    instance.waitForNext(function() {
                        Y.Assert.areEqual(
                            0,
                            instance.carousel.get('activeIndex'),
                            'Cycle is closed, activeIndex should be 0'
                        );
                    });
                });
            });
        },

        'should play/pause when user clicks the button': function() {
            var instance = this,
                pauseButton = this.carousel.get('contentBox').one('.carousel-menu-pause');

            pauseButton.simulate('click');

            this.assertPaused(function() {
                pauseButton.simulate('click');
                instance.waitForNext(function() {
                    Y.Assert.areEqual(
                        1,
                        instance.carousel.get('activeIndex'),
                        'Carousel was resumed, so activeIndex should have been updated to 1'
                    );
                });
            });
        },

        'should play/pause when functions are called': function() {
            var instance = this;

            this.carousel.pause();

            this.assertPaused(function() {
                instance.carousel.play();
                instance.waitForNext(function() {
                    Y.Assert.areEqual(
                        1,
                        instance.carousel.get('activeIndex'),
                        'Carousel was resumed, so activeIndex should have been updated to 1'
                    );
                });
            });
        },

        'should switch images when user clicks on next/previous buttons': function() {
            var nextButton = this.carousel.get('contentBox').one('.carousel-menu-next');
                prevButton = this.carousel.get('contentBox').one('.carousel-menu-prev');

            prevButton.simulate('click');
            Y.Assert.areEqual(
                2,
                this.carousel.get('activeIndex'),
                'Previous button was pressed, activeIndex should be 2'
            );

            prevButton.simulate('click');
            Y.Assert.areEqual(
                1,
                this.carousel.get('activeIndex'),
                'Previous button was pressed, activeIndex should be 1'
            );

            nextButton.simulate('click');
            Y.Assert.areEqual(
                2,
                this.carousel.get('activeIndex'),
                'Next button was pressed, activeIndex shoudl be 2'
            );

            nextButton.simulate('click');
            Y.Assert.areEqual(
                0,
                this.carousel.get('activeIndex'),
                'Next button was pressed, activeIndex shoudl be 0'
            );
        },

        'should switch images when next/prev functions are called': function() {
            this.carousel.prev();
            Y.Assert.areEqual(
                2,
                this.carousel.get('activeIndex'),
                'Previous function was called, activeIndex should be 2'
            );

            this.carousel.prev();
            Y.Assert.areEqual(
                1,
                this.carousel.get('activeIndex'),
                'Previous function was called, activeIndex should be 1'
            );

            this.carousel.next();
            Y.Assert.areEqual(
                2,
                this.carousel.get('activeIndex'),
                'Next function was called, activeIndex shoudl be 2'
            );

            this.carousel.next();
            Y.Assert.areEqual(
                0,
                this.carousel.get('activeIndex'),
                'Next function was called, activeIndex shoudl be 0'
            );
        },

        'should switch images when user clicks on item buttons': function() {
            var itemButtons = this.carousel.get('contentBox').all('.carousel-menu-index');

            itemButtons.item(2).simulate('click');
            Y.Assert.areEqual(
                2,
                this.carousel.get('activeIndex'),
                'Second item button was clicked, activeIndex should be 2'
            );

            itemButtons.item(0).simulate('click');
            Y.Assert.areEqual(
                0,
                this.carousel.get('activeIndex'),
                'First item button was clicked, activeIndex should be 0'
            );

            itemButtons.item(1).simulate('click');
            Y.Assert.areEqual(
                1,
                this.carousel.get('activeIndex'),
                'First item button was clicked, activeIndex should be 1'
            );
        },

        'should switch images when item function is called': function() {
            this.carousel.item(2);
            Y.Assert.areEqual(
                2,
                this.carousel.get('activeIndex'),
                'Item function was called, activeIndex should be 2'
            );

            this.carousel.item(0);
            Y.Assert.areEqual(
                0,
                this.carousel.get('activeIndex'),
                'Item function was called, activeIndex should be 0'
            );

            this.carousel.item(1);
            Y.Assert.areEqual(
                1,
                this.carousel.get('activeIndex'),
                'Item function was called, activeIndex should be 1'
            );
        },

        'should pause on hover': function() {
            var boundingBox = this.carousel.get('boundingBox');

            boundingBox.fire('mouseenter');
            Y.Assert.isTrue(this.carousel.get('playing'), 'Should not pause, since pauseOnHover is false');

            this.carousel.set('pauseOnHover', true);

            boundingBox.fire('mouseenter');
            Y.Assert.isFalse(this.carousel.get('playing'), 'Should have paused on hover');

            boundingBox.fire('mouseleave');
            Y.Assert.isTrue(this.carousel.get('playing'), 'Should have resumed on mouse leave');

            this.carousel.set('pauseOnHover', false);

            boundingBox.fire('mouseenter');
            Y.Assert.isTrue(this.carousel.get('playing'), 'Should not pause, since pauseOnHover is false');
        },

        'should set activeIndex to random number': function() {
            var mock = new Y.Mock(),
                oldRandom = Math.random,
                value = 0.4;

            // Switch Math.random with a mock during this test so we can check that it's
            // being called correctly.
            Y.Mock.expect(mock, {
                callCount: 1,
                method: 'fakeRandom',
                returns: value
            });
            Math.random = mock.fakeRandom;

            this.carousel.set('activeIndex', 'rand');
            Y.Assert.areEqual(
                1,
                this.carousel.get('activeIndex'),
                'activeIndex should be set to the return value of the random function'
            );

            Y.Mock.verify(mock);

            // Restore the original Math.random function as the test ends.
            Math.random = oldRandom;
        },

        'should be able to change animation time': function() {
            this.carousel.set('animationTime', 1);
            Y.Assert.areEqual(
                1,
                this.carousel.animation.get('duration'),
                'Animation duration should have been updated to the new value'
            );
        },

        'should switch the item selector': function() {
            var contentBox = this.carousel.get('contentBox');

            contentBox.setHTML('<span></span><span></span>');
            this.carousel.set('itemSelector', '> span');

            this.carousel.next();
            Y.Assert.areEqual(
                1,
                this.carousel.get('activeIndex'),
                'The second item should have been selected'
            );
            this.carousel.next();
            Y.Assert.areEqual(
                0,
                this.carousel.get('activeIndex'),
                'There are only 2 items now, so the next item should be 0'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-carousel', 'node-base', 'node-event-simulate', 'test']
});
