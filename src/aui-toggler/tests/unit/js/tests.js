YUI.add('aui-toggler-base-tests', function(Y) {

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
            this._toggler = new Y.Toggler(Y.merge({
                content: '.content',
                header: '.heading'
            }, config));
        },

        togglerHasClass: function(className) {
            return Y.one('#toggler')._node.getAttribute('class').indexOf(className) !== -1;
        },

        'should expand content': function() {
            var toggler;

            this.createToggler({
                expanded: false
            });

            toggler = this._toggler;

            toggler.expand();
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-expanded'));
        },

        'should collapse content': function() {
            var toggler;

            this.createToggler();

            toggler = this._toggler;

            toggler.collapse();
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-collapsed'));
        },

        'should not animate when animated is false': function() {
            var toggler;

            this.createToggler({
                expanded: false
            });

            toggler = this._toggler;

            Y.Assert.isFalse(toggler.get('animated'), 'animated');

            toggler.expand();
            Y.Assert.isFalse(toggler.get('animating'), 'animating');
        },

        'should animate when animated is true': function() {
            var toggler;

            this.createToggler({
                animated: true,
                expanded: false
            });

            toggler = this._toggler;

            Y.Assert.isTrue(toggler.get('animated'), 'animated');

            toggler.expand();
            Y.Assert.isTrue(toggler.get('animating'), 'animating');

            this.wait(function() {
                Y.Assert.isFalse(toggler.get('animating'), 'animating');
            }, 500);
        },

        'should not collapse when animating in progress': function() {
            var toggler;

            this.createToggler({
                animated: true,
                expanded: false
            });

            toggler = this._toggler;

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
            var toggler;

            this.createToggler({
                animated: true
            });

            toggler = this._toggler;

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
            var toggler;

            this.createToggler({
                animated: true
            });

            toggler = this._toggler;

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
            var toggler;

            this.createToggler({
                expanded: false
            });

            toggler = this._toggler;

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
            var toggler;

            this.createToggler();

            toggler = this._toggler;

            Y.Assert.areEqual(toggler.getContentHeight(), 20);
            toggler.toggle();
            Y.Assert.areEqual(toggler.getContentHeight(), 20);
        },

        'should expand when calling animate function': function() {
            var toggler;

            this.createToggler({
                animated: true,
                expanded: false
            });

            toggler = this._toggler;

            toggler.animate();
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-expanded'));
        },

        'should wrap content when expanded is set to true': function() {
            var toggler;

            this.createToggler();

            toggler = this._toggler;

            Y.Assert.isTrue(toggler.wrapped);
            Y.Assert.isTrue(this.togglerHasClass('toggler-content-expanded'));
        },

        'should toggle/expand/collapse on key presses': function() {
            var toggler,
                header;

            this.createToggler({
                toggleEvent: 'click'
            });

            toggler = this._toggler;
            header = toggler.get('header');

            // toggle()

            toggler.set('expanded', true); //reset
            header.simulate('click');
            Y.Assert.isFalse(toggler.get('expanded'), 'tap calls toggle()');

            toggler.set('expanded', true); //reset
            header.simulate('keydown', {
                keyCode: 13 // enter
            });
            Y.Assert.isFalse(toggler.get('expanded'), 'enter calls toggle()');

            toggler.set('expanded', true); //reset
            header.simulate('keydown', {
                keyCode: 32 // space
            });
            Y.Assert.isFalse(toggler.get('expanded'), 'space calls toggle()');

            // expand()

            toggler.set('expanded', false); //reset
            header.simulate('keydown', {
                keyCode: 40 // down
            });
            Y.Assert.isTrue(toggler.get('expanded'), 'down calls expand()');

            toggler.set('expanded', false); //reset
            header.simulate('keydown', {
                keyCode: 39 // right
            });
            Y.Assert.isTrue(toggler.get('expanded'), 'right calls expand()');

            toggler.set('expanded', false); //reset
            header.simulate('keydown', {
                keyCode: 107 // num_plus
            });
            Y.Assert.isTrue(toggler.get('expanded'), 'num_plus calls expand()');

            // collapse()

            toggler.set('expanded', true); //reset
            header.simulate('keydown', {
                keyCode: 38 // up
            });
            Y.Assert.isFalse(toggler.get('expanded'), 'up calls collapse()');

            toggler.set('expanded', true); //reset
            header.simulate('keydown', {
                keyCode: 37 // left
            });
            Y.Assert.isFalse(toggler.get('expanded'), 'left calls collapse()');

            toggler.set('expanded', true); //reset
            header.simulate('keydown', {
                keyCode: 27 // esc
            });
            Y.Assert.isFalse(toggler.get('expanded'), 'esc calls collapse()');

            toggler.set('expanded', true); //reset
            header.simulate('keydown', {
                keyCode: 109 // num_minus
            });
            Y.Assert.isFalse(toggler.get('expanded'), 'num_minus calls collapse()');
        },

        'should not toggle/expand/collapse on key presses': function() {
            var toggler,
                header;

            this.createToggler({
                bindDOMEvents: false
            });

            toggler = this._toggler;
            header = toggler.get('header');

            header.simulate('keydown', {
                keyCode: 13 // enter
            });
            Y.Assert.isFalse(this.togglerHasClass('toggler-content-collapsed'));
        },

        'should not toggle when hidden': function() {
            var toggler,
                header;

            this.createToggler();

            toggler = this._toggler;
            header = toggler.get('header');

            header.setStyle('display', 'none');
            toggler.collapse();
            Y.Assert.isFalse(this.togglerHasClass('toggler-content-collapsed'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-toggler-base', 'aui-node', 'node-event-simulate', 'test']
});
