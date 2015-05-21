YUI.add('aui-toggler-base-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-toggler-base');

    suite.add(new Y.Test.Case({
        name: 'Toggle Base Tests',

        init: function() {
            var content = Y.Node.create('<div id="toggler" class="content toggler-content-collapsed">' +
                    'L' +
                '</div>'),
                header = Y.Node.create('<div id="header" class="accordion-heading">' +
                    '<a class="accordion-toggle">' +
                        'Collapsible' +
                    '</a>' +
                '</div>');

            this._container = Y.one('#container');
            this._container.append(header);
            this._container.append(content);
        },

        setUp: function() {
            this.createToggler({
            animated: true,
            content: '.content',
            header: '.accordion-heading',
            expanded: false,
            transition: {
                duration: 0
            }
        });
        },

        tearDown: function() {
            this._toggler && this._toggler.destroy();
        },

        createToggler: function(config) {
            this._toggler = new Y.Toggler(config);
        },

        togglerHasClass: function(className) {
            return Y.one('#toggler')._node.getAttribute('class').indexOf(className) !== -1;
        },

        'should expand content': function() {
            var toggler = this._toggler;

            toggler.expand();
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-expanded'));
        },

        'should collapse content': function() {
            var toggler = this._toggler;

            toggler.expand();
            toggler.collapse();
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-collapsed'));
        },

        'should toggle content': function() {
            var toggler = this._toggler;

            toggler.toggle();
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-expanded'));

            toggler.toggle(false);
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-collapsed'));

            toggler.toggle(true);
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-collapsed'));
        },

        'should return the right content height': function() {
            var toggler = this._toggler;

            Y.Assert.areEqual(toggler.getContentHeight(), 20);
            toggler.toggle(true);
            Y.Assert.areEqual(toggler.getContentHeight(), 20);
        },

        'should expand when call animate function': function() {
            var toggler = this._toggler;

            toggler.animate({ duration: 0 });
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-expanded'));
        },

        'should wrap content when expanded is set to true': function() {
            this.createToggler({
                content: '.content',
                expanded: true,
                header: '.accordion-heading'
            });

            var toggler = this._toggler;

            Y.Assert.isTrue(toggler.wrapped);
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-expanded'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-toggler-base', 'aui-node', 'node-event-simulate', 'test']
});
