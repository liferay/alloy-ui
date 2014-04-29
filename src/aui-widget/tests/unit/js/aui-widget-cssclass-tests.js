YUI.add('aui-widget-cssclass-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-widget-cssclass'),
        WidgetCSSClass = Y.Base.create('widgetCSSClass', Y.Widget, [Y.WidgetCssClass]);

    suite.add(new Y.Test.Case({
        name: 'AUI WidgetCSSClass Tests',

        'should set the bounding box\'s CSS class': function() {
            var cssClass = 'test-class',
                widgetInstance = new WidgetCSSClass({
                    cssClass: cssClass
                }).render();

            Y.Assert.isTrue(
                widgetInstance.get('boundingBox').hasClass(cssClass),
                'The widget\'s bounding box should have the specified CSS class'
            );

            Y.Assert.isTrue(
                widgetInstance.get('contentBox').hasClass(cssClass + Y.WidgetCssClass.CSS_CLASS_CONTENT_SUFFIX),
                'The widget\'s content box should have the specified CSS class'
            );
        },

        'should set the widget\'s CSS class dynamically': function() {
            var cssClass = 'test-class',
                cssClass2 = 'test-class-2',
                widgetInstance = new WidgetCSSClass().render();

            widgetInstance.set('cssClass', cssClass);
            Y.Assert.isTrue(
                widgetInstance.get('boundingBox').hasClass(cssClass),
                'The widget\'s bounding box should have the specified CSS class'
            );
            Y.Assert.isTrue(
                widgetInstance.get('contentBox').hasClass(cssClass + Y.WidgetCssClass.CSS_CLASS_CONTENT_SUFFIX),
                'The widget\'s content box should have the specified CSS class'
            );

            widgetInstance.set('cssClass', cssClass2);
            Y.Assert.isFalse(
                widgetInstance.get('boundingBox').hasClass(cssClass),
                'The widget\'s bounding box should not have the previous CSS class'
            );
            Y.Assert.isFalse(
                widgetInstance.get('contentBox').hasClass(cssClass + Y.WidgetCssClass.CSS_CLASS_CONTENT_SUFFIX),
                'The widget\'s content box should not have the previous CSS class'
            );
            Y.Assert.isTrue(
                widgetInstance.get('boundingBox').hasClass(cssClass2),
                'The widget\'s bounding box should have the new CSS class'
            );
            Y.Assert.isTrue(
                widgetInstance.get('contentBox').hasClass(cssClass2 + Y.WidgetCssClass.CSS_CLASS_CONTENT_SUFFIX),
                'The widget\'s content box should have the new CSS class'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-widget-cssclass', 'base-build', 'test', 'widget']
});
