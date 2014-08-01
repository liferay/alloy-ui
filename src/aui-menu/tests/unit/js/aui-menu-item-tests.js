YUI.add('aui-menu-item-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-menu-item');

    suite.add(new Y.Test.Case({
        name: 'Menu Item Tests',

        _should: {
            // Ignore the following tests in mobile devices, as the features they
            // test don't exist in those.
            ignore: {
                'should render shortcut text': Y.UA.mobile
            }
        },

        tearDown: function() {
            if (this._menuItem) {
                this._menuItem.destroy();
            }
        },

        'should render content': function() {
            var content = 'Test Content',
                itemNode;

            this._menuItem = new Y.MenuItem({
                content: content
            });
            itemNode = this._menuItem.get('node');

            Y.Assert.areSame(
                content,
                itemNode.one('.menu-item-content').getHTML(),
                'Content should be equal to the given value'
            );

            content = 'Different Test Content';
            this._menuItem.set('content', content);
            Y.Assert.areSame(
                content,
                itemNode.one('.menu-item-content').getHTML(),
                'Content should be equal to the new value'
            );
        },

        'should disable item when requested': function() {
            var itemNode;

            this._menuItem = new Y.MenuItem();
            itemNode = this._menuItem.get('node');

            Y.Assert.isFalse(itemNode.hasClass('disabled'), 'Item should not be disabled');

            this._menuItem.set('disabled', true);
            Y.Assert.isTrue(itemNode.hasClass('disabled'), 'Item should be disabled');
        },

        'should render non divider': function() {
            this._menuItem = new Y.MenuItem();

            Y.Assert.isFalse(this._menuItem.get('node').hasClass('divider'), 'Item should be a divider');
        },

        'should render divider': function() {
            this._menuItem = new Y.MenuItem({
                divider: true
            });

            Y.Assert.isTrue(this._menuItem.get('node').hasClass('divider'), 'Item should be a divider');
        },

        'should check if item is selectable': function() {
            this._menuItem = new Y.MenuItem();

            Y.Assert.isTrue(this._menuItem.isSelectable(), 'Item should be selectable');

            this._menuItem.set('disabled', true);
            Y.Assert.isFalse(this._menuItem.isSelectable(), 'Disabled items should be unselectable');

            this._menuItem.set('disabled', false);
            this._menuItem.set('submenu', {});
            Y.Assert.isFalse(this._menuItem.isSelectable(), 'Items with submenus should be unselectable');

            this._menuItem.destroy();
            this._menuItem = new Y.MenuItem({
                divider: true
            });
            Y.Assert.isFalse(this._menuItem.isSelectable(), 'Divider items should be unselectable');
        },

        'should show/hide submenu': function() {
            var itemNode;

            this._menuItem = new Y.MenuItem({
                submenu: {
                    items: [{}, {}]
                }
            });
            itemNode = this._menuItem.get('node');

            Y.Assert.isNull(
                itemNode.one('.menu-item-submenu'),
                'The submenu shouldn\'t have been rendered yet'
            );
            Y.Assert.isFalse(
                this._menuItem.isSubmenuOpen(),
                'The submenu should not be open'
            );

            this._menuItem.showSubmenu();
            Y.Assert.isNotNull(
                itemNode.one('.menu-item-submenu'),
                'The submenu have been rendered'
            );
            Y.Assert.areEqual(
                2,
                itemNode.one('.menu-item-submenu').all('.menu-item').size(),
                'The submenu should have 2 menu items'
            );
            Y.Assert.isTrue(
                this._menuItem.isSubmenuOpen(),
                'The submenu should be open'
            );

            this._menuItem.hideSubmenu();
            Y.Assert.isFalse(
                this._menuItem.isSubmenuOpen(),
                'The submenu should not be open anymore'
            );

            this._menuItem.showSubmenu();
            Y.Assert.isTrue(
                this._menuItem.isSubmenuOpen(),
                'The submenu should be open'
            );
        },

        'should change submenu as requested': function() {
            var itemNode,
                submenuNode;

            this._menuItem = new Y.MenuItem();
            itemNode = this._menuItem.get('node');

            this._menuItem.showSubmenu();
            submenuNode = itemNode.one('.menu-item-submenu');
            Y.Assert.isNull(
                submenuNode,
                'No submenu should have been rendered'
            );

            this._menuItem.set('submenu', {
                items: [{}, {}]
            });
            this._menuItem.showSubmenu();
            submenuNode = itemNode.one('.menu-item-submenu');
            Y.Assert.areEqual(
                2,
                submenuNode.all('.menu-item').size(),
                'The submenu should have 2 menu items'
            );

            this._menuItem.hideSubmenu();
            this._menuItem.set('submenu', {
                items: [{}, {}, {}]
            });
            Y.Assert.areEqual(
                0,
                submenuNode.get('children').size(),
                'The submenu should be empty'
            );

            this._menuItem.showSubmenu();
            Y.Assert.areEqual(
                3,
                submenuNode.all('.menu-item').size(),
                'The submenu should have 3 menu items'
            );

            // Changing the submenu while it's open
            this._menuItem.set('submenu', {
                items: [{}, {}]
            });
            Y.Assert.areEqual(
                2,
                submenuNode.all('.menu-item').size(),
                'The submenu should have 2 menu items'
            );

            this._menuItem.set('submenu', false);
            this._menuItem.hideSubmenu();
            Y.Assert.areEqual(
                0,
                submenuNode.get('children').size(),
                'The submenu should be empty'
            );
        },

        'should convert submenu to a Menu instance when needed': function() {
            var item1 = new Y.MenuItem(),
                item2 = new Y.MenuItem(),
                submenu;

            this._menuItem = new Y.MenuItem({
                submenu: {
                    items: [item1, item2]
                }
            });
            submenu = this._menuItem.get('submenu');

            Y.Assert.isTrue(Y.instanceOf(submenu, Y.Menu), 'Submenu should be an instance of Menu');
            Y.Assert.areSame(
                item1,
                submenu.get('items')[0],
                'Items should match'
            );
            Y.Assert.areSame(
                item2,
                submenu.get('items')[1],
                'Items should match'
            );

            submenu = new Y.Menu({
                items: [item1, item2]
            });
            this._menuItem = new Y.MenuItem({
                submenu: submenu
            });
            Y.Assert.areSame(
                submenu,
                this._menuItem.get('submenu'),
                'Menus should match'
            );
        },

        'should align submenu with the item when requested': function() {
            var item,
                menu,
                submenu,
                viewportRegion = Y.DOM.viewportRegion();

            item = new Y.MenuItem({
                submenu: {
                    items: [{}, {}]
                }
            });
            menu = new Y.Menu({
                items: [item]
            }).render('#container');

            submenu = item.get('submenu');

            item.get('node').set('offsetWidth', viewportRegion.width / 2);
            item.showSubmenu(true);
            Y.Assert.areSame(
                item.get('node'),
                submenu.get('align').node,
                'Submenu should be aligned to the menu item'
            );
            Y.Assert.areSame(
                Y.WidgetPositionAlign.TL,
                submenu.get('align').points[0],
                'Submenu\'s top left corner should be aligned to the menu item'
            );
            Y.Assert.areSame(
                Y.WidgetPositionAlign.TR,
                submenu.get('align').points[1],
                'Submenu should be aligned to the menu item\'s top right corner '
            );

            item.get('node').set('offsetWidth', viewportRegion.width);
            item.hideSubmenu();
            item.showSubmenu(true);
            Y.Assert.areSame(
                item.get('node'),
                submenu.get('align').node,
                'Submenu should be aligned to the menu item'
            );
            Y.Assert.areSame(
                Y.WidgetPositionAlign.TR,
                submenu.get('align').points[0],
                'Submenu\'s top right corner should be aligned to the menu item'
            );
            Y.Assert.areSame(
                Y.WidgetPositionAlign.TL,
                submenu.get('align').points[1],
                'Submenu should be aligned to the menu item\'s top left corner '
            );

            menu.destroy();
        },

        'should show arrow to indicate the existence of a submenu': function() {
            var itemNode;

            this._menuItem = new Y.MenuItem();
            itemNode = this._menuItem.get('node');

            Y.Assert.isNull(
                itemNode.one('.menu-item-submenu-arrow'),
                'There should be no submenu arrow'
            );

            this._menuItem.set('submenu', {
                items: [{}]
            });
            Y.Assert.isNotNull(
                itemNode.one('.menu-item-submenu-arrow'),
                'There should be a submenu arrow'
            );

            this._menuItem.set('submenu', {
                items: [{}, {}]
            });
            Y.Assert.isNotNull(
                itemNode.one('.menu-item-submenu-arrow'),
                'There should be a submenu arrow'
            );

            this._menuItem.set('submenu', false);
            Y.Assert.isNull(
                itemNode.one('.menu-item-submenu-arrow'),
                'There should be no submenu arrow'
            );
        },

        'should create item from existing node': function() {
            var itemNode;

            this._menuItem = Y.MenuItem.createFromNode(Y.one('#menuItem'));
            itemNode = this._menuItem.get('node');

            Y.Assert.isFalse(
                this._menuItem.get('disabled'),
                'Item should not be disabled'
            );
            Y.Assert.isFalse(
                this._menuItem.get('divider'),
                'Item is not a divider'
            );
            Y.Assert.isTrue(
                this._menuItem.get('submenu') !== false,
                'Item should have submenu'
            );

            this._menuItem.showSubmenu();
            Y.Assert.areEqual(
                4,
                itemNode.one('.menu-item-submenu').all('.menu-item').size(),
                'The submenu should have 4 menu items'
            );

            Y.Assert.isTrue(
                this._menuItem.get('submenu').get('items')[2].get('disabled'),
                'Item is disabled'
            );
            Y.Assert.isTrue(
                this._menuItem.get('submenu').get('items')[1].get('divider'),
                'Item is a divider'
            );
        },

        'should fire event when a submenu item is clicked': function() {
            var item,
                menu,
                mock = new Y.Mock(),
                submenuItem;

            submenuItem = new Y.MenuItem();
            item = new Y.MenuItem({
                submenu: {
                    items: [submenuItem]
                }
            });
            menu = new Y.Menu({
                items: [item]
            }).render('#container');

            item.showSubmenu(true, 500);

            mock.onItemSelected = function(event) {
                Y.Assert.areSame(
                    submenuItem,
                    event.item,
                    'Items should match'
                );
            };
            Y.Mock.expect(mock, {
                callCount: 1,
                method: 'onItemSelected',
                args: [Y.Mock.Value.Object]
            });
            item.on('submenuItemSelected', mock.onItemSelected);

            submenuItem.get('node').simulate('click');
            Y.Mock.verify(mock);

            menu.destroy();
        },

        'should render shortcut text': function() {
            var shortcutNode;

            this._menuItem = new Y.MenuItem();

            shortcutNode = this._menuItem.get('node').one('.menu-item-shortcut');
            Y.Assert.isNull(
                shortcutNode,
                'There should be no shortcut node'
            );

            this._menuItem.set('shortcut', {
                altKey: true,
                keys: ['B', 'b'],
                text: 'Alt + B'
            });

            shortcutNode = this._menuItem.get('node').one('.menu-item-shortcut');
            Y.Assert.isNotNull(
                shortcutNode,
                'Shortcut node should have been rendered'
            );
            Y.Assert.areEqual(
                this._menuItem.get('shortcut').text,
                shortcutNode.get('text'),
                'Shortcut text should have been rendered'
            );

            this._menuItem.set('shortcut', {
                ctrlKey: true,
                keys: ['B', 'b'],
                text: 'Ctrl + B'
            });
            shortcutNode = this._menuItem.get('node').one('.menu-item-shortcut');

            Y.Assert.isNotNull(
                shortcutNode,
                'Shortcut node should still be rendered'
            );
            Y.Assert.areEqual(
                this._menuItem.get('shortcut').text,
                shortcutNode.get('text'),
                'Shortcut text should have been updated'
            );

            this._menuItem.set('shortcut', false);
            shortcutNode = this._menuItem.get('node').one('.menu-item-shortcut');

            Y.Assert.isNull(
                shortcutNode,
                'Shortcut node should have been removed'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['node-event-simulate', 'test', 'aui-menu']
});
