YUI.add('aui-widget-toggle-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-widget-toggle');

    suite.add(new Y.Test.Case({
        name: 'AUI WidgetToggle Tests',

        init: function() {
            this.MyWidgetWithToggle = Y.Base.create('my-widget-with-toggle', Y.Widget, [Y.WidgetToggle]);
        },

        setUp: function() {
            this.widgetInstance = new this.MyWidgetWithToggle();
            this.widgetInstance.render();
        },

        'should set the `visible` attribute to the specified value': function() {
            Y.Assert.isTrue(this.widgetInstance.get('visible'), 'Widget should be visible initially');

            this.widgetInstance.toggle(true);
            Y.Assert.isTrue(this.widgetInstance.get('visible'), 'Widget should be visible');

            this.widgetInstance.toggle(false);
            Y.Assert.isFalse(this.widgetInstance.get('visible'), 'Widget should be hidden');

            this.widgetInstance.toggle(true);
            Y.Assert.isTrue(this.widgetInstance.get('visible'), 'Widget should be visible');
        },

        'should toggle the `visible` attribute if no boolean is passed': function() {
            Y.Assert.isTrue(this.widgetInstance.get('visible'));

            this.widgetInstance.toggle();
            Y.Assert.isFalse(
                this.widgetInstance.get('visible'),
                'Calling toggle() with no params should toggle the value of `visible` to false'
            );

            this.widgetInstance.toggle();
            Y.Assert.isTrue(
                this.widgetInstance.get('visible'),
                'Calling toggle() with no params should toggle the value of `visible` to true'
            );

            this.widgetInstance.toggle({});
            Y.Assert.isFalse(
                this.widgetInstance.get('visible'),
                'Passing a non boolean should just toggle the value again'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-widget-toggle', 'base-build', 'test', 'widget']
});
