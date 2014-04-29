YUI.add('aui-widget-trigger-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-widget-trigger'),
        WidgetTriggerToggle = Y.Base.create(
            'widgetTriggerToggle',
            Y.Widget, [Y.WidgetToggle, Y.WidgetTrigger]
        );

    suite.add(new Y.Test.Case({
        name: 'AUI WidgetTrigger Tests',

        init: function() {
            this._trigger = Y.one('#trigger');
            this._trigger2 = Y.one('#trigger2');

            this._eventHide = 'event-hide';
            this._eventShow = 'event-show';
            this._eventToggle = 'event-toggle';
        },

        tearDown: function() {
            this._widgetTrigger && this._widgetTrigger.destroy();
        },

        'should bind hide event': function() {
            this._widgetTrigger = new WidgetTriggerToggle({
                trigger: this._trigger,
                triggerHideEvent: this._eventHide
            }).render();

            Y.Assert.isTrue(this._widgetTrigger.get('visible'), 'Widget should be visible initially');

            this._trigger.fire(this._eventHide);
            Y.Assert.isFalse(this._widgetTrigger.get('visible'), 'Widget should be hidden after hide event');
        },

        'should bind show event': function() {
            this._widgetTrigger = new WidgetTriggerToggle({
                trigger: this._trigger,
                triggerShowEvent: this._eventShow
            }).render();

            this._widgetTrigger.set('visible', false);

            this._trigger.fire(this._eventShow);
            Y.Assert.isTrue(this._widgetTrigger.get('visible'), 'Widget should be visible after show event');
        },

        'should bind toggle event': function() {
            this._widgetTrigger = new WidgetTriggerToggle({
                trigger: this._trigger,
                triggerToggleEvent: this._eventToggle
            }).render();

            Y.Assert.isTrue(this._widgetTrigger.get('visible'), 'Widget should be visible initially');

            this._trigger.fire(this._eventToggle);
            Y.Assert.isFalse(
                this._widgetTrigger.get('visible'),
                'Widget should be hidden after toggle event'
            );
        },

        'should switch triggers dynamically': function() {
            this._widgetTrigger = new WidgetTriggerToggle({
                trigger: this._trigger,
                triggerHideEvent: this._eventHide,
                triggerShowEvent: this._eventShow,
                triggerToggleEvent: this._eventToggle
            }).render();

            this._widgetTrigger.set('trigger', this._trigger2);

            this._trigger.fire(this._eventHide);
            Y.Assert.isTrue(
                this._widgetTrigger.get('visible'),
                'Widget should not become hidden after hide event on previous trigger'
            );

            this._trigger2.fire(this._eventHide);
            Y.Assert.isFalse(
                this._widgetTrigger.get('visible'),
                'Widget should be hidden after hide event'
            );

            this._trigger2.fire(this._eventShow);
            Y.Assert.isTrue(this._widgetTrigger.get('visible'), 'Widget should be visible after show event');

            this._trigger2.fire(this._eventToggle);
            Y.Assert.isFalse(this._widgetTrigger.get('visible'),
                'Widget should be hidden after toggle event');
        },

        'should ignore events if bindDOMEvents is false': function() {
            this._widgetTrigger = new WidgetTriggerToggle({
                bindDOMEvents: false,
                trigger: this._trigger,
                triggerHideEvent: this._eventHide,
                triggerShowEvent: this._eventShow,
                triggerToggleEvent: this._eventToggle
            }).render();

            this._trigger.fire(this._eventHide);
            Y.Assert.isTrue(
                this._widgetTrigger.get('visible'),
                'Widget should not become hidden after hide event when bindDOMEvents is false'
            );

            this._widgetTrigger.set('visible', false);
            this._trigger.fire(this._eventShow);
            Y.Assert.isFalse(
                this._widgetTrigger.get('visible'),
                'Widget should not become visible after show event when bindDOMEvents is false'
            );

            this._trigger.fire(this._eventToggle);
            Y.Assert.isFalse(
                this._widgetTrigger.get('visible'),
                'Widget should not become visible after toggle event when bindDOMEvents is false'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-widget-trigger', 'aui-widget-toggle', 'base-build', 'node-base', 'test', 'widget']
});
