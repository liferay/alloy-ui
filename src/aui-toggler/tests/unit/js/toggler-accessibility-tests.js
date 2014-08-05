YUI.add('aui-toggler-accessibility-tests', function(Y) {

    //--------------------------------------------------------------------------
    // TogglerAccessibility Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-toggler-accessibility');

        togglerNode = Y.one('#toggler');

    suite.add(new Y.Test.Case({

        name: 'TogglerAccessibility',

        simulateToggleEvent: function() {
            togglerNode.simulate('keydown', { keyCode: 13 });
        },

        setUp: function() {
            this.toggler = new Y.Toggler({
                animated: false,
                content: '.content',
                header: '.btn',
                expanded: true,
                transition: {
                    duration: .6,
                    easing: 'cubic-bezier(0, 0.1, 0, 1.0)',
                    on: {
                        end: function() {
                        }
                    }
                }
            });
        },

        tearDown: function() {
            this.toggler.destroy();
        },

        'test toggler has correct aria attributes': function() {
            var instance = this,
                toggler = instance.toggler,
                header = toggler.get('header'),
                content = toggler.get('content');

            Y.Assert.isTrue(header.hasAttribute('aria-pressed'));
            Y.Assert.isTrue(header.hasAttribute('aria-controls'));
            Y.Assert.isTrue(content.hasAttribute('aria-hidden'));

            Y.Assert.isTrue(header.getAttribute('aria-pressed') === 'true');
            Y.Assert.isTrue(content.getAttribute('aria-hidden') === 'false');
            Y.Assert.areSame(content.guid(), header.getAttribute('aria-controls'));

            instance.simulateToggleEvent();

            Y.Assert.isTrue(header.getAttribute('aria-pressed') === 'false');
            Y.Assert.isTrue(content.getAttribute('aria-hidden') === 'true');

            instance.simulateToggleEvent();

            Y.Assert.isTrue(header.getAttribute('aria-pressed') === 'true');
            Y.Assert.isTrue(content.getAttribute('aria-hidden') === 'false');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-toggler-accessibility', 'node-event-simulate', 'test']
});
