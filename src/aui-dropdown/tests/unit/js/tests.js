YUI.add('aui-dropdown-tests', function(Y) {

    var Assert = Y.Assert,
        suite = new Y.Test.Suite('aui-dropdown'),

        stick = new Y.Dropdown({
            boundingBox: '#stick',
            contentBox: '#stick ul',
            trigger: '#stick .dropdown-toggle',
            hideOnClickOutSide: false,
            hideOnEsc: false,
            render: true
        }),

        dropdown = new Y.Dropdown({
            trigger: '#trigger',
            boundingBox: '#dropdown',
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
            ],
            render: true
        });

    suite.add(new Y.Test.Case({

        'should set attributes correctly': function() {
            Assert.areEqual(stick.get('trigger'), Y.one('#stick .dropdown-toggle'));
            Assert.areEqual(Y.Lang.trim(stick.get('items').item(0).text()), 'I never close');
            Assert.isFalse(stick.get('hideOnClickOutSide'));

            Assert.areEqual(dropdown.get('trigger'), Y.one('#dropdown .dropdown-toggle'));
            Assert.areEqual(Y.Lang.trim(dropdown.get('items').item(0).text()), 'Close on click outside');
            Assert.isTrue(dropdown.get('hideOnClickOutSide'));
        },

        'should add css class open on boundingBox after function open be called': function() {
            dropdown.open();
            Assert.isTrue(dropdown.get('boundingBox').hasClass('open'));
        },

        'should remove css class open on boundingBox after function close be called': function() {
            dropdown.open();
            dropdown.close();
            Assert.isFalse(dropdown.get('boundingBox').hasClass('open'));
        },

        'should add css class open on boundingBox after click on trigger': function() {
            dropdown.get('trigger').simulate('click');
            Assert.isTrue(dropdown.get('boundingBox').hasClass('open'));
        },

        'should remove css class open on boundingBox after click on trigger': function() {
            dropdown.get('trigger').simulate('click');
            Assert.isFalse(dropdown.get('boundingBox').hasClass('open'));
        },

        'should close dropdown on click outside only if hideOnClickOutSide is true': function() {
            dropdown.open();
            stick.open();
            Y.one('body').simulate('click');
            Assert.isTrue(stick.get('boundingBox').hasClass('open'));
            Assert.isFalse(dropdown.get('boundingBox').hasClass('open'));
        },

        'should close dropdown on press esc only if hideOnEsc is true': function() {
            dropdown.open();
            stick.open();

            Y.one('body').simulate('keydown', {
                keyCode: 27
            });

            Assert.isTrue(stick.get('boundingBox').hasClass('open'));
            Assert.isFalse(dropdown.get('boundingBox').hasClass('open'));
        },

        'should set items to new values': function() {
            dropdown.set('items', [
                {
                    content: '1'
                },
                {
                    divider: true
                },
                {
                    content: '2'
                }
            ]);

            var items = Y.all('#dropdown ul li');
            Assert.areEqual(items.item(0).text(), '1');
            Assert.areEqual(items.item(1).text(), '');
            Assert.areEqual(items.item(2).text(), '2');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-dropdown', 'node-screen', 'node-event-simulate']
});
