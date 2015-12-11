YUI.add('aui-widget-transition-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-widget-transition'),
        WidgetTransition = Y.Base.create('widgetTransition', Y.Widget, [Y.WidgetTransition]);

    suite.add(new Y.Test.Case({
        name: 'AUI WidgetTransition Tests',

        'should not animate when rendered if "animated" is not set to true': function() {
            var widgetInstance = new WidgetTransition().render();
            Y.Mock.expect(widgetInstance.get('boundingBox'), {
                callCount: 0,
                method: 'transition'
            });

            this.wait(function() {
              Y.Mock.verify(widgetInstance.get('boundingBox'));
            }, 100);
        },

        'should animate when rendered if "animated" is set to true': function() {
            var widgetInstance = new WidgetTransition({
              animated: true
            }).render();
            Y.Mock.expect(widgetInstance.get('boundingBox'), {
                callCount: 1,
                method: 'transition',
                args: [Y.Mock.Value.Object, Y.Mock.Value.Function]
            });

            this.wait(function() {
              Y.Mock.verify(widgetInstance.get('boundingBox'));
            }, 100);
        },

        'should not animate when widget is hidden if "animated" is not set to true': function() {
            var widgetInstance = new WidgetTransition().render();

            this.wait(function() {
              Y.Mock.expect(widgetInstance.get('boundingBox'), {
                  callCount: 0,
                  method: 'transition',
                  args: [Y.Mock.Value.Object, Y.Mock.Value.Function]
              });

              widgetInstance.set('visible', false);
              this.wait(function() {
                Y.Mock.verify(widgetInstance.get('boundingBox'));
              }, 100);
            }, 100);
        },

        'should animate when widget is hidden if "animated" is set to true': function() {
            var widgetInstance = new WidgetTransition({
              animated: true
            }).render();

            this.wait(function() {
              Y.Mock.expect(widgetInstance.get('boundingBox'), {
                  callCount: 1,
                  method: 'transition',
                  args: [Y.Mock.Value.Object, Y.Mock.Value.Function]
              });

              widgetInstance.set('visible', false);
              this.wait(function() {
                Y.Mock.verify(widgetInstance.get('boundingBox'));
              }, 100);
            }, 100);
        },

        'should animate when widget is hidden if "animated" is set to true after widget is rendered': function() {
            var widgetInstance = new WidgetTransition().render();
            Y.Mock.expect(widgetInstance.get('boundingBox'), {
                callCount: 1,
                method: 'transition',
                args: [Y.Mock.Value.Object, Y.Mock.Value.Function]
            });

            widgetInstance.set('animated', true);
            widgetInstance.set('visible', false);
            this.wait(function() {
              Y.Mock.verify(widgetInstance.get('boundingBox'));
            }, 100);
        },

        'should wait the specified "delay" before animating widget': function() {
            var widgetInstance = new WidgetTransition({
              animated: true,
              delay: 100
            }).render();

            Y.Mock.expect(widgetInstance.get('boundingBox'), {
                callCount: 0,
                method: 'transition'
            });
            this.wait(function() {
              Y.Mock.verify(widgetInstance.get('boundingBox'));
              Y.Mock.expect(widgetInstance.get('boundingBox'), {
                  callCount: 1,
                  method: 'transition',
                  args: [Y.Mock.Value.Object, Y.Mock.Value.Function]
              });
              this.wait(function() {
                  Y.Mock.verify(widgetInstance.get('boundingBox'));
              }, 100);
            }, 50);
        },

        'should use the most recently set "delay" value when animating the widget': function() {
            var widgetInstance = new WidgetTransition({
              animated: true,
              delay: 100
            });
            widgetInstance.set('delay', 200);
            widgetInstance.render();

            Y.Mock.expect(widgetInstance.get('boundingBox'), {
                callCount: 0,
                method: 'transition'
            });
            this.wait(function() {
              Y.Mock.verify(widgetInstance.get('boundingBox'));
              Y.Mock.expect(widgetInstance.get('boundingBox'), {
                  callCount: 1,
                  method: 'transition',
                  args: [Y.Mock.Value.Object, Y.Mock.Value.Function]
              });
              this.wait(function() {
                  Y.Mock.verify(widgetInstance.get('boundingBox'));
              }, 100);
            }, 150);
        },

        'should not override delay value when stickDuration is not set': function() {
            var widgetInstance = new WidgetTransition({
              delay: 100
            });
            Y.Assert.areEqual(100, widgetInstance.get('delay').show);
            Y.Assert.areEqual(100, widgetInstance.get('delay').hide);
        },

        'should override delay value when stickDuration is set': function() {
            var widgetInstance = new WidgetTransition({
              delay: 100,
              stickDuration: 0
            });
            Y.Assert.areEqual(100, widgetInstance.get('delay').show);
            Y.Assert.areEqual(0, widgetInstance.get('delay').hide);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-widget-transition', 'base-build', 'test', 'widget']
});
