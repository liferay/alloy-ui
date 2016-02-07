YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-toggler-base');

    suite.add(new Y.Test.Case({
        name: 'Toggle Base Tests',

        init: function() {
            var content = Y.Node.create('<div id="toggler" class="content">' +
                    'L' +
                '</div>'),
                header = Y.Node.create('<div id="header" class="heading">' +
                    '<a class="toggle">' +
                        'Collapsible' +
                    '</a>' +
                '</div>');

            this._container = Y.one('#container');
            this._container.append(header);
            this._container.append(content);
        },

        tearDown: function() {
            this._toggler && this._toggler.destroy();
        },

        createToggler: function(config) {
            this.tearDown();

            this._toggler = new Y.Toggler(config);
        },

        togglerHasClass: function(className) {
        	return Y.one('#toggler')._node.getAttribute('class').indexOf(className) !== -1;
        },

        'should expand content': function() {
            this.createToggler({
                content: '.content',
                expanded: false,
                header: '.heading'
            });

            var toggler = this._toggler;

            toggler.expand();
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-expanded'));
        },

        'should collapse content': function() {
            this.createToggler({
                content: '.content',
                header: '.heading'
            });

            var toggler = this._toggler;

            toggler.collapse();
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-collapsed'));
        },

        'should not collapse when animating in progress': function() {
            this.createToggler({
                animated: true,
                content: '.content',
                expanded: false,
                header: '.heading'
            });

            var toggler = this._toggler;

            Y.Assert.isTrue(toggler.get('animated'), 'animated');

            toggler.expand();
            Y.Assert.isTrue(toggler.get('animating'), 'animating');
            toggler.collapse();

            Y.Assert.isFalse(toggler.get('expanded'), 'expanded');
            this.wait(function() {
                Y.Assert.isTrue(toggler.get('expanded'), 'expanded');
            }, 500);
        },

        'should not expand when animating in progress': function() {
            this.createToggler({
                animated: true,
                content: '.content',
                header: '.heading'
            });

            var toggler = this._toggler;

            Y.Assert.isTrue(toggler.get('animated'), 'animated');

            toggler.collapse();
            Y.Assert.isTrue(toggler.get('animating'), 'animating');
            toggler.expand();

            Y.Assert.isTrue(toggler.get('expanded'), 'expanded');
            this.wait(function() {
                Y.Assert.isFalse(toggler.get('expanded'), 'expanded');
            }, 500);
        },

        'should not start a new animate when animating in progress': function() {
            this.createToggler({
                animated: true,
                content: '.content',
                header: '.heading'
            });

            var toggler = this._toggler;

            Y.Assert.isTrue(toggler.get('animated'), 'animated');

            toggler.toggle(false);
            Y.Assert.isTrue(toggler.get('animating'), 'animating');
            toggler.toggle(false);

            Y.Assert.isTrue(toggler.get('expanded'), 'expanded');
            this.wait(function() {
                Y.Assert.isFalse(toggler.get('expanded'), 'expanded');
            }, 500);
        },

        'should toggle content': function() {
            this.createToggler({
                content: '.content',
                expanded: false,
                header: '.heading'
            });

            var toggler = this._toggler;

            toggler.toggle();
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-expanded'), 'toggle() expand');

            toggler.toggle();
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-collapsed'), 'toggle() collapse');

            toggler.toggle(true);
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-expanded'), 'toggle(true) expand');

            toggler.toggle(false);
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-collapsed'), 'toggle(false) collapse');
        },

        'should return the expanded content height': function() {
            this.createToggler({
                content: '.content',
                header: '.heading'
            });

            var toggler = this._toggler;

            Y.Assert.areEqual(toggler.getContentHeight(), 20);
            toggler.toggle();
            Y.Assert.areEqual(toggler.getContentHeight(), 20);
        },

        'should expand when calling animate function': function() {
            this.createToggler({
                animated: true,
                content: '.content',
                expanded: false,
                header: '.heading'
            });

            var toggler = this._toggler;

            toggler.animate();
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-expanded'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-toggler-base', 'aui-node', 'node-event-simulate', 'test']
});
