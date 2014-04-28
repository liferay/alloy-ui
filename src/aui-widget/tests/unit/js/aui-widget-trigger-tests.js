YUI.add('aui-widget-trigger-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-widget-trigger');

    suite.add(new Y.Test.Case({
        name: 'AUI WidgetTrigger Tests',

        init: function() {
            this.MyWidgetWithTrigger = Y.Base.create(
                'my-widget-with-trigger',
                Y.Widget,
                [Y.WidgetToggle, Y.WidgetTrigger]
            );

            this.trigger = Y.one('#trigger');
            this.trigger2 = Y.one('#trigger2');

            this.eventHide = 'my-event-hide';
            this.eventShow = 'my-event-show';
            this.eventToggle = 'my-event-toggle';
        },

        tearDown: function() {
            this.widgetInstance && this.widgetInstance.destroy();
        },

        'should bind hide event': function() {
            this.widgetInstance = new this.MyWidgetWithTrigger({
                trigger: this.trigger,
                triggerHideEvent: this.eventHide,
            }).render();

            Y.Assert.isTrue(this.widgetInstance.get('visible'), 'Widget should be visible initially');

            this.trigger.fire(this.eventHide);
            Y.Assert.isFalse(this.widgetInstance.get('visible'), 'Widget should be hidden after hide event');
        },

        'should bind show event': function() {
            this.widgetInstance = new this.MyWidgetWithTrigger({
                trigger: this.trigger,
                triggerShowEvent: this.eventShow,
            }).render();

            this.widgetInstance.set('visible', false);

            this.trigger.fire(this.eventShow);
            Y.Assert.isTrue(this.widgetInstance.get('visible'), 'Widget should be visible after show event');
        },

        'should bind toggle event': function() {
            this.widgetInstance = new this.MyWidgetWithTrigger({
                trigger: this.trigger,
                triggerToggleEvent: this.eventToggle,
            }).render();

            Y.Assert.isTrue(this.widgetInstance.get('visible'), 'Widget should be visible initially');

            this.trigger.fire(this.eventToggle);
            Y.Assert.isFalse(
                this.widgetInstance.get('visible'),
                'Widget should be hidden after toggle event'
            );
        },

        'should switch triggers dynamically': function() {
            this.widgetInstance = new this.MyWidgetWithTrigger({
                trigger: this.trigger,
                triggerHideEvent: this.eventHide,
                triggerShowEvent: this.eventShow,
                triggerToggleEvent: this.eventToggle
            }).render();
            this.widgetInstance.set('trigger', this.trigger2);

            this.trigger.fire(this.eventHide);
            Y.Assert.isTrue(
                this.widgetInstance.get('visible'),
                'Widget should not become hidden after hide event on previous trigger'
            );

            this.trigger2.fire(this.eventHide);
            Y.Assert.isFalse(
                this.widgetInstance.get('visible'),
                'Widget should be hidden after hide event'
            );

            this.trigger2.fire(this.eventShow);
            Y.Assert.isTrue(this.widgetInstance.get('visible'), 'Widget should be visible after show event');

            this.trigger2.fire(this.eventToggle);
            Y.Assert.isFalse(this.widgetInstance.get('visible'),
                'Widget should be hidden after toggle event');
        },

        'should ignore events if bindDOMEvents is false': function() {
            this.widgetInstance = new this.MyWidgetWithTrigger({
                bindDOMEvents: false,
                trigger: this.trigger,
                triggerHideEvent: this.eventHide,
                triggerShowEvent: this.eventShow,
                triggerToggleEvent: this.eventToggle
            }).render();

            this.trigger.fire(this.eventHide);
            Y.Assert.isTrue(
                this.widgetInstance.get('visible'),
                'Widget should not become hidden after hide event when bindDOMEvents is false'
            );

            this.widgetInstance.set('visible', false);
            this.trigger.fire(this.eventShow);
            Y.Assert.isFalse(
                this.widgetInstance.get('visible'),
                'Widget should not become visible after show event when bindDOMEvents is false'
            );

            this.trigger.fire(this.eventToggle);
            Y.Assert.isFalse(
                this.widgetInstance.get('visible'),
                'Widget should not become visible after toggle event when bindDOMEvents is false'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-widget-trigger', 'aui-widget-toggle', 'base-build', 'node-base', 'test', 'widget']
});
