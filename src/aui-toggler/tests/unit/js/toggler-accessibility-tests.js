YUI.add('aui-toggler-accessibility-tests', function(Y) {

    //--------------------------------------------------------------------------
    // TogglerAccessibility Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-toggler-accessibility');

    var togglerNode = Y.one('#toggler');

    suite.add(new Y.Test.Case({

        name: 'TogglerAccessibility',

        setUp: function() {
            this.toggler = new Y.Toggler({
                animated: false,
                content: '.content',
                expanded: true,
                header: '.btn'
            });
        },

        tearDown: function() {
            this.toggler.destroy();
        },

        _assertARIAAttributeValues: function(header, content, expanded) {
            Y.Assert.isTrue(header.getAttribute('aria-pressed') === (expanded ? 'true' : 'false'));
            Y.Assert.isTrue(content.getAttribute('aria-hidden') === (expanded ? 'false' : 'true'));
        },

        _simulateToggleEvent: function(keyCode) {
            togglerNode.simulate('keydown', { keyCode: keyCode || 13 });
        },

        'test toggler has correct aria attributes': function() {
            var toggler = this.toggler,
                content = toggler.get('content'),
                header = toggler.get('header');

            Y.Assert.isTrue(header.hasAttribute('aria-pressed'));
            Y.Assert.isTrue(header.hasAttribute('aria-controls'));
            Y.Assert.isTrue(content.hasAttribute('aria-hidden'));

            this._assertARIAAttributeValues(header, content, true);

            Y.Assert.areSame(content.guid(), header.getAttribute('aria-controls'));

            this._simulateToggleEvent();

            this._assertARIAAttributeValues(header, content, false);

            this._simulateToggleEvent();

            this._assertARIAAttributeValues(header, content, true);

            // Simulate down arrow
            this._simulateToggleEvent(40);

            this._assertARIAAttributeValues(header, content, true);

            // Simulate up arrow
            this._simulateToggleEvent(38);

            this._assertARIAAttributeValues(header, content, false);

            // Simulate down arrow
            this._simulateToggleEvent(40);

            this._assertARIAAttributeValues(header, content, true);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-toggler-accessibility', 'node-event-simulate', 'test']
});
