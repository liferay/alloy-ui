YUI.add('aui-widget-toggle-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-widget-toggle'),
        WidgetToggle = Y.Base.create('widgetToggle', Y.Widget, [Y.WidgetToggle]);

    suite.add(new Y.Test.Case({
        name: 'AUI WidgetToggle Tests',

        setUp: function() {
            this._widgetToggle = new WidgetToggle().render();
        },

        'should set the `visible` attribute to the specified value': function() {
            Y.Assert.isTrue(this._widgetToggle.get('visible'), 'Widget should be visible initially');

            this._widgetToggle.toggle(true);
            Y.Assert.isTrue(this._widgetToggle.get('visible'), 'Widget should be visible');

            this._widgetToggle.toggle(false);
            Y.Assert.isFalse(this._widgetToggle.get('visible'), 'Widget should be hidden');

            this._widgetToggle.toggle(true);
            Y.Assert.isTrue(this._widgetToggle.get('visible'), 'Widget should be visible');
        },

        'should toggle the `visible` attribute if no boolean is passed': function() {
            Y.Assert.isTrue(this._widgetToggle.get('visible'));

            this._widgetToggle.toggle();
            Y.Assert.isFalse(
                this._widgetToggle.get('visible'),
                'Calling toggle() with no params should toggle the value of `visible` to false'
            );

            this._widgetToggle.toggle();
            Y.Assert.isTrue(
                this._widgetToggle.get('visible'),
                'Calling toggle() with no params should toggle the value of `visible` to true'
            );

            this._widgetToggle.toggle({});
            Y.Assert.isFalse(
                this._widgetToggle.get('visible'),
                'Passing a non boolean should just toggle the value again'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-widget-toggle', 'base-build', 'test', 'widget']
});
