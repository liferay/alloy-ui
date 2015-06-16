/**
 * The Form Builder Field List Component
 *
 * @module aui-form-builder-field-list
 */

var CSS_FIELD_LIST = A.getClassName('form', 'builder', 'field', 'list'),
    CSS_FIELD_LIST_ADD_BUTTON =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button'),
    CSS_FIELD_LIST_ADD_BUTTON_CIRCLE =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'circle'),
    CSS_FIELD_LIST_ADD_BUTTON_CONTENT =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'content'),
    CSS_FIELD_LIST_ADD_BUTTON_ICON =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'icon'),
    CSS_FIELD_LIST_ADD_BUTTON_VISIBLE =
        A.getClassName('form', 'builder', 'field', 'list', 'add', 'button', 'visible'),
    CSS_FIELD_LIST_CONTAINER =
        A.getClassName('form', 'builder', 'field', 'list', 'container'),
    CSS_FIELD_LIST_EMPTY = A.getClassName('form', 'builder', 'field', 'list', 'empty'),
    CSS_FIELD_MOVE_TARGET =
        A.getClassName('form', 'builder', 'field', 'move', 'target'),
    CSS_LIST_MOVE_TARGET =
        A.getClassName('form', 'builder', 'list', 'move', 'target');

/**
 * A base class for `A.FormBuilderFieldList`.
 *
 * @class A.FormBuilderFieldList
 * @extends A.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldList  = A.Base.create('form-builder-field-list', A.Base, [], {
    TPL_ADD_FIELD: '<div class="' + CSS_FIELD_LIST_ADD_BUTTON + ' ' + CSS_FIELD_LIST_ADD_BUTTON_VISIBLE + '" tabindex="9">' +
        '<div class="' + CSS_FIELD_LIST_ADD_BUTTON_CONTENT + '">' +
        '<span class="' + CSS_FIELD_LIST_ADD_BUTTON_CIRCLE + '">' +
        '<span class="' + CSS_FIELD_LIST_ADD_BUTTON_ICON + '"></span>' +
        '</span>' +
        '<button type="button" class="' + CSS_FIELD_MOVE_TARGET + ' ' + CSS_LIST_MOVE_TARGET +
        ' layout-builder-move-target layout-builder-move-col-target btn btn-default">' +
        '{pasteHere}</button>' +
        '</div></div>',
    TPL_FIELD_LIST: '<div class="' + CSS_FIELD_LIST + '">' +
        '<div class="' + CSS_FIELD_LIST_CONTAINER + '"></div>' +
        '</div>',

    /**
     * Construction logic executed during the `A.FormBuilderFieldList`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var content = this.get('content');

        this._uiSetFields(this.get('fields'));

        content.delegate('click', this._onClickAddField, '.' + CSS_FIELD_LIST_ADD_BUTTON_CIRCLE, this),
        content.delegate('mouseenter', this._onMouseEnterAddButton, '.' + CSS_FIELD_LIST_ADD_BUTTON, this),
        content.delegate('mouseleave', this._onMouseLeaveAddButton, '.' + CSS_FIELD_LIST_ADD_BUTTON, this),

        this.after('fieldsChange', A.bind(this._afterFieldsChange, this));
    },

    /**
     * Adds a new field to the `A.FormBuilderFieldList`.
     *
     * @method addField
     * @param {A.FormBuilderFieldBase} field
     */
    addField: function(field) {
        var fields = this.get('fields');

        fields.splice(this._newFieldIndex, 0, field);
        this.set('fields', fields);
    },

    /**
     * Removes the given field from the `A.FormBuilderFieldList`.
     *
     * @method removeField
     * @param {A.FormBuilderFieldBase} field
     */
    removeField: function(field) {
        var fields = this.get('fields'),
            indexOf = fields.indexOf(field);

        fields.splice(indexOf, 1);
        this.set('fields', fields);
    },

    /**
     * Fired after the `fields` attribute is set.
     *
     * @method _afterFieldsChange
     * @protected
     */
    _afterFieldsChange: function() {
        this._uiSetFields(this.get('fields'));
    },

    /**
     * Fired when the button for adding a new field is clicked.
     *
     * @method _onClickAddField
     * @param {EventFacade} event
     * @protected
     */
    _onClickAddField: function(event) {
        var emptyFieldList = this.get('content').all('.' + CSS_FIELD_LIST_ADD_BUTTON_CIRCLE);

        this._newFieldIndex = emptyFieldList.indexOf(event.target);
    },

    /**
     * Fired when mouse enters the button for adding a new field.
     *
     * @method _onMouseEnterAddButton
     * @param {EventFacade} event
     * @protected
     */
    _onMouseEnterAddButton: function(event) {
        var addButtonNode = event.currentTarget;

        addButtonNode.addClass(CSS_FIELD_LIST_ADD_BUTTON_VISIBLE);
    },

    /**
     * Fired when mouse leaves the button for adding a new field.
     *
     * @method _onMouseLeaveAddButton
     * @param {EventFacade} event
     * @protected
     */
    _onMouseLeaveAddButton: function(event) {
        var addButtonNode = event.currentTarget,
            content = this.get('content'),
            addButtonsNodeList = content.all('.' + CSS_FIELD_LIST_ADD_BUTTON);

        if (addButtonsNodeList.indexOf(addButtonNode) < addButtonsNodeList.size() - 1) {
            addButtonNode.removeClass(CSS_FIELD_LIST_ADD_BUTTON_VISIBLE);
        }
    },

    /**
     * Updates the ui according to the value of the `fields` attribute.
     *
     * @method _uiSetFields
     * @param {Array} fields
     * @protected
     */
    _uiSetFields: function(fields) {
        var content = this.get('content'),
            container = content.one('.' + CSS_FIELD_LIST_CONTAINER),
            instance = this;

        container.empty();

        A.each(fields, function(field) {
            var addButtonNode = A.Node.create(instance.TPL_ADD_FIELD);

            addButtonNode.removeClass(CSS_FIELD_LIST_ADD_BUTTON_VISIBLE);

            container.append(addButtonNode);
            container.append(field.get('content'));
        });

        content.toggleClass(CSS_FIELD_LIST_EMPTY, !fields.length);
    }
}, {

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderFieldList`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Node containing the contents of this field list.
         *
         * @attribute content
         * @type Node
         */
        content: {
            validator: function(val) {
                return A.instanceOf(val, A.Node);
            },
            valueFn: function() {
                return A.Node.create(A.Lang.sub(this.TPL_FIELD_LIST, {
                    pasteHere: this.get('strings').pasteHere
                })).append(this.TPL_ADD_FIELD);
            },
            writeOnce: 'initOnly'
        },

        /**
         * List of field.
         *
         * @attribute fields
         * @type {Array}
         */
        fields: {
            value: []
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type {Object}
         */
        strings: {
            value: {
                pasteHere: 'Paste here'
            },
            writeOnce: true
        }
    }
});
