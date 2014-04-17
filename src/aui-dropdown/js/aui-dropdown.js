/**
 * The Dropdown Component
 *
 * @module aui-dropdown
 */

var getClassName = A.getClassName,

    TPL_ENTRY = '<li id="{id}">{content}</li>',
    TPL_DIVIDER = '<li class="divider"></li>';

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

    _hideOnEscHandle: null,
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
     * Close the `Dropdown` instance.
     *
     * @method close
     */
    close: function() {
        this.set('open', false);
    },

    /**
     * Display the `Dropdown` instance.
     *
     * @method open
     */

    open: function() {
        this.set('open', true);
    },

    /**
     * Displays or close the `Dropdown`.
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
     * Bind the list of host attributes.
     *
     * @method _bindHostAttributes
     * @protected
     */
    _bindFocusManager: function() {
        this.get('boundingBox').plug(A.Plugin.NodeFocusManager, this.get('focusmanager'));
    },

    /**
     * Fire when a click out of `Dropdown` boundingBox.
     *
     * @method _onClickOutside
     * @protected
     */
    _onClickOutside: function() {
        this.close();
    },

    /**
     * Fire when a pres esc key.
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
     * Create a list of items based on `items` parameter.
     *
     * @method _setItems
     * @param {Array} items
     * @protected
     */
    _setItems: function(items) {
        var buffer = '';

        if (A.Lang.isArray(items)) {
            A.Array.each(items, function(item) {
                if (item.divider) {
                    buffer += TPL_DIVIDER;
                }
                else {
                    buffer += A.Lang.sub(
                        TPL_ENTRY, {
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
     * Set the `hideOnClickOutside` on the UI.
     *
     * @method _uiHideOnClickOutside
     * @param val
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
     * Set the `hideOnEsc` on the UI.
     *
     * @method _uiHideOnEsc
     * @param val
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
     * Set the `items` on the UI.
     *
     * @method _uiSetItems
     * @param val
     * @protected
     */
    _uiSetItems: function(val) {
        this.get('contentBox').setContent(val);
    },

    /**
     * Set the `open` on the UI.
     *
     * @method _uiSetOpen
     * @param val
     * @protected
     */
    _uiSetOpen: function(val) {
        this.get('boundingBox').toggleClass('open', val);
    },

    /**
     * Validates the value of `items` attribute.
     *
     * @method _validateItems
     * @param val
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
    CSS_PREFIX: getClassName('dropdown'),

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
         * A Node in which results will be shown.
         *
         * @attribute items
         * @default null
         * @type {Node}
         * @initOnly
         */
        items: {
            setter: '_setItems',
            validator: '_validateItems'
        },

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
         * Determine if `dropdown` will close when press `esc`.
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
         * Determine if `dropdown` will close when click outside the `boundingBox`
         * area.
         *
         * @attribute hideOnClickOutSide
         * @default true
         * @type {Boolean}
         */
        hideOnClickOutSide: {
            validator: A.Lang.isBoolean,
            value: true
        },

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
    }
});
