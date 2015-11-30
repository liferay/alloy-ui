YUI.add('aui-menu-item', function (A, NAME) {

/**
 * The Menu Item Component
 *
 * @module aui-menu
 * @submodule aui-menu-item
 */

var ALIGN_THRESHOLD = 25,

    CSS_DISABLED = A.getClassName('disabled'),
    CSS_DIVIDER = A.getClassName('divider'),
    CSS_MENU_CONTENT = A.getClassName('menu', 'content'),
    CSS_MENU_ITEM = A.getClassName('menu', 'item'),
    CSS_MENU_ITEM_CONTENT = A.getClassName('menu', 'item', 'content'),
    CSS_MENU_ITEM_HAS_SHORTCUT = A.getClassName('menu', 'item', 'has', 'shortcut'),
    CSS_MENU_ITEM_SHORTCUT = A.getClassName('menu', 'item', 'shortcut'),
    CSS_MENU_ITEM_SUBMENU = A.getClassName('menu', 'item', 'submenu'),
    CSS_MENU_ITEM_SUBMENU_ARROW = A.getClassName('menu', 'item', 'submenu', 'arrow'),
    CSS_MENU_ITEM_SUBMENU_OPEN = A.getClassName('menu', 'item', 'submenu', 'open'),

    EVENT_SUBMENU_ITEM_SELECTED = 'submenuItemSelected',

    TPL_MENU_ITEM = '<li class="' + CSS_MENU_ITEM + ' clearfix" tabindex="1">' +
        '<div class="' + CSS_MENU_ITEM_CONTENT + '"></div></li>',
    TPL_MENU_ITEM_SHORTCUT = '<div class="' + CSS_MENU_ITEM_SHORTCUT + '"></div>',
    TPL_MENU_ITEM_SUBMENU = '<div class="' + CSS_MENU_ITEM_SUBMENU + '"></div>',
    TPL_MENU_ITEM_SUBMENU_ARROW = '<div class="' + CSS_MENU_ITEM_SUBMENU_ARROW + '">' +
        '<span class="glyphicon glyphicon-play"></span><span class="caret"></span></div>';

/**
 * Fired when one of the menu item's submenu's items is selected.
 *
 * @event submenuItemSelected
 */

/**
 * A base class for MenuItem.
 *
 * @class A.MenuItem
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.MenuItem = A.Base.create('menu-item', A.Base, [A.WidgetShortcut], {
    /**
     * Construction logic executed during instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._eventHandles = [
            this.after({
                contentChange: this._afterContentChange,
                disabledChange: this._afterDisabledChange,
                submenuChange: this._afterSubmenuChange
            }),
            A.after(this._afterUISetShortcut, this, '_uiSetShortcut')
        ];

        this._render();
        this._bindSubmenu();
    },

    /**
     * Destructor implementation. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        (new A.EventHandle(this._eventHandles)).detach();

        if (this._submenuEvent) {
            this._submenuEvent.detach();
        }

        this.get('node').remove();
    },

    /**
     * Aligns the submenu to this menu item.
     *
     * @method alignSubmenu
     */
    alignSubmenu: function() {
        var node = this.get('node'),
            nodeRegion = node.get('region'),
            points = [A.WidgetPositionAlign.TL, A.WidgetPositionAlign.TR],
            submenu = this.get('submenu'),
            viewportRegion = A.DOM.viewportRegion();

        if (submenu) {
            if (nodeRegion.right + ALIGN_THRESHOLD >= viewportRegion.right) {
                points = [A.WidgetPositionAlign.TR, A.WidgetPositionAlign.TL];
            }

            submenu.set('align', {
                node: node,
                points: points
            });
        }
    },

    /**
     * Hides the related submenu, if there is one.
     *
     * @method hideSubmenu
     */
    hideSubmenu: function() {
        var submenu = this.get('submenu');

        if (submenu) {
            submenu.set('open', false);
            this.get('node').removeClass(CSS_MENU_ITEM_SUBMENU_OPEN);
        }
    },

    /**
     * Checks if an item can be selected or not (through clicks or keyboard).
     *
     * @method isSelectable
     * @protected
     */
    isSelectable: function() {
        return !this.get('disabled') && !this.get('divider') && !this.get('submenu');
    },

    /**
     * Checks if this item's submenu is open or not.
     *
     * @method isSubmenuOpen
     * @return {Boolean}
     */
    isSubmenuOpen: function() {
        var submenu = this.get('submenu');

        if (submenu) {
            return submenu.get('open');
        }
        else {
            return false;
        }
    },

    /**
     * Shows the related submenu, if there is one.
     *
     * @method showSubmenu
     * @param {Boolean} align if the submenu should be realigned after shown
     * @param {Number} zIndex the z-index value for this submenu
     */
    showSubmenu: function(align, zIndex) {
        var submenu = this.get('submenu');

        if (submenu && !this.get('disabled') && !this.isSubmenuOpen()) {
            this._renderSubmenu();

            submenu.set('open', true);
            this.get('node').addClass(CSS_MENU_ITEM_SUBMENU_OPEN);

            if (align) {
                this.alignSubmenu();
                submenu.set('zIndex', zIndex);
            }
        }
    },

    /**
     * Fired after the `content` attribute changes.
     *
     * @method _afterContentChange
     * @protected
     */
    _afterContentChange: function() {
        this._uiSetContent(this.get('content'));
    },

    /**
     * Fired after the `disabled` attribute changes.
     *
     * @method _afterDisabledChange
     * @protected
     */
    _afterDisabledChange: function() {
        this._uiSetDisabled(this.get('disabled'));
    },

    /**
     * Fired after the `submenu` attribute changes.
     *
     * @method _afterSubmenuChange
     * @protected
     */
    _afterSubmenuChange: function() {
        var node = this.get('node'),
            submenu = this.get('submenu'),
            submenuNode = node.one('.' + CSS_MENU_ITEM_SUBMENU);

        if (submenuNode) {
            submenuNode.empty();
        }

        if (!submenu) {
            node.removeClass(CSS_MENU_ITEM_SUBMENU_OPEN);
        }

        if (node.hasClass(CSS_MENU_ITEM_SUBMENU_OPEN)) {
            this._renderSubmenu();
            submenu.set('open', true);
        }
        this._renderSubmenuArrow();

        this._bindSubmenu();
    },

    /**
     * Fired after the `itemSelected` event from the submenu.
     *
     * @method _afterSubmenuItemSelected
     * @param {EventFacade} event
     * @protected
     */
    _afterSubmenuItemSelected: function(event) {
        this.fire(EVENT_SUBMENU_ITEM_SELECTED, {
            item: event.item
        });
    },

    /**
     * Fired after the `_uiSetShortcut` method runs.
     *
     * @method _afterUISetShortcut
     * @param {Boolean | Object} shortcut
     * @protected
     */
    _afterUISetShortcut: function(shortcut) {
        var node = this.get('node'),
            shortcutNode = node.one('.' + CSS_MENU_ITEM_SHORTCUT);

        this.get('node').toggleClass(CSS_MENU_ITEM_HAS_SHORTCUT, shortcut);

        if (!shortcut) {
            if (shortcutNode) {
                shortcutNode.remove();
            }
        }
        else {
            if (!shortcutNode) {
                shortcutNode = A.Node.create(TPL_MENU_ITEM_SHORTCUT);
                this.get('node').prepend(shortcutNode);
            }

            shortcutNode.set('text', shortcut.text);
        }
    },

    /**
     * Binds the necessary submenu events.
     *
     * @method _bindSubmenu
     * @protected
     */
    _bindSubmenu: function() {
        var submenu = this.get('submenu');

        if (this._submenuEvent) {
            this._submenuEvent.detach();
        }

        if (submenu) {
            this._submenuEvent = submenu.after('itemSelected', A.bind(this._afterSubmenuItemSelected, this));
        }
    },

    /**
     * Renders the menu item.
     *
     * @method _render
     * @protected
     */
    _render: function() {
        var node = this.get('node');

        this._renderSubmenuArrow();

        this._uiSetContent(this.get('content'));
        this._uiSetDisabled(this.get('disabled'));
        this._uiSetDivider(this.get('divider'));

        node.setData('menu-item', this);
        node.setAttribute('role', 'presentation');
    },

    /**
     * Renders the submenu for this menu item.
     *
     * @method _renderSubmenu
     * @protected
     */
    _renderSubmenu: function() {
        var node = this.get('node'),
            submenu = this.get('submenu'),
            submenuNode = node.one('.' + CSS_MENU_ITEM_SUBMENU);

        if (!submenu) {
            return;
        }

        if (!submenuNode) {
            submenuNode = A.Node.create(TPL_MENU_ITEM_SUBMENU);
            this.get('node').append(submenuNode);
        }

        submenu.render(submenuNode);
    },

    /**
     * Renders the arrow that indicates the menu item has a submenu.
     *
     * @method _renderSubmenuArrow
     * @protected
     */
    _renderSubmenuArrow: function() {
        var node = this.get('node'),
            submenuArrowNode = node.one('.' + CSS_MENU_ITEM_SUBMENU_ARROW);

        if (!this.get('submenu')) {
            if (submenuArrowNode) {
                submenuArrowNode.remove();
            }
        }
        else {
            if (!submenuArrowNode) {
                this.get('node').append(A.Node.create(TPL_MENU_ITEM_SUBMENU_ARROW));
            }
        }
    },

    /**
     * Sets the `submenu` attribute.
     *
     * @method _setSubmenu
     * @param {Object | A.Menu} val
     * @protected
     */
    _setSubmenu: function(val) {
        var submenuNodeContent = this.get('node').one('.' + CSS_MENU_ITEM_SUBMENU + ' > .' + CSS_MENU_CONTENT);

        if (!val || A.instanceOf(val, A.Menu)) {
            return;
        }

        if (submenuNodeContent) {
            // If present, indicate the content box so the Menu can be built from
            // the existing html.
            val.contentBox = submenuNodeContent;
        }

        val = new A.Menu(A.merge({
            constrain: true
        }, val));

        return val;
    },

    /**
     * Updates the UI according to the value of the `content` attribute.
     *
     * @method _uiSetContent
     * @param {String} content
     * @protected
     */
    _uiSetContent: function(content) {
        var contentNode = this.get('node').one('.' + CSS_MENU_ITEM_CONTENT);

        if (contentNode) {
            contentNode.setHTML(content);
            contentNode.setAttribute('role', 'menuitem');
        }
    },

    /**
     * Updates the UI according to the value of the `disabled` attribute.
     *
     * @method _uiSetDisabled
     * @param {Boolean} disabled
     * @protected
     */
    _uiSetDisabled: function(disabled) {
        this.get('node').toggleClass(CSS_DISABLED, disabled);
    },

    /**
     * Updates the UI according to the value of the `divider` attribute.
     *
     * @method _uiSetDivider
     * @param {Boolean} divider
     * @protected
     */
    _uiSetDivider: function(divider) {
        this.get('node').toggleClass(CSS_DIVIDER, divider);
    }
}, {
    /**
     * Static property used to define the default attribute configuration.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The HTML content of the menu item.
         *
         * @attribute content
         * @default ''
         * @type String
         */
        content: {
            validator: A.Lang.isString,
            value: ''
        },

        /**
         * Flag indicating it this menu item is disabled.
         *
         * @attribute disabled
         * @default false
         * @type Boolean
         */
        disabled: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * Flag indicating if this menu item is a divider.
         *
         * @attribute divider
         * @default false
         * @type Boolean
         */
        divider: {
            validator: A.Lang.isBoolean,
            value: false,
            writeOnce: 'initOnly'
        },

        /**
         * The node for this item.
         *
         * @attribute node
         * @type Node
         */
        node: {
            validator: A.Lang.isNode,
            valueFn: function() {
                return A.Node.create(TPL_MENU_ITEM);
            },
            writeOnce: 'initOnly'
        },

        /**
         * The menu (or its configuration object) that will show up when
         * hovering over this item. If no menu should show up this should be
         * set to `false`.
         *
         * @attribute submenu
         * @default false
         * @type Boolean | Object | A.Menu
         */
        submenu: {
            lazyAdd: false,
            setter: '_setSubmenu',
            validator: function(val) {
                return val === false || A.Lang.isObject(val);
            },
            value: false
        }
    },

    /**
     * Creates a `MenuItem` instance for the given node.
     *
     * @method createFromNode
     * @param {Node} node
     * @static
     */
    createFromNode: function(node) {
        var config,
            contentNode;

        if (node.hasClass(CSS_DIVIDER)) {
            config = {
                divider: true
            };
        }
        else {
            contentNode = node.one('.' + CSS_MENU_ITEM_CONTENT);

            config = {
                content: contentNode ? contentNode.getHTML() : '',
                disabled: node.hasClass(CSS_DISABLED),
                submenu: node.one('.' + CSS_MENU_ITEM_SUBMENU) ? {} : false
            };
        }

        config.node = node;

        return new A.MenuItem(config);
    }
});


}, '3.0.1', {"requires": ["base-build", "node-base", "aui-classnamemanager", "aui-node", "aui-widget-shortcut"]});
