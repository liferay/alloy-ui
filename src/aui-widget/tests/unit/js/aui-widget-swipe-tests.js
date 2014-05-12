YUI.add('aui-widget-swipe-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-carousel-swipe');

    var TestWidget = Y.Base.create('test-widget', Y.Widget, [Y.WidgetSwipe], {
        WIDGET_INDEX_ATTRIBUTE: 'currentIndex',
        WIDGET_ITEM_SELECTOR: 'div'
    }, {
        ATTRS: {
            currentIndex: {
                value: 0
            }
        }
    });

    suite.add(new Y.Test.Case({
        name: 'AUI Carousel Swipe Unit Tests',

        init: function() {
            this._template = Y.one('#container');
            this._template.remove();
        },

        setUp: function() {
            Y.one('body').append(this._template.cloneNode(true));
        },

        tearDown: function() {
            if (this._widget) {
                this._widget.destroy();
            }
        },

        _renderWidget: function(config) {
            this._widget = new TestWidget(Y.merge({
                contentBox: '#container'
            }, config)).render();
        },

        'should enable the swipe functionality by default': function() {
            this._renderWidget();

            Y.Assert.isTrue(
                this._widget.get('boundingBox').hasClass('widget-swipe'),
                'The bounding box should have the swipe CSS class'
            );

            this._widget._scrollView.pages.set('index', 1);

            Y.Assert.areEqual(
                1,
                this._widget.get('currentIndex'),
                'The carousel\'s index should have been updated'
            );
        },

        'should scroll to element when widget index changes': function() {
            this._renderWidget();

            this._widget.set('currentIndex', 1);

            Y.Assert.areEqual(
                1,
                this._widget._scrollView.pages.get('index'),
                'The scroll view\'s index should have been updated'
            );
        },

        'should enable/disable swipe funcionality dynamically': function() {
            this._renderWidget();

            this._widget.set('swipe', false);

            Y.Assert.isFalse(
                this._widget.get('boundingBox').hasClass('widget-swipe'),
                'The bounding box should not have the swipe CSS class'
            );
            Y.Assert.isTrue(
                this._widget._scrollView.get('disabled'),
                'Scroll view should be disabled'
            );

            this._widget.set('swipe', true);

            Y.Assert.isTrue(
                this._widget.get('boundingBox').hasClass('widget-swipe'),
                'The bounding box should have the swipe CSS class'
            );
            Y.Assert.isFalse(
                this._widget._scrollView.get('disabled'),
                'Scroll view should not be disabled'
            );
        },

        'should only enable swipe funcionality when first visible': function() {
            this._renderWidget({
                visible: false,
                swipe: false
            });

            this._widget.set('swipe', true);

            Y.Assert.isUndefined(
                this._widget._scrollView,
                'Scroll view should not have been added while not visible'
            );

            this._widget.set('visible', true);

            Y.Assert.isNotUndefined(
                this._widget._scrollView,
                'Scroll view should have been added now that it\'s visible'
            );
        },

        'should stop updating scroll index when disabled': function() {
            this._renderWidget();

            this._widget.set('swipe', false);
            this._widget.set('visible', false);

            this._widget.set('currentIndex', 1);

            Y.Assert.areEqual(
                0,
                this._widget._scrollView.pages.get('index'),
                'Scroll index should not have been updated, since it\' disabled'
            );
        },

        'should be able to start the carousel without swipe': function() {
            this._renderWidget({
                swipe: false
            });

            Y.Assert.isFalse(
                this._widget.get('boundingBox').hasClass('widget-swipe'),
                'The bounding box should not have the swipe CSS class'
            );
            Y.Assert.isUndefined(
                this._widget._scrollView,
                'Scroll view should not be defined'
            );
        },

        'should only add scrollview when widget becomes visible': function() {
            this._renderWidget({
                visible: false
            });

            Y.Assert.isUndefined(
                this._widget._scrollView,
                'Scroll view should not be defined'
            );

            this._widget.set('visible', true);

            Y.Assert.isNotUndefined(
                this._widget._scrollView,
                'Scroll view should be defined'
            );
        },

        'should remove and add back swipe class on responsive event': function() {
            var instance = this,
                mock = new Y.Mock();

            this._renderWidget();

            Y.Mock.expect(mock, {
                args: [Y.Mock.Value.Object],
                callCount: 1,
                method: 'onResponsive',
                run: function() {
                    Y.Assert.isFalse(
                        instance._widget.get('boundingBox').hasClass('widget-swipe'),
                        'The bounding box should not have the swipe CSS now'
                    );
                }
            });
            this._widget.on('responsive', mock.onResponsive);

            Y.Mock.expect(mock, {
                args: [Y.Mock.Value.Object],
                callCount: 1,
                method: 'afterResponsive',
                run: function() {
                    Y.Assert.isTrue(
                        instance._widget.get('boundingBox').hasClass('widget-swipe'),
                        'The bounding box should have the swipe CSS class back'
                    );
                }
            });
            this._widget.after('responsive', mock.afterResponsive);

            this._widget.fire('responsive');
            Y.Mock.verify(mock);
        },

        'should not add back swipe class after responsive if swipe disabled': function() {
            var instance = this,
                mock = new Y.Mock();

            this._renderWidget({swipe: false});

            Y.Mock.expect(mock, {
                args: [Y.Mock.Value.Object],
                callCount: 1,
                method: 'afterResponsive',
                run: function() {
                    Y.Assert.isFalse(
                        instance._widget.get('boundingBox').hasClass('widget-swipe'),
                        'The bounding box should not have the swipe CSS class back'
                    );
                }
            });
            this._widget.after('responsive', mock.afterResponsive);

            this._widget.fire('responsive');
            Y.Mock.verify(mock);
        },

        'should update scroll position when becoming visible': function() {
            var boundingBox,
                newScrollX,
                previousScrollX,
                secondBox;

            this._renderWidget();

            boundingBox = this._widget.get('boundingBox');
            secondBox = boundingBox.all('.box').item(1);
            previousScrollX = secondBox.get('offsetLeft');
            this._widget.set('currentIndex', 1);

            Y.Assert.areEqual(
                previousScrollX,
                this._widget._scrollView.get('scrollX'),
                'Scroll X should be equal to the offsetLeft of the second item'
            );

            this._widget.set('visible', false);
            boundingBox.set('offsetWidth', boundingBox.get('offsetWidth') / 2);
            this._widget.set('visible', true);

            newScrollX = secondBox.get('offsetLeft');

            Y.Assert.isTrue(
                newScrollX < previousScrollX,
                'The offsetLeft should be smaller, like the bounding box'
            );
            Y.Assert.areEqual(
                newScrollX,
                this._widget._scrollView.get('scrollX'),
                'Scroll X should be equal to the offsetLeft of the second item'
            );
        },

        'should update scroll position on resize': function() {
            var instance = this,
                boundingBox,
                newScrollX,
                previousScrollX,
                secondBox;

            this._renderWidget();

            boundingBox = this._widget.get('boundingBox');
            secondBox = boundingBox.all('.box').item(1);
            previousScrollX = secondBox.get('offsetLeft');
            this._widget.set('currentIndex', 1);

            Y.Assert.areEqual(
                previousScrollX,
                this._widget._scrollView.get('scrollX'),
                'Scroll X should be equal to the offsetLeft of the second item'
            );

            // Now let's simulate a resize by changing the container's width
            // and triggering the resize event on the window.
            boundingBox.set('offsetWidth', boundingBox.get('offsetWidth') / 2);
            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                this._widget._syncScrollUI();
            }
            else {
                Y.one(Y.config.win).simulate('resize');
            }

            this.wait(function() {
                newScrollX = secondBox.get('offsetLeft');

                Y.Assert.isTrue(
                    newScrollX < previousScrollX,
                    'The offsetLeft should be smaller, like the bounding box'
                );
                Y.Assert.areEqual(
                    newScrollX,
                    instance._widget._scrollView.get('scrollX'),
                    'Scroll X should be equal to the offsetLeft of the second item'
                );
            }, Y.config.windowResizeDelay || 100);
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-carousel-swipe', 'node-base', 'node-event-simulate', 'test']
});
