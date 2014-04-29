/**
 * The Dropdown Component
 *
 * @module aui-dropdown
 */

/**
 * A base class for Dropdown.
 *
 * Check the [live demo](http://alloyui.com/examples/dropdown/).
 *
 * @class A.Dropdown
 * @extends Widget
 * @uses A.WidgetCssClass, A.WidgetToggle, A.WidgetStack, A.WidgetTrigger
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.Dropdown = A.Base.create('dropdown', A.Widget, [
    A.WidgetCssClass,
    A.WidgetToggle,
    A.WidgetStack,
    A.WidgetTrigger
], {
    CONTENT_TEMPLATE: '<ul class="dropdown-menu"/>',

    /**
     * Defines the template for the divider item on the dropdown.
     *
     * @property TPL_DIVIDER
     * @type {String}
     * @default <li class="divider"></li>
     * @protected
     */
    TPL_DIVIDER: '<li class="divider"></li>',

    /**
     * Defines the template for the entry item on the dropdown.
     *
     * @property TPL_ENTRY
     * @type {String}
     * @default <li id="{id}">{content}</li>
     * @protected
     */
    TPL_ENTRY: '<li id="{id}">{content}</li>',

    /**
     * Holds the event handle for the `key` event.
     *
     * @property _hideOnEscHandle
     * @type {EventHandle}
     * @protected
     */
    _hideOnEscHandle: null,

    /**
     * Holds the event handle for the `clickoutside` event.
     *
     * @property _hideOnClickOutsideHandle
     * @type {EventHandle}
     * @protected
     */
    _hideOnClickOutsideHandle: null,

    /**
     * Construction logic executed during Dropdown instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._uiSetHideOnClickOutside(this.get('hideOnClickOutSide'));
        this._uiSetHideOnEsc(this.get('hideOnEsc'));
        this._uiSetOpen(this.get('open'));
    },

    /**
     * Bind the events on the Dropdown UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        this.after({
            hideOnClickOutSideChange: this._afterHideOnClickOutsideChange,
            hideOnEscChange: this._afterHideOnEscChange,
            itemsChange: this._afterItemsChange,
            openChange: this._afterOpenChange
        });
        this._bindFocusManager();
    },

    /**
     * Render the Dropdown component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        this._uiSetItems(this.get('items'));
        this._setAriaUI();
    },

    /**
     * Brings the dropdown to the top of the zIndex stack.
     *
     * @method  bringToTop
     */
    bringToTop: function() {
        if (A.Dropdown.Z_INDEX < 0) {
            A.Dropdown.Z_INDEX = this.get('zIndex');
        }
        this.set('zIndex', A.Dropdown.Z_INDEX++);
    },

    /**
     * Close the dropdown.
     *
     * @method close
     */
    close: function() {
        this.set('open', false);
    },

    /**
     * Opens the dropdown.
     *
     * @method open
     */
    open: function() {
        this.set('open', true);
    },

    /**
     * Toggles open state of the dropdown.
     *
     * @method toggleContent
     */
    toggleContent: function() {
        var boundingBox = this.get('boundingBox');

        if (boundingBox.hasClass('open')) {
            this.close();
        }
        else {
            this.open();
        }
    },

    /**
     * Fires after `hideOnClickOutside` attribute change.
     *
     * @method _afterHideOnClickOutsideChange
     * @param {EventFacade} event
     * @protected
     */
    _afterHideOnClickOutsideChange: function(event) {
        this._uiSetHideOnClickOutside(event.newVal);
    },

    /**
     * Fires after `hideOnEsc` attribute change.
     *
     * @method _afterHideOnEscChange
     * @param {EventFacade} event
     * @protected
     */
    _afterHideOnEscChange: function(event) {
        this._uiSetHideOnEsc(event.newVal);
    },

    /**
     * Fires after `items` attribute change.
     *
     * @method _afterItemsChange
     * @param {EventFacade} event
     * @protected
     */
    _afterItemsChange: function(event) {
        this._uiSetItems(event.newVal);
    },

    /**
     * Fires after `open` attribute change.
     *
     * @method _afterOpenChange
     * @param {EventFacade} event
     * @protected
     */
    _afterOpenChange: function(event) {
        this._uiSetOpen(event.newVal);
    },

    /**
     * Binds the `Plugin.NodeFocusManager` that handle dropdown keyboard
     * navigation.
     *
     * @method _bindFocusManager
     * @protected
     */
    _bindFocusManager: function() {
        this.get('boundingBox').plug(A.Plugin.NodeFocusManager, this.get('focusmanager'));
    },

    /**
     * Fires when a click out of dropdown boundingBox.
     *
     * @method _onClickOutside
     * @protected
     */
    _onClickOutside: function() {
        this.close();
    },

    /**
     * Fires when a pres escape key.
     *
     * @method _onEscKey
     * @protected
     */
    _onEscKey: function() {
        this.close();
    },

    /**
     * Set attribute aria-labelledby on markup.
     *
     * @method _setAriaUI
     * @protected
     */
    _setAriaUI: function() {
        var contentBox = this.get('contentBox'),
            items = this.get('items'),
            trigger = this.get('trigger'),
            triggerId = trigger && trigger.get('id');

        if (trigger && triggerId) {
            contentBox.setAttribute('aria-labelledby', triggerId);
        }

        contentBox.setAttribute('rule', 'menu');

        if (items) {
            items.setAttribute('rule', 'presentation');
        }
    },

    /**
     * Creates a list of items based on `items` parameter.
     *
     * @method _setItems
     * @param {Array} items
     * @protected
     */
    _setItems: function(items) {
        var instance = this,
            buffer = '';

        if (A.Lang.isArray(items)) {
            A.Array.each(items, function(item) {
                if (item.divider) {
                    buffer += instance.TPL_DIVIDER;
                }
                else {
                    buffer += A.Lang.sub(
                        instance.TPL_ENTRY, {
                            content: item.content,
                            id: item.id || A.guid()
                        }
                    );
                }
            });
            return A.NodeList.create(buffer);
        }

        return items;
    },

    /**
     * Sets the `hideOnClickOutside` on the UI.
     *
     * @method _uiHideOnClickOutside
     * @param {Boolean} val
     * @protected
     */
    _uiSetHideOnClickOutside: function(val) {
        if (this._hideOnClickOutsideHandle) {
            this._hideOnClickOutsideHandle.detach();
        }
        if (val) {
            this._hideOnClickOutsideHandle = this.get('boundingBox').on('clickoutside', this._onClickOutside, this);
        }
    },

    /**
     * Sets the `hideOnEsc` on the UI.
     *
     * @method _uiHideOnEsc
     * @param {Boolean} val
     * @protected
     */
    _uiSetHideOnEsc: function(val) {
        if (this._hideOnEscHandle) {
            this._hideOnEscHandle.detach();
        }
        if (val) {
            this._hideOnEscHandle = A.one('doc').on('key', this._onEscKey, 'esc', this);
        }
    },

    /**
     * Sets the `items` on the UI.
     *
     * @method _uiSetItems
     * @param {NodeList} val
     * @protected
     */
    _uiSetItems: function(val) {
        this.get('contentBox').setContent(val);
    },

    /**
     * Sets the `open` on the UI.
     *
     * @method _uiSetOpen
     * @param {Boolean} val
     * @protected
     */
    _uiSetOpen: function(val) {
        if (this.get('bringToTop')) {
            this.bringToTop();
        }
        this.get('boundingBox').toggleClass('open', val);
    },

    /**
     * Validates the value of `items` attribute.
     *
     * @method _validateItems
     * @param {Object} val
     * @protected
     * @return {Boolean} The result of the validation
     */
    _validateItems: function(val) {
        return A.Lang.isArray(val) || A.instanceOf(val, A.NodeList);
    }

}, {

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: A.getClassName('dropdown'),

    /**
     * Static property used to define the default attribute configuration for
     * the Dropdown.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     */
    ATTRS: {
        /**
         * Brings the dropdown to the top of the zIndex stack on open.
         *
         * @attribute bringToTop
         * @default true
         * @type {Boolean}
         */
        bringToTop: {
            validator: A.Lang.isBoolean,
            value: true
        },

        /**
         * Defines the keyboard configuration object for
         * `Plugin.NodeFocusManager`.
         *
         * @attribute focusmanager
         * @default {
         *     descendants: 'li > a',
         *     keys: {
         *         next: 'down:40',
         *         previous: 'down:38'
         *     },
         *     circular: false
         * }
         * @type {Object}
         */
        focusmanager: {
            value: {
                descendants: 'li > a',
                keys: {
                    next: 'down:40',
                    previous: 'down:38'
                },
                circular: false
            },
            writeOnce: 'initOnly'
        },

        /**
         * Holds a NodeList containing the menu items.
         *
         * @attribute items
         * @type {NodeList}
         */
        items: {
            setter: '_setItems',
            validator: '_validateItems'
        },

        /**
         * Determines if dropdown will close when press escape.
         *
         * @attribute hideOnEsc
         * @default true
         * @type {Boolean}
         */
        hideOnEsc: {
            validator: A.Lang.isBoolean,
            value: true
        },

        /**
         * Determines if dropdown will close when click outside the
         * `boundingBox` area.
         *
         * @attribute hideOnClickOutSide
         * @default true
         * @type {Boolean}
         */
        hideOnClickOutSide: {
            validator: A.Lang.isBoolean,
            value: true
        },

        /**
         * Determines the dropdown state. Note that `open` state is different
         * than `visible` state since it only adds or removes an `open` css
         * class on the `boundingBox` instead of toggling its visibility.
         *
         * @attribute open
         * @default false
         * @type {Boolean}
         */
        open: {
            validator: A.Lang.isBoolean,
            value: false
        },

        triggerToggleEvent: {
            value: 'click'
        },

        triggerToggleFn: {
            value: 'toggleContent'
        }
    },

    /**
     * Object hash, defining how attribute values have to be parsed from markup.
     *
     * @property HTML_PARSER
     * @type {Object}
     * @static
     */
    HTML_PARSER: {
        items: ['> li']
    },

    /**
     * Holds the highest value for the global zIndex responsible to bring the
     * dropdown menus to the top if `bringToTop` attribute is set to `true`.
     *
     * @property Z_INDEX
     * @type {Number}
     * @default  -1
     * @static
     */
    Z_INDEX: -1
});
