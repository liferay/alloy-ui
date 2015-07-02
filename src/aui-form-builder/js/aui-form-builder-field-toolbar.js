/**
 * The Form Builder Field Toolbar Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-toolbar
 */

var CSS_FIELD = A.getClassName('form', 'builder', 'field'),
    CSS_FIELD_CONTENT = A.getClassName('form', 'builder', 'field', 'content'),
    CSS_FIELD_CONTENT_TOOLBAR = A.getClassName('form', 'builder', 'field', 'content', 'toolbar'),
    CSS_TOOLBAR = A.getClassName('form', 'builder', 'field', 'toolbar'),
    CSS_TOOLBAR_CONTAINER = A.getClassName('form', 'builder', 'field', 'toolbar', 'container'),
    CSS_TOOLBAR_ITEM = A.getClassName('form', 'builder', 'field', 'toolbar', 'item'),
    CSS_TOOLBAR_ITEMS = A.getClassName('form', 'builder', 'field', 'toolbar', 'items'),
    CSS_TOOLBAR_TOGGLE = A.getClassName('form', 'builder', 'field', 'toolbar', 'toggle');

/**
 * A base class for `A.FormBuilderFieldToolbar`.
 *
 * @class A.FormBuilderFieldToolbar
 * @extends A.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldToolbar = A.Base.create('form-builder-field-toolbar', A.Base, [], {
    TPL_TOOLBAR: '<div class="' + CSS_TOOLBAR + '">' +
        '<button type="button" class="btn btn-default ' + CSS_TOOLBAR_TOGGLE + '" tabindex="9">' +
        '<span class="glyphicon glyphicon-cog"></span></button>' +
        '<div class="btn-group ' + CSS_TOOLBAR_ITEMS + '"></div></div>',
    TPL_TOOLBAR_ITEM: '<button type="button" class="btn btn-default ' + CSS_TOOLBAR_ITEM + ' {buttonClass}" tabindex="9">' +
        '<span class="{iconClass}"></span></button>',

    /**
     * Construction logic executed during the `A.FormBuilderFieldToolbar`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var fieldsContainer = this.get('formBuilder').get('contentBox');

        this._toolbar = A.Node.create(this.TPL_TOOLBAR);

        this._eventHandles = [
            this.after('itemsChange', this._afterItemsChange),
            this._toolbar.delegate('click', this._onToggleClick, '.' + CSS_TOOLBAR_TOGGLE, this),
            this._toolbar.delegate('click', this._onItemClick, '.' + CSS_TOOLBAR_ITEM, this)
        ];

        if (A.UA.mobile) {
            this._toolbar.one('.' + CSS_TOOLBAR_TOGGLE).remove();
            this._eventHandles.push(
                fieldsContainer.delegate('click', this._onFieldClick, '.' + CSS_FIELD_CONTENT, this)
            );
        }
        else {
            this._eventHandles.push(
                fieldsContainer.delegate('mouseenter', this._onFieldMouseEnter, '.' + CSS_FIELD_CONTENT_TOOLBAR, this),
                fieldsContainer.delegate('mouseleave', this._onFieldMouseLeave, '.' + CSS_FIELD_CONTENT_TOOLBAR, this)
            );
        }

        this._uiSetItems(this.get('items'));
    },

    /**
     * Destructor lifecycle implementation for the `A.FormBuilderFieldToolbar` class.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        (new A.EventHandle(this._eventHandles)).detach();
    },

    /**
     * Adds the toolbar for the given field.
     *
     * @method addForField
     * @param {A.FormBuilderFieldBase} field
     */
    addForField: function(field) {
        field.get('content').one('.' + CSS_TOOLBAR_CONTAINER).append(this._toolbar);
    },

    /**
     * Closes the toolbar.
     *
     * @method close
     */
    close: function() {
        this._toolbar.removeClass('open');
    },

    /**
     * Finds one toolbar's item using the selector.
     *
     * @method getItem
     * @param {String} selector
     * @return {Node}
     */
    getItem: function(selector) {
        return this._toolbar.one(selector);
    },

    /**
     * Opens the toolbar
     *
     * @method open
     */
    open: function() {
        this._toolbar.addClass('open');
    },

    /**
     * Removes the toolbar from the DOM.
     *
     * @method remove
     */
    remove: function() {
        this._toolbar.remove();
        this.close();
    },

    /**
     * Fired after the `items` attribute is changed.
     *
     * @method _afterItemsChange
     * @protected
     */
    _afterItemsChange: function() {
        this._uiSetItems(this.get('items'));
    },

    /**
     * Gets the form builder field from the event's target node.
     *
     * @method _getFieldFromEvent
     * @param {EventFacade} event
     * @return {A.FormBuilderFieldBase}
     * @protected
     */
    _getFieldFromEvent: function(event) {
        return event.currentTarget.ancestor('.' + CSS_FIELD).getData('field-instance');
    },

    /**
     * Gets the item object that represents the event's target node.
     *
     * @method _getItemFromEvent
     * @param {EventFacade} event
     * @return {Object}
     * @protected
     */
    _getItemFromEvent: function(event) {
        var index = this._toolbar.all('.' + CSS_TOOLBAR_ITEM).indexOf(event.currentTarget);

        return this.get('items')[index];
    },

    /**
     * Fired when a field is clicked.
     *
     * @method _onFieldClick
     * @param {EventFacade} event
     * @protected
     */
    _onFieldClick: function (event) {
        var field = event.currentTarget.ancestor('.' + CSS_FIELD).getData('field-instance');

        this.addForField(field);
        this.open();
    },

    /**
     * Fires when mouse enters on field.
     *
     * @method _onFieldMouseEnter
     * @param {EventFacade} event
     * @protected
     */
    _onFieldMouseEnter: function (event) {
        var field = this._getFieldFromEvent(event);

        this.fire('onToolbarFieldMouseEnter', {
            colNode: event.currentTarget.ancestor('.col')
        });

        this.addForField(field);
    },

    /**
     * Fires when mouse leaves the field.
     *
     * @method _onFieldMouseLeave
     * @protected
     */
    _onFieldMouseLeave: function () {
        this.remove();
    },

    /**
     * Fired when one of the toolbar items is clicked.
     *
     * @method _onItemClick
     * @param {EventFacade} event
     * @protected
     */
    _onItemClick: function(event) {
        var field = this._getFieldFromEvent(event),
            formBuilder = this.get('formBuilder'),
            item = this._getItemFromEvent(event);

        this.close();
        if (item.handler) {
            formBuilder[item.handler].call(formBuilder, field);
        }
    },

    /**
     * Fired when the toolbar's toggle is clicked.
     *
     * @method _onToggleClick
     * @protected
     */
    _onToggleClick: function() {
        this.open();
    },

    /**
     * Updates the UI according to the value of the `items` attribute.
     *
     * @method _uiSetItems
     * @param {Array} items
     * @protected
     */
    _uiSetItems: function(items) {
        var i,
            itemsNode = this._toolbar.one('.' + CSS_TOOLBAR_ITEMS);

        itemsNode.empty();
        for (i = 0; i < items.length; i++) {
            itemsNode.append(A.Node.create(A.Lang.sub(this.TPL_TOOLBAR_ITEM, {
                buttonClass: items[i].buttonClass || '',
                iconClass: items[i].iconClass
            })));
        }
    }
}, {
    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderFieldToolbar`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The form builder instance that this toolbar will be used with.
         *
         * @attribute formBuilder
         * @type A.FormBuilder
         */
        formBuilder: {
            writeOnce: 'initOnly'
        },

        /**
         * The items that should show up in the field toolbar. Each item should be
         * represented by an object with the following keys:
         * handler - (Optional) If present, the name of a function from the form
         *   builder to be called when this item is clicked.
         * iconClass: The icon css class that should be used by this item.
         *
         * @attribute items
         * @default []
         * @type Array
         */
        items: {
            validator: A.Lang.isArray,
            valueFn: function() {
                return [
                    A.FormBuilderFieldToolbar.ITEM_ADD_NESTED,
                    A.FormBuilderFieldToolbar.ITEM_EDIT,
                    A.FormBuilderFieldToolbar.ITEM_MOVE,
                    A.FormBuilderFieldToolbar.ITEM_REMOVE,
                    A.FormBuilderFieldToolbar.ITEM_CLOSE
                ];
            }
        }
    }
});

/**
 * Pre built item for adding a nested field.
 *
 * @type {Object}
 * @static
 */
A.FormBuilderFieldToolbar.ITEM_ADD_NESTED = {
    handler: 'addNestedField',
    iconClass: 'glyphicon glyphicon-plus'
};

/**
 * Pre built item for editing a field.
 *
 * @type {Object}
 * @static
 */
A.FormBuilderFieldToolbar.ITEM_EDIT = {
    handler: 'editField',
    iconClass: 'glyphicon glyphicon-wrench'
};

/**
 * Pre built item for moving a field.
 *
 * @type {Object}
 * @static
 */
A.FormBuilderFieldToolbar.ITEM_MOVE = {
    buttonClass: 'layout-builder-move-cut-button layout-builder-move-cut-col-button',
    iconClass: 'glyphicon glyphicon-move'
};

/**
 * Pre built item for removing a field.
 *
 * @type {Object}
 * @static
 */
A.FormBuilderFieldToolbar.ITEM_REMOVE = {
    handler: 'removeField',
    iconClass: 'glyphicon glyphicon-trash'
};

/**
 * Pre built item for closing the toolbar.
 *
 * @type {Object}
 * @static
 */
A.FormBuilderFieldToolbar.ITEM_CLOSE = {
    iconClass: 'glyphicon glyphicon-remove'
};
