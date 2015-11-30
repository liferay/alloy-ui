YUI.add('aui-dropdown', function (A, NAME) {

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
 * @include http://alloyui.com/examples/dropdown/basic-markup.html
 * @include http://alloyui.com/examples/dropdown/basic.js
 */
A.Dropdown = A.Base.create('dropdown', A.Widget, [
    A.WidgetCssClass,
    A.WidgetToggle,
    A.WidgetStack,
    A.WidgetTrigger
], {
    CONTENT_TEMPLATE: '<div><ul class="dropdown-menu"/></div>',

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
     * Holds the event handle for the `keypress` event.
     *
     * @property _toggleContentOnKeypress
     * @type {EventHandle}
     * @protected
     */
     _toggleContentOnKeypress: null,

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
            openChange: this._afterOpenChange,
            triggerChange: this._afterDropdownTriggerChange
        });

        this._dropdownUiSetTrigger(this.get('trigger'));
    },

    /**
     * Render the Dropdown component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
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
     * Fires after `trigger` attribute change.
     *
     * @method _afterDropdownTriggerChange
     * @param {EventFacade} event
     * @protected
     */
    _afterDropdownTriggerChange: function(event) {
        if (event.prevVal) {
            this._toggleContentOnKeypress.detach();
        }

        this._dropdownUiSetTrigger(event.newVal);
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
     * Attachs keypress event to trigger.
     *
     * @method _dropdownUiSetTrigger
     * @param {Node} trigger
     * @protected
     */
    _dropdownUiSetTrigger: function(trigger) {
        if (trigger) {
            this._toggleContentOnKeypress = trigger.on('key', A.bind(this._onDropdownKeyPressMenu, this), 'press:13');
        }
    },

    /**
     * Fires when a click out of dropdown boundingBox.
     *
     * @method _onClickOutside
     * @param {EventFacade} event
     * @protected
     */
    _onClickOutside: function(event) {
        if (event.target !== this.get('trigger')) {
            this.close();
        }
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
     * Fired when bounding box is key pressed.
     *
     * @method _onDropdownKeyPressMenu
     * @param {EventFacade} event
     * @protected
     */
    _onDropdownKeyPressMenu: function(event) {
        this.toggleContent();
        event.preventDefault();
    },

    /**
     * Set attribute aria-labelledby on markup.
     *
     * @method _setAriaUI
     * @protected
     */
    _setAriaUI: function() {
        var dropdownMenu = this.get('boundingBox').one('.dropdown-menu'),
            trigger = this.get('trigger'),
            triggerId = trigger && trigger.generateID();

        if (trigger && triggerId) {
            dropdownMenu.setAttribute('aria-labelledby', triggerId);
        }

        dropdownMenu.setAttribute('role', 'menu');
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


}, '3.0.1', {
    "requires": [
        "event-delegate",
        "event-key",
        "event-outside",
        "node-focusmanager",
        "widget",
        "widget-stack",
        "aui-classnamemanager",
        "aui-node",
        "aui-widget-cssclass",
        "aui-widget-toggle",
        "aui-widget-trigger"
    ],
    "skinnable": true
});
