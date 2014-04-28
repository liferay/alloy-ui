YUI.add('aui-widget-cssclass-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-widget-cssclass');

    suite.add(new Y.Test.Case({
        name: 'AUI WidgetCssClass Tests',

        init: function() {
            this.MyWidgetWithCssClass = Y.Base.create('my-widget-with-cssclass', Y.Widget, [Y.WidgetCssClass]);
        },

        'should set the bounding box\'s css class': function() {
            var cssClass = 'my-class',
                widgetInstance = new this.MyWidgetWithCssClass({
                    cssClass: cssClass
                }).render();

            Y.Assert.isTrue(
                widgetInstance.get('boundingBox').hasClass(cssClass),
                'The widget\'s bounding box should have the specified css class'
            );
            Y.Assert.isTrue(
                widgetInstance.get('contentBox').hasClass(cssClass + Y.WidgetCssClass.CSS_CLASS_CONTENT_SUFFIX),
                'The widget\'s content box should have the specified css class'
            );
        },

        'should set the widget\'s css class dynamically': function() {
            var cssClass = 'my-class',
                cssClass2 = 'my-class-2',
                widgetInstance = new this.MyWidgetWithCssClass().render();

            widgetInstance.set('cssClass', cssClass);
            Y.Assert.isTrue(
                widgetInstance.get('boundingBox').hasClass(cssClass),
                'The widget\'s bounding box should have the specified css class'
            );
            Y.Assert.isTrue(
                widgetInstance.get('contentBox').hasClass(cssClass + Y.WidgetCssClass.CSS_CLASS_CONTENT_SUFFIX),
                'The widget\'s content box should have the specified css class'
            );

            widgetInstance.set('cssClass', cssClass2);
            Y.Assert.isFalse(
                widgetInstance.get('boundingBox').hasClass(cssClass),
                'The widget\'s bounding box should not have the previous css class'
            );
            Y.Assert.isFalse(
                widgetInstance.get('contentBox').hasClass(cssClass + Y.WidgetCssClass.CSS_CLASS_CONTENT_SUFFIX),
                'The widget\'s content box should not have the previous css class'
            );
            Y.Assert.isTrue(
                widgetInstance.get('boundingBox').hasClass(cssClass2),
                'The widget\'s bounding box should have the new css class'
            );
            Y.Assert.isTrue(
                widgetInstance.get('contentBox').hasClass(cssClass2 + Y.WidgetCssClass.CSS_CLASS_CONTENT_SUFFIX),
                'The widget\'s content box should have the new css class'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-widget-cssclass', 'base-build', 'test', 'widget']
});
