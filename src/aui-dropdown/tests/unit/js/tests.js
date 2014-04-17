YUI.add('aui-dropdown-tests', function(Y) {

    var Assert = Y.Assert,
        suite = new Y.Test.Suite('aui-dropdown'),
        dropdown1 = new Y.Dropdown({
            boundingBox: '#dropdown1',
            contentBox: '#dropdown1 ul',
            trigger: '#dropdown1 .dropdown-toggle',
            hideOnClickOutSide: false
        }).render(),

        dropdown2 = new Y.Dropdown({
            trigger: '#trigger',
            boundingBox: '#dropdown2',
            items: [
                {
                    id: 'first_i',
                    content: '<a role="menuitem" tabindex="-1">Close on click outside</a>'
                },
                {
                    id: 'second_i',
                    content: '<a role="menuitem" tabindex="-1" >Close on esc</a>'
                },
                {
                    id: 'third_i',
                    content: '<a href="#" role="menuitem">Call function to print on console</a>'
                }
            ]
        }).render();

    suite.add(new Y.Test.Case({

        'should set attributes correctly': function() {
            Assert.areEqual(dropdown1.get('trigger'), Y.one('#dropdown1 > a'));
            Assert.areEqual(dropdown1.get('items').text()[0], 'Close on esc');
            Assert.isFalse(dropdown1.get('hideOnClickOutSide'));

            Assert.areEqual(dropdown2.get('trigger'), Y.one('#dropdown2 > a'));
            Assert.areEqual(dropdown2.get('items').getAttribute('id')[0], 'first_i');
        },

        'should add css class "open" on boundingBox after function open be called': function() {
            var boundingBox = dropdown2.get('boundingBox');

            dropdown2.open();
            Assert.isTrue(boundingBox.hasClass('open'));
            dropdown2.close();
        },

        'should remove css class "open" on boundingBox after function close be called': function() {
            var boundingBox = dropdown2.get('boundingBox');

            dropdown2.open();
            dropdown2.close();
            Assert.isFalse(boundingBox.hasClass('open'));
        },

        'should add css class "open" on boundingBox after click on close trigger': function() {
            var trigger = dropdown2.get('trigger'),
                boundingBox = dropdown2.get('boundingBox');

            trigger.simulate('click');
            Assert.isTrue(boundingBox.hasClass('open'));
            dropdown2.close();
        },

        'should remove css class "open" on boundingBox after click on close trigger': function() {
            var trigger = dropdown2.get('trigger'),
                boundingBox = dropdown2.get('boundingBox');

            trigger.simulate('click');
            Assert.isTrue(boundingBox.hasClass('open'));

            dropdown2.toggleContent();
            Assert.isFalse(boundingBox.hasClass('open'));
        },

        'should close dropdown on click outside only if `hideOnClickOutSide` is true': function() {
            var trigger = Y.one('.navbar-default'),
                boundingBox = dropdown2.get('boundingBox');

            dropdown2.open();

            trigger.simulate('click');
            Assert.isFalse(boundingBox.hasClass('open'));

            dropdown2.open();

            dropdown2.set('hideOnClickOutSide', false);

            trigger.simulate('click');
            Assert.isTrue(boundingBox.hasClass('open'));

            dropdown2.close();
            dropdown2.set('hideOnClickOutSide', true);
        },

        'should close dropdown on press esc only if `hideOnEsc` is true': function() {
            var trigger = Y.one('.navbar-default'),
                boundingBox = dropdown2.get('boundingBox');

            dropdown2.open();

            trigger.simulate('keydown', { keyCode: 27 });
            Assert.isFalse(boundingBox.hasClass('open'));

            dropdown2.open();

            dropdown2.set('hideOnEsc', false);

            trigger.simulate('keydown', { keyCode: 27 });
            Assert.isTrue(boundingBox.hasClass('open'));

            dropdown2.close();
            dropdown2.set('hideOnClickOutSide', true);
        },

        'should set `items` to new values': function() {
            var firstItem = Y.one('#dropdown2 ul');

            dropdown2.set('items', [
                {
                    id: 'new1',
                    content: '<a role="menuitem" tabindex="-1">New 1</a>'
                },
                {
                    divider: true
                },
                {
                    id: 'new2',
                    content: '<a role="menuitem" tabindex="-1">New 2</a>'
                }
            ]);

            Assert.areEqual(Y.one('#dropdown2 ul li').attr('id'), 'new1');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-dropdown', 'node-screen', 'node-event-simulate']
});
