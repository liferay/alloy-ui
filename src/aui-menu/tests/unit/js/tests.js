YUI.add('aui-menu-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-menu');

    suite.add(new Y.Test.Case({
        name: 'Menu Tests',

        init: function() {
            this._originalViewportRegion = Y.DOM.viewportRegion;
        },

        tearDown: function() {
            if (this._menu) {
                this._menu.destroy();
            }

            Y.DOM.viewportRegion = this._originalViewportRegion;
        },

        /**
         * Creates a Menu instance.
         *
         * @method _createMenu
         * @param {Object} Optional config params to override the default values.
         * @protected
         */
        _createMenu: function(config) {
            this._menu = new Y.Menu(Y.merge({
                items: [
                    {
                        content: '<a>Menu Item 1</a>',
                        submenu: {
                            items: [
                                {
                                    content: '<a>Menu Item 1.1</a>'
                                },
                                {
                                    content: '<a>Menu Item 1.2</a>',
                                    submenu: {
                                        items: [
                                            {
                                                content: '<a>Menu Item 1.2.1</a>'
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        content: '<a>Menu Item 2</a>'
                    },
                    {
                        divider: true
                    },
                    {
                        content: '<a>Menu Item 3</a>',
                        disabled: true
                    },
                    {
                        content: '<a>Menu Item 4</a>',
                        submenu: {
                            items: [
                                {
                                    content: '<a>Menu Item 4.1</a>'
                                }
                            ]
                        }
                    }
                ]
            }, config)).render('#container');
        },

        /**
         * Simulates a window resize event.
         *
         * @method _simulateResize
         * @param {Function} callback Function to be called when the simulation has finished.
         * @protected
         */
        _simulateResize: function(callback) {
            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                this._menu._afterWindowResize();
            }
            else {
                Y.one(Y.config.win).simulate('resize');
            }

            this.wait(function() {
                callback();
            }, Y.config.windowResizeDelay || 100);
        },

        /**
         * Stubs the Y.DOM.viewportRegion function to return specific values.
         *
         * @method _stubViewportSize
         * @param {Boolean} small If the width of the viewport should be small.
         * @protected
         */
        _stubViewportSize: function(small) {
            Y.DOM.viewportRegion = function() {
                return {
                    width: small ? 767 : 768
                };
            };
        },

        'should render menu': function() {
            this._createMenu();

            Y.Assert.areEqual(
                5,
                this._menu.get('boundingBox').all('.menu-item').size(),
                'The menu should have been rendered with its 4 menu items'
            );
        },

        'should update items': function() {
            this._createMenu();

            this._menu.set('items', [{}, {}]);
            Y.Assert.areEqual(
                2,
                this._menu.get('boundingBox').all('.menu-item').size(),
                'The menu should have been rendered with its new menu items'
            );
        },

        'should convert items to MenuItem instances when needed': function() {
            var content = 'Test Content',
                item = new Y.MenuItem();

            this._createMenu({
                items: [
                    {
                        content: content
                    },
                    item
                ],
            });

            Y.Assert.isTrue(
                Y.instanceOf(this._menu.get('items')[0], Y.MenuItem),
                'Items should match'
            );
            Y.Assert.areEqual(
                content,
                this._menu.get('items')[0].get('content'),
                'Items should match'
            );
            Y.Assert.areSame(
                item,
                this._menu.get('items')[1],
                'Items should match'
            );
        },

        'should show subitems on hover when on overlay layout': function() {
            var instance = this,
                item,
                item2,
                item3,
                menuNode;

            this._stubViewportSize(false);
            this._createMenu();

            item = this._menu.get('items')[0];
            item2 = this._menu.get('items')[1];
            item3 = this._menu.get('items')[4];
            menuNode = this._menu.get('boundingBox');

            Y.Assert.isNull(
                menuNode.one('.menu-item-submenu'),
                'The submenu shouldn\'t have been rendered yet'
            );

            item2.get('node').simulate('mouseover');
            Y.Assert.isNull(
                menuNode.one('.menu-item-submenu'),
                'The submenu shouldn\'t have been rendered yet'
            );

            item.get('node').simulate('mouseover');

            this.wait(function() {
                Y.Assert.isNotNull(
                    menuNode.one('.menu-item-submenu'),
                    'The submenu should have been rendered'
                );
                Y.Assert.isTrue(
                    item.isSubmenuOpen(),
                    'The submenu should have been opened'
                );

                item3.get('node').simulate('mouseover');
                instance.wait(function() {
                    Y.Assert.isFalse(
                        item.isSubmenuOpen(),
                        'The submenu should have been closed'
                    );
                    Y.Assert.isTrue(
                        item3.isSubmenuOpen(),
                        'The submenu should have been opened'
                    );
                }, Y.Menu.HIDE_SUBMENU_DELAY);
            }, Y.Menu.HIDE_SUBMENU_DELAY);
        },

        'should not hide submenu when quickly mousing out and back again': function() {
            var item,
                itemNode,
                itemNode2;

            this._stubViewportSize(false);
            this._createMenu();

            item = this._menu.get('items')[0];
            itemNode = item.get('node');
            itemNode2 = this._menu.get('items')[1].get('node');

            itemNode.simulate('mouseover');
            itemNode2.simulate('mouseover');
            itemNode.simulate('mouseover');
            this.wait(function() {
                Y.Assert.isTrue(
                    item.isSubmenuOpen(),
                    'The submenu should not have been closed'
                );
            }, Y.Menu.HIDE_SUBMENU_DELAY);
        },

        'should show subitems on click when on inline layout': function() {
            var item,
                itemNode,
                menuNode;

            this._stubViewportSize(true);
            this._createMenu();
            menuNode = this._menu.get('boundingBox');

            Y.Assert.isNull(
                menuNode.one('.menu-item-submenu'),
                'The submenu shouldn\'t have been rendered yet'
            );

            item = this._menu.get('items')[0];
            itemNode = item.get('node');

            itemNode.simulate('mouseover');
            Y.Assert.isNull(
                menuNode.one('.menu-item-submenu'),
                'The submenu shouldn\'t have been opened on mouseover'
            );

            itemNode.simulate('click');
            Y.Assert.isNotNull(
                menuNode.one('.menu-item-submenu'),
                'The submenu should have been rendered'
            );
            Y.Assert.isTrue(
                item.isSubmenuOpen(),
                'The submenu should have been opened'
            );

            itemNode.simulate('mouseout');
            Y.Assert.isTrue(
                item.isSubmenuOpen(),
                'The submenu should not have been closed on mouseout'
            );

            itemNode.simulate('click');
            Y.Assert.isFalse(
                item.isSubmenuOpen(),
                'The submenu should have been closed'
            );
        },

        'should update layout mode on window resize': function() {
            var instance = this;

            this._createMenu();

            this._stubViewportSize(false);
            this._simulateResize(function() {
                Y.Assert.areEqual(
                    'overlay',
                    instance._menu.get('layoutMode'),
                    'Layout should be overlay'
                );

                instance._stubViewportSize(true);
                instance._simulateResize(function() {
                    Y.Assert.areEqual(
                        'inline',
                        instance._menu.get('layoutMode'),
                        'Layout should be inline'
                    );
                });
            });
        },

        'should hide submenus when changing from inline to overlay layout mode': function() {
            var instance = this,
                item,
                itemNode;

            instance._stubViewportSize(true);
            this._createMenu();

            item = this._menu.get('items')[0];
            itemNode = item.get('node');
            itemNode.simulate('click');

            Y.Assert.isTrue(
                item.isSubmenuOpen(),
                'The submenu should have closed when the layout became overlay'
            );

            this._stubViewportSize(false);
            this._simulateResize(function() {
                Y.Assert.isFalse(
                    item.isSubmenuOpen(),
                    'The submenu should have closed when the layout became overlay'
                );
            });
        },

        'should fire event when items are clicked': function() {
            var item,
                itemNode,
                mock = new Y.Mock();

            this._createMenu();

            item = this._menu.get('items')[1];
            itemNode = item.get('node');

            mock.onItemSelected = function(event) {
                Y.Assert.areSame(
                    item,
                    event.item,
                    'Items should match'
                );
            };
            Y.Mock.expect(mock, {
                callCount: 1,
                method: 'onItemSelected',
                args: [Y.Mock.Value.Object]
            });
            this._menu.on('itemSelected', mock.onItemSelected);

            itemNode.simulate('click');
            Y.Mock.verify(mock);
        },

        'should not fire event when items with submenus are clicked': function() {
            var item,
                itemNode,
                mock = new Y.Mock();

            this._createMenu();

            item = this._menu.get('items')[0];
            itemNode = item.get('node');

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onItemSelected'
            });
            this._menu.on('itemSelected', mock.onItemSelected);

            itemNode.simulate('click');
            Y.Mock.verify(mock);
        },

        'should not fire event when divider items are clicked': function() {
            var item,
                itemNode,
                mock = new Y.Mock();

            this._createMenu();

            item = this._menu.get('items')[2];
            itemNode = item.get('node');

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onItemSelected'
            });
            this._menu.on('itemSelected', mock.onItemSelected);

            itemNode.simulate('click');
            Y.Mock.verify(mock);
        },

        'should not fire event when disabled items are clicked': function() {
            var item,
                itemNode,
                mock = new Y.Mock();

            this._createMenu();

            item = this._menu.get('items')[3];
            itemNode = item.get('node');

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onItemSelected'
            });
            this._menu.on('itemSelected', mock.onItemSelected);

            itemNode.simulate('click');
            Y.Mock.verify(mock);
        },

        'should hide open submenus when item is clicked on overlay mode': function() {
            var item,
                itemNode,
                submenuItem,
                submenuItemNode;

            this._stubViewportSize(false);
            this._createMenu();

            item = this._menu.get('items')[0];
            itemNode = item.get('node');
            itemNode.simulate('mouseover');

            submenuItem = item.get('submenu').get('items')[0];
            submenuItemNode = submenuItem.get('node');

            submenuItemNode.simulate('click');
            Y.Assert.isFalse(
                item.isSubmenuOpen(),
                'The submenu should have been closed'
            );
        },

        'should not hide open submenus when item is clicked on inline mode': function() {
            var item,
                itemNode,
                submenuItem,
                submenuItemNode;

            this._stubViewportSize(true);
            this._createMenu();

            item = this._menu.get('items')[0];
            itemNode = item.get('node');
            itemNode.simulate('click');

            submenuItem = item.get('submenu').get('items')[0];
            submenuItemNode = submenuItem.get('node');

            submenuItemNode.simulate('click');
            Y.Assert.isTrue(
                item.isSubmenuOpen(),
                'The submenu should have not been closed'
            );
        },

        'should create menu from existing markup': function() {
            this._menu = new Y.Menu({
                contentBox: '#menu'
            }).render();

            Y.Assert.areEqual(
                2,
                this._menu.get('items').length,
                'Menu should have 2 items'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['node-event-simulate', 'test', 'aui-menu']
});
